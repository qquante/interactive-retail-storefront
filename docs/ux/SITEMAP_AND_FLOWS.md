# HEAL — Sitemap, jornadas e fluxos de UX

Data da pesquisa: 2026-08-28  
Owner: HEAL-05  
Task: HEAL-T004  
Estado real: `research` + especificação de UX; não representa catálogo, frete, estoque, checkout ou pós-compra integrados.

## 1. Decisão de UX

A loja deve funcionar em duas camadas, nesta ordem:

1. **Compreensão comercial:** deixar inequívoco que a HEAL vende incensos, como comparar as opções, quanto custa, se está disponível, como usar e quais cuidados exige.
2. **Expressão sensorial:** matéria, brasa e fumaça enriquecem a orientação e a atmosfera, mas nunca substituem nome, imagem, descrição, preço, estoque, frete ou CTA em HTML.

O eixo de descoberta recomendado é:

```text
atmosfera desejada
→ família aromática
→ descritores concretos
→ intensidade e nível de fumaça
→ produto
→ procedência, uso e segurança
→ frete e pagamento
```

Essa ordem reduz a incerteza de comprar um produto olfativo sem experimentá-lo. Uma pesquisa qualitativa com 27 compradores de perfume no Brasil, Irã e Portugal encontrou justamente na impossibilidade de testar a fragrância a principal desvantagem da compra online; é uma pista útil, mas não deve ser generalizada para incensos sem pesquisa própria da HEAL.

## 2. Evidência e implicações

| Sinal pesquisado | Implicação para a HEAL | Natureza da evidência |
|---|---|---|
| Produtos olfativos são difíceis de avaliar sem teste físico. | Traduzir aroma com família, notas percebidas, intensidade, fumaça, contexto de uso e comparação; não depender de prosa abstrata. | Pesquisa acadêmica qualitativa, categoria adjacente (perfume). |
| Pesquisa ecommerce precisa atender produto exato, tipo, atributo, ocasião e conteúdo não comercial. | Buscar por nome/SKU, “amadeirado”, “para presentear”, “modo de usar”, “trocas”; incluir produto, coleção, guia e política nos resultados. | Pesquisa observacional/benchmark Baymard e capacidade oficial Shopify. |
| Preço sem custo de entrega gera incerteza na PDP. | Exibir estimador de CEP próximo da compra e custo/prazo tão cedo quanto o backend permitir; nunca inventar estimativa. | Pesquisa de usabilidade Baymard. |
| Checkout convidado pode ser ignorado quando visualmente secundário. | No provedor futuro, “Comprar sem criar conta” deve ser explícito e prioritário; criação de conta fica opcional após a compra. | Pesquisa de usabilidade Baymard. |
| Filtros Shopify são derivados do catálogo e podem persistir em parâmetros de URL. | Não codificar facetas sem dados; renderizar somente filtros disponíveis e refletir estado na URL. | Documentação oficial Shopify Storefront API. |
| WCAG 2.2 exige reflow a 320 CSS px e prevê foco não encoberto, alternativa a arrastar e alvo mínimo. | Projetar 320 px desde o início; sticky CTA/drawers não encobrem foco; toda galeria e filtro funcionam sem drag; meta interna de toque 44×44, acima do mínimo AA de 24×24. | Norma W3C WCAG 2.2. |
| Formulários precisam de labels, instrução, erro textual e recuperação. | CEP, quantidade, contato e checkout preservam entradas válidas, associam erro ao campo e anunciam resultado sem depender de cor. | Tutoriais oficiais WAI/W3C. |
| Incenso envolve fogo e materiais combustíveis. | Modo de uso e cuidados ficam na PDP e no guia; conteúdo final deve usar instruções do fabricante e revisão responsável. | Orientação pública de prevenção dos Bombeiros/Defesa Civil; não substitui validação do produto. |

## 3. Públicos operacionais e necessidades

Não são personas demográficas inventadas. São modos de tarefa que uma mesma pessoa pode alternar.

### 3.1 Explorador iniciante

