import type { MetadataRoute } from 'next';

/**
 * A vitrine atual contém produtos, valores, estoque e políticas fictícios.
 * Indexação só poderá ser habilitada depois de catálogo, domínio e operação
 * aprovados; robots.txt complementa, mas não substitui meta/header noindex.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
