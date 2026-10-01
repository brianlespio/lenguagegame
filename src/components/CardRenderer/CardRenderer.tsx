import type { LanguagePairId, VocabularyEntry } from "../../types/vocabulary";
import { isVerbItem } from "../../utils/vocabulary";
import { VerbCard } from "../VerbCard/VerbCard";
import { VocabularyCard } from "../VocabularyCard/VocabularyCard";

interface CardRendererProps {
  entry: VocabularyEntry | undefined;
  isRevealed: boolean;
  languagePair: LanguagePairId;
  spelling?: boolean;
}

export function CardRenderer({ entry, isRevealed, languagePair, spelling = false }: CardRendererProps) {
  if (!entry) {
    return (
      <article className="card card-empty" aria-label="No hay cartas">
        <p className="text-category">VOCABULARIO</p>
        <p className="text-english">Sin cartas</p>
        <p className="text-spanish" data-revealed="true">
          Este filtro no tiene entradas. Prueba Nivel → Todo.
        </p>
      </article>
    );
  }

  if (isVerbItem(entry)) {
    return <VerbCard verb={entry} isRevealed={isRevealed} languagePair={languagePair} spelling={spelling} />;
  }

  return <VocabularyCard item={entry} isRevealed={isRevealed} languagePair={languagePair} spelling={spelling} />;
}
