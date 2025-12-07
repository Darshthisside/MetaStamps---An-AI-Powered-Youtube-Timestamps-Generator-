import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { InputPanel } from "@/components/InputPanel";
import { GenerateButton } from "@/components/GenerateButton";
import { ResultsPanel } from "@/components/ResultsPanel";
import { ProcessingScreen } from "@/components/ProcessingScreen";
import { useTimestampGenerator } from "@/hooks/useTimestampGenerator";
import { ArrowLeft } from "lucide-react";

export default function Index() {
  const [videoUrl, setVideoUrl] = useState("");
  
  const { timestamps, loading, generate, reset } = useTimestampGenerator();

  const handleGenerate = () => {
    // Prevent multiple clicks while loading
    if (loading) return;
    generate(videoUrl, "", "default", "mm:ss");
  };

  const handleRegenerate = () => {
    generate(videoUrl, "", "default", "mm:ss");
  };

  const handleBack = () => {
    reset();
    setVideoUrl("");
  };

  const hasResults = timestamps.length > 0;
  const canGenerate = videoUrl.trim().length > 0;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Processing overlay */}
      <ProcessingScreen visible={loading} />

      {/* Main content */}
      <main className="relative z-10 px-4 md:px-8 py-8 pb-28 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!hasResults ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-6 md:space-y-8"
            >
              <HeroSection />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <InputPanel
                  videoUrl={videoUrl}
                  setVideoUrl={setVideoUrl}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <GenerateButton
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  loading={loading}
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Back button */}
              <motion.button
                onClick={handleBack}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">New Generation</span>
              </motion.button>

              {/* Results header */}
              <div className="text-center space-y-2">
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Your Chapters
                </h2>
                <p className="text-muted-foreground text-sm">
                  Click any chapter to jump to that timestamp in YouTube
                </p>
              </div>

              <ResultsPanel
                timestamps={timestamps}
                onRegenerate={handleRegenerate}
                loading={loading}
                videoUrl={videoUrl}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
