import { TTS_MULTI_FORM_MS, TTS_PHRASE_RATE, TTS_RATE } from "../constants";
import type { LanguagePairId, VocabularyEntry } from "../types/vocabulary";
import { isPhraseCategory, isVerbItem } from "./vocabulary";

export function ttsLangForPair(pair: LanguagePairId): string {
  if (pair === "fr-es") return "fr-FR";
  if (pair === "ca-es") return "ca-ES";
  if (pair === "eu-es") return "eu-ES";
  return "en-GB";
}

export function ttsLangForQuiz(pair: LanguagePairId, direction: "forward" | "reverse"): string {
  if (direction === "reverse") return "es-ES";
  return ttsLangForPair(pair);
}

export function ttsLangForQuizTranslation(
  pair: LanguagePairId,
  direction: "forward" | "reverse",
): string {
  return direction === "forward" ? "es-ES" : ttsLangForPair(pair);
}

export function ttsLangForChoiceTranslation(
  pair: LanguagePairId,
  direction: "forward" | "reverse",
): string {
  return direction === "forward" ? ttsLangForPair(pair) : "es-ES";
}

export function ttsPhrases(entry: VocabularyEntry, intervalMs: number): string[] {
  if (isVerbItem(entry)) {
    if (intervalMs >= TTS_MULTI_FORM_MS) {
      return [entry.infinitive, entry.past, entry.pastParticiple];
    }
    return [entry.infinitive];
  }
  return [entry.term];
}

export function ttsRateForEntry(entry: VocabularyEntry): number {
  if (isVerbItem(entry)) return TTS_RATE;
  if (isPhraseCategory(entry.category)) return TTS_PHRASE_RATE;
  return TTS_RATE;
}

function normalizeLang(value: string): string {
  return value.replace("_", "-").toLowerCase();
}

const FEMALE_NAME = new Set([
  "ainhoa",
  "miren",
  "izaro",
  "elvira",
  "helena",
  "laura",
  "abril",
  "lucia",
  "estrella",
  "hortense",
  "julie",
  "denise",
  "vivienne",
  "eloise",
  "brigitte",
  "amelie",
  "joana",
  "herena",
  "alba",
  "montserrat",
  "libby",
  "sonia",
  "hazel",
  "susan",
  "kate",
  "serena",
  "martha",
  "maisie",
  "aria",
  "jenny",
  "michelle",
  "zira",
  "samantha",
  "ava",
  "emma",
]);

const MALE_NAME = new Set([
  "ander",
  "alvaro",
  "pablo",
  "jorge",
  "henri",
  "paul",
  "claude",
  "enric",
  "jordi",
  "george",
  "ryan",
  "daniel",
  "oliver",
  "thomas",
  "guy",
  "david",
  "mark",
  "christopher",
  "eric",
  "james",
]);

function genderScore(name: string): number {
  const lower = name.toLowerCase();
  if (/\b(female|woman|mujer|femme|emakume)\b/.test(lower)) return 8;
  if (/\b(male|hombre|homme|gizon)\b/.test(lower)) return -4;
  const tokens = lower.split(/[^a-z]+/).filter((token) => token.length > 0);
  if (tokens.some((token) => FEMALE_NAME.has(token))) return 8;
  if (tokens.some((token) => MALE_NAME.has(token))) return -4;
  return 0;
}

export function pickVoice(
  voices: readonly SpeechSynthesisVoice[],
  lang: string,
): SpeechSynthesisVoice | null {
  const target = normalizeLang(lang);
  const prefix = target.slice(0, 2);
  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -1;

  for (const voice of voices) {
    const voiceLang = normalizeLang(voice.lang);
    let score = 0;
    if (voiceLang === target) score += 4;
    else if (voiceLang.startsWith(prefix)) score += 2;
    else continue;

    const name = voice.name.toLowerCase();
    if (name.includes("natural") || name.includes("neural") || name.includes("enhanced")) score += 2;
    if (name.includes("google")) score += 1;
    if (voice.localService) score += 1;
    score += genderScore(voice.name);
    if (score > bestScore) {
      best = voice;
      bestScore = score;
    }
  }

  return best;
}
