import { useState, useLayoutEffect } from "react"

/**
 * @description custom hook to have access to window size as resizing happens
 * @returns current window width
 */
export function useWindowSize() {
    const [size, setSize] = useState(0);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}