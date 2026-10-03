import type { CardProgress, ProgressFile, ReviewOutcome } from "../types/progress";

export const EMPTY_PROGRESS: ProgressFile = { lastIdByScope: {}, learning: {} };

function isoTimestamp(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(value)) return undefined;
  if (Number.isNaN(Date.parse(value))) return undefined;
  return value;
}

function finiteDifficulty(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return value;
}

export function normalizeProgress(value: unknown): ProgressFile {
  if (!value || typeof value !== "object" || Array.isArray(value)) return { lastIdByScope: {}, learning: {} };
  const record = value as { lastIdByScope?: unknown; learning?: unknown };
  const lastIdByScope: Record<string, string> = {};
  if (record.lastIdByScope && typeof record.lastIdByScope === "object") {
    for (const [key, id] of Object.entries(record.lastIdByScope as Record<string, unknown>)) {
      if (typeof id === "string" && id.length > 0) lastIdByScope[key] = id;
    }
  }
  const learning: Record<string, CardProgress> = {};
  if (record.learning && typeof record.learning === "object") {
    for (const [key, item] of Object.entries(record.learning as Record<string, unknown>)) {
      if (!item || typeof item !== "object") continue;
      const source = item as {
        cardId?: unknown;
        correctAnswers?: unknown;
        incorrectAnswers?: unknown;
        lastReviewed?: unknown;
        nextReview?: unknown;
        difficulty?: unknown;
        lastOutcome?: unknown;
      };
      const cardId = typeof source.cardId === "string" && source.cardId.length > 0 ? source.cardId : key;
      const entry: CardProgress = {
        cardId,
        correctAnswers: Number(source.correctAnswers) || 0,
        incorrectAnswers: Number(source.incorrectAnswers) || 0,
      };
      const lastReviewed = isoTimestamp(source.lastReviewed);
      const nextReview = isoTimestamp(source.nextReview);
      const difficulty = finiteDifficulty(source.difficulty);
      if (lastReviewed) entry.lastReviewed = lastReviewed;
      if (nextReview) entry.nextReview = nextReview;
      if (difficulty !== undefined) entry.difficulty = difficulty;
      if (source.lastOutcome === "miss" || source.lastOutcome === "hit") entry.lastOutcome = source.lastOutcome;
      learning[cardId] = entry;
    }
  }
  return { lastIdByScope, learning };
}

export function applyOutcome(file: ProgressFile, cardId: string, outcome: ReviewOutcome, now: string): ProgressFile {
  const previous = file.learning[cardId];
  const next: CardProgress = {
    cardId,
    correctAnswers: previous?.correctAnswers ?? 0,
    incorrectAnswers: previous?.incorrectAnswers ?? 0,
    lastReviewed: now,
    lastOutcome: outcome,
  };
  if (previous?.nextReview) next.nextReview = previous.nextReview;
  if (previous?.difficulty !== undefined) next.difficulty = previous.difficulty;
  if (outcome === "miss") next.incorrectAnswers += 1;
  if (outcome === "hit") next.correctAnswers += 1;
  return { ...file, learning: { ...file.learning, [cardId]: next } };
}

export function missedCardIds(learning: Record<string, CardProgress>, bankIds: ReadonlySet<string>): string[] {
  const ids: string[] = [];
  for (const item of Object.values(learning)) {
    if (item.lastOutcome !== "miss") continue;
    if (!bankIds.has(item.cardId)) continue;
    ids.push(item.cardId);
  }
  return ids;
}
