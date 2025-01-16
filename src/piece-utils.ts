import { PieceShape } from "./types";

export const findAnchorOffset = (
  shape: PieceShape
): { row: number; col: number } => {
  // Find the first filled cell (1) in the shape matrix
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        return { row, col };
      }
    }
  }
  return { row: 0, col: 0 }; // Fallback, shouldn't happen with valid pieces
};
