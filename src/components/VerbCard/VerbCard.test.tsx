import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { verbs } from "../../data/verbs";
import { VerbCard } from "./VerbCard";

function getVerb(infinitive: string) {
  const match = verbs.find((verb) => verb.infinitive === infinitive);
  if (!match) throw new Error(`Missing verb: ${infinitive}`);
  return match;
}

describe("VerbCard", () => {
  it("renders infinitive, past, and past participle in order", () => {
    render(<VerbCard verb={getVerb("go")} isRevealed languagePair="en-es" />);
    const labels = screen.getAllByRole("heading").map((node) => node.textContent);
    expect(labels).toEqual(["INFINITIVE", "PAST", "PAST PARTICIPLE"]);
    expect(screen.getByText("go")).toBeInTheDocument();
    expect(screen.getByText("went")).toBeInTheDocument();
    expect(screen.getByText("gone")).toBeInTheDocument();
  });

  it("shows a distinct translation for each form after reveal", () => {
    render(<VerbCard verb={getVerb("eat")} isRevealed languagePair="en-es" />);
    expect(screen.getByText("comer")).toBeInTheDocument();
    expect(screen.getByText("comió")).toBeInTheDocument();
    expect(screen.getByText("comido")).toBeInTheDocument();
  });

  it("keeps translations hidden until revealed", () => {
    render(<VerbCard verb={getVerb("have")} isRevealed={false} languagePair="en-es" />);
    expect(screen.getByText("tener")).toHaveAttribute("data-revealed", "false");
    expect(screen.getByText("tuvo")).toHaveAttribute("aria-hidden", "true");
  });

  it("uses French form labels for the French catalog", () => {
    render(
      <VerbCard
        verb={{
          id: "fr-verb-aller",
          category: "verbs",
          infinitive: "aller",
          past: "est allé",
          pastParticiple: "allé",
          infinitiveTranslation: "ir",
          pastTranslation: "fue",
          pastParticipleTranslation: "ido",
        }}
        isRevealed
        languagePair="fr-es"
      />,
    );
    expect(screen.getAllByRole("heading").map((node) => node.textContent)).toEqual([
      "INFINITIF",
      "PASSÉ COMPOSÉ",
      "PARTICIPE PASSÉ",
    ]);
    expect(screen.getByText("VERBES")).toBeInTheDocument();
  });
});
