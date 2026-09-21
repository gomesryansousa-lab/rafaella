import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LockOpen } from 'lucide-react';

interface SecretLetterProps {
  letter: {
    teaser: string;
    title: string;
    typewriterIntro: string;
    content: string[];
    closing: string;
  };
}

export function SecretLetterSection({ letter }: SecretLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');

  // Typewriter effect when modal opens
  useEffect(() => {
    if (!isOpen) {
      setTypewriterText('');
      return;
    }

    let currentIndex = 0;
    const fullText = letter.typewriterIntro;
    const timer = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [isOpen, letter.typewriterIntro]);

  return (
    <section id="secret-unsaid-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-2xl mx-auto text-center">
        {/* Ambient Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-[#38BDF8]/30 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/5 via-[#0B1930]/40 to-[#38BDF8]/5 opacity-60 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5C378] font-mono mb-3">
              Sem rodeios
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mb-5 leading-snug">
              {letter.teaser}
            </h2>

            <p className="text-sm text-[#94A3B8] font-light max-w-md mx-auto mb-8 leading-relaxed">
              Sem metáforas ou justificativas. Apenas o que precisa ser dito, com total responsabilidade.
            </p>

            {/* Trigger Button: “Abrir” */}
            <button
              id="open-secret-letter-btn"
              onClick={() => setIsOpen(true)}
              className="px-9 py-3.5 rounded-full bg-gradient-to-r from-[#071326] to-[#0B1930] hover:from-[#0284C7] hover:to-[#0369A1] text-white text-sm font-medium border border-[#38BDF8]/50 hover:border-[#BAE6FD]/60 transition-all duration-300 shadow-lg shadow-[#0284C7]/25 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <LockOpen className="w-4 h-4 text-[#BAE6FD]" />
              <span>Abrir</span>
            </button>
          </div>
        </div>

        {/* Animated Unfolding Secret Letter Modal */}
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Dimmed backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/92 backdrop-blur-2xl"
              />

              {/* Sincere Unfolding Letter */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-3xl bg-[#040914] border border-[#38BDF8]/40 shadow-[0_0_60px_rgba(56,189,248,0.25)] p-6 sm:p-10 text-left"
              >
                {/* Close Button */}
                <button
                  id="close-secret-letter-btn"
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                  <span className="text-[11px] font-mono tracking-widest text-[#E5C378] uppercase block mb-1">
                    Verdade e Respeito
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium">
                    {letter.title}
                  </h3>
                </div>

                {/* Typewriter Opening Lines */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1930]/90 border border-[#38BDF8]/35 mb-6">
                  <p className="font-serif text-lg sm:text-xl text-[#BAE6FD] italic leading-relaxed min-h-[32px]">
                    {typewriterText}
                    <span className="inline-block w-1.5 h-4 bg-[#38BDF8] ml-1 animate-pulse" />
                  </p>
                </div>

                {/* Body Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-[#F1F5F9]/85 font-light leading-relaxed">
                  {letter.content.map((paragraph, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Closing */}
                <div className="mt-8 pt-6 border-t border-white/10 text-right">
                  <p className="font-serif text-base sm:text-lg text-[#E5C378] italic">
                    {letter.closing}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
