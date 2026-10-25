#!/usr/bin/env node
/**
 * Queue + tracker for the Christian Holidays article series
 * (Louis, 2026-10-25: 56 articles on Christian holidays, feast days, saints,
 * Advent, Christmas and church history, 4 a day for 14 days).
 *
 * Built on the same bones as scripts/chapter-blog-queue.mjs, deliberately:
 * that pattern has shipped 146 chapter articles without a duplicate, and a
 * second way of doing the same job would be a second thing to debug at 3am.
 * The Holiday Blog Writer routine never decides "what's next" itself - it
 * asks this script, so order, the day counter, retries and duplicate
 * protection live in one place.
 *
 *   node scripts/holiday-blog-queue.mjs status
 *   node scripts/holiday-blog-queue.mjs plan           # the whole 14 day run
 *   node scripts/holiday-blog-queue.mjs next           # peek, no changes
 *   node scripts/holiday-blog-queue.mjs claim          # mark next as generating
 *   node scripts/holiday-blog-queue.mjs set <slug> <status> ["note"]
 *   node scripts/holiday-blog-queue.mjs check <slug>   # quality gate
 *   node scripts/holiday-blog-queue.mjs verify-live    # committed -> published
 *   node scripts/holiday-blog-queue.mjs self-test
 *
 * State is data/holiday-blog/progress.json, committed with each article.
 * See docs/HOLIDAY_BLOG_WRITER_AGENT.md.
 *
 * Statuses: generating, quality_check, committed (pushed, waiting for the
 * Deploy routine), published (seen live), failed (retried first next run),
 * needs_louis (failed MAX_ATTEMPTS times; skipped until Louis looks).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROGRESS_FILE = path.join(ROOT, "data/holiday-blog/progress.json");
const BLOG_CONTENT = path.join(ROOT, "lib/blogContent.ts");
const SITE = "https://www.mybiblebuddy.net";
const MAX_ATTEMPTS = 3;
const STALE_GENERATING_MS = 3 * 60 * 60 * 1000;

/**
 * The shape of the run: 4 articles a day.
 *
 * It was 56 over 14 days. Louis added the four Friday email anchors on
 * 2026-10-25 and asked for them as day one, so it is 60 over 15. The anchors
 * are not holiday explainers - they are teaching posts in their own
 * categories - but they go through this queue because a second pipeline for
 * four articles would be a second thing to keep working.
 */
export const DAILY_TARGET = 4;
export const TARGET_DAYS = 15;
export const TOTAL_ARTICLES = 60;
/**
 * A hard ceiling on calendar days, so a run of bad days can never turn this
 * into a standing routine. If a day only manages 3 articles the series needs
 * a 15th day to reach 56; MAX_DAYS gives it a week of slack and then stops
 * whatever happens. `status` reports the shortfall either way.
 */
export const MAX_DAYS = 22;

/** Word count bands by `length`, checked by the quality gate. */
export const LENGTH_BANDS = {
  pillar: [3000, 4000],
  standard: [3000, 3500],
  major: [2500, 3000],
  profile: [2000, 2500],
  focused: [1000, 1600],
};

/**
 * The editorial plan: 56 topics, every one a distinct search query.
 *
 * It lives in the script rather than in the progress JSON on purpose. This is
 * the plan - it belongs in code review, and an agent that can edit its own
 * queue is an agent that can quietly drop a topic it found hard. progress.json
 * holds only what happens at runtime.
 *
 * Fields:
 *  slug      the URL, and the key for everything else. Never changes.
 *  title     the SEO title, used as given unless it breaks the format spec.
 *  track     which part of the season it belongs to. Drives the interleave.
 *  priority  0 highest. 0 is reserved for dates inside the next week.
 *  length    pillar | major | profile - see LENGTH_BANDS.
 *  intent    the one search intent the article answers. Two topics must never
 *            share one, or we build our own competing pages.
 *  shape     standard | character - which structure in docs/blog-post-format.md.
 *  disputed  true when the honest answer is "Christians disagree" or "the
 *            popular story is not the evidence". These MUST carry ClaimStatus.
 *  categorySlug  defaults to christian-holidays. The four Friday anchors are
 *            teaching posts and keep their own categories.
 *  anchorFriday  the Friday email this post is the lead read for. Set only on
 *            the anchors, so the email work can find them by date.
 *  sourced   false on a teaching post. Holiday explainers make historical
 *            claims and must cite them; a post on gratitude does not.
 */
