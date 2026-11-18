import { useEffect, useState } from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  autoRetrySeconds?: number; // 0 desliga a nova tentativa automática
}

// Componente 10 — Mensagem de erro com contagem regressiva para tentar de novo sozinho
export default function ErrorMessage({ message, onRetry, autoRetrySeconds = 10 }: ErrorMessageProps) {
  const [seconds, setSeconds] = useState(autoRetrySeconds);
  const [paused, setPaused] = useState(false);
  const autoRetry = Boolean(onRetry) && autoRetrySeconds > 0 && !paused;

  useEffect(() => {
    if (!autoRetry) return;
    // Chegou a zero: tenta de novo
    if (seconds === 0) {
      onRetry?.();
      return;
    }
    // Diminui 1 segundo
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, autoRetry, onRetry]);

  return (
    <div className="error-box" role="alert">
      <p>⚠️ {message}</p>
      {autoRetry && <p className="muted">Tentando novamente em {seconds}s...</p>}
      {onRetry && (
        <div className="error-actions">
          <button onClick={onRetry}>Tentar agora</button>
          {autoRetry && (
            <button className="btn-secondary" onClick={() => setPaused(true)}>
              Cancelar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
