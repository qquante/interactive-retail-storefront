# Handoff HEAL-15 / HEAL-T015

## Resultado
Pesquisa e especificação de SEO técnico 2026.
## Estado real: estrutura noindex validada; produção bloqueada
## Fontes consultadas e datas
Google Search Central e documentação oficial listados em `docs/research/2026-08-28-seo-2026.md`.
## Decisões propostas
Sem canonical/schema/feed até origem e catálogo factuais; preview autenticado.
## Arquivos alterados
Research/spec SEO e metadata/robots integrados pelo root.
## Escopo não tocado
Domínio, CDN, Search Console e publicação.
## Comandos executados
Pesquisa web e inspeção local; root testou HTML/robots.
## Testes e exit codes
Teste unitário de robots + E2E/HTTP no QA.
## Evidências geradas
Meta noindex, robots crawlable e status de implementação.
## Erros encontrados e como foram resolvidos
`Disallow: /` impediria leitura de noindex; HEAL22 reabriu e root corrigiu para `Allow: /`.
## Riscos e pendências
Autenticação/header dependem da hospedagem; indexação real continua bloqueada.
## Próximo owner
Infra + HEAL-16/19.
