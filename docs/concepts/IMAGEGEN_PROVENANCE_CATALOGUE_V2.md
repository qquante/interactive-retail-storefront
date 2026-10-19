# HEAL — proveniência das imagens de catálogo V2

Data: 2026-09-26. Estado: integrado, validado localmente e publicado em audiência privada; recibo em `docs/evidence/qa/catalogue-v2/PUBLICATION.md`. Isso não ativa operação comercial.

## Decisão

O usuário aprovou a direção fotográfica e pediu avanço dos cinco aromas usando as varetas Nirvana como referência material. Mantivemos as cinco embalagens HEAL V3, não a embalagem concorrente. Esta rodada não modifica Hero, fumaça, dez cores, variantes nem velocidade.

## Referência observada

- [Nirvana Incensos](https://nirvanaincenso.com.br/).
- [Premium Canela](https://nirvanaincenso.com.br/products/hb65762k5).
- [Tradicional Essencial Canela](https://nirvanaincenso.com.br/products/incenso-tradicional-essencial-canela).
- Imagem oficial consultada: https://nirvanaincenso.com.br/cdn/shop/files/nirvana_site_premium-canela.png?v=1751486222&width=3840
- Cópia para referência interna: `docs/evidence/references/nirvana-20260926/premium-canela.png`. Não publicada no site.

A foto oficial mostra uma superfície vegetal seca e fibrosa pela janela da caixa; não fornece medidas físicas verificáveis. Composição, quantidade e promessas da concorrente não foram transferidas para HEAL.

## Processo e arquivos

ImageGen nativo, com uma primeira geração e um reparo localizado para cada aroma. Preservados nome, cartucho, janela, gramática gráfica, símbolo e cores V3. O reparo tornou o revestimento menos escuro/metálico e recuperou o ponto âmbar do símbolo.

- Primeira rodada: `docs/evidence/generated/catalogue-v2/<id>.png`.
- Originais finais: `docs/evidence/generated/catalogue-v2/final/<id>.png`.
- Uso na aplicação: `site/public/images/heals/catalogue-v2/<id>.webp`.
- Resolução nativa: **1122 × 1402 px**. Não afirmar 4K ou Full HD.
- WebP qualidade 88, esforço 6, sem ampliação nem mudança de proporção.
- Imagens geradas para apresentação; não fotografias documentais de produtos fabricados.

| Aroma/id | Arquivo nativo final | WebP bytes |
|---|---|---:|
| canela | exec-5bb11e09-83b3-4b80-ab2f-e86c1dcad881.png | 101900 |
| lavanda-celestial | exec-e30387bf-eda3-40f2-a167-89ccf3690c42.png | 106288 |
| mirra | exec-cff68f22-90f6-4cd3-bec4-5adc443058be.png | 95740 |
| olibano | exec-88af9510-f2a8-4355-b653-0cf52823a6df.png | 91316 |
| alecrim | exec-a2e133a4-299d-47f6-b49c-813777208d70.png | 104890 |

Os arquivos nativos acima vieram de `C:/Users/PC/.codex/generated_images/01a0488d-cf9d-7893-9f83-08c3f31eb2d3/`.

## QA e limites

Inspeção visual do coordenador e revisão independente. Nomes/acento de OLÍBANO preservados. Catálogo, cinco PDPs e produtos da Home usam um único manifesto. Enquadramento 4:5 com `contain` explícito para evitar corte imposto inline pelo runtime. Sem zoom de hover.

- 22/22 testes de componentes/integração; TypeScript e ESLint focado aprovados.
- Build aprovado; E2E focado desktop/mobile 2/2.
- Probe Chromium 28/28 em 320, 390, 768 e 1440 px: 60 ocorrências de imagem carregadas, sem overflow horizontal de página, sem erros de página/console.
- Evidência reproduzível e 14 capturas: `docs/evidence/qa/catalogue-v2/README.md`.
- Não houve execução completa da suíte cross-browser, auditoria nova de performance ou validação da fumaça nesta rodada.
- Limite visual persistente: as varetas dentro de algumas janelas parecem mais grossas que a vareta solta; textura ainda mais graúda que a referência. Não declarar réplica física exata. A próxima revisão depende do aceite visual do usuário e, idealmente, de foto/amostra real HEAL.
- Comércio continua em preparação, sem pagamento ativo. Não remover `noindex` nem inventar preço/estoque para publicar uma apresentação.

## Prompts utilizados

### Primeira rodada — canela

```text
Use case: precise-object-edit. Asset: HEAL CANELA ecommerce photo, revised physical realism.
Image 1 is the approved HEAL Canela photograph and is the EDIT TARGET. Image 2 is a real Nirvana Premium product, REFERENCE ONLY for the fine, dry, fibrous, herb-coated incense texture seen inside its window. Never copy Nirvana branding, text, packaging or color system.

Improve Image 1 while keeping its single closed terracotta HEAL carton, exact small HEAL symbol, CANELA typography, INCENSO HEALS descriptor, leaf/flame window, delicate line artwork, camera angle and quiet arrangement. Preserve identity; no new design.
Main correction: the loose incense stick currently looks too thick and studded like a cigar coated with curled seeds. Replace it with a convincingly slender but visibly rough natural Brazilian-style incense rod: cylindrical dark earthy-brown core, closely adhering irregular fine tan/ochre ground botanical flecks, dry matte surface, tiny uneven silhouette, NOT huge curls or uniform seed sprinkles. Ratio of visible length to average coated diameter about 30–35:1. Short bare bamboo handle 12–15% of total length. Some subtle variation along the shaft; no glossy coating. Keep the loose stick lying in foreground, entirely visible, and make the sticks inside the box window match its plausible fine rough texture. Do not add claims or numeric product dimensions.
Refine photo realism: subtle matte terracotta paper grain rather than embossed leather, physically folded closed carton, accurate contact shadow, soft neutral diffused studio light with gentle side definition; neutral warm ivory/stone seamless backdrop, no heavy orange filter, no plastic or CGI shine. All product lettering and full rod sharp.
Maintain one carton and one unlit rod only. Box fills approximately 74–78% of image height; leave clear headroom/footroom and crop safety. Portrait 4:5 composition, highest native resolution possible. Exact text only: "HEAL", "CANELA", "INCENSO HEALS".
Avoid changes to HEAL mark, spelling, color identity, window or graphics; no unfolded dieline, accessories, ingredients, smoke, burning tip, extra products, decorative flowers, water, sparks, gradients of neon light, seals, quantity, price or watermark.
```

### Primeira rodada — lavanda-celestial

```text
Use case: precise-object-edit / product-mockup.
Asset: premium HEAL LAVANDA CELESTIAL ecommerce packshot.
Image 1 is the EDIT TARGET and exact packaging identity reference. Image 2 is the approved Canela photograph, reference only for shared photography, camera angle, background, framing, closed carton and loose incense proportions. Image 3 is Nirvana Premium, reference ONLY for the fine dry irregular herb-coated incense material inside the window. Never copy Nirvana packaging, brand or text.

Create a standalone photograph of exactly ONE fully assembled CLOSED LAVANDA CELESTIAL carton and ONE unlit incense stick lying naturally in the foreground. Remove unfolded dieline, duplicate boxes and extra exterior rods from Image 1. Keep the LAVANDA CELESTIAL package design faithfully: deep muted violet matte paper, pale ivory delicate sweeping curved lines, long organic leaf-shaped window in the lower front, large elegant condensed serif name on exactly two lines LAVANDA / CELESTIAL, small existing HEAL emblem above. Preserve original front hierarchy, window shape, artwork, symbol silhouette and all brand typography. Do not recolor Canela or borrow Canela graphics; this aroma has its own existing design.
Exact text: "HEAL", "LAVANDA CELESTIAL", "INCENSO HEALS". No other text, seals, weight, quantities or claims. The HEAL lockup stays small; the aroma name stays dominant.

Match Image 2's photographic language: subtle three-quarter near-frontal view with a small visible left face; same product scale and single-stick foreground composition; warm neutral ivory/stone seamless background and matte surface; soft neutral studio key light upper left, restrained realistic contact shadow, 85mm product-lens perspective, full product sharp. Tall narrow cardboard box fills around 76% height with breathing room, completely in frame, physically plausible flat CLOSED top and folds. Keep matte paper grain subtle, no leather surface, plastic, invented foil or CGI shine.
Incense material must be realistic: slender but visibly rough dark brown rod with close-fitting uneven fine tan/ochre botanical flecks, dry fibrous surface and irregular edge. No giant curls, uniform seeds or cigar thickness. Length to coated diameter approximately 30–35:1, short bare bamboo handle around 12–15% total length. Match this texture in the window as well; rod in foreground entirely visible. Reference is visual, do not write dimensions or formulas.
Portrait 4:5. Highest possible native detail. No cropping of box or rod. No props, flowers, resins or ingredients, smoke, flame, sparks, incense holder, people, unfolded layouts, watermark or extra objects. Must read as restrained professional product photography, not fantasy concept art.
```

### Primeira rodada — mirra

```text
Use case: precise-object-edit / product-mockup.
Asset: premium HEAL MIRRA ecommerce packshot.
Image 1 is the EDIT TARGET and exact packaging identity reference. Image 2 is the approved Canela photograph, reference only for shared photography, camera angle, background, framing, closed carton and loose incense proportions. Image 3 is Nirvana Premium, reference ONLY for the fine dry irregular herb-coated incense material inside the window. Never copy Nirvana packaging, brand or text.

Create a standalone photograph of exactly ONE fully assembled CLOSED MIRRA carton and ONE unlit incense stick lying naturally in the foreground. Remove unfolded dieline, duplicate boxes and extra exterior rods from Image 1. Keep the MIRRA package design faithfully: deep wine-brown matte paper, broad muted copper-rose interlacing curves integrated with the lower organic window, tall narrow warm ivory serif MIRRA lettering, small existing HEAL emblem above. Preserve original front hierarchy, window shape, artwork, symbol silhouette and all brand typography. Do not recolor Canela or borrow Canela graphics; this aroma has its own existing design.
Exact text: "HEAL", "MIRRA", "INCENSO HEALS". No other text, seals, weight, quantities or claims. The HEAL lockup stays small; the aroma name stays dominant.

Match Image 2's photographic language: subtle three-quarter near-frontal view with a small visible left face; same product scale and single-stick foreground composition; warm neutral ivory/stone seamless background and matte surface; soft neutral studio key light upper left, restrained realistic contact shadow, 85mm product-lens perspective, full product sharp. Tall narrow cardboard box fills around 76% height with breathing room, completely in frame, physically plausible flat CLOSED top and folds. Keep matte paper grain subtle, no leather surface, plastic, invented foil or CGI shine.
Incense material must be realistic: slender but visibly rough dark brown rod with close-fitting uneven fine tan/ochre botanical flecks, dry fibrous surface and irregular edge. No giant curls, uniform seeds or cigar thickness. Length to coated diameter approximately 30–35:1, short bare bamboo handle around 12–15% total length. Match this texture in the window as well; rod in foreground entirely visible. Reference is visual, do not write dimensions or formulas.
Portrait 4:5. Highest possible native detail. No cropping of box or rod. No props, flowers, resins or ingredients, smoke, flame, sparks, incense holder, people, unfolded layouts, watermark or extra objects. Must read as restrained professional product photography, not fantasy concept art.
```

### Primeira rodada — olibano

```text
Use case: precise-object-edit / product-mockup.
Asset: premium HEAL OLÍBANO ecommerce packshot.
Image 1 is the EDIT TARGET and exact packaging identity reference. Image 2 is the approved Canela photograph, reference only for shared photography, camera angle, background, framing, closed carton and loose incense proportions. Image 3 is Nirvana Premium, reference ONLY for fine dry irregular herb-coated incense material inside its window. Never copy Nirvana packaging, brand or text.

Create a standalone photograph of exactly ONE fully assembled CLOSED OLÍBANO carton and ONE unlit incense stick lying naturally in the foreground. Remove unfolded dieline, duplicate boxes and extra exterior rods from Image 1. Keep the OLÍBANO package design faithfully: warm ivory matte paper, fine restrained ochre-gold lines forming tall rounded vertical arches, elegant tall very narrow serif OLÍBANO name WITH THE ACUTE ACCENT ON Í, a long organic curved window on the right lower front, small existing HEAL emblem above. Preserve original front hierarchy, window shape, artwork, symbol silhouette and all brand typography. Do not recolor Canela or borrow Canela graphics; this aroma has its own existing design.
Exact text: "HEAL", "OLÍBANO", "INCENSO HEALS". No other text, seals, weight, quantities or claims. HEAL lockup stays small; aroma name stays dominant.

Match Image 2's photographic language: subtle three-quarter near-frontal view with a small visible left face; same product scale and single-stick foreground composition; warm neutral ivory/stone seamless background and matte surface; soft neutral studio key light upper left, restrained realistic contact shadow, 85mm product-lens perspective, full product sharp. Tall narrow cardboard box fills around 76% height with breathing room, completely in frame, physically plausible flat CLOSED top and folds. Matte paper with subtle fine grain, not visibly embossed leather; no plastic or invented shiny foil. For the ivory Olíbano box, define edges through gentle tonal separation, no outlines or harsh lighting.
Incense material must be realistic: slender but visibly rough dark earthy brown rod with close-fitting uneven fine tan/ochre botanical flecks, dry fibrous surface and irregular edge. No giant curls, uniform seeds or cigar thickness. Length to coated diameter approximately 30–35:1, short bare bamboo handle around 12–15% total length. Match this texture in the window as well; rod in foreground entirely visible. Reference is visual, do not write dimensions or formulas.
Portrait 4:5. Highest possible native detail. No cropping of box or rod. No props, flowers, resins or ingredients, smoke, flame, sparks, incense holder, people, unfolded layouts, watermark or extra objects. Must read as restrained professional product photography, not fantasy concept art.
```

### Primeira rodada — alecrim

```text
Use case: precise-object-edit / product-mockup.
Asset: premium HEAL ALECRIM ecommerce packshot.
Image 1 is the EDIT TARGET and exact packaging identity reference. Image 2 is the approved Canela photograph, reference only for shared photography, camera angle, background, framing, closed carton and loose incense proportions. Image 3 is Nirvana Premium, reference ONLY for fine dry irregular herb-coated incense material inside its window. Never copy Nirvana packaging, brand or text.

Create a standalone photograph of exactly ONE fully assembled CLOSED ALECRIM carton and ONE unlit incense stick lying naturally in the foreground. Remove unfolded dieline, duplicate boxes and extra exterior rods from Image 1. Keep the ALECRIM package design faithfully: deep forest green matte paper, angular branching sage/olive-green artwork across the lower face, narrow tall ivory sans-serif ALECRIM lettering, organic leaf-shaped window in the lower front, small existing HEAL emblem above. Preserve original front hierarchy, window shape, artwork, symbol silhouette and all brand typography. Do not recolor Canela or borrow Canela graphics; this aroma has its own existing design.
Exact text: "HEAL", "ALECRIM", "INCENSO HEALS". No other text, seals, weight, quantities or claims. HEAL lockup stays small; aroma name stays dominant.

Match Image 2's photographic language: subtle three-quarter near-frontal view with a small visible left face; same product scale and single-stick foreground composition; warm neutral ivory/stone seamless background and matte surface; soft neutral studio key light upper left, restrained realistic contact shadow, 85mm product-lens perspective, full product sharp. Tall narrow cardboard box fills around 76% height with breathing room, completely in frame, physically plausible flat CLOSED top and folds. Matte paper with subtle fine grain, not visibly embossed leather; no plastic or invented shiny foil. For the ivory Olíbano box, define edges through gentle tonal separation, no outlines or harsh lighting.
Incense material must be realistic: slender but visibly rough dark earthy brown rod with close-fitting uneven fine tan/ochre botanical flecks, dry fibrous surface and irregular edge. No giant curls, uniform seeds or cigar thickness. Length to coated diameter approximately 30–35:1, short bare bamboo handle around 12–15% total length. Match this texture in the window as well; rod in foreground entirely visible. Reference is visual, do not write dimensions or formulas.
Portrait 4:5. Highest possible native detail. No cropping of box or rod. No props, flowers, resins or ingredients, smoke, flame, sparks, incense holder, people, unfolded layouts, watermark or extra objects. Must read as restrained professional product photography, not fantasy concept art.
```

### Reparo final — aplicado aos cinco aromas

Referências: (1) primeira imagem de cada HEAL, (2) foto Nirvana para matéria apenas, (3) símbolo HEAL existente para o ponto/brasa.

```text
Use case: precise-object-edit. Finish an existing HEAL catalogue photograph with highly localized corrections.
Image 1 EDIT TARGET: preserve exactly the photograph, closed carton geometry, color, all typography, window outline, printed line graphics, camera, background, light, shadow and arrangement. Do not redesign.
Image 2 MATERIAL REFERENCE ONLY: real Nirvana Premium product; inspect the fine light dry herbal texture visible inside its window. Never transfer its packaging/text/logo.
Image 3 EXACT HEAL EMBLEM: preserve its arch, branching central smoke line, and clearly defined filled circular ember at the lower tip. On our carton the linework remains its existing light-ink color; the ember is a small warm copper/amber dot. Keep emblem size/location and HEAL wordmark unchanged.

Correct ALL incense rods, including the foreground rod and every rod visible through the box window:
- The current material resembles a dark cigar with large gold seeds. Replace it with a natural dry fibrous incense coating, matte earthy medium brown/ochre with dense tiny irregular tan vegetal crumbs and fine fibers. No glossy black mass, large bright curls, gold seed chips or uniformly repeated sprinkles. Match the dry lighter fiber texture in Image 2 without copying its label.
- Rods inside the window must have the SAME physical thickness as the foreground rod; because they are farther from camera their apparent diameter should be slightly smaller, never twice as thick. Use more narrow parallel shafts if necessary to fill the existing window, without changing its outline. Foreground rod remains slender but noticeably rough, approximately30:1 length to coated diameter, with short exposed bamboo handle.
- Keep the rod fully visible and unlit.
Restore the small circular amber ember dot if missing from the HEAL symbol, matching Image3, with no other logo changes.
Remove any artificial embossed swirl texture in cardboard; use very subtle fine matte paper fiber instead, preserving printed artwork.
These are local material/logo corrections only. Preserve all exact aroma text and INCENSO HEALS. Same portrait4:5 crop and resolution; no extra objects, smoke, claims or text.
```
