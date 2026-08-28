# HEAL — Wireframes textuais de baixa fidelidade

Data: 2026-08-28  
Owner: HEAL-05  
Task: HEAL-T004  
Estado: especificação; conteúdo entre colchetes depende de copy, catálogo ou integração real.

## 1. Convenções

```text
[Ação]       botão ou link acionável
<Campo>      input/select
{Estado}     feedback dinâmico
(Dado)       conteúdo vindo de catálogo/commerce
┌───┐        região visual; não implica borda no design final
```

Todos os wireframes funcionam sem WebGL, animação, hover ou gesto de arrastar. A ordem desenhada é também a ordem semântica/DOM, salvo indicação explícita. Os rótulos são funcionais, não copy final.

## 2. Regras transversais da vertical slice

- Rotas: Home → coleção → PDP → add-to-cart → carrinho → checkout/handoff.
- Header mantém logo, busca e carrinho em todas as rotas comerciais.
- Faixa `DEMONSTRAÇÃO` aparece sempre que catálogo, preço, frete ou checkout forem fixture.
- CTA primário nunca depende da cena sensorial.
- Mobile 320 px usa 16 px de margem: 288 px úteis; inputs e botões empilham quando lado a lado ficariam estreitos.
- Meta interna de toque: 44×44 CSS px. Links inline podem usar exceção textual WCAG.
- Imagem de produto sempre tem dimensões reservadas e fallback textual/visual.
- Sticky header/buy bar respeitam `scroll-padding`, safe-area e foco; buy bar some ao abrir teclado.
- Busca, filtros, menu e carrinho modal seguem padrões acessíveis completos ou usam páginas dedicadas até isso existir.

## 3. Home

### 3.1 Mobile — 320/390/430

```text
┌────────────────────────────┐
│ [Pular para o conteúdo]    │
│ {DEMONSTRAÇÃO, se fixture} │
├────────────────────────────┤
│ [Menu] HEAL. CURA. [Busca] │
│                    [Sacola]│
├────────────────────────────┤
│ H1 [Definição clara:       │
│ incensos + proposta]       │
│ [Explicação funcional]     │
│ [Explorar incensos]        │
│ [Como escolher]            │
│ ┌────────────────────────┐ │
│ │ assinatura sensorial   │ │
│ │ decorativa/fallback    │ │
│ └────────────────────────┘ │
├────────────────────────────┤
│ H2 Escolha por família     │
│ [Card família 1]           │
│ [Card família 2]           │
│ [Ver todas as famílias]    │
├────────────────────────────┤
│ H2 Incensos em destaque    │
│ [Produto: imagem]          │
│ (nome) (família)           │
│ (descritores)              │
│ (preço) (estoque)          │
│ [Ver produto]              │
├────────────────────────────┤
│ H2 Como escolher           │
│ 1 família  2 intensidade   │
│ 3 fumaça   4 uso/cuidados  │
│ [Abrir guia]               │
├────────────────────────────┤
│ H2 Matéria e procedência   │
│ [Somente fatos validados]  │
│ [Conhecer o processo]      │
├────────────────────────────┤
│ Entrega | Segurança | Ajuda│
│ Rodapé completo            │
└────────────────────────────┘
```

O primeiro viewport deve responder “o que vende” e oferecer acesso ao catálogo. A assinatura Three.js, quando existir, é decorativa, lazy e vem depois do H1/CTAs no DOM.

### 3.2 Desktop — 1024/1440/1920

