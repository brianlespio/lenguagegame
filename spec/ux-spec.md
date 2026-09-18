# UX specification

## Layout

The study surface uses the full visual viewport. The card is centered on both axes. Controls are secondary and may hide after a few seconds of inactivity. A compact autoplay badge stays visible while playing in study mode. It is not shown in test.

## Visual language

- Dark high-contrast study surface (TV / projector friendly)
- Large fluid type (`clamp`)
- Generous negative space
- One accent color per category (word classes plus polar, tech, conversation, and school phrase categories)
- Phrase cards use sentence type (`data-kind="phrase"`): fluid size near the verb scale, `line-height` ≈ 1.15
- Category menu: word classes first; then **Frases**; then **Trabajo técnico**; then **Conversación**; then **Trabajo escolar**
- Mode menu: **Estudiar** / **Test** (`quiz-spec.md`)
- No dashboard chrome, tables, or dense toolbars

## Verb layout

- Desktop (`md+`): three equal columns
- Narrow viewports: one stacked column (label → English → Spanish per form)
- No horizontal overflow; long words wrap

Translations occupy layout space while hidden (`visibility`) so reveal does not jump the card.

## Keyboard

| Key           | Action                                      |
| ------------- | ------------------------------------------- |
| ArrowRight    | Next                                        |
| ArrowLeft     | Previous                                    |
| R             | Reveal (study only)                         |
| Space         | Reveal in study (ignored when focus is on a control); no-op in test |
| P             | Play / pause autoplay (study only)          |
| F             | Fullscreen                                  |
| 1 / A         | Choice A (test only)                        |
| 2 / B         | Choice B (test only)                        |
| 3 / C         | Choice C (test only, if present)            |
| 4 / D         | Choice D (test only, if present)            |

## Autoplay

Intervals: 3s, 5s, 10s, 15s, 30s.

Tick: reveal if hidden, otherwise next + hide. `prefers-reduced-motion: reduce` disables card transitions; autoplay still advances.

## Controls

Primary (study): Previous, Reveal, Next  
Primary (test): Previous, two to four answer buttons, Next  
Secondary: Category, Level, Language, Mode, Auto Play (study), Interval (study), Random, Speak, Fullscreen

## Accessibility

- Semantic `main`, `header`, `footer`, `article`, `button`
- `aria-label` on icon-only and shorthand controls
- Visible `:focus-visible` rings
- `aria-live` polite region for the current card (and the test lock outcome)
- Contrast above WCAG AA on the study surface
- `prefers-reduced-motion` respected
