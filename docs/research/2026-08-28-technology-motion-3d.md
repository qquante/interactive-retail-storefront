# HEAL — Pesquisa de tecnologia, motion e 3D

Data de acesso: 2026-08-28  
Estado: `research`

## Baseline técnico verificado

- Sites/Vinext `1.0.0-beta.8`, Vite `8.2.2`, Next `16.3.3` e React `19.2.8`.
- `npm audit --omit=dev --json`: zero vulnerabilidades conhecidas no snapshot.
- Baseline: `vinext check` começou em 90% por uso de `next/font/google`. Após a remoção e expansão das rotas, o rerun final registrou 100%, 17 páginas e 0 itens parciais/issues.
- Anime.js e Three.js ainda não estão instalados neste ponto da execução.

## Anime.js v4

Uso aprovado para a HEAL:

- feedback de brasa no `add_to_cart`;
- revelação coordenada do símbolo/linha de fumaça;
- transições editoriais que preservem orientação;
- expansão de acordes aromáticos.

Contrato React:

- importar apenas funções usadas;
- encapsular em client component;
- criar `createScope()` dentro de `useEffect()`;
- executar `scope.revert()` no cleanup;
- CSS/WAAPI para estados simples; timeline Anime.js apenas quando a coordenação trouxer significado;
- não animar CTA, preço ou conteúdo essencial de forma que atrase interação.

Fonte oficial: [Anime.js — Using with React](https://animejs.com/documentation/getting-started/using-with-react/), [stagger](https://animejs.com/documentation/utilities/stagger/).

## Three.js

Uso aprovado: uma única cena decorativa, procedural e lazy da brasa com coluna de fumaça. O canvas não contém conteúdo ou controles essenciais.

Contrato técnico:

- `WebGLRenderer` estável, client-only e lazy;
- `setAnimationLoop()` para controlar o loop;
- `IntersectionObserver`, `visibilitychange` e preferência de redução de movimento para pausar/desligar;
- DPR limitado por quality tier;
- meta de 30 FPS em mobile e 60 FPS em desktop somente após medição;
- cancelar loop e liberar renderer, geometrias, materiais e demais recursos no cleanup;
- fallback CSS/SVG presente no HTML e sem impedir compra.

O WebGLRenderer atual usa WebGL 2; o suporte não deve ser presumido. Fontes oficiais: [WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html), [responsive design](https://threejs.org/manual/en/responsive.html), [cleanup](https://threejs.org/manual/en/cleanup.html).

## Acessibilidade de movimento

- Partir do estado estático e habilitar movimento somente em `prefers-reduced-motion: no-preference`.
- Movimento disparado por interação deve ser suprimido quando não essencial.
- Funcionalidade não pode depender de arrastar, orientação ou movimento.
- Targets internos da HEAL usarão 44×44 CSS px como regra de produto; WCAG 2.2 AA exige no mínimo 24×24 ou espaçamento/equivalência nas exceções.

Fontes: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [W3C Technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39.html).

## Performance

Metas de campo continuam:

- LCP p75 até 2,5 s;
- INP p75 até 200 ms;
- CLS p75 até 0,1.

Three.js ficará fora do caminho crítico e de rotas que não exibem a assinatura. Medições Lighthouse são laboratório; os percentis de campo só existirão após tráfego real. Fonte: [web.dev — Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds).

## Gate de implementação

1. HTML e CTA completos sem Anime.js/Three.js.
2. Fallback visual aprovado.
3. Uma animação Anime.js e uma cena Three.js na vertical slice.
4. Cleanup reproduzível ao navegar.
5. Reduced motion, WebGL indisponível e rede lenta testados.
6. Bundle e CWV lab comparados com efeitos ligados/desligados.
