export type PieceColor =
  | "red"
  | "blue"
  | "emerald"
  | "lime"
  | "yellow"
  | "purple"
  | "orange"
  | "teal"
  | "pink";

export type CellContent = {
  isBlocked: boolean;
  pieceId?: string;
  pieceColor?: PieceColor;
};

export type PieceShape = number[][];

export interface GamePiece {
  id: string;
  color: PieceColor;
  shape: PieceShape;
  rotations: PieceShape[];
}

export const colorVariants: Record<
  PieceColor | "blocked" | "empty" | "preview",
  string
> = {
  red: "bg-red-500 hover:bg-red-400",
  blue: "bg-blue-500 hover:bg-blue-400",
  emerald: "bg-emerald-500 hover:bg-emerald-400",
  lime: "bg-lime-500 hover:bg-lime-400",
  yellow: "bg-yellow-500 hover:bg-yellow-400",
  purple: "bg-purple-500 hover:bg-purple-400",
  orange: "bg-orange-500 hover:bg-orange-400",
  teal: "bg-teal-500 hover:bg-teal-400",
  pink: "bg-pink-500 hover:bg-pink-400",
  blocked: "bg-gray-800",
  empty: "bg-white hover:bg-gray-100",
  preview: "bg-gray-200",
};

export interface GridCoordinate {
  row: number;
  col: number;
}
