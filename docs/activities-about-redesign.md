# Activities / About — premium institutional redesign

Prepared locally on 2026-10-15. Publication is withheld pending explicit visual
approval, as required by the user's mission.

## Base verification

Fetched GitHub before editing. `main` and `origin/main` matched `cdb1ede`, which
includes the validated homepage and the Architecture commits `6636016` / `68d70a5`.
No recent work was overwritten. The homepage, Architecture, their content/styles,
all other pages, shared SEO/locale helpers, sitemap and official assets are unchanged.

## Files

Modified:
- `components/pages/ActivitiesPage.js`: four detailed alternating white/navy
  activity sections, official entity logos, anchor navigation and destination links.
- `components/pages/AboutPage.js`: undated history, mission/vision, five values,
  four entity summaries, existing founder message/photo and collaboration section.
- `app/activities/page.js`: localised metadata reflecting four activity areas.
- `app/about/page.js`: localised metadata reflecting the new institutional copy.

Added:
- `components/ui/InstitutionalPage.js`: server-rendered frame, hero, heading,
  action and closing components, used only by the two redesigned pages. Reuses
  Header, Footer, SectionTitle, Next Image and the existing approved Home.module.css
  styles, including hover/focus and reduced-motion handling, without modifying them.
- `content/activities.js`: detailed FR/EN technology, four mobility subdomains,
  trade and five Nexus coordination functions, with clear limits and project status.
- `content/about.js`: complete FR/EN institutional copy and five values.
- `scripts/verify-institutional-pages.mjs`: FR/EN structure, wording, assets,
  history, values, legal cautions, anchor validity and route status checks.
- This review note.

## Editorial sources and boundaries

- Existing `content/site.js` validates the Togolese technology/mobility branches,
  Lithuanian company, international ambitions, founder identity/photo and message.
- The user supplies the clarification that GK Informatique is a historical
  activity which evolved into the current structure. No current separate company,
  dated timeline, turnover, achievements or unverified figures are invented.
- Existing approved `content/architecture.js` supplies the distinct companies,
  Nexus platform role and cautious status of its proposed Albanian company.
  Registration completion remains unconfirmed by a supporting document; no new
  registry fact, capital ownership or operational completion is asserted.
- Trade descriptions concern scope and request assessment, not completed deals.
- Mobility is advisory support; no visa, admission or employment result is guaranteed.
- No partner endorsement, partner logo, additional dependency or new URL is added.

## Verification

- `npm run build`: passed.
- `npm run lint`: passed.
- `node scripts/verify-institutional-pages.mjs`: passed in FR/EN, four domains,
  four mobility subdomains, five Nexus functions, four undated history stages,
  five values, four national entity summaries, official portrait, valid anchors
  and all destination links.
- `node scripts/verify-seo.mjs`: passed for all 24 FR/EN URLs, canonical/hreflang,
  sitemap, institutional JSON-LD, navigation and existing form integrity.
- `node scripts/verify-home.mjs` and `node scripts/verify-architecture.mjs`: passed.
- Browser checks: both pages at 1440px, 834px and 390px in FR and EN; one H1 per
  page, no horizontal overflow, no invalid anchors or failed images observed.
- Inspected desktop activity hero, mobility subdomains and founder portrait;
  mobile hero and text wrapping; tested activity anchor and language switching.
- Existing marine/gold contrast palette and keyboard focus styles are reused.
  CSS entry animations and card transitions respect `prefers-reduced-motion`.
- Non-blocking existing Node warning: `module.register()` deprecation during build.

## Local preview

While the preview server is running:
- `http://localhost:3100/activities?lang=fr`
- `http://localhost:3100/activities?lang=en`
- `http://localhost:3100/about?lang=fr`
- `http://localhost:3100/about?lang=en`
