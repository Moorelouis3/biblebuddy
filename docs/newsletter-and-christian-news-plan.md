# Tuesday Newsletter, Friday Sequence, and Christian News — proposal

Planning document, 2026-10-12. Nothing in here is built, scheduled or sent.
Written against the code as it stands on `main` today.

---

## 1. The updated email plan, as I understand it

Two regular sends a week, from the same SES infrastructure that already runs
the welcome email and the imported Systeme campaigns.

### Tuesday — the Bible Buddy Newsletter (broadcast)

- One issue per week. Everyone on the list gets **this week's** issue.
- Nobody is ever back-filled through old issues. A person who joins on
  Thursday gets Tuesday's next issue, not issue #1.
- This replaces the stats-only email we had discussed. The stats idea is dead.
- Technically this is exactly what `email_campaigns` already does: one row per
  issue (`newsletter-2026-10-20`), `kind: 'marketing'`, armed once, sent in
  batches by `/api/cron/email-campaign-send`, never twice to the same address
  because `email_campaign_sends` claims each one first.

### Friday — the Bible study teaching sequence (per subscriber)

- Every subscriber starts at **lesson 1** and moves forward one lesson per
  Friday, in order, regardless of when they joined.
- So two people who joined six months apart are on different lessons on the
  same Friday. That is the point of it.
- Technically this is **not** a campaign. A campaign is "one body, one list,
  one send". This needs a lesson library plus a per-person position, which is
  closer to how `/api/cron/welcome-email` works (per signup, stamped, capped,
  resumable) than how the newsletter works.

### One thing I need you to confirm before anything is built

**The sequence and signup rules from the previous prompt are not written down
anywhere in this repo.** I looked: the only sequence tables that ever existed
(`email_sequence_steps`, `email_sequence_sends`) were created and dropped on
2026-10-10 in `supabase/migrations/20261010_email_events_and_scheduling.sql`,
described there as "a misread of what was wanted". The live 8-step drip in
`lib/emailFunnelTemplates.ts` is the day 1-8 signup funnel, which is a
different thing.

So I am carrying forward only what you said in this prompt: every subscriber
starts at lesson 1 and progresses in order. What I still need:

1. How many lessons, and the subject of each one (or at least the first block
   of them).
2. Do new signups start the sequence immediately, or after the day 1-8 welcome
   funnel finishes? Starting both at once means three emails in a new member's
   first week.
3. What happens at the end of the sequence — stop, loop, or keep writing new
   lessons so it never ends.
4. Whether someone who joined in March starts at lesson 1 too (I assume yes,
   from "every subscriber starts at lesson 1"), which means the whole existing
   list of ~5,200 begins together on the first Friday.

### The collision that has to be decided either way

`marketing_recipients()` enforces a weekly cap **across all marketing
campaigns**, not per campaign (`lib/email/engagementGroups.ts`, and the SQL in
`supabase/migrations/20261010_engagement_groups.sql`):

| Group | Rule | Cap per 7 days |
|---|---|---|
| Active | activity in last 30 days | every campaign |
| Quiet | last activity 31-90 days | 2 |
| Inactive | nothing for 90+ days | 1 |

Two sends a week means:

- **Active**: gets both. Fine.
- **Quiet**: gets both, and is then at its limit — no room for anything else
  that week (a launch, an announcement).
- **Inactive**: gets **one**. Whichever send runs first claims the slot. With
  Tuesday first, inactive subscribers would receive the newsletter and never
  the Friday lesson, so they would sit on lesson 1 forever.

Three ways out, pick one:

1. **Newsletter targets active + quiet only; the sequence targets all three.**
   My recommendation. The inactive group is a 90-day-cold audience with a 16%
   bounce rate on the backfilled addresses (see `memory/backfilled-addresses-bounce.md`);
   a teaching lesson is a better re-entry than a what's-new roundup.
2. Mark sequence lessons `kind: 'transactional'` so they bypass the cap. I do
   **not** recommend it — a weekly teaching email is marketing by any
   regulator's definition, cap or no cap.
3. Raise the inactive cap to 2. Defensible, but it raises complaint risk on
   exactly the segment where complaints hurt most.

---

## 2. Christian News inside the existing blog

### What already works and should not change

The blog is a flat set of `app/blog/<slug>/page.tsx` pages, each registered as
an entry in `BLOG_ARTICLES` in `lib/blogContent.ts`. Everything downstream is
derived from that registry:

