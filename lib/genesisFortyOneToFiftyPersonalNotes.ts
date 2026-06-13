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

function addGenesisFortyOneToFiftyTexture(section: PersonalGenesisPhraseSectionInput, title: string, content: string) {
  if (section.chapter >= 41 && section.chapter <= 48) {
    return content;
  }

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
    phrases: section.phrases.map(([title, content]) => [title, addGenesisFortyOneToFiftyTexture(section, title, content)] as [string, string]),
  }));
}

const GENESIS_41_50_MOBILE_FORMAT_CUES: Record<number, string[]> = {
  41: ["🌙 Pharaoh's dreams expose a need Egypt cannot solve.", "🙌 Joseph gives God the credit.", "🌾 Wisdom prepares people before famine hits."],
  42: ["🙇 The brothers bow without knowing Joseph.", "💔 Old guilt begins to speak.", "🧪 Joseph tests what kind of men they have become."],
  43: ["🧍 Judah steps forward with responsibility.", "🎁 The brothers return with gifts and Benjamin.", "😭 Joseph's hidden emotion keeps rising."],
  44: ["🥣 The cup creates the final test.", "🗣️ Judah tells the truth plainly.", "🤲 The brother who once sold Joseph now offers himself."],
  45: ["😭 Joseph reveals himself through tears.", "🙌 God worked preservation through human evil.", "🤝 Forgiveness begins without pretending the sin was small."],
  46: ["🛕 Jacob worships before going down to Egypt.", "🌙 God promises to go with him.", "👨‍👩‍👧‍👦 The family enters Egypt as the seed of a nation."],
  47: ["🏞️ Israel is settled in Goshen.", "🍞 Famine pressure reshapes Egypt.", "🧓 Jacob lives as a pilgrim still trusting the promise."],
  48: ["🙌 Jacob blesses Joseph's sons.", "🔁 The younger is placed before the older again.", "🧭 God's promise guides the family order."],
  49: ["📣 Jacob speaks over the tribes.", "🦁 Judah receives royal hope.", "🌿 Joseph is blessed as fruitful through hardship."],
  50: ["💔 Genesis closes with death and mourning.", "🌱 God means good even through evil.", "⚰️ Joseph's bones point forward to the Exodus."],
};

