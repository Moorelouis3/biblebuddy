type DavidReading = {
  book: string;
  chapter: number;
};

type DavidSection = {
  reference: string;
  title: string;
  verseCallouts: string[];
  points: string[];
};

type DavidChapterNote = {
  day: number;
  title: string;
  reading: DavidReading;
  opening: string;
  previous: string;
  whyMatters: string;
  history: string;
  watchFor: string[];
  words: string[];
  sections: DavidSection[];
  callbacks: string[];
  emotionalWeight: string;
  application: string;
  bridge: string;
  reflection: string;
};

function renderVerseRange(reference: string) {
  const match = reference.match(/^(.+?)\s+\d+:(.+)$/);
  return match ? `**${match[2]}**` : reference;
}

function renderList(items: string[]) {
  return items.map((item) => `* ${item}`).join("\n\n");
}

function renderSection(section: DavidSection) {
  return `# 📍 ${renderVerseRange(section.reference)} - ${section.title}

${section.verseCallouts.length ? `## Key Verse${section.verseCallouts.length > 1 ? "s" : ""}

${section.verseCallouts.map((verse) => `> ${verse}`).join("\n>\n")}` : ""}

Let's slow down here because this detail matters.

## What Happened

${section.points[0]}

## What It Meant Then

${section.points[1]}

In their world, kingship, family honor, covenant loyalty, public reputation, worship, warfare, and inheritance all carried weight. David's story is never just private.

## Where We Have Seen This Before

${section.points[2]}

The Bible keeps showing us that God forms people in hidden places before their public calling becomes visible.

## What Is Happening Emotionally

${section.points[3]}

Picture the scene. David is not a flat hero. He is a shepherd, son, warrior, fugitive, friend, worshiper, king, sinner, mourner, and old man handing off a complicated legacy.

## What This Teaches Us Now

${section.points[4]}`;
}

function renderNote(note: DavidChapterNote) {
  return `${note.opening}

${note.previous}

${note.whyMatters}

David's story is not clean in the way people sometimes want Bible stories to be clean.

It has worship.

It has courage.

It has friendship.

It has jealousy.

It has caves.

It has songs.

It has terrible sin.

It has repentance.

It has family pain.

And it has a heart that keeps getting pulled back toward God.

That matters.

Because when Scripture calls David a man after God's heart, it does not mean David was flawless.

It means there was a real hunger in him.

A real return in him.

A real tenderness before God that still mattered even after failure.

This study is about that heart.

Not a perfect heart.

A responsive heart.

---

# 🏛️ The World Behind ${note.reading.book} ${note.reading.chapter}

${note.history}

David lives during Israel's shift from tribal life under judges into monarchy.

That shift was huge.

Israel wanted a king like the nations.

Saul became the first king, but his heart drifted into fear, image, and disobedience.

Then David enters the story.

Not from a palace.

Not from a royal academy.

From the fields.

That detail matters because David's public life keeps carrying the marks of his private formation.

The shepherd becomes king.

The musician becomes warrior.

The fugitive becomes ruler.

And the sinner becomes a man who still knows how to repent.

---

# 🔎 What To Watch For

${renderList(note.watchFor)}

---

# 📖 Words And Details That Matter

${renderList(note.words)}

These are not random facts.

They help us feel the world David lived in.

David's life is not only about big moments.

It is about what those moments reveal.

What does he do when overlooked?

What does he do when praised?

What does he do when hunted?

What does he do when corrected?

What does he do when he has power?

Those questions reveal the heart.

---

${note.sections.map(renderSection).join("\n\n---\n\n")}

---

# 🔁 Bible Callbacks

${renderList(note.callbacks)}

David's story reaches backward and forward.

Backward to Abraham, covenant, shepherding, worship, and the tribes of Israel.

Forward to the kings of Judah, the Psalms, the prophets, and ultimately Jesus, the Son of David.

So this is never only biography.

It is covenant history.

---

# 💔 The Emotional Weight

${note.emotionalWeight}

David is easy to admire from a distance.

But up close, his life is heavy.

He is overlooked before he is chosen.

Targeted after he is praised.

Pressed in caves before he is crowned.

Corrected after he sins.

Broken by family rebellion.

Still singing.

Still returning.

Still needing mercy.

That is what makes him feel so human.

---

# 🧠 What This Teaches Us Now

${note.application}

David teaches us that the heart matters in every season.

Hidden seasons.

Public seasons.

Successful seasons.

Dangerous seasons.

Repentance seasons.

Legacy seasons.

The question is not only what God has called you to do.

The question is what kind of heart is being formed while you do it.

---

# 🧠 Pause And Reflect

${note.reading.book} ${note.reading.chapter} is not meant to be rushed.

It reveals another layer of David's heart and another part of God's covenant story.

${note.bridge}

Before moving on, sit with the chapter.

Where is David strong?

Where is David vulnerable?

Where do you see God forming, correcting, protecting, or calling him deeper?`;
}

