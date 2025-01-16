# Genius Square Game

A web-based implementation of The Genius Square puzzle game where players fill a 6x6 grid with geometric pieces after blocking certain squares based on dice rolls.

## Core Game Mechanics

### Board

- 6x6 grid layout
- Cells can be:
  - Empty
  - Blocked (from dice rolls)
  - Filled with a game piece

### Game Pieces

- 9 different geometric shapes
- Each piece has a unique color
- Pieces can be:
  - Selected
  - Rotated (clockwise/counterclockwise)
  - Placed on the board
  - Removed by clicking
- Each piece can only be placed once

### Dice System

- 7 dice with grid coordinates (e.g., A1, B3)
- Rolled at game start
- Coordinates displayed above board
- Corresponding grid cells are blocked

## Technical Implementation

### Tech Stack

- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui components

### Utilities

- `game-pieces.ts` - Piece definitions and rotation logic
- `dice-utils.ts` - Dice rolling and coordinate conversion
- `types.ts` - Shared type definitions

## Current Features

- [x] Basic game board
- [x] Piece selection and rotation
- [x] Piece placement preview
- [x] Valid placement checking
- [x] Dice roll implementation
- [x] One-time piece placement
- [x] Piece removal
- [x] New game reset

## Planned Features

- [ ] Deterministic dice rolling based on daily seed
- [ ] Win condition checking
- [ ] Piece placement animations
- [ ] Invalid placement feedback
- [ ] Score tracking
- [ ] Multiple difficulty levels
- [ ] Solution hints
- [ ] Undo/redo functionality
- [ ] Save game state

## Setup and Development

1. Clone the repository
2. Install dependencies: `yarn`
3. Start dev server: `yarn dev`
4. Build for production: `yarn build`
