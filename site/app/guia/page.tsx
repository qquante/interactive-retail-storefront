import type { Metadata } from 'next';
import { EditorialPage } from '@/components/editorial';

export const metadata: Metadata = { title: 'Guia do ritual', description: 'Estrutura futura do guia de uso da HEAL. CURA.', robots: { index: false, follow: true } };

export default function Page() {
  return <EditorialPage eyebrow="Guia · conteúdo bloqueado" title="Do primeiro gesto ao fim." lede="O guia final seguirá a instrução do fabricante para cada formato e produto." notice={<><strong>Conteúdo ainda não validado.</strong> Este protótipo não contém procedimento de uso e não deve ser usado como orientação para acender ou descartar incenso.</>} sections={[
    { title: 'Estrutura prevista', content: <p>Preparar, acender, posicionar, acompanhar, finalizar e guardar ou descartar. Cada etapa exigirá fonte, escopo de produto e revisão.</p> },
    { title: 'Por que está vazio', content: <p>Uma instrução genérica poderia contradizer o rótulo do produto real. Clareza também significa não completar lacunas com suposições.</p> },
  ]} />;
}

