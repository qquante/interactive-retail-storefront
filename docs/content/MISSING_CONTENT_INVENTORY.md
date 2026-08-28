# HEAL. CURA. — Inventário de conteúdo faltante

Data: 2026-08-28  
Owner: HEAL-04  
Estado real: `docs` — levantamento de lacunas; nenhum item abaixo foi fornecido ou validado.  
Regra: ausência vira bloqueio ou campo omitido, nunca copy aspiracional.

## 1. Leitura executiva

A vertical slice pode ser construída apenas como **demonstração explícita**. Ainda não existe base para publicar catálogo, produto, preço, disponibilidade, segurança, política, checkout ou prova de marca como informação real.

Os bloqueios mais críticos são:

1. ficha autoritativa por produto/SKU;
2. instruções e alertas do fabricante por formato/produto;
3. preço, estoque, frete e checkout de ambiente real/sandbox;
4. identificação empresarial, suporte e políticas aprovadas;
5. assets reais com direitos e provenance;
6. método sensorial para família, notas, intensidade e fumaça;
7. owner e workflow de claims/atualização.

Até esses itens serem resolvidos:

- `site` deve mostrar a faixa persistente de demonstração;
- todas as rotas fixture ficam `noindex`;
- nenhum payment method, review, certificação ou promessa operacional aparece;
- o guia de uso/segurança informa que o protótipo não é orientação real.

## 2. Criticidade

| Nível | Significado |
|---|---|
| P0 | Bloqueia compra, publicação ou segurança básica. |
| P1 | Bloqueia confiança, SEO comercial ou qualidade mínima de PDP. |
| P2 | Necessário para expansão, retenção ou diferenciação; não bloqueia a fixture. |

## 3. Catálogo e produto

| ID | Pri. | Conteúdo faltante | Fonte/owner necessário | Consumidores | Condição de aceite |
|---|---:|---|---|---|---|
| MC-001 | P0 | Lista real de produtos e status | Owner de catálogo/commerce | PLP, busca, PDP, sitemap, feed | ID, nome, handle e estado aprovados. |
| MC-002 | P0 | Variantes e SKUs únicos | Commerce/ERP/fabricante | PDP, carrinho, checkout, analytics | Cada item comprável resolve um SKU ativo. |
| MC-003 | P0 | Formato real | Ficha do fabricante | PDP, filtro, título factual, uso | Valor por SKU/variante com fonte. |
| MC-004 | P0 | Quantidade/conteúdo da embalagem | Ficha/embalagem | Card, PDP, carrinho, gifting | Unidade e escopo exatos, revisados. |
| MC-005 | P0 | Dimensões/peso | Ficha/logística | PDP, frete, feed | Unidade normalizada e fonte registrada. |
| MC-006 | P0 | Composição/ingredientes | Fabricante/fornecedor | PDP, busca, SEO, suporte | Lista exata; nota percebida não usada como ingrediente. |
| MC-007 | P0 | Origem de fabricação | Fabricante/documento fiscal | PDP, Sobre, SEO | Local e entidade definidos sem generalização. |
| MC-008 | P1 | Origem de matérias | Cadeia de fornecimento | PDP, processo, editorial | Origem por ingrediente/lote quando aplicável. |
| MC-009 | P1 | Processo de fabricação/seleção | Fabricante/brand owner | Sobre, PDP, Journal | Etapas e responsabilidades factuais; imagens próprias/autorizadas. |
| MC-010 | P1 | Tempo aproximado de queima | Fabricante ou teste documentado | PDP, filtro, comparação | Condições, faixa, variante e limitações publicadas. |
| MC-011 | P1 | Condição de armazenamento/validade | Fabricante | PDP, suporte, pós-compra | Texto por produto e fonte vigente. |
| MC-012 | P1 | Instrução de descarte | Fabricante/material owner | Guia, PDP, pós-compra | Instrução específica, sem claim ambiental. |
| MC-013 | P2 | Compatibilidade com incensário/acessórios | Fabricante/teste | PDP, bundle, suporte | Medidas, restrições e item compatível registrados. |
| MC-014 | P2 | Política de lotes e variação | Operação/qualidade | PDP, suporte | Como mudanças são identificadas e comunicadas. |

### Perguntas que o cadastro precisa responder por SKU

