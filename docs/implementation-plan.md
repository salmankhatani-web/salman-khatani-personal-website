# Redesign audit and implementation plan

Baseline: repository HEAD and production homepage match byte-for-byte. 21 content routes, one search verification file, one portrait, 354 anchor links. See seo-baseline.json for complete metadata, JSON-LD, headings, paragraphs, links, asset hashes, and crawler files.

## Findings
- Homepage has 13 sections plus hero, repeated evidence cards, repeated topic/archive summaries and three incompatible CSS layers.
- Navigation differs between page families; some pages have no skip link or mobile disclosure.
- Homepage depends on inline presentation rules and external font imports; body typography and cards vary by page family.
- The original validator only inspects homepage fragment links and images.
- PAFRI's external protocol, v0.1 and CreativeWork entity exist; no PAUSE-AI name, canonical page, citation or schema exists in this checkout. Request its authoritative record before adding a claim.
- Search Console/index status and off-site canonical configuration cannot be inferred from source. Preserve all known routes and existing relationships.

## Implementation
1. Freeze metadata, schema and crawler baseline; work only on redesign/indus-editorial.
2. Create shared CSS tokens and static header/footer generator. Keep deployment zero-build; generation is a maintenance tool.
3. Preserve deeper page bodies, metadata, canonical URLs, citations and schema. Consolidate duplicated About evidence block only.
4. Replace homepage with identity, compass, story journey, three writing selections, research spotlight, evidence pathways and collaboration.
5. Move distinctive community narratives to About, full story/worksheet to Futures Practice; retain old homepage fragments as contextual gateways. Retain source links.
6. Implement four lightweight interactions: mobile navigation, controllable signal, accessible compass, story journey; writing uses native horizontal scroll on small screens.
7. Run all-route validation, metadata/schema regression, link checks, browser keyboard/mobile/reduced-motion checks and visual inspection.
8. Document measured results and limitations. Deliver review branch and preview before any merge or production deployment.
