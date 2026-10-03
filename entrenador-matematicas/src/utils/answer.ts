export function normalizeAnswer(value: string): string {
  return value
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/−|–|—/g, "-")
    .replace(/[·×]/g, "*")
    .replace(/\s+/g, "");
}

export function answerMatches(typed: string, expect: string, accept: readonly string[] = []): boolean {
  const got = normalizeAnswer(typed);
  if (!got) return false;
  return [expect, ...accept].some((option) => normalizeAnswer(option) === got);
}
