# Naming Conventions

This document defines naming rules for folders, files, headings, assets, and partner-specific launch kits in `partner-enablement-os`.

Clear naming keeps the repo usable, searchable, and easy to publish from.

## Core rules

1. Use lowercase kebab-case for file and folder names.
2. Use descriptive names that explain the asset's job.
3. Prefer durable names over temporary campaign names.
4. Use `partner` as the umbrella term unless a narrower role is needed.
5. Do not use `final`, `new`, `updated`, `latest`, or `copy` in file names.
6. Do not include dates in file names unless the asset is inherently date-based.
7. Do not include platform names unless the asset is platform-specific.
8. Do not include private notes in public-facing file names.

## Folder naming

Use broad, operational folder names:

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

Use role-specific folders where they make the content easier to find:

```text
referral-partner-assets/bank-managers/
referral-partner-assets/accountants/
referral-partner-assets/attorneys/
referral-partner-assets/equipment-dealers/
referral-partner-assets/trucking/
referral-partner-assets/construction/
```

## Partner launch-kit naming

Use the partner's name in lowercase kebab-case:

```text
launch-kits/darwin-hanneman/
launch-kits/first-last/
```

Inside a partner folder, use functional subfolders:

```text
launch-plan/
trackers/
one-pagers/
scripts/
handouts/
websites/
bookings-events/
notebooklm/
exports/
```

## Darwin prototype convention

Darwin Hanneman is the current prototype partner launch kit.

Canonical folder:

```text
launch-kits/darwin-hanneman/
```

Canonical launch plan:

```text
launch-kits/darwin-hanneman/launch-plan/darwin-30-day-launch-plan.md
```

Future partner launch kits should mirror Darwin's structure when practical.

## File naming patterns

### Operating docs

Use direct system names:

```text
repo-operating-rules.md
naming-conventions.md
file-versioning-rules.md
markdown-asset-standards.md
```

### One-pagers

Use the audience or niche first, then the asset type:

```text
bank-manager-referral-one-pager.md
accountant-attorney-referral-one-pager.md
trucking-equipment-finance-one-pager.md
construction-business-funding-one-pager.md
general-referral-one-pager.md
```

### Scripts

Use the audience or job first, then the script type:

```text
bank-manager-outreach-scripts.md
accountant-outreach-scripts.md
attorney-follow-up-scripts.md
application-nudge-script.md
referral-thank-you-script.md
```

### Trackers

Use the operating cadence or object being tracked:

```text
weekly-activity-tracker.md
daily-outreach-tracker.md
referral-partner-tracker.md
application-pipeline-tracker.md
```

### Prompts

Use an action verb:

```text
generate-launch-kit.md
generate-one-pager.md
generate-outreach-scripts.md
generate-weekly-review.md
```

### Platform docs

Use the platform folder plus the operating workflow:

```text
systems/notion/partner-enablement-database-prompt.md
systems/wix/website-publishing-workflow.md
systems/hubspot/referral-partner-pipeline.md
systems/tally/form-to-crm-workflow.md
```

## Heading naming

File titles should be human-readable Title Case:

```markdown
# Partner Enablement Database Prompt
# Bank Manager Referral One-Pager
# Weekly Activity Tracker
```

Use H2 headings for major sections and H3 headings for reusable subsections.

## Asset status labels

Use status labels inside the file body, not in the file name.

Recommended status block:

```markdown
## Asset Status

- Status: Draft | Ready | Published | Archived
- Owner: Moonshine Capital
- Audience: Partner | Referral Partner | Internal Operator
- Source: Meeting notes | Transcript | Prompt-generated | Field feedback
- Last reviewed: YYYY-MM-DD
```

## Archive naming

Archived files should keep their original name when possible and move into an archive folder with context.

Preferred pattern:

```text
archive/superseded/bank-manager-referral-one-pager.md
```

Avoid creating file names that hide the actual asset purpose behind version clutter.

## Compliance naming rule

Do not name files in ways that promise approval, specific funding amounts, specific rates, universal eligibility, or guaranteed timelines.

Use neutral naming that reflects discovery, readiness, options, referral conversations, or responsible next steps.

Safe patterns:

```text
funding-options-script.md
business-funding-readiness-handout.md
funding-pathways-one-pager.md
referral-partner-intro-sheet.md
```

## Quick checklist

Before creating a file, ask:

1. Does this path already exist?
2. Is this reusable or partner-specific?
3. Is the role name necessary?
4. Does the file name describe the job?
5. Does the name avoid hype or compliance risk?
6. Will this still make sense six months from now?
