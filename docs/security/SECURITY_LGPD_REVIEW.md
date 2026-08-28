# HEAL-19 — Revisão de segurança, privacy by design e LGPD

**Data da revisão:** 2026-08-28  
**Escopo:** estado local de `site/`, commerce fixture, armazenamento no navegador, rotas institucionais, dependências e configuração.  
**Método:** leitura de código/configuração, buscas estáticas, inspeção de respostas do servidor local e verificações npm read-only.  
**Limite:** esta é uma revisão técnica, não parecer jurídico. Não houve pentest, DAST autenticado, infraestrutura publicada, conta Shopify, provedor de pagamento, CMS, analytics, CI/CD ou operação real para auditar.

## 1. Veredito executivo

O protótipo está corretamente rotulado como demonstração, não cria pedidos, não processa pagamentos, não conecta analytics e não envia formulários. No estado inspecionado, não há backend, banco, cookies, credenciais, conta, newsletter ou coleta de cartão. O `npm audit` encontrou **zero vulnerabilidades conhecidas** no snapshot instalado.

O projeto **não está apto para produção** sob segurança/LGPD. Não há finding P0 no fixture atual, mas há três gates P1:

1. a página de privacidade afirma que o CEP armazenado é mascarado, enquanto o código persiste os oito dígitos no `localStorage`;
2. nenhuma política de headers/CSP está configurada na aplicação e o servidor local não emitiu os headers testados — a configuração real do host ainda não existe para comprovar a proteção;
3. qualquer checkout real deve nascer de revalidação server-side e redirecionar apenas para uma origem allowlisted do provedor; a implementação atual é somente fixture e não pode ser promovida por troca de rótulo/configuração.

**Decisão HEAL-19:** `NO-GO para produção`; `GO para protótipo local rotulado`, desde que permaneça sem dados reais, sem indexação, sem pagamento e sem conexão de terceiros.

## 2. Estado real: implementado, fixture e ausente

| Área | Estado observado | Evidência |
|---|---|---|
| Commerce | Fixture client-side, produtos/valores/estoque/frete fictícios | `site/lib/commerce/fixture-data.ts:14-27`, `site/components/commerce/CheckoutHandoff.tsx:55-69` |
| Pagamento/pedido | Não implementado; a UI declara que não cria Pix, boleto, cartão, cobrança ou pedido | `site/components/commerce/CheckoutHandoff.tsx:55-71` |
| Persistência | `localStorage` sob a chave `heal:fixture-cart:v1` | `site/lib/commerce/cart-store.ts:11-20`, `site/lib/commerce/cart-store.ts:53-66` |
| Cookies | Nenhum uso no código e nenhum `Set-Cookie` nas cinco respostas locais verificadas | busca estática + GET local em `/`, `/privacidade`, `/carrinho`, `/checkout`, `/robots.txt` |
| Analytics/ads | Nenhum SDK, pixel, beacon ou chamada remota encontrado | busca estática em `site/app`, `site/components`, `site/lib` |
| Formulário de contato | Conteúdo editorial; nenhuma mensagem é enviada | `site/app/contato/page.tsx:4-10` |
| Busca | Consulta GET refletida com escape do React, `trim` e limite de 100 caracteres; não há índice | `site/app/busca/page.tsx:5-15` |
| Política de privacidade | Template explicitamente não vigente; controlador, base, retenção, fornecedores e canal ainda não definidos | `site/app/privacidade/page.tsx:4-10` |
| Termos | Template explicitamente não contratual/não vigente | `site/app/termos/page.tsx:4-10` |
| Hosting/storage | D1 e R2 não conectados | `site/.openai/hosting.json:1-4` |
| Secrets | `.env*`, `*.pem` e estado Wrangler ignorados; nenhum arquivo com nome de secret/chave encontrado no Git | `site/.gitignore:19-37` + `git ls-files` |
| Indexação | `noindex` global; `robots.txt` permite crawl para que a diretiva seja lida; nenhum dos dois é controle de acesso | `site/app/layout.tsx`, `site/app/robots.ts` |

## 3. Inventário de dados atual

### 3.1 Persistidos pelo aplicativo

O JSON do carrinho contém:

- `version`;
- `cartId` aleatório no formato `fixture:cart:<UUID>`;
- `revision`;
- lista de `variantId` e `quantity`;
- **CEP completo normalizado com oito dígitos**, quando a simulação é feita.

