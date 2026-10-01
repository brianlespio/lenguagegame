import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { isAlwaysRevealInterval } from "../../constants";
import { applySpellingLetter, playSpellingMiss, playSpellingOk, spellingTarget } from "../../utils/spelling";
import { CardRenderer } from "../CardRenderer/CardRenderer";
import { CategoryAccentStrip } from "../CategoryAccentStrip/CategoryAccentStrip";
import { FullscreenButton } from "../FullscreenButton/FullscreenButton";
import { NavigationControls } from "../NavigationControls/NavigationControls";
import { PlaybackControls } from "../PlaybackControls/PlaybackControls";
import { QuizCard } from "../QuizCard/QuizCard";
import { SpeechControls } from "../SpeechControls/SpeechControls";
import { SpellingBoard } from "../SpellingBoard/SpellingBoard";
import { ProgressIndicator } from "../ProgressIndicator/ProgressIndicator";
import { StudyMenus } from "../StudyMenus/StudyMenus";
import type { QuizChoiceKey, QuizItem } from "../../types/quiz";
import type { QuizSpeechRole } from "../QuizCard/QuizCard";
import type {
  CategoryFilter,
  CefrFilter,
  LanguagePairId,
  StudyMode,
  StudyScope,
  VocabularyEntry,
} from "../../types/vocabulary";
import { getEntryLabel } from "../../utils/vocabulary";

function KeyboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="4" width="13" height="8.5" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 6.4h1.2M7.4 6.4H8.6M10.8 6.4H12M4 8.6h1.2M7.4 8.6H8.6M10.8 8.6H12M5.4 10.8h5.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface StudyScreenProps {
  category: CategoryFilter;
  currentEntry: VocabularyEntry | undefined;
  currentQuizItem: QuizItem | null;
  selectedChoiceKey: QuizChoiceKey | null;
  studyMode: StudyMode;
  isRevealed: boolean;
  isAutoPlaying: boolean;
  interval: number;
  randomMode: boolean;
  languagePair: LanguagePairId;
  cefrLevel: CefrFilter;
  ttsMuted: boolean;
  ttsSupported: boolean;
  progress: { current: number; total: number };
  isFullscreen: boolean;
  isIdle: boolean;
  isFallbackFullscreen: boolean;
  onScopeChange: (scope: StudyScope) => void;
  onLanguageChange: (pair: LanguagePairId) => void;
  onCefrChange: (level: CefrFilter) => void;
  onStudyModeChange: (mode: StudyMode) => void;
  onPrevious: () => void;
  onNext: () => void;
  onReveal: () => void;
  onSelectChoice: (key: QuizChoiceKey) => void;
  onSpeakTranslation?: (text: string, role: QuizSpeechRole) => void;
  onToggleAutoPlay: () => void;
  onIntervalChange: (ms: number) => void;
  onSpeak: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  userName?: string;
  stage?: ReactNode;
  onOpenScore?: () => void;
  onSwitchUser?: () => void;
}

