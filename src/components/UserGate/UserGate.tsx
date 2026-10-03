import { useState } from "react";
import type { AppUser } from "../../types/profile";

interface UserGateProps {
  users: readonly AppUser[];
  activeUserId: string | null;
  onLanguage: (name: string) => void;
  onMath: (name: string) => void;
}

export function UserGate({ users, activeUserId, onLanguage, onMath }: UserGateProps) {
  const [name, setName] = useState("");
  const ready = Boolean(name.trim());

  return (
    <div className="user-gate">
      <p className="text-category">NOMBRE</p>
      <h1 className="text-english" style={{ fontSize: "clamp(32px, 8vw, 72px)" }}>
        ¿Quién juega?
      </h1>
      <form
        className="user-gate-form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label className="user-gate-field">
          <span className="text-kicker">Poner tu nombre</span>
          <input
            className="user-gate-input focus-ring"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Tu nombre"
            autoComplete="nickname"
            enterKeyHint="done"
          />
        </label>
        <p className="text-kicker">Elige con qué seguir</p>
        <div className="subject-choices">
          <button
            type="button"
            className="nav-button nav-button-primary text-reveal focus-ring"
            disabled={!ready}
            onClick={() => onLanguage(name)}
          >
            Idiomas
          </button>
          <button
            type="button"
            className="nav-button nav-button-primary text-reveal focus-ring"
            disabled={!ready}
            onClick={() => onMath(name)}
          >
            Matemáticas
          </button>
        </div>
      </form>
      {users.length > 0 ? (
        <ul className="user-gate-list">
          {users.map((user, index) => (
            <li key={user.id}>
              <button
                type="button"
                className="quiz-choice text-chip focus-ring"
                data-state={user.id === activeUserId || user.name === name.trim() ? "correct" : "idle"}
                onClick={() => setName(user.name)}
              >
                <span className="quiz-choice-key">Usuario {index + 1}</span>
                <span className="quiz-choice-text">{user.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
