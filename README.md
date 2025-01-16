# Genius Square Game

A web-based implementation of The Genius Square puzzle game where players fill a 6x6 grid with geometric pieces after blocking certain squares based on daily puzzle coordinates. Each day presents a unique puzzle challenge that players can solve and share their completion times.

## Core Game Mechanics

### Board

- 6x6 grid layout
- Cells can be:
  - Empty
  - Blocked (from daily puzzle coordinates)
  - Filled with a game piece

### Game Pieces

- 9 unique geometric shapes with distinct colors:
  - Dot (orange)
  - Dash (pink)
  - Small I (purple)
  - Corner (teal)
  - L (blue)
  - I (red)
  - T (emerald)
  - Z (yellow)
  - O (lime)
- Each piece can be:
  - Selected from the toolbar
  - Rotated clockwise/counterclockwise
  - Placed on the board
  - Removed by clicking
- Each piece can only be placed once

### Daily Puzzles

- New puzzle available each day
- Puzzle number tracks days since January 15, 2025
- Seven coordinates randomly generated using daily seed
- Share completion times with friends
- Stats tracking for personal bests

## Technical Implementation

### Tech Stack

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- localStorage for stats persistence

## Current Features

- [x] Daily puzzle generation
- [x] Piece selection and rotation
- [x] Piece placement preview
- [x] Valid placement checking
- [x] One-time piece placement
- [x] Piece removal
- [x] Win condition checking
- [x] Score tracking
- [x] Puzzle completion sharing
- [x] Personal best times
- [x] Completion statistics

## Planned Features

- [ ] Multiple difficulty levels
- [ ] Solution hints
- [ ] Undo/redo functionality
- [ ] Piece placement animations
- [ ] Invalid placement feedback
- [ ] Touch/mobile optimization
- [ ] Accessibility improvements
- [ ] Tutorial mode
- [ ] Global leaderboards
- [ ] Achievement system

## Setup and Development

1. Clone the repository
2. Install dependencies: `yarn`
3. Start dev server: `yarn dev`
4. Build for production: `yarn build`

## Local Storage

The game uses localStorage to track:

- Puzzle completion times
- Personal best times
- Number of attempts
- Total unique puzzles completed
