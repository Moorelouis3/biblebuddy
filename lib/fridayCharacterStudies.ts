// Who Was This Friday - the 20-character rotation (2026-09-06).
// Content comes from Louis's approved "Friday Character Studies - 20 People"
// document. Posts publish in this exact order, one per Friday, and a
// character never repeats until all 20 have been used. Selection is
// history-aware: the publisher looks at the most recent Friday titles in
// weekly_group_series_posts (which survives deploys) and picks the next
// character in the list, so a restart never resets the rotation to Gabriel.
// Scripture references stay plain text with ASCII hyphens - the chat and
// scheduler auto-link them into tappable scripture-ref buttons.

export type FridayCharacterStudy = {
  name: string;
  subtitle: string;
  who: string;
  whyPoints: string[];
  scriptures: string[];
  takeaway: string;
  question: string;
};

export const FRIDAY_CHARACTER_STUDIES: FridayCharacterStudy[] = [
  {
    name: "Gabriel",
    subtitle: "an angel and messenger sent by God",
    who:
      "Gabriel is an angel who appears by name in Daniel and Luke. God sends him to explain visions and deliver messages at major turning points in the biblical story. He helps Daniel understand difficult revelations, tells Zechariah that John the Baptist will be born, and announces to Mary that she will give birth to Jesus.",
    whyPoints: [
      "🕊️ He is explicitly described as one who stands in the presence of God.",
      "📣 He delivers God's message rather than drawing attention to himself.",
      "✨ His appearances connect prophecy, preparation, and the coming of Christ.",
    ],
    scriptures: ["Daniel 8:15-17", "Daniel 9:21-23", "Luke 1:11-20", "Luke 1:26-38"],
    takeaway:
      "Gabriel's story reminds us that God can already be moving His plan forward before people understand what He is doing.",
    question: "What stands out to you most about Gabriel's role as God's messenger?",
  },
  {
    name: "Abraham",
    subtitle: "the patriarch God called to walk by faith",
    who:
      "Abraham, originally called Abram, was a man from Mesopotamia whom God called to leave his homeland and travel to a land God would show him. God promised to make a great nation through him and to bless the nations through his family. Abraham became a central example of faith, although his life also shows moments of fear, impatience, and failure.",
    whyPoints: [
      "🚶 He obeyed God without knowing the entire route ahead.",
      "⏳ He learned that God's promises can require long seasons of waiting.",
      "🌍 His failures did not stop God from continuing His covenant plan.",
    ],
    scriptures: ["Genesis 12:1-9", "Genesis 15:1-6", "Genesis 17:1-8", "Genesis 22:1-18"],
    takeaway:
      "Abraham shows that biblical faith is not knowing every detail. It is learning to trust the God who called you.",
    question: "Where do you see Abraham growing in faith over the course of his life?",
  },
  {
    name: "Sarah",
    subtitle: "Abraham's wife and the mother of Isaac",
    who:
      "Sarah, originally called Sarai, was Abraham's wife and an important part of God's covenant story. She endured years of infertility and waiting before giving birth to Isaac in old age. Her story contains both doubt and faith and shows the emotional difficulty of waiting for something God has promised.",
    whyPoints: [
      "⏳ She waited many years for a promise that seemed humanly impossible.",
      "😅 Her laughter shows how unbelievable God's promise initially sounded.",
      "👶 Isaac's birth demonstrated that God was not limited by Sarah's age or circumstances.",
    ],
    scriptures: ["Genesis 11:29-30", "Genesis 18:9-15", "Genesis 21:1-7", "Hebrews 11:11"],
    takeaway:
      "Sarah's life reminds us that long waiting does not automatically mean God has forgotten His promise.",
    question: "What does Sarah's story teach you about waiting on God?",
  },
  {
    name: "Joseph",
    subtitle: "Jacob's son who went from a pit to power in Egypt",
    who:
      "Joseph was one of Jacob's twelve sons. His brothers hated him, sold him into slavery, and allowed their father to believe he was dead. Joseph later served in Egypt, was falsely accused and imprisoned, and eventually became a powerful leader under Pharaoh. God used his position to preserve many lives during famine, including the family that had betrayed him.",
    whyPoints: [
      "🔄 His circumstances changed repeatedly, but God remained with him.",
      "🛡️ He maintained integrity when temptation and injustice could have made him bitter.",
      "🤝 He eventually chose forgiveness instead of revenge against his brothers.",
    ],
    scriptures: ["Genesis 37:18-36", "Genesis 39:1-23", "Genesis 41:37-43", "Genesis 50:15-21"],
    takeaway:
      "Joseph's story shows how God can use painful chapters without calling the evil itself good.",
    question:
      "Which part of Joseph's journey speaks most strongly to you: betrayal, waiting, integrity, or forgiveness?",
  },
  {
    name: "Moses",
    subtitle: "the leader God used to bring Israel out of Egypt",
    who:
      "Moses was born when Pharaoh had ordered Hebrew baby boys killed. He was raised in Pharaoh's household, later fled Egypt, and spent years as a shepherd before God called him from the burning bush. Despite Moses' fears and objections, God used him to confront Pharaoh, lead Israel out of slavery, and receive the Law.",
    whyPoints: [
      "🔥 His calling came after a long period in the wilderness.",
      "🗣️ He openly told God about his fears and weaknesses.",
      "☁️ His leadership depended on God's presence, not merely his own ability.",
    ],
    scriptures: ["Exodus 2:1-15", "Exodus 3:1-15", "Exodus 14:10-31", "Exodus 33:12-17"],
    takeaway:
      "Moses reminds us that feeling inadequate does not automatically disqualify someone from being used by God.",
    question: "What part of Moses' response to God's calling feels most relatable to you?",
  },
  {
    name: "Joshua",
    subtitle: "Moses' successor who led Israel into the Promised Land",
    who:
      "Joshua first appears as a military leader and faithful assistant to Moses. He was one of the twelve spies sent into Canaan and, along with Caleb, trusted that God could give Israel the land. After Moses died, Joshua was chosen to lead the next generation into the Promised Land.",
    whyPoints: [
      "🎖️ He spent years serving before becoming the main leader.",
      "💪 He chose faith when most of the spies responded with fear.",
      "🦁 God repeatedly told him to be strong and courageous because God would be with him.",
    ],
    scriptures: ["Numbers 14:6-9", "Joshua 1:1-9", "Joshua 6:1-20", "Joshua 24:14-15"],
    takeaway:
      "Joshua teaches that courage in Scripture is not pretending danger is absent; it is moving forward because God is present.",
    question: "What do you think made Joshua able to lead after following Moses for so many years?",
  },
  {
    name: "Rahab",
    subtitle: "a woman in Jericho who protected Israel's spies and trusted Israel's God",
    who:
      "Rahab lived in Jericho and is identified in Joshua as a prostitute. When Israelite spies entered the city, she hid them and acknowledged that the Lord had given Israel the land. She asked for protection for her family, and when Jericho fell, Rahab and her household were spared. She later appears in Jesus' genealogy and in the New Testament as an example of faith.",
    whyPoints: [
      "🌅 Her past did not prevent her from becoming part of God's larger story.",
      "⚡ She acted on what she believed, even when it involved serious risk.",
      "👨‍👩‍👧 Her faith affected not only her future but also the protection of her family.",
    ],
    scriptures: ["Joshua 2:1-21", "Joshua 6:22-25", "Matthew 1:5", "Hebrews 11:31"],
    takeaway:
      "Rahab's story shows that a person's previous life does not determine the limits of what God can do next.",
    question: "What surprises you most about Rahab being included in the biblical story?",
  },
  {
    name: "Ruth",
    subtitle: "a Moabite widow whose loyalty and faith became part of David's family line",
    who:
      "Ruth was a Moabite woman who lost her husband and chose to remain with her widowed mother-in-law, Naomi. She left her homeland, embraced Naomi's people and God, and worked to provide for them. Her faithfulness eventually led to marriage with Boaz, and Ruth became the great-grandmother of King David.",
    whyPoints: [
      "🤝 She chose loyalty when walking away would have been easier.",
      "🌾 Her ordinary work in the fields became part of a much larger story.",
      "👑 As a foreigner, she was welcomed into the family line that eventually led to Jesus.",
    ],
    scriptures: ["Ruth 1:14-18", "Ruth 2:8-12", "Ruth 3:9-13", "Ruth 4:13-17"],
    takeaway:
      "Ruth reminds us that quiet faithfulness in ordinary decisions can have consequences far beyond what we can see.",
    question: "What do you think is the strongest example of loyalty in Ruth's story?",
  },
  {
    name: "Samuel",
    subtitle: "a prophet and judge who learned to recognize God's voice",
    who:
      "Samuel was dedicated to the Lord by his mother, Hannah, and grew up serving at the tabernacle under Eli. As a boy, he heard God calling him but initially did not recognize the voice. Samuel later became an important prophet and judge who guided Israel and anointed both Saul and David as kings.",
    whyPoints: [
      "🌱 His relationship with God began while he was still young.",
      "👂 He had to learn to recognize when God was speaking.",
      "🗣️ He remained responsible for telling difficult truth, even to leaders.",
    ],
    scriptures: ["1 Samuel 1:24-28", "1 Samuel 3:1-21", "1 Samuel 8:4-9", "1 Samuel 16:1-13"],
    takeaway:
      "Samuel's life highlights the importance of listening, responding, and remaining faithful when God's message is difficult.",
    question: "What can Samuel's early story teach us about learning to listen to God?",
  },
  {
    name: "David",
    subtitle: "shepherd, warrior, king, psalmist, and deeply flawed man after God's heart",
    who:
      "David began as a shepherd and the youngest son in his family. God chose him to become king while Saul was still on the throne. David defeated Goliath, spent years fleeing Saul, eventually ruled Israel, and wrote many psalms. He also committed serious sins, including adultery with Bathsheba and arranging Uriah's death, and later faced painful consequences.",
    whyPoints: [
      "❤️ God looked beyond outward appearance when choosing him.",
      "🙏 David repeatedly sought God during danger and uncertainty.",
      "💔 His repentance after serious sin shows the difference between hiding sin and turning back to God.",
    ],
    scriptures: ["1 Samuel 16:1-13", "1 Samuel 17:32-50", "2 Samuel 11:1-27", "Psalm 51:1-17"],
    takeaway:
      "David's story is powerful because Scripture does not hide either his faith or his failures.",
    question:
      "What do you learn from the Bible showing both David's greatest victories and his worst failures?",
  },
  {
    name: "Solomon",
    subtitle: "David's son, Israel's king, and a man famous for wisdom",
    who:
      "Solomon became king after David and asked God for wisdom to govern the people. God granted him extraordinary wisdom, and Solomon became associated with Proverbs, Ecclesiastes, and the building of the first temple in Jerusalem. Yet his later life also became a warning: his many foreign wives turned his heart toward other gods.",
    whyPoints: [
      "🧠 He understood early that leadership required wisdom from God.",
      "⚠️ His wisdom and achievements did not make him immune to spiritual compromise.",
      "🏁 His life shows that beginning well does not remove the need to remain faithful.",
    ],
    scriptures: ["1 Kings 3:5-14", "1 Kings 4:29-34", "1 Kings 8:22-30", "1 Kings 11:1-10"],
    takeaway: "Solomon teaches that wisdom must be lived, not merely possessed or spoken.",
    question:
      "Why do you think someone as wise as Solomon could still drift away from what he knew?",
  },
  {
    name: "Elijah",
    subtitle: "a prophet who confronted idolatry and experienced both courage and exhaustion",
    who:
      "Elijah was a prophet during the reign of Ahab and Jezebel, when Baal worship had become powerful in Israel. He announced drought, experienced God's provision, confronted the prophets of Baal on Mount Carmel, and witnessed a dramatic demonstration of God's power. Soon afterward, however, Elijah became afraid, exhausted, and discouraged.",
    whyPoints: [
      "🔥 He stood publicly for God when doing so was dangerous.",
      "😔 His Mount Carmel victory did not make him emotionally invincible.",
      "🍞 God responded to his exhaustion with food, rest, presence, and renewed direction.",
    ],
    scriptures: ["1 Kings 17:1-16", "1 Kings 18:20-39", "1 Kings 19:1-18", "2 Kings 2:9-12"],
    takeaway:
      "Elijah reminds us that a powerful moment of faith does not mean a person will never become tired or discouraged.",
    question: "What do you notice about the way God dealt with Elijah when he was exhausted?",
  },
  {
    name: "Esther",
    subtitle: "a Jewish queen who risked her life to protect her people",
    who:
      "Esther was a Jewish woman living in the Persian Empire who became queen. When Haman developed a plan to destroy the Jewish people, Esther initially faced the danger of approaching the king without being summoned. Encouraged by Mordecai, she chose to act, asking her people to fast before she went before the king.",
    whyPoints: [
      "👑 Her position gave her an opportunity, but acting still required courage.",
      "🕰️ She did not rush into the crisis; she called for fasting and prepared carefully.",
      "🛡️ Her willingness to risk herself helped save her people.",
    ],
    scriptures: ["Esther 2:15-18", "Esther 4:10-17", "Esther 5:1-8", "Esther 7:1-6"],
    takeaway:
      "Esther's story asks what we will do when our position, influence, or opportunity gives us a chance to help someone else.",
    question: "What do you think Esther had to overcome internally before approaching the king?",
  },
  {
    name: "Daniel",
    subtitle: "a Jewish exile who remained faithful while serving powerful foreign kings",
    who:
      "Daniel was taken from Judah to Babylon as a young man and trained for service in the royal court. He lived much of his life far from home under foreign empires, yet consistently remained devoted to God. He interpreted dreams, survived political plots, and continued praying even when prayer to God was temporarily outlawed.",
    whyPoints: [
      "🏛️ He learned how to serve in a foreign culture without abandoning his convictions.",
      "🙏 His private habits of prayer supported his public faithfulness.",
      "💎 His integrity was so consistent that enemies struggled to find legitimate charges against him.",
    ],
    scriptures: ["Daniel 1:8-20", "Daniel 2:17-23", "Daniel 6:4-23", "Daniel 9:1-5"],
    takeaway:
      "Daniel shows that faithfulness is often built through habits long before a dramatic test arrives.",
    question: "What daily habit in Daniel's life seems most important to his long-term faithfulness?",
  },
  {
    name: "Mary",
    subtitle: "the young Jewish woman chosen to become the mother of Jesus",
    who:
      "Mary was a young Jewish woman from Nazareth who was betrothed to Joseph when the angel Gabriel told her she would conceive Jesus by the Holy Spirit. The announcement carried enormous personal uncertainty, yet Mary responded with submission to God. She later appears throughout key moments in Jesus' life, from His birth to the crucifixion.",
    whyPoints: [
      "💛 She received a calling that brought both honor and serious personal cost.",
      "❓ She asked a genuine question without rejecting God's message.",
      "🙌 Her response shows humble willingness even before she knew how every consequence would unfold.",
    ],
    scriptures: ["Luke 1:26-38", "Luke 1:46-55", "Luke 2:15-19", "John 19:25-27"],
    takeaway:
      "Mary's story demonstrates a form of faith that says yes to God before every detail is understood.",
    question: "What stands out to you about Mary's response to Gabriel's announcement?",
  },
  {
    name: "John the Baptist",
    subtitle: "the prophet who prepared people for Jesus and called them to repentance",
    who:
      "John the Baptist was the son of Zechariah and Elizabeth, and his birth was announced by Gabriel. He lived an unusual life in the wilderness and preached repentance, preparing people for the coming Messiah. John baptized Jesus and publicly identified Him as the Lamb of God. His boldness eventually led to imprisonment and death.",
    whyPoints: [
      "🏜️ His ministry was designed to point beyond himself to Jesus.",
      "🗣️ He was willing to confront sin even when powerful people were involved.",
      "⬇️ He understood that his own prominence should decrease as Jesus became known.",
    ],
    scriptures: ["Luke 1:13-17", "Matthew 3:1-17", "John 1:29-34", "John 3:27-30"],
    takeaway:
      "John's life is a strong picture of ministry without making oneself the center of the story.",
    question:
      "What do you think John meant when he said, “He must increase, but I must decrease”?",
  },
  {
    name: "Peter",
    subtitle: "a fisherman who became one of Jesus' closest disciples and a leader in the early church",
    who:
      "Peter, originally named Simon, was a fisherman whom Jesus called to follow Him. He became one of the most prominent disciples: outspoken, courageous at times, impulsive at others. Peter confessed Jesus as the Christ, later denied knowing Him three times, and was restored by Jesus after the resurrection. He then became a major leader in the early church.",
    whyPoints: [
      "🎣 Jesus worked with Peter through both bold faith and serious failure.",
      "🌊 Peter's denial was not the end of his usefulness.",
      "🐑 His restoration included a renewed responsibility to care for others.",
    ],
    scriptures: ["Matthew 4:18-20", "Matthew 16:13-18", "Luke 22:54-62", "John 21:15-19"],
    takeaway:
      "Peter's story shows that failure can become part of a transformed life when a person returns to Christ.",
    question: "Which part of Peter's story gives you the clearest picture of growth?",
  },
  {
    name: "Mary Magdalene",
    subtitle: "a devoted follower of Jesus and an early witness of His resurrection",
    who:
      "Mary Magdalene was a woman from whom Jesus had cast out seven demons. She became one of the women who followed Jesus and supported His ministry. She remained near the crucifixion and went to Jesus' tomb after His death. In John's Gospel, the risen Jesus appears to Mary, and she carries the news to the disciples.",
    whyPoints: [
      "✨ Jesus' work in her life led to devoted discipleship.",
      "🕯️ She remained present during moments when many others had scattered.",
      "📢 She became one of the first witnesses to proclaim that she had seen the risen Lord.",
    ],
    scriptures: ["Luke 8:1-3", "John 19:25", "John 20:1-18", "Mark 16:9"],
    takeaway:
      "Mary Magdalene's story moves from deliverance to discipleship to witnessing about the resurrection.",
    question:
      "What do you think is significant about Mary Magdalene being among the first resurrection witnesses?",
  },
  {
    name: "Paul",
    subtitle: "a former persecutor of Christians who became an apostle and missionary",
    who:
      "Paul, originally called Saul, was a Pharisee who actively persecuted followers of Jesus. While traveling to Damascus, he encountered the risen Christ, and his life changed direction. Paul became a missionary who helped establish churches throughout the Roman world and wrote many New Testament letters.",
    whyPoints: [
      "🔄 His past as a persecutor did not prevent Christ from transforming and using him.",
      "⛓️ His calling included suffering as well as influence.",
      "💌 His letters repeatedly emphasize grace because he knew personally what it meant to receive mercy.",
    ],
    scriptures: ["Acts 8:1-3", "Acts 9:1-22", "Acts 13:1-3", "Philippians 3:4-11"],
    takeaway:
      "Paul's life demonstrates how radically a person's direction can change after encountering Christ.",
    question: "What part of Paul's transformation do you find most powerful?",
  },
  {
    name: "Barnabas",
    subtitle: "an early Christian leader known for encouragement and giving others a chance",
    who:
      "Barnabas was an early member of the church whose name means “son of encouragement.” He generously supported the Christian community, vouched for Paul when other believers were afraid of him, and later served alongside Paul in missionary work. Barnabas also defended giving John Mark another opportunity after Mark had previously left a mission.",
    whyPoints: [
      "🙌 He used his credibility to help others gain acceptance.",
      "🌱 He recognized potential in people others were unsure about.",
      "🤝 His encouragement was practical: generosity, advocacy, partnership, and second chances.",
    ],
    scriptures: ["Acts 4:36-37", "Acts 9:26-28", "Acts 11:22-26", "Acts 15:36-39"],
    takeaway:
      "Barnabas shows that encouragement is more than saying something nice; sometimes it means putting your reputation behind someone else.",
    question:
      "Who has been a Barnabas in your life by encouraging you or giving you another chance?",
  },
];

