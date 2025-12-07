import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

interface Timestamp {
  time: string;
  title: string;
}

interface GeneratorState {
  timestamps: Timestamp[];
  loading: boolean;
  error: string | null;
}

const WEBHOOK_URL = "https://limitable-draftily-soon.ngrok-free.dev/webhook/chapters";

export function useTimestampGenerator() {
  const [state, setState] = useState<GeneratorState>({
    timestamps: [],
    loading: false,
    error: null,
  });

  const generate = useCallback(async (
    videoUrl: string,
    transcript: string,
    style: string = "default",
    format: "mm:ss" | "hh:mm:ss" = "mm:ss"
  ) => {
    const trimmedUrl = videoUrl.trim();
    if (!trimmedUrl) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid YouTube URL.",
        variant: "destructive",
      });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Send request to webhook
      const requestBody = { url: trimmedUrl };
      
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check response status first
      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`Server error (${response.status}). Please check your n8n workflow.`);
      }

      // Get response as text first to check if it's empty
      const responseText = await response.text();
      
      if (!responseText || responseText.trim().length === 0) {
        throw new Error("Webhook returned empty response. In n8n, ensure the webhook node has 'Respond to Webhook' enabled and returns the output data.");
      }

      // Parse JSON response
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse response:", responseText);
        throw new Error("Invalid JSON response from server. Check n8n webhook output format.");
      }
      
      console.log("Received data from n8n:", data);
      
      // Extract chapters from n8n response
      // n8n can return: {output: [{time, title}, ...]} or {chapters: [...]} or direct array
      let chapters: any[] = [];
      
      // Check if response is directly an array
      if (Array.isArray(data)) {
        chapters = data;
      } 
      // Check for output property (most common in n8n)
      else if (data.output && Array.isArray(data.output)) {
        chapters = data.output;
      }
      // Check for chapters property
      else if (data.chapters && Array.isArray(data.chapters)) {
        chapters = data.chapters;
      }
      // Check for data.output
      else if (data.data && data.data.output && Array.isArray(data.data.output)) {
        chapters = data.data.output;
      }
      // Check for messages array (AI response might be here)
      else if (data.messages && Array.isArray(data.messages)) {
        // Extract from messages array - find the AI response
        for (const message of data.messages) {
          // Check if message contains chapters
          if (message.chapters && Array.isArray(message.chapters)) {
            chapters = message.chapters;
            break;
          }
          // Check if message contains output
          if (message.output && Array.isArray(message.output)) {
            chapters = message.output;
            break;
          }
          // Check if message content is JSON with chapters
          if (typeof message.content === 'string') {
            try {
              const parsed = JSON.parse(message.content);
              if (parsed.chapters && Array.isArray(parsed.chapters)) {
                chapters = parsed.chapters;
                break;
              }
              if (parsed.output && Array.isArray(parsed.output)) {
                chapters = parsed.output;
                break;
              }
            } catch (e) {
              // Not JSON, continue
            }
          }
        }
      }
      
      // If still no chapters found, check if data itself has the structure
      if (chapters.length === 0 && data && typeof data === 'object') {
        // Try to find chapters in nested structure
        const findChapters = (obj: any): any[] => {
          if (Array.isArray(obj) && obj.length > 0) {
            if (obj[0] && obj[0].time && obj[0].title) {
              return obj;
            }
          }
          if (obj && typeof obj === 'object') {
            if (obj.chapters && Array.isArray(obj.chapters)) {
              return obj.chapters;
            }
            for (const key in obj) {
              const found = findChapters(obj[key]);
              if (found && found.length > 0) return found;
            }
          }
          return [];
        };
        chapters = findChapters(data);
      }
      
      if (!Array.isArray(chapters) || chapters.length === 0) {
        throw new Error("No chapters found in response.");
      }

      // Convert to timestamp format
      const timestamps: Timestamp[] = chapters
        .filter((item: any) => item && item.time && item.title)
        .map((item: any) => ({
          time: String(item.time).trim(),
          title: String(item.title).trim(),
        }));

      if (timestamps.length === 0) {
        throw new Error("No timestamps found in response.");
      }

      setState({
        timestamps,
        loading: false,
        error: null,
      });

      toast({
        title: "Success!",
        description: `Generated ${timestamps.length} chapters.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "There was an issue generating timestamps. Please try again.";
      
      setState({
        timestamps: [],
        loading: false,
        error: errorMessage,
      });

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, []);

  const regenerate = useCallback(async (
    videoUrl: string,
    transcript: string,
    style: string,
    format: "mm:ss" | "hh:mm:ss"
  ) => {
    await generate(videoUrl, transcript, style, format);
  }, [generate]);

  const reset = useCallback(() => {
    setState({
      timestamps: [],
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    generate,
    regenerate,
    reset,
  };
}
