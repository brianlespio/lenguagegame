import type { LanguagePairId, VocabularyEntry } from "../types/vocabulary";
import { allEntries } from "./englishCatalog";
import { frenchEntries } from "./frenchCatalog";

export const EMPTY_CATALOG: VocabularyEntry[] = [];
export { allEntries } from "./englishCatalog";
export { frenchEntries } from "./frenchCatalog";

export function getCatalog(languagePair: LanguagePairId): VocabularyEntry[] {
  if (languagePair === "fr-es") return frenchEntries;
  if (languagePair === "en-es") return allEntries;
  return EMPTY_CATALOG;
}
