'use client';

import React, { useRef } from 'react';
import { GameProvider } from '@/contexts/GameContext';
import Grid from './_gameComponents/Grid';
import Sidebar from './_gameComponents/Sidebar';

function GameContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-screen flex bg-slate-950">
      <Sidebar containerRef={containerRef} />
      <main 
        ref={containerRef}
        className="flex-1 flex items-center justify-center p-8 overflow-auto"
      >
        <Grid containerRef={containerRef} />
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