Evidência: `site/lib/commerce/cart-store.ts:14-20`, `site/lib/commerce/cart-store.ts:197-218`.

O CEP só é mascarado na **projeção para a interface**, como `12345-***`; a persistência continua completa. Evidência: `site/lib/commerce/fixture-adapter.ts:91-121` e `site/lib/commerce/cart-store.ts:211-217`.

Classificação conservadora: o CEP é **potencial dado pessoal/contextual**, especialmente quando associado ao identificador do carrinho, ao dispositivo e a futuros dados de compra. Não é dado pessoal sensível por natureza, mas deve receber minimização, finalidade, transparência e retenção definida.

### 3.2 Transitórios ou expostos ao ambiente

- O texto de busca `q` aparece na URL GET, no histórico do navegador e no HTML renderizado, limitado a 100 caracteres (`site/app/busca/page.tsx:7-15`). O aplicativo não o persiste, mas hosting/proxy/browser podem registrar a URL quando existirem.
- O componente 3D lê `deviceMemory`, `hardwareConcurrency`, `maxTouchPoints`, viewport e preferências de movimento/dados para escolher qualidade; não foi encontrada persistência ou telemetria desses sinais (`site/components/three/EmberSmokeScene.tsx:41-56`, `:125-136`). Não anexar esses sinais a perfis ou analytics sem novo inventário.
- Erros de rota são enviados como objeto `Error` ao console do navegador (`site/app/error.tsx:6-8`). Hoje não há formulário/backend, mas mensagens futuras podem carregar URL, IDs ou contexto pessoal.

### 3.3 Não coletados pelo estado atual

Nome, email, telefone, endereço completo, CPF, credenciais, dados de saúde, PAN, CVV, dados de autenticação, pedido, evento de pagamento e conteúdo de contato não são coletados pela aplicação inspecionada. Isso não cobre logs automáticos do provedor futuro, que devem entrar no inventário antes do deploy.

## 4. Trust boundaries e threat model

| Fronteira/ativo | Ameaça plausível | Controle atual | Gate futuro |
|---|---|---|---|
| Browser ↔ `localStorage` | alteração de preço/quantidade/CEP; leitura após XSS | IDs e quantidade são validados; catálogo/custo são reconstruídos pelo fixture | nunca confiar no carrinho client-side; recuperar e revalidar catálogo, preço, estoque, frete e revisão no servidor |
| Conteúdo/CMS → React | XSS armazenado por HTML rico | `descriptionHtml` existe no contrato, mas não é renderizado | preferir rich text estruturado; se HTML for indispensável, sanitizar server-side com allowlist e testar bypasses |
| Bundle/dependências → navegador | supply-chain/XSS lê CEP e altera redirect | lockfile, poucos scripts de instalação allowlisted, audit limpo | `npm ci`, pinning, SBOM, atualização contínua, revisão de scripts e CI protegido |
| Loja → checkout hospedado | open redirect, URL adulterada, phishing/MITM | apenas handoff fixture, sem URL externa | servidor obtém URL fresca do provider; HTTPS; allowlist exata; não aceitar URL do cliente; log sem URL/token |
| Provider → webhook/API | spoof, replay, duplicidade, segredo vazado | inexistente | HMAC sobre raw body, janela de timestamp, idempotência, secret manager, rotação, DLQ/reconciliação |
| Browser → APIs futuras | CSRF, CORS abusivo, enumeração/rate abuse | sem APIs reais | sessão segura, verificação `Origin`, proteção CSRF conforme arquitetura, CORS restrito, rate limit e anti-automação proporcional |
| Logs/observabilidade | PII, token ou URL de checkout em logs | somente `console.error(Error)` no cliente | logging estruturado com allowlist e redaction; separar IDs operacionais de PII; retenção e acesso definidos |
| Operação/atendimento | acesso excessivo, exportação indevida, fraude | inexistente | RBAC, MFA, trilha de auditoria, menor privilégio, segregação de função e revisão periódica |

## 5. Findings priorizados

### P0 — crítico

Nenhum P0 foi identificado no fixture local. Isso não equivale a pentest ou garantia de ausência de vulnerabilidade.

### P1-01 — transparência incorreta sobre o CEP persistido

