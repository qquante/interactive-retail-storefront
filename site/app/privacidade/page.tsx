import type { Metadata } from "next";
import { EditorialPage } from "@/components/editorial";

export const metadata: Metadata = {
  title: "Privacidade",
  description:
    "Esta versão da loja apresenta a coleção HEAL e permite pesquisar os aromas.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <EditorialPage
      eyebrow="INFORMAÇÕES"
      title="Privacidade."
      lede="Esta versão da loja apresenta a coleção HEAL e permite pesquisar os aromas."
      sections={[
        {
          title: "Uso do site.",
          content: (
            <p>
              A loja não solicita nome, endereço, documento ou dados de
              pagamento. Não oferece cadastro de clientes nem formulário de
              newsletter nesta etapa. O acesso à publicação pode exigir
              autenticação do serviço de hospedagem.
            </p>
          ),
        },
        {
          title: "Busca e navegação.",
          content: (
            <p>
              O termo pesquisado aparece no endereço da página de resultados.
              Não inclua dados pessoais ou informações sensíveis no campo de
              busca.
            </p>
          ),
        },
        {
          title: "Novos serviços.",
          content: (
            <p>
              Os responsáveis, canais de contato e regras de tratamento de dados
              serão informados antes da ativação de cadastros, atendimento ou
              compras.
            </p>
          ),
        },
      ]}
    ></EditorialPage>
  );
}
