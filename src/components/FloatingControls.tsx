import { useState, useEffect } from 'react';
import { Play, Pause, Music, Heart, Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface FloatingControlsProps {
  foundSecretsCount: number;
  totalSecrets: number;
  onOpenSecretsModal?: () => void;
  trackTitle: string;
}

export function FloatingControls({
  foundSecretsCount,
  totalSecrets,
  onOpenSecretsModal,
  trackTitle
}: FloatingControlsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const unsubscribe = audioEngine.subscribe(setIsPlaying);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const toggleAudio = () => {
    audioEngine.toggle();
  };

  return (
    <>
      {/* Top Ultra-thin Subtle Reading/Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#030712]/90 z-40">
        <div
          className="h-full bg-gradient-to-r from-[#0284C7] via-[#38BDF8] to-[#93C5FD] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(56,189,248,0.9)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Bottom Navigation / Music Bar */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3 select-none">
        {/* Secrets Found Badge */}
        {foundSecretsCount > 0 && (
          <button
            id="secrets-badge-btn"
            onClick={onOpenSecretsModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0B1930]/90 border border-[#38BDF8]/30 text-xs text-[#BAE6FD] backdrop-blur-md shadow-lg shadow-black/50 hover:border-[#38BDF8] transition-all duration-300"
            title="Segredos descobertos"
          >
            <Heart className="w-3.5 h-3.5 fill-[#38BDF8] text-[#38BDF8] animate-pulse" />
            <span className="font-mono">{foundSecretsCount}/{totalSecrets}</span>
          </button>
        )}

        {/* Music Control Pill */}
        <div
          className={`flex items-center rounded-full bg-[#0B1930]/90 border border-[#38BDF8]/35 backdrop-blur-md shadow-xl shadow-black/60 transition-all duration-300 ${
            isExpanded ? 'px-4 py-2 gap-3' : 'p-2'
          }`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {isExpanded && (
            <div className="flex flex-col text-left max-w-[120px] sm:max-w-[160px] truncate pr-1">
              <span className="text-[10px] uppercase tracking-wider text-[#E5C378]">A sua música</span>
              <span className="text-xs text-white truncate font-medium">{trackTitle}</span>
            </div>
          )}

          {/* Equalizer Bars */}
          {isPlaying && (
            <div className="flex items-end gap-[3px] h-4 px-1" title="Tocando agora">
              <div className="w-[3px] bg-[#38BDF8] rounded-full animate-pulse h-3" />
              <div className="w-[3px] bg-[#BAE6FD] rounded-full animate-bounce h-4" />
              <div className="w-[3px] bg-[#60A5FA] rounded-full animate-pulse h-2" />
            </div>
          )}

          <button
            id="floating-music-toggle-btn"
            onClick={toggleAudio}
            className="w-10 h-10 rounded-full bg-[#071326] hover:bg-[#38BDF8]/20 border border-[#38BDF8]/40 flex items-center justify-center text-white transition-all duration-200 active:scale-95 shadow-md shadow-[#38BDF8]/20"
            aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
            title={isPlaying ? 'Pausar música' : 'Tocar música'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-[#BAE6FD]" />
            ) : (
              <Play className="w-4 h-4 text-[#38BDF8] fill-[#38BDF8] ml-0.5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
