# HEAL — especificação de build frontend da Coreografia do ar

Data: 2026-08-28  
Owner: HEAL-33 — Frontend Design + UX/UI  
Estado real: `ESPECIFICAÇÃO IMPLEMENTÁVEL; SITE AINDA NÃO ALTERADO POR HEAL-33`  
Direção escolhida pelo usuário: **B — Coreografia do ar**  
Escopo desta versão: Home como primeira entrega; propagação contratada para coleção e PDP; cinco aromas inaugurais dentro de um catálogo futuro de aproximadamente 50 tipos; jornadas de consumidor, profissionais e revenda; preservação integral dos limites de verdade e commerce.

## 0. Resultado executivo

A Home atual deve deixar de ser `hero de fumaça + duas portas + três produtos Intervalo` e passar a ser uma experiência contínua cujo objeto reconhecível é o **rastro de cada incenso HEALS**.

O primeiro frame precisa dizer, sem depender de imagem, JavaScript ou conhecimento prévio:

```text
HEAL
HEALS — OS INCENSOS DA HEAL
O ar deixa um rastro.
```

O primeiro lançamento de coleção tem cinco estados explícitos:

- CANELA — `CNL`;
- LAVANDA CELESTIAL — `LVC`;
- MIRRA — `MRR`;
- OLÍBANO — `OLB`;
- ALECRIM — `ALC`.

Cada estado combina nome, código, glyph, padrão e acento. Cor e movimento são camadas redundantes, nunca o único identificador. A seleção é feita por controles HTML; o SVG é a representação autoritativa; Anime.js desenha a transição; Three.js é uma melhoria opcional do mesmo rastro no hero. Coleção não usa Three. PDP começa em 2.5D e só recebe caixa 3D após comparação de tarefa e performance.

Os cinco não podem virar um limite estrutural. A Home apresenta no máximo cinco destaques editoriais; a rota de catálogo, busca, filtros, cards e modelo de identidade devem aceitar cerca de 50 produtos sem criar componentes, rotas ou condicionais por aroma.

### Decisões normativas desta especificação

1. `HEAL` é a assinatura de marca; `HEALS` nunca aparece como um segundo logo do mesmo peso.
2. A primeira menção por rota usa `HEALS — os incensos da HEAL`.
3. O H1 da Home é `O ar deixa um rastro.`.
4. O aroma é dominante em card, PDP e embalagem; `incenso HEALS` é descritor.
5. O glyph existe completo no HTML/SVG antes de qualquer animação.
6. Não existe autoplay entre aromas, scroll preso, cursor trail, áudio, drag obrigatório ou texto animado por caractere.
7. A Home possui no máximo um organismo ativo. Coleção possui no máximo um card animando. Carrinho e checkout não recebem Three nem animação contínua.
8. Produto sem fotografia, preço, estoque, rótulo, segurança e dados materiais aprovados não é publicado na vitrine de produção.
9. Arte conceitual pode existir no preview interno, sempre rotulada; não entra no storefront público como packshot.
10. Atenção é conquistada por clareza, resposta e autoria — nunca por mensagem subliminar, urgência falsa, escassez inventada, autoplay coercitivo ou dark pattern.

## 0.1 Modos de conteúdo e gate público

O front público final não usa faixa `DEMONSTRAÇÃO`, `[A VALIDAR]` ou copy de fixture. Esses sinais pertencem ao laboratório e ao preview interno. Removê-los visualmente não autoriza publicar dados fictícios.

| Modo | Público? | Dados | Mídia | Regra de UI |
|---|---:|---|---|---|
| `internal-preview` | não; `noindex`, acesso controlado | fixture/rascunho permitido | conceito permitido | aviso persistente `AMBIENTE INTERNO — conteúdo ainda não publicado` |
| `staging` | não indexável | sandbox ou conteúdo em revisão | somente assets com status explícito | provenance e estados de erro disponíveis para QA |
| `production` | sim | catálogo/commerce autoritativos | fotografia/render aprovado como representação fiel | sem linguagem de demonstração; SKU incompleto fica `draft` e não aparece |

Hard gate de produção:

```text
published =
  identityApproved
  && mediaApproved
  && labelApproved
  && compositionApproved
  && usageAndSafetyApproved
  && priceAuthoritative
  && inventoryAuthoritative
```

Se o gate falhar, não substituir a informação por prosa vaga. O produto permanece fora da vitrine pública.

## 0.2 História e posicionamento narrativo

### Essência

HEAL dá uma linguagem contemporânea ao gesto de acender um incenso e acompanhar o que ele deixa no espaço. A marca não promete curar pessoas; organiza matéria, aroma, uso e escolha com clareza.

### História curta para a Home

```text
O gesto é antigo. A linguagem é HEAL.

HEAL nasceu para tornar visível um gesto simples: acender matéria, acompanhar o rastro e dar atenção ao espaço. Cada HEAL é um incenso. Juntos, HEALS formam um repertório de aromas para casas, atendimentos, rituais e espaços de convivência.

A Coreografia do ar transforma esse repertório em uma linguagem: cada incenso tem um rastro próprio, e todos pertencem à mesma família.
```

`Ritual`, `espiritualidade`, `práticas integrativas` e `espaços de cuidado` podem nomear contextos culturais e públicos da marca. Nunca significam tratamento, diagnóstico, resultado clínico, alteração energética garantida ou segurança universal.

### Públicos e proposição

| Público | Necessidade | Resposta HEAL segura |
|---|---|---|
| Uso pessoal | descobrir e recomprar sem dominar vocabulário | nome, perfil olfativo validado, matéria, uso, comparação e busca direta |
| Terapeutas e práticas integrativas | compor ambientes de atendimento com previsibilidade | ficha clara, uso/segurança, intensidade/fumaça medidas e compra recorrente; nenhum resultado terapêutico prometido |
| Espaços espirituais e de ritual | selecionar matéria e repertório coerentes com a própria prática | contexto e procedência documentados; nenhuma eficácia espiritual garantida |
| Lojas esotéricas e revendedores | expor, explicar, repor e comprar em volume | catálogo profissional, códigos/SKUs, materiais de PDV aprovados, disponibilidade e canal de revenda |
| Presentes e hospitalidade | escolher apresentação e prazo | conteúdo da caixa, embalagem, disponibilidade e entrega reais |

## 0.3 Ética da atenção

O site pode ser memorável e envolvente, mas a experiência deve continuar voluntária, reversível e honesta.

- nenhum texto, frame, áudio ou imagem subliminar;
- nenhum contador regressivo, estoque piscante ou `últimas unidades` sem dado autoritativo;
- nenhum quiz que se apresente como diagnóstico ou esconda o catálogo;
- nenhum autoplay que troque o aroma antes de a pessoa ler;
- nenhum scroll sequestrado, saída escondida, CTA disfarçado ou opção negativa culpabilizante;
- nenhum preselected add-on, opt-in ou quantidade acima de 1;
- nenhum preço, frete, renovação ou condição escondida pela experiência;
- nenhum infinite scroll como único acesso; URL, paginação/carregar mais e retorno são preservados;
- telemetria de interação somente com finalidade, minimização e governança; não capturar trajetória fina de ponteiro para “otimizar persuasão”.

Métrica de sucesso é compreensão + conclusão de tarefa + retorno voluntário, não tempo preso na página.

## 1. Base auditada e fronteiras que devem permanecer

### Preservar

- conteúdo e CTAs comerciais server-rendered;
- faixa inequívoca de demonstração;
- import dinâmico de Three.js;
- fallback SVG anterior ao canvas;
- gates de `prefers-reduced-motion`, `prefers-reduced-data` e `saveData`;
- pausa por `IntersectionObserver` e `document.visibilityState`;
- `webglcontextlost`, cleanup e dispose;
- `EmberCartFeedback` somente depois de sucesso confirmado;
- busca, coleção, PDP, sacola e handoff independentes do ambiente visual;
- `CommercePageShell`, contracts de preço/estoque e todos os placeholders de verdade.

