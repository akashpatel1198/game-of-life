'use client';

import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen bg-theme-bg text-theme-text font-sans relative">
      {/* Theme Toggle - fixed in corner */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-lg bg-theme-card hover:bg-theme-card-hover transition-colors z-10"
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

      <div className="max-w-3xl mx-auto px-8 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-theme-text mb-4">
            Conway's Game of Life
          </h1>
          <p className="text-xl text-theme-text-secondary">
            A cellular automaton simulation
          </p>
        </header>

        {/* CTA Button */}
        <div className="text-center mb-16">
          <Link href="/game">
            <button className="bg-theme-accent hover:bg-theme-accent-hover text-white text-lg font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg">
              Start Simulation
            </button>
          </Link>
        </div>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-theme-text mb-4">What is it?</h2>
          <p className="text-theme-text-secondary leading-relaxed mb-4">
            The Game of Life is a <strong className="text-theme-text">cellular automaton</strong> devised by British mathematician{" "}
            <strong className="text-theme-text">John Horton Conway</strong> in 1970. Despite its name, it's not a traditional game. It is actually a{" "}
            <strong className="text-theme-text">zero-player game</strong>. Meaning its evolution is entirely determined by its initial state.
          </p>
          <p className="text-theme-text-secondary leading-relaxed">
            To interact, you can set up the initial configuration of cells, press play, and watch how the system evolves over time. 
            No further input is needed and the rules take over, patterns emerge, evolve, and sometimes die out completely.
          </p>
        </section>

        {/* Rules Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-theme-text mb-4">The Rules</h2>
          <p className="text-theme-text-secondary leading-relaxed mb-4">
            The universe is an infinite two-dimensional grid of cells, each in one of two states: <strong className="text-theme-accent">alive</strong> or{" "}
            <strong className="text-theme-text-muted">dead</strong>. Every cell interacts with its eight neighbors. At each step:
          </p>
          <ul className="space-y-3 text-theme-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-theme-danger font-mono">1.</span>
              <span>Any live cell with <strong className="text-theme-text">fewer than 2</strong> live neighbors dies (underpopulation)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-theme-accent font-mono">2.</span>
              <span>Any live cell with <strong className="text-theme-text">2 or 3</strong> live neighbors survives</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-theme-danger font-mono">3.</span>
              <span>Any live cell with <strong className="text-theme-text">more than 3</strong> live neighbors dies (overpopulation)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-theme-accent font-mono">4.</span>
              <span>Any dead cell with <strong className="text-theme-text">exactly 3</strong> live neighbors becomes alive (reproduction)</span>
            </li>
          </ul>
        </section>

        {/* Why it matters */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-theme-text mb-4">Why does it matter?</h2>
          <p className="text-theme-text-secondary leading-relaxed mb-4">
            The Game of Life is <strong className="text-theme-text">Turing complete</strong> {"(let's pretend I knew what that means)"}, meaning it can simulate any computer algorithm. 
            People have built working computers, calculators, and even other Game of Life simulations inside of it.
          </p>
          <p className="text-theme-text-secondary leading-relaxed">
            It demonstrates how complex behavior can emerge from simple rules; A concept relevant to biology, physics, 
            computer science, and philosophy. It's a beautiful example of <strong className="text-theme-text">emergent complexity</strong>.
          </p>
        </section>

        {/* Links */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-theme-text mb-4">Learn More</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-theme-card hover:bg-theme-card-hover rounded-lg text-theme-text-secondary hover:text-theme-text transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V17.89c-.501.132-.962.198-1.377.198-1.296 0-1.927-.892-2.193-1.594-.114-.306-.51-1.063-1.18-1.063-.34 0-.68.17-.68.511 0 .592.926 1.03 1.712 1.03.685 0 1.307-.31 1.738-.824V17.89c-.501.132-.962.198-1.377.198-1.296 0-1.927-.892-2.193-1.594-.114-.306-.51-1.063-1.18-1.063-.34 0-.68.17-.68.511 0 .592.926 1.03 1.712 1.03.685 0 1.307-.31 1.738-.824.252-.318.375-.706.375-1.094V12c0-3.866 3.134-7 7-7s7 3.134 7 7-3.134 7-7 7c-.34 0-.68-.026-1.01-.074v2.01c.334.041.672.064 1.01.064 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
              Wikipedia
            </a>
            <a
              href="https://conwaylife.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-theme-card hover:bg-theme-card-hover rounded-lg text-theme-text-secondary hover:text-theme-text transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              LifeWiki
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
