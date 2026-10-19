import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Entrega e trocas",
  description:
    "As vendas online ainda não estão abertas. As condições de entrega, troca e devolução serão publicadas antes da primeira compra.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="ATENDIMENTO"
      title="Entrega e trocas."
      lede="As vendas online ainda não estão abertas. As condições de entrega, troca e devolução serão publicadas antes da primeira compra."
      sections={[
        {
          title: "Entrega.",
          content: (
            <p>
              Frete, regiões atendidas e prazos aparecerão antes da confirmação
              do pedido quando a loja entrar em operação.
            </p>
          ),
        },
        {
          title: "Trocas e devoluções.",
          content: (
            <p>
              O processo, as condições e o canal de atendimento estarão
              disponíveis nesta página na abertura comercial. Ainda não há
              pedidos realizados por este site.
            </p>
          ),
        },
      ]}
    ></EditorialPage>
  );
}
