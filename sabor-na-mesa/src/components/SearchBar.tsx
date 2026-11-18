import { useEffect, useRef, useState, type FormEvent } from 'react';

interface SearchBarProps {
  initialValue?: string;
  onSearch: (term: string) => void;
  autoFocus?: boolean;
}


// Componente 3 — Campo de busca. Usa useRef para focar o input automaticamente.
export default function SearchBar({ initialValue = '', onSearch, autoFocus = false }: SearchBarProps) {
  const [term, setTerm] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Mantém o campo sincronizado se a busca mudar pela URL
  useEffect(() => setTerm(initialValue), [initialValue]);

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
        placeholder="Busque uma receita (em inglês): chicken, cake, pasta..."
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
