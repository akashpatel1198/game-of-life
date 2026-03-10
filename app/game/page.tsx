'use client';

import React, { useRef, useState } from 'react';
import { GameProvider } from '@/contexts/GameContext';
import Grid from './_gameComponents/Grid';
import TopBar from './_gameComponents/TopBar';
import SettingsPanel from './_gameComponents/SettingsPanel';
import PatternPanel from './_gameComponents/PatternPanel';

function GameContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPatternPanelOpen, setIsPatternPanelOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(prev => !prev);
    if (!isSettingsOpen) setIsPatternPanelOpen(false);
  };

  const togglePatterns = () => {
    setIsPatternPanelOpen(prev => !prev);
    if (!isPatternPanelOpen) setIsSettingsOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-theme-bg overflow-hidden">
      <TopBar 
        isSettingsOpen={isSettingsOpen}
        isPatternPanelOpen={isPatternPanelOpen}
        onToggleSettings={toggleSettings}
        onTogglePatterns={togglePatterns}
      />
      
      <main 
        ref={containerRef}
        className="flex-1 p-8 overflow-auto flex"
      >
        <Grid containerRef={containerRef} />
      </main>

      {/* Panels are fixed positioned, outside of scrollable area */}
      <SettingsPanel 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        containerRef={containerRef}
      />
      
      <PatternPanel 
        isOpen={isPatternPanelOpen}
        onClose={() => setIsPatternPanelOpen(false)}
      />
    </div>
  );
}

export default function GamePage() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
