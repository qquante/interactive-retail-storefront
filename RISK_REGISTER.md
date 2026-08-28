# HEAL — Registro de Riscos

Atualizado em: 2026-08-28

| ID | Risco | Prob. | Impacto | Mitigação | Owner | Estado |
|---|---|---:|---:|---|---|---|
| R-001 | Catálogo e claims inventados por falta de dados reais. | Alta | Alto | Fixtures rotuladas; campos desconhecidos marcados; bloqueio de alegações. | HEAL-04/13/19 | open |
| R-002 | WebGL prejudicar mobile, bateria ou LCP. | Média | Alto | Lazy load, DPR/FPS tiers, pausa, fallback e budgets. | HEAL-11/18 | open |
| R-003 | Experiência premium esconder preço/CTA/frete. | Média | Alto | UX testing e commerce-first IA. | HEAL-05/06/13 | open |
| R-004 | Stack do scaffold divergir da engine de commerce escolhida. | Média | Médio | Adapter + ADR antes de acoplamento. | HEAL-01/14 | open |
| R-005 | SEO baseado em recurso de 2026 descontinuado ou indisponível. | Média | Médio | Revalidar fontes oficiais e registrar data. | HEAL-15/16 | open |
| R-006 | Confundir fixture com checkout real. | Alta | Alto | Badges/estado explícito em docs e UI de desenvolvimento. | HEAL-13/21 | open |
| R-007 | Agentes editarem arquivos sobrepostos. | Média | Alto | Registry, no-touch boundaries e integração central. | HEAL-00 | open |
| R-008 | Assets genéricos quebrarem autenticidade. | Alta | Médio | Direção de arte; usar material gerado apenas como provisório e com provenance. | HEAL-02/07 | open |
| R-009 | Conteúdo fixture ser indexado como oferta real. | Média | Alto | `noindex`, badge persistente, nenhum feed/schema Product até catálogo real. | HEAL-15/16 | mitigating |
| R-010 | Vinext beta divergir de Next em metadata/cache/imagens. | Média | Alto | `vinext check`, build, SSR/HTML e testes cross-browser antes de qualquer deploy. | HEAL-01/08/21 | open |
