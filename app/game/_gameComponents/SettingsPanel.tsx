'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { GRID_LIMITS } from '@/lib/types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function SettingsPanel({ isOpen, onClose, containerRef }: SettingsPanelProps) {
  const { state, setSpeed, setGridSize } = useGame();
  const { config } = state;
  const { speed, gridSize, cellSize } = config;

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(e.target.value, 10));
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - fixed, covers area below top bar */}
      <div 
        className="fixed inset-0 top-14 z-40" 
        onClick={onClose} 
      />

      {/* Panel - fixed, below top bar */}
      <aside className="fixed top-14 left-0 bottom-0 w-72 z-50 animate-slide-in-left">
        <div className="h-full bg-theme-sidebar/95 backdrop-blur-sm border-r border-theme-border flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-theme-border">
            <h2 className="text-lg font-semibold text-theme-text">Settings</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-theme-card-hover text-theme-text-muted hover:text-theme-text transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Speed Control */}
            <div>
              <h3 className="text-sm font-medium text-theme-text-secondary mb-3">Speed</h3>
              <input
                type="range"
                min="20"
                max="500"
                value={speed}
                onChange={handleSpeedChange}
                className="w-full h-2 bg-theme-card rounded-lg appearance-none cursor-pointer accent-theme-accent"
              />
              <div className="flex justify-between text-xs text-theme-text-muted mt-2">
                <span>Fast</span>
                <span className="text-theme-text-secondary">{getSpeedLabel(speed)} ({speed}ms)</span>
                <span>Slow</span>
              </div>
            </div>

            {/* Grid Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-theme-text-secondary">Grid Size</h3>
                <button
                  onClick={handleFitToScreen}
                  className="text-xs px-2 py-1 rounded bg-theme-card hover:bg-theme-card-hover text-theme-text-secondary transition-colors"
                >
                  Fit to Screen
                </button>
              </div>
              <p className="text-xs text-theme-text-muted mb-3">Changing size will clear the grid</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-theme-text-secondary w-10">Rows</label>
                  <input
                    type="range"
                    min={GRID_LIMITS.minRows}
                    max={GRID_LIMITS.maxRows}
                    value={gridSize.rows}
                    onChange={handleRowsChange}
                    className="flex-1 h-2 bg-theme-card rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <span className="text-sm text-theme-text font-mono w-8 text-right">{gridSize.rows}</span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm text-theme-text-secondary w-10">Cols</label>
                  <input
                    type="range"
                    min={GRID_LIMITS.minCols}
                    max={GRID_LIMITS.maxCols}
                    value={gridSize.cols}
                    onChange={handleColsChange}
                    className="flex-1 h-2 bg-theme-card rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <span className="text-sm text-theme-text font-mono w-8 text-right">{gridSize.cols}</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-theme-text-muted">
                {gridSize.rows} × {gridSize.cols} = {(gridSize.rows * gridSize.cols).toLocaleString()} cells
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-theme-border text-xs text-theme-text-muted">
            <p>Click and drag on grid to draw</p>
          </div>
        </div>
      </aside>
    </>
  );
}
