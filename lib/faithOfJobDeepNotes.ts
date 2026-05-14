type JobSection = {
  reference: string;
  title: string;
  verseCallouts: string[];
  points: string[];
};

type JobChapterNote = {
  chapter: number;
  title: string;
  opening: string;
  previous: string;
  whyMatters: string;
  history: string;
  watchFor: string[];
  words: string[];
  sections: JobSection[];
  callbacks: string[];
  emotionalWeight: string;
  application: string;
  bridge: string;
};

function renderVerseRange(reference: string) {
  const match = reference.match(/^Job\s+\d+:(.+)$/);
  return match ? `**${match[1]}**` : reference;
}

function renderList(items: string[]) {
  return items.map((item) => `* ${item}`).join("\n\n");
}

function renderSection(section: JobSection) {
  return `# 📍 ${renderVerseRange(section.reference)} - ${section.title}

${section.verseCallouts.length ? `## Key Verse${section.verseCallouts.length > 1 ? "s" : ""}

${section.verseCallouts.map((verse) => `> ${verse}`).join("\n>\n")}` : ""}

Let's slow down here because this detail matters.

## What Happened

${section.points[0]}

## What It Meant Then

${section.points[1]}

In their world, suffering was not treated like a small private inconvenience. Loss touched honor, family, theology, community standing, and the way people believed God governed the world.

## Where We Have Seen This Before

${section.points[2]}

The Bible keeps showing us that faith is tested in places where the explanation does not arrive as fast as the pain.

## What Is Happening Emotionally

${section.points[3]}

Picture the scene. Job is not a lesson on a page. He is a real man sitting in real grief, surrounded by people who keep trying to explain what they do not fully understand.

## What This Teaches Us Now

${section.points[4]}`;
}

function renderNote(note: JobChapterNote) {
  return `${note.opening}

${note.previous}

${note.whyMatters}

Job is not a quick answer book.

It is not a shortcut around pain.

It is one of the most honest books in Scripture because it lets suffering speak out loud.

That matters.

Because a lot of people are taught to rush pain.

Smile fast.

Explain fast.

Move on fast.

But Job does not move fast.

Job sits in ashes.

Job asks hard questions.

Job argues with friends.

Job wrestles with God.

And the Bible does not erase that.

That is why this study matters.

It teaches us that faith is not pretending pain does not hurt.

Faith is holding on to God when pain has taken almost everything else.

---

# 🏺 The World Behind Job ${note.chapter}

${note.history}

Job belongs to wisdom literature.

That means the book is not only telling us what happened.

It is asking how wisdom works when life does not make sense.

Proverbs often shows us the general pattern of wisdom.

Do right.

Fear God.

Walk uprightly.

Life tends toward blessing.

But Job asks the painful question.

What happens when a righteous person suffers anyway?

What happens when the pattern breaks?

What happens when your theology is too small for your grief?

That is where Job lives.

---

# 🔎 What To Watch For

${renderList(note.watchFor)}

---

# 📖 Words And Details That Matter

${renderList(note.words)}

These are not random facts.

They help us slow down and feel the world behind the chapter.

Job is not just about losing things.

It is about worship, wisdom, accusation, friendship, grief, silence, pride, humility, and the mystery of God's rule.

---

${note.sections.map(renderSection).join("\n\n---\n\n")}

---

# 🔁 Bible Callbacks

${renderList(note.callbacks)}

Job belongs inside the bigger Bible story.

The same Bible that gives us Abraham waiting, Joseph suffering, Moses crying out, David lamenting, Jeremiah weeping, and Jesus suffering unjustly also gives us Job.

God is not afraid of honest grief.

The Bible gives language for it.

---

# 💔 The Emotional Weight

${note.emotionalWeight}

We miss Job if we only turn it into a debate.

There is theology here.

Deep theology.

But there is also a man whose life has collapsed.

There are friends who start with silence and then wound him with speeches.

There are questions that do not get answered immediately.

And there is a God who is present even when Job cannot feel the full explanation.

---

# 🧠 What This Teaches Us Now

${note.application}

Job teaches us that faith does not have to be shallow to be faithful.

You can love God and still hurt.

You can worship and still weep.

You can ask hard questions and still belong to Him.

You can reject bad explanations without rejecting God.

That is part of why Job is so powerful.

It gives believers permission to be honest without letting pain become the final authority.

---

# 🧠 Pause And Reflect

Job ${note.chapter} is not meant to be rushed.

It reveals something about suffering, wisdom, friendship, pride, humility, and the fear of the Lord.

${note.bridge}

Before moving on, sit with the chapter.

Where is the pain?

Where is the pressure to explain too quickly?

Where is God inviting you to stay honest and faithful at the same time?`;
}