### Não alterar nesta frente visual sem owner de commerce

- `CatalogPort`, `CartPort`, `ShippingPort` e `CheckoutPort`;
- definição de sucesso/erro, estoque, preço ou total;
- comportamento da sacola e do checkout;
- preço, quantidade, composição, origem, duração, fumaça ou benefício como se fossem dados reais.

### Inconsistência documental a resolver no código novo

`COREOGRAFIA_DO_AR_SYSTEM.md` usa `HLS-MRA` para Mirra em um ponto; a arquitetura de embalagem, SKUs e ativos usam `MRR`. O frontend deve adotar **`MRR`**. Não propagar `MRA`.

## 2. Arquitetura verbal e copy final de interface

Esta seção é o contrato de copy do build. Não acrescentar benefícios de aroma, saúde, sono, foco, purificação, energia, espiritualidade ou composição.

### 2.1 Header

```text
Marca/link inicial: HEAL
Navegação: Incensos · Como escolher · Matéria
Ações: Buscar · Sacola (n)
Menu mobile: Menu
```

O header não mostra `HEALS` ao lado de `HEAL`. A categoria `Incensos` ensina a oferta.

### 2.2 Hero da Home

```text
Eyebrow:
HEALS — OS INCENSOS DA HEAL

H1:
O ar deixa um rastro.

Apoio:
Explore cinco incensos por um código visual próprio — e confirme composição, aroma, formato e uso nos dados de cada produto.

CTA primário:
Explorar os incensos

CTA secundário:
Conhecer os cinco HEALS

Disclosure persistente junto do visual:
A coreografia é uma identidade visual. Não simula aroma, ingrediente, fumaça ou efeito real.
```

No preview interno, manter acima de tudo:

```text
AMBIENTE INTERNO — conteúdo ainda não publicado; nenhum pagamento será processado.
```

Essa faixa não entra em produção. O build de produção também não pode receber o fixture adapter.

### 2.3 Seletor do hero

```text
Legend:
Escolha um rastro

Itens:
CANELA · CNL
LAVANDA CELESTIAL · LVC
MIRRA · MRR
OLÍBANO · OLB
ALECRIM · ALC

Status após ativação explícita:
{AROMA} selecionado. Rastro {CÓDIGO} em exibição.

Escape comercial:
Ver todos os incensos
```

Não selecionar por hover. O primeiro estado visual pode ser CANELA, mas a página não anuncia uma escolha até a pessoa acionar um controle.

### 2.4 Família na Home

```text
Eyebrow:
CINCO RASTROS · CINCO AROMAS

H2:
Um sistema. Cinco formas de reconhecer.

Apoio:
Nome, código e desenho identificam cada incenso mesmo quando a cor para e o movimento termina.
```

Card de cada SKU:

```text
Eyebrow: INCENSO HEALS
Título: {AROMA}
Linha técnica: Código visual {CÓDIGO}
Descrição no preview: Conteúdo editorial ainda não publicado.
CTA: Ver {AROMA}
```

Em produção, a descrição vem do campo editorial aprovado do SKU. Não usar texto como `calmante`, `terapêutico`, `purificador`, `energizante` ou associação garantida de efeito. Termos olfativos como `quente`, `fresco` ou `profundo` só entram como percepção documentada, com método editorial consistente, nunca como benefício sobre a pessoa.

### 2.5 Seção embalagem/inspeção da Home

```text
Eyebrow:
DO RASTRO À CAIXA

H2:
A identidade continua quando o movimento para.

Apoio de produção, depois de embalagem aprovada:
Cada caixa repete aroma, categoria, código e desenho. A identidade continua reconhecível quando o movimento para.

Ações:
Ver frente · Ver lateral · Ver sistema completo

Legenda do preview interno:
Visual conceitual da embalagem. Não representa produto fabricado nem dados finais de rótulo.
```

Em produção, usar fotografia/render fiel aprovado e caption factual. Não publicar o mockup conceitual.

Se ainda não houver imagens separadas de frente/lateral, renderizar somente `Ver sistema completo`; não criar botões que repetem a mesma imagem ou fingem uma vista inexistente.

### 2.6 Método e fechamento da Home

Substituir `Passaporte sensorial` e a lista numerada por:

```text
Eyebrow:
ESCOLHA COM CONTEXTO

H2:
O rastro orienta. Os dados confirmam.

Blocos:
AROMA — O nome da variante e sua descrição validada.
MATÉRIA — Composição e origem, quando documentadas.
USO — Formato, modo de usar e cuidados aprovados.
COMPRA — Preço, estoque e entrega vindos do comércio.

CTA:
Como escolher um incenso
```

Footer:

```text
HEAL
HEALS são os incensos da HEAL.
```

Manter links de marca, conteúdo, ajuda e políticas já existentes. Não usar `cura` como slogan ou resultado.

### 2.7 Coleção pública

```text
Eyebrow: COREOGRAFIA DO AR
H1: HEALS — os incensos da HEAL
Apoio da coleção inicial: Conheça os primeiros cinco rastros da HEAL. Compare aroma, matéria, formato e uso a partir dos dados de cada incenso.
Ação opcional: Comparar os rastros
Ação de saída: Ver lista sem mapa
```

Quando o catálogo crescer, substituir `primeiros cinco` por contagem/coleção derivada do CMS; nunca manter número hard-coded numa rota com mais produtos.

### 2.8 PDP

Breadcrumb:

```text
Início / Incensos / {AROMA}
```

Primeiro frame de produção:

```text
Eyebrow: INCENSO HEALS · {CÓDIGO}
H1: {AROMA} — incenso HEALS em bastão
Apoio: {DESCRIÇÃO OLFATIVA APROVADA DO SKU}
```

O campo de apoio é obrigatório para publicação e não possui fallback inventado. No preview interno, usar `Conteúdo editorial ainda não publicado`.

Controles de inspeção, somente com mídia correspondente:

```text
Frente · Lateral · Verso · Abrir e ver · Ver textura
Fechar caixa
```

Legenda do preview interno:

```text
Visual conceitual. A embalagem, o bastão e a fumaça ainda não são fotografias ou medições do produto final.
```

Essa legenda não aparece em produção porque concept art não é asset de produção. Campos comerciais, segurança e CTA continuam no HTML e precedem a inspeção avançada na ordem de foco.

### 2.9 Seção para casas, profissionais e lojas

```text
Eyebrow:
HEAL EM DIFERENTES ESPAÇOS

H2:
Para casas, práticas e espaços.

USO PESSOAL
Um repertório para acompanhar pausas, encontros e rituais cotidianos.
[Explorar incensos]

PROFISSIONAIS
Informação clara para compor salas de atendimento, práticas integrativas e espaços de cuidado.
[HEAL para profissionais]

LOJAS E REVENDA
Uma coleção organizada para exposição, escolha e reposição.
[Falar sobre revenda]
```

`Acompanhar` e `compor` descrevem uso contextual. Não substituir por `acalma`, `trata`, `equilibra`, `limpa`, `eleva`, `protege` ou `potencializa atendimento`.

### 2.10 História da marca na Home

```text
Eyebrow:
NOSSA HISTÓRIA

H2:
O gesto é antigo. A linguagem é HEAL.

Texto:
HEAL nasceu para tornar visível um gesto simples: acender matéria, acompanhar o rastro e dar atenção ao espaço. Cada HEAL é um incenso. Juntos, HEALS formam um repertório de aromas para casas, atendimentos, rituais e espaços de convivência.

A Coreografia do ar transforma esse repertório em uma linguagem: cada incenso tem um rastro próprio, e todos pertencem à mesma família.

CTA:
Conhecer a HEAL
```

Esta seção fica depois de produtos/prova e antes de conteúdo editorial. A história não antecede categoria, produto ou caminho de compra.

## 2.11 Arquitetura de informação pública

### Header desktop