const DAVID_NOTES: DavidChapterNote[] = [
  {
    day: 1,
    title: "Chosen In The Field",
    reading: { book: "1 Samuel", chapter: 16 },
    opening: "1 Samuel 16 begins with disappointment hanging over Israel. Saul is still king, but God has rejected his kingship, and Samuel is sent to Bethlehem to anoint someone nobody expects.",
    previous: "Israel wanted a king like the nations, and Saul looked the part. But appearance could not carry obedience.",
    whyMatters: "This chapter matters because David's story begins with God seeing what everyone else overlooked.",
    history: "Bethlehem was not Jerusalem's royal center. It was a small town in Judah. Shepherding was hard, ordinary work, and the youngest son was not usually the obvious heir of family honor.",
    watchFor: [
      "🛢️ Samuel carrying oil to anoint the next king",
      "👀 Jesse's older sons looking impressive",
      "❤️ God looking at the heart",
      "🐑 David being called from the sheep",
      "🎵 David entering Saul's court as a musician",
    ],
    words: [
      "🛢️ **Anointing** marked someone as set apart for God's purpose, often for priestly or kingly service.",
      "❤️ **Heart** in Hebrew thought means inner life, will, desire, courage, motive, and direction.",
      "🐑 **Shepherd** was ordinary work, but it trained watchfulness, courage, patience, and care.",
      "🎵 **Lyre** reminds us David's gift was not only battle. Worship and music were already part of him.",
    ],
    sections: [
      {
        reference: "1 Samuel 16:1-5",
        title: "Samuel Goes To Bethlehem",
        verseCallouts: ["**1** I have provided for myself a king among his sons"],
        points: [
          "God sends Samuel to Jesse's house while Saul is still on the throne.",
          "This is dangerous. Anointing another king while the current king lives could look like treason.",
          "Joseph was chosen in a family where older brothers expected position. David's story will carry that younger-brother tension too.",
          "Samuel is grieving Saul, afraid of Saul, and still asked to obey God.",
          "Sometimes obedience begins while the old chapter is still emotionally unresolved.",
        ],
      },
      {
        reference: "1 Samuel 16:6-13",
        title: "God Looks At The Heart",
        verseCallouts: ["**7** For the LORD sees not as man sees: man looks on the outward appearance, but the LORD looks on the heart"],
        points: [
          "Jesse's sons pass before Samuel, but God rejects the obvious choices and chooses David from the field.",
          "Birth order mattered deeply. The oldest son usually carried expectation, honor, and leadership.",
          "Jacob was chosen over Esau. Joseph rose above older brothers. David now continues the pattern of God overturning human assumptions.",
          "Imagine David being absent from his own anointing lineup. Nobody even thought to call him at first.",
          "Being overlooked by people does not mean unseen by God.",
        ],
      },
      {
        reference: "1 Samuel 16:14-23",
        title: "The Shepherd Enters The Court",
        verseCallouts: ["**18** skillful in playing, a man of valor, a man of war, prudent in speech"],
        points: [
          "David is brought into Saul's court because his music brings relief to Saul's troubled spirit.",
          "Music was not entertainment only. It could soothe, shape atmosphere, and serve in royal spaces.",
          "Joseph entered Pharaoh's court through wisdom. Daniel entered Babylon's court through excellence. David enters Saul's court through worshipful skill.",
          "The strange tension is that David now serves the king he has been anointed to replace.",
          "God can place you near the future before the future is ready to open fully.",
        ],
      },
    ],
    callbacks: [
      "👥 Jacob chosen over Esau.",
      "🌾 Joseph rising above older brothers.",
      "🏛️ Joseph and Daniel serving inside royal courts before promotion.",
    ],
    emotionalWeight: "This chapter carries the ache of being unseen and the wonder of being chosen anyway.",
    application: "David teaches that hidden formation is not wasted. God sees what people skip over.",
    bridge: "David has been anointed, but he has not been crowned. Next, Psalm 23 lets us hear the shepherd heart that was formed before the throne.",
    reflection: "Do you spend more time worrying about how people see you or about the kind of heart God sees in you?",
  },
];

