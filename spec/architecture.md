# Architecture

## Stack

- React 19 + TypeScript (strict)
- Vite
- Tailwind CSS v4 via `@tailwindcss/vite`
- Vitest + Testing Library + jsdom

No routing, state library, or UI kit. Application state lives in dedicated hooks.

## Layers

```
data (static datasets)
  → utils (filter, shuffle, storage, guards)
    → hooks (learning session, keyboard, autoplay, fullscreen)
      → presentational components (cards, controls)
        → App (composition only)
```

Cards never own navigation, persistence, timers, or the dataset.

## Source layout

```
src/
  app/App.tsx
  components/   presentational UI
  hooks/        session and browser APIs
  data/         vocabulary and verbs
  types/        domain models
  utils/        pure functions and storage
  styles/       global CSS / theme
  test/         test setup
```

## Architectural decisions

### 1. Discriminated union instead of a single card model

`VocabularyEntry = VocabularyItem | VerbItem`. Rendering is a type-narrowed dispatcher (`CardRenderer`). Navigation operates on `VocabularyEntry[]` and does not care which card is shown.

### 2. Two-phase autoplay

`Space` reveals. `P` toggles autoplay. On each autoplay tick:

- if translations are hidden → reveal
- if translations are visible → advance and hide

This implements English → Spanish without colliding with reveal, and uses a single interval.

### 3. Shuffle bag for random mode

A shuffled copy of the filtered list is consumed to the end, then regenerated. The first item of a new bag is swapped if it matches the last served id.

Previous in random mode walks the current bag (wraps within the cycle).

### 4. Persistence split

- `saveSettings` / `loadSettings` — category, interval, random mode
- `saveProgress` / `loadProgress` — last entry id per category, plus an empty `LearningProgress` map for future SRS

Corrupt JSON, missing keys, and incompatible versions fall back to defaults. Nothing throws into the UI.

### 5. Last position by entry id

Index-only persistence breaks when the dataset grows. Progress stores the last seen `id` per category and resolves it against the current filtered list.

### 7. Language pair is a first-class setting

The dataset is keyed by `LanguagePairId` (`en-es` today, `fr-es` reserved). Cards keep reading the current catalog through `getCatalog(pair)`. French is listed in the language menu as unavailable until a dataset exists. No French copy is invented.

### 8. Two collapsible menus, top-right

Category (including **Todo aleatorio**), CEFR, language, and **Modo** (Estudiar / Test) live in always-visible fold-out menus. Random is a study-scope option, not a second toolbar chip. Everyday polar sits under **Frases**; tech pairs under **Trabajo técnico**; open conversation under **Conversación**; school circulars under **Trabajo escolar**.

### 9. Phrase categories reuse VocabularyItem

Questions and answers are `VocabularyItem` rows. `CardRenderer` does not grow a third card type. `tagCefrByFrequency` leaves phrase `difficulty` untouched. `phrases` keeps polar trios; `techPhrases` and `openPhrases` keep Q→A pairs; `schoolNotices` keeps circulars. Random shuffles sets, not cards.

### 10. Test mode reuses the study filter

Spec: `quiz-spec.md`. `buildQuizItem` is pure. `QuizCard` is presentational and only mounts when `studyMode === "test"`. Queue is **2N** prompts (forward + reverse). Up to four choices from the same category + CEFR pool. Slot `d` is sometimes none-of-the-above (key or trap). Polar yes/no is never the buttons.

### 11. Fullscreen fallback

If `requestFullscreen` is missing or rejects, the UI expands to the visual viewport and hides chrome. The app must not crash.

## Lifecycle rules

- One keyboard listener, removed on unmount
- One autoplay interval, recreated only when enabled/interval changes, cleared on unmount
- Filtered list is memoized on dataset + category
