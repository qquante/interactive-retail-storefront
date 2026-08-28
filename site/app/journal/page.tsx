import type { Metadata } from 'next';
import { EditorialPage } from '@/components/editorial';

export const metadata: Metadata = { title: 'Journal', description: 'Futura publicação editorial da HEAL.', robots: { index: false, follow: true } };

export default function Page() {
  return <EditorialPage eyebrow="Journal · pré-publicação" title="Notas de matéria, escolha, uso e processo." lede="O Journal só publicará conteúdo com autoria, data, método ou fontes e valor próprio." notice="Ainda não existem artigos reais. Séries e pautas abaixo são hipóteses editoriais." sections={[
    { title: 'Séries previstas', content: <p>Matéria aberta, Escala HEAL, Um gesto, Entre momentos, Depois da brasa e Presente explicado.</p> },
    { title: 'Padrão de publicação', content: <p>Cada texto deverá distinguir observação, fonte e interpretação, sem fabricar FAQ, autoridade ou benefício de saúde para capturar busca.</p> },
  ]} />;
}
