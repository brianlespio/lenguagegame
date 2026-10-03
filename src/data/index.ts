import type { LanguagePairId, VocabularyEntry } from "../types/vocabulary";
import { allEntries } from "./englishCatalog";
import { frenchEntries } from "./frenchCatalog";
import { catalanEntries } from "./catalanCatalog";
import { basqueEntries } from "./basqueCatalog";
import { germanEntries } from "./germanCatalog";

export const EMPTY_CATALOG: VocabularyEntry[] = [];
export { allEntries } from "./englishCatalog";
export { frenchEntries } from "./frenchCatalog";
export { catalanEntries } from "./catalanCatalog";
export { basqueEntries } from "./basqueCatalog";
export { germanEntries } from "./germanCatalog";

export function getCatalog(languagePair: LanguagePairId): VocabularyEntry[] {
  if (languagePair === "fr-es") return frenchEntries;
  if (languagePair === "ca-es") return catalanEntries;
  if (languagePair === "eu-es") return basqueEntries;
  if (languagePair === "de-es") return germanEntries;
  if (languagePair === "en-es") return allEntries;
  return EMPTY_CATALOG;
}
