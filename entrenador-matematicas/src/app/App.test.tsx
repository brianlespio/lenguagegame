import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("puerta y carta del cubo", () => {
  it("pide el nombre y no arranca con un perfil inventado", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "¿Quién estudia?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Matemáticas" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Idiomas" })).toBeDisabled();
    expect(screen.queryByText("Ana")).not.toBeInTheDocument();
  });

  it("muestra g ∘ h, revela la tangente y abre el test", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Poner tu nombre"), { target: { value: "Ana" } });
    fireEvent.click(screen.getByRole("button", { name: "Matemáticas" }));

    expect(screen.getByRole("heading", { name: "(x² + 1)³" })).toBeInTheDocument();
    expect(screen.getByTestId("decomposition")).toHaveTextContent("u³");
    expect(screen.getByTestId("decomposition")).toHaveTextContent("x² + 1");
    expect(screen.getByTestId("function-plot")).toBeInTheDocument();
    expect(screen.queryByTestId("card-answer")).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox"), { target: { value: "x^2+1" } });
    fireEvent.click(screen.getByRole("button", { name: "Comprobar" }));
    expect(screen.getByRole("status")).toHaveTextContent("Coincide con el paso.");

    fireEvent.click(screen.getByRole("button", { name: "Revelar" }));
    expect(screen.getByTestId("card-answer")).toHaveTextContent("24");
    expect(screen.getByTestId("card-answer")).toHaveTextContent("y = 8 + 24(x − 1)");

    fireEvent.change(screen.getByLabelText("Nivel"), { target: { value: "L0" } });
    fireEvent.change(screen.getByLabelText("Modo"), { target: { value: "test" } });
    fireEvent.click(screen.getByRole("button", { name: "Empezar" }));

    for (let step = 0; step < 12; step += 1) {
      const pending = screen.getAllByRole("button").filter((button) => button.classList.contains("choice") && !button.hasAttribute("disabled"));
      if (pending[0]) fireEvent.click(pending[0]);
      const finish = screen.getByRole("button", { name: "Terminar" });
      if (!finish.hasAttribute("disabled")) {
        fireEvent.click(finish);
        break;
      }
      fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    }

    expect(screen.getByTestId("score-screen")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /\d+%/ })).toBeInTheDocument();
    expect(screen.getByText(/Ana/)).toBeInTheDocument();
    expect(screen.getByText("Aún no hay bastante")).toBeInTheDocument();
  });

  it("abre el repaso cuando todavía no hay fallos", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Poner tu nombre"), { target: { value: "Ana" } });
    fireEvent.click(screen.getByRole("button", { name: "Matemáticas" }));
    fireEvent.click(screen.getByRole("button", { name: "Repasar fallos" }));
    expect(screen.getByText("Todavía no hay fallos en este eje.")).toBeInTheDocument();
  });
});
