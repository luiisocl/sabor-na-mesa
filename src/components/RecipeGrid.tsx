import { useEffect, useState } from 'react';
import type { Meal } from '../types';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  meals: Meal[];
  emptyMessage?: string;
  pageSize?: number; // quantos cards mostrar por vez
}

// Componente 6 — Grade de RecipeCard com botão "Carregar mais" (paginação)
export default function RecipeGrid({ meals, emptyMessage = 'Nenhuma receita encontrada.', pageSize = 12 }: RecipeGridProps) {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  // Quando a lista muda (nova busca, outro filtro), volta para a primeira página
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [meals, pageSize]);

  if (meals.length === 0) return <p className="empty">{emptyMessage}</p>;

  const visibleMeals = meals.slice(0, visibleCount);
  const remaining = meals.length - visibleCount;

  return (
    <div className="grid-wrapper">
      <div className="grid">
        {visibleMeals.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
      <p className="muted grid-count">
        Mostrando {visibleMeals.length} de {meals.length} receita(s)
      </p>
      {remaining > 0 && (
        <button className="btn-secondary load-more" onClick={() => setVisibleCount((c) => c + pageSize)}>
          Carregar mais ({Math.min(remaining, pageSize)})
        </button>
      )}
    </div>
  );
}
