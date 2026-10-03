import type { LanguagePairId, VocabularyEntry } from "../types/vocabulary";
import { allEntries } from "./englishCatalog";
import { frenchEntries } from "./frenchCatalog";
import { catalanEntries } from "./catalanCatalog";

export const EMPTY_CATALOG: VocabularyEntry[] = [];
export { allEntries } from "./englishCatalog";
export { frenchEntries } from "./frenchCatalog";
export { catalanEntries } from "./catalanCatalog";

export function getCatalog(languagePair: LanguagePairId): VocabularyEntry[] {
  if (languagePair === "fr-es") return frenchEntries;
  if (languagePair === "ca-es") return catalanEntries;
  if (languagePair === "en-es") return allEntries;
  return EMPTY_CATALOG;
}
