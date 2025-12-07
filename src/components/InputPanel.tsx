import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { GlassPanel } from "./GlassPanel";

interface InputPanelProps {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
}

export function InputPanel({ videoUrl, setVideoUrl }: InputPanelProps) {
  return (
    <GlassPanel className="space-y-6">
      <div className="relative">
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Paste YouTube video URL..."
          className="w-full bg-secondary/50 border border-border rounded-2xl py-4 px-5 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Link className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
