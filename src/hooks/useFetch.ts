import { useCallback, useEffect, useState } from 'react';

// Cache em memória: guarda as respostas já carregadas para não buscar de novo
const cache = new Map<string, unknown>();

// Custom hook: busca dados de uma URL e controla loading/erro.
// Usa useState, useEffect e useCallback por dentro.
export function useFetch<T>(url: string | null, useCache = true) {
  const [data, setData] = useState<T | null>(() =>
    url && useCache ? ((cache.get(url) as T) ?? null) : null,
  );
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

    // Se já está no cache, mostra na hora e não faz requisição
    if (useCache && reloadKey === 0 && cache.has(url)) {
      setData(cache.get(url) as T);
      setLoading(false);
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
      .then((json) => {
        if (useCache) cache.set(url, json);
        setData(json);
      })
      .catch((err: Error) => {
        if (err.name !== 'AbortError') setError('Não foi possível carregar os dados. Verifique sua conexão.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [url, reloadKey, useCache]);

  return { data, loading, error, refetch };
}