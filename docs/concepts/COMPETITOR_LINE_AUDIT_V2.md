# HEAL — Auditoria forense de linhas e embalagens concorrentes V2

**Owner:** HEAL-31 — produto/packaging research  
**Status:** pesquisa competitiva; não é especificação industrial nem parecer regulatório  
**Data da coleta:** 28 de agosto de 2026  
**Mercado observado:** e-commerce brasileiro direto das marcas  
**Recorte:** Nirvana Premium, Nirvana Tradicional/Tradicional Essencial, Fênix Incensos médios, Fênix Incensos Grandes e Fênix In Natura

## 1. Veredito executivo

Há uma oportunidade real para HEAL ser mais clara, mais coerente e mais honesta sobre o produto sem imitar nenhum dos dois concorrentes.

- **Nirvana Premium** tem o melhor gesto direto de materialidade: a janela deixa ver bastões grossos, granulados e irregulares. A linha, porém, mostra apenas uma imagem frontal nos cinco SKUs analisados, torna impossível auditar a embalagem inteira e contém pelo menos um erro visível de arte (`Nononono` no benefício da caixa de Olíbano).
- **Nirvana Tradicional** usa uma arquitetura frontal semelhante à Premium em Canela, Lavanda e Mirra, mas o Olíbano ainda aparece em embalagem antiga, sem janela e com outra linguagem. A convivência de gerações prejudica a leitura de família.
- **Fênix médio** entrega a melhor prova digital de produto: galerias de oito ou nove imagens, escala em mão, caixa em ângulo e macros que tornam evidentes as diferenças reais de superfície entre os bastões. Em contrapartida, a caixa depende muito de cor + grande rótulo branco ornamental e não expõe fisicamente o bastão no ponto de venda.
- **Fênix Grande e In Natura** provam amplitude de formato, mas também expõem fragmentação de identidade. No frasco de Mirra In Natura, a imagem oficial mostra `30g`, enquanto título/PDP declaram `35g`: uma falha crítica de sincronização entre arte, cadastro e comércio.
- **Os dois concorrentes usam promessas emocionais, espirituais ou de saúde como forte atalho de diferenciação.** HEAL não precisa entrar nessa disputa. A vantagem possível é deixar aroma, composição, textura, quantidade, uso e segurança mais fáceis de entender e provar.
- **Coreografia do ar só será proprietária se o movimento estiver codificado na estrutura.** A janela curva comum, os cinco glifos do Organismo do Ar, os padrões redundantes e a hierarquia `HEAL → variante → HEALS — INCENSO → formato/quantidade` devem funcionar sem fumaça ilustrada, sem flor botânica e sem depender da cor.

O ponto mais importante para produto é físico: os bastões de referência não são o “incenso indiano liso e reto” genérico. Eles variam entre granulação fina, partículas grandes, cobertura irregular e espessura visivelmente artesanal. A embalagem HEAL precisa ser dimensionada e testada pelo SKU mais áspero, espesso e sujeito a desprendimento — não pelo bastão médio idealizado de um render.

## 2. Regra de evidência

Este documento separa três níveis:

- **[OBSERVADO]**: visível diretamente no HTML atual, cadastro de produto ou imagem oficial da marca.
- **[DECLARADO]**: texto, composição, duração, benefício, qualidade ou atributo afirmado pela própria marca. Não foi revalidado por ensaio independente.
- **[INFERIDO]**: leitura de design/engenharia a partir do que ficou visível. Exige protótipo, amostra ou fornecedor para confirmação.

Quando uma face não aparece nas galerias, ela é marcada **não observada**. Ausência na imagem não equivale a ausência física de informação.

### 2.1 Método e limites

- Home, navegação, coleções, PDPs e dados de produto foram consultados diretamente nos domínios oficiais em 28/08/2026.
- Preço atual e disponibilidade dos dez SKUs Nirvana foram verificados também pelos endpoints públicos `.js` da loja Shopify.
- O HTML atual da Fênix foi consultado diretamente para preço, parcelamento, conteúdo, composição, peso, duração e precauções.
- As imagens oficiais foram abertas em resolução disponível e inspecionadas em frente, 3/4, escala e macro quando a galeria oferecia esses enquadramentos.
- A automação do navegador gráfico ficou indisponível durante esta passagem. A inspeção foi feita por HTML oficial e arquivos de imagem oficiais; não houve clique automatizado nem teste responsivo visual ao vivo neste recorte.
- Não houve compra, desmontagem de caixa, medição física, teste de barreira, teste de queima nem acesso a faca/dieline. Material, gramatura, laminação, filme da janela, cola e estrutura interna permanecem **[A VALIDAR]**.

## 3. Auditoria Nirvana

### 3.1 Arquitetura de informação e comércio

**[OBSERVADO]** A navegação da Nirvana distribui o catálogo por muitas famílias: Kids, Tradicional Essencial, Arcanjos, Premium, Work, Brasil, Mood, Tradicional, Puro, Aura e Terapêutica, além de kits. A coleção Premium exibia 29 produtos; a Tradicional, 40; o catálogo geral, 157 itens no snapshot consultado.

**Leitura:** a amplitude facilita lançar temas, mas multiplica critérios de escolha e torna difícil entender de imediato a diferença material entre linhas. “Premium”, “Puro”, “Tradicional”, “Essencial” e “Terapêutica” parecem níveis ou promessas parcialmente sobrepostos até que o usuário leia os PDPs.

**[OBSERVADO]** Os dez SKUs selecionados estavam disponíveis. Todos os cinco Premium e os quatro Tradicional analisados custavam R$ 24,00; Alecrim Tradicional Essencial custava R$ 12,80. A coleção Premium também mostrava R$ 27,00 como preço comparativo. A apresentação de preços comparativos da coleção Tradicional variou no crawl e não deve ser tratada como uma escada confiável de preço.

**[OBSERVADO]** O PDP oferece compra, frete calculado na finalização, mensagem de envio imediato, 5% via Pix e até três parcelas. Os produtos selecionados tinham uma variante comercial.

### 3.2 Arquitetura da caixa Premium

