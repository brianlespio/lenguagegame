interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenButton({ isFullscreen, onToggle }: FullscreenButtonProps) {
  return (
    <button
      type="button"
      className="control-chip text-chip focus-ring"
      onClick={onToggle}
      aria-pressed={isFullscreen}
      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      title="Fullscreen (F)"
    >
      ⛶ {isFullscreen ? "Exit" : "Fullscreen"}
    </button>
  );
}
