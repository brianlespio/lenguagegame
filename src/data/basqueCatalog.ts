import type { VocabularyEntry } from "../types/vocabulary";
import { tagCefrByFrequency } from "./cefr";
import { basquePhrases } from "./basquePhrases";
import { basquePhrasesMore } from "./basquePhrasesMore";
import { extraBasquePhrasesParity } from "./basquePhrasesParity";
import { basqueVerbs } from "./basqueVerbs";
import { basqueVerbsMore } from "./basqueVerbsMore";
import { extraBasqueVerbsParity } from "./basqueVerbsParity";
import { basqueVocabulary } from "./basqueVocabulary";
import { basqueVocabularyMore } from "./basqueVocabularyMore";
import { extraBasqueVocabularyParity } from "./basqueVocabularyParity";

export const basqueEntries: VocabularyEntry[] = tagCefrByFrequency([
  ...basqueVocabulary,
  ...basqueVocabularyMore,
  ...extraBasqueVocabularyParity,
  ...basqueVerbs,
  ...basqueVerbsMore,
  ...extraBasqueVerbsParity,
  ...basquePhrases,
  ...basquePhrasesMore,
  ...extraBasquePhrasesParity,
]);
