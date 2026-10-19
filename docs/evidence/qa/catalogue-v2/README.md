# QA de integração — catálogo V2

Data: 2026-09-26. Escopo: cinco imagens do catálogo, não a reconstrução completa do site.

## Resultado final

- `browser-probe.json`: custom probe em Chromium, 28 de 28 combinações aprovadas.
- Rotas: `/colecoes/heals`, os cinco `/produtos/<aroma>` e `.home-products` da Home.
- Larguras: 320, 390, 768 e 1440 px.
- 60 ocorrências de imagens: carregamento completo, proporção preservada, `object-fit: contain`, área 4:5 e legenda fora da foto.
- Hover: sem transformação ou mudança de enquadramento.
- Overflow horizontal de página: zero nas 28 combinações.
- Erros de página e de console: zero na execução final.
- Capturas: 14 arquivos PNG, das sete superfícies a 390 e 1440 px.
- Horário do relatório final: 2026-09-26T21:13:21.226Z.

## Regressão encontrada e corrigida

O componente `Image` do runtime Vinext injeta `object-fit: cover` inline quando `fill` é usado. Esse estilo prevalecia sobre `contain` no CSS do componente. Foi adicionado `style={{ objectFit: 'contain' }}` ao próprio `Image`, com verificação unitária e E2E do estilo calculado.

`browser-probe-before-contain-fix.json` preserva o resultado anterior à correção. Não é a validação final.

## Gates executados após a correção

- Vitest: 22 de 22 testes passaram.
- TypeScript: `tsc --noEmit` passou.
- ESLint focado nos componentes e testes alterados: passou.
- Build: `vinext build`, cinco etapas concluídas.
- Playwright E2E focado em `usa a assinatura HEAL e a imagem atual do catálogo`: Chromium desktop e mobile, 2 de 2 passaram contra o build final.

O probe customizado não equivale à execução integral da suíte E2E. Não foram testados ou declarados corrigidos os shaders, a progressão de cores da fumaça, o checkout, os pagamentos, o deploy público ou a configuração de domínio.

## Assets finais recebidos

Todos WebP, com dimensões nativas confirmadas de 1122 × 1402 px:

| Arquivo | Bytes |
| --- | ---: |
| canela.webp | 101900 |
| lavanda-celestial.webp | 106288 |
| mirra.webp | 95740 |
| olibano.webp | 91316 |
| alecrim.webp | 104890 |

## Reprodução

Com o servidor local na porta 3000, executar a partir de `site/`:

```text
node ../docs/evidence/qa/catalogue-v2/browser-probe.mjs
```

O script produz capturas e relatório nessa pasta. As URLs otimizadas de imagem são normalizadas antes da inspeção; a proporção é comparada com tolerância de arredondamento porque o navegador pode receber uma variante responsiva redimensionada.
