# Flash-UI Prompts

Reusable Flash-UI prompts for referral partner landing pages, vertical microsites, and niche funding pages live here.

These prompts are **canonical**, not partner-specific launch-kit files.

## Operating Rule

Use this folder as the source-of-truth for Flash-UI prompts:

```text
prompts/flash-ui/
```

Do not create duplicate prompt files under partner launch kits or deeper prompt subfolders unless a genuinely new prompt category is needed.

Most affiliate or partner customization should happen by changing:

- application link
- tracked CTA link
- booking link
- QR code
- partner contact block
- downloadable handout links

## Active Prompt Files

- `bank-manager-referral-site.md`
- `accountant-referral-site.md`
- `attorney-referral-site.md`
- `equipment-trucking-construction-site.md`
- `multi-referral-partner-site.md`
- `partner-personal-landing-page.md`

## Generated Site Output Rule

If Flash-UI generates static site files such as:

```text
index.html
styles.css
script.js
```

Do not dump generated runtime files into partner launch kits by default.

Recommended options:

1. Store production-ready generated site code in a separate deployment repo, such as `partner-referral-sites`.
2. Store occasional reference exports under `exports/flash-ui/{site-slug}/` if they are not intended for active deployment.
3. Keep the prompt here as the source-of-truth and regenerate site files when campaign copy changes.

## Purpose

Flash-UI prompts are used to quickly create visually strong static landing pages for hyper-focused referral and vertical use cases.

Each prompt should create a micro-site or landing page with one job:

> Convince the referral source or business owner to start the funding application or book a quick partner call.
