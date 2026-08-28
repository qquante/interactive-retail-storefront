import type { Metadata } from 'next';
import { EditorialPage } from '@/components/editorial';

export const metadata: Metadata = { title: 'Sobre', description: 'A proposta editorial e os compromissos da HEAL. CURA.', robots: { index: false, follow: true } };

export default function Page() {
  return <EditorialPage eyebrow="Sobre · demonstração" title="Uma marca de incensos que prefere explicar." lede="A HEAL. CURA. nasce como proposta de ritual contemporâneo: beleza para abrir a atenção e informação para sustentar a escolha." notice="História, pessoas, razão social, fornecedores e operação permanecem [A VALIDAR]. Esta página não inventa uma biografia para a marca." sections={[
    { title: 'O que vendemos', content: <p>Catálogo, formatos e fabricantes reais ainda não foram cadastrados. A experiência disponível usa produtos fictícios e claramente rotulados.</p> },
    { title: 'Por que existimos', content: <p>Tornar a escolha de incensos mais clara, sem misticismo genérico nem promessa terapêutica.</p> },
    { title: 'Como queremos provar', content: <p>Composição, origem, percepção, uso e condições comerciais ocuparão campos separados, cada um com fonte, escopo e data de revisão.</p> },
  ]} />;
}

