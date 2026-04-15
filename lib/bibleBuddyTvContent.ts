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
    label: "Cartoons",
    description: "Animated and story-first Bible retellings for every age.",
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
      studyNotesDocument: `# 🎬 Episode 1 Does Not Start with Victory Energy

This episode is funny on the surface.

But underneath the comedy, it is carrying a real Bible weight.

Israel is free from Egypt, but freedom does not automatically create peace.
It does not automatically create order.
It does not automatically create maturity.

That is what this pilot understands.

The people are out.
Pharaoh is behind them.
But the wilderness has already started doing what the wilderness always does.

It exposes everybody.

Moses is exposed.
Aaron is exposed.
Miriam is exposed.
Zipporah is exposed.
And the people as a whole are exposed.

That is why this episode works.
It is not just playing around with Bible characters.
It is showing one of the deepest truths in Exodus.

Deliverance can happen in a moment.
Formation does not.

# 📍 Where This Episode Lives in Scripture

This episode mostly pulls from:

- **Exodus 17:8-13**
- **Exodus 18**

That means we are in a very specific stretch of Moses' story.

Israel has already crossed the sea.
They have already seen God move in huge ways.
But now they are in the part of the story where miracles are no longer the only issue.

Now the issue is:

- How do you lead these people every day
- How do you keep order in the camp
- How do you carry pressure without collapsing
- How do families function when everybody is exhausted

This is where Exodus gets deeply human.

# 🏕️ The Wilderness Is Not Just a Setting

Sometimes people read Exodus like the wilderness is just background scenery.

It is not.

The wilderness is one of the main characters in the story.

The Hebrew word **midbar** means wilderness or desert.
But biblically, the wilderness is more than geography.

It is the place where:

- false strength gets stripped away
- trust gets tested
- people start saying what is really in them
- dependence on God becomes unavoidable

That is exactly the pressure you feel in this pilot.

Everybody is free.
But nobody is settled.

Everybody is moving.
But nobody looks emotionally ready for what comes next.

That is not weakness in the writing.
That is honesty about Exodus.

# ⚔️ The Battle with Amalek Is About More Than War

One of the key moments sitting behind this episode is the battle with Amalek in **Exodus 17:8-13**.

Aaron talks through it like a story that is already living in camp memory.
And it should be.

Because this was not just another fight.
This was one of the first major reminders that Israel's survival was tied to God's presence, not their own ability.

> "Whenever Moses held up his hand, Israel prevailed, and whenever he lowered his hand, Amalek prevailed."  
> Exodus 17:11

That verse is strange on purpose.

God is making a point.

Victory is not flowing from military genius.
It is not flowing from Israel suddenly becoming powerful.
It is flowing from dependence.

And even more than that, it is showing that leadership is physically costly.

Moses cannot just stand there forever.
His arms get tired.
His body reaches a limit.

So Aaron and Hur step in.

- they bring a stone for Moses to sit on
- they hold up his hands
- they help carry the burden he cannot carry alone

That is huge.

Because one of the first things this episode quietly teaches is that strong leadership is not solo leadership.

# 👥 Moses Is Not a Polished Hero

This is where people often flatten Moses too much.

They think of:

- the staff
- Pharaoh
- the Red Sea
- Mount Sinai

And all of that matters.

But Exodus does not present Moses as a sleek, untouchable spiritual machine.

It presents him as a man under enormous pressure.

Moses is chosen by God.
But being chosen by God does not erase his humanity.

He gets overwhelmed.
He gets tired.
He gets frustrated.
He carries a whole nation that constantly wants something from him.

That is why this show angle actually makes sense.

If you read Exodus honestly, Moses is not just miracle-guy.
He is burdened-leader-guy.

The Hebrew name **Mosheh** is usually connected to being "drawn out."
He was drawn out of the Nile as a baby.
And later, God uses him to draw Israel out of Egypt.

But by episode 1, you can already feel another layer:

Moses is also the one being stretched out.
Pulled in every direction.
Pressed by the needs of everybody around him.

# 🗣️ Why Aaron Matters So Much Here

Aaron is not just there to fill space next to Moses.

He matters because Aaron often helps us see Moses from close range.

Aaron is:

- Moses' brother
- his public support
- one of the few people who understands the leadership pressure up close

That is why Aaron speaking in this episode lands.
He is near enough to the burden to talk about it with credibility.

But Aaron is also important for another reason.

Aaron represents how even good support people can become unstable later.

That is part of what makes Exodus realistic.

The same Aaron who helps hold Moses up in one scene is the same Aaron who later caves under pressure in **Exodus 32** with the golden calf.

Scripture is honest like that.

People are not one-note.
They can be faithful in one chapter and weak in another.

# 👴 Jethro Is More Than a Visiting Relative

Jethro enters in **Exodus 18**, and this episode is right to treat that visit as a big moment.

Because Jethro is not just Moses' father-in-law.
He is one of the clearest outside voices of wisdom in Moses' life.

That matters.

Sometimes the people closest to a burden get so used to it that they stop seeing how unsustainable it has become.

Jethro sees it immediately.

> "What you are doing is not good."  
> Exodus 18:17

That is one of the coldest and kindest lines in Exodus.

Cold because it cuts right to the point.
Kind because it is meant to save Moses, not shame him.

Jethro watches Moses trying to solve every dispute, hear every complaint, and carry the whole camp by himself.

And he understands something Moses has not fully acted on yet:

- calling does not cancel limits
- caring is not the same as carrying everything
- a healthy people need structure, not just passion

This is one of the strongest leadership sections in the whole Moses story.

# 😊 Zipporah and 😒 Miriam

One reason this episode feels alive is because it lets family tension breathe.

Zipporah and Miriam are not random women in the background.
They are two major women tied to Moses' life, and both matter.

**Zipporah** is Moses' wife.
She is Midianite.
Her father is Jethro.
She has already lived through Moses' exile season before the exodus story even reaches its public stage.

That means Zipporah is not new to Moses' calling.
But she is stepping into a new level of pressure now that Israel is fully moving as a nation.

**Miriam** is Moses' sister.
She is one of the earliest protectors in his life.
She watched over him as a baby.
She later becomes a prophetess in Israel.

So when there is tension between Miriam and Zipporah, it works because these are not small personalities.

These are two women with deep proximity to Moses, deep opinions, and deep emotional investment in what is happening around him.

The Bible does not record this exact first meeting conversation.
But it absolutely gives us enough reason to believe that family tension inside leadership space would have been real.

When calling gets heavy, personalities get louder.

# 🏙️ Camp Life Is Part of the Theology

That is one thing I do not want you to miss in this episode.

The camp chaos is not just there for jokes.

It is there because Exodus is always balancing:

- God's holiness
- people's mess
- leadership burden
- community formation

The people are not a neat crowd.
They are a recently rescued nation carrying fear, memory, trauma, impatience, entitlement, and hope all at once.

That is why camp life feels loud.

And honestly, that is why this pilot feels believable.

Not because it copies a modern comedy formula.
But because Exodus itself is already full of human friction.

# 🧨 Korah in the Background

Korah being in the background matters.

Even if the show is setting him up early in a dramatized way, Bible readers know his name is not random.

Korah becomes a major rebel in **Numbers 16**.
He eventually challenges Moses and Aaron directly.

So if you know the larger story, his presence here feels like a warning sign.

Not every threat to Moses will come from Pharaoh-type enemies.
Some of the deepest threats will rise from inside the covenant community itself.

That is a very biblical pattern.

Sometimes the heaviest resistance does not come from outside opposition.
It comes from people who are close enough to the story to distort it from within.

# 📖 One Verse That Explains the Whole Mood

If I had to pick one verse sitting under the whole emotional mood of this episode, it would be this:

> "You and the people with you will certainly wear yourselves out."  
> Exodus 18:18

Because that is the pilot in one sentence.

Everybody is wearing out.

Moses is wearing out.
The people are wearing out.
Families are wearing out.
The camp is already showing the strain of a freedom they are not mature enough to manage yet.

# 🔥 Final Takeaway

Episode 1 is not mainly about whether God delivered Israel.
That part is already settled.

Episode 1 is about what happens after the big deliverance moment.

What now.

Now the real work begins.

Now leadership has to become sustainable.
Now family tension has to be navigated.
Now the camp has to be formed.
Now dependence on God has to move past one dramatic miracle and into daily life.

And that is exactly why this episode matters.

Exodus is not only the story of getting out.
It is the story of learning how to live after getting out.

And episode 1 already understands that the hardest part of the journey may not be Egypt.

It may be the people.`,
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