- `app/blog/page.tsx` — featured + paginated listing
- `app/blog/category/[category]/page.tsx` — category pages
- `components/blog/BlogCategoryNav.tsx` — the Topics dropdown, with counts
- `app/sitemap.ts` — article and category URLs
- `components/blog/BlogPostShell.tsx` — banner, breadcrumb, table of contents,
  read time, promo slots, article schema, engagement bar, end card
- `/api/cron/blog-group-post` — shares an article into the study group once,
  if it carries a `groupPost` teaser

**So Christian News should be a new category in `BLOG_CATEGORIES`, not a new
section of the site.** One entry:

```ts
{
  slug: "christian-news",
  name: "Christian News",
  description: "Discoveries, research and claims in the news, explained honestly.",
}
```

That alone gets it a category page, a place in the Topics dropdown with a live
count, breadcrumbs, sitemap entries and the existing reading experience. No new
routing, no new layout, no second CMS.

### What genuinely needs building (five small things)

**a. Visible publication and update dates.** Right now `publishedAt` and
`updatedAt` exist in the registry but are used **only** in the article schema
(`dateModified`). Nothing renders on the page — the meta row in
`BlogPostShell` shows read time, section count and verse count. A news
article has to show its dates. Smallest honest change: add
`📅 Published <date>` and, when `updatedAt` is set, `🔄 Updated <date>` to
that same meta row. Worth doing for every post, not only news.

**b. Sitemap should prefer `updatedAt`.** `app/sitemap.ts:36-41` sets
`lastModified: new Date(article.publishedAt)`. An updated news article would
therefore never signal a re-crawl. One-line fix:
`new Date(article.updatedAt ?? article.publishedAt)`.

**c. A sources block.** There is no component for external citations — all
in-article linking goes through the per-post `ArticleLink` helper and points
at other Bible Buddy posts. News needs
`components/blog/ArticleSources.tsx`: a titled list of external links with
publisher name and the date each was checked, rendered after the conclusion
and before the end card.

**d. An "Established / Still uncertain" block.** Two labelled boxes,
`components/blog/ClaimStatus.tsx`, so the honesty is part of the template and
not left to whoever is writing that day. This is the single most important
piece of the whole content type: it is what stops a Christian news section
turning into the thing we are trying not to be.

**e. A format spec.** `docs/blog-post-format.md` has two structures (standard,
and the Character Study variant). News needs a third, written as
`docs/christian-news-format.md` and referenced from the format spec, because
the nine-section teaching shape does not fit an explainer. Proposed order:

1. Title (plain, no hype, no "SHOCKING")
2. Short summary — 3 to 5 lines, the whole story for someone who reads nothing else
3. What the site/object/claim actually is
4. What researchers are claiming, and who is claiming it (names, institutions)
5. What the evidence actually shows
6. ✅ What is established / ⚠️ What is still uncertain (the block from **d**)
7. What the Bible says, where relevant — and where it says nothing
8. Where this goes next (what would settle it, and when results are expected)
9. Sources (the block from **c**)
10. One next step inside Bible Buddy

Plus two hard rules for this category:

- **No old discovery is presented as breaking news.** The dateline and the
  summary must say when it happened. "The Shroud has been argued over since
  the 1350s" is the opening fact, not a buried one.
- **A disputed claim stays disputed in our wording.** "Researchers say" and
  "not yet confirmed" are the default verbs. If we cannot source a claim to a
  named person or institution, it does not go in.

### Workflow: keep the pipeline, change the gate

The blog writer agent (`docs/BLOG_WRITER_AGENT.md`) takes the first item from
`data/blog-topics-queue.json` and ships it without review. **Christian News
must not auto-ship.** A research-based article that gets a fact wrong about a
real institution is a different class of mistake from a thin teaching post.

Recommendation:

- A separate queue file, `data/christian-news-queue.json`, so news never
  collides with the 5-a-day chapter-post drip that owns the main queue.
- The news agent writes the page, registers it in `BLOG_ARTICLES` with
  `excludeFromGroupShare: true`, commits **untagged**, and appends a line to
  `MARCUS_HANDOFF.md` saying an article is waiting for your read. That flag
  already exists for exactly this case: the page is live and reviewable but
  stays out of the study group.
