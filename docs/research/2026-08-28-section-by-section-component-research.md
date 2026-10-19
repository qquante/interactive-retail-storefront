# HEAL — pesquisa de componentes e storytelling por seção

Data: 2026-08-28  
Estado: pesquisa concluída; nenhuma seção alterada nesta etapa.

## Objetivo

Criar um repertório técnico e visual reutilizável antes da reconstrução da Home. A execução será estritamente sequencial: uma seção por mensagem, com captura desktop/mobile, avaliação e aceite antes de avançar.

## Leitura do projeto atual

- Stack já instalada: React 19, Vinext/Next-compatible, Anime.js 4.5 e Three.js 0.185.
- A Home já separa Hero, Mapa do Ar, história, produtos, método, profissionais e rodapé.
- `EmberSmokeScene` já faz carregamento dinâmico, quality tiers, fallback, cleanup e recuperação de WebGL.
- `AirMap` já usa imports granulares de Anime.js, `createScope()` e `createDrawable()`.
- Consequência: adicionar Framer Motion/Motion, React Three Fiber e vários renderizadores concorrentes aumentaria custo e complexidade sem necessidade.

## Decisão técnica principal

Usar bibliotecas prontas como repertório e fonte de padrões, mas manter a implementação final centrada em:

1. Anime.js para texto, SVG, timelines e progressão por scroll.
2. Three.js existente para fumaça, brasa e resposta espacial.
3. CSS para layout, máscaras, sticky storytelling, textura e fallbacks.
4. Código local e source-owned para cada componente aprovado.

Não transformar a HEAL em uma colagem de componentes reconhecíveis de landing pages.

## Fontes de componentes avaliadas

| Fonte | O que oferece | Integração com HEAL | Decisão |
|---|---|---|---|
| Anime.js 4 | `splitText`, `createDrawable`, `createMotionPath`, `morphTo`, timelines, stagger, scopes e ScrollObserver | Já instalado; imports por subpath; corresponde à arquitetura atual | **Usar diretamente** |
| Three.js | ShaderMaterial, BufferGeometry, Points e blending para fumaça/brasa | Já instalado e encapsulado em runtime lazy | **Evoluir o runtime atual** |
| Paper Shaders | `SmokeRing`, `Gem Smoke`, grain, god rays e noise em WebGL2; React 19; Apache-2.0 no repositório atual | Excelente para spike visual rápido, mas criaria outro canvas/runtime | **Referência + A/B isolado, não dependência imediata** |
| Magic UI | Blur Fade, Text Reveal, Light Rays, Progressive Blur, Lens, Scroll Progress; MIT | Componentes usam Motion em vários casos | **Portar o padrão para Anime.js/CSS** |
| Motion Primitives | Text effects, in-view, morphing, dialogs e componentes animados; MIT; projeto beta | Boa fonte de estrutura, mas adiciona Motion | **Referência de código, sem instalar agora** |
| React Bits | Backgrounds, text motion, Silk, Threads, Light Rays, Noise e componentes copy-paste | Efeitos visuais fortes; dependências variam; licença MIT + Commons Clause | **Referência/protótipo seletivo** |
| Aceternity UI | Tracing Beam, Sticky Scroll Reveal, Lens, Focus Cards, Background Beams, Vortex | Muitos componentes dependem de Motion; estética facilmente reconhecível | **Usar como referência estrutural, não copiar a identidade** |
| Lenis | Sincronização de scroll/DOM/WebGL e reduced-motion | Pode ajudar se o storytelling apresentar jitter real | **Hold; não instalar sem problema comprovado** |
| `react-smoke` | Fumaça pronta sobre React Three Fiber | Duplicaria abstração e adicionaria R3F a um runtime Three puro já existente | **Rejeitado para o projeto atual** |

## Componentes transferíveis recomendados

### Fumaça e atmosfera

- Referência visual: Paper Shaders `SmokeRing` e `Gem Smoke`.
- Implementação preferida: incorporar noise, dissolução, largura variável, correntes secundárias e resposta lenta ao cursor no shader Three.js atual.
- Textura ambiental: grain estático em CSS e uma camada de luz muito discreta; nenhuma “aurora” genérica.
- Regra: a fumaça nasce da brasa, atravessa o conteúdo e conduz o olhar. Não pode existir como wallpaper desconectado do produto.

### Texto

- `splitText()` para revelar palavras como uma expiração, sem efeito de máquina de escrever.
- Máscaras por linha e stagger curto, executadas uma vez.
- `createMotionPath()` para a brasa ou um pequeno fragmento seguir a mesma curva da fumaça.
- `morphTo()` apenas quando um rastro se transforma em outro aroma.
- `createScope()` para cleanup, media queries e reduced motion por seção.

