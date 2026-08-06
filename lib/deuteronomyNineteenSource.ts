export type DeuteronomyNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyNineteenRawNotes(rawText: string): DeuteronomyNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 19:${startVerse}` : `Deuteronomy 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Deuteronomy 19 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_NINETEEN_RAW_NOTES = `# Deuteronomy 19:1-3
# 🏙️ The Three Cities Of Refuge
---
## 🗡️ Cut Off The Nations

"Cut off" means completely destroyed and removed from the land.

This looks forward to a conquest that had not fully happened yet when Moses spoke.

Chapters seven and nine already explained why these nations lost their place.

Their own sin, not Israel's strength, was the deeper reason for their removal.

🗡️ Cut off means destroyed and removed
🏹 Conquest had not fully happened yet
📜 Chapters seven and nine explain why
📖 Their sin caused their removal

## 👣 Thou Succeedest Them

"Succeedest" is an old word for taking someone's place.

Here it means Israel would move into homes and cities they never built.

Chapter six already promised full houses and vineyards Israel never planted.

This law assumes that inherited world is already standing.

👣 Succeedest means taking their place
🏠 Israel would move into ready cities
📜 Chapter six already promised this
📖 The world here was already built

## 🏘️ Dwellest In Their Cities, And In Their Houses

This phrase pictures ordinary daily life happening in captured territory.

Israel would not start from empty ground.

Existing buildings and streets would simply change hands.

That sudden transition needed real legal structure, like the one this chapter gives.

🏘️ This pictures daily life in new land
🚫 Israel would not start from nothing
🔑 Buildings and streets would change hands
📖 Structure was needed for that shift

## 🏙️ Separate Three Cities For Thee

This law was not new information for Israel.

Numbers thirty five already commanded cities of refuge for accidental killers.

Deuteronomy repeats that command now that the land was finally close.

Three specific cities would be set apart for this one purpose.

🏙️ Cities of refuge were not new
📜 Numbers thirty five gave this law first
⏳ The land was now finally close
📖 Three cities were set apart

## 🗺️ In The Midst Of Thy Land

This phrase describes where the three cities needed to sit.

They were spread through the middle of Israel's territory, not clustered together.

Anyone in the land needed a realistic chance to reach one.

Geography itself became part of protecting an innocent life.

🗺️ Midst means spread through the land
📍 Cities were not clustered together
🏃 Reachability mattered for every Israelite
📖 Geography protected an innocent life

## 🛣️ Prepare Thee A Way

This describes literal road building and maintenance, not a figure of speech.

Jewish tradition later held that Israel kept these roads clearly marked.

A slayer running for his life could not afford delay.

Ordinary infrastructure carried real weight over questions of life and death.

🛣️ This means literal road building
🪧 Jewish tradition says roads stayed marked
⏱️ A slayer could not afford delay
📖 Infrastructure carried real weight here

## 🌍 Divide The Coasts Of Thy Land

"Coasts" here means borders or territory, not a sandy shoreline.

Modern readers picture an ocean edge, but Israel had no coastline in view here.

The land itself was measured out and split into three even regions.

Each region would then get one refuge city near its center.

🌍 Coasts means borders or territory
🌊 This is not a sandy shoreline
✂️ The land was split into three
📖 Each region got its own city

## 🏃 That Every Slayer May Flee Thither

"Slayer" here means a person who killed someone by accident.

"Thither" is an old word for to that place.

The whole system existed so an innocent killer had somewhere real to run.

Without a fixed destination, that flight would only end in more bloodshed.

🏃 Slayer here means an accidental killer
🧭 Thither means to that place
🏙️ A real destination had to exist
📖 Without it, flight risked more bloodshed

# Deuteronomy 19:4-7
# 🪓 The Man Who Killed By Accident
---
## ⚖️ This Is The Case Of The Slayer

"Case" here means the specific legal situation being defined.

Moses is about to give one detailed example instead of a vague rule.

A clear example made the law usable by ordinary judges later on.

Specific stories, not abstract wording, protected real people in real situations.

⚖️ Case means the legal situation
👨‍⚖️ Judges needed a usable standard
🧍 Real people needed real protection
📖 A specific example follows here

## ❓ Killeth His Neighbour Ignorantly

"Ignorantly" here means without intending to and without any warning.

This is the legal definition of a true accident.

The word rules out any hidden plan or private grudge.

Everything that follows depends on proving this one detail first.

❓ Ignorantly means unintended and unplanned
🚫 No hidden plan is allowed here
🔑 This defines a true accident
📖 The whole case rests on this

## 🔍 Whom He Hated Not In Time Past

This clause gives the actual legal test for an accident.

Investigators would ask whether any earlier hatred existed between the two men.

No prior conflict pointed toward a genuine accident, not murder.

This same phrase reappears later in the chapter for a reason.

🔍 This is the real legal test
💔 Prior hatred pointed toward murder
✅ No hatred pointed toward accident
📖 This phrase returns later on purpose

## 🪓 Goeth Into The Wood With His Neighbour To Hew Wood

"Hew" means to chop or cut with a tool.

Cutting wood together was ordinary daily work in ancient Israel.

Two neighbors doing an everyday task together sets up a believable accident.

Nothing about this scene suggests any danger at all.

🪓 Hew means to chop or cut
🌳 This was ordinary daily work
🤝 Two neighbors worked side by side
📖 Nothing here suggested any danger

## 💥 His Hand Fetcheth A Stroke With The Axe

"Fetcheth a stroke" is an old way of saying he swings the axe.

This detail shows a normal, controlled swing.

It is not a wild or violent one.

The scene stays completely mundane right up until the accident happens.

💥 Fetcheth a stroke means swings the axe
😌 This was a normal, controlled swing
🌳 The scene stays completely ordinary
📖 Ordinariness is the real legal point

## 🔧 The Head Slippeth From The Helve

"Helve" means the wooden handle of an axe.

This describes the axe head physically flying off its handle mid swing.

That kind of tool failure was a real, known hazard with wooden handles.

The vivid, specific detail makes the accident easy to believe.

🔧 Helve means the axe handle
💥 The axe head flew off mid swing
🪓 Wooden handles could genuinely fail
📖 A vivid detail makes it believable

## 🎯 Lighteth Upon His Neighbour, That He Die

"Lighteth upon" is an old phrase meaning lands on or strikes.

The flying axe head strikes the other man by pure chance.

Nothing in the description suggests any aim or intention at all.

This is the exact accident the whole refuge system was built to answer.

🎯 Lighteth upon means lands on
🪓 The axe head struck by chance
🚫 No aim or intention is described
📖 This is the accident refuge answers

## 👤 Lest The Avenger Of The Blood Pursue The Slayer

The "avenger of blood" was normally the victim's closest living male relative.

Numbers thirty five gave that relative the right to pursue a killer.

Without a refuge city, an innocent man had no legal protection from that pursuit.

The whole law exists to slow down a chase that outran calm judgment.

👤 Avenger of blood means the closest relative
📜 Numbers thirty five defines this role
🚫 Without refuge, no protection existed
📖 This law slows down that pursuit

## 🔥 While His Heart Is Hot

This idiom describes intense, sudden anger, not literal body heat.

Grief over a dead relative could easily turn into instant vigilante justice.

The law does not blame the avenger for that natural reaction.

It simply builds in time so judgment can happen calmly instead.

🔥 Heart is hot means sudden anger
😢 Grief could turn into vigilante justice
🚫 The avenger is not blamed here
📖 Time and distance allowed calm judgment

## 🛣️ Because The Way Is Long

This phrase gives the practical reason cities needed to be spread out.

A single, far away city would defeat the whole purpose of quick refuge.

An angry pursuer could easily catch an innocent man on a long journey.

Nearby cities turned this law into something that actually worked.

🛣️ Long distance created real danger
📍 One distant city was not enough
🏃 A close city meant faster safety
📖 Nearby cities made the law work

## 🔁 Wherefore I Command Thee

"Wherefore" is an old word meaning for this reason.

This command repeats the exact instruction already given in verse two.

Repetition here is not filler or an accident.

It marks a command serious enough to state twice in one chapter.

🔁 Wherefore means for this reason
📜 This repeats verse two's command
🎯 Repetition was not accidental
📖 It marked a truly serious command

# Deuteronomy 19:8-10
# 🗺️ Three Cities More
---
## 📈 If The LORD Thy God Enlarge Thy Coast

This introduces a conditional expansion of the whole refuge system.

"Coast" again means Israel's territory, not a shoreline.

More land meant more distance for someone fleeing to a city.

The law planned ahead instead of assuming Israel would stay the same size.

📈 Coast means territory, not shoreline
🗺️ This describes future national growth
🏃 More land meant more distance
📖 The law planned ahead for growth

## 🤝 As He Hath Sworn Unto Thy Fathers

This oath points back to God's original promise to Abraham.

Genesis fifteen already described the exact borders God swore to give.

That promise stretched from Egypt's river all the way to the Euphrates.

Israel in Moses' day had not yet received the full extent of it.

🤝 This oath points back to Abraham
📜 Genesis fifteen names the exact borders
🌍 The promise reached to the Euphrates
📖 Israel had not yet received it all

## ✅ If Thou Shalt Keep All These Commandments To Do Them

This growth is tied directly to Israel's obedience, not automatic timing.

Loving God and walking in his ways are paired in the same verse.

The larger land was framed as a real reward, not a guarantee.

Israel's own history shows this expansion was only ever partly realized.

✅ Growth depended on real obedience
❤️ Love and obedience are paired here
🎁 Larger land was framed as reward
📖 History shows only partial fulfillment

## 🏙️ Then Shalt Thou Add Three Cities More For Thee

This law plans for six total cities of refuge, not just three.

Growth in land size meant growth in this legal protection too.

The system was designed to scale as Israel grew larger.

Every part of an enlarged Israel needed the same access to refuge.

🏙️ Six total cities were planned
📈 Protection scaled along with growth
🌍 No region was meant to lose access
📖 Every Israelite kept equal protection

## ➕ Beside These Three

This short phrase confirms the new cities were an addition, not a swap.

The first three cities stayed in permanent use no matter what.

Six functioning refuge cities were the eventual goal of the whole law.

Nothing about the original plan was ever meant to be temporary.

➕ Beside means in addition to
🏙️ The first three cities stayed permanent
🎯 Six cities were the eventual goal
📖 Nothing here was meant as temporary

## 🎯 That Innocent Blood Be Not Shed In Thy Land

This line states the entire purpose behind the whole refuge system.

Every city, every road, and every rule existed to protect an innocent life.

The land itself carried moral weight in how it was kept.

An unprotected innocent death was treated as guilt on the whole nation.

🎯 This states the law's real purpose
🛡️ Every rule protected innocent life
🌍 The land carried moral weight
📖 Unprotected death brought guilt on the nation

# Deuteronomy 19:11-14
# ⚔️ The Murderer And The Landmark
---
## 🔄 If Any Man Hate His Neighbour, And Lie In Wait For Him

This describes the exact opposite of the accident in verses four through seven.

"Lie in wait" means planning an ambush in advance.

Hatred plus a planned ambush together prove real intent to kill.

This is the legal definition of murder inside this chapter.

🔄 This reverses the earlier accident case
🥷 Lie in wait means planned ambush
💔 Hatred plus ambush proves intent
📖 This defines murder in this chapter

## ☠️ Smite Him Mortally That He Die

"Mortally" means with a fatal, killing blow.

This phrase leaves no doubt about the outcome or the intention behind it.

The careful, technical language shows how seriously Israel's law treated killing.

Precision mattered because a person's freedom, or life, depended on the exact wording.

☠️ Mortally means with a fatal blow
🎯 No doubt remains about intent
⚖️ Precise language shows serious care
📖 Wording itself carried life and death weight

## 🏃 Fleeth Into One Of These Cities

A murderer could physically run to a refuge city just like an innocent man.

The city itself could not tell the two cases apart on its own.

Refuge offered temporary shelter, not automatic protection or a final verdict.

The next verse explains exactly how that difference actually gets decided.

🏃 A murderer could flee there too
🏙️ The city alone could not judge
⏳ Refuge was temporary, not automatic
📖 The next verse explains the process

## 👴 The Elders Of His City Shall Send And Fetch Him Thence

"Elders" were the respected leaders who judged local legal matters.

"His city" refers to the murderer's own hometown, where he was already known.

Local leaders, not the refuge city, were responsible for identifying a true murderer.

That system relied on a community's own honest knowledge of its people.

👴 Elders means respected local leaders
🏠 His city means the murderer's hometown
🔍 Local leaders identified true murderers
📖 Justice relied on community honesty

## 🚫 Deliver Him Into The Hand Of The Avenger Of Blood, That He May Die

This confirms refuge cities never protected a proven, deliberate killer.

The very system built to save innocent lives handed a guilty man over to justice.

Mercy and justice worked together here instead of canceling each other out.

Refuge was always conditional, never a permanent hiding place.

🚫 Refuge never protected true guilt
⚖️ Mercy and justice worked together
🔑 Refuge was always conditional
📖 It was never a permanent hideout

## 👁️ Thine Eye Shall Not Pity Him

This is a strong idiom commanding a judge to show no leniency.

It applies specifically to a proven, deliberate killer.

Genuine mercy for the innocent and firm justice for the guilty could both be true.

This same phrase returns later in the chapter for a different situation.

👁️ This idiom commands no leniency
🎯 It applies only to proven guilt
⚖️ Mercy and justice both stayed true
📖 This same phrase returns later

## 🪨 Remove Thy Neighbour's Landmark

A "landmark" was a stone or marker set to show where one family's property ended.

Moving that marker quietly stole land without any obvious violence.

This law protected ordinary people from a slow, hidden kind of theft.

The command sits here as one more way of protecting a neighbor's whole living.

🪨 Landmark means a property boundary stone
🤫 Moving it stole land quietly
🚫 This was theft without violence
📖 It protected a neighbor's whole living

## 📜 Which They Of Old Time Have Set In Thine Inheritance

This landmark was not new information Israel was inventing on its own.

The boundaries came from the original division of the land under Joshua.

Joshua thirteen through twenty one records that first careful land assignment.

Respecting old boundaries meant respecting a settlement God himself had guided.

📜 These boundaries were set long before
🗺️ Joshua's book records that first division
👴 Old time points back to that settlement
📖 Respecting borders meant respecting God's plan

# Deuteronomy 19:15-21
# ⚖️ Witnesses And True Justice
---
## 🙅 One Witness Shall Not Rise Up Against A Man

A single accuser's word was never enough to convict anyone in Israel's courts.

This law protected against one person's grudge, mistake, or lie ruling a whole case.

Few formal legal systems in the ancient Near East offered this protection as clearly.

Accusation alone was never treated as proof.

🙅 One witness alone could not convict
💔 This blocked grudges, mistakes, and lies
🌍 Few ancient legal systems matched this
📖 Accusation alone was never proof

## 🗣️ At The Mouth Of Two Witnesses, Or At The Mouth Of Three Witnesses

"At the mouth of" is an old way of saying based on the testimony of.

This law required real corroboration before any serious charge could stand.

The New Testament later reuses this exact standard, including Matthew eighteen.

One consistent principle of confirmed testimony runs across the whole Bible.

🗣️ At the mouth of means by testimony
🤝 Real corroboration was legally required
✝️ Matthew eighteen reuses this standard
📖 One principle runs across the Bible

## ⚠️ If A False Witness Rise Up Against Any Man

A "false witness" is someone who lies under oath to hurt another person legally.

This law assumes lying under oath was a real, ongoing danger in Israel's courts.

Naming the danger directly was the first step toward preventing it.

The rest of the passage builds a whole process around catching exactly this.

🗣️ False witness means someone who lies
⚠️ This danger was treated as real
🎯 Naming it was the first defense
📖 A whole process follows to catch it

## 👥 Shall Stand Before The LORD

Both the accuser and the accused had to appear together at the same trial.

Standing "before the LORD" meant appearing at the central sanctuary itself.

Priests and judges served there together as the court for this kind of case.

Neither side could settle this privately, away from public accountability.

👥 Both sides had to appear together
⛺ This meant appearing at the sanctuary
🕎 Priests and judges served as the court
📖 Nothing here could stay private

## 🔍 The Judges Shall Make Diligent Inquisition

"Inquisition" here simply means a careful, thorough investigation.

Judges were not permitted to just accept either side's story at face value.

This same word appears elsewhere in Deuteronomy for exactly this kind of care.

Real justice required real effort, not a quick, convenient decision.

🔍 Inquisition means a careful investigation
🚫 Judges could not accept claims blindly
📜 This word repeats elsewhere in Deuteronomy
📖 Real justice required real effort

## 🔄 Then Shall Ye Do Unto Him, As He Had Thought To Have Done Unto His Brother

This law applies the exact punishment the false witness intended for someone else.

If he sought a death sentence through lies, he would face that same sentence.

This is measure for measure justice aimed at one specific crime.

The punishment fits not the lie itself, but the harm it was built to cause.

🔄 The intended punishment falls back on him
☠️ A false death charge risked his own life
⚖️ This is measure for measure justice
📖 Punishment matched the harm intended

## 🔁 So Shalt Thou Put The Evil Away From Among You

This exact phrase repeats throughout Deuteronomy for Israel's most serious offenses.

It treats unpunished sin as something that spreads and corrupts a community.

Removing it here specifically targets the danger of a corrupt legal system.

A courtroom that tolerates lying under oath eventually protects no one.

🔁 This phrase repeats often in Deuteronomy
🦠 Unpunished sin was treated as spreading
⚖️ Here it targets a corrupt court
📖 A corrupt court protects no one

## 📢 Those Which Remain Shall Hear, And Fear

Public punishment served a second purpose beyond the individual case itself.

Other Israelites who heard about the verdict would think twice before lying under oath.

Deterrence, not just individual justice, was part of this law's design.

Fear here means healthy respect for real consequences, not constant terror.

📢 Punishment was made public on purpose
🤔 Others would think twice before lying
🎯 Deterrence was part of the design
📖 Fear meant respect for consequences

## 👁️ Thine Eye Shall Not Pity

This same command from the murderer's case in verse thirteen returns here.

It applies specifically to a proven false witness, not to every accused person.

Both crimes threatened innocent life directly, one by violence and one by lies.

The law refused to treat perjury as a lesser offense than it truly was.

👁️ This repeats the phrase from verse thirteen
🎯 It targets only a proven false witness
⚖️ Both crimes threatened innocent life
📖 Perjury was never treated as minor

## ⚖️ Life Shall Go For Life, Eye For Eye, Tooth For Tooth, Hand For Hand, Foot For Foot

This famous formula states the principle of exact, proportional justice.

It does not command literal mutilation as the only possible punishment.

Its real purpose was to set a maximum limit on revenge.

Exodus twenty one and Leviticus twenty four both state this same principle.

⚖️ This states exact, proportional justice
🚫 It did not require literal mutilation
🛑 It capped revenge at a limit
📖 Exodus and Leviticus state this too
`.trim();

export const DEUTERONOMY_NINETEEN_PERSONAL_SECTIONS = parseDeuteronomyNineteenRawNotes(DEUTERONOMY_NINETEEN_RAW_NOTES);
