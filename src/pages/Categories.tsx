import CategoryCard from '../components/CategoryCard';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { useFetch } from '../hooks/useFetch';
import { api } from '../services/api';
import type { CategoriesResponse } from '../types';

// Página 3 — Todas as categorias
export default function Categories() {
  const { data, loading, error, refetch } = useFetch<CategoriesResponse>(api.categories());

  return (
    <div className="page">
      <h1>Categorias</h1>
      <p className="muted">Escolha uma categoria para ver as receitas.</p>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      <div className="category-grid">
        {data?.categories.map((cat) => (
          <CategoryCard key={cat.idCategory} category={cat} />
        ))}
      </div>
    </div>
  );
}
