export type Subject = "language" | "math";

function withSlash(base: string): string {
  return base.endsWith("/") ? base : `${base}/`;
}

function entryQuery(name: string, userId?: string): string {
  const nombre = encodeURIComponent(name.trim());
  const usuario = userId ? `&usuario=${encodeURIComponent(userId)}` : "";
  return `nombre=${nombre}${usuario}`;
}

export function subjectUrl(
  subject: Subject,
  name: string,
  base = import.meta.env.BASE_URL || "/",
  userId?: string,
): string {
  const query = entryQuery(name, userId);
  if (base.includes("lenguagegame")) {
    const root = withSlash(base);
    const path = subject === "math" ? `${root}matematicas.html` : root;
    return `${path}?${query}`;
  }
  if (subject === "language") return `http://localhost:5173/lenguagegame/?${query}`;
  return `${withSlash(base)}?${query}`;
}

export interface EntryIdentity {
  name: string;
  userId: string | null;
}

export function consumeEntry(): EntryIdentity | null {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("nombre")?.trim() ?? "";
  if (!name) return null;
  const userId = params.get("usuario")?.trim() || null;
  const url = new URL(window.location.href);
  url.searchParams.delete("nombre");
  url.searchParams.delete("usuario");
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  return { name, userId };
}

export function consumeEntryName(): string | null {
  return consumeEntry()?.name ?? null;
}
