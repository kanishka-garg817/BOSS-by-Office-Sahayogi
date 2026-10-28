import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("resize", onChange);
  };
};

const getSnapshot = () => window.innerHeight;

// A typical laptop height; the client corrects it on hydration.
const SERVER_HEIGHT = 800;
const getServerSnapshot = () => SERVER_HEIGHT;

/** The height of the browser window in pixels, kept current as it is resized. */
export const useViewportHeight = (): number =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