export const gospelOfJohnMovieTitle: BibleBuddyTvTitle = {
  id: "gospel-of-john-movie",
  slug: "gospel-of-john",
  title: "The Gospel of John",
  badge: "Bible Buddy Movie",
  category: "movies",
  poster: "/gospelofjohn.jpg",
  heroImage: "/gospelofjohn.jpg",
  accentFrom: "#3b82f6",
  accentTo: "#1d4ed8",
  year: "2003",
  rating: "PG-13",
  runtime: "3h",
  seasonsLabel: "Movie",
  contentType: "movie",
  logline:
    "A full-screen retelling of John's Gospel that stays close to the text and follows Jesus from eternity language to crucifixion and resurrection.",
  overview:
    "This film walks through the Gospel of John almost scene by scene, letting the words and signs of Jesus carry the story. It highlights the identity of Christ, the testimony of witnesses, the growing tension with religious leaders, and the steady movement toward the cross, all while keeping John's deep spiritual themes front and center.",
  vibe:
    "Direct Scripture, reflective pacing, bold Christology, intimate disciple moments, miracles as signs, and a steady build toward the cross and resurrection.",
  continueWatchingLabel: "Movie: The Gospel of John",
  inMyList: true,
  searchTags: [
    "movie",
    "the gospel of john",
    "gospel of john",
    "john movie",
    "jesus",
    "christopher plummer",
    "henry ian cusick",
    "stuart bunce",
    "new testament",
    "gospel",
    "john",
    "john the baptist",
    "disciples",
    "peter",
    "nicodemus",
    "samaritan woman",
    "lazarus",
    "mary",
    "martha",
    "judea",
    "galilee",
    "samaria",
    "jerusalem",
    "signs",
    "i am",
    "word made flesh",
    "crucifixion",
    "resurrection",
    "eternal life",
    "new testament movie",
  ],
  episodes: [
    {
      id: "gospel-of-john-movie-main",
      episodeNumber: 1,
      title: "The Gospel of John",
      contentLabel: "Movie",
      duration: "3h",
      summary:
        "John's Gospel unfolds from the opening declaration that the Word was with God and was God, through the signs and sayings of Jesus, into the cross, the empty tomb, and the invitation to believe.",
      thumbnail: "/gospelofjohn.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=-k0D_qFPb4o",
      available: true,
      discussionSlug: "bible-buddy-tv-gospel-of-john-movie",
      reflectionQuestion: "What stood out to you most in this movie?",
      louisIntro:
        "This movie is different from a lot of Bible films because it does not mainly feel like a dramatized remix. It feels like John is trying to preach through a camera. That matters, because the Gospel of John is not only giving you events from Jesus' life. It is constantly telling you what those events mean. Every sign, every conversation, every \"I am\" saying, every conflict, and every miracle is pushing you toward one question: who is Jesus really? So as you watch, do not only track the scenes. Track the identity claim underneath the scenes.",
      studyNotesDocument: `# The Gospel of John Is Trying to Do Something Very Specific

John is not writing a random collection of Jesus moments.

He is building a case.

Not just that Jesus existed.
Not just that Jesus taught well.
Not just that Jesus did miracles.

John is writing so people will believe.

That is why this movie feels so direct.
Because the Gospel itself is direct.

John tells you near the end why he wrote:

> "These are written so that you may believe that Jesus is the Christ, the Son of God, and that by believing you may have life in his name."
> John 20:31

That verse is basically the mission statement for the whole movie.

# Where This Movie Lives in Scripture

This movie covers the Gospel of **John**, moving across the whole book from **John 1** to **John 21**.

That means it includes:

- the eternal Word language in chapter 1
- John the Baptist's witness
- Jesus calling the first disciples
- signs like Cana, the healing stories, and Lazarus
- the long private teaching sections
- the upper room
- the crucifixion
- the resurrection

Unlike some movies that pull from all four Gospels at once, this one stays close to John's own voice.

# John Starts Higher Than the Other Gospels

Matthew starts with genealogy.
Mark starts with ministry movement.
Luke starts with careful historical framing.

John starts in eternity.

> "In the beginning was the Word, and the Word was with God, and the Word was God."
> John 1:1

That is huge.

John wants you to understand from the start that Jesus is not only another prophet stepping into history.
He is the eternal Son.

The Greek word **Logos** means Word.
In John, that word carries the idea of divine self-expression, reason, revelation, and presence.

So when John says the Word became flesh, he is saying God has come near in a visible, personal way.

# Why the Signs Matter So Much

John does not just call them miracles.
He often calls them **signs**.

That matters because a sign points beyond itself.

The water into wine is not just about impressive power.
It points to abundance and messianic joy.

The feeding of the five thousand is not just about bread.
It points to Jesus as the true bread of life.

The healing of the blind man is not just about restored sight.
It points to spiritual blindness and revelation.

The raising of Lazarus is not just about one family being comforted.
It points to Jesus as resurrection and life.

John is always asking you not only, "What happened?"
but also, "What is this showing you about Jesus?"

# Important People the Movie Keeps Putting in Front of You

There are several people in John's Gospel you need to understand to really feel what is happening.

## John the Baptist

John the Baptist is the witness, not the light.

That distinction matters.
His whole job is to point away from himself and toward Jesus.

John 1 keeps pressing that because witness is one of the major themes of this Gospel.

## Nicodemus

Nicodemus represents sincere but limited religious understanding.
He is careful, educated, and spiritually serious.
But he still struggles to grasp what Jesus means by new birth.

His conversation in **John 3** gives you one of the clearest examples in the whole Gospel that natural understanding is not enough.

## The Samaritan Woman

This scene in **John 4** matters deeply because it brings together:

- ethnicity
- worship
- shame
- thirst
- revelation

Jesus crosses social boundaries on purpose.
He speaks to a Samaritan woman publicly, which already breaks expectations.
Then He exposes her life without crushing her and reveals Himself in a way that turns her into a witness.

That is classic John.
Revelation leads to testimony.

## Lazarus, Mary, and Martha

Bethany becomes one of the most emotionally powerful places in the Gospel.

When Lazarus dies, the movie is not just showing grief.
It is showing that Jesus' power over death is moving closer and closer to the cross.

And notice this: raising Lazarus is one of the clearest signs in the whole Gospel, but it also intensifies the plot against Jesus.

That is deeply Johannine.
The brighter the sign, the harder some hearts push back.

# Places Matter in John's Gospel Too

John keeps moving through meaningful locations.

## Galilee

Galilee is where public signs begin to gather momentum.
It becomes a place where glory starts to show itself in ordinary settings.

## Samaria

Samaria matters because it shows Jesus reaching across old hostility.
The Gospel is already hinting that this message will not stay boxed inside narrow boundaries.

## Jerusalem

Jerusalem is the tension city.
It is the place of feasts, conflict, temple imagery, and rising pressure.
By the time you get deeper into John, Jerusalem feels like the stage where belief and unbelief clash in the sharpest way.

# The “I Am” Sayings Are a Big Deal

One of John's strongest features is the repeated **"I am"** language.

Jesus says:

- I am the bread of life
- I am the light of the world
- I am the door
- I am the good shepherd
- I am the resurrection and the life
- I am the way, the truth, and the life
- I am the true vine

This is not accidental wording.

It reaches back to **Exodus 3**, where God reveals Himself to Moses.
So every time Jesus speaks this way, John is doing more than giving you a poetic image.
He is putting divine identity right in front of you.

# The Cross in John Is Still Suffering, But It Is Also Glory

John never softens the pain of the cross.
But he also keeps showing it as the place where Jesus is lifted up in glory.

That is one of the big differences in tone you feel here.

Jesus is not losing control.
He is laying His life down.

That is why John 10 matters so much behind the whole movie:

> "No one takes it from me, but I lay it down of my own accord."
> John 10:18

The crucifixion is brutal.
But in John, it is also purposeful.
It is the hour toward which the whole Gospel has been moving.

# Resurrection and Belief

The resurrection scenes are not only victory scenes.
They are belief scenes.

Mary Magdalene, Thomas, and the disciples all show you different responses to the risen Christ.

Thomas especially matters because a lot of people know what it is like to want certainty.
And yet John does not leave Thomas in unbelief.
He brings him to one of the clearest confessions in the whole book:

> "My Lord and my God!"
> John 20:28

That confession is the right ending note for this movie.
Because after all the signs, all the words, all the questions, and all the opposition, the Gospel is still pressing you toward worship.

# Final Takeaway

The Gospel of John is not mainly asking whether Jesus was interesting.
It is asking whether He is who He said He is.

This movie works when you watch it with that in mind.

It is about:

- identity
- witness
- belief
- eternal life
- the glory of Christ

John is inviting you past surface admiration.
He wants you to see the Son, trust the Son, and receive life in His name.

And that is why this story still hits so hard.
It is not only information about Jesus.
It is an invitation to believe Him.`,
    },
  ],
};

export const estherMovieTitle: BibleBuddyTvTitle = {
  id: "esther-movie",
  slug: "esther",
  title: "Esther",
  badge: "Bible Buddy Movie",
  category: "movies",
  poster: "/esthermovie.png",
  heroImage: "/esthermovie.png",
  accentFrom: "#7c2d6f",
  accentTo: "#a21caf",
  year: "1999",
  rating: "TV-PG",
  runtime: "3h",
  seasonsLabel: "Movie",
  contentType: "movie",
  logline:
    "Esther enters the Persian palace and risks everything to stop the destruction of the Jewish people.",
  overview:
    "The Bible Collection: Esther follows a Jewish woman who is drawn into the king of Persia's court and placed in a position of terrifying influence at exactly the moment her people face a planned genocide. The story moves through beauty, power, secrecy, courage, and providence as Esther and Mordecai navigate palace politics and trust that God can work even when He seems hidden.",
  vibe:
    "Royal tension, hidden identity, political danger, fasting, courage under pressure, and the kind of providence that turns a death sentence into deliverance.",
  continueWatchingLabel: "Movie: Esther",
  inMyList: true,
  searchTags: [
    "movie",
    "esther",
    "the bible collection esther",
    "old testament",
    "book of esther",
    "persia",
    "xerxes",
    "ahasuerus",
    "king of persia",
    "queen esther",
    "mordecai",
    "haman",
    "vashti",
    "jewish people",
    "genocide",
    "purim",
    "susa",
    "palace",
    "harem",
    "hidden providence",
    "courage",
    "fasting",
    "deliverance",
    "old testament movie",
  ],
  episodes: [
    {
      id: "esther-movie-main",
      episodeNumber: 1,
      title: "Esther",
      contentLabel: "Movie",
      duration: "3h",
      summary:
        "Esther is brought into the Persian court, conceals her Jewish identity, and is eventually called to risk her life before the king in order to stop Haman's plan to wipe out her people.",
      thumbnail: "/esthermovie.png",
      youtubeUrl: "https://www.youtube.com/watch?v=6y_yJuFJ7uM",
      available: true,
      discussionSlug: "bible-buddy-tv-esther-movie",
      reflectionQuestion: "What did you think about this movie?",
      louisIntro:
        "Esther is one of the most tension-filled stories in the Old Testament because everything feels fragile at the same time. God's name is famously not spoken in the book, but His providence is all over the story. The palace looks powerful, the law looks final, and Haman looks untouchable, but the whole movie keeps showing that hidden faithfulness can still move through ordinary people, risky obedience, and moments that seem almost too perfectly timed to be accidental.",
      studyNotesDocument: `# Esther Is a Story About Hidden Providence

One of the first things people notice about Esther is that God's name is not mentioned directly in the book.

That matters.

Because Esther teaches you to watch for providence even when the story does not feel outwardly miraculous.

There is no Red Sea here.
No fire from heaven.
No prophet stepping in with a dramatic speech from the Lord.

Instead, the book gives you:

- court politics
- sleepless nights
- reversals
- timing
- courage
- hidden identity

And through all of that, God is still moving.

# Where This Movie Lives in Scripture

This movie is based on the **Book of Esther**, mainly moving through **Esther 1-10**.

That means it includes:

- Queen Vashti's removal
- Esther entering the king's harem
- Mordecai's faithfulness
- Haman's rise
- the plot to destroy the Jewish people
- Esther's fast
- her approach to the king
- Haman's downfall
- the deliverance of the Jews

This is one of the clearest reversal stories in the Old Testament.

# The Persian Setting Matters

The story takes place in the Persian Empire, especially in **Susa**.

Susa was a major royal city.
That matters because this is not a village-level conflict.
This is imperial power.

The king in Esther is usually identified as **Ahasuerus**, often connected with Xerxes I.
So the movie is working in a world of massive political authority, court ceremony, decrees, and public displays of power.

That world explains why Esther's courage matters so much.
She is not pushing back against a private inconvenience.
She is stepping into danger inside the heart of empire.

# Esther Is More Than a Beauty Story

People sometimes flatten Esther into the woman who became queen.

But Scripture gives you much more than that.

Esther is:

- Jewish
- vulnerable
- strategically placed
- under pressure
- forced to grow into public courage

Her Hebrew name is **Hadassah**, which means myrtle.
The name **Esther** is the Persian name used in the court setting.

That dual naming already hints at one of the major tensions in the book:

- hidden identity
- visible influence

# Mordecai Matters a Lot

Mordecai is not just Esther's older relative in the background.
He is one of the moral anchors of the story.

He raises Esther.
He uncovers a plot against the king.
He refuses to bow to Haman.
And he becomes one of the key human instruments God uses to protect the Jewish people.

That refusal to bow is a huge moment.

It shows that Esther is not only about survival.
It is also about allegiance.

Mordecai understands that some forms of public compromise cost too much.

# Haman and the Threat of Genocide

Haman is not just a bad guy with a grudge.

He is a proud official whose personal rage turns into a public plan of destruction.

That is what makes him so dangerous.

His offense begins with Mordecai.
But his hatred expands toward an entire people.

That is how evil often works.
It takes wounded pride and grows it into something much larger and more destructive.

The movie's central threat is tied to this reality:

- Haman has influence
- Persian law feels irreversible
- the Jewish people look exposed

So Esther is not stepping into a symbolic moment.
She is stepping into a life-and-death crisis.

# Fasting Before Action

One of the most powerful parts of Esther is the fast.

Before Esther goes in to the king, she tells Mordecai:

> "Then I will go to the king, though it is against the law, and if I perish, I perish."
> Esther 4:16

That line carries the whole emotional weight of the book.

It is courage, but not reckless courage.
It is courage that has passed through prayerful seriousness.

Fasting matters here because it shows dependence.
Esther is not trusting charm or palace skill alone.
She knows this moment requires more than strategy.

# The Palace Is Full of Reversals

Esther is one of the great reversal books of Scripture.

Watch how the story turns:

- the orphan becomes queen
- the ignored faithful act gets remembered later
- the proud man is humiliated
- the threatened people are preserved
- the gallows prepared for another become the instrument of judgment on the plotter

This is why Esther feels so satisfying.

The book keeps showing that God can turn the story without announcing Himself loudly.

# One Word Worth Knowing

The Jewish feast that comes out of this story is **Purim**.

That word is tied to the casting of lots, because Haman cast lots to determine the day of destruction.

And that is exactly what makes the ending so powerful.

The very thing meant to seal the Jews' doom becomes part of the memory of their deliverance.

# Why Esther Still Matters

Esther matters because a lot of people know what it feels like to live in a world where God seems quiet.

The book does not deny that feeling.

Instead, it teaches you to look more carefully.

Providence is still moving.
Timing still matters.
Faithfulness still matters.
Courage still matters.

And hidden obedience can still become the turning point in a much larger story.

# Final Takeaway

This movie helps you feel the pressure of Esther's world:

- power at the top
- danger in the middle
- fear for the people
- courage in the decisive moment

But underneath all of it, the story is really about providence.

God is not absent just because He is quiet.

And Esther reminds you that sometimes the people God uses most powerfully are the ones placed in the right moment, called to act bravely, while trusting that He has been arranging more than they can see.`,
    },
  ],
};

