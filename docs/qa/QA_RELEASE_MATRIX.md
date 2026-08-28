# HEAL-21 — matriz final de QA e release local

Data: 2026-08-28  
Executor: HEAL-21, revisão independente read-only  
Estado originalmente testado por HEAL-21: `HEAD 04d1e04` mais a árvore de trabalho compartilhada ainda não consolidada  
Alvo principal: `http://localhost:3000` (Vinext dev)  
Alvo complementar: `http://localhost:3001` (artefato de `vinext build`, iniciado apenas durante o smoke)

## Veredito executivo

**Protótipo local rotulado: aprovado com ressalvas. Produção: não aprovada.**

O storefront demonstrativo funciona de ponta a ponta dentro da fixture: Home, coleção, PDP, busca/filtro, sacola, quantidade, remoção/undo, CEP fictício e handoff de checkout sem pedido ou pagamento. Após o handoff de HEAL-21, o coordenador limitou a suíte a um worker, incorporou os probes críticos e obteve `52/52` no comando padrão em Chromium desktop, Chromium mobile, Firefox e WebKit. A matriz axe estendida passou em 20 combinações de rota/viewport com zero violações. Build e smoke do servidor de produção local passaram.

Isso não constitui prontidão para venda. Catálogo, preço, estoque, frete, pedido, pagamento, CMS e políticas comerciais continuam fictícios ou ausentes. Os gates de performance mobile, compressão/CDN, GPU real, headers/CSP, backend autoritativo e LGPD operacional continuam abertos.

## Escopo e método

HEAL-21 não alterou código, pacotes, configuração ou documentação alheia. A única escrita intencional é este relatório. Execuções de Playwright atualizaram os artefatos já existentes em `site/playwright-report/` e `site/test-results/`.

Foram inspecionados:

- scripts, configuração Playwright/Vitest e árvore de rotas;
- commerce fixture e estado em `sessionStorage`;
- busca, filtro, PDP, sacola e handoff;
- cena Three.js e contratos de reduced motion/fallback;
- relatórios anteriores de responsividade, acessibilidade, performance e segurança;
- diff e estado Git compartilhado.

Não houve deploy, domínio, conexão de terceiros, pagamento, pedido, conta, secret ou dado pessoal real.

## Matriz de gates

| Gate | Comando/evidência | Resultado | Exit | Estado |
|---|---|---:|---:|---|
| Lint | `npm run lint -- --no-cache` | sem findings | 0 | PASS |
| Typecheck | `npx tsc --noEmit --incremental false` | sem erros | 0 | PASS |
| Unit | `npm run test:unit` | 4/4 | 0 | PASS |
| Integration | `npm run test:integration` | 2/2 | 0 | PASS |
| Audit produção | `npm audit --omit=dev --audit-level=moderate` | 0 vulnerabilidades | 0 | PASS |
| Audit completo | `npm audit --audit-level=moderate` | 0 vulnerabilidades | 0 | PASS |
| Axe reproduzível | `npm run test:a11y` | 3 rotas, 0 violações | 0 | PASS |
| E2E padrão — run 1 | `npm run test:e2e` | 26/28; 2 recusas de conexão no Firefox | 1 | FAIL |
| E2E padrão — run 2 | `npm run test:e2e` | 26/28; 2 recusas de conexão no Firefox | 1 | FAIL |
| Firefox axe isolado | `npx playwright test --project=firefox-desktop --grep "não tem violações"` | 3/3 | 0 | PASS |
| E2E determinístico | `npx playwright test --workers=1` | 28/28, 4 projetos | 0 | PASS |
| E2E padrão pós-remediação | `npm run test:e2e` | 52/52, 4 projetos, 1 worker configurado | 0 | PASS |
| Build | `npm run build` | concluído; 2 warnings documentados | 0 | PASS com warning |
| Smoke do build | servidor `npm run start -- --port 3001` + Playwright | 6 rotas HTTP 200, sem overflow/console error | 0 | PASS |
| 404 | `curl` + Playwright | rotas, produto e coleção inexistentes retornam 404 | 0 | PASS |
| Diff-check | `git diff --check` | sem whitespace errors; avisos LF→CRLF | 0 | PASS com warning |

O relatório HTML do último rerun está em `site/playwright-report/index.html`. `site/test-results/.last-run.json` registra `status: passed` e lista vazia de testes falhos.

## Primeiras falhas e reruns

### E2E cross-browser

Primeira execução:

- `npm run test:e2e`;
- 26 testes aprovados e 2 falhos;
- as duas falhas foram `page.goto: NS_ERROR_CONNECTION_REFUSED` no Firefox durante scans axe;
- nenhuma falha retornou uma violação axe ou uma asserção de produto.

