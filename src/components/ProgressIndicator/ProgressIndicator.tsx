import { getCategoryLabel } from "../../constants";
import type { CategoryFilter, CefrFilter, LanguagePairId } from "../../types/vocabulary";

interface ProgressIndicatorProps {
  category: CategoryFilter;
  cefrLevel: CefrFilter;
  languagePair: LanguagePairId;
  current: number;
  total: number;
  concealMeta?: boolean;
}

export function ProgressIndicator({
  category,
  cefrLevel,
  languagePair,
  current,
  total,
  concealMeta = false,
}: ProgressIndicatorProps) {
  const levelLabel = cefrLevel === "all" ? null : cefrLevel;
  return (
    <p className="progress" aria-live="polite">
      {concealMeta ? null : <span className="text-progress-cat">{getCategoryLabel(languagePair, category)}</span>}
      {concealMeta || !levelLabel ? null : <span className="text-progress-cat">{levelLabel}</span>}
      <span className="text-progress-num">
        {current} / {total}
      </span>
    </p>
  );
}
