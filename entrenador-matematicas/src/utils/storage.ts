import { STORAGE_VERSION } from "../constants";

interface Versioned<T> {
  version: number;
  data: T;
}

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function migrateStep(from: number, data: unknown): unknown | null {
  if (from === 1) return data;
  return null;
}

export function migrate(from: number, data: unknown): unknown | null {
  if (!Number.isInteger(from) || from < 1 || from > STORAGE_VERSION) return null;
  let current = data;
  let version = from;
  while (version < STORAGE_VERSION) {
    const next = migrateStep(version, current);
    if (next === null) return null;
    current = next;
    version += 1;
  }
  return current;
}

function unwrap(value: unknown): unknown {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const record = value as { version?: unknown; data?: unknown };
    if (typeof record.version === "number" && Object.prototype.hasOwnProperty.call(record, "data")) {
      return migrate(record.version, record.data);
    }
  }
  return migrate(1, value);
}

export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const migrated = unwrap(parseJson(raw));
    if (migrated === null || migrated === undefined) return fallback;
    return migrated as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    const payload: Versioned<unknown> = { version: STORAGE_VERSION, data: value };
    window.localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // Sin espacio o almacenamiento desactivado: la sesión sigue en memoria.
  }
}
