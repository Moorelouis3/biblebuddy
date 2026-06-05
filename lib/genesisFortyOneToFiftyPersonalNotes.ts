export type PersonalGenesisPhraseSectionInput = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

const note = (lines: string[]) => lines.join("\n\n");

type PersonalTextureRule = {
  matches: string[];
  lines: string[];
};

type PersonalSectionSplit = {
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  phraseIndexes: number[];
};

const SECTION_SPLITS: Record<string, PersonalSectionSplit[]> = {
  "Genesis 41:1-13": [
    { startVerse: 1, endVerse: 8, reference: "Genesis 41:1-8", title: "Pharaoh's Troubling Dreams", phraseIndexes: [0, 1] },
    { startVerse: 9, endVerse: 13, reference: "Genesis 41:9-13", title: "The Butler Remembers Joseph", phraseIndexes: [2] },
  ],
  "Genesis 41:14-24": [
    { startVerse: 14, endVerse: 16, reference: "Genesis 41:14-16", title: "Joseph Is Brought From Prison", phraseIndexes: [0, 1] },
    { startVerse: 17, endVerse: 24, reference: "Genesis 41:17-24", title: "Pharaoh Retells The Dreams", phraseIndexes: [2] },
  ],
  "Genesis 41:25-36": [
    { startVerse: 25, endVerse: 32, reference: "Genesis 41:25-32", title: "God Reveals The Meaning", phraseIndexes: [0, 1] },
    { startVerse: 33, endVerse: 36, reference: "Genesis 41:33-36", title: "Joseph Gives A Wise Plan", phraseIndexes: [2] },
  ],
  "Genesis 41:37-57": [
    { startVerse: 37, endVerse: 45, reference: "Genesis 41:37-45", title: "Joseph Is Raised Over Egypt", phraseIndexes: [0, 1] },
    { startVerse: 46, endVerse: 52, reference: "Genesis 41:46-52", title: "Joseph Stores Grain And Has Sons", phraseIndexes: [2] },
    { startVerse: 53, endVerse: 57, reference: "Genesis 41:53-57", title: "The Famine Begins", phraseIndexes: [3] },
  ],
  "Genesis 42:1-17": [
    { startVerse: 1, endVerse: 8, reference: "Genesis 42:1-8", title: "The Brothers Bow Before Joseph", phraseIndexes: [0, 1] },
    { startVerse: 9, endVerse: 17, reference: "Genesis 42:9-17", title: "Joseph Tests His Brothers", phraseIndexes: [2] },
  ],
  "Genesis 42:18-28": [
    { startVerse: 18, endVerse: 24, reference: "Genesis 42:18-24", title: "The Brothers Confess Their Guilt", phraseIndexes: [0, 1] },
    { startVerse: 25, endVerse: 28, reference: "Genesis 42:25-28", title: "The Money In The Sacks", phraseIndexes: [2] },
  ],
  "Genesis 43:1-14": [
    { startVerse: 1, endVerse: 10, reference: "Genesis 43:1-10", title: "Judah Pledges Himself", phraseIndexes: [0, 1] },
    { startVerse: 11, endVerse: 14, reference: "Genesis 43:11-14", title: "Jacob Releases Benjamin", phraseIndexes: [2] },
  ],
  "Genesis 43:15-25": [
    { startVerse: 15, endVerse: 18, reference: "Genesis 43:15-18", title: "The Brothers Fear Joseph's House", phraseIndexes: [0] },
    { startVerse: 19, endVerse: 25, reference: "Genesis 43:19-25", title: "The Steward Calms The Brothers", phraseIndexes: [1, 2] },
  ],
  "Genesis 44:1-13": [
    { startVerse: 1, endVerse: 6, reference: "Genesis 44:1-6", title: "Joseph Places The Cup", phraseIndexes: [0] },
    { startVerse: 7, endVerse: 13, reference: "Genesis 44:7-13", title: "Benjamin Is Caught With The Cup", phraseIndexes: [1, 2] },
  ],
  "Genesis 44:14-34": [
    { startVerse: 14, endVerse: 17, reference: "Genesis 44:14-17", title: "Judah Faces Joseph", phraseIndexes: [0] },
    { startVerse: 18, endVerse: 23, reference: "Genesis 44:18-23", title: "Judah Retells Joseph's Demand", phraseIndexes: [1] },
    { startVerse: 24, endVerse: 29, reference: "Genesis 44:24-29", title: "Judah Pleads For His Father", phraseIndexes: [1] },
    { startVerse: 30, endVerse: 34, reference: "Genesis 44:30-34", title: "Judah Offers Himself", phraseIndexes: [2] },
  ],
  "Genesis 45:1-15": [
    { startVerse: 1, endVerse: 8, reference: "Genesis 45:1-8", title: "Joseph Reveals Himself", phraseIndexes: [0, 1, 2] },
    { startVerse: 9, endVerse: 15, reference: "Genesis 45:9-15", title: "Joseph Embraces His Brothers", phraseIndexes: [3] },
  ],
  "Genesis 45:16-28": [
    { startVerse: 16, endVerse: 24, reference: "Genesis 45:16-24", title: "Pharaoh Sends For Jacob's Family", phraseIndexes: [0] },
    { startVerse: 25, endVerse: 28, reference: "Genesis 45:25-28", title: "Jacob Believes Joseph Is Alive", phraseIndexes: [1, 2] },
  ],
  "Genesis 46:8-27": [
    { startVerse: 8, endVerse: 15, reference: "Genesis 46:8-15", title: "Leah's Family Line Goes To Egypt", phraseIndexes: [0] },
    { startVerse: 16, endVerse: 18, reference: "Genesis 46:16-18", title: "Zilpah's Family Line Goes To Egypt", phraseIndexes: [0] },
    { startVerse: 19, endVerse: 27, reference: "Genesis 46:19-27", title: "Rachel's Line And The Seventy", phraseIndexes: [1] },
  ],
  "Genesis 47:1-12": [
    { startVerse: 1, endVerse: 6, reference: "Genesis 47:1-6", title: "Pharaoh Gives Israel Goshen", phraseIndexes: [0] },
    { startVerse: 7, endVerse: 12, reference: "Genesis 47:7-12", title: "Jacob Blesses Pharaoh", phraseIndexes: [1, 2] },
  ],
  "Genesis 47:13-26": [
    { startVerse: 13, endVerse: 19, reference: "Genesis 47:13-19", title: "Egypt Runs Out Of Bread", phraseIndexes: [0, 1] },
    { startVerse: 20, endVerse: 26, reference: "Genesis 47:20-26", title: "Joseph Preserves Egypt", phraseIndexes: [2] },
  ],
  "Genesis 48:8-22": [
    { startVerse: 8, endVerse: 16, reference: "Genesis 48:8-16", title: "Jacob Blesses Joseph's Sons", phraseIndexes: [0] },
    { startVerse: 17, endVerse: 22, reference: "Genesis 48:17-22", title: "Ephraim Receives The Greater Blessing", phraseIndexes: [1, 2] },
  ],
  "Genesis 49:8-21": [
    { startVerse: 8, endVerse: 12, reference: "Genesis 49:8-12", title: "Judah Receives The Royal Promise", phraseIndexes: [0, 1, 2] },
    { startVerse: 13, endVerse: 21, reference: "Genesis 49:13-21", title: "Jacob Speaks Over The Other Sons", phraseIndexes: [2] },
  ],
  "Genesis 49:22-33": [
    { startVerse: 22, endVerse: 26, reference: "Genesis 49:22-26", title: "Joseph Is Blessed", phraseIndexes: [0, 1, 2] },
    { startVerse: 27, endVerse: 33, reference: "Genesis 49:27-33", title: "Jacob Gives Burial Instructions And Dies", phraseIndexes: [3] },
  ],
  "Genesis 50:1-14": [
    { startVerse: 1, endVerse: 9, reference: "Genesis 50:1-9", title: "Egypt Mourns Jacob", phraseIndexes: [0, 1] },
    { startVerse: 10, endVerse: 14, reference: "Genesis 50:10-14", title: "Jacob Is Buried In Canaan", phraseIndexes: [2] },
  ],
};

