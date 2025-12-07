import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  gradient?: boolean;
}

export function GlassPanel({ 
  children, 
  className, 
  glow = false,
  gradient = false,
  ...props 
}: GlassPanelProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-3xl p-6",
        glow && "floating-shadow",
        gradient && "gradient-border",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