export const TOPICS = [
  // --- The four Friday email anchors (Louis, 2026-10-25) --------------------
  // Written by hand on day one rather than by the routine, because the Friday
  // teaching emails are written against their URLs and could not wait for the
  // queue to reach them. Recorded here anyway so the day counter, the
  // duplicate check and the quality gate all see them.
  { slug: "thanksgiving-when-the-year-has-been-hard", title: "Gratitude When the Year Has Been Hard: What Thanksgiving Really Means", track: "anchor", priority: -1, length: "standard", shape: "standard", categorySlug: "christian-foundations", anchorFriday: "2026-11-20", sourced: false, intent: "how to be thankful when life is hard" },
  { slug: "what-the-first-christmas-actually-looked-like", title: "What the First Christmas Actually Looked Like", track: "anchor", priority: -1, length: "standard", shape: "standard", categorySlug: "christian-foundations", anchorFriday: "2026-12-18", sourced: false, intent: "what the first christmas was really like" },
  { slug: "christmas-day-one-thing-to-carry", title: "Christmas Day: One Thing to Carry Into Today", track: "anchor", priority: -1, length: "focused", shape: "standard", categorySlug: "christian-foundations", anchorFriday: "2026-12-25", sourced: false, intent: "short christmas day devotional" },
  { slug: "how-to-read-the-bible-in-a-year-without-quitting", title: "How to Read the Bible in a Year Without Quitting in February", track: "anchor", priority: -1, length: "standard", shape: "standard", categorySlug: "bible-study-tips", anchorFriday: "2027-01-01", sourced: false, intent: "how to read the bible in a year without quitting" },

  // --- Reformation, All Saints, November ------------------------------------
  { slug: "what-is-reformation-day", title: "What Is Reformation Day? History, Meaning, and Why October 31 Matters", track: "reformation", priority: 0, length: "major", shape: "standard", intent: "what is reformation day" },
  { slug: "what-is-all-saints-day", title: "What Is All Saints' Day? Meaning, History, and How Christians Celebrate", track: "reformation", priority: 1, length: "major", shape: "standard", intent: "what is all saints day" },
  { slug: "what-is-all-souls-day", title: "What Is All Souls' Day? Catholic Traditions, Prayer, and Remembering the Dead", track: "reformation", priority: 1, length: "major", shape: "standard", intent: "what is all souls day" },
  { slug: "who-was-saint-martin-of-tours", title: "Who Was Saint Martin of Tours? The Meaning of St. Martin's Day", track: "reformation", priority: 1, length: "profile", shape: "character", intent: "who was saint martin of tours" },
  { slug: "what-is-the-feast-of-christ-the-king", title: "What Is the Feast of Christ the King? Meaning and Biblical Significance", track: "reformation", priority: 1, length: "major", shape: "standard", intent: "what is the feast of christ the king" },
  { slug: "what-is-totensonntag", title: "What Is Totensonntag? Germany's Sunday of Remembrance Explained", track: "reformation", priority: 2, length: "profile", shape: "standard", intent: "what is totensonntag" },

  // --- Advent ---------------------------------------------------------------
  { slug: "when-does-advent-begin", title: "When Does Advent Begin? Dates, Meaning, and Traditions", track: "advent", priority: 1, length: "major", shape: "standard", intent: "when does advent begin" },
  { slug: "when-is-saint-nicholas-day", title: "When Is Saint Nicholas Day? Who Was Saint Nicholas and Why December 6 Is Celebrated", track: "advent", priority: 1, length: "profile", shape: "character", intent: "when is saint nicholas day" },
  { slug: "who-was-saint-andrew", title: "Who Was Saint Andrew? The Apostle's Story and Feast Day", track: "advent", priority: 2, length: "profile", shape: "character", intent: "who was saint andrew" },
  { slug: "what-is-the-immaculate-conception", title: "What Is the Feast of the Immaculate Conception? Catholic Beliefs Explained", track: "advent", priority: 2, length: "major", shape: "standard", intent: "what is the immaculate conception", disputed: true },
  { slug: "saint-nicholas-facts-and-legends", title: "Who Was Saint Nicholas? Historical Facts Versus Modern Legends", track: "advent", priority: 2, length: "profile", shape: "character", intent: "saint nicholas facts versus legends", disputed: true },
  { slug: "what-is-an-advent-wreath", title: "What Is an Advent Wreath? The Meaning of the Four Candles", track: "advent", priority: 2, length: "profile", shape: "standard", intent: "what is an advent wreath" },
  { slug: "who-was-saint-lucy", title: "Who Was Saint Lucy? The Meaning of Saint Lucy's Day", track: "advent", priority: 3, length: "profile", shape: "character", intent: "who was saint lucy" },
  { slug: "what-is-gaudete-sunday", title: "What Is Gaudete Sunday? Why Is One Advent Candle Pink?", track: "advent", priority: 3, length: "profile", shape: "standard", intent: "what is gaudete sunday" },
  { slug: "what-is-an-advent-calendar", title: "What Is an Advent Calendar? The Christian Meaning Behind the Doors", track: "advent", priority: 3, length: "profile", shape: "standard", intent: "advent calendar christian meaning" },
  { slug: "why-is-advent-purple", title: "Why Is Advent Purple? The Meaning of the Liturgical Colors", track: "advent", priority: 3, length: "profile", shape: "standard", intent: "why is advent purple" },
  { slug: "who-was-saint-barbara", title: "Who Was Saint Barbara? The Feast Day and the Cherry Branch Tradition", track: "advent", priority: 3, length: "profile", shape: "character", intent: "who was saint barbara" },

  // --- Christmas ------------------------------------------------------------
  { slug: "what-is-christmas", title: "What Is Christmas? The Biblical Meaning of Jesus' Birth", track: "christmas", priority: 1, length: "pillar", shape: "standard", intent: "what is christmas" },
  { slug: "what-does-the-bible-say-about-the-birth-of-jesus", title: "What Does the Bible Say About the Birth of Jesus?", track: "christmas", priority: 1, length: "pillar", shape: "standard", intent: "what does the bible say about the birth of jesus" },
  { slug: "what-is-christmas-eve", title: "What Is Christmas Eve? History, Meaning, and Christian Traditions", track: "christmas", priority: 2, length: "major", shape: "standard", intent: "what is christmas eve" },
  { slug: "what-is-christmastide", title: "What Is Christmastide? The Twelve Days of Christmas Explained", track: "christmas", priority: 2, length: "major", shape: "standard", intent: "what is christmastide" },
  { slug: "was-jesus-born-in-a-stable", title: "Was Jesus Born in a Stable? What the Bible Actually Says", track: "christmas", priority: 2, length: "major", shape: "standard", intent: "was jesus born in a stable", disputed: true },
  { slug: "who-was-saint-stephen", title: "Who Was Saint Stephen? Why Christians Remember Him on December 26", track: "christmas", priority: 3, length: "profile", shape: "character", intent: "who was saint stephen" },
  { slug: "what-is-the-feast-of-the-holy-family", title: "What Is the Feast of the Holy Family? Meaning and Biblical Lessons", track: "christmas", priority: 3, length: "major", shape: "standard", intent: "what is the feast of the holy family" },
  { slug: "what-is-the-feast-of-the-holy-innocents", title: "What Is the Feast of the Holy Innocents? The Biblical Story Explained", track: "christmas", priority: 3, length: "major", shape: "standard", intent: "what is the feast of the holy innocents" },
  { slug: "what-is-watch-night", title: "What Is Watch Night? Christian New Year's Eve Worship Explained", track: "christmas", priority: 3, length: "profile", shape: "standard", intent: "what is watch night" },
  { slug: "meaning-of-the-twelve-days-of-christmas", title: "What Is the Meaning of the Twelve Days of Christmas?", track: "christmas", priority: 3, length: "major", shape: "standard", intent: "meaning of the twelve days of christmas", disputed: true },
  { slug: "where-do-christmas-carols-come-from", title: "Where Do Christmas Carols Come From? The Bible Behind the Songs", track: "christmas", priority: 3, length: "major", shape: "standard", intent: "where do christmas carols come from" },
  { slug: "what-is-a-nativity-scene", title: "What Is a Nativity Scene? The History Behind the Christmas Crib", track: "christmas", priority: 3, length: "profile", shape: "standard", intent: "what is a nativity scene" },
  { slug: "who-was-king-herod", title: "Who Was King Herod? The Ruler Behind the Christmas Story", track: "christmas", priority: 3, length: "major", shape: "character", intent: "who was king herod" },
  { slug: "what-is-boxing-day", title: "What Is Boxing Day? St. Stephen's Day and Its Christian Roots", track: "christmas", priority: 3, length: "profile", shape: "standard", intent: "what is boxing day" },
  { slug: "what-is-the-octave-of-christmas", title: "What Is the Octave of Christmas? The Eight Days Explained", track: "christmas", priority: 3, length: "profile", shape: "standard", intent: "what is the octave of christmas" },

  // --- Epiphany and after ---------------------------------------------------
  { slug: "what-is-epiphany", title: "What Is Epiphany? The Meaning of Three Kings' Day on January 6", track: "epiphany", priority: 1, length: "major", shape: "standard", intent: "what is epiphany" },
  { slug: "why-is-christmas-on-january-7", title: "Why Do Some Christians Celebrate Christmas on January 7?", track: "epiphany", priority: 2, length: "major", shape: "standard", intent: "why is christmas on january 7" },
  { slug: "what-is-the-solemnity-of-mary", title: "What Is the Solemnity of Mary, Mother of God? Why January 1 Matters", track: "epiphany", priority: 2, length: "major", shape: "standard", intent: "what is the solemnity of mary" },
  { slug: "what-is-candlemas", title: "What Is Candlemas? The Christian Feast of the Presentation of Jesus", track: "epiphany", priority: 2, length: "major", shape: "standard", intent: "what is candlemas" },
  { slug: "who-were-the-wise-men", title: "Who Were the Wise Men? What the Bible Says About the Magi", track: "epiphany", priority: 2, length: "major", shape: "character", intent: "who were the wise men", disputed: true },
  { slug: "what-is-the-feast-of-the-annunciation", title: "What Is the Feast of the Annunciation? The Day God Said It First", track: "epiphany", priority: 3, length: "major", shape: "standard", intent: "what is the feast of the annunciation" },
  { slug: "what-is-the-presentation-of-jesus", title: "What Is the Presentation of Jesus in the Temple? The Meaning Explained", track: "epiphany", priority: 3, length: "major", shape: "standard", intent: "what is the presentation of jesus in the temple" },
  { slug: "how-is-epiphany-celebrated-around-the-world", title: "How Do Christians Celebrate Epiphany Around the World?", track: "epiphany", priority: 3, length: "major", shape: "standard", intent: "how is epiphany celebrated around the world" },
  { slug: "what-is-the-feast-of-the-circumcision", title: "What Is the Feast of the Circumcision of Christ? January 1 Explained", track: "epiphany", priority: 3, length: "profile", shape: "standard", intent: "what is the feast of the circumcision" },

  // --- Explainers -----------------------------------------------------------
  { slug: "what-is-the-liturgical-calendar", title: "What Is the Liturgical Calendar? A Beginner's Guide to the Christian Year", track: "explainer", priority: 1, length: "pillar", shape: "standard", intent: "what is the liturgical calendar" },
  { slug: "is-christmas-pagan", title: "Is Christmas Pagan? What History Actually Tells Us", track: "explainer", priority: 1, length: "pillar", shape: "standard", intent: "is christmas pagan", disputed: true },
  { slug: "was-jesus-really-born-on-december-25", title: "Was Jesus Really Born on December 25?", track: "explainer", priority: 1, length: "pillar", shape: "standard", intent: "was jesus born on december 25", disputed: true },
  { slug: "most-important-christian-holidays", title: "What Are the Most Important Christian Holidays and What Do They Mean?", track: "explainer", priority: 1, length: "pillar", shape: "standard", intent: "most important christian holidays" },
  { slug: "what-is-a-holy-day-of-obligation", title: "What Is a Holy Day of Obligation? Catholic Meaning and Requirements", track: "explainer", priority: 2, length: "major", shape: "standard", intent: "what is a holy day of obligation" },
  { slug: "catholic-vs-protestant-church-calendars", title: "What Is the Difference Between Catholic and Protestant Church Calendars?", track: "explainer", priority: 2, length: "major", shape: "standard", intent: "catholic versus protestant church calendars" },
  { slug: "most-important-catholic-holy-days", title: "What Are the Most Important Catholic Holy Days?", track: "explainer", priority: 2, length: "major", shape: "standard", intent: "most important catholic holy days" },
  { slug: "all-saints-day-vs-all-souls-day", title: "What Is the Difference Between All Saints' Day and All Souls' Day?", track: "explainer", priority: 2, length: "profile", shape: "standard", intent: "difference between all saints day and all souls day" },
  { slug: "why-some-christians-do-not-celebrate-christmas", title: "Why Do Some Christians Not Celebrate Christmas?", track: "explainer", priority: 2, length: "major", shape: "standard", intent: "why some christians do not celebrate christmas", disputed: true },
  { slug: "advent-vs-christmas", title: "What Is the Difference Between Advent and Christmas?", track: "explainer", priority: 3, length: "profile", shape: "standard", intent: "difference between advent and christmas" },
  { slug: "solemnity-feast-memorial-difference", title: "What Is the Difference Between a Solemnity, Feast, and Memorial?", track: "explainer", priority: 3, length: "profile", shape: "standard", intent: "difference between solemnity feast and memorial" },
  { slug: "what-is-a-patron-saint", title: "What Is a Patron Saint? How Saints Are Chosen and Why", track: "explainer", priority: 3, length: "major", shape: "standard", intent: "what is a patron saint" },
  { slug: "how-does-the-church-make-a-saint", title: "How Does the Church Make a Saint? Canonization Explained", track: "explainer", priority: 3, length: "major", shape: "standard", intent: "how does the church make a saint" },
  { slug: "what-is-a-feast-day", title: "What Is a Saint's Feast Day? Why the Date Is Usually a Death Day", track: "explainer", priority: 3, length: "profile", shape: "standard", intent: "what is a saints feast day" },
  { slug: "what-is-ordinary-time", title: "What Is Ordinary Time? The Longest Season of the Church Year", track: "explainer", priority: 3, length: "major", shape: "standard", intent: "what is ordinary time" },
];

