import { motion } from 'motion/react';
import { Heart, ChevronDown } from 'lucide-react';
import { CoupleConfig } from '../types';

interface HeroSectionProps {
  config: CoupleConfig;
  onDiscoverSecret: (id: string) => void;
  isSecretFound: boolean;
}

export function HeroSection({ config, onDiscoverSecret, isSecretFound }: HeroSectionProps) {
  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] flex flex-col items-center justify-between pt-20 pb-12 px-4 sm:px-6 text-center select-none overflow-hidden"
    >
      {/* Hero Couple Background Photo with Dark Atmospheric Overlay */}
      {config.heroPhoto && (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.img
            src={config.heroPhoto}
            alt="Ryan e Rafaella"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('nos-1.jpeg')) {
                target.src = '/assets/nos-1.jpeg';
              }
            }}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="w-full h-full object-cover object-[center_35%] filter brightness-95 contrast-105"
          />
          {/* Dark atmospheric overlays for depth and legible typography */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/70 via-[#030712]/30 to-[#030712]/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,7,18,0.1)_0%,rgba(3,7,18,0.7)_75%,#030712_90%)]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1930]/40 via-transparent to-[#38BDF8]/15 mix-blend-screen" />
        </div>
      )}

      <div className="max-w-2xl mx-auto flex flex-col items-center my-auto w-full z-10">
        {/* Soft slowly beating heart with Easter egg 1 */}
        <div className="relative mb-7">
          <button
            onClick={() => onDiscoverSecret('easter-1')}
            className="group relative focus:outline-none cursor-pointer"
            aria-label="Coração"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0B1930]/90 backdrop-blur-md border border-[#38BDF8]/35 flex items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.3)] animate-heart-beat group-hover:border-[#38BDF8]/60 transition-colors">
              <Heart
                className={`w-9 h-9 sm:w-11 sm:h-11 transition-all ${
                  isSecretFound
                    ? 'text-[#BAE6FD] fill-[#BAE6FD] drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]'
                    : 'text-[#38BDF8]/85 fill-[#38BDF8]/75 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Title: "Oi, Rafaella." */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.1] mb-5 text-glow-blue drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
        >
          Oi, {config.partnerName}.
        </motion.h1>

        {/* Subtitle: exact text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-base sm:text-lg text-[#F1F5F9]/90 font-light max-w-xl mx-auto leading-relaxed mb-6 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
        >
          Obrigado por ter chegado até aqui, fico extremamente grato. Só peço que veja tudo com atenção, por favor!.
        </motion.p>

        {/* Discreet line below: "Desde o início de 2022" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1930]/80 backdrop-blur-sm border border-[#38BDF8]/25 text-xs text-[#BAE6FD]/80 font-mono tracking-widest uppercase shadow-lg shadow-black/40"
        >
          <span>Desde o início de 2022</span>
        </motion.div>
      </div>

      {/* Gentle Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex flex-col items-center gap-2 text-[#94A3B8]/60 text-xs mt-8 z-10"
      >
        <span className="font-light tracking-wider">Role devagar</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#38BDF8]/60" />
      </motion.div>
    </section>
  );
}
