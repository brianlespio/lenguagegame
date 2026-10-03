import { AXIS_META, KIND_LABEL, LEVEL_META } from "../constants";
import type { MathCard } from "../types/card";
import { CardFigures } from "./Figures";

const KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", "^", "(", ")", "x", "y", "w", ".", ","] as const;

const RELATION: Record<string, string> = {
  compose: "g ∘ h",
  sum: "g + h",
  product: "g · h",
};

export function MathCardView({
  card,
  revealed,
  stepDraft,
  stepStatus,
  onStepDraft,
  onCheckStep,
}: {
  card: MathCard;
  revealed: boolean;
  stepDraft: string;
  stepStatus: "idle" | "match" | "miss";
  onStepDraft: (value: string) => void;
  onCheckStep: () => void;
}) {
  const axis = AXIS_META.find((item) => item.id === card.axis)?.label ?? card.axis;
  const level = LEVEL_META.find((item) => item.id === card.level)?.label ?? card.level;
  const steps = card.steps ?? [];
  const visibleSteps = revealed ? steps : steps.slice(0, -1);

  return (
    <article className="card" data-axis={card.axis} data-testid="study-card">
      <p className="kicker">
        {axis} · {level} · {KIND_LABEL[card.kind]}
      </p>
      <h1>{card.title}</h1>
      <p className="object-name">{card.object}</p>
      <p className="face">{card.face}</p>
      <p className="definition">{card.definition}</p>
      {card.decomposition ? (
        <div className="split" data-testid="decomposition">
          <p>Partición: {RELATION[card.decomposition.relation]}</p>
          <p>g = {card.decomposition.g}</p>
          <p>h = {card.decomposition.h}</p>
        </div>
      ) : null}
      <CardFigures card={card} revealed={revealed} />
      {card.code ? (
        <pre className="code">
          <code>{card.code.source}</code>
        </pre>
      ) : null}
      {visibleSteps.length > 0 ? (
        <ol className="steps">
          {visibleSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      ) : null}
      {!revealed && steps.length > 0 ? <p className="pending">El último paso está oculto.</p> : null}
      {card.step ? (
        <form
          className="step-form"
          onSubmit={(event) => {
            event.preventDefault();
            onCheckStep();
          }}
        >
          <label>
            {card.step.ask}
            <input
              value={stepDraft}
              onChange={(event) => onStepDraft(event.target.value)}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="done"
            />
          </label>
          <div className="keypad">
            {KEYS.map((key) => (
              <button key={key} type="button" tabIndex={-1} onClick={() => onStepDraft(`${stepDraft}${key}`)}>
                {key}
              </button>
            ))}
            <button type="button" tabIndex={-1} onClick={() => onStepDraft(stepDraft.slice(0, -1))}>
              borrar
            </button>
          </div>
          <button type="submit" className="primary">
            Comprobar
          </button>
          <p className="step-status" role="status">
            {stepStatus === "match" ? "Coincide con el paso." : null}
            {stepStatus === "miss" ? "No es ese término. Puedes reescribirlo o revelar." : null}
          </p>
        </form>
      ) : null}
      {revealed ? (
        <div className="back" data-testid="card-answer">
          <p className="answer">{card.answer}</p>
          <p>{card.example}</p>
          {card.code ? <p>El programa imprime: {card.code.result}</p> : null}
          {card.decomposition ? <p>Tangente: {card.decomposition.tangent}</p> : null}
          {card.anchor ? <p>Tangente: {card.anchor.tangent}</p> : null}
          <p>
            <strong>En la IA. </strong>
            {card.whyAi}
          </p>
          <p>
            <strong>Error típico. </strong>
            {card.trap}
          </p>
        </div>
      ) : null}
    </article>
  );
}
