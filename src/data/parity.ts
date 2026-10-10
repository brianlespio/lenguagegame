import type { VocabularyCategory, VocabularyEntry } from "../types/vocabulary";

/** Ratio of the 89 % leveling wave. See `spec/parity-spec.md`. */
export const PARITY_RATIO = 0.89;

/** English card total frozen after low-CEFR A1/A2/B1 fill wave. */
export const FROZEN_ENGLISH_TOTAL = 12_565;

/**
 * English per-category counts frozen with the total.
 * A change here or in `allEntries` must update `spec/parity-spec.md` in the same change.
 */
export const FROZEN_ENGLISH_BY_CATEGORY = {
  nouns: 1_230,
  verbs: 1_107,
  adjectives: 1_045,
  adverbs: 859,
  connectors: 798,
  prepositions: 903,
  pronouns: 821,
  questions: 803,
  positiveAnswers: 803,
  negativeAnswers: 803,
  techQuestions: 703,
  techAnswers: 703,
  openQuestions: 652,
  openAnswers: 652,
  schoolNotices: 683,
} as const satisfies Record<VocabularyCategory, number>;

export const PARITY_CATEGORIES = Object.keys(
  FROZEN_ENGLISH_BY_CATEGORY,
) as VocabularyCategory[];

export type CategoryCounts = Record<VocabularyCategory, number>;

export type ParityTargets = {
  total: number;
  byCategory: CategoryCounts;
};

export type CategoryGap = {
  category: VocabularyCategory;
  have: number;
  need: number;
  gap: number;
};

export type ParityReport = {
  haveTotal: number;
  needTotal: number;
  meetsTotal: boolean;
  categoryGaps: CategoryGap[];
  meetsCategories: boolean;
  meetsParity: boolean;
  ratioOfEnglish: number;
};

export function floorParity(count: number, ratio: number = PARITY_RATIO): number {
  return Math.floor(count * ratio);
}

export function buildParityTargets(
  byCategory: Readonly<CategoryCounts> = FROZEN_ENGLISH_BY_CATEGORY,
  ratio: number = PARITY_RATIO,
): ParityTargets {
  const targets = {} as CategoryCounts;
  let totalFromCats = 0;
  for (const category of PARITY_CATEGORIES) {
    const need = floorParity(byCategory[category], ratio);
    targets[category] = need;
    totalFromCats += byCategory[category];
  }
  return {
    total: floorParity(totalFromCats, ratio),
    byCategory: targets,
  };
}

export const PARITY_TARGETS: ParityTargets = buildParityTargets();

export function countByCategory(
  entries: readonly { category: VocabularyCategory }[],
  category: VocabularyCategory,
): number {
  return entries.filter((entry) => entry.category === category).length;
}

export function countsByCategory(
  entries: readonly { category: VocabularyCategory }[],
): CategoryCounts {
  const counts = {} as CategoryCounts;
  for (const category of PARITY_CATEGORIES) {
    counts[category] = 0;
  }
  for (const entry of entries) {
    counts[entry.category] = (counts[entry.category] ?? 0) + 1;
  }
  return counts;
}

export function measureParity(
  catalog: readonly VocabularyEntry[],
  targets: ParityTargets = PARITY_TARGETS,
  englishTotal: number = FROZEN_ENGLISH_TOTAL,
): ParityReport {
  const have = countsByCategory(catalog);
  const categoryGaps: CategoryGap[] = PARITY_CATEGORIES.map((category) => {
    const need = targets.byCategory[category];
    const haveCount = have[category] ?? 0;
    return {
      category,
      have: haveCount,
      need,
      gap: Math.max(0, need - haveCount),
    };
  });
  const meetsTotal = catalog.length >= targets.total;
  const meetsCategories = categoryGaps.every((row) => row.gap === 0);
  return {
    haveTotal: catalog.length,
    needTotal: targets.total,
    meetsTotal,
    categoryGaps,
    meetsCategories,
    meetsParity: meetsTotal && meetsCategories,
    ratioOfEnglish: englishTotal > 0 ? catalog.length / englishTotal : 0,
  };
}

/** Assert live English matches the freeze; throws a clear error if the wave baseline drifted. */
export function assertEnglishFreeze(entries: readonly VocabularyEntry[]): void {
  if (entries.length !== FROZEN_ENGLISH_TOTAL) {
    throw new Error(
      `English catalog drifted: expected ${FROZEN_ENGLISH_TOTAL} cards (parity freeze), got ${entries.length}. Update spec/parity-spec.md only when opening the next wave.`,
    );
  }
  const live = countsByCategory(entries);
  for (const category of PARITY_CATEGORIES) {
    const expected = FROZEN_ENGLISH_BY_CATEGORY[category];
    const actual = live[category];
    if (actual !== expected) {
      throw new Error(
        `English category "${category}" drifted: expected ${expected}, got ${actual}. Update spec/parity-spec.md only when opening the next wave.`,
      );
    }
  }
}
