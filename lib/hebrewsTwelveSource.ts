export type HebrewsTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsTwelveRawNotes(rawText: string): HebrewsTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 12:${startVerse}` : `Hebrews 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Hebrews 12 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_TWELVE_RAW_NOTES = `# Hebrews 12:1-3
# 🏃 Looking Unto Jesus
---
## 🎽 Compassed About With So Great A Cloud Of Witnesses

The word witnesses points back to every name just listed in chapter eleven.

Abraham, Moses, Rahab, and the others are pictured as a crowd surrounding the runner.

They are not watching to judge the race.

They already finished their own race by faith, and now the reader is urged to run the same way.

🎽 Witnesses means the people of chapter eleven
🏃 They surround the runner like a crowd
🙌 They already finished their own race
📖 Their faith now encourages the reader's faith

## ⚖️ Lay Aside Every Weight

A weight here does not mean sin itself.

It means anything that slows a runner down, even if it is not wrong on its own.

Ancient runners stripped off heavy cloaks and extra gear before a race.

The writer pictures faith the same way, drop whatever keeps you from running well.

⚖️ Weight is not the same as sin
🏋️ It means anything that slows faith
👕 Runners stripped off heavy cloaks before racing
📖 Faith means dropping what slows you down

## 🪢 The Sin Which Doth So Easily Beset Us

Beset means tangled up or surrounded, like a rope wrapped around the legs.

The sin in view throughout Hebrews is not any single bad habit.

It is the pull toward giving up and turning back from faith.

That is the exact sin the original readers were tempted toward under pressure.

🪢 Beset means tangled up or surrounded
🔁 This sin is the pull to quit
⚠️ Hebrews warns readers against turning back
📖 The real danger here is giving up

## 🏆 Looking Unto Jesus The Author And Finisher Of Our Faith

Author here means the one who started faith and made a way into it.

Finisher means the one who completed it perfectly, all the way to the end.

Jesus is pictured as the ultimate example any runner can look toward.

He did not just point the way, he ran it first.

🏆 Author means the one who started it
🏁 Finisher means the one who completed it
🏃 Jesus ran the race of faith first
📖 He is both the start and the end

## ✝️ Endured The Cross, Despising The Shame

Crucifixion in the Roman world was designed to humiliate, not only to kill.

It was carried out publicly on purpose, so the condemned person was mocked and exposed.

Despising the shame means Jesus refused to let that public disgrace stop him.

He endured it because of the joy that was waiting on the other side.

✝️ Crucifixion was meant to humiliate publicly
😔 Jesus faced real public disgrace there
💪 He refused to let shame stop him
📖 Joy on the other side kept him going

## 😓 Lest Ye Be Wearied And Faint In Your Minds

This is not a warning about physical tiredness alone.

Wearied and faint describe losing heart.

That is the exhaustion that makes someone want to quit.

The writer points back to Jesus on purpose.

Thinking carefully about what he endured keeps a tired heart from giving up.

😓 Wearied and faint means losing heart
🛑 This is not just physical tiredness
🤔 Thinking about Jesus keeps a heart going
📖 Remembering him prevents giving up

# Hebrews 12:4-6
# 🧎 The Father's Discipline
---
## 🩸 Ye Have Not Yet Resisted Unto Blood

This is not a compliment on how easy their struggle has been.

It is a comparison to others who gave their lives for their faith.

The readers are being pressed and discouraged.

But none of them has died for their faith yet.

The writer uses that contrast to put their hardship in perspective.

🩸 This is not about their own ease
⚔️ Others gave their lives for faith
😣 The readers are pressed but still alive
📖 Their hardship gets real perspective here

## 📜 Ye Have Forgotten The Exhortation

Exhortation means a strong, encouraging appeal, not a scolding.

The writer is quoting an old passage from Proverbs here.

He frames God's discipline as something spoken directly to sons, not strangers.

Forgetting that encouragement is part of why the hardship feels so heavy.

📜 Exhortation means a strong encouraging appeal
📖 It quotes an old line from Proverbs
👨‍👦 God speaks to sons, not strangers
➡️ Forgetting it makes hardship feel heavier

## 👨‍👧 Despise Not Thou The Chastening Of The Lord

Chastening means loving correction, not harsh punishment out of anger.

A good parent trains a child on purpose.

That holds true even when the child does not enjoy it.

Despise here means to treat something as worthless or beneath notice.

The warning is simple.

Do not shrug off God's training just because it is hard.

👨‍👧 Chastening means loving correction, not punishment
⏳ A good parent trains on purpose
🙄 Despise means treating something as worthless
📖 Do not shrug off God's training

## ❤️ For Whom The Lord Loveth He Chasteneth

Discipline in this verse is proof of love, not the absence of it.

Every son the Father receives also gets this kind of training.

A parent who never corrects a child is not showing more love.

God's chastening is actually a sign that the relationship is real.

❤️ Discipline here proves love, not its absence
👨‍👦 Every true son receives this training
🚫 Ignoring a child is not real love
📖 Chastening proves the relationship is real

# Hebrews 12:7-11
# 👪 Sons, Not Bastards
---
## 🙋 Then Are Ye Bastards, And Not Sons

Bastards here means children born outside a legal family line.

Such children in this culture received no name, no training, and no inheritance.

A real son was always disciplined because his father was invested in his future.

Receiving no correction at all would actually be the sadder sign, not the kinder one.

🙋 Bastards means children outside the family line
🚫 Such children got no name or inheritance
👨‍👦 A real son always receives correction
📖 No discipline would be the sadder sign

## 👴 Fathers Of Our Flesh Which Corrected Us

This refers to ordinary human fathers, the ones everyone already respected growing up.

Even flawed earthly fathers were given honor for correcting their children.

The writer uses that familiar respect to build toward something bigger.

If that correction deserved honor, God's correction deserves even more.

👴 Fathers of our flesh means human parents
🙇 Even flawed fathers earned real respect
⬆️ This builds toward a bigger point
📖 God's correction deserves even greater honor

## 🌬️ The Father Of Spirits

This title sets God apart from any human father.

Human fathers only shape the body and the years lived on earth.

God is named here as the source of the deeper, lasting part of a person.

That is why subjection to him matters even more than obeying an earthly parent.

🌬️ Father of spirits means the deeper source
🧍 Human fathers only shape the body
♾️ God shapes the lasting part of us
📖 His authority outweighs any earthly parent

## ⏳ Chastened Us After Their Own Pleasure

This is not a compliment toward earthly parents.

It admits that human discipline is sometimes inconsistent or even selfish.

A parent might correct a child out of personal irritation more than real wisdom.

God's discipline never works that way.

⏳ Human discipline can be inconsistent
😤 Sometimes it comes from personal irritation
🙅 God's discipline never works that way
📖 His correction always comes from wisdom

## 🌟 That We Might Be Partakers Of His Holiness

Partakers means sharing fully in something, not just observing it from a distance.

God's goal in discipline is never punishment for its own sake.

The purpose is to shape a person into someone who actually shares his holiness.

That is a much bigger goal than simply correcting bad behavior.

🌟 Partakers means sharing fully in something
🎯 Discipline is never just punishment
🙏 The goal is to share God's holiness
📖 That goal is bigger than fixing behavior

## 🏃 The Peaceable Fruit Of Righteousness

Peaceable fruit means the calm, steady life that discipline eventually produces.

Exercised here pictures an athlete training hard on purpose, not drifting through life.

No discipline feels enjoyable while it is happening.

The good result only shows up later, after the training is finished.

🏃 Exercised pictures an athlete training hard
😣 No discipline feels good in the moment
🌾 The fruit shows up later, not instantly
📖 Steady training produces a steady life

# Hebrews 12:12-17
# 🙌 Lift Up The Hands
---
## 🙌 Lift Up The Hands Which Hang Down

Hands which hang down is an old picture of exhaustion and giving up.

The writer is quoting language the readers already knew from Isaiah.

Feeble knees describes legs too tired and discouraged to keep walking.

The command is to straighten up and continue despite the tiredness.

🙌 Hanging hands pictures exhaustion and discouragement
📜 This quotes language from Isaiah
🦵 Feeble knees means legs too tired to walk
📖 The call is to straighten up and continue

## 🛣️ Make Straight Paths For Your Feet

This continues the image of a path or race already used earlier in the chapter.

A straight path is one without obstacles that could trip up a tired traveler.

The goal is not just personal strength.

A clear path also keeps someone nearby from stumbling because of your example.

🛣️ This continues the path and race image
🧱 A straight path avoids hidden obstacles
👥 Your path affects others walking with you
📖 A clear example keeps others from stumbling

## ☮️ Follow Peace With All Men, And Holiness

These two pursuits are named together on purpose.

Peace alone can turn into avoiding every hard conversation.

Holiness alone can turn into harsh judgment of others.

The writer calls for both together.

Either one without the other goes wrong.

☮️ Peace and holiness are named together
🙈 Peace alone can avoid every hard truth
⚖️ Holiness alone can turn harsh and judgmental
📖 Both together keep a life balanced

## 🌱 Any Root Of Bitterness Springing Up

A root of bitterness means a grudge that is never dealt with.

Left alone, it does not stay small.

It grows underground until it finally breaks through and affects everyone nearby.

One unresolved hurt can quietly poison an entire community.

🌱 Root of bitterness means a hidden grudge
⏳ It grows slowly, underground, out of sight
💥 It eventually breaks through and spreads
📖 One hurt can poison a whole community

## 🍖 Esau, Who For One Morsel Of Meat Sold His Birthright

This recalls the story back in Genesis.

Esau traded his inheritance for a single meal.

A birthright carried the family's leadership and the covenant blessing passed through Isaac.

Esau gave up his future for one bowl of food.

He wanted relief in the moment, nothing more.

The writer uses him as a warning against trading something eternal for something temporary.

🍖 Esau traded his future for one meal
👑 A birthright meant leadership and blessing
😩 He wanted relief in the moment only
📖 A warning against trading the eternal

## 😢 He Found No Place Of Repentance

This does not mean Esau could not be forgiven by God.

It means he could not undo the deal or get his birthright back.

His tears in Genesis were grief over the lost blessing, not sorrow over his own choice.

The warning is about consequences that cannot be reversed, not about God refusing mercy.

😢 This is not about God refusing mercy
🔄 Esau could not undo his own choice
💔 His tears mourned the lost blessing
📖 Some consequences cannot be reversed

# Hebrews 12:18-21
# ⛰️ The Mountain That Might Be Touched
---
## 🏔️ The Mount That Might Be Touched

This mountain is Sinai, where God gave the law to Moses.

The writer never names it directly here.

Still, the readers would have known exactly which mountain he meant.

Mount Sinai could be physically touched and located on a map.

That detail matters because the next section describes a very different kind of mountain.

🏔️ This mountain is Sinai from Exodus
🤐 The writer never names it directly
🗺️ Sinai could be touched and located
📖 A very different mountain comes next

## 🌩️ Blackness, And Darkness, And Tempest

This describes the scene at Sinai from the book of Exodus.

Thick smoke, storm clouds, and violent weather covered the mountain when God came down.

The sight alone was enough to terrify everyone standing at the base of it.

That fear was the whole point, showing how holy and dangerous God's presence truly was.

🌩️ This recalls the storm at Sinai
🌋 Smoke and violent weather covered the mountain
😱 The sight alone terrified everyone there
📖 Fear showed how holy God's presence was

## 📯 The Sound Of A Trumpet, And The Voice Of Words

At Sinai, a trumpet blast grew louder and louder as God approached.

Then an actual voice spoke words the people could hear and understand.

That was so terrifying that the people begged for it to stop.

Hearing God speak directly was treated as something almost too much to survive.

📯 A trumpet grew louder as God came
🗣️ God's voice spoke actual words aloud
😨 The people begged for it to stop
📖 Hearing God directly felt almost unbearable

## 🐐 If So Much As A Beast Touch The Mountain

Even an animal that wandered onto the mountain had to be put to death.

This was not cruelty toward animals.

It showed that the ground itself had become off limits.

God's presence made the whole space dangerous to approach.

No one got casually close to this kind of holiness.

🐐 Even a stray animal faced death there
🚫 This was never really about cruelty
⚠️ God's presence made the ground dangerous
📖 No one approached this holiness casually

## 😰 I Exceedingly Fear And Quake

Even Moses, who spoke with God directly many times, was terrified at this mountain.

Quake here means visibly shaking from fear.

The most trusted leader reacted that way.

No ordinary person stood a chance of feeling calm.

That terror sets up the sharp contrast coming next.

😰 Quake means visibly shaking with fear
🙇 Even Moses reacted this way
😟 No ordinary person could stay calm
📖 This terror sets up the next contrast

# Hebrews 12:22-24
# 🏙️ Mount Sion
---
## 🏙️ Ye Are Come Unto Mount Sion

Mount Sion represents the opposite experience of Mount Sinai.

Sinai meant fear, distance, and a mountain no one could approach.

Sion means access, nearness, and a welcome into God's presence.

Believers are told they have already arrived there through Christ.

This is not something still being waited for.

🏙️ Sion is the opposite of Sinai
😨 Sinai meant fear and distance
🤗 Sion means access and welcome
📖 Believers have already arrived through Christ

## 🌆 The City Of The Living God, The Heavenly Jerusalem

This is not a literal city a person could visit on a map.

The heavenly Jerusalem describes the lasting home God is preparing for his people.

It stands in contrast to any earthly city, including the physical Jerusalem the readers knew.

Earthly cities can fall, but this one cannot.

🌆 Not a literal city on a map
🏡 It describes the lasting home God prepares
🏛️ It outlasts any earthly city
📖 This city can never fall

## 👼 An Innumerable Company Of Angels

Innumerable means too many to count.

The readers are told they now belong to a massive gathering, not a small, isolated group.

Angels here are pictured as part of the welcoming crowd, not distant or threatening figures.

Coming to God now means joining a vast and joyful assembly.

👼 Innumerable means too many to count
🎉 Believers join a massive gathering
🤝 Angels here welcome, they do not threaten
📖 This is a vast and joyful assembly

## 📋 Church Of The Firstborn, Which Are Written In Heaven

Firstborn in this culture carried the full rights and inheritance of a family.

Calling the whole church firstborn means every believer shares that full inheritance.

It is not reserved for a chosen few.

Written in heaven pictures a permanent record, like a name entered in a citizen's registry.

That record cannot be lost or erased.

👑 Firstborn carried full family inheritance
🙋 Every believer shares that inheritance
📋 Written in heaven means a permanent record
📖 That record can never be lost

## 🤝 Jesus The Mediator Of The New Covenant

Mediator means someone who stands between two parties and makes peace possible.

Jesus makes the new covenant between God and people possible.

The blood of sprinkling recalls the blood used to seal covenants and cleanse sin in the Old Testament.

Abel's blood cried out for justice after Cain killed him.

Jesus's blood speaks mercy instead.

🤝 Mediator means one who makes peace possible
🩸 Blood of sprinkling recalls covenant and cleansing
😡 Abel's blood cried out for justice
📖 Jesus's blood speaks mercy instead

# Hebrews 12:25-29
# 🔥 A Kingdom Which Cannot Be Moved
---
## ⚠️ See That Ye Refuse Not Him That Speaketh

Him that speaketh refers to God, who has now spoken through his Son.

The warning recalls the people at Sinai who begged God to stop speaking out of fear.

Those who rejected the warning at Sinai still faced consequences for ignoring it.

The writer says this generation has even less excuse to turn away.

⚠️ Him that speaketh refers to God
🏔️ This recalls the fear at Sinai
😬 Ignoring warnings there still had consequences
📖 This generation has even less excuse

## 🌍 Whose Voice Then Shook The Earth

At Sinai, God's voice was powerful enough to physically shake the mountain and the ground around it.

That was a visible, one time display of power witnessed by one nation.

The writer is about to describe something even bigger than that single moment.

If that voice could shake the earth once, it can do far more than that.

🌍 God's voice literally shook the earth
👁️ This power was seen by one nation
⬆️ A bigger moment is coming next
📖 This voice can do far more

## 🌌 Yet Once More I Shake Not The Earth Only, But Also Heaven

This line quotes an old prophecy from Haggai about a final, greater shaking still to come.

The first shaking at Sinai only affected the earth and one mountain.

This second shaking is described as reaching heaven itself.

It points toward a final, total change bigger than anything the readers had experienced before.

🌌 This quotes an old prophecy from Haggai
🏔️ The first shaking only touched the earth
☁️ This shaking reaches heaven itself
📖 A bigger final change is coming

## 🍃 The Removing Of Those Things That Are Shaken

Shaken things here means anything only temporary, anything that was never meant to last forever.

The shaking removes all of that on purpose, not by accident.

What remains afterward is only what was permanent all along.

The writer wants readers to stop placing their hope in things built to be removed.

🍃 Shaken things means anything only temporary
🧹 The shaking removes it all on purpose
🏛️ What remains was always permanent
📖 Do not place hope in temporary things

## 👑 Receiving A Kingdom Which Cannot Be Moved

Every earthly kingdom the readers knew would eventually fall.

Empires rise and fall throughout the whole Bible and all of history.

This kingdom is described as the one exception to that pattern.

Belonging to it means grace to serve God acceptably, with real reverence and awe.

👑 Earthly kingdoms always eventually fall
📚 History is full of fallen empires
🛡️ This kingdom is the one exception
📖 It calls for reverence, not comfort

## 🔥 Our God Is A Consuming Fire

This line echoes an old warning from Deuteronomy about God's holiness.

Fire here pictures something that cannot be casually approached or treated lightly.

It burns away anything that does not belong in God's presence.

The chapter that opened with a race to run ends with a God worth real reverence.

🔥 This echoes an old warning from Deuteronomy
⚠️ Fire pictures holiness that cannot be casual
🧹 It burns away anything that does not belong
📖 The chapter ends calling for real reverence
`.trim();

export const HEBREWS_TWELVE_PERSONAL_SECTIONS = parseHebrewsTwelveRawNotes(HEBREWS_TWELVE_RAW_NOTES);
