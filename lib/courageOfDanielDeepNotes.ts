import { DANIEL_KJV_VERSES } from "./danielKjvVerses";

type DanielSection = {
  range: string;
  title: string;
  verses: string[];
  notes: string[];
};

type DanielChapterNote = {
  chapter: number;
  title: string;
  hook: string;
  setup: string[];
  matters: string[];
  sections: DanielSection[];
  takeaways: string[];
  carry: string[];
  lesson: string;
};

function getVerseText(chapter: number, verse: number) {
  return DANIEL_KJV_VERSES[chapter]?.find((item) => item.verse === verse)?.text || "";
}

function verseList(chapter: number, verses: number[]) {
  return verses
    .map((verse) => `> **${verse}** ${getVerseText(chapter, verse)}`.trim())
    .join("\n\n");
}

function buildSection(chapter: number, section: DanielSection) {
  return `## ${section.range}\n\n# ${section.title}\n\n${verseList(chapter, section.verses.map(Number))}\n\n${section.notes.join("\n\n")}`;
}

function buildDanielNotes(chapter: DanielChapterNote) {
  return `# Daniel ${chapter.chapter}\n\n# ${chapter.title}\n\n${chapter.hook}\n\n${chapter.setup.join("\n\n")}\n\n## Why Daniel ${chapter.chapter} Matters\n\n${chapter.matters.map((item) => `* ${item}`).join("\n\n")}\n\n## Chapter Flow\n\n${chapter.sections.map((section) => `* 📍 ${section.title}`).join("\n\n")}\n\n# Deep Chapter Notes\n\n${chapter.sections.map((section) => buildSection(chapter.chapter, section)).join("\n\n")}\n\n# Final Thought on Daniel ${chapter.chapter}\n\n${chapter.takeaways.map((item) => `* ${item}`).join("\n\n")}\n\n# Pause and Reflect\n\n${chapter.carry.map((item) => `* ${item}`).join("\n\n")}\n\n# The Big Lesson of Daniel ${chapter.chapter}\n\n${chapter.lesson}`;
}

