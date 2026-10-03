export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type StudyCefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type CefrFilter = "all" | StudyCefrLevel;

export type PolarPhraseCategory = "questions" | "positiveAnswers" | "negativeAnswers";

export type TechPhraseCategory = "techQuestions" | "techAnswers";

export type OpenPhraseCategory = "openQuestions" | "openAnswers";

export type SchoolPhraseCategory = "schoolNotices";

export type PhraseCategory =
  | PolarPhraseCategory
  | TechPhraseCategory
  | OpenPhraseCategory
  | SchoolPhraseCategory;

export type StandardCategory =
  | "nouns"
  | "adjectives"
  | "connectors"
  | "pronouns"
  | "prepositions"
  | "adverbs"
  | PhraseCategory;

export type VocabularyCategory = StandardCategory | "verbs";

export type CategoryFilter = "all" | VocabularyCategory | "phrases" | "techPhrases" | "openPhrases";

export type StudyScope = CategoryFilter | "all-random";

export type StudyMode = "study" | "test";

export type LanguagePairId = "en-es" | "fr-es" | "ca-es";

export interface LanguagePair {
  id: LanguagePairId;
  source: "en" | "fr" | "ca";
  target: "es";
  label: string;
  shortLabel: string;
  available: boolean;
}

export interface VocabularyItem {
  id: string;
  category: StandardCategory;
  term: string;
  translation: string;
  example?: string;
  exampleTranslation?: string;
  pronunciation?: string;
  difficulty?: CefrLevel;
  tags?: string[];
}

export interface VerbItem {
  id: string;
  category: "verbs";
  infinitive: string;
  past: string;
  pastParticiple: string;
  infinitiveTranslation: string;
  pastTranslation: string;
  pastParticipleTranslation: string;
  example?: string;
  exampleTranslation?: string;
  pronunciation?: string;
  difficulty?: CefrLevel;
  tags?: string[];
}

export type VocabularyEntry = VocabularyItem | VerbItem;

export interface LearningState {
  currentIndex: number;
  selectedCategory: CategoryFilter;
  cefrLevel: CefrFilter;
  isRevealed: boolean;
  isAutoPlaying: boolean;
  interval: number;
  randomMode: boolean;
  languagePair: LanguagePairId;
  ttsMuted: boolean;
  studyMode: StudyMode;
}

export interface LearningProgress {
  vocabularyId: string;
  repetitions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  lastReviewed?: string;
  nextReview?: string;
  difficulty?: number;
}

export interface PersistedSettings {
  selectedCategory: CategoryFilter;
  cefrLevel: CefrFilter;
  interval: number;
  randomMode: boolean;
  languagePair: LanguagePairId;
  ttsMuted: boolean;
  studyMode: StudyMode;
}

export interface PersistedProgress {
  lastEntryIdByCategory: Record<string, string>;
  learningProgress: Record<string, LearningProgress>;
}
