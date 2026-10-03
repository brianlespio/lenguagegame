import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScoreScreen } from "./ScoreScreen";

describe("ScoreScreen", () => {
  it("shows the saved result for the current user and language", () => {
    render(
      <ScoreScreen
        userName="Rita"
        languagePair="fr-es"
        latest={{
          id: "s1",
          userId: "u1",
          userName: "Rita",
          languagePair: "fr-es",
          cefrLevel: "C2",
          category: "nouns",
          correct: 188,
          total: 200,
          percent: 94,
          estimatedLevel: "C2",
          at: "2026-09-05T10:00:00.000Z",
        }}
        history={[]}
        ranking={[
          {
            id: "s1",
            userId: "u1",
            userName: "Rita",
            languagePair: "fr-es",
            cefrLevel: "C2",
            category: "nouns",
            correct: 188,
            total: 200,
            percent: 94,
            estimatedLevel: "C2",
            at: "2026-09-05T10:00:00.000Z",
          },
        ]}
        onBack={vi.fn()}
      />,
    );
    expect(screen.getAllByText("Rita").length).toBeGreaterThan(0);
    expect(screen.getAllByText(/94%/).length).toBeGreaterThan(0);
    expect(screen.getByText(/1\. Rita — C2 — 94%/)).toBeInTheDocument();
  });

  it("says there is not enough evidence when the sample is short", () => {
    render(
      <ScoreScreen
        userName="Rita"
        languagePair="fr-es"
        latest={{
          id: "s2",
          userId: "u1",
          userName: "Rita",
          languagePair: "fr-es",
          cefrLevel: "all",
          category: "all",
          correct: 5,
          total: 19,
          percent: 26,
          estimatedLevel: "insufficient",
          at: "2026-09-05T10:00:00.000Z",
        }}
        history={[]}
        ranking={[]}
        onBack={vi.fn()}
      />,
    );
    expect(screen.getByText(/Aún no hay bastante/)).toBeInTheDocument();
  });
});
