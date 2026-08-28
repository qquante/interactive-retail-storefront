# HEAL — Performance budget

Data-base: 2026-08-28  
Escopo: storefront Vinext/React, Home, PLP, PDP, sacola e handoff de checkout.  
Regra: budgets de campo têm precedência sobre score sintético. Mobile e desktop devem ser avaliados separadamente.

## Gate de experiência real

Os limites oficiais atuais de Core Web Vitals são medidos no percentil 75 das visitas: LCP <= 2,5 s, INP <= 200 ms e CLS <= 0,1. A HEAL só pode declarar o gate aprovado quando houver dados de campo suficientes e segmentados por mobile/desktop. Não existe CrUX ou RUM válido para esta fixture local.

Referências oficiais:

- [Web Vitals — web.dev](https://web.dev/articles/vitals)
- [Como os limites de Core Web Vitals foram definidos — web.dev](https://web.dev/articles/defining-core-web-vitals-thresholds)
- [Lighthouse performance scoring — Chrome for Developers](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)

| Métrica | Alvo | Gate de produção |
|---|---:|---|
| LCP p75 | <= 2,5 s | mobile e desktop aprovados separadamente |
| INP p75 | <= 200 ms | mobile e desktop aprovados separadamente |
| CLS p75 | <= 0,1 | mobile e desktop aprovados separadamente |
| TTFB p75 | <= 0,8 s | alerta; investigar origem/CDN acima disso |
| Erros JS que impedem compra | 0 | bloqueante |

## Gate de laboratório

Executar no build de produção, com origem HTTPS/CDN representativa, três vezes por rota crítica; usar a mediana e reter os relatórios brutos.

| Rota/perfil | Score Lighthouse | LCP | TBT | CLS |
|---|---:|---:|---:|---:|
| Home mobile | >= 90 | <= 2,5 s | <= 200 ms | <= 0,1 |
| PLP mobile | >= 90 | <= 2,5 s | <= 200 ms | <= 0,1 |
| PDP mobile | >= 90 | <= 2,5 s | <= 200 ms | <= 0,1 |
| Sacola/checkout mobile | >= 90 | <= 2,5 s | <= 200 ms | <= 0,1 |
| Rotas críticas desktop | >= 95 | <= 2,0 s | <= 150 ms | <= 0,1 |

Um score isolado não substitui as métricas. Variação de máquina, rede, antivírus e execução do Chrome deve ser registrada.

## Budget de transferência e execução

Valores de bytes abaixo são comprimidos com gzip/Brotli, salvo quando indicado.

| Recurso | Alvo | Máximo para merge/release | Estado 2026-08-28 |
|---|---:|---:|---|
| JS inicial sem Three.js | <= 160 KiB | 180 KiB | ~158,9 KiB gzip estimado; no limite do alvo |
| Chunk opcional Three.js | <= 100 KiB | 130 KiB | 125,2 KiB gzip; alvo excedido, máximo respeitado |
| JS total com cena 3D | <= 260 KiB | 300 KiB | ~284,1 KiB gzip; alvo excedido |
| CSS total solicitado | <= 15 KiB | 20 KiB | <= 10,2 KiB gzip para todo CSS emitido |
| HTML inicial | <= 30 KiB | 50 KiB | ~6 KiB sem compressão local |
| Total first view mobile | <= 350 KiB | 450 KiB | requer medição em host comprimido; servidor local não comprime |
| Requisições first view | <= 30 | 40 | 27 sem o runtime Three; 28 no caminho normal |
| Imagem visual principal | <= 150 KiB | 250 KiB | não há imagem raster no caminho da Home atual |
| Social preview PNG/JPEG | <= 300 KiB | 500 KiB | `og.png` 331,2 KiB pós-otimização: hard gate passa, alvo ainda não |
| Long task individual | <= 50 ms | 100 ms | Lighthouse local não detectou long task; validar com WebGL real |

## Budget específico de movimento e 3D

- A experiência completa deve existir em HTML/CSS/SVG antes do JavaScript.
- Three.js só pode carregar quando a cena estiver próxima/na viewport e WebGL2 for aceito.
- `prefers-reduced-motion`, `prefers-reduced-data` e `navigator.connection.saveData` devem manter o SVG e não baixar o runtime 3D.
- Cena fora da viewport ou aba oculta deve ter loop suspenso.
- Mobile low: máximo 30 FPS, DPR 1,15 e duas fitas; medium: 45 FPS/DPR 1,5; high: 60 FPS/DPR 1,75.
- Nenhum efeito decorativo pode atrasar CTA, conteúdo, status de sacola ou handoff.
- O trace de release deve usar um aparelho Android intermediário real ou equivalente com GPU ativa; Lighthouse com GPU desabilitada não cobre custo de shader, compositor, bateria nem temperatura.

## Cache e entrega

- Assets com hash: `Cache-Control: public, max-age=31536000, immutable`.
- HTML/RSC: política curta e revalidação coerente com catálogo/estoque reais.
- Brotli ou gzip obrigatório para JS/CSS/SVG/HTML no host final.
- Imagens raster devem ter dimensões explícitas, formatos modernos no conteúdo e variantes responsivas.
- Não aprovar produção com o servidor local como prova de compressão/CDN.

## Automação recomendada

1. Build deve falhar se JS inicial ultrapassar 180 KiB gzip ou chunk Three ultrapassar 130 KiB gzip.
2. Lighthouse CI deve testar Home, PLP, PDP, sacola e checkout em três execuções mobile.
3. Playwright deve verificar que `reduced-motion` e `saveData` não requisitam `createEmberSmokeRuntime`.
4. RUM futuro deve coletar LCP/INP/CLS por rota, device class e release, com consentimento/retention definidos pela frente LGPD.
5. Regressão acima de 10% em qualquer métrica ou byte budget exige justificativa e aprovação de performance.
