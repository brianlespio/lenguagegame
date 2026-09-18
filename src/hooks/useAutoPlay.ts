import { useEffect, useRef } from "react";

interface UseAutoPlayOptions {
  enabled: boolean;
  interval: number;
  onTick: () => void;
}

export function useAutoPlay({ enabled, interval, onTick }: UseAutoPlayOptions): void {
  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  useEffect(() => {
    if (!enabled) return;
    const delay = Number.isFinite(interval) && interval > 0 ? interval : 5000;
    const id = window.setInterval(() => {
      onTickRef.current();
    }, delay);
    return () => window.clearInterval(id);
  }, [enabled, interval]);
}