| Face/componente | Evidência | Leitura técnica |
|---|---|---|
| Frente | **[OBSERVADO]** Caixa vertical estreita. Campo bege superior com símbolo/logo pequeno, `PREMIUM`, `incenso natural` e uma linha de benefício; faixa central colorida com aroma; janela vertical arredondada; campo bege inferior com roseta/flor de lótus ampliada. | Coerência forte de família. A janela é a principal prova de matéria. A hierarquia dá mais espaço a “Premium” e à ornamentação do que a uma taxonomia técnica do produto. |
| Janela | **[OBSERVADO]** Abertura retangular com cantos muito arredondados, centralizada, mostrando aproximadamente cinco bastões grossos. **Não foi possível confirmar se há filme transparente.** | Diferencia o bastão real do render genérico; geometria e posição já são códigos visuais associados à linha. HEAL não deve repetir a mesma janela central arredondada. |
| Bastão | **[OBSERVADO]** Superfície grossa, áspera, irregular e com partículas visíveis; diferenças de tom por SKU. | É a evidência mais convincente da proposta artesanal/material. Pede tolerância a espessura e contenção de partículas. |
| Lateral/lombada | **Não observada** nos cinco SKUs Premium selecionados. | Não há base pública para avaliar legibilidade na prateleira lateral. |
| Verso | **Não observado.** | Não há base pública para verificar warnings, modo de uso, lote, origem, código de barras ou composição impressos na caixa. |
| Topo | **[OBSERVADO parcialmente]** apenas um pequeno plano superior em algumas imagens frontais. | Texto e sistema de abertura não são legíveis. |
| Base | **Não observada.** | Lote/validade/fecho não auditáveis. |
| Estrutura interna | **Não observada.** | Cartucho dobrável, berço, saco interno, selagem e barreira de aroma são **[INFERIDOS/A VALIDAR]**. |
| Quantidade | **[OBSERVADO na frente]** `Contém 5 varetas de longa duração`. | Quantidade fica disponível antes do clique; “longa duração” é declaração sem método visível na frente. |

### 3.3 Premium — cinco aromas comparados

| SKU | Código visual da caixa **[OBSERVADO]** | Bastão na janela **[OBSERVADO]** | Texto curto frontal **[OBSERVADO]** | Formulação/copy do PDP **[DECLARADO]** | Risco/oportunidade |
|---|---|---|---|---|---|
| Canela | faixa vinho/bordô; roseta pêssego/cobre | marrom, grosso, cobertura granular | `Energia e prosperidade` | bambu, pó de madeira, aglutinante e canela em pó; página associa a prosperidade e outros efeitos simbólicos | Material visível é forte; benefício ocupa terreno espiritual sem prova. HEAL pode vencer com descrição olfativa e composição verificável. |
| Lavanda Celestial | faixa magenta/violeta | tom escuro, partículas aparentes | `Calma e tranquilidade` | grãos de lavanda entre os componentes; página associa a equilíbrio emocional | Código de cor é previsível e próximo da convenção de mercado. HEAL deve distinguir por glifo/padrão e nome escrito, não por lilás. |
| Mirra | faixa verde-escura | base escura com grânulos | `Meditação` | resina de mirra in natura moída | A presença declarada de resina aproxima discurso e matéria, mas o benefício é abstrato. Há espaço para macro factual e origem/composição. |
| Olíbano | faixa ocre/laranja | marrom-claro, granulação visível | `Nononono` na arte oficial | resina de olíbano in natura moída | Falha pública de preflight/QA. Para HEAL, arte e cadastro precisam de gate SKU por SKU antes de publicar/imprimir. |
| Alecrim | faixa verde-vivo | castanho-esverdeado, partículas | `Estimulante` | pó de alecrim; página associa a ansiedade, foco, memória e humor | Claim amplo e sensível. HEAL deve limitar a frente a aroma, matéria, formato e fatos aprovados. |

**Padrão comum [OBSERVADO]:** os cinco usam a mesma caixa, uma imagem cada, cinco varetas e preço atual de R$ 24,00. A diferenciação acontece por aroma, faixa de cor, benefício e aparência real do bastão na janela.

**Gargalo digital [OBSERVADO]:** uma única imagem impede ver macro isolado, escala, lateral, verso, abertura, proteção interna e produto fora da caixa. O usuário recebe forte prova frontal, mas baixa transparência operacional.

### 3.4 Tradicional e Tradicional Essencial — comparação relevante

| SKU | Arquitetura/quantidade **[OBSERVADO]** | Bastão **[OBSERVADO]** | Declarações do PDP | Situação de linha |
|---|---|---|---|---|
| Canela Tradicional | novo cartucho vertical; topo branco, corpo vinho, janela central, lótus tonal; `9 varetas` | granulado marrom | composição-base com bambu, pó de madeira, aglutinante e fragrância/resina; benefício frontal `Ambiente acolhedor` | Coerente com Lavanda e Mirra da nova geração. |
| Lavanda Tradicional | mesmo sistema; corpo violeta; janela; `9 varetas` | escuro e granulado | página chama a formulação de blend terapêutico e relaciona lavanda a estresse, ansiedade e insônia; frente `Reconforto e antiestresse` | Claim de saúde/comportamento aumenta risco; categoria visualmente clara. |
| Mirra Tradicional | mesmo sistema; corpo verde-escuro; janela; `9 varetas` | escuro com partículas | composição genérica de base + fragrância/resina; frente `Conexão espiritual e meditação` | Material é mostrado, mas o benefício domina a diferenciação. |
| Olíbano Tradicional | embalagem legada off-white, ilustrada com árvore/raízes; bloco verde-acinzentado; **sem janela**; `9 varetas`; lombada parcial visível | não exposto pela frente | página usa linguagem de relaxamento e bem-estar por inalação | Ruptura clara de geração dentro da linha ao vivo. É difícil saber na coleção qual pack chegará. |
| Alecrim Tradicional Essencial | cartucho muito mais estreito, topo branco/corpo verde e uma janela fina; quantidade não legível na imagem consultada | faixa estreita do produto | página declara atributos como sustentável, vegano, sem carvão e queima limpa | É outra sublinha, preço e arquitetura. Claims ambientais/absolutos precisam de prova; não usar como fato independente. |

**[OBSERVADO]** A caixa nova Tradicional declara nove varetas, enquanto Premium declara cinco. No preço atual de R$ 24,00, isso produz um cálculo meramente unitário de R$ 2,67 por vareta na Tradicional e R$ 4,80 na Premium.

