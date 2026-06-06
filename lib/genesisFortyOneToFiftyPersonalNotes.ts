import { BIBLE_YEAR_DAY_TWENTY_ONE_DEEP_STUDY_SECTIONS } from "./bibleYearDayTwentyOneDeepNotes";

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
const phrase = (title: string, lines: string[]): [string, string] => [title, note(lines)];

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

const deepPhrase = (
  title: string,
  scene: string,
  notice: string,
  meaning: string,
  lesson: string,
): [string, string] => phrase(title, [
  scene,
  notice,
  meaning,
  "📌 Notice: this phrase is carrying story movement, not decoration.",
  `💡 Meaning: ${meaning}`,
  `➡️ Lesson: ${lesson}`,
]);

const DAY_17_GENESIS_41_42_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 41, startVerse: 1, endVerse: 4, reference: "Genesis 41:1-4", title: "Pharaoh Dreams Of The Cows", icon: "🐄", phrases: [
    deepPhrase("⏳ Two Full Years", "Joseph remains in prison two more full years after the butler forgets him.", "The delay is painful because Joseph had asked to be remembered.", "God's timing is not absent just because it is slow.", "Do not confuse waiting with abandonment."),
    deepPhrase("🌊 Pharaoh Stood By The River", "The Nile setting matters because Egypt's life depended on the river.", "God sends Pharaoh a dream using images from Egypt's own world.", "The coming crisis will touch the very source Egypt trusts for abundance.", "God can speak through the places a culture thinks are secure."),
    deepPhrase("🐄 Seven Well Favoured Kine", "The healthy cows picture plenty, strength, and visible prosperity.", "At first the dream looks like abundance rising from the river.", "Genesis lets the good years appear before the danger is shown.", "Seasons of plenty should be received with wisdom, not presumption."),
    deepPhrase("😨 Ill Favoured Kine Did Eat Them", "The thin cows devour the healthy cows, but remain ugly and thin.", "This image makes scarcity feel monstrous and unnatural.", "The dream warns that famine will swallow abundance if Egypt is not prepared.", "Warnings from God are mercy before crisis arrives."),
  ] },
  { chapter: 41, startVerse: 5, endVerse: 8, reference: "Genesis 41:5-8", title: "Pharaoh Dreams Of The Ears", icon: "🌾", phrases: [
    deepPhrase("🌾 Seven Good Ears", "The second dream repeats the message with grain instead of cattle.", "Repetition in Genesis often confirms that God is establishing the matter.", "The dream moves from livestock to harvest, covering Egypt's food system.", "When God repeats a warning, listen carefully."),
    deepPhrase("🌬️ Blasted With The East Wind", "The thin ears are scorched and destructive.", "The east wind image signals harsh conditions that ruin growth.", "The dream shows abundance being consumed by severe famine.", "Fragile prosperity needs humble planning under God."),
    deepPhrase("😟 His Spirit Was Troubled", "Pharaoh wakes disturbed because he senses the dream matters.", "Power cannot give him interpretation.", "The ruler of Egypt is helpless before a message from God.", "Human authority still needs divine wisdom."),
    deepPhrase("📚 Magicians Of Egypt", "Egypt's wise men cannot interpret the dreams.", "The failure prepares the way for Joseph to be called from prison.", "God closes the mouths of experts so His servant can speak truth.", "A closed door for others may be God's opening for hidden faithfulness."),
  ] },
  { chapter: 41, startVerse: 9, endVerse: 13, reference: "Genesis 41:9-13", title: "The Butler Remembers Joseph", icon: "🍷", phrases: [
    deepPhrase("🧠 I Do Remember My Faults", "The butler finally remembers Joseph after two years.", "His memory awakens because Pharaoh's crisis requires what Joseph can give.", "The delay was painful, but the timing places Joseph before the right person.", "God can make forgotten faithfulness resurface at the appointed time."),
    deepPhrase("⛓️ There Was There With Us A Young Man", "Joseph is described from the butler's prison memory.", "He was young, Hebrew, and imprisoned, yet gifted by God.", "The palace hears about the man hidden in confinement.", "God knows how to bring a buried name into the room."),
    deepPhrase("✅ It Came To Pass, As He Interpreted", "The butler confirms Joseph's interpretations proved true.", "This gives Pharaoh reason to call Joseph.", "Joseph's prison faithfulness becomes his credential for the palace.", "What you do faithfully in a hidden place can matter later."),
  ] },
  { chapter: 41, startVerse: 14, endVerse: 16, reference: "Genesis 41:14-16", title: "Joseph Is Brought Before Pharaoh", icon: "🪒", phrases: [
    deepPhrase("🏃 Brought Him Hastily Out Of The Dungeon", "Joseph's situation changes suddenly after years of waiting.", "The movement from dungeon to Pharaoh happens in one verse.", "God can shift a person's assignment faster than people expect.", "Long delay does not mean slow deliverance when God's hour comes."),
    deepPhrase("🪒 Shaved Himself", "Joseph prepares to enter Pharaoh's court according to Egyptian expectations.", "He does not confuse faithfulness with carelessness.", "He honors the setting while remaining loyal to God.", "Wisdom knows how to enter a room without losing identity."),
    deepPhrase("🙏 It Is Not In Me", "Joseph refuses to take credit for interpretation.", "He points Pharaoh to God before hearing the dream.", "The palace does not make Joseph self-important.", "Use elevation as a place to honor God, not advertise yourself."),
  ] },
  { chapter: 41, startVerse: 17, endVerse: 21, reference: "Genesis 41:17-21", title: "Pharaoh Retells The Cow Dream", icon: "📢", phrases: [
    deepPhrase("📢 Pharaoh Said Unto Joseph", "Pharaoh retells the dreams in detail.", "The most powerful man in Egypt is asking a former prisoner for help.", "God has reversed the social distance without Joseph forcing it.", "God can make powerful people seek wisdom from unlikely servants."),
    deepPhrase("😨 Such As I Never Saw", "Pharaoh emphasizes how ugly and alarming the thin cows were.", "The dream disturbed him because the image resisted easy dismissal.", "God's warning reached Pharaoh emotionally before it was interpreted intellectually.", "Sometimes God gets our attention before He gives full understanding."),
  ] },
  { chapter: 41, startVerse: 22, endVerse: 24, reference: "Genesis 41:22-24", title: "Pharaoh Retells The Grain Dream", icon: "🌾", phrases: [
    deepPhrase("🤐 None That Could Declare It", "Pharaoh admits his wise men could not explain the dreams.", "This sets Joseph's God-given wisdom apart from Egypt's systems.", "The confession creates space for God to be known in Pharaoh's court.", "Human inability can become a stage for divine clarity."),
  ] },
  { chapter: 41, startVerse: 25, endVerse: 28, reference: "Genesis 41:25-28", title: "The Dream Is One Message", icon: "💡", phrases: [
    deepPhrase("☝️ The Dream Of Pharaoh Is One", "Joseph explains that the two dreams carry one unified message.", "The repetition is confirmation, not confusion.", "God has spoken clearly about what He is about to do.", "Seek the main message before getting lost in details."),
    deepPhrase("🌾 Seven Years Of Great Plenty", "The good cows and good ears mean seven years of abundance.", "God is giving Egypt advance knowledge of a coming season.", "Plenty is not only a gift to enjoy; it is preparation for responsibility.", "Use abundant seasons wisely."),
  ] },
  { chapter: 41, startVerse: 29, endVerse: 32, reference: "Genesis 41:29-32", title: "The Famine Is Established", icon: "⚠️", phrases: [
    deepPhrase("🕳️ Seven Years Of Famine", "The lean cows and thin ears mean seven years of famine.", "The famine will be severe enough to make the plenty forgotten.", "God is revealing danger before it arrives so lives can be preserved.", "Warnings are gifts when they lead to preparation."),
    deepPhrase("⚡ The Thing Is Established By God", "Joseph says the repeated dream shows the matter is fixed by God.", "Pharaoh is not dealing with random anxiety.", "God is sovereign over Egypt's future harvests.", "When God establishes a matter, wisdom responds instead of arguing."),
  ] },
  { chapter: 41, startVerse: 33, endVerse: 36, reference: "Genesis 41:33-36", title: "Joseph Gives A Wise Plan", icon: "📦", phrases: [
    deepPhrase("🧠 Discreet And Wise Man", "Joseph moves from interpretation to practical counsel.", "He says Egypt needs wise leadership, not panic.", "God-given insight should produce wise action.", "Spiritual understanding should become practical stewardship."),
    deepPhrase("📦 Lay Up Corn", "Joseph proposes storing grain during the plenty.", "The plan turns warning into preservation.", "Faith does not ignore logistics; it organizes them.", "Planning can be an act of love when crisis is coming."),
    deepPhrase("🛟 That The Land Perish Not", "The goal is survival, not personal glory.", "Joseph's wisdom is aimed at preserving life across Egypt.", "God is positioning him to save many people.", "Use wisdom to protect life, not merely gain status."),
  ] },
  { chapter: 41, startVerse: 37, endVerse: 40, reference: "Genesis 41:37-40", title: "Pharaoh Recognizes God's Wisdom", icon: "🕊️", phrases: [
    deepPhrase("👀 The Thing Was Good", "Pharaoh and his servants recognize the wisdom in Joseph's plan.", "Joseph's counsel is publicly received.", "The former prisoner becomes the clearest voice in the room.", "God can make truth recognizable even in foreign courts."),
    deepPhrase("🕊️ In Whom The Spirit Of God Is", "Pharaoh recognizes something divine in Joseph's wisdom.", "This is a striking confession from Egypt's ruler.", "Joseph's God is being noticed through Joseph's clarity and character.", "Let your gifts make God visible."),
  ] },
  { chapter: 41, startVerse: 41, endVerse: 45, reference: "Genesis 41:41-45", title: "Joseph Is Raised Over Egypt", icon: "👑", phrases: [
    deepPhrase("💍 Pharaoh Took Off His Ring", "The ring gives Joseph authority to act in Pharaoh's name.", "Joseph moves from powerless prisoner to authorized governor.", "This is not luck; it is providence lifting him for preservation.", "God's elevation carries responsibility."),
    deepPhrase("🏛️ Over All The Land Of Egypt", "Joseph receives authority over Egypt's food future.", "The dreams that made his brothers angry now begin moving toward fulfillment.", "God has placed Joseph where he can save the family that betrayed him.", "God's long plan can be larger than our personal vindication."),
  ] },
  { chapter: 41, startVerse: 46, endVerse: 49, reference: "Genesis 41:46-49", title: "Joseph Stores Grain", icon: "🌾", phrases: [
    deepPhrase("🧑 Thirty Years Old", "Joseph is thirty when he stands before Pharaoh.", "Thirteen years have passed since he was seventeen in Canaan.", "God's preparation took time, suffering, service, and delay.", "Do not despise long formation."),
    deepPhrase("🏃 Went Out Over All Egypt", "Joseph actively administers the plan across Egypt.", "Elevation does not make him passive; it gives him work to do.", "He turns wisdom into organized action.", "Leadership means carrying responsibility after promotion."),
    deepPhrase("📚 As The Sand Of The Sea", "The stored grain becomes too abundant to count.", "God's warning is matched by God's provision through wise stewardship.", "The abundance is gathered before famine empties the land.", "Gather well in seasons of supply."),
  ] },
  { chapter: 41, startVerse: 50, endVerse: 52, reference: "Genesis 41:50-52", title: "Joseph's Sons Are Born", icon: "👶", phrases: [
    deepPhrase("👶 Manasseh And Ephraim", "Joseph's sons are born in Egypt before the famine.", "Their names tell the story of pain, forgetting, fruitfulness, and affliction.", "Joseph's family grows in the place where he once suffered.", "God can make fruit grow in the land of affliction."),
  ] },
  { chapter: 41, startVerse: 53, endVerse: 57, reference: "Genesis 41:53-57", title: "The Famine Begins", icon: "🍞", phrases: [
    deepPhrase("⏳ The Seven Years Of Plenteousness Ended", "The good years finish exactly as Joseph said.", "Seasons change, and stored wisdom now matters.", "The end of plenty reveals whether people prepared.", "Use today's abundance with tomorrow's need in mind."),
    deepPhrase("🌍 The Famine Was In All Lands", "The famine reaches beyond Egypt.", "This widens the story toward Joseph's family in Canaan.", "God's plan for one family is moving through a regional crisis.", "God can use global pressure to move a covenant story."),
    deepPhrase("🚪 Go Unto Joseph", "Pharaoh directs hungry people to Joseph.", "The rejected brother becomes the provider for nations.", "Joseph's authority now becomes visible through bread.", "God may raise the wounded one to feed others."),
  ] },
  { chapter: 42, startVerse: 1, endVerse: 5, reference: "Genesis 42:1-5", title: "Jacob Sends His Sons To Egypt", icon: "🌾", phrases: [
    deepPhrase("👀 Jacob Saw There Was Corn In Egypt", "The famine reaches Jacob's household in Canaan.", "The family that sold Joseph to Egypt now needs food from Egypt.", "God is drawing the brothers toward the person they tried to remove.", "Need can become the road to truth."),
    deepPhrase("❓ Why Do Ye Look One Upon Another", "Jacob's question suggests paralysis in the household.", "The brothers know there is grain, but the journey carries unknown weight.", "Egypt is not emotionally neutral because Joseph was sold there.", "Avoidance cannot feed a starving family."),
    deepPhrase("🧳 Benjamin Went Not", "Jacob keeps Benjamin home because he fears losing Rachel's other son.", "The old wound around Joseph still controls Jacob's decisions.", "Favoritism and grief remain active in the family.", "Unhealed loss can shape present choices."),
  ] },
  { chapter: 42, startVerse: 6, endVerse: 9, reference: "Genesis 42:6-9", title: "The Brothers Bow Before Joseph", icon: "🙇", phrases: [
    deepPhrase("👑 Joseph Was The Governor", "Joseph now stands in authority over Egypt's grain.", "The brother thrown down into a pit is raised over the food supply.", "Genesis is showing reversal through providence.", "God can lift what people tried to bury."),
    deepPhrase("🙇 Bowed Down Themselves", "The brothers bow before Joseph without recognizing him.", "The dream from Genesis 37 begins to come true.", "They fought the dream, but their hunger brings them into it.", "God's word outlives human resistance."),
    deepPhrase("🧠 Joseph Remembered The Dreams", "Joseph remembers the dreams when he sees them bow.", "Memory connects the painful past to God's present fulfillment.", "He must now discern how to test them, not simply take revenge.", "Fulfilled promises still require wisdom and character."),
  ] },
  { chapter: 42, startVerse: 10, endVerse: 13, reference: "Genesis 42:10-13", title: "The Brothers Claim Honesty", icon: "🔎", phrases: [
    deepPhrase("🕵️ Ye Are Spies", "Joseph accuses them as part of a test.", "He is not confused about who they are; he is probing who they have become.", "The pressure will expose family truth and force Benjamin into the story.", "Testing can reveal whether repentance is real."),
    deepPhrase("👥 We Are True Men", "The brothers insist they are honest men.", "The claim is ironic because Joseph knows the lie they have lived for years.", "Their words now have to be tested against their past.", "Integrity cannot be proven by claim alone."),
  ] },
  { chapter: 42, startVerse: 14, endVerse: 17, reference: "Genesis 42:14-17", title: "Joseph Presses The Test", icon: "⛓️", phrases: [
    deepPhrase("👶 One Is Not", "They describe Joseph as the brother who is not.", "They speak about him while standing before him.", "The phrase shows how the family has carried Joseph as absence and secret.", "Hidden sin can remain present through the very words used to bury it."),
    deepPhrase("⛓️ Put Them All Together Into Ward", "Joseph imprisons them for three days.", "The brothers experience confinement after putting Joseph in a pit.", "The reversal is not random cruelty; it begins awakening memory.", "Sometimes God lets people taste what they once ignored."),
  ] },
  { chapter: 42, startVerse: 18, endVerse: 20, reference: "Genesis 42:18-20", title: "Joseph Changes The Terms", icon: "🙏", phrases: [
    deepPhrase("🙏 I Fear God", "Joseph grounds his test in the fear of God.", "He will not act as a lawless tyrant even with power over them.", "His authority is restrained by reverence.", "Power is safest when it stands under God."),
  ] },
  { chapter: 42, startVerse: 21, endVerse: 24, reference: "Genesis 42:21-24", title: "The Brothers Remember Their Guilt", icon: "💔", phrases: [
    deepPhrase("💔 We Are Verily Guilty", "The brothers finally connect their distress to what they did to Joseph.", "Their conscience wakes under pressure.", "They remember his anguish and their refusal to hear.", "Guilt may sleep for years, but God can awaken it."),
    deepPhrase("👂 We Would Not Hear", "They admit they heard Joseph's cries and ignored him.", "This is one of the clearest moral reckonings in the Joseph story.", "Their sin was not only selling him, but hardening themselves against his pleading.", "Compassion ignored becomes guilt remembered."),
    deepPhrase("😭 Joseph Wept", "Joseph turns away and weeps.", "He is testing them, but he is not cold.", "The pain of the past is still alive beneath his Egyptian authority.", "Forgiveness and wisdom can coexist with tears."),
  ] },
  { chapter: 42, startVerse: 25, endVerse: 28, reference: "Genesis 42:25-28", title: "Money In The Sacks", icon: "💰", phrases: [
    deepPhrase("💰 Restore Every Man's Money", "Joseph secretly returns their money in the sacks.", "The act creates fear because they do not understand his mercy or his test.", "A gift feels dangerous to guilty hearts.", "Guilt can make grace feel like a trap."),
    deepPhrase("😨 Their Heart Failed Them", "When the money is found, the brothers tremble.", "They ask what God has done to them.", "Their fear shows conscience interpreting events as divine pressure.", "God can use unsettling mercy to keep working on the heart."),
  ] },
  { chapter: 42, startVerse: 29, endVerse: 34, reference: "Genesis 42:29-34", title: "The Brothers Report To Jacob", icon: "📢", phrases: [
    deepPhrase("📢 They Came Unto Jacob", "The brothers return and report the Egyptian ruler's demands.", "They must bring the hidden family wound back into Jacob's tent.", "Benjamin is now pulled into the test.", "The past cannot heal while the family keeps avoiding truth."),
    deepPhrase("🧪 Hereby Shall I Know", "Joseph's demand about Benjamin becomes the test of the brothers' character.", "Will they protect Rachel's son this time or sacrifice him too?", "The test reaches the exact place of their old sin.", "God often heals by revisiting the wound truthfully."),
  ] },
  { chapter: 42, startVerse: 35, endVerse: 38, reference: "Genesis 42:35-38", title: "Jacob Refuses To Send Benjamin", icon: "😢", phrases: [
    deepPhrase("💰 Every Man's Bundle Of Money", "All the money appears in the sacks, increasing fear in the family.", "What Joseph meant as part of the test feels like danger to them.", "The household is shaken because guilt makes events heavy.", "A troubled conscience struggles to receive unexplained mercy."),
    deepPhrase("😭 Me Have Ye Bereaved", "Jacob speaks from years of grief over Joseph and fear for Benjamin.", "He names Simeon as gone and Benjamin as threatened.", "His love is real, but his despair grips the family.", "Grief can make the future feel impossible."),
    deepPhrase("🚫 My Son Shall Not Go Down", "Jacob refuses to send Benjamin to Egypt.", "The word down echoes the family's earlier descents into loss.", "He cannot bear another Rachel-son leaving his sight.", "Fear may try to protect what only trust can surrender."),
  ] },
];

