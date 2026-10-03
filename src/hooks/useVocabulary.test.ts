import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { VocabularyEntry } from "../types/vocabulary";
import { loadProgress } from "../utils/storage";
import { useVocabulary } from "./useVocabulary";

const entries: VocabularyEntry[] = [
  { id: "n1", category: "nouns", term: "one", translation: "uno" },
  { id: "n2", category: "nouns", term: "two", translation: "dos" },
  { id: "n3", category: "nouns", term: "three", translation: "tres" },
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
];

const cefrEntries: VocabularyEntry[] = [
  { id: "n-a1", category: "nouns", term: "day", translation: "día", difficulty: "A1" },
  { id: "n-b2", category: "nouns", term: "trend", translation: "tendencia", difficulty: "B2", tags: ["cefr-lock"] },
];

describe("useVocabulary", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("moves next and previous and resets reveal", () => {
    const { result } = renderHook(() => useVocabulary({ entries }));
    act(() => result.current.setSelectedCategory("nouns"));
    expect(result.current.currentEntry?.id).toBe("n1");
    act(() => result.current.reveal());
    expect(result.current.state.isRevealed).toBe(true);
    act(() => result.current.goNext());
    expect(result.current.currentEntry?.id).toBe("n2");
    expect(result.current.state.isRevealed).toBe(false);
    act(() => result.current.goPrevious());
    expect(result.current.currentEntry?.id).toBe("n1");
  });

  it("keeps the translation visible at the 1s interval", () => {
    const { result } = renderHook(() => useVocabulary({ entries }));
    act(() => result.current.setSelectedCategory("nouns"));
    act(() => result.current.setIntervalMs(1000));
    expect(result.current.state.isRevealed).toBe(true);
    const first = result.current.currentEntry?.id;
    act(() => result.current.handleAutoPlayTick());
    expect(result.current.currentEntry?.id).not.toBe(first);
    expect(result.current.state.isRevealed).toBe(true);
    act(() => result.current.goNext());
    expect(result.current.state.isRevealed).toBe(true);
  });

  it("filters to verbs and updates progress", () => {
    const { result } = renderHook(() => useVocabulary({ entries }));
    act(() => result.current.setSelectedCategory("verbs"));
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.currentEntry?.id).toBe("v1");
    expect(result.current.progress).toEqual({ current: 1, total: 1 });
  });

  it("does not repeat an item immediately in random mode", () => {
    const { result } = renderHook(() => useVocabulary({ entries }));
    act(() => result.current.setSelectedCategory("nouns"));
    act(() => {
      if (!result.current.state.randomMode) result.current.toggleRandomMode();
    });

    const seen: string[] = [];
    for (let i = 0; i < 3; i += 1) {
      seen.push(result.current.currentEntry?.id ?? "");
      act(() => result.current.goNext());
    }
    expect(new Set(seen).size).toBe(3);

    const last = seen[2];
    expect(result.current.currentEntry?.id).not.toBe(last);
  });

  it("two-phase autoplay reveals then advances", () => {
    const { result } = renderHook(() => useVocabulary({ entries }));
    act(() => result.current.setSelectedCategory("nouns"));
    const first = result.current.currentEntry?.id;
    act(() => result.current.handleAutoPlayTick());
    expect(result.current.state.isRevealed).toBe(true);
    expect(result.current.currentEntry?.id).toBe(first);
    act(() => result.current.handleAutoPlayTick());
    expect(result.current.currentEntry?.id).not.toBe(first);
    expect(result.current.state.isRevealed).toBe(false);
  });

  it("applies todo aleatorio as all + random", () => {
    const { result } = renderHook(() => useVocabulary({ entries }));
    act(() => result.current.setStudyScope("all-random"));
    expect(result.current.state.selectedCategory).toBe("all");
    expect(result.current.state.randomMode).toBe(true);
    act(() => result.current.setStudyScope("adjectives"));
    expect(result.current.state.selectedCategory).toBe("adjectives");
    expect(result.current.state.randomMode).toBe(false);
  });

  it("switches to the French catalog", async () => {
    const { result } = renderHook(() => useVocabulary());
    act(() => result.current.setLanguagePair("fr-es"));
    expect(result.current.state.languagePair).toBe("fr-es");
    await waitFor(() => {
      expect(result.current.filtered.some((entry) => entry.id.startsWith("fr-"))).toBe(true);
    });
  });

  it("switches to the Catalan catalog", async () => {
    const { result } = renderHook(() => useVocabulary());
    act(() => result.current.setLanguagePair("ca-es"));
    expect(result.current.state.languagePair).toBe("ca-es");
    await waitFor(() => {
      expect(result.current.filtered.some((entry) => entry.id.startsWith("ca-"))).toBe(true);
    });
  });

  it("filters the catalog by CEFR level", () => {
    const { result } = renderHook(() => useVocabulary({ entries: cefrEntries }));
    act(() => result.current.setCefrLevel("B2"));
    expect(result.current.state.cefrLevel).toBe("B2");
    expect(result.current.filtered.map((entry) => entry.id)).toEqual(["n-b2"]);
  });

  it("widens the level to all when the current band has no cards", () => {
    const mixed: VocabularyEntry[] = [
      { id: "n-a1", category: "nouns", term: "day", translation: "día", difficulty: "A1" },
      {
        id: "tech-question-git",
        category: "techQuestions",
        term: "What is Git?",
        translation: "¿Qué es Git?",
        difficulty: "A2",
      },
      {
        id: "tech-answer-git",
        category: "techAnswers",
        term: "Git is a version control system.",
        translation: "Git es un sistema de control de versiones.",
        difficulty: "A2",
      },
    ];
    const { result } = renderHook(() => useVocabulary({ entries: mixed }));
    act(() => result.current.setCefrLevel("A1"));
    expect(result.current.state.cefrLevel).toBe("A1");
    expect(result.current.filtered.map((entry) => entry.id)).toEqual(["n-a1"]);
    act(() => result.current.setSelectedCategory("techPhrases"));
    expect(result.current.state.cefrLevel).toBe("all");
    expect(result.current.filtered.map((entry) => entry.id)).toEqual([
      "tech-question-git",
      "tech-answer-git",
    ]);
  });

  it("builds a two-way test queue and locks a choice", () => {
    const { result } = renderHook(() => useVocabulary({ entries }));
    act(() => result.current.setSelectedCategory("nouns"));
    act(() => result.current.setStudyMode("test"));
    expect(result.current.state.studyMode).toBe("test");
    expect(result.current.state.isAutoPlaying).toBe(false);
    expect(result.current.testStarted).toBe(false);
    expect(result.current.progress.total).toBe(6);
    act(() => result.current.startTest());
    expect(result.current.testStarted).toBe(true);
    expect(result.current.currentQuizItem?.choices.length).toBeGreaterThanOrEqual(2);
    expect(result.current.currentQuizItem?.choices.filter((choice) => choice.correct)).toHaveLength(1);
    const key = result.current.currentQuizItem?.choices[0]?.key;
    expect(key).toBeDefined();
    act(() => result.current.selectQuizChoice(key!));
    expect(result.current.selectedChoiceKey).toBe(key);
    act(() => result.current.selectQuizChoice("d"));
    expect(result.current.selectedChoiceKey).toBe(key);
    act(() => result.current.goNext());
    expect(result.current.selectedChoiceKey).toBeNull();
    expect(result.current.progress.current).toBe(2);
  });

  it("keeps a missed card for review after reload and does not grade a reveal", () => {
    const { result, unmount } = renderHook(() => useVocabulary({ entries, userId: "ana" }));
    act(() => result.current.setSelectedCategory("nouns"));
    act(() => result.current.reveal());
    expect(loadProgress().learningProgress).toEqual({});

    act(() => result.current.setStudyMode("test"));
    act(() => result.current.startTest());
    const item = result.current.currentQuizItem;
    const wrong = item?.choices.find((choice) => !choice.correct);
    expect(wrong?.key).toBeDefined();
    act(() => result.current.selectQuizChoice(wrong!.key));
    const missedId = item!.promptId;
    act(() => result.current.setSelectedCategory("verbs"));
    expect(loadProgress().learningProgress[`ana:${missedId}`]?.incorrectAnswers).toBeGreaterThanOrEqual(1);

    unmount();
    const again = renderHook(() => useVocabulary({ entries, userId: "ana" }));
    act(() => again.result.current.setReviewing(true));
    expect(again.result.current.currentEntry?.id).toBe(missedId);
    expect(loadProgress().learningProgress[`ana:${missedId}`]?.incorrectAnswers).toBeGreaterThanOrEqual(1);
    expect(loadProgress().learningProgress[`ana:${missedId}`]?.lastOutcome).toBe("miss");
  });
});

describe("useAutoPlay timer cleanup", () => {
  it("clears the interval on unmount", async () => {
    vi.useFakeTimers();
    const onTick = vi.fn();
    const { useAutoPlay } = await import("./useAutoPlay");
    const { unmount } = renderHook(() => useAutoPlay({ enabled: true, interval: 1000, onTick }));
    unmount();
    await act(async () => {
      vi.advanceTimersByTime(5000);
    });
    expect(onTick).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
