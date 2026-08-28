# HEAL-20 — Guardrails de CRO e experimentação ética

**Data:** 2026-08-28  
**Owner:** HEAL-20 / Product Analytics  
**Estado:** `política proposta — nenhum experimento ativo`  

## 1. Princípio

CRO na HEAL deve reduzir incerteza e melhorar a capacidade de escolha. Não existe autorização para manipular urgência, consentimento, segurança, preço ou vulnerabilidade emocional. Uma melhoria de clique que piora compreensão, acessibilidade, devolução, suporte ou confiança não é vitória.

Hoje não há analytics conectado, baseline validado, tráfego de produção, pedido real ou purchase autoritativo. Portanto, nenhum teste A/B comercial pode produzir veredito no estado atual.

## 2. Pré-requisitos obrigatórios

Um experimento só inicia quando todos estiverem atendidos:

1. hipótese, público elegível, unidade de randomização, variações e owner registrados antes de olhar resultados;
2. measurement plan implementado e aprovado, com ambiente, consentimento e schema validados;
3. baseline estável por pelo menos dois ciclos semanais completos e por toda sazonalidade relevante conhecida; duração final depende do tráfego real;
4. métrica primária única, guardrails, MDE, alfa, poder, tamanho de amostra e duração calculados com baseline real;
5. exposição ao experimento emitida uma vez por unidade elegível e variante, após alocação real;
6. Sample Ratio Mismatch, bots, QA, fixture/sandbox e tráfego interno tratados;
7. conteúdo, claims, segurança de uso, estoque, preço e logística reais aprovados;
8. revisão HEAL-17 para acessibilidade, HEAL-18 para performance e HEAL-19 para privacy/LGPD;
9. plano de rollback e owner de decisão disponíveis;
10. nenhum teste simultâneo conflitante na mesma superfície/unidade sem desenho fatorial explícito.

Não escolher MDE, duração ou amostra por conveniência. Com baixo tráfego, preferir pesquisa qualitativa, teste de usabilidade ou rollout observacional a declarar um A/B inconclusivo como vencedor.

## 3. Registro obrigatório de experimento

Cada teste recebe `experiment_id` e documento imutável contendo:

- problema e evidência de baseline;
- hipótese causal e mecanismo esperado;
- população elegível/exclusões;
- unidade de randomização e persistência de variante;
- controle e variações, com screenshots/copy exatos;
- métrica primária, direção esperada e janela;
- guardrails e thresholds de dano;
- MDE, alfa, poder, correção de múltiplas comparações e tamanho planejado;
- duração mínima/máxima e método estatístico;
- regras de parada antes do início;
- riscos de acessibilidade, performance, privacidade, segurança, margem, suporte e marca;
- owners de produto, análise, engenharia e aprovação;
- resultado final, limitações e decisão (`ship`, `iterate`, `reject`, `inconclusive`).

O evento futuro `experiment_exposure` deve conter somente `experiment_id`, `variant_id`, `eligibility_version` e o envelope permitido. IDs vêm de registry; não incluir user ID, cart token, URL ou texto da variante.

## 4. Métricas

### 4.1 Primárias elegíveis

Escolher uma por teste, alinhada ao job:

- descoberta: proporção coleção → PDP ou tarefa de escolha concluída;
- clareza de produto: PDP → sacola, acompanhada de suporte/devolução;
- confiança logística: estimativa de frete válida → progressão;
- sacola: `begin_checkout` real / `view_cart` em produção;
- checkout: `purchase` autoritativo / `begin_checkout`;
- conteúdo: progressão útil após guia, sem tratar tempo de página como compreensão;
- acessibilidade/usabilidade: sucesso de tarefa e taxa de erro em teste próprio.

`CTR`, tempo na página, scroll, hover, abertura de accordion e add-to-cart isolado são diagnósticos, não prova suficiente de valor.

### 4.2 Guardrails obrigatórios

Selecionar os aplicáveis e registrar threshold antes do teste:

- compra confirmada, receita reconciliada, margem e AOV;
- cancelamento, reembolso, devolução e chargeback;
- erro de checkout/frete, estoque desconhecido e falha de provider;
- contato de suporte por categoria controlada;
- compreensão de preço, prazo, segurança e condição de demonstração;
- taxa de tarefa, abandono e reversão/remoção de item;
- LCP, INP, CLS, peso transferido, erro JS e falha WebGL/fallback;
- navegação por teclado, foco, contraste, zoom, leitor de tela e reduced motion;
- rejeição/retirada de consentimento como direito, nunca como métrica a ser “melhorada”;
- complaint, unsubscribe e frequência de comunicação;
- diferença relevante entre mobile/desktop e grupos de tecnologia assistiva, quando mensurável sem identificação indevida.

Métrica de segurança, privacidade, acessibilidade ou veracidade é veto: ganho comercial não compensa violação.

## 5. Regras de parada e decisão

### 5.1 Parada imediata por dano

Interromper e reverter quando ocorrer:

- incidente de segurança, privacidade, propriedade proibida ou dispatch sem consentimento aplicável;
- preço/frete/estoque incorreto, pedido duplicado, pagamento indevido ou discrepância financeira;
- bloqueio crítico de teclado/leitor de tela, perda de informação de segurança ou conteúdo terapêutico proibido;
- regressão de performance acima do threshold pré-registrado ou erro técnico severo;
- aumento de suporte/reembolso/chargeback além do guardrail definido;
- Sample Ratio Mismatch persistente, perda de eventos ou falha de randomização que invalide a leitura.

Parada de segurança não declara controle/variante vencedor; registra teste inválido ou prejudicial.

### 5.2 Parada estatística

- Usar horizonte fixo e não encerrar cedo por `p < 0,05` observado em inspeção diária.
- Se for usado desenho sequencial, os limites de alfa e checkpoints precisam ser definidos antes do início.
- Cumprir tamanho planejado **e** duração mínima que cubra ciclos completos; não parar quando uma condição ocorrer primeiro.
- Corrigir múltiplas métricas/variantes pelo método pré-registrado.
- Verificar SRM, integridade, novelty effect, heterogeneidade essencial e intervalos de confiança antes da decisão.
- Resultado abaixo da amostra, com intervalo amplo ou guardrail ambíguo é `inconclusive`, não “tendência vencedora”.
- Não prolongar repetidamente até obter significância. Extensão exige nova versão/hipótese.
- Repetir ou fazer rollout gradual quando o impacto for alto, o efeito pequeno ou a evidência conflitante.

### 5.3 Critério de ship

Uma variante só pode avançar quando:

1. métrica primária atinge o critério pré-registrado com efeito material, não apenas estatístico;
2. nenhum guardrail foi violado;
3. qualidade dos dados e SRM estão verdes;
4. resultado é coerente em mobile/desktop ou a limitação está explícita;
5. custo de manutenção, conteúdo e performance foi avaliado;
6. product owner registra decisão e plano de monitoramento pós-rollout.

Monitorar rollout por janela definida. Se o efeito não persistir ou surgir dano, reverter.

## 6. Dark patterns proibidos

Não desenhar, testar ou otimizar:

