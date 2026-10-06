export type HaggaiTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHaggaiTwoRawNotes(rawText: string): HaggaiTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HaggaiTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Haggai\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Haggai 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Haggai\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Haggai\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Haggai 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Haggai 2:${startVerse}` : `Haggai 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Haggai 2 sections, received " + sections.length);
  }

  return sections;
}

const HAGGAI_TWO_RAW_NOTES = `# Haggai 2:1-5
# 😔 Comparing The Old Glory
---
## 📅 In The Seventh Month, In The One And Twentieth Day Of The Month

This date lands on a major feast day.

The seventh month held the Feast of Tabernacles on the Hebrew calendar.

That feast celebrated God's care for his people after the Exodus.

Haggai's first message came only weeks before this one.

God speaks again right as the people gather to celebrate the harvest.

📅 This date lands on a feast day

🌾 Tabernacles celebrated God's provision

⏳ Only weeks after Haggai's first message

📖 God speaks as the harvest is celebrated

## 👥 And To The Residue Of The People

This message reaches further than just the two leaders.

"Residue" means the remnant, the ordinary people who had returned from exile.

God had already named Zerubbabel and Joshua directly back in chapter one.

Here the whole community gets pulled into the same conversation.

Discouragement was never only a leadership problem.

It had spread through everyone working on the temple.

👥 Residue means the ordinary returned people

🗣️ Everyone receives this message, not just leaders

😔 Discouragement had spread through the whole group

📖 God speaks to the whole community together

## 🏛️ Who Is Left Among You That Saw This House In Her First Glory

This question singles out the oldest people in the crowd.

Solomon's temple had been destroyed about seventy years earlier.

Only a small handful of elderly people could remember seeing it standing.

Most of the current builders had never seen the original at all.

God names the exact source of the discouragement before he answers it.

👴 Only a few elders remembered the first temple

🏛️ Solomon's temple fell about seventy years earlier

💭 Most builders never saw the original

📖 God names the discouragement directly

## 💔 In Comparison Of It As Nothing

The new foundation looked small next to the memory of Solomon's temple.

"As nothing" is their own harsh verdict on the project.

Ancient temples were usually judged by size and expensive materials.

This structure could not compete on either measure yet.

God speaks their own discouraged words out loud before he answers them.

📏 The new temple looked small by comparison

💔 As nothing means it felt worthless

🏗️ Size and materials usually measured a temple's worth

📖 God names their verdict before answering it

## 💪 Be Strong, All Ye People Of The Land

"Be strong" is repeated three separate times in this one verse.

It is spoken to Zerubbabel, to Joshua, and to all the people.

Repeating a command like this in Hebrew signals real urgency.

God does not wait for them to feel brave first.

He commands the strength and gives the reason right after.

🔁 Be strong repeats three times here

👥 It reaches every leader and every person

💪 Strength is commanded before it is felt

📖 The reason for it comes right after

## 🔨 And Work: For I Am With You, Saith The LORD Of Hosts

"Work" is a direct command here, not a gentle suggestion.

Feeling strong was never going to finish the temple on its own.

God pairs the inward command to be strong with an outward command to act.

"For I am with you" is the reason given, not a prize they had to earn.

🔨 Work is a direct command

💪 Feeling strong alone was not enough

🙌 Inner strength pairs with outward action

📖 God's presence is the reason, not a reward

## 📜 According To The Word That I Covenanted With You When Ye Came Out Of Egypt

God reaches all the way back to the Exodus to make his point.

"Covenanted" means a formal, binding promise, not a casual remark.

That ancient covenant promised God's own presence would travel with his people.

The same promise made through Moses still holds true centuries later.

God's faithfulness is not a single past event.

It carries forward across generations.

📜 Covenanted means a formal binding promise

🏃 This points back to the Exodus

⏳ The same promise still applies here

📖 God's faithfulness carries across generations

## 🚫 Fear Ye Not

This short command closes out the whole opening section.

Fear was the real obstacle standing between the people and obedience.

It was not a lack of resources or a lack of skill.

Removing fear mattered more than solving any practical problem.

Three plain words answer a discouragement that took several verses to describe.

🚫 Fear was the real obstacle here

🛠️ It was not a resource problem

🗣️ Three words answer the whole complaint

📖 Removing fear mattered most

# Haggai 2:6-9
# 🌍 I Will Shake The Heavens
---
## ⏳ Yet Once, It Is A Little While

This phrase signals the next event is coming soon, not centuries away.

"A little while" echoes the same urgency found elsewhere in Haggai.

The writer of Hebrews later quotes this exact verse.

Hebrews uses it to describe a lasting kingdom that cannot be shaken.

A sixteen year delay on the temple never changed God's own timeline.

⏳ A little while signals something near

📖 Hebrews quotes this exact promise

🏛️ It points to a lasting kingdom

➡️ Delay here did not change God's plan

## 🌍 I Will Shake The Heavens, And The Earth, And The Sea, And The Dry Land

This list names everything that could possibly be shaken.

Sky, ground, sea, and dry land leave nothing left untouched.

Ancient readers understood this as total, cosmic upheaval.

It is not a small, local event limited to Judah.

God describes something that reaches every part of creation at once.

🌍 This list covers all of creation

🌊 Sea and land both get named

💥 It describes total cosmic upheaval

📖 Nothing is left untouched by this

## 🌐 The Desire Of All Nations Shall Come

This shaking is not only physical.

It also reaches the political power of every nation on earth.

Many scholars read "the desire of all nations" as wealth flowing toward God's house.

Other scholars read it as pointing forward to the Messiah himself.

Either reading points to something far bigger than one small building.

🌐 This shaking reaches every nation's power

💰 Many scholars see wealth flowing in

✨ Others see it pointing to the Messiah

📖 Either way, it is bigger than one building

## ☁️ I Will Fill This House With Glory

The first temple's glory arrived as a visible cloud of God's presence.

This new, smaller structure looked like it could never compete with that.

God promises the same kind of glory will fill this one too.

The promise rests on God's presence, not on the size of the walls.

☁️ The first temple's glory was visible

🏗️ This house looked too small for that

🔥 God promises the same glory will fill it

📖 Presence matters more than size

## 💰 The Silver Is Mine, And The Gold Is Mine

Money had been one of the biggest excuses for stalling this project.

God answers that excuse by claiming ownership of all silver and gold.

Funding was never actually the real obstacle.

Obedience was.

💰 Silver and gold already belong to God

🚫 Money was never the real obstacle

🙏 Obedience was the actual issue

📖 God owns the resources already

## 🏛️ The Glory Of This Latter House Shall Be Greater Than Of The Former

"The former" is Solomon's temple, the one everyone kept comparing this one to.

God flatly reverses the comparison that opened this whole chapter.

The reversal does not depend on matching the old temple's size or gold.

It depends entirely on God's own presence filling the new one.

🏛️ The former house was Solomon's temple

🔄 God reverses the whole comparison

✨ The reversal depends on God's presence

📖 Discouragement is answered directly here

## 🕊️ In This Place Will I Give Peace

Peace here means far more than the simple absence of conflict.

It describes wholeness, security, and things being set right.

This promise lands on the exact site that had just been called worthless.

God offers peace to the very place the people had given up on.

🕊️ Peace means wholeness, not just quiet

🏗️ It lands on the site called worthless

🎁 God offers peace where people gave up

📖 This place matters to God after all

# Haggai 2:10-14
# ⚖️ Ask Now The Priests
---
## 🗓️ In The Four And Twentieth Day Of The Ninth Month, In The Second Year Of Darius

This message arrives exactly two months after the chapter began.

The ninth month fell in late autumn, close to the start of the rainy season.

Dating every message this precisely is unique to the book of Haggai.

It lets a reader track the whole story almost week by week.

🗓️ Two months after this chapter began

🍂 The ninth month falls in late autumn

📏 Haggai dates every message this precisely

📖 The whole story can be tracked closely

## ⚖️ Ask Now The Priests Concerning The Law

Priests were the recognized experts on ceremonial purity in Israel.

Haggai is told to bring them a legal question, like a court case.

This was a normal, respected way to settle a question about the law.

The answer that follows carries the full weight of the priests' own ruling.

🙏 Priests were the experts on purity law

⚖️ This functions like a legal ruling

🗣️ The answer is not Haggai's opinion

📖 It carries the priests' own authority

## 🥩 If One Bear Holy Flesh In The Skirt Of His Garment

"Holy flesh" means meat set apart from a sacrifice, meant only for priestly use.

A "skirt" here is the long fold of an outer robe.

Pockets did not exist yet in the way we use them today.

People folded the edge of their robe to carry food or small items.

The question asks whether that holiness can transfer to whatever the garment touches next.

🥩 Holy flesh means sacrificial meat

👕 Skirt means the fold of a robe

🎒 Robes worked like built in pockets

📖 The question is whether holiness spreads by touch

## 🚫 And The Priests Answered And Said, No

Holiness, it turns out, does not spread easily by simple contact.

Touching holy meat did not make the next thing it touched holy too.

The priests' ruling is short and direct.

That answer sets up a sharp contrast with the next question.

🚫 Holiness does not spread by touch

👕 Touching it once was not enough

⚖️ The ruling is short and direct

📖 This sets up the next contrast

## 💀 If One That Is Unclean By A Dead Body Touch Any Of These

This second question flips the first one around.

Now the object touching things is unclean because it touched a dead body.

The priests answer that it does spread this time.

Uncleanness moves from person to object far more easily than holiness ever does.

💀 This case involves a dead body

✅ Uncleanness spreads to what it touches

⚖️ It spreads easier than holiness does

📖 That contrast is the whole point

## 😔 So Is This People, And So Is This Nation Before Me

Haggai applies the ruling directly to the people listening.

Their neglect of the temple worked like the unclean object in the illustration.

It did not stay contained to just the temple site itself.

It spread outward and touched even the offerings they brought to God.

Good intentions could not undo the effect of real neglect.

👥 The ruling now applies to the people

😔 Their neglect spread like uncleanness

🎁 Even their offerings were affected

📖 Good intentions could not undo it

# Haggai 2:15-19
# 🌾 Consider From This Day
---
## 🔍 Consider From This Day And Upward

"Consider" commands careful reflection, not a quick glance back.

This is the same word used earlier in chapter one.

God wants the people to compare their past struggles to what comes next.

A turning point only works when people can see the before and the after.

🔍 Consider means careful reflection

🔁 The same word appeared in chapter one

⚖️ It compares the past to what comes next

📖 A turning point needs a clear before

## 🧱 From Before A Stone Was Laid Upon A Stone In The Temple Of The LORD

"Stone upon stone" is a simple way to describe active construction.

It marks the exact moment building work restarted on the site.

Everything God is about to describe happened before that moment.

The timing proves the hardship was not caused by their own effort.

🧱 Stone upon stone means active building

🏗️ This marks when work restarted

⏳ Everything described happened before that point

📖 This hardship was not their own fault

## 🌾 When One Came To An Heap Of Twenty Measures, There Were But Ten

A grain heap that should have measured twenty units only produced ten.

That is half of what anyone would reasonably expect from the harvest.

"Measures" here points to a standard dry unit used for grain.

Farmers walked away from their own fields with half the food they counted on.

🌾 A full heap should have been twenty units

📉 It only produced half that amount

📏 Measures were a standard grain unit

📖 Farmers lost half of what they expected

## 🍇 To Draw Out Fifty Vessels Out Of The Press, There Were But Twenty

A "press" here is a winepress or olive press used to draw out juice or oil.

Fifty vessels worth should have come out of a normal pressing.

Only twenty vessels actually came out this time.

The same shortage pattern repeats across two completely different harvests.

🍇 A press extracted wine or olive oil

📦 Fifty vessels were expected from it

📉 Only twenty vessels actually came out

📖 Both harvests failed the same way

## 🔥 I Smote You With Blasting And With Mildew And With Hail

"Blasting" means scorching, hot wind that withers a crop before it matures.

"Mildew" is a fungus that quietly rots grain from the inside.

These exact disasters are named earlier in the law as covenant curses.

God names the specific judgment he sent, not random bad luck.

🔥 Blasting means scorching, withering wind

🍄 Mildew rots grain from the inside

📜 These match an old covenant curse

📖 This was judgment, not bad luck

## 🚫 Yet Ye Turned Not To Me

Three different kinds of crop disaster still did not produce repentance.

Judgment alone, without a response, accomplishes nothing by itself.

This short line explains why hardship stretched on for so many years.

The goal was never punishment for its own sake.

It was meant to turn the people back to God.

🚫 Repentance never came despite the warnings

⏳ This explains the years of hardship

🎯 Punishment was never the real goal

📖 It was meant to turn them back

## 🔁 From The Day That The Foundation Of The LORD's Temple Was Laid

This repeats the command from verse fifteen, almost word for word.

Hebrew writers often framed a whole section between two matching bookends.

Everything between these two commands builds one connected argument about the past.

The repetition signals the diagnosis is now finished.

🔁 This repeats the verse fifteen command

📚 Hebrew writers often used bookends

🧱 Everything between is one connected case

📖 The diagnosis is now complete

## 🌱 Is The Seed Yet In The Barn

This question has an obvious answer that everyone listening already knew.

No harvest had come in yet.

None of the fruit trees had produced anything either.

There is nothing visible yet to prove God's promise is true.

🌱 No harvest exists yet to point to

🌳 The fruit trees have not produced either

🙏 Nothing visible proves the promise yet

📖 The question answers itself

## 🎁 From This Day Will I Bless You

God still promises blessing starting from this exact day forward.

The promise comes before any crop has actually grown.

Faith here means trusting a promise before the evidence shows up.

This line turns the whole chapter from looking back to looking ahead.

🎁 Blessing starts today, before the harvest

🙏 Faith trusts the promise before the evidence

➡️ The chapter now turns toward the future

📖 Looking back ends, looking ahead begins

# Haggai 2:20-23
# 👑 I Will Make Thee As A Signet
---
## 🗓️ In The Four And Twentieth Day Of The Month

This message lands on the exact same day as the one before it.

This time God speaks to Zerubbabel alone, leaving out Joshua the priest.

The earlier message that day addressed the whole nation's future blessing.

This second message turns specifically toward kings and nations.

🗓️ This message came the same day

👑 It speaks to Zerubbabel alone

🌍 The focus shifts toward nations and kingdoms

📖 Two messages, two very different scopes

## 🌍 I Will Shake The Heavens And The Earth

This exact promise already appeared earlier in this same chapter.

Repeating it here ties Zerubbabel personally into that larger promise.

He is not simply a local governor managing a small building project.

He is tied to something God is doing on a much bigger stage.

🔁 This repeats an earlier promise exactly

🌍 It ties Zerubbabel to a cosmic event

🏛️ He is more than a local governor

📖 He is tied to something far bigger

## 👑 I Will Overthrow The Throne Of Kingdoms

"Throne" represents the full authority and power a kingdom holds.

God promises to personally remove that authority from every rival kingdom.

This goes beyond the outcome of a single battle or a single ruler.

It describes the collapse of entire political systems.

👑 Throne means a kingdom's full authority

💥 God removes that authority himself

🏛️ This reaches whole political systems

📖 It is bigger than one battle

## ⚔️ Every One By The Sword Of His Brother

This describes armies destroying each other from the inside.

It is not a foreign invader defeating these kingdoms from outside.

Confusion and internal collapse do the damage instead.

History shows many empires fell exactly this way.

⚔️ Armies turn on each other here

🚫 No outside invader causes this fall

🌀 Internal chaos does the damage

📖 Empires often fell exactly this way

## 🤝 I Take Thee, O Zerubbabel, My Servant

"My servant" was a title also given to King David and to Moses.

It marks Zerubbabel as someone personally chosen for God's purposes.

This is a remarkable promise for a governor living under Persian rule.

He answers to Persia on paper, but God claims him first.

🤝 My servant also described David and Moses

👑 Zerubbabel is personally chosen here

🏛️ He served under Persian rule

📖 God claims him above that rule

## 💍 Will Make Thee As A Signet

A signet was a ring or seal that carried a king's personal authority.

Pressing it into wax or clay made a document official and binding.

Years earlier, Jeremiah said God would pull a signet ring off Zerubbabel's own grandfather.

That earlier king lost his throne and his authority completely.

Here, God restores that exact picture through his grandson instead.

💍 A signet marked royal, binding authority

📜 Jeremiah said God removed that ring before

👴 That removed king was Zerubbabel's own grandfather

📖 God restores the signet through his grandson

## 🎯 For I Have Chosen Thee

This final line closes the entire book of Haggai on a personal note.

The chapter opened with discouraged people comparing their work to the past.

It ends with God personally choosing one specific descendant for the future.

Zerubbabel later appears in the family line leading toward the Messiah.

A small, discouraged building project ends up connected to a far larger promise.

🎯 This closes the whole book personally

😔 It began with discouraged comparison

👑 It ends with one man being chosen

📖 This connects forward to the Messiah
`.trim();

export const HAGGAI_TWO_PERSONAL_SECTIONS = parseHaggaiTwoRawNotes(HAGGAI_TWO_RAW_NOTES);
