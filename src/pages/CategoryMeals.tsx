import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import RecipeGrid from '../components/RecipeGrid';
import { useFetch } from '../hooks/useFetch';
import { api, translateCategory } from '../services/api';
import type { MealsResponse } from '../types';

// Página 4 — Receitas de uma categoria (rota dinâmica /categorias/:nome)
export default function CategoryMeals() {
  const { name = '' } = useParams();
  const { data, loading, error, refetch } = useFetch<MealsResponse>(api.byCategory(name));

  return (
    <div className="page">
      <Link to="/categorias" className="link">
        ← Voltar para categorias
      </Link>
      <h1>{translateCategory(name)}</h1>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}
      {data && <RecipeGrid meals={data.meals ?? []} />}
    </div>
  );
}
