#!/usr/bin/env python3
"""Lightweight tests for sales-battle-card-latest-iphone skill.

Checks:
1) Required files exist.
2) SKILL.md contains required sections.
3) Template contains expected headings/tables.
4) Checklist contains minimum QA gates.
"""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]

required_files = [
    ROOT / "SKILL.md",
    ROOT / "references" / "battle_card_template.md",
    ROOT / "references" / "quality_checklist.md",
]

required_skill_sections = [
    "## Overview",
    "## Quick workflow",
    "## Collect required inputs",
    "## Build the battle card",
    "## Messaging rules",
    "## Output variants",
]

required_template_sections = [
    "## 1) Positioning statement",
    "## 2) ICP and buying context",
    "## 3) Top value differentiators",
    "## 4) Competitive snapshot",
    "## 5) Discovery questions",
    "## 6) Objections and rebuttals",
    "## 7) Proof points",
    "## 8) Next-step CTA",
]

required_checklist_sections = [
    "## Accuracy and evidence",
    "## Messaging quality",
    "## Sales usability",
    "## Segment fit",
    "## Final polish",
]

def assert_true(condition: bool, message: str):
    if not condition:
        print(f"FAIL: {message}")
        sys.exit(1)

def main():
    for file in required_files:
        assert_true(file.exists(), f"Missing required file: {file}")

    skill = (ROOT / "SKILL.md").read_text(encoding="utf-8")
    template = (ROOT / "references" / "battle_card_template.md").read_text(encoding="utf-8")
    checklist = (ROOT / "references" / "quality_checklist.md").read_text(encoding="utf-8")

    for section in required_skill_sections:
        assert_true(section in skill, f"SKILL.md missing section: {section}")

    # Validate frontmatter has single-line name/description keys
    assert_true(re.search(r"^name:\s*.+$", skill, flags=re.M) is not None, "SKILL.md missing frontmatter name")
    assert_true(re.search(r"^description:\s*.+$", skill, flags=re.M) is not None, "SKILL.md missing frontmatter description")

    for section in required_template_sections:
        assert_true(section in template, f"Template missing section: {section}")

    assert_true(template.count("|") > 20, "Template should include comparison tables")
    assert_true(template.count("\n1.") >= 1, "Template should include numbered discovery questions")

    for section in required_checklist_sections:
        assert_true(section in checklist, f"Checklist missing section: {section}")

    assert_true("Include at least 5 discovery questions." in checklist, "Checklist must enforce discovery question minimum")
    assert_true("Include at least 4 objections" in checklist, "Checklist must enforce objections minimum")

    print("PASS: skill files and structure validated")

if __name__ == "__main__":
    main()