- Qual é o nome oficial e o subtítulo factual?
- Qual é o formato e quantas unidades/qual peso vêm na embalagem?
- Quais variantes são realmente compráveis?
- Qual composição é declarada e por quem?
- Onde o produto é fabricado? Isso é diferente da origem das matérias?
- Existem instrução, alerta, armazenamento e descarte próprios?
- O produto mudou por lote? Qual informação acompanha essa mudança?

## 4. Avaliação sensorial e taxonomia

| ID | Pri. | Conteúdo faltante | Fonte/owner necessário | Consumidores | Condição de aceite |
|---|---:|---|---|---|---|
| MC-020 | P1 | Taxonomia de famílias aromáticas | Conteúdo + especialista/brand | Navegação, filtros, PDP, SEO | Definição por família e regra de classificação. |
| MC-021 | P1 | Notas percebidas por produto | Painel/método sensorial | Card, PDP, busca | 2–4 descritores, data e escopo; separados de ingredientes. |
| MC-022 | P1 | Escala de intensidade | Método sensorial | Cards, filtros, comparação | Níveis definidos, condições e avaliadores documentados. |
| MC-023 | P1 | Escala de nível de fumaça | Teste observacional | Cards, filtros, comparação, segurança | Método e limitações; sem inferir toxicidade/segurança. |
| MC-024 | P2 | Evolução sensorial ao longo do uso | Método sensorial | PDP, Journal | Observação real por produto, sem outcome emocional. |
| MC-025 | P2 | Contextos editoriais por produto | Conteúdo + claims review | Coleções por momento, quiz | Regra explicável; nenhum diagnóstico/benefício. |
| MC-026 | P2 | Sinônimos de busca aprovados | Conteúdo + dados de busca | Search | Lista revisada, inclusive recuperação segura para queries de saúde. |

### Documento que precisa existir

`SENSORY_METHOD.md` deve registrar ambiente, preparação, amostra, avaliadores, escala, limitações, data e reviewer. Sem ele, família/notas podem permanecer texto não factual de fixture; intensidade e fumaça não podem ser publicadas como escala.

## 5. Segurança, uso e claims

| ID | Pri. | Conteúdo faltante | Fonte/owner necessário | Consumidores | Condição de aceite |
|---|---:|---|---|---|---|
| MC-030 | P0 | Instrução de uso por produto/formato | Fabricante | PDP, guia, embalagem, pós-compra | Texto completo, escopo por SKU, versão e revisão. |
| MC-031 | P0 | Alertas e cuidados por produto | Fabricante + HEAL-19 | PDP, guia, suporte | Ordem/severidade preservadas; sem ampliar ou omitir. |
| MC-032 | P0 | Protocolo para incidente/queixa | Operação + jurídico/segurança | Suporte, pós-compra | Canal, triagem, registro, escalada e SLA reais. |
| MC-033 | P0 | Owner de aprovação de claims | Negócio + HEAL-19 | Todo canal | Nome/papel, gate e registro de decisão. |
| MC-034 | P1 | Matriz final de claims por SKU/canal | HEAL-19 + evidência | Site, ads, creators, CRM, embalagem | Permitido/condicionado/bloqueado com fonte e validade. |
| MC-035 | P1 | Orientação sobre sensibilidades/grupos | Fabricante + revisão qualificada | Segurança, suporte | Redação conservadora, sem garantia individual ou aconselhamento clínico. |
| MC-036 | P1 | Instruções para armazenamento/descarte | Fabricante | PDP, guia | Escopo e linguagem factual. |
| MC-037 | P2 | Brief obrigatório para creators/UGC | Marketing + HEAL-19 | Social/partnerships | Disclosure, facts, claims proibidos e direitos definidos. |

### Copy interina permitida na fixture

> **Demonstração:** as instruções de uso e segurança deste produto ainda não foram fornecidas nem validadas. Este protótipo não deve ser usado como orientação de uso.

Não completar esse bloco com conhecimento geral de incenso. Mesmo recomendações aparentemente óbvias precisam vir da fonte responsável e ser revisadas para o produto/formato.

## 6. Commerce, entrega e checkout

