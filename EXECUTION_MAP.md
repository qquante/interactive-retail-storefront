# HEAL — Mapa de Execução

Atualizado em: 2026-09-26

## Gate corrente — HEAL-T051: Railway independente

Concluído: auditoria Node/empacotamento → build e testes → projeto HEAL/serviço heal-web → domínio Railway → healthcheck e QA HTTPS/navegador aprovados. Sites e demais serviços preservados. Publicação de apresentação não ativa vendas. Runbook/recibo: `docs/operations/RAILWAY_DEPLOYMENT.md`.

## Gate anterior — HEAL-T049: reforma retail-premium integral

Concluído: pesquisa primária de marca → shell + primeira prévia → catálogo/PDP/conteúdo → revisão visual desktop/mobile → testes → build → fonte versionada → publicação privada existente. Recibo: `docs/evidence/qa/retail-v1/RESULTS.md`.

Root é o único autor do checkout Sites; três agentes especializados cobrem pesquisa, auditoria somente leitura e dois assets. Fonte de produto continua pré-lançamento; publicar apresentação não ativa vendas. Branding: `docs/brand/RETAIL_BRAND_SYSTEM_2026.md`.

### Gate anterior — catálogo V2

`HEAL-T046: direção Canela aprovada` → `HEAL-T047: cinco imagens integradas e QA local aprovado` → publicação privada → avaliação do usuário.

Cada aroma mantém sua embalagem V3; luz, fundo e linguagem fotográfica são compartilhados. Evidência: `docs/concepts/IMAGEGEN_PROVENANCE_CATALOGUE_V2.md` e `docs/evidence/qa/catalogue-v2/README.md`. A publicação de revisão não ativa comércio. Nenhuma alteração de motion nesta etapa. A sequência por seção abaixo depende de aceite próprio.

```text
Onda 0  Scaffold + governança + HEAL-01
   ↓
Onda 1  HEAL-02 mercado | HEAL-03 marca | HEAL-05 UX
   ↓
Onda 2  Conteúdo | visual | commerce | SEO
   ↓
Contrato consolidado + ADR
   ↓
Vertical slice: Home → coleção → PDP → carrinho → checkout/handoff
   ↓
Motion + Three + mobile + backend/adapters
   ↓
A11y + performance + segurança + analytics + QA
   ↓
HEAL-22 review → correções por owners → re-review
   ↓
Release readiness local (sem deploy)
   ↓
Escolha conceitual B → arquitetura completa da caixa → auditoria V2 → mockups/faca conceitual
   ↓
Specs frontend/Anime/Three/SEO/QA → símbolo + hero + embalagens V3
   ↓
Integração `Coreografia do ar` → catálogo expansível → QA independente → hardening local
   ↓
Pesquisa de componentes/storytelling → execução serial por seção
   ↓
Header + Hero → aceite → Mapa do Ar → aceite → História → aceite
   ↓
Coleção → aceite → Como escolher → aceite → Profissionais → aceite → Rodapé
```

## Regra da fase seção por seção

- Uma única seção pode ficar `in_progress`.
- Nenhuma seção seguinte começa sem captura desktop/mobile e aceite do usuário.
- Componentes externos entram como referência ou código local adaptado; não como nova identidade visual pronta.
- A primeira unidade é `HEAL-T039 — Header + Hero`.

## Caminho crítico

1. Reconhecimento e decisão de stack.
2. Verdade de produto/brand/UX suficiente para vertical slice.
3. Contrato de commerce e dados.
4. Implementação do fluxo principal.
5. Motion/Three sem bloquear commerce.
6. SEO/a11y/performance/security.
7. Review independente.

## Regra de concorrência

- Máximo de vagas respeitado pelo coordenador.
- Research read-only pode rodar em paralelo.
- Escrita paralela exige ownership sem sobreposição.
- Uma vaga deve ficar disponível para integração/revisão quando possível.
