# HEAL — Contexto de Execução

Atualizado em: 2026-08-28

## Produto

- Marca: **HEAL**.
- Sistema de produto: **HEALS — os incensos da HEAL**.
- Regra de compreensão: `HEALS` nunca substitui `incenso(s)` no primeiro contato, em controles críticos, busca, cards, PDP, carrinho ou SEO.
- Mercado inicial: Brasil, PT-BR.
- Superfícies: Web Desktop e Web Mobile com paridade funcional.
- Objetivo: loja premium de incensos com comércio claro e uma linguagem sensorial baseada em matéria, brasa, fumaça e ritual.

## Estado real

- O workspace começou sem aplicação e sem repositório Git.
- O prompt mestre fornecido pelo usuário está preservado em `HEAL_PROMPT_MESTRE_MULTIAGENTE.md`.
- Um scaffold Sites/Vinext foi criado em `site/` com Next-compatible App Router, React, TypeScript, Tailwind e configuração Cloudflare/Sites.
- Não há catálogo real, credenciais, conta de commerce, checkout, domínio, analytics ou deploy configurados.
- Estado atual: **storefront local funcional em fixture explícita**, com Home, coleção, PDP, busca/filtro, sacola, frete fictício, handoff sem pagamento, rotas institucionais, Anime.js e Three.js com fallback.
- Gates locais presentes: lint, typecheck, unit, integração, Playwright cross-browser, axe, build e audit. A auditoria Lighthouse mediu desktop 99 e mobile 79; portanto produção não está aprovada.
- SEO permanece globalmente `noindex`; schema comercial, sitemap/canonical definitivo, Merchant Center e origem social dependem de domínio e catálogo reais.
- `Tempo de Brasa` continua apenas como a direção da vertical slice local já construída. A próxima identidade não foi escolhida: cinco territórios, cinco concept arts de embalagem e duas finalistas estão documentados em `docs/concepts/`.
- Imagens, caixas e produtos atuais são demonstrativos e possuem proveniência/rotulagem; nenhuma concept art representa produto ou dieline real.
- O `og.png` legado contém a assinatura superseded e deixou de ser emitido por metadata; um novo cartão social depende da direção escolhida.

## Direção não negociável

- Ritual contemporâneo, matéria natural, calma precisa e confiança comercial.
- Sem estética esotérica genérica, luxo bege intercambiável, animação gratuita, scroll hijacking ou dark patterns.
- Anime.js e Three.js só entram quando carregam significado e possuem fallback.
- `HEAL` é marca e `HEALS` é sistema de incensos; nenhum dos dois autoriza alegações médicas/terapêuticas ou o uso de `heal/heals` como promessa.
- O produto pretendido deve ser representado como bastão espesso, áspero, granulado e levemente irregular; composição, origem, processo e núcleo continuam a validar com amostra real.

## Nota de supersessão

Documentos anteriores a esta decisão podem conter `HEAL. CURA.`, `Heal Incensos` ou SKUs `HEAL Intervalo`. Esses termos permanecem como registro histórico da primeira slice, mas estão superseded para novos conceitos, interface e conteúdo. A fonte canônica atual é este arquivo, `DECISIONS.md` e `docs/concepts/BRANDING_COPY_DIRECTIONS.md`.

## Limites

- Sem compra, contratação, criação de conta externa, credencial pessoal, pagamento real, DNS ou deploy sem aprovação humana explícita.
- Mock, fixture, sandbox e produção serão sempre identificados separadamente.
