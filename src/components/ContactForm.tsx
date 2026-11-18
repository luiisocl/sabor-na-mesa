import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';

// Formato dos dados do formulário
interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Um erro (texto) opcional para cada campo
type ContactErrors = Partial<Record<keyof ContactData, string>>;

const initialData: ContactData = { name: '', email: '', subject: '', message: '' };
const MAX_MESSAGE = 500;

// Regras de validação: devolve os erros encontrados
function validate(data: ContactData): ContactErrors {
  const errors: ContactErrors = {};
  if (data.name.trim().length < 3) errors.name = 'Digite seu nome (mínimo 3 letras).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Digite um e-mail válido.';
  if (!data.subject) errors.subject = 'Escolha um assunto.';
  if (data.message.trim().length < 10) errors.message = 'A mensagem precisa ter pelo menos 10 caracteres.';
  return errors;
}

// Componente 11 — Formulário de contato controlado, com validação e foco no primeiro erro
export default function ContactForm() {
  const [data, setData] = useState<ContactData>(initialData);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);

  // useRef guarda a referência de cada campo para podermos focar nele
  const fieldRefs = useRef<Partial<Record<keyof ContactData, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>>>({});

  // Um único handler para todos os campos: usa o atributo "name" do input
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = e.target.name as keyof ContactData;
    setData((prev) => ({ ...prev, [field]: e.target.value }));
    // Apaga o erro do campo assim que o usuário corrige
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(data);
    setErrors(found);

    // Se tiver erro, coloca o cursor no primeiro campo inválido
    const firstError = (Object.keys(initialData) as (keyof ContactData)[]).find((f) => found[f]);
    if (firstError) {
      fieldRefs.current[firstError]?.focus();
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <div className="contact-success">
        <h2>✅ Mensagem enviada!</h2>
        <p>
          Obrigado, <strong>{data.name.split(' ')[0]}</strong>. Responderemos em <strong>{data.email}</strong>.
        </p>
        <button
          className="btn-secondary"
          onClick={() => {
            setData(initialData);
            setSent(false);
          }}
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label>
        Nome
        <input
          name="name"
          value={data.name}
          onChange={handleChange}
          ref={(el) => (fieldRefs.current.name = el)}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>

      <label>
        E-mail
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          ref={(el) => (fieldRefs.current.email = el)}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </label>

      <label>
        Assunto
        <select
          name="subject"
          value={data.subject}
          onChange={handleChange}
          ref={(el) => (fieldRefs.current.subject = el)}
          aria-invalid={Boolean(errors.subject)}
        >
          <option value="">Selecione...</option>
          <option value="sugestao">Sugestão de receita</option>
          <option value="erro">Encontrei um erro</option>
          <option value="elogio">Elogio</option>
          <option value="outro">Outro</option>
        </select>
        {errors.subject && <span className="field-error">{errors.subject}</span>}
      </label>

      <label>
        Mensagem
        <textarea
          name="message"
          rows={5}
          maxLength={MAX_MESSAGE}
          value={data.message}
          onChange={handleChange}
          ref={(el) => (fieldRefs.current.message = el)}
          aria-invalid={Boolean(errors.message)}
        />
        <span className="char-count">
          {data.message.length}/{MAX_MESSAGE}
        </span>
        {errors.message && <span className="field-error">{errors.message}</span>}
      </label>

      <button type="submit" className="btn-primary">
        Enviar mensagem
      </button>
    </form>
  );
}
