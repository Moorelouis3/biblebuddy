export type MatthewTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwoRawNotes(rawText: string): MatthewTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 2:${startVerse}` : `Matthew 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Matthew 2 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWO_RAW_NOTES = `# Matthew 2:1-2
# 🌟 Wise Men Seek The Newborn King
---
## 🏘️ Born In Bethlehem Of Judaea In The Days Of Herod The King

Bethlehem was a small town a few miles south of Jerusalem.

It was already famous as the birthplace of King David, centuries earlier.

Herod the king refers to Herod the Great, a ruler placed over Judea by Rome.

He was not a descendant of David and never had the people's trust.

Matthew opens his story of Jesus inside real, datable history.

🏘️ Bethlehem sits just south of Jerusalem

👑 David was born there centuries earlier

🏛️ Herod the Great ruled under Rome

📖 Jesus enters real, dated history

## 🌌 There Came Wise Men From The East

These visitors are often called Magi, a word for scholars who studied the stars.

They likely traveled from Persia or Babylon, lands with a long history of astrology.

They were not kings themselves and the Bible never says there were three of them.

That popular number comes only from the three gifts named later in the chapter.

The journey from the east would have taken many weeks across open desert.

🌌 Magi were scholars who studied stars

🗺️ They likely came from Persia or Babylon

🔢 The Bible never says there were three

📖 Three comes only from the three gifts

## ✨ We Have Seen His Star In The East

Ancient astrologers believed unusual events in the sky announced events on earth.

A new or unusual star was often read as a sign that a great ruler had been born.

The wise men connected this star directly to a newborn king of the Jews.

That is a bold claim for foreigners to make about Israel's own promised king.

Their question in Jerusalem sets Herod's whole reaction in the next verses in motion.

✨ Unusual stars signaled major events

👑 They linked it to a newborn king

🌍 Foreigners recognized Israel's promised king first

📖 Their question sets the chapter in motion

# Matthew 2:3-6
# 😨 Herod's Court Reacts
---
## 😨 He Was Troubled, And All Jerusalem With Him

Herod reacted to a baby's birth as though his own throne was under direct attack.

He had already executed members of his own family out of fear of rivals.

"All Jerusalem" means much of the city shared his anxiety, not his grief.

People living under a violent ruler learn to fear whatever frightens that ruler.

A rumor of a new king threatened the whole fragile peace of the city.

😨 Herod feared losing his throne

⚔️ He had already killed family rivals

🏙️ All Jerusalem shared his anxiety

📖 A rumor threatened the city's peace

## 📜 All The Chief Priests And Scribes Of The People

Chief priests oversaw temple worship and carried real religious authority in Judea.

Scribes were trained experts who copied, studied, and interpreted the Hebrew scriptures.

Herod called both groups together because he needed their knowledge, not their loyalty.

These were the people who would know exactly what the prophets had written.

Herod used their scripture knowledge for his own political purposes.

📜 Chief priests led temple worship

✍️ Scribes studied and copied scripture

🏛️ Herod needed their knowledge only

📖 He used scripture for his own plans

## 📍 Not The Least Among The Princes Of Juda

This line quotes the prophet Micah, written centuries before Jesus was born.

Bethlehem was small and easy to overlook next to a city like Jerusalem.

Micah's prophecy said the opposite, that this small town carried real importance.

Juda here refers to the tribe and region of Judah, not a single person.

A tiny town was always the planned birthplace of Israel's promised ruler.

📍 This quotes the prophet Micah

🏘️ Bethlehem seemed small and unimportant

👑 Micah said the opposite was true

📖 God planned the small town on purpose

## 👑 Out Of Thee Shall Come A Governor, That Shall Rule My People Israel

"Governor" here does not mean a modern political office.

It describes a ruler who leads and shepherds his people.

This prophecy promised a king who would come from Bethlehem itself.

The chief priests could quote this prophecy perfectly and still miss its fulfillment.

Knowing scripture is not the same as recognizing it standing in front of you.

👑 Governor means a ruling shepherd

📍 The ruler comes from Bethlehem

📚 Priests quoted this prophecy perfectly

📖 They quoted Him and still missed Him

# Matthew 2:7-8
# 🤫 Herod's Secret Plan
---
## 🤫 Privily Called The Wise Men

"Privily" is an old word meaning secretly, away from public notice.

Herod did not want the chief priests or the public to know about this meeting.

A private meeting let him gather information without revealing his true plan.

Everything about this scene is quiet and hidden, unlike his public court appearances.

Secrecy here is the first sign of the violence still to come.

🤫 Privily means secretly

🚪 Herod hid this meeting from others

🕵️ He gathered information quietly

📖 Secrecy hints at violence ahead

## 🔍 Enquired Of Them Diligently What Time The Star Appeared

Herod wanted an exact timeline, not a vague answer.

Knowing when the star first appeared told him about how old this child was.

That detail becomes important later, when Herod sets an age limit for his violence.

A seemingly small question here has a brutal purpose hiding behind it.

🔍 Herod wanted an exact timeline

⏳ The star's timing revealed the child's age

⚠️ This detail returns later in the chapter

📖 A small question hid a brutal purpose

## 🎭 That I May Come And Worship Him Also

Herod's words sound respectful on the surface.

He claims he only wants to worship this newborn king himself.

Every reader already knows this is a lie, since Herod plans murder instead.

Matthew lets Herod's own words expose him before the story even continues.

🎭 Herod's words sound respectful

🤥 His real plan was murder

🗣️ His own words expose him

📖 Matthew lets his lie speak for itself

# Matthew 2:9-12
# ✨ Found At Last
---
## 🌠 Went Before Them, Till It Came And Stood Over Where The Young Child Was

The star did not just hang in the sky like a normal star.

It moved ahead of the wise men like a guide leading the way.

Then it stopped directly over the specific house where the child was staying.

No natural star behaves like this, moving and stopping on command.

Matthew describes something far more precise than ordinary stargazing.

🌠 The star moved like a guide

🏠 It stopped over one specific house

🚫 No normal star behaves this way

📖 This guidance was far from ordinary

## 😊 They Rejoiced With Exceeding Great Joy

"Exceeding" is an old way of saying extreme or overwhelming.

This was not a mild or polite happiness.

A long journey across the desert had finally reached its goal.

Their search for a newborn king ended exactly where the star led them.

😊 Exceeding means extreme or overwhelming

🧳 Their long journey had finally ended

🎯 The search reached its exact goal

📖 Their joy matched the weight of the moment

## 🙇 Fell Down, And Worshipped Him

Falling down was a physical act of complete submission in this culture.

It was the posture used before kings, not ordinary greetings between equals.

These travelers were not Israelites, yet they recognized who this child truly was.

Their worship here stands in sharp contrast to Herod's hidden plan to kill him.

🙇 Falling down showed total submission

👑 This posture was reserved for kings

🌍 Foreigners recognized Him before many Israelites did

📖 Their worship contrasts Herod's hidden plan

## 🎁 Gold, And Frankincense, And Myrrh

Each gift carried its own meaning beyond simple wealth.

Gold was a gift fit for a king, a sign of royalty.

Frankincense was burned in worship, marking Jesus as someone to be worshipped as God.

Myrrh was used in burial customs, an early hint of the death still ahead of him.

Three gifts together point to who Jesus is, what He is owed, and what He would suffer.

🎁 Each gift carried its own meaning

👑 Gold pointed to His kingship

🙏 Frankincense pointed to His worship

📖 Myrrh hinted at His coming death

## 🧭 Departed Into Their Own Country Another Way

God warned the wise men in a dream not to report back to Herod.

They obeyed immediately and changed their entire route home.

This small act of obedience protected the child's life without anyone realizing it yet.

God was already working to protect Jesus before Herod's plan even became visible.

🧭 God warned them in a dream

🔄 They changed their whole route home

🛡️ Their obedience protected the child

📖 God was already working unseen

# Matthew 2:13-15
# 🏃 Flee Into Egypt
---
## 😇 The Angel Of The Lord Appeareth To Joseph In A Dream

This is the second time an angel speaks to Joseph through a dream in this Gospel.

God continues to guide Joseph through dreams rather than public visions.

Joseph never argues or asks questions in these moments, he simply obeys.

This quiet, repeated obedience becomes one of the main marks of his character.

😇 This is Joseph's second angelic dream

🔁 God guides him through dreams again

🤐 Joseph never argues, he just obeys

📖 Obedience defines Joseph's character here

## 🏃 Flee Into Egypt, And Be Thou There Until I Bring Thee Word

Egypt was the nearest safe territory outside of Herod's direct control.

Jewish communities already lived there, so the family would not be entirely alone.

Centuries earlier, Israel's own ancestors had fled to Egypt during famine as well.

This flight echoes that older pattern of Egypt as a place of refuge.

🏃 Egypt sat outside Herod's control

🕍 Jewish communities already lived there

🔁 Israel's ancestors once fled there too

📖 Egypt becomes a place of refuge again

## 🌙 He Took The Young Child And His Mother By Night

Traveling by night offered cover and secrecy for a dangerous journey.

Joseph did not wait until morning or delay to make preparations.

He acted the moment the warning came, without hesitation.

Mary and the child's safety depended on Joseph's quick, quiet response.

🌙 Night travel offered cover and secrecy

⏱️ Joseph did not delay at all

🏇 He acted the moment he was warned

📖 Quick obedience kept them safe

## 📜 Out Of Egypt Have I Called My Son

This line quotes the prophet Hosea, written centuries earlier.

Hosea originally used it to describe Israel's exodus out of Egypt long ago.

Matthew applies the same words to Jesus, calling Him God's greater Son.

Jesus relives Israel's own story, this time doing it faithfully where Israel failed.

📜 This quotes the prophet Hosea

🇪🇬 It first described Israel's exodus

✝️ Matthew applies it to Jesus

📖 Jesus relives Israel's story faithfully

# Matthew 2:16-18
# 😢 Herod's Rage, Rachel's Grief
---
## 😠 He Saw That He Was Mocked Of The Wise Men

Herod expected the wise men to report back to him as promised.

When they never returned, Herod realized they had deliberately avoided him.

Being outwitted by foreign strangers wounded his pride as much as his plan.

His fury grows out of both failure and humiliation together.

😠 Herod expected a report back

🚫 The wise men never returned

💔 Being outwitted wounded his pride

📖 Fury grew from failure and shame

## 🔥 Was Exceeding Wroth

"Wroth" is an old word for intense anger, close to rage.

This was not a brief flash of irritation.

Herod's anger here drives him straight into violence against innocent children.

History outside the Bible also records Herod as a ruler capable of extreme cruelty.

🔥 Wroth means intense anger

⚡ This was not brief irritation

⚔️ His anger led straight to violence

📖 History confirms Herod's extreme cruelty

## 👶 From Two Years Old And Under, According To The Time

Herod used the timing the wise men gave him earlier in the chapter.

He set the age limit wide enough to be sure he did not miss the child.

This detail suggests Jesus may have already been a toddler, not a newborn infant.

By this point, the family was likely living in a house, not a stable.

👶 Herod used the star's timing

📏 He set a wide age limit

🏠 The family likely lived in a house

📖 This was no longer a newborn scene

## 😭 In Rama Was There A Voice Heard, Lamentation, And Weeping

Rama was a town near Bethlehem, tied to Israel's own history of loss.

This line quotes the prophet Jeremiah, written about an earlier national tragedy.

Jeremiah first used it to describe Israel's grief during the Babylonian exile.

Matthew reaches back to that old grief to describe this new one.

😭 Rama was tied to old loss

📜 This quotes the prophet Jeremiah

⛓️ It first described exile grief

📖 Matthew connects old grief to new

## 💔 Rachel Weeping For Her Children, And Would Not Be Comforted, Because They Are Not

Rachel was one of Israel's original matriarchs, the mother of Joseph and Benjamin.

Jewish tradition remembered her as buried near Bethlehem itself.

Jeremiah pictured her weeping over her descendants' suffering, generations after her own death.

"They are not" is an old, gentle way of saying someone has died.

Matthew uses her grief to voice the horror of this moment without describing it directly.

💔 Rachel was Israel's grieving matriarch

⚰️ She was remembered as buried nearby

👶 Her children here means her descendants

📖 Her grief voices this horror for us

# Matthew 2:19-23
# 🏡 Home To Nazareth
---
## 💀 But When Herod Was Dead

Herod the Great died around 4 BC, a few years after Jesus was born.

His death finally removed the direct threat to the child's life.

God's timing moved the family safely through the most dangerous years of Herod's rule.

The threat ends, but the chapter is not finished yet.

💀 Herod died around 4 BC

🛡️ His death removed the threat

⏳ God's timing protected the family

📖 One danger ends, another begins

## 🕊️ They Are Dead Which Sought The Young Child's Life

This phrase confirms that Herod's death ends that specific danger.

The angel speaks to Joseph again, exactly as before, through a dream.

God continues the same quiet pattern of guidance he used throughout this chapter.

Joseph is told plainly that it is now safe to return.

🕊️ Herod's danger has fully ended

😇 The angel speaks to Joseph again

🔁 God repeats His pattern of guidance

📖 It is finally safe to return

## 👑 Archelaus Did Reign In Judaea In The Room Of His Father Herod

"In the room of" is an old phrase meaning in the place of someone.

Archelaus was one of Herod's sons, left ruling over Judea after his father's death.

Historical records describe him as harsh and violent, much like his father.

Rome eventually removed him from power a few years later for his cruelty.

👑 This phrase means in place of

⚔️ Archelaus was Herod's harsh son

📜 History records his violent reputation

📖 Rome later removed him for cruelty

## 🧭 He Turned Aside Into The Parts Of Galilee

Archelaus ruled only over Judea, the region including Jerusalem and Bethlehem.

Galilee was a separate region, ruled instead by Herod's other son, Herod Antipas.

Joseph's fear of Archelaus led him to choose the safer region on purpose.

God used Joseph's own caution to move the family exactly where he wanted them.

🧭 Archelaus ruled only Judea

🏞️ Galilee had a different, calmer ruler

😟 Joseph's fear shaped his choice

📖 God used caution to guide them

## 🏡 A City Called Nazareth

Nazareth was a small, easily overlooked village in the region of Galilee.

It had no special reputation and was not mentioned anywhere in the Old Testament.

Later in the Gospels, one man even asks if anything good can come from there.

Jesus grows up in a place the world considered unimportant.

🏡 Nazareth was small and overlooked

📍 It sits in the region of Galilee

❓ People doubted anything good came from there

📖 Jesus grew up seen as unimportant

## 🏷️ He Shall Be Called A Nazarene

This exact sentence does not appear word for word anywhere in the Old Testament.

Matthew likely points to a broader prophetic theme instead of one single verse.

Prophets like Isaiah described the coming king as a branch, a word close to Nazareth in Hebrew.

Other prophets described him as someone despised and looked down upon by others.

Growing up in a town with a poor reputation fit that pattern exactly.

📖 No single verse says this exactly

🌿 Branch in Hebrew sounds like Nazareth

💔 Prophets described Him as despised

➡️ Jesus fulfilled that lowly pattern
`.trim();

export const MATTHEW_TWO_PERSONAL_SECTIONS = parseMatthewTwoRawNotes(MATTHEW_TWO_RAW_NOTES);
