# Dr. Salman Ahmed Khatani — Personal website

Static editorial website for Dr. Salman Ahmed Khatani, connecting Futures Studies and Foresight, Futures Literacy, Responsible AI and education with Pakistan and the Global South.

Canonical site: https://salman-khatani-personal-website.salmankhatani.workers.dev/

## Preview and validate

No production dependencies or build step are required. With Python 3.9 or later:

```sh
python3 -m http.server 4173
python3 scripts/validate_site.py
node --check js/site.js
```

Open http://localhost:4173. Relative navigation supports both domain-root hosting and GitHub Pages project directories. Canonicals retain the existing production domain.

## Maintenance

- `css/site.css`: shared design tokens, layouts and responsive rules.
- `js/site.js`: mobile menu, Futures Signal, accessible tabs and worksheet download.
- `components/header.html`, `components/footer.html`: reusable static shell templates.
- `python3 scripts/sync_shell.py`: update shell fragments on every page.
- `docs/design-system.md`: visual and interaction guidelines.
- `docs/seo-baseline.json`: full pre-redesign metadata, schema, text and link inventory.
- `docs/redesign-report.md`: changes, verification results and release limitations.

Page content lives in each existing HTML file. The new `/futures-practice/` page holds the extended story experience and worksheet formerly on the homepage. All original routes remain.

## Validation and deployment

Pull requests run the all-page structural/SEO validator, JavaScript syntax check and shared-shell consistency check. Existing main-branch deployment to GitHub Pages is retained. The repository does not contain a Cloudflare Workers deployment configuration; the canonical production site is hosted on Workers. Confirm the production deployment integration before release. A push to the redesign branch does not invoke the main deployment workflow.

## Content integrity

PAFRI is a Research Initiative — Work in Progress; its v0.1 instrument is under development, with no national results. Its existing protocol links returned 404 during the audit and need confirmation. PAUSE-AI links to the official academy framework and its authorship; a Version 1.0 record was not present in this repository or specified on that source page. Do not invent version provenance, national scores, institutional participation or impact metrics.

Keep citations, author relationships, canonical URLs, source links and research records intact. New fact claims should use institutional, publisher or independent sources. Course participation is not society membership. Do not add unconsented photographs of children or private student reports.
