# HEAL — publicação Railway

Atualizado: 2026-09-26 (America/Sao_Paulo).

## Destino independente

- URL pública: https://heal-web-production-48b1.up.railway.app
- Projeto: `HEAL` — `c6d07c45-c29c-455a-aaa1-b9725cb72923`.
- Serviço: `heal-web` — `096c5f37-0ec4-46c8-b03f-8b12ef3cf39b`.
- Ambiente: `production` — `b58e62e8-25ca-4f4e-8fad-f2a7d6971985`.
- Domínio Railway, HTTPS, porta 3000. Sem domínio comprado/customizado.
- Uma réplica; sem banco, volume, cron ou vínculo GitHub/autodeploy.
- Sites e outros projetos Railway não foram alterados.

## Runtime e pacote

`site/Dockerfile`: Node 24.15.0, build com lockfile/npm ci; runtime não-root com `dist`, `public`, `package.json` e dependências. Vinext está nas devDependencies e precisa delas para iniciar. A imagem não contém código-fonte da aplicação fora do bundle nem documentos internos.

`DEPLOY_TARGET=railway` seleciona somente Vinext + Tailwind. O caminho padrão Sites/Cloudflare permanece intacto em `vite.config.ts`. `vinext start --hostname 0.0.0.0` lê `PORT` diretamente.

`.railwayignore` e `.dockerignore` excluem ambientes locais, dependências locais, Git, diretórios de trabalho, relatórios, testes e logs. A raiz enviada é exclusivamente `site/`, com `--path-as-root`.

Variáveis públicas configuradas no serviço:

| Chave | Valor |
|---|---|
| DEPLOY_TARGET | railway |
| NODE_ENV | production |
| NEXT_TELEMETRY_DISABLED | 1 |
| PORT | 3000 |
| SITE_ORIGIN | https://heal-web-production-48b1.up.railway.app |
| VINEXT_TRUSTED_HOSTS | heal-web-production-48b1.up.railway.app |

Nenhuma credencial de aplicação foi necessária. A autenticação de deploy é a sessão local existente do CLI, não incluída no pacote.

## Configuração de disponibilidade

Healthcheck `/`, timeout 120 segundos, reinício `ON_FAILURE` com no máximo 3 tentativas e uma réplica. Configurado pela API oficial com `site/deployment/railway-service.graphql`.

O formato legado railway.json foi testado, mas o primeiro recibo mostrou healthcheck nulo. Foi removido e substituído pela configuração direta do serviço. Não existe dependência desse formato obsoleto. A adoção futura de IaC exige plano sem criação/exclusão de recursos existentes.

Para reaplicar apenas a configuração deste serviço, a partir de `site/`:

```powershell
railway api --file deployment/railway-service.graphql --raw-var serviceId=096c5f37-0ec4-46c8-b03f-8b12ef3cf39b --raw-var environmentId=b58e62e8-25ca-4f4e-8fad-f2a7d6971985
```

## Atualizações futuras

1. Preservar o diretório `site/` e as alterações de trabalho existentes.
2. Validar `npm test`, `npx tsc --noEmit`, `npm run lint` e build com `$env:DEPLOY_TARGET='railway'`.
3. Publicar com seletores explícitos:

```powershell
railway up C:\Users\PC\Desktop\Heal\site --path-as-root --service 096c5f37-0ec4-46c8-b03f-8b12ef3cf39b --project c6d07c45-c29c-455a-aaa1-b9725cb72923 --environment production --detach --json
```

4. Aguardar `SUCCESS`, conferir logs/healthcheck e verificar o HTTPS. Upload concluído não significa deploy saudável.
5. Executar `node scripts/retail-qa.mjs https://heal-web-production-48b1.up.railway.app <diretorio-de-evidencias>` e inspecionar capturas desktop/mobile.

## Recibo atual

- Deployment final: `deb8a30a-7770-4e14-81cd-974ec3fe3390`, `SUCCESS`.
- Imagem: `sha256:537fbc2d8e7db67f954c6d368eb4e07af7115afaf01a93051227c68e0e8c62ea`.
- Criado: `2026-09-27T01:01:52.731Z`.
- Healthcheck 1/1 aprovado: `2026-09-27T01:02:43.093884977Z`.
- HTTPS `/`: 200; 30/30 arquivos públicos: 200; metadados usam origem Railway, `noindex` preservado.
- Testes locais: 23 unitários/integração; TypeScript e lint; build Node; 8 E2E focados aprovados e 2 skips intencionais exclusivos de desktop.
- O primeiro typecheck/lint incluiu templates temporários de `work/`; o escopo foi corrigido para excluir artefatos, sem desabilitar regras da aplicação. Reexecução aprovada.
- QA remoto concluído: 46 checks de rota (23 rotas em 390/1440 px), 10 checks axe sem violações, 0 pageerrors/overflow; três URLs antigas mantêm pulse/ready/10 cores com canvas em movimento. Capturas Home desktop/mobile inspecionadas. Evidências em `docs/evidence/qa/railway-v1/browser-report.json` e PNGs correspondentes.
- Paths internos `/.env`, `/.git/config`, `/.openai/hosting.json`, `/package.json`: 404. `/robots.txt`: 200. Isto é uma verificação pontual, não uma auditoria de segurança completa.

## Limites

Publicação é a apresentação atual da loja, sem ativar preços/estoque reais, pagamento, checkout, analytics ou indexação. Animação, dez cores, imagens e layout da ponta preservados. Não foi realizado teste de carga ou teste em aparelho físico. Não houve compra de domínio, mudança de plano ou alteração nos outros serviços.

Fontes verificadas: [Railway Docker](https://docs.railway.com/builds/dockerfiles), [healthchecks](https://docs.railway.com/deployments/healthchecks), [configuração legada](https://docs.railway.com/config-as-code), [Vinext](https://github.com/cloudflare/vinext). Comportamento de PORT e proxy também validado no pacote local 1.0.0-beta.8.
