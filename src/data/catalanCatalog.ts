import type { VocabularyEntry } from "../types/vocabulary";
import { tagCefrByFrequency } from "./cefr";
import { catalanPhrases } from "./catalanPhrases";
import { catalanPhrasesMore } from "./catalanPhrasesMore";
import { extraCatalanPhrasesParity } from "./catalanPhrasesParity";
import { catalanVerbs } from "./catalanVerbs";
import { catalanVerbsMore } from "./catalanVerbsMore";
import { extraCatalanVerbsParity } from "./catalanVerbsParity";
import { catalanVocabulary } from "./catalanVocabulary";
import { catalanVocabularyMore } from "./catalanVocabularyMore";
import { extraCatalanVocabularyParity } from "./catalanVocabularyParity";

export const catalanEntries: VocabularyEntry[] = tagCefrByFrequency([
  ...catalanVocabulary,
  ...catalanVocabularyMore,
  ...extraCatalanVocabularyParity,
  ...catalanVerbs,
  ...catalanVerbsMore,
  ...extraCatalanVerbsParity,
  ...catalanPhrases,
  ...catalanPhrasesMore,
  ...extraCatalanPhrasesParity,
]);
