'use client';

import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { patterns, getCategories, categoryNames, Pattern } from '@/lib/patterns';

function PatternPreview({ pattern }: { pattern: Pattern }) {
  const { cells } = pattern;
  const rows = cells.length;
  const cols = cells[0].length;
  
  const maxDim = Math.max(rows, cols);
  const cellSize = Math.max(2, Math.floor(48 / maxDim));
  
  return (
    <div 
      className="flex items-center justify-center bg-theme-bg rounded p-1.5 shrink-0"
      style={{ width: 56, height: 56 }}
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
    <div className="flex flex-col gap-3">
      {/* Selected Pattern Display */}
      {selectedPattern && (
        <div className="p-3 bg-theme-accent/20 border border-theme-accent/30 rounded-lg">
          <div className="flex items-center gap-3">
            <PatternPreview pattern={selectedPattern} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-theme-text">{selectedPattern.name}</p>
              <p className="text-xs text-theme-text-muted mt-0.5 line-clamp-2">{selectedPattern.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={rotatePattern}
              className="flex-1 text-xs px-3 py-1.5 rounded bg-theme-card hover:bg-theme-card-hover text-theme-text-secondary transition-colors"
            >
              Rotate {patternRotation * 90}°
            </button>
            <button
              onClick={() => selectPattern(null)}
              className="text-xs px-3 py-1.5 rounded bg-theme-card hover:bg-theme-card-hover text-theme-text-muted hover:text-theme-danger transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Category List */}
      <div className="space-y-1">
        {categories.map((category) => {
          const categoryPatterns = patterns.filter(p => p.category === category);
          const isExpanded = expandedCategory === category;

          return (
            <div key={category} className="bg-theme-card rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-theme-card-hover text-theme-text-secondary text-sm font-medium transition-colors"
              >
                <span>{categoryNames[category]}</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs text-theme-text-muted bg-theme-bg px-1.5 py-0.5 rounded">
                    {categoryPatterns.length}
                  </span>
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
                <div className="border-t border-theme-border">
                  {categoryPatterns.map((pattern) => (
                    <button
                      key={pattern.name}
                      onClick={() => handlePatternClick(pattern)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors border-b border-theme-border last:border-b-0 ${
                        selectedPattern?.name === pattern.name
                          ? 'bg-theme-accent/20'
                          : 'hover:bg-theme-card-hover'
                      }`}
                    >
                      <PatternPreview pattern={pattern} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          selectedPattern?.name === pattern.name ? 'text-theme-accent' : 'text-theme-text'
                        }`}>
                          {pattern.name}
                        </p>
                        <p className="text-xs text-theme-text-muted mt-0.5 line-clamp-2">
                          {pattern.description}
                        </p>
                      </div>
                      {selectedPattern?.name === pattern.name && (
                        <svg className="w-5 h-5 text-theme-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
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
