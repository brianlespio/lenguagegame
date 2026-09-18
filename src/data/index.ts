import type { LanguagePairId, VocabularyEntry } from "../types/vocabulary";
import { tagCefrByFrequency } from "./cefr";
import { frenchVocabulary } from "./frenchVocabulary";
import { frenchVerbs } from "./frenchVerbs";
import { vocabulary } from "./vocabulary";
import { verbs } from "./verbs";

export const EMPTY_CATALOG: VocabularyEntry[] = [];

export const allEntries: VocabularyEntry[] = tagCefrByFrequency([...vocabulary, ...verbs]);

export const frenchEntries: VocabularyEntry[] = tagCefrByFrequency([
  ...frenchVocabulary,
  ...frenchVerbs,
]);

export function getCatalog(languagePair: LanguagePairId): VocabularyEntry[] {
  if (languagePair === "fr-es") return frenchEntries;
  if (languagePair === "en-es") return allEntries;
  return EMPTY_CATALOG;
}
