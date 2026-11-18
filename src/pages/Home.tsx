import { Link, useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import ErrorMessage from '../components/ErrorMessage';
import FavoriteButton from '../components/FavoriteButton';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import { useFetch } from '../hooks/useFetch';
import { api, translateArea, translateCategory } from '../services/api';
import type { CategoriesResponse, MealsResponse } from '../types';

// Página 1 — Início: busca rápida, receita aleatória e categorias em destaque
export default function Home() {
  const navigate = useNavigate();
  const random = useFetch<MealsResponse>(api.random(), false);
  const categories = useFetch<CategoriesResponse>(api.categories());

  const meal = random.data?.meals?.[0];

  return (
    <div className="page">
      <section className="hero">
        <h1>O que vamos cozinhar hoje?</h1>
        <p>Milhares de receitas do mundo todo, com ingredientes e modo de preparo.</p>
        <SearchBar onSearch={(term) => navigate(`/buscar?q=${encodeURIComponent(term)}`)} />
      </section>

      <section>
        <div className="section-header">
          <h2>Sugestão do dia</h2>
          <button className="btn-secondary" onClick={random.refetch}>
            🎲 Outra receita
          </button>
        </div>
        {random.loading && <Loader text="Sorteando uma receita..." />}
        {random.error && <ErrorMessage message={random.error} onRetry={random.refetch} />}
        {meal && !random.loading && (
          <Link to={`/receita/${meal.idMeal}`} className="featured">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div>
              <span className="tag">
                {translateCategory(meal.strCategory)} · {translateArea(meal.strArea)}
              </span>
              <h3>{meal.strMeal}</h3>
              <p className="muted">{meal.strInstructions?.slice(0, 180)}...</p>
              <div className="featured-actions">
                <span className="link">Ver receita →</span>
                <FavoriteButton meal={meal} showLabel />
              </div>
            </div>
          </Link>
        )}
      </section>

      <section>
        <div className="section-header">
          <h2>Categorias</h2>
          <Link to="/categorias" className="link">
            Ver todas →
          </Link>
        </div>
        {categories.loading && <Loader />}
        {categories.error && <ErrorMessage message={categories.error} onRetry={categories.refetch} />}
        <div className="category-grid">
          {categories.data?.categories.slice(0, 8).map((cat) => (
            <CategoryCard key={cat.idCategory} category={cat} />
          ))}
        </div>
      </section>
    </div>
  );
}
