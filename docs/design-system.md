# World-class system. Local soul.

## Principles
Use editorial hierarchy, generous reading space and contextual routes into existing knowledge. Cultural references are prompts for futures thinking, not claims to historical reconstruction. Illustrations are original SVG line studies. The site is static HTML, with shared CSS and small progressive JavaScript enhancements.

## Tokens
| Role | Token / value |
|---|---|
| Dark canvas / primary ink | `--indus-night: #081722` |
| Links / selected topic | `--river-teal: #285e5a` |
| Section marks / focus on light | `--terracotta: #91482f` |
| Editorial canvas | `--warm-sand: #f3eee3` |
| Quiet canvas | `--paper: #fcfaf5` |
| Muted text | `--muted-text: #586360` |
| Rules | `--border-soft: #d5d0c5` |
| Headings | Georgia, Times New Roman, serif |
| Body / controls | Arial, Helvetica, sans-serif |

System font stacks avoid external requests, font swapping and fallback layout shifts. Body text is 17px desktop / 16px mobile with 1.7 line-height. Large display type is reserved for the homepage; article titles remain clear and readable. Text measure is 70ch or less. Small metadata is supplementary, never the sole source of an important fact.

## Layout and spacing
Spacing scale: 8, 16, 24, 32, 48, 80, 112px. Maximum homepage container: 1200px (1320px at very wide widths). Reading container: 1000px with paragraph measure capped. Section spacing: 112px desktop, 72px on small screens. Breakpoints: 600, 800, 1050, 1600px. Minimal 3px button radius; editorial records use rules rather than boxed cards.

## Components
- SiteHeader / SiteFooter: static templates in `components/`, synchronized with `python3 scripts/sync_shell.py`; six top-level destinations.
- Hero / FuturesSignal: identity, original river illustration, one small portrait; signal rotates every 12 seconds, pauses for focus/hover and page backgrounding, and defaults paused for reduced motion.
- SectionHeading: numbered editorial navigation through the homepage.
- FuturesCompass: five server-rendered topic panels, enhanced to roving-tabindex tabs. Vertical keys on desktop, horizontal keys on mobile, Home/End supported.
- StoryJourney: memory, imagination and action, each with distinct cultural context, visual state, question and worksheet action.
- FeaturedWriting: three original sources; native horizontal scroll/snap on mobile.
- ResearchSpotlight: protocol version and explicit work-in-progress status; no scores or rankings.
- EvidenceStrip: four source pathways without counters or promotional claims.
- CollaborationCTA: professional-profile contact and academy link.
- Document records: shared editorial layout for topic, research, writing and evidence pages.

## Accessibility and motion
Minimum 44px standalone controls, 48px primary actions, visible 3px focus outline, semantic landmarks, skip link, descriptive labels and initial HTML for all content. Tab semantics are activated only when JavaScript runs. Without JavaScript, navigation, all topic panels and story chapters remain visible. Reduced motion removes transitions and starts the rotating signal paused. There is no scroll hijacking, parallax, autoplay video, or content reveal dependency. Controls use a restrained 180ms background transition.

## Maintenance
Edit content in the appropriate HTML document, shared presentation in `css/site.css`, interactions in `js/site.js`, and navigation/footer templates in `components/`. Regenerate the shell after editing its templates. Run `python3 scripts/validate_site.py` before release. Existing metadata and schema are checked against `docs/seo-baseline.json`; baseline changes need a documented migration rationale. Static files remain deployable without a build step.
