import { useState } from "react";
import type { AppUser } from "../types/profile";

export function UserGate({
  users,
  onLanguage,
  onMath,
}: {
  users: readonly AppUser[];
  onLanguage: (name: string) => void;
  onMath: (name: string) => void;
}) {
  const [name, setName] = useState("");
  const ready = Boolean(name.trim());
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
            onChange={(event) => setName(event.target.value)}
            autoComplete="nickname"
            enterKeyHint="done"
          />
        </label>
        <p className="kicker">Elige con qué seguir</p>
        <div className="subject-choices">
          <button type="button" disabled={!ready} onClick={() => onLanguage(name)}>
            Idiomas
          </button>
          <button type="button" className="primary" disabled={!ready} onClick={() => onMath(name)}>
            Matemáticas
          </button>
        </div>
      </form>
      {users.length > 0 ? (
        <ul className="choices">
          {users.map((user) => (
            <li key={user.id}>
              <button type="button" className="choice" onClick={() => setName(user.name)}>
                <span>{user.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
