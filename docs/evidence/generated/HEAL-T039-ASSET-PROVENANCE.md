# HEAL-T039 — provenance do asset da vareta

- Modo: ImageGen embutido, edição `background-extraction`.
- Alvo de edição: `site/public/images/heals/heal-incense-hero-v1.webp`.
- Pedido principal: isolar uma única vareta HEALS vertical, áspera, granular e
  irregular, preservar a pequena brasa, remover fumaça/cenário/texto e produzir
  fundo transparente para composição WebGL.
- Restrições: uma vareta; sem suporte, caixa, logo, texto ou watermark.
- Resultado bruto preservado em `HEAL-T039-stick-source.png`.
- O retorno trouxe checkerboard rasterizado. O fundo claro foi convertido em
  alpha e o conteúdo foi recortado para `site/public/images/heals/heal-incense-stick-v2-cropped.png`.
- O asset é uma representação visual gerada; não documenta especificação física
  nem prova fabricação/material real.

## Refinamento Full HD V3

- Referência: `site/public/images/heals/heal-incense-hero-v1.webp` e o primeiro
  recorte gerado nesta tarefa.
- Prompt final: criar exatamente uma vareta artesanal HEAL completa e vertical,
  longa e esbelta, com textura botânica áspera/granular, brasa pequena e detalhe
  macro; fundo realmente transparente; sem fumaça, suporte, caixa, mãos, texto,
  logo, cenário, segunda vareta ou watermark; destino 1080×1920.
- Fonte bruta preservada em `HEAL-T039-stick-fhd-source.png`.
- Como o retorno trouxe checkerboard rasterizado, o fundo claro foi convertido
  em alpha e o produto foi normalizado sem distorção. O recorte de trabalho
  320×1920 está em `heal-incense-stick-fhd-v3.png`; o asset integrado foi
  preenchido com espaço transparente para Full HD vertical real, 1080×1920, em
  `site/public/images/heals/heal-incense-stick-fhd-v4.png`.

## Refinamento Full HD V7

- Modo: ImageGen embutido, edição com referência visual e segunda passagem de
  extração de fundo.
- Prompt final: preservar uma única vareta artesanal longa e muito mais fina,
  com textura botânica prensada áspera em detalhe macro, brasa viva pequena e
  realista, corpo completo e reto; fundo realmente transparente; sem fumaça,
  suporte, caixa, mãos, texto, logo, cenário, segunda vareta ou watermark.
- O ImageGen entregou 941×1672 em RGB sobre fundo claro, apesar do pedido de
  alpha. A composição foi recortada de forma mecânica, recebeu alpha real,
  desmatte de borda e normalização Lanczos para Full HD vertical sem esticar o
  produto.
- Asset final integrado:
  `site/public/images/heals/heal-incense-stick-fhd-v7.png` — PNG RGBA,
  1080×1920, uma vareta com 108 px de largura útil máxima.
- O asset continua sendo conceito visual gerado; não prova dimensão, material,
  composição ou acabamento do produto físico final.
