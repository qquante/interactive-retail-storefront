import type { MetadataRoute } from 'next';

/**
 * A vitrine atual contém produtos, valores, estoque e políticas fictícios.
 * Indexação só poderá ser habilitada depois de catálogo, domínio e operação
 * aprovados. O crawler precisa acessar o HTML para ler o meta noindex; preview
 * privado deve usar autenticação no edge, não Disallow como controle de acesso.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  };
}
