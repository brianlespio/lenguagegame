import { NONE_OF_THE_ABOVE } from "../constants";
import type { ChoiceKey, MathCard, QuizChoice, QuizItem } from "../types/card";
import { fisherYatesShuffle, type RandomFn } from "./shuffle";

const KEYS: readonly ChoiceKey[] = ["a", "b", "c", "d"];
const NONE_CHANCE = 0.32;

function assignKeys(choices: readonly Omit<QuizChoice, "key">[]): QuizChoice[] {
  return choices.map((choice, index) => ({ ...choice, key: KEYS[index] ?? "a" }));
}

function otherAnswers(pool: readonly MathCard[], card: MathCard, direction: "forward" | "reverse"): string[] {
  const correct = card.quiz[direction].correct.trim().toLowerCase();
  const seen = new Set<string>([correct]);
  const answers: string[] = [];
  for (const other of pool) {
    if (other.axis !== card.axis || other.level !== card.level) continue;
    const text = other.quiz[direction].correct;
    const norm = text.trim().toLowerCase();
    if (!norm || seen.has(norm)) continue;
    seen.add(norm);
    answers.push(text);
  }
  return answers;
}

export function assembleChoices(correct: string, distractors: readonly string[], random: RandomFn): QuizChoice[] {
  const usable = distractors.filter((text) => text.trim().toLowerCase() !== correct.trim().toLowerCase());
  const useNone = usable.length >= 3 && random() < NONE_CHANCE;
  if (useNone) {
    const noneIsKey = random() < 0.5;
    if (noneIsKey) {
      const lies = fisherYatesShuffle(usable, random).slice(0, 3).map((text) => ({
        text,
        correct: false,
        kind: "catalog" as const,
      }));
      return assignKeys([
        ...fisherYatesShuffle(lies, random),
        { text: NONE_OF_THE_ABOVE, correct: true, kind: "none" },
      ]);
    }
    const lies = fisherYatesShuffle(usable, random).slice(0, 2).map((text) => ({
      text,
      correct: false,
      kind: "catalog" as const,
    }));
    const head = fisherYatesShuffle(
      [{ text: correct, correct: true, kind: "catalog" as const }, ...lies],
      random,
    );
    return assignKeys([...head, { text: NONE_OF_THE_ABOVE, correct: false, kind: "none" }]);
  }

  const lies = fisherYatesShuffle(usable, random)
    .slice(0, Math.min(3, usable.length))
    .map((text) => ({ text, correct: false, kind: "catalog" as const }));
  return assignKeys(
    fisherYatesShuffle([{ text: correct, correct: true, kind: "catalog" as const }, ...lies], random),
  );
}

export function buildQuizQueue(cards: readonly MathCard[], random: RandomFn = Math.random): QuizItem[] {
  const items: QuizItem[] = [];
  for (const card of cards) {
    for (const direction of ["forward", "reverse"] as const) {
      items.push({
        id: `${card.id}:${direction}`,
        cardId: card.id,
        axis: card.axis,
        level: card.level,
        direction,
        prompt: card.quiz[direction].prompt,
        choices: assembleChoices(card.quiz[direction].correct, otherAnswers(cards, card, direction), random),
      });
    }
  }
  return fisherYatesShuffle(items, random);
}

export function choiceIsCorrect(item: QuizItem, key: ChoiceKey): boolean {
  return item.choices.some((choice) => choice.key === key && choice.correct);
}
