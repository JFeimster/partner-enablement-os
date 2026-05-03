# Source-to-Partner Variant Rules

This document defines when Partner Enablement OS should use canonical source assets and when it should generate partner-specific launch-kit variants.

## Definitions

## Canonical Source Content

Canonical source content is reusable, partner-neutral asset copy that can support multiple partners.

Canonical source folders include:

```text
referral-partner-assets/
scripts/
trackers/
templates/
```

Canonical assets should use placeholders such as:

- `[Partner Name]`
- `[Partner Application Link]`
- `[Partner Phone]`
- `[Partner Email]`
- `[QR Code]`

## Partner-Specific Variant

A partner-specific variant is a customized asset created for one partner launch kit.

Partner variants live under:

```text
launch-kits/{partner-name}/
```

A partner variant is justified when the copy includes:

- partner name
- partner contact info
- partner QR/application link
- local market notes
- partner-specific lanes
- partner-specific offer emphasis
- custom intro or outreach framing
- partner-specific launch sequence

## Reference vs Generate Rule

### Reference the canonical source when:

- the asset is generic and partner-neutral
- the asset does not need partner-specific positioning
- the only change would be a name, email, phone number, or link
- the partner README can simply point to the canonical asset

### Generate a partner variant when:

- the partner has specific target markets or lanes
- the copy should sound like the partner's field strategy
- the asset needs a partner-specific QR code or application link
- the partner has unique outreach scripts or talking points
- the file will be printed, sent, or published under the partner's name

## Partner Variant Header Convention

Use internal source notes when helpful:

```markdown
**Source Asset:** `referral-partner-assets/{audience}/{asset}.md`  
**Partner Variant:** `[Partner Name]`
```

For print-ready assets, omit source notes if they make the handout look cluttered.

## Automation Rule

Future partner onboarding automation should generate launch-kit variants from canonical assets by injecting:

- partner name
- contact details
- application link
- QR code
- strongest lanes
- preferred referral audiences
- local market notes
- launch stage

Automation should never rewrite the canonical source unless a reusable pattern has improved.

## Darwin Prototype Rule

Darwin Hanneman's launch kit is the prototype partner variant set. Use Darwin assets to improve canonical source assets, but do not make Darwin-specific language canonical unless it is broadly reusable.

## Cleanup Rule

Do not delete partner launch-kit files without explicit approval. When duplicate risk exists, document the relationship in README files or source maps first.