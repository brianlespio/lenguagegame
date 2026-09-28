import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScoreScreen } from "../components/ScoreScreen/ScoreScreen";
import { StudyScreen } from "../components/StudyScreen/StudyScreen";
import { TestStart } from "../components/TestStart/TestStart";
import { UserGate } from "../components/UserGate/UserGate";
import { TTS_PHRASE_RATE, TTS_RATE, isTtsAutoplayInterval } from "../constants";
import { useAutoPlay } from "../hooks/useAutoPlay";
import { useFullscreen } from "../hooks/useFullscreen";
import { useIdleControls } from "../hooks/useIdleControls";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { useSpeech } from "../hooks/useSpeech";
import { useVocabulary } from "../hooks/useVocabulary";
import type { AppUser, TestScore, UserStore } from "../types/profile";
import {
  addScore,
  createUser,
  estimateLevel,
  loadScores,
  loadUserStore,
  saveScores,
  saveUserStore,
  scoresForUser,
  selectUser,
} from "../utils/profiles";
import type { QuizSpeechRole } from "../components/QuizCard/QuizCard";
import { ttsLangForChoiceTranslation, ttsLangForQuiz, ttsLangForQuizTranslation } from "../utils/speech";

function rankingForPair(scores: readonly TestScore[], pair: TestScore["languagePair"]): TestScore[] {
  const best = new Map<string, TestScore>();
  for (const score of scores) {
    if (score.languagePair !== pair) continue;
    const current = best.get(score.userId);
    if (!current || score.percent > current.percent) best.set(score.userId, score);
  }
  return [...best.values()].sort((left, right) => right.percent - left.percent);
}

