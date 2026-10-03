import { describe, expect, it } from "vitest";
import { cardById, mathBank } from "../index";
import { informationCards } from "../information";
import { systemCards } from "../systems";
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
import { subjectById, subjectPaths } from "./paths";

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

  it("da al menos cuatro cartas a las asignaturas que no tenían", () => {
    for (const id of ["poo", "automatas", "adquisicion", "redes", "bases", "infra", "distribuidos", "software"]) {
      expect(subjectById(id).cardIds.length).toBeGreaterThanOrEqual(4);
    }
    const fresh = JSON.stringify(systemCards) + JSON.stringify(informationCards);
    expect(fresh.toLowerCase()).not.toContain("ects");
    expect(fresh.toLowerCase()).not.toContain("crédito");
  });

  it("recalcula la respuesta de cada asignatura nueva sin copiar la carta", () => {
    let total = 0;
    for (const add of [1, 4, 2]) total += add;
    expect(cardById("poo-acumula").quiz.forward.correct).toBe(String(total));
    expect(cardById("poo-ajeno").quiz.forward.correct).toBe("6");
    expect(cardById("poo-ancho").quiz.forward.correct).toBe(String(8 + 3));
    expect(cardById("poo-alto").quiz.forward.correct).toBe("9");

    expect(cardById("soft-pasa").quiz.forward.correct).toBe(4 === 4 ? "sí" : "no");
    const got: number = 3;
    const expected: number = 5;
    expect(cardById("soft-falla").quiz.forward.correct).toBe(got === expected ? "sí" : "no");
    expect(cardById("soft-ambos").quiz.forward.correct).toBe(true && false ? "sí" : "no");
    expect(cardById("soft-esperado").quiz.forward.correct).toBe(14 === 14 ? "sí" : "no");

    expect(cardById("dist-emisor").quiz.forward.correct).toBe(String(9));
    expect(cardById("dist-receptor").quiz.forward.correct).toBe(String(4));
    expect(cardById("dist-quince").quiz.forward.correct).toBe(String(15));
    const sender = 5;
    expect(cardById("dist-se-queda").quiz.forward.correct).toBe(String(sender));

    expect(cardById("infra-partes").quiz.forward.correct).toBe(String(100 / 4));
    expect(cardById("infra-resto").quiz.forward.correct).toBe(String(10 % 4));
    expect(cardById("infra-lotes").quiz.forward.correct).toBe(String(48 / 6));
    expect(cardById("infra-no-parte").quiz.forward.correct).toBe(10 % 3 === 0 ? "sí" : "no");

    expect(cardById("auto-cuatro").quiz.forward.correct).toBe(String([..."1011"].length));
    let endsInOne = false;
    for (const symbol of "110") endsInOne = symbol === "1";
    expect(cardById("auto-acaba-cero").quiz.forward.correct).toBe(endsInOne ? "sí" : "no");
    endsInOne = false;
    for (const symbol of "10") endsInOne = symbol === "1";
    expect(cardById("auto-rechaza-10").quiz.forward.correct).toBe(endsInOne ? "sí" : "no");
    expect(cardById("auto-cinco").quiz.forward.correct).toBe(String([..."01011"].length));

    expect(cardById("adq-ocho").quiz.forward.correct).toBe(String(2 / 0.25));
    expect(cardById("adq-seis").quiz.forward.correct).toBe(String(3 / 0.5));
    expect(cardById("adq-cuatro").quiz.forward.correct).toBe(String(4 / 0.5));
    expect(cardById("adq-diez").quiz.forward.correct).toBe(String(5 / 0.5));

    expect(cardById("redes-seis").quiz.forward.correct).toBe(String(6 - 1));
    expect(cardById("redes-cuarenta").quiz.forward.correct).toBe(String(40 / 8));
    expect(cardById("redes-ocho").quiz.forward.correct).toBe(String(8 / 4));
    expect(cardById("redes-ocho-paradas").quiz.forward.correct).toBe(String(8 - 1));

    const ages = [18, 21, 18, 30];
    expect(cardById("bases-dieciocho").quiz.forward.correct).toBe(String(ages.filter((age) => age === 18).length));
    expect(cardById("bases-clave").quiz.forward.correct).toBe(String([7, 8, 9].filter((id) => id === 7).length));
    expect(cardById("bases-tres").quiz.forward.correct).toBe(String([4, 4, 4, 9].filter((age) => age === 4).length));
    expect(cardById("bases-distintos").quiz.forward.correct).toBe(String(new Set([5, 5, 6, 7, 8]).size));
  });
});
