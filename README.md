# Dr. Salman Ahmed Khatani — Personal website

This is an **independent personal website**, separate from Fiker Futures Academy. Branding: Dr. Salman Ahmed Khatani, Futures Studies and Foresight. The video is excluded.

## Current state
- The site's HTML is committed.
- Twelve original, optimized image files from the prepared website package must be uploaded to `assets/` before the deployment check can pass.
- This is a **review draft**; the HTML intentionally contains `noindex,nofollow`. Do not remove it until the final content, citations, image-publication permissions and domain metadata have been checked.

## Finish uploading the visual assets
Download the previously prepared `salman_khatani_github_ready.zip` from the chat. Extract it, then open this repo on GitHub and choose **Add file → Upload files**. Drag the extracted `assets` directory (or its 12 image files into `assets/`) into the uploader, and commit to main. Do not upload the ZIP as a single file.

The 12 required files are: portrait.webp, lucky.webp, workshop.webp, speaking.webp, students.webp, community.webp, conference.webp, international.webp, book.webp, media.webp, quote.webp, brand.webp.

## Pages deployment
Go to **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow in `.github/workflows/deploy.yml` validates image assets, links and alt text, then publishes to GitHub Pages. As long as the image files are missing, validation intentionally fails rather than publishing a broken gallery.

Expected GitHub Pages URL after enabling Pages: https://salmankhatani-web.github.io/salman-khatani-personal-website/ (not live until deployment succeeds).

## SEO/GEO finalization
After gallery and editorial review, set page URL/canonical and Open Graph information, Person structured data, sitemap.xml and robots.txt. Remove noindex only after the site is ready for public indexing. Set up Search Console/Bing Webmaster Tools separately with the site owner.

No video files are included. Do not upload private ESR student reports, unconsented photos of children, or unverified media material.
