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
| DEC-007 | A vertical slice já construída segue `Tempo de Brasa`; isso não escolhe a próxima identidade. | Preserva a evidência da slice sem transformar um protótipo anterior em direção oficial. | historical-for-current-slice |
| DEC-008 | Todo conteúdo comercial fixture permanecerá `noindex`. | Impede indexação de preços, estoque, produtos e políticas fictícias. | confirmed |
| DEC-009 | Shopify + checkout hospedado é o candidato de produção; meios de pagamento no Brasil seguem `[A VALIDAR]`. | Evita prometer Pix, boleto, cartão ou parcelamento sem conta e configuração reais. | confirmed-for-slice |
| DEC-010 | A fixture persiste sacola e CEP somente em `sessionStorage`, com aviso transparente e limite de linhas. | Reduz retenção e corrige a divergência encontrada na revisão LGPD. | confirmed |
| DEC-011 | Antes de qualquer provider real, o primeiro passo de backend será um BFF com fixture server-side e paridade de contrato. | A UI atual não recebe proteção autoritativa da idempotência/revisão do adapter em memória. | confirmed-as-gate |
| DEC-012 | Busca e filtro usam somente nome/resumo e disponibilidade da fixture; facetas aromáticas aguardam dados reais. | Evita criar taxonomia ou atributos falsos só para completar UI/SEO. | confirmed |
| DEC-013 | O cartão social legado foi retirado da metadata após a correção de nome; uma nova arte só será emitida após a direção escolhida e `SITE_ORIGIN` confiável. | Evita expor `HEAL. CURA.` ou oficializar uma exploração. | superseded-pending-new-card |
| DEC-014 | A marca é `HEAL`; `HEAL. CURA.` e `Heal Incensos` estão superseded. | Correção explícita do usuário. | confirmed |
| DEC-015 | `HEALS` nomeia o sistema de incensos, usando `HEALS — os incensos da HEAL` nos primeiros contatos. | Evita exigir que a pessoa adivinhe o termo proprietário. | confirmed |
| DEC-016 | As cinco direções, caixas e imagens atuais são explorações, não identidade ou embalagem oficial. | O usuário declarou que a marca continua em construção. | confirmed |
| DEC-017 | O primeiro protótipo de experiência deve comparar `O intervalo aceso` e `Coreografia do ar`, ambos com prova factual de `Matéria aberta`. | Maximiza contraste útil sem misturar cinco identidades. | proposed-for-user-selection |

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
- Direção principal entre as finalistas e challenger.
- Mecânica inicial de embalagem entre `Janela Estratigráfica` e `Gaveta de Pausa`; `Arquivo Refil` permanece hipótese.
- Medidas, composição, origem, processo, quantidade e performance de queima do bastão real.
- Domínio e infraestrutura de produção.
