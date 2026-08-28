# HEAL — Performance review

Data da auditoria: 2026-08-28  
Responsável: HEAL-18  
Escopo: análise somente leitura do build e da execução local de produção. Nenhum código, pacote ou config foi alterado.

## Veredito

O desktop sintético está forte, e a arquitetura de progressive enhancement do 3D é correta. O release mobile ainda não está aprovado: a única execução Lighthouse mobile marcou 79, com FCP 3,6 s e LCP 4,1 s. O servidor Vinext local não aplicou compressão, então esses tempos e 624 KiB transferidos não representam uma CDN de produção; mesmo assim, são evidência suficiente para manter o gate fechado até medir uma origem final comprimida.

O LCP foi o H1 `Acenda o intervalo.`, renderizado no servidor. TBT e CLS foram zero. O Three.js não entrou no run Lighthouse porque o Chrome foi iniciado com GPU desabilitada, portanto o score 79 não mede o custo normal de WebGL. Em probe Playwright separado, a cena carregou em desktop (`high`) e mobile (`low`) e requisitou o chunk lazy de 504,4 KiB minificado / 125,2 KiB gzip estimado.

Não há dados CrUX, RUM ou INP de campo. Nada neste relatório deve ser chamado de performance real de usuários.

## Medições reproduzidas

### Build e bundles

`npm run build` terminou com exit code 0. O Vite/Vinext alertou para chunk acima de 500 KiB.

| Artefato | Minificado | Gzip estimado localmente |
|---|---:|---:|
| `createEmberSmokeRuntime-*.js` | 504,42 KiB | 125,18 KiB |
| `framework-*.js` | 185,65 KiB | 57,78 KiB |
| `vinext-*.js` | 126,88 KiB | 37,77 KiB |
| `index-*.js` | 115,08 KiB | 32,83 KiB |
| `motion.module-*.js` | 32,97 KiB | 12,81 KiB |
| 15 scripts vistos pelo Lighthouse, sem Three | 505,34 KiB | 158,90 KiB |
| Base + Three no caminho normal | 1.009,76 KiB | 284,08 KiB |
| Todo CSS emitido | 35,01 KiB | 10,19 KiB |

Gzip foi calculado sobre arquivos do build; a resposta HTTP local não tinha `Content-Encoding`. O asset Three com hash tinha cache correto: `public, max-age=31536000, immutable`.

### Lighthouse 13.4.1 — uma execução por perfil

| Perfil | Score | FCP | LCP | TBT | CLS | Speed Index | TTI | Transferência | Requests |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Mobile simulado | 79 | 3,6 s | 4,1 s | 0 ms | 0 | 3,6 s | 4,1 s | 624 KiB | 27 |
| Desktop | 99 | 0,7 s | 0,8 s | 0 ms | 0 | 0,7 s | 0,8 s | 624 KiB | 27 |

Detalhes mobile:

- documento raiz: 60 ms;
- main-thread work: 0,4 s;
- JavaScript não usado estimado: 229 KiB, concentrado em framework, `index` e Vinext;
- CSS render-blocking: economia potencial reportada de 300 ms;
- LCP: H1 SSR, não imagem;
- nenhuma oportunidade de imagem, fonte ou cache foi apontada;
- o host local transferiu JS sem compressão, distorcendo o peso de rede.

Relatórios brutos:

- `docs/evidence/performance/lighthouse-mobile.json`
- `docs/evidence/performance/lighthouse-desktop.json`

Os dois comandos Lighthouse geraram JSON parseável, mas terminaram com exit code 1 ao tentar remover o diretório temporário do Chrome no Windows (`EPERM`). Essa falha de cleanup impede considerar o comando um gate verde, embora não invalide o conteúdo já escrito.

### Probes Playwright de runtime

Executados contra `vinext start` local, sem throttling de rede:

| Cenário | Resultado |
|---|---|
| 1440 x 900 normal | `data-state=ready`, qualidade `high`, chunk Three solicitado |
| 390 x 844 normal | `data-state=ready`, qualidade `low`, chunk Three solicitado |
| 390 x 844 + `reducedMotion=reduce` | fallback SVG, Three não solicitado |
| 390 x 844 + `navigator.connection.saveData=true` sintético | fallback SVG, Three não solicitado |

No host local sem compressão, o chunk Three transferiu 516.829 bytes em cada cenário normal. Os tempos de navegação em localhost não são métricas úteis de usuário e foram deliberadamente excluídos do veredito.