const DAY_18_GENESIS_43_44_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 43, startVerse: 1, endVerse: 5, reference: "Genesis 43:1-5", title: "The Famine Presses The Family", icon: "🌾", phrases: [
    deepPhrase("🌾 The Famine Was Sore", "The hunger grows severe in Canaan.", "Jacob's refusal cannot change the need for food.", "Pressure forces the family back toward Egypt and unresolved truth.", "Need often exposes decisions fear tried to delay."),
    deepPhrase("⬇️ Go Again", "Jacob tells them to return for food, but the Benjamin condition remains.", "The family cannot go forward without facing what Joseph required.", "The road to bread now runs through trust and risk.", "Some provision is blocked until obedience is faced."),
  ] },
  { chapter: 43, startVerse: 6, endVerse: 7, reference: "Genesis 43:6-7", title: "Jacob Questions The Brothers", icon: "❓", phrases: [
    deepPhrase("❓ Is Your Father Yet Alive", "The brothers explain that the Egyptian ruler asked detailed family questions.", "Those questions were Joseph reaching toward the hidden family story.", "What felt like interrogation was actually personal knowledge under disguise.", "God may be asking questions that lead us toward confession."),
  ] },
  { chapter: 43, startVerse: 8, endVerse: 10, reference: "Genesis 43:8-10", title: "Judah Pledges Himself", icon: "🤲", phrases: [
    deepPhrase("🤲 Send The Lad With Me", "Judah steps forward where the family is stuck.", "He is no longer the same brother who suggested selling Joseph for profit.", "His words begin showing responsibility for Benjamin.", "Grace can change a person from betrayer to pledge-bearer."),
    deepPhrase("🛡️ I Will Be Surety For Him", "Judah offers himself as guarantee for Benjamin.", "This is a major character turn in Genesis.", "He accepts personal cost to protect the favored son.", "Real repentance becomes responsibility."),
  ] },
  { chapter: 43, startVerse: 11, endVerse: 14, reference: "Genesis 43:11-14", title: "Jacob Releases Benjamin", icon: "🙏", phrases: [
    deepPhrase("🎁 Take Of The Best Fruits", "Jacob sends a gift, balm, honey, spices, and more.", "The family again approaches Egyptian power with gifts, but now Benjamin goes too.", "Jacob combines prudence with surrender.", "Faith can use wise means while entrusting the outcome to God."),
    deepPhrase("🙏 God Almighty Give You Mercy", "Jacob finally prays and releases Benjamin.", "He cannot control Egypt, Joseph, or the famine.", "His words move from refusal toward entrusting the family to God Almighty.", "Surrender may sound like trembling prayer."),
  ] },
  { chapter: 43, startVerse: 15, endVerse: 18, reference: "Genesis 43:15-18", title: "The Brothers Fear Joseph's House", icon: "🏠", phrases: [
    deepPhrase("🏠 Bring These Men Home", "Joseph orders the brothers brought to his house.", "To Joseph this prepares a meal; to them it feels like danger.", "Guilt changes hospitality into threat.", "The heart's condition shapes how it reads the room."),
    deepPhrase("😨 The Men Were Afraid", "The brothers fear they are being trapped because of the money in their sacks.", "They assume judgment is coming.", "Their old sin makes them suspicious of kindness.", "Fear can make mercy look like ambush."),
  ] },
  { chapter: 43, startVerse: 19, endVerse: 22, reference: "Genesis 43:19-22", title: "The Brothers Explain The Money", icon: "💬", phrases: [
    deepPhrase("💬 O Sir, We Came Indeed Down", "The brothers quickly explain the money situation.", "They want to clear themselves before accusation comes.", "Their fear pushes them into honesty about what they know.", "Pressure can make hidden anxieties speak."),
  ] },
  { chapter: 43, startVerse: 23, endVerse: 25, reference: "Genesis 43:23-25", title: "The Steward Calms The Brothers", icon: "🕊️", phrases: [
    deepPhrase("🕊️ Peace Be To You", "The steward answers with peace instead of accusation.", "He says their God gave them treasure in their sacks.", "This unexpected word calms the fear they brought to the door.", "God can send peace through an unexpected messenger."),
    deepPhrase("⛓️ He Brought Simeon Out", "Simeon is restored to them before the meal.", "This shows Joseph's test is moving toward reunion, not destruction.", "The brother held as pledge comes back alive.", "God can return what fear thought was lost."),
  ] },
  { chapter: 43, startVerse: 26, endVerse: 30, reference: "Genesis 43:26-30", title: "Joseph Sees Benjamin", icon: "😭", phrases: [
    deepPhrase("🙇 Bowed Themselves", "The brothers bow again before Joseph.", "The dream continues unfolding in repeated scenes.", "They still do not know the ruler is their brother.", "God's word can be fulfilled before people understand it."),
    deepPhrase("👶 Is This Your Younger Brother", "Joseph sees Benjamin, Rachel's other son.", "This moment touches the deepest family wound.", "Joseph must hold authority, secrecy, and emotion together.", "Healing often approaches the tenderest part of the story."),
    deepPhrase("😭 Joseph Made Haste", "Joseph leaves the room to weep.", "His strength in public does not mean the meeting is painless.", "The sight of Benjamin breaks open years of loss.", "Deep reconciliation may begin with hidden tears."),
  ] },
  { chapter: 43, startVerse: 31, endVerse: 34, reference: "Genesis 43:31-34", title: "The Brothers Eat Before Joseph", icon: "🍽️", phrases: [
    deepPhrase("🍽️ Set On Bread", "Joseph returns, controls himself, and orders the meal.", "The brothers once ate while Joseph was in a pit; now they eat at his table.", "The scene reverses the old cruelty with restrained mercy.", "God can transform a table from guilt into testing grace."),
    deepPhrase("🪑 The Firstborn According To His Birthright", "The brothers are seated in exact birth order.", "They marvel because the ruler knows what he should not know.", "Joseph's hidden knowledge unsettles them.", "God can arrange details that make people wonder."),
    deepPhrase("🥣 Benjamin's Mess Was Five Times", "Benjamin receives a larger portion, testing whether the brothers still resent favoritism.", "Joseph watches how they respond to Rachel's son being honored.", "The old wound is being pressed carefully.", "Repentance is tested where envy once ruled."),
  ] },
  { chapter: 44, startVerse: 1, endVerse: 6, reference: "Genesis 44:1-6", title: "Joseph Places The Cup", icon: "🏆", phrases: [
    deepPhrase("🏆 Put My Cup In The Sack's Mouth", "Joseph creates a final test involving Benjamin.", "The cup will place the favored younger brother in danger.", "This forces the brothers to choose between saving themselves and protecting him.", "Tests reveal whether old patterns still rule."),
    deepPhrase("🌅 As Soon As The Morning Was Light", "The brothers leave with relief, but the test follows quickly.", "They think the danger is behind them.", "Genesis creates tension because truth has not fully surfaced yet.", "False peace may be interrupted by necessary testing."),
    deepPhrase("🏃 Follow After The Men", "Joseph sends his steward after them.", "The pursuit mirrors their fear of being trapped.", "This controlled crisis will expose Judah's heart.", "God can use pressure to bring transformation into the open."),
  ] },
  { chapter: 44, startVerse: 7, endVerse: 10, reference: "Genesis 44:7-10", title: "The Brothers Deny The Charge", icon: "⚖️", phrases: [
    deepPhrase("🙅 God Forbid", "The brothers deny wrongdoing strongly.", "They know they returned the money and believe themselves innocent.", "Their confidence is about to be shaken.", "A test can expose what is true even when a person is not guilty of the specific charge."),
    deepPhrase("⚖️ Let Him Die", "They speak rashly, not knowing the cup is in Benjamin's sack.", "Like Jacob in Genesis 31, confident words become dangerous without full knowledge.", "The family keeps learning caution through painful setups.", "Do not make severe vows when you do not know all the facts."),
  ] },
  { chapter: 44, startVerse: 11, endVerse: 13, reference: "Genesis 44:11-13", title: "The Cup Is Found", icon: "🔎", phrases: [
    deepPhrase("🔎 The Cup Was Found In Benjamin's Sack", "The worst possible sack contains the cup.", "Benjamin, the son Jacob feared losing, is now the accused one.", "The brothers face the exact test of whether they will abandon Rachel's son again.", "God can bring people back to the place where love must replace envy."),
    deepPhrase("💔 They Rent Their Clothes", "The brothers tear their garments and return together.", "This is already different from Joseph's sale, where they went home without him.", "They do not leave Benjamin alone.", "Real change begins to show when people refuse the old escape route."),
  ] },
  { chapter: 44, startVerse: 14, endVerse: 17, reference: "Genesis 44:14-17", title: "Judah Faces Joseph", icon: "⚖️", phrases: [
    deepPhrase("🙇 Fell Before Him", "The brothers bow yet again before Joseph.", "The dream reaches another layer, now with guilt and pleading in the room.", "They are not proud men before him anymore.", "God can humble without destroying."),
    deepPhrase("🙏 God Hath Found Out The Iniquity", "Judah speaks of God exposing their iniquity.", "He knows the cup charge is not the whole story.", "Old guilt over Joseph stands behind the present crisis.", "Sometimes present trouble awakens deeper confession."),
    deepPhrase("🛑 The Man In Whose Hand The Cup Is Found", "Joseph says only Benjamin must stay.", "This creates the exact moral test.", "The brothers can go free if they abandon him.", "Repentance is proven when the old sin is refused at personal cost."),
  ] },
  { chapter: 44, startVerse: 18, endVerse: 23, reference: "Genesis 44:18-23", title: "Judah Retells The Demand", icon: "🗣️", phrases: [
    deepPhrase("🦁 Judah Came Near", "Judah steps closer to plead.", "The man who once said sell Joseph now becomes the spokesman for rescue.", "His nearness is emotional and courageous.", "God can rewrite a person's role in the family story."),
    deepPhrase("👴 We Have A Father, An Old Man", "Judah centers Jacob's age and grief.", "He is thinking about his father's heart, not only his own safety.", "This is different from the brothers who once deceived Jacob with Joseph's robe.", "Repentance learns to feel the pain it once caused."),
    deepPhrase("👶 A Child Of His Old Age", "Judah describes Benjamin in language that echoes Joseph's favored status.", "The test is whether favoritism will again become a reason for hatred.", "Judah now protects the favored son instead of resenting him.", "Grace changes how we treat the person who triggers old jealousy."),
  ] },
  { chapter: 44, startVerse: 24, endVerse: 29, reference: "Genesis 44:24-29", title: "Judah Pleads For His Father", icon: "😭", phrases: [
    deepPhrase("🏠 We Came Up Unto Thy Servant My Father", "Judah retells the conversation at home.", "He is careful to show how deeply Jacob's life is tied to Benjamin.", "The family wound is now spoken in Joseph's hearing.", "Truth must be narrated before healing can land."),
    deepPhrase("🩸 One Went Out From Me", "Judah repeats Jacob's belief that Joseph was torn in pieces.", "Joseph hears the grief his absence created.", "The false story the brothers created is now being spoken back before him.", "Sin's old lies may have to be heard before mercy answers."),
    deepPhrase("⚰️ Bring Down My Gray Hairs", "Judah says losing Benjamin would bring Jacob down to the grave in sorrow.", "He now understands the cost of bereaving his father.", "The old cruelty is being reversed by empathy.", "Changed hearts care about the pain their actions would cause."),
  ] },
  { chapter: 44, startVerse: 30, endVerse: 34, reference: "Genesis 44:30-34", title: "Judah Offers Himself", icon: "🤲", phrases: [
    deepPhrase("❤️ His Life Is Bound Up In The Lad's Life", "Judah names Jacob's deep attachment to Benjamin.", "He does not mock the favoritism; he bears responsibility around it.", "This is a major transformation from envy to protection.", "Love may mean protecting someone who receives what you did not."),
    deepPhrase("🤲 Let Thy Servant Abide Instead", "Judah offers himself in Benjamin's place.", "This is the climax of the brothers' test.", "The one who once sold a brother now offers to become a slave for a brother.", "True repentance moves from taking life to giving oneself."),
    deepPhrase("👀 How Shall I Go Up To My Father", "Judah cannot bear to return without Benjamin.", "He refuses to repeat the old journey home after losing Joseph.", "This sentence proves the brothers are not who they were.", "Godly change is seen when the old path becomes unbearable."),
  ] },
];