### Storytelling por scroll

- Estrutura inspirada em Sticky Scroll Reveal e Tracing Beam.
- Implementação local: coluna visual sticky + capítulos curtos que mudam a cena.
- Cada mudança deve revelar uma informação concreta: vareta, brasa, fumaça, embalagem, aroma ou contexto de uso.
- Scroll normal permanece soberano; nada de travar a página ou exigir precisão de mouse.

### Produto

- Estrutura inspirada em Lens/Progressive Blur para mostrar textura do bastão e detalhes da caixa.
- Desktop: composição editorial assimétrica, não grid repetitivo em todas as linhas.
- Mobile: cards curtos com comparação rápida; detalhes entram na PDP.
- Fotografias finais devem mostrar caixa fechada, vareta, escala, textura e contexto; faca aberta fica fora da loja.

### Luz, portal e simbolismo

- Usar curvas espelhadas, passagem/portal, brasa e repetição como gramática visual recorrente.
- O desenho de portão enviado é referência formal de simetria e curvas, não representação literal do número 666.
- A repetição pode aparecer em fumaça, recortes, molduras, percurso do cursor, máscaras e transições.

## Arquitetura narrativa recomendada

Cada seção precisa responder uma pergunta e preparar a próxima:

1. **Primeiro viewport — Header + Hero:** o que é HEAL, o que são HEALS e por que continuar olhando?
2. **Mapa do Ar:** qual rastro/aroma combina comigo agora?
3. **História:** por que essa marca existe e qual mundo ela constrói?
4. **Coleção:** quais incensos existem e como compará-los rapidamente?
5. **Como escolher:** como transformar curiosidade em uma escolha simples?
6. **Profissionais:** como a HEAL serve espaços, terapeutas, lojas e revenda?
7. **Rodapé:** como continuar a relação com a marca?

## Regra de copy por seção

Cada seção terá no máximo:

- uma frase-mãe memorável;
- uma explicação curta e concreta;
- um gesto/ação principal;
- uma prova visual ou material;
- uma transição narrativa para a próxima seção.

Evitar copy que começa pela defesa, futuro indefinido, placeholder ou explicação do próprio design.

## O que não será importado

- Fundos de partículas, estrelas, meteoros ou auroras sem relação com incenso.
- Texto digitado, scramble ou glitch com estética tecnológica.
- Carrossel automático.
- Scroll hijacking.
- Mais de um runtime WebGL pesado no mesmo viewport.
- Componentes copiados sem adaptação de tipografia, ritmo, cor e semântica HEAL.

## Sequência de execução e gate

Para cada seção:

1. Registrar task `in_progress`.
2. Revisar 3–5 referências específicas da seção.
3. Definir frase-mãe, função, composição e movimento.
4. Implementar somente aquela seção.
5. Validar em 1440×900, 390×844, teclado e reduced motion.
6. Entregar captura e parecer sincero.
7. Aguardar aceite explícito antes da seção seguinte.

## Próxima unidade autorizada

**HEAL-T039 — Primeiro viewport: Header + Hero.**  
Nenhuma outra seção deve ser alterada junto com ela, salvo tokens globais estritamente necessários e documentados.

## Referências principais

- Anime.js SVG: https://animejs.com/documentation/svg/
- Anime.js SplitText: https://animejs.com/documentation/text/splittext/
- Anime.js React/Scope: https://animejs.com/documentation/getting-started/using-with-react/
- Anime.js ScrollObserver: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/
- Three.js Points: https://threejs.org/docs/pages/Points.html
- Three.js particle waves: https://threejs.org/examples/webgl_points_waves.html
- Paper Shaders: https://shaders.paper.design/
- Paper Shaders GitHub/licença: https://github.com/paper-design/shaders
- Magic UI: https://magicui.design/docs/components
- Magic UI GitHub/licença: https://github.com/magicuidesign/magicui
- Motion Primitives: https://motion-primitives.com/docs
- React Bits: https://www.reactbits.dev/get-started/index
- Aceternity UI: https://ui.aceternity.com/explore
- Aceternity Tracing Beam: https://ui.aceternity.com/components/tracing-beam
- Lenis: https://lenis.dev/
- Baymard, homepage e imagem própria: https://baymard.com/blog/ecommerce-homepage-ux
- Baymard, descrições por highlights: https://baymard.com/blog/structure-descriptions-by-highlights