const DAVID_JOURNEY: Array<{
  title: string;
  reading: DavidReading;
  focus: string;
  emotion: string;
  application: string;
  reflection: string;
}> = [
  {
    title: "The Heart Of A Shepherd",
    reading: { book: "Psalms", chapter: 23 },
    focus: "David turns the world of shepherding into a prayer of trust. The Lord is not distant to him. The Lord is Shepherd, guide, restorer, protector, host, and covenant companion.",
    emotion: "The emotional center is trust learned in hidden places. David knows valleys are real, but he also knows he is not walking them alone.",
    application: "The field is not wasted space. God often grows a person's deepest trust before anyone else notices their calling.",
    reflection: "What hidden season in your life may be teaching you things that public success never could?",
  },
  {
    title: "The Boy Who Faced Goliath",
    reading: { book: "1 Samuel", chapter: 17 },
    focus: "David enters the battlefield carrying food, hears Goliath mocking the living God, and interprets the whole moment through covenant instead of fear.",
    emotion: "Everyone else sees size. David sees insult against God. His courage is not ego. It is memory, worship, and covenant confidence.",
    application: "Public courage is often built from private history with God.",
    reflection: "What giant feels bigger than it should because you have been looking at its size more than God's strength?",
  },
  {
    title: "When Success Turns Dangerous",
    reading: { book: "1 Samuel", chapter: 18 },
    focus: "David succeeds, Jonathan loves him, the people sing about him, and Saul's heart twists with jealousy.",
    emotion: "The chapter feels like the cost of visibility. David does not create Saul's jealousy, but he has to live under it.",
    application: "Favor can open doors and expose envy at the same time.",
    reflection: "Have you ever felt pressure or jealousy from others after God began opening doors in your life?",
  },
  {
    title: "Running From Saul",
    reading: { book: "1 Samuel", chapter: 19 },
    focus: "Saul's jealousy becomes violent, and David's life shifts from royal service to survival.",
    emotion: "This is betrayal inside the house of someone David served faithfully.",
    application: "Being chosen by God does not mean the road to promise will be simple.",
    reflection: "Where do you feel caught between what God promised and what your current reality looks like?",
  },
  {
    title: "A Friend Named Jonathan",
    reading: { book: "1 Samuel", chapter: 20 },
    focus: "Jonathan chooses covenant loyalty to David even though David's rise costs Jonathan personally.",
    emotion: "This friendship is tender because it forms under threat, tears, and risk.",
    application: "God often strengthens people through faithful relationships, not only dramatic miracles.",
    reflection: "Do you have the kind of godly friendship that tells the truth and stays loyal when life gets costly?",
  },
  {
    title: "Living Like A Fugitive",
    reading: { book: "1 Samuel", chapter: 21 },
    focus: "David eats holy bread, receives Goliath's sword, and acts insane in Gath to survive.",
    emotion: "The future king looks scared, hungry, and humiliated. The promise does not look royal yet.",
    application: "Messy survival chapters do not cancel God's calling.",
    reflection: "Have you ever had a season that felt messy and humiliating even though you believed God still had a purpose over your life?",
  },
  {
    title: "Whom Shall I Fear?",
    reading: { book: "Psalms", chapter: 27 },
    focus: "David sings about fear, enemies, beauty, waiting, and the one thing he wants most: nearness to God.",
    emotion: "The psalm is not denial. It is courage spoken into fear.",
    application: "The heart of David wanted God's presence, not only God's protection.",
    reflection: "When life gets heavy, do you mostly want God to fix things, or do you still want to be near Him Himself?",
  },
  {
    title: "The Cave And The Cut Corner",
    reading: { book: "1 Samuel", chapter: 24 },
    focus: "David has a chance to kill Saul but refuses to seize the throne through revenge.",
    emotion: "The cave is tense because the wrong choice looks easy to justify.",
    application: "Not every open door is God's way forward.",
    reflection: "Have you ever had a chance to get even or take control in a way that felt justified, but you knew it was not God's way?",
  },
  {
    title: "The Voice Of Abigail",
    reading: { book: "1 Samuel", chapter: 25 },
    focus: "David is ready to answer Nabal's insult with bloodshed, but Abigail steps in with courage and wisdom.",
    emotion: "This chapter shows how quickly wounded pride can become dangerous.",
    application: "A wise correction can save you from a foolish version of yourself.",
    reflection: "Are you humble enough to receive wise correction when God sends it through another person?",
  },
  {
    title: "Mercy A Second Time",
    reading: { book: "1 Samuel", chapter: 26 },
    focus: "David again has the opportunity to kill Saul and again leaves judgment in God's hands.",
    emotion: "Mercy once may look like a moment. Mercy twice looks like formation.",
    application: "Trust often has to be repeated, not only declared.",
    reflection: "What situation keeps tempting you to take control back instead of leaving it in God's hands?",
  },
  {
    title: "King Over Judah",
    reading: { book: "2 Samuel", chapter: 2 },
    focus: "David asks God where to go, moves to Hebron, and becomes king over Judah while the full kingdom remains divided.",
    emotion: "This is partial fulfillment. Promise is moving, but not finished.",
    application: "God often unfolds calling in stages.",
    reflection: "Are you able to thank God for partial progress, or do you only notice what has not fully happened yet?",
  },
  {
    title: "King Over All Israel",
    reading: { book: "2 Samuel", chapter: 5 },
    focus: "David becomes king over all Israel, captures Jerusalem, and continues asking God for direction in battle.",
    emotion: "The long wait finally becomes public, but dependence still matters.",
    application: "New responsibility should deepen prayer, not replace it.",
    reflection: "When God gives you more responsibility, do you become more dependent on Him or more self-reliant?",
  },
  {
    title: "David Danced Before The Lord",
    reading: { book: "2 Samuel", chapter: 6 },
    focus: "The ark comes to Jerusalem with both warning and worship: Uzzah's death, David's fear, and David's full-bodied rejoicing.",
    emotion: "Joy and reverence stand side by side.",
    application: "True worship is alive, but never careless with God's holiness.",
    reflection: "Do you hold back worship because you are too aware of how you look to other people?",
  },
  {
    title: "A House For God And A Promise For David",
    reading: { book: "2 Samuel", chapter: 7 },
    focus: "David wants to build God a house, but God promises to build David a house through covenant.",
    emotion: "David sits before God stunned by grace.",
    application: "Grace should make calling feel humbling, not entitled.",
    reflection: "When God gives grace bigger than what you expected, does it make you more entitled or more humble?",
  },
  {
    title: "The Sin With Bathsheba",
    reading: { book: "2 Samuel", chapter: 11 },
    focus: "David sees, sends, takes, hides, and arranges Uriah's death. Power and secrecy become deadly.",
    emotion: "This is the dark turn. The Bible refuses to protect David's image.",
    application: "Great calling does not cancel the need for daily obedience.",
    reflection: "What area of your life feels dangerous because comfort, power, or secrecy could make compromise easier?",
  },
  {
    title: "Create In Me A Clean Heart",
    reading: { book: "Psalms", chapter: 51 },
    focus: "David stops hiding and asks God for mercy, cleansing, truth, and a clean heart.",
    emotion: "This psalm sounds like a broken king telling the truth at last.",
    application: "Repentance is not image repair. It is surrender before God.",
    reflection: "Is there anything you need to stop managing and finally confess honestly before God?",
  },
  {
    title: "You Are The Man",
    reading: { book: "2 Samuel", chapter: 12 },
    focus: "Nathan confronts David, David confesses, forgiveness is spoken, and consequences remain.",
    emotion: "Grace and grief stand in the same room.",
    application: "Mercy is real, but sin is never small because mercy exists.",
    reflection: "How do you respond when God confronts something in you that you would rather keep hidden?",
  },
  {
    title: "A Son's Rebellion",
    reading: { book: "2 Samuel", chapter: 15 },
    focus: "Absalom steals hearts, rebels, and David leaves Jerusalem barefoot and weeping.",
    emotion: "The wound is now inside David's own house.",
    application: "Even in family pain, David leaves room for God instead of grasping for control.",
    reflection: "Where do you need to trust God in a family situation you cannot control?",
  },
  {
    title: "The Lord Is My Rock",
    reading: { book: "2 Samuel", chapter: 22 },
    focus: "David looks back and sings of God as rock, fortress, deliverer, shield, and salvation.",
    emotion: "This is worship with scar tissue in it.",
    application: "A mature testimony learns to see God's hand across the whole messy story.",
    reflection: "When you look back, where can you see God carrying you through more than you realized at the time?",
  },
  {
    title: "David's Final Charge",
    reading: { book: "1 Kings", chapter: 2 },
    focus: "David gives Solomon final instructions and dies, leaving a complicated but covenant-shaped legacy.",
    emotion: "The ending is sober. David's life is full, brilliant, broken, worshipful, and unfinished.",
    application: "Legacy is not only what you accomplished. It is what you hand forward.",
    reflection: "What kind of spiritual legacy are you building with the choices you make now?",
  },
];

