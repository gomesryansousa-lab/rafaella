import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, Calendar, Infinity as InfinityIcon, Music, AlertCircle } from 'lucide-react';

interface RelationalStatsProps {
  startDate: string;
}

export function RelationalStatsSection({ startDate }: RelationalStatsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });

  const [daysCount, setDaysCount] = useState(0);

  // Calculate days since metDate
  const startMs = new Date(startDate).getTime();
  const nowMs = new Date().getTime();
  const diffMs = Math.max(0, nowMs - startMs);
  const targetDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  useEffect(() => {
    if (!isInView) return;

    const duration = 2200; // ms
    const startTime = performance.now();

    const animateCounters = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 4);

      setDaysCount(Math.floor(ease * targetDays));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        setDaysCount(targetDays);
      }
    };

    requestAnimationFrame(animateCounters);
  }, [isInView, targetDays]);

  const stats = [
    {
      id: 'days-met',
      value: `${daysCount.toLocaleString('pt-BR')}`,
      label: 'Dias',
      sublabel: 'desde o dia em que nos conhecemos',
      icon: Calendar,
      color: 'text-[#BAE6FD]',
    },
    {
      id: 'laughter',
      value: '∞',
      label: 'Vezes',
      sublabel: 'que rimos da mesma piada',
      icon: InfinityIcon,
      color: 'text-[#E5C378]',
    },
    {
      id: 'song',
      value: '1',
      label: 'Música',
      sublabel: 'que virou nossa para sempre',
      icon: Music,
      color: 'text-[#38BDF8]',
    },
    {
      id: 'mistake',
      value: '1',
      label: 'Erro',
      sublabel: 'e ele foi só meu',
      icon: AlertCircle,
      color: 'text-[#93C5FD]',
      isAlert: true,
    },
  ];

  return (
    <section id="stats-section" className="py-20 px-4 sm:px-6 relative">
      <div ref={containerRef} className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1930] border border-[#38BDF8]/30 text-xs text-[#BAE6FD] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
            <span>Reflexão do Tempo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mb-3">
            Tudo que cabe entre aquele dia e hoje
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light max-w-md mx-auto">
            Cada marco tem um peso. O tempo não apaga o que foi bom, nem esconde a responsabilidade do que deu errado.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                className={`glass-card rounded-3xl p-6 text-center border relative overflow-hidden transition-all duration-300 ${
                  stat.isAlert
                    ? 'border-[#38BDF8]/40 bg-[#0B1930]/70 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                    : 'border-[#38BDF8]/20 hover:border-[#38BDF8]/40'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#030712]/60 border border-[#38BDF8]/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className={`font-serif text-3xl sm:text-4xl font-medium mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[#94A3B8] font-light leading-snug">
                  {stat.sublabel}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