const JOB_NOTES: JobChapterNote[] = [
  {
    chapter: 1,
    title: "When Everything Falls Apart",
    opening: "Job 1 begins with a man who fears God, loves his family, and loses almost everything in one brutal day.",
    previous: "Before the speeches, debates, and questions, the book wants us to know something clearly: Job's suffering is not punishment for hidden wickedness.",
    whyMatters: "This chapter matters because it destroys the simple idea that every painful season is automatically proof that someone did something wrong.",
    history: "Job is introduced like an ancient patriarch. He has livestock, servants, children, land, and household authority. Wealth in this world was measured in flocks, herds, family size, and reputation at the city gate.",
    watchFor: [
      "🏠 Job's righteousness before the suffering begins",
      "👨‍👩‍👧‍👦 Job praying for his children",
      "⚖️ the heavenly court scene",
      "💔 four messengers arriving with worse news each time",
      "🙏 Job worshiping while grieving",
    ],
    words: [
      "📍 **Uz** places Job outside Israel's normal storyline, showing that God's wisdom reaches beyond one nation.",
      "🧎 **Blameless** does not mean sinless perfection. It means integrity, wholeness, and a life turned toward God.",
      "🔥 **Burnt offerings** show Job acting as priestly head of his household.",
      "⚖️ **The satan** means the accuser or adversary, one who challenges Job's motives before God.",
    ],
    sections: [
      {
        reference: "Job 1:1-5",
        title: "A Righteous Man Before The Pain",
        verseCallouts: ["**1** There was a man in the land of Uz whose name was Job, and that man was blameless and upright"],
        points: [
          "The chapter opens by showing Job's integrity, worship, family care, and daily spiritual concern before any suffering enters the story.",
          "In the ancient world, a father was responsible for the spiritual health of the household. Job's sacrifices show leadership, love, and reverence.",
          "Abraham also built altars and prayed over his household. Job stands in that older patriarchal world where faith was lived through family responsibility.",
          "This makes the coming pain heavier. Job is not introduced as careless. He is introduced as faithful.",
          "Do not judge a person's suffering before you know the story. Pain is not always a receipt for secret sin.",
        ],
      },
      {
        reference: "Job 1:6-12",
        title: "The Accuser Questions Job's Motives",
        verseCallouts: ["**9** Does Job fear God for no reason?"],
        points: [
          "The accuser claims Job only worships God because God has protected and blessed him.",
          "This is the central accusation of the book. Is Job's faith real, or is it only a transaction built on comfort?",
          "In Eden, the serpent questioned God's goodness. Here, the accuser questions human faithfulness.",
          "The emotional weight is uncomfortable because Job does not know this conversation happened.",
          "Sometimes the deepest tests are about whether we love God Himself or only the life we wanted Him to protect.",
        ],
      },
      {
        reference: "Job 1:13-22",
        title: "One Day Changes Everything",
        verseCallouts: ["**20** Then Job arose and tore his robe and shaved his head and fell on the ground and worshiped"],
        points: [
          "Four messengers arrive, each one carrying devastating news until Job loses property, servants, and children.",
          "Tearing the robe and shaving the head were ancient signs of grief. Job's worship is not emotionless. It is worship from the floor.",
          "Jacob tore his garments when he believed Joseph was dead. The Bible shows grief physically, not politely.",
          "You can almost feel Job's world collapsing before he has time to breathe.",
          "Real worship is not always loud victory. Sometimes it is refusing to curse God while your heart is shattered.",
        ],
      },
    ],
    callbacks: [
      "🌳 Eden and the testing of trust in God's goodness.",
      "🧔 Abraham acting as household worship leader.",
      "🧥 Jacob tearing garments in grief over Joseph.",
    ],
    emotionalWeight: "Job 1 hurts because the losses come too quickly. There is no slow preparation. One messenger is still speaking when the next arrives.",
    application: "This chapter teaches us not to build a faith that only works when life stays stable. Job's first response is grief and worship together.",
    bridge: "Job has lost almost everything, but his integrity remains. Job 2 will show the pressure moving from his possessions and family to his own body.",
  },
  {
    chapter: 2,
    title: "Suffering In The Body",
    opening: "Job 2 takes the suffering deeper. The first test touched Job's world around him. Now the pain touches his own body.",
    previous: "Job has worshiped after unimaginable loss, but the accuser is not finished questioning his faith.",
    whyMatters: "This chapter matters because physical suffering changes the way grief is carried. Pain in the body can make every thought heavier.",
    history: "Skin disease in the ancient world was not only medical. It could isolate a person socially, mark them publicly, and make them feel unclean, exposed, and humiliated.",
    watchFor: [
      "⚖️ the second heavenly court scene",
      "🩹 painful sores from head to foot",
      "🪨 Job sitting in ashes",
      "💬 Job's wife speaking from grief",
      "🤐 the friends beginning with silence",
    ],
    words: [
      "🩹 **Loathsome sores** points to painful, visible affliction that covers Job's body.",
      "🪨 **Ashes** were associated with mourning, humiliation, and grief.",
      "💬 **Curse God and die** is not casual sarcasm. It is despair talking from a devastated home.",
      "🤐 **Seven days and seven nights** shows complete mourning before anyone speaks.",
    ],
    sections: [
      {
        reference: "Job 2:1-8",
        title: "The Pain Comes Closer",
        verseCallouts: ["**7** Satan went out from the presence of the LORD and struck Job with loathsome sores"],
        points: [
          "The accuser claims Job will fail if his own body is touched, and Job is struck with painful sores.",
          "Ancient people did not separate body, soul, and community the way modern people often do. Visible disease affected everything.",
          "Joseph was thrown into a pit and prison. Job is thrown into bodily misery. Both stories show suffering that looks like abandonment but is not the whole story.",
          "Job is now grieving from inside pain. Every movement, every breath, every scrape becomes part of the test.",
          "Be careful judging people whose bodies are tired. Physical pain can make faith feel like it is walking uphill.",
        ],
      },
      {
        reference: "Job 2:9-10",
        title: "His Wife Speaks From The Wreckage",
        verseCallouts: ["**10** Shall we receive good from God, and shall we not receive evil?"],
        points: [
          "Job's wife tells him to curse God and die, but Job refuses to abandon God in suffering.",
          "She has lost the same children. Her words are wrong, but they come from the same ruined house.",
          "Sarah laughed after years of barrenness. Rachel cried out in pain. The Bible does not hide the anguish of women in covenant stories.",
          "This is not a villain moment as much as a grief moment. She cannot see a future from inside the ashes.",
          "Pain can make despair sound logical. Job teaches us not to let despair become the final voice.",
        ],
      },
      {
        reference: "Job 2:11-13",
        title: "The Friends Sit In Silence",
        verseCallouts: ["**13** They sat with him on the ground seven days and seven nights, and no one spoke a word to him"],
        points: [
          "Job's three friends arrive, weep, tear their robes, sprinkle dust, and sit silently with him.",
          "At first, they do the right thing. Presence before explanation is wise grief ministry.",
          "Romans later tells believers to weep with those who weep. Job's friends begin there before they later lose their way.",
          "The silence honors the size of Job's pain. Some pain is too large for quick words.",
          "Sometimes the most spiritual thing you can do for a hurting person is sit beside them without trying to fix the mystery.",
        ],
      },
    ],
    callbacks: [
      "🕳️ Joseph suffering without explanation in the pit and prison.",
      "💔 Rachel and Sarah showing emotional pain inside promise stories.",
      "😭 Romans 12 and weeping with those who weep.",
    ],
    emotionalWeight: "Job 2 is heavy because the suffering becomes visible on Job's skin and audible in his wife's despair.",
    application: "This chapter teaches that faithful people need embodied compassion. Do not answer physical suffering with cold religious slogans.",
    bridge: "The silence cannot last forever. Job 3 will open the lament, and Job will finally say out loud how dark the pain feels.",
  },
  {
    chapter: 3,
    title: "When Pain Finally Speaks",
    opening: "Job 3 is where the silence breaks. Job does not curse God, but he does curse the day of his birth.",
    previous: "For seven days, Job and his friends sat in grief without words. Now the suffering has language.",
    whyMatters: "This chapter matters because the Bible gives space for lament that sounds uncomfortable but honest.",
    history: "Ancient laments often used poetic language to express grief, darkness, and protest. Job's words are intense because his pain is intense.",
    watchFor: [
      "🌑 Job cursing the day of his birth",
      "🗣️ grief becoming poetry",
      "🪦 death described as rest",
      "❓ why questions beginning",
      "💔 fear, dread, and no peace",
    ],
    words: [
      "🌑 **Darkness** becomes Job's image for undoing the day he was born.",
      "🪦 **Sheol** or the grave is treated as a place of rest from unbearable pain.",
      "❓ **Why** is the language of lament, not automatic unbelief.",
      "😣 **No rest** shows suffering has invaded Job's inner life.",
    ],
    sections: [
      {
        reference: "Job 3:1-10",
        title: "Job Curses His Birthday",
        verseCallouts: ["**3** Let the day perish on which I was born"],
        points: [
          "Job wishes the day of his birth could be erased from creation.",
          "This is creation language turned backward. Job wants light removed from the day that brought him into this pain.",
          "Genesis begins with God saying let there be light. Job's lament asks for darkness because life feels unbearable.",
          "This is grief speaking from the floor. Job is not composing neat theology. He is bleeding words.",
          "The Bible does not require hurting people to sound polished before God.",
        ],
      },
      {
        reference: "Job 3:11-19",
        title: "Job Imagines Rest In Death",
        verseCallouts: ["**17** There the wicked cease from troubling, and there the weary are at rest"],
        points: [
          "Job asks why he did not die at birth and imagines the grave as rest from turmoil.",
          "In ancient thought, death was not romanticized as victory here. Job is describing relief from suffering.",
          "Jeremiah also cursed the day of his birth. Scripture lets deep servants of God speak deep anguish.",
          "Job is not asking for attention. He is trying to understand why he is still alive in this much pain.",
          "When someone is suffering, listen for pain beneath the words before correcting the wording.",
        ],
      },
      {
        reference: "Job 3:20-26",
        title: "Why Is Light Given To The Miserable?",
        verseCallouts: ["**26** I am not at ease, nor am I quiet; I have no rest, but trouble comes"],
        points: [
          "Job asks why life continues for those who long for death, ending with the confession that he has no rest.",
          "This is the language of depression, trauma, and spiritual exhaustion before modern vocabulary existed.",
          "The Psalms also ask why and how long. Lament is part of the Bible's prayer language.",
          "Job feels trapped between life and death, light and darkness, breath and misery.",
          "Faithful lament tells God the truth instead of pretending the darkness is not dark.",
        ],
      },
    ],
    callbacks: [
      "🌅 Genesis 1 and the creation of light.",
      "😭 Jeremiah cursing the day of his birth.",
      "🎵 Psalms of lament asking why and how long.",
    ],
    emotionalWeight: "Job 3 is uncomfortable because Job sounds broken. But that discomfort is part of the gift. The Bible is honest enough to hold it.",
    application: "This chapter teaches that lament is not failure. Sometimes the first faithful step is telling God the truth about how much it hurts.",
    bridge: "Job has spoken honestly. Job 4 begins the friends' responses, and the problem will become clear: they have explanations, but not enough compassion.",
  },
  {
    chapter: 4,
    title: "Eliphaz Starts Explaining",
    opening: "Job 4 begins the speeches of the friends. Eliphaz speaks first, and at first he sounds careful, but his theology starts narrowing quickly.",
    previous: "Job has lamented his birth and confessed that he has no rest. Now his friends move from silence to interpretation.",
    whyMatters: "This chapter matters because it shows how religious words can sound wise and still wound when they misread the person in front of them.",
    history: "Ancient wisdom often assumed a strong connection between righteousness and blessing, wickedness and suffering. Eliphaz leans on that pattern but applies it too rigidly.",
    watchFor: [
      "💬 Eliphaz trying to correct Job gently",
      "⚖️ the retribution principle",
      "🌙 a frightening night vision",
      "🧍 human frailty before God",
      "⚠️ truth applied without enough knowledge",
    ],
    words: [
      "⚖️ **Retribution principle** means the belief that people reap exactly what they deserve in this life.",
      "🌙 **Vision** gives Eliphaz confidence, but experience is not the same as full revelation.",
      "🧍 **Mortal man** emphasizes human weakness before God.",
      "💬 **Reproof** can be true in general and still mistimed or misapplied.",
    ],
    sections: [
      {
        reference: "Job 4:1-6",
        title: "You Strengthened Others, But Now You Faint",
        verseCallouts: ["**5** But now it has come to you, and you are impatient"],
        points: [
          "Eliphaz reminds Job that he has helped others, then questions why Job is now struggling.",
          "In their culture, endurance was often seen as proof of wisdom. Eliphaz expects Job to handle grief better.",
          "Peter later overestimates his own courage before denying Jesus. Humans often think strength is simple until the test arrives.",
          "This lands painfully because Job is being judged for reacting like a wounded human.",
          "Do not shame people for needing the same comfort they once gave others.",
        ],
      },
      {
        reference: "Job 4:7-11",
        title: "Who Ever Perished Being Innocent?",
        verseCallouts: ["**7** Remember: who that was innocent ever perished?"],
        points: [
          "Eliphaz argues that innocent people do not perish and those who sow trouble reap it.",
          "This is partly true as wisdom pattern, but false as an absolute rule. Job's story itself disproves the simplistic version.",
          "Joseph suffered though innocent. Jesus suffers though sinless. The Bible will not let us flatten suffering into one formula.",
          "Job hears the implication: if you are suffering this badly, you must have caused it.",
          "A half-truth can become cruel when it is used to explain someone's pain without knowing the hidden story.",
        ],
      },
      {
        reference: "Job 4:12-21",
        title: "A Vision That Makes Him Certain",
        verseCallouts: ["**17** Can mortal man be in the right before God?"],
        points: [
          "Eliphaz describes a night vision emphasizing human impurity before God.",
          "The statement that humans are frail before God is true, but Eliphaz uses it to pressure Job toward guilt.",
          "Isaiah's vision humbled him, but it led to cleansing and mission. Eliphaz's vision leads him toward accusation.",
          "He sounds spiritual, but the emotional effect is heavy. Job is already crushed, and Eliphaz adds suspicion.",
          "Spiritual experiences must be handled humbly. Not every strong impression gives you the right to diagnose someone else's suffering.",
        ],
      },
    ],
    callbacks: [
      "🐓 Peter overestimating himself before denial.",
      "⛓️ Joseph suffering while innocent.",
      "✝️ Jesus as the innocent sufferer.",
    ],
    emotionalWeight: "Job 4 hurts because Eliphaz begins with something close to encouragement but quickly turns Job's pain into evidence against him.",
    application: "This chapter teaches us to be careful with formulas. Wisdom needs compassion, humility, and patience before it speaks into suffering.",
    bridge: "Eliphaz is not finished. Job 5 will continue his speech and make the invitation sound more religious, but the wound will deepen.",
  },
  {
    chapter: 5,
    title: "Advice That Sounds Right But Lands Wrong",
    opening: "Job 5 continues Eliphaz's first speech. He urges Job to seek God and accept discipline, but he still assumes Job's suffering must fit his system.",
    previous: "Eliphaz has suggested that suffering follows guilt. Now he tries to turn that into counsel.",
    whyMatters: "This chapter matters because some advice can be biblically flavored and still miss the moment.",
    history: "Wisdom teachers often used observation from life: fools suffer consequences, the humble are lifted, and God disciplines. Eliphaz speaks from that tradition but over-applies it.",
    watchFor: [
      "📣 Eliphaz calling Job to seek God",
      "⚖️ discipline language",
      "🌾 promises of restoration",
      "💬 confident advice",
      "🩹 counsel without enough listening",
    ],
    words: [
      "🩹 **Discipline** can be God's loving correction, but not all suffering is discipline for sin.",
      "🌾 **Harvest imagery** pictures restored life, security, and blessing.",
      "📣 **Seek God** is true counsel, but Eliphaz frames it as if Job is obviously guilty.",
      "⚖️ **Blessed is the one whom God reproves** is later quoted in wisdom tradition, but context still matters.",
    ],
    sections: [
      {
        reference: "Job 5:1-7",
        title: "Trouble Does Not Grow From Nothing",
        verseCallouts: ["**7** man is born to trouble as the sparks fly upward"],
        points: [
          "Eliphaz says fools bring trouble on themselves and that human life is naturally marked by trouble.",
          "He is observing real patterns, but he is too quick to place Job inside the fool category.",
          "Proverbs gives patterns of wisdom and folly. Job reminds us that wisdom patterns are not mechanical vending machines.",
          "The emotional sting is that Eliphaz is making Job's grief sound predictable and deserved.",
          "Not every painful harvest was planted by the sufferer. Be slow before assigning blame.",
        ],
      },
      {
        reference: "Job 5:8-16",
        title: "Seek God",
        verseCallouts: ["**8** As for me, I would seek God"],
        points: [
          "Eliphaz tells Job to seek God, praising God's power to lift the lowly and frustrate the crafty.",
          "The theology is broadly true. God does lift the lowly. But Eliphaz assumes Job needs correction more than comfort.",
          "Hannah praises God for lifting the low and humbling the proud. Eliphaz echoes that truth but aims it poorly.",
          "Job needs God, yes. But he also needs friends who understand that seeking God can include lament.",
          "Good theology must be applied with love. Right words in the wrong posture can still bruise.",
        ],
      },
      {
        reference: "Job 5:17-27",
        title: "The Promise Of A Clean Ending",
        verseCallouts: ["**17** Behold, blessed is the one whom God reproves"],
        points: [
          "Eliphaz says God's discipline wounds but also heals, promising eventual safety, harvest, and peace.",
          "This sounds comforting, but it assumes Job's story is simply discipline leading to restoration if he accepts correction.",
          "Hebrews later teaches God's discipline, but the New Testament also shows righteous suffering for Christ.",
          "The speech offers Job a neat ending before Job has been allowed to honestly wrestle.",
          "Do not rush people to a lesson before you have honored the loss.",
        ],
      },
    ],
    callbacks: [
      "📘 Proverbs and the normal patterns of wisdom.",
      "🎵 Hannah's song about God lifting the lowly.",
      "📖 Hebrews on discipline and New Testament righteous suffering.",
    ],
    emotionalWeight: "Job 5 feels frustrating because Eliphaz says many true things, but his certainty makes the truth feel like a weapon.",
    application: "This chapter teaches us that helping hurting people requires more than correct sentences. It requires discernment, humility, timing, and tenderness.",
    bridge: "Eliphaz has spoken. Job 6 will show Job answering from the pain of being misunderstood.",
  },
  {
    chapter: 6,
    title: "Job Answers From The Weight Of His Pain",
    opening: "Job 6 is Job's first answer to Eliphaz. He does not pretend his words were calm. He explains that his grief is heavier than his friends understand.",
    previous: "Eliphaz tried to fit Job's suffering into a moral formula. Job now pushes back.",
    whyMatters: "This chapter matters because Job teaches us that desperate words often come from desperate pain.",
    history: "Ancient poetry often used images from creation, weather, food, and trade routes to express emotional reality. Job uses those images to defend the weight of his grief.",
    watchFor: [
      "⚖️ grief weighed on scales",
      "🏹 arrows of the Almighty",
      "🥚 tasteless food imagery",
      "🏜️ dry streambeds",
      "💔 friendship disappointment",
    ],
    words: [
      "⚖️ **Weighed** shows Job wants his friends to measure grief before judging speech.",
      "🏹 **Arrows** picture suffering as piercing and terrifying.",
      "🏜️ **Wadi** or seasonal stream can look promising but vanish when needed.",
      "💔 **Kindness** here carries the idea of loyal love a friend owes to the suffering.",
    ],
    sections: [
      {
        reference: "Job 6:1-13",
        title: "My Grief Is Heavier Than You Think",
        verseCallouts: ["**2** Oh that my vexation were weighed"],
        points: [
          "Job says if his grief were weighed, it would be heavier than the sand of the sea.",
          "Ancient scales made weight visible. Job wants his friends to stop judging his words without measuring his pain.",
          "The Psalms often ask God to consider tears and distress. Job is asking for that kind of moral attention.",
          "This is a man trying to explain why his speech sounds wild. The pain is too heavy for neat language.",
          "Before you critique a hurting person's tone, ask whether you have understood the weight they are carrying.",
        ],
      },
      {
        reference: "Job 6:14-23",
        title: "Friends Like Dry Streams",
        verseCallouts: ["**15** My brothers are treacherous as a torrent-bed"],
        points: [
          "Job compares his friends to seasonal streams that disappear when travelers need water most.",
          "In dry lands, a wadi could promise relief but fail in the heat. Job says his friends looked like help but became disappointment.",
          "Israel later learns in the wilderness how desperate water need can become. Dryness is survival language.",
          "Job feels abandoned by the people who came to comfort him.",
          "Friendship is tested when someone needs water, not when the weather is easy.",
        ],
      },
      {
        reference: "Job 6:24-30",
        title: "Show Me Where I Am Wrong",
        verseCallouts: ["**24** Teach me, and I will be silent; make me understand how I have gone astray"],
        points: [
          "Job asks his friends to identify real error instead of making vague accusations.",
          "This is a call for honest justice. If they have a charge, they should speak clearly.",
          "The law later requires truthful witnesses, not suspicion dressed as wisdom.",
          "Job is hurt, but he is not refusing correction. He is refusing baseless accusation.",
          "A faithful rebuke should be specific enough to help, not vague enough to shame.",
        ],
      },
    ],
    callbacks: [
      "🎵 Psalms asking God to attend to tears.",
      "🏜️ wilderness water stories.",
      "⚖️ biblical justice requiring truthful witness.",
    ],
    emotionalWeight: "Job 6 is the sound of someone saying, Please understand the pain before you judge the speech.",
    application: "This chapter teaches that compassion weighs grief before answering it. Real friends do not vanish like dry streams.",
    bridge: "Job has answered his friends. Job 7 will turn more directly toward God with raw honesty about human misery.",
  },
  {
    chapter: 7,
    title: "Why Won't You Leave Me Alone?",
    opening: "Job 7 turns from the friends toward God. Job speaks with shocking honesty about sleepless nights, short life, and feeling watched by God.",
    previous: "Job has told his friends they are failing him. Now he tells God what the suffering feels like.",
    whyMatters: "This chapter matters because biblical prayer can include questions that sound uncomfortable but come from real relationship.",
    history: "Ancient laborers, hired servants, and soldiers knew exhaustion, waiting, and longing for relief. Job uses those images to describe human life under suffering.",
    watchFor: [
      "🛠️ life as hard service",
      "🌙 sleepless nights",
      "💨 life like breath",
      "👁️ feeling watched by God",
      "❓ why have you made me your target",
    ],
    words: [
      "🛠️ **Hard service** can describe military or forced labor, showing life as exhausting duty.",
      "🌙 **Months of emptiness** pictures time dragging without relief.",
      "💨 **Breath** emphasizes life as brief and fragile.",
      "🎯 **Target** shows Job feeling singled out by divine attention.",
    ],
    sections: [
      {
        reference: "Job 7:1-10",
        title: "Life Feels Like Exhausting Labor",
        verseCallouts: ["**3** I am allotted months of emptiness, and nights of misery are apportioned to me"],
        points: [
          "Job compares human life to hard service and describes sleepless nights that feel assigned to him.",
          "In ancient life, hired workers longed for shade and wages. Job longs for relief with the same intensity.",
          "Ecclesiastes also wrestles with the heaviness of labor under the sun.",
          "The emotional texture is exhaustion. Job is not only sad. He is worn down.",
          "Long suffering changes how time feels. Compassion must account for the slowness of pain.",
        ],
      },
      {
        reference: "Job 7:11-16",
        title: "I Will Not Restrain My Mouth",
        verseCallouts: ["**11** I will speak in the anguish of my spirit"],
        points: [
          "Job says he will speak from anguish and asks why God terrifies him with dreams and visions.",
          "This is lament as direct address. Job brings his complaint to God instead of walking away from Him.",
          "The Psalms often speak directly to God with raw questions. Job stands in that tradition of honest prayer.",
          "Job feels cornered even in sleep, as if suffering follows him everywhere.",
          "Honest prayer is still prayer. Bringing anguish to God is different from pretending God is not there.",
        ],
      },
      {
        reference: "Job 7:17-21",
        title: "Why Am I Your Target?",
        verseCallouts: ["**20** Why have you made me your mark?"],
        points: [
          "Job asks why God pays so much attention to fragile humanity and why Job feels like a target.",
          "Job reverses Psalm 8 language. Instead of wonder that God notices man, Job feels crushed by divine attention.",
          "Psalm 8 asks what is man that you are mindful of him. Job asks why that attention feels painful.",
          "This is the confusion of a sufferer who believes God is sovereign but cannot understand His dealings.",
          "Faith can ask God why His nearness feels painful without denying that He is God.",
        ],
      },
    ],
    callbacks: [
      "☀️ Ecclesiastes and exhausting labor under the sun.",
      "🎵 Psalms of direct lament.",
      "👤 Psalm 8 and God's attention to humanity.",
    ],
    emotionalWeight: "Job 7 is raw because Job is not speaking about God from a distance. He is speaking to God from inside pain.",
    application: "This chapter teaches us that God can handle prayers with trembling edges. Reverence does not require fake calm.",
    bridge: "Job has spoken directly to God. Job 8 will bring Bildad's first speech, and the friends will become more severe.",
  },
  {
    chapter: 8,
    title: "Bildad Defends The System",
    opening: "Job 8 introduces Bildad, who responds more sharply than Eliphaz. He defends God's justice but applies it with painful cruelty.",
    previous: "Job has poured out anguish to God. Bildad hears that anguish and decides the main problem is Job's theology.",
    whyMatters: "This chapter matters because a person can defend true doctrine in a way that becomes deeply unloving.",
    history: "Bildad appeals to tradition and the wisdom of previous generations. In ancient cultures, ancestral wisdom carried major authority.",
    watchFor: [
      "⚖️ Bildad defending God's justice",
      "💔 a cruel comment about Job's children",
      "📜 appeal to the fathers",
      "🌿 plant imagery for fragile hope",
      "😬 truth with no tenderness",
    ],
    words: [
      "📜 **Inquire of past generations** means Bildad appeals to inherited wisdom.",
      "⚖️ **Pervert justice** is Bildad's way of saying God cannot be wrong.",
      "🌿 **Papyrus/reed** imagery shows life without God drying up quickly.",
      "🏚️ **House** can mean family line, stability, and legacy.",
    ],
    sections: [
      {
        reference: "Job 8:1-7",
        title: "If Your Children Sinned",
        verseCallouts: ["**4** If your children have sinned against him, he has delivered them into the hand of their transgression"],
        points: [
          "Bildad says God does not pervert justice and suggests Job's children died because of their sin.",
          "This is one of the cruelest moments in the friends' speeches. Bildad takes Job's deepest wound and turns it into a lesson.",
          "Jesus later rejects the assumption that every tragedy is direct punishment for worse sin.",
          "Imagine saying this to a grieving father sitting in ashes. The theology is neat, but the wound is enormous.",
          "Never use God's justice as an excuse to speak carelessly over someone's dead children or deepest grief.",
        ],
      },
      {
        reference: "Job 8:8-19",
        title: "Ask The Old Wisdom",
        verseCallouts: ["**8** inquire, please, of bygone ages"],
        points: [
          "Bildad tells Job to look to ancestral wisdom, using plant images to show the fate of the godless.",
          "Ancient wisdom valued tradition because elders carried memory. But tradition must still be applied rightly.",
          "Proverbs honors instruction from fathers, but Job shows that inherited sayings can be misused.",
          "Bildad sounds confident because he thinks the old categories explain everything.",
          "Respect tradition, but do not let familiar sayings keep you from seeing the person in front of you.",
        ],
      },
      {
        reference: "Job 8:20-22",
        title: "A Conditional Happy Ending",
        verseCallouts: ["**20** Behold, God will not reject a blameless man"],
        points: [
          "Bildad ends by saying God will restore laughter if Job is truly pure.",
          "The statement sounds hopeful, but it is built on the assumption that Job's current suffering proves impurity.",
          "Sarah's laughter came after impossible waiting, but Bildad tries to prescribe laughter without understanding the wound.",
          "Job is being offered restoration as if repentance from hidden guilt is the missing key.",
          "Hope that ignores truth becomes pressure. Real hope has to make room for honest pain.",
        ],
      },
    ],
    callbacks: [
      "🚫 Jesus rejecting simplistic tragedy explanations in Luke 13 and John 9.",
      "📘 Proverbs and inherited wisdom.",
      "😂 Sarah's laughter after long waiting.",
    ],
    emotionalWeight: "Job 8 is painful because Bildad protects his system at the expense of Job's heart.",
    application: "This chapter teaches us that defending God poorly can misrepresent Him. Truth without love can become another form of harm.",
    bridge: "Bildad has made the system sound airtight. Job 9 will show Job agreeing with God's greatness while still feeling unable to plead his case.",
  },
  {
    chapter: 9,
    title: "How Can A Man Answer God?",
    opening: "Job 9 is one of Job's deepest speeches about God's power and the human impossibility of arguing a case before Him.",
    previous: "Bildad has insisted that God is just and Job must fit the system. Job responds by saying God's greatness is exactly why he feels trapped.",
    whyMatters: "This chapter matters because Job believes God is powerful and just, but he cannot understand how to approach Him from the dust.",
    history: "Ancient legal disputes required witnesses, judges, and mediators. Job uses courtroom language because he longs for a fair hearing before God.",
    watchFor: [
      "⚖️ courtroom language",
      "🌌 God's cosmic power",
      "🌊 sea and creation imagery",
      "🧑‍⚖️ the need for a mediator",
      "💔 fear of speaking to God",
    ],
    words: [
      "⚖️ **Contend** means to bring a legal case or dispute.",
      "🌌 **Bear, Orion, Pleiades** are constellations showing God's rule over the heavens.",
      "🧑‍⚖️ **Arbiter** means a mediator who could lay a hand on both parties.",
      "🌊 **Sea** often symbolizes chaos that only God can master.",
    ],
    sections: [
      {
        reference: "Job 9:1-13",
        title: "God Is Too Great To Challenge",
        verseCallouts: ["**4** He is wise in heart and mighty in strength"],
        points: [
          "Job affirms God's wisdom, power, and authority over creation.",
          "This is not unbelief. Job's problem is not that God is too small. It is that God feels too great to approach.",
          "Creation language appears throughout Scripture to show God's unmatched rule.",
          "Job feels tiny beneath the weight of God's greatness.",
          "Sometimes people who ask hard questions still have a very high view of God. Do not mistake anguish for atheism.",
        ],
      },
      {
        reference: "Job 9:14-24",
        title: "Even If I Am Right, How Could I Speak?",
        verseCallouts: ["**15** Though I am in the right, I cannot answer him"],
        points: [
          "Job says he cannot successfully argue his innocence before God because God's power overwhelms him.",
          "Courtroom language shows Job wants justice, but he does not see a way to stand in court with God.",
          "Abraham once asked if the Judge of all the earth would do right. Job is wrestling near that same question from suffering.",
          "The emotional tension is fear mixed with longing. Job wants to speak but feels speech is dangerous.",
          "Faith can believe God is Judge and still ache for a way to be heard.",
        ],
      },
      {
        reference: "Job 9:25-35",
        title: "If Only There Were An Arbiter",
        verseCallouts: ["**33** There is no arbiter between us, who might lay his hand on us both"],
        points: [
          "Job longs for someone who could mediate between him and God.",
          "In ancient disputes, a mediator could help bridge the gap between parties. Job feels there is no one to do that.",
          "The New Testament later announces Christ as mediator between God and man.",
          "Job is reaching for a need the gospel will answer more fully than he can see.",
          "The ache for a mediator is one of the deepest human aches. We need someone who can touch God and us.",
        ],
      },
    ],
    callbacks: [
      "🌌 creation Psalms declaring God's power.",
      "⚖️ Abraham asking about the Judge of all the earth.",
      "✝️ Christ as mediator in the New Testament.",
    ],
    emotionalWeight: "Job 9 feels like standing under a sky too large to measure and still wanting your small cry to matter.",
    application: "This chapter teaches that the longing to be heard before God is holy. Job's ache points toward the need for mediation, mercy, and presence.",
    bridge: "Job longs for a mediator but does not have one in view yet. Job 10 will turn into a personal plea about why God made him only to crush him.",
  },
];

