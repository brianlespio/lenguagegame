import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { USERS_STORAGE_KEY } from "../constants";
import { App } from "./App";

describe("App player gate", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("asks for a name even when Brian is already saved", () => {
    window.localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify({
        activeUserId: "user-brian",
        users: [{ id: "user-brian", name: "Brian", createdAt: "2026-01-01" }],
      }),
    );

    render(<App />);

    expect(screen.getByRole("heading", { name: "¿Quién juega?" })).toBeInTheDocument();
    expect(screen.getByLabelText("Poner tu nombre")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Jugar" })).toBeDisabled();
    expect(screen.queryByRole("button", { name: "Cambiar nombre" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Brian/ }));

    expect(screen.getByText("Brian")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cambiar nombre" })).toBeInTheDocument();
  });

  it("lets a new name enter the trainer", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText("Poner tu nombre"), { target: { value: "Rita" } });
    fireEvent.click(screen.getByRole("button", { name: "Jugar" }));
    expect(screen.getByText("Rita")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cambiar nombre" })).toBeInTheDocument();
  });
});