- Não domina famílias aromáticas nem vocabulário de perfumaria.
- Quer entender “como isso vai parecer no ambiente” sem promessas terapêuticas.
- Precisa de poucos caminhos claros, glossário curto e comparação lado a lado.
- Objeções: não poder sentir, comprar algo intenso demais, fumaça, segurança, procedência.

### 3.2 Comprador decidido ou de recompra

- Conhece nome, SKU, coleção ou característica.
- Precisa de busca visível, disponibilidade, preço, quantidade e compra rápida.
- Objeções: produto indisponível, frete descoberto tarde, carrinho perdido.

### 3.3 Comprador de presente

- Precisa selecionar por ocasião, faixa de preço, apresentação e prazo de entrega.
- Precisa saber o que acompanha o produto; embalagem/cartão só podem aparecer quando reais.
- Objeções: errar o aroma, atraso, política de troca pouco clara.

### 3.4 Comprador orientado por composição e segurança

- Procura ingredientes, origem, nível de fumaça, modo de uso e cuidados.
- Pode conviver com crianças, animais ou pessoas sensíveis; a HEAL não deve dar orientação médica ou veterinária individual.
- Objeções: informação vaga, “natural” sem definição, claims de cura, cuidados escondidos.

### 3.5 Comprador sensível a preço e operação

- Compara quantidade, preço, duração aproximada validada e custo total entregue.
- Precisa de parcelamento, Pix, boleto ou desconto apenas quando o checkout real suportar.
- Objeções: custos tardios, disponibilidade ambígua, política de devolução difícil de achar.

## 4. Gate de compreensão do produto

Antes de ativar Three.js, Anime.js ou conteúdo editorial longo, cada tela comercial deve passar pelo seguinte teste sem animação, sem hover e com imagens bloqueadas:

- o usuário identifica que o item é um incenso e em qual formato;
- entende como o aroma é descrito sem depender de metáfora;
- vê família, descritores, intensidade e nível de fumaça quando factuais;
- vê preço, quantidade, variante e estoque atuais;
- encontra estimativa de entrega ou uma explicação honesta de por que ainda não pode calculá-la;
- encontra modo de uso, cuidados e ingredientes/procedência disponíveis;
- distingue claramente narrativa sensorial de especificação factual;
- consegue adicionar ao carrinho e prosseguir sem WebGL;
- entende quando o fluxo é demonstração, sandbox ou checkout real.

Falhar em qualquer item bloqueia a camada sensorial naquela tela.

## 5. Sitemap proposto

```text
/
├── /colecoes
│   └── /colecoes/[slug]
├── /buscar?q=
├── /produtos/[slug]
├── /carrinho
├── /checkout                         # transição/handoff; não replica checkout hospedado
├── /sobre
├── /ingredientes-e-procedencia
├── /guia-do-ritual
├── /seguranca-e-cuidados
├── /journal
│   └── /journal/[slug]
├── /entrega-trocas-e-devolucoes
├── /privacidade-e-cookies
├── /termos
├── /contato
├── /acompanhar-pedido                # somente quando o provedor oferecer dado real
├── /pedido/confirmacao               # somente se o checkout puder retornar com segurança
├── /404
└── estados de erro por rota
```

### Regras de URL e escopo

- Slugs são estáveis, legíveis e em PT-BR.
- Filtros e ordenação persistem na URL para retorno e compartilhamento, mas indexação de combinações facetadas pertence ao contrato do HEAL-15.
- Busca persiste `q` na URL e no campo.
- URLs de produto não mudam com variante; a variante pode ser preservada por parâmetro ou fragmento quando o adapter de commerce suportar deep link.
- `/checkout` informa o domínio de destino e o estado do carrinho antes de redirecionar; não coleta cartão.
- Rotas de pedido nunca expõem dados pessoais em URL.
- `/acompanhar-pedido` não existe na navegação enquanto não houver operação real; contato/suporte é o fallback.

## 6. Navegação global

### Desktop

```text
[HEAL. CURA.] [Comprar ▾] [Como escolher] [Guia do ritual] [Sobre]
                                              [Buscar] [Carrinho (n)]
```

