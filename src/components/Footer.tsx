import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

// Validação simples de e-mail com expressão regular
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Componente 2 — Rodapé com newsletter (formulário validado) e resumo dos favoritos
export default function Footer() {
  const year = new Date().getFullYear();
  const { favorites } = useFavorites();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <h3>Receba receitas novas toda semana</h3>
        {status === 'success' ? (
          <p className="success-text">✅ Inscrição feita! Fique de olho no seu e-mail.</p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              value={email}
              placeholder="seu@email.com"
              aria-label="Seu e-mail"
              aria-invalid={status === 'error'}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
            />
            <button type="submit">Inscrever</button>
          </form>
        )}
        {status === 'error' && <p className="field-error">Digite um e-mail válido.</p>}
      </div>

      <p className="muted">
        {favorites.length === 0 ? (
          'Você ainda não tem receitas favoritas.'
        ) : (
          <>
            Você tem <Link to="/favoritos">{favorites.length} receita(s) favorita(s)</Link>.
          </>
        )}
      </p>

      <p>
        Sabor na Mesa © {year} · Dados de{' '}
        <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">
          TheMealDB
        </a>{' '}
        · <Link to="/contato">Contato</Link>
      </p>    </footer>
  );
}
