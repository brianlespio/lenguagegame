import { useCallback, useEffect, useState } from "react";

function getFullscreenElement(): Element | null {
  const doc = document as Document & { webkitFullscreenElement?: Element | null };
  return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isFallbackActive, setIsFallbackActive] = useState(false);

  useEffect(() => {
    const doc = document.documentElement as HTMLElement & {
      requestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => void;
    };
    setIsSupported(
      typeof doc.requestFullscreen === "function" || typeof doc.webkitRequestFullscreen === "function",
    );

    const sync = () => {
      setIsFullscreen(getFullscreenElement() !== null);
    };

    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  const enter = useCallback(async () => {
    const root = document.documentElement as HTMLElement & {
      requestFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => void;
    };
    try {
      if (typeof root.requestFullscreen === "function") {
        await root.requestFullscreen();
        return;
      }
      if (typeof root.webkitRequestFullscreen === "function") {
        root.webkitRequestFullscreen();
        return;
      }
      setIsFallbackActive(true);
      setIsFullscreen(true);
    } catch {
      setIsFallbackActive(true);
      setIsFullscreen(true);
    }
  }, []);

  const exit = useCallback(async () => {
    const doc = document as Document & { webkitExitFullscreen?: () => void };
    try {
      if (getFullscreenElement() && typeof document.exitFullscreen === "function") {
        await document.exitFullscreen();
        return;
      }
      if (typeof doc.webkitExitFullscreen === "function") {
        doc.webkitExitFullscreen();
        return;
      }
    } catch {
      // Fall through to layout fallback.
    }
    setIsFallbackActive(false);
    setIsFullscreen(false);
  }, []);

  const toggle = useCallback(async () => {
    if (isFullscreen) {
      await exit();
      return;
    }
    await enter();
  }, [isFullscreen, enter, exit]);

  return { isFullscreen, isSupported, isFallbackActive, toggle, enter, exit };
}
