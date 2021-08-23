import { useCallback, useEffect, useRef } from "react";

export const useCallbackProp = <F extends (...args: any) => any>(
  callback?: F
) => {
  const ref = useRef(callback);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback((...args: Parameters<F>): ReturnType<F> | undefined => {
    return ref.current?.(...args);
  }, []);
};