- You remove the flag (and add a `groupPost` teaser) when you are happy with
  it. That is the approval gate, and it costs one line of a diff.
- Updates, when research develops: bump `updatedAt`, add a dated
  `**Update, <date>:**` line inside the section it affects, and never silently
  rewrite what the article said before. The archive is the product.

Cadence: there is no obligation to publish news weekly. Publish when there is
something real. An archive of twelve well-researched explainers that stay
current beats fifty-two filler stories, and it is the thing a newsletter can
keep pointing back to.

---

## 3. The three initial articles

Research done 2026-10-12. Every factual line below is traceable to a source in
its own list. Where I could not verify something, it is in the "needs
verification" list rather than in the article.

### Article 1 — The Search for Noah's Ark

**Working title:** Have They Found Noah's Ark? What Is Actually Happening at Durupınar

**Summary:** A boat-shaped formation in eastern Turkey has been drilled and
scanned for the first time. The team says it has anomalies, carbon-rich soil
and cavities. Geologists have called the same formation a natural rock fold
since 1996. Lab results are expected over the winter.

**The story.** The Durupınar formation sits in Ağrı Province, eastern Turkey,
about 29 km south of Mount Ararat and roughly 3 km from the Iranian border. It
is a boat-shaped feature roughly 157-164 m long. It was noticed on a Turkish
aerial survey in 1959 and named after the officer who spotted it. Ron Wyatt
promoted it as the Ark from 1977, and David Fasold ran ground-penetrating
radar expeditions there in the 1980s.

The current project is Noah's Ark Scans, directed by Prof. Dr. Cenker Atila of
Sivas Cumhuriyet University, with Andrew Jones and Dr. Evrensel Barış Berkant
as vice-presidents, and researchers listed from Dokuz Eylül University, the
University of Utah, the Federal University of Santa Catarina, Trnava
University and Tel Aviv University. The 2026 field season ran about 90 days
from 29 June with roughly 20 people from five countries. They collected around
1,000 soil samples, ran radar, and drilled deep cores for the first time —
reported as 12 holes inside the formation and 4 outside, reaching about 20 m
in places without hitting bedrock, and striking cavities, one containing mud
and water. They report soil inside the formation holding roughly 40% more
carbon than soil outside it, and pottery fragments in the area.

**✅ Established:** the formation exists and is being studied by a permitted,
named, multi-institution team using real methods; the 2026 fieldwork and
drilling happened; a 1996 paper in the *Journal of Geoscience Education* by
geologist Lorence Collins and David Fasold — Fasold being the man who had
promoted the site — identified it as a doubly plunging syncline, a natural
fold shaped by erosion and mudflow, and found that the supposed iron brackets
and metal-braced walls were natural limonite and magnetite in steeply
inclined sedimentary layers; mainstream geology and archaeology treat the Ark
identification as pseudoarchaeology.

**⚠️ Still uncertain / not established:** no peer-reviewed publication on the
formation has come out of the current project; the "right angles 7 m down"
from the 2019 radar is the team's own interpretation of their data, not a
published result; higher soil carbon has ordinary explanations (buried
vegetation, mudflow organics, animal activity) and is not evidence of a
wooden vessel on its own; no wood, no dated organic material tied to a
structure; radiocarbon dating is said to be planned, not done; and Genesis 8:4
says the ark rested on "the mountains of Ararat" — a region, not the single
peak now called Ararat — so the site's distance from that peak is not by
itself an objection, but neither is proximity evidence.

**Bible connection:** Genesis 6-8, with Genesis 8:4 read carefully. The
honest closing note: the flood account does not stand or fall on this
formation, and Christians were not waiting on a drill core.

**Next step in Bible Buddy:** the Flood chapters in the reader —
[/blog/genesis-6-explained](../app/blog/genesis-6-explained), 7 and 8 all
exist already.

