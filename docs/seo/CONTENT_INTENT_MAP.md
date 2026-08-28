# HEAL — Mapa de intenções e contrato editorial orgânico

Data da verificação: **2026-08-28**  
Owner: **HEAL-16 — SEO ecommerce, conteúdo e descoberta por IA**  
Estado real: **arquitetura editorial proposta sobre storefront fixture; sem dados de consulta, volume, Search Console ou validação com clientes**

## 1. Decisão executiva

A HEAL deve organizar a descoberta orgânica por **necessidades distintas da pessoa**, não por listas de palavras-chave. A arquitetura inicial tem quatro trabalhos:

1. entender o que a marca e o catálogo oferecem;
2. comparar opções sem confundir percepção, composição e origem;
3. avaliar um produto específico e sua compra;
4. usar o produto com segurança, somente quando existir instrução autoritativa por SKU.

Não há neste documento volume, dificuldade, posição, demanda ou potencial de receita. Qualquer “keyword prioritária” sem dados seria inventada. As formulações abaixo são **linguagem de intenção para modelar páginas e pesquisa**, não promessa de demanda.

## 2. Legenda de estado

- **Implementado:** existe no código atual e foi inspecionado em 2026-08-28.
- **Especificado:** contrato pronto, ainda não validado com conteúdo/comércio reais.
- **Hipótese:** direção a testar com usuários ou dados de busca; não autoriza publicação em escala.
- **Dependência externa:** requer decisão, fonte, conta, propriedade ou ativo fora desta execução.

### Baseline implementado

- rotas Home, coleções, coleção, PDP, busca, guias e páginas institucionais existem;
- a fixture permite crawl técnico apenas para que a metadata `noindex` seja lida; páginas comerciais não são elegíveis a indexação;
- catálogo, preço, estoque, composição, procedência, segurança e políticas são demonstrativos ou `[A VALIDAR]`;
- nenhum artigo real, schema comercial, sitemap de produção, Search Console ou Merchant Center está conectado.

## 3. Mapa de intenções por destino

| Destino | Trabalho principal da pessoa | Linguagem de intenção a pesquisar | Prova mínima para a página ter valor próprio | Estado/indexação |
|---|---|---|---|---|
| `/` | Entender rapidamente categoria, proposta e próxima escolha | marca HEAL; loja de incensos; como a marca organiza a escolha | proposta clara, categorias reais, prova da matéria/processo, links para catálogo e guias | **Implementado em fixture; noindex** |
| `/colecoes` | Ver todas as formas reais de explorar o catálogo | tipos/famílias/formatos de incenso disponíveis | coleções reais, critério explícito de agrupamento, imagem e quantidade coerentes | **Implementado em fixture; noindex** |
| `/colecoes/{handle}` | Comparar produtos que compartilham um critério real | navegar por família, formato, matéria ou contexto editorial | inventário distinto, intro específica, atributos comparáveis e links a PDPs | **Implementado só para `intervalos` fictício; noindex** |
| `/produtos/{handle}` | Entender e comprar um SKU/variante específico | nome do produto; composição; origem; formato; percepção; uso; preço; disponibilidade | produto e fotos reais, fatos por SKU, metodologia sensorial quando aplicável, preço/estoque atuais, cuidado e política | **Implementado em fixture; noindex** |
| `/como-escolher` | Aprender a comparar opções antes de decidir | como escolher incenso; diferenças entre família, nota, ingrediente, intensidade e fumaça | método de comparação, exemplos reais do catálogo, limites e links para coleções/PDPs | **Esqueleto implementado; conteúdo real bloqueado** |
| `/materia` | Entender composição, procedência e processo da HEAL | do que é feito; origem; fabricação; diferença entre ingrediente e nota | documentos/fichas por SKU, método, fornecedor/origem no escopo autorizado, datas e limitações | **Esqueleto implementado; fatos externos ausentes** |
| `/guia` | Executar uso, manutenção e descarte com segurança | como usar/posicionar/finalizar/guardar/descartar o formato adquirido | instrução do fabricante vinculada ao SKU, reviewer, data e alerta de escopo | **Esqueleto implementado; deliberadamente vazio** |
| `/seguranca` | Consultar riscos, precauções e resposta a incidentes | segurança de uso do formato real; ventilação; crianças/animais/sensibilidades | fonte do fabricante, revisão jurídico-regulatória, limites e canal de suporte | **Esqueleto implementado; não indexável até aprovação** |
| `/journal` | Encontrar conteúdo original de matéria, método e observação | perguntas que exigem experiência, teste ou documentação própria | artigo com autor, data, método/fontes, mídia própria, contribuição original e revisão | **Hub vazio implementado; sem artigos/indexação** |
| `/sobre` | Verificar quem é a marca e por que confiar | HEAL/Heal Incensos; empresa; pessoas; propósito; práticas | história verificável, responsáveis, identidade empresarial e contrato de prova | **Esqueleto implementado; biografia externa ausente** |
| `/entrega-trocas`, `/privacidade`, `/termos`, `/contato` | Resolver confiança operacional e direitos | entrega; devolução; privacidade; termos; suporte da marca | texto vigente coerente com operação, owner, contato e data | **Templates implementados; não são políticas vigentes** |
| `/busca` | Encontrar entidade ou conteúdo já existente | nome, família, ingrediente real, guia | índice real, resultados úteis e estado zero; URL de busca permanece fora do índice | **Interface demonstrativa; sempre noindex** |
| carrinho/checkout | Concluir compra, não captar busca | nenhuma intenção orgânica alvo | fluxo seguro, privado e funcional | **Fixture; sempre noindex e fora de sitemap** |

