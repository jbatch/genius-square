// Types for puzzle statistics
interface PuzzleCompletion {
  puzzleNumber: number;
  timeMs: number;
  completedAt: string; // ISO date string
}

interface DailyStats {
  bestTime: number;
  completions: PuzzleCompletion[];
}

const STORAGE_KEY = "genius-square-stats";

// Retrieve all stored puzzle statistics
export const getPuzzleStats = (): Record<number, DailyStats> => {
  const statsJson = localStorage.getItem(STORAGE_KEY);
  return statsJson ? JSON.parse(statsJson) : {};
};

// Record a new puzzle completion
export const recordPuzzleCompletion = (
  puzzleNumber: number,
  timeMs: number
): void => {
  const stats = getPuzzleStats();

  // Create completion record
  const completion: PuzzleCompletion = {
    puzzleNumber,
    timeMs,
    completedAt: new Date().toISOString(),
  };

  // Get or initialize stats for this puzzle
  const puzzleStats = stats[puzzleNumber] || {
    bestTime: Number.MAX_VALUE,
    completions: [],
  };

  // Update best time if this is faster
  if (timeMs < puzzleStats.bestTime) {
    puzzleStats.bestTime = timeMs;
  }

  // Add to completions
  puzzleStats.completions.push(completion);

  // Update storage
  stats[puzzleNumber] = puzzleStats;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
};

// Get stats for a specific puzzle
export const getPuzzleDayStats = (puzzleNumber: number): DailyStats | null => {
  const stats = getPuzzleStats();
  return stats[puzzleNumber] || null;
};

// Get user's best time for a puzzle
export const getBestTime = (puzzleNumber: number): number | null => {
  const stats = getPuzzleStats();
  return stats[puzzleNumber]?.bestTime || null;
};

// Get total number of unique puzzles completed
export const getUniquePuzzlesCompleted = (): number => {
  return Object.keys(getPuzzleStats()).length;
};

// Get completion count for a specific puzzle
export const getPuzzleAttempts = (puzzleNumber: number): number => {
  const stats = getPuzzleStats();
  return stats[puzzleNumber]?.completions.length || 0;
};

// Clear all stored stats (useful for testing)
export const clearAllStats = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
