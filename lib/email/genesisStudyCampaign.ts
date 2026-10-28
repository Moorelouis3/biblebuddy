import type { FridayLesson } from "./fridayTeachingSeriesContent";

/**
 * The Genesis study campaign: four emails driving signups to
 * The Beginning of Everything (Louis, 2026-10-28).
 *
 * These are NOT a new email system. They are the same shape as a Friday
 * email - `FridayLesson` - so `renderFridayLessonHtml` / `renderFridayLessonText`
 * render them, they install as ordinary dated rows in `email_campaigns`, and
 * `/api/cron/email-campaign-send` posts them. That buys the whole existing
 * machine for free: per-address claiming in `email_campaign_sends` so nobody
 * can be sent one twice, the suppression list, one-click unsubscribe, SES
 * pacing, and the open/click stats on the dashboard.
 *
 * WHY THE COPY DIFFERS FROM THE BRIEF IN FOUR PLACES. Louis's brief said
 * "verify Bible references and quotations", and four of them did not survive
 * checking. Each change is the smallest one that makes the sentence true, and
 * in three of the four cases it makes the email better:
 *
 *  1. Gen 4:14 was quoted as "Anyone who finds me will kill me" (NIV). Bible
 *     Buddy reads KJV, so every quote here is KJV: "every one that findeth me
 *     shall slay me."
 *  2. Gen 6:8 was quoted as "found favor" (NIV). KJV says "found GRACE in the
 *     eyes of the LORD" - and email 4's own question is about grace, so the
 *     KJV wording is the one that actually lands the point.
 *  3. Email 3 said "Genesis 4 doesn't explicitly say" that Abel brought an
 *     animal and Cain brought crops. It does say exactly that (4:3-4). What
 *     Genesis never says is that the KIND of offering was the reason one was
 *     accepted, which is the real point and is what the email now says.
 *  4. Email 1 leaned on Gen 5:4 for "other people were alive". Gen 5:4's sons
 *     and daughters come after Seth, who is born after Abel dies (4:25), so it
 *     cannot carry that weight on its own. The honest version - that Genesis
 *     never calls Cain and Abel the only children, and never counts the
 *     population - is what is there now, and it is still a real answer.
 *
 * The three names in email 2 were checked against our own post at
 * /blog/names-of-god-meanings: Elohim, YHWH and Adonai are its #1, #2 and #6,
 * so the brief's three needed no substitution.
 *
 * The CTA is the same on all four and goes to the study's own signup page,
 * which is free. It is never the Amazon book: the book is a separate thing
 * and mixing them is what makes a teaching email read as a sales email.
 */

/** The verified signup page. Free, works signed out, has its own tracking. */
const SIGNUP = "https://www.mybiblebuddy.net/devotionals/beginning-of-everything";

const cta = (content: string) =>
  `${SIGNUP}?utm_source=email&utm_medium=campaign&utm_campaign=genesis-study&utm_content=${content}`;

export type GenesisEmail = FridayLesson & {
  /** The date it goes out, Eastern. */
  sendDate: string;
  /** 8am Eastern on that date, as UTC. */
  sendAtUtc: string;
};

export const GENESIS_CAMPAIGN_PREFIX = "genesis-study-";

