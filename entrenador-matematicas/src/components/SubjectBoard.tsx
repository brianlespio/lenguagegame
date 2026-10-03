import { useState } from "react";
import { cardById } from "../data";
import { lessonById, subjectById, subjectPaths } from "../data/knowledge";
import type { Lesson } from "../types/knowledge";
import { answerMatches } from "../utils/answer";

function LessonView({ lesson }: { lesson: Lesson }) {
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<"idle" | "match" | "miss">("idle");
  const [open, setOpen] = useState(false);

  return (
    <article className="split">
      <p className="kicker">{lesson.concept}</p>
      <p>{lesson.teach}</p>
      <p>{lesson.worked}</p>
      <form
        className="step-form"
        onSubmit={(event) => {
          event.preventDefault();
          setStatus(answerMatches(draft, lesson.expect, lesson.accept) ? "match" : "miss");
        }}
      >
        <label>
          {lesson.ask}
          <input
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setStatus("idle");
            }}
            autoComplete="off"
          />
        </label>
        <button type="submit" className="primary">
          Comprobar
        </button>
      </form>
      <p role="status" className="step-status">
        {status === "match" ? "Coincide." : status === "miss" ? "No coincide." : ""}
      </p>
      {open ? <p>{lesson.rule}</p> : null}
      <button type="button" onClick={() => setOpen(true)} disabled={open}>
        Ver por qué
      </button>
    </article>
  );
}

export function SubjectBoard({
  subjectId,
  onOpen,
  onClose,
  onStudyCard,
}: {
  subjectId: string | null;
  onOpen: (subjectId: string) => void;
  onClose: () => void;
  onStudyCard: (cardId: string) => void;
}) {
  if (!subjectId) {
    return (
      <section className="card">
        <p className="kicker">Asignaturas</p>
        <h1>Qué hay que aprender</h1>
        <ul className="choices">
          {subjectPaths.map((subject) => (
            <li key={subject.id}>
              <button type="button" className="choice" onClick={() => onOpen(subject.id)}>
                <span>{subject.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const subject = subjectById(subjectId);
  return (
    <section className="card">
      <p className="kicker">Asignatura</p>
      <h1>{subject.name}</h1>
      <p>{subject.learns}</p>
      <button type="button" onClick={onClose}>
        Todas las asignaturas
      </button>
      {subject.lessonIds.map((id) => (
        <LessonView key={id} lesson={lessonById(id)} />
      ))}
      {subject.cardIds.length > 0 ? (
        <ul className="choices">
          {subject.cardIds.map((id) => {
            const card = cardById(id);
            return (
              <li key={id}>
                <button type="button" className="choice" onClick={() => onStudyCard(id)}>
                  <span>
                    {card.object}. {card.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
