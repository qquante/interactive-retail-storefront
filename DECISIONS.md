# HEAL — Registro de Decisões

Atualizado em: 2026-08-28

## Confirmadas

| ID | Decisão | Motivo | Estado |
|---|---|---|---|
| DEC-001 | A experiência será PT-BR e equivalente em desktop/mobile. | Requisito do usuário. | confirmed |
| DEC-002 | Anime.js e Three.js terão uso semântico e fallback. | Evitar animação genérica e proteger UX/performance. | confirmed |
| DEC-003 | A execução será multiagente com owners, tasks, sessions, handoffs e evidências. | Requisito do usuário. | confirmed |
| DEC-004 | Nenhum deploy, pagamento real, DNS ou criação de conta será feito sem aprovação. | Limite explícito do prompt. | confirmed |
| DEC-005 | O projeto web ficará inicialmente em `site/`. | O scaffold não aceita destino contendo o prompt existente. | confirmed |
| DEC-006 | A vertical slice usará Sites/Vinext com portas tipadas de commerce e fixture local rotulada; Shopify será a opção de produção a validar. | Preserva o scaffold, desacopla UI e evita assumir integração financeira inexistente. Ver `docs/architecture/ADR-001-storefront-commerce.md`. | accepted-for-vertical-slice |
| DEC-007 | A vertical slice seguirá a direção visual `Tempo de Brasa`. | Separa atmosfera escura de áreas comerciais claras, usa brasa como acento funcional raro e mantém prova próxima da poesia. | confirmed-for-slice |
| DEC-008 | Todo conteúdo comercial fixture permanecerá `noindex`. | Impede indexação de preços, estoque, produtos e políticas fictícias. | confirmed |
| DEC-009 | Shopify + checkout hospedado é o candidato de produção; meios de pagamento no Brasil seguem `[A VALIDAR]`. | Evita prometer Pix, boleto, cartão ou parcelamento sem conta e configuração reais. | confirmed-for-slice |
| DEC-010 | A fixture persiste sacola e CEP somente em `sessionStorage`, com aviso transparente e limite de linhas. | Reduz retenção e corrige a divergência encontrada na revisão LGPD. | confirmed |
| DEC-011 | Antes de qualquer provider real, o primeiro passo de backend será um BFF com fixture server-side e paridade de contrato. | A UI atual não recebe proteção autoritativa da idempotência/revisão do adapter em memória. | confirmed-as-gate |
| DEC-012 | Busca e filtro usam somente nome/resumo e disponibilidade da fixture; facetas aromáticas aguardam dados reais. | Evita criar taxonomia ou atributos falsos só para completar UI/SEO. | confirmed |
| DEC-013 | O cartão social existe, mas sua URL só é emitida quando `SITE_ORIGIN` for HTTPS confiável. | Evita metadata absoluta falsa antes do domínio. | confirmed |

## Provisórias

| ID | Hipótese | Validação necessária | Estado |
|---|---|---|---|
| DEC-P03 | Assinatura visual principal: fumaça procedural com brasa, isolada do conteúdo comercial. | QA visual/mobile passou; Lighthouse mobile e trace GPU real ainda são gates de produção. | validated-local-only |

## Abertas

- Catálogo, SKUs, preços e estoque reais.
- Ingredientes, procedência e claims permitidos.
- Provedor operacional de commerce/checkout.
- CNPJ, políticas, frete e atendimento.
- Fotografia/embalagem real da marca.
- Domínio e infraestrutura de produção.