**Limite da comparação:** não foram obtidos peso líquido e duração medidos de forma equivalente para todas as duas linhas. Preço por vareta não prova valor, intensidade, duração, matéria ou desempenho.

### 3.5 O que a Nirvana faz bem

- Mostra o produto real na frente.
- Mantém um molde frontal facilmente reconhecível na geração nova.
- Expõe quantidade antes da compra.
- Usa cor como varredura rápida de SKU.
- Tem boa amplitude de catálogo e kits.

### 3.6 Gaps Nirvana que HEAL pode ocupar

- Mostrar a caixa inteira e o bastão em macro, não só a frente.
- Explicar diferença entre coleções por fatos de produto, não apenas por nomes de linha.
- Eliminar benefícios placeholder e divergências de geração com preflight de arte.
- Fazer variante funcionar sem depender de cor.
- Organizar composição, uso, segurança e origem em camadas fáceis de consultar.
- Separar descrição sensorial de promessa terapêutica/espiritual.

## 4. Auditoria Fênix

### 4.1 Arquitetura de informação e comércio

**[OBSERVADO]** A coleção consultada apresentava 24 incensos naturais e quatro grandes, com navegação por aromas, Incensos Naturais, Incenso Artesanal, Incensos Grandes, In Natura, incensários e outras categorias de casa/bem-estar. O menu dá acesso direto a Canela, Lavanda, Mirra, Olíbano e Alecrim.

**Leitura:** a categorização por aroma e formato é útil, mas divide atenção com muitas promoções e famílias adjacentes. “Médio”, “grande”, “in natura” e peso são mais concretos que uma escada abstrata Premium/Tradicional, embora nem sempre sejam destacados de modo uniforme nas imagens de catálogo.

**[OBSERVADO]** Nos PDPs médios analisados há código do produto, preço, estoque, quantidade, cálculo de frete, parcelamento de até dez vezes, Pix/boleto, wishlist, relacionados, contato e CNPJ. A camada comercial é mais informativa que a imagem frontal isolada.

**[OBSERVADO]** Os cinco médios retornaram preço-base de R$ 23,80 no HTML ao vivo de 28/08/2026; o site e crawls também exibem promoções variáveis. Palo Santo Grande retornou R$ 32,80; Mirra In Natura, R$ 59,80. Tratar preço promocional como dado volátil, nunca como atributo estrutural da marca.

### 4.2 Arquitetura da caixa média

| Face/componente | Evidência | Leitura técnica |
|---|---|---|
| Frente | **[OBSERVADO]** Caixa vertical com aparência canelada/estriada colorida. Grande placa branca ornamental concentra `INCENSO PREMIUM · DESDE 1990`, marca Fênix, aroma, benefício, `LINHA AROMAS PUROS` e `Contém 9 varetas`. | Boa consistência de família e quantidade clara. Ornamentação, cor e muitos níveis tipográficos competem. |
| Janela | **[OBSERVADO]** Não há janela frontal nos cinco médios. | A caixa protege visualmente, mas o ponto de venda não prova a textura. O e-commerce compensa mostrando uma vareta ao lado. |
| Bastão | **[OBSERVADO]** Uma vareta inteira aparece fora da caixa na imagem principal; macros e composições digitais mostram variação de superfície. | Excelente para escala e forma no PDP; não resolve a experiência física da caixa fechada. |
| Lateral/lombada | **[OBSERVADO parcialmente]** vistas 3/4 mostram profundidade, superfície estriada e fechos. Texto lateral completo não ficou legível. | Estrutura aparente ajuda a entender volume; navegação de prateleira lateral continua não auditável. |
| Verso | **Não observado** nas galerias selecionadas. | Precauções existem no PDP, mas não foi possível confirmar seu layout impresso. |
| Topo | **[OBSERVADO parcialmente]** em 3/4 e fotos de escala. | Fecho e espessura aparecem; nomenclatura no topo não ficou legível. |
| Base | **Não observada.** | Lote/validade/fecho não auditáveis. |
| Estrutura/material | **[OBSERVADO]** aparência externa canelada. **[INFERIDO]** possível papel/cartão microondulado ou revestimento texturizado. | Não chamar de papelão ondulado, reciclado ou sustentável sem especificação do fornecedor. |
| Quantidade | **[OBSERVADO]** `Contém 9 varetas` na frente e PDP. | Boa consistência entre comunicação frontal e cadastro nos médios selecionados. |

### 4.3 Fênix médio — cinco aromas comparados

| SKU | Caixa e benefício frontal **[OBSERVADO]** | Superfície do bastão **[OBSERVADO]** | Produto **[DECLARADO no PDP]** | Comércio em 28/08/2026 |
|---|---|---|---|---|
| Canela | vermelho empoeirado; `Força e Prosperidade` | marrom, grosso, cobertura granular densa e pontas arredondadas | 9 varetas médias; 20 g; cerca de 30 min cada; canela em pó, óleo essencial de canela, resinas de olíbano e breu branco, carvão vegetal e álcool de cereais | R$ 23,80; R$ 22,61 via Pix; até 10x |
| Lavanda | violeta; `Calma e Relaxamento` | quase preto, matte, granulação mais fina e uniforme, ainda espesso/imperfeito | 9 médias; 20 g; cerca de 30 min; óleo essencial e composto aromático de lavanda, carvão vegetal, álcool de cereal e resina de breuzinho | R$ 23,80 no HTML ao vivo; promoções podem mudar |
| Mirra | malva/roxo; `Espiritualidade e Proteção` | base preta com partículas grandes douradas/bege; é o contraste de macro mais evidente entre os médios | 9 médias; 25 g; cerca de 30 min; resinas de mirra, olíbano e breu branco, carvão e álcool de cereais | R$ 23,80 |
| Olíbano | mostarda/dourado; `Elevação e Conexão Espiritual` | cinza-carvão, partículas finas, matte e levemente irregular | 9 médias; 30 g; cerca de 30 min; resinas de olíbano e breu branco, álcool de cereais e carvão | R$ 23,80 |
| Alecrim | verde-menta; `Foco e Clareza Mental` | bege/verde-dourado, camada densa de partículas | 9 médias; 30 g; cerca de 30 min; óleos essenciais de alecrim e limão, alecrim em pó, resinas de olíbano e breu, álcool de cereais e carvão | R$ 23,80 |

