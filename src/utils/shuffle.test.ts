import { describe, expect, it } from "vitest";
import { buildPhraseSetShuffleOrder, buildShuffleOrder, ShuffleBag } from "./shuffle";

const items = [
  { id: "a" },
  { id: "b" },
  { id: "c" },
  { id: "d" },
];

describe("ShuffleBag", () => {
  it("exhausts every item before refilling", () => {
    const bag = new ShuffleBag(items, () => 0.4);
    const firstCycle = new Set<string>();
    for (let i = 0; i < items.length; i += 1) {
      const next = bag.next();
      expect(next).toBeDefined();
      firstCycle.add(next!.id);
    }
    expect(firstCycle.size).toBe(items.length);
    expect(bag.getRemainingCount()).toBe(0);
  });

  it("avoids serving the same id twice across a refill", () => {
    const bag = new ShuffleBag(items, () => 0);
    let lastServed = bag.next();
    while (bag.getRemainingCount() > 0) {
      lastServed = bag.next();
    }
    const afterRefill = bag.next();
    expect(lastServed?.id).toBeDefined();
    expect(afterRefill?.id).not.toBe(lastServed?.id);
  });
});

describe("buildShuffleOrder", () => {
  it("does not start with the last served id when possible", () => {
    const order = buildShuffleOrder(items, "a", () => 0);
    expect(order[0]?.id).not.toBe("a");
  });
});

describe("buildPhraseSetShuffleOrder", () => {
  it("keeps each set as question then answers", () => {
    const cards = [
      { id: "question-a", category: "questions", tags: ["set:a"] },
      { id: "positive-a", category: "positiveAnswers", tags: ["set:a"] },
      { id: "negative-a", category: "negativeAnswers", tags: ["set:a"] },
      { id: "question-b", category: "questions", tags: ["set:b"] },
      { id: "positive-b", category: "positiveAnswers", tags: ["set:b"] },
      { id: "negative-b", category: "negativeAnswers", tags: ["set:b"] },
    ];
    const order = buildPhraseSetShuffleOrder(cards, "negative-a", () => 0);
    expect(order.slice(0, 3).map((item) => item.id)).toEqual([
      "question-b",
      "positive-b",
      "negative-b",
    ]);
  });

  it("keeps each tech set as question then answer", () => {
    const cards = [
      { id: "tech-question-a", category: "techQuestions", tags: ["set:a"] },
      { id: "tech-answer-a", category: "techAnswers", tags: ["set:a"] },
      { id: "tech-question-b", category: "techQuestions", tags: ["set:b"] },
      { id: "tech-answer-b", category: "techAnswers", tags: ["set:b"] },
    ];
    const order = buildPhraseSetShuffleOrder(cards, "tech-answer-a", () => 0);
    expect(order.slice(0, 2).map((item) => item.id)).toEqual(["tech-question-b", "tech-answer-b"]);
  });

  it("keeps each open set as question then answer", () => {
    const cards = [
      { id: "open-question-a", category: "openQuestions", tags: ["set:a"] },
      { id: "open-answer-a", category: "openAnswers", tags: ["set:a"] },
      { id: "open-question-b", category: "openQuestions", tags: ["set:b"] },
      { id: "open-answer-b", category: "openAnswers", tags: ["set:b"] },
    ];
    const order = buildPhraseSetShuffleOrder(cards, "open-answer-a", () => 0);
    expect(order.slice(0, 2).map((item) => item.id)).toEqual(["open-question-b", "open-answer-b"]);
  });
});
