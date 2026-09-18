import type { StudyCefrLevel } from "../types/vocabulary";

export interface C2PolarSet {
  id: string;
  difficulty: StudyCefrLevel;
  en: { question: string; positive: string; negative: string };
  fr: { question: string; positive: string; negative: string };
  es: { question: string; positive: string; negative: string };
}

export interface C2PairSet {
  id: string;
  difficulty: StudyCefrLevel;
  en: { question: string; answer: string };
  fr: { question: string; answer: string };
  es: { question: string; answer: string };
}

export interface C2NoticeSet {
  id: string;
  difficulty: StudyCefrLevel;
  en: string;
  fr: string;
  es: string;
}

function cells(line: string, expected: number): string[] | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  const parts = trimmed.split("|").map((part) => part.trim());
  if (parts.length !== expected || parts.some((part) => !part)) return null;
  return parts;
}

export function parseC2PolarBlob(blob: string, difficulty: StudyCefrLevel = "C2"): C2PolarSet[] {
  const rows: C2PolarSet[] = [];
  const seen = new Set<string>();
  for (const line of blob.split("\n")) {
    const parts = cells(line, 10);
    if (!parts) continue;
    const [id, enQ, enY, enN, frQ, frY, frN, esQ, esY, esN] = parts;
    if (seen.has(id)) continue;
    seen.add(id);
    rows.push({
      id,
      difficulty,
      en: { question: enQ, positive: enY, negative: enN },
      fr: { question: frQ, positive: frY, negative: frN },
      es: { question: esQ, positive: esY, negative: esN },
    });
  }
  return rows;
}

export function parseC2PairBlob(blob: string, difficulty: StudyCefrLevel = "C2"): C2PairSet[] {
  const rows: C2PairSet[] = [];
  const seen = new Set<string>();
  for (const line of blob.split("\n")) {
    const parts = cells(line, 7);
    if (!parts) continue;
    const [id, enQ, enA, frQ, frA, esQ, esA] = parts;
    if (seen.has(id)) continue;
    seen.add(id);
    rows.push({
      id,
      difficulty,
      en: { question: enQ, answer: enA },
      fr: { question: frQ, answer: frA },
      es: { question: esQ, answer: esA },
    });
  }
  return rows;
}

export function parseC2NoticeBlob(blob: string, difficulty: StudyCefrLevel = "C2"): C2NoticeSet[] {
  const rows: C2NoticeSet[] = [];
  const seen = new Set<string>();
  for (const line of blob.split("\n")) {
    const parts = cells(line, 4);
    if (!parts) continue;
    const [id, en, fr, es] = parts;
    if (seen.has(id)) continue;
    seen.add(id);
    rows.push({ id, difficulty, en, fr, es });
  }
  return rows;
}
