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

## Provisórias

| ID | Hipótese | Validação necessária | Estado |
|---|---|---|---|
| DEC-P03 | Assinatura visual principal: fumaça procedural com brasa, isolada do conteúdo comercial. | Protótipo, QA visual, mobile e performance. | proposed |

## Abertas

- Catálogo, SKUs, preços e estoque reais.
- Ingredientes, procedência e claims permitidos.
- Provedor operacional de commerce/checkout.
- CNPJ, políticas, frete e atendimento.
- Fotografia/embalagem real da marca.
- Domínio e infraestrutura de produção.
