# HEAL — Release readiness

Atualizado em: 2026-08-28  
Veredito atual: **NO-GO produção; GO apenas para protótipo local**.

## Bloqueadores externos/humanos

- empresa, responsáveis, canal de suporte e revisão jurídica;
- catálogo/SKUs, composição, origem, mídia, estoque, preço e claims comprovados;
- instruções de uso e segurança por produto;
- frete, cobertura, prazos, trocas, devoluções e privacidade vigentes;
- domínio canônico e origem HTTPS confiável;
- autenticação no edge para qualquer preview compartilhado enquanto a fixture estiver ativa;
- escolha/contratação de commerce, CMS, checkout e meios de pagamento;
- credenciais criadas pelo owner humano em ambiente seguro;
- consentimento/base legal e mapa final de dados;
- Merchant Center/Search Console/Bing e feeds, somente depois do catálogo real.

## Bloqueadores técnicos

- implementar BFF/fixture server-side antes de substituir a fixture client-side;
- revalidar preço, estoque, frete, revisão e checkout no servidor;
- allowlist exata do domínio de checkout e webhooks com assinatura/idempotência;
- CSP, HSTS e headers testados no host HTTPS;
- remover `noindex` somente após crawl/SEO/schema/feed factual;
- três runs Lighthouse mobile no preview comprimido com mediana ≥90 e LCP ≤2,5 s;
- trace da cena WebGL em Android intermediário com GPU real;
- leitores de tela reais e Safari/iOS físico;
- sandbox de pagamento com rejeição, retry, reconciliação e webhook duplicado;
- DAST/pentest proporcional e plano de incidente/rights request aprovado.

## Sequência autorizável futura

1. Aprovar dados/owners e ADR final de providers.
2. Implementar BFF e catálogo real em ambiente sandbox.
3. Executar `docs/architecture/COMMERCE_MIGRATION_RUNBOOK.md` até dark launch.
4. Configurar preview HTTPS, headers, observabilidade e secrets fora do repositório.
5. Reexecutar QA, SEO, a11y, performance e segurança.
6. Obter parecer HEAL-22 sem blockers internos.
7. Solicitar aprovação humana explícita para deploy/DNS/cutover.

## Rollback futuro

O deploy ainda não existe. Quando houver, o rollback deve preservar o último build conhecido, congelar checkout, interromper webhooks/consumidores com segurança, reverter roteamento para a versão anterior e reconciliar pedidos/estoque antes de reabrir. Procedimentos específicos dependem do host e provider aprovados; não foram inventados neste protótipo.
