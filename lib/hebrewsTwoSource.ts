export type HebrewsTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsTwoRawNotes(rawText: string): HebrewsTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 2:${startVerse}` : `Hebrews 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Hebrews 2 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_TWO_RAW_NOTES = `# Hebrews 2:1-4
# 👂 A Warning Against Drifting Away
---
## 🎯 Give The More Earnest Heed

"Heed" means careful, active attention, not casual listening.

"The more earnest" means even more urgent than usual.

Hebrews has just spent chapter one proving the Son outranks every angel.

That truth now demands a response, not simply agreement.

A greater messenger means a greater danger in looking away.

🎯 Heed means careful active attention
⬆️ Earnest means even more urgent
👑 Chapter one already proved the Son's rank
📖 A greater messenger raises the stakes

---
## ⛵ Lest At Any Time We Should Let Them Slip

The phrase "let them slip" pictures a ship drifting silently past its harbor.

Nothing has to crash or sink to cause real loss.

A small current can carry someone past the one truth that mattered.

This is not about open rebellion but about quiet drifting.

Many people lose their footing this way, one small drift at a time.

🚣 Let them slip pictures a drifting ship
🌊 Harbors are missed quietly not dramatically
📉 Small currents cause real spiritual loss
➡️ Quiet drifting is still real danger

---
## 📜 The Word Spoken By Angels Was Stedfast

"The word spoken by angels" refers to the law God gave Moses at Sinai.

Jewish tradition held that angels took part in delivering that law to Israel.

"Stedfast" means firm and completely reliable, not shaky or uncertain.

Every rule in that law carried real weight and a real penalty.

Hebrews is building toward something delivered by someone greater than angels.

📜 The word means the law at Sinai
👼 Angels reportedly helped deliver that law
🪨 Stedfast means firm and fully reliable
📖 A greater messenger is coming next

---
## ⚖️ A Just Recompence Of Reward

"Recompence" means a fitting payback, whether a reward or a punishment.

Under the law given at Sinai, every broken command carried a real consequence.

Nobody could claim ignorance or escape the penalty attached to disobedience.

That old system was serious and fully enforced.

The next verse asks how much more serious a greater message must be.

⚖️ Recompence means a fitting payback
🚫 No one could claim ignorance
📏 Every broken command had a consequence
➡️ A greater message raises the stakes further

---
## 🚨 If We Neglect So Great Salvation

Ignoring this salvation is treated as seriously as breaking the old law.

"Neglect" means simple carelessness, not violent rejection.

Many people never openly reject the gospel.

They simply never act on it.

Hebrews calls that quiet inaction just as dangerous as open disobedience.

🚨 Neglect means simple carelessness
🙅 Not violent rejection just inaction
😶 Many never openly reject the gospel
📖 Quiet inaction is still real disobedience

---
## 🗣️ Confirmed Unto Us By Them That Heard Him

"Them that heard him" refers to the apostles who heard Jesus in person.

The gospel did not start as a rumor or a secondhand story.

It began with the Lord's own preaching, then was confirmed by eyewitnesses.

Hebrews is building a chain of reliable witnesses, not guesswork.

That same confirmed message is what the readers are being warned not to ignore.

🗣️ Them that heard him means the apostles
👂 They heard Jesus preach in person
🔗 A real chain of eyewitnesses stands behind it
📖 This confirmed message deserves full attention

---
## ✨ Signs And Wonders, And Divers Miracles

God backed up this message with visible, undeniable proof.

"Signs" points to miracles that carried a clear meaning, not just spectacle.

"Wonders" points to miracles that left people amazed.

"Divers miracles" means many different kinds, not one single trick repeated.

These were not private experiences.

They happened out in the open for everyone to see.

✨ Signs means miracles carrying clear meaning
🌟 Wonders means miracles that left people amazed
🎭 Divers means many different kinds
📖 This proof happened out in the open

---
## 🎁 Gifts Of The Holy Ghost, According To His Own Will

These gifts were real abilities given directly by the Holy Spirit.

"According to his own will" means God chose who received which gift.

No one could demand a gift or decide which one they deserved.

Paul describes a similar list of gifts in his letter to Corinth.

God distributes these gifts.

People do not grab them for themselves.

🎁 These were real Spirit given abilities
👑 God decided who received which gift
🙅 No one could demand a gift
📖 God gives people do not grab

# Hebrews 2:5-9
# 👑 Psalm Eight And The Lower Son Who Tasted Death
---
## 🌍 The World To Come

"The world to come" means the future age ruled fully by Christ.

Angels were never given authority over that coming age.

Chapter one already showed angels serving, not ruling.

This verse sets up a question about who actually was given that rule.

The next lines answer it from an old psalm.

🌍 The world to come means Christ's future reign
👼 Angels were never given that authority
🛎️ Chapter one already showed angels serving
📖 An old psalm answers who rules it

---
## ❓ What Is Man, That Thou Art Mindful Of Him

This question comes from Psalm eight, written centuries earlier by David.

David marvels that God pays any attention to human beings at all.

Compared to the size of the universe, people seem small and forgettable.

Hebrews quotes this psalm to ask the same question about humanity's place.

God's attention toward people was never about their size or strength.

❓ This question comes from Psalm eight
🌌 Humans seem small next to the universe
😮 David marvels God notices people at all
📖 Attention never depended on human strength

---
## 👤 The Son Of Man, That Thou Visitest Him

"Visitest" means to come near someone and act on their behalf.

This is not a casual visit like checking in on a neighbor.

It describes God personally stepping into human affairs.

Psalm eight first spoke about humanity in general.

Hebrews will soon apply this same language to one specific man, Jesus.

👤 Visitest means God stepping in personally
🚶 Not a casual visit a real involvement
📜 Psalm eight first spoke of all humanity
📖 Hebrews applies it to Jesus specifically

---
## 📉 A Little Lower Than The Angels

This phrase does not mean humanity is permanently weaker than angels.

It describes a temporary rank, lower for now, not forever.

Angels do not die, grow tired, or suffer the way people do.

Psalm eight first described this about mankind in general.

Verse nine will apply the exact same phrase to Jesus himself.

📉 Lower for now not forever
👼 Angels do not die or grow tired
📜 Psalm eight first spoke of mankind
➡️ The same phrase soon describes Jesus

---
## 👑 Set Him Over The Works Of Thy Hands

God crowned mankind with glory and honour at creation.

"Set him over the works of thy hands" means God gave people charge over the created world.

Genesis one already describes this same authority to rule over the earth.

Humanity was never meant to be a passive bystander in creation.

This authority was a gift, not something people earned.

👑 Crowned with glory and honour
🌍 Set over the works of his hands
📜 Genesis one already describes this authority
📖 Authority over creation was a gift

---
## 🦶 Put All Things In Subjection Under His Feet

"Subjection" means placed under full authority and control.

This verse pictures everything in creation placed under humanity's rule.

"Under his feet" is an old image for complete and total defeat.

The scope here is total, nothing is left outside that rule.

The very next line admits that this rule does not look complete yet.

🦶 Subjection means full authority and control
👣 Under his feet means total defeat
🌐 Nothing was left outside this rule
➡️ The next line admits it looks incomplete

---
## 👀 We See Not Yet All Things Put Under Him

This line admits an honest gap between the promise and what is visible now.

Sickness, death, and sin still clearly operate in the world today.

The writer does not hide that uncomfortable fact or explain it away.

Scripture can hold a promise and an unfinished reality at the same time.

The next verse answers where that completed rule can actually be seen.

👀 A real gap between promise and sight
🚫 Sickness death and sin still operate
🙅 The writer does not hide this
📖 The next verse shows where it is seen

---
## ✝️ We See Jesus, Made A Little Lower Than The Angels

The psalm's words about mankind now land on one specific person, Jesus.

He truly took on that lower rank, including real human suffering.

This was not a temporary costume or an illusion of weakness.

Jesus experienced the full lower position the psalm first described.

The completed rule missing in verse eight is finally visible in him.

✝️ The psalm's words now point to Jesus
🩹 His lower rank included real suffering
🎭 This was not a costume or illusion
📖 The missing rule becomes visible in him

---
## 🩸 Taste Death For Every Man

"Taste" here means to personally experience something fully, not sample it lightly.

Jesus did not simply witness death from a safe distance.

He genuinely died, the same death every human being eventually faces.

"For every man" means his death was not limited to one nation or group.

This happened only by the grace of God, a gift, not something owed.

🩸 Taste means to fully experience something
🌍 His death reached every man not one group
🎁 This came by the grace of God
📖 A gift not something anyone was owed

# Hebrews 2:10-13
# 🛡️ The Captain Made Perfect Through Suffering
---
## 🛠️ For Whom Are All Things, And By Whom Are All Things

This phrase describes God the Father as the source of everything that exists.

"By whom are all things" means everything was made through him.

"For whom are all things" means everything exists for his purpose.

Paul uses almost identical language about God in his letter to the Romans.

Nothing in creation stands outside that double claim.

🛠️ By whom means made through him
🎯 For whom means everything exists for him
📜 Paul uses nearly identical language elsewhere
📖 Nothing stands outside this double claim

---
## ⚓ The Captain Of Their Salvation

"Captain" here means a pioneer or leader who goes first and opens the way.

It does not describe a military rank or a ship's officer.

Jesus goes ahead of everyone else into suffering and death.

"Made perfect through sufferings" means his suffering completed his qualification, not his character.

He was never sinful, but suffering finished his work as a perfect high priest.

⚓ Captain means a pioneer who leads the way
🚶 Jesus goes first into suffering
✅ Made perfect means fully qualified for the role
📖 Suffering completed his saving work

---
## 🤝 He That Sanctifieth And They Who Are Sanctified

"Sanctifieth" means to make holy or set apart for God.

"He that sanctifieth" refers to Jesus, the one who makes people holy.

"They who are sanctified" refers to the believers he makes holy.

"Are all of one" means they share one source, one family, one Father.

That shared origin is the reason Jesus is not ashamed to call them family.

🤲 Sanctifieth means to make holy
🙌 Jesus is the one who sanctifies
👪 Believers are the ones made holy
📖 One shared origin unites them as family

---
## 👪 Not Ashamed To Call Them Brethren

Jesus is not embarrassed to claim ordinary, flawed people as his own family.

Brothers in this culture shared a true blood connection, not just friendship.

This claim is sealed in verse twelve by an actual psalm quotation.

A king calling broken people family would have been a scandal.

Jesus makes that same claim without hesitation.

👪 Jesus is not embarrassed by this family
🩸 Brethren means a true blood connection
📜 Verse twelve seals this with scripture
📖 A king claiming broken people was scandalous

---
## 🎶 In The Midst Of The Church Will I Sing Praise

This quotation comes from Psalm twenty two, a psalm about deep suffering.

Hebrews places these words directly into the mouth of Jesus himself.

"The church" here means the gathered community of believers.

Jesus is pictured leading worship among his own people, not standing apart from them.

The one who suffered now leads the praise that follows.

🎶 This quotation comes from Psalm twenty two
🗣️ Hebrews places these words in Jesus's mouth
👪 The church means the gathered believers
📖 The sufferer now leads the praise

---
## 🙏 I Will Put My Trust In Him

This quotation shows Jesus relying on God the same way any believer must.

He faced suffering not by his own independent strength alone.

He trusted his Father through it, fully and completely.

That trust makes him a true example, not only a rescuer.

Believers can trust the same way he did.

🙏 Jesus relied on God through suffering
💪 Not by independent strength alone
🧭 His trust makes him a true example
📖 Believers can trust the same way

---
## 👶 The Children Which God Hath Given Me

"The children" refers to the believers God has placed under Jesus's care.

"Given me" echoes language Jesus uses often in John's Gospel about his own people.

These children are not merely followers.

They are family entrusted to him directly.

This verse closes the chain of quotations that began back in verse twelve.

Together they prove Jesus truly shares humanity with the people he saves.

👶 The children means believers given to Jesus
📜 John's Gospel echoes this same language
👪 They are family not just followers
➡️ Jesus truly shares humanity with them

# Hebrews 2:14-18
# 🩸 Flesh And Blood For The Sake Of Mercy
---
## 🩸 Partakers Of Flesh And Blood

"Partakers of flesh and blood" means ordinary human beings, body and all.

Jesus did not merely appear human, he genuinely took on a real human body.

This matches exactly what chapter one already said he would do.

Without a real body, he could not actually die for anyone.

His full humanity was necessary, not optional, for the plan to work.

🩸 Flesh and blood means real humanity
✅ Jesus genuinely took on a human body
🔗 This matches what chapter one promised
📖 Real humanity was necessary for his death

---
## 💀 Destroy Him That Had The Power Of Death

"Destroy" here does not mean the devil stopped existing after this.

It means his power was broken and disabled, not his existence erased.

The devil had used death as a weapon and a threat over people.

Jesus's own death took that exact weapon out of his hand.

This is a defeat of power, not a removal from the story.

💀 Destroy means disabled not erased
⚔️ Death was the devil's weapon
🛡️ Jesus's death broke that weapon
📖 A defeat of power not existence

---
## ⛓️ Subject To Bondage Through Fear Of Death

"Bondage" means slavery, a complete lack of freedom.

Fear of death kept people trapped their entire lives, not just occasionally.

Many ancient religions tried to manage that fear through rituals and offerings.

Hebrews says Jesus deals with the fear itself, not just its symptoms.

Freeing people from that fear is part of the same rescue described in verse fourteen.

⛓️ Bondage means a complete lack of freedom
😨 Fear of death trapped people for life
🕯️ Many rituals tried to manage that fear
📖 Jesus deals with the fear itself

---
## 🌱 The Seed Of Abraham

"The seed of Abraham" means Jesus's human ancestry traces through Abraham's line.

This is not about angels, since angels have no physical bloodline at all.

Matthew's Gospel opens by tracing exactly this genealogy in detail.

Jesus had to belong fully to the human family he came to rescue.

A rescuer from outside that family could not represent it the way he does.

🌱 Seed of Abraham means human ancestry
👼 Angels have no physical bloodline
📜 Matthew traces this exact genealogy
📖 A true rescuer shares the family

---
## 🙇 It Behoved Him To Be Made Like Unto His Brethren

"Behoved" means it was necessary, almost an obligation, not simply a nice idea.

Jesus had to be made fully like the people he represents.

A priest who never actually faced human weakness could not truly understand it.

This necessity connects directly back to the captain made perfect through suffering in verse ten.

Full likeness to humanity was the only way his priesthood could work.

🙇 Behoved means it was necessary
🧍 Jesus had to be fully human
💭 A priest must understand real weakness
📖 This connects back to verse ten

---
## ⚖️ A Merciful And Faithful High Priest

"Merciful" means he treats people gently, not harshly, in their weakness.

"Faithful" means he can always be trusted to keep his word.

A high priest in Israel stood between the people and God, offering sacrifices.

This priest combines compassion with total reliability, a rare pairing in any leader.

Hebrews will spend much of the rest of the letter unpacking this exact priesthood.

⚖️ Merciful means gentle toward human weakness
🤝 Faithful means always keeping his word
🕊️ A high priest stood between people and God
📖 This priesthood fills the rest of Hebrews

---
## 🩹 Make Reconciliation For The Sins Of The People

"Reconciliation" means restoring a broken relationship back to peace.

Sin had created real distance between God and his people.

Old Testament sacrifices covered sin again and again, year after year.

This priest's work actually closes that distance, not just manages it temporarily.

Peace with God becomes possible through this one priest's single act.

🩹 Reconciliation means restoring a broken relationship
📏 Sin had created real distance from God
🔁 Old sacrifices only managed sin repeatedly
📖 This priest actually closes that distance

---
## 🤲 He Is Able To Succour Them That Are Tempted

"Succour" means to run to someone's aid in a moment of real need.

Jesus faced genuine temptation himself, not a scripted or fake test.

That real experience lets him help people facing the exact same pressure.

This closes the chapter's whole argument about why a human priest was necessary.

A high priest who never felt the pull of temptation could not truly help anyone.

🤲 Succour means running to someone's aid
🔥 Jesus faced genuine temptation himself
🤝 His experience lets him truly help others
📖 This closes the chapter's whole argument
`.trim();

export const HEBREWS_TWO_PERSONAL_SECTIONS = parseHebrewsTwoRawNotes(HEBREWS_TWO_RAW_NOTES);