`Comprar` abre navegação simples com:

- Todas as coleções;
- Famílias aromáticas existentes no catálogo;
- Presentes/conjuntos somente se existirem;
- Ver todos os produtos.

### Mobile

```text
[Menu] [HEAL. CURA.] [Buscar] [Sacola n]
```

O menu cobre a navegação, mas não oculta busca nem carrinho. Ao abrir:

- foco vai para o título ou primeiro controle útil;
- conteúdo atrás fica inerte;
- `Esc`, botão Fechar e gesto de voltar fecham sem perder contexto;
- foco retorna ao acionador;
- não há navegação dependente de swipe.

### Rodapé

- Comprar: coleções, busca.
- Conhecer: sobre, ingredientes/procedência, guia, journal.
- Ajuda: entrega/trocas/devoluções, segurança/cuidados, contato, acompanhar pedido quando real.
- Legal: privacidade/cookies, termos.
- Identidade empresarial e canais somente com dados reais fornecidos.

Ajuda e contato mantêm rótulo e posição consistentes em todas as páginas, em linha com WCAG 2.2 `Consistent Help`.

## 7. Taxonomia de descoberta

### 7.1 Facetas propostas

Os valores abaixo são vocabulário candidato, não catálogo confirmado. HEAL-04/13 devem validar nomes e dados antes de exposição.

| Faceta | Valores candidatos | Regra de exibição |
|---|---|---|
| Família aromática | amadeirada, resinosa, herbal, floral, cítrica, especiada, terrosa | Exibir apenas valores atribuídos a produtos reais e explicados em linguagem comum. |
| Intensidade percebida | suave, média, marcante | Exige método editorial consistente; não equivale a efeito terapêutico. |
| Nível de fumaça | baixo, médio, alto | Exige medição/comparação interna documentada. |
| Atmosfera/ocasião | pausa, leitura/trabalho, receber, fim do dia, presente | Usar “para acompanhar”, nunca “trata”, “acalma” ou “melhora foco”. |
| Formato | vareta, cone, resina ou outros | Somente formatos vendidos. |
| Ingrediente | valores do catálogo | Factual, com grafia normalizada e origem quando sustentada. |
| Origem | local/fabricação informada | Factual; não inferir origem de ingrediente pela marca. |
| Tempo de queima | faixas a definir | Somente se medido e sustentado por variante. |
| Preço | faixa dinâmica | Derivada de variantes atuais. |
| Disponibilidade | em estoque | Derivada do commerce, nunca contador falso. |

### 7.2 Ordem dos filtros

1. Família aromática.
2. Intensidade percebida.
3. Nível de fumaça.
4. Atmosfera/ocasião.
5. Formato.
6. Disponibilidade.
7. Preço.
8. Ingrediente/origem/tempo, se o catálogo justificar.

Não apresentar mais facetas do que os dados e o tamanho do catálogo justificam. Em catálogo pequeno, chips editoriais ou coleções podem ser mais claros do que um painel de filtros vazio.

### 7.3 Busca

A busca deve suportar, por prioridade:

1. exata: nome, SKU;
2. tipo: incenso, vareta, cone;
3. atributo: amadeirado, suave, pouca fumaça, ingrediente;
4. ocasião: presente, receber, leitura;
5. conteúdo não comercial: uso, segurança, entrega, troca, contato;
6. erros simples, acentos, singular/plural e sinônimos aprovados.

Sugestões podem reunir `Produtos`, `Coleções`, `Guias e ajuda`. Autocomplete acessível segue o padrão WAI de combobox, com teclado e estado anunciado, ou permanece um campo nativo simples até a implementação completa do padrão.

Consultas de saúde como “incenso para ansiedade” não devem acionar promessa de produto. A recuperação segura é mostrar uma nota curta de limite de claim e caminhos para famílias aromáticas, guia de uso e cuidados; nunca diagnosticar ou recomendar tratamento.

### 7.4 Resultado zero

Nunca é um beco sem saída. Deve:

