import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useKeyboardNavigation } from "./useKeyboardNavigation";

function fireKey(key: string) {
  window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
}

describe("useKeyboardNavigation", () => {
  it("maps arrow, reveal, play, and fullscreen keys", () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    const onReveal = vi.fn();
    const onTogglePlay = vi.fn();
    const onSpeak = vi.fn();
    const onFullscreen = vi.fn();

    const { unmount } = renderHook(() =>
      useKeyboardNavigation({
        studyMode: "study",
        onNext,
        onPrevious,
        onReveal,
        onTogglePlay,
        onSpeak,
        onFullscreen,
      }),
    );

    fireKey("ArrowRight");
    fireKey("ArrowLeft");
    fireKey("r");
    fireKey(" ");
    fireKey("p");
    fireKey("s");
    fireKey("f");

    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onReveal).toHaveBeenCalledTimes(2);
    expect(onTogglePlay).toHaveBeenCalledTimes(1);
    expect(onSpeak).toHaveBeenCalledTimes(1);
    expect(onFullscreen).toHaveBeenCalledTimes(1);
    unmount();
  });

  it("maps 1–4 to choices in test and ignores reveal and play", () => {
    const onNext = vi.fn();
    const onPrevious = vi.fn();
    const onReveal = vi.fn();
    const onTogglePlay = vi.fn();
    const onSpeak = vi.fn();
    const onFullscreen = vi.fn();
    const onSelectChoice = vi.fn();

    const { unmount } = renderHook(() =>
      useKeyboardNavigation({
        studyMode: "test",
        onNext,
        onPrevious,
        onReveal,
        onTogglePlay,
        onSpeak,
        onFullscreen,
        onSelectChoice,
      }),
    );

    fireKey("1");
    fireKey("b");
    fireKey("3");
    fireKey("D");
    fireKey("r");
    fireKey(" ");
    fireKey("p");

    expect(onSelectChoice).toHaveBeenCalledTimes(4);
    expect(onSelectChoice).toHaveBeenNthCalledWith(1, "a");
    expect(onSelectChoice).toHaveBeenNthCalledWith(4, "d");
    expect(onReveal).not.toHaveBeenCalled();
    expect(onTogglePlay).not.toHaveBeenCalled();
    unmount();
  });
});
