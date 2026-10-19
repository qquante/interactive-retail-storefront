import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Guia de uso",
  description:
    "Um momento tranquilo começa com atenção ao espaço e às instruções do produto.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="USO E CUIDADOS"
      title="Antes de acender."
      lede="Um momento tranquilo começa com atenção ao espaço e às instruções do produto."
      sections={[
        {
          title: "Prepare o ambiente.",
          content: (
            <p>
              Escolha um local ventilado e um suporte próprio para incensos,
              estável e resistente ao calor. Mantenha materiais inflamáveis
              afastados.
            </p>
          ),
        },
        {
          title: "Esteja presente.",
          content: (
            <p>
              Não deixe um incenso aceso sem supervisão. Mantenha fora do
              alcance de crianças e animais e considere a sensibilidade de quem
              compartilha o ambiente.
            </p>
          ),
        },
        {
          title: "Siga a embalagem.",
          content: (
            <p>
              As instruções específicas de cada HEAL acompanharão o produto. A
              coleção apresentada no site ainda não está disponível para compra
              online.
            </p>
          ),
        },
      ]}
    ></EditorialPage>
  );
}
