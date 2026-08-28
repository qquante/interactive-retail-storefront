import type { Metadata } from 'next';
import { EditorialPage } from '@/components/editorial';

export const metadata: Metadata = { title: 'Como escolher um incenso', description: 'Guia demonstrativo para comparar incensos sem adivinhar.', robots: { index: false, follow: true } };

export default function Page() {
  return <EditorialPage eyebrow="Guia de escolha" title="Escolher sem adivinhar." lede="Um aroma online não pode ser experimentado pela tela. Por isso, a HEAL organiza o que é percepção, o que é composição e o que ainda precisa ser validado." notice="Este guia não recomenda incenso para condições de saúde." sections={[
    { title: '1. Comece pela família', content: <p>Use uma linguagem comum para se orientar, mantendo família aromática separada da composição real.</p> },
    { title: '2. Compare a percepção', content: <p>Notas, intensidade e fumaça só aparecem quando houver método e escala publicados.</p> },
    { title: '3. Confira os fatos', content: <p>Composição, origem, quantidade e formato precisam vir da ficha autoritativa do produto.</p> },
    { title: '4. Leia uso e cuidados', content: <p>A orientação final precisa corresponder ao fabricante e ao SKU específico.</p> },
  ]} />;
}

