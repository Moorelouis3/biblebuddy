export type NumbersThirtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersThirtyFiveRawNotes(rawText: string): NumbersThirtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersThirtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+35:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 35 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+35:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+35:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 35 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 35,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 35:${startVerse}` : `Numbers 35:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Numbers 35 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_THIRTY_FIVE_RAW_NOTES = `# Numbers 35:1-3
# 🏘️ Cities For The Levites
---
## 🏕️ In The Plains Of Moab By Jordan Near Jericho

This is the same camp Israel has used since chapter twenty two.

Balaam's failed curse against Israel happened here.

The second census also happened at this camp.

Only the Jordan River now separates Israel from the promised land.

🏕️ Same camp since chapter twenty two

🔮 Balaam's curse failed at this camp

🌊 Only Jordan remains before Canaan

➡️ Even small laws come before crossing

## 🏠 Cities To Dwell In

The Levites received no tribal territory when the land was divided.

Their inheritance was serving God at the tabernacle instead of farmland.

Priests and their families still needed real homes somewhere.

This command finally gives the Levites a place to live.

⛪ Levites received no tribal land

🙏 Their inheritance was tabernacle service

🏠 They still needed real homes

📖 Now homes were finally provided

## 🌾 Suburbs For The Cities Round About Them

"Suburbs" here does not mean a modern neighborhood.

It means open grazing land that rings each town.

The Levites owned no farmland of their own.

Pasture was their only way to keep animals.

🚫 Not a modern suburb

🐑 Open grazing land instead

🌾 Levites owned no farmland

📖 Pasture replaced their missing fields

## 🐂 For Their Cattle, And For Their Goods, And For All Their Beasts

This verse spells out exactly what the open land was for.

"Cattle" covers oxen and other large work animals.

"Beasts" is a broader word for animals kept for food.

Three different needs get named so nothing was left assumed.

🐂 Cattle means oxen and work animals

📦 Goods means their household possessions

🐑 Beasts covers animals more broadly

📖 Nothing about their needs was assumed

# Numbers 35:4-5
# 📏 Measuring The Suburbs
---
## 📏 A Thousand Cubits Round About

A cubit measured close to the length of a forearm.

Eighteen inches was the usual estimate for one cubit.

A thousand cubits works out to about a third of a mile.

That distance formed a wide ring of open land around the city.

📏 A cubit was about eighteen inches

🧮 A thousand cubits is about a third mile

⭕ It formed a ring around the city

📖 The measurement protected the Levites' land

## 🧭 Two Thousand Cubits

This verse doubles the earlier measurement in every direction.

East, south, west, and north each get a separate strip of land.

Each strip runs about two thirds of a mile from the city wall.

The result was a wide, clearly measured buffer of open land.

🧭 All four directions get measured

📐 Each strip is about two thirds mile

🗺️ It forms a wide buffer zone

➡️ The land was carefully guaranteed

## 📍 The City Shall Be In The Midst

"Midst" means the middle or the center of something.

Every measurement in this passage starts from the city itself.

Placing the city at the center kept the land evenly spread.

No direction was shortchanged in this careful design.

📍 Midst means the very center

🏙️ Measurements all start from the city

⚖️ Suburb land was evenly spread

📖 No direction was shortchanged

# Numbers 35:6-8
# 🏙️ Forty And Eight Cities
---
## 🏙️ Six Cities For Refuge, Which Ye Shall Appoint For The Manslayer

"Manslayer" means a person who has killed someone else.

This word covers both an accident and an actual murder.

Six of the Levite cities get one extra job, refuge.

A person who killed someone could run to one of these cities for safety.

🔪 Manslayer means someone who has killed

🏙️ Six cities got this extra role

🏃 Anyone could run there for safety

📖 Refuge bought time for a fair trial

## ➕ Ye Shall Add Forty And Two Cities

Six refuge cities were not the Levites' whole portion.

Forty two more cities went to them beyond those six.

Together that totals forty eight cities among the other tribes.

Spreading the Levites this way kept God's law close to every tribe.

➕ Forty two cities beyond the six

🧮 Forty eight cities in total

🗺️ Spread across every tribe's land

📖 God's law stayed close to everyone

## ⚖️ From Them That Have Many Ye Shall Give Many

This is a simple rule about proportion.

A tribe with a large territory gave up more cities.

A tribe with a small territory gave up fewer cities.

No single tribe carried a burden bigger than what it actually had.

⚖️ Bigger tribes gave more cities

📉 Smaller tribes gave fewer cities

🤝 The burden was shared evenly

📖 No tribe was crushed by the command

# Numbers 35:9-15
# 🏃 Cities Of Refuge
---
## 🌊 When Ye Be Come Over Jordan Into The Land Of Canaan

This phrase echoes the boundary lines from chapter thirty four.

The refuge cities will not work until Israel crosses into Canaan.

God is planning a justice system for a land Israel has not entered yet.

Even small legal details were prepared far in advance.

🔁 Echoes chapter thirty four's language

🌊 The system waits until Canaan

📜 God planned ahead of the conquest

➡️ Small details were prepared early

## 😲 Which Killeth Any Person At Unawares

"Unawares" means without meaning to do it.

It describes an accident, not a planned killing.

The whole refuge system exists to protect this kind of person.

Without it, anger alone could kill an innocent person.

😲 Unawares means by accident

🛡️ The system protects accidental killers

😡 Anger alone should not decide guilt

📖 Refuge slows revenge down for truth

## 👤 Cities For Refuge From The Avenger

The "avenger" was a close relative of the person killed.

Ancient custom expected that relative to personally kill whoever caused the death.

Without limits, this could spiral into an endless family feud.

God's law steps between raw grief and instant violence.

👤 Avenger means a close relative

⚔️ Custom expected personal revenge

🔄 Without limits, feuds could spiral

📖 God's law interrupts the cycle

## 🏛️ Until He Stand Before The Congregation In Judgment

"Congregation" means the assembled community acting as a court.

The refuge city was never meant to be a permanent hideout.

It only protected the slayer long enough to reach a real trial.

Guilt still had to be decided by people, not by anger alone.

⚖️ Congregation means the community as court

🏃 Refuge was temporary, not permanent

🏛️ A real trial still had to happen

📖 Anger never got the final word

## 🔀 Three Cities On This Side Jordan

The six refuge cities were split evenly across the Jordan River.

Three sat on the eastern side, where some tribes had already settled.

Three more sat inside Canaan, once the rest of the tribes crossed over.

No Israelite would ever be far from a place of refuge.

🔀 Three cities on each side of Jordan

🐑 East side already had settlers

🌊 West side served the rest of Canaan

📖 Refuge was always within reach

## 🌍 For The Stranger, And For The Sojourner Among Them

A "stranger" was a foreigner living permanently among Israel.

A "sojourner" was someone staying only for a short time.

This law did not only protect native Israelites.

Anyone living among God's people received the same access to justice.

🌍 Stranger means a permanent foreign resident

🎒 Sojourner means a temporary visitor

🤝 Both groups got the same protection

➡️ Justice was not limited to Israelites

# Numbers 35:16-21
# ⚔️ What Makes A Murderer
---
## 🔨 If He Smite Him With An Instrument Of Iron

Iron tools were common and deadly in this culture.

Using one to strike someone showed a clear intent to kill.

The text does not require weeks of planning to prove murder.

The weapon itself was proof enough of deadly intention.

🔨 Iron tools were common and deadly

🎯 Using one showed clear intent

📅 No long planning was required

📖 The weapon itself proved intention

## 🪵 With An Hand Weapon Of Wood

Verses sixteen through eighteen list three different murder weapons.

Iron, stone, and wood all receive the exact same verdict.

The law did not care which object was actually used.

What mattered was that the object was deadly and used on purpose.

🔨 Iron, stone, and wood all listed

⚖️ Each gets the identical verdict

🎯 The object mattered less than intent

📖 A deadly tool used on purpose was murder

## ⚔️ The Revenger Of Blood Himself Shall Slay The Murderer

Once guilt was legally proven, the law itself allowed this killing.

This was not outside revenge, it was the law's own sentence.

A relative carried out that sentence, acting almost like an executioner.

Proof of guilt always came before the sentence was carried out.

⚖️ Only applied after guilt was proven

👤 The avenger acted as executioner

🚫 This was not outside the law

📖 Proof of guilt came first

## 🪤 If He Thrust Him Of Hatred, Or Hurl At Him By Laying Of Wait

"Laying of wait" means setting an ambush ahead of time.

Both hatred and ambush point to the same thing, a planned killing.

Planning is what separates murder from an accident in this chapter.

The law reads a person's intent through their actions.

🪤 Laying of wait means an ambush

😠 Hatred shows a planned motive

📋 Planning separates murder from accident

📖 Intention is read through actions

## 😡 Or In Enmity Smite Him With His Hand, That He Die

"Enmity" means open hostility or hatred between two people.

Even without a weapon, a killing done in enmity still counted as murder.

Bare hands used with hateful intent carried the same guilt as a tool.

The real test was always planning versus a genuine accident.

😡 Enmity means open hostility

✋ Bare hands could still count as murder

🔁 Intent mattered more than the method

➡️ The real test was planning versus accident

# Numbers 35:22-25
# 🙏 Without Enmity
---
## ⚡ If He Thrust Him Suddenly Without Enmity

"Suddenly" signals the opposite of the ambush described earlier.

No planning happened before this kind of death.

The law finally turns from describing murder to describing a true accident.

Every earlier detail exists to make this exact distinction possible.

⚡ Suddenly means no planning happened

🔄 The opposite of the earlier ambush

🙏 This describes a true accident

📖 The whole chapter builds to this line

## 🙈 Seeing Him Not, And Cast It Upon Him

This phrase pictures someone throwing an object without knowing anyone was there.

There was no target, no aim, and no way to sense danger.

The text also says he was not his enemy and sought no harm.

An accident this clear needed real legal protection.

🙈 Seeing him not means no target

🎯 There was no aim involved

💔 No enemy status, no motive

📖 Clear accidents needed legal protection

## 👥 The Congregation Shall Judge Between The Slayer And The Revenger Of Blood

Neither the slayer nor the grieving family decided the outcome alone.

A larger, neutral body weighed the evidence instead.

This kept personal bias out of a decision this serious.

Justice depended on people who had no stake in the result.

👥 Neither side decided alone

⚖️ A neutral body judged instead

🚫 Bias was kept out of it

📖 Justice needed people without a stake

## 🕊️ Unto The Death Of The High Priest, Which Was Anointed With The Holy Oil

The slayer's protection lasted an unknown length of time.

It ended only when the current high priest died.

The anointing oil identified exactly which priest was meant.

That priest's death worked like a reset, releasing every manslayer at once.

⏳ Protection lasted an unknown length

🕊️ It ended at the high priest's death

🛢️ Anointing oil marked the serving priest

📖 One death released every manslayer

# Numbers 35:26-28
# 🚧 Outside The Border
---
## 🚧 If The Slayer Shall At Any Time Come Without The Border Of The City Of His Refuge

"Without the border" means stepping outside the measured line from verse five.

Refuge was not a status that followed a person everywhere.

It was tied to one specific place and its exact boundary.

Safety depended on staying inside a line, not on innocence alone.

📏 Without the border means outside the line

🚫 Refuge did not follow the person

📍 Safety was tied to one place

➡️ A boundary decided when protection worked

## 😮 He Shall Not Be Guilty Of Blood

This sounds harsh to a modern reader at first.

But the law had already given the slayer a safe place to stay.

Choosing to leave that protection was the slayer's own risk.

The avenger was not punished for a danger the slayer walked into.

😮 This sounds harsh at first

🏠 Safety had already been offered

🚶 Leaving it was the slayer's choice

📖 The risk belonged to the one who left

## 🏡 After The Death Of The High Priest The Slayer Shall Return Into The Land Of His Possession

Once the high priest died, the danger officially ended everywhere.

Every slayer in every refuge city could finally go home.

Some Jewish tradition later connected the high priest's death to atonement for the land.

A death that ended one man's ministry freed many others from exile.

🕊️ The high priest's death ended the danger

🏡 The slayer could finally go home

📜 Tradition linked it to atonement

📖 One death freed others from exile

# Numbers 35:29-34
# 🩸 Blood Defiles The Land
---
## 📜 A Statute Of Judgment Unto You Throughout Your Generations

"Statute" means a permanent, binding law, not a rule for one moment.

This whole refuge and murder system was never meant to expire.

It was designed to apply to Israelites living centuries later.

God was writing a system meant to outlast everyone currently listening.

📜 Statute means a permanent law

⏳ It was not meant to expire

🗺️ It applied far beyond this camp

📖 The law outlived everyone who first heard it

## 👥 One Witness Shall Not Testify Against Any Person To Cause Him To Die

"By the mouth of witnesses" means testimony from more than one person.

A single accusation, even a truthful one, was never enough to execute someone.

This rule protected against false accusations built on a grudge.

Requiring multiple witnesses forced the evidence to be real first.

👥 Testimony needed more than one voice

🚫 One accusation was never enough

⚖️ This guarded against false claims

📖 Evidence had to be real first

## 💰 Ye Shall Take No Satisfaction For The Life Of A Murderer

"Satisfaction" here means a ransom, a payment to buy back a life.

In many ancient cultures, a wealthy killer could simply pay a fine.

Israel's law refused to let money replace the required death sentence.

A human life could not be priced like a debt.

💰 Satisfaction means a ransom payment

🏛️ Other cultures allowed buying freedom

🚫 Israel's law refused that option

➡️ A life could not be priced

## 🔒 No Satisfaction For Him That Is Fled To The City Of His Refuge

This closes a possible loophole for the innocent slayer, not the guilty one.

Even a protected slayer could not simply pay money for early release.

The only thing that ended his stay was the high priest's death.

Money could not shorten a timeline that only God's priest could close.

🔒 This closes a possible loophole

💰 Money could not buy early release

🕊️ Only the high priest's death ended it

📖 God's timeline could not be shortcut

## 🩸 The Land Cannot Be Cleansed Of The Blood That Is Shed Therein

"Defileth" means made spiritually unclean or unfit for worship.

Unpunished murder was never treated as a private family matter.

Scripture pictures it as an actual stain on the ground itself.

Only the proper execution of the murderer could remove that stain.

🩸 Defileth means made spiritually unclean

👪 Murder was never just private

🌍 It stained the very ground

📖 Only justice could remove the stain

## 🏕️ For I The LORD Dwell Among The Children Of Israel

This is the reason behind every rule in this chapter.

The land was not just property, it was where God chose to live among them.

A defiled, blood stained land was unfit for His presence.

Every city and every rule protected the fact that God lived there.

🏕️ God dwelled among His people directly

🩸 A defiled land was unfit for Him

📏 Every rule protected His presence

📖 Justice mattered because God lived there
`.trim();

export const NUMBERS_THIRTY_FIVE_PERSONAL_SECTIONS = parseNumbersThirtyFiveRawNotes(NUMBERS_THIRTY_FIVE_RAW_NOTES);
