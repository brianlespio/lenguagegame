import type { VocabularyEntry } from "../types/vocabulary";
import { isPhraseCategory, isVerbItem } from "./vocabulary";

export function spellingTarget(entry: VocabularyEntry | undefined): string | null {
  if (!entry || isPhraseCategory(entry.category)) return null;
  const raw = (isVerbItem(entry) ? entry.infinitive : entry.term).normalize("NFC").trim();
  return raw.length > 0 ? raw : null;
}

export function foldSpelling(value: string): string {
  return value.normalize("NFC").toLocaleLowerCase();
}

export type SpellingStroke = "ignore" | "advance" | "complete" | "restart";

export function applySpellingLetter(target: string, typed: string, letter: string): SpellingStroke {
  if (letter.length !== 1) return "ignore";
  if (letter === "\n" || letter === "\r" || letter === "\t") return "ignore";
  const next = typed + letter;
  if (foldSpelling(next) !== foldSpelling(target.slice(0, next.length))) return "restart";
  return foldSpelling(next) === foldSpelling(target) ? "complete" : "advance";
}

let audioContext: AudioContext | null = null;

function context(): AudioContext | null {
  try {
    const Ctor =
      window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    audioContext ??= new Ctor();
    return audioContext;
  } catch {
    return null;
  }
}

function tone(frequency: number, start: number, duration: number, gain = 0.08) {
  const ctx = context();
  if (!ctx) return;
  const oscillator = ctx.createOscillator();
  const amp = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + start);
  amp.gain.setValueAtTime(0.0001, ctx.currentTime + start);
  amp.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + start + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  oscillator.connect(amp);
  amp.connect(ctx.destination);
  oscillator.start(ctx.currentTime + start);
  oscillator.stop(ctx.currentTime + start + duration + 0.02);
}

export function playSpellingOk(): void {
  void context()?.resume();
  tone(523.25, 0, 0.09, 0.07);
  tone(659.25, 0.07, 0.14, 0.08);
}

export function playSpellingMiss(): void {
  void context()?.resume();
  tone(196, 0, 0.11, 0.05);
}
