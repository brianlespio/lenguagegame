import { describe, expect, it } from "vitest";
import { applyOutcome, EMPTY_PROGRESS, missedCardIds } from "./progress";

describe("registro de la carta", () => {
  it("anota el fallo y lo deja para repasar, sin calcular la próxima fecha", () => {
    const noted = applyOutcome(EMPTY_PROGRESS, "calc-chain-cube", "miss", "2026-10-03T09:00:00.000Z");
    expect(noted.learning["calc-chain-cube"]).toMatchObject({
      incorrectAnswers: 1,
      correctAnswers: 0,
      lastOutcome: "miss",
      lastReviewed: "2026-10-03T09:00:00.000Z",
    });
    expect(noted.learning["calc-chain-cube"]?.nextReview).toBeUndefined();
    expect(missedCardIds(noted.learning, new Set(["calc-chain-cube", "otra"]))).toEqual(["calc-chain-cube"]);
  });

  it("un acierto posterior saca la carta del repaso y conserva la fecha que ya tenía", () => {
    const missed = applyOutcome(EMPTY_PROGRESS, "calc-chain-cube", "miss", "2026-10-03T09:00:00.000Z");
    const withDate = {
      ...missed,
      learning: {
        "calc-chain-cube": { ...missed.learning["calc-chain-cube"]!, nextReview: "2026-10-04T09:00:00.000Z", difficulty: 2.5 },
      },
    };
    const hit = applyOutcome(withDate, "calc-chain-cube", "hit", "2026-10-03T10:00:00.000Z");
    expect(hit.learning["calc-chain-cube"]).toMatchObject({
      correctAnswers: 1,
      incorrectAnswers: 1,
      lastOutcome: "hit",
      nextReview: "2026-10-04T09:00:00.000Z",
      difficulty: 2.5,
    });
    expect(missedCardIds(hit.learning, new Set(["calc-chain-cube"]))).toEqual([]);
  });
});
