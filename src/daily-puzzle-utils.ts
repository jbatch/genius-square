// Seeded random number generator
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Generate a random number between 0 and 1
  random(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  // Generate a random integer between min (inclusive) and max (exclusive)
  randInt(min: number, max: number): number {
    return Math.floor(min + this.random() * (max - min));
  }
}

// Get puzzle number (days since start date)
export const getPuzzleNumber = (): number => {
  const startDate = new Date("2025-01-15");
  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

// Get today's date in YYYYMMDD format
export const getDateSeed = (): number => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return parseInt(`${year}${month}${day}`);
};

// Generate coordinates using seeded randomness
export const generateDailyCoordinates = (
  count: number = 7
): { row: number; col: number }[] => {
  const rng = new SeededRandom(getDateSeed());
  const coords: { row: number; col: number }[] = [];

  while (coords.length < count) {
    const row = rng.randInt(0, 6);
    const col = rng.randInt(0, 6);

    // Check if this coordinate is already used
    if (!coords.some((coord) => coord.row === row && coord.col === col)) {
      coords.push({ row, col });
    }
  }

  return coords;
};

// Format time in mm:ss format
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

// Generate share text
export const generateShareText = (
  puzzleNumber: number,
  timeMs: number
): string => {
  const timeStr = formatTime(timeMs);
  return `Genius Square #${puzzleNumber}\nTime: ${timeStr}\nPlay today's puzzle at https://square.jbat.ch`;
};
