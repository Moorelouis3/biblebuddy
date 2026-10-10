export type LukeSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeSeventeenRawNotes(rawText: string): LukeSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 17:${startVerse}` : `Luke 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Luke 17 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_SEVENTEEN_RAW_NOTES = `# Luke 17:1-4
# ⚠️ When A Brother Sins Against You
---
## 😕 It Is Impossible But That Offences Will Come

"Offences" does not mean someone hurt your feelings.

The word points to anything that causes another person to stumble into sin.

Jesus says plainly that this will happen in a broken world.

That is a warning, not an excuse.

Whoever causes it still carries real guilt for the fall.

😕 Offences means causing someone to sin

🌍 Stumbling blocks are certain in this world

⚠️ Jesus warns without excusing the cause

📖 Causing a fall still carries real guilt

## ⚙️ A Millstone Were Hanged About His Neck

A millstone was a heavy, flat stone used to grind grain into flour.

It was so heavy that an animal usually turned it, not a person.

Jesus pictures that exact stone tied around someone's neck before being thrown into the sea.

Drowning with a weight like that left no real chance of surviving.

That is how seriously Jesus treats causing a little one to fall.

⚙️ Millstone means a heavy grinding stone

🐴 Normally an animal turned it, not a man

🌊 Jesus pictures it tied to the neck

📖 He treats causing a fall with total seriousness

## 🗣️ If Thy Brother Trespass Against Thee, Rebuke Him

"Trespass" here means sinning against you personally, not just making a mistake.

"Rebuke" means confronting the person directly and plainly about what they did.

Jesus does not tell the offended person to stay silent and quietly resent it.

He commands an honest conversation instead.

Confronting sin directly is how real forgiveness becomes possible at all.

🗣️ Trespass means sinning against you directly

📢 Rebuke means confronting it plainly

🤐 Silence and resentment are not the command

📖 Honest confrontation opens the door to forgiveness

## 🔁 If He Trespass Against Thee Seven Times In A Day

"Seven times in a day" is not a literal cap on how many times to forgive.

Many Jewish teachers at the time taught that three times was enough forgiveness for the same offense.

Jesus multiplies that number far past what was considered reasonable.

The point is not an exact count at all.

Forgiveness is expected to keep going long after it feels fair to stop.

🔁 Seven times signals repetition, not a limit

📜 Jewish teaching often capped forgiveness at three

⬆️ Jesus raises that number far higher

📖 Real forgiveness outlasts what feels fair

# Luke 17:5-6
# 🌱 A Faith That Does Not Need To Be Large
---
## 🙏 Increase Our Faith

The apostles are the ones asking this question of Jesus.

They have just heard him describe forgiveness that never runs out.

That kind of forgiveness feels impossible without more faith to support it.

So they ask Jesus directly for more.

Bringing a need straight to Jesus is itself an act of faith.

🙏 The apostles ask Jesus directly

🔁 Endless forgiveness feels impossible alone

🗣️ They name their need out loud

📖 Asking Jesus is already an act of faith

## 🌱 As A Grain Of Mustard Seed

A mustard seed is one of the smallest seeds a farmer in this region would plant.

Jesus is not asking the apostles to somehow produce a bigger supply of faith.

The size of the faith was never the real issue.

What matters is that the faith is genuine and placed in God.

🌱 Mustard seed means an extremely small seed

📏 Size was never the real issue

🎯 Genuine faith matters more than amount

📖 Faith's power comes from God, not its size

## 🌳 This Sycamine Tree, Be Thou Plucked Up By The Root

A sycamine tree was a large tree related to the mulberry and fig, known for deep roots.

Uprooting one by hand was considered close to impossible.

Jesus names the hardest possible task on purpose.

He is not promising to move literal trees into the sea on command.

He is showing how much power even a small amount of real faith carries.

🌳 Sycamine means a deep rooted tree

💪 Uprooting one seemed impossible by hand

🎯 Jesus picks the hardest example on purpose

📖 Real faith carries real power in God's hands

# Luke 17:7-10
# 🍽️ No Credit For Doing Your Duty
---
## 👨‍🌾 Having A Servant Plowing Or Feeding Cattle

A servant in this picture is a bondservant, someone fully obligated to their master's orders.

Plowing and feeding cattle were ordinary farm duties expected every single day.

Jesus builds the whole illustration around a scene his listeners already knew firsthand.

Nothing about this servant's job was optional.

👨‍🌾 Servant means someone fully obligated to obey

🌾 Plowing and feeding were daily duties

👂 Jesus uses a scene his listeners knew

📖 None of this work was optional

## 👕 Gird Thyself, And Serve Me

"Gird thyself" means tucking long robes up into a belt to move and work freely.

The servant has already worked a full day in the field.

Now he is told to prepare himself again immediately and serve a meal.

No rest is offered in between.

The master expects continued readiness, not just completed tasks.

👕 Gird means tucking robes up to move

🌅 He already worked a full day

🍽️ He is told to serve again at once

📖 Readiness, not just finished tasks, is expected

## 🤷 Doth He Thank That Servant

Jesus asks this question and expects the answer to be no.

A master in this culture owed no special thanks for duties already required.

Doing the job was simply what the role demanded.

Gratitude was not part of the arrangement.

🤷 The expected answer is no

📋 Required duty needed no special thanks

⚖️ The job was simply the role's demand

📖 Gratitude was never part of the deal

## 🧮 We Are Unprofitable Servants

"Unprofitable" does not mean worthless or useless here.

It means the servant has done nothing beyond what was already owed.

Jesus is teaching his disciples not to expect credit with God for simple obedience.

Obedience is the baseline, not a bonus God is required to repay.

🧮 Unprofitable means nothing extra was given

📏 Obedience is the baseline, not a bonus

🙅 God owes no extra credit for duty

📖 Simple obedience earns no debt from God

# Luke 17:11-14
# 🙏 The Ten Lepers
---
## 🧭 Passed Through The Midst Of Samaria And Galilee

Samaria and Galilee were neighboring regions whose people generally distrusted each other deeply.

Jesus travels straight through the border area between them on his way to Jerusalem.

That detail quietly sets up a story where the outsider becomes the hero.

🧭 Samaria and Galilee were tense neighboring regions

🚶 Jesus travels right through the border area

🎯 This sets up an outsider as hero

📖 Geography quietly prepares the story's twist

## 🚫 Ten Men That Were Lepers, Which Stood Afar Off

Leprosy covered a range of serious skin diseases under the Old Testament law.

Anyone with it had to live apart from the rest of the community.

Standing far off was not politeness here.

It was the law, enforced to protect everyone else from the disease.

🚫 Leprosy forced strict separation under the law

🏕️ The ten had to live apart from others

📏 Standing far off was required by law

📖 The law aimed to protect the whole camp

## 🕍 Go Shew Yourselves Unto The Priests

Only a priest had the legal authority to examine a healed leper and declare them clean.

That process is spelled out in the law given through Moses.

Jesus sends them to the priest before they even feel any change in their skin.

Obeying first and seeing proof second is the test here.

🕍 Only a priest could declare someone clean

📜 Moses' law set out that exact process

🚶 Jesus sends them before they feel healed

📖 Obedience came before any visible proof

# Luke 17:15-19
# 💗 Only One Returns
---
## 📣 With A Loud Voice Glorified God

This is the only one of the ten who turns around at all.

He does not thank Jesus quietly or privately.

He praises God loudly, in a way everyone nearby could hear.

Gratitude this big was never meant to stay silent.

📣 Only one of the ten returns at all

🗣️ His praise is loud, not private

👂 Everyone nearby could hear his gratitude

📖 Real gratitude rarely stays silent

## 🌍 He Was A Samaritan

Jews and Samaritans in this period rarely trusted or associated with each other.

Luke saves this detail until after describing the man's loud praise.

The one who returns with real gratitude is the very person the crowd would have expected least.

🌍 Jews and Samaritans rarely trusted each other

🔄 Luke reveals this detail last on purpose

😮 The least expected man shows the most gratitude

📖 Grace often comes through the outsider

## 💗 Thy Faith Hath Made Thee Whole

"Whole" here means far more than just healed skin.

All ten lepers were already healed on the road to the priests.

Only this one receives this specific statement from Jesus.

His returning faith reached something deeper than the healing the other nine already had.

💗 Whole means more than just healed skin

🔟 All ten already received physical healing

🔙 Only the one who returned hears this

📖 Faith reached deeper than the healing itself

# Luke 17:20-25
# 👀 A Kingdom Already Among Them
---
## ❓ When The Kingdom Of God Should Come

The Pharisees expect God's kingdom to arrive as a visible political takeover.

Many in this period hoped for a conquering king who would throw off Rome by force.

Their question assumes that kind of kingdom has not started yet.

❓ Pharisees expect a visible political kingdom

⚔️ Many hoped for a king who defeats Rome

🤔 Their question assumes it has not started

📖 Their whole picture of the kingdom is incomplete

## 🔭 Cometh Not With Observation

"Observation" here means watching for visible signs, the way someone watches the sky for a storm.

Jesus says God's kingdom does not arrive that way.

There is no countdown of signals to track.

🔭 Observation means watching for visible signs

🌩️ Think of watching the sky for a storm

🚫 The kingdom gives no countdown to track

📖 It does not work like a weather forecast

## 👀 The Kingdom Of God Is Within You

This does not simply mean a private feeling inside each person's heart.

Jesus is standing in front of the Pharisees as he says it.

Many scholars believe he means the kingdom is already present among them in his own person.

The king they are looking for in the sky is standing in the room.

👀 Not just a private inward feeling

🧍 Jesus himself is standing right there

👑 The king is present among them already

📖 The kingdom already stands in the room

## ✝️ Must He Suffer Many Things, And Be Rejected

Jesus shifts the conversation from signs in the sky to suffering ahead of him.

The Pharisees were asking about future glory.

Jesus answers by pointing straight at the cross first.

Glory was never going to arrive without the suffering coming before it.

✝️ Jesus points to suffering, not signs

👑 They ask about glory

🩸 He answers with the cross first

📖 Suffering comes before the glory

# Luke 17:26-30
# 🌊 Judgment Catches Ordinary Life
---
## 🌊 In The Days Of Noe

"Noe" is simply the old English spelling of Noah's name.

Jesus points back to the flood story everyone listening already knew well.

He is about to compare that moment directly to his own coming.

🌊 Noe is the old spelling of Noah

📖 Jesus points back to the flood story

🔁 He compares it to his own coming

➡️ A familiar story becomes a warning

## 🍽️ They Did Eat, They Drank, They Married Wives

None of these activities were sinful on their own.

Eating, drinking, and marrying are all perfectly ordinary parts of daily life.

That is exactly why the flood caught so many people off guard.

Judgment interrupted the most normal routines imaginable, not open wickedness being flaunted in public.

🍽️ Eating and drinking are ordinary, not sinful

💍 Marrying is a normal part of life

😮 The flood interrupted routine, not just vice

➡️ Judgment can arrive in the middle of routine

## 🏙️ In The Days Of Lot, They Bought, They Sold, They Planted, They Builded

This list describes the normal economy of a city, buying, selling, planting, and building.

Genesis does record real wickedness in Sodom alongside all of this normal activity.

Jesus highlights the everyday routines right next to that judgment on purpose.

Life in Sodom looked ordinary to the people living inside it, right up until it ended.

🏙️ The list describes an ordinary city's economy

📖 Genesis also records real wickedness there

👀 Jesus highlights the routine on purpose

➡️ Life looked normal right up until judgment

## 🔥 It Rained Fire And Brimstone From Heaven

"Brimstone" is the old word for sulfur, a yellow mineral that burns with a strong smell.

Genesis nineteen already describes this exact judgment falling on Sodom.

The destruction came suddenly, with no visible warning beforehand.

That suddenness is the whole point of Jesus bringing the story up here.

🔥 Brimstone means burning sulfur

📖 Genesis nineteen already tells this story

⚡ The destruction came without warning

➡️ Sudden judgment is the point being made

# Luke 17:31-37
# ⚡ Remember Lot's Wife
---
## 🏠 He Which Shall Be Upon The Housetop

Houses in this region commonly had flat roofs used for daily living, sleeping, and storage.

Someone on the roof when judgment comes has no time to climb down and gather belongings.

Jesus is picturing a moment that demands leaving everything behind immediately.

🏠 Flat roofs were used for daily living

⏱️ There is no time to gather belongings

🏃 Immediate leaving is the picture here

➡️ Some moments allow no packing

## 🧂 Remember Lot's Wife

Genesis nineteen describes Lot's wife looking back at the destroyed city while fleeing.

She is turned into a pillar of salt for that single backward look.

Jesus uses her as a direct warning against clinging to the life being left behind.

🧂 She was turned into a pillar of salt

👀 Her mistake was looking back

🔗 She clung to the life she was leaving

➡️ Jesus warns against the same clinging

## ⚖️ The One Shall Be Taken, And The Other Left

This does not describe one person being rescued upward while another stays behind.

The flood and Sodom stories just told both describe people being swept away in judgment.

In that same pattern here, "taken" points to being removed by judgment.

"Left" points to the one who remains safe.

That is the opposite of how pop culture uses this phrase today.

⚖️ Taken here means removed by judgment

🏠 Left means remaining safely behind

🔁 It matches the flood and Sodom pattern

📖 Pop culture reverses this phrase's meaning

## 🦅 Wheresoever The Body Is, Thither Will The Eagles Be Gathered Together

These birds are more likely vultures, drawn from far away the moment a carcass appears.

Nobody needs to announce where a dead body lies.

The birds gathering overhead already make it obvious to everyone watching.

Jesus answers the disciples' question of where with a picture instead of a place.

When judgment comes, it will be just as unmistakable.

🦅 Eagles here likely means vultures

👃 Nothing needs to announce a carcass

👀 Gathering birds already make it obvious

📖 Judgment will be just as unmistakable
`.trim();

export const LUKE_SEVENTEEN_PERSONAL_SECTIONS = parseLukeSeventeenRawNotes(LUKE_SEVENTEEN_RAW_NOTES);
