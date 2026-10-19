import type { Metadata } from "next";
import Image from "next/image";
import styles from "@/components/editorial/EditorialPage.module.css";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "HEAL para profissionais",
  description:
    "Para lojas, espaços de espiritualidade, bem-estar e profissionais que incluem o aroma na experiência de seus espaços.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="HEAL PARA PROFISSIONAIS"
      title="Presença em cada ambiente."
      lede="Para lojas, espaços de espiritualidade, bem-estar e profissionais que incluem o aroma na experiência de seus espaços."
      sections={[
        {
          title: "Lojas e revenda.",
          content: (
            <p>
              A frente profissional está sendo preparada para quem deseja
              apresentar os incensos HEALS ao seu público. Catálogo comercial e
              condições de revenda serão publicados quando o programa abrir.
            </p>
          ),
        },
        {
          title: "Espaços e práticas.",
          content: (
            <p>
              A escolha de um incenso também passa por quem ocupa o ambiente.
              Queremos apoiar essa escolha com informação clara sobre cada
              produto e seus cuidados de uso.
            </p>
          ),
        },
        {
          title: "Acompanhe a abertura.",
          content: (
            <p>
              O programa ainda não recebe pedidos ou cadastros. Os canais de
              atendimento profissional estarão disponíveis nesta página na
              abertura.
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
