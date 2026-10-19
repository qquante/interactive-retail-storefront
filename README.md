# Interactive Retail Storefront

A Brazilian Portuguese retail interface prototype with catalogue navigation, a local bag and progressive Three.js visuals.

![review](https://img.shields.io/badge/review-private-374151) ![primary](https://img.shields.io/badge/primary-TypeScript-2563EB) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Douglas%20Silva-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/douglas-silva-data-analyst/)

[Overview](#overview) · [Architecture](#architecture) · [Setup](#setup) · [Validation](#validation) · [Roadmap](#roadmap) · [Review notes](docs/REVIEW.md)

## Overview

- Catalogue, product, search/filter and bag flows demonstrate frontend integration.
- Progressive 3D scenes have interface fallbacks.
- Unit, integration, accessibility and browser test definitions are present.

**Technology:** TypeScript · React · Next-compatible Vinext · Vite · Three.js · Anime.js · Vitest · Playwright

**Persistence and data:** Fixture catalogue and client-side interaction state. No production database, checkout or order backend is bundled.

## Architecture

```text
Fixture catalogue → React routes/components → local bag and shipping simulation → non-payment handoff
```

| Location | Review focus |
| --- | --- |
| [`site/package.json`](site/package.json) | Source/configuration inspected for scope and structure |
| [`site/app`](site/app) | Source/configuration inspected for scope and structure |
| [`site/tests/unit/commerce.test.ts`](site/tests/unit/commerce.test.ts) | Source/configuration inspected for scope and structure |
| [`site/tests/e2e/storefront.spec.ts`](site/tests/e2e/storefront.spec.ts) | Source/configuration inspected for scope and structure |
| [`site/THIRD_PARTY_NOTICES.md`](site/THIRD_PARTY_NOTICES.md) | Source/configuration inspected for scope and structure |

Internal package and module names are retained where changing them would affect imports or compatibility. This descriptive repository name does not imply a completed package/API migration.

## Setup

Node.js >=22.13. Work from site/. Inspect package.json, install with npm ci --ignore-scripts, then select the relevant unit or build gate. Browser tests need separately installed Playwright browsers.

Start from an isolated environment. Use `.env.example` when present and inspect the configuration loader: an example file is not necessarily loaded automatically. Runtime databases, real account sessions and private credentials are not bundled. Live integration prerequisites are separate from local tests.

## Validation

Static parsing checked 0 Python files and 10 strict JSON files. Python syntax errors: 0; JSON errors: 0. No functional test/build result is claimed for this preparation.

Available test scripts are inventoried in [the review notes](docs/REVIEW.md). Choose offline checks before operating any integration.

These results apply to the selected checks on the preparation copy. They do not establish deployment readiness, full coverage, live provider availability or measured performance. CI definitions, when present under `docs/ci-templates/`, are inactive review templates; no remote CI badge is claimed.

## Limits and current status

This is a labelled local prototype: no real payment, order, shipping quote or production deployment. Some binary media are omitted from the review copy. Existing test definitions were not rerun here.

This private snapshot is for code and portfolio review. Generated runtime material and unreviewed binary assets may be excluded. [Review notes](docs/REVIEW.md) record preparation scope, findings and outstanding validation.

## Roadmap

- [ ] Review and restore redistributable media with attribution.
- [ ] Run unit, accessibility and browser suites from site/.
- [ ] Define backend/catalogue and payment scope only after prototype approval.

## History and attribution

11 existing commits were retained after path/content filtering. Original authors and author/committer dates were retained; commit hashes may change. Upstream commits are not presented as new work by the maintainer.

No open-source license is granted by this preparation. A license and attribution review is required before public redistribution.

## Maintainer and feedback

Douglas de Oliveira Silva · [GitHub](https://github.com/qquante) · [LinkedIn](https://www.linkedin.com/in/douglas-silva-data-analyst/)

For this private review, report reproducible issues with a minimal fixture and the exact check output. Keep account data, credentials and generated sensitive reports out of issues and commits. Existing contribution guidelines apply where present.

**Topics:** `typescript`, `react`, `threejs`, `ecommerce`, `frontend`, `vite`, `playwright`
