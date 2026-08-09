export type JudgesSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesSeventeenRawNotes(rawText: string): JudgesSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 17:${startVerse}` : `Judges 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Judges 17 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_SEVENTEEN_RAW_NOTES = `# Judges 17:1-4
# 🪙 Micah And The Stolen Silver
---
## 🏔️ A Man Of Mount Ephraim

Mount Ephraim was not a single peak.

It was a whole range of hill country in the middle of Israel.

This region gave its name to the tribe of Ephraim living there.

The story of Judges is about to shift from national battles to one ordinary household.

🏔️ Mount Ephraim means Ephraim's hill country
🗺️ It sat in the middle of Israel
🏠 The focus shifts to one family
➡️ Israel's chaos plays out at home too

## 🪙 The Eleven Hundred Shekels Of Silver

This is the exact same amount named back in Judges 16.

There each Philistine lord had promised Delilah that much to betray Samson.

Judges never claims the two amounts are directly connected.

Placing the same number here right after that story still invites a comparison.

One story sold out a judge.

This one is about to fund idols in an Israelite home.

🪙 The number matches Judges 16 exactly
💰 There it paid for Samson's betrayal
🏠 Here it funds idols instead
📖 Both stories center on shameful money

## 😡 About Which Thou Cursedst

Micah's mother had spoken a curse over whoever stole her silver.

She did not yet know the thief was her own son.

Curses like this were common in the ancient world.

They were meant to pressure a hidden thief into confessing.

Micah confesses only after hearing his own mother's curse spoken aloud.

😡 Cursedst means she spoke a curse
🤐 She did not know the thief
🗣️ The curse pressures a hidden thief
➡️ Fear moves Micah more than honesty

## 🙏 Blessed Be Thou Of The LORD, My Son

The mother instantly reverses her curse into a blessing once she learns the thief is Micah.

She invokes the LORD's name freely, as if this makes the moment sound holy.

Returning stolen silver does not actually fix what was already done with it.

Using God's name does not turn a theft into something clean.

🙏 She blesses him in the LORD's name
🔄 A curse flips instantly to a blessing
❌ The theft itself is never really resolved
📖 God's name gets used, not truly honored

## 🕊️ I Had Wholly Dedicated The Silver Unto The LORD

The mother claims she had already set this silver apart for God.

Dedicated means formally set apart for a sacred purpose.

But her very next words reveal that purpose is a graven image and a molten image.

Dedicating stolen silver to build an idol is not true worship of the LORD.

It only wears God's name on the outside.

🕊️ Dedicated means set apart for God
🎭 She claims a holy purpose
🚫 The purpose is actually an idol
➡️ God's name masks a broken practice

## 🗿 A Graven Image And A Molten Image

A graven image is an idol carved or cut from wood or stone.

A molten image is an idol cast from metal melted and poured into a mold.

Naming both together may describe one idol finished by two methods.

Either way, the command against making an image like this to worship covers both.

🪵 Graven means carved or cut
🔥 Molten means cast from melted metal
⚖️ The command against idols forbids both
📖 One family breaks it inside their own home

## 🔨 Gave Them To The Founder

A founder was a craftsman who melted metal and poured it into a mold.

Micah's mother pays a professional to actually build the idol for her.

Only two hundred of the eleven hundred shekels get spent this way.

The rest of the silver simply disappears from the story, unexplained.

🔨 Founder means a metal casting craftsman
💰 Only part of the silver gets used
❓ The rest is never accounted for
➡️ Even the numbers here feel careless

## 🏠 They Were In The House Of Micah

The finished idols end up sitting inside an ordinary Israelite home.

This is not a pagan temple or a foreign shrine.

It is one family's house, blending worship of the LORD with homemade idols.

The rest of the chapter shows how far that mixing goes.

🏠 The idols sit in Micah's own house
🙅 This is not a foreign temple
🔀 True worship gets mixed with idols
📖 The chapter shows how far it spreads

# Judges 17:5-6
# 🗿 A House Full Of Gods
---
## 🛕 An House Of Gods

Micah does not stop at one idol.

The text says he had a whole house of gods, plural, inside his home.

This turns his household into its own private shrine.

Israel's law called for one place of worship, not one shrine per family.

🛕 House of gods means a private shrine
🔢 More than one idol is involved
🏠 Micah's home becomes its own worship site
➡️ This breaks the one true pattern of worship

## 👗 Made An Ephod

An ephod was normally a special garment worn only by Israel's high priest.

Exodus describes it in detail as part of official, God given worship.

Micah has one made for his private household religion instead.

Judges 8 already showed an ephod becoming a trap for Gideon's family.

Here it becomes part of the same kind of mistake again.

👗 Ephod means the high priest's garment
📜 It belonged to official, God given worship
🏠 Micah copies it for private use
📖 Judges 8 already showed this danger

## 🔮 And Teraphim

Teraphim were small household idols, often used for guidance or luck.

Families sometimes kept them as a kind of religious insurance.

The Bible consistently treats them as forbidden, not harmless decoration.

Micah is building an entire mini religious system out of ephod, teraphim, and images.

🔮 Teraphim means small household idols
🎲 They were used for guidance or luck
🚫 Scripture treats them as forbidden
📖 Micah stacks idol on top of idol

## 👦 Consecrated One Of His Sons, Who Became His Priest

Consecrated means formally set apart for religious service.

Only descendants of Aaron were supposed to serve as Israel's priests.

Micah simply appoints his own son instead, with no authority to do so.

He builds a full counterfeit religious system under his own roof.

👦 Consecrated means set apart for service
⚖️ Only Aaron's line could be priests
🏠 Micah ignores that rule completely
➡️ His household becomes a private religion

## 👑 In Those Days There Was No King In Israel

This exact sentence repeats four times across Judges chapters seventeen through twenty one.

It works like a flashing warning sign over these final chapters.

Without a king, there is no central authority holding Israel's worship or law together.

Micah's private idols are one small symptom of a much larger national problem.

👑 This line repeats four times in Judges
🚨 It marks these chapters as a warning
🏛️ No king means no central authority
📖 Micah's idols show the wider problem

## 👁️ Every Man Did That Which Was Right In His Own Eyes

This phrase does not mean Israel had no rules written down.

It means people ignored those rules and followed their own judgment instead.

Micah's mixing of God's name with homemade idols is exactly this pattern in action.

The rest of Judges seventeen through twenty one keeps illustrating just how badly that goes.

👁️ This means people ignored God's law
🙋 Everyone followed personal judgment instead
🏠 Micah's religion is this pattern exactly
➡️ The next chapters keep proving the point

# Judges 17:7-9
# 🚶 A Wandering Levite
---
## 🏘️ Out Of Bethlehemjudah

Bethlehemjudah means Bethlehem in the territory of Judah.

The name marks it apart from another town called Bethlehem in the territory of Zebulun.

This is the same Bethlehem later tied to Ruth, David, and eventually Jesus.

Here it is simply the hometown of one wandering young man.

🏘️ Bethlehemjudah means Bethlehem in Judah's land
🗺️ It is distinct from a Zebulun Bethlehem
👑 The same town later belongs to David
➡️ Here it is one man's starting point

## 👤 Of The Family Of Judah, Who Was A Levite

This detail sounds confusing at first, since Levi and Judah were separate tribes.

The Levite probably lived among the people of Judah.

He was likely not born into that tribe himself.

Levites had no tribal land of their own by God's design.

Instead they were supposed to live scattered among the other tribes and be supported by them.

👤 Levi and Judah were separate tribes
🏠 He likely lived among Judah's people
🗺️ Levites received no land of their own
📖 Other tribes were meant to support them

## 🚶 He Sojourned There

Sojourned means living somewhere temporarily, not as a permanent citizen.

A Levite sojourning instead of serving at a fixed post already signals something is off.

The system meant to support Levites through the other tribes was not working as designed.

His wandering is a quiet sign of Israel's larger breakdown.

🚶 Sojourned means living there temporarily
⚠️ A wandering Levite signals a broken system
🏚️ Support for Levites was not working
📖 One man's story mirrors the nation's

## 🧭 To Sojourn Where He Could Find A Place

The young Levite is not traveling toward a calling.

He is simply searching for anywhere that will take him in.

This makes him vulnerable to whatever offer comes first, good or bad.

That vulnerability sets up exactly what happens next with Micah.

🧭 He searches for any open place
🎯 He has no clear calling guiding him
⚠️ This makes him easy to take advantage of
➡️ Micah's offer is about to test that

## ❓ Whence Comest Thou

Whence is an old word meaning from where.

Micah's question is simple and practical, not spiritual concern for the young man.

He wants to know exactly who is standing in front of him.

Micah is already thinking about what use this stranger could be to him.

❓ Whence means from where
🗣️ The question is simple and practical
🤔 Micah is sizing up the stranger
➡️ He already sees a use for him

## 🗺️ I Go To Sojourn Where I May Find A Place

The Levite repeats almost the exact words the narrator already used about him.

He still has no fixed plan beyond finding somewhere, anywhere, to settle.

His answer hands Micah an easy opening to make an offer.

The next verses show exactly how quickly that offer gets made.

🗺️ He repeats the narrator's own words
🎯 He still has no fixed plan
🤝 His answer invites an easy offer
📖 Micah wastes no time making one

# Judges 17:10-13
# 💰 Micah Hires A Priest
---
## 👨‍👦 Be Unto Me A Father And A Priest

Calling the Levite a father is a title of respect, not a literal family claim.

It shows how much authority and honor Micah wants to attach to this role.

He wants the appearance of a real priesthood inside his own private religion.

A hired title cannot supply what a true, God ordained priest actually was.

👨‍👦 Father here is a title of honor
👑 Micah wants borrowed spiritual authority
🎭 He wants the appearance of a priesthood
📖 A title cannot replace true calling

## 🪙 Ten Shekels Of Silver By The Year

This was Micah's yearly salary offer for a permanent household priest.

It is a modest wage, not a fortune like the silver from verse two.

Israel's true priesthood was supposed to be supported through tithes and offerings.

Micah is inventing his own pay structure for a role God never asked him to fill.

🪙 Ten shekels was a modest yearly wage
⚖️ It is small next to verse two's silver
📜 True priests lived on tithes, not a salary
➡️ Micah invents his own system instead

## 👕 A Suit Of Apparel, And Thy Victuals

Apparel means clothing.

Victuals means food and provisions.

Micah offers the young man three basics anyone would need to belong somewhere.

Comfort and security are exactly what finally settles him into this arrangement.

👕 Apparel means clothing
🍞 Victuals means food and provisions
🏠 The offer meets his basic needs
➡️ Comfort settles a wandering man fast

## 🚪 So The Levite Went In

The decision happens almost instantly, with no negotiation described.

A silver wage and steady food outweigh any concern about the idols already in the house.

The young man walks straight into a household built around graven and molten images.

His willingness says as much about the era as Micah's offer does.

🚪 He accepts almost immediately
🪙 A wage matters more than the idols
🏠 He joins a house full of false gods
📖 His ease shows how normal this had become

## 😊 The Levite Was Content To Dwell With The Man

Content here means satisfied, at ease, with no complaint about the arrangement.

Nothing in the text shows him wrestling with whether this job is right.

A Levite, meant to guard true worship, settles comfortably into a counterfeit version of it.

His comfort is part of the problem the chapter is quietly showing.

😊 Content means satisfied and at ease
🤔 He shows no hesitation about the idols
⚠️ A guardian of worship joins a fake version
📖 His comfort is part of the warning

## 👨‍👦 As One Of His Sons

This does not mean a legal adoption took place.

It describes how close and familiar the relationship quickly became.

Micah gains the family connection he tried to manufacture with his own son in verse five.

A hired stranger now fills a role Micah could not create through his own household alone.

👨‍👦 This is closeness, not legal adoption
⏱️ The relationship forms quickly
🏠 Micah gets the connection he wanted
➡️ A stranger fills the role his son shared

## 🕊️ Micah Consecrated The Levite

Consecrated here echoes the exact same word used for Micah's own son back in verse five.

It does not seem to matter to Micah whether the priest is family or a hired stranger.

What matters to him is simply having someone who looks like a proper priest.

The role is being treated like decoration, not calling.

🕊️ Consecrated repeats the word from verse five
🔁 Micah swaps his son for this stranger
🎭 Having the look of a priest is enough
➡️ The role becomes decoration, not calling

## 🙏 Now Know I That The LORD Will Do Me Good

Micah says this with real confidence, not doubt.

He believes hiring an official sounding priest guarantees God's blessing on his household.

Nothing in this arrangement reflects true covenant faithfulness to God's actual instructions.

Micah has built a religion that makes him feel secure.

At the same time, it breaks almost everything God commanded.

That confidence is the real danger of this whole chapter.

🙏 Micah expects guaranteed blessing
🎭 A proper looking priest feels like proof
❌ None of this reflects real obedience
📖 False confidence is the chapter's real danger
`.trim();

export const JUDGES_SEVENTEEN_PERSONAL_SECTIONS = parseJudgesSeventeenRawNotes(JUDGES_SEVENTEEN_RAW_NOTES);
