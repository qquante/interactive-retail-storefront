# HEAL — Sistema de marca e loja retail

Data: 2026-09-26. Escopo: implementação integral autorizada pelo usuário; apresentação pré-comercial. HEAL é a marca; HEALS são os incensos. Os cinco aromas existentes são preservados; não representam o limite futuro do catálogo.

## Pesquisa primária e interpretação

- Pentagram, Plenaire — https://www.pentagram.com/work/plenaire : referência de consistência entre identidade, cor, embalagem, tipografia e imagem. Aplicação HEAL: um sistema compartilhado para todas as rotas, não uma cópia estética.
- Aesop, Incense — https://www.aesop.com/home-fragrance/incense/ : referência de hierarquia de produto e navegação. Aplicação: produto cedo, nome legível, imagem inteira e informações próximas da ação.
- Le Labo — https://www.lelabofragrances.com/ : referência consultada pelo agente de pesquisa para clareza de catálogo e assinatura consistente.
- Diptyque — https://diptyqueparis.com/en-eu/pages/decoration : referência consultada pelo agente para fotografia de coleção e ambientação.
- W3C, contraste mínimo — https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html : texto precisa de contraste; cor não substitui rótulos.

As interpretações acima são decisões de design da HEAL, não alegações de aumento medido de conversão. Não há teste comercial A/B ou estudo com clientes nesta etapa.

## Identidade implementada

| Papel | Cor | Uso |
|---|---|---|
| Mineral | `#F6F5F0` | Fundo principal e áreas de leitura |
| Tinta vegetal | `#202820` | Texto principal |
| Verde profundo | `#294B3D` | Ações principais |
| Floresta noturna | `#111914` | Primeiro bloco, contraste para a fumaça |
| Verde do rodapé | `#202B23` | Fechamento consistente |
| Cinza vegetal | `#62685F` | Texto secundário |
| Linha neutra | `#D7D9D0` | Divisões decorativas, não único contorno de controles |
| Cobre | `#986442` | Acento disponível; não usado como texto pequeno |

As cores dos cinco produtos permanecem nos assets aprovados. A fumaça conserva as dez cores e sua progressão; a cor não foi reduzida à paleta de interface. Não atribuímos significados universais ou efeitos psicológicos comprovados a esses códigos.

Tipografia: Newsreader para títulos; Manrope para navegação, texto e controles. Arquivos hospedados no próprio site, `font-display: swap`, licenças OFL preservadas em `public/fonts`. Origem: https://github.com/google/fonts/tree/main/ofl/newsreader e https://github.com/google/fonts/tree/main/ofl/manrope .

## Hierarquia e conteúdo

Home: incenso/fumaça + CTA de catálogo → cinco produtos → campanha de coleção → macro dos bastões → guia de escolha → profissionais → rodapé.

Catálogo: nome/aroma, imagem sem corte, ordenação por coleção ou A–Z e paginação preservada. Dois produtos por linha em mobile, sem descrição de projeto ou glyph adicional.

PDP: foto, nome, formato, coleção, status real, ações de orientação/atendimento, disclosures de informação/uso/entrega e produtos relacionados. Sem preço ou estoque fictício. Busca aceita Olíbano/olibano/OLIBANO.

Voz: direta, calma e específica. Sem falar ao cliente de códigos de design, taxonomia, arquitetura de marca ou validações internas. Sem história empresarial inventada, depoimentos falsos ou promessa terapêutica. Assinatura: “Incensos para estar presente.”

## Motion e preservação

Atualização posterior aprovada em 2026-09-26 (HEAL-T050): o padrão passa a ser **Pulsos ascendentes**, índice 2, em desenvolvimento e produção. Seletor, atalhos e override `?variant=` foram removidos. A vareta entra pela borda inferior, com apenas a ponta visível; iluminação aplicada somente à imagem. A paleta, os tempos, as equações GLSL e a âncora continuam preservados. Os itens abaixo descrevem a reforma T049 antes deste ajuste pontual.

- `HealSmokePlume.tsx`, `HealSmokePlume.module.css` e `healSmokeSpectrum.ts` não foram alterados nesta reforma.
- Preservados: cinza inicial, progressão 1→10, transporte cromático contínuo, ritmo reduzido e âncora comum de vareta/brasa/fumaça.
- Layout externo controla apenas tamanho, posição e área da cena. Mobile recebe gradiente suave de proteção de leitura, sem alterar o shader.
- Controle de pausa acessível substitui o antigo Mapa do Ar. Preferência de movimento reduzido continua respeitada.
- Outros movimentos: hover discreto da foto e feedback de controles. Sem scroll hijacking, carrossel automático ou animação de letras sem função.

## Imagens

Cinco fotos V2 do catálogo preservadas. Duas novas imagens via geração nativa, uma chamada por asset, sem retries: `docs/evidence/generated/retail-v1/collection-campaign.png` (1672×941) e `incense-detail.png` (1536×1024). WebP integrado total aproximado 356 KB. Prompts e ressalvas no mesmo diretório.

São ilustrações de produto, não fotos documentais. A campanha redesenha detalhes finos das embalagens; o macro tem grânulos relativamente grossos. Não usar essas imagens como prova de composição, peso, produção ou dimensão real. Os cards preservam os assets aprovados, não as embalagens redesenhadas da campanha.

## Limites e próxima etapa comercial

Comércio real depende de catálogo autoritativo, preços, unidades por caixa, estoque, composição, logística, identificação empresarial e canal de atendimento. Não existem formulário de captação, pagamento ou checkout ativo nesta entrega. A audiência privada e o noindex devem continuar até uma decisão explícita de abertura.

Não medimos conversão, percepção de luxo ou desempenho em GPU/celular físico. A revisão atual combina screenshots, testes de interação, regras de acessibilidade e validação de build. Resultados finais de QA/publicação: `docs/evidence/qa/retail-v1/RESULTS.md`.
