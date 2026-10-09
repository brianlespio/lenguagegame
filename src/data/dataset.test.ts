import { describe, expect, it } from "vitest";
import { verbs } from "./verbs";
import { vocabulary } from "./vocabulary";
import { frenchVerbs } from "./frenchVerbs";
import { frenchVocabulary } from "./frenchVocabulary";
import { allEntries, basqueEntries, catalanEntries, frenchEntries, germanEntries, getCatalog } from "./index";
import { measureParity } from "./parity";
import { phraseSets, PHRASE_SET_COUNT, techPhraseSets, TECH_PHRASE_SET_COUNT, openPhraseSets, OPEN_PHRASE_SET_COUNT, schoolNoticeSets, SCHOOL_NOTICE_COUNT } from "./phraseSets";
import { STUDY_CEFR_LEVELS } from "../constants";
import { filterEntries, isVerbItem, isVocabularyItem } from "../utils/vocabulary";

function getVerb(infinitive: string) {
  const match = verbs.find((verb) => verb.infinitive === infinitive);
  if (!match) throw new Error(`Missing verb: ${infinitive}`);
  return match;
}

function getFrenchVerb(infinitive: string) {
  const match = frenchVerbs.find((verb) => verb.infinitive === infinitive);
  if (!match) throw new Error(`Missing French verb: ${infinitive}`);
  return match;
}

function countByCategory(entries: { category: string }[], category: string) {
  return entries.filter((entry) => entry.category === category).length;
}

describe("English dataset", () => {
  it("keeps the original core bands and adds the C2 banks on top", () => {
    expect(verbs.length).toBeGreaterThanOrEqual(500);
    expect(countByCategory(vocabulary, "nouns")).toBeGreaterThanOrEqual(600);
    expect(countByCategory(vocabulary, "adjectives")).toBeGreaterThanOrEqual(450);
    expect(countByCategory(vocabulary, "adverbs")).toBeGreaterThanOrEqual(320);
    expect(countByCategory(vocabulary, "connectors")).toBeGreaterThanOrEqual(300);
    expect(countByCategory(vocabulary, "prepositions")).toBeGreaterThanOrEqual(250);
    expect(countByCategory(vocabulary, "pronouns")).toBeGreaterThanOrEqual(240);
    expect(countByCategory(vocabulary, "questions")).toBe(PHRASE_SET_COUNT);
    expect(countByCategory(vocabulary, "positiveAnswers")).toBe(PHRASE_SET_COUNT);
    expect(countByCategory(vocabulary, "negativeAnswers")).toBe(PHRASE_SET_COUNT);
    expect(countByCategory(vocabulary, "techQuestions")).toBe(TECH_PHRASE_SET_COUNT);
    expect(countByCategory(vocabulary, "techAnswers")).toBe(TECH_PHRASE_SET_COUNT);
    expect(countByCategory(vocabulary, "openQuestions")).toBe(OPEN_PHRASE_SET_COUNT);
    expect(countByCategory(vocabulary, "openAnswers")).toBe(OPEN_PHRASE_SET_COUNT);
    expect(countByCategory(vocabulary, "schoolNotices")).toBe(SCHOOL_NOTICE_COUNT);
    expect(allEntries.length).toBeGreaterThan(3382);
  });

  it("uses unique ids and infinitives", () => {
    const ids = allEntries.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    const infinitives = verbs.map((verb) => verb.infinitive);
    expect(new Set(infinitives).size).toBe(infinitives.length);
  });
});

