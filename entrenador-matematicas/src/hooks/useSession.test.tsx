import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { progressKey } from "../constants";
import { useSession } from "./useSession";

describe("useSession", () => {
  it("guarda el fallo para repasar y revelar no escribe un resultado", () => {
    const { result, unmount } = renderHook(() => useSession("user-1"));

    act(() => {
      result.current.reveal();
    });
    expect(localStorage.getItem(progressKey("user-1")) ?? "").not.toContain("lastOutcome");

    act(() => {
      result.current.startTest();
    });
    const item = result.current.quizItem;
    const wrong = item?.choices.find((choice) => !choice.correct);
    expect(item).toBeTruthy();
    expect(wrong).toBeTruthy();

    act(() => {
      result.current.selectChoice(wrong!.key);
    });
    act(() => {
      result.current.setAxis("algebra");
    });
    const saved = localStorage.getItem(progressKey("user-1")) ?? "";
    expect(saved).toContain(item!.cardId);
    expect(saved).toContain('"lastOutcome":"miss"');

    unmount();
    const again = renderHook(() => useSession("user-1"));
    act(() => {
      again.result.current.setReviewing(true);
      again.result.current.setAxis("calculus");
      again.result.current.setLevel("L1");
    });
    expect(again.result.current.card?.id).toBe(item!.cardId);
    expect(again.result.current.total).toBeGreaterThan(0);
  });
});
