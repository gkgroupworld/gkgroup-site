# UAB GK EstTrade institutional page

Routes: `/gk-esttrade` (French, default) and `/gk-esttrade?lang=en` (English).
Uses existing header, footer, section titles, calls to action, official entity logo,
locale helpers and metadata helpers. Linked from the desktop Our entities menu,
mobile navigation, entity directory, home entity card and GK NEXUS diagram.

## Legal content review

The repository was reviewed for legal documents and EstTrade references on
2026-10-14. No registration certificate or registry extract was available.
The existing `content/site.js` entry included 3 October 2022 without a supporting
document. That date has been removed in both languages; no registration date or
`foundingDate` is published. A registry extract is needed before adding a date.
The company code 306154150, UAB form and Vilnius location are retained from the
existing institutional content, not independently certified by this change.

The page explicitly distinguishes the Lithuanian company from GK GLOBAL GROUP
SARL U in Togo. Structured data associates it with the GK GROUP brand without
asserting a parent/subsidiary relationship. Contact links route through the group
and do not present the Togolese company's contact details as EstTrade's own.

## Verification

Build: `npm run build`.
Production-server integration checks: `node scripts/verify-seo.mjs` with a server
on port 3100 (or pass its base URL). Checks cover 24 FR/EN URLs, locale switching,
canonical/hreflang, sitemap, institutional schema, EstTrade navigation and legal
wording, and existing partnership form integrity.

## Visual and activity update

The hero uses the same 1.4 / 0.6 column ratio, navy background, title scale and
spacing as Nexus, Technology and Mobility. The added white logo frame is removed;
the original logo asset is unchanged. The banner now uses GKGT's exact frame,
padding and image sizing. An invisible, accessibility-hidden copy of GKGT's text
layout reserves the reference height responsively, without fixed pixel heights or
clipping the visible EstTrade content. Banner buttons are retained below the hero.
Six bilingual activity cards describe scope, customers and value. Used/refurbished
equipment and logistics coordination are explicitly subject to assessment and
confirmation, without claims of inventory, refurbishment facilities or a logistics
network. Direct desktop/mobile navigation, canonical URLs and sitemap are retained.

Compared all four page headers at 1440px and 390px. Checked EstTrade activity cards
in two columns on desktop and one on mobile, with no horizontal overflow. Integration
checks also assert six activity cards, client/value descriptions and conditional scope.
