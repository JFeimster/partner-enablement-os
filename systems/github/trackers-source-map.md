# Trackers Source Map

This document defines how reusable tracker templates and partner-specific tracker variants should work inside Partner Enablement OS.

## Rule

Canonical trackers live in:

```text
trackers/
```

Partner-specific tracker variants live in:

```text
launch-kits/{partner-name}/trackers/
```

Do not duplicate a tracker into a launch kit unless it is materially customized for that partner.

## Canonical Tracker Types

Recommended canonical tracker files:

```text
trackers/weekly-activity-tracker.md
trackers/daily-outreach-tracker.md
trackers/referral-partner-tracker.md
trackers/application-pipeline-tracker.md
```

## When to Reference Canonical Trackers

Reference canonical trackers when:

- the fields and goals apply to most partners
- the tracker is intended as a reusable framework
- the partner does not need unique lanes, metrics, or targets

## When to Generate a Partner Tracker Variant

Create a partner-specific tracker when:

- the partner has unique target audiences
- the partner has unique weekly goals
- the partner has custom activity targets
- the partner-specific version will be printed, exported, or used in coaching
- the tracker references a specific partner launch plan

## Darwin Prototype

Darwin's weekly tracker lives at:

```text
launch-kits/darwin-hanneman/trackers/darwin-weekly-activity-tracker.md
```

Use it as a prototype partner tracker variant. Extract reusable fields into canonical trackers when they apply across partners.

## Example Source Map

| Canonical Tracker | Partner Variant | Export Target |
|---|---|---|
| `trackers/weekly-activity-tracker.md` | `launch-kits/darwin-hanneman/trackers/darwin-weekly-activity-tracker.md` | Google Sheet, Notion, PDF |
| `trackers/referral-partner-tracker.md` | `launch-kits/darwin-hanneman/trackers/darwin-referral-partner-tracker.md` | Google Sheet, CRM import |
| `trackers/application-pipeline-tracker.md` | `launch-kits/darwin-hanneman/trackers/darwin-application-pipeline-tracker.md` | Notion, HubSpot support |

## Automation Note

Future onboarding automation should generate partner tracker variants from canonical trackers by injecting partner name, launch sprint, target audiences, activity goals, and application link.