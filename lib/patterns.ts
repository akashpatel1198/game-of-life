import { CellState } from './types';

export interface Pattern {
  name: string;
  category: 'still' | 'oscillator' | 'spaceship' | 'gun' | 'other';
  description: string;
  cells: CellState[][];
}

// Helper to create pattern from string representation
// 'O' = alive, '.' = dead
function parsePattern(rows: string[]): CellState[][] {
  return rows.map(row => 
    row.split('').map(char => (char === 'O' ? 1 : 0) as CellState)
  );
}

export const patterns: Pattern[] = [
  // === STILL LIFES ===
  {
    name: 'Block',
    category: 'still',
    description: 'Simplest still life - 4 cells in a square',
    cells: parsePattern([
      'OO',
      'OO',
    ]),
  },
  {
    name: 'Beehive',
    category: 'still',
    description: 'Common 6-cell still life',
    cells: parsePattern([
      '.OO.',
      'O..O',
      '.OO.',
    ]),
  },
  {
    name: 'Loaf',
    category: 'still',
    description: '7-cell still life shaped like a loaf of bread',
    cells: parsePattern([
      '.OO.',
      'O..O',
      '.O.O',
      '..O.',
    ]),
  },
  {
    name: 'Boat',
    category: 'still',
    description: '5-cell still life',
    cells: parsePattern([
      'OO.',
      'O.O',
      '.O.',
    ]),
  },
  {
    name: 'Tub',
    category: 'still',
    description: '4-cell still life',
    cells: parsePattern([
      '.O.',
      'O.O',
      '.O.',
    ]),
  },

  // === OSCILLATORS ===
  {
    name: 'Blinker',
    category: 'oscillator',
    description: 'Simplest oscillator - period 2',
    cells: parsePattern([
      'OOO',
    ]),
  },
  {
    name: 'Toad',
    category: 'oscillator',
    description: '6-cell oscillator - period 2',
    cells: parsePattern([
      '.OOO',
      'OOO.',
    ]),
  },
  {
    name: 'Beacon',
    category: 'oscillator',
    description: '6-cell oscillator - period 2',
    cells: parsePattern([
      'OO..',
      'OO..',
      '..OO',
      '..OO',
    ]),
  },
  {
    name: 'Pulsar',
    category: 'oscillator',
    description: 'Large oscillator - period 3',
    cells: parsePattern([
      '..OOO...OOO..',
      '.............',
      'O....O.O....O',
      'O....O.O....O',
      'O....O.O....O',
      '..OOO...OOO..',
      '.............',
      '..OOO...OOO..',
      'O....O.O....O',
      'O....O.O....O',
      'O....O.O....O',
      '.............',
      '..OOO...OOO..',
    ]),
  },
  {
    name: 'Pentadecathlon',
    category: 'oscillator',
    description: 'Period 15 oscillator',
    cells: parsePattern([
      '..O....O..',
      'OO.OOOO.OO',
      '..O....O..',
    ]),
  },

  // === SPACESHIPS ===
  {
    name: 'Glider',
    category: 'spaceship',
    description: 'Smallest spaceship - moves diagonally',
    cells: parsePattern([
      '.O.',
      '..O',
      'OOO',
    ]),
  },
  {
    name: 'LWSS',
    category: 'spaceship',
    description: 'Lightweight Spaceship - moves horizontally',
    cells: parsePattern([
      '.O..O',
      'O....',
      'O...O',
      'OOOO.',
    ]),
  },
  {
    name: 'MWSS',
    category: 'spaceship',
    description: 'Middleweight Spaceship',
    cells: parsePattern([
      '...O..',
      '.O...O',
      'O.....',
      'O....O',
      'OOOOO.',
    ]),
  },
  {
    name: 'HWSS',
    category: 'spaceship',
    description: 'Heavyweight Spaceship',
    cells: parsePattern([
      '...OO..',
      '.O....O',
      'O......',
      'O.....O',
      'OOOOOO.',
    ]),
  },

  // === GUNS ===
  {
    name: 'Gosper Glider Gun',
    category: 'gun',
    description: 'First discovered gun - produces gliders',
    cells: parsePattern([
      '........................O...........',
      '......................O.O...........',
      '............OO......OO............OO',
      '...........O...O....OO............OO',
      'OO........O.....O...OO..............',
      'OO........O...O.OO....O.O...........',
      '..........O.....O.......O...........',
      '...........O...O....................',
      '............OO......................',
    ]),
  },

  // === OTHER ===
  {
    name: 'R-pentomino',
    category: 'other',
    description: 'Methuselah - chaotic growth from 5 cells',
    cells: parsePattern([
      '.OO',
      'OO.',
      '.O.',
    ]),
  },
  {
    name: 'Diehard',
    category: 'other',
    description: 'Dies after 130 generations',
    cells: parsePattern([
      '......O.',
      'OO......',
      '.O...OOO',
    ]),
  },
  {
    name: 'Acorn',
    category: 'other',
    description: 'Methuselah - generates 633 cells over 5206 generations',
    cells: parsePattern([
      '.O.....',
      '...O...',
      'OO..OOO',
    ]),
  },
];

// Get patterns by category
export function getPatternsByCategory(category: Pattern['category']): Pattern[] {
  return patterns.filter(p => p.category === category);
}

// Get all categories
export function getCategories(): Pattern['category'][] {
  return ['still', 'oscillator', 'spaceship', 'gun', 'other'];
}

// Category display names
export const categoryNames: Record<Pattern['category'], string> = {
  still: 'Still Lifes',
  oscillator: 'Oscillators',
  spaceship: 'Spaceships',
  gun: 'Guns',
  other: 'Other',
};

// Rotate pattern 90 degrees clockwise
export function rotatePattern(cells: CellState[][]): CellState[][] {
  const rows = cells.length;
  const cols = cells[0].length;
  const rotated: CellState[][] = [];
  
  for (let col = 0; col < cols; col++) {
    const newRow: CellState[] = [];
    for (let row = rows - 1; row >= 0; row--) {
      newRow.push(cells[row][col]);
    }
    rotated.push(newRow);
  }
  
  return rotated;
}
