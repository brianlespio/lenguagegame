import { useEffect } from "react";
import type { QuizChoiceKey } from "../types/quiz";
import type { StudyMode } from "../types/vocabulary";

interface UseKeyboardNavigationOptions {
  studyMode: StudyMode;
  onNext: () => void;
  onPrevious: () => void;
  onReveal: () => void;
  onTogglePlay: () => void;
  onSpeak: () => void;
  onFullscreen: () => void;
  onSelectChoice?: (key: QuizChoiceKey) => void;
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

function isButtonTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && target.closest("button, [role='button']") !== null;
}

function choiceFromKey(key: string): QuizChoiceKey | null {
  if (key === "1" || key === "a" || key === "A") return "a";
  if (key === "2" || key === "b" || key === "B") return "b";
  if (key === "3" || key === "c" || key === "C") return "c";
  if (key === "4" || key === "d" || key === "D") return "d";
  return null;
}

export function useKeyboardNavigation({
  studyMode,
  onNext,
  onPrevious,
  onReveal,
  onTogglePlay,
  onSpeak,
  onFullscreen,
  onSelectChoice,
}: UseKeyboardNavigationOptions): void {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (isEditableTarget(event.target)) return;

      const choice = choiceFromKey(event.key);
      if (studyMode === "test" && choice && onSelectChoice) {
        event.preventDefault();
        onSelectChoice(choice);
        return;
      }

      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
          event.preventDefault();
          onPrevious();
          break;
        case "r":
        case "R":
          if (studyMode === "test") return;
          event.preventDefault();
          onReveal();
          break;
        case " ":
          if (studyMode === "test") return;
          if (isButtonTarget(event.target)) return;
          event.preventDefault();
          onReveal();
          break;
        case "p":
        case "P":
          if (studyMode === "test") return;
          event.preventDefault();
          onTogglePlay();
          break;
        case "s":
        case "S":
          event.preventDefault();
          onSpeak();
          break;
        case "f":
        case "F":
          event.preventDefault();
          onFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [studyMode, onNext, onPrevious, onReveal, onTogglePlay, onSpeak, onFullscreen, onSelectChoice]);
}