| ID | Pri. | Conteúdo/dado faltante | Fonte/owner necessário | Consumidores | Condição de aceite |
|---|---:|---|---|---|---|
| MC-040 | P0 | Preço BRL e regra tributária | Commerce/financeiro | PLP, PDP, cart, checkout, schema/feed | Fonte server-side, timestamp e consistência ponta a ponta. |
| MC-041 | P0 | Estoque/disponibilidade/backorder | Commerce/operação | PLP, PDP, cart, checkout | Estado autoritativo; `unknown` bloqueia compra. |
| MC-042 | P0 | Cobertura, custo e prazo de frete | Logística/provider | PDP, cart, políticas, checkout | Cálculo sandbox/real reproduzido; estados de erro definidos. |
| MC-043 | P0 | Provedor e ambiente de checkout | Decisão HEAL-00/13 | Handoff, termos, suporte | Sandbox configurado; destino allowlisted; nenhum cartão no site. |
| MC-044 | P0 | Meios de pagamento habilitados | Provedor/conta de teste | Cart, handoff, FAQ, marketing | Cada meio testado; só então mencionar Pix/boleto/cartão/parcelas. |
| MC-045 | P0 | Checkout convidado | Provedor/UX | Handoff, copy de compra | Testado no ambiente aplicável. |
| MC-046 | P0 | Política e processo de troca/devolução | Operação + jurídico | PDP, carrinho, política, suporte | Condições, prazos, custos, exceções e canal aprovados. |
| MC-047 | P1 | Regra de desconto/cupom | Commerce/marketing | Cart, CRM, feed | Operação real e validação server-side; fixture não mostra. |
| MC-048 | P1 | Política de preço anterior/promoção | Financeiro/jurídico | Cards, PDP, campanhas | Cálculo, período e auditoria. |
| MC-049 | P1 | SLAs de pedido/entrega/suporte | Operação | Política, contato, pós-compra | Prazos reais, owners e exceções. |
| MC-050 | P2 | Presente: embalagem, mensagem, preço oculto | Operação/catalog | Gifting, cart, checkout | Capacidade operacional e UX testadas. |
| MC-051 | P2 | Bundles/discovery set/refil | Produto/financeiro/logística | Catálogo, marketing | SKUs, estoque, margem, fiscal e fulfillment validados. |

## 7. Marca, empresa e confiança

| ID | Pri. | Conteúdo faltante | Fonte/owner necessário | Consumidores | Condição de aceite |
|---|---:|---|---|---|---|
| MC-060 | P0 | Razão social, CNPJ e endereço aplicável | Responsável legal | Footer, termos, privacidade, checkout | Dados confirmados e formato aprovado. |
| MC-061 | P0 | Canais oficiais de suporte | Operação | Header/footer, contato, políticas | Canal funcional, owner, horário e SLA. |
| MC-062 | P0 | Política de privacidade/cookies | HEAL-19 + jurídico | Banner, footer, formulários | Mapa de dados e fornecedores refletidos no texto. |
| MC-063 | P0 | Termos de uso/compra | Jurídico/operação | Footer, checkout | Coerentes com commerce, frete e devolução. |
| MC-064 | P1 | História factual da marca | Fundador/brand owner | Sobre, PR, metadata | Datas, pessoas, motivação e responsabilidades documentadas. |
| MC-065 | P1 | Modelo de produção/curadoria | Brand/product owner | Sobre, processo, PDP | “Fabricamos”, “selecionamos” ou “revendemos” definido com prova. |
| MC-066 | P1 | Promessa/tagline aprovada | HEAL-03 + pesquisa + HEAL-19 | Home, embalagem, ads | Teste de compreensão; nenhum participante lê como tratamento. |
| MC-067 | P1 | Sistema de atualização dos fatos | Produto/conteúdo/commerce | CMS, site, feed, CRM | Owner, SLA e audit trail definidos. |
| MC-068 | P2 | Perfis sociais oficiais | Marketing | Footer, Organization schema | URLs e ownership confirmados. |
| MC-069 | P2 | Reviews/UGC/imprensa/parcerias | Fonte externa + autorização | PDP, home, social | Vínculo, permissão, data, política de moderação; nenhum placeholder. |
| MC-070 | P2 | Certificações/práticas ambientais | Emissor/documentação | PDP, Sobre, feed | Escopo exato e validade; claim removível/atualizável. |

## 8. Assets e direitos