### Limite de saúde e vulnerabilidade

Consultas como “incenso para ansiedade”, “incenso para insônia”, “incenso para foco”, cura de doença, repelência ou segurança para grupo sensível **não viram landing pages comerciais**. Se surgirem na busca interna, a resposta deve explicar o limite de claim e apontar para informações factuais de composição/segurança, sem diagnóstico ou recomendação terapêutica.

## 4. Templates de página

Os templates definem **blocos de evidência**, não contagem de palavras. Não há tamanho ideal universal de página segundo a orientação oficial do Google.

### 4.1 Home

1. categoria e proposta em linguagem literal;
2. duas ou três entradas reais para escolha;
3. amostra de catálogo comprável;
4. contrato de prova: composição, procedência, percepção, uso e operação;
5. link editorial para “como escolher”;
6. confiança operacional e contato verificáveis.

**Evitar:** manifesto abstrato que não diz “incensos”, hero dependente de WebGL, repetição do texto de coleções ou claims ligados ao nome “CURA”.

### 4.2 Hub de coleções

1. H1 e explicação do sistema de organização;
2. card de cada coleção com critério distinto;
3. orientação sobre a diferença entre família aromática, ingrediente, formato e contexto;
4. links para guia de escolha e matéria.

Uma coleção só existe quando seu critério é verificável e há inventário suficiente para uma escolha real. Não criar coleção vazia para capturar consulta.

### 4.3 Coleção

1. título e definição específica do agrupamento;
2. como o critério foi aplicado e suas limitações;
3. produtos reais com atributos comparáveis;
4. filtros apenas quando alteram utilidade;
5. orientação curta própria, sem copiar o guia inteiro;
6. links para método/fonte e PDPs.

### 4.4 PDP

1. nome, variante/SKU, mídia documental e estado comercial;
2. resumo de escolha sem benefício médico;
3. preço, disponibilidade e CTA consistentes com fonte autoritativa;
4. percepção: família/notas/intensidade/fumaça com método e data;
5. fatos: formato, composição, origem, quantidade e processo;
6. uso e segurança específicos do produto;
7. entrega/trocas vigentes;
8. perguntas frequentes visíveis somente quando ajudam a compra, sem `FAQPage` por expectativa de rich result;
9. relacionados por regra explicável, não por texto duplicado.

### 4.5 Guia de escolha

1. decisão que a pessoa precisa tomar;
2. diferenças terminológicas;
3. método de comparação;
4. exemplos reais e fotografias próprias;
5. tabela/fluxo de decisão acessível;
6. limites do que a tela não permite perceber;
7. próximos passos para coleção/PDP.

### 4.6 Matéria/procedência

1. definição de composição, nota percebida, origem e fabricação;
2. fonte autoritativa por tipo de dado;
3. documentos/método e data da última revisão;
4. exemplos reais do catálogo;
5. lacunas declaradas;
6. link para cada PDP coberta.

### 4.7 Artigo de Journal

1. título descritivo, sem choque ou promessa;
2. resposta/observação própria logo no início;
3. autoria e competência/experiência relevante;
4. como o conteúdo foi produzido;
5. evidências, fontes primárias e mídia própria;
6. distinção entre observação, dado externo e interpretação;
7. data de publicação e de revisão;
8. limites e conflitos/interesses comerciais;
9. conexão contextual a guia, matéria, coleção ou produto;
10. histórico de atualização quando a conclusão mudar.

## 5. Prevenção de canibalização

