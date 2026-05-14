type DanielSection = {
  reference: string;
  title: string;
  verseCallouts: string[];
  points: string[];
};

type DanielChapterNote = {
  chapter: number;
  title: string;
  opening: string;
  previous: string;
  whyMatters: string;
  history: string;
  watchFor: string[];
  words: string[];
  sections: DanielSection[];
  callbacks: string[];
  emotionalWeight: string;
  application: string;
  bridge: string;
};

function renderVerseRange(reference: string) {
  const match = reference.match(/^Daniel\s+\d+:(.+)$/);
  return match ? `**${match[1]}**` : reference;
}

function renderList(items: string[]) {
  return items.map((item) => `* ${item}`).join("\n\n");
}

function renderSection(section: DanielSection) {
  return `# 📍 ${renderVerseRange(section.reference)} — ${section.title}

${section.verseCallouts.length ? `## Key Verse${section.verseCallouts.length > 1 ? "s" : ""}

${section.verseCallouts.map((verse) => `> ${verse}`).join("\n>\n")}` : ""}

Let's slow down here because this detail matters.

## What Happened

${section.points[0]}

## What It Meant Then

${section.points[1]}

In their world, this was not casual. Names, food, royal service, dreams, decrees, visions, and public worship were all tied to allegiance.

## Where We Have Seen This Before

${section.points[2]}

The Bible keeps showing us that God's people can be pressured by empire without being abandoned by God.

## What Is Happening Emotionally

${section.points[3]}

Picture the scene. This is not a clean children's Bible poster. Daniel is living in exile, serving foreign kings, watching kingdoms rise and fall, and learning that courage is often formed in quiet decisions before it is tested in public danger.

## What This Teaches Us Now

${section.points[4]}`;
}

function renderNote(note: DanielChapterNote) {
  return `${note.opening}

${note.previous}

${note.whyMatters}

Daniel is not just a book about lions, fire, and strange dreams.

It is a book about exile.

It is about living faithfully when the culture around you is trying to rename you, reshape you, use you, impress you, threaten you, and eventually replace everything familiar with Babylon's version of reality.

That detail matters.

Because Daniel's courage does not appear out of nowhere.

He does not become faithful at the lions' den.

The lions' den reveals the faithful life he had already been building for decades.

That is the heartbeat of this whole study.

Courage is not usually born in the crisis.

Courage is usually revealed there.

---

# 🏛️ The World Behind Daniel ${note.chapter}

${note.history}

Babylon was not just a city.

It was an empire with armies, language, education, gods, politics, and a whole way of forming people.

Persia later becomes the next empire in Daniel's story, but the pressure stays similar.

Different king.

Same question.

Will Daniel stay faithful when the world around him keeps changing?

---

# 🔎 What To Watch For

${renderList(note.watchFor)}

---

# 📖 Words And Details That Matter

${renderList(note.words)}

These are not random facts.

They help us feel the world Daniel lived in.

Exile was not only geography.

It was identity pressure.

It was memory pressure.

It was worship pressure.

And Daniel's faith had to survive there.

---

${note.sections.map(renderSection).join("\n\n---\n\n")}

---

# 🔁 Bible Callbacks

${renderList(note.callbacks)}

Daniel belongs inside the bigger Bible story.

This is what happens after covenant warnings become exile.

This is what happens when Jerusalem falls but God is still God.

This is what happens when the temple vessels are in Babylon, but heaven has not surrendered the throne.

---

# 💔 The Emotional Weight

${note.emotionalWeight}

We miss Daniel if we only remember the dramatic scenes.

There is homesickness here.

There is grief here.

There is pressure here.

There is the ache of being faithful in a place that keeps rewarding compromise and punishing loyalty.

Daniel is steady, but he is not made of stone.

His visions trouble him.

His prayers break him.

His body weakens under what God shows him.

That makes his courage more real, not less.

---

# 🧠 What This Teaches Us Now

${note.application}

Daniel teaches us that faithfulness is not only about one big heroic moment.

It is about the daily decisions that shape who you become before the big moment comes.

Prayer.

Diet.

Integrity.

Truth-telling.

Refusing idols.

Staying humble when gifted.

Staying loyal when threatened.

---

# 🧠 Pause And Reflect

Daniel ${note.chapter} is not meant to be rushed.

It reveals how God rules over kings, dreams, pressure, timing, judgment, and the future.

${note.bridge}

Before moving on, sit with the chapter.

Where is the pressure?

Where is the courage?

Where is God showing that Babylon is loud, but heaven is still higher?`;
}

