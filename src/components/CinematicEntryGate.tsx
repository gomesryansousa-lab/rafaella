import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Headphones } from 'lucide-react';

interface CinematicEntryGateProps {
  onEnter: () => void;
  partnerName: string;
}

export function CinematicEntryGate({ onEnter }: CinematicEntryGateProps) {
  const [stage, setStage] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    // Stage sequence:
    // 0: Initial dark + gentle low-glow heart appearing slowly
    // 1: "Eu preparei uma coisa pra você…" (at 1.2s)
    // 2: "Coloque os fones 🎧" (at 2.6s)
    // 3: "Pode parar quando quiser." & Button: "Começar" (at 4.0s)
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 2600);
    const t3 = setTimeout(() => setStage(3), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleStart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isTransitioning ? 0 : 1 }}
      transition={{ duration: 1.0, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] px-6 text-center select-none overflow-hidden"
    >
      {/* Dynamic subtle background lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#38BDF8]/12 blur-[120px] transition-all duration-1000 ${
            isTransitioning ? 'scale-125 bg-[#38BDF8]/22' : 'animate-ambient-pulse'
          }`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_85%)]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
        {/* Gentle low-glow heart appearing slowly */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{
            scale: isTransitioning ? [1, 1.2, 1.8] : 1,
            opacity: isTransitioning ? [1, 0.8, 0] : 1,
          }}
          transition={{ duration: isTransitioning ? 0.9 : 1.2 }}
          className="relative mb-8 cursor-pointer"
          onClick={stage >= 3 ? handleStart : undefined}
        >
          <div className="w-20 h-20 rounded-full bg-[#0B1930] border border-[#38BDF8]/30 flex items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.25)] animate-ambient-pulse">
            <Heart className="w-9 h-9 text-[#38BDF8] fill-[#38BDF8]/80 drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
          </div>
        </motion.div>

        {/* Sequential text fades */}
        <div className="min-h-[140px] flex flex-col items-center justify-center">
          <AnimatePresence>
            {stage >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-wide mb-3"
              >
                Eu preparei uma coisa pra você…
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="flex items-center gap-2 text-sm sm:text-base text-[#BAE6FD]/80 font-light mt-1"
              >
                <Headphones className="w-4 h-4 text-[#E5C378]" />
                <span>Coloque os fones 🎧</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stage >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="text-xs sm:text-sm text-[#94A3B8] font-light italic mt-3"
              >
                Pode parar quando quiser.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Button: "Começar" */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
              className="mt-6 w-full"
            >
              <button
                id="start-story-btn"
                onClick={handleStart}
                disabled={isTransitioning}
                className="group relative px-9 py-3.5 rounded-full bg-gradient-to-r from-[#071326] via-[#0B1930] to-[#071326] hover:from-[#38BDF8]/30 hover:to-[#0B1930] text-white font-medium text-sm tracking-wider transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:scale-[1.02] active:scale-[0.98] border border-[#38BDF8]/40 flex items-center justify-center gap-2.5 mx-auto"
              >
                <span>Começar</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
