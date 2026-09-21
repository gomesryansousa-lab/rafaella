import { useEffect, useRef } from 'react';

export function BackgroundAmbience() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
    }

    const colors = [
      'rgba(56, 189, 248, ', // luminous ice blue (#38bdf8)
      'rgba(96, 165, 250, ', // sky blue (#60a5fa)
      'rgba(186, 230, 253, ', // delicate ice cyan (#bae6fd)
      'rgba(229, 195, 120, ', // soft gold (#e5c378)
      'rgba(241, 245, 249, '  // clean white
    ];

    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.35 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      fadeSpeed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.fadeSpeed;

        if (p.opacity <= 0.1 || p.opacity >= 0.8) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap around bounds
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.opacity))})`;
        ctx.shadowBlur = p.size * 3.5;
        ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep gradient background layers */}
      <div className="absolute inset-0 bg-[#030712]" />

      {/* Bokeh lights with soft pulse */}
      <div
        className="absolute -top-32 -left-28 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#38BDF8]/14 to-[#071326]/50 blur-[130px] animate-ambient-pulse"
        style={{ animationDuration: '10s' }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#0B1930]/70 via-[#071326]/40 to-[#38BDF8]/10 blur-[150px] animate-ambient-pulse"
        style={{ animationDuration: '13s', animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-10 left-1/4 w-[480px] h-[480px] rounded-full bg-gradient-to-t from-[#0B1930]/60 via-[#60A5FA]/10 to-transparent blur-[120px] animate-ambient-pulse"
        style={{ animationDuration: '11s', animationDelay: '4s' }}
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(3,7,18,0.85)_100%)]" />

      {/* Floating particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-65" />
    </div>
  );
}
