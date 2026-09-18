import { describe, expect, it } from "vitest";
import {
  C2_PHRASE_CLASSES,
  C2_WORD_CLASSES,
  CEFR_LOCK_TAG,
  LOCKED_CEFR_LEVELS,
  MIN_B2_PER_WORD_CLASS,
  MIN_C1_PER_WORD_CLASS,
  MIN_C2_PER_WORD_CLASS,
} from "../constants";
import { allEntries, frenchEntries } from "./index";
import { assertLevelBanksComplete } from "./c2/validate";
import { filterEntries, isPhraseCategory } from "../utils/vocabulary";
import { buildTestSessionQueue, inversePairKey, translationPairKey } from "../utils/quiz";

describe("C2 word-class banks", () => {
  it("rejects an incomplete C2 bank instead of accepting it silently", () => {
    expect(() => assertLevelBanksComplete(allEntries, frenchEntries, "C2")).not.toThrow();
    expect(() => assertLevelBanksComplete([], [], "C2")).toThrow(/C2 bank incomplete/);
  });

  it("keeps C2 word tests to locked items only, without easy frequency leftovers", () => {
    const nouns = filterEntries(allEntries, "nouns", "C2");
    expect(nouns.every((entry) => entry.tags?.includes(CEFR_LOCK_TAG))).toBe(true);
    const terms = new Set(nouns.map((entry) => ("term" in entry ? entry.term.toLowerCase() : "")));
    expect(terms.has("page")).toBe(false);
    expect(terms.has("radio")).toBe(false);
    expect(terms.has("house")).toBe(false);
    expect(terms.has("title")).toBe(false);
  });

  it("never frequency-tags unlocked words as B2, C1 or C2", () => {
    for (const catalog of [allEntries, frenchEntries]) {
      for (const entry of catalog) {
        if (isPhraseCategory(entry.category) || entry.tags?.includes(CEFR_LOCK_TAG)) continue;
        expect(LOCKED_CEFR_LEVELS.includes(entry.difficulty as (typeof LOCKED_CEFR_LEVELS)[number])).toBe(false);
      }
    }
  });

  it("keeps at least 200 locked C2 items in every word class, both languages", () => {
    for (const catalog of [allEntries, frenchEntries]) {
      for (const category of C2_WORD_CLASSES) {
        const count = filterEntries(catalog, category, "C2").length;
        expect(count, `${category} C2`).toBeGreaterThanOrEqual(MIN_C2_PER_WORD_CLASS);
      }
    }
  });

  it("keeps at least 200 C2 items in every phrase skill class, both languages", () => {
    for (const catalog of [allEntries, frenchEntries]) {
      for (const category of C2_PHRASE_CLASSES) {
        const count = filterEntries(catalog, category, "C2").length;
        expect(count, `${category} C2`).toBeGreaterThanOrEqual(MIN_C2_PER_WORD_CLASS);
      }
    }
  });

  it("lets a C2 adjective test exceed the old 14-card band", () => {
    expect(filterEntries(allEntries, "adjectives", "C2").length).toBeGreaterThan(14);
    expect(filterEntries(allEntries, "adjectives", "C2").length).toBeGreaterThanOrEqual(MIN_C2_PER_WORD_CLASS);
  });

  it("builds a 400-question C2 noun session both ways without adjacent inverses", () => {
    const pool = filterEntries(allEntries, "nouns", "C2");
    const queue = buildTestSessionQueue(pool);
    expect(queue.length).toBeGreaterThanOrEqual(400);
    expect(queue.filter((item) => item.direction === "forward").length).toBe(queue.length / 2);
    for (let i = 1; i < queue.length; i += 1) {
      expect(queue[i]?.promptId === queue[i - 1]?.promptId).toBe(false);
    }
  });

  it("avoids opening the next C2 session on a recent inverse pair", () => {
    const pool = filterEntries(allEntries, "nouns", "C2").slice(0, 8);
    const first = pool[0];
    if (!first) throw new Error("missing C2 noun");
    const recent = [translationPairKey(first, "forward"), inversePairKey(first, "forward")];
    const queue = buildTestSessionQueue(pool, { recentPairKeys: recent });
    const start = pool.find((entry) => entry.id === queue[0]?.promptId);
    expect(start && queue[0] ? recent.includes(translationPairKey(start, queue[0].direction)) : true).toBe(false);
  });
});

describe("C1 locked banks", () => {
  it("meets the C1 minimum in every word and phrase class", () => {
    expect(() => assertLevelBanksComplete(allEntries, frenchEntries, "C1")).not.toThrow();
    for (const catalog of [allEntries, frenchEntries]) {
      for (const category of C2_WORD_CLASSES) {
        expect(filterEntries(catalog, category, "C1").length, `${category} C1`).toBeGreaterThanOrEqual(
          MIN_C1_PER_WORD_CLASS,
        );
      }
    }
  });
});

describe("B2 locked banks", () => {
  it("meets the B2 minimum in every word and phrase class", () => {
    expect(() => assertLevelBanksComplete(allEntries, frenchEntries, "B2")).not.toThrow();
    for (const catalog of [allEntries, frenchEntries]) {
      for (const category of C2_WORD_CLASSES) {
        expect(filterEntries(catalog, category, "B2").length, `${category} B2`).toBeGreaterThanOrEqual(
          MIN_B2_PER_WORD_CLASS,
        );
      }
    }
  });
});