```text
┌──────────────────────────────────────────────────────────────┐
│ {DEMONSTRAÇÃO}                                               │
│ HEAL. CURA.  Comprar  Como escolher  Guia  Sobre  Busca  Cart│
├──────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────┐ ┌─────────────────────────────┐ │
│ │ H1 incensos + proposta   │ │ cena sensorial/fallback    │ │
│ │ explicação funcional     │ │ aria-hidden; sem bloquear  │ │
│ │ [Explorar] [Escolher]    │ │ interação/conteúdo         │ │
│ └──────────────────────────┘ └─────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│ H2 Famílias                                                   │
│ [Família 1] [Família 2] [Família 3] [Ver todas]              │
├──────────────────────────────────────────────────────────────┤
│ H2 Destaques                                                  │
│ [Produto 1] [Produto 2] [Produto 3]                           │
├──────────────────────────────────────────────────────────────┤
│ [Como escolher — 4 passos]   [Matéria/procedência]            │
├──────────────────────────────────────────────────────────────┤
│ Rodapé                                                        │
└──────────────────────────────────────────────────────────────┘
```

Em 1024, reduzir quantidade de colunas antes de estreitar cards. Em 1920, limitar conteúdo a um container; não esticar texto/galeria indefinidamente.

## 4. Coleções e resultados

### 4.1 Todas as coleções — mobile

```text
[Header]
[Breadcrumb: Início / Coleções]
H1 Famílias aromáticas
[Como usar as famílias para escolher]

[Card família]
  [imagem]
  (nome)
  [descrição concreta]
  (n produtos)
  [Explorar]

[Card família ...]
[Não sabe escolher? Abrir guia]
[Rodapé]
```

### 4.2 Coleção/busca — mobile

```text
[Header]
[Breadcrumb]
H1 (Coleção ou Resultados para “q”)
[descrição curta]
(n resultados)

┌────────────────────────────┐
│ [Filtrar (n)] [Ordenar ▾]  │
│ [chip ativo ×] [Limpar]    │
└────────────────────────────┘

[Card produto]
  [imagem + fallback]
  (família)
  (nome)
  (2–3 descritores)
  Intensidade (texto/escala)
  Fumaça (texto/escala)
  (preço)  (estoque)
  [Ver produto]

[Carregar mais] ou [Paginação]
[Rodapé]
```

Em 320 px, cards ficam em uma coluna. Em 390/430, duas colunas só se nome, preço e alvos permanecerem legíveis; a vertical slice deve preferir uma coluna até validação visual.

### 4.3 Coleção/busca — desktop

```text
[Header]
[Breadcrumb]
H1 (coleção)                         (n itens) [Ordenar ▾]
[descrição]
┌──────────────────┬───────────────────────────────────────────┐
│ FILTROS          │ [chip ×] [chip ×] [Limpar tudo]          │
│ Família          │                                           │
│ Intensidade      │ [Produto] [Produto] [Produto]             │
│ Fumaça           │ [Produto] [Produto] [Produto]             │
│ Ocasião          │                                           │
│ Disponibilidade  │ [Carregar mais/Paginação]                 │
│ Preço            │                                           │
└──────────────────┴───────────────────────────────────────────┘
```

#### Drawer de filtros mobile

```text
┌────────────────────────────┐
│ H2 Filtrar       [Fechar]  │
│ (n resultados previstos)   │
├────────────────────────────┤
│ Família [expandido]        │
│ □ Amadeirada (n)           │
│ □ Resinosa (n)             │
│ Intensidade [recolhido]    │
│ Fumaça [recolhido]         │
│ ...                        │
├────────────────────────────┤
│ [Limpar] [Ver n produtos]  │
└────────────────────────────┘
```

- Tela inteira em 320 px; foco contido e título anunciado.
- Seleção não fecha drawer; `Ver n produtos` aplica de uma vez.
- Ao aplicar, foco retorna para `Filtrar` e a contagem de resultados é anunciada.
- Parâmetros ficam na URL; voltar restaura filtros e posição aproximada.

#### Resultado zero

```text
H1 Nenhum resultado para “(q)”
[Verifique a escrita ou remova um filtro]
[Editar busca]
[chip filtro ×] [Limpar filtros]
H2 Caminhos possíveis
[Famílias relacionadas por regra] [Guia] [Contato]
```

## 5. Busca global

### Mobile

