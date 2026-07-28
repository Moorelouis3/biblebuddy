export type LeviticusTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentySixRawNotes(rawText: string): LeviticusTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 26:${startVerse}` : `Leviticus 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Leviticus 26 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_SIX_RAW_NOTES = `# Leviticus 26:1-2
# 🚫 No Idols, Only The LORD
---
## 🗿 Ye Shall Make You No Idols Nor Graven Image
An "idol" is a false god people worship instead of the real one. A "graven image" is a carved statue - the word "graven" means cut or carved into wood or stone. Both are banned before this chapter's list of blessings and curses even starts, because loyalty to God alone is the foundation everything else stands on.
🗿 "Graven" means carved or cut into stone or wood
🚫 Bans worshiping anything false, not just certain statues
🏛️ Comes first because it is the foundation of everything after
---
## 🪨 Neither Rear You Up A Standing Image... Image Of Stone
A "standing image" was an upright stone pillar set up as a monument. Jacob himself set up stone pillars earlier in Genesis as simple markers and memorials - the problem is not the stone, it is Canaanite religion turning that same kind of pillar into an object people bowed down to and worshiped.
🪨 A "standing image" is an upright stone pillar or marker
📖 Jacob used similar pillars in Genesis just as memorials
⚠️ The danger is worshiping the object, not building it
---
## 🙏 Ye Shall Keep My Sabbaths, And Reverence My Sanctuary
"Sabbaths" means the regular days and years of rest already commanded earlier in this book. "Reverence my sanctuary" means treat the tabernacle, God's dwelling place among them, with real respect instead of careless familiarity.
🙏 "Sabbaths" refers to the rest days and years already commanded
⛺ "Sanctuary" means the tabernacle, God's dwelling place
🎯 Pairs right worship with right rest as one command
---
## 🎙️ For I Am The LORD Your God
This short phrase closes the opening command and will return again and again through this chapter, at the end of both blessing and curse. It is not decoration - it is the reason behind every rule that follows, whatever the rule turns out to be.
🎙️ A recurring closing tag used throughout Leviticus
🔁 Will return at key turning points through this whole chapter
🎯 Grounds obedience in who God is, not just what is fair

# Leviticus 26:3-6
# 🌧️ Rain, Harvest, And Peace
---
## 📜 If Ye Walk In My Statutes, And Keep My Commandments, And Do Them
This verse uses three separate verbs on purpose - walk, keep, and do. It is not enough to know the law or even agree with it; the blessings that follow depend on actually living it out day to day.
📜 Three separate verbs: walk, keep, and do
🚶 "Walk" pictures ongoing daily practice, not a single choice
✅ Knowing or agreeing with a law was never the same as doing it
---
## 🌧️ I Will Give You Rain In Due Season
Israel's farms depended entirely on rainfall at the right times, unlike Egypt, where the Nile River flooded predictably every year regardless of rain. A promise of rain "in due season" is a promise of the one resource Israelite farmers could never control or guarantee themselves.
🌧️ Israel's farming depended on rain, not a reliable river
🇪🇬 Unlike Egypt, whose Nile flooded on its own schedule
🎯 A promise of the one thing farmers could not control themselves
---
## 🌾 The Land Shall Yield Her Increase... Trees... Yield Their Fruit
"Increase" means harvest or produce. This covers both grain fields and fruit orchards, promising success across every kind of farming the people depended on for food.
🌾 "Increase" means harvest or crop yield
🌳 Covers both grain fields and fruit trees together
🍽️ A promise touching the whole food supply, not just one crop
---
## 🌾 Your Threshing Shall Reach Unto The Vintage
"Threshing" is separating grain from stalks after the spring harvest. "Vintage" is the grape harvest, which normally came later in the year. Promising threshing would still be going when grape season began means the grain harvest would be so large it overflowed its normal timeframe.
🌾 "Threshing" means separating grain from the stalk
🍇 "Vintage" is the grape harvest, later in the calendar
⏳ Threshing overflowing into vintage signals overwhelming abundance
---
## 🍇 The Vintage Shall Reach Unto The Sowing Time
The same overlap repeats going the other direction - grape harvesting would still be underway when it was already time to plant next season's seed. The farming calendar itself would be too full of good harvests to keep its normal pace.
🍇 Grape harvest overlapping into the next planting season
🔁 Mirrors the same overlap idea from the verse just before
📈 A calendar too full of abundance to move at its normal pace
---
## 🍞 Eat Your Bread To The Full, And Dwell In Your Land Safely
This is the plain, human payoff behind all the farming language - genuine abundance at the table, not rationed scraps, plus the security to actually stay put and enjoy it without fear.
🍞 "To the full" means real abundance, not rationing
🏡 "Safely" adds security to go with the food supply
🎯 The plain human payoff behind the farming promises above
---
## ☮️ I Will Give Peace In The Land... None Shall Make You Afraid
"Peace" here means more than the absence of war - it means a settled life where daily fear of attack simply is not part of how people live.
☮️ "Peace" means a settled life, not just no active war
😌 Daily fear of attack removed from ordinary life
🏡 Sets up the specific fears named in the rest of the verse
---
## 🐺 I Will Rid Evil Beasts Out Of The Land
Dangerous wild animals were a real, constant threat to both people and livestock in the ancient world, not a minor inconvenience. Removing them entirely was a serious, practical blessing, not a throwaway line.
🐺 Wild predators were a genuine daily danger, not a small worry
🐑 Protected both people and livestock together
🎯 A real practical blessing, not filler alongside bigger promises
---
## ⚔️ Neither Shall The Sword Go Through Your Land
"The sword going through the land" is a way of describing invasion and war passing through Israel's territory. This closes the peace promise by naming the worst-case fear directly: no foreign army marching through, killing and destroying as it goes.
⚔️ "The sword" pictures invasion and war moving through the land
🎯 Names the worst-case fear directly instead of staying vague
🏡 Completes the full picture of peace begun earlier in the verse

# Leviticus 26:7-10
# ⚔️ Victory And Abundance
---
## 🗡️ Ye Shall Chase Your Enemies, And They Shall Fall Before You By The Sword
This moves from defense to offense - not just safety from attack, but active victory whenever conflict does come. Enemies would not just fail to win; they would be routed.
🗡️ Moves from staying safe to winning outright
🏃 Enemies fleeing, not just failing to attack
🎯 A promise of active victory, not passive protection
---
## 🔢 Five Of You Shall Chase An Hundred
Five soldiers driving off a hundred enemies is a ratio of one to twenty - already a lopsided, supernatural kind of victory far beyond normal battlefield odds.
🔢 A ratio of one Israelite to twenty enemies
💪 Already far beyond normal battlefield odds
🎯 Sets up an even bigger ratio in the very next line
---
## 🔢 An Hundred Of You Shall Put Ten Thousand To Flight
The ratio jumps again - a hundred fighters routing ten thousand is one to a hundred, five times more lopsided than the previous verse's ratio. The math is not meant to add up normally; it pictures strength that multiplies far beyond ordinary numbers when God fights for His people.
🔢 A ratio of one to a hundred, five times steeper than before
🧮 The jump is deliberate, not a math error
🙏 Pictures strength multiplying beyond ordinary numbers with God's help
---
## 🙏 I Will Have Respect Unto You, And Make You Fruitful, And Multiply You
"Have respect unto" means God will look on them with favor. "Fruitful" and "multiply" echo the very first blessing given to humanity back in Genesis 1, now promised specifically to this obedient nation.
🙏 "Respect" here means favor, not politeness
👪 "Fruitful" and "multiply" echo Genesis 1's first blessing
🔗 Applies humanity's original blessing to this specific nation
---
## 🤝 Establish My Covenant With You
A covenant is a binding agreement with obligations on both sides. "Establish" means confirm and make firm, not create something brand new - this points back to the covenant already made with Abraham, now kept in force through Israel's obedience.
🤝 A "covenant" is a binding agreement, not a casual promise
✅ "Establish" means confirm, not start something new
📖 Points back to the earlier covenant made with Abraham
---
## 📦 Ye Shall Eat Old Store, And Bring Forth The Old Because Of The New
This pictures granaries so overflowing with grain that last year's surplus still has not been used up by the time this year's fresh harvest comes in - old stock has to be cleared out to make room for the new.
📦 Granaries so full old grain remains unused a year later
🌾 Old surplus has to be cleared to make room for the new
🎯 A vivid image of abundance beyond what the last section named

# Leviticus 26:11-13
# ⛺ God Will Dwell Among You
---
## ⛺ I Will Set My Tabernacle Among You
The tabernacle was the portable tent-sanctuary where God's presence dwelled among Israel during the wilderness years. This promises not just distant blessing but God's own presence physically located in the camp.
⛺ The tabernacle was God's portable dwelling place
📍 Promises presence, not just blessing from a distance
🎯 The most personal promise in the whole blessing list so far
---
## 😌 My Soul Shall Not Abhor You
"Abhor" means to hate with disgust, a strong word. This exact phrase will return later in the chapter describing the opposite outcome - so this promise is deliberately setting up a contrast the reader will feel by the time the curses arrive.
😌 "Abhor" means to hate with disgust, a strong word
🔗 The same exact phrase returns later, but reversed
⚠️ Deliberately sets up the contrast waiting later in the chapter
---
## 🚶 I Will Walk Among You
This language echoes Genesis, where God walked in the garden with Adam and Eve before sin broke that closeness. The same kind of nearness is promised again here, this time through obedience instead of an unbroken beginning.
🚶 Echoes God walking with Adam and Eve in Eden
🔗 The same closeness offered again, through obedience this time
🎯 A callback most readers would otherwise miss
---
## 🤝 Ye Shall Be My People
"I will be your God, and you will be my people" is the core covenant formula repeated throughout the Old Testament. It is the simplest possible summary of the whole relationship this entire law code is meant to protect.
🤝 The core covenant formula repeated across the Old Testament
📖 Appears again and again in later books
🎯 The simplest possible summary of the whole relationship
---
## 🇪🇬 Which Brought You Forth Out Of The Land Of Egypt
Every command in this chapter sits on top of this one historical fact - God had already rescued them once, for free, before ever asking anything of them. Obedience was always a response to rescue, not a way of earning it.
🇪🇬 The historical fact every command in this chapter rests on
🎁 Rescue came first, before any command was given
🎯 Obedience was a response to rescue, not a way to earn it
---
## ⛓️ That Ye Should Not Be Their Bondmen
"Bondmen" means slaves, people owned as property by someone else. This states plainly what they were rescued from - not just hardship in general, but literal forced slavery under Egypt.
⛓️ "Bondmen" means people owned as property
🇪🇬 States plainly what they were actually rescued from
🎯 Not vague hardship, but literal slavery
---
## 🔓 I Have Broken The Bands Of Your Yoke
A "yoke" is the wooden crossbar laid across an animal's neck to force it to pull a load. Calling it "your yoke" pictures Israel itself as a beast of burden under Egypt, now set free from a bar that had been forcing them to labor.
🔓 A "yoke" is the wooden crossbar used to force an animal to labor
🐂 Pictures Israel itself as a burden-bearing animal under Egypt
🎯 "Broken" means the forced labor itself has ended completely
---
## 🚶 Made You Go Upright
Someone forced to labor under a yoke walks bent low under the weight. "Go upright" pictures the opposite - walking with head held high, in dignity, no longer bowed down by forced labor.
🚶 A yoke-bearer walks bent low under the weight
😔 Slavery is pictured here as a physically bowed-down posture
🎯 "Upright" means restored dignity, not just physical freedom

# Leviticus 26:14-17
# 😨 The Curses Begin
---
## 👂 But If Ye Will Not Hearken Unto Me
"Hearken" means more than simply hearing - it means listening in a way that leads to obeying. This one word marks the sharp turn from blessing to curse for the rest of the chapter.
👂 "Hearken" means listening in a way that leads to obedience
🔄 Marks the sharp turn from blessing to curse
🎯 Simply hearing words was never the actual issue
---
## 😤 If Ye Shall Despise My Statutes
"Despise" means to look down on something as worthless, not just to disagree with it. This describes active contempt for God's law, not honest confusion or struggle to keep it.
😤 "Despise" means treating something as worthless
🚫 Describes active contempt, not honest struggle
🎯 A much stronger word than simple disagreement
---
## 😖 Your Soul Abhor My Judgments
"Abhor" is the exact same strong word used earlier for what God's soul would not do toward them if they obeyed. Here it flips - now their own soul does the abhorring, aimed back at God's law instead of the other way around.
😖 The same strong word ("abhor") used earlier, now reversed
🔄 Their soul now abhors, instead of God's soul abhorring them
🎯 A deliberate mirror image of verse 11's promise
---
## 💔 Break My Covenant
A covenant is a binding two-sided agreement. "Break" it means walking away from the obligations they had already agreed to, not simply falling short of a standard by accident.
💔 A covenant is a two-sided binding agreement
🚫 "Break" means walking away, not accidentally falling short
🎯 The most serious possible description of the offense
---
## 😱 I Will Appoint Over You Terror
"Terror" here is a specific, appointed condition - constant fear and dread hanging over daily life, not just occasional bad luck. God names it directly as the first consequence.
😱 "Terror" means constant dread hanging over daily life
🎯 Named directly as the very first consequence listed
📉 Not occasional bad luck, but an ongoing condition
---
## 🤒 Consumption, And The Burning Ague
"Consumption" is an old name for a wasting disease that slowly destroys the body, similar to what is now called tuberculosis. "Ague" is an old word for a recurring fever, complete with chills and shaking.
🤒 "Consumption" is an old term for a wasting, body-destroying disease
🌡️ "Ague" is an old word for a recurring fever with chills
📖 Both were common, dreaded illnesses in the ancient world
---
## 👁️ Consume The Eyes, And Cause Sorrow Of Heart
These illnesses would visibly waste away the body, even affecting eyesight, while also crushing emotional strength. Physical sickness and mental despair are named together, as two sides of the same suffering.
👁️ Physical sickness described as affecting even the eyes
💔 "Sorrow of heart" names emotional despair alongside illness
🎯 Body and mind suffering together, not separately
---
## 🌾 Ye Shall Sow Your Seed In Vain, For Your Enemies Shall Eat It
This directly reverses the earlier promise of overflowing harvests. Now the labor of planting still happens, but the harvest itself is stolen by enemies before the farmer ever benefits from it.
🌾 A direct reversal of the earlier harvest blessing
😔 Work still happens, but the reward is taken away
🎯 Enemies eating the crop instead of the family who planted it
---
## 😠 I Will Set My Face Against You
God's face turning toward someone in blessing is a common Old Testament image, most familiar from the priestly blessing in Numbers 6. Here it flips completely - God's face is now actively set against them instead of shining on them.
😠 God's face is normally pictured shining in blessing
📖 Echoes the priestly blessing from Numbers 6, reversed
🎯 Active opposition, not just withdrawn favor
---
## 🗡️ Ye Shall Be Slain Before Your Enemies... Reign Over You
Military defeat is followed by political domination - not just losing battles, but actually living under the control of the very nations they once feared or defeated in verse 8.
🗡️ Military defeat leading into political domination
🔄 A reversal of the victory promised earlier in the chapter
🎯 Losing control over their own nation entirely
---
## 🏃 Ye Shall Flee When None Pursueth
This describes pure paranoia - running in fear even when no actual enemy is chasing them. Guilt and dread become so overwhelming that imagined danger feels just as real as an actual attack.
🏃 Running in fear from a threat that is not actually there
😰 Guilt and dread making imagined danger feel completely real
🔗 This exact phrase returns again later in the chapter

# Leviticus 26:18-20
# 🔢 Seven Times Over
---
## 🔢 I Will Punish You Seven Times More For Your Sins
"Seven times more" is a formula this chapter repeats four separate times as the curses escalate, each repetition marking a new, more severe level of discipline after the previous level still did not bring the people back.
🔢 A repeated formula, appearing four times in this chapter
📈 Each repetition marks an escalating, more severe level
⏳ Discipline builds only after the previous level went unheeded
---
## 💪 I Will Break The Pride Of Your Power
"Pride of power" describes confidence in military strength and national ability to defend or provide for themselves. Breaking it means stripping away that self-reliant confidence entirely.
💪 "Pride of power" means confidence in their own strength
🚫 Describes stripping that self-confidence away completely
🎯 Targets their sense of security in themselves, not just crops
---
## ⛓️ I Will Make Your Heaven As Iron, And Your Earth As Brass
This is drought pictured as vividly as possible - a sky like solid iron, through which no rain can ever fall, over ground like hardened brass, in which nothing can ever grow. Both farming essentials fail completely at once.
⛓️ "Iron" heaven pictures a sky rain can never break through
🥉 "Brass" earth pictures ground too hardened to grow anything
🌾 Both essential farming conditions failing at the same time
---
## 💪 Your Strength Shall Be Spent In Vain
All the physical labor of farming would happen exactly as before, but produce nothing - effort without any result at all, echoing the "sow in vain" idea from the previous section.
💪 Full effort put in, with nothing at all to show for it
🔗 Echoes the "sow in vain" idea from the previous section
🎯 Labor itself is not punished; its usefulness is removed
---
## 🌾 Your Land Shall Not Yield Her Increase, Neither Shall The Trees... Yield Their Fruits
This is a direct, word-for-word reversal of the blessing promised in verse 4 - the exact same language, now describing total agricultural failure instead of abundance.
🌾 A direct reversal of the exact promise made in verse 4
🔄 Same wording, opposite outcome
🎯 Total failure across both fields and orchards together

# Leviticus 26:21-22
# 🐺 Wild Beasts
---
## ↔️ If Ye Walk Contrary Unto Me
"Contrary" becomes this chapter's key word from here forward, used repeatedly to describe deliberate, ongoing resistance rather than a single mistake - walking in the opposite direction from where God is leading, on purpose.
↔️ "Contrary" becomes a key repeated word from here forward
🚶 Pictures deliberate resistance, not one accidental slip
🔁 Will keep returning through the rest of the chapter
---
## 🔢 I Will Bring Seven Times More Plagues Upon You
The second use of the "seven times" escalation formula, now applied to "plagues" broadly - a general term covering any kind of disaster or affliction, not naming one specific type yet.
🔢 The second use of the escalating "seven times" formula
🌍 "Plagues" here is a broad term, not one specific disaster
📈 Marks another step up from the previous level of discipline
---
## 🐺 I Will Also Send Wild Beasts Among You
This directly reverses the earlier promise in verse 6 to remove dangerous wild animals from the land. What was once a protection becomes a threat instead.
🐺 A direct reversal of the promise made in verse 6
🔄 Protection removed and turned into an active danger
🎯 Shows the same blessing named earlier, now undone
---
## 👶 Which Shall Rob You Of Your Children, And Destroy Your Cattle
The threat targets both a family's most precious relationships and their basic economic survival at the same time - children and livestock named together as what stands to be lost.
👶 Targets both family and livelihood in the same breath
🐄 Cattle represented a family's basic economic survival
🎯 Two very different kinds of loss named side by side
---
## 🛣️ Make You Few In Number; And Your High Ways Shall Be Desolate
"High ways" means the main roads used for travel and trade. Empty, unused roads picture a land so devastated and depopulated that normal travel, trade, and even pilgrimage to the tabernacle simply stop happening.
🛣️ "High ways" means the main roads used for travel and trade
🚶 Empty roads picture a devastated, depopulated land
🎯 Even ordinary travel and trade come to a stop

# Leviticus 26:23-26
# 🗡️ Siege And Famine
---
## 🔄 If Ye Will Not Be Reformed By Me By These Things
"Reformed" means corrected or changed for the better. The question is whether the discipline itself is working as intended - producing a change of heart - or simply being endured without any real turning back.
🔄 "Reformed" means corrected or genuinely changed
❓ Asks whether the discipline is producing real change
⏳ Sets up whether this cycle of escalation continues or not
---
## ↔️ Then Will I Also Walk Contrary Unto You
The same word "contrary" used of the people earlier in the chapter is now turned back around and applied to God's own response - He mirrors their own defiance back at them rather than inventing a separate punishment.
↔️ The same "contrary" language, now describing God's response
🪞 Pictures God mirroring their own defiance back at them
🎯 The punishment matches the shape of the original offense
---
## 🔢 I... Will Punish You Yet Seven Times For Your Sins
The third use of the "seven times" formula, confirming the escalation continues to climb with no sign yet of the people turning back.
🔢 The third use of the repeated "seven times" formula
📈 Confirms the escalation is still climbing
🎯 No turning back has happened yet at this stage
---
## ⚔️ I Will Bring A Sword Upon You, That Shall Avenge The Quarrel Of My Covenant
"Quarrel of my covenant" pictures the broken covenant almost like a legal lawsuit - the sword enforces the consequences the covenant itself had already warned about, like a judgment being carried out.
⚔️ "Quarrel" pictures the broken covenant like a legal dispute
📜 The sword enforces what the covenant already warned about
🎯 Judgment being carried out, not random violence
---
## 🏙️ When Ye Are Gathered Together Within Your Cities, I Will Send The Pestilence
Fleeing to walled cities for safety during an invasion actually backfires here - crowding everyone together inside city walls made disease spread much faster than it would among scattered rural households.
🏙️ Crowding into cities for safety instead speeds up disease
🦠 "Pestilence" means a fast-spreading, deadly epidemic
🎯 The very shelter meant to protect them makes things worse
---
## 🤲 Ye Shall Be Delivered Into The Hand Of The Enemy
"Delivered into the hand of" is a common Old Testament idiom for total defeat and being placed under someone else's total control, used often throughout Israel's later history of conquest.
🤲 "Into the hand of" is a common Old Testament idiom
🏳️ Pictures total defeat and complete loss of control
📖 A phrase repeated often in Israel's later history
---
## 🍞 When I Have Broken The Staff Of Your Bread
"Staff" here means a support you lean on for strength, and "staff of bread" is an idiom for bread as life's basic support system. Breaking it means the most fundamental food supply itself gives way completely.
🍞 "Staff" means something you lean on for support
🥖 "Staff of bread" is an idiom for bread as basic life-support
🎯 Describes total food-supply collapse, not minor shortage
---
## 👩‍🍳 Ten Women Shall Bake Your Bread In One Oven
Normally each household baked its own bread in its own oven. Ten families sharing a single oven pictures famine so severe that fuel and grain had both become too scarce for anyone to bake separately anymore.
👩‍🍳 Normally, each household had and used its own oven
🔥 Ten households sharing one oven pictures extreme scarcity
🌾 Both fuel and grain had become too scarce to use separately
---
## ⚖️ Deliver You Your Bread Again By Weight
Bread handed out "by weight" instead of freely available means strict rationing - small, carefully measured portions instead of the normal, generous supply a family could count on.
⚖️ "By weight" means strict rationing, not free supply
📏 Small, carefully measured portions instead of normal amounts
🎯 A vivid picture of famine-level food scarcity
---
## 😔 Ye Shall Eat, And Not Be Satisfied
This directly reverses the earlier blessing of eating "to the full." Now food exists in some small amount, but never enough to actually feel fed or secure.
😔 A direct reversal of the earlier "eat to the full" promise
🍽️ Some food exists, but never enough to feel truly fed
🔄 Same idea from verse 5, flipped into its opposite

# Leviticus 26:27-31
# 💀 The Horror Of Total Covenant Breach
---
## ↔️ And If Ye Will Not For All This Hearken Unto Me, But Walk Contrary Unto Me
This is the fourth and final warning cycle, repeating the same "hearken... contrary" language used at each earlier turning point, before the chapter's most severe consequences are described.
↔️ The fourth and final warning cycle in the chapter
🔁 Repeats the same language from each earlier turning point
⚠️ Sets up the most severe consequences yet to come
---
## 😡 Then I Will Walk Contrary Unto You Also In Fury
"Fury" marks an intensified tone compared to the earlier uses of "contrary" - not simply matching their defiance anymore, but doing so with visible, burning anger.
😡 "Fury" marks a sharper, more intense tone than before
🔥 Not just matching defiance, but doing so in visible anger
📈 The emotional intensity itself is escalating, not just the punishment
---
## 🔢 I, Even I, Will Chastise You Seven Times For Your Sins
The fourth and final use of the "seven times" formula, doubled for emphasis with "I, even I" - underlining that this final, worst level of discipline comes directly and personally from God, not by accident.
🔢 The fourth and final use of the "seven times" formula
🎯 "I, even I" doubles the emphasis on purpose
😨 Marks this as the chapter's absolute worst level of discipline
---
## 😱 Ye Shall Eat The Flesh Of Your Sons, And... Daughters
This describes cannibalism during a prolonged siege, the single most horrifying result of total famine. Later Old Testament history records this exact horror actually happening during real sieges of Israelite cities, showing this warning was not exaggeration.
😱 Describes cannibalism during a prolonged siege
📖 Later history records this exact horror actually happening
🎯 The single most extreme consequence in the entire chapter
---
## 🏔️ I Will Destroy Your High Places
"High places" were hilltop or elevated worship sites, often used for idol worship even by people who claimed to also worship the true God. Destroying them removes every rival place of worship across the land.
🏔️ "High places" were elevated, often idolatrous worship sites
⚠️ Sometimes used even by people who claimed to worship God too
🎯 Removes every rival place of worship across the whole land
---
## 🪵 Cut Down Your Images
"Images" here refers to carved wooden poles or figures used in idol worship, often associated with the goddess Asherah in Canaanite religion. Cutting them down destroys the physical objects of false worship completely.
🪵 "Images" here means carved wooden idol poles or figures
🕎 Often connected to Asherah worship in Canaanite religion
🚫 Destroys the physical objects of false worship
---
## 💀 Cast Your Carcases Upon The Carcases Of Your Idols
This deliberately defiles the very idols the people had worshiped by piling human corpses on top of them - a graphic way of proving those idols had no real power to protect anyone, including their own worshipers.
💀 Human corpses deliberately piled on top of destroyed idols
⚠️ A graphic proof the idols had no real protective power
🎯 Even their own worshipers could not be saved by them
---
## 😖 My Soul Shall Abhor You
This is the exact same word promised not to happen back in verse 11 - now stated as actually occurring. The chapter's earlier hopeful promise and this later warning are meant to be read side by side.
😖 The exact reversal of the promise made in verse 11
🔄 Same strong word, now describing the opposite outcome
🎯 Meant to be read directly against that earlier promise
---
## 🏚️ I Will Make Your Cities Waste, And Bring Your Sanctuaries Unto Desolation
"Sanctuaries" here means local worship sites and shrines throughout the land, not just the one central tabernacle. Every place people gathered to worship, true or false, would be left in ruins.
🏚️ "Sanctuaries" means local worship sites, not just the tabernacle
🌍 Covers every worship location across the whole land
💔 Total ruin, not just the destruction of one building
---
## 👃 I Will Not Smell The Savour Of Your Sweet Odours
Smelling the smoke of a sacrifice was the Old Testament's picture of God accepting and receiving an offering. Refusing to smell it means refusing to accept their worship at all - even sincere-looking sacrifices would no longer be received.
👃 Smelling sacrifice-smoke pictured God accepting an offering
🚫 Refusing to smell it means refusing their worship entirely
🎯 Even outwardly proper sacrifices would not be accepted

# Leviticus 26:32-35
# 🏜️ The Land Gets Its Rest
---
## 🏜️ I Will Bring The Land Into Desolation
"Desolation" means left empty and ruined, uninhabited and unproductive. This zooms out from individual disasters to describe the entire land's condition after everything already listed has happened.
🏜️ "Desolation" means left empty, ruined, and unproductive
🌍 Zooms out to describe the whole land's final condition
🎯 The summary result of everything listed earlier in the chapter
---
## 😲 Your Enemies Which Dwell Therein Shall Be Astonished At It
Even the foreign nations who conquer and move into the land will be shocked at how thoroughly devastated it has become - the destruction is severe enough to stun even the people who caused it.
😲 Even the conquerors themselves react with shock
🌍 The devastation is severe enough to stun outsiders too
🎯 A detail that makes the desolation feel even more extreme
---
## 🌍 I Will Scatter You Among The Heathen
"Heathen" is an old word for foreign, non-Israelite nations. "Scatter" describes exile - not staying together as a captive group in one place, but being spread out and dispersed across many different foreign lands.
🌍 "Heathen" is an old word for foreign, non-Israelite nations
🔀 "Scatter" pictures exile spread across many places, not one
📖 A direct, specific prediction of Israel's later exile
---
## ⚔️ Will Draw Out A Sword After You
Even scattered into exile, ongoing danger and violence would still follow them - exile does not mean the threats named earlier simply stop; it changes their location instead.
⚔️ Danger continues to follow even into exile
🌍 Exile changes location, but does not remove all threat
🎯 The consequences reach even beyond the borders of Israel itself
---
## 🏚️ Your Land Shall Be Desolate, And Your Cities Waste
This repeats and confirms the desolation already described, now specifically tied to the scattering just mentioned - an empty land left behind while its people are exiled far away.
🏚️ Repeats and confirms the desolation described earlier
🔗 Now specifically tied to the scattering just described
🏡 An empty homeland left behind while its people are exiled
---
## 😴 Then Shall The Land Enjoy Her Sabbaths, As Long As It Lieth Desolate
This directly recalls the sabbatical-year law from the previous chapter - the land finally gets the regular rest years it had been denied, once there is no one left in it to keep farming through them.
😴 Directly recalls the sabbatical-year law from chapter 25
🌾 The land finally receives the rest years it was denied
🔗 Only possible once no one remains to keep farming it
---
## 🌍 Ye Be In Your Enemies' Land; Even Then Shall The Land Rest
While the people suffer in a foreign land far from home, the land they left behind experiences the very rest that obedience should have provided all along - a bittersweet detail, since the rest finally comes only through their absence.
🌍 The people suffer abroad while their land rests at home
😔 Bittersweet, since rest only comes through their absence
🔗 Ties the people's exile directly to their land's healing
---
## 📊 As Long As It Lieth Desolate It Shall Rest; Because It Did Not Rest In Your Sabbaths
This draws a direct cause-and-effect line between the length of exile and however many sabbatical years had been ignored while they lived there. Later in the Old Testament, the seventy-year Babylonian exile is explicitly said to match exactly the number of sabbath years Israel had skipped.
📊 Draws a direct link between exile length and skipped sabbaths
📖 Later fulfilled exactly in the seventy-year Babylonian exile
🎯 Shows this warning was not vague - it came true precisely

# Leviticus 26:36-39
# 🍃 Fear In The Land Of Enemies
---
## 😰 Upon Them That Are Left Alive Of You I Will Send A Faintness Into Their Hearts
"Faintness" describes a crippling, constant anxiety - not ordinary fear that comes and goes, but a heavy dread that never fully lifts, affecting even the survivors who made it through everything already described.
😰 "Faintness" means a crippling, ongoing anxiety
💔 Not ordinary fear, but dread that never fully lifts
🎯 Affects even the survivors who made it through the worst
---
## 🍃 The Sound Of A Shaken Leaf Shall Chase Them
This pictures extreme, irrational paranoia - people so consumed by dread that even the small rustle of a leaf in the wind is enough to send them running in terror, as if it were an actual attacker.
🍃 Even a rustling leaf is enough to trigger blind panic
😨 Pictures paranoia completely disconnected from real danger
🎯 One of the most vivid images in the entire chapter
---
## 🏃 They Shall Flee, As Fleeing From A Sword; And They Shall Fall When None Pursueth
This repeats the exact phrase used earlier in the chapter describing fleeing from imaginary threats - the same paranoia named before has now grown even more extreme among those left in exile.
🏃 Repeats the exact phrase used earlier in verse 17
🔗 Shows the same fear has grown even more extreme in exile
😨 Panic and collapse with no real threat actually present
---
## 💥 They Shall Fall One Upon Another, As It Were Before A Sword, When None Pursueth
The panic becomes so widespread that people trample and collide with each other while fleeing a danger that does not exist - chaos caused entirely by fear itself, not by any actual enemy.
💥 People trample each other fleeing an imaginary threat
😱 Chaos caused entirely by fear, with no real enemy present
🎯 Shows how deeply guilt and dread had taken hold
---
## 🛡️ Ye Shall Have No Power To Stand Before Your Enemies
Beyond the paranoia, real military weakness would remain too - even in situations calling for actual defense, there would be no strength left to hold any ground at all.
🛡️ Describes genuine military weakness, not just fear
⚔️ Even real threats could no longer be resisted
🎯 Paranoia and actual defeat named together
---
## 🌍 Ye Shall Perish Among The Heathen, And The Land Of Your Enemies Shall Eat You Up
"Eat you up" is an idiom picturing the foreign land itself as something that consumes and destroys those living in it - exile pictured not as a neutral relocation but as an actively hostile, devouring environment.
🌍 "Eat you up" pictures the foreign land as actively hostile
💀 Exile shown as devouring, not just a neutral relocation
🎯 A vivid idiom, not a literal claim about the land itself
---
## 📉 They That Are Left Of You Shall Pine Away In Their Iniquity
"Pine away" is an old phrase meaning to waste away slowly, both physically and emotionally, over a long period of time rather than all at once. "Iniquity" means sin or guilt.
📉 "Pine away" means wasting away slowly, not all at once
⏳ Describes a long, gradual decline rather than sudden loss
📖 "Iniquity" means sin or guilt weighing on them
---
## 👪 Also In The Iniquities Of Their Fathers Shall They Pine Away With Them
This is not about being punished for a parent's sin directly - it describes continuing in the very same patterns of sin passed down from earlier generations, so the consequences of those patterns keep compounding across time.
👪 Not punishment for someone else's sin directly
🔁 Describes continuing the same sin-patterns across generations
📈 Consequences compound the longer a pattern repeats unaddressed

# Leviticus 26:40-45
# 🕊️ If They Confess: God Remembers His Covenant
---
## 🗣️ If They Shall Confess Their Iniquity, And The Iniquity Of Their Fathers
"Confess" means to openly admit wrongdoing, not just feel bad privately. This marks the turning point of the whole chapter - the first condition given for the discipline finally ending.
🗣️ "Confess" means openly admitting wrongdoing, not just regret
🔄 Marks the chapter's turning point toward restoration
👪 Includes owning up to generational patterns, not just personal sin
---
## ⚖️ With Their Trespass Which They Trespassed Against Me
"Trespass" means a violation or offense against someone. Repeating the word twice in one phrase emphasizes taking full ownership of the wrong done, not just acknowledging that something bad happened in general.
⚖️ "Trespass" means a violation or offense against someone
🔁 Repeating the word emphasizes full ownership of the wrong
🎯 Specific responsibility, not vague acknowledgment
---
## ↔️ That Also They Have Walked Contrary Unto Me
This is the final use of "contrary" describing the people themselves, completing a pattern used repeatedly through the chapter - the word that described their defiance now becomes part of their own honest confession.
↔️ The final use of "contrary" describing the people themselves
🔁 Completes a pattern repeated throughout the whole chapter
🗣️ The defiance-word becomes part of their honest confession
---
## 🪞 And That I Also Have Walked Contrary Unto Them
God openly acknowledges mirroring their own defiance back at them throughout the punishment - naming the discipline plainly as matched to the offense, not random or excessive.
🪞 God openly acknowledges mirroring their behavior back
⚖️ Names the punishment as matched to the offense, not random
🎯 Honesty about the shape of the discipline, not just its cause
---
## 🌍 Have Brought Them Into The Land Of Their Enemies
This restates the exile already described earlier, now specifically framed as the setting where genuine confession and change becomes possible - not the end of the story, but the turning point within it.
🌍 Restates the exile already described earlier in the chapter
🔄 Reframed here as the setting for possible change
🎯 Not the end of the story, but a turning point within it
---
## 💔 If Then Their Uncircumcised Hearts Be Humbled
"Uncircumcised heart" is an idiom, not a literal physical description - it pictures a heart that has not been set apart for God, still resistant and unresponsive. "Humbled" means that resistance finally breaking down.
💔 "Uncircumcised heart" is an idiom, not a literal description
🚫 Pictures a heart still resistant, not set apart for God
🎯 "Humbled" means that resistance finally breaking down
---
## ✅ They Then Accept Of The Punishment Of Their Iniquity
This describes owning the consequences as fair and deserved, rather than resenting them or blaming God - a genuine change in how they understand everything that has happened.
✅ Accepting consequences as fair, not resented or blamed on God
🔄 A genuine shift in how they understand what happened
🎯 The internal change confession is meant to reflect
---
## 📖 Then Will I Remember My Covenant With Jacob, And Also My Covenant With Isaac, And Also My Covenant With Abraham
These three names are listed backwards from the usual order - normally Abraham comes first, then Isaac, then Jacob. Naming them in reverse here works backward through the generations, as if tracing the promise back to its very beginning.
📖 Listed in reverse of the usual Abraham-Isaac-Jacob order
🔙 Works backward through the generations to the promise's start
🎯 A deliberate literary detail easy to miss in English
---
## 🌍 I Will Remember The Land
"Remember" does not mean God had forgotten - it means God will act on a promise that had appeared inactive. The land itself, not just the people, is included in what gets restored.
🌍 "Remember" means acting on a promise, not recalling a memory
🔗 The land itself is included in what gets restored
🎯 Ties the people's restoration to their homeland's restoration
---
## 🏜️ The Land Also Shall Be Left Of Them, And Shall Enjoy Her Sabbaths, While She Lieth Desolate
This restates the earlier point about the land's rest, now placed alongside the promise of eventual restoration - the desolation was never described as permanent, only as lasting exactly as long as it needed to.
🏜️ Restates the earlier point about the land finally resting
⏳ Placed here beside the promise of eventual restoration
🎯 Desolation shown as temporary, not a permanent end
---
## 😔 They Shall Accept Of The Punishment Of Their Iniquity: Because... They Despised My Judgments, And... Abhorred My Statutes
This repeats the exact language used back in verse 15 to describe the original offense, now closing the loop by naming the same specific attitudes that started this entire cycle in the first place.
😔 Repeats the exact language from the original offense in verse 15
🔁 Closes the loop by naming the same root attitudes
🎯 Ties the ending directly back to the chapter's beginning
---
## 🙏 And Yet For All That, When They Be In The Land Of Their Enemies, I Will Not Cast Them Away
Despite everything already described, God commits here to not fully abandoning them - even at their lowest point, complete rejection is explicitly ruled out.
🙏 A firm commitment despite everything described so far
🚫 Complete abandonment is explicitly ruled out
🎯 Even at their lowest point, the relationship is not ended
---
## 😌 Neither Will I Abhor Them, To Destroy Them Utterly
This is the same strong word "abhor" used earlier for what God's soul would do toward them - but here it stops short of the worst possible outcome, total destruction, even after everything already described.
😌 The same strong word "abhor" used earlier in the chapter
🛑 Stops short of total destruction, even at this point
🎯 Mercy stated even after the harshest consequences already given
---
## 🤝 Neither Break My Covenant With Them: For I Am The LORD Their God
Even after the people broke the covenant themselves back in verse 15, God commits to not doing the same - keeping the agreement is framed as who God is, not something conditional on the people's behavior first.
🤝 The people broke the covenant first, back in verse 15
🙏 God commits to not doing the same in return
🎯 Faithfulness framed as who God is, not conditional on them
---
## 📖 But I Will For Their Sakes Remember The Covenant Of Their Ancestors
The reason given is not their good behavior, present or future - it is the ancestors' original covenant relationship, still honored even generations later regardless of how the current generation had acted.
📖 The reason is the ancestors' covenant, not current good behavior
👪 Honored across generations, regardless of present conduct
🎯 Mercy rooted in an old promise, not a new achievement
---
## 🇪🇬 Whom I Brought Forth Out Of The Land Of Egypt In The Sight Of The Heathen
"In the sight of the heathen" means the Exodus was a public event other nations actually witnessed. God's own reputation among those watching nations was tied to keeping the promise made back then, adding another reason restoration was guaranteed.
🇪🇬 The Exodus was a public event other nations witnessed
👀 God's reputation among watching nations was on the line
🎯 Adds another reason the promise of restoration held firm
---
## 🙏 That I Might Be Their God: I Am The LORD
The chapter's central relationship formula returns one final time, closing this section on the same note it opened on back in verse 12 - the whole point was always the relationship itself, not just rewards or punishments along the way.
🙏 The chapter's central relationship formula returns once more
🔁 Closes on the same note the chapter opened with in verse 12
🎯 The relationship itself was always the actual point

# Leviticus 26:46
# 📜 The Statutes Given At Sinai
---
## 📜 These Are The Statutes And Judgments And Laws
Three separate legal terms are bundled together here - "statutes" for fixed rules, "judgments" for case-by-case rulings, and "laws" as the broadest general term - summarizing everything covered across this entire section of the book at once.
📜 "Statutes" means fixed rules; "judgments" means case rulings
⚖️ "Laws" is the broadest term, covering both together
🎯 Summarizes everything given across this whole section at once
---
## 🏔️ Which The LORD Made Between Him And The Children Of Israel In Mount Sinai By The Hand Of Moses
This closing line functions like a signature, marking the formal end of the main law-giving section that began back near the start of Exodus. "By the hand of Moses" credits him only as the messenger, not the source, of everything just given.
🏔️ Functions as a closing signature on this whole law section
✍️ "By the hand of Moses" names him only as the messenger
🎯 Marks the formal end of the main Sinai law-giving section
`;

export const LEVITICUS_TWENTY_SIX_PERSONAL_SECTIONS = parseLeviticusTwentySixRawNotes(
  LEVITICUS_TWENTY_SIX_RAW_NOTES,
);