export const jeremiahMovieTitle: BibleBuddyTvTitle = {
  id: "jeremiah-movie",
  slug: "jeremiah",
  title: "Jeremiah",
  badge: "Bible Buddy Movie",
  category: "movies",
  poster: "/Jeremiah.jpg",
  heroImage: "/Jeremiah.jpg",
  accentFrom: "#6b3f1d",
  accentTo: "#92400e",
  year: "1998",
  rating: "TV-PG",
  runtime: "3h",
  seasonsLabel: "Movie",
  contentType: "movie",
  logline:
    "Jeremiah is called to warn Judah of coming judgment, endure rejection, and keep speaking God's word as Jerusalem moves toward collapse.",
  overview:
    "The Bible Collection: Jeremiah follows the prophet from his calling into a ministry marked by warning, heartbreak, persecution, and faithfulness. As Judah hardens its heart and Babylon closes in, Jeremiah keeps calling the nation back to covenant loyalty while carrying the emotional cost of preaching a message people do not want to hear.",
  vibe:
    "Prophetic fire, national collapse, covenant warning, tears, resistance, and the kind of lonely obedience that keeps speaking truth even when nobody wants it.",
  continueWatchingLabel: "Movie: Jeremiah",
  inMyList: true,
  searchTags: [
    "movie",
    "jeremiah",
    "the bible collection jeremiah",
    "old testament",
    "book of jeremiah",
    "prophet",
    "major prophets",
    "judah",
    "jerusalem",
    "babylon",
    "nebuchadnezzar",
    "temple",
    "covenant",
    "judgment",
    "repentance",
    "lament",
    "baruch",
    "weeping prophet",
    "new covenant",
    "exile",
    "false prophets",
    "idolatry",
    "destruction of jerusalem",
    "old testament movie",
  ],
  episodes: [
    {
      id: "jeremiah-movie-main",
      episodeNumber: 1,
      title: "Jeremiah",
      contentLabel: "Movie",
      duration: "3h",
      summary:
        "Jeremiah is called to confront Judah's rebellion, warn of Babylon's coming judgment, suffer rejection from kings and priests, and keep declaring that God will both judge sin and preserve a future hope.",
      thumbnail: "/Jeremiah.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=xNQvmnbNF1k&t=916s",
      available: true,
      discussionSlug: "bible-buddy-tv-jeremiah-movie",
      reflectionQuestion: "What did you think about this movie?",
      louisIntro:
        "Jeremiah is one of the heaviest prophet stories in the whole Bible because he is not speaking into a small personal problem. He is speaking into the collapse of a nation. This movie works when you feel that weight. Jeremiah is not mainly a public motivational figure. He is a covenant prophet standing in the middle of idolatry, political denial, false reassurance, and coming judgment, still telling the truth when that truth costs him almost everything.",
      studyNotesDocument: `# Jeremiah Is a Movie About Warning Before Collapse

Jeremiah's story is not built around a quick victory arc.

It is built around warning, heartbreak, resistance, and faithfulness.

That matters because a lot of Bible readers know Jeremiah as the "weeping prophet," but the tears are not the whole story.

Jeremiah is also:

- courageous
- relentless
- painfully obedient
- covenant-centered
- anchored in God's word even when everyone around him wants softer messages

This movie works when you understand that Jeremiah is preaching to a people who still want religion without repentance.

# Where This Movie Lives in Scripture

This movie draws mainly from the **Book of Jeremiah**, especially the prophet's call in **Jeremiah 1**, his warnings to Judah and Jerusalem, his conflict with kings, priests, and false prophets, and the broader fall of Jerusalem into Babylonian judgment.

It also reaches into themes connected to:

- **2 Kings 22-25**
- **2 Chronicles 34-36**
- the rise of Babylon
- the destruction of Jerusalem
- exile

So this is not only one man's spiritual biography.
It is the story of a prophet speaking at the edge of national ruin.

# Jeremiah's Calling Starts Early and Feels Heavy Immediately

Jeremiah's call in **Jeremiah 1** is one of the clearest prophetic call scenes in the Bible.

> "Before I formed you in the womb I knew you, and before you were born I consecrated you."
> Jeremiah 1:5

That line matters because Jeremiah's ministry is not self-invented.
He is not choosing a difficult public role out of personal ambition.
He is being appointed by God into one.

And from the beginning, the calling feels costly.

Jeremiah protests his youth.
God answers by giving him His word.

That is a major pattern in prophetic ministry:

- personal weakness
- divine commissioning
- a word stronger than the speaker

# Judah Is Still Religious, But Spiritually Rotten

One of the most important things this movie can help people see is that Jeremiah is not preaching to a people who have no spiritual language.

He is preaching to a people who still have:

- temple activity
- ritual
- leaders
- public claims of belonging to God

But underneath that, there is idolatry, injustice, stubbornness, and false security.

That is why Jeremiah hits so hard.

He keeps exposing the gap between outward religion and actual covenant faithfulness.

The people think sacred symbols will protect them automatically.
Jeremiah keeps saying covenant privilege does not cancel covenant responsibility.

# Jerusalem and the Temple Matter Deeply Here

Jerusalem is not just the background city in this story.
It is the city where the covenant people live, where the temple stands, and where false confidence keeps growing.

That is why Jeremiah's temple sermon matters so much.

He is standing near the center of national religious identity and saying, in effect:

- stop trusting appearances
- stop assuming the temple guarantees safety
- stop acting like God's house can cover unrepentant living

That message is explosive.

Because when sacred space gets turned into spiritual cover for rebellion, prophets have to speak plainly.

# Babylon Is the Instrument of Judgment

Babylon matters because it represents the historical form judgment will take.

This is not abstract warning.
This is real invasion, real siege, real collapse.

Nebuchadnezzar and Babylon become the political force through which Judah's covenant rebellion is answered.

That is one reason Jeremiah is such a sobering book.

God is not only speaking morally in general terms.
He is speaking into history.

And history is about to move.

# Baruch and the Cost of Writing the Word

Baruch matters too.

He is Jeremiah's scribe and close companion, and that tells you something important:

Jeremiah's ministry is not just oral prophecy disappearing into the air.
The word is being preserved, written, carried, and re-spoken.

That matters because truth has to survive opposition.

And Jeremiah's scroll story shows that even when kings burn the message, they cannot burn away the authority behind it.

# False Prophets Make Everything Harder

One of the hardest parts of Jeremiah's ministry is that he is not only fighting open rebellion.
He is also surrounded by competing voices.

That means the real pressure is not just:

- will people listen to God

It is also:

- which message will they believe
- the one that wounds before it heals
- or the one that comforts without truth

That is why false prophets matter so much in Jeremiah.

They keep saying peace when judgment is near.
They keep feeding denial when repentance is needed.

That dynamic still feels familiar.

# One Phrase Worth Knowing

Jeremiah is deeply tied to the idea of **covenant**.

The Hebrew word **berit** means covenant.

That matters because Jeremiah is not just saying Judah made mistakes.
He is saying Judah has broken relationship with the God who redeemed and claimed them.

And then, in one of the most beautiful turns in the whole book, Jeremiah also speaks of a **new covenant** in **Jeremiah 31**.

That means the prophet of judgment is also a prophet of hope.

> "I will put my law within them, and I will write it on their hearts."
> Jeremiah 31:33

That line is huge.

Because Jeremiah is not only announcing destruction.
He is also announcing that God's final answer to sin will involve deeper transformation, not just external reform.

# Jeremiah's Tears Are Not Weakness

When people call Jeremiah the weeping prophet, they should not mean that he is fragile in a shallow sense.

The tears matter because Jeremiah feels the weight of:

- sin against God
- coming judgment
- human stubbornness
- national disaster

That kind of grief is not weakness.
It is spiritual clarity with a human heart still alive inside it.

Jeremiah does not become numb.
He keeps feeling the burden of the message even while speaking it faithfully.

# Final Takeaway

This movie helps you feel what prophetic faithfulness looks like when the culture is collapsing.

Jeremiah is not triumphant in the easy sense.
He is faithful in the costly sense.

He keeps standing.
He keeps speaking.
He keeps warning.
He keeps grieving.

And through him, Scripture reminds you that God is serious about covenant, serious about sin, and still serious about hope on the far side of judgment.

That is why Jeremiah matters.

He is the prophet who proves that hard truth and real hope can live in the same message.`,
    },
  ],
};

