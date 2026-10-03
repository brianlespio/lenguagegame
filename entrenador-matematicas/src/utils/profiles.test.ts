import { describe, expect, it } from "vitest";
import { scoreNote } from "./profiles";

describe("nota por encima del azar", () => {
  it("no da por firme un 85 % que con cuatro opciones sigue siendo azar corregido", () => {
    expect(scoreNote(85, { answered: 20, choices: 4 })).toBe(
      "Aún fallan cuentas. Repite las cartas de este eje antes de subir.",
    );
    expect(scoreNote(25, { answered: 20, choices: 4 })).toBe(
      "Toca repetir el nivel. La puntuación sale de las cuentas, no de haber visto la carta.",
    );
    expect(scoreNote(100, { answered: 20, choices: 4 })).toBe(
      "Este nivel está firme. Puedes subir al siguiente cuando quieras.",
    );
  });

  it("no juzga el nivel con menos de 20 respuestas", () => {
    expect(scoreNote(100, { answered: 19, choices: 4 })).toBe("Aún no hay bastante");
  });

  it("mantiene las bandas antiguas cuando la puntuación no trae muestra", () => {
    expect(scoreNote(85)).toBe("Este nivel está firme. Puedes subir al siguiente cuando quieras.");
    expect(scoreNote(60)).toBe("Aún fallan cuentas. Repite las cartas de este eje antes de subir.");
  });
});
