import { useEffect, useRef, useState } from "react";
import type { AppUser } from "../types/profile";
import { formatPoints } from "../utils/profiles";

function nameKey(name: string): string {
  return name.trim().replace(/\s+/g, " ").toLowerCase();
}

function sharedNameKeys(users: readonly AppUser[]): Set<string> {
  const counts = new Map<string, number>();
  for (const user of users) {
    const key = nameKey(user.name);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return new Set([...counts].filter(([, count]) => count > 1).map(([key]) => key));
}

export function UserGate({
  users,
  activeUserId = null,
  pointsByUserId = {},
  onLanguage,
  onMath,
  onAddSameName,
}: {
  users: readonly AppUser[];
  activeUserId?: string | null;
  pointsByUserId?: Readonly<Record<string, number>>;
  onLanguage: (name: string, userId?: string) => void;
  onMath: (name: string, userId?: string) => void;
  onAddSameName?: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const typed = nameKey(name);
  const matches = typed ? users.filter((user) => nameKey(user.name) === typed) : [];
  const selected = users.find((user) => user.id === selectedId);
  const selectionMatches = Boolean(selected && nameKey(selected.name) === typed);
  const ambiguous = matches.length > 1 && !selectionMatches;
  const ready = Boolean(typed) && !ambiguous;
  const shared = sharedNameKeys(users);
  const seenActive = useRef(activeUserId);

  useEffect(() => {
    if (seenActive.current === activeUserId) return;
    seenActive.current = activeUserId;
    const active = users.find((user) => user.id === activeUserId);
    if (!active) return;
    setName(active.name);
    setSelectedId(active.id);
  }, [activeUserId, users]);

  function chosenId(): string | undefined {
    if (selectionMatches && selected) return selected.id;
    if (matches.length === 1) return matches[0]?.id;
    return undefined;
  }

  function enter(go: (name: string, userId?: string) => void) {
    const userId = chosenId();
    if (userId) go(name, userId);
    else go(name);
  }

  return (
    <section className="card gate">
      <p className="kicker">Nombre</p>
      <h1>¿Quién estudia?</h1>
      <form
        className="step-form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label>
          Poner tu nombre
          <input
            value={name}
            onChange={(event) => {
              const next = event.target.value;
              setName(next);
              if (selected && nameKey(selected.name) !== nameKey(next)) setSelectedId(null);
            }}
            autoComplete="nickname"
            enterKeyHint="done"
          />
        </label>
        <p className="kicker">Elige con qué seguir</p>
        {ambiguous ? <p className="kicker">Hay varios con este nombre. Elige uno para seguir con sus puntos.</p> : null}
        <div className="subject-choices">
          <button type="button" disabled={!ready} onClick={() => enter(onLanguage)}>
            Idiomas
          </button>
          <button type="button" className="primary" disabled={!ready} onClick={() => enter(onMath)}>
            Matemáticas
          </button>
        </div>
        {onAddSameName && matches.length > 0 ? (
          <button type="button" onClick={() => onAddSameName(name)}>
            Añadir otro con este nombre
          </button>
        ) : null}
      </form>
      {users.length > 0 ? (
        <ul className="choices">
          {users.map((user) => {
            const highlighted = user.id === selectedId || (matches.length === 1 && nameKey(user.name) === typed);
            const points = pointsByUserId[user.id] ?? 0;
            const showPoints = shared.has(nameKey(user.name));
            return (
              <li key={user.id}>
                <button
                  type="button"
                  className="choice"
                  data-state={highlighted ? "correct" : "idle"}
                  onClick={() => {
                    setSelectedId(user.id);
                    setName(user.name);
                  }}
                >
                  <span>{user.name}</span>
                  {showPoints ? <span className="user-points">{formatPoints(points)}</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
