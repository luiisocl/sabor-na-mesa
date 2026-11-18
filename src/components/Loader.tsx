import { useEffect, useState } from 'react';

interface LoaderProps {
  text?: string;
  delay?: number; // tempo em ms antes de aparecer
}

// Componente 9 — Indicador de carregamento.
// Só aparece depois de "delay" ms: se a resposta chegar rápido, o spinner nem pisca na tela.
export default function Loader({ text = 'Carregando...', delay = 300 }: LoaderProps) {
  const [visible, setVisible] = useState(delay === 0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    // Se o carregamento terminar antes (componente sai da tela), cancela o timer
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="loader" role="status">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}
