export type PsalmsNinetyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNinetyRawNotes(rawText: string): PsalmsNinetyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinetyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+90:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 90 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+90:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+90:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 90 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 90,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 90:${startVerse}` : `Psalms 90:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 90 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETY_RAW_NOTES = `# Psalms 90:1-4
# 🏠 Our Eternal Dwelling Place
---
## 🏠 Our Dwelling Place In All Generations

"Dwelling place" means a permanent home, not a brief stop along the way.

Moses is traditionally credited as this psalm's author.

He prayed it near the end of forty years wandering in the wilderness.

Tents and camps changed constantly during those years.

Through all of that change, God himself never moved and never changed.

"All generations" reaches back to Abraham and forward to every reader who prays this today.

🏠 Dwelling place means a permanent home
⛺ Israel wandered without any fixed home
🪨 God alone never moved or changed
📖 God was home before Israel had one

## ⛰️ Before The Mountains Were Brought Forth

Mountains felt like the oldest and most solid things a person could see.

They were the most permanent objects the ancient world knew.

"Brought forth" pictures something being born, the way a mother brings forth a child.

Even mountains had a starting point.

God did not have one.

He was already there before the oldest thing anyone could name existed.

⛰️ Mountains seemed like the oldest things
👶 Brought forth pictures something being born
🕰️ Even mountains had a starting point
📖 God existed before the oldest thing

## ♾️ From Everlasting To Everlasting, Thou Art God

"Everlasting" means without beginning and without end.

"From everlasting to everlasting" repeats that same word on both sides of the phrase.

There is no earlier point to trace God back to.

There is no later point where God will stop existing either.

Every measurement in the rest of this psalm gets compared to that one fact.

♾️ Everlasting means no beginning or end
🔁 The word repeats on both sides
🚫 No earlier point to trace God back to
📖 Every measure in this psalm starts here

## 🔄 Thou Turnest Man To Destruction

"Turnest" means to send back.

It is the same word translated "return" later in this verse.

This verse echoes God's words to Adam in Genesis three.

Dust thou art, and unto dust shalt thou return.

Man is not returning to nothing.

He is returning to the ground he was originally formed from.

🔄 Turnest means to send back
🌱 It matches Genesis three's dust to dust
🚫 Man does not return to nothing
📖 He returns to the ground he came from

## 👥 Return, Ye Children Of Men

"Children of men" is an old way of saying every human being.

The same Hebrew word appears twice in this verse.

First as "turnest," then as "return."

God is the one who sends man back to the dust.

He is also the one calling man to return.

Death is not the last word in this verse.

👥 Children of men means all mankind
🔁 The same word repeats twice here
⚰️ God sends man back to dust
📖 Death is not this verse's last word

## 📏 A Thousand Years In Thy Sight

"Thy sight" means the way something looks from God's own perspective.

A thousand years sounds impossibly long to any human being.

To God, that same span feels like a single day already finished.

"A watch in the night" was a short shift a guard stood, only a few hours long.

Time that feels enormous to people barely registers to the one who has no beginning.

📏 Thy sight means God's own perspective
🕰️ A thousand years sounds impossibly long
🌙 A watch was a short guard shift
📖 Vast human time barely registers to God

# Psalms 90:5-8
# 🌱 Swept Away Like Grass
---
## 🌊 Carriest Them Away As With A Flood

"Carriest away" pictures something swept off by a current too strong to resist.

A flood does not ask permission before it takes what is in its path.

Human life, in this picture, is carried off the same helpless way.

No one escapes a flood like this one.

🌊 Carriest away pictures being swept off
🚫 A flood does not ask permission
🏃 Human life is carried off the same way
📖 No one escapes a flood like this

## 😴 They Are As A Sleep

Sleep passes quickly, often without a person even noticing the time go by.

A full night can feel like only a few minutes once it is over.

That is how briefly a human life registers from God's perspective.

It is not an insult.

It is simply how short life actually is next to eternity.

😴 Sleep passes quickly, barely noticed
⏱️ A whole night can feel like minutes
📏 Life is just as brief to God
📖 Life is short next to eternity

## 🌱 In The Morning It Flourisheth

Grass in this region could spring up green and full after just one good rain.

By midmorning it already looked established, as if it had always been there.

That fast growth pictures how quickly a human life can seem to bloom.

Youth and strength can look permanent while they last.

🌱 Grass could spring up after one rain
🌤️ It looked established by midmorning
📈 This pictures a life blooming quickly
📖 Youth can look permanent while it lasts

## 🌇 Cut Down, And Withereth

The same grass that looked full in the morning is gone by evening.

"Cut down" pictures a deliberate ending, not a slow accident.

"Withereth" describes it drying up completely, with nothing left to regrow.

Morning and evening in this one verse cover an entire human lifetime.

The psalm is not exaggerating how fast that change can come.

🌇 Grass gone from morning to evening
✂️ Cut down means a deliberate ending
🍂 Withereth means dried up completely
📖 A whole lifetime spans morning to evening

## 🔥 Consumed By Thine Anger

"Consumed" pictures something being completely used up, the way fire consumes wood.

This is not a mild frustration passing quickly.

"Wrath" and "anger" appear together here, doubling the weight of the description.

"Troubled" describes the fear and confusion that anger like this produces.

The psalm is naming a real, heavy experience, not softening it.

🔥 Consumed pictures being completely used up
😠 Anger and wrath are doubled here
😟 Troubled means fear and confusion
📖 The psalm names this honestly, not softened

## 🙂 Our Secret Sins In The Light Of Thy Countenance

"Countenance" is an old word for someone's face, especially the expression on it.

"Secret sins" means the ones no other person on earth ever saw or knew about.

Nothing hidden from other people stays hidden from God.

His face is described here like a light bright enough to expose everything.

There is no private sin that God has not already seen in full.

🙂 Countenance is an old word for face
🤫 Secret sins means what no one else saw
💡 God's face is pictured as a bright light
📖 Nothing stays hidden from God

# Psalms 90:9-12
# ⏳ Teach Us To Number Our Days
---
## ⏳ As A Tale That Is Told

"Passed away" pictures years slipping by without the ability to hold onto them.

A "tale that is told" is a story spoken out loud.

It is gone the moment the last word is said.

Nothing about a spoken story lingers once the telling ends.

Human years, in this picture, disappear the very same way.

⏳ Passed away means years slipping by
🗣️ A tale that is told means spoken words
💨 It vanishes the moment the telling ends
📖 Human years disappear the very same way

## 🔢 Threescore Years And Ten

"Threescore" is an old way of counting by twenties, so threescore means sixty.

Threescore years and ten adds up to seventy years, the expected length of a life.

That number would have sounded like an ordinary lifetime to the original readers.

It was simply the ordinary shape of a full human life.

🔢 Threescore is an old word for sixty
➕ Threescore years and ten means seventy years
📏 This was an ordinary human lifespan
📖 The psalm names life's ordinary length

## 🔢 Yet Is Their Strength Labour And Sorrow

"Fourscore" means eighty, using the same count "threescore" used.

Even reaching that rarer, longer age was no guarantee of an easy life.

"Labour and sorrow" describes years spent working hard and carrying grief.

Length of life and ease of life are not the same thing in this verse.

🔢 Fourscore means eighty, using the same count
💪 Reaching eighty brought no guaranteed ease
😔 Labour and sorrow means hard work and grief
📖 A long life is not always easy

## ✂️ Soon Cut Off, And We Fly Away

"Cut off" pictures something ended suddenly, not faded out slowly.

"Fly away" pictures a bird lifting off and vanishing from sight almost instantly.

Both images describe the same thing, a life that ends quickly once it ends.

The psalm has now described life from beginning to end in just two verses.

✂️ Cut off means a sudden ending
🕊️ Fly away pictures a bird vanishing fast
⏱️ Life ends quickly once it ends
📖 One verse spans a whole life's end

## ❓ The Power Of Thine Anger

This verse asks a question with no expected human answer.

"Who knoweth" means no person can fully grasp something this large.

"According to thy fear" ties the size of that anger to the reverence God deserves.

The more someone rightly fears God, the more that person understands what is being described.

❓ Who knoweth means no one fully grasps
⚡ The question expects no human answer
🙇 Fear here means deep reverence for God
📖 Reverence helps someone grasp what is described

## 🧮 Number Our Days

"So teach us" turns this whole psalm from complaint into a request.

To "number" days means counting them as a limited, finite amount, not an endless supply.

"Apply our hearts unto wisdom" means letting that limited number actually change how a person lives.

This verse is the turning point of the entire psalm.

Everything before it explains why life is short.

Everything after it asks God to make that short life matter.

🧮 Number means counting a limited amount
❤️ Apply our hearts means letting it change us
🔄 This verse is the psalm's turning point
📖 A short life is asked to matter

# Psalms 90:13-17
# 🙏 Establish The Work Of Our Hands
---
## ⏰ Return, O LORD, How Long

"How long" is a common opening line for a lament prayer in the Psalms.

The psalmist is not simply venting, he is asking God to act soon.

"Return" here does not mean God physically left.

It means the psalmist wants to feel God's presence and help again.

"Repent thee" is an old phrase asking God to relent.

It asks God to change the course things seem headed toward.

⏰ How long opens a lament prayer
🙏 The psalmist asks God to act soon
🔙 Return means feeling God's presence again
📖 He asks God to change the course

## 🍽️ Satisfy Us Early With Thy Mercy

"Satisfy" means to fill something completely, leaving no remaining lack.

"Early" points to receiving mercy soon, not after more years are lost.

The psalmist wants joy that lasts "all our days," not just one moment.

A short life filled early with mercy can still be a joyful one.

🍽️ Satisfy means filled with no remaining lack
🌅 Early means soon, not after years are lost
🎉 All our days means lasting joy
📖 A short life can still be joyful

## ⚖️ According To The Days Wherein Thou Hast Afflicted Us

This verse asks God to balance the scales in a very specific way.

"Afflicted" describes the hard years already described earlier in the psalm.

The psalmist is not asking for more than fairness.

He wants joy in some measure matching the pain already endured.

⚖️ This verse asks God to balance the scales
😣 Afflicted means the hard years already described
🙏 The psalmist only asks for fairness
📖 He wants joy to match the pain

## 🛠️ Thy Work Appear Unto Thy Servants

"Thy work" refers to something only God can do.

No person could accomplish it alone.

"Appear" means becoming visible, not staying hidden or merely promised.

"Thy servants" includes both this generation and "their children" named right after.

The prayer asks for something the psalmist's own eyes could actually see.

🛠️ Thy work means only God can do
👀 Appear means visible, not just promised
👶 Servants includes both this generation and the next
📖 The prayer asks for something visible

## ✨ The Beauty Of The LORD Our God Be Upon Us

"Beauty" here means favor and pleasantness, not simply appearance.

The psalmist asks to be marked, visibly, as someone under God's favor.

This is the opposite of feeling hidden from God, described earlier in the psalm.

A short life can still carry the mark of God's pleasure on it.

✨ Beauty means favor, not just appearance
👁️ The psalmist asks to be visibly marked
🔄 This is the opposite of feeling hidden
📖 A short life can carry God's pleasure

## 🔁 The Work Of Our Hands Establish Thou It

This phrase is repeated twice in a row inside the same verse.

Repetition in Hebrew poetry signals real urgency, not a scribe's mistake.

"Establish" means to make something firm and lasting, not fragile or temporary.

The psalm opened with God as an eternal dwelling place.

It now ends asking for something that lasts too.

Human effort on its own fades like the grass described earlier.

With God's hand on it, that same effort is asked to last.

🔁 This phrase repeats twice in one verse
📜 Repetition in Hebrew poetry signals urgency
🏗️ Establish means made firm and lasting
📖 God's hand makes human effort last
`.trim();

export const PSALMS_NINETY_PERSONAL_SECTIONS = parsePsalmsNinetyRawNotes(PSALMS_NINETY_RAW_NOTES);
