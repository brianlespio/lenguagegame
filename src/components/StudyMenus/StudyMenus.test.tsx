import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StudyMenus } from "./StudyMenus";

describe("StudyMenus", () => {
  it("opens the category menu and reports a specific category", () => {
    const onScopeChange = vi.fn();
    render(
      <StudyMenus
        category="all"
        randomMode={false}
        languagePair="en-es"
        cefrLevel="all"
        studyMode="study"
        onScopeChange={onScopeChange}
        onLanguageChange={vi.fn()}
        onCefrChange={vi.fn()}
        onStudyModeChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Categoría" }));
    fireEvent.click(screen.getByRole("option", { name: "Verbos" }));
    expect(onScopeChange).toHaveBeenCalledWith("verbs");
  });

  it("groups phrase categories under the five language skills", () => {
    render(
      <StudyMenus
        category="all"
        randomMode={false}
        languagePair="en-es"
        cefrLevel="all"
        studyMode="study"
        onScopeChange={vi.fn()}
        onLanguageChange={vi.fn()}
        onCefrChange={vi.fn()}
        onStudyModeChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Categoría" }));
    expect(screen.getByText("Recepción oral")).toBeInTheDocument();
    expect(screen.getByText("Recepción escrita")).toBeInTheDocument();
    expect(screen.getByText("Producción oral")).toBeInTheDocument();
    expect(screen.getByText("Producción escrita")).toBeInTheDocument();
    expect(screen.getByText("Interacción")).toBeInTheDocument();
    expect(screen.getAllByRole("option", { name: "Serie completa" })).toHaveLength(3);
    expect(screen.getByRole("option", { name: "Preguntas oídas" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Turno afirmativo" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Turno negativo" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Textos y avisos" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Encargo escrito" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Redacción" })).toBeInTheDocument();
  });

  it("selects todo aleatorio from the category menu", () => {
    const onScopeChange = vi.fn();
    render(
      <StudyMenus
        category="nouns"
        randomMode={false}
        languagePair="en-es"
        cefrLevel="all"
        studyMode="study"
        onScopeChange={onScopeChange}
        onLanguageChange={vi.fn()}
        onCefrChange={vi.fn()}
        onStudyModeChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Categoría" }));
    fireEvent.click(screen.getByRole("option", { name: "Todo aleatorio" }));
    expect(onScopeChange).toHaveBeenCalledWith("all-random");
  });

  it("offers French to Spanish as an available pair", () => {
    render(
      <StudyMenus
        category="all"
        randomMode={false}
        languagePair="en-es"
        cefrLevel="all"
        studyMode="study"
        onScopeChange={vi.fn()}
        onLanguageChange={vi.fn()}
        onCefrChange={vi.fn()}
        onStudyModeChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Idioma" }));
    expect(screen.getByRole("option", { name: /Français → Español/ })).toBeEnabled();
    expect(screen.getByRole("option", { name: /English → Spanish/ })).toBeEnabled();
    expect(screen.getByRole("option", { name: /Català → Espanyol/ })).toBeEnabled();
    expect(screen.getByRole("option", { name: /Euskara → Gaztelania/ })).toBeEnabled();
  });

  it("selects a CEFR level from the level menu", () => {
    const onCefrChange = vi.fn();
    render(
      <StudyMenus
        category="all"
        randomMode={false}
        languagePair="en-es"
        cefrLevel="all"
        studyMode="study"
        onScopeChange={vi.fn()}
        onLanguageChange={vi.fn()}
        onCefrChange={onCefrChange}
        onStudyModeChange={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Nivel" }));
    expect(screen.getByRole("option", { name: "C2" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: "B1" }));
    expect(onCefrChange).toHaveBeenCalledWith("B1");
  });

  it("selects test from the mode menu", () => {
    const onStudyModeChange = vi.fn();
    render(
      <StudyMenus
        category="all"
        randomMode={false}
        languagePair="en-es"
        cefrLevel="all"
        studyMode="study"
        onScopeChange={vi.fn()}
        onLanguageChange={vi.fn()}
        onCefrChange={vi.fn()}
        onStudyModeChange={onStudyModeChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Modo" }));
    fireEvent.click(screen.getByRole("option", { name: "Test" }));
    expect(onStudyModeChange).toHaveBeenCalledWith("test");
  });
});
