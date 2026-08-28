# HEAL. CURA. — Direções visuais

Data: 2026-08-28  
Owner: HEAL-07  
Estado real: `direções propostas — sem teste com usuários, catálogo ou fotografia real`  
Base: posicionamento, funil, sitemap, wireframes, benchmarks e ADR-001.

## Premissa comum

As três direções devem comunicar, antes de qualquer efeito, que a HEAL vende incensos. Produto, nome, família aromática, descritores, preço, disponibilidade, frete, uso, segurança e CTA permanecem em HTML e no primeiro plano. Fumaça, brasa e matéria dão ritmo e memória; não escondem comércio.

Todo produto, preço, composição, origem, escala de intensidade/fumaça e fotografia ainda inexistente deve aparecer como `DEMONSTRAÇÃO`, `CONCEITO` ou `[A VALIDAR]`. As imagens descritas abaixo são briefings para futura produção autoral, não assets existentes.

### Critérios de comparação

1. Categoria reconhecível em cinco segundos.
2. Distintividade sem esoterismo, spa clínico ou “luxo bege”.
3. Prioridade visual: produto e compra → prova → atmosfera.
4. Contraste WCAG 2.2 AA, foco visível e leitura a 320 CSS px.
5. Reprodução coerente em Home, coleção, PDP, carrinho e handoff.
6. Funcionar com imagem ausente, sem motion, sem WebGL e com `prefers-reduced-motion`.
7. Permitir fotografia real futura sem fazer a interface depender de um estilo impossível de produzir.

---

## Direção A — Tempo de Brasa

### Tese

O ritual é uma mudança de estado: matéria escura, um ponto de calor, cinza clara. A interface alterna **zonas de atmosfera escuras** e **zonas de prova claras**. O contraste é a assinatura; a brasa aparece somente onde há ação ou mudança real.

### Sensação

- serena, concentrada, tátil e contemporânea;
- premium por edição, contraste e detalhe, não por dourado ou excesso de vazio;
- “calma ativa”: o olho sempre sabe onde ler e agir.

### Grid e composição

- Desktop: container máximo de `1440px`, margens fluidas `32–80px`, grade de 12 colunas, gutter `24px`.
- Conteúdo comercial principal ocupa 7–8 colunas; assinatura sensorial, 4–5.
- Mobile: uma coluna, margem `16px` em 320–390 e `20px` em 430; gap base `16px`.
- Ritmo vertical deliberado: blocos de produto densos intercalados com pausas editoriais; nunca um hero de tela inteira antes do catálogo.
- Bordas e alinhamentos são retos; curvas aparecem apenas na trajetória da fumaça e no detalhe da brasa.

### Tipografia

- Display candidato: `Newsreader Variable`, self-hosted após guardar licença; fallback `Georgia, "Times New Roman", serif`.
- UI/texto candidato: `IBM Plex Sans`, self-hosted; fallback `"Segoe UI", Arial, sans-serif`.
- O contraste serif/sans separa atmosfera de prova: serif em H1/H2/editorial; sans em preço, ficha, filtros, CTA e políticas.
- Números de preço usam algarismos tabulares quando disponíveis. Nunca usar caixa alta longa.

### Paleta candidata

- carvão `#171411`;
- papel mineral `#F4F0E8`;
- branco de prova `#FFFDFC`;
- brasa `#B73B1D`;
- cinza de fumaça `#C9C1B5`;
- musgo seco `#4E5C4B`;
- azul de foco `#145DA0`.

A brasa ocupa no máximo cerca de 5% da superfície visível e não é usada como cor decorativa de fundo. Zonas escuras recebem texto mineral; áreas comerciais são predominantemente claras.

### Forma, material e imagem

- Formas: cortes horizontais, linhas finas, recortes verticais inspirados em vareta e coluna de fumaça.
- Materiais: carvão, cerâmica escura, papel cru, cinza e resina somente quando correspondem a produto real.
- Fotografia futura: macro documental da brasa e da matéria; luz lateral; fundo profundo; uma foto de escala/contexto por produto; nenhuma fumaça artificialmente densa.
- Placeholder: bloco tonal com silhueta abstrata de vareta/embalagem, rótulo visível `Imagem demonstrativa`; nunca foto genérica vendida como produto.

### Iconografia e componentes

- Ícones lineares de 1.5px, terminações retas e áreas de toque 44px; ícone sempre acompanhado de rótulo quando a ação não for universal.
- Produto card claro, imagem com proporção fixa, família/descritores antes do preço, intensidade e fumaça em texto + 3 marcas discretas, nunca só por cor.
- Botão primário carvão sobre papel; no hero escuro, botão mineral com texto carvão. Brasa fica para foco de seleção, status e microfeedback.
- Accordions e tabelas usam linhas, não caixas arredondadas empilhadas.

### Movimento e Three.js

- Uma linha de fumaça sobe, perde contraste e conecta hero a primeira escolha; ela marca passagem, não segue cursor.
- A brasa responde por 160–220ms ao `add_to_cart`; não atrasa confirmação nem substitui texto anunciado.
- Three.js pode ocupar a metade sensorial do hero; fallback SVG conserva vareta, brasa e uma única curva.
- Reduced motion mostra composição estática completa.