**Evidência:** `site/app/privacidade/page.tsx:7-10` afirma “CEP mascarado [...] no armazenamento local”. Já `site/lib/commerce/cart-store.ts:211-217` grava `normalized`, com oito dígitos; a máscara ocorre apenas em `site/lib/commerce/fixture-adapter.ts:96-121`.

**Risco:** informação inexata ao titular e falsa sensação de minimização. Qualquer script da mesma origem que seja comprometido pode ler o CEP completo.

**Correção exigida antes de exposição pública:** ou não persistir o CEP completo (preferível para uma simulação), ou declarar com precisão o valor, finalidade, duração e mecanismo de limpeza. A máscara de UI não é anonimização nem minimização da cópia persistida.

### P1-02 — headers/CSP não configurados ou comprovados

**Evidência:** `site/next.config.ts:1-5` está vazio. Respostas locais 200 de `/`, `/privacidade`, `/carrinho`, `/checkout` e `/robots.txt` não emitiram CSP, CSP Report-Only, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP ou `X-Frame-Options`.

**Risco:** ausência de defesa em profundidade contra XSS, framing/clickjacking, sniffing, vazamento de referrer e uso indevido de capacidades. A ausência local não prova a ausência no host futuro; hoje, porém, não há evidência de proteção em nenhuma camada.

**Correção exigida:** definir ownership entre aplicação/CDN, implantar primeiro CSP Report-Only com coleta minimizada, fechar violações e então impor CSP. Testar os headers no **domínio HTTPS publicado**, pois HSTS não deve ser validado por HTTP local.

### P1-03 — checkout real precisa ser uma nova fronteira server-side

**Evidência positiva:** `site/components/commerce/CheckoutHandoff.tsx:55-71` não processa pagamento e `docs/commerce/COMMERCE_CONTRACT.md:498-509` já projeta revalidação. `site/lib/commerce/types.ts:215-230` admite futuro `checkoutUrl`, mas não o implementa.

**Risco se promovido incorretamente:** preço/estoque client-side adulterados, open redirect, phishing, exposição de token e entrada indevida no escopo PCI.

**Gate:** nenhum `checkoutUrl` fornecido pelo cliente, query string ou CMS pode ser usado. O servidor deve recuperar o carrinho por ID opaco, revalidar total/estoque/frete, pedir URL fresca ao provider, validar `https`, host/origem e formato contra allowlist e só então responder. Falha deve preservar carrinho e bloquear redirect.

### P2-01 — CEP sem TTL e retenção por padrão indefinida

**Evidência:** `StoredCart` não contém `createdAt`/`expiresAt`; leitura e gravação usam `localStorage` (`site/lib/commerce/cart-store.ts:14-20`, `:53-66`). `clearFixtureCart` substitui o registro por um carrinho vazio (`:221-224`), mas não há expiração automática.

**Risco:** dado permanece no dispositivo além da finalidade e é acessível por qualquer XSS/supply-chain executado na origem.

**Recomendação:** para estimativa, manter CEP apenas em memória ou em sessão e descartá-lo após uso. Se a operação exigir persistência, documentar finalidade/base/TTL, armazenar a menor granularidade possível e expirar automaticamente. Oferecer “limpar dados deste dispositivo” claro e verificável.

### P2-02 — logging de objeto de erro sem contrato de redaction

**Evidência:** `site/app/error.tsx:6-8` executa `console.error('HEAL route error', error)`.

**Risco:** erros futuros podem incluir URLs, IDs, conteúdo de provider ou dados pessoais; ferramentas de observabilidade podem capturar console automaticamente.

**Recomendação:** em produção, registrar apenas código/digest/request ID permitidos; nunca corpo de checkout, CEP, email, endereço, token ou URL de checkout. Manter detalhes técnicos em canal server-side com acesso e retenção controlados.

### P2-03 — `descriptionHtml` cria sink de XSS futuro

**Evidência:** o contrato define HTML arbitrário em `site/lib/commerce/types.ts:99-113`; o fixture o popula em `site/lib/commerce/fixture-data.ts:69-77`. Hoje ele não é renderizado e não há `dangerouslySetInnerHTML`, portanto não há XSS reproduzido.

**Recomendação:** substituir por rich text estruturado/componentes permitidos. Se CMS/Shopify fornecer HTML, sanitizar no servidor com esquema fechado, rejeitar URLs/protocolos perigosos e cobrir com testes de payloads. CSP não substitui sanitização.

### P2-04 — governança LGPD e resposta a incidente ainda inexistentes

