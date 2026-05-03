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

Use Darwin's launch kit as the prototype pattern for future partner launch kits.

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

This repo should contain source content and human-facing enablement assets. Automation repos should reference this repo instead of duplicating source copy.
