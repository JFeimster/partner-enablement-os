# Partner Enablement OS

Partner Enablement OS is a lightweight static asset delivery hub for the Moonshine Capital Partner ecosystem.

It helps Partners, operators, referral partners, funding partners, brokers, affiliate partners, and future channel partners find and use launch kits, referral assets, scripts, trackers, prompts, tools, training, Google Drive exports, GitHub source files, and compliance-safe funding language without digging through scattered folders.

Funding-related language must remain compliance-safe. Partners should use language such as:

- explore funding options
- may be available
- based on business profile
- provider criteria apply
- approval, terms, amounts, and timing are not guaranteed
- when traditional financing is delayed, unavailable, or not the right fit today
- one application can help identify possible funding paths

Do not guarantee approval, funding, rates, terms, amounts, timelines, qualification, revenue, income, or outcomes.

## Source-of-Truth Rule

GitHub is the canonical source of truth for this static site.

Tool roles:

- GitHub = source of truth for static site files, markdown assets, JSON data, and repo structure
- Vercel = deployment layer
- Google Drive = exported/shareable assets such as PDFs, handouts, videos, and partner-ready files
- Notion = dashboard and status tracking layer
- OpenAI Platform = future API, agent, secure key setup, and automation workflow layer

The static site is the polished delivery layer. It should not replace the repository, Drive exports, Notion status tracking, or future API workflows.

## Batch 9 Asset Registry Model

Batch 9 adds an asset registry so the site can move from brochure-like pages to usable asset delivery.

Primary file:

```text
data/asset-registry.json
```

The asset registry is the delivery layer for assets that can be opened, copied, downloaded, reviewed, or linked.

Each asset record includes:

- id
- title
- description
- assetType
- category
- audience
- partnerSpecific
- relatedPartner
- status
- usefulness
- source
- delivery
- actions
- tags
- complianceNotes
- lastVerified
- order

Source roles:

- GitHub markdown files are canonical source assets.
- Google Drive files are export/shareable assets.
- Assets marked needs-cleanup, review-gated, or permission-check-needed should be reviewed before public or field use.

## Resource Library as Delivery Hub

The Resource Library is now the primary asset launcher.

It should help users:

- open GitHub source files
- open raw markdown links
- copy repo paths
- open Google Drive PDFs, Docs, and videos
- identify review-gated assets
- understand which resources are ready-to-use versus needs-cleanup

The Resource Library should route Partners to usable resources quickly instead of acting like a static brochure.

## Darwin Hanneman Launch Kit

Darwin Hanneman is the prototype Partner launch kit.

Canonical nested page:

```text
/pages/launch-kits/darwin-hanneman.html
```

Legacy transition page:

```text
/pages/darwin-hanneman.html
```

The legacy page remains in place with a redirect-style transition so old links do not hard-break.

Darwin is Partner-specific and should not be treated as a top-level navigation concept. Darwin should be reached through:

- Launch Kits
- Resource Library
- Featured launch kit sections
- Asset registry cards

## Deployment Target

Production target:

```text
https://partner-enablement-os.vercel.app/
```

Repository target:

```text
JFeimster/partner-enablement-os
```

## Static Site Structure

```text
partner-enablement-os/
├── index.html
├── README.md
├── robots.txt
├── sitemap.xml
├── vercel.json
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── app.js
│       ├── resources.js
│       ├── partners.js
│       └── search.js
├── data/
│   ├── asset-registry.json
│   ├── site-config.json
│   ├── navigation.json
│   ├── resource-categories.json
│   ├── resources.json
│   ├── partner-types.json
│   ├── partner-launch-kits.json
│   ├── compliance-language.json
│   ├── script-categories.json
│   ├── tracker-templates.json
│   ├── prompt-categories.json
│   ├── tool-roadmap.json
│   └── training-paths.json
└── pages/
    ├── getting-started.html
    ├── partner-resource-library.html
    ├── launch-kits.html
    ├── referral-partner-assets.html
    ├── compliance.html
    ├── scripts.html
    ├── trackers.html
    ├── prompts.html
    ├── tools.html
    ├── training.html
    ├── about.html
    ├── darwin-hanneman.html
    └── launch-kits/
        └── darwin-hanneman.html
```

## Current Pages

- Home: `/index.html`
- Start Here: `/pages/getting-started.html`
- Partner Resource Library: `/pages/partner-resource-library.html`
- Launch Kits: `/pages/launch-kits.html`
- Darwin Hanneman Launch Kit: `/pages/launch-kits/darwin-hanneman.html`
- Darwin legacy transition page: `/pages/darwin-hanneman.html`
- Referral Partner Assets: `/pages/referral-partner-assets.html`
- Compliance: `/pages/compliance.html`
- Scripts: `/pages/scripts.html`
- Trackers: `/pages/trackers.html`
- Prompts: `/pages/prompts.html`
- Tools: `/pages/tools.html`
- Training: `/pages/training.html`
- About: `/pages/about.html`

## Navigation Model

Top-level navigation should stay lean:

- Home
- Start Here
- Resource Library
- Launch Kits
- Compliance

