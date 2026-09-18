import type {
  CategoryFilter,
  CefrFilter,
  LanguagePairId,
  PhraseCategory,
  PolarPhraseCategory,
  StudyMode,
  StudyScope,
  TechPhraseCategory,
  OpenPhraseCategory,
  SchoolPhraseCategory,
  VerbItem,
  VocabularyEntry,
  VocabularyItem,
} from "../types/vocabulary";
import {
  CATEGORY_FILTERS,
  CEFR_FILTERS,
  CEFR_LOCK_TAG,
  LANGUAGE_PAIRS,
  LOCKED_CEFR_LEVELS,
  PHRASE_CATEGORIES,
  POLAR_PHRASE_CATEGORIES,
  TECH_PHRASE_CATEGORIES,
  OPEN_PHRASE_CATEGORIES,
  SCHOOL_PHRASE_CATEGORIES,
  STUDY_MODES,
} from "../constants";

export function isPhraseCategory(value: string): value is PhraseCategory {
  return (PHRASE_CATEGORIES as readonly string[]).includes(value);
}

export function isPolarPhraseCategory(value: string): value is PolarPhraseCategory {
  return (POLAR_PHRASE_CATEGORIES as readonly string[]).includes(value);
}

export function isTechPhraseCategory(value: string): value is TechPhraseCategory {
  return (TECH_PHRASE_CATEGORIES as readonly string[]).includes(value);
}

export function isOpenPhraseCategory(value: string): value is OpenPhraseCategory {
  return (OPEN_PHRASE_CATEGORIES as readonly string[]).includes(value);
}

export function isSchoolPhraseCategory(value: string): value is SchoolPhraseCategory {
  return (SCHOOL_PHRASE_CATEGORIES as readonly string[]).includes(value);
}

export function isSetStudyCategory(category: CategoryFilter): boolean {
  return category === "phrases" || category === "techPhrases" || category === "openPhrases";
}

const PHRASE_ROLE_ORDER: Record<PhraseCategory, number> = {
  questions: 0,
  positiveAnswers: 1,
  negativeAnswers: 2,
  techQuestions: 0,
  techAnswers: 1,
  openQuestions: 0,
  openAnswers: 1,
  schoolNotices: 0,
};

const SET_ID_FROM_ENTRY_ID = /(?:^|-)(?:tech-|open-)?(?:question|positive|negative|answer)-(.+)$/;

export function phraseSetIdFromParts(id: string, tags?: readonly string[]): string | undefined {
  const tagged = tags?.find((tag) => tag.startsWith("set:"));
  if (tagged) return tagged.slice(4);
  return id.match(SET_ID_FROM_ENTRY_ID)?.[1];
}

export function phraseSetId(entry: VocabularyEntry): string | undefined {
  return phraseSetIdFromParts(entry.id, entry.tags);
}

function sortPhraseTrio(a: VocabularyEntry, b: VocabularyEntry): number {
  const roleA = isPhraseCategory(a.category) ? PHRASE_ROLE_ORDER[a.category] : 9;
  const roleB = isPhraseCategory(b.category) ? PHRASE_ROLE_ORDER[b.category] : 9;
  return roleA - roleB;
}

export function orderPhraseTrios(entries: readonly VocabularyEntry[]): VocabularyEntry[] {
  const groups = new Map<string, VocabularyEntry[]>();
  const order: string[] = [];
  const leftovers: VocabularyEntry[] = [];
  for (const entry of entries) {
    const setId = phraseSetId(entry);
    if (!setId) {
      leftovers.push(entry);
      continue;
    }
    const list = groups.get(setId);
    if (list) {
      list.push(entry);
    } else {
      groups.set(setId, [entry]);
      order.push(setId);
    }
  }
  return [...order.flatMap((id) => (groups.get(id) ?? []).slice().sort(sortPhraseTrio)), ...leftovers];
}

export function isVerbItem(entry: VocabularyEntry): entry is VerbItem {
  return entry.category === "verbs";
}

export function isVocabularyItem(entry: VocabularyEntry): entry is VocabularyItem {
  return entry.category !== "verbs";
}

export function isCategoryFilter(value: unknown): value is CategoryFilter {
  return typeof value === "string" && (CATEGORY_FILTERS as readonly string[]).includes(value);
}

export function isLanguagePairId(value: unknown): value is LanguagePairId {
  return typeof value === "string" && LANGUAGE_PAIRS.some((pair) => pair.id === value);
}

export function isCefrFilter(value: unknown): value is CefrFilter {
  return typeof value === "string" && (CEFR_FILTERS as readonly string[]).includes(value);
}

export function isStudyMode(value: unknown): value is StudyMode {
  return typeof value === "string" && (STUDY_MODES as readonly string[]).includes(value);
}

export function entryCefrLevel(entry: VocabularyEntry): Exclude<CefrFilter, "all"> {
  return entry.difficulty ?? "A1";
}

export function isStudyScope(value: unknown): value is StudyScope {
  return value === "all-random" || isCategoryFilter(value);
}

export function toStudyScope(category: CategoryFilter, randomMode: boolean): StudyScope {
  if (category === "all" && randomMode) return "all-random";
  return category;
}

export function fromStudyScope(scope: StudyScope): { category: CategoryFilter; randomMode: boolean } {
  if (scope === "all-random") return { category: "all", randomMode: true };
  return { category: scope, randomMode: false };
}

export function filterEntries(
  entries: readonly VocabularyEntry[],
  category: CategoryFilter,
  cefrLevel: CefrFilter = "all",
): VocabularyEntry[] {
  const matched = entries.filter((entry) => {
    if (category === "phrases") {
      if (!isPolarPhraseCategory(entry.category)) return false;
    } else if (category === "techPhrases") {
      if (!isTechPhraseCategory(entry.category)) return false;
    } else if (category === "openPhrases") {
      if (!isOpenPhraseCategory(entry.category)) return false;
    } else if (category === "schoolNotices") {
      if (!isSchoolPhraseCategory(entry.category)) return false;
    } else if (category !== "all" && entry.category !== category) {
      return false;
    }
    if (cefrLevel !== "all" && entryCefrLevel(entry) !== cefrLevel) return false;
    if (
      cefrLevel !== "all" &&
      (LOCKED_CEFR_LEVELS as readonly string[]).includes(cefrLevel) &&
      !isPhraseCategory(entry.category) &&
      !entry.tags?.includes(CEFR_LOCK_TAG)
    ) {
      return false;
    }
    return true;
  });
  return isSetStudyCategory(category) ? orderPhraseTrios(matched) : matched;
}

export function clampIndex(index: number, length: number): number {
  if (length <= 0 || !Number.isFinite(index)) return 0;
  return ((Math.trunc(index) % length) + length) % length;
}

export function getProgress(index: number, total: number): { current: number; total: number } {
  if (total <= 0) return { current: 0, total: 0 };
  return { current: clampIndex(index, total) + 1, total };
}

export function findIndexById(entries: readonly VocabularyEntry[], id: string | undefined): number {
  if (!id) return 0;
  const index = entries.findIndex((entry) => entry.id === id);
  return index >= 0 ? index : 0;
}

export function progressSlot(
  pair: LanguagePairId,
  category: CategoryFilter,
  cefrLevel: CefrFilter = "all",
): string {
  return `${pair}:${category}:${cefrLevel}`;
}

export function getEntryLabel(entry: VocabularyEntry): string {
  return isVerbItem(entry) ? entry.infinitive : entry.term;
}