export function App() {
  const [userStore, setUserStore] = useState<UserStore>(() => loadUserStore());
  const [scores, setScores] = useState<TestScore[]>(() => loadScores());
  const [showScore, setShowScore] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const activeUser: AppUser | undefined = userStore.users.find((user) => user.id === userStore.activeUserId);

  const vocabulary = useVocabulary({ userId: activeUser?.id ?? null });
  const fullscreen = useFullscreen();
  const idle = useIdleControls();
  const speech = useSpeech();
  const speechRef = useRef(speech);
  speechRef.current = speech;
  const entry = vocabulary.currentEntry;
  const quizItem = vocabulary.currentQuizItem;
  const { isAutoPlaying, interval, ttsMuted, languagePair, studyMode } = vocabulary.state;
  const autoplayOn = studyMode === "study" && isAutoPlaying;

  useEffect(() => {
    saveUserStore(userStore);
  }, [userStore]);

  useAutoPlay({
    enabled: autoplayOn,
    interval,
    onTick: vocabulary.handleAutoPlayTick,
  });

  useEffect(() => {
    if (studyMode === "test" || !entry || ttsMuted || !autoplayOn || !isTtsAutoplayInterval(interval)) {
      speechRef.current.cancel();
      return;
    }
    speechRef.current.speakEntry(entry, languagePair, interval);
    return () => speechRef.current.cancel();
  }, [entry, entry?.id, autoplayOn, interval, ttsMuted, languagePair, studyMode]);

  const speakNow = useCallback(() => {
    if (studyMode === "test") {
      if (!quizItem) return;
      const rate = quizItem.promptKind === "phrase" ? TTS_PHRASE_RATE : TTS_RATE;
      speechRef.current.speakText(quizItem.prompt, ttsLangForQuiz(languagePair, quizItem.direction), rate);
      return;
    }
    if (!entry) return;
    speechRef.current.speakEntry(entry, languagePair, interval);
  }, [studyMode, quizItem, entry, languagePair, interval]);

  const speakTranslation = useCallback(
    (text: string, role: QuizSpeechRole) => {
      if (!quizItem) return;
      const rate = quizItem.promptKind === "phrase" ? TTS_PHRASE_RATE : TTS_RATE;
      const lang =
        role === "prompt"
          ? ttsLangForQuizTranslation(languagePair, quizItem.direction)
          : ttsLangForChoiceTranslation(languagePair, quizItem.direction);
      speechRef.current.speakText(text, lang, rate);
    },
    [quizItem, languagePair],
  );

  useKeyboardNavigation({
    studyMode,
    onNext: vocabulary.goNext,
    onPrevious: vocabulary.goPrevious,
    onReveal: vocabulary.reveal,
    onTogglePlay: vocabulary.toggleAutoPlay,
    onSpeak: speakNow,
    onFullscreen: fullscreen.toggle,
    onSelectChoice: vocabulary.selectQuizChoice,
  });

  const savedResultRef = useRef<typeof vocabulary.testResult>(null);

  useEffect(() => {
    const result = vocabulary.testResult;
    if (!result || !activeUser || savedResultRef.current === result) return;
    savedResultRef.current = result;
    const score: TestScore = {
      id: `score-${Date.now()}`,
      userId: activeUser.id,
      userName: activeUser.name,
      languagePair,
      cefrLevel: vocabulary.state.cefrLevel,
      category: vocabulary.state.selectedCategory,
      correct: result.correct,
      total: result.total,
      percent: result.percent,
      estimatedLevel: estimateLevel(result.percent, vocabulary.state.cefrLevel === "all" ? "all" : vocabulary.state.cefrLevel),
      at: new Date().toISOString(),
    };
    setScores((current) => {
      const next = addScore(current, score);
      saveScores(next);
      return next;
    });
    setShowScore(true);
  }, [vocabulary.testResult, activeUser, languagePair, vocabulary.state.cefrLevel, vocabulary.state.selectedCategory]);

  const history = useMemo(
    () => (activeUser ? scoresForUser(scores, activeUser.id) : []),
    [scores, activeUser],
  );
  const latest = history[0] ?? null;
  const ranking = useMemo(() => rankingForPair(scores, languagePair), [scores, languagePair]);

  if (!activeUser || !playerReady) {
    return (
      <div className="study-shell">
        <main className="study-stage">
          <UserGate
            users={userStore.users}
            activeUserId={userStore.activeUserId}
            onCreate={(name) => {
              if (!name.trim()) return;
              setUserStore((store) => createUser(store, name));
              setPlayerReady(true);
            }}
            onSelect={(userId) => {
              setUserStore((store) => selectUser(store, userId));
              setPlayerReady(true);
            }}
          />
        </main>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="study-shell">
        <main className="study-stage">
          <ScoreScreen
            userName={activeUser.name}
            latest={latest}
            history={history}
            ranking={ranking}
            languagePair={languagePair}
            onBack={() => setShowScore(false)}
          />
        </main>
      </div>
    );
  }

  if (studyMode === "test" && !vocabulary.testStarted) {
    return (
      <StudyScreen
        category={vocabulary.state.selectedCategory}
        currentEntry={entry}
        currentQuizItem={null}
        selectedChoiceKey={null}
        studyMode={studyMode}
        isRevealed={false}
        isAutoPlaying={false}
        interval={vocabulary.state.interval}
        randomMode={vocabulary.state.randomMode}
        languagePair={vocabulary.state.languagePair}
        cefrLevel={vocabulary.state.cefrLevel}
        ttsMuted={vocabulary.state.ttsMuted}
        ttsSupported={speech.supported}
        progress={vocabulary.progress}
        isFullscreen={fullscreen.isFullscreen}
        isIdle={idle.isIdle}
        isFallbackFullscreen={fullscreen.isFallbackActive}
        userName={activeUser.name}
        stage={
          <TestStart
            userName={activeUser.name}
            languagePair={languagePair}
            category={vocabulary.state.selectedCategory}
            cefrLevel={vocabulary.state.cefrLevel}
            total={vocabulary.progress.total}
            onStart={vocabulary.startTest}
          />
        }
        onScopeChange={vocabulary.setStudyScope}
        onLanguageChange={vocabulary.setLanguagePair}
        onCefrChange={vocabulary.setCefrLevel}
        onStudyModeChange={vocabulary.setStudyMode}
        onPrevious={vocabulary.goPrevious}
        onNext={vocabulary.goNext}
        onReveal={vocabulary.reveal}
        onSelectChoice={vocabulary.selectQuizChoice}
        onSpeakTranslation={speakTranslation}
        onToggleAutoPlay={vocabulary.toggleAutoPlay}
        onIntervalChange={vocabulary.setIntervalMs}
        onSpeak={speakNow}
        onToggleMute={vocabulary.toggleTtsMute}
        onToggleFullscreen={fullscreen.toggle}
        onOpenScore={() => setShowScore(true)}
        onSwitchUser={() => setPlayerReady(false)}
      />
    );
  }

  return (
    <StudyScreen
      category={vocabulary.state.selectedCategory}
      currentEntry={entry}
      currentQuizItem={quizItem}
      selectedChoiceKey={vocabulary.selectedChoiceKey}
      studyMode={studyMode}
      isRevealed={vocabulary.state.isRevealed}
      isAutoPlaying={autoplayOn}
      interval={vocabulary.state.interval}
      randomMode={vocabulary.state.randomMode}
      languagePair={vocabulary.state.languagePair}
      cefrLevel={vocabulary.state.cefrLevel}
      ttsMuted={vocabulary.state.ttsMuted}
      ttsSupported={speech.supported}
      progress={vocabulary.progress}
      isFullscreen={fullscreen.isFullscreen}
      isIdle={idle.isIdle}
      isFallbackFullscreen={fullscreen.isFallbackActive}
      userName={activeUser.name}
      onScopeChange={vocabulary.setStudyScope}
      onLanguageChange={vocabulary.setLanguagePair}
      onCefrChange={vocabulary.setCefrLevel}
      onStudyModeChange={vocabulary.setStudyMode}
      onPrevious={vocabulary.goPrevious}
      onNext={vocabulary.goNext}
      onReveal={vocabulary.reveal}
      onSelectChoice={vocabulary.selectQuizChoice}
      onSpeakTranslation={speakTranslation}
      onToggleAutoPlay={vocabulary.toggleAutoPlay}
      onIntervalChange={vocabulary.setIntervalMs}
      onSpeak={speakNow}
      onToggleMute={vocabulary.toggleTtsMute}
      onToggleFullscreen={fullscreen.toggle}
      onOpenScore={() => setShowScore(true)}
        onSwitchUser={() => setPlayerReady(false)}
    />
  );
}