describe("French dataset", () => {
  it("matches the English category levels", () => {
    expect(frenchVerbs.length).toBeGreaterThanOrEqual(500);
    expect(countByCategory(frenchVocabulary, "nouns")).toBeGreaterThanOrEqual(600);
    expect(countByCategory(frenchVocabulary, "adjectives")).toBeGreaterThanOrEqual(450);
    expect(countByCategory(frenchVocabulary, "adverbs")).toBeGreaterThanOrEqual(320);
    expect(countByCategory(frenchVocabulary, "connectors")).toBeGreaterThanOrEqual(300);
    expect(countByCategory(frenchVocabulary, "prepositions")).toBeGreaterThanOrEqual(250);
    expect(countByCategory(frenchVocabulary, "pronouns")).toBeGreaterThanOrEqual(240);
    expect(countByCategory(frenchVocabulary, "questions")).toBe(PHRASE_SET_COUNT);
    expect(countByCategory(frenchVocabulary, "positiveAnswers")).toBe(PHRASE_SET_COUNT);
    expect(countByCategory(frenchVocabulary, "negativeAnswers")).toBe(PHRASE_SET_COUNT);
    expect(countByCategory(frenchVocabulary, "techQuestions")).toBe(TECH_PHRASE_SET_COUNT);
    expect(countByCategory(frenchVocabulary, "techAnswers")).toBe(TECH_PHRASE_SET_COUNT);
    expect(countByCategory(frenchVocabulary, "openQuestions")).toBe(OPEN_PHRASE_SET_COUNT);
    expect(countByCategory(frenchVocabulary, "openAnswers")).toBe(OPEN_PHRASE_SET_COUNT);
    expect(countByCategory(frenchVocabulary, "schoolNotices")).toBe(SCHOOL_NOTICE_COUNT);
    expect(frenchEntries.length).toBeGreaterThan(3382);
  });

  it("uses unique ids prefixed for French", () => {
    const ids = frenchEntries.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.startsWith("fr-"))).toBe(true);
    const infinitives = frenchVerbs.map((verb) => verb.infinitive);
    expect(new Set(infinitives).size).toBe(infinitives.length);
  });

  it("is returned by getCatalog for fr-es", () => {
    expect(getCatalog("fr-es")).toHaveLength(frenchEntries.length);
    expect(getCatalog("en-es")).toHaveLength(allEntries.length);
    expect(getCatalog("ca-es")).toHaveLength(catalanEntries.length);
    expect(getCatalog("eu-es")).toHaveLength(basqueEntries.length);
    expect(getCatalog("de-es")).toHaveLength(germanEntries.length);
  });

  it("assigns every CEFR study band", () => {
    for (const catalog of [allEntries, frenchEntries, catalanEntries, basqueEntries]) {
      for (const level of STUDY_CEFR_LEVELS) {
        expect(catalog.some((entry) => entry.difficulty === level)).toBe(true);
      }
    }
  });
});

describe("Catalan dataset", () => {
  it("ships a playable CA→ES catalog with unique ids", () => {
    expect(catalanEntries.length).toBeGreaterThan(900);
    const ids = catalanEntries.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.startsWith("ca-"))).toBe(true);
    expect(countByCategory(catalanEntries, "nouns")).toBeGreaterThan(180);
    expect(countByCategory(catalanEntries, "verbs")).toBeGreaterThan(180);
    expect(countByCategory(catalanEntries, "adjectives")).toBeGreaterThan(70);
    expect(countByCategory(catalanEntries, "questions")).toBeGreaterThan(50);
    expect(countByCategory(catalanEntries, "openQuestions")).toBeGreaterThan(20);
    expect(countByCategory(catalanEntries, "techQuestions")).toBeGreaterThan(10);
    expect(countByCategory(catalanEntries, "schoolNotices")).toBeGreaterThan(15);
  });

  it("keeps Catalan verbs in the spoken periphrastic past", () => {
    const verbs = catalanEntries.filter(isVerbItem);
    const infinitives = verbs.map((verb) => verb.infinitive);
    expect(new Set(infinitives).size).toBe(infinitives.length);
    for (const verb of verbs) {
      expect(verb.past, verb.id).toMatch(/\bva\b/);
    }
  });

  it("keeps Catalan phrases spoken, without English or Spanish loans", () => {
    const banned = /\b(nombro|detour|workstream|deliverable|locus|anyway|the|this|that)\b/i;
    const phrases = catalanEntries.filter((entry) => !isVerbItem(entry) && isVocabularyItem(entry));
    for (const entry of phrases) {
      if (
        entry.category === "questions" ||
        entry.category === "positiveAnswers" ||
        entry.category === "negativeAnswers" ||
        entry.category === "openQuestions" ||
        entry.category === "openAnswers"
      ) {
        expect(entry.term, entry.id).not.toMatch(banned);
      }
    }
  });
});