**Sources:**
- Noah's Ark Scans project page — https://noahsarkscans.com/
- Collins, L. & Fasold, D. (1996). "Bogus 'Noah's Ark' from Turkey exposed as a common geologic structure." *Journal of Geoscience Education* 44, 439-444.
- Wikipedia, Durupınar site (for the chronology and the geological consensus, with its own citations followed through) — https://en.wikipedia.org/wiki/Durup%C4%B1nar_site
- Türkiye Today, "Is Noah's Ark in Türkiye? Scientists begin major study at Durupınar" — https://www.turkiyetoday.com/culture/is-noahs-ark-in-turkiye-scientists-begin-major-study-at-durupinar-3224917
- Fox News, drilling reports (used only for the field-season details, attributed as reporting) — https://www.foxnews.com/travel/noahs-ark-mystery-enters-new-phase-researchers-probe-deep-beneath-site
- Newsweek, "What 1996 Study Said About 'Noah's Ark' Site" — https://www.newsweek.com/what-1996-study-said-about-noahs-ark-site-12507519

**Needs verification before publishing:**
- The exact 2026 numbers (90 days, ~1,000 samples, 12+4 cores, 20 m, 40% carbon) are currently sourced to news reporting and the project's own statements, not to a publication. Either get them from a project statement we can cite directly, or write them as "the team reports".
- Whether any peer-reviewed paper on the formation has appeared since this was written.
- Dr. Eşref Atabey's landslide assessment — I have it second-hand via Wikipedia and have not read the original.
- Whether the pottery fragments are claimed as associated with the formation or simply found in the area. These are very different claims.

---

### Article 2 — The Shroud of Turin

**Working title:** The Shroud of Turin: What the Science Actually Says

**Summary:** A linen cloth in Turin carries a faint image of a crucified man.
It has been photographed, chemically tested and radiocarbon dated. The 1988
carbon dating put the sampled thread in the Middle Ages. Newer methods have
challenged that and been challenged in turn. How the image formed is still
unexplained.

**The story.** The Shroud is a linen cloth about 4.4 m by 1.1 m, kept in the
Cathedral of Saint John the Baptist in Turin. It bears a faint front-and-back
image of a bearded man with wounds consistent with scourging and crucifixion.
Its documented history begins in Lirey, France in the 1350s; in 1390 Bishop
Pierre d'Arcis wrote to Antipope Clement VII calling it a painted forgery. It
reached Turin in 1578 and was damaged by fire in 1532. In 1898 Secondo Pia
photographed it and found that the negative read as a positive image, which is
where the modern interest starts.

In 1978 the STURP team examined it directly. In 1988 samples went to three
laboratories — Oxford, Zurich and Arizona — coordinated by the British Museum.
The result, published as Damon et al. in *Nature* 337 (1989) 611-615, dated the
sampled material to 1260-1390 AD with 95% confidence.

That result has been contested ever since, mainly on the grounds that the
sampled corner was not representative: a medieval repair, bacterial residue,
or carbon from the 1532 fire. Raymond Rogers argued for a sample-area anomaly
in *Thermochimica Acta* (2005). Textile conservator Mechthild Flury-Lemberg
rejected the invisible-reweave idea as technically impossible to do without
leaving traces, and Christopher Ramsey's 2008 tests found no significant
effect from carbon monoxide exposure. In 2022 Liberato De Caro and colleagues
at Italy's Institute of Crystallography published a Wide-Angle X-ray
Scattering study in *Heritage*, reporting that a thread from near the 1988
sampling area gave a profile compatible with linen around 2,000 years old. In
April 2026 Rachel Freer-Waters and A. J. Timothy Jull published an analysis of
the leftover 1988 sample fibres in *npj Heritage Science*, finding no signs of
repair or contamination in what was tested.

**✅ Established:** the cloth exists, is old, and has been studied by named
scientists with published methods; the image is not a conventional painting —
no brush strokes, and the coloration is confined to the topmost fibres; the
1988 radiocarbon measurement is still the only radiocarbon dating ever done,
and it placed the sampled material in the Middle Ages; the documented history
begins in 14th-century France; the Catholic Church has never defined the
Shroud as authentic — it permits veneration of it as an icon and leaves the
dating to science.

**⚠️ Still uncertain:** how the image formed — no one has reproduced it; whether
the 1988 sample corner represents the whole cloth; whether WAXS can date linen
reliably, since cellulose ageing depends on humidity, temperature, light and
storage history, and the 2022 measurement was not blind-sampled — the 2026
Arizona fibre study weakens the strong reweave argument without producing a
new date; whether the stains are the blood of a crucified man, which Borrini
and Garlaschelli's 2019 bloodstain-flow study in the *Journal of Forensic
Sciences* argued was inconsistent with a single body position; and everything
about the cloth before roughly 1350.

