import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import RecipeGrid from '../components/RecipeGrid';
import SearchBar from '../components/SearchBar';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import type { MealsResponse } from '../types';

// Página 2 — Buscar: pesquisa na API e filtra/ordena os resultados com useMemo
export default function Search() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const [area, setArea] = useState('todas');
  const [order, setOrder] = useState<'az' | 'za'>('az');

  const { data, loading, error, refetch } = useFetch<MealsResponse>(query ? api.search(query) : null);
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
    setParams({ q: term });
  };

  return (
    <div className="page">
      <h1>Buscar receitas</h1>
      <SearchBar initialValue={query} onSearch={handleSearch} autoFocus />

      {query && meals.length > 0 && (
        <div className="filters">
          <span>
            {filtered.length} resultado(s) para <strong>“{query}”</strong>
          </span>
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="todas">Todas as origens</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <select value={order} onChange={(e) => setOrder(e.target.value as 'az' | 'za')}>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>
      )}

      {!query && <p className="empty">Digite algo acima para começar. Dica: a API usa nomes em inglês.</p>}
      {loading && <Loader text="Buscando receitas..." />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {query && !loading && !error && (
        <RecipeGrid meals={filtered} emptyMessage={`Nenhuma receita encontrada para “${query}”.`} />
      )}
    </div>
  );
}
