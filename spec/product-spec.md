# Product specification — English Vocabulary Trainer

## Purpose

A full-screen visual trainer for learning English vocabulary with Spanish translations. Study happens through large centered cards grouped by grammatical category.

## Audience

Learners who want a dedicated study surface on a monitor, second display, TV, or projector. The vocabulary, not the chrome, must dominate the screen.

## Categories

| Category      | Card type        | Minimum entries |
| ------------- | ---------------- | --------------- |
| Nouns         | VocabularyCard   | 20              |
| Verbs         | VerbCard         | 50              |
| Adjectives    | VocabularyCard   | 20              |
| Connectors    | VocabularyCard   | 100             |
| Pronouns      | VocabularyCard   | 20              |
| Prepositions  | VocabularyCard   | 20              |
| Adverbs            | VocabularyCard   | 20              |
| Questions          | VocabularyCard   | 600             |
| Positive answers   | VocabularyCard   | 600             |
| Negative answers   | VocabularyCard   | 600             |
| Tech questions     | VocabularyCard   | 77              |
| Tech answers       | VocabularyCard   | 77              |
| Open questions     | VocabularyCard   | 56              |
| Open answers       | VocabularyCard   | 56              |
| School notices     | VocabularyCard   | 56              |

Word-class minimum remains **170**. Connectors are leveled to **100**. Everyday polar sets add **1800** cards (600 × 3). Technical work adds **154** cards (77 pairs). Conversation adds **112** cards (56 pairs). School circulars add **56** cards. See `phrases-spec.md`. C2 is the hardest study band in every category.

## Card hierarchy

Normal categories (including phrase categories):

1. Category label
2. Source term or phrase
3. Spanish translation (revealable)

Verbs always show three English forms, then three matching translations:

1. INFINITIVE / PAST / PAST PARTICIPLE
2. English forms
3. Spanish translations for each form (revealable)

Verbs must never be forced into the single `english` / `spanish` model.

## Learning interactions

- Sequential previous / next
- Manual reveal (`REVEAL`, `R`, `Space`) in study mode
- Auto play at 3 / 5 / 10 / 15 / 30 seconds in study mode
- Shuffle-bag random mode (no immediate repeat)
- Category filter including `ALL` (everyday polar under **Frases**; tech pairs under **Trabajo técnico**; open conversation under **Conversación**; school circulars under **Trabajo escolar**)
- Study / Test mode (`quiz-spec.md`)
- Fullscreen
- Progress `current / total` for the active filter
- Persistent category, interval, random mode, last position, and study/test mode

## Modes

**Study** (default): source card, TTS, revealable Spanish. See `ux-spec.md`.

**Test**: guess queue from the current category + CEFR + language filter. **Two questions per card** (source → Spanish and Spanish → source). **Up to four answers**. The fourth is sometimes **none of the above** (either the key, with three lies, or a trap). See `quiz-spec.md`. Not polar yes/no.

The level after a test uses the score above chance, not the raw percent. With four choices that is `(correct / total − 0.25) / 0.75`, clamped to 0–1. If an item has `n` choices and `n` is not 4, chance is `1 / n`. Fewer than 20 answers does not produce a CEFR level; the screen says «Aún no hay bastante».

## Out of scope for the first MVP

The list below is the original MVP, not the current app. Profiles, scores, spelling, Catalan, Basque, and the language-or-mathematics door now exist. The study pairs on the menu are English, French, Catalan, Basque, and German, each toward Spanish. German publishes every mapped gloss while phase 34 finishes the 89 % floors in `parity-spec.md`. After that wave, English grows first; the other languages follow in a later wave.

Favorites, search, accounts, and cloud sync stay out. Import of a learner file and spaced repetition are in `roadmap.md` (phases 25 and 27), not in the quiz builder.