**[OBSERVADO]** A massa líquida varia 50% — de 20 g a 30 g — dentro do mesmo formato, contagem e preço-base. O preço por grama calculado muda de aproximadamente R$ 1,19/g (Canela/Lavanda) para R$ 0,95/g (Mirra) e R$ 0,79/g (Olíbano/Alecrim).

**Interpretação [INFERIDA]:** o mesmo número de bastões não representa a mesma massa. Para HEAL, quantidade de unidades, peso líquido e duração devem ser tratados como três fatos diferentes, e só exibidos após aferição/metodologia aprovadas.

### 4.4 Galeria e macro Fênix

**[OBSERVADO]** A Fênix oferece oito ou nove imagens nos SKUs médios examinados. O conjunto cobre, conforme o SKU:

1. packshot frontal com vareta em escala;
2. caixa em 3/4;
3. foto em mão ou contexto de tamanho;
4. vareta acesa/uso;
5. macro da superfície;
6. agrupamento de varetas;
7. ambiente/lifestyle;
8. cards informativos.

Isso responde melhor que a Nirvana à pergunta “como é o bastão de verdade?”. A macro revela que “artesanal” não é um único acabamento: Mirra e Palo Santo Grande carregam fragmentos grandes; Canela e Alecrim têm cobertura densa; Lavanda e Olíbano são mais finos e escuros.

**Limite [OBSERVADO]:** mesmo com galeria rica, o conjunto selecionado não tornou legíveis verso, base, painel legal completo nem acondicionamento interno. A profundidade de fotografia não equivale a transparência total da embalagem.

### 4.5 Outros formatos além do médio

#### Palo Santo Grande

- **[OBSERVADO]** Caixa alta cinza/bege com aparência estriada; placa preta/dourada ornamental, fênix e símbolo yin-yang; sem janela; vareta mostrada fora da caixa.
- **[OBSERVADO]** O bastão é mais longo/grosso e o mais áspero da amostra: base escura com fragmentos botânicos bege grandes e irregulares.
- **[DECLARADO]** 9 varetas grandes, 40 g, cerca de 50 minutos cada; composição com palo santo, resina de breu branco, carvão, álcool de cereais e resina de olíbano.
- **[OBSERVADO]** Preço-base ao vivo de R$ 32,80, ou aproximadamente R$ 3,64 por vareta antes de desconto.
- **Leitura:** embalagem e macro deixam clara outra escala de produto, mas a identidade parece uma geração/coleção diferente da caixa média branca-colorida.

#### Mirra In Natura em frasco

- **[OBSERVADO]** Frasco transparente de aparência vítrea, rolha e gargantilha/rótulo kraft com ilustração botânica. A matéria fica integralmente visível.
- **[OBSERVADO]** A arte na imagem oficial diz `MIRRA IN NATURA 30g`.
- **[DECLARADO no título/PDP]** 35 g.
- **[OBSERVADO]** Preço-base ao vivo de R$ 59,80.
- **Risco:** diferença de 5 g entre imagem e cadastro. É um problema de confiança e pode virar problema de metrologia/rotulagem se refletir o produto real. Sem amostra, não é possível determinar qual informação física está correta.

### 4.6 Informação e safety Fênix

**[DECLARADO]** Os cinco médios e o Palo Santo Grande publicam quantidade, formato, peso líquido, duração aproximada, composição e precauções. As precauções instruem manter longe de crianças e animais, não deixar aceso sem supervisão e guardar em local seco, arejado e protegido da luz. A marca também avisa que variações de peso/tamanho podem ocorrer por se tratar de produto artesanal.

**[OBSERVADO]** A precaução está presente no texto do PDP. Como os versos não ficaram disponíveis, não é possível afirmar que toda a informação esteja impressa na embalagem comercial.

**Risco de copy:** os PDPs misturam história botânica, espiritualidade, energia e alegações de saúde/efeitos por inalação. Esses trechos são declarações da marca, não evidência de eficácia do incenso. HEAL deve submeter qualquer alegação funcional, ambiental, de saúde ou segurança a revisão jurídica/regulatória e prova documental antes de usar.

### 4.7 O que a Fênix faz bem

- Mostra escala e macro do bastão no e-commerce.
- Publica composição, contagem, peso, duração aproximada e precauções.
- Mantém coerência forte entre as caixas médias.
- Oferece formato médio, grande e matéria in natura.
- Expõe código, disponibilidade, Pix, parcelamento e frete no PDP.

### 4.8 Gaps Fênix que HEAL pode ocupar

- Provar textura na própria caixa fechada, não apenas na fotografia.
- Reduzir ornamentação e níveis concorrentes de texto.
- Tornar a variante reconhecível por forma/padrão/nome, sem cor exclusiva.
- Unificar famílias e formatos sob gramática visual consistente.
- Mostrar verso, abertura e acondicionamento interno no PDP.
- Sincronizar arte, cadastro e estoque por um único registro de verdade.
- Trocar claims amplos por informação olfativa/material específica e auditável.

## 5. Comparação direta dos cinco aromas

| Aroma | Nirvana Premium | Nirvana Tradicional/Essencial | Fênix médio | Implicação para HEAL |
|---|---|---|---|---|
| Canela | vinho; 5; janela; granulado; “energia/prosperidade” | vinho; 9; janela; granulado; “ambiente acolhedor” | vermelho; 9; sem janela; granulado; 20 g; “força/prosperidade” | Não usar vinho/vermelho + prosperidade como identidade. `HLS-CNL`, hachura diagonal e nome escrito devem carregar reconhecimento. |
| Lavanda | magenta; 5; janela; partículas; “calma/tranquilidade” | violeta; 9; janela; “reconforto/antiestresse” | violeta; 9; sem janela; superfície fina escura; 20 g; “calma/relaxamento” | Lilás + calma é território saturado. Lavanda Celestial HEAL deve ser identificada pelo glifo alto/aberto, pontos e texto factual. |
| Mirra | verde-escuro; 5; janela; resina declarada | verde-escuro; 9; janela; espiritualidade/meditação | malva; 9; sem janela; macro muito particulado; 25 g; espiritualidade/proteção | A macro real é mais diferenciadora que o código místico. `HLS-MRA` e campo sólido interrompido podem estruturar o SKU sem símbolos religiosos. |
| Olíbano | ocre; 5; janela; arte com placeholder | embalagem tradicional legada sem janela; relaxamento | mostarda; 9; sem janela; fino/cinza; 30 g; elevação/conexão | Há oportunidade imediata de confiança: nomenclatura legível, preflight sem erro, macro e dados consistentes. |
| Alecrim | verde-vivo; 5; janela; “estimulante” | Essencial estreita; verde; janela fina; claims ambientais | verde-menta; 9; sem janela; particulado claro; 30 g; foco/clareza | Verde + estímulo/foco é genérico. `HLS-ALC`, chevrons e nome escrito devem ser suficientes em monocromia. |

