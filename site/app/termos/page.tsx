import type { Metadata } from 'next';
import { EditorialPage } from '@/components/editorial';

export const metadata: Metadata = { title: 'Termos de uso e compra', description: 'Template de termos da HEAL ainda não vigente.', robots: { index: false, follow: false } };

export default function Page() {
  return <EditorialPage eyebrow="Termos · a validar" title="Termos de uso e compra." lede="A versão final dependerá da empresa, operação, catálogo, checkout e políticas reais." notice="Este conteúdo não é um contrato, uma oferta comercial nem parecer jurídico." sections={[
    { title: 'Partes e oferta', content: <p>Identificação empresarial, disponibilidade, preços, meios de pagamento e formação do pedido: [A VALIDAR].</p> },
    { title: 'Operação', content: <p>Entrega, trocas, devoluções, atendimento e responsabilidades: [A VALIDAR jurídico/operacional].</p> },
    { title: 'Vigência', content: <p>Versão, data e canal de contato: [A VALIDAR].</p> },
  ]} />;
}