/** The rotation the interleave walks. Order chosen so day 1 mixes seasons. */
const TRACK_ROTATION = ["anchor", "reformation", "christmas", "explainer", "advent", "epiphany"];

/**
 * The 56 topics in the exact order they will be written.
 *
 * Priority bands first, and inside each band a round robin across the tracks.
 * That is what stops the queue writing six Reformation articles on day one and
 * leaving Christmas until December, which is the whole reason Louis asked for
 * this in October. Deterministic, so a retry re-derives the same order and a
 * reviewer can read the run off `plan` before it starts.
 */
export function orderedTopics() {
  const bands = [...new Set(TOPICS.map((t) => t.priority))].sort((a, b) => a - b);
  const out = [];
  for (const band of bands) {
    const byTrack = new Map(TRACK_ROTATION.map((track) => [track, TOPICS.filter((t) => t.priority === band && t.track === track)]));
    let placed = true;
    while (placed) {
      placed = false;
      for (const track of TRACK_ROTATION) {
        const next = byTrack.get(track).shift();
        if (next) {
          out.push(next);
          placed = true;
        }
      }
    }
  }
  return out;
}

/** Which day of the run (1 based) a topic is planned for. */
export function plannedDay(index) {
  return Math.floor(index / DAILY_TARGET) + 1;
}

