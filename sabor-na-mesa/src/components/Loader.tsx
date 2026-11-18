// Componente 9 — Indicador de carregamento
export default function Loader({ text = 'Carregando...' }: { text?: string }) {
  return (
    <div className="loader" role="status">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}
