# Redesign report — Dr. Salman Ahmed Khatani

Date: 26 September 2026. Branch: `redesign/indus-editorial`.

The redesign is implemented as a static, reviewable evolution of the existing website. Production has not been overwritten. The original homepage was fetched from production and matched the repository byte-for-byte before editing.

## 1. UX problems found

The homepage contained a hero plus 13 sections, repeated archive summaries, duplicate evidence cards, long community and worksheet content, and several overlapping CSS systems. Navigation and mobile behavior differed across page families. The original validator only checked homepage anchors and images. Some linked evidence had become unavailable.

## 2. Design strategy

A restrained palette of Indus night, parchment, patina teal and clay supports editorial serif headings and legible sans-serif text. Original river-line and story illustrations connect memory, place and possible futures without claiming historical authenticity. Seven homepage sections create a sequence of orientation, discovery, reflection, writing, research, evidence and collaboration. System fonts eliminate external font requests and font-swap shifts.

## 3. Information architecture

Primary navigation is Home, About, Research, Writing, Evidence and Work with me. Writing uses the existing `/publications-and-thought-leadership/` directory; Evidence uses `/professional-record/`; Work with me reaches the homepage collaboration section. Topic hubs remain linked through the compass, writing and contextual pathways. No competing topic hubs were created.

Distinctive biography, community projects and teaching/practice material moved from the homepage into About. Full cultural stories and the existing worksheet moved to `/futures-practice/`. Original homepage destination fragments remain as contextual gateways, with direct links to the deeper material. Existing links to the worksheet now point directly to its new page.

## 4. Pages modified

All 21 existing content pages receive the common header, footer, typography and responsive layout:

- `/`, `/about/`, `/research/`, `/media/`, `/insights/`
- `/publications-and-thought-leadership/`, `/professional-record/`
- `/futures-studies-and-foresight/`, `/futures-literacy/`, `/ai-literacy/`, `/responsible-ai/`, `/future-of-work/`, `/future-ready-education/`
- `/book/ai-designing-tomorrow/`, `/insights/pakistan-2035-futures-literacy/`
- `/research/futures-literacy-labs-climate-change/`, `/research/intuition-scenario-planning-iii/`, `/research/imagining-with-imaginables/`
- `/research/workplace-happiness-innovation-2025/`, `/research/genai-process-intelligence-2025/`, `/research/cyber-physical-immersive-learning-2025/`

One new route: `/futures-practice/`. The search-verification file remains intact.

## 5. Components created

Shared static SiteHeader and SiteFooter templates; Hero; FuturesSignal; SectionHeading; FuturesCompass; StoryJourney; FeaturedWriting; ResearchSpotlight; EvidenceStrip; CollaborationCTA; shared editorial document/record styles. `scripts/sync_shell.py` synchronizes the shell without requiring a production build system. CSS tokens and usage are documented in `design-system.md`.

## 6. Dynamic interactions

- Futures Signal: four questions, 12-second rotation, previous/next and play/pause controls; automatic pause on hover, focus and backgrounding. Manual changes are announced to assistive technology.
- Futures Compass: five topic panels, definition, significance, question, reading link, existing topic hub and subtle visual state; keyboard arrow keys and Home/End.
- Story Journey: three chapters, changing original illustrations, reflection questions and worksheet actions; keyboard tabs.
- Writing: native horizontal scrolling and snap on mobile.
- Supporting controls: mobile navigation and the preserved local worksheet download.

All idea content is present in the original HTML. Without JavaScript, navigation and every compass/story panel remain available. No content relies on scroll reveal, hover or animation.

## 7. Accessibility

Semantic landmarks, one preserved H1 per page, skip links, visible focus, accessible tab state and roving focus, 44px standalone controls, larger primary actions, explicit labels and a reduced-motion path. Automated WCAG 2/2.1/2.2 A/AA checks using axe-core found zero violations in the final tested pages. Manual browser checks covered keyboard tabs, menu Escape/focus restoration, signal pause/announcements and no-JavaScript access. Automated checks do not substitute for a complete screen-reader usability audit.

## 8. Mobile

All 22 pages passed horizontal-overflow checks at 320, 390, 768 and 1440px. Mobile uses a short menu, horizontal compass navigation, three story tabs, a native writing rail and a compact illustration/portrait. The final new framework/research content was rechecked at all four widths. Cross-engine smoke checks passed in Chrome, Firefox and WebKit.

## 9. Performance

Homepage HTML decreased from 65,138 bytes to approximately 26 KB. Shared CSS is approximately 19 KB and JavaScript approximately 6 KB, uncompressed. The existing 46 KB WebP portrait is retained; original SVG artwork is approximately 2 KB. There are no external font requests, animation libraries, trackers or video backgrounds. Images have intrinsic dimensions.

A local Chrome run recorded LCP around 0.45 seconds and CLS 0. This is local lab evidence, not a claim about production Core Web Vitals. INP and production LCP need field data or a representative deployed test. Switching between questions and panels was behavior-tested; real-world network/CPU conditions may differ.

## 10. SEO/GEO preservation