export const lostTreasuresDocumentaryTitle: BibleBuddyTvTitle = {
  id: "lost-treasures-of-the-bible",
  slug: "lost-treasures-of-the-bible",
  title: "Lost Treasures of the Bible",
  badge: "Bible Buddy Documentary",
  category: "documentaries",
  poster: "/losttreasures.png",
  heroImage: "/losttreasures.png",
  accentFrom: "#475569",
  accentTo: "#334155",
  year: "2024",
  rating: "TV-PG",
  runtime: "2h 10m",
  seasonsLabel: "Mega Episode",
  contentType: "movie",
  logline:
    "A documentary mega episode following archaeologists as they uncover new evidence connected to Babel, Solomon, and Herod.",
  overview:
    "Lost Treasures of the Bible brings together three full documentary episodes in one long-form archaeological deep dive. Across Iraq, ancient royal sites, and Herodian remains, experts investigate the Tower of Babel tradition, the age of King Solomon, and the real historical footprint of Herod, helping viewers connect Scripture, history, excavation, and interpretation.",
  vibe:
    "Archaeology, reconstruction, ancient cities, royal power, Bible history, and the tension between what the text says and what the ground is still revealing.",
  continueWatchingLabel: "Documentary: Lost Treasures of the Bible",
  inMyList: true,
  searchTags: [
    "documentary",
    "lost treasures of the bible",
    "mega episode",
    "archaeology",
    "biblical archaeology",
    "old testament",
    "new testament",
    "tower of babel",
    "babel",
    "babylon",
    "genesis 11",
    "iraq",
    "king solomon",
    "solomon",
    "temple",
    "united monarchy",
    "1 kings",
    "2 chronicles",
    "wisdom",
    "jerusalem",
    "king herod",
    "herod the great",
    "second temple",
    "judea",
    "rome",
    "historical bible documentary",
  ],
  episodes: [
    {
      id: "lost-treasures-of-the-bible-main",
      episodeNumber: 1,
      title: "Lost Treasures of the Bible MEGA Episode",
      contentLabel: "Documentary",
      duration: "2h 10m",
      summary:
        "Archaeologists revisit the Tower of Babel tradition, investigate the world of King Solomon, and reconstruct the rise and brutality of Herod the Great through excavations, historical analysis, and CGI.",
      thumbnail: "/losttreasures.png",
      youtubeUrl: "https://www.youtube.com/watch?v=vaOxOOZ9jkg",
      available: true,
      discussionSlug: "bible-buddy-tv-lost-treasures-of-the-bible",
      reflectionQuestion: "What stood out to you most in this documentary?",
      louisIntro:
        "This documentary works best when you do not watch it like it is trying to replace the Bible. It is trying to help you picture the world around the Bible more clearly. That is why the three featured sections matter so much. Babel helps you think about human pride and early empire, Solomon forces you to ask what kind of kingdom and building age the Bible is describing, and Herod shows you how one of the most important rulers around the Gospel period used fear, architecture, and power to leave his mark on history.",
      studyNotesDocument: `# This Documentary Is About More Than Artifacts

What makes this documentary useful is that it is not just showing old stones.

It is asking bigger questions:

- What kind of world produced these Bible stories?
- What did these cities and rulers actually look like?
- How does archaeology help us understand the setting of Scripture?

That matters because Bible study is not only about abstract ideas.
It is also about real places, real kingdoms, real rulers, and real moments in history.

# The Tower of Babel and the World of Genesis 11

The Babel section points back to **Genesis 11:1-9**.

That story is not mainly about architecture for architecture's sake.
It is about unified human pride trying to build identity, security, and glory without submission to God.

> "Come, let us build ourselves a city and a tower with its top in the heavens."
> Genesis 11:4

Babel matters because it ties together:

- early urban power
- empire-building
- human self-exaltation
- judgment through confusion and scattering

Archaeology in Iraq matters here because ancient Mesopotamia was the world of massive city-building, temple towers, and imperial ambition. That does not mean every brick proves every detail directly. It means the documentary is helping you picture why a tower-city story like Babel would make sense inside that world.

The bigger biblical takeaway is that Babel becomes an early picture of humanity trying to reach upward on its own terms.

# Solomon: Wisdom, Wealth, Building, and Mystery

The Solomon section is rooted mainly in:

- **1 Kings 1-11**
- **2 Chronicles 1-9**

King Solomon is remembered for:

- wisdom
- wealth
- international fame
- temple construction
- royal administration

That is why archaeology around Solomon matters so much.

If the Bible describes a king overseeing a major kingdom, large projects, and a significant court, people naturally want to know what material traces that era may have left behind.

Solomon is not important only because he was rich.
He is important because he stands at the height of Israel's united monarchy.

He builds the temple in Jerusalem.
He becomes known as a wisdom king.
And he also becomes a warning, because later compromise and idolatry darken the second half of his story.

So when you watch the documentary talk about Solomon, do not only think:

- Did he have gold?
- How big was the kingdom?

Also think:

- What did wisdom look like in public leadership?
- What happens when blessing turns into spiritual drift?

# Where Solomon Did What He Did

Jerusalem is the major city tied to Solomon's reign because that is where the temple and royal center are most strongly connected.

The temple matters because it becomes the symbolic center of Israel's worship life.
Solomon's palace complex matters because it shows the kingdom taking visible political form.

That is why the documentary's focus on location and excavation matters.

Bible stories are not floating in empty space.
They are tied to cities, courts, and building projects.

# The Real King Herod

Herod belongs to the New Testament world, especially the background around the Gospels.

He is the ruler most people remember from:

- the infancy account in **Matthew 2**
- the slaughter tied to Bethlehem
- his huge building legacy
- his reputation for paranoia and violence

Herod is one of the most important bridge figures between Bible history and Roman-era Judea.

He is called "Herod the Great" because of political scale and building ambition, not because he was morally admirable.

That distinction matters.

The documentary is right to lean into both sides:

- his construction power
- his brutality

Herod helps explain the world Jesus entered.

He ruled under Rome.
He expanded and rebuilt major sites.
He knew how to use architecture, spectacle, and fear as tools of power.

So when archaeology uncovers Herodian remains, it is not just helping us admire engineering.
It is helping us picture the kind of political atmosphere surrounding the New Testament.

# Why These Three Sections Belong Together

At first glance, Babel, Solomon, and Herod seem far apart.

But the documentary puts them together because they all touch power.

- Babel shows collective human pride trying to rise
- Solomon shows royal glory and the complexity of kingdom strength
- Herod shows political power at its most calculated and image-driven

So one of the smartest ways to study this mega episode is to ask:

- What does power look like here?
- What does it build?
- What does it promise?
- What does it hide?

# One Word Worth Knowing

The Hebrew word **migdal** means tower.
That matters in the Babel section because the tower is not just a building feature. It becomes a symbol of ambition reaching upward without dependence on God.

And in the Solomon section, the idea of wisdom is tied to **chokmah**, a word that means more than intelligence. It points to skilled, ordered, God-shaped understanding for life and leadership.

# Final Takeaway

This documentary is strongest when it helps you see that the Bible's world was real, layered, political, and physical.

Babel reminds you that human pride scales up fast.
Solomon reminds you that wisdom and glory can shape a kingdom for good, but blessing can still be mishandled.
Herod reminds you that visible greatness can hide deep corruption.

So the big value here is not just historical curiosity.
It is clearer context.

The more clearly you can picture the world around the Bible, the more texture you have when you go back to read the text itself.`,
    },
  ],
};

export const historyOfTheBibleDocumentaryTitle: BibleBuddyTvTitle = {
  id: "history-of-the-bible",
  slug: "history-of-the-bible",
  title: "History of the Bible",
  badge: "Bible Buddy Documentary",
  category: "documentaries",
  poster: "/thehistoryofthebible.png",
  heroImage: "/thehistoryofthebible.png",
  accentFrom: "#334155",
  accentTo: "#1e293b",
  year: "2024",
  rating: "TV-PG",
  runtime: "1h 23m",
  seasonsLabel: "Documentary",
  contentType: "movie",
  logline:
    "A documentary exploring who wrote the Bible, why it was written, when it was written, and why its manuscript history is considered reliable.",
  overview:
    "This History Channel documentary walks through the origin, writing, preservation, and reliability of the Bible. It asks who wrote the biblical books, why they were written, how ancient manuscripts were copied and preserved, and why both Old and New Testament transmission are treated so seriously by scholars and scribes across history.",
  vibe:
    "Bible history, manuscript evidence, scribal care, transmission, canon, ancient languages, and a steady documentary look at why the Bible has endured.",
  continueWatchingLabel: "Documentary: History of the Bible",
  inMyList: true,
  searchTags: [
    "documentary",
    "history of the bible",
    "who wrote the bible",
    "why its reliable",
    "history channel",
    "bible documentary",
    "manuscripts",
    "reliability of the bible",
    "old testament manuscripts",
    "new testament manuscripts",
    "dead sea scrolls",
    "septuagint",
    "scribes",
    "canon",
    "textual criticism",
    "ancient manuscripts",
    "bible transmission",
    "hebrew bible",
    "greek new testament",
    "church fathers",
    "ancient history",
    "apologetics",
    "origin of the bible",
  ],
  episodes: [
    {
      id: "history-of-the-bible-main",
      episodeNumber: 1,
      title: "History of the Bible - Who Wrote the Bible - Why It's Reliable?",
      contentLabel: "Documentary",
      duration: "1h 23m",
      summary:
        "This documentary traces the writing and preservation of the Bible, asking who wrote it, why it was written, how manuscripts were transmitted, and why scholars continue to view its textual history as remarkably strong.",
      thumbnail: "/thehistoryofthebible.png",
      youtubeUrl: "https://www.youtube.com/watch?v=Ksp4kRn7lGk",
      available: true,
      discussionSlug: "bible-buddy-tv-history-of-the-bible-documentary",
      reflectionQuestion: "What stood out to you most in this documentary?",
      louisIntro:
        "This documentary matters because a lot of people do not reject the Bible only on theological grounds. They reject it historically, assuming it was written too late, changed too often, or copied too loosely to trust. So a documentary like this is useful when it helps you slow down and ask better questions: who actually wrote these books, what kind of texts are they, how were they preserved, and what kind of manuscript support do we really have compared to other ancient works people accept much more easily.",
      studyNotesDocument: `# This Documentary Is Asking Historical Questions About the Bible

This is not mainly a documentary about one Bible story.

It is about the Bible as a collection of writings.

That means the big questions are things like:

- Who wrote it?
- When was it written?
- Why was it written?
- How was it preserved?
- Why do people say it is reliable?

Those questions matter because a lot of skepticism around the Bible starts before theology even begins. People assume the text has been changed beyond recognition or copied too loosely to trust. This documentary steps into that conversation.

# The Bible Was Written Over Time, Not All at Once

One of the first things people need to understand is that the Bible is not one book written by one human author in one moment.

It is a library.

That library includes:

- law
- history
- wisdom
- prophecy
- Gospels
- letters
- apocalyptic writing

The Old Testament was written across many centuries, mainly in Hebrew, with some Aramaic sections.
The New Testament was written in the first century AD in Greek.

That matters because when people ask, "Who wrote the Bible?" the honest answer is layered.

Human authors wrote individual books.
But the Bible presents itself as Scripture shaped under God's inspiration across a long historical span.

# Why the Bible Was Written

The books of the Bible were not all written for the exact same immediate reason.

Some were written to:

- preserve covenant law
- record Israel's history
- call people to repentance
- express worship and lament
- testify to the life, death, and resurrection of Jesus
- guide churches
- warn, teach, and encourage believers

So when this documentary asks why the Bible was written, it is really asking why these writings mattered enough to be preserved, copied, and passed down generation after generation.

# The Old Testament Manuscript Story Matters a Lot

One of the strongest parts of this conversation is the Old Testament manuscript tradition.

The broad point is not that every copy is identical in every tiny mark.
The point is that the transmission is remarkably careful and stable across time.

The documentary's emphasis on the **Dead Sea Scrolls**, the **Septuagint**, and Hebrew manuscript tradition is important because these witnesses help scholars compare texts across centuries.

## Dead Sea Scrolls

The Dead Sea Scrolls matter because they pushed our manuscript evidence much earlier than many people expected before their discovery.

That means when people say, "How do we know the Old Testament wasn't rewritten much later?" the scrolls become one of the most important parts of the answer.

## Septuagint

The **Septuagint** is the Greek translation of the Old Testament produced before the time of Christ.

That matters because it shows the Hebrew Scriptures were already established and being translated for wider use before the New Testament era.

## Hebrew Scribes

The scribes matter because copying Scripture was not treated casually.

The documentary is right to stress how carefully trained scribes were. Their work was not improvisational. It was disciplined, reverent, and exacting.

# The New Testament Manuscript Story Is Also Strong

The New Testament manuscript evidence is one of the biggest historical strengths in Bible reliability discussions.

The key point is not that there are zero textual questions.
The key point is that we have an unusually large number of manuscripts and fragments, many of them far closer to the originals than what we have for most ancient works.

That matters because history always works with surviving copies, not the lost original autographs.

And when you compare the New Testament manuscript tradition to works like Caesar, Herodotus, or Thucydides, the Bible's manuscript base looks unusually rich.

# Reliability Does Not Mean There Are No Variants

This is important.

When Christians say the Bible is reliable, they do not usually mean that every manuscript copy is free of every copying variation.

They mean that the textual tradition is so full and so well-attested that the original wording can be identified with a very high degree of confidence.

That distinction matters because people sometimes hear "variants" and imagine total chaos.
But the larger manuscript picture points in the opposite direction.

The reason scholars can discuss variants is precisely because there is so much manuscript evidence to compare.

# Why Comparison with Other Ancient Books Helps

The documentary's comparison with Homer, Caesar, Pliny, Herodotus, and others helps make one big point:

People trust ancient texts all the time with far less manuscript support.

That does not prove every theological claim in the Bible automatically.
But it does challenge the lazy claim that the Bible is historically unique in being too unstable to know.

If anything, the manuscript base makes it one of the best-attested documents from the ancient world.

# The Church Fathers Matter Too

Another powerful point is that much of the New Testament can be reconstructed from quotations in the early church fathers.

That matters because it shows the New Testament was not only copied in manuscripts.
It was also:

- preached
- cited
- discussed
- defended

So the text was living inside the church's public memory very early.

# One Word Worth Knowing

The word **canon** matters here.

Canon refers to the recognized collection of books received as Scripture.

That matters because the Bible was not thrown together randomly. The recognition of these books happened in historical communities that believed they were receiving writings with divine authority, not inventing authority out of nowhere.

# Final Takeaway

This documentary is most helpful when it pushes you to separate a popular myth from the actual evidence.

The myth says:

- the Bible was changed beyond recognition
- the text was copied too loosely to trust
- we have no real idea what the originals said

The historical picture is much stronger than that.

The Bible was written over time by real authors in real history.
It was copied with extraordinary care.
It is supported by a huge manuscript tradition.
And its textual foundation compares very strongly with other ancient writings people treat as reliable every day.

So the real question is not whether the Bible has survived history.
It has.

The real question becomes what you will do with a text that has been preserved, studied, copied, and carried with that much seriousness across the centuries.`,
    },
  ],
};