Rerun completo:

- repetiu 26/28;
- novamente, as duas falhas foram recusas de conexão no Firefox, em rotas axe;
- os mesmos três testes Firefox passaram isolados, 3/3;
- a matriz inteira passou com `--workers=1`, 28/28.

Conclusão original de HEAL-21: havia uma falha reproduzível no gate paralelo/servidor de teste. O coordenador remediou a configuração para a capacidade real do Vinext local e rerodou o próprio comando padrão com exit 0. O histórico vermelho foi preservado acima para não apagar evidência.

### Script funcional estendido

A primeira versão do probe efêmero alterou `noValidate` antes de a PDP terminar a hidratação. O React remontou o formulário, restaurou quantidade `1` e asserções subsequentes falharam em cascata. O console mostrou o mismatch provocado pela própria mutação do teste. Esse resultado **não foi usado como finding de produto**.

O caso foi minimizado e rerodado aguardando o botão hidratado antes da mutação controlada. Resultado: exit 0 para quantidade inválida preservada, quantidade 2, persistência após reload, remoção/undo, CEP inválido/válido, checkout preenchido, checkout vazio e retry. Reload normal da Home, sem mutação pré-hidratação, permaneceu sem warning/error conforme a revalidação de HEAL-17.

## Matriz funcional

| Cenário | Evidência observada | Resultado |
|---|---|---|
| Home → coleção → PDP | navegação e conteúdo fixture | PASS |
| Busca positiva | `q=Intervalo 02`, 1 resultado, URL preservada | PASS |
| Busca vazia | estado “Nenhum resultado” | PASS |
| Busca de saúde | termo `ansiedade` aciona guardrail sem alegação terapêutica | PASS |
| Filtro | disponibilidade desconhecida exibe apenas Intervalo 03 e preserva query string | PASS |
| Quantidade inválida | `0` preservado; erro associado e `aria-invalid=true` no caminho customizado | PASS |
| Quantidade 2 | linha e subtotal `R$ 78,00` | PASS |
| Inventory unknown | Intervalo 03 bloqueia adicionar e explica indisponibilidade não autoritativa | PASS |
| Persistência | quantidade 2 permanece após navegação/reload na mesma aba | PASS |
| Remoção | linha removida, status anunciado e estado vazio | PASS |
| Undo | restaura exatamente quantidade 2 | PASS |
| CEP inválido | `123` preservado, instrução e `aria-invalid=true` | PASS |
| CEP válido | `01001000` exibido como `01001-***`; prazo/valor explicitamente fictícios | PASS |
| Checkout fixture | quantidade, total e aviso “Nenhum pagamento será processado” | PASS |
| Encerrar demonstração | estado final sem pedido ou pagamento | PASS |
| Checkout vazio | erro “A sacola demonstrativa está vazia” | PASS |
| Retry vazio | reexecuta e mantém erro esperado, sem falso sucesso | PASS |
| 404 genérico | `/qa-rota-inexistente` retorna HTTP 404 e heading próprio | PASS |
| 404 dinâmico | produto e coleção inexistentes retornam HTTP 404 | PASS |
| Robots fixture | `/robots.txt` retorna `Allow: /`; HTML retorna `noindex, nofollow` | PASS |

## Navegadores, viewports e overflow

A suíte versionada final executou os mesmos doze testes em:

- Chromium desktop `1440×900`;
- Chromium mobile `390×844`;
- Firefox desktop `1440×900`;
- WebKit desktop `1440×900`.

No rerun final, todos passaram. O fluxo cross-browser inclui handoff completo, checkout vazio/retry, 404, teclado/menu, reduced motion, axe em sacola/checkout, inventory unknown, busca/filtro, overflow e axe nas três rotas públicas principais.

O probe estendido verificou 19 rotas/estados em `320`, `390`, `768` e `1440` CSS px, totalizando 76 verificações. Todas retornaram:

```text
document.documentElement.scrollWidth - document.documentElement.clientWidth = 0
```

Foram incluídos Home, listagens, PDP disponível/desconhecida, sacola, checkout, busca, páginas editoriais/políticas e 404. Isso fecha a regressão de overflow anteriormente registrada para o estado atual.

## Acessibilidade e teclado

### Axe

Além do script versionado de três rotas, foi executada uma matriz efêmera com a sacola e o checkout preenchidos:

| Viewport | Home | Coleção | PDP | Sacola | Checkout |
|---:|---:|---:|---:|---:|---:|
| 320 | 0 | 0 | 0 | 0 | 0 |
| 390 | 0 | 0 | 0 | 0 | 0 |
| 768 | 0 | 0 | 0 | 0 | 0 |
| 1440 | 0 | 0 | 0 | 0 | 0 |

