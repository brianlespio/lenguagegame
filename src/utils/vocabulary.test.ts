import { describe, expect, it } from "vitest";
import type { VocabularyEntry } from "../types/vocabulary";
import {
  clampIndex,
  filterEntries,
  fromStudyScope,
  getProgress,
  isVerbItem,
  toStudyScope,
} from "./vocabulary";

const entries: VocabularyEntry[] = [
  { id: "n1", category: "nouns", term: "house", translation: "casa" },
  {
    id: "v1",
    category: "verbs",
    infinitive: "go",
    past: "went",
    pastParticiple: "gone",
    infinitiveTranslation: "ir",
    pastTranslation: "fue",
    pastParticipleTranslation: "ido",
  },
  { id: "a1", category: "adjectives", term: "good", translation: "bueno" },
];

describe("filterEntries", () => {
  it("keeps only matching categories", () => {
    expect(filterEntries(entries, "nouns").map((item) => item.id)).toEqual(["n1"]);
    expect(filterEntries(entries, "verbs").every(isVerbItem)).toBe(true);
  });

  it("keeps only matching CEFR levels", () => {
    const mixed: VocabularyEntry[] = [
      { id: "a1", category: "nouns", term: "house", translation: "casa", difficulty: "A1" },
      { id: "b1", category: "nouns", term: "policy", translation: "política", difficulty: "B1" },
    ];
    expect(filterEntries(mixed, "all", "A1").map((item) => item.id)).toEqual(["a1"]);
    expect(filterEntries(mixed, "all", "all")).toHaveLength(2);
  });
});

describe("clampIndex", () => {
  it("wraps and guards empty or invalid indexes", () => {
    expect(clampIndex(5, 3)).toBe(2);
    expect(clampIndex(-1, 3)).toBe(2);
    expect(clampIndex(0, 0)).toBe(0);
    expect(clampIndex(Number.NaN, 4)).toBe(0);
  });
});

describe("getProgress", () => {
  it("uses a 1-based current count", () => {
    expect(getProgress(0, 50)).toEqual({ current: 1, total: 50 });
    expect(getProgress(11, 50)).toEqual({ current: 12, total: 50 });
    expect(getProgress(0, 0)).toEqual({ current: 0, total: 0 });
  });
});

describe("study scope", () => {
  it("maps todo aleatorio to all plus random", () => {
    expect(fromStudyScope("all-random")).toEqual({ category: "all", randomMode: true });
    expect(toStudyScope("all", true)).toBe("all-random");
    expect(fromStudyScope("verbs")).toEqual({ category: "verbs", randomMode: false });
  });
});