**Bible connection:** John 19:38-40 and John 20:5-7, where the linen clothes
and the napkin are described, and Matthew 27:59. Then the line that has to be
in this article: Christian faith rests on the resurrection testimony, not on a
relic — 1 Corinthians 15:3-8. The Shroud being medieval would cost Christianity
nothing, and the Shroud being first-century would not prove whose body it held.

**Next step in Bible Buddy:** the John 19-20 chapter notes, or the existing
[Did Jesus Really Exist?](../app/blog/did-jesus-really-exist) post.

**Sources:**
- Damon, P. E. et al. (1989). "Radiocarbon dating of the Shroud of Turin." *Nature* 337, 611-615.
- Rogers, R. N. (2005). *Thermochimica Acta* 425, 189-194.
- De Caro, L. et al. (2022). "X-ray Dating of a Turin Shroud's Linen Sample." *Heritage* 5(2), 47 — https://www.mdpi.com/2571-9408/5/2/47 (open-access PDF via CNR: https://www.dsctm.cnr.it/images/Highlights/Sindone/DeCaro_Heritage_2022.pdf)
- Freer-Waters, R. & Jull, A. J. T. (2026). "Analysis of textile fragments from the 1988 radiocarbon samples of the Turin Shroud." *npj Heritage Science* — https://www.nature.com/articles/s40494-026-02530-7
- Borrini, M. & Garlaschelli, L. (2019). *Journal of Forensic Sciences* 64(1), 137-143.
- Wikipedia, Radiocarbon dating of the Shroud of Turin (chronology and citation trail) — https://en.wikipedia.org/wiki/Radiocarbon_dating_of_the_Shroud_of_Turin

**Needs verification before publishing:**
- Read the De Caro 2022 paper and the Freer-Waters 2026 paper in full before
  summarising either. I have each one's abstract and reported conclusion, not
  the full text.
- The d'Arcis memorandum date (1390) and wording — check against a scholarly
  edition, not a secondary site.
- The Church's current formal position, from a Vatican source rather than a
  news summary.
- Whether anything newer than April 2026 has been published. This is the one
  article of the three most likely to be out of date by the time it ships.
- Avoid the framing that circulates in the popular coverage — "carbon dating
  has been proven wrong" — which neither the 2022 nor the 2026 paper supports.

---

### Article 3 — Laminin

**Working title:** Laminin: The Truth About the Cross-Shaped Protein

**Summary:** A protein in your body is often shown as a cross and shared as
proof that Christ holds all things together. The protein is real, the cross
shape is real for one form of it, and the story is told less carefully than it
should be. Here is what laminin actually does.

**The story.** Laminins are large glycoproteins in the basement membrane — the
thin sheet every layer of cells is anchored to. They are required for
basement membranes to form and function, in every animal. Each laminin is a
trimer: one α chain, one β chain and one γ chain, joined by disulfide bonds.
Electron microscopy in the early 1980s showed the first one studied —
laminin-111 — as a cross-shaped molecule: three short arms and one long arm.
The long arm is a triple α-helical coiled coil ending in a globe that binds to
cells; the tips of the short arms let laminins polymerise into a network.

The claim most Christians have met comes from Louie Giglio, who paired an
image of laminin with Colossians 1:17 — "and he is before all things, and by
him all things consist" — and made the point that the molecule holding our
tissue together is shaped like a cross.

**What is accurate, and what is not.** Mammals have at least 15 laminin
isoforms, built from 5 α, 4 β and 3 γ chains, and only 15 of the 60 possible
combinations have been confirmed in the lab. So "laminin is
cross-shaped" is true of laminin-111 and some others, and not true of the
family as a whole. The widely shared picture is usually a textbook schematic
drawn to show which domain is which, not a photograph; the real molecule is
flexible and moves, not a rigid Latin cross. And "it holds you together" is a
fair plain-English summary of what basement-membrane adhesion does, as long as
it is said that laminin works alongside collagen IV, nidogen and perlecan
rather than alone.

Worth telling readers: the sharpest critiques of the laminin argument have
come from Christians, including Answers in Genesis — a creationist
organisation — and physicist Jay Wile. This is not believers against
sceptics. It is Christians asking other Christians to make better arguments.

**✅ Established:** laminins exist, are essential, and are accurately described
in the scientific literature as having an extended multi-armed shape, with
laminin-111 cruciform in electron micrographs; the function — anchoring cells,
holding basement membranes together — is real and important.