```text
HEAL | Incensos | Aromas | Como escolher | Nossa história | Profissionais | Buscar | Sacola (n)
```

- `Incensos` leva à rota completa; não abre mega menu no primeiro ciclo.
- `Aromas` leva ao índice editorial/taxonômico, não a uma lista de 50 links no header.
- `Profissionais` reúne uso profissional e entrada para revenda; `Revenda` pode aparecer como CTA dentro da rota.
- `Matéria` permanece acessível por `Como escolher`, produto e footer; não precisa competir no header quando o catálogo crescer.

### Header mobile

```text
Menu | HEAL | Buscar | Sacola (n)
```

Menu:

```text
Incensos
Aromas
Como escolher
Nossa história
Profissionais
Revenda
Segurança e cuidados
Contato
```

### Sitemap alvo

```text
/
├── /incensos
│   └── /incensos/[slug]
├── /colecoes
│   └── /colecoes/[slug]
├── /aromas
│   └── /aromas/[slug]
├── /materias
│   └── /materias/[slug]
├── /como-escolher
├── /guia-de-uso
├── /seguranca-e-cuidados
├── /historia
├── /profissionais
├── /revenda
├── /journal
│   └── /journal/[slug]
├── /buscar?q=
├── /carrinho
├── /checkout
├── /entrega-trocas-e-devolucoes
├── /contato
├── /privacidade-e-cookies
└── /termos
```

Transição recomendada depois que o catálogo real existir:

- `/colecoes/intervalos` deixa de ser a porta geral e redireciona permanentemente para `/incensos` ou para a coleção real equivalente;
- `/produtos/[handle]` migra para `/incensos/[slug]` com redirects preservando SEO;
- não executar redirects enquanto as novas rotas e metadados ainda não estiverem completos.

### Home seção a seção

| Ordem | Seção | Tarefa | Conteúdo/ação | Motion permitido |
|---:|---|---|---|---|
| 1 | Header | reconhecer e navegar | HEAL, Incensos, busca, sacola | estados CSS 120–180ms |
| 2 | Hero Coreografia | entender categoria e tese | copy, CTA catálogo, cinco destaques, organismo | um glyph Anime; um Three opcional |
| 3 | Coleção inaugural | reconhecer cinco aromas | cards com nome/código/produto | um glyph por intenção |
| 4 | Escolha com contexto | aprender critérios | aroma, matéria, uso e compra | linha curta entre critério e produto |
| 5 | Do rastro à caixa | verificar identidade/materialidade | embalagem e campos factuais | inspector 2.5D sob ação |
| 6 | Incensos em destaque | abrir PDP/comprar | 4–8 produtos editoriais derivados do catálogo | sem autoplay |
| 7 | Para casas, práticas e espaços | escolher caminho pessoal/profissional | 3 entradas claras | transição de estado simples |
| 8 | História HEAL | compreender a marca | narrativa curta + link | composição estática |
| 9 | Guia/journal | aprofundar sem bloquear compra | 2–3 conteúdos reais | sem carrossel automático |
| 10 | Ajuda/segurança | remover objeções | entrega, segurança, contato | nenhuma |
| 11 | Footer | navegação completa | catálogo, conhecer, profissional, ajuda, legal | nenhuma |

Regra de densidade: em mobile, o catálogo direto aparece antes da cena avançada e antes da história institucional.

## 3. Tokens exatos para o primeiro build

Os valores abaixo são tokens digitais candidatos da direção escolhida. Devem entrar como tokens semânticos e passar novamente por contraste no CSS final. Acentos de SKU não são autorizados para texto normal até o gate de contraste.

```css
:root {
  /* Coreografia — base */
  --air-night: #15171a;
  --air-paper: #f2f0e9;
  --air-paper-strong: #f8f7f2;
  --air-smoke: #b7bcc2;
  --air-line: #c7c8c4;
  --air-muted: #585d5b;
  --air-focus: #145da0;
  --air-error: #a52920;
  --air-success: #2f6d4a;
  --air-scrim: rgb(21 23 26 / 68%);

  /* SKU — desenho/ornamento; informação nunca depende só destes */
  --sku-canela: #d35a3a;
  --sku-lavanda-celestial: #6e67c8;
  --sku-mirra: #8a4a3a;
  --sku-olibano: #c89b35;
  --sku-alecrim: #3d806d;

  /* Tipo */
  --font-display: "Instrument Sans", "Segoe UI Variable Display", "Segoe UI", Arial, sans-serif;
  --font-ui: "Instrument Sans", "Segoe UI Variable Text", "Segoe UI", Arial, sans-serif;
  --font-code: "IBM Plex Mono", "Cascadia Mono", Consolas, monospace;

  /* Escala */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.125rem;
  --text-xl: clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem);
  --text-2xl: clamp(1.75rem, 1.4rem + 1.1vw, 2.5rem);
  --text-hero: clamp(3rem, 2.05rem + 4.2vw, 7.25rem);

  /* Espaço */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --space-10: 8rem;

  /* Layout */
  --container: 90rem;
  --measure-copy: 40rem;
  --measure-narrow: 30rem;
  --page-gutter: clamp(1rem, 3.5vw, 5rem);
  --target-min: 2.75rem;
  --radius-control: 0.25rem;
  --radius-card: 0;
  --border: 1px;

  /* Motion */
  --motion-functional: 180ms;
  --motion-state: 280ms;
  --motion-layout: 420ms;
  --motion-editorial: 720ms;
  --ease-air-out: cubic-bezier(0.22, 1, 0.36, 1);
}
```

### Regras de uso

- Fundo do hero: `--air-night`; texto: `--air-paper`.
- Zonas comerciais: `--air-paper`; superfícies de decisão: `--air-paper-strong`.
- `--air-smoke` é traço/atmosfera em fundo escuro; não é texto normal em fundo claro.
- Acento de SKU ocupa no máximo 25% da superfície e nunca colore preço, estoque, erro, CTA principal ou parágrafo.
- Foco permanece `--air-focus`, mesmo quando não combina com o SKU; foco é infraestrutura.
- Erro e sucesso permanecem semânticos; não herdam acento do aroma.
- O grid deixa de usar serifada como assinatura principal. Instrument Sans deve ser self-hosted somente depois de licença e arquivos reais; até lá, usar o fallback declarado, sem chamada externa.
- `--font-code` é reservado a `CNL/LVC/MRR/OLB/ALC`, SKU, lote e dados técnicos; não usar como estética de dashboard em parágrafos.

### Tipo por função

| Papel | Tamanho/peso/entrelinha | Regra |
|---|---|---|
| H1 hero | `--text-hero` / 520–600 / `.88–.94` | máximo `9ch`; quebra manual depois de `deixa` somente se necessário |
| H2 | `clamp(2.25rem, 1.7rem + 2.4vw, 5rem)` / 520 / `.98` | sem itálico decorativo |
| Aroma em card | `clamp(1.75rem, 1.4rem + 1.2vw, 3rem)` / 600 / `1` | caixa alta somente se o espaço permitir o nome completo |
| Body | `1rem–1.125rem` / 400–450 / `1.55–1.65` | medida máxima 65–70 caracteres |
| Eyebrow | `.75rem` / 700 / `1.2`; tracking `.12em` | sempre contém informação, não numeração vazia |
| Código | `.75rem–.875rem` / 500 / `1.2`; tracking `.08em` | `font-code`, acompanhado do nome |
| CTA | `.875rem–1rem` / 650 / `1.2` | alvo mínimo 44px |

## 4. Manifesto visual único e escalável

Criar uma fonte de verdade compartilhada pela Home, coleção e PDP. Não espalhar hex, labels, paths ou cadências em componentes. O registro inicial contém cinco identidades, mas o contrato aceita aproximadamente 50 sem alterar componente.

Arquivo proposto:

```text
site/lib/brand/air-identities.ts
```

Contrato:

