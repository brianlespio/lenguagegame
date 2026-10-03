import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mathBank } from "../data";
import { progressKey, settingsKey } from "../constants";
import type { AxisFilter, ChoiceKey, LevelFilter, MathCard, QuizItem, StudyMode } from "../types/card";
import type { TestResult } from "../types/profile";
import type { ProgressFile } from "../types/progress";
import { answerMatches } from "../utils/answer";
import { filterCards } from "../utils/filter";
import { applyOutcome, EMPTY_PROGRESS, missedCardIds, normalizeProgress } from "../utils/progress";
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

function sessionChoices(lengths: readonly number[]): number {
  if (lengths.length === 0) return 4;
  if (lengths.every((count) => count === lengths[0])) return Math.max(lengths[0] ?? 4, 2);
  const chance = lengths.reduce((sum, count) => sum + 1 / Math.max(count, 2), 0) / lengths.length;
  return 1 / chance;
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
  const [reviewing, setReviewing] = useState(false);
  const [learning, setLearning] = useState<ProgressFile["learning"]>({});
  const progressRef = useRef<ProgressFile>(EMPTY_PROGRESS);
  const skipSave = useRef(true);
  const focusRef = useRef<string | null>(null);
  const [focusNonce, setFocusNonce] = useState(0);

  const filtered = useMemo(() => filterCards(mathBank, axis, level), [axis, level]);
  const reviewIds = useMemo(
    () => new Set(missedCardIds(learning, new Set(filtered.map((card) => card.id)))),
    [learning, filtered],
  );
  const studyOrder = useMemo(() => {
    if (!shuffle) return filtered;
    return fisherYatesShuffle(filtered, mulberry32(orderSeed));
  }, [filtered, shuffle, orderSeed]);
  const ordered = useMemo(() => {
    if (!reviewing) return studyOrder;
    return studyOrder.filter((card) => reviewIds.has(card.id));
  }, [studyOrder, reviewing, reviewIds]);

  const queue = useMemo(() => buildQuizQueue(filtered, mulberry32(quizSeed)), [filtered, quizSeed]);

  useEffect(() => {
    if (!userId) return;
    skipSave.current = true;
    const settings = loadSettings(userId);
    const progress = normalizeProgress(readJson<unknown>(progressKey(userId), EMPTY_PROGRESS));
    progressRef.current = progress;
    setLearning(progress.learning);
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
      setIndex(focusIndex);
    } else {
      focusRef.current = null;
      const saved = progressRef.current.lastIdByScope[scopeKey(axis, level)];
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
    progressRef.current = {
      ...progressRef.current,
      lastIdByScope: { ...progressRef.current.lastIdByScope, [scopeKey(axis, level)]: card.id },
    };
    writeJson(progressKey(userId), progressRef.current);
  }, [hydrated, userId, index, axis, level, ordered]);

  const card: MathCard | null = ordered[index] ?? null;
  const quizItem: QuizItem | null = queue[quizIndex] ?? null;

  const goNext = useCallback(() => {
    focusRef.current = null;
    setRevealed(false);
    setStepDraft("");
    setStepStatus("idle");
    setIndex((current) => Math.min(ordered.length - 1, current + 1));
  }, [ordered.length]);

  const goPrevious = useCallback(() => {
    focusRef.current = null;
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
      const choice = item.choices.find((option) => option.key === key);
      const next = applyOutcome(progressRef.current, item.cardId, choice?.correct === true ? "hit" : "miss", new Date().toISOString());
      progressRef.current = next;
      setLearning(next.learning);
      if (userId) writeJson(progressKey(userId), next);
      setLog((current) => ({ ...current, [item.id]: key }));
    },
    [queue, quizIndex, log, userId],
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
      answered: queue.length,
      choices: sessionChoices(queue.map((item) => item.choices.length)),
    });
  }, [queue, log, axis, level]);

  const answered = queue.filter((item) => log[item.id]).length;

  return {
    axis,
    level,
    mode,
    intervalMs,
    shuffle,
    setAxis: (next: AxisFilter) => {
      focusRef.current = null;
      setAxis(next);
    },
    setLevel: (next: LevelFilter) => {
      focusRef.current = null;
      setLevel(next);
    },
    setMode: (next: StudyMode) => {
      focusRef.current = null;
      setAutoplay(false);
      setMode(next);
      if (next === "study") setTestStarted(false);
      if (next === "test") setReviewing(false);
    },
    setIntervalMs,
    toggleShuffle: () => {
      focusRef.current = null;
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
    reviewing,
    setReviewing: (next: boolean | ((value: boolean) => boolean)) => {
      focusRef.current = null;
      setReviewing(next);
    },
    clearResult: () => setTestResult(null),
    openCard: (id: string) => {
      const found = mathBank.find((item) => item.id === id);
      if (!found) return;
      setReviewing(false);
      focusRef.current = id;
      setAutoplay(false);
      setMode("study");
      setAxis(found.axis);
      setLevel(found.level);
      setFocusNonce((nonce) => nonce + 1);
    },
  };
}
