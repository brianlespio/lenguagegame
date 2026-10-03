import { LANGUAGE_PAIRS } from "../../constants";
import type { TestScore } from "../../types/profile";
import type { LanguagePairId } from "../../types/vocabulary";

interface ScoreScreenProps {
  userName: string;
  latest: TestScore | null;
  history: readonly TestScore[];
  ranking: readonly TestScore[];
  languagePair: LanguagePairId;
  onBack: () => void;
}

function pairLabel(pair: LanguagePairId): string {
  return LANGUAGE_PAIRS.find((item) => item.id === pair)?.shortLabel ?? pair;
}

function levelLabel(level: TestScore["estimatedLevel"]): string {
  if (level === "insufficient") return "Aún no hay bastante";
  if (level === "below-A1") return "bajo A1";
  return level;
}

export function ScoreScreen({ userName, latest, history, ranking, languagePair, onBack }: ScoreScreenProps) {
  return (
    <article className="card quiz-card score-screen" data-mode="test">
      <p className="text-category">SCORE</p>
      <p className="text-english" style={{ fontSize: "clamp(28px, 4vw, 64px)" }}>
        {userName}
      </p>
      {latest ? (
        <p className="text-spanish" data-revealed="true">
          {latest.percent}% · {latest.correct}/{latest.total} · {pairLabel(latest.languagePair)} ·{" "}
          {levelLabel(latest.estimatedLevel)}
        </p>
      ) : (
        <p className="text-spanish" data-revealed="true">
          Aún no hay resultados de {pairLabel(languagePair)}.
        </p>
      )}
      <div className="score-columns">
        <section>
          <h2 className="text-kicker">Historial</h2>
          <ol className="score-list">
            {history.slice(0, 8).map((score) => (
              <li key={score.id}>
                {new Date(score.at).toLocaleDateString()} · {pairLabel(score.languagePair)} · {score.cefrLevel} ·{" "}
                {score.percent}%
              </li>
            ))}
          </ol>
        </section>
        <section>
          <h2 className="text-kicker">Clasificación · {pairLabel(languagePair)}</h2>
          <ol className="score-list">
            {ranking.slice(0, 8).map((score, index) => (
              <li key={score.id}>
                {index + 1}. {score.userName} — {levelLabel(score.estimatedLevel)} —{" "}
                {score.percent}%
              </li>
            ))}
          </ol>
        </section>
      </div>
      <button type="button" className="nav-button text-chip focus-ring" onClick={onBack}>
        Volver
      </button>
    </article>
  );
}
