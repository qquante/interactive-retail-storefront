# HEAL. CURA. — Design system da vertical slice

Data: 2026-08-28  
Owner: HEAL-09  
Estado real: `primitives obrigatórias implementadas; interações críticas validadas por 5 testes jsdom; adoção nas rotas permanece incremental`
Código: `site/components/ui/**`

## 1. Princípio

O sistema traduz `Tempo de Brasa` sem transformar todo controle em decoração. Componentes comerciais permanecem claros, densos e previsíveis; brasa aparece em ênfase e estado, não como efeito contínuo. Todos os primitives usam HTML nativo, tokens semânticos existentes e CSS Modules. Não há dependência de Anime.js, Three.js, catálogo ou adapter de commerce.

Ordem de decisão preservada:

1. comércio;
2. prova;
3. atmosfera.

## 2. Consumo

```tsx
import {
  Badge,
  Accordion,
  Button,
  Card,
  Dialog,
  Drawer,
  InputField,
  LinkButton,
  Price,
  QuantityControl,
  SelectField,
  StatusMessage,
  Surface,
  Tabs,
  Toast,
  ToastRegion,
} from '@/components/ui';
```

O barrel `@/components/ui` é a API pública. CSS Modules e estrutura interna não devem ser importados por consumidores.

## 3. Tokens consumidos

Os components não redefinem a paleta global. Eles consomem:

```text
--color-ink
--color-paper
--color-paper-strong
--color-surface-dark
--color-smoke
--color-line
--color-muted
--color-ember
--color-moss
--color-focus
--font-ui
```

`--color-error` e `--color-success` estão materializados em `globals.css`. Os módulos ainda mantêm fallback semântico para `ember` e `moss` como defesa contra consumo isolado.

## 4. Matriz de estados

| Primitive | Hover | Focus-visible | Active | Disabled | Loading | Error |
|---|---|---|---|---|---|---|
| `Button` | mudança curta de superfície | ring de 3px; reforço em zona escura | deslocamento de 1px | atributo `disabled`, contraste e cursor | `aria-busy`, largura preservada, acionador bloqueado | borda dupla + marca; explicação vem por `aria-describedby`/`StatusMessage` |
| `LinkButton` | igual ao botão | igual ao botão | deslocamento de 1px | vira `span aria-disabled`, sem falso link acionável | vira `span aria-busy`, largura preservada | borda dupla + marca e descrição externa |
| `InputField` | borda mais forte | ring + borda de foco | borda mais forte | estado nativo | preserva valor, `readOnly`, `aria-busy` e texto visível | `aria-invalid`, borda dupla, marca e mensagem associada |
| `SelectField` | borda mais forte | ring + borda de foco | borda mais forte | estado nativo | `disabled`, `aria-busy` e texto visível | `aria-invalid`, borda dupla, marca e mensagem associada |
| `QuantityControl` | botões ganham superfície | foco interno não é encoberto | deslocamento de 1px | limites e bloqueio usam `disabled` real | grupo `aria-busy`, controles bloqueados e texto visível | input inválido + mensagem associada |
| `Dialog`/`Drawer` | fechar ganha superfície | foco inicial, trap nativo do modal e retorno ao acionador | backdrop/fechar explícitos | controle pelo owner | permanece aberto até estado autoritativo | erro pertence ao conteúdo/owner |
| `Accordion` | título ganha cor brasa | summary nativo com ring | disclosure nativo | atributo nativo quando aplicável | não aplicável | mensagem permanece no painel |
| `Tabs` | rótulo ganha cor | roving tabindex + setas/Home/End | ativa painel | tab nativamente desabilitada | não aplicável | painel mantém conteúdo textual |
| `Toast` | fechar explícito | botão de 44px | dispensa controlada | sem auto-dismiss | não aplicável | `role=alert` apenas para erro; demais usam `status` |

`Badge`, `Price`, `StatusMessage` e `Surface/Card` são informativos ou estruturais; não inventam estados interativos.

Movimento funcional usa apenas CSS, entre 120–160ms. `prefers-reduced-motion` remove transições e rotação contínua. `forced-colors` devolve controles ao ajuste do navegador.

## 5. Button e LinkButton

Variantes:

- `primary`: ação dominante;
- `secondary`: alternativa com borda;
- `quiet`: ação de baixa ênfase, sempre sublinhada;
- `tone="light"`: sobre zonas claras;
- `tone="dark"`: sobre zonas escuras.

```tsx
<Button type="submit">Adicionar à sacola</Button>

<Button state="loading" loadingLabel="Adicionando…">
  Adicionar à sacola
</Button>

<Button
  aria-describedby="availability-error"
  state="error"
  variant="secondary"
>
  Tentar novamente
</Button>

<LinkButton href="/colecoes/intervalos" tone="dark">
  Explorar incensos
</LinkButton>
```

Regras:

- alvo mínimo de 44px;
- `Button` usa `type="button"` por padrão para impedir submit acidental;
- loading bloqueia somente o acionador e preserva a largura do rótulo;
- erro visual nunca substitui uma mensagem textual;
- `LinkButton` desabilitado/loading deixa de renderizar link, evitando um `href` falsamente acionável;
- `quiet` é para ação secundária, não para CTA de compra.

## 6. InputField e SelectField

```tsx
<InputField
  autoComplete="postal-code"
  error={postalCodeError}
  hint="Digite somente os 8 números."
  inputMode="numeric"
  label="CEP"
  name="postalCode"
/>

<SelectField label="Ordenar por" name="ordem" defaultValue="featured">
  <option value="featured">Destaques</option>
  <option value="price_asc">Menor preço</option>
</SelectField>
```

Regras:

