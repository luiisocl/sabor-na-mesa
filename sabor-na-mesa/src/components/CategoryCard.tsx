import { Link } from 'react-router-dom';
import { translateCategory } from '../services/api';
import type { Category } from '../types';

// Componente 7 — Card de categoria (leva para a lista de receitas dela)
export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link to={`/categorias/${category.strCategory}`} className="category-card">
      <img src={category.strCategoryThumb} alt={category.strCategory} loading="lazy" />
      <span>{translateCategory(category.strCategory)}</span>
    </Link>
  );
}
