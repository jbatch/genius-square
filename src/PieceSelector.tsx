import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCw, RotateCcw } from "lucide-react";
import { GamePiece, colorVariants } from "./types";

interface PieceSelectorProps {
  piece: GamePiece;
  isSelected: boolean;
  onPieceClick: (piece: GamePiece) => void;
  onRotate?: (direction: "cw" | "ccw") => void;
}

const PieceSelector: React.FC<PieceSelectorProps> = ({
  piece,
  isSelected,
  onPieceClick,
  onRotate,
}) => {
  const shape = piece.shape;
  const maxWidth = Math.max(...shape.map((row) => row.length));

  return (
    <div
      className={`relative p-2 transition-transform ${
        isSelected ? "scale-110" : ""
      } hover:cursor-pointer`}
      onClick={() => onPieceClick(piece)}
    >
      <div
        className="grid gap-px bg-gray-300 p-1"
        style={{
          gridTemplateColumns: `repeat(${maxWidth}, minmax(0, 1fr))`,
        }}
      >
        {shape.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-8 h-8 ${
                cell ? colorVariants[piece.color] : "bg-transparent"
              }`}
            />
          ))
        )}
      </div>
      {isSelected && onRotate && (
        <div className="absolute -top-2 -right-2 flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onRotate("ccw");
            }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onRotate("cw");
            }}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PieceSelector;
