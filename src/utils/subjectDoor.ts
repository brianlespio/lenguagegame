export type Subject = "language" | "math";

function withSlash(base: string): string {
  return base.endsWith("/") ? base : `${base}/`;
}

export function subjectUrl(subject: Subject, name: string, base = import.meta.env.BASE_URL || "/"): string {
  const nombre = encodeURIComponent(name.trim());
  if (base.includes("lenguagegame")) {
    const root = withSlash(base);
    const path = subject === "math" ? `${root}matematicas.html` : root;
    return `${path}?nombre=${nombre}`;
  }
  if (subject === "language") return `http://localhost:5173/lenguagegame/?nombre=${nombre}`;
  return `${withSlash(base)}?nombre=${nombre}`;
}

export function consumeEntryName(): string | null {
  const nombre = new URLSearchParams(window.location.search).get("nombre")?.trim() ?? "";
  if (!nombre) return null;
  const url = new URL(window.location.href);
  url.searchParams.delete("nombre");
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(null, "", next);
  return nombre;
}
