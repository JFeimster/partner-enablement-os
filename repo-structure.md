# Partner Enablement OS Repo Structure

This document defines the recommended structure for `partner-enablement-os`.

## Root Files

```text
README.md
ecosystem-map.md
repo-structure.md
enablement-index.md
asset-production-workflow.md
prompt-chain.md
changelog.md
```

## Primary Folders

```text
launch-kits/
onboarding/
training/
referral-partner-assets/
scripts/
trackers/
systems/
prompts/
templates/
archive/
```

## Source-to-Variant Operating Model

Use this hierarchy to avoid duplicate assets:

```text
templates/ = blank reusable frameworks
referral-partner-assets/ = canonical audience-specific source assets
scripts/ = canonical reusable scripts
trackers/ = canonical reusable tracker templates
launch-kits/{partner-name}/ = partner-specific variants and launch-specific assets
exports/ = final PDFs, Google Docs, Canva files, and other generated outputs
```

Do not duplicate identical or near-identical files across canonical folders and launch kits. Create a partner-specific file only when it is materially customized with partner contact info, QR/application links, launch strategy, local market notes, partner-specific lanes, or custom messaging.

## Canonical Referral Partner Assets

Reusable audience-specific source assets should live under:

```text
referral-partner-assets/{audience}/
```

Recommended structure:

```text
referral-partner-assets/{audience}/
├── README.md
├── one-pager.md
├── printable-handout.md
├── outreach-script.md
├── follow-up-script.md
└── landing-page-copy.md
```

Canonical assets should be Moonshine-branded but partner-neutral, using placeholders such as:

- `[Partner Name]`
- `[Partner Application Link]`
- `[Partner Phone]`
- `[Partner Email]`
- `[QR Code]`

## Launch Kit Pattern

Partner-specific launch kits should live under:

```text
launch-kits/{partner-name}/
```

Recommended structure:

```text
launch-kits/{partner-name}/
├── README.md
├── partner-profile.md
├── launch-kit-index.md
├── meeting-notes/
├── launch-plan/
├── trackers/
├── one-pagers/
├── scripts/
├── handouts/
├── websites/
├── bookings-events/
├── notebooklm/
└── exports/
```

Partner launch-kit assets should be generated from templates and canonical source assets first, then customized only where needed.

## Scripts and Trackers

Canonical reusable scripts live in:

```text
scripts/
```

Partner-specific script variants live in:

```text
launch-kits/{partner-name}/scripts/
```

Canonical reusable trackers live in:

```text
trackers/
```

Partner-specific tracker variants live in:

```text
launch-kits/{partner-name}/trackers/
```

## Darwin Hanneman Context

Darwin Hanneman is the current launch-kit prototype.

Darwin's strongest lanes:

- bank managers
- accountants
- attorneys
- equipment dealers
- trucking businesses
- construction-related businesses

Darwin should be positioned as a relationship-first commercial capital partner backed by Moonshine Capital. His launch strategy should focus on conversations with referral partners who already know business owners with capital-access problems.

Canonical Darwin launch-kit path:

```text
launch-kits/darwin-hanneman/
```

Canonical Darwin launch-plan path:

```text
launch-kits/darwin-hanneman/launch-plan/darwin-30-day-launch-plan.md
```

Use Darwin's launch kit as the prototype partner-variant pattern for future partner launch kits.

## Systems Folder

```text
systems/
├── github/
├── notion/
├── google-drive/
├── wix/
├── hubspot/
├── gmail/
├── tally/
└── notebooklm/
```

Important GitHub source governance docs:

```text
systems/github/asset-source-map.md
systems/github/source-to-partner-variant-rules.md
systems/github/scripts-source-map.md
systems/github/trackers-source-map.md
```

## Prompt Libraries

```text
prompts/
├── chatgpt/
├── notebooklm/
├── flash-ui/
├── notion-ai/
└── email-sequences/
```

## Templates

```text
templates/one-pager-template.md
templates/weekly-tracker-template.md
templates/outreach-script-pack-template.md
templates/website-prompt-template.md
templates/handout-print-template.md
templates/booking-event-template.md
templates/notion-database-prompt-template.md
```

## Operating Principle

This repo should contain source content and human-facing enablement assets. Automation repos, Wix, Notion, HubSpot, Gmail, and Google Drive should reference, publish, transform, or distribute assets from this repo instead of rewriting the same content in multiple places.

Exports are not source-of-truth. Final PDFs, Google Docs, Canva versions, and Wix pages should be regenerated or updated from markdown source assets when copy changes.
