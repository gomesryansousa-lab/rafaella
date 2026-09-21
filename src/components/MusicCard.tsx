import { useState, useEffect } from 'react';
import { Play, Pause, Music2, Heart, Sparkles, Disc3, Volume2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface MusicCardProps {
  music: {
    title: string;
    artist: string;
    coverImage: string;
    audioUrl: string;
  };
  onDiscoverSecret?: (id: string) => void;
  isSecretFound?: boolean;
}

export function MusicCard({ music }: MusicCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);

  useEffect(() => {
    const unsubPlaying = audioEngine.subscribe(setIsPlaying);
    const unsubProgress = audioEngine.subscribeProgress((p, cur, dur) => {
      setProgress(p);
      setCurrentTime(cur);
      if (dur > 0) setDuration(dur);
    });

    return () => {
      unsubPlaying();
      unsubProgress();
    };
  }, []);

  const togglePlay = () => {
    audioEngine.toggle();
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = (clickX / rect.width) * 100;
    audioEngine.seek(percent);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="music-section" className="py-16 px-4 sm:px-6 relative">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1930] border border-[#38BDF8]/30 text-xs text-[#BAE6FD] font-medium mb-3">
            <Music2 className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Tribalistas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal mb-3.5 text-glow-blue">
            A sua musica favorita
          </h2>
          <div className="relative inline-block mt-1 px-1">
            <p className="font-serif text-base sm:text-lg text-[#BAE6FD] font-normal italic tracking-wide max-w-md mx-auto px-5 py-2 rounded-full bg-gradient-to-r from-[#071326]/90 via-[#0B1930]/90 to-[#071326]/90 border border-[#38BDF8]/40 shadow-[0_0_22px_rgba(56,189,248,0.35)] drop-shadow-[0_0_10px_rgba(186,230,253,0.6)]">
              “Ela não é só a sua favorita. Ela se tornou a minha também.”
            </p>
          </div>
        </div>

        {/* High-end Dark Glassmorphism Card with Glowing Border */}
        <div className="relative group">
          {/* Subtle outer glow on hover */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#38BDF8]/30 via-[#0B1930] to-[#38BDF8]/20 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative glass-card rounded-3xl p-6 sm:p-8 border border-[#38BDF8]/30 shadow-2xl overflow-hidden">
            {/* Floating musical note particles effect */}
            {isPlaying && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <span className="absolute top-4 left-1/4 text-xs text-[#38BDF8]/60 animate-subtle-float">♪</span>
                <span className="absolute top-1/2 right-6 text-sm text-[#BAE6FD]/60 animate-subtle-float" style={{ animationDelay: '1.2s' }}>♫</span>
                <span className="absolute bottom-8 left-8 text-xs text-[#E5C378]/50 animate-subtle-float" style={{ animationDelay: '2.5s' }}>♩</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Cover with rotating vinyl effect */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0">
                <div
                  className={`w-full h-full rounded-2xl overflow-hidden border border-[#38BDF8]/40 shadow-xl shadow-black/60 relative ${
                    isPlaying ? 'shadow-[0_0_25px_rgba(56,189,248,0.4)]' : ''
                  }`}
                >
                  <img
                    src={music.coverImage}
                    alt={music.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('nos-2.jpeg')) {
                        target.src = '/assets/nos-2.jpeg';
                      }
                    }}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Disc rotation indicator */}
                <div
                  className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#0B1930] border border-[#38BDF8]/50 flex items-center justify-center shadow-lg ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '6s' }}
                >
                  <Disc3 className="w-6 h-6 text-[#38BDF8]" />
                </div>
              </div>

              {/* Track Details & Playback */}
              <div className="flex-1 w-full text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-between gap-2 mb-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#E5C378] font-semibold">
                    Tribalistas
                  </span>
                  {isPlaying && (
                    <span className="flex items-center gap-1 text-[11px] text-[#38BDF8] font-mono">
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                      Tocando
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl text-white font-medium mb-1 truncate">
                  {music.title}
                </h3>
                <p className="text-sm text-[#BAE6FD]/80 font-light mb-5">
                  {music.artist}
                </p>

                {/* Interactive Progress Timeline */}
                <div className="space-y-1.5 mb-5">
                  <div
                    onClick={handleProgressBarClick}
                    className="relative w-full h-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer overflow-hidden transition-colors"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#BAE6FD] rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#94A3B8] font-mono">
                    <span>{formatSeconds(currentTime)}</span>
                    <span>{formatSeconds(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <button
                    id="music-card-play-btn"
                    onClick={togglePlay}
                    className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#38BDF8] hover:to-[#0284C7] text-white text-sm font-medium transition-all duration-300 shadow-lg shadow-[#0284C7]/35 active:scale-95 cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-white" />
                        <span>Pausar</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        <span>Toque para ouvir</span>
                      </>
                    )}
                  </button>

                  <div className="text-xs text-[#BAE6FD]/80 italic font-serif">
                    “Você é assim, um sonho pra mim…”
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
