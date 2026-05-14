type EstherSection = {
  reference: string;
  title: string;
  verseCallouts: string[];
  points: string[];
};

type EstherChapterNote = {
  chapter: number;
  title: string;
  opening: string;
  previous: string;
  whyMatters: string;
  history: string;
  watchFor: string[];
  words: string[];
  sections: EstherSection[];
  callbacks: string[];
  emotionalWeight: string;
  application: string;
  bridge: string;
};

function renderVerseRange(reference: string) {
  const match = reference.match(/^Esther\s+\d+:(.+)$/);
  return match ? `**${match[1]}**` : reference;
}

function renderList(items: string[]) {
  return items.map((item) => `* ${item}`).join("\n\n");
}

function renderSection(section: EstherSection) {
  return `# 📍 ${renderVerseRange(section.reference)} — ${section.title}

${section.verseCallouts.length ? `## Key Verse${section.verseCallouts.length > 1 ? "s" : ""}

${section.verseCallouts.map((verse) => `> ${verse}`).join("\n>\n")}` : ""}

Let's slow down here because this scene is doing more than moving the plot forward.

## What Happened

${section.points[0]}

## What It Meant Then

${section.points[1]}

In their world, this was not casual. Court decisions, public honor, royal law, family identity, and ethnic survival were all tied together in ways modern readers can miss if we move too fast.

## Where We Have Seen This Before

${section.points[2]}

The Bible keeps showing us that God can preserve His people through moments that look ordinary from the outside but are loaded with providence underneath.

## What Is Happening Emotionally

${section.points[3]}

Picture the scene. The room may look controlled, but underneath it there is fear, pride, pressure, silence, or courage rising. Esther is not a flat character in a clean Bible poster. She is a young Jewish woman living under empire, carrying risk in her body and identity.

## What This Teaches Us Now

${section.points[4]}`;
}

function renderNote(note: EstherChapterNote) {
  return `${note.opening}

${note.previous}

${note.whyMatters}

Esther is one of the strangest books in the Bible because God's name is never directly mentioned.

But that does not mean God is absent.

It means the book trains us to notice providence.

Not fireworks.

Not a voice from the sky.

Not a prophet standing in the palace saying, "Thus says the Lord."

Just timing.

Just decisions.

Just a sleepless night.

Just a hidden identity.

Just one woman positioned in a place she did not fully understand yet.

That detail matters.

Because a lot of life feels like Esther.

God feels quiet.

The pressure feels loud.

The people with power do not always look righteous.

And still, underneath the surface, God is working.

---

# 🏛️ The World Behind Esther ${note.chapter}

${note.history}

This is Persian Empire territory.

Not Israel at its strongest.

Not Jerusalem with David on the throne.

Not the temple at the center of public life.

God's people are scattered.

Some Jews have returned to the land after exile, but many remain spread across the empire.

That means Esther's story is not happening from the center of Jewish power.

It is happening from inside a foreign palace.

And that makes every decision heavier.

---

# 🔎 What To Watch For

${renderList(note.watchFor)}

---

# 📖 Words And Details That Matter

${renderList(note.words)}

These are not vocabulary words just to sound smart.

They are doorways into the story.

When you understand the court, the law, the feasts, the honor system, the exile, and the danger of hidden identity, Esther stops feeling like a fairy tale and starts feeling like what it really is.

A survival story.

A providence story.

A courage story.

---

${note.sections.map(renderSection).join("\n\n---\n\n")}

---

# 🔁 Bible Callbacks

${renderList(note.callbacks)}

Esther is not disconnected from the rest of Scripture.

This book is carrying the same old question that has been moving through Genesis, Exodus, Kings, exile, and return.

Will God preserve His covenant people?

Will the seed promise survive?

Will the enemies of God's people have the final word?

Esther answers those questions in a hidden way.

Not with a parted sea.

With providence.

---

# 💔 The Emotional Weight

${note.emotionalWeight}

One of the mistakes we make with Esther is reading it too cleanly.

We already know the ending, so we forget the fear.

But Esther did not live this story knowing chapter 10 was coming.

Mordecai did not tear his clothes as a teaching illustration.

The Jews did not receive Haman's decree and say, "This will make a great holiday later."

They were afraid.

They were exposed.

They were living under an empire where a signed decree could turn neighbors into enemies.

That is why the courage in this book matters.

Not because nobody was scared.

Because they moved faithfully while fear was still real.

---

# 🧠 What This Teaches Us Now

${note.application}

Esther teaches us that position is not only privilege.

Sometimes position becomes responsibility.

Sometimes the access God gives you is not just for comfort, status, or survival.

Sometimes it is for the moment when silence becomes dangerous.

---

# 🧠 Pause And Reflect

Esther ${note.chapter} is not meant to be rushed.

It reveals how power works, how fear spreads, how identity can be hidden under pressure, and how God can move even when His name is not spoken out loud.

${note.bridge}

Before moving on, sit with the chapter.

Where do you see pride?

Where do you see fear?

Where do you see courage beginning to form?

And where might God be quietly arranging something you cannot fully see yet?`;
}

