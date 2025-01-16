import React from "react";
import PieceSelector from "./PieceSelector";
import { GamePiece } from "./types";

interface PieceToolbarProps {
  pieces: GamePiece[];
  selectedPiece: GamePiece | null;
  placedPieces: Set<string>;
  onPieceSelect: (piece: GamePiece) => void;
  onRotate: (direction: "cw" | "ccw") => void;
}

const PieceToolbar: React.FC<PieceToolbarProps> = ({
  pieces,
  selectedPiece,
  placedPieces,
  onPieceSelect,
  onRotate,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {pieces.map((piece) => (
        <PieceSelector
          key={piece.id}
          piece={piece}
          isSelected={selectedPiece?.id === piece.id}
          isPlaced={placedPieces.has(piece.id)}
          onPieceClick={onPieceSelect}
          onRotate={onRotate}
        />
      ))}
    </div>
  );
};

export default PieceToolbar;
