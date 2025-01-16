import React from "react";
import PieceSelector from "./PieceSelector";
import { GamePiece } from "./types";

interface PieceToolbarProps {
  pieces: GamePiece[];
  selectedPiece: GamePiece | null;
  currentRotation: number;
  onPieceSelect: (piece: GamePiece) => void;
  onRotate: (direction: "cw" | "ccw") => void;
}

const PieceToolbar: React.FC<PieceToolbarProps> = ({
  pieces,
  selectedPiece,
  currentRotation,
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
          currentRotation={selectedPiece?.id === piece.id ? currentRotation : 0}
          onPieceClick={onPieceSelect}
          onRotate={selectedPiece?.id === piece.id ? onRotate : undefined}
        />
      ))}
    </div>
  );
};

export default PieceToolbar;
