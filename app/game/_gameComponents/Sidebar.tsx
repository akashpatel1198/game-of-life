'use client';

import React from 'react';
import Controls from './Controls';

export default function Sidebar() {
  return (
    <aside className="w-72 h-full bg-slate-900 p-4 flex flex-col gap-4 border-r border-slate-700">
      <h2 className="text-xl font-bold text-white">Controls</h2>
      <Controls />
      
      {/* Placeholder for future sections */}
      <div className="flex-1" />
      
      <div className="text-xs text-slate-500">
        Click and drag to draw cells
      </div>
    </aside>
  );
}
