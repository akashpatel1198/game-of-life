'use client';

import React from 'react';
import PatternPicker from './PatternPicker';

interface PatternPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PatternPanel({ isOpen, onClose }: PatternPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="absolute inset-0 z-10" onClick={onClose} />
      )}

      {/* Panel */}
      <aside
        className={`absolute top-0 right-0 h-full w-80 z-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full bg-theme-sidebar/95 backdrop-blur-sm border-l border-theme-border flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-theme-border">
            <h2 className="text-lg font-semibold text-theme-text">Patterns</h2>
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
          <div className="flex-1 overflow-y-auto p-4">
            <PatternPicker />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-theme-border text-xs text-theme-text-muted space-y-1">
            <p>Click a pattern to select</p>
            <p>Hover on grid to preview</p>
            <p>Click grid to place</p>
          </div>
        </div>
      </aside>
    </>
  );
}
