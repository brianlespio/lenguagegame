import { useEffect, useId, useRef } from "react";

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface CollapsibleOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
  disabled?: boolean;
  group?: string;
}

interface CollapsibleSelectProps<T extends string> {
  label: string;
  value: T;
  options: readonly CollapsibleOption<T>[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (value: T) => void;
}

export function CollapsibleSelect<T extends string>({
  label,
  value,
  options,
  open,
  onOpenChange,
  onChange,
}: CollapsibleSelectProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value);
  const display = selected?.label ?? label;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <div className="fold-select" ref={rootRef} data-open={open ? "true" : "false"}>
      <button
        type="button"
        className="fold-trigger focus-ring"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={label}
        onClick={() => onOpenChange(!open)}
      >
        <span className="text-kicker">{label}</span>
        <span className="text-menu-value">{display}</span>
        <span className="fold-caret">
          <ChevronIcon />
        </span>
      </button>
      {open ? (
        <ul className="fold-menu" id={listId} role="listbox" aria-label={label}>
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const previous = options[index - 1];
            const showGroup = Boolean(option.group && option.group !== previous?.group);
            return (
              <li key={option.value} role="none">
                {showGroup ? (
                  <p className="fold-group" role="presentation">
                    {option.group}
                  </p>
                ) : null}
                <button
                  type="button"
                  className="fold-option text-chip focus-ring"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onClick={() => {
                    if (option.disabled) return;
                    onChange(option.value);
                    onOpenChange(false);
                  }}
                >
                  <span>{option.label}</span>
                  {option.hint ? <span className="fold-hint">{option.hint}</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