function hasGenesisFortyOneToFiftyVisualList(content: string) {
  return content
    .split(/\n+/)
    .filter((line) => line.trim().length > 0)
    .some((line) => /^[^\w\s"']/.test(line.trim()));
}

function formatGenesisFortyOneToFiftyPhraseExplanation(
  section: PersonalGenesisPhraseSectionInput,
  content: string,
) {
  if (section.chapter >= 41 && section.chapter <= 50) {
    return content;
  }

  if (section.chapter < 41 || section.chapter > 50 || hasGenesisFortyOneToFiftyVisualList(content)) {
    return content;
  }

  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const cues = GENESIS_41_50_MOBILE_FORMAT_CUES[section.chapter];

  if (!cues || blocks.length < 2) {
    return content;
  }

  const opening = blocks.slice(0, Math.min(2, blocks.length));
  const closing = blocks.slice(opening.length);

  return note([
    ...opening,
    "What to notice:",
    ...cues,
    ...closing,
  ]);
}

function getGenesisFortyOneToFortyEightIcon(title: string) {
  if (/dream|river|kine|ears|famine|plenty|bread|corn|seed|fifth/i.test(title)) return "🌾";
  if (/pharaoh|ruler|ring|arrayed|servants|officers|law/i.test(title)) return "👑";
  if (/joseph|jacob|israel|benjamin|judah|father|brother|son|lad/i.test(title)) return "👨‍👩‍👦";
  if (/god|almighty|mercy|blessed|bless|angel|redeemed/i.test(title)) return "🙌";
  if (/egypt|goshen|canaan|beersheba|land/i.test(title)) return "📍";
  if (/money|sacks|cup|pledge|silver|gift/i.test(title)) return "🧾";
  if (/wept|haste|troubled|afraid|mourning|grief/i.test(title)) return "😭";
  if (/surety|servant|instead|near|send/i.test(title)) return "🤝";
  if (/right hand|left hand|firstborn|ephraim|manasseh|crossing/i.test(title)) return "✋";
  return "🔎";
}

function ensureGenesisFortyOneToFortyEightEmoji(title: string) {
  return /^[^A-Za-z0-9']+\s/.test(title) ? title : `${getGenesisFortyOneToFortyEightIcon(title)} ${title}`;
}

function cleanGenesisFortyOneToFortyEightFrameworkText(content: string) {
  return content
    .replace(/\bThis phrase matters because\b/gi, "This is important because")
    .replace(/\bThe phrase matters because\b/gi, "This is important because")
    .replace(/\bmatters because\b/gi, "is important because")
    .replace(/\bbelongs to\b/gi, "is part of")
    .replace(/\bnot filler\b/gi, "meaningful")
    .replace(/\bA beginner should see that\s*/gi, "Notice that ")
    .replace(/\bA beginner should see\s*/gi, "Notice ")
    .replace(/\bA beginner should notice that\s*/gi, "Notice that ")
    .replace(/\bA beginner should notice\s*/gi, "Notice ")
    .replace(/\bA beginner should\s+/gi, "The reader can ")
    .replace(/\bFor beginners,?\s*/gi, "")
    .replace(/\bThis phrase helps\s+/gi, "The wording helps ")
    .replace(/\bThe phrase helps\s+/gi, "The wording helps ")
    .replace(/^This phrase keeps Pharaoh from dividing the dreams into unrelated stories\./gm, "Pharaoh should not treat the two dreams as separate messages.")
    .replace(/^The phrase into Egypt is huge for the Bible story\./gm, "Going into Egypt is a major turn in the Bible story.")
    .replace(/^This phrase pictures victory over enemies\./gm, "The neck image pictures victory over enemies.")
    .replace(/^This phrase gathers shepherd and stone imagery around God's care and stability\./gm, "Shepherd and stone imagery gathers God's care and stability into one line.")
    .replace(/^This phrase likely means Joseph received these children as his own descendants with affection and recognition\./gm, "Joseph likely received these children as his own descendants with affection and recognition.")
    .replace(/\bTheology:\s*/gi, "")
    .replace(/\bMeaning:\s*/gi, "")
    .replace(/\bSignificance:\s*/gi, "")
    .replace(/\bApplication:\s*/gi, "");
}

function getGenesisFortyOneFortyTwoPhraseList(section: PersonalGenesisPhraseSectionInput, cleanTitle: string) {
  const lower = cleanTitle.toLowerCase();

  if (section.chapter >= 43 && section.chapter <= 44) {
    if (/judah|surety|lad|benjamin|father|israel|jacob|brother/.test(lower)) {
      return [
        `👥 ${cleanTitle}`,
        "👦 Benjamin at the center",
        "👴 Jacob's fear and love",
        "🤝 Judah learning responsibility",
      ];
    }

    if (/money|sack|gift|present|silver|cup|steward|house/.test(lower)) {
      return [
        `🧾 ${cleanTitle}`,
        "💰 Money and fear",
        "🏠 Joseph's house",
        "🔎 The test becoming sharper",
      ];
    }

    if (/eat|meal|bread|mess|drank|merry|set on/.test(lower)) {
      return [
        `🍽️ ${cleanTitle}`,
        "🏠 A table in Egypt",
        "👥 Brothers seated together",
        "💔 Hidden tension under the meal",
      ];
    }

    return [
      `🔎 ${cleanTitle}`,
      "👥 Joseph testing his brothers",
      "💔 Old sin being exposed",
      "🌱 Character beginning to change",
    ];
  }

  if (section.chapter >= 45 && section.chapter <= 46) {
    if (/joseph|brethren|brother|father|jacob|israel|benjamin/.test(lower)) {
      return [
        `👥 ${cleanTitle}`,
        "😭 Family grief meeting mercy",
        "🏠 Jacob's house being preserved",
        "🙌 God working through the pain",
      ];
    }

    if (/god|sent me|preserve life|remnant|great deliverance|fear not/.test(lower)) {
      return [
        `🙌 ${cleanTitle}`,
        "💔 Evil not getting the final word",
        "🌾 Life preserved through famine",
        "📜 God's promise family protected",
      ];
    }

    if (/egypt|goshen|wagons|goods|land|beersheba|journey/.test(lower)) {
      return [
        `📍 ${cleanTitle}`,
        "🚶 Jacob's family moving",
        "🏠 A place prepared in Egypt",
        "📜 Genesis promise moving forward",
      ];
    }

    return [
      `🔎 ${cleanTitle}`,
      "😭 Reconciliation unfolding",
      "🌾 Famine still shaping the story",
      "🙌 God preserving the family line",
    ];
  }

  if (section.chapter >= 47 && section.chapter <= 48) {
    if (/pharaoh|joseph|land|corn|money|cattle|servants|fifth/.test(lower)) {
      return [
        `🌾 ${cleanTitle}`,
        "🏛️ Egypt under famine pressure",
        "🧠 Joseph leading with wisdom",
        "🍞 Food preserving life",
      ];
    }

    if (/jacob|israel|days|years|die|bury|fathers|canaan/.test(lower)) {
      return [
        `👴 ${cleanTitle}`,
        "⏳ Jacob near the end",
        "📍 Hope still tied to Canaan",
        "📜 God's promise remembered",
      ];
    }

    if (/ephraim|manasseh|right hand|left hand|bless|blessed|angel|redeemed/.test(lower)) {
      return [
        `🙌 ${cleanTitle}`,
        "👶 Joseph's sons brought near",
        "✋ Blessing placed by faith",
        "📜 Covenant promise continuing",
      ];
    }

    return [
      `🔎 ${cleanTitle}`,
      "🏠 Israel living in Egypt",
      "📜 Canaan still matters",
      "🙌 God guiding the family forward",
    ];
  }

  if (section.chapter >= 49 && section.chapter <= 50) {
    if (/bless|blessing|gather|sons|tribes|judah|sceptre|shiloh|joseph/.test(lower)) {
      return [
        `🙌 ${cleanTitle}`,
        "👥 Jacob speaking over his sons",
        "📜 Future tribes in view",
        "👑 God's promise moving forward",
      ];
    }

    if (/bury|sepulchre|machpelah|canaan|father|died|embalmed|mourned/.test(lower)) {
      return [
        `⚰️ ${cleanTitle}`,
        "😭 Death and mourning",
        "📍 Canaan still the family hope",
        "📜 Promise stronger than Egypt",
      ];
    }

    if (/evil|good|fear not|forgive|god meant|preserve much people alive/.test(lower)) {
      return [
        `💔 ${cleanTitle}`,
        "⚖️ Human evil named honestly",
        "🙌 God working for good",
        "🌾 Many lives preserved",
      ];
    }

    return [
      `🔎 ${cleanTitle}`,
      "👴 Jacob's family at a turning point",
      "📜 Genesis promises still alive",
      "🙌 God carrying the story forward",
    ];
  }

  if (/dream|river|kine|ears|favoured|lean|thin|rank|blasted/.test(lower)) {
    if (section.chapter === 42) {
      return [
        `🌙 ${cleanTitle}`,
        "🙇 Brothers bowing before Joseph",
        "🧠 Joseph remembering what God showed him",
        "💔 Wisdom instead of quick revenge",
      ];
    }

    return [
      `🌙 ${cleanTitle}`,
      /kine/.test(lower) ? "🐄 Cows from the river" : /ears|corn/.test(lower) ? "🌾 Grain in the dream" : "👑 Pharaoh troubled by what he sees",
      "🙌 God sending a warning",
    ];
  }

  if (/magicians|wise men|none that could interpret|troubled/.test(lower)) {
    return [
      `🧠 ${cleanTitle}`,
      "🏛️ Egypt's best wisdom",
      "🚫 No answer from the palace",
      "🙌 Truth must come from God",
    ];
  }

  if (/butler|remember|faults|prison|dungeon|hebrew|servant/.test(lower)) {
    return [
      `🧠 ${cleanTitle}`,
      "⛓️ Joseph still in prison",
      "👑 Pharaoh now needs help",
      "⏳ God's timing opening the door",
    ];
  }

  if (/god|not in me|answer of peace|shewed|established|doubled/.test(lower)) {
    return [
      `🙌 ${cleanTitle}`,
      "🗣️ Joseph pointing away from himself",
      "👑 Pharaoh hearing God's message",
      "🌾 Egypt warned before famine",
    ];
  }

  if (/shaved|raiment|changed|brought him hastily/.test(lower)) {
    return [
      `🚪 ${cleanTitle}`,
      "⛓️ Joseph leaving the dungeon",
      "👑 Preparing for Pharaoh's court",
      "🧼 Egyptian public custom",
    ];
  }

  if (/seven years|plenty|famine|corn|food|store|fifth|gather|against the years/.test(lower)) {
    return [
      `🌾 ${cleanTitle}`,
      "📅 Years of plenty and hunger",
      "🍞 Food stored before need",
      "🧠 Wisdom preparing ahead",
    ];
  }

  if (/discreet|wise|over the land|officers|let pharaoh do this|look out a man/.test(lower)) {
    return [
      `🧠 ${cleanTitle}`,
      "👑 Leadership under pressure",
      "🌾 Planning before the famine",
      "🙌 Wisdom used to preserve life",
    ];
  }

  if (/ring|chain|fine linen|chariot|bow the knee|ruler|without thee|only in the throne/.test(lower)) {
    return [
      `👑 ${cleanTitle}`,
      "💍 Authority placed on Joseph",
      "🏛️ Egypt recognizing his role",
      "⛓️ Prison shame turned into service",
    ];
  }

  if (/manasseh|ephraim|born unto joseph|forget|fruitful/.test(lower)) {
    return [
      `👶 ${cleanTitle}`,
      "🏠 Joseph's family in Egypt",
      "💔 Pain remembered before God",
      "🌱 Fruitfulness in a strange land",
    ];
  }

  if (/brethren|brothers|bowed|spies|true men|honest|guilt|simeon|benjamin|money|sacks|father|jacob/.test(lower)) {
    return [
      `👥 ${cleanTitle}`,
      "🙇 Joseph's brothers before him",
      "💔 Old guilt rising again",
      section.chapter === 42 ? "🏠 Jacob's family under pressure" : "🌾 Famine driving the story",
    ];
  }

  return [
    `🔎 ${cleanTitle}`,
    section.chapter === 41 ? "👑 Joseph before Pharaoh" : "👥 Joseph and his brothers",
    section.chapter === 41 ? "🌾 God preserving life through wisdom" : "💔 Family sin being brought into the light",
  ];
}

function formatGenesisFortyOneToFortyEightRenderedPhrase(
  section: PersonalGenesisPhraseSectionInput,
  title: string,
  content: string,
): [string, string] {
  if (section.chapter < 41 || section.chapter > 50) {
    return [title, content];
  }

  const cleaned = cleanGenesisFortyOneToFortyEightFrameworkText(content);
  const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
  const paragraphs = cleaned
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const hasList = paragraphs.some((paragraph) => /^[^A-Za-z0-9'"(]/.test(paragraph));
  const expanded = hasList
    ? paragraphs
    : [
        ...paragraphs.slice(0, Math.min(2, paragraphs.length)),
        ...getGenesisFortyOneFortyTwoPhraseList(section, cleanTitle),
        ...paragraphs.slice(Math.min(2, paragraphs.length)),
      ];

  return [ensureGenesisFortyOneToFortyEightEmoji(title), note(expanded)];
}

function dedupeGenesisFortyOneToFortyEightSections(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  if (section.chapter < 41 || section.chapter > 50) {
    return section;
  }

  const byTitle = new Map<string, [string, string]>();
  for (const phraseCard of section.phrases) {
    const key = phraseCard[0].replace(/^[^A-Za-z0-9']+\s*/, "").trim().toLowerCase();
    const existing = byTitle.get(key);
    if (!existing || phraseCard[1].length > existing[1].length) {
      byTitle.set(key, phraseCard);
    }
  }

  return { ...section, phrases: [...byTitle.values()] };
}

function normalizeRepeatedGenesisFortyOneToFiftyLines(sections: PersonalGenesisPhraseSectionInput[]) {
  const counts = new Map<string, number>();
  const normalizeLine = (line: string) => line.toLowerCase().replace(/[.?!]+$/, "").trim();

  for (const section of sections) {
    if (section.chapter < 41 || section.chapter > 50) continue;
    for (const [, content] of section.phrases) {
      for (const line of content.split(/\n+/).map((item) => item.trim()).filter(Boolean)) {
        const key = normalizeLine(line);
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
  }

  return sections.map((section) => {
    if (section.chapter < 41 || section.chapter > 50) return section;

    return {
      ...section,
      phrases: section.phrases.map(([title, content]) => {
        const cleanTitle = title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
        const kept: string[] = [];

        for (const line of cleanGenesisFortyOneToFortyEightFrameworkText(content).split(/\n+/).map((item) => item.trim()).filter(Boolean)) {
          const key = normalizeLine(line);
          const isRepeated = (counts.get(key) ?? 0) >= 3;
          const isTitleLine = line.toLowerCase().includes(cleanTitle.toLowerCase());
          const isEmojiLine = /^[^A-Za-z0-9'"(]/.test(line);
          if (isRepeated && !isTitleLine && !isEmojiLine) continue;
          kept.push(line);
        }

        while (kept.length < 4) {
          const additions = [
            `${cleanTitle} keeps the reader close to the exact Bible wording.`,
            `It names a real detail God included in this part of the story.`,
            `That detail should be read slowly instead of skipped.`,
          ];
          kept.push(additions[kept.length % additions.length]);
        }

        return [title, note(kept)] as [string, string];
      }),
    };
  });
}

function formatGenesisFortyOneToFiftySectionExplanations(sections: PersonalGenesisPhraseSectionInput[]) {
  return normalizeRepeatedGenesisFortyOneToFiftyLines(sections.map((section) => ({
    ...section,
    phrases: section.phrases.map(([title, content]) =>
      formatGenesisFortyOneToFortyEightRenderedPhrase(
        section,
        title,
        formatGenesisFortyOneToFiftyPhraseExplanation(section, content),
      ),
    ),
  })));
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
  lesson,
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
  { chapter: 41, startVerse: 25, endVerse: 28, reference: "Genesis 41:25-28", title: "The Dream Is One Message", icon: "☝️", phrases: [
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

const day17Phrase = (title: string, lines: string[]): [string, string] => phrase(title, lines);

const DAY_17_REAL_PHRASE_ADDITIONS: Record<string, Array<[string, string]>> = {
  "Genesis 41:1-4": [
    day17Phrase("🌊 Came Up Out Of The River", ["The cows come up from the river because Egypt's food life was tied to the Nile.", "For a beginner, this helps explain why the dream feels so serious.", "The river was supposed to mean life, water, crops, and security.", "But in this dream, danger rises from the same place Egypt trusted.", "God is warning Pharaoh in the language of Egypt's own world."]),
    day17Phrase("🌿 Fed In A Meadow", ["The healthy cows are not only alive; they are feeding in a place of supply.", "The picture is peaceful before it becomes frightening.", "Genesis lets us feel the good season before it is swallowed by famine.", "That matters because the coming plenty will be real, not imaginary.", "God is not only warning about loss. He is also revealing the abundance that must be stewarded."]),
    day17Phrase("😟 Poor And Very Ill Favoured", ["The thin cows look weak, ugly, and deeply unhealthy.", "This is famine pictured as something visibly wrong.", "A beginner may miss that the dream is using bodies to show a food crisis.", "The land will look alive for a while, but hunger is coming behind it.", "God is giving Pharaoh a disturbing picture so Egypt will not sleep through the warning."]),
    day17Phrase("🐄 Stood By The Other Kine", ["The thin cows stand beside the healthy cows before they eat them.", "That detail shows the danger arriving close to the blessing.", "The famine will not be a distant idea forever; it will stand right beside the years of plenty.", "Genesis is teaching the reader to pay attention while things still look good.", "Wisdom prepares before the thin years start eating the full years."]),
    day17Phrase("😨 Pharaoh Awoke", ["Pharaoh wakes up shaken by the dream.", "The most powerful man in Egypt cannot control what God has placed before him.", "His waking shows that the dream lands with force.", "He does not yet understand it, but he knows it matters.", "God can trouble a ruler's sleep when He is ready to preserve lives."]),
  ],
  "Genesis 41:5-8": [
    day17Phrase("🌾 Seven Ears Of Corn", ["Corn here means grain, not modern corn on the cob.", "The dream moves from cows to harvest so the message covers Egypt's whole food supply.", "A beginner may not know that 'ears' means heads of grain.", "The number seven links this dream to the first one.", "God is repeating the warning through another picture so Pharaoh cannot miss it."]),
    day17Phrase("🌱 One Stalk", ["The seven good ears grow on one stalk, showing fullness and unusual abundance.", "The image is packed with fruitfulness.", "Genesis is not giving a farming detail for decoration.", "It is showing a season where supply will be concentrated and rich.", "That richness will become the storehouse God uses to preserve life."]),
    day17Phrase("🌾 Rank And Good", ["Rank here means healthy, full, and strong.", "The good grain represents the years when Egypt will have more than enough.", "This is the kind of season people can waste if they assume it will last forever.", "Joseph will later teach Pharaoh to treat plenty as preparation.", "Good years are gifts, but they are also assignments."]),
    day17Phrase("😟 Seven Thin Ears", ["The thin ears picture harvest failure.", "They are the opposite of the full, healthy grain.", "The famine is not only about hungry animals; it is about empty fields.", "God is showing Pharaoh that the crisis will touch the table, the market, and the whole land.", "When bread is threatened, the whole nation trembles."]),
    day17Phrase("🤐 None That Could Interpret", ["Egypt has magicians and wise men, but none can explain the dream.", "This failure is important because it clears the room for Joseph.", "The palace has power, learning, and religion, but it does not have God's interpretation.", "A beginner should see the contrast: Egypt is loud with experts, but silent before God's message.", "Joseph will enter with humility, not magic."]),
  ],
  "Genesis 41:9-13": [
    day17Phrase("😔 My Faults This Day", ["The butler admits he has failed to remember Joseph.", "This is not a heroic confession first; it is a late one.", "Joseph spent two more years forgotten because this man did not speak sooner.", "But God still uses the delayed memory at exactly the right moment.", "Human failure does not cancel divine timing."]),
    day17Phrase("😡 Pharaoh Was Wroth", ["Wroth means very angry.", "The butler is remembering the day Pharaoh placed him and the baker in custody.", "That old prison episode now becomes the bridge to Joseph's promotion.", "A beginner can see how a painful chapter from Genesis 40 was not wasted.", "God had placed Joseph near a future witness before Joseph knew why."]),
    day17Phrase("🏠 Captain Of The Guard's House", ["Joseph was not in a random place.", "The captain of the guard's house connected him to royal officials.", "His prison location became part of God's hidden positioning.", "Genesis often shows God working through places that look like setbacks.", "The same place that confined Joseph also put his gift near Pharaoh's court."]),
    day17Phrase("🌙 We Dreamed A Dream", ["The butler reminds Pharaoh that dreams had happened before.", "Joseph did not guess; he interpreted what came to pass.", "This prepares Pharaoh to trust Joseph with a much bigger dream.", "God built Joseph's credibility in a smaller prison scene.", "Faithfulness in small rooms can matter when larger doors open."]),
    day17Phrase("🧑 An Hebrew", ["The butler identifies Joseph as a Hebrew.", "Joseph is foreign, enslaved, and imprisoned, which should make him easy to dismiss.", "But the story keeps showing that God's wisdom is not limited by status or nationality.", "Egypt needs help from the man Egypt would not naturally honor.", "God can make outsiders carriers of truth."]),
    day17Phrase("⚖️ Me He Restored, And Him He Hanged", ["The butler remembers both outcomes of Joseph's interpretations.", "One man was restored, and the other was judged.", "That shows Joseph's words were not vague or lucky.", "The interpretation matched reality in opposite directions.", "Pharaoh is hearing that Joseph can speak hard truth as well as hopeful truth."]),
  ],
  "Genesis 41:14-16": [
    day17Phrase("📣 Pharaoh Sent And Called Joseph", ["Joseph does not promote himself into Pharaoh's court.", "He is summoned when the time comes.", "The call arrives after years where nothing seemed to move.", "That makes the moment feel sudden, but it has been prepared quietly.", "God knows how to call a person forward when the assignment is ready."]),
    day17Phrase("⛓️ Out Of The Dungeon", ["Dungeon reminds the reader where Joseph has been.", "This is not a comfortable waiting room; it is a place of confinement.", "The contrast matters: the man who enters the palace is coming from below.", "Genesis wants us to feel the reversal.", "God can raise someone without pretending the low place was easy."]),
    day17Phrase("👕 Changed His Raiment", ["Joseph changes clothes before standing before Pharaoh.", "Clothing has mattered throughout his story: the coat, the garment left with Potiphar's wife, and now court clothing.", "Each clothing scene marks a major turn in Joseph's life.", "This time the change prepares him for responsibility instead of accusation.", "God is moving Joseph from prison appearance to public service."]),
    day17Phrase("🌙 I Have Dreamed A Dream", ["Pharaoh names the problem plainly: he has dreamed and needs interpretation.", "The ruler cannot solve the message by rank or force.", "His need opens the door for Joseph's gift.", "Genesis is showing that true wisdom is needed at the center of power.", "Authority without understanding still has to ask for help."]),
    day17Phrase("🕊️ God Shall Give Pharaoh An Answer Of Peace", ["Joseph says God will answer Pharaoh.", "Peace does not mean the message will be easy; famine is coming.", "It means Pharaoh will not be left in confusion.", "Joseph points to God as the source of clarity before giving any explanation.", "The first thing Joseph does in the palace is give God the credit."]),
  ],
  "Genesis 41:17-21": [
    day17Phrase("🌊 Upon The Bank Of The River", ["Pharaoh repeats the river setting because it stayed vivid in his mind.", "The Nile was Egypt's symbol of life and supply.", "The dream places the coming crisis right beside that symbol.", "For a beginner, this helps the scene feel grounded instead of random.", "God's warning reaches Pharaoh through images he understands."]),
    day17Phrase("🐄 Fatfleshed And Well Favoured", ["The first cows are full and healthy.", "They represent a season that will look successful and secure.", "This detail matters because the famine will not arrive first.", "Egypt will have a window of abundance before the crisis.", "The wise question is what they will do with the full years."]),
    day17Phrase("😰 Never Saw In All The Land Of Egypt", ["Pharaoh says he had never seen cows this ugly in Egypt.", "That makes the dream feel extreme, not ordinary.", "The coming famine will be unlike normal shortage.", "Genesis uses Pharaoh's own alarm to show the severity of the warning.", "God is making the danger unforgettable."]),
    day17Phrase("🕳️ They Had Eaten Them Up", ["The thin cows consume the healthy cows.", "This is the image Joseph will explain as famine swallowing plenty.", "The scary part is that the thin cows still look thin afterward.", "That means the famine will be so severe that past abundance will not feel remembered.", "Without wisdom, yesterday's plenty cannot protect tomorrow's hunger."]),
    day17Phrase("😟 They Were Still Ill Favoured", ["The thin cows do not become healthy after eating the fat cows.", "This shows the famine will not be satisfied easily.", "The loss will feel bottomless if Egypt does not prepare.", "The image helps a beginner understand why Joseph's storage plan is urgent.", "A crisis this severe needs wisdom before it arrives."]),
  ],
  "Genesis 41:22-24": [
    day17Phrase("🌾 Seven Ears Came Up", ["Pharaoh's second dream repeats the number seven.", "The two dreams are speaking together.", "A beginner may think the second dream is separate, but Joseph will say it is one message.", "God repeats the picture so the meaning is established.", "The grain dream confirms the cow dream."]),
    day17Phrase("🌱 Full And Good", ["The full grain represents years of strong harvest.", "Egypt will not go straight into famine.", "There will first be a season when barns can be filled.", "God is showing both provision and responsibility.", "The good years are the mercy that makes preparation possible."]),
    day17Phrase("🌬️ Withered, Thin, And Blasted", ["These three words pile up the damage.", "The grain is dried out, weak, and ruined by harsh wind.", "Genesis wants the reader to feel how complete the failure will be.", "It is not a small shortage; it is a collapse of harvest.", "The warning is severe because the danger is severe."]),
    day17Phrase("🍽️ The Thin Ears Devoured The Seven Good Ears", ["The grain dream repeats the same devouring pattern as the cows.", "Famine will eat up the memory and supply of plenty.", "This helps Pharaoh see that both dreams point in the same direction.", "For the reader, repetition makes the warning impossible to ignore.", "God is being clear before He is severe."]),
    day17Phrase("📢 I Told This Unto The Magicians", ["Pharaoh had already searched Egypt's normal wisdom channels.", "He did not call Joseph first.", "That makes Joseph's coming even more significant.", "The old systems failed before God's servant spoke.", "God's wisdom stands out most clearly when human wisdom runs out."]),
  ],
  "Genesis 41:25-28": [
    day17Phrase("👀 God Hath Shewed Pharaoh", ["Joseph says God is showing Pharaoh what He is about to do.", "The dream is not merely about Pharaoh's anxiety.", "It is revelation from God about the future.", "A beginner should notice how Joseph keeps the focus on God, not on himself.", "The message belongs to God before it becomes Joseph's interpretation."]),
    day17Phrase("🐄 The Seven Good Kine Are Seven Years", ["Joseph begins matching the dream images to time.", "The healthy cows are not literal cows to chase; they symbolize years of plenty.", "This helps readers understand how biblical dreams can use pictures for meaning.", "Joseph gives the interpretation plainly.", "God's message becomes understandable through the wisdom He gives."]),
    day17Phrase("🌾 The Seven Good Ears Are Seven Years", ["The grain confirms the same timeline as the cows.", "Two pictures point to one seven-year season.", "That unity matters because Pharaoh needs confidence to act.", "God is not giving a puzzle for entertainment.", "He is giving a clear warning so Egypt can prepare."]),
    day17Phrase("☝️ The Dream Is One", ["This phrase keeps Pharaoh from dividing the dreams into unrelated stories.", "Joseph gathers the images into one message.", "For a beginner, this is a key Bible reading skill: look for repeated patterns.", "The cows and grain are different pictures but the same warning.", "God often confirms truth through repetition."]),
    day17Phrase("⚠️ What God Is About To Do", ["Joseph says the future is under God's action.", "Egypt's harvests are not outside God's rule.", "The phrase gives the whole scene a bigger frame than weather or politics.", "God is sovereign over abundance and famine.", "Joseph speaks as a servant who knows history belongs to God."]),
  ],
  "Genesis 41:29-32": [
    day17Phrase("🌾 Great Plenty Throughout All The Land Of Egypt", ["The coming plenty will touch the whole land.", "God is giving Egypt a wide season of supply before the famine.", "This means there will be enough to store if the people act wisely.", "The abundance is not the end of the story; it is preparation for what comes next.", "Blessing becomes responsibility when need is ahead."]),
    day17Phrase("🕳️ All The Plenty Shall Be Forgotten", ["The famine will be so heavy that the good years will feel erased.", "This is a sobering phrase because it shows how quickly crisis can swallow memory.", "A beginner may know this feeling: one hard season can make every blessing seem far away.", "Joseph is not exaggerating; he is pressing urgency.", "Prepare while the plenty is still visible."]),
    day17Phrase("🍽️ The Famine Shall Consume The Land", ["Consume means eat up or use up.", "The famine will drain Egypt's supply if nothing is stored.", "This phrase turns the dream image into direct warning.", "The thin cows and thin grain now become real national danger.", "God gives the meaning so Egypt can choose wisdom before hunger chooses for them."]),
    day17Phrase("🔁 The Dream Was Doubled", ["Joseph explains why Pharaoh had two dreams.", "The repetition means the message is established by God.", "This is not Pharaoh's imagination looping in fear.", "God is confirming the matter with a second witness.", "When God repeats Himself, the reader should slow down."]),
    day17Phrase("⏱️ God Will Shortly Bring It To Pass", ["The warning is not for a distant future only.", "The events will begin soon, so Pharaoh must respond quickly.", "Joseph's words create urgency without panic.", "The right response is wise leadership and preparation.", "God's warning comes with enough time to obey."]),
  ],
  "Genesis 41:33-36": [
    day17Phrase("👀 Let Pharaoh Look Out", ["Joseph moves from interpretation into counsel.", "He does not leave Pharaoh with information only.", "The phrase begins the practical response to God's warning.", "A beginner can see that wisdom asks, 'What should we do now?'", "God-given understanding should lead to faithful action."]),
    day17Phrase("👥 Appoint Officers Over The Land", ["Joseph calls for organized leadership across Egypt.", "The coming famine is too big for vague good intentions.", "People must be appointed, systems must be built, and grain must be gathered.", "The Bible is showing practical wisdom, not panic.", "Preparation often needs structure."]),
    day17Phrase("➗ The Fifth Part", ["Joseph recommends saving one-fifth of the produce during the good years.", "This gives Pharaoh a concrete plan.", "The phrase matters because Joseph turns revelation into measurable stewardship.", "Faith does not mean refusing numbers, storage, or administration.", "Wise planning can become the tool God uses to preserve life."]),
    day17Phrase("🏙️ Keep Food In The Cities", ["The food will be stored close to the people who will need it.", "Joseph's plan is local, organized, and realistic.", "He is thinking ahead about distribution, not just collection.", "A beginner should see how deeply practical biblical wisdom can be.", "God's rescue often works through careful preparation."]),
    day17Phrase("📦 Food Shall Be For Store", ["Store means a reserve kept for the future.", "Joseph wants Egypt to treat abundance as something to guard, not waste.", "The phrase teaches stewardship in simple language.", "The plenty years are not just for comfort; they are for preservation.", "Stored grain will become mercy when hunger comes."]),
  ],
  "Genesis 41:37-40": [
    day17Phrase("👥 In The Eyes Of Pharaoh's Servants", ["Joseph's plan seems good not only to Pharaoh but also to his servants.", "The court recognizes wisdom when it hears it.", "This matters because Joseph is a foreign former prisoner speaking in Egypt's highest room.", "God gives him favor before many witnesses.", "True wisdom can cut through status barriers."]),
    day17Phrase("❓ Can We Find Such A One As This", ["Pharaoh sees Joseph as uniquely suited for the crisis.", "The question shows how quickly God has changed Joseph's public standing.", "The forgotten prisoner becomes the obvious leader.", "A beginner should feel the reversal in this line.", "God's preparation can make a person ready before anyone else knows their name."]),
    day17Phrase("🧠 Forasmuch As God Hath Shewed Thee", ["Pharaoh connects Joseph's wisdom to God's revelation.", "Joseph did not hide the source, and Pharaoh repeats it back.", "This means Joseph's humility became part of his witness.", "He gave God credit, and God was named in Egypt's court.", "Pointing away from yourself can make God more visible."]),
    day17Phrase("🏠 Thou Shalt Be Over My House", ["Pharaoh places Joseph over his household and administration.", "This is authority at the center of Egypt's power.", "Joseph once managed Potiphar's house and the prison; now he manages Pharaoh's house.", "The pattern shows hidden faithfulness growing into larger responsibility.", "God can train leadership in places that feel small."]),
    day17Phrase("👑 Only In The Throne", ["Pharaoh keeps the throne, but Joseph receives authority under him.", "This clarifies Joseph's role: he is not Pharaoh, but he governs by Pharaoh's command.", "The distinction matters for understanding the story.", "Joseph has immense power, but it is delegated power.", "Even promotion has boundaries."]),
  ],
  "Genesis 41:41-45": [
    day17Phrase("👑 I Have Set Thee", ["Pharaoh publicly appoints Joseph over Egypt.", "The words make official what God has been preparing quietly.", "Joseph's rise is not self-made ambition; it is appointed responsibility.", "The scene moves him from hidden suffering to visible service.", "Promotion in Genesis is for preservation, not vanity."]),
    day17Phrase("💍 His Ring From His Hand", ["The ring represents authority to act in Pharaoh's name.", "It is a physical sign that Joseph can make binding decisions.", "For a beginner, this helps explain why the ring matters.", "Joseph is now trusted with real power.", "God places authority in the hand that had once been bound."]),
    day17Phrase("👕 Vestures Of Fine Linen", ["Joseph receives clothing that matches his new office.", "His story has repeatedly turned on garments.", "The special coat brought hatred, Potiphar's wife's garment brought accusation, and this garment marks honor.", "Genesis uses clothing to show public identity shifting.", "God is not erasing the past, but He is changing Joseph's place."]),
    day17Phrase("📿 A Gold Chain About His Neck", ["The gold chain is another sign of honor and authority.", "Joseph's neck had known slavery and imprisonment, but now it bears public dignity.", "The detail helps readers feel the reversal.", "Egypt now honors the man it once held in prison.", "God can rewrite public shame into public responsibility."]),
    day17Phrase("🛞 The Second Chariot", ["Joseph rides in the second chariot, just beneath Pharaoh.", "The whole land sees his promotion.", "This public honor contrasts with the secrecy of the pit and prison.", "God's timing moves Joseph from unseen faithfulness to visible leadership.", "The position is high because the work ahead is heavy."]),
    day17Phrase("📣 Bow The Knee", ["The command makes Egypt recognize Joseph's authority.", "It also echoes Joseph's earlier dreams about bowing.", "The brothers are not present yet, but the theme is already moving.", "God's word is unfolding wider than Joseph could have imagined.", "The dream was never only about Joseph's ego; it was about God's plan to preserve life."]),
    day17Phrase("🏷️ Zaphnath-paaneah", ["Pharaoh gives Joseph an Egyptian name.", "This shows Joseph entering Egyptian public life deeply.", "Yet the story keeps showing that Joseph's God remains the source of his wisdom.", "A new setting and name do not erase his covenant identity.", "God can keep a person faithful inside a foreign system."]),
    day17Phrase("💍 Asenath", ["Pharaoh gives Joseph Asenath as his wife.", "Joseph now has a household in Egypt.", "This detail prepares for Manasseh and Ephraim, his sons.", "The family story is growing in a foreign land.", "God can bring fruitfulness even where the story once looked like exile."]),
  ],
  "Genesis 41:46-49": [
    day17Phrase("🚶 Joseph Went Out From The Presence Of Pharaoh", ["Joseph leaves Pharaoh's presence and immediately begins the work.", "He does not treat promotion as a trophy.", "The office sends him into responsibility across the land.", "A beginner should notice the movement: interpreted dream, wise plan, public authority, active service.", "God's gifts are meant to serve real needs."]),
    day17Phrase("🌍 Throughout All The Land Of Egypt", ["Joseph's assignment covers the whole land.", "The coming famine will be broad, so the preparation must be broad too.", "This phrase shows the scale of his responsibility.", "He is not managing one household anymore.", "God has enlarged the field because many lives will depend on the work."]),
    day17Phrase("🌱 By Handfuls", ["The land produces abundantly during the plenty years.", "The phrase gives a picture of generous harvests.", "God's warning is joined to God's supply.", "There is enough to gather because God gives the season Joseph described.", "Abundance is mercy before scarcity."]),
    day17Phrase("🏙️ Laid Up In Every City", ["Joseph stores food city by city.", "This is practical administration, not vague inspiration.", "The grain is placed near the fields and people connected to each city.", "That makes future distribution possible.", "Wise leadership prepares in a way people can actually use."]),
    day17Phrase("🧮 Left Numbering", ["The grain becomes too much to count.", "This phrase shows the size of the provision.", "Egypt's storehouses are filling before the famine begins.", "The abundance is not accidental; it matches the word Joseph gave.", "God's provision can be larger than human accounting."]),
  ],
  "Genesis 41:50-52": [
    day17Phrase("⏳ Before The Years Of Famine Came", ["Joseph's sons are born before the famine.", "This timing matters because God gives Joseph family joy before the hardest years arrive.", "The children become signs of life in a land that will soon face hunger.", "Genesis places personal blessing beside public responsibility.", "God can give tenderness in the middle of a heavy calling."]),
    day17Phrase("👶 Bare Unto Him", ["Asenath bears Joseph two sons.", "The family line continues in Egypt.", "A beginner should notice that Joseph's story is not only about career elevation.", "It is also about God preserving a household and future tribes.", "The promise keeps growing in unexpected soil."]),
    day17Phrase("😌 God Hath Made Me Forget", ["Manasseh's name is tied to relief from pain.", "Joseph is not saying his past never happened.", "He is saying God has eased the crushing weight of his toil and family sorrow.", "That is important for readers who confuse healing with pretending.", "God can loosen grief without erasing memory."]),
    day17Phrase("🏠 All My Father's House", ["Joseph names his father's house when naming Manasseh.", "Even in Egypt, his family story is still inside him.", "The old wounds have not vanished from his heart.", "His son's name shows both distance and memory.", "God's healing works inside real history, not amnesia."]),
    day17Phrase("🌱 Fruitful In The Land Of My Affliction", ["Ephraim's name says God made Joseph fruitful where he suffered.", "This is one of the most beautiful summaries of Joseph's life.", "Egypt was the land of slavery, false accusation, prison, and now fruitfulness.", "A beginner should see that fruitfulness does not mean the affliction was good.", "It means God was faithful inside it."]),
  ],
  "Genesis 41:53-57": [
    day17Phrase("🕳️ The Seven Years Of Dearth Began", ["Dearth means famine or severe lack.", "The hard years arrive just as Joseph said.", "This confirms that the dream came from God and the interpretation was true.", "The word may sound old, but the meaning is simple: hunger has entered the land.", "The warning has now become reality."]),
    day17Phrase("🍞 In All The Land Of Egypt There Was Bread", ["Egypt has bread because Joseph stored grain in the good years.", "This line shows preparation becoming preservation.", "While other lands are hungry, Egypt has supply.", "The bread is not magic; it is God's warning joined to wise stewardship.", "Obedient planning can become mercy for many people."]),
    day17Phrase("📣 The People Cried To Pharaoh For Bread", ["The famine reaches ordinary people, and they cry to Pharaoh.", "This shows the crisis moving from dream to public desperation.", "Hunger makes people seek help from the ruler.", "Pharaoh then points them to Joseph.", "God has placed Joseph exactly where the cries will come."]),
    day17Phrase("🔓 Joseph Opened All The Storehouses", ["Joseph opens the places where grain has been stored.", "The years of gathering now turn into years of giving out.", "This is the moment the wisdom of preparation becomes visible.", "A beginner can see why the earlier details mattered.", "God saved lives through stored bread and faithful administration."]),
    day17Phrase("🌍 All Countries Came Into Egypt", ["The famine reaches beyond Egypt, and nations come for grain.", "This line sets up Joseph's brothers arriving in Genesis 42.", "The story is widening, but it is also circling back to one family.", "God is using a regional famine to move the covenant story forward.", "The road to reconciliation begins with hunger."]),
  ],
  "Genesis 42:1-5": [
    day17Phrase("🌾 There Was Corn In Egypt", ["Corn means grain or food supply in this KJV wording.", "Jacob hears there is food in Egypt while Canaan suffers famine.", "This detail connects directly to Joseph's storage work in Genesis 41.", "The family does not know it yet, but Joseph's wisdom is about to feed them.", "God's hidden provision is waiting in the place they fear."]),
    day17Phrase("⬇️ Get You Down Thither", ["Jacob tells his sons to go down to Egypt.", "Biblical geography often says going down when traveling from Canaan toward Egypt.", "The phrase also carries emotional weight because Egypt is where Joseph disappeared.", "The family must move toward the place tied to old pain.", "Sometimes survival forces movement toward truth."]),
    day17Phrase("🍞 That We May Live, And Not Die", ["Jacob's words show the famine is life-or-death.", "This is not a casual shopping trip.", "The hunger is pressing the family into action.", "God uses need to move the brothers toward Joseph.", "The road to healing often begins because staying still is no longer possible."]),
    day17Phrase("🔟 Joseph's Ten Brethren", ["The ten brothers go to Egypt without Benjamin.", "These are the same brothers connected to Joseph's betrayal.", "The number matters because the family is not whole.", "Benjamin's absence keeps Jacob's fear visible.", "Genesis is carefully arranging the test around the old wound."]),
    day17Phrase("😟 Lest Peradventure Mischief Befall Him", ["Jacob fears harm will happen to Benjamin.", "Peradventure means perhaps, and mischief here means disaster or harm.", "Jacob is still guarding Rachel's remaining son because he believes Joseph is gone.", "His grief is understandable, but it keeps the family trapped.", "Fear can make love protective in ways that delay trust."]),
  ],
  "Genesis 42:6-9": [
    day17Phrase("💰 He It Was That Sold", ["Joseph is the one selling grain to the people.", "The brother once sold for silver now controls the sale of bread.", "Genesis is full of reversal here.", "The brothers used selling to harm Joseph, but Joseph now sells grain to preserve life.", "God can turn a word loaded with pain into a place of mercy."]),
    day17Phrase("🙇 With Their Faces To The Earth", ["The brothers bow low before Joseph.", "This directly echoes the dreams that made them hate him in Genesis 37.", "They do not know they are fulfilling what they resisted.", "A beginner should feel the story clicking into place.", "God's word can stand quietly for years and still come true."]),
    day17Phrase("🎭 Made Himself Strange", ["Joseph disguises his identity and speaks as if he is a stranger.", "He is not playing games for entertainment.", "He is creating a test to discover whether his brothers have changed.", "Immediate reveal would skip the truth work this family needs.", "Wisdom sometimes slows down reconciliation."]),
    day17Phrase("🗣️ Spake Roughly Unto Them", ["Joseph speaks harshly to press the brothers.", "This does not mean he has no feeling; later he weeps.", "The rough speech creates pressure so hidden guilt will surface.", "Genesis shows Joseph using power carefully but firmly.", "Healing old betrayal requires truth, not quick softness."]),
    day17Phrase("🧠 Knew His Brethren", ["Joseph recognizes his brothers, but they do not recognize him.", "This uneven knowledge creates tension in the scene.", "Joseph sees the whole past standing before him.", "The brothers only see an Egyptian ruler.", "God has brought them into Joseph's hands, but Joseph must decide what kind of man he will be with power."]),
  ],
  "Genesis 42:10-13": [
    day17Phrase("🙅 Nay, My Lord", ["The brothers deny Joseph's accusation.", "They are afraid because they stand before a ruler who can imprison or execute them.", "Their speech is humble because they are powerless in Egypt.", "The power balance has completely reversed from Genesis 37.", "The ones who once controlled Joseph's fate now plead before him."]),
    day17Phrase("🍞 To Buy Food Are Thy Servants Come", ["They explain the practical reason for their journey.", "They are not spies; they are hungry men sent by a starving father.", "The famine has made proud brothers needy.", "Genesis often uses physical need to expose spiritual truth.", "Their hunger is real, but it is also moving them into a deeper reckoning."]),
    day17Phrase("👨‍👦 One Man's Sons", ["The brothers identify themselves as sons of one father.", "Family identity is central to the test.", "Joseph needs to know what has happened to Jacob and Benjamin.", "Their words begin pulling the hidden family story into the open.", "The wound was family betrayal, so the healing must deal with the family honestly."]),
    day17Phrase("👶 The Youngest Is This Day With Our Father", ["The brothers reveal Benjamin is alive and with Jacob.", "This is the information Joseph needs.", "Benjamin is Joseph's full brother, Rachel's other son.", "The test will center on whether the brothers will protect him.", "God is bringing the old pattern of favoritism and jealousy back into the light."]),
    day17Phrase("🕯️ One Is Not", ["They speak of Joseph as if he is gone.", "The painful irony is that Joseph is listening to them say it.", "This phrase shows how the lie has become part of the family language.", "They do not say what happened; they only say he is not.", "Hidden sin often survives by speaking in half-truths."]),
  ],
  "Genesis 42:14-17": [
    day17Phrase("🧪 Hereby Ye Shall Be Proved", ["Joseph sets up a test.", "Proved means examined or shown to be true.", "He wants evidence, not just claims of honesty.", "The test will reveal whether the brothers can be trusted with Benjamin.", "Real repentance has to become visible in choices."]),
    day17Phrase("👶 Except Your Youngest Brother Come Hither", ["Joseph requires Benjamin to come to Egypt.", "This demand touches the exact place Jacob fears most.", "It also tests whether the brothers will bring Rachel's son safely or abandon him.", "The old betrayal cannot be healed while Benjamin stays outside the story.", "Truth pulls the protected wound into the open."]),
    day17Phrase("📨 Send One Of You", ["Joseph first proposes that one brother go fetch Benjamin while the others remain confined.", "The pressure is intense and frightening.", "This forces the brothers to feel how vulnerable they are under another man's authority.", "They once held Joseph powerless; now they know powerlessness.", "The reversal is part of the moral weight of the scene."]),
    day17Phrase("🔒 Ye Shall Be Kept In Prison", ["Joseph threatens imprisonment if their words are false.", "Prison has shaped Joseph's own life, so this detail lands heavily.", "He knows what confinement feels like.", "The brothers are being pressed in a way that awakens memory.", "God can use pressure to make buried guilt speak."]),
    day17Phrase("📅 Three Days", ["The brothers are kept in ward for three days.", "The short confinement gives them time to sit with fear and memory.", "It is not the years Joseph endured, but it is enough to shake them.", "Genesis slows the scene so conscience can begin waking up.", "Waiting under pressure often reveals what is inside the heart."]),
  ],
  "Genesis 42:18-20": [
    day17Phrase("✅ This Do, And Live", ["Joseph changes the terms and offers them a way to live.", "His test is severe, but it is not designed to destroy them.", "He gives a path that preserves their families and brings Benjamin into the story.", "This phrase matters because Joseph is not acting as a murderer.", "He is using pressure with restraint."]),
    day17Phrase("🙏 For I Fear God", ["Joseph explains the moral boundary under his authority.", "He fears God, so he will not act like power makes him accountable to no one.", "This is one of the most important lines in the chapter.", "Joseph's reverence protects his brothers from revenge.", "Power under God becomes disciplined instead of cruel."]),
    day17Phrase("⛓️ Let One Of Your Brethren Be Bound", ["Joseph keeps one brother as security while the others return home.", "This keeps the test active after they leave Egypt.", "Simeon's detention will force the family to face whether they will return.", "A beginner should see that the story is not resolved in one visit.", "Joseph is drawing the truth out step by step."]),
    day17Phrase("🌾 Carry Corn For The Famine Of Your Houses", ["Joseph lets them take grain home to feed their families.", "Even while testing them, he provides for their hunger.", "This balance matters: Joseph is firm, but he is preserving life.", "He does not let justice cancel mercy.", "God's work in the scene includes both exposure and provision."]),
    day17Phrase("👶 Bring Your Youngest Brother", ["Benjamin remains the central test.", "The brothers must return with the one Jacob is most afraid to release.", "This will reveal whether the family can move differently than it did with Joseph.", "The old wound cannot be healed around the edges.", "It has to be faced at the point of fear."]),
  ],
  "Genesis 42:21-24": [
    day17Phrase("😖 Anguish Of His Soul", ["The brothers remember Joseph's anguish when he begged them.", "Genesis 37 did not tell us this detail, but Genesis 42 does.", "That makes the old sin feel even heavier.", "They did not sell a silent brother; they ignored a pleading one.", "True guilt remembers the personhood of the one who was harmed."]),
    day17Phrase("🙏 When He Besought Us", ["Besought means begged or pleaded.", "Joseph had begged them for mercy, and they refused.", "A beginner needs this word explained because it carries deep emotion.", "The brothers now realize they hardened themselves against a desperate cry.", "Repentance begins when pain we ignored becomes pain we can finally hear."]),
    day17Phrase("⚖️ Therefore Is This Distress Come Upon Us", ["The brothers connect their present distress with their past sin.", "This does not mean every hard thing is punishment for a specific sin.", "In this story, their conscience is correctly recognizing the old wrong.", "God is using pressure to bring truth out of hiding.", "Buried guilt becomes loud when God starts healing a family."]),
    day17Phrase("🩸 His Blood Is Required", ["Reuben says Joseph's blood is being required of them.", "He speaks as if Joseph may be dead, because that is what they allowed Jacob to believe.", "The phrase carries accountability language.", "They cannot treat Joseph's suffering as a closed secret anymore.", "Sin may be hidden from family, but it is not hidden from God."]),
    day17Phrase("🗣️ Interpreter Was Between Them", ["The brothers do not know Joseph understands their language.", "They speak freely because they think he needs an interpreter.", "This detail lets Joseph hear their confession without revealing himself.", "The hidden knowledge increases the emotional power of the scene.", "God lets Joseph hear that conscience is finally waking up."]),
    day17Phrase("⛓️ Bound Him Before Their Eyes", ["Joseph has Simeon bound in front of the brothers.", "The public binding makes the test impossible to forget.", "They must go home with food, money, fear, and one brother missing.", "The family will now have to decide whether Simeon matters enough to return.", "Joseph is testing whether the brothers will abandon another brother again."]),
  ],
  "Genesis 42:25-28": [
    day17Phrase("🌾 Fill Their Sacks With Corn", ["Joseph sends them away with grain, not empty hands.", "This is mercy in the middle of a test.", "Their families will eat because Joseph chooses provision.", "A beginner should notice that Joseph has power to crush them but feeds them instead.", "The story is moving toward restoration, not revenge."]),
    day17Phrase("💰 Every Man's Money Into His Sack", ["Joseph secretly returns their payment.", "The brothers will experience this as frightening because they do not understand the giver.", "Grace can feel suspicious when guilt is awake.", "The returned money keeps pressure on their conscience.", "Joseph's hidden mercy unsettles them into deeper reflection."]),
    day17Phrase("🐴 To Give Them Provision For The Way", ["Joseph also gives supplies for the journey.", "He cares for their immediate travel needs.", "This small detail shows his mercy is practical.", "Even while he tests them, he does not neglect their bodies.", "God's providence often includes ordinary provision along the road."]),
    day17Phrase("🏨 In The Inn", ["One brother opens his sack at a lodging place on the way home.", "The discovery happens before they even reach Jacob.", "Fear enters the journey, not only the destination.", "The returned money turns the road home into a place of trembling.", "God keeps pressing the story while they travel."]),
    day17Phrase("😨 They Were Afraid", ["The money makes the brothers afraid instead of relieved.", "A clean conscience might see a gift, but a guilty conscience suspects danger.", "This shows how unresolved sin changes the way people interpret mercy.", "The brothers are not only carrying grain; they are carrying fear.", "God is exposing the weight inside them."]),
  ],
  "Genesis 42:29-34": [
    day17Phrase("🏠 Unto Jacob Their Father", ["The brothers return to Jacob with a complicated report.", "They left to buy food, but they come back with fear, demands, and Simeon missing.", "The family wound is now entering the father's tent again.", "Jacob cannot avoid the Joseph-shaped grief forever.", "God is bringing hidden pain back into the family conversation."]),
    day17Phrase("🗣️ The Man, Who Is The Lord Of The Land", ["They describe Joseph as the lord of the land without knowing he is their brother.", "The title shows Joseph's power from their point of view.", "They are afraid of him, dependent on him, and unaware of his identity.", "The irony is thick because the ruler is the one they sold.", "God has reversed the story while keeping the truth hidden for now."]),
    day17Phrase("🕵️ Took Us For Spies", ["The brothers tell Jacob about the accusation.", "The charge explains why Benjamin is now required.", "This report brings Joseph's test into Jacob's house.", "The family must decide whether to trust the brothers with Benjamin.", "Pressure is moving from Egypt back into Canaan."]),
    day17Phrase("✅ We Are True Men", ["They repeat their claim of honesty to Jacob.", "The phrase still carries irony because the old lie about Joseph remains unconfessed.", "They are telling parts of the truth while still living inside a deeper concealment.", "A beginner should see that truthful words do not always mean a truthful life.", "God is pressing them toward deeper honesty."]),
    day17Phrase("🔓 Then Will I Deliver You Your Brother", ["Joseph's promise ties Simeon's release to Benjamin's arrival.", "The family cannot get Simeon back without facing Jacob's fear.", "This keeps the test focused and unresolved.", "The brothers must return differently than they left.", "Restoration will require costly movement."]),
    day17Phrase("🛒 Ye Shall Traffick In The Land", ["Traffick here means trade or do business.", "Joseph promises they can buy and move freely if they prove their words.", "The old word may confuse beginners, so the meaning needs to be plain.", "The issue is access to food during famine.", "Honesty will open the way for provision."]),
  ],
  "Genesis 42:35-38": [
    day17Phrase("😨 They And Their Father Were Afraid", ["The fear spreads from the brothers to Jacob.", "The returned money turns the whole household anxious.", "They do not understand Joseph's hidden mercy, so it feels like danger.", "A beginner should notice how guilt and grief shape interpretation.", "The family is not ready yet, but God is still moving them."]),
    day17Phrase("💔 Joseph Is Not, And Simeon Is Not", ["Jacob speaks as a father counting losses.", "Joseph is gone in his mind, Simeon is detained, and Benjamin is threatened.", "His words show how grief stacks sorrow together.", "The family has survived years with a false story about Joseph.", "That false story still controls Jacob's heart."]),
    day17Phrase("⚫ All These Things Are Against Me", ["Jacob believes everything is turning against him.", "From his limited view, that feeling makes sense.", "But the reader knows Joseph is alive and working to preserve them.", "This phrase is powerful because it shows the gap between human perception and God's providence.", "Sometimes what feels against us is part of a rescue we cannot yet see."]),
    day17Phrase("👦 Slay My Two Sons", ["Reuben makes a desperate offer to guarantee Benjamin's return.", "His words are dramatic but not wise.", "Offering Jacob more grief cannot heal Jacob's fear.", "This shows Reuben's desire to help, but also his inability to carry the moment well.", "Not every intense promise is a faithful solution."]),
    day17Phrase("🤲 Deliver Him Into My Hand", ["Reuben asks Jacob to trust him with Benjamin.", "This is a major request because Jacob is terrified of losing Rachel's other son.", "The family has to confront whether the brothers can be trusted now.", "The answer is not ready yet; Genesis will keep building toward Judah's later pledge.", "Trust takes more than words after betrayal."]),
    day17Phrase("👶 His Brother Is Dead", ["Jacob calls Joseph dead because that is the story he has believed for years.", "The reader knows the statement is false, which makes it painful.", "The brothers know more than Jacob does, but they still keep silent.", "This line shows how one lie can shape a parent's whole world.", "Hidden sin keeps grief trapped in darkness."]),
    day17Phrase("⚰️ My Gray Hairs With Sorrow To The Grave", ["Jacob imagines sorrow carrying him to death.", "The phrase shows how deeply he fears losing Benjamin.", "It is old-fashioned language, but the emotion is clear: one more loss may crush him.", "Genesis ends the chapter with the family stuck between hunger, fear, and unresolved truth.", "God's work is not finished, but the pressure is doing its work."]),
  ],
};

function deepenDay17PhraseCards(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  return {
    ...section,
    phrases: [...section.phrases, ...(DAY_17_REAL_PHRASE_ADDITIONS[section.reference] ?? [])],
  };
}

const DAY_18_GENESIS_43_44_FINAL_SECTIONS: PersonalGenesisPhraseSectionInput[] = [
  { chapter: 43, startVerse: 1, endVerse: 5, reference: "Genesis 43:1-5", title: "The Famine Presses The Family", icon: "🌾", phrases: [
    deepPhrase("🌾 The Famine Was Sore", "The hunger grows severe in Canaan.", "Jacob's refusal cannot change the need for food.", "Pressure forces the family back toward Egypt and unresolved truth.", "Need often exposes decisions fear tried to delay."),
    deepPhrase("⬇️ Go Again", "Jacob tells them to return for food, but the Benjamin condition remains.", "The family cannot go forward without facing what Joseph required.", "The road to bread now runs through trust and risk.", "Some provision is blocked until obedience is faced."),
  ] },
  { chapter: 43, startVerse: 6, endVerse: 7, reference: "Genesis 43:6-7", title: "Jacob Questions The Brothers", icon: "❓", phrases: [
    deepPhrase("❓ Is Your Father Yet Alive", "The brothers explain that the Egyptian ruler asked detailed family questions.", "Those questions were Joseph reaching toward the hidden family story.", "What felt like interrogation was actually personal knowledge under disguise.", "God may be asking questions that lead us toward confession."),
  ] },
  { chapter: 43, startVerse: 8, endVerse: 10, reference: "Genesis 43:8-10", title: "Judah Pledges Himself", icon: "🤲", phrases: [
    deepPhrase("🤲 Send The Lad With Me", "Judah is asking Jacob to release Benjamin into his care.", "The family cannot return to Egypt unless Benjamin goes with them.", "Judah is no longer acting like the brother who helped sell Joseph.", "His words show responsibility where there used to be selfishness."),
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

const day18Phrase = (title: string, lines: string[]): [string, string] => phrase(title, lines);

const DAY_18_REAL_PHRASE_ADDITIONS: Record<string, Array<[string, string]>> = {
  "Genesis 43:1-5": [
    day18Phrase("🍞 Eaten Up The Corn", ["The food from the first trip is gone.", "This makes the problem immediate again: the family cannot survive on yesterday's provision.", "Jacob's fear of sending Benjamin still exists, but hunger keeps pressing.", "A beginner should see how famine becomes the pressure God uses to move the story forward.", "The family cannot stay where fear left them."]),
    day18Phrase("🛒 Buy Us A Little Food", ["Jacob asks for food as if the trip can be simple.", "But the brothers know Egypt now requires Benjamin.", "This phrase shows Jacob wanting provision without facing the hard condition attached to it.", "The family needs bread, but the deeper issue is trust.", "Sometimes the next step is not blocked by lack of supply, but by a fear we have not surrendered."]),
    day18Phrase("⚠️ The Man Did Solemnly Protest", ["Judah reminds Jacob that the Egyptian ruler warned them seriously.", "Solemnly protest means he strongly testified or warned them.", "They cannot pretend the condition was optional.", "Benjamin must go, or they cannot see the ruler's face.", "The text is teaching that delayed obedience does not erase a clear requirement."]),
    day18Phrase("👶 Except Your Brother Be With You", ["Benjamin is the condition for returning to Egypt.", "This is painful because Benjamin is Jacob's protected son.", "The test touches the exact place of Jacob's grief and the brothers' old jealousy.", "Joseph is forcing the family to bring the hidden wound into the open.", "No real healing can happen while Benjamin remains outside the story."]),
    day18Phrase("🚫 We Will Not Go Down", ["Judah refuses to make a useless trip without Benjamin.", "This is direct, but it is also honest.", "The brothers cannot fix the famine by pretending the terms have changed.", "A beginner can see Judah becoming practical and responsible here.", "Faithful leadership sometimes tells the truth no one wants to hear."]),
  ],
  "Genesis 43:6-7": [
    day18Phrase("😣 Wherefore Dealt Ye So Ill With Me", ["Jacob feels the brothers have brought trouble on him by mentioning Benjamin.", "His grief makes him hear the report as betrayal.", "But the brothers were answering Joseph's questions without knowing who he was.", "This phrase shows how fear can turn even necessary truth into accusation.", "Jacob is still reading the moment through the wound of losing Joseph."]),
    day18Phrase("👨‍👦 Whether Ye Had Yet A Brother", ["Joseph had asked about their father and another brother.", "Those questions sounded like interrogation, but they came from Joseph's hidden love and longing.", "He wanted to know if Jacob and Benjamin were alive.", "A beginner should feel the dramatic irony: Joseph is asking family questions because he is family.", "God is working through questions the brothers do not yet understand."]),
    day18Phrase("🗣️ We Told Him According To The Tenor Of These Words", ["The brothers explain that they answered according to what the man asked.", "Tenor means the substance or direction of the questions.", "They did not volunteer Benjamin as a plan; they responded under pressure.", "This helps the reader understand why Jacob's blame is not the whole picture.", "Fear often looks for someone to blame before it accepts what must be done."]),
    day18Phrase("❓ Could We Certainly Know", ["The brothers say they could not have known Joseph would demand Benjamin.", "They are trapped by events they did not control.", "This phrase is honest: they had no way to see the hidden family connection in Egypt.", "Genesis lets us feel how providence can feel confusing from the inside.", "God may be guiding a story long before the people in it can explain what is happening."]),
  ],
  "Genesis 43:8-10": [
    day18Phrase("👴 Unto Israel His Father", ["Judah speaks to Israel, his father, with urgency and respect.", "The use of Israel reminds readers this is not only a private family crisis.", "This is the covenant family through whom God's promise is moving.", "Hunger, fear, and Benjamin's safety are now tied to the future of that family.", "Judah is stepping into responsibility inside the promise line."]),
    day18Phrase("👶 Send The Lad", ["Judah calls Benjamin the lad, even though Benjamin is not a tiny child by this point.", "The word reflects Jacob's protective view of him and the family's emotional attachment.", "Benjamin represents the son Jacob cannot bear to risk.", "Judah is asking Jacob to release the one he most wants to hold.", "Trust often becomes real at the point where release feels costly."]),
    day18Phrase("🍞 That We May Live, And Not Die", ["Judah makes the stakes plain.", "The famine threatens Jacob, the brothers, their children, and the whole household.", "This is not impatience; it is survival.", "A beginner should see that Judah is not being dramatic for effect.", "The family must risk the feared journey because staying home is also dangerous."]),
    day18Phrase("🤲 Of My Hand Shalt Thou Require Him", ["Judah makes himself personally accountable for Benjamin.", "He is not offering vague hope or blaming others.", "This is the language of responsibility.", "The brother who once helped remove Joseph now pledges to guard Benjamin.", "Real change takes ownership instead of hiding behind the group."]),
    day18Phrase("🧾 Then Let Me Bear The Blame For Ever", ["Judah accepts lasting blame if he fails.", "This is stronger than a quick promise.", "He puts his own name and future under the weight of Benjamin's safety.", "Genesis is showing Judah becoming a different kind of man.", "Repentance is more than regret; it becomes costly responsibility."]),
    day18Phrase("⏳ Except We Had Lingered", ["Judah points out that delay has cost them time.", "The family could have gone and returned already.", "Fear has stretched the crisis longer than necessary.", "This line is practical but painful because it exposes the cost of paralysis.", "Waiting is not always wisdom; sometimes it is fear wearing religious clothes."]),
  ],
  "Genesis 43:11-14": [
    day18Phrase("🧺 Carry Down The Man A Present", ["Jacob sends a gift to the Egyptian ruler.", "This echoes earlier Genesis scenes where gifts go ahead to soften a dangerous meeting.", "Jacob is using wisdom, not merely emotion.", "But the gift cannot replace obedience; Benjamin still must go.", "Faith can prepare carefully while still depending on God."]),
    day18Phrase("🌿 A Little Balm", ["Balm was a valuable resin used for healing and trade.", "Jacob sends what Canaan can offer even in famine.", "The detail reminds beginners that the family is not empty-handed, but food is still the urgent need.", "They have gifts, but they need grain.", "Human resources can help, but they cannot solve the deeper crisis alone."]),
    day18Phrase("🍯 A Little Honey", ["Honey is part of Jacob's present.", "The small word 'little' matters because famine has reduced what they can send.", "The gift is thoughtful but limited.", "Genesis lets us feel a household trying to survive scarcity with dignity.", "Even small offerings can carry wisdom and humility."]),
    day18Phrase("💰 Double Money", ["Jacob sends double money to repay what was returned and to buy more grain.", "This shows integrity and caution.", "They do not want to be accused of theft.", "A beginner should see that Jacob is trying to make the situation right as far as he understands it.", "When fear and confusion surround a problem, honesty still matters."]),
    day18Phrase("💰 The Money That Was Brought Again", ["Jacob tells them to return the first money found in their sacks.", "He does not treat unexplained money as a lucky gain.", "This matters because the family is trying to approach Egypt cleanly.", "The old Joseph sin involved silver; now money again tests their hearts.", "God keeps bringing the family back through the language of value and honesty."]),
    day18Phrase("😔 Peradventure It Was An Oversight", ["Jacob wonders whether the returned money was a mistake.", "Peradventure means perhaps.", "He does not know Joseph arranged it.", "This phrase shows how little the family understands about the hidden mercy behind their fear.", "Sometimes what we call a mistake is part of a larger mercy we cannot yet see."]),
    day18Phrase("👶 Take Also Your Brother", ["Jacob finally says Benjamin must go.", "This is the surrender the whole section has been moving toward.", "He does not release Benjamin easily, but he releases him.", "The family can now move toward Egypt, truth, and eventual restoration.", "Obedience may begin with trembling hands."]),
    day18Phrase("🙏 If I Be Bereaved Of My Children, I Am Bereaved", ["Jacob speaks like a man surrendering what he cannot control.", "The line is heavy, not cheerful.", "He is entrusting Benjamin, Simeon, and the outcome to God while still feeling the risk.", "A beginner should not miss the emotional honesty here.", "Faith sometimes sounds like grief placed into God's hands."]),
  ],
  "Genesis 43:15-18": [
    day18Phrase("👶 Took Benjamin", ["The brothers take Benjamin with them, which means the family has crossed the point of refusal.", "Jacob's protected son is now on the road to Egypt.", "This detail matters because the test cannot continue without him.", "The brothers are carrying not only gifts and money, but their father's heart.", "Benjamin's presence makes the journey morally serious."]),
    day18Phrase("💰 Double Money In Their Hand", ["They carry double money as Jacob instructed.", "The phrase shows their intention to be honest about both trips.", "Money has been a source of fear since Joseph returned it in their sacks.", "Now they bring it openly instead of hiding it.", "Truth begins to replace suspicion and secrecy."]),
    day18Phrase("🏛️ Stood Before Joseph", ["The brothers stand before Joseph again.", "They still do not know who he is.", "Every return to Joseph increases the pressure of hidden identity.", "A beginner should feel the suspense: the family is close to truth, but not there yet.", "God often brings people near the answer before they recognize it."]),
    day18Phrase("🍽️ Slay, And Make Ready", ["Joseph prepares a meal for his brothers.", "The language is ordinary household preparation, but emotionally it is huge.", "The brother they sold is preparing to feed them at his table.", "Genesis is turning the old meal beside the pit into a new meal under mercy.", "Tables can become places where God rewrites family history."]),
    day18Phrase("🕛 At Noon", ["Joseph plans for them to eat with him at noon.", "The time detail makes the scene feel arranged and intentional.", "The brothers think something threatening is being prepared.", "Joseph knows a family meal is coming.", "The same event can look like danger to guilty hearts and mercy to the one preparing it."]),
  ],
  "Genesis 43:19-22": [
    day18Phrase("🚪 At The Door Of The House", ["The brothers speak to the steward before fully entering Joseph's house.", "They are afraid and want to explain themselves immediately.", "The doorway becomes a place of anxious confession.", "A beginner can see how fear makes them try to solve the danger before it speaks.", "Guilt often wants to explain before it is accused."]),
    day18Phrase("🏨 When We Came To The Inn", ["They retell the moment they found the money during the journey home.", "The inn was where fear first struck them on the road.", "By naming it, they are bringing their anxiety into the open.", "The story that scared them privately is now spoken publicly.", "Honesty often begins by saying exactly what happened."]),
    day18Phrase("💰 Every Man's Money Was In The Mouth Of His Sack", ["The money was found right at the sack opening.", "That made it look obvious and suspicious.", "They feared being accused of theft because the evidence seemed impossible to explain.", "This phrase helps beginners understand why they are so nervous.", "Unexplained mercy can feel like danger when you do not know the giver."]),
    day18Phrase("⚖️ Our Money In Full Weight", ["They emphasize that all the money was returned, full and exact.", "They want the steward to know they did not cheat anyone.", "This shows their desire to clear their name.", "The brothers who once hid Joseph's sale are now eager to be transparent about money.", "God is pressing them toward honesty in visible ways."]),
    day18Phrase("🛒 Other Money Have We Brought Down", ["They also brought new money to buy more food.", "This proves they are not trying to take grain for free.", "The detail shows caution, integrity, and fear all mixed together.", "They are trying to do the right thing even while confused.", "Obedience can be sincere before understanding is complete."]),
  ],
  "Genesis 43:23-25": [
    day18Phrase("🙏 Your God, And The God Of Your Father", ["The steward speaks about their God and their father's God.", "This is surprising in an Egyptian house.", "The words gently point the frightened brothers beyond accusation.", "A beginner should notice that God is named in the place they feared.", "Peace can arrive from a voice you did not expect."]),
    day18Phrase("💎 Hath Given You Treasure In Your Sacks", ["The steward calls the returned money treasure from God.", "The brothers saw it as danger, but the steward names it as gift.", "This does not mean they understand everything yet.", "It means their fear is being challenged by a word of peace.", "Sometimes God's mercy has to be explained to hearts trained by guilt."]),
    day18Phrase("✅ I Had Your Money", ["The steward says the payment was received.", "This removes the accusation they feared most.", "They are not being charged as thieves for the returned money.", "The statement gives practical relief, not vague comfort.", "Peace often needs truth attached to it."]),
    day18Phrase("🚿 He Gave Them Water", ["The steward gives them water in Joseph's house.", "This is hospitality, not imprisonment.", "The brothers expected danger, but they receive care.", "Their feet are washed, their animals are fed, and Simeon is restored.", "Mercy keeps meeting them in forms they are slow to trust."]),
    day18Phrase("🐴 Gave Their Asses Provender", ["Provender means feed for the animals.", "Even the animals are cared for in Joseph's house.", "This little detail reinforces that the house is not acting like a trap.", "A beginner may not know the old word, so the meaning matters.", "God's provision can be gentle in very practical ways."]),
    day18Phrase("🎁 Made Ready The Present", ["The brothers prepare Jacob's gift for Joseph.", "They still approach him as a powerful stranger.", "The gift shows respect, fear, and hope for favor.", "They do not know the man receiving it is the brother their father grieves.", "Genesis layers irony and tenderness in the same room."]),
  ],
  "Genesis 43:26-30": [
    day18Phrase("🎁 Brought Him The Present", ["The brothers give Joseph the present from Jacob.", "This is the family approaching Joseph with gifts instead of violence.", "They are not yet reconciled, but the posture is completely reversed from Genesis 37.", "Joseph receives honor from the men who dishonored him.", "God can bring a story back in a different spirit."]),
    day18Phrase("🙇 Bowed Themselves To Him To The Earth", ["The brothers bow deeply again.", "Joseph's dreams continue being fulfilled in repeated waves.", "The scene is not rushed because the fulfillment is connected to testing, not just power.", "A beginner should see that prophecy fulfillment can unfold through ordinary actions.", "God's word stands even when people do not recognize the moment."]),
    day18Phrase("👴 Is Your Father Well", ["Joseph asks about Jacob's welfare.", "The question comes from longing, not small talk.", "He has been separated from his father for years and still cares deeply.", "The brothers hear a ruler's question, but the reader hears a son's heart.", "Hidden love is moving beneath Joseph's disguise."]),
    day18Phrase("🙇 They Bowed Down Their Heads", ["The brothers bow again after answering about their father.", "Genesis repeats the bowing so the dream theme cannot be missed.", "But Joseph is not using fulfillment to humiliate them.", "He is holding the moment until their hearts are revealed.", "God's fulfilled promise still requires Joseph to act with wisdom."]),
    day18Phrase("🕊️ God Be Gracious Unto Thee, My Son", ["Joseph blesses Benjamin with words of grace.", "He calls him my son, a tender expression from an older brother in authority.", "Benjamin receives kindness before knowing why.", "This line is emotionally loaded because Joseph is looking at his full brother.", "Grace sometimes reaches us before recognition does."]),
    day18Phrase("🔥 His Bowels Did Yearn", ["This old phrase means Joseph's deep inward compassion was stirred.", "It does not refer to something crude; it is emotional language for intense affection.", "Seeing Benjamin opens the deepest part of Joseph's heart.", "A beginner needs this explained because the KJV wording can sound strange.", "Joseph is not cold behind his test; he is aching with love."]),
  ],
  "Genesis 43:31-34": [
    day18Phrase("😮 They Marvelled One At Another", ["The brothers are amazed when seated in exact birth order.", "They do not know how the Egyptian ruler could know this.", "The detail creates holy unease around the table.", "Joseph's hidden knowledge is pressing them without revealing everything yet.", "God can arrange a moment so precisely that people begin to wonder."]),
    day18Phrase("🍽️ They Sat Before Him", ["The brothers eat in Joseph's presence.", "The table is full of tension, mercy, memory, and testing.", "They once sat down to eat after throwing Joseph into a pit.", "Now they sit before the brother they harmed, receiving food from him.", "Genesis is quietly reversing an old table of cruelty."]),
    day18Phrase("🥣 Messes Were Sent Unto Them", ["Food portions are sent from Joseph's table to the brothers.", "Joseph is feeding the men who once sold him.", "This is not cheap reconciliation, because the test is still active.", "But it is mercy in real, edible form.", "God's providence can turn the harmed one into a giver."]),
    day18Phrase("5️⃣ Five Times So Much", ["Benjamin receives five times as much as the others.", "Joseph is testing whether the brothers still resent special treatment of Rachel's son.", "The old Joseph wound involved favoritism, envy, and a beloved son.", "Now the same kind of pressure is placed in front of them at the table.", "Changed hearts can rejoice when another is honored."]),
    day18Phrase("😊 They Drank, And Were Merry", ["The brothers relax and share the meal.", "For a moment, fear gives way to table fellowship.", "But the deepest test has not happened yet.", "Genesis lets the reader breathe before the cup scene begins.", "Temporary peace is good, but unresolved truth still has to be faced."]),
  ],
  "Genesis 44:1-6": [
    day18Phrase("🌾 As Much As They Can Carry", ["Joseph commands the sacks to be filled generously.", "The brothers leave with abundant provision again.", "The generosity is real even though the test is also real.", "This matters because Joseph is not starving them or acting with petty revenge.", "His pressure is aimed at truth, while his provision preserves life."]),
    day18Phrase("💰 Every Man's Money In His Sack's Mouth", ["Joseph again returns their money.", "The repeated act keeps the mystery and fear alive.", "The brothers have already been frightened by this once.", "Now the mercy/test pattern happens again with the cup added.", "God sometimes repeats pressure because the heart has not fully surfaced yet."]),
    day18Phrase("🏆 My Cup, The Silver Cup", ["The cup is specific and valuable.", "Joseph uses it to create a crisis around Benjamin.", "The object itself becomes the tool that reveals whether the brothers will abandon him.", "A beginner should see that the cup is not random stage furniture.", "It is the pressure point of the whole test."]),
    day18Phrase("👶 In The Sack's Mouth Of The Youngest", ["The cup is placed in Benjamin's sack.", "This intentionally puts Jacob's protected son in danger.", "The brothers must now face the old Joseph-pattern again: will they save themselves and leave Rachel's son behind?", "The test is painfully precise.", "God's healing often presses the exact place where sin once ruled."]),
    day18Phrase("🌅 The Men Were Sent Away", ["The brothers leave in the morning with their animals.", "They likely think the frightening visit is over.", "But the story is not finished because the family truth is not finished.", "Genesis builds tension by letting relief come before pursuit.", "A calm morning can still carry a hidden test."]),
    day18Phrase("😠 Wherefore Have Ye Rewarded Evil For Good", ["The steward accuses them of repaying good with evil.", "The words sting because Joseph has treated them with hospitality.", "The accusation is part of the test, but it also forces the brothers to stand under moral pressure.", "They must now respond as men whose character is being examined.", "Tests often reveal the heart by placing it under accusation."]),
  ],
  "Genesis 44:7-10": [
    day18Phrase("🗣️ Wherefore Saith My Lord These Words", ["The brothers are shocked by the accusation.", "They cannot imagine why Joseph's steward would say this.", "Their response shows they believe themselves innocent of this charge.", "The scene is tense because readers know the cup is planted.", "Genesis is not testing whether they stole the cup; it is testing what they will do when Benjamin appears guilty."]),
    day18Phrase("💰 We Brought Again Unto Thee", ["They point to the returned money as proof of honesty.", "If they brought back money, why would they steal silver or gold?", "Their argument makes sense on the surface.", "This helps beginners understand why they feel confident.", "They are about to learn that confidence can collapse when hidden facts are revealed."]),
    day18Phrase("🏠 Out Of The Land Of Canaan", ["They remind the steward they carried the money all the way back from Canaan.", "That journey showed effort and integrity.", "The phrase makes their defense practical.", "They are saying their actions prove they were not thieves.", "The test is not about their explanation; it is about their loyalty under pressure."]),
    day18Phrase("🥈 Silver Or Gold", ["The brothers mention valuable metals to show the charge makes no sense.", "They did not keep the earlier money, so why steal more?", "This language also echoes the silver involved in Joseph's sale.", "Money keeps circling this family's story.", "God is bringing old themes back until the heart changes."]),
    day18Phrase("⛓️ We Also Will Be My Lord's Bondmen", ["They offer themselves as slaves if the cup is found.", "Their words are severe because they are certain no one has it.", "The statement sets up the crisis when Benjamin is exposed.", "A beginner should notice how quickly rash confidence can trap people.", "Humility is wiser than dramatic promises."]),
  ],
  "Genesis 44:11-13": [
    day18Phrase("⚡ Speedily Took Down Every Man His Sack", ["The brothers hurry to open their sacks.", "Their speed shows confidence and urgency.", "They want the search to clear them quickly.", "But the reader knows the search is moving toward Benjamin.", "Sometimes the moment we think will prove us safe becomes the moment that exposes the test."]),
    day18Phrase("🔎 He Searched", ["The steward searches each sack in order.", "The suspense builds as he moves from oldest to youngest.", "This is carefully staged to make the discovery land with maximum force.", "Genesis is letting the brothers feel the trap closing.", "The test is not accidental; it is designed."]),
    day18Phrase("👴 At The Eldest, And Left At The Youngest", ["The search moves by birth order, from oldest to youngest.", "This delays the discovery until Benjamin's sack.", "The order matters because it raises tension and reminds the reader of the family structure.", "The youngest is the one everyone fears losing.", "The story is pressing the family pattern again."]),
    day18Phrase("🐴 Laded Every Man His Ass", ["After tearing their clothes, they reload their animals and return.", "They do not run away or leave Benjamin to face it alone.", "That detail is a major sign of change.", "In Genesis 37 they went home without Joseph; here they go back with Benjamin.", "Repentance is becoming visible through shared return."]),
    day18Phrase("🏙️ Returned To The City", ["The brothers return to Joseph's city together.", "This is the opposite of abandoning the endangered brother.", "They go back toward danger instead of away from it.", "A beginner should see this as one of the clearest signs their hearts are changing.", "The old escape route is finally refused."]),
  ],
  "Genesis 44:14-17": [
    day18Phrase("🏠 Joseph Was Yet There", ["Joseph is still in the house when they return.", "The scene feels like judgment court and family drama at once.", "Joseph is watching what the brothers will do with Benjamin in danger.", "The hidden brother is also the hidden judge of their changed hearts.", "God has arranged the room for truth to surface."]),
    day18Phrase("🌍 We Are My Lord's Servants", ["Judah offers all of them as servants.", "He does not separate himself from Benjamin's danger.", "This is different from the old group sin where Joseph was cast away.", "Judah now speaks in shared responsibility.", "Changed people stop saving themselves at another person's expense."]),
    day18Phrase("🏆 Both We, And He Also With Whom The Cup Is Found", ["Judah includes Benjamin and the rest of the brothers in the offer.", "He is not willing to leave Benjamin isolated.", "That matters because Joseph's test gives them a way to abandon only Benjamin.", "Judah refuses that easy exit.", "Real repentance protects the vulnerable person in the exact place old sin would abandon him."]),
    day18Phrase("🛑 God Forbid That I Should Do So", ["Joseph rejects punishing all the brothers.", "He narrows the test back to Benjamin alone.", "This forces the moral choice sharply: go home free or stand with the accused brother.", "Joseph is not done pressing the heart.", "Sometimes mercy removes excuses so love can be seen clearly."]),
    day18Phrase("🏠 Get You Up In Peace Unto Your Father", ["Joseph offers them peace if they leave Benjamin behind.", "This is the exact old pattern: return to Jacob without Rachel's son.", "The brothers can escape the crisis by repeating the wound.", "Judah's coming speech proves they cannot do that anymore.", "Godly change is revealed when the old sin becomes impossible to repeat."]),
  ],
  "Genesis 44:18-23": [
    day18Phrase("🙏 Let Thy Servant, I Pray Thee", ["Judah begins with humble pleading.", "He knows Joseph has power over life, slavery, and release.", "His tone is respectful, but his courage is real.", "The man who once used power against Joseph now appeals for mercy under power.", "Grace has made Judah brave in a different direction."]),
    day18Phrase("🔥 Let Not Thine Anger Burn", ["Judah asks Joseph not to become angry at his speech.", "He is stepping into risk because Benjamin's life is at stake.", "This phrase shows the danger of speaking to an Egyptian ruler.", "Judah's love is now stronger than his fear.", "Intercession often means speaking carefully but courageously."]),
    day18Phrase("👑 Thou Art Even As Pharaoh", ["Judah acknowledges Joseph's authority as nearly Pharaoh's.", "This is not flattery only; it recognizes the seriousness of the moment.", "Joseph holds the power to enslave or release Benjamin.", "A beginner should feel the stakes of the speech.", "Judah is pleading before power with no weapon except truth."]),
    day18Phrase("❓ Have Ye A Father, Or A Brother", ["Judah retells Joseph's first family questions.", "He does not know those questions came from Joseph's own heart.", "The retelling lets Joseph hear the family story from the brothers' side.", "Truth is being narrated in the very room where it was hidden.", "God is letting the wound speak before it is healed."]),
    day18Phrase("👶 His Brother Is Dead", ["Judah repeats the family's belief that Joseph is dead.", "Joseph hears himself described as the dead brother while standing alive before them.", "The emotional force of this line is enormous.", "It shows how the old lie has shaped the family for years.", "Mercy is listening to the damage before revealing the truth."]),
    day18Phrase("❤️ His Father Loveth Him", ["Judah admits Jacob loves Benjamin specially.", "The old brothers once hated Joseph because of favored love.", "Now Judah names that love without attacking Benjamin for it.", "This is a quiet but powerful sign of change.", "Repentance can protect the person who reminds us of old jealousy."]),
  ],
  "Genesis 44:24-29": [
    day18Phrase("🗣️ We Told Him The Words Of My Lord", ["Judah recounts how they told Jacob everything Joseph demanded.", "He is building the case carefully and honestly.", "The family conversation is now brought into Joseph's hearing.", "A beginner should notice that Judah is no longer hiding from painful facts.", "Truth-telling becomes the road toward mercy."]),
    day18Phrase("🍞 Buy Us A Little Food", ["Judah remembers Jacob's simple request for food.", "That request became complicated by the demand for Benjamin.", "The famine need and family wound are tied together now.", "They cannot get bread without facing trust.", "God uses ordinary need to expose extraordinary heart issues."]),
    day18Phrase("🚫 We Cannot Go Down", ["The brothers told Jacob they could not return without Benjamin.", "This phrase shows Judah had already accepted the condition back home.", "He is not improvising responsibility at the last second.", "He has been carrying this burden since Canaan.", "Faithfulness starts before the crisis reaches its peak."]),
    day18Phrase("👀 If Our Youngest Brother Be With Us", ["Benjamin's presence is the condition for seeing Joseph's face.", "The phrase repeats the test again.", "The story keeps circling Benjamin because he is the living point of the old wound.", "Will the brothers protect the favored younger son this time?", "Genesis answers that question through Judah's plea."]),
    day18Phrase("🩸 Surely He Is Torn In Pieces", ["Judah repeats Jacob's explanation for Joseph's disappearance.", "Joseph hears the lie that covered his sale.", "The phrase is painful because the reader knows Joseph was not torn by an animal.", "The brothers' deception became Jacob's settled grief.", "Sin can create a story others suffer inside for years."]),
    day18Phrase("😭 Sorrow To The Grave", ["Judah says losing Benjamin would bury Jacob in sorrow.", "He now feels the cost of causing his father grief.", "This is the opposite of Genesis 37, where the brothers let Jacob mourn Joseph without telling the truth.", "Judah's empathy is one of the clearest signs of transformation.", "Changed hearts care about the grief they once ignored."]),
  ],
  "Genesis 44:30-34": [
    day18Phrase("🧵 His Life Is Bound Up", ["Judah says Jacob's life is tied to Benjamin's life.", "The image is of two lives wrapped together.", "Jacob's grief and love have made Benjamin feel inseparable from him.", "Judah does not dismiss that attachment; he honors it.", "Love sometimes requires carrying another person's fragile heart gently."]),
    day18Phrase("👀 When He Seeth That The Lad Is Not With Us", ["Judah imagines Jacob seeing the brothers return without Benjamin.", "This is exactly what happened with Joseph years earlier.", "The thought is unbearable to Judah now.", "A beginner should see the reversal: Judah can no longer participate in that kind of return.", "Repentance changes what a person can live with."]),
    day18Phrase("⚰️ Bring Down The Gray Hairs", ["Judah repeats the danger to Jacob's old age.", "The phrase is emotional, not decorative.", "He understands that Benjamin's loss would crush Jacob.", "The man who once helped break his father now wants to spare him.", "Godly change often shows up as new tenderness toward old wounds."]),
    day18Phrase("🤝 Thy Servant Became Surety", ["Judah reminds Joseph that he pledged himself for Benjamin.", "Surety means personal guarantee.", "He is bound by his promise before his father and before God.", "This makes his offer more than emotion; it is covenant-like responsibility.", "Faithful love keeps its word when the cost arrives."]),
    day18Phrase("⛓️ Let Thy Servant Abide Instead Of The Lad", ["Judah offers to become a slave in Benjamin's place.", "This is the great reversal of his life.", "He once helped sell Joseph into slavery; now he offers himself as a slave to save Benjamin.", "The phrase is one of the strongest pictures of substitution in Genesis.", "Real repentance moves from sacrificing others to offering oneself."]),
    day18Phrase("👶 Let The Lad Go Up With His Brethren", ["Judah asks that Benjamin be allowed to return home.", "He wants the endangered brother restored to the father.", "This is the opposite of the Joseph story, where the favored son did not come home.", "Judah is trying to write a different ending with his own body.", "Changed hearts protect the one they once might have envied."]),
    day18Phrase("😢 Lest Peradventure I See The Evil", ["Judah cannot bear to see the disaster that would fall on Jacob.", "Peradventure means perhaps, and evil here means calamity or harm.", "His imagination is now shaped by compassion.", "He sees the pain before it happens and offers himself to prevent it.", "This is the heart Joseph has been testing for."]),
  ],
};

function deepenDay18PhraseCards(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  return {
    ...section,
    phrases: [...section.phrases, ...(DAY_18_REAL_PHRASE_ADDITIONS[section.reference] ?? [])],
  };
}

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

const day19Phrase = (title: string, lines: string[]): [string, string] => phrase(title, lines);

const DAY_19_REAL_PHRASE_ADDITIONS: Record<string, Array<[string, string]>> = {
  "Genesis 45:1-3": [
    day19Phrase("😭 Before All Them That Stood By Him", ["Joseph's emotion rises in front of everyone near him.", "He has carried the test, the disguise, and the pain as long as he can.", "Judah's offer to take Benjamin's place shows the brothers have changed.", "The room is full of Egyptian servants, but the wound is family-deep.", "Joseph clears the room because mercy is about to speak truth with tenderness."]),
    day19Phrase("🔒 No Man Stood With Him", ["Joseph reveals himself privately, not as a public spectacle.", "This protects his brothers from being shamed before Egypt.", "He could expose them loudly, but he chooses a more merciful setting.", "A beginner should notice that forgiveness does not need an audience to prove itself.", "Grace can tell the truth while still covering dignity."]),
    day19Phrase("🗣️ He Wept Aloud", ["Joseph does not reveal himself calmly or coldly.", "His grief, love, and relief pour out loud enough for others to hear.", "The tears show that the years of suffering still mattered.", "Forgiveness is not emotional numbness.", "God's healing can come with sound, sobs, and a body that finally lets go."]),
    day19Phrase("👂 The Egyptians And The House Of Pharaoh Heard", ["Joseph's crying reaches beyond the private room.", "The family reunion cannot stay completely hidden because the emotion is so strong.", "Egypt hears the sound before Egypt understands the story.", "This shows how public Joseph's private pain has become.", "God is restoring a family in a way that will also touch Pharaoh's house."]),
    day19Phrase("😨 His Brethren Could Not Answer Him", ["The brothers are speechless because truth has broken into the room.", "The ruler they feared is the brother they sold.", "Their silence is not confusion only; it is guilt, shock, and terror.", "A beginner should feel how frightening mercy can be before it is trusted.", "When hidden sin meets the person harmed, words may disappear."]),
    day19Phrase("😰 They Were Troubled At His Presence", ["Troubled means frightened and disturbed.", "Joseph's presence now carries the weight of their old sin.", "They do not know whether this revelation means death, revenge, or mercy.", "The same face that will comfort them first terrifies them.", "Truth often shakes people before it heals them."]),
  ],
  "Genesis 45:4-8": [
    day19Phrase("🧑 I Am Joseph Your Brother", ["Joseph does not only say his name; he says brother.", "That word brings relationship back into the room.", "The brothers tried to erase him from the family, but Joseph claims the bond again.", "This is mercy with memory, not denial.", "Forgiveness can name both the wound and the relationship."]),
    day19Phrase("😔 Be Not Grieved, Nor Angry With Yourselves", ["Joseph sees their fear and guilt immediately.", "He does not pretend they did nothing wrong, but he also does not want despair to swallow them.", "This phrase is pastoral and tender.", "He is guiding them toward God's larger purpose instead of endless self-hatred.", "Repentance should lead to truth and mercy, not hopelessness."]),
    day19Phrase("🍞 For These Two Years Hath The Famine Been", ["Joseph places the reunion inside the famine timeline.", "Two years of hunger have already passed, and five more remain.", "This explains why the family must move quickly.", "The story is emotional, but it is also urgent and practical.", "God's mercy feeds people in real time, not only in feelings."]),
    day19Phrase("🌱 To Preserve You A Posterity", ["Posterity means future descendants.", "Joseph understands his position as God's way of keeping the covenant family alive.", "This is bigger than saving eleven brothers from one bad season.", "God is preserving the line through which His promises will continue.", "A beginner should see that Joseph's story protects the future of Israel."]),
    day19Phrase("🛟 A Great Deliverance", ["Deliverance means rescue.", "Joseph sees his life as part of a rescue larger than himself.", "The pit, slavery, prison, and palace all become part of God's preserving work.", "That does not make the evil good, but it shows God's mercy stronger than evil.", "God can weave rescue through roads people never should have taken."]),
    day19Phrase("☝️ It Was Not You That Sent Me Hither, But God", ["Joseph lifts the story into providence without erasing human responsibility.", "The brothers sold him, but God ruled over the outcome.", "This is one of Genesis' clearest windows into God's sovereignty.", "A beginner needs both truths: people did evil, and God worked good.", "Faith does not deny harm; it trusts God's higher hand over it."]),
    day19Phrase("👑 A Father To Pharaoh", ["Joseph says God made him like a father to Pharaoh.", "This means he has become a wise counselor and protector in Egypt's court.", "The former prisoner now guides the ruler who guides the nation.", "The phrase helps readers understand the level of Joseph's authority.", "God raised Joseph for responsibility, not simply status."]),
    day19Phrase("🏠 Lord Of All His House", ["Joseph's authority extends over Pharaoh's household.", "This echoes earlier scenes where Joseph managed Potiphar's house and the prison.", "The pattern of faithful stewardship has grown larger each time.", "God trained Joseph in smaller houses before placing him over Pharaoh's house.", "Hidden faithfulness can become public trust."]),
  ],
  "Genesis 45:9-11": [
    day19Phrase("📢 Thus Saith Thy Son Joseph", ["Joseph gives the brothers exact words for Jacob.", "He wants his father to hear that the message comes from his own son.", "After years of false news, Jacob must now receive true news.", "A beginner should feel the reversal from the bloody coat to this living message.", "Truth is finally being sent home."]),
    day19Phrase("👑 God Hath Made Me Lord Of All Egypt", ["Joseph wants Jacob to know God raised him in Egypt.", "This explains how Joseph can provide for the family.", "The news is not only that Joseph is alive, but that God has positioned him to save them.", "Jacob's grief is about to meet evidence of providence.", "God's hidden work can be bigger than the loss we thought was final."]),
    day19Phrase("⏱️ Come Down Unto Me, Tarry Not", ["Joseph urges Jacob to come quickly.", "Tarry means delay.", "The family cannot wait because famine still has five years left.", "This phrase turns reunion into immediate obedience.", "When God opens a door of rescue, lingering can become dangerous."]),
    day19Phrase("👨‍👩‍👧 Thy Children, And Thy Children's Children", ["Joseph's invitation includes the whole household.", "He is not only asking for Jacob, but for generations.", "The move to Egypt will carry the future family of Israel.", "A beginner should see that this is a covenant migration, not a small visit.", "God is preserving children who will become tribes."]),
    day19Phrase("🐑 Thy Flocks, And Thy Herds", ["Joseph includes their animals in the move.", "This matters because the family are shepherds with real livelihood needs.", "God's provision is practical enough to include work, animals, space, and food.", "The Bible does not treat survival as abstract.", "Mercy makes room for the ordinary parts of life."]),
    day19Phrase("🍞 There Will I Nourish Thee", ["Nourish means feed, sustain, and care for.", "Joseph promises to provide for Jacob in Goshen.", "The son Jacob thought dead will now keep him alive.", "This is one of the great reversals of Genesis.", "God can restore a relationship and make it a channel of provision."]),
    day19Phrase("🕳️ Lest Thou, And Thy Household, Come To Poverty", ["Joseph knows famine could ruin the whole household if they remain in Canaan.", "He names the danger plainly.", "Love does not only celebrate reunion; it plans protection.", "This phrase shows Joseph thinking like a provider and son.", "Real care sees the threat and moves people toward safety."]),
  ],
  "Genesis 45:12-15": [
    day19Phrase("👄 It Is My Mouth That Speaketh Unto You", ["Joseph gives personal proof that he is truly their brother.", "He is not speaking through disguise now.", "The brothers hear his own voice, likely in their own language.", "The phrase matters because recognition needs more than a name in a shocking moment.", "Mercy patiently helps frightened people believe what is true."]),
    day19Phrase("👶 The Eyes Of My Brother Benjamin", ["Joseph singles out Benjamin as a witness too.", "Benjamin is his full brother, the son of Rachel like Joseph.", "The reunion with Benjamin carries special tenderness after years of separation.", "A beginner should see why Benjamin matters so much emotionally.", "God has preserved the brother Joseph feared he had lost."]),
    day19Phrase("📢 Tell My Father Of All My Glory In Egypt", ["Joseph wants Jacob to hear what God has done in Egypt.", "Glory here means honor, authority, and position.", "This is not bragging; it is evidence that Joseph can rescue the family.", "Jacob needs to know the invitation is real and possible.", "Sometimes testimony gives grief something solid to stand on."]),
    day19Phrase("👴 Ye Shall Haste And Bring Down My Father", ["Joseph repeats the urgency to bring Jacob.", "His heart is now moving toward his father as quickly as possible.", "The years of separation have ended, and delay no longer belongs in the story.", "This phrase carries longing, care, and command together.", "Good news should not be allowed to sit still when someone is waiting in sorrow."]),
    day19Phrase("🤗 He Fell Upon His Brother Benjamin's Neck", ["Joseph embraces Benjamin with deep emotion.", "This is the brother who was innocent of the sale and tied to Joseph through Rachel.", "The neck embrace is intimate and full of relief.", "Genesis lets the reader feel the family pain becoming family touch again.", "Restoration is not only explained; it is held."]),
    day19Phrase("😭 Benjamin Wept Upon His Neck", ["Benjamin weeps back.", "The reunion is mutual, not one-sided.", "Benjamin has lived with Joseph's absence too, even if he did not cause it.", "The tears show that restoration touches more than the guilty brothers.", "When God heals a family, grief can come out of many hearts."]),
    day19Phrase("🗣️ After That His Brethren Talked With Him", ["The brothers can finally speak after Joseph kisses and weeps over them.", "Mercy reopens conversation where fear had frozen them.", "This line is simple but powerful: relationship is beginning to breathe again.", "The old silence of guilt is being broken.", "Forgiveness can make speech possible."]),
  ],
  "Genesis 45:16-20": [
    day19Phrase("🏛️ It Pleased Pharaoh Well", ["Pharaoh responds positively to the news about Joseph's brothers.", "This matters because the family needs Egypt's permission and support to move.", "God gives favor not only with Joseph but also with Pharaoh.", "A beginner should see how wide the provision becomes.", "God can make room for His people through unexpected authorities."]),
    day19Phrase("🐴 Lade Your Beasts", ["Pharaoh tells them to load their animals for the journey.", "This is practical help for moving food and goods.", "The invitation is not vague hospitality; it includes what they need to travel.", "The rescue has logistics.", "God's provision often shows up in instructions, wagons, animals, and roads."]),
    day19Phrase("🏠 Go, Get You Unto The Land Of Canaan", ["Pharaoh sends them back to gather the family from Canaan.", "The promised land is not being abandoned casually; the move is part of survival under God's plan.", "Canaan remains important, but Egypt becomes temporary shelter.", "This helps beginners hold the tension of the story.", "God can send His people away from the land while still keeping the promise alive."]),
    day19Phrase("👨‍👩‍👧 Take Your Father And Your Households", ["Pharaoh's invitation includes Jacob and the whole family structure.", "No one is meant to be left behind in the famine.", "The family that was fractured by Joseph's sale is now being gathered together.", "This is more than relocation; it is preservation.", "God's rescue reaches households."]),
    day19Phrase("🍽️ I Will Give You The Good Of The Land Of Egypt", ["Pharaoh promises the best of Egypt's land.", "The starving family is invited into abundance.", "This is remarkable favor for foreigners.", "Joseph's faithful service has opened a door for his family.", "God can turn one person's tested life into shelter for many."]),
    day19Phrase("🚫 Regard Not Your Stuff", ["Pharaoh tells them not to worry about all their possessions.", "The good of Egypt will supply what they need.", "This is hard for people leaving home, because possessions can feel like security.", "The phrase asks them to trust the provision ahead more than the things behind.", "Sometimes rescue requires traveling lighter than fear wants."]),
  ],
  "Genesis 45:21-24": [
    day19Phrase("✅ The Children Of Israel Did So", ["The brothers obey Joseph and Pharaoh's command.", "After so much delay and fear, the story now moves quickly.", "The phrase is simple but important because obedience carries the reunion toward Jacob.", "A beginner should notice movement replacing paralysis.", "When the rescue is clear, the family acts."]),
    day19Phrase("🍞 Provision For The Way", ["Joseph gives them supplies for the journey.", "He knows the road back to Canaan and back again will take strength.", "Forgiveness becomes food, clothing, wagons, and care.", "This is practical grace.", "God's mercy often travels with enough for the way."]),
    day19Phrase("👕 To All Of Them He Gave Each Man Changes Of Raiment", ["Joseph gives each brother clothing.", "This is powerful because clothing was used in the lie that broke Jacob's heart.", "Now clothing becomes a gift from the brother who was harmed.", "Genesis turns a symbol of deception into a symbol of mercy.", "God can redeem details without erasing what happened."]),
    day19Phrase("👶 To Benjamin He Gave Three Hundred Pieces Of Silver", ["Benjamin receives special gifts from Joseph.", "This could test envy again, but the brothers have already shown they will protect him.", "Silver also echoes Joseph's sale for silver years earlier.", "Now silver is gift, not betrayal.", "God can change the meaning of old wounds through transformed hearts."]),
    day19Phrase("🐴 Ten Asses Laden With The Good Things Of Egypt", ["Joseph sends ten donkeys loaded with Egypt's good things.", "These gifts are proof for Jacob and provision for the road.", "The abundance confirms that Joseph is truly alive and powerful.", "A beginner can see how material evidence helps Jacob believe later.", "Hope often needs something visible to hold."]),
    day19Phrase("🍞 Corn And Bread And Meat", ["Joseph sends food for his father for the journey.", "The famine is still real, so provision matters immediately.", "This is a son's care reaching an old father before they even meet.", "The text shows love in supplies, not only words.", "Reunion begins before the embrace because Joseph is already feeding Jacob."]),
    day19Phrase("🛣️ He Sent His Brethren Away", ["Joseph sends them back to Canaan with gifts and instructions.", "The brothers now carry truth instead of a lie.", "Years earlier they returned with a bloody coat; now they return with wagons and good news.", "The contrast is enormous.", "God is reversing the road home."]),
  ],
  "Genesis 45:25-28": [
    day19Phrase("⬆️ They Went Up Out Of Egypt", ["The brothers travel up from Egypt back to Canaan.", "This journey carries the news that will revive Jacob.", "They are retracing the road, but as changed men with a changed message.", "A beginner should see how the direction matters emotionally.", "They once came home hiding Joseph's fate; now they come home declaring his life."]),
    day19Phrase("👑 He Is Governor Over All The Land Of Egypt", ["The brothers tell Jacob Joseph is not only alive but ruling.", "This explains the wagons, gifts, and invitation.", "The news is almost too large for Jacob's grief-shaped heart.", "Joseph's elevation proves God was working while Jacob thought only loss was left.", "God's hidden story can be much bigger than what sorrow can imagine."]),
    day19Phrase("💔 Jacob's Heart Fainted", ["Jacob's heart goes numb because the news overwhelms him.", "Long grief has made hope hard to receive.", "This is a tender detail for readers who know how sorrow can protect itself from disappointment.", "Jacob does not instantly rejoice because the wound was deep.", "God is patient with hearts that need help believing good news."]),
    day19Phrase("🚚 When He Saw The Wagons", ["The wagons become visible evidence that the message is true.", "Joseph's provision helps Jacob's faith rise.", "Words alone were hard to believe after years of pain.", "The wagons carry proof, mercy, and invitation.", "Sometimes God strengthens hope through something we can see."]),
    day19Phrase("💓 The Spirit Of Jacob Their Father Revived", ["Jacob's inner life comes back when he believes Joseph is alive.", "The word revived shows grief giving way to life again.", "This is not small happiness; it is restoration after years of mourning.", "A beginner should feel the emotional resurrection in this line.", "God can breathe life into places sorrow nearly shut down."]),
    day19Phrase("🙌 It Is Enough", ["Jacob stops needing more proof once the truth lands.", "Joseph is alive, and that is enough to move him.", "The phrase is full of relief and surrender.", "Jacob's priorities become clear: he wants to see his son before death.", "When God restores what was lost, the heart can finally say enough."]),
    day19Phrase("👀 I Will Go And See Him Before I Die", ["Jacob's hope becomes action.", "He will not only hear about Joseph; he will go see him.", "This sets up the journey to Egypt in Genesis 46.", "The father's grief is now moving toward reunion.", "Hope that revives the spirit also moves the feet."]),
  ],
  "Genesis 46:1-4": [
    day19Phrase("📍 Came To Beersheba", ["Beersheba is an important place in the patriarch story.", "Jacob pauses there before leaving the land for Egypt.", "This is not a casual stop; it is a worshipful threshold.", "A beginner should see that Jacob is crossing a major covenant boundary.", "Before a big descent, he seeks God at a remembered place."]),
    day19Phrase("🙏 Unto The God Of His Father Isaac", ["Jacob worships the God of Isaac, tying this move to the family covenant.", "He is not chasing Joseph in a way that forgets God.", "The phrase anchors the journey in inherited faith.", "Jacob's father had also faced questions around famine and place.", "The same God who led Isaac now speaks to Jacob."]),
    day19Phrase("📣 Jacob, Jacob", ["God calls Jacob's name twice in the night vision.", "The repetition is personal and tender.", "It meets Jacob as a man carrying joy, fear, age, and uncertainty.", "God does not guide the family impersonally.", "The Lord calls His servant by name at the turning point."]),
    day19Phrase("🙋 Here Am I", ["Jacob answers God's call with availability.", "The phrase is simple but deeply faithful.", "He is ready to listen before the journey continues.", "A beginner should see the posture: worship, call, response, promise.", "Major moves need listening hearts."]),
    day19Phrase("☝️ I Am God, The God Of Thy Father", ["God identifies Himself as the God of Jacob's father.", "This reminds Jacob that the promise did not begin with his feelings or circumstances.", "The covenant God is still speaking.", "Egypt may be new territory, but God is not new.", "Identity in God steadies the heart before uncertain obedience."]),
    day19Phrase("🌱 I Will There Make Of Thee A Great Nation", ["God says Egypt will become the place where the family grows into a great nation.", "This is surprising because Canaan is the promised land.", "But the promise can grow in a foreign place under God's care.", "A beginner should see that Egypt is refuge now, though it will become bondage later.", "God can use a temporary place for long-term promise."]),
    day19Phrase("⬆️ I Will Also Surely Bring Thee Up Again", ["God promises future return from Egypt.", "Jacob may die there, but the family story will not end there.", "This line points forward to Exodus before Exodus begins.", "God's promise holds both descent and return.", "When God sends His people down, He already knows how He will bring them up."]),
    day19Phrase("✋ Joseph Shall Put His Hand Upon Thine Eyes", ["God promises Jacob that Joseph will be with him at death.", "This means Jacob will truly see Joseph again and receive a son's final tenderness.", "The phrase answers the ache of Genesis 45: Jacob wants to see Joseph before he dies.", "God gives personal comfort inside a national promise.", "The Lord cares about both covenant history and a father's heart."]),
  ],
  "Genesis 46:5-7": [
    day19Phrase("🚚 Wagons Which Pharaoh Had Sent", ["The wagons are the practical means of the move.", "They also prove Joseph's message was real.", "Jacob's old body, the women, and little ones can travel because provision has arrived.", "A beginner should notice how God uses Egyptian resources to move Israel.", "Providence can come with wheels."]),
    day19Phrase("👶 Their Little Ones", ["The migration includes children, not only adult sons.", "The future of Israel is inside this traveling household.", "These little ones will grow in Egypt and become part of a much larger story.", "God's promise moves through vulnerable people who need carrying.", "Never overlook the children in a covenant journey."]),
    day19Phrase("👩 Their Wives", ["The wives are named as part of the household movement.", "Genesis often focuses on the sons, but families are larger than the male names in a list.", "The women are part of the life that will grow in Egypt.", "A beginner should remember that migration affects whole households.", "God preserves families, not only headline figures."]),
    day19Phrase("🐄 Their Cattle, And Their Goods", ["They bring animals and possessions acquired in Canaan.", "This move is not a quick visit with one bag.", "The whole life of Jacob's household is being relocated.", "That makes the journey weightier and more permanent-feeling.", "Obedience sometimes means moving the whole life, not just the heart."]),
    day19Phrase("🌍 Into Egypt", ["The phrase into Egypt is huge for the Bible story.", "This descent will lead eventually to Israel's growth, slavery, and Exodus.", "For now, Egypt is provision and reunion.", "A beginner should hold the tension: the same place can be shelter in one season and bondage in another.", "God's promise remains stronger than the place."]),
    day19Phrase("👨‍👩‍👧 His Sons, And His Sons' Sons", ["The text emphasizes multiple generations going down together.", "Jacob is not traveling alone to see Joseph; the promise family is moving.", "This sets up how a household becomes a people.", "The genealogy that follows will name the lives inside this phrase.", "God builds big promises through generations."]),
  ],
  "Genesis 46:8-11": [
    day19Phrase("🇪🇬 Which Came Into Egypt", ["The list names those who came into Egypt.", "This phrase marks the migration as a major biblical event.", "It matters because later Israel will remember how their people came to be in Egypt.", "A beginner should see that names here are history, not filler.", "God is tracking the family He promised to multiply."]),
    day19Phrase("👑 Jacob And His Sons", ["Jacob and his sons are listed as the core household.", "This is the same family marked by favoritism, betrayal, grief, and restoration.", "God brings a complicated family into Egypt, not a perfect one.", "The promise survives through real people with real scars.", "Grace does not require a spotless family tree."]),
    day19Phrase("🥇 Reuben, Jacob's Firstborn", ["Reuben is named first because he is Jacob's firstborn.", "His story includes failure, but he is still counted in the family record.", "This helps beginners understand that genealogy preserves order and memory.", "Being named does not erase sin, but it shows belonging in the story.", "God's records can include people whose lives were messy."]),
    day19Phrase("👦 Hanoch, And Phallu, And Hezron, And Carmi", ["Reuben's sons are named individually.", "These names may feel hard to read, but they show real descendants entering Egypt.", "The family is becoming more than the twelve sons alone.", "Each name represents a life carried into the next chapter of Israel's story.", "God's promise counts people one by one."]),
    day19Phrase("⚔️ Simeon", ["Simeon is listed with his sons after Reuben.", "Simeon's story includes violence in Genesis 34 and detention in Genesis 42.", "Yet his line is still part of the migration.", "Genesis is honest about flawed people inside the covenant family.", "God's faithfulness is larger than the best chapter of any one person."]),
    day19Phrase("⛪ Levi", ["Levi's line is named before it becomes the priestly tribe later in the Bible.", "At this point, Levi also carries the memory of violence at Shechem.", "The future priestly line comes from a complicated past.", "A beginner should see that God can redeem family lines over time.", "The Bible's later story grows from seeds planted here."]),
  ],
  "Genesis 46:12-15": [
    day19Phrase("🦁 The Sons Of Judah", ["Judah's line receives attention because Judah has become central in the Joseph story.", "He offered himself for Benjamin and now his descendants are named.", "This line will become even more important later in the Bible.", "A beginner should notice how Judah's story is moving from failure toward leadership.", "God can make a transformed person carry future promise."]),
    day19Phrase("⚰️ Er And Onan Died In The Land Of Canaan", ["The genealogy remembers Judah's dead sons from Genesis 38.", "The Bible does not hide the painful parts of the family record.", "Their deaths explain why they are named but do not go into Egypt.", "This helps readers connect the list back to the story.", "God's record is honest, not airbrushed."]),
    day19Phrase("🌱 The Sons Of Pharez Were Hezron And Hamul", ["Perez's sons are included, showing Judah's line continuing.", "This matters because Perez came from a messy and exposed chapter with Tamar.", "God's promise still moves through that line.", "A beginner should see grace working through broken family history.", "God can bring future out of a story people would rather skip."]),
    day19Phrase("📜 These Be The Sons Of Leah", ["Leah's descendants are counted together.", "Leah was the unloved wife, but her line becomes large and significant.", "The phrase shows how God saw and multiplied her household.", "Names that may seem like a list are also testimony.", "God remembers the overlooked."]),
    day19Phrase("🏠 Which She Bare Unto Jacob In Padanaram", ["The text remembers where Leah bore these sons.", "Padanaram points back to Jacob's years with Laban.", "The migration to Egypt carries the history of earlier journeys with it.", "Genesis is tying places, births, and promises together.", "God has been shepherding this family through many lands."]),
    day19Phrase("3️⃣3️⃣ Thirty And Three", ["The total for Leah's line is given as thirty-three.", "Numbers help the reader see the family taking shape.", "This is not a random statistic; it marks growth from one household into many descendants.", "A beginner should see the promise of multiplication beginning to show in counts.", "God grows the promise in trackable, nameable ways."]),
  ],
  "Genesis 46:16-18": [
    day19Phrase("👥 The Sons Of Gad", ["Gad's descendants are named within Zilpah's line.", "These names are part of the family entering Egypt.", "The list shows that the servant-mother's children are not pushed out of the story.", "A beginner may not know Gad is one of Jacob's sons through Zilpah.", "God's covenant family includes lines the household itself may have ranked differently."]),
    day19Phrase("👥 The Sons Of Asher", ["Asher's line is also named in detail.", "The list includes sons and a daughter, Serah.", "This is one of the places where a woman is named inside a genealogy.", "The detail invites readers to slow down rather than skip the names.", "God sees individuals inside big family movements."]),
    day19Phrase("👩 Serah Their Sister", ["Serah is named among Asher's descendants.", "Her mention stands out because genealogies often focus on male lines.", "The text preserves her name as part of the Egypt migration.", "A beginner should see that every named person matters.", "God's memory is more personal than our quick reading."]),
    day19Phrase("🤲 Whom Laban Gave To Leah His Daughter", ["Zilpah's story is tied back to Laban giving her to Leah.", "This reminds readers of the complicated household arrangements behind Jacob's children.", "The family was built through love, rivalry, service, and pain.", "Yet God still preserves the whole household.", "Grace works in stories that are far from tidy."]),
    day19Phrase("1️⃣6️⃣ Sixteen Souls", ["Zilpah's line is counted as sixteen souls.", "The word souls keeps the list personal, not merely numerical.", "These are lives moving into Egypt under God's providence.", "A beginner should read the number as family growth.", "God counts people, not just totals."]),
  ],
  "Genesis 46:19-22": [
    day19Phrase("💔 The Sons Of Rachel Jacob's Wife", ["Rachel is called Jacob's wife with emotional weight.", "Jacob loved Rachel deeply, and her sons Joseph and Benjamin carried that love in the family.", "This line has been central to grief, favoritism, jealousy, and restoration.", "A beginner should see why Rachel's descendants feel especially tender in Genesis.", "God preserves the line tied to Jacob's deepest sorrow."]),
    day19Phrase("👑 Joseph And Benjamin", ["Joseph and Benjamin are named together as Rachel's sons.", "The brothers' test centered on whether Benjamin would be protected after Joseph was lost.", "Now both sons are part of the living family story.", "Joseph is alive, and Benjamin has been returned.", "God has answered the wound that shaped Jacob's house."]),
    day19Phrase("🇪🇬 Unto Joseph In The Land Of Egypt Were Born", ["Joseph's sons were born in Egypt, not Canaan.", "This matters because the covenant family is already bearing fruit in a foreign land.", "Egypt is not outside God's reach.", "A beginner should notice that God's promise can grow outside the expected place.", "Fruitfulness in affliction becomes part of Israel's future."]),
    day19Phrase("👩 Asenath The Daughter Of Poti-pherah", ["Asenath is Joseph's Egyptian wife.", "Her identity connects Joseph's family to Egypt's social world.", "Manasseh and Ephraim come from this union and will later be blessed by Jacob.", "The detail helps readers understand how Joseph's Egyptian life joins the Israel story.", "God can weave foreign setting and covenant promise together."]),
    day19Phrase("🙏 Priest Of On", ["Poti-pherah is called priest of On, an Egyptian religious center.", "This shows Joseph's household exists inside a very different culture.", "Yet Joseph's naming of his sons already showed his faith in God.", "A beginner should see the tension: Joseph is integrated into Egypt but still remembers the Lord.", "Faithfulness can live in a foreign environment."]),
    day19Phrase("1️⃣4️⃣ Fourteen Souls", ["Rachel's line is counted as fourteen souls.", "The number includes Joseph's Egyptian-born sons.", "This shows the family expanding through reunion and foreign-born children.", "The promise is not fragile because the setting changed.", "God keeps counting the family He is preserving."]),
  ],
  "Genesis 46:23-27": [
    day19Phrase("👶 The Sons Of Dan; Hushim", ["Dan's line is short in this list, but it is still named.", "One name may look small beside longer family branches.", "Genesis still counts it as part of the household entering Egypt.", "A beginner should not measure importance only by length of list.", "God's promise includes small-looking lines too."]),
    day19Phrase("👥 The Sons Of Naphtali", ["Naphtali's sons are named as part of Bilhah's line.", "The servant-mother branches are included in the full count.", "The family going to Egypt is broad and layered.", "This matters because all these lines will become tribes in Israel's future.", "God is preserving more than the reader may realize in the moment."]),
    day19Phrase("🤲 Whom Laban Gave Unto Rachel His Daughter", ["Bilhah's story is also tied back to Laban and Rachel.", "This reminds readers again how complicated Jacob's household became.", "The sons born through Bilhah are still counted as Jacob's descendants.", "God's covenant work moves through family systems marked by human brokenness.", "The promise survives the mess."]),
    day19Phrase("7️⃣ Seven Souls", ["Bilhah's line is counted as seven souls.", "The total is smaller, but still fully included.", "The word souls keeps dignity in the count.", "God sees each life in the migration, from the largest branch to the smallest.", "The family promise is personal all the way down."]),
    day19Phrase("🚶 Came With Jacob Into Egypt", ["The list gathers everyone who came with Jacob.", "This phrase marks the family crossing into a new chapter of biblical history.", "Egypt will become the place of growth, pressure, bondage, and eventual deliverance.", "A beginner should feel that this move matters beyond Genesis.", "Exodus begins to become possible here."]),
    day19Phrase("👑 Joseph's Sons, Which Were Born Him In Egypt", ["Joseph's two sons are counted with the family even though they were already in Egypt.", "This keeps Manasseh and Ephraim inside Jacob's household total.", "They are not treated as outsiders because of their birthplace.", "God's family story can include children born far from the original home.", "Covenant identity is deeper than geography."]),
    day19Phrase("🔢 Threescore And Six", ["Threescore and six means sixty-six.", "This number counts those who came from Jacob's body into Egypt, not including every person in every category.", "Old number phrases can confuse beginners, so slowing down helps.", "The list is careful because the family movement matters.", "God's promise is becoming countable."]),
  ],
  "Genesis 46:28-30": [
    day19Phrase("🦁 Sent Judah Before Him Unto Joseph", ["Jacob sends Judah ahead as the family approaches Goshen.", "Judah has become the trusted representative after his transformation in Genesis 44.", "This is a quiet sign that his role in the family has changed.", "The one who once helped sell Joseph now helps lead the family toward Joseph.", "God can turn failure into humbled usefulness."]),
    day19Phrase("🧭 To Direct His Face Unto Goshen", ["Judah goes ahead to get direction to Goshen.", "The phrase means he helps guide the family to the place Joseph has prepared.", "This is practical leadership after a long emotional journey.", "A beginner should see that restoration still needs guidance and logistics.", "God's promise travels through maps, roads, and faithful messengers."]),
    day19Phrase("🏞️ They Came Into The Land Of Goshen", ["The family arrives in the place Joseph promised.", "Goshen becomes the sheltering region where Israel will live in Egypt.", "The arrival shows Joseph's word was trustworthy.", "The starving family now has a place.", "God's provision becomes geography under their feet."]),
    day19Phrase("🐴 Made Ready His Chariot", ["Joseph prepares his chariot to meet Jacob.", "The governor of Egypt does not wait coldly for his father to arrive.", "He moves toward Jacob with urgency and honor.", "Power has not made Joseph too important to be a son.", "Restoration makes love move."]),
    day19Phrase("👴 Presented Himself Unto Him", ["Joseph presents himself to Jacob after years of absence.", "This is the moment Jacob said he wanted before he died.", "The son believed dead now stands alive before his father.", "A beginner should feel the long grief meeting visible proof.", "God's restoration becomes a face."]),
    day19Phrase("😭 Wept On His Neck A Good While", ["Joseph does not rush the embrace.", "He weeps on Jacob's neck for a long time.", "Years of stolen family life pour out in that phrase.", "Genesis gives the reunion time because real grief deserves space.", "Healing can be holy even when it is messy and tearful."]),
    day19Phrase("👀 Because I Have Seen Thy Face", ["Jacob says he can die now because he has seen Joseph's face.", "Sight matters after years of believing Joseph was dead.", "The face confirms what words and wagons began to prove.", "This line is full of peace after long sorrow.", "God can let the eyes see what the heart thought impossible."]),
  ],
  "Genesis 46:31-34": [
    day19Phrase("🏛️ I Will Go Up, And Shew Pharaoh", ["Joseph plans to present his family to Pharaoh.", "He does not hide them or leave their future uncertain.", "His authority gives them access, but he still handles the introduction wisely.", "A beginner should see Joseph caring for both palace protocol and family safety.", "Wisdom knows how to bring loved ones into new spaces carefully."]),
    day19Phrase("👨‍👩‍👧 My Brethren, And My Father's House", ["Joseph identifies the family as his brothers and father's household.", "He is no longer hiding the relationship.", "The family that once disowned him is now publicly claimed by him.", "This phrase carries restored belonging.", "Grace can say 'my family' again after betrayal."]),
    day19Phrase("🐑 Thy Servants Are Shepherds", ["Joseph prepares them to tell Pharaoh they are shepherds.", "Their work with flocks is part of their identity.", "The detail matters because it will help place them in Goshen.", "God uses their ordinary occupation to preserve them as a distinct people.", "Do not overlook simple work in God's larger plan."]),
    day19Phrase("🐄 Their Flocks, And Their Herds, And All That They Have", ["Joseph tells Pharaoh the family has brought their animals and possessions.", "This shows the move is full household relocation.", "They need land suitable for livestock, not just a temporary meal.", "The details help explain why Goshen is the right place.", "Provision fits the actual life people have."]),
    day19Phrase("❓ What Is Your Occupation", ["Joseph anticipates Pharaoh's question.", "Occupation means work or trade.", "He coaches his brothers so they answer clearly and honestly.", "A beginner may not realize this is preparation for settlement.", "Wisdom prepares truthful answers before important conversations."]),
    day19Phrase("🏞️ In The Land Of Goshen", ["The goal is for the family to dwell in Goshen.", "Goshen offers space for their flocks and separation from Egypt's center.", "This placement will preserve Israel's identity while they live in Egypt.", "God's provision is not just any place; it is a fitting place.", "Where God settles His people can protect their future."]),
    day19Phrase("🐑 Every Shepherd Is An Abomination Unto The Egyptians", ["This explains why shepherds would live apart from many Egyptians.", "Abomination here means something Egyptians strongly despised or considered offensive.", "The detail helps beginners understand why Goshen makes social sense.", "God can use even cultural distance to keep Israel distinct.", "What looks like rejection can become protection in God's providence."]),
  ],
};

function deepenDay19PhraseCards(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  return {
    ...section,
    phrases: [...section.phrases, ...(DAY_19_REAL_PHRASE_ADDITIONS[section.reference] ?? [])],
  };
}

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

const day20Phrase = (title: string, lines: string[]): [string, string] => phrase(title, lines);

const DAY_20_REAL_PHRASE_ADDITIONS: Record<string, Array<[string, string]>> = {
  "Genesis 47:1-6": [
    day20Phrase("👥 Five Men Of His Brethren", ["Joseph chooses five brothers to present before Pharaoh.", "This makes the family introduction official but not overwhelming.", "The brothers stand as representatives of Jacob's household.", "A beginner should see that Joseph is carefully managing how the family enters Egypt.", "God's provision includes wise introductions, not just open doors."]),
    day20Phrase("🏞️ In The Land Of Canaan", ["The brothers explain they came from Canaan because famine pressed them out.", "Canaan is still the promise land, but it cannot feed them in this season.", "This helps the reader understand why Israel is in Egypt at all.", "They are not wandering randomly; they are being preserved through famine.", "God can care for His promise people outside the promise land."]),
    day20Phrase("🌾 There Is No Pasture", ["The famine affects grass and animal life, not only human food.", "Pasture means grazing land for flocks.", "For shepherds, no pasture means the whole livelihood is under threat.", "A beginner may miss that famine creates pressure for animals, work, and family survival.", "God's rescue must make room for the way this family actually lives."]),
    day20Phrase("🐑 Thy Servants' Flocks", ["The brothers name their flocks because shepherding is their life and trade.", "They are not ashamed to tell Pharaoh what they do.", "Their ordinary work is the reason Goshen fits them.", "God uses their vocation to place them where they can survive and remain distinct.", "Simple work can become part of divine preservation."]),
    day20Phrase("🙏 Let Thy Servants Dwell In The Land Of Goshen", ["The brothers ask Pharaoh for permission to dwell in Goshen.", "They come humbly, as foreigners needing refuge.", "Goshen is not only convenient; it is a protected space for shepherd families.", "This request becomes part of how Israel is preserved in Egypt.", "Sometimes God's provision comes through a place suited to your actual need."]),
    day20Phrase("👑 The Land Of Egypt Is Before Thee", ["Pharaoh gives Joseph freedom to settle his family well.", "This shows favor toward Joseph and toward Jacob's household.", "The starving family receives access in a powerful empire.", "A beginner should see how Joseph's faithfulness opens a door for many others.", "God can use one person's tested life to shelter a whole family."]),
    day20Phrase("💪 Men Of Activity", ["Men of activity means capable, skilled, hardworking men.", "Pharaoh is willing to employ the best shepherds among Joseph's brothers over his own cattle.", "This gives the family dignity and responsibility, not only charity.", "God's provision can include meaningful work.", "Refuge does not erase vocation; it can give it room."]),
  ],
  "Genesis 47:7-12": [
    day20Phrase("👴 Joseph Brought In Jacob His Father", ["Joseph brings Jacob into Pharaoh's presence.", "The son who was once lost now presents his father before Egypt's king.", "This moment is full of reversal and honor.", "Jacob enters not as a beggar only, but as the covenant patriarch Joseph claims openly.", "God has restored father and son in a way that reaches the throne room."]),
    day20Phrase("❓ How Old Art Thou", ["Pharaoh asks Jacob his age.", "This lets Jacob reflect on his life as a pilgrimage.", "The question slows the scene and gives the old patriarch a voice.", "A beginner should notice that Pharaoh does not dominate the moment; Jacob speaks with spiritual weight.", "Age becomes a doorway to testimony."]),
    day20Phrase("🚶 The Days Of The Years Of My Pilgrimage", ["Jacob describes his life as a pilgrimage, meaning a journey as a sojourner.", "He has lived moving from place to place, never fully settled.", "This connects with Abraham and Isaac, who also lived as strangers under God's promise.", "Jacob is telling Pharaoh that his life is measured by more than years.", "Faith often lives as a journey toward what God promised."]),
    day20Phrase("⏳ An Hundred And Thirty Years", ["Jacob is 130 years old when he stands before Pharaoh.", "He has lived through deception, exile, family conflict, grief, famine, and reunion.", "The number helps the reader feel the weight of his long road.", "This is not a young man speaking in theory.", "Jacob's words come from a life marked by hard mercy."]),
    day20Phrase("📉 Not Attained Unto The Days Of The Years Of The Life Of My Fathers", ["Jacob says his life has not reached the length of Abraham and Isaac's lives.", "He is comparing himself to the generations before him.", "The phrase keeps the family story connected across time.", "Even in Egypt, Jacob thinks as part of a covenant line.", "One generation speaks in the shadow and promise of those before it."]),
    day20Phrase("🏞️ In The Land Of Rameses", ["Joseph settles the family in the best part of the land, called Rameses here.", "This location is connected with Goshen and later becomes important in Exodus.", "For now, it is provision and shelter during famine.", "A beginner should see that Genesis is quietly preparing the world Exodus will inherit.", "God plants the family in Egypt before Egypt becomes the place of bondage."]),
    day20Phrase("🥖 According To Their Families", ["Joseph nourishes the whole household according to family need.", "The provision is organized and personal.", "He does not merely give a symbolic gift; he sustains them through famine.", "The brother they sold is now the provider of every branch of the family.", "God can turn old betrayal into daily bread without calling the betrayal good."]),
  ],
  "Genesis 47:13-17": [
    day20Phrase("😣 The Famine Was Very Sore", ["The famine is severe and continuing.", "This phrase reminds the reader that Joseph's family is safe, but the wider land is still suffering.", "Genesis does not romanticize the crisis.", "Food shortage is pressing Egypt and Canaan to exhaustion.", "God's warning through Pharaoh's dreams was not exaggerated."]),
    day20Phrase("🌍 All The Land Of Egypt And Canaan Fainted", ["Fainted here means the lands were exhausted and weakened by famine.", "The crisis reaches both Egypt and Canaan.", "This explains why Joseph's role is so important across borders.", "A beginner should see the scale: this is not one hungry household, but whole regions under pressure.", "God positioned Joseph where many lives would come for bread."]),
    day20Phrase("🌾 For The Corn Which They Bought", ["People buy grain from Joseph's stored supply.", "The grain gathered during the seven good years now becomes survival.", "This phrase connects Genesis 47 back to Joseph's wise plan in Genesis 41.", "Preparation has become preservation.", "Wisdom in one season can feed people in another."]),
    day20Phrase("🏛️ Joseph Brought The Money Into Pharaoh's House", ["Joseph administers the famine economy for Pharaoh.", "He handles large amounts of money under royal authority.", "The detail shows Joseph acting faithfully in a complex public role.", "A beginner should notice that Joseph's leadership is spiritual and administrative.", "Serving God can include honest management of systems and resources."]),
    day20Phrase("💸 Give Us Bread: For Why Should We Die", ["The people cry for bread when money is gone.", "Their words are desperate and direct.", "They are not discussing theory; they are facing death by hunger.", "This phrase helps readers feel the human cost of famine economics.", "Behind every policy detail are people trying to live."]),
    day20Phrase("🐎 Horses, And For The Flocks, And For The Cattle", ["The people trade livestock for food.", "Their resources disappear layer by layer.", "Animals represented transportation, work, wealth, and future stability.", "The famine is not only emptying stomachs; it is dismantling security.", "Hard seasons reveal how fragile earthly safety can be."]),
    day20Phrase("📆 He Fed Them With Bread For All Their Cattle For That Year", ["Joseph gives bread in exchange for livestock for that year.", "The phrase shows the famine moving in stages over time.", "Survival is being managed year by year.", "This is a hard scene because preservation comes with cost.", "Genesis invites readers to see both the mercy of food and the weight of crisis."]),
  ],
  "Genesis 47:18-22": [
    day20Phrase("📅 When That Year Was Ended", ["The famine continues beyond one exchange cycle.", "This phrase shows the exhaustion of resources over time.", "The people return because yesterday's solution has run out.", "A beginner should see how severe and extended the crisis is.", "Long famine wears down every layer of human security."]),
    day20Phrase("💰 Our Money Is Spent", ["The people openly admit their money is gone.", "Their financial resources cannot save them anymore.", "This detail makes the famine feel personal and economic.", "Money matters, but it has limits when food disappears.", "Earthly wealth cannot feed anyone if there is no bread."]),
    day20Phrase("🐄 My Lord Also Hath Our Herds", ["The livestock have already been transferred to Pharaoh through Joseph's administration.", "The people are naming how much they have already surrendered to survive.", "This helps beginners track the progression: money, then animals, then land and labor.", "The famine is reshaping society step by step.", "Crisis can reorder a whole nation."]),
    day20Phrase("🧍 There Is Not Ought Left But Our Bodies, And Our Lands", ["Ought means anything.", "The people say nothing remains except themselves and their land.", "This is one of the heaviest lines in Genesis 47.", "It shows survival pressure at its most vulnerable.", "The human cost of famine is not abstract; people feel reduced to body and soil."]),
    day20Phrase("🌱 Give Us Seed, That We May Live", ["The people ask for seed, not just bread.", "Seed means they are thinking about planting and future harvest.", "This phrase matters because survival needs tomorrow, not only today's meal.", "Joseph's provision must keep the land alive after famine.", "Wise care gives people a future to plant."]),
    day20Phrase("🏛️ Joseph Bought All The Land Of Egypt For Pharaoh", ["Joseph centralizes Egypt's land under Pharaoh during the famine.", "This is a major social and economic change.", "Genesis reports it directly without pretending the scene is simple.", "A beginner should understand that Joseph is preserving life inside an ancient royal system.", "The passage holds together rescue, power, cost, and structure."]),
    day20Phrase("👥 The Egyptians Sold Every Man His Field", ["The people sell their fields because the famine is too strong for them.", "Fields represented inheritance, stability, and future income.", "This shows how deeply the famine changes ordinary lives.", "The rescue keeps people alive, but it also changes ownership in Egypt.", "Bible readers should learn to notice both provision and consequence."]),
  ],
  "Genesis 47:23-26": [
    day20Phrase("👀 Behold, I Have Bought You This Day", ["Joseph speaks plainly about the new arrangement.", "The people and land now belong to Pharaoh under this famine policy.", "This is a sobering line, not a decorative detail.", "A beginner should see that Genesis is explaining how Egypt's system changed.", "Preservation in crisis can still carry heavy social cost."]),
    day20Phrase("🌾 Sow The Land", ["Joseph gives seed so the people can plant again.", "This shows the goal is not simply control, but renewed production.", "The land must return to fruitfulness after famine pressure.", "Bread for today is not enough if there is no harvest tomorrow.", "Wise leadership helps people live beyond the emergency."]),
    day20Phrase("➗ Ye Shall Give The Fifth Part Unto Pharaoh", ["The people will give twenty percent of the harvest to Pharaoh.", "This becomes a structured tax or share from the land.", "The phrase explains the policy established after the famine crisis.", "A beginner may need the fifth part stated simply.", "Genesis shows how emergency rescue can become lasting law."]),
    day20Phrase("4️⃣ Four Parts Shall Be Your Own", ["The people keep four parts for seed, food, and household needs.", "This line matters because it shows the arrangement is not total confiscation of every harvest.", "They owe a fifth, but they still have portions to live and plant from.", "The passage is more complex than a quick reading might suggest.", "God's word often asks us to slow down before judging a scene too simply."]),
    day20Phrase("👶 Food For Your Little Ones", ["Joseph's arrangement includes provision for children.", "The policy is not only about Pharaoh's share; households need to eat.", "This phrase brings the scene back to vulnerable family life.", "A beginner should remember that famine policy affects children at the table.", "Good administration must keep the weak in view."]),
    day20Phrase("🙏 Let Us Find Grace In The Sight Of My Lord", ["The people respond with gratitude and request favor.", "Grace here means favor, not the full New Testament theological vocabulary.", "They recognize Joseph has preserved their lives, even in a costly arrangement.", "The line shows relief and dependence mixed together.", "People under pressure may receive rescue with gratitude while still living with real cost."]),
    day20Phrase("📜 Joseph Made It A Law", ["Joseph's famine arrangement becomes law in Egypt.", "This explains a long-standing practice that the fifth belongs to Pharaoh.", "Genesis is connecting a crisis decision to an institutional result.", "A beginner should see why this legal note is included.", "Historical details in Genesis often explain how later realities came to be."]),
  ],
  "Genesis 47:27-31": [
    day20Phrase("🌱 They Had Possessions Therein", ["Israel's family gains possessions in Goshen.", "They are not merely surviving; they are beginning to settle and grow.", "This fulfills part of God's promise to preserve and multiply them.", "A beginner should see the contrast: Egyptians are losing land while Israel is being established in Goshen.", "God's providence can protect His promise people in a hard wider season."]),
    day20Phrase("📈 Grew, And Multiplied Exceedingly", ["The family grows greatly in Egypt.", "This points toward Exodus, where Israel will become numerous.", "Genesis is showing the promise to Abraham continuing in a foreign land.", "The growth is not random population detail.", "God is turning a rescued household into a future nation."]),
    day20Phrase("⏳ Jacob Lived In The Land Of Egypt Seventeen Years", ["Jacob lives seventeen years in Egypt after seeing Joseph again.", "This is tender because Joseph was seventeen when he was sold.", "God gives Jacob seventeen more years with the son he thought dead.", "A beginner may not notice the echo, but it gives the line emotional depth.", "The years stolen by grief are answered by years of restored presence."]),
    day20Phrase("🧮 The Whole Age Of Jacob Was An Hundred Forty And Seven Years", ["Jacob's age is counted as 147 years.", "Genesis is nearing the end of the patriarch's life.", "The number marks a long story of struggle, promise, grief, and mercy.", "Jacob is no longer the young deceiver fleeing home.", "He is an old man preparing the next generation to remember God's promise."]),
    day20Phrase("🤲 Put, I Pray Thee, Thy Hand Under My Thigh", ["Jacob asks Joseph to make a solemn oath in an ancient covenant gesture.", "This may sound strange to beginners, but it signals seriousness and family promise.", "Jacob is not making a casual request.", "He wants Joseph bound to his burial wish.", "Faith treats the promise land seriously even at death."]),
    day20Phrase("🙏 Deal Kindly And Truly With Me", ["Jacob asks Joseph to show covenant kindness and truth.", "He wants loyalty, not sentiment only.", "The burial request is about faith in God's promise, not personal preference alone.", "A beginner should see that kindness and truth belong together.", "Love keeps promises honestly."]),
    day20Phrase("🛏️ I Will Lie With My Fathers", ["Jacob wants to be buried with Abraham, Sarah, Isaac, Rebekah, and Leah in Canaan.", "This phrase ties his death to the family burial place and the promise land.", "Egypt has preserved him, but it is not his final identity.", "Jacob's hope remains anchored in what God promised his fathers.", "Faith remembers home even while grateful for temporary shelter."]),
    day20Phrase("🙇 Israel Bowed Himself Upon The Bed's Head", ["Jacob worships or bows at the head of his bed after Joseph swears.", "The old man responds with reverence.", "His body is weak, but his faith is alert.", "This small posture closes the chapter with worshipful trust.", "Near death, Jacob is still leaning into God's promise."]),
  ],
  "Genesis 48:1-4": [
    day20Phrase("📣 Behold, Thy Father Is Sick", ["Joseph receives news that Jacob is ill.", "This summons him into a final family blessing scene.", "The story moves from public famine management to private covenant passing.", "A beginner should recognize the shift in tone.", "When death approaches, blessing and memory become urgent."]),
    day20Phrase("👦 He Took With Him His Two Sons", ["Joseph brings Manasseh and Ephraim to Jacob.", "He wants his sons present for Jacob's final blessing.", "These boys were born in Egypt, but Joseph brings them into the covenant family moment.", "This detail prepares for their adoption into Israel's inheritance.", "Parents can bring children into the story of God's promise."]),
    day20Phrase("💪 Israel Strengthened Himself", ["Jacob gathers strength when he hears Joseph has come.", "The old man's body is weak, but the blessing moment matters enough for effort.", "This phrase shows intention and dignity near death.", "A beginner should see that Jacob is not passive in his final days.", "Faith can rise with purpose even in physical weakness."]),
    day20Phrase("📍 At Luz In The Land Of Canaan", ["Luz is another name connected with Bethel, where God appeared to Jacob.", "Jacob remembers the place where God promised fruitfulness and land.", "He anchors the blessing in God's old word, not in his own nostalgia.", "This helps readers connect Genesis 48 back to earlier Jacob stories.", "God's promises become the memory a family must carry forward."]),
    day20Phrase("🌱 I Will Make Thee Fruitful", ["Jacob repeats God's promise of fruitfulness.", "This matters because he is about to bless Joseph's sons as part of Israel's future.", "The family has grown in Egypt, but the promise began with God.", "A beginner should see that blessing flows from God's word first.", "Fruitfulness is received before it is counted."]),
    day20Phrase("👥 A Multitude Of People", ["God promised Jacob a multitude, meaning many descendants.", "The small family that came to Egypt is already becoming larger.", "Ephraim and Manasseh will be part of that expansion.", "This phrase links the boys to the big family promise.", "God's word can turn grandchildren into signs of a nation."]),
    day20Phrase("🏞️ For An Everlasting Possession", ["The land promise still matters even while Jacob is in Egypt.", "Everlasting possession points beyond the temporary refuge in Goshen.", "Jacob's memory keeps the family from thinking Egypt is the final home.", "A beginner should see how Genesis holds Egypt and Canaan together.", "Provision in one place should not erase promise in another."]),
  ],
  "Genesis 48:5-7": [
    day20Phrase("👶 Born Unto Thee In The Land Of Egypt", ["Jacob emphasizes that Ephraim and Manasseh were born in Egypt.", "Their birthplace does not keep them outside the covenant blessing.", "This matters because the family is now living away from Canaan.", "God's promise can claim children born in a foreign setting.", "Identity is shaped by God's covenant, not only geography."]),
    day20Phrase("👦 Are Mine", ["Jacob adopts Joseph's sons as his own for inheritance purposes.", "This gives Joseph a double portion through Ephraim and Manasseh.", "The phrase is simple but legally and spiritually important.", "A beginner should see that Jacob is changing the family inheritance structure.", "Blessing can pull the next generation closer than expected."]),
    day20Phrase("🥇 As Reuben And Simeon", ["Jacob places Ephraim and Manasseh on the level of his oldest sons.", "This is a major elevation for Joseph's boys.", "It means they will stand as tribal heads within Israel.", "The phrase explains why later Israel has tribes named Ephraim and Manasseh.", "Genesis is laying groundwork for the rest of the Bible."]),
    day20Phrase("👶 Thy Issue, Which Thou Begettest After Them", ["Jacob distinguishes any later children Joseph might have from Ephraim and Manasseh.", "The first two are specially claimed by Jacob.", "This careful family language shapes inheritance.", "A beginner may not know issue means descendants or offspring.", "Old wording can carry important legal meaning."]),
    day20Phrase("🛣️ Rachel Died By Me In The Land Of Canaan", ["Jacob remembers Rachel's death as he blesses Joseph's sons.", "The memory is personal and painful.", "Rachel's loss is tied to Joseph, Benjamin, and now these grandsons.", "Blessing does not erase grief; it often carries grief into hope.", "God can let love and sorrow stand together in a holy moment."]),
    day20Phrase("📍 In The Way, When Yet There Was But A Little Way To Come Unto Ephrath", ["Jacob remembers the road where Rachel died near Ephrath, Bethlehem.", "The detail shows how vividly old grief remains with him.", "He does not tell the story vaguely; he remembers the place and distance.", "A beginner should see that the Bible treats grief as real memory.", "God's blessing can be spoken by people who still remember the road of loss."]),
  ],
  "Genesis 48:8-12": [
    day20Phrase("👀 Israel Beheld Joseph's Sons", ["Jacob sees Joseph's sons, though his eyesight is weak.", "The scene is intimate and generational.", "These boys are living proof that Joseph was not only preserved, but made fruitful.", "A beginner should feel the wonder of Jacob seeing grandchildren he never expected.", "God's mercy can place unexpected faces in front of old grief."]),
    day20Phrase("🎁 Whom God Hath Given Me In This Place", ["Joseph names his sons as gifts from God in Egypt.", "This place had been the land of his suffering, but also became the land of his fruitfulness.", "He does not call the boys accidents of success.", "He gives God credit for family joy in a foreign land.", "Gratitude remembers the Giver even in complicated places."]),
    day20Phrase("🙌 Bring Them, I Pray Thee, Unto Me", ["Jacob asks Joseph to bring the boys close so he can bless them.", "Blessing in Genesis often involves nearness, touch, and spoken words.", "This is not a distant ceremony.", "The old man wants the children near his hands and heart.", "Faith is passed personally, not only abstractly."]),
    day20Phrase("👁️ The Eyes Of Israel Were Dim For Age", ["Jacob's weak eyesight recalls Isaac's old age in Genesis 27.", "But this scene moves differently: Joseph is open, and Jacob blesses intentionally.", "The Bible often echoes earlier stories so we can see contrast and growth.", "A beginner should notice that dim eyes do not mean dim faith.", "Jacob may see poorly physically, but he discerns the blessing clearly."]),
    day20Phrase("🤲 He Brought Them Near Unto Him", ["Joseph brings his sons close to Jacob.", "He is placing the next generation under covenant blessing.", "The action is simple but spiritually loaded.", "Children are being brought near to the promises of God.", "One generation can intentionally place the next within the story of faith."]),
    day20Phrase("🙇 Joseph Bowed Himself With His Face To The Earth", ["Joseph bows before his father in reverence.", "Though Joseph is powerful in Egypt, he honors Jacob's spiritual role.", "The governor becomes a son in the blessing room.", "A beginner should see that worldly authority does not cancel family honor.", "Humility belongs even to the highly exalted."]),
  ],
  "Genesis 48:13-16": [
    day20Phrase("🤲 Joseph Took Them Both", ["Joseph carefully positions his sons for the expected blessing order.", "He places Manasseh toward Jacob's right hand and Ephraim toward the left.", "This shows Joseph understands firstborn custom and expects it to guide the blessing.", "A beginner should see the setup before Jacob crosses his hands.", "Human order is about to meet God's surprising choice."]),
    day20Phrase("➡️ Manasseh In His Left Hand Toward Israel's Right Hand", ["Joseph aims Manasseh, the firstborn, toward the right hand of stronger blessing.", "This is the normal expectation.", "The detail matters because Jacob will intentionally reverse it.", "Genesis slows down the hand positions so the reader understands the surprise.", "God's blessing is not trapped inside human arrangement."]),
    day20Phrase("⬅️ Ephraim In His Right Hand Toward Israel's Left Hand", ["Joseph places younger Ephraim toward Jacob's left hand.", "Again, Joseph is arranging the sons according to birth order.", "The younger is not expected to receive the primary hand.", "This prepares the reader for one of Genesis' recurring reversals.", "God often chooses in ways that unsettle family assumptions."]),
    day20Phrase("✋ Israel Stretched Out His Right Hand", ["Jacob deliberately places his right hand on Ephraim.", "The action is visual theology: blessing does not always follow expected rank.", "The younger receives the stronger blessing hand.", "A beginner should see that this is not a mistake.", "Jacob is acting with spiritual intention."]),
    day20Phrase("🔁 Crossing His Hands", ["Jacob crosses his hands over the boys.", "This physical crossing tells the story before the words do.", "The blessing pattern is being reversed in front of Joseph.", "Genesis has shown this before with younger sons receiving unexpected prominence.", "God's grace can cross human lines."]),
    day20Phrase("👶 Manasseh Was The Firstborn", ["The text reminds us Manasseh was the firstborn so we understand the reversal.", "Jacob knows the normal order and still blesses differently.", "This line keeps the reader from thinking the birth order was unclear.", "The surprise is the point.", "God's blessing is purposeful, not confused."]),
    day20Phrase("🙌 He Blessed Joseph", ["Jacob blesses Joseph through blessing his sons.", "Joseph receives fruit in the next generation.", "This shows how parental blessing can extend through children.", "The old grief around Joseph is answered with generational promise.", "God's mercy can bless a person through what comes after them."]),
    day20Phrase("📛 Let My Name Be Named On Them", ["Jacob wants Ephraim and Manasseh identified with Israel's family line.", "This confirms their adoption into the covenant household.", "They will carry Jacob's name, not only Joseph's Egyptian setting.", "A beginner should see why these boys matter later in Israel's tribes.", "God gives covenant belonging to children born far from home."]),
    day20Phrase("🐟 Let Them Grow Into A Multitude", ["Jacob prays that the boys multiply greatly.", "The language pictures abundant growth.", "This connects back to God's promise to make Jacob fruitful.", "The blessing is not only personal affection; it is covenant expansion.", "God grows His promise through named children."]),
  ],
  "Genesis 48:17-20": [
    day20Phrase("✋ Joseph Held Up His Father's Hand", ["Joseph tries to move Jacob's hand from Ephraim to Manasseh.", "He thinks his father has made a mistake because of age or weak sight.", "This shows Joseph's love for proper order and his concern for Manasseh.", "A beginner should see Joseph is not rebelling; he is trying to correct what he thinks is confusion.", "Even wise people can misunderstand God's surprising order."]),
    day20Phrase("🥇 Not So, My Father: For This Is The Firstborn", ["Joseph speaks plainly: Manasseh is the firstborn.", "He expects firstborn status to determine the stronger blessing.", "The phrase matters because Genesis has repeatedly challenged firstborn assumptions.", "God chose Isaac over Ishmael, Jacob over Esau, and now Ephraim over Manasseh.", "Birth order is real, but it is not sovereign."]),
    day20Phrase("🙅 His Father Refused", ["Jacob refuses Joseph's correction.", "This shows he is not confused or accidentally crossing his hands.", "The old patriarch acts intentionally.", "A beginner should see that weak eyes do not mean weak discernment here.", "God can give clarity to someone whose body is failing."]),
    day20Phrase("👥 He Also Shall Become A People", ["Jacob does not reject Manasseh.", "He affirms Manasseh will become a people and be great.", "This is important because the reversal is not hatred or exclusion.", "Manasseh is blessed, but Ephraim receives greater prominence.", "God's choice of one does not always mean contempt for another."]),
    day20Phrase("👦 His Younger Brother Shall Be Greater Than He", ["Jacob states the reversal clearly.", "Ephraim, the younger, will become greater in prominence.", "This continues Genesis' pattern of surprising younger-son blessing.", "A beginner should learn to watch this pattern across the book.", "God's purposes move by grace, not automatic human rank."]),
    day20Phrase("🌍 His Seed Shall Become A Multitude Of Nations", ["Ephraim's descendants will become especially numerous and significant.", "The blessing looks far beyond the two boys in the room.", "Jacob is speaking future over generations.", "This moment helps explain later biblical references to Ephraim.", "Small family scenes can carry national futures."]),
    day20Phrase("🗣️ In Thee Shall Israel Bless", ["Jacob gives a blessing formula that Israel will use later.", "The boys become examples of blessing within the family.", "This phrase shows how the moment will echo beyond Joseph's lifetime.", "A beginner should see that words spoken here become tradition.", "Faithful blessing can shape how future generations speak."]),
    day20Phrase("🔁 He Set Ephraim Before Manasseh", ["The text summarizes the reversal plainly.", "Ephraim is set before Manasseh in blessing order.", "This is the final confirmation of Jacob's intention.", "Genesis ends the scene with the younger before the older.", "God's order may surprise us, but it is not accidental."]),
  ],
  "Genesis 48:21-22": [
    day20Phrase("⏳ Behold, I Die", ["Jacob speaks honestly about his approaching death.", "He does not pretend he will remain forever with the family.", "This makes his next words even more important.", "A beginner should see that final blessings often carry concentrated faith.", "Death does not silence hope when God has spoken."]),
    day20Phrase("🙌 God Shall Be With You", ["Jacob points Joseph beyond himself to God's continuing presence.", "The family will not be abandoned when Jacob dies.", "This phrase is deeply comforting because leadership is passing from one generation to another.", "God's presence is the real inheritance beneath every blessing.", "Covenant hope outlives the people who first speak it to us."]),
    day20Phrase("🏞️ The Land Of Your Fathers", ["Jacob names the land connected to Abraham, Isaac, and himself.", "Even in Egypt, he keeps pointing the family back to Canaan.", "This phrase keeps the promise alive in the minds of the next generation.", "A beginner should see why land language keeps returning.", "Egypt is provision now, but it is not the final promise."]),
    day20Phrase("🎁 I Have Given To Thee One Portion", ["Jacob gives Joseph an extra portion above his brothers.", "This fits with Ephraim and Manasseh being counted as Jacob's own sons.", "Joseph receives a double inheritance through his two sons.", "The phrase explains the special honor given to Joseph's line.", "God can bring lasting fruit from years of suffering and faithfulness."]),
    day20Phrase("⚔️ Which I Took Out Of The Hand Of The Amorite", ["Jacob refers to land taken from the Amorite with sword and bow.", "This phrase is difficult, but it points to a real claim connected to the land.", "The main point for beginners is that Jacob's hope remains tied to inheritance in Canaan.", "He speaks as someone whose family future is not meant to stay in Egypt.", "The promise land still matters at the edge of death."]),
    day20Phrase("🏹 With My Sword And With My Bow", ["Sword and bow are weapons, showing struggle connected to the land claim.", "The phrase reminds readers that inheritance in Genesis is not abstract sentiment.", "Land, conflict, promise, and family future are all bound together.", "Jacob's final words are preparing Joseph to think beyond Egypt's comfort.", "God's promise may involve a future his children must still walk into."]),
  ],
};

function deepenDay20PhraseCards(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  return {
    ...section,
    phrases: [...section.phrases, ...(DAY_20_REAL_PHRASE_ADDITIONS[section.reference] ?? [])],
  };
}

const day21Phrase = (title: string, lines: string[]): [string, string] => phrase(title, lines);

const DAY_21_REAL_PHRASE_REPLACEMENTS: Record<string, Array<[string, string]>> = {
  "Genesis 49:1-6": [
    day21Phrase("👥 Gather Yourselves Together", ["Jacob calls his sons close before he dies.", "This is not a casual family meeting; it is a final prophetic blessing scene.", "The whole family gathers to hear words that will shape the future tribes of Israel.", "A beginner should see that Genesis is moving from one father to twelve tribal lines.", "Jacob's voice is old, but the future is in the room."]),
    day21Phrase("⏳ That Which Shall Befall You In The Last Days", ["Jacob speaks about what will happen to his sons' lines in days to come.", "The phrase points beyond the immediate family into the future of Israel.", "These words are blessing, warning, prophecy, and family truth all at once.", "A beginner may hear 'last days' and think only of the end of the world, but here it means future days for the tribes.", "Genesis is opening a window from family history into national destiny."]),
    day21Phrase("👂 Hearken Unto Israel Your Father", ["Jacob asks his sons to listen to him as Israel, the covenant name God gave him.", "He is not only speaking as an emotional father.", "He speaks as the patriarch carrying God's promises to the next generation.", "The sons must hear truth about their past and future.", "Blessing begins with listening."]),
    day21Phrase("🥇 Reuben, Thou Art My Firstborn", ["Reuben is named first because he was Jacob's firstborn.", "Firstborn status normally carried strength, honor, and leadership.", "But Reuben's later words show that position alone cannot protect a person from character failure.", "A beginner should see the tension: he has the title, but not the lasting privilege.", "Genesis keeps teaching that birth order is not the same as faithfulness."]),
    day21Phrase("💪 The Excellency Of Dignity, And The Excellency Of Power", ["Jacob names what Reuben should have carried as firstborn.", "Dignity and power were available to him by position.", "The line makes his fall feel heavier because the calling was so high.", "This is not random criticism; it is lost potential being named out loud.", "Great privilege requires steady character."]),
    day21Phrase("🌊 Unstable As Water", ["Jacob says Reuben is unstable like water.", "Water here pictures something uncontrolled, shifting, and unable to hold shape.", "This explains why Reuben will not excel despite his firstborn status.", "A beginner should connect this to Reuben's earlier sin with Bilhah.", "Uncontrolled desire can damage a calling."]),
    day21Phrase("🛏️ Thou Wentest Up To Thy Father's Bed", ["Jacob directly names Reuben's sin from Genesis 35.", "The blessing scene does not hide serious wrongdoing.", "Reuben's private failure has public consequences for his line.", "This shows why Genesis includes painful family details earlier.", "Sin may be forgiven, but it can still shape inheritance and trust."]),
    day21Phrase("⚔️ Simeon And Levi Are Brethren", ["Simeon and Levi are grouped together because of their shared violence at Shechem.", "Jacob remembers not only their blood relationship but their partnership in cruelty.", "Their tribe futures are affected by what they did as brothers.", "A beginner should see that family loyalty can become dangerous when it protects sin.", "Being united is not automatically holy if the unity serves violence."]),
    day21Phrase("🗡️ Instruments Of Cruelty", ["Jacob describes their weapons or plans as cruel instruments.", "This points back to Genesis 34, where they killed the men of Shechem.", "The phrase is severe because their anger became bloodshed.", "Jacob's final words refuse to bless violence as righteous zeal.", "God's people must not confuse revenge with justice."]),
    day21Phrase("🚫 O My Soul, Come Not Thou Into Their Secret", ["Jacob distances his soul from their violent counsel.", "He does not want his identity joined to their scheme.", "This is a powerful line for beginners: love for family does not mean approving every family action.", "Jacob can name them as sons and still reject their cruelty.", "Faith may require refusing the secret plans of people close to us."]),
  ],
  "Genesis 49:7-7": [
    day21Phrase("🔥 Cursed Be Their Anger", ["Jacob curses their anger, not their existence.", "That distinction matters because the problem is the violent rage that ruled them.", "Anger became deadly when it went unchecked.", "A beginner should hear the warning clearly: emotion can become destructive if it takes the throne.", "Jacob is judging the rage that wounded others."]),
    day21Phrase("😡 For It Was Fierce", ["Their anger was fierce, meaning intense and uncontrolled.", "The word shows the heat and force of what happened at Shechem.", "This was not careful justice; it was burning retaliation.", "Genesis is teaching that passion without righteousness can destroy communities.", "Strength must be governed by God, not rage."]),
    day21Phrase("💥 Their Wrath, For It Was Cruel", ["Wrath here means angry fury, and Jacob calls it cruel.", "Cruel anger does not only feel strongly; it harms people without mercy.", "Simeon and Levi's violence left a stain on their future.", "A beginner should see that the Bible does not excuse cruelty because it comes from offended family honor.", "Wrong done to your family does not give permission to become wicked."]),
    day21Phrase("🧩 I Will Divide Them In Jacob", ["Jacob says Simeon and Levi will be divided within Israel.", "Their lines will not carry the same settled tribal power as others.", "The consequence fits the sin: violent unity is broken apart.", "This phrase helps explain later tribal history.", "God can limit dangerous power by scattering it."]),
    day21Phrase("🗺️ Scatter Them In Israel", ["Scattering means their descendants will be spread out among the people.", "Levi's later priestly role will show God's mercy can transform scattering into service.", "But in Genesis 49, the word still carries judgment for violence.", "A beginner should see both consequence and the possibility of later grace.", "God's discipline can become a place where mercy still works."]),
    day21Phrase("⚖️ Jacob's Final Words To Simeon And Levi", ["This section is short but heavy.", "Jacob does not give Simeon and Levi a soft blessing because their violence mattered.", "His words teach readers that family history has moral weight.", "Genesis is not sentimental at the end; it tells the truth.", "Blessing cannot be separated from character."]),
  ],
  "Genesis 49:8-12": [
    day21Phrase("🦁 Judah, Thou Art He Whom Thy Brethren Shall Praise", ["Judah receives a striking word of honor.", "His name is connected with praise, and his brothers will acknowledge him.", "This is a major turn because Judah's life included serious failure and later deep transformation.", "A beginner should remember Judah offered himself for Benjamin in Genesis 44.", "God can raise a changed sinner into leadership."]),
    day21Phrase("🤲 Thy Hand Shall Be In The Neck Of Thine Enemies", ["This phrase pictures victory over enemies.", "Jacob is speaking royal and military strength over Judah's line.", "It does not mean Judah personally conquers everything immediately.", "It points forward to the tribe's future prominence.", "Genesis is beginning to focus the royal hope through Judah."]),
    day21Phrase("🙇 Thy Father's Children Shall Bow Down Before Thee", ["Judah will receive leadership among his brothers.", "This is remarkable because Reuben was the firstborn.", "The family leadership is shifting away from birth order toward God's chosen line.", "A beginner should connect this to Genesis' repeated younger-or-unexpected choice pattern.", "God's purpose is not locked to human expectation."]),
    day21Phrase("🦁 Judah Is A Lion's Whelp", ["Judah is compared to a young lion.", "The image communicates strength, royalty, and dangerous power.", "Later Scripture will keep connecting Judah with lion imagery.", "This phrase matters because it gives Judah's line a royal imagination.", "The Bible's big story begins planting messianic signals here."]),
    day21Phrase("👑 The Sceptre Shall Not Depart From Judah", ["The sceptre is a symbol of royal rule.", "Jacob says kingship will be tied to Judah's line.", "This becomes one of the most important promises in Genesis because David and ultimately Jesus come from Judah.", "A beginner should not skip this as poetic language only.", "Genesis is pointing toward a ruler who will come through Judah."]),
    day21Phrase("⚖️ Nor A Lawgiver From Between His Feet", ["Lawgiver means ruler or one who commands.", "The phrase strengthens the idea of government and authority in Judah's line.", "Jacob is not only saying Judah will be strong; he is saying Judah will rule.", "This helps readers understand why later biblical kingship centers on Judah.", "Authority is being prophetically marked out."]),
    day21Phrase("🕊️ Until Shiloh Come", ["Shiloh is a difficult phrase, but it points to the one to whom rule rightly belongs.", "Many Christians read this as a messianic hope connected to the coming ruler from Judah.", "For beginners, the key is that Judah's rule is moving toward a promised person.", "Genesis is not ending with vague optimism.", "It is pointing forward to a kingly fulfillment."]),
    day21Phrase("🌍 Unto Him Shall The Gathering Of The People Be", ["The peoples will gather to the ruler connected with Judah.", "The promise expands beyond one family argument.", "This sounds bigger than tribal politics, reaching toward nations and worship.", "A beginner should hear the global note inside the family blessing.", "God's plan for Abraham's family keeps widening toward all peoples."]),
    day21Phrase("🍇 Binding His Foal Unto The Vine", ["The vine imagery pictures abundance so great that even animals are tied near vines.", "Wine, grapes, and rich growth fill the blessing.", "This poetic language shows prosperity and royal peace.", "The details can sound strange, but they are pictures of overflowing blessing.", "Judah's future is described with strength and abundance together."]),
    day21Phrase("🍷 Washed His Garments In Wine", ["This image pictures extreme abundance of wine.", "The point is not careless waste but overflowing prosperity.", "Judah's blessing is full of royal richness.", "A beginner should read the image as poetry, not a literal laundry instruction.", "God's promised future is described in images of fullness."]),
  ],
  "Genesis 49:13-18": [
    day21Phrase("⛵ Zebulun Shall Dwell At The Haven Of The Sea", ["Zebulun's blessing is connected with the sea and trade routes.", "A haven is a harbor or safe place for ships.", "The tribe's future is pictured near commerce and coastal movement.", "A beginner may not know why sea language matters in a land-based family story.", "Jacob is speaking different futures over different sons."]),
    day21Phrase("🚢 He Shall Be For An Haven Of Ships", ["This repeats Zebulun's connection to ships and harbor life.", "The image points to trade, access, and movement beyond inland borders.", "It shows that not every tribe will have the same role or setting.", "God's people will have varied callings within one family.", "Different does not mean lesser."]),
    day21Phrase("🐴 Issachar Is A Strong Ass", ["Issachar is compared to a strong donkey lying between burdens.", "The image can sound insulting to modern readers, but it points to strength, labor, and bearing loads.", "Jacob's words are poetic tribal pictures, not casual name-calling.", "A beginner should slow down and ask what the image communicates.", "Strength can be used for rest, labor, or submission depending on the heart."]),
    day21Phrase("🌿 He Saw That Rest Was Good", ["Issachar values the pleasant land and rest before him.", "The phrase suggests comfort and settlement.", "But the next line shows a danger: comfort can lead to serving under burdens.", "This blessing is mixed, like many of Jacob's words.", "Good rest becomes dangerous when it makes a person surrender too easily."]),
    day21Phrase("📦 Bowed His Shoulder To Bear", ["Issachar bends under burden.", "This pictures labor and servitude.", "The tribe may be strong, but strength can still become submission under pressure.", "A beginner should see the warning inside the image.", "Strength needs wise direction, not only endurance."]),
    day21Phrase("⚖️ Dan Shall Judge His People", ["Dan's name is connected with judging.", "Jacob says Dan will have a role of justice among the tribes.", "This gives dignity to Dan even though he is not one of Leah or Rachel's sons directly.", "A beginner should see that the servant-mother lines are still included in Israel's future.", "God gives roles across the whole family."]),
    day21Phrase("🐍 Dan Shall Be A Serpent By The Way", ["Dan is compared to a serpent that strikes unexpectedly.", "The image suggests cunning, danger, and surprising power against stronger forces.", "This is vivid tribal poetry.", "It does not mean every Danite is evil; it pictures a future character of the tribe.", "Bible imagery often needs careful reading, not instant assumption."]),
    day21Phrase("🛟 I Have Waited For Thy Salvation, O LORD", ["Jacob suddenly turns from tribal words to a prayer of hope.", "Salvation means rescue, deliverance, and help from the LORD.", "This line feels like Jacob's heart rising to God in the middle of blessing his sons.", "A beginner should notice the personal faith inside the prophecy.", "At the edge of death, Jacob is still waiting on God's rescue."]),
  ],
  "Genesis 49:19-21": [
    day21Phrase("⚔️ Gad, A Troop Shall Overcome Him", ["Gad's future is pictured with attack and conflict.", "The tribe will face pressure from raiding troops or enemies.", "This is not a soft blessing, but it is not hopeless.", "The line prepares readers to see struggle as part of Gad's story.", "Some callings include repeated battles."]),
    day21Phrase("🔁 But He Shall Overcome At The Last", ["Gad will be attacked, but he will ultimately overcome.", "The blessing holds both trouble and victory.", "A beginner should notice the turn in the phrase: conflict does not get the final word.", "Jacob names resilience over Gad's line.", "God can give endurance that outlasts assault."]),
    day21Phrase("🍞 Out Of Asher His Bread Shall Be Fat", ["Asher's blessing is full of rich food imagery.", "Fat bread means abundant, luxurious provision.", "The tribe's land or future is pictured with plenty.", "This phrase may sound odd in modern English, but in context it means richness and blessing.", "God's provision can be described with the language of a full table."]),
    day21Phrase("👑 He Shall Yield Royal Dainties", ["Asher's produce is fit for royalty.", "Dainties means delicacies or fine foods.", "The blessing suggests abundance that serves even kings.", "A beginner should see that this is prosperity language, not random food detail.", "Some tribal blessings picture fruitfulness through what the land produces."]),
    day21Phrase("🦌 Naphtali Is A Hind Let Loose", ["A hind is a female deer.", "Naphtali is pictured as free, swift, and graceful.", "The image is very different from Issachar's burden-bearing donkey or Judah's lion.", "Jacob is giving each son a distinct poetic identity.", "God's people are not flattened into one personality."]),
    day21Phrase("🗣️ He Giveth Goodly Words", ["Naphtali is connected with beautiful or good words.", "This may suggest eloquence, blessing, or graceful speech.", "The phrase reminds beginners that words can be part of a tribe's identity and gift.", "Not every blessing is military or economic.", "Speech can carry beauty and strength."]),
  ],
  "Genesis 49:22-27": [
    day21Phrase("🌿 Joseph Is A Fruitful Bough", ["Joseph is pictured as a fruitful branch.", "This fits his life: he suffered deeply but became fruitful in Egypt.", "The image reaches back to Ephraim's name, fruitfulness in affliction.", "A beginner should see how Joseph's whole story is summarized in one picture.", "God made fruit grow from a wounded branch."]),
    day21Phrase("💧 Even A Fruitful Bough By A Well", ["The branch is near water, which explains its life and fruitfulness.", "Joseph's fruit did not come from easy circumstances, but from God's sustaining presence.", "The well image points to hidden supply.", "Even in Egypt, Joseph was not cut off from God's life-giving care.", "Fruitfulness needs roots near the water God provides."]),
    day21Phrase("🏹 The Archers Have Sorely Grieved Him", ["Joseph's enemies are pictured as archers shooting at him.", "This poetic image covers betrayal, slavery, accusation, prison, and years of grief.", "Sorely grieved means deeply attacked or harassed.", "A beginner should connect the image to Joseph's story rather than imagine only literal arrows.", "Faithful people can be fruitful and wounded at the same time."]),
    day21Phrase("💪 His Bow Abode In Strength", ["Joseph remains strong despite the attacks.", "His strength does not mean he never wept; Genesis showed many tears.", "It means he did not become ruled by revenge or bitterness.", "The phrase honors endurance under pressure.", "God can keep a person's inner bow steady through years of assault."]),
    day21Phrase("🤲 The Hands Of The Mighty God Of Jacob", ["Jacob credits Joseph's strength to the Mighty God.", "Joseph did not survive by personality alone.", "God's hands strengthened Joseph's hands.", "A beginner should see that the blessing gives God the glory for Joseph's endurance.", "Behind Joseph's faithfulness was God's sustaining power."]),
    day21Phrase("🐑 From Thence Is The Shepherd, The Stone Of Israel", ["This phrase gathers shepherd and stone imagery around God's care and stability.", "It is rich language for the God who guides and supports Israel.", "Some readers also hear messianic echoes here because later Scripture uses shepherd and stone language deeply.", "For beginners, the key is simple: Israel's future rests on God's strength.", "The family is not held together by Joseph alone."]),
    day21Phrase("🙌 Blessings Of Heaven Above", ["Joseph receives layered blessings from heaven, deep, womb, and family line.", "The language is abundant and overflowing.", "Jacob is piling up blessing over the son he thought he lost.", "This is not merely emotional favoritism; it recognizes God's fruitfulness through Joseph.", "The wounded son becomes richly blessed."]),
    day21Phrase("👑 They Shall Be On The Head Of Joseph", ["Jacob places the blessings on Joseph's head.", "The head language pictures honor, identity, and inheritance.", "Joseph's life of suffering is crowned with blessing.", "A beginner should feel the reversal from pit to blessing.", "God can bring honor that answers years of humiliation."]),
    day21Phrase("🐺 Benjamin Shall Ravin As A Wolf", ["Benjamin is compared to a wolf that devours and divides spoil.", "The image is fierce and warrior-like.", "It may surprise readers because Benjamin has often appeared as the protected younger son.", "Jacob's words look beyond Benjamin as a person to the future tribe.", "The small protected son will become a strong and dangerous tribe."]),
  ],
  "Genesis 49:28-28": [
    day21Phrase("1️⃣2️⃣ All These Are The Twelve Tribes Of Israel", ["Genesis now explicitly names the sons as the twelve tribes of Israel.", "This is a major transition from family story to national story.", "The brothers are no longer only individual sons around Jacob's bed.", "Their lines will become the people of Israel.", "Genesis ends by showing how a household becomes a nation."]),
    day21Phrase("🗣️ This Is It That Their Father Spake Unto Them", ["Jacob's words are gathered and summarized as fatherly speech.", "He has spoken truth, warning, promise, and blessing.", "Not every word sounded comforting, but each word mattered.", "A beginner should learn that biblical blessing can include honest correction.", "Love tells the truth about the future."]),
    day21Phrase("🙌 Blessed Them", ["The chapter says Jacob blessed them, even though some words were severe.", "This teaches that blessing is not always flattery.", "A father's final blessing can name consequences and still belong to God's covenant story.", "The sons receive words fitted to their histories and futures.", "God's blessing is truthful, not fake."]),
    day21Phrase("🎯 Every One According To His Blessing", ["Each son receives a distinct word.", "Jacob does not give one generic speech to everyone.", "This phrase helps beginners understand why the chapter feels varied and poetic.", "Different histories and different futures receive different words.", "God deals with people personally inside one family story."]),
    day21Phrase("👨‍👦 According To His Blessing He Blessed Them", ["The repetition emphasizes that each blessing matched the son.", "Genesis wants the reader to see intentionality, not randomness.", "These words will echo into Israel's tribal future.", "The family is being ordered for what comes after Jacob.", "A dying father's words become a map for generations."]),
  ],
  "Genesis 49:29-33": [
    day21Phrase("⚰️ I Am To Be Gathered Unto My People", ["Jacob speaks about death as being gathered to his people.", "The phrase points to joining the ancestors in death and burial hope.", "He does not describe death as meaningless disappearance.", "A beginner should hear faith and family memory in the phrase.", "Jacob is dying with his identity tied to God's covenant people."]),
    day21Phrase("🪦 Bury Me With My Fathers", ["Jacob repeats his desire to be buried with Abraham and Isaac.", "Egypt has preserved him, but Canaan remains the burial place of promise.", "This is not stubborn nostalgia; it is faith in God's land promise.", "The family must remember where home is.", "Burial becomes a confession of hope."]),
    day21Phrase("🕳️ In The Cave That Is In The Field Of Ephron", ["Jacob gives exact burial instructions.", "The cave of Machpelah was the family burial place Abraham purchased.", "This detail connects Jacob's death to Genesis 23 and the first owned piece of promise land.", "A beginner should see why the location matters.", "God's promises are tied to real places and remembered acts of faith."]),
    day21Phrase("🏞️ Before Mamre, In The Land Of Canaan", ["The burial cave is located in Canaan, not Egypt.", "Jacob's final geography points the family back to the promise land.", "Even while Israel lives in Egypt, Canaan remains the anchor.", "This helps prepare the Bible's later longing for return.", "Faith remembers God's destination while living in temporary provision."]),
    day21Phrase("👫 There They Buried Abraham And Sarah", ["Jacob names Abraham and Sarah in the burial place.", "The family tomb holds the first generation of promise.", "This connects Jacob's death to the larger covenant line.", "A beginner should see that Genesis is tying the generations together at the end.", "The promise passes through families who die still trusting God."]),
    day21Phrase("👫 There They Buried Isaac And Rebekah", ["Isaac and Rebekah are also buried there.", "Jacob's parents are part of the same burial hope.", "The repeated names make the cave a family testimony.", "Death has touched every generation, but God's promise continues.", "The grave does not cancel covenant hope."]),
    day21Phrase("😭 There I Buried Leah", ["Jacob notes that Leah is buried there too.", "Rachel was buried on the road, but Leah rests in the family cave.", "This detail gives Leah a final place of honor in the family story.", "A beginner should not miss her after years of being unloved.", "God remembers the overlooked wife at the end."]),
    day21Phrase("🛏️ He Gathered Up His Feet Into The Bed", ["Jacob finishes his commands and gathers himself into the bed.", "The detail is quiet and human.", "His final work is done: he has blessed, instructed, and pointed the family toward Canaan.", "Genesis lets the patriarch die with order and faith.", "A life of struggle ends leaning toward God's promise."]),
    day21Phrase("🌬️ Yielded Up The Ghost", ["This old phrase means Jacob died.", "The wording can sound strange to beginners, so it helps to name it plainly.", "Jacob's long life ends after blessing his sons and giving burial instructions.", "His death is sad, but not chaotic.", "He dies inside the story of God's continuing promise."]),
  ],
  "Genesis 50:1-6": [
    day21Phrase("😭 Joseph Fell Upon His Father's Face", ["Joseph responds to Jacob's death with deep physical grief.", "He is governor of Egypt, but he is still a son losing his father.", "The Bible does not rush past mourning.", "A beginner should see that faith does not make grief less human.", "Love is allowed to weep."]),
    day21Phrase("😘 Kissed Him", ["Joseph kisses his father after he dies.", "This is an intimate act of love and farewell.", "It answers years when Joseph thought he might never see Jacob again.", "The reunion was real, and now the goodbye is real too.", "Restoration does not remove the pain of death, but it changes the story around it."]),
    day21Phrase("🧴 Embalm His Father", ["Joseph commands physicians to embalm Jacob according to Egyptian practice.", "This prepares Jacob's body for the journey back to Canaan.", "The detail may feel foreign to beginners, but it fits Egypt's burial customs.", "God's promise is being honored through the practical means available in Egypt.", "Faith can use cultural practice without forgetting covenant hope."]),
    day21Phrase("4️⃣0️⃣ Forty Days", ["The embalming takes forty days.", "The number shows the process was lengthy and serious.", "Jacob's body is being prepared carefully for burial in Canaan.", "A beginner should see that the family is not improvising the burial.", "They are honoring both grief and Jacob's oath-bound request."]),
    day21Phrase("😭 The Egyptians Mourned For Him Threescore And Ten Days", ["Egypt mourns Jacob for seventy days.", "This shows the honor connected to Joseph and his father.", "Jacob came to Egypt as a famine refugee, but he is mourned with dignity.", "A beginner should notice how God gave favor even in a foreign land.", "The covenant family is not invisible in Egypt."]),
    day21Phrase("🏠 The House Of Pharaoh", ["Joseph appeals through Pharaoh's house for permission to bury Jacob.", "Even with high authority, Joseph moves properly within Egyptian court structure.", "He honors Pharaoh while honoring his father.", "This shows wisdom in public responsibility.", "Faithful people can navigate authority without losing their convictions."]),
    day21Phrase("🤝 My Father Made Me Swear", ["Joseph explains that Jacob bound him by oath.", "The burial trip is not Joseph's personal whim.", "It is obedience to his father's covenant-shaped request.", "A beginner should see why the oath matters.", "Promises made in faith should be kept after death."]),
    day21Phrase("🪦 In My Grave Which I Have Digged For Me", ["Jacob's words point to a prepared burial place in Canaan.", "He saw his burial as part of belonging to the promise land.", "Egypt was where he lived his final years, but not where he wanted his bones to rest.", "The grave becomes a testimony of hope.", "Jacob's body will preach that Egypt is not the final home."]),
  ],
  "Genesis 50:7-12": [
    day21Phrase("👑 All The Servants Of Pharaoh", ["A large Egyptian delegation goes with Joseph.", "Jacob's burial becomes a public event involving Egypt's leaders.", "This shows the honor Joseph's family receives because of God's work through Joseph.", "A beginner should feel the scale of the procession.", "God can cause a foreign empire to honor His promise family."]),
    day21Phrase("👴 The Elders Of His House", ["The elders of Pharaoh's house join the journey.", "These are important officials, not random travelers.", "Their presence gives dignity to Jacob's burial.", "The promise family is being escorted with high honor.", "God's providence can bring respect from unexpected places."]),
    day21Phrase("👨‍👩‍👧 All The House Of Joseph", ["Joseph's household goes with him.", "The burial is both family duty and national moment.", "This shows Joseph's Egyptian life and Hebrew family story moving together.", "A beginner should see that Joseph belongs to both settings in different ways.", "God preserved Joseph in Egypt without erasing his family identity."]),
    day21Phrase("👶 Only Their Little Ones, And Their Flocks, And Their Herds", ["The little ones and animals stay in Goshen.", "This keeps the settlement secure while the burial party travels.", "The detail explains that the whole people are not abandoning Egypt yet.", "Canaan is the burial destination, but Goshen remains the temporary home.", "God's promise often moves in steps, not all at once."]),
    day21Phrase("🐎 Chariots And Horsemen", ["The burial procession includes chariots and horsemen.", "This is a great and honorable company.", "The old shepherd Jacob is carried to Canaan with royal-level dignity.", "A beginner should see the reversal: famine refugees are now escorted by Egypt's power.", "God can clothe His promise with unexpected honor."]),
    day21Phrase("🌾 The Threshingfloor Of Atad", ["The procession stops at the threshingfloor of Atad beyond Jordan.", "A threshingfloor was an open place used for processing grain, here becoming a mourning place.", "The location gives the grief a public pause before burial.", "Genesis ties sorrow to a named place so the memory is anchored.", "God's people often remember places where grief and promise meet."]),
    day21Phrase("😭 A Very Great And Sore Lamentation", ["The mourning is intense and public.", "Sore here means heavy or grievous.", "Jacob's death is treated as a major loss.", "A beginner should see that the Bible does not minimize funerals or lament.", "Deep grief can be honorable."]),
    day21Phrase("7️⃣ Seven Days", ["They mourn at Atad for seven days.", "The number shows a complete period of mourning before burial continues.", "The family takes time with grief instead of rushing past it.", "This is a healthy biblical rhythm: grief is given space.", "Faith walks toward hope, but it does not sprint over sorrow."]),
  ],
  "Genesis 50:13-14": [
    day21Phrase("🧳 His Sons Carried Him", ["Jacob's sons carry his body to Canaan.", "This fulfills their father's command and honors his final request.", "The brothers who once caused Jacob deep grief now act together in obedience.", "A beginner should notice the family moving as one.", "God has brought a fractured family into a shared act of honor."]),
    day21Phrase("🕳️ The Cave Of The Field Of Machpelah", ["Jacob is buried in the family cave Abraham purchased.", "This place holds Abraham, Sarah, Isaac, Rebekah, Leah, and now Jacob.", "The burial ties Jacob to the generations of promise.", "A beginner should see that Machpelah is not random geography.", "It is the family's foothold of faith in Canaan."]),
    day21Phrase("💰 Which Abraham Bought", ["The text repeats that Abraham bought the burial place.", "That purchase matters because it was a real piece of land in Canaan.", "Genesis keeps reminding readers that God's promises touch actual history.", "The family owns a grave before it owns the land fully.", "Faith sometimes holds the promise first as a burial plot."]),
    day21Phrase("🏞️ For A Possession Of A Buryingplace", ["The cave is a possessed burial place in the promise land.", "This phrase explains the legal and spiritual significance of the site.", "Jacob's burial there says the family still belongs to God's promise.", "A beginner should connect this to Jacob's refusal to be buried in Egypt.", "Where he is buried is a confession of what he believed."]),
    day21Phrase("🔙 Joseph Returned Into Egypt", ["After burying Jacob, Joseph returns to Egypt.", "The promise land is visited, but the family story is still temporarily in Egypt.", "This tension prepares the reader for Exodus.", "Canaan is home by promise, Egypt is home by current provision.", "God's people sometimes live between where they are and where God will bring them."]),
    day21Phrase("👥 He, And His Brethren", ["Joseph returns with his brothers after the burial.", "The family remains together after honoring Jacob.", "But the next section shows the brothers still carry fear about Joseph's intentions.", "Outward togetherness does not always mean inward peace is complete.", "Reconciliation may need reassurance even after major acts of unity."]),
  ],
  "Genesis 50:15-20": [
    day21Phrase("😨 Joseph's Brethren Saw That Their Father Was Dead", ["The brothers become afraid after Jacob dies.", "They wonder whether Joseph's kindness depended on their father being alive.", "This reveals that guilt still speaks inside them.", "A beginner should see that forgiveness may be given before it is fully believed.", "Old sin can keep people afraid even after mercy has been shown."]),
    day21Phrase("💭 Joseph Will Peradventure Hate Us", ["Peradventure means perhaps.", "The brothers imagine Joseph may now hate them.", "Their fear shows how hard it is for guilty hearts to trust forgiveness.", "They know what they deserve if the story were ruled by revenge.", "Grace can be difficult to believe when shame keeps writing the script."]),
    day21Phrase("⚖️ Requite Us All The Evil", ["Requite means repay.", "The brothers fear Joseph will repay evil for evil.", "They are thinking in the moral logic of revenge.", "Joseph's response will show a different way.", "God's providence has taught Joseph not to balance the scales by cruelty."]),
    day21Phrase("📨 Thy Father Did Command Before He Died", ["The brothers send a message claiming Jacob asked Joseph to forgive them.", "Whether Jacob said this exactly or the brothers shaped the message from fear, the point is clear: they are terrified.", "They appeal to their father's name because they do not feel safe in Joseph's mercy.", "A beginner should hear the anxiety underneath the words.", "Fear often reaches for any shield it can find."]),
    day21Phrase("🙏 Forgive, I Pray Thee Now", ["The brothers finally use direct forgiveness language.", "They ask Joseph to forgive their trespass and sin.", "This names the wrong more clearly than many earlier scenes did.", "The request is late, but it is important.", "Healing requires sin to be named, not merely survived."]),
    day21Phrase("😭 Joseph Wept When They Spake Unto Him", ["Joseph weeps because their fear wounds him too.", "He has already shown mercy, but they still suspect revenge.", "The tears reveal that forgiveness is personal and relational, not just a decision on paper.", "A beginner should see Joseph's tenderness here.", "Mercy grieves when it is not trusted."]),
    day21Phrase("🙇 Behold, We Be Thy Servants", ["The brothers offer themselves as servants to Joseph.", "This echoes their fear and the old dream of bowing.", "They still relate to Joseph through guilt and power imbalance.", "Joseph will answer by refusing to stand in God's place.", "Forgiveness does not need to keep the forgiven person permanently crushed."]),
    day21Phrase("☝️ Am I In The Place Of God?", ["Joseph refuses to act as ultimate judge over his brothers.", "This is one of the clearest statements of humility in Genesis.", "He has power, but he will not use it as if he were God.", "A beginner should see the difference between authority and divine vengeance.", "Joseph's fear of God restrains revenge."]),
    day21Phrase("🧠 Ye Thought Evil Against Me", ["Joseph names their intention honestly.", "He does not pretend the brothers meant well.", "Forgiveness does not rewrite evil as good.", "This line protects the moral truth of the story.", "Real mercy can tell the truth about harm."]),
    day21Phrase("🙌 But God Meant It Unto Good", ["This is the theological center of Joseph's story.", "The brothers meant evil, but God ruled over the story for good.", "This does not excuse their sin; it magnifies God's providence.", "A beginner should hold both truths together.", "God can bring good out of evil without becoming the author of evil."]),
    day21Phrase("🛟 To Save Much People Alive", ["Joseph explains the good God intended: preserving many lives.", "His suffering became part of a rescue larger than his own family.", "Egypt, Canaan, and Israel's future were all affected.", "This phrase shows why Joseph can release revenge.", "God's saving purpose became bigger than Joseph's pain."]),
  ],
  "Genesis 50:21-21": [
    day21Phrase("😌 Fear Ye Not", ["Joseph repeats comfort to his brothers.", "They are still afraid, so he meets fear with reassurance.", "This phrase shows forgiveness speaking directly to anxiety.", "A beginner should notice Joseph does not shame them for needing comfort.", "Mercy can be patient with frightened hearts."]),
    day21Phrase("🍞 I Will Nourish You", ["Joseph promises to provide for his brothers.", "He does not merely say he will avoid revenge.", "He commits to sustaining them and their families.", "Forgiveness becomes practical care.", "Real mercy feeds people it has the power to punish."]),
    day21Phrase("👶 And Your Little Ones", ["Joseph includes the children in his promise of provision.", "The brothers' families will be safe under his care.", "This matters because famine and fear affect the next generation too.", "Joseph's mercy reaches beyond the guilty brothers to their households.", "Grace can protect children from the full fallout of their fathers' sins."]),
    day21Phrase("💬 He Comforted Them", ["Joseph comforts the brothers after their fear comes out.", "Comfort here is not shallow positivity.", "It is reassurance grounded in God's providence and Joseph's mercy.", "A beginner should see that forgiveness may need words repeated.", "Healing often includes patient conversation."]),
    day21Phrase("❤️ Spake Kindly Unto Them", ["Joseph speaks kindly to the brothers who sold him.", "Kind speech is part of the evidence that revenge does not rule him.", "The phrase means he speaks to their heart with tenderness.", "This is a beautiful closing note to the family conflict.", "God's grace can make a wounded person speak peace instead of poison."]),
  ],
  "Genesis 50:22-26": [
    day21Phrase("🏠 Joseph Dwelt In Egypt", ["Joseph remains in Egypt with his father's house.", "Genesis ends with the family preserved in Egypt, not yet returned to Canaan.", "This sets up the situation for Exodus.", "A beginner should see the story is not finished just because Genesis is ending.", "God's promise is still moving while His people live in a foreign land."]),
    day21Phrase("⏳ Joseph Lived An Hundred And Ten Years", ["Joseph lives 110 years, a full and honored lifespan in Egypt.", "His life stretches from beloved son to slave, prisoner, ruler, provider, and elder.", "The number closes a long arc of suffering and faithfulness.", "A beginner should feel the breadth of God's keeping.", "Joseph's life is a testimony that God can carry a person through many seasons."]),
    day21Phrase("👶 Ephraim's Children Of The Third Generation", ["Joseph sees descendants from Ephraim's line to the third generation.", "This shows fruitfulness continuing after Jacob's blessing.", "The family promise is not ending with Joseph.", "Children and grandchildren are visible signs that God is multiplying the family.", "Fruitfulness outlives the first rescue."]),
    day21Phrase("👶 The Children Also Of Machir", ["Joseph also sees descendants through Manasseh's line.", "Machir's children are named to show Manasseh's growth.", "This matters after Genesis 48, where Manasseh was blessed even though Ephraim was set before him.", "God did not forget the older son.", "Both branches of Joseph's house bear fruit."]),
    day21Phrase("🤲 Brought Up Upon Joseph's Knees", ["This phrase likely means Joseph received these children as his own descendants with affection and recognition.", "It is a tender family image near the end of his life.", "The once-separated son now sees generations on his knees.", "A beginner should feel the restoration: Joseph was cut off from family, but God surrounded him with descendants.", "God can answer isolation with generational joy."]),
    day21Phrase("🙌 God Will Surely Visit You", ["Joseph tells his brothers God will surely visit them.", "Visit here means God will come to act for them, not merely stop by.", "Joseph knows Egypt is not the final destination.", "This line points forward to Exodus, when God hears Israel's cry and delivers them.", "Genesis ends with hope aimed at future rescue."]),
    day21Phrase("🏞️ Bring You Out Of This Land", ["Joseph says God will bring the family out of Egypt.", "This is crucial because Genesis ends with Israel still in Egypt.", "Joseph's faith looks beyond his lifetime to God's promised land.", "A beginner should see that Exodus is already being anticipated.", "God's people may be in Egypt, but God's promise is still Canaan."]),
    day21Phrase("🤝 Joseph Took An Oath", ["Joseph makes the children of Israel swear about his bones.", "Like Jacob, Joseph uses an oath to keep the promise land in view.", "He does not want his burial to say Egypt is the end of the story.", "The oath turns his death into a future signpost.", "Faith can give instructions that outlive the person speaking."]),
    day21Phrase("⚰️ Ye Shall Carry Up My Bones From Hence", ["Joseph asks that his bones be carried out when God brings Israel back to the land.", "This is one of the strongest acts of faith at the end of Genesis.", "He dies in Egypt but refuses to make Egypt his final hope.", "Later, Moses will carry Joseph's bones during the Exodus.", "A coffin in Egypt becomes a witness that God is not done."]),
    day21Phrase("📦 He Was Put In A Coffin In Egypt", ["Genesis ends with Joseph in a coffin in Egypt.", "That ending is sober and unfinished on purpose.", "The promise is alive, but the people are not yet home.", "A beginner should feel the tension: death is real, Egypt is real, but God's word is still waiting to be fulfilled.", "Genesis closes with hope inside a coffin, pointing forward to deliverance."]),
  ],
};

function deepenDay21PhraseCards(section: PersonalGenesisPhraseSectionInput): PersonalGenesisPhraseSectionInput {
  return {
    ...section,
    phrases: DAY_21_REAL_PHRASE_REPLACEMENTS[section.reference] ?? section.phrases,
  };
}

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
    "This is why the phrase is worth slowing down over.",
    "It helps explain what God is doing in the middle of famine, fear, family guilt, and blessing.",
    "🧭 Story movement",
    "👥 Family pressure",
    "🙌 God's providence",
    "Genesis is not asking the reader to memorize a random detail.",
    "It is helping us see how the promise keeps moving.",
  ]);
}

function makeBeginnerGenesisPhrase(title: string, section: PersonalGenesisPhraseSectionInput, focus: string): [string, string] {
  return phrase(title, [
    `This card slows down ${section.reference} so the scene is easier to follow.`,
    focus,
    "A beginner may not know the family history behind this moment yet.",
    "Joseph's later story is full of dreams, famine, fear, testing, tears, and blessing.",
    "🌾 Famine",
    "👁️ Recognition",
    "🧪 Testing",
    "🤲 Blessing",
    `In ${section.title}, Genesis is helping the reader understand the next step without getting lost.`,
    "The small detail is there because the family promise is still moving.",
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
).map(deepenDay21PhraseCards);

export const GENESIS_41_50_PERSONAL_SECTIONS = formatGenesisFortyOneToFiftySectionExplanations(
  addGenesisFortyOneToFiftySectionTexture(
    [
      ...DAY_17_GENESIS_41_42_FINAL_SECTIONS.map(deepenDay17PhraseCards).map(dedupeGenesisFortyOneToFortyEightSections),
      ...DAY_18_GENESIS_43_44_FINAL_SECTIONS.map(deepenDay18PhraseCards).map(dedupeGenesisFortyOneToFortyEightSections),
      ...DAY_19_GENESIS_45_46_FINAL_SECTIONS.map(deepenDay19PhraseCards).map(dedupeGenesisFortyOneToFortyEightSections),
      ...DAY_20_GENESIS_47_48_FINAL_SECTIONS.map(deepenDay20PhraseCards).map(dedupeGenesisFortyOneToFortyEightSections),
      ...DAY_21_GENESIS_49_50_FINAL_SECTIONS,
      ...expandSplitSections(RAW_GENESIS_41_50_PERSONAL_SECTIONS.filter((section) => section.chapter < 41 || section.chapter > 50)),
    ].map((section) => (section.chapter > 50 ? ensureBeginnerGenesisPhraseDepth(section) : section)),
  ),
);
