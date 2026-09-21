import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Milestone } from '../types';
import { Sparkles, Calendar, MapPin, Heart, X, ZoomIn } from 'lucide-react';

interface TimelineSectionProps {
  milestones: Milestone[];
  onDiscoverSecret: (id: string) => void;
  isSecretFound: boolean;
}

export function TimelineSection({ milestones, onDiscoverSecret, isSecretFound }: TimelineSectionProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  const renderFormattedDescription = (text: string, highlightPhrase?: string) => {
    if (!highlightPhrase || !text.includes(highlightPhrase)) {
      return <span>{text}</span>;
    }
    const [before, after] = text.split(highlightPhrase);
    return (
      <span className="leading-relaxed">
        {before}
        <span className="inline-block my-1 font-serif italic text-[#BAE6FD] bg-[#0284C7]/20 px-2 py-0.5 rounded-lg border border-[#38BDF8]/40 shadow-[0_0_15px_rgba(56,189,248,0.3)] drop-shadow-[0_0_8px_rgba(186,230,253,0.5)] font-normal">
          “{highlightPhrase}”
        </span>
        {after}
      </span>
    );
  };

  return (
    <section id="timeline-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1930] border border-[#38BDF8]/30 text-xs text-[#BAE6FD] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
            <span>Memórias & Verdades</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mb-3">
            Como tudo começou…
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light max-w-lg mx-auto">
            Os momentos mais especiais que construíram a nossa história e que eu guardo com todo carinho.
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Glowing vertical connector line */}
          <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-8 w-[2px] bg-gradient-to-b from-[#38BDF8]/10 via-[#38BDF8]/60 to-[#38BDF8]/30 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />

          <div className="space-y-12 sm:space-y-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              const hasEasterEgg = item.id === 'marco-2'; // Easter egg on "Qual é a graça?"

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  } gap-6 sm:gap-12 pl-12 sm:pl-0`}
                >
                  {/* Node on the line */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 w-7 h-7 rounded-full flex items-center justify-center z-10 transition-all bg-[#0B1930] border-2 border-[#38BDF8] shadow-[0_0_16px_rgba(56,189,248,0.8)]">
                    <div className="w-2 h-2 rounded-full bg-[#BAE6FD] animate-ping" />
                  </div>

                  {/* Card Container */}
                  <div
                    onClick={() => setSelectedMilestone(item)}
                    className="w-full sm:w-[calc(50%-2.5rem)] rounded-3xl p-5 sm:p-6 shadow-xl cursor-pointer group relative overflow-hidden transition-all duration-300 glass-card glass-card-hover border border-[#38BDF8]/25"
                  >
                    {/* Easter Egg #3 */}
                    {hasEasterEgg && (
                      <button
                        id="easter-egg-3-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDiscoverSecret('easter-3');
                        }}
                        title="Uma mensagem escondida..."
                        className={`absolute top-3 right-3 p-1.5 rounded-full z-20 transition-all duration-300 ${
                          isSecretFound
                            ? 'bg-[#38BDF8]/30 text-[#BAE6FD] scale-90'
                            : 'bg-[#0B1930] text-[#38BDF8] hover:scale-125 border border-[#38BDF8]/40 shadow-[0_0_10px_#38BDF8]'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSecretFound ? 'fill-[#BAE6FD]' : 'fill-[#38BDF8] animate-pulse'}`} />
                      </button>
                    )}

                    {/* Image Thumbnail (if exists) */}
                    {item.photo && (
                      <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4 border border-white/10">
                        <img
                          src={item.photo}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        {/* Tag on image */}
                        <span className="absolute bottom-3 left-3 text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#0B1930]/90 border border-[#38BDF8]/30 text-[#BAE6FD] backdrop-blur-sm">
                          {item.tag}
                        </span>

                        {/* Expand hint */}
                        <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="w-4 h-4" />
                        </div>
                      </div>
                    )}

                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-[#E5C378] font-medium mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.displayDate}
                      </span>
                      {item.location && (
                        <span className="flex items-center gap-1 text-[#94A3B8]">
                          <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                          {item.location}
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-serif text-xl sm:text-2xl font-medium mb-2 transition-colors text-white group-hover:text-[#BAE6FD]">
                      {item.title}
                    </h3>
                    <div className="text-sm text-[#F1F5F9]/80 font-light leading-relaxed">
                      {renderFormattedDescription(item.description, item.highlightPhrase)}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#BAE6FD]/80 font-medium">
                      <span>Ler reflexão completa</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Detail Modal */}
        <AnimatePresence>
          {selectedMilestone && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMilestone(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#0B1930] to-[#040914] border border-[#38BDF8]/35 shadow-2xl p-6 sm:p-8"
              >
                <button
                  id="close-milestone-modal-btn"
                  onClick={() => setSelectedMilestone(null)}
                  className="absolute top-4 right-4 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors z-10 cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>

                {selectedMilestone.photo && (
                  <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-[#38BDF8]/30 shadow-lg">
                    <img
                      src={selectedMilestone.photo}
                      alt={selectedMilestone.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930] via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-xs tracking-wider uppercase px-3 py-1 rounded-full bg-[#071326]/90 border border-[#38BDF8]/40 text-[#BAE6FD]">
                      {selectedMilestone.tag}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-[#E5C378] font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedMilestone.displayDate}
                  </span>
                  {selectedMilestone.location && (
                    <span className="flex items-center gap-1 text-[#94A3B8]">
                      <MapPin className="w-4 h-4 text-[#38BDF8]" />
                      {selectedMilestone.location}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-4">
                  {selectedMilestone.title}
                </h3>

                <div className="space-y-4 text-sm sm:text-base text-[#F1F5F9]/85 font-light leading-relaxed">
                  {selectedMilestone.highlightPhrase ? (
                    <div className="space-y-3">
                      <p className="text-base text-[#F1F5F9]/80 font-light">
                        {selectedMilestone.description.replace(selectedMilestone.highlightPhrase, '').trim()}
                      </p>
                      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#071326] via-[#0B1930] to-[#071326] border border-[#38BDF8]/40 text-[#BAE6FD] shadow-[0_0_25px_rgba(56,189,248,0.25)]">
                        <p className="font-serif italic text-lg sm:text-xl text-center leading-relaxed drop-shadow-[0_0_8px_rgba(186,230,253,0.5)]">
                          “{selectedMilestone.highlightPhrase}”
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="italic text-[#BAE6FD]/90 font-serif text-lg">
                      “{selectedMilestone.description}”
                    </p>
                  )}
                  {selectedMilestone.details && (
                    <p className="pt-2 border-t border-white/10">
                      {selectedMilestone.details}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
