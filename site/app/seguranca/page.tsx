import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Cuidados de uso",
  description:
    "Antes de usar um incenso, leia as instruções da embalagem e prepare o ambiente.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="USO E CUIDADOS"
      title="Cuidado faz parte."
      lede="Antes de usar um incenso, leia as instruções da embalagem e prepare o ambiente."
      sections={[
        {
          title: "Ambiente e suporte.",
          content: (
            <p>
              Use em local ventilado, com suporte apropriado, estável e
              resistente ao calor. Mantenha longe de materiais inflamáveis.
            </p>
          ),
        },
        {
          title: "Atenção durante o uso.",
          content: (
            <p>
              Nunca deixe o incenso aceso sem supervisão. Mantenha fora do
              alcance de crianças e animais e respeite a sensibilidade de quem
              estiver no espaço.
            </p>
          ),
        },
        {
          title: "Informação por produto.",
          content: (
            <p>
              As instruções de cada HEAL serão apresentadas junto com a abertura
              das vendas. Consulte sempre as orientações específicas da
              embalagem.
            </p>
          ),
        },
      ]}
    ></EditorialPage>
  );
}
