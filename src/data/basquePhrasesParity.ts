import type { VocabularyItem } from "../types/vocabulary";
import { basquePhrasesParityOpen } from "./basquePhrasesParityOpen";
import { basquePhrasesParityPolar } from "./basquePhrasesParityPolar";
import { basquePhrasesParitySchool } from "./basquePhrasesParitySchool";
import { basquePhrasesParityTech } from "./basquePhrasesParityTech";

/** Phase 36 — phrases from shared phraseSets (ES/FR → EU). */
export const extraBasquePhrasesParity: VocabularyItem[] = [
  ...basquePhrasesParityPolar,
  ...basquePhrasesParityTech,
  ...basquePhrasesParityOpen,
  ...basquePhrasesParitySchool,
];
