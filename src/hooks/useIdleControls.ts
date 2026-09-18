import { useCallback, useEffect, useState } from "react";
import { IDLE_HIDE_MS } from "../constants";

export function useIdleControls(delayMs: number = IDLE_HIDE_MS) {
  const [isIdle, setIsIdle] = useState(false);

  const bump = useCallback(() => {
    setIsIdle(false);
  }, []);

  useEffect(() => {
    let timeoutId = window.setTimeout(() => setIsIdle(true), delayMs);

    const restart = () => {
      setIsIdle(false);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setIsIdle(true), delayMs);
    };

    const events: Array<keyof WindowEventMap> = ["mousemove", "mousedown", "keydown", "touchstart"];
    for (const event of events) window.addEventListener(event, restart, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      for (const event of events) window.removeEventListener(event, restart);
    };
  }, [delayMs]);

  return { isIdle, bump };
}
