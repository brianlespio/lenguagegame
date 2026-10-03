import type { AxisFilter, LevelFilter } from "./card";

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
  axis: AxisFilter;
  level: LevelFilter;
  correct: number;
  total: number;
  percent: number;
  answered?: number;
  choices?: number;
  at: string;
}

export interface TestResult {
  id: string;
  axis: AxisFilter;
  level: LevelFilter;
  correct: number;
  total: number;
  percent: number;
  answered: number;
  choices: number;
}
