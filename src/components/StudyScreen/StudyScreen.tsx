import { isAlwaysRevealInterval } from "../../constants";
import { CardRenderer } from "../CardRenderer/CardRenderer";
import { CategoryAccentStrip } from "../CategoryAccentStrip/CategoryAccentStrip";
import { FullscreenButton } from "../FullscreenButton/FullscreenButton";
import { NavigationControls } from "../NavigationControls/NavigationControls";
import { PlaybackControls } from "../PlaybackControls/PlaybackControls";
import { QuizCard } from "../QuizCard/QuizCard";
import { SpeechControls } from "../SpeechControls/SpeechControls";
import { ProgressIndicator } from "../ProgressIndicator/ProgressIndicator";
import { StudyMenus } from "../StudyMenus/StudyMenus";
import type { ReactNode } from "react";
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
  const translationVisible = isRevealed || isAlwaysRevealInterval(interval);
  const liveLabel = isTest
    ? currentQuizItem
      ? currentQuizItem.prompt
      : "No cards"
    : currentEntry
      ? `${getEntryLabel(currentEntry)}${translationVisible ? " revealed" : ""}`
      : "No cards";

  return (
    <div
      className="study-shell"
      data-idle={isIdle ? "true" : "false"}
      data-instant-reveal={isAlwaysRevealInterval(interval) ? "true" : "false"}
      data-fallback-fullscreen={isFallbackFullscreen ? "true" : "false"}
      data-mode={studyMode}
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
          <CardRenderer entry={currentEntry} isRevealed={translationVisible} languagePair={languagePair} />
        )}
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
