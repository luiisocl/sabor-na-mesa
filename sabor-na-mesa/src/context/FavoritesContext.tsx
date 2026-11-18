import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Meal } from '../types';

// Dados que o contexto compartilha com toda a aplicação
interface FavoritesContextType {
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
const STORAGE_KEY = 'sabor-na-mesa:favoritos';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // Carrega os favoritos salvos no navegador ao abrir o site
  const [favorites, setFavorites] = useState<Meal[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Meal[];
    } catch {
      return [];
    }
  });

  // Sempre que a lista mudar, salva de novo no navegador
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      /* navegador sem localStorage: ignora */
    }
  }, [favorites]);

  const isFavorite = (id: string) => favorites.some((m) => m.idMeal === id);

  const toggleFavorite = (meal: Meal) => {
    setFavorites((prev) =>
      prev.some((m) => m.idMeal === meal.idMeal)
        ? prev.filter((m) => m.idMeal !== meal.idMeal)
        : [...prev, { idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb, strCategory: meal.strCategory }],
    );
  };

  const clearFavorites = () => setFavorites([]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook que usa useContext para acessar os favoritos em qualquer componente
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites precisa estar dentro de <FavoritesProvider>');
  return context;
}