### Regra de ownership

Cada intenção primária tem um único owner:

- **categoria/seleção comercial:** coleção;
- **entidade comercial específica:** PDP;
- **método de comparação:** `/como-escolher`;
- **composição/procedência institucional:** `/materia`;
- **procedimento e cuidado:** `/guia` ou `/seguranca`, conforme risco;
- **investigação/experiência pontual:** artigo do Journal;
- **marca/empresa:** `/sobre`.

Uma página pode responder dúvidas secundárias, mas deve apontar ao owner em vez de republicar o mesmo bloco integral.

### Registro obrigatório antes de criar URL

| Campo | Pergunta de aceite |
|---|---|
| Intenção primária | Qual tarefa distinta esta página resolve? |
| Owner existente | Já há URL que resolve essa tarefa? |
| Delta de valor | Qual evidência, método, inventário ou formato novo existe? |
| Entidade | Produto, coleção, método ou organização estão inequivocamente identificados? |
| Fonte e reviewer | Quem sustenta e revisa as afirmações? |
| Destino interno | De quais páginas recebe links e para quais conduz? |
| Manutenção | Quem atualiza e qual evento invalida o conteúdo? |

Se não houver delta, atualizar/consolidar a URL existente. Se houver variação apenas lexical, não criar URL.

### Casos de conflito previstos

- “família aromática” explicada de forma completa em `/como-escolher`; coleção contém apenas definição contextual e exemplos;
- composição/origem autoritativa vivem na PDP e no modelo de `/materia`; artigo não substitui ficha de produto;
- instrução por SKU vive na PDP e referencia o guia; o guia não contradiz rótulo;
- páginas de contexto (“para ler”, “para receber”) só existem com curadoria real, seleção distinta e limite editorial; não prometer efeito psicológico;
- filtros, ordenações, busca e paginação não se tornam landings automaticamente.

## 6. Prevenção de thin content e conteúdo escalado

Uma URL indexável precisa passar todos os gates:

1. resolve uma tarefa que não é satisfeita por outra URL;
2. contém contribuição própria: teste, método, documento, fotografia, comparação ou análise;
3. identifica autor/owner e data;
4. distingue fatos, percepção e hipótese;
5. possui pelo menos um próximo passo útil e links internos contextuais;
6. não depende de texto gerado em massa, rewrite de concorrente ou FAQ fan-out;
7. tem ativos e direitos compatíveis;
8. claims e segurança foram aprovados no escopo correto;
9. dados comerciais batem com a fonte de commerce;
10. haverá manutenção quando produto, política ou evidência mudar.

### Ação quando a página falha

| Situação | Ação |
|---|---|
| Conteúdo ainda necessário à UX, mas sem prova | manter `noindex` e explicitar pendência |
| Mesma intenção e pouco delta | fundir e redirecionar somente após mapa de links/URLs |
| Produto removido com informação/substituto útil | avaliar manter 200 com estado real e alternativas |
| Produto/entidade inexistente | 404 útil; não servir shell vazio com 200 |
| Filtro sem valor editorial | fora do sitemap; `noindex,follow` quando acessível |
| Pauta criada só por volume/fan-out | cancelar |

## 7. Workflow editorial e E-E-A-T como prova

E-E-A-T não é “score” nem um campo de schema. O workflow usa **Who, How, Why** e trata confiança como resultado verificável.

1. **Brief:** tarefa da pessoa, owner de intenção, entidade, delta e dependências.
2. **Fonte:** priorizar documentação do fabricante, contrato/ficha interna aprovada, teste HEAL documentado e fonte primária externa.
3. **Produção:** autor identificado; IA pode auxiliar, mas não cria experiência, teste ou fact comercial.
4. **How:** registrar método, amostra, ambiente, limitações, mídia original e uso substancial de automação.
5. **Claims gate:** classificar cada claim como permitido, condicionado ou bloqueado; saúde, segurança, origem, sustentabilidade e desempenho exigem revisão específica.
6. **Commerce gate:** preço, estoque, variante, shipping e política vêm do mesmo source of truth do storefront/feed.
7. **Mídia/rights gate:** vínculo com SKU, direitos, proveniência e alt contextual.
8. **Revisão independente:** conteúdo, assunto/produto e claims; jurídico/regulatório quando aplicável.
9. **Publicação:** metadata descritiva, canonical, links, schema apenas elegível e registro de versão.
10. **Manutenção:** revisão por evento — mudança de SKU/fórmula, fornecedor, rótulo, política, método ou fonte — e não troca artificial de data.

### Registro mínimo por artigo