const DAY_19_GENESIS_45_46_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 45, startVerse: 1, endVerse: 3, reference: "Genesis 45:1-3", title: "Joseph Reveals Himself", icon: "😭", phrases: [
    deepPhrase("😭 Joseph Could Not Refrain Himself", "Judah's offer breaks the final restraint.", "Joseph sees that the brothers have changed.", "The test gives way to tears and revelation.", "Mercy often waits until truth has done its work."),
    deepPhrase("📢 Cause Every Man To Go Out", "Joseph clears the room before revealing himself.", "The family wound is handled privately and tenderly.", "He does not expose his brothers for Egyptian entertainment.", "Grace can protect dignity while telling the truth."),
    deepPhrase("🧑 I Am Joseph", "Joseph finally names himself to his brothers.", "The hidden ruler is the brother they sold.", "This sentence collapses years of guilt, grief, and mystery.", "Truth is frightening before it becomes healing."),
  ] },
  { chapter: 45, startVerse: 4, endVerse: 8, reference: "Genesis 45:4-8", title: "God Sent Me Before You", icon: "🌱", phrases: [
    deepPhrase("👂 Come Near To Me", "Joseph invites the terrified brothers closer.", "He does not use the revelation to keep emotional distance.", "Nearness becomes part of mercy.", "Forgiveness can move toward the guilty without denying the wrong."),
    deepPhrase("💰 Whom Ye Sold Into Egypt", "Joseph names the sin plainly.", "He does not pretend they merely lost him or misunderstood him.", "Grace tells the truth before explaining God's providence.", "Forgiveness is not denial."),
    deepPhrase("🌱 God Did Send Me Before You", "Joseph sees God's purpose over the brothers' evil action.", "God sent him to preserve life during famine.", "This does not excuse the sale; it reveals a higher mercy.", "God can mean good through what people meant for evil."),
    deepPhrase("🛟 To Preserve Life", "Joseph's suffering becomes a means of survival for many.", "His story is bigger than personal vindication.", "God positioned him to save Egypt, Canaan, and his own family.", "Pain entrusted to God can become provision for others."),
  ] },
  { chapter: 45, startVerse: 9, endVerse: 11, reference: "Genesis 45:9-11", title: "Joseph Sends For Jacob", icon: "🏃", phrases: [
    deepPhrase("🏃 Haste Ye, And Go Up To My Father", "Joseph urgently sends for Jacob.", "Revelation turns into invitation and rescue.", "The father who thought Joseph dead must hear that he is alive.", "Good news should travel quickly to the grieving."),
    deepPhrase("🏞️ Thou Shalt Dwell In Goshen", "Joseph provides a place for the family in Egypt.", "Goshen becomes shelter during famine.", "God's preservation includes geography, food, and nearness.", "Mercy often becomes practical provision."),
  ] },
  { chapter: 45, startVerse: 12, endVerse: 15, reference: "Genesis 45:12-15", title: "Joseph Embraces His Brothers", icon: "🤗", phrases: [
    deepPhrase("👀 Your Eyes See", "Joseph tells them they can see he is truly speaking to them.", "The brothers need assurance because the moment is overwhelming.", "Truth becomes embodied in Joseph's face, voice, and tears.", "Healing often needs repeated reassurance."),
    deepPhrase("😭 He Kissed All His Brethren", "Joseph embraces and kisses the brothers who sold him.", "The scene does not erase the sin, but mercy triumphs over revenge.", "After this, the brothers can finally talk with him.", "Forgiveness can reopen speech where guilt had silenced it."),
  ] },
  { chapter: 45, startVerse: 16, endVerse: 20, reference: "Genesis 45:16-20", title: "Pharaoh Sends For Jacob's Family", icon: "🚚", phrases: [
    deepPhrase("👂 The Fame Thereof Was Heard", "Joseph's family reunion reaches Pharaoh's house.", "The private family story now affects Egypt's royal court.", "Pharaoh responds with generosity instead of suspicion.", "God can give favor in places His people could not control."),
    deepPhrase("🚚 Take You Wagons", "Pharaoh sends wagons to bring Jacob and the little ones.", "The rescue becomes logistically possible for an aging father and large family.", "God's provision includes transportation, not only emotion.", "Practical help can be part of divine mercy."),
    deepPhrase("🌍 The Good Of All The Land", "Pharaoh offers the best of Egypt's land and goods.", "The family that faced famine is now invited into abundance.", "Joseph's elevation becomes blessing for his household.", "God can turn one person's faithfulness into provision for many."),
  ] },
  { chapter: 45, startVerse: 21, endVerse: 24, reference: "Genesis 45:21-24", title: "Joseph Sends His Brothers Home", icon: "🎁", phrases: [
    deepPhrase("🎁 Joseph Gave Them Wagons", "Joseph equips the brothers for the return journey.", "He sends visible proof for Jacob and practical help for the move.", "Grace does not send people away empty.", "Forgiveness can become generous action."),
    deepPhrase("👕 Changes Of Raiment", "Joseph gives garments, a striking reversal after his own garment was taken.", "Clothing once served deception; now clothing becomes gift.", "The story redeems the symbol without pretending the past was harmless.", "God can transform old signs of pain into signs of mercy."),
    deepPhrase("🛑 See That Ye Fall Not Out By The Way", "Joseph warns the brothers not to quarrel on the road.", "He knows guilt and blame could erupt between them.", "Even after forgiveness, the family must guard unity.", "Reconciliation needs careful walking after the emotional moment."),
  ] },
  { chapter: 45, startVerse: 25, endVerse: 28, reference: "Genesis 45:25-28", title: "Jacob Believes Joseph Is Alive", icon: "💓", phrases: [
    deepPhrase("📢 Joseph Is Yet Alive", "The brothers tell Jacob the impossible news.", "The son he mourned for years is alive and ruling in Egypt.", "The message is almost too much for Jacob to receive.", "Hope can feel unbelievable after long grief."),
    deepPhrase("💔 Jacob's Heart Fainted", "Jacob's heart goes numb because he does not believe them at first.", "Years of sorrow have trained him not to expect restoration.", "The wagons help carry the truth into his weary heart.", "People may need evidence and patience when hope returns."),
    deepPhrase("💓 The Spirit Of Jacob Revived", "Jacob's spirit revives when he sees the wagons Joseph sent.", "The visible provision confirms the good news.", "Grief begins turning toward life.", "God can revive what sorrow nearly shut down."),
  ] },
  { chapter: 46, startVerse: 1, endVerse: 4, reference: "Genesis 46:1-4", title: "God Speaks To Jacob At Beersheba", icon: "🌙", phrases: [
    deepPhrase("🐑 Israel Took His Journey", "Jacob begins the journey to Egypt with all that he has.", "This is a major covenant movement, not a small family visit.", "Leaving Canaan could feel frightening because the promise is tied to the land.", "Big obedience often needs fresh reassurance."),
    deepPhrase("🔥 Offered Sacrifices", "Jacob worships at Beersheba before going down to Egypt.", "He does not rush past God in the excitement of Joseph being alive.", "Worship anchors the journey in covenant trust.", "Pause to seek God before major transitions."),
    deepPhrase("🌙 God Spake In The Visions Of The Night", "God speaks to Jacob by name in the night.", "The Lord addresses the fear beneath the journey.", "Egypt will be part of God's plan, not a detour outside His care.", "God can meet fear with personal guidance."),
    deepPhrase("⬇️ Fear Not To Go Down Into Egypt", "God directly tells Jacob not to fear the descent.", "The word down matters because Egypt will become both refuge and later bondage.", "For now, God commands the move and promises presence.", "Go where God sends, even when the direction feels complicated."),
    deepPhrase("🤲 I Will Go Down With Thee", "God promises to go with Jacob into Egypt and bring him up again.", "The promise holds both presence and future return.", "Egypt is not the final home of the covenant family.", "God's presence makes even foreign places survivable."),
  ] },
  { chapter: 46, startVerse: 5, endVerse: 7, reference: "Genesis 46:5-7", title: "Jacob's Household Goes Down To Egypt", icon: "🧳", phrases: [
    deepPhrase("🧳 Carried Jacob Their Father", "Jacob's sons carry him, the little ones, and the wives in Pharaoh's wagons.", "The move is physical, emotional, and covenantal all at once.", "God's promise travels with a vulnerable family on the road.", "Obedience often includes caring for the weak along the way."),
    deepPhrase("👨‍👩‍👧‍👦 All His Seed With Him", "Jacob brings his descendants with him into Egypt.", "The family is small enough to move together but large enough to carry the promise.", "This descent prepares the future nation of Israel.", "God can move a whole future through one family journey."),
  ] },
  { chapter: 46, startVerse: 8, endVerse: 11, reference: "Genesis 46:8-11", title: "Leah's Older Sons Go To Egypt", icon: "📜", phrases: [
    deepPhrase("📜 These Are The Names", "The genealogy slows down to name the family entering Egypt.", "These are not faceless migrants; they are covenant descendants.", "God counts the family He is preserving.", "Names matter because people matter."),
    deepPhrase("👥 Sons Of Reuben", "The list begins with Jacob's firstborn line.", "Even complicated sons remain part of the family record.", "Genesis carries real people with real histories into Egypt.", "God's preservation includes imperfect families."),
  ] },
  { chapter: 46, startVerse: 12, endVerse: 15, reference: "Genesis 46:12-15", title: "Judah's Line Goes To Egypt", icon: "🌱", phrases: [
    deepPhrase("🌱 Pharez And Zerah", "Perez and Zerah from Genesis 38 are included in the Egypt migration list.", "Judah and Tamar's painful chapter is not erased from the family line.", "Promise continues through exposed failure and grace.", "God's records do not need polished stories to show redemption."),
  ] },
  { chapter: 46, startVerse: 16, endVerse: 18, reference: "Genesis 46:16-18", title: "Zilpah's Line Goes To Egypt", icon: "👩‍🍼", phrases: [
    deepPhrase("👩‍🍼 Zilpah", "Zilpah's descendants are named as part of Israel's household.", "The servant-mother lines are not ignored.", "Genesis remembers the whole family, including those born through painful arrangements.", "God sees people the family system might rank lower."),
  ] },
  { chapter: 46, startVerse: 19, endVerse: 22, reference: "Genesis 46:19-22", title: "Rachel's Line Goes To Egypt", icon: "💔", phrases: [
    deepPhrase("💔 Rachel Jacob's Wife", "Rachel's line is named with special emotional weight.", "Joseph and Benjamin carry Jacob's deepest grief and love.", "Now Joseph's Egyptian sons also enter the family story.", "God preserves the line connected to long sorrow."),
    deepPhrase("🇪🇬 Manasseh And Ephraim", "Joseph's sons born in Egypt are included in Jacob's family movement.", "Egypt is already becoming part of the family's story.", "These sons will later receive special blessing from Jacob.", "God can graft fruit from affliction into covenant blessing."),
  ] },
  { chapter: 46, startVerse: 23, endVerse: 27, reference: "Genesis 46:23-27", title: "Seventy Souls Go To Egypt", icon: "🔢", phrases: [
    deepPhrase("🔢 All The Souls", "Genesis counts the family as souls, not statistics only.", "The number marks the small beginning of what will become a great nation.", "Egypt receives a family, but Exodus will show a people emerging.", "God grows nations from households."),
    deepPhrase("7️⃣ Threescore And Ten", "The seventy-person total gives shape to the migration.", "It shows the family is still small enough to count, yet large enough to carry promise.", "God's promise to multiply is still unfolding.", "Do not despise the small counted beginning."),
  ] },
  { chapter: 46, startVerse: 28, endVerse: 30, reference: "Genesis 46:28-30", title: "Jacob And Joseph Reunite", icon: "🤗", phrases: [
    deepPhrase("🦁 Judah Before Him", "Jacob sends Judah ahead to Joseph.", "Judah has become a trusted leader after offering himself for Benjamin.", "His transformation continues to matter in the family movement.", "God can turn a failed brother into a guide."),
    deepPhrase("🤗 Joseph Made Ready His Chariot", "Joseph goes personally to meet Jacob in Goshen.", "The governor of Egypt comes as a son to his father.", "Power does not erase family tenderness.", "Status should not make love cold."),
    deepPhrase("😭 Fell On His Neck", "Joseph weeps a long time on Jacob's neck.", "Years of grief, loss, and hope pour out in the reunion.", "Genesis gives space to holy emotion.", "Let restoration be felt, not rushed."),
    deepPhrase("😌 Now Let Me Die", "Jacob says he can die after seeing Joseph alive.", "The grief that once made him refuse comfort has been answered with sight.", "God has restored what Jacob thought was gone forever.", "Hope fulfilled can bring deep peace."),
  ] },
  { chapter: 46, startVerse: 31, endVerse: 34, reference: "Genesis 46:31-34", title: "Joseph Prepares Them For Goshen", icon: "🐑", phrases: [
    deepPhrase("🐑 Thy Servants' Trade Hath Been About Cattle", "Joseph prepares his brothers to answer Pharaoh honestly about their work.", "Their shepherd identity will help locate them in Goshen.", "God uses ordinary vocation to preserve family distinction.", "Tell the truth about who you are when God opens the place."),
    deepPhrase("🏞️ That Ye May Dwell In The Land Of Goshen", "Joseph aims to settle the family in Goshen.", "The place gives room for flocks and keeps Israel from dissolving into Egypt's center.", "God's preservation includes wise placement.", "Sometimes separation is protection, not rejection."),
  ] },
];