- label é obrigatória e persistente; placeholder nunca a substitui;
- altura mínima de 48px;
- hint, loading e error recebem IDs derivados e entram em `aria-describedby` sem apagar IDs fornecidos pelo consumidor;
- erro usa `aria-invalid` e texto; cor não é o único sinal;
- loading de input preserva o valor em `readOnly`; loading de select bloqueia opções até elas serem autoritativas;
- erros dinâmicos são anunciados por `role="alert"`; não renderizar erro vazio na montagem inicial.

## 7. QuantityControl

```tsx
<QuantityControl
  error={quantityError}
  label="Quantidade"
  max={availableQuantity}
  onChange={setQuantity}
  value={quantity}
/>
```

O componente é controlado. `−` e `+` têm nomes acessíveis, targets de 44px e respeitam `min`, `max` e `step`. Digitação manual permanece disponível; valores válidos são enviados ao owner por `onChange`, enquanto rascunho vazio/inválido pode ser corrigido sem salto. No blur, o campo volta ao último valor válido controlado.

O owner de commerce continua responsável por revalidar estoque no servidor. `max` no cliente não é autoridade de inventário.

## 8. Badge

Tons: `neutral`, `fixture`, `success`, `error`.

```tsx
<Badge tone="fixture">DEMONSTRAÇÃO — dados e imagens ilustrativos</Badge>
```

`fixture` usa fundo papel, borda brasa e forma retangular. Não parece promoção e não deve ser abreviado. `success` e `error` só representam fatos autoritativos; não antecipam pagamento, pedido ou estoque.

## 9. Price

```tsx
<Price amount="48.00" qualifier="Valor demonstrativo" />
<Price amount={null} fallback="Preço indisponível" />
```

`Price` recebe valor em unidade monetária principal, não centavos, e formata com `Intl.NumberFormat`. O padrão é `pt-BR` + `BRL`; outras moedas/locales precisam vir do contrato real. Números usam algarismos tabulares. Valor nulo ou inválido gera fallback textual e nunca `R$ 0,00` falso.

Este primitive não importa `Money` nem `formatMoney` do commerce para preservar o boundary. O adapter/consumer transforma o valor autoritativo na borda de uso.

## 10. StatusMessage

```tsx
<StatusMessage tone="success">
  Intervalo 01 foi adicionado à sacola demonstrativa.
</StatusMessage>

<StatusMessage announce="assertive" tone="error">
  Não foi possível confirmar a disponibilidade. Tente novamente.
</StatusMessage>
```

Tons usam marca, rótulo textual e borda, nunca apenas cor. O padrão é região `status` educada; `assertive` deve ficar restrito a falhas que exigem ação imediata. O componente não rouba foco e não desaparece por temporizador.

## 11. Surface e Card

```tsx
<Surface as="section" tone="dark" padding="large" aria-labelledby="ritual-title">
  {/* zona de atmosfera, conteúdo real continua em HTML */}
</Surface>

<Card aria-labelledby="product-title" tone="strong">
  {/* mídia, badge, família, nome, fatos, preço, estoque e CTA */}
</Card>
```

Tons: `paper`, `strong`, `dark`. Padding: `none`, `small`, `medium`, `large`. `Card` usa `article` e borda por padrão; `Surface` usa `div` sem borda. O consumidor escolhe `section`/`article` apenas quando houver heading que justifique a região semântica.

Cards não ganham sombra, radius grande nem comportamento clicável implícito. Se houver destino, use link real no título/CTA; não transforme toda a superfície em botão sem necessidade.

## 12. Overlays, disclosure, tabs e toast

- `Dialog` e `Drawer` usam `<dialog>.showModal()`, cancelamento por Escape, backdrop, foco inicial e retorno ao elemento acionador. O trap e a inertização ficam com a primitiva modal nativa.
- `Drawer` é lateral no desktop e bottom sheet no mobile, sem duplicar semântica.
- `Accordion` usa `<details>/<summary>` e não esconde o conteúdo da árvore de acessibilidade quando aberto.
- `Tabs` implementa `tablist/tab/tabpanel`, roving tabindex, setas, Home/End e tabs desabilitadas.
- `Toast` é controlado, não desaparece por temporizador e separa `status` educado de `alert` assertivo.
- Os cinco testes em `tests/unit/ui-interactions.test.tsx` cobrem abertura/fechamento e retorno de foco de Dialog/Drawer, disclosure, teclado de tabs e dispensa do toast.

## 13. Checklist de integração

- [ ] Migrar componentes existentes um fluxo por vez; não reescrever commerce junto.
- [x] Materializar `--color-error` e `--color-success` em `globals.css` conforme contrato visual.
- [ ] Conferir contraste calculado no CSS final, inclusive disabled e zona escura.
- [ ] Testar teclado e focus-visible em claro/escuro.
- [ ] Testar 320px, zoom 200%, forced colors e reduced motion.
- [ ] Associar toda mensagem de erro ao acionador/campo correspondente.
- [ ] Garantir que status de carrinho não roube foco nem seja a única rota para a sacola.
- [ ] Revalidar quantity/price/stock no boundary autoritativo de commerce.
- [ ] Fazer QA visual antes de declarar o design system integrado.

## 14. Escopo ainda não integrado nas rotas

- Migração de `site/app/**` ou `site/components/commerce/**`.
- Variações visuais de produto/catalogo.
- Motion Anime.js, Three.js e feedback de brasa.
- Aprovação visual desses primitives numa página real; os controles atualmente usados pelas rotas seguem validados pela matriz cross-browser.

Esses itens ficam para owners próprios. O design system cobre o inventário obrigatório, mas a existência de um primitive não prova sua adoção numa rota que não precisa dele.
