# Testing specification

Runner: Vitest. DOM: Testing Library + jsdom.

## Required coverage

| Area                    | Assertion                                                                 |
| ----------------------- | ------------------------------------------------------------------------- |
| Category filtering      | `verbs` returns only `VerbItem`; `all` returns every entry; polar filters return 600 each; `phrases` returns trios and excludes tech, conversation, and school; `techPhrases` and `openPhrases` return Q→A pairs; `schoolNotices` returns circulars |
| Phrase sets             | 600 polar set ids across EN/FR (A1–C2: 100 each); 77 tech pairs; 56 conversation pairs; 56 school circulars; each complete; explicit CEFR kept |
| Verb rendering          | Three forms in order INFINITIVE, PAST, PAST PARTICIPLE                    |
| Verb translations       | Each form shows its own Spanish string after reveal                       |
| Next / previous         | Index wraps; reveal resets                                                |
| Random                  | Shuffle bag exhausts the list before refill                               |
| No immediate duplicate  | After refill, first id ≠ last served id when length > 1                   |
| Progress                | `index + 1 / length`; `0 / 0` when empty; updates with category           |
| localStorage            | Round-trip settings/progress; corrupt JSON returns defaults               |
| Keyboard                | Study: ArrowRight, ArrowLeft, R, P, F. Test: 1–4 or A–D choose; R/Space/P no-op |
| Test item               | 2–4 distinct choices, one correct; distractors same category and CEFR; catalog order shuffled; queue is forward + reverse per card; none-of-the-above is always slot `d` and is not always the key |
| Test lock               | Correct → green; wrong → red and correct still green; further clicks ignored |
| Autoplay                | Single interval in study; unmount clears timer; forced off in test |
| Fullscreen fallback     | Missing API does not throw                                                |

## Verb fixtures (must match dataset)

- have → had → had
- go → went → gone
- eat → ate → eaten
- work → worked → worked

## Empty / invalid states

Empty filter, out-of-range index, unknown category, malformed entry: UI stays up and shows a safe empty or fallback card.
