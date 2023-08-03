import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number, isStop: boolean) => {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const run = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (!isStop && delay !== null) {
      let timerId = setInterval(run, delay);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [delay, isStop]);
};

export default useInterval;
