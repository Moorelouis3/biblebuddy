import type { RenderableLesson } from "./fridayTeachingSeries";

/**
 * The Genesis study campaign: four emails driving signups to
 * The Beginning of Everything (Louis, 2026-10-28, revised lineup).
 *
 * Four questions that make somebody stop and open Genesis, rather than four
 * general Bible lessons. Louis chose the four and wrote the drafts; this is
 * his copy, tightened, with every quotation and claim checked.
 *
 * NOT A NEW EMAIL SYSTEM. These are RenderableLesson-shaped, so the existing
 * Friday renderer draws them, they install as ordinary dated rows in
 * `email_campaigns`, and `/api/cron/email-campaign-send` posts them. That
 * brings the whole existing machine: the per-address claim in
 * `email_campaign_sends` so nobody can be sent one twice, the suppression
 * list, one-click unsubscribe, SES pacing, and the dashboard stats.
 *
 * ---------------------------------------------------------------------------
 * WHAT WAS CHECKED, AND THE THREE THINGS THAT CHANGED
 * ---------------------------------------------------------------------------
 *
 * Every verse below was read out of public/kjv before it was quoted:
 * Gen 1:26, 1:27, 2:7, 2:8, 3:22, 4:12, 4:14, 4:17, 5:3, 5:4, 6:15, 8:4,
 * 11:7 and Matt 3:16-17. All of them say what the drafts said they say.
 *
 * Email 3's figures were checked against our own article rather than against
 * the headlines: the ark at 300 cubits is ~135-155m and the Durupinar ridge
 * is ~157-164m, which is exactly what /blog/have-they-found-noahs-ark says.
 *
 * Three changes:
 *
 *  1. EMAIL 1 no longer rests on Genesis 5:4 alone. 5:4 counts Adam's other
 *     sons and daughters AFTER Seth, and Seth is born after Abel dies (4:25),
 *     so on its own it cannot establish who was alive to fear. The honest
 *     version - Genesis never calls Cain and Abel the only children, and
 *     never counts the population - is the one that survives a reply from
 *     somebody who knows their Bible, and it is just as interesting.
 *  2. EMAIL 3 does not call it "our investigation". The 2026 field season was
 *     run by a permitted team under Prof. Dr. Cenker Atila; our article
 *     reports on it. Claiming the fieldwork would be the one sentence in the
 *     campaign that is not true.
 *  3. EMAIL 3's CTA order follows Louis's own marketing note: the free study
 *     is the button, the article is a secondary text link. The point of these
 *     four is signups, not blog traffic.
 *
 * Email 4 is Louis's Bible Insight "Who Is God Talking to When He Says 'Us'?"
 * (Life OS / Bible Insights, 23 Sep 2026), kept to his stated position: the
 * plural strengthens the case for the Trinity when read with the New
 * Testament, while Genesis itself does not spell the doctrine out.
 *
 * The CTA is the free study on all four. It is never the Amazon book - mixing
 * them is what turns a teaching email into a sales email.
 */

/** The verified signup page. Free, works signed out, has its own tracking. */
const SIGNUP = "https://www.mybiblebuddy.net/devotionals/beginning-of-everything";

const cta = (content: string) =>
  `${SIGNUP}?utm_source=email&utm_medium=campaign&utm_campaign=genesis-study&utm_content=${content}`;

const SIGNOFF = { name: "Louis Moore III", title: "Founder, Bible Buddy \u{1F4D6}\u{1F49A}" };

const HELLO = "Hey Bible Buddy! \u{1F44B}\u{1F3FD}";

