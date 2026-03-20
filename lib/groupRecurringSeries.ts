import { TOTAL_WEEKS, getSeriesWeekLesson } from "./seriesContent";

const BERLIN_TIME_ZONE = "Europe/Berlin";
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
    timeZone: BERLIN_TIME_ZONE,
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

function resolveSeriesWeekNumber(date: Date, seriesStartAt: string | null, totalWeeks = TOTAL_WEEKS) {
  if (!seriesStartAt) return 1;

  const diff = date.getTime() - new Date(seriesStartAt).getTime();
  if (diff <= 0) return 1;

  const computedWeek = Math.floor(diff / WEEK_IN_MS) + 1;
  const maxWeeks = Math.max(1, Math.min(totalWeeks || TOTAL_WEEKS, TOTAL_WEEKS));
  return Math.max(1, Math.min(computedWeek, maxWeeks));
}

export function buildBibleStudySaturdaySnapshot(
  date: Date,
  snapshot: BibleStudySeriesSnapshot | null | undefined,
) {
  if (!snapshot) return null;

  const weekNumber = resolveSeriesWeekNumber(date, snapshot.seriesStartAt, snapshot.totalWeeks ?? TOTAL_WEEKS);
  const lesson = getSeriesWeekLesson(weekNumber);

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
    description: "Why this matters:\nA lot of people start highlighting with no real system and end up with a Bible page full of color they cannot understand later.\n\nHow to use it:\nIn Bible Buddy, tap the verse number itself and highlight with purpose.\n\nWhat it helps you do:\nMark what confused you, what stood out, and what you want to revisit so future you remembers why that verse mattered.",
    contentHtml: paragraphize(
      "Why this matters:\nA lot of people start highlighting with no real system and end up with a Bible page full of color they cannot understand later.\n\nHow to use it:\nIn Bible Buddy, tap the verse number itself and highlight with purpose.\n\nWhat it helps you do:\nMark what confused you, what stood out, and what you want to revisit so future you remembers why that verse mattered.",
    ),
  },
  {
    title: "Sometimes you are not confused by the Bible, you are just stuck on one wording",
    description: "Why this matters:\nSometimes the issue is not the verse itself. It is just the wording in one translation that is slowing you down.\n\nHow to use it:\nOpen the translation dropdown at the top of the Bible reader and switch between WEB, ASV, and KJV without leaving your place.\n\nWhat it helps you do:\nCompare the verse right there, stay focused, and keep reading instead of bouncing to another app.",
    contentHtml: paragraphize(
      "Why this matters:\nSometimes the issue is not the verse itself. It is just the wording in one translation that is slowing you down.\n\nHow to use it:\nOpen the translation dropdown at the top of the Bible reader and switch between WEB, ASV, and KJV without leaving your place.\n\nWhat it helps you do:\nCompare the verse right there, stay focused, and keep reading instead of bouncing to another app.",
    ),
  },
  {
    title: "Chapter notes are there for the moments when you finish reading and still feel lost",
    description: "Why this matters:\nThere are moments when you finish a chapter and realize you read every verse but still are not fully sure what just happened.\n\nHow to use it:\nWhen you finish reading, open the notes for that chapter.\n\nWhat it helps you do:\nGet a simple explanation that ties the chapter together so you understand the flow before moving on.",
    contentHtml: paragraphize(
      "Why this matters:\nThere are moments when you finish a chapter and realize you read every verse but still are not fully sure what just happened.\n\nHow to use it:\nWhen you finish reading, open the notes for that chapter.\n\nWhat it helps you do:\nGet a simple explanation that ties the chapter together so you understand the flow before moving on.",
    ),
  },
  {
    title: "Not understanding a person, place, or keyword can ruin your focus fast",
    description: "Why this matters:\nOne of the easiest ways to lose your focus in the Bible is to hit a name, place, or word you do not understand and then disappear into random searches.\n\nHow to use it:\nAcross the app, when you see those colored study words in the reader, tap them right there.\n\nWhat it helps you do:\nOpen the explanation for people, places, and keywords without leaving the text, so you stay locked in while you study.",
    contentHtml: paragraphize(
      "Why this matters:\nOne of the easiest ways to lose your focus in the Bible is to hit a name, place, or word you do not understand and then disappear into random searches.\n\nHow to use it:\nAcross the app, when you see those colored study words in the reader, tap them right there.\n\nWhat it helps you do:\nOpen the explanation for people, places, and keywords without leaving the text, so you stay locked in while you study.",
    ),
  },
  {
    title: "Bible trivia is one of the easiest ways to keep learning without feeling overwhelmed",
    description: "Why this matters:\nSome days you want to grow in the Word but you do not have the energy for a deep study session.\n\nHow to use it:\nOpen Bible trivia and jump into a quick round.\n\nWhat it helps you do:\nTest what you know, notice what you do not know, and keep engaging Scripture in a lighter way.",
    contentHtml: paragraphize(
      "Why this matters:\nSome days you want to grow in the Word but you do not have the energy for a deep study session.\n\nHow to use it:\nOpen Bible trivia and jump into a quick round.\n\nWhat it helps you do:\nTest what you know, notice what you do not know, and keep engaging Scripture in a lighter way.",
    ),
  },
  {
    title: "The Tempting of Jesus devotional is there for the moments you feel pulled in too many directions",
    description: "Why this matters:\nIf you feel pulled in too many directions, this devotional gives you one clear place to focus.\n\nHow to use it:\nOpen the Tempting of Jesus devotional and start on Day 1.\n\nWhat it helps you do:\nWalk through temptation, obedience, and how Jesus responded in the wilderness one day at a time.",
    contentHtml: paragraphize(
      "Why this matters:\nIf you feel pulled in too many directions, this devotional gives you one clear place to focus.\n\nHow to use it:\nOpen the Tempting of Jesus devotional and start on Day 1.\n\nWhat it helps you do:\nWalk through temptation, obedience, and how Jesus responded in the wilderness one day at a time.",
    ),
  },
  {
    title: "The Testing of Joseph devotional helps when you are trying to trust God in the waiting",
    description: "Why this matters:\nSome seasons feel slow, unfair, or confusing, and Joseph's story speaks straight into that.\n\nHow to use it:\nOpen the Testing of Joseph devotional and move through it day by day.\n\nWhat it helps you do:\nSit with themes like waiting, faithfulness, pressure, and God's timing in a more structured way.",
    contentHtml: paragraphize(
      "Why this matters:\nSome seasons feel slow, unfair, or confusing, and Joseph's story speaks straight into that.\n\nHow to use it:\nOpen the Testing of Joseph devotional and move through it day by day.\n\nWhat it helps you do:\nSit with themes like waiting, faithfulness, pressure, and God's timing in a more structured way.",
    ),
  },
  {
    title: "Reading plans help when you want structure but do not know what to read next",
    description: "Why this matters:\nA lot of people do want to read the Bible more, they just do not know what to open next.\n\nHow to use it:\nOpen a reading plan and let it guide your next chapter.\n\nWhat it helps you do:\nStop guessing, stop jumping around, and keep moving with a clear path forward.",
    contentHtml: paragraphize(
      "Why this matters:\nA lot of people do want to read the Bible more, they just do not know what to open next.\n\nHow to use it:\nOpen a reading plan and let it guide your next chapter.\n\nWhat it helps you do:\nStop guessing, stop jumping around, and keep moving with a clear path forward.",
    ),
  },
  {
    title: "Sometimes the best encouragement in the app is just seeing another Buddy's story",
    description: "Why this matters:\nSometimes the best part of a community is realizing there are real people behind the comments.\n\nHow to use it:\nOpen another Buddy's profile from their name or picture.\n\nWhat it helps you do:\nSee their bio, badge, streak, and story so the app feels more personal and more connected.",
    contentHtml: paragraphize(
      "Why this matters:\nSometimes the best part of a community is realizing there are real people behind the comments.\n\nHow to use it:\nOpen another Buddy's profile from their name or picture.\n\nWhat it helps you do:\nSee their bio, badge, streak, and story so the app feels more personal and more connected.",
    ),
  },
  {
    title: "Messaging is there for the moments when a public comment is not enough",
    description: "Why this matters:\nNot every conversation belongs in a public comment thread.\n\nHow to use it:\nIf somebody encourages you, shares something meaningful, or asks for prayer, open a message with them.\n\nWhat it helps you do:\nKeep the conversation going privately and make Bible Buddy feel more like real community.",
    contentHtml: paragraphize(
      "Why this matters:\nNot every conversation belongs in a public comment thread.\n\nHow to use it:\nIf somebody encourages you, shares something meaningful, or asks for prayer, open a message with them.\n\nWhat it helps you do:\nKeep the conversation going privately and make Bible Buddy feel more like real community.",
    ),
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
      "<p><strong>This week we are looking at Andrew.</strong></p>" +
      "<p>Andrew is easy to overlook because he often stands near louder people in the Gospel story. But his quiet faithfulness is exactly what makes him so important.</p>" +
      "<h2>Why Andrew matters</h2>" +
      "<ul><li>🤝 He keeps bringing people to Jesus.</li><li>📍 He shows that influence does not have to be loud to be powerful.</li><li>💡 He reminds us that helping others get closer to Christ is real ministry.</li></ul>" +
      "<p>Andrew brings Peter. He helps bring the boy with the loaves and fish. He keeps showing up as someone willing to connect people to Jesus without needing the spotlight for himself.</p>" +
      "<h2>Where to read it in the Bible</h2>" +
      "<ul><li>📍 John 1:35-42</li><li>📍 John 6:8-9</li><li>📍 John 12:20-22</li><li>📍 Matthew 4:18-20</li></ul>" +
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
    description: "A Sunday prayer post from Louis that opens the week with covering, encouragement, and space for Buddies to drop real prayer requests.",
    contentHtml:
      "<p>Hey Bible Buddy family,</p>" +
      "<p>Before we step into this new week, I want to start by praying over all of us together.</p>" +
      "<p>Dear Heavenly Father,<br/>" +
      "Thank You for giving us another week and for staying with us even when life feels heavy, uncertain, or overwhelming.<br/>" +
      "As we step into these next few days, go before us.<br/>" +
      "Cover our minds with clarity, our hearts with peace, and our steps with wisdom.<br/>" +
      "Give us strength where we feel tired, patience where we feel stretched, and trust in You where we feel unsure.<br/>" +
      "Protect our homes, our health, our work, and the people we love.<br/>" +
      "Remind every Buddy in this group that we do not walk into this week alone.<br/>" +
      "We place this week into Your hands.<br/>" +
      "In Jesus' name, Amen.</p>" +
      "<p>If you have any prayer requests, needs, or anything you want covered this week, drop it below.</p>" +
      "<p>You can be specific, or you can simply say please pray for me. This is a place of support, not judgment. I'll be praying over every request.</p>",
  },
  {
    title: "How can the group pray for you this week?",
    description: "A Sunday prayer thread that invites honest requests, speaks peace over the week ahead, and encourages the group to pray for each other.",
    contentHtml:
      "<p>Hey Bible Buddy family,</p>" +
      "<p>As we head into a new week, I want to open this space again for prayer.</p>" +
      "<p>If you are walking into this week tired, if you need strength, clarity, peace, or direction, or if you are carrying something quietly and just need covering, drop it below.</p>" +
      "<p>You can be specific, or you can simply say please pray for me. This is a place to support one another, not fix or judge anyone.</p>" +
      "<p>Before the week starts, let me pray for all of us.</p>" +
      "<p>Dear Heavenly Father,<br/>" +
      "I pray for every member of Bible Buddy as we step into this new week.<br/>" +
      "Guard our minds, our hearts, and our spirits.<br/>" +
      "Give us strength to stand firm, wisdom to choose rightly, and peace that does not depend on circumstances.<br/>" +
      "Lead us, protect us, and remind us that we do not walk alone.<br/>" +
      "We trust You with this week.<br/>" +
      "In Jesus' name, Amen.</p>" +
      "<p>Post your prayer request below.</p>",
  },
  {
    title: "What is one thing you want prayer for right now?",
    description: "A more personal Sunday prayer post that invites simple, honest requests and reminds the group to carry one another in prayer.",
    contentHtml:
      "<p>Hey Bible Buddy family,</p>" +
      "<p>Before this week gets moving, I want to slow us down for a second and make room for prayer.</p>" +
      "<p>If there is one thing on your heart right now, one thing weighing on you, or one thing you need God to move in, share it here.</p>" +
      "<p>It can be big. It can be small. It can be detailed, or it can simply be please pray for me.</p>" +
      "<p>This group is not here to judge you. It is here to stand with you.</p>" +
      "<p>I will be praying over the requests that come in, and if you see someone else in the comments, take a minute to pray for them too. That is how a community starts to feel real.</p>",
  },
  {
    title: "Drop your prayer request for the week",
    description: "A simple Sunday prayer thread that opens space for the group to ask for prayer, receive support, and begin the week covered in prayer.",
    contentHtml:
      "<p>Hey Bible Buddy family,</p>" +
      "<p>This is our prayer thread for the week.</p>" +
      "<p>If there is something you want prayer for, drop it in the comments. You do not need to over-explain it. Just be honest.</p>" +
      "<p>If you need peace, wisdom, healing, strength, direction, or just covering for what is ahead, this is a good place to say it out loud.</p>" +
      "<p>I will be praying over every request, and I want to encourage you to do the same for each other. Even a short prayer for another Buddy matters more than we realize.</p>",
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
    const promoLead = introBlocks[0] || liveStudy.introSnippet;
    const promoSupport = introBlocks[1] || "This study is built to help you move through the week with structure instead of guessing what to focus on next.";
    const description =
      `Bible Study Saturday is here.\n\n` +
      `This week we are jumping into "${liveStudy.lesson.title}" - ${liveStudy.lesson.subtitle.toLowerCase()}.\n\n` +
      `${readingLine}`;

    return {
      seriesKey: "bible_study_saturday",
      weekKey: getBerlinDateKey(date),
      title: "This week's Bible Study is now live",
      description,
      contentHtml:
        `<h1>Bible Study Saturday Is Live</h1>` +
        `<p><strong>This week's study is ready and it is meant to be a full-group moment.</strong></p>` +
        `<p>We are jumping into <strong>${liveStudy.lesson.title}</strong> - ${liveStudy.lesson.subtitle.toLowerCase()} - as we study <strong>${liveStudy.lesson.readingReference}</strong> together.</p>` +
        `<h2>Why you should jump in</h2>` +
        `<ul><li>🔥 This is part <strong>${liveStudy.weekNumber}</strong> of a bigger multi-part Bible study series.</li><li>📖 You can move through it throughout the week, not all at once.</li><li>💬 It gives you reading, notes, reflection, and a real group discussion point.</li></ul>` +
        `<p>${promoLead}</p>` +
        `<p>${promoSupport}</p>` +
        `<p><strong>Reading for this week:</strong> ${readingLine}</p>` +
        `<p><a href="${liveStudy.studyHref}" style="color:#8d5d38;font-weight:700;text-decoration:underline;">Open this week's Bible study</a></p>` +
        `<p><strong>After you go through it, come back and tell the group what stood out to you most.</strong></p>`,
    };
  }

  return buildFromTemplate("bible_study_saturday", SATURDAY_FEATURES, date);
}

export function buildPrayerRequestSundayPost(date = new Date()) {
  return buildFromTemplate("prayer_request_sunday", SUNDAY_FEATURES, date);
}
