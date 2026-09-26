# Deployment verification — 26 September 2026

Live website: https://salman-khatani-personal-website.salmankhatani.workers.dev/

PR #6 was merged as 652f9369936d07d65ed4104bb72fc78a31de424f. Cloudflare production build cc674a24-9826-458d-9ec2-bd7965dd18d1 and GitHub Pages deployment both succeeded. The previous missing preview configuration is fixed; the preview build passed before merging.

All 35 public files were fetched from production with HTTP 200 and matched the release bytes, covering 22 pages, CSS, JavaScript, illustrations, portrait, sitemap, robots, verification file and research downloads. Original metadata, canonicals, schema relationships and all 21 original sitemap routes pass regression checks. The live topic compass and story chapter interactions were verified in Chrome. Earlier full responsive/keyboard/accessibility checks are in browser-validation.json.

The academy’s original PAFRI study page, plain-text protocol, PAUSE-AI article and Version 1.0 citation record now return HTTP 200 with the correct content. Both local text downloads exactly match the live academy source files. PAFRI remains explicitly instrument development with no national results. The main protocol button links to the original canonical academy page; a local source download remains available on Research.

A final content correction removes the now-outdated academy availability note. No academy edit or publication is claimed by this task: availability was independently rechecked after the personal-site deployment.

Remaining external limitation: Daily The Spokesman’s original 27 September 2025 PDF returns HTTP 404. Search still indexes that exact URL but no verified replacement was found. The evidence reference is retained with a dated availability note. This task has no publisher-hosting access to restore that file.

Python’s default HTTP client received 403 responses; verification with a browser user agent returned the actual public pages and byte-for-byte matching files. Browser navigation also confirmed the deployed interface. No field Core Web Vitals or Search Console indexing result is claimed.
