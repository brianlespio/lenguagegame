import type {
  CategoryFilter,
  CefrFilter,
  LanguagePair,
  LanguagePairId,
  PhraseCategory,
  PolarPhraseCategory,
  StudyCefrLevel,
  StudyMode,
  StudyScope,
  TechPhraseCategory,
  OpenPhraseCategory,
  SchoolPhraseCategory,
  VocabularyCategory,
} from "./types/vocabulary";

export const AUTO_PLAY_INTERVALS_MS = [1000, 3000, 5000, 10000, 15000, 30000] as const;

export type AutoPlayInterval = (typeof AUTO_PLAY_INTERVALS_MS)[number];

export const ALWAYS_REVEAL_INTERVAL_MS: AutoPlayInterval = 1000;

export const TTS_MIN_AUTOPLAY_MS: AutoPlayInterval = 5000;

export const TTS_MULTI_FORM_MS: AutoPlayInterval = 10000;

export const TTS_RATE = 0.88;

export const TTS_PHRASE_RATE = 0.76;

export const TTS_FORM_GAP_MS = 320;

export function isAlwaysRevealInterval(interval: number): boolean {
  return interval === ALWAYS_REVEAL_INTERVAL_MS;
}

export function isTtsAutoplayInterval(interval: number): boolean {
  return interval >= TTS_MIN_AUTOPLAY_MS;
}

export const DEFAULT_INTERVAL_MS: AutoPlayInterval = 5000;

export const IDLE_HIDE_MS = 4000;

export const STORAGE_VERSION = 1;

export const SETTINGS_STORAGE_KEY = "evt:settings";
export const PROGRESS_STORAGE_KEY = "evt:progress";
export const USERS_STORAGE_KEY = "evt:users";
export const SCORES_STORAGE_KEY = "evt:scores";
export const TEST_RECENT_STORAGE_KEY = "evt:test-recent";

export const C2_WORD_CLASSES = [
  "nouns",
  "verbs",
  "adjectives",
  "connectors",
  "pronouns",
  "prepositions",
  "adverbs",
] as const;

export type C2WordClass = (typeof C2_WORD_CLASSES)[number];

export const C2_PHRASE_CLASSES = [
  "questions",
  "positiveAnswers",
  "negativeAnswers",
  "techQuestions",
  "techAnswers",
  "openQuestions",
  "openAnswers",
  "schoolNotices",
] as const;

export type C2PhraseClass = (typeof C2_PHRASE_CLASSES)[number];

export const MIN_C2_PER_WORD_CLASS = 200;
export const MIN_C1_PER_WORD_CLASS = 160;
export const MIN_B2_PER_WORD_CLASS = 120;

export const CEFR_LOCK_TAG = "cefr-lock";

export const LOCKED_CEFR_LEVELS = ["B2", "C1", "C2"] as const;
export type LockedCefrLevel = (typeof LOCKED_CEFR_LEVELS)[number];

export const LEVEL_BANK_SPEC = {
  C2: { minPerClass: MIN_C2_PER_WORD_CLASS, status: "active" },
  C1: { minPerClass: MIN_C1_PER_WORD_CLASS, status: "active" },
  B2: { minPerClass: MIN_B2_PER_WORD_CLASS, status: "active" },
  B1: { minPerClass: 80, status: "pending" },
  A2: { minPerClass: 50, status: "pending" },
  A1: { minPerClass: 30, status: "pending" },
} as const;

export const POLAR_PHRASE_CATEGORIES: readonly PolarPhraseCategory[] = [
  "questions",
  "positiveAnswers",
  "negativeAnswers",
] as const;

export const TECH_PHRASE_CATEGORIES: readonly TechPhraseCategory[] = [
  "techQuestions",
  "techAnswers",
] as const;

export const OPEN_PHRASE_CATEGORIES: readonly OpenPhraseCategory[] = [
  "openQuestions",
  "openAnswers",
] as const;

export const SCHOOL_PHRASE_CATEGORIES: readonly SchoolPhraseCategory[] = ["schoolNotices"] as const;

