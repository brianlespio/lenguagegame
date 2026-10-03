import { describe, expect, it } from "vitest";
import {
  pickVoice,
  ttsLangForChoiceTranslation,
  ttsLangForPair,
  ttsLangForQuiz,
  ttsLangForQuizTranslation,
  ttsPhrases,
  ttsRateForEntry,
} from "./speech";
import { TTS_PHRASE_RATE, TTS_RATE, isTtsAutoplayInterval } from "../constants";
import type { VerbItem, VocabularyItem } from "../types/vocabulary";

const noun: VocabularyItem = {
  id: "n-house",
  category: "nouns",
  term: "house",
  translation: "casa",
};

const verb: VerbItem = {
  id: "verb-go",
  category: "verbs",
  infinitive: "go",
  past: "went",
  pastParticiple: "gone",
  infinitiveTranslation: "ir",
  pastTranslation: "fue",
  pastParticipleTranslation: "ido",
};

function voice(overrides: Partial<SpeechSynthesisVoice> & Pick<SpeechSynthesisVoice, "name" | "lang">): SpeechSynthesisVoice {
  return {
    default: false,
    localService: false,
    voiceURI: overrides.voiceURI ?? overrides.name,
    ...overrides,
  } as SpeechSynthesisVoice;
}

describe("tts phrases", () => {
  it("speaks the source term, not the translation", () => {
    expect(ttsPhrases(noun, 5000)).toEqual(["house"]);
  });

  it("slows the rate for phrase cards", () => {
    const question: VocabularyItem = {
      id: "question-like-coffee",
      category: "questions",
      term: "Do you like coffee?",
      translation: "¿Te gusta el café?",
    };
    expect(ttsRateForEntry(noun)).toBe(TTS_RATE);
    expect(ttsRateForEntry(verb)).toBe(TTS_RATE);
    expect(ttsRateForEntry(question)).toBe(TTS_PHRASE_RATE);
    expect(TTS_PHRASE_RATE).toBeLessThan(TTS_RATE);
  });

  it("speaks only the infinitive at 5s and all verb forms from 10s", () => {
    expect(ttsPhrases(verb, 5000)).toEqual(["go"]);
    expect(ttsPhrases(verb, 10000)).toEqual(["go", "went", "gone"]);
  });

  it("uses British English and French locales", () => {
    expect(ttsLangForPair("en-es")).toBe("en-GB");
    expect(ttsLangForPair("fr-es")).toBe("fr-FR");
    expect(ttsLangForPair("ca-es")).toBe("ca-ES");
    expect(ttsLangForPair("eu-es")).toBe("eu-ES");
    expect(ttsLangForQuiz("eu-es", "forward")).toBe("eu-ES");
    expect(ttsLangForQuiz("eu-es", "reverse")).toBe("es-ES");
    expect(ttsLangForQuiz("en-es", "forward")).toBe("en-GB");
    expect(ttsLangForQuiz("en-es", "reverse")).toBe("es-ES");
    expect(ttsLangForQuiz("fr-es", "forward")).toBe("fr-FR");
    expect(ttsLangForQuizTranslation("en-es", "forward")).toBe("es-ES");
    expect(ttsLangForQuizTranslation("en-es", "reverse")).toBe("en-GB");
    expect(ttsLangForChoiceTranslation("en-es", "forward")).toBe("en-GB");
    expect(ttsLangForChoiceTranslation("fr-es", "reverse")).toBe("es-ES");
  });

  it("enables autoplay speech from 5s onward", () => {
    expect(isTtsAutoplayInterval(1000)).toBe(false);
    expect(isTtsAutoplayInterval(3000)).toBe(false);
    expect(isTtsAutoplayInterval(5000)).toBe(true);
    expect(isTtsAutoplayInterval(30000)).toBe(true);
  });
});

describe("pickVoice", () => {
  it("prefers a matching natural voice for the study language", () => {
    const voices = [
      voice({ name: "Microsoft Helena", lang: "es-ES", localService: true }),
      voice({ name: "Microsoft George", lang: "en-GB", localService: true }),
      voice({ name: "Google UK English Female Natural", lang: "en-GB" }),
      voice({ name: "Microsoft Hortense", lang: "fr-FR", localService: true }),
    ];
    expect(pickVoice(voices, "en-GB")?.name).toContain("Natural");
    expect(pickVoice(voices, "fr-FR")?.lang).toBe("fr-FR");
  });

  it("prefers a woman when the language has both", () => {
    const voices = [
      voice({ name: "Microsoft Ander Online (Natural)", lang: "eu-ES" }),
      voice({ name: "Microsoft Ainhoa Online (Natural)", lang: "eu-ES" }),
      voice({ name: "Microsoft Ryan Online (Natural)", lang: "en-GB" }),
      voice({ name: "Microsoft Sonia Online (Natural)", lang: "en-GB" }),
      voice({ name: "Microsoft Alvaro Online (Natural)", lang: "es-ES" }),
      voice({ name: "Microsoft Elvira Online (Natural)", lang: "es-ES" }),
    ];
    expect(pickVoice(voices, "eu-ES")?.name).toContain("Ainhoa");
    expect(pickVoice(voices, "en-GB")?.name).toContain("Sonia");
    expect(pickVoice(voices, "es-ES")?.name).toContain("Elvira");
    expect(
      pickVoice(
        [
          voice({ name: "Microsoft Enric", lang: "ca-ES", localService: true }),
          voice({ name: "Microsoft Herena", lang: "ca-ES", localService: true }),
        ],
        "ca-ES",
      )?.name,
    ).toContain("Herena");
  });

  it("keeps the man when no woman is installed for that language", () => {
    const voices = [voice({ name: "Microsoft Ander Online (Natural)", lang: "eu-ES" })];
    expect(pickVoice(voices, "eu-ES")?.name).toContain("Ander");
  });
});
