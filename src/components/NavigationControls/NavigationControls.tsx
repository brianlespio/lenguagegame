interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  onReveal: () => void;
  isRevealed: boolean;
  disabled: boolean;
  revealHidden?: boolean;
}

export function NavigationControls({
  onPrevious,
  onNext,
  onReveal,
  isRevealed,
  disabled,
  revealHidden = false,
}: NavigationControlsProps) {
  return (
    <div className="nav-controls">
      <button
        type="button"
        className="nav-button text-chip focus-ring"
        onClick={onPrevious}
        disabled={disabled}
        aria-label="Previous card"
      >
        ← Previous
      </button>
      {revealHidden ? null : (
        <button
          type="button"
          className="nav-button nav-button-primary text-reveal focus-ring"
          onClick={onReveal}
          disabled={disabled || isRevealed}
          aria-label="Reveal translation"
        >
          REVEAL
        </button>
      )}
      <button
        type="button"
        className="nav-button text-chip focus-ring"
        onClick={onNext}
        disabled={disabled}
        aria-label="Next card"
      >
        Next →
      </button>
    </div>
  );
}
