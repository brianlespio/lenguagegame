import type { VocabularyEntry } from "../types/vocabulary";
import { tagCefrByFrequency } from "./cefr";
import { basquePhrases } from "./basquePhrases";
import { basquePhrasesMore } from "./basquePhrasesMore";
import { basqueVerbs } from "./basqueVerbs";
import { basqueVerbsMore } from "./basqueVerbsMore";
import { basqueVocabulary } from "./basqueVocabulary";
import { basqueVocabularyMore } from "./basqueVocabularyMore";

export const basqueEntries: VocabularyEntry[] = tagCefrByFrequency([
  ...basqueVocabulary,
  ...basqueVocabularyMore,
  ...basqueVerbs,
  ...basqueVerbsMore,
  ...basquePhrases,
  ...basquePhrasesMore,
]);
