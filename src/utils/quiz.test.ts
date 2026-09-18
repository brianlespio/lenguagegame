import { describe, expect, it } from "vitest";
import type { VocabularyEntry } from "../types/vocabulary";
import {
  NONE_OF_THE_ABOVE_ID,
  buildQuizItem,
  buildQuizQueue,
  buildTestSessionQueue,
  quizablePromptKeySet,
  inversePairKey,
  openingPolarity,
  translationPairKey,
  noneOfTheAboveLabel,
  quizChoiceLanguage,
} from "./quiz";

const nouns: VocabularyEntry[] = [
  { id: "n1", category: "nouns", term: "one", translation: "uno", difficulty: "A1" },
  { id: "n2", category: "nouns", term: "two", translation: "dos", difficulty: "A1" },
  { id: "n3", category: "nouns", term: "three", translation: "tres", difficulty: "A1" },
  { id: "n4", category: "nouns", term: "four", translation: "cuatro", difficulty: "A1" },
];

const mixed: VocabularyEntry[] = [
  ...nouns,
  {
    id: "v1",
    category: "verbs",
    infinitive: "go",
    past: "went",
    pastParticiple: "gone",
    infinitiveTranslation: "ir",
    pastTranslation: "fue",
    pastParticipleTranslation: "ido",
    difficulty: "A1",
  },
];

describe("buildQuizQueue", () => {
  it("yields forward and reverse for every card", () => {
    const queue = buildQuizQueue(nouns);
    expect(queue).toHaveLength(8);
    expect(queue.filter((item) => item.direction === "forward")).toHaveLength(4);
    expect(queue.filter((item) => item.direction === "reverse")).toHaveLength(4);
    expect(queue[0]).toEqual({ promptId: "n1", direction: "forward" });
    expect(queue[1]).toEqual({ promptId: "n1", direction: "reverse" });
  });
});

describe("buildQuizItem", () => {
  const prompt = nouns[0]!;

  it("builds four shuffled catalog choices with one correct", () => {
    const item = buildQuizItem(nouns, prompt, "forward", {
      languagePair: "en-es",
      categoryFilter: "nouns",
      noneMode: "off",
    });
    expect(item).not.toBeNull();
    expect(item?.prompt).toBe("one");
    expect(item?.promptKind).toBe("word");
    expect(item?.category).toBe("nouns");
    expect(item?.choices).toHaveLength(4);
    expect(item?.choices.filter((choice) => choice.correct)).toHaveLength(1);
    expect(item?.promptTranslation).toBe("uno");
    expect(item?.choices.find((choice) => choice.correct)?.text).toBe("uno");
    expect(item?.choices.find((choice) => choice.correct)?.translation).toBe("one");
    expect(item?.choices.find((choice) => choice.text === "dos")?.translation).toBe("two");
    expect(new Set(item?.choices.map((choice) => choice.text)).size).toBe(4);
    expect(item?.choices.every((choice) => choice.kind === "catalog")).toBe(true);
    expect(item?.choices.map((choice) => choice.key)).toEqual(["a", "b", "c", "d"]);
  });

  it("keeps none of the above as slot d and as the key when the others are lies", () => {
    const item = buildQuizItem(nouns, prompt, "forward", {
      languagePair: "en-es",
      categoryFilter: "nouns",
      noneMode: "correct",
    });
    expect(item?.choices).toHaveLength(4);
    const last = item?.choices[3];
    expect(last?.key).toBe("d");
    expect(last?.kind).toBe("none");
    expect(last?.entryId).toBe(NONE_OF_THE_ABOVE_ID);
    expect(last?.text).toBe("Ninguna de las anteriores");
    expect(last?.translation).toBe("None of the above");
    expect(last?.correct).toBe(true);
    expect(item?.choices.slice(0, 3).every((choice) => choice.kind === "catalog" && !choice.correct)).toBe(
      true,
    );
    expect(item?.choices.some((choice) => choice.text === "uno")).toBe(false);
  });

  it("uses none of the above as a trap when the true answer is among a–c", () => {
    const item = buildQuizItem(nouns, prompt, "reverse", {
      languagePair: "en-es",
      categoryFilter: "nouns",
      noneMode: "trap",
    });
    expect(item?.prompt).toBe("uno");
    const last = item?.choices[3];
    expect(last?.text).toBe("None of the above");
    expect(last?.translation).toBe("Ninguna de las anteriores");
    expect(last?.correct).toBe(false);
    expect(item?.choices.slice(0, 3).filter((choice) => choice.correct)).toHaveLength(1);
    expect(item?.choices.find((choice) => choice.correct)?.text).toBe("one");
  });

  it("labels the French reverse none-option in French", () => {
    expect(quizChoiceLanguage("fr-es", "reverse")).toBe("fr");
    expect(noneOfTheAboveLabel("fr")).toBe("Aucune des réponses ci-dessus");
    const item = buildQuizItem(nouns, prompt, "reverse", {
      languagePair: "fr-es",
      categoryFilter: "nouns",
      noneMode: "trap",
    });
    expect(item?.choices[3]?.text).toBe("Aucune des réponses ci-dessus");
  });

  it("takes distractors from the same category when the filter is all", () => {
    const item = buildQuizItem(mixed, prompt, "forward", {
      languagePair: "en-es",
      categoryFilter: "all",
      noneMode: "off",
    });
    expect(item?.choices.every((choice) => choice.kind === "none" || choice.entryId.startsWith("n"))).toBe(
      true,
    );
    expect(item?.choices.some((choice) => choice.entryId === "v1")).toBe(false);
  });

  it("skips a prompt that has no distinct distractor", () => {
    const lonely: VocabularyEntry[] = [prompt];
    expect(
      buildQuizItem(lonely, prompt, "forward", {
        languagePair: "en-es",
        categoryFilter: "nouns",
        noneMode: "off",
      }),
    ).toBeNull();
  });
});

