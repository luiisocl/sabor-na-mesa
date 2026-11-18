import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import RecipeGrid from '../components/RecipeGrid';
import SearchBar from '../components/SearchBar';
import { useFetch } from '../hooks/useFetch';
import { api, fallbackSearch, toEnglishSearch, translateArea } from '../services/api';
import type { MealsResponse } from '../types';

// Página 2 — Buscar: pesquisa na API e filtra/ordena os resultados com useMemo
export default function Search() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const [area, setArea] = useState('todas');
  const [order, setOrder] = useState<'az' | 'za'>('az');

  // O usuário digita em português; o dicionário converte para o inglês que a API entende
  const englishQuery = query ? toEnglishSearch(query) : '';

  const main = useFetch<MealsResponse>(englishQuery ? api.search(englishQuery) : null);

  // Se a busca completa não achou nada, tenta só a palavra principal
  const fallback = query ? fallbackSearch(query) : null;
  const useFallback = Boolean(main.data && !main.data.meals && fallback && fallback !== englishQuery);
  const backup = useFetch<MealsResponse>(useFallback ? api.search(fallback!) : null);

  const { data, error, refetch } = useFallback ? backup : main;
  // Enquanto o plano B ainda não começou a carregar, continua mostrando "carregando"
  const loading = useFallback ? backup.loading || (!backup.data && !backup.error) : main.loading;
  const searchedAs = useFallback ? fallback! : englishQuery;
  const wasTranslated = searchedAs.toLowerCase() !== query.trim().toLowerCase();
  const meals = useMemo(() => data?.meals ?? [], [data]);

  // Lista de países/origens presentes no resultado (para o filtro)
  const areas = useMemo(() => [...new Set(meals.map((m) => m.strArea).filter(Boolean))] as string[], [meals]);

  // Só recalcula quando os resultados, o filtro ou a ordem mudam
  const filtered = useMemo(() => {
    const list = area === 'todas' ? meals : meals.filter((m) => m.strArea === area);
    return [...list].sort((a, b) =>
      order === 'az' ? a.strMeal.localeCompare(b.strMeal) : b.strMeal.localeCompare(a.strMeal),
    );
  }, [meals, area, order]);

  const handleSearch = (term: string) => {
    setArea('todas');
    // replace: true evita encher o histórico do navegador a cada busca automática
    setParams({ q: term }, { replace: true });
  };

  return (
    <div className="page">
      <h1>Buscar receitas</h1>
      <SearchBar initialValue={query} onSearch={handleSearch} autoFocus liveSearch />
      <p className="muted">A busca começa sozinha quando você para de digitar (mínimo 3 letras).</p>

      {query && meals.length > 0 && (
        <div className="filters">
          <span>
            {filtered.length} resultado(s) para <strong>“{query}”</strong>
            {wasTranslated && <span className="muted"> (buscado como “{searchedAs}”)</span>}
          </span>
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="todas">Todas as origens</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {translateArea(a)}
              </option>
            ))}
          </select>
          <select value={order} onChange={(e) => setOrder(e.target.value as 'az' | 'za')}>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>
      )}

      {!query && <p className="empty">Digite algo acima para começar. Ex.: frango, bolo de chocolate, massa, sopa.</p>}
      {loading && <Loader text="Buscando receitas..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {query && !loading && !error && (
        <RecipeGrid meals={filtered} emptyMessage={`Nenhuma receita encontrada para “${query}”.`} />
      )}
    </div>
  );
}
