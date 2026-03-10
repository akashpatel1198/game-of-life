'use client';

import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { patterns, getCategories, categoryNames, Pattern } from '@/lib/patterns';

function PatternPreview({ pattern, size = 4 }: { pattern: Pattern; size?: number }) {
  const { cells } = pattern;
  const rows = cells.length;
  const cols = cells[0].length;
  
  // Scale to fit in preview box
  const maxDim = Math.max(rows, cols);
  const cellSize = Math.max(2, Math.floor(40 / maxDim));
  
  return (
    <div 
      className="flex items-center justify-center bg-theme-bg rounded p-1"
      style={{ minWidth: 48, minHeight: 48 }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gap: '1px',
        }}
      >
        {cells.flat().map((cell, i) => (
          <div
            key={i}
            className={cell === 1 ? 'bg-theme-accent' : 'bg-theme-card-hover'}
            style={{ width: cellSize, height: cellSize }}
          />
        ))}
      </div>
    </div>
  );
}

export default function PatternPicker() {
  const { selectedPattern, selectPattern, rotatePattern, patternRotation } = useGame();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('spaceship');

  const categories = getCategories();

  const handlePatternClick = (pattern: Pattern) => {
    if (selectedPattern?.name === pattern.name) {
      selectPattern(null);
    } else {
      selectPattern(pattern);
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-theme-text-secondary">Patterns</h3>
        {selectedPattern && (
          <button
            onClick={rotatePattern}
            className="text-xs px-2 py-1 rounded bg-theme-card-hover hover:opacity-80 text-theme-text-secondary transition-colors"
            title="Rotate pattern (R)"
          >
            Rotate {patternRotation * 90}°
          </button>
        )}
      </div>

      {selectedPattern && (
        <div className="p-2 bg-theme-accent/20 border border-theme-accent/30 rounded-lg mb-2">
          <div className="flex items-center gap-2">
            <PatternPreview pattern={selectedPattern} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-theme-text truncate">{selectedPattern.name}</p>
              <p className="text-xs text-theme-text-muted truncate">{selectedPattern.description}</p>
              <p className="text-xs text-theme-accent mt-1">Click on grid to place</p>
            </div>
            <button
              onClick={() => selectPattern(null)}
              className="p-1 text-theme-text-muted hover:text-theme-text transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-1 max-h-64 overflow-y-auto">
        {categories.map((category) => {
          const categoryPatterns = patterns.filter(p => p.category === category);
          const isExpanded = expandedCategory === category;

          return (
            <div key={category}>
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-theme-card-hover text-theme-text-secondary text-sm transition-colors"
              >
                <span>{categoryNames[category]}</span>
                <span className="flex items-center gap-1">
                  <span className="text-xs text-theme-text-muted">{categoryPatterns.length}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {isExpanded && (
                <div className="ml-2 mt-1 space-y-1">
                  {categoryPatterns.map((pattern) => (
                    <button
                      key={pattern.name}
                      onClick={() => handlePatternClick(pattern)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors ${
                        selectedPattern?.name === pattern.name
                          ? 'bg-theme-accent/20 text-theme-accent'
                          : 'hover:bg-theme-card-hover text-theme-text-secondary'
                      }`}
                    >
                      <PatternPreview pattern={pattern} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{pattern.name}</p>
                        <p className="text-xs text-theme-text-muted truncate">{pattern.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
