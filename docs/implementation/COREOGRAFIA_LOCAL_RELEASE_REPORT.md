# HEAL — Relatório de release local da Coreografia do ar

Data: 2026-08-28  
Estado: `verified local-only`  
Produção: `NO-GO` até verdade de produto, operação, device lab e autorização de deploy

## Entrega integrada

- masterbrand `HEAL` com símbolo H/passagem/rastro e lockup compacto;
- `HEALS — os incensos da HEAL` como arquitetura verbal de produto;
- Home editorial com hero realista de vareta, brasa e fumaça;
- Mapa do ar com cinco rastros SVG/Anime.js, seleção explícita e status acessível;
- runtime Three.js lazy que deriva a geometria dos mesmos paths, revela em até 900 ms, termina em frame estável e acompanha a seleção;
- controles de pausa e versão estática; fallbacks para reduced motion/data, `saveData`, WebGL2 ausente e context loss;
- cinco embalagens V3 conceituais, com aroma dominante, símbolo + HEAL pequeno e descritor `INCENSO HEALS`;
- coleção, PDP, busca, história, escolha, segurança, profissionais, contato e políticas em estado honesto de pré-lançamento;
- paginação por cursor preparada para catálogo acima dos cinco produtos inaugurais;
- preço, estoque, checkout e claims materiais não são exibidos enquanto faltarem dados aprovados.

## Semiótica e ética

Cor, contraste, repetição, trajetória, vazio e cadência constroem atenção visível. Hipnose, mensagem subliminar, numerologia oculta, urgência artificial e promessas médicas, financeiras ou espirituais não fazem parte da implementação. Hipóteses culturais ficam em documentação editorial, não em atributos comerciais do produto.

## Gates executados

| Gate | Resultado |
|---|---|
| ESLint | PASS |
| TypeScript `--noEmit` | PASS |
| Vitest unit/integration | 15/15 PASS |
| Vinext production build | PASS |
| Playwright cross-browser | 65 PASS; 3 skips intencionais do teste de context loss fora do Chromium desktop |
| Axe serious/critical | 0 nas rotas Home, coleção, PDP Canela e profissionais em todos os projetos executados |
| Viewports automatizados | Chromium desktop 1440, Chromium mobile 390, Firefox desktop 1440, WebKit desktop 1440 |
| Browser QA manual | Home e PDP inspecionadas; seleção Olíbano, nomenclatura, controles e imagens V3 confirmados |

O servidor Vinext de produção registrou `ERR_STREAM_UNABLE_TO_PIPE` quando navegações de teste cancelaram streams ainda abertos, mas nenhum request/assertion falhou e a suíte terminou com exit code 0. Isso é ruído do servidor de teste a acompanhar, não prova de erro de interface.

## Limites que permanecem reais

- os mockups não são arte-final, fotografia de produto nem rótulo regulatório;
- faltam composição, origem, fabricante, medidas, quantidade, queima, advertências e revisão regulatória por SKU;
- faltam preço, estoque, CNPJ, frete, atendimento, políticas finais, provider de commerce e checkout;
- faltam teste físico da embalagem/janela/barreira e validação do bastão real;
- faltam device lab Android/iPhone, trace GPU, três execuções Lighthouse em preview comprimido, teste moderado de compreensão e dados de campo;
- o chunk Three passa o hard gate documentado de 130 KiB gzip, mas permanece acima do alvo aspiracional de 100 KiB e gera aviso de chunk raw acima de 500 KiB;
- site continua `noindex` e sem deploy público autorizado.

## Assets e provenance

- hero: `docs/evidence/generated/heal-incense-hero-v1.png`;
- símbolo: `site/public/brand/heal-mark.svg` e `site/components/brand/HealMark.tsx`;
- embalagens V3: `docs/evidence/generated/packaging-v3/`;
- versões web: `site/public/images/heals/*-v3.webp`;
- prompts e limites: `docs/concepts/IMAGEGEN_PROVENANCE_PACKAGING_V3.md`;
- história/semiótica: `docs/brand/HEAL_BRAND_STORY_AND_SEMIOTICS.md`.
