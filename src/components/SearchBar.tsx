import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  initialValue?: string;
  onSearch: (term: string) => void;
  autoFocus?: boolean;
  liveSearch?: boolean; // busca enquanto o usuário digita
}

// Componente 3 — Campo de busca.
// useRef foca o input automaticamente; useDebounce permite buscar enquanto digita.
export default function SearchBar({ initialValue = '', onSearch, autoFocus = false, liveSearch = false }: SearchBarProps) {
  const [term, setTerm] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedTerm = useDebounce(term.trim(), 600);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Mantém o campo sincronizado se a busca mudar pela URL
  useEffect(() => {
    setTerm(initialValue);
  }, [initialValue]);

  // Busca automática: só dispara 600ms depois que o usuário PARA de digitar
  useEffect(() => {
    if (liveSearch && debouncedTerm.length >= 3 && debouncedTerm !== initialValue) {
      onSearch(debouncedTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm, liveSearch]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (term.trim()) onSearch(term.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Busque uma receita: frango, bolo, massa..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
