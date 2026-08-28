# HEAL — Playbook de Images, Lens, Merchant Center e descoberta por IA

Data da verificação: **2026-08-28**  
Owner: **HEAL-16 — SEO ecommerce, conteúdo e descoberta por IA**  
Estado real: **playbook proposto; sem catálogo real, feed, contas Search Console/Merchant Center/Bing ou mídia elegível de produto**

## 1. Decisão executiva

Para a HEAL, descoberta visual e generativa não é uma camada de “hacks”. O sistema depende de:

- páginas rastreáveis e conteúdo essencial no HTML;
- produto, variante, preço e disponibilidade reais e consistentes;
- imagens documentais vinculadas ao SKU, com direitos e contexto;
- conteúdo próprio com método, autoria, evidência e limites;
- feed Merchant Center somente depois dos gates comerciais;
- métricas oficiais interpretadas sem transformar impressão/citação em venda.

Não criar `llms.txt`, schema “de IA”, doorway por fan-out, avaliações, GTIN, shipping, estoque, imagem de produto ou autoridade fictícios.

## 2. Estado atual inspecionado

### Implementado

- `site/public/og.png`: cartão social 1200×630, gerado por IA e marcado como demonstrativo no manifesto de proveniência;
- `docs/evidence/assets/heal-ritual-demo.*`: still-life conceitual gerado por IA, sem embalagem/produto HEAL real, preservado como evidência fora do deploy;
- metadata social só publica a imagem quando `SITE_ORIGIN` é confiável;
- fixture globalmente `noindex`, sem Product/Offer/feed;
- assets conceituais são excluídos de Merchant Center, schema factual e prova de catálogo em `docs/assets/PROVENANCE.md`.

### Ausente / dependência externa

- fotografia real de produto, embalagem, escala, detalhe, uso e processo;
- vínculo asset → SKU/variante e direitos de uso;
- domínio/URLs públicas estáveis;
- feed, conta e aprovação Merchant Center;
- Search Console, Bing Webmaster Tools e métricas de campo;
- GTIN/MPN/brand, frete, devolução, preço e estoque autoritativos.

Conclusão: **nenhum asset atual deve ser enviado como `image_link`, `additional_image_link` ou `lifestyle_image_link` de um produto.**

## 3. Taxonomia de mídia e uso permitido

| Classe | O que prova | Uso | Requisito |
|---|---|---|---|
| Produto principal | aparência do SKU/variante vendido | PDP, card, `image_link` | captura real, produto claro, variante correta, mínimo interno 1500×1500 |
| Produto adicional | verso, embalagem, escala e detalhes | PDP, `additional_image_link` | mesma entidade/SKU, sem omitir aspecto material |
| Lifestyle real | contexto de uso do produto real | PDP, editorial, `lifestyle_image_link` quando elegível | produto identificável, encenação segura e factual |
| Processo/procedência | fabricação, matéria ou teste | `/materia`, Journal | local/data/autor/escopo e autorização verificáveis |
| Método sensorial | como HEAL chegou a uma descrição | guia, PDP, Journal | protocolo, amostra, ambiente, limitações e reviewer |
| Social de marca | identidade/campanha | Open Graph/social | claims aprovados; não substituir foto documental |
| Conceitual gerada por IA | direção artística apenas | protótipo/campanha identificada | disclosure/proveniência; nunca prova de produto/origem |
| Decorativa | ritmo visual sem conteúdo adicional | layout | `alt=""`, não carregar como LCP sem necessidade |

## 4. Pipeline de asset e proveniência

Cada arquivo recebe antes da publicação:

```text
asset_id
source_type: digitalCapture | humanEdits | trainedAlgorithmicMedia | compositeWithTrainedAlgorithmicMedia | ...
product_id / variant_id / sku | null
role: main | additional | lifestyle | process | method | editorial | social | decorative
creator_or_operator
capture_or_generation_date
location_or_context | null
rights_owner
license_or_usage_scope
consent_release | null
edit_history
ai_system / version / prompt disclosure | null
width / height / format / bytes
focal_point / approved_crops
alt_by_context
caption_or_method_link | null
reviewer / reviewed_at
merchant_eligible: true | false
reason_if_blocked
```

### IPTC e IA

- preservar o `DigitalSourceType` embutido; para imagem criada por modelo treinado, usar o URI IPTC `trainedAlgorithmicMedia`;
- para foto editada com geração/inpainting, avaliar `compositeWithTrainedAlgorithmicMedia`; para composição com elementos generativos, `compositeSynthetic`;
- registrar `AI System Used`, versão, prompt e prompt writer quando aplicável segundo a especificação IPTC atual;
- não reexportar por pipeline que remova XMP/IPTC sem reinserção e verificação;
- Merchant Center exige que imagens geradas preservem metadados de origem; se título/descrição do feed forem gerados por IA, usar `structured_title`/`structured_description` com o `digital_source_type` correspondente, em vez de mascará-los nos campos convencionais;
- disclosure/proveniência não torna imagem sintética elegível como fotografia do produto real.

