# Architecture redesign — local visual review

Prepared on 2026-10-15. Public deployment is intentionally withheld until the
user's visual approval, as required by the supplied mission.

## Scope

- `/architecture` and its metadata, page-specific bilingual content and styles.
- Existing `InstitutionalDiagram`, used only by Architecture.
- Existing header, footer, logo assets, locale and SEO helpers are reused.
- No official logo, other page, sitemap URL or organisation schema is changed.

## Institutional status review

Sources reviewed: `content/site.js` (`ENTITIES`, `ENTITY_DETAILS`, `NEXUS_CONTENT`),
the Nexus and EstTrade pages, and existing structured data in `lib/seo.js`.
No registry document confirming Nexus registration is present. It remains a
project with registration in progress; coordination and development are future
roles subject to registration. Danube remains a formation project and its
activities are explicitly planned. No registration number or date is added.

The chart has four national peers under the GK GROUP brand. Only the Togolese
company contains the GKGT/GKGM branches. Dashed brand associations and solid
operational links have a bilingual legend, without asserting legal ownership.

## Validation

- `npm run build`: passed.
- `npm run lint`: passed.
- `node scripts/verify-architecture.mjs`: passed for FR/EN, national entities,
  branches, six profiles, statuses, anchors and all five existing destination routes.
- `node scripts/verify-seo.mjs`: passed for all 24 FR/EN URLs, canonical/hreflang,
  sitemap, institutional schema and existing form checks.
- Browser checks at 1440px, 834px and 390px in both languages: no horizontal
  overflow; four/two/one chart columns; six profiles; both branches nested only
  within the Togo entity; no failed logo images observed.
- CSS animations are scoped to this page, with staggered card entry, hover/focus
  relation highlighting and an explicit `prefers-reduced-motion` override.

Local review: `http://localhost:3100/architecture` and
`http://localhost:3100/architecture?lang=en`, while the preview server is running.