```ts
export const INITIAL_AIR_VARIANT_IDS = [
  'canela',
  'lavanda-celestial',
  'mirra',
  'olibano',
  'alecrim',
] as const;

export type InitialAirVariantId = typeof INITIAL_AIR_VARIANT_IDS[number];
export type AirVariantId = string;

export type AirVariantVisual = {
  id: AirVariantId;
  schemaVersion: 1;
  productHandle: string;
  collectionHandles: readonly string[];
  label: string;
  displayLines: readonly string[];
  code: string;
  accentToken: string;
  pattern: string;
  path: string;
  counterPath: string;
  terminalPath: string;
  cadenceMs: number;
  mobileCadenceMs: number;
  status: 'draft' | 'approved' | 'retired';
  conceptImage?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    status: 'concept';
  };
};
```

`AirVariantId`/`code` ficam abertos porque o catálogo crescerá. A validação em build substitui a segurança que uma union fechada daria.

### Gates do registro para até 50 produtos

- `id`, `productHandle` e `code` únicos;
- `code` com 3–6 caracteres ASCII maiúsculos, sem significado clínico/espiritual inventado;
- todo produto publicado aponta para identidade `approved`;
- todo glyph tem path, contrarrastro e terminal próprios, com hash de silhueta sem colisão conhecida;
- nome e código continuam suficientes quando cor/path falham;
- nenhuma identidade é gerada automaticamente a partir do nome do ingrediente;
- novo produto entra por conteúdo/config, não por `if` num componente;
- Home recebe uma lista editorial de no máximo cinco IDs; catálogo recebe paginação/filtros e pode renderizar todos;
- retire um SKU por status/redirect, sem reciclar o mesmo código para outro produto;
- versionar alterações do glyph para embalagem, site e material de PDV permanecerem sincronizados.

Para 50 produtos, os cinco padrões iniciais podem atuar como famílias formais, mas cada SKU ainda precisa de uma combinação aprovada de silhueta/terminal/código. Não produzir 50 variações procedurais indistintas só para completar a grade.

Valores normativos:

| id | label | displayLines | code | accentToken | cadence desktop/mobile |
|---|---|---|---|---|---:|
| `canela` | `CANELA` | `['CANELA']` | `CNL` | `--sku-canela` | `720 / 420 ms` |
| `lavanda-celestial` | `LAVANDA CELESTIAL` | `['LAVANDA','CELESTIAL']` | `LVC` | `--sku-lavanda-celestial` | `900 / 520 ms` |
| `mirra` | `MIRRA` | `['MIRRA']` | `MRR` | `--sku-mirra` | `780 / 460 ms` |
| `olibano` | `OLÍBANO` | `['OLÍBANO']` | `OLB` | `--sku-olibano` | `840 / 480 ms` |
| `alecrim` | `ALECRIM` | `['ALECRIM']` | `ALC` | `--sku-alecrim` | `680 / 400 ms` |

### Geometria SVG candidata do protótipo

Usar um único `viewBox="0 0 240 400"`. Fonte e eixo são comuns:

```text
fonte: <circle cx="120" cy="360" r="8" />
eixo:  M120 352 L120 318
```

Paths candidatos para o primeiro teste; devem permanecer vetores próprios, não ícones de biblioteca:

```text
CNL: M120 318 C78 292 76 254 122 232 C168 210 166 172 120 156 C80 142 84 102 142 72
LVC: M120 318 C66 274 66 212 122 188 C180 164 182 102 112 54
MRR: M120 318 C74 286 72 238 118 218 C166 198 168 154 124 138 C88 126 90 94 132 72
OLB: M120 318 C160 294 160 264 120 250 C80 236 80 204 120 190 C160 176 160 142 120 128 C92 116 96 88 130 64
ALC: M120 318 L148 282 L102 246 L146 210 L100 172 L138 126 L116 72
```

Regras:

- `pathLength="1"` em todo path desenhável;
- stroke principal `currentColor`, 7 unidades no hero e 5 no card;
- contrarrastro com 3 unidades, offset visual e opacidade máxima `.42`;
- terminais diferentes conforme o manifesto;
- `vector-effect="non-scaling-stroke"` nos tamanhos pequenos;
- desenho final precisa passar por revisão da direção de arte antes de ser chamado de glyph final.

## 5. Componentes e props

### 5.1 `ProductFamilyTerm`

Responsabilidade: nunca deixar `HEALS` ambíguo numa entrada de rota.

```ts
type ProductFamilyTermProps = {
  level: 'route' | 'object' | 'established';
  as?: 'span' | 'p';
};
```

Saída:

- `route`: `HEALS — os incensos da HEAL`;
- `object`: `incenso HEALS`;
- `established`: `HEALS` somente se `incensos` já está visível no mesmo contexto.

Componente server, sem JavaScript.

### 5.2 `AirGlyph`

```ts
type AirGlyphProps = {
  variantId: AirVariantId;
  size: 'micro' | 'card' | 'hero';
  state?: 'rest' | 'trace' | 'selected' | 'reduced';
  title?: string;
  decorative?: boolean;
  className?: string;
};
```

- Renderiza SVG completo no servidor.
- Se `decorative=true`, `aria-hidden=true` e sem `<title>`.
- Se informativo, nome acessível: `Rastro visual CNL de Canela`.
- Nenhum significado depende de `state` ou cor.

### 5.3 `AirHeroExperience`

Uma ilha client estreita contendo apenas organismo, seletor e controles de movimento. H1, apoio e CTAs ficam fora dela em server component.

```ts
type AirHeroExperienceProps = {
  variants: readonly AirVariantVisual[];
  initialVariantId: AirVariantId;
  conceptMode: true;
  enableThree: boolean;
};
```

Estado interno:

```ts
type AirHeroState = {
  selectedId: AirVariantId;
  scene: 'static' | 'anime' | 'three';
  motion: 'full' | 'paused' | 'reduced';
  visible: boolean;
  announcement: string;
};
```

O SSR mostra `AirGlyph` de CANELA, cinco botões e disclosure. Hidratação não reinicia o conteúdo nem apaga o SVG.

### 5.4 `AirVariantSelector`

```ts
type AirVariantSelectorProps = {
  variants: readonly AirVariantVisual[];
  selectedId: AirVariantId;
  onSelect: (id: AirVariantId) => void;
  orientation: 'vertical' | 'horizontal';
};
```

- `<fieldset>` + `<legend>Escolha um rastro</legend>`;
- cada opção é `<button type="button" aria-pressed>` com glyph, nome e código;
- ativação somente por click/Enter/Space;
- foco não altera seleção;
- não usar tablist: as opções não controlam painéis independentes;
- todos os cinco botões entram na ordem de Tab; não capturar setas sem roving tabindex completo;
- alvo mínimo 48px no mobile e 44px no desktop.

### 5.5 `AirOrganismStage`

```ts
type AirOrganismStageProps = {
  selected: AirVariantVisual;
  scene: 'static' | 'anime' | 'three';
  paused: boolean;
  onSceneReady?: (scene: 'anime' | 'three') => void;
};
```

- SVG sempre presente;
- canvas sobreposto apenas em `scene=three`, `aria-hidden`, `tabIndex=-1`, `pointer-events:none`;
- label e código são HTML fora do canvas;
- canvas nunca recebe CTA, texto ou estado comercial;
- fallback ocorre sem trocar layout;
- stage reserva dimensões para CLS zero.

### 5.6 `MotionPreferenceControl`

```ts
type MotionPreferenceControlProps = {
  state: 'full' | 'paused' | 'reduced';
  advancedSceneActive: boolean;
  onPause: () => void;
  onResume: () => void;
  onReduce: () => void;
};
```

- Renderiza `Pausar efeitos` somente se há efeito contínuo ativo.
- `Reduzir efeitos` troca imediatamente para SVG estático e persiste em `sessionStorage`.
- Não oferecer `Ativar movimento` automaticamente a quem chega com preferência do SO reduzida.
- Ao pausar, o rastro termina no frame corrente ou no glyph final em até 180ms; não desaparece.