describe("Basque dataset", () => {
  function participleFromDictionary(infinitive: string): string {
    if (infinitive === "hil") return "hilda";
    const parts = infinitive.split(" ");
    const head = parts[parts.length - 1] ?? infinitive;
    const done = head.endsWith("n") ? `${head.slice(0, -1)}nda` : `${head}ta`;
    return [...parts.slice(0, -1), done].join(" ");
  }

  it("keeps unique eu- ids (Basque ≥ Catalan returns in phase 36)", () => {
    // Phase 35 lets Catalan pull ahead of Basque; phase 36 restores EU ≥ CA per category.
    const ids = basqueEntries.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.startsWith("eu-"))).toBe(true);
    expect(basqueEntries.length).toBeGreaterThan(900);
  });

  it("rebuilds the Basque past and participle from the dictionary form", () => {
    const verbs = basqueEntries.filter(isVerbItem);
    const infinitives = verbs.map((verb) => verb.infinitive);
    expect(new Set(infinitives).size).toBe(infinitives.length);
    const dative = new Set(["gustatu", "ahaztu", "kostatu"]);
    for (const verb of verbs) {
      expect(verb.pastParticiple, verb.id).toBe(participleFromDictionary(verb.infinitive));
      if (dative.has(verb.infinitive)) {
        expect(verb.past, verb.id).toBe(`${verb.infinitive} zitzaion`);
      } else if (verb.past.endsWith(" zen")) {
        expect(verb.past, verb.id).toBe(`${verb.infinitive} zen`);
      } else {
        expect(verb.past, verb.id).toBe(`${verb.infinitive} zuen`);
      }
    }
  });
});

describe("German dataset", () => {
  it("publishes mapped German glosses with unique de- ids", () => {
    expect(germanEntries.length).toBeGreaterThan(9000);
    expect(getCatalog("de-es")).toHaveLength(germanEntries.length);
    const ids = germanEntries.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => id.startsWith("de-"))).toBe(true);
  });

  it("meets the 89% parity contract with a full mapped bank", () => {
    const report = measureParity(germanEntries);
    expect(germanEntries.length).toBe(11_618);
    expect(report.haveTotal).toBe(11_618);
    expect(report.needTotal).toBe(10_340);
    expect(report.meetsParity).toBe(true);
  });

  it("keeps German verbs in the spoken perfect", () => {
    const verbs = germanEntries.filter(isVerbItem);
    expect(verbs.length).toBeGreaterThan(900);
    // German may reuse one infinitive for distinct English senses; ids stay unique.
    for (const verb of verbs) {
      expect(verb.past, verb.id).toMatch(/^(hat|ist) /);
      // Separable particles may trail the participle (hat sich gemacht an).
      expect(verb.past.includes(verb.pastParticiple), verb.id).toBe(true);
      expect(verb.infinitive, verb.id).not.toMatch(/\b(the|to)\b/i);
    }
  });
});

describe("verb conjugations", () => {
  it("have → had → had", () => {
    const verb = getVerb("have");
    expect(verb.past).toBe("had");
    expect(verb.pastParticiple).toBe("had");
    expect(verb.infinitiveTranslation).toBe("tener");
    expect(verb.pastTranslation).toBe("tuvo");
    expect(verb.pastParticipleTranslation).toBe("tenido");
  });

  it("go → went → gone", () => {
    const verb = getVerb("go");
    expect(verb.past).toBe("went");
    expect(verb.pastParticiple).toBe("gone");
  });

  it("eat → ate → eaten", () => {
    const verb = getVerb("eat");
    expect(verb.past).toBe("ate");
    expect(verb.pastParticiple).toBe("eaten");
  });

  it("work → worked → worked", () => {
    const verb = getVerb("work");
    expect(verb.past).toBe("worked");
    expect(verb.pastParticiple).toBe("worked");
  });

  it("say → said → said", () => {
    const verb = getVerb("say");
    expect(verb.past).toBe("said");
    expect(verb.pastParticiple).toBe("said");
  });

  it("break → broke → broken", () => {
    const verb = getVerb("break");
    expect(verb.past).toBe("broke");
    expect(verb.pastParticiple).toBe("broken");
  });

  it("does not assume past equals past participle", () => {
    const go = getVerb("go");
    expect(go.past).not.toBe(go.pastParticiple);
  });
});

