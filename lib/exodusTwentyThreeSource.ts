export type ExodusTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyThreeRawNotes(rawText: string): ExodusTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 23:${startVerse}` : `Exodus 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Exodus 23 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_THREE_RAW_NOTES = `# Exodus 23:1-3
# ⚖️ Honest Testimony In Court
---
## 🗣️ Thou Shalt Not Raise A False Report

A false report means telling a lie meant to hurt someone in a legal case.

This command was aimed straight at the courtroom, not casual conversation.

Ancient Israel had no police force or written case files.

A community's justice depended almost entirely on what witnesses said out loud.

One dishonest witness could send an innocent person to real punishment.

That is why lying under oath carried such heavy weight in the law.

🗣️ False report means a courtroom lie

⚖️ Justice depended on honest witnesses

🚫 No police force existed to verify claims

📖 One lie could destroy an innocent life

## 🤝 Put Not Thine Hand With The Wicked To Be An Unrighteous Witness

This does not only forbid telling the lie yourself.

It also forbids helping someone else's lie by staying quiet.

Putting your hand with the wicked pictures joining their side of the crime.

Silence in the face of injustice was treated as active participation.

A witness who knew the truth and said nothing shared the guilt.

🤝 Joining a lie means staying silent too

🙊 Silence was treated as active guilt

⚖️ Knowing the truth required speaking it

➡️ Neutrality was not an option here

## 👥 Thou Shalt Not Follow A Multitude To Do Evil

A multitude means a crowd, a majority, or popular opinion.

Wrest means to twist or force something out of its natural shape.

The temptation named here is peer pressure inside a courtroom.

A witness could feel pressure to match what everyone else was saying.

This command removes that excuse completely.

The size of the crowd agreeing with a lie never made it true.

👥 Multitude means a majority opinion

🔀 Wrest means to twist the truth

😬 Peer pressure was not a valid excuse

📖 A popular lie is still a lie

## 🙂 Neither Shalt Thou Countenance A Poor Man In His Cause

Countenance means to favor someone or lean toward their side.

This law protects against pity replacing evidence in a judgment.

A judge might want to rule for the poor man out of sympathy.

That sympathy still had to bow to the actual facts of the case.

Fairness required treating every person's case the same way, rich or poor.

🙂 Countenance means showing favor

😢 Pity could not replace real evidence

⚖️ Every case needed the same fair standard

📖 True justice ignores wealth in both directions

# Exodus 23:4-5
# 🐴 Kindness To An Enemy's Animal
---
## 🐂 If Thou Meet Thine Enemy's Ox Or His Ass Going Astray

An ox and an ass were valuable working animals in this culture.

Losing one could threaten a family's whole livelihood.

This law required returning a lost animal even if it belonged to an enemy.

Basic honesty about property could not depend on personal feelings.

Kindness here was a command, not an emotion to wait for.

🐂 Ox and ass were essential work animals

💔 Even an enemy deserved honest treatment

🤲 Property rights did not depend on friendship

📖 Obedience here did not wait on feelings

## 🫏 If Thou See The Ass Of Him That Hateth Thee Lying Under His Burden

This goes further than simply returning a lost animal.

It requires stopping to help an enemy's animal that has collapsed under its load.

Walking past would have been the easier, safer choice.

This command asks for active help, not just avoiding active harm.

Centuries later, Jesus would call this same idea loving your enemy.

🫏 The animal has collapsed under its load

🛑 Walking past would have been easier

🤝 Active help was required, not avoidance

➡️ This foreshadows loving your enemy directly

# Exodus 23:6-9
# 🙅 Justice For The Poor And The Stranger
---
## ⚖️ Thou Shalt Not Wrest The Judgment Of Thy Poor In His Cause

This flips the earlier warning about pity around completely.

A poor person's case could not be twisted against them either.

Someone with less money or influence often had less power to fight back.

This law made sure a weak position in society did not mean a weak case.

Justice was designed to ignore social standing in every direction.

⚖️ Judgment cannot be twisted against the poor

💪 Weak status did not mean a weak case

🚫 Social standing was ignored in court

📖 Justice cuts both directions, not one

## 🚷 Keep Thee Far From A False Matter

This command asks for more than avoiding an outright lie.

It calls for staying far away from anything dishonest, even at the edges.

A false matter includes twisted facts, half truths, and misleading claims.

Distance from dishonesty was the safer standard.

Getting close to a lie still risked real guilt.

🚷 A false matter includes half truths too

📏 Distance from dishonesty was the safer standard

🧭 Getting close to a lie still risked guilt

📖 Integrity means staying far, not just avoiding

## ⚔️ The Innocent And Righteous Slay Thou Not

This names the worst outcome of a corrupt court.

An innocent person could be executed by a false verdict.

God states plainly that He will never approve that outcome.

Justify the wicked means declaring a guilty person innocent.

God ties His own reputation to how Israel's courts actually ruled.

⚖️ Corrupt courts could execute the innocent

🚫 God refuses to approve a false verdict

🗣️ Justify the wicked means declaring guilt innocent

📖 God ties His name to Israel's justice

## 💰 Thou Shalt Take No Gift, For The Gift Blindeth The Wise

A gift here means a bribe, not an innocent present.

Even a wise and honest judge could be corrupted by one.

This law assumes no one is above that temptation.

Removing the bribe removed the opportunity entirely.

Willpower alone was never trusted to be enough.

💰 Gift means a bribe here

🧠 Even wise judges could be corrupted

🚫 The law removed the opportunity itself

📖 Willpower alone was never fully trusted

## 🧳 Thou Shalt Not Oppress A Stranger, For Ye Know The Heart Of A Stranger

A stranger here means a foreigner living among the Israelites.

God appeals to Israel's own memory as slaves in Egypt.

They knew firsthand what it felt like to be a powerless outsider.

That shared memory removed any excuse to mistreat foreigners now.

Empathy was commanded because it was already earned through experience.

🧳 Stranger means a foreigner living among them

🇪🇬 Israel remembered being outsiders in Egypt

💔 That memory removed every excuse to oppress

📖 Empathy here was commanded, not optional

# Exodus 23:10-13
# 🌾 The Sabbath Year And Sabbath Day
---
## 🌱 Six Years Thou Shalt Sow Thy Land

This describes the normal, expected farming cycle for most years.

Planting and harvesting were the default rhythm of daily survival.

This verse sets up a contrast with what comes right after it.

Six years of normal work make the seventh year's break stand out clearly.

🌱 Six years describes the normal farming cycle

🌾 Sowing and gathering were everyday survival

⏳ This sets up a contrast ahead

📖 Normal work highlights an unusual rest

## 🌾 The Seventh Year Thou Shalt Let It Rest And Lie Still

Every seventh year, the farmland itself was left completely unplanted.

This is often called the sabbatical year for the land.

Whatever grew wild on its own was left for the poor to eat.

Wild animals could eat freely from it too.

Resting the land built care for the vulnerable directly into farming.

🌾 Sabbatical year means the land stayed unplanted

🍇 Wild growth fed the poor freely

🦌 Wild animals could eat from it too

📖 Care for the poor was built into farming

## 📅 Six Days Thou Shalt Do Thy Work, And On The Seventh Day Thou Shalt Rest

This repeats the weekly Sabbath rhythm already given at Sinai.

The rest applied to more than just the head of the household.

It specifically covered oxen, donkeys, servants, and even nearby foreigners.

Nobody working under that roof was left out of the rest.

A household's rhythm of rest reflected God's own pattern at creation.

📅 Six and one repeats the weekly rhythm

🐂 Animals were included in the rest

🧳 Servants and foreigners were included too

📖 Rest reflected God's own creation pattern

## 👀 In All Things Be Circumspect

Circumspect means watchful and careful about every detail.

This command sits as a summary line before what follows.

Israel is told to pay close attention to everything commanded so far.

Careless obedience was not the standard being asked for here.

👀 Circumspect means watchful and careful

📋 This summarizes everything commanded so far

🚫 Careless obedience was not acceptable

📖 God asked for full attention, not partial

## 🚫 Make No Mention Of The Name Of Other Gods

This law forbids even casually saying another god's name out loud.

It was not only about avoiding formal worship of idols.

Everyday speech itself was meant to reflect loyalty to the one true God.

A habit as small as a name in conversation still mattered.

🚫 Even casually naming other gods was forbidden

🗣️ Everyday speech reflected true loyalty

🧠 Small habits still carried real weight

📖 Loyalty shaped ordinary conversation, not just worship

# Exodus 23:14-17
# 🎉 Three Annual Feasts
---
## 📅 Three Times Thou Shalt Keep A Feast Unto Me In The Year

This introduces a rhythm of three required national gatherings each year.

These were not private, optional celebrations for whoever felt like it.

Every Israelite man was expected to be present at each one.

The next verses explain what each of the three feasts actually was.

📅 Three feasts happened every single year

👥 Every Israelite man was expected present

🚫 These were not optional gatherings

📖 The next verses explain each feast

## 🍞 Thou Shalt Keep The Feast Of Unleavened Bread

This feast permanently marked the anniversary of the Exodus from Egypt.

Unleavened bread means bread made without yeast, eaten in a hurry on the night Israel fled.

Appearing before God empty meant showing up without any offering at all.

Gratitude for being rescued was meant to be shown concretely, not just felt privately.

🍞 Unleavened bread recalls the hurried Exodus night

📆 This feast marks the Exodus anniversary

🎁 Empty means arriving without any offering

📖 Gratitude was shown concretely, not just felt

## 🌾 The Feast Of Harvest And The Feast Of Ingathering

Firstfruits means the earliest crops gathered at the start of a harvest.

The feast of harvest celebrated the early grain crop in late spring.

The feast of ingathering celebrated the full harvest at the year's end.

Together these two feasts built regular thanksgiving into Israel's whole calendar.

🌾 Firstfruits means the earliest crops gathered

🌞 Harvest feast marked the spring grain crop

🍂 Ingathering feast marked the full year's harvest

📖 Thanksgiving was built into the yearly calendar

## 👨 Three Times In The Year All Thy Males Shall Appear Before The LORD God

This repeats the requirement from verse fourteen with one added detail.

Only the men were required to travel for these three gatherings.

Women, children, and the elderly were not commanded to make the same trip.

This detail reflects the travel demands of an agricultural society, not a lesser value placed on women.

👨 Only men were required to travel

🚶 Travel to these feasts was demanding

👪 Women and children were not required

📖 This reflects travel demands, not lesser value

# Exodus 23:18-19
# 🩸 Offering Regulations
---
## 🍞 Thou Shalt Not Offer The Blood Of My Sacrifice With Leavened Bread

Leaven is a yeast like substance that makes bread rise.

In scripture, leaven often pictures corruption or sin spreading through something pure.

Keeping leaven away from sacrificial blood protected the offering's purity.

Even the ingredients around a sacrifice carried theological weight.

🍞 Leaven means a yeast like rising agent

💔 Leaven often symbolized spreading corruption

🩸 Sacrificial blood needed to stay pure

📖 Even the ingredients carried theological meaning

## 🔥 Neither Shall The Fat Of My Sacrifice Remain Until The Morning

The fat portions of an animal sacrifice were meant to be burned the same day.

Letting it sit overnight risked spoiling or decay setting in.

A fresh, complete offering mattered more than convenience for the worshiper.

Timing itself was part of honoring God properly.

🔥 Fat was to be burned the same day

🌙 Overnight delay risked spoiling the offering

⏳ Freshness mattered more than convenience

📖 Even timing was part of honoring God

## 🌾 The First Of The Firstfruits Of Thy Land Thou Shalt Bring Into The House Of The LORD Thy God

This repeats the firstfruits idea from the feast above.

But now it takes the form of a direct offering.

The earliest and best of the harvest went to God first.

The harvest was not yet certain when this gift was given.

That timing made it a genuine act of trust.

🌾 The earliest harvest portion went to God

🙏 Giving first required real trust

❓ The harvest was not certain yet

📖 Trust was proven before the outcome was known

## 🐐 Thou Shalt Not Seethe A Kid In His Mother's Milk

Seethe means to boil or cook something in liquid.

A kid is a young goat.

Cooking a young goat in its own mother's milk twisted something meant to nourish life.

Neighboring pagan nations reportedly used this exact practice in fertility rituals.

Israel was told to avoid the practice entirely, not adapt it into their own worship.

🍲 Seethe means to boil in liquid

🐐 A kid means a young goat

🚫 Pagan fertility rituals used this practice

📖 Israel was told to avoid it completely

# Exodus 23:20-23
# 👼 The Angel Sent Ahead
---
## 👼 Behold I Send An Angel Before Thee To Keep Thee In The Way

This Angel is not an ordinary created being like other angels in scripture.

Many scholars believe this figure carries God's own presence directly.

He is sometimes called the Angel of the LORD.

His job was to protect Israel and guide them toward the promised land.

Israel was never making this dangerous journey alone or unguided.

👼 This Angel carries God's own presence

🛡️ His job was to protect Israel

🧭 He guided them toward the promised land

📖 Israel was never traveling unguided

## 👀 Beware Of Him And Obey His Voice Provoke Him Not

Beware here means pay careful attention, not simply watch for danger.

Provoke means to deliberately stir up anger or rebellion.

Israel is told to actually obey this Angel's voice, not just respect him from a distance.

Disobeying him would count as real rebellion, not a small mistake.

👀 Beware means pay careful attention

😠 Provoke means stir up deliberate rebellion

🗣️ Obedience to his voice was required

📖 Disobeying him was real rebellion

## 📛 For He Will Not Pardon Your Transgressions For My Name Is In Him

This Angel carries God's own name and authority within him.

That detail explains why disobeying him was treated so seriously.

Ignoring this Angel meant ignoring God directly, not a lesser messenger.

His authority to withhold pardon came from God's own name resting in him.

📛 God's own name rests in this Angel

⚠️ Ignoring him meant ignoring God directly

🚫 He was not a lesser messenger

📖 His authority came from God's own name

## 🤝 If Thou Shalt Obey His Voice I Will Be An Enemy Unto Thine Enemies

This verse flips the warning into a promise instead.

Full obedience came with a guarantee of God fighting on Israel's side.

An adversary means someone actively working against another person.

Israel's enemies would become God's enemies too, not just Israel's problem alone.

🤝 Obedience came with a real promise

⚔️ God would fight on Israel's side

😠 Adversary means an active opponent

📖 Israel's enemies became God's enemies too

## 🗺️ Mine Angel Shall Bring Thee In Unto The Amorites And The Hittites And The Perizzites

This lists several separate nations already living inside the promised land.

Each name refers to a distinct people group with its own territory and customs.

Naming them all specifically makes the promise concrete, not vague.

God is not describing an empty land waiting to be settled peacefully.

He is describing a land that will need to be taken through real conflict.

🗺️ Several named nations already lived there

📜 Naming them made the promise concrete

🏹 The land would need to be taken

📖 This conquest would involve real conflict

# Exodus 23:24-26
# 🔨 Destroying False Gods And Receiving Blessing
---
## 🙅 Thou Shalt Not Bow Down To Their Gods Nor Serve Them Nor Do After Their Works

This forbids three separate levels of involvement with pagan worship.

Bowing down means physical worship.

Serving them means ongoing devotion.

Doing after their works means copying their customs and practices.

Even copying pagan customs without believing in the gods was forbidden.

Total separation was the standard, not partial compromise.

🙅 Bowing down means physical worship

🛐 Serving means ongoing devotion

🎭 Copying customs counted as compromise too

📖 Total separation was the standard

## 🔨 Thou Shalt Utterly Overthrow Them And Break Down Their Images

Entering the promised land required more than personally avoiding idols.

Existing pagan altars and images had to be actively destroyed.

Leftover shrines would have constantly tempted Israel back toward compromise later.

Removing temptation at the source mattered more than resisting it daily.

🔨 Old idols had to be destroyed

⚠️ Leftover shrines tempted future compromise

🚫 Avoidance alone was not enough

📖 Removing temptation beat resisting it daily

## 🍞 Ye Shall Serve The LORD Your God And He Shall Bless Thy Bread And Thy Water

Faithful worship comes attached to real, practical promises here.

Bread and water represent the most basic daily needs for survival.

God was not offering an abstract spiritual reward disconnected from ordinary life.

Obedience was tied directly to food and provision on the table.

🍞 Bread and water mean basic survival needs

🙏 Obedience came with practical promises

🚫 This was not an abstract reward

📖 Faith connected directly to daily provision

## 🩺 I Will Take Sickness Away From The Midst Of Thee

God promises to remove sickness and prevent miscarriage or barrenness.

He also promises full, complete lifespans for His people.

Lives would not be cut short before their time.

These promises named real, everyday fears people carried in this culture.

🩺 God promised to remove sickness

👶 He promised against barrenness and loss

⏳ Full lifespans were promised too

📖 These promises answered real, specific fears

# Exodus 23:27-30
# 🐝 Conquest By Little And Little
---
## 😱 I Will Send My Fear Before Thee And Will Destroy All The People

This promises psychological terror striking Israel's enemies before any battle begins.

Fear here works like a weapon God sends ahead of the army.

Enemies turning their backs describes them fleeing rather than fighting.

Victory here depended on God's action first, not Israel's military strength.

😱 God promised fear striking enemies first

🏃 Enemies would flee instead of fight

⚔️ God's action came before any battle

📖 Victory depended on God, not strength

## 🐝 I Will Send Hornets Before Thee Which Shall Drive Out The Hivite

Hornets here likely describes a real, literal swarm of stinging insects.

Many scholars also read it as a picture of panic spreading through the enemy camps.

Either way, God provides direct supernatural help clearing the way ahead.

Israel was not left to clear the land through human strength alone.

🐝 Hornets may be literal swarming insects

😵 Some read it as spreading panic

🛡️ Either way, God cleared the way

📖 Conquest was not by strength alone

## 🏜️ I Will Not Drive Them Out From Before Thee In One Year

Desolate means empty and abandoned, no longer cared for or productive.

Driving every nation out all at once sounds faster and better.

An empty land that size would sit unmanaged and go to waste.

Wild animals would move in and multiply into a real danger.

🏜️ Desolate means empty and unmanaged

⚡ Instant conquest sounds better at first

🦁 An empty land invites dangerous wildlife

📖 God's pacing protected the land itself

## 🐢 By Little And Little I Will Drive Them Out

The pace of conquest matched Israel's own population growth deliberately.

Israel could only fully settle land they had enough people to manage.

Inherit means receiving land as a lasting possession, not a temporary camp.

God's timing served Israel's actual ability to take root and stay.

🐢 Conquest paced to match population growth

🏡 Israel could only manage what they held

📜 Inherit means a lasting possession

📖 God's timing matched Israel's real capacity

# Exodus 23:31-33
# 🗺️ Borders And No Covenant With Pagan Nations
---
## 🗺️ I Will Set Thy Bounds From The Red Sea Unto The Sea Of The Philistines

This defines the promised land's actual borders in concrete terms.

The sea of the Philistines refers to the Mediterranean coastline.

The river refers to the Euphrates, far to the northeast.

These were real, specific geographic markers, not a vague future promise.

🌊 Red Sea and Mediterranean marked two edges

🗺️ The river means the Euphrates

📍 These were specific, real locations

📖 The promise was concrete, not vague

## 🤲 I Will Deliver The Inhabitants Of The Land Into Your Hand

Inhabitants here means the nations already living inside those borders.

God promises to hand victory to Israel rather than leave the outcome uncertain.

Israel still had to act on that promise themselves.

Driving the nations out was their own responsibility to carry out.

🏘️ Inhabitants means the nations living there

🤲 God promised to deliver the victory

🏃 Israel still had to act on it

📖 Promise and responsibility worked together

## 🤝 Thou Shalt Make No Covenant With Them Nor With Their Gods

A covenant here means a formal treaty or binding agreement.

Even a friendly political alliance with these nations was forbidden.

Peaceful treaties can look harmless while still opening a door.

That open door risked slowly pulling Israel toward worshiping other gods too.

🤝 Covenant means a binding treaty

🚫 Even friendly alliances were forbidden

🚪 Peaceful treaties can still open doors

📖 Small compromises can lead somewhere large

## 🪤 It Will Surely Be A Snare Unto Thee

A snare is a trap used to catch an animal by surprise.

Letting these nations stay nearby risked more than just distraction.

Living close to their worship made copying it easier over time.

This warning treats proximity itself as a real spiritual danger.

🪤 Snare means a trap that catches by surprise

🏘️ Nearby neighbors made compromise easier

⚠️ Proximity itself carried real danger

📖 Distance protected Israel's loyalty to God`.trim();

export const EXODUS_TWENTY_THREE_PERSONAL_SECTIONS = parseExodusTwentyThreeRawNotes(EXODUS_TWENTY_THREE_RAW_NOTES);