### Direitos e Google Images

IPTC pode transportar creator, credit e copyright. Metadata de licença no arquivo ou structured data pode habilitar detalhes/licensing em Google Images; somente declarar titularidade/licença real. Se ambas as formas forem usadas e divergirem, a documentação do Google informa que structured data prevalece, então devem partir do mesmo registro.

## 5. Requisitos técnicos de imagem no site

### Descoberta e renderização

- renderizar imagens informativas e de produto em `<img>`/`<picture>`; Google não indexa imagem de conteúdo colocada apenas como CSS background;
- `src` precisa apontar para arquivo rastreável; lazy loading não pode depender de scroll/ação para expor a URL;
- informar `width`/`height` ou aspect ratio para evitar CLS;
- usar `srcset`/`sizes` coerentes e formato moderno com fallback quando necessário;
- manter URL estável; alterar URL quando o conteúdo real do asset mudar, sem versionamento arbitrário de cada deploy;
- permitir Googlebot e Googlebot-Image somente no ambiente indexável;
- incluir imagens importantes em sitemap/image sitemap quando a implementação real justificar;
- landing page precisa ter título, legenda/contexto, entidade e texto adjacente coerentes com a imagem;
- não usar imagem conceitual para simular catálogo, origem ou resultado do produto.

### Performance e qualidade

- imagem principal acima da dobra pode receber prioridade somente se for LCP real;
- variantes abaixo da dobra usam carregamento lazy;
- gerar tamanhos, não enviar original muito maior que o slot;
- preservar detalhe suficiente para inspeção do produto e Lens;
- não fazer upscale de thumbnail para cumprir dimensões;
- medir LCP/bytes em mobile; qualidade visual não autoriza regressão de Core Web Vitals.

## 6. Alt text e legenda

Alt é contextual e acessível, não um campo para repetir keywords. Aplicar a árvore de decisão W3C WAI:

1. se a imagem é o único conteúdo de um link/botão, alt comunica a ação/destino;
2. se informa algo não repetido, alt descreve brevemente o significado naquele contexto;
3. se a informação é complexa, manter resumo no alt e conteúdo completo em texto/tabela;
4. se é redundante ou puramente decorativa, usar `alt=""`;
5. texto essencial não deve existir apenas dentro da imagem.

### Templates condicionais — preencher apenas com fatos reais

- principal PDP: `{produto}, {formato/variante visível}, vista {frontal/lateral}`;
- embalagem: `Embalagem de {produto}, mostrando {informação realmente legível/relevante}`;
- escala: `{produto} ao lado de {referência honesta de escala}`;
- processo: `{etapa real} de {produto/matéria}, em {contexto confirmado}`;
- método: `{amostra/arranjo real} durante avaliação de {atributo}, segundo {método}`;
- card que já tem nome visível: descrever somente informação visual adicional; se nenhuma, alt vazio pode ser mais correto;
- social com copy repetida ao lado: alt vazio no site; em canais onde a imagem é autônoma, fornecer descrição equivalente.

**Proibido:** “melhor incenso premium cura ansiedade”, lista de keywords, origem inferida pelo cenário, ingrediente deduzido pela cor, intensidade/fumaça sem método ou “produto HEAL” para asset conceitual.

## 7. Contrato para Google Images e Lens

### Images

1. página pública e indexável;
2. `<img>` rastreável e arquivo acessível;
3. boa resolução e contexto textual coerente;
4. alt funcional/contextual;
5. landing page com experiência mobile adequada;
6. sitemap e metadata/licença quando úteis;
7. direitos e entidade do produto verificáveis.

### Lens

A documentação do Google recomenda, para descoberta de produtos no Lens:

1. detalhes do produto enviados ao Merchant Center;
2. opt-in para product listings;
3. conformidade com image SEO;
4. produto visualmente reconhecível e consistente com a landing/feed.

Isso é **dependência externa** e não garante aparição. Sem Merchant Center e produto real, “otimizado para Lens” seria overclaim.

## 8. Gates de Merchant Center

### Gate de empresa e conta

- domínio verificado e operação comprável;
- identidade empresarial, suporte e políticas reais;
- conta Merchant Center, país e programas elegíveis;
- página pública sem fixture/noindex;
- checkout funcional no destino permitido.

### Gate de item/feed

- `id` estável e vínculo real com variante/SKU;
- `title`/`description` factuais e coerentes com landing;
- `link` canônico e público;
- `image_link` real; `additional_image_link`/`lifestyle_image_link` apenas quando correspondem ao item;
- `price`, `availability`, `condition`, `brand` e identificadores reais;
- `item_group_id` e atributos de variante somente quando há variantes;
- shipping/devolução consistentes com conta/site e operação;
- categoria e demais campos sem adivinhação;
- structured data, HTML e feed derivados do mesmo source of truth.