describe("French verb conjugations", () => {
  it("être → a été → été", () => {
    const verb = getFrenchVerb("être");
    expect(verb.past).toBe("a été");
    expect(verb.pastParticiple).toBe("été");
  });

  it("aller uses être as auxiliary", () => {
    const verb = getFrenchVerb("aller");
    expect(verb.past).toBe("est allé");
    expect(verb.pastParticiple).toBe("allé");
    expect(verb.tags).toContain("auxiliary-etre");
  });

  it("parler is regular with avoir", () => {
    const verb = getFrenchVerb("parler");
    expect(verb.past).toBe("a parlé");
    expect(verb.pastParticiple).toBe("parlé");
    expect(verb.infinitiveTranslation).toBe("hablar");
    expect(verb.pastTranslation).toBe("habló");
    expect(verb.pastParticipleTranslation).toBe("hablado");
  });

  it("créer keeps the double accent in the participle", () => {
    const verb = getFrenchVerb("créer");
    expect(verb.past).toBe("a créé");
    expect(verb.pastParticiple).toBe("créé");
  });

  it("falloir uses avoir", () => {
    const verb = getFrenchVerb("falloir");
    expect(verb.past).toBe("a fallu");
    expect(verb.pastParticiple).toBe("fallu");
  });

  it("naître and mourir use être", () => {
    expect(getFrenchVerb("naître").past).toBe("est né");
    expect(getFrenchVerb("mourir").past).toBe("est mort");
    expect(getFrenchVerb("naître").tags).toContain("auxiliary-etre");
    expect(getFrenchVerb("mourir").tags).toContain("auxiliary-etre");
  });

  it("tags match the auxiliary used in passé composé", () => {
    for (const verb of frenchVerbs) {
      if (verb.tags?.includes("auxiliary-etre")) {
        expect(verb.past.startsWith("est ") || verb.past.startsWith("s'est ")).toBe(true);
      } else {
        expect(verb.past.startsWith("a ")).toBe(true);
      }
    }
  });
});

describe("category filtering", () => {
  it("returns only verbs for the verbs filter", () => {
    const result = filterEntries(allEntries, "verbs");
    expect(result.length).toBe(verbs.length);
    expect(result.every(isVerbItem)).toBe(true);
  });

  it("returns every entry for all", () => {
    expect(filterEntries(allEntries, "all")).toHaveLength(allEntries.length);
  });

  it("keeps cards in every CEFR study band", () => {
    for (const level of STUDY_CEFR_LEVELS) {
      expect(filterEntries(allEntries, "all", level).length).toBeGreaterThan(0);
      expect(filterEntries(frenchEntries, "all", level).length).toBeGreaterThan(0);
      expect(filterEntries(catalanEntries, "all", level).length).toBeGreaterThan(0);
    }
  });

  it("filters each polar phrase category to the full catalog", () => {
    expect(filterEntries(allEntries, "questions")).toHaveLength(PHRASE_SET_COUNT);
    expect(filterEntries(allEntries, "positiveAnswers")).toHaveLength(PHRASE_SET_COUNT);
    expect(filterEntries(allEntries, "negativeAnswers")).toHaveLength(PHRASE_SET_COUNT);
  });

  it("keeps phrase trios together in the complete-set scope", () => {
    const trios = filterEntries(allEntries, "phrases");
    expect(trios).toHaveLength(PHRASE_SET_COUNT * 3);
    expect(trios.slice(0, 3).map((entry) => entry.id)).toEqual([
      "question-like-coffee",
      "positive-like-coffee",
      "negative-like-coffee",
    ]);
    expect(trios.every((entry) => entry.category !== "techQuestions" && entry.category !== "techAnswers")).toBe(
      true,
    );
    expect(trios.every((entry) => entry.category !== "openQuestions" && entry.category !== "openAnswers")).toBe(
      true,
    );
    expect(trios.every((entry) => entry.category !== "schoolNotices")).toBe(true);
  });

  it("keeps tech pairs together and out of everyday phrases", () => {
    const pairs = filterEntries(allEntries, "techPhrases");
    expect(pairs).toHaveLength(TECH_PHRASE_SET_COUNT * 2);
    expect(pairs.slice(0, 2).map((entry) => entry.id)).toEqual(["tech-question-git", "tech-answer-git"]);
    expect(filterEntries(allEntries, "techQuestions")).toHaveLength(TECH_PHRASE_SET_COUNT);
    expect(filterEntries(allEntries, "techAnswers")).toHaveLength(TECH_PHRASE_SET_COUNT);
    expect(filterEntries(allEntries, "techPhrases", "A1")).toHaveLength(0);
    expect(filterEntries(allEntries, "techPhrases", "C1").length).toBeGreaterThan(0);
    expect(filterEntries(allEntries, "techPhrases", "A2").length).toBeGreaterThan(0);
    expect(filterEntries(allEntries, "techPhrases", "C2").length).toBeGreaterThan(0);
  });

  it("keeps conversation pairs together and out of polar and tech", () => {
    const pairs = filterEntries(allEntries, "openPhrases");
    expect(pairs).toHaveLength(OPEN_PHRASE_SET_COUNT * 2);
    expect(pairs.slice(0, 2).map((entry) => entry.id)).toEqual(["open-question-your-name", "open-answer-your-name"]);
    expect(filterEntries(allEntries, "openQuestions")).toHaveLength(OPEN_PHRASE_SET_COUNT);
    expect(filterEntries(allEntries, "openAnswers")).toHaveLength(OPEN_PHRASE_SET_COUNT);
    expect(pairs.every((entry) => entry.category === "openQuestions" || entry.category === "openAnswers")).toBe(
      true,
    );
  });
});

