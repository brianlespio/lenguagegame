import type { CSSProperties } from "react";
import { CATEGORY_COLORS, getCategoryLabel } from "../../constants";
import type { LanguagePairId, VocabularyCategory } from "../../types/vocabulary";

const ACCENT_ORDER: readonly VocabularyCategory[] = [
  "nouns",
  "verbs",
  "adjectives",
  "connectors",
  "pronouns",
  "prepositions",
  "adverbs",
  "questions",
  "positiveAnswers",
  "negativeAnswers",
  "techQuestions",
  "techAnswers",
  "openQuestions",
  "openAnswers",
  "schoolNotices",
];

interface CategoryAccentStripProps {
  activeCategory: VocabularyCategory | undefined;
  languagePair: LanguagePairId;
}

export function CategoryAccentStrip({ activeCategory, languagePair }: CategoryAccentStripProps) {
  return (
    <div className="accent-strip" aria-hidden="true">
      {ACCENT_ORDER.map((category) => (
        <div
          key={category}
          className="accent-item"
          data-active={activeCategory === category ? "true" : "false"}
          style={{ "--accent-color": CATEGORY_COLORS[category] } as CSSProperties}
        >
          <span className="accent-dot" />
          <span className="text-progress-cat">{getCategoryLabel(languagePair, category)}</span>
        </div>
      ))}
    </div>
  );
}