**Evidência:** a própria página marca controlador, bases, fornecedores, retenção, canal de direitos e cookies como `[A VALIDAR]` (`site/app/privacidade/page.tsx:7-10`); contato não é funcional (`site/app/contato/page.tsx:4-10`).

**Risco:** produção sem transparência, canal exercitável, mapa de operadores, processo de direitos ou resposta a incidentes.

**Gate:** jurídico/operação devem aprovar controlador, finalidades/bases, compartilhamentos/transferências, retenção, canal do titular e responsáveis. Segurança deve testar o runbook de incidente antes do go-live.

### P2-05 — superfície de supply chain ampla e stack beta

**Evidência:** `vinext@1.0.0-beta.8`; lockfile v3; 649 dependências totais no audit (593 dev). O `allowScripts` habilita somente `esbuild`, `workerd` e `unrs-resolver` nas versões registradas (`site/package.json:36-45`). `npm audit` completo retornou zero vulnerabilidades em 2026-08-28.

**Risco:** o audit cobre advisories conhecidos, não pacote malicioso, comprometimento futuro, bug de beta ou configuração insegura. Ranges `^` permitem alteração em nova resolução do lockfile.

**Gate:** builds reproduzíveis com `npm ci`; lockfile revisado; pin dos componentes críticos/beta; bot de atualização com testes; SBOM por release; provenance/assinatura quando disponível; branch protection; secrets somente no host/secret manager; revisão periódica do `allowScripts`. Atualização disponível não implica vulnerabilidade: `npm outdated` apenas encontrou novas versões de Tailwind, tipos Node, ESLint e TypeScript.

### P3 — hardening e riscos residuais

- A validação de `localStorage` não limita o número de linhas do array (`site/lib/commerce/cart-store.ts:31-50`); um usuário pode causar custo client-side local. Limitar tamanho e resetar payload excessivo.
- A busca leva a consulta para URL/histórico (`site/app/busca/page.tsx:7-15`). Incluir aviso para não inserir dados pessoais e impedir que observabilidade futura registre query completa.
- `LinkButton` aceita `_blank` e `rel` opcional (`site/components/ui/Button.tsx:83-93`, `:144-160`). Não há uso externo atual; quando houver, impor `rel="noopener noreferrer"` por padrão e allowlist de destinos.
- Recursos de capacidade do dispositivo usados para qualidade 3D não são telemetria atual. Evitar combiná-los com identificadores ou publicidade sem necessidade/avaliação.
- `robots.txt`/`noindex` evitam indexação cooperativa, mas não protegem conteúdo. Qualquer preview privado deve usar controle de acesso no edge.

## 6. Baseline de headers recomendado

Aplicar no CDN/edge ou aplicação com testes automatizados. O valor final deve refletir os hosts reais e o funcionamento de RSC/Vinext; não copiar uma CSP sem validar nonces e hidratação.

| Header/controle | Baseline recomendado | Observação |
|---|---|---|
| `Content-Security-Policy` | `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data: blob:; font-src 'self'; script-src 'self' 'nonce-<por-resposta>'; style-src 'self' 'nonce-<por-resposta>'; connect-src 'self'; frame-src 'none'; worker-src 'self' blob:; upgrade-insecure-requests` | iniciar em Report-Only; RSC pode exigir nonce. Remover HTML/style inline em vez de liberar `unsafe-inline`. Acrescentar apenas APIs/checkout comprovados. Redirect hospedado não requer `frame-src`. |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | apenas após HTTPS integral e auditoria dos subdomínios; avaliar `preload` separadamente |
| `X-Content-Type-Options` | `nosniff` | todos os documentos/assets aplicáveis |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | avaliar `no-referrer` em páginas sensíveis/checkout |
| `Permissions-Policy` | negar `camera`, `microphone`, `geolocation`, `payment`, `usb` e demais capacidades não usadas | liberar somente requisito aprovado; Payment Request API é decisão futura |
| `Cross-Origin-Opener-Policy` | `same-origin` | testar handoff e integrações antes de impor |
| `Cross-Origin-Resource-Policy` | `same-origin` para HTML/assets próprios | ajustar somente para assets legitimamente compartilhados |
| `X-Frame-Options` | `DENY` | legado complementar a `frame-ancestors 'none'` |
| Cache | `no-store`/`private` para checkout, conta e APIs personalizadas | páginas públicas podem ter cache; nunca cachear resposta com PII/token |
| CORS | sem wildcard em endpoints com sessão/dados | lista de origens exata, métodos/headers mínimos |

