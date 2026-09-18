import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { QuizItem } from "../../types/quiz";
import { QuizCard } from "./QuizCard";

const item: QuizItem = {
  promptId: "n1",
  direction: "forward",
  prompt: "one",
  promptTranslation: "uno",
  promptKind: "word",
  category: "nouns",
  choices: [
    { key: "a", entryId: "n2", text: "dos", translation: "two", correct: false, kind: "catalog" },
    { key: "b", entryId: "n1", text: "uno", translation: "one", correct: true, kind: "catalog" },
    { key: "c", entryId: "n3", text: "tres", translation: "three", correct: false, kind: "catalog" },
    {
      key: "d",
      entryId: "none-of-the-above",
      text: "Ninguna de las anteriores",
      translation: "None of the above",
      correct: false,
      kind: "none",
    },
  ],
};

describe("QuizCard", () => {
  it("locks a wrong choice red and still marks the correct one green", () => {
    const onSelect = vi.fn();
    const { rerender } = render(
      <QuizCard
        item={item}
        languagePair="en-es"
        selectedKey={null}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Ninguna de las anteriores/ }));
    expect(onSelect).toHaveBeenCalledWith("d");

    rerender(
      <QuizCard item={item} languagePair="en-es" selectedKey="d" onSelect={onSelect} />,
    );

    expect(screen.getByRole("button", { name: /Ninguna de las anteriores/ })).toHaveAttribute(
      "data-state",
      "incorrect",
    );
    expect(screen.getByRole("button", { name: /uno/ })).toHaveAttribute("data-state", "correct");
    expect(screen.getByText("incorrecta")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /uno/ })).toHaveAttribute("aria-disabled", "true");
  });

  it("plays the translation of the prompt or the chosen option on right-click without selecting", () => {
    const onSelect = vi.fn();
    const onSpeakTranslation = vi.fn();
    render(
      <QuizCard
        item={item}
        languagePair="en-es"
        selectedKey={null}
        onSelect={onSelect}
        onSpeakTranslation={onSpeakTranslation}
      />,
    );

    fireEvent.contextMenu(screen.getByText("one"));
    expect(onSpeakTranslation).toHaveBeenCalledWith("uno", "prompt");
    fireEvent.contextMenu(screen.getByRole("button", { name: /dos/ }));
    expect(onSpeakTranslation).toHaveBeenCalledWith("two", "choice");
    expect(onSelect).not.toHaveBeenCalled();
  });
});
