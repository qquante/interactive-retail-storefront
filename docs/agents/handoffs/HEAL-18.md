# Handoff HEAL-18 / HEAL-T018

## Resultado
Budget, bundle audit, Lighthouse e probes de runtime.
## Estado real: lab local; produção não aprovada
## Fontes consultadas e datas
web.dev Core Web Vitals e artefatos locais em 2026-08-28.
## Decisões propostas
Gate mobile p75 e perfil GPU real antes de release.
## Arquivos alterados
`docs/performance/` e `docs/evidence/performance/`.
## Escopo não tocado
CDN, origem HTTPS, RUM/CrUX e dispositivo físico.
## Comandos executados
Build, Playwright probes e Lighthouse.
## Testes e exit codes
Build/probes exit 0; Lighthouse JSON válido, comando exit 1 por EPERM na limpeza temporária do Chrome.
## Evidências geradas
Mobile 79/LCP 4,1s; desktop 99/LCP 0,8s; bundles.
## Erros encontrados e como foram resolvidos
OG foi otimizado para 339.141 bytes; falha EPERM documentada sem esconder.
## Riscos e pendências
Mobile, Three/GPU, Brotli/CDN e field data.
## Próximo owner
Frontend performance/infra.
