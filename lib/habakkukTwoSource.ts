export type HabakkukTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHabakkukTwoRawNotes(rawText: string): HabakkukTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HabakkukTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Habakkuk\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Habakkuk 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Habakkuk\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Habakkuk\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Habakkuk 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Habakkuk 2:${startVerse}` : `Habakkuk 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Habakkuk 2 sections, received " + sections.length);
  }

  return sections;
}

const HABAKKUK_TWO_RAW_NOTES = `# Habakkuk 2:1-3
# ⏳ The Watchman Waits For An Answer
---
## 👀 I Will Stand Upon My Watch

A watch was a lookout post on a city wall.

Habakkuk takes that same deliberate position now before God.

He just finished pouring out a long complaint in chapter one.

Now he stops talking and waits in silence for a reply.

Waiting here is active, not passive.

It takes the same discipline as a soldier guarding a post all night.

👀 A watch means a lookout post

🤐 Habakkuk stops arguing and goes quiet

⏳ He waits deliberately for an answer

📖 Waiting takes real discipline too

## 🏯 Set Me Upon The Tower

A tower gave a watchman the highest, clearest view in a city.

This repeats the same idea from the first half of the verse.

Here height pictures focus, not literal elevation.

Habakkuk is doing everything he can to see God's answer clearly.

🏯 A tower gave the clearest view

🔁 This repeats the watch image again

🎯 Height here means focus, not elevation

📖 He wants to see the answer clearly

## ❓ What I Shall Answer When I Am Reproved

"Reproved" means being corrected or challenged by someone with authority.

Habakkuk expects God to push back on his complaint.

He is not just hoping for comfort.

He is preparing his own response in advance.

That is a bold move to make toward God.

❓ Reproved means being corrected

🛡️ Habakkuk expects pushback, not comfort

💪 He prepares his own response

📖 Honest prayer can brace for correction

## 📜 Write The Vision And Make It Plain Upon Tables

"Tables" here does not mean furniture.

It means flat tablets, likely wood or clay, used for writing.

God tells Habakkuk to write the message in large, clear letters.

That way, someone running past could read it without stopping.

The point is urgency.

This message needed to spread fast, not stay hidden in fine print.

📜 Tables means flat writing tablets

✍️ Written in large, clear letters

🏃 A runner could read it without stopping

📖 The message had to spread quickly

## ⏳ For The Vision Is Yet For An Appointed Time

Habakkuk already believes the vision is true.

What troubles him is timing, not truth.

God says the message points to a time already set in advance.

That time has not arrived yet, but the date was never left open.

Nothing about this delay means God forgot or changed His mind.

⏳ An appointed time means already set

🗓️ Delay never means God forgot

🤔 Habakkuk's real struggle was timing

📖 God's plans run on His own calendar

## ⏰ Though It Tarry Wait For It

"Tarry" means to be delayed or take longer than expected.

God does not promise this will happen quickly.

He promises it will happen exactly as planned.

Waiting is the hard part here, not doubting the truth.

This verse closes with total certainty.

It will surely come.

It will not be late.

⏰ Tarry means a delay, not cancellation

🤞 Waiting is the real challenge here

✅ The vision will surely happen

📖 God's timing is never late

# Habakkuk 2:4-6
# ⚖️ The Proud And The Faithful
---
## 🎈 His Soul Which Is Lifted Up Is Not Upright In Him

"Lifted up" describes someone puffed up with pride.

"Upright" means living with honesty and real integrity.

This verse sets up the main contrast of the whole chapter.

One side is proud and crooked.

The other side, coming next, is humble and faithful.

🎈 Lifted up means puffed up pride

📏 Upright means honest and straight

⚖️ This sets up the chapter's main contrast

📖 Pride and faith stand opposite each other

## 🙏 The Just Shall Live By His Faith

This line becomes one of the most quoted verses in the New Testament.

Paul quotes it in Romans and in Galatians.

The writer of Hebrews quotes it too.

Here it originally means trusting God's timing, even as Babylon rises.

"Faith" in this setting means steady trust, not a one time decision.

The proud nation around Habakkuk trusts itself.

The righteous person trusts God instead.

📖 Quoted three times in the New Testament

🙏 Faith here means steady trust

⚖️ It contrasts directly with pride

➡️ Trusting God outlasts trusting yourself

## 🍷 He Transgresseth By Wine He Is A Proud Man

"Transgresseth" means breaking a boundary or a moral law.

Wine here pictures greed and excess, not just literal drunkenness.

This describes the arrogant character of the Babylonian empire itself.

Pride and excess always travel together in this picture.

A person or nation drunk on success stops noticing its own limits.

🍷 Wine pictures greed and excess

🚧 Transgresseth means breaking a boundary

👑 This describes Babylon's arrogant character

📖 Success without limits turns dangerous

## ⚰️ Who Enlargeth His Desire As Hell And Is As Death

"Hell" here means Sheol, the grave, pictured as a bottomless pit.

A grave never says it is full.

Neither does death ever turn away another person.

Babylon's hunger for conquest is compared to that same bottomless appetite.

Think of a container with no bottom at all.

No matter how much pours in, it is never satisfied.

⚰️ Hell means Sheol, the grave

🕳️ A grave is never full

👑 Babylon's hunger has no limit

📖 Unchecked ambition is never satisfied

## 🌍 Gathereth Unto Him All Nations And Heapeth Unto Him All People

This describes an empire absorbing nation after nation by force.

Babylon's conquests were not a rumor Habakkuk only heard about.

He had already seen this coming in chapter one.

Every nation added to the pile feeds the hunger named in verse five.

Nothing in this chapter suggests this growth will ever satisfy Babylon.

🌍 Nations fall one after another

👑 Babylon absorbs them by force

🔁 This feeds the hunger from verse five

➡️ This growth never reaches satisfaction

## 🗣️ Shall Not All These Take Up A Parable Against Him

A "parable" here means a mocking saying passed around about someone.

A "taunting proverb" works the same way, a cutting line meant to humiliate.

The nations Babylon conquered will eventually turn those words back on their conqueror.

Mockery becomes its own kind of judgment.

The proud oppressor becomes someone people joke about instead of fear.

🗣️ Parable means a mocking saying

😏 Taunting proverb means a cutting insult

🔄 Conquered nations will mock Babylon back

📖 Mockery becomes its own judgment

## ⚖️ Woe To Him That Increaseth That Which Is Not His

This is the first of five formal woe lines in this chapter.

A "woe" in prophecy announces coming judgment, not just a complaint.

This one targets wealth built by taking what belongs to someone else.

"Thick clay" likely means pledges or loot held as debt, not literal mud.

Many scholars read the Hebrew word this way.

Either way, wealth stacked up through theft eventually collapses.

⚖️ Woe announces coming judgment

💰 Stolen wealth is the target here

🧱 Thick clay likely means extorted pledges

📖 Wealth built on theft will collapse

# Habakkuk 2:7-8
# 😮 The Tables Turn Suddenly
---
## 👥 Shall They Not Rise Up Suddenly That Shall Bite Thee

The word "they" points to the very nations Babylon has plundered.

"Bite" and "vex" describe a sudden uprising, not a slow decline.

The empire that thought it was safe gets blindsided instead.

This directly answers the woe just announced in verse six.

👥 They means the conquered nations

😮 Bite means a sudden attack

💤 Babylon is caught off guard

📖 Judgment answers the woe directly

## 🎁 Thou Shalt Be For Booties Unto Them

"Booties" means spoils of war, goods taken from a defeated enemy.

Babylon spent years collecting booty from nations it conquered.

Now the same word gets turned back onto Babylon itself.

The taker becomes the one taken from.

🎁 Booties means plunder taken in war

🔁 The same word turns back on Babylon

⚔️ The taker becomes the target

➡️ Conquest does not stay one sided

## 🏴 Because Thou Hast Spoiled Many Nations

"Spoiled" means plundered or stripped of goods by force.

This verse names exactly why the coming judgment fits.

Babylon plundered many nations across its empire.

What goes out eventually comes back the same way it left.

🏴 Spoiled means plundered by force

🌍 Many nations suffered under Babylon

🔁 This judgment matches the original crime

📖 What goes around comes back around

## 🩸 Because Of Men's Blood And For The Violence Of The Land

This verse names the real charge against Babylon.

It is not simply ambition or conquest in general.

It is bloodshed and violence against real people.

It reached whole cities too.

The judgment in this chapter is about justice, not jealousy.

🩸 Men's blood names the real charge

🏙️ Violence touched land, city, and people

⚖️ This is about justice, not envy

📖 God judges real cruelty, not success

# Habakkuk 2:9-11
# 🦅 A Nest Built On Theft
---
## 💰 Woe To Him That Coveteth An Evil Covetousness To His House

This is the second formal woe in the chapter.

"Covetousness" means a greedy desire for more than is fair.

"His house" can mean his literal home or his whole dynasty.

This woe targets greed used to build personal security.

⚖️ The second woe in this chapter

💰 Covetousness means greedy desire for more

🏠 His house means his home or dynasty

📖 Greed here aims at false security

## 🦅 That He May Set His Nest On High

Birds build nests high up to stay safe from predators.

Babylon is pictured doing the same thing with stolen wealth.

Think of an eagle building far above any threat on the ground.

A high nest still cannot protect anyone from real judgment.

🦅 A high nest keeps predators away

👑 Babylon copies that same instinct

⛰️ Height usually means safety

📖 No height escapes real judgment

## 🏰 That He May Be Delivered From The Power Of Evil

Babylon builds all this wealth to feel untouchable.

The irony is sharp, since Babylon itself is the evil in this chapter.

No nest built from plunder can shield anyone from real judgment.

Safety built on theft is never actually safety.

🏰 Babylon wants to feel untouchable

😬 Babylon itself is the real threat

🚫 Stolen wealth cannot buy real safety

➡️ False security always fails eventually

## 📋 Thou Hast Consulted Shame To Thy House

"Consulted" means Babylon planned this outcome on purpose, not by accident.

Cutting off many people brought shame, not the safety Babylon wanted.

The violence meant to protect the house destroyed its reputation instead.

Sin against others always circles back as harm to the self.

📋 Consulted means planned on purpose

💔 The plan brought shame, not safety

🔄 Harm to others circled back around

📖 Sin against others harms the self too

## 🧱 The Stone Shall Cry Out Of The Wall

This pictures the actual building materials testifying against their owner.

A stone taken by force or built with unpaid labor becomes a silent witness.

"The beam out of the timber shall answer it" repeats the same idea with wood.

Even the walls of ill gotten buildings have something to say.

Nothing built through cruelty stays quiet forever.

🧱 Stones become silent witnesses here

🪵 Timber beams repeat the same idea

🏚️ Ill gotten buildings cannot stay silent

📖 Cruelty eventually gets exposed

# Habakkuk 2:12-14
# 🌊 A Glory That Fills The Earth
---
## ⚖️ Woe To Him That Buildeth A Town With Blood

This is the third formal woe in the chapter.

"Buildeth a town with blood" means building power through violent conquest.

"Stablisheth a city by iniquity" repeats the same charge in different words.

Babylon's entire empire was funded by bloodshed and injustice.

⚖️ The third woe in this chapter

🩸 Built with blood means built through violence

🏙️ Iniquity means injustice and wrongdoing

📖 An empire funded by bloodshed

## 🔥 The People Shall Labour In The Very Fire

This pictures conquered people forced into exhausting labor projects.

Many of those projects, like city walls and towers, were destined to burn anyway.

Fire here undoes years of exhausting work in a single moment.

All that effort was headed toward nothing from the very start.

🔥 Labour in fire means exhausting forced work

🏗️ The buildings were destined to burn

💨 Years of work undone in moments

📖 The effort was pointless from the start

## 💨 Weary Themselves For Very Vanity

"Vanity" means emptiness, effort that produces nothing lasting.

This repeats the same idea as the fire, using different words.

Both lines describe labor that exhausts people without ever paying off.

God decided in advance that this effort would never succeed.

💨 Vanity means empty, pointless effort

🔁 This repeats the fire image before it

😓 Exhausting work with no real payoff

📖 God decided this effort would fail

## 🌊 The Earth Shall Be Filled With The Knowledge Of The Glory Of The LORD

This is one of the most hopeful lines in the whole book.

Babylon's glory was built on violence and will not last.

God's glory will instead fill the whole earth completely.

"As the waters cover the sea" means total, not partial.

Every ocean on earth is covered completely, with no gaps at all.

God's knowledge will reach the world that same completely.

🌍 The whole earth gets filled completely

🌊 Waters cover the sea means total

👑 Babylon's glory fades, God's glory remains

📖 God's glory outlasts every empire

## ❓ Is It Not Of The LORD Of Hosts

This sounds like a question but it is really a flat statement.

God is not a bystander watching Babylon rise and fall.

He is the one deciding that all this labor will fail.

Even an empire's failure happens under God's authority, not by accident.

❓ A rhetorical question stated as fact

👁️ God is not a bystander here

🎯 He decided this labor would fail

📖 Even failure happens under God's authority

# Habakkuk 2:15-17
# 🍷 The Cup Comes Back Around
---
## ⚖️ Woe Unto Him That Giveth His Neighbour Drink

This is the fourth formal woe in the chapter.

The image pictures someone getting a neighbor drunk on purpose.

A drunk person loses dignity and judgment at the same time.

Babylon is pictured forcing other nations into that same shameful weakness.

⚖️ The fourth woe in this chapter

🍾 Getting someone drunk strips their dignity

👑 Babylon forced nations into that weakness

📖 Shame was used as a weapon

## 😳 That Thou Mayest Look On Their Nakedness

"Nakedness" here means public shame and exposure, not just literal undress.

In the ancient world, exposing someone in public was a deep humiliation.

Babylon stripped conquered nations of dignity the same way, on a national scale.

This picture is cruelty dressed up as a drinking scene.

😳 Nakedness means public shame here

🏛️ Public exposure was deep humiliation then

🌍 Babylon humiliated nations, not just people

📖 Cruelty hid behind a drinking scene

## 🔄 Thou Art Filled With Shame For Glory

Babylon wanted glory and conquest.

Instead this verse promises shame in its place.

The exact humiliation Babylon forced onto others is about to return on Babylon.

Pride always sets up its own reversal eventually.

🔄 Shame replaces the glory Babylon wanted

🎯 Babylon faces its own humiliation now

⚖️ The punishment matches the original crime

📖 Pride sets up its own downfall

## 🍷 The Cup Of The LORD's Right Hand Shall Be Turned Unto Thee

A "cup" in prophetic language often pictures God's judgment, not a drink.

Other prophets like Jeremiah and Isaiah use this exact same picture.

Nations that made others drink shame will now drink God's wrath themselves.

"Shameful spewing" pictures a drunk person vomiting in public, utterly humiliated.

There is no dignified way to drink from this cup.

🍷 Cup here means God's judgment

🔄 Babylon now drinks what it forced on others

🤢 Shameful spewing means public disgrace

📖 Other prophets use this same image

## 🌲 The Violence Of Lebanon Shall Cover Thee

Lebanon was famous across the ancient world for its tall cedar forests.

Babylon and other empires stripped those forests for timber.

The wood fed constant building projects.

"The spoil of beasts" adds cruelty toward animals to the same charge.

This verse repeats the same violence named back in verse eight.

The same crime keeps showing up because the same judgment keeps applying.

🌲 Lebanon was famous for cedar forests

🪓 Babylon stripped those forests by force

🐾 Spoil of beasts adds cruelty to animals

📖 The same crime brings the same judgment

# Habakkuk 2:18-20
# 🛕 A Living God, Not A Silent Idol
---
## 🪵 What Profiteth The Graven Image

A "graven image" is an idol carved from wood or stone.

A "molten image" is an idol poured and shaped from melted metal.

This verse asks a blunt question.

What good does either one actually do?

A handmade god cannot do anything its maker could not already do.

🪵 Graven image means a carved idol

🥈 Molten image means a poured metal idol

❓ The verse asks what good it does

📖 A handmade god has no real power

## 🤥 A Teacher Of Lies

An idol cannot literally teach anything, since it cannot speak.

This phrase means trusting it teaches something false about reality.

Anyone who trusts a lifeless object ends up believing a lie about the world.

The lie is that something powerless can actually help or save.

🤥 Teacher of lies means false teaching

🪵 An idol cannot literally speak

🧠 Trusting it means believing something false

📖 The lie is that it can save

## 🤐 Dumb Idols

"Dumb" here means unable to speak, not unintelligent.

An idol has a carved mouth but no real voice.

This is the fifth and final woe of the chapter.

It is aimed squarely at idolatry itself, not just Babylon's pride or greed.

🤐 Dumb means unable to speak

👄 A carved mouth with no real voice

⚖️ The fifth and final woe here

📖 This woe targets idolatry directly

## 🗣️ Woe Unto Him That Saith To The Wood Awake

This pictures someone speaking commands to a block of wood.

"Arise, it shall teach" means expecting wood to stand up and give wisdom.

No amount of begging can give life to something that was never alive.

The absurdity is the whole point of this woe.

🗣️ Someone commands a block of wood

🙌 Arise means expecting it to stand

🚫 Lifeless things cannot gain life

📖 The absurdity makes the point

## 💨 There Is No Breath At All In The Midst Of It

Covering an idol in gold and silver only hides the problem.

No amount of decoration can put breath or life inside it.

"Breath" in scripture often marks the difference between something living and something dead.

This sets up the sharpest contrast in the chapter, coming in the very next line.

✨ Gold and silver only hide the problem

🚫 No decoration can add real life

💨 Breath marks living things apart from dead ones

📖 This sets up the chapter's sharpest contrast

## 🛕 The LORD Is In His Holy Temple

Unlike the idols just described, this God is actually present somewhere real.

The temple was the one place His presence was understood to dwell closely.

This single line answers every woe named earlier in the chapter.

A God who is really there needs no one to beg Him awake.

🛕 The temple is where God dwells

👁️ This answers every idol in the chapter

🔥 This God is actually present

📖 A real God never needs waking

## 🤫 Let All The Earth Keep Silence Before Him

The chapter ends exactly where it began, with silence before God.

Habakkuk opened the chapter standing watch, waiting quietly for an answer.

Now the whole earth is called to that same quiet posture.

Loud empires and silent idols both get answered by one command.

There is nothing left to say but to be still.

🤫 The chapter ends in silence again

👂 Habakkuk's watch returns at the end

🌍 The whole earth is called to wait

📖 Silence is the final right response
`.trim();

export const HABAKKUK_TWO_PERSONAL_SECTIONS = parseHabakkukTwoRawNotes(HABAKKUK_TWO_RAW_NOTES);
