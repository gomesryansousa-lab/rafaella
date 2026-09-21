import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryPhoto } from '../types';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GallerySectionProps {
  photos: GalleryPhoto[];
  onDiscoverSecret: (id: string) => void;
  isSecretFound: boolean;
}

export function GallerySection({ photos, onDiscoverSecret, isSecretFound }: GallerySectionProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section id="gallery-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1930] border border-[#38BDF8]/30 text-xs text-[#BAE6FD] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
            <span>Memórias</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mb-3">
            Alguns momentos que eu guardo com carinho
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light max-w-md mx-auto">
            Lembranças de dias leves que continuam vivos na minha lembrança e que eu sempre vou respeitar.
          </p>
        </div>

        {/* Editorial Asymmetrical Bento/Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-[240px]">
          {photos.map((photo, index) => {
            const hasEasterEgg = photo.id === 'gal-4'; // Easter Egg #4 on the elegant night photo

            // Bento layout sizing classes
            let spanClass = 'col-span-1 row-span-1';
            if (index === 0) spanClass = 'sm:col-span-2 lg:col-span-2 row-span-2';
            else if (index === 3) spanClass = 'sm:col-span-1 lg:col-span-1 row-span-2';
            else if (index === 4) spanClass = 'sm:col-span-2 lg:col-span-2 row-span-1';

            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(index)}
                className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-[#38BDF8]/20 shadow-xl shadow-black/40 glass-card-hover ${spanClass}`}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/95 via-[#030712]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Easter Egg #4 */}
                {hasEasterEgg && (
                  <button
                    id="easter-egg-4-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDiscoverSecret('easter-4');
                    }}
                    title="Um detalhe escondido..."
                    className={`absolute top-4 right-4 p-2 rounded-full z-20 transition-all duration-300 ${
                      isSecretFound
                        ? 'bg-[#38BDF8]/30 text-[#BAE6FD] scale-90'
                        : 'bg-[#0B1930]/90 text-[#38BDF8] hover:scale-125 border border-[#38BDF8]/40 shadow-[0_0_12px_#38BDF8]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSecretFound ? 'fill-[#BAE6FD]' : 'fill-[#38BDF8] animate-pulse'}`} />
                  </button>
                )}

                {/* Caption on Card */}
                <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end">
                  {photo.location && (
                    <span className="text-[11px] font-mono text-[#E5C378] tracking-wider uppercase mb-1">
                      {photo.location}
                    </span>
                  )}
                  <p className="font-serif text-base sm:text-lg text-white font-medium line-clamp-2 drop-shadow-md">
                    {photo.caption}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-[#BAE6FD]/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expandir fotografia</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fullscreen Lightbox Viewer */}
        <AnimatePresence>
          {activePhotoIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 select-none">
              {/* Close Button */}
              <button
                id="close-lightbox-btn"
                onClick={closeLightbox}
                className="absolute top-5 right-5 p-3 rounded-full text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-all z-50 cursor-pointer"
                aria-label="Fechar galeria"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                id="lightbox-prev-btn"
                onClick={prevPhoto}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full text-white/80 hover:text-white bg-black/40 hover:bg-black/60 border border-white/20 transition-all z-50 cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                id="lightbox-next-btn"
                onClick={nextPhoto}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full text-white/80 hover:text-white bg-black/40 hover:bg-black/60 border border-white/20 transition-all z-50 cursor-pointer"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Content */}
              <motion.div
                key={activePhotoIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center text-center"
              >
                <div className="relative rounded-2xl overflow-hidden border border-[#38BDF8]/30 shadow-2xl shadow-[#38BDF8]/20 max-h-[70vh] mb-4">
                  <img
                    src={photos[activePhotoIndex].url}
                    alt={photos[activePhotoIndex].caption}
                    referrerPolicy="no-referrer"
                    className="max-h-[70vh] w-auto object-contain"
                  />
                </div>

                <div className="max-w-xl">
                  {photos[activePhotoIndex].location && (
                    <span className="text-xs uppercase tracking-widest text-[#E5C378] font-mono mb-1 block">
                      {photos[activePhotoIndex].location}
                    </span>
                  )}
                  <p className="font-serif text-lg sm:text-2xl text-white font-light italic">
                    “{photos[activePhotoIndex].caption}”
                  </p>
                  <p className="text-xs text-[#BAE6FD]/60 mt-2 font-mono">
                    {activePhotoIndex + 1} de {photos.length}
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
