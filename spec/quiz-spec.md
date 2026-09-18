# Test mode

A second surface on the same trainer. It does **not** replace study cards, does **not** invent a second catalog, and is **not** polar yes/no.

Study remains: see the source, hear TTS, reveal Spanish.

Test is: a **guess queue** built from the current filter. Each catalog card yields **two questions**. Each question has **up to four answers** (one correct). The fourth slot is sometimes **none of the above**.

## Placement

`studyMode`: `study` | `test`.

Default `study`. Persisted with the other settings (category, CEFR, language, interval, random, mute).

The existing menus stay in charge of **categoría**, **nivel A1–C2 / Todo**, and **idioma**. Test reads that same filter. Changing any of those three rebuilds the queue and clears the lock.

## Queue (more questions)

Same study pool: `filterEntries(catalog, selectedCategory, cefrLevel)`.

Empty CEFR band: keep the existing widen-to-`all` for that category.

From that pool, Test builds one ordered (or shuffled) list of **quiz prompts**, not a second dataset:

| Direction | Prompt (top) | Correct choice | Per `VocabularyItem` | Per `VerbItem` |
| --------- | ------------ | -------------- | -------------------- | -------------- |
| Forward   | source term / infinitive | Spanish | `term` → `translation` | `infinitive` → `infinitiveTranslation` |
| Reverse   | Spanish | source term / infinitive | `translation` → `term` | `infinitiveTranslation` → `infinitive` |

Past / participle stay out of this wave.

So a filter of *N* cards produces **2N questions**, as long as each side has a non-empty string.

Progress in test is `current / total` on **this queue** (not the study card count).

Polar, tech, conversation, and school cards still participate as translation checks. Polar yes/no is never the set of buttons.

## Choices (more to guess among)

Target: **four** buttons. One correct.

Distractors come from the same pool as the prompt:

1. Different `id`.
2. Choice text different after trim + case-fold.
3. If the category filter is `all`, distractors share `entry.category` with the prompt.
4. Same CEFR band as the prompt when the level menu is not `all`. When the menu is `all`, distractors still match the prompt’s own `difficulty`.
5. On a reverse item, distractors are other **source** strings; on a forward item, other **Spanish** strings.

If fewer than three distinct distractors exist, drop to three buttons, then two. If a second distinct answer cannot be found, skip that prompt (do not invent filler). Never pad with duplicate catalog strings.

### None of the above

Sometimes the **fourth** button (`d`) is a none-option, in the **language of the other choices**:

| Choice language | Label |
| --------------- | ----- |
| Spanish (forward) | Ninguna de las anteriores |
| English (reverse, `en-es`) | None of the above |
| French (reverse, `fr-es`) | Aucune des réponses ci-dessus |

That slot stays last. Catalog answers shuffle in `a`–`c` only.

When none is present it is **not** always the key:

- **Key**: the true catalog string is withheld. `a`–`c` are three distinct lies from the pool. `d` is correct.
- **Trap**: the true catalog string is among `a`–`c`. `d` is wrong.

Without none, all four catalog answers shuffle so the key is not a fixed slot.

This forces an exact match instead of “the least-wrong looking option”, and blocks the meta-guess “if D says none, pick D”.

## Item

Built in a pure helper (`src/utils/quiz.ts`). Cards and `CardRenderer` do not own quiz logic.

```ts
type StudyMode = "study" | "test";

type QuizDirection = "forward" | "reverse";

interface QuizChoice {
  key: "a" | "b" | "c" | "d";
  entryId: string;
  text: string;
  correct: boolean;
  kind: "catalog" | "none";
}

interface QuizItem {
  promptId: string;
  direction: QuizDirection;
  prompt: string;
  promptKind: "word" | "phrase" | "verb";
  category: VocabularyCategory;
  choices: readonly QuizChoice[];
}
```

`choices.length` is 4, 3, or 2. Keys are assigned left-to-right / top-to-bottom after shuffle (`a`…`d`). The none-option, when present, is always `key: "d"` and `kind: "none"` with sentinel `entryId` `none-of-the-above`.

`promptKind` only drives typography (`data-kind`), same as study cards.

The session holds `selectedKey: QuizChoice["key"] | null`. `null` means unanswered.

## Interaction

1. Unanswered: equal buttons. No green, no red.
2. Click (or keyboard) locks the item. Further clicks on the choice buttons do nothing.
3. The correct button becomes green.
4. If the chosen button was wrong, that one becomes red **and** the correct one still becomes green.
5. Next / previous walk the **quiz queue**. Arriving on an item always starts unanswered; distractors may change.

No score, streak, percentage, or SRS write. `LearningProgress` stays unused.

## Chrome in test

Visible: previous, next, speak, mute, fullscreen, category, level, language, mode, progress.

Hidden or disabled: **Reveal**, **autoplay**, interval. Entering test stops autoplay if it was running.

TTS speaks the **prompt** only, at the same rates as study (`TTS_RATE` / `TTS_PHRASE_RATE`). It does not read the choices. On reverse items the prompt is Spanish; TTS still speaks that prompt.

## Keyboard

Study bindings stay in study mode.

| Key         | Test action                                      |
| ----------- | ------------------------------------------------ |
| `1` / `A`   | Choice `a`                                       |
| `2` / `B`   | Choice `b`                                       |
| `3` / `C`   | Choice `c` (if present)                          |
| `4` / `D`   | Choice `d` (if present)                          |
| ArrowRight  | Next item                                        |
| ArrowLeft   | Previous item                                    |
| S           | Speak prompt                                     |
| F           | Fullscreen                                       |
| R, Space, P | No-op (no reveal, no autoplay)                   |

## UI

Same dark full-screen stage. Prompt uses the current category accent and the same type scale as the study card (phrase vs word vs verb infinitive).

Choices sit **under** the prompt. Narrow viewports: one column. `md+`: 2×2 when there are four choices; one row when there are two.

Menu group **Modo**: **Estudiar** / **Test**. Card kickers: EN `STUDY` / `TEST`; FR `ÉTUDE` / `TEST`.

Wrong and right colors are independent of category accent: correct `#7ED9A8`, incorrect `#FF8B78` (same family as polar affirmative / negative).

`aria-live` announces the outcome once after lock (“correcta” / “incorrecta”). Each choice is a `button` with `aria-pressed` after lock.

## Architecture

```
filterEntries (existing)
  → buildQuizQueue(pool)
  → buildQuizItem(pool, prompt, direction, random)
    → QuizCard (presentational)
```

`useVocabulary` (or a thin wrapper) keeps index, order, and settings. It does not hardcode choice copy.

`CardRenderer` stays the study renderer. Test does not add a third vocabulary card type; `QuizCard` is mode-only.

## Out of scope

Typed answers. Audio identification. Mixing polar yes/no into the choice buttons. Scoreboards. SRS scheduling. A separate quiz dataset. More than four choices.
