import type { LearningProgress, PersistedProgress, ReviewOutcome } from "../types/vocabulary";

export function reviewKey(userId: string, entryId: string): string {
  return `${userId}:${entryId}`;
}

export function applyOutcome(
  progress: PersistedProgress,
  userId: string,
  entryId: string,
  outcome: ReviewOutcome,
  now: string,
): PersistedProgress {
  const key = reviewKey(userId, entryId);
  const previous = progress.learningProgress[key];
  const next: LearningProgress = {
    vocabularyId: entryId,
    repetitions: previous?.repetitions ?? 0,
    correctAnswers: previous?.correctAnswers ?? 0,
    incorrectAnswers: previous?.incorrectAnswers ?? 0,
    lastReviewed: now,
    lastOutcome: outcome,
  };
  if (previous?.nextReview) next.nextReview = previous.nextReview;
  if (previous?.difficulty !== undefined) next.difficulty = previous.difficulty;
  if (outcome === "miss") next.incorrectAnswers += 1;
  if (outcome === "hit") next.correctAnswers += 1;
  const restarts = (previous?.restarts ?? 0) + (outcome === "restart" ? 1 : 0);
  if (restarts > 0) next.restarts = restarts;
  return {
    ...progress,
    learningProgress: { ...progress.learningProgress, [key]: next },
  };
}

export function missedCardIds(
  progress: PersistedProgress,
  userId: string,
  bankIds: ReadonlySet<string>,
): string[] {
  const prefix = `${userId}:`;
  const ids: string[] = [];
  for (const [key, item] of Object.entries(progress.learningProgress)) {
    if (!key.startsWith(prefix)) continue;
    if (item.lastOutcome !== "miss") continue;
    if (!bankIds.has(item.vocabularyId)) continue;
    ids.push(item.vocabularyId);
  }
  return ids;
}
