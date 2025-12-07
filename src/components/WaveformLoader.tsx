import { motion } from "framer-motion";

interface WaveformLoaderProps {
  message?: string;
}

export function WaveformLoader({ message = "Processing..." }: WaveformLoaderProps) {
  const bars = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Waveform visualization */}
      <div className="flex items-center justify-center gap-1 h-16">
        {bars.map((i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-primary to-accent"
            initial={{ height: 8 }}
            animate={{
              height: [8, 32, 48, 32, 8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Orbiting particles */}
      <div className="relative w-24 h-24">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: i === 0 ? "hsl(var(--primary))" : i === 1 ? "hsl(var(--accent))" : "hsl(var(--gradient-end))",
              top: "50%",
              left: "50%",
              marginTop: -6,
              marginLeft: -6,
              transformOrigin: `${40 + i * 10}px center`,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Message */}
      <motion.p
        className="text-muted-foreground font-medium text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  );
}
