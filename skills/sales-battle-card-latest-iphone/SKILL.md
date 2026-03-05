---
name: sales-battle-card-latest-iphone
description: Create or update a sales battle card for the latest iPhone launch using concise competitor comparisons, ICP-specific positioning, objection handling, discovery questions, and talk tracks. Use when asked to prepare enablement material for Apple iPhone releases, refresh older iPhone battle cards, brief sales teams before launch windows, or tailor iPhone competitive messaging for segments like enterprise, SMB, retail, or carriers.
---

# Sales Battle Card for Latest iPhone

## Overview
Generate a practical, seller-ready iPhone battle card that helps account executives and SDRs position value quickly in live conversations. Prioritize clear differentiation, evidence-backed claims, and segment-specific talk tracks over long-form product summaries.

## Quick workflow
1. Confirm scope: region, target segment, sales motion, and launch window.
2. Gather source facts about the latest iPhone and top competitors.
3. Build the battle card with the template in `references/battle_card_template.md`.
4. Add objections, proof points, and risk/compliance guardrails.
5. Run the quality checklist in `references/quality_checklist.md` before sharing.

## Collect required inputs
Collect or infer these fields before drafting:
- Latest iPhone model name and release timeframe.
- Primary buyer persona (IT lead, procurement, consumer retail, carrier partner, etc.).
- Top competitor set (for example Samsung Galaxy S-series, Google Pixel).
- Prioritized buying criteria (security, camera, AI features, battery, TCO, ecosystem).
- Allowed evidence sources and claim constraints (public specs only, no unverified rumors).

If data is missing, state assumptions explicitly in an "Assumptions" section.

## Build the battle card
Use this order unless the user asks for a different format:
1. **One-line positioning statement** for the latest iPhone.
2. **Ideal customer profile and use cases**.
3. **Top differentiators** (3-5 bullets, mapped to business outcomes).
4. **Competitor comparison table** with honest strengths and weaknesses.
5. **Discovery questions** that uncover fit and urgency.
6. **Common objections and rebuttals** with short talk tracks.
7. **Proof points** (public benchmarks, feature facts, ecosystem advantages).
8. **Next-step CTA** for sales execution.

Keep language concise, concrete, and conversation-ready.

## Messaging rules
- Do not fabricate specs, pricing, availability, or benchmark results.
- Label uncertain or region-dependent details clearly.
- Avoid absolute claims ("best", "fastest") unless tied to cited evidence.
- Keep competitor framing factual and respectful.
- Translate technical features into buyer outcomes (risk reduction, productivity, cost control).

## Output variants
Support these formats on request:
- **Standard enablement**: full one-page battle card.
- **Call-prep brief**: compressed version for pre-call review.
- **Leadership summary**: executive-level narrative with strategic risks/opportunities.

When not specified, default to standard enablement format.

## References
- Use `references/battle_card_template.md` as the default structure.
- Use `references/quality_checklist.md` as the pre-delivery QA gate.
- Use `references/test_scenarios.md` for manual prompt-based acceptance testing.

## Validate the skill
Run the local structure test before packaging:
- `python3 scripts/test_skill.py`

If packaging tools are available, run:
- `python3 /opt/codex/skills/.system/skill-creator/scripts/package_skill.py skills/sales-battle-card-latest-iphone`