**⚠️ Still uncertain / misstated in the popular version:** that all laminin is
cross-shaped (it is not); that the shared image is a photograph (usually it is
a diagram); that the shape is fixed (proteins flex and change conformation);
and the big one — that any of this is what Colossians 1:17 is about. Paul is
writing about Christ sustaining all creation. The verse does not need a
protein, and resting it on one makes the claim only as strong as the next
biology correction.

**Bible connection:** Colossians 1:15-20 in context, plus Psalm 139:14 and
Job 10:11. The landing point: creation really does testify — Romans 1:20 —
and that testimony does not need help from a diagram.

**Next step in Bible Buddy:** the Colossians 1 chapter notes, or the existing
[Christian and Science](../app/blog/christian-and-science) post.

**Sources:**
- Hohenester, E. (2019). "Structural biology of laminins." *Essays in Biochemistry* — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6744579/
- Answers in Genesis, "Laminin & The Cross" — https://answersingenesis.org/biology/microbiology/laminin-and-the-cross/
- Jay Wile, "Laminin Shaminin" — https://blog.drwile.com/laminin-shaminin/
- Eternal Perspective Ministries on Giglio and Colossians 1:17 — https://www.epm.org/resources/2022/May/23/louie-giglio-misinterpret-laminin/

**Needs verification before publishing:**
- The original electron-microscopy citation (Engel et al., *Journal of
  Molecular Biology*, 1981) — I have it referenced in the review literature,
  not read.
- The exact isoform count. "At least 15" is what the Hohenester review says;
  other sources say 16. Use the review's wording and say "at least".
- Which specific isoforms are Y-shaped or rod-shaped, named from the review
  rather than from memory.
- Giglio's exact words, from a transcript or recording, before quoting him.
  He should be represented fairly — the article is correcting a claim, not
  going after a pastor.

---

## 4. The Tuesday newsletter layout

One reusable shell, three or four sections per issue, chosen from a fixed menu.
Never every section in an issue.

```
┌─────────────────────────────────────────┐
│  Bible Buddy                 Issue #12  │   masthead + issue number + date
│  Tuesday, 20 October 2026               │
├─────────────────────────────────────────┤
│  One short paragraph from Louis.         │   THE OPENER (always)
│  Two or three lines. What is in this     │   40-70 words, no greeting block
│  issue, in his voice.                    │
├─────────────────────────────────────────┤
│  📖 THIS WEEK'S STUDY                    │   SECTION 1 (always a teaching slot)
│  Heading                                 │
│  3-4 lines of intro                      │
│  → Read it                               │   exactly one link
├─────────────────────────────────────────┤
│  🔍 CHRISTIAN NEWS                       │   SECTION 2
│  Heading                                 │
│  3-4 lines of intro                      │
│  → Read the full explainer               │
├─────────────────────────────────────────┤
│  (optional) Supported by                 │   SPONSOR SLOT — reserved, unused
│  one labelled line, one link             │   see section 6
├─────────────────────────────────────────┤
│  ⭐ FROM THE APP                          │   SECTION 3
│  Heading                                 │
│  3-4 lines of intro                      │
│  → Open it                               │
├─────────────────────────────────────────┤
│  (optional) 💬 ONE LINE FROM LOUIS        │   SECTION 4, short
│  An announcement, or a question to reply  │
│  to. One or two lines, one link or none.  │
├─────────────────────────────────────────┤
│  Everything in Bible Buddy is free.      │   footer, as today
│  View in browser · Unsubscribe           │
└─────────────────────────────────────────┘
```

**The section menu.** Each issue picks three or four. Every section is the same
shape — heading, 3-4 line intro in Louis's voice, one link with an explicit
verb — so the template never changes and the content does.

| Slot | Section type | Link verb |
|---|---|---|
| Teaching (always 1) | Bible story or character study · new devotional · a study worth restarting | Read / Study |
| News | Christian News explainer · a discovery in the news | Read the full explainer |
| Useful | A blog article that answers a real question | Read it |
| App | New feature, update, new chapter notes live | Open it |
| Community | A question from the study group · what the groups are discussing | Join the conversation |
| Watch | A documentary, film or book recommendation | Watch / Find it |
| Books | New book or book announcement | See it |
| Louis | An announcement, in one or two lines | (often no link) |

