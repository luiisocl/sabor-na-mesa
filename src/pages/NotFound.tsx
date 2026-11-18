import { Link } from 'react-router-dom';

// Página 404 — rota não encontrada
export default function NotFound() {
  return (
    <div className="page not-found">
      <h1>404</h1>
      <p>Essa página saiu do forno antes da hora. 🍳</p>
      <Link to="/" className="link">
        Voltar para o início
      </Link>
    </div>
  );
}
