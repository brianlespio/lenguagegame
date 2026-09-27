import type { VocabularyEntry } from "../types/vocabulary";
import { tagCefrByFrequency } from "./cefr";
import { frenchVocabulary } from "./frenchVocabulary";
import { frenchVerbs } from "./frenchVerbs";

export const frenchEntries: VocabularyEntry[] = tagCefrByFrequency([
  ...frenchVocabulary,
  ...frenchVerbs,
]);
