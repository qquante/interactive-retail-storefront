# HEAL. CURA. — Modelo de conteúdo

Data: 2026-08-28  
Owner: HEAL-04  
Estado real: `docs` — contrato editorial para fixture e integração futura; nenhum conteúdo de produto foi validado.  
Dependências: `docs/brand/POSITIONING.md`, `docs/ux/SITEMAP_AND_FLOWS.md`, `docs/ux/LOW_FIDELITY_WIREFRAMES.md`, `docs/commerce/COMMERCE_CONTRACT.md`.

## 1. Objetivo

Este modelo separa três coisas que não podem se confundir:

1. **Dados comerciais autoritativos:** preço, variante, estoque, frete, desconto e checkout vêm do commerce adapter.
2. **Fatos editoriais comprovados:** composição, origem, formato, quantidade, uso, segurança, processo e avaliações sensoriais vêm de fonte identificada, com owner e revisão.
3. **Expressão de marca:** títulos, narrativa, contexto de uso e microcopy podem interpretar a experiência, mas não podem criar fatos, alegações de saúde ou disponibilidade comercial.

Até o recebimento de catálogo e documentação reais, todos os itens da vertical slice pertencem ao modo `fixture`, com rótulo persistente de demonstração. `[A VALIDAR]` é um marcador de trabalho interno; não deve virar uma alegação publicável.

## 2. Modos e estados obrigatórios

### 2.1 Modo do conteúdo

```ts
export type ContentMode = "fixture" | "draft" | "production";
```

- `fixture`: conteúdo fictício, usado somente para testar interface e fluxo.
- `draft`: conteúdo baseado em material recebido, ainda não liberado para publicação.
- `production`: conteúdo com fonte, owner, revisão e data registrados.

### 2.2 Estado de verdade de um campo

```ts
export type TruthStatus =
  | "demonstration"
  | "a_validar"
  | "validated"
  | "blocked"
  | "expired";

export interface EvidenceRef {
  id: string;
  label: string;
  sourceType:
    | "manufacturer"
    | "supplier"
    | "internal_test"
    | "commerce"
    | "legal"
    | "customer_service"
    | "other";
  sourceUri: string | null;
  sourceDocument: string | null;
  owner: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  validUntil: string | null;
  notes: string | null;
}

export interface VerifiedField<T> {
  value: T | null;
  status: TruthStatus;
  evidenceIds: readonly string[];
  updatedAt: string;
  owner: string;
}
```

### 2.3 Regra de renderização

| Estado | Ambiente de demonstração | Produção |
|---|---|---|
| `demonstration` | Renderizar apenas com rótulo persistente `DEMONSTRAÇÃO`. | Bloquear build/publicação. |
| `a_validar` | Renderizar como placeholder editorial inequívoco ou omitir. | Omitir ou bloquear a página, conforme criticidade. |
| `validated` | Renderizar com o mesmo valor aprovado. | Renderizar. |
| `blocked` | Não renderizar como benefício; explicar internamente o motivo. | Não renderizar. |
| `expired` | Avisar owner e remover de campanhas/schema/feed. | Não renderizar até nova validação. |

Preço, estoque, disponibilidade, frete e total não usam `VerifiedField`: continuam autoritativos no `CommercePort`. O conteúdo apenas escolhe o rótulo da UI para o estado recebido.

## 3. Proveniência mínima

Todo fato publicável precisa responder:

- qual é a afirmação exata;
- para qual produto, variante, lote ou política ela vale;
- de onde veio;
- quem é responsável por mantê-la;
- quando foi revisada;
- quando precisa ser revalidada;
- onde aparece em UI, metadata, schema, feed, CRM e materiais impressos.

O CMS/metafield futuro deve guardar referências de evidência, não apenas o texto final. Uma mudança de fato deve disparar revisão de todos os consumidores.

## 4. Vocabulário controlado

### 4.1 Termos que não são sinônimos

