import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GameBoard from "./GameBoard";
import PieceToolbar from "./PieceToolbar";
import DiceDisplay from "./DiceDisplay";
import { CellContent, GamePiece, PieceShape, GridCoordinate } from "./types";
import { findAnchorOffset, gamePieces } from "./game-pieces";
import { checkWinCondition, getRemainingSpaces } from "./win-checker";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { PartyPopper } from "lucide-react";
import {
  generateDailyCoordinates,
  getPuzzleNumber,
} from "./daily-puzzle-utils";
import GameOverDialog from "./GameOverDialog";
import { recordPuzzleCompletion } from "./puzzle-statistics-utils";

const BOARD_SIZE = 6;

const GeniusSquare = () => {
  const puzzleNumber = getPuzzleNumber();
  const [board, setBoard] = useState<CellContent[][]>([]);
  const [selectedPiece, setSelectedPiece] = useState<GamePiece | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [previewPosition, setPreviewPosition] = useState<GridCoordinate | null>(
    null
  );
  const [diceResults, setDiceResults] = useState<GridCoordinate[]>([]);
  const [placedPieces, setPlacedPieces] = useState<Set<string>>(new Set());
  const [hasWon, setHasWon] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);

  // Initialize board with dice rolls
  useEffect(() => {
    setStartTime(Date.now());
    const newDiceResults = generateDailyCoordinates();
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
    setHasWon(false);
    setStartTime(Date.now());
    setEndTime(null);
    setShowGameOver(false);
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

    const anchor = findAnchorOffset(shape);

    const adjustedStartRow = startRow - anchor.row;
    const adjustedStartCol = startCol - anchor.col;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] === 1) {
          const boardRow = adjustedStartRow + r;
          const boardCol = adjustedStartCol + c;

          if (
            boardRow < 0 ||
            boardRow >= BOARD_SIZE ||
            boardCol < 0 ||
            boardCol >= BOARD_SIZE
          ) {
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

    const anchor = findAnchorOffset(shape);

    // Adjust the start position based on the anchor offset
    const adjustedStartRow = startRow - anchor.row;
    const adjustedStartCol = startCol - anchor.col;

    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c] === 1) {
          const boardRow = adjustedStartRow + r;
          const boardCol = adjustedStartCol + c;
          newBoard[boardRow][boardCol] = {
            isBlocked: false,
            pieceId: piece.id,
            pieceColor: piece.color,
          };
        }
      }
    }

    setBoard(newBoard);
    setPlacedPieces(new Set([...placedPieces, piece.id]));

    // Check for win condition
    if (checkWinCondition(newBoard)) {
      const now = Date.now();
      setEndTime(now);
      setHasWon(true);
      setShowGameOver(true);
      const timeMs = now - (startTime || now);
      recordPuzzleCompletion(puzzleNumber, timeMs);
    }
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
    setHasWon(false);
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
    const newDiceResults = generateDailyCoordinates();
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
    setHasWon(false);
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Genius Square</h1>
          <div className="text-sm text-gray-500 mt-1">
            Daily Puzzle #{puzzleNumber}
          </div>
        </div>

        {hasWon && (
          <Alert className="bg-green-50 border-green-200">
            <PartyPopper className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-800">Congratulations!</AlertTitle>
            <AlertDescription className="text-green-700">
              You've completed the puzzle! Try another round or challenge
              yourself with a new game.
            </AlertDescription>
          </Alert>
        )}

        <DiceDisplay coordinates={diceResults} />

        <div className="space-y-2">
          <GameBoard
            board={board}
            selectedPiece={selectedPiece}
            activeShape={getActiveShape()}
            previewPosition={previewPosition}
            onCellHover={handleCellHover}
            onCellClick={handleCellClick}
          />

          {!hasWon && (
            <div className="text-sm text-gray-500 text-center">
              Remaining spaces: {getRemainingSpaces(board)}
            </div>
          )}
        </div>

        <PieceToolbar
          pieces={gamePieces.filter((piece) => !placedPieces.has(piece.id))}
          selectedPiece={selectedPiece}
          onPieceSelect={handlePieceSelect}
          onRotate={handleRotate}
          currentRotation={currentRotation}
        />

        <div className="flex gap-4">
          <Button onClick={handleReset}>Reset Puzzle</Button>
        </div>

        <GameOverDialog
          isOpen={showGameOver}
          onClose={() => setShowGameOver(false)}
          puzzleNumber={puzzleNumber}
          timeMs={endTime && startTime ? endTime - startTime : 0}
        />
      </div>
    </Card>
  );
};

export default GeniusSquare;
