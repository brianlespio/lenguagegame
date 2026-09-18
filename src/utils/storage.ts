import {
  AUTO_PLAY_INTERVALS_MS,
  DEFAULT_CEFR_FILTER,
  DEFAULT_INTERVAL_MS,
  DEFAULT_LANGUAGE_PAIR,
  DEFAULT_STUDY_MODE,
  PROGRESS_STORAGE_KEY,
  SETTINGS_STORAGE_KEY,
  STORAGE_VERSION,
} from "../constants";
import type { PersistedProgress, PersistedSettings } from "../types/vocabulary";
import { isCategoryFilter, isCefrFilter, isLanguagePairId, isStudyMode } from "./vocabulary";

interface Versioned<T> {
  version: number;
  data: T;
}

const DEFAULT_SETTINGS: PersistedSettings = {
  selectedCategory: "all",
  cefrLevel: DEFAULT_CEFR_FILTER,
  interval: DEFAULT_INTERVAL_MS,
  randomMode: false,
  languagePair: DEFAULT_LANGUAGE_PAIR,
  ttsMuted: false,
  studyMode: DEFAULT_STUDY_MODE,
};

const DEFAULT_PROGRESS: PersistedProgress = {
  lastEntryIdByCategory: {},
  learningProgress: {},
};

function isAutoPlayInterval(value: unknown): value is number {
  return typeof value === "number" && (AUTO_PLAY_INTERVALS_MS as readonly number[]).includes(value);
}

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function unwrapVersioned(value: unknown): unknown {
  if (!value || typeof value !== "object") return null;
  const record = value as { version?: unknown; data?: unknown };
  if (record.version !== STORAGE_VERSION) return null;
  return record.data ?? null;
}

function normalizeSettings(value: unknown): PersistedSettings | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Partial<PersistedSettings>;
  if (!isCategoryFilter(record.selectedCategory)) return null;
  if (!isAutoPlayInterval(record.interval)) return null;
  if (typeof record.randomMode !== "boolean") return null;
  return {
    selectedCategory: record.selectedCategory,
    cefrLevel: isCefrFilter(record.cefrLevel) ? record.cefrLevel : DEFAULT_CEFR_FILTER,
    interval: record.interval,
    randomMode: record.randomMode,
    languagePair: isLanguagePairId(record.languagePair)
      ? record.languagePair
      : DEFAULT_LANGUAGE_PAIR,
    ttsMuted: record.ttsMuted === true,
    studyMode: isStudyMode(record.studyMode) ? record.studyMode : DEFAULT_STUDY_MODE,
  };
}

function normalizeProgress(value: unknown): PersistedProgress | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Partial<PersistedProgress>;
  const lastEntryIdByCategory: PersistedProgress["lastEntryIdByCategory"] = {};
  if (record.lastEntryIdByCategory && typeof record.lastEntryIdByCategory === "object") {
    for (const [key, id] of Object.entries(record.lastEntryIdByCategory)) {
      const validKey = isCategoryFilter(key) || key.includes(":");
      if (validKey && typeof id === "string" && id.length > 0) {
        lastEntryIdByCategory[key] = id;
      }
    }
  }
  const learningProgress: PersistedProgress["learningProgress"] = {};
  if (record.learningProgress && typeof record.learningProgress === "object") {
    for (const [key, item] of Object.entries(record.learningProgress)) {
      if (!item || typeof item !== "object") continue;
      const progress = item as { vocabularyId?: unknown };
      if (typeof progress.vocabularyId === "string") {
        learningProgress[key] = {
          vocabularyId: progress.vocabularyId,
          repetitions: Number((item as { repetitions?: unknown }).repetitions) || 0,
          correctAnswers: Number((item as { correctAnswers?: unknown }).correctAnswers) || 0,
          incorrectAnswers: Number((item as { incorrectAnswers?: unknown }).incorrectAnswers) || 0,
        };
      }
    }
  }
  return { lastEntryIdByCategory, learningProgress };
}

function write(key: string, data: unknown): void {
  try {
    const payload: Versioned<unknown> = { version: STORAGE_VERSION, data };
    window.localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // Quota, private mode, or disabled storage.
  }
}

function read<T>(key: string, normalize: (value: unknown) => T | null): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return normalize(unwrapVersioned(parseJson(raw)));
  } catch {
    return null;
  }
}

export function saveSettings(settings: PersistedSettings): void {
  write(SETTINGS_STORAGE_KEY, settings);
}

export function loadSettings(): PersistedSettings {
  return read(SETTINGS_STORAGE_KEY, normalizeSettings) ?? DEFAULT_SETTINGS;
}

export function saveProgress(progress: PersistedProgress): void {
  write(PROGRESS_STORAGE_KEY, progress);
}

export function loadProgress(): PersistedProgress {
  return read(PROGRESS_STORAGE_KEY, normalizeProgress) ?? DEFAULT_PROGRESS;
}

export function getDefaultSettings(): PersistedSettings {
  return { ...DEFAULT_SETTINGS };
}

export function getDefaultProgress(): PersistedProgress {
  return {
    lastEntryIdByCategory: { ...DEFAULT_PROGRESS.lastEntryIdByCategory },
    learningProgress: { ...DEFAULT_PROGRESS.learningProgress },
  };
}