| Termo | Definição editorial | Fonte necessária |
|---|---|---|
| Ingrediente/composição | Matéria declarada como parte física do produto. | Fabricante/fornecedor e escopo por SKU. |
| Nota percebida | Descritor olfativo registrado por método sensorial; pode não ser ingrediente. | Método, avaliador(es), data e produto/lote. |
| Família aromática | Categoria editorial que agrupa notas percebidas. | Taxonomia publicada e regra de classificação. |
| Intensidade percebida | Comparação sensorial dentro do catálogo HEAL. | Escala, condições de teste e amostra. |
| Nível de fumaça | Comparação observada, não sinônimo de segurança. | Método de observação, condições e produto/variante. |
| Formato | Forma comercial real: vareta, cone, resina etc. | Cadastro/ficha do produto. |
| Tempo de queima | Intervalo aproximado sob condições especificadas. | Teste ou documentação do fabricante. |
| Origem | Local de fabricação e/ou origem de matéria, sempre nomeados separadamente. | Documento do fornecedor/fabricante. |
| Contexto de uso | Sugestão editorial de ocasião, sem resultado garantido. | Revisão editorial e claims gate. |
| Reposição | Nova compra do mesmo produto/variante. | SKU real. |
| Refil | Item físico criado para repor outro sistema/recipiente. | SKU, compatibilidade e embalagem reais. |

### 4.2 Valores candidatos, ainda não catálogo

As listas abaixo ajudam a projetar filtros, mas permanecem `[A VALIDAR]`:

- família: `amadeirada`, `resinosa`, `herbal`, `floral`, `cítrica`, `especiada`, `terrosa`;
- intensidade: `suave`, `média`, `marcante`;
- fumaça: `baixa`, `média`, `presente`;
- contexto editorial: `para começar`, `para acompanhar`, `para receber`, `para encerrar`, `para presentear`.

Não publicar um valor que não tenha produtos reais, método e definição acessível.

## 5. Entidades de conteúdo

### 5.1 Configuração da marca

```ts
export interface BrandContent {
  legalBrandName: VerifiedField<string>;
  commercialName: VerifiedField<string>;
  categoryLabel: "loja de incensos";
  proposition: string;
  taglineCandidate: string | null;
  supportChannels: readonly VerifiedField<SupportChannel>[];
  businessIdentity: VerifiedField<BusinessIdentity>;
  socialProfiles: readonly VerifiedField<SocialProfile>[];
}
```

Regras:

- `HEAL. CURA.` é marca; `Heal Incensos` é nome comercial candidato.
- A palavra `cura` nunca pode ser usada como verbo, benefício ou outcome do produto.
- A categoria `incenso` deve aparecer no H1, title/description ou primeira explicação de toda landing de descoberta.
- Tagline candidata só vira aprovada após teste de compreensão e claims review.

### 5.2 Conteúdo de coleção

```ts
export interface CollectionContent {
  collectionId: string;
  handle: string;
  mode: ContentMode;
  title: string;
  shortDescription: string;
  longDescription: string | null;
  collectionKind: "aromatic_family" | "moment" | "format" | "gift" | "editorial";
  interpretation: string | null;
  methodologyRef: string | null;
  seo: SeoContent;
  media: readonly MediaAsset[];
  evidenceIds: readonly string[];
}
```

Uma coleção por família depende de taxonomia validada. Uma coleção por momento é curadoria editorial e precisa explicar por que os produtos aparecem, sem diagnosticar estado emocional. Coleção vazia não é publicada.

### 5.3 Conteúdo de produto

```ts
export interface ProductEditorialContent {
  productId: string;
  handle: string;
  mode: ContentMode;
  displayName: string;
  categoryLabel: "Incenso";
  oneLineSummary: string;
  sensoryNarrative: VerifiedField<string>;
  perceivedNotes: VerifiedField<readonly string[]>;
  aromaticFamily: VerifiedField<string>;
  perceivedIntensity: VerifiedField<"soft" | "medium" | "marked">;
  smokeLevel: VerifiedField<"low" | "medium" | "high">;
  format: VerifiedField<string>;
  ingredients: VerifiedField<readonly string[]>;
  manufacturingOrigin: VerifiedField<string>;
  ingredientOrigins: VerifiedField<readonly IngredientOrigin[]>;
  quantityLabel: VerifiedField<string>;
  dimensionsLabel: VerifiedField<string>;
  burnTimeLabel: VerifiedField<string>;
  processDescription: VerifiedField<string>;
  usageInstructions: VerifiedField<readonly InstructionStep[]>;
  safetyInstructions: VerifiedField<readonly SafetyStatement[]>;
  storageInstructions: VerifiedField<readonly string[]>;
  disposalInstructions: VerifiedField<readonly string[]>;
  contextSuggestions: readonly string[];
  seo: SeoContent;
  media: readonly MediaAsset[];
}
```

Regras:

