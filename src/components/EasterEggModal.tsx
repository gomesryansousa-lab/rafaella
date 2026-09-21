import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { SecretMessage } from '../types';

interface EasterEggModalProps {
  message: SecretMessage | null;
  foundIds: string[];
  totalMessages: number;
  onClose: () => void;
}

export function EasterEggModal({ message, foundIds, totalMessages, onClose }: EasterEggModalProps) {
  const allFound = foundIds.length >= totalMessages;

  return (
    <AnimatePresence>
      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#1E0921] via-[#140618] to-[#0A020D] border border-[#F0529C]/30 shadow-2xl shadow-[#F0529C]/20 text-center overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#F0529C]/20 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              id="close-easter-egg-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-[#F8F2F5]/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fechar mensagem secreta"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Animated heart icon */}
            <div className="relative inline-block mb-4">
              <div className="w-16 h-16 rounded-full bg-[#25091D] border border-[#F0529C]/40 flex items-center justify-center mx-auto shadow-lg shadow-[#F0529C]/20 animate-heart-beat">
                <Heart className="w-8 h-8 text-[#F0529C] fill-[#F0529C]" />
              </div>
              <Sparkles className="w-5 h-5 text-[#E5C378] absolute -top-1 -right-1 animate-pulse" />
            </div>

            {/* Title */}
            <p className="text-xs uppercase tracking-widest text-[#FFB7D8] font-medium mb-1 flex items-center justify-center gap-1.5">
              <span>Mensagem Secreta Encontrada</span>
              <Heart className="w-3.5 h-3.5 fill-[#F0529C] text-[#F0529C]" />
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-4">
              {message.unlockedTitle}
            </h3>

            {/* Message Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#08030A]/60 border border-[#F0529C]/20 mb-6 text-left relative">
              <div className="text-xs text-[#E5C378]/80 font-mono mb-2 flex items-center gap-1">
                <span>Local:</span>
                <span className="text-white/80">{message.location}</span>
              </div>
              <p className="font-serif text-lg text-[#F8F2F5] leading-relaxed italic">
                “{message.message}”
              </p>
            </div>

            {/* Tracker indicator */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalMessages }).map((_, i) => {
                  const isFound = i < foundIds.length;
                  return (
                    <div
                      key={i}
                      className={`w-7 h-2 rounded-full transition-all duration-300 ${
                        isFound ? 'bg-gradient-to-r from-[#F0529C] to-[#FFB7D8] shadow-sm shadow-[#F0529C]' : 'bg-white/10'
                      }`}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-[#F8F2F5]/70">
                {foundIds.length} de {totalMessages} segredos descobertos
                {allFound && ' • Todos os segredos revelados! ✨'}
              </p>
            </div>

            {/* Button */}
            <button
              id="confirm-easter-egg-btn"
              onClick={onClose}
              className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#F0529C] to-[#C43878] hover:from-[#FF65AA] hover:to-[#D44286] text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-[#F0529C]/30 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Continuar lendo</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
