import type { Metadata } from "next";
import Image from "next/image";
import styles from "@/components/editorial/EditorialPage.module.css";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "A HEAL",
  description:
    "A HEAL nasce de uma ideia simples: dar atenção aos pequenos gestos que mudam a relação com um espaço.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="A HEAL · INCENSOS"
      title="Presença, em forma de incenso."
      lede="A HEAL nasce de uma ideia simples: dar atenção aos pequenos gestos que mudam a relação com um espaço."
      sections={[
        {
          title: "Um gesto que é seu.",
          content: (
            <p>
              Acender um incenso pode marcar uma pausa, acompanhar um encontro
              ou fazer parte de uma prática pessoal. A HEAL existe para estar
              nesses momentos, sem dizer como eles devem ser.
            </p>
          ),
        },
        {
          title: "HEAL é a marca. HEALS são os incensos.",
          content: (
            <p>
              Uma coleção reconhecida pelo aroma e pela presença de cada
              embalagem. Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim são
              os primeiros nomes apresentados aqui.
            </p>
          ),
        },
        {
          title: "Para diferentes espaços.",
          content: (
            <p>
              Do uso pessoal à seleção de uma loja ou espaço de bem-estar,
              queremos tornar a escolha do incenso simples, cuidadosa e próxima
              de quem usa.
            </p>
          ),
        },
      ]}
    >
      <Image
        className={styles.visual}
        src="/images/heals/retail/collection-campaign.webp"
        alt="As cinco embalagens da coleção de incensos HEALS"
        width={1672}
        height={941}
        sizes="(max-width: 700px) 100vw, 65vw"
      />
    </EditorialPage>
  );
}
