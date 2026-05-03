# Prompts

Prompt libraries for partner enablement workflows live here.

Use this section for reusable prompts that generate launch kits, handouts, one-pagers, scripts, trackers, landing-page copy, dashboard specs, and weekly summaries.

## Prompt Library Index

### ChatGPT

| Prompt | Path | Purpose |
|---|---|---|
| Generate Launch Kit | `chatgpt/generate-launch-kit.md` | Creates partner launch-kit files from source context |
| Generate One-Pager | `chatgpt/generate-one-pager.md` | Creates audience or niche one-pagers |
| Generate Outreach Scripts | `chatgpt/generate-outreach-scripts.md` | Creates partner outreach and follow-up scripts |
| Generate Weekly Review | `chatgpt/generate-weekly-review.md` | Creates weekly partner review summaries and next actions |

### NotebookLM

| Prompt | Path | Purpose |
|---|---|---|
| Generate Printable Handout | `notebooklm/generate-printable-handout.md` | Creates source-grounded printable handouts |
| Generate Referral One-Pager | `notebooklm/generate-referral-one-pager.md` | Creates source-grounded one-pagers |
| Generate Outreach Scripts | `notebooklm/generate-outreach-scripts.md` | Creates source-grounded outreach scripts |
| Generate Weekly Review Summary | `notebooklm/generate-weekly-review-summary.md` | Creates source-grounded weekly review summaries |

### Flash-UI

| Prompt | Path | Purpose |
|---|---|---|
| Bank Manager Referral Site | `flash-ui/bank-manager-referral-site.md` | Creates a bank-manager referral landing page |
| Accountant Referral Site | `flash-ui/accountant-referral-site.md` | Creates an accountant referral landing page |
| Attorney Referral Site | `flash-ui/attorney-referral-site.md` | Creates an attorney referral landing page |
| Equipment / Trucking / Construction Site | `flash-ui/equipment-trucking-construction-site.md` | Creates an industry-focused landing page |
| Multi Referral Partner Site | `flash-ui/multi-referral-partner-site.md` | Creates a multi-audience referral partner page |
| Partner Personal Landing Page | `flash-ui/partner-personal-landing-page.md` | Creates a personal partner landing page |

### Notion AI

| Prompt | Path | Purpose |
|---|---|---|
| Partner Enablement Database | `notion-ai/partner-enablement-database.md` | Creates a Notion partner asset database spec |
| Partner Launch Kit Page | `notion-ai/partner-launch-kit-page.md` | Creates a partner launch-kit dashboard page |
| Weekly Review Dashboard | `notion-ai/weekly-review-dashboard.md` | Creates a weekly partner execution dashboard |

## Gmail / Email Sequence Note

Email-sequence prompts are intentionally not built in this block because Gmail is not the current operating focus.

Recommended future files:

```text
prompts/email-sequences/new-partner-welcome.md
prompts/email-sequences/launch-week-reminders.md
prompts/email-sequences/inactive-partner-reactivation.md
```

## Operating Rules

- GitHub remains the prompt source of truth.
- Prompt outputs should become markdown files in the correct repo paths.
- NotebookLM prompts should stay source-grounded.
- Flash-UI prompts should produce page-ready layouts, not vague web design wishes.
- Notion AI prompts should create operating dashboards, not decorative databases.
- Do not use prompt outputs to bypass compliance review for funding language.

## Related Standards

- `systems/github/repo-operating-rules.md`
- `systems/github/markdown-asset-standards.md`
- `templates/notion-database-prompt-template.md`
