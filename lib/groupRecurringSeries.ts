import { GROUP_SCHEDULE_TIME_ZONE } from "./groupScheduleTimeZone";
import { getSeriesTotalWeeks, getSeriesWeekLesson } from "./seriesContent";
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

type RecurringSeriesTemplate = {
  title: string;
  description: string | null;
  contentHtml: string;
};

export type BibleStudySeriesSnapshot = {
  groupId: string;
  seriesTitle: string;
  seriesStartAt: string | null;
  totalWeeks?: number | null;
};

function getBerlinDateParts(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: GROUP_SCHEDULE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  ) as Record<string, string>;

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
  };
}

function getBerlinSeed(date: Date) {
  const parts = getBerlinDateParts(date);
  const utc = Date.UTC(parts.year, parts.month - 1, parts.day);
  return Math.floor(utc / (7 * 24 * 60 * 60 * 1000));
}

function pickFromWeek<T>(items: T[], date: Date) {
  const seed = getBerlinSeed(date);
  return items[((seed % items.length) + items.length) % items.length];
}

function paragraphize(text: string) {
  return text
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [firstLine, ...rest] = block.split("\n");
      if (rest.length > 0 && firstLine.endsWith(":")) {
        return `<p><strong>${firstLine}</strong><br/>${rest.join("<br/>")}</p>`;
      }
      return `<p>${block.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("");
}

function stripFormatting(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/^>\s*/gm, "")
    .replace(/^- /gm, "")
    .replace(/\r/g, "")
    .trim();
}

function getPlainIntroSnippet(intro: string) {
  const blocks = stripFormatting(intro)
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.find((block) => !block.endsWith(":")) ?? blocks[0] ?? "";
}

function getPlainIntroBlocks(intro: string) {
  return stripFormatting(intro)
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => !block.endsWith(":"));
}

function getFirstSentence(text: string) {
  const cleaned = stripFormatting(text).replace(/\s+/g, " ").trim();
  if (!cleaned) return "";

  const match = cleaned.match(/.+?[.!?](?:\s|$)/);
  return (match?.[0] || cleaned).trim();
}

function resolveSeriesWeekNumber(date: Date, seriesStartAt: string | null, totalWeeks: number) {
  if (!seriesStartAt) return 1;

  const diff = date.getTime() - new Date(seriesStartAt).getTime();
  if (diff <= 0) return 1;

  const computedWeek = Math.floor(diff / WEEK_IN_MS) + 1;
  const maxWeeks = Math.max(1, totalWeeks || 1);
  return Math.max(1, Math.min(computedWeek, maxWeeks));
}

export function buildBibleStudySaturdaySnapshot(
  date: Date,
  snapshot: BibleStudySeriesSnapshot | null | undefined,
) {
  if (!snapshot) return null;

  const maxWeeks = Math.max(1, snapshot.totalWeeks ?? getSeriesTotalWeeks(snapshot.seriesTitle));
  const currentWeekNumber = resolveSeriesWeekNumber(date, snapshot.seriesStartAt, maxWeeks);
  const hasStarted = snapshot.seriesStartAt ? date.getTime() >= new Date(snapshot.seriesStartAt).getTime() : false;
  const weekNumber = hasStarted ? currentWeekNumber : 1;
  const lesson = getSeriesWeekLesson(weekNumber, snapshot.seriesTitle);

  if (!lesson) return null;

  const introSnippet = getPlainIntroSnippet(lesson.intro);

  return {
    weekNumber,
    lesson,
    introSnippet,
    seriesTitle: snapshot.seriesTitle,
    studyHref: `/study-groups/${snapshot.groupId}/series/week/${weekNumber}`,
  };
}

const MONDAY_FEATURES: RecurringSeriesTemplate[] = [
  {
    title: "Highlighting your Bible should help you later, not just make the page colorful",
    description: "Most people highlight with no system and end up with a page full of color they can't explain later. In Bible Buddy, you can highlight with a purpose — marking what confused you, what stood out, and what you want to come back to.",
    contentHtml: `
<p>Most people start highlighting the Bible with no real system.</p>
<p>They go through a chapter, mark a few verses in yellow, and then two weeks later they come back and have no idea why they highlighted that.</p>
<p>The color is there. The reason is gone.</p>
<h2>🖊️ Highlighting with purpose changes everything</h2>
<p>In Bible Buddy, you can tap any verse number and highlight it right there. But the goal is not to make the page look active — it is to leave a trail for future you.</p>
<h2>✅ Three ways to highlight intentionally</h2>
<ul>
<li>🟡 <strong>Mark what confused you</strong> — so you know to come back and study it more</li>
<li>🟢 <strong>Mark what stood out</strong> — the verse that hit different when you read it</li>
<li>🔵 <strong>Mark what you want to revisit</strong> — for study, reflection, or sharing later</li>
</ul>
<p>When you build a simple system, your highlights become a map of your time in Scripture — not just color on a page.</p>
<p>Open the Bible reader and try it this week. <a href="/reading"><strong>Tap here to start reading →</strong></a></p>
`.trim(),
  },
  {
    title: "Sometimes you are not confused by the Bible, you are just stuck on one wording",
    description: "Sometimes the issue is not the verse itself — it is just the translation. In Bible Buddy, you can switch between WEB, ASV, and KJV without leaving your place so you can see the verse in different words and keep reading.",
    contentHtml: `
<p>Sometimes you read a verse and something just feels off.</p>
<p>You read it again. Still not clicking. You are not sure if you misunderstood the verse — or if you are just stuck on the specific words used in that translation.</p>
<p>That is a common moment. And it does not have to stop your reading.</p>
<h2>📖 Switch translations without losing your place</h2>
<p>At the top of the <a href="/reading"><strong>Bible reader in Bible Buddy</strong></a>, there is a translation dropdown. Tap it and switch between WEB, ASV, and KJV right there in the same view.</p>
<p>You do not have to open another app. You do not have to search anything. You just see the verse in different words and keep moving.</p>
<h2>✅ When this helps most</h2>
<ul>
<li>📌 <strong>KJV feels too formal</strong> — switch to WEB for a more modern read</li>
<li>📌 <strong>A phrase sounds confusing</strong> — compare it in ASV to see if the wording is clearer</li>
<li>📌 <strong>You want to study a verse deeply</strong> — read it in all three and notice what each one emphasizes</li>
</ul>
<p>The goal is to keep you in the Word, not bouncing between apps trying to figure out what a sentence means.</p>
<p><a href="/reading"><strong>Open the Bible reader and try switching translations →</strong></a></p>
`.trim(),
  },
  {
    title: "Chapter notes are there for the moments when you finish reading and still feel lost",
    description: "You read every verse and still feel like you are not sure what just happened. That is what chapter notes are for. Open them after you read and get a clear explanation that ties the whole chapter together before you move on.",
    contentHtml: `
<p>You finish a chapter. You read every single verse. And then you sit there and think — I am not totally sure what just happened.</p>
<p>That feeling is more common than people admit. The Bible is not always easy to follow, especially in books like Leviticus, Ezekiel, or Revelation where the context matters a lot.</p>
<p>That is exactly what chapter notes are for.</p>
<h2>📝 What chapter notes do</h2>
<p>In the <a href="/reading"><strong>Bible reader</strong></a>, every chapter has a notes section that breaks down what you just read in plain language.</p>
<p>It gives you the context, the key moment in the chapter, and how it connects to the bigger story — so you understand the flow before moving on instead of carrying confusion into the next chapter.</p>
<h2>✅ Use chapter notes when</h2>
<ul>
<li>🔍 <strong>You finished the chapter but feel fuzzy on what happened</strong></li>
<li>📖 <strong>You are reading a book you have never studied before</strong></li>
<li>💡 <strong>You want to make sure you caught the main point before moving on</strong></li>
<li>🗒️ <strong>You are preparing to discuss a passage with someone else</strong></li>
</ul>
<p>You do not have to search anything. Just open the notes right there in the reader.</p>
<p><a href="/reading"><strong>Open the Bible reader and check out the chapter notes →</strong></a></p>
`.trim(),
  },
  {
    title: "What do you do if you don't understand a person, place, or word when reading the Bible?",
    description: "I built Bible Buddy because I got tired of how many things I needed just to study the Bible. Highlighters, notebooks, Notion, Google, YouTube, two other Bible apps — all of that just because I would hit a word I didn't understand. Now you can just tap it and the explanation opens right there.",
    contentHtml: `
<p>I built Bible Buddy because I got tired of how many things I needed just to study the Bible.</p>
<p>Highlighters. Notebooks. Notion. Google. YouTube. Two other Bible apps.</p>
<p>All of that just because I would get to reading and hit a person, place, or word I didn't understand — and then I had to stop, search it up, write the definition down, and piece together what it meant before the verse even made sense.</p>
<p>That broke my focus every single time. So I made something better.</p>
<h2>📖 Reading the Bible is different now</h2>
<p>Inside Bible Buddy we have a full <a href="/reading"><strong>Bible reader</strong></a> built specifically for this problem.</p>
<p>When you come across a person, place, or keyword you don't know — you don't have to leave the page. Just tap it right there and the explanation opens instantly.</p>
<h2>🔍 How it works</h2>
<ul>
<li>🟠 <strong>People</strong> are highlighted in orange — tap to see who they are and why they matter</li>
<li>🟢 <strong>Places</strong> are highlighted in green — tap to see where it is and the context behind it</li>
<li>🔵 <strong>Keywords</strong> are highlighted in blue — tap to get a clear definition right there</li>
</ul>
<p>The explanation pops up without taking you anywhere else. You stay in the text the whole time.</p>
<h2>✅ What this does for your study</h2>
<ul>
<li>✔ You stay in Scripture instead of disappearing into searches</li>
<li>✔ You understand the full verse or chapter instead of guessing</li>
<li>✔ Your focus stays locked in from start to finish</li>
</ul>
<p>This is one of the main reasons I built the app. Open the Bible and try it — <a href="/reading"><strong>tap here to open the Bible reader →</strong></a></p>
`.trim(),
  },
  {
    title: "Bible trivia is one of the easiest ways to keep learning without feeling overwhelmed",
    description: "Some days you want to grow in the Word but you don't have the energy for a deep study session. Bible trivia keeps you engaged — quick questions, instant feedback, and you find out what you actually know versus what you assumed you knew.",
    contentHtml: `
<p>Some days you want to keep growing in the Word but you just do not have the bandwidth for a deep study session.</p>
<p>That is real. And that is exactly where Bible trivia helps.</p>
<h2>🧠 What trivia actually does for you</h2>
<p>It is not just a game. Every question you answer is a small test of what you actually know versus what you assumed you knew.</p>
<p>And when you get one wrong, you see the explanation right there — which is often the moment something actually sticks.</p>
<h2>✅ Why it works on the days when deep study doesn't</h2>
<ul>
<li>⚡ <strong>Short</strong> — you can finish a round in a few minutes</li>
<li>📖 <strong>Scripture-rooted</strong> — every question is based on actual Bible content</li>
<li>💬 <strong>Community</strong> — your score shows up on the group board so you can see how everyone did</li>
<li>🔁 <strong>Rotates weekly</strong> — new theme every Tuesday so it never gets stale</li>
</ul>
<p>This Tuesday's trivia is already live in the group feed. Jump in, test yourself, and see how you do against the rest of the group.</p>
<p>Small consistency over time is how knowledge actually builds.</p>
`.trim(),
  },
  {
    title: "The Tempting of Jesus devotional is there for the moments you feel pulled in too many directions",
    description: "When you feel pulled in too many directions, the Tempting of Jesus devotional gives you one clear place to focus. It walks you through how Jesus responded to temptation in the wilderness — one day at a time.",
    contentHtml: `
<p>There are seasons where everything feels like it is competing for your attention.</p>
<p>Your mind is scattered. You feel pressure from multiple directions. And in those moments, it is hard to know where to focus first.</p>
<p>The Tempting of Jesus devotional was built for exactly that kind of season.</p>
<h2>📖 What the devotional covers</h2>
<p>It walks through the wilderness account — forty days, three specific temptations, and how Jesus responded to every single one.</p>
<p>Not with performance. Not with trying harder. But with the Word.</p>
<h2>✅ What you will work through</h2>
<ul>
<li>🌵 <strong>The first temptation</strong> — turning stones to bread (meeting needs outside of God's timing)</li>
<li>⛪ <strong>The second temptation</strong> — testing God's protection (demanding proof instead of trusting)</li>
<li>👑 <strong>The third temptation</strong> — the kingdoms of the world (choosing a shortcut over the right path)</li>
</ul>
<p>Each day is a short focused study. You do not need a long block of time — just ten minutes and a willingness to sit with the text.</p>
<p>If you have been feeling stretched or pulled in multiple directions, this is a good place to start. One day at a time.</p>
`.trim(),
  },
  {
    title: "The Testing of Joseph devotional helps when you are trying to trust God in the waiting",
    description: "Some seasons feel slow, unfair, or confusing. Joseph's story speaks straight into that. The Testing of Joseph devotional walks you through betrayal, the pit, the prison, and the process — so you can hold on when waiting is hard.",
    contentHtml: `
<p>There are seasons where things feel slow.</p>
<p>Where you are doing the right thing, staying faithful, and it still does not feel like anything is moving.</p>
<p>Joseph's story is one of the most honest pictures of that in all of Scripture.</p>
<h2>📖 What makes Joseph's story different</h2>
<p>Joseph was not in the pit or the prison because he did something wrong. He was there because his path to the promise ran through places that looked like the opposite of what God said.</p>
<p>That is the part of the story most people do not sit with long enough.</p>
<h2>✅ What the devotional walks through</h2>
<ul>
<li>🕳️ <strong>The pit</strong> — betrayed by the people closest to him</li>
<li>⛓️ <strong>Potiphar's house</strong> — faithful and still falsely accused</li>
<li>🏛️ <strong>The prison</strong> — forgotten but still serving with integrity</li>
<li>👑 <strong>The palace</strong> — positioned for something only God could arrange</li>
</ul>
<p>Each phase teaches something real about trusting God when the timeline does not make sense.</p>
<p>If you are in a waiting season right now — a slow season, an unfair season, a confusing one — this devotional will meet you there. Start at Day 1 and take it one day at a time.</p>
`.trim(),
  },
  {
    title: "Reading plans help when you want structure but do not know what to read next",
    description: "A lot of people want to read the Bible more consistently. The issue is not motivation — it is not knowing what to open next. A reading plan solves that. It tells you exactly where to go so you stop guessing and start moving.",
    contentHtml: `
<p>Here is something I hear a lot:</p>
<p><em>"I want to read the Bible more — I just do not know what to read."</em></p>
<p>That is not a motivation problem. That is a structure problem. And a reading plan fixes it completely.</p>
<h2>📋 What a reading plan does for you</h2>
<p>It removes the decision.</p>
<p>Instead of opening the Bible and asking yourself where to start, you open your plan and it tells you exactly what chapter is next. That small shift is what turns inconsistent reading into a real habit.</p>
<h2>✅ Why structure helps</h2>
<ul>
<li>🎯 <strong>No more guessing</strong> — you always know what to read next</li>
<li>📅 <strong>Consistency builds over time</strong> — small daily reads add up faster than you think</li>
<li>🗺️ <strong>You see the Bible as a story</strong> — not just isolated chapters</li>
<li>✔ <strong>Progress feels real</strong> — checking off a day feels like momentum</li>
</ul>
<p>If you have been jumping around the Bible without a clear path, this is the week to pick a plan and actually follow it.</p>
<p>The reading plans in Bible Buddy are already set up and ready to go. Just pick one and start today.</p>
`.trim(),
  },
  {
    title: "Sometimes the best encouragement in the app is just seeing another Buddy's story",
    description: "The best part of a community is realizing there are real people behind the comments. When you tap on another Buddy's profile, you see their streak, their badge, their bio, and the real person behind the name — and the app starts to feel like actual community.",
    contentHtml: `
<p>Community is not just about what people post. It is about who is posting it.</p>
<p>When you see a comment that hits home, or someone shares something from their own walk with God, there is something powerful about knowing there is a real person behind it.</p>
<h2>👤 What you see when you tap a profile</h2>
<p>Tap on any Buddy's name or picture and their profile opens right there. You can see their reading streak, their badge, their bio, and what they have been sharing in the community.</p>
<p>It turns a comment from a username into a person you actually know a little.</p>
<h2>✅ Why this matters for community</h2>
<ul>
<li>🤝 <strong>It makes encouragement feel real</strong> — not just likes from strangers</li>
<li>💬 <strong>It gives you context</strong> — you understand where someone is coming from</li>
<li>🔥 <strong>Streaks and badges show consistency</strong> — and inspire your own</li>
<li>🙏 <strong>It makes prayer more personal</strong> — you know who you are praying for</li>
</ul>
<p>If you have been scrolling the feed without really looking at who is posting, take a second this week and tap on a few profiles.</p>
<p>Real community grows when people stop feeling anonymous to each other.</p>
`.trim(),
  },
  {
    title: "Messaging is there for the moments when a public comment is not enough",
    description: "Not every conversation belongs in the comment section. When someone shares something meaningful, encourages you, or asks for prayer — messaging lets you continue that privately. That is where community gets real.",
    contentHtml: `
<p>Not everything should live in a public comment thread.</p>
<p>Sometimes somebody says something in a post that you want to respond to more honestly than you would in public. Sometimes you want to follow up on a prayer request privately. Sometimes someone encourages you and you just want to say thank you — directly.</p>
<p>That is what messaging is for.</p>
<h2>💬 When to use messages instead of comments</h2>
<ul>
<li>🙏 <strong>Someone shared a prayer request</strong> — reach out to check in privately</li>
<li>💡 <strong>A post hit you personally</strong> — continue the conversation without performing for the feed</li>
<li>🤝 <strong>You want to encourage someone specifically</strong> — a direct message lands differently than a comment</li>
<li>📖 <strong>You want to study or discuss something together</strong> — start a real conversation</li>
</ul>
<h2>✅ How to start a message</h2>
<p>Tap on a Buddy's name or profile picture, then tap the message button. You can also open your messages directly from the menu.</p>
<p>Every message you send is just between the two of you. No feed, no audience — just a real conversation.</p>
<p>Community gets real when it gets personal. Messaging is one of the easiest ways to take it there.</p>
`.trim(),
  },
];

const FRIDAY_FEATURES: RecurringSeriesTemplate[] = [
  {
    title: "Who was Judah in the Bible?",
    description: "This week's Who Was This Friday looks at Judah, his failures, his turning point, and why his story matters more than most people realize.",
    contentHtml:
      "<p><strong>This week we are looking at Judah.</strong></p>" +
      "<p>Judah is one of those people in Scripture whose story starts messy and then becomes surprisingly important. He was one of Joseph's brothers, so he was right in the middle of the jealousy, betrayal, and pain that tore that family apart.</p>" +
      "<h2>Why Judah matters</h2>" +
      "<ul><li>🔥 He shows how ugly sin can get when envy is left unchecked.</li><li>📖 He later steps up with real responsibility instead of empty words.</li><li>👑 His story matters even more because the line of Jesus comes through Judah.</li></ul>" +
      "<p>That turn in Judah's life is what makes him worth studying. He is not introduced like a hero. He is part of the problem. But later, when the family faces another crisis, Judah becomes the one willing to stand in the gap for Benjamin. That is growth. That is repentance with action.</p>" +
      "<h2>Where to read it in the Bible</h2>" +
      "<ul><li>📍 Genesis 37:26-27</li><li>📍 Genesis 38:1-26</li><li>📍 Genesis 44:18-34</li><li>📍 Matthew 1:2-3</li></ul>" +
      "<h2>The real takeaway</h2>" +
      "<p>Judah reminds us that God does not need a clean backstory to do something powerful with a person. Scripture does not hide his failures, but it also does not end there. God can confront what is broken, reshape a heart, and still bring redemption out of a life that looked messy.</p>" +
      "<p><strong>Drop into the comments after you read:</strong> What stands out to you most about Judah's change?</p>",
  },
  {
    title: "Who was Gabriel in the Bible?",
    description: "This week's Who Was This Friday looks at Gabriel and the moments where he shows up carrying messages that change the story.",
    contentHtml:
      "<p><strong>This week we are looking at Gabriel.</strong></p>" +
      "<p>Gabriel is one of the clearest reminders in Scripture that when God speaks, history moves. He does not appear often, but when he does, the moment is never small.</p>" +
      "<h2>Why Gabriel matters</h2>" +
      "<ul><li>🕊️ He shows up in moments where God is revealing something major.</li><li>📣 He announces things that change the direction of the story.</li><li>✨ He reminds us that heaven is active even when life on earth feels uncertain.</li></ul>" +
      "<p>In Daniel, Gabriel helps explain visions that would have been overwhelming without God's help. In Luke, he announces the births of John the Baptist and Jesus. Those are turning-point moments. Gabriel's role reminds us that God is never scrambling. He is moving with purpose.</p>" +
      "<h2>Where to read it in the Bible</h2>" +
      "<ul><li>📍 Daniel 8:15-17</li><li>📍 Daniel 9:21-27</li><li>📍 Luke 1:11-20</li><li>📍 Luke 1:26-38</li></ul>" +
      "<h2>The real takeaway</h2>" +
      "<p>Gabriel points us back to the faithfulness of God. His presence keeps saying the same thing: what God promised is still moving forward. Even when people hesitate, struggle, or need time to understand, God is still accomplishing His word.</p>" +
      "<p><strong>Drop into the comments after you read:</strong> What part of Gabriel's role stands out to you most?</p>",
  },
  {
    title: "Who was Andrew in the Bible?",
    description: "This week's Who Was This Friday looks at Andrew and why quiet faithfulness still matters in the story of Jesus.",
    contentHtml:
      "<h1>Andrew: The Disciple Who Kept Bringing People to Jesus</h1>" +
      "<p><strong>This week we are looking at Andrew.</strong></p>" +
      "<p>Andrew was one of the first men Jesus called, and before that he had been a disciple of John the Baptist. He was Peter's brother, but Scripture keeps showing that Andrew had his own steady kind of faith long before he is remembered as standing near louder people. The first thing Andrew did after meeting Jesus was go find Peter and bring him to the Lord. That tells you a lot about him right away: Andrew was not trying to build his own name, he wanted other people to meet Jesus too. He may not be the loudest disciple in the story, but he is one of the clearest pictures of quiet faithfulness and humble evangelism.</p>" +
      "<h2>Why Andrew matters</h2>" +
      "<ul><li>&#129309; He keeps bringing people to Jesus.</li><li>&#128205; He shows that influence does not have to be loud to be powerful.</li><li>&#128161; He reminds us that helping others get closer to Christ is real ministry.</li></ul>" +
      "<p>Andrew brings Peter. He helps bring the boy with the loaves and fish. He keeps showing up as someone willing to connect people to Jesus without needing the spotlight for himself.</p>" +
      "<h2>Where to read it in the Bible</h2>" +
      "<ul><li>&#128214; John 1:35-42</li><li>&#128214; John 6:8-9</li><li>&#128214; John 12:20-22</li><li>&#128214; Matthew 4:18-20</li></ul>" +
      "<h2>The real takeaway</h2>" +
      "<p>Andrew reminds us that some of the strongest kingdom work happens quietly. Not every calling looks dramatic from the outside. Some people are builders, introducers, and faithful connectors. Heaven notices that kind of obedience.</p>" +
      "<p><strong>Drop into the comments after you read:</strong> Do you relate more to loud leadership or quiet faithfulness?</p>",
  },
  {
    title: "Who was Barnabas in the Bible?",
    description: "This week's Who Was This Friday looks at Barnabas and how encouragement became part of his calling.",
    contentHtml:
      "<p><strong>This week we are looking at Barnabas.</strong></p>" +
      "<p>Barnabas is one of the clearest examples in the New Testament of what real encouragement looks like. Not shallow positivity. Real spiritual encouragement that helps people grow.</p>" +
      "<h2>Why Barnabas matters</h2>" +
      "<ul><li>🙌 He saw God's work in people before others were fully ready to trust it.</li><li>🛡️ He stood beside Paul when many believers were still afraid of him.</li><li>🌱 He made room for growth instead of writing people off too quickly.</li></ul>" +
      "<p>That kind of person is rare. Barnabas was willing to recognize God's grace at work in people and protect that growth while it was still fragile. Later, he also gives John Mark another chance when others were ready to move on.</p>" +
      "<h2>Where to read it in the Bible</h2>" +
      "<ul><li>📍 Acts 4:36-37</li><li>📍 Acts 9:26-27</li><li>📍 Acts 11:22-26</li><li>📍 Acts 15:36-39</li></ul>" +
      "<h2>The real takeaway</h2>" +
      "<p>Barnabas shows us that encouragement can be a ministry, not just a personality trait. The right encourager helps people keep going, helps protect new growth, and can impact more lives than they may ever fully see.</p>" +
      "<p><strong>Drop into the comments after you read:</strong> Who has been a Barnabas in your life?</p>",
  },
];

const SATURDAY_FEATURES: RecurringSeriesTemplate[] = [
  {
    title: "Bible Study Saturday: Slow down and study one section deeply",
    description: "A fresh guided study post with reading, notes, reflection, and group discussion so everyone can move through the same section of Scripture together.",
    contentHtml:
      "<p>This week's Bible Study Saturday is here to help the group slow down and stay on one shared section of Scripture together.</p>" +
      "<p>Take time to read the assigned section, sit with the notes, and pay attention to what stands out. You do not need to rush through it. The goal is to study with intention, not just to check a box.</p>" +
      "<p>After you read, drop into the comments and share one thing you noticed, one question you still have, or one verse that stayed with you. This is where the group grows together.</p>",
  },
  {
    title: "Bible Study Saturday: Let the Word shape your week",
    description: "Bible Study Saturday is where the deeper group study lands, with a clear next step for reading and discussion inside the feed.",
    contentHtml:
      "<p>This week's Bible Study Saturday is meant to give the group one clear focus in the Word.</p>" +
      "<p>Read the study section slowly, look through the notes, and give yourself time to think about what God may be showing you. It is okay if one verse or one idea stands out more than everything else.</p>" +
      "<p>When you are done, come back and tell the group what stayed with you. Your one thought or one question may help somebody else see the passage more clearly too.</p>",
  },
  {
    title: "Bible Study Saturday: One passage, one group, one shared focus",
    description: "A new guided study goes out with structure, notes, and an easy way for the group to reflect together in the comments.",
    contentHtml:
      "<p>Bible Study Saturday is our chance to gather around one passage together instead of everyone reading in a different direction.</p>" +
      "<p>Use the reading, notes, and reflection to help you stay focused. If something confuses you, stay with it. If something convicts you, sit with it. If something encourages you, share it.</p>" +
      "<p>Come back to the comments after you finish and give the group one honest takeaway from the study. That is where the conversation starts to become real.</p>",
  },
  {
    title: "Bible Study Saturday: Read, reflect, and respond together",
    description: "Each Saturday post is meant to keep everyone reading and reflecting on the same section of Scripture together.",
    contentHtml:
      "<p>This week's Bible Study Saturday is live and ready for the group.</p>" +
      "<p>Read the section carefully, work through the notes, and do not be afraid to sit with a verse longer than usual. Sometimes the most helpful study moments come when you stop rushing.</p>" +
      "<p>Once you finish, leave one reflection in the comments so the group can study with you, not just beside you.</p>",
  },
];

const SUNDAY_FEATURES: RecurringSeriesTemplate[] = [
  {
    title: "What can we pray for this week?",
    description: "Sunday Prayer Request — drop whatever is on your heart this week. Be specific, be honest, or simply say please pray for me. I will be praying over every request.",
    contentHtml:
      "<p><strong>Prayer Request Sunday is here — this is our space to cover the week together.</strong></p>" +
      "<p>Before this week starts moving, I want to open this thread and pray over all of us.</p>" +
      "<h2>Why this thread matters</h2>" +
      "<ul><li>🙏 A new week brings new pressure — this is where we lay it down first.</li><li>🤝 Real community carries each other, not just cheers for each other.</li><li>💬 You do not have to over-explain it — just be honest about what you need.</li></ul>" +
      "<p><strong>A prayer for the group this week:</strong></p>" +
      "<p>Dear Heavenly Father,<br/>" +
      "Thank You for another week and for never leaving us even when life feels heavy.<br/>" +
      "Go before every Buddy in this group as they step into these next few days.<br/>" +
      "Cover our minds with clarity, our hearts with peace, and our steps with wisdom.<br/>" +
      "Give strength where we feel tired, patience where we feel stretched, and trust in You where we feel unsure.<br/>" +
      "Protect our homes, our health, our relationships, and the people we love.<br/>" +
      "We place this week into Your hands.<br/>" +
      "In Jesus' name, Amen.</p>" +
      "<p><strong>Drop your prayer request below.</strong> You can be as specific as you need or simply say please pray for me. This is a place of support, not judgment. I will be praying over every one.</p>",
  },
  {
    title: "How can the group pray for you this week?",
    description: "Sunday Prayer Request — if you are carrying something into this week, this is where you put it down. Drop your request below and let the group stand with you.",
    contentHtml:
      "<p><strong>Sunday prayer thread is open — bring whatever you are carrying into this week.</strong></p>" +
      "<p>Some weeks start heavy. Some start uncertain. Some start with something you have been holding quietly and just need covered. This is that space.</p>" +
      "<h2>What this thread is for</h2>" +
      "<ul><li>🙏 Requests for peace, direction, healing, or strength.</li><li>🛡️ Covering for situations you cannot fully explain yet.</li><li>🤝 Prayer for the people in your life who need it right now.</li></ul>" +
      "<p><strong>A prayer for all of us before this week begins:</strong></p>" +
      "<p>Dear Heavenly Father,<br/>" +
      "I pray over every Buddy in this group as we step into a new week.<br/>" +
      "Guard our minds, our hearts, and our spirits.<br/>" +
      "Give us strength to stand firm, wisdom to choose rightly, and peace that does not depend on our circumstances.<br/>" +
      "Lead us, protect us, and remind us that we do not walk this week alone.<br/>" +
      "We trust You with what is ahead.<br/>" +
      "In Jesus' name, Amen.</p>" +
      "<p><strong>Post your prayer request in the comments.</strong> Be specific or keep it simple — either way, the group is here to stand with you.</p>",
  },
  {
    title: "What is one thing you want prayer for right now?",
    description: "Sunday Prayer Request — just one thing. Whatever is weighing on you most right now, drop it here. The group will stand with you and I will be praying over every request.",
    contentHtml:
      "<p><strong>Before this week gets moving, let us slow down for a moment and make room for prayer.</strong></p>" +
      "<p>One thing. That is all I am asking. If there is one thing on your heart right now — one thing weighing on you, one thing you need God to move in — share it here.</p>" +
      "<h2>What you can bring here</h2>" +
      "<ul><li>🙏 Something you have been carrying quietly for a while.</li><li>💔 A relationship, a situation, or a decision that needs wisdom.</li><li>⚡ Something coming up this week that you want covered.</li><li>🌿 A need for peace, healing, or a fresh start.</li></ul>" +
      "<p>It can be big. It can be small. It can be detailed, or it can simply be please pray for me. This group is not here to judge anyone. It is here to stand with you.</p>" +
      "<p><strong>Drop your request below.</strong> I will be praying over every comment that comes in, and I want to encourage you — if you see someone else's request, take a minute to pray for them too. That is how community becomes real.</p>",
  },
  {
    title: "Drop your prayer request for the week",
    description: "Sunday Prayer Request — this is the weekly prayer thread. Drop what you need covered, what you are trusting God for, or simply say please pray for me. We carry each other here.",
    contentHtml:
      "<p><strong>This is our weekly prayer thread — and it is always open.</strong></p>" +
      "<p>Every Sunday I open this space because I believe we should start the week covered, not just busy. If something is weighing on you, this is a good place to say it out loud.</p>" +
      "<h2>What to drop here</h2>" +
      "<ul><li>🙏 Prayer for peace, wisdom, healing, or direction.</li><li>🛡️ Covering for hard situations you are walking through.</li><li>💬 A need you have been afraid to say out loud until now.</li><li>🤝 A request for someone you love who needs prayer too.</li></ul>" +
      "<p>You do not have to over-explain it. You do not have to make it sound a certain way. Just be honest about what you need, and let this group carry it with you.</p>" +
      "<p><strong>Post your request below.</strong> I will be praying over every one, and I want to encourage you to do the same for each other. Even a short prayer for another Buddy matters more than we realize.</p>",
  },
];

function buildFromTemplate(seriesKey: string, items: RecurringSeriesTemplate[], date: Date) {
  const chosen = pickFromWeek(items, date);
  return {
    seriesKey,
    weekKey: getBerlinDateKey(date),
    title: chosen.title,
    description: chosen.description,
    contentHtml: chosen.contentHtml,
  };
}

export function getBerlinDateKey(date: Date) {
  const parts = getBerlinDateParts(date);
  return `${parts.year}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;
}

export function buildUpdateMondayPost(date = new Date()) {
  return buildFromTemplate("update_monday", MONDAY_FEATURES, date);
}

export function buildWhoWasThisFridayPost(date = new Date()) {
  return buildFromTemplate("who_was_this_friday", FRIDAY_FEATURES, date);
}

export function buildBibleStudySaturdayPost(
  date = new Date(),
  snapshot?: BibleStudySeriesSnapshot | null,
) {
  const liveStudy = buildBibleStudySaturdaySnapshot(date, snapshot);

  if (liveStudy) {
    const readingLine = `${liveStudy.lesson.readingReference} · Week ${liveStudy.weekNumber} of ${liveStudy.seriesTitle}`;
    const introBlocks = getPlainIntroBlocks(liveStudy.lesson.intro);
    const promoLead = getFirstSentence(introBlocks[0] || liveStudy.introSnippet);
    const promoSupport =
      getFirstSentence(introBlocks[1] || "") ||
      "This week is meant to give you one clear section to sit with instead of rushing through random chapters.";
    const reflectionPreview = getFirstSentence(liveStudy.lesson.reflectionQuestion || "");
    const triviaCount = liveStudy.lesson.triviaQuestions?.length || 0;
    const description =
      `Week ${liveStudy.weekNumber} of ${liveStudy.seriesTitle} is live.\n\n` +
      `This week's focus is "${liveStudy.lesson.title}" from ${liveStudy.lesson.readingReference}.\n\n` +
      `Read it, take the quiz, and drop your reflection in the group.`;

    return {
      seriesKey: "bible_study_saturday",
      weekKey: getBerlinDateKey(date),
      title: `Week ${liveStudy.weekNumber} Is Now Live`,
      description,
      contentHtml:
        `<h1>Week ${liveStudy.weekNumber} Is Ready</h1>` +
        `<p><strong>This week's Bible study is "${liveStudy.lesson.title}" and I really want you to do this one.</strong></p>` +
        `<p>We are in <strong>${liveStudy.seriesTitle}</strong>, and this week's reading is <strong>${readingLine}</strong>.</p>` +
        `<p>${promoLead}</p>` +
        `<p>${promoSupport}</p>` +
        `<p>This is not just a reading. You will have the study notes, ${triviaCount > 0 ? `a ${triviaCount}-question trivia quiz, ` : ""}and a reflection question to help you really sit with the passage.</p>` +
        (reflectionPreview
          ? `<p><strong>This week's reflection:</strong> ${reflectionPreview}</p>`
          : "") +
        `<p><strong>Go through Week ${liveStudy.weekNumber}, then come back and share what stood out to you in the comments.</strong></p>` +
        `<p style="margin-top:20px;"><a href="${liveStudy.studyHref}" style="display:inline-block;background:#4a9b6f;color:#ffffff;font-weight:700;text-decoration:none;padding:12px 18px;border-radius:999px;">Open Week ${liveStudy.weekNumber}</a></p>`,
    };
  }
  return buildFromTemplate("bible_study_saturday", SATURDAY_FEATURES, date);
}

export function buildPrayerRequestSundayPost(date = new Date()) {
  return buildFromTemplate("prayer_request_sunday", SUNDAY_FEATURES, date);
}