const DAY_20_GENESIS_47_48_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 47, startVerse: 1, endVerse: 6, reference: "Genesis 47:1-6", title: "Jacob's Family Before Pharaoh", icon: "🏛️", phrases: [
    deepPhrase("🏞️ In The Land Of Goshen", "Joseph presents his family as settled in Goshen.", "The place provides room for shepherds and keeps the family distinct.", "God is preserving Israel inside Egypt without dissolving them into Egypt.", "Provision can include protected space."),
    deepPhrase("🐑 Thy Servants Are Shepherds", "The brothers honestly identify their work before Pharaoh.", "Their calling is humble compared with royal Egypt.", "Yet God uses this identity to place them in Goshen.", "Do not despise ordinary vocation."),
    deepPhrase("👑 If Thou Knowest Any Men Of Activity", "Pharaoh offers work for capable men over his cattle.", "The family receives favor and opportunity in Egypt.", "Joseph's integrity opens doors for his household.", "Faithfulness can bless more than the faithful individual."),
  ] },
  { chapter: 47, startVerse: 7, endVerse: 12, reference: "Genesis 47:7-12", title: "Jacob Blesses Pharaoh", icon: "🙌", phrases: [
    deepPhrase("🙌 Jacob Blessed Pharaoh", "Jacob blesses the most powerful ruler in Egypt.", "The old shepherd stands before empire with covenant dignity.", "Power flows differently in God's story.", "Spiritual blessing is not measured by political rank."),
    deepPhrase("⏳ Few And Evil Have The Days Been", "Jacob summarizes his life as short and troubled.", "He is honest about hardship, deception, grief, and wandering.", "Faith does not require pretending life was easy.", "Tell the truth about sorrow while still trusting God."),
    deepPhrase("🍞 Joseph Nourished His Father", "Joseph provides bread for Jacob's household.", "The son once sold by his brothers now sustains them all.", "The dream has become family preservation.", "God can turn betrayal into provision without calling betrayal good."),
  ] },
  { chapter: 47, startVerse: 13, endVerse: 17, reference: "Genesis 47:13-17", title: "Egypt Trades For Bread", icon: "🍞", phrases: [
    deepPhrase("🌾 There Was No Bread", "The famine becomes severe across Egypt and Canaan.", "Joseph's stored grain is now the difference between life and death.", "The warning from Pharaoh's dreams is fully real.", "Preparation matters when crisis arrives."),
    deepPhrase("💰 Joseph Gathered Up All The Money", "The people spend their money for grain.", "The economy bends under famine pressure.", "Genesis shows survival becoming costly and systemic.", "Crisis tests both planning and justice."),
    deepPhrase("🐄 Give Your Cattle", "When money runs out, livestock becomes payment.", "Joseph continues administering food distribution during severe need.", "The famine strips away layers of security.", "Earthly resources can disappear quickly."),
  ] },
  { chapter: 47, startVerse: 18, endVerse: 22, reference: "Genesis 47:18-22", title: "The Land Comes To Pharaoh", icon: "🏜️", phrases: [
    deepPhrase("🏜️ Buy Us And Our Land", "The Egyptians offer themselves and their land for bread and seed.", "The famine reshapes the social order of Egypt.", "Joseph's administration centralizes land under Pharaoh.", "Survival decisions can carry long-term consequences."),
    deepPhrase("🌱 Give Us Seed", "The people need seed, not only immediate food.", "They are asking for a future after famine.", "Joseph's role includes keeping tomorrow alive.", "Wise provision thinks beyond today's hunger."),
    deepPhrase("⛪ Only The Land Of The Priests", "The priests' land is treated differently because they have a portion from Pharaoh.", "Genesis notes the social structure of Egypt without turning aside from the story.", "The famine affects groups differently based on power and provision.", "Pay attention to how systems protect some and expose others."),
  ] },
  { chapter: 47, startVerse: 23, endVerse: 26, reference: "Genesis 47:23-26", title: "Joseph Establishes A Fifth", icon: "📜", phrases: [
    deepPhrase("🌱 Lo, Here Is Seed", "Joseph gives seed back to the people so they can plant.", "This is not only extraction; it enables continued life and agriculture.", "The land can produce again after famine pressure.", "Leadership should preserve future fruitfulness."),
    deepPhrase("➗ The Fifth Part", "Joseph establishes a policy that a fifth belongs to Pharaoh.", "The arrangement becomes a long-standing law in Egypt.", "The crisis creates a permanent economic structure.", "Emergency decisions can become institutions."),
    deepPhrase("🛟 Thou Hast Saved Our Lives", "The people acknowledge that Joseph saved their lives.", "Even within a hard economic arrangement, they recognize preservation.", "Genesis holds together provision, power, and complexity.", "Be honest about both mercy and cost."),
  ] },
  { chapter: 47, startVerse: 27, endVerse: 31, reference: "Genesis 47:27-31", title: "Jacob Asks To Be Buried In Canaan", icon: "🪦", phrases: [
    deepPhrase("🌱 Israel Dwelt In Goshen", "Israel settles, grows, and gains possessions in Egypt.", "The family is being preserved and multiplied.", "God's promise is alive even outside Canaan.", "God can grow His people in a temporary place."),
    deepPhrase("⏳ The Time Drew Nigh", "Jacob senses his death approaching.", "He begins preparing Joseph for his burial request.", "The patriarch's final concerns point back to the promise land.", "Faith thinks about covenant even near death."),
    deepPhrase("🪦 Bury Me Not In Egypt", "Jacob does not want Egypt to be his final resting place.", "He lives there by God's provision, but his hope remains tied to Canaan.", "His burial request is an act of faith in God's promise.", "Where we place our hope matters at the end."),
    deepPhrase("🤝 Swear Unto Me", "Jacob asks Joseph to swear to carry him back.", "The oath gives weight to the burial request.", "Jacob is making sure the family remembers where home is.", "Promises help future generations hold direction."),
  ] },
  { chapter: 48, startVerse: 1, endVerse: 4, reference: "Genesis 48:1-4", title: "Jacob Remembers God's Promise", icon: "🛏️", phrases: [
    deepPhrase("🛏️ Thy Father Is Sick", "Joseph comes to Jacob when he hears his father is sick.", "The scene moves from public provision to family blessing.", "Jacob's final words will shape the next generation.", "Do not miss holy moments near the end of life."),
    deepPhrase("✨ God Almighty Appeared Unto Me", "Jacob remembers God's appearance at Luz/Bethel.", "At the end of life, he anchors blessing in God's old promise.", "His memory is theological, not merely sentimental.", "Pass on what God has spoken, not only what you have felt."),
  ] },
  { chapter: 48, startVerse: 5, endVerse: 7, reference: "Genesis 48:5-7", title: "Jacob Claims Joseph's Sons", icon: "👦", phrases: [
    deepPhrase("👦 Ephraim And Manasseh", "Jacob claims Joseph's sons as his own for inheritance purposes.", "This gives Joseph a double portion through his sons.", "The Egyptian-born boys are pulled into Israel's covenant line.", "God can include children born in foreign places."),
    deepPhrase("😭 As For Me, Rachel Died By Me", "Jacob remembers Rachel's death on the road.", "The blessing scene carries old grief with it.", "He does not forget the sorrow tied to Joseph and Benjamin's mother.", "Blessing can be spoken through tears remembered."),
  ] },
  { chapter: 48, startVerse: 8, endVerse: 12, reference: "Genesis 48:8-12", title: "Jacob Receives Joseph's Sons", icon: "👦", phrases: [
    deepPhrase("👀 Who Are These", "Jacob's eyes are dim, and he asks about the boys.", "The scene echoes Isaac's old age but moves toward blessing instead of deception.", "Joseph presents his sons openly.", "A family history of deception can be answered with clarity."),
    deepPhrase("🎁 They Are My Sons, Whom God Hath Given Me", "Joseph describes his sons as gifts from God.", "His words recognize grace in Egypt after years of suffering.", "The boys are living signs of fruitfulness in affliction.", "Name your blessings as gifts, not accidents."),
    deepPhrase("😘 He Kissed Them, And Embraced Them", "Jacob embraces Joseph's sons before blessing them.", "The old man receives a mercy he never expected when he thought Joseph dead.", "The scene is full of tenderness and restoration.", "God can give more than survival; He can give generational joy."),
  ] },
  { chapter: 48, startVerse: 13, endVerse: 16, reference: "Genesis 48:13-16", title: "Jacob Blesses Ephraim And Manasseh", icon: "🙌", phrases: [
    deepPhrase("✋ Guiding His Hands Wittingly", "Jacob crosses his hands intentionally.", "His weak eyes do not mean confused blessing.", "The reversal is deliberate, continuing Genesis' pattern of unexpected younger-son prominence.", "God's blessing is not bound by human birth order."),
    deepPhrase("🚶 God Before Whom My Fathers Did Walk", "Jacob blesses by naming the God of Abraham and Isaac.", "He places the boys inside the long covenant walk.", "Their identity is shaped by God's faithfulness across generations.", "Bless the next generation with the story of God's faithfulness."),
    deepPhrase("🐑 The God Which Fed Me All My Life Long", "Jacob describes God as the shepherd who has fed him all his life.", "This is a beautiful summary after years of wandering, fear, and grief.", "Jacob sees provision across the whole road.", "At the end, remember the Shepherd."),
    deepPhrase("😇 The Angel Which Redeemed Me", "Jacob speaks of the angel who redeemed him from evil.", "His life has needed rescue again and again.", "The blessing over the boys is grounded in God's preserving mercy.", "Pass on testimony of rescue, not just rules."),
  ] },
  { chapter: 48, startVerse: 17, endVerse: 20, reference: "Genesis 48:17-20", title: "The Younger Is Set Before The Older", icon: "🔁", phrases: [
    deepPhrase("😟 It Displeased Joseph", "Joseph tries to correct Jacob's crossed hands.", "He assumes Manasseh the firstborn should receive the greater blessing.", "Even Joseph has to learn that God's order may surprise him.", "Do not assume tradition always predicts God's choice."),
    deepPhrase("🙅 I Know It, My Son", "Jacob assures Joseph that he knows what he is doing.", "The reversal is intentional, not senility.", "God's blessing moves according to divine purpose.", "Trust God's wisdom when His order unsettles yours."),
    deepPhrase("🌊 His Seed Shall Become A Multitude", "Manasseh is blessed, but Ephraim receives the greater prominence.", "The younger surpassing the older echoes Isaac over Ishmael, Jacob over Esau, and Perez over Zerah.", "Genesis keeps teaching that grace is not controlled by birth rank.", "God chooses freely and wisely."),
  ] },
  { chapter: 48, startVerse: 21, endVerse: 22, reference: "Genesis 48:21-22", title: "God Will Bring You Again", icon: "🧭", phrases: [
    deepPhrase("🧭 God Shall Be With You", "Jacob tells Joseph that God will be with the family after his death.", "The promise does not depend on Jacob staying alive.", "God's presence will continue into the next generation.", "Covenant hope outlives leaders."),
    deepPhrase("🏞️ Bring You Again Unto The Land", "Jacob points beyond Egypt back to the land of the fathers.", "Even while blessing in Egypt, his hope remains tied to God's promise.", "This anticipates the Exodus long before it happens.", "Live in today's provision without forgetting God's final direction."),
    deepPhrase("🎁 One Portion Above Thy Brethren", "Jacob gives Joseph a special portion.", "Joseph's suffering and faithfulness are honored through inheritance.", "The family story is being ordered for the future tribes.", "God can bring lasting fruit from years of hidden pain."),
  ] },
];

