import { Link } from 'react-router-dom';
import RecipeGrid from '../components/RecipeGrid';
import { useFavorites } from '../context/FavoritesContext';

// Página 6 — Favoritos (dados vêm do Context + localStorage)
export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites();

  return (
    <div className="page">
      <div className="section-header">
        <h1>Minhas favoritas</h1>
        {favorites.length > 0 && (
          <button className="btn-secondary" onClick={clearFavorites}>
            Limpar tudo
          </button>
        )}
      </div>
      {favorites.length === 0 ? (
        <p className="empty">
          Você ainda não favoritou nenhuma receita. <Link to="/buscar" className="link">Que tal buscar uma?</Link>
        </p>
      ) : (
        <RecipeGrid meals={favorites} />
      )}
    </div>
  );
}
