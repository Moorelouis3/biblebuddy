export type LeviticusTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentyFourRawNotes(rawText: string): LeviticusTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

    if (!verseMatch) {
      index += 1;
      continue;
    }

    const startVerse = Number(verseMatch[1]);
    const endVerse = Number(verseMatch[2] || verseMatch[1]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const titleMatch = lines[index]?.trim().match(/^#\s*(.+)$/);
    if (!titleMatch) {
      throw new Error("Missing Leviticus 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+24:/i.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^##\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseHeading = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^##\s+/.test(lines[index].trim()) &&
        !/^#\s+Leviticus\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 24:${startVerse}` : `Leviticus 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 24 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_FOUR_RAW_NOTES = `# Leviticus 24:1-4
# 🕯️ Oil For The Lamps
---
## 🗣️ And The LORD Spake Unto Moses, Saying
This same opening line has already appeared five times in chapter 23. Here it launches a short, different topic: keeping the tabernacle's one lamp lit every single night without fail.
🗣️ The same formula that opened each feast law in chapter 23
🕯️ This time it introduces lamp-oil instructions instead
📜 Moses still isn't inventing any of this himself
---
## 🫒 Pure Oil Olive Beaten For The Light
"Beaten" oil came from olives crushed gently by hand or pestle before any heavy pressing, producing the clearest, purest oil with the least sediment. Cheaper oil, pressed hard from pulp and pits, burned smokier and dirtier - only the best grade was good enough for this one lamp.
🫒 "Beaten" oil is the first, gentlest pressing
✨ Produces the clearest oil with the least sediment
🚫 Cheaper, harder-pressed oil wasn't good enough here
---
## 🔥 To Cause The Lamps To Burn Continually
"Continually" doesn't mean the lamp never went dark for a second - verse 3 clarifies it burned from evening to morning, every single night without exception. The word describes an unbroken nightly routine, not a flame that literally never went out.
🔥 Means every night without exception, not nonstop
🌙 Verse 3 clarifies the actual evening-to-morning window
🔁 An unbroken routine, not a flame that never dims
---
## 🚪 Without The Vail Of The Testimony
"Without the vail" means just outside the inner curtain, in the holy place rather than the Most Holy Place behind it. "The testimony" refers to the stone tablets of the Ten Commandments kept inside the ark on the other side of that same curtain.
🚪 "Without the vail" means outside the inner curtain
📍 Places the lamp in the holy place, not the innermost room
📜 "The testimony" means the stone tablets inside the ark
---
## 🕯️ The Pure Candlestick
This is the same all-gold, hand-hammered lampstand described in full back in Exodus 25:31-40 and built in Exodus 37:17-24 - seven branches shaped like an almond tree in bloom. This chapter doesn't redesign it, only assigns Aaron the daily job of keeping it burning.
🕯️ The same lampstand fully designed in Exodus 25 and 37
🌳 Shaped like a seven-branched, blooming almond tree
👤 Here it's Aaron's ongoing job, not a new design
---
## 🌅 Order It From The Evening Unto The Morning Before The LORD
Aaron personally tended this lamp every evening and morning - trimming wicks, adding oil, keeping it going through the night. It was a small, quiet, repeated task, not a one-time ceremony.
🌅 A twice-daily task: evening setup, morning check
👤 Aaron's own personal, hands-on responsibility
🔁 Small and repeated, not a one-time grand ceremony
---
## 📜 A Statute For Ever In Your Generations
This exact "for ever, throughout your generations" phrase already closed several festival laws in chapter 23. Applying it here means the nightly lamp duty was meant to continue permanently, long after Moses and Aaron were gone.
📜 The same permanent-law phrase used repeatedly in chapter 23
🔁 Meant to continue long after Moses and Aaron died
🕯️ Small daily duties got the same permanence as major feasts
---
## ⛺ In The Tabernacle Of The Congregation
"Tabernacle of the congregation" is this book's regular name for the whole portable tent-sanctuary, the meeting place between God and Israel. Every offering and duty in Leviticus happens inside or right around this one structure.
⛺ Leviticus's standard name for the whole portable sanctuary
🤝 The meeting place between God and the people
📖 The setting for nearly everything commanded in this book

# Leviticus 24:5-9
# 🍞 The Bread Of The Presence
---
## 🌾 Fine Flour, And Bake Twelve Cakes Thereof
Twelve cakes for twelve tribes made this loaf a physical stand-in for the whole nation resting continually in God's presence, not just food for the priests. Every tribe was represented on this one table at all times.
🌾 Twelve cakes represent Israel's twelve tribes
🤝 The whole nation symbolically stayed before God nonstop
🍞 Not ordinary food, but a standing national symbol
---
## 📏 Two Tenth Deals Shall Be In One Cake
A "tenth deal" is the same dry measure used for the firstfruits grain offering back in chapter 23:13 - roughly two quarts. Two tenth deals per cake made these unusually large, substantial loaves, not small wafers.
📏 A "tenth deal" is roughly two quarts, same unit as 23:13
🍞 Two tenth deals made each cake large and substantial
🔗 Reuses a measurement already defined earlier in this project
---
## 📊 Thou Shalt Set Them In Two Rows, Six On A Row
The careful two-by-six arrangement mattered enough to specify exactly - this wasn't food casually piled up, but a formally ordered display kept in the same fixed pattern week after week.
📊 A deliberate two-row, six-per-row arrangement
🔁 Rebuilt in the exact same pattern every single week
📋 Precision mattered even for how the loaves were stacked
---
## 🍞 Upon The Pure Table Before The LORD
This is the golden table of shewbread designed in Exodus 25:23-30 and built in Exodus 37:10-16, standing across from the lampstand inside the holy place. "Shewbread" later became the traditional English name for exactly this ongoing loaf display.
🍞 The same golden table designed in Exodus 25 and built in 37
📍 Stood across from the lampstand inside the holy place
🏷️ Later traditionally called the "shewbread" table
---
## 🌬️ Pure Frankincense Upon Each Row
Frankincense, a fragrant tree resin, was placed on top of the loaves rather than baked inside them. It stayed there as long as the bread did, later burned separately as its own offering when the loaves were finally removed.
🌬️ Frankincense is a fragrant resin, placed on top, not baked in
📅 Stayed on the loaves the whole week they sat there
🔥 Burned separately once the bread was finally taken down
---
## 🧠 For A Memorial, Even An Offering Made By Fire
A "memorial" portion represented the whole gift symbolically, the same concept used for the grain offering back in chapter 2 - a small piece stood in for and pointed back to the entire twelve-loaf display.
🧠 A "memorial" is a small piece standing for the whole
🔗 Same concept already explained for grain offerings in chapter 2
🔥 That token piece is what actually got burned
---
## 📅 Every Sabbath He Shall Set It In Order
Fresh bread replaced the old loaves every single week, on the weekly Sabbath specifically - tying this ongoing tabernacle duty directly to the same seven-day rhythm chapter 23 built its entire festival calendar around.
📅 Old loaves replaced with fresh ones every single week
😴 Timed specifically to the weekly Sabbath
🔗 Ties back to the seven-day rhythm running through chapter 23
---
## 🤝 By An Everlasting Covenant
Calling this weekly bread-renewal an "everlasting covenant" elevates a simple, repeated chore into a binding relational commitment between God and Israel - not a suggestion, but a promise kept in a very ordinary, physical way.
🤝 Frames a repeated chore as a binding relational promise
📜 "Everlasting" means it was never meant to lapse
🍞 Faithfulness shown through something as plain as fresh bread
---
## 👤 It Shall Be Aaron's And His Sons', And They Shall Eat It In The Holy Place
Once the week-old loaves were removed, they became food for the priests specifically - eaten inside the holy place itself, not taken home, because of how holy this particular bread was ranked.
👤 Removed loaves became food for Aaron's priestly family
📍 Had to be eaten inside the holy place, never taken home
⬆️ Its holiness ranking required that restriction
---
## ⭐ Most Holy Unto Him Of The Offerings Of The LORD Made By Fire, By A Perpetual Statute
"Most holy" was the highest ranking of holiness Leviticus assigns to anything, the same tier given to the sin offering in chapter 6:25. Only priests, and no one else, were ever permitted to eat something ranked this sacred.
⭐ "Most holy" is the highest holiness ranking in Leviticus
🔗 The same top tier already used for the sin offering in ch6
🚫 Only priests were ever allowed to eat something this sacred

# Leviticus 24:10-12
# 😡 A Fight Breaks Out In The Camp
---
## 👤 The Son Of An Israelitish Woman, Whose Father Was An Egyptian
This man had one Israelite parent and one Egyptian parent, almost certainly born to the "mixed multitude" mentioned in Exodus 12:38 - non-Israelites who left Egypt alongside Israel during the Exodus and were now living among the tribes.
👤 One Israelite parent, one Egyptian parent
🇪🇬 Likely from the "mixed multitude" of Exodus 12:38
⛺ Was living day-to-day among the Israelite tribes
---
## 🚶 Went Out Among The Children Of Israel
This simply means he was moving through the camp, mixing daily with Israelite families despite his split heritage - not an outsider passing through, but someone actually living within the community.
🚶 Describes daily movement and mixing within the camp
🏡 He wasn't a visitor - he lived among Israel full-time
🤝 Split heritage didn't keep him physically separate
---
## 👊 This Son... And A Man Of Israel Strove Together In The Camp
"Strove" means they physically fought or violently argued, not just disagreed quietly. Whatever the original dispute was over, the text never says - the story's real focus starts with what came out of this man's mouth during the fight.
👊 "Strove" means an actual physical fight or violent quarrel
❓ The original cause of the fight is never explained
🎯 The real focus is what happened next, not the fight itself
---
## 🗯️ Blasphemed The Name, And Cursed
"The Name" here means the LORD's own personal, sacred name - not a generic insult toward gods or authority in general, but a specific, direct misuse of God's covenant name. This is the only time this exact offense is narrated happening in the whole Bible.
🗯️ "The Name" refers specifically to the LORD's own name
⚠️ Not a general insult, but misuse of God's personal name
📖 The only narrated example of this offense in all of Scripture
---
## 👩 His Mother's Name Was Shelomith, The Daughter Of Dibri, Of The Tribe Of Dan
Naming the mother instead of the father is unusual and deliberate - since his father was Egyptian, his only real tribal connection to Israel ran through his mother's side, tribe of Dan, which is why her lineage gets recorded here.
👩 Naming the mother instead of the father is unusual
🔗 His only Israelite tribal tie ran through her, not his father
🏷️ That's exactly why her name and tribe get recorded
---
## 🔒 They Put Him In Ward, That The Mind Of The LORD Might Be Shewed Them
"Ward" means custody, holding him while waiting for a ruling. This mirrors the sabbath-breaker's case in Numbers 15:32-34 - a brand-new kind of offense with no existing law yet, so Moses holds the man and asks God directly rather than guessing.
🔒 "Ward" means custody, holding him for a decision
🔗 Mirrors the sabbath-breaker precedent in Numbers 15:32-34
🙏 Moses asks God directly rather than guessing at a ruling

# Leviticus 24:13-16
# ⚖️ The Sentence For Blasphemy
---
## 🗣️ And The LORD Spake Unto Moses, Saying
This is the third time this exact formula opens a section in these two chapters, but here it delivers something different from a festival law - it's God's direct ruling on the very case just described.
🗣️ The third use of this formula across chapters 23-24
⚖️ This time it delivers a legal ruling, not a festival law
📜 Answers exactly the question raised at the end of verse 12
---
## 🚷 Bring Forth Him That Hath Cursed Without The Camp
Executions, like the disposal of certain sacrificial remains back in chapter 4, happened outside the camp boundary. Serious sin and its consequences were physically kept apart from the community's everyday living space.
🚷 Executions took place outside the camp boundary
🔗 The same "outside the camp" pattern used for sacrifices in ch4
🏕️ Kept serious sin's consequences apart from daily camp life
---
## ✋ Let All That Heard Him Lay Their Hands Upon His Head
Hand-laying elsewhere in Leviticus transfers guilt onto a sacrificial animal, like the burnt offering in chapter 1:4. Here it works differently - the witnesses place their hands to formally own their testimony before the execution, not to transfer sin onto him.
✋ Hand-laying usually transfers guilt onto an animal, as in 1:4
🎯 Here it means witnesses formally owning their testimony
⚖️ Marks accountability for the accusation, not sin-transfer
---
## 🪨 Let All The Congregation Stone Him
Stoning made execution a shared community act rather than one person's job - everyone present participated, which meant the whole community had to take collective ownership of enforcing this law rather than outsourcing it to a single executioner.
🪨 Stoning was carried out by the whole community together
🚫 No single designated executioner did the job alone
🤝 The community collectively owned enforcing this law
---
## 😔 Whosoever Curseth His God Shall Bear His Sin
This first, milder line covers cursing "his God" in a more general sense - a real wrong that carries guilt, but notably not a death sentence on its own. The next verse narrows in on something far more specific and severe.
😔 Covers a more general kind of cursing God
⚖️ Carries guilt, but not a death penalty by itself
🎯 Sets up a sharper contrast with the next verse
---
## 💀 He That Blasphemeth The Name Of The LORD, He Shall Surely Be Put To Death
This second line narrows sharply to misusing God's own specific covenant name, "the LORD" (YHWH) - and that narrower, more serious offense does carry the death penalty. The distinction between the two verses is deliberate, not repetitive.
💀 Specifically about misusing God's own covenant name
⚖️ This narrower offense does carry the death penalty
🎯 A deliberate escalation from the milder verse before it
---
## 🌍 As Well The Stranger, As He That Is Born In The Land
This line directly answers the situation that started the whole story - the offender himself was half-foreign. The law makes clear that being part-Egyptian neither excused him from accountability nor singled him out unfairly; the same standard applied to everyone.
🌍 Directly answers the mixed-heritage case that started this
⚖️ Being part-foreign neither excused nor singled him out
🤝 One identical standard for every resident of the camp

# Leviticus 24:17-22
# 🦷 Life For Life, Eye For Eye
---
## ⚔️ He That Killeth Any Man Shall Surely Be Put To Death
This states the baseline penalty for murder plainly, before the chapter pivots into a wider set of comparisons - a person's life carries a value no payment or substitute could ever equal.
⚔️ States murder's baseline penalty plainly
💰 No payment could ever substitute for a human life
🎯 Sets up the contrast that follows with animal loss
---
## 🐑 He That Killeth A Beast Shall Make It Good; Beast For Beast
Killing someone's animal only required financial restitution, replacing the animal's value - a sharp contrast deliberately placed right next to the death penalty for murder, to make the gap between property and human life impossible to miss.
🐑 Only required paying back the animal's value
💰 Property loss was fixed with restitution, not execution
🎯 Placed beside murder's penalty to highlight the difference
---
## 🤕 If A Man Cause A Blemish In His Neighbour
A "blemish" here means a real physical injury or lasting disfigurement done to another person - not a small scrape, but the kind of harm that would visibly and permanently affect someone's body.
🤕 Means a genuine physical injury or lasting disfigurement
⚠️ Not a small scrape, but visible, lasting harm
👤 Specifically harm done to another human being
---
## ⚖️ Breach For Breach, Eye For Eye, Tooth For Tooth
This is the same "eye for eye" principle explained back in Exodus 21:23-25 - a legal ceiling limiting punishment to match the actual harm done, not a license or encouragement for personal revenge to escalate beyond it.
⚖️ The same limiting principle explained in Exodus 21:23-25
🚫 A ceiling on punishment, not permission for revenge
🎯 Prevents small injuries from spiraling into bigger retaliation
---
## 📐 As He Hath Caused A Blemish In A Man, So Shall It Be Done To Him Again
This repeats the principle in stronger, more absolute terms - proportional justice applied without exception, regardless of who the offender or victim happened to be, unlike many other ancient law codes that scaled punishment by social class.
📐 Restates the principle in stronger, absolute terms
⚖️ Applied without exception, regardless of social status
📖 Many other ancient law codes varied penalties by class instead
---
## 🔁 He That Killeth A Beast, He Shall Restore It: And He That Killeth A Man, He Shall Be Put To Death
This exact contrast from the start of the section returns almost word for word, bookending the whole passage and locking in the same point one final time: animals get restitution, human life gets the death penalty.
🔁 Repeats the section's opening contrast almost word for word
📚 Bookends the passage for emphasis
⚖️ Locks in the animal-versus-human distinction one last time
---
## 🌍 Ye Shall Have One Manner Of Law, As Well For The Stranger, As For One Of Your Own Country
This equal-treatment principle already answered the blasphemy case in verse 16, and now it's restated as a general rule for every law in this section - foreigners living among Israel got the exact same justice system as native-born citizens.
🌍 Restates the equal-treatment principle from verse 16
⚖️ Foreigners received the identical justice system
🔗 Ties this whole legal section back to the opening story
---
## 🙏 For I Am The LORD Your God
The chapter grounds all of this justice not in social order or tradition, but in God's own identity and character - fairness in Israel's courts was meant to reflect who God actually is, not simply what kept the peace.
🙏 Grounds justice in God's identity, not just social order
⚖️ Fairness was meant to reflect God's own character
🎯 The reasoning behind the law, not just the rule itself

# Leviticus 24:23
# 🪨 Israel Obeys
---
## 📢 Moses Spake To The Children Of Israel, That They Should Bring Forth Him That Had Cursed
Moses doesn't hesitate or delay once God's ruling comes - he relays the exact instructions immediately and the community carries them out without recorded protest or debate.
📢 Moses relays God's ruling immediately, without delay
🤝 The community carries it out without recorded protest
🎯 Closes the story with prompt, direct obedience
---
## 🪨 Stone Him With Stones
Repeating "stone" as both verb and object ("stone him with stones") is a common Hebrew construction used for emphasis - underlining that the sentence was carried out exactly, fully, and without any softened substitute.
🪨 A Hebrew construction repeating the same word for emphasis
✅ Underlines that the sentence was carried out fully
🚫 No softened or substitute punishment was used
---
## ✅ The Children Of Israel Did As The LORD Commanded Moses
This closing obedience formula is the same one repeated throughout the tabernacle's construction in Exodus 39-40, now applied to something much harder than following a building plan - actually carrying out a difficult, painful command.
✅ The same obedience formula used throughout Exodus 39-40
🔨 There it was building instructions; here it's a hard command
📖 Shows the formula applies to obedience of every kind
`;

export const LEVITICUS_TWENTY_FOUR_PERSONAL_SECTIONS = parseLeviticusTwentyFourRawNotes(
  LEVITICUS_TWENTY_FOUR_RAW_NOTES,
);