- repetir a consulta;
- sugerir correção quando houver confiança, sem substituir silenciosamente;
- oferecer remover filtros individualmente ou todos;
- mostrar famílias/coleções relacionadas por regra explícita;
- apontar busca, guia e contato;
- não inventar produto similar.

## 8. Hierarquia por tipo de página

### Home

1. Identidade + definição inequívoca do que é vendido.
2. Dois caminhos: `Explorar incensos` e `Como escolher`.
3. Famílias aromáticas com explicação curta.
4. Seleção comercial real, com preço e disponibilidade.
5. Método/ingredientes/procedência.
6. Guia breve de escolha e uso.
7. Narrativa de marca e journal.
8. Ajuda, entrega e políticas.

### Todas as coleções

- Título e explicação do sistema de famílias.
- Cards de coleção com nome, descrição concreta, quantidade de itens e imagem real.
- Atalho para `Como escolher`.
- Nenhuma coleção vazia.

### Coleção e busca

- Breadcrumb, H1, resumo e contagem.
- Ordenação e filtros com estado persistente.
- Chips de filtros aplicados e `Limpar tudo`.
- Grid/lista com nome, família, descritores-chave, preço e disponibilidade.
- Paginação ou `Carregar mais` com URL/estado recuperável; evitar scroll infinito como única navegação.
- Resultado zero contextual.

### PDP

Ordem decisória:

1. Breadcrumb e identidade do produto.
2. Galeria operável sem drag.
3. Família + descritores + intensidade/fumaça.
4. Nome, variante, preço, disponibilidade, quantidade e CTA.
5. CEP, menor custo/prazo ou estado indisponível.
6. Resumo “como perceber” separado de fatos técnicos.
7. Ingredientes, origem, fabricação e quantidade/dimensões.
8. Modo de uso e segurança.
9. Entrega, troca e devolução.
10. Conteúdo relacionado e produtos relacionados por regra verdadeira.

### Carrinho

- Itens, variante, preço unitário, quantidade e subtotal.
- Alteração de quantidade com validação de estoque.
- Remover com confirmação reversível/undo quando possível.
- Estimativa de frete e destino.
- Descontos somente com contrato real.
- Total explicitamente marcado como estimado ou final.
- CTA de checkout e link para continuar comprando.
- Recomendação nunca interrompe checkout e só aparece com relevância validada.

O mini-carrinho confirma adição e oferece `Ver carrinho`/`Finalizar`, mas a página `/carrinho` é a fonte visual autoritativa para revisão.

### Checkout/handoff

Na vertical slice fixture:

- faixa inequívoca “Demonstração — nenhum pagamento será processado”;
- resumo do carrinho e estado de frete simulado identificado;
- nenhum campo de cartão ou promessa de meio de pagamento;
- CTA não simula compra concluída.

Na integração futura:

- explicar que o usuário seguirá para o checkout seguro do provedor;
- preservar itens e totais do carrinho;
- dizer o domínio de destino;
- manter checkout convidado evidente;
- só listar Pix, boleto, cartão, parcelamento, prazo e frete que o provedor realmente retornar;
- falha ao criar `checkoutUrl` mantém carrinho e oferece retry/suporte.

### Ajuda, políticas e pós-compra

- Entrega/trocas/devoluções: prazos, custos, condições e processo em linguagem escaneável, após definição jurídica/operacional.
- Segurança/cuidados: chama, superfície, ventilação, crianças, animais, descarte e instrução específica do fabricante.
- Contato: canal, horário e expectativa de resposta reais.
- Confirmação: número do pedido, resumo, endereço mascarado, pagamento/entrega, próximos passos e suporte; sem analytics contendo dados pessoais.
- Acompanhamento: status textual, linha do tempo e instrução para exceção; depende da integração.

## 9. Jornadas e task flows

### J1 — Descoberta por atmosfera, usuário iniciante

