import { useCallback, useEffect, useState } from 'react';

// Custom hook: busca dados de uma URL e controla loading/erro.
// Usa useState, useEffect e useCallback por dentro.
export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  // Permite buscar de novo (ex.: botão "tentar novamente" ou "outra receita")
  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    if (!url) {
      setData(null);
      return;
    }

    // Cancela a requisição se o componente sair da tela antes de terminar
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((json) => setData(json))
      .catch((err: Error) => {
        if (err.name !== 'AbortError') setError('Não foi possível carregar os dados. Verifique sua conexão.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [url, reloadKey]);

  return { data, loading, error, refetch };
}