export type GenesisEmail = RenderableLesson & {
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
    subject: "\u{1F92F} Who was Cain afraid of?",
    preheader: "One of Genesis's biggest mysteries has a surprisingly simple answer.",
    bullet: "\u{1F4D6}",
    signoff: SIGNOFF,
    blocks: [
      { type: "h1", text: "\u{1F92F} WHO WAS CAIN AFRAID OF?" },
      { type: "p", html: HELLO },
      { type: "p", html: "After Cain murdered Abel, God punished him. Then Cain said something strange." },
      {
        type: "scripture",
        reference: "\u{1F4D6} GENESIS 4:14 (KJV)",
        text: "every one that findeth me shall slay me",
      },
      { type: "h3", text: "\u{1F914} WAIT… WHO IS EVERYONE?" },
      { type: "p", html: "Adam and Eve were the first humans. Cain killed Abel." },
      { type: "p", html: "So who was left to be afraid of?" },
      { type: "h3", text: "\u{1F50D} HERE IS WHAT MOST PEOPLE MISS" },
      {
        type: "p",
        html: "<strong>Genesis never says Adam and Eve only had two sons.</strong> It never counts the population at all.",
      },
      {
        type: "p",
        html: "Genesis 5:3 tells us Adam was 130 when Seth was born, and 5:4 that he had many more sons and daughters. Genesis simply does not stop to tell us how many people were alive the day Abel died.",
      },
      {
        type: "p",
        html: "But picture Cain's own brothers, sisters, nephews and cousins finding out what he had done.",
      },
      { type: "p", html: "<em>&ldquo;You killed somebody in OUR family.&rdquo;</em>" },
      { type: "p", html: "Suddenly his fear makes complete sense." },
      { type: "h3", text: "\u{1F633} AND THERE IS MORE…" },
      { type: "p", html: "God sentences Cain to be <em>a fugitive and a vagabond</em> (Genesis 4:12)." },
      { type: "p", html: "Three verses later, Cain <strong>builds a city</strong> (Genesis 4:17)." },
      {
        type: "p",
        html: "Why would a man sentenced to wander build himself somewhere permanent? Was he trying to make his own security, having lost God's?",
      },
      { type: "p", html: "That is another one we get to dig into together." },
      { type: "h3", text: "\u{1F4D6} THE BEGINNING OF EVERYTHING" },
      {
        type: "p",
        html: "Our <strong>FREE</strong> 21-day study of Genesis 1&ndash;8 starts <strong>November 8</strong>.",
      },
      { type: "p", html: "Creation, Eden, Cain and Abel, Noah and the flood — together." },
      { type: "cta", label: "\u{1F449} JOIN THE FREE BIBLE STUDY", url: cta("genesis-01") },
    ],
  },
  {
    id: "genesis-study-02-genesis-2-contradiction",
    position: 2,
    sendDate: "2026-11-01",
    sendAtUtc: "2026-11-01T13:00:00Z",
    subject: "\u{1F914} Does the Bible contradict itself in chapter 2?",
    preheader: "God creates humanity in Genesis 1. So why does Genesis 2 start over?",
    bullet: "\u{1F4D6}",
    signoff: SIGNOFF,
    blocks: [
      { type: "h1", text: "\u{1F914} DOES THE BIBLE CONTRADICT ITSELF IN CHAPTER 2?" },
      { type: "p", html: HELLO },
      {
        type: "p",
        html: "Have you ever read Genesis 1, turned the page to Genesis 2, and thought… <em>wait, did we not just do this?</em>",
      },
      { type: "p", html: "In Genesis 1, God creates the heavens, the earth, the animals and humanity." },
      {
        type: "scripture",
        reference: "\u{1F4D6} GENESIS 1:27 (KJV)",
        text: "So God created man in his own image, in the image of God created he him; male and female created he them.",
      },
      { type: "p", html: "Then Genesis 2 describes God forming Adam out of dust." },
      {
        type: "scripture",
        reference: "\u{1F4D6} GENESIS 2:7 (KJV)",
        text: "And the LORD God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.",
      },
      { type: "h3", text: "\u{1F50D} SO WHICH ONE HAPPENED FIRST?" },
      { type: "p", html: "Here is something important about how Genesis is built." },
      {
        type: "p",
        html: "<strong>Genesis 1 is the wide shot.</strong> Six days of creation, and God resting on the seventh.",
      },
      {
        type: "p",
        html: "<strong>Genesis 2 moves the camera in.</strong> It comes back to the making of humanity and gives you the detail chapter 1 never stopped for: how God formed Adam, how he breathed life into him, how he planted a garden eastward in Eden, and how he made a companion for the man.",
      },
      {
        type: "p",
        html: "\u{1F3AC} Think of a film. First you see the whole scene. Then the camera moves close on the people it is really about.",
      },
      {
        type: "p",
        html: "The second chapter is not restarting the clock. It is <strong>changing the focus</strong>.",
      },
      {
        type: "p",
        html: "Scholars do read the relationship between the two chapters in more than one way — but the overview-then-close-up reading is the one that makes most of it click.",
      },
      { type: "h3", text: "\u{1F4D6} READY TO READ GENESIS DIFFERENTLY?" },
      {
        type: "p",
        html: "This is exactly what we do in <strong>The Beginning of Everything</strong>. From <strong>November 8</strong> we take 21 days to slow down, connect the passages, and actually understand what we are reading.",
      },
      { type: "p", html: "<strong>100% free.</strong> \u{1F64C}\u{1F3FD}" },
      { type: "cta", label: "\u{1F449} RESERVE YOUR SPOT", url: cta("genesis-02") },
    ],
  },
  {
    id: "genesis-study-03-noahs-ark-turkey",
    position: 3,
    sendDate: "2026-11-06",
    sendAtUtc: "2026-11-06T13:00:00Z",
    subject: "\u{1F6A2} Have they actually found Noah's ark?",
    preheader: "There is a boat-shaped ridge in Turkey. Here is what the headlines leave out.",
    bullet: "\u{1F6A2}",
    signoff: SIGNOFF,
    blocks: [
      { type: "h1", text: "\u{1F6A2} HAVE THEY ACTUALLY FOUND NOAH'S ARK?" },
      { type: "p", html: HELLO },
      {
        type: "p",
        html: "Imagine a huge boat-shaped ridge, high in the mountains of eastern Turkey — and it is almost exactly as long as the Bible says the ark was.",
      },
      { type: "p", html: "That is why everyone is talking about the Durupinar formation." },
      { type: "h3", text: "\u{1F4CF} FIRST… HOW BIG WAS THE ARK?" },
      {
        type: "scripture",
        reference: "\u{1F4D6} GENESIS 6:15 (KJV)",
        text: "The length of the ark shall be three hundred cubits, the breadth of it fifty cubits, and the height of it thirty cubits.",
      },
      {
        type: "p",
        html: "A cubit is not a fixed unit, so three hundred cubits covers a range — roughly <strong>135 to 155 metres</strong> long, 22 to 26 wide, 13 to 16 tall.",
      },
      { type: "p", html: "An enormous wooden vessel." },
      {
        type: "p",
        html: "And the ridge in Turkey? Roughly <strong>157 to 164 metres</strong> long. Close enough to make anyone look twice.",
      },
      { type: "h3", text: "\u{1F52C} SO DID THEY FIND IT?" },
      {
        type: "p",
        html: "We went through the evidence in October. A permitted, multi-institution team has been working the site with mapping, radar, soil sampling and deep core drilling, and they report unusual features underground.",
      },
      {
        type: "p",
        html: "<strong>But no wood, no structural timber and no dated organic material has been recovered</strong>, nothing has been through peer review yet, and a published geological study identifies the ridge as a natural rock fold.",
      },
      { type: "p", html: "Here is the detail almost everyone skips." },
      {
        type: "scripture",
        reference: "\u{1F4D6} GENESIS 8:4 (KJV)",
        text: "And the ark rested in the seventh month, on the seventeenth day of the month, upon the mountains of Ararat.",
      },
      {
        type: "p",
        html: "<strong>Mountains. Plural.</strong> The Bible never names the one mountain, which makes &ldquo;they found it on Mount Ararat&rdquo; a claim the text itself does not make.",
      },
      { type: "h3", text: "\u{1F30A} OUR FREE GENESIS STUDY STARTS IN TWO DAYS" },
      {
        type: "p",
        html: "We read Noah, the flood and God's covenant together, starting <strong>November 8</strong>.",
      },
      { type: "cta", label: "\u{1F449} JOIN THE FREE 21-DAY STUDY", url: cta("genesis-03") },
      {
        type: "p",
        html: "Want the whole story first? Read <a href=\"https://www.mybiblebuddy.net/blog/have-they-found-noahs-ark\" style=\"color:#334f91;\">Have They Found Noah's Ark? The truth about the Durupinar site</a>.",
      },
    ],
  },
  {
    id: "genesis-study-04-let-us-make-man",
    position: 4,
    sendDate: "2026-11-08",
    sendAtUtc: "2026-11-08T13:00:00Z",
    subject: "\u{1F440} Who was God talking to?",
    preheader: "Three little words in Genesis raise one very big question.",
    bullet: "\u{1F440}",
    signoff: SIGNOFF,
    blocks: [
      { type: "h1", text: "\u{1F440} WHO WAS GOD TALKING TO?" },
      { type: "p", html: HELLO },
      { type: "p", html: "<strong>Today is the day.</strong> \u{1F389} Our free 21-day study of Genesis 1&ndash;8 begins." },
      { type: "p", html: "But before you jump in, let me show you something I noticed while studying Genesis." },
      {
        type: "scripture",
        reference: "\u{1F4D6} GENESIS 1:26 (KJV)",
        text: "Let us make man in our image, after our likeness",
      },
      { type: "h3", text: "\u{1F914} HOLD ON… WHO IS US?" },
      { type: "p", html: "God does not say <em>&ldquo;Let ME make man in MY image.&rdquo;</em>" },
      { type: "p", html: "He says <strong>&ldquo;Let US make man in OUR image.&rdquo;</strong>" },
      { type: "p", html: "And it is not a one-off. It happens three times before you are out of Genesis 11." },
      {
        type: "scripture",
        reference: "\u{1F4D6} GENESIS 3:22 (KJV)",
        text: "Behold, the man is become as one of us",
      },
      {
        type: "scripture",
        reference: "\u{1F4D6} GENESIS 11:7 (KJV)",
        text: "Go to, let us go down, and there confound their language",
      },
      { type: "p", html: "Now look at what happens when Jesus is baptised in Matthew 3:16&ndash;17." },
      {
        type: "ul",
        items: [
          "\u{1F30A}&nbsp; The Son is standing in the water.",
          "\u{1F54A}\u{FE0F}&nbsp; The Spirit descends like a dove.",
          "☁\u{FE0F}&nbsp; The Father speaks from heaven.",
        ],
      },
      { type: "p", html: "<strong>All three, at the same moment.</strong>" },
      {
        type: "p",
        html: "The word <em>Trinity</em> never appears in Genesis, and there are other readings of the plural. But the Father, Son and Spirit did not suddenly turn up in Matthew — and once you have seen the New Testament, those little words in chapter 1 stop being something you read past.",
      },
      { type: "h3", text: "\u{1F4D6} YOUR GENESIS JOURNEY STARTS TODAY" },
      {
        type: "p",
        html: "That is the kind of thing I want us to find together. Not reading a chapter and moving on — actually understanding it.",
      },
      { type: "p", html: "21 days through Genesis 1&ndash;8, inside Bible Buddy, <strong>completely free</strong>. \u{1F64C}\u{1F3FD}" },
      { type: "cta", label: "\u{1F449} START THE FREE GENESIS STUDY", url: cta("genesis-04") },
      { type: "p", html: "Let's open our Bibles and find something new together." },
    ],
  },
];

export function genesisEmailById(id: string): GenesisEmail | undefined {
  return GENESIS_EMAILS.find((e) => e.id === id);
}