```text
Home
→ “Como escolher” ou família
→ escolhe atmosfera sem promessa terapêutica
→ vê famílias compatíveis e por quê
→ aplica intensidade/fumaça
→ compara cards
→ PDP
→ valida composição, uso, segurança, preço, estoque e frete
→ adiciona ao carrinho
```

Pontos de controle:

- alternativa `Não sei escolher` sempre visível;
- glossário em linguagem comum;
- manter contexto e filtros ao voltar da PDP;
- nenhum efeito visual atrasa o primeiro acesso ao catálogo.

### J2 — Busca direta e recompra

```text
Busca global
→ digita nome/SKU/atributo
→ sugestão por teclado ou submit
→ resultado com correspondência explicada
→ PDP ou add-to-cart, se variante única e regra aprovada
→ carrinho preservado
```

Falha: sem resultado → correção, remoção de filtros, coleções e contato; consulta continua editável.

### J3 — Escolha para presente

```text
Home/Comprar
→ Presentes (somente se houver oferta real)
→ filtra por faixa/atmosfera/prazo
→ PDP informa conteúdo da embalagem
→ calcula entrega
→ carrinho
→ checkout convidado
```

Cartão, embrulho, mensagem e data garantida não aparecem até existirem operacionalmente.

### J4 — PDP até carrinho com frete

```text
PDP
→ seleciona variante
→ quantidade válida
→ informa CEP
→ recebe custo/prazo ou erro acionável
→ add-to-cart
→ confirmação anunciada
→ mini-carrinho ou continuar
→ carrinho completo
```

Regras:

- CEP aceita entrada com/sem hífen e teclado numérico apropriado;
- `Calcular` tem estado loading e evita múltiplos envios;
- erro não apaga CEP nem seleção;
- mudança de variante revalida estoque, preço e frete quando necessário;
- add-to-cart nunca avança com preço/estoque obsoleto sem mensagem.

### J5 — Estoque insuficiente

```text
seleciona quantidade
→ resposta do servidor informa limite disponível
→ mantém variante
→ ajusta para quantidade válida com consentimento
→ usuário confirma e adiciona
```

Produto esgotado: CTA `Adicionar` desabilitado com razão textual; aviso de reposição só aparece se houver fluxo/consentimento real.

### J6 — Carrinho até checkout hospedado

```text
/carrinho
→ revisa itens, frete e total
→ Finalizar compra
→ servidor cria/atualiza carrinho do provedor
→ /checkout confirma handoff
→ redireciona para checkoutUrl permitido
→ checkout convidado
→ pagamento no provedor
→ retorno/confirmacao quando suportado
```

Falha antes do redirecionamento: não esvaziar carrinho; mostrar ID de erro não sensível, retry e contato. Falha no provedor: retorno seguro ao carrinho quando tecnicamente permitido.

### J7 — Pós-compra e suporte

```text
confirmação
→ entende que pedido foi recebido ou pagamento está pendente
→ vê próximos passos
→ acompanha pedido
→ consulta uso/segurança
→ solicita suporte/troca
→ recompra opcional
```

Conta é opcional após a compra. Nunca bloquear confirmação por convite de cadastro, newsletter ou cross-sell.

### J8 — Erro técnico

```text
erro de catálogo/frete/carrinho
→ explica o que falhou e o que foi preservado
→ oferece Tentar novamente
→ alternativa segura: voltar, carrinho ou contato
→ sucesso atualiza só a região afetada e anuncia status
```

## 10. Estados críticos

