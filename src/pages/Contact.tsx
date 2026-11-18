import ContactForm from '../components/ContactForm';

// Página 8 — Contato
export default function Contact() {
  return (
    <div className="page contact">
      <div>
        <h1>Fale com a gente</h1>
        <p className="muted">
          Tem uma sugestão de receita, encontrou um erro ou quer deixar um elogio? Mande uma mensagem pelo formulário.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