## O que está bem resolvido

- Conteúdo e CTA são SSR; o H1 LCP não depende do canvas.
- SVG fallback está no HTML e mantém a composição sem WebGL/JS.
- Import dinâmico do runtime em `site/components/three/EmberSmokeScene.tsx:167` separa Three do bundle crítico.
- `IntersectionObserver` em `site/components/three/EmberSmokeScene.tsx:212-221` e `visibilitychange` suspendem trabalho fora de contexto.
- `prefers-reduced-motion`, `prefers-reduced-data` e `saveData` são avaliados em `site/components/three/EmberSmokeScene.tsx:116-127`.
- Tiers de hardware/viewport existem em `site/components/three/EmberSmokeScene.tsx:40-59`.
- DPR, FPS, geometrias e fitas têm limites explícitos; cleanup encerra loop e libera GPU em `site/components/three/createEmberSmokeRuntime.js:248-283`.
- `contain: layout paint style` e dimensões estáveis da cena evitam layout shift.
- Anime.js respeita `prefers-reduced-motion`; conteúdo/status continuam independentes da animação.
- Fontes são system stack; não existe bloqueio por webfont.

## Findings priorizados

### P1 — mobile lab fora do gate

**Evidência:** score 79, FCP 3,6 s, LCP 4,1 s na única execução mobile; alvo é score >= 90 e LCP <= 2,5 s. O H1 de `site/app/page.tsx:63` é o LCP, mas o atraso é anterior à pintura do conteúdo, não custo de uma imagem LCP.

**Ação:** medir três runs numa origem de preview com HTTPS, Brotli/CDN e hardware estável; perfilar critical CSS e bootstrap Vinext se a mediana continuar acima do alvo. Não liberar com base apenas no desktop 99.

### P1 — compressão de produção ainda não provada

**Evidência:** `vinext start` respondeu JS com `Content-Length`, sem `Content-Encoding`. O mesmo payload base representa ~505 KiB sem compressão e ~159 KiB gzip estimado. Config local em `site/next.config.ts:1` não estabelece esse contrato; a responsabilidade provavelmente ficará no host/CDN.

**Ação:** gate pós-deploy deve provar Brotli/gzip em HTML, CSS, JS e SVG; manter cache imutável em assets com hash. Isso depende do ambiente de hosting autorizado, não deve ser mascarado no app.

### P1 — custo WebGL não coberto pelo Lighthouse

**Evidência:** a cena em `site/app/page.tsx:97` fica acima da dobra; assim que o efeito/intersection executa, `site/components/three/EmberSmokeScene.tsx:167` baixa 125,2 KiB gzip estimado. O run Lighthouse desabilitou GPU e não pediu o runtime. A implementação usa `import * as THREE` em `site/components/three/createEmberSmokeRuntime.js:1`, produzindo 504,4 KiB minificados.

**Ação:** antes de produção, trace com GPU ativa em Android intermediário, incluindo long tasks, INP de menu/sacola, frame pacing, energia e memória. Reduzir o chunk para <= 100 KiB gzip ou documentar exceção; investigar imports mais estreitos/custom shader runtime e início pós-LCP/idle sem remover o fallback semântico.

### P2 — JavaScript inicial perto do teto e com 229 KiB estimados como não usados

**Evidência:** Lighthouse solicitou 15 scripts, ~158,9 KiB gzip estimado antes do Three; o diagnóstico apontou 229 KiB não usados no payload minificado. A Home tem três islands client-side e vários `Link`, incluindo `CartLink` em `site/app/page.tsx:41`.

**Ação:** usar coverage/treemap numa origem representativa; revisar bootstrap Vinext, store da sacola e prefetch de rotas não críticas. Manter o JS inicial abaixo de 180 KiB gzip.

### P2 — prefetch de rotas disputa banda após a primeira navegação

**Evidência:** no run mobile foram buscados RSC de coleção, guia, busca e carrinho, além do chunk `CartView`, mesmo sem interação. Os links da Home aparecem em `site/app/page.tsx:25-161`.

**Ação:** preservar prefetch só para a rota de maior intenção; considerar `prefetch={false}` em navegação/footer/carrinho de baixa prioridade, e medir impacto em first view e navegação seguinte.

### P2 — CSS duplicado no build

