import { motion } from "framer-motion";
import { Clock, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";

interface TimestampCardProps {
  timestamp: string;
  title: string;
  index: number;
  videoUrl: string;
}

// Convert timestamp (mm:ss) to seconds
const timestampToSeconds = (timestamp: string): number => {
  const parts = timestamp.split(':');
  if (parts.length === 2) {
    const minutes = parseInt(parts[0], 10) || 0;
    const seconds = parseInt(parts[1], 10) || 0;
    return minutes * 60 + seconds;
  }
  return 0;
};

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

// Create YouTube URL with timestamp
const createYouTubeUrlWithTimestamp = (videoUrl: string, timestamp: string): string | null => {
  const videoId = getYouTubeVideoId(videoUrl);
  if (!videoId) return null;
  
  const seconds = timestampToSeconds(timestamp);
  return `https://www.youtube.com/watch?v=${videoId}&t=${seconds}s`;
};

export function TimestampCard({ timestamp, title, index, videoUrl }: TimestampCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${timestamp} ${title}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClick = () => {
    const youtubeUrl = createYouTubeUrlWithTimestamp(videoUrl, timestamp);
    if (youtubeUrl) {
      window.open(youtubeUrl, '_blank');
    }
  };

  const youtubeUrl = createYouTubeUrlWithTimestamp(videoUrl, timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass rounded-2xl p-4 flex items-center gap-4 group cursor-pointer"
      onClick={handleClick}
    >
      {/* Timestamp badge */}
      <div className="flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl p-3 relative overflow-hidden">
        <Clock className="w-4 h-4 text-primary relative z-10" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-mono text-primary font-semibold">
          {timestamp}
        </p>
        <p className="text-foreground font-medium truncate mt-0.5">
          {title}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex-shrink-0 flex items-center gap-2">
        {youtubeUrl && (
          <motion.div
            className="p-2 rounded-xl bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity"
            whileTap={{ scale: 0.9 }}
            title="Open in YouTube"
          >
            <ExternalLink className="w-4 h-4 text-primary" />
          </motion.div>
        )}
        <motion.div
          className="p-2 rounded-xl bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity"
          whileTap={{ scale: 0.9 }}
          onClick={handleCopy}
          title="Copy timestamp"
        >
          {copied ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