Total: 20 scans, zero violações nas tags `wcag2a`, `wcag2aa`, `wcag21aa` e `wcag22aa`; exit 0.

### Teclado básico

- primeiro `Tab` da Home foca “Pular para o conteúdo” em Chromium/Firefox;
- `Enter` atualiza o destino para `#conteudo`;
- `summary` do menu mobile abre com `Enter`;
- foco em quantidade → `Tab` alcança “Adicionar à sacola demonstrativa”;
- `Enter` adiciona quantidade 2 e produz status textual.

O WebKit headless não expõe a preferência do macOS “Tab para destacar links”; nele, o skip link foi validado como focável e ativável por `Enter`, e o menu continuou sendo validado por teclado. Safari/iOS físico permanece pendente.

Este resultado não substitui teste com NVDA, JAWS, VoiceOver ou TalkBack.

## Reduced motion, fallback e 3D

Em contexto Playwright `reducedMotion: reduce`, `390×844`:

- a cena permaneceu em `data-state="fallback"`;
- o SVG fallback ficou visível;
- o canvas estrutural permaneceu presente, sem assumir o conteúdo funcional;
- CTAs e navegação continuaram independentes da cena.

O custo WebGL real não foi aprovado por este gate; continua necessário medir GPU, frame pacing, energia, memória e interação em Android intermediário/dispositivo físico.

## Build e smoke de produção local

`npm run build` concluiu com exit 0 e gerou todas as rotas. Warnings:

1. chunk lazy `createEmberSmokeRuntime-Cz2EhLHN.js`: `516.529` bytes minificados, acima do limiar de warning de 500 kB;
2. `[FILE_NAME_CONFLICT]` para `_next/static/css/commerce.BmIhDIRk.css`.

O servidor do build foi iniciado temporariamente na porta 3001. Home, coleção, PDP, sacola, checkout e busca retornaram HTTP 200, zero overflow e zero console/page error. As folhas CSS estavam carregadas e acessíveis via CSSOM; `commerce.BmIhDIRk.css` expôs 75 regras. Dois builds adicionais produziram nomes, tamanhos e SHA-256 idênticos; as três cópias da folha commerce têm 8.444 bytes e o mesmo hash. A prova está em `docs/qa/BUILD_DETERMINISM.md`. O warning permanece visível como limitação Vinext monitorada, sem perda observada neste estado.

Tamanhos observados no build:

| Artefato | Bytes |
|---|---:|
| Three runtime lazy | 516.529 |
| framework | 190.109 |
| vinext | 129.921 |
| index | 117.842 |
| Anime/motion module | 33.764 |
| `og.png` | 339.141 |

O build local não comprova Brotli/CDN, cache do host, Core Web Vitals de campo nem custo real de GPU.

## Findings HEAL-21

### P0

Nenhum P0 identificado no protótipo local. Isso não equivale a pentest, compliance ou ausência garantida de falhas.

### QA-001 — P1 — fechado — comando E2E padrão era vermelho sob a configuração paralela

**Reprodução:** `cd site; npm run test:e2e`.  
**Resultado:** duas execuções independentes terminaram `26 passed / 2 failed`, exit 1. As falhas foram `NS_ERROR_CONNECTION_REFUSED` em navegações Firefox.  
**Controle:** testes Firefox isolados passaram 3/3; matriz serial passou 28/28.  
**Impacto:** CI/release gate padrão não é determinístico e pode falhar sem regressionar o produto.  
**Owner:** frontend platform/test infra (root).  
**Correção sugerida:** testar o build/servidor de produção em porta dedicada ou limitar workers para a capacidade do Vinext local; remover dependência de servidor compartilhado; preservar trace em falha.  
**Remediação:** `workers: 1` foi versionado para respeitar a capacidade do servidor Vinext local; `npm run test:e2e` passou `52/52`, incluindo Firefox, sem rerun manual. Repetições em CI limpo continuam recomendadas, mas o gate local padrão está verde.

### QA-002 — P2 — fechado — casos críticos foram incorporados à suíte versionada

**Escopo ausente da suíte versionada:** quantidade inválida/2, persistência de sessão, remoção/undo, CEP inválido, checkout vazio/retry, 404, teclado e reduced motion; axe de sacola/checkout e quatro viewports.  
**Impacto:** esses comportamentos passaram agora, mas podem regredir sem que o CI detecte.  
**Owner:** frontend QA/root.  
**Remediação:** a suíte versionada agora cobre quantidade 2, persistência de sessão, remoção/undo, CEP inválido/válido, checkout vazio/retry, 404, teclado/menu, reduced motion, inventory unknown, busca/filtro, política noindex/robots e axe de sacola/checkout. Resultado final: `52/52`, exit 0.