### 5.7 `AirContinuityTrace`

Substitui `EditorialSeamReveal` na Home.

```ts
type AirContinuityTraceProps = {
  variantId: AirVariantId;
  targetId: string;
};
```

- linha parte do final do organismo e termina antes do heading da coleção;
- versão sem JS já está completa;
- Anime desenha uma vez ao entrar no trecho;
- duração máxima 480ms;
- sem pin, scrub contínuo, smooth scroll ou cruzamento de texto/controle.

### 5.8 `AirVariantCard`

Evolução de `ProductCard`, sem substituir o contrato de commerce.

```ts
type AirVariantCardProps = {
  product: Product;
  visual: AirVariantVisual;
  mediaStatus: 'missing' | 'concept' | 'verified';
  animateOnIntent?: boolean;
};
```

Ordem DOM:

1. mídia `4:5`, com badge dentro da figura quando `concept`;
2. `INCENSO HEALS`;
3. aroma;
4. código + glyph;
5. fatos validados ou `[A VALIDAR]`;
6. preço fixture/real e estoque;
7. `Ver {AROMA}`.

Somente o glyph do card sob foco/ativação anima. Hover pode reforçar linha/borda; não escala o card inteiro nem troca informação essencial.

### 5.9 `PackagingInspector2D`

Baseline da PDP.

```ts
type PackagingView = 'front' | 'side' | 'back' | 'open' | 'macro';

type PackagingFrame = {
  view: PackagingView;
  src: string;
  width: number;
  height: number;
  alt: string;
  status: 'concept' | 'verified';
};

type PackagingInspector2DProps = {
  productName: string;
  frames: readonly PackagingFrame[];
  initialView?: PackagingView;
};
```

- controles são botões nomeados; drag/swipe é opcional;
- não renderizar controle sem frame correspondente;
- troca de vista preserva a caixa na mesma escala;
- `Abrir e ver` é reversível por `Fechar caixa`;
- foco permanece no botão que acionou a mudança;
- mudança explícita pode anunciar `{Vista} da embalagem conceitual de {AROMA}`;
- sem JS, figuras aparecem em ordem e com captions;
- se houver apenas o mockup composto atual, usar uma única figura `Sistema completo`, não fingir cinco vistas.

## 6. Mapa da Home por viewport

### 6.1 Desktop amplo — 1280 a 1920

Container máximo `1440px`; margens absorvem o excedente.

```text
DEMO BANNER
HEADER — 84px

HERO — 12 colunas; min 700px, max 840px
┌────────────── 5 col ──────────────┬──── 4 col ────┬── 3 col ──┐
│ eyebrow / H1 / apoio / CTAs       │ organismo     │ seletor    │
│ disclosure                        │ SVG/Three      │ 5 opções   │
└────────────────────────────────────┴───────────────┴────────────┘

CONTINUITY TRACE — 1 linha, sem pin

CINCO RASTROS — heading 4 col + cards/rail 8 col
No primeiro frame da seção: 5 identidades visíveis ou uma lista completa,
sem carrossel como único acesso.

CAIXA — texto 5 col + mídia 7 col

ESCOLHA COM CONTEXTO — 4 blocos alinhados

FOOTER
```

Hero:

- padding block `clamp(4rem, 7vw, 7rem)`;
- copy não ultrapassa `40rem`;
- H1 máximo `9ch`;
- stage não tem borda externa nem figura retangular escura; o organismo compartilha o fundo do hero;
- selector possui linhas de separação, não cinco pills;
- CTA e disclosure permanecem fora da área do canvas.

### 6.2 Desktop compacto/tablet paisagem — 1024 a 1279

```text
HERO
┌──────── 6 col ────────┬──────── 6 col ───────┐
│ copy                  │ organismo            │
└───────────────────────┴──────────────────────┘
│ seletor horizontal em cinco itens abaixo     │
```

- selector pode quebrar em `3 + 2`, mantendo cada item ≥44px;
- seção de cards usa duas colunas;
- caixa usa duas colunas somente se texto e controles couberem sem compressão;
- a 200% de zoom, retornar à estrutura mobile antes de produzir overflow.

### 6.3 Tablet retrato — 768 a 1023

Ordem DOM e visual:

1. copy;
2. CTAs;
3. seletor de cinco linhas compactas ou grid `2 + 2 + 1`;
4. organismo limitado a `360px` de altura;
5. disclosure;
6. catálogo direto.

Cards em duas colunas apenas se `Lavanda Celestial`, preço e CTA couberem; caso contrário, uma coluna.

### 6.4 Mobile — 320, 360, 390 e 430

```text
DEMO BANNER — texto completo, quebra em 2 linhas
HEADER — HEAL / Sacola / Menu

HERO
eyebrow
H1
apoio
[Explorar os incensos]
[Conhecer os cinco HEALS]
[Ver todos os incensos — escape]

ESCOLHA UM RASTRO
[glyph] CANELA                  CNL
[glyph] LAVANDA CELESTIAL      LVC
[glyph] MIRRA                  MRR
[glyph] OLÍBANO                OLB
[glyph] ALECRIM                ALC

ORGANISMO — max min(56svh, 320px)
disclosure
[Pausar/Reduzir, se aplicável]

CINCO RASTROS — 1 card por linha
CAIXA — texto antes; mídia sob demanda
ESCOLHA COM CONTEXTO — lista, não quatro colunas comprimidas
FOOTER
```

Regras:

- gutter `16px` em 320–390 e `20px` em 430;
- H1 `clamp(3rem, 15vw, 4.75rem)` e sem corte;
- CTA primário largura total; CTA secundário pode ser link full width;
- seletor é lista vertical; não obrigar swipe;
- stage não excede 320px, não usa `100vh` e não entra antes do catálogo direto;
- nenhuma linha decorativa atravessa nome ou botão;
- safe area aplicada ao menu/drawer; teclado não cobre busca ou CTA;
- orientação landscape reduz/omite Three e mantém SVG.

## 7. Comportamento de movimento

### 7.1 Primeiro carregamento

1. HTML entrega texto, CTAs, seletor e glyph CANELA completo.
2. Nenhum conteúdo começa com opacity zero.
3. Quando o stage entra a pelo menos 35% da viewport e a página está visível, Anime pode redesenhar o glyph uma vez.
4. Three só pode ser importado depois do primeiro conteúdo crítico e apenas se os gates permitirem.
5. Não rodar apresentação se o usuário já interagiu antes de o stage ficar elegível.

### 7.2 Troca de aroma

Em ativação explícita:

1. atualizar imediatamente nome, código e `aria-pressed`;
2. cancelar timeline anterior e remover estilos inline pelo scope local;
3. manter o novo glyph completo no DOM;
4. reduzir o rastro anterior a opacity `.18` em 120ms;
5. desenhar o novo path pela cadência do manifesto;
6. contrarrastro entra nos últimos 35% da timeline;
7. terminal confirma uma vez em 180ms;
8. atualizar o status textual uma vez;
9. não mover foco, scroll ou layout.

Trocas rápidas são last-intent-wins. Nunca enfileirar cinco timelines.

### 7.3 Continuidade no scroll

- apenas o trecho hero → família reage ao scroll;
- sem pinning;
- a linha estática existe sem Anime;
- a versão animada é uma passagem curta, não progresso de página;
- não vincular fumaça ao cursor ou velocidade de scroll.

### 7.4 Coleção

- zero autoplay;
- foco, hover de ponteiro preciso ou tap explícito pode desenhar um glyph;
- no máximo uma timeline ativa;
- layout/filter pode usar `createLayout()` somente depois de preservar ordem DOM, foco e URL;
- duração de reorganização ≤420ms; instantânea em reduced motion.

### 7.5 PDP

- troca de vista 2.5D: 280–420ms, transform/opacity/clip somente;
- abertura ocorre apenas por `Abrir e ver`;
- sem perspectiva extrema, giro livre ou drag obrigatório;
- `Fechar caixa` restaura frente e estado do controle;
- brasa da sacola continua 180ms e só ocorre após sucesso do adapter.

