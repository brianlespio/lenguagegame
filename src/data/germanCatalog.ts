import type { VocabularyEntry, VerbItem, VocabularyItem } from "../types/vocabulary";
import { allEntries } from "./englishCatalog";
import { measureParity } from "./parity";
import { isVerbItem } from "../utils/vocabulary";

interface WordGloss {
  kind: "word";
  term: string;
}

interface VerbGloss {
  kind: "verb";
  infinitive: string;
  past: string;
  participle: string;
}

type Gloss = WordGloss | VerbGloss;

const rawModules = import.meta.glob("./german/gloss-*.tsv", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function loadGlosses(): Map<string, Gloss> {
  const glosses = new Map<string, Gloss>();
  for (const raw of Object.values(rawModules)) {
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const parts = trimmed.split("\t");
      const kind = parts[0];
      const id = parts[1]?.trim() ?? "";
      if (!id) continue;
      if (kind === "W" && parts.length >= 3) {
        glosses.set(id, { kind: "word", term: parts.slice(2).join("\t").trim() });
      } else if (kind === "V" && parts.length >= 5) {
        glosses.set(id, {
          kind: "verb",
          infinitive: parts[2]?.trim() ?? "",
          past: parts[3]?.trim() ?? "",
          participle: parts[4]?.trim() ?? "",
        });
      }
    }
  }
  return glosses;
}

function withoutEnglishExample<T extends VocabularyEntry>(entry: T, id: string): T {
  return {
    ...entry,
    id,
    example: undefined,
    exampleTranslation: undefined,
    pronunciation: undefined,
  };
}

function toGerman(entry: VocabularyEntry, gloss: Gloss): VocabularyEntry | null {
  const id = `de-${entry.id}`;
  if (isVerbItem(entry)) {
    if (gloss.kind !== "verb" || !gloss.infinitive || !gloss.past || !gloss.participle) return null;
    const verb: VerbItem = {
      ...withoutEnglishExample(entry, id),
      infinitive: gloss.infinitive,
      past: gloss.past,
      pastParticiple: gloss.participle,
    };
    return verb;
  }
  if (gloss.kind !== "word" || !gloss.term) return null;
  const word: VocabularyItem = {
    ...withoutEnglishExample(entry, id),
    term: gloss.term,
  };
  return word;
}

const glosses = loadGlosses();
const mapped: VocabularyEntry[] = allEntries.flatMap((entry) => {
  const gloss = glosses.get(entry.id);
  if (!gloss) return [];
  const next = toGerman(entry, gloss);
  return next ? [next] : [];
});

/** Publish every mapped gloss so the bank can be reviewed while phase 34 finishes the 89 % floors. */
export const germanEntries: VocabularyEntry[] = mapped;

/** True once the 89 % parity contract is met (menu may open earlier for review). */
export const germanMeetsParity = measureParity(mapped).meetsParity;
