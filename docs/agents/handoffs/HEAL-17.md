# Handoff HEAL-17 / HEAL-T017

## Resultado
Auditoria de acessibilidade, teclado, reflow e reduced motion.
## Estado real: validação automatizada local; humana pendente
## Fontes consultadas e datas
Código, browser e WCAG/axe aplicáveis em 2026-08-28.
## Decisões propostas
Erros associados, regions corretas e foco visível.
## Arquivos alterados
`docs/qa/ACCESSIBILITY_REVIEW.md`; correções ficaram com root.
## Escopo não tocado
Leitores de tela/dispositivos físicos.
## Comandos executados
Axe, browser/teclado e probes de reflow.
## Testes e exit codes
`npm run test:a11y`: 3 rotas, 0 violações, exit 0; matriz expandida no QA.
## Evidências geradas
Review e resultados Axe.
## Erros encontrados e como foram resolvidos
Landmark, associação de quantidade e CEP foram remediados.
## Riscos e pendências
NVDA/JAWS/VoiceOver/TalkBack e Safari/iOS físico.
## Próximo owner
HEAL-21 e QA humano.
