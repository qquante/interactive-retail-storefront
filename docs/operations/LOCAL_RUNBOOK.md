# HEAL — Runbook local

Atualizado em: 2026-08-28

## Instalação reproduzível

```powershell
cd C:\Users\PC\Desktop\Heal\site
npm ci
npx playwright install chromium firefox webkit
```

## Desenvolvimento

```powershell
npm run dev
```

URL padrão: `http://localhost:3000`.

## Validação

Executar, nessa ordem:

```powershell
npm run lint -- --no-cache
npx tsc --noEmit --incremental false
npm run test:unit
npm run test:integration
npm run test:a11y
npm run test:e2e
npm run build
npm audit --omit=dev
git diff --check
```

O Lighthouse é evidência lab separada em `docs/evidence/performance/`. O resultado mobile atual não passa o gate e não deve ser reclassificado sem nova medição controlada.

## Estado da fixture

- A sacola usa `sessionStorage` na aba atual.
- Fechar a aba ou limpar a sacola encerra o estado atual.
- Produtos, estoque, preço e frete são fictícios.
- O checkout encerra localmente e não faz redirect externo.

## Recuperação local

Se a fixture apresentar estado inválido, use o botão `Limpar sacola demonstrativa`. Não remover armazenamento do navegador automaticamente nem instruir limpeza ampla de dados sem consentimento do usuário.

Se um gate falhar, preservar o output, corrigir a causa e reexecutar o gate completo. Não apagar `test-results/` para esconder falhas; a pasta é ignorada pelo Git e pode ser inspecionada localmente.

