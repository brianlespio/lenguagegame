import type { CategoryFilter, CefrFilter, LanguagePairId, StudyCefrLevel } from "./vocabulary";

export interface AppUser {
  id: string;
  name: string;
  createdAt: string;
}

export interface UserStore {
  activeUserId: string | null;
  users: AppUser[];
}

export interface TestScore {
  id: string;
  userId: string;
  userName: string;
  languagePair: LanguagePairId;
  cefrLevel: CefrFilter;
  category: CategoryFilter;
  correct: number;
  total: number;
  percent: number;
  estimatedLevel: StudyCefrLevel | "below-A1";
  at: string;
}

export type TestPhase = "gate" | "ready" | "running" | "result" | "score";