export const storyOfGodDocumentaryTitle: BibleBuddyTvTitle = {
  id: "the-story-of-god",
  slug: "the-story-of-god",
  title: "The Story of God",
  badge: "Bible Buddy Documentary",
  category: "documentaries",
  poster: "/thestoryofGod.jpg",
  heroImage: "/thestoryofGod.jpg",
  accentFrom: "#1d4ed8",
  accentTo: "#0f172a",
  year: "2017",
  rating: "TV-PG",
  runtime: "Documentary Special",
  seasonsLabel: "Morgan Freeman",
  contentType: "movie",
  logline:
    "Morgan Freeman travels through some of humanity's biggest spiritual questions, tracing what people mean by the chosen one, heaven and hell, and the search for proof that God is real.",
  overview:
    "The Story of God moves like a spiritual road trip. Morgan Freeman steps into sacred spaces, old ideas, and modern questions to explore how people across the world imagine divine calling, life after death, and the evidence of God's presence. Instead of treating faith as one flat topic, the documentary tells a bigger story about humanity's longing to be known by God, judged by God, rescued by God, and convinced that God is not silent.",
  vibe:
    "Big questions, global faith traditions, spiritual longing, afterlife, revelation, and a documentary that keeps asking why human beings still reach for God.",
  continueWatchingLabel: "Documentary: The Story of God",
  inMyList: true,
  searchTags: [
    "documentary",
    "the story of god",
    "morgan freeman",
    "chosen one",
    "heaven and hell",
    "proof of god",
    "who is chosen by god",
    "afterlife",
    "faith documentary",
    "god documentary",
    "history channel",
    "religion",
    "spiritual questions",
    "heaven",
    "hell",
    "divine presence",
    "miracles",
    "belief",
    "theology",
    "bible worldview",
    "old testament",
    "new testament",
  ],
  episodes: [
    {
      id: "the-story-of-god-main",
      episodeNumber: 1,
      title: "The Story of God",
      contentLabel: "Documentary",
      duration: "Documentary Special",
      summary:
        "Morgan Freeman follows three huge faith questions: who is chosen by God, what people mean by heaven and hell, and whether there is still any proof of the divine in the modern world.",
      thumbnail: "/thestoryofGod.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=6lJlgbh0AMM",
      available: true,
      discussionSlug: "bible-buddy-tv-the-story-of-god-documentary",
      reflectionQuestion: "What stood out to you most in this documentary?",
      louisIntro:
        "What makes this documentary interesting is that it is not just listing religious facts. It is following the questions people keep carrying no matter what culture they come from. Who gets called by God. What happens after death. And how do you know God is real in a world that keeps acting like the spiritual life is fading away. Morgan Freeman walks through those questions like a guide, but the real value for Bible Buddy is learning how these ideas connect back to Scripture and why the Bible speaks so directly to all three.",
      studyNotesDocument: `# This Documentary Is Really About Humanity Searching for God

The Story of God is built around three big movements:

- the chosen one
- heaven and hell
- proof of God

That matters because those are not random topics.

They are some of the deepest questions people ask:

- Does God choose people for a purpose?
- Is there judgment or reward beyond this life?
- Can God's presence still be known now?

So even though the documentary moves across cultures and voices, the deeper story is about human longing.

People want to know:

- if their lives matter
- if history is going somewhere
- if justice is real
- if God is near or silent

# The Chosen One Theme Connects Strongly to the Bible

The first major movement is about chosen people.

Almost every faith tradition has some version of that idea, but the Bible gives this theme a very particular shape.

In Scripture, being chosen is not mostly about celebrity.
It is about calling, responsibility, and purpose.

Think about:

- **Abraham** in **Genesis 12**
- **Moses** in **Exodus 3**
- **David** in **1 Samuel 16**
- **Israel** as a covenant people in **Deuteronomy 7**
- **Jesus** as the chosen servant and Son

That means chosenness in the Bible is not just, "God liked this person more."

It is more like:

- God sets someone apart
- God gives them an assignment
- that assignment usually costs something
- and through that calling, other people are meant to be blessed

That is why this part of the documentary matters.
It presses the question of whether calling is about privilege or mission.

Biblically, it is mission.

# One Word Worth Knowing

The Hebrew word **bachar** means "to choose."

That word matters because divine choice in the Bible is usually tied to covenant purpose, not random favoritism.

God chooses Abraham so that all the families of the earth can be blessed through him.
God chooses Israel so they can be a people who reflect His name.
God chooses leaders and prophets so truth can be spoken into history.

So when the documentary talks about the chosen one, Bible readers should hear a deeper question underneath it:

What does God call people to carry?

# Heaven and Hell Are Not Just Abstract Ideas

The second movement turns toward heaven and hell.

This is where a lot of people start thinking only in terms of cartoons, clouds, flames, and pop-culture imagery.

But biblically, the conversation is deeper than that.

The Bible treats eternal destiny as connected to:

- holiness
- justice
- communion with God
- judgment
- restoration

Heaven in the biblical imagination is not mainly about escaping earth forever.
It is about life with God, the fulfillment of His kingdom, and the final setting-right of all things.

Hell is not just a dramatic scare image.
It is tied to judgment, separation, and the seriousness of rejecting God.

So when the documentary asks whether heaven and hell are future realities or present experiences, that is a worthwhile question.

Because the Bible does show that:

- people can taste the life of God's kingdom now
- people can also taste the destruction of rebellion now

But the Bible does not flatten those ideas into mere metaphors.
It keeps a future horizon in view.

# Why This Changes the Way People Live

The documentary is right to suggest that heaven and hell shape life in the present.

What you think happens after death influences:

- what you fear
- what you hope for
- what you endure
- how you define justice

That is why resurrection, judgment, and eternal life matter so much in the New Testament.

If death is not the end, then life is not random.

And if judgment is real, then evil does not get the final word.

# Proof of God Is About Presence, Not Just Debate

The third movement asks whether we have cut God out of modern life or whether there are still moments when the divine breaks in.

That is one of the most important parts of this documentary.

Because many people think the only way to talk about proof is through argument.

Arguments matter.
Reason matters.
History matters.

But the Bible also talks about God's reality through:

- creation
- conscience
- revelation
- miracles
- providence
- Christ Himself

So "proof of God" in a Bible sense is not just one category.

It includes:

- the witness of the world
- the witness of Scripture
- the witness of Jesus
- the witness of transformed lives

That does not erase doubt.
But it does show that God's self-disclosure is bigger than one debate format.

# Scripture Connections That Help Here

If you want to connect this documentary back to the Bible, some key passages are:

- **Genesis 12** for divine calling and chosenness
- **Exodus 3** for God's call on Moses
- **Deuteronomy 7** for Israel as a chosen people
- **Psalm 19** for creation declaring God's glory
- **Ecclesiastes 3:11** for eternity set in the human heart
- **John 14** for Jesus on the Father's house
- **Matthew 25** for judgment language
- **Acts 17** for God not being far from any one of us
- **Romans 1** for creation and the knowledge of God

That is one of the best ways to study a documentary like this.
Do not leave it floating in spiritual conversation only.
Anchor it back into Scripture.

# A Couple of People and Ideas to Keep Straight

## Abraham

Abraham is one of the clearest Bible examples of a chosen person.

He is chosen in **Genesis 12**, but that calling is immediately tied to promise and blessing for others.
His story shows that divine calling usually begins with trust before it becomes visible influence.

## Moses

Moses is another key figure because his chosenness is tied to deliverance.
God calls him out of the wilderness and sends him back into crisis.

That is important.
The chosen person in Scripture is often the one being sent into difficulty, not away from it.

## Heaven

In Christian thought, heaven is not mainly a vague peaceful place.
It is life with God, the fulfillment of His promises, and the final home of His people.

## Hell

Hell matters because it reminds us that evil, rebellion, and rejection of God are not morally weightless.
The Bible's language here is serious because justice is serious.

# Final Takeaway

This documentary works best when you let it push you toward the deeper question:

Why do these themes keep appearing everywhere?

Why do people across time keep asking about:

- chosenness
- eternity
- proof of God

The Bible's answer is that humanity was made for God.

That is why people keep reaching for transcendence.
That is why judgment and hope matter.
That is why the question of God's presence does not go away.

So the value of this documentary is not just that it collects spiritual ideas.

It helps you see that people are still haunted by God-sized questions.

And Scripture does not run from those questions.
It speaks into them directly.`,
    },
  ],
};

