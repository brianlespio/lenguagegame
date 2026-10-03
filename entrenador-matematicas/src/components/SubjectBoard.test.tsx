import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SubjectBoard } from "./SubjectBoard";

describe("asignaturas", () => {
  it("lista las asignaturas por lo que se estudia", () => {
    const onStudyCard = vi.fn();
    render(<SubjectBoard subjectId={null} onOpen={vi.fn()} onClose={vi.fn()} onStudyCard={onStudyCard} />);
    expect(screen.queryByText(/crédito/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ects/i)).not.toBeInTheDocument();
  });

  it("enseña el objeto y comprueba la cuenta", () => {
    const { rerender } = render(
      <SubjectBoard subjectId={null} onOpen={() => undefined} onClose={vi.fn()} onStudyCard={vi.fn()} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Programación Orientada a Objetos" }));
    rerender(
      <SubjectBoard
        subjectId="poo"
        onOpen={vi.fn()}
        onClose={vi.fn()}
        onStudyCard={vi.fn()}
      />,
    );
    expect(screen.getByText(/Un objeto guarda un valor/)).toBeInTheDocument();
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "5" } });
    fireEvent.click(screen.getAllByRole("button", { name: "Comprobar" })[0]);
    expect(screen.getAllByRole("status")[0]).toHaveTextContent("Coincide.");
  });

  it("entra en la carta desde la asignatura", () => {
    const onStudyCard = vi.fn();
    render(
      <SubjectBoard subjectId="calculo" onOpen={vi.fn()} onClose={vi.fn()} onStudyCard={onStudyCard} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Composición\. \(x² \+ 1\)³/ }));
    expect(onStudyCard).toHaveBeenCalledWith("calc-chain-cube");
  });
});
