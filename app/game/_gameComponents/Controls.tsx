'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';

export default function Controls() {
  const { state, toggleRunning, nextGeneration, clearGrid, randomizeGrid, setSpeed, setGridSize } = useGame();
  const { isRunning, generation, config } = state;
  const { speed, gridSize } = config;

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(e.target.value, 10);
    setSpeed(newSpeed);
  };

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(e.target.value, 10);
    if (newRows >= 10 && newRows <= 100) {
      setGridSize(newRows, gridSize.cols);
    }
  };

  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCols = parseInt(e.target.value, 10);
    if (newCols >= 10 && newCols <= 100) {
      setGridSize(gridSize.rows, newCols);
    }
  };

  const getSpeedLabel = (ms: number): string => {
    if (ms <= 50) return 'Fast';
    if (ms <= 150) return 'Normal';
    if (ms <= 300) return 'Slow';
    return 'Very Slow';
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Generation Counter */}
      <div className="p-4 bg-slate-800 rounded-lg">
        <div className="text-sm text-slate-400">
          Generation: <span className="font-mono text-white text-lg">{generation}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="p-4 bg-slate-800 rounded-lg">
        <h3 className="text-sm font-medium text-slate-400 mb-3">Playback</h3>
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

      {/* Speed Control */}
      <div className="p-4 bg-slate-800 rounded-lg">
        <h3 className="text-sm font-medium text-slate-400 mb-3">Speed</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="20"
            max="500"
            value={speed}
            onChange={handleSpeedChange}
            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Fast</span>
            <span className="text-slate-300">{getSpeedLabel(speed)} ({speed}ms)</span>
            <span>Slow</span>
          </div>
        </div>
      </div>

      {/* Grid Size Controls */}
      <div className="p-4 bg-slate-800 rounded-lg">
        <h3 className="text-sm font-medium text-slate-400 mb-3">Grid Size</h3>
        <p className="text-xs text-slate-500 mb-3">Changing size will clear the grid</p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-400 w-12">Rows</label>
            <input
              type="range"
              min="10"
              max="100"
              value={gridSize.rows}
              onChange={handleRowsChange}
              className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-sm text-white font-mono w-8 text-right">{gridSize.rows}</span>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-400 w-12">Cols</label>
            <input
              type="range"
              min="10"
              max="100"
              value={gridSize.cols}
              onChange={handleColsChange}
              className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-sm text-white font-mono w-8 text-right">{gridSize.cols}</span>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          {gridSize.rows} × {gridSize.cols} = {gridSize.rows * gridSize.cols} cells
        </div>
      </div>
    </div>
  );
}
