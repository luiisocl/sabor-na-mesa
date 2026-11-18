import { Link } from 'react-router-dom';
import { translateArea, translateCategory } from '../services/api';
import type { Meal } from '../types';
import FavoriteButton from './FavoriteButton';

// Componente 5 — Card de uma receita
export default function RecipeCard({ meal }: { meal: Meal }) {
  return (
    <Link to={`/receita/${meal.idMeal}`} className="recipe-card">
      <div className="recipe-card-img">
        <img src={`${meal.strMealThumb}/preview`} alt={meal.strMeal} loading="lazy" />
        <FavoriteButton meal={meal} />
      </div>
      <div className="recipe-card-body">
        <h3>{meal.strMeal}</h3>
        {(meal.strCategory || meal.strArea) && (
          <p className="muted">
            {translateCategory(meal.strCategory)}
            {meal.strCategory && meal.strArea && ' · '}
            {translateArea(meal.strArea)}
          </p>
        )}
      </div>
    </Link>
  );
}