const DAVID_READING_VERSE_COUNTS: Record<string, number> = {
  "1 Samuel 17": 58,
  "1 Samuel 18": 30,
  "1 Samuel 19": 24,
  "1 Samuel 20": 42,
  "1 Samuel 21": 15,
  "1 Samuel 24": 22,
  "1 Samuel 25": 44,
  "1 Samuel 26": 25,
  "2 Samuel 2": 32,
  "2 Samuel 5": 25,
  "2 Samuel 6": 23,
  "2 Samuel 7": 29,
  "2 Samuel 11": 27,
  "2 Samuel 12": 31,
  "2 Samuel 15": 37,
  "2 Samuel 22": 51,
  "1 Kings 2": 46,
  "Psalms 23": 6,
  "Psalms 27": 14,
  "Psalms 51": 19,
};

function getReadingRanges(book: string, chapter: number) {
  const total = DAVID_READING_VERSE_COUNTS[`${book} ${chapter}`] ?? 30;
  const firstEnd = Math.max(1, Math.ceil(total / 3));
  const secondEnd = Math.max(firstEnd + 1, Math.ceil((total * 2) / 3));

  return [
    { start: 1, end: firstEnd },
    { start: Math.min(firstEnd + 1, total), end: Math.min(secondEnd, total) },
    { start: Math.min(secondEnd + 1, total), end: total },
  ];
}

