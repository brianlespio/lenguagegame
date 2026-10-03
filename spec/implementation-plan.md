# Implementation plan

Greenfield workspace. Stack chosen to match the spec: React + TypeScript + Vite + Tailwind CSS v4.

## Phase 1 — Architecture

Project config, Tailwind v4 plugin, folder layout, global theme.

## Phase 2 — Data model

Types, guards, `LearningState`, `LearningProgress`.

## Phase 3 — Initial dataset

20 nouns, 51 verbs (priority daily verbs + `eat` for specified tests), 20 adjectives, 20 connectors, 20 pronouns, 20 prepositions, 20 adverbs. Irregular forms verified against standard conjugation lists.

## Phase 4 — VocabularyCard

Category, English, revealable Spanish.

## Phase 5 — VerbCard

Three-column / stacked verb layout. No session logic.

## Phase 6 — Navigation

Next, previous, wrap, keyboard arrows.

## Phase 7 — Categories

Filter including `ALL`. Progress follows the active filter.

## Phase 8 — Reveal system

Hidden translations, `REVEAL` / `R` / `Space`.

## Phase 9 — Auto play

Single interval, two-phase tick, cleanup.

## Phase 10 — Random mode

Shuffle bag, no immediate repeat.

## Phase 11 — Fullscreen

`document.documentElement.requestFullscreen()` with viewport fallback.

## Phase 12 — Persistence

`storage.ts` with versioned JSON and corrupt-data handling.

## Phase 13 — Responsive UX

Fluid type, stacked verbs on small screens, idle chrome.

## Phase 14 — Testing

Vitest suites listed in `testing-spec.md`.

## Phase 15 — Final validation

`npm run test` and `npm run build`. Fix all failures before delivery.

## Phase 16 — Phrase categories

Spec: `phrases-spec.md`. Types and filters, menu group **Frases**, sentence typography, 600 EN/FR polar sets with explicit CEFR (A1 to C2 leveled to 100), tests for counts/ids/CEFR preservation.

## Phase 17 — Technical work phrases

Spec: `phrases-spec.md`. Menu group **Trabajo técnico**, open Q+A pairs (`techQuestions` / `techAnswers`), completeness contract, 77 pairs, everyday `phrases` must exclude tech.

## Phase 18 — Conversation phrases

Spec: `phrases-spec.md`. Menu group **Conversación**, open everyday Q+A (`openQuestions` / `openAnswers`), 56 pairs, no overlap with polar yes/no or tech.

## Phase 19 — School work phrases

Spec: `phrases-spec.md`. Menu group **Trabajo escolar**, school circulars (`schoolNotices`), 56 notices, everyday `phrases` / tech / conversation must exclude school.

## Phase 20 — Test mode

Spec: `quiz-spec.md`. `studyMode` study/test, same category + CEFR + language filter, **2N questions** (source ↔ Spanish), **up to four choices** with occasional none-of-the-above on slot D, green/red lock, `buildQuizQueue` + `buildQuizItem` + `QuizCard`. Reveal and autoplay stay study-only. Polar yes/no is not the buttons. `npm run test` and `npm run build` before considering the phase done.

## Phases 21–31 — Learner data, review, and the math subjects

Spec: `roadmap.md`. Do these in the order that file gives. Phases 21, 22, 23, and 29 are closed. The next phase is 30. Each phase names the spec it updates and the test that closes it. Phase 21 already keeps `nextReview`.
