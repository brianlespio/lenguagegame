import type { CategoryFilter, LanguagePairId, VocabularyEntry } from "../types/vocabulary";
import type { QuizBuildOptions, QuizChoice, QuizChoiceKey, QuizDirection, QuizItem, QuizPromptKind, QuizPromptRef, QuizSessionOptions } from "../types/quiz";
import { fisherYatesShuffle, type RandomFn } from "./shuffle";
import { isPhraseCategory, isVerbItem } from "./vocabulary";

export const NONE_OF_THE_ABOVE_ID = "none-of-the-above";

const CHOICE_KEYS: readonly QuizChoiceKey[] = ["a", "b", "c", "d"];

const NONE_CHANCE = 0.32;

export function noneOfTheAboveLabel(choiceLanguage: "en" | "fr" | "es"): string {
  if (choiceLanguage === "en") return "None of the above";
  if (choiceLanguage === "fr") return "Aucune des réponses ci-dessus";
  return "Ninguna de las anteriores";
}

export function quizChoiceLanguage(
  pair: LanguagePairId,
  direction: QuizDirection,
): "en" | "fr" | "es" {
  if (direction === "forward") return "es";
  return pair === "fr-es" ? "fr" : "en";
}

export function quizSides(entry: VocabularyEntry): { source: string; target: string } {
  if (isVerbItem(entry)) {
    return { source: entry.infinitive, target: entry.infinitiveTranslation };
  }
  return { source: entry.term, target: entry.translation };
}

export function quizPromptKind(entry: VocabularyEntry): QuizPromptKind {
  if (isVerbItem(entry)) return "verb";
  if (isPhraseCategory(entry.category)) return "phrase";
  return "word";
}

function trimSide(value: string): string {
  return value.trim();
}

function normalizeChoice(value: string): string {
  return trimSide(value).toLowerCase();
}

export function openingPolarity(text: string): "yes" | "no" | "other" {
  const head = normalizeChoice(text).replace(/^[¿¡]+/, "");
  if (/^(yes|yeah|yep|oui|si\b|sí)\b/.test(head)) return "yes";
  if (/^(no|nah|non)\b/.test(head)) return "no";
  return "other";
}

export function translationPairKey(entry: VocabularyEntry, direction: QuizDirection): string {
  const { source, target } = quizSides(entry);
  const left = direction === "forward" ? source : target;
  const right = direction === "forward" ? target : source;
  return `${normalizeChoice(left)}↔${normalizeChoice(right)}`;
}

export function inversePairKey(entry: VocabularyEntry, direction: QuizDirection): string {
  return translationPairKey(entry, direction === "forward" ? "reverse" : "forward");
}

function lengthScore(a: string, b: string): number {
  const left = a.length;
  const right = b.length;
  if (left === 0 || right === 0) return 0;
  return Math.min(left, right) / Math.max(left, right);
}

export function quizPromptText(entry: VocabularyEntry, direction: QuizDirection): string {
  const { source, target } = quizSides(entry);
  return direction === "forward" ? trimSide(source) : trimSide(target);
}

export function quizChoiceText(entry: VocabularyEntry, direction: QuizDirection): string {
  const { source, target } = quizSides(entry);
  return direction === "forward" ? trimSide(target) : trimSide(source);
}

export function hasQuizSides(entry: VocabularyEntry): boolean {
  const { source, target } = quizSides(entry);
  return trimSide(source).length > 0 && trimSide(target).length > 0;
}

function assignKeys(choices: Array<Omit<QuizChoice, "key">>): QuizChoice[] {
  return choices.map((choice, index) => ({
    ...choice,
    key: CHOICE_KEYS[index] ?? "a",
  }));
}

function eligibleDistractors(
  pool: readonly VocabularyEntry[],
  prompt: VocabularyEntry,
  direction: QuizDirection,
  categoryFilter: CategoryFilter,
): VocabularyEntry[] {
  const promptText = quizChoiceText(prompt, direction);
  const promptNorm = normalizeChoice(promptText);
  if (!promptNorm) return [];
  const seen = new Set<string>([promptNorm]);
  const result: VocabularyEntry[] = [];
  for (const candidate of pool) {
    if (candidate.id === prompt.id) continue;
    if (categoryFilter === "all" && candidate.category !== prompt.category) continue;
    if (prompt.difficulty && candidate.difficulty !== prompt.difficulty) continue;
    const text = quizChoiceText(candidate, direction);
    const norm = normalizeChoice(text);
    if (!norm || seen.has(norm)) continue;
    seen.add(norm);
    result.push(candidate);
  }
  const promptPolarity = openingPolarity(promptText);
  const samePolarity = result.filter((entry) => openingPolarity(quizChoiceText(entry, direction)) === promptPolarity);
  const polarityPool = promptPolarity === "other" || samePolarity.length < 2 ? result : samePolarity;
  return polarityPool.slice().sort((left, right) => {
    const leftScore = lengthScore(quizChoiceText(left, direction), promptText);
    const rightScore = lengthScore(quizChoiceText(right, direction), promptText);
    return rightScore - leftScore;
  });
}

