# HEAL — Contexto de Execução

Atualizado em: 2026-09-26

## Gate atual — reforma retail-premium integral autorizada

- HEAL-T051 concluída: domínio público https://heal-web-production-48b1.up.railway.app no projeto HEAL/serviço heal-web separados. Deploy deb8a30a SUCCESS com healthcheck; 46 checks remotos/10 axe/30 assets aprovados. Sites, branding/fumaça, ausência de checkout real e `noindex` preservados. Runbook: `docs/operations/RAILWAY_DEPLOYMENT.md`.

- Ajuste posterior HEAL-T050 concluído/publicado: usuário escolheu **C — Pulsos ascendentes** como único padrão, sem opções. Vareta mais clara, entrando pela borda inferior com apenas a ponta acesa visível no desktop/mobile. 8 E2E focados passaram, incluindo dez cores em movimento e âncora 320–1920 px; publicação privada succeeded. Recibo: `docs/evidence/qa/retail-v1/PULSE_TIP.md`.

- Pedido mais recente de 2026-09-26: executar a loja inteira, pesquisar branding/paleta e preservar a fumaça colorida. Este pedido substitui o gate anterior de aprovação seção a seção para esta reforma.
- HEAL-T049 concluída e publicada: shell único, Home orientada a produto, cards compactos, catálogo/busca/PDP e páginas de apoio; Manrope + Newsreader self-hosted; base mineral, verde profundo e cores das embalagens/fumaça.
- Shader e CSS interno da fumaça preservados. Apenas enquadramento externo responsivo e controle acessível de pausa substituem o Mapa do Ar.
- Duas novas imagens ilustrativas geradas; cinco fotos de catálogo aprovadas preservadas. Sem preços, estoque, composição ou checkout inventados.
- 23 testes unitários/integração, 74 E2E, lint, TypeScript e build passaram. Percurso adicional: 46 verificações de rota e 10 axe, sem violações. Publicação privada succeeded em https://heal-incensos.sacredgeometry888888.chatgpt.site; evidência e limites em `docs/evidence/qa/retail-v1/RESULTS.md`.

### Histórico anterior

- Pedido de 2026-09-26: melhorar a apresentação premium por partes, preservando os cinco aromas e produtos definidos; sem animações gratuitas.
- O usuário aprovou a direção inicial e autorizou avanço dos cinco aromas e publicação em 2026-09-26.
- Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim: novas imagens V2 integradas na Home, coleção e PDP, preservando as caixas V3. Referência material: Nirvana Premium; nenhuma embalagem concorrente foi copiada.
- QA atual: 22/22 testes, build, TypeScript, lint focado, E2E focado 2/2 e probe Chromium 28/28 (320/390/768/1440 px). Escopo: imagens, não auditoria integral da loja.
- Proveniência: `docs/concepts/IMAGEGEN_PROVENANCE_CATALOGUE_V2.md`; evidência em `docs/evidence/qa/catalogue-v2/`; tarefa `HEAL-T047`.
- Limite visual: espessura das varetas dentro de algumas janelas ainda difere da vareta solta. Imagens geradas, não fotografias documentais; resolução nativa 1122×1402.
- Publicação privada confirmada: https://heal-incensos.sacredgeometry888888.chatgpt.site. Evidência: `docs/evidence/qa/catalogue-v2/PUBLICATION.md`. Domínio comercial e vendas/pagamentos não ativados; `noindex` preservado.
- Pedido seguinte: proposta de reformulação retail-premium geral, preservando incenso/fumaça. Análise somente; reforma ainda não iniciada (`HEAL-T048`).
- Header/Hero e fumaça permanecem sem alterações nesta etapa. Este gate não significa aceite do Hero nem das regressões da auditoria de 2026-09-26.
- Estados e métricas históricos abaixo não substituem validação atual.

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
- Não há catálogo comercial autoritativo, conta de commerce, checkout ativo, domínio comercial ou analytics configurados. A apresentação foi publicada no Sites em audiência privada, com credencial efêmera usada somente durante o envio.
- Estado atual: **apresentação de coleção em preparação**, com Home, coleção, PDP, busca e rotas institucionais. Carrinho e checkout atuais não abrem compra; o fluxo fixture abaixo é histórico, não operação comercial.
- Gates locais presentes: lint, typecheck, unit, integração, Playwright cross-browser, axe, build e audit. A auditoria Lighthouse mediu desktop 99 e mobile 79; portanto produção não está aprovada.
- SEO permanece globalmente `noindex`; schema comercial, sitemap/canonical definitivo, Merchant Center e origem social dependem de domínio e catálogo reais.
- `Tempo de Brasa` é a direção histórica da primeira slice. A direção atual escolhida é `Coreografia do ar`, com símbolo HEAL e embalagens V3. O acabamento premium e a linguagem fotográfica passam por aprovação incremental.
- Imagens, caixas e produtos atuais são demonstrativos e possuem proveniência/rotulagem; nenhuma concept art representa produto ou dieline real.
- O `og.png` legado contém a assinatura superseded e deixou de ser emitido por metadata; um novo cartão social depende da direção escolhida.

## Direção não negociável

- Ritual contemporâneo, matéria natural, calma precisa e confiança comercial.
- Sem estética esotérica genérica, luxo bege intercambiável, animação gratuita, scroll hijacking ou dark patterns.
- Anime.js e Three.js só entram quando carregam significado e possuem fallback.
- A direção de atenção pode usar ritmo, simetria, curvas de portal, fumaça, repetição e simbolismo em camadas. A referência do portão é formal, não um `666` literal.
- `HEAL` é marca e `HEALS` é sistema de incensos; nenhum dos dois autoriza alegações médicas/terapêuticas ou o uso de `heal/heals` como promessa.
- O produto pretendido deve ser representado como bastão espesso, áspero, granulado e levemente irregular; composição, origem, processo e núcleo continuam a validar com amostra real.

## Nota de supersessão

Documentos anteriores a esta decisão podem conter `HEAL. CURA.`, `Heal Incensos` ou SKUs `HEAL Intervalo`. Esses termos permanecem como registro histórico da primeira slice, mas estão superseded para novos conceitos, interface e conteúdo. A fonte canônica atual é este arquivo, `DECISIONS.md` e `docs/concepts/BRANDING_COPY_DIRECTIONS.md`.

## Limites

- Sem compra, contratação, criação de conta externa, credencial pessoal, pagamento real, DNS ou deploy sem aprovação humana explícita.
- Mock, fixture, sandbox e produção serão sempre identificados separadamente.
- A regra histórica de uma seção por mensagem foi substituída pelo pedido explícito de execução integral em 2026-09-26; decisões materiais continuam registradas, com QA visual antes da publicação.
