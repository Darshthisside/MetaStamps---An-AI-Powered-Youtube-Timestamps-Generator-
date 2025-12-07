import { motion } from "framer-motion";
import { Copy, Download, RefreshCw, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { GlassPanel } from "./GlassPanel";
import { TimestampCard } from "./TimestampCard";
import { cn } from "@/lib/utils";

interface Timestamp {
  time: string;
  title: string;
}

interface ResultsPanelProps {
  timestamps: Timestamp[];
  onRegenerate: () => void;
  loading?: boolean;
  videoUrl: string;
}

export function ResultsPanel({ timestamps, onRegenerate, loading, videoUrl }: ResultsPanelProps) {
  const [copied, setCopied] = useState(false);

  const copyAll = () => {
    const text = timestamps.map((t) => `${t.time} ${t.title}`).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJSON = () => {
    const data = JSON.stringify(timestamps, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "timestamps.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-4"
    >
      {/* Header with actions */}
      <GlassPanel className="!p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-display font-semibold text-foreground">
              {timestamps.length} Chapters
            </span>
          </div>
          <div className="flex gap-2">
            <motion.button
              onClick={copyAll}
              className="p-3 rounded-xl glass hover:bg-secondary/80 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <Check className="w-4 h-4 text-accent" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </motion.button>
            <motion.button
              onClick={downloadJSON}
              className="p-3 rounded-xl glass hover:bg-secondary/80 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          </div>
        </div>

        {/* Regenerate button */}
        <motion.button
          onClick={onRegenerate}
          disabled={loading}
          className={cn(
            "w-full py-2 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
            "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary/80",
            loading && "opacity-50 cursor-not-allowed"
          )}
          whileTap={{ scale: loading ? 1 : 0.95 }}
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Regenerating...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate</span>
            </>
          )}
        </motion.button>
      </GlassPanel>

      {/* Timestamp list */}
      <div className="space-y-3">
        {timestamps.map((timestamp, index) => (
          <TimestampCard
            key={`${timestamp.time}-${index}`}
            timestamp={timestamp.time}
            title={timestamp.title}
            index={index}
            videoUrl={videoUrl}
          />
        ))}
      </div>
    </motion.div>
  );
}
