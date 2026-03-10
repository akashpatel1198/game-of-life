'use client';

import React from 'react';
import Controls from './Controls';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Sidebar({ containerRef }: SidebarProps) {
  return (
    <aside className="w-80 h-full bg-theme-sidebar p-4 flex flex-col gap-4 border-r border-theme-border overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-theme-text">Game of Life</h2>
        <ThemeToggle />
      </div>
      <Controls containerRef={containerRef} />
      
      <div className="flex-1" />
      
      <div className="text-xs text-theme-text-muted space-y-1">
        <p>Click and drag to draw cells</p>
        <p>Press Play to start simulation</p>
      </div>
    </aside>
  );
}