- `displayName`, `summary` e narrativa não podem substituir `categoryLabel`.
- `perceivedNotes` não alimenta `ingredients`.
- intensidade e fumaça exigem `methodologyRef`; sem isso, ficam nulas.
- uso e segurança são versionados por produto/variante; texto genérico não pode sobrepor instrução do fabricante.
- produto comprável aponta para variante/SKU no contrato de commerce; conteúdo não cria preço nem estoque.

### 5.4 Método sensorial

```ts
export interface SensoryMethod {
  id: string;
  title: string;
  status: TruthStatus;
  scope: readonly string[];
  environment: string;
  samplePreparation: string;
  evaluators: string;
  scaleDefinitions: readonly ScaleDefinition[];
  limitations: readonly string[];
  performedAt: string;
  reviewedBy: string;
}
```

Sem método aprovado, cards e PDPs devem dizer `Intensidade: [A VALIDAR]` apenas no protótipo interno, ou omitir a escala em produção.

### 5.5 Instrução e segurança

```ts
export interface InstructionStep {
  order: number;
  instruction: string;
  productScope: readonly string[];
  manufacturerEvidenceId: string;
}

export interface SafetyStatement {
  statement: string;
  severity: "information" | "warning" | "critical";
  productScope: readonly string[];
  manufacturerEvidenceId: string;
  reviewedBy: string;
}
```

Para a fixture, o bloco de segurança não contém procedimento inventado. Ele contém somente a advertência editorial:

> `[DEMONSTRAÇÃO] As instruções de uso e segurança deste produto ainda não foram fornecidas nem validadas. Este protótipo não deve ser usado como orientação de uso.`

Na produção, remover esse placeholder apenas quando houver instrução por SKU/variante e revisão do owner responsável.

### 5.6 Políticas e ajuda

```ts
export interface PolicyPage {
  kind: "shipping" | "returns" | "privacy" | "cookies" | "terms" | "contact";
  status: TruthStatus;
  title: string;
  summary: string;
  effectiveAt: string | null;
  updatedAt: string | null;
  owner: string;
  reviewedBy: string | null;
  sections: readonly ContentSection[];
  contactRef: string | null;
}
```

Política incompleta não recebe texto jurídico genérico. Enquanto os fatos não existirem, a rota deve ficar fora de indexação e marcada como bloqueio de lançamento.

### 5.7 Conteúdo editorial/Journal

```ts
export interface EditorialArticle {
  id: string;
  handle: string;
  mode: ContentMode;
  title: string;
  dek: string;
  body: readonly ContentBlock[];
  author: VerifiedField<PersonOrTeam>;
  methodology: string | null;
  sources: readonly EvidenceRef[];
  reviewedBy: string | null;
  reviewedAt: string | null;
  relatedProductIds: readonly string[];
  relatedPageIds: readonly string[];
  seo: SeoContent;
}
```

Todo artigo deve resolver uma pergunta real. Não criar páginas em escala para consultas de saúde, cidades, aromas ou ocasiões sem experiência própria e valor único.

## 6. Conteúdo técnico, SEO e mídia

```ts
export interface SeoContent {
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  robots: "index,follow" | "noindex,follow" | "noindex,nofollow";
  socialTitle: string;
  socialDescription: string;
  schemaEligibility: "eligible" | "blocked_missing_facts" | "not_applicable";
}

export interface MediaAsset {
  id: string;
  kind: "product" | "detail" | "scale" | "process" | "usage" | "editorial" | "decorative";
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string | null;
  rightsOwner: string;
  licenseOrPermission: string;
  syntheticOrigin: boolean;
  capturedAt: string | null;
  productIds: readonly string[];
  evidenceIds: readonly string[];
}
```

Regras:

- Alt text descreve o que é útil para compreender produto/ação; imagem decorativa usa alt vazio.
- Imagem conceitual ou gerada não pode representar composição, fumaça, escala, acabamento ou embalagem como fato.
- `Product`, `Offer`, frete, devolução e rating só entram em schema quando forem visíveis, factuais e consistentes com commerce/feed.
- Fixture usa `noindex` e nunca publica rating, review, preço “real”, estoque real ou política estruturada.

## 7. Nomenclatura provisória da fixture

Esta nomenclatura existe para montagem de UI, não para lançamento ou registro de marca.

### Linha e caminhos editoriais

