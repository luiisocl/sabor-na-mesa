interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

// Componente 10 — Mensagem de erro com botão de tentar novamente
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-box">
      <p>⚠️ {message}</p>
      {onRetry && <button onClick={onRetry}>Tentar novamente</button>}
    </div>
  );
}
