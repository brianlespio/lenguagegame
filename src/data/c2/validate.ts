import {
  C2_PHRASE_CLASSES,
  C2_WORD_CLASSES,
  LEVEL_BANK_SPEC,
  LOCKED_CEFR_LEVELS,
  MIN_C2_PER_WORD_CLASS,
  type LockedCefrLevel,
} from "../../constants";
import type { CategoryFilter, StudyCefrLevel, VocabularyEntry } from "../../types/vocabulary";
import { filterEntries } from "../../utils/vocabulary";

const LOCKED_BANK_CLASSES = [...C2_WORD_CLASSES, ...C2_PHRASE_CLASSES] as const;

export interface BankShortfall {
  language: "en" | "fr";
  level: StudyCefrLevel;
  category: (typeof LOCKED_BANK_CLASSES)[number];
  actual: number;
  required: number;
}

export function findLevelBankShortfalls(
  english: readonly VocabularyEntry[],
  french: readonly VocabularyEntry[],
  level: StudyCefrLevel = "C2",
): BankShortfall[] {
  const required = LEVEL_BANK_SPEC[level].minPerClass;
  const shortfalls: BankShortfall[] = [];
  for (const [language, catalog] of [
    ["en", english],
    ["fr", french],
  ] as const) {
    for (const category of LOCKED_BANK_CLASSES) {
      const actual = filterEntries(catalog, category as CategoryFilter, level).length;
      if (actual < required) {
        shortfalls.push({ language, level, category, actual, required });
      }
    }
  }
  return shortfalls;
}

export function assertLevelBanksComplete(
  english: readonly VocabularyEntry[],
  french: readonly VocabularyEntry[],
  level: LockedCefrLevel,
): void {
  const shortfalls = findLevelBankShortfalls(english, french, level);
  if (shortfalls.length === 0) return;
  const required = LEVEL_BANK_SPEC[level].minPerClass;
  const details = shortfalls
    .map((item) => `${item.language} ${item.category} ${level}: ${item.actual}/${item.required}`)
    .join("; ");
  throw new Error(`${level} bank incomplete (minimum ${required} per class): ${details}`);
}

export function assertC2BanksComplete(
  english: readonly VocabularyEntry[],
  french: readonly VocabularyEntry[],
): void {
  assertLevelBanksComplete(english, french, "C2");
}

export function assertLockedBanksComplete(
  english: readonly VocabularyEntry[],
  french: readonly VocabularyEntry[],
): void {
  for (const level of LOCKED_CEFR_LEVELS) {
    assertLevelBanksComplete(english, french, level);
  }
}

export { MIN_C2_PER_WORD_CLASS };
