// Página 7 — Sobre o projeto
export default function About() {
  const tech = ['React 18', 'TypeScript', 'React Router', 'Vite', 'Context API', 'TheMealDB API'];

  return (
    <div className="page about">
      <h1>Sobre o projeto</h1>
      <p>
        O <strong>Sabor na Mesa</strong> é uma aplicação web de receitas desenvolvida como trabalho final da disciplina de
        Front-end Frameworks (Ciência da Computação). Ela consome a API pública{' '}
        <a href="https://www.themealdb.com" target="_blank" rel="noreferrer" className="link">
          TheMealDB
        </a>{' '}
        para buscar receitas, categorias, ingredientes e modo de preparo.
      </p>
      <h2>Funcionalidades</h2>
      <ul>
        <li>Busca de receitas por nome, com filtro por origem e ordenação</li>
        <li>Navegação por categorias</li>
        <li>Página de detalhes com ingredientes marcáveis e passo a passo</li>
        <li>Receita aleatória na página inicial</li>
        <li>Favoritos salvos no navegador</li>
      </ul>
      <h2>Tecnologias</h2>
      <div className="tags">
        {tech.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}
