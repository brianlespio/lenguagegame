import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getCatalog } from "../data";
import {
  DEFAULT_CEFR_FILTER,
  DEFAULT_INTERVAL_MS,
  DEFAULT_LANGUAGE_PAIR,
  DEFAULT_STUDY_MODE,
  LANGUAGE_PAIRS,
  isAlwaysRevealInterval,
} from "../constants";
import type { QuizChoiceKey, QuizItem, QuizPromptRef } from "../types/quiz";
import type {
  CategoryFilter,
  CefrFilter,
  LanguagePairId,
  LearningState,
  PersistedProgress,
  StudyMode,
  StudyScope,
  VocabularyEntry,
} from "../types/vocabulary";
import {
  buildQuizItem,
  buildTestSessionQueue,
  quizablePromptKeySet,
  sessionPairKeys,
} from "../utils/quiz";
import { loadRecentPairKeys, saveRecentPairKeys } from "../utils/profiles";
import { buildPhraseSetShuffleOrder, buildShuffleOrder } from "../utils/shuffle";
import { loadProgress, loadSettings, saveProgress, saveSettings } from "../utils/storage";
import {
  clampIndex,
  filterEntries,
  findIndexById,
  fromStudyScope,
  getProgress,
  isSetStudyCategory,
  progressSlot,
} from "../utils/vocabulary";

export interface TestRunResult {
  correct: number;
  total: number;
  percent: number;
}

interface UseVocabularyOptions {
  entries?: readonly VocabularyEntry[];
  userId?: string | null;
}

