import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notas sobre incensos, ambientes e os pequenos gestos do cotidiano.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="JOURNAL HEAL"
      title="Um olhar mais próximo."
      lede="Notas sobre incensos, ambientes e os pequenos gestos do cotidiano."
      sections={[
        {
          title: "A primeira edição está a caminho.",
          content: (
            <p>
              Enquanto preparamos os próximos conteúdos, conheça os bastões da
              coleção e o guia para escolher seu primeiro HEAL.
            </p>
          ),
        },
      ]}
    ></EditorialPage>
  );
}