**Rules that keep it honest and keep it reusable:**

- One link per section. A section with two links has two sections' worth of
  intent and loses both.
- Every link carries `utm_source=newsletter&utm_medium=email&utm_campaign=<issue-id>&utm_content=<slot>`.
  The `utm_content` is what makes per-slot performance measurable, which is
  what section 6 depends on.
- **Never write "most popular", "most read" or "trending" unless a number in
  `blog_post_views` says so.** If we want that language later, it has to be
  generated from the data, not typed.
- Timely and evergreen mix freely. An article from August is fine in the
  Useful slot — it just does not get a "new" label. Only genuinely new things
  get called new.
- Where we have our own article on a subject, the link goes there, not to an
  external site. External sources belong inside the article, in its sources
  block.
- The whole issue should be readable in under two minutes.

**Rendering.** `lib/blogBroadcast.ts` already renders a card-based,
inline-styled, single-column email from `BLOG_ARTICLES`, with `{{UNSUBSCRIBE}}`
swapped per recipient at send time. The newsletter renderer should be a
sibling of it — `lib/email/renderNewsletter.ts` — taking a structured issue
(JSON: opener, then an array of sections) rather than raw HTML, so the same
issue object can render the email, the preview and a web archive page.

---

## 5. The dashboard: what exists, and what is missing

### Already built and reusable as-is

| Capability | Where |
|---|---|
| Campaign rows with draft / sending / paused / done, `scheduled_for`, warm-up rate, batch size, `kind`, `target_groups` | `supabase/migrations/20261009_email_campaigns.sql`, `20261010_*` |
| Send-once-per-address, resumable across runs | `email_campaign_sends` + `lib/email/sendCampaign.ts` |
| Suppression list checked twice per send | `email_suppressions` + `lib/email/sesSender.ts` |
| Engagement groups and weekly caps, decided in SQL and read by both the dashboard and the sender | `marketing_recipients()`, `email_engagement` |
| SES open/click/bounce/complaint events, including the clicked URL | `email_events` (`link_url`) |
| Per-campaign sent / opens / clicks / rates | `ses_campaign_stats` view |
| Campaign list, preview modal, **test send to any address**, edit subject, move the date, set target groups, pause, arm | `/admin/campaigns` + `app/api/admin/campaigns/route.ts` |
| Rate-limited batch sending every 10 minutes | `/api/cron/email-campaign-send` |
| Draft-an-email-from-the-blog, edit it, test it, send it | `/admin/email-broadcasts`, `lib/blogBroadcast.ts` |
| One-click unsubscribe, RFC 8058 headers, visible footer link | `sesSender.ts`, `unsubscribeLink.ts` |

That covers **previewing, test sending, scheduling, click tracking and
per-campaign metrics** already. The newsletter does not need a new email
stack.

### What has to be added

1. **A way to create a campaign at all.** `POST /api/admin/campaigns`
   supports `update`, `targets`, `pause`/`draft`, `schedule`, `test` — there is
   no `create`. Every campaign in the system arrived either through
   `/api/admin/import-newsletter` (a one-off Systeme intake route whose own
   comment says to delete it) or by hand in SQL. Add `op: "create"`.

2. **An issue builder, storing structure not HTML.** New table
   `newsletter_issues`: issue number, date, status, `opener` text, and a
   `sections` JSONB array (`{ slot, heading, intro, linkUrl, linkLabel }`).
   The HTML is rendered from it, never typed. That is what makes an issue
   editable after the fact, previewable, and reusable as a web archive page.
   The `email_campaigns` row is generated from the issue at approval time, so
   sending, capping, dedupe and stats all stay exactly as they are today.

3. **Pickers, so links are never typed by hand.** `BLOG_ARTICLES` is already
   importable for articles and news; `lib/bibleStudiesCatalog.ts` for study
   series; the devotionals tables for devotionals. A picker that writes the
   correct URL plus the UTM string removes the most likely source of a broken
   link in a send to 5,000 people.

4. **An approve step.** Today `op: "schedule"` goes straight from draft to
   sending. For a weekly publication, add `approved_at` / `approved_by` and
   refuse to arm an unapproved issue. One click, but it is the click that
   means "I have read this".

