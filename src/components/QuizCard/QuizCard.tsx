import type { QuizChoiceKey, QuizItem } from "../../types/quiz";
import type { LanguagePairId } from "../../types/vocabulary";

export type QuizSpeechRole = "prompt" | "choice";

interface QuizCardProps {
  item: QuizItem;
  languagePair: LanguagePairId;
  selectedKey: QuizChoiceKey | null;
  onSelect: (key: QuizChoiceKey) => void;
  onSpeakTranslation?: (text: string, role: QuizSpeechRole) => void;
}

function outcomeLabel(item: QuizItem, selectedKey: QuizChoiceKey | null): string {
  if (!selectedKey) return "";
  const chosen = item.choices.find((choice) => choice.key === selectedKey);
  return chosen?.correct ? "correcta" : "incorrecta";
}

function speakOnContextMenu(
  event: React.MouseEvent,
  text: string,
  role: QuizSpeechRole,
  onSpeakTranslation?: (text: string, role: QuizSpeechRole) => void,
) {
  if (!onSpeakTranslation || !text.trim()) return;
  event.preventDefault();
  event.stopPropagation();
  onSpeakTranslation(text, role);
}

export function QuizCard({ item, selectedKey, onSelect, onSpeakTranslation }: QuizCardProps) {
  const locked = selectedKey !== null;

  return (
    <article
      className="card quiz-card"
      data-mode="test"
      data-kind={item.promptKind === "word" ? "word" : "phrase"}
      aria-label={item.prompt}
    >
      <p
        className="text-english"
        onContextMenu={(event) =>
          speakOnContextMenu(event, item.promptTranslation, "prompt", onSpeakTranslation)
        }
      >
        {item.prompt}
      </p>
      <p className="sr-only" aria-live="polite">
        {outcomeLabel(item, selectedKey)}
      </p>
      <div className="quiz-choices" data-count={item.choices.length}>
        {item.choices.map((choice) => {
          const selected = selectedKey === choice.key;
          const state =
            !locked ? "idle" : choice.correct ? "correct" : selected ? "incorrect" : "idle";
          return (
            <button
              key={choice.key}
              type="button"
              className="quiz-choice text-chip focus-ring"
              data-state={state}
              data-kind={choice.kind}
              aria-pressed={locked ? selected : undefined}
              aria-disabled={locked || undefined}
              onClick={() => {
                if (!locked) onSelect(choice.key);
              }}
              onContextMenu={(event) =>
                speakOnContextMenu(event, choice.translation, "choice", onSpeakTranslation)
              }
            >
              <span className="quiz-choice-key">{choice.key.toUpperCase()}</span>
              <span className="quiz-choice-text">{choice.text}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
