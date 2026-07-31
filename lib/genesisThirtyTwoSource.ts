export type GenesisThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyTwoRawNotes(rawText: string): GenesisThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 32:${startVerse}` : `Genesis 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Genesis 32 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_TWO_RAW_NOTES = `# Genesis 32:1-2
# 😇 Two Camps At Mahanaim
---
## 😇 The Angels Of God Met Him

This is not a private feeling or a dream.

Angels here means a company of heavenly messengers, visible enough for Jacob to see them himself.

Jacob is heading home toward the brother he wronged years earlier.

God sends this sight at the exact moment fear could have taken over.

Before anything else happens on this journey, Jacob is reminded he is not walking it alone.

😇 Angels means visible heavenly messengers

🚶 Jacob is heading toward Esau

😨 Fear could easily take over here

📖 God shows up before the fear does

## 🏕️ Mahanaim

Mahanaim means two camps or two companies.

Jacob names the place after what he just saw, God's camp meeting his own camp.

The name captures something Jacob will need to remember for the rest of this chapter.

He is never facing Esau with only his own strength.

🏕️ Mahanaim means two camps

👀 Named for what Jacob just saw

🤝 God's camp joins Jacob's camp

📖 Jacob never faces Esau alone

# Genesis 32:3-5
# ✉️ Messengers To Esau
---
## 🗺️ Unto The Land Of Seir, The Country Of Edom

Seir and Edom both point to the same place, the region south and east of the Dead Sea.

This was the land Esau had settled in after Genesis chapter thirty six.

Sending messengers there means Jacob already knows exactly where to find his brother.

Old distance has not erased the need to make things right with him.

🗺️ Seir and Edom name Esau's region

🧭 Esau settled there after Genesis

✉️ Jacob knows where to send word

📖 Old distance does not erase old debts

## 🙇 Thy Servant Jacob Saith Thus

Jacob tells his messengers to call him thy servant and Esau my lord.

This is not just polite language.

Jacob is the one who took Esau's blessing and birthright years earlier.

Calling himself a servant now is a deliberate move to lower himself before his brother.

🙇 Servant and lord are deliberate titles

😳 Jacob once took Esau's blessing

🕊️ He lowers himself here on purpose

📖 Humility opens this whole approach

## 🏕️ I Have Sojourned With Laban

To sojourn means to live somewhere for a while without truly belonging there.

Jacob spent twenty years working for Laban, but Padanaram was never meant to be his home.

He wants Esau to hear that all those years away, Jacob never stopped intending to come back.

🏕️ Sojourn means a temporary stay

📆 Twenty years spent away from home

🧭 Jacob always intended to return

📖 A temporary stay was never the goal

## 🙏 That I May Find Grace In Thy Sight

Finding grace in someone's sight is an old way of asking for their favor and good will.

Jacob is not demanding anything from Esau.

He is asking, almost pleading, for a welcome he knows he does not automatically deserve.

The words are careful and humble because the relationship they are aimed at is still fragile.

🙏 Grace in thy sight means favor

🎁 Jacob is asking, not demanding

😟 The old relationship is still fragile

📖 Careful words match a careful hope

# Genesis 32:6-8
# 😨 Jacob's Fear
---
## 🪖 Four Hundred Men With Him

Four hundred men was not a small welcoming party in the ancient world.

That number was closer to the size of an armed raiding force.

Jacob has no way of knowing yet whether Esau is coming to forgive him or to attack him.

The silence about Esau's plans is exactly what makes this report so frightening.

🪖 Four hundred men suggests an army

❓ Esau's intentions are not stated

😰 The silence makes it more frightening

📖 Uncertainty can be its own fear

## 😰 Greatly Afraid And Distressed

These are two different feelings stacked on top of each other.

Afraid describes the fear of a real physical threat coming toward him.

Distressed describes the tight, trapped feeling of having no good way out.

Jacob feels both the danger itself and the pressure of having nowhere left to run.

😨 Afraid means fear of real danger

😣 Distressed means feeling trapped

🚧 Both feelings hit Jacob together

📖 Fear and pressure often arrive as a pair

## ✌️ Divided The People Into Two Bands

Jacob splits his household, servants, and animals into two separate groups.

If Esau's men attack the first group, the second group still has a chance to escape.

This is not panic.

It is a calculated plan built to protect as many people as possible.

✌️ Jacob splits everyone into two groups

🛡️ One group protects the other

🧠 This is planning, not panic

📖 Wisdom still worked while Jacob prayed

## ⚔️ Smite It

To smite means to strike or attack with force, often with real violence.

Jacob pictures the worst case openly instead of pretending it could not happen.

Facing that possibility directly is part of how he prepares both his plan and his prayer.

⚔️ Smite means a violent attack

😬 Jacob names the worst case plainly

🧠 Honest fear shaped his planning

➡️ Preparing and praying can happen together

# Genesis 32:9-12
# 🙏 Jacob's Prayer
---
## 🙏 O God Of My Father Abraham, And God Of My Father Isaac

Jacob does not pray to a stranger here.

He calls on the specific God his father and grandfather already knew personally.

This prayer is built on inherited faith, not a new idea he came up with alone.

Naming the family history is Jacob's way of standing on promises older than his own fear.

🙏 Jacob names his family's God

👴 Abraham and Isaac already knew Him

📜 This faith was inherited, not new

📖 Old promises can steady new fear

## 🙇 I Am Not Worthy Of The Least Of All The Mercies

Jacob openly admits he does not deserve any of the good things God has given him.

This is a striking change from the young man who once schemed for every advantage he could get.

Real fear has a way of stripping away pride.

🙇 Jacob admits he deserves nothing

🔄 This is a changed Jacob speaking

😨 Fear stripped away his old pride

📖 Humility replaces the old scheming

## 🚶 With My Staff I Passed Over This Jordan

A staff was simply a walking stick, the only real possession a poor traveler carried.

Jacob is remembering that he crossed this same river once before with nothing but that staff.

Now he returns with two large camps of family, servants, and animals.

He is naming the size of God's blessing out loud before he even asks for help.

🚶 A staff was a simple walking stick

🪫 Jacob once crossed with nothing else

📈 He now returns with two camps

📖 Naming the blessing comes before the request

## 👪 The Mother With The Children

This old phrase describes a complete, merciless destruction of an entire family.

Jacob is not vaguely afraid of Esau.

He is afraid of a specific, total kind of violence against everyone he loves.

Naming the fear this clearly is part of how he brings it honestly to God.

👪 The phrase means total destruction

😨 Jacob fears a specific horror

🗣️ He names the fear plainly

📖 Honest prayer does not hide the fear

## 🏖️ Make Thy Seed As The Sand Of The Sea

Jacob is quoting God's own promise back to Him, almost word for word.

That promise, first given to Abraham, said Jacob's descendants would be too many to count.

Reminding God of His own words is not disrespect.

It is the boldest form of trust Jacob has left.

🏖️ Sand of the sea means uncountable

📜 This promise traces back to Abraham

🗣️ Jacob quotes God's own words

📖 Bold trust can sound like reminding God

# Genesis 32:13-16
# 🐐 The Present For Esau
---
## 🌙 He Lodged There That Same Night

Jacob does not rush ahead toward Esau.

He stops and spends the night preparing carefully instead of acting on impulse.

That pause gives him time to gather the animals and plan exactly how the gift will be sent.

Careful preparation, not panic, fills these quiet hours before the real meeting.

🌙 Jacob stops to prepare, not rush

🐑 The pause allows time to gather animals

🧠 Planning replaces panic here

➡️ Quiet preparation precedes the real moment

## 🎁 A Present For Esau His Brother

A present here is not a birthday gift.

It works more like a formal peace offering.

Sending a gift ahead of a meeting could calm an angry party in the ancient world.

Jacob does everything in his power before he ever meets Esau face to face.

🎁 A present here means a peace offering

🕊️ Gifts often calmed anger in advance

🧠 Jacob prepares before he meets Esau

📖 Preparation and prayer worked side by side

## 🐐 Two Hundred She Goats, And Twenty He Goats

The list of animals in these verses adds up to more than five hundred animals total.

That kind of wealth in livestock made a family enormously rich in this culture.

Jacob is not sending a token gift.

He is sending a fortune ahead of himself to soften Esau's anger.

🐐 The gift totals over five hundred animals

💰 Livestock like this meant real wealth

🎯 This was not a token gift

📖 Jacob sent a fortune, not a trinket

## 🚶 Put A Space Betwixt Drove And Drove

A drove means a herd of animals traveling as one group.

Jacob sends his gift in several separate waves instead of one single herd.

Betwixt is an old word that simply means between.

Each wave lets Esau feel the size of the gift building up slowly, one group at a time.

🚶 Drove means a traveling herd

🔀 Jacob sent separate waves, not one herd

📖 Betwixt is an old word for between

➡️ Slow waves built up the impression on purpose

# Genesis 32:17-21
# 🗣️ Instructions For The Servants
---
## ❓ Whose Art Thou? And Whither Goest Thou?

This old style of speaking simply asks two plain questions.

Whose art thou means who do you belong to.

Whither goest thou means where are you going.

Jacob expects Esau's men to stop his servants and ask exactly this.

❓ Whose art thou means who owns you

🧭 Whither goest thou means where are you going

🗣️ Jacob predicts these exact questions

📖 He prepares every servant's answer in advance

## 🙇 It Is A Present Sent Unto My Lord Esau

Jacob scripts the exact words each servant should say.

Esau is called lord again, and Jacob is called servant again.

Repeating these titles across three separate groups was not an accident.

Jacob wants the same humble message to reach Esau again and again before they ever meet.

🙇 The same titles repeat on purpose

🔁 Three groups deliver the same message

🕊️ Humility gets repeated, not said once

📖 Repetition made the message impossible to miss

## 😌 I Will Appease Him With The Present

To appease means to calm someone's anger by giving them something they want.

Jacob says this quietly to himself, not to his servants.

He is being completely honest about his own strategy here.

The gift is not really about generosity, it is about survival.

😌 Appease means to calm someone's anger

🤫 Jacob admits this plan to himself

🎯 The gift's real goal is survival

📖 Honest strategy can still be wise

## 🤞 Peradventure He Will Accept Of Me

Peradventure is an old word that simply means perhaps or maybe.

Even after all this careful planning, Jacob still cannot be certain how Esau will respond.

The uncertainty in this one small word carries the weight of the whole chapter.

🤞 Peradventure means perhaps or maybe

😟 Jacob still cannot be certain

⚖️ One word carries the chapter's tension

➡️ Careful plans still leave room for fear

# Genesis 32:22-24
# 🌊 Alone At The Jabbok
---
## 👪 His Two Wives, And His Two Womenservants, And His Eleven Sons

This list only mentions eleven sons, not the twelve tribes readers might expect.

Benjamin, Jacob's youngest son, is not born yet at this point in the story.

Every other member of Jacob's growing family crosses the river together in this verse.

👪 Only eleven sons are listed here

👶 Benjamin has not been born yet

🌊 The whole family crosses together

📖 The full twelve tribes are still ahead

## 🌊 The Ford Jabbok

A ford means a shallow place in a river where people and animals can cross on foot.

The Jabbok was a real river that fed into the Jordan, marking the edge of Esau's territory.

Crossing it meant Jacob was about to enter land close to his brother's home.

🌊 A ford means a shallow crossing point

🗺️ The Jabbok fed into the Jordan

🧭 Crossing it meant nearing Esau's land

➡️ Every step now brought him closer

## 🌙 Jacob Was Left Alone

Jacob sends his whole family and every animal across the river ahead of him.

For the first time in this entire chapter, no one else is with him.

This quiet, solitary moment sets up the most important event of Jacob's life.

🌙 Jacob sends everyone else across first

😶 He is finally completely alone

🎯 This moment sets up what comes next

➡️ Solitude preceded the turning point

## 🤼 There Wrestled A Man With Him Until The Breaking Of The Day

The text simply calls this figure a man at first, with no more detail than that.

Later in the chapter, this same man is revealed to be far more than human.

The match lasts the entire night, from darkness until the sky begins to lighten.

🤼 The man's identity stays hidden at first

🌌 Later verses reveal who this really was

⏳ The struggle lasted all night long

📖 Mystery builds before the meaning is revealed

# Genesis 32:25-29
# 🤼 The Wrestling And The New Name
---
## 🦴 Touched The Hollow Of His Thigh

A single touch here does more damage than an entire night of wrestling could.

That detail reveals that Jacob was never actually fighting a man his own size and strength.

Whoever this is could have ended the match at any moment he chose.

🦴 One touch caused the real injury

💪 This was never an equal match

😳 The wrestler held back his full power

📖 Restraint here reveals who was really stronger

## 🌅 Let Me Go, For The Day Breaketh

The wrestler wants to leave before daylight fully arrives.

Jacob, despite being injured, refuses to release his grip.

Something in Jacob recognizes this is no ordinary opponent worth holding onto this tightly.

🌅 The wrestler wants to leave at dawn

🤕 Jacob is injured but keeps holding on

👀 Jacob senses this is no ordinary man

➡️ He holds on despite real pain

## 🙏 Except Thou Bless Me

Jacob refuses to let go until he receives a blessing.

This is the same word used for the blessing Jacob once took from Esau by deception.

This time Jacob asks for it directly and honestly instead of scheming for it.

🙏 Jacob demands a blessing, not an escape

🔁 The same word as Esau's stolen blessing

✅ This time he asks honestly

📖 Honest asking replaces old scheming

## 🏷️ Thy Name Shall Be Called No More Jacob, But Israel

Jacob's name means one who grabs the heel, or more broadly one who deceives.

Israel means one who struggles with God, or a prince who has power with God.

Changing his name marks a real change in who Jacob has become.

The trickster who once grabbed and schemed his way to blessing is being renamed.

🏷️ Jacob's name means one who deceives

👑 Israel means a prince with God

🔄 The new name marks a real change

📖 Israel replaces the identity of a trickster

## ❓ Wherefore Is It That Thou Dost Ask After My Name?

The wrestler refuses to answer Jacob's question about his own identity.

In this culture, knowing someone's true name could mean having power over them in some sense.

The refusal itself is actually an answer, since only God could get away with withholding it here.

❓ The wrestler will not give his name

🔒 Names could carry a sense of power

👑 Only God could refuse this safely

📖 The silence reveals who he really is

# Genesis 32:30-32
# 🌅 Peniel And The Limp
---
## 🌄 Peniel: For I Have Seen God Face To Face

Peniel means the face of God.

Jacob names the place after the encounter he just survived.

Many people in the ancient world believed that seeing God directly would bring certain death.

Jacob is stunned that he is still alive after such a direct encounter.

🌄 Peniel means the face of God

😳 Jacob names the place after this event

⚰️ Seeing God was thought to bring death

📖 Survival itself becomes part of the story

## 😮 My Life Is Preserved

This phrase confirms exactly what Jacob feared, that meeting God this closely could have killed him.

Instead, he walks away wounded but alive, carrying a blessing and a new name.

The encounter cost him something physical, but it did not cost him his life.

😮 Jacob expected this could be fatal

🦵 He survives with a real injury

🎁 He leaves with a blessing instead

📖 Survival and blessing arrived together

## 🦵 He Halted Upon His Thigh

To halt here means to limp, not to stop moving completely.

Jacob walks with a permanent reminder of this night for the rest of his life.

The same body that once ran from Esau in fear now walks toward him wounded but changed.

🦵 Halted means limped, not stopped

📆 This limp lasts the rest of his life

🔄 The same man now walks differently

➡️ A visible reminder of an invisible change

## 🍖 The Children Of Israel Eat Not Of The Sinew Which Shrank

A sinew is a tendon, the tough tissue connecting muscle to bone.

This dietary custom began with this exact injury and continued for generations afterward.

Every time a later Israelite avoided that part of an animal, this story was quietly remembered.

🍖 Sinew means a tendon

📜 This custom began with Jacob's injury

🔁 It continued for generations after him

📖 A small habit preserved a big story
`.trim();

export const GENESIS_THIRTY_TWO_PERSONAL_SECTIONS = parseGenesisThirtyTwoRawNotes(GENESIS_THIRTY_TWO_RAW_NOTES);
