'use client';

import React from 'react';
import Controls from './Controls';

interface SidebarProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Sidebar({ containerRef }: SidebarProps) {
  return (
    <aside className="w-80 h-full bg-slate-900 p-4 flex flex-col gap-4 border-r border-slate-700 overflow-y-auto">
      <h2 className="text-xl font-bold text-white">Game of Life</h2>
      <Controls containerRef={containerRef} />
      
      <div className="flex-1" />
      
      <div className="text-xs text-slate-500 space-y-1">
        <p>Click and drag to draw cells</p>
        <p>Press Play to start simulation</p>
      </div>
    </aside>
  );
}
