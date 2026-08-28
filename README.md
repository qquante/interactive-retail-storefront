# HEAL. CURA. — storefront local

Storefront premium PT-BR para Heal Incensos, construído como uma demonstração local explicitamente rotulada. A experiência inclui Home, coleção, PDP, busca/filtro, sacola, frete fictício, handoff sem pagamento, conteúdo institucional, Anime.js e uma cena Three.js progressiva com fallback SVG.

## Estado real

- Funciona localmente com catálogo e valores de fixture.
- Não cria pedido, cobrança, Pix, boleto ou transação de cartão.
- Não possui domínio, empresa/políticas aprovadas, catálogo real, backend, CMS, Shopify, analytics ou deploy.
- Permanece globalmente `noindex`; `robots.txt` permite crawl técnico para que a diretiva seja lida. Preview compartilhado exige autenticação no edge.
- O veredito de segurança é GO apenas para protótipo local e NO-GO para produção.

## Executar

Requisitos: Node.js 22.13 ou superior.

```powershell
cd C:\Users\PC\Desktop\Heal\site
npm ci
npm run dev
```

Abrir `http://localhost:3000`.

## Gates locais

```powershell
npm run lint -- --no-cache
npx tsc --noEmit --incremental false
npm run test
npm run test:a11y
npm run test:e2e
npm run build
npm audit --omit=dev
git diff --check
```

O Playwright usa Chromium desktop/mobile, Firefox e WebKit. A primeira instalação local dos browsers pode ser feita com `npx playwright install chromium firefox webkit`.

## Configuração atual

Copie `site/.env.example` para um arquivo local ignorado somente quando houver uma origem confiável. `SITE_ORIGIN` habilita a URL absoluta do cartão social; não remove `noindex` nem autoriza deploy.

## Documentação

- Estado e decisões: `CONTEXT.md`, `DECISIONS.md`, `TASKS.md`, `SESSIONS.md`.
- Pesquisa 2026: `docs/research/` e `docs/seo/`.
- UX/design/motion: `docs/ux/` e `docs/design/`.
- Commerce/backend: `docs/commerce/` e `docs/architecture/`.
- QA, segurança e performance: `docs/qa/`, `docs/security/`, `docs/performance/`.
- Evidências: `EVIDENCE_INDEX.md` e `docs/evidence/`.
- Agentes: `docs/agents/handoffs/`, `docs/agents/sessions/` e `docs/agents/REGISTRY.md`.

Antes de qualquer publicação, siga `docs/operations/RELEASE_READINESS.md`. Este repositório não foi implantado.
