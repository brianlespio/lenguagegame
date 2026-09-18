import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TestStart } from "./TestStart";

describe("TestStart", () => {
  it("starts the test for the selected user", () => {
    const onStart = vi.fn();
    render(
      <TestStart
        userName="Rita"
        languagePair="fr-es"
        category="adjectives"
        cefrLevel="C2"
        total={400}
        onStart={onStart}
      />,
    );
    expect(screen.getByText("Rita")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "START" }));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