export const deadSeaScrollDetectivesTitle: BibleBuddyTvTitle = {
  id: "dead-sea-scroll-detectives",
  slug: "dead-sea-scroll-detectives",
  title: "Dead Sea Scroll Detectives",
  badge: "Bible Buddy Documentary",
  category: "documentaries",
  poster: "/Deadseascrolls.jpg",
  heroImage: "/Deadseascrolls.jpg",
  accentFrom: "#475569",
  accentTo: "#0f172a",
  year: "2019",
  rating: "TV-PG",
  runtime: "53m",
  seasonsLabel: "NOVA Documentary",
  contentType: "movie",
  logline:
    "Scientists use advanced imaging, material analysis, and manuscript investigation to test suspicious scroll fragments and digitally recover hidden writing from the Dead Sea Scrolls world.",
  overview:
    "Dead Sea Scroll Detectives plays like a manuscript mystery. The documentary follows scholars and scientists as they examine newly surfaced fragments that may be modern forgeries, while also using imaging technology to recover text from damaged scroll remains. Instead of treating the Dead Sea Scrolls like museum trivia, it shows why these discoveries matter for understanding the preservation of Scripture, the Jewish world before Jesus, and the careful work it takes to separate real evidence from fake claims.",
  vibe:
    "Ancient manuscripts, science, biblical history, hidden text, forensic analysis, and the tension between discovery and deception.",
  continueWatchingLabel: "Documentary: Dead Sea Scroll Detectives",
  inMyList: true,
  searchTags: [
    "documentary",
    "dead sea scrolls",
    "dead sea scroll detectives",
    "nova",
    "manuscripts",
    "scrolls",
    "qumran",
    "second temple",
    "hebrew bible",
    "old testament",
    "jewish scriptures",
    "textual criticism",
    "forgery",
    "ancient fragments",
    "imaging technology",
    "manuscript recovery",
    "bible documentary",
    "desert caves",
    "isaiah scroll",
    "ancient judaism",
  ],
  episodes: [
    {
      id: "dead-sea-scroll-detectives-main",
      episodeNumber: 1,
      title: "Dead Sea Scroll Detectives",
      contentLabel: "Documentary",
      duration: "53m",
      summary:
        "A Nova documentary following the scientific hunt to test suspicious Dead Sea Scroll fragments and recover hidden writing from damaged manuscripts using advanced imaging.",
      thumbnail: "/Deadseascrolls.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=INV9eLQa7Jc",
      available: true,
      discussionSlug: "bible-buddy-tv-dead-sea-scroll-detectives",
      reflectionQuestion: "What stood out to you most in this documentary?",
      louisIntro:
        "This documentary is strong because it shows that Bible history is not only about old claims. It is also about ongoing investigation. The Dead Sea Scrolls matter because they brought people face to face with very early copies of biblical texts and Jewish writings from the world before Jesus. But this film also shows that excitement can attract fraud, so careful scholarship has to do two things at once: protect real evidence and test suspicious pieces honestly. That tension makes the whole thing feel alive.",
      studyNotesDocument: `# This Documentary Is About Evidence, Recovery, and Discernment

Dead Sea Scroll Detectives is not just a documentary about ancient scrolls sitting behind glass.

It is about the process of investigation.

That matters because a lot of people imagine Bible manuscript history as something settled in the past with no new questions.
But the Dead Sea Scrolls world still raises major questions about:

- what is authentic
- what is forged
- what can technology recover
- and what these texts tell us about the Bible before the time of Jesus

So the documentary works almost like a detective story.

# Why the Dead Sea Scrolls Matter So Much

The Dead Sea Scrolls were discovered near **Qumran**, by the Dead Sea, beginning in the mid-20th century.

They matter because they include:

- biblical manuscripts
- copies of Scripture
- community writings
- sectarian texts
- other Jewish literature from the Second Temple period

That makes them one of the biggest manuscript discoveries in biblical history.

For Bible readers, one major reason they matter is that they give much earlier manuscript witnesses to parts of the Old Testament than many people previously had access to.

That helps scholars compare later copies with much older ones and ask:

- how stable was the text
- what kinds of variations appear
- how carefully was Scripture transmitted

# Qumran Is an Important Place to Know

Qumran sits near the northwest shore of the Dead Sea.

That location matters because the caves in that region became the hiding place of these scrolls and fragments.
The harsh desert environment also helped preserve materials that would have decayed elsewhere.

So geography matters here.

The wilderness did not just hold biblical stories.
It also helped preserve biblical manuscripts.

# The Documentary's Big Tension: Real or Fake?

One of the strongest parts of this documentary is the question of suspicious fragments.

That matters because once something as valuable as the Dead Sea Scrolls becomes famous, the market gets dangerous.

People want:

- prestige
- ownership
- rare fragments
- headlines

And wherever money and status gather, forgery becomes a real threat.

So this documentary is not anti-faith.
It is pro-honesty.

That distinction matters.

Testing whether fragments are genuine is not attacking the Bible.
It is protecting the historical record.

# Technology Is Doing More Than Looking Closer

Another major theme in this documentary is imaging technology.

That part is fascinating because it shows that damaged manuscripts are not always unreadable forever.

Through digital imaging and analysis, researchers can sometimes recover writing hidden in:

- charred remains
- faded surfaces
- damaged layers
- fragments too fragile to open physically

That means science becomes a servant to history here.

Instead of replacing the text, it helps reveal the text.

# One Word Worth Knowing

The word **palimpsest** is useful in manuscript study, though not every damaged text is exactly one. It refers to a manuscript page that has been reused, where earlier writing may still be detectable underneath later material.

And the broader idea matters for this documentary:

sometimes old writing is still there even when the human eye cannot immediately see it.

That is why imaging matters so much.

# What This Connects To in Bible Study

For Bible Buddy, this documentary connects strongly to the question of textual reliability.

It overlaps with themes like:

- preservation of Scripture
- manuscript history
- Jewish copying traditions
- the world of the Hebrew Bible before Jesus

If you pair this with the History of the Bible documentary, the connection gets even clearer.

That one asks whether the Bible is reliable.
This one shows part of the real-world evidence work behind that conversation.

# The Scrolls and the World Before Jesus

The Dead Sea Scrolls are not just valuable because they contain biblical books.

They are also valuable because they help us picture Jewish life, expectation, language, and scriptural engagement in the Second Temple era.

That means they help illuminate the world into which Jesus was born.

This is one reason scroll discoveries matter so much:

- they help with text history
- they help with historical context
- they help with religious setting

So even when a fragment is not directly a Bible passage, it can still help us understand the world around the Bible.

# Why Forgery Detection Matters Spiritually Too

There is a quiet spiritual lesson in this documentary.

Truth should not be afraid of examination.

If a fragment is real, careful testing helps confirm it.
If a fragment is fake, careful testing helps expose it.

Either way, honesty serves the truth.

That is a healthy principle not only for archaeology, but for Christian thinking more broadly.

God's truth does not need manipulation.
It does not need fake proof.
It does not need inflated claims.

It can stand under scrutiny.

# Scripture Connections

This documentary is more about manuscripts than one direct Bible chapter, but it connects naturally to:

- **Psalm 119** and the enduring word of God
- **Isaiah 40:8** on the word of God standing forever
- **Luke 4** where Jesus reads from Isaiah in a scroll
- **2 Timothy 3:16** on Scripture's authority

It also connects to the broader Old Testament manuscript tradition that the Dead Sea Scrolls help illuminate.

# Final Takeaway

This documentary is useful because it shows that the world of the Bible is not only a world of belief.
It is also a world of documents, fragments, caves, science, language, preservation, and testing.

The Dead Sea Scrolls matter because they help anchor the Bible in real manuscript history.
And the investigation into suspicious fragments matters because truth is worth protecting from fraud.

So the big lesson here is not just, "Ancient scrolls are cool."

It is this:

the closer people look, the more serious the manuscript story becomes.

And that should make Bible readers more thoughtful, not less confident.`,
    },
  ],
};

