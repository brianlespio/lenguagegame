import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mathBank } from "../data";
import { progressKey, settingsKey } from "../constants";
import type { AxisFilter, ChoiceKey, LevelFilter, MathCard, QuizItem, StudyMode } from "../types/card";
import type { TestResult } from "../types/profile";
import { answerMatches } from "../utils/answer";
import { filterCards } from "../utils/filter";
import { buildQuizQueue, choiceIsCorrect } from "../utils/quiz";
import { fisherYatesShuffle, mulberry32 } from "../utils/shuffle";
import { readJson, writeJson } from "../utils/storage";

interface SettingsFile {
  axis: AxisFilter;
  level: LevelFilter;
  mode: StudyMode;
  intervalMs: number;
  shuffle: boolean;
}

interface ProgressFile {
  lastIdByScope: Record<string, string>;
}

const DEFAULT_SETTINGS: SettingsFile = {
  axis: "calculus",
  level: "L1",
  mode: "study",
  intervalMs: 12000,
  shuffle: false,
};

function scopeKey(axis: AxisFilter, level: LevelFilter): string {
  return `${axis}|${level}`;
}

function loadSettings(userId: string): SettingsFile {
  const raw = readJson<Partial<SettingsFile>>(settingsKey(userId), DEFAULT_SETTINGS);
  return {
    axis: raw.axis ?? DEFAULT_SETTINGS.axis,
    level: raw.level ?? DEFAULT_SETTINGS.level,
    mode: raw.mode === "test" ? "test" : "study",
    intervalMs: raw.intervalMs === 8000 || raw.intervalMs === 20000 ? raw.intervalMs : 12000,
    shuffle: Boolean(raw.shuffle),
  };
}