function catalogChoice(
  entry: VocabularyEntry,
  direction: QuizDirection,
  correct: boolean,
): Omit<QuizChoice, "key"> {
  return {
    entryId: entry.id,
    text: quizChoiceText(entry, direction),
    translation: quizPromptText(entry, direction),
    correct,
    kind: "catalog",
  };
}

function noneChoice(pair: LanguagePairId, direction: QuizDirection, correct: boolean): Omit<QuizChoice, "key"> {
  const shown = quizChoiceLanguage(pair, direction);
  const heard = shown === "es" ? (pair === "fr-es" ? "fr" : "en") : "es";
  return {
    entryId: NONE_OF_THE_ABOVE_ID,
    text: noneOfTheAboveLabel(shown),
    translation: noneOfTheAboveLabel(heard),
    correct,
    kind: "none",
  };
}

function quizGroupKey(entry: VocabularyEntry, categoryFilter: CategoryFilter): string {
  const category = categoryFilter === "all" ? entry.category : "*";
  return `${category}|${entry.difficulty ?? ""}`;
}

export function quizablePromptKeySet(
  pool: readonly VocabularyEntry[],
  categoryFilter: CategoryFilter,
): Set<string> {
  const groups = new Map<string, VocabularyEntry[]>();
  for (const entry of pool) {
    if (!hasQuizSides(entry)) continue;
    const key = quizGroupKey(entry, categoryFilter);
    const list = groups.get(key) ?? [];
    list.push(entry);
    groups.set(key, list);
  }

  const keys = new Set<string>();
  for (const group of groups.values()) {
    for (const direction of ["forward", "reverse"] as const) {
      const texts = new Set<string>();
      for (const entry of group) {
        const text = normalizeChoice(quizChoiceText(entry, direction));
        if (text) texts.add(text);
      }
      if (texts.size < 2) continue;
      for (const entry of group) keys.add(`${entry.id}:${direction}`);
    }
  }
  return keys;
}

export function canBuildQuizItem(
  pool: readonly VocabularyEntry[],
  prompt: VocabularyEntry,
  direction: QuizDirection,
  categoryFilter: CategoryFilter,
): boolean {
  if (!hasQuizSides(prompt)) return false;
  const promptText = normalizeChoice(quizChoiceText(prompt, direction));
  if (!promptText) return false;
  const key = quizGroupKey(prompt, categoryFilter);
  for (const candidate of pool) {
    if (candidate.id === prompt.id) continue;
    if (quizGroupKey(candidate, categoryFilter) !== key) continue;
    const text = normalizeChoice(quizChoiceText(candidate, direction));
    if (text && text !== promptText) return true;
  }
  return false;
}

export function buildQuizQueue(
  pool: readonly VocabularyEntry[],
  randomMode = false,
  random: RandomFn = Math.random,
): QuizPromptRef[] {
  const items: QuizPromptRef[] = [];
  for (const entry of pool) {
    if (!hasQuizSides(entry)) continue;
    items.push({ promptId: entry.id, direction: "forward" });
    items.push({ promptId: entry.id, direction: "reverse" });
  }
  return randomMode ? fisherYatesShuffle(items, random) : items;
}

function isInverseNeighbor(left: QuizPromptRef, right: QuizPromptRef): boolean {
  return left.promptId === right.promptId && left.direction !== right.direction;
}

export function separateAdjacentInverses(
  items: readonly QuizPromptRef[],
  random: RandomFn = Math.random,
): QuizPromptRef[] {
  const result = [...items];
  for (let i = 1; i < result.length; i += 1) {
    const previous = result[i - 1];
    const current = result[i];
    if (!previous || !current || !isInverseNeighbor(previous, current)) continue;
    const swapAt = result.findIndex((item, index) => {
      if (index <= i) return false;
      const before = result[index - 1];
      const after = result[index + 1];
      if (!before) return false;
      if (isInverseNeighbor(previous, item)) return false;
      if (after && isInverseNeighbor(item, after)) return false;
      return item.promptId !== previous.promptId;
    });
    if (swapAt < 0) {
      const earlier = Math.max(0, i - 2 - Math.floor(random() * Math.max(1, i - 1)));
      const move = result.splice(i, 1)[0];
      if (move) result.splice(earlier, 0, move);
      continue;
    }
    const swap = result[swapAt];
    result[swapAt] = current;
    result[i] = swap ?? current;
  }
  return result;
}

