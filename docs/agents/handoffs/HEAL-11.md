# Handoff HEAL-11 / HEAL-T011

## Resultado
Cena procedural Three.js lazy com qualidade adaptativa e fallback SVG.
## Estado real: integrado localmente; performance de produção bloqueada
## Fontes consultadas e datas
Docs Three.js e pesquisa tecnológica de 2026-08-28.
## Decisões propostas
Brasa/fumaça como transição de atmosfera; pausa fora da viewport/aba.
## Arquivos alterados
`site/components/three/**`.
## Escopo não tocado
Gameplay, assets externos e checkout.
## Comandos executados
Lint/typecheck/build; root confirmou matriz final.
## Testes e exit codes
Fallback reduced-motion/saveData validado; build exit 0.
## Evidências geradas
Tiers, disposal, visibility/intersection e fallback.
## Erros encontrados e como foram resolvidos
Mismatch de hidratação removido pelo root.
## Riscos e pendências
Chunk 516.529 bytes e ausência de trace GPU real.
## Próximo owner
HEAL-18 e owner de plataforma.
