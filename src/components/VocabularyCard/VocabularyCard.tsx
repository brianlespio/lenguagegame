import type { LanguagePairId, VocabularyItem } from "../../types/vocabulary";
import { getCategoryLabel } from "../../constants";
import { isPhraseCategory } from "../../utils/vocabulary";

interface VocabularyCardProps {
  item: VocabularyItem;
  isRevealed: boolean;
  languagePair: LanguagePairId;
}

export function VocabularyCard({ item, isRevealed, languagePair }: VocabularyCardProps) {
  const showExample = Boolean(isRevealed && item.example);
  const categoryLabel = getCategoryLabel(languagePair, item.category);

  return (
    <article
      className="card"
      data-category={item.category}
      data-kind={isPhraseCategory(item.category) ? "phrase" : "word"}
      aria-label={`${categoryLabel}: ${item.term}`}
    >
      <p className="text-category">{categoryLabel}</p>
      <p className="text-english">{item.term}</p>
      <div className="reveal-slot">
        <p
          className="text-spanish fade-chrome"
          aria-hidden={!isRevealed}
          data-revealed={isRevealed ? "true" : "false"}
        >
          {item.translation}
        </p>
        {item.example ? (
          <p
            className="text-example fade-chrome"
            data-revealed={showExample ? "true" : "false"}
            aria-hidden={!showExample}
          >
            {item.example}
            {item.exampleTranslation ? ` — ${item.exampleTranslation}` : ""}
          </p>
        ) : null}
      </div>
    </article>
  );
}