export function getFridayCharacterTitle(character: FridayCharacterStudy) {
  return `Who was ${character.name} in the Bible?`;
}

export function buildFridayCharacterStudyTemplate(character: FridayCharacterStudy) {
  const contentHtml =
    `<p><strong>This week we are looking at ${character.name} - ${character.subtitle}.</strong></p>` +
    `<p>${character.who}</p>` +
    `<h2>Why ${character.name} matters</h2>` +
    `<ul>${character.whyPoints.map((point) => `<li>${point}</li>`).join("")}</ul>` +
    `<h2>Where to read it in the Bible</h2>` +
    `<ul>${character.scriptures.map((reference) => `<li>📍 ${reference}</li>`).join("")}</ul>` +
    `<h2>The takeaway</h2>` +
    `<p>${character.takeaway}</p>` +
    `<p><strong>Drop into the comments after you read:</strong> ${character.question}</p>`;

  return {
    title: getFridayCharacterTitle(character),
    description: `This week's Who Was This Friday looks at ${character.name}, ${character.subtitle} - who they were, why they matter, and where to read their story.`,
    contentHtml,
  };
}

// Names sorted longest-first so "Mary Magdalene" matches before "Mary" and
// "John the Baptist" before any shorter name it contains.
const CHARACTER_MATCHERS = FRIDAY_CHARACTER_STUDIES.map((character, index) => ({
  index,
  name: character.name.toLowerCase(),
})).sort((a, b) => b.name.length - a.name.length);

export function findFridayCharacterIndexByTitle(title: string | null | undefined) {
  const haystack = (title || "").toLowerCase();
  if (!haystack) return null;
  const match = CHARACTER_MATCHERS.find((entry) => haystack.includes(entry.name));
  return match ? match.index : null;
}

/**
 * Given past Friday post titles ordered newest-first, return the index of
 * the character that should publish next: the one after the most recently
 * posted character in the rotation. Titles that don't match any character
 * (old Judah/Andrew posts, one-off overrides) are skipped. With no match at
 * all the rotation starts at the top.
 */
export function getNextFridayCharacterIndex(recentTitlesNewestFirst: string[]) {
  for (const title of recentTitlesNewestFirst) {
    const matched = findFridayCharacterIndexByTitle(title);
    if (matched !== null) {
      return (matched + 1) % FRIDAY_CHARACTER_STUDIES.length;
    }
  }
  return 0;
}
