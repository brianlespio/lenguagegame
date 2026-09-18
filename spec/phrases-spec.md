# Phrase categories

Four families, never mixed in the same study list:

1. **Everyday polar** — yes/no question plus both replies.
2. **Technical work** — IT / interview question plus **one model answer**. Not yes/no.
3. **Conversation** — everyday open question (*What's your name?*) plus **one model answer**. Not yes/no. Not tech.
4. **School work** — teacher / school circulars to families. Statements, not yes/no, not tech, not everyday chat.

A set is invalid if the question has no matching answer card. New material is added only as complete sets. No duplicate communicative sets across families.

## Everyday polar

| Id                 | Menu (ES)              | Card kicker EN | Card kicker FR |
| ------------------ | ---------------------- | -------------- | -------------- |
| `questions`        | Preguntas              | QUESTIONS      | QUESTIONS      |
| `positiveAnswers`  | Respuestas positivas   | AFFIRMATIVE    | AFFIRMATIF     |
| `negativeAnswers`  | Respuestas negativas   | NEGATIVE       | NÉGATIF        |

Filter `phrases` (**Frase completa**): question → positive → negative.

600 polar sets. CEFR by function (A1 100 · A2 100 · B1 100 · B2 100 · C1 100 · C2 100). C2 is the hardest band.

## Technical work

| Id              | Menu (ES)        | Card kicker EN | Card kicker FR |
| --------------- | ---------------- | -------------- | -------------- |
| `techQuestions` | Preguntas        | QUESTION       | QUESTION       |
| `techAnswers`   | Respuestas       | ANSWER         | RÉPONSE        |

Filter `techPhrases` (**Frase completa** under **Trabajo técnico**): question → model answer.

**77** complete pairs. French workplace register: *vous*. C2 is the hardest band (distributed systems). C1 covers JWT, CORS, SQL injection, technical debt and similar. Tech has no A1; empty bands widen to `all`.

## Conversation

| Id              | Menu (ES)        | Card kicker EN | Card kicker FR |
| --------------- | ---------------- | -------------- | -------------- |
| `openQuestions` | Preguntas        | ASK            | QUESTION       |
| `openAnswers`   | Respuestas       | REPLY          | RÉPONSE        |

Filter `openPhrases` (**Frase completa** under **Conversación**): question → model answer.

Does **not** appear inside everyday polar or tech filters.

**56** complete pairs. Personal *tu*; service / stranger *vous*. Answers are first-person models the learner can reuse. B2 covers stance and catch-up; C2 is the hardest band (hedging, concession, grounds).

## School work

| Id               | Menu (ES) | Card kicker EN | Card kicker FR |
| ---------------- | --------- | -------------- | -------------- |
| `schoolNotices`  | Avisos    | NOTICE         | AVIS           |

Menu group **Trabajo escolar**. Each card is one circular sentence. Does **not** appear inside polar, tech, or conversation filters.

**56** notices. French register: *vous* to families (`votre enfant`, `nous vous rappelons`). CEFR A1 12 · A2 16 · B1 12 · B2 4 · C1 4 · C2 8. C2 is the hardest band (discipline, RGPD, inspection).

## Card

Same `VocabularyItem` path. TTS speaks `term` at `TTS_PHRASE_RATE`. `data-kind="phrase"`.

## Identity

- Polar: `question-{setId}`, `positive-{setId}`, `negative-{setId}`
- Tech: `tech-question-{setId}`, `tech-answer-{setId}`
- Open: `open-question-{setId}`, `open-answer-{setId}`
- School: `school-{setId}`
- French: `fr-` prefix
- Polar tags: `set:{setId}`
- Tech tags: `set:{setId}`, `domain:tech`
- Open tags: `set:{setId}`, `kind:open`
- School tags: `set:{setId}`, `domain:school`

## Source of truth

`src/data/phraseSets.ts` plus `src/data/phraseSetsPolarC1.ts`, `src/data/phraseSetsPolarB2.ts`, `src/data/phraseSetsPolarB1.ts`, `src/data/phraseSetsPolarA2.ts`, `src/data/phraseSetsPolarA1.ts`, `src/data/phraseSetsPolarC2.ts`, `src/data/phraseSetsTechC2.ts`, `src/data/phraseSetsOpenC2.ts` and `src/data/phraseSetsSchool.ts` — `phraseSets`, `techPhraseSets`, `openPhraseSets`, `schoolNoticeSets`. Components never hardcode phrases.

## Out of scope

Quiz as polar yes/no buttons. SRS. Stuffing open *wh-* into polar yes/no. Stuffing conversation into tech. Stuffing school circulars into polar, tech, or conversation. Growing nouns/adjectives as a separate catalog wave.