export const GENESIS_EMAILS: GenesisEmail[] = [
  {
    id: "genesis-study-01-cain-afraid",
    position: 1,
    sendDate: "2026-10-28",
    // Already in the past at install time on purpose: this one goes out as
    // soon as it is armed, on the next ten-minute tick of the batch sender.
    // A date rather than a null, because an armed row with NO date is what
    // the sender reads as "post this to the whole list right now" - true
    // here, but a habit that has already cost this project one accident.
    sendAtUtc: "2026-10-28T12:00:00Z",
    subject: "Who was Cain afraid of after killing Abel? \u{1F914}",
    preheader: "One of the biggest mysteries in Genesis 4.",
    bullet: "\u{1F4D6}",
    blocks: [
      { type: "h1", text: "Who was Cain afraid of?" },
      { type: "p", html: "Have you ever wondered who Cain was afraid of after he killed his brother Abel?" },
      { type: "p", html: "Think about it." },
      { type: "p", html: "Adam and Eve were the first humans. Cain and Abel were their sons." },
      { type: "p", html: "But after God punished Cain, Cain said this:" },
      {
        type: "p",
        html: "<em>&ldquo;and it shall come to pass, that every one that findeth me shall slay me.&rdquo;</em> &mdash; Genesis 4:14",
      },
      { type: "p", html: "Who was he talking about?" },
      { type: "p", html: "Here is the part most people have never noticed." },
      { type: "p", html: "<strong>Genesis never says Cain and Abel were Adam and Eve&rsquo;s only children.</strong>" },
      {
        type: "p",
        html: "It never counts the population either. Genesis 5:4 tells us Adam had many more sons and daughters, and Genesis 4 has Cain marry, build a city and raise a family &mdash; none of which it pauses to explain.",
      },
      {
        type: "p",
        html: "So the people Cain feared were most likely his own extended family. The text simply assumes a world it never stops to number for us.",
      },
      {
        type: "p",
        html: "<strong>Sometimes the answer to a big Bible question is sitting in a passage we have never connected to it.</strong>",
      },
      {
        type: "p",
        html: "That is why we are starting <strong>The Beginning of Everything</strong>, a free 21-day study of Genesis 1&ndash;8.",
      },
      {
        type: "p",
        html: "Beginning <strong>November 8</strong>, we will read creation, the garden, Adam and Eve, Cain and Abel, Noah and the flood together.",
      },
      { type: "cta", label: "JOIN THE FREE GENESIS STUDY", url: cta("genesis-01") },
    ],
  },
  {
    id: "genesis-study-02-names-of-god",
    position: 2,
    sendDate: "2026-11-01",
    sendAtUtc: "2026-11-01T13:00:00Z",
    subject: "Did you know God has more than one name?",
    preheader: "Three Hebrew names that reveal something about God.",
    bullet: "\u{1F54A}\u{FE0F}",
    blocks: [
      { type: "h1", text: "God has more than one name" },
      { type: "p", html: "Have you ever noticed that the Bible uses different names and titles for God?" },
      { type: "p", html: "Here are three of the most important." },
      { type: "h3", text: "1. Elohim — God" },
      {
        type: "p",
        html: "Genesis 1:1 uses <strong>Elohim</strong> as it introduces God creating the heaven and the earth. It is the name that opens the Bible.",
      },
      { type: "h3", text: "2. YHWH — The LORD" },
      {
        type: "p",
        html: "God&rsquo;s personal name, written YHWH in Hebrew and commonly rendered <strong>Yahweh</strong>. When your Bible prints LORD in small capitals, this is the name underneath it.",
      },
      { type: "h3", text: "3. Adonai — Lord, Master" },
      {
        type: "p",
        html: "<strong>Adonai</strong> speaks of lordship and authority, and is traditionally read aloud in place of the divine name.",
      },
      { type: "p", html: "Each one shows you something the others do not." },
      { type: "p", html: "And this is only the beginning." },
      {
        type: "p",
        html: "On <strong>November 8</strong> we start a free 21-day community study of Genesis 1&ndash;8 &mdash; the text itself, what was going on around it, and what it means for us.",
      },
      { type: "cta", label: "JOIN THE FREE GENESIS STUDY", url: cta("genesis-02") },
      {
        type: "p",
        html: "Want all six names first? Read <a href=\"https://www.mybiblebuddy.net/blog/names-of-god-meanings\" style=\"color:#334f91;\">the names of God and what they mean</a>.",
      },
    ],
  },
  {
    id: "genesis-study-03-cain-and-abel-offering",
    position: 3,
    sendDate: "2026-11-06",
    sendAtUtc: "2026-11-06T13:00:00Z",
    subject: "Why did God accept Abel's offering but reject Cain's?",
    preheader: "The answer might not be what you think.",
    bullet: "\u{1F525}",
    blocks: [
      { type: "h1", text: "Two brothers. Two offerings. One accepted." },
      { type: "p", html: "Two brothers brought an offering to God." },
      { type: "p", html: "Abel&rsquo;s was accepted. Cain&rsquo;s was not." },
      { type: "p", html: "Why?" },
      {
        type: "p",
        html: "Most people assume it was the offering itself &mdash; Abel brought an animal, Cain brought crops. Genesis 4 does tell us that much.",
      },
      {
        type: "p",
        html: "<strong>What Genesis never says is that the kind of offering was the reason.</strong>",
      },
      {
        type: "p",
        html: "Hebrews 11:4 says Abel offered his sacrifice <em>by faith</em>. And in Genesis 4:7 God puts it to Cain directly: <em>&ldquo;If thou doest well, shalt thou not be accepted?&rdquo;</em>",
      },
      { type: "p", html: "<strong>The story is pointing past the gift, at the one bringing it.</strong>" },
      { type: "p", html: "So what part do faith, obedience and the heart play in how we come to God?" },
      {
        type: "p",
        html: "That is the kind of question we sit with in <strong>The Beginning of Everything</strong>, our free study of Genesis 1&ndash;8.",
      },
      { type: "p", html: "It starts <strong>Sunday, November 8</strong>. That is two days away." },
      { type: "cta", label: "JOIN THE FREE GENESIS STUDY", url: cta("genesis-03") },
    ],
  },
  {
    id: "genesis-study-04-noah-starts-today",
    position: 4,
    sendDate: "2026-11-08",
    sendAtUtc: "2026-11-08T13:00:00Z",
    subject: "Why did Noah find grace with God?",
    preheader: "Our free 21-day Genesis study starts today!",
    bullet: "\u{1F308}",
    blocks: [
      { type: "h1", text: "Day 1 opens today" },
      { type: "p", html: "Genesis describes a world so full of violence that God grieved he had made it." },
      { type: "p", html: "And then one sentence turns:" },
      {
        type: "p",
        html: "<em>&ldquo;But Noah found grace in the eyes of the LORD.&rdquo;</em> &mdash; Genesis 6:8",
      },
      { type: "p", html: "What made Noah different?" },
      {
        type: "p",
        html: "Genesis 6:9 calls him a just man, perfect in his generations, a man who walked with God.",
      },
      {
        type: "p",
        html: "<strong>But notice the word. Not favour he earned &mdash; grace he found.</strong> That one word is worth a morning of your time.",
      },
      {
        type: "p",
        html: "Today we begin 21 days through Genesis 1&ndash;8, asking questions exactly like that one.",
      },
      {
        type: "p",
        html: "<strong>The Beginning of Everything &mdash; our free 21-day community study starts today.</strong>",
      },
      {
        type: "p",
        html: "Inside Bible Buddy you will read the passage, read the study, answer one question, and talk it over with everyone else reading the same chapter that day.",
      },
      { type: "p", html: "You do not need to be a Bible expert. Bring the questions you already have." },
      { type: "cta", label: "START THE FREE GENESIS STUDY TODAY", url: cta("genesis-04") },
    ],
  },
];

export function genesisEmailById(id: string): GenesisEmail | undefined {
  return GENESIS_EMAILS.find((e) => e.id === id);
}
