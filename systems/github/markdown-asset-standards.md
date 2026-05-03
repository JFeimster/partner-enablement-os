# Markdown Asset Standards

This document defines the writing and formatting standards for markdown assets inside `partner-enablement-os`.

The repo should produce assets that can move cleanly into Notion, Wix, Google Drive, Gmail, HubSpot, NotebookLM, Canva, or a static site without turning into formatting soup.

## Core standard

Every markdown file should be:

- Practical
- Copy/paste-ready where relevant
- Easy to skim
- Easy to publish
- Easy to adapt
- Clear about audience and use case
- Written with compliant funding language
- Specific enough for an operator to use without asking what it means

## Recommended file structure

Most files should use this structure:

```markdown
# Asset Title

Brief plain-English explanation of what this asset is and how it should be used.

## Asset Status

- Status: Draft | Ready | Published | Archived
- Owner: Moonshine Capital
- Audience: Partner | Referral Partner | Internal Operator | Client-Facing
- Source: Meeting notes | Transcript | Prompt-generated | Field feedback | Template
- Last reviewed: YYYY-MM-DD

## Purpose

What this asset helps someone do.

## When To Use This

Specific use cases.

## How To Use This

Step-by-step operating guidance.

## Core Content

The actual reusable content.

## Publishing Notes

Where this can be published or adapted.

## Compliance Notes

Funding-related guardrails and language reminders.

## Related Files

- `path/to/related-file.md`
```

Not every file needs every section, but every file should have enough structure to be useful.

## Heading rules

Use one H1 per file.

Use H2 headings for main sections:

```markdown
## Purpose
## How To Use This
## Core Content
```

Use H3 headings for subsections:

```markdown
### Email 1
### Follow-Up Script
### Bank Manager Angle
```

Avoid deep nesting unless the asset genuinely needs it.

## Formatting rules

Use:

- Bullets for scan-friendly lists
- Numbered lists for steps or sequences
- Tables for field maps, CRM properties, database views, and asset indexes
- Blockquotes for notes, warnings, or archived notices
- Code fences for prompts, payloads, schemas, file trees, and copy/paste blocks

Avoid:

- Giant paragraphs
- Decorative formatting that breaks when moved to another platform
- Overusing bold text
- Emojis inside repo files unless the asset is intentionally marketing-facing
- Raw HTML unless needed for a platform-specific implementation note

## Copy/paste blocks

Use fenced blocks when the operator needs to copy the exact content.

Example:

```text
Subject: Quick question about clients who need working capital

Hey [First Name] — quick question.

When a business client needs funding but does not fit your current lane, do you have a reliable next-step referral option?
```

## Prompt blocks

Prompt files should include:

- Objective
- Inputs required
- Output format
- Guardrails
- The actual prompt
- Suggested destination path

Recommended prompt structure:

```markdown
# Generate One-Pager Prompt

## Objective

## Inputs Needed

## Output Requirements

## Guardrails

## Prompt

```text
Paste prompt here.
```

## Suggested GitHub Path

`path/to/output.md`
```

## Funding compliance language

Use cautious, responsible phrasing.

Preferred language:

- explore funding options
- may be available
- based on business profile
- provider criteria apply
- approval, terms, amounts, and timing are not guaranteed
- one application helps identify possible funding paths

Avoid language that promises approval, specific rates, specific funding amounts, universal eligibility, or guaranteed speed.

## Referral partner tone

Referral partner assets should respect the professional relationship of the referral source.

Position Moonshine Capital and its partners as:

- a responsible next step
- an additional resource
- a way to help clients explore options
- a relationship-first funding partner
- a support lane when the original professional cannot directly solve the funding problem

Do not position banks, accountants, or attorneys as enemies.

## Partner terminology

Use `partner` as the umbrella term.

Use narrower terms only when useful:

- funding partner
- referral partner
- affiliate partner
- broker
- internal operator
- bank manager
- accountant
- attorney
- equipment dealer
- trucking business
- construction business

## Darwin asset standard

Darwin Hanneman is the current launch-kit prototype.

Darwin-specific assets should reflect these lanes:

- bank managers
- accountants
- attorneys
- equipment dealers
- trucking businesses
- construction-related businesses

Darwin should be positioned as a relationship-first commercial funding partner backed by Moonshine Capital.

Canonical Darwin launch-kit path:

```text
launch-kits/darwin-hanneman/
```

Canonical Darwin launch-plan path:

```text
launch-kits/darwin-hanneman/launch-plan/darwin-30-day-launch-plan.md
```

## Tables

Use tables for structured operating docs.

Example:

| Field | Type | Purpose | Notes |
|---|---|---|---|
| Partner Name | Relation | Links asset to partner profile | Use relation where possible |
| Asset Type | Select | Identifies asset category | One-pager, script, tracker, prompt |
| Status | Select | Tracks production stage | Draft, Ready, Published |

## Links

Use relative repo links when linking between files:

```markdown
[Repo Operating Rules](repo-operating-rules.md)
```

Use full URLs only for external destinations.

## Review checklist

Before committing a markdown file, confirm:

1. The title is clear.
2. The file has a practical purpose.
3. The audience is obvious.
4. Copy/paste sections are easy to use.
5. Compliance language is safe.
6. Related paths are included where helpful.
7. The content can be moved into Notion, Wix, Gmail, HubSpot, or Google Drive without heavy cleanup.
