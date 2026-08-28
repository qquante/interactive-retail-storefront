# HEAL — Registro de Riscos

Atualizado em: 2026-08-28

| ID | Risco | Prob. | Impacto | Mitigação | Owner | Estado |
|---|---|---:|---:|---|---|---|
| R-001 | Catálogo e claims inventados por falta de dados reais. | Alta | Alto | Fixtures rotuladas; campos desconhecidos marcados; bloqueio de alegações. | HEAL-04/13/19 | mitigating |
| R-002 | WebGL prejudicar mobile, bateria ou LCP. | Média | Alto | Lazy load, DPR/FPS tiers, pausa, fallback e budgets; trace GPU real pendente. | HEAL-11/18 | open production gate |
| R-003 | Experiência premium esconder preço/CTA/frete. | Média | Alto | UX testing e commerce-first IA. | HEAL-05/06/13 | mitigated local |
| R-004 | Stack do scaffold divergir da engine de commerce escolhida. | Média | Médio | Ports + ADR + runbook BFF antes de acoplamento. | HEAL-01/14 | mitigated |
| R-005 | SEO baseado em recurso de 2026 descontinuado ou indisponível. | Média | Médio | Fontes oficiais datadas e gate de revalidação. | HEAL-15/16 | mitigated |
| R-006 | Confundir fixture com checkout real. | Alta | Alto | Badges/estado explícito; nenhum meio de pagamento/pedido. | HEAL-13/21 | mitigated local |
| R-007 | Agentes editarem arquivos sobrepostos. | Média | Alto | Registry e scopes exclusivos; integração do root. | HEAL-00 | controlled |
| R-008 | Assets genéricos quebrarem autenticidade. | Alta | Médio | Direção `Tempo de Brasa`, uso demonstrativo e provenance. | HEAL-02/07 | mitigating |
| R-009 | Conteúdo fixture ser indexado como oferta real. | Média | Alto | `noindex` crawlable, preview autenticado no edge, badge persistente e nenhum feed/schema Product até catálogo real. | HEAL-15/16 | mitigating; auth external |
| R-010 | Vinext beta divergir de Next em metadata/cache/imagens. | Média | Alto | `vinext check`, build, SSR/HTML e testes cross-browser antes de qualquer deploy. | HEAL-01/08/21 | open |
| R-011 | Lighthouse mobile abaixo do gate e sem prova de compressão/CDN. | Alta | Alto | Remediar prefetch, medir 3 runs no preview HTTPS e provar Brotli. | HEAL-18 | open production gate |
| R-012 | CSP/headers e revalidação server-side inexistentes. | Alta | Alto | BFF, host HTTPS, headers e teste DAST antes de commerce real. | HEAL-14/19 | open production gate |
| R-013 | Validação legal/operacional, catálogo, domínio e atendimento ausentes. | Alta | Alto | Manter noindex e templates A VALIDAR até owners humanos fornecerem dados. | HEAL-00/19 | open external |
| R-014 | Vinext reemitir CSS compartilhado com filename conflict. | Baixa no estado atual | Médio | Hashes byte-idênticos em dois builds e smoke íntegro; manter warning visível e revalidar em upgrades. | HEAL-08/21 | monitored |