describe("phrase sets", () => {
  it("has aligned polar sets with explicit CEFR, and at least two hundred at C2", () => {
    expect(phraseSets).toHaveLength(PHRASE_SET_COUNT);
    expect(PHRASE_SET_COUNT).toBeGreaterThanOrEqual(700);
    const byLevel = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 };
    const englishQuestions = phraseSets.map((set) => set.en.question);
    expect(new Set(englishQuestions).size).toBe(englishQuestions.length);
    for (const set of phraseSets) {
      byLevel[set.difficulty] += 1;
      expect(set.en.question.trim()).not.toBe("");
      expect(set.en.positive.trim()).not.toBe("");
      expect(set.en.negative.trim()).not.toBe("");
      expect(set.fr.question.trim()).not.toBe("");
      expect(set.fr.positive.trim()).not.toBe("");
      expect(set.fr.negative.trim()).not.toBe("");
      expect(set.es.question.trim()).not.toBe("");
      expect(set.es.positive.trim()).not.toBe("");
      expect(set.es.negative.trim()).not.toBe("");
    }
    expect(byLevel.A1).toBe(100);
    expect(byLevel.A2).toBe(100);
    expect(byLevel.B1).toBe(100);
    expect(byLevel.B2).toBeGreaterThanOrEqual(120);
    expect(byLevel.C1).toBeGreaterThanOrEqual(160);
    expect(byLevel.C2).toBeGreaterThanOrEqual(200);
  });

  it("keeps C2 polar in spoken English, not courtroom register", () => {
    const banned =
      /\b(locus standi|ultra vires|sub judice|without prejudice|hearsay|fiduciary|in camera|affidavit|parent Act|anti-suit|wasted costs|wrecking amendment|seised)\b/i;
    for (const set of phraseSets.filter((item) => item.difficulty === "C2")) {
      const spoken = [set.en.question, set.en.positive, set.en.negative].join(" ");
      expect(spoken, set.id).not.toMatch(banned);
    }
  });

  it("keeps C1 polar free of consultant sludge", () => {
    const banned = /\b(workstream|load-bearing|sunk design|deliverable)\b/i;
    for (const set of phraseSets.filter((item) => item.difficulty === "C1")) {
      const spoken = [set.en.question, set.en.positive, set.en.negative].join(" ");
      expect(spoken, set.id).not.toMatch(banned);
    }
  });

  it("keeps C1 and C2 conversation in spoken English, not seminar register", () => {
    const banned =
      /\b(identification story|licence to|Chatham House|load-bearing|under erasure|neighbouring case|without more)\b/i;
    for (const set of openPhraseSets.filter((item) => item.difficulty === "C1" || item.difficulty === "C2")) {
      const spoken = [set.en.question, set.en.answer].join(" ");
      expect(spoken, set.id).not.toMatch(banned);
      expect(set.es.answer, set.id).not.toMatch(/actaría/i);
    }
  });

  it("keeps the same one hundred A1 polar questions in English and French", () => {
    const tag = (id: string) => id.replace(/^fr-/, "").replace(/^question-/, "");
    const enA1 = filterEntries(allEntries, "questions", "A1");
    const frA1 = filterEntries(frenchEntries, "questions", "A1");
    expect(enA1).toHaveLength(100);
    expect(frA1).toHaveLength(100);
    expect(new Set(enA1.map((entry) => tag(entry.id)))).toEqual(new Set(frA1.map((entry) => tag(entry.id))));
    expect(filterEntries(allEntries, "phrases", "A1")).toHaveLength(300);
    expect(filterEntries(frenchEntries, "phrases", "A1")).toHaveLength(300);
  });

  it("keeps the same one hundred A2 polar questions in English and French", () => {
    const tag = (id: string) => id.replace(/^fr-/, "").replace(/^question-/, "");
    const enA2 = filterEntries(allEntries, "questions", "A2");
    const frA2 = filterEntries(frenchEntries, "questions", "A2");
    expect(enA2).toHaveLength(100);
    expect(frA2).toHaveLength(100);
    expect(new Set(enA2.map((entry) => tag(entry.id)))).toEqual(new Set(frA2.map((entry) => tag(entry.id))));
    expect(filterEntries(allEntries, "phrases", "A2")).toHaveLength(300);
    expect(filterEntries(frenchEntries, "phrases", "A2")).toHaveLength(300);
  });

  it("keeps the same one hundred B1 polar questions in English and French", () => {
    const tag = (id: string) => id.replace(/^fr-/, "").replace(/^question-/, "");
    const enB1 = filterEntries(allEntries, "questions", "B1");
    const frB1 = filterEntries(frenchEntries, "questions", "B1");
    expect(enB1).toHaveLength(100);
    expect(frB1).toHaveLength(100);
    expect(new Set(enB1.map((entry) => tag(entry.id)))).toEqual(new Set(frB1.map((entry) => tag(entry.id))));
    expect(filterEntries(allEntries, "phrases", "B1")).toHaveLength(300);
    expect(filterEntries(frenchEntries, "phrases", "B1")).toHaveLength(300);
  });

  it("keeps the same B2 polar questions in English and French, at least one hundred and twenty", () => {
    const tag = (id: string) => id.replace(/^fr-/, "").replace(/^question-/, "");
    const enB2 = filterEntries(allEntries, "questions", "B2");
    const frB2 = filterEntries(frenchEntries, "questions", "B2");
    expect(enB2.length).toBeGreaterThanOrEqual(120);
    expect(frB2.length).toBeGreaterThanOrEqual(120);
    expect(new Set(enB2.map((entry) => tag(entry.id)))).toEqual(new Set(frB2.map((entry) => tag(entry.id))));
    expect(filterEntries(allEntries, "phrases", "B2").length).toBeGreaterThanOrEqual(360);
    expect(filterEntries(frenchEntries, "phrases", "B2").length).toBeGreaterThanOrEqual(360);
  });

  it("keeps the same C1 polar questions in English and French, at least one hundred and sixty", () => {
    const tag = (id: string) => id.replace(/^fr-/, "").replace(/^question-/, "");
    const enC1 = filterEntries(allEntries, "questions", "C1");
    const frC1 = filterEntries(frenchEntries, "questions", "C1");
    expect(enC1.length).toBeGreaterThanOrEqual(160);
    expect(frC1.length).toBeGreaterThanOrEqual(160);
    expect(new Set(enC1.map((entry) => tag(entry.id)))).toEqual(new Set(frC1.map((entry) => tag(entry.id))));
    expect(filterEntries(allEntries, "phrases", "C1").length).toBeGreaterThanOrEqual(480);
    expect(filterEntries(frenchEntries, "phrases", "C1").length).toBeGreaterThanOrEqual(480);
  });

  it("keeps the same C2 polar questions in English and French, at least two hundred", () => {
    const tag = (id: string) => id.replace(/^fr-/, "").replace(/^question-/, "");
    const enC2 = filterEntries(allEntries, "questions", "C2");
    const frC2 = filterEntries(frenchEntries, "questions", "C2");
    expect(enC2.length).toBeGreaterThanOrEqual(200);
    expect(frC2.length).toBeGreaterThanOrEqual(200);
    expect(new Set(enC2.map((entry) => tag(entry.id)))).toEqual(new Set(frC2.map((entry) => tag(entry.id))));
    expect(filterEntries(allEntries, "phrases", "C2").length).toBeGreaterThanOrEqual(600);
    expect(filterEntries(frenchEntries, "phrases", "C2").length).toBeGreaterThanOrEqual(600);
  });

  it("keeps the same set ids in English and French after catalog tagging", () => {
    const tag = (id: string) => id.replace(/^fr-/, "").replace(/^(question|positive|negative)-/, "");
    const enSets = new Set(
      allEntries.filter((entry) => entry.category === "questions").map((entry) => tag(entry.id)),
    );
    const frSets = new Set(
      frenchEntries.filter((entry) => entry.category === "questions").map((entry) => tag(entry.id)),
    );
    expect(enSets).toEqual(frSets);
    expect(enSets.size).toBe(PHRASE_SET_COUNT);
  });

  it("does not overwrite phrase CEFR with frequency tagging", () => {
    const coffee = allEntries.find((entry) => entry.id === "question-like-coffee");
    const farFetched = allEntries.find((entry) => entry.id === "question-far-fetched");
    expect(coffee?.difficulty).toBe("A1");
    expect(farFetched?.difficulty).toBe("C1");
    expect(allEntries.find((entry) => entry.id === "question-ultra-vires")?.difficulty).toBe("C2");
    expect(allEntries.find((entry) => entry.id === "question-ultra-vires")?.tags).toEqual(
      expect.arrayContaining(["skill:listening", "skill:interaction"]),
    );
    expect(allEntries.find((entry) => entry.id === "positive-ultra-vires")?.tags).toContain("skill:speaking");
    expect(allEntries.find((entry) => entry.id === "tech-answer-git")?.tags).toContain("skill:writing");
    expect(allEntries.find((entry) => entry.id === "open-answer-your-name")?.tags).toContain("skill:speaking");
    expect(allEntries.find((entry) => entry.id === "school-discipline-board")?.tags).toContain("skill:reading");
    expect(frenchEntries.find((entry) => entry.id === "fr-question-like-coffee")?.difficulty).toBe("A1");
  });

  it("uses short ids and set tags, not sentence slugs", () => {
    const card = allEntries.find((entry) => entry.id === "question-like-coffee");
    expect(card && isVocabularyItem(card)).toBe(true);
    if (!card || !isVocabularyItem(card)) return;
    expect(card.term).toBe("Do you like coffee?");
    expect(card.tags).toContain("set:like-coffee");
    expect(card.id).toBe("question-like-coffee");
    expect(card.id.includes(" ")).toBe(false);
  });
});

