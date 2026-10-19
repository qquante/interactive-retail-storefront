# Handoff HEAL-33 — Frontend Design + UX/UI

Data: 2026-08-28  
Estado real: `auditoria read-only + especificação de build`; nenhum arquivo em `site/` foi alterado por HEAL-33.

## Resultado

A direção escolhida `Coreografia do ar` foi transformada em um contrato implementável para Home e propagação posterior para coleção/PDP. O contrato foi ampliado para os cinco aromas inaugurais dentro de um catálogo futuro de aproximadamente 50 tipos, público pessoal, terapeutas/práticas integrativas, espaços espirituais, lojas esotéricas e revenda.

Entrega principal:

- `docs/implementation/COREOGRAFIA_FRONTEND_BUILD_SPEC.md`

## Decisões consolidadas

- H1 da Home: `O ar deixa um rastro.`;
- primeira menção: `HEALS — os incensos da HEAL`;
- cinco variantes normativas: `CNL / LVC / MRR / OLB / ALC`;
- registro versionado aceita cerca de 50 produtos sem condicionais por aroma; Home destaca no máximo cinco;
- aroma domina; `incenso HEALS` descreve a categoria;
- SVG é autoritativo; Anime revela; Three é challenger restrito ao hero;
- coleção usa SVG/Anime, zero Three;
- PDP começa com inspector 2.5D e só mostra controles com frames correspondentes;
- toda arte existente de caixa continua `VISUAL CONCEITUAL` e restrita ao preview interno;
- comércio, preço, estoque, segurança e CTA nunca dependem de motion/canvas.
- storefront público não mostra linguagem de demonstração porque também não recebe fixture: produto incompleto permanece draft;
- Home inclui história HEAL e caminhos separados para uso pessoal, profissionais e revenda;
- espiritualidade e prática terapêutica são contextos de audiência/uso, nunca promessa de efeito;
- atenção ética proíbe mensagem subliminar, urgência/escassez falsas, scroll coercitivo, autoplay manipulativo, confirmshaming e opt-in pré-selecionado.

## Remoções principais da direção antiga

- `Acenda o intervalo`;
- hero Three em moldura retangular;
- `Duas portas para a mesma pausa`;
- `Intervalos 01/02/03` como narrativa;
- `Passaporte sensorial` numerado;
- Georgia/creme/carvão/brasa como assinatura visual dominante;
- seam genérico de brasa na Home.
- `Pulso / Véu / Nó / Arco / Ramo` inventados fora do contrato;
- PNG de família de ~2.4 MiB como LCP e fumaça genérica sobre o mockup.

`EmberCartFeedback` permanece, porque confirma um estado real. Os arquivos antigos só devem ser removidos depois de busca de consumidores e gates.

## Sequência recomendada

1. Wave 0: baseline + registro escalável + gate preview/produção.
2. Wave 1: Home estática completa, sem Anime/Three.
3. Wave 2: Anime.js cancelável + pausa/reduced.
4. Wave 3: Three challenger no hero.
5. Wave 4: coleção.
6. Wave 5: PDP 2.5D.
7. Wave 6: hardening e remoção de código morto.

## Bloqueios que não podem ser inventados

- dados reais de produto;
- composição/descrição olfativa;
- formato, quantidade, duração e fumaça;
- views reais separadas da embalagem;
- classificação/regulação e texto final de uso/segurança;
- preço/estoque/frete de produção.

## Gate imediato para o próximo owner

Implementar Wave 0 + Wave 1 e provar 320/390/1024/1440, teclado, sem JS, mídia ausente, catálogo sintético interno com 50 itens e axe antes de adicionar movimento. O site atual é uma fixture funcional; ela não pode ser publicada depois de apenas remover a palavra `Demonstração`. Esta especificação não representa implementação nem validação visual concluída.

## Nota de concorrência

Durante esta auditoria surgiram alterações paralelas em `site/app/page.tsx`, `site/app/globals.css` e `site/public/images`. HEAL-33 não tocou nesses arquivos. O diff observado ainda mantém hero em moldura, `EmberSmokeScene`, `EditorialSeamReveal`, copy não validada e o PNG de aproximadamente 2.4 MiB. O root foi avisado antes da consolidação.
