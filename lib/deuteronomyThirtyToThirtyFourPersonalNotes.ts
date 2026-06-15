import { DEUTERONOMY_DEEP_NOTES } from "./deuteronomyDeepNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type PersonalPhrase = [string, string];
type PersonalSection = PersonalLeviticusPhraseSectionInput;

const note = (lines: string[]) => lines.join("\n\n");

const supplementalDeuteronomyThirtyFourSections: PersonalLeviticusPhraseSectionInput[] = [
  {
    chapter: 34,
    startVerse: 7,
    endVerse: 7,
    reference: "Deuteronomy 34:7",
    title: "🕯️ Moses Was An Hundred And Twenty Years Old",
    icon: "🕯️",
    phrases: [
      ["🕯️ Moses Was An Hundred And Twenty Years Old", note(["Moses' age shows the end of a long, faithful life under God's calling.", "The verse does not make Moses seem weak or forgotten. It shows that his death comes at the end of a complete assignment.", "📆 A full lifetime is shown", "🏔️ His work reaches its final edge", "🕊️ God remains faithful after Moses", "➡️ Israel must continue forward", "The phrase lets the reader feel the weight of transition without thinking God's promise ended with Moses."])],
      ["👁️ His Eye Was Not Dim", note(["Moses is not described as fading away in confusion.", "His sight remains clear, which makes his death feel less like collapse and more like God's appointed closing of his ministry.", "👁️ Clarity remains", "💪 Strength is still present", "⏳ The ending is appointed", "📜 The promise moves beyond him", "Moses' death is not a failure of strength. It is the close of his role before Israel enters the land."])],
      ["💪 Nor His Natural Force Abated", note(["Moses still has strength when his life ends.", "That detail keeps the reader from thinking he dies because he simply wore out. The chapter is showing God's timing.", "💪 Strength had not disappeared", "🕯️ His calling had reached its end", "🏔️ He sees the land but does not enter", "👣 Joshua will lead next", "The transition is sharp: the LORD, not human weakness, decides the next step."])],
      ["🏔️ When He Died", note(["Moses dies before Israel crosses into Canaan.", "This phrase is painful because the leader who carried Israel through the wilderness does not personally enter the land.", "🏜️ The wilderness journey closes", "📜 God's word stands", "🕊️ The promise continues", "➡️ Joshua must lead Israel forward", "The death of Moses teaches that God's mission is bigger than one servant, even a servant as great as Moses."])],
    ],
  },
  {
    chapter: 34,
    startVerse: 8,
    endVerse: 8,
    reference: "Deuteronomy 34:8",
    title: "😭 The Children Of Israel Wept For Moses",
    icon: "😭",
    phrases: [
      ["😭 The Children Of Israel Wept For Moses", note(["Israel's grief shows that Moses was not only a public leader.", "He had carried the people, pleaded for them, taught them, corrected them, and stood between them and judgment.", "😭 The nation mourns", "👤 The leader is gone", "📜 His teaching remains", "➡️ The journey must continue", "The reader should pause and feel the cost of the transition before Joshua steps forward."])],
      ["🏜️ In The Plains Of Moab", note(["The plains of Moab are the waiting place before Canaan.", "Israel mourns Moses on the edge of the promise, not back in Egypt and not yet inside the land.", "🏜️ The wilderness road is ending", "🏞️ Canaan is near", "😭 Moses is mourned", "👣 Israel is about to move", "The location matters because grief and hope stand side by side in this chapter."])],
      ["📆 Thirty Days", note(["Thirty days marks a full period of national mourning.", "Israel does not rush past Moses' death. The people stop long enough to honor the servant God used.", "📆 Grief is given time", "👥 The whole people mourn", "🕊️ Honor is shown", "➡️ A new season waits", "The phrase shows ordered grief: Israel mourns deeply, but mourning will not become permanent paralysis."])],
      ["🕊️ Were Ended", note(["The mourning has a real ending.", "That does not mean Moses is forgotten. It means Israel must receive Joshua's leadership and keep walking toward the promise.", "😭 Grief was real", "📆 Mourning had a limit", "👣 Obedience must continue", "🏞️ The land still waits", "The phrase prepares the reader for movement after loss."])],
    ],
  },
  {
    chapter: 34,
    startVerse: 9,
    endVerse: 9,
    reference: "Deuteronomy 34:9",
    title: "🧠 Full Of The Spirit Of Wisdom",
    icon: "🧠",
    phrases: [
      ["🧠 Full Of The Spirit Of Wisdom", note(["Joshua is not stepping into leadership with mere confidence.", "Wisdom from God is marking him for the work Moses can no longer do.", "🧠 Wisdom is needed", "🕊️ God supplies it", "👣 Leadership continues", "📜 Israel must obey", "The new leader is equipped by God, not only chosen by people."])],
      ["✋ Moses Had Laid His Hands Upon Him", note(["Moses laying hands on Joshua shows public transfer of leadership.", "Israel can see that Joshua is not forcing himself into Moses' place. He has been appointed for it.", "✋ Leadership is passed on", "👤 Joshua is recognized", "📜 Moses' role is honored", "➡️ The mission continues", "The phrase explains why Israel should now listen to Joshua."])],
      ["👂 The Children Of Israel Hearkened Unto Him", note(["Israel responds by listening to Joshua.", "This matters because leadership transition only works if the people receive the leader God has raised up.", "👂 They listen", "👣 They follow", "🧠 Wisdom guides the next step", "🏞️ The land is still ahead", "Israel begins moving from Moses' leadership to Joshua's leadership."])],
      ["📜 As The LORD Commanded Moses", note(["Joshua's leadership is tied to what the LORD had already commanded through Moses.", "This keeps the transition from becoming a new religion or a new direction.", "📜 God's command remains", "👤 Moses' teaching continues", "🧭 Joshua leads under the same LORD", "🏞️ Israel enters the promise by obedience", "The servant changes, but the LORD's word does not."])],
    ],
  },
];