export function buildTestSessionQueue(
  pool: readonly VocabularyEntry[],
  options: QuizSessionOptions = {},
): QuizPromptRef[] {
  const random = options.random ?? Math.random;
  const recent = new Set(options.recentPairKeys ?? []);
  const viable = pool.filter((entry) => hasQuizSides(entry));
  const items: QuizPromptRef[] = [];
  for (const entry of fisherYatesShuffle(viable, random)) {
    const first: QuizDirection = random() < 0.5 ? "forward" : "reverse";
    items.push({ promptId: entry.id, direction: first });
    items.push({ promptId: entry.id, direction: first === "forward" ? "reverse" : "forward" });
  }
  let queue = separateAdjacentInverses(fisherYatesShuffle(items, random), random);
  if (queue.length > 1 && recent.size > 0) {
    const byId = new Map(viable.map((entry) => [entry.id, entry]));
    const start = queue.findIndex((ref) => {
      const entry = byId.get(ref.promptId);
      return entry ? !recent.has(translationPairKey(entry, ref.direction)) && !recent.has(inversePairKey(entry, ref.direction)) : false;
    });
    if (start > 0) {
      queue = [...queue.slice(start), ...queue.slice(0, start)];
      queue = separateAdjacentInverses(queue, random);
    }
  }
  return queue;
}

export function sessionPairKeys(
  pool: readonly VocabularyEntry[],
  queue: readonly QuizPromptRef[],
): string[] {
  const byId = new Map(pool.map((entry) => [entry.id, entry]));
  const keys: string[] = [];
  for (const ref of queue) {
    const entry = byId.get(ref.promptId);
    if (!entry) continue;
    keys.push(translationPairKey(entry, ref.direction));
  }
  return keys;
}

export function buildQuizItem(
  pool: readonly VocabularyEntry[],
  prompt: VocabularyEntry,
  direction: QuizDirection,
  options: QuizBuildOptions,
): QuizItem | null {
  const random = options.random ?? Math.random;
  const promptText = quizPromptText(prompt, direction);
  const correctText = quizChoiceText(prompt, direction);
  if (!promptText || !correctText) return null;

  const distractors = fisherYatesShuffle(
    eligibleDistractors(pool, prompt, direction, options.categoryFilter),
    random,
  );
  if (distractors.length < 1) return null;

  const canHide = distractors.length >= 3;
  const canTrapFour = distractors.length >= 2;
  const forced = options.noneMode ?? "auto";
  let mode: "standard" | "none-correct" | "none-trap" = "standard";
  if (forced === "correct" && canHide) mode = "none-correct";
  else if (forced === "trap" && canTrapFour) mode = "none-trap";
  else if (forced === "off") mode = "standard";
  else if (forced === "auto") {
    const roll = random();
    if (canHide && roll < NONE_CHANCE / 2) mode = "none-correct";
    else if (canTrapFour && roll < NONE_CHANCE) mode = "none-trap";
  }

  let raw: Array<Omit<QuizChoice, "key">>;
  if (mode === "none-correct") {
    raw = [
      ...fisherYatesShuffle(distractors.slice(0, 3), random).map((entry) =>
        catalogChoice(entry, direction, false),
      ),
      noneChoice(options.languagePair, direction, true),
    ];
  } else if (mode === "none-trap") {
    const lies = distractors.slice(0, 2);
    raw = [
      ...fisherYatesShuffle([prompt, ...lies], random).map((entry) =>
        catalogChoice(entry, direction, entry.id === prompt.id),
      ),
      noneChoice(options.languagePair, direction, false),
    ];
  } else {
    const extras = distractors.slice(0, 3);
    raw = fisherYatesShuffle(
      [catalogChoice(prompt, direction, true), ...extras.map((entry) => catalogChoice(entry, direction, false))],
      random,
    );
  }

  return {
    promptId: prompt.id,
    direction,
    prompt: promptText,
    promptTranslation: correctText,
    promptKind: quizPromptKind(prompt),
    category: prompt.category,
    choices: assignKeys(raw),
  };
}
