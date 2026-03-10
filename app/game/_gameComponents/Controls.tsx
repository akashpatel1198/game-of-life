'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';

export default function Controls() {
  const { state, toggleRunning, nextGeneration, clearGrid, randomizeGrid } = useGame();
  const { isRunning, generation } = state;

  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-800 rounded-lg">
      <div className="text-sm text-slate-400">
        Generation: <span className="font-mono text-white">{generation}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={toggleRunning}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isRunning ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={nextGeneration}
          disabled={isRunning}
          className="px-4 py-2 rounded-md font-medium bg-slate-600 hover:bg-slate-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Step
        </button>

        <button
          onClick={clearGrid}
          className="px-4 py-2 rounded-md font-medium bg-slate-600 hover:bg-slate-500 text-white transition-colors"
        >
          Clear
        </button>

        <button
          onClick={randomizeGrid}
          className="px-4 py-2 rounded-md font-medium bg-slate-600 hover:bg-slate-500 text-white transition-colors"
        >
          Random
        </button>
      </div>
    </div>
  );
}