export function useSession(userId: string | null) {
  const [axis, setAxis] = useState<AxisFilter>(DEFAULT_SETTINGS.axis);
  const [level, setLevel] = useState<LevelFilter>(DEFAULT_SETTINGS.level);
  const [mode, setMode] = useState<StudyMode>("study");
  const [intervalMs, setIntervalMs] = useState(12000);
  const [shuffle, setShuffle] = useState(false);
  const [orderSeed, setOrderSeed] = useState(1);
  const [hydrated, setHydrated] = useState(false);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [stepDraft, setStepDraft] = useState("");
  const [stepStatus, setStepStatus] = useState<"idle" | "match" | "miss">("idle");
  const [testStarted, setTestStarted] = useState(false);
  const [quizSeed, setQuizSeed] = useState(1);
  const [quizIndex, setQuizIndex] = useState(0);
  const [log, setLog] = useState<Record<string, ChoiceKey>>({});
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const progressRef = useRef<Record<string, string>>({});
  const skipSave = useRef(true);
  const focusRef = useRef<string | null>(null);
  const [focusNonce, setFocusNonce] = useState(0);

  const filtered = useMemo(() => filterCards(mathBank, axis, level), [axis, level]);
  const ordered = useMemo(() => {
    if (!shuffle) return filtered;
    return fisherYatesShuffle(filtered, mulberry32(orderSeed));
  }, [filtered, shuffle, orderSeed]);

  const queue = useMemo(() => buildQuizQueue(ordered, mulberry32(quizSeed)), [ordered, quizSeed]);

  useEffect(() => {
    if (!userId) return;
    skipSave.current = true;
    const settings = loadSettings(userId);
    const progress = readJson<ProgressFile>(progressKey(userId), { lastIdByScope: {} });
    progressRef.current = progress.lastIdByScope ?? {};
    setAxis(settings.axis);
    setLevel(settings.level);
    setMode(settings.mode);
    setIntervalMs(settings.intervalMs);
    setShuffle(settings.shuffle);
    setHydrated(true);
  }, [userId]);

  useEffect(() => {
    if (!hydrated || !userId) return;
    writeJson(settingsKey(userId), { axis, level, mode, intervalMs, shuffle } satisfies SettingsFile);
  }, [hydrated, userId, axis, level, mode, intervalMs, shuffle]);

  useEffect(() => {
    if (!hydrated) return;
    skipSave.current = true;
    const focus = focusRef.current;
    const focusIndex = focus ? ordered.findIndex((card) => card.id === focus) : -1;
    if (focusIndex >= 0) {
      focusRef.current = null;
      setIndex(focusIndex);
    } else {
      const saved = progressRef.current[scopeKey(axis, level)];
      const found = ordered.findIndex((card) => card.id === saved);
      setIndex(found >= 0 ? found : 0);
    }
    setRevealed(false);
    setStepDraft("");
    setStepStatus("idle");
    setTestStarted(false);
    setLog({});
    setQuizIndex(0);
    setAutoplay(false);
  }, [hydrated, userId, axis, level, ordered, focusNonce]);

  useEffect(() => {
    if (!hydrated || !userId) return;
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    const card = ordered[index];
    if (!card) return;
    progressRef.current = { ...progressRef.current, [scopeKey(axis, level)]: card.id };
    writeJson(progressKey(userId), { lastIdByScope: progressRef.current } satisfies ProgressFile);
  }, [hydrated, userId, index, axis, level, ordered]);

  const card: MathCard | null = ordered[index] ?? null;
  const quizItem: QuizItem | null = queue[quizIndex] ?? null;

  const goNext = useCallback(() => {
    setRevealed(false);
    setStepDraft("");
    setStepStatus("idle");
    setIndex((current) => Math.min(ordered.length - 1, current + 1));
  }, [ordered.length]);

  const goPrevious = useCallback(() => {
    setRevealed(false);
    setStepDraft("");
    setStepStatus("idle");
    setIndex((current) => Math.max(0, current - 1));
  }, []);

  const reveal = useCallback(() => setRevealed(true), []);

  const autoplayTick = useCallback(() => {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    if (index >= ordered.length - 1) {
      setAutoplay(false);
      return;
    }
    setRevealed(false);
    setStepDraft("");
    setStepStatus("idle");
    setIndex((current) => Math.min(ordered.length - 1, current + 1));
  }, [revealed, index, ordered.length]);

  const startTest = useCallback(() => {
    setMode("test");
    setAutoplay(false);
    setQuizSeed((Date.now() % 100000) + 1);
    setLog({});
    setQuizIndex(0);
    setTestResult(null);
    setTestStarted(true);
  }, []);

  const selectChoice = useCallback(
    (key: ChoiceKey) => {
      const item = queue[quizIndex];
      if (!item || log[item.id]) return;
      setLog((current) => ({ ...current, [item.id]: key }));
    },
    [queue, quizIndex, log],
  );

  const quizNext = useCallback(() => {
    setQuizIndex((current) => Math.min(queue.length - 1, current + 1));
  }, [queue.length]);

  const quizPrevious = useCallback(() => {
    setQuizIndex((current) => Math.max(0, current - 1));
  }, []);

  const finishTest = useCallback(() => {
    if (queue.length === 0 || queue.some((item) => !log[item.id])) return;
    const correct = queue.filter((item) => choiceIsCorrect(item, log[item.id] as ChoiceKey)).length;
    const percent = Math.round((correct / queue.length) * 100);
    setTestResult({
      id: `result-${Date.now()}`,
      axis,
      level,
      correct,
      total: queue.length,
      percent,
    });
  }, [queue, log, axis, level]);

  const answered = queue.filter((item) => log[item.id]).length;

  return {
    axis,
    level,
    mode,
    intervalMs,
    shuffle,
    setAxis,
    setLevel,
    setMode: (next: StudyMode) => {
      setAutoplay(false);
      setMode(next);
      if (next === "study") setTestStarted(false);
    },
    setIntervalMs,
    toggleShuffle: () => {
      setShuffle((current) => !current);
      setOrderSeed((seed) => seed + 1);
    },
    toggleAutoplay: () => setAutoplay((current) => !current),
    autoplay,
    card,
    index,
    total: ordered.length,
    revealed,
    goNext,
    goPrevious,
    reveal,
    autoplayTick,
    stepDraft,
    setStepDraft: (value: string) => {
      setStepDraft(value);
      setStepStatus("idle");
    },
    stepStatus,
    checkStep: () => {
      if (!card?.step) return;
      setStepStatus(answerMatches(stepDraft, card.step.expect, card.step.accept) ? "match" : "miss");
    },
    testStarted,
    startTest,
    quizItem,
    quizIndex,
    quizTotal: queue.length,
    selectedKey: quizItem ? (log[quizItem.id] ?? null) : null,
    selectChoice,
    quizNext,
    quizPrevious,
    finishTest,
    answered,
    testResult,
    clearResult: () => setTestResult(null),
    openCard: (id: string) => {
      const found = mathBank.find((item) => item.id === id);
      if (!found) return;
      focusRef.current = id;
      setAutoplay(false);
      setMode("study");
      setAxis(found.axis);
      setLevel(found.level);
      setFocusNonce((nonce) => nonce + 1);
    },
  };
}