function getDeepPhraseEntries(markdown: string, fallbackTitle: string, fallbackSummary: string) {
  const entries = [...markdown.matchAll(/### ([^\n]+)\n+([\s\S]*?)(?=\n### |\n## |$)/g)]
    .map((match) => ({
      title: match[1].trim(),
      body: match[2].replace(/\n+/g, " ").trim(),
    }))
    .filter((entry) => entry.title && entry.body)
    .slice(0, 6);

  if (entries.length > 0) return entries;

  return [
    { title: fallbackTitle, body: fallbackSummary },
    { title: "What Is Happening Here", body: fallbackSummary },
    { title: "Why This Matters", body: fallbackSummary },
  ];
}

function makeGeneratedGenesisPhrase(title: string, body: string, summary: string): [string, string] {
  return phrase(`📌 ${title}`, [
    body,
    summary,
    "📌 Notice: this phrase is carrying the story forward, not just filling space.",
    `💡 Meaning: ${body}`,
    "🧭 Follow the thread: Genesis is showing promise, character, consequence, and God's hidden providence.",
    "➡️ Lesson: read this as part of the larger covenant story, where God keeps working through real family pain and real faith.",
  ]);
}

function makeBeginnerGenesisPhrase(title: string, section: PersonalGenesisPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `${section.reference} is part of ${section.title}.`,
    focus,
    "For a beginner, the key is to ask what this detail reveals about God, people, pressure, and the next step in the story.",
    "📌 Notice: Genesis often teaches through repeated patterns: dreams, famine, fear, tests, recognition, blessing, and reversal.",
    "💡 Meaning: this section belongs to Joseph's preservation story, where God turns hidden suffering into wisdom, rescue, reconciliation, and future hope.",
    "➡️ Lesson: do not skip the small details; they often explain how God is moving the family toward His promise.",
  ]);
}