### 5.1 O padrão que não deve ser repetido

Nos dois concorrentes, cor + aroma + benefício formam o atalho principal. Isso leva a códigos previsíveis: lavanda roxa e calma; alecrim verde e foco; canela vermelha e prosperidade. HEAL pode ser memorável por outro mecanismo: **trajetória, cadência, vazio, textura e nomenclatura factual**.

## 6. Matriz de preço e valor percebido

| Linha/SKU | Preço-base observado | Unidades declaradas | Peso/duração declarados | Cálculo simples | O que não se pode concluir |
|---|---:|---:|---|---:|---|
| Nirvana Premium — cinco aromas | R$ 24,00 | 5 | não comparáveis no recorte | R$ 4,80/vareta | Não prova duração, qualidade ou intensidade. |
| Nirvana Tradicional — Canela/Lavanda/Mirra/Olíbano | R$ 24,00 | 9 | não comparáveis no recorte | R$ 2,67/vareta | Não prova equivalência entre linhas. |
| Nirvana Tradicional Essencial — Alecrim | R$ 12,80 | quantidade não legível na imagem consultada | não consolidado | não calcular | Evitar inventar unidade a partir do tamanho da caixa. |
| Fênix médio — cinco aromas | R$ 23,80 | 9 | 20–30 g; cerca de 30 min cada | R$ 2,64/vareta | Duração é declaração aproximada, não ensaio nosso. |
| Fênix Palo Santo Grande | R$ 32,80 | 9 | 40 g; cerca de 50 min cada | R$ 3,64/vareta | Não comparar diretamente com médios sem intensidade, comprimento e ensaio. |
| Fênix Mirra In Natura | R$ 59,80 | não se aplica | PDP 35 g; imagem 30 g | dado divergente | Nenhum R$/g confiável até resolver a divergência. |

**Diretriz HEAL:** na PDP, mostrar preço total e, se for útil, custo por unidade calculado automaticamente a partir de uma quantidade aprovada. Não transformar duração aproximada ou massa em promessa de desempenho. Promoção, Pix e parcelamento devem ser dados comerciais, visualmente separados dos fatos do produto.

## 7. Cobertura forense das superfícies

| Linha | Frente | Lateral | Verso | Topo | Base | Janela | Produto/macro | Unboxing |
|---|---|---|---|---|---|---|---|---|
| Nirvana Premium | clara | não vista | não visto | parcial | não vista | sim | produto através da janela; sem macro isolado | não visto |
| Nirvana Tradicional nova | clara | não vista | não visto | parcial | não vista | sim | produto através da janela | não visto |
| Nirvana Tradicional Olíbano legado | clara | parcial | não visto | parcial | não vista | não | não visto | não visto |
| Nirvana Tradicional Essencial Alecrim | clara | parcial | não visto | parcial | não vista | estreita | parcial | não visto |
| Fênix médio | clara | parcial/3/4 | não legível | parcial | não vista | não | forte; vareta inteira + macros | não visto |
| Fênix Grande | clara | parcial/3/4 | não legível | parcial | não vista | não | forte; macro de partícula grande | não visto |
| Fênix In Natura | clara | rótulo em volume | não legível | rolha visível | não vista | frasco transparente | material integralmente visível | não visto |

**Conclusão:** nenhuma das amostras públicas entregou uma auditoria completa de todas as faces e do interior. HEAL pode transformar transparência de embalagem em parte da experiência de compra: packshot frontal, 3/4 esquerdo, 3/4 direito, verso ortogonal, topo/base, abertura, proteção interna e macro por SKU.

## 8. Competitive gap map

| Território | Nirvana | Fênix | Gap aberto | Resposta HEAL verificável |
|---|---|---|---|---|
| Reconhecimento de categoria | `incenso natural` e bastão visível | “incenso” claro na placa e vareta ao lado | HEALS pode ser ambíguo sozinho | Sempre escrever `HEALS — INCENSO` na frente e lombada; no digital, primeira ocorrência `HEALS, os incensos da HEAL`. |
| Verdade material | janela forte, macro digital fraco | macro digital forte, caixa fechada opaca | ninguém une as duas provas | Janela curva + macro real + foto do conteúdo completo, sem render substituindo produto. |
| Forma áspera/artesanal | visível na janela | muito bem visível em macro | proteção e tolerância não são explicadas | Projetar pelo envelope P95 real e validar desprendimento/partículas. |
| Diferenciação dos cinco | aroma + cor + benefício | aroma + cor + benefício | alta dependência cromática e de claims | Nome + código + glifo + padrão + cor opcional; teste monocromático e daltonismo. |
| Coerência de linha | forte na Premium; migração na Tradicional | forte nos médios; ruptura entre médio/grande/in natura | nenhum sistema cobre formatos sem parecer outra marca | Gramática única do Organismo do Ar, com mudanças de escala/formato, não de identidade. |
| Informação de produto | composição nos PDPs; faces não auditáveis | composição/peso/duração/safety nos PDPs; faces não auditáveis | falta sincronização embalagem ↔ PDP | Registro mestre por SKU alimenta arte, PDP e etiqueta; publicação bloqueada por divergência. |
| Claims | emocional/espiritual/terapêutico | emocional/espiritual/saúde | linguagem sedutora, porém de alto risco e pouco comparável | Copy olfativa/material; claims funcionais só com evidência e aprovação. |
| Quantidade/valor | 5 Premium vs 9 Tradicional ao mesmo preço | 9, mas massa varia 20–30 g | unidade, massa e duração são confundíveis | Mostrar os três como campos separados, apenas após validação. |
| Galeria PDP | normalmente uma imagem nos selecionados | oito/nove imagens, mas não todas as faces | nenhum entrega embalagem 360 + interior | Protocolo de 12 imagens mínimas por SKU, incluindo verso e unboxing. |
| QA de arte/cadastro | placeholder visível no Olíbano Premium | 30 g na imagem vs 35 g no cadastro de Mirra | confiança cai por divergência básica | Gate automatizado + revisão humana: nome, código, massa, contagem, barcode, lote e claims. |
| Shelf scan | janela + cor; lombada não auditada | placa branca + cor; lombada não auditada | reconhecimento lateral/topo pouco comprovado | Nome, glifo, padrão e categoria nas quatro orientações relevantes. |
| Mobile commerce | catálogo amplo e muitos rótulos de linha | menus/promos extensos e galeria longa | carga cognitiva e conteúdo antes da decisão | PDP mobile com fatos principais antes da mídia pesada; galeria progressiva e zoom acessível. |

