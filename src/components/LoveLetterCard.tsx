import { motion } from 'motion/react';
import { Heart, Feather, Sparkles } from 'lucide-react';

interface LoveLetterCardProps {
  letter: {
    title: string;
    date: string;
    paragraphs: string[];
    signOff: string;
  };
}

export function LoveLetterCard({ letter }: LoveLetterCardProps) {
  return (
    <section id="love-letter-section" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1930] border border-[#38BDF8]/30 text-xs text-[#BAE6FD] font-medium mb-3">
            <Feather className="w-3.5 h-3.5 text-[#E5C378]" />
            <span>Escrito com sinceridade</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mb-2">
            {letter.title}
          </h2>
          <span className="text-xs font-mono text-[#E5C378] tracking-widest uppercase">
            {letter.date}
          </span>
        </div>

        {/* Tactile Dark-Paper Luxury Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative rounded-3xl bg-gradient-to-b from-[#0B1930] via-[#071326] to-[#040914] border border-[#38BDF8]/30 p-8 sm:p-14 shadow-2xl shadow-black/80 overflow-hidden"
        >
          {/* Subtle paper grain & warm border accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E5C378]/60 to-transparent" />
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Letter Emblem Header */}
          <div className="flex justify-between items-center pb-6 mb-8 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#071326] border border-[#38BDF8]/40 flex items-center justify-center shadow-md">
                <Heart className="w-4 h-4 text-[#38BDF8] fill-[#38BDF8]" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#BAE6FD] font-mono">
                Uma reflexão honesta
              </span>
            </div>
            <Sparkles className="w-4 h-4 text-[#E5C378] opacity-70" />
          </div>

          {/* Reading reveal on scroll Paragraphs */}
          <div className="space-y-6 text-[#F1F5F9]/90 font-serif text-base sm:text-xl leading-relaxed sm:leading-loose">
            {letter.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`${index === 0 ? 'text-xl sm:text-2xl text-[#BAE6FD] font-medium' : ''}`}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Closing with Signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-white/10 flex flex-col items-end"
          >
            <p className="font-serif text-2xl sm:text-3xl text-white font-medium italic text-glow-blue">
              {letter.signOff}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
