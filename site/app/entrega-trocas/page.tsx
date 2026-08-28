import type { Metadata } from 'next';
import { EditorialPage } from '@/components/editorial';

export const metadata: Metadata = { title: 'Entrega, trocas e devoluções', description: 'Estado ainda não operacional das políticas da HEAL.', robots: { index: false, follow: false } };

export default function Page() {
  return <EditorialPage eyebrow="Operação · a validar" title="Entrega, trocas e devoluções." lede="Prazos, cobertura, cálculo, custos, regras e contato dependem da operação real." notice="Esta página é um template informativo, não uma política vigente nem parecer jurídico." sections={[
    { title: 'Entrega', content: <p>Cobertura, transportadoras, cálculo, prazos e acompanhamento: [A VALIDAR].</p> },
    { title: 'Troca e devolução', content: <p>Canal, condições, exceções, processo e reembolso: [A VALIDAR jurídico/operacional].</p> },
    { title: 'Vigência', content: <p>Data de início e última atualização: [A VALIDAR].</p> },
  ]} />;
}

