# HEAL — Estado real da implementação SEO

Atualizado em: 2026-08-28

## Implementado e verificado

- idioma primário `pt-BR` no documento;
- títulos e descrições próprios na Home, coleção, produto, sacola e checkout demonstrativo;
- diretiva global `noindex, nofollow`, apropriada enquanto catálogo, domínio e operação são fixtures;
- produto demonstrativo com `noindex, follow` explícito;
- `robots.txt` gerado pela rota `app/robots.ts` com `Disallow: /`;
- headings e links navegáveis sem depender de JavaScript para descoberta básica;
- imagens decorativas com alternativa vazia ou marcação não semântica;
- metadados Open Graph/Twitter e cartão social 1200×630 prontos; a URL da imagem só é emitida quando `SITE_ORIGIN` contém uma origem HTTPS confiável (ou localhost em desenvolvimento);
- pesquisa e especificação 2026 baseadas em documentação oficial em `docs/research/2026-08-28-seo-2026.md` e `TECHNICAL_SEO_SPEC.md`.

## Deliberadamente não publicado

- sitemap XML, canonical definitivo e hreflang: dependem do domínio canônico e das URLs reais;
- `Product`, `Offer`, `MerchantReturnPolicy` e `OfferShippingDetails`: dependem de catálogo, preço, estoque, política e frete reais;
- feed Google Merchant Center: depende de SKUs, GTIN/MPN quando aplicável, mídia e políticas aprovadas;
- dados estruturados de organização, contato e redes sociais: dependem de identidade legal e perfis oficiais;
- origem absoluta do cartão social: depende de `SITE_ORIGIN` confiável no build/deploy; sem isso, título e descrição social permanecem, mas a imagem não é anunciada com URL incorreta.

## Limitação encontrada

Foi testada a configuração de `X-Robots-Tag` em `next.config.ts`, porém o runtime Vinext local não emitiu o header no servidor de desenvolvimento. A tentativa foi revertida para não criar uma falsa garantia. O bloqueio atual é feito por `meta robots` e `robots.txt`, ambos verificados. Antes de qualquer publicação, o header deverá ser aplicado e testado na camada de hospedagem/CDN.

## Gate antes de indexar

Remover o bloqueio somente quando domínio, catálogo, políticas, estoque/preço, frete, checkout e dados empresariais forem reais e revisados. Depois, validar canonical, robots, sitemap, structured data, Merchant Center e Search Console em ambiente publicamente acessível.
