import { writeFileSync } from "fs";
import type { PersonalLeviticusPhraseSectionInput } from "../lib/leviticusOneToTenPersonalNotes";
import {
  FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS,
  SECOND_CHRONICLES_1_19_PERSONAL_SECTIONS,
} from "../lib/chroniclesPersonalNotes";

type ChroniclesPhraseSectionInput = PersonalLeviticusPhraseSectionInput & {
  book: "1 Chronicles" | "2 Chronicles";
};

const emojiPattern = /^\p{Extended_Pictographic}(?:\uFE0F)?\s+/u;
const sectionIcons = [
  "📜",
  "🏠",
  "🕍",
  "👑",
  "🛡️",
  "🙏",
  "🔥",
  "🏙️",
  "⚠️",
  "💛",
  "🗡️",
  "📍",
  "🧠",
  "😢",
  "✨",
  "📦",
  "🚶",
  "👀",
  "📅",
  "⚖️",
  "🔎",
  "💬",
  "🕊️",
  "⛰️",
  "🌿",
  "🧱",
  "📖",
  "🔑",
  "🏛️",
  "🎺",
  "🪔",
  "💧",
];
const phraseIcons = ["✨", "📜", "🏠", "👑", "🛡️", "🙏", "🔥", "🏙️", "⚠️", "💛", "🗡️", "📍", "🧠", "😢", "🔑", "🏛️", "🎺", "🪔", "💧", "👀"];

function stripIcon(value: string) {
  return value.replace(emojiPattern, "").replace(/\s+\d+$/g, "").trim();
}

