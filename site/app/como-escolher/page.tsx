import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Como escolher um incenso",
  description:
    "Comece com curiosidade. A melhor escolha faz sentido para as suas preferências e para o espaço em que você vai usar.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="GUIA HEAL"
      title="Encontre o seu primeiro aroma."
      lede="Comece com curiosidade. A melhor escolha faz sentido para as suas preferências e para o espaço em que você vai usar."
      sections={[
        {
          title: "01. Explore os nomes.",
          content: (
            <p>
              Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim. Se algum
              desses aromas já faz parte do seu repertório, ele pode ser um
              ponto de partida para conhecer a coleção.
            </p>
          ),
        },
        {
          title: "02. Conheça o produto.",
          content: (
            <p>
              Veja a apresentação e o formato do incenso. Na abertura das
              vendas, confira a composição, a quantidade e as orientações
              específicas antes de escolher.
            </p>
          ),
        },
        {
          title: "03. Pense no ambiente.",
          content: (
            <p>
              Considere quem compartilha o espaço e se há ventilação. O uso de
              aromas deve ser uma escolha confortável para todos que estiverem
              por perto.
            </p>
          ),
        },
        {
          title: "04. Reserve atenção ao uso.",
          content: (
            <p>
              Use um suporte apropriado e estável, siga as instruções da
              embalagem e acompanhe o incenso enquanto estiver aceso.
            </p>
          ),
        },
      ]}
    ></EditorialPage>
  );
}
