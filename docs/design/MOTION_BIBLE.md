# HEAL. CURA. — Motion Bible da vertical slice

Data: 2026-08-28  
Owner: HEAL-10  
Estado real: `implementado em componentes isolados; ainda não integrado nem validado no navegador`  
Consumidores: HEAL-08, HEAL-09, HEAL-12, HEAL-17, HEAL-18, HEAL-21.

## 1. Princípio

Movimento na HEAL explica passagem ou confirma estado. Ele não ocupa o lugar da informação, não coreografa toda entrada de viewport e não cria espera antes de preço, navegação ou CTA.

A vertical slice terá somente dois movimentos Anime.js:

1. a linha de passagem entre a zona de atmosfera e a zona de prova;
2. a brasa curta que acompanha uma confirmação real de `add_to_cart`.

Hover, press, foco, accordion e outros estados locais continuam em CSS/WAAPI. Não há smooth scroll, scroll hijacking, partículas genéricas, cursor-following ou outra engine de animação.

## 2. Escalas e tokens

| Escala | Intervalo | Uso nesta slice |
|---|---:|---|
| Funcional | 120–220ms | brasa do carrinho: 180ms |
| Editorial | 500–900ms | traço do seam: 720ms |
| Ambiente | lento e pausável | não implementado por HEAL-10 |

Easings:

- `out(3)`: desaceleração firme, sem elasticidade; usada na passagem e na brasa.
- Não usar spring/bounce em compra, navegação ou mensagem de estado.

Distância máxima funcional: `24px`. A animação não muda altura, largura, posição de layout nem ordem DOM.

## 3. M-001 — Passagem editorial do hero para a prova

Componente: `site/components/motion/EditorialSeamReveal.tsx`.

### Propósito e sensação

Marca a mudança de uma abertura sensorial escura para uma área clara de comparação e prova. A linha comunica “a atmosfera abre a atenção; agora entram os fatos”. Não revela produto, preço ou CTA.

### Gatilho

Uma vez ao montar o componente abaixo do hero. Não depende de scroll e não observa todas as entradas de viewport. Alterar a preferência de redução de movimento faz o scope do Anime.js se reavaliar.

### Duração e easing

- Traço: `720ms`, `out(3)`.
- Ponto de brasa: `180ms`, iniciado em `420ms`, `out(3)`.

### Custo técnico

- Anime.js modular: `animejs/scope` + `animejs/timeline`.
- Um timeline curto, dois spans decorativos e nenhuma repetição.
- `clip-path`, `opacity` e `scale`; a área de repaint tem somente `2px` de altura.
- Nenhum listener de scroll, RAF próprio, medição de layout ou dependência de Three.js.
- O módulo deve ser importado apenas na Home.

### Fallback e acessibilidade

- O seam base já chega completo no HTML/CSS. Sem JavaScript, nada fica escondido.
- Em `prefers-reduced-motion: reduce`, o traço animado é omitido e a linha estática permanece.
- Em `forced-colors`, a linha usa `CanvasText`; brilhos e elementos supérfluos somem.
- Todo o componente é `aria-hidden`; a passagem não transmite uma informação que screen reader precise receber.
- O conteúdo e os CTAs do hero ficam fora do componente e disponíveis imediatamente.

## 4. M-002 — Brasa após adicionar à sacola

Componente: `site/components/motion/EmberCartFeedback.tsx`.

### Propósito e sensação

Dá uma confirmação periférica, breve e coerente com a matéria da marca quando o commerce adapter conclui `add_to_cart`. A brasa não significa sucesso sozinha: a mensagem textual é o estado autoritativo para visão, leitor de tela e movimento reduzido.

### Gatilho

Mudança de `eventKey` **depois** da confirmação do commerce. Clique, loading ou tentativa rejeitada não disparam a brasa. `null` nunca dispara. O owner do carrinho deve incrementar ou trocar a chave apenas para um novo sucesso confirmado.

### Duração e easing

- `180ms`, `out(3)`.
- Deslocamento horizontal: `24px`.
- A brasa parte visível e desaparece durante o deslocamento; não bloqueia outro acionamento.

### Custo técnico

- Anime.js modular: `animejs/scope` + `animejs/animation`.
- Um elemento, `transform` e `opacity`; nenhuma alteração de layout.
- Sem timer persistente e sem loop.
- Repetições usam a composição padrão de substituição, evitando acúmulo de animações.

### Fallback e acessibilidade

- `message` é texto visível em `role="status"`, `aria-live="polite"` e `aria-atomic="true"`.
- A mensagem não recebe foco, não some por causa da animação e continua presente sem JavaScript.
- Em reduced motion e forced colors, o trilho decorativo é removido e o status textual permanece.
- O feedback não é link nem única porta para a sacola; o owner da UI mantém a ação `Ver sacola` separada.
- Erro, timeout e estoque insuficiente usam mensagens próprias e não disparam este componente.

## 5. Ciclo de vida React

Os dois componentes são client components estreitos. Cada um:

1. cria `createScope()` dentro de `useEffect()`;
2. limita seletores/ref ao root local;
3. registra as animações no scope;
4. reage dinamicamente a `(prefers-reduced-motion: reduce)` por `mediaQueries` do Anime.js;
5. chama `scope.revert()` no cleanup para cancelar animação e restaurar estilos inline.

Não montar o scope em componente server, não selecionar `document` global e não compartilhar uma timeline global entre rotas.

## 6. Contrato de integração

### Seam da Home

Substituir somente o `div.transition-seam` estático pelo componente abaixo; não envolver nem animar o conteúdo do hero:

```tsx
import { EditorialSeamReveal } from '@/components/motion';

<EditorialSeamReveal className="transition-seam" />
```

Antes de integrar, o owner visual deve confirmar que a classe global não adiciona um segundo background conflitante. A implementação isolada já contém o gradiente aprovado.

### Feedback do carrinho

```tsx
import { EmberCartFeedback } from '@/components/motion';

<EmberCartFeedback
  eventKey={lastConfirmedAddId}
  message={cartStatusMessage}
/>
```

`lastConfirmedAddId` precisa mudar para cada confirmação. `cartStatusMessage` deve seguir a copy factual, por exemplo: `{displayName} foi adicionado à sacola demonstrativa.` Na fixture, o rótulo persistente de demonstração continua obrigatório e separado.

## 7. Gates de QA

- [ ] Sem JavaScript, seam completo, hero e CTA legíveis.
- [ ] Em reduced motion ativado antes da carga, nenhuma animação ocorre.
- [ ] Alternar reduced motion durante a sessão interrompe/reverte o movimento e preserva o estado textual.
- [ ] Teclado e foco não são movidos por nenhum componente.
- [ ] Screen reader anuncia uma confirmação por mudança real da mensagem, sem anúncio da brasa.
- [ ] Dois sucessos consecutivos com `eventKey` diferente produzem dois feedbacks; render inicial não produz feedback falso.
- [ ] Erro de add-to-cart não altera `eventKey` e não dispara brasa.
- [ ] Desmontar durante a animação não deixa estilo inline, timer ou animação ativa.
- [ ] Home sem o módulo de carrinho e rotas sem motion não recebem Anime.js desnecessariamente.
- [ ] Lighthouse/trace confirma ausência de layout shift e de long task atribuível aos dois movimentos.

## 8. Limites e pendências

- Os componentes não estão ligados à Home nem ao carrinho nesta entrega; integração pertence aos respectivos owners.
- O comportamento ainda precisa de QA visual nos viewports 320, 390, 1024 e 1440, além de reduced motion e forced colors.
- Esta frente não implementa a cena Three.js, estados de commerce, toast global ou analytics.
