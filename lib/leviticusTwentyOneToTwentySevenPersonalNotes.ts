import { LEVITICUS_DEEP_NOTES } from "./leviticusDeepNotes";
import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";
import { buildGeneratedPersonalSections } from "./bibleYearGeneratedPersonalSections";

const note = (lines: string[]) => lines.join("\n\n");
const phrase = (title: string, lines: string[]): [string, string] => [title, note(lines)];

function getCleanPhraseTitle(title: string) {
  return title.replace(/^[^A-Za-z0-9']+\s*/, "").trim();
}

function removeRepeatedPhraseHeading(title: string, line: string) {
  const cleanTitle = getCleanPhraseTitle(title);
  if (!line.toLowerCase().startsWith(cleanTitle.toLowerCase())) return line;

  const rest = line.slice(cleanTitle.length).trimStart();
  const meaning = rest.match(/^means\s+(.+)/i);
  if (meaning) return meaning[1].replace(/^./, (char) => char.toUpperCase());

  const audience = rest.match(/^identifies the audience as\s+(.+)/i);
  if (audience) return `The audience is ${audience[1]}`;

  const verb = rest.match(/^(identifies|names|limits|refers to|refers|describes|points to|points|marks|gives|forbids|connects|rejects|allows|explains|recalls|continues|introduces|places|turns|warns|seals|roots|widens|sets|begins|opens|keeps|deals with|deals|states|shows|teaches|directs|lists|repeats|starts|closes|makes|protects|locates|adds)\s+(.+)/i);
  if (verb) {
    const action = verb[1].toLowerCase();
    const object = verb[2].replace(/^./, (char) => char.toLowerCase());
    const subject =
      /forbids|warns|directs|rejects|allows|requires|commands/.test(action)
        ? "The command"
        : /names|identifies|describes|points|marks|explains|shows|teaches|locates|adds/.test(action)
          ? "The wording"
          : "This";
    return `${subject} ${action} ${object}`;
  }

  if (/^(is|are|was|were)\b/i.test(rest)) {
    return `This phrase ${rest}`;
  }

  return rest || line;
}

function tightenDay37Line(line: string) {
  return line
    .replace(/^That matters because\s+/i, "That means ")
    .replace(/^The phrase helps a reader see that\s+/i, "A reader should see that ")
    .replace(/^The phrase helps readers see that\s+/i, "A reader should see that ")
    .replace(/^The phrase helps readers understand\s+/i, "A reader should understand ")
    .replace(/^The phrase helps readers picture\s+/i, "A reader should picture ")
    .replace(/^The phrase shows that\s+/i, "This shows that ")
    .replace(/^The phrase teaches that\s+/i, "This teaches that ")
    .replace(/^The phrase reminds readers that\s+/i, "This reminds readers that ")
    .replace(/^The phrase keeps\s+/i, "This keeps ")
    .replace(/^The phrase makes\s+/i, "This makes ");
}

function titleCaseCueWord(word: string) {
  return word.replace(/^./, (char) => char.toUpperCase());
}

function getDay37FallbackCueLines(title: string) {
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter(
      (word) =>
        ![
          "the",
          "and",
          "unto",
          "shall",
          "that",
          "this",
          "with",
          "from",
          "upon",
          "there",
          "for",
          "his",
          "her",
          "him",
          "thy",
          "their",
          "they",
          "them",
          "was",
          "were",
          "be",
          "of",
          "in",
          "to",
          "a",
          "an",
        ].includes(word),
    )
    .slice(0, 3);

  const first = titleCaseCueWord(words[0] || "Phrase");
  const second = titleCaseCueWord(words[1] || "Meaning");
  const third = titleCaseCueWord(words[2] || "Response");

  return [`🔎 ${first} in view`, `🧩 ${second} in context`, `✨ ${third} before God`];
}

function getDay37CueLines(title: string) {
  const lower = title.toLowerCase();

  if (/priest|aaron|sons|high priest|anointing|garments|minister/.test(lower)) {
    return ["👑 Priestly calling", "⛺ Sanctuary service", "🍞 Holy offerings"];
  }
  if (/lord|moses|speak|spake|commanded/.test(lower)) {
    return ["📣 God speaks", "🧭 Moses receives", "👥 Israel learns"];
  }
  if (/dead|kin|baldness|beard|flesh|mourning/.test(lower)) {
    return ["⚰️ Death and grief", "👪 Family mercy", "🛡️ Holy boundaries"];
  }
  if (/wife|daughter|father|husband|married|father's house|household/.test(lower)) {
    return ["🏠 Household life", "💍 Covenant faithfulness", "✨ Public holiness"];
  }
  if (/blemish|blind|lame|vail|altar|approach|come nigh/.test(lower)) {
    return ["🧍 Visible wholeness", "🚪 Holy-space boundary", "🍞 Priest still provided for"];
  }
  if (/holy thing|holy things|profane|uncleanness|clean|ordinance|stranger eat|father's meat/.test(lower)) {
    return ["🛡️ Holy things guarded", "💧 Cleanness matters", "📛 God's name honored"];
  }
  if (/offering|oblation|vow|freewill|perfect|without blemish|bullock|lamb|goat|sheep|sacrifice|thanksgiving/.test(lower)) {
    return ["🎁 Gift brought", "🐑 Offering examined", "✅ Worship made acceptable"];
  }
  if (/egypt|brought you out|hallow|holy name|my name/.test(lower)) {
    return ["🚪 Rescue from Egypt", "📛 God's name", "🕊️ People made holy"];
  }
  if (/feast|sabbath|convocation|passover|unleavened|atonement|tabernacles|trumpets|seventh month/.test(lower)) {
    return ["📅 Sacred time", "👥 Holy gathering", "🔥 Worship before the LORD"];
  }
  if (/firstfruits|sheaf|harvest|bread|loaves|gleaning|poor|fruit of the land|boughs|booths/.test(lower)) {
    return ["🌾 Harvest received", "🙌 God honored first", "🤲 Mercy for others"];
  }
  if (/afflict your souls|from even unto even|ninth day|destroy/.test(lower)) {
    return ["💔 Humility", "🌙 Holy time", "🙏 Atonement received seriously"];
  }
  if (/oil|lamps|light|vail|testimony|evening|morning|fine flour|cakes|frankincense|rows/.test(lower)) {
    return ["🪔 Sanctuary care", "🍞 Bread before God", "📜 Steady priestly service"];
  }
  if (/blasphem|cursed|name of the lord|heard him|hands upon|stone/.test(lower)) {
    return ["📛 God's name", "👂 Public witness", "⚖️ Serious judgment"];
  }
  if (/killeth|beast|eye for eye|tooth|law|stranger|blemish/.test(lower)) {
    return ["🩸 Human life", "⚖️ Measured justice", "🌍 Same law for all"];
  }

  return ["📖 Exact wording", "🧭 Local meaning", "✨ Holy life before God"];
}

function getDay37CueBlock(title: string) {
  const cleanTitle = getCleanPhraseTitle(title);
  const cueLines = getDay37CueLines(cleanTitle);
  const usableCueLines = cueLines.some((line) => /Exact wording|Local meaning|Holy life before God/.test(line))
    ? getDay37FallbackCueLines(cleanTitle)
    : cueLines;

  return usableCueLines.join("\n");
}

const explain = (title: string, lines: string[]) =>
  phrase(
    title,
    [
      ...lines
        .map((line, index) => tightenDay37Line(index === 0 ? removeRepeatedPhraseHeading(title, line) : line))
        .filter(Boolean)
        .slice(0, 2),
      getDay37CueBlock(title),
      ...lines
        .map((line, index) => tightenDay37Line(index === 0 ? removeRepeatedPhraseHeading(title, line) : line))
        .filter(Boolean)
        .slice(2),
    ].filter(Boolean),
  );

const DAY_37_LEVITICUS_21_24_PERSONAL_SECTIONS: PersonalLeviticusPhraseSectionInput[] = [
  {
    chapter: 21,
    startVerse: 1,
    endVerse: 6,
    reference: "Leviticus 21:1-6",
    title: "📣 Priests Guard Holiness Near Death",
    icon: "📣",
    phrases: [
      explain("📣 And The LORD Said Unto Moses", [
        "And The LORD Said Unto Moses means this command begins with God speaking, not Moses inventing religious rules.",
        "In Leviticus, the LORD communicates His will to Israel through Moses, the covenant mediator who receives and delivers God's instruction.",
        "That matters because priestly holiness is grounded in God's voice before it is enforced by human leaders.",
      ]),
      explain("🗣️ Speak Unto The Priests The Sons Of Aaron", [
        "Speak Unto The Priests The Sons Of Aaron identifies the audience as Aaron's priestly family.",
        "Aaron was the first high priest, and his sons served as priests after him, so these instructions are for the men who represent Israel at the sanctuary.",
        "The phrase helps a reader see that priests are not just spiritual people in general; they are a specific consecrated family with holy responsibilities.",
      ]),
      explain("⚰️ There Shall None Be Defiled For The Dead", [
        "There Shall None Be Defiled For The Dead means ordinary contact with death could make a priest ritually unclean.",
        "Death is not treated casually near the sanctuary because death belongs to the brokenness God is separating His holy presence from.",
        "The rule does not mean grief is evil; it means priests serving near holy things had stricter boundaries.",
      ]),
      explain("👪 For His Kin, That Is Near Unto Him", [
        "For His Kin, That Is Near Unto Him gives a mercy-shaped exception for immediate family grief.",
        "The priest may become unclean for his closest relatives because God does not erase family love while teaching holiness.",
        "The phrase keeps the law from sounding cold: holiness is serious, but the LORD still names real human sorrow.",
      ]),
      explain("✂️ They Shall Not Make Baldness Upon Their Head", [
        "They Shall Not Make Baldness Upon Their Head forbids mourning practices that marked the body in pagan-style grief rituals.",
        "Israel's priests could mourn, but they were not to copy customs that treated death as if it had the final word.",
        "The phrase shows that even grief had to be shaped by belonging to the LORD.",
      ]),
      explain("🍞 The Offerings Of The LORD Made By Fire", [
        "The Offerings Of The LORD Made By Fire names the priestly work at the altar.",
        "The priests handle the sacrifices that Israel brings before God, so their public life must match the holiness of their task.",
        "The phrase connects personal conduct to worship service: the one who serves holy offerings must not profane holy things.",
      ]),
    ],
  },
  {
    chapter: 21,
    startVerse: 7,
    endVerse: 9,
    reference: "Leviticus 21:7-9",
    title: "💍 Priestly Households Must Honor Holiness",
    icon: "💍",
    phrases: [
      explain("💍 They Shall Not Take A Wife That Is A Whore", [
        "They Shall Not Take A Wife That Is A Whore limits priestly marriage because the priest's household is tied to his public holiness.",
        "The point is not that priests are too good for ordinary people; the point is that those who serve near the altar must not treat covenant faithfulness lightly.",
        "Marriage becomes part of the priest's witness before Israel.",
      ]),
      explain("🛡️ Her That Is Put Away From Her Husband", [
        "Her That Is Put Away From Her Husband refers to a divorced woman in this priestly marriage rule.",
        "The law is dealing with the public order of the priest's household, not giving a full teaching on every wounded marriage situation.",
        "The phrase helps readers see that priestly service carried stricter visible boundaries than ordinary Israelite life.",
      ]),
      explain("✨ Holy Unto His God", [
        "Holy Unto His God means the priest belongs to God in a set-apart way.",
        "Holy does not mean distant or proud; it means marked off for the LORD's service.",
        "This phrase is the center of the section because the priest's family choices are tied to the God he serves.",
      ]),
      explain("🍞 He Offereth The Bread Of Thy God", [
        "He Offereth The Bread Of Thy God means the priest presents the food-offerings that belong to God.",
        "Bread here points to the altar portions and holy food connected to worship, not only a normal meal.",
        "The phrase explains why the priest is held to a high standard: he stands close to holy provision.",
      ]),
      explain("🔥 She Profaneth Her Father", [
        "She Profaneth Her Father means the daughter's public rebellion brings shame on the priestly household.",
        "The verse is severe because the priest's family represents holy service before the people.",
        "The phrase shows how seriously Leviticus treats the connection between public worship and household life.",
      ]),
    ],
  },
  {
    chapter: 21,
    startVerse: 10,
    endVerse: 15,
    reference: "Leviticus 21:10-15",
    title: "👑 The High Priest Carries Greater Consecration",
    icon: "👑",
    phrases: [
      explain("👑 He That Is The High Priest Among His Brethren", [
        "He That Is The High Priest Among His Brethren names the priest with the greatest sanctuary responsibility.",
        "He is still among his brothers, but he carries a role that places him nearest the most holy service.",
        "The phrase helps readers understand why the next rules are stricter than the rules for ordinary priests.",
      ]),
      explain("🫒 Upon Whose Head The Anointing Oil Was Poured", [
        "Upon Whose Head The Anointing Oil Was Poured points to the ceremony that marked the high priest for service.",
        "Anointing oil was not perfume for status; it was a visible sign that he had been set apart by God's command.",
        "The phrase explains why his body, grief, and household are treated as belonging to holy service.",
      ]),
      explain("👕 Consecrated To Put On The Garments", [
        "Consecrated To Put On The Garments means the high priest's clothing belongs to his calling.",
        "The garments from Exodus were made for glory and beauty, and wearing them signaled public ministry before the LORD.",
        "The phrase keeps the focus on office and service, not personal fashion or rank.",
      ]),
      explain("🚪 Neither Shall He Go In To Any Dead Body", [
        "Neither Shall He Go In To Any Dead Body gives the high priest a stricter death-boundary than other priests.",
        "Even family death does not interrupt his consecrated role in the same way, because he represents Israel in the holiest service.",
        "The phrase is emotionally heavy, but it shows how serious his public calling is.",
      ]),
      explain("👰 A Virgin Of His Own People", [
        "A Virgin Of His Own People describes the high priest's marriage boundary.",
        "His marriage is not only private; it preserves priestly lineage and public holiness within Israel.",
        "The phrase helps readers see that the high priest's household is attached to the sanctuary order.",
      ]),
      explain("🛡️ Neither Shall He Profane His Seed", [
        "Neither Shall He Profane His Seed means his descendants must not be treated as ordinary or careless in holiness.",
        "Seed points to his family line, the priestly future that would continue after him.",
        "The phrase shows that priestly holiness reaches beyond one man into the generations that serve after him.",
      ]),
    ],
  },
  {
    chapter: 21,
    startVerse: 16,
    endVerse: 21,
    reference: "Leviticus 21:16-21",
    title: "🧍 Priests With Blemishes And The Holy Place",
    icon: "🧍",
    phrases: [
      explain("📣 Speak Unto Aaron, Saying", [
        "Speak Unto Aaron, Saying turns the command directly toward the head of the priestly family.",
        "Aaron needs to know how priestly service is guarded because his descendants will serve at the altar.",
        "The phrase shows that these boundaries are not private opinions; they are instructions delivered by God's appointed mediator.",
      ]),
      explain("🧬 Whosoever He Be Of Thy Seed", [
        "Whosoever He Be Of Thy Seed means the rule applies to any male descendant in Aaron's priestly line.",
        "The phrase is about priestly lineage and sanctuary service, not about whether a person's life has value.",
        "Leviticus is sorting roles at the altar, not measuring human worth.",
      ]),
      explain("⚠️ Hath Any Blemish", [
        "Hath Any Blemish names a visible bodily condition that restricted altar service.",
        "This is hard for modern readers, so the phrase has to be read inside the symbolic world of Leviticus.",
        "At the altar, visible wholeness pointed to the holiness and completeness of the God being served.",
      ]),
      explain("🍞 Let Him Not Approach To Offer The Bread", [
        "Let Him Not Approach To Offer The Bread means the priest may not perform the altar presentation.",
        "Approach is sanctuary language: coming near to serve at holy space.",
        "The phrase limits a specific priestly task while later verses still allow him to eat holy food.",
      ]),
      explain("👁️ A Blind Man, Or A Lame", [
        "A Blind Man, Or A Lame begins the list of bodily conditions that affected altar service.",
        "The phrase does not say these men are rejected by God as people.",
        "It says the visible symbolism of priestly approach had to match the holy wholeness represented at the altar.",
      ]),
      explain("🛡️ No Man That Hath A Blemish", [
        "No Man That Hath A Blemish repeats the boundary so the priestly family cannot ignore it.",
        "The repetition shows how carefully altar service was guarded.",
        "The phrase prepares for the mercy in the next section: restricted service does not mean total exclusion from holy food.",
      ]),
    ],
  },
  {
    chapter: 21,
    startVerse: 22,
    endVerse: 24,
    reference: "Leviticus 21:22-24",
    title: "🍞 Holy Food And Holy Boundaries",
    icon: "🍞",
    phrases: [
      explain("🍞 He Shall Eat The Bread Of His God", [
        "He Shall Eat The Bread Of His God means the priest with a blemish still shares in priestly provision.",
        "He is restricted from altar approach, but he is not thrown away or cut off from the priestly family.",
        "The phrase is important because Leviticus guards holiness without erasing his place among God's servants.",
      ]),
      explain("✨ Both Of The Most Holy, And Of The Holy", [
        "Both Of The Most Holy, And Of The Holy names the kinds of sacred food he may eat.",
        "Most holy portions and holy portions belonged to the priestly system of offerings.",
        "The phrase shows that his dignity and provision remain even when his altar role is limited.",
      ]),
      explain("🚪 Only He Shall Not Go In Unto The Vail", [
        "Only He Shall Not Go In Unto The Vail marks the boundary around the inner sanctuary.",
        "The vail separated holy space from the most holy place, so crossing near it was not casual.",
        "The phrase explains that the restriction is about approach to sacred space, not personal worth.",
      ]),
      explain("⛔ Nor Come Nigh Unto The Altar", [
        "Nor Come Nigh Unto The Altar keeps the same boundary at the place of sacrifice.",
        "Coming near the altar was priestly action before the LORD, and Leviticus guards that symbolism carefully.",
        "The phrase clarifies the exact role he cannot perform.",
      ]),
      explain("👑 I The LORD Do Sanctify Them", [
        "I The LORD Do Sanctify Them means God Himself makes the priests holy for service.",
        "Their holiness does not come from family pride, physical strength, or human achievement.",
        "The phrase ends the chapter by putting the whole priestly system under the LORD's authority.",
      ]),
    ],
  },
  {
    chapter: 22,
    startVerse: 1,
    endVerse: 6,
    reference: "Leviticus 22:1-6",
    title: "🛡️ Holy Things Must Not Be Profaned",
    icon: "🛡️",
    phrases: [
      explain("📣 The LORD Spake Unto Moses", [
        "The LORD Spake Unto Moses means the next priestly instruction again begins with divine speech.",
        "Moses is not guessing how holy food should be handled; he is receiving God's command.",
        "The phrase keeps the reader grounded: holiness is defined by the LORD.",
      ]),
      explain("🗣️ Speak Unto Aaron And To His Sons", [
        "Speak Unto Aaron And To His Sons directs the command to the priests who handle the holy things.",
        "Aaron and his sons are responsible for protecting what Israel dedicates to God.",
        "The phrase shows that leaders near holy things carry special accountability.",
      ]),
      explain("🛡️ Separate Themselves From The Holy Things", [
        "Separate Themselves From The Holy Things means priests must step back when they are unclean.",
        "They do not get to handle sacred food or offerings just because they have priestly status.",
        "The phrase teaches that office does not cancel obedience.",
      ]),
      explain("📛 That They Profane Not My Holy Name", [
        "That They Profane Not My Holy Name explains what is at stake.",
        "To profane means to treat what belongs to God as common, careless, or ordinary.",
        "The phrase shows that mishandling holy things dishonors the LORD Himself.",
      ]),
      explain("🚫 Having His Uncleanness Upon Him", [
        "Having His Uncleanness Upon Him means the priest is still in a state that blocks holy contact.",
        "Uncleanness could come through many ordinary life situations, but it still mattered near sacred food.",
        "The phrase helps readers separate ritual uncleanness from worthlessness or hatred.",
      ]),
      explain("🕊️ I Am The LORD", [
        "I Am The LORD seals the command with God's own identity.",
        "The priests obey because the holy things are His, the name is His, and the people are His.",
        "The phrase is short, but it carries the full weight of covenant authority.",
      ]),
    ],
  },
  {
    chapter: 22,
    startVerse: 7,
    endVerse: 9,
    reference: "Leviticus 22:7-9",
    title: "🌅 Cleanness Restores Holy Eating",
    icon: "🌅",
    phrases: [
      explain("🌅 When The Sun Is Down", [
        "When The Sun Is Down marks the time when uncleanness ends after washing.",
        "In Israel's rhythm, evening could begin a restored day of cleanness.",
        "The phrase shows that uncleanness was serious, but it was not always permanent.",
      ]),
      explain("✅ He Shall Be Clean", [
        "He Shall Be Clean means the priest is restored to the state required for eating holy food.",
        "Clean here is about ritual readiness, not proving that the person is morally superior.",
        "The phrase gives relief after the warning: God provides a way back into proper order.",
      ]),
      explain("🍞 Shall He Eat Of The Holy Things", [
        "Shall He Eat Of The Holy Things means restored cleanness allows the priest to share in sacred food again.",
        "Holy eating is not casual snacking; it is provision connected to God's altar.",
        "The phrase keeps eating tied to reverence.",
      ]),
      explain("🦅 That Which Dieth Of Itself", [
        "That Which Dieth Of Itself means an animal found dead without proper slaughter.",
        "Eating such flesh would bring uncleanness because it is tied to death and disorder.",
        "The phrase reminds readers that holy service shaped ordinary choices too.",
      ]),
      explain("📜 They Shall Therefore Keep Mine Ordinance", [
        "They Shall Therefore Keep Mine Ordinance means the priests must guard God's rule carefully.",
        "Ordinance is not a suggestion; it is the ordered way God gives for holy life.",
        "The phrase shows that holiness requires watchfulness, not only good intentions.",
      ]),
    ],
  },
  {
    chapter: 22,
    startVerse: 10,
    endVerse: 13,
    reference: "Leviticus 22:10-13",
    title: "🏠 Who May Eat Holy Food",
    icon: "🏠",
    phrases: [
      explain("🚫 There Shall No Stranger Eat Of The Holy Thing", [
        "There Shall No Stranger Eat Of The Holy Thing means outsiders to the priestly household may not eat sacred food.",
        "Stranger here is about household and priestly status, not about God hating foreigners.",
        "The phrase protects holy food from being treated like normal leftovers.",
      ]),
      explain("💰 If The Priest Buy Any Soul With His Money", [
        "If The Priest Buy Any Soul With His Money refers to a servant who belongs within the priest's household.",
        "In that ancient household structure, the servant's place in the home affected access to food.",
        "The phrase helps readers follow the difference between an outsider and someone attached to the priestly house.",
      ]),
      explain("👧 If The Priest's Daughter Also Be Married Unto A Stranger", [
        "If The Priest's Daughter Also Be Married Unto A Stranger describes a daughter who leaves the priestly household through marriage.",
        "Her access changes because holy food belongs to the priestly house, not merely to her birth memories.",
        "The phrase shows how household boundaries worked in the law.",
      ]),
      explain("🏠 Returned Unto Her Father's House", [
        "Returned Unto Her Father's House describes a widowed or divorced daughter coming back without children.",
        "Her return restores her place in the priestly household.",
        "The phrase shows both boundary and care: she may eat again because she belongs again to that house.",
      ]),
      explain("🍞 She Shall Eat Of Her Father's Meat", [
        "She Shall Eat Of Her Father's Meat means she can share in the priestly food once restored to her father's house.",
        "Meat here means food or portion, not only animal flesh.",
        "The phrase helps readers see holy food as household provision under God's rules.",
      ]),
    ],
  },
  {
    chapter: 22,
    startVerse: 14,
    endVerse: 16,
    reference: "Leviticus 22:14-16",
    title: "⚖️ Restitution For Holy Food",
    icon: "⚖️",
    phrases: [
      explain("🍞 Eat Of The Holy Thing Unwittingly", [
        "Eat Of The Holy Thing Unwittingly means someone eats sacred food by mistake.",
        "Unwittingly matters because the law recognizes accidental wrongdoing, but it still requires repair.",
        "The phrase shows that ignorance may lessen defiance, but it does not erase responsibility.",
      ]),
      explain("➕ Shall Put The Fifth Part Thereof Unto It", [
        "Shall Put The Fifth Part Thereof Unto It means the person must add twenty percent when making restitution.",
        "The extra fifth shows that holy things are not replaced casually.",
        "The phrase teaches that repair should be concrete, not only verbal regret.",
      ]),
      explain("🛡️ They Shall Not Profane The Holy Things", [
        "They Shall Not Profane The Holy Things means Israel must not treat dedicated offerings as common food.",
        "Holy things belonged to the LORD before they benefited the priests.",
        "The phrase keeps worship gifts protected from careless use.",
      ]),
      explain("⚖️ Suffer Them To Bear The Iniquity Of Trespass", [
        "Suffer Them To Bear The Iniquity Of Trespass means careless handling of holy food can load guilt onto the people.",
        "Trespass is wrongdoing against what belongs to God.",
        "The phrase shows why the priests must teach and guard the boundaries clearly.",
      ]),
    ],
  },
  {
    chapter: 22,
    startVerse: 17,
    endVerse: 22,
    reference: "Leviticus 22:17-22",
    title: "🐑 Offerings Must Be Without Blemish",
    icon: "🐑",
    phrases: [
      explain("📣 The LORD Spake Unto Moses", [
        "The LORD Spake Unto Moses opens the section on acceptable offerings with God's instruction.",
        "The worshiper does not decide what counts as acceptable by personal taste.",
        "The phrase keeps sacrifice under God's command.",
      ]),
      explain("🗣️ Speak Unto Aaron, And To His Sons", [
        "Speak Unto Aaron, And To His Sons brings the priests into responsibility for examining offerings.",
        "They are not only ceremony workers; they guard what may be placed on the altar.",
        "The phrase shows priestly leadership protecting worship from careless gifts.",
      ]),
      explain("🎁 Offer His Oblation For All His Vows", [
        "Offer His Oblation For All His Vows names gifts brought because a worshiper made a vow to the LORD.",
        "An oblation is an offering presented to God.",
        "The phrase reminds readers that promises to God must be honored with the kind of offering He accepts.",
      ]),
      explain("🐑 Ye Shall Offer At Your Own Will", [
        "Ye Shall Offer At Your Own Will describes a freewill offering brought willingly before the LORD.",
        "Willing does not mean careless; the next phrase still requires the animal to be acceptable.",
        "The phrase holds joy and reverence together.",
      ]),
      explain("✅ It Shall Be Perfect To Be Accepted", [
        "It Shall Be Perfect To Be Accepted means the offering must be whole and without disqualifying defect.",
        "Perfect here means suitable for sacrifice, not emotionally flawless.",
        "The phrase teaches that worship gives God what is fitting, not what is easiest to discard.",
      ]),
      explain("🚫 Ye Shall Not Offer These Unto The LORD", [
        "Ye Shall Not Offer These Unto The LORD rejects animals with serious defects.",
        "The altar is not a place to unload damaged leftovers while pretending to honor God.",
        "The phrase makes acceptable worship concrete and visible.",
      ]),
    ],
  },
  {
    chapter: 22,
    startVerse: 23,
    endVerse: 25,
    reference: "Leviticus 22:23-25",
    title: "✅ What May And May Not Be Offered",
    icon: "✅",
    phrases: [
      explain("🐂 A Bullock Or A Lamb", [
        "A Bullock Or A Lamb names the animals under discussion in the offering rule.",
        "The law is not floating in the abstract; it speaks to real animals Israel would bring.",
        "The phrase helps readers picture the worshiper's actual gift.",
      ]),
      explain("🎁 For A Freewill Offering", [
        "For A Freewill Offering allows a limited kind of imperfect animal in a specific voluntary category.",
        "The phrase shows that Leviticus has careful distinctions, not one flat rule for every situation.",
        "A reader should notice that vows remain stricter than this freewill case.",
      ]),
      explain("🚫 That Which Is Bruised, Or Crushed", [
        "That Which Is Bruised, Or Crushed lists injuries that make an animal unacceptable.",
        "The wording is physical and specific because priests had to inspect real offerings.",
        "The phrase shows that the LORD is not honored by presenting what is visibly corrupted.",
      ]),
      explain("🌍 Neither From A Stranger's Hand", [
        "Neither From A Stranger's Hand means Israel may not accept defective offerings from a foreigner either.",
        "The source of the animal does not lower God's standard.",
        "The phrase shows that worship before the LORD is governed by His holiness, not by convenience.",
      ]),
      explain("✅ Because Their Corruption Is In Them", [
        "Because Their Corruption Is In Them explains why the animals are rejected.",
        "The issue is not priestly pickiness; the animals carry visible damage that does not fit the altar.",
        "The phrase keeps the law focused on the symbolic wholeness of sacrifice.",
      ]),
    ],
  },
  {
    chapter: 22,
    startVerse: 26,
    endVerse: 31,
    reference: "Leviticus 22:26-31",
    title: "🐄 Offerings And Mercy In Time",
    icon: "🐄",
    phrases: [
      explain("🐄 When A Bullock, Or A Sheep, Or A Goat, Is Brought Forth", [
        "When A Bullock, Or A Sheep, Or A Goat, Is Brought Forth begins with newborn sacrificial animals.",
        "The law pays attention to time, birth, and the life of the animal before it can be offered.",
        "The phrase shows that worship is ordered, not rushed.",
      ]),
      explain("⏳ Seven Days Under The Dam", [
        "Seven Days Under The Dam means the newborn remains with its mother for its first week.",
        "Dam means mother animal.",
        "The phrase slows sacrifice down with a built-in tenderness toward created life.",
      ]),
      explain("📅 From The Eighth Day And Thenceforth", [
        "From The Eighth Day And Thenceforth marks when the animal may be accepted as an offering.",
        "The eighth day often signals readiness after a completed period in Leviticus.",
        "The phrase shows that acceptable worship follows God's timing.",
      ]),
      explain("🐄 Ye Shall Not Kill It And Her Young Both In One Day", [
        "Ye Shall Not Kill It And Her Young Both In One Day forbids killing a mother animal and her offspring on the same day.",
        "Even in a sacrificial system, God places limits that train Israel not to treat life brutally.",
        "The phrase gives holiness a texture of restraint and mercy.",
      ]),
      explain("🙏 Sacrifice A Sacrifice Of Thanksgiving", [
        "Sacrifice A Sacrifice Of Thanksgiving describes an offering of gratitude to the LORD.",
        "Thanksgiving is not only a feeling inside the worshiper; it becomes an ordered act of worship.",
        "The phrase shows gratitude expressed through obedience.",
      ]),
      explain("📜 Therefore Shall Ye Keep My Commandments", [
        "Therefore Shall Ye Keep My Commandments gathers the offering rules into obedience.",
        "The sacrifices are not magic actions; they belong inside covenant loyalty.",
        "The phrase reminds readers that worship and commandment-keeping belong together.",
      ]),
    ],
  },
  {
    chapter: 22,
    startVerse: 32,
    endVerse: 33,
    reference: "Leviticus 22:32-33",
    title: "📛 The Holy Name And The Rescuer God",
    icon: "📛",
    phrases: [
      explain("📛 Neither Shall Ye Profane My Holy Name", [
        "Neither Shall Ye Profane My Holy Name means Israel must not treat the LORD's name as common or dishonored.",
        "God's name represents His revealed character, authority, and presence among His people.",
        "The phrase explains why careless worship is so serious.",
      ]),
      explain("✨ I Will Be Hallowed Among The Children Of Israel", [
        "I Will Be Hallowed Among The Children Of Israel means the LORD will be treated as holy by His people.",
        "Hallowed means recognized as set apart, weighty, and worthy of reverence.",
        "The phrase shows the goal of all these laws: God's holiness displayed among Israel.",
      ]),
      explain("🕊️ I Am The LORD Which Hallow You", [
        "I Am The LORD Which Hallow You means God is the one who makes Israel holy.",
        "Israel does not become holy by inventing rules; Israel is set apart by the LORD who claims and shapes them.",
        "The phrase puts grace underneath obedience.",
      ]),
      explain("🚪 That Brought You Out Of The Land Of Egypt", [
        "That Brought You Out Of The Land Of Egypt roots holiness in rescue.",
        "The God giving these commands is the God who delivered Israel from slavery.",
        "The phrase keeps Leviticus from sounding like random religion: obedience answers redemption.",
      ]),
    ],
  },
  {
    chapter: 23,
    startVerse: 1,
    endVerse: 3,
    reference: "Leviticus 23:1-3",
    title: "📅 Sabbath As Holy Time",
    icon: "📅",
    phrases: [
      explain("📣 The LORD Spake Unto Moses", [
        "The LORD Spake Unto Moses begins the calendar of holy time with God's voice.",
        "Israel's year is not organized only by farming or politics; it is organized by the LORD.",
        "The phrase shows that sacred time is commanded, not invented.",
      ]),
      explain("🗣️ Speak Unto The Children Of Israel", [
        "Speak Unto The Children Of Israel widens the audience from priests to the whole people.",
        "The feasts and Sabbath rhythm are not private priestly knowledge.",
        "The phrase shows that all Israel must learn how time belongs to God.",
      ]),
      explain("📅 The Feasts Of The LORD", [
        "The Feasts Of The LORD means these appointed times belong to God before they belong to Israel.",
        "Feasts here are sacred appointments, not merely parties.",
        "The phrase teaches that worship has a calendar shaped by the LORD's acts and commands.",
      ]),
      explain("📣 Holy Convocations", [
        "Holy Convocations means sacred gatherings called for worship and rest.",
        "Convocation is an assembly, so these days bring the people together before God.",
        "The phrase shows that holiness is communal, not only individual.",
      ]),
      explain("🛑 Six Days Shall Work Be Done", [
        "Six Days Shall Work Be Done sets normal labor inside a God-given rhythm.",
        "Work is allowed and expected, but it is not allowed to become endless.",
        "The phrase prepares for Sabbath as a weekly boundary around human striving.",
      ]),
      explain("🕊️ The Seventh Day Is The Sabbath Of Rest", [
        "The Seventh Day Is The Sabbath Of Rest means the week is crowned with set-apart rest.",
        "Sabbath rest points back to creation and teaches Israel to stop under God's care.",
        "The phrase makes rest a holy act, not laziness.",
      ]),
    ],
  },
  {
    chapter: 23,
    startVerse: 4,
    endVerse: 8,
    reference: "Leviticus 23:4-8",
    title: "🩸 Passover And Unleavened Bread",
    icon: "🩸",
    phrases: [
      explain("📅 These Are The Feasts Of The LORD", [
        "These Are The Feasts Of The LORD introduces the appointed celebrations that shape Israel's year.",
        "The phrase reminds readers that the calendar belongs to the LORD, not merely to national tradition.",
        "Every feast teaches Israel to remember God in time.",
      ]),
      explain("🩸 The LORD's Passover", [
        "The LORD's Passover recalls the night God delivered Israel from Egypt.",
        "Passover is about rescue through judgment, blood, and God's protection over His people.",
        "The phrase connects Leviticus back to Exodus and the beginning of Israel's freedom.",
      ]),
      explain("🍞 The Feast Of Unleavened Bread", [
        "The Feast Of Unleavened Bread continues the Passover memory for seven days.",
        "Unleavened bread recalls Israel leaving Egypt in haste and marks a cleansed festival life.",
        "The phrase helps readers see that remembering deliverance becomes a practiced rhythm.",
      ]),
      explain("📣 An Holy Convocation", [
        "An Holy Convocation means the feast includes a sacred assembly.",
        "The people do not only remember privately; they gather as God's rescued community.",
        "The phrase shows that worship memory is shared.",
      ]),
      explain("🔥 Ye Shall Offer An Offering Made By Fire", [
        "Ye Shall Offer An Offering Made By Fire means the feast includes sacrifices presented to the LORD.",
        "The celebration is not separated from the altar.",
        "The phrase connects joy, memory, and worship cost.",
      ]),
      explain("🛑 Ye Shall Do No Servile Work", [
        "Ye Shall Do No Servile Work means ordinary labor stops on the appointed holy days.",
        "Servile work is regular occupational work, the kind of labor that fills normal days.",
        "The phrase makes room for worship by interrupting the usual demands of life.",
      ]),
    ],
  },
  {
    chapter: 23,
    startVerse: 9,
    endVerse: 14,
    reference: "Leviticus 23:9-14",
    title: "🌾 Firstfruits Before Eating",
    icon: "🌾",
    phrases: [
      explain("🌾 When Ye Be Come Into The Land", [
        "When Ye Be Come Into The Land points forward to life after the wilderness.",
        "God is teaching Israel how to worship when they receive the harvest in the promised land.",
        "The phrase ties future provision to present obedience.",
      ]),
      explain("🌾 A Sheaf Of The Firstfruits", [
        "A Sheaf Of The Firstfruits means the first gathered grain is brought to the LORD.",
        "Firstfruits teaches that the harvest is received as God's gift before it is enjoyed as Israel's food.",
        "The phrase trains gratitude at the beginning, not after leftovers.",
      ]),
      explain("🙌 He Shall Wave The Sheaf Before The LORD", [
        "He Shall Wave The Sheaf Before The LORD describes the priest presenting the firstfruits in God's presence.",
        "The wave offering is a visible act of giving and acknowledgment.",
        "The phrase shows the harvest being lifted before the true giver.",
      ]),
      explain("🐑 An He Lamb Without Blemish", [
        "An He Lamb Without Blemish names the accompanying burnt offering.",
        "Without blemish means the animal is fit for the altar and not a damaged castoff.",
        "The phrase shows that harvest gratitude includes costly worship.",
      ]),
      explain("🚫 Ye Shall Eat Neither Bread", [
        "Ye Shall Eat Neither Bread means Israel waits to eat the new harvest until the firstfruits are offered.",
        "The order matters: God is honored first, then the people receive and enjoy.",
        "The phrase teaches dependence through timing.",
      ]),
    ],
  },
  {
    chapter: 23,
    startVerse: 15,
    endVerse: 20,
    reference: "Leviticus 23:15-20",
    title: "🍞 Weeks And The New Meat Offering",
    icon: "🍞",
    phrases: [
      explain("🧮 Ye Shall Count Unto You", [
        "Ye Shall Count Unto You begins the counting toward the Feast of Weeks.",
        "The people mark time from firstfruits toward another harvest celebration.",
        "The phrase shows worshipful waiting built into the calendar.",
      ]),
      explain("📅 Seven Sabbaths Shall Be Complete", [
        "Seven Sabbaths Shall Be Complete means seven full weeks pass before the next offering.",
        "The number gives the feast a rhythm of fullness and completion.",
        "The phrase teaches Israel to measure time by God's appointed pattern.",
      ]),
      explain("🍞 A New Meat Offering Unto The LORD", [
        "A New Meat Offering Unto The LORD means fresh grain is brought to God from the harvest.",
        "Meat offering in KJV language usually means grain offering, not animal meat.",
        "The phrase helps modern readers avoid misunderstanding the word meat.",
      ]),
      explain("🍞 Two Wave Loaves", [
        "Two Wave Loaves are loaves presented before the LORD as part of the feast.",
        "Unlike many grain offerings, these loaves are baked with leaven, showing this feast has its own specific rule.",
        "The phrase shows that each offering has a commanded shape.",
      ]),
      explain("🔥 An Offering Made By Fire", [
        "An Offering Made By Fire means sacrifices are presented on the altar with the feast.",
        "The harvest celebration is not only about food abundance; it is worship before the LORD.",
        "The phrase keeps the altar at the center of the festival.",
      ]),
      explain("🤝 Sacrifice Of Peace Offerings", [
        "Sacrifice Of Peace Offerings points to fellowship and wholeness before God.",
        "Peace offerings often include shared enjoyment in God's presence.",
        "The phrase shows that harvest worship includes communion, not only surrender.",
      ]),
    ],
  },
  {
    chapter: 23,
    startVerse: 21,
    endVerse: 22,
    reference: "Leviticus 23:21-22",
    title: "👥 Holy Gathering And Gleaning Mercy",
    icon: "👥",
    phrases: [
      explain("📣 Ye Shall Proclaim On The Selfsame Day", [
        "Ye Shall Proclaim On The Selfsame Day means the feast is publicly announced at the appointed time.",
        "The calendar is not vague; Israel is called to respond on the day God names.",
        "The phrase shows that holy time requires public obedience.",
      ]),
      explain("📣 An Holy Convocation Unto You", [
        "An Holy Convocation Unto You means the people gather for a sacred assembly.",
        "The harvest is celebrated before God as a community, not only in private households.",
        "The phrase keeps gratitude communal.",
      ]),
      explain("🛑 Ye Shall Do No Servile Work", [
        "Ye Shall Do No Servile Work stops ordinary labor for the holy gathering.",
        "The command makes space for worship, memory, and rest.",
        "The phrase teaches that productivity must bow to God's appointed times.",
      ]),
      explain("🌾 Thou Shalt Not Make Clean Riddance", [
        "Thou Shalt Not Make Clean Riddance means landowners must not strip the field completely bare.",
        "God places mercy into the harvest process itself.",
        "The phrase shows that worship calendars and economic compassion belong together.",
      ]),
      explain("🤲 Thou Shalt Leave Them Unto The Poor", [
        "Thou Shalt Leave Them Unto The Poor means the edges and gleanings become provision for vulnerable people.",
        "The poor and the stranger are not afterthoughts in God's harvest law.",
        "The phrase makes mercy practical enough to be measured in grain left behind.",
      ]),
    ],
  },
  {
    chapter: 23,
    startVerse: 23,
    endVerse: 25,
    reference: "Leviticus 23:23-25",
    title: "🎺 Trumpets And Remembering",
    icon: "🎺",
    phrases: [
      explain("📅 In The Seventh Month", [
        "In The Seventh Month places this holy day in a major festival season.",
        "The seventh month becomes crowded with worship, rest, atonement, and rejoicing.",
        "The phrase helps readers see the calendar building toward solemn and joyful encounters with God.",
      ]),
      explain("🛑 A Sabbath", [
        "A Sabbath means the day is marked by rest even though it is not the weekly seventh-day Sabbath.",
        "Sabbath language can mark special holy days of stopping.",
        "The phrase shows that rest can be woven into the yearly calendar too.",
      ]),
      explain("🎺 A Memorial Of Blowing Of Trumpets", [
        "A Memorial Of Blowing Of Trumpets means trumpet blasts call the people to sacred remembrance.",
        "The sound gathers attention and marks the day as belonging to the LORD.",
        "The phrase teaches that worship can be announced through sound, memory, and assembly.",
      ]),
      explain("📣 An Holy Convocation", [
        "An Holy Convocation means the trumpet day includes a sacred gathering.",
        "The people are not merely hearing noise; they are being summoned into worship.",
        "The phrase turns trumpet sound into communal response.",
      ]),
      explain("🔥 An Offering Made By Fire Unto The LORD", [
        "An Offering Made By Fire Unto The LORD means the day includes altar worship.",
        "The trumpet memorial is joined to sacrifice, showing reverence through action.",
        "The phrase keeps the day centered on the LORD, not on ceremony alone.",
      ]),
    ],
  },
  {
    chapter: 23,
    startVerse: 26,
    endVerse: 31,
    reference: "Leviticus 23:26-31",
    title: "🙏 Atonement And Afflicting The Soul",
    icon: "🙏",
    phrases: [
      explain("🙏 A Day Of Atonement", [
        "A Day Of Atonement names the solemn day when Israel's sin and uncleanness are dealt with before God.",
        "Atonement means God provides a way for guilt to be covered and the people to remain in covenant life.",
        "The phrase connects this calendar day to the deep ritual of Leviticus 16.",
      ]),
      explain("📣 An Holy Convocation Unto You", [
        "An Holy Convocation Unto You means the people gather on this solemn day.",
        "Atonement is not hidden as a private idea; the whole community is called before God.",
        "The phrase shows that sin and mercy are communal realities in Israel.",
      ]),
      explain("💔 Ye Shall Afflict Your Souls", [
        "Ye Shall Afflict Your Souls means the people humble themselves before the LORD.",
        "The phrase likely includes fasting and deep self-denial, but the heart is humility rather than performance.",
        "It teaches Israel not to treat atonement lightly.",
      ]),
      explain("🔥 Offer An Offering Made By Fire", [
        "Offer An Offering Made By Fire means the day includes sacrifice at the altar.",
        "Human humility is joined to God's appointed worship.",
        "The phrase shows that atonement is received God's way, not invented by emotion alone.",
      ]),
      explain("⚠️ I Will Destroy From Among His People", [
        "I Will Destroy From Among His People warns against refusing the day of atonement.",
        "The warning is severe because rejecting God's appointed mercy is not a small mistake.",
        "The phrase shows that holiness, sin, and grace are matters of life and death.",
      ]),
    ],
  },
  {
    chapter: 23,
    startVerse: 32,
    endVerse: 32,
    reference: "Leviticus 23:32",
    title: "🌙 A Sabbath From Evening To Evening",
    icon: "🌙",
    phrases: [
      explain("🕊️ It Shall Be Unto You A Sabbath Of Rest", [
        "It Shall Be Unto You A Sabbath Of Rest makes the Day of Atonement a deep stopping day.",
        "The people cease from ordinary work because the day belongs to humility before God.",
        "The phrase shows that rest can be solemn as well as joyful.",
      ]),
      explain("💔 Ye Shall Afflict Your Souls", [
        "Ye Shall Afflict Your Souls repeats the call to humble the inner life.",
        "This is not empty sadness; it is a posture of repentance and dependence before the LORD.",
        "The phrase keeps atonement from becoming routine ceremony.",
      ]),
      explain("🌙 In The Ninth Day Of The Month At Even", [
        "In The Ninth Day Of The Month At Even gives the starting point for the observance.",
        "The evening boundary matters because Israel's day is reckoned from evening to evening.",
        "The phrase helps readers understand how the holy day is timed.",
      ]),
      explain("🌙 From Even Unto Even", [
        "From Even Unto Even means the Sabbath rest is kept across the full sacred span.",
        "The phrase gives a clear beginning and ending so obedience is not vague.",
        "It shows that even time itself is submitted to the LORD's command.",
      ]),
    ],
  },
  {
    chapter: 23,
    startVerse: 33,
    endVerse: 38,
    reference: "Leviticus 23:33-38",
    title: "🛖 Tabernacles And Holy Days",
    icon: "🛖",
    phrases: [
      explain("🛖 The Feast Of Tabernacles", [
        "The Feast Of Tabernacles names the seven-day celebration later known for booths or temporary shelters.",
        "Tabernacles reminds Israel of life under God's care, not only settled comfort in the land.",
        "The phrase prepares for a feast of memory, joy, and dependence.",
      ]),
      explain("📅 Seven Days Unto The LORD", [
        "Seven Days Unto The LORD means the whole festival period is dedicated to God.",
        "The days are not merely vacation or harvest celebration; they belong to worship.",
        "The phrase puts the length of the feast under the LORD's ownership.",
      ]),
      explain("📣 On The First Day Shall Be An Holy Convocation", [
        "On The First Day Shall Be An Holy Convocation means the feast opens with a sacred gathering.",
        "The people begin by assembling before God rather than drifting into private celebration.",
        "The phrase makes worship the doorway into the feast.",
      ]),
      explain("🔥 Ye Shall Offer An Offering Made By Fire", [
        "Ye Shall Offer An Offering Made By Fire means each day includes worship at the altar.",
        "The repeated offerings show that the feast is sustained by reverence, not only happiness.",
        "The phrase keeps joy connected to sacrifice.",
      ]),
      explain("🛑 Ye Shall Do No Servile Work", [
        "Ye Shall Do No Servile Work closes ordinary labor on the holy assembly days.",
        "The command protects worship space from being swallowed by normal work.",
        "The phrase teaches Israel to let God's calendar interrupt their own productivity.",
      ]),
      explain("📜 Beside The Sabbaths Of The LORD", [
        "Beside The Sabbaths Of The LORD means these festival offerings do not replace the regular Sabbath rhythm.",
        "God's calendar has layers: weekly rest, yearly feasts, vows, freewill gifts, and appointed sacrifices.",
        "The phrase helps readers avoid flattening all holy days into one category.",
      ]),
    ],
  },
  {
    chapter: 23,
    startVerse: 39,
    endVerse: 44,
    reference: "Leviticus 23:39-44",
    title: "🌿 Rejoicing In Booths",
    icon: "🌿",
    phrases: [
      explain("🌾 When Ye Have Gathered In The Fruit Of The Land", [
        "When Ye Have Gathered In The Fruit Of The Land places the feast after harvest abundance.",
        "Israel rejoices after receiving provision from the land God gives.",
        "The phrase shows thanksgiving tied to actual food, fields, and gathered produce.",
      ]),
      explain("🎉 Ye Shall Rejoice Before The LORD Your God", [
        "Ye Shall Rejoice Before The LORD Your God commands joy in God's presence.",
        "This joy is not detached from holiness; it happens before the LORD.",
        "The phrase teaches that reverence and gladness belong together.",
      ]),
      explain("🌿 Boughs Of Goodly Trees", [
        "Boughs Of Goodly Trees names branches used in the feast's celebration.",
        "The worship uses creation's beauty as part of Israel's embodied memory.",
        "The phrase helps readers picture a festival that is visible, textured, and earthy.",
      ]),
      explain("🛖 Ye Shall Dwell In Booths Seven Days", [
        "Ye Shall Dwell In Booths Seven Days means Israel lives temporarily in shelters during the feast.",
        "The action turns memory into practice: the people feel temporary dwelling with their own bodies.",
        "The phrase shows that biblical remembrance is often acted out, not only thought about.",
      ]),
      explain("👥 Your Generations May Know", [
        "Your Generations May Know explains the teaching purpose of the booths.",
        "Children and future Israelites are meant to learn the story through the festival.",
        "The phrase shows that worship forms memory across generations.",
      ]),
      explain("🚪 I Made The Children Of Israel To Dwell In Booths", [
        "I Made The Children Of Israel To Dwell In Booths points back to the wilderness journey after Egypt.",
        "The booths remind Israel that settled life in the land came after a season of dependence on God's care.",
        "The phrase turns temporary shelters into testimony.",
      ]),
    ],
  },
  {
    chapter: 24,
    startVerse: 1,
    endVerse: 4,
    reference: "Leviticus 24:1-4",
    title: "🪔 Continual Light Before The LORD",
    icon: "🪔",
    phrases: [
      explain("🫒 Pure Oil Olive Beaten For The Light", [
        "Pure Oil Olive Beaten For The Light names the fuel for the sanctuary lamps.",
        "The oil is carefully prepared because it serves holy space, not ordinary household use.",
        "The phrase shows that even materials brought to the tabernacle are treated with reverence.",
      ]),
      explain("🪔 Cause The Lamps To Burn Continually", [
        "Cause The Lamps To Burn Continually means the light is regularly tended so it does not go out.",
        "The lamps signal ordered worship and constant service before the LORD.",
        "The phrase teaches that holy service requires steady attention, not occasional enthusiasm.",
      ]),
      explain("⛺ Without The Vail Of The Testimony", [
        "Without The Vail Of The Testimony locates the lamps outside the curtain before the most holy place.",
        "The vail marks a boundary around the ark and testimony inside.",
        "The phrase helps readers picture where the lampstand stands in relation to God's holy presence.",
      ]),
      explain("🌙 From The Evening Unto The Morning", [
        "From The Evening Unto The Morning gives the lamp-tending rhythm through the night.",
        "Aaron is responsible to keep the light ordered during the dark hours.",
        "The phrase shows priestly care continuing when ordinary activity quiets down.",
      ]),
      explain("📜 A Statute For Ever", [
        "A Statute For Ever means this lamp duty is an ongoing ordinance for Israel's generations.",
        "The phrase does not make the lamp optional or temporary in the tabernacle order.",
        "It shows continual light as part of Israel's lasting worship pattern.",
      ]),
    ],
  },
  {
    chapter: 24,
    startVerse: 5,
    endVerse: 9,
    reference: "Leviticus 24:5-9",
    title: "🍞 Bread Set Before The LORD",
    icon: "🍞",
    phrases: [
      explain("🍞 Take Fine Flour", [
        "Take Fine Flour begins the making of the bread set before the LORD.",
        "Fine flour is carefully prepared grain, suitable for holy use.",
        "The phrase shows that ordinary food materials can become part of sacred service when God commands it.",
      ]),
      explain("🍞 Bake Twelve Cakes Thereof", [
        "Bake Twelve Cakes Thereof connects the bread to the twelve tribes of Israel.",
        "The number matters because the bread represents the whole covenant people before the LORD.",
        "The phrase helps readers see that this is not random temple food.",
      ]),
      explain("📚 Set Them In Two Rows", [
        "Set Them In Two Rows describes the ordered arrangement of the bread on the pure table.",
        "The sanctuary is full of ordered placement because worship before God is not chaotic.",
        "The phrase turns arrangement into reverence.",
      ]),
      explain("✨ Pure Frankincense Upon Each Row", [
        "Pure Frankincense Upon Each Row adds a fragrant memorial portion to the bread.",
        "Frankincense signals offering and remembrance before the LORD.",
        "The phrase shows the bread being presented as holy, not merely stored.",
      ]),
      explain("📅 Every Sabbath He Shall Set It In Order", [
        "Every Sabbath He Shall Set It In Order means the bread is refreshed weekly before God.",
        "Sabbath rhythm shapes not only the people, but also priestly service in the sanctuary.",
        "The phrase shows steady worship repeated with faithful care.",
      ]),
      explain("🍞 It Shall Be Aaron's And His Sons'", [
        "It Shall Be Aaron's And His Sons' means the priests eat the holy bread after it is removed.",
        "The bread belongs to holy service first, then becomes priestly provision.",
        "The phrase connects worship, representation, and food for those who serve.",
      ]),
    ],
  },
  {
    chapter: 24,
    startVerse: 10,
    endVerse: 12,
    reference: "Leviticus 24:10-12",
    title: "📛 Blasphemy Brought Before Moses",
    icon: "📛",
    phrases: [
      explain("👩‍👦 The Son Of An Israelitish Woman", [
        "The Son Of An Israelitish Woman introduces the person involved through his family connection.",
        "The text notes his Israelite mother and Egyptian father because his place in the camp matters to the case.",
        "The phrase helps readers see that the incident happens inside Israel's community life.",
      ]),
      explain("⚔️ Strove Together In The Camp", [
        "Strove Together In The Camp means a fight or serious conflict broke out among the people.",
        "The camp is the ordered community gathered around God's presence.",
        "The phrase shows disorder erupting in the very place where holiness is supposed to shape life.",
      ]),
      explain("📛 Blasphemed The Name Of The LORD", [
        "Blasphemed The Name Of The LORD means he dishonored God's revealed name with contempt.",
        "The Name is not a magic sound; it represents the LORD Himself.",
        "The phrase explains why the case becomes so serious.",
      ]),
      explain("🧑‍⚖️ They Brought Him Unto Moses", [
        "They Brought Him Unto Moses means the case is taken to the covenant mediator for judgment.",
        "The people do not improvise punishment in the heat of the fight.",
        "The phrase shows the community seeking God's order through Moses.",
      ]),
      explain("⏳ They Put Him In Ward", [
        "They Put Him In Ward means they held him in custody while waiting for the LORD's will to be made clear.",
        "Ward is a guarded holding place, not the final judgment itself.",
        "The phrase shows restraint until God's command is known.",
      ]),
    ],
  },
  {
    chapter: 24,
    startVerse: 13,
    endVerse: 16,
    reference: "Leviticus 24:13-16",
    title: "⚖️ Judgment For Blaspheming The Name",
    icon: "⚖️",
    phrases: [
      explain("📣 The LORD Spake Unto Moses", [
        "The LORD Spake Unto Moses means the judgment is given by God, not guessed by the crowd.",
        "Moses receives direction for a case the people had placed in custody.",
        "The phrase keeps justice under divine command.",
      ]),
      explain("👂 All That Heard Him", [
        "All That Heard Him identifies the witnesses who heard the blasphemy.",
        "Their role matters because judgment is not based on rumor.",
        "The phrase shows that public wrongdoing requires truthful public witness.",
      ]),
      explain("🤲 Lay Their Hands Upon His Head", [
        "Lay Their Hands Upon His Head makes the witnesses visibly identify the guilty person.",
        "The gesture marks responsibility and confirms the testimony before the congregation acts.",
        "The phrase makes judgment solemn instead of casual violence.",
      ]),
      explain("⚖️ Let All The Congregation Stone Him", [
        "Let All The Congregation Stone Him gives the severe sentence for blaspheming the LORD's name.",
        "The whole congregation is involved because the offense has polluted the community, not merely offended one person.",
        "The phrase is hard, but it shows how weighty God's name is in Israel's covenant life.",
      ]),
      explain("📛 Whosoever Curseth His God", [
        "Whosoever Curseth His God makes the warning broader than this one man.",
        "Cursing God is not treated as a small outburst because it attacks the covenant Lord of the people.",
        "The phrase teaches that speech about God can carry real guilt.",
      ]),
      explain("📛 Blasphemeth The Name Of The LORD", [
        "Blasphemeth The Name Of The LORD names the central sin again.",
        "The repeated focus on the Name shows that the issue is direct contempt toward the LORD.",
        "The phrase helps readers see why this legal case appears after laws about hallowing God's name.",
      ]),
    ],
  },
  {
    chapter: 24,
    startVerse: 17,
    endVerse: 22,
    reference: "Leviticus 24:17-22",
    title: "⚖️ Equal Justice In The Camp",
    icon: "⚖️",
    phrases: [
      explain("🩸 He That Killeth Any Man", [
        "He That Killeth Any Man introduces the law for taking human life.",
        "The phrase treats murder with full seriousness because human life belongs to God.",
        "It moves the chapter from blasphemy to broader justice in the community.",
      ]),
      explain("🐂 He That Killeth A Beast", [
        "He That Killeth A Beast deals with responsibility for killing another person's animal.",
        "The penalty is different from killing a human because animal life and human life are not valued the same way.",
        "The phrase helps readers see measured justice rather than flat punishment.",
      ]),
      explain("🦴 If A Man Cause A Blemish", [
        "If A Man Cause A Blemish refers to injuring another person physically.",
        "Blemish here is damage done to someone's body, not the priestly altar restriction from chapter 21.",
        "The phrase shows that bodily harm must be answered with justice.",
      ]),
      explain("👁️ Eye For Eye, Tooth For Tooth", [
        "Eye For Eye, Tooth For Tooth means justice must be proportionate to the injury.",
        "The phrase is often misunderstood as permission for revenge, but in law it limits punishment to fit the harm.",
        "It keeps judgment from becoming excessive retaliation.",
      ]),
      explain("⚖️ Ye Shall Have One Manner Of Law", [
        "Ye Shall Have One Manner Of Law means the same standard of justice applies across the community.",
        "Israel may not bend justice based on status, background, or favoritism.",
        "The phrase is a major principle: holiness includes equal legal treatment.",
      ]),
      explain("🌍 As Well For The Stranger", [
        "As Well For The Stranger means the non-Israelite living among them is under the same legal protection and responsibility.",
        "The stranger is not outside justice simply because he is not native-born.",
        "The phrase shows that God's law guards fairness for the vulnerable outsider too.",
      ]),
    ],
  },
  {
    chapter: 24,
    startVerse: 23,
    endVerse: 23,
    reference: "Leviticus 24:23",
    title: "🧑‍⚖️ The Congregation Carries Out Judgment",
    icon: "🧑‍⚖️",
    phrases: [
      explain("🧑‍⚖️ Moses Spake To The Children Of Israel", [
        "Moses Spake To The Children Of Israel means the judgment God gave is communicated to the whole community.",
        "Moses does not keep the ruling private because the case affects Israel's public holiness.",
        "The phrase shows the mediator delivering God's word before action is taken.",
      ]),
      explain("🚪 They Brought Forth Him That Had Cursed", [
        "They Brought Forth Him That Had Cursed means the guilty man is taken out from custody to receive the sentence.",
        "The phrase connects the earlier waiting period with the final action after God's command is known.",
        "It shows that Israel acts after instruction, not before it.",
      ]),
      explain("🏕️ Out Of The Camp", [
        "Out Of The Camp means the execution happens outside the ordered dwelling place of God's people.",
        "The camp is where Israel lives around the tabernacle, so severe uncleanness and judgment are moved outside.",
        "The phrase marks separation between covenant life and public defiance of God's name.",
      ]),
      explain("🪨 Stoned Him With Stones", [
        "Stoned Him With Stones states the sentence being carried out.",
        "The repetition sounds heavy because the judgment is heavy.",
        "The phrase forces the reader to feel the seriousness of blaspheming the LORD's name in Israel.",
      ]),
      explain("📜 As The LORD Commanded Moses", [
        "As The LORD Commanded Moses means the action follows God's revealed command.",
        "The people are not acting from mob anger or personal revenge.",
        "The phrase closes the chapter by stressing obedience to the LORD's judgment.",
      ]),
    ],
  },
];

const generatedLeviticus21To27Sections = buildGeneratedPersonalSections({
  book: "Leviticus",
  notes: LEVITICUS_DEEP_NOTES,
  chapters: [21, 22, 23, 24, 25, 26, 27],
  icon: "📜",
  fallbackPhrases: [
    "The LORD Spake Unto Moses",
    "I Am The LORD",
    "Be Holy",
    "Keep My Statutes",
    "Before The LORD",
    "The Children Of Israel",
    "A Statute For Ever",
  ],
});

export const LEVITICUS_21_27_PERSONAL_SECTIONS: PersonalLeviticusPhraseSectionInput[] = [
  ...DAY_37_LEVITICUS_21_24_PERSONAL_SECTIONS,
  ...generatedLeviticus21To27Sections.filter((section) => section.chapter >= 25),
];