function ensureBeginnerGenesisPhraseDepth(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  const additions: Array<[string, string]> = [
    makeBeginnerGenesisPhrase("🧭 What Is Happening Here?", section, "This phrase gives the reader the scene: who is afraid, who is speaking, what is being tested, and where the family story is moving."),
    makeBeginnerGenesisPhrase("🔎 Why This Detail Matters", section, "This detail matters because Joseph's later chapters depend on careful recognition, delayed truth, wise planning, and changed hearts."),
    makeBeginnerGenesisPhrase("🧠 Beginner Connection", section, "A new Bible reader may not know why Genesis slows down here, but the slowdown helps us see character, guilt, mercy, or covenant hope more clearly."),
    makeBeginnerGenesisPhrase("🧵 Watch The Pattern", section, "Watch the pattern of reversal: the rejected brother rises, the hungry family bows, the guilty brothers are tested, and blessing moves through unexpected people."),
    makeBeginnerGenesisPhrase("❤️ What This Shows About People", section, "This scene shows people under pressure: fear exposes guilt, hunger forces action, grief resists hope, and love begins to replace self-protection."),
    makeBeginnerGenesisPhrase("🙌 What This Shows About God", section, "This scene shows God's providence working through timing, wisdom, famine, family tension, and promises that outlive one generation."),
  ];

  return {
    ...section,
    phrases: [...section.phrases, ...additions].slice(0, 7),
  };
}

