import type { Ingredient, Meal } from '../types';

// API pública e gratuita: https://www.themealdb.com/api.php
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const api = {
  search: (term: string) => `${BASE_URL}/search.php?s=${encodeURIComponent(term)}`,
  byId: (id: string) => `${BASE_URL}/lookup.php?i=${id}`,
  random: () => `${BASE_URL}/random.php`,
  categories: () => `${BASE_URL}/categories.php`,
  byCategory: (category: string) => `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
};

// A API guarda os ingredientes em 20 campos separados.
// Esta função junta tudo em uma lista limpa.
export function extractIngredients(meal: Meal): Ingredient[] {
  const list: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim() ?? '';
    if (name) list.push({ name, measure });
  }
  return list;
}

// Nomes das categorias em português (a API retorna em inglês)
export const categoryNames: Record<string, string> = {
  Beef: 'Carne bovina',
  Breakfast: 'Café da manhã',
  Chicken: 'Frango',
  Dessert: 'Sobremesa',
  Goat: 'Cabrito',
  Lamb: 'Cordeiro',
  Miscellaneous: 'Diversos',
  Pasta: 'Massas',
  Pork: 'Porco',
  Seafood: 'Frutos do mar',
  Side: 'Acompanhamentos',
  Starter: 'Entradas',
  Vegan: 'Vegano',
  Vegetarian: 'Vegetariano',
};

export const translateCategory = (name?: string) => (name ? categoryNames[name] ?? name : '');
