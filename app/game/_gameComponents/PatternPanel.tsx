'use client';

import React from 'react';
import PatternPicker from './PatternPicker';

interface PatternPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PatternPanel({ isOpen, onClose }: PatternPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - fixed, covers area below top bar */}
      <div 
        className="fixed inset-0 top-14 z-40" 
        onClick={onClose} 
      />

      {/* Panel - fixed, below top bar */}
      <aside className="fixed top-14 right-0 bottom-0 w-80 z-50 animate-slide-in-right">
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