```text
┌────────────────────────────┐
│ [Voltar] H1 Buscar         │
│ <O que você procura?> [×] │
│ {status carregando/erro}   │
├────────────────────────────┤
│ Sugestões de busca         │
│ [consulta sugerida]        │
│ Produtos                   │
│ [mini produto]             │
│ Coleções                   │
│ [família]                  │
│ Guias e ajuda              │
│ [segurança] [entrega]      │
│ [Ver todos os resultados]  │
└────────────────────────────┘
```

O teclado virtual não pode cobrir `Ver todos`. Se autocomplete não implementar completamente combobox/teclado, usar campo + submit + página de resultados, sem ARIA parcial.

### Desktop

Overlay leve abaixo do header, não modal por padrão. `Esc` fecha; setas percorrem sugestões; `Enter` seleciona; texto ativo é editável. Conteúdo comercial segue acessível caso JavaScript falhe.

## 6. Página de produto

### 6.1 Mobile — prioridade de decisão

```text
[Header]
[Breadcrumb]
(família)
H1 (nome do incenso)
[descritores concretos]

┌────────────────────────────┐
│ imagem principal           │
│ [Anterior] 1/4 [Próxima]   │
│ [Miniaturas como botões]   │
└────────────────────────────┘

Intensidade: (suave/média/...)
Fumaça: (baixo/médio/...)
[Como interpretar estas escalas]

(variante) <Selecionar>
(preço)   {estoque}
Quantidade [-] (1) [+]
[Adicionar à sacola]
{status anunciado}

H2 Entrega
<CEP> [Calcular]
{custo + prazo | erro | indisponível}
[Política de entrega]

H2 Como perceber
[família, notas e evolução; percepção, não fato absoluto]

[Acordeão Ingredientes e origem]
[Acordeão Quantidade e duração]
[Acordeão Modo de uso]
[Acordeão Segurança e cuidados]
[Acordeão Trocas e devoluções]

H2 Compare/relacionados
[produtos por regra explícita]
[Rodapé]

┌────────────────────────────┐
│ (preço) [Adicionar]        │ ← sticky só após bloco original
└────────────────────────────┘
```

Regras 320 px:

- CEP e `Calcular` empilham se cada um não mantiver alvo e label.
- Quantidade usa input/stepper com nome acessível; digitação manual continua possível.
- Galeria oferece botões; swipe é opcional.
- Acordeões usam headings/buttons nativos e preservam conteúdo indexável no HTML.
- Sticky CTA não aparece com teclado aberto, drawer ou dialog e não encobre foco.

### 6.2 Desktop

```text
[Header]
[Breadcrumb]
┌────────────────────────────────┬─────────────────────────────┐
│ [miniaturas] [imagem principal]│ (família)                   │
│                                │ H1 (nome)                   │
│                                │ (descritores)               │
│                                │ intensidade / fumaça        │
│                                │ (variante)                  │
│                                │ (preço) {estoque}           │
│                                │ quantidade                  │
│                                │ [Adicionar]                 │
│                                │ CEP / custo / prazo         │
└────────────────────────────────┴─────────────────────────────┘
[Como perceber] [Fatos do produto]
[Ingredientes/origem] [Uso/segurança]
[Entrega/trocas]
[Relacionados]
```

A coluna de compra pode ser sticky somente se não encobrir foco e couber integralmente; em 1024/zoom retorna a fluxo normal.

### Estados PDP

| Estado | Comportamento obrigatório |
|---|---|
| Sem estoque | Razão textual, CTA desabilitado, sem urgência falsa. |
| Variante indisponível | Mantém seleção visível e orienta outra variante; não troca silenciosamente. |
| Preço/estoque desconhecido | Bloqueia add-to-cart e oferece retry. |
| Imagem ausente | Placeholder neutro + nome; layout não colapsa. |
| CEP inválido | Erro junto ao campo, exemplo de correção, valor preservado. |
| Frete indisponível | Distingue “não calculado”, “erro temporário” e “não atendido”. |
| Add-to-cart loading | Bloqueia reenvio só do CTA; não congela a página. |
| Quantidade excedida | Informa máximo retornado; usuário confirma ajuste. |

