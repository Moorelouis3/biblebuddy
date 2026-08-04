export type NumbersSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersSixRawNotes(rawText: string): NumbersSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 6:${startVerse}` : `Numbers 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 6 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_SIX_RAW_NOTES = `# Numbers 6:1-4
# 🍇 The Nazarite Vow Begins
---
## 🍇 Vow A Vow Of A Nazarite

A Nazarite was an ordinary Israelite who took on a special vow for a set time.

"Nazarite" comes from a Hebrew word meaning to separate or set apart.

Priests were born into their holy role.

A Nazarite chose it instead.

This vow let an ordinary person live as visibly set apart to God, for as long as they chose.

🍇 Nazarite means one set apart

📜 The vow lasted for a set time

🙏 Priests were born into their role

📖 A Nazarite chose it instead

## 🙋 When Either Man Or Woman

This vow was never limited to men.

Numbers six states plainly that a woman could take it too.

Most religious roles in Israel, like the priesthood, stayed limited to men from one family line.

A Nazarite vow had no such limit.

God did not save deep devotion for one class of people.

🙋 Man or woman could take this vow

🕎 Priesthood stayed limited to one family

🔓 A Nazarite vow had no such limit

📖 Devotion was not reserved for one group

## 🍷 Wine And Strong Drink

"Wine" here means the fermented drink made from grapes.

"Strong drink" means any other fermented drink, made from grain or fruit.

Together the two words cover every alcoholic drink available in that culture.

The vow banned all of it, not just wine.

The point was total abstinence, not moderation.

🍷 Wine means fermented grape drink

🍺 Strong drink means any other fermented drink

🚫 Together they cover every alcoholic drink

📖 The vow demanded total abstinence

## 🔍 Vinegar Of Wine, Or Vinegar Of Strong Drink

Vinegar made from wine could still carry some of its effect and its association with the drink.

The law closes that loophole by name.

A Nazarite could not use a byproduct of wine to get around the ban either.

Every form the vine could take was off the table.

🍇 Vinegar comes from wine gone sour

🚫 The ban covered this byproduct too

🔍 No loophole was left open

📖 Every form of the vine was banned

## 🍇 Nor Eat Moist Grapes, Or Dried

The ban did not stop at drinks.

A Nazarite could not eat fresh grapes off the vine.

Dried grapes, what most people call raisins, were banned too.

This vow touched the Nazarite's daily meals, not just special occasions.

🍇 Fresh grapes off the vine were banned

🍂 Raisins are dried grapes, banned too

🍽️ The ban touched daily meals

📖 This vow shaped everyday life, not one drink

## 🌱 From The Kernels Even To The Husk

"Kernels" means the seeds inside the grape.

"Husk" means the skin on the outside.

The law names both ends of the grape on purpose.

Nothing that came from the vine was allowed, not even the smallest part.

The vow asked for a complete break from the vine, not a partial one.

🌱 Kernels means the grape's seeds

🍇 Husk means the grape's skin

🚫 Nothing from the vine was allowed

📖 The vow asked for a complete break

# Numbers 6:5-8
# ✂️ Uncut Hair, Untouched By Death
---
## ✂️ There Shall No Razor Come Upon His Head

A razor cutting hair was completely off limits for the whole vow.

Uncut hair became the one visible sign anyone could see just by looking at the Nazarite.

Priests wore special garments to mark their role.

A Nazarite wore long, uncut hair instead.

This vow was visible to everyone, every single day.

✂️ No razor could touch his head

👀 Uncut hair marked him publicly

👕 Priests wore garments to mark their role

📖 This vow was visible every day

## 🌳 Let The Locks Of The Hair Of His Head Grow

"Locks" simply means the hair itself, growing out freely.

Think of a tree left unpruned on purpose.

The growth itself becomes the evidence that time has passed under the vow.

Every uncut inch of hair marked another day of devotion.

The hair kept a visible record of the vow.

🌳 Locks means the hair itself

🌱 Left uncut on purpose

📆 Growth marked time under the vow

📖 The hair kept a visible record

## ⚰️ He Shall Come At No Dead Body

Touching or even being near a dead body made a person ceremonially unclean.

A Nazarite had to avoid that contact completely for the whole vow.

This same rule normally applied to the high priest alone.

For the length of the vow, an ordinary person lived under a priest level rule.

⚰️ Dead bodies caused ceremonial uncleanness

🚫 A Nazarite avoided all contact

👑 Normally only the high priest kept this rule

📖 This raised an ordinary life to that standard

## 👪 For His Father, Or For His Mother, For His Brother, Or For His Sister

Ordinary priests were allowed to become unclean to bury their closest family.

A Nazarite got no such exception.

Not even a parent's funeral, or a sibling's, could be attended if it meant touching the body.

The vow asked for a devotion that did not bend, even for grief.

👪 Ordinary priests could bury close family

🚫 A Nazarite had no such exception

😢 Not even a parent's funeral was allowed

📖 The vow did not bend, even for grief

## 🙏 The Consecration Of His God Is Upon His Head

"Consecration" means being set apart and dedicated to God completely.

The text ties that consecration directly to the hair on his head.

The uncut hair was not just a rule to follow.

It was the actual sign of his consecration itself.

The vow lived on his body, not just in his intentions.

🙏 Consecration means dedicated fully to God

💇 The hair itself carried that meaning

✅ Not just a rule, but a sign

📖 The vow lived on his body

## ✨ All The Days Of His Separation He Is Holy Unto The Lord

"Holy" means set apart for God's own use, different from everything ordinary around it.

This status lasted only as long as the vow itself.

It was not permanent, and it was not earned by birth.

For a set season, this person's whole life belonged to God.

✨ Holy means set apart for God

⏳ This status lasted only the vow's length

🚫 Not permanent, not earned by birth

📖 His whole life belonged to God

# Numbers 6:9-12
# ⚱️ When The Vow Breaks By Accident
---
## ⚡ If Any Man Die Very Suddenly By Him

This law covers an accident, not a choice.

Someone could die suddenly right next to a Nazarite with no warning at all.

Simply being present at that moment was enough to defile him.

The vow could break through no fault of his own.

⚡ Sudden death could happen without warning

🧍 Just being present was enough to defile

🚫 This was not a choice he made

📖 Not his fault, but still broken

## 💇 He Hath Defiled The Head Of His Consecration

The defilement lands specifically on his head, the same place the vow was visibly marked.

All the growth of uncut hair up to that point no longer counted.

The vow resets at the moment of contact.

One accidental moment could undo months of visible devotion.

💇 Defilement struck the very sign of the vow

⏳ All that growth no longer counted

🔄 The vow reset at that moment

📖 One accident could undo months of devotion

## ✂️ He Shall Shave His Head In The Day Of His Cleansing

The Nazarite could not simply keep growing his hair after defilement.

He had to shave his head completely and start over.

Seven full days passed before that shaving actually happened.

The reset was as visible as the vow itself had been.

✂️ The head was shaved completely

🔄 The vow started over from nothing

📆 Seven days passed before the shaving

📖 The reset was visible to everyone

## 🕊️ Two Turtles, Or Two Young Pigeons

Turtledoves and young pigeons were the offering God allowed for people who could not afford a lamb.

This same option shows up elsewhere in the law for the poor.

The Nazarite vow was never only for the wealthy.

Anyone could make this right, rich or poor.

🕊️ Turtledoves and pigeons were the affordable option

💰 This option existed for the poor elsewhere

🙋 The vow was open to any income

📖 Anyone could make this right, rich or poor

## ⚖️ The Priest Shall Offer The One For A Sin Offering

A "sin offering" dealt with the guilt of becoming unclean, even by accident.

A "burnt offering" was completely consumed on the altar as a gift fully given to God.

Together the two offerings covered both sides of what happened.

One paid for the failure, the other renewed his full devotion.

⚖️ Sin offering covered the guilt of defilement

🔥 Burnt offering was fully given to God

🤝 Together they covered both sides

📖 One paid the debt, one renewed devotion

## 🗑️ But The Days That Were Before Shall Be Lost

None of the days already completed under the vow still counted.

The word "lost" means exactly that, wiped away completely.

A Nazarite six months into a vow who was defiled had to begin again at day one.

The vow demanded an unbroken record, not a mostly kept one.

🗑️ Earlier days no longer counted

🔁 He restarted completely from day one

⏳ Even months of progress were erased

📖 The vow demanded an unbroken record

## 🐑 A Lamb Of The First Year For A Trespass Offering

A "trespass offering," sometimes called a guilt offering, covered a wrong done even without intending it.

The Nazarite did not choose to be near that sudden death.

The law still required this offering anyway.

Some wrongs need to be made right even when nobody meant to cause them.

🐑 Trespass offering covers unintended wrong

🤷 He never chose to break the vow

✅ The offering was still required

📖 Some wrongs need repair even by accident

# Numbers 6:13-17
# 🐑 The Day The Vow Is Finished
---
## 📜 This Is The Law Of The Nazarite

This verse marks a clear turning point in the chapter.

Everything before this described how to keep the vow, or how to recover from breaking it.

Everything from here describes how to properly finish it.

A vow like this needed a real ending, not just a quiet stop.

📜 This marks the vow's turning point

🔙 Earlier verses covered keeping the vow

🔜 These verses cover finishing it

📖 The vow needed a real ending

## 🚪 He Shall Be Brought Unto The Door Of The Tabernacle Of The Congregation

The door of the tabernacle was the entrance to God's dwelling place among Israel.

Every major offering in this chapter happens at that same spot.

Finishing the vow required an actual trip there, not a private decision at home.

The vow began as a personal choice, but it had to end in God's presence.

🚪 The door was the entrance to God's dwelling

📍 Every major offering happened at this spot

🚶 Finishing the vow required a real trip

📖 A private vow ended in public presence

## 🐑 Without Blemish

"Without blemish" means the animal had no injury, disease, or defect at all.

Only a physically perfect animal counted as a fit gift for God.

The Nazarite brought three separate animals, one for each of three different offerings.

Finishing the vow properly took full devotion, a payment for guilt, and a shared meal, all three together.

🐑 Without blemish means physically perfect

🔢 Three animals for three offerings

🔥 Burnt, sin, and peace offerings together

📖 Devotion, guilt, and peace all covered together

## 🍞 A Basket Of Unleavened Bread

"Unleavened" means bread made without any yeast, so it never rises.

Yeast often stood as a picture of sin quietly spreading through something pure.

This bread stayed plain and simple on purpose.

Even the bread matched the purity the vow was meant to represent.

🍞 Unleavened means made without yeast

⚠️ Yeast often pictured sin spreading

🌾 The bread stayed plain on purpose

📖 Even the bread matched the vow's purity

## 🌾 Their Meat Offering, And Their Drink Offerings

A "meat offering" here does not mean meat at all, it means a grain offering of flour and oil.

A "drink offering" was wine poured out beside the altar.

Both accompanied the main animal sacrifices as a complete gift.

The vow ended with a full table brought before God, not just one animal.

🌾 Meat offering here means grain, not meat

🍷 Drink offering means wine poured out

🍽️ Both accompanied the animal sacrifices

📖 A full gift, not just one offering

## 🍽️ A Sacrifice Of Peace Offerings Unto The Lord

A "peace offering" was unusual because part of the meat was eaten, not entirely burned.

The worshiper, the priest, and God each received a share.

Sharing a meal like this pictured restored fellowship.

The vow ended with a shared table, not just a solemn sacrifice.

🍖 Peace offering meat was partly eaten

🤝 Worshiper, priest, and God each shared

🍽️ The meal pictured restored fellowship

📖 The vow ended at a shared table

# Numbers 6:18-21
# 💇 Cutting The Hair Free
---
## ✂️ Shave The Head Of His Separation At The Door Of The Tabernacle

This is the same hair that had grown uncut for the entire length of the vow.

It gets shaved off here, at the same doorway where the vow is being completed.

The most visible sign of the vow disappears the moment the vow itself ends.

The ending was as visible as the vow had been the whole time.

✂️ The uncut hair is finally shaved

🚪 This happens at the same doorway

👀 The visible sign disappears at this moment

📖 The ending was as visible as the vow

## 🔥 Put It In The Fire Which Is Under The Sacrifice Of The Peace Offerings

The shaved hair was not thrown away like ordinary waste.

It was placed directly into the fire burning under the peace offering.

The one physical sign of the vow became part of the sacrifice itself.

Even the hair belonged to God in the end.

🔥 The hair went into the sacrificial fire

🚫 It was not treated as waste

🎁 It became part of the offering itself

📖 Even the hair belonged to God

## ♨️ The Sodden Shoulder Of The Ram

"Sodden" is an old word meaning boiled in water.

This shoulder came from the ram offered as the peace offering.

The priest set this specific boiled piece aside for a specific next step.

Nothing about this closing ceremony was left vague or improvised.

♨️ Sodden means boiled in water

🐑 The shoulder came from the peace offering ram

📋 The priest set it aside deliberately

📖 Every step of the ceremony was exact

## 🙌 Shall Wave Them For A Wave Offering Before The Lord

A "wave offering" was lifted and moved before the altar as a gesture, not just set down.

The priest physically placed the boiled shoulder and the bread in the Nazarite's own hands first.

Then the priest waved it before the Lord together with him.

He took part in his own closing ceremony with his own hands, not as a bystander.

👐 Placed directly into his own hands

🙌 Wave offering meant lifting it before the altar

🤝 Priest and Nazarite moved it together

📖 He took part with his own hands

## 🍖 This Is Holy For The Priest, With The Wave Breast And Heave Shoulder

Priests owned no land and grew no crops of their own.

Portions like this breast and shoulder were part of how they were fed.

This was not an extra bonus, it was their normal pay for serving at the tabernacle.

God built the priest's income directly into the sacrifices themselves.

🍖 Priests owned no land of their own

🍽️ These portions were part of their food

💰 This was their normal pay

📖 God built their income into the offerings

## 🍷 The Nazarite May Drink Wine

This is the exact thing that was forbidden all the way back at the start of the vow.

The ban is now completely lifted.

The vow has a clear beginning and a clear, celebrated end.

Finishing a vow to God was worth marking, not just quietly returning to normal.

🍷 Wine was banned at the start

🔓 That ban is now fully lifted

🏁 The vow has a clear finish line

📖 Finishing a vow was worth marking

## ➕ Beside That That His Hand Shall Get

The offerings listed in this chapter were the minimum required.

This last line makes room for a Nazarite to bring more, if he was able and willing.

The law set a floor, not a ceiling.

A vow made freely could also be finished with extra generosity, freely given.

📏 The listed offerings were the minimum

➕ A Nazarite could bring more

🚫 The law set a floor, not a ceiling

📖 A free vow could end in free generosity

# Numbers 6:22-27
# 🙏 The Priestly Blessing
---
## 📏 On This Wise Ye Shall Bless The Children Of Israel

"On this wise" is an old way of saying in this exact way.

God is not leaving Aaron to improvise his own words.

He hands Aaron and his sons a specific blessing to say, word for word.

This is the oldest fixed blessing in the entire Bible, still spoken today.

📏 On this wise means in this exact way

🗣️ God gave Aaron the exact words

👨‍👦 Aaron's sons would use it too

📖 The oldest fixed blessing in the Bible

## 🙏 The Lord Bless Thee

To "bless" means to ask God to actively bring good into someone's life.

It is not a wish sent into empty air.

It is a request aimed directly at the one being blessed.

Everything else in this blessing explains what that good actually looks like.

🙏 Bless means asking God for real good

🎯 It is aimed at one person

🚫 Not a vague wish

📖 Everything after this explains the blessing

## 🐑 And Keep Thee

"Keep" means guard and protect, the same word used for a shepherd watching sheep.

Blessing without protection would not be enough on its own.

This line asks God to actively guard what He gives.

God is asked to both give good and guard it.

🐑 Keep means guard, like a shepherd

🛡️ Protection matters as much as blessing

🎁 God is asked to guard what He gives

📖 Give and guard, together

## 😊 The Lord Make His Face Shine Upon Thee

This does not describe a literal light coming from God's face.

A shining face is a normal way to describe someone who is pleased and delighted.

Think of how a person's face lights up seeing someone they love.

This line asks for God's genuine delight, not just His attention.

😊 A shining face pictures delight

🚫 Not a literal light

❤️ Like a face lighting up for someone loved

📖 This asks for God's genuine delight

## 🎁 And Be Gracious Unto Thee

"Gracious" means receiving kindness that was never earned or deserved.

It is different from fairness, which gives people only what they are owed.

This line asks for more than a fair deal from God.

It asks for kindness that goes beyond what anyone has earned.

🎁 Gracious means undeserved kindness

⚖️ Different from simple fairness

➕ Asks for more than a fair deal

📖 Kindness beyond what is earned

## 🙂 The Lord Lift Up His Countenance Upon Thee

"Countenance" means someone's face, especially the expression it carries.

Lifting it up pictures God turning to look directly at a person, fully attentive.

It is the opposite of God turning away or looking elsewhere.

This line asks for God's full, direct attention, not a passing glance.

🙂 Countenance means the face and its expression

👀 Lifted up means turned fully toward someone

🚫 The opposite of looking away

📖 This asks for God's full attention

## 🕊️ And Give Thee Peace

The Hebrew word behind "peace" here is shalom.

Shalom means far more than the absence of conflict.

It means complete wholeness, everything in a person's life working the way it should.

The blessing ends by asking for a whole, complete life, not just a quiet one.

🕊️ Peace here is the Hebrew word shalom

🧩 It means complete wholeness

🚫 More than just the absence of conflict

📖 A whole life, not just a quiet one

## 🏷️ They Shall Put My Name Upon The Children Of Israel, And I Will Bless Them

Aaron and his sons only speak the words.

God is the one who actually attaches His own name to the people through them.

The priests are not the source of the blessing.

God promises to personally follow through on every word they say.

🗣️ Priests only speak the words

🏷️ God attaches His own name to the blessing

🚫 Priests are not the source

📖 God promises to follow through Himself
`.trim();

export const NUMBERS_SIX_PERSONAL_SECTIONS = parseNumbersSixRawNotes(NUMBERS_SIX_RAW_NOTES);