function expandSplitSections(sections: PersonalGenesisPhraseSectionInput[]) {
  return sections.flatMap((section) => {
    const splits = SECTION_SPLITS[section.reference];
    if (!splits) {
      return [section];
    }

    return splits.map((split) => ({
      ...section,
      startVerse: split.startVerse,
      endVerse: split.endVerse,
      reference: split.reference,
      title: split.title,
      phrases: split.phraseIndexes.map((index) => section.phrases[index]).filter(Boolean),
    }));
  });
}

const GENESIS_41_50_TEXTURE_RULES: PersonalTextureRule[] = [
  {
    matches: ["two full years", "pharaoh", "dream was doubled", "spirit of god", "ring"],
    lines: [
      "Joseph's rise is sudden, but it is not random:",
      "⏳ Two more years waiting.",
      "🌙 Pharaoh dreams.",
      "🙋 The butler remembers.",
      "🙌 Joseph gives God the credit.",
      "💍 Authority is placed in his hand.",
      "God has been preparing Joseph before Egypt ever knew it needed him.",
    ],
  },
  {
    matches: ["manasseh", "ephraim", "all countries"],
    lines: [
      "Joseph's new life carries memory and mercy together:",
      "👶 Manasseh names relief from old grief.",
      "🌱 Ephraim names fruitfulness in affliction.",
      "🌾 Grain fills Egypt.",
      "🌍 Nations come for bread.",
      "The pain is not erased, but God makes Joseph fruitful inside the land where he suffered.",
    ],
  },
  {
    matches: ["bowed down", "ye are spies", "we are verily guilty", "money is restored", "benjamin"],
    lines: [
      "The brothers are being brought back through the wound they made:",
      "🙇 They bow without knowing Joseph.",
      "🕵️ They are tested.",
      "💔 Old guilt starts speaking.",
      "💰 Returned money scares them.",
      "👦 Benjamin becomes the pressure point.",
      "God is not only saving their bodies from famine. He is exposing their hearts.",
    ],
  },
  {
    matches: ["judah said", "surety", "god almighty", "joseph made haste"],
    lines: [
      "Genesis lets you see change starting in the family:",
      "🧍 Judah steps forward.",
      "🤝 He offers himself as surety.",
      "🙏 Jacob releases Benjamin with prayer.",
      "😭 Joseph feels the emotion rising.",
      "The story is moving from denial toward truth, but it takes pressure to bring it out.",
    ],
  },
  {
    matches: ["cup", "rent their clothes", "judah came near", "instead of the lad"],
    lines: [
      "Judah's plea is one of the great reversals in Genesis:",
      "🥣 The cup exposes Benjamin.",
      "👕 The brothers tear their clothes.",
      "🗣️ Judah speaks honestly.",
      "👦 Benjamin is protected.",
      "🧍 Judah offers himself instead.",
      "The man who once helped sell a brother is now willing to become a substitute for one.",
    ],
  },
  {
    matches: ["i am joseph", "god did send me", "not you", "goshen", "my son joseph"],
    lines: [
      "The reveal is full of tears and theology:",
      "😭 Joseph can no longer hold back.",
      "😨 The brothers are afraid.",
      "🙌 Joseph names God's purpose.",
      "🤗 Reconciliation begins.",
      "🚚 The family is invited to Egypt.",
      "Forgiveness here does not deny evil. It sees God's saving hand above it.",
    ],
  },
  {
    matches: ["beersheba", "fear not to go down", "seventy souls", "judah before him"],
    lines: [
      "Jacob's move to Egypt is guided by promise:",
      "🛕 Sacrifice at Beersheba.",
      "🌙 God speaks in visions.",
      "⬇️ Do not fear going down.",
      "👨‍👩‍👧‍👦 The seventy go as a family seed.",
      "📍 Judah leads the way to Goshen.",
      "Egypt is not the final home, but God goes with them into the next chapter of the story.",
    ],
  },
  {
    matches: ["pharaoh", "pilgrimage", "goshen", "there was no bread", "fifth part"],
    lines: [
      "Genesis 47 holds blessing and pressure together:",
      "🏞️ Israel receives Goshen.",
      "🙌 Jacob blesses Pharaoh.",
      "🧓 Jacob calls his years a pilgrimage.",
      "🍞 Egypt runs out of bread.",
      "📜 Joseph reorganizes the land for survival.",
      "The promise family is preserved, but the famine world is still costly and severe.",
    ],
  },
  {
    matches: ["crossing his hands", "ephraim", "manasseh", "angel which redeemed me"],
    lines: [
      "Jacob's crossed hands fit the whole Genesis pattern:",
      "🙌 The blessing is deliberate.",
      "🔁 The younger is placed before the older.",
      "🧒 Joseph tries to correct it.",
      "📣 Jacob insists.",
      "God's blessing keeps moving by promise, not by normal human ordering.",
    ],
  },
  {
    matches: ["shiloh", "judah", "fruitful bough", "archers", "gathered up his feet"],
    lines: [
      "Jacob's final words look backward and forward:",
      "🦁 Judah receives royal hope.",
      "🌿 Joseph is pictured as fruitful.",
      "🏹 Old wounds are remembered.",
      "💪 God-given strength is named.",
      "⚰️ Jacob dies trusting the family promise.",
      "The blessings turn twelve sons into the beginnings of Israel's tribes.",
    ],
  },
  {
    matches: ["evil against me", "god meant it", "surely visit you", "my bones"],
    lines: [
      "Genesis closes with grief, forgiveness, and hope:",
      "💔 Jacob is mourned.",
      "🤲 Joseph refuses revenge.",
      "🌱 God turns evil toward preservation.",
      "📣 Joseph says God will surely visit.",
      "⚰️ His bones wait for the Exodus.",
      "The book ends in Egypt, but its faith is facing Canaan.",
    ],
  },
];