## 7. Mini-carrinho e carrinho

### Mini-carrinho mobile/desktop

```text
┌────────────────────────────┐
│ H2 Adicionado à sacola [×]│
│ [imagem] (nome/variante)   │
│ qtd (n)  (preço)           │
│ Subtotal (valor)           │
│ [Ver sacola]               │
│ [Finalizar compra]         │
│ [Continuar comprando]      │
└────────────────────────────┘
```

Abre apenas por ação do usuário. Foco vai ao título/primeiro elemento útil, fica contido e retorna ao `Adicionar`. Como alternativa de menor risco na vertical slice, mostrar toast/status e navegar para `/carrinho` por ação explícita.

### Carrinho mobile

```text
[Header]
H1 Sua sacola (n)

[Item]
  [imagem] (nome)
  (variante) (preço unitário)
  Qtd [-] (n) [+]
  [Remover]
  {estoque/erro da linha}

H2 Entrega
<CEP> [Calcular]
{opções/custo/prazo}

Cupom [Expandir]             ← só se suportado
Subtotal (valor)
Frete (calculado/a calcular)
Desconto (se validado)
Total estimado/final (valor)
[Finalizar compra]
[Continuar comprando]
[Políticas e segurança]
```

### Carrinho desktop

```text
H1 Sua sacola
┌──────────────────────────────────┬───────────────────────────┐
│ itens / qtd / preço / remover    │ Resumo                    │
│                                  │ CEP + opções              │
│                                  │ subtotal / frete / total  │
│                                  │ [Finalizar compra]        │
└──────────────────────────────────┴───────────────────────────┘
```

#### Carrinho vazio

```text
H1 Sua sacola está vazia
[Explicação curta]
[Explorar incensos]
[Como escolher]
```

## 8. Checkout/handoff

### Fixture da vertical slice

```text
[Header mínimo: logo + voltar à sacola]
┌────────────────────────────┐
│ DEMONSTRAÇÃO               │
│ Nenhum pagamento real será │
│ processado.                │
└────────────────────────────┘
H1 Revisão do handoff
[Itens, subtotal, frete simulado rotulado, total]
[O checkout real dependerá do provedor aprovado]
[Voltar à sacola]
[Encerrar demonstração]      ← não diz “Pagar”/“Pedido concluído”
```

### Integração futura com checkout hospedado

```text
[Logo] [Voltar à sacola]
H1 Continuar para o checkout
[Resumo e total atualizados pelo servidor]
[Você será direcionado para (provedor/domínio)]
[Comprar sem criar conta estará disponível, se confirmado]
[Continuar com segurança]
{loading | erro + retry + suporte}
```

Não coletar cartão, Pix ou boleto nesta rota. Não listar meios de pagamento antes de confirmação do provedor. Se a criação de `checkoutUrl` falhar, o carrinho permanece intacto.

## 9. Conteúdo, ajuda e políticas

### Guia do ritual

```text
[Header + breadcrumb]
H1 Como escolher e usar
[Navegação nesta página]
H2 1. Entenda as famílias
H2 2. Compare intensidade e fumaça
H2 3. Prepare o local
H2 4. Acenda conforme fabricante
H2 5. Cuidados e descarte
[Explorar produtos]
[Segurança completa]
```

### Política/ajuda

```text
[Header + breadcrumb]
H1 (Entrega, trocas e devoluções)
[Resumo objetivo]
[Última atualização factual]
H2 Prazos
H2 Custos
H2 Como solicitar
H2 Exceções
[Contato real]
```

Não publicar texto jurídico genérico como política operacional. Se faltarem dados, usar placeholder interno não indexável e bloquear release.

## 10. Pós-compra

Só implementar com retorno seguro do provedor.

