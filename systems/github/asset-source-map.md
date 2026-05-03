# Asset Source Map

This document defines how canonical source assets, partner-specific variants, and export targets relate inside Partner Enablement OS.

## Core Rule

Do not duplicate the same asset in multiple locations unless the partner version is materially customized.

Use this hierarchy:

```text
templates/ = blank reusable frameworks
referral-partner-assets/ = canonical audience-specific source assets
scripts/ = canonical reusable scripts
trackers/ = canonical reusable tracker templates
launch-kits/{partner-name}/ = partner-specific variants and launch-specific assets
exports/ = final PDFs, Google Docs, Canva files, and other generated outputs
```

## Canonical Source vs Partner Variant

| Type | Purpose | Example |
|---|---|---|
| Template | Blank reusable framework | `templates/one-pager-template.md` |
| Canonical source asset | Reusable audience-specific source copy | `referral-partner-assets/bank-managers/one-pager.md` |
| Partner variant | Customized copy for a specific partner | `launch-kits/darwin-hanneman/one-pagers/bank-manager-referral-one-pager.md` |
| Export | Final generated/shareable file | PDF, Google Doc, Canva flyer, Wix resource |

## Source-to-Variant Examples

| Canonical Source | Partner Variant | Export / Publish Targets |
|---|---|---|
| `referral-partner-assets/bank-managers/one-pager.md` | `launch-kits/darwin-hanneman/one-pagers/bank-manager-referral-one-pager.md` | PDF, Google Doc, Canva, Wix Resource |
| `referral-partner-assets/bank-managers/printable-handout.md` | `launch-kits/darwin-hanneman/handouts/printable-bank-manager-handout.md` | PDF, Canva, email attachment |
| `referral-partner-assets/accountants/one-pager.md` | `launch-kits/darwin-hanneman/one-pagers/accountant-attorney-referral-one-pager.md` | PDF, Google Doc, Notion, Wix Resource |
| `referral-partner-assets/construction/one-pager.md` | `launch-kits/darwin-hanneman/one-pagers/construction-business-funding-one-pager.md` | PDF, Canva, Wix Resource |
| `referral-partner-assets/construction/printable-handout.md` | `launch-kits/darwin-hanneman/handouts/printable-construction-funding-handout.md` | PDF, Canva, email attachment |
| `scripts/universal-outreach/bank-manager.md` | `launch-kits/darwin-hanneman/scripts/bank-manager-outreach-scripts.md` | Gmail, HubSpot, partner playbook |
| `trackers/weekly-activity-tracker.md` | `launch-kits/darwin-hanneman/trackers/darwin-weekly-activity-tracker.md` | Google Sheet, Notion, printable PDF |

## When to Reference Canonical Assets

Reference the canonical source instead of creating a partner copy when:

- the copy is generic and partner-neutral
- only the partner name would change
- the asset will be used by multiple partners without strategic changes
- the launch kit can simply point to the canonical file

## When to Create a Partner Variant

Create a launch-kit variant when the file includes:

- partner name or contact details
- partner QR/application link
- local market notes
- partner-specific target lanes
- custom launch emphasis
- partner-specific outreach tone
- partner-specific audience prioritization

## Source Note Convention

Use this in markdown-source files when helpful:

```markdown
**Source Asset:** `referral-partner-assets/{audience}/{asset}.md`  
**Partner Variant:** `[Partner Name]`
```

Do not add source notes to print-ready files if it clutters the final handout. Use source notes in README, indexes, and internal markdown assets.

## Export Rule

Exports are not source-of-truth. PDFs, Canva designs, Google Docs, and Wix pages should be regenerated or updated from markdown source assets when copy changes.
