export type PsalmsNinetyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNinetyFiveRawNotes(rawText: string): PsalmsNinetyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinetyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+95:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 95 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+95:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+95:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 95 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 95,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 95:${startVerse}` : `Psalms 95:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 95 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETY_FIVE_RAW_NOTES = `# Psalms 95:1-3
# 🎶 A Call To Sing And Worship
---
## 🎶 O Come, Let Us Sing Unto The LORD

"O come" is an invitation, not a command barked from a distance.

The psalm opens with the whole community being called together.

Singing publicly to the LORD was one main way Israel worshipped.

This is not a private feeling kept inside one person.

It is a shared call meant for the whole gathered nation.

🎶 O come is a warm invitation
👥 The whole community is called together
🗣️ Public singing was central to worship
📖 This call is for the whole nation

## 🪨 The Rock Of Our Salvation

"Rock" pictures something solid, steady, and impossible to knock down.

"Salvation" here means rescue and safety, not only life after death.

Calling God the rock of salvation joins two pictures into one.

He is both the safe ground to stand on and the rescuer himself.

This same picture appears often across the Psalms.

🪨 Rock means solid and impossible to move
🛟 Salvation means rescue and safety
🤝 Two pictures join into one image
📖 This picture appears often in the Psalms

## 🙏 Come Before His Presence With Thanksgiving

"His presence" pictures approaching a king in his own throne room.

In Israel this language ties to appearing at the tabernacle or temple.

Worshippers did not simply think about God from far away.

They pictured themselves stepping close, into the same room as their king.

"Thanksgiving" sets the tone for that approach, gratitude instead of fear.

🚪 His presence pictures a king's throne room
🛕 Worship was tied to the tabernacle or temple
👑 Worshippers pictured stepping close to their king
📖 Thanksgiving sets the tone for approaching him

## 🎵 Make A Joyful Noise Unto Him With Psalms

"Joyful noise" does not mean random shouting.

It describes a loud, glad sound made on purpose in worship.

"Psalms" here means songs meant to be sung with instruments.

Ancient Israelite worship was rarely quiet or purely internal.

It was full voiced, out loud, and often carried by music.

🎉 Joyful noise means loud, glad worship
🎼 Psalms means songs sung with instruments
🔊 Worship in Israel was full voiced
📖 Praise was meant to be heard aloud

## 👑 The LORD Is A Great God

God's greatness is not argued for in this line.

It is simply announced, like a fact everyone already knows.

"Great" points to God's size and power compared to everything else.

The psalm has just described singing and drawing near with joy.

Now it gives the reason that response makes sense at all.

👑 Great points to God's size and power
🎯 The claim is stated plainly, not argued
🧱 This verse explains the earlier praise
📖 God's greatness grounds the whole psalm

## 🏛️ A Great King Above All Gods

This does not mean the LORD merely ranks first among many real gods.

Many surrounding nations in the ancient world worshipped multiple gods.

This verse calls him a great King above all of them.

That is a claim to the highest possible rank there is.

Nothing worshipped anywhere else can compete with him.

🏛️ Ancient neighbors worshipped multiple gods
👑 Above all gods claims the highest rank
🚫 This does not treat other gods as equal
📖 Nothing worshipped elsewhere competes with him

# Psalms 95:4-5
# 🌍 Creator Of Sea, Land, And Hills
---
## 🕳️ In His Hand Are The Deep Places Of The Earth

"Hand" is used here as a picture of ownership and control.

"Deep places" points to the hidden depths under the earth's surface.

No one but God had ever seen most of these depths.

Yet the psalm insists they still sit inside his grip.

Nothing is too hidden or too far down to belong to him.

🕳️ Deep places means the earth's hidden depths
✊ Hand pictures ownership and control
👁️ These depths were unseen by any person
📖 Nothing hidden is outside his grip

## ⛰️ The Strength Of The Hills Is His Also

This is not just scenic language about mountains.

Many ancient peoples believed their gods lived on high, sacred mountains.

This verse claims those same heights as belonging to the LORD instead.

"Strength" here means the towering, immovable power the hills seem to hold.

Even that power answers to him.

⛰️ Ancient peoples treated mountains as sacred
👑 This verse claims the hills for the LORD
💪 Strength describes the hills' towering power
📖 Even that power answers to him

## 🌊 The Sea Is His, And He Made It

This is not simply admiring calm water.

In many ancient stories, the sea was a symbol of chaos and danger.

Some nearby cultures even worshipped the sea as a rival god.

This verse answers that idea directly.

The sea is not a rival power.

It is something God made, the same as anything else.

🙇 Some cultures worshipped the sea as a god
✋ This verse answers that idea directly
🛠️ The sea is something God made
📖 It holds no power to rival him

## 🏔️ His Hands Formed The Dry Land

"Formed" pictures careful, hands on shaping, the way a potter shapes clay.

This sits right next to the sea on purpose.

The sea is wild and hard for people to control.

Dry land is stable, walkable, and safe to build a life on.

The wild and the stable both trace back to the same maker.

🖐️ Formed pictures careful, hands on shaping
🌊 The sea is wild and moving
🧱 Dry land is stable and walkable
📖 Both came from the same maker

# Psalms 95:6-7
# 🙇 Come, Kneel, We Are His
---
## 🙇 O Come, Let Us Worship And Bow Down

Praise is not only heard.

It is also physical.

The first invitation in this psalm was to sing.

"Worship" here carries the idea of bowing low in submission.

"Bow down" makes that same posture physical and visible.

The whole body now joins what the voice already started.

📿 Worship carries the idea of bowing low
🔁 This echoes the invitation from verse 1
🧎 Bow down makes the posture physical
📖 The whole body now joins the voice

## 🧎 Let Us Kneel Before The LORD Our Maker

Kneeling was an even lower posture than simply bowing.

It pictured someone giving up any claim to standing as an equal.

"Our maker" ties this moment back to verse 5.

The same hands that formed the dry land are the ones being knelt before.

Posture and truth match each other in this verse.

🧎 Kneeling is a lower posture than bowing
🙅 It gives up any claim to equality
🔗 Our maker ties back to verse 5
📖 Posture and truth match in this verse

## 🐑 We Are The People Of His Pasture, And The Sheep Of His Hand

"Pasture" pictures a safe field where sheep are kept and fed.

Shepherd language runs all through the Bible for God's care of his people.

"Sheep of his hand" pictures a shepherd holding each one close.

Ancient kings were often pictured as shepherds of their people too.

Israel is not just ruled by this King.

They are cared for too.

🐑 Pasture pictures a safe, provided place
🤲 Sheep of his hand pictures close care
👑 Ancient kings were often called shepherds
📖 Israel is cared for, not just ruled

## ⏰ To Day If Ye Will Hear His Voice

"To day" is an old way of writing today.

KJV English splits it into two separate words.

The psalm shifts here from praise into a direct warning.

"If ye will hear" makes listening a real, open choice.

This exact line gets quoted later in the New Testament book of Hebrews.

The point there is the same.

Do not put off responding to God.

⏰ To day means today, urgent and present
🔀 The psalm shifts from praise to warning
👂 Hearing his voice is presented as a choice
📖 Hebrews later quotes this exact line

# Psalms 95:8-11
# ⚠️ Do Not Harden Your Heart Like They Did
---
## 🧊 Harden Not Your Heart

"Harden" pictures something soft turning stiff and unmovable.

A hardened heart cannot be reached, corrected, or taught anymore.

This is a warning, not a description of something that already happened.

The door is still open to choose differently right now.

That is exactly why the next word is "today."

🧊 Harden pictures something turning stiff
🚪 A hardened heart cannot be reached or taught
⚠️ This is a warning, not a done deed
📖 The door is still open right now

## 🏜️ As In The Provocation, And As In The Day Of Temptation In The Wilderness

This line points back to two real events, not a vague idea.

"Provocation" and "temptation" both refer to Israel testing God at Massah and Meribah.

Those events happened when the people ran out of water and complained bitterly.

Exodus and Numbers both record God still providing water from a rock even then.

The warning is grounded in something that actually happened in Israel's own history.

🏜️ Provocation and temptation point to real places
💧 Israel ran out of water and complained
🪨 God still provided water from a rock
📖 The warning is grounded in real history

## 👁️ Your Fathers Tempted Me, Proved Me, And Saw My Work

"Tempted" and "proved" both describe testing God to see if he would act.

This was not blind doubt with no evidence at all.

These same people had watched the plagues fall on Egypt.

They had walked through the Red Sea on dry ground.

They tested God anyway, even after seeing what he could do.

🧪 Tempted and proved both mean testing God
🐸 They had watched the plagues in Egypt
🌊 They had walked through the Red Sea
📖 They tested him even after seeing his power

## ⏳ Forty Years Long Was I Grieved With This Generation

Forty years matches the exact length of Israel's wilderness wandering.

That number was not random.

It was the direct result of their unbelief.

"Grieved" describes sorrow, closer to a parent's heartbreak than simple anger.

God was not coldly punishing from a distance.

He stayed present through decades of disappointment.

⏳ Forty years matches the wilderness wandering
🎯 The number was a direct result of unbelief
💔 Grieved means sorrow, closer to heartbreak
📖 God stayed present through the disappointment

## 🧭 A People That Do Err In Their Heart

"Err" means wandering off course, the same root idea as being lost.

Their wandering was not just with their feet in the wilderness.

It was happening inside their heart first.

The outward wandering simply showed what was already true inside.

A lost heart leads to a lost path.

🧭 Err means wandering off course
🚶 Their wandering started inside the heart
🗺️ Outward wandering showed an inward truth
📖 A lost heart leads to a lost path

## 📜 They Have Not Known My Ways

This is a strange claim about a people who had the law given directly to them.

"Known" here means more than head knowledge.

It means trusting and walking in step with someone.

Israel could recite facts about God without actually knowing him this way.

Information was not the thing missing.

Trust was.

📜 Known means more than head knowledge
🤝 It means trusting and walking with God
❓ Israel had facts without real trust
📖 Information was not the missing thing

## ⛔ I Sware In My Wrath That They Should Not Enter Into My Rest

"Sware" is the old form of swore, making a binding oath.

God does not make oaths lightly or take them back later.

"My rest" points forward to the promised land of Canaan.

An entire generation lost the chance to enter it because of unbelief.

This exact verse gets quoted heavily in the New Testament book of Hebrews.

There it becomes a warning to a whole new generation of readers.

⛔ Sware means a binding oath, not a threat
🏞️ My rest points to the promised land
🚪 That whole generation lost their chance to enter
📖 Hebrews later uses this as a warning
`.trim();

export const PSALMS_NINETY_FIVE_PERSONAL_SECTIONS = parsePsalmsNinetyFiveRawNotes(PSALMS_NINETY_FIVE_RAW_NOTES);
