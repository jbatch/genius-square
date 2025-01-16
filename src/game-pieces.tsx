import { GamePiece, PieceShape } from "./types";

// Rotate a shape 90 degrees clockwise
const rotatePieceShape = (shape: PieceShape): PieceShape => {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated: PieceShape = Array(cols)
    .fill(0)
    .map(() => Array(rows).fill(0));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = shape[r][c];
    }
  }

  return rotated;
};

// Generate all unique rotations for a piece
const generateRotations = (shape: PieceShape): PieceShape[] => {
  const rotations: PieceShape[] = [shape];
  let currentRotation = shape;

  // Generate up to 3 more rotations
  for (let i = 0; i < 3; i++) {
    currentRotation = rotatePieceShape(currentRotation);
    // Check if this rotation is unique
    if (!rotations.some((rot) => shapesAreEqual(rot, currentRotation))) {
      rotations.push(currentRotation);
    }
  }

  return rotations;
};

// Helper to compare two shapes
const shapesAreEqual = (shape1: PieceShape, shape2: PieceShape): boolean => {
  if (
    shape1.length !== shape2.length ||
    shape1[0].length !== shape2[0].length
  ) {
    return false;
  }
  return shape1.every((row, i) =>
    row.every((cell, j) => cell === shape2[i][j])
  );
};

// Define the base pieces
const basePieces: Omit<GamePiece, "rotations">[] = [
  {
    id: "dot",
    color: "orange",
    shape: [[1]],
  },
  {
    id: "dash",
    color: "pink",
    shape: [[1, 1]],
  },
  {
    id: "small_I",
    color: "purple",
    shape: [
      [1, 0],
      [1, 0],
      [1, 0],
    ],
  },
  {
    id: "corner",
    color: "teal",
    shape: [
      [1, 1],
      [1, 0],
    ],
  },
  {
    id: "L",
    color: "blue",
    shape: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  },
  {
    id: "I",
    color: "red",
    shape: [[1], [1], [1], [1]],
  },
  {
    id: "T",
    color: "emerald",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
  },
  {
    id: "Z",
    color: "yellow",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
  {
    id: "O",
    color: "lime",
    shape: [
      [1, 1],
      [1, 1],
    ],
  },
];

// Generate the complete pieces with their rotations
export const gamePieces: GamePiece[] = basePieces.map((piece) => ({
  ...piece,
  rotations: generateRotations(piece.shape),
}));
