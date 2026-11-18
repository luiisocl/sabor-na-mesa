import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

// Componente 1 — Barra de navegação com contador de favoritos e menu mobile
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { favorites } = useFavorites();

  const links = [
    { to: '/', label: 'Início' },
    { to: '/buscar', label: 'Buscar' },
    { to: '/categorias', label: 'Categorias' },
    { to: '/favoritos', label: `Favoritos (${favorites.length})` },
    { to: '/sobre', label: 'Sobre' },
  ];

  return (
    <header className="navbar">
      <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
        🍲 Sabor na Mesa
      </NavLink>
      <button className="menu-toggle" aria-label="Abrir menu" onClick={() => setOpen(!open)}>
        {open ? '✕' : '☰'}
      </button>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setOpen(false)}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
