'use client';

import React from 'react';
import { GameProvider } from '@/contexts/GameContext';
import Grid from './_gameComponents/Grid';
import Sidebar from './_gameComponents/Sidebar';

export default function GamePage() {
  return (
    <GameProvider>
      <div className="h-screen flex bg-slate-950">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <Grid />
        </main>
      </div>
    </GameProvider>
  );
}
