# HEAL — aprovação fotográfica 01: Canela

Data: 2026-09-26
Estado: direção aprovada pelo usuário em 2026-09-26; original arquivado
Escopo: primeira foto principal; nenhuma alteração na aplicação ou na animação.

Atualização: a autorização seguinte avançou os cinco aromas. A imagem deste documento foi refinada/substituída no catálogo V2. Estado, prompts e QA atuais estão em `IMAGEGEN_PROVENANCE_CATALOGUE_V2.md`; as restrições de sequência abaixo descrevem apenas a entrega original.

## Pedido e limite desta etapa

Produzir imagens de Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim preservando suas caixas e o tipo de vareta, por partes com inspeção e aprovação.
Esta entrega contém somente Canela; os outros quatro aromas não foram produzidos nesta nova direção.

## Arquivos e proveniência

- Imagem: `docs/evidence/generated/catalogue-v1/canela-packshot-01.png`.
- Verificação de escala: `docs/evidence/generated/catalogue-v1/canela-scale-qa.png`.
- Ferramenta: ImageGen nativo; sem CLI/API alternativa.
- Origem: `C:/Users/PC/.codex/generated_images/01a0488d-cf9d-7893-9f83-08c3f31eb2d3/exec-cdf5189c-6214-458d-8ef5-c4a73289f26d.png`.
- Resolução real: 1122 × 1402 px, PNG RGB sRGB. A resolução maior solicitada no prompt não foi atendida; não declarar 4K ou Full HD.
- SHA-256: `D7DAD8E1B9529AE78E3126A3A0261379BD9599ACE0BAEDBD6B8088D7ABBF6F26`.
- Imagem gerada para apresentação e aprovação; não fotografia documental do produto físico.
- Não substitui assets em `site/public`; não integrada à vitrine.

## Referências

1. `site/public/images/heals/canela-v3.webp`: identidade da caixa.
2. `site/public/images/heals/heal-incense-stick-fhd-v7.png`: textura/tipo da vareta, não a combustão.
3. `docs/evidence/generated/heal-mark-reference.png`: símbolo existente.

A V3 integrada prevalece sobre a hipótese antiga de caixa sem janela.
Preservados terracota, cartucho estreito, nome condensado, janela orgânica, linhas finas, símbolo pequeno e INCENSO HEALS.
Composição nova: caixa fechada e uma vareta apagada, fundo claro neutro e luz suave. Sem faca aberta, adereços ou dados inventados.

## QA executado

- Inspeção visual pelo coordenador e revisão independente de photo_asset_audit.
- Textos HEAL, CANELA e INCENSO HEALS corretos.
- Identidade, janela, material e tipo de vareta coerentes com V3.
- Caixa e vareta inteiras; sem deformação evidente de geometria ou sombra.
- Navegador isolado: decodificação e renderização a 160 e 320 px verificadas.
- Canela reconhecível nas duas escalas; descritor da embalagem fica pequeno. Repetir nome e categoria em HTML.
- Nenhum reparo obrigatório identificado antes de mostrar ao usuário.

## Limites e próximo passo

- Manter enquadramento completo próximo de 4:5; center-crop quadrado cortaria caixa/vareta.
- Linhas e dobra da tampa não reproduzem a referência pixel a pixel.
- A perspectiva não comprova dimensões físicas.
- Aguardar aprovação de cor, luz e apresentação antes de produzir Lavanda Celestial.
- Depois, Mirra, Olíbano e Alecrim, cada um com sua arte V3 e aceite próprio.
- Fotos secundárias e integração no site são etapas posteriores. Motion permanece inalterado.

## Prompt final utilizado

```text
Use case: precise-object-edit / product-mockup.
Asset type: HEAL Canela premium ecommerce catalogue photograph, first approval proof.

Input images:
Image 1 is the existing HEAL CANELA V3 package design, the identity reference and edit target. Preserve this exact product identity, do not design a new package.
Image 2 is a close reference for the coarse granular rough brown incense material; use its material only, not its glowing burning tip or its black background.
Image 3 is the exact HEAL symbol reference. Preserve its silhouette; on the package it is printed in the same warm ivory ink as the existing lockup, not black.

Primary request: Rephotograph the SAME Canela product as a clean standalone premium studio packshot. Show exactly one fully assembled CLOSED tall narrow rectangular carton and exactly one unlit coarse incense stick lying naturally on the surface in the foreground, fully visible. Remove the unfolded packaging/dieline and all other duplicate packages from the original scene. This is an approval mockup, not a redesign.

Packaging invariants: preserve the terracotta/mineral burnt-red matte paper surface, tall narrow proportions, small ivory symbol with small HEAL wordmark underneath, large narrow condensed ivory CANELA lettering below it, smaller INCENSO HEALS descriptor, delicate ivory curved diagonal parallel-line artwork and the long organic leaf/flame-shaped cut-out window on the lower right front, revealing several coarse dark-brown incense rods inside. Preserve front hierarchy and positioning faithfully. The carton is closed at the top with plausible folded paperboard seams; no sticks protrude. No invented capacity, weight, barcodes, slogans or extra text.

Exact visible text: "HEAL", "CANELA", "INCENSO HEALS". Render spelling exactly. Do not make HEALS a second logo. No other legible text.

Incense invariant: thick rough irregular dark brown granular-coated rod with warm brown natural fragments and a short exposed pale bamboo handle, matching the rods in Image 1, not a thin smooth conventional joss stick, not a cinnamon bark stick, no glowing tip.

Photographic direction: photorealistic luxury product photography, warm pale stone/ivory seamless studio background and matte surface, a soft large key light from upper left, restrained realistic contact shadow, natural paper grain, sharp crisp printed type, physically credible edges and folds, no exaggerated gold or glossy plastic. Camera near front at a subtle three-quarter angle showing front and a small amount of left side, minimal perspective distortion, 85mm product-lens character, entire package and stick in focus. Frame vertically at 4:5, highest available native resolution, ideally 2048x2560. Product fills about 75% of image height with clean breathing room; complete package and stick inside frame, never cropped. Quiet, intentional composition useful both as full-size catalogue photograph and small mobile thumbnail.
Avoid: unfolded template, open carton, extra boxes, extra sticks outside the box, burning incense, smoke, sparks, rainbow, mystical props, ingredients, pedestals, fabric, flowers, water, extra typography, changed logo, fake seals, warped text, cinematic haze, heavy vignette, watermark.
```
