import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoveReason } from '../types';
import { Heart, Sparkles, MailOpen, Mail, X } from 'lucide-react';

interface LoveReasonsSectionProps {
  reasons: LoveReason[];
}

export function LoveReasonsSection({ reasons }: LoveReasonsSectionProps) {
  const [openedEnvelopeId, setOpenedEnvelopeId] = useState<number | null>(null);

  const toggleEnvelope = (id: number) => {
    setOpenedEnvelopeId(prev => (prev === id ? null : id));
  };

  return (
    <section id="reasons-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1930] border border-[#38BDF8]/30 text-xs text-[#BAE6FD] font-medium mb-3">
            <Heart className="w-3.5 h-3.5 text-[#38BDF8] fill-[#38BDF8]" />
            <span>Palavras que faltaram</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mb-3">
            Coisas que eu devia ter te dito mais vezes
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light max-w-md mx-auto">
            Verdades simples que sempre foram reais, mas que eu nem sempre soube expressar quando tive a chance.
          </p>
        </div>

        {/* Minimalist interactive numbered envelopes grid (♡ 01, ♡ 02, etc.) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {reasons.map((reason) => {
            const isOpen = openedEnvelopeId === reason.id;

            return (
              <div key={reason.id} className="relative">
                {/* Envelope Card Trigger */}
                <motion.div
                  onClick={() => toggleEnvelope(reason.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer rounded-3xl p-6 transition-all duration-400 border relative overflow-hidden flex flex-col justify-between min-h-[190px] select-none ${
                    isOpen
                      ? 'bg-gradient-to-b from-[#0B1930] to-[#040914] border-[#38BDF8] shadow-lg shadow-[#38BDF8]/25 ring-1 ring-[#38BDF8]/40'
                      : 'glass-card border-[#38BDF8]/20 hover:border-[#38BDF8]/45 hover:shadow-xl hover:shadow-[#38BDF8]/10'
                  }`}
                >
                  {/* Subtle envelope fold design on top */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#38BDF8]/40 to-transparent" />

                  {/* Header: ♡ Number + Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#030712]/60 border border-[#38BDF8]/30 text-xs font-mono text-[#BAE6FD]">
                      <Heart className="w-3 h-3 fill-[#38BDF8] text-[#38BDF8]" />
                      <span>{reason.number}</span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#0B1930] border border-[#38BDF8]/20 flex items-center justify-center text-[#E5C378]">
                      {isOpen ? <MailOpen className="w-4 h-4 text-[#38BDF8]" /> : <Mail className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Short Title & Status */}
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium mb-1">
                      {reason.shortTitle}
                    </h3>
                    <p className="text-xs text-[#BAE6FD]/60 font-light">
                      {isOpen ? 'Carta aberta • Toque para recolher' : 'Toque para desdobrar a carta'}
                    </p>
                  </div>

                  {/* Wax seal effect badge */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#E5C378]/80 font-mono">
                    <span>Razão Secreta</span>
                    <span className="text-[#38BDF8]">{isOpen ? '▲ Fechar' : '▼ Abrir'}</span>
                  </div>
                </motion.div>

                {/* Unfolding Letter Reveal */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scaleY: 0.8 }}
                      animate={{ opacity: 1, height: 'auto', scaleY: 1 }}
                      exit={{ opacity: 0, height: 0, scaleY: 0.8 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="mt-3 rounded-2xl p-5 bg-[#040914] border border-[#38BDF8]/40 shadow-xl shadow-[#38BDF8]/15 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#38BDF8]/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-center gap-1.5 text-xs text-[#E5C378] font-mono mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Do meu coração para o seu:</span>
                      </div>

                      <p className="font-serif text-base sm:text-lg text-[#F1F5F9] leading-relaxed italic">
                        “{reason.content}”
                      </p>

                      <div className="mt-3 text-right text-xs text-[#BAE6FD]/60 font-serif">
                        Para sempre você ♡
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
