import React from "react";
import { CellContent, GamePiece, PieceShape, colorVariants } from "./types";
import { findAnchorOffset } from "./piece-utils";

interface GameBoardProps {
  board: CellContent[][];
  selectedPiece: GamePiece | null;
  activeShape: PieceShape | null;
  previewPosition: { row: number; col: number } | null;
  onCellHover: (row: number, col: number) => void;
  onCellClick: (row: number, col: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  selectedPiece,
  activeShape,
  previewPosition,
  onCellHover,
  onCellClick,
}) => {
  const renderPreview = (rowIndex: number, colIndex: number): boolean => {
    if (!previewPosition || !activeShape || !selectedPiece) return false;

    const anchor = findAnchorOffset(activeShape);

    const relativeRow = rowIndex - (previewPosition.row - anchor.row);
    const relativeCol = colIndex - (previewPosition.col - anchor.col);

    return (
      relativeRow >= 0 &&
      relativeRow < activeShape.length &&
      relativeCol >= 0 &&
      relativeCol < activeShape[0].length &&
      activeShape[relativeRow][relativeCol] === 1
    );
  };

  return (
    <div
      className="inline-grid grid-cols-6 gap-px bg-gray-300 p-1"
      onMouseLeave={() => onCellHover(-1, -1)}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isPreview = renderPreview(rowIndex, colIndex);

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-12 h-12 border border-gray-300 ${
                isPreview
                  ? `${colorVariants[selectedPiece!.color]} opacity-50`
                  : cell.isBlocked
                  ? colorVariants.blocked
                  : cell.pieceColor
                  ? colorVariants[cell.pieceColor]
                  : colorVariants.empty
              }`}
              onMouseEnter={() => onCellHover(rowIndex, colIndex)}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          );
        })
      )}
    </div>
  );
};

export default GameBoard;
