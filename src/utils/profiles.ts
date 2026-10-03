import { SCORES_STORAGE_KEY, TEST_RECENT_STORAGE_KEY, USERS_STORAGE_KEY } from "../constants";
import type { AppUser, TestScore, UserStore } from "../types/profile";
import type { LanguagePairId, StudyCefrLevel } from "../types/vocabulary";

const emptyStore: UserStore = { activeUserId: null, users: [] };

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const value = parseJson(raw);
    return value == null ? fallback : (value as T);
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota, private mode, or disabled storage.
  }
}

function slugName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

export function loadUserStore(): UserStore {
  const raw = readJson<Partial<UserStore>>(USERS_STORAGE_KEY, emptyStore);
  const users = Array.isArray(raw.users)
    ? raw.users.filter((user): user is AppUser => {
        return Boolean(user && typeof user.id === "string" && typeof user.name === "string");
      })
    : [];
  const activeUserId =
    typeof raw.activeUserId === "string" && users.some((user) => user.id === raw.activeUserId)
      ? raw.activeUserId
      : (users[0]?.id ?? null);
  return { activeUserId, users };
}

export function saveUserStore(store: UserStore): void {
  writeJson(USERS_STORAGE_KEY, store);
}

export function createUser(store: UserStore, name: string): UserStore {
  const trimmed = slugName(name);
  if (!trimmed) return store;
  const existing = store.users.find((user) => user.name.toLowerCase() === trimmed.toLowerCase());
  if (existing) {
    return { ...store, activeUserId: existing.id };
  }
  const user: AppUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: trimmed,
    createdAt: new Date().toISOString(),
  };
  return { users: [...store.users, user], activeUserId: user.id };
}

export function selectUser(store: UserStore, userId: string): UserStore {
  if (!store.users.some((user) => user.id === userId)) return store;
  return { ...store, activeUserId: userId };
}

export function loadScores(): TestScore[] {
  const raw = readJson<unknown>(SCORES_STORAGE_KEY, []);
  if (!Array.isArray(raw)) return [];
  return raw.filter((item): item is TestScore => {
    if (!item || typeof item !== "object") return false;
    const score = item as TestScore;
    return typeof score.id === "string" && typeof score.userId === "string" && typeof score.percent === "number";
  });
}

export function saveScores(scores: TestScore[]): void {
  writeJson(SCORES_STORAGE_KEY, scores);
}

export function addScore(scores: TestScore[], score: TestScore): TestScore[] {
  return [score, ...scores].slice(0, 500);
}

export function scoresForUser(scores: readonly TestScore[], userId: string, pair?: LanguagePairId): TestScore[] {
  return scores.filter((score) => score.userId === userId && (pair ? score.languagePair === pair : true));
}

export type LevelEstimate = StudyCefrLevel | "below-A1" | "insufficient";

export function chanceAdjustedPercent(correctRatio: number, choices: number): number {
  const options = choices >= 2 ? choices : 2;
  const chance = 1 / options;
  const adjusted = (correctRatio - chance) / (1 - chance);
  return Math.min(1, Math.max(0, adjusted)) * 100;
}

export function estimateLevel(
  percent: number,
  tested: "all" | StudyCefrLevel,
  sample?: { answered: number; choices: number },
): LevelEstimate {
  if (sample && sample.answered < 20) return "insufficient";
  const score = sample ? chanceAdjustedPercent(percent / 100, sample.choices) : percent;
  return levelFromScore(score, tested);
}

function levelFromScore(percent: number, tested: "all" | StudyCefrLevel): StudyCefrLevel | "below-A1" {
  if (tested !== "all") {
    if (percent >= 90) return tested;
    if (percent >= 75) {
      const down: Record<StudyCefrLevel, StudyCefrLevel> = {
        C2: "C1",
        C1: "B2",
        B2: "B1",
        B1: "A2",
        A2: "A1",
        A1: "A1",
      };
      return down[tested];
    }
    if (percent >= 55) {
      const down: Record<StudyCefrLevel, StudyCefrLevel | "below-A1"> = {
        C2: "B2",
        C1: "B1",
        B2: "A2",
        B1: "A1",
        A2: "A1",
        A1: "below-A1",
      };
      return down[tested];
    }
    return tested === "A1" ? "below-A1" : "A1";
  }
  if (percent >= 92) return "C2";
  if (percent >= 84) return "C1";
  if (percent >= 72) return "B2";
  if (percent >= 58) return "B1";
  if (percent >= 42) return "A2";
  if (percent >= 25) return "A1";
  return "below-A1";
}

export function loadRecentPairKeys(userId: string, pair: LanguagePairId, level: string): string[] {
  const all = readJson<Record<string, string[]>>(TEST_RECENT_STORAGE_KEY, {});
  return all[`${userId}:${pair}:${level}`] ?? [];
}

export function saveRecentPairKeys(
  userId: string,
  pair: LanguagePairId,
  level: string,
  keys: readonly string[],
): void {
  const all = readJson<Record<string, string[]>>(TEST_RECENT_STORAGE_KEY, {});
  all[`${userId}:${pair}:${level}`] = [...keys].slice(0, 800);
  writeJson(TEST_RECENT_STORAGE_KEY, all);
}
