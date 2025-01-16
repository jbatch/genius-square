import { CellContent } from "./types";

export const checkWinCondition = (board: CellContent[][]): boolean => {
  // Check each cell in the board
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const cell = board[row][col];

      // If we find a cell that is neither blocked nor filled with a piece,
      // the puzzle is not complete
      if (!cell.isBlocked && !cell.pieceId) {
        return false;
      }
    }
  }

  // If we've checked all cells and haven't found any empty non-blocked cells,
  // the puzzle is complete
  return true;
};

// Helper to count remaining empty spaces (optional, for future use)
export const getRemainingSpaces = (board: CellContent[][]): number => {
  let emptySpaces = 0;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const cell = board[row][col];
      if (!cell.isBlocked && !cell.pieceId) {
        emptySpaces++;
      }
    }
  }

  return emptySpaces;
};
