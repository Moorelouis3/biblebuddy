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
      "<p>Judah is one of those Bible people many of us know by name, but we do not always stop long enough to look at his whole story. He was one of Joseph's brothers, and early on he was part of the same jealousy and hardness that led Joseph to be sold away. That matters because Judah does not begin as the strongest example of character. He begins as a flawed man in a broken family, making serious choices that hurt other people.</p>" +
      "<p>But Judah's story does not stay there. Later, when the family is brought into another hard situation in Egypt, Judah steps forward differently. He speaks up. He takes responsibility. He offers himself in place of Benjamin. That is a very different Judah than the one we first met. His life shows that real change is possible, and that a person can move from selfishness toward sacrifice.</p>" +
      "<p>Judah matters even more because his line becomes part of the bigger story of redemption. Jesus comes through the tribe of Judah. That does not erase Judah's failures, but it does show how God can work through imperfect people and still bring about something holy. Judah reminds us that the people God uses are not always the people with clean beginnings. Sometimes they are the people God transforms over time.</p>",
  },
  {
    title: "Who was Gabriel in the Bible?",
    description: "This week's Who Was This Friday looks at Gabriel and the moments where he shows up carrying messages that change the story.",
    contentHtml:
      "<p>Gabriel is one of the most recognized angels in the Bible, but he is not shown to us often. That is part of what makes him interesting. When Gabriel appears, it usually means something weighty is happening. He is connected to moments where God is making His plan clearer to people who cannot yet see the whole picture.</p>" +
      "<p>In Daniel, Gabriel helps explain visions that would have been overwhelming without guidance. In Luke, Gabriel announces the births of John the Baptist and Jesus. These are not small errands. They are turning-point moments in Scripture. Gabriel's role shows us that God does not leave people alone in confusion forever. Sometimes He sends clarity right into the middle of fear, waiting, or uncertainty.</p>" +
      "<p>Gabriel also reminds us that heaven is not distant from God's work on earth. The story of salvation is so important that God sends messengers into history to speak it forward. Gabriel stands at the meeting point between God's unseen purpose and human life. His presence reminds us that when God is moving, even if people do not understand it yet, heaven is already involved.</p>",
  },
  {
    title: "Who was Andrew in the Bible?",
    description: "This week's Who Was This Friday looks at Andrew and why quiet faithfulness still matters in the story of Jesus.",
    contentHtml:
      "<p>Andrew is not usually the first disciple people talk about, and that is part of why his story matters. He was Peter's brother, and Peter often gets more attention in the Gospel story. But Andrew shows us that influence is not always loud. Sometimes it is deeply important and easy to miss if we only look for the most visible people.</p>" +
      "<p>One of Andrew's most beautiful patterns is that he keeps bringing people to Jesus. He brings his brother Peter. He brings the boy with the loaves and fish. He helps open the door when others are trying to get near Jesus. Andrew may not always be the one at the center of the scene, but he keeps pointing people in the right direction. That is a ministry many people can relate to.</p>" +
      "<p>Andrew reminds us that quiet faithfulness counts in the kingdom of God. Not everyone is called to be the loudest voice in the room. Some are called to notice people, make introductions, and faithfully help others get closer to Christ. Andrew shows that this kind of steady, humble obedience still matters deeply in the story of Jesus.</p>",
  },
  {
    title: "Who was Barnabas in the Bible?",
    description: "This week's Who Was This Friday looks at Barnabas and how encouragement became part of his calling.",
    contentHtml:
      "<p>Barnabas is one of the clearest examples in the New Testament of what encouragement can look like when it is taken seriously. His name becomes closely tied to that trait, and when you follow his story, you can see why. Barnabas is not just someone who says nice things. He is someone who sees potential in people and helps make room for them to grow.</p>" +
      "<p>One of the most important moments in his story is when he stands beside Saul, who later becomes Paul. At a time when many believers were afraid of Saul's past, Barnabas chose to believe that God's work in him was real. That kind of discernment matters. Barnabas also invests in John Mark later on, showing that he was willing to be patient with people who still had growing to do.</p>" +
      "<p>Barnabas teaches us that encouragement is not a soft extra in the Christian life. It is a real ministry. To encourage someone in the right way is to help hold them up while God shapes them. Barnabas shows that one faithful encourager can change the future for more people than they may ever realize.</p>",
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
    const description =
      `This week's Bible study is now live.\n\n` +
      `Learn about "${liveStudy.lesson.title}" and ${liveStudy.lesson.subtitle.toLowerCase()}.\n\n` +
      `${readingLine}`;

    return {
      seriesKey: "bible_study_saturday",
      weekKey: getBerlinDateKey(date),
      title: "This week's Bible Study is now live",
      description,
      contentHtml:
        `<p><strong>This week's Bible study is now live.</strong></p>` +
        `<p>Learn about <strong>${liveStudy.lesson.title}</strong>, ${liveStudy.lesson.subtitle.toLowerCase()}, as we study <strong>${liveStudy.lesson.readingReference}</strong> together.</p>` +
        `<p>${liveStudy.introSnippet}</p>` +
        `<p><a href="${liveStudy.studyHref}" style="color:#8d5d38;font-weight:700;text-decoration:underline;">Open this week's Bible study</a></p>`,
    };
  }

  return buildFromTemplate("bible_study_saturday", SATURDAY_FEATURES, date);
}

export function buildPrayerRequestSundayPost(date = new Date()) {
  return buildFromTemplate("prayer_request_sunday", SUNDAY_FEATURES, date);
}
