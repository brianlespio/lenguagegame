import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { allEntries } from "../data/englishCatalog";
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
  ReviewOutcome,
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
import { applyOutcome, missedCardIds } from "../utils/review";
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
  answered: number;
  choices: number;
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
  const [answerChoices, setAnswerChoices] = useState<Record<number, number>>({});
  const [testResult, setTestResult] = useState<TestRunResult | null>(null);
  const [reviewMisses, setReviewMisses] = useState(false);
  const [gradeNonce, setGradeNonce] = useState(0);
  const [frenchCatalog, setFrenchCatalog] = useState<VocabularyEntry[] | null>(null);
  const [catalanCatalog, setCatalanCatalog] = useState<VocabularyEntry[] | null>(null);
  const [basqueCatalog, setBasqueCatalog] = useState<VocabularyEntry[] | null>(null);
  const [germanCatalog, setGermanCatalog] = useState<VocabularyEntry[] | null>(null);
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

  useEffect(() => {
    if (injectedRef.current !== undefined) return;
    if (
      languagePair !== "fr-es" &&
      languagePair !== "ca-es" &&
      languagePair !== "eu-es" &&
      languagePair !== "de-es"
    ) {
      return;
    }
    let cancelled = false;
    if (languagePair === "fr-es") {
      void import("../data/frenchCatalog").then((mod) => {
        if (!cancelled) setFrenchCatalog(mod.frenchEntries);
      });
    } else if (languagePair === "ca-es") {
      void import("../data/catalanCatalog").then((mod) => {
        if (!cancelled) setCatalanCatalog(mod.catalanEntries);
      });
    } else if (languagePair === "eu-es") {
      void import("../data/basqueCatalog").then((mod) => {
        if (!cancelled) setBasqueCatalog(mod.basqueEntries);
      });
    } else {
      void import("../data/germanCatalog").then((mod) => {
        if (!cancelled) setGermanCatalog(mod.germanEntries);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [languagePair, injectedIds]);

  const catalogLoading =
    injectedRef.current === undefined &&
    ((languagePair === "fr-es" && frenchCatalog === null) ||
      (languagePair === "ca-es" && catalanCatalog === null) ||
      (languagePair === "eu-es" && basqueCatalog === null) ||
      (languagePair === "de-es" && germanCatalog === null));

  const catalog = useMemo(() => {
    const injected = injectedRef.current;
    if (injected !== undefined) return injected;
    if (languagePair === "fr-es") return frenchCatalog ?? [];
    if (languagePair === "ca-es") return catalanCatalog ?? [];
    if (languagePair === "eu-es") return basqueCatalog ?? [];
    if (languagePair === "de-es") return germanCatalog ?? [];
    return allEntries;
  }, [injectedIds, languagePair, frenchCatalog, catalanCatalog, basqueCatalog, germanCatalog]);

  const filtered = useMemo(
    () => filterEntries(catalog, selectedCategory, cefrLevel),
    [catalog, selectedCategory, cefrLevel],
  );
  const missedEntries = useMemo(() => {
    void gradeNonce;
    if (!userId) return [];
    const bank = new Set(catalog.map((entry) => entry.id));
    const ids = new Set(missedCardIds(progressRef.current, userId, bank));
    return catalog.filter((entry) => ids.has(entry.id));
  }, [catalog, gradeNonce, userId]);
  const studyPool = reviewMisses ? missedEntries : filtered;

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
    if (reviewMisses) {
      setOrderIds(studyPool.map((entry) => entry.id));
      setCurrentIndex(0);
    } else if (randomMode) {
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
  }, [filtered, studyPool, reviewMisses, randomMode, selectedCategory, languagePair, cefrLevel]);

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
    setAnswerChoices({});
    setTestResult(null);
    setQuizNonce((value) => value + 1);
  }, [filtered, selectedCategory, languagePair, cefrLevel, studyMode]);

  const orderedEntries = useMemo(() => {
    if (reviewMisses) return missedEntries;
    const list: VocabularyEntry[] = [];
    for (const id of orderIds) {
      const entry = byId.get(id);
      if (entry) list.push(entry);
    }
    return list.length > 0 ? list : filtered;
  }, [reviewMisses, missedEntries, orderIds, byId, filtered]);

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
    const answeredIndexes = Object.keys(answerCorrect).map(Number);
    const answered = answeredIndexes.length;
    const choiceTotal = answeredIndexes.reduce((sum, index) => sum + (answerChoices[index] ?? 4), 0);
    const choices = answered === 0 ? 4 : choiceTotal / answered;
    setTestResult({ correct, total, percent, answered, choices });
    if (userId) {
      saveRecentPairKeys(
        userId,
        languagePair,
        `${selectedCategory}:${cefrLevel}`,
        sessionPairKeys(filtered, sessionQueue),
      );
    }
    setTestStarted(false);
  }, [sessionQueue, answerCorrect, answerChoices, userId, languagePair, selectedCategory, cefrLevel, filtered]);

  const startTest = useCallback(() => {
    const recent = userId
      ? loadRecentPairKeys(userId, languagePair, `${selectedCategory}:${cefrLevel}`)
      : [];
    const queue = buildTestSessionQueue(filtered, { recentPairKeys: recent }).filter((ref) =>
      quizableKeys.has(`${ref.promptId}:${ref.direction}`),
    );
    if (queue.length === 0) return;
    setSessionQueue(queue);
    setTestStarted(true);
    setQuizIndex(0);
    setSelectedChoiceKey(null);
    setAnswerChoices({});
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

  const noteOutcome = useCallback(
    (entryId: string, outcome: ReviewOutcome) => {
      if (!userId) return;
      progressRef.current = applyOutcome(
        progressRef.current,
        userId,
        entryId,
        outcome,
        new Date().toISOString(),
      );
      saveProgress(progressRef.current);
      setGradeNonce((value) => value + 1);
    },
    [userId],
  );

  const noteSpelling = useCallback(
    (entryId: string, restarts: number) => {
      noteOutcome(entryId, restarts > 0 ? "restart" : "hit");
    },
    [noteOutcome],
  );

  const selectQuizChoice = useCallback((key: QuizChoiceKey) => {
    if (studyMode !== "test" || !testStarted || selectedChoiceKey) return;
    const choice = currentQuizItem?.choices.find((item) => item.key === key);
    const promptId = currentQuizItem?.promptId;
    if (promptId) noteOutcome(promptId, choice?.correct === true ? "hit" : "miss");
    setAnswerChoices((map) => ({ ...map, [quizSafeIndex]: currentQuizItem?.choices.length ?? 4 }));
    setSelectedChoiceKey(key);
    setAnswerCorrect((map) =>
      map[quizSafeIndex] !== undefined ? map : { ...map, [quizSafeIndex]: choice?.correct === true },
    );
  }, [studyMode, testStarted, selectedChoiceKey, currentQuizItem, quizSafeIndex, noteOutcome]);

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
    catalogLoading,
    startTest,
    finishTest,
    goNext,
    goPrevious,
    reveal,
    toggleReveal,
    selectQuizChoice,
    noteSpelling,
    reviewing: reviewMisses,
    setReviewing: setReviewMisses,
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
