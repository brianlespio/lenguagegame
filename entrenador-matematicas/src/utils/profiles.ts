import { SCORES_KEY, USERS_KEY } from "../constants";
import type { AppUser, TestScore, UserStore } from "../types/profile";
import { readJson, writeJson } from "./storage";

const emptyStore: UserStore = { activeUserId: null, users: [] };

export function loadUserStore(): UserStore {
  const raw = readJson<Partial<UserStore>>(USERS_KEY, emptyStore);
  const users = Array.isArray(raw.users)
    ? raw.users.filter((user): user is AppUser => {
        return Boolean(user && typeof user.id === "string" && typeof user.name === "string" && user.name.trim());
      })
    : [];
  const activeUserId =
    typeof raw.activeUserId === "string" && users.some((user) => user.id === raw.activeUserId)
      ? raw.activeUserId
      : null;
  return { activeUserId, users };
}

export function saveUserStore(store: UserStore): void {
  writeJson(USERS_KEY, store);
}

export function createUser(store: UserStore, name: string, options?: { duplicate?: boolean }): UserStore {
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (!trimmed) return store;
  if (!options?.duplicate) {
    const existing = store.users.find((user) => user.name.toLowerCase() === trimmed.toLowerCase());
    if (existing) return { ...store, activeUserId: existing.id };
  }
  const user: AppUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: trimmed,
    createdAt: new Date().toISOString(),
  };
  return { users: [...store.users, user], activeUserId: user.id };
}

export function openUser(store: UserStore, name: string, userId?: string | null): UserStore {
  const trimmed = name.trim().replace(/\s+/g, " ");
  if (!trimmed) return store;
  if (userId) {
    const byId = store.users.find((user) => user.id === userId);
    if (byId) return { ...store, activeUserId: byId.id };
    const user: AppUser = {
      id: userId,
      name: trimmed,
      createdAt: new Date().toISOString(),
    };
    return { users: [...store.users, user], activeUserId: user.id };
  }
  return createUser(store, trimmed);
}

export function selectUser(store: UserStore, userId: string): UserStore {
  if (!store.users.some((user) => user.id === userId)) return store;
  return { ...store, activeUserId: userId };
}

export function loadScores(): TestScore[] {
  const raw = readJson<unknown>(SCORES_KEY, []);
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is TestScore => {
    if (!item || typeof item !== "object") return false;
    const score = item as Partial<TestScore>;
    return typeof score.id === "string" && typeof score.userId === "string" && typeof score.percent === "number";
  });
}

export function saveScores(scores: readonly TestScore[]): void {
  writeJson(SCORES_KEY, scores.slice(0, 80));
}

export function addScore(scores: readonly TestScore[], score: TestScore): TestScore[] {
  return [score, ...scores].slice(0, 80);
}

export function scoresForUser(scores: readonly TestScore[], userId: string): TestScore[] {
  return scores.filter((score) => score.userId === userId);
}

export function pointsByUser(scores: readonly { userId: string; correct: number }[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const score of scores) {
    if (!Number.isFinite(score.correct)) continue;
    totals[score.userId] = (totals[score.userId] ?? 0) + score.correct;
  }
  return totals;
}

export function formatPoints(points: number): string {
  const value = Math.max(0, Math.round(points));
  return value === 1 ? "1 punto" : `${value} puntos`;
}

export function chanceAdjustedPercent(correctRatio: number, choices: number): number {
  const options = choices >= 2 ? choices : 2;
  const chance = 1 / options;
  const adjusted = (correctRatio - chance) / (1 - chance);
  return Math.min(1, Math.max(0, adjusted)) * 100;
}

export function scoreNote(percent: number, sample?: { answered: number; choices: number }): string {
  if (sample && sample.answered < 20) return "Aún no hay bastante";
  const score = sample ? chanceAdjustedPercent(percent / 100, sample.choices) : percent;
  if (score >= 85) return "Este nivel está firme. Puedes subir al siguiente cuando quieras.";
  if (score >= 60) return "Aún fallan cuentas. Repite las cartas de este eje antes de subir.";
  return "Toca repetir el nivel. La puntuación sale de las cuentas, no de haber visto la carta.";
}
