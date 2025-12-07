import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function HeroSection() {
  return (
    <div className="relative">
      {/* Floating orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-gradient-to-tr from-accent/30 to-primary/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-accent floating-shadow">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Meta<span className="text-gradient">Timestamps</span>
            </span>
          </motion.div>
          <ThemeToggle />
        </div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center space-y-4"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-foreground">AI-Powered</span>
            <br />
            <span className="text-gradient">Chapter Generator</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Transform your YouTube videos into perfectly structured chapters with a single click
          </p>
        </motion.div>
      </div>
    </div>
  );
}