describe("tech phrase sets", () => {
  it("ships complete question-answer pairs with the same ids in English and French", () => {
    expect(techPhraseSets).toHaveLength(TECH_PHRASE_SET_COUNT);
    const ids = new Set<string>();
    for (const set of techPhraseSets) {
      expect(ids.has(set.id)).toBe(false);
      ids.add(set.id);
      expect(set.en.question.trim()).not.toBe("");
      expect(set.en.answer.trim()).not.toBe("");
      expect(set.fr.question.trim()).not.toBe("");
      expect(set.fr.answer.trim()).not.toBe("");
      expect(set.es.question.trim()).not.toBe("");
      expect(set.es.answer.trim()).not.toBe("");
    }

    const tag = (id: string) => id.replace(/^fr-/, "").replace(/^tech-(question|answer)-/, "");
    const enSets = new Set(
      allEntries.filter((entry) => entry.category === "techQuestions").map((entry) => tag(entry.id)),
    );
    const frSets = new Set(
      frenchEntries.filter((entry) => entry.category === "techQuestions").map((entry) => tag(entry.id)),
    );
    expect(enSets).toEqual(frSets);
    expect(enSets.size).toBe(TECH_PHRASE_SET_COUNT);
  });

  it("keeps tech CEFR and domain tags", () => {
    const question = allEntries.find((entry) => entry.id === "tech-question-git");
    const answer = allEntries.find((entry) => entry.id === "tech-answer-git");
    expect(question && isVocabularyItem(question)).toBe(true);
    if (!question || !isVocabularyItem(question) || !answer || !isVocabularyItem(answer)) return;
    expect(question.difficulty).toBe("A2");
    expect(answer.difficulty).toBe("A2");
    expect(question.tags).toEqual(["set:git", "domain:tech", "skill:writing"]);
    expect(answer.term).toContain("version control");
    expect(frenchEntries.find((entry) => entry.id === "fr-tech-question-git")?.difficulty).toBe("A2");
  });
});

