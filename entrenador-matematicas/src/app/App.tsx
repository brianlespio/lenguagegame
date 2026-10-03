import { useEffect, useRef, useState } from "react";
import { MathCardView } from "../components/MathCardView";
import { QuizPanel } from "../components/QuizPanel";
import { ScoreScreen } from "../components/ScoreScreen";
import { SubjectBoard } from "../components/SubjectBoard";
import { UserGate } from "../components/UserGate";
import { AXIS_META, INTERVALS, LEVEL_META } from "../constants";
import { useSession } from "../hooks/useSession";
import type { AxisFilter, ChoiceKey, LevelFilter, StudyMode } from "../types/card";
import type { TestScore } from "../types/profile";
import {
  addScore,
  createUser,
  loadScores,
  loadUserStore,
  saveScores,
  saveUserStore,
  scoresForUser,
} from "../utils/profiles";
import { consumeEntryName, subjectUrl } from "../utils/subjectDoor";

function isTypingTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && Boolean(target.closest("input, textarea, select"));
}

export function App() {
  const [entryName] = useState(consumeEntryName);
  const [store, setStore] = useState(() => {
    const loaded = loadUserStore();
    return entryName ? createUser(loaded, entryName) : loaded;
  });
  const [scores, setScores] = useState(loadScores);
  const [playerReady, setPlayerReady] = useState(() => Boolean(entryName));
  const [showScore, setShowScore] = useState(false);
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const user = store.users.find((item) => item.id === store.activeUserId);
  const session = useSession(user?.id ?? null);
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const savedResult = useRef<string | null>(null);

  useEffect(() => {
    saveUserStore(store);
  }, [store]);

  useEffect(() => {
    const result = session.testResult;
    if (!result || !user || savedResult.current === result.id) return;
    savedResult.current = result.id;
    const score: TestScore = {
      id: result.id,
      userId: user.id,
      userName: user.name,
      axis: result.axis,
      level: result.level,
      correct: result.correct,
      total: result.total,
      percent: result.percent,
      answered: result.answered,
      choices: result.choices,
      at: new Date().toISOString(),
    };
    setScores((current) => {
      const next = addScore(current, score);
      saveScores(next);
      return next;
    });
    setShowScore(true);
  }, [session.testResult, user]);

  useEffect(() => {
    if (!(session.mode === "study" && session.autoplay)) return;
    const id = window.setInterval(() => sessionRef.current.autoplayTick(), session.intervalMs);
    return () => window.clearInterval(id);
  }, [session.mode, session.autoplay, session.intervalMs]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const current = sessionRef.current;
      const typing = isTypingTarget(event.target);
      if (event.key === "ArrowRight") {
        if (typing) return;
        event.preventDefault();
        if (current.mode === "test" && current.testStarted) current.quizNext();
        else current.goNext();
      } else if (event.key === "ArrowLeft") {
        if (typing) return;
        event.preventDefault();
        if (current.mode === "test" && current.testStarted) current.quizPrevious();
        else current.goPrevious();
      } else if ((event.key === " " || event.key === "r" || event.key === "R") && !typing) {
        if (current.mode !== "study") return;
        event.preventDefault();
        current.reveal();
      } else if ((event.key === "p" || event.key === "P") && !typing && current.mode === "study") {
        current.toggleAutoplay();
      } else if (current.mode === "test" && current.testStarted && !typing) {
        const map: Record<string, ChoiceKey | undefined> = { a: "a", b: "b", c: "c", d: "d", "1": "a", "2": "b", "3": "c", "4": "d" };
        const key = map[event.key.toLowerCase()];
        if (key) current.selectChoice(key);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const history = user ? scoresForUser(scores, user.id) : [];
  const latest = history[0] ?? null;

  if (!user || !playerReady) {
    return (
      <div className="shell">
        <main className="stage">
          <UserGate
            users={store.users}
            onLanguage={(name) => {
              if (!name.trim()) return;
              window.location.assign(subjectUrl("language", name));
            }}
            onMath={(name) => {
              if (!name.trim()) return;
              setStore((current) => createUser(current, name));
              setPlayerReady(true);
            }}
          />
        </main>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="shell">
        <main className="stage">
          <ScoreScreen
            userName={user.name}
            latest={latest}
            history={history}
            onStudy={() => {
              setShowScore(false);
              session.clearResult();
              session.setMode("study");
            }}
            onRetry={() => {
              setShowScore(false);
              session.clearResult();
              session.startTest();
            }}
          />
        </main>
      </div>
    );
  }

  const inQuiz = session.mode === "test" && session.testStarted && session.quizItem;
  const allAnswered = session.quizTotal > 0 && session.answered === session.quizTotal;

  return (
    <div className="shell">
      <header className="topbar">
        <p className="who">{user.name}</p>
        <label>
          Eje
          <select
            aria-label="Eje"
            value={session.axis}
            onChange={(event) => session.setAxis(event.target.value as AxisFilter)}
          >
            {AXIS_META.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
            <option value="all">Todos</option>
          </select>
        </label>
        <label>
          Nivel
          <select
            aria-label="Nivel"
            value={session.level}
            onChange={(event) => session.setLevel(event.target.value as LevelFilter)}
          >
            {LEVEL_META.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
            <option value="all">Todos</option>
          </select>
        </label>
        <label>
          Modo
          <select
            aria-label="Modo"
            value={session.mode}
            onChange={(event) => session.setMode(event.target.value as StudyMode)}
          >
            <option value="study">Estudiar</option>
            <option value="test">Test</option>
          </select>
        </label>
        <button type="button" onClick={() => setSubjectsOpen(true)}>
          Asignaturas
        </button>
        <button type="button" onClick={() => setShowScore(true)}>
          Puntuación
        </button>
        <button type="button" onClick={() => setPlayerReady(false)}>
          Cambiar
        </button>
      </header>
      <main className="stage">
        {subjectsOpen ? (
          <SubjectBoard
            subjectId={subjectId}
            onOpen={setSubjectId}
            onClose={() => setSubjectId(null)}
            onStudyCard={(cardId) => {
              session.openCard(cardId);
              setSubjectsOpen(false);
              setSubjectId(null);
            }}
          />
        ) : null}
        {!subjectsOpen && session.mode === "test" && !session.testStarted ? (
          <section className="card">
            <p className="kicker">Test</p>
            <h1>Cuenta, no definiciones</h1>
            <p className="face">
              {session.total} cartas, {session.total * 2} preguntas. Una correcta. A veces la última dice «Ninguna de las anteriores».
            </p>
            <button type="button" className="primary" onClick={session.startTest} disabled={session.total === 0}>
              Empezar
            </button>
          </section>
        ) : null}
        {!subjectsOpen && inQuiz && session.quizItem ? (
          <QuizPanel
            item={session.quizItem}
            index={session.quizIndex}
            total={session.quizTotal}
            selectedKey={session.selectedKey}
            onSelect={session.selectChoice}
          />
        ) : null}
        {!subjectsOpen && session.mode === "study" && !session.card ? (
          <section className="card">
            <p className="face">
              {session.reviewing ? "Todavía no hay fallos en este eje." : "Este filtro no tiene cartas."}
            </p>
          </section>
        ) : null}
        {!subjectsOpen && session.mode === "study" && session.card ? (
          <MathCardView
            card={session.card}
            revealed={session.revealed}
            stepDraft={session.stepDraft}
            stepStatus={session.stepStatus}
            onStepDraft={session.setStepDraft}
            onCheckStep={session.checkStep}
          />
        ) : null}
      </main>
      <footer className="dock">
        {subjectsOpen ? (
          <button type="button" onClick={() => setSubjectsOpen(false)}>
            Volver al estudio
          </button>
        ) : session.mode === "study" ? (
          <>
            <button type="button" onClick={session.goPrevious} disabled={session.index === 0}>
              Anterior
            </button>
            <button type="button" className="primary" onClick={session.reveal} disabled={session.revealed}>
              Revelar
            </button>
            <button type="button" onClick={session.goNext} disabled={session.index >= session.total - 1}>
              Siguiente
            </button>
            <button type="button" onClick={session.toggleAutoplay} aria-pressed={session.autoplay}>
              {session.autoplay ? "Pausa" : "Auto"}
            </button>
            <label>
              Ritmo
              <select
                aria-label="Ritmo"
                value={session.intervalMs}
                onChange={(event) => session.setIntervalMs(Number(event.target.value))}
              >
                {INTERVALS.map((ms) => (
                  <option key={ms} value={ms}>
                    {ms / 1000} s
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={session.toggleShuffle} aria-pressed={session.shuffle}>
              {session.shuffle ? "Orden fijo" : "Barajar"}
            </button>
            <button
              type="button"
              onClick={() => session.setReviewing((value) => !value)}
              aria-pressed={session.reviewing}
            >
              Repasar fallos
            </button>
            <p className="progress">
              {session.total === 0 ? "0 / 0" : `${session.index + 1} / ${session.total}`}
            </p>
          </>
        ) : session.testStarted ? (
          <>
            <button type="button" onClick={session.quizPrevious} disabled={session.quizIndex === 0}>
              Anterior
            </button>
            <button
              type="button"
              onClick={session.quizNext}
              disabled={!session.selectedKey || session.quizIndex >= session.quizTotal - 1}
            >
              Siguiente
            </button>
            <button type="button" className="primary" onClick={session.finishTest} disabled={!allAnswered}>
              Terminar
            </button>
            <p className="progress">
              {session.answered} / {session.quizTotal}
            </p>
          </>
        ) : (
          <p className="progress">Elige eje y nivel, luego empieza.</p>
        )}
      </footer>
    </div>
  );
}