export function useVocabulary(options: UseVocabularyOptions = {}) {
  const initialSettings = useMemo(() => loadSettings(), []);
  const initialProgress = useMemo(() => loadProgress(), []);

  const [selectedCategory, setSelectedCategoryState] = useState<CategoryFilter>(
    initialSettings.selectedCategory,
  );
  const [cefrLevel, setCefrLevelState] = useState<CefrFilter>(
    initialSettings.cefrLevel || DEFAULT_CEFR_FILTER,
  );
  const [interval, setIntervalMsState] = useState(initialSettings.interval || DEFAULT_INTERVAL_MS);
  const [randomMode, setRandomModeState] = useState(initialSettings.randomMode);
  const [languagePair, setLanguagePairState] = useState<LanguagePairId>(
    initialSettings.languagePair || DEFAULT_LANGUAGE_PAIR,
  );
  const [ttsMuted, setTtsMutedState] = useState(initialSettings.ttsMuted === true);
  const [studyMode, setStudyModeState] = useState<StudyMode>(
    initialSettings.studyMode || DEFAULT_STUDY_MODE,
  );
  const [isRevealed, setIsRevealed] = useState(isAlwaysRevealInterval(initialSettings.interval));
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [orderIds, setOrderIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizNonce, setQuizNonce] = useState(0);
  const [selectedChoiceKey, setSelectedChoiceKey] = useState<QuizChoiceKey | null>(null);
  const [testStarted, setTestStarted] = useState(false);
  const [sessionQueue, setSessionQueue] = useState<QuizPromptRef[]>([]);
  const [answerCorrect, setAnswerCorrect] = useState<Record<number, boolean>>({});
  const [testResult, setTestResult] = useState<TestRunResult | null>(null);
  const userId = options.userId ?? null;
  const progressRef = useRef<PersistedProgress>(initialProgress);
  const intervalRef = useRef(interval);
  intervalRef.current = interval;
  const injectedEntries = options.entries;
  const injectedRef = useRef(injectedEntries);
  injectedRef.current = injectedEntries;
  const injectedIds =
    injectedEntries === undefined
      ? null
      : injectedEntries.map((entry) => entry.id).join("\0");

  const catalog = useMemo(() => {
    const injected = injectedRef.current;
    if (injected === undefined) return getCatalog(languagePair);
    return injected;
  }, [injectedIds, languagePair]);

  const filtered = useMemo(
    () => filterEntries(catalog, selectedCategory, cefrLevel),
    [catalog, selectedCategory, cefrLevel],
  );

  useLayoutEffect(() => {
    if (cefrLevel === "all") return;
    if (filtered.length > 0) return;
    if (filterEntries(catalog, selectedCategory, "all").length === 0) return;
    setCefrLevelState("all");
  }, [catalog, selectedCategory, cefrLevel, filtered.length]);

  const byId = useMemo(() => {
    const map = new Map<string, VocabularyEntry>();
    for (const entry of filtered) map.set(entry.id, entry);
    return map;
  }, [filtered]);

  useEffect(() => {
    const slot = progressSlot(languagePair, selectedCategory, cefrLevel);
    const lastId =
      progressRef.current.lastEntryIdByCategory[slot] ??
      (cefrLevel === "all"
        ? (progressRef.current.lastEntryIdByCategory[`${languagePair}:${selectedCategory}`] ??
          (languagePair === "en-es"
            ? progressRef.current.lastEntryIdByCategory[selectedCategory]
            : undefined))
        : undefined);
    if (randomMode) {
      const order =
        isSetStudyCategory(selectedCategory)
          ? buildPhraseSetShuffleOrder(filtered, lastId ?? null)
          : buildShuffleOrder(filtered, lastId ?? null);
      setOrderIds(order.map((entry) => entry.id));
      setCurrentIndex(0);
    } else {
      setOrderIds(filtered.map((entry) => entry.id));
      setCurrentIndex(findIndexById(filtered, lastId));
    }
    setIsRevealed(isAlwaysRevealInterval(intervalRef.current));
  }, [filtered, randomMode, selectedCategory, languagePair, cefrLevel]);

  const quizableKeys = useMemo(
    () => quizablePromptKeySet(filtered, selectedCategory),
    [filtered, selectedCategory],
  );
  const previewTotal = quizableKeys.size;

  const quizQueue = testStarted ? sessionQueue : [];

  useEffect(() => {
    setTestStarted(false);
    setSessionQueue([]);
    setQuizIndex(0);
    setSelectedChoiceKey(null);
    setAnswerCorrect({});
    setTestResult(null);
    setQuizNonce((value) => value + 1);
  }, [filtered, selectedCategory, languagePair, cefrLevel, studyMode]);

  const orderedEntries = useMemo(() => {
    const list: VocabularyEntry[] = [];
    for (const id of orderIds) {
      const entry = byId.get(id);
      if (entry) list.push(entry);
    }
    return list.length > 0 ? list : filtered;
  }, [orderIds, byId, filtered]);

  const safeIndex = clampIndex(currentIndex, orderedEntries.length);
  const currentEntry = orderedEntries[safeIndex];
  const quizSafeIndex = clampIndex(quizIndex, quizQueue.length);
  const quizProgress =
    studyMode === "test" && !testStarted
      ? { current: 0, total: previewTotal }
      : getProgress(quizSafeIndex, quizQueue.length);
  const studyProgress = getProgress(safeIndex, orderedEntries.length);
  const progress = studyMode === "test" ? quizProgress : studyProgress;

  const currentQuizItem = useMemo((): QuizItem | null => {
    void quizNonce;
    if (!testStarted) return null;
    const ref = quizQueue[quizSafeIndex];
    if (!ref) return null;
    const prompt = byId.get(ref.promptId);
    if (!prompt) return null;
    return buildQuizItem(filtered, prompt, ref.direction, {
      languagePair,
      categoryFilter: selectedCategory,
    });
  }, [quizQueue, quizSafeIndex, byId, filtered, languagePair, selectedCategory, quizNonce, testStarted]);

  useEffect(() => {
    saveSettings({
      selectedCategory,
      cefrLevel,
      interval,
      randomMode,
      languagePair,
      ttsMuted,
      studyMode,
    });
  }, [selectedCategory, cefrLevel, interval, randomMode, languagePair, ttsMuted, studyMode]);

  useEffect(() => {
    if (!currentEntry) return;
    progressRef.current = {
      ...progressRef.current,
      lastEntryIdByCategory: {
        ...progressRef.current.lastEntryIdByCategory,
        [progressSlot(languagePair, selectedCategory, cefrLevel)]: currentEntry.id,
      },
    };
    saveProgress(progressRef.current);
  }, [currentEntry, selectedCategory, languagePair, cefrLevel]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (orderedEntries.length === 0) return;
      setCurrentIndex(clampIndex(nextIndex, orderedEntries.length));
      setIsRevealed(isAlwaysRevealInterval(interval));
    },
    [orderedEntries.length, interval],
  );

  const finishTest = useCallback(() => {
    const total = sessionQueue.length;
    const correct = Object.values(answerCorrect).filter(Boolean).length;
    const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
    setTestResult({ correct, total, percent });
    if (userId) {
      saveRecentPairKeys(
        userId,
        languagePair,
        `${selectedCategory}:${cefrLevel}`,
        sessionPairKeys(filtered, sessionQueue),
      );
    }
    setTestStarted(false);
  }, [sessionQueue, answerCorrect, userId, languagePair, selectedCategory, cefrLevel, filtered]);

  const startTest = useCallback(() => {
    const recent = userId
      ? loadRecentPairKeys(userId, languagePair, `${selectedCategory}:${cefrLevel}`)
      : [];
    const queue = buildTestSessionQueue(filtered, { recentPairKeys: recent }).filter((ref) =>
      quizableKeys.has(`${ref.promptId}:${ref.direction}`),
    );
    setSessionQueue(queue);
    setTestStarted(true);
    setQuizIndex(0);
    setSelectedChoiceKey(null);
    setAnswerCorrect({});
    setTestResult(null);
    setQuizNonce((value) => value + 1);
  }, [userId, languagePair, selectedCategory, cefrLevel, filtered, quizableKeys]);

  const goNext = useCallback(() => {
    if (studyMode === "test") {
      if (!testStarted || quizQueue.length === 0) return;
      if (quizSafeIndex >= quizQueue.length - 1) {
        finishTest();
        return;
      }
      setQuizIndex(quizSafeIndex + 1);
      setSelectedChoiceKey(null);
      return;
    }
    if (orderedEntries.length === 0) return;
    if (randomMode && safeIndex >= orderedEntries.length - 1) {
      const nextOrder =
        isSetStudyCategory(selectedCategory)
          ? buildPhraseSetShuffleOrder(filtered, currentEntry?.id ?? null)
          : buildShuffleOrder(filtered, currentEntry?.id ?? null);
      setOrderIds(nextOrder.map((entry) => entry.id));
      setCurrentIndex(0);
      setIsRevealed(isAlwaysRevealInterval(interval));
      return;
    }
    goTo(safeIndex + 1);
  }, [
    studyMode,
    testStarted,
    quizQueue.length,
    quizSafeIndex,
    finishTest,
    orderedEntries.length,
    safeIndex,
    filtered,
    currentEntry,
    goTo,
    interval,
    selectedCategory,
  ]);

  const goPrevious = useCallback(() => {
    if (studyMode === "test") {
      if (!testStarted || quizQueue.length === 0) return;
      setQuizIndex(clampIndex(quizSafeIndex - 1, quizQueue.length));
      setSelectedChoiceKey(null);
      return;
    }
    if (orderedEntries.length === 0) return;
    goTo(safeIndex - 1);
  }, [studyMode, testStarted, quizQueue.length, quizSafeIndex, orderedEntries.length, safeIndex, goTo]);

  const reveal = useCallback(() => {
    if (studyMode === "test") return;
    setIsRevealed(true);
  }, [studyMode]);

  const toggleReveal = useCallback(() => {
    if (studyMode === "test") return;
    setIsRevealed((value) => !value);
  }, [studyMode]);

  const handleAutoPlayTick = useCallback(() => {
    if (studyMode === "test") return;
    if (isAlwaysRevealInterval(interval) || isRevealed) {
      goNext();
      return;
    }
    setIsRevealed(true);
  }, [studyMode, interval, isRevealed, goNext]);

  const selectQuizChoice = useCallback((key: QuizChoiceKey) => {
    if (studyMode !== "test" || !testStarted) return;
    setSelectedChoiceKey((current) => {
      if (current) return current;
      const choice = currentQuizItem?.choices.find((item) => item.key === key);
      setAnswerCorrect((map) =>
        map[quizSafeIndex] !== undefined ? map : { ...map, [quizSafeIndex]: choice?.correct === true },
      );
      return key;
    });
  }, [studyMode, testStarted, currentQuizItem, quizSafeIndex]);

  const setSelectedCategory = useCallback((category: CategoryFilter) => {
    setSelectedCategoryState(category);
    setIsAutoPlaying(false);
  }, []);

  const setStudyScope = useCallback((scope: StudyScope) => {
    const next = fromStudyScope(scope);
    setSelectedCategoryState(next.category);
    setRandomModeState(next.randomMode);
    setIsAutoPlaying(false);
  }, []);

  const setLanguagePair = useCallback((pair: LanguagePairId) => {
    const selected = LANGUAGE_PAIRS.find((item) => item.id === pair);
    if (!selected?.available) return;
    setLanguagePairState(pair);
    setIsRevealed(isAlwaysRevealInterval(interval));
    setIsAutoPlaying(false);
  }, [interval]);

  const setCefrLevel = useCallback((level: CefrFilter) => {
    setCefrLevelState(level);
    setIsRevealed(isAlwaysRevealInterval(interval));
    setIsAutoPlaying(false);
  }, [interval]);

  const setStudyMode = useCallback((mode: StudyMode) => {
    setStudyModeState(mode);
    if (mode === "test") setIsAutoPlaying(false);
    setSelectedChoiceKey(null);
    setTestStarted(false);
    setTestResult(null);
  }, []);

  const setIntervalMs = useCallback((ms: number) => {
    setIntervalMsState(ms);
    if (isAlwaysRevealInterval(ms)) setIsRevealed(true);
  }, []);

  const toggleRandomMode = useCallback(() => {
    setRandomModeState((value) => !value);
  }, []);

  const toggleTtsMute = useCallback(() => {
    setTtsMutedState((value) => !value);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    if (studyMode === "test") return;
    setIsAutoPlaying((value) => !value);
  }, [studyMode]);

  const state: LearningState = {
    currentIndex: studyMode === "test" ? quizSafeIndex : safeIndex,
    selectedCategory,
    cefrLevel,
    isRevealed,
    isAutoPlaying: studyMode === "test" ? false : isAutoPlaying,
    interval,
    randomMode,
    languagePair,
    ttsMuted,
    studyMode,
  };

  return {
    state,
    filtered,
    currentEntry,
    currentQuizItem,
    selectedChoiceKey,
    testStarted,
    testResult,
    progress,
    startTest,
    finishTest,
    goNext,
    goPrevious,
    reveal,
    toggleReveal,
    selectQuizChoice,
    handleAutoPlayTick,
    setSelectedCategory,
    setStudyScope,
    setLanguagePair,
    setCefrLevel,
    setStudyMode,
    setIntervalMs,
    toggleRandomMode,
    toggleTtsMute,
    toggleAutoPlay,
  };
}