`content_id`, URL, intenção owner, autor, reviewer, data, fontes, método, produtos cobertos, claims aprovados, ativos/direitos, uso de IA, próxima revisão e motivo de atualização.

## 8. Descoberta de demanda sem inventar keywords

### Antes do lançamento — hipótese

- entrevistas e testes de navegação com P0/P1/P2;
- vocabulário usado em atendimento e pesquisa qualitativa;
- auditoria manual de SERPs apenas para entender formatos e entidades, sem copiar conteúdo;
- taxonomia real do catálogo e dúvidas surgidas no cadastro.

### Depois de propriedade e tráfego — dependência externa

- Search Console: consultas/páginas/impressões/cliques/CTR/posição da Search convencional;
- relatório generativo do Google, se liberado: impressões por página, país, data e dispositivo;
- Bing Webmaster Tools: consultas/clicks da busca e AI Performance, se disponível;
- busca interna: termos, zero-results e refinamentos, com minimização/consentimento aplicáveis;
- Merchant Center: termos/superfícies e problemas de produto disponibilizados pela conta;
- dados de venda: receita e margem continuam separados de visibilidade orgânica.

Somente após amostra suficiente, um owner pode transformar a linguagem de intenção em mapa final de consultas. Volume de ferramenta não substitui valor próprio nem valida claim.

## 9. Métricas por camada

| Camada | Métrica correta | Não concluir |
|---|---|---|
| Cobertura | URLs indexáveis, escolhidas como canônicas, erros/avisos | “mais páginas = mais autoridade” |
| Descoberta convencional | impressões, cliques, CTR, posição por página/consulta/dispositivo | causalidade sem teste e contexto |
| Generativa Google | impressões e páginas no relatório, se disponível | clique, CTR, query, ranking ou receita quando não reportados |
| Generativa Bing | citações totais, média de páginas citadas, grounding queries amostrais e citações por URL | colocação, autoridade, importância ou conversão |
| Conteúdo | conclusão da tarefa, retorno à SERP, leitura útil, navegação ao próximo passo | word count ou scroll como qualidade isolada |
| Commerce | view → seleção → add → checkout → compra autoritativa | atribuir venda a impressão generativa |
| Qualidade | factualidade, atualização, claims/rights incidents, divergência commerce/feed | publicação em volume como produtividade |

## 10. Backlog priorizado

### P0 — antes de remover `noindex`

1. Receber catálogo/SKU, mídia documental, preço, estoque, políticas, empresa e fontes de segurança.
2. Definir owner de claims e workflow de aprovação.
3. Substituir a fixture sem campos demonstrativos escondidos.
4. Aprovar intenção e prova de cada coleção/PDP real.
5. Configurar origem canônica, sitemap e schema somente com dados visíveis e consistentes.

### P1 — lançamento orgânico

1. Produzir `/como-escolher` com método e exemplos reais.
2. Publicar `/materia` com fontes, escopo e lacunas.
3. Completar `/sobre` e páginas operacionais verificáveis.
4. Criar registro editorial e templates do Journal; publicar poucas peças de primeira mão.
5. Conectar Search Console/Bing somente com autorização e estabelecer baseline.

### P2 — após dados reais

1. Avaliar novas coleções/landings somente por necessidade distinta e inventário suficiente.
2. Consolidar páginas concorrentes usando dados por URL/consulta e pesquisa com usuários.
3. Testar formatos originais — comparação, método, foto, vídeo — pela conclusão da tarefa, não por volume.
4. Reavaliar periodicidade e despublicar conteúdo obsoleto com plano de URL.

## 11. Fontes oficiais consultadas

Consulta em **2026-08-28**:

- [Google — conteúdo útil, confiável e people-first; Who, How, Why e E-E-A-T](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google — guia oficial para recursos generativos na Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google — políticas de spam](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google — relatório generativo da Search no Search Console](https://support.google.com/webmasters/answer/16984139)
- [Bing — AI Performance no Webmaster Tools, public preview](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)

## Handoff

- **HEAL-04:** usar templates e registro editorial; não converter linguagem de intenção em listas de páginas antes de prova/dados.
- **HEAL-13/14:** fornecer source of truth comercial e eventos de invalidação.
- **HEAL-15:** implementar indexação/canonical/schema apenas depois dos gates P0.
- **HEAL-19:** aprovar claims, segurança, políticas e disclosures.
- **HEAL-20:** separar visibilidade, comportamento e compra autoritativa no measurement plan.
- **HEAL-21/22:** auditar duplicação, intenção owner, factualidade e renderização antes do release.
