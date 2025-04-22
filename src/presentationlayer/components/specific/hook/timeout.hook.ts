import { useCallback, useEffect, useRef, useMemo } from 'react';

export default function useTimeout(callback: any, delay: number) {
  const timeoutRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  const memoizedCallback = useCallback(
    (args?: any) => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = undefined;
        callbackRef.current?.(args);
      }, delay);
    },
    [delay, timeoutRef, callbackRef],
  );

  return useMemo(() => [memoizedCallback], [memoizedCallback]);
}
