// hooks/use-outside-click.ts
import { useEffect } from "react";

/**
 * Hook to detect clicks outside of a specified element.
 * Works with nullable refs and is TypeScript-safe.
 *
 * @param ref - A React ref to the element you want to detect outside clicks for
 * @param callback - Function to call when a click outside is detected
 */
export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: (event?: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      // Do nothing if clicking inside the element
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
