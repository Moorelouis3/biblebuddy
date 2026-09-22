export type IsaiahOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahOneRawNotes(rawText: string): IsaiahOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 1:${startVerse}` : `Isaiah 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 1 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_ONE_RAW_NOTES = `# Isaiah 1:1-3
# ⚖️ The LORD Opens His Case
---
## 🔮 The Vision Of Isaiah The Son Of Amoz

"Vision" means the whole message a prophet received, not one single dream.

Isaiah is telling the reader that everything that follows came from God, not from his own opinion.

The son of Amoz simply names his father, since Amoz was not otherwise famous.

Calling this a vision sets Isaiah's authority before a single warning is given.

🔮 Vision means the whole message received

📜 The words come from God, not Isaiah

👤 Amoz was Isaiah's father, not a title

📖 The authority is set before the warnings begin

## 👑 In The Days Of Uzziah, Jotham, Ahaz, And Hezekiah

These four names identify exactly when Isaiah preached.

Uzziah, Jotham, Ahaz, and Hezekiah were four kings of Judah who reigned back to back.

Together their reigns span nearly a century, somewhere in the eighth century before Christ.

Isaiah's ministry stretched across dramatic swings between faithful kings and unfaithful ones.

👑 Four kings named in order of reign

📅 Their reigns span nearly a century

⚖️ Judah swung between faithful and unfaithful kings

📖 Isaiah preached through all of it

## 🌍 Hear, O Heavens, And Give Ear, O Earth

This is not poetry written to nature.

In the ancient world a covenant needed witnesses who would outlast both people.

Heaven and earth stood as witnesses when the covenant was first made.

Moses used this same courtroom language centuries earlier.

God is opening a legal case against His own people.

⚖️ Heaven and earth are called as witnesses

📜 They witnessed the covenant long ago

🔁 Moses used this same courtroom form

📖 God is opening a legal case

## 🍼 I Have Nourished And Brought Up Children

God speaks here as a parent, not only as a ruler.

"Nourished" means He fed and cared for Israel from its earliest years.

"Brought up" means He raised them all the way to adulthood.

The rebellion named in the next line lands harder because of the care named here first.

🍼 Nourished means fed and cared for

🌱 Brought up means raised to maturity

💔 The care makes the rebellion cut deeper

📖 God speaks first as a parent

## 🐂 The Ox Knoweth His Owner

An ox is not considered a clever animal.

Yet even an ox recognizes the person who feeds it every day.

Isaiah uses the dumbest animal on the farm to make Israel's failure look worse.

If an ox can know its owner, Israel has no excuse for not knowing God.

🐂 An ox is not a clever animal

🍽️ Yet it still knows who feeds it

😔 Israel's failure looks worse by comparison

➡️ There is no excuse left for Israel

## 🐴 His Master's Crib

"Crib" does not mean a baby's bed here.

It means the feeding trough where a work animal ate.

A donkey finds its own feeding trough without ever being told.

Israel could not find its way back to the God who fed them.

🐴 Crib means a feeding trough

🔍 A donkey finds it without help

🧭 Israel could not find its way back

📖 Even a donkey outperforms God's people
---
# Isaiah 1:4-9
# 🩹 A Nation Covered In Wounds
---
## 😢 Laden With Iniquity

"Laden" means weighed down, like a cart overloaded with cargo.

Iniquity is not a single sin but a whole pattern of guilt.

Isaiah pictures the nation staggering under a load it built for itself.

No one forced this weight onto Judah.

🎒 Laden means weighed down and loaded

⚖️ Iniquity means a whole pattern of guilt

🐌 The nation staggers under its own weight

📖 Judah built this load itself

## ✝️ The Holy One Of Israel

This title appears throughout the book of Isaiah more than anywhere else in the Bible.

"Holy" means set apart, completely different from anything sinful or common.

Calling God this title right after listing Israel's sins makes the contrast obvious.

The more the nation sins, the sharper this title cuts.

✝️ Holy means set apart from sin

📖 Isaiah uses this title again and again

⚡ The contrast sharpens with every sin

➡️ Holiness exposes how far Israel has drifted

## 🔙 Gone Away Backward

This is not a wandering off by accident.

"Backward" pictures a person turning their back and walking the opposite direction on purpose.

Israel is not lost.

Israel has deliberately reversed course.

🔙 Backward means a deliberate reversal

🚫 Not an accident but a choice

🙈 Turning their back on purpose

📖 Reversal, not confusion, describes Israel here

## 🤕 The Whole Head Is Sick, And The Whole Heart Faint

Isaiah pictures the whole nation as one sick body.

The head often stands for the leaders and the heart for the people's inner life.

Every part named here is failing at once.

This is total collapse, not one bad decision.

🧠 Head pictures the nation's leaders

❤️ Heart pictures the people's inner life

🏥 Every part is failing together

📖 This is total collapse, not one flaw

## 🩸 Wounds, And Bruises, And Putrifying Sores

"Putrifying" means rotting and infected, not simply painful.

Isaiah lists three stages, a fresh wound, an old bruise, and a sore left to fester.

Picture an injury that was never once cleaned.

That untreated wound is Isaiah's picture of Judah's guilt.

🩹 Putrifying means rotting and infected

📈 Three stages, fresh to festering

🚫 Never once cleaned or treated

📖 This is guilt left to rot

## 🧴 Mollified With Ointment

"Mollified" means softened or soothed.

Ancient wound care usually meant softening a wound with oil before wrapping it.

None of that basic care has been done here.

The nation's wounds have been left completely untreated.

🧴 Mollified means softened with oil

🩹 Ancient wound care used simple oil

🚫 None of that care was given

📖 The neglect is total

## 🏙️ The Daughter Of Zion

"Daughter of Zion" is a poetic name for Jerusalem and its people together.

Prophets often speak of a city as if it were a person, even a woman.

The title makes the coming description personal rather than only geographic.

What happens to this daughter matters emotionally, not only politically.

👧 Daughter of Zion means Jerusalem's people

🏙️ Cities are pictured as a person

💔 The image makes judgment feel personal

📖 This is about people, not just land

## 🏕️ As A Cottage In A Vineyard

A cottage here does not mean a house.

It means a flimsy hut a watchman used only during harvest season.

Once the harvest ended, the hut was abandoned and left to fall apart.

Jerusalem is pictured as that leftover, emptied out shelter.

🏕️ Cottage means a temporary harvest hut

🍇 Used only during the vineyard season

🚪 Abandoned once the harvest ends

📖 Jerusalem looks just as emptied out

## 🥒 A Lodge In A Garden Of Cucumbers

A lodge worked the same way as the cottage named just before it.

It was a small shelter built to guard a cucumber field for one season.

Once the season passed, no one bothered to keep it standing.

Isaiah repeats the image on purpose so the reader cannot miss it.

🥒 Lodge means a seasonal field shelter

📅 Built for guarding one growing season

🍂 Left to fall once the season ends

➡️ Repeating the image makes the point land

## 🛡️ As A Besieged City

This line points forward to an event later in Isaiah's own book.

In 701 BC the Assyrian king Sennacherib surrounded Jerusalem while every other city in Judah fell.

Jerusalem stood alone, cut off, and surrounded like an island.

Isaiah is describing what Judah's own eyes would soon see.

🛡️ Besieged means surrounded and cut off

📅 Points to Sennacherib's invasion in 701 BC

🏝️ Jerusalem stood alone while others fell

📖 Isaiah describes what was still coming

## ⚔️ The LORD Of Hosts

"Hosts" means armies, both the armies of heaven and the armies of earth.

The title pictures God as a commander leading more forces than any human king could raise.

Even facing an empire like Assyria, Judah's real defense was not its own army.

The name itself was meant to be a comfort in the middle of a threat.

⚔️ Hosts means armies, not just people

👑 God commands heaven's armies and earth's

🛡️ Judah's defense was never its own army

📖 The title comforts in the face of threat

## 🔥 As Sodom, And We Should Have Been Like Unto Gomorrah

Sodom and Gomorrah were the two cities destroyed by fire in the book of Genesis.

By Isaiah's time their names had become shorthand for total, final judgment.

Isaiah says Judah came within one small remnant of that exact fate.

Only God's mercy kept the nation from complete destruction.

🔥 Sodom and Gomorrah were destroyed cities

⚠️ Their names became shorthand for judgment

📏 Judah came within a remnant of that fate

📖 Only mercy kept the nation standing
---
# Isaiah 1:10-15
# 🐑 Sacrifices God Refuses
---
## 😱 Ye Rulers Of Sodom

Isaiah is not talking to literal residents of Sodom and Gomorrah.

He is calling Judah's own rulers and people by that name on purpose.

The insult from the verses just before becomes a direct address here.

Judah's worship looked religious, but its character matched the most sinful cities in scripture.

😱 Judah's own leaders are meant here

🔥 Sodom and Gomorrah used as an insult

🎭 Religious worship hid sinful character

📖 The address turns Judah into the mirror

## 🐑 The Multitude Of Your Sacrifices

"Multitude" means the sheer number, not the quality.

Judah was not failing to offer sacrifices.

They were offering more sacrifices than ever, just without a changed heart.

God is rejecting the quantity because the heart behind it never changed.

🔢 Multitude means the sheer number offered

📈 Judah was sacrificing more, not less

💔 The heart behind it never changed

📖 Quantity could not replace a changed heart

## 🐏 Burnt Offerings Of Rams

A burnt offering was the costliest kind of sacrifice, completely consumed on the altar.

None of it was kept back for the worshiper to eat.

God is naming His own most costly kind of offering and rejecting it anyway.

The problem was never the price tag of the sacrifice.

🔥 Burnt offerings were completely consumed

💰 They were the costliest kind of offering

🚫 God rejects even the costliest gift

📖 Price was never the real problem

## 🐄 The Fat Of Fed Beasts

The fat portions of an animal were considered the choicest part.

Worshipers were told to bring their best animals, not their leftovers.

Judah was doing exactly that, bringing prime, well fed livestock.

Even their best offerings could not cover for their broken lives.

🥩 Fat meant the choicest part of the animal

⭐ Worshipers brought their very best

🐄 Judah's animals were well fed and prime

📖 Their best still could not fix their lives

## 🚶 To Tread My Courts

"Tread" simply means to walk or to step.

Picture the temple courts crowded with feet, worshiper after worshiper walking through.

God says all that foot traffic never once asked for genuine devotion.

The courts were full while the hearts stayed empty.

🚶 Tread means to walk or step

🏛️ Pictures the temple courts crowded with feet

🙄 God never asked for foot traffic alone

📖 Full courts, empty hearts

## 🚫 Vain Oblations

"Vain" means empty or worthless.

"Oblations" is simply a general word for gifts or offerings brought to God.

Together the phrase means worthless gifts, offerings that carry no real devotion inside them.

An offering without a changed heart is not really a gift at all.

🚫 Vain means empty or worthless

🎁 Oblations means gifts or offerings

💨 Together they mean worthless gifts

📖 A gift without devotion is not a gift

## 🧨 Incense Is An Abomination Unto Me

"Abomination" is one of the strongest words of disgust in the Old Testament.

Incense itself was commanded in the law and burned daily inside the temple.

The incense was never the problem.

The disgust was aimed at what the incense had become, a cover for empty religion.

🤢 Abomination means the strongest kind of disgust

🕯️ Incense itself was commanded in the law

🎭 It had become a cover, not worship

📖 God's disgust targets the cover, not the smoke

## 🌙 The New Moons And Sabbaths

New moons marked the start of each month on Israel's calendar and came with their own offerings.

Sabbaths marked the weekly day of rest commanded in the law.

Both were regular, built in parts of Israel's worship rhythm.

Even these ordinary, repeated observances had gone hollow to God.

🌙 New moons began each month's calendar

📅 Sabbaths were the weekly day of rest

🔁 Both were regular, commanded observances

📖 Even the ordinary rhythms had gone hollow

## 📣 The Calling Of Assemblies

An assembly was a sacred gathering called for worship on a set day.

The calling of it means the formal summons that brought everyone together.

God is saying even the summons itself now bothers Him.

The problem had reached all the way down to the invitation.

📣 Assembly means a called worship gathering

📯 Calling means the formal summons itself

😩 Even the summons now bothers God

📖 The problem reached the invitation itself

## 😤 I Cannot Away With

This is an old English idiom that has mostly disappeared from modern speech.

It means I cannot put up with this, I cannot bear it any longer.

God is not being distant or formal here.

He is expressing genuine exasperation at hollow worship.

🗣️ An old idiom rarely used today

😤 It means I cannot bear this

💢 God sounds genuinely exasperated

📖 Hollow worship provokes real frustration

## 💭 My Soul Hateth

Scripture rarely uses the word hate for God's own reaction.

Here it describes His response to festivals that were supposed to honor Him.

The strength of the word matches how far this worship had drifted from its purpose.

Ritual done without the heart is not neutral to God.

💭 Hate is a rare word for God's reaction

🎉 Aimed at festivals meant to honor Him

📏 The strength matches how far it drifted

📖 Empty ritual is never neutral to God

## 🩸 Your Hands Are Full Of Blood

This line most likely does not describe literal murder by every single worshiper.

Hands full of blood was a common way to describe injustice and exploiting the poor.

The same hands that were lifted in prayer were also profiting from harming others.

Worship and injustice cannot share the same hands.

🩸 Blood on hands often pictured injustice

💰 Likely describes exploiting the poor

🙏 The same hands prayed and profited

📖 Worship and injustice cannot mix
---
# Isaiah 1:16-20
# 🧼 Come Let Us Reason Together
---
## 🧼 Wash You, Make You Clean

This command uses washing, the same picture as ritual cleansing at the temple.

Here it is aimed at behavior instead of ceremony.

The blood on their hands named just before needs an actual change, not a ritual bath.

God is asking for a cleaned life, not a cleaned body.

🧼 Washing pictures cleansing, now moral

🩸 It answers the bloody hands just named

🚿 A ritual bath was never the point

📖 God wants a cleaned life, not a ritual

## ⚖️ Seek Judgment, Relieve The Oppressed

"Judgment" here means justice, the fair and right treatment of people.

Seeking it means actively working for it, not just avoiding wrongdoing.

"Relieve" means to lighten a heavy load someone else is carrying.

God's call to worship rightly always includes a call to act justly.

⚖️ Judgment means justice, not just opinion

🏃 Seek means actively working for it

🪶 Relieve means lightening someone's heavy load

📖 True worship always includes justice

## 👶 Judge The Fatherless, Plead For The Widow

The fatherless and the widow appear together throughout the Old Testament law.

Both had lost their normal legal protector in that culture, a father or a husband.

Without family standing behind them, they were the easiest people to cheat in court.

God repeatedly ties true religion to how a society treats exactly these two groups.

👶 Fatherless and widow lacked a legal protector

⚖️ They were the easiest to cheat in court

📜 The law repeatedly protects both groups

📖 True religion is measured by their treatment

## 🤝 Come Now, And Let Us Reason Together

This is an invitation, not a demand.

"Reason together" pictures two parties sitting down to work through a dispute honestly.

God is offering Judah a real conversation instead of instant punishment.

Judgment was still possible, but it was not God's first move here.

🤝 This line is an invitation

💬 Reason together means an honest dialogue

⏳ Judgment was not God's first move

📖 God offers conversation before punishment

## 🔴 Though Your Sins Be As Scarlet

Scarlet dye in the ancient world came from crushed insects and was famous for never fading.

Clothing dyed scarlet kept its color through washing after washing.

Calling sin scarlet pictures guilt that seems permanently set in place.

God promises to do what no ancient dye process could ever undo.

🔴 Scarlet dye was famous for never fading

🧵 It pictures guilt that feels permanent

❄️ Snow pictures a totally different state

📖 God undoes what no dye process could

## 🟥 Red Like Crimson

Crimson was a similar, equally stubborn red dye used in the ancient world.

Isaiah repeats the same promise using a second dye and a second image of purity.

Wool in its natural, undyed state was plain white.

Two dyes and two pure comparisons make the promise impossible to miss.

🟥 Crimson was another stubborn red dye

🔁 The promise repeats with a second pair

🐑 Wool in its natural state was white

📖 Two images make the promise unmistakable

## 🙋 If Ye Be Willing And Obedient

"Willing" describes the attitude of the heart.

"Obedient" describes the actual action that follows it.

Both are named together on purpose, since one without the other was exactly Judah's problem.

God is asking for a whole response, not a partial one.

🙋 Willing describes the heart's attitude

🏃 Obedient describes the action that follows

🧩 Both together answer Judah's real problem

📖 God asks for a whole response

## 🌾 Ye Shall Eat The Good Of The Land

This promise echoes the blessings Moses laid out generations earlier in Deuteronomy.

Obedience was tied to real, physical provision in the covenant, not only to inward peace.

The land itself would reward a nation that returned to God.

The choice in front of Judah was never only spiritual.

🌾 The good of the land means provision

📜 It echoes Deuteronomy's covenant blessings

🌍 Obedience was tied to physical results

📖 The choice was never only spiritual

## ⚔️ Devoured With The Sword

This is the matching curse from that same covenant in Deuteronomy.

"Devoured" pictures war consuming a nation the way fire consumes dry wood.

The sword stands for invasion and military defeat.

Blessing and curse were both already written before Judah made its choice.

⚔️ Devoured pictures war consuming a nation

🔥 It matches Deuteronomy's covenant curse

🗺️ The sword stands for invasion

📖 Both outcomes were already on record

## 🗣️ The Mouth Of The LORD Hath Spoken It

This closing line is a legal seal on everything just said.

In Isaiah's world a spoken royal decree could not be casually reversed.

Pairing blessing and curse with this line means both are equally certain.

The choice belongs to Judah, but the outcome is already guaranteed either way.

🗣️ This line seals the decree

👑 A royal decree could not be reversed

⚖️ Both outcomes are equally certain

📖 The choice is real, the outcome is sure
---
# Isaiah 1:21-23
# 💔 The Faithful City Turned Harlot
---
## 💔 The Faithful City Become An Harlot

Prophets often pictured a city or a nation as a wife married to God.

A harlot is someone unfaithful to that kind of relationship.

Jerusalem is being accused of covenant unfaithfulness, the same charge marriage law would bring against a wife.

The image is meant to feel as personal and painful as it sounds.

💍 Cities were pictured as a wife to God

💔 Harlot means unfaithful to that marriage

⚖️ This is a covenant charge, not an insult

📖 The pain is intentional in the image

## 🏡 Righteousness Lodged In It

"Lodged" means it once made its permanent home there.

The verse is not describing a visitor passing through.

Righteousness used to live in Jerusalem the way a resident lives in a house.

That resident has since been driven out.

🏡 Lodged means made a permanent home

👤 Not a visitor but a resident

🚪 Righteousness has since been driven out

📖 What once lived there is now gone

## ⚗️ Thy Silver Is Become Dross

"Dross" is the waste material skimmed off the top during metal refining.

It looks similar to silver but carries none of its value.

Judah once had real worth, pictured here as pure silver.

What remained looked the same on the outside but had lost its true value.

⚗️ Dross is the waste from refining metal

👀 It looks similar but has no value

🥈 Judah once had genuine worth

📖 The outside looked fine, the value was gone

## 🍷 Thy Wine Mixed With Water

Diluting wine with water was a common way merchants cheated customers in the ancient world.

The buyer paid full price for a weakened, watered down product.

This image sits right beside the silver and dross, both pictures of dishonest business.

Judah's worship and its business practice had both become forms of the same deception.

🍷 Diluted wine was a common merchant scam

💰 Buyers paid full price for less value

🥈 It matches the dross image beside it

📖 Worship and business shared the same deceit

## 🤝 Companions Of Thieves

"Companions" here means close partners, not casual acquaintances.

Judah's leaders were not simply failing to stop theft.

They were actively working alongside those who committed it.

Leadership had become part of the very corruption it was supposed to police.

🤝 Companions means close partners here

👀 Not failing to stop theft

🤲 Actively working alongside thieves

📖 Leaders became part of the corruption

## 🎁 Every One Loveth Gifts, And Followeth After Rewards

"Gifts" and "rewards" here are polite words for bribes.

Judges were expected to rule justly no matter who stood before them.

Instead the verdict went to whoever paid the most.

A justice system built to protect the weak had been sold to the highest bidder.

🎁 Gifts and rewards were polite words for bribes

⚖️ Judges were meant to rule justly

💰 Verdicts went to the highest bidder

📖 A system built for the weak was sold
---
# Isaiah 1:24-31
# 🔥 Purged Like Silver, Burned Like Tow
---
## 💪 The Mighty One Of Israel

This title pairs with the Holy One of Israel used earlier in the chapter.

"Mighty" points to God's power to actually carry out what He has promised.

Judgment is not an empty threat from a weak or distant figure.

The title itself guarantees the promise that follows will happen.

💪 Mighty points to God's power to act

✝️ It pairs with Holy One of Israel

📢 The threat is not empty

📖 The title guarantees the promise ahead

## 😌 I Will Ease Me Of Mine Adversaries

This does not mean God is simply venting anger.

"Ease" pictures relief, the way a person feels relief after finally dealing with a problem.

God's judgment here has a clear purpose, not only a punishment in mind.

The goal is to remove what is opposing Him, not to destroy for its own sake.

😌 Ease pictures relief, not venting

🎯 Judgment here has a clear purpose

🚫 Not destruction for its own sake

📖 The goal is removing opposition

## ⚗️ Purely Purge Away Thy Dross

This answers the dross named earlier in the chapter directly.

"Purge" means to remove completely, leaving nothing of the waste behind.

Refining fire was never meant to destroy the silver.

It was meant to burn away everything that was not silver.

⚗️ Purge means removing waste completely

🔥 Refining fire targets the waste, not the silver

🥈 This answers the earlier dross image

📖 Judgment aims to leave the silver behind

## 🪙 Take Away All Thy Tin

Tin was a cheaper metal sometimes mixed in with silver to fake its weight.

A dishonest merchant could pass off tin mixed silver as the real thing.

God promises to remove every trace of that counterfeit mixture.

What remains afterward will be genuine all the way through.

🪙 Tin was mixed in to fake silver

🎭 It let merchants pass off counterfeit goods

🧹 God removes every counterfeit trace

📖 What remains will be genuine again

## 👨‍⚖️ Restore Thy Judges As At The First

"As at the first" points back to an earlier, better era of leadership.

This likely recalls the period before Judah's kings had drifted into corruption.

Restoration here does not mean something brand new.

It means a return to what had once genuinely worked.

👨‍⚖️ Points back to an earlier era

📜 It recalls leadership before it drifted

🔁 Restoration is a return, not an invention

📖 God rebuilds what had once worked

## 📜 Thy Counsellors As At The Beginning

"Counsellors" were the trusted advisers who helped a king govern well.

Pairing them with judges shows both levels of leadership were once trustworthy.

Both had since fallen into the same corruption named earlier in the chapter.

God's promise restores leadership from the top down to the courtroom.

📜 Counsellors were a king's trusted advisers

👥 Judges and counsellors are named together

📉 Both had fallen into the same corruption

📖 Restoration covers every level of leadership

## 🏙️ The City Of Righteousness, The Faithful City

This title directly answers the harlot city named earlier in the chapter.

The very same city receives an entirely new name.

Nothing about the location changes, only what fills it.

Isaiah bookends the whole chapter around this one city.

🏙️ Answers the harlot city from earlier

🔁 Same city, entirely new name

📍 The location itself never changes

📖 Isaiah bookends the chapter around Zion

## 🕊️ Zion Shall Be Redeemed With Judgment

"Redeemed" is a legal word for buying someone back out of debt or slavery.

Judgment here is not the opposite of redemption.

The purging already described is what makes redemption possible.

God rescues Zion through the very judgment that first cleaned it.

🕊️ Redeemed means bought back from debt

⚖️ Judgment is not redemption's opposite

🔥 Purging is what makes rescue possible

📖 Judgment and redemption work together here

## 🔄 Her Converts With Righteousness

"Converts" here means those within the city who turn back to God.

Not everyone in Zion needed rescuing the same way.

Some had already turned before judgment fully arrived.

Their righteousness becomes part of the city's new identity.

🔄 Converts means those who turned back

👥 Not everyone needed rescue the same way

🌱 Some had already turned early

📖 Their righteousness shapes the city's new name

## 🌳 The Oaks Which Ye Have Desired

Oak trees were often used as sacred sites for pagan worship in the ancient Near East.

People believed spiritual power lived inside certain large, old trees.

Judah had been drawn toward this kind of worship instead of the temple.

Naming a specific desired object exposes exactly what had competed with God.

🌳 Oaks were used as pagan worship sites

🌍 A common ancient Near Eastern practice

🏛️ Judah turned to trees instead of the temple

📖 The desire exposes what competed with God

## 🥀 The Gardens Which Ye Have Chosen

Sacred gardens worked much like the oaks named just before this line.

Both were sites tied to fertility worship borrowed from surrounding nations.

Isaiah names both together so neither idol can hide behind the other.

Judah is about to watch both of these choices fail publicly.

🥀 Gardens were tied to fertility worship

🌳 Paired with the oaks just named

🙈 Named together so neither idol hides

📖 Both choices are about to fail publicly

## 🍂 As An Oak Whose Leaf Fadeth

The very tree Judah worshiped becomes the picture of Judah's own shame.

A fading leaf signals a tree that is dying from the inside.

The object of worship could not even keep itself alive.

Something dying cannot save the people who trusted it.

🍂 The worshiped tree pictures Judah's shame

🥀 A fading leaf signals a dying tree

🚫 The idol could not stay alive

📖 A dying object cannot save its worshiper

## 🏜️ As A Garden That Hath No Water

A garden without water in a dry climate does not slowly decline.

It dies quickly, often within days.

Everything Judah leaned on instead of God turns out to be just as fragile.

The choice they made could never sustain the life they wanted.

🏜️ A waterless garden dies quickly

📅 Often within only days

🌿 Their substitute for God was just as fragile

📖 The choice could not sustain real life

## 🌾 The Strong Shall Be As Tow

"Tow" is the short, loose, rough fiber left over from processing flax.

It was cheap material, but it caught fire instantly.

Calling the strong "tow" strips away any sense of real security.

Strength built on idols burns exactly as fast as this leftover fiber.

🌾 Tow is leftover fiber from flax

🔥 It catches fire instantly

💪 The strong lose their sense of security

📖 False strength burns as fast as tow

## 🔥 The Maker Of It As A Spark

The spark and the tow are named side by side on purpose.

The idol maker is the spark, the idol itself is the dry fuel.

Together they guarantee their own destruction the moment judgment arrives.

The very people who built these idols will help burn them down.

🔥 The maker becomes the spark

🌾 The idol becomes the dry fuel

🤝 Together they guarantee their own end

📖 Idol makers help burn their own work

## 🚒 None Shall Quench Them

"Quench" means to put out a fire completely.

No one steps in to stop this one.

The chapter opened with a nation covered in untreated wounds.

It closes with that same nation's false hopes burning down with nothing left to save them.

🚒 Quench means to put out completely

🙅 No one intervenes to stop it

🩹 The chapter opened with untreated wounds

📖 It closes with false hope burning out
`.trim();

export const ISAIAH_ONE_PERSONAL_SECTIONS = parseIsaiahOneRawNotes(ISAIAH_ONE_RAW_NOTES);
