import type { Meal } from '../types';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  meals: Meal[];
  emptyMessage?: string;
}

// Componente 6 — Grade que exibe uma lista de RecipeCard
export default function RecipeGrid({ meals, emptyMessage = 'Nenhuma receita encontrada.' }: RecipeGridProps) {
  if (meals.length === 0) return <p className="empty">{emptyMessage}</p>;

  return (
    <div className="grid">
      {meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