export function StudyScreen({
  category,
  currentEntry,
  currentQuizItem,
  selectedChoiceKey,
  studyMode,
  isRevealed,
  isAutoPlaying,
  interval,
  randomMode,
  languagePair,
  cefrLevel,
  ttsMuted,
  ttsSupported,
  progress,
  isFullscreen,
  isIdle,
  isFallbackFullscreen,
  onScopeChange,
  onLanguageChange,
  onCefrChange,
  onStudyModeChange,
  onPrevious,
  onNext,
  onReveal,
  onSelectChoice,
  onSpeakTranslation,
  onToggleAutoPlay,
  onIntervalChange,
  onSpeak,
  onToggleMute,
  onToggleFullscreen,
  userName,
  stage,
  onOpenScore,
  onSwitchUser,
}: StudyScreenProps) {
  const isTest = studyMode === "test";
  const target = spellingTarget(currentEntry);
  const [spellingOn, setSpellingOn] = useState(false);
  const [typed, setTyped] = useState("");
  const typedRef = useRef("");
  const translationVisible = isRevealed || isAlwaysRevealInterval(interval);
  const liveLabel = isTest
    ? currentQuizItem
      ? currentQuizItem.prompt
      : "No cards"
      : currentEntry
      ? `${getEntryLabel(currentEntry)}${translationVisible ? " revealed" : ""}`
      : "No cards";

  useEffect(() => {
    typedRef.current = "";
    setTyped("");
  }, [currentEntry?.id]);

  useEffect(() => {
    if (isTest || !target) setSpellingOn(false);
  }, [isTest, target]);

  const takeLetter = useCallback(
    (letter: string) => {
      if (!spellingOn || !target) return;
      const result = applySpellingLetter(target, typedRef.current, letter);
      if (result === "ignore") return;
      if (result === "restart") {
        playSpellingMiss();
        typedRef.current = "";
        setTyped("");
        return;
      }
      if (result === "complete") {
        playSpellingOk();
        typedRef.current = "";
        setTyped("");
        onNext();
        return;
      }
      typedRef.current += letter;
      setTyped(typedRef.current);
    },
    [onNext, spellingOn, target],
  );

  useEffect(() => {
    if (!spellingOn) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        setSpellingOn(false);
        return;
      }
      if (event.key.length !== 1) return;
      event.preventDefault();
      event.stopPropagation();
      takeLetter(event.key);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [spellingOn, takeLetter]);

  return (
    <div
      className="study-shell"
      data-idle={isIdle ? "true" : "false"}
      data-instant-reveal={isAlwaysRevealInterval(interval) ? "true" : "false"}
      data-fallback-fullscreen={isFallbackFullscreen ? "true" : "false"}
      data-mode={studyMode}
      data-spelling={spellingOn ? "true" : "false"}
    >
      <div className="study-glow" aria-hidden="true" />

      <header className="study-header">
        <div className="study-chrome study-header-left fade-chrome">
          <ProgressIndicator
            category={category}
            cefrLevel={cefrLevel}
            languagePair={languagePair}
            current={progress.current}
            total={progress.total}
            concealMeta={isTest}
          />
          {!isTest && isAutoPlaying ? (
            <span className="autoplay-badge" aria-live="polite">
              AUTO {interval / 1000}s
            </span>
          ) : null}
          {userName ? <span className="autoplay-badge">{userName}</span> : null}
        </div>
        <StudyMenus
          category={category}
          randomMode={randomMode}
          languagePair={languagePair}
          cefrLevel={cefrLevel}
          studyMode={studyMode}
          onScopeChange={onScopeChange}
          onLanguageChange={onLanguageChange}
          onCefrChange={onCefrChange}
          onStudyModeChange={onStudyModeChange}
        />
      </header>

      <main className="study-stage">
        <p className="sr-only" aria-live="polite">
          {liveLabel}
        </p>
        {stage ? (
          stage
        ) : isTest ? (
          currentQuizItem ? (
            <QuizCard
              item={currentQuizItem}
              languagePair={languagePair}
              selectedKey={selectedChoiceKey}
              onSelect={onSelectChoice}
              onSpeakTranslation={onSpeakTranslation}
            />
          ) : (
            <CardRenderer entry={undefined} isRevealed languagePair={languagePair} />
          )
        ) : (
          <CardRenderer
            entry={currentEntry}
            isRevealed={translationVisible}
            languagePair={languagePair}
            spelling={spellingOn}
          />
        )}
        {spellingOn && target ? (
          <>
            <p className="spell-typed" aria-live="polite">
              {target.slice(0, typed.length)}
              <span className="spell-caret" aria-hidden="true">
                |
              </span>
            </p>
            <SpellingBoard target={target} onLetter={takeLetter} />
          </>
        ) : null}
      </main>

      <footer className="study-chrome study-footer fade-chrome">
        <NavigationControls
          onPrevious={onPrevious}
          onNext={onNext}
          onReveal={onReveal}
          isRevealed={translationVisible}
          disabled={progress.total === 0}
          revealHidden={isTest}
        />
        <div className="study-secondary">
          {isTest ? null : (
            <PlaybackControls
              isAutoPlaying={isAutoPlaying}
              interval={interval}
              onToggleAutoPlay={onToggleAutoPlay}
              onIntervalChange={onIntervalChange}
            />
          )}
          <SpeechControls
            muted={ttsMuted}
            supported={ttsSupported}
            disabled={isTest ? !currentQuizItem : !currentEntry}
            onSpeak={onSpeak}
            onToggleMute={onToggleMute}
          />
          {isTest ? null : (
            <button
              type="button"
              className="control-chip text-chip focus-ring"
              onClick={() => {
                if (spellingOn) {
                  setSpellingOn(false);
                  return;
                }
                if (!target) return;
                if (isAutoPlaying) onToggleAutoPlay();
                typedRef.current = "";
                setTyped("");
                setSpellingOn(true);
                onSpeak();
              }}
              disabled={!target}
              aria-pressed={spellingOn}
              aria-label="Practicar escritura"
              title="Escribir la palabra letra a letra"
            >
              <KeyboardIcon />
              Teclado
            </button>
          )}
          <FullscreenButton isFullscreen={isFullscreen} onToggle={onToggleFullscreen} />
          {onOpenScore ? (
            <button type="button" className="control-chip text-chip focus-ring" onClick={onOpenScore}>
              SCORE
            </button>
          ) : null}
          {onSwitchUser ? (
            <button type="button" className="control-chip text-chip focus-ring" onClick={onSwitchUser}>
              Cambiar nombre
            </button>
          ) : null}
        </div>
        {isTest ? null : (
          <p className="text-hint">← → navigate · R reveal · P play · S speak · F fullscreen</p>
        )}
        {isTest ? null : (
          <CategoryAccentStrip activeCategory={currentEntry?.category} languagePair={languagePair} />
        )}
      </footer>
    </div>
  );
}
