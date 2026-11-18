// Tipos que representam os dados retornados pela API TheMealDB

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strYoutube?: string;
  strTags?: string | null;
  // A API devolve strIngredient1..20 e strMeasure1..20
  [key: string]: string | null | undefined;
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface MealsResponse {
  meals: Meal[] | null;
}

export interface CategoriesResponse {
  categories: Category[];
}
