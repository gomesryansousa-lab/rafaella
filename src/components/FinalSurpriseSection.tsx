import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, X } from 'lucide-react';
import { CoupleConfig } from '../types';

interface FinalSurpriseSectionProps {
  config: CoupleConfig;
}

export function FinalSurpriseSection({ config }: FinalSurpriseSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { finalSection, whatsapp, partnerName } = config;

  const handleOpenWhatsApp = () => {
    const defaultMsg = finalSection.whatsappDefaultText || "Oi, Ryan. Eu li o site.";
    const encodedMsg = encodeURIComponent(defaultMsg);
    const cleanPhone = (whatsapp || "").replace(/\D/g, "");
    const waUrl = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodedMsg}`
      : `https://wa.me/?text=${encodedMsg}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsModalOpen(false);
  };

  return (
    <section
      id="final-section"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 sm:px-6 text-center select-none overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 contrast-[1.15] saturate-[0.8]"
        >
          <source src="/casamento.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text legibility - Radial gradient to keep focus on text while showing video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/90 via-[#030712]/40 to-[#030712]/90" />
        <div className="absolute inset-0 bg-[#030712]/20" />
      </div>

      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#38BDF8]/15 blur-[130px] animate-ambient-pulse" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Slowly pulsing gentle heart */}
        <div className="relative mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0B1930]/60 backdrop-blur-md border border-[#38BDF8]/40 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)] animate-heart-beat">
            <Heart className="w-8 h-8 sm:w-9 sm:h-9 text-[#38BDF8] fill-[#38BDF8]/70" />
          </div>
        </div>

        {/* Text sequence */}
        <div className="space-y-6 mb-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          {finalSection.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className={`font-serif leading-relaxed px-4 ${
                idx === 0 ? "text-2xl sm:text-3xl text-white font-normal" : 
                idx === finalSection.paragraphs.length - 1 ? "text-xl sm:text-2xl text-white font-medium pt-2 text-glow-blue" :
                "text-base sm:text-lg text-[#BAE6FD] font-light max-w-md mx-auto"
              }`}
            >
              {para}
            </motion.p>
          ))}
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: finalSection.paragraphs.length * 0.2 }}
            className="text-sm sm:text-base text-[#94A3B8] font-light italic mt-4"
          >
            {finalSection.closingNotes?.[1] || "A decisão é toda sua."}
          </motion.p>
        </div>

        {/* Action Button: "Conversar com o Ryan" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            id="talk-to-ryan-btn"
            onClick={() => setIsModalOpen(true)}
            className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-[#071326] via-[#0B1930] to-[#071326] hover:from-[#0284C7]/30 hover:to-[#0B1930] text-white text-sm font-medium border border-[#38BDF8]/40 hover:border-[#BAE6FD]/60 transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#BAE6FD]" />
            <span>{finalSection.ctaButton || "Conversar com o Ryan"}</span>
          </button>
        </motion.div>
      </div>

      {/* Discreet WhatsApp CTA Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
              className="relative w-full max-w-sm rounded-3xl bg-[#040914] border border-[#38BDF8]/40 shadow-[0_0_50px_rgba(56,189,248,0.2)] p-6 sm:p-8 text-center"
            >
              <button
                id="close-wa-modal-btn"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 rounded-full bg-[#0B1930] border border-[#38BDF8]/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-white font-medium mb-2">
                Conversar no WhatsApp
              </h3>

              <p className="text-sm text-[#F1F5F9]/80 font-light mb-2">
                Isso vai abrir uma conversa no WhatsApp.
              </p>

              <p className="text-xs text-[#BAE6FD]/70 font-light italic mb-6">
                Sem pressão, sem textão. Só se você quiser.
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  id="open-whatsapp-btn"
                  onClick={handleOpenWhatsApp}
                  className="w-full py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-[#25D366]/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Abrir WhatsApp</span>
                </button>

                <button
                  id="cancel-whatsapp-btn"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-2.5 px-5 rounded-full bg-transparent hover:bg-white/5 text-[#F8F2F5]/60 hover:text-white font-light text-xs transition-colors"
                >
                  Agora não
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
