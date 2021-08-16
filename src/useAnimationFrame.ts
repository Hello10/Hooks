import React, {useRef} from 'react';

const {requestAnimationFrame, cancelAnimationFrame} = window;

export interface CallbackParams {
  delta: number;
  total: number;
}

export default function useAnimationFrame (callback: (params: CallbackParams) => void): void {
  const request = useRef<number>();
  const last_time = useRef<number>();
  const first_time = useRef<number>();

  function animate (time: number) {
    let first = first_time.current;
    if (first === undefined) {
      first_time.current = time;
      first = time;
    }

    const last = last_time.current;
    if (last !== undefined) {
      const delta = time - last;
      const total = time - first;
      callback({delta, total});
    }

    last_time.current = time;
    request.current = requestAnimationFrame(animate);
  }

  React.useEffect(()=> {
    request.current = requestAnimationFrame(animate);
    return ()=> {
      if (request.current) {
        cancelAnimationFrame(request.current);
      }
    };
  }, []);
}
