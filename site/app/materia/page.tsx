import type { Metadata } from 'next';
import { EditorialPage } from '@/components/editorial';

export const metadata: Metadata = { title: 'Matéria e procedência', description: 'Como a HEAL pretende separar composição, percepção e origem.', robots: { index: false, follow: true } };

export default function Page() {
  return <EditorialPage eyebrow="Matéria · demonstração" title="Matéria aberta." lede="Ingrediente, nota percebida e origem ocupam campos diferentes. Cada afirmação precisa apontar para uma fonte e para o produto a que se aplica." notice="Composição, origem, processo e procedência estão [A VALIDAR por SKU/variante]." sections={[
    { title: 'Composição', content: <p>Será transcrita da fonte autoritativa do produto, sem transformar uma nota olfativa em ingrediente.</p> },
    { title: 'Percepção', content: <p>Notas, intensidade e nível de fumaça só serão publicados com taxonomia e método documentados.</p> },
    { title: 'Origem e processo', content: <p>Fabricação, origem de matérias e relação com fornecedores serão declaradas separadamente. Nenhuma origem é presumida pela fotografia ou pelo nome.</p> },
  ]} />;
}

