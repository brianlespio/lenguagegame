import { beforeEach, describe, expect, it } from "vitest";
import { PROGRESS_STORAGE_KEY, SETTINGS_STORAGE_KEY } from "../constants";
import { loadProgress, loadSettings, migrate, saveProgress, saveSettings } from "./storage";

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("round-trips settings and progress", () => {
    saveSettings({
      selectedCategory: "verbs",
      cefrLevel: "all",
      interval: 10000,
      randomMode: true,
      languagePair: "en-es",
      ttsMuted: false,
      studyMode: "study",
    });
    saveProgress({
      lastEntryIdByCategory: { verbs: "verb-have" },
      learningProgress: {
        "verb-have": {
          vocabularyId: "verb-have",
          repetitions: 2,
          correctAnswers: 1,
          incorrectAnswers: 0,
        },
      },
    });

    expect(loadSettings()).toEqual({
      selectedCategory: "verbs",
      cefrLevel: "all",
      interval: 10000,
      randomMode: true,
      languagePair: "en-es",
      ttsMuted: false,
      studyMode: "study",
    });
    expect(loadProgress().lastEntryIdByCategory.verbs).toBe("verb-have");
    expect(loadProgress().learningProgress["verb-have"]?.repetitions).toBe(2);
  });

  it("persists the French language pair and slotted progress", () => {
    saveSettings({
      selectedCategory: "verbs",
      cefrLevel: "A1",
      interval: 1000,
      randomMode: false,
      languagePair: "fr-es",
      ttsMuted: true,
      studyMode: "test",
    });
    saveProgress({
      lastEntryIdByCategory: { "fr-es:verbs": "fr-verb-aller" },
      learningProgress: {},
    });

    expect(loadSettings().languagePair).toBe("fr-es");
    expect(loadSettings().cefrLevel).toBe("A1");
    expect(loadSettings().interval).toBe(1000);
    expect(loadSettings().ttsMuted).toBe(true);
    expect(loadSettings().studyMode).toBe("test");
    expect(loadProgress().lastEntryIdByCategory["fr-es:verbs"]).toBe("fr-verb-aller");
  });

  it("falls back when JSON is corrupt", () => {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, "{not json");
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, "null");
    expect(loadSettings()).toEqual({
      selectedCategory: "all",
      cefrLevel: "all",
      interval: 5000,
      randomMode: false,
      languagePair: "en-es",
      ttsMuted: false,
      studyMode: "study",
    });
    expect(loadProgress()).toEqual({
      lastEntryIdByCategory: {},
      learningProgress: {},
    });
  });

  it("ignores incompatible versions and invalid fields", () => {
    window.localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({ version: 99, data: { selectedCategory: "verbs", interval: 5000, randomMode: true } }),
    );
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        data: { lastEntryIdByCategory: { nope: "x", verbs: 12 }, learningProgress: { bad: true } },
      }),
    );
    expect(loadSettings().selectedCategory).toBe("all");
    expect(loadProgress().lastEntryIdByCategory.verbs).toBeUndefined();
  });

  it("keeps version 1 progress, including review fields, under version 2", () => {
    const stored = {
      vocabularyId: "verb-have",
      repetitions: 2,
      correctAnswers: 3,
      incorrectAnswers: 1,
      lastReviewed: "2026-01-02T00:00:00.000Z",
      nextReview: "2026-01-09T00:00:00.000Z",
      difficulty: 2.5,
    };
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        data: {
          lastEntryIdByCategory: { verbs: "verb-have" },
          learningProgress: { "verb-have": stored },
        },
      }),
    );
    window.localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        data: { selectedCategory: "verbs", interval: 10000, randomMode: false, languagePair: "fr-es" },
      }),
    );

    expect(migrate(1, { learningProgress: { "verb-have": stored } })).toEqual({
      learningProgress: { "verb-have": stored },
    });
    expect(loadProgress().learningProgress["verb-have"]).toEqual(stored);
    expect(loadSettings().selectedCategory).toBe("verbs");
    expect(loadSettings().languagePair).toBe("fr-es");
  });

  it("omits a bad review date and rejects an unknown version", () => {
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        version: 1,
        data: {
          lastEntryIdByCategory: {},
          learningProgress: {
            "verb-have": {
              vocabularyId: "verb-have",
              repetitions: 1,
              correctAnswers: 0,
              incorrectAnswers: 0,
              lastReviewed: "mañana",
              nextReview: "2026-01-09",
              difficulty: Number.POSITIVE_INFINITY,
            },
          },
        },
      }),
    );
    expect(loadProgress().learningProgress["verb-have"]).toEqual({
      vocabularyId: "verb-have",
      repetitions: 1,
      correctAnswers: 0,
      incorrectAnswers: 0,
    });

    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({ version: 9, data: { lastEntryIdByCategory: { verbs: "verb-have" }, learningProgress: {} } }),
    );
    expect(loadProgress()).toEqual({ lastEntryIdByCategory: {}, learningProgress: {} });
  });
});
