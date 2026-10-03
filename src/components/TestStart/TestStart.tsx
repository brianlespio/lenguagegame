import { getCategoryLabel, LANGUAGE_PAIRS } from "../../constants";
import type { CategoryFilter, CefrFilter, LanguagePairId } from "../../types/vocabulary";

interface TestStartProps {
  userName: string;
  languagePair: LanguagePairId;
  category: CategoryFilter;
  cefrLevel: CefrFilter;
  total: number;
  onStart: () => void;
}

export function TestStart({ userName, languagePair, category, cefrLevel, total, onStart }: TestStartProps) {
  const pair = LANGUAGE_PAIRS.find((item) => item.id === languagePair);
  const level = cefrLevel === "all" ? "Todo" : cefrLevel;

  return (
    <article className="card quiz-card" data-mode="test">
      <p className="text-category">TEST</p>
      <p className="text-english" style={{ fontSize: "clamp(32px, 4.5vw, 72px)" }}>
        {userName}
      </p>
      <p className="text-spanish" data-revealed="true">
        {pair?.label ?? languagePair} · {getCategoryLabel(languagePair, category)} · {level} · {total} preguntas
      </p>
      <button
        type="button"
        className="nav-button nav-button-primary text-reveal focus-ring"
        onClick={onStart}
        disabled={total < 1}
      >
        START
      </button>
    </article>
  );
}
