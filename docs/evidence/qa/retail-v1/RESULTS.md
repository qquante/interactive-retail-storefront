# HEAL — Retail premium V1: resultado verificado

Data: 2026-09-26. Tarefa HEAL-T049. A apresentação foi reformulada e publicada; comércio real não foi ativado.

## Implementação

- Shell compartilhado: marca, navegação desktop, menu mobile com diálogo nativo, busca e rodapé.
- Home: incenso e fumaça preservados; coleção imediatamente após o primeiro bloco; dois banners gerados; guia e profissionais.
- Cards compactos, imagem inteira, dois produtos por linha no mobile; catálogo ordenável; busca sem distinção de acentos; PDP com informações, disclosures e produtos relacionados.
- Onze páginas de marca, orientação e atendimento reescritas. Preços, estoque e ficha técnica continuam não publicados, sem compra simulada apresentada como real.
- Tipografia self-hosted Newsreader/Manrope; licenças OFL incluídas. Sistema em `docs/brand/RETAIL_BRAND_SYSTEM_2026.md`.
- 41 arquivos desta reforma sincronizados do checkout de publicação para `site/`. Antes da sincronização, 28 arquivos existentes foram comparados à base: zero divergências concorrentes.

## Gates executados

| Verificação | Resultado |
|---|---|
| Vitest unitário/integração | 23/23 passaram |
| TypeScript sem emissão | Passou |
| ESLint | Passou |
| Vinext build | Passou, cinco etapas |
| Chromium desktop + mobile | 38 passaram, 2 ignorados por escopo de projeto |
| Firefox desktop + WebKit desktop | 36 passaram, 4 ignorados por escopo de projeto |
| Total E2E final | 74 passaram; 6 skips deliberados para não repetir os testes exclusivos Chromium desktop |
| Percurso adicional | 23 rotas × 2 viewports = 46 verificações; HTTP 200, um h1, um main e zero overflow |
| Axe adicional | 10 verificações; zero violações |
| Erros de página no percurso adicional | Zero capturados |
| Âncora vareta/brasa/fumaça | Teste passou em 320, 390, 768, 1024, 1440 e 1920 px |
| Variantes dev flow/helix/pulse | Todas ready, colorCount 10 e capturas sucessivas diferentes após a progressão |
| Preservação do shader | Diff vazio em HealSmokePlume.tsx, HealSmokePlume.module.css e healSmokeSpectrum.ts |

Evidência detalhada: `browser-report.json` e capturas neste diretório. Algumas capturas da prévia local mostram o controle de variantes exclusivo de desenvolvimento ou o skip link focado pelo axe. Ambos são estados de ferramenta/teclado, não banner da loja publicada. O controle de variantes não é emitido em produção, conforme comportamento existente.

## Falhas encontradas e resolvidas

- Teste unitário de `sizes` referia o grid antigo de uma coluna mobile; atualizado para duas colunas, mantendo imagem inteira e legenda no destaque.
- E2E de busca usava nome parcial “Buscar”, que passou a encontrar também a nova busca do cabeçalho. Seletor ficou exato; rerun final passou nos quatro projetos.
- O utilitário adicional de axe começou com browser.newPage; ajustado para contexto explícito. O relatório final corresponde ao rerun concluído, não à execução interrompida.

## Observações e limites

- O servidor Node local de produção Vinext emitiu ERR_STREAM_UNABLE_TO_PIPE/Premature close durante navegação rápida de testes. As asserções passaram e o percurso adicional não capturou erro JavaScript de página. O aviso de servidor não foi ocultado nem corrigido em dependência.
- Sem teste em celular físico/GPU real, leitor de tela físico, conversão comercial ou novo Lighthouse. Resultados antigos de performance não qualificam esta versão.
- Fotos são geradas/ilustrativas. Assets novos: campanha 1672×941 e macro 1536×1024; catálogo V2 aprovado preservado.
- Vendas, pagamentos, estoque real, atendimento operacional e domínio comercial continuam fora da ativação. Acesso privado e noindex preservados.

## Publicação confirmada

- URL: https://heal-incensos.sacredgeometry888888.chatgpt.site
- Audiência: privada do proprietário, preservada.
- Projeto: `appgprj_6ab83692eba08191899a8c72ff28990e`.
- Commit enviado: `d461c1a6c2f0cca3976c897b02e409f2c9b8efdf`.
- Versão: `appgprj_6ab83692eba08191899a8c72ff28990e~appgver_cbf9346136f08191960f552e5b6117b3`.
- Deployment: `appgdep_6ab842d7db288191968db2ef574cf39e`.
- Status nativo: `succeeded`, sem failure_message.
- Confirmado em: `2026-09-26T22:10:52.286883+00:00`.
- Runtime env revision: 2; SITE_ORIGIN aponta para a URL acima.
- Archive: `site/work/heal-retail-v1.tar.gz`, 6.458.494 bytes.

Próximo passo real: revisão visual do usuário nesta publicação e preenchimento do catálogo comercial autoritativo antes de conectar compra.