### QA-003 — P2 — fechado com limitação monitorada — warning CSS

**Reprodução:** `npm run build`.  
**Resultado:** `[FILE_NAME_CONFLICT]` informa overwrite de `commerce.BmIhDIRk.css`. O smoke de produção atual ficou visual e funcionalmente íntegro.  
**Impacto:** risco de output não determinístico ou perda silenciosa quando os módulos CSS divergirem.  
**Owner:** frontend platform/Vinext.  
**Remediação/prova:** dois builds consecutivos produziram manifesto CSS estável. Client, server e SSR emitiram `commerce.BmIhDIRk.css` com 8.444 bytes e SHA-256 `4458929FDF990B76B178B7D6743B0A7B8173411F5042D466F69F138DE75674B7`; o smoke carregou o CSSOM sem perda. Ver `BUILD_DETERMINISM.md`. Reabre se o conteúdo divergir ou o smoke falhar.

### QA-004 — P3 — fechado no primeiro release candidate; nova remediação aguarda hash final

**Evidência:** a auditoria testou `HEAD 04d1e04` mais uma árvore de trabalho com arquivos modificados e não rastreados. `git diff --check` passou, porém há avisos LF→CRLF.  
**Impacto:** não é possível reproduzir exatamente o estado aprovado apenas pelo hash atual.  
**Owner:** root/release owner.  
**Remediação:** o estado HEAL-21 foi consolidado em `b5ec1826ec1255a8cbe66c37e37660edb800afe2`, limpo e revisado por HEAL-22. As correções pedidas no primeiro review serão ligadas a um segundo hash e rerodadas antes do re-review.

## Blockers de produção confirmados fora do escopo funcional local

Os itens abaixo já pertencem aos owners especializados e foram confirmados como abertos, não reinventados por HEAL-21:

- **Performance P1:** Lighthouse mobile local 79, FCP 3,6 s e LCP 4,1 s; falta mediana de três runs em origem HTTPS comprimida;
- **Performance P1:** custo Three/WebGL não medido com GPU ativa; chunk lazy tem 516.529 bytes minificados;
- **Performance/infra:** compressão, CDN, cache e Core Web Vitals de campo não existem para a fixture;
- **Segurança P1:** headers/CSP não configurados/comprovados no domínio final;
- **Commerce/segurança P1:** backend autoritativo, revalidação server-side, allowlist de checkout, webhooks e idempotência ainda não existem;
- **LGPD/operação:** controlador, operadores, retenção, canal de direitos, política factual, contratos e runbook de incidente ainda precisam ser aprovados/testados;
- **Conteúdo/comercial:** catálogo real, estoque, preços, frete, políticas, atendimento e dados empresariais permanecem `[A VALIDAR]`;
- **SEO/release:** o fixture usa `noindex`; `robots.txt` permite crawl para que a diretiva seja lida; preview público exige autenticação no edge; domínio, canonical, sitemap, schema factual e feed real dependem de conteúdo/origem aprovados;
- **Acessibilidade humana:** leitores de tela reais, Safari/iOS físico, teclado virtual, Dynamic Type e percepção de usuários não foram testados.

## O que não foi testado

- pagamento, Pix, boleto, cartão, pedido, reembolso, webhook ou conta real;
- Shopify/CMS/backend real, rede instável, timeout externo ou retry de provider;
- cookies/analytics/CMP de terceiros, porque não estão conectados;
- ambiente HTTPS/CDN final e headers no host real;
- dispositivo físico, bateria, temperatura, GPU e tecnologias assistivas reais;
- concorrência multiusuário, estoque real, idempotência distribuída e recuperação de desastre;
- segurança ofensiva, DAST e pentest.

## Decisão de release

| Alvo | Decisão | Condição |
|---|---|---|
| Demonstração local rotulada | **GO com ressalvas** | manter sem dados/pagamentos/serviços reais e sem indexação |
| Preview compartilhado | **HOLD** | autenticação no edge, origem HTTPS/headers e novo gate de segurança/performance |
| Produção comercial | **NO-GO** | fechar blockers de commerce, conteúdo, performance, segurança, LGPD, SEO e acessibilidade humana |

## Handoff objetivo

1. Root fecha as remediações HEAL22-001…004 em novo commit e reroda os gates.
2. HEAL-22 faz re-review read-only do hash final.
3. HEAL-18 mede origem comprimida e GPU/dispositivo real antes de preview/produção.
4. HEAL-19 revalida headers/CSP, dados, providers, checkout e LGPD após integrações reais.
