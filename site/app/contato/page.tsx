import type { Metadata } from 'next';
import { EditorialPage } from '@/components/editorial';

export const metadata: Metadata = { title: 'Contato', description: 'Estado demonstrativo do futuro atendimento HEAL.', robots: { index: false, follow: false } };

export default function Page() {
  return <EditorialPage eyebrow="Contato · demonstração" title="Fale com a HEAL." lede="O canal, os responsáveis, os horários e os prazos de atendimento ainda não foram definidos." notice="Nenhuma mensagem é enviada por este protótipo. Não envie dados de cartão nem informações de saúde." sections={[
    { title: 'Assuntos previstos', content: <p>Produto e uso; pedido e entrega; troca ou devolução; privacidade; outro.</p> },
    { title: 'Canal e SLA', content: <p>Email, formulário, telefone, horário e prazo de resposta: [A VALIDAR].</p> },
  ]} />;
}

