import type { ChoiceKey, QuizItem } from "../types/card";

export function QuizPanel({
  item,
  index,
  total,
  selectedKey,
  onSelect,
}: {
  item: QuizItem;
  index: number;
  total: number;
  selectedKey: ChoiceKey | null;
  onSelect: (key: ChoiceKey) => void;
}) {
  const locked = selectedKey !== null;
  return (
    <article className="card" data-axis={item.axis} data-testid="quiz-card">
      <p className="kicker">
        Pregunta {index + 1} / {total}
      </p>
      <h1 className="quiz-prompt">{item.prompt}</h1>
      <ul className="choices">
        {item.choices.map((choice) => {
          const state = !locked ? "idle" : choice.correct ? "correct" : choice.key === selectedKey ? "wrong" : "idle";
          const verdict = !locked ? "" : choice.correct ? "Correcta" : choice.key === selectedKey ? "Incorrecta" : "";
          return (
            <li key={choice.key}>
              <button
                type="button"
                className="choice"
                data-state={state}
                disabled={locked}
                onClick={() => onSelect(choice.key)}
              >
                <span className="choice-key">{choice.key}</span>
                <span>{choice.text}</span>
                {verdict ? <span className="verdict">{verdict}</span> : null}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="sr-only" role="status">
        {locked ? (item.choices.find((choice) => choice.key === selectedKey)?.correct ? "Respuesta correcta" : "Respuesta incorrecta") : "Sin responder"}
      </p>
    </article>
  );
}