const QUICK_JOB_TOPICS = [
  "Job Questions Why God Made Him",
  "Zophar Speaks With Harsh Certainty",
  "Job Says His Friends Are Miserable Comforters",
  "Job Longs For Hope Beyond The Grave",
  "Eliphaz Accuses Job More Directly",
  "Job Cries Out For A Witness In Heaven",
  "Bildad Describes The Wicked",
  "Job Says My Redeemer Lives",
  "Zophar Warns About The Wicked",
  "Job Says The Wicked Often Prosper",
  "Eliphaz Makes False Charges",
  "Job Longs To Find God",
  "Job Wrestles With Hidden Injustice",
  "Bildad Speaks Briefly About Human Smallness",
  "Job Answers With God's Majesty",
  "Job Holds Fast His Integrity",
  "Job Reflects On Wisdom",
  "Job Remembers Former Honor",
  "Job Describes Present Humiliation",
  "Job Makes His Final Defense",
  "Elihu Begins Speaking",
  "Elihu Challenges Job",
  "Elihu Defends God's Justice",
  "Elihu Says Suffering Can Instruct",
  "Elihu Points To God's Greatness",
  "God Answers From The Storm",
  "God Questions Job About Creation",
  "God Speaks Of Behemoth",
  "God Speaks Of Leviathan",
  "Job Humbles Himself",
  "God Restores Job",
];

