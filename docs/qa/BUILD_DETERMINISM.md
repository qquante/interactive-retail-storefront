# HEAL — verificação do warning CSS do Vinext

Data: 2026-08-28  
Owner: HEAL-00  
Estado: warning conhecido, sem perda observada; não é aprovação de produção

## Contexto

`vinext build` emite `[FILE_NAME_CONFLICT]` ao escrever `_next/static/css/commerce.BmIhDIRk.css`. A origem é a mesma CSS Module compartilhada por componentes server e client. O warning não foi ocultado nem convertido em sucesso.

## Repetição

Dois builds completos consecutivos foram executados no mesmo estado de código. Ambos terminaram com exit `0`, emitiram os mesmos nomes, tamanhos e SHA-256 para todas as folhas CSS. As três cópias de `commerce.BmIhDIRk.css` — client, server e server/ssr — têm conteúdo byte-idêntico:

```text
Length: 8444 bytes
SHA-256: 4458929FDF990B76B178B7D6743B0A7B8173411F5042D466F69F138DE75674B7
```

Manifesto estável nos dois builds:

```text
commerce.BmIhDIRk.css|8444|4458929FDF990B76B178B7D6743B0A7B8173411F5042D466F69F138DE75674B7
EditorialPage.B_CKQjHr.css|2160|40864EDB3FFD6A0EE376AB43157EC35691DEB717DDC24F523ACEBAA5BE91287A
EmberSmokeScene.BSDuinSn.css|1342|8F1889CA4FAC8D469716D9DB25AA34F314CC7CC8FE3906929227F85E5181C491
index.CxUzxdVd.css|15701|9C3581EAA34379570BF430D8BDEFFE33730B6E91A339C9E241983FBB5619206A
motion.De8MEXiP.css|1556|CDC5B904BC1B76BC7EA0481AF883CB2D1B6CA9046333B792C4CB6DB14EA50007
```

O smoke de produção local de HEAL-21 carregou as folhas, acessou o CSSOM e preservou as rotas/estilos. Portanto, o risco de overwrite divergente não se materializou neste release candidate.

## Decisão

- Não desabilitar code splitting apenas para silenciar o warning, pois isso anteciparia CSS de recursos lazy e pioraria performance.
- Manter o warning visível e tratar upgrade/correção do Vinext como dívida de plataforma.
- Reabrir como blocker se hashes divergirem, CSS desaparecer no smoke ou o warning mudar de arquivo/conteúdo.