function loadProgress() {
  return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
}

function saveProgress(progress) {
  progress.updatedAt = new Date().toISOString();
  const next = findNext(progress);
  progress.nextTopic = next ? next.slug : "All 56 articles complete";
  fs.writeFileSync(PROGRESS_FILE, `${JSON.stringify(progress, null, 2)}\n`);
}

function berlinDate(iso) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(iso ? new Date(iso) : new Date());
}

/** An article counts as existing if it is wired into BLOG_ARTICLES or has a page folder. */
function articleExists(slug) {
  const content = fs.readFileSync(BLOG_CONTENT, "utf8");
  return content.includes(`slug: "${slug}"`) || fs.existsSync(path.join(ROOT, "app/blog", slug, "page.tsx"));
}

function isStaleGenerating(entry) {
  return entry.status === "generating" && Date.now() - Date.parse(entry.startedAt || 0) > STALE_GENERATING_MS;
}

const isDone = (entry) => !!entry && ["committed", "published"].includes(entry.status);

/** Berlin dates this series has committed at least one article on. */
export function daysUsed(progress) {
  return Object.keys(progress.days || {}).sort();
}

export function committedToday(progress, today = berlinDate()) {
  return progress.days?.[today]?.committed || 0;
}

export function completedCount(progress) {
  return Object.values(progress.articles || {}).filter(isDone).length;
}

/**
 * The next topic to write: the earliest one in planned order that has no
 * article and is not done, in flight, or parked for Louis. A failed topic sits
 * earlier in the order than anything after it, so it is always retried before
 * the queue moves on. A topic whose article already exists is reported as
 * `existing` instead - never written twice.
 */
export function findNext(progress) {
  for (const [index, topic] of orderedTopics().entries()) {
    const entry = progress.articles?.[topic.slug];
    if (isDone(entry) || entry?.status === "needs_louis") continue;
    if (entry && ["generating", "quality_check"].includes(entry.status) && !isStaleGenerating(entry)) continue;
    if (articleExists(topic.slug)) return { ...topic, plannedDay: plannedDay(index), existing: true };
    return { ...topic, plannedDay: plannedDay(index), attempts: entry?.attempts || 0, previousError: entry?.lastError || null };
  }
  return null;
}

/**
 * Why a run should stop without writing, or null to go ahead. Checked in the
 * order a run would hit them: paused, finished, out of days, day already full.
 */
