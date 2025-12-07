import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function GenerateButton({ onClick, disabled, loading }: GenerateButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "relative w-full py-4 px-6 rounded-2xl font-display font-semibold text-lg",
        "bg-gradient-to-r from-primary via-[hsl(var(--gradient-end))] to-accent",
        "text-primary-foreground shadow-lg",
        "overflow-hidden group",
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={!disabled && !loading ? { x: "100%" } : {}}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      />

      {/* Glow effect */}
      <div className="absolute inset-0 glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-3">
        <motion.span
          animate={loading ? { rotate: 360 } : {}}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.span>
        {loading ? "Generating..." : "Generate Timestamps"}
      </span>
    </motion.button>
  );
}
