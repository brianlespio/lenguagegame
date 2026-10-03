import { describe, expect, it } from "vitest";
import { applyOutcome, missedCardIds } from "./review";
import { getDefaultProgress } from "./storage";

const now = "2026-10-03T09:00:00.000Z";

describe("review grades", () => {
  it("counts a miss, a clean hit, and a spelling restart separately", () => {
    let progress = getDefaultProgress();
    progress = applyOutcome(progress, "ana", "n1", "miss", now);
    progress = applyOutcome(progress, "ana", "n2", "hit", now);
    progress = applyOutcome(progress, "ana", "n3", "restart", now);

    expect(progress.learningProgress["ana:n1"]).toMatchObject({
      incorrectAnswers: 1,
      correctAnswers: 0,
      lastOutcome: "miss",
      lastReviewed: now,
    });
    expect(progress.learningProgress["ana:n1"]?.nextReview).toBeUndefined();
    expect(progress.learningProgress["ana:n2"]?.correctAnswers).toBe(1);
    expect(progress.learningProgress["ana:n3"]).toMatchObject({
      correctAnswers: 0,
      incorrectAnswers: 0,
      restarts: 1,
      lastOutcome: "restart",
    });
    expect(missedCardIds(progress, "ana", new Set(["n1", "n2", "n3"]))).toEqual(["n1"]);
  });

  it("drops a miss that is no longer in the bank and keeps another profile", () => {
    let progress = getDefaultProgress();
    progress = applyOutcome(progress, "ana", "gone", "miss", now);
    progress = applyOutcome(progress, "luis", "n1", "miss", now);
    expect(missedCardIds(progress, "ana", new Set(["n1"]))).toEqual([]);
    expect(missedCardIds(progress, "luis", new Set(["n1"]))).toEqual(["n1"]);
  });
});
