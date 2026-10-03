# Data model

## VocabularyItem

Used by nouns, adjectives, connectors, pronouns, prepositions, adverbs, polar phrases, tech phrases, conversation phrases, and school notices.

```ts
interface VocabularyItem {
  id: string;
  category:
    | "nouns"
    | "adjectives"
    | "connectors"
    | "pronouns"
    | "prepositions"
    | "adverbs"
    | "questions"
    | "positiveAnswers"
    | "negativeAnswers"
    | "techQuestions"
    | "techAnswers"
    | "openQuestions"
    | "openAnswers"
    | "schoolNotices";
  english: string;
  spanish: string;
  example?: string;
  exampleTranslation?: string;
  pronunciation?: string;
  difficulty?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  tags?: string[];
}
```

## VerbItem

Verbs are a separate shape. Each English form has its own Spanish translation.

```ts
interface VerbItem {
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
  difficulty?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  tags?: string[];
}
```

Spanish past uses third-person singular preterite (aligned with `have → tuvo`, `go → fue`). The past participle uses the Spanish participle (`tenido`, `ido`).

`past === pastParticiple` is not assumed.

`PersistedSettings` also stores `languagePair`, `ttsMuted`, `cefrLevel`, and `studyMode`.

## Union

```ts
type VocabularyEntry = VocabularyItem | VerbItem;
```

Guard: `entry.category === "verbs"`.

## Learning state

```ts
interface LearningState {
  currentIndex: number;
  selectedCategory:
    | "all"
    | "nouns"
    | "verbs"
    | "adjectives"
    | "connectors"
    | "pronouns"
    | "prepositions"
    | "adverbs"
    | "phrases"
    | "questions"
    | "positiveAnswers"
    | "negativeAnswers"
    | "techPhrases"
    | "techQuestions"
    | "techAnswers"
    | "openPhrases"
    | "openQuestions"
    | "openAnswers"
    | "schoolNotices";
  isRevealed: boolean;
  isAutoPlaying: boolean;
  interval: number;
  randomMode: boolean;
  cefrLevel: CefrFilter;
  languagePair: LanguagePairId;
  ttsMuted: boolean;
  studyMode: "study" | "test";
}
```

## Quiz item (test mode)

Built from the current filtered catalog. See `quiz-spec.md`. Not stored. Not a third card type.

```ts
type StudyMode = "study" | "test";

interface QuizChoice {
  key: "a" | "b" | "c" | "d";
  entryId: string;
  text: string;
  correct: boolean;
  kind: "catalog" | "none";
}

interface QuizItem {
  promptId: string;
  direction: "forward" | "reverse";
  prompt: string;
  promptKind: "word" | "phrase" | "verb";
  category: VocabularyCategory;
  choices: readonly QuizChoice[];
}
```

## Learning progress

Stored per card. Scheduling is phase 27 of `roadmap.md`. Loading must not drop the optional fields, and a version bump must not wipe the record.

`STORAGE_VERSION` is 2. Version 1 settings and progress migrate by keeping the same document. `lastReviewed` and `nextReview` are kept only as UTC ISO timestamps (`2026-01-02T00:00:00.000Z`). `difficulty` is kept only as a finite number. A missing or malformed field is omitted. An unknown version or corrupt JSON falls back to the empty progress.

```ts
interface LearningProgress {
  vocabularyId: string;
  repetitions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  lastReviewed?: string;
  nextReview?: string;
  difficulty?: number;
  lastOutcome?: "miss" | "hit" | "restart";
  restarts?: number;
}
```

## Dataset files

- `src/data/verbs.ts` — `VerbItem[]`
- `src/data/vocabulary.ts` — `VocabularyItem[]`
- `src/data/phraseSets.ts` — 600 polar sets, 77 tech pairs, 56 conversation pairs
- `src/data/phraseSetsPolarC1.ts` — extra C1 polar trios (merged into `phraseSets`)
- `src/data/phraseSetsPolarB2.ts` — extra B2 polar trios (merged into `phraseSets`)
- `src/data/phraseSetsPolarB1.ts` — extra B1 polar trios (merged into `phraseSets`)
- `src/data/phraseSetsPolarA2.ts` — extra A2 polar trios (merged into `phraseSets`)
- `src/data/phraseSetsPolarA1.ts` — extra A1 polar trios (merged into `phraseSets`)
- `src/data/phraseSetsPolarC2.ts` — extra C2 polar trios (merged into `phraseSets`)
- `src/data/phraseSetsTechC2.ts` — extra C2 tech pairs (merged into `techPhraseSets`)
- `src/data/phraseSetsOpenC2.ts` — extra C2 conversation pairs (merged into `openPhraseSets`)
- `src/data/phraseSetsSchool.ts` — 56 school circulars (merged into catalogs)
- `src/data/index.ts` — concatenated `VocabularyEntry[]`
- `src/utils/quiz.ts` — `buildQuizQueue` / `buildQuizItem` (pure; cards never hardcode choices)

Polar ids: `question-{setId}` / `positive-{setId}` / `negative-{setId}`. Tech ids: `tech-question-{setId}` / `tech-answer-{setId}`. Open ids: `open-question-{setId}` / `open-answer-{setId}`. School ids: `school-{setId}` (French prefixed `fr-`). Each phrase card keeps an explicit CEFR level; frequency tagging must not overwrite it. A set is invalid without its matching answer card(s).

Components never hardcode words.