### 7.6 Reduced motion, dados reduzidos e pausa

| Condição | Resultado obrigatório |
|---|---|
| `prefers-reduced-motion: reduce` | glyph final estático; nenhuma timeline; nenhum Three baixado |
| `prefers-reduced-data: reduce` | SVG + imagens econômicas; nenhum Three |
| `navigator.connection.saveData` | SVG; não importar runtime Three |
| `Pausar efeitos` | interrompe loop e mantém estado legível |
| `Reduzir efeitos` | troca para SVG estático e persiste na sessão |
| aba oculta | `setAnimationLoop(null)` imediatamente |
| fora da viewport | loop pausado; não continuar computação |
| context lost | SVG assume sem layout shift; seleção e CTA persistem |

## 8. Three.js — escopo autorizado

O runtime atual `EmberSmokeScene` é tecnicamente bem estruturado, mas visualmente genérico. Ele deve ser substituído no hero por um `AirOrganismScene`, reutilizando os mesmos gates e lifecycle.

### Cena

- uma câmera ortográfica;
- dois ou três ribbons de `BufferGeometry`;
- curvas-base determinísticas por `variantId`;
- `ShaderMaterial` simples para largura, fase, dissolução e contrarrastro;
- no máximo um `InstancedMesh` de poucos grãos abstratos junto da fonte;
- sem bloom, pós-processamento, textura 4K, física, vídeo ou iluminação complexa;
- pointer opcional apenas em tier high: perspectiva máxima `±2°`; desabilitado no primeiro build se não houver ganho claro;
- raycaster proibido no hero.

### API proposta

```ts
type AirRuntime = {
  setActive(active: boolean): void;
  setVariant(variantId: AirVariantId): void;
  setPaused(paused: boolean): void;
  dispose(loseContext?: boolean): void;
};
```

`setVariant` altera uniforms/curva sem criar novo renderer ou contexto. A troca não pode recriar todos os materiais.

### Budget

- um contexto WebGL na Home;
- até 10 draw calls;
- até 30k triângulos;
- até 3 ribbons;
- DPR: `1.15 low`, `1.5 medium`, `1.75 high`;
- FPS: `30 low`, `45 medium`, `60 high`;
- zero long animation frame >50ms atribuída ao hero no aparelho de referência;
- runtime Three ≤130 KiB gzip hard limit; atual ~125.2 KiB já está próximo do teto;
- nenhum segundo framework de motion.

## 9. Assets e verdade visual

### Ativos conceituais existentes

Os mockups em `docs/evidence/concepts/packaging/coreografia-v2/**` são evidência de conceito, não packshot. Eles podem ser usados no preview interno, mas devem ser excluídos do bundle/deploy de produção. No preview, cada uso carrega:

- badge visível `VISUAL CONCEITUAL`;
- caption de limite;
- alt que use `conceitual`;
- manifesto de proveniência;
- dimensões explícitas.

Exemplo de alt:

```text
Caixa conceitual do incenso HEALS Canela, com o rastro CNL; a embalagem e o produto ainda não foram fabricados ou validados.
```

### Regras de entrega

- não publicar o PNG de família de ~2.4 MiB diretamente;
- não usar o PNG atual como LCP de produção nem sobrepor a fumaça Three sobre ele;
- gerar AVIF/WebP responsivos em 640/960/1280 conforme crop real;
- alvo da mídia principal: ≤150 KiB; hard limit ≤250 KiB;
- primeira imagem de produção da PDP mostra HEAL, aroma e `incenso` sem zoom e corresponde ao produto/embalagem aprovados;
- mockup composto não vira falsa galeria de frente/lateral/verso;
- macro de bastão gerado continua `visual conceitual` e nunca prova composição, aspereza, quantidade ou queima;
- no preview sem asset: renderizar glyph + nome + `Imagem ainda não disponível`, preservando proporção;
- em produção, produto sem mídia aprovada não é publicado; não exibir placeholder de conceito ao consumidor.

## 10. Propagação para coleção

### Estrutura

```text
Breadcrumb
H1 HEALS — os incensos da HEAL
Resumo + contagem
[Comparar os rastros] [Ver lista sem mapa]
Ordenar/filtros reais
Grid de AirVariantCard; cinco itens na coleção inaugural, paginação para o catálogo completo
Tabela/Mapa do Ar opcional após o grid completo
```

### Mapa do Ar

- progressive enhancement opcional;
- cinco glyphs na mesma escala;
- seleção destaca card e atualiza descrição textual;
- não posicionar produtos por “benefício”, emoção, fumaça ou intensidade sem dados/método;
- com dados ainda bloqueados, o mapa compara somente identidade visual: nome, código e forma;
- `Ver lista sem mapa` ancora no grid e funciona sem JS;
- nenhuma seleção do mapa filtra silenciosamente o catálogo.

### Card

- em 320–767: uma coluna;
- 768–1023: duas somente após QA;
- 1024–1439: três;
- 1440+: cinco apenas se cada card mantiver pelo menos 240px úteis; caso contrário 3/4;
- `Lavanda Celestial` quebra em duas linhas; não reduzir até parecer rodapé;
- preço/estoque não herdam cor do aroma;
- preview interno explicita conteúdo não publicado; produção só renderiza dados aprovados.

### Escala para aproximadamente 50 produtos

O catálogo público não pode ser uma extensão do seletor de cinco itens do hero.

```text
/incensos
breadcrumb
H1 Incensos HEALS
resumo + contagem
busca dentro do catálogo
filtros reais + ordenação
chips aplicados + limpar
grid 24 produtos
paginação ou Carregar mais com URL
atalho para comparação de até 3
conteúdo de ajuda depois dos resultados
```

Facetas candidatas, publicadas somente com campo real e método:

1. família/perfil olfativo;
2. matéria/composição;
3. formato;
4. intensidade percebida;
5. nível de fumaça;
6. coleção;
7. disponibilidade;
8. preço;
9. uso/contexto editorial, sempre `para acompanhar`, nunca benefício prometido.

Regras de escala:

- primeira resposta SSR contém 24 itens ou quantidade definida pelo budget;
- paginação/`Carregar mais` atualiza `page`/cursor na URL e não perde Back/Forward;
- não usar infinite scroll como única navegação;
- busca cobre nome, código, aroma, matéria e conteúdo; aceita acento/singular/plural;
- header e mega menu não listam 50 produtos;
- coleção temática é curadoria; filtro é dado; não misturar os dois silenciosamente;
- filtro mobile usa drawer full-screen em 320px e aplica em lote;
- comparação limita 3 produtos e campos homologáveis;
- cards não carregam animação/asset da próxima página preventivamente;
- `AirVariantCard` recebe identidade pelo registro; nenhum `switch` com 50 casos;
- produtos sem identidade visual pronta podem usar nome/código/packshot, mas não recebem glyph genérico reciclado;
- `draft`, esgotado e retirado possuem comportamentos editoriais/commerce distintos.

### Busca e caminhos profissionais

- `/buscar` pesquisa produtos, coleções, guia, segurança, profissionais e revenda em grupos separados;
- consulta terapêutica não retorna promessa; mostra produtos por atributos literais e um limite editorial curto;
- `/profissionais` explica aplicação operacional, fichas, uso, segurança, suporte e compra recorrente somente quando o serviço existir;
- `/revenda` apresenta catálogo/condições comerciais reais, contato e qualificação mínima; não simula preço de atacado, MOQ, prazo ou margem;
- conta B2B, tabela especial e pedido em volume só aparecem depois de backend/contrato real;
- conteúdo público de profissionais continua indexável e compreensível sem login; preço/condição privada pode exigir sessão quando existir.

## 11. Propagação para PDP

### Primeiro frame desktop

