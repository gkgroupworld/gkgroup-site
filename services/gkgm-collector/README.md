# GKGM private collector — preparation only

No Netlify project, real credentials or production intake are created by this package.
See the [phase B report](../../docs/gkgm-phase-b-report.md) for the architecture,
test boundaries, costs, migration checklist and all manual activation requirements.

This package is for a **separate** Netlify project whose base directory will be
`services/gkgm-collector`, only after separate approval. Do not copy its function
configuration into the institutional site's `netlify.toml`.

From the repository root:

```text
npm ci --prefix services/gkgm-collector --ignore-scripts
npm test --prefix services/gkgm-collector
npm run check --prefix services/gkgm-collector
```

Node >= 22.12 required. Tests use synthetic data and the actual pinned SDK against
an injected atomic HTTP backend, with no real provider calls. Browser tests need
an existing Edge installation and a completed root `npm run build`:

```text
npm run test:browser --prefix services/gkgm-collector
```

Default state: all runtime gates closed. No environment files, public storage
endpoint, management API, or deployment command is provided. The old native GKGM
Forms definition is deliberately retained pending migration approval.