## 9. Requisitos concretos — caixa HEAL “Coreografia do ar”

Os requisitos abaixo complementam o sistema conceitual atual. Eles não definem ainda dimensões, substrato ou texto regulatório final.

### 9.1 Não negociáveis de marca/categoria

1. A marca é **HEAL**. O nome de família é **HEALS**.
2. `HEALS` nunca aparece sozinho no primeiro contato comercial. A frente e a lombada devem conter **`HEALS — INCENSO`**.
3. A hierarquia frontal mínima é:

   ```text
   HEAL
   [glifo/janela Coreografia do ar]
   NOME DA VARIANTE
   HEALS — INCENSO
   FORMATO + QUANTIDADE/PESO [VALIDADOS]
   ```

4. “Natural”, “artesanal”, “masala”, “vegano”, “sem carvão”, “queima limpa”, “não tóxico”, “baixo teor de fumaça”, “sustentável” ou equivalentes só entram com definição, documentação e aprovação **[A VALIDAR]**.
5. O conceito precisa sobreviver sem fumaça ilustrada. Fumaça real pode aparecer em fotografia de uso seguro; não é logo, pattern ou prova de benefício.

### 9.2 Estrutura física comum

- **[REQUISITO]** Um dieline compartilhado para os cinco SKUs iniciais. Não comprar cinco facas só para transformar cada glifo em janela diferente.
- **[REQUISITO]** Janela curva comum como percurso do ar, não o retângulo vertical arredondado central da Nirvana. O glifo impresso pode dialogar com a janela sem coincidir com o corte.
- **[REQUISITO]** A janela mostra superfície real suficiente para distinguir um bastão áspero de um bastão liso a um braço de distância.
- **[A VALIDAR]** filme transparente, ausência de filme ou manga interna. A escolha deve equilibrar aroma, higiene, fuga de partículas, toque, reciclagem e custo.
- **[REQUISITO]** O acondicionamento impede que fragmentos grossos soltos cheguem ao exterior da caixa fechada em transporte normal.
- **[REQUISITO]** Folga interna e berço/sleeve são definidos a partir de amostras reais: comprimento máximo, diâmetro máximo, curvatura, fragilidade e envelope P95 de cada SKU.
- **[REQUISITO]** O SKU com maior partícula/diâmetro determina o pior caso da plataforma. Não dimensionar só por Lavanda/Olíbano finos.
- **[A VALIDAR]** substrato, gramatura, barreira, verniz, hot stamping, tinta, cola e adesivo de segurança. Nenhum atributo ambiental pode ser derivado apenas da aparência do papel.

### 9.3 Distribuição por face

#### Frente

- HEAL no topo, com área de respiro.
- Glifo do SKU e janela curva como núcleo, sem lótus, botânica ilustrativa ou placa ornamental branca.
- Nome completo da variante em alto contraste.
- `HEALS — INCENSO` antes de qualquer frase conceitual.
- `Contém N bastões` e/ou `Peso líquido N g` apenas com dados aprovados.
- Se houver duração: `duração aproximada por bastão`, acompanhada de método ou remissão para método no verso/PDP **[A VALIDAR]**.

#### Lombada primária

- HEAL.
- Nome da variante.
- `HEALS — INCENSO`.
- Glifo reduzido + padrão tátil/visual correspondente.
- Quantidade validada.

Ela precisa funcionar quando apenas 20–30% da frente está visível na prateleira.

#### Lombada secundária

- Descrição olfativa curta e factual, separada de composição.
- Formato do bastão e modo de acendimento resumido.
- QR opcional para lote, origem ou demonstração; nunca como substituto de informação obrigatória.

#### Verso

- Descrição olfativa.
- Composição/ingredientes na terminologia aprovada pelo fabricante.
- Quantidade, peso, dimensão/faixa e duração com método **[A VALIDAR]**.
- Modo de uso ilustrado por passos simples.
- Precauções de fogo, ventilação, crianças, animais e supervisão **[A VALIDAR juridicamente]**.
- Armazenamento e descarte **[A VALIDAR]**.
- Fabricante/origem, CNPJ, SAC, lote, validade, código de barras e exigências regulatórias aplicáveis **[A VALIDAR]**.
- Nenhum claim de efeito emocional, terapêutico, espiritual ou ambiental sem trilha de aprovação.

#### Topo

- Nome curto da variante + glifo + marca. Deve permitir localizar SKU em caixa expositora ou gaveta.

#### Base

- Área reservada para lote/validade variáveis e código interno de produção.
- Fecho inviolável ou evidência de abertura **[A VALIDAR por custo/canal]**.
- Não colocar informação de escolha principal somente na base.

### 9.4 Sistema dos cinco SKUs