```text
┌────────────── 7 col ──────────────┬──────── 5 col ────────┐
│ PackagingInspector2D              │ categoria/código      │
│ mídia conceitual com caption      │ H1 aroma + incenso    │
│ controles de vista reais          │ fatos / preço / stock │
│                                   │ quantidade / CTA      │
└────────────────────────────────────┴────────────────────────┘
```

### Primeiro frame mobile

1. breadcrumb;
2. `INCENSO HEALS` + código;
3. H1;
4. resumo factual/limite;
5. figura principal;
6. glyph/nome;
7. preço, estoque, quantidade e CTA;
8. inspeção adicional sob ação;
9. prova, uso e segurança.

### Continuidade visual

- o mesmo glyph da Home aparece estático junto do H1;
- a mesma cor acentua somente linha/terminal;
- a caixa usa o aroma dominante e `incenso HEALS` secundário;
- `HEAL / HEALS` nunca aparecem como dois logos empilhados;
- transição card → PDP pode usar View Transition API, mas navegação normal e foco no H1 são o baseline.

### Dados e compra

- `PackagingInspector2D` nunca encobre preço, estoque ou CTA;
- compra não espera animação;
- `inventory=unknown` continua bloqueando e precisa de retry real antes de release;
- quantidade, CEP, estados de add e handoff seguem `FRONTEND_UX_BEHAVIOR.md`;
- nenhum sucesso visual antecede resposta autoritativa.

## 12. Acessibilidade

### Semântica

- um H1 por rota;
- H2s em ordem, sem headings usados apenas por tamanho;
- canvas `aria-hidden=true`; SVG informativo tem nome; SVG decorativo é oculto;
- seletor usa texto visível igual ao nome acessível;
- status de seleção é `role=status`, educado e só muda por ação explícita;
- não anunciar cada frame, progresso do path ou movimento.

### Interação

- todos os alvos ≥44×44 CSS px; opções mobile ≥48px de altura;
- nenhum hover, drag, swipe, scroll ou cor é obrigatório;
- foco visível com 3px + offset 3px em claro e escuro;
- overlays fecham por botão e Esc e devolvem foco;
- voltar da PDP restaura card/filtro/scroll quando esse contrato for implementado;
- sticky UI não cobre foco; `scroll-padding-block-start` acompanha header.

### Preferências e modos

- reduced motion preserva toda a história em glyphs finais e captions;
- forced colors: glyph usa `currentColor`, canvas some, seleção usa outline + texto;
- zoom 200% e reflow 320px: zero scroll horizontal da página;
- sem CSS avançado: conteúdo e links permanecem em ordem útil;
- sem JS: os cinco aromas, grid e dados comerciais continuam disponíveis.

### Testes manuais mínimos

1. teclado completo no hero, seletor, coleção e inspector;
2. NVDA + Chrome ou equivalente: primeiro frame, seleção e add confirmado;
3. 320px a 200% de zoom;
4. forced colors;
5. reduced motion antes da carga e alterado durante a sessão;
6. context loss/WebGL ausente;
7. mídia ausente;
8. foco depois de voltar da PDP.

## 13. Performance e robustez

Gates herdados de `docs/performance/PERFORMANCE_BUDGET.md`:

| Métrica | Gate |
|---|---:|
| LCP mobile p75 | ≤2.5s |
| INP p75 | ≤200ms |
| CLS | ≤0.1 |
| JS inicial sem Three | ≤180 KiB gzip hard |
| chunk Three | ≤130 KiB gzip hard |
| JS total com cena | ≤300 KiB gzip hard |
| CSS total | ≤20 KiB gzip hard |
| primeira mídia | ≤250 KiB hard |
| erro JS que impede compra | 0 |

Regras específicas:

- carregar Anime de forma granular e apenas na ilha que usa a timeline;
- não importar Three no bundle da coleção, PDP baseline, carrinho ou checkout;
- medir Home com Three on/off e reduced motion;
- `AirHeroExperience` não pode transformar a Home inteira em client component;
- nunca duplicar SVG pesado cinco vezes em hero + cards; usar paths pequenos ou sprite acessível;
- reservar `aspect-ratio`/dimensões de toda mídia;
- pausar loops antes de iniciar navegação;
- regressão >10% em bytes, LCP, INP ou long frames exige justificativa e aprovação.

## 14. Estados e falhas

| Estado | Home | Coleção | PDP |
|---|---|---|---|
| JS ausente | glyphs e links completos | grid completo | figura + compra completa |
| Anime falha | estado final | glyph estático | troca instantânea |
| Three não carrega | SVG sem mensagem de erro intrusiva | não aplicável | não aplicável no baseline |
| WebGL context lost | SVG assume, sem CLS | não aplicável | se challenger, still assume |
| mídia ausente | glyph + rótulo | placeholder por SKU | figura placeholder + caption |
| catálogo falha | Home mostra erro + coleção | erro distinto de zero + retry | notFound/erro conforme fonte |
| produto sem dado | `[A VALIDAR]`, sem inferência | mesmo | mesmo + compra bloqueada se crítico |
| reduced motion | estático | estático | stills em ordem |
| pause | loop suspenso | nenhuma animação ativa | inspeção para no estado atual |
| troca rápida | última seleção vence | último card acionado vence | última vista vence |

## 15. Lista precisa do que remover/substituir

### `site/app/page.tsx`

Remover ou substituir:

- `Acenda o intervalo.` → `O ar deixa um rastro.`;
- `ritual contemporâneo` no eyebrow;
- `Incensos para escolher pela atmosfera...`;
- `hero-proof` com `Escolha / Prova / Ritual`;
- `<figure className="hero-visual">` como moldura lateral;
- `EmberSmokeScene` como cena neutra genérica;
- sobreposição da cena de fumaça genérica sobre o mockup de cinco caixas;
- `EditorialSeamReveal` como seam de brasa;
- seção `Duas portas para a mesma pausa.`;
- cards `Por matéria` e `Por momento` como dois blocos estáticos gigantes;
- numeração decorativa `01/02`;
- heading `Intervalos.` e a dependência narrativa em três fixtures numeradas;
- `Passaporte sensorial` + `Sentir também pode ser compreensível.`;
- lista `01/02/03/04` quando os valores ainda não estão validados;
- tagline do footer `Incensos para escolher pela atmosfera e entender pela matéria.`.
- rótulos inventados `Pulso / Véu / Nó / Arco / Ramo`; os códigos aprovados são `CNL/LVC/MRR/OLB/ALC`;
- copy `presença que você procura` e `matéria que existe dentro da caixa` enquanto presença/composição não têm dados reais;
- grid decorativo de cinco colunas quando não organiza conteúdo nem interação;
- PNG de família de ~2.4 MiB no LCP.

Substituir por:

- hero Coreografia;
- seletor dos cinco rastros;
- continuidade curta do rastro;
- cinco identidades de aroma;
- seção de caixa conceitual;
- método `O rastro orienta. Os dados confirmam.`.

### `site/app/globals.css`

Retirar da nova Home, mantendo aliases temporários apenas para rotas não migradas:

- Georgia como assinatura central;
- creme/carvão/terracota como única diferenciação;
- `.hero-visual` com borda 4:5;
- `.choice-grid`, `.choice-card-*`, `.card-index`;
- `.hero-proof`;
- `.transition-seam` antigo;
- `.method-strip` numerado;
- hovers que apenas mudam o card inteiro de cor.

Não apagar classes ainda consumidas por rotas ou agentes em paralelo. Fazer migração por componente e remover CSS morto depois de `rg` + testes.

### Motion/Three

- aposentar `EmberSmokeScene` da Home depois de o fallback e o runtime `AirOrganismScene` estarem verdes;
- aposentar `EditorialSeamReveal` da Home; `EmberCartFeedback` permanece;
- não deletar arquivos enquanto houver imports/testes; remover em commit separado e verificável;
- não reutilizar a vareta lisa de 2px como representação do produto.

### Commerce/catalog

