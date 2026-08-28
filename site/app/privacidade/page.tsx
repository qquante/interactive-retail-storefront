import type { Metadata } from 'next';
import { EditorialPage } from '@/components/editorial';

export const metadata: Metadata = { title: 'Privacidade e escolhas', description: 'Template de transparência e privacidade ainda não vigente.', robots: { index: false, follow: false } };

export default function Page() {
  return <EditorialPage eyebrow="LGPD · a validar" title="Privacidade e escolhas." lede="A política final refletirá o inventário técnico e os fluxos reais, não uma cópia genérica." notice="Controlador, bases legais, fornecedores, retenção, canal de direitos e cookies permanecem [A VALIDAR]." sections={[
    { title: 'Dados e finalidades', content: <p>O storefront demonstrativo não possui conta, newsletter, contato funcional ou pagamento. IDs da fixture, quantidades e o CEP completo usado na simulação permanecem no armazenamento da sessão desta aba até ela ser fechada ou a sacola ser limpa. O CEP aparece mascarado na interface, mas a máscara visual não anonimiza a cópia da sessão.</p> },
    { title: 'Cookies e analytics', content: <p>Nenhuma ferramenta opcional de analytics ou publicidade foi conectada. O banner de consentimento só será criado depois do mapa real de dados.</p> },
    { title: 'Direitos e contato', content: <p>Identificação do controlador, canal verificável, prazos e processo: [A VALIDAR com jurídico e operação].</p> },
  ]} />;
}
