import { CEFR_LOCK_TAG } from "../constants";
import type { CefrLevel, StudyCefrLevel, VocabularyEntry } from "../types/vocabulary";
import { isPhraseCategory } from "../utils/vocabulary";

function hasLockedCefr(entry: VocabularyEntry): boolean {
  return isPhraseCategory(entry.category) || Boolean(entry.tags?.includes(CEFR_LOCK_TAG));
}

const UNLOCKED_LEVELS = ["A1", "A2", "B1"] as const;
const UNLOCKED_SHARES = [0.4, 0.35, 0.25] as const;

function levelForIndex(index: number, count: number): StudyCefrLevel {
  if (count <= 1) return "A1";
  const ratio = index / count;
  let start = 0;
  for (let i = 0; i < UNLOCKED_LEVELS.length; i += 1) {
    const end = i === UNLOCKED_LEVELS.length - 1 ? 1 : start + UNLOCKED_SHARES[i];
    if (ratio < end || i === UNLOCKED_LEVELS.length - 1) return UNLOCKED_LEVELS[i];
    start = end;
  }
  return "B1";
}

export function tagCefrByFrequency(entries: readonly VocabularyEntry[]): VocabularyEntry[] {
  const groups = new Map<string, VocabularyEntry[]>();
  for (const entry of entries) {
    if (hasLockedCefr(entry)) continue;
    const list = groups.get(entry.category) ?? [];
    list.push(entry);
    groups.set(entry.category, list);
  }

  const difficultyById = new Map<string, CefrLevel>();
  for (const group of groups.values()) {
    group.forEach((entry, index) => {
      difficultyById.set(entry.id, levelForIndex(index, group.length));
    });
  }

  return entries.map((entry) => {
    if (hasLockedCefr(entry)) {
      return { ...entry, difficulty: entry.difficulty ?? "A1" };
    }
    return {
      ...entry,
      difficulty: difficultyById.get(entry.id) ?? "A1",
    };
  });
}
