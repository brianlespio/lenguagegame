import { beforeEach, describe, expect, it } from "vitest";
import { PROGRESS_STORAGE_KEY, SETTINGS_STORAGE_KEY } from "../constants";
import { loadProgress, loadSettings, saveProgress, saveSettings } from "./storage";

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
});
