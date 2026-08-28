# HEAL — Proveniência de assets

Atualizado em: 2026-08-28

## `heal-ritual-demo`

- Estado: `AI-generated / demonstration only`.
- Gerado com: ferramenta integrada ImageGen, em 2026-08-28.
- Uso permitido neste projeto: composição editorial demonstrativa na Home/coleções; não representa produto, embalagem ou ingrediente real da HEAL.
- Arquivo-fonte preservado fora do deploy: `docs/evidence/assets/heal-ritual-demo-source.png`.
- Derivados preservados: `docs/evidence/assets/heal-ritual-demo.avif` e `.webp`, 1536 px, produzidos localmente com Sharp.
- Texto visível obrigatório próximo ao uso: `DEMONSTRAÇÃO — dados e imagens ilustrativos` e/ou `Imagem demonstrativa` conforme o contexto.
- Exclusões: feed de produção, Merchant Center, schema factual de produto e qualquer alegação de autenticidade fotográfica de catálogo.
- Estado de publicação: removido de `site/public/` porque a Home final usa a cena Three/SVG; mantido apenas como evidência recuperável.

### Prompt final

```text
Use case: photorealistic-natural
Asset type: premium ecommerce editorial image for HEAL incense demo collection
Primary request: create one highly refined still-life photograph suggesting a contemporary incense ritual without depicting a real branded product or claiming real ingredients
Scene/backdrop: deep charcoal studio surface transitioning into warm mineral paper, restrained dark background
Subject: one slender unbranded incense stick held by a minimal dark ceramic holder, a tiny controlled red-orange ember, a delicate natural column of pale smoke, a small folded sheet of raw paper and three sparse abstract material fragments that cannot be mistaken for verified ingredients
Style/medium: photorealistic editorial product photography, quiet Brazilian contemporary design, tactile and documentary rather than mystical
Composition/framing: wide landscape composition, main subject in the right half, generous calm negative space, clear silhouette, usable at 3:2 and 4:5 crops
Lighting/mood: low side light, subtle warm ember, deep but detailed shadows, serene and precise
Color palette: charcoal #171411, mineral paper #F4F0E8, restrained ember #B73B1D, muted smoke
Materials/textures: matte ceramic, paper fiber, fine ash, natural wood grain only where physically plausible
Constraints: no packaging, no label, no brand name, no readable text, no logo, no watermark, no hands, no crystals, no moon, no stars, no mandala, no religious symbols, no medicinal or wellness imagery, no exaggerated fire, no dense theatrical smoke, no decorative clutter; this is an explicitly illustrative demo asset, not a photo of a real HEAL product
```

## `og.png`

- Estado: `AI-generated / branded social preview / demonstration only`.
- Gerado com: ferramenta integrada ImageGen, em 2026-08-28, por agente isolado de uma única geração.
- Arquivo-fonte preservado fora do Site: `C:\Users\PC\.codex\generated_images\01a048c4-893d-7b20-bf4f-c393f2ece93a\exec-3659426d-2e32-427a-a3f2-8fbd57a39d1a.png`.
- Derivado integrado: `site/public/og.png`, redimensionado para 1200×630 e otimizado em PNG indexado com Sharp; 339.141 bytes, dentro do hard budget de 500 KiB.
- Conteúdo visual: composição editorial `Tempo de Brasa`, com vareta de incenso, fumaça delicada e superfícies minerais; não representa embalagem, SKU, ingrediente ou condição comercial real.
- Texto visível: `HEAL. CURA.` e `Incensos para acender um intervalo.`
- Uso: preview social da experiência demonstrativa. A URL só entra nos metadados quando houver `SITE_ORIGIN` confiável.

### Prompt final

```text
Social preview landscape 1200x630, premium editorial identity for the Brazilian incense brand HEAL. CURA. Direction “Tempo de Brasa”: almost-black charcoal background, raw mineral paper, restrained ember red, sculptural photographic composition with one incense stick and one delicate line of smoke. No people, no invented package, no religious symbols, no therapeutic claims, no website mockup. Exact text only: “HEAL. CURA.” and “Incensos para acender um intervalo.” No other text. Legible editorial typography, generous safe margins and strong thumbnail readability.
```
