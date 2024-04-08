import { useEffect, useState } from 'react';

export default function useDebounce<T>({ initValue, delay = 200 }: { initValue: T; delay?: number }) {
  const [listen, SetListen] = useState<T>(initValue);
  const [debounced, SetDebounced] = useState<T>(initValue);

  useEffect(() => {
    const debounceFunc = setTimeout(() => {
      SetDebounced(listen);
    }, delay);
    return () => {
      clearTimeout(debounceFunc);
    };
  }, [listen, delay]);

  return { debounced, listen, SetListen };
}
