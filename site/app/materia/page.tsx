import type { Metadata } from "next";
import Image from "next/image";
import styles from "@/components/editorial/EditorialPage.module.css";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Os bastões HEAL",
  description:
    "Textura irregular, detalhes visíveis e um formato simples. Conheça a apresentação dos bastões HEALS.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="DE PERTO"
      title="O incenso começa na matéria."
      lede="Textura irregular, detalhes visíveis e um formato simples. Conheça a apresentação dos bastões HEALS."
      sections={[
        {
          title: "Uma textura que aparece.",
          content: (
            <p>
              A superfície rugosa é parte da direção de produto da HEAL. As
              imagens aproximam o olhar dessa textura; não substituem a ficha de
              composição de cada incenso.
            </p>
          ),
        },
        {
          title: "Cada aroma, uma ficha.",
          content: (
            <p>
              Composição, quantidade por caixa, origem e tempo de queima serão
              informados individualmente na abertura das vendas. O nome do aroma
              não deve ser tomado como lista de ingredientes.
            </p>
          ),
        },
        {
          title: "Embalagem e bastão.",
          content: (
            <p>
              A caixa identifica o aroma e reúne as informações de uso. O bastão
              é apresentado sem acabamento liso, preservando a aparência
              texturizada que define a coleção.
            </p>
          ),
        },
      ]}
    >
      <Image
        className={styles.visual}
        src="/images/heals/retail/incense-detail.webp"
        alt="Detalhe ilustrativo da superfície texturizada dos bastões HEALS"
        width={1536}
        height={1024}
        sizes="(max-width: 700px) 100vw, 65vw"
      />
    </EditorialPage>
  );
}
