import { beforeEach, describe, expect, it } from "vitest";
import { createUser, estimateLevel, formatPoints, openUser, pointsByUser, scoresForUser, selectUser } from "./profiles";

describe("profiles", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("registers a new user and can select an existing one", () => {
    let store = createUser({ users: [], activeUserId: null }, "Rita");
    expect(store.users).toHaveLength(1);
    expect(store.users[0]?.name).toBe("Rita");
    store = createUser(store, "Brian");
    expect(store.users).toHaveLength(2);
    store = selectUser(store, store.users[0]!.id);
    expect(store.activeUserId).toBe(store.users[0]?.id);
    store = createUser(store, "rita");
    expect(store.users).toHaveLength(2);
    store = createUser(store, "Rita", { duplicate: true });
    expect(store.users).toHaveLength(3);
    expect(store.users.filter((user) => user.name === "Rita")).toHaveLength(2);
    const adopted = openUser({ users: [], activeUserId: null }, "Rita", "user-rita");
    expect(adopted.activeUserId).toBe("user-rita");
    expect(openUser(adopted, "Rita", "user-rita").users).toHaveLength(1);
  });

  it("sums correct answers as accumulated points", () => {
    const totals = pointsByUser([
      { userId: "a", correct: 18 },
      { userId: "b", correct: 4 },
      { userId: "a", correct: 7 },
    ]);
    expect(totals.a).toBe(25);
    expect(totals.b).toBe(4);
    expect(formatPoints(25)).toBe("25 puntos");
    expect(formatPoints(1)).toBe("1 punto");
  });

  it("keeps English and French scores apart", () => {
    const scores = [
      {
        id: "1",
        userId: "u1",
        userName: "Rita",
        languagePair: "fr-es" as const,
        cefrLevel: "C2" as const,
        category: "nouns" as const,
        correct: 90,
        total: 100,
        percent: 90,
        estimatedLevel: "C2" as const,
        at: "2026-01-01",
      },
      {
        id: "2",
        userId: "u1",
        userName: "Rita",
        languagePair: "en-es" as const,
        cefrLevel: "B2" as const,
        category: "nouns" as const,
        correct: 70,
        total: 100,
        percent: 70,
        estimatedLevel: "B2" as const,
        at: "2026-01-02",
      },
    ];
    expect(scoresForUser(scores, "u1", "fr-es")).toHaveLength(1);
    expect(scoresForUser(scores, "u1", "en-es")[0]?.cefrLevel).toBe("B2");
  });

  it("estimates a lower band when C2 accuracy drops", () => {
    expect(estimateLevel(94, "C2")).toBe("C2");
    expect(estimateLevel(78, "C2")).toBe("C1");
    expect(estimateLevel(60, "C2")).toBe("B2");
  });

  it("does not treat chance-level guessing as A1", () => {
    expect(estimateLevel(25, "all", { answered: 20, choices: 4 })).toBe("below-A1");
    expect(estimateLevel(25, "all", { answered: 19, choices: 4 })).toBe("insufficient");
    expect(estimateLevel(100, "all", { answered: 20, choices: 4 })).toBe("C2");
  });
});