| Variante HEAL | Código | Assinatura estrutural | Pattern redundante | Regra anti-imitação |
|---|---|---|---|---|
| CANELA | `HLS-CNL` | dois contragiros curtos em S angular; terminal diagonal | hachura `/` | evitar vinho/vermelho + prosperidade como único código |
| LAVANDA CELESTIAL | `HLS-LVC` | dois arcos amplos assimétricos e vazio central; terminal aberto | pontos espaçados | evitar lilás + calma e qualquer estrela/órbita literal |
| MIRRA | `HLS-MRA` | dobra interna compacta; terminal quadrado | campo sólido interrompido | evitar símbolo religioso, resina desenhada ou “meditação” como identidade |
| OLÍBANO | `HLS-OLB` | coluna com três retornos alternados; terminal duplo | barras `‖` | evitar ocre/dourado + elevação como única distinção |
| ALECRIM | `HLS-ALC` | quatro inflexões ascendentes; terminal em V aberto | chevrons `›` | evitar verde + folha + foco como pacote genérico |

**[REQUISITO]** Nome, código, glifo e pattern precisam manter 100% de correspondência entre caixa, PDP, picking, nota e material de campanha. A cor é uma quinta pista, nunca a única.

### 9.5 Paleta e acabamento

- Não clonar a combinação bege + faixa colorida + lótus da Nirvana.
- Não clonar a caixa estriada colorida + grande placa branca ornamental da Fênix.
- Não atribuir automaticamente roxo à Lavanda, verde ao Alecrim e vermelho à Canela.
- Testar todos os cinco SKUs em monocromia, baixa visão, daltonismo e impressão com variação de lote.
- Se houver textura tátil, ela deve derivar da cadência do Organismo do Ar, não de uma aparência “rústica” genérica.
- Acabamento premium deve melhorar leitura, toque, resistência ou prova de matéria; não pode ser apenas hot stamping sem função.

### 9.6 Verdade do bastão

- Fotografar o lote real, não um bastão digital perfeitamente cilíndrico.
- Preservar no macro irregularidade, variação de diâmetro, partícula e cor; remover apenas poeira/acidentes não representativos.
- Não adicionar fragmentos botânicos em 3D para parecer mais “natural”.
- Não declarar a partícula visível como ingrediente até cruzar imagem e ficha de composição.
- Quando houver variação artesanal legítima, explicar faixa/tolerância em linguagem simples.

## 10. Planograma e experiência de abertura

### 10.1 Planograma mínimo

**Prateleira frontal, cinco facings:**

1. CANELA — `HLS-CNL`
2. LAVANDA CELESTIAL — `HLS-LVC`
3. MIRRA — `HLS-MRA`
4. OLÍBANO — `HLS-OLB`
5. ALECRIM — `HLS-ALC`

A ordem não deve sugerir uma escala terapêutica. Pode ser mantida como ordem editorial/alfa aprovada, e deve ser idêntica no pack de coleção, navegação e PDP.

**Teste de 1 metro:** nome + categoria + diferença entre glifos devem ser reconhecíveis sem ler a descrição.  
**Teste lateral:** com apenas lombadas expostas, cinco pessoas devem conseguir parear caixa e variante.  
**Teste de 80 px:** thumbnail digital ainda precisa diferenciar marca, variante e categoria; a janela pode virar massa, mas glifo/pattern/nome permanecem.

### 10.2 Unboxing proposto

1. Usuário rompe um selo discreto ou abre aba sem destruir a frente **[A VALIDAR]**.
2. Uma manga/bolsa interna contém partículas e aroma **[A VALIDAR]**.
3. O primeiro conteúdo visível confirma o mesmo bastão mostrado pela janela e pelo PDP.
4. Instruções curtas aparecem antes de o usuário retirar/acender o produto.
5. A caixa pode ser refechada sem esmagar a superfície áspera.
6. Descarte/separação de componentes é explicado sem promessas ambientais vagas.

Não inserir cartões, fitas, sachets ou múltiplas camadas apenas para parecer luxuoso. Cada peça deve cumprir proteção, instrução, rastreabilidade ou conservação.

## 11. Protocolo de imagens da embalagem HEAL

Cada SKU precisa de, no mínimo, doze imagens coerentes:

1. frente ortogonal;
2. 3/4 esquerdo;
3. 3/4 direito;
4. lombada primária;
5. verso ortogonal legível;
6. topo e base;
7. caixa aberta;
8. conteúdo completo retirado;
9. uma vareta inteira em escala;
10. macro lateral da superfície;
11. macro da ponta/partícula;
12. uso seguro em ambiente real, com chama já apagada antes da brasa.

Adicionais recomendadas:

13. cinco caixas em planograma;
14. cinco macros lado a lado sob a mesma luz;
15. caixa na mão;
16. detalhe da janela e contenção de partículas;
17. modo de uso em três passos;
18. variante em contexto móvel 80 px;
19. lote/validade e rastreabilidade;
20. acondicionamento para envio.

**Padrão técnico:** mesma distância focal, luz, balanço de branco e escala entre SKUs; cor de referência; alt text factual; zoom sem interface quebrada; arquivo leve derivado para mobile e original de alta resolução disponível sob demanda.

## 12. Gates de protótipo e aceitação

| Gate | Como testar | Critério mínimo para avançar |
|---|---|---|
| Categoria em 5 segundos | mostrar frente sem contexto | maioria identifica “incenso”, não apenas “HEALS” ou “perfume” |
| Diferenciação sem cor | imprimir cinco caixas em cinza | usuários pareiam glifo/pattern/nome sem depender da paleta |
| Shelf scan | mock físico a 1 m e só lombada | marca, variante e categoria permanecem legíveis |
| Verdade da janela | inserir amostras reais de todos os SKUs | bastão visível; nenhuma leitura falsa de ingrediente; sem ocultar a textura |
| Envelope físico | medir ≥30 unidades/lote/SKU ou plano amostral aprovado | caixa comporta P95/P99 definido sem prensar/quebrar |
| Partículas | queda, vibração e transporte simulado | nenhum escape externo acima do limite operacional aprovado |
| Barreira | aroma/luz/umidade ao longo do shelf life proposto | especificação aprovada por fornecedor e QA; sem overclaim |
| Integridade da janela | pressão, empilhamento, abrasão e calor | sem rasgo, delaminação ou filme solto |
| Dados | cruzar arte, ERP/PIM, PDP e amostra | zero divergência em nome, código, contagem, peso, lote e claims |
| Safety | revisão técnica/jurídica + teste de leitura | warnings aplicáveis presentes e legíveis; instrução não depende de QR |
| Produção | prova de cor, faca e acabamento | glifos, patterns, janela e textos mantêm contraste/tolerância |
| Mobile | PDP em largura estreita/rede lenta | categoria, preço, quantidade, composição e CTA aparecem antes da mídia pesada |

