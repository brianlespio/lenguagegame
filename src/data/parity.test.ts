import { describe, expect, it } from "vitest";
import { allEntries, basqueEntries, catalanEntries, frenchEntries, germanEntries } from "./index";
import {
  FROZEN_ENGLISH_BY_CATEGORY,
  FROZEN_ENGLISH_TOTAL,
  PARITY_CATEGORIES,
  PARITY_RATIO,
  PARITY_TARGETS,
  assertEnglishFreeze,
  buildParityTargets,
  countsByCategory,
  floorParity,
  measureParity,
} from "./parity";

describe("parity freeze (phase 32)", () => {
  it("keeps the English catalog at the frozen baseline", () => {
    expect(allEntries.length).toBe(FROZEN_ENGLISH_TOTAL);
    expect(FROZEN_ENGLISH_TOTAL).toBe(12_565);
    assertEnglishFreeze(allEntries);
    const live = countsByCategory(allEntries);
    for (const category of PARITY_CATEGORIES) {
      expect(live[category], category).toBe(FROZEN_ENGLISH_BY_CATEGORY[category]);
    }
  });

  it("exposes TARGET_TOTAL and TARGET_CAT from the freeze", () => {
    expect(PARITY_RATIO).toBe(0.89);
    expect(PARITY_TARGETS.total).toBe(11_182);
    expect(PARITY_TARGETS.total).toBe(floorParity(FROZEN_ENGLISH_TOTAL));

    const expectedCats: Record<string, number> = {
      nouns: 1_094,
      verbs: 985,
      adjectives: 930,
      adverbs: 764,
      connectors: 710,
      prepositions: 803,
      pronouns: 730,
      questions: 714,
      positiveAnswers: 714,
      negativeAnswers: 714,
      techQuestions: 625,
      techAnswers: 625,
      openQuestions: 580,
      openAnswers: 580,
      schoolNotices: 607,
    };
    for (const category of PARITY_CATEGORIES) {
      expect(PARITY_TARGETS.byCategory[category], category).toBe(expectedCats[category]);
      expect(PARITY_TARGETS.byCategory[category], category).toBe(
        floorParity(FROZEN_ENGLISH_BY_CATEGORY[category]),
      );
    }

    const rebuilt = buildParityTargets(countsByCategory(allEntries));
    expect(rebuilt).toEqual(PARITY_TARGETS);
  });

  it("measures French, Catalan, Basque, and German against the same floors", () => {
    const reports = {
      fr: measureParity(frenchEntries),
      ca: measureParity(catalanEntries),
      eu: measureParity(basqueEntries),
      de: measureParity(germanEntries),
    };

    for (const [lang, report] of Object.entries(reports)) {
      expect(report.needTotal, lang).toBe(11_182);
      expect(report.categoryGaps, lang).toHaveLength(PARITY_CATEGORIES.length);
      for (const gap of report.categoryGaps) {
        expect(gap.need, `${lang}:${gap.category}`).toBe(PARITY_TARGETS.byCategory[gap.category]);
        expect(gap.gap, `${lang}:${gap.category}`).toBe(Math.max(0, gap.need - gap.have));
      }
      expect(report.meetsParity, lang).toBe(report.meetsTotal && report.meetsCategories);
      expect(report.ratioOfEnglish, lang).toBeCloseTo(report.haveTotal / FROZEN_ENGLISH_TOTAL, 5);
    }

    // EN raised first (A1/A2/B1 floors). Other languages chase the new 89 % in a later change.
    expect(allEntries.length).toBe(12_565);
    expect(reports.fr.meetsParity).toBe(false);
    expect(reports.ca.meetsParity).toBe(false);
    expect(reports.eu.meetsParity).toBe(false);
  });
});