- Linha de demonstração: `Intervalos — [DEMONSTRAÇÃO]`.
- Caminho: `Para começar — [DEMONSTRAÇÃO]`.
- Caminho: `Para acompanhar — [DEMONSTRAÇÃO]`.
- Caminho: `Para receber — [DEMONSTRAÇÃO]`.
- Caminho: `Para encerrar — [DEMONSTRAÇÃO]`.

### Produtos de demonstração

- `HEAL Intervalo 01 — Incenso [FORMATO A VALIDAR] [DEMONSTRAÇÃO]`.
- `HEAL Intervalo 02 — Incenso [FORMATO A VALIDAR] [DEMONSTRAÇÃO]`.
- `HEAL Intervalo 03 — Incenso [FORMATO A VALIDAR] [DEMONSTRAÇÃO]`.

Os números mantêm a fixture neutra: não afirmam ingrediente, lugar, tradição, autoria, duração ou benefício. Famílias, notas, composição, origem, preço, estoque, intensidade e fumaça continuam nulos ou explicitamente demonstrativos.

### Padrão futuro de nome

```text
HEAL + nome proprietário aprovado
subtítulo factual: Incenso + formato real
variante: quantidade/formato real
```

Evitar nomes que prometam outcome (`Calma`, `Sono`, `Foco`, `Cura`), apropriem tradição/lugar sem vínculo ou sugiram matéria que não está na composição.

## 8. Slots por rota da vertical slice

| Rota | Slots obrigatórios | Fonte |
|---|---|---|
| Home | H1 de categoria, proposta, CTAs, famílias/caminhos, destaques, método e confiança | Marca + catálogo/commerce |
| Coleção | H1, explicação concreta, contagem, filtros disponíveis, card de produto, estado zero | Conteúdo + catálogo |
| PDP | nome, categoria, resumo, narrativa sensorial, fatos, segurança, preço/estoque/frete, CTA | Conteúdo + commerce |
| Carrinho | itens, quantidade, estado por linha, total estimado, frete, ações, erros | Commerce + microcopy |
| Handoff | rótulo de modo, resumo, estado do checkout, destino quando real, retry/voltar | Commerce |

Em qualquer modo fixture, o rótulo persistente é:

> **Demonstração — produtos, valores, estoque e frete fictícios; nenhum pagamento será processado.**

## 9. Workflow editorial

1. Conteúdo recebe ficha e identifica o escopo exato por SKU/variante.
2. Cada fato entra como `a_validar` com evidence ID.
3. Owner de produto/comercial valida cadastro; segurança e claims seguem owners específicos.
4. Conteúdo redige descrição sem ampliar o que a fonte permite.
5. SEO revisa title, description, headings, links e schema eligibility.
6. Commerce compara UI, backend, feed e schema para preço/estoque/políticas.
7. Revisor independente verifica fonte → campo → renderização.
8. Somente então o estado muda para `validated` e a página pode ser indexável.

Mudança de produto, fornecedor, lote, política, preço ou método reabre a revisão correspondente.

## 10. Gates de aceite para implementação

1. Fixture, sandbox e produção aparecem como estado serializado e rótulo visível.
2. Conteúdo nunca sobrescreve preço, estoque, frete, desconto ou total do commerce.
3. Ingrediente e nota percebida são campos diferentes em schema e UI.
4. Intensidade/fumaça sem método não aparecem como fato.
5. Uso/segurança sem fonte do fabricante permanecem bloqueados; fixture declara que não é instrução real.
6. Toda imagem tem rights/provenance; imagem conceitual não prova produto.
7. Páginas de política não indexam enquanto incompletas.
8. Copy não contém review, certificação, origem, sustentabilidade, tempo, desconto, urgência ou benefício não comprovado.
9. SEO/schema/feed consomem apenas campos validados e visíveis.
10. Produto e CTA continuam compreensíveis sem motion, WebGL ou imagem.

## Handoff

- **HEAL-08/09:** implementar tipos editoriais separados dos tipos de commerce e um badge de provenance impossível de ocultar na fixture.
- **HEAL-13/14:** mapear IDs e campos autoritativos; impedir que CMS substitua preço/estoque/frete.
- **HEAL-15/16:** criar metadata e schema somente para conteúdo elegível; fixture deve ser `noindex`.
- **HEAL-19:** validar claims, política, LGPD e safety workflow.
- **HEAL-21:** testar estados ausente, inválido, expirado e divergente, inclusive comparação UI/schema/feed.
