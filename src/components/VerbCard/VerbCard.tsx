import type { LanguagePairId, VerbItem } from "../../types/vocabulary";
import { getCategoryLabel, VERB_FORM_LABELS } from "../../constants";

interface VerbCardProps {
  verb: VerbItem;
  isRevealed: boolean;
  languagePair: LanguagePairId;
  spelling?: boolean;
}

export function VerbCard({ verb, isRevealed, languagePair, spelling = false }: VerbCardProps) {
  const showExample = Boolean(isRevealed && verb.example);
  const [infinitiveLabel, pastLabel, participleLabel] = VERB_FORM_LABELS[languagePair];
  const columns = [
    { key: "infinitive", label: infinitiveLabel, source: verb.infinitive, target: verb.infinitiveTranslation },
    { key: "past", label: pastLabel, source: verb.past, target: verb.pastTranslation },
    { key: "pastParticiple", label: participleLabel, source: verb.pastParticiple, target: verb.pastParticipleTranslation },
  ];

  return (
    <article className="card" data-category="verbs" data-spelling={spelling ? "true" : "false"} aria-label={`Verb ${verb.infinitive}`}>
      <p className="text-category">{getCategoryLabel(languagePair, "verbs")}</p>
      <div className="verb-grid">
        {columns.map((column) => (
          <div className="verb-column" key={column.key}>
            <h2 className="text-verb-col-label">{column.label}</h2>
            <p className="text-english-verb" data-spelling={spelling && column.key === "infinitive" ? "true" : "false"}>
              {column.source}
            </p>
            <div className="reveal-slot-verb">
              <p
                className="text-spanish-verb fade-chrome"
                aria-hidden={!isRevealed}
                data-revealed={isRevealed ? "true" : "false"}
              >
                {column.target}
              </p>
            </div>
          </div>
        ))}
      </div>
      {verb.example ? (
        <p
          className="text-example fade-chrome"
          data-revealed={showExample ? "true" : "false"}
          aria-hidden={!showExample}
        >
          {verb.example}
          {verb.exampleTranslation ? ` — ${verb.exampleTranslation}` : ""}
        </p>
      ) : null}
    </article>
  );
}
