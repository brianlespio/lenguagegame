import { AXIS_META, LEVEL_META } from "../constants";
import type { TestScore } from "../types/profile";
import { scoreNote } from "../utils/profiles";

function axisLabel(id: TestScore["axis"]): string {
  if (id === "all") return "Todos los ejes";
  return AXIS_META.find((item) => item.id === id)?.label ?? id;
}

function levelLabel(id: TestScore["level"]): string {
  if (id === "all") return "Todos los niveles";
  return LEVEL_META.find((item) => item.id === id)?.label ?? id;
}

export function ScoreScreen({
  userName,
  latest,
  history,
  onStudy,
  onRetry,
}: {
  userName: string;
  latest: TestScore | null;
  history: readonly TestScore[];
  onStudy: () => void;
  onRetry: () => void;
}) {
  return (
    <section className="card score-card" data-testid="score-screen">
      <p className="kicker">{userName}</p>
      <h1>{latest ? `${latest.percent}%` : "Sin puntuación todavía"}</h1>
      {latest ? (
        <>
          <p className="face">
            {latest.correct} de {latest.total} · {axisLabel(latest.axis)} · {levelLabel(latest.level)}
          </p>
          <p>{scoreNote(latest.percent)}</p>
        </>
      ) : (
        <p>Cuando termines un test, el porcentaje se guarda en este navegador.</p>
      )}
      <div className="row">
        <button type="button" className="primary" onClick={onStudy}>
          Seguir estudiando
        </button>
        <button type="button" onClick={onRetry}>
          Repetir test
        </button>
      </div>
      {history.length > 0 ? (
        <ol className="history">
          {history.slice(0, 8).map((score) => (
            <li key={score.id}>
              {score.percent}% · {axisLabel(score.axis)} · {levelLabel(score.level)} · {score.correct}/{score.total}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