export const twelveApostlesMovieTitle: BibleBuddyTvTitle = {
  id: "the-story-of-the-twelve-apostles",
  slug: "the-story-of-the-twelve-apostles",
  title: "The Story of the Twelve Apostles",
  badge: "Bible Buddy Movie",
  category: "movies",
  poster: "/12apostlesmovie.jpg",
  heroImage: "/12apostlesmovie.jpg",
  accentFrom: "#1d4ed8",
  accentTo: "#1e3a8a",
  year: "2024",
  rating: "TV-PG",
  runtime: "1h 32m",
  seasonsLabel: "Feature Film",
  contentType: "movie",
  logline:
    "A dramatized retelling of the men Jesus chose, following their fear, failure, calling, and mission as the Gospel begins moving into the world.",
  overview:
    "The Story of the Twelve Apostles begins with ordinary men and follows what happened when Jesus called them into something far bigger than themselves. Fishermen, tax collectors, zealots, and overlooked men become the core witnesses of the Gospel story. The movie traces their early weakness, the shock of the crucifixion, the turning point of the resurrection, and the dangerous mission that carried the message of Jesus out into the known world.",
  vibe:
    "Calling, discipleship, failure, courage, resurrection hope, mission, and the early spread of the Gospel through imperfect people.",
  continueWatchingLabel: "Movie: The Story of the Twelve Apostles",
  inMyList: true,
  searchTags: [
    "movie",
    "twelve apostles",
    "disciples",
    "jesus",
    "gospels",
    "peter",
    "john",
    "james",
    "matthew",
    "judas",
    "simon the zealot",
    "andrew",
    "thomas",
    "philip",
    "bartholomew",
    "resurrection",
    "great commission",
    "acts",
    "new testament",
    "gospel mission",
  ],
  episodes: [
    {
      id: "the-story-of-the-twelve-apostles-main",
      episodeNumber: 1,
      title: "The Story of the Twelve Apostles",
      contentLabel: "Movie",
      duration: "1h 32m",
      summary:
        "A full movie tracing the disciples from ordinary lives through the shock of the crucifixion, the reality of the resurrection, and the mission that sent them into the world with the Gospel.",
      thumbnail: "/12apostlesmovie.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=5tJbgPQxxzI&t=1531s",
      available: true,
      discussionSlug: "bible-buddy-tv-the-story-of-the-twelve-apostles",
      reflectionQuestion: "What stood out to you most in this movie?",
      louisIntro:
        "What makes this movie interesting is that it does not start with famous heroes. It starts with regular men who would not have looked impressive on paper. That is one of the biggest Gospel themes right away. Jesus does not build His mission by choosing the obvious elite. He calls real people with real flaws, then shapes them through proximity, failure, grace, resurrection hope, and Spirit-empowered purpose. If you watch this movie with that in mind, it becomes less about ancient biography and more about what discipleship actually does to a person.",
      studyNotesDocument: `# This Movie Is About Ordinary Men Becoming Gospel Witnesses

The Story of the Twelve Apostles works when you do not watch it like a list of names.

It is about transformation.

These men begin as:

- fishermen
- workers
- local men
- complicated personalities
- people with fear, pride, confusion, and limits

And yet they become the core witnesses of Jesus' ministry, death, resurrection, and mission.

That is one of the most important things in the whole New Testament.

The Gospel did not spread first through polished celebrities.
It spread through disciples.

# The Apostles Matter Because Jesus Chose Them on Purpose

The Gospels make it clear that Jesus did not gather this group randomly.

He called them.

That matters because the apostles become foundational witnesses.
They are there to:

- hear His teaching
- watch His miracles
- misunderstand Him at times
- witness His suffering
- encounter His resurrection
- carry His message outward

So this movie is not just trying to tell us about interesting personalities.
It is tracing the foundation of the early church's witness.

# The Twelve Connect Most Strongly to the Gospels and Acts

This story lives mainly across:

- **Matthew**
- **Mark**
- **Luke**
- **John**
- **Acts**

The calling scenes, inner conflicts, failures, and resurrection appearances all come from the Gospel record.
Then the mission theme expands strongly into **Acts**, where the apostles begin proclaiming Christ publicly.

That means this movie sits right at the hinge between:

- following Jesus
- and being sent by Jesus

# A Few of the Main Men to Keep Straight

## Peter

Peter is one of the clearest examples of raw disciple energy.

He is bold, impulsive, and often the first to speak.
That can be a strength and a weakness.

He confesses Jesus as the Christ.
He also denies Him three times.

That is why Peter matters so much.
He shows that failure is real, but restoration is also real.

When Jesus later strengthens Peter, you see grace turning weakness into leadership.

## James and John

James and John are called the **sons of thunder**.

That tells you they were not soft, quiet personalities in the easy sense.
They carried intensity.

This matters because Jesus did not erase personality.
He redirected it.

The fire in them needed formation.

## Matthew

Matthew stands out because he comes from the tax collector world.

That means he would have been seen by many as compromised, suspect, or disloyal.
And yet Jesus still calls him.

That is a huge Gospel theme:

Jesus keeps calling the people others would write off.

## Simon the Zealot

Simon matters because zealotry carried political force.

This is a reminder that the disciples were not all coming from the same emotional or ideological place.
Jesus gathered men shaped by different instincts and backgrounds.

That makes the unity of the group more striking.

## Judas Iscariot

Judas matters because his story keeps the disciples from becoming cartoon heroes.

He is near Jesus.
He hears the teaching.
He sees what the others see.

And yet betrayal still grows in him.

That is sobering.

Being around holy things is not the same as surrendering your heart.

# One Word Worth Knowing

The Greek word **apostolos** means "one who is sent."

That matters because the apostles are not just students sitting in a classroom.
They are sent ones.

The shift from disciple to apostolic witness is a major movement in the New Testament.

They follow Jesus.
Then they are sent in His name.

# The Crucifixion Breaks Their Confidence

One of the strongest parts of the apostles' story is that the crucifixion initially looks like collapse.

That matters because we often read the end of the Gospel story with too much hindsight.

But in the moment, the disciples experience:

- fear
- confusion
- discouragement
- uncertainty

The cross is not immediately processed by them as victory.

It feels like loss.

And that is why the resurrection matters so much.

The resurrection does not simply comfort sad followers.
It rebuilds the entire meaning of the mission.

# Resurrection Turns Followers into Witnesses

The resurrection is the turning point of this story.

Without it, the apostles remain a discouraged group around a failed movement.

With it, everything changes.

Now they become men who are convinced:

- Jesus is alive
- death has been defeated
- the kingdom message must go out

That is why the apostles become so bold in Acts.
The boldness is not personality alone.
It is resurrection conviction.

# The Mission Is Bigger Than Their Backgrounds

Another key thing this movie can help people see is that Jesus' mission is bigger than the natural profile of the men He called.

On paper, this group does not look like the obvious force that would carry the Gospel outward for generations.

That is the point.

The power of the mission is not based on their résumé.
It is based on:

- Christ's authority
- the truth of the resurrection
- the empowering work of God

That should encourage Bible readers today.

God often uses people who seem small before He uses people who seem impressive.

# This Also Connects to the Church Today

The apostles are unique in salvation history, but their story still teaches the church a lot.

It teaches that:

- calling matters more than image
- closeness to Jesus changes people
- failure does not have to be final
- the Gospel must move outward

That is why apostolic stories are not just history.
They are pattern-shaping.

# Scripture Connections to Read with This Movie

If you want to go deeper after this movie, good places to read are:

- **Matthew 4** for the calling of fishermen
- **Mark 3** for the naming of the Twelve
- **Luke 5** for Peter's early calling moment
- **John 13-21** for betrayal, denial, restoration, and resurrection encounters
- **Acts 1-4** for the apostles after the resurrection

Those passages help you watch the movie with the Bible open in your mind.

# Final Takeaway

This movie is really about what Jesus does with unremarkable people.

He calls them.
He teaches them.
He corrects them.
He lets their weakness get exposed.
He meets them again after failure.
And then He sends them.

That is why the twelve apostles matter so much.

They are not mainly famous because they were naturally extraordinary.

They are extraordinary because Jesus turned ordinary men into witnesses who helped carry the Gospel into the world.`,
    },
  ],
};

export const peterAndPaulDocumentaryTitle: BibleBuddyTvTitle = {
  id: "peter-and-paul",
  slug: "peter-and-paul",
  title: "Peter & Paul",
  badge: "Bible Buddy Documentary",
  category: "documentaries",
  poster: "/peterandpaulmovie.jpg",
  heroImage: "/peterandpaulmovie.jpg",
  accentFrom: "#1e3a8a",
  accentTo: "#334155",
  year: "PBS",
  rating: "TV-PG",
  runtime: "Documentary",
  seasonsLabel: "Empires",
  contentType: "movie",
  logline:
    "A documentary look at two of the most important early Christian leaders, tracing how Peter and Paul carried the Gospel with very different personalities, backgrounds, and pressures.",
  overview:
    "Peter & Paul works best when you watch it as the story of two men who were united by Jesus but not identical in style, background, or calling. Peter comes out of the world of the original disciples and the early Jerusalem church. Paul comes out of persecution, dramatic conversion, missionary movement, and public theological conflict. The documentary can be read through the tension between these two leaders, not as enemies in a shallow sense, but as men who had to figure out how the Gospel would move across Jewish and Gentile worlds without losing its center.",
  vibe:
    "Church history, apostolic leadership, tension, mission, Jewish and Gentile questions, and the spread of the Gospel under pressure.",
  continueWatchingLabel: "Documentary: Peter & Paul",
  inMyList: true,
  searchTags: [
    "documentary",
    "peter and paul",
    "peter",
    "paul",
    "pbs empires",
    "acts",
    "galatians",
    "jerusalem church",
    "antioch",
    "gentiles",
    "jews and gentiles",
    "early church",
    "apostles",
    "church history",
    "gospel mission",
    "pauline letters",
    "rome",
    "new testament",
    "apostolic conflict",
    "leadership",
  ],
  episodes: [
    {
      id: "peter-and-paul-main",
      episodeNumber: 1,
      title: "Peter & Paul",
      contentLabel: "Documentary",
      duration: "Documentary",
      summary:
        "A PBS documentary exploring Peter and Paul as major early church leaders whose different callings, personalities, and conflicts helped shape the spread of Christianity.",
      thumbnail: "/peterandpaulmovie.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=3XVqwppXtH8",
      available: true,
      discussionSlug: "bible-buddy-tv-peter-and-paul-documentary",
      reflectionQuestion: "What stood out to you most in this documentary?",
      louisIntro:
        "This documentary gets interesting when you stop flattening Peter and Paul into one generic apostle type. They do not feel the same, lead the same, or carry the same assignment. Peter is tied closely to the original disciple circle and the early Jewish-Christian world. Paul is the missionary theologian pushing the Gospel outward into Gentile space. That creates overlap, unity, tension, and some real conflict. But that conflict actually helps show how serious the early church was about protecting the truth of the Gospel while still learning how to live it out together.",
      studyNotesDocument: `# This Documentary Is About Unity Without Sameness

Peter & Paul is most helpful when you do not watch it like a simple biography of two famous church men.

It is really about how the Gospel moved through two very different leaders.

That matters because Peter and Paul are not interchangeable.

They overlap.
They serve the same Christ.
They preach the same saving Gospel.

But they do not arrive with the same story.

# Peter and Paul Come from Different Worlds

Peter comes from the original disciple circle.

He is:

- one of the Twelve
- part of Jesus' earthly ministry story
- present through major Gospel moments
- strongly tied to the Jerusalem-centered early church

Paul comes from a different route entirely.

He is:

- a former persecutor
- dramatically converted
- deeply trained
- heavily involved in Gentile mission
- a letter writer and missionary strategist

That means one of the key strengths of this documentary is that it lets you feel how different their roads are.

# Peter Represents the Earlier Apostolic Circle

Peter matters because he is one of the most visible disciples in the Gospels.

He is outspoken.
He is often first to respond.
He is bold, and sometimes unstable.

He confesses Christ.
He walks on water briefly.
He cuts off an ear.
He denies Jesus three times.
He is restored.

That arc matters because Peter becomes a huge example of grace reshaping a leader.

By the time you get into Acts, Peter is no longer just the impulsive disciple.
He becomes a major witness in the early church.

# Paul Represents the Expansion of the Mission

Paul matters because he helps you see how far the Gospel was going to move.

His conversion is one of the biggest turning points in Acts.

He begins as an enemy of the church.
Then he becomes one of its strongest missionary voices.

That matters because Paul's whole life becomes proof that Jesus does not only forgive failure.
He can completely redirect opposition into mission.

Paul also matters because so much of the New Testament's teaching for churches comes through his letters.

# The "Beef" Between Peter and Paul Is Real, But It Needs Context

One reason this documentary has real tension is that Peter and Paul do have conflict.

The clearest moment is in **Galatians 2**, where Paul says he opposed Peter to his face.

That matters because it shows the early church was not fake-unified in a shallow way.

There were real questions about:

- Jews and Gentiles eating together
- table fellowship
- pressure from religious expectations
- how the Gospel reshapes identity

Paul sees Peter pulling back under pressure.
And Paul treats that as serious because it sends the wrong message about the Gospel.

So yes, there is "beef."
But it is not petty drama.
It is theological and practical tension around how the truth of Christ gets lived out.

# One Word Worth Knowing

The word **apostolos** means "one sent out."

That matters here because both Peter and Paul are sent men, but their sending works out differently.

Peter is strongly tied to the earliest apostolic witness among Jewish believers.
Paul is especially associated with mission into Gentile territory.

So they are united in Christ while carrying distinct emphases.

# Acts Helps Hold Their Stories Together

If you want to read this documentary with the Bible in mind, **Acts** is one of the most important books for it.

Acts helps you see:

- Peter preaching early in Jerusalem
- the church's early growth
- key turning points around Gentiles
- Paul's conversion and missionary movement

Acts is important because it does not make the church feel static.
It shows movement, conflict, adaptation, and expansion.

That is exactly the kind of setting where Peter and Paul become so important.

# Galatians Helps You Feel the Conflict More Sharply

If Acts gives you the big movement, **Galatians** gives you one of the sharpest windows into apostolic tension.

Paul's confrontation with Peter matters because it shows:

- leadership can wobble under pressure
- truth still has to be protected
- even major leaders can need correction

That should humble every Christian leader.

The early church was not held together by pretending no one ever struggled.
It was held together by fighting to keep the Gospel central.

# Peter and Paul Are Both Necessary in Different Ways

Another important takeaway is that the church needed both kinds of men.

It needed:

- Peter's eyewitness closeness to Jesus' earthly ministry
- Paul's missionary and theological force

That balance matters.

The church is healthiest when it does not confuse one leadership style for the only faithful one.

Peter and Paul help show that strong Christian leadership can look different while still being accountable to the same Lord.

# Places That Matter in This Story

## Jerusalem

Jerusalem matters because it is the center of the earliest church story after the resurrection and Pentecost.
Peter is especially tied to that world.

## Antioch

Antioch matters because it becomes a huge mission center and one of the places where Jewish-Gentile questions get lived out in real community.
That is why the Peter-Paul tension around shared table life matters so much.

## Rome

Rome matters because both Peter and Paul become deeply associated with the wider spread of Christianity into the imperial world.
The Gospel is no longer staying in one narrow corner.

# Scripture Connections to Read with This Documentary

If you want to go deeper, read:

- **Matthew 16** for Peter's confession
- **John 21** for Peter's restoration
- **Acts 2, 10, and 15** for Peter's leadership and Gentile turning points
- **Acts 9 and 13-28** for Paul's conversion and mission
- **Galatians 2** for the confrontation between Paul and Peter

Those texts help you feel the documentary's tension inside Scripture, not just in later storytelling.

# Final Takeaway

Peter & Paul matters because it reminds you that the early church did not grow through one personality type.

It grew through leaders who were:

- gifted differently
- tested differently
- called differently

Peter shows you grace restoring a disciple.
Paul shows you grace redirecting an enemy.

And their conflict shows that unity in the church is not built by avoiding hard truth.
It is built by submitting everything, even leadership tension, to the Gospel of Jesus Christ.`,
    },
  ],
};

