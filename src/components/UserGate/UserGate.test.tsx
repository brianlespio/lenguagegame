import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserGate } from "./UserGate";

describe("UserGate", () => {
  it("enters languages with the typed name", () => {
    const onLanguage = vi.fn();
    render(<UserGate users={[]} activeUserId={null} onLanguage={onLanguage} onMath={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("Poner tu nombre"), { target: { value: "Rita" } });
    fireEvent.click(screen.getByRole("button", { name: "Idiomas" }));
    expect(onLanguage).toHaveBeenCalledWith("Rita");
  });

  it("sends the typed name to matemáticas", () => {
    const onMath = vi.fn();
    render(<UserGate users={[]} activeUserId={null} onLanguage={vi.fn()} onMath={onMath} />);
    fireEvent.change(screen.getByLabelText("Poner tu nombre"), { target: { value: "Rita" } });
    fireEvent.click(screen.getByRole("button", { name: "Matemáticas" }));
    expect(onMath).toHaveBeenCalledWith("Rita");
  });

  it("fills a saved name and waits for the subject", () => {
    const onLanguage = vi.fn();
    render(
      <UserGate
        users={[{ id: "u1", name: "Brian", createdAt: "2026-01-01" }]}
        activeUserId={null}
        onLanguage={onLanguage}
        onMath={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Brian/ }));
    expect(onLanguage).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Poner tu nombre")).toHaveValue("Brian");
    fireEvent.click(screen.getByRole("button", { name: "Idiomas" }));
    expect(onLanguage).toHaveBeenCalledWith("Brian", "u1");
  });

  it("shows accumulated points when two users share a name", () => {
    const onLanguage = vi.fn();
    const onAddSameName = vi.fn();
    render(
      <UserGate
        users={[
          { id: "a", name: "Ana", createdAt: "2026-01-01" },
          { id: "b", name: "Ana", createdAt: "2026-01-02" },
        ]}
        activeUserId={null}
        pointsByUserId={{ a: 25, b: 0 }}
        onLanguage={onLanguage}
        onMath={vi.fn()}
        onAddSameName={onAddSameName}
      />,
    );
    expect(screen.getByRole("button", { name: /Usuario 1 Ana 25 puntos/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Usuario 2 Ana 0 puntos/ })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Poner tu nombre"), { target: { value: "Ana" } });
    expect(screen.getByRole("button", { name: "Idiomas" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: /25 puntos/ }));
    fireEvent.click(screen.getByRole("button", { name: "Idiomas" }));
    expect(onLanguage).toHaveBeenCalledWith("Ana", "a");
    fireEvent.click(screen.getByRole("button", { name: "Añadir otro con este nombre" }));
    expect(onAddSameName).toHaveBeenCalledWith("Ana");
  });
});