### Imagem Merchant 2026/2027

- adotar **1500×1500 ou mais** como padrão interno quando a fotografia permitir;
- jamais enviar placeholder, imagem genérica ou item incorreto;
- imagem principal mostra claramente o produto, com mínimo de staging; evitar texto promocional, preço, CTA ou watermark;
- warnings para imagens abaixo de 500×500 começaram em **2026-04-14**; enforcement geral de 500×500 começa em **2027-01-31**;
- não depender da otimização automática do Google para corrigir arquivo inadequado;
- arquivo até os limites/formato aceitos e URL estável/acessível.

### Mudanças Merchant 2026 aplicáveis

- `video_link`: submissão/validação técnica desde 2026-04-14; serving e checks de política/qualidade desde **2026-06-30**; usar apenas vídeo real, público, correspondente ao item;
- `handling_cutoff_time` e `minimum_order_value`: preencher somente se a operação sustentar os valores;
- campos de loyalty/promoção: somente para programa/oferta existentes e configurados;
- toda issue deve ser acompanhada em **Needs attention**; ausência de erro local não prova aprovação.

### Release gate automático proposto

Bloquear exportação do item quando:

- `mode !== production`;
- produto/variante/asset sem provenance ou rights;
- imagem principal sem vínculo ao SKU ou abaixo do padrão;
- preço/moeda/estoque divergirem entre source, HTML, JSON-LD e feed;
- campo obrigatório for `[A VALIDAR]`, `null` indevido ou texto fixture;
- claim estiver condicionado/bloqueado;
- URL não for HTTPS pública/canônica;
- mídia generativa perder metadata obrigatória;
- política/conta necessária não estiver aprovada.

## 9. Política para AI Overviews, AI Mode e agentes

### Confirmado pelo Google em 2026

- SEO fundamental continua valendo; recursos generativos usam o índice e sistemas de Search;
- página precisa ser indexada e elegível a snippet;
- conteúdo próprio, útil e não comoditizado é mais defensável que resumo genérico;
- imagens/vídeos e Merchant Center podem ampliar superfícies;
- não há schema especial, formato de escrita obrigatório ou benefício de `llms.txt` na Google Search;
- criar páginas por cada fan-out/variação para manipular respostas pode configurar scaled content abuse;
- structured data continua útil para recursos convencionais elegíveis, não como requisito de IA;
- acessibilidade, DOM legível e ações claras também ajudam agentes de navegador, sem garantir transação/autonomia.

### Política HEAL

- publicar experiência de primeira mão: método sensorial, documentos de matéria, fotografia real, decisão de design/produto e limites;
- usar headings/tabelas quando melhoram leitura humana, não “chunking para LLM”;
- manter entidades e fatos coerentes entre texto, imagem, vídeo, schema e feed;
- divulgar uso substancial de IA quando o leitor razoavelmente perguntaria “como foi feito?”;
- IA pode ajudar em outline, QA e transformação, mas não inventa experiência, autoria, fonte, review, produto ou resultado;
- não comprar menções, fabricar UGC/reviews ou enviar conteúdo diferente a bots;
- não habilitar checkout agentic/protocolo emergente sem ADR, segurança, commerce autoritativo e autorização.

## 10. Métricas oficiais de 2026

### Google Search Console — relatório generativo

Estado: rollout para subconjunto de propriedades; pode não aparecer por acesso ou volume.

- mede impressões de links em AI Overviews e AI Mode;
- dimensões documentadas: página canônica, país, data e dispositivo;
- relatório atual não documenta consulta, clique, CTR ou posição;
- gráfico pode agregar por propriedade e tabela por dimensão; diferenças de agregação são esperadas;
- dado mais recente pode ser preliminar.

**KPI correto:** tendência de impressões e cobertura por páginas elegíveis.  
**Não concluir:** ranking, preferência da IA, visita, conversão ou receita.

### Bing Webmaster Tools — AI Performance public preview

- total de citações;
- média diária de páginas citadas;
- grounding queries como amostra;
- citações por URL e tendência temporal.

A própria documentação alerta que citações não indicam posição, autoridade, importância ou papel na resposta. Manter análise separada da busca convencional e de analytics/commerce.

### Images, Merchant e site

- páginas/imagens indexadas e tráfego de Search type Image quando disponível;
- cliques/impressões por página/consulta na Search convencional;
- itens aprovados, limitados ou reprovados e motivos em Merchant Center;
- consistência feed/site, freshness e problemas de imagem;
- Web Vitals de campo em p75 por tipo de página;
- funil por asset/landing até compra autoritativa, sem atribuir causalidade a mera impressão.

