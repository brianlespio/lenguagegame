import type { VocabularyEntry } from "../types/vocabulary";
import { tagCefrByFrequency } from "./cefr";
import { catalanPhrases } from "./catalanPhrases";
import { catalanPhrasesMore } from "./catalanPhrasesMore";
import { catalanVerbs } from "./catalanVerbs";
import { catalanVerbsMore } from "./catalanVerbsMore";
import { catalanVocabulary } from "./catalanVocabulary";
import { catalanVocabularyMore } from "./catalanVocabularyMore";

export const catalanEntries: VocabularyEntry[] = tagCefrByFrequency([
  ...catalanVocabulary,
  ...catalanVocabularyMore,
  ...catalanVerbs,
  ...catalanVerbsMore,
  ...catalanPhrases,
  ...catalanPhrasesMore,
]);
