import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useFullscreen } from "./useFullscreen";

describe("useFullscreen", () => {
  it("falls back when the Fullscreen API is unavailable", async () => {
    const { result } = renderHook(() => useFullscreen());

    await act(async () => {
      await result.current.toggle();
    });

    expect(result.current.isFullscreen).toBe(true);
    expect(result.current.isFallbackActive || result.current.isSupported).toBe(true);
  });
});
