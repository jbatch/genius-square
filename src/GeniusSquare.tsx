import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GameBoard from "./GameBoard";
import PieceToolbar from "./PieceToolbar";
import DiceDisplay from "./DiceDisplay";
import { CellContent, GamePiece, PieceShape, GridCoordinate } from "./types";
import { gamePieces } from "./game-pieces";
import { rollDice } from "./dice-utils";

const BOARD_SIZE = 6;

const GeniusSquare = () => {
  const [board, setBoard] = useState<CellContent[][]>([]);
  const [selectedPiece, setSelectedPiece] = useState<GamePiece | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [previewPosition, setPreviewPosition] = useState<GridCoordinate | null>(
    null
  );
  const [diceResults, setDiceResults] = useState<GridCoordinate[]>([]);
  const [placedPieces, setPlacedPieces] = useState<Set<string>>(new Set());

  // Initialize board with dice rolls
  useEffect(() => {
    const newDiceResults = rollDice();
    setDiceResults(newDiceResults);

    // Create a fresh board and block the rolled coordinates
    const newBoard = Array(BOARD_SIZE)
      .fill(null)
      .map(() =>
        Array(BOARD_SIZE)
          .fill(null)
          .map(() => ({ isBlocked: false }))
      );
    newDiceResults.forEach((coord) => {
      newBoard[coord.row][coord.col].isBlocked = true;
    });
    setBoard(newBoard);
  }, []);

  const getActiveShape = (): PieceShape | null => {
    if (!selectedPiece) return null;
    return selectedPiece.rotations[currentRotation] || selectedPiece.shape;
  };

  const canPlacePiece = (
    shape: PieceShape,
    startRow: number,
    startCol: number
  ): boolean => {
    if (!shape) return false;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] === 1) {
          const boardRow = startRow + r;
          const boardCol = startCol + c;

          if (boardRow >= BOARD_SIZE || boardCol >= BOARD_SIZE) {
            return false;
          }

          if (
            board[boardRow][boardCol].isBlocked ||
            board[boardRow][boardCol].pieceId
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placePiece = (
    piece: GamePiece,
    shape: PieceShape,
    startRow: number,
    startCol: number
  ) => {
    const newBoard = board.map((row) => [...row]);

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] === 1) {
          newBoard[startRow + r][startCol + c] = {
            isBlocked: false,
            pieceId: piece.id,
            pieceColor: piece.color,
          };
        }
      }
    }

    setBoard(newBoard);
    setPlacedPieces(new Set([...placedPieces, piece.id]));
  };

  const removePiece = (pieceId: string) => {
    const newBoard = board.map((row) =>
      row.map((cell) =>
        cell.pieceId === pieceId ? { isBlocked: false } : cell
      )
    );
    setBoard(newBoard);
    const newPlacedPieces = new Set(placedPieces);
    newPlacedPieces.delete(pieceId);
    setPlacedPieces(newPlacedPieces);
  };

  const handlePieceSelect = (piece: GamePiece) => {
    if (selectedPiece?.id === piece.id) {
      setSelectedPiece(null);
      setCurrentRotation(0);
      setPreviewPosition(null);
    } else if (!placedPieces.has(piece.id)) {
      setSelectedPiece(piece);
      setCurrentRotation(0);
      setPreviewPosition(null);
    }
  };

  const handleRotate = (direction: "cw" | "ccw") => {
    if (selectedPiece) {
      setCurrentRotation((prev) => {
        const rotationCount = selectedPiece.rotations.length;
        return direction === "cw"
          ? (prev + 1) % rotationCount
          : (prev - 1 + rotationCount) % rotationCount;
      });
    }
  };

  const handleCellHover = (row: number, col: number) => {
    if (row === -1) {
      setPreviewPosition(null);
    } else if (selectedPiece) {
      const shape = getActiveShape();
      if (shape && canPlacePiece(shape, row, col)) {
        setPreviewPosition({ row, col });
      } else {
        setPreviewPosition(null);
      }
    }
  };

  const handleCellClick = (row: number, col: number) => {
    // If we have a piece selected and a valid preview position
    if (selectedPiece && previewPosition) {
      const shape = getActiveShape();
      if (shape && canPlacePiece(shape, row, col)) {
        placePiece(selectedPiece, shape, row, col);
        setSelectedPiece(null);
        setPreviewPosition(null);
        setCurrentRotation(0);
      }
    } else {
      // If clicking on an existing piece, remove it
      const cell = board[row][col];
      if (cell.pieceId) {
        removePiece(cell.pieceId);
      }
    }
  };

  const handleReset = () => {
    const newDiceResults = rollDice();
    setDiceResults(newDiceResults);

    const newBoard = Array(BOARD_SIZE)
      .fill(null)
      .map(() =>
        Array(BOARD_SIZE)
          .fill(null)
          .map(() => ({ isBlocked: false }))
      );
    newDiceResults.forEach((coord) => {
      newBoard[coord.row][coord.col].isBlocked = true;
    });

    setBoard(newBoard);
    setSelectedPiece(null);
    setCurrentRotation(0);
    setPreviewPosition(null);
    setPlacedPieces(new Set());
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">Genius Square</h1>

        <DiceDisplay coordinates={diceResults} />

        <GameBoard
          board={board}
          selectedPiece={selectedPiece}
          activeShape={getActiveShape()}
          previewPosition={previewPosition}
          onCellHover={handleCellHover}
          onCellClick={handleCellClick}
        />

        <PieceToolbar
          pieces={gamePieces}
          selectedPiece={selectedPiece}
          placedPieces={placedPieces}
          onPieceSelect={handlePieceSelect}
          onRotate={handleRotate}
        />

        <div className="flex gap-4">
          <Button onClick={handleReset}>New Game</Button>
        </div>
      </div>
    </Card>
  );
};

export default GeniusSquare;