O [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/) é a referência técnica primária usada para a família de controles; o tuning deve ser validado contra o runtime e o provedor reais.

## 7. Cookies, consentimento e preferências

### Estado atual

Não há cookie, SDK opcional, publicidade ou analytics detectado; o servidor local não retornou `Set-Cookie`. Portanto, **não criar um banner teatral** agora. O `localStorage` ainda deve ser declarado corretamente porque o meio técnico não elimina obrigações de transparência/minimização.

### Quando terceiros forem adicionados

1. inventariar cookie/local storage/SDK por nome, domínio, duração, finalidade, dados, base, controlador/operador e transferência;
2. carregar somente o estritamente necessário antes de escolha;
3. manter analytics/marketing opcionais bloqueados até a escolha aplicável;
4. oferecer “rejeitar” com destaque/esforço equivalente a “aceitar”, escolhas granulares e revogação tão simples quanto concessão;
5. não usar consentimento genérico ou pré-marcado; registrar versão e escolha com mínimo de dados;
6. sincronizar retirada com tags e fornecedores, não apenas esconder o banner;
7. revalidar a política sempre que a ferramenta/finalidade mudar.

A ANPD orienta transparência, controle do titular e coleta limitada ao mínimo necessário; ver [Guia orientativo Cookies e proteção de dados pessoais, página oficial atualizada em 23/01/2025](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais).

Cookies futuros de sessão/autenticação devem usar prefixo `__Host-` quando possível, `Secure`, `HttpOnly`, `Path=/`, `SameSite=Lax` ou mais restritivo conforme o fluxo, rotação e TTL curto. Segredos, tokens de provider e PAN/CVV nunca entram em cookie legível por JS, `localStorage`, URL ou analytics.

## 8. Minimização, retenção e direitos

### Matriz mínima antes de produção

| Dado/fluxo | Finalidade mínima | Retenção-alvo | Ação requerida |
|---|---|---|---|
| CEP para estimativa | cotar disponibilidade/frete | memória/sessão; descartar após cotação, salvo necessidade comprovada | não anexar a analytics; mascarar em UI/log; documentar base |
| Carrinho anônimo | continuidade da compra | TTL curto definido pela operação | ID opaco; dados autoritativos no servidor; autoexpiração |
| Busca | devolver resultados | sem log de query por padrão ou retenção curta/agregada | aviso contra PII; redaction de URL/log |
| Pedido fiscal/consumerista | execução/obrigação legal | tabela aprovada por jurídico/fiscal, com legal hold | separar finalidade operacional de marketing |
| Atendimento | resolver solicitação | por categoria/SLA e obrigação | acesso restrito, anexos seguros, deleção programada |
| Analytics | medir produto com dados mínimos | janela curta e agregação | evento sem CEP/email/cart token; consentimento/base validada |
| Incidente | evidência e accountability | registro por pelo menos 5 anos quando aplicável ao RCIS | acesso restrito, integridade e trilha de auditoria |

Antes do go-live, disponibilizar canal verificável e processo para confirmação/acesso, correção, informação, oposição/revisão quando aplicável, portabilidade nas condições regulamentares, eliminação/revogação quando cabíveis e resposta às petições. A ANPD informa confirmação/acesso simplificados de forma imediata e resposta completa com origem/critérios/finalidade em até 15 dias; ver [Direitos dos Titulares](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares). Jurídico deve mapear exceções e prazos aplicáveis a cada direito, sem prometer eliminação de registros sujeitos a obrigação legal.

Se a HEAL se enquadrar como agente de pequeno porte, isso não elimina bases legais, princípios nem direitos. A [Resolução CD/ANPD nº 2/2022](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022) exige canal com o titular quando não houver encarregado e medidas técnicas/administrativas essenciais.

## 9. Resposta a incidentes

Criar e exercitar antes de produção:

1. canal 24x7 de detecção/escalonamento e dono de decisão;
2. classificação por dado, titulares, escala, duração, acesso, criptografia e impacto;
3. contenção preservando evidência e cadeia de custódia;
4. avaliação documentada de risco/dano relevante;
5. comunicação aprovada para ANPD/titulares quando aplicável;
6. rotação de secrets, invalidação de sessões, correção e monitoramento;
7. registro, postmortem sem culpa e ações com prazo/owner;
8. cláusula contratual para operador avisar a HEAL em janela menor que a regulatória.