## 11. Workflow editorial com prova e claims

1. **Intenção:** tarefa distinta e URL owner aprovadas no mapa.
2. **Entidade:** produto/variante/método/processo identificados.
3. **Who:** autor, fotógrafo/operador e reviewer com papel real.
4. **How:** método, amostra, ambiente, captura/edição e automação documentados.
5. **Why:** utilidade direta para pessoa, não captura de fan-out.
6. **Fonte:** documento primário e validade; observação HEAL separada da fonte externa.
7. **Claims:** permitido/condicionado/bloqueado por canal e SKU.
8. **Mídia:** rights, release, provenance, IPTC, alt/caption e vínculo ao SKU.
9. **Commerce:** facts e estados comparados ao source of truth.
10. **QA:** mobile, acessibilidade, HTML, Rich Results/feed quando elegível e comparação visual.
11. **Publicação:** versão, data e próximo evento de revisão.
12. **Monitoramento:** factualidade, issues Merchant, indexação e comportamento; corrigir/despublicar quando a prova expirar.

## 12. Backlog priorizado

### P0 — bloqueadores comerciais

1. Produzir fotografia real por SKU/variante e assinar rights/provenance.
2. Obter catálogo, identificadores, preço, estoque, políticas e empresa autoritativos.
3. Definir owner de claims/safety e matriz por canal.
4. Implementar source único para HTML, schema e feed; manter fixture `noindex` até passar gates.
5. Verificar se export/otimização preserva IPTC/XMP; nenhum asset de IA conceitual entra no feed.

### P1 — descoberta visual e shopping

1. Integrar `<img>`/responsive image real em card/PDP com dimensões, alt e contexto.
2. Criar manifesto estruturado asset → SKU → rights → role.
3. Gerar feed em sandbox e validador de divergência; não submeter sem autorização.
4. Definir origem canônica/sitemap/image sitemap e testar URLs públicas.
5. Conectar Search Console/Merchant Center/Bing com owner humano e baseline.

### P2 — conteúdo e IA após lançamento

1. Produzir vídeos reais de ângulos/uso seguro e avaliar `video_link`.
2. Publicar método, matéria e Journal com evidência própria.
3. Monitorar Google generative report/Bing AI Performance quando disponíveis, sem KPI de vaidade.
4. Testar se novos assets aumentam conclusão da tarefa e conversão, controlando página/produto.
5. Revalidar documentação Merchant/AI antes de cada release relevante.

## 13. Fontes oficiais consultadas

Consulta em **2026-08-28**:

### Google Search e Images

- [Google — Image SEO best practices](https://developers.google.com/search/docs/appearance/google-images) — `<img>`, contexto, responsividade e descoberta; atualizado em 2026-03-02.
- [Google — superfícies de ecommerce, incluindo Images e Lens](https://developers.google.com/search/docs/specialty/ecommerce/where-ecommerce-data-can-appear-on-google)
- [Google — image license metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)
- [Google — guia oficial para recursos generativos](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google — conteúdo people-first, Who/How/Why e E-E-A-T](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search Console — relatório generativo da Search](https://support.google.com/webmasters/answer/16984139)

### Merchant Center

- [Google Merchant Center — atualização da especificação 2026](https://support.google.com/merchants/answer/16989427)
- [Google Merchant Center — image link e provenance de IA](https://support.google.com/merchants/answer/6324350)
- [Google Merchant Center — conteúdo gerado por IA](https://support.google.com/merchants/answer/14743464)
- [Google Merchant Center — product data specification](https://support.google.com/merchants/answer/7052112)

### Acessibilidade, provenance e Bing

- [W3C WAI — árvore de decisão para alt](https://www.w3.org/WAI/tutorials/images/decision-tree/)
- [IPTC — Photo Metadata User Guide, inclusive campos de IA 2025.1](https://www.iptc.org/std/photometadata/documentation/userguide/)
- [Bing — AI Performance no Webmaster Tools, public preview de 2026](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)

## Handoff

- **HEAL-04/07:** produzir texto e mídia segundo intenção, método, rights e claims gates.
- **HEAL-08/09:** manter conteúdo/produto compreensível sem Three.js e imagens em elementos rastreáveis/acessíveis.
- **HEAL-13/14:** fornecer source de commerce e export/feed idempotente com gates de divergência.
- **HEAL-15:** integrar metadata, sitemap, canonical e structured data somente depois de dados reais.
- **HEAL-17/18:** validar alt, foco/zoom, CLS, LCP e tamanhos responsivos.
- **HEAL-19:** revisar direitos, disclosure de IA, claims, segurança e privacy.
- **HEAL-20:** instrumentar etapas sem persistir URLs/tokens/PII e separar impressão/citação de venda.
- **HEAL-21/22:** testar asset → SKU, HTML/feed/schema, blockers e estado de contas antes do release.