const generatedDeuteronomyThirtyToThirtyFourPersonalSections = buildGeneratedPersonalSections({
  book: "Deuteronomy",
  notes: DEUTERONOMY_DEEP_NOTES,
  chapters: [30, 31, 32, 33, 34],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Thy God",
    "That Thou And Thy Seed May Live",
    "This Commandment Which I Command Thee This Day",
    "Set Your Hearts Unto All The Words",
    "The Blessing Wherewith Moses The Man Of God Blessed",
    "Moses The Servant Of The LORD",
    "The Eternal God Is Thy Refuge",
    "The LORD Came From Sinai",
    "Let Reuben Live And Not Die",
    "Blessed Of The LORD Be His Land",
    "As Thy Days So Shall Thy Strength Be",
    "Thine Enemies Shall Be Found Liars Unto Thee",
  ],
});

function stripLeadingEmoji(value: string) {
  return value.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function getMeaning(title: string, section: { reference: string }) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/choose life|life and good|death and evil|that thou and thy seed may live|love the lord|cleave unto him/.test(lower)) {
    return ["Moses is pressing Israel to choose covenant life with the LORD.", "Life is not bare survival; it means loving God, listening to Him, and walking in His ways."];
  }
  if (/commandment|not hidden|not far off|mouth|heart|do it|words of this law/.test(lower)) {
    return ["God's command is being placed close enough for Israel to obey.", "Moses does not describe obedience as mysterious or unreachable, but as a real response to God's revealed word."];
  }
  if (/joshua|be strong|good courage|go with thee|not fail thee|not forsake thee/.test(lower)) {
    return ["Joshua is being strengthened for leadership after Moses.", "The courage command rests on the LORD's presence, not on Joshua's personality or military skill."];
  }
  if (/song|witness|heaven|earth|set your hearts|teach it|children/.test(lower)) {
    return ["Moses uses song and witnesses to make Israel remember God's words.", "The people must carry the warning into future generations instead of treating it as a momentary speech."];
  }
  if (/rock|eagle|jeshurun|provoked|strange gods|vengeance|recompence/.test(lower)) {
    return ["The song describes the LORD's faithfulness and Israel's danger of rebellion.", "Its images teach that God is steady, just, and merciful while His people are often forgetful."];
  }
  if (/blessing|moses the man of god|reuben|judah|levi|benjamin|joseph|zebulun|gad|dan|naphtali|asher/.test(lower)) {
    return ["Moses blesses the tribes before his death.", "The blessings look over Israel's future and place each tribe under the care and rule of the LORD."];
  }
  if (/eternal god|refuge|everlasting arms|happy art thou|saved by the lord|shield|sword/.test(lower)) {
    return ["Israel's safety is found in the eternal God.", "Moses ends by pointing beyond himself to the LORD who carries, protects, and saves His people."];
  }
  if (/moses|hundred and twenty|eye was not dim|natural force|died|wept|thirty days|spirit of wisdom|laid his hands/.test(lower)) {
    return ["Moses' ministry is closing while God's promise continues.", "The chapter honors Moses without making Israel's future depend on Moses being present."];
  }

  return ["Moses is giving Israel final covenant instruction before the transition to Joshua.", `In ${section.reference}, the people are being taught to remember the LORD, obey His word, and trust Him beyond Moses' lifetime.`];
}