function makeGenesisSectionsFromDeepStudy(
  sections: typeof BIBLE_YEAR_DAY_TWENTY_ONE_DEEP_STUDY_SECTIONS,
  icon: string,
): PersonalGenesisPhraseSectionInput[] {
  return sections.flatMap((section) => {
    const match = section.reference.match(/^Genesis (\d+):(\d+)-(\d+)$/);
    if (!match) return [];

    const chapter = Number(match[1]);
    const sectionStart = Number(match[2]);
    const sectionEnd = Number(match[3]);
    const phrases = getDeepPhraseEntries(section.markdown, section.title, section.summary).map((entry) =>
      makeGeneratedGenesisPhrase(entry.title, entry.body, section.summary),
    );
    const chunks: PersonalGenesisPhraseSectionInput[] = [];

    for (let startVerse = sectionStart; startVerse <= sectionEnd; startVerse += 6) {
      const endVerse = Math.min(startVerse + 5, sectionEnd);
      chunks.push({
        chapter,
        startVerse,
        endVerse,
        reference: `Genesis ${chapter}:${startVerse}-${endVerse}`,
        title: startVerse === sectionStart ? section.title : `${section.title} Continued`,
        icon,
        phrases,
      });
    }

    return chunks;
  });
}

const DAY_21_GENESIS_49_50_FINAL_SECTIONS = makeGenesisSectionsFromDeepStudy(
  BIBLE_YEAR_DAY_TWENTY_ONE_DEEP_STUDY_SECTIONS,
  "🕊️",
);

export const GENESIS_41_50_PERSONAL_SECTIONS = addGenesisFortyOneToFiftySectionTexture(
  [
    ...DAY_17_GENESIS_41_42_FINAL_SECTIONS,
    ...DAY_18_GENESIS_43_44_FINAL_SECTIONS,
    ...DAY_19_GENESIS_45_46_FINAL_SECTIONS,
    ...DAY_20_GENESIS_47_48_FINAL_SECTIONS,
    ...DAY_21_GENESIS_49_50_FINAL_SECTIONS,
    ...expandSplitSections(RAW_GENESIS_41_50_PERSONAL_SECTIONS.filter((section) => section.chapter < 41 || section.chapter > 50)),
  ].map((section) => (section.chapter >= 41 && section.chapter <= 50 ? ensureBeginnerGenesisPhraseDepth(section) : section)),
);
