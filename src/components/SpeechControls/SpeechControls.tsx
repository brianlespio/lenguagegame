function SpeakerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 6.2v3.6h2.2L8 13V3L4.7 6.2H2.5z"
        fill="currentColor"
      />
      <path
        d="M10.2 5.4a3.2 3.2 0 0 1 0 5.2M11.8 3.8a5.4 5.4 0 0 1 0 8.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 6.2v3.6h2.2L8 13V3L4.7 6.2H2.5z" fill="currentColor" />
      <path
        d="M10.4 6.2l3.2 3.6M13.6 6.2l-3.2 3.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

interface SpeechControlsProps {
  muted: boolean;
  supported: boolean;
  disabled: boolean;
  onSpeak: () => void;
  onToggleMute: () => void;
}

export function SpeechControls({
  muted,
  supported,
  disabled,
  onSpeak,
  onToggleMute,
}: SpeechControlsProps) {
  if (!supported) return null;

  return (
    <div className="speech-controls">
      <button
        type="button"
        className="speech-speak text-chip focus-ring"
        onClick={onSpeak}
        disabled={disabled}
        aria-label="Speak term"
        title="Speak (S)"
      >
        <SpeakerIcon />
        Speak
      </button>
      <button
        type="button"
        className="speech-mute control-chip focus-ring"
        onClick={onToggleMute}
        aria-pressed={muted}
        aria-label={muted ? "Unmute pronunciation" : "Mute pronunciation"}
        title="Mute auto pronunciation"
      >
        {muted ? <SpeakerOffIcon /> : <SpeakerIcon />}
        <span className="speech-mute-label">{muted ? "Muted" : "Voice"}</span>
      </button>
    </div>
  );
}