function addGenesisFortyOneToFiftyTexture(title: string, content: string) {
  const lower = title.toLowerCase();
  const rule = GENESIS_41_50_TEXTURE_RULES.find((item) => item.matches.some((match) => lower.includes(match)));

  if (!rule) {
    return content;
  }

  return `${content}\n\n${note(rule.lines)}`;
}

function addGenesisFortyOneToFiftySectionTexture(sections: PersonalGenesisPhraseSectionInput[]) {
  return sections.map((section) => ({
    ...section,
    phrases: section.phrases.map(([title, content]) => [title, addGenesisFortyOneToFiftyTexture(title, content)] as [string, string]),
  }));
}

const RAW_GENESIS_41_50_PERSONAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  {
    chapter: 41,
    startVerse: 1,
    endVerse: 13,
    reference: "Genesis 41:1-13",
    title: "Pharaoh Dreams And The Butler Remembers",
    icon: "🌙",
    phrases: [
      ["⏳ At The End Of Two Full Years", note(["Joseph stays in prison two more years after helping the butler.", "That delay matters because Joseph did nothing wrong, yet he is still waiting.", "The phrase makes the waiting feel long on purpose.", "God is not absent during those two years.", "He is lining Joseph's release up with Pharaoh's crisis.", "Joseph is forgotten by man until the exact moment God is ready to raise him."])],
      ["🐄 Seven Well Favoured Kine", note(["Pharaoh dreams of seven healthy cows coming up from the Nile.", "In Egypt, the Nile was tied to food, farming, and survival.", "Healthy cows would picture abundance in a way Pharaoh could understand.", "The dream uses Egyptian images, but the message comes from God.", "This matters because the Lord can speak into any kingdom, even Egypt.", "Pharaoh's power does not make him greater than God's warning."])],
      ["🧠 I Do Remember My Faults This Day", note(["The butler finally remembers Joseph.", "He calls his forgetfulness a fault because Joseph had asked to be remembered.", "This small confession changes Joseph's life.", "The man who forgot him now becomes the person who mentions him to Pharaoh.", "God can use even delayed memory in His timing.", "The prison door begins to open through a conversation Joseph cannot control."])],
    ],
  },
  {
    chapter: 41,
    startVerse: 14,
    endVerse: 24,
    reference: "Genesis 41:14-24",
    title: "Joseph Stands Before Pharaoh",
    icon: "👑",
    phrases: [
      ["🪒 Shaved Himself, And Changed His Raiment", note(["Joseph prepares to stand before Pharaoh by shaving and changing clothes.", "Egyptian customs often valued clean shaving, especially in formal settings.", "The clothing change also matters because Joseph's story has been marked by garments.", "His special coat was taken, his garment was used against him, and now he changes clothes before a new assignment.", "This is not just a cleanup detail.", "Joseph is moving from prison shame toward public service."])],
      ["🙌 It Is Not In Me", note(["Joseph refuses to take credit for interpreting dreams.", "He tells Pharaoh that the answer belongs to God.", "That is bold because Pharaoh is the most powerful man in Egypt.", "Joseph could have tried to impress him, but he points higher than himself.", "This phrase shows Joseph's humility and faith.", "Even after years of suffering, he still knows God is the source of truth."])],
      ["😨 I Have Dreamed A Dream", note(["Pharaoh repeats the dream because it disturbed him deeply.", "Powerful people still have fears they cannot solve.", "Pharaoh has magicians and wise men, but none can answer him.", "The king of Egypt needs truth from the God Joseph serves.", "This sets up a major reversal.", "The prisoner will explain what the palace cannot understand."])],
    ],
  },
  {
    chapter: 41,
    startVerse: 25,
    endVerse: 36,
    reference: "Genesis 41:25-36",
    title: "Joseph Explains The Famine",
    icon: "🌾",
    phrases: [
      ["📢 God Hath Shewed Pharaoh What He Is About To Do", note(["Joseph says the dream is God's warning about the future.", "This means the famine is not a random event outside God's knowledge.", "God is revealing it ahead of time so people can prepare.", "Pharaoh may rule Egypt, but God rules over the years of plenty and famine.", "The phrase also shows mercy.", "A warning before disaster gives people time to act wisely."])],
      ["🔁 The Dream Was Doubled", note(["Pharaoh had two dreams with the same meaning.", "Joseph explains that the repetition shows the matter is fixed by God.", "In the Bible, repeated messages often underline certainty and importance.", "God is not giving Pharaoh a vague possibility.", "He is announcing something established.", "The doubling tells Pharaoh to take the warning seriously."])],
      ["🧠 A Man Discreet And Wise", note(["Joseph does more than explain the dream; he gives a plan.", "He says Egypt needs a wise leader to store grain during the years of plenty.", "This shows that biblical wisdom is practical.", "Understanding God's warning should lead to action.", "Joseph's years managing Potiphar's house and the prison have prepared him for this moment.", "God was training him before anyone in Egypt knew his name."])],
    ],
  },
  {
    chapter: 41,
    startVerse: 37,
    endVerse: 57,
    reference: "Genesis 41:37-57",
    title: "Joseph Rises To Power",
    icon: "📈",
    phrases: [
      ["🕊️ A Man In Whom The Spirit Of God Is", note(["Pharaoh recognizes that Joseph has a divine wisdom beyond normal ability.", "He may not understand the Lord fully, but he sees that Joseph is different.", "This is remarkable because Joseph is a Hebrew former slave and prisoner.", "God's presence on Joseph becomes visible in a pagan court.", "The phrase shows that spiritual wisdom can be recognized even by outsiders.", "Joseph's gift opens a door no human status could have opened."])],
      ["💍 Pharaoh Took Off His Ring", note(["The ring represents authority to act in Pharaoh's name.", "Giving it to Joseph means Pharaoh is placing real power in his hands.", "Joseph goes from prison to second in command of Egypt in one day.", "This reversal is one of the most dramatic in Genesis.", "But it did not come out of nowhere.", "God used years of suffering, service, and faithfulness to prepare Joseph for authority."])],
      ["👶 Manasseh And Ephraim", note(["Joseph names his sons in a way that tells his story.", "Manasseh is connected with God helping him forget the pain of his father's house.", "Ephraim is connected with fruitfulness in the land of his suffering.", "Joseph is not denying what happened to him.", "He is saying God has been merciful inside the pain.", "His children's names become testimonies of healing and blessing."])],
      ["🌍 All Countries Came Into Egypt", note(["The famine reaches beyond Egypt.", "People from surrounding lands come to buy grain because Egypt has food stored.", "This matters because Joseph's rise is not only for Egypt's survival.", "It will also save his own family.", "God has placed Joseph in power before the family even knows they need him.", "The rejected brother is becoming the means of rescue."])],
    ],
  },
  {
    chapter: 42,
    startVerse: 1,
    endVerse: 17,
    reference: "Genesis 42:1-17",
    title: "Joseph's Brothers Come To Egypt",
    icon: "🌾",
    phrases: [
      ["🌾 Buy For Us From Thence", note(["Jacob sends his sons to Egypt because the famine has reached Canaan.", "The family of promise is now dependent on grain from the very place Joseph was taken.", "They do not know Joseph is alive, and they certainly do not know he is in power.", "This is God's providence working under the surface.", "The brothers travel for food, but God is bringing them face to face with their past.", "Survival and repentance are about to meet in the same story."])],
      ["🙇 Joseph's Brethren Came, And Bowed Down", note(["The brothers bow before Joseph without recognizing him.", "This fulfills the dreams they hated years earlier.", "They once tried to stop the dream by selling the dreamer.", "But their actions actually helped move Joseph toward the place where the dream would come true.", "This phrase shows that God's purpose cannot be canceled by human jealousy.", "The bowing is not revenge; it is revelation unfolding."])],
      ["🕵️ Ye Are Spies", note(["Joseph accuses his brothers of being spies as part of a test.", "He is not confused about who they are.", "He is testing their honesty, unity, and attitude toward Benjamin and Jacob.", "The brothers once sold him when they had power over him.", "Now Joseph has power over them.", "The question is whether they are still the same men."])],
    ],
  },
  {
    chapter: 42,
    startVerse: 18,
    endVerse: 28,
    reference: "Genesis 42:18-28",
    title: "The Brothers Remember Their Sin",
    icon: "😔",
    phrases: [
      ["🙌 I Fear God", note(["Joseph tells his brothers that he fears God.", "They still do not recognize him, but this statement reveals the moral frame behind his actions.", "Joseph is powerful, but he is not acting like a cruel tyrant.", "Fear of God means he knows he is accountable to someone higher than Pharaoh and higher than himself.", "That matters because power without accountability becomes dangerous.", "Joseph's authority is restrained by reverence for God."])],
      ["🩸 We Are Verily Guilty Concerning Our Brother", note(["The brothers connect their current distress to what they did to Joseph.", "Years have passed, but guilt has not disappeared.", "They remember seeing Joseph's anguish and refusing to listen.", "This is the first real sign that their consciences are waking up.", "Joseph hears them speak honestly without knowing he understands.", "The hidden wound in the family is finally being named."])],
      ["💰 My Money Is Restored", note(["The returned money terrifies the brothers.", "Instead of feeling lucky, they feel exposed and afraid.", "Their guilt makes every strange event feel like judgment.", "This shows how unresolved sin affects the way people interpret life.", "Even a gift can feel threatening when the conscience is heavy.", "The brothers are beginning to feel the weight of being powerless."])],
    ],
  },
  {
    chapter: 42,
    startVerse: 29,
    endVerse: 38,
    reference: "Genesis 42:29-38",
    title: "Jacob Refuses To Send Benjamin",
    icon: "💔",
    phrases: [
      ["💔 Me Have Ye Bereaved Of My Children", note(["Jacob believes he has already lost Joseph and now fears losing Simeon and Benjamin.", "His grief speaks through this line.", "He does not know Joseph is alive, so his world is shaped by the lie his sons told years ago.", "The brothers' sin has kept their father in pain for a long time.", "This phrase shows that deception does not only hurt the person directly betrayed.", "It can shape a whole family for years."])],
      ["👦 My Son Shall Not Go Down With You", note(["Jacob refuses to send Benjamin to Egypt.", "Benjamin is Rachel's remaining son in Jacob's eyes, and Jacob is terrified of losing him.", "This favoritism echoes the Joseph story.", "The family is still organized around Jacob's fear and special attachment to Rachel's children.", "The famine is forcing the family toward a decision Jacob does not want to make.", "God is using the crisis to bring hidden wounds back into the light."])],
      ["🪦 Then Shall Ye Bring Down My Gray Hairs With Sorrow", note(["Jacob believes losing Benjamin would kill him with grief.", "This is not exaggerated drama to him; it is how fragile his heart has become.", "He has lived for years under the belief that Joseph is dead.", "Now the thought of losing Benjamin feels unbearable.", "The phrase helps us understand why Judah's later offer will matter so much.", "Someone will have to care about Jacob's grief more than his own safety."])],
    ],
  },
  {
    chapter: 43,
    startVerse: 1,
    endVerse: 14,
    reference: "Genesis 43:1-14",
    title: "Judah Offers Himself For Benjamin",
    icon: "🤲",
    phrases: [
      ["🌾 The Famine Was Sore", note(["The famine forces the family to face the issue again.", "They cannot avoid Egypt forever because the food runs out.", "God often uses pressure to move people toward what they have been avoiding.", "Jacob does not want to risk Benjamin, but survival now requires a decision.", "The famine is not only about hunger.", "It is pushing the family toward truth, repentance, and reunion."])],
      ["🤲 I Will Be Surety For Him", note(["Judah offers to take responsibility for Benjamin.", "This is a major change from the Judah who suggested selling Joseph.", "Surety means he is pledging himself for Benjamin's safety.", "He is willing to bear the blame if Benjamin does not return.", "This shows real growth.", "Judah is becoming the brother who will risk himself instead of sacrificing another son of Rachel."])],
      ["🙏 God Almighty Give You Mercy", note(["Jacob finally releases Benjamin with a prayer for mercy.", "God Almighty is the name connected to God's power over impossible situations.", "Jacob is still afraid, but he places the outcome before God.", "This is not easy trust.", "It is trust mixed with grief and trembling.", "The phrase shows a father surrendering what he cannot control."])],
    ],
  },
  {
    chapter: 43,
    startVerse: 15,
    endVerse: 25,
    reference: "Genesis 43:15-25",
    title: "The Brothers Return To Joseph",
    icon: "🏠",
    phrases: [
      ["🏠 Bring These Men Home", note(["Joseph commands that his brothers be brought to his house.", "The brothers are afraid because they do not understand his intention.", "They think the returned money is being used as a trap.", "This fear shows how guilt still controls their imagination.", "Joseph is preparing a meal, but they expect judgment.", "Grace can feel frightening when people only know they deserve punishment."])],
      ["💰 Your God, And The God Of Your Father, Hath Given You Treasure", note(["Joseph's steward tells the brothers that God gave them the money in their sacks.", "This is surprising because an Egyptian servant speaks about the God of their father.", "Joseph's faith has likely shaped his household.", "The steward's words calm the brothers, but also point them back to God's involvement.", "The situation is not merely Egyptian politics.", "God is working through the whole strange process."])],
      ["🎁 They Made Ready The Present", note(["The brothers prepare gifts for Joseph as they wait for him.", "This echoes Jacob's gifts to Esau before reconciliation.", "They are afraid and trying to approach the powerful man with humility.", "They still do not know they are standing before their brother.", "The gifts cannot fix the old sin by themselves.", "But the posture of humility matters as the story moves toward restoration."])],
    ],
  },
  {
    chapter: 43,
    startVerse: 26,
    endVerse: 34,
    reference: "Genesis 43:26-34",
    title: "Joseph Eats With His Brothers",
    icon: "🍽️",
    phrases: [
      ["🙇 They Bowed Themselves To Him", note(["The brothers bow again before Joseph.", "The dream continues being fulfilled, but they still do not understand it.", "God is letting the meaning unfold slowly.", "Joseph sees what his brothers do not see.", "The bowing is not only about authority; it is about God's word proving true over time.", "The dream they hated has become the scene they are living."])],
      ["😭 Joseph Made Haste; For His Bowels Did Yearn", note(["Joseph is overwhelmed when he sees Benjamin.", "The phrase means deep emotion rises inside him.", "Joseph is not cold or detached in this testing process.", "He is carrying years of pain, love, memory, and longing.", "He leaves the room to weep privately.", "This shows that wisdom and emotion can exist together in the same person."])],
      ["🍽️ Benjamin's Mess Was Five Times So Much", note(["Joseph gives Benjamin a much larger portion than the others.", "This may be another test of the brothers' jealousy.", "Years earlier, Joseph's special treatment helped fuel their hatred.", "Now Benjamin receives special honor in front of them.", "The question is whether they will resent another favored son of Rachel.", "The story is testing whether the brothers have changed."])],
    ],
  },
  {
    chapter: 44,
    startVerse: 1,
    endVerse: 13,
    reference: "Genesis 44:1-13",
    title: "Benjamin Is Tested",
    icon: "🥈",
    phrases: [
      ["🥈 Put My Cup In The Sack's Mouth", note(["Joseph has his silver cup placed in Benjamin's sack.", "This creates the final test.", "The brothers once let Joseph be taken away while they went home without him.", "Now Benjamin is the one in danger of being kept in Egypt.", "The situation repeats the old wound in a new form.", "Joseph is testing whether they will abandon Rachel's other son too."])],
      ["😨 Wherefore Have Ye Rewarded Evil For Good?", note(["Joseph's steward confronts the brothers with a serious accusation.", "They had been treated with a meal and kindness, and now they appear guilty of theft.", "The brothers are confused because they know they did not steal the cup.", "But the accusation places them in a position of helplessness.", "They are feeling what it is like to be falsely trapped.", "The test is pressing their character into the open."])],
      ["💔 They Rent Their Clothes", note(["The brothers tear their clothes when the cup is found in Benjamin's sack.", "This is a sign of grief and shock.", "Years earlier, Joseph's coat was torn from him and Jacob tore his clothes in grief.", "Now the brothers themselves tear their clothes.", "The story is turning old pain back toward them.", "Their reaction shows they are not casually abandoning Benjamin."])],
    ],
  },
  {
    chapter: 44,
    startVerse: 14,
    endVerse: 34,
    reference: "Genesis 44:14-34",
    title: "Judah Stands In The Gap",
    icon: "🛡️",
    phrases: [
      ["⚖️ God Hath Found Out The Iniquity Of Thy Servants", note(["Judah speaks as if their guilt has finally caught up with them.", "He knows they did not steal the cup, but he also knows there is older guilt in the family.", "This line shows a conscience that has been awakened.", "Judah sees the crisis as more than a misunderstanding.", "God is bringing hidden sin into the open.", "The brothers cannot outrun what they did to Joseph forever."])],
      ["👦 His Life Is Bound Up In The Lad's Life", note(["Judah explains how deeply Jacob's life is tied to Benjamin.", "This matters because Judah now cares about his father's grief.", "Years earlier, the brothers let Jacob believe Joseph was dead.", "Now Judah cannot bear to bring Jacob another crushing loss.", "The phrase shows compassion where there had once been cruelty.", "Judah is becoming a different man."])],
      ["🤲 Let Thy Servant Abide Instead Of The Lad", note(["Judah offers himself in Benjamin's place.", "This is the turning point of the test.", "The brother who once helped sell Joseph now offers to become a slave to save Benjamin.", "That is real change.", "Judah stands in the gap for another son of Rachel instead of resenting him.", "This act points forward to the biblical theme of substitution, where one gives himself for another."])],
    ],
  },
  {
    chapter: 45,
    startVerse: 1,
    endVerse: 15,
    reference: "Genesis 45:1-15",
    title: "Joseph Reveals Himself",
    icon: "😭",
    phrases: [
      ["😭 Joseph Could Not Refrain Himself", note(["Joseph can no longer hold back his emotions.", "Judah's speech has shown that the brothers have changed.", "The test has reached its purpose.", "Joseph sends the Egyptians out and reveals himself privately to his brothers.", "This moment is full of fear, shock, grief, and mercy.", "The hidden brother is finally known."])],
      ["👋 I Am Joseph", note(["These words must have hit the brothers like a thunderclap.", "The powerful Egyptian ruler is the brother they sold.", "Their past is suddenly standing in front of them alive.", "Joseph does not begin with revenge.", "He begins by naming himself and asking about his father.", "The phrase brings years of guilt, grief, and mystery into one moment."])],
      ["🙌 God Did Send Me Before You", note(["Joseph interprets his suffering through God's providence.", "He does not deny that his brothers sinned.", "But he sees that God was working through what they meant for harm.", "God sent Joseph ahead to preserve life during famine.", "This is one of the clearest statements of providence in Genesis.", "Human evil was real, but God's saving purpose was greater."])],
      ["🤗 He Kissed All His Brethren", note(["Joseph embraces and kisses his brothers after revealing himself.", "This shows forgiveness becoming personal, not only theological.", "The brothers are no longer just guilty men before a ruler.", "They are family being received by the brother they wronged.", "The scene does not erase the past.", "It shows mercy strong enough to move toward the people who caused the pain."])],
    ],
  },
  {
    chapter: 45,
    startVerse: 16,
    endVerse: 28,
    reference: "Genesis 45:16-28",
    title: "Jacob Hears Joseph Is Alive",
    icon: "📢",
    phrases: [
      ["🛒 Take You Wagons", note(["Pharaoh sends wagons to bring Jacob's family to Egypt.", "This is a major shift: Egypt becomes a place of rescue for the family of promise.", "The wagons are practical proof that Joseph is alive and powerful.", "They also help move the whole household during famine.", "God is using Egypt's resources to preserve Abraham's descendants.", "The family will survive because Joseph was sent ahead."])],
      ["😶 Jacob's Heart Fainted", note(["Jacob is stunned when he hears Joseph is alive.", "For years he believed Joseph was dead.", "The news is so overwhelming that he cannot immediately receive it.", "This is how grief can work when hope suddenly returns.", "Jacob's heart has lived under a lie for a long time.", "Now truth is breaking into his sorrow."])],
      ["👀 It Is Enough; Joseph My Son Is Yet Alive", note(["Jacob finally believes the report when he sees the wagons.", "His grief turns into urgent hope.", "He does not need every detail before deciding to go see Joseph.", "The phrase is deeply human: one thing matters most to him now.", "His son is alive.", "The father who mourned for years is going to see the child he thought he lost."])],
    ],
  },
  {
    chapter: 46,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 46:1-7",
    title: "God Sends Jacob To Egypt",
    icon: "🧭",
    phrases: [
      ["📍 Beer-sheba", note(["Jacob stops at Beersheba before going down to Egypt.", "This place is connected with Abraham and Isaac, so the stop carries family memory.", "Jacob is leaving the promised land during famine, and that is a serious move.", "Before going farther, he worships.", "This matters because he needs God's assurance, not only Joseph's invitation.", "The journey to Egypt begins with sacrifice."])],
      ["🌙 God Spake Unto Israel In The Visions Of The Night", note(["God speaks to Jacob at night and calls him by name.", "The name Israel reminds us of Jacob's God-given identity.", "God does not leave Jacob guessing about the move to Egypt.", "He gives assurance before the family leaves the land.", "This matters because Egypt will become both a place of preservation and later oppression.", "God is already ruling over the whole journey."])],
      ["🙌 Fear Not To Go Down Into Egypt", note(["God tells Jacob not to fear going to Egypt.", "That matters because the promised land is Canaan, not Egypt.", "Jacob could wonder if leaving Canaan means leaving the promise.", "God assures him that He will make him a great nation there.", "Egypt is not the end of the promise.", "It becomes the place where the family grows into a people."])],
    ],
  },
  {
    chapter: 46,
    startVerse: 8,
    endVerse: 27,
    reference: "Genesis 46:8-27",
    title: "The Family Goes Down To Egypt",
    icon: "👨‍👩‍👧",
    phrases: [
      ["📜 These Are The Names", note(["Genesis lists the family members who go to Egypt.", "The list may feel slow, but it matters because this household will become Israel.", "God's promise to Abraham about descendants is taking shape through real names.", "These are not faceless numbers.", "They are families, sons, daughters, and generations.", "The nation begins as a household carried into Egypt by God's providence."])],
      ["👥 Threescore And Ten", note(["The number seventy describes Jacob's family going into Egypt.", "Seventy gives a sense of fullness and completeness.", "The family is still small compared with a nation, but it is no longer just one couple waiting for a child.", "God has multiplied Abraham's line across generations.", "The promise is growing, but it still has far to go.", "Egypt will become the place where this family increases greatly."])],
    ],
  },
  {
    chapter: 46,
    startVerse: 28,
    endVerse: 34,
    reference: "Genesis 46:28-34",
    title: "Jacob And Joseph Reunite",
    icon: "🤗",
    phrases: [
      ["😭 He Fell On His Neck, And Wept", note(["Joseph and Jacob finally reunite after years of grief.", "Joseph weeps on his father's neck for a long time.", "This is one of the most emotional scenes in Genesis.", "The father who thought Joseph was dead now holds him alive.", "God's providence is not cold or mechanical here.", "It restores a family relationship that seemed impossible to recover."])],
      ["✅ Now Let Me Die", note(["Jacob says he can die now that he has seen Joseph alive.", "This does not mean he wants immediate death.", "It means his deepest grief has been answered.", "The wound he carried for years is finally touched by mercy.", "Jacob's words show the relief of seeing with his own eyes what he never thought possible.", "The story of loss has become a story of reunion."])],
      ["🐑 Thy Servants Are Shepherds", note(["Joseph prepares his family to tell Pharaoh they are shepherds.", "Egyptians looked down on shepherds, but this helps Joseph settle them in Goshen.", "Goshen will give them space for their flocks and keep them somewhat distinct from Egyptian culture.", "This matters because Israel will grow in Egypt without fully becoming Egypt.", "God preserves the family not only from famine but also as a distinct people.", "Their identity is being protected."])],
    ],
  },
  {
    chapter: 47,
    startVerse: 1,
    endVerse: 12,
    reference: "Genesis 47:1-12",
    title: "Jacob's Family Settles In Goshen",
    icon: "🏡",
    phrases: [
      ["📍 The Land Of Goshen", note(["Goshen becomes the place where Jacob's family settles in Egypt.", "It is good land for their flocks and separate enough for them to remain distinct.", "This matters because the family is being preserved during famine.", "They are in Egypt, but they are not swallowed up by Egypt.", "Goshen becomes a place of provision now and a major location in the Exodus story later.", "God is placing His people where they can survive and grow."])],
      ["🙌 Jacob Blessed Pharaoh", note(["Jacob blesses Pharaoh, even though Pharaoh is the ruler of Egypt.", "That is surprising because Pharaoh has more political power.", "But Jacob carries the covenant blessing of God.", "In Genesis, the promise to Abraham said his family would be a blessing to others.", "Here the aged patriarch blesses the king who shelters his family.", "Spiritual significance is not measured only by worldly power."])],
      ["⏳ Few And Evil Have The Days Of The Years Of My Life Been", note(["Jacob describes his life as short and difficult compared with his fathers.", "He is honest about the pain he has lived through.", "His life has included exile, family conflict, grief, fear, and loss.", "Faith does not require him to pretend it was easy.", "Yet he is still standing in Pharaoh's court because God preserved him.", "Jacob's words hold sorrow and survival together."])],
    ],
  },
  {
    chapter: 47,
    startVerse: 13,
    endVerse: 26,
    reference: "Genesis 47:13-26",
    title: "Joseph Manages The Famine",
    icon: "🏦",
    phrases: [
      ["🍞 There Was No Bread In All The Land", note(["The famine becomes extremely severe.", "This confirms the dreams Pharaoh had and Joseph interpreted.", "Egypt's survival now depends on the preparation God gave through Joseph.", "The phrase reminds us that famine is not a small background problem.", "People are desperate for food, and entire societies are being reshaped.", "Joseph's wisdom becomes the difference between collapse and survival."])],
      ["💰 Joseph Gathered Up All The Money", note(["Joseph manages Egypt's economy during the famine.", "The people first pay money for grain, then livestock, then land.", "This section can feel uncomfortable because the crisis changes the whole structure of Egyptian life.", "Genesis is showing the severity of famine and the power Joseph holds.", "Joseph preserves life, but Egypt also becomes more centralized under Pharaoh.", "The Bible reports the complexity without making the scene simplistic."])],
      ["🌱 Thou Hast Saved Our Lives", note(["The Egyptians recognize that Joseph's policy has kept them alive.", "Their words show gratitude in the middle of a hard arrangement.", "The famine has cost them much, but they are not dead.", "This matters because Joseph's calling is preservation.", "He was sent ahead to save many lives, not only his own family.", "God's work through Joseph reaches an entire nation."])],
    ],
  },
  {
    chapter: 47,
    startVerse: 27,
    endVerse: 31,
    reference: "Genesis 47:27-31",
    title: "Jacob Makes Joseph Promise",
    icon: "⚰️",
    phrases: [
      ["📈 They Had Possessions Therein, And Grew, And Multiplied Exceedingly", note(["Jacob's family grows in Goshen during the famine years.", "This is important because the promise is still advancing while they live in Egypt.", "God said He would make Jacob a great nation there.", "Now the family is multiplying.", "Egypt is not only a place of shelter.", "It becomes the place where Israel increases toward nationhood."])],
      ["⚰️ Bury Me Not, I Pray Thee, In Egypt", note(["Jacob does not want to be buried in Egypt.", "This shows that his heart is still tied to the promised land.", "He may live in Egypt, but he does not see Egypt as the final home of the promise.", "Burial in Canaan is an act of faith.", "Jacob wants his bones to testify that the family belongs to the land God promised.", "Even near death, he is thinking covenantally."])],
    ],
  },
  {
    chapter: 48,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 48:1-7",
    title: "Jacob Remembers God's Promise",
    icon: "📜",
    phrases: [
      ["🙌 God Almighty Appeared Unto Me At Luz", note(["Jacob remembers when God met him at Bethel, formerly called Luz.", "This memory matters because Jacob is near death and looking back over the promise.", "God's appearance there shaped his whole life.", "Jacob does not begin by talking about his own success.", "He begins with God's promise and blessing.", "The old man is still anchored in what God said."])],
      ["👦 Ephraim And Manasseh Shall Be Mine", note(["Jacob adopts Joseph's two sons into the inheritance line.", "This means Ephraim and Manasseh will be treated like Jacob's own sons.", "That is why later Israel has tribes named Ephraim and Manasseh.", "Joseph receives a double portion through his sons.", "This is a major family and covenant decision.", "The sons born in Egypt are being claimed as part of Israel."])],
      ["🪦 Rachel Died By Me", note(["Jacob remembers Rachel's death as he speaks to Joseph.", "This moment is tender because Joseph is Rachel's son.", "Jacob's grief for Rachel still lives in him after many years.", "The mention helps explain the emotion behind Joseph and his sons receiving special attention.", "Family history, love, and sorrow all meet in this blessing scene.", "Genesis lets old wounds remain visible even at the end of Jacob's life."])],
    ],
  },
  {
    chapter: 48,
    startVerse: 8,
    endVerse: 22,
    reference: "Genesis 48:8-22",
    title: "Jacob Blesses Joseph's Sons",
    icon: "🙌",
    phrases: [
      ["🙌 The God Which Fed Me All My Life Long", note(["Jacob describes God as the One who shepherded him all his life.", "That is a beautiful statement from a man whose life was messy and hard.", "Jacob knows he survived because God guided, corrected, protected, and provided for him.", "The word carries the idea of a shepherd caring for sheep.", "Jacob looks back and sees God's hand over the whole journey.", "Even his difficult life was not unmanaged."])],
      ["✋ Guiding His Hands Wittingly", note(["Jacob crosses his hands intentionally when blessing Ephraim and Manasseh.", "Joseph thinks it is a mistake because Manasseh is the firstborn.", "But Jacob knows what he is doing.", "Once again Genesis shows God working against normal birth order expectations.", "The younger receives the greater blessing.", "Jacob, who lived that reversal himself, now passes blessing with understanding."])],
      ["👦 Ephraim Shall Be Greater", note(["Jacob says Ephraim will become greater than Manasseh.", "This points forward to the later strength of the tribe of Ephraim in Israel's history.", "The blessing is not based on Joseph's preference.", "It follows God's pattern of choosing in surprising ways.", "Genesis keeps reminding us that promise does not move by human custom alone.", "God is free to bless according to His purpose."])],
    ],
  },
  {
    chapter: 49,
    startVerse: 1,
    endVerse: 7,
    reference: "Genesis 49:1-7",
    title: "Jacob Speaks Over Reuben, Simeon, And Levi",
    icon: "📢",
    phrases: [
      ["📢 That I May Tell You That Which Shall Befall You", note(["Jacob gathers his sons to speak over their future.", "These words are more than ordinary fatherly advice.", "They look ahead to the tribes that will come from these sons.", "Genesis is moving from family story to national future.", "The sons' character and choices matter for what comes next.", "Jacob is speaking as a patriarch near death."])],
      ["💔 Unstable As Water", note(["Reuben is the firstborn, but he loses the leading place because of his sin with Bilhah.", "Unstable as water pictures someone without firmness or self-control.", "Reuben had status, but he did not have the character to carry it well.", "This matters because privilege can be lost through moral failure.", "Being first does not automatically mean being faithful.", "Jacob's words show consequences reaching into the future."])],
      ["⚔️ Instruments Of Cruelty", note(["Jacob remembers Simeon and Levi's violence at Shechem.", "They acted in anger after Dinah was violated, but their revenge was excessive and cruel.", "Jacob refuses to bless that violence as righteous.", "This matters because anger over real wrong can still become sinful.", "Their future will be marked by scattering.", "Genesis shows that justice and cruelty are not the same thing."])],
    ],
  },
  {
    chapter: 49,
    startVerse: 8,
    endVerse: 21,
    reference: "Genesis 49:8-21",
    title: "Judah Receives The Royal Promise",
    icon: "🦁",
    phrases: [
      ["🦁 Judah Is A Lion's Whelp", note(["Judah is compared to a young lion.", "The image points to strength, courage, and royal power.", "This is striking because Judah was deeply flawed earlier in Genesis.", "But he also changed, confessed, and offered himself for Benjamin.", "Jacob's words show Judah rising into leadership among the brothers.", "The royal line will come through him."])],
      ["👑 The Sceptre Shall Not Depart From Judah", note(["The sceptre is a symbol of kingship and rule.", "Jacob says royal authority will be connected to Judah's line.", "This points forward to David, Israel's great king from Judah.", "For Christians, it points even farther to Jesus, the Messiah from the tribe of Judah.", "This is one of the biggest promises in Genesis.", "The family story is now aiming toward a king."])],
      ["🍷 Binding His Foal Unto The Vine", note(["This picture describes abundance so great that vines are common enough to tie animals to.", "Wine and grapes become images of richness and blessing.", "The language is poetic, not a normal farming instruction.", "Jacob is describing Judah's future with images of prosperity.", "The blessing feels bigger than one man.", "It reaches toward the hope of a fruitful kingdom."])],
    ],
  },
  {
    chapter: 49,
    startVerse: 22,
    endVerse: 33,
    reference: "Genesis 49:22-33",
    title: "Joseph Is Blessed And Jacob Dies",
    icon: "🌿",
    phrases: [
      ["🌿 Joseph Is A Fruitful Bough", note(["Joseph is pictured as a fruitful branch by a well.", "That image fits his life.", "He suffered deeply, but he became fruitful in Egypt.", "His life provided food, rescue, and blessing for many.", "The branches running over the wall suggest blessing that extends beyond limits.", "Joseph's pain did not stop God's fruitfulness."])],
      ["🏹 The Archers Have Sorely Grieved Him", note(["Jacob remembers how Joseph was attacked and hated.", "The archers picture enemies who shot at him through betrayal, slavery, accusation, and imprisonment.", "Joseph's life was not easy success.", "He was wounded by people again and again.", "But the next lines show his strength remained because God helped him.", "This phrase honors both his suffering and his endurance."])],
      ["💪 The Arms Of His Hands Were Made Strong", note(["Joseph's strength came from the mighty God of Jacob.", "He did not survive because he was emotionally untouched.", "He survived because God strengthened him.", "This matters because biblical strength is not pretending pain did not happen.", "It is being upheld by God through pain.", "Joseph's life becomes a testimony of endurance under God's hand."])],
      ["⚰️ He Gathered Up His Feet Into The Bed", note(["Jacob finishes blessing his sons and dies.", "The phrase is quiet and physical.", "He gathers himself, breathes his last, and is gathered to his people.", "Genesis has followed Jacob from the womb to his final breath.", "His life was full of struggle, but God's promise carried him.", "Now the story moves fully to the sons who will become Israel's tribes."])],
    ],
  },
  {
    chapter: 50,
    startVerse: 1,
    endVerse: 14,
    reference: "Genesis 50:1-14",
    title: "Jacob Is Buried In Canaan",
    icon: "🪦",
    phrases: [
      ["😭 Joseph Fell Upon His Father's Face", note(["Joseph grieves deeply over Jacob's death.", "Even after all the restoration, death still hurts.", "Joseph is powerful in Egypt, but he is still a son losing his father.", "The Bible does not rush grief.", "It lets us see love expressed through tears.", "Faith and mourning are allowed to stand together."])],
      ["🧴 The Physicians Embalmed Israel", note(["Jacob is embalmed according to Egyptian practice.", "This shows how deeply the family is now connected to Egypt's world.", "But embalming does not mean Jacob belongs to Egypt forever.", "His burial request points back to Canaan.", "The body is prepared in Egypt, but the grave will be in the promised land.", "Jacob's death still testifies to the covenant promise."])],
      ["📍 The Cave Of The Field Of Machpelah", note(["Jacob is buried in the family burial place Abraham bought.", "Sarah, Abraham, Isaac, Rebekah, and Leah were connected to that place.", "This burial ties Jacob back to the promise land and the generations before him.", "It is not only a family tomb.", "It is a statement of faith that Canaan is still home.", "Even from Egypt, the family remembers where God said they belong."])],
    ],
  },
  {
    chapter: 50,
    startVerse: 15,
    endVerse: 21,
    reference: "Genesis 50:15-21",
    title: "Joseph Forgives His Brothers",
    icon: "🤲",
    phrases: [
      ["😨 Joseph Will Peradventure Hate Us", note(["After Jacob dies, the brothers fear Joseph may finally take revenge.", "Their fear shows that guilt still lingers even after reconciliation.", "They wonder if Joseph was only kind for Jacob's sake.", "This is how hard it can be to trust forgiveness when the sin was serious.", "The brothers know what they deserve.", "Joseph now has another opportunity to show what mercy really means."])],
      ["🙌 Am I In The Place Of God?", note(["Joseph refuses to take God's place in judgment.", "That does not mean the brothers did nothing wrong.", "Joseph clearly says they meant evil against him.", "But he will not make himself the final judge over their lives.", "This phrase shows humility under God even from a position of power.", "Joseph has authority, but he knows he is not God."])],
      ["🌱 Ye Thought Evil Against Me; But God Meant It Unto Good", note(["This is one of the most important lines in Genesis.", "Joseph names both truths: his brothers meant evil, and God meant good.", "He does not excuse their sin or pretend it was harmless.", "But he sees God's purpose working above and through human evil.", "God used Joseph's suffering to preserve many lives.", "This phrase becomes a powerful picture of providence, mercy, and redemption."])],
    ],
  },
  {
    chapter: 50,
    startVerse: 22,
    endVerse: 26,
    reference: "Genesis 50:22-26",
    title: "Genesis Ends With Hope",
    icon: "⚰️",
    phrases: [
      ["👴 Joseph Lived An Hundred And Ten Years", note(["Joseph lives a full life and sees multiple generations.", "The boy sold into slavery becomes an old man surrounded by family.", "That does not erase his suffering, but it shows God's long faithfulness.", "Joseph's life stretches from Canaan to Egypt, from pit to palace, from betrayal to blessing.", "His years become a testimony that God can carry a person through a story they never would have chosen.", "The ending is peaceful, but not final."])],
      ["🙌 God Will Surely Visit You", note(["Joseph tells his brothers that God will surely visit them.", "This means God will come to act for His people.", "Joseph knows Egypt is not the final destination.", "The promise still points back to the land sworn to Abraham, Isaac, and Jacob.", "This phrase reaches forward to Exodus, where God hears Israel's cry and visits them in deliverance.", "Genesis ends by pointing beyond itself."])],
      ["⚰️ Ye Shall Carry Up My Bones From Hence", note(["Joseph asks that his bones be carried out of Egypt when God brings the people back to the land.", "This is an act of faith.", "Joseph dies in Egypt, but he believes God's promise about Canaan.", "His bones become a witness that the story is not over.", "Centuries later, Moses will carry Joseph's bones during the Exodus.", "Genesis closes with a coffin in Egypt, but also with hope in God's promise."])],
    ],
  },
];

export const GENESIS_41_50_PERSONAL_SECTIONS = addGenesisFortyOneToFiftySectionTexture(
  expandSplitSections(RAW_GENESIS_41_50_PERSONAL_SECTIONS),
);
