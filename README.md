# Interactive Retail Storefront

A Brazilian Portuguese retail interface prototype with catalogue navigation, a local bag and progressive Three.js visuals.

## Features

- Catalogue, product, search/filter and bag flows demonstrate frontend integration.
- Progressive 3D scenes have interface fallbacks.
- Unit, integration, accessibility and browser test definitions are present.

## Stack

TypeScript · React · Next-compatible Vinext · Vite · Three.js · Anime.js · Vitest · Playwright

Fixture catalogue and client-side interaction state. No production database, checkout or order backend is bundled.

## Getting started

Node.js >=22.13. Work from site/. Inspect package.json, install with npm ci --ignore-scripts, then select the relevant unit or build gate. Browser tests need separately installed Playwright browsers.

## How it works

```text
Fixture catalogue → React routes/components → local bag and shipping simulation → non-payment handoff
```

## Current limitations

This is a labelled local prototype: no real payment, order, shipping quote or production deployment. Some binary media are omitted from the review copy. Unit tests and production compilation do not establish that every browser flow or media asset works.

## Validation

Node.js 24.15.0 on Windows: all 19 unit tests and the production build passed after a fresh dependency install with lifecycle scripts disabled. Run these commands from `site/`; browser and payment flows were not exercised.

```console
npm ci --ignore-scripts
npm run test:unit
npm run build
```

## License

Project-authored source code is licensed under the [MIT License](LICENSE). Third-party components and datasets retain their respective rights and licenses.
