export type BibleBuddyTvCategory =
  | "tv"
  | "movies"
  | "sermons"
  | "documentaries"
  | "bible-stories";

export interface BibleBuddyTvEpisode {
  id: string;
  episodeNumber: number;
  title: string;
  duration: string;
  summary: string;
  thumbnail: string;
  youtubeUrl?: string;
  available: boolean;
  contentLabel?: string;
  discussionSlug?: string;
  louisIntro?: string;
  reflectionQuestion?: string;
  studyNotesDocument?: string;
}

export interface BibleBuddyTvTitle {
  id: string;
  slug: string;
  title: string;
  badge: string;
  category: BibleBuddyTvCategory;
  poster: string;
  heroImage: string;
  accentFrom: string;
  accentTo: string;
  year: string;
  rating: string;
  runtime: string;
  seasonsLabel: string;
  logline: string;
  overview: string;
  vibe: string;
  contentType?: "series" | "movie";
  continueWatchingLabel?: string;
  inMyList?: boolean;
  searchTags?: string[];
  episodes: BibleBuddyTvEpisode[];
}

export const bibleBuddyTvCategories: Array<{
  id: BibleBuddyTvCategory;
  label: string;
  description: string;
}> = [
  {
    id: "tv",
    label: "TV",
    description: "Series and multi-episode Bible stories.",
  },
  {
    id: "movies",
    label: "Movies",
    description: "Feature-length stories worth a full night in.",
  },
  {
    id: "sermons",
    label: "Sermons",
    description: "Messages you can press play on right away.",
  },
  {
    id: "documentaries",
    label: "Documentaries",
    description: "Bible history, context, archaeology, and deep dives.",
  },
  {
    id: "bible-stories",
    label: "Bible Stories",
    description: "Animated and story-first retellings for every age.",
  },
];

