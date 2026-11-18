// Componente 2 — Rodapé
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>
        Sabor na Mesa © {year} · Dados de{' '}
        <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">
          TheMealDB
        </a>
      </p>
      <p className="muted">Trabalho final — Front-end Frameworks</p>
    </footer>
  );
}
