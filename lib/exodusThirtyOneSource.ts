export type ExodusThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyOneRawNotes(rawText: string): ExodusThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 31:${startVerse}` : `Exodus 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Exodus 31 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_ONE_RAW_NOTES = `# Exodus 31:1-6
# 🔨 God Calls Bezaleel And Aholiab
---
## 👤 Called By Name Bezaleel

Being called by name means God chose this man personally.

God did not simply need someone skilled for the work.

He picked Bezaleel out Himself before anyone lifted a tool.

The tabernacle mattered enough to God that He hand picked the builder.

👤 God chooses Bezaleel personally

🔨 The choice comes before any work starts

📐 God cared who would build, not just what

📖 God still calls people by name today

## 👴 The Son Of Uri, The Son Of Hur

Uri and Hur are Bezaleel's father and grandfather.

Many believe this Hur is the same man who held up Moses' hands in Exodus seventeen.

If that is true, this family already had a history of quiet service.

Bezaleel's gift did not appear out of nowhere.

It grew from a household already devoted to God.

👴 Uri and Hur are his father and grandfather

🙌 Hur may be the man from Exodus seventeen

🙏 The family already served God quietly

📖 Bezaleel's gift grew from that history

## 👑 Of The Tribe Of Judah

Judah is the tribe of Israel's future kings.

Centuries later the Messiah would come from this same line.

Bezaleel is not famous the way David or Jesus would be.

Yet God chose him from that same significant family long before either was born.

👑 Judah later gives Israel its kings

✝️ The Messiah comes from this same line

🔨 Bezaleel comes from Judah too

📖 God used this tribe before it was famous

## 🔥 Filled Him With The Spirit Of God

Being filled with the Spirit of God usually brings to mind prophets or leaders.

Here it describes a craftsman's hands instead.

Skilled work with metal, stone, and wood is treated as a real spiritual gift.

It is not a lesser, ordinary talent kept separate from God.

🔥 Spirit filled here means gifted for skilled work

🛠️ Craftsmanship counts as a real gift

🙌 Skill is not separate from God

📖 God gifts hands as well as voices

## 💡 In Wisdom, And In Understanding, And In Knowledge

These three words are not simply repeating the same idea.

Wisdom means the ability to design something new.

Understanding means the judgment to solve a problem along the way.

Knowledge means the learned skill to actually carry it out.

Together they describe a craftsman who can plan, adjust, and build.

💡 Wisdom means the ability to design

🧠 Understanding means good judgment

📚 Knowledge means learned skill

📖 Together they describe a complete craftsman

## 🛠️ In All Manner Of Workmanship

Workmanship simply means skilled craft or handiwork.

The phrase all manner shows just how wide that skill needed to be.

Bezaleel was not a specialist in one narrow trade.

God gifted him across many kinds of work at once.

🛠️ Workmanship means skilled craft

🌐 All manner means many kinds at once

🔨 Bezaleel was not a narrow specialist

📖 God's gift covered every trade needed

## ✨ To Devise Cunning Works

Cunning in the King James Bible does not mean sneaky or deceptive.

That is how the word is almost always used today.

Here it simply means highly skillful or cleverly made.

A cunning work is a masterfully crafted work, nothing dishonest about it.

🎭 Cunning today usually means sneaky

🔨 Here it means highly skillful

✨ A cunning work is a masterpiece

📖 This old meaning has no dishonesty in it

## 🥇 To Work In Gold, And In Silver, And In Brass

Bezaleel is expected to master three different metals, not just one.

Gold, silver, and brass each require completely different handling and tools.

Learning even one of these trades normally took years.

God gave him mastery over all three at once.

🥇 Gold, silver, and brass are three separate trades

⏳ Each trade normally took years to learn

🔥 God gave mastery over all three

📖 This points to a gift, not training

## 💎 In Cutting Of Stones, To Set Them

Cutting stones here means shaping gems for the priestly garments.

Setting them means fixing each finished stone securely into metal.

This is precise, careful work, not simple rock breaking.

One mistake could ruin a stone meant to sit on Aaron's own chest.

💎 Cutting means shaping gems

🔩 Setting means fixing them into metal

🎯 The work demanded real precision

📖 These stones would rest on Aaron himself

## 🪵 And In Carving Of Timber

Carving timber means shaping wood by hand into finished form.

The ark, the table, and several other pieces all had wooden frames underneath their gold.

Nobody would ever see that wood once the gold covering went on.

Bezaleel still had to carve it with full skill and care.

🪵 Carving means shaping wood by hand

⚱️ Wood sat hidden beneath the gold

👀 No one would ever see this work

📖 He carved with care unseen

## 🤝 Aholiab, The Son Of Ahisamach, Of The Tribe Of Dan

Dan was one of the smaller, less prominent tribes of Israel.

Judah, Bezaleel's tribe, was one of the most significant.

God still paired a lesser known family with a prominent one on this same sacred project.

Importance in this project never depended on a tribe's status.

🛠️ Aholiab comes from the tribe of Dan

👑 Bezaleel comes from the greater tribe of Judah

🤝 Both tribes work the same sacred project

📖 God does not rank workers by tribe

## 🧠 Wise Hearted

Wise hearted does not mean intellectually smart in the modern sense.

It means skilled and gifted with the hands.

This uses the same sense of wisdom already given to Bezaleel in verse three.

God says He placed this gift in every wise hearted person, not just the two named men.

💡 Wise hearted means skilled with the hands

🔁 It matches the wisdom given to Bezaleel

👥 God gifted a whole team, not two

📖 Skill spreads further than the named leaders

# Exodus 31:7-11
# 🏛️ Everything They Will Build
---
## ⛺ The Tabernacle Of The Congregation

God now runs back through the entire building list from earlier chapters.

The tabernacle of the congregation was the whole tent structure itself.

Naming it first shows it as the center of everything else on the list.

Every other item exists to serve what happens inside this tent.

⛺ Tabernacle means the tent structure itself

📋 God reviews the whole building list here

🎯 It stands first because it is central

📖 Every other object serves what happens inside it

## 📦 The Ark Of The Testimony, And The Mercy Seat

The ark of the testimony held the stone tables of the law.

The mercy seat was its solid gold lid, described back in chapter twenty five.

These two objects were the holiest items in the entire tabernacle.

Naming them first here closes a loop that opened many chapters earlier.

📦 The ark held the stone tables

🥇 The mercy seat was its gold lid

🙏 These were the holiest objects of all

📖 Chapter twenty five described them first

## 🍞 The Table And His Furniture

Furniture here does not mean chairs or couches like it does today.

It means the accompanying equipment that belonged to an object.

For this table, that meant the bowls, spoons, and dishes used with it.

The table itself held the bread of the presence inside the holy place.

🪑 Furniture is a false friend for modern readers

🥣 It means an object's accompanying equipment

🍞 This table held the bread of the presence

📖 Even the small pieces had a purpose

## 🕯️ The Pure Candlestick With All His Furniture

The candlestick was the golden lampstand first described in chapter twenty five.

Pure here means it was made of solid gold, not gold plating.

Its furniture included the small tools used to trim and light it.

This single lampstand was the only light source inside the holy place.

🕯️ Candlestick means the golden lampstand

🥇 Pure means solid gold, not plating

🔥 It was the only light inside

📖 Small tools kept it burning properly

## 💨 The Altar Of Incense

The altar of incense was the most recently given instruction, from chapter thirty.

It stood just outside the innermost curtain, nearest to the ark.

Sweet smelling smoke rose from it every morning and evening.

Its placement closest to the ark showed how highly this offering was valued.

💨 This altar burned incense, not offerings

📍 It stood nearest to the ark

🙏 Position showed how valued this offering was

📖 Chapter thirty gave this instruction most recently

## 🐂 The Altar Of Burnt Offering With All His Furniture, And The Laver And His Foot

The bronze altar for burnt offerings goes back to chapter twenty seven.

The laver was a bronze basin used for washing before ministry.

Its foot was simply the pedestal base holding the basin up.

Moving through this list retraces the same path God used when He first gave these instructions.

🐂 The bronze altar comes from chapter twenty seven

🥣 The laver was a washing basin

🦶 Its foot means the pedestal base

📖 The order retraces God's original instructions

## 🧵 The Cloths Of Service

Cloths of service were the specially woven garments worn while ministering.

Chapter twenty eight already described them in detail.

These were not everyday clothes thrown on for the job.

Every thread was made for this one holy purpose.

🧵 Cloths of service means woven ministry garments

🚫 They were not ordinary clothing

🙏 Every thread served a holy purpose

📖 Chapter twenty eight describes them fully

## 👕 The Holy Garments For Aaron The Priest, And The Garments Of His Sons

Aaron's garments marked him out as high priest before anyone saw him act.

His sons wore their own garments to serve in the same holy role.

To minister in the priest's office means to formally serve in that appointed position.

This was not a casual task anyone could simply pick up.

👕 Aaron's garments marked his office visibly

👥 His sons had their own priestly clothing

⛪ Priest's office means a formal appointed role

📖 Clothing itself announced who could serve

## 🧴 The Anointing Oil, And Sweet Incense For The Holy Place

The anointing oil and the incense recipe were both given back in chapter thirty.

Both carried strict warnings against being copied for ordinary use.

These two formulas complete the entire list God has been reviewing.

Everything from the ark to this oil now moves from words to real materials.

🧴 Oil and incense both come from chapter thirty

🔒 Both had strict warnings against misuse

📋 These formulas complete the whole list

📖 Instructions now become real materials

## 📐 According To All That I Have Commanded Thee Shall They Do

This closing line is a quiet but firm reminder to the builders.

Skilled and gifted as they are, they must still build exactly what God specified.

Talent was never a license for creative freedom on holy things.

The whole building list ends the same way it began, under God's command.

📐 Skill still had to follow the exact pattern

🔒 Talent was not a license for creativity

🙏 Obedience mattered more than creativity here

📖 The whole list ends under God's command

# Exodus 31:12-17
# 🕊️ The Sabbath As A Sign
---
## 📢 Verily My Sabbaths Ye Shall Keep

Verily is an old word meaning truly or certainly.

It adds solemn weight to the command that follows.

Until now God had been speaking only to two skilled craftsmen.

This command suddenly addresses the whole nation of Israel instead.

📢 Verily means truly or certainly

⚖️ It adds solemn weight to the command

👥 The audience widens to the whole nation

📖 Even sacred building work must pause for this

## 🤝 For It Is A Sign Between Me And You

A sign in this sense marks a relationship, not just an event.

Circumcision already carried this same kind of meaning back in Genesis seventeen.

The Sabbath works the same way for the whole nation now.

It is a visible mark showing that Israel belongs to God.

🤝 Sign here marks a relationship

✂️ Circumcision carried this same meaning earlier

🕊️ The Sabbath marks the whole nation now

📖 The mark shows Israel belongs to God

## ✨ That I Am The LORD That Doth Sanctify You

Sanctify means to set apart for God's exclusive use.

The same word already described the tabernacle's furniture and the priests.

Now an entire nation is described the same way.

People, not just objects, are being set apart here.

✨ Sanctify means set apart for God

📦 The word already applied to holy objects

👥 Now it applies to a whole people

📖 God sets people apart, not only things

## ⚠️ Every One That Defileth It Shall Surely Be Put To Death

Defileth means to violate or treat as unclean something set apart as holy.

The penalty named here matches the severity already given for misusing the holy oil.

That places the Sabbath in the very same top tier of holiness.

Breaking it was never treated as a small matter.

⚠️ Defileth means to violate something holy

⚖️ The penalty matches misuse of the holy oil

📊 The Sabbath sits in that same top tier

📖 This was never treated as a minor rule

## ✂️ That Soul Shall Be Cut Off From Among His People

Being cut off meant total separation from the community of Israel.

This could mean exile, or it could mean God ending that person's life directly.

Either way, it removed someone entirely from belonging to God's people.

The wording is severe because the Sabbath itself was treated as severe.

✂️ Cut off means total separation

🚪 It could mean exile or death

👥 It removes someone from God's people

📖 Severe wording matched a severe command

## 🛠️ Six Days May Work Be Done

Six days of ordinary work were fully permitted and expected.

Only the seventh day carried this strict command to rest.

This was not a call to stop working altogether.

It was a call to build one day of rest into every week.

🛠️ Six days allowed ordinary work

🛌 Only the seventh carried the strict rule

🚫 This was not a ban on work

📖 Rest was built into the rhythm of life

## 🛌 The Sabbath Of Rest, Holy To The LORD

This restates the Sabbath command already given in the Ten Commandments in chapter twenty.

Repeating it here comes right after the tabernacle instructions were finished.

That timing shows the law was never quietly set aside for holy construction work.

Even building God's own house had to stop on this day.

🔁 This repeats the Ten Commandments almost exactly

🚧 Holy construction still had to pause

🛌 The rule applied no matter the urgency

📖 It follows right after the tabernacle instructions

## 📜 A Perpetual Covenant

A perpetual covenant is a permanent agreement, never set to expire.

The same word already described the incense offering back in chapter thirty.

This law was never meant to belong to just one generation.

It was written to outlast every generation that received it.

📜 Perpetual means permanent, not temporary

🔁 The same word described the incense earlier

👪 The law was meant for every generation

📖 It was written to outlast its first hearers

## 🌍 For In Six Days The LORD Made Heaven And Earth

The Sabbath is tied directly back to the creation week in Genesis two.

That means it existed long before Israel became a nation.

Israel is not inventing a new custom here.

They are imitating a pattern God Himself already set.

🌍 The Sabbath is anchored in creation itself

🕊️ Israel imitates a pattern, not a new idea

🔁 God set the rhythm before Israel existed

📖 Genesis two already describes this pattern

## 😌 And Was Refreshed

Was refreshed does not mean God grew tired or ran out of strength.

God does not experience weakness the way people do.

The phrase instead pictures completion and satisfaction after finished work.

Israel is asked to imitate that same rhythm of rest one day out of seven.

😌 Refreshed does not mean weary

💪 God never runs out of strength

✅ It pictures completion and satisfaction

📖 Israel imitates God's rhythm of rest

# Exodus 31:18
# 📜 Two Tables Of Stone
---
## ⛰️ Communing With Him Upon Mount Sinai

Communing is an old word for speaking closely and directly with someone.

This was not a formal announcement shouted from a distance.

This single line quietly closes out an enormous block of instruction.

Everything since chapter twenty five was given in one continuous conversation on the mountain.

🗣️ Communing means speaking directly and closely

⛰️ It happened on Mount Sinai

✅ This line closes that entire block of instruction

📖 One conversation covered everything since chapter twenty five

## ✍️ Written With The Finger Of God

Finger of God is the same phrase Egypt's own magicians used earlier in the story.

In chapter eight they could no longer copy the plague of lice.

They admitted that only God could have done it.

These stone tables were written by that same hand, not copied out by Moses.

Chapter thirty two opens with betrayal breaking out at the foot of this very mountain.

✍️ Finger of God wrote these tables directly

🐛 Egypt's magicians used this phrase in chapter eight

🚫 Moses did not write these himself

📖 Betrayal breaks out next, on this same mountain`.trim();

export const EXODUS_THIRTY_ONE_PERSONAL_SECTIONS = parseExodusThirtyOneRawNotes(EXODUS_THIRTY_ONE_RAW_NOTES);