export const PHRASE_CATEGORIES: readonly PhraseCategory[] = [
  ...POLAR_PHRASE_CATEGORIES,
  ...TECH_PHRASE_CATEGORIES,
  ...OPEN_PHRASE_CATEGORIES,
  ...SCHOOL_PHRASE_CATEGORIES,
] as const;

export const CATEGORY_FILTERS: readonly CategoryFilter[] = [
  "all",
  "nouns",
  "verbs",
  "adjectives",
  "connectors",
  "pronouns",
  "prepositions",
  "adverbs",
  "phrases",
  ...POLAR_PHRASE_CATEGORIES,
  "techPhrases",
  ...TECH_PHRASE_CATEGORIES,
  "openPhrases",
  ...OPEN_PHRASE_CATEGORIES,
  ...SCHOOL_PHRASE_CATEGORIES,
] as const;

export const CATEGORY_LABELS_BY_PAIR: Record<LanguagePairId, Record<CategoryFilter, string>> = {
  "en-es": {
    all: "ALL",
    nouns: "NOUNS",
    verbs: "VERBS",
    adjectives: "ADJECTIVES",
    connectors: "CONNECTORS",
    pronouns: "PRONOUNS",
    prepositions: "PREPOSITIONS",
    adverbs: "ADVERBS",
    phrases: "SETS",
    questions: "QUESTIONS",
    positiveAnswers: "AFFIRMATIVE",
    negativeAnswers: "NEGATIVE",
    techPhrases: "TECH",
    techQuestions: "QUESTION",
    techAnswers: "ANSWER",
    openPhrases: "TALK",
    openQuestions: "ASK",
    openAnswers: "REPLY",
    schoolNotices: "NOTICE",
  },
  "fr-es": {
    all: "TOUT",
    nouns: "NOMS",
    verbs: "VERBES",
    adjectives: "ADJECTIFS",
    connectors: "CONNECTEURS",
    pronouns: "PRONOMS",
    prepositions: "PRÉPOSITIONS",
    adverbs: "ADVERBES",
    phrases: "SÉRIES",
    questions: "QUESTIONS",
    positiveAnswers: "AFFIRMATIF",
    negativeAnswers: "NÉGATIF",
    techPhrases: "TECH",
    techQuestions: "QUESTION",
    techAnswers: "RÉPONSE",
    openPhrases: "PARLER",
    openQuestions: "QUESTION",
    openAnswers: "RÉPONSE",
    schoolNotices: "AVIS",
  },
  "ca-es": {
    all: "TOT",
    nouns: "NOMS",
    verbs: "VERBS",
    adjectives: "ADJECTIUS",
    connectors: "CONNECTORS",
    pronouns: "PRONOMS",
    prepositions: "PREPOSICIONS",
    adverbs: "ADVERBIS",
    phrases: "SÈRIES",
    questions: "PREGUNTES",
    positiveAnswers: "AFIRMATIU",
    negativeAnswers: "NEGATIU",
    techPhrases: "TECH",
    techQuestions: "PREGUNTA",
    techAnswers: "RESPOSTA",
    openPhrases: "PARLAR",
    openQuestions: "PREGUNTA",
    openAnswers: "RESPOSTA",
    schoolNotices: "AVÍS",
  },
};

export const CATEGORY_LABELS = CATEGORY_LABELS_BY_PAIR["en-es"];

export const VERB_FORM_LABELS: Record<LanguagePairId, readonly [string, string, string]> = {
  "en-es": ["INFINITIVE", "PAST", "PAST PARTICIPLE"],
  "fr-es": ["INFINITIF", "PASSÉ COMPOSÉ", "PARTICIPE PASSÉ"],
  "ca-es": ["INFINITIU", "PASSAT", "PARTICIPI"],
};

export function getCategoryLabel(pair: LanguagePairId, category: CategoryFilter): string {
  return CATEGORY_LABELS_BY_PAIR[pair][category];
}

