import type { VocabularyEntry } from "../types/vocabulary";
import { tagCefrByFrequency } from "./cefr";
import { vocabulary } from "./vocabulary";
import { verbs } from "./verbs";

export const allEntries: VocabularyEntry[] = tagCefrByFrequency([...vocabulary, ...verbs]);
