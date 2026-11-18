import type { MouseEvent } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import type { Meal } from '../types';

interface FavoriteButtonProps {
  meal: Meal;
  showLabel?: boolean;
}

// Componente 4 — Botão de favoritar (usa o contexto global de favoritos)
export default function FavoriteButton({ meal, showLabel = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(meal.idMeal);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault(); // evita abrir o link do card ao clicar no coração
    toggleFavorite(meal);
  };

  return (
    <button
      className={active ? 'fav-btn active' : 'fav-btn'}
      onClick={handleClick}
      aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      {active ? '♥' : '♡'}
      {showLabel && <span>{active ? ' Favoritada' : ' Favoritar'}</span>}
    </button>
  );
}