const ESTHER_NOTES: EstherChapterNote[] = [
  {
    chapter: 1,
    title: "The Feast, Vashti, and the Empty Throne",
    opening:
      "Esther 1 opens with the empire showing off. Before Esther ever appears, we are dropped into a palace filled with wealth, wine, pride, public image, and fragile power.",
    previous:
      "The larger Bible story has already passed through exile. Babylon rose. Persia took its place. God's people are scattered across foreign lands, trying to survive under kings who do not worship the Lord.",
    whyMatters:
      "This chapter matters because the throne beside Ahasuerus becomes empty before anyone knows why that matters. Esther is not on the page yet, but the space she will one day fill is being opened.",
    history:
      "Ahasuerus is usually identified with Xerxes I, king of Persia. His empire stretched across many provinces, and royal banquets were political theater. A feast was not just food. It was propaganda. It displayed wealth, loyalty, hierarchy, military confidence, and the king's ability to gather power around himself.",
    watchFor: [
      "🍷 the repeated feasts and how much public image matters",
      "👑 Vashti's refusal and how quickly personal pride becomes political panic",
      "📜 the royal advisors turning one household conflict into empire policy",
      "🚪 the empty queen's position that prepares the way for Esther",
    ],
    words: [
      "🏛️ **Susa** was one of the Persian royal centers, a place of administration, wealth, and imperial control.",
      "🍽️ **Feast** meant more than celebration. It was a public display of power.",
      "👑 **Queen Vashti** was not only a wife. She represented royal dignity in a court obsessed with honor.",
      "📜 **Decree** in Persia carried terrifying force because royal writings could become fixed law.",
    ],
    sections: [
      {
        reference: "Esther 1:1-9",
        title: "The Empire Shows Off",
        verseCallouts: [
          "**4** he showed the riches of his royal glory and the splendor and pomp of his greatness for many days",
        ],
        points: [
          "The chapter begins with Ahasuerus displaying the empire. The feast is long, expensive, and public. The king wants everyone to see what he has built and what he controls.",
          "Ancient kings used banquets to secure loyalty. Nobles, officials, military leaders, and provincial powers were gathered into one royal atmosphere where everyone could feel the weight of Persia's greatness.",
          "Babel tried to make a name through human greatness. Persia is doing something similar on an imperial scale. Human power keeps trying to make itself look permanent.",
          "There is a hollowness under all the beauty. The palace is full, but the room is spiritually empty. Wealth is loud, but wisdom is missing.",
          "Power that must constantly display itself is often more fragile than it looks. Esther begins by showing us a king who can command provinces but cannot control his own pride.",
        ],
      },
      {
        reference: "Esther 1:10-12",
        title: "Vashti Refuses",
        verseCallouts: ["**12** But Queen Vashti refused to come at the king's command"],
        points: [
          "The king commands Vashti to appear, and she refuses. The text does not give us every motive, but it does show the effect: the king burns with anger.",
          "In a world built on public honor, refusal in front of guests was humiliating. This was not a private argument. It happened inside the machinery of royal image.",
          "Genesis has already shown family disorder spreading outward. Here, a royal household conflict becomes an empire problem because proud people often make personal wounds bigger than they need to be.",
          "Vashti's refusal creates tension. The king's command, her dignity, the public setting, and the advisors' fear all collide in one moment.",
          "Not every opening God uses begins in a clean spiritual scene. Sometimes the stage is set through messy pride, panic, and decisions nobody in the room understands yet.",
        ],
      },
      {
        reference: "Esther 1:13-22",
        title: "A Household Issue Becomes A Royal Law",
        verseCallouts: [
          "**19** let a royal order go out from him, and let it be written among the laws of the Persians and the Medes so that it may not be repealed",
        ],
        points: [
          "The advisors frame Vashti's refusal as a threat to male authority across the empire. One queen's decision becomes, in their minds, a danger to every household.",
          "Persian law is presented as weighty and difficult to reverse. That detail will matter later when Haman's decree cannot simply be erased.",
          "The Bible often lets foolish systems expose themselves. This scene shows how insecure power can turn fear into policy.",
          "The emotional center is wounded pride. The king is embarrassed, and the advisors are afraid of losing control.",
          "When pride leads, people overreact. Esther 1 warns us that public image can become an idol that makes people create damage far beyond the original moment.",
        ],
      },
    ],
    callbacks: [
      "🏙️ Babel tried to gather power and make a name without God.",
      "👑 Israel wanted kings like the nations, but Esther shows how unstable pagan kings can be.",
      "📜 Persian law here prepares us for the irreversible decree problem later.",
    ],
    emotionalWeight:
      "The chapter feels extravagant, but it is also tense. Everyone is performing. Everyone is watching. One refusal exposes the insecurity of the whole court.",
    application:
      "Esther 1 asks us to look at the difference between real authority and insecure control. If your identity depends on everyone obeying your image, one refusal can shake you. Godly strength does not need to panic like that.",
    bridge:
      "By the end of the chapter, Vashti is removed and a royal space is open. Esther 2 will introduce the orphan girl who is about to be pulled into that space.",
  },
  {
    chapter: 2,
    title: "An Orphan Girl in the Palace",
    opening:
      "Esther 2 brings Esther into the story, but not as someone powerful. She enters as an orphan, a Jewish exile, and a young woman pulled into a system she did not create.",
    previous:
      "Vashti has been removed. The empire has created a vacancy beside the king. What looked like palace drama now becomes the doorway for Esther's rise.",
    whyMatters:
      "This chapter matters because Esther's rise begins in vulnerability. Favor is real, but so is danger. She is lifted into the palace while hiding the very identity that will later define her courage.",
    history:
      "The Persian royal harem was a controlled court system. Young women brought into it entered a world of preparation, surveillance, hierarchy, and limited agency. This was not a modern romance story. It was a political and royal structure where women could be honored and still deeply vulnerable.",
    watchFor: [
      "👧 Esther's orphanhood and hidden Jewish identity",
      "🧔 Mordecai's role as guardian and watcher",
      "🏛️ the palace system that gives Esther favor but not full control",
      "📜 Mordecai uncovering a plot that will matter later",
    ],
    words: [
      "👧 **Hadassah** is Esther's Hebrew name, connecting her to Jewish identity.",
      "🌟 **Esther** is the name used in the Persian court setting.",
      "🧴 **Preparation** in the harem involved beauty treatments, but also control and assimilation into palace life.",
      "📚 **Chronicles** were royal records. Mordecai's loyalty being written down becomes providence waiting on a shelf.",
    ],
    sections: [
      {
        reference: "Esther 2:1-4",
        title: "The Search Begins",
        verseCallouts: ["**4** let the young woman who pleases the king be queen instead of Vashti"],
        points: [
          "The king's servants propose a search for a new queen. The empire turns a royal vacancy into a system for gathering women from across the provinces.",
          "In that world, royal marriage was tied to power, beauty, politics, and dynasty. The women involved were not simply choosing a dating contest.",
          "Genesis repeatedly shows women caught inside male decisions, from Sarah in Egypt to Hagar in Abraham's household. Esther stands in that long line of women whose lives are shaped by systems bigger than them.",
          "The scene carries vulnerability. A young woman's future can be redirected by royal command without her controlling the terms.",
          "God can work in situations that are not ideal without calling the situation itself good. Providence does not sanitize broken systems; it shows God's power to work even there.",
        ],
      },
      {
        reference: "Esther 2:5-11",
        title: "Esther and Mordecai",
        verseCallouts: [
          "**7** He was bringing up Hadassah, that is Esther, the daughter of his uncle, for she had neither father nor mother",
        ],
        points: [
          "Esther is introduced through loss and care. She has no parents, and Mordecai has raised her as his own daughter.",
          "Family guardianship mattered deeply in ancient culture. Mordecai's care protects Esther's identity and future in a world where orphanhood could leave someone exposed.",
          "Joseph was also separated from family and carried into a foreign power structure. Esther's story echoes that pattern: a Hebrew life placed inside Gentile power for a purpose not yet visible.",
          "There is tenderness here. Mordecai does not disappear after Esther enters the palace. He walks near the court daily to learn how she is.",
          "Hidden seasons still matter. Esther's public courage later is connected to the private care, formation, and identity that came before it.",
        ],
      },
      {
        reference: "Esther 2:12-18",
        title: "Esther Becomes Queen",
        verseCallouts: ["**17** the king loved Esther more than all the women, and she won grace and favor in his sight"],
        points: [
          "Esther finds favor and becomes queen. The crown is placed on her head, and the orphan girl from exile is lifted into royal visibility.",
          "Favor in the court did not erase danger. It gave access, but access under empire always came with risk.",
          "Joseph found favor in Potiphar's house and prison. Daniel found favor in Babylon. Esther now finds favor in Persia. The pattern is not luck; it is providence.",
          "The emotional tension is complicated. Esther rises, but her Jewish identity remains hidden. She is honored and concealed at the same time.",
          "Favor is not only for comfort. Sometimes favor positions you for responsibility before you understand what that responsibility will cost.",
        ],
      },
      {
        reference: "Esther 2:19-23",
        title: "A Forgotten Act of Loyalty",
        verseCallouts: ["**23** it was recorded in the book of the chronicles in the presence of the king"],
        points: [
          "Mordecai uncovers a plot against the king, reports it through Esther, and saves the king's life. Then the moment is written down.",
          "Royal records mattered because ancient kingdoms tracked loyalty, threats, taxes, military matters, and honors owed.",
          "Joseph's forgotten service in prison prepared for a later remembering. Mordecai's forgotten loyalty will do the same.",
          "The scene feels quiet, almost like a side note. But the quiet detail is loaded.",
          "Some faithful acts are not rewarded immediately because God is saving the timing for later.",
        ],
      },
    ],
    callbacks: [
      "⛓️ Joseph rose inside Egypt through favor and wisdom.",
      "🏛️ Daniel later serves faithfully under foreign kings.",
      "📚 Forgotten records will become the hinge of Esther 6.",
    ],
    emotionalWeight:
      "Esther 2 is beautiful and uncomfortable at the same time. Esther receives favor, but she is not in a simple fairytale. She is an orphan in exile navigating a powerful world with hidden identity.",
    application:
      "This chapter teaches that God can place purpose inside complicated circumstances. You may not control every room you are placed in, but you can still carry identity, wisdom, and faithfulness there.",
    bridge:
      "Esther has the crown, but the threat has not appeared yet. Esther 3 will introduce Haman and show why her hidden position matters.",
  },
  {
    chapter: 3,
    title: "Haman's Pride and the Death Decree",
    opening:
      "Esther 3 is where the story darkens. The palace no longer feels like only a place of favor. It becomes the place where hatred receives legal power.",
    previous:
      "Esther is queen, Mordecai has saved the king, and the act has been recorded but not rewarded. The story now shifts to a new official whose pride becomes deadly.",
    whyMatters:
      "This chapter matters because one man's wounded ego becomes a genocide plot. Esther's hidden identity is no longer just personal. It is connected to the survival of her people.",
    history:
      "Empires could turn prejudice into policy with terrifying speed. Haman's proposal includes money, royal authorization, written decrees, and messengers across the provinces. This is organized destruction, not private dislike.",
    watchFor: [
      "📈 Haman's promotion and hunger for public honor",
      "🧎 Mordecai's refusal to bow",
      "🔥 Haman's hatred expanding from one man to all Jews",
      "🎲 the casting of Pur, the lot",
      "📜 the decree turning hate into law",
    ],
    words: [
      "🎲 **Pur** means lot. Haman uses it to choose the date of destruction, but providence will overrule the lot.",
      "🧬 **Agagite** may connect Haman to the Amalekite enemy line, deepening the old hostility toward Israel.",
      "📜 **Edict** means hatred has moved from emotion to enforceable policy.",
      "💰 **Ten thousand talents** shows Haman is willing to fund destruction with massive wealth.",
    ],
    sections: [
      {
        reference: "Esther 3:1-6",
        title: "A Proud Man Cannot Handle Refusal",
        verseCallouts: ["**5** Haman was filled with fury"],
        points: [
          "Haman is promoted, and everyone is commanded to bow. Mordecai refuses, and Haman's pride cannot survive being denied.",
          "Bowing in royal courts signaled honor, submission, and recognition of rank. Mordecai's refusal is public and repeated.",
          "The conflict may echo Israel's long hostility with Amalek. Saul failed to fully deal with Agag, and now an Agagite rises in Persia against the Jews.",
          "Haman's anger is outsized. He is not satisfied with punishing Mordecai. His wounded pride wants a whole people erased.",
          "Pride becomes dangerous when it treats refusal as a threat to identity. Haman shows what happens when ego gets authority.",
        ],
      },
      {
        reference: "Esther 3:7-11",
        title: "The Lot Is Cast",
        verseCallouts: ["**7** they cast Pur, that is, they cast lots, before Haman day after day"],
        points: [
          "Haman casts lots to choose the timing for his plan. The date is selected through a pagan method of seeking fate or divine direction.",
          "Ancient cultures often used lots to make decisions or discern timing. Haman thinks chance, superstition, and power are on his side.",
          "Proverbs says the lot is cast into the lap, but every decision is from the Lord. Esther will prove that Haman does not control the calendar.",
          "There is cold calculation here. Haman is not acting in a burst of emotion only. He is planning.",
          "God can overrule the dates people set against you. Haman chooses a day for destruction, but God will turn that day into remembrance.",
        ],
      },
      {
        reference: "Esther 3:12-15",
        title: "Death Becomes Law",
        verseCallouts: [
          "**13** letters were sent by couriers to all the king's provinces with instruction to destroy, to kill, and to annihilate all Jews",
        ],
        points: [
          "The decree goes out across the empire. What began as Haman's rage is now written into law and sent into every province.",
          "Persian administration was organized and far-reaching. A written decree could travel through official channels and shape the lives of people who had never met Haman.",
          "Pharaoh once ordered Hebrew sons killed. Now Haman seeks destruction of all Jews. The enemy's strategy changes form, but the covenant threat remains.",
          "The city of Susa is thrown into confusion while the king and Haman sit down to drink. That contrast is brutal.",
          "Some people can sit comfortably after creating pain for others. Esther 3 calls that darkness what it is.",
        ],
      },
    ],
    callbacks: [
      "🐍 The seed of the serpent keeps opposing the people through whom promise comes.",
      "👑 Saul and Agag form a background shadow behind Mordecai and Haman.",
      "📜 Pharaoh's death command in Exodus echoes through Haman's decree.",
    ],
    emotionalWeight:
      "This chapter feels terrifying because the threat becomes official. Families across the empire will receive news that their lives have an expiration date written by a man who hates them.",
    application:
      "Esther 3 warns us that unchecked pride can become cruelty. It also reminds us not to confuse written threats with final authority. Haman has ink, but God still has providence.",
    bridge:
      "The decree is out, and the Jews are in danger. Esther 4 will show grief entering the streets and courage beginning to wake up in the palace.",
  },
  {
    chapter: 4,
    title: "For Such a Time as This",
    opening:
      "Esther 4 is the heart of the book. This is where hidden identity, public grief, fear, fasting, and courage all meet in one chapter.",
    previous:
      "Haman's decree has gone out. The city is confused, the king is unaware of the full cost, and Esther is still inside the palace.",
    whyMatters:
      "This chapter matters because Esther must decide whether position will become responsibility. She can stay silent and hope palace walls protect her, or she can risk everything for her people.",
    history:
      "Approaching a Persian king unsummoned could mean death unless the king extended the golden scepter. Royal access was controlled to protect the king and preserve court order. Esther is not exaggerating the risk.",
    watchFor: [
      "🖤 Mordecai mourning in sackcloth",
      "📨 messages moving between the gate and palace",
      "⚠️ Esther naming the danger of approaching the king",
      "🔥 Mordecai's challenge about providence and responsibility",
      "🙏 Esther calling for a fast before action",
    ],
    words: [
      "🧵 **Sackcloth** was rough mourning clothing, a public sign of grief and distress.",
      "👑 **Golden scepter** represented the king's permission to live and approach.",
      "⏳ **For such a time as this** means position may be connected to a specific moment of responsibility.",
      "🙏 **Fast** shows Esther's courage is spiritual, communal, and dependent, not just strategic.",
    ],
    sections: [
      {
        reference: "Esther 4:1-3",
        title: "Grief In The Streets",
        verseCallouts: ["**1** Mordecai tore his clothes and put on sackcloth and ashes"],
        points: [
          "Mordecai responds to the decree with public mourning. Across the provinces, Jews fast, weep, and lament.",
          "Sackcloth and ashes were embodied grief. People did not only feel sorrow privately; they wore it publicly.",
          "Jacob tore his clothes when he believed Joseph was dead. Public grief has a long biblical language.",
          "This is panic, sorrow, and righteous alarm. Mordecai understands the decree is not political noise. It is a death sentence.",
          "Faith does not require pretending danger is small. Sometimes the first faithful response is to tell the truth about how serious the moment is.",
        ],
      },
      {
        reference: "Esther 4:4-11",
        title: "The Palace Learns The Pain",
        verseCallouts: ["**11** if any man or woman goes to the king inside the inner court without being called, there is but one law—to be put to death"],
        points: [
          "Esther first hears that Mordecai is distressed, then learns the reason. The pain outside the palace finally reaches inside.",
          "The palace insulated Esther from public grief, but it could not keep her separate forever. Her identity connects her to people beyond the palace walls.",
          "Moses had to choose whether to identify with his suffering people or the comfort of Egypt. Esther faces her own version of that question.",
          "Esther is afraid, and her fear is reasonable. The law says she could die if she goes in unsummoned.",
          "Courage begins with honesty. Esther does not pretend the door is easy. She names the danger before she chooses obedience.",
        ],
      },
      {
        reference: "Esther 4:12-14",
        title: "Mordecai's Challenge",
        verseCallouts: ["**14** who knows whether you have not come to the kingdom for such a time as this?"],
        points: [
          "Mordecai tells Esther not to assume she will escape because she is in the palace. Then he names the possibility that her position has purpose.",
          "This is not fatalism. Mordecai believes deliverance will come, but he also understands Esther may be called to participate in it.",
          "God told Abraham all families would be blessed through his line. If the Jews are destroyed, the covenant story appears threatened.",
          "The line is heavy because it confronts comfort. Esther's crown cannot become an excuse for silence.",
          "Sometimes God gives access before He reveals the assignment. When the assignment becomes clear, the question is whether we will use the access faithfully.",
        ],
      },
      {
        reference: "Esther 4:15-17",
        title: "If I Perish, I Perish",
        verseCallouts: ["**16** I will go to the king, though it is against the law, and if I perish, I perish"],
        points: [
          "Esther calls for a three-day fast and commits to going before the king. The hidden queen becomes openly courageous.",
          "Fasting shows dependence. Esther is not trusting beauty, charm, or strategy alone. She wants her people seeking God together.",
          "Daniel and his friends also lived faithfully under foreign power through prayer and disciplined dependence. Esther's fast fits that exile faith.",
          "Her words are not fearless. They are resolved. She understands death is possible and moves anyway.",
          "Real courage is not the absence of fear. It is obedience becoming stronger than fear.",
        ],
      },
    ],
    callbacks: [
      "🧵 Jacob tearing clothes over Joseph's supposed death.",
      "🏛️ Moses choosing identification with God's people over Egyptian comfort.",
      "🙏 Exile faith in Daniel shows dependence under empire.",
    ],
    emotionalWeight:
      "This is the chapter where Esther stops being protected by distance. The suffering of her people becomes her responsibility too, and the cost of action becomes painfully clear.",
    application:
      "Esther 4 asks what you will do when God shows you that your place, access, relationship, voice, or influence is not only for you. Some moments require courage that has been prepared in hiddenness.",
    bridge:
      "Esther has chosen to go in. Esther 5 will show her walking into the inner court dressed in royalty and risk.",
  },
  {
    chapter: 5,
    title: "The Scepter, The Banquet, and The Gallows",
    opening:
      "Esther 5 is suspense in slow motion. Esther steps into danger, receives favor, and then moves with surprising patience instead of rushing the reveal.",
    previous:
      "Esther has called for fasting and decided to approach the king even though it could cost her life.",
    whyMatters:
      "This chapter matters because it shows courage and wisdom working together. Esther is brave enough to enter, but wise enough to wait for the right moment to speak.",
    history:
      "Royal banquets were spaces of diplomacy, favor, persuasion, and controlled conversation. Esther's invitation is not random hospitality. She is shaping the environment where truth will eventually be spoken.",
    watchFor: [
      "👗 Esther putting on royal robes",
      "👑 the king extending the golden scepter",
      "🍽️ Esther inviting the king and Haman to banquets",
      "😤 Haman's pride collapsing into rage at Mordecai",
      "🪵 the gallows being prepared",
    ],
    words: [
      "👗 **Royal robes** signal Esther stepping into her queenly role, not hiding from it.",
      "👑 **Scepter** is life extended where death was legally possible.",
      "🍽️ **Banquet** becomes Esther's strategy space.",
      "🪵 **Gallows** likely refers to a high wooden stake or execution structure, a public symbol of humiliation.",
    ],
    sections: [
      {
        reference: "Esther 5:1-2",
        title: "Esther Enters The Inner Court",
        verseCallouts: ["**2** she won favor in his sight, and he held out to Esther the golden scepter"],
        points: [
          "Esther dresses in royal robes and stands where she can be seen. The king extends the scepter, and her life is spared.",
          "The inner court was dangerous space without invitation. Esther's presence there is an act of courage, not ceremony.",
          "Joseph shaved and changed clothes before Pharaoh. Clothing often marks a turning point in biblical narratives.",
          "You can feel the breath held in the room. One gesture from the king determines whether Esther lives.",
          "Sometimes obedience means standing in the place where rejection is possible and trusting God with the outcome.",
        ],
      },
      {
        reference: "Esther 5:3-8",
        title: "Esther Does Not Rush",
        verseCallouts: ["**4** If it please the king, let the king and Haman come today to a feast that I have prepared"],
        points: [
          "The king offers Esther up to half the kingdom, but she invites him and Haman to a banquet instead of immediately naming the crisis.",
          "In royal court culture, timing and setting mattered. Esther knows the truth needs the right room.",
          "Nehemiah later waits and chooses his words carefully before a Persian king. Wisdom under empire often requires timing.",
          "Esther is carrying enormous pressure, yet she does not panic-speak. She moves deliberately.",
          "Courage is not always loud or instant. Sometimes courage is patient strategy under pressure.",
        ],
      },
      {
        reference: "Esther 5:9-14",
        title: "Haman Builds What Will Bury Him",
        verseCallouts: ["**14** Let a gallows fifty cubits high be made"],
        points: [
          "Haman leaves joyful because of his access to Esther's banquet, but Mordecai's refusal poisons his happiness. His friends suggest building a gallows.",
          "Public execution structures were meant to shame the victim and terrify observers. Haman wants Mordecai humiliated where everyone can see.",
          "The Bible often shows reversal through the very thing the wicked prepare. The pit meant for Joseph becomes the road to Egypt. Haman's gallows will become his own end.",
          "Haman has everything by worldly standards, yet one man refusing him makes him miserable. Pride can never be satisfied.",
          "If your joy depends on everyone honoring you, you are not free. Haman is powerful, but he is enslaved to ego.",
        ],
      },
    ],
    callbacks: [
      "👕 Clothing marks major turns in Joseph's story and now Esther's.",
      "🕳️ Joseph's pit becomes part of God's rescue path.",
      "🧠 Nehemiah models wise speech before a Persian king.",
    ],
    emotionalWeight:
      "This chapter feels like tension stretched tight. Esther is moving with courage, while Haman is building death in the background.",
    application:
      "Esther 5 teaches that wise courage does not need to rush. It also warns that pride can turn even privilege into misery.",
    bridge:
      "The gallows are ready, but God is not done arranging the night. Esther 6 will turn on something as small as a king who cannot sleep.",
  },
  {
    chapter: 6,
    title: "The Sleepless Night",
    opening:
      "Esther 6 is one of the greatest reversal chapters in Scripture. No one prays on the page, no prophet appears, and yet everything turns.",
    previous:
      "Haman has built the gallows for Mordecai and expects to ask the king for permission to execute him. Esther's second banquet is still ahead.",
    whyMatters:
      "This chapter matters because providence becomes almost impossible to miss. A sleepless king, old records, perfect timing, and Haman's pride all collide.",
    history:
      "Royal chronicles preserved acts of loyalty, administration, and honor. Kings depended on records to maintain order, reward service, and remember political obligations. Mordecai's forgotten service is about to be remembered at exactly the right time.",
    watchFor: [
      "🌙 the king's insomnia",
      "📚 Mordecai's loyalty being read from the records",
      "😏 Haman assuming the honor is for himself",
      "🐎 Mordecai being paraded in royal honor",
      "📉 Haman's household sensing his downfall",
    ],
    words: [
      "📚 **Chronicles** were official royal records.",
      "🐎 **Royal horse** symbolized public honor connected to the king himself.",
      "👑 **Royal robe** represented shared royal dignity in a visible way.",
      "📉 **Fall** language begins to surround Haman before Esther even exposes him.",
    ],
    sections: [
      {
        reference: "Esther 6:1-3",
        title: "The King Cannot Sleep",
        verseCallouts: ["**1** On that night the king could not sleep"],
        points: [
          "The king cannot sleep, so the records are read. Mordecai's old act of loyalty is discovered, and the king learns he was never honored.",
          "Ancient kings often used records to manage honor and obligation. Failing to reward loyalty could be politically careless.",
          "Joseph was forgotten by the cupbearer until Pharaoh's dream. Mordecai is forgotten until the king's sleepless night.",
          "The scene feels quiet, but it is loaded. The entire story turns while most people are asleep.",
          "God does not need dramatic tools to change a story. He can use a restless night and a forgotten page.",
        ],
      },
      {
        reference: "Esther 6:4-10",
        title: "Haman Designs His Own Humiliation",
        verseCallouts: ["**6** Whom would the king delight to honor more than me?"],
        points: [
          "Haman enters to ask for Mordecai's death, but the king asks how to honor someone. Haman assumes it must be him and describes extravagant public honor.",
          "Honor in the ancient world was public currency. To be paraded on the king's horse in royal robes was a huge visible elevation.",
          "The proud being brought low is a repeated biblical theme. Proverbs warns that pride goes before destruction.",
          "Haman's inner world is exposed. He cannot imagine honor being meant for anyone else.",
          "Pride blinds people. Haman walks in planning murder and walks out forced to honor the man he hates.",
        ],
      },
      {
        reference: "Esther 6:11-14",
        title: "The Reversal Begins",
        verseCallouts: ["**13** you will surely fall before him"],
        points: [
          "Haman leads Mordecai through the city, then returns home mourning. His wife and friends recognize that his fall has begun.",
          "Public honor and public shame have switched places. The gallows still stand, but the direction of the story has changed.",
          "God often reverses expectations: younger over older, slave to ruler, barren woman to mother, condemned people to rescued people.",
          "Haman feels the humiliation immediately. The man who wanted to crush Mordecai now announces his honor.",
          "When God starts reversing a story, the enemy's own plans can become evidence of his defeat.",
        ],
      },
    ],
    callbacks: [
      "🍷 The cupbearer forgot Joseph until God's timing brought memory back.",
      "📉 Proverbs warns that pride comes before a fall.",
      "🔄 Biblical reversals run from Genesis through the resurrection.",
    ],
    emotionalWeight:
      "This chapter feels almost unbelievable because the timing is so exact. Haman is one step from asking for Mordecai's death, and God turns the whole room before he can speak.",
    application:
      "Esther 6 reminds us that hidden faithfulness is not forgotten by God. It may be unrewarded for a season, but it is not unseen.",
    bridge:
      "Haman is shaken, but not yet exposed. Esther 7 will bring the truth into the banquet room.",
  },
  {
    chapter: 7,
    title: "Esther Speaks and Haman Falls",
    opening:
      "Esther 7 is the moment truth enters the room. The danger Esther has carried in silence is finally named out loud.",
    previous:
      "Mordecai has just been publicly honored, Haman has been humiliated, and the second banquet is ready.",
    whyMatters:
      "This chapter matters because Esther uses her voice at the decisive moment. She reveals her identity, names the threat, and exposes the enemy.",
    history:
      "Court accusation before a king was dangerous. Esther has to connect her personal plea to the king's interests while revealing that the man he empowered has endangered the queen herself.",
    watchFor: [
      "🍽️ the second banquet as the chosen moment",
      "🗣️ Esther asking for her life and her people",
      "🎭 Haman being exposed as enemy",
      "😡 the king's wrath",
      "🪵 the gallows becoming Haman's end",
    ],
    words: [
      "🗣️ **Petition** means Esther is formally asking for royal action.",
      "⚖️ **Adversary and enemy** is legal and moral language. Esther names Haman plainly.",
      "🪵 **Gallows** becomes the image of reversal.",
      "🔥 **Wrath** in this scene shows the king realizing the plot has reached his own house.",
    ],
    sections: [
      {
        reference: "Esther 7:1-4",
        title: "Esther Asks For Life",
        verseCallouts: ["**3** let my life be granted me for my wish, and my people for my request"],
        points: [
          "Esther finally speaks. She asks for her own life and the life of her people, revealing that she is personally tied to the condemned Jews.",
          "She frames the issue with wisdom. This is not only a distant ethnic policy. It threatens the queen the king favors.",
          "Moses stood before Pharaoh for the life of God's people. Esther now stands before Persia's king for the same covenant line.",
          "This is an exposed moment. Esther can no longer hide her identity and plead effectively at the same time.",
          "There comes a time when vague concern is not enough. Esther teaches the power of speaking clearly when truth needs a voice.",
        ],
      },
      {
        reference: "Esther 7:5-8",
        title: "The Enemy Is Named",
        verseCallouts: ["**6** A foe and enemy! This wicked Haman!"],
        points: [
          "The king asks who would dare do this, and Esther names Haman. The powerful man at the table becomes the exposed enemy.",
          "Naming guilt in a royal court was risky. Esther has waited until the evidence, timing, and setting are right.",
          "Nathan told David, 'You are the man.' Esther's exposure of Haman carries that same force of truth landing in power.",
          "Haman is terrified. The man who planned destruction now feels judgment closing in.",
          "Evil often depends on staying unnamed. Truth breaks its cover.",
        ],
      },
      {
        reference: "Esther 7:9-10",
        title: "The Gallows Reverse",
        verseCallouts: ["**10** So they hanged Haman on the gallows that he had prepared for Mordecai"],
        points: [
          "Haman is executed on the gallows he prepared for Mordecai. The symbol of his hatred becomes the instrument of his downfall.",
          "Public reversal mattered. The empire can now see that Haman's power has collapsed.",
          "The Bible often shows wicked schemes falling back on the schemer. The pit, the trap, and the weapon are turned.",
          "There is a sobering justice in this moment. Haman is not merely embarrassed. His violence returns to his own head.",
          "God's justice may feel delayed, but Esther 7 reminds us it is not absent.",
        ],
      },
    ],
    callbacks: [
      "🗣️ Nathan exposing David's sin shows truth confronting power.",
      "🪤 Psalms often speak of the wicked falling into their own pit.",
      "🧬 The covenant line is preserved again through unlikely courage.",
    ],
    emotionalWeight:
      "Everything Esther has been carrying comes into the open. The relief is real, but so is the danger of speaking. This is the moment where her crown becomes a weapon for rescue.",
    application:
      "Esther 7 teaches that courage eventually has to become clarity. There are moments when wisdom waits, and there are moments when wisdom speaks.",
    bridge:
      "Haman is dead, but the decree is still alive. Esther 8 will show that one victory does not automatically finish the work.",
  },
  {
    chapter: 8,
    title: "The Second Plea and the New Decree",
    opening:
      "Esther 8 shows that deliverance can require persistence. Haman is gone, but the danger he created is still moving through the empire.",
    previous:
      "Haman has fallen on his own gallows. Esther and Mordecai are vindicated, but the decree against the Jews cannot simply be erased.",
    whyMatters:
      "This chapter matters because Esther keeps interceding. Courage was not one speech. It becomes continued action until rescue is actually made possible.",
    history:
      "Persian royal writings sealed with the king's ring carried legal authority. Esther 8 shows the challenge: the old decree cannot be revoked, so a new decree must authorize the Jews to defend themselves.",
    watchFor: [
      "🏠 Haman's house transferred to Esther",
      "💍 the signet ring moving to Mordecai",
      "😭 Esther pleading again",
      "📜 a new decree being written",
      "🌅 fear turning into joy across the provinces",
    ],
    words: [
      "💍 **Signet ring** represented royal authority to seal official documents.",
      "📜 **Cannot be revoked** explains why another decree is needed.",
      "🐎 **Couriers** show urgency across a massive empire.",
      "🌅 **Light and gladness** describes emotional reversal for the Jews.",
    ],
    sections: [
      {
        reference: "Esther 8:1-2",
        title: "Authority Changes Hands",
        verseCallouts: ["**2** the king took off his signet ring, which he had taken from Haman, and gave it to Mordecai"],
        points: [
          "Haman's estate is given to Esther, and Mordecai receives the signet ring. Authority shifts away from the enemy and toward the protector.",
          "A signet ring was not jewelry only. It was authorization. Whoever held it could seal decisions in the king's name.",
          "Joseph received Pharaoh's signet ring when elevated in Egypt. Mordecai now experiences a similar reversal in Persia.",
          "The emotional turn is huge. The man marked for death now holds authority once held by his enemy.",
          "God can move people from threatened to useful, from overlooked to positioned, from danger to responsibility.",
        ],
      },
      {
        reference: "Esther 8:3-8",
        title: "Esther Pleads Again",
        verseCallouts: ["**6** how can I bear to see the destruction of my kindred?"],
        points: [
          "Esther falls before the king and pleads for her people. She does not stop because Haman is dead.",
          "The law's permanence creates a legal problem. Mercy needs a path through the structure of the empire.",
          "Abraham interceded for Sodom. Moses interceded for Israel. Esther joins the biblical pattern of standing in the gap.",
          "Her words are emotional. She cannot bear the thought of seeing her people destroyed.",
          "Real love keeps pressing until people are actually helped, not just until the first dramatic moment passes.",
        ],
      },
      {
        reference: "Esther 8:9-17",
        title: "A New Message Runs Through The Empire",
        verseCallouts: ["**11** the king allowed the Jews... to gather and defend their lives"],
        points: [
          "A new decree goes out allowing the Jews to gather and defend themselves. The empire now carries a message of resistance instead of helplessness.",
          "Messages across Persia required scribes, languages, couriers, horses, and administrative speed. This was a massive coordinated act.",
          "The Exodus turned slavery into deliverance. Esther turns death decree into defense and future joy.",
          "The Jews receive light, gladness, joy, and honor. The emotional atmosphere reverses.",
          "Sometimes God does not remove the battle, but He gives strength, authority, and community to stand in it.",
        ],
      },
    ],
    callbacks: [
      "💍 Joseph receiving Pharaoh's ring in Genesis 41.",
      "🙏 Abraham and Moses interceding for others.",
      "🌊 Exodus deliverance echoes through Jewish survival in Persia.",
    ],
    emotionalWeight:
      "There is relief, but not laziness. Esther is still pleading, still feeling the danger, still using her position until her people have a path to live.",
    application:
      "Esther 8 teaches that courageous people do not quit at symbolic wins. They keep working until the people they love can actually breathe.",
    bridge:
      "The new decree has gone out. Esther 9 will bring the appointed day and show the reversal fully landing.",
  },
  {
    chapter: 9,
    title: "Reversal and Purim",
    opening:
      "Esther 9 is the day the enemy chose, but God turns it into the day of deliverance. The calendar itself gets redeemed.",
    previous:
      "The Jews have received the right to defend themselves. Haman is dead, Mordecai is honored, and the appointed day is coming.",
    whyMatters:
      "This chapter matters because it turns survival into remembrance. The people are delivered, and Purim becomes a yearly testimony that the planned destruction did not win.",
    history:
      "Purim comes from Pur, the lot Haman cast. Jewish communities would remember the reversal through feasting, gladness, gifts, and care for the poor. Memory becomes part of faithfulness.",
    watchFor: [
      "🔄 the day turning opposite from what enemies expected",
      "🛡️ the Jews defending themselves",
      "🚫 the repeated refusal to take plunder",
      "🎉 Purim being established",
      "📨 letters preserving the memory",
    ],
    words: [
      "🎲 **Purim** comes from Pur, the lot. The name remembers Haman's attempt and God's reversal.",
      "🚫 **No plunder** shows this was defense and deliverance, not greed.",
      "🎁 **Gifts to the poor** made remembrance communal and generous.",
      "📨 **Letters** formalized memory so future generations would not forget.",
    ],
    sections: [
      {
        reference: "Esther 9:1-10",
        title: "The Day Turns Around",
        verseCallouts: ["**1** the reverse occurred: the Jews gained mastery over those who hated them"],
        points: [
          "The appointed day arrives, but the outcome reverses. The enemies of the Jews fall instead of the Jews being destroyed.",
          "The legal right to defend life matters. The Jews are no longer positioned as helpless victims under the decree.",
          "God turned Joseph's suffering into preservation of life. Esther shows another preservation story under another empire.",
          "Imagine the fear before that day. Families knew the date. The countdown had been real.",
          "God can turn the date people dread into the date they later remember with gratitude.",
        ],
      },
      {
        reference: "Esther 9:11-19",
        title: "Victory Without Greed",
        verseCallouts: ["**10** but they laid no hand on the plunder"],
        points: [
          "The Jews defend themselves, but the text repeatedly says they do not take plunder.",
          "That detail matters because it separates justice and survival from greedy revenge.",
          "Saul failed with Amalek by taking spoil he should not have taken. Esther's Jews refuse plunder in a story connected to an Agagite enemy.",
          "The emotional danger after survival is overreach. Pain can tempt people to become what hurt them.",
          "Deliverance should form worship and remembrance, not uncontrolled revenge.",
        ],
      },
      {
        reference: "Esther 9:20-32",
        title: "Purim Is Established",
        verseCallouts: ["**28** these days should be remembered and kept throughout every generation"],
        points: [
          "Mordecai and Esther establish Purim as a lasting remembrance of reversal, rest, gladness, and deliverance.",
          "Biblical feasts taught future generations through repeated memory. What God did was not supposed to fade into private nostalgia.",
          "Passover remembers deliverance from Egypt. Purim remembers deliverance in Persia. Both teach that God's people survive because God preserves.",
          "The community is invited to remember together through feasting, gifts, and generosity.",
          "Some testimonies need structure so we do not forget them. Purim turns rescue into rhythm.",
        ],
      },
    ],
    callbacks: [
      "🎲 Haman's Pur becomes the name of the feast.",
      "🐑 Passover gives a pattern for remembering deliverance.",
      "👑 Saul's Amalek failure contrasts the refusal to take plunder.",
    ],
    emotionalWeight:
      "This chapter carries relief after terror. It is what happens when a people who had been marked for death wake up into survival, defense, joy, and shared memory.",
    application:
      "Esther 9 teaches that deliverance should be remembered. If God carried you through something, do not rush past it. Build memory around mercy.",
    bridge:
      "The crisis has passed, and Purim is established. Esther 10 will close by showing Mordecai's influence and the legacy left behind.",
  },
  {
    chapter: 10,
    title: "Mordecai's Greatness and the Legacy of Esther",
    opening:
      "Esther 10 is short, but it leaves the story settled. The empire is still Persia, but Mordecai now stands in influence for the good of his people.",
    previous:
      "Purim has been established, the Jews have been delivered, and the story's great reversal has become a remembered testimony.",
    whyMatters:
      "This chapter matters because it shows what faithful influence is for. Mordecai is not great merely because he is close to power. He is great because he uses power for the peace of his people.",
    history:
      "Persian officials could hold immense administrative influence. To be second to the king meant access, responsibility, and public authority. Mordecai's position represents a complete reversal from sitting at the gate under threat.",
    watchFor: [
      "📜 the king's power still being recorded",
      "📈 Mordecai's elevation",
      "🤝 Mordecai being accepted by many Jews",
      "🕊️ leadership defined by seeking welfare and peace",
    ],
    words: [
      "📚 **Chronicles of Media and Persia** were official records of royal acts.",
      "📈 **Second in rank** means Mordecai holds extraordinary influence.",
      "🕊️ **Peace** is not passive. It is leadership that seeks the welfare of the people.",
      "🤝 **Accepted by many** shows leadership received because it served others.",
    ],
    sections: [
      {
        reference: "Esther 10:1-2",
        title: "The Empire Records Power",
        verseCallouts: ["**2** were they not written in the Book of the Chronicles of the kings of Media and Persia?"],
        points: [
          "The chapter briefly notes the king's tribute and the records of his power and Mordecai's greatness.",
          "Ancient royal records preserved the memory of rulers and officials. The empire wanted its achievements remembered.",
          "Human kingdoms keep records of power, but Scripture is more interested in how power is used under God's providence.",
          "The emotional pace slows. After danger and reversal, the ending feels settled.",
          "Legacy is not only what gets recorded by empires. It is what your life did for people.",
        ],
      },
      {
        reference: "Esther 10:3",
        title: "Mordecai Seeks Peace",
        verseCallouts: ["**3** he sought the welfare of his people and spoke peace to all his people"],
        points: [
          "Mordecai is second to the king, great among the Jews, and accepted by many because he seeks their welfare and speaks peace.",
          "In the ancient world, officials could use rank for self-protection or exploitation. Mordecai uses influence for his people.",
          "Joseph used authority in Egypt to preserve life. Mordecai uses authority in Persia to protect peace.",
          "The story closes not with revenge but with welfare. That matters.",
          "Godly influence is measured by whether people are safer, stronger, and more at peace because you held it.",
        ],
      },
    ],
    callbacks: [
      "🌾 Joseph became second in Egypt and preserved life.",
      "🕊️ Jeremiah told exiles to seek the peace of the city.",
      "👑 Esther's courage and Mordecai's influence both serve covenant preservation.",
    ],
    emotionalWeight:
      "The ending is quiet compared to the rest of the book, but it is not weak. It shows the fruit of courage: people live, peace is pursued, and leadership is used for others.",
    application:
      "Esther 10 asks what we do after the crisis. If God gives influence, the goal is not ego. The goal is welfare, peace, protection, and faithful service.",
    bridge:
      "The book ends, but Purim keeps preaching. God may be hidden in the wording of Esther, but His preserving hand is visible in the survival of His people.",
  },
];

export const RISE_OF_ESTHER_CHAPTERS = ESTHER_NOTES.map(({ chapter, title }) => ({
  chapter,
  title,
}));

export const RISE_OF_ESTHER_DEEP_NOTES = ESTHER_NOTES.map(renderNote);