| Área | Loading | Vazio | Erro | Sucesso/recuperação |
|---|---|---|---|---|
| Busca | Campo continua editável; sugestões com indicador discreto. | Consulta vazia mostra exemplos reais de busca. | Mensagem + submit normal/retry. | Contagem e termo no H1. |
| Coleção | Skeleton reserva dimensões; filtros não “pulam”. | Não publicar coleção vazia; se ocorrer, voltar a todas. | Preservar filtros e oferecer retry. | Resultados atualizados e contagem anunciada. |
| Filtro | Controle ocupado, sem mudar foco. | Valor sem item não aparece ou vem desabilitado com contagem 0. | Estado anterior preservado. | Chips, contagem e URL atualizados. |
| PDP | Conteúdo essencial SSR; mídia pode carregar depois. | Variante indisponível informada. | Preço/estoque desconhecido bloqueia compra. | Variante e frete coerentes. |
| Frete | Botão/área ocupada; CEP mantido. | CEP ainda não informado. | Motivo + correção/retry; não dizer “não entregamos” sem certeza. | Opções com custo e prazo, origem dos dados. |
| Carrinho | Alteração local bloqueia só a linha. | Orientação + coleções/busca. | Item e dados válidos preservados. | Total e contador anunciados. |
| Checkout | Criação de URL com limite de tempo e cancelamento. | Carrinho vazio retorna para comprar. | Carrinho preservado + retry/suporte. | Handoff explícito; nunca falso pedido. |
| Conteúdo | Título e navegação permanecem. | Página não publicada. | 404/500 útil. | Conteúdo datado quando pertinente. |

## 11. Regras mobile, teclado e toque

### 320–430 CSS px

- Uma coluna; bordas laterais mínimas de 16 px em 320.
- Nenhum preço, quantidade, CEP ou CTA truncado.
- Controles primários com área alvo interna de 44×44 CSS px; mínimo WCAG 2.2 de 24×24 continua sendo gate formal.
- Input de CEP e botões nunca dividem largura se isso produzir alvos estreitos; em 320 px podem empilhar.
- Sticky buy bar só aparece depois que o bloco de compra original saiu da viewport, inclui safe-area e some/reposiciona com teclado virtual.
- Chips podem quebrar linha; carrossel nunca é a única forma de acesso.
- Drawer de filtro usa tela inteira em 320, com título, contagem, Fechar, Limpar e Aplicar estáveis.
- Zoom a 200% e reflow não criam rolagem horizontal de página.

### 768–1920 CSS px

- Grade cresce pelo espaço útil, não por breakpoints arbitrários.
- PDP pode usar duas colunas quando a coluna de compra mantiver largura legível e ordem DOM coerente.
- Conteúdo editorial limita largura de linha.
- Em 1024 com zoom/reflow, layout retorna a uma coluna antes de encobrir controles.

### Teclado e tecnologias assistivas

- Skip link para conteúdo.
- Ordem DOM = ordem lógica; CSS não cria percurso visual contraditório.
- `Enter` submete busca/CEP; `Space` ativa botões; setas apenas em widgets que implementam o padrão correto.
- Dialogs/drawers contêm foco, têm nome, fecham com `Esc` e retornam foco.
- Mudança de carrinho é anunciada por região de status educada, sem roubar foco.
- Erros ficam em texto junto ao campo e em resumo linkável quando houver múltiplos.
- Sticky header, cookie banner, chat e buy bar não encobrem foco.
- Nenhuma ação depende exclusivamente de hover, cor, gesto complexo, arrastar ou orientação.

## 12. Instrumentação recomendada para validar os fluxos

Eventos são insumos para HEAL-20, não autorização de coleta:

- `select_discovery_path` com caminho `familia|atmosfera|busca|guia`;
- `search` com classificação não pessoal da query e resultado agregado; revisar antes de guardar texto livre;
- `apply_filter` com facet/value do vocabulário do catálogo;
- `view_shipping_estimate` com estado `success|unavailable|error`, sem CEP bruto;
- `add_to_cart` com ID/SKU e estado de estoque;
- `begin_checkout` e `checkout_handoff_error` sem dados pessoais;
- `view_safety_info` e `contact_support`.

Perguntas para teste moderado com 5–8 participantes por rodada, cobrindo iniciante/recompra/presente:

1. “O que esta loja vende?” após 5 segundos na Home.
2. “Encontre um incenso de perfil amadeirado e menos intenso.”
3. “O que você espera sentir e qual informação ainda falta?”
4. “Quanto custa receber no seu CEP e quando chega?”
5. “Onde estão ingredientes, modo de uso e cuidados?”
6. “Adicione duas unidades e prossiga sem criar conta.”
7. “Recupere-se de um CEP inválido e de estoque insuficiente.”
8. “Encontre a política de troca e um canal de ajuda.”

