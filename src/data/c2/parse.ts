import type { C2VerbTuple, C2WordTuple } from "./expand";

export function parseWordBlob(blob: string): C2WordTuple[] {
  const rows: C2WordTuple[] = [];
  const seen = new Set<string>();
  for (const line of blob.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const cut = trimmed.indexOf("|");
    if (cut < 1) continue;
    const term = trimmed.slice(0, cut).trim();
    const translation = trimmed.slice(cut + 1).trim();
    const key = term.toLowerCase();
    if (!translation || seen.has(key)) continue;
    seen.add(key);
    rows.push([term, translation]);
  }
  return rows;
}

export function parseVerbBlob(blob: string): C2VerbTuple[] {
  const rows: C2VerbTuple[] = [];
  const seen = new Set<string>();
  for (const line of blob.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const parts = trimmed.split("|");
    if (parts.length < 7) continue;
    const infinitive = parts[0]?.trim() ?? "";
    const key = infinitive.toLowerCase();
    if (!infinitive || seen.has(key)) continue;
    seen.add(key);
    rows.push([
      infinitive,
      parts[1]?.trim() ?? "",
      parts[2]?.trim() ?? "",
      parts[3]?.trim() ?? "",
      parts[4]?.trim() ?? "",
      parts[5]?.trim() ?? "",
      parts[6]?.trim() ?? "regular",
    ]);
  }
  return rows;
}