const DANIEL_NOTES: DanielChapterNote[] = [
  {
    chapter: 1,
    title: "Faithful in Babylon",
    opening:
      "Daniel 1 begins with loss. Jerusalem is invaded, temple vessels are taken, and young men from Judah are carried into Babylon's system.",
    previous:
      "The exile did not come out of nowhere. Israel had been warned through the prophets, but the people kept drifting. Now covenant discipline has become national crisis.",
    whyMatters:
      "This chapter matters because Daniel's first test is not a lion. It is identity. Babylon wants to train him, feed him, rename him, and use him.",
    history:
      "Nebuchadnezzar's Babylon was a world power known for military strength, royal education, astrology, temples, and imperial propaganda. Taking elite young men from conquered nations was strategy. Babylon could weaken Judah and strengthen itself at the same time.",
    watchFor: [
      "🏛️ Jerusalem's fall and temple vessels being carried away",
      "📚 Babylonian education as identity formation",
      "🏷️ Hebrew names being replaced with Babylonian names",
      "🥗 Daniel drawing a line with food",
      "🧠 God giving wisdom in a foreign court",
    ],
    words: [
      "🏛️ **Exile** means forced life away from home, land, temple, and familiar worship rhythms.",
      "🏷️ **Belteshazzar** was Daniel's Babylonian name, part of the empire's attempt to reframe identity.",
      "🥗 **Defile** means Daniel saw the king's food as more than nutrition. It touched loyalty, conscience, and worship.",
      "📚 **Chaldeans** can refer to Babylonian wise men trained in court knowledge, astrology, and interpretation.",
    ],
    sections: [
      {
        reference: "Daniel 1:1-7",
        title: "Babylon Takes More Than Land",
        verseCallouts: ["**2** And the Lord gave Jehoiakim king of Judah into his hand"],
        points: [
          "Babylon conquers Jerusalem, carries off temple vessels, and selects young men for royal training.",
          "Taking elite youth was empire strategy. Babylon wanted bodies in its court and loyalty in their hearts.",
          "Joseph was taken into Egypt. Esther was pulled into Persia. Daniel now enters Babylon. God keeps placing His people inside foreign power without losing control.",
          "Imagine Daniel as a young man watching everything familiar stripped away. Home, temple, language, name, food, and future all feel unstable.",
          "The world can try to rename you, but it cannot decide who you belong to before God.",
        ],
      },
      {
        reference: "Daniel 1:8-16",
        title: "Daniel Draws A Quiet Line",
        verseCallouts: ["**8** But Daniel resolved that he would not defile himself"],
        points: [
          "Daniel resolves not to defile himself with the king's food and asks for a test with vegetables and water.",
          "Food in a royal court could be tied to pagan worship, luxury, dependency, and assimilation. Daniel's line is spiritual, not picky.",
          "Genesis shows Joseph resisting Potiphar's wife in private integrity. Daniel's private resolve carries the same kind of hidden courage.",
          "This is not dramatic yet. No crowd is cheering. Daniel is simply deciding what Babylon will not be allowed to own.",
          "Courage often begins quietly, in the small line you draw before the public test arrives.",
        ],
      },
      {
        reference: "Daniel 1:17-21",
        title: "God Gives Wisdom",
        verseCallouts: ["**17** God gave them learning and skill in all literature and wisdom"],
        points: [
          "God gives Daniel and his friends wisdom, and they are found ten times better than the wise men of Babylon.",
          "This means Daniel does not reject learning. He rejects defilement. He can study Babylon's language without surrendering to Babylon's gods.",
          "Moses was trained in Egyptian wisdom. Daniel is trained in Babylonian wisdom. God can use skill without letting culture become lord.",
          "There is dignity here. Daniel is not surviving by laziness or resentment. He excels with God's help.",
          "Faithfulness should make us deeper, wiser, and more useful, not less excellent.",
        ],
      },
    ],
    callbacks: [
      "⛓️ Joseph in Egypt shows faithfulness in a foreign system.",
      "👑 Esther in Persia shows hidden identity under empire.",
      "📜 Deuteronomy warned that covenant rebellion could lead to exile.",
    ],
    emotionalWeight:
      "Daniel 1 is painful because the pressure starts young. Daniel is not only learning a new curriculum. He is learning how to remain himself when Babylon is trying to rebuild him.",
    application:
      "This chapter asks where you need quiet resolve. Not loud rebellion for attention, but steady loyalty before God in the place where compromise feels easiest.",
    bridge:
      "Daniel has passed the first identity test. Daniel 2 will show the pressure rising when the king's dream puts every wise man under a death sentence.",
  },
  {
    chapter: 2,
    title: "The God Who Reveals Mysteries",
    opening:
      "Daniel 2 moves from identity pressure to life-and-death pressure. Nebuchadnezzar dreams, panics, and demands the impossible.",
    previous:
      "Daniel and his friends have been trained in Babylon but remain faithful to God. Now their wisdom will be tested under royal threat.",
    whyMatters:
      "This chapter matters because Daniel shows what faithful wisdom does under pressure: he asks for time, gathers believers, prays, and gives God credit.",
    history:
      "Ancient kings often treated dreams as serious messages from the divine realm. Babylon had dream interpreters, magicians, enchanters, and astrologers, but Nebuchadnezzar's demand exposes the limits of human systems.",
    watchFor: [
      "🌙 the king's impossible demand",
      "⚰️ the death sentence over Babylon's wise men",
      "🙏 Daniel gathering his friends to pray",
      "🪨 the statue and the stone cut without hands",
      "👑 God's kingdom crushing human empires",
    ],
    words: [
      "🌙 **Mystery** means something hidden that human wisdom cannot uncover on its own.",
      "🪨 **Stone cut without hands** points to a kingdom God establishes, not a human empire built by force.",
      "🏛️ **Kingdom** is the chapter's big theme: Babylon looks strong, but God's kingdom is final.",
      "🙏 **God of heaven** is Daniel's repeated way of naming the Lord above Babylon's gods.",
    ],
    sections: [
      {
        reference: "Daniel 2:1-13",
        title: "An Impossible Demand",
        verseCallouts: ["**10** There is not a man on earth who can meet the king's demand"],
        points: [
          "Nebuchadnezzar demands both the dream and interpretation. The wise men admit no human being can do it.",
          "The king's demand exposes Babylon's spiritual experts. Their system has limits, and the crisis reveals it.",
          "Pharaoh's dreams in Genesis also exposed Egypt's limits and opened the door for Joseph. Daniel's story echoes Joseph's.",
          "Everyone is afraid because the king's insecurity becomes deadly policy.",
          "Pressure often exposes what we have really been trusting. Babylon's wise men hit the ceiling of human wisdom.",
        ],
      },
      {
        reference: "Daniel 2:14-23",
        title: "Daniel Prays Before He Speaks",
        verseCallouts: ["**18** seek mercy from the God of heaven concerning this mystery"],
        points: [
          "Daniel asks for time and gathers his friends to seek God's mercy. The mystery is revealed in a night vision.",
          "This is communal faith. Daniel does not isolate under pressure; he brings trusted friends into prayer.",
          "The early church later prays together under threat in Acts. Daniel's small group in Babylon models that same reflex.",
          "The emotional move is important. Daniel does not panic first and pray later. He seeks God first.",
          "The first move under impossible pressure should not always be more hustle. Sometimes it is humble prayer.",
        ],
      },
      {
        reference: "Daniel 2:24-49",
        title: "The Stone That Breaks The Statue",
        verseCallouts: ["**44** the God of heaven will set up a kingdom that shall never be destroyed"],
        points: [
          "Daniel tells the dream and interpretation: human kingdoms rise and fall, but God's kingdom will crush them and last forever.",
          "The statue shows layered empires, but the stone shows God's final rule. The future does not belong to Babylon.",
          "Jesus later announces the kingdom of God. Daniel 2 is part of the deep Old Testament soil for that announcement.",
          "Daniel stands before the king with humility, giving God all credit.",
          "Your gifts are safest when they stay surrendered. Daniel's wisdom lifts him, but he uses it to point upward.",
        ],
      },
    ],
    callbacks: [
      "🌾 Joseph interpreting Pharaoh's dreams in Genesis 41.",
      "🙏 The praying church in Acts under pressure.",
      "👑 Jesus preaching the kingdom of God.",
    ],
    emotionalWeight:
      "This chapter feels intense because death is hanging over the wise men. Daniel is young, exiled, and under threat, but he moves with calm faith.",
    application:
      "Daniel 2 teaches that wisdom starts with dependence. Before Daniel is brilliant before the king, he is humble before God.",
    bridge:
      "God has shown that His kingdom outlasts all empires. Daniel 3 will test whether Daniel's friends will bow to an image of empire or stay loyal to God.",
  },
  {
    chapter: 3,
    title: "Faith Inside The Fire",
    opening:
      "Daniel 3 centers on Shadrach, Meshach, and Abednego, but it belongs deeply inside Daniel's courage story. These are the men formed beside him in Babylon.",
    previous:
      "Daniel 2 revealed that Babylon's golden head would not last forever. Daniel 3 shows Nebuchadnezzar building a golden image and demanding worship.",
    whyMatters:
      "This chapter matters because loyalty becomes public. The question is simple and terrifying: bow or burn.",
    history:
      "Public worship ceremonies in ancient empires were political loyalty tests. To refuse the image was not merely private religious disagreement. It looked like resistance to the king's authority.",
    watchFor: [
      "🗿 the golden image on the plain of Dura",
      "🎶 music as the signal for public worship",
      "🔥 the furnace as state punishment",
      "🗣️ even-if-not faith",
      "🚶 the fourth figure in the fire",
    ],
    words: [
      "🗿 **Image** connects worship and empire. Nebuchadnezzar wants visible loyalty.",
      "🔥 **Furnace** was not metaphorical pressure. It was real death.",
      "🗣️ **Even if not** is faith that does not depend on guaranteed rescue.",
      "🚶 **Fourth man** shows God's presence inside the fire, not only after it.",
    ],
    sections: [
      {
        reference: "Daniel 3:1-7",
        title: "The Empire Demands Worship",
        verseCallouts: ["**5** you are to fall down and worship the golden image"],
        points: [
          "Nebuchadnezzar sets up a golden image and commands everyone to bow when the music plays.",
          "This is worship as state performance. The empire wants bodies bent publicly so loyalty is visible.",
          "Babel tried to gather humanity around a monument. Babylon now gathers officials around an image.",
          "The pressure is social and physical. Everyone is doing it. The cost of standing out is death.",
          "Idols often come with music, crowds, and consequences. Faithfulness sometimes means staying upright when everyone else bends.",
        ],
      },
      {
        reference: "Daniel 3:8-18",
        title: "Even If He Does Not",
        verseCallouts: ["**18** But if not... we will not serve your gods"],
        points: [
          "The three men refuse to worship and tell the king God is able to deliver, but even if He does not, they will not bow.",
          "This is covenant loyalty. They are not negotiating worship based on survival.",
          "Job says, 'Though he slay me, I will hope in him.' This is that same deep faith under another kind of fire.",
          "Their courage is emotionally honest because they do not claim to control the outcome.",
          "Mature faith trusts God's worth even when it cannot predict God's method.",
        ],
      },
      {
        reference: "Daniel 3:19-30",
        title: "God Meets Them In The Fire",
        verseCallouts: ["**25** I see four men unbound, walking in the midst of the fire"],
        points: [
          "The men are thrown into the furnace, but Nebuchadnezzar sees four figures walking unharmed in the fire.",
          "The king sees that his power has limits. The fire he controls cannot consume the servants God preserves.",
          "The burning bush in Exodus was on fire but not consumed. Here God's servants stand in fire but are not consumed.",
          "The miracle is not only rescue from the furnace. It is God's presence in the furnace.",
          "Sometimes God delivers from the fire. Sometimes He reveals Himself in it. Either way, He is Lord over it.",
        ],
      },
    ],
    callbacks: [
      "🏙️ Babel gathering around human glory.",
      "🌿 The burning bush not consumed in Exodus.",
      "💔 Job's faith when suffering remains unexplained.",
    ],
    emotionalWeight:
      "This chapter is terrifying because obedience has a visible cost. They are not choosing between easy and hard. They are choosing between worship and survival.",
    application:
      "Daniel 3 asks whether your worship has a price tag. If obedience costs comfort, approval, or safety, will you still stay loyal?",
    bridge:
      "The king has seen God's power in the furnace. Daniel 4 will show God humbling the king's pride personally.",
  },
  {
    chapter: 4,
    title: "The King Who Became Like A Beast",
    opening:
      "Daniel 4 is Nebuchadnezzar's testimony of being humbled. The king who ruled like he was untouchable learns that the Most High rules over kingdoms.",
    previous:
      "Nebuchadnezzar has seen Daniel's God reveal dreams and rescue men from fire, but pride still sits deeply in him.",
    whyMatters:
      "This chapter matters because God confronts royal pride. Daniel has to tell hard truth to a king he has served for years.",
    history:
      "Ancient kings often presented themselves as chosen, glorious, and almost godlike. Babylon's architecture and wealth reinforced the king's greatness. Daniel 4 cuts through that illusion.",
    watchFor: [
      "🌳 the great tree dream",
      "🪓 the command to cut it down",
      "🗣️ Daniel's troubled honesty",
      "🐂 Nebuchadnezzar becoming like a beast",
      "👑 the king learning heaven rules",
    ],
    words: [
      "🌳 **Tree** symbolizes Nebuchadnezzar's reach, provision, and visible greatness.",
      "👀 **Watcher** refers to a heavenly messenger announcing judgment.",
      "🐂 **Beast** shows pride dehumanizing the king.",
      "👑 **Most High** is the title that places God above every earthly ruler.",
    ],
    sections: [
      {
        reference: "Daniel 4:1-18",
        title: "A Tree Too Tall",
        verseCallouts: ["**17** the Most High rules the kingdom of men"],
        points: [
          "Nebuchadnezzar dreams of a massive tree that is cut down by heavenly command.",
          "The tree represents royal greatness, protection, and reach. Cutting it down means judgment on pride.",
          "Eden's tree story showed humanity reaching beyond obedience. Nebuchadnezzar's tree shows kingship swollen with pride.",
          "The dream is frightening because it announces that the king's public greatness is spiritually unstable.",
          "No success is safe when the heart forgets that heaven rules.",
        ],
      },
      {
        reference: "Daniel 4:19-27",
        title: "Daniel Tells Hard Truth",
        verseCallouts: ["**27** break off your sins by practicing righteousness"],
        points: [
          "Daniel is troubled, but he interprets the dream honestly and urges the king to repent.",
          "Court advisors often flattered kings. Daniel does the harder thing: truth with concern.",
          "Nathan confronted David. Daniel confronts Nebuchadnezzar. Faithful people tell truth even upward.",
          "Daniel's emotion matters. He is not enjoying the king's coming humiliation.",
          "Truth should not be cruel, but it still must be clear.",
        ],
      },
      {
        reference: "Daniel 4:28-37",
        title: "Pride Brought Low",
        verseCallouts: ["**37** those who walk in pride he is able to humble"],
        points: [
          "Nebuchadnezzar boasts in Babylon, loses his reason, lives like a beast, and later has his understanding restored.",
          "The king learns that human glory can be stripped away instantly. Reason itself is mercy.",
          "Pharaoh was humbled through plagues. Nebuchadnezzar is humbled through personal collapse.",
          "The emotional reversal is severe. The man above everyone is brought beneath basic human dignity.",
          "Pride makes people less human. Humility is part of being restored.",
        ],
      },
    ],
    callbacks: [
      "🌳 Eden's tree and grasping beyond God's boundary.",
      "🗣️ Nathan confronting David.",
      "👑 Pharaoh humbled by God's power in Exodus.",
    ],
    emotionalWeight:
      "Daniel 4 is heavy because Daniel cares while telling hard truth. Nebuchadnezzar's fall is not a punchline. It is judgment meant to teach humility.",
    application:
      "This chapter asks where pride is making you forget dependence. God does not humble people because He is insecure. He humbles pride because pride destroys people.",
    bridge:
      "Nebuchadnezzar learns humility. Daniel 5 will show Belshazzar refusing to learn from that history.",
  },
  {
    chapter: 5,
    title: "The Writing On The Wall",
    opening:
      "Daniel 5 is a feast that turns into a funeral. Babylon celebrates with stolen holy vessels, and suddenly God's judgment writes itself onto the wall.",
    previous:
      "Nebuchadnezzar was humbled and learned that heaven rules. Belshazzar knows that story, but refuses its lesson.",
    whyMatters:
      "This chapter matters because arrogance can party beside judgment and not realize the kingdom is ending that night.",
    history:
      "Belshazzar ruled Babylon as a royal authority under Nabonidus. The chapter takes place as Babylon is near collapse. The feast is not strength; it is denial wrapped in luxury.",
    watchFor: [
      "🍷 the feast and temple vessels",
      "✍️ the hand writing on the wall",
      "😨 the king's terror",
      "🧓 Daniel as the steady older witness",
      "⚖️ numbered, weighed, divided",
    ],
    words: [
      "🏺 **Temple vessels** were sacred items from Jerusalem, not party cups.",
      "✍️ **Mene, Tekel, Parsin** means numbered, weighed, and divided.",
      "⚖️ **Weighed** means Belshazzar has been measured and found lacking.",
      "🌙 **That night** gives the chapter its chilling finality.",
    ],
    sections: [
      {
        reference: "Daniel 5:1-12",
        title: "A Holy Mockery",
        verseCallouts: ["**4** They drank wine and praised the gods of gold and silver"],
        points: [
          "Belshazzar throws a feast and uses the temple vessels while praising idols.",
          "This is not only bad manners. It is holy defiance, using what belonged to God's temple for idolatrous celebration.",
          "The Philistines once put the ark near Dagon and learned God would not be mocked. Belshazzar repeats that kind of arrogance.",
          "The party feels confident until the hand appears. The whole room changes instantly.",
          "Treating holy things casually is spiritually dangerous. God is patient, but He is not mocked.",
        ],
      },
      {
        reference: "Daniel 5:13-24",
        title: "Daniel Refuses Flattery",
        verseCallouts: ["**22** you... have not humbled your heart, though you knew all this"],
        points: [
          "Daniel is called in and refuses the king's gifts before interpreting the writing.",
          "Daniel is older now. He has watched kings rise and fall, and he is not impressed by a dying empire's rewards.",
          "Moses refused Egypt's treasures by faith. Daniel refuses Babylon's glitter because truth matters more.",
          "The emotional strength here is steadiness. Daniel is calm in a room full of panic.",
          "A faithful life makes you less purchasable. Daniel can tell the truth because he is not hungry for Belshazzar's approval.",
        ],
      },
      {
        reference: "Daniel 5:25-31",
        title: "Numbered, Weighed, Divided",
        verseCallouts: ["**27** you have been weighed in the balances and found wanting"],
        points: [
          "Daniel interprets the writing: Belshazzar's kingdom is numbered, he is weighed and lacking, and the kingdom will be divided.",
          "The message is legal and final. The king's life and kingdom are being evaluated by God.",
          "Every human kingdom is temporary. Daniel 2 already showed empires falling, and Daniel 5 shows Babylon's fall in one night.",
          "The ending is chilling. The party ends, the king dies, and another empire takes power.",
          "Do not confuse delay with escape. Belshazzar had time to learn humility, but he wasted it.",
        ],
      },
    ],
    callbacks: [
      "🏺 The ark before Dagon in 1 Samuel.",
      "💰 Moses refusing Egypt's treasures in Hebrews 11.",
      "🪨 Daniel 2's message that empires fall.",
    ],
    emotionalWeight:
      "Daniel 5 feels like a room sobering up too late. The king is terrified, Daniel is steady, and judgment arrives with awful clarity.",
    application:
      "This chapter asks whether you are learning from what God has already shown you. Belshazzar's problem was not ignorance only. It was pride against what he knew.",
    bridge:
      "Babylon falls and Medo-Persia rises. Daniel 6 will show Daniel serving faithfully under another empire with the same unwavering prayer life.",
  },
  {
    chapter: 6,
    title: "Prayer Above Survival",
    opening:
      "Daniel 6 is famous for the lions' den, but the real center of the chapter is Daniel's prayer life.",
    previous:
      "Babylon has fallen. Daniel now serves under Darius, and his integrity still stands out in another empire.",
    whyMatters:
      "This chapter matters because the crisis does not create Daniel's faithfulness. It reveals a rhythm he already had.",
    history:
      "Persian administration used satraps and high officials to govern provinces. Daniel's excellence made him useful, but also made him a target for jealous political rivals.",
    watchFor: [
      "📈 Daniel's excellent spirit",
      "🕵️ enemies searching for corruption",
      "📜 a prayer ban designed as a trap",
      "🪟 Daniel praying with windows open toward Jerusalem",
      "🦁 God shutting the lions' mouths",
    ],
    words: [
      "📈 **Excellent spirit** describes Daniel's noticeable integrity and wisdom.",
      "📜 **Law of the Medes and Persians** points to an unchangeable decree.",
      "🪟 **Toward Jerusalem** shows Daniel praying with memory, covenant, and hope.",
      "🦁 **Lions' den** is the public death sentence God turns into testimony.",
    ],
    sections: [
      {
        reference: "Daniel 6:1-9",
        title: "They Could Find No Corruption",
        verseCallouts: ["**4** they could find no ground for complaint or any fault"],
        points: [
          "Daniel is so trustworthy that his enemies cannot find corruption, so they target his faith.",
          "Public officials were often vulnerable to bribery or negligence. Daniel's integrity makes him unusual.",
          "Joseph was trusted over Potiphar's house and the prison. Daniel carries that same trustworthy spirit.",
          "The jealousy is ugly. They do not hate Daniel because he is corrupt. They hate him because he is excellent.",
          "Live so faithfully that if people want to accuse you, they have to make your devotion to God the issue.",
        ],
      },
      {
        reference: "Daniel 6:10-18",
        title: "As He Had Done Before",
        verseCallouts: ["**10** he got down on his knees three times a day and prayed... as he had done previously"],
        points: [
          "Daniel hears the decree and keeps praying as before. He does not perform rebellion; he continues devotion.",
          "Prayer toward Jerusalem connected Daniel to Solomon's temple prayer and covenant hope in exile.",
          "Solomon prayed that exiles who turned toward the land and prayed would be heard. Daniel is living that theology.",
          "This is steady courage. Daniel does not scramble to invent faith in the emergency.",
          "Your crisis habits usually come from your normal habits. Build rhythms now that can hold under pressure later.",
        ],
      },
      {
        reference: "Daniel 6:19-28",
        title: "God Shut The Lions' Mouths",
        verseCallouts: ["**22** My God sent his angel and shut the lions' mouths"],
        points: [
          "Daniel survives the den because God sends His angel. Darius rejoices and honors Daniel's God.",
          "The den was meant to prove the king's law was final. Instead, it proves God's authority is higher.",
          "The sealed stone over the den makes Christian readers think forward to another sealed place of death that God overrules.",
          "The emotional turn from night to morning is powerful. The king cannot sleep, but Daniel lives.",
          "God can meet His people in the pit, the furnace, the den, and the tomb. No place of death outranks Him.",
        ],
      },
    ],
    callbacks: [
      "🏠 Joseph's trustworthy administration.",
      "🙏 Solomon's prayer for exiles in 1 Kings 8.",
      "🪨 Sealed death spaces that God overrules.",
    ],
    emotionalWeight:
      "Daniel 6 is dramatic because the danger is real, but it is also peaceful because Daniel's inner life is already anchored.",
    application:
      "This chapter asks what you are practicing before the pressure comes. Daniel's public courage was built by private prayer.",
    bridge:
      "The court stories have shown Daniel's steady faith. Daniel 7 opens the vision section and lifts our eyes from earthly kings to heaven's throne.",
  },
  {
    chapter: 7,
    title: "Beasts, Thrones, and the Son of Man",
    opening:
      "Daniel 7 changes the atmosphere. The book shifts from court stories into apocalyptic vision, and the imagery becomes wild on purpose.",
    previous:
      "Daniel has survived pressure under kings. Now God shows him that the kingdoms of the world are beastly compared to heaven's throne.",
    whyMatters:
      "This chapter matters because it gives one of the Bible's clearest visions of the Son of Man receiving everlasting dominion.",
    history:
      "Apocalyptic visions use symbols to reveal spiritual realities behind history. Beasts, horns, thrones, books, and clouds are not random weirdness. They communicate power, judgment, and kingdom hope.",
    watchFor: [
      "🌊 beasts rising from the sea",
      "🦁 animal-like kingdoms",
      "⚖️ the Ancient of Days seated in judgment",
      "☁️ one like a Son of Man coming with the clouds",
      "👑 everlasting dominion",
    ],
    words: [
      "🌊 **Sea** often represents chaos and restless nations.",
      "🐉 **Beasts** picture kingdoms as violent and inhuman.",
      "⚖️ **Ancient of Days** reveals God's eternal authority and judgment.",
      "☁️ **Son of Man** becomes one of the most important titles Jesus uses for Himself.",
    ],
    sections: [
      {
        reference: "Daniel 7:1-8",
        title: "Kingdoms Like Beasts",
        verseCallouts: ["**3** four great beasts came up out of the sea"],
        points: [
          "Daniel sees four beasts rise from the sea, each representing violent kingdoms.",
          "The imagery is intentionally unsettling. Human empires may look glorious from inside the palace, but heaven sees their beastliness.",
          "Daniel 2 showed kingdoms as a statue. Daniel 7 shows them as beasts. Same reality, different angle.",
          "Daniel is troubled because he is seeing history as spiritual danger, not just politics.",
          "The world can dress power in gold, but God sees what power becomes when it devours people.",
        ],
      },
      {
        reference: "Daniel 7:9-12",
        title: "The Ancient of Days Sits",
        verseCallouts: ["**9** the Ancient of Days took his seat"],
        points: [
          "Heaven's court is seated, books are opened, and the beasts are judged.",
          "Ancient court imagery shows God as judge above all earthly courts.",
          "Esther showed hidden providence in a Persian court. Daniel now sees the heavenly court above every empire.",
          "The emotional shift is awe. The beasts are terrifying, but the throne is greater.",
          "Courage grows when you remember that history is not judged by the beast. It is judged by God.",
        ],
      },
      {
        reference: "Daniel 7:13-28",
        title: "The Son of Man Receives The Kingdom",
        verseCallouts: ["**14** his dominion is an everlasting dominion"],
        points: [
          "One like a Son of Man comes with the clouds and receives dominion, glory, and an everlasting kingdom.",
          "Cloud-riding language belongs to divine authority. This figure is human-like and yet receives universal worship and rule.",
          "Jesus uses Son of Man for Himself, drawing from Daniel's vision of kingdom authority.",
          "Daniel is alarmed, but the ending is hope: the saints receive the kingdom.",
          "The future does not belong to beastly power. It belongs to God's appointed King.",
        ],
      },
    ],
    callbacks: [
      "🗿 Daniel 2's statue and kingdoms.",
      "🏛️ Esther's earthly court contrasted with heaven's court.",
      "☁️ Jesus calling Himself Son of Man in the Gospels.",
    ],
    emotionalWeight:
      "Daniel 7 is frightening and hopeful at the same time. The beasts are real, but they are not final.",
    application:
      "This chapter asks what vision of power shapes your courage. If you only see beasts, fear wins. If you see the throne, endurance becomes possible.",
    bridge:
      "Daniel has seen the large sweep of kingdoms. Daniel 8 will sharpen the vision with the ram, goat, and fierce opposition to God's people.",
  },
  {
    chapter: 8,
    title: "The Ram, The Goat, and The Heavy Vision",
    opening:
      "Daniel 8 keeps the vision language moving, but now the symbols become more specific and the emotional weight hits Daniel's body.",
    previous:
      "Daniel 7 showed beastly kingdoms and heaven's final throne. Daniel 8 narrows into coming conflicts involving Media-Persia, Greece, and a fierce ruler.",
    whyMatters:
      "This chapter matters because Daniel learns that God's people will face future pressure, desecration, and suffering, but the vision is still under God's limits.",
    history:
      "The ram is identified with Media-Persia, and the goat with Greece. Later history connects much of this imagery to Alexander's rise and the later oppression connected to Antiochus IV Epiphanes.",
    watchFor: [
      "🐏 the ram with two horns",
      "🐐 the goat from the west",
      "📉 the great horn breaking",
      "⛪ the sanctuary being attacked",
      "😓 Daniel being overcome by the vision",
    ],
    words: [
      "🐏 **Ram** is identified as Media-Persia.",
      "🐐 **Goat** is identified as Greece.",
      "📯 **Horn** symbolizes kingly power.",
      "⛪ **Sanctuary** matters because worship itself becomes a target.",
    ],
    sections: [
      {
        reference: "Daniel 8:1-14",
        title: "Power Fighting Power",
        verseCallouts: ["**8** the goat became exceedingly great, but when he was strong, the great horn was broken"],
        points: [
          "Daniel sees a ram, then a goat that defeats it. The goat's great horn breaks, and other horns rise.",
          "The vision shows kingdoms colliding. History is not calm; power keeps challenging power.",
          "Daniel 2 and 7 already showed kingdom succession. Daniel 8 adds sharper detail.",
          "The scene feels exhausting because human power is restless and violent.",
          "Do not build your hope on which empire looks strong today. The strong horn can break suddenly.",
        ],
      },
      {
        reference: "Daniel 8:15-26",
        title: "Gabriel Explains The Vision",
        verseCallouts: ["**16** Gabriel, make this man understand the vision"],
        points: [
          "Gabriel explains that the vision concerns future kingdoms and a fierce king who opposes God's people.",
          "Angel-mediated interpretation reminds us Daniel is dealing with revelation, not human speculation.",
          "Zechariah and Revelation also use angelic interpretation to help God's people understand visions.",
          "Daniel needs help because the vision is too much to process alone.",
          "Some truths require humility. Daniel receives understanding because God gives it, not because he masters it.",
        ],
      },
      {
        reference: "Daniel 8:27",
        title: "Daniel Is Overcome",
        verseCallouts: ["**27** I, Daniel, was overcome and lay sick for some days"],
        points: [
          "Daniel is physically affected by the vision and then returns to the king's business while still appalled.",
          "Prophetic revelation is not entertainment. It can be heavy to carry.",
          "Jeremiah also carried the emotional weight of messages about judgment and suffering.",
          "Daniel is faithful, but he is shaken. That honesty matters.",
          "Spiritual maturity does not mean hard things stop affecting you. It means you keep serving God truthfully while carrying them.",
        ],
      },
    ],
    callbacks: [
      "🗿 Daniel 2 and the succession of kingdoms.",
      "👼 Zechariah and Revelation using interpreting angels.",
      "😭 Jeremiah carrying the burden of judgment messages.",
    ],
    emotionalWeight:
      "Daniel 8 is heavy because it shows the cost of seeing clearly. Daniel is not curious in a detached way. He is overwhelmed.",
    application:
      "This chapter teaches that courage includes the willingness to face hard truth without letting it turn into despair.",
    bridge:
      "Daniel has seen future trouble. Daniel 9 will show him turning to Scripture, confession, and prayer.",
  },
  {
    chapter: 9,
    title: "The Prayer That Reached Heaven",
    opening:
      "Daniel 9 is one of the deepest prayer chapters in Scripture. Daniel reads Jeremiah, understands the exile timeline, and turns to God with confession.",
    previous:
      "Daniel has been shaken by visions of future conflict. Now he anchors himself in the written word of God.",
    whyMatters:
      "This chapter matters because Daniel responds to prophecy with prayer, not passive speculation.",
    history:
      "Jeremiah prophesied seventy years for Babylonian exile. Daniel is reading Scripture from inside the exile, realizing God's word is shaping the moment he is living in.",
    watchFor: [
      "📖 Daniel studying Jeremiah",
      "🙏 confession with fasting, sackcloth, and ashes",
      "🤲 Daniel saying we have sinned",
      "👼 Gabriel coming while Daniel is praying",
      "⏳ the seventy weeks prophecy",
    ],
    words: [
      "📖 **Books** means Daniel is studying Scripture, likely Jeremiah's writings.",
      "🧵 **Sackcloth and ashes** show humility, grief, and repentance.",
      "🤲 **Confession** means Daniel identifies with his people's sin before God.",
      "⏳ **Seventy weeks** points to a larger prophetic timeline reaching toward Messiah and restoration.",
    ],
    sections: [
      {
        reference: "Daniel 9:1-3",
        title: "Scripture Moves Daniel To Prayer",
        verseCallouts: ["**2** I, Daniel, perceived in the books the number of years"],
        points: [
          "Daniel reads Jeremiah and understands that the exile's seventy years are significant.",
          "He does not treat prophecy like trivia. He turns his face to the Lord in prayer and fasting.",
          "Josiah also responded to recovered Scripture with humility. God's word is meant to move people.",
          "Daniel is old, experienced, and gifted, but still submitted to Scripture.",
          "The Bible should not only inform us. It should turn us toward God.",
        ],
      },
      {
        reference: "Daniel 9:4-19",
        title: "We Have Sinned",
        verseCallouts: ["**5** we have sinned and done wrong and acted wickedly"],
        points: [
          "Daniel confesses the sins of Israel, appeals to God's mercy, and asks for restoration.",
          "Corporate confession mattered because exile was a covenant issue involving the whole people.",
          "Nehemiah later prays similarly, confessing Israel's sin while seeking restoration.",
          "Daniel's humility is striking. He is personally righteous, but he says we, not they.",
          "Mature prayer does not only blame others. It stands honestly before God and appeals to mercy.",
        ],
      },
      {
        reference: "Daniel 9:20-27",
        title: "Gabriel Comes With Understanding",
        verseCallouts: ["**23** At the beginning of your pleas for mercy a word went out"],
        points: [
          "Gabriel arrives while Daniel is still praying and gives the seventy weeks prophecy.",
          "The message stretches beyond immediate exile toward Jerusalem, atonement, an anointed one, and future trouble.",
          "The New Testament's Messiah hope connects deeply with Daniel's timeline and kingdom visions.",
          "Daniel's prayer reaches heaven immediately, even though the answer contains mysteries bigger than him.",
          "God hears humble prayer before we see the full answer arrive.",
        ],
      },
    ],
    callbacks: [
      "📖 Jeremiah's seventy-year prophecy.",
      "📜 Josiah humbled by Scripture.",
      "🙏 Nehemiah's confession prayer.",
    ],
    emotionalWeight:
      "Daniel 9 feels tender because Daniel is not performing prayer. He is grieved, humbled, and appealing to God's mercy for a broken people.",
    application:
      "This chapter asks whether Scripture leads you into prayer. If the word opens your eyes, let it also open your mouth before God.",
    bridge:
      "Daniel has learned that heaven hears. Daniel 10 will show that answers can be heard immediately and still involve unseen battle.",
  },
  {
    chapter: 10,
    title: "The Battle You Cannot See",
    opening:
      "Daniel 10 pulls back the curtain on spiritual conflict. Daniel mourns, fasts, sees a glorious messenger, and learns that unseen resistance is real.",
    previous:
      "Daniel 9 showed prayer reaching heaven. Daniel 10 shows that the unseen world is not empty while Daniel waits.",
    whyMatters:
      "This chapter matters because delay does not mean God ignored Daniel. From the first day, his words were heard.",
    history:
      "Daniel is now in the Persian period. Some Jews have begun returning, but the future remains contested. The vision comes in the context of mourning, partial restoration, and ongoing spiritual conflict.",
    watchFor: [
      "😔 Daniel mourning for three weeks",
      "✨ the overwhelming glorious messenger",
      "💪 Daniel losing strength and being strengthened",
      "⚔️ the prince of Persia resisting",
      "🛡️ Michael helping in unseen battle",
    ],
    words: [
      "😔 **Mourning three weeks** shows Daniel's prayer life is sustained and costly.",
      "✨ **Linen and blazing appearance** signal heavenly glory and authority.",
      "⚔️ **Prince of Persia** points to spiritual power behind earthly kingdoms.",
      "🛡️ **Michael** is a chief prince associated with protection of God's people.",
    ],
    sections: [
      {
        reference: "Daniel 10:1-9",
        title: "Daniel Is Overwhelmed",
        verseCallouts: ["**8** no strength was left in me"],
        points: [
          "Daniel mourns for three weeks and sees a glorious figure that drains his strength.",
          "Encountering heavenly glory is not casual. Daniel's body reacts with weakness and trembling.",
          "Isaiah said woe is me when he saw the Lord's holiness. Revelation shows John falling like dead before Christ.",
          "Daniel is not bored by spiritual reality. He is overwhelmed by it.",
          "A real encounter with God's holiness and heavenly power humbles the body and the heart.",
        ],
      },
      {
        reference: "Daniel 10:10-14",
        title: "Heard From The First Day",
        verseCallouts: ["**12** from the first day... your words have been heard"],
        points: [
          "The messenger tells Daniel his words were heard from the first day, but spiritual resistance delayed the arrival.",
          "This is one of Scripture's clearest glimpses that prayer participates in unseen realities.",
          "Elisha's servant saw the unseen armies of God when his eyes were opened. Daniel hears about unseen conflict.",
          "The emotional encouragement is huge. Daniel was not ignored during the waiting.",
          "Delay is not proof of abandonment. Heaven may be moving in ways you cannot see yet.",
        ],
      },
      {
        reference: "Daniel 10:15-21",
        title: "Strengthened To Receive More",
        verseCallouts: ["**19** Peace be with you; be strong and of good courage"],
        points: [
          "Daniel is touched, strengthened, and prepared to hear more about what is written in the book of truth.",
          "God does not merely overwhelm Daniel. He strengthens him for what he has to receive.",
          "Elijah was strengthened for the journey with food from God. Daniel is strengthened for revelation.",
          "Daniel needs courage to keep listening because the message ahead is heavy.",
          "God gives strength for the word He calls you to carry.",
        ],
      },
    ],
    callbacks: [
      "🔥 Isaiah's temple vision.",
      "👀 Elisha's servant seeing unseen armies.",
      "🍞 Elijah strengthened for the journey.",
    ],
    emotionalWeight:
      "Daniel 10 is intimate and intense. Daniel is weak, touched, strengthened, and told that his prayers mattered from the first day.",
    application:
      "This chapter teaches us to keep praying when the answer feels delayed. The unseen world is more active than our visible timeline suggests.",
    bridge:
      "Daniel is strengthened to receive the message. Daniel 11 will unfold a long, difficult vision of coming conflict.",
  },
  {
    chapter: 11,
    title: "Kings, Conflict, and Endurance",
    opening:
      "Daniel 11 is dense because history under broken power is dense. Kings rise, betray, fight, flatter, invade, and oppress.",
    previous:
      "Daniel has been strengthened by the messenger in chapter 10. Now he receives a detailed vision of conflicts still ahead.",
    whyMatters:
      "This chapter matters because courage is not built on pretending the future will be easy. God tells Daniel hard truth without surrendering control.",
    history:
      "Much of Daniel 11 maps conflicts after Persia, especially struggles involving Greek successor kingdoms after Alexander. The kings of the north and south point to rival powers around the land of Israel.",
    watchFor: [
      "👑 kings rising and falling",
      "🧭 north and south power struggles",
      "🎭 deceit and flattery",
      "⛪ covenant people under pressure",
      "🧠 the wise instructing many",
    ],
    words: [
      "🧭 **King of the north/south** refers to rival regional powers in relation to Israel's land.",
      "🎭 **Flattery** is manipulation used by wicked power.",
      "⛪ **Covenant** shows the conflict is spiritual, not merely political.",
      "🧠 **The wise** are faithful people who give understanding under pressure.",
    ],
    sections: [
      {
        reference: "Daniel 11:1-20",
        title: "History Keeps Turning",
        verseCallouts: ["**4** his kingdom shall be broken and divided toward the four winds"],
        points: [
          "The vision traces kings, alliances, marriages, betrayals, and shifting power.",
          "Ancient politics often used marriage, war, tribute, and assassination to secure influence.",
          "Genesis, Kings, and Chronicles all show that human power is unstable when disconnected from God.",
          "The chapter can feel exhausting because empire is exhausting.",
          "God's detailed knowledge of history should steady us. Chaos is not confusing to Him.",
        ],
      },
      {
        reference: "Daniel 11:21-35",
        title: "Pressure Against The Covenant",
        verseCallouts: ["**32** the people who know their God shall stand firm and take action"],
        points: [
          "A contemptible ruler uses deceit, profanes worship, and pressures God's people.",
          "The attack is not only political. It reaches covenant loyalty, worship, and holiness.",
          "Daniel 3 already showed public pressure to compromise worship. Daniel 11 shows pressure continuing through history.",
          "The faithful suffer, but the wise instruct many. Courage becomes teaching under fire.",
          "Knowing God is not abstract. In pressure, those who know Him stand firm and act.",
        ],
      },
      {
        reference: "Daniel 11:36-45",
        title: "The Proud King Does Not Last",
        verseCallouts: ["**45** he shall come to his end, with none to help him"],
        points: [
          "A self-exalting king magnifies himself, but the chapter ends with his collapse.",
          "Self-deifying rulers appear strong until God draws the line.",
          "Nebuchadnezzar learned humility; Belshazzar refused it. Daniel 11 shows pride rising again and ending again.",
          "The emotional burden is that arrogant power can do real damage before it falls.",
          "Do not worship what God has already judged. Proud power does not get the last word.",
        ],
      },
    ],
    callbacks: [
      "📜 Kings and Chronicles showing unstable power.",
      "🗿 Daniel 3's worship pressure.",
      "📉 Nebuchadnezzar and Belshazzar as pride warnings.",
    ],
    emotionalWeight:
      "Daniel 11 feels tiring because the future shown to Daniel is not simple. Faithfulness will require endurance through waves of conflict.",
    application:
      "This chapter teaches us not to build courage on easy predictions. Build courage on God's rule over hard realities.",
    bridge:
      "Daniel has seen conflict and pressure. Daniel 12 will lift the story to final deliverance, resurrection, and Daniel's promised rest.",
  },
  {
    chapter: 12,
    title: "Resurrection, Wisdom, and Rest",
    opening:
      "Daniel 12 closes with trouble, deliverance, resurrection, shining wisdom, sealed words, waiting, and rest.",
    previous:
      "Daniel 11 showed waves of conflict and proud power. Daniel 12 answers with final hope beyond death itself.",
    whyMatters:
      "This chapter matters because Daniel's courage is anchored in more than survival. It is anchored in resurrection and final inheritance.",
    history:
      "Old Testament resurrection hope becomes especially clear here. Daniel is given a vision that stretches beyond exile, beyond kingdoms, and beyond death.",
    watchFor: [
      "🛡️ Michael standing for Daniel's people",
      "📖 names written in the book",
      "🌅 resurrection from the dust",
      "✨ the wise shining like stars",
      "🕊️ Daniel told to rest and wait for his lot",
    ],
    words: [
      "📖 **Book** points to God's knowledge and preservation of His people.",
      "🌅 **Awake** is resurrection language.",
      "✨ **Shine like stars** describes the future glory of the wise.",
      "🕊️ **Rest and stand in your lot** gives Daniel personal hope beyond death.",
    ],
    sections: [
      {
        reference: "Daniel 12:1-4",
        title: "Trouble, Deliverance, and Resurrection",
        verseCallouts: ["**2** many of those who sleep in the dust of the earth shall awake"],
        points: [
          "A time of trouble is announced, but deliverance and resurrection are promised for God's people.",
          "Sleeping in dust is death language. Awakening from dust is resurrection hope.",
          "Genesis says humans return to dust. Daniel says God can wake sleepers from it.",
          "The emotional lift is enormous. The story does not end with exile, beasts, kings, or graves.",
          "Courage changes when death is not the final word.",
        ],
      },
      {
        reference: "Daniel 12:5-12",
        title: "Waiting With Limited Understanding",
        verseCallouts: ["**8** I heard, but I did not understand"],
        points: [
          "Daniel hears more about timing but admits he does not fully understand.",
          "Even prophets receive limits. Revelation is real, but exhaustive mastery is not given.",
          "The disciples also ask timing questions Jesus does not fully answer in Acts 1.",
          "Daniel's humility matters. He does not pretend to know more than he knows.",
          "Faithfulness does not require understanding every detail. It requires trusting the God who does.",
        ],
      },
      {
        reference: "Daniel 12:13",
        title: "Go Your Way",
        verseCallouts: ["**13** you shall rest and shall stand in your allotted place at the end of the days"],
        points: [
          "Daniel is told to go his way, rest, and stand in his lot at the end.",
          "This is personal assurance after a lifetime of exile, service, prayer, visions, and pressure.",
          "Abraham died looking for promises still ahead. Daniel also receives hope beyond his lifetime.",
          "The ending feels tender. God does not only rule history. He remembers Daniel.",
          "After all the courage, the final word is rest. God holds His servants beyond the work they do.",
        ],
      },
    ],
    callbacks: [
      "🌱 Genesis dust and the hope of resurrection.",
      "⏳ Acts 1 and limited timing knowledge.",
      "🕊️ Abraham dying in faith before seeing everything fulfilled.",
    ],
    emotionalWeight:
      "Daniel 12 feels like a deep exhale. There is still mystery, but there is also resurrection, reward, and personal rest.",
    application:
      "This chapter teaches that courage is strongest when anchored beyond this life. Daniel can go his way because God holds the end.",
    bridge:
      "Daniel's journey ends with hope. His life teaches us that steady faithfulness in exile is worth it because God's kingdom, resurrection, and final rest are real.",
  },
];

export const COURAGE_OF_DANIEL_CHAPTERS = DANIEL_NOTES.map(({ chapter, title }) => ({
  chapter,
  title,
}));

export const COURAGE_OF_DANIEL_DEEP_NOTES = DANIEL_NOTES.map(renderNote);
