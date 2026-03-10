'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { GRID_LIMITS } from '@/lib/types';

interface ControlsProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Controls({ containerRef }: ControlsProps) {
  const { state, toggleRunning, nextGeneration, clearGrid, randomizeGrid, setSpeed, setGridSize } = useGame();
  const { isRunning, generation, config } = state;
  const { speed, gridSize, cellSize } = config;

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(e.target.value, 10);
    setSpeed(newSpeed);
  };

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(e.target.value, 10);
    if (newRows >= GRID_LIMITS.minRows && newRows <= GRID_LIMITS.maxRows) {
      setGridSize(newRows, gridSize.cols);
    }
  };

  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCols = parseInt(e.target.value, 10);
    if (newCols >= GRID_LIMITS.minCols && newCols <= GRID_LIMITS.maxCols) {
      setGridSize(gridSize.rows, newCols);
    }
  };

  const handleFitToScreen = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const padding = 32;
    const availableWidth = container.clientWidth - padding * 2;
    const availableHeight = container.clientHeight - padding * 2;

    const maxCols = Math.floor(availableWidth / cellSize);
    const maxRows = Math.floor(availableHeight / cellSize);

    const cols = Math.min(Math.max(maxCols, GRID_LIMITS.minCols), GRID_LIMITS.maxCols);
    const rows = Math.min(Math.max(maxRows, GRID_LIMITS.minRows), GRID_LIMITS.maxRows);

    setGridSize(rows, cols);
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
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-400">Grid Size</h3>
          <button
            onClick={handleFitToScreen}
            className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
          >
            Fit to Screen
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-3">Changing size will clear the grid</p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-400 w-12">Rows</label>
            <input
              type="range"
              min={GRID_LIMITS.minRows}
              max={GRID_LIMITS.maxRows}
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
              min={GRID_LIMITS.minCols}
              max={GRID_LIMITS.maxCols}
              value={gridSize.cols}
              onChange={handleColsChange}
              className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-sm text-white font-mono w-8 text-right">{gridSize.cols}</span>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          {gridSize.rows} × {gridSize.cols} = {(gridSize.rows * gridSize.cols).toLocaleString()} cells
        </div>
      </div>
    </div>
  );
}