export const promisedLandTitle: BibleBuddyTvTitle = {
  id: "promised-land",
  slug: "the-promised-land",
  title: "The Promised Land",
  badge: "Bible Buddy TV",
  category: "tv",
  poster: "/Promiseland.jpg",
  heroImage: "/Promiseland.jpg",
  accentFrom: "#5b21b6",
  accentTo: "#7c3aed",
  year: "2024",
  rating: "TV-PG",
  runtime: "6 Episodes",
  seasonsLabel: "Season 1",
  contentType: "series",
  logline: "Moses leads a nation through the wilderness while barely keeping the camp from falling apart.",
  overview:
    "On their way from Egypt to the promised land, Moses and his family struggle to manage the hardest part of their nation's journey: the people. The Promised Land is a dry, character-driven comedy in the spirit of The Office, following Moses in the book of Exodus as he and the Israelites make their way through the desert, one chaotic moment at a time.",
  vibe:
    "Wilderness pressure, awkward leadership, family tension, and a lot of people asking Moses for things at the worst possible time.",
  continueWatchingLabel: "Episode 1: Let My People Go... Somewhere",
  inMyList: true,
  searchTags: [
    "tv",
    "show",
    "series",
    "the promised land",
    "moses",
    "aaron",
    "miriam",
    "zipporah",
    "jethro",
    "korah",
    "amalek",
    "manna",
    "quail",
    "golden calf",
    "exodus",
    "numbers",
    "old testament",
    "wilderness",
    "sinai",
    "israelites",
  ],
  episodes: [
    {
      id: "promised-land-s1-e1",
      episodeNumber: 1,
      title: "Let My People Go... Somewhere",
      duration: "24m",
      summary:
        "Fresh out of Egypt, Moses realizes freedom is easier to preach than it is to organize. Everyone wants answers, Aaron wants a plan, and the wilderness is already louder than Pharaoh's court.",
      thumbnail: "/Promiseland.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=HSI04-1oLwg",
      available: true,
      discussionSlug: "bible-buddy-tv-promised-land-episode-1-pilot",
      louisIntro:
        "Episode 1, \"Pilot,\" drops us right into the kind of leadership pressure Moses keeps running into in the wilderness. The episode plays with the chaos of camp life, but underneath the comedy it is really about how heavy it is to carry people, family tension, and spiritual responsibility at the same time. We watch Aaron talk through the battle moment where Moses had to keep the staff raised, then the story shifts into Jethro's visit, Zipporah meeting Miriam and Aaron, and the early sparks of conflict inside the camp. It feels funny on the surface, but it is setting up a real Bible truth: leading God's people is never just about the big miracle. It is also about endurance, wisdom, relationships, and what happens when pressure exposes everyone's personality.",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where This Episode Lives in Scripture

This pilot mainly draws from **Exodus 17:8-13** and **Exodus 18**.

That means the episode is pulling from the season of Israel's wilderness journey right after the Lord brought them out of Egypt. The people are free, but they are still disorganized, demanding, tired, and learning what it means to live as God's people.

# What the Battle Scene Is Really Showing

Aaron talks about the battle where Moses had to lift the staff over his head while Israel fought Amalek.

That moment matters because the victory was never just about military strength. It was about dependence on God. Moses standing with the staff raised shows that Israel wins because the Lord is with them, not because they suddenly became powerful on their own.

> "Whenever Moses held up his hand, Israel prevailed, and whenever he lowered his hand, Amalek prevailed."  
> Exodus 17:11

- Moses could not carry the burden alone
- Aaron and Hur had to help hold him up
- even the strongest leader still needed support

That is one of the clearest themes in this episode. Leadership in the wilderness is not flashy. It is exhausting, visible, and heavy.

# Moses, Aaron, and Why Their Dynamic Matters

Moses is the one God chose to lead Israel out of Egypt, but he was never written as a polished, confident hero. He is often overwhelmed, stretched, and forced to keep going anyway.

Aaron is Moses' brother, and in the Bible he often helps speak, stand beside Moses, and support him in public moments. In this episode, Aaron talking to the interviewer works because he really is one of the people closest to the pressure Moses is under.

The Hebrew name **Mosheh** is connected to the idea of being "drawn out," which fits his story because he was drawn out of the Nile as a baby and later used by God to draw Israel out of Egypt.

# Why Jethro Matters So Much

Jethro is not just Moses' father in law. He becomes one of the wisest voices in Moses' life.

Exodus 18 shows Jethro visiting the camp, hearing what God has done, and then watching Moses wear himself out by trying to judge every problem personally.

> "What you are doing is not good."  
> Exodus 18:17

That line is simple, but it lands hard. Jethro can see what Moses cannot fully admit yet: if he keeps carrying everyone by himself, he will break down.

So the episode is not only about family visiting camp. It is about outside wisdom stepping into an overloaded leadership system.

# Zipporah, Miriam, and Camp Tension

Zipporah is Moses' wife, and Miriam is Moses' sister. The episode uses their first interactions to make the camp feel personal and human.

Scripture does not give this exact conversation in Exodus 18, but the tension fits the wider biblical world. These are real people with personalities, loyalties, and opinions, all trying to live inside a wilderness season where everybody is under pressure.

That is part of what makes the show work. It reminds you that the Exodus story was not carried by cardboard characters. It was carried by families.

# Korah in the Background

Korah's role here feels like setup, and that is probably intentional.

Bible readers know Korah becomes a major rebel later in **Numbers 16**, where he openly challenges Moses and Aaron. So even if the pilot uses him in a dramatized way, it is planting a real biblical signal: some of the deepest threats to Moses will rise from inside the camp, not just from outside enemies.

# One Big Takeaway from Episode 1

The pilot is funny, but the pressure underneath it is serious.

Moses is leading people who have already seen miracles, but they still need wisdom, structure, patience, and trust. That is what makes this story feel so human. Freedom happened fast. Formation does not.

And honestly, that is part of why Exodus still hits. God can bring people out quickly, but shaping them into who they need to become takes much longer.`,
    },
    {
      id: "promised-land-s1-e2",
      episodeNumber: 2,
      title: "Manna Problems",
      duration: "24m",
      summary:
        "Camp complaints multiply as daily provision turns into daily opinions, and Moses learns that feeding people is only half the battle.",
      thumbnail: "/Promiseland.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=vSosv_ZfYk4",
      available: true,
      discussionSlug: "bible-buddy-tv-promised-land-episode-2-manna-problems",
      louisIntro:
        "Episode 2 leans into one of the most human parts of the wilderness story: God provides, and the people still complain. That is what makes the manna story so sharp. The Lord is feeding Israel day by day, but the camp keeps revealing how hard it is for people to trust daily provision when they would rather control the future for themselves. The comedy works because everybody has an opinion, everybody is tired, and everybody thinks their complaint is the reasonable one. But underneath all of that, Exodus is asking a serious question: when God gives enough for today, will His people trust Him for tomorrow too?",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where This Episode Lives in Scripture

This episode mainly connects to **Exodus 16**, where the Lord gives Israel manna in the wilderness, and also pulls from the wider atmosphere of Israel's ongoing complaints after leaving Egypt.

The people are free, but freedom has not yet turned into trust. That is why the wilderness keeps exposing what is still unsettled in their hearts.

# What Manna Actually Is

Manna is the strange bread-like provision God sends from heaven to feed Israel in the desert.

When the people first see it, they ask, **"What is it?"** That question matters because the Hebrew expression behind **manna** is tied to that sense of surprise and uncertainty.

God is giving them something they do not fully understand, but it is still enough to keep them alive.

> "And when the people of Israel saw it, they said to one another, 'What is it?' For they did not know what it was."  
> Exodus 16:15

- God provided daily, not all at once
- each household had enough
- trying to hoard it exposed distrust

# Why Daily Provision Was So Hard for Israel

The issue was never just food. The issue was trust.

Israel had already seen the Red Sea open, but now they were in the slow, repetitive pressure of daily need. That is where faith often gets tested most. It is one thing to believe God for a dramatic rescue. It is another thing to trust Him every single morning.

This is why the manna story feels so current. A lot of people say they trust God in theory, but daily dependence still feels uncomfortable.

# Moses in the Middle of the Complaints

Moses keeps ending up in the middle of the people's fear, irritation, and impatience.

That is part of what makes his leadership so hard. He is not only leading a nation geographically. He is carrying the emotional chaos of a people who do not yet know how to live free.

The show turns that pressure into comedy, but the Bible itself makes clear that the complaints were serious. Grumbling in Exodus is often a sign that the people are testing God's patience and questioning His care.

# Quail, Bread, and the Kindness of God

Exodus 16 does not only mention manna. It also mentions **quail**.

That matters because God is not stingy with Israel. He gives meat in the evening and bread in the morning. The issue is not whether He is able to provide. The issue is whether the people will recognize His provision when it arrives in an ordinary rhythm.

> "In the evening quail came up and covered the camp, and in the morning dew lay around the camp."  
> Exodus 16:13

# One Word Worth Knowing

The Hebrew idea behind Israel's **grumbling** is more than casual irritation. It carries the sense of murmuring, muttering, and resisting under the surface.

That means the wilderness problem is not just loud rebellion. Sometimes it is low-grade distrust that keeps spreading through the whole community.

# One Big Takeaway from Episode 2

Episode 2 shows how quickly people can miss what God is doing when they are focused on what they wish He had done differently.

That is why the manna story still matters. God was teaching Israel that dependence was not punishment. It was formation. He was not only feeding them. He was training them to trust Him one day at a time.`,
    },
    {
      id: "promised-land-s1-e3",
      episodeNumber: 3,
      title: "The Suggestion Box",
      duration: "25m",
      summary:
        "Jethro visits, offers leadership advice, and discovers that solving one crisis at a time may not be enough for this many people.",
      thumbnail: "/Promiseland.jpg",
      youtubeUrl: "https://youtu.be/0Fi2IuYAr2A?si=Rep4tBwOeucsuW77",
      available: true,
      discussionSlug: "bible-buddy-tv-promised-land-episode-3-the-suggestion-box",
      louisIntro:
        "Episode 3 keeps pressing into leadership pressure, but this time the focus shifts from miracles to structure. Moses cannot keep answering every problem, settling every dispute, and carrying the whole camp by himself. Jethro sees that immediately, which is what makes his advice so valuable. The episode works because it turns administration into drama, but that actually fits Exodus really well. A healthy community does not only need passion and vision. It also needs wisdom, delegation, and a way to keep people from collapsing under unnecessary pressure.",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where This Episode Lives in Scripture

This episode draws most directly from **Exodus 18**, especially the part where Jethro watches Moses trying to carry the whole camp by himself.

The setting matters. Israel has already been delivered, but now they need order. A rescued people still have to become a functioning people.

# Jethro Sees What Moses Cannot

Jethro is close enough to Moses to care about him, but outside enough to notice what everyone else has gotten used to.

That is why his perspective matters so much. Moses is doing meaningful work, but he is doing too much of it alone.

> "You and the people with you will certainly wear yourselves out."  
> Exodus 18:18

That is one of the clearest leadership verses in Exodus. Good intentions do not erase human limits.

# Delegation Is Not a Lack of Faith

Sometimes people act like doing everything alone proves devotion. Exodus 18 says the opposite.

Jethro tells Moses to appoint capable people over groups of thousands, hundreds, fifties, and tens. That means wise leadership includes structure. It is not less spiritual to share responsibility. It is often more faithful.

- some matters could be handled by others
- the hardest cases could still come to Moses
- the goal was endurance, not constant overload

# Why This Episode Feels So Real

The comedy lands because everyone in the camp probably does have opinions, complaints, requests, and suggestions.

That makes the episode feel modern, but the Bible itself already contains that pressure. Moses is not leading a quiet, easy crowd. He is leading a massive community full of needs, tensions, and constant questions.

# Moses Is a Deliverer, Not a Machine

One important thing this episode keeps showing is that Moses is still human.

The Bible never presents him as someone who can carry endless pressure without support. In fact, the Exodus story repeatedly shows his need for Aaron, Jethro, and others around him.

That is one reason Moses remains such a strong biblical leader. He keeps going, but he is never portrayed as self-sufficient.

# A Small Hebrew Thread in the Background

The Hebrew idea of **shalom** is broader than just peace. It includes wholeness, order, and things being rightly set in place.

That helps explain why Jethro's advice matters. He is not just reducing stress. He is helping move Israel toward a healthier form of communal life.

# One Big Takeaway from Episode 3

This episode reminds us that chaos does not always come from bad people. Sometimes it comes from good people trying to do too much without enough structure.

Jethro's advice matters because leadership is not only about being willing. It is also about being wise enough to build something sustainable.`,
    },
    {
      id: "promised-land-s1-e4",
      episodeNumber: 4,
      title: "Golden Calf Energy",
      duration: "26m",
      summary:
        "One delayed meeting turns into a full camp meltdown, and Moses comes down the mountain to discover that Aaron got creative.",
      thumbnail: "/Promiseland.jpg",
      youtubeUrl: "https://youtu.be/dtQ3vAf62JI?si=q-T9S-iCisVcO3Jf",
      available: true,
      discussionSlug: "bible-buddy-tv-promised-land-episode-4-golden-calf-energy",
      louisIntro:
        "Episode 4 shifts from complaints and leadership stress into outright spiritual collapse. The golden calf story is one of the clearest moments in Exodus where the people's impatience turns into idolatry. That is why this episode matters so much. Israel does not reject God after years in the wilderness. They do it in the middle of a holy moment, while Moses is still on the mountain. The show plays it with chaos, but the Bible shows how quickly people can replace trust with something visible, manageable, and immediate.",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where This Episode Lives in Scripture

This episode is rooted in **Exodus 32**, the chapter where Israel makes the golden calf while Moses is on Mount Sinai.

That timing is what makes the story so tragic. God has already delivered them, spoken to them, and entered covenant with them, and yet they still drift almost immediately.

# Why the Golden Calf Was So Serious

This is not just an awkward mistake. It is idolatry in the middle of covenant relationship.

The people want something visible they can point to, control, and celebrate. That is often how idolatry works. It gives people the illusion of nearness to God while actually replacing Him.

> "Up, make us gods who shall go before us."  
> Exodus 32:1

- they got impatient
- they wanted something immediate
- they traded trust for something they could see

# Aaron's Weakness Matters

Aaron is an important figure, which is what makes his failure here so weighty.

He is not a random bystander. He is Moses' brother, a public leader, and someone the people look to when Moses is absent. The episode leans into his panic and improvisation, and that tracks with the way Exodus shows the moment unraveling.

Aaron's failure is a warning that even visible leaders can buckle under group pressure.

# Why Idolatry Often Starts with Impatience

The people do not make the calf because they think they have outgrown religion. They make it because waiting feels unbearable.

That is why Exodus 32 still speaks so directly today. People often do not abandon God in a clean, ideological way. They drift because uncertainty feels too heavy, and they reach for something faster, clearer, and easier to manage.

# Sinai Was Supposed to Be a Holy Place

That makes this story even darker. The mountain represents God's presence, revelation, and covenant.

Israel is not wandering aimlessly when this happens. They are camped near one of the holiest moments in the book of Exodus. That means spiritual failure can happen even close to sacred things.

# One Word Worth Knowing

The Hebrew word **kavod** is often used for glory or weight. In Exodus, God's presence carries real weight.

The people trade that holy weight for something light and man-made. That is one reason the calf episode feels so empty even while it looks celebratory.

# One Big Takeaway from Episode 4

Episode 4 shows that when people stop trusting God's timing, they often start manufacturing substitutes.

The golden calf story is not mainly about ancient jewelry or statues. It is about what people reach for when waiting on God starts to feel too costly.`,
    },
    {
      id: "promised-land-s1-e5",
      episodeNumber: 5,
      title: "Forty Years of This",
      duration: "25m",
      summary:
        "After another round of fear and second-guessing, Moses has to keep moving a people who are no longer sure they want to.",
      thumbnail: "/Promiseland.jpg",
      youtubeUrl: "https://youtu.be/Iqjh7fzOQPU?si=2E17YfcdsQaAy0X3",
      available: true,
      discussionSlug: "bible-buddy-tv-promised-land-episode-5-forty-years-of-this",
      louisIntro:
        "Episode 5 really taps into the fatigue of the wilderness. By this point the issue is not whether God has acted before. The issue is whether the people are still willing to trust Him now. Fear, second-guessing, and frustration start taking over the camp, and that is where the Exodus journey begins to feel long in a different way. The wilderness is no longer just a place they are passing through. It is becoming the place where their hearts are being exposed over and over again.",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where This Episode Lives in Scripture

This episode echoes the wider wilderness material, especially the kind of fear and resistance that shows up in **Numbers 13-14**, when the people recoil from entering the land.

Even though the show is compressing and adapting, the emotional world fits the Bible closely. Israel keeps getting pulled backward by fear.

# Why Fear Keeps Defining the Camp

The people have seen plagues, the sea part, manna fall, and water come from the rock, but fear still keeps returning.

That is part of the realism of Scripture. Miracles do not automatically mature people. People can witness God's power and still collapse under the next intimidating circumstance.

> "Would that we had died in the land of Egypt! Or would that we had died in this wilderness!"  
> Numbers 14:2

That line shows how distorted fear can become. People can start romanticizing the very bondage God rescued them from.

# Moses Keeps Moving a Discouraged People

One of the hardest parts of leadership is carrying people when they no longer believe the journey is worth it.

That is what Moses keeps facing. He is not only trying to obey God. He is also trying to keep an exhausted, fearful people from turning around on the promise entirely.

- fear makes the past look safer than it really was
- discouragement makes God's promise feel unrealistic
- repeated pressure reveals what people actually trust

# Why the Wilderness Took So Long

The phrase "forty years" becomes symbolic in Scripture because it points to testing, formation, and long obedience under pressure.

The wilderness was not just a detour. It was a place where unbelief, dependence, rebellion, and trust all came into the open.

# One Word Worth Knowing

The Hebrew word **midbar** means wilderness or desert.

It is not just empty geography. In the Bible, the wilderness is often the place where God strips away false security and teaches people to depend on Him more deeply.

# One Big Takeaway from Episode 5

Episode 5 shows how a long season can reveal whether people really want God's promise, or just God's help on their own terms.

That is why the wilderness matters so much in Scripture. It is not only where Israel suffered. It is where they were tested.`,
    },
    {
      id: "promised-land-s1-e6",
      episodeNumber: 6,
      title: "Almost There",
      duration: "28m",
      summary:
        "The season closes with reflection, frustration, and the bittersweet sense that the journey has changed everyone more than they expected.",
      thumbnail: "/Promiseland.jpg",
      youtubeUrl: "https://youtu.be/Wx0hFYWxYRA?si=-P3-WNauS5k5ZpD5",
      available: true,
      discussionSlug: "bible-buddy-tv-promised-land-episode-6-almost-there",
      louisIntro:
        "Episode 6 feels quieter in some ways, but it lands because the wilderness has changed everybody. By the end of a season like this, the biggest question is not just whether the people are closer to the destination. It is what the journey has done to them. Moses, his family, and the camp all carry more wear, more perspective, and more tension than they did at the beginning. That bittersweet tone fits the Bible well. The journey to God's promise is often full of grace, but it is rarely simple or emotionally clean.",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where This Episode Lives in Scripture

This finale does not map to one single chapter as tightly as some of the earlier episodes, but it fits the emotional world of the later wilderness journey as Israel keeps moving toward the land with a mix of hope, regret, and weariness.

That makes it feel like a reflective ending instead of just another crisis chapter.

# Why "Almost There" Is Such a Powerful Wilderness Feeling

The phrase itself carries tension. Being close is not the same thing as arriving.

That matters in the Bible because many wilderness moments are full of nearness and frustration at the same time. People can be near the promise and still feel the cost of everything it took to get there.

# Moses Has Been Changed by the Journey

By this point Moses is not the same man who first stood before Pharaoh.

He has carried conflict, intercession, leadership pressure, miracles, rebellion, and family strain. That is part of what makes him such a compelling biblical figure. His story is not clean triumph. It is a life shaped by obedience under enormous weight.

# The People Have Been Changed Too

The wilderness does not leave anyone untouched.

Some people have been humbled. Some have become harder. Some are more dependent on God. Others are still resisting Him. That mixture is part of what makes the camp feel so believable in both Scripture and the show.

- wilderness seasons expose character
- long journeys reveal what people love most
- even progress can feel bittersweet

# Why Reflection Matters at the End

Biblically, remembrance is important because people forget quickly.

Israel is constantly called to remember what God has done. Reflection is not sentimental. It is spiritual survival. It keeps the story of God's faithfulness from getting swallowed by fatigue or frustration.

> "Remember all the way that the Lord your God has led you."  
> Deuteronomy 8:2

That verse comes later, but it captures the right posture for an ending like this one.

# One Word Worth Knowing

The Hebrew word **zakar** means to remember.

In Scripture, remembering is not passive nostalgia. It is an active spiritual response that shapes how people trust God in the present.

# One Big Takeaway from Episode 6

Episode 6 reminds us that God's people are often being changed on the way to the thing they think they are waiting for.

That is part of the deeper beauty of the wilderness. The destination matters, but so does the formation that happens before anyone gets there.`,
    },
  ],
};

export const theChosenTitle: BibleBuddyTvTitle = {
  id: "the-chosen",
  slug: "the-chosen",
  title: "The Chosen",
  badge: "Bible Buddy TV",
  category: "tv",
  poster: "/chosen.jpg",
  heroImage: "/chosen.jpg",
  accentFrom: "#7c2d12",
  accentTo: "#b45309",
  year: "Season 1",
  rating: "TV-PG",
  runtime: "4 Pair Episodes + Special",
  seasonsLabel: "Season 1",
  contentType: "series",
  logline:
    "A character-driven look at Jesus and the people whose lives were changed when He called them to follow Him.",
  overview:
    "The Chosen follows Jesus through the eyes of the people around Him, showing how His presence reshapes ordinary lives, deep struggles, and unlikely callings. For Bible Buddy TV, this first season is grouped in paired episodes so it fits the video uploads we have right now, while still giving each chapter of the story room to breathe.",
  vibe:
    "Personal, emotional, Scripture-rooted storytelling that helps the Gospels feel close, human, and alive.",
  continueWatchingLabel: "Episodes 1-2: The First Call",
  inMyList: true,
  searchTags: [
    "tv",
    "show",
    "series",
    "the chosen",
    "jesus",
    "gospels",
    "matthew",
    "peter",
    "mary magdalene",
    "disciples",
    "new testament",
    "galilee",
    "cana",
    "kingdom of god",
    "calling",
    "healing",
    "faith",
  ],
  episodes: [
    {
      id: "the-chosen-s1-e1-2",
      episodeNumber: 1,
      title: "Episodes 1-2: The First Call",
      duration: "1h 20m",
      summary:
        "The season opens by introducing the brokenness, longing, and spiritual hunger surrounding Jesus' ministry, then begins pulling key people toward Him in deeply personal ways.",
      thumbnail: "/chosen.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=0E-8-NcL7tc&t=23s",
      available: true,
      discussionSlug: "bible-buddy-tv-the-chosen-episode-1-2-the-first-call",
      louisIntro:
        "Episodes 1 and 2 really set the tone for The Chosen because they do not rush straight into spectacle. They slow down long enough for you to feel the ache in people's lives before Jesus steps into it. That is what makes these opening chapters work so well. You start seeing how shame, disappointment, religious pressure, and spiritual hunger all create the space where grace lands so powerfully. By the time Jesus begins calling people, it feels personal, not generic. He is not just gathering random followers. He is meeting real people in the middle of real need.",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where These Episodes Sit in Scripture

The opening of **The Chosen** draws from several early Gospel moments, especially material connected to **John 1**, **Luke 5**, and the wider atmosphere of first-century Judea under Roman rule.

That matters because the story of Jesus never begins in a vacuum. These episodes introduce a world full of pressure, disappointment, and longing. People are spiritually tired, politically occupied, and waiting for God to move.

# Why the Opening Feels So Personal

One of the strengths of these first paired episodes is that they make the Gospel world feel human before they make it feel dramatic.

That is actually a helpful Bible study move. Scripture gives us real people, not flat symbols. When Jesus calls people, He is stepping into fear, shame, isolation, and unmet hope.

- some are burdened by sin
- some are worn down by religion
- some are just trying to survive Roman pressure

# Jesus Meets People Before He Changes Their Direction

These early episodes help you feel the tenderness of Jesus' ministry.

He does not begin by building an image. He begins by seeing people clearly. That is why the first calls matter so much in the Gospels. Jesus is not only inviting belief. He is inviting a whole new life.

> "Come, follow me."  
> Matthew 4:19

# A Little Background on the World of the Gospels

The story takes place in a Jewish world shaped by covenant history, Roman occupation, and deep expectation that God would send deliverance.

The Hebrew word **shalom** does not just mean peace in a shallow sense. It points to wholeness, restoration, and life being made right. That longing sits behind so much of what people are feeling when Jesus arrives.

# Why the Calling Stories Matter So Much

The first calls in the Gospels remind us that Jesus often begins His work in ordinary places. A shoreline. A tax booth. A crowded town. A private moment of desperation.

That helps explain why these opening episodes land. The Messiah enters daily life, not just religious ceremony.

# One Big Takeaway from Episodes 1-2

These opening chapters remind us that Jesus does not wait for people to become impressive before He calls them.

He steps right into their real lives, and that is part of what makes the Gospel such good news.`,
    },
    {
      id: "the-chosen-s1-e3-4",
      episodeNumber: 2,
      title: "Episodes 3-4: Growing Faith",
      duration: "1h 12m",
      summary:
        "As Jesus' influence begins to spread, the cost of following Him becomes clearer, and the tension between expectation and trust starts to rise.",
      thumbnail: "/chosen.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=0DPzq53O4DI",
      available: true,
      discussionSlug: "bible-buddy-tv-the-chosen-episode-3-4-growing-faith",
      louisIntro:
        "Episodes 3 and 4 start showing what happens after people say yes to Jesus. Following Him sounds beautiful, but then real life keeps happening. Expectations get challenged, old habits do not disappear overnight, and the people around Jesus begin learning that discipleship is not just about being near Him. It is about trusting Him when you do not fully understand what He is doing yet. That is a big part of why these episodes work. They move the story from curiosity into commitment.",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where These Episodes Connect in Scripture

This part of the season fits the early movement of Jesus' ministry in passages like **Mark 1**, **Luke 4-5**, and **John 2**, where His words and signs begin to gather both faith and resistance.

The Gospels often show two things happening at once: people are drawn to Jesus, and people are unsettled by Him.

# Following Jesus Gets Personal Fast

That is one of the main things these episodes capture well. Once Jesus moves from being interesting to being followed, every person around Him has to deal with what that means.

Faith is no longer abstract. It starts touching family, reputation, work, and identity.

# Miracles Are Signs, Not Just Moments

When Jesus acts with power in the Gospels, the miracle itself matters, but it also points beyond itself.

The Greek word **semeion** means sign. That is helpful because the works of Jesus are not only displays of power. They reveal who He is.

> "This, the first of his signs, Jesus did at Cana in Galilee, and manifested his glory."  
> John 2:11

# The Disciples Are Still Being Formed

The people around Jesus do not become mature overnight.

- they still misunderstand things
- they still carry fear and baggage
- they are learning to trust Him step by step

That feels true to Scripture. Jesus calls real people and then patiently forms them over time.

# Why Opposition Starts Early

The more clearly Jesus reveals Himself, the more tension starts building with religious systems, expectations, and personal pride.

That pattern runs throughout the Gospels. Light draws hungry people in, but it also exposes hearts.

# One Big Takeaway from Episodes 3-4

These paired episodes remind us that following Jesus is not only exciting. It is disruptive in the best way.

He brings grace, but He also rearranges whatever cannot stay the same.`,
    },
    {
      id: "the-chosen-s1-e5-6",
      episodeNumber: 3,
      title: "Episodes 5-6: Called and Changed",
      duration: "1h 18m",
      summary:
        "The middle of the season leans into transformation, showing how being near Jesus begins changing motives, relationships, and the way people see themselves.",
      thumbnail: "/chosen.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=LB3QWkTBvr4",
      available: true,
      discussionSlug: "bible-buddy-tv-the-chosen-episode-5-6-called-and-changed",
      louisIntro:
        "Episodes 5 and 6 push deeper into transformation. This is where following Jesus starts doing more than inspiring people for a moment. It starts uncovering what needs healing, what needs surrender, and what needs to be redefined entirely. The Gospels are full of that kind of movement. Jesus brings people close, but closeness to Him always leads somewhere. These episodes help you feel that discipleship is not just about being included. It is about being changed.",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where These Episodes Live in the Gospel Story

This section reflects the growing rhythm of Jesus' ministry in places like **Matthew 9**, **Luke 5**, and **John 3-4**, where mercy, calling, healing, and truth all keep meeting people in very different situations.

That variety matters. Jesus is not ministering to one type of person. He is meeting all kinds of people with the same authority and compassion.

# Grace Does Not Leave People Unchanged

One of the clearest Gospel themes is that Jesus receives people with mercy, but He does not leave them as they are.

That is why transformation matters so much in this part of the story. His presence exposes wounds, pride, fear, and false identity, but always with the purpose of restoration.

> "If anyone is in Christ, he is a new creation."  
> 2 Corinthians 5:17

That verse comes later in the New Testament, but it captures the same Gospel movement these episodes are building toward.

# Why Calling and Healing Often Go Together

In the ministry of Jesus, healing is not random. It often reveals the kingdom of God breaking into real life.

The Hebrew word **hesed** speaks of covenant love, mercy, and faithful kindness. That kind of mercy sits underneath so much of what Jesus is doing.

- He sees people fully
- He responds with authority and compassion
- He restores while also inviting surrender

# Community Starts Forming Around Jesus

Another important thread in these episodes is the beginning of spiritual community.

The disciples are not only following Jesus individually. They are learning how to be with Him together. That creates friction, humility, and growth, which is very true to the way the Gospels unfold.

# One Big Takeaway from Episodes 5-6

These episodes show that Jesus does not call people just to admire Him from a distance.

He calls them close enough to be healed, challenged, and changed.`,
    },
    {
      id: "the-chosen-s1-e7-8",
      episodeNumber: 4,
      title: "Episodes 7-8: The Mission Widens",
      duration: "1h 28m",
      summary:
        "The season closes by widening the scope of Jesus' ministry and showing that the invitation to follow Him is bigger than any one person's expectations.",
      thumbnail: "/chosen.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=UwiURke07Ck&t=1s",
      available: true,
      discussionSlug: "bible-buddy-tv-the-chosen-episode-7-8-the-mission-widens",
      louisIntro:
        "Episodes 7 and 8 carry the weight of a season finale because they start making it clear that Jesus' mission is bigger than the people around Him first assumed. The more His ministry unfolds, the more you see that He is not gathering a polished inner circle for appearances. He is building a kingdom movement that reaches the overlooked, confronts pride, and keeps redefining what faithfulness looks like. That is why these closing episodes matter. They leave you with both comfort and challenge.",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where These Episodes Point in Scripture

These closing episodes fit the growing public reach of Jesus' ministry in passages like **Matthew 5-7**, **Luke 6**, and other places where His teaching and presence begin shaping a visible community.

By this point, the question is no longer whether Jesus is affecting people. The question is how far His mission will reach.

# The Kingdom of God Is Bigger Than People Expect

That is one of the central Gospel surprises. People often expect a Messiah who will fit neatly inside their assumptions, but Jesus keeps reaching farther than their categories.

He blesses unexpected people, calls unlikely followers, and speaks with authority that cannot be controlled.

> "Repent, for the kingdom of heaven is at hand."  
> Matthew 4:17

# Why the Season Ending Matters

A strong ending in a Jesus-centered story usually does two things:

- it gives a sense of what God has already done
- it leaves room for what He is still unfolding

That fits the Gospels well. Every faithful response to Jesus leads into a deeper response still.

# A Word Worth Knowing

The Greek word **basileia** means kingdom or reign.

When Jesus speaks about the kingdom, He is not only talking about a place. He is talking about God's rule breaking into the world in a real and present way.

# One Big Takeaway from Episodes 7-8

These final paired episodes remind us that Jesus' mission cannot be reduced to private inspiration.

His kingdom reaches outward, calls people deeper, and keeps challenging every small expectation placed on Him.`,
    },
    {
      id: "the-chosen-s1-special-last-supper",
      episodeNumber: 5,
      title: "The Last Supper Special",
      duration: "1h 30m",
      summary:
        "This special centers on one of the most sacred moments in the Gospel story, slowing down the weight of Jesus' final meal with His disciples before the cross.",
      thumbnail: "/chosen.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=p0H8sXNW2BA&t=3s",
      available: true,
      discussionSlug: "bible-buddy-tv-the-chosen-last-supper-special",
      louisIntro:
        "The Last Supper works best as a special because it holds a different kind of weight. This is not just another scene in the ministry timeline. It is one of the holiest and most emotionally loaded moments in the whole Gospel story. Jesus is sitting with the disciples on the edge of betrayal, suffering, covenant, and love, and every word in that room matters. So even if it does not fit neatly into this season grouping, it absolutely belongs in Bible Buddy TV because it gives people a chance to slow down and sit with a moment Scripture treats with real gravity.",
      reflectionQuestion: "What did you think about this episode?",
      studyNotesDocument: `# Where This Special Lives in Scripture

The Last Supper is found in **Matthew 26**, **Mark 14**, **Luke 22**, and is deeply connected to the upper room teaching in **John 13-17**.

That alone tells you how important this moment is. Multiple Gospel writers slow down here because the final meal carries covenant, sacrifice, betrayal, and love all at once.

# Why the Meal Matters So Much

Jesus is not just sharing dinner. He is re-framing the Passover around Himself.

That means the Exodus story and the Gospel story meet in a powerful way here. The meal points back to deliverance from Egypt, but now Jesus shows that a greater deliverance is about to come through His own body and blood.

> "This is my body, which is given for you. Do this in remembrance of me."  
> Luke 22:19

# Passover Background

Passover remembered how God delivered Israel through the blood of the lamb in **Exodus 12**.

That is why the Last Supper matters so deeply. Jesus is showing that He Himself is the fulfillment toward which that story was pointing.

# A Word Worth Knowing

The Greek word **diatheke** means covenant.

When Jesus speaks of the new covenant, He is announcing that God's saving relationship with His people is being fulfilled in a decisive new way through Him.

# One Big Takeaway from This Special

This special invites people to slow down and remember that the love of Jesus is never vague.

It moves toward sacrifice, covenant, and the cross with full awareness of what it will cost.`,
    },
  ],
};

export const mosesMovieTitle: BibleBuddyTvTitle = {
  id: "moses-movie",
  slug: "moses",
  title: "Moses",
  badge: "Bible Buddy Movie",
  category: "movies",
  poster: "/mosesmovie.jpg",
  heroImage: "/mosesmovie.jpg",
  accentFrom: "#7c3f1d",
  accentTo: "#b45309",
  year: "1995",
  rating: "TV-PG",
  runtime: "3h 2m",
  seasonsLabel: "Movie",
  contentType: "movie",
  logline:
    "A sweeping retelling of Moses' life, from his rescue in Egypt to the wilderness journey and the edge of the promised land.",
  overview:
    "This movie follows Moses from his upbringing in Pharaoh's house, through the burning bush and the exodus, all the way into the wilderness years that shape Israel into a covenant people. It keeps the big biblical moments front and center while showing the pressure, grief, and calling wrapped up in Moses' story.",
  vibe:
    "Big Old Testament storytelling with plagues, power, deliverance, desert testing, and the weight of leading people who keep struggling to trust God.",
  continueWatchingLabel: "Movie: Moses",
  inMyList: true,
  searchTags: [
    "movie",
    "moses",
    "the bible collection",
    "ben kingsley",
    "old testament",
    "exodus",
    "numbers",
    "deuteronomy",
    "aaron",
    "miriam",
    "zipporah",
    "jethro",
    "egypt",
    "pharaoh",
    "burning bush",
    "ten plagues",
    "passover",
    "red sea",
    "mount sinai",
    "ten commandments",
    "golden calf",
    "manna",
    "quail",
    "wilderness",
    "promised land",
    "israelites",
    "deliverance",
    "law",
    "covenant",
    "old testament movie",
  ],
  episodes: [
    {
      id: "moses-movie-main",
      episodeNumber: 1,
      title: "Moses",
      contentLabel: "Movie",
      duration: "3h 2m",
      summary:
        "Moses is raised in Egypt, called by God to confront Pharaoh, leads Israel through the Red Sea, and then carries the burden of the wilderness while learning that deliverance is only the beginning of the story.",
      thumbnail: "/mosesmovie.jpg",
      available: true,
      discussionSlug: "bible-buddy-tv-moses-movie",
      reflectionQuestion: "What did you think about this movie?",
      studyNotesDocument: `# Where This Movie Lives in Scripture

This movie draws mainly from **Exodus 1-34**, then continues into parts of **Numbers** and reaches the closing edge of Moses' story in **Deuteronomy 34**.

That means the film is covering one of the biggest stretches in the Old Testament. It starts with Israel under oppression in Egypt, follows Moses through his call and leadership, and then moves into the wilderness years where freedom has to become covenant faithfulness.

# The Story Starts in Egypt

The opening part of the movie is grounded in **Exodus 1-2**.

That is where Pharaoh oppresses the Israelites, Moses is hidden as a baby, drawn from the Nile, and raised inside Pharaoh's house. Scripture sets up Moses as someone who is connected to both Hebrew suffering and Egyptian power from the beginning.

The Hebrew name **Mosheh** is tied to the idea of being "drawn out," which fits both his rescue from the water and his later calling to draw Israel out of Egypt.

# The Burning Bush Changes Everything

The turning point comes from **Exodus 3-4**, when God speaks to Moses from the burning bush and sends him back to Egypt.

This is where the covenant name of God becomes especially important.

> "I AM WHO I AM."  
> Exodus 3:14

That moment matters because Moses is not stepping into the mission with personal confidence. He is stepping into it with divine calling.

# Pharaoh, the Plagues, and the Exodus

The middle of the movie leans on **Exodus 5-14**.

That includes Moses confronting Pharaoh, the ten plagues, Passover, and the crossing of the Red Sea. These scenes are not just dramatic set pieces. They are the Bible's way of showing that the Lord is stronger than Egypt's power, gods, and system of oppression.

- Pharaoh represents hardened resistance
- Passover points to rescue through sacrifice
- the Red Sea becomes the great picture of deliverance

# Sinai, Covenant, and the Golden Calf

The film also moves into **Exodus 19-32**, where Israel reaches Mount Sinai, receives God's law, and then quickly falls into idolatry with the golden calf.

That part of the story is crucial. The exodus is not only about getting people out of Egypt. It is about God forming a people who belong to Him.

The Hebrew word **berit** means covenant. Sinai is where Israel learns that redemption is meant to lead into relationship, worship, and obedience.

# The Wilderness Is More Than Travel

As the movie keeps going, it pulls from the broader wilderness material in **Numbers**, including Israel's complaining, fear, and repeated struggle to trust God fully.

That is why the movie feels heavier after the Red Sea. Scripture makes it clear that rescue was immediate, but formation was slower.

- manna shows God's daily provision
- grumbling reveals distrust
- rebellion keeps testing Moses' leadership

# Where the Movie Ends

The final stretch reaches toward the close of Moses' story in **Deuteronomy 34**, where he sees the promised land but does not enter it.

That ending matters because Moses' life is both triumphant and sobering. He is used powerfully by God, but his story also reminds us that even great leaders are still accountable to the Lord.

# One Big Takeaway from the Movie

This movie helps you feel the full arc of Moses' calling.

It is not only a story about miracles in Egypt. It is a story about rescue, covenant, leadership, failure, and the long process of learning to trust God in the wilderness.`,
      louisIntro:
        "This movie walks through the biggest turning points in Moses' life, but what really makes it hit is that it shows deliverance and leadership together. Moses is not only the man of the plagues or the Red Sea. He is also the man who has to carry a scared, stubborn, newly freed people through the wilderness while learning obedience himself. So when you watch this, think of it less like one isolated Bible event and more like a full Old Testament arc moving from oppression in Egypt to covenant at Sinai to testing in the desert on the way to the promised land.",
      youtubeUrl: "https://www.youtube.com/watch?v=KX83ed0Tg6g&t=5252s",
    },
  ],
};

export const josephMovieTitle: BibleBuddyTvTitle = {
  id: "joseph-movie",
  slug: "joseph",
  title: "Joseph",
  badge: "Bible Buddy Movie",
  category: "movies",
  poster: "/joseph1995.png",
  heroImage: "/joseph1995.png",
  accentFrom: "#1f3c88",
  accentTo: "#3749a8",
  year: "1995",
  rating: "TV-PG",
  runtime: "3h 5m",
  seasonsLabel: "Movie",
  contentType: "movie",
  logline:
    "A full Genesis retelling of Joseph's betrayal, suffering, rise in Egypt, and reconciliation with the family that wounded him.",
  overview:
    "This movie follows Joseph from the jealousy of his brothers and the pit, through slavery and prison in Egypt, into Pharaoh's court and the years of famine that bring his family back into his life. It moves through the emotional weight of Genesis while showing how God can work through betrayal, waiting, wisdom, and forgiveness.",
  vibe:
    "Dreams, family pain, providence, Egypt, endurance, and a powerful redemption arc that keeps Genesis feeling personal and alive.",
  continueWatchingLabel: "Movie: Joseph",
  inMyList: true,
  searchTags: [
    "movie",
    "joseph",
    "joseph 1995",
    "the bible collection",
    "genesis",
    "old testament",
    "jacob",
    "israel",
    "benjamin",
    "judah",
    "reuben",
    "potiphar",
    "potiphars wife",
    "pharaoh",
    "egypt",
    "dreams",
    "coat of many colors",
    "pit",
    "slavery",
    "prison",
    "famine",
    "forgiveness",
    "reconciliation",
    "goshen",
    "canaan",
    "old testament movie",
  ],
  episodes: [
    {
      id: "joseph-movie-main",
      episodeNumber: 1,
      title: "Joseph",
      contentLabel: "Movie",
      duration: "3h 5m",
      summary:
        "Joseph is betrayed by his brothers, sold into Egypt, falsely accused, forgotten in prison, and then raised by God into a place where he can save both nations and his own family.",
      thumbnail: "/joseph1995.png",
      youtubeUrl: "https://www.youtube.com/watch?v=ZczKjpbm_Ow&t=2874s",
      available: true,
      discussionSlug: "bible-buddy-tv-joseph-movie",
      reflectionQuestion: "What did you think about this movie?",
      studyNotesDocument: `# Where This Movie Lives in Scripture

This movie is mainly built from **Genesis 37-50**.

That means it covers Joseph's betrayal by his brothers, his years in Egypt, his rise under Pharaoh, the famine, and the deeply emotional reunion with Jacob and the rest of the family.

# The Story Starts with Family Tension

The opening movement comes from **Genesis 37**, where Joseph's dreams and his father's visible favor stir up jealousy in his brothers.

That is what drives the pit scene and the sale into slavery. The movie is not just telling a success story. It begins with a family wound that feels sharp and personal.

The Hebrew name **Yosef** is connected to the idea of "may He add," which fits Joseph's life because God keeps building something larger than what anybody around him can see at first.

# The Pit, Egypt, and the First Big Fall

Joseph's brothers throw him into a pit and sell him, and that changes the whole direction of the story.

Scripture uses that fall to begin showing one of the biggest themes in Genesis: what people mean for evil, God can still turn toward good.

> "Then Midianite traders passed by. And they drew Joseph up and lifted him out of the pit, and sold him."  
> Genesis 37:28

- the pit marks betrayal
- Egypt becomes the place of both suffering and elevation
- Joseph's story keeps moving through loss before victory

# Potiphar, Integrity, and Prison

The middle of the movie leans on **Genesis 39-40**.

Joseph serves in Potiphar's house, resists temptation, is falsely accused, and ends up in prison. That part matters because Joseph is not rising through life in a straight line. Even when he does what is right, he still suffers.

That is one reason Joseph's story has so much staying power. It speaks to people who are trying to stay faithful while life still feels unfair.

# Dreams Matter in This Story

Dreams show up all through Joseph's life, especially in **Genesis 37**, **40**, and **41**.

They are not random details. They are one of the main ways God reveals what He is doing before anybody else can fully understand it.

The Hebrew word **chalom** means dream, and in Joseph's story dreams become part of how God's hidden plan starts coming into view.

# Pharaoh, Wisdom, and the Famine

In **Genesis 41**, Joseph interprets Pharaoh's dreams and is raised into leadership over Egypt.

That shift is one of the biggest reversals in the Old Testament. The young man who was sold and forgotten is suddenly placed where he can preserve life during the famine.

- Joseph stores grain with wisdom
- famine drives the brothers back into the story
- God uses public responsibility to set up personal reconciliation

# Reconciliation with the Brothers

The emotional heart of the movie is in **Genesis 42-45**, when Joseph's brothers come to Egypt and do not realize who they are standing before.

That is where the story moves from survival into forgiveness. Joseph tests them, sees whether anything in them has changed, and eventually reveals himself in one of the most moving reunion scenes in Genesis.

> "God sent me before you to preserve life."  
> Genesis 45:5

That line changes the whole story. Joseph does not deny their evil, but he does see God's providence working beyond it.

# Where the Movie Ends

The final stretch of the story reaches **Genesis 46-50**, with Jacob coming to Egypt, the family settling in Goshen, and Joseph reflecting on everything God has done.

The famous closing idea of Joseph's life comes near the end:

> "You meant evil against me, but God meant it for good."  
> Genesis 50:20

# One Big Takeaway from the Movie

This movie helps you feel how Genesis tells Joseph's story as both heartbreak and providence.

It is about betrayal, endurance, wisdom, and forgiveness, but underneath all of that it is really about God's faithfulness working through years that probably looked confusing while they were being lived.`,
      louisIntro:
        "Joseph is one of those Bible stories that feels cinematic even before anybody filmed it. What makes this movie work is that it does not just show Joseph going from the pit to the palace. It lets you feel the long middle where betrayal, loneliness, restraint, prison, dreams, and waiting all shape him. So when the restoration finally comes, it does not feel cheap. It feels like Genesis has been showing you all along that God's providence can hold even the years that make no sense while you are living them.",
    },
  ],
};

