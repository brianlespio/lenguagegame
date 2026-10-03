import { describe, expect, it } from "vitest";
import { mathBank } from "../index";
import {
  acceptsEndingInOne,
  casePasses,
  chainLength,
  cheaper,
  counterAfter,
  equalParts,
  hopCount,
  movedX,
  rowsWithAge,
  sampleCount,
  secondDequeue,
  secondPop,
  senderKeeps,
  transferSeconds,
} from "./checks";
import { lessonById, lessons } from "./lessons";
import { subjectPaths } from "./paths";

describe("conocimiento por asignatura", () => {
  it("cubre cada carta del banco en alguna asignatura", () => {
    const linked = new Set(subjectPaths.flatMap((subject) => subject.cardIds));
    const missing = mathBank.map((card) => card.id).filter((id) => !linked.has(id));
    expect(missing).toEqual([]);
  });

  it("no apunta a cartas ni lecciones que no existen", () => {
    const cardIds = new Set(mathBank.map((card) => card.id));
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    for (const subject of subjectPaths) {
      for (const id of subject.cardIds) expect(cardIds.has(id), id).toBe(true);
      for (const id of subject.lessonIds) expect(lessonIds.has(id), id).toBe(true);
    }
  });

  it("no habla de créditos", () => {
    const text = JSON.stringify(subjectPaths) + JSON.stringify(lessons);
    expect(text.toLowerCase()).not.toContain("ects");
    expect(text.toLowerCase()).not.toContain("crédito");
  });

  it("comprueba las cuentas de las lecciones con otro procedimiento", () => {
    let counter = 0;
    for (const add of [2, 3]) counter += add;
    expect(counterAfter([2, 3])).toBe(counter);
    expect(lessonById("poo-contador").expect).toBe(String(counter));

    expect(movedX(1, 3)).toBe(1 + 3);
    expect(lessonById("poo-mover").expect).toBe("4");
    expect(lessonById("poo-dos-objetos").expect).toBe("0");

    expect(chainLength("ba")).toBe(2);
    expect(lessonById("auto-longitud").expect).toBe("2");

    let lastWasOne = false;
    for (const symbol of "10") lastWasOne = symbol === "1";
    expect(lastWasOne).toBe(false);
    expect(acceptsEndingInOne("10")).toBe(false);
    expect(acceptsEndingInOne("01")).toBe(true);
    expect(lessonById("auto-acaba-en-1").expect).toBe("no");

    expect(sampleCount(1, 0.25)).toBe(4);
    expect(lessonById("adq-muestras").expect).toBe("4");
    expect(hopCount(4)).toBe(3);
    expect(lessonById("redes-saltos").expect).toBe("3");
    expect(transferSeconds(30, 10)).toBe(3);
    expect(lessonById("redes-caudal").expect).toBe("3");
    expect(rowsWithAge([20, 30, 20], 20)).toBe(2);
    expect(lessonById("bd-seleccion").expect).toBe("2");
    expect(lessonById("bd-clave").expect).toBe("1");

    const stack = ["A", "B", "C"];
    stack.pop();
    expect(stack.pop()).toBe("B");
    expect(secondPop(["A", "B", "C"])).toBe("B");
    expect(lessonById("eda-pila").expect).toBe("B");

    const queue = ["A", "B", "C"];
    queue.shift();
    expect(queue.shift()).toBe("B");
    expect(secondDequeue(["A", "B", "C"])).toBe("B");
    expect(lessonById("eda-cola").expect).toBe("B");

    expect(casePasses(6, 5)).toBe(false);
    expect(lessonById("soft-caso").expect).toBe("no");
    expect(senderKeeps(3)).toBe(3);
    expect(lessonById("dist-mensaje").expect).toBe("3");
    expect(equalParts(90, 3)).toBe(30);
    expect(lessonById("infra-partes").expect).toBe("30");
    expect(cheaper(4, 7)).toBe(4);
    expect(lessonById("decision-coste").expect).toBe("4");
  });
});
