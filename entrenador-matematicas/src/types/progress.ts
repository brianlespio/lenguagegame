export type ReviewOutcome = "miss" | "hit";

export interface CardProgress {
  cardId: string;
  correctAnswers: number;
  incorrectAnswers: number;
  lastReviewed?: string;
  nextReview?: string;
  difficulty?: number;
  lastOutcome?: ReviewOutcome;
}

export interface ProgressFile {
  lastIdByScope: Record<string, string>;
  learning: Record<string, CardProgress>;
}
