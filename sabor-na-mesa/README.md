# 🍲 Sabor na Mesa

Aplicação web de receitas desenvolvida em **React + TypeScript** como Trabalho Final (AV2) da disciplina **Front-end Frameworks** — Ciência da Computação.

Consome a API pública e gratuita **[TheMealDB](https://www.themealdb.com/api.php)** para buscar receitas, categorias, ingredientes e modo de preparo.

🔗 **Deploy:** _cole aqui o link da Vercel_

---

## 👥 Integrantes e componentes

| Integrante | Componentes desenvolvidos |
|---|---|
| Nome 1 | `Navbar`, `Footer` |
| Nome 2 | `SearchBar`, `FavoriteButton` |
| Nome 3 | `RecipeCard`, `RecipeGrid` |
| Nome 4 | `CategoryCard`, `IngredientList` |
| Nome 5 | `Loader`, `ErrorMessage` |

---

## ✅ Requisitos atendidos

| Requisito | Como foi atendido |
|---|---|
| **TypeScript** | Todo o projeto em `.ts` / `.tsx`, com tipos em `src/types.ts` |
| **≥ 8 componentes funcionais** | 10 componentes em `src/components/` |
| **≥ 5 páginas** | 7 páginas + 404 em `src/pages/` (Início, Buscar, Categorias, Receitas da categoria, Detalhes, Favoritos, Sobre) |
| **≥ 4 hooks diferentes** | `useState`, `useEffect`, `useContext`, `useRef`, `useMemo`, `useCallback` + hooks do React Router (`useParams`, `useNavigate`, `useSearchParams`, `useLocation`) + **custom hooks** `useFetch` e `useFavorites` |
| **Roteamento** | React Router DOM, incluindo rotas dinâmicas (`/receita/:id`, `/categorias/:name`) |
| **API (extra)** | Integração com a API REST TheMealDB |

### Onde cada hook é usado

- **useState** — `SearchBar`, `Navbar`, `IngredientList`, `Search`, `FavoritesContext`
- **useEffect** — `useFetch` (requisições), `FavoritesContext` (salvar no localStorage), `App` (scroll ao topo)
- **useContext** — `useFavorites` acessa o `FavoritesContext` em qualquer componente
- **useRef** — `SearchBar` foca o campo de busca automaticamente
- **useMemo** — `Search` (filtro e ordenação) e `RecipeDetails` (ingredientes e passos)
- **useCallback** — `useFetch` (função `refetch`)
- **Custom hooks** — `useFetch` (buscar dados da API) e `useFavorites` (favoritos globais)

---

## 📁 Estrutura

```
src/
├── components/     # 10 componentes reutilizáveis
├── context/        # FavoritesContext (estado global + localStorage)
├── hooks/          # useFetch (custom hook)
├── pages/          # páginas da aplicação
├── services/api.ts # endpoints da API e funções auxiliares
├── types.ts        # interfaces TypeScript
├── App.tsx         # rotas
└── main.tsx        # ponto de entrada
```

---

## ▶️ Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 18 ou superior.

```bash
git clone https://github.com/SEU-USUARIO/sabor-na-mesa.git
cd sabor-na-mesa
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Para gerar a versão de produção: `npm run build`.

> A API usa nomes em inglês. Para buscar, tente: `chicken`, `cake`, `pasta`, `beef`, `soup`.

---

## 🖼️ Telas

| Início | Busca |
|---|---|
| ![Início](prints/home.png) | ![Busca](prints/busca.png) |

| Detalhes da receita | Favoritos |
|---|---|
| ![Detalhes](prints/detalhes.png) | ![Favoritos](prints/favoritos.png) |