- escassez, estoque, procura, review, contador ou prazo falsos;
- countdown reiniciado, urgência artificial ou animação que pressione compra;
- confirmshaming, culpa, medo, ameaça de perda ou exploração de ansiedade/saúde/crença;
- claims de cura, sono, ansiedade, foco, proteção ou benefício terapêutico sem base/autorização;
- opção mais cara, seguro, doação, assinatura, marketing ou add-on pré-selecionado;
- custo, frete, recorrência, condição de demo ou limitação escondidos até etapa tardia;
- preço de referência/economia fictícios, bait-and-switch ou cupom que não funciona;
- CTA disfarçado, anúncio nativo não identificado, hierarquia enganosa ou botão visualmente oculto;
- rejeitar cookies mais difícil que aceitar, consentimento em pacote, checkbox pré-marcado ou retirada obstruída;
- forced registration antes de necessidade real, captura de email para acessar guia já público ou destinatário inscrito em marketing;
- roach motel: entrar/aceitar/comprar fácil e sair/cancelar/limpar difícil;
- nagging, modal repetitivo, bloqueio de navegação ou interrupção que persiste após recusa;
- adicionar item automaticamente, alterar quantidade silenciosamente ou esconder remoção/desfazer;
- ordenação discriminatória ou personalizada a partir de saúde, crença, religião ou vulnerabilidade;
- reduzir contraste, foco, alvo de toque, semântica ou suporte a reduced motion para aumentar clique;
- remover instruções de fogo, ventilação, troca, prazo ou suporte para encurtar página;
- chamar evento de fixture/sandbox de compra ou usá-lo para ROAS, revenue ou social proof.

Consent acceptance, unsubscribe e retirada não são alvos de otimização. O objetivo é clareza e escolha válida.

## 7. Backlog inicial — somente hipóteses

Estas ideias não estão autorizadas para execução; dependem dos pré-requisitos:

| Hipótese | Métrica primária candidata | Guardrails principais |
|---|---|---|
| Ordenar descoberta por atmosfera antes de família melhora a escolha | coleção → PDP | zero results, compreensão, suporte, performance |
| Escala factual de intensidade/fumaça reduz incerteza | PDP → sacola | devolução, suporte, segurança/claims |
| Prova material próxima à narrativa aumenta confiança | progressão após bloco de prova | leitura de segurança, tempo/tarefa, LCP/CLS |
| Entrada explícita de presente facilita gifting | fluxo gifting → checkout real | margem, devolução, dados do destinatário, consentimento |
| Guia contextual ajuda primeira compra | progressão útil após guia | performance, a11y, nenhuma captura forçada |

Antes de A/B, fazer avaliação heurística e teste moderado quando a pergunta for compreensão, linguagem ou navegação. Nem todo problema precisa de experimento quantitativo.

## 8. QA e auditoria

- Capturar variante/exposição uma vez; re-render não conta.
- Garantir que controle e variante carregam mesmas proteções de consentimento e acessibilidade.
- Validar conteúdo em 320/390/768/1440px, teclado, zoom 200–400%, leitor de tela e reduced motion.
- Comparar impacto de bundle/CWV antes da abertura de tráfego.
- Excluir equipe/QA por mecanismo aprovado sem criar fingerprint de usuário.
- Manter log de decisão e resultado, inclusive testes negativos/inconclusivos, para evitar repetição seletiva.
- Auditar se o dashboard filtra `environment=production` e `commerce_mode=production`.
- Proibir edição retroativa de hipótese, primária, amostra ou stopping rule após ver resultado.

## 9. Handoff

### Para Product/Marketing

Priorizar problema e hipótese, não “testar cor de botão”. Fornecer margem, catálogo, tráfego e critério material antes do cálculo de amostra. Não usar experimento para validar claim proibido.

### Para Design/UX

Documentar variações completas, estados de erro, mobile, teclado e reduced motion. Preservar preço, segurança, rejeição e remoção com igual clareza.

### Para Engenharia/QA

Implementar alocação e exposição determinísticas somente após o measurement gate. Cobrir SRM, duplicidade, consentimento, a11y, performance e rollback.

### Para HEAL-19/jurídico

Revisar finalidade, segmentação, consentimento, fornecedor, retenção e direitos por experimento que altere dados, personalização, CRM ou publicidade.

## Referências internas

- `docs/analytics/MEASUREMENT_PLAN.md`
- `docs/security/SECURITY_LGPD_REVIEW.md`
- `docs/brand/MARKETING_FUNNEL.md`
- `docs/design/MOTION_BIBLE.md`
- `docs/ux/FRONTEND_UX_BEHAVIOR.md`
