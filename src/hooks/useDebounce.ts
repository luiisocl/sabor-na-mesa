import { useEffect, useState } from 'react';

// Custom hook: devolve o valor só depois que ele parar de mudar por "delay" ms.
// Ex.: enquanto o usuário digita, não faz uma requisição a cada tecla.
export function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    // Se o valor mudar antes do tempo acabar, cancela o timer anterior
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