**Evidência:** `commerce.B_uAQptN.css` e `CommercePageShell.B_uAQptN.css` são byte a byte idênticos (8,21 KiB cada) e ambos aparecem no HTML da Home. A origem é o módulo `site/components/commerce/commerce.module.css` consumido pelo shell e componentes.

**Ação:** investigar deduplicação do Vinext/Vite ou separar os estilos mínimos do `CartLink`; adicionar assert de asset duplication no build.

### P2 — social preview excede budget

**Evidência:** `site/public/og.png` tem 1.107.114 bytes. Não entra na Home, mas é custo direto para crawlers e compartilhamento; `site/app/layout.tsx:36-43` o publica quando `SITE_ORIGIN` existe.

**Ação:** otimizar PNG ou produzir JPEG progressivo de 1200 x 630 com <= 300 KiB, preservando legibilidade. Revalidar plataformas sociais.

### P3 — raster demonstrativo não usado aumenta artefato de deploy

**Evidência:** `site/public/images/heal-ritual-demo.png` tem 1.723 KiB e não existe referência no código; AVIF/WebP correspondentes também não são usados no runtime atual.

**Ação:** manter somente se for evidência/proveniência necessária; caso contrário, mover fonte para acervo fora de `public` e publicar apenas a variante realmente consumida.

### P3 — custo Anime.js deve continuar justificado

**Evidência:** o chunk de motion mede 32,97 KiB minificado / 12,81 KiB gzip estimado e é solicitado na Home para a transição editorial de `site/components/motion/EditorialSeamReveal.tsx:22-60`.

**Ação:** manter enquanto a animação continuar sendo parte da linguagem de marca e o budget total passar. Impedir crescimento ou inclusão de APIs Anime.js não utilizadas.

## Gates antes de produção

1. Lighthouse mobile mediana de três runs >= 90 em Home, PLP, PDP, sacola e checkout.
2. LCP lab <= 2,5 s, TBT <= 200 ms e CLS <= 0,1 em todas as rotas críticas.
3. Trace Android com GPU real e cena ativa, sem long task > 100 ms e sem degradação observável das interações.
4. Brotli/gzip e cache comprovados por headers no host final.
5. Chunk Three <= 130 KiB gzip; alvo <= 100 KiB.
6. `reduced-motion` e `saveData` automatizados como teste de não-download.
7. `og.png` <= 500 KiB hard gate, alvo <= 300 KiB.
8. Após tráfego suficiente, p75 de LCP/INP/CLS aprovado por mobile e desktop. Até lá, status de field permanece `sem dados`, nunca `verde`.

## Comandos e exit codes

| Comando | Exit | Observação |
|---|---:|---|
| `npm run build` | 0 | build completo; warning de chunk > 500 KiB |
| `npm run start -- --host 127.0.0.1 --port 4173` | processo iniciado | servidor de produção local usado nos probes |
| Lighthouse mobile 13.4.1 | 1 | JSON completo; cleanup Chrome falhou com `EPERM` |
| Lighthouse desktop 13.4.1 | 1 | JSON completo; cleanup Chrome falhou com `EPERM` |
| Probe Playwright normal desktop/mobile | 0 | cena `ready`; tiers high/low; Three solicitado |
| Probe Playwright `reducedMotion=reduce` | 0 | fallback; Three não solicitado |
| Probe Playwright `saveData=true` sintético | 0 | fallback; Three não solicitado |

## Limites desta auditoria

- Uma execução Lighthouse por perfil; score pode variar.
- Localhost, sem CDN, TLS, compressão ou latência de origem real.
- Lighthouse não executou o caminho WebGL.
- Sem throttling/CPU em probes Playwright.
- Sem catálogo/imagens reais de produto.
- Sem RUM, CrUX, usuários ou INP de campo.

## Remediação posterior pelo coordenador

Após o handoff HEAL-18, `site/public/og.png` foi otimizado de 1.107.114 para 339.141 bytes, mantendo 1200×630 e o texto legível; o hard gate de 500 KiB foi fechado. Links secundários, carrinho, cards e rodapé receberam `prefetch={false}` para reduzir disputa de banda; a rota primária de coleção permanece priorizada. O raster editorial não usado e seus derivados foram movidos de `site/public/` para `docs/evidence/assets/`, preservando a evidência sem inflar o deploy. Essas mudanças ainda exigem nova medição Lighthouse e não fecham os P1 dependentes de origem comprimida ou hardware GPU real.
