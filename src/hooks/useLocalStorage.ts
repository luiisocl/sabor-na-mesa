import { useEffect } from 'react';

// Lê um valor salvo no navegador. Se não existir (ou der erro), usa o valor padrão.
export function readLocalStorage<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

// Custom hook: sempre que "value" mudar, salva no localStorage com a chave "key".
// Usa useEffect por dentro e é genérico (<T>), funciona com qualquer tipo de dado.
export function useLocalStorage<T>(key: string, value: T) {
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* navegador sem localStorage: ignora */
    }
  }, [key, value]);
}