const JOB_CHAPTER_VERSE_COUNTS: Record<number, number> = {
  10: 22,
  11: 20,
  12: 25,
  13: 28,
  14: 22,
  15: 35,
  16: 22,
  17: 16,
  18: 21,
  19: 29,
  20: 29,
  21: 34,
  22: 30,
  23: 17,
  24: 25,
  25: 6,
  26: 14,
  27: 23,
  28: 28,
  29: 25,
  30: 31,
  31: 40,
  32: 22,
  33: 33,
  34: 37,
  35: 16,
  36: 33,
  37: 24,
  38: 41,
  39: 30,
  40: 24,
  41: 34,
  42: 17,
};

function getSectionRanges(chapter: number) {
  const total = JOB_CHAPTER_VERSE_COUNTS[chapter] ?? 30;
  const firstEnd = Math.max(1, Math.ceil(total / 3));
  const secondEnd = Math.max(firstEnd + 1, Math.ceil((total * 2) / 3));

  return [
    { start: 1, end: firstEnd },
    { start: Math.min(firstEnd + 1, total), end: Math.min(secondEnd, total) },
    { start: Math.min(secondEnd + 1, total), end: total },
  ];
}

function buildGeneratedJobNote(chapter: number, title: string): JobChapterNote {
  const friendChapters = new Set([11, 15, 18, 20, 22, 25, 32, 33, 34, 35, 36, 37]);
  const godSpeaks = chapter >= 38 && chapter <= 41;
  const restoration = chapter === 42;
  const wisdom = chapter === 28;
  const finalDefense = chapter >= 29 && chapter <= 31;
  const ranges = getSectionRanges(chapter);

  const voice = godSpeaks
    ? "God finally speaks, not by giving Job a neat explanation, but by opening creation wider than Job's suffering had allowed him to see."
    : restoration
      ? "The story reaches restoration, but not in a way that makes the suffering small or turns the book into a simple formula."
      : friendChapters.has(chapter)
        ? "One of the speakers tries to defend a clean system of justice, but the speech keeps showing how dangerous certainty can become without compassion."
        : finalDefense
          ? "Job gives part of his final defense, remembering who he was, naming what he has lost, and placing his integrity before God."
          : wisdom
            ? "The chapter slows down to ask where wisdom is found when human beings can mine the earth but cannot manufacture understanding."
            : "Job keeps wrestling honestly with pain, God, justice, friendship, and the mystery of what he cannot understand.";

  const pressure = godSpeaks
    ? "The pressure shifts from debate to encounter."
    : restoration
      ? "The pressure shifts from argument to repentance, prayer, and restoration."
      : friendChapters.has(chapter)
        ? "The pressure comes through words that sound confident but do not carry Job's pain carefully."
        : "The pressure comes from the gap between what Job believes about God and what his life currently feels like.";

  return {
    chapter,
    title,
    opening: `Job ${chapter} continues the long wrestling match between suffering and wisdom. ${voice}`,
    previous:
      chapter === 10
        ? "Job has just said he longs for an arbiter between himself and God. Now his complaint becomes even more personal."
        : `By this point in the book, Job's suffering has become a conversation. Every chapter is adding pressure to the question of whether faith can stay honest when answers are not simple.`,
    whyMatters:
      "This chapter matters because it refuses to let suffering become shallow. The Bible is slowing us down so we can see grief, theology, pride, friendship, and humility more clearly.",
    history:
      "Job's world assumes that God is just, humans are fragile, family honor matters, public reputation matters, and suffering raises theological questions in the community. The speeches use poetry, courtroom language, creation imagery, legal metaphors, and wisdom sayings because Job is not only losing things. He is fighting for meaning.",
    watchFor: [
      "💬 who is speaking and what they believe pain proves",
      "⚖️ how justice language shows up in the chapter",
      "💔 where grief becomes sharper than explanation",
      "🧠 where wisdom is real but incomplete",
      "🙏 where Job keeps reaching toward God even when confused",
    ],
    words: [
      "⚖️ **Justice** matters because Job and his friends all believe God is just, but they disagree about how that justice is working.",
      "💬 **Speech** matters because words become either comfort or injury in this book.",
      "🧠 **Wisdom** is not quick advice. In Job, wisdom means learning to fear God when the full explanation is hidden.",
      "🌪️ **Mystery** does not mean God is absent. It means human beings cannot reduce God's rule to a small formula.",
    ],
    sections: [
      {
        reference: `Job ${chapter}:${ranges[0].start}-${ranges[0].end}`,
        title: "The Chapter Opens The Tension",
        verseCallouts: [`**${ranges[0].start}** Job ${chapter} begins by pulling us back into the tension of suffering, wisdom, and the fear of God.`],
        points: [
          `The chapter opens with ${friendChapters.has(chapter) ? "a speaker trying to explain Job's suffering" : godSpeaks ? "God drawing Job's attention beyond the debate" : restoration ? "Job responding to God and the story moving toward repair" : "Job pressing deeper into the ache of his condition"}.`,
          "In the ancient world, words spoken in grief carried public weight. A person's reputation, righteousness, and relationship with God were all being interpreted by the community.",
          "Genesis has already shown families misreading suffering, from Joseph's brothers to Jacob's grief. Job brings that same danger into wisdom literature.",
          pressure,
          "This teaches us to slow down before speaking. The first question is not, How do I win the argument? It is, What is God showing me about wisdom, humility, and care?",
        ],
      },
      {
        reference: `Job ${chapter}:${ranges[1].start}-${ranges[1].end}`,
        title: "The Deeper Issue Comes Into View",
        verseCallouts: [`**${ranges[1].start}** The middle of Job ${chapter} keeps showing that the issue is deeper than one sentence can solve.`],
        points: [
          "The chapter keeps pressing the difference between simple answers and faithful wisdom.",
          "For Job's friends, suffering is easy to categorize. For Job, suffering is something he has to survive while still reaching toward God.",
          "The Psalms give us this same pattern: honest complaint, deep confusion, and continued address to God.",
          "Emotionally, this is where the book refuses to flatten anyone. Job is hurting. The friends are trying to defend God. But defending God without listening well becomes dangerous.",
          "The lesson is not that theology does not matter. The lesson is that theology must be humble enough to sit in the ashes before it speaks over them.",
        ],
      },
      {
        reference: `Job ${chapter}:${ranges[2].start}-${ranges[2].end}`,
        title: "What This Chapter Adds To The Journey",
        verseCallouts: [`**${ranges[2].start}** Job ${chapter} adds another layer to the question of how faith survives what it cannot explain.`],
        points: [
          "By the end of the chapter, the book has pushed the reader to examine assumptions about suffering.",
          "In their world, as in ours, people wanted suffering to make immediate sense. Job keeps showing that some pain cannot be explained quickly without doing damage.",
          "Jesus later enters innocent suffering fully. The Bible's answer to suffering is not a slogan but a Savior who comes near.",
          "This is where the emotional weight lands. Job wants God, but he also wants truth. He refuses to pretend.",
          "Faith does not have to choose between honesty and reverence. Job is teaching us how hard, and how necessary, it is to hold both.",
        ],
      },
    ],
    callbacks: [
      "🕯️ Joseph suffering before the purpose is visible.",
      "🎵 Psalms of lament giving language to pain.",
      "✝️ Jesus entering innocent suffering rather than explaining it from a distance.",
    ],
    emotionalWeight:
      "This chapter adds another weight to the conversation. The reader can feel how exhausting repeated explanations become when the wound underneath has not been healed.",
    application:
      "This chapter asks us to become slower, wiser, and more tender. Not every hurting person needs a lecture. Sometimes they need truth with tears, presence with patience, and hope without pressure.",
    bridge:
      chapter === 42
        ? "Job's story ends with restoration, but it leaves us wiser, quieter, and more careful with suffering."
        : `Job ${chapter + 1} will keep moving the conversation forward, showing another angle of grief, wisdom, accusation, or encounter with God.`,
  };
}

for (let index = 0; index < QUICK_JOB_TOPICS.length; index += 1) {
  const chapter = index + 10;
  JOB_NOTES.push(buildGeneratedJobNote(chapter, QUICK_JOB_TOPICS[index]));
}

JOB_NOTES.sort((a, b) => a.chapter - b.chapter);

export const FAITH_OF_JOB_CHAPTERS = JOB_NOTES.map(({ chapter, title }) => ({
  chapter,
  title,
}));

export const FAITH_OF_JOB_DEEP_NOTES = JOB_NOTES.map(renderNote);
