import { AUTO_PLAY_INTERVALS_MS } from "../../constants";

interface PlaybackControlsProps {
  isAutoPlaying: boolean;
  interval: number;
  onToggleAutoPlay: () => void;
  onIntervalChange: (ms: number) => void;
}

function formatInterval(ms: number): string {
  return `${ms / 1000}s`;
}

export function PlaybackControls({
  isAutoPlaying,
  interval,
  onToggleAutoPlay,
  onIntervalChange,
}: PlaybackControlsProps) {
  return (
    <div className="playback-controls">
      <button
        type="button"
        className="control-chip text-chip focus-ring"
        onClick={onToggleAutoPlay}
        aria-pressed={isAutoPlaying}
        aria-label={isAutoPlaying ? "Pause auto play" : "Start auto play"}
      >
        {isAutoPlaying ? "Pause" : "Auto Play"}
      </button>
      <div className="interval-field">
        <select
          className="control-select text-chip focus-ring"
          value={interval}
          onChange={(event) => onIntervalChange(Number(event.target.value))}
          aria-label="Auto play interval"
        >
          {AUTO_PLAY_INTERVALS_MS.map((ms) => (
            <option key={ms} value={ms}>
              {formatInterval(ms)}
            </option>
          ))}
        </select>
        <svg
          className="interval-caret"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 3.5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