function getBullets(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/choose life|life and good|death and evil|love the lord|cleave/.test(lower)) return ["✅ Life is tied to the LORD", "❤️ Love must become obedience", "⚠️ Rebellion leads toward death"];
  if (/commandment|not hidden|not far off|mouth|heart/.test(lower)) return ["📜 God's word is near", "🗣️ The mouth must confess it", "❤️ The heart must receive it"];
  if (/joshua|be strong|good courage|not fail|not forsake/.test(lower)) return ["💪 Courage has a reason", "🤝 The LORD stays with His servant", "➡️ Leadership moves forward"];
  if (/song|witness|heaven|earth|children|set your hearts/.test(lower)) return ["🎶 The song teaches memory", "👂 Israel must listen deeply", "👨‍👩‍👧 The next generation must learn"];
  if (/rock|eagle|jeshurun|strange gods|vengeance/.test(lower)) return ["🪨 The LORD is steady", "🦅 He carried Israel with care", "💔 Idolatry betrays His mercy"];
  if (/blessing|reuben|judah|levi|benjamin|joseph|zebulun|gad|dan|naphtali|asher/.test(lower)) return ["🙌 The tribes are blessed before God", "🏞️ Each inheritance has a future", "👑 The LORD rules over Israel"];
  if (/eternal god|refuge|arms|shield|sword|saved/.test(lower)) return ["🛡️ God is Israel's refuge", "💪 His arms uphold His people", "🙌 Salvation belongs to the LORD"];
  if (/moses|died|wept|thirty days|wisdom|laid his hands/.test(lower)) return ["🕯️ Moses' work reaches its close", "➡️ The mission continues", "🕊️ God provides the next leader"];

  return ["📜 Final words must be remembered", "❤️ Israel must answer from the heart", "➡️ God's promise continues forward"];
}

function getTakeaway(title: string) {
  const lower = stripLeadingEmoji(title).toLowerCase();

  if (/choose life|life and good|death and evil/.test(lower)) return "Covenant choice is about life with the LORD.";
  if (/joshua|be strong|good courage/.test(lower)) return "Courage comes from God's continuing presence.";
  if (/moses|died|wept|laid his hands|wisdom/.test(lower)) return "God's work continues when one faithful servant's role ends.";
  return "Israel must receive Moses' final words as a call to faithful covenant life.";
}

function makeExplanation(section: { reference: string }, title: string) {
  const [lineOne, lineTwo] = getMeaning(title, section);
  return note([
    lineOne,
    lineTwo,
    ...getBullets(title),
    getTakeaway(title),
  ]);
}

function polishSection<T extends { phrases: string[][]; reference: string }>(section: T): T & { phrases: PersonalPhrase[] } {
  return {
    ...section,
    phrases: section.phrases.map(([title]) => [
      title,
      makeExplanation(section, title),
    ] as PersonalPhrase),
  };
}

export const DEUTERONOMY_30_34_PERSONAL_SECTIONS: PersonalSection[] = [
  ...generatedDeuteronomyThirtyToThirtyFourPersonalSections.map(polishSection),
  ...supplementalDeuteronomyThirtyFourSections.map(polishSection),
];