function titleCase(value: string) {
  const small = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
  return value
    .replace(/[.,;:!?]+$/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (word === "LORD") return "LORD";
      if (index > 0 && small.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function phraseKey(value: string) {
  return stripIcon(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isWeakPhrase(title: string) {
  const clean = stripIcon(title);
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length < 3) return true;
  if (/^(of|to|and|or|but|that|which|who|for|with)\b/i.test(clean)) return true;
  if (/\b(and|of|to|with|that|which|who|for|the|between)$/i.test(clean)) return true;
  return false;
}

function phraseIcon(title: string, usedIcons: Set<string>, index: number) {
  const t = title.toLowerCase();
  const preferred =
    t.includes("lord") || t.includes("god")
      ? "🙏"
      : t.includes("king") || t.includes("david") || t.includes("saul") || t.includes("reign")
        ? "👑"
        : t.includes("levite") || t.includes("priest") || t.includes("temple") || t.includes("house of god")
          ? "🕍"
          : t.includes("gate") || t.includes("porter") || t.includes("chamber")
            ? "🏛️"
            : t.includes("mighty") || t.includes("spear") || t.includes("shield") || t.includes("bow") || t.includes("battle")
              ? "🛡️"
              : t.includes("genealog") || t.includes("son of") || t.includes("brethren") || t.includes("family")
                ? "🏠"
                : t.includes("captain") || t.includes("chief")
                  ? "🎺"
                  : t.includes("spirit")
                    ? "🔥"
                    : phraseIcons[index % phraseIcons.length];

  if (!usedIcons.has(preferred)) return preferred;
  return phraseIcons.find((candidate) => !usedIcons.has(candidate)) || preferred;
}

function explain(title: string, chapter: number) {
  const t = title.toLowerCase();

  if (t.includes("lord") || t.includes("god")) {
    return [
      `${title} puts the LORD at the center of the phrase.`,
      "Chronicles is not only preserving names and battles. It is showing that God's presence, word, and judgment guide the story.",
      "",
      "🙏 God is present",
      "📜 His word matters",
      "🔑 His purpose continues",
      "",
      "The phrase helps the reader look for what God is doing in the middle of the history.",
    ].join("\n\n");
  }

  if (t.includes("villages") || t.includes("possessions") || t.includes("cities") || t.includes("jerusalem") || t.includes("millo")) {
    return [
      `${title} connects the people to real places.`,
      "Chronicles is showing homes, cities, and possessions because restoration is not vague. God's people are being located again.",
      "",
      "🏠 Homes and possessions",
      "🏙️ Cities remembered",
      "📍 A people with a place",
      "",
      "The phrase helps the reader see that God's restoration touches ordinary life and real communities.",
    ].join("\n\n");
  }

  if (t.includes("firstborn") || t.includes("begat") || t.includes("six sons") || t.includes("whose names") || t.includes("his son") || t.includes("brother of")) {
    return [
      `${title} is family-line language.`,
      "Chronicles traces families because God's story is carried through real generations, not forgotten crowds.",
      "",
      "🏠 Family line",
      "📜 Names preserved",
      "🔑 Covenant memory",
      "",
      "The phrase helps the reader see that every name belongs inside the remembered people of God.",
    ].join("\n\n");
  }

  if (t.includes("philistines") || t.includes("fought") || t.includes("fled") || t.includes("slain") || t.includes("strip the slain")) {
    return [
      `${title} is battle language.`,
      "The phrase shows the danger and defeat surrounding Saul's final days.",
      "",
      "🗡️ Battle",
      "😢 Loss",
      "⚠️ Israel under pressure",
      "",
      "The phrase helps the reader feel the seriousness of Saul's collapse and the need for faithful leadership.",
    ].join("\n\n");
  }

  if (t.includes("bone and thy flesh")) {
    return [
      `${title} means the people recognize kinship with David.`,
      "They are saying David is not a stranger to them. He belongs to them, and they belong with him.",
      "",
      "🏠 Shared family",
      "👑 David received",
      "🤝 Unity forming",
      "",
      "The phrase helps the reader understand why David's kingship is welcomed by the tribes.",
    ].join("\n\n");
  }

  if (t.includes("time past") || t.includes("wentest out") || t.includes("broughtest in")) {
    return [
      `${title} looks back at David's earlier leadership.`,
      "Before David officially ruled, the people had already seen him lead, fight, and care for Israel.",
      "",
      "📅 Past faithfulness",
      "👑 Proven leadership",
      "🛡️ Israel protected",
      "",
      "The phrase helps the reader see that David's rule is connected to a history of faithful service.",
    ].join("\n\n");
  }

  if (t.includes("built the city") || t.includes("delivered it") || t.includes("parcel")) {
    return [
      `${title} describes taking responsibility for the land and city.`,
      "Chronicles shows David's kingdom being strengthened through courage, rebuilding, and defense.",
      "",
      "🏙️ City strengthened",
      "🛡️ Land defended",
      "👑 Kingdom established",
      "",
      "The phrase helps the reader see David's rule becoming visible in real places.",
    ].join("\n\n");
  }

  if (t.includes("my god forbid") || t.includes("do this thing")) {
    return [
      `${title} shows David refusing to treat sacrifice lightly.`,
      "David will not drink the water because the men risked their lives to get it.",
      "",
      "🙏 Reverence for God",
      "🩸 Lives risked",
      "👑 A king with conviction",
      "",
      "The phrase helps the reader see David honoring courage instead of using it selfishly.",
    ].join("\n\n");
  }

  if (t.includes("chief of the three") || t.includes("honourable among the thirty") || t.includes("first three") || t.includes("valiant men")) {
    return [
      `${title} describes rank and honor among David's warriors.`,
      "Chronicles is showing that David was surrounded by courageous people with different levels of responsibility.",
      "",
      "🛡️ Courage recognized",
      "🎺 Leadership rank",
      "👑 David's kingdom supported",
      "",
      "The phrase helps the reader see that the kingdom was strengthened by faithful people serving in their place.",
    ].join("\n\n");
  }

  if (t.includes("reckoned by genealogies") || t.includes("genealogies")) {
    return [
      `${title} means the people were counted by family lines.`,
      "Chronicles is showing that Israel's identity did not disappear after exile, failure, and judgment.",
      "",
      "📜 Names remembered",
      "🏠 Families traced",
      "🔑 Identity preserved",
      "",
      "The phrase helps the reader see that God still knows His people by name and by family.",
    ].join("\n\n");
  }

  if (t.includes("book of the kings")) {
    return [
      `${title} points to a written record of Israel's history.`,
      "The phrase shows that Chronicles is looking back carefully at the kingdom story, not inventing a new one.",
      "",
      "📜 Written memory",
      "👑 Kings remembered",
      "⚖️ History under God's eye",
      "",
      "The phrase helps the reader understand that Israel's past is being preserved for instruction.",
    ].join("\n\n");
  }

  if (t.includes("first inhabitants") || t.includes("dwelt in their possessions") || t.includes("cities")) {
    return [
      `${title} describes people returning to real homes and places.`,
      "Chronicles is not only listing names. It is showing God's people being connected again to land, cities, and inheritance.",
      "",
      "🏠 Homes restored",
      "🏙️ Cities named",
      "📍 Belonging after exile",
      "",
      "The phrase helps the reader see restoration as something practical, not only spiritual.",
    ].join("\n\n");
  }

  if (t.includes("nethinims")) {
    return [
      `${title} refers to temple servants.`,
      "The Nethinims helped with work connected to the house of God. Their mention shows that worship needed many kinds of faithful service.",
      "",
      "🕍 Temple service",
      "🧹 Humble work",
      "🙏 Worship supported",
      "",
      "The phrase helps the reader see that even quiet service matters in God's house.",
    ].join("\n\n");
  }

  if (t.includes("sons of") || t.includes("son of") || t.includes("brethren") || t.includes("house of their fathers")) {
    return [
      `${title} traces family identity.`,
      "In Chronicles, family lines remind the reader that God's promises move through real people and real generations.",
      "",
      "🏠 Family line",
      "📜 Names preserved",
      "🔑 Covenant memory",
      "",
      "The phrase helps the reader follow where each person belongs in the restored people of God.",
    ].join("\n\n");
  }

  if (t.includes("levites") || t.includes("priests") || t.includes("house of god") || t.includes("work of the service")) {
    return [
      `${title} is worship-service language.`,
      "These people had responsibilities connected to the worship of the LORD and the care of His house.",
      "",
      "🕍 Temple service",
      "🙏 Worship ordered",
      "📜 Holy responsibility",
      "",
      "The phrase helps the reader see that worship in Chronicles is careful, organized, and centered on God.",
    ].join("\n\n");
  }

  if (t.includes("porters") || t.includes("gate") || t.includes("chambers") || t.includes("wards")) {
    return [
      `${title} describes guarding and serving at the entrances of God's house.`,
      "Gatekeepers protected access, order, and holiness around the place of worship.",
      "",
      "🏛️ Gates watched",
      "🛡️ Holy order protected",
      "🙏 Worship treated seriously",
      "",
      "The phrase helps the reader understand that even doorways mattered when God's house was being honored.",
    ].join("\n\n");
  }

  if (t.includes("david") || t.includes("saul") || t.includes("king")) {
    return [
      `${title} brings royal leadership into view.`,
      "Chronicles cares about kings because leadership shapes worship, obedience, courage, and the direction of the people.",
      "",
      "👑 Leadership",
      "🏠 The royal line",
      "⚖️ Responsibility before God",
      "",
      "The phrase helps the reader watch whether power is being used faithfully or selfishly.",
    ].join("\n\n");
  }

  if (t.includes("mighty") || t.includes("valour") || t.includes("spear") || t.includes("shield") || t.includes("bow") || t.includes("battle")) {
    return [
      `${title} is strength and battle language.`,
      "Chronicles is showing that David's kingdom was supported by real courage, skill, and loyalty.",
      "",
      "🛡️ Courage",
      "🗡️ Skill in battle",
      "👑 Loyalty to the king",
      "",
      "The phrase helps the reader see that strength is being gathered around the king God is raising up.",
    ].join("\n\n");
  }

  if (t.includes("came to david") || t.includes("ziklag") || t.includes("kept himself close")) {
    return [
      `${title} shows people joining David before his rule looked secure.`,
      "David was still under pressure from Saul, yet men were choosing to stand with him.",
      "",
      "🚶 Coming to David",
      "⚠️ Risk under Saul",
      "👑 Loyalty before the throne",
      "",
      "The phrase helps the reader see faithfulness before success is obvious.",
    ].join("\n\n");
  }

  if (t.includes("spirit came upon")) {
    return [
      `${title} means God's Spirit moved someone to speak and act rightly.`,
      "This is not ordinary courage only. The Spirit is helping God's people recognize David's place in the story.",
      "",
      "🔥 God's Spirit",
      "💬 Words of loyalty",
      "👑 David received",
      "",
      "The phrase helps the reader see that David's support is not merely political. God is guiding the moment.",
    ].join("\n\n");
  }

  if (t.includes("peace") || t.includes("help thee")) {
    return [
      `${title} is loyalty and blessing language.`,
      "The speaker is not only greeting David. He is declaring support and peace toward the one God is raising up.",
      "",
      "🕊️ Peace spoken",
      "🤝 Loyalty offered",
      "👑 David strengthened",
      "",
      "The phrase helps the reader hear a pledge of support, not casual words.",
    ].join("\n\n");
  }

  return [
    `${title} belongs to Chronicles' careful memory of God's people.`,
    "The phrase gives a name, action, place, role, or relationship that helps rebuild the story after exile.",
    "",
    "📖 The Bible's wording",
    "🔎 One part of the record",
    "🧠 Clearer understanding",
      "",
    `The phrase helps the reader follow 1 Chronicles ${chapter} as a remembered record of God's people.`,
  ].join("\n\n");
}

function repairSection(section: ChroniclesPhraseSectionInput, sectionIconIndex: number): ChroniclesPhraseSectionInput {
  const usedIcons = new Set<string>();
  const usedTitles = new Set<string>();
  const phrases = section.phrases.map((phrase, index) => {
    const rawTitle = stripIcon(phrase[0]);
    const cleanRawTitle = titleCase(rawTitle);
    const sectionTitle = titleCase(section.title);
    const title = isWeakPhrase(cleanRawTitle) || usedTitles.has(phraseKey(cleanRawTitle)) ? sectionTitle : cleanRawTitle;
    const dedupedTitle = usedTitles.has(phraseKey(title)) ? cleanRawTitle : title;
    const icon = phraseIcon(dedupedTitle, usedIcons, index);
    usedIcons.add(icon);
    usedTitles.add(phraseKey(dedupedTitle));
    return [`${icon} ${dedupedTitle}`, explain(dedupedTitle, section.chapter)] as [string, string];
  });

  return {
    ...section,
    icon: sectionIcons[sectionIconIndex % sectionIcons.length],
    phrases,
  };
}

let day96SectionIndex = 0;
const sections = [
  ...FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS.map((section) => {
    if (section.chapter < 9 || section.chapter > 12) return section;
    return repairSection(section, day96SectionIndex++);
  }),
  ...SECOND_CHRONICLES_1_19_PERSONAL_SECTIONS,
] as const satisfies readonly ChroniclesPhraseSectionInput[];

const file = `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type ChroniclesPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "1 Chronicles" | "2 Chronicles" };

const sections = ${JSON.stringify(sections, null, 2).replace(/"([^"]+)":/g, "$1:")} as const satisfies readonly ChroniclesPhraseSectionInput[];

export const FIRST_CHRONICLES_9_29_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Chronicles");
export const SECOND_CHRONICLES_1_19_PERSONAL_SECTIONS = sections.filter((section) => section.book === "2 Chronicles");
`;

writeFileSync("lib/chroniclesPersonalNotes.ts", file);
