import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CardRenderer } from "../CardRenderer/CardRenderer";
import { VocabularyCard } from "./VocabularyCard";

describe("VocabularyCard", () => {
  it("renders category, English, and Spanish", () => {
    render(
      <VocabularyCard
        item={{ id: "connector-for-that", category: "connectors", term: "For that", translation: "Por eso" }}
        isRevealed
        languagePair="en-es"
      />,
    );
    expect(screen.getByText("CONNECTORS")).toBeInTheDocument();
    expect(screen.getByText("For that")).toBeInTheDocument();
    expect(screen.getByText("Por eso")).toBeInTheDocument();
  });

  it("marks phrase cards for sentence type", () => {
    const { container } = render(
      <VocabularyCard
        item={{
          id: "question-like-coffee",
          category: "questions",
          term: "Do you like coffee?",
          translation: "¿Te gusta el café?",
        }}
        isRevealed
        languagePair="en-es"
      />,
    );
    expect(container.querySelector('[data-kind="phrase"]')).not.toBeNull();
    expect(screen.getByText("QUESTIONS")).toBeInTheDocument();
    expect(screen.getByText("Do you like coffee?")).toBeInTheDocument();
  });
});

describe("CardRenderer", () => {
  it("uses VerbCard for verbs and VocabularyCard otherwise", () => {
    const { rerender } = render(
      <CardRenderer
        entry={{
          id: "verb-make",
          category: "verbs",
          infinitive: "make",
          past: "made",
          pastParticiple: "made",
          infinitiveTranslation: "hacer",
          pastTranslation: "hizo",
          pastParticipleTranslation: "hecho",
        }}
        isRevealed
        languagePair="en-es"
      />,
    );
    expect(screen.getByText("INFINITIVE")).toBeInTheDocument();

    rerender(
      <CardRenderer
        entry={{ id: "adj-important", category: "adjectives", term: "Important", translation: "Importante" }}
        isRevealed
        languagePair="en-es"
      />,
    );
    expect(screen.queryByText("INFINITIVE")).not.toBeInTheDocument();
    expect(screen.getByText("ADJECTIVES")).toBeInTheDocument();
    expect(screen.getByText("Important")).toBeInTheDocument();
  });
});
