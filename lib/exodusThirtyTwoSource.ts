export type ExodusThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyTwoRawNotes(rawText: string): ExodusThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 32:${startVerse}` : `Exodus 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 32 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_TWO_RAW_NOTES = `# Exodus 32:1-6
# 🐄 The People Build A Golden Calf
---
## ❓ We Wot Not What Is Become Of Him

"Wot" means "know."

"We wot not" simply means "we do not know."

Moses has been gone up the mountain for forty days.

The people's patience for a promise they cannot see runs out first.

They do not ask to return to Egypt.

They ask for a new god they can see and control.

❓ Wot not means do not know

⏳ Forty days already felt like forever

🐄 They want a god they can see

➡️ Aaron does not resist their demand

## 💍 Break Off The Golden Earrings

Aaron could have refused this request outright.

Instead he starts collecting gold from the frightened crowd.

This gold likely came from the plunder the Egyptians handed over as Israel left.

That same gold was meant to help build the tabernacle later in this book.

Here it funds an idol before the tabernacle is even built.

🙅 Aaron does not refuse the crowd

💰 He starts collecting their gold instead

🇪🇬 This gold came from Egypt's parting gifts

📖 The tabernacle's future gold funds an idol first

## 🔨 Fashioned It With A Graving Tool

A "graving tool" is a tool for engraving or carving metal.

"Molten" means melted down and poured into a mold.

Verse four names Aaron as the one shaping this calf himself.

He is not swept along helplessly by the crowd.

Chapter thirty one just described Spirit filled craftsmen building the tabernacle with skilled hands.

Aaron now uses his own hands to build the opposite.

🔨 Graving tool means a metal engraving tool

🔥 Molten means melted and poured into shape

👐 Aaron shapes this calf with his own hands

📖 This mirrors and reverses chapter thirty one's craftsmen

## 🙏 A Feast To The LORD

Aaron does not call this a brand new god.

He calls it "a feast to the LORD" instead.

He is trying to blend the golden calf into worship of the true God.

That blending is what makes this moment so dangerous.

Open rebellion is easy to spot and resist.

A mix of true worship and an idol is much harder to catch.

🎉 Aaron does not name a new god openly

🙏 He calls the calf a feast

⚠️ Blending worship with an idol is dangerous

📖 A blend is harder to catch than rebellion

## 🎶 Rose Up To Play

"Rose up to play" pictures a loud, unrestrained celebration around the calf.

The apostle Paul quotes this exact phrase in First Corinthians chapter ten.

He warns believers there to stay far from idolatry.

The feast began with worship words and ended in total chaos.

Words that sound like worship can still hide something rotten underneath.

🎶 Rose up to play means loud celebration

📖 Paul quotes this line in First Corinthians ten

⚠️ He warns readers there against idolatry

➡️ Worship words do not guarantee real worship

# Exodus 32:7-10
# 🔥 God Tells Moses What Has Happened
---
## 👇 Thy People Have Corrupted Themselves

God calls Israel "thy people" here, not "my people."

That shift in pronoun is not an accident.

It puts real distance between God and the nation in this moment.

"Corrupted" means they have ruined something that was pure.

Only forty days have passed since they promised to obey every word God spoke.

👇 God says thy people, not my people

📏 That shift signals real relational distance

💔 Corrupted means ruined something that was pure

➡️ Only forty days have passed since their promise

## 🐂 It Is A Stiffnecked People

"Stiffnecked" pictures an ox that refuses to bend its neck for the yoke.

The animal strains against the direction its master wants it to go.

This exact word describes Israel again later in this same book.

Moses himself uses it again in chapter thirty three.

Deuteronomy nine repeats the description as well.

🐂 Stiffnecked pictures an ox refusing its yoke

🔁 The same word returns later in Exodus

📖 Deuteronomy nine repeats this same description

➡️ God now proposes something drastic

## 🔥 Let Me Alone, That My Wrath May Wax Hot

"Wax hot" is an old way to say grow intense, the way a fire builds.

Here it describes God's own rising anger at what happened below.

"Let me alone" sounds like a command, but God needs no one's permission.

It reads more like an opening than a command.

Moses is invited to respond, not told to stay silent.

🔥 Wax hot means grow intense like fire

🚪 Let me alone sounds like an opening

🗣️ Moses is invited to respond here

➡️ God attaches a strange offer to this moment

## 🌟 I Will Make Of Thee A Great Nation

God offers to set Israel aside and start over through Moses alone.

That would make Moses a second Abraham, a brand new founding father.

Personal glory and a fresh start are handed to Moses on a plate.

What Moses does with this offer reveals exactly what kind of leader he is.

🌟 God offers to build a new nation

👑 Moses would become a second Abraham

🎁 Personal glory is offered on a plate

📖 Moses' response reveals his true character

# Exodus 32:11-14
# 🙏 Moses Intercedes For The People
---
## 🗣️ Moses Besought The LORD His God

"Besought" is the old past tense of "beseech," meaning to plead earnestly.

Moses does not offer a calm, polite request here.

God had just called Israel "thy people," meaning Moses' people.

Moses immediately hands that phrase right back to God.

He calls them "thy people," God's people, once again.

🗣️ Besought means pleaded earnestly, not calmly asked

🔄 Moses reverses God's own wording back

🤝 He hands the people back to God

➡️ Moses builds his case on more than feelings

## 🌍 Wherefore Should The Egyptians Speak

Moses' first argument is not about how the people feel.

It is about how the watching nations will read God's next move.

If Israel is destroyed right after the Exodus, Egypt reads that as failure, not judgment.

That reading would damage the reputation Moses is trying to protect.

🌍 Moses appeals to the watching nations first

🎯 The argument protects God's name, not comfort

🇪🇬 Egypt would read destruction as a failed rescue

➡️ Moses reaches for an even older argument

## 📜 Remember Abraham, Isaac, And Israel, Thy Servants

"Swarest" means swore, an old past tense of "swear."

Moses reminds God of an oath already made to the patriarchs.

That oath was sworn "by thine own self" in Genesis twenty two.

There was no one greater for God to swear by.

Moses is not inventing a new reason for mercy.

He is holding God to a promise God already made.

📜 Swarest means swore, an old verb form

🤝 The oath was made in Genesis twenty two

✋ God swore by himself, having no one greater

➡️ Moses holds God to an existing promise

## 💭 The LORD Repented Of The Evil

This "repenting" describes a real change in God's declared course of action.

It does not describe God correcting some past mistake.

The same relational language appears later when Nineveh repents in Jonah three.

God relents there too, in response to a real change below.

Prayer is shown here as something that actually matters.

Moses' plea genuinely factors into what happens next.

💭 Repented means a real change in God's course

🙅 It is not God fixing a past mistake

📖 Jonah three later uses this same language

➡️ Moses now must return to face the camp

# Exodus 32:15-20
# 💥 Moses Breaks The Tablets
---
## ✍️ The Tables Were The Work Of God

"Graven" means engraved or carved directly into stone.

This line nearly repeats the last line of the previous chapter.

These tablets were never Moses' own composition.

They are God's own handiwork, carried down the mountain by Moses.

Everything is about to fall apart the moment he reaches the camp.

✍️ Graven means engraved or carved into stone

🔗 This echoes chapter thirty one's closing line

🎁 The tablets are God's own handiwork

➡️ Moses carries them straight into disaster

## ⚔️ There Is A Noise Of War In The Camp

Joshua has been waiting partway up the mountain since chapter twenty four.

He hears loud noise rising from the camp below.

He assumes it must be the sound of battle.

Moses, closer and more clear eyed, will read the sound differently.

⏳ Joshua has waited since chapter twenty four

👂 He hears loud noise from the camp

⚔️ He assumes the noise means open battle

➡️ Moses hears the same sound differently

## 🎶 The Noise Of Them That Sing Do I Hear

Moses corrects Joshua's guess about what they are hearing.

It is not the shout of victory in war.

It is not the cry of defeat either.

Moses names it plainly as singing and celebration.

Two men hear the exact same sound and read it two different ways.

🎶 Moses names the sound as singing

🙅 It is not the sound of war

👂 Two men hear one sound differently

➡️ Moses reaches the camp and sees it himself

## 💔 Moses' Anger Waxed Hot

Moses now sees the calf and the dancing for himself.

His own anger waxes hot, the exact phrase already used for God's anger in verse ten.

Moses is not calmer than God in this moment.

He shares the same burning reaction to what he sees.

💔 Moses' anger also waxes hot here

🔥 The same phrase described God's anger earlier

🤝 Moses shares God's exact reaction here

➡️ His anger drives him to a drastic act

## 🪨 He Cast The Tables Out Of His Hands, And Brake Them

"Brake" is the old past tense of "break."

Moses throws the stone tablets to the ground below the mountain.

The covenant was carved into these very stones.

Shattering them acts out what already happened in the camp.

The covenant was already broken in practice before Moses broke the stone.

🪨 Brake means the old past tense of break

💥 Moses shatters the tablets at the mountain's base

📖 The stones pictured the covenant God gave

➡️ Moses turns his fury on the calf next

## 🔥 Ground It To Powder, And Strawed It Upon The Water

"Strawed" is an old word for scattered or strewn.

Moses melts the calf down completely in the fire.

He grinds the metal to powder and scatters it on the water.

Then he forces the people to drink what is left.

This works like a public test, similar to the water ordeal described later in Numbers five.

The people must swallow the evidence of what they built.

🔥 Strawed means scattered or strewn about

⚰️ The calf is melted, ground, and scattered

📖 Numbers five later describes a similar water test

➡️ Moses turns from the calf to Aaron

# Exodus 32:21-24
# 🗣️ Moses Confronts Aaron
---
## ❓ What Did This People Unto Thee

Moses aims this question straight at Aaron, not at the crowd.

The people sinned, but Aaron was Israel's own high priest.

Leadership carries its own separate accountability from the crowd's guilt.

Moses will not let Aaron hide behind everyone else's choices.

❓ Moses questions Aaron directly, not the crowd

⚖️ Leadership carries its own separate accountability

🙅 Aaron cannot hide behind everyone else

➡️ Aaron reaches for an excuse instead

## 🙅 Thou Knowest The People, That They Are Set On Mischief

Aaron's defense quietly shifts the blame onto the crowd.

"Mischief" here means real wrongdoing, not playful trouble.

He almost repeats the people's own demand from verse one word for word.

Aaron never once says he chose to comply with them.

🙅 Aaron shifts the blame onto the crowd

⚠️ Mischief means real wrongdoing here, not play

🔁 He echoes the people's own words back

➡️ His account gets even less honest next

## 😨 For As For This Moses, The Man That Brought Us Up

Aaron quotes the crowd's exact complaint about Moses back to Moses himself.

He is using their panic to explain away his own choice.

Fear explains what the people said.

Fear does not explain what Aaron actually did with his hands.

🗣️ Aaron quotes the crowd's own complaint back

😨 He blames their fear for his choice

✋ Fear does not explain his own actions

➡️ His story then leaves out key details

## 🎭 I Cast It Into The Fire, And There Came Out This Calf

Aaron's story skips the graving tool named plainly back in verse four.

He describes the calf as if it shaped itself in the flames.

No hand and no craftsman appear anywhere in his version.

This is one of Scripture's earliest examples of a leader minimizing his own role.

🔥 Aaron's story leaves out the graving tool

🎭 He describes the calf shaping itself

✋ No craftsman appears anywhere in his version

📖 This is an early case of blame shifting

# Exodus 32:25-29
# ⚔️ The Sons Of Levi Answer The Call
---
## 😳 The People Were Naked

"Naked" here means unrestrained and out of control, not simply undressed.

The people lost all discipline under the leader meant to guard them.

The text names exactly who caused this.

Aaron made them this way.

😳 Naked here means unrestrained, not undressed

📉 The people lost all discipline that day

👉 The text names Aaron as the cause

➡️ Moses draws a clear line in the sand

## 🚩 Who Is On The LORD's Side

Moses issues a public call to loyalty in the middle of the chaos.

Only the tribe of Levi steps forward to answer.

This moment of costly loyalty is remembered much later.

Deuteronomy thirty three ties Levi's future priestly role back to this exact test.

🚩 Moses calls the whole camp to choose

🕍 Only the Levites step forward that day

📖 Deuteronomy thirty three recalls this same moment

➡️ Moses gives the Levites a severe task

## 🗡️ Slay Every Man His Brother

The judgment that follows is swift and severe.

The Levites carry it out even against close family and friends.

About three thousand men fall that day.

Some readers later place this number beside Acts two, where three thousand are added to the church.

One number marks a judgment under the law.

The other marks life poured out through the Spirit.

🗡️ The judgment is swift, even against family

⚖️ About three thousand men fall that day

📖 Acts two later adds three thousand believers

➡️ Moses explains what this obedience earns them

## 🙌 Consecrate Yourselves Today To The LORD

"Consecrate" means to formally set apart for God's service.

The Levites acted at real personal cost, even against their own relatives.

That costly willingness becomes their qualification for later priestly service.

Moses still is not finished pleading for the whole nation.

🙌 Consecrate means set apart for God's service

💪 The Levites paid a real personal cost

🏆 That cost becomes their path to priesthood

➡️ Moses returns to plead for the nation

# Exodus 32:30-35
# 🙏 Moses Returns To Intercede Again
---
## 😔 Peradventure I Shall Make An Atonement For Your Sin

"Peradventure" is an old word meaning perhaps.

Moses does not assume forgiveness is already guaranteed.

He climbs back up the mountain not knowing how God will respond.

He pleads anyway instead of waiting for a sure outcome first.

😔 Peradventure means perhaps, not a guarantee

🧗 Moses climbs up without a sure outcome

🙏 He pleads anyway before knowing the answer

➡️ Moses makes an extraordinary offer to God

## 📖 Blot Me, I Pray Thee, Out Of Thy Book

Moses offers to be erased from God's own book himself.

He would rather disappear than watch the people be destroyed.

This is Scripture's earliest reference to being blotted out of God's book.

That same idea later grows into the "book of life" language in Revelation.

📖 This is Scripture's earliest blotted out reference

🤝 Moses offers himself in the people's place

🔗 The idea grows into Revelation's book of life

➡️ God answers Moses' offer directly

## ⚖️ Whosoever Hath Sinned Against Me, Him Will I Blot Out

God declines the exact trade Moses just offered.

Each person remains responsible for their own sin.

One person's offer to stand in for everyone is not accepted.

God still commits to leading the whole nation forward regardless.

🙅 God does not accept Moses' proposed trade

⚖️ Each person stays responsible for their own sin

🧭 Mercy and accountability stand together here

➡️ God still commits to leading them onward

## 👼 Mine Angel Shall Go Before Thee

God still promises to lead the people toward the promised land.

His Angel goes ahead of them despite everything that just happened.

God also adds a warning about a future day of reckoning.

Mercy right now does not erase every future consequence.

👼 God's Angel still leads the people onward

🚶 The journey continues despite the golden calf

⚠️ God warns of a future day of reckoning

➡️ The chapter still ends with a real consequence

## ⚡ The LORD Plagued The People, Because They Made The Calf, Which Aaron Made

The chapter's last line insists on precision about who is responsible.

It names Aaron as the calf's maker, undoing his excuse back in verse twenty four.

Moses' intercession already spared the nation from total destruction.

A real, recorded consequence still falls on the people even so.

⚡ The closing line names Aaron as the maker

📖 This undoes Aaron's excuse from verse twenty four

🛡️ Mercy already spared the nation from ruin

➡️ A real consequence still falls even so
`.trim();

export const EXODUS_THIRTY_TWO_PERSONAL_SECTIONS = parseExodusThirtyTwoRawNotes(EXODUS_THIRTY_TWO_RAW_NOTES);