describe("open phrase sets", () => {
  it("ships complete conversation pairs with the same ids in English and French", () => {
    expect(openPhraseSets).toHaveLength(OPEN_PHRASE_SET_COUNT);
    const ids = new Set<string>();
    for (const set of openPhraseSets) {
      expect(ids.has(set.id)).toBe(false);
      ids.add(set.id);
      expect(set.en.question.trim()).not.toBe("");
      expect(set.en.answer.trim()).not.toBe("");
      expect(set.fr.question.trim()).not.toBe("");
      expect(set.fr.answer.trim()).not.toBe("");
      expect(set.es.question.trim()).not.toBe("");
      expect(set.es.answer.trim()).not.toBe("");
    }

    const tag = (id: string) => id.replace(/^fr-/, "").replace(/^open-(question|answer)-/, "");
    const enSets = new Set(
      allEntries.filter((entry) => entry.category === "openQuestions").map((entry) => tag(entry.id)),
    );
    const frSets = new Set(
      frenchEntries.filter((entry) => entry.category === "openQuestions").map((entry) => tag(entry.id)),
    );
    expect(enSets).toEqual(frSets);
    expect(enSets.size).toBe(OPEN_PHRASE_SET_COUNT);

    const polarIds = new Set(phraseSets.map((set) => set.id));
    const techIds = new Set(techPhraseSets.map((set) => set.id));
    for (const id of ids) {
      expect(polarIds.has(id)).toBe(false);
      expect(techIds.has(id)).toBe(false);
    }
  });

  it("keeps open CEFR and kind tags", () => {
    const question = allEntries.find((entry) => entry.id === "open-question-your-name");
    const answer = allEntries.find((entry) => entry.id === "open-answer-your-name");
    expect(question && isVocabularyItem(question)).toBe(true);
    if (!question || !isVocabularyItem(question) || !answer || !isVocabularyItem(answer)) return;
    expect(question.difficulty).toBe("A1");
    expect(answer.difficulty).toBe("A1");
    expect(question.tags).toEqual(["set:your-name", "kind:open", "skill:speaking"]);
    expect(answer.term).toBe("My name's Ana.");
    expect(frenchEntries.find((entry) => entry.id === "fr-open-question-your-name")?.difficulty).toBe("A1");
    expect(filterEntries(allEntries, "openPhrases", "B2").length).toBeGreaterThan(0);
    expect(filterEntries(allEntries, "openPhrases", "C2").length).toBeGreaterThan(0);
    expect(filterEntries(frenchEntries, "openPhrases", "C2").length).toBeGreaterThan(0);
  });
});

