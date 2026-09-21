import { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart, Star, Compass } from 'lucide-react';

interface ConstellationSectionProps {
  title: string;
  date: string;
  description: string;
  onDiscoverSecret: (id: string) => void;
  isSecretFound: boolean;
}

interface StarNode {
  x: number;
  y: number;
  r: number;
  name: string;
  isSpecial?: boolean;
}

export function ConstellationSection({
  title,
  date,
  description,
  onDiscoverSecret,
  isSecretFound,
}: ConstellationSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStar, setActiveStar] = useState<string | null>(null);

  // Key constellation nodes (forming an elegant celestial alignment)
  const constellationNodes: StarNode[] = [
    { x: 0.50, y: 0.45, r: 4.0, name: "O início: Fevereiro de 2022", isSpecial: true },
    { x: 0.38, y: 0.32, r: 3.0, name: "Trend das três perguntas com Peixoto" },
    { x: 0.62, y: 0.32, r: 3.0, name: "A piada do Coringa: 'Qual é a graça?'" },
    { x: 0.30, y: 0.44, r: 2.5, name: "Conversas que não precisavam de explicação" },
    { x: 0.70, y: 0.44, r: 2.5, name: "Velha Infância nos fones" },
    { x: 0.50, y: 0.68, r: 3.5, name: "O respeito que sempre tive por você" },
    { x: 0.42, y: 0.54, r: 2.0, name: "Dias leves que ainda guardo" },
    { x: 0.58, y: 0.54, r: 2.0, name: "A cumplicidade que existiu" },
    { x: 0.50, y: 0.22, r: 2.5, name: "Aquele dia em que você chegou" },
  ];

  // Connections (indices)
  const connections = [
    [8, 1], [8, 2],
    [1, 3], [2, 4],
    [3, 6], [4, 7],
    [6, 5], [7, 5],
    [0, 1], [0, 2], [0, 5], [0, 8]
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = 420;
    };
    window.addEventListener('resize', handleResize);

    // Generate random background stars
    const backgroundStars = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.3 ? '#FFF' : '#BAE6FD'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background twinkling stars
      backgroundStars.forEach(s => {
        s.twinkle += s.speed;
        const opacity = (Math.sin(s.twinkle) + 1) / 2 * 0.7 + 0.2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      // Draw constellation connecting lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);

      connections.forEach(([fromIdx, toIdx]) => {
        const p1 = constellationNodes[fromIdx];
        const p2 = constellationNodes[toIdx];
        ctx.beginPath();
        ctx.moveTo(p1.x * width, p1.y * height);
        ctx.lineTo(p2.x * width, p2.y * height);
        ctx.stroke();
      });

      ctx.setLineDash([]); // Reset line dash

      // Draw constellation major stars
      constellationNodes.forEach((node) => {
        const cx = node.x * width;
        const cy = node.y * height;

        // Glowing outer halo
        const haloGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, node.r * 4);
        haloGradient.addColorStop(0, node.isSpecial ? 'rgba(56, 189, 248, 0.7)' : 'rgba(229, 195, 120, 0.5)');
        haloGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = haloGradient;
        ctx.beginPath();
        ctx.arc(cx, cy, node.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core star
        ctx.beginPath();
        ctx.arc(cx, cy, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.isSpecial ? '#BAE6FD' : '#FFF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = node.isSpecial ? '#38BDF8' : '#E5C378';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="constellation-section" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1930] border border-[#38BDF8]/30 text-xs text-[#BAE6FD] font-medium mb-3">
            <Compass className="w-3.5 h-3.5 text-[#E5C378]" />
            <span>Mapa Celestial</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mb-2">
            {title}
          </h2>
          <span className="text-xs font-mono text-[#E5C378] tracking-widest uppercase block mb-3">
            {date}
          </span>
          <p className="text-sm sm:text-base text-[#94A3B8] font-light max-w-lg mx-auto">
            “{description}”
          </p>
        </div>

        {/* Canvas Starlight Constellation Box */}
        <div className="relative glass-card rounded-3xl p-4 sm:p-8 border border-[#38BDF8]/30 shadow-2xl overflow-hidden">
          {/* Subtle celestial background gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0B1930_0%,#030712_85%)] pointer-events-none" />

          {/* Canvas */}
          <div className="relative w-full h-[380px] sm:h-[420px]">
            <canvas ref={canvasRef} className="w-full h-full block" />

            {/* Interactive Overlay click points for touch & mouse */}
            {constellationNodes.map((node, i) => {
              const isSpecialHeart = node.isSpecial;

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: `${node.x * 100}%`,
                    top: `${node.y * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="group z-10"
                >
                  <button
                    onClick={() => {
                      if (isSpecialHeart) {
                        onDiscoverSecret('easter-5');
                      }
                      setActiveStar(node.name);
                    }}
                    onMouseEnter={() => setActiveStar(node.name)}
                    className="p-3 rounded-full hover:scale-125 transition-transform cursor-pointer"
                    aria-label={node.name}
                  >
                    {isSpecialHeart ? (
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          isSecretFound
                            ? 'text-[#BAE6FD] fill-[#BAE6FD]'
                            : 'text-[#38BDF8] fill-[#38BDF8] animate-pulse drop-shadow-[0_0_10px_#38BDF8]'
                        }`}
                      />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-white/70 group-hover:bg-[#E5C378] transition-colors" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Interactive Star Label Display */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#E5C378]" />
              <span className="font-serif text-sm sm:text-base text-white">
                {activeStar || "Toque nas estrelas para ver cada momento"}
              </span>
            </div>

            <div className="text-[11px] font-mono text-[#BAE6FD]/80">
              Céu de Fevereiro de 2022 • O dia em que nossos caminhos se cruzaram
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