Pelo RCIS, incidentes que possam causar risco ou dano relevante devem ser comunicados pelo controlador à ANPD e aos titulares em **três dias úteis**, salvo prazo específico, e o registro de incidentes com dados pessoais deve ser mantido por pelo menos cinco anos. Fontes oficiais consultadas: [canal e orientação da ANPD](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis?sck=direto) e [Resolução CD/ANPD nº 15/2024](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/documentos/rcis___anonimizado_final_ocultado_2_parte3.pdf).

## 10. Checkout futuro e fronteira PCI

Manter checkout integralmente hospedado pelo provedor é a direção de menor superfície, mas não “remove PCI automaticamente”. O PCI SSC afirma que a elegibilidade SAQ A exige que todos os elementos da página de pagamento se originem apenas de provedor validado; todos os demais critérios continuam aplicáveis. Fonte: [PCI SSC FAQ sobre SAQ A versus SAQ A-EP](https://www.pcisecuritystandards.org/faqs/if-a-merchant-s-e-commerce-implementation-meets-the-criteria-that-all-elements-of-payment-pages-originate-from-a-pci-dss-compliant-service-provider-is-the-merchant-eligible-to-complete-saq-a-or-saq-a-ep/).

Requisitos HEAL:

- jamais criar inputs HEAL para PAN, CVV ou dados de autenticação de cartão;
- confirmar o escopo/SAQ com adquirente ou QSA, não apenas com material comercial do provider;
- redirect somente para URL retornada pelo servidor e allowlisted; proteger o mecanismo contra alteração;
- não persistir nem logar `checkoutUrl`, token de carrinho do provider ou payload completo;
- validar webhook por HMAC no corpo bruto, timestamp/replay e idempotência;
- separar secrets por ambiente, menor privilégio, rotação e revogação;
- reconciliação de pedido/pagamento baseada no provider, sem confiar em callback do navegador;
- CSP, patches e integridade do storefront continuam relevantes mesmo com checkout terceirizado. O [PCI SSC esclarece](https://www.pcisecuritystandards.org/faqs/1439/) que o webserver que contém o mecanismo de redirecionamento ainda precisa ser protegido.

## 11. Gates de produção

### Segurança técnica

- [ ] corrigir a persistência/transparência do CEP e implementar TTL/limpeza;
- [ ] introduzir adapter real somente atrás de servidor, sem secrets no bundle;
- [ ] revalidação de preço, estoque, frete e revisão em toda mutação/handoff;
- [ ] allowlist estrita do checkout e testes negativos de redirect;
- [ ] headers/CSP medidos no domínio HTTPS final; CSP sem violações críticas;
- [ ] cookies de sessão seguros; CSRF/CORS/rate limit testados nas APIs reais;
- [ ] sanitização de conteúdo CMS/rich text comprovada;
- [ ] logging/redaction e retenção aprovados;
- [ ] SAST, secret scan, audit de dependência, DAST e teste E2E no CI;
- [ ] pentest focado após integrar commerce/checkout e antes de tráfego real;
- [ ] backup/restauração e rotação/revogação de secrets testados;
- [ ] inventário/SBOM e processo de patch com SLA.

### LGPD/operação/jurídico

- [ ] controlador, operadores/suboperadores e transferências mapeados;
- [ ] registro de operações com finalidade, dado, fluxo, base e retenção;
- [ ] política de privacidade factual, versionada e aprovada;
- [ ] canal de direitos funcional, com autenticação proporcional e teste ponta a ponta;
- [ ] contrato/DPA e requisitos de incidente/deleção/exportação com providers;
- [ ] política de cookies baseada em scan real; CMP apenas se necessário;
- [ ] runbook de incidente com responsáveis, contato e tabletop;
- [ ] avaliação sobre público infantil/adolescente e medidas proporcionais antes de personalização/ads;
- [ ] RIPD quando o mapeamento/riscos indicarem, com decisão registrada;
- [ ] limites de retenção implementados, não apenas escritos.

### Evidência mínima para o go-live

- relatório de headers do domínio final;
- diagrama de fluxo de dados e lista de terceiros;
- scan de cookies/storage antes e depois de consentimento;
- testes de tamper do carrinho e redirect;
- evidência de que bundles/logs não contêm secrets, CEP, email, endereço, PAN/CVV;
- confirmação do provider/adquirente sobre escopo PCI;
- ata de tabletop de incidente;
- aprovação jurídico/operação das páginas vigentes.

## 12. Fontes oficiais e primárias consultadas

Consulta realizada em 2026-08-28:

- [Lei nº 13.709/2018 — LGPD, texto oficial do Planalto](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm), especialmente arts. 6, 9, 18 e 46-49.
- [ANPD — Guia orientativo Cookies e proteção de dados pessoais](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais), página modificada em 23/01/2025.
- [ANPD — Resolução CD/ANPD nº 15/2024, Regulamento de Comunicação de Incidente de Segurança](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/documentos/rcis___anonimizado_final_ocultado_2_parte3.pdf).
- [ANPD — Comunicação de Incidente de Segurança](https://www.gov.br/anpd/pt-br/canais_atendimento/agente-de-tratamento/comunicado-de-incidente-de-seguranca-cis?sck=direto).
- [ANPD — Resolução CD/ANPD nº 2/2022 para agentes de pequeno porte](https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022).
- [ANPD — Direito dos Titulares](https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares).
- [ANPD — Guia de Segurança da Informação para Agentes de Tratamento de Pequeno Porte](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_seguranca_da_informacao_para_atpps___defeso_eleitoral.pdf).
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/).
- [PCI SSC — SAQ A/SAQ A-EP e origem dos elementos de pagamento](https://www.pcisecuritystandards.org/faqs/if-a-merchant-s-e-commerce-implementation-meets-the-criteria-that-all-elements-of-payment-pages-originate-from-a-pci-dss-compliant-service-provider-is-the-merchant-eligible-to-complete-saq-a-or-saq-a-ep/).
- [PCI SSC — requisitos do webserver que redireciona para pagamento](https://www.pcisecuritystandards.org/faqs/1439/).

## 13. Comandos e resultados

Todos os comandos foram read-only, exceto a criação deste relatório autorizado.

| Comando/check | Resultado |
|---|---|
| `rg --files site docs` | exit 0; inventário de rotas, componentes, commerce e docs |
| buscas `rg` por storage, cookies, fetch, analytics, sinks, secrets e URLs | exit 0; `localStorage` apenas no cart store; nenhum cookie/fetch/analytics/sink HTML ativo encontrado |
| `npm audit --omit=dev --json` | exit 0; 0 vulnerabilidades |
| `npm audit --json` | exit 0; 0 vulnerabilidades; 649 dependências totais |
| `npm ls --depth=0` | exit 0; árvore direta consistente |
| `npm outdated --json` | exit 1 esperado quando há pacotes desatualizados; não é finding de vulnerabilidade |
| `git ls-files` filtrado por nomes de secrets/chaves | nenhum match; o pipeline PowerShell encerrou com exit 1 por ausência de match |
| GET local em 5 rotas + inspeção de headers | HTTP 200; headers de segurança listados ausentes; sem `Set-Cookie` |
| busca por source maps em `site/dist` | nenhum `.map` encontrado |

## 14. Handoff

**Owner de correção técnica:** frontend/platform + backend/commerce.  
**Owner de decisão de dados:** produto/operação + jurídico/privacidade.  
**Owner de checkout/PCI:** backend/commerce + segurança + adquirente/QSA.  
**Revalidação HEAL-19:** obrigatória após configuração do domínio/host, integração do commerce, adição de analytics/CMP, CMS, atendimento ou qualquer formulário real.

Ordem recomendada: corrigir CEP e aviso → definir dados/owners/retention → integrar commerce server-side → implantar headers/CSP → validar checkout hospedado/PCI → testar direitos e incidente → DAST/pentest → decisão de produção.

## Remediação posterior pelo coordenador

Após o handoff HEAL-19, a fixture mudou da chave persistente em `localStorage` para uma chave versionada em `sessionStorage`. A página de privacidade agora declara corretamente que o CEP completo permanece durante a sessão da aba e que a máscara de UI não anonimiza a cópia. A validação também limita o carrinho armazenado a 100 linhas. Isso fecha a divergência de transparência de `P1-01` e reduz a retenção de `P2-01`; não transforma a fixture em arquitetura de produção nem fecha os gates de CSP, headers, backend autoritativo, checkout ou governança LGPD.