export function stopReason(progress, today = berlinDate()) {
  if (progress.paused) return { paused: true, reason: progress.pausedReason || "This series is paused. Do not claim a topic." };
  if (completedCount(progress) >= TOTAL_ARTICLES) return { done: true, reason: `All ${TOTAL_ARTICLES} articles are written.` };
  if (!findNext(progress)) return { done: true, reason: "No topic left that is not finished or parked for Louis." };
  const used = daysUsed(progress);
  if (used.length >= MAX_DAYS && !used.includes(today)) {
    return { stopped: true, reason: `The series has used its ${MAX_DAYS} day ceiling (target was ${TARGET_DAYS}). Louis has to restart it deliberately.` };
  }
  if (committedToday(progress, today) >= DAILY_TARGET) {
    return { dayComplete: true, reason: `${DAILY_TARGET} articles are already committed today (${today}).` };
  }
  return null;
}

function summary(progress) {
  const ordered = orderedTopics();
  const entries = Object.entries(progress.articles || {});
  const today = berlinDate();
  const used = daysUsed(progress);
  const completed = completedCount(progress);
  const shortDays = used.filter((day) => (progress.days[day].committed || 0) < DAILY_TARGET);
  return {
    totalArticles: TOTAL_ARTICLES,
    completed,
    remaining: TOTAL_ARTICLES - completed,
    targetDays: TARGET_DAYS,
    maxDays: MAX_DAYS,
    startedOn: progress.startedOn || null,
    daysUsed: used.length,
    today,
    committedToday: committedToday(progress, today),
    dailyTarget: DAILY_TARGET,
    shortDays: shortDays.map((day) => ({ day, committed: progress.days[day].committed || 0 })),
    stop: stopReason(progress) || null,
    nextTopic: findNext(progress)?.slug || "All articles complete",
    plannedDayOfNext: findNext(progress)?.plannedDay || null,
    inProgress: entries.filter(([, e]) => ["generating", "quality_check"].includes(e.status)).map(([s]) => s),
    waitingForDeploy: entries.filter(([, e]) => e.status === "committed").map(([s]) => s),
    published: entries.filter(([, e]) => e.status === "published").length,
    failed: entries.filter(([, e]) => e.status === "failed").map(([s, e]) => ({ slug: s, attempts: e.attempts, lastError: e.lastError })),
    needsLouis: entries.filter(([, e]) => e.status === "needs_louis").map(([s, e]) => ({ slug: s, lastError: e.lastError })),
    byTrack: TRACK_ROTATION.map((track) => ({
      track,
      total: ordered.filter((t) => t.track === track).length,
      done: ordered.filter((t) => t.track === track && isDone(progress.articles?.[t.slug])).length,
    })),
  };
}

