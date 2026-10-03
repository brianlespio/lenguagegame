import { describe, expect, it } from "vitest";
import { mathBank } from "../data";
import { filterCards } from "./filter";
import { assembleChoices, buildQuizQueue } from "./quiz";
import { answerMatches } from "./answer";

describe("respuestas escritas", () => {
  it("acepta el mismo término con espacios o con el cuadrado unicode", () => {
    expect(answerMatches("x^2+1", "x^2+1", ["x²+1"])).toBe(true);
    expect(answerMatches("x² + 1", "x^2+1")).toBe(true);
    expect(answerMatches("23", "24")).toBe(false);
  });
});

describe("test", () => {
  const cards = filterCards(mathBank, "calculus", "L1");

  it("hace dos preguntas por carta, del mismo eje, con una sola correcta", () => {
    const queue = buildQuizQueue(cards, () => 0.5);
    expect(queue).toHaveLength(cards.length * 2);
    for (const item of queue) {
      expect(item.axis).toBe("calculus");
      expect(item.level).toBe("L1");
      expect(item.choices.filter((choice) => choice.correct)).toHaveLength(1);
      const texts = item.choices.map((choice) => choice.text.trim().toLowerCase());
      expect(new Set(texts).size).toBe(texts.length);
    }
  });

  it("a veces la correcta es «Ninguna de las anteriores» y el resultado no está en las otras", () => {
    const choices = assembleChoices("24", ["5", "-2", "3", "2.1"], () => 0);
    expect(choices.filter((choice) => choice.correct)).toHaveLength(1);
    expect(choices.at(-1)).toMatchObject({ text: "Ninguna de las anteriores", correct: true, kind: "none", key: "d" });
    expect(choices.some((choice) => choice.text === "24")).toBe(false);
  });

  it("puede poner «Ninguna de las anteriores» como trampa", () => {
    let call = 0;
    const choices = assembleChoices("24", ["5", "-2", "3", "2.1"], () => {
      call += 1;
      if (call === 1) return 0.1;
      if (call === 2) return 0.8;
      return 0.4;
    });
    expect(choices.at(-1)).toMatchObject({ kind: "none", correct: false, key: "d" });
    expect(choices.filter((choice) => choice.correct)).toHaveLength(1);
    expect(choices.some((choice) => choice.text === "24" && choice.correct)).toBe(true);
  });
});
