import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import CategoryMeals from './pages/CategoryMeals';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RecipeDetails from './pages/RecipeDetails';
import Search from './pages/Search';

export default function App() {
  const { pathname } = useLocation();

  // Volta ao topo da página sempre que a rota muda
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/categorias/:name" element={<CategoryMeals />} />
          <Route path="/receita/:id" element={<RecipeDetails />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
