import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UserGate } from "./UserGate";

describe("UserGate", () => {
  it("registers a typed name", () => {
    const onCreate = vi.fn();
    render(<UserGate users={[]} activeUserId={null} onCreate={onCreate} onSelect={vi.fn()} />);
    fireEvent.change(screen.getByLabelText("Poner tu nombre"), { target: { value: "Rita" } });
    fireEvent.click(screen.getByRole("button", { name: "Jugar" }));
    expect(onCreate).toHaveBeenCalledWith("Rita");
  });

  it("selects an existing user", () => {
    const onSelect = vi.fn();
    render(
      <UserGate
        users={[{ id: "u1", name: "Brian", createdAt: "2026-01-01" }]}
        activeUserId={null}
        onCreate={vi.fn()}
        onSelect={onSelect}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Brian/ }));
    expect(onSelect).toHaveBeenCalledWith("u1");
  });
});
