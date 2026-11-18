import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { readLocalStorage, useLocalStorage } from '../hooks/useLocalStorage';
import type { Meal } from '../types';

// Dados que o contexto compartilha com toda a aplicação
interface FavoritesContextType {
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

// Ações que o reducer entende (union type do TypeScript)
type FavoritesAction =
  | { type: 'ADD'; meal: Meal }
  | { type: 'REMOVE'; id: string }
  | { type: 'CLEAR' };

// Reducer: função pura que recebe o estado atual + uma ação e devolve o novo estado
function favoritesReducer(state: Meal[], action: FavoritesAction): Meal[] {
  switch (action.type) {
    case 'ADD': {
      if (state.some((m) => m.idMeal === action.meal.idMeal)) return state;
      // Guarda só os campos necessários para exibir o card
      const { idMeal, strMeal, strMealThumb, strCategory } = action.meal;
      return [...state, { idMeal, strMeal, strMealThumb, strCategory }];
    }
    case 'REMOVE':
      return state.filter((m) => m.idMeal !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
const STORAGE_KEY = 'sabor-na-mesa:favoritos';

export function FavoritesProvider({ children }: { children: ReactNode }) {
  // useReducer: o estado inicial vem do localStorage (3º argumento = função de inicialização)
  const [favorites, dispatch] = useReducer(favoritesReducer, [], () => readLocalStorage<Meal[]>(STORAGE_KEY, []));

  // Custom hook: salva no navegador sempre que a lista mudar
  useLocalStorage(STORAGE_KEY, favorites);

  const isFavorite = (id: string) => favorites.some((m) => m.idMeal === id);

  const toggleFavorite = (meal: Meal) =>
    dispatch(isFavorite(meal.idMeal) ? { type: 'REMOVE', id: meal.idMeal } : { type: 'ADD', meal });

  const clearFavorites = () => dispatch({ type: 'CLEAR' });

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