Critérios iniciais:

- 100% identifica “loja de incensos” sem depender de animação;
- pelo menos 80% conclui cada tarefa crítica sem ajuda na segunda rodada;
- nenhum participante interpreta atmosfera como alegação de tratamento;
- todos localizam preço, estoque, frete, segurança e checkout convidado;
- erros preservam dados válidos e podem ser corrigidos sem reiniciar o fluxo.

## 13. Pendências e dependências

- Catálogo, formatos, ingredientes, origem, quantidade, preço, estoque e dados de queima reais.
- Vocabulário aromático aprovado com método para intensidade e fumaça.
- Regras reais de frete, política de troca/devolução e atendimento.
- Decisão Shopify + credenciais para validar filtros, busca e checkout hospedado.
- Pesquisa própria com compradores de incenso no Brasil; referências de perfume são apenas adjacentes.
- Definição jurídica das páginas e claims.
- Estratégia de amostras/kit de descoberta, se houver viabilidade operacional.

## 14. Fontes consultadas

Consultadas em 2026-08-28:

- W3C, [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/).
- W3C WAI, [What's New in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/).
- W3C WAI, [Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) e [User Notification](https://www.w3.org/WAI/tutorials/forms/notifications/).
- W3C WAI-ARIA APG, [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) e [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).
- Shopify, [Storefront API — predictiveSearch](https://shopify.dev/docs/api/storefront/latest/queries/predictiveSearch), [search](https://shopify.dev/docs/api/storefront/latest/queries/search) e [Filter](https://shopify.dev/docs/api/storefront/latest/objects/Filter).
- Shopify, [Filter products in a collection with the Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/products-collections/filter-products).
- Baymard Institute, [Mobile E-Commerce Usability Guidelines](https://baymard.com/research/mcommerce-usability), [Ecommerce Search UX 2026](https://baymard.com/blog/ecommerce-search-query-types), [Product Page UX Best Practices](https://baymard.com/blog/current-state-ecommerce-product-page-ux), [Make Guest Checkout Prominent](https://baymard.com/blog/make-guest-checkout-prominent) e [Post-Checkout UX](https://baymard.com/blog/post-checkout-ux-best-practices).
- Barbosa, Mahdavi, Oliveira e Chkoniya (2021), [Buying Perfume in the Digital Age](https://doi.org/10.22452/ajba.vol14no1.1).
- Governo do Espírito Santo / Corpo de Bombeiros, [orientação para evitar incêndios em residências](https://www.es.gov.br/Noticia/corpo-de-bombeiros-orienta-populacao-para-evi).

## Handoff HEAL-05

### Para HEAL-06 — Frontend UX

- Especificar estados e contratos de interação da busca/combobox, filtros, galeria, CEP, quantidade, mini-carrinho, drawer e checkout handoff.
- Transformar a matriz de estados em acceptance criteria e anúncios de acessibilidade.
- Garantir preservação de dados, foco e retorno em todos os erros.

### Para HEAL-07 — Visual Design

- Criar hierarquia visual que mantenha definição do produto, comparação e compra antes do gesto sensorial.
- Visualizar família/intensidade/fumaça sem transformar escalas subjetivas em falsa precisão.
- Resolver 320 px e estados críticos em todas as três direções visuais.

### Para HEAL-12 — Mobile/Responsive

- Validar 320, 360, 390, 430, 768, 1024, 1440 e 1920 CSS px.
- Priorizar sticky CTA, teclado virtual, safe areas, drawers, zoom/reflow e retorno de contexto.
- Testar toque, teclado, portrait/landscape e rede lenta.

### Para HEAL-13 — Commerce

- Confirmar quais facetas existem de verdade no catálogo e como mapeiam para metafields/Storefront filters.
- Definir contratos de preço, estoque, CEP/frete, carrinho e `checkoutUrl`, inclusive estados de erro e idempotência.
- Preservar distinção explícita entre fixture, sandbox e checkout real.