export const bibleBuddyTvTitles: BibleBuddyTvTitle[] = [
  promisedLandTitle,
  theChosenTitle,
  mosesMovieTitle,
  josephMovieTitle,
  {
    id: "road-to-emmaus",
    slug: "road-to-emmaus",
    title: "Road to Emmaus",
    badge: "Coming Soon",
    category: "movies",
    poster: "/Promiseland.jpg",
    heroImage: "/Promiseland.jpg",
    accentFrom: "#9a3412",
    accentTo: "#c2410c",
    year: "Soon",
    rating: "TV-PG",
    runtime: "Movie",
    seasonsLabel: "Feature",
    logline: "A story-first Bible film slot reserved for future releases.",
    overview:
      "This placeholder marks where Bible Buddy TV movies will land once the library starts filling out.",
    vibe: "Story-first, cinematic, and ready for future uploads.",
    episodes: [],
  },
  {
    id: "sermon-room",
    slug: "sermon-room",
    title: "Sermon Room",
    badge: "Coming Soon",
    category: "sermons",
    poster: "/Promiseland.jpg",
    heroImage: "/Promiseland.jpg",
    accentFrom: "#0f766e",
    accentTo: "#0d9488",
    year: "Soon",
    rating: "All Ages",
    runtime: "Collection",
    seasonsLabel: "Messages",
    logline: "A home for sermon playlists and one-off messages.",
    overview:
      "This placeholder keeps the sermons shelf in place so the TV home already feels complete while content is being added.",
    vibe: "Teaching, reflection, and Bible-centered encouragement.",
    episodes: [],
  },
  {
    id: "desert-files",
    slug: "desert-files",
    title: "Desert Files",
    badge: "Coming Soon",
    category: "documentaries",
    poster: "/Promiseland.jpg",
    heroImage: "/Promiseland.jpg",
    accentFrom: "#57534e",
    accentTo: "#78716c",
    year: "Soon",
    rating: "TV-PG",
    runtime: "Series",
    seasonsLabel: "Docs",
    logline: "A spot for Bible documentaries and historical deep dives.",
    overview:
      "This placeholder represents the future documentary row for Bible history, geography, and cultural context.",
    vibe: "Context, history, and serious study without losing momentum.",
    episodes: [],
  },
  {
    id: "stories-for-the-road",
    slug: "stories-for-the-road",
    title: "Stories for the Road",
    badge: "Coming Soon",
    category: "bible-stories",
    poster: "/Promiseland.jpg",
    heroImage: "/Promiseland.jpg",
    accentFrom: "#1d4ed8",
    accentTo: "#2563eb",
    year: "Soon",
    rating: "All Ages",
    runtime: "Series",
    seasonsLabel: "Stories",
    logline: "A future shelf for Bible story content and retellings.",
    overview:
      "This placeholder gives Bible Stories a permanent home inside Bible Buddy TV from day one.",
    vibe: "Accessible, story-led, and easy to press play on.",
    episodes: [],
  },
];

export function getBibleBuddyTvTitle(slug: string) {
  return bibleBuddyTvTitles.find((title) => title.slug === slug) ?? null;
}

export function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    let videoId = parsed.searchParams.get("v");
    if (!videoId && parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.replace(/^\/+/, "").split("/")[0] || null;
    }
    if (!videoId && parsed.pathname.includes("/shorts/")) {
      videoId = parsed.pathname.split("/shorts/")[1]?.split("/")[0] || null;
    }
    if (!videoId) return url;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  } catch {
    return url;
  }
}
