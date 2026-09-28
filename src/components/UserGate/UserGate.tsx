import { useState } from "react";
import type { AppUser } from "../../types/profile";

interface UserGateProps {
  users: readonly AppUser[];
  activeUserId: string | null;
  onCreate: (name: string) => void;
  onSelect: (userId: string) => void;
}

export function UserGate({ users, activeUserId, onCreate, onSelect }: UserGateProps) {
  const [name, setName] = useState("");

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
          onCreate(name);
          setName("");
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
        <button
          type="submit"
          className="nav-button nav-button-primary text-reveal focus-ring"
          disabled={!name.trim()}
        >
          Jugar
        </button>
      </form>
      {users.length > 0 ? (
        <ul className="user-gate-list">
          {users.map((user, index) => (
            <li key={user.id}>
              <button
                type="button"
                className="quiz-choice text-chip focus-ring"
                data-state={user.id === activeUserId ? "correct" : "idle"}
                onClick={() => onSelect(user.id)}
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
