interface SpellingBoardProps {
  target: string;
  onLetter: (letter: string) => void;
}

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m", "'", "-"],
  ["é", "è", "ê", "à", "ç", "ù"],
] as const;

export function SpellingBoard({ target, onLetter }: SpellingBoardProps) {
  const needsSpace = target.includes(" ");

  return (
    <div className="spell-board" role="group" aria-label="Teclado de escritura">
      {ROWS.map((row) => (
        <div className="spell-row" key={row.join("")}>
          {row.map((letter) => (
            <button
              key={letter}
              type="button"
              className="spell-key text-chip focus-ring"
              onClick={() => onLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
      {needsSpace ? (
        <div className="spell-row">
          <button
            type="button"
            className="spell-key spell-key-space text-chip focus-ring"
            onClick={() => onLetter(" ")}
          >
            espacio
          </button>
        </div>
      ) : null}
    </div>
  );
}
