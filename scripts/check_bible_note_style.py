"""
Mechanical checker for docs/bible-study-note-style.md compliance.

Usage: python3 scripts/check_bible_note_style.py lib/<file>Source.ts [more files...]
Exits 1 if any problems are found, 0 if clean. Prints every problem found.

This catches the MECHANICAL rules only (line length, bullet count/length,
banned punctuation/words, repeated emoji, duplicate titles). It cannot judge
whether a note actually teaches something instead of reciting the verse --
that judgment call is still the writer's job per section 1 of the spec.
"""
import re
import sys

def extract_raw_notes(path):
    text = open(path, encoding="utf-8").read()
    m = re.search(r"RAW_NOTES = `(.*)`\.trim\(\);", text, re.S)
    if not m:
        raise SystemExit("Could not find RAW_NOTES block in " + path)
    return m.group(1)

EMOJI_RE = re.compile(
    "["
    "\U0001F000-\U0001FFFF"
    "\U00002190-\U000027BF"
    "\U00002B00-\U00002BFF"
    "\U00002300-\U000023FF"
    "️"
    "‍"
    "]+"
)

BANNED_FILLER = ["positioned", "utilize", "essentially", "furthermore", "moreover",
                  "indeed", "notably", "it is important to note", "we can see that",
                  "this passage demonstrates"]
BANNED_HEDGE = ["roughly", "somewhat", "fairly", "quite", "sort of"]

def parse_cards(raw):
    lines = raw.split("\n")
    cards = []
    cur_heading = None
    cur_lines = []
    for line in lines:
        if line.startswith("## "):
            if cur_heading is not None:
                cards.append((cur_heading, cur_lines))
            cur_heading = line[3:].strip()
            cur_lines = []
        elif line.startswith("# "):
            if cur_heading is not None:
                cards.append((cur_heading, cur_lines))
                cur_heading = None
                cur_lines = []
        else:
            if cur_heading is not None:
                cur_lines.append(line)
    if cur_heading is not None:
        cards.append((cur_heading, cur_lines))
    return cards

def check(path):
    raw = extract_raw_notes(path)
    problems = []

    if "-" in raw.replace("–", ""):
        for i, line in enumerate(raw.split("\n"), 1):
            core = line.strip()
            if core == "---":
                continue
            if re.match(r"^#\s*\S+\s+\d+:\d+", core):
                continue
            if "-" in core:
                problems.append(f"line {i}: hyphen found: {core!r}")

    if "—" in raw:
        problems.append("em dash found somewhere in file")

    if ";" in raw:
        for i, line in enumerate(raw.split("\n"), 1):
            if ";" in line:
                problems.append(f"line {i}: semicolon found: {line.strip()!r}")

    for m in re.finditer(r"\b\w+n't\b", raw, re.I):
        problems.append(f"contraction found: {m.group(0)!r}")

    lower = raw.lower()
    for w in BANNED_FILLER:
        if w in lower:
            problems.append(f"banned filler word found: {w!r}")
    for w in BANNED_HEDGE:
        if re.search(r"\b" + re.escape(w) + r"\b", lower):
            problems.append(f"banned hedge word found: {w!r}")

    cards = parse_cards(raw)
    total_cards = len(cards)

    titles = [h for h, _ in cards]
    for t in set(titles):
        if titles.count(t) > 1:
            problems.append(f"duplicate card title used {titles.count(t)}x: {t!r}")

    for heading, body_lines in cards:
        while body_lines and not body_lines[0].strip():
            body_lines.pop(0)
        while body_lines and not body_lines[-1].strip():
            body_lines.pop()
        content = [l for l in body_lines if l.strip()]
        bullets = [l.strip() for l in content if EMOJI_RE.match(l.strip())]
        prose = [l for l in content if not EMOJI_RE.match(l.strip())]

        if len(bullets) != 4:
            problems.append(f"card {heading!r}: expected 4 bullets, found {len(bullets)}")

        emojis = [EMOJI_RE.match(b).group(0) for b in bullets]
        if len(set(emojis)) != len(emojis):
            problems.append(f"card {heading!r}: repeated emoji across bullets: {emojis}")

        if bullets:
            last = bullets[-1]
            if not (last.startswith("\U0001F4D6") or last.startswith("➡️") or last.startswith("➡")):
                problems.append(f"card {heading!r}: last bullet should use 📖 or ➡️, got: {last!r}")

        for b in bullets:
            txt = EMOJI_RE.sub("", b, count=1).strip()
            wc = len(txt.split())
            if wc < 3 or wc > 8:
                problems.append(f"card {heading!r}: bullet word count {wc} out of 3-8: {b!r}")

        if len(prose) < 3 or len(prose) > 8:
            problems.append(f"card {heading!r}: body line count {len(prose)}, spec targets 4-8, floor 3")

        for p in prose:
            wc = len(p.split())
            if wc > 20:
                problems.append(f"card {heading!r}: body line over 20 words ({wc}): {p!r}")

    print(f"{path}: {total_cards} cards found")
    if problems:
        print(f"{len(problems)} PROBLEMS:")
        for p in problems[:200]:
            print(" -", p)
    else:
        print("No problems found.")
    return len(problems)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 check_bible_note_style.py lib/<file>Source.ts [more files...]")
        sys.exit(1)
    total = 0
    for p in sys.argv[1:]:
        total += check(p)
    sys.exit(1 if total else 0)
