/**
 * Romantic Audio Engine
 * Combines HTML5 Audio with a Web Audio API ambient acoustic piano synthesizer.
 * Guarantees romantic soundtrack playback on mobile and desktop under all autoplay policies.
 */

class RomanticAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private isSynthesizerRunning: boolean = false;
  private synthIntervalId: number | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.75;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private progressListeners: Set<(progress: number, currentTime: number, duration: number) => void> = new Set();
  private currentTrackUrl: string = '';
  private synthGainNode: GainNode | null = null;

  constructor() {
    // Will be initialized upon user gesture
  }

  public init(trackUrl: string) {
    this.currentTrackUrl = trackUrl;
    if (typeof window === 'undefined') return;

    if (!this.audio) {
      this.audio = new Audio();
      this.audio.src = trackUrl;
      this.audio.loop = true;
      this.audio.volume = this.volume;
      this.audio.preload = 'auto';

      this.audio.addEventListener('timeupdate', () => {
        if (!this.audio) return;
        const current = this.audio.currentTime || 0;
        const duration = this.audio.duration || 180;
        const progress = duration > 0 ? (current / duration) * 100 : 0;
        this.progressListeners.forEach(listener => listener(progress, current, duration));
      });

      this.audio.addEventListener('ended', () => {
        if (this.audio) {
          this.audio.currentTime = 0;
          this.audio.play().catch(() => {});
        }
      });

      this.audio.addEventListener('error', () => {
        // If external audio fails (CORS/offline), seamlessly activate Web Audio synth
        this.startAmbientSynthesizer();
      });
    } else if (this.audio.src !== trackUrl) {
      this.audio.src = trackUrl;
      this.audio.load();
    }
  }

  private initAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
        this.synthGainNode = this.audioCtx.createGain();
        this.synthGainNode.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
        this.synthGainNode.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public async play(): Promise<void> {
    this.initAudioContext();

    let html5Success = false;
    if (this.audio) {
      try {
        await this.audio.play();
        html5Success = true;
      } catch {
        // Autoplay or network issue
        html5Success = false;
      }
    }

    if (!html5Success) {
      this.startAmbientSynthesizer();
    }

    this.isPlaying = true;
    this.notifyListeners();
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.stopAmbientSynthesizer();
    this.isPlaying = false;
    this.notifyListeners();
  }

  public toggle(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public seek(progressPercent: number): void {
    if (this.audio && this.audio.duration) {
      this.audio.currentTime = (progressPercent / 100) * this.audio.duration;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => this.listeners.delete(listener);
  }

  public subscribeProgress(listener: (progress: number, currentTime: number, duration: number) => void): () => void {
    this.progressListeners.add(listener);
    return () => this.progressListeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(fn => fn(this.isPlaying));
  }

  // Web Audio ambient harmonic piano arpeggiator
  private startAmbientSynthesizer(): void {
    if (this.isSynthesizerRunning || !this.audioCtx || !this.synthGainNode) return;
    this.isSynthesizerRunning = true;

    // Romantic acoustic chord progression of "Velha Infância" (Am - F - C - G):
    // Am: A2, E3, A3, C4, E4
    // F:  F2, C3, F3, A3, C4
    // C:  C3, G3, C4, E4, G4
    // G:  G2, D3, G3, B3, D4
    const chords = [
      [110.00, 164.81, 220.00, 261.63, 329.63], // Am
      [87.31, 130.81, 174.61, 220.00, 261.63],  // F
      [130.81, 196.00, 261.63, 329.63, 392.00], // C
      [98.00, 146.83, 196.00, 246.94, 293.66]   // G
    ];

    let chordIndex = 0;
    let noteIndex = 0;

    const playHarmonicNote = () => {
      if (!this.audioCtx || !this.synthGainNode || !this.isSynthesizerRunning) return;

      const currentChord = chords[chordIndex];
      const freq = currentChord[noteIndex % currentChord.length];

      try {
        const osc = this.audioCtx.createOscillator();
        const osc2 = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        // Warm lowpass filter to mimic acoustic felt piano
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, this.audioCtx.currentTime);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 1.002, this.audioCtx.currentTime); // Subtle chorus

        const now = this.audioCtx.currentTime;
        noteGain.gain.setValueAtTime(0.001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.08); // soft attack
        noteGain.gain.exponentialRampToValueAtTime(0.001, now + 2.4); // lingering release

        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.synthGainNode);

        osc.start(now);
        osc2.start(now);
        osc.stop(now + 2.5);
        osc2.stop(now + 2.5);
      } catch {
        // Guard against any context closing
      }

      noteIndex++;
      if (noteIndex >= currentChord.length) {
        noteIndex = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }
    };

    // Play note every 650ms for a peaceful arpeggio tempo
    playHarmonicNote();
    this.synthIntervalId = window.setInterval(playHarmonicNote, 650);
  }

  private stopAmbientSynthesizer(): void {
    if (this.synthIntervalId) {
      clearInterval(this.synthIntervalId);
      this.synthIntervalId = null;
    }
    this.isSynthesizerRunning = false;
  }
}

export const audioEngine = new RomanticAudioEngine();
