import { describe, expect, it } from "vitest";
import { cardById, mathBank } from "./index";
import { lossCard, sigmoidChainCard, type LossCase, type SigmoidW } from "./calculus";
import { bankErrors, decompositionHolds } from "./validate";

describe("banco de matemáticas", () => {
  it("cumple los guardianes de ids, niveles, cadena, Bayes y Python", () => {
    expect(bankErrors(mathBank)).toEqual([]);
  });

  it("incluye el cubo, la sigmoide y la pérdida con los números revisados", () => {
    const cube = cardById("calc-chain-cube");
    expect(cube.decomposition?.g).toBe("u³");
    expect(cube.decomposition?.h).toBe("x² + 1");
    expect(cube.decomposition?.fAt).toBe(8);
    expect(cube.decomposition?.fPrimeAt).toBe(24);
    expect(cube.decomposition && decompositionHolds(cube.decomposition)).toBe(true);

    const sigma = cardById("calc-chain-sigmoid");
    expect(sigma.decomposition?.fAt).toBe(0.5);
    expect(sigma.decomposition?.fPrimeAt).toBe(0.5);
    expect(sigma.decomposition?.h).toBe("2x");

    const loss = cardById("calc-loss-linear");
    expect(loss.decomposition?.fPrimeAt).toBe(4);
    expect(loss.quiz.forward.correct).toBe("4");

    expect(cardById("alg-dot-2d").quiz.forward.correct).toBe("11");
  });

  it("solo acepta variantes numéricas ya revisadas", () => {
    expect(sigmoidChainCard(1).id).toBe("calc-chain-sigmoid-w1");
    expect(sigmoidChainCard(4).decomposition?.fPrimeAt).toBe(1);
    expect(() => sigmoidChainCard(3 as SigmoidW)).toThrow(/plantilla/);
    expect(() => lossCard({ id: "calc-loss-linear", w: 9, x: 9, y: 9 } as unknown as LossCase)).toThrow(/plantilla/);
  });
});
