# HEAL-T050 — padrão Pulsos e ponta iluminada

2026-09-26. Ajustes posteriores à reforma retail V1, autorizados pelos dois pedidos seguintes do usuário.

- Padrão único `pulse`, índice de shader 2. Sem seletor, sem atalhos de variantes e sem override por `?variant=`. URLs antigas continuam funcionando, mas exibem o movimento aprovado.
- Dez cores, progressão 1→10, delay 650 ms, duração 12.600 ms, velocidade 4 e multiplicador GLSL 0.105 preservados. Equações do shader não modificadas.
- Imagem original 1080×1920 preservada. Mais luminosidade somente no elemento img; brasa não recebe esse filtro adicional.
- Vareta ancorada à base e transladada para fora do enquadramento: brasa aproximadamente 82 px acima da borda no desktop e 62 px no mobile. Corpo inferior fica fora da cena.
- No mobile, controles de rodapé do Hero foram alinhados à esquerda para não cobrir a ponta.
- Cinco arquivos desta etapa sincronizados para o projeto principal `site/`.

## Validação

- Vitest 23/23, ESLint e TypeScript passaram. O teste de comparação de frames inicialmente usou Buffer.equals, incompatível com a declaração de Buffer deste projeto; substituído por hash SHA-256 e typecheck reexecutado com sucesso.
- Build final aprovado.
- E2E final focado Chromium desktop/mobile: 8 passaram, 2 skips de testes exclusivos desktop. Inclui ponta na base em 320/390/768/1440, URLs antigas e setas sem trocar variante, canvas mudando depois de colorCount=10, pausa, reduced-motion e âncora comum em 320–1920 px.
- Prévia local em ?variant=flow confirmou pulse, colorCount 10 e zero opções.
- Capturas revisadas: `incense-tip-390.png` e `incense-tip-1440.png`. Framing medido: 61.921875 px e 81.921875 px entre a âncora da brasa e a borda inferior.
- Não foi repetida a suíte completa de 74 E2E da T049; este é um gate focado nos ajustes novos. Celular físico e GPU real continuam não medidos.

## Publicação

- URL: https://heal-incensos.sacredgeometry888888.chatgpt.site
- Status nativo: succeeded, sem erro.
- Commit: `0d276d88128961bca4410488b2b1c239d2947745`.
- Versão: `appgprj_6ab83692eba08191899a8c72ff28990e~appgver_1a4352e3f0848191816984f2bf332e7c`.
- Deployment: `appgdep_6ab845c4725c819195b976c086471343`.
- Confirmação: `2026-09-26T22:23:21.060541+00:00`.
- Audiência privada e runtime revision 2 preservados. Esta atualização não ativa vendas.