async function verifyLive(progress) {
  const results = [];
  for (const [slug, entry] of Object.entries(progress.articles || {})) {
    if (entry.status !== "committed") continue;
    try {
      const res = await fetch(`${SITE}/blog/${slug}`, { redirect: "follow" });
      const html = res.ok ? await res.text() : "";
      if (res.ok && html.includes(`/blog/${slug}`)) {
        entry.status = "published";
        entry.publishedAt = new Date().toISOString();
        results.push({ slug, live: true });
      } else {
        results.push({ slug, live: false, http: res.status });
      }
    } catch (error) {
      results.push({ slug, live: false, error: String(error) });
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Quality gate: `check <slug>` must pass before an article is committed.
// ---------------------------------------------------------------------------

const FILLER_PHRASES = [
  "god has a plan",
  "this reminds us to trust god",
  "this teaches us that faith is important",
  "in today's world",
  "in conclusion",
  "it is important to note",
  "delve",
  "tapestry",
  "testament to",
  "journey of faith",
  "rich history",
  "stands as a reminder",
];

/**
 * Words that turn a tradition into a fact. A holiday series lives or dies on
 * this: "the church chose December 25 to replace Saturnalia" is a theory, and
 * writing it flat is the single easiest way for this series to be wrong in
 * public. Flagged as warnings so a writer who has genuinely sourced the claim
 * can keep it, not blocked outright.
 */
const OVERCLAIM_PHRASES = [
  "the church chose",
  "proves that",
  "historians agree",
  "scholars agree",
  "it is a fact that",
  "there is no doubt",
  "was invented to replace",
  "obviously",
];

const kjvCache = new Map();
async function kjvBook(book) {
  if (!kjvCache.has(book)) {
    const res = await fetch(`https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/${book.replace(/\s+/g, "")}.json`);
    if (!res.ok) throw new Error(`KJV source for ${book} returned ${res.status}`);
    kjvCache.set(book, await res.json());
  }
  return kjvCache.get(book);
}

const normalize = (text) =>
  text
    .replace(/&apos;|&#39;|’/g, "'")
    .replace(/&quot;|[“”]/g, '"')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

function decodeEntities(text) {
  return text.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}

/** "Luke 2:1 to 7", "Matthew 2:11", "Psalm 23:1-3" -> { book, chapter, from, to } */
function parseReference(reference) {
  const match = reference.trim().match(/^(.+?)\s+(\d+):(\d+)(?:\s*(?:to|and|-|–|,)\s*(\d+))?/i);
  if (!match) return null;
  let book = match[1].trim();
  if (/^psalm$/i.test(book)) book = "Psalms";
  if (/^song of songs$/i.test(book)) book = "Song of Solomon";
  const from = Number(match[3]);
  return { book, chapter: Number(match[2]), from, to: match[4] ? Math.max(from, Number(match[4])) : from };
}

async function checkVerse(text, reference) {
  const ref = parseReference(reference);
  if (!ref) return `could not read reference "${reference}"`;
  let data;
  try {
    data = await kjvBook(ref.book);
  } catch {
    return `unknown or unreachable book in "${reference}"`;
  }
  const chapter = data.chapters.find((c) => Number(c.chapter) === ref.chapter);
  if (!chapter) return `${reference}: chapter does not exist`;
  // Allow a verse on either side so "2:6 and 7" style ranges never false-fail.
  const passage = chapter.verses
    .filter((v) => Number(v.verse) >= ref.from - 1 && Number(v.verse) <= ref.to + 1)
    .map((v) => v.text)
    .join(" ");
  const haystack = normalize(passage);
  const parts = decodeEntities(text).split(/\.\.\.|…/).map(normalize).filter((p) => p.split(" ").length >= 3);
  const missing = parts.filter((p) => !haystack.includes(p));
  return missing.length ? `${reference}: not word-for-word KJV ("${missing[0].slice(0, 80)}")` : null;
}

function articleText(source) {
  return decodeEntities(
    source
      .replace(/^\s*(import|export const metadata)[^\n]*\n/gm, " ")
      .replace(/function (VerseQuote|ArticleLink)[\s\S]*?\n}\n/g, " ")
      .replace(/className="[^"]*"/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\{"\s*"\}/g, " ")
      .replace(/[{}()]/g, " "),
  );
}

function shingles(text, size = 8) {
  const words = normalize(text).split(" ");
  const set = new Set();
  for (let i = 0; i + size <= words.length; i += 1) set.add(words.slice(i, i + size).join(" "));
  return set;
}

/** The BLOG_ARTICLES object literal for a slug, as raw source. */
function blogEntry(content, slug) {
  const start = content.indexOf(`slug: "${slug}"`);
  if (start < 0) return null;
  const end = content.indexOf("\n  },", start);
  return end < 0 ? content.slice(start) : content.slice(start, end);
}

async function checkArticle(slug) {
  const ordered = orderedTopics();
  const index = ordered.findIndex((t) => t.slug === slug);
  if (index < 0) throw new Error(`${slug} is not a Christian Holidays topic`);
  const topic = ordered[index];
  const file = path.join(ROOT, "app/blog", slug, "page.tsx");
  if (!fs.existsSync(file)) throw new Error(`${file} does not exist`);
  const source = fs.readFileSync(file, "utf8");
  const text = articleText(source);
  const words = normalize(text).split(" ").filter(Boolean).length;
  const problems = [];
  const warnings = [];

  const [minWords, maxWords] = LENGTH_BANDS[topic.length];
  if (words < minWords) problems.push(`only ~${words} words; a ${topic.length} article needs ${minWords} to ${maxWords}. Research it further, do not pad it`);
  if (words > Math.round(maxWords * 1.2)) warnings.push(`~${words} words against a ${maxWords} ceiling; check nothing is padded`);

  const quotes = [...source.matchAll(/<VerseQuote\s+text="([^"]*)"\s+reference="([^"]*)"/g)];
  if (quotes.length < 3) problems.push(`only ${quotes.length} VerseQuote blocks; this is a Bible site, every holiday article carries Scripture`);
  for (const [, quoteText, reference] of quotes) {
    const verseProblem = await checkVerse(quoteText, reference);
    if (verseProblem) problems.push(verseProblem);
  }

  // Only the article registry counts as a link target. BLOG_CATEGORIES uses
  // the same `slug:` key, so searching the whole file would let a link to a
  // category page pass as a link to an article.
  const blogContent = fs.readFileSync(BLOG_CONTENT, "utf8").slice(fs.readFileSync(BLOG_CONTENT, "utf8").indexOf("export const BLOG_ARTICLES"));
  const internalLinks = [...source.matchAll(/<ArticleLink\s+href="(\/blog\/[^"]+)"/g)].map((m) => m[1]);
  if (internalLinks.length < 4 || internalLinks.length > 6) {
    problems.push(`${internalLinks.length} internal links; the format spec says 4 to 6`);
  }
  for (const href of internalLinks) {
    const target = href.replace(/^\/blog\//, "").replace(/[#?].*$/, "");
    if (!blogContent.includes(`slug: "${target}"`)) problems.push(`broken internal link ${href}`);
  }
  if (new Set(internalLinks).size !== internalLinks.length) problems.push("the same internal link is used twice");

  // Outward sourcing. A holiday explainer makes historical claims a reader
  // cannot check against Scripture, so it has to say where they came from. A
  // teaching post does not: its evidence is the Bible, quoted in the page.
  const needsSources = topic.sourced !== false;
  if (needsSources && !/<ArticleSources/.test(source)) {
    problems.push("no ArticleSources block; historical and doctrinal claims need credible external sources");
  } else if (needsSources) {
    const sourceCount = (source.match(/\btitle:\s*"/g) || []).length;
    if (sourceCount < 3) problems.push(`only ${sourceCount} external sources; list at least 3`);
    if (!/checkedOn=/.test(source)) problems.push("ArticleSources is missing checkedOn");
  }

  // Disputed topics must separate what is established from what is not.
  if (topic.disputed && !/<ClaimStatus/.test(source)) {
    problems.push(`"${topic.intent}" is a disputed topic; it must carry a ClaimStatus block separating what is established from what is not`);
  }

  const h3Count = (source.match(/<h3/g) || []).length;
  const minH3 = topic.length === "focused" ? 6 : 10;
  if (h3Count < minH3) problems.push(`only ${h3Count} H3 headings; this article needs at least ${minH3} across the body and the FAQ`);
  if (!/Question|FAQ/i.test(source)) problems.push("no FAQ section heading found");

  if (/Keep Growing With Bible Buddy|StudyCta|clicking the button below/i.test(source)) {
    problems.push("contains an end-of-post CTA; the end card is the only CTA");
  }
  if (/[—–]/.test(text)) warnings.push("contains long dashes; the voice rules say no dashes");

  const lower = normalize(text);
  for (const phrase of FILLER_PHRASES) {
    const count = lower.split(normalize(phrase)).length - 1;
    if (count > 0) warnings.push(`filler phrase "${phrase}" x${count}`);
  }
  for (const phrase of OVERCLAIM_PHRASES) {
    const count = lower.split(normalize(phrase)).length - 1;
    if (count > 0) warnings.push(`overclaiming phrase "${phrase}" x${count}; make sure a named source actually says this`);
  }

  // Copy check against the most recent earlier articles in this series.
  const mine = shingles(text);
  const overlaps = [];
  for (const other of ordered.slice(Math.max(0, index - 6), index)) {
    const otherFile = path.join(ROOT, "app/blog", other.slug, "page.tsx");
    if (!fs.existsSync(otherFile)) continue;
    const theirs = shingles(articleText(fs.readFileSync(otherFile, "utf8")));
    let shared = 0;
    for (const s of mine) if (theirs.has(s)) shared += 1;
    const pct = mine.size ? Math.round((shared / mine.size) * 1000) / 10 : 0;
    overlaps.push({ slug: other.slug, sharedPercent: pct });
    if (pct > 6) problems.push(`${pct}% of 8-word runs repeat ${other.slug}; rewrite the repeated parts`);
    else if (pct > 3) warnings.push(`${pct}% of 8-word runs repeat ${other.slug}`);
  }

  // The registry entry.
  const entry = blogEntry(blogContent, slug);
  if (!entry) {
    problems.push(`${slug} is not in BLOG_ARTICLES`);
  } else {
    const wantCategory = topic.categorySlug || "christian-holidays";
    if (!entry.includes(`categorySlug: "${wantCategory}"`)) problems.push(`BLOG_ARTICLES entry is not in the ${wantCategory} category`);
    // The teaser the weekly newsletter renders as its lead read. Without it a
    // post lands in the email as a bare title and meta description.
    if (!/groupPost:/.test(entry)) problems.push("BLOG_ARTICLES entry has no groupPost teaser; the Friday email renders it as the lead read");
    else {
      // The teaser is a TS string literal in the source, so its line breaks are
      // the two characters backslash-n, not real newlines. blogContent.ts is
      // CRLF, hence the \r? - without it this silently matched nothing and
      // every teaser check passed by accident.
      const teaser = entry.match(/content:\s*\n?\s*"([\s\S]*?)",\r?\n/)?.[1] || "";
      const lineBreak = `${String.fromCharCode(92)}n`;
      if (teaser.split(lineBreak).length < 6) problems.push("the groupPost teaser is one block of prose; it has to be one idea per line");
      for (const marker of ["📌", "📖", "New article on:", "🟢", "🙏"]) {
        if (!teaser.includes(marker)) problems.push(`the groupPost teaser is missing ${marker}`);
      }
      if (/https?:\/\//.test(teaser)) problems.push("the groupPost teaser must not contain a URL; the feed renders the link itself");
    }
    const description = entry.match(/description:\s*\n?\s*"([^"]*)"/)?.[1];
    if (!description) problems.push("BLOG_ARTICLES entry has no description");
    else if (description.length > 160) problems.push(`meta description is ${description.length} characters; the limit is 160`);
    if (/legacyPath:/.test(entry)) problems.push("legacyPath is only for pre-migration posts");
  }

  return {
    slug,
    ok: problems.length === 0,
    length: topic.length,
    words,
    wordBand: LENGTH_BANDS[topic.length],
    verseQuotes: quotes.length,
    internalLinks: internalLinks.length,
    h3Count,
    disputed: !!topic.disputed,
    overlaps,
    problems,
    warnings,
  };
}

function selfTest() {
  const ordered = orderedTopics();
  const slugs = new Set(TOPICS.map((t) => t.slug));
  const intents = new Set(TOPICS.map((t) => t.intent));
  const checks = {
    topicCountMatchesTotal: TOPICS.length === TOTAL_ARTICLES,
    uniqueSlugs: slugs.size === TOTAL_ARTICLES,
    uniqueIntents: intents.size === TOTAL_ARTICLES,
    orderKeepsEveryTopic: ordered.length === TOTAL_ARTICLES && new Set(ordered.map((t) => t.slug)).size === TOTAL_ARTICLES,
    everyTrackKnown: TOPICS.every((t) => TRACK_ROTATION.includes(t.track)),
    everyLengthKnown: TOPICS.every((t) => LENGTH_BANDS[t.length]),
    everyShapeKnown: TOPICS.every((t) => ["standard", "character"].includes(t.shape)),
    fullDaysMatchTarget: Math.ceil(ordered.length / DAILY_TARGET) === TARGET_DAYS,
    everyCategoryKnown: TOPICS.every((t) => !t.categorySlug || ["christian-holidays", "christian-foundations", "bible-study-tips"].includes(t.categorySlug)),
    fourAnchors: TOPICS.filter((t) => t.track === "anchor").length === DAILY_TARGET,
  };

  // Day one is the four Friday email anchors, in the priority order Louis gave.
  checks.anchorsLeadTheRun = ordered.slice(0, DAILY_TARGET).map((t) => t.slug).join(",") ===
    "thanksgiving-when-the-year-has-been-hard,what-the-first-christmas-actually-looked-like,christmas-day-one-thing-to-carry,how-to-read-the-bible-in-a-year-without-quitting";
  // Then the three dates inside the next week. Reformation Day (31 Oct) leads
  // day two; all three are written inside days two and three, well before the
  // dates they are about.
  const earlyTwelve = ordered.slice(DAILY_TARGET, DAILY_TARGET * 3).map((t) => t.slug);
  checks.reformationLeadsDayTwo = ordered[DAILY_TARGET].slug === "what-is-reformation-day";
  checks.imminentWrittenEarly = ["what-is-all-saints-day", "what-is-all-souls-day"].every((slug) => earlyTwelve.includes(slug));
  // Christmas explainers start on day two, which is the point of running this in October.
  checks.christmasOnDayTwo = ordered.slice(DAILY_TARGET, DAILY_TARGET * 2).some((t) => t.track === "christmas");
  // No day in the body of the run is four articles from one corner of the
  // season. Day one is the four anchors by design, and the last day is
  // whatever the round robin has left over, so both are excluded.
  const dayTracks = [];
  for (let i = DAILY_TARGET; i < ordered.length - DAILY_TARGET; i += DAILY_TARGET) {
    dayTracks.push(new Set(ordered.slice(i, i + DAILY_TARGET).map((t) => t.track)).size);
  }
  checks.middleDaysMixTracks = dayTracks.every((n) => n >= 3);
  checks.noDisputedTopicWithoutFlag = TOPICS.filter((t) => /^is-|^was-|pagan|legend/.test(t.slug)).every((t) => t.disputed);

  // The stop logic, driven off a fake progress file rather than the real one.
  const fake = { articles: {}, days: {} };
  const day = "2026-11-01";
  checks.runsOnAnEmptyQueue = stopReason(fake, day) === null;
  fake.days[day] = { committed: DAILY_TARGET };
  checks.stopsWhenDayIsFull = stopReason(fake, day)?.dayComplete === true;
  checks.startsAgainTomorrow = stopReason(fake, "2026-11-02") === null;
  for (let i = 0; i < MAX_DAYS; i += 1) fake.days[`2026-12-${String(i + 1).padStart(2, "0")}`] = { committed: 1 };
  checks.stopsAtTheDayCeiling = stopReason(fake, "2027-01-01")?.stopped === true;
  const finished = { articles: Object.fromEntries(TOPICS.map((t) => [t.slug, { status: "published" }])), days: {} };
  checks.stopsWhenAllAreWritten = stopReason(finished, day)?.done === true;
  // A finished topic is never handed out again.
  checks.neverRepeatsAFinishedTopic = findNext(finished) === null;

  return { ok: Object.values(checks).every(Boolean), checks, failed: Object.entries(checks).filter(([, v]) => !v).map(([k]) => k) };
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  const needsState = !["self-test", "plan"].includes(command);
  const progress = needsState ? loadProgress() : null;
  const print = (value) => console.log(JSON.stringify(value, null, 2));

  switch (command) {
    case "status":
      print(summary(progress));
      break;
    case "plan":
      print(orderedTopics().map((t, i) => ({ day: plannedDay(i), slot: (i % DAILY_TARGET) + 1, slug: t.slug, track: t.track, length: t.length, shape: t.shape, disputed: !!t.disputed })));
      break;
    case "next":
      print(findNext(progress));
      break;
    case "claim": {
      const stop = stopReason(progress);
      if (stop) {
        print(stop);
        break;
      }
      // Walk past topics that already have an article (recording them) until a real one is found.
      let next = findNext(progress);
      while (next?.existing) {
        progress.articles[next.slug] = { ...(progress.articles[next.slug] || {}), status: "published", note: "article already existed; not rewritten" };
        next = findNext(progress);
      }
      if (!next) {
        saveProgress(progress);
        print({ done: true, reason: "No topic left to write." });
        break;
      }
      const entry = progress.articles[next.slug] || { attempts: 0 };
      entry.status = "generating";
      entry.attempts = (entry.attempts || 0) + 1;
      entry.startedAt = new Date().toISOString();
      progress.articles[next.slug] = entry;
      if (!progress.startedOn) progress.startedOn = berlinDate();
      saveProgress(progress);
      print({ ...next, attempts: entry.attempts, committedToday: committedToday(progress), dailyTarget: DAILY_TARGET });
      break;
    }
    case "set": {
      const [slug, status, note] = args;
      const allowed = ["generating", "quality_check", "committed", "published", "failed", "needs_louis"];
      if (!slug || !allowed.includes(status)) throw new Error(`usage: set <slug> <${allowed.join("|")}> ["note"]`);
      if (!TOPICS.some((t) => t.slug === slug)) throw new Error(`${slug} is not a Christian Holidays topic`);
      const entry = progress.articles[slug] || { attempts: 0 };
      const wasDone = isDone(entry);
      entry.status = status;
      if (status === "committed") {
        entry.committedAt = new Date().toISOString();
        // The day counter moves here and nowhere else: a day is spent when an
        // article is actually on main, not when a run starts or fails. A retry
        // of an already committed topic therefore cannot inflate the count.
        if (!wasDone) {
          const today = berlinDate();
          if (!progress.startedOn) progress.startedOn = today;
          progress.days[today] = progress.days[today] || { committed: 0, slugs: [] };
          progress.days[today].committed += 1;
          progress.days[today].slugs.push(slug);
        }
      }
      if (status === "published") entry.publishedAt = new Date().toISOString();
      if (status === "failed") {
        entry.lastError = note || "unspecified";
        if ((entry.attempts || 0) >= MAX_ATTEMPTS) entry.status = "needs_louis";
      } else if (note) {
        entry.note = note;
      }
      progress.articles[slug] = entry;
      saveProgress(progress);
      print({ slug, ...entry, committedToday: committedToday(progress), daysUsed: daysUsed(progress).length });
      break;
    }
    case "verify-live": {
      const results = await verifyLive(progress);
      saveProgress(progress);
      print(results);
      break;
    }
    case "check": {
      const result = await checkArticle(args[0]);
      print(result);
      if (!result.ok) process.exitCode = 2;
      break;
    }
    case "self-test": {
      const result = selfTest();
      print(result);
      if (!result.ok) process.exitCode = 1;
      break;
    }
    default:
      console.error("commands: status | plan | next | claim | set <slug> <status> [note] | check <slug> | verify-live | self-test");
      process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
