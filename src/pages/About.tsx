import { Link } from 'react-router-dom';

// Página 7 — Sobre o Sabor na Mesa
export default function About() {
  const features = [
    'Busque receitas pelo nome e veja os resultados enquanto digita',
    'Filtre por país de origem e ordene de A a Z',
    'Explore receitas por categoria: massas, sobremesas, frutos do mar e muito mais',
    'Veja ingredientes e modo de preparo, marcando o que já separou',
    'Descubra uma sugestão diferente a cada visita',
    'Salve suas favoritas para encontrar depois',
  ];

  return (
    <div className="page about">
      <h1>Sobre o Sabor na Mesa</h1>
      <p>
        O <strong>Sabor na Mesa</strong> nasceu para ajudar quem quer variar o cardápio sem perder tempo. Aqui você encontra
        receitas do mundo todo, com a lista de ingredientes e o passo a passo para preparar cada prato.
      </p>

      <h2>O que você pode fazer</h2>
      <ul>
        {features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <h2>De onde vêm as receitas</h2>
      <p>
        As receitas são fornecidas pelo{' '}
        <a href="https://www.themealdb.com" target="_blank" rel="noreferrer" className="link">
          TheMealDB
        </a>
        , um acervo aberto com pratos de dezenas de países. Por isso, o nome e o modo de preparo de cada receita aparecem em inglês, mas você pode buscar em português.
      </p>

      <p>
        Tem uma sugestão ou encontrou algum problema?{' '}
        <Link to="/contato" className="link">
          Fale com a gente
        </Link>
        .
      </p>
    </div>
  );
}
