import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SpeechControls } from "./SpeechControls";

describe("SpeechControls", () => {
  it("speaks and toggles mute", () => {
    const onSpeak = vi.fn();
    const onToggleMute = vi.fn();
    render(
      <SpeechControls
        muted={false}
        supported
        disabled={false}
        onSpeak={onSpeak}
        onToggleMute={onToggleMute}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Speak term" }));
    fireEvent.click(screen.getByRole("button", { name: "Mute pronunciation" }));
    expect(onSpeak).toHaveBeenCalledTimes(1);
    expect(onToggleMute).toHaveBeenCalledTimes(1);
  });

  it("renders a primary speak button", () => {
    render(
      <SpeechControls
        muted={false}
        supported
        disabled={false}
        onSpeak={vi.fn()}
        onToggleMute={vi.fn()}
      />,
    );
    expect(screen.getByRole("button", { name: "Speak term" })).toHaveClass("speech-speak");
  });

  it("hides when speech synthesis is unavailable", () => {
    const { container } = render(
      <SpeechControls
        muted={false}
        supported={false}
        disabled={false}
        onSpeak={vi.fn()}
        onToggleMute={vi.fn()}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
