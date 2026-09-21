/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { coupleData } from './config/coupleData';
import { audioEngine } from './utils/audioEngine';
import { BackgroundAmbience } from './components/BackgroundAmbience';
import { CustomCursor } from './components/CustomCursor';
import { CinematicEntryGate } from './components/CinematicEntryGate';
import { FloatingControls } from './components/FloatingControls';
import { HeroSection } from './components/HeroSection';
import { MusicCard } from './components/MusicCard';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { CinematicFocusSection } from './components/CinematicFocusSection';
import { LoveReasonsSection } from './components/LoveReasonsSection';
import { SecretLetterSection } from './components/SecretLetterSection';
import { LoveLetterCard } from './components/LoveLetterCard';
import { RelationalStatsSection } from './components/RelationalStatsSection';
import { ConstellationSection } from './components/ConstellationSection';
import { FinalSurpriseSection } from './components/FinalSurpriseSection';
import { EasterEggModal } from './components/EasterEggModal';
import { SecretMessage } from './types';
import { Heart } from 'lucide-react';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [foundSecretIds, setFoundSecretIds] = useState<string[]>([]);
  const [activeSecretMessage, setActiveSecretMessage] = useState<SecretMessage | null>(null);

  // Initialize audio engine with track URL
  useEffect(() => {
    audioEngine.init(coupleData.music.audioUrl);
  }, []);

  const handleEnterExperience = () => {
    setHasEntered(true);
    // Play romantic soundtrack upon explicit user gesture
    audioEngine.play();
  };

  const handleDiscoverSecret = (secretId: string) => {
    if (!foundSecretIds.includes(secretId)) {
      setFoundSecretIds(prev => [...prev, secretId]);
    }
    const secret = coupleData.secretMessages.find(m => m.id === secretId);
    if (secret) {
      setActiveSecretMessage(secret);
    }
  };

  const handleOpenSecretsOverview = () => {
    const firstFound = coupleData.secretMessages.find(m => foundSecretIds.includes(m.id))
      || coupleData.secretMessages[0];
    setActiveSecretMessage(firstFound);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-[#F1F5F9] overflow-x-hidden font-sans select-none">
      {/* Dynamic Background Lighting & Grain Particles */}
      <BackgroundAmbience />

      {/* Desktop Glowing Cursor Trail */}
      <CustomCursor />

      {/* Cinematic Fullscreen Entry Gate */}
      {!hasEntered ? (
        <CinematicEntryGate
          onEnter={handleEnterExperience}
          partnerName={coupleData.partnerName}
        />
      ) : (
        <>
          {/* Top Reading Progress Bar & Floating Music Controls */}
          <FloatingControls
            foundSecretsCount={foundSecretIds.length}
            totalSecrets={coupleData.secretMessages.length}
            onOpenSecretsModal={handleOpenSecretsOverview}
            trackTitle={coupleData.music.title}
          />

          {/* Main Flow of Romantic Experience */}
          <main className="relative z-10 w-full pb-20">
            {/* 2. Hero Section */}
            <HeroSection
              config={coupleData}
              onDiscoverSecret={handleDiscoverSecret}
              isSecretFound={foundSecretIds.includes('easter-1')}
            />

            {/* 4. "A sua música" Card */}
            <MusicCard music={coupleData.music} />

            {/* 5. "Como tudo começou..." (Interactive Timeline) */}
            <TimelineSection
              milestones={coupleData.timeline}
              onDiscoverSecret={handleDiscoverSecret}
              isSecretFound={foundSecretIds.includes('easter-3')}
            />

            {/* 6. "Alguns momentos que eu guardo com carinho" */}
            <GallerySection
              photos={coupleData.gallery}
              onDiscoverSecret={handleDiscoverSecret}
              isSecretFound={foundSecretIds.includes('easter-4')}
            />

            {/* 8. "Coisas que eu devia ter te dito mais vezes" Envelopes */}
            <LoveReasonsSection reasons={coupleData.reasons} />

            {/* 9. Seção Surpresa ("Agora, sem metáfora.") */}
            <SecretLetterSection letter={coupleData.secretUnsaidLetter} />

            {/* 10. Carta para Rafaella */}
            <LoveLetterCard letter={coupleData.loveLetter} />

            {/* 11. "Nosso Tempo" (Relational Stats) */}
            <RelationalStatsSection startDate={coupleData.metDate} />

            {/* 13. Constelação ("O céu naquela noite") */}
            <ConstellationSection
              title={coupleData.constellation.title}
              date={coupleData.constellation.date}
              description={coupleData.constellation.description}
              onDiscoverSecret={handleDiscoverSecret}
              isSecretFound={foundSecretIds.includes('easter-5')}
            />

            {/* 14. Seção Final & WhatsApp Dialog */}
            <FinalSurpriseSection config={coupleData} />

            {/* Footer with Easter Egg #2 */}
            <footer className="text-center pt-10 pb-16 border-t border-white/5 px-4">
              <button
                id="easter-egg-2-btn"
                onClick={() => handleDiscoverSecret('easter-2')}
                className="group inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-[#94A3B8] hover:text-[#BAE6FD] font-light transition-colors py-2 px-4 rounded-full hover:bg-white/[0.04] cursor-pointer max-w-xl mx-auto"
              >
                <Heart
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                    foundSecretIds.includes('easter-2')
                      ? 'text-[#BAE6FD] fill-[#BAE6FD]'
                      : 'text-[#38BDF8]/50 fill-[#38BDF8]/30 group-hover:text-[#38BDF8]'
                  }`}
                />
                <span className="italic leading-relaxed">
                  Se você chegou até aqui, obrigado de verdade. Só isso já é mais do que eu merecia.
                </span>
              </button>
            </footer>
          </main>

          {/* Secret Easter Egg Dialogue Modal */}
          <EasterEggModal
            message={activeSecretMessage}
            foundIds={foundSecretIds}
            totalMessages={coupleData.secretMessages.length}
            onClose={() => setActiveSecretMessage(null)}
          />
        </>
      )}
    </div>
  );
}
