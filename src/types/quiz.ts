import type { CategoryFilter, LanguagePairId, VocabularyCategory } from "./vocabulary";

export type QuizDirection = "forward" | "reverse";

export type QuizChoiceKey = "a" | "b" | "c" | "d";

export type QuizChoiceKind = "catalog" | "none";

export type QuizPromptKind = "word" | "phrase" | "verb";

export interface QuizChoice {
  key: QuizChoiceKey;
  entryId: string;
  text: string;
  translation: string;
  correct: boolean;
  kind: QuizChoiceKind;
}

export interface QuizItem {
  promptId: string;
  direction: QuizDirection;
  prompt: string;
  promptTranslation: string;
  promptKind: QuizPromptKind;
  category: VocabularyCategory;
  choices: readonly QuizChoice[];
}

export interface QuizPromptRef {
  promptId: string;
  direction: QuizDirection;
}

export interface QuizBuildOptions {
  languagePair: LanguagePairId;
  categoryFilter: CategoryFilter;
  random?: () => number;
  noneMode?: "auto" | "off" | "correct" | "trap";
}

export interface QuizSessionOptions {
  random?: () => number;
  recentPairKeys?: readonly string[];
}
