'use client';

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { useTheme } from '@/contexts/ThemeContext';

interface TopBarProps {
  onOpenSettings: () => void;
  onOpenPatterns: () => void;
}

export default function TopBar({ onOpenSettings, onOpenPatterns }: TopBarProps) {
  const { state, toggleRunning, nextGeneration, clearGrid, randomizeGrid, selectedPattern } = useGame();
  const { theme, toggleTheme } = useTheme();
  const { isRunning, generation } = state;

  return (
    <header className="h-14 bg-theme-sidebar border-b border-theme-border px-4 flex items-center justify-between shrink-0">
      {/* Left: Main controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleRunning}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isRunning
              ? 'bg-theme-danger hover:bg-theme-danger-hover text-white'
              : 'bg-theme-accent hover:bg-theme-accent-hover text-white'
          }`}
        >
          {isRunning ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={nextGeneration}
          disabled={isRunning}
          className="px-3 py-2 rounded-md font-medium bg-theme-card hover:bg-theme-card-hover text-theme-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Step
        </button>

        <div className="w-px h-6 bg-theme-border mx-1" />

        <button
          onClick={clearGrid}
          className="px-3 py-2 rounded-md font-medium bg-theme-card hover:bg-theme-card-hover text-theme-text transition-colors"
        >
          Clear
        </button>

        <button
          onClick={randomizeGrid}
          className="px-3 py-2 rounded-md font-medium bg-theme-card hover:bg-theme-card-hover text-theme-text transition-colors"
        >
          Random
        </button>
      </div>

      {/* Center: Generation counter */}
      <div className="absolute left-1/2 -translate-x-1/2 text-theme-text-secondary">
        Generation: <span className="font-mono text-theme-text font-semibold">{generation}</span>
      </div>

      {/* Right: Settings, Patterns, Theme */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSettings}
          className="px-3 py-2 rounded-md font-medium bg-theme-card hover:bg-theme-card-hover text-theme-text transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </button>

        <button
          onClick={onOpenPatterns}
          className={`px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
            selectedPattern 
              ? 'bg-theme-accent/20 text-theme-accent border border-theme-accent/30' 
              : 'bg-theme-card hover:bg-theme-card-hover text-theme-text'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          {selectedPattern ? selectedPattern.name : 'Patterns'}
        </button>

        <div className="w-px h-6 bg-theme-border mx-1" />

        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-theme-card hover:bg-theme-card-hover transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
