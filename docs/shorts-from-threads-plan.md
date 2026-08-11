# Turning Threads posts into Shorts, on command

Goal: Louis says "make me 5 new shorts" (or a routine fires weekly) and gets
finished, scheduled Shorts without touching CapCut.

---

## 1. What already exists

| Piece | Where | State |
|---|---|---|
| 2,719 posted Threads posts with engagement scores | `youtube-shorts-automation/data/threads-state.json` | Done |
| Short renderer (text over b-roll, music bed) | `scripts/render-short.ts` | Done |
| Short queue format | `data/shorts-queue.json` | Done |
| Schedule format | `data/shorts-schedule.json` | Done |
| YouTube upload + scheduling | `youtube-shorts-automation/upload-shorts.mjs` | Done |
| B-roll clips | `tmp/shorts/bg/` | Done |

**The only missing piece is selection and copy-fitting** - deciding which posts
become Shorts and turning post text into screen lines.

---

## 2. The data, and what it actually supports

Each post carries `scores` with `24h`, `3d` and `7d` engagement numbers.
Across the last six months: 1,123 posts, 658 scored, median score 36.9, top
5,538. That spread is wide enough to rank on confidently.

Two caveats found while looking:

- **`format` and `topic` are only tagged on generated posts.** 495 of 658
  scored posts are `?` on both - and those unclassified ones average the
  *highest* score (153.6 vs 37.2). The organic posts are the winners, so any
  selection that filters on `topic` would throw away the best material.
- **There are no raw like counts stored**, only the computed score. The likes
  in `shorts-queue.json` came from somewhere else. If real likes matter for
  ranking, the Threads API token in `data/threads-tokens.json` can fetch them -
  but that token needs checking, since the YouTube one beside it was expired.

---

## 3. Selection rules

Pick from posts that are:

1. **Scored in the top decile** of the trailing 6 months (roughly score > 400).
2. **Not already made.** Match on normalised text, not exact string - the
   existing 35 were reworded during copy-fitting, which is why a naive match
   finds zero overlap even though at least six of the current top 25 are
   already Shorts.
3. **Short enough to fit.** The renderer walks type down from 72px and gives up
   under 34px. Posts over ~450 characters get cut or split rather than shrunk.
4. **Standalone.** Posts that reply to something, or depend on an image, do not
   read as a Short.

Deliberately *not* filtered on topic - see the caveat above.

---

## 4. Copy-fitting: post text to screen lines

This is the one step that needs judgement rather than rules, and it is where an
LLM call earns its place:

- Break into short lines that fall on natural beats. A line break in the
  renderer is honoured, not re-wrapped, so breaks are the pacing.
- Optional ALL-CAPS opening line as the hook.
- Blank line between thoughts - the renderer turns those into spacing.
- Strip hashtags, @handles, and "comment below" calls to action.
- Keep Louis's voice. Do not smooth it into ad copy.

Output is exactly the `shorts-queue.json` shape: `{ id, likes, posted, title,
lines, bg }`.

---

## 5. Assigning b-roll and slots

- **b-roll**: rotate through `tmp/shorts/bg/`, avoiding whatever the previous
  three Shorts used, so a scroll through the channel does not show the same
  clip twice in a row.
- **slots**: five a day at 02:00, 06:00, 12:00, 16:00, 20:00 US Eastern.
  Worth revisiting - 02:00 Eastern is a dead hour, and it is 1 in 5 of
  everything posted.

---

## 6. Running it

Two modes:

**On command** - "make me 5 new shorts from my best threads". Select, fit,
render, upload scheduled. Roughly 5 minutes end to end.

**Weekly routine** - fires once a week, takes the best unused posts from the
trailing period, produces the next 7 days at 5/day.

### The cloud constraint, stated plainly

A cloud routine **cannot** do the render or the upload as things stand:

- the b-roll and music live in `tmp/shorts/` on the desktop, not in the repo
- the Chrome text-render step needs a local Chrome binary
- the YouTube refresh token lives in `youtube-shorts-automation/data/`

To move it to the cloud, all three have to move: b-roll into the repo or object
storage, the text layer rendered without Chrome, and the token stored as a
cloud secret.

**A cheaper split**: let the cloud do the *thinking* (pick the posts, write the
lines, commit an updated `shorts-queue.json`) and let the desktop do the
*making* (render, upload) when it next runs. The judgement part is what needs
scheduling; the rendering is fast whenever it happens.

---

## 7. Top unused posts, last 6 months

Ranked by 7d score, excluding ones already made:

| Score | Posted | Opening |
|---|---|---|
| 5538 | 2026-06-08 | Christians will disappoint you. Pastors will disappoint you. |
| 5160 | 2026-06-13 | The Bible is clear, y'all just don't like what it says. |
| 3175 | 2026-06-12 | The Bible is the Truth… Prove me wrong |
| 1855 | 2026-07-12 | Some prayers aren't long. Sometimes they're just… "God, I need You." |
| 1429 | 2026-06-12 | One of my biggest issues with atheists on this platform… |
| 1350 | 2026-06-18 | Question for atheists: Are there any of you who enjoy respectful conversations |
| 1339 | 2026-06-27 | Just finished studying Genesis 1 again and noticed something I missed |
| 1305 | 2026-07-03 | Just got done studying Genesis 2, and I had to slow down |
| 1105 | 2026-06-06 | 7 ways God heals a broken heart |
| 1002 | 2026-07-06 | The Bible really is the manual for living |
| 811 | 2026-06-28 | The Bible isn't hard to understand… if you actually open it. |
| 764 | 2026-06-09 | WHAT SHOULD YOU DO AFTER YOU SIN? |
| 727 | 2026-06-27 | You can't be the salt of the earth if you sugar coat the gospel |
| 718 | 2026-06-15 | I'm not a Christian because I want to go to heaven. |
| 665 | 2026-07-01 | Whenever I stop reading my Bible, I slowly start depending on… |
| 540 | 2026-06-07 | Don't just read the Bible; apply it. |
| 530 | 2026-07-03 | How do y'all read the Bible without taking notes? |
| 471 | 2026-07-04 | As a Christian is there anything you don't agree with in the Bible? |
| 467 | 2026-07-11 | The healing is supposed to feel like it's killing you |

That is roughly four more weeks of Shorts at 5/day, already earned by the
audience once.

**Worth noting**: the two highest scorers are both confrontational, and three
of the top ten are atheist-engagement posts. They performed on Threads because
arguing drives replies. Whether that transfers to Shorts - where the comment
section is a different crowd - is untested. Worth trying two or three and
watching before committing a week to that angle.
