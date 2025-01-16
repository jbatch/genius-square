import { GridCoordinate } from "./types";

// Convert number coordinates to letter-number format (e.g., [0,0] -> "A1")
export const coordToString = (coord: GridCoordinate): string => {
  const row = String.fromCharCode(65 + coord.row); // A, B, C, etc.
  const col = coord.col + 1; // 1-based for display
  return `${row}${col}`;
};

// Convert string coordinates to number format (e.g., "A1" -> [0,0])
export const stringToCoord = (str: string): GridCoordinate => {
  const row = str.charCodeAt(0) - 65; // A -> 0, B -> 1, etc.
  const col = parseInt(str.slice(1)) - 1; // 1-based to 0-based
  return { row, col };
};

// Generate a random coordinate
const generateRandomCoord = (): GridCoordinate => ({
  row: Math.floor(Math.random() * 6),
  col: Math.floor(Math.random() * 6),
});

// Generate unique coordinates for dice
export const rollDice = (count: number = 7): GridCoordinate[] => {
  const coords: GridCoordinate[] = [];
  while (coords.length < count) {
    const newCoord = generateRandomCoord();
    // Check if this coordinate is already used
    if (
      !coords.some(
        (coord) => coord.row === newCoord.row && coord.col === newCoord.col
      )
    ) {
      coords.push(newCoord);
    }
  }
  return coords;
};
