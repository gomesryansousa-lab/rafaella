import { motion } from 'motion/react';

export function CinematicFocusSection() {
  const lines = [
    { text: "Existe uma casa.", delay: 0.1, style: "font-serif text-3xl sm:text-5xl text-white font-normal mb-3" },
    { text: "Ela levou meses pra ficar de pé, um tijolo de cada vez.", delay: 0.3, style: "text-base sm:text-xl text-[#BAE6FD]/80 font-light mb-4" },
    { text: "Riso. Confiança. Mensagem de bom dia. A certeza de ter alguém ao lado.", delay: 0.5, style: "text-sm sm:text-base text-[#94A3B8] font-light mb-8 max-w-xl mx-auto" },
    { text: "E existe uma parede que segura todas as outras.", delay: 0.7, style: "font-serif text-2xl sm:text-4xl text-white/90 font-medium mb-4" },
    { text: "Eu derrubei.", delay: 0.9, style: "font-serif text-3xl sm:text-5xl text-[#38BDF8] font-semibold mb-5 text-glow-blue tracking-wide" },
    { text: "Não foi por maldade. Foi por descuido.", delay: 1.1, style: "text-base sm:text-xl text-[#F1F5F9]/80 font-light mb-2 italic font-serif" },
    { text: "E descuido, com quem a gente ama, também é culpa.", delay: 1.3, style: "text-lg sm:text-2xl text-[#E5C378] font-normal font-serif pt-3 border-t border-white/10 inline-block" }
  ];

  return (
    <section
      id="focus-section"
      className="relative min-h-[90vh] flex items-center justify-center py-28 px-6 text-center select-none overflow-hidden my-16"
    >
      {/* Cinematic background with slow Ken Burns effect and black edge gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-[radial-gradient(ellipse_at_center,#0B1930_0%,#071326_50%,#030712_90%)]"
        />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-transparent to-[#030712]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <div className="space-y-3 sm:space-y-4">
          {lines.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.0, delay: item.delay, ease: "easeOut" }}
              className={item.style}
            >
              {item.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
