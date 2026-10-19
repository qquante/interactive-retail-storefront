import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Atendimento",
  description:
    "Os canais de atendimento online estão em preparação, junto com a abertura da loja.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="PODEMOS AJUDAR?"
      title="Atendimento HEAL."
      lede="Os canais de atendimento online estão em preparação, junto com a abertura da loja."
      sections={[
        {
          title: "Quero conhecer os incensos.",
          content: (
            <p>
              A coleção já pode ser explorada no site. Nas páginas dos aromas
              você encontra as imagens, o formato e o status de lançamento.
            </p>
          ),
        },
        {
          title: "Quero comprar ou revender.",
          content: (
            <p>
              As vendas online e o programa profissional ainda não estão
              abertos. Não recebemos pedidos, reservas ou pagamentos por este
              site nesta etapa.
            </p>
          ),
        },
        {
          title: "Dúvidas sobre a abertura.",
          content: (
            <p>
              Contato, horários e condições de atendimento serão publicados aqui
              assim que os canais estiverem disponíveis.
            </p>
          ),
        },
      ]}
    ></EditorialPage>
  );
}
