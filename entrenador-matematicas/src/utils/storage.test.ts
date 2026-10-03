import { describe, expect, it } from "vitest";
import { progressKey, USERS_KEY } from "../constants";
import { loadUserStore } from "./profiles";
import { EMPTY_PROGRESS, normalizeProgress } from "./progress";
import { readJson, writeJson } from "./storage";

describe("almacén con versión", () => {
  it("conserva el progreso de la versión 1, incluida la fecha de repaso", () => {
    const legacy = {
      lastIdByScope: { "calculus|L1": "calc-chain-cube" },
      learning: {
        "calc-chain-cube": {
          cardId: "calc-chain-cube",
          correctAnswers: 1,
          incorrectAnswers: 2,
          lastReviewed: "2026-10-03T09:00:00.000Z",
          nextReview: "2026-10-04T09:00:00.000Z",
          difficulty: 2.5,
          lastOutcome: "miss",
        },
      },
    };
    localStorage.setItem(progressKey("ana"), JSON.stringify(legacy));
    const loaded = normalizeProgress(readJson(progressKey("ana"), EMPTY_PROGRESS));
    expect(loaded.lastIdByScope["calculus|L1"]).toBe("calc-chain-cube");
    expect(loaded.learning["calc-chain-cube"]).toMatchObject({
      incorrectAnswers: 2,
      lastReviewed: "2026-10-03T09:00:00.000Z",
      nextReview: "2026-10-04T09:00:00.000Z",
      difficulty: 2.5,
      lastOutcome: "miss",
    });
  });

  it("omite una fecha rota y una dificultad infinita", () => {
    localStorage.setItem(
      progressKey("ana"),
      JSON.stringify({
        version: 1,
        data: {
          lastIdByScope: {},
          learning: {
            "calc-chain-cube": {
              cardId: "calc-chain-cube",
              correctAnswers: 0,
              incorrectAnswers: 1,
              lastReviewed: "mañana",
              nextReview: "2026-01-09",
              difficulty: 1e309,
              lastOutcome: "miss",
            },
          },
        },
      }),
    );
    const loaded = normalizeProgress(readJson(progressKey("ana"), EMPTY_PROGRESS));
    expect(loaded.learning["calc-chain-cube"]?.lastOutcome).toBe("miss");
    expect(loaded.learning["calc-chain-cube"]?.lastReviewed).toBeUndefined();
    expect(loaded.learning["calc-chain-cube"]?.nextReview).toBeUndefined();
    expect(loaded.learning["calc-chain-cube"]?.difficulty).toBeUndefined();
  });

  it("vacía un documento de versión desconocida", () => {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify({
        version: 9,
        data: { activeUserId: "user-1", users: [{ id: "user-1", name: "Ana", createdAt: "2026-10-03T09:00:00.000Z" }] },
      }),
    );
    expect(loadUserStore().users).toEqual([]);
  });

  it("vuelve a leer lo que acaba de escribir", () => {
    writeJson(progressKey("ana"), { lastIdByScope: { "algebra|L0": "alg-1" }, learning: {} });
    const loaded = normalizeProgress(readJson(progressKey("ana"), EMPTY_PROGRESS));
    expect(loaded.lastIdByScope["algebra|L0"]).toBe("alg-1");
  });
});
