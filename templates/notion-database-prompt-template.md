# Notion Database Prompt Template

Use this template to generate Notion database specs for partner enablement, launch kits, asset tracking, CRM-adjacent workflows, or publishing dashboards.

## Asset Status

- Status: Template
- Owner: Moonshine Capital
- Audience: Internal Operator
- Source: Reusable template
- Last reviewed: 2026-05-03

## Recommended Path

```text
templates/notion-database-prompt-template.md
```

For system-specific versions, duplicate into:

```text
systems/notion/{database-name}-prompt.md
```

## Template

```markdown
# [Database Name] Notion Database Prompt

## Objective

Create a Notion database for [use case].

The database should help Moonshine Capital manage [assets / partners / launch kits / referrals / publishing / training / reviews].

## Database Purpose

This database should make it easy to:

- [Outcome 1]
- [Outcome 2]
- [Outcome 3]
- [Outcome 4]

## Recommended Database Name

```text
[Database Name]
```

## Required Properties

| Property | Type | Purpose | Example |
|---|---|---|---|
| Name | Title | Primary database title | Darwin Bank Manager One-Pager |
| Status | Select | Tracks production stage | Draft, Ready, Published, Archived |
| Asset Type | Select | Groups the record by asset category | One-Pager, Script, Tracker, Prompt |
| Partner | Relation | Links to partner profile database if available | Darwin Hanneman |
| Audience | Multi-select | Identifies target audience | Bank Managers, Accountants |
| Platform | Multi-select | Tracks publishing destinations | GitHub, Notion, Wix, Google Drive |
| GitHub Path | URL/Text | Stores source-of-truth path | launch-kits/... |
| Priority | Select | Helps sort build sequence | High, Medium, Low |
| Last Reviewed | Date | Tracks freshness | YYYY-MM-DD |
| Notes | Text | Internal operating notes | Notes here |

## Recommended Views

| View | Type | Filter / Grouping | Purpose |
|---|---|---|---|
| All Assets | Table | None | Master view |
| By Status | Board | Group by Status | Production pipeline |
| By Partner | Board | Group by Partner | Partner kit review |
| Ready To Publish | Table | Status is Ready | Publishing queue |
| Needs Review | Table | Last Reviewed is old or empty | Cleanup queue |

## Prompt For Notion AI

```text
Create a Notion database named “[Database Name]” for Moonshine Capital.

Purpose: [Purpose]

Add the following properties with the correct Notion property types:

[Paste property table here]

Create helpful views:
- All Assets
- By Status
- By Partner
- Ready To Publish
- Needs Review

Keep the database practical for partner enablement operations. Use clean property names and avoid duplicate fields.
```

## Operating Notes

- GitHub remains the source of truth for final markdown assets.
- Notion should track status, ownership, publishing, and review cadence.
- Do not rewrite source content in Notion if a GitHub file already exists.
```

## Related Files

- `systems/github/repo-operating-rules.md`
- `systems/github/markdown-asset-standards.md`
