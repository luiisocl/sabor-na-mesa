import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import FavoriteButton from '../components/FavoriteButton';
import IngredientList from '../components/IngredientList';
import Loader from '../components/Loader';
import { useFetch } from '../hooks/useFetch';
import { api, extractIngredients, translateCategory } from '../services/api';
import type { MealsResponse } from '../types';

// Página 5 — Detalhes da receita (rota dinâmica /receita/:id)
export default function RecipeDetails() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useFetch<MealsResponse>(api.byId(id));
  const meal = data?.meals?.[0];

  const ingredients = useMemo(() => (meal ? extractIngredients(meal) : []), [meal]);
  const steps = useMemo(
    () => meal?.strInstructions?.split(/\r?\n/).map((s) => s.trim()).filter((s) => s.length > 3) ?? [],
    [meal],
  );

  if (loading) return <Loader text="Carregando receita..." />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (data && !meal) return <ErrorMessage message="Receita não encontrada." />;
  if (!meal) return null;

  return (
    <div className="page">
      <button className="link back" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <div className="details-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div>
          <span className="tag">
            {translateCategory(meal.strCategory)} · {meal.strArea}
          </span>
          <h1>{meal.strMeal}</h1>
          {meal.strTags && (
            <div className="tags">
              {meal.strTags.split(',').filter(Boolean).map((t) => (
                <span key={t}>#{t.trim()}</span>
              ))}
            </div>
          )}
          <div className="details-actions">
            <FavoriteButton meal={meal} showLabel />
            {meal.strYoutube && (
              <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="btn-secondary">
                ▶ Ver vídeo
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="details-body">
        <IngredientList ingredients={ingredients} />
        <div className="steps">
          <h2>Modo de preparo</h2>
          <ol>
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
