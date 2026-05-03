# Changelog

This changelog tracks meaningful changes to the Partner Enablement OS repository.

The goal is not to duplicate Git history. The goal is to make important operating, structural, compliance, publishing, and asset decisions easy to inspect without digging through commits.

## Change types

- Added: New files, folders, templates, workflows, or reusable assets.
- Changed: Meaningful updates to existing assets, operating rules, naming patterns, or workflows.
- Deprecated: Assets or paths that should no longer be used but are still preserved.
- Removed: Assets intentionally deleted after approval.
- Fixed: Corrections to broken links, inaccurate guidance, compliance issues, or formatting problems.
- Security: Changes related to access, permissions, credentials, privacy, or data handling.
- Notes: Strategic context, decision records, or operational reminders.

## Unreleased

Use this section for changes that have been drafted but not yet finalized into a dated section.

## 2026-05-03

### Added

- Added Block 1 GitHub operating documentation for repository rules, naming conventions, file versioning, and markdown asset standards.
- Established `systems/github/` as the home for GitHub-facing operating rules.
- Established Darwin Hanneman as the prototype partner launch kit pattern.
- Confirmed canonical Darwin launch-kit path: `launch-kits/darwin-hanneman/`.
- Confirmed canonical Darwin launch-plan path: `launch-kits/darwin-hanneman/launch-plan/darwin-30-day-launch-plan.md`.
- Added Block 8 prompt libraries for ChatGPT, NotebookLM, Flash-UI, and Notion AI.
- Added ChatGPT prompts for launch-kit generation, one-pagers, outreach scripts, and weekly reviews.
- Added NotebookLM prompts for printable handouts, one-pagers, outreach scripts, and weekly review summaries.
- Added Flash-UI prompts for bank manager, accountant, attorney, equipment/trucking/construction, multi-referral partner, and partner personal landing pages.
- Added Notion AI prompts for partner enablement databases, partner launch-kit pages, and weekly review dashboards.
- Added Block 9 reusable templates for one-pagers, weekly trackers, outreach script packs, website prompts, printable handouts, booking events, and Notion database prompts.
- Added launch-kit starter templates for partner profile, launch-kit index, and 30-day launch plan.

### Changed

- Clarified `partner-enablement-os` as the human-facing source-of-truth repository for partner enablement assets.
- Clarified that executable automation logic should live separately when appropriate, with `partner-onboarding-automation` reserved for future automation workflows, schemas, webhook contracts, and integration logic.
- Removed obsolete Darwin legacy-path migration language from active operating context.
- Updated `prompts/README.md` into a usable prompt library index and noted that Gmail/email-sequence prompts are intentionally deferred.
- Updated `templates/README.md` into a usable template index with recommended duplication paths.
- Updated `templates/launch-kit-template/README.md` with a stronger launch-kit operating pattern.

## Changelog rules

1. Use `YYYY-MM-DD` for dated sections.
2. Use path names in backticks.
3. Do not duplicate every commit.
4. Record changes that affect operators, partners, publishing, compliance, repo structure, or reusable asset patterns.
5. Do not create separate `final`, `v2`, `updated`, or `new` changelog files.
6. If a path is renamed, record the old path, the new path, and whether the old path should be preserved, redirected, or archived.
7. If compliance language changes, record the practical impact.

## Maintenance cadence

- Update during each major repo block.
- Review weekly while the repo is under active buildout.
- Review monthly once the system stabilizes.