### Desktop e mobile

- Desktop: hero 7/5, primeiro card comercial ainda visível acima ou imediatamente após a dobra.
- Mobile: título e dois CTAs vêm antes do visual; assinatura sensorial limitada a `220–300px` de altura.
- PDP abandona fundo escuro na área de decisão: galeria e compra ficam em papel mineral; apenas o bloco “Como perceber” retoma o carvão.
- Carrinho e handoff são claros, austeros e sem WebGL.

### Risco e mitigação

- Risco: atmosfera escura parecer perfumaria masculina ou esconder o produto.
- Mitigação: categoria explícita, papel mineral dominante nas rotas de commerce, fotografia factual e brasa restrita.

---

## Direção B — Atlas da Matéria

### Tese

A HEAL se comporta como um **arquivo vivo de materiais**. Cada produto é apresentado como espécime documentado: imagem, nome comum, família, composição, origem, escala e cuidado. A emoção nasce da proximidade visual com a matéria e da honestidade do registro.

### Sensação

- diurna, artesanal sem folclore, curiosa e confiável;
- mais tátil e humana que cinematográfica;
- premium pela qualidade documental e sistema comparável.

### Grid e composição

- Desktop: container `1320px`, grade de 10 colunas; coluna lateral de índices e 6–7 colunas para espécimes.
- Cards variam entre prancha vertical e faixa horizontal; alinhamento rigoroso evita collage.
- Mobile: uma coluna; índice vira chips quebráveis; ficha sempre segue a mesma ordem.
- Linhas, legendas e números de referência estruturam a página como atlas, sem imitar museu ou laboratório.

### Tipografia

- Principal candidata: `Source Sans 3 Variable`, self-hosted; fallback `"Segoe UI", Arial, sans-serif`.
- Editorial candidata: `Source Serif 4 Variable`, self-hosted; fallback `Georgia, serif`.
- Metadados: mesma sans em `font-variant-numeric: tabular-nums`; evitar uma terceira fonte mono no MVP.

### Paleta candidata

- fibra `#F1EBDD`;
- grafite `#24231F`;
- argila `#9E4E35`;
- líquen `#65705B`;
- resina `#B77A24` somente como marcador;
- linha `#CAC0AE`;
- branco `#FFFDF8`.

Não é “bege luxury”: a identidade depende de indexação, cor mineral assertiva, macro real e densidade informacional.

### Forma, material e imagem

- Formas retangulares, abas de arquivo, recortes de papel e círculos somente para amostras/escala.
- Fotografia futura: vista superior de ingredientes reais, corte da vareta, embalagem aberta, cinza resultante e escala por mão/objeto conhecido.
- Cada macro recebe legenda factual e provenance; ingrediente percebido não é rotulado como composição.
- Placeholder: papel quadriculado tonal + número de espécime `FX-01`, explicitamente demonstrativo.

### Iconografia e componentes

- Ícones quase pictogramas técnicos, mas amigáveis; famílias podem ter marcas geométricas abstratas, nunca folhas genéricas.
- Cards se parecem com fichas abertas: imagem, três descritores, dados e CTA na mesma ordem.
- Filtros lembram índice editorial; selected state combina preenchimento, check e texto.
- Prova e comércio usam o mesmo plano visual; não existe uma “área mágica” separada.

### Movimento e Three.js

- Anime.js pode ordenar/redistribuir fichas ao aplicar filtro, preservando foco e sem animar em reduced motion.
- Three.js mostra matéria que se transforma em cinza e uma fumaça mínima, com aparência de estudo, não de espetáculo.
- Entrada editorial por máscara curta de papel/fibra; nenhuma textura animada contínua.

### Desktop e mobile

- Desktop favorece comparação e catálogo mais amplo.
- Mobile mantém ficha documental em uma coluna e evita pares de cards apertados.
- PDP é a expressão mais forte da direção; Home pode parecer menos emocional sem fotografia excelente.

### Risco e mitigação

- Risco: parecer herbário, loja natural ou dossiê excessivamente racional.
- Mitigação: linguagem de atmosfera, retratos de uso real, serif editorial em momentos e cor de argila como calor.

---

## Direção C — Cartografia do Ar

### Tese

O que se compra não é “uma fumaça bonita”, mas uma forma de orientar atmosfera. A interface usa **trajetos, camadas e campos de densidade** para ligar momento → família → produto, como uma cartografia abstrata do ar.

### Sensação

- leve sem ser clínica, precisa sem ser fria, experimental sem atrapalhar compra;
- mais digital e sistêmica das três;
- adequada a comparação, seletor e famílias aromáticas.

### Grid e composição

- Desktop: grade modular de 12 colunas sobre linhas muito sutis; cards encaixados em campos 4/6/8.
- Home usa uma rota visual contínua entre “matéria” e “momento”, mas a rolagem permanece nativa.
- Mobile: a rota vira sequência numerada vertical; nenhuma linha pode atravessar texto ou controle.
- Espaço negativo é ativo, porém o primeiro produto surge cedo.