function buildGeneratedNote(day: number, item: (typeof DAVID_JOURNEY)[number]): DavidChapterNote {
  const { book, chapter } = item.reading;
  const isPsalm = book === "Psalms";
  const isFailure = book === "2 Samuel" && [11, 12, 15].includes(chapter);
  const isRise = book.includes("Samuel") && [16, 17, 18, 19, 20, 21, 24, 25, 26].includes(chapter);
  const ranges = getReadingRanges(book, chapter);

  return {
    day,
    title: item.title,
    reading: item.reading,
    opening: `${book} ${chapter} brings us into another major scene in David's life. ${item.focus}`,
    previous:
      day === 2
        ? "David has just been chosen from the field in 1 Samuel 16. Psalm 23 lets us hear the shepherd theology that was being formed in him."
        : "David's story keeps moving through hidden formation, public pressure, worship, waiting, power, failure, repentance, and legacy.",
    whyMatters: `This chapter matters because ${item.application.toLowerCase()}`,
    history: isPsalm
      ? "The Psalms are prayers and songs formed in real life. Many are tied to David's world of shepherding, danger, worship, repentance, kingship, and dependence on God."
      : isFailure
        ? "Ancient kings held enormous power. That power could protect people when used rightly, but it could also crush people when desire, secrecy, and pride took control."
        : isRise
          ? "First Samuel traces the collapse of Saul's kingship and the rise of David. Israel is learning what kind of heart a king must have before God."
          : "Second Samuel and Kings show David's reign, worship, covenant promise, family pain, and legacy. Kingship is public, spiritual, political, and deeply personal.",
    watchFor: [
      "👀 what this chapter reveals about David's heart",
      "⚖️ how power, pressure, fear, or worship tests him",
      "💬 how words, songs, correction, or friendship shape the moment",
      "🙏 where David moves toward God or away from Him",
      "👑 how this scene affects the larger covenant story",
    ],
    words: [
      "❤️ **Heart** means the inner direction of a person: desire, trust, motive, courage, humility, and surrender.",
      "👑 **King** was not only a political title in Israel. The king was meant to lead under God's authority.",
      "🛡️ **Covenant loyalty** matters because David's relationships and God's promises are not casual arrangements.",
      "🎵 **Psalm/song** shows David turning real life into prayer, worship, lament, confession, and testimony.",
    ],
    sections: [
      {
        reference: `${book} ${chapter}:${ranges[0].start}-${ranges[0].end}`,
        title: "The Scene Opens",
        verseCallouts: [`**${ranges[0].start}** ${book} ${chapter} opens another window into David's heart.`],
        points: [
          item.focus,
          "In Israel's world, leadership and worship were never meant to be separated from covenant faithfulness.",
          "Abraham had to trust promises before seeing fulfillment. Joseph had to stay faithful before promotion. David now has to carry calling through pressure.",
          item.emotion,
          item.application,
        ],
      },
      {
        reference: `${book} ${chapter}:${ranges[1].start}-${ranges[1].end}`,
        title: "The Heart Is Tested",
        verseCallouts: [`**${ranges[1].start}** The middle of ${book} ${chapter} shows that David's story is never only about outward events.`],
        points: [
          "The chapter presses beneath the surface and shows what pressure reveals.",
          "In the ancient world, public actions carried family, tribal, and national consequences. David's choices never affect only David.",
          "Saul shows what happens when insecurity rules a king. David at his best shows what happens when dependence rules the heart.",
          "This is where the chapter becomes human. David's courage, fear, worship, anger, grief, or repentance comes into view.",
          "The heart is not proven by one emotional moment. It is revealed over time by repeated choices.",
        ],
      },
      {
        reference: `${book} ${chapter}:${ranges[2].start}-${ranges[2].end}`,
        title: "What This Adds To David's Journey",
        verseCallouts: [`**${ranges[2].start}** By the end of ${book} ${chapter}, the story has added another layer to David's formation.`],
        points: [
          "The chapter moves David's life forward by exposing what kind of man he is becoming.",
          "David's world is full of kings, enemies, family systems, worship practices, military pressure, and covenant expectation.",
          "The Son of David theme will eventually lead to Jesus, the King whose heart, obedience, mercy, and rule are perfect.",
          "Emotionally, this chapter helps us stop treating David as either superhero or failure. He is more complex than that.",
          "God cares about the heart underneath the calling. That is the thread running through David's whole life.",
        ],
      },
    ],
    callbacks: [
      "🛢️ David's anointing in 1 Samuel 16.",
      "🌾 Joseph's hidden faithfulness before public responsibility.",
      "👑 Jesus as the promised Son of David.",
    ],
    emotionalWeight: item.emotion,
    application: item.application,
    bridge:
      day === 21
        ? "David's journey closes, but the covenant hope continues beyond him toward the greater Son of David."
        : `The next chapter of the journey keeps tracing how David's heart is formed, tested, exposed, and brought back toward God.`,
    reflection: item.reflection,
  };
}

for (let index = 0; index < DAVID_JOURNEY.length; index += 1) {
  DAVID_NOTES.push(buildGeneratedNote(index + 2, DAVID_JOURNEY[index]));
}

DAVID_NOTES.sort((a, b) => a.day - b.day);

export const HEART_OF_DAVID_CHAPTERS = DAVID_NOTES.map(({ day, title, reading, reflection }) => ({
  day,
  title,
  reading,
  reflection,
}));

export const HEART_OF_DAVID_DEEP_NOTES = DAVID_NOTES.map(renderNote);
