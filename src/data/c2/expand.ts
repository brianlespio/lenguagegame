import { CEFR_LOCK_TAG } from "../../constants";
import type { StandardCategory, StudyCefrLevel, VerbItem, VocabularyItem } from "../../types/vocabulary";
import { slugify } from "../slug";

export type C2WordTuple = readonly [term: string, translation: string];
export type C2VerbTuple = readonly [
  infinitive: string,
  past: string,
  pastParticiple: string,
  infinitiveTranslation: string,
  pastTranslation: string,
  pastParticipleTranslation: string,
  tag: string,
];

function categoryPrefix(category: StandardCategory): string {
  return category.replace(/s$/, "");
}

export function expandLockedWords(
  language: "en" | "fr",
  category: Exclude<StandardCategory, import("../../types/vocabulary").PhraseCategory>,
  rows: readonly C2WordTuple[],
  takenIds: ReadonlySet<string>,
  difficulty: StudyCefrLevel,
): VocabularyItem[] {
  const prefix = language === "fr" ? "fr-" : "";
  const items: VocabularyItem[] = [];
  const seen = new Set<string>();
  for (const [term, translation] of rows) {
    const id = `${prefix}${categoryPrefix(category)}-${slugify(term)}`;
    const key = `${id}|${term.toLowerCase()}`;
    if (takenIds.has(id) || seen.has(id) || seen.has(key) || !term.trim() || !translation.trim()) continue;
    seen.add(id);
    seen.add(key);
    items.push({
      id,
      category,
      term,
      translation,
      difficulty,
      tags: [CEFR_LOCK_TAG],
    });
  }
  return items;
}

export function expandC2Words(
  language: "en" | "fr",
  category: Exclude<StandardCategory, import("../../types/vocabulary").PhraseCategory>,
  rows: readonly C2WordTuple[],
  takenIds: ReadonlySet<string>,
): VocabularyItem[] {
  return expandLockedWords(language, category, rows, takenIds, "C2");
}

export function expandLockedVerbs(
  language: "en" | "fr",
  rows: readonly C2VerbTuple[],
  takenIds: ReadonlySet<string>,
  difficulty: StudyCefrLevel,
): VerbItem[] {
  const items: VerbItem[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const [infinitive, past, pastParticiple, infinitiveTranslation, pastTranslation, pastParticipleTranslation, tag] =
      row;
    const id = language === "fr" ? `fr-verb-${slugify(infinitive)}` : `verb-${infinitive}`;
    if (takenIds.has(id) || seen.has(id) || !infinitive.trim()) continue;
    seen.add(id);
    items.push({
      id,
      category: "verbs",
      infinitive,
      past,
      pastParticiple,
      infinitiveTranslation,
      pastTranslation,
      pastParticipleTranslation,
      difficulty,
      tags: [CEFR_LOCK_TAG, tag],
    });
  }
  return items;
}

export function expandC2Verbs(
  language: "en" | "fr",
  rows: readonly C2VerbTuple[],
  takenIds: ReadonlySet<string>,
): VerbItem[] {
  return expandLockedVerbs(language, rows, takenIds, "C2");
}