5. **Per-link click reporting.** `email_events.link_url` is captured and
   nothing reads it. A per-issue table of link, slot, unique clickers is the
   single most valuable screen we do not have — especially given that every
   recorded open on this list has looked like a bot fetch, which makes clicks
   the only trustworthy signal we have.

6. **A public archive page per issue** (`/newsletter/<issue>`). Needed for
   "view in browser", for people who join later and want to read back, for
   search, and later for showing a sponsor what a placement looks like.

7. **The Friday sequence needs its own small machine**, not a campaign:
   - `newsletter_lessons` — lesson number, subject, body, published flag
   - `subscriber_lesson_position` — email, current lesson, last sent at
   - `/api/cron/newsletter-lesson` on Fridays, modelled on
     `/api/cron/welcome-email`: claim first, cap-check per address, resumable,
     inert when SES is unconfigured, hard backstop so a bad timestamp cannot
     mail the whole list twice.
   - On `/admin/campaigns`, a small panel: the lesson library, and how many
     people are sitting on each lesson.

8. **The cap decision from section 1** has to be settled in SQL, not in the
   UI, or the dashboard will show one audience and the sender will use
   another.

Rough build order, smallest first: the `christian-news` category and the
three template components → dates visible + sitemap fix → `op: "create"` →
newsletter issue table + renderer + preview → approve step → per-link clicks
→ archive page → the Friday sequence.

---

## 6. Preparing for sponsorship, without building any of it

No rates, no outreach, no sales system. Only the measurement that would let
you have the conversation from a position of knowledge, and a layout that can
take a sponsor without being deformed by one.

**Collect from the first issue onwards:**

- List size, split by engagement group, snapshotted weekly. Growth rate
  matters more to a sponsor than absolute size.
- Per issue: sent, delivered, bounced, complained, unsubscribed.
- **Unique clickers per issue and clicks per slot** (this is what
  `utm_content` buys). Report clicks, not opens — every open on this list so
  far has been a proxy or scanner fetch, and quoting an open rate we know is
  bot-inflated to a sponsor is a trap.
- Per-link clicks, so "which kind of section earns attention" is answerable
  with eight weeks of evidence.
- Unsubscribe rate per issue, trended. A sponsor cares; you should care more.
- Archive page views per issue, once the archive exists.
- Reply count. A newsletter people reply to is worth more than its CTR
  suggests, and it is the one number Systeme never gave you.

**What makes a sponsor say yes**, in rough order: verified send volume to real
addresses; a click-through rate with a definition they can check; a low
unsubscribe rate; a defined audience ("Christians studying the Bible daily,
mostly on mobile") rather than a demographic guess; and consistency — twelve
issues on twelve consecutive Tuesdays is itself the pitch. Audience geography
and age are not in SES; if they matter later, they would come from app profile
data, and that is a separate decision about what we are comfortable sharing.

**What a future placement looks like**, when the time comes: one block,
clearly labelled "Supported by", placed after the news section and never
inside the teaching section. One sentence of plain description, one link,
`utm_content=sponsor`. One per issue, never two. It should be skippable
without losing the issue, which is also what makes it honest. A short written
policy — what we will not advertise — is worth drafting before the first
enquiry rather than during it.

The layout in section 4 already reserves that position, so adding it later is
a new block in the renderer and nothing else. Until then the slot simply does
not render.

---

## Status

**Section 2 and section 3 are built** (2026-10-12, after Louis said "build the
3 posts"). On the site now, untagged, live at the next scheduled deploy:

- `christian-news` added to `BLOG_CATEGORIES`
- `docs/christian-news-format.md` — the third article format
- `components/blog/ClaimStatus.tsx` and `components/blog/ArticleSources.tsx`
- Published and updated dates now render in the meta row of **every** post
- `app/sitemap.ts` prefers `updatedAt` over `publishedAt`
- The three articles, each with `excludeFromGroupShare: true` and no
  `groupPost` teaser — the review gate, not an oversight
- Three placeholder banners, because every existing banner carries another
  article's title. See `MARCUS_HANDOFF.md`.

**Nothing in the email plan is built.** No campaign row has been created,
touched, scheduled or sent. No migration exists. No newsletter issue is
drafted.

Still waiting on: the four sequence questions in section 1, and the weekly cap
decision. Both have to be answered before the Friday sequence can be built,
and the cap decision has to be settled in SQL rather than in the dashboard, or
the screen will show one audience while the sender uses another.