describe("test session mixing", () => {
  it("includes both directions without adjacent inverses", () => {
    const queue = buildTestSessionQueue(nouns, { random: () => 0.2 });
    expect(queue).toHaveLength(8);
    expect(queue.filter((item) => item.direction === "forward")).toHaveLength(4);
    expect(queue.filter((item) => item.direction === "reverse")).toHaveLength(4);
    for (let i = 1; i < queue.length; i += 1) {
      expect(queue[i]?.promptId === queue[i - 1]?.promptId && queue[i]?.direction !== queue[i - 1]?.direction).toBe(
        false,
      );
    }
  });

  it("does not start a new session on the inverse of a recent pair", () => {
    const first = nouns[0]!;
    const recent = [translationPairKey(first, "forward"), inversePairKey(first, "forward")];
    const queue = buildTestSessionQueue(nouns, { recentPairKeys: recent, random: () => 0.1 });
    const start = nouns.find((entry) => entry.id === queue[0]?.promptId);
    if (!start || !queue[0]) return;
    expect(recent.includes(translationPairKey(start, queue[0].direction))).toBe(false);
  });

  it("keeps oui/non openings aligned so the first word is not the giveaway", () => {
    const answers: VocabularyEntry[] = [
      { id: "p1", category: "positiveAnswers", term: "Oui, je m'en charge.", translation: "Sí, me encargo.", difficulty: "B2" },
      { id: "p2", category: "positiveAnswers", term: "Oui, je prends la main.", translation: "Sí, tomo yo el mando.", difficulty: "B2" },
      { id: "p3", category: "positiveAnswers", term: "Oui, je te tiens au courant.", translation: "Sí, te voy informando.", difficulty: "B2" },
      { id: "n1", category: "negativeAnswers", term: "Non, je n'ai pas le temps.", translation: "No, no tengo tiempo.", difficulty: "B2" },
    ];
    const item = buildQuizItem(answers, answers[0]!, "forward", {
      languagePair: "fr-es",
      categoryFilter: "all",
      noneMode: "off",
    });
    const catalog = item?.choices.filter((choice) => choice.kind === "catalog") ?? [];
    expect(catalog.length).toBeGreaterThan(1);
    expect(new Set(catalog.map((choice) => openingPolarity(choice.text))).size).toBe(1);
  });

  it("indexes quizable prompts in linear time without dropping valid cards", () => {
    const keys = quizablePromptKeySet(nouns, "nouns");
    expect(keys.size).toBe(8);
    expect(keys.has("n1:forward")).toBe(true);
    expect(keys.has("n1:reverse")).toBe(true);
  });

  it("shuffles the correct slot across items", () => {
    const keys = new Set<string>();
    for (let i = 0; i < 12; i += 1) {
      const item = buildQuizItem(nouns, nouns[0]!, "forward", {
        languagePair: "en-es",
        categoryFilter: "nouns",
        noneMode: "off",
        random: () => (i % 4) / 4,
      });
      const correct = item?.choices.find((choice) => choice.correct);
      if (correct) keys.add(correct.key);
    }
    expect(keys.size).toBeGreaterThan(1);
  });
});