const danielNotes: DanielChapterNote[] = [
  {
    chapter: 1,
    title: "Faithfulness in a New World",
    hook: "Daniel 1 begins with a teenager losing the world he knew.",
    setup: [
      "Jerusalem has fallen under Babylon's shadow. Daniel and his friends are taken from Judah into the king's world, where Babylon tries to reshape their language, learning, food, names, and future.",
      "This chapter is not mainly about a diet. It is about identity pressure. Babylon wants Daniel to become useful to the empire without staying loyal to the God of Israel.",
      "Daniel's courage starts quietly. Before lions, flames, kings, and visions, there is a private decision: he will not let Babylon decide what faithfulness means.",
    ],
    matters: [
      "🏛️ Babylon tries to retrain the minds of young exiles.",
      "🧠 Daniel learns wisdom without surrendering worship.",
      "🍽️ The king's food becomes a test of loyalty and conscience.",
      "🙏 God gives favor, knowledge, skill, and understanding.",
      "🔥 Courage begins with small obedience before it becomes public bravery.",
    ],
    sections: [
      {
        range: "Daniel 1:1 to 2",
        title: "Jerusalem Falls, But God Is Still Ruling",
        verses: ["1", "2"],
        notes: [
          "The chapter opens during the reign of Jehoiakim king of Judah. Nebuchadnezzar king of Babylon comes against Jerusalem, and the city is placed under pressure.",
          "For ancient readers, this is heartbreaking. Jerusalem was not just any city. It was the place connected to the temple, the worship of the Lord, and the promises given to David. When Babylon enters the story, it feels like everything sacred is being threatened.",
          "Verse 2 is one of the most important lines in the chapter: the Lord gave Jehoiakim into Nebuchadnezzar's hand. Babylon is powerful, but Babylon is not ultimate. The empire acts, but God still rules over the story.",
          "The vessels from the house of God are taken into the treasure house of Babylon's god. That detail is spiritual warfare in picture form. Babylon wants the world to think its gods defeated Israel's God. Daniel's whole life will prove that is not true.",
          "This means Daniel's story begins in loss, but not in God's absence. Sometimes the setting looks like defeat while God is preparing a witness inside the very place that looks victorious.",
        ],
      },
      {
        range: "Daniel 1:3 to 7",
        title: "Babylon Tries to Rewrite Identity",
        verses: ["3", "4", "5", "6", "7"],
        notes: [
          "Nebuchadnezzar orders young men from Judah to be selected for royal training. These are not random prisoners. They are chosen because they are gifted, teachable, healthy, and able to stand in the king's palace.",
          "The phrase about learning the tongue of the Chaldeans means they are being taught Babylon's language, literature, worldview, and court culture. Babylon is not only relocating their bodies. Babylon is trying to retrain their minds.",
          "This matters because exile is not only about being far from home. Exile is being surrounded by a system that says, 'Think like us. Speak like us. Eat like us. Serve like us. Forget who you were.'",
          "The king appoints food and wine from his own table. In the ancient world, eating royal food could mean more than nutrition. It could show dependence on the king, participation in palace life, and possible connection to food offered in idol-centered culture.",
          "Then the names change. Daniel means something like God is my judge. Hananiah, Mishael, and Azariah also carry God-centered meanings. Their Babylonian names point toward Babylon's gods and culture.",
          "Do not miss the pressure here.",
          "🧠 New education",
          "🗣️ New language",
          "🍽️ New table",
          "🏷️ New names",
          "🏛️ New future",
          "Babylon is trying to rename them before it uses them. That is still how pressure works. The world often tries to rename people before it redirects them.",
        ],
      },
      {
        range: "Daniel 1:8 to 16",
        title: "Daniel Draws a Quiet Line",
        verses: ["8", "9", "10", "11", "12", "13", "14", "15", "16"],
        notes: [
          "Verse 8 says Daniel purposed in his heart. That is the center of the chapter. The word means he resolved, decided, set his inner direction. Courage begins before anyone sees it.",
          "Daniel does not refuse everything Babylon offers. He learns the language. He receives training. He serves in the court. But he knows where the line is. Faithfulness is not always refusing every contact with culture. It is knowing what must not own your conscience.",
          "The word defile means to make unclean or polluted. Daniel believes the king's food would cross a spiritual line for him. The text does not explain every detail, but it shows Daniel treating holiness seriously in a place where compromise would be easy.",
          "Notice Daniel's tone. He does not act arrogant. He requests. He speaks with wisdom. That matters. Courage does not have to be rude to be real.",
          "God gives Daniel favor with the prince of the eunuchs. The word eunuch can refer to a royal official, often a man serving closely in palace administration. Daniel is under authority, and that authority is afraid. If the boys look weak, the official could lose his life.",
          "Daniel proposes a ten-day test with pulse and water. Pulse means vegetables, grains, or simple plant food. This is not a magic diet plan. It is a faith test inside a dangerous court system.",
          "At the end of the ten days, Daniel and his friends look healthier than the others. The point is not that vegetables are always better than royal food. The point is that God honors their loyalty in a place where loyalty is costly.",
          "This is Bible Buddy Daniel at ground level: faith under pressure, wisdom under authority, and obedience without drama.",
        ],
      },
      {
        range: "Daniel 1:17 to 21",
        title: "God Gives What Babylon Cannot Manufacture",
        verses: ["17", "18", "19", "20", "21"],
        notes: [
          "Verse 17 shifts the focus from Daniel's discipline to God's gift. God gives knowledge, skill, wisdom, and Daniel receives understanding in visions and dreams.",
          "Babylon can educate. Babylon can train. Babylon can rename. But Babylon cannot give what God gives.",
          "When the young men stand before Nebuchadnezzar, they are found ten times better than the magicians and astrologers in the realm. Magicians and astrologers were court wise men who claimed access to hidden knowledge through spiritual systems, omens, and interpretation.",
          "Daniel and his friends are not better because they became more Babylonian. They are better because God was with them in Babylon.",
          "Verse 21 says Daniel continued even unto the first year of Cyrus. That means Daniel outlasts kings and kingdoms. The teenager taken from Jerusalem becomes an old man still standing when Babylon's power gives way to Persia.",
          "That is the quiet victory of Daniel 1. Babylon can carry Daniel away, but it cannot erase him. The empire changes his location, but God preserves his witness.",
        ],
      },
    ],
    takeaways: [
      "Daniel's courage begins with identity, not public applause.",
      "Babylon's pressure is deep because it tries to shape mind, appetite, name, and future.",
      "God can give favor inside a hostile system without Daniel surrendering to that system.",
      "Small obedience prepares the heart for bigger tests later.",
    ],
    carry: [
      "Carry forward Daniel's resolved heart.",
      "Carry forward the pressure of new names and new systems.",
      "Carry forward the truth that God is still ruling even when Jerusalem falls.",
    ],
    lesson:
      "Daniel 1 teaches that courage starts when a person quietly decides who they belong to. Before Daniel stands before kings, he purposes in his heart.",
  },
  {
    chapter: 2,
    title: "The God Who Reveals Secrets",
    hook: "Daniel 2 begins with a king who cannot sleep and a kingdom full of wise men who cannot save themselves.",
    setup: [
      "Nebuchadnezzar has a troubling dream. He demands not only the interpretation, but the dream itself. This exposes the limits of Babylon's wisdom.",
      "Daniel is caught in a death sentence he did not create. His response shows the shape of mature courage: wisdom, prayer, community, worship, and truth spoken humbly.",
    ],
    matters: [
      "😴 The king's dream shakes the palace.",
      "⚔️ Babylon's wisdom system cannot answer the impossible.",
      "🙏 Daniel gathers his friends to seek mercy from God.",
      "🌙 God reveals the mystery in the night.",
      "🪨 The dream shows human kingdoms falling before God's kingdom.",
    ],
    sections: [
      {
        range: "Daniel 2:1 to 13",
        title: "The Impossible Demand",
        verses: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
        notes: [
          "Nebuchadnezzar's spirit is troubled. The most powerful man in the room is not at peace. That matters because Daniel keeps showing us that kings can command armies and still be helpless inside.",
          "The king calls magicians, astrologers, sorcerers, and Chaldeans. These were Babylon's expert spiritual advisers. They represented the best hidden knowledge the empire claimed to have.",
          "But Nebuchadnezzar demands that they tell him the dream and the interpretation. He does not want a vague explanation after feeding them the details. He wants proof that they have real access to the secret.",
          "Their answer is honest: no man on earth can do this. That line is the doorway for Daniel's God to be revealed. Babylon's experts finally admit the limit of human power.",
          "The king's anger becomes deadly. The decree goes out to destroy the wise men, including Daniel and his friends. Daniel is now in danger because of a crisis he did not cause.",
          "That is important for real life. Sometimes faithfulness is tested by situations we did not create. Daniel does not waste the moment complaining that it is unfair. He moves with wisdom.",
        ],
      },
      {
        range: "Daniel 2:14 to 23",
        title: "Daniel Prays Before He Performs",
        verses: ["14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
        notes: [
          "Daniel answers with counsel and wisdom. He does not panic. He asks Arioch why the decree is so hasty, then seeks time from the king.",
          "The word hasty matters. Babylon is moving fast in fear and rage. Daniel slows the moment down. Courage often begins by refusing to let panic set the pace.",
          "Then Daniel goes to Hananiah, Mishael, and Azariah. He does not isolate. He gathers believers and asks them to seek mercies from the God of heaven.",
          "That phrase, God of heaven, is powerful in exile. Daniel is far from Jerusalem, but God is not local. Heaven still rules over Babylon.",
          "God reveals the secret in a night vision. Daniel's first response is worship, not self-promotion.",
          "Look at Daniel's praise:",
          "🧠 wisdom belongs to God",
          "💪 might belongs to God",
          "👑 God removes kings and sets up kings",
          "🔦 God reveals deep and secret things",
          "🌙 light dwells with Him",
          "This prayer gives the theology of the whole book. Kingdoms rise and fall, but wisdom and power belong to God.",
        ],
      },
      {
        range: "Daniel 2:24 to 35",
        title: "Daniel Gives God the Credit",
        verses: ["24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35"],
        notes: [
          "Daniel goes to Arioch and asks him not to destroy the wise men. Daniel's gift becomes mercy for others. He is not only trying to survive. He is protecting lives.",
          "When Daniel stands before Nebuchadnezzar, he refuses to act like the answer came from himself. He says there is a God in heaven that revealeth secrets.",
          "That is one of Daniel's clearest patterns. He receives unusual wisdom, but he keeps pointing away from himself and back to God.",
          "The dream is an image with a head of gold, chest and arms of silver, belly and thighs of brass, legs of iron, and feet mixed with iron and clay. The image looks impressive, but it is unstable at the bottom.",
          "Then a stone cut without hands strikes the image and becomes a great mountain filling the whole earth. Without hands means not produced by human power. This is God's kingdom breaking into human history.",
          "The dream is not just a puzzle. It is a message: every human empire is temporary, even when it looks huge.",
        ],
      },
      {
        range: "Daniel 2:36 to 49",
        title: "Kingdoms Fall, But God's Kingdom Stands",
        verses: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49"],
        notes: [
          "Daniel explains that Nebuchadnezzar is the head of gold. He honors the king's place, but he also makes clear that the king's power was given by the God of heaven.",
          "The later metals point to kingdoms after Babylon. The details matter, but the main message is clear: no empire gets the final word.",
          "The mixed feet show weakness inside power. Iron and clay do not truly hold together. Human kingdoms may look strong, but they are always fragile where God has not made them permanent.",
          "Then Daniel says the God of heaven will set up a kingdom that shall never be destroyed. This is one of the great kingdom promises in the Old Testament.",
          "Nebuchadnezzar responds by honoring Daniel and confessing that Daniel's God is a God of gods and Lord of kings. The confession is real in the moment, but Daniel 3 will show that the king's heart is still not fully humbled.",
          "Daniel is promoted, and he remembers his friends. That detail matters. Daniel does not rise and forget the people who prayed with him in the crisis.",
        ],
      },
    ],
    takeaways: [
      "Human wisdom reaches a limit, but God reveals what people cannot reach.",
      "Daniel responds to danger with prayer before strategy.",
      "The dream teaches that every empire is temporary under God's kingdom.",
      "Promotion should not make faithful people forget the community that prayed with them.",
    ],
    carry: [
      "Carry forward the God of heaven.",
      "Carry forward the stone cut without hands.",
      "Carry forward Daniel's habit of giving God credit.",
    ],
    lesson:
      "Daniel 2 teaches that courage under pressure starts with prayer and ends with giving God the glory. Daniel survives the impossible because God reveals what Babylon cannot.",
  },
  {
    chapter: 3,
    title: "Faith Inside the Fire",
    hook: "Daniel 3 asks a painful question: will faith still stand when the music starts and everyone else bows?",
    setup: [
      "Daniel is not the main speaker in this chapter, but his friends carry the same courage formed in Daniel 1.",
      "Nebuchadnezzar builds a golden image and turns worship into a public loyalty test. Shadrach, Meshach, and Abednego refuse to bow, even when the cost is a furnace.",
    ],
    matters: [
      "🗿 The image shows empire demanding worship.",
      "🎺 The music creates public pressure.",
      "🔥 The furnace reveals costly loyalty.",
      "🙌 The three friends trust God whether He delivers or not.",
      "👑 Nebuchadnezzar sees God's presence in the fire.",
    ],
    sections: [
      {
        range: "Daniel 3:1 to 7",
        title: "The Empire Demands Worship",
        verses: ["1", "2", "3", "4", "5", "6", "7"],
        notes: [
          "Nebuchadnezzar makes a great image of gold and sets it up in the plain of Dura. After the dream of chapter 2, this feels loud. God showed him kingdoms would fall, but the king builds an image that looks like his glory should last.",
          "All the officials are gathered. This is political theater. Satraps, governors, captains, judges, treasurers, counselors, sheriffs, and rulers are all present. The empire wants everyone important to be seen bowing together.",
          "The music matters. The sound of instruments becomes the signal for worship. Pressure is not only a command; it is an atmosphere. Everyone hears the same sound and knows what they are expected to do.",
          "The punishment is immediate: whoever does not bow will be cast into a burning fiery furnace. Babylon gives two options: worship or burn.",
          "This is not private spirituality. It is public allegiance. The image asks, 'Who owns your body when the empire gives the order?'",
        ],
      },
      {
        range: "Daniel 3:8 to 18",
        title: "But If Not",
        verses: ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"],
        notes: [
          "Certain Chaldeans accuse the Jews. The accusation is political and spiritual. They say these men do not regard the king and do not worship his gods.",
          "Nebuchadnezzar is full of rage and gives the three friends another chance. He asks, who is that God that shall deliver you out of my hands?",
          "That question is dangerous. Nebuchadnezzar thinks the furnace is the final authority. He is about to learn that his hands are not stronger than God's presence.",
          "Their answer is one of the strongest courage statements in Scripture. God is able to deliver us. But if not, we will not serve your gods or worship the image.",
          "Do not rush past but if not.",
          "🔥 They believe God can rescue.",
          "🔥 They do not demand that God must rescue.",
          "🔥 Their obedience is not based on a guaranteed outcome.",
          "🔥 Their worship belongs to God even if the fire is real.",
          "This is not shallow bravery. This is settled loyalty.",
        ],
      },
      {
        range: "Daniel 3:19 to 25",
        title: "Another in the Fire",
        verses: ["19", "20", "21", "22", "23", "24", "25"],
        notes: [
          "Nebuchadnezzar's face changes with anger. He orders the furnace heated seven times hotter. Seven here communicates complete intensity. The king wants the punishment to feel overwhelming.",
          "The men who throw them in die from the heat, showing how deadly the furnace is. The danger is not symbolic. This is real death pressure.",
          "Shadrach, Meshach, and Abednego fall bound into the fire. Then the king is astonished. He sees four men walking loose in the fire.",
          "That word loose matters. The fire burns what bound them, but not them.",
          "The fourth figure is described as like the Son of God, or like a son of the gods depending on how the phrase is understood. Nebuchadnezzar is trying to describe a heavenly presence he does not fully understand.",
          "The main point is clear: God did not keep them from the furnace, but He met them in it.",
        ],
      },
      {
        range: "Daniel 3:26 to 30",
        title: "The Fire Cannot Own Them",
        verses: ["26", "27", "28", "29", "30"],
        notes: [
          "Nebuchadnezzar calls them servants of the most high God. The king who asked what God could deliver them now calls them out by the name of the God who did.",
          "The officials inspect them. Their bodies are unharmed. Their hair is not singed. Their coats are not changed. The smell of fire has not passed on them.",
          "That detail is beautiful. God does not only preserve life. He preserves witness. They come out carrying evidence that the fire did not win.",
          "Nebuchadnezzar blesses God because these men trusted Him and yielded their bodies rather than worship any god except their own God.",
          "The chapter ends with promotion, but the real victory happened before the rescue. They were already faithful when they said, but if not.",
        ],
      },
    ],
    takeaways: [
      "Public pressure often works through atmosphere, fear, and the desire to blend in.",
      "True courage trusts God's ability without trying to control God's decision.",
      "God may deliver from the fire or meet His people inside the fire.",
      "The fire can burn bonds without destroying the faithful.",
    ],
    carry: [
      "Carry forward the phrase but if not.",
      "Carry forward the fourth figure in the fire.",
      "Carry forward worship that refuses to bow to empire.",
    ],
    lesson:
      "Daniel 3 teaches that courage is worship under threat. Faith is not proven only by escape. Sometimes it is proven by standing before the furnace.",
  },
  {
    chapter: 4,
    title: "The King Who Had to Look Up",
    hook: "Daniel 4 is the testimony of a proud king who had to lose his mind before he lifted his eyes.",
    setup: [
      "Nebuchadnezzar tells the story in his own royal voice. He had power, peace, and greatness, but pride was growing in him like a tree that looked untouchable.",
      "God warns him through a dream, Daniel interprets it honestly, and the king is humbled until he learns that the Most High rules.",
    ],
    matters: [
      "🌳 The tree dream shows royal greatness under judgment.",
      "⚠️ Daniel tells hard truth with compassion.",
      "👑 Pride makes Nebuchadnezzar forget who gave him the kingdom.",
      "🐂 The king is humbled like a beast.",
      "🙌 Restoration comes when he lifts his eyes to heaven.",
    ],
    sections: [
      {
        range: "Daniel 4:1 to 9",
        title: "A King Tells on Himself",
        verses: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        notes: [
          "The chapter opens like a royal announcement to all peoples, nations, and languages. Nebuchadnezzar wants the whole empire to hear what the Most High God did to him.",
          "That is already a reversal. The king who built an image in chapter 3 now testifies about God's kingdom being everlasting.",
          "He describes himself at rest in his house and flourishing in his palace. That sounds peaceful, but it is also dangerous. Comfort can hide pride when the heart forgets God.",
          "The dream troubles him. Once again, Babylon's wise men cannot give the answer. The empire's experts keep reaching the end of themselves.",
          "Daniel is called by his Babylonian name, Belteshazzar. The king still uses the name Babylon gave him, but he also recognizes the spirit of the holy gods in him. Nebuchadnezzar sees something in Daniel that his own system cannot produce.",
        ],
      },
      {
        range: "Daniel 4:10 to 18",
        title: "The Tree and the Watcher",
        verses: ["10", "11", "12", "13", "14", "15", "16", "17", "18"],
        notes: [
          "The dream shows a massive tree reaching to heaven and visible to the end of the earth. Birds live in it, beasts rest under it, and all flesh is fed from it.",
          "In ancient imagery, a tree could represent a kingdom that provides shelter and life. Nebuchadnezzar's empire is pictured as huge and influential.",
          "Then a watcher comes down from heaven. The watcher is a heavenly messenger announcing judgment. The tree is cut down, but the stump is left with a band of iron and brass.",
          "The heart of a man will be changed into the heart of a beast until seven times pass over him. This points to a season of complete humbling.",
          "Verse 17 gives the purpose: that the living may know that the Most High rules in the kingdom of men. That is the sermon of the chapter.",
          "Kings rule, but the Most High overrules.",
        ],
      },
      {
        range: "Daniel 4:19 to 27",
        title: "Daniel Tells the Truth With Tears in It",
        verses: ["19", "20", "21", "22", "23", "24", "25", "26", "27"],
        notes: [
          "Daniel is astonied for one hour. Astonied means stunned, appalled, or deeply troubled. He is not excited to announce judgment.",
          "That matters. Daniel has served under this king, even though this king conquered his people. Daniel can tell the truth without becoming cruel.",
          "He tells Nebuchadnezzar plainly: the tree is you. The king has grown great, but the decree of the Most High is against him.",
          "The king will be driven from men, dwell with beasts, eat grass like oxen, and be wet with dew until he knows heaven rules.",
          "Daniel also gives counsel: break off thy sins by righteousness and show mercy to the poor. This is not only dream interpretation. This is a call to repentance.",
          "The poor matter here because prideful empires often build glory while crushing vulnerable people. Daniel tells the king that humility should become justice.",
        ],
      },
      {
        range: "Daniel 4:28 to 37",
        title: "The Moment Pride Breaks",
        verses: ["28", "29", "30", "31", "32", "33", "34", "35", "36", "37"],
        notes: [
          "Twelve months pass. The warning gives Nebuchadnezzar time, but time does not automatically create repentance.",
          "The king walks in the palace and says, Is not this great Babylon, that I have built? That sentence is pride speaking out loud.",
          "Before the words finish, judgment falls. The kingdom is departed from him. The proud king becomes beastlike until his hair and nails grow wild.",
          "This is not God being petty. This is God exposing what pride does. When a man refuses to live under God, he becomes less human, not more.",
          "Then Nebuchadnezzar lifts his eyes to heaven. His understanding returns. Worship returns before status returns.",
          "He praises the King of heaven, whose works are truth and whose ways are judgment. The chapter ends with a humbled king confessing that God is able to abase those who walk in pride.",
        ],
      },
    ],
    takeaways: [
      "Pride can grow quietly inside comfort.",
      "God warns before He humbles.",
      "Daniel models truth with compassion, not cruelty.",
      "Humility begins when Nebuchadnezzar looks up.",
    ],
    carry: [
      "Carry forward the tree that was cut down.",
      "Carry forward the line that heaven rules.",
      "Carry forward Daniel's courage to tell hard truth.",
    ],
    lesson:
      "Daniel 4 teaches that God can humble any throne. Pride makes people beastlike, but worship restores the right order of the heart.",
  },
  {
    chapter: 5,
    title: "The Writing on the Wall",
    hook: "Daniel 5 is what it looks like when a party becomes a judgment scene.",
    setup: [
      "Belshazzar throws a feast while Babylon is spiritually rotting. Sacred vessels from Jerusalem are used for drunken praise to idols.",
      "Then a hand writes on the wall. Daniel, now older and steady, is called to interpret what the terrified king cannot understand.",
    ],
    matters: [
      "🍷 Belshazzar treats holy things like party props.",
      "✍️ God's warning interrupts the feast.",
      "😨 Power collapses into fear in seconds.",
      "🧓 Daniel stands as an older faithful witness.",
      "⚖️ The kingdom is weighed and found wanting.",
    ],
    sections: [
      {
        range: "Daniel 5:1 to 9",
        title: "A Feast Full of Pride",
        verses: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        notes: [
          "Belshazzar makes a great feast for a thousand lords. The scene is loud, luxurious, and arrogant.",
          "He commands that the vessels from the temple in Jerusalem be brought out. These were holy objects connected to worship of the Lord. Belshazzar turns them into drinking cups.",
          "This is not just bad manners. It is blasphemy. He is mocking the God whose temple vessels Babylon had taken.",
          "They drink wine and praise gods of gold, silver, brass, iron, wood, and stone. The contrast is sharp. Lifeless idols are praised while the living God is insulted.",
          "Then fingers of a man's hand write on the wall. The king's face changes, his thoughts trouble him, and his knees shake. The powerful party king becomes terrified in a moment.",
          "The wise men cannot read or interpret the writing. Again, Babylon's system fails when God speaks.",
        ],
      },
      {
        range: "Daniel 5:10 to 16",
        title: "Daniel Is Remembered",
        verses: ["10", "11", "12", "13", "14", "15", "16"],
        notes: [
          "The queen remembers Daniel. She speaks of him as a man with an excellent spirit, knowledge, understanding, and the ability to interpret dreams and hard sentences.",
          "This shows Daniel's long witness. Years have passed, kings have changed, but his faithfulness left a reputation.",
          "Belshazzar calls Daniel and offers gifts, a chain of gold, and the third ruler position if he can interpret the writing.",
          "The offer sounds impressive, but the kingdom is already at the edge of collapse. Babylon is offering rewards it may not live long enough to enjoy.",
          "Daniel does not need the room's approval. He is not a young man trying to climb anymore. He is a seasoned servant of God, steady in a room full of panic.",
        ],
      },
      {
        range: "Daniel 5:17 to 24",
        title: "Daniel Refuses Flattery and Names the Sin",
        verses: ["17", "18", "19", "20", "21", "22", "23", "24"],
        notes: [
          "Daniel tells the king to keep his gifts. That is courage. He will speak truth without being bought by the palace.",
          "He reminds Belshazzar of Nebuchadnezzar. God gave that king greatness, and God humbled him when pride lifted his heart.",
          "Then Daniel says, Thou his son, O Belshazzar, hast not humbled thine heart, though thou knewest all this.",
          "The word son can mean descendant or successor, not necessarily direct biological son. The point is that Belshazzar inherited the lesson and ignored it.",
          "Daniel names the sin clearly. Belshazzar lifted himself against the Lord of heaven, used God's vessels in idol worship, and failed to glorify the God who held his breath in His hand.",
          "That phrase is heavy. The God Belshazzar mocked was the God sustaining his very breath.",
        ],
      },
      {
        range: "Daniel 5:25 to 31",
        title: "Weighed and Found Wanting",
        verses: ["25", "26", "27", "28", "29", "30", "31"],
        notes: [
          "The words are Mene, Mene, Tekel, Upharsin. Daniel explains them as a message of numbering, weighing, and dividing.",
          "Mene means God has numbered the kingdom and finished it. Tekel means the king has been weighed in the balances and found wanting. Peres means the kingdom is divided and given to the Medes and Persians.",
          "This is not random mystery language. It is courtroom language. Belshazzar is being measured by God and coming up empty.",
          "The king still gives Daniel honor, but it is too late to save the kingdom. That same night Belshazzar is slain, and Darius receives the kingdom.",
          "Daniel 5 teaches that there is a point where warnings ignored become judgment fulfilled. The party ends. The wall speaks. The kingdom falls.",
        ],
      },
    ],
    takeaways: [
      "Holy things should not be treated casually.",
      "A person can know the warning from the past and still refuse humility.",
      "Daniel's long faithfulness gives him a steady voice in a collapsing room.",
      "God weighs kingdoms and people with perfect justice.",
    ],
    carry: [
      "Carry forward the holy vessels.",
      "Carry forward the handwriting on the wall.",
      "Carry forward Daniel's refusal to be bought.",
    ],
    lesson:
      "Daniel 5 teaches that pride can celebrate right up to the edge of judgment. God is patient, but He is not mocked.",
  },
  {
    chapter: 6,
    title: "Prayer Above Survival",
    hook: "Daniel 6 is famous for lions, but the real center of the chapter is a prayer habit.",
    setup: [
      "Daniel is older now. He has survived Babylon, kings, promotions, threats, and political change. Under Darius, his excellence makes him trusted and hated.",
      "The trap against Daniel works because his enemies know one thing: he will not stop praying.",
    ],
    matters: [
      "🏛️ Daniel's integrity exposes jealous officials.",
      "📜 A law is designed to turn prayer into a crime.",
      "🪟 Daniel opens his windows and prays as before.",
      "🦁 God shuts the lions' mouths.",
      "👑 Darius learns that Daniel's God delivers.",
    ],
    sections: [
      {
        range: "Daniel 6:1 to 9",
        title: "A Faithful Life Becomes a Target",
        verses: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        notes: [
          "Darius organizes the kingdom and sets Daniel over the presidents and princes because an excellent spirit is in him.",
          "Daniel is not promoted because he plays political games. He is faithful, wise, and trustworthy. That makes him useful to the king and threatening to jealous men.",
          "His enemies search for corruption and cannot find any. No error. No fault. No scandal. That is powerful. Daniel's public life has integrity.",
          "So they say they will not find anything against him unless it concerns the law of his God. In other words, the only predictable weakness they can exploit is Daniel's faithfulness.",
          "They flatter Darius into signing a decree that no one may ask a petition of any god or man for thirty days except the king.",
          "The law of the Medes and Persians could not be changed once signed. That detail matters because the trap is legal. Evil often hides behind official paperwork.",
        ],
      },
      {
        range: "Daniel 6:10 to 15",
        title: "As He Did Aforetime",
        verses: ["10", "11", "12", "13", "14", "15"],
        notes: [
          "When Daniel knows the writing is signed, he goes home. He opens his windows toward Jerusalem and prays three times a day, as he did aforetime.",
          "Aforetime means before. Daniel is not inventing a new dramatic habit for the crisis. He is continuing the rhythm he already had.",
          "The windows toward Jerusalem matter. Daniel is in exile, but his heart is still turned toward the place of God's promise, temple, and covenant mercy.",
          "He gives thanks before God. That detail is stunning. The law threatens his life, but gratitude is still in his prayer life.",
          "The men find him praying and make their accusation. Darius realizes he has been trapped and works until sundown to deliver Daniel, but the law he signed now holds him.",
          "Daniel's courage here is not loud rebellion. It is steady devotion. He simply refuses to let fear close the window.",
        ],
      },
      {
        range: "Daniel 6:16 to 23",
        title: "God Shuts the Lions' Mouths",
        verses: ["16", "17", "18", "19", "20", "21", "22", "23"],
        notes: [
          "Daniel is cast into the den of lions. A stone is placed over the mouth of the den and sealed. The scene feels like death has been locked in place.",
          "Darius says, Thy God whom thou servest continually, he will deliver thee. Even the king knows Daniel's faith is not occasional. It is continual.",
          "The king spends the night fasting, sleepless, and troubled. Daniel is in the den, but the king is the one with no peace.",
          "At dawn Darius runs to the den and cries with a lamentable voice. He asks whether Daniel's God was able to deliver him.",
          "Daniel answers with honor: O king, live for ever. God sent His angel and shut the lions' mouths because innocency was found in him.",
          "Innocency does not mean Daniel was sinless before God. It means he was innocent of the crime and faithful in this matter.",
          "Daniel is lifted out with no hurt on him because he believed in his God. The lions were real. The danger was real. The deliverance was real.",
        ],
      },
      {
        range: "Daniel 6:24 to 28",
        title: "The Living God Is Proclaimed",
        verses: ["24", "25", "26", "27", "28"],
        notes: [
          "The accusers face the judgment they planned for Daniel. This is another reversal in Daniel's story. The trap turns back on the trap-makers.",
          "Darius writes to all peoples, nations, and languages, declaring reverence for Daniel's God. The language echoes empire-wide announcements, but now the message honors the living God.",
          "He calls God living, steadfast, eternal, delivering, rescuing, and working signs and wonders.",
          "Daniel prospers in the reign of Darius and Cyrus. Like chapter 1, the ending reminds us that Daniel outlasts political change because his life is rooted in God.",
          "The lions' den is not only a miracle story. It is the public result of a private life that stayed faithful when no one could see.",
        ],
      },
    ],
    takeaways: [
      "Daniel's enemies can find no fault except his loyalty to God.",
      "Prayer habits built before pressure can hold during pressure.",
      "God is able to deliver, but Daniel's faithfulness is already visible before the den opens.",
      "The living God is proclaimed through Daniel's steady witness.",
    ],
    carry: [
      "Carry forward the open windows.",
      "Carry forward the phrase as he did aforetime.",
      "Carry forward the God who shuts lions' mouths.",
    ],
    lesson:
      "Daniel 6 teaches that courage is consistency under threat. Daniel did not become faithful because of the lions' den. The lions' den revealed the faithful life he had already built.",
  },
];

export const COURAGE_OF_DANIEL_DEEP_NOTES = danielNotes.map(buildDanielNotes);