```text
H1 Pedido recebido | Pagamento pendente | Falha
{status textual inequívoco}
(número do pedido)
[Resumo dos itens]
[Entrega e endereço mascarado]
[Próximos passos]
[Acompanhar pedido]
[Contato]
[Modo de uso e segurança]
[Criar conta opcional após compra, se existir]
```

Nunca usar animação de sucesso antes da confirmação autoritativa. Newsletter, conta e recompra são secundárias.

## 11. 404 e erros

### 404

```text
[Header]
H1 Página não encontrada
[A página pode ter mudado ou o endereço está incorreto]
<Buscar na HEAL> [Buscar]
[Ir para o início]
[Ver coleções]
[Ajuda]
```

### 500/indisponibilidade

```text
H1 Não foi possível carregar esta parte
[O que falhou: catálogo/frete/carrinho, sem jargão]
[O que foi preservado]
[Tentar novamente]
[Voltar a local seguro]
[Contato + ID não sensível]
```

### Falha parcial

Não substituir toda a página por erro se apenas imagem, recomendações ou cena 3D falharem. Conteúdo, preço, estoque e compra seguem disponíveis quando a fonte autoritativa estiver íntegra.

## 12. Matriz responsiva da vertical slice

| Viewport | Home | Coleção | PDP | Carrinho | Handoff |
|---|---|---|---|---|---|
| 320 | 1 coluna; cena após CTA | 1 coluna; filtro full-screen | 1 coluna; CEP empilha; buy bar segura | itens empilhados | resumo 1 coluna |
| 360/390/430 | 1 coluna; cards podem variar após QA | 1–2 colunas só se legível | 1 coluna | 1 coluna | 1 coluna |
| 768 | grid 2 colunas | filtros drawer ou barra | 1 coluna larga | 1 coluna larga | container médio |
| 1024 | hero 2 colunas com fallback | sidebar opcional | 2 colunas se compra couber | 2 colunas se resumo couber | container médio |
| 1440/1920 | container limitado | sidebar + 3/4 cards | galeria + compra | itens + resumo | container médio |

Em todos: zoom 200%, orientação landscape, teclado virtual, reduced motion, mídia ausente, rede lenta e WebGL desativado.

## 13. Acceptance criteria para HEAL-06/08/12/13

1. Sem JavaScript, Home/coleção/PDP exibem título, produto, preço demonstrativo rotulado e links essenciais.
2. Sem WebGL, nenhum conteúdo ou CTA desaparece.
3. Em 320 px não há rolagem horizontal da página, sobreposição de preço/CTA nem foco encoberto.
4. Busca por nome, família, atributo e conteúdo retorna grupos compreensíveis ou recuperação de zero.
5. Aplicar/remover filtros atualiza URL, chips e contagem; voltar restaura estado.
6. PDP mostra família, descritores, intensidade/fumaça, preço, estoque, CEP, uso e segurança antes de relacionados.
7. Add-to-cart anuncia resultado sem mover foco; envio duplicado é bloqueado.
8. Alteração de quantidade respeita estoque e preserva item em erro.
9. Frete distingue não calculado, loading, indisponível e erro temporário.
10. Handoff fixture não usa linguagem de pagamento/conclusão real.
11. Drawer/dialog fecha por botão e `Esc`, contém foco e o devolve ao acionador.
12. Toda ação por swipe/drag/hover possui botão ou link equivalente.

## Handoff HEAL-05

- **HEAL-06:** transformar cada bloco e estado em contrato de componente, foco, anúncio e erro.
- **HEAL-07:** aplicar três direções visuais sem inverter a prioridade produto → compra → sensorial.
- **HEAL-12:** validar a matriz de viewports, sticky UI, teclado virtual, zoom/reflow e retorno de contexto.
- **HEAL-13:** conectar preço/estoque/frete/carrinho/handoff aos ports definidos no ADR-001, preservando rótulo de fixture.