- substituir títulos `Intervalo 01/02/03` pelos cinco produtos inaugurais somente numa tarefa coordenada com catalog owner e sem fechar o schema nesses cinco;
- não criar preços, quantidades, notas, famílias, ingredientes, origem ou tempo de queima para preencher espaço;
- se os cinco conceitos entrarem no preview interno, o aviso interno e provenance continuam obrigatórios;
- o adapter de fixture não entra no build público; produção só lista SKUs que passam o gate da seção 0.1.

## 16. Sequência de implementação

### Wave 0 — baseline e contrato

1. Capturar screenshots/DOM/bytes da Home atual em 320, 390, 1024 e 1440.
2. Registrar build e chunks atuais.
3. Criar `air-identities.ts` e testes de unicidade de id/code/path.
4. Reconciliar `MRR` e manter todos os cinco nomes com acento correto.
5. Criar gate que impede `fixtureCommerce`, asset conceitual e produto `draft` no build de produção.
6. Definir redirects futuros sem ativá-los antes das rotas `/incensos`.

Gate: nenhuma alteração visual ainda; manifesto testado.

### Wave 1 — Home estática

1. Implementar tokens com aliases para rotas antigas.
2. Implementar `ProductFamilyTerm` e `AirGlyph`.
3. Reescrever a Home com a copy desta especificação.
4. Implementar hero, coleção inaugural, método, seção de caixa, caminhos profissionais e história sem Anime/Three.
5. No preview, garantir aviso interno e concept labels; no build de produção, provar ausência do fixture e de concept art.

Gate: JS desligado, 320px, teclado e axe; toda jornada continua clara.

### Wave 2 — interação SVG/Anime

1. Implementar `AirHeroExperience` e selector.
2. Adicionar timeline cancelável por SKU.
3. Implementar `AirContinuityTrace`.
4. Adicionar pausa/redução e live status pontual.
5. Cobrir troca rápida e preferência dinâmica.

Gate: nenhuma fila de timeline, nenhum foco movido, reduced motion zero animação.

### Wave 3 — Three challenger no hero

1. Refatorar lifecycle validado do runtime atual.
2. Implementar curvas por SKU e `setVariant`.
3. Manter SVG renderizado como fallback.
4. Rodar budget, context loss, aba oculta, viewport e saveData.
5. Comparar captura/performance com SVG/Anime.

Gate: Three só permanece se não reduzir clareza e respeitar todos os hard limits.

### Wave 4 — coleção

1. Atualizar o catálogo para os cinco produtos inaugurais em tarefa própria, mantendo schema aberto para cerca de 50.
2. Implementar `AirVariantCard` sem Three.
3. Propagar nome/código/glyph/padrão.
4. Implementar comparação somente de identidade até dados reais existirem.
5. Preservar busca, filtros, erro versus zero e URL.
6. Criar `/incensos` com paginação e testar pelo menos uma fixture de 50 itens sintéticos no ambiente interno para provar layout/estado, sem publicar esses itens.

Gate: encontrar CANELA e MIRRA, comparar e abrir PDP por teclado/mobile.

### Wave 5 — PDP

1. Reescrever heading/breadcrumb com contrato HEALS.
2. Implementar figura conceitual honesta.
3. Adicionar `PackagingInspector2D` apenas com frames reais disponíveis.
4. Manter compra e fatos antes/de fora da experiência.
5. Adicionar View Transition opcional depois de foco/back estarem corretos.

Gate: inspeção não altera sucesso de compra, INP, foco ou compreensão.

### Wave 6 — hardening geral

1. Lint, typecheck, unit, integration, E2E, axe e build.
2. Chromium/Firefox/WebKit; 320–1920; zoom 200%.
3. reduced motion/data, forced colors, no-WebGL, context loss, mídia ausente.
4. screenshots de normal/erro/fallback.
5. medir chunks e performance.
6. remover CSS/imports antigos comprovadamente mortos.

## 17. Critérios de aceite

### Marca e entendimento

- [ ] 5-second test: pelo menos 90% identifica `incensos` sem canvas.
- [ ] HEAL é percebida como marca e HEALS como sistema de incensos.
- [ ] `HEAL / HEALS` não parecem dois logos empilhados.
- [ ] aroma, categoria e marca são legíveis em 160px de thumbnail.
- [ ] os cinco SKUs são distinguíveis sem cor e sem movimento.
- [ ] adicionar o sexto e o quinquagésimo item não exige alterar componente ou header.
- [ ] `Lavanda Celestial` não usa iconografia cósmica/mística nem claim.

### Home

- [ ] H1, apoio e CTA existem no HTML inicial.
- [ ] todos os cinco controles são alcançáveis e nomeados.
- [ ] foco não seleciona; ativação explícita seleciona.
- [ ] troca rápida termina no último aroma sem animação residual.
- [ ] caminho direto ao catálogo aparece antes da experiência avançada no mobile.
- [ ] não existe scroll hijacking, pinning longo ou conteúdo escondido por animação.

### Coleção/PDP

- [ ] coleção completa funciona sem Mapa do Ar.
- [ ] nenhum card começa em loop.
- [ ] PDP mostra categoria, produto, preço, estoque, quantidade e CTA antes da inspeção avançada.
- [ ] controle de vista só existe se a imagem correspondente existe.
- [ ] concept art é impossível de confundir com packshot real.
- [ ] carrinho/checkout não carregam Three.

### Acessibilidade

- [ ] teclado, foco visível, screen reader smoke e targets ≥44px.
- [ ] 320px + zoom 200% sem overflow ou foco coberto.
- [ ] reduced motion preserva exatamente a mesma informação.
- [ ] forced colors preserva nome, seleção, outline e glyph.
- [ ] canvas é decorativo e nenhuma relação existe só dentro dele.

### Performance

- [ ] hard limits da seção 13 aprovados.
- [ ] nenhum loop fora de viewport/aba.
- [ ] saveData/reduced data não baixa Three.
- [ ] context loss troca para SVG sem CLS.
- [ ] imagem principal ≤250 KiB e possui dimensões.
- [ ] nenhuma regressão >10% sem justificativa aprovada.

### Verdade

- [ ] nenhum claim de efeito, ingrediente, duração, fumaça, origem ou sustentabilidade sem fonte.
- [ ] preview interno mantém provenance/aviso; produção não contém adapter/dados de fixture.
- [ ] produção não publica SKU com mídia, rótulo, uso/segurança, preço ou estoque incompletos.
- [ ] concept art permanece restrita ao preview interno e nunca é packshot público.
- [ ] sucesso de add só anima depois da confirmação real da camada de commerce.
- [ ] profissionais, espiritualidade e revenda são contextos de uso/audiência, não claims de resultado.
- [ ] não há urgência falsa, escolha pré-marcada, scroll coercitivo, confirmshaming ou mensagem subliminar.

## 18. Definition of done da direção no site

A Coreografia do ar só pode ser chamada de implementada quando:

1. Home, coleção e PDP usam o mesmo registro versionado de identidades; os cinco inaugurais são o primeiro conjunto, não o limite;
2. o glyph estático é reconhecível e o movimento apenas o revela;
3. todos os modos de fallback executam as mesmas tarefas;
4. o site passa os gates funcionais, acessíveis e de performance;
5. nenhuma mídia conceitual foi promovida a prova de produto ou incluída no storefront público;
6. a camada comercial continua íntegra;
7. screenshots e relatórios cobrem desktop, mobile, reduced, no-WebGL e erro;
8. o usuário aprova a expressão visual renderizada, não apenas esta documentação.

## 19. Próximo passo real

Implementar **Wave 0 + Wave 1** primeiro. Essa entrega precisa provar a identidade parada: cinco glyphs inaugurais, Home clara, história, caminhos profissional/revenda, gate de produção e preview conceitual isolado. Só depois integrar Anime.js; Three.js entra como challenger mensurado, aproveitando o lifecycle atual, sem bloquear a conclusão visual ou comercial do site.