describe("school notice sets", () => {
  it("ships complete school circulars with the same ids in English and French", () => {
    expect(schoolNoticeSets).toHaveLength(SCHOOL_NOTICE_COUNT);
    expect(SCHOOL_NOTICE_COUNT).toBeGreaterThanOrEqual(256);
    const ids = new Set<string>();
    for (const set of schoolNoticeSets) {
      expect(ids.has(set.id)).toBe(false);
      ids.add(set.id);
      expect(set.en.trim()).not.toBe("");
      expect(set.fr.trim()).not.toBe("");
      expect(set.es.trim()).not.toBe("");
    }

    const tag = (id: string) => id.replace(/^fr-/, "").replace(/^school-/, "");
    const enSets = new Set(
      allEntries.filter((entry) => entry.category === "schoolNotices").map((entry) => tag(entry.id)),
    );
    const frSets = new Set(
      frenchEntries.filter((entry) => entry.category === "schoolNotices").map((entry) => tag(entry.id)),
    );
    expect(enSets).toEqual(frSets);
    expect(enSets.size).toBe(SCHOOL_NOTICE_COUNT);
    expect(filterEntries(allEntries, "schoolNotices")).toHaveLength(SCHOOL_NOTICE_COUNT);
    expect(filterEntries(allEntries, "phrases").every((entry) => entry.category !== "schoolNotices")).toBe(true);
    expect(filterEntries(allEntries, "techPhrases").every((entry) => entry.category !== "schoolNotices")).toBe(
      true,
    );
    expect(filterEntries(allEntries, "openPhrases").every((entry) => entry.category !== "schoolNotices")).toBe(
      true,
    );

    const polarIds = new Set(phraseSets.map((set) => set.id));
    const techIds = new Set(techPhraseSets.map((set) => set.id));
    const openIds = new Set(openPhraseSets.map((set) => set.id));
    for (const id of ids) {
      expect(polarIds.has(id)).toBe(false);
      expect(techIds.has(id)).toBe(false);
      expect(openIds.has(id)).toBe(false);
    }
  });

  it("keeps school CEFR and domain tags", () => {
    const notice = allEntries.find((entry) => entry.id === "school-parent-meeting-tuesday");
    expect(notice && isVocabularyItem(notice)).toBe(true);
    if (!notice || !isVocabularyItem(notice)) return;
    expect(notice.difficulty).toBe("A1");
    expect(notice.tags).toEqual(["set:parent-meeting-tuesday", "domain:school", "skill:reading"]);
    expect(notice.term).toContain("Tuesday");
    const frenchNotice = frenchEntries.find((entry) => entry.id === "fr-school-parent-meeting-tuesday");
    expect(frenchNotice && isVocabularyItem(frenchNotice)).toBe(true);
    if (!frenchNotice || !isVocabularyItem(frenchNotice)) return;
    expect(frenchNotice.term).toContain("réunion parents-professeurs");
    expect(filterEntries(allEntries, "schoolNotices", "B2").length).toBeGreaterThan(0);
    expect(allEntries.find((entry) => entry.id === "school-written-consent")?.difficulty).toBe("C1");
    expect(filterEntries(allEntries, "schoolNotices", "C1").length).toBeGreaterThan(0);
    expect(allEntries.find((entry) => entry.id === "school-discipline-board")?.difficulty).toBe("C2");
    expect(filterEntries(allEntries, "schoolNotices", "C2").length).toBeGreaterThan(0);
  });
});