### Tipografia

- Principal candidata: `Instrument Sans Variable`, self-hosted; fallback `"Segoe UI", Arial, sans-serif`.
- Display usa a mesma família em largura/tamanho extremos; evita serif/luxo previsível.
- Dados podem usar `IBM Plex Mono` apenas se o custo de fonte for aceito; fallback `ui-monospace, "Cascadia Mono", monospace`. Na vertical slice, preferir somente Instrument Sans.

### Paleta candidata

- névoa `#EDF1EE`;
- tinta `#17201D`;
- ardósia `#53635E`;
- ferrugem `#A64028`;
- azul-ar `#426D78`;
- névoa densa `#C5CFCA`;
- branco `#FBFDFC`.

Cores de família só entram com taxonomia aprovada; nenhum significado depende exclusivamente da cor.

### Forma, material e imagem

- Linhas topográficas, campos translúcidos e contornos assimétricos; sem glassmorphism em controles.
- Fotografia futura: produto isolado com sombra real e pequenos recortes contextuais; a interface sobrepõe legenda fora da imagem, nunca texto sobre fumaça.
- Placeholder: mapa de contorno abstrato com selo `CONCEITO`; não imita embalagem inexistente.

### Iconografia e componentes

- Ícones de direção, densidade e camadas, sempre com rótulo.
- Cards quase sem caixa, separados por alinhamento e linha; hover pode revelar comparação, mas toda informação essencial já está visível.
- Passaporte sensorial usa três eixos textuais e barras segmentadas com valor escrito.
- Seletor guiado é o componente-hero desta direção.

### Movimento e Three.js

- Anime.js desenha um percurso curto entre escolhas concluídas e confirma a preservação de contexto.
- Three.js produz uma coluna de fumaça com densidade/turbulência parametrizadas; não reage ao cursor.
- Em reduced motion, os campos viram três stills comparáveis.

### Desktop e mobile

- Desktop aproveita relação espacial entre famílias; mobile converte tudo em sequência linear numerada.
- PDP e carrinho precisam reduzir linhas de fundo para não parecer dashboard.
- Foco visível deve ser sólido, nunca apenas glow.

### Risco e mitigação

- Risco: parecer produto tecnológico, dashboard ou marca de filtragem de ar.
- Mitigação: fotografia material forte, verbos humanos, textura real e remoção de grid técnico nas zonas de compra.

---

## Matriz de decisão

Escala: 1 fraco, 5 forte. Pontuação é julgamento de design para a vertical slice, não resultado de teste com clientes.

| Critério | Peso | A — Tempo de Brasa | B — Atlas da Matéria | C — Cartografia do Ar |
|---|---:|---:|---:|---:|
| Distintividade de marca | 5 | 5 | 4 | 4 |
| Clareza comercial | 5 | 4 | 5 | 4 |
| Relação direta com o ritual | 5 | 5 | 4 | 4 |
| Força sem fotografia real | 4 | 4 | 3 | 4 |
| Mobile e reduced motion | 5 | 4 | 5 | 4 |
| Espaço para Anime.js/Three.js sem excesso | 4 | 5 | 3 | 5 |
| Risco de clichê do segmento | 5 | 4 | 4 | 3 |
| Adequação à vertical slice | 5 | 5 | 4 | 4 |

## Recomendação para a vertical slice

**Escolher Direção A — Tempo de Brasa.**

Ela traduz o gesto mais específico da categoria — matéria que acende, vira brasa e deixa cinza — e acomoda uma única cena Three.js e um único feedback Anime.js com propósito claro. O sistema de zonas escuras e claras também materializa o posicionamento “poesia sensorial + prova comercial”: atmosfera no escuro; decisão, preço e segurança no claro.

A recomendação é `proposed`, não “direção validada”. Deve ser testada contra B e C com a mesma ficha fixture, sem revelar aos participantes qual é a recomendada.

### Critério de congelamento

Congelar A somente se a vertical slice provar:

- categoria reconhecida sem WebGL e sem imagem;
- preço, disponibilidade, segurança e CTA encontrados sem hesitação;
- contraste e foco aprovados;
- 320px sem sobreposição ou scroll horizontal;
- fallback estático tão compreensível quanto a cena;
- nenhuma associação recorrente com clínica, misticismo ou promessa de cura.

## Checklist acionável

- [ ] HEAL-08 implementar primeiro HTML/ordem semântica e fixture rotulada.
- [ ] HEAL-09 transformar o contrato recomendado em tokens e primitives.
- [ ] HEAL-10 animar somente linha de passagem e feedback de brasa.
- [ ] HEAL-11 implementar uma cena lazy e seu fallback estático equivalente.
- [ ] Testar fontes self-hosted com licença no repositório, subset PT-BR e fallback sem CLS.
- [ ] Manter todas as imagens não reais marcadas como demonstração.
- [ ] Capturar Home/PDP/carrinho em 320, 390, 1024 e 1440 antes de ampliar rotas.
- [ ] Comparar A/B/C em teste de cinco segundos usando os mesmos dados.

