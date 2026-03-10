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

  return (
    <div className="h-screen flex flex-col bg-theme-bg overflow-hidden">
      <TopBar 
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenPatterns={() => setIsPatternPanelOpen(true)}
      />
      
      <main 
        ref={containerRef}
        className="flex-1 relative flex items-center justify-center p-8 overflow-auto"
      >
        <Grid containerRef={containerRef} />
        
        <SettingsPanel 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          containerRef={containerRef}
        />
        
        <PatternPanel 
          isOpen={isPatternPanelOpen}
          onClose={() => setIsPatternPanelOpen(false)}
        />
      </main>
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