export const CATEGORY_COLORS: Record<VocabularyCategory, string> = {
  nouns: "#E8C36A",
  verbs: "#7EB8FF",
  adjectives: "#C9A4FF",
  connectors: "#6EE0C8",
  pronouns: "#FF9AB3",
  prepositions: "#B6E07A",
  adverbs: "#FFB070",
  questions: "#9BB8FF",
  positiveAnswers: "#7ED9A8",
  negativeAnswers: "#FF8B78",
  techQuestions: "#7AD4E8",
  techAnswers: "#C4B5FD",
  openQuestions: "#F0C27A",
  openAnswers: "#E8A0C8",
  schoolNotices: "#86C8A0",
};

export const STUDY_SCOPE_OPTIONS: ReadonlyArray<{
  value: StudyScope;
  label: string;
  group?: string;
}> = [
  { value: "all", label: "Todo" },
  { value: "all-random", label: "Todo aleatorio" },
  { value: "nouns", label: "Sustantivos" },
  { value: "verbs", label: "Verbos" },
  { value: "adjectives", label: "Adjetivos" },
  { value: "connectors", label: "Conectores" },
  { value: "pronouns", label: "Pronombres" },
  { value: "prepositions", label: "Preposiciones" },
  { value: "adverbs", label: "Adverbios" },
  { value: "questions", label: "Preguntas oídas", group: "Recepción oral" },
  { value: "schoolNotices", label: "Textos y avisos", group: "Recepción escrita" },
  { value: "openPhrases", label: "Serie completa", group: "Producción oral" },
  { value: "openQuestions", label: "Turno de pregunta", group: "Producción oral" },
  { value: "openAnswers", label: "Turno de respuesta", group: "Producción oral" },
  { value: "techPhrases", label: "Serie completa", group: "Producción escrita" },
  { value: "techQuestions", label: "Encargo escrito", group: "Producción escrita" },
  { value: "techAnswers", label: "Redacción", group: "Producción escrita" },
  { value: "phrases", label: "Serie completa", group: "Interacción" },
  { value: "positiveAnswers", label: "Turno afirmativo", group: "Interacción" },
  { value: "negativeAnswers", label: "Turno negativo", group: "Interacción" },
];

export const STUDY_CEFR_LEVELS: readonly StudyCefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const CEFR_FILTERS: readonly CefrFilter[] = ["all", ...STUDY_CEFR_LEVELS];

export const DEFAULT_CEFR_FILTER: CefrFilter = "all";

export const CEFR_FILTER_OPTIONS: ReadonlyArray<{ value: CefrFilter; label: string }> = [
  { value: "all", label: "Todo" },
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "C1", label: "C1" },
  { value: "C2", label: "C2" },
];

export const DEFAULT_LANGUAGE_PAIR: LanguagePairId = "en-es";

export const DEFAULT_STUDY_MODE: StudyMode = "study";

export const STUDY_MODES: readonly StudyMode[] = ["study", "test"];

export const STUDY_MODE_OPTIONS: ReadonlyArray<{ value: StudyMode; label: string }> = [
  { value: "study", label: "Estudiar" },
  { value: "test", label: "Test" },
];

export const STUDY_MODE_KICKER: Record<LanguagePairId, Record<StudyMode, string>> = {
  "en-es": { study: "STUDY", test: "TEST" },
  "fr-es": { study: "ÉTUDE", test: "TEST" },
  "ca-es": { study: "ESTUDI", test: "TEST" },
};

export const LANGUAGE_PAIRS: readonly LanguagePair[] = [
  {
    id: "en-es",
    source: "en",
    target: "es",
    label: "English → Spanish",
    shortLabel: "EN → ES",
    available: true,
  },
  {
    id: "fr-es",
    source: "fr",
    target: "es",
    label: "Français → Español",
    shortLabel: "FR → ES",
    available: true,
  },
  {
    id: "ca-es",
    source: "ca",
    target: "es",
    label: "Català → Espanyol",
    shortLabel: "CA → ES",
    available: true,
  },
];