| ID | Pri. | Conteúdo faltante | Fonte/owner necessário | Consumidores | Condição de aceite |
|---|---:|---|---|---|---|
| MC-080 | P0 | Fotografia real de produto e embalagem | Produção de imagem/brand | Cards, PDP, Images/Lens, social | Direitos, produto/variante, data, dimensões e alt text. |
| MC-081 | P1 | Imagens de escala e detalhe | Produção de imagem | PDP, suporte | Escala honesta e vínculo com SKU. |
| MC-082 | P1 | Vídeo de uso | Produção + segurança | PDP, guia, feed/social | Demonstra instrução aprovada; transcript/captions; direitos. |
| MC-083 | P1 | Imagens de processo/procedência | Fabricante/brand | Sobre, Journal | Local/pessoa/material identificados e autorizados. |
| MC-084 | P1 | Logo final e regras de marca | Design/brand owner | Site, metadata, social card | Arquivo original, contraste, tamanhos e direitos. |
| MC-085 | P1 | Fallback estático da assinatura sensorial | HEAL-07/11 | Hero, reduced motion/data/WebGL | Marcado como conceitual; não representa produto real. |
| MC-086 | P1 | Social preview card | Design/content | Open Graph | Identidade aprovada, copy curta, sem produto/fato inventado. |
| MC-087 | P2 | Iconografia/instruções | Design + segurança | PDP, guia | Ícones não substituem texto e correspondem ao significado aprovado. |

Toda mídia precisa de `rightsOwner`, `licenseOrPermission`, provenance e escopo de produto. Conteúdo gerado/conceitual não pode provar aparência, fumaça, material, acabamento, embalagem ou modo de uso de item real.

## 9. SEO e conteúdo editorial

| ID | Pri. | Conteúdo faltante | Fonte/owner necessário | Consumidores | Condição de aceite |
|---|---:|---|---|---|---|
| MC-090 | P1 | Mapa final de intenções/queries | HEAL-16 + dados | IA, briefs, internal linking | Intenção e página de destino com valor próprio. |
| MC-091 | P1 | Title/description por rota real | HEAL-04/15 | Search/social | Únicos, factuais, consistentes com página. |
| MC-092 | P1 | Elegibilidade de structured data | HEAL-15 + commerce | Product/Offer/Organization | Fatos visíveis e consistentes; fixture excluída. |
| MC-093 | P1 | Conteúdo de primeira mão | Produto/fabricante/conteúdo | Journal, PDP, AI Search | Autor, método, imagens/fontes e atualização. |
| MC-094 | P1 | Alt text/caption por asset | Conteúdo + mídia | A11y, Images/Lens | Descrição contextual; decorativo com alt vazio. |
| MC-095 | P2 | Guia central de escolha | Conteúdo + método sensorial | SEO, funnel, suporte | Baseado em catálogo e taxonomia reais. |
| MC-096 | P2 | Guia real de uso/segurança | Fabricante + HEAL-19 | SEO, PDP, pós-compra | Fonte por formato/SKU; não medicalizado. |
| MC-097 | P2 | Política de autoria e revisão | Conteúdo/SEO | Journal, AI Search | Who/how/why, reviewer e atualização. |
| MC-098 | P2 | Feed/editorial video links | HEAL-16/commerce | Merchant Center | Assets reais, políticas e conta configurada. |

Consultas como `incenso para ansiedade`, `incenso para insônia`, `incenso para foco` ou outras ligadas a saúde não viram landing de produto. A busca interna deve devolver limite de claim + navegação segura; o plano editorial não explora vulnerabilidade.

## 10. Lifecycle, gifting e suporte

