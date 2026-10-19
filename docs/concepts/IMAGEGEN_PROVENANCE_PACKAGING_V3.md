# HEAL — Provenance dos mockups de embalagem V3

Data: 2026-08-28  
Ferramenta: ImageGen nativo do Codex  
Uso: exploração visual de product design e integração no protótipo local  
Estado: `concept-only`; não é arte-final, faca aprovada ou rótulo regulatório

## Objetivo da rodada

Corrigir a hierarquia das cinco caixas da direção `Coreografia do ar`:

1. símbolo HEAL como assinatura compacta;
2. `HEAL` pequeno, junto ao símbolo;
3. nome do aroma como informação dominante;
4. `INCENSO HEALS` como descritor de categoria;
5. bastões grossos, irregulares e ásperos, coerentes com a intenção do produto.

Nenhuma imagem contém alegação médica, financeira ou espiritual. Símbolos ocultos, `666`, notas de dinheiro e códigos de manipulação subliminar foram excluídos. Cor, ritmo, contraste, trajetória e repetição foram usados apenas como semiótica visual explícita.

## Prompt-base

```text
Use case: product-mockup
Asset type: corrected HEAL incense packaging concept for website product page
Input images: Image 1 is the edit target and must keep its exact product arrangement, camera, carton structure, original SKU palette and air-pattern grammar, rough incense rods, lighting and background. Image 2 is the exact HEAL symbol reference to place on the package.
Primary request: change only the masterbrand area on every clearly visible carton face in Image 1. Replace the small text-only HEAL wordmark with the symbol from Image 2 plus the tiny word "HEAL" underneath or beside it as one compact lockup. Make this lockup clearly smaller than the aroma name. Preserve the dominant aroma name "{AROMA}" verbatim and preserve the descriptor "INCENSO HEALS" verbatim below it.
Composition/framing: preserve Image 1 exactly.
Style/medium: photorealistic premium packaging mockup, physically plausible print.
Text (verbatim): "HEAL", "{AROMA}", "INCENSO HEALS".
Constraints: only correct the visible branding hierarchy; one small symbol-plus-HEAL lockup per relevant visible front panel; {AROMA} remains the largest text; INCENSO HEALS remains small; preserve package geometry, window, rods, dieline, material, shadows, color and background; no new claims; no extra symbols; no watermark.
Avoid: a large HEAL wordmark; HEALS as a second logo; changing the aroma name; changing the rough Brazilian-style incense rods; adding spiritual, money, medical or occult icons; 666; redesigning the whole scene.
```

Cada geração substituiu `{AROMA}` pelo nome exato e usou como referências o mockup V2 correspondente e `docs/evidence/generated/heal-mark-reference.png`. As cinco variações foram geradas em chamadas separadas para preservar distinção e rastreabilidade.

## Saídas autoritativas

| Aroma | PNG de evidência | WebP integrado ao site |
|---|---|---|
| Canela | `docs/evidence/generated/packaging-v3/canela-v3.png` | `site/public/images/heals/canela-v3.webp` |
| Lavanda Celestial | `docs/evidence/generated/packaging-v3/lavanda-celestial-v3.png` | `site/public/images/heals/lavanda-celestial-v3.webp` |
| Mirra | `docs/evidence/generated/packaging-v3/mirra-v3.png` | `site/public/images/heals/mirra-v3.webp` |
| Olíbano | `docs/evidence/generated/packaging-v3/olibano-v3.png` | `site/public/images/heals/olibano-v3.webp` |
| Alecrim | `docs/evidence/generated/packaging-v3/alecrim-v3.png` | `site/public/images/heals/alecrim-v3.webp` |

## Limites antes da arte-final

- validar medidas, quantidade, composição, origem, advertências e fabricante;
- validar janela, pouch/barreira e desprendimento de partículas com amostras físicas;
- redesenhar toda tipografia e microcopy como vetor, sem reaproveitar microtexto gerado;
- realizar preflight de impressão, contraste, leitura, código de barras e requisitos regulatórios;
- substituir mockups por fotografias do produto físico antes de publicar venda ou schema de produto.
