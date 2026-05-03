# GitHub Repo Operating Rules

This document defines how to operate the `partner-enablement-os` repository without creating duplicate assets, stale platform copy, or folder chaos dressed up as productivity.

## Repository role

`partner-enablement-os` is the source-of-truth repository for human-facing partner enablement assets.

It should hold:

- Partner launch kits
- Partner onboarding assets
- Training resources
- Referral partner one-pagers
- Outreach scripts
- Follow-up scripts
- Activity trackers
- Printable handouts
- Prompt libraries
- NotebookLM workflows
- Notion generation prompts
- Wix publishing copy and planning docs
- HubSpot/Gmail/Tally operating docs
- Reusable templates

It should not become the main home for executable workflow logic when that logic deserves its own runtime repo.

## Automation split

Use `partner-onboarding-automation` or a similar automation repo for:

- n8n workflows
- Make scenarios
- Zapier automations
- Webhook contracts
- Test payloads
- Integration schemas
- HubSpot API scripts
- Gmail parsing logic
- Tally webhook processors
- Deployment-specific secrets and runtime logic

The enablement repo may document those systems, but the executable machinery should live where operators can test, deploy, and version it cleanly.

## Source-of-truth rule

Create the canonical content here first.

Other platforms should reference, publish, transform, or distribute from this repo instead of rewriting the same asset in five places.

Preferred flow:

1. Draft source material from meeting notes, transcripts, intakes, or training material.
2. Convert source material into a markdown asset in this repo.
3. Use the repo file as the approved content source.
4. Publish or adapt into Notion, Wix, Google Drive, HubSpot, Gmail, NotebookLM, or Canva.
5. Record major changes in `changelog.md`.

## File handling rules

1. Search before creating.
2. Fetch before updating.
3. Preserve useful prior content.
4. Do not delete files unless explicitly approved.
5. Do not duplicate major assets under new names to avoid making a decision.
6. If an asset is replaced, move old material to `archive/` or add a clear redirect note.
7. If a file is platform-specific, name the platform clearly in the path or heading.
8. If a file is reusable, keep it out of partner-specific launch-kit folders unless it has been adapted for one partner.

## Branching and commit rules

For small documentation updates, direct commits to `main` are acceptable when the user explicitly asks for continuous repo operation and no destructive action is involved.

Use a branch and pull request when:

- The change affects many files.
- The change restructures paths.
- The change deletes or archives files.
- The change introduces generated data.
- The change may affect an external publishing workflow.
- The change should be reviewed before merging.

Commit messages should be short and operational:

- `Add GitHub operating rules`
- `Update Darwin launch kit context`
- `Create Notion partner enablement docs`
- `Add printable handout export workflow`

Avoid vague messages like:

- `updates`
- `fix stuff`
- `new files`
- `final version`

## Canonical terminology

Use `partner` as the umbrella term unless a narrower role is required.

Acceptable role-specific terms include:

- funding partner
- affiliate partner
- referral partner
- broker
- bank manager
- accountant
- attorney
- equipment dealer
- trucking business
- construction business
- internal operator
- channel partner

Do not overuse `affiliate` or `broker` when the asset is meant to support the broader ecosystem.

## Darwin Hanneman context

Darwin Hanneman is the current launch-kit prototype.

Darwin's strongest lanes:

- bank managers
- accountants
- attorneys
- equipment dealers
- trucking businesses
- construction-related businesses

Darwin should be positioned as a relationship-first commercial funding partner backed by Moonshine Capital. His launch strategy should focus on conversations with referral partners who already know business owners with funding problems.

Canonical Darwin launch-kit path:

```text
launch-kits/darwin-hanneman/
```

Canonical Darwin launch-plan path:

```text
launch-kits/darwin-hanneman/launch-plan/darwin-30-day-launch-plan.md
```

Use Darwin's launch kit as the prototype pattern for future partner launch kits.

## Compliance rules

Never guarantee:

- approval
- funding amounts
- income
- rates
- timelines
- universal same-day funding
- that everyone qualifies

Use safer language:

- explore funding options
- may be available
- based on business profile
- provider criteria apply
- approval, terms, amounts, and timing are not guaranteed
- one application helps identify possible funding paths

Referral partner assets should respect banks, accountants, and attorneys. Position Moonshine Capital as a responsible next step when those professionals cannot directly solve a client's funding problem.

## Platform publishing discipline

When adapting repo assets into another platform:

- Keep the markdown file as the source.
- Record platform-specific notes in `systems/` or the partner launch-kit folder.
- Do not let Wix, Notion, Google Drive, Gmail, or HubSpot become the only copy of core content.
- If platform copy diverges for a reason, document the reason.

## Review cadence

During active buildout:

- Review changes by block.
- Update `changelog.md` at the end of each block.
- Keep files practical and operator-ready.

After initial buildout:

- Review launch kits weekly during active partner onboarding.
- Review reusable templates monthly.
- Archive stale drafts quarterly.
