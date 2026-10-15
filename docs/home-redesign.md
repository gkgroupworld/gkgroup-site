# Premium institutional home — local visual review

Prepared on 2026-10-15. No push or public deployment is authorised until the
user explicitly approves the visual result.

## Files and scope

- `components/pages/HomePage.js`: eight-section home, existing header/footer and
  SectionTitle reused; local link styling; all destination routes retained.
- `content/home.js`: dedicated FR/EN copy, four activity links, cautious legal
  and project wording, approved founder quotation and its English translation.
- `components/pages/Home.module.css`: home-only marine/gold decorative rings,
  card hover/focus feedback and reduced-motion-aware entry animations.
- `app/page.js`: home SEO descriptions clarified as brand/ecosystem; existing
  title, canonical/hreflang and shared metadata helper retained.
- `scripts/verify-home.mjs`: eight sections, four activities, four entities,
  five Nexus functions, legal/mobility wording and ten bilingual destinations.
- This review note.

No other page, shared component, official logo, photograph, dependency,
organisation schema, sitemap or existing URL is modified. Existing Architecture
entity identities and logo mappings are read without changing them.

## Institutional content

GK GROUP remains a brand without legal personality. Togo carries GKGT/GKGM;
EstTrade remains a distinct Lithuanian company; Danube remains in formation.
GK Nexus is a functional management/coordination platform, without asserting
ownership of other companies or that all functions are already operational.
The intended Albanian company remains a project without documentary confirmation
of completed registration, consistently with the approved Architecture page.
No partner endorsement, numerical achievement or guaranteed visa/admission/job
outcome is added.

The founder image is the existing `public/brand/founder/edem-yawo-awutey-founder.png`
already used by About. It is unchanged, displayed with `object-contain`, and
served lazily through Next Image. Above-the-fold brand imagery is preloaded.

## Validation

- `npm run build`: passed.
- `npm run lint`: passed.
- `node scripts/verify-home.mjs`: passed, FR/EN and ten destination routes.
- `node scripts/verify-seo.mjs`: passed, 24 FR/EN URLs, schema, sitemap,
  canonical/hreflang, navigation and existing partnership form integrity.
- `node scripts/verify-architecture.mjs`: passed, confirming the existing
  institutional chart and entity links remain intact.
- Browser checks at 1440px, 834px and 390px in FR and EN: no horizontal overflow;
  eight sections, four activity cards, four entity summaries, five Nexus
  functions, one H1 and seven H2 headings. Language switching and keyboard focus
  tested. Official founder portrait loading inspected after scrolling into view.
- Main text palette contrast checks: navy/gold 6.87:1, pale gold/navy 9.32:1,
  dark gold/white 5.31:1, muted text/white 4.76:1. These checks are not a full
  accessibility audit. The scoped CSS disables entry animations and card
  transitions for `prefers-reduced-motion`.

Local preview while the server runs:
`http://localhost:3100/?lang=fr` and `http://localhost:3100/?lang=en`.
