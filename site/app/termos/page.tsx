import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Termos de uso",
  description:
    "Este site apresenta a marca HEAL e sua coleção de incensos. As vendas online ainda não estão abertas.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="INFORMAÇÕES"
      title="Sobre esta versão da loja."
      lede="Este site apresenta a marca HEAL e sua coleção de incensos. As vendas online ainda não estão abertas."
      sections={[
        {
          title: "Produtos e imagens.",
          content: (
            <p>
              As imagens são ilustrativas da apresentação da coleção. Preços,
              disponibilidade, quantidades e fichas técnicas não constituem
              oferta de compra nesta etapa.
            </p>
          ),
        },
        {
          title: "Compras e atendimento.",
          content: (
            <p>
              O site ainda não recebe pedidos ou pagamentos. Identificação
              empresarial, condições comerciais e canais de atendimento serão
              publicados antes da abertura.
            </p>
          ),
        },
        {
          title: "Condições de compra.",
          content: (
            <p>
              Entrega, trocas e devoluções serão detalhadas antes da primeira
              venda. Esta página não substitui as condições comerciais que
              acompanharão a operação.
            </p>
          ),
        },
      ]}
    ></EditorialPage>
  );
}
