export type EzekielThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThreeRawNotes(rawText: string): EzekielThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 3:${startVerse}` : `Ezekiel 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Ezekiel 3 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THREE_RAW_NOTES = `# Ezekiel 3:1-3
# 📜 Eat This Roll
---
## 🍽️ Eat This Roll, And Go Speak

God gives Ezekiel one command with two steps in order.

Eat first, then speak.

A messenger cannot skip straight to speaking.

He has to take the message in before he gives it out.

This same roll was the scroll God showed Ezekiel back in chapter two.

🍽️ Eating comes before speaking

📜 This roll is the chapter two scroll

🔁 Receiving always comes before relaying

📖 A messenger absorbs the word first

## 💨 He Caused Me To Eat That Roll

Ezekiel does not grab the roll and eat on his own.

God causes him to eat it instead.

Jonah ran from a similar calling in his own book.

Ezekiel shows no resistance here at all.

Obedience started the moment God acted, not the moment Ezekiel decided to comply.

🙅 Ezekiel did not eat on his own

💨 God caused the eating himself

🐳 Jonah resisted a similar calling

📖 Obedience began the moment God acted

## 🫙 Fill Thy Bowels With This Roll

Bowels in this verse means the whole inward self, not only the stomach.

God tells Ezekiel to let the message fill every inward part of him.

A quick taste on the tongue was never going to be enough.

The word had to reach all the way down and stay there.

A prophet speaks from what has filled him, not from what he glanced at.

🫙 Bowels means the whole inward self

🌊 The message had to fill him completely

🚫 A quick taste was not enough

📖 A prophet speaks from what fills him

## 🍯 In My Mouth As Honey For Sweetness

This scroll was written full of lamentations, mourning, and woe.

A message like that should taste bitter, not sweet.

Instead it tastes like honey the moment Ezekiel actually receives it.

Psalm one nineteen describes God's own words the same sweet way.

Obeying a hard calling can still carry real sweetness inside it.

😢 The scroll was full of woe

🍯 It tasted like honey instead

📜 Psalm one nineteen says the same

📖 A hard calling can still taste sweet

# Ezekiel 3:4-7
# 🗣️ Go, Get Thee Unto The House Of Israel
---
## 🗣️ Speak With My Words Unto Them

Ezekiel is not sent to invent his own message.

God hands him the exact words to speak.

The house of Israel here means Ezekiel's own people, the exiled nation.

His job is delivery, not authorship.

🗣️ God supplies the exact words

👥 House of Israel means his own people

📦 Ezekiel delivers, he does not author

📖 The message is never his own invention

## 🌍 Not Sent To A People Of A Strange Speech

Strange speech and hard language describe a truly foreign nation.

God is saying Ezekiel was not sent somewhere like that.

He is sent to people who already speak his own language.

Distance is not the obstacle Ezekiel is about to face.

🌍 Strange speech means a foreign nation

🙅 Ezekiel was not sent there

🗣️ His own people share his language

📖 Distance is not the real obstacle

## 😮 They Would Have Hearkened Unto Thee

God says plainly that foreigners would have actually listened.

A truly foreign audience was the easier assignment, not the harder one.

Ezekiel's own people turn out to be the harder audience.

Familiarity does not guarantee a welcome.

🌍 Foreigners would have listened instead

😮 The easier audience was not his

👥 His own people proved harder to reach

📖 Familiarity does not guarantee welcome

## 🙅 They Will Not Hearken Unto Thee, For They Will Not Hearken Unto Me

Rejecting Ezekiel is the same as rejecting God.

The house of Israel already has a long history of refusing God directly.

Ezekiel is not being singled out for personal failure here.

He is stepping into a pattern that started long before him.

🙅 Rejecting Ezekiel means rejecting God

📜 Israel has refused God before

🔁 Ezekiel steps into an old pattern

📖 The rejection was never really personal

# Ezekiel 3:8-9
# 🪨 Thy Forehead Strong As An Adamant
---
## 🪨 Thy Face Strong Against Their Faces

God matches toughness with toughness here.

Ezekiel's face is hardened to meet the same hardness in his audience.

This is not cruelty being handed to Ezekiel.

It is the resilience he will need to keep standing in front of them.

🪨 God matches toughness with toughness

🧍 Ezekiel is hardened to stand firm

❤️ This is resilience, not cruelty

📖 He needed strength just to keep standing

## 💎 As An Adamant Harder Than Flint

Flint was already one of the hardest stones people used for tools.

An adamant means something even harder than that, likely an early word for diamond.

God does not give Ezekiel an ordinary toughness.

He gives him a toughness beyond the hardest material people already knew.

🔨 Flint was already a hard stone

💎 Adamant means something harder still

🪨 God gives beyond ordinary toughness

📖 Ezekiel gets more strength than he needs

## 😨 Fear Them Not, Neither Be Dismayed

Fear and dismay are named here as real possibilities, not imagined ones.

God does not pretend this assignment will feel easy.

Their looks means the hostile expressions Ezekiel will face often.

Courage is commanded because real pressure is coming.

😨 Fear here was a real risk

🙅 God never pretends this is easy

😠 Their looks means hostile expressions

📖 Courage is commanded before pressure arrives

# Ezekiel 3:10-11
# 👂 Receive In Thine Heart
---
## ❤️ Receive In Thine Heart, And Hear With Thine Ears

God names two separate steps here, not just one.

Receiving in the heart means letting the message take hold inwardly first.

Hearing with the ears comes only after that inward reception.

A message that only reaches the ears can pass right through a person.

❤️ Receiving in the heart comes first

👂 Hearing with the ears comes second

🚫 Ears alone let a message pass through

📖 The heart has to hold it first

## 👥 Unto The Children Of Thy People

Children of thy people means the exiled nation around Ezekiel in Babylon.

These are not strangers in a foreign land to him.

They are his own relatives, neighbors, and countrymen in exile.

God sends him to the people closest to him, not the farthest away.

👥 Children of thy people means his own nation

🏘️ They are his neighbors in exile

🙅 Not strangers in a foreign land

📖 God sent him to those closest to him

# Ezekiel 3:12-15
# 🌬️ Taken Away In Bitterness
---
## 🙏 Blessed Be The Glory Of The LORD From His Place

Ezekiel hears this line as a voice, not a vision this time.

The creatures and wheels from chapter one are no longer in view.

Only the sound behind him remains.

Even without seeing the throne again, the glory of the LORD is still worth blessing.

👂 This time Ezekiel only hears a voice

👁️ The chapter one vision has faded

🙏 The glory is blessed even unseen

📖 Worship does not require seeing everything

## ⚙️ The Noise Of The Wheels, And A Great Rushing

Ezekiel recognizes these sounds from the vision in chapter one.

Wings touching wing to wing, and wheels moving beneath them.

He does not need to see the creatures again to know they are there.

The sound alone carries the full weight of that earlier vision.

🪽 The wings sounded the same as before

⚙️ The wheels made their same noise

👂 Sound alone carried the vision's weight

📖 He knew it without seeing it again

## 😤 I Went In Bitterness, In The Heat Of My Spirit

Bitterness here is Ezekiel's own emotional reaction, not God's description of him.

The heat of his spirit sounds like anger or deep inner turmoil.

This calling is not peaceful for Ezekiel to carry.

The hand of the LORD stays strong on him even in that turmoil.

😤 Bitterness was Ezekiel's own reaction

🔥 Heat of spirit suggests real inner turmoil

💔 This calling was not peaceful for him

📖 God's strength held him through the turmoil

## 📅 Astonished Among Them Seven Days

Telabib sat beside the river Chebar, among the Judean exiles.

Ezekiel sits down right where the exiles already sat.

Seven days pass before he says or does anything recorded.

Even a prophet needs time to absorb what he has just seen.

🏘️ Telabib sat among the Judean exiles

🧍 Ezekiel sat right where they sat

📅 Seven silent days passed first

📖 Even a prophet needed time to absorb this

# Ezekiel 3:16-21
# 👁️ I Have Made Thee A Watchman
---
## 🏰 I Have Made Thee A Watchman

A watchman stood on a city wall and scanned for danger.

His only job was to sound the alarm before trouble arrived.

Ezekiel's job now works the same way, with God's warnings instead of enemy armies.

Silence from a watchman was never a safe option.

🏰 A watchman scanned the city wall

🚨 His job was to sound the alarm

🗣️ Ezekiel warns with God's words instead

📖 Silence was never a safe option

## 🤐 His Blood Will I Require At Thine Hand

This does not mean Ezekiel is blamed for someone else's sin.

It means he is held responsible only for staying silent.

A watchman who sees danger and says nothing shares the blame for what follows.

Speaking the warning, not controlling the outcome, is what God asks of him.

🙅 Not blamed for someone else's sin

🤐 Held responsible only for staying silent

🚨 Silence shares the blame for what follows

📖 Speaking is the job, not the outcome

## ✅ Thou Hast Delivered Thy Soul

Delivering the warning clears the messenger, whether or not anyone listens.

Once Ezekiel speaks, he is clear, no matter what happens next.

The hearer's response was never Ezekiel's responsibility to control.

Faithfulness to the message is what frees him, not the result of it.

🔁 This is the flip side of the warning

✅ Speaking the warning clears Ezekiel

🙉 The response was never his to control

📖 Faithfulness frees him, not the result

## ⚖️ Shall Not Be Remembered

A righteous man's old record does not cover a brand new sin here.

God says his past righteousness will not be remembered once he turns to evil.

This is a hard teaching, but a consistent one through the chapter.

God does not warn Ezekiel to protect feelings, he warns him to tell the truth.

⚖️ Past righteousness is not a credit balance

💔 A hard teaching, stated plainly

🎯 Consistency matters more than past record

📖 Ezekiel tells the truth, not a comfort

## 🪨 I Lay A Stumbling Block Before Him

A stumbling block pictures an obstacle placed deliberately in someone's path.

Here it describes God's own hand in a person's fall into sin.

This does not mean God forces anyone to sin against their will.

It means judgment can take the form of letting someone's own choice trip them.

🪨 A stumbling block is a deliberate obstacle

⚖️ Judgment can work through a person's own choice

🙅 God does not force anyone to sin

📖 Judgment and free choice sit together here

# Ezekiel 3:22-27
# 🤐 Shut Thyself Within Thine House
---
## 👑 The Glory Of The LORD Stood There

This is the same throne vision Ezekiel saw back at the river Chebar.

God confirms the first vision instead of replacing it with something new.

Ezekiel falls on his face again, just like the first time.

A true calling does not need a brand new sign every single time.

👑 The same vision returns from chapter one

🔁 God repeats it instead of replacing it

🙇 Ezekiel falls on his face again

📖 One true calling does not need repeating

## ⛓️ They Shall Put Bands Upon Thee

Bands here likely describe some kind of physical restraint or confinement.

Many scholars read this as describing a form of house arrest.

Ezekiel is told this before it ever happens to him.

God prepares him for restriction, not only for rejection by his own people.

⛓️ Bands likely mean physical restraint

🏠 Possibly a form of house arrest

📜 Ezekiel is warned before it happens

📖 God prepares him for restriction too

## 🔒 Make Thy Tongue Cleave To The Roof Of Thy Mouth

Cleave here means stuck fast, unable to move freely.

God silences Ezekiel's tongue for a specific season, not forever.

Reprover here means someone who publicly corrects and confronts others.

Ezekiel is pulled out of that public role for a while.

His silence does not mean his calling has ended.

🔒 Cleave means stuck fast in place

🤐 God silences him for a season

🗣️ Reprover means a public corrector

📖 Silence here does not mean the end

## 🔀 He That Heareth, Let Him Hear, And He That Forbeareth, Let Him Forbear

This exact line also closed out chapter two.

The outcome of Ezekiel's words is left completely open.

Some will listen, and some will refuse, and both are named in advance.

Either way, Ezekiel's instruction never changes.

🔁 The same line closed chapter two

🔀 Both outcomes are named in advance

🙉 Some will hear, some will refuse

📖 The instruction never changes either way
`.trim();

export const EZEKIEL_THREE_PERSONAL_SECTIONS = parseEzekielThreeRawNotes(EZEKIEL_THREE_RAW_NOTES);
