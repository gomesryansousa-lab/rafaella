export interface Milestone {
  id: string;
  date: string;
  displayDate: string;
  title: string;
  description: string;
  details?: string;
  photo?: string;
  location?: string;
  tag: string;
  isFragile?: boolean;
  highlightPhrase?: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  location?: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  span?: string;
}

export interface LoveReason {
  id: number;
  number: string;
  shortTitle: string;
  content: string;
}

export interface SecretMessage {
  id: string;
  hint: string;
  location: string;
  message: string;
  unlockedTitle: string;
}

export interface CoupleConfig {
  partnerName: string;
  senderName: string;
  metDate: string;
  whatsapp: string;
  heroPhoto?: string;
  music: {
    title: string;
    artist: string;
    audioUrl: string;
    coverImage: string;
  };
  timeline: Milestone[];
  gallery: GalleryPhoto[];
  reasons: LoveReason[];
  secretMessages: SecretMessage[];
  secretUnsaidLetter: {
    teaser: string;
    title: string;
    typewriterIntro: string;
    content: string[];
    closing: string;
  };
  loveLetter: {
    title: string;
    date: string;
    paragraphs: string[];
    signOff: string;
  };
  constellation: {
    title: string;
    date: string;
    description: string;
  };
  finalSection: {
    paragraphs: string[];
    closingNotes: string[];
    ctaButton: string;
    whatsappPrompt: string;
    whatsappDefaultText: string;
  };
}