| ID | Pri. | Conteúdo faltante | Fonte/owner necessário | Consumidores | Condição de aceite |
|---|---:|---|---|---|---|
| MC-100 | P1 | Mensagens transacionais de pedido | Commerce/operação | Email/SMS/conta | Estados reais, dados minimizados e suporte correto. |
| MC-101 | P1 | Guia pós-compra por SKU | Fabricante/conteúdo | Confirmação, QR/email | Mesma versão da instrução aprovada no site/embalagem. |
| MC-102 | P1 | Taxonomia de motivos de suporte | Operação | Formulário, analytics agregado | Categorias úteis sem enviar texto livre a analytics. |
| MC-103 | P2 | Newsletter: promessa e frequência | Marketing/LGPD | Form, footer | Finalidade, periodicidade, opt-in e saída simples. |
| MC-104 | P2 | Aviso de reposição/estoque | Commerce/CRM/LGPD | PDP, CRM | Opt-in por SKU, frequência e expiração. |
| MC-105 | P2 | Jornada de presente | Produto/operação | Home, PLP, PDP, cart | Oferta, embalagem, prazo, troca e dados do destinatário definidos. |
| MC-106 | P2 | Lembrete de recompra | Dados/produto/LGPD | CRM | Baseado em quantidade/uso explicado; solicitado pelo usuário. |
| MC-107 | P2 | Pesquisa/review pós-compra | CX/legal | CRM, PDP | Pedido verificável, consentimento/expectativa e moderação. |

## 11. Decisões de nomenclatura pendentes

| Decisão | Hipótese atual | Gate |
|---|---|---|
| Marca grafada | `HEAL. CURA.` | Registro/brand owner `[A VALIDAR]`. |
| Nome comercial | `Heal Incensos` | Aprovação do negócio `[A VALIDAR]`. |
| Tagline | `Acenda o intervalo.` | Teste de categoria e interpretação terapêutica. |
| Linha de fixture | `Intervalos` | Uso apenas demonstrativo; checagem de marca antes de produção. |
| Padrão de produto | `HEAL + nome proprietário` + subtítulo factual | Catálogo, arquitetura de linha e trademark search. |
| Coleções por momento | `Para começar/acompanhar/receber/encerrar` | Curadoria explicável com produtos reais. |
| Famílias | Vocabulário candidato do UX | Método/taxonomia e cobertura do catálogo. |
| Sacola vs. carrinho | `Sacola` na UI; `carrinho` em contrato/eventos | Teste de compreensão e consistência. |

Não usar nomes que prometam `Calma`, `Sono`, `Foco`, `Energia`, `Proteção`, `Purificação` ou `Cura` como outcome.

## 12. Ordem recomendada de desbloqueio

### Sprint de verdade comercial

1. Receber cadastro real, SKU/variante, preço, estoque e owner.
2. Receber ficha técnica, embalagem e documentos do fabricante.
3. Definir provider, sandbox, frete, devolução e suporte.
4. Identificar empresa e aprovar termos/privacidade/cookies.

### Sprint de prova sensorial

1. Aprovar taxonomia.
2. Executar método de notas/intensidade/fumaça.
3. Fotografar produtos e processo reais com provenance.
4. Redigir PDPs, revisar claims e testar compreensão.

### Sprint de publicação

1. Conferir UI ↔ commerce ↔ metadata ↔ schema ↔ feed.
2. Validar uso/segurança por SKU.
3. Remover fixture somente quando nenhum dado demonstrativo permanecer escondido.
4. Ativar indexação apenas após QA de conteúdo, SEO, a11y e checkout sandbox.

## 13. Gates de saída da fixture

A faixa de demonstração só pode ser removida quando:

- catálogo e variantes reais substituírem todos os IDs `fixture:`;
- preço, estoque, frete e total vierem do adapter aprovado;
- checkout sandbox tiver evidência e o estado for chamado de sandbox, não produção;
- todas as PDPs publicadas tiverem dados mínimos, instruções e alertas validados;
- políticas e identidade empresarial estiverem aprovadas;
- assets tiverem direitos/provenance;
- metadata/schema/feed não contiverem fixture ou divergência;
- HEAL-19 e HEAL-22 não tiverem blockers críticos abertos.

## Handoff

- **HEAL-00:** tratar MC-001–008, MC-030–046 e MC-060–063 como blockers de produção; solicitar dados ao usuário/negócio.
- **HEAL-08/09:** implementar estados ausente/bloqueado/demonstração, sem fallback aspiracional.
- **HEAL-13/14:** fornecer a fonte autoritativa para catálogo, preço, estoque, frete e checkout.
- **HEAL-15/16:** manter fixture `noindex`; não criar schema/feed com campos ausentes ou fictícios.
- **HEAL-19:** assumir safety, claims, políticas, dados empresariais, cookies e incident response.
- **HEAL-21/22:** verificar cada gate por evidência; texto bonito não fecha lacuna factual.