Secondary/footer navigation can include:

- Scripts
- Trackers
- Prompts
- Tools
- Training
- About

Partner-specific pages such as Darwin Hanneman should not be top-level navigation items.

## Vercel Deployment Notes

This is a plain static site.

Use these Vercel settings:

- Framework preset: Other
- Build command: leave blank
- Install command: leave blank
- Output directory: leave blank or use repository root
- Root directory: repository root
- Environment variables: none required for current static V1

No React, Next.js, npm, package.json, build tools, or framework routing are required.

## Local Preview

Because this is a static site, you can open `index.html` directly in a browser.

For local JSON fetch support, use any simple static server from the repository root.

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

## Batch Status

### Batch 1 — Foundation

Created:

- `vercel.json`
- `assets/css/styles.css`
- `assets/js/app.js`
- `data/site-config.json`
- `data/navigation.json`
- `index.html`

### Batch 2 — Core Data

Created:

- `data/resource-categories.json`
- `data/resources.json`
- `data/partner-types.json`
- `data/partner-launch-kits.json`
- `data/compliance-language.json`

### Batch 3 — Rendering Scripts

Created:

- `assets/js/resources.js`
- `assets/js/partners.js`
- `assets/js/search.js`

### Batch 4 — Core Static Pages

Created:

- `pages/getting-started.html`
- `pages/partner-resource-library.html`
- `pages/launch-kits.html`
- `pages/referral-partner-assets.html`
- `pages/compliance.html`

### Batch 5 — Utility Static Pages

Created:

- `pages/scripts.html`
- `pages/trackers.html`
- `pages/prompts.html`
- `pages/tools.html`
- `pages/training.html`
- `pages/about.html`

### Batch 6 — Prototype Partner Page

Created:

- `pages/darwin-hanneman.html`

### Batch 7 — Expanded Data Inventory

Created:

- `data/script-categories.json`
- `data/tracker-templates.json`
- `data/prompt-categories.json`
- `data/tool-roadmap.json`
- `data/training-paths.json`

### Batch 8 — Final V1 Polish

Created or updated:

- `data/navigation.json`
- `index.html`
- `README.md`
- `robots.txt`
- `sitemap.xml`

### Batch 9A — Data Foundation

Created or updated:

- `data/asset-registry.json`
- `data/resources.json`
- `data/partner-launch-kits.json`

### Batch 9B — Rendering and Page Utility

Created or updated:

- `assets/js/resources.js`
- `pages/partner-resource-library.html`
- `pages/trackers.html`
- `pages/scripts.html`
- `pages/launch-kits.html`

### Batch 9C — Darwin Relocation and Navigation Polish

Created or updated:

- `pages/launch-kits/darwin-hanneman.html`
- `pages/darwin-hanneman.html`
- `data/navigation.json`
- `sitemap.xml`
- `index.html`
- `README.md`

## Compliance Notes

Use safe funding language:

- explore funding options
- may be available
- based on business profile
- provider criteria apply
- approval, terms, amounts, and timing are not guaranteed
- one application can help identify possible funding paths

Avoid unsafe claims:

- guaranteed approval
- everyone qualifies
- credit does not matter
- same-day funding for everyone
- any amount available
- we approve what banks deny
- no documents needed
- instant funding guaranteed

Default disclaimer:

Funding options, approvals, terms, amounts, and timing are not guaranteed. Provider criteria apply and available options depend on the business profile.

## Post-Batch 9 Next Steps

Recommended next work:

1. Verify the production site after Vercel deploys the working branch.
2. Confirm the Resource Library renders asset actions from `data/asset-registry.json`.
3. Confirm tracker and script pages show real GitHub source assets.
4. Confirm Darwin legacy URL redirects or links correctly to the nested launch-kit page.
5. Confirm Google Drive asset permissions before marking any Drive asset public-ready.
6. Add markdown preview support as a future Batch 10 only if the open-source/raw markdown flow is not enough.
7. Add more partner launch kits by cloning the Darwin structure.
8. Add Notion status tracking for asset status, cleanup status, and partner launch progress.
9. Add Google Drive export links only after compliance and permission review.
10. Keep top-level navigation lean.

## Troubleshooting

If the homepage returns 404:

- Confirm `index.html` exists at the repository root.
- Confirm Vercel root directory is the repository root.
- Confirm there is no build command configured.
- Confirm Vercel is not expecting a framework output directory.

If JSON cards do not render:

- Serve the site from a local or hosted static server.
- Avoid opening pages directly from `file://` when testing JSON fetch behavior.
- Confirm JSON files are valid and available under `/data`.
- Confirm `data/asset-registry.json` is valid JSON.

If a page link fails:

- Confirm the HTML file exists under `/pages`.
- Confirm the URL matches the file path exactly.
- Confirm Vercel has redeployed after the file was committed.

If funding language feels too strong:

- Replace certainty with exploratory language.
- Add provider criteria language.
- Add the default disclaimer.
- Remove any approval, rate, term, amount, timeline, qualification, revenue, income, or outcome guarantee.