The audit baseline records all original titles, descriptions, robots metadata, canonicals, H1s, structured-data objects, links, paragraph text, asset hashes, sitemap, robots.txt and llms.txt. The upgraded dependency-free validator checks all content pages and internal targets.

All original titles, descriptions, H1s and canonical URLs are preserved. Every existing JSON-LD property and relationship survives, including the canonical Person ID and sameAs entries, ProfilePage, article authorship/dates, publication relationships and research entity. All original external source URLs remain linked somewhere on the site. Article/Hashnode/DEV relationships and original-versus-syndicated descriptions remain unchanged. No index/noindex changes were introduced. robots.txt is unchanged. llms.txt retains existing links and adds clearer development status and the sourced PAUSE-AI reference.

The full publication directory, CV-recorded bibliography, citations, evidence records and topic pages remain. Interior body paragraphs were preserved except the explicitly unverified learner-count statement described below. Homepage summaries were curated into pathways; distinctive long-form content was relocated rather than destroyed. Actual indexed status and search/AI ranking outcomes cannot be verified from repository files.

## 11. Structured-data changes

Existing JSON-LD is preserved as a property-level subset. The PAFRI CreativeWork receives `creativeWorkStatus: Study Protocol in Development` and a description explicitly stating instrument development and no national results. Its original external entity ID, URL, version and creator remain.

A sourced PAUSE-AI CreativeWork reference is added on Responsible AI, using the academy's existing `#article` identity, original canonical URL, published date and canonical personal-site creator reference, with a source citation. No competing local canonical framework page is created. A version number was not asserted because the retrieved source does not specify one.

## 12. URLs preserved

All 21 original sitemap URLs remain present and internally reachable. The sitemap adds only `/futures-practice/`. Existing homepage destination fragments continue to resolve; they now provide contextual links where content has moved. Form-control IDs move with the worksheet rather than being duplicated on the homepage.

## 13. Redirects

No HTTP redirects or slug renames were introduced. Relative internal links allow domain-root and subdirectory hosting while keeping existing absolute canonical URLs.

## 14. Intentional removals

Removed overlapping inline CSS, old font imports, decorative gradients, duplicate evidence cards and duplicate About evidence text. Repeated homepage archive/topic summaries are replaced by concise links to their complete records. The unsupported 25,000+ learner display and its repeated numeric claim are omitted; the retained explanation distinguishes course participation from society membership and states that independent institutional confirmation is needed. No source URLs were removed. No research pages, published records, citations or evidence records were deleted.

## 15. PAFRI status

The homepage and research record prominently say “Research Initiative — Work in Progress” and “Study Protocol in Development,” with instrument version 0.1. They distinguish People Readiness and Institutional Readiness and explicitly state that no national results have been collected. No ranking, heat map, score, participant count or completed national benchmark is displayed.

Both pre-existing external protocol URLs return 404. Their references are retained with a dated availability note and a link to the local research status. The full protocol has not been recreated or fabricated.

## 16. PAUSE-AI status

No PAUSE-AI record existed in the repository at audit time. The academy homepage linked to the official framework at `https://fikerfuturesacademy.lovable.app/pause-ai-responsible-ai-readiness-checklist`, retrieved successfully. It identifies Dr. Salman Khatani as author and gives 14 September 2026 as the publication date. The redesign adds the named framework, source citation and canonical relationship on Responsible AI and links to it from Research and llms.txt.

The requested Version 1.0 citation record was not found in the repository or on the retrieved canonical page. Its verification remains outstanding; the user was asked for the authoritative record. The source's authorship and canonical page remain intact.

## 17. Preview references

Supplied with delivery: desktop and mobile full-page screenshots, first-screen screenshots, Firefox/WebKit captures, research and evidence screenshots, source ZIP and this report. The review branch is intended for inspection before release: https://github.com/salmankhatani-web/salman-khatani-personal-website/pull/6.

## 18. Known limitations and release gates

- PAFRI's study page and plain-text protocol return 404; replacement locations need confirmation.
- The original Daily The Spokesman PDF returns 404 and is labelled accordingly.
- Automated HEAD checks found 39 HTTP 200 responses and one 202 across 56 pre-existing external links. Other sources returned anti-bot/access responses (403/999) or a transient 503; these are not automatically classified as dead. The PAUSE-AI canonical page was separately fetched successfully.
- PAUSE-AI Version 1.0 provenance is unconfirmed.
- Production runs on a Cloudflare Workers domain, while the repository contains a GitHub Pages deployment workflow. No Workers configuration was available to validate or deploy.
- The new GitHub validation workflow passed on the review commit. The pre-existing Cloudflare Workers build check failed on both the original main commit and the redesign commit; its exposed GitHub output does not identify the cause. Production was not successfully deployed by this task.
- No merge, Search Console inspection, real-device assistive-technology audit or field Core Web Vitals measurement was performed.

## 19. Recommended next phase

Confirm the PAFRI protocol locations and PAUSE-AI versioned citation, review the new visual direction, then validate the actual production hosting integration. Run a screen-reader/real-device review and production performance check, merge only after the source/deployment release gates are resolved, and monitor indexing and field performance after release. Future reports, talks and frameworks should enter their existing content directories and receive a selected homepage spotlight only when useful.
