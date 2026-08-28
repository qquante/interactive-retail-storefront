# HEAL-22 — release review

Data: 2026-08-28  
Reviewer: HEAL-22, independente e read-only

## Primeiro review

Commit: `b5ec1826ec1255a8cbe66c37e37660edb800afe2`  
Decisão: `changes_requested`

Findings internos:

- HEAL22-001 P2: warning de emissão CSS sem prova de determinismo;
- HEAL22-002 P2: primitives obrigatórios do design system ausentes, apesar da task verificada;
- HEAL22-003 P2: handoffs/sessões e vínculo de evidência incompletos;
- HEAL22-004 P1 para preview: `Disallow: /` impedia o crawler de ler `noindex`.

Blockers de produção foram separados dos bugs da demo: backend/commerce real, performance mobile/GPU, segurança/LGPD/SEO factual e validação humana de acessibilidade.

## Remediação enviada a re-review

Commit de código/docs/gates: `70be2a6c92754339a9c90e1e987965a62243d0d2`.

- HEAL22-001: dois manifests CSS estáveis, cópias commerce byte-idênticas e smoke íntegro documentados em `BUILD_DETERMINISM.md`;
- HEAL22-002: Dialog, Drawer, Accordion, Tabs e Toast implementados; 5 testes de interação;
- HEAL22-003: 24 handoffs de agentes mais o README, log de sessões, erros e limitação de horários/worktrees consolidados sem inventar dados;
- HEAL22-004: robots permite crawl, meta global continua `noindex, nofollow`, teste unitário e E2E adicionados; preview continua HOLD até autenticação no edge.

Gates da remediação:

- lint: exit 0;
- TypeScript: exit 0;
- Vitest: 12/12, exit 0;
- Axe: 3 rotas, zero violações, exit 0;
- Playwright: 52/52 em 4 projetos, exit 0;
- build: exit 0, com warnings documentados;
- smoke do build: 6 rotas HTML + `/robots.txt`, todos HTTP 200; meta/robots confirmados;
- audit produção e completo: zero vulnerabilidades, exit 0;
- `git diff --check`: exit 0, apenas avisos LF/CRLF.

## Re-review

HEAD revisado: `6b77c52aec2cc879d3fdacc76cbbaff34aa2fe8f`
Decisão: `approved`, limitada ao protótipo local fixture.

HEAL22 confirmou:

- HEAL22-001 fechado: CSS byte-idêntico e warning tratado como dívida monitorada;
- HEAL22-002 fechado: inventário obrigatório do design system e testes presentes;
- HEAL22-003 fechado materialmente: handoffs/sessões honestos, sem timestamp ou worktree inventado;
- HEAL22-004 fechado no protótipo local: crawl permitido e `noindex, nofollow` legível;
- Playwright bruto 52 expected, 0 unexpected/flaky/skipped;
- árvore Git limpa durante o review.

Finding não bloqueante `H22-005` foi corrigido neste documento: 24 handoffs + README, 13 E2E por projeto, 10 unitários + 2 de integração e smoke final de 6 rotas HTML + robots. A tentativa de audit no diretório raiz falhou por ausência de lockfile e não foi usada como evidência; os audits corretos em `site/` terminaram com zero vulnerabilidades.

Decisão por alvo:

| Alvo | Veredito |
|---|---|
| Protótipo local fixture | **GO** |
| Preview compartilhado | **HOLD** até autenticação de borda, HTTPS e headers |
| Produção comercial | **NO-GO** até fechamento dos gates externos/técnicos documentados |