Nenhuma caixa deve ir para produção apenas com render aprovado. Exigir branco estrutural, prova impressa, amostra preenchida com bastão real e lote piloto.

## 13. Matriz “ser melhor sem copiar”

| Referência útil | Não copiar | Aprender | Traduzir para HEAL |
|---|---|---|---|
| Janela Nirvana | retângulo central arredondado + bege/faixa/lótus | o produto real convence mais que claim | janela curva comum como trajetória; glifo impresso separado; hierarquia factual |
| Granulação Nirvana | mesmas cores e benefícios espirituais | irregularidade é valor visual | revelar lote real e explicar variação/material sem alegação terapêutica |
| Galeria Fênix | composição ornamental, cenografia e claims | macro, escala e 3/4 reduzem incerteza | protocolo de 12–20 imagens com todas as faces e interior |
| Caixa média Fênix | grande placa branca, cor exclusiva por aroma, superfície estriada | família consistente acelera shelf scan | dieline único + Organismo do Ar + patterns redundantes |
| Fênix Grande | preto/dourado, fênix, yin-yang | formato precisa parecer fisicamente diferente | mesma gramática HEAL em outra proporção, se houver linha grande |
| Frasco In Natura | kraft botânico genérico | matéria integralmente visível é forte | usar transparência e rastreabilidade se HEAL lançar matéria, com peso sincronizado |
| PDPs com composição/safety | copiar texto/claims | informação concreta gera confiança | conteúdo estruturado a partir do registro mestre do SKU |
| Promoções/parcelas | ruído e urgência constantes | pagamento precisa estar claro | comércio separado da narrativa e sem esconder preço/quantidade |

## 14. Decisões recomendadas agora

1. Aprovar a regra de um dieline + uma janela curva comum para os cinco SKUs.
2. Solicitar amostras físicas de Canela, Lavanda Celestial, Mirra, Olíbano e Alecrim antes de dimensionar a caixa.
3. Medir comprimento, diâmetro, curvatura, massa, desprendimento e fragilidade por lote.
4. Definir registro mestre de SKU que gere frente, lombada, verso e PDP.
5. Prototipar duas soluções internas: manga/saco com barreira e berço simples com janela protegida.
6. Rodar planograma monocromático antes de escolher paleta.
7. Criar packshots 360 e macros reais no primeiro lote piloto.
8. Fazer revisão regulatória separada para denominação, composição, peso, quantidade, origem, warnings, claims e descarte.

## 15. Questões em aberto

- Qual é o comprimento, diâmetro e desvio real dos cinco HEALS?
- Todos terão a mesma contagem? A massa líquida varia por formulação?
- Existe vareta de bambu, base sem vareta ou outro suporte? Não assumir.
- Qual barreira de aroma/umidade o shelf life exige?
- Quanto material se desprende em vibração e transporte?
- A janela terá filme? Qual material e rota de descarte?
- Quais claims podem ser comprovados documentalmente?
- Quais informações são obrigatórias na embalagem para a classificação comercial/regulatória final?
- A duração será declarada? Qual método e faixa?
- Haverá caixa unitária, kit, display de PDV e shipper? Todos precisam do mesmo sistema de SKU.

## 16. Fontes oficiais consultadas

Todas as páginas abaixo foram consultadas em **28/08/2026**. Preços, disponibilidade, promoções e imagens podem mudar.

### Nirvana

- [Home Nirvana](https://nirvanaincenso.com.br/)
- [Coleção Linha Premium](https://nirvanaincenso.com.br/collections/linha-premium)
- [Coleção Linha Tradicional](https://nirvanaincenso.com.br/collections/linha-tradicional)
- [Premium Canela](https://nirvanaincenso.com.br/products/hb65762k5)
- [Premium Lavanda Celestial](https://nirvanaincenso.com.br/products/kgdqd3cey)
- [Premium Mirra](https://nirvanaincenso.com.br/products/r95mbptgt)
- [Premium Olíbano](https://nirvanaincenso.com.br/products/q4kgxqbbn)
- [Premium Alecrim](https://nirvanaincenso.com.br/products/ke9h7yz8c)
- [Tradicional Canela](https://nirvanaincenso.com.br/products/4etjydftw)
- [Tradicional Lavanda](https://nirvanaincenso.com.br/products/8ctutnqvw)
- [Tradicional Mirra](https://nirvanaincenso.com.br/products/vdwl57f7e)
- [Tradicional Olíbano](https://nirvanaincenso.com.br/products/zdclqp64e)
- [Tradicional Essencial Alecrim](https://nirvanaincenso.com.br/products/incenso-tradicional-essencial-alecrim)

### Fênix

- [Home Fênix](https://www.incensofenix.com.br/)
- [Coleção Incensos](https://www.incensofenix.com.br/incensos)
- [Canela médio](https://www.incensofenix.com.br/incenso-natural-canela)
- [Lavanda médio](https://www.incensofenix.com.br/incenso-lavanda)
- [Mirra médio](https://www.incensofenix.com.br/incenso-natural-mirra-medio)
- [Olíbano médio](https://www.incensofenix.com.br/Incenso-natural-olibano-puro-medio)
- [Alecrim médio](https://www.incensofenix.com.br/incenso-natural-alecrim-medio)
- [Palo Santo Grande](https://www.incensofenix.com.br/incenso-natural-palo-santo-grande)
- [Mirra In Natura — 35 g no cadastro](https://www.incensofenix.com.br/mirra-in-natura-35g)

## 17. Conclusão operacional

O benchmark não pede uma caixa “mais bonita”. Pede uma cadeia mais confiável:

```text
amostra real
  → medidas e composição aprovadas
  → registro mestre do SKU
  → dieline/janela testados
  → arte e warnings
  → prova física preenchida
  → packshots/macros reais
  → PDP e estoque sincronizados
  → gate final de dados
```

Se HEAL cumprir essa cadeia, `Coreografia do ar` poderá entregar simultaneamente o que hoje está dividido entre os concorrentes: a prova material da Nirvana, a profundidade de galeria e informação da Fênix e um sistema de marca próprio que não depende de cor, claim espiritual ou ornamento genérico.