export const shroudOfTurinDocumentaryTitle: BibleBuddyTvTitle = {
  id: "the-shroud-of-turin",
  slug: "the-shroud-of-turin",
  title: "The Shroud of Turin",
  badge: "Bible Buddy Documentary",
  category: "documentaries",
  poster: "/Shroudmovie.png",
  heroImage: "/Shroudmovie.png",
  accentFrom: "#475569",
  accentTo: "#1e293b",
  year: "2024",
  rating: "TV-PG",
  runtime: "Documentary",
  seasonsLabel: "Historical Special",
  contentType: "movie",
  logline:
    "A documentary exploring the mystery, debate, and image analysis surrounding the Shroud of Turin and the claim that it may preserve traces of Jesus' burial cloth.",
  overview:
    "The Shroud of Turin follows one of Christianity's most debated relics through history, science, and visual reconstruction. The documentary centers on the linen cloth many associate with Jesus' burial, asking whether the faint image, blood-like markings, and material evidence point to authenticity, artistry, or something still unresolved. By using graphic analysis and modern imaging, it tells the story of why this object keeps drawing believers, skeptics, and historians back into the same question: what exactly are we looking at?",
  vibe:
    "Christian history, relic debate, burial cloth imagery, forensic questions, resurrection-era context, and the tension between faith, evidence, and controversy.",
  continueWatchingLabel: "Documentary: The Shroud of Turin",
  inMyList: true,
  searchTags: [
    "documentary",
    "shroud of turin",
    "turin",
    "jesus burial cloth",
    "relic",
    "christian relic",
    "passion of christ",
    "burial cloth",
    "forensic analysis",
    "holy artifact",
    "history documentary",
    "resurrection context",
    "gospels",
    "crucifixion",
    "jesus",
    "linen cloth",
    "blood stains",
    "image analysis",
    "church history",
    "controversial relic",
  ],
  episodes: [
    {
      id: "the-shroud-of-turin-main",
      episodeNumber: 1,
      title: "The Shroud of Turin: History's Most Controversial Relic",
      contentLabel: "Documentary",
      duration: "Documentary",
      summary:
        "A historical and forensic documentary investigating the Shroud of Turin through image reconstruction, relic history, and the long-running debate over whether it could be linked to Jesus' burial.",
      thumbnail: "/Shroudmovie.png",
      youtubeUrl: "https://www.youtube.com/watch?v=Nj5IK_nU4hs",
      available: true,
      discussionSlug: "bible-buddy-tv-the-shroud-of-turin",
      reflectionQuestion: "What stood out to you most in this documentary?",
      louisIntro:
        "This documentary is strongest when you do not watch it like one relic is going to prove the whole Christian faith by itself. That is not the real value here. The real value is seeing why the Shroud of Turin has held attention for so long. It sits right at the intersection of crucifixion imagery, burial customs, church history, and the question of whether an object can carry traces of an event Christians already believe happened. That makes it fascinating, but it also means you have to watch with both curiosity and caution.",
      studyNotesDocument: `# This Documentary Is About a Relic, But Also About Christian Memory

The Shroud of Turin is not just interesting because it is old.

It is interesting because people connect it to Jesus.

That raises huge questions:

- is it authentic
- is it later devotional art
- what does the image show
- why has this cloth held such influence for so long

That is why this documentary matters.

It is not only about one piece of fabric.
It is about how Christianity remembers the crucifixion, burial, and resurrection.

# Why the Shroud of Turin Is So Controversial

The controversy exists because the claims are enormous.

Many people have believed the shroud could be the burial cloth of Jesus.
Others argue it is a later artifact, image, or medieval creation.

So the debate is intense because the stakes feel high.

If it is authentic, it becomes one of the most famous material objects ever connected to Christian history.
If it is not, it still becomes a major case study in how relic devotion and historical claims develop.

# This Connects Strongly to the Burial of Jesus

The Shroud discussion naturally points Bible readers back to the Gospel burial accounts.

Important passages include:

- **Matthew 27**
- **Mark 15**
- **Luke 23**
- **John 19**

These burial scenes matter because they frame what Christians already believe happened:

- Jesus really died
- His body was handled
- He was buried
- the tomb becomes central to resurrection testimony

That means the shroud question is not floating in random history.
It sits close to the passion narrative.

# John Matters a Lot Here

**John 19-20** is especially important because John pays attention to burial cloth details.

That matters because when people discuss a relic like this, they often bring John's language into the conversation.

John helps keep the burial story physical and concrete.
Jesus is not presented as vaguely disappearing into myth.
His death and burial are treated as real events in time and space.

# One Word Worth Knowing

The Greek word **sindon** is often associated with a linen cloth or shroud-like burial fabric in Gospel burial discussions.

That matters because the burial of Jesus is told in material terms, not only symbolic ones.

Cloth, tomb, spices, body, stone, and witnesses all matter in the passion story.

# Why Image Analysis Is Such a Big Deal

One of the documentary's main hooks is the use of graphic and imaging technology.

That matters because the Shroud of Turin debate is not only theological.
It is visual and forensic.

Researchers want to know things like:

- how the image formed
- whether the markings resemble blood
- whether the body proportions line up with crucifixion trauma
- whether the image behaves like paint, stain, scorch, or something else

That is why the shroud keeps pulling in experts from different worlds.

It is not only a church-history object.
It is also a forensic puzzle.

# Faith and Proof Need to Be Kept in the Right Order

This is one of the most important Bible Buddy takeaways.

Christian faith does not stand or fall on one relic.

The resurrection claim is rooted in:

- the testimony of Scripture
- the witness of the apostles
- the early church's proclamation
- the person of Jesus Himself

So if someone studies the shroud, that can be interesting and valuable.
But the cloth is not the foundation of Christianity.

Jesus is.

That keeps the conversation healthy.

# The Real Value of a Documentary Like This

A documentary like this helps people imagine the physical world around the crucifixion more clearly.

It pushes you to think about:

- what Roman execution did to the body
- what Jewish burial looked like
- why cloth and tomb details matter
- how Christian memory can become attached to objects

So even if someone stays uncertain about the shroud's authenticity, the documentary can still deepen their sense that the Gospel story happened in the real world.

# A Few Themes to Keep Straight

## Relic

A relic is a physical object associated with a holy person, event, or sacred history.

That matters because relics can become powerful devotionally, but they also require careful historical examination.

## Crucifixion

The Shroud debate often circles back to whether the image reflects wounds that match crucifixion.

That matters because the cross is central to Christian faith, not just emotionally, but historically and theologically.

## Burial

Burial matters because the resurrection is not about vague survival.
It is about a truly dead Jesus who was buried and then raised.

# Scripture Connections to Read Alongside This

If you want to pair this documentary with the Bible, good passages are:

- **Isaiah 53** for the suffering servant background
- **Matthew 27-28**
- **Mark 15-16**
- **Luke 23-24**
- **John 19-20**
- **1 Corinthians 15** for the centrality of death, burial, and resurrection

These passages help keep the relic conversation anchored to the Gospel itself.

# Final Takeaway

The Shroud of Turin remains compelling because it sits where history, devotion, suffering, and mystery meet.

People look at it and ask whether they are seeing:

- a witness
- an artwork
- a symbol
- or a historical remnant

That question probably keeps it controversial.

But the documentary is still useful because it reminds you that Christianity is not a faith of abstract ideas only.
It is a faith rooted in body, blood, burial, tomb, and resurrection claims made in history.

So the biggest value here is not that one cloth solves every question.
It is that the documentary pushes you back toward the physical seriousness of the Gospel story itself.`,
    },
  ],
};

export const bibleBuddyTvTitles: BibleBuddyTvTitle[] = [
  promisedLandTitle,
  theChosenTitle,
  mosesMovieTitle,
  josephMovieTitle,
  twelveApostlesMovieTitle,
  gospelOfJohnMovieTitle,
  estherMovieTitle,
  jeremiahMovieTitle,
  lostTreasuresDocumentaryTitle,
  historyOfTheBibleDocumentaryTitle,
  storyOfGodDocumentaryTitle,
  deadSeaScrollDetectivesTitle,
  peterAndPaulDocumentaryTitle,
  shroudOfTurinDocumentaryTitle,
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
