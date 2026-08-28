import type { Metadata } from 'next';
import { EditorialPage } from '@/components/editorial';

export const metadata: Metadata = { title: 'Segurança e cuidados', description: 'Estado de validação das orientações de segurança da HEAL.', robots: { index: false, follow: false } };

export default function Page() {
  return <EditorialPage eyebrow="Segurança · a validar" title="Segurança vem antes do ritual." lede="A orientação publicada deverá corresponder ao formato, fabricante e SKU reais." notice={<><strong>Não use esta página como instrução.</strong> Consulte o rótulo e as orientações do fabricante do produto real.</>} sections={[
    { title: 'Escopo futuro', content: <p>Antes, durante e depois do uso; ambiente e ventilação; crianças, animais e sensibilidades; incidentes e suporte.</p> },
    { title: 'Limites editoriais', content: <p>A HEAL não afirmará segurança para grupos específicos nem oferecerá aconselhamento médico ou veterinário.</p> },
  ]} />;
}

