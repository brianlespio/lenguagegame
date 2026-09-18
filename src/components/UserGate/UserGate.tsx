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
      <p className="text-category">USUARIO</p>
      <h1 className="text-english" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
        ¿Quién hace el test?
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
            placeholder="Rita, Brian…"
            autoComplete="nickname"
          />
        </label>
        <button type="submit" className="nav-button nav-button-primary text-reveal focus-ring">
          Registrar
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
