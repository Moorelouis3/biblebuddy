export type PsalmsThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirtyTwoRawNotes(rawText: string): PsalmsThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 32:${startVerse}` : `Psalms 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 32 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTY_TWO_RAW_NOTES = `# Psalms 32:1-2
# 😊 Blessed Is He Whose Transgression Is Forgiven
---
## 😊 Blessed Is He Whose Transgression Is Forgiven

"Blessed" here means deeply happy, the kind of joy that comes from being right with God.

David is not describing luck or a passing good mood.

He is describing the relief of a debt that has actually been settled.

"Transgression" means a willful crossing of a line, not an accident.

This psalm opens by naming the best possible outcome first.

Everything that follows explains how David got there.

😊 Blessed means deeply happy, not lucky
🚧 Transgression means a willful line crossed
💳 This joy comes from a settled debt
📖 The psalm opens with the outcome first

## 🙈 Whose Sin Is Covered

"Covered" pictures something hidden from view on purpose, not simply overlooked.

The same word describes the blood placed on the mercy seat inside the tabernacle.

That blood covered the broken law kept underneath it.

David is saying his sin has been dealt with that same way.

🙈 Covered means hidden from view on purpose
🩸 The mercy seat blood pictured this
📜 The law sat hidden underneath
➡️ David's sin was dealt with fully

## 📒 The LORD Imputeth Not Iniquity

"Imputeth" is an accounting word, meaning charged to someone's account.

David pictures sin like a debt that could be tallied against him.

"Iniquity" adds another angle, a crookedness or a twisting away from what is right.

God chooses not to enter that charge into the ledger at all.

📒 Imputeth means charged to an account
🌀 Iniquity means a crookedness or twisting
🚫 God refuses to enter the charge
📖 The debt is real but not counted

## 🕊️ In Whose Spirit There Is No Guile

"Guile" means deception, especially the kind aimed at fooling yourself.

David spent real time lying to himself about his own sin.

The next few verses show exactly what that looked like.

A guileless spirit stops pretending and finally tells the truth.

Blessing here belongs to the honest, not to the innocent.

🕊️ Guile means deception, even of yourself
🙊 David once lied to himself too
✅ A guileless spirit finally tells the truth
📖 Honesty, not innocence, brings this blessing

# Psalms 32:3-4
# 🔥 When I Kept Silence
---
## 🤐 When I Kept Silence

"Silence" here does not mean simple quiet.

It means refusing to confess what David already knew was wrong.

He is describing the season before verse five, when he stayed quiet on purpose.

Silence in this psalm is a choice, not an accident.

🤐 Silence means refusing to confess
🙊 This was a choice, not an accident
⏳ It describes the time before verse five
➡️ Unconfessed sin does not stay quiet for long

## 🦴 My Bones Waxed Old Through My Roaring

"Waxed old" means aged or worn down, like something used past its years.

"Roaring" pictures groaning loud enough to be heard, not silent suffering.

Guilt David refused to speak with his mouth came out through his body instead.

Unconfessed sin found its own way to be loud.

🦴 Waxed old means worn down with age
📢 Roaring means groaning out loud
🤫 His mouth was silent, his body was not
📖 Guilt always finds a way to speak

## ✋ Thy Hand Was Heavy Upon Me

A "hand" in scripture often pictures God's active pressure on a situation.

"Heavy" describes a weight that cannot be shrugged off.

"Day and night" means this pressure never let up, not even for rest.

God's discipline here was not cruelty.

It was persistent attention.

✋ Hand pictures God's active pressure
⚖️ Heavy means weight that cannot be ignored
🌓 Day and night means it never stopped
📖 This pressure was attention, not cruelty

## ☀️ My Moisture Is Turned Into The Drought Of Summer

"Moisture" pictures the strength and life inside a healthy body.

"Drought of summer" describes the driest, most exhausted season a land could face.

David felt that same dryness happening inside himself.

"Selah" appears here, an old word many scholars believe marked a pause for reflection.

The reader is meant to stop and feel this verse before moving on.

☀️ Moisture pictures strength and life inside
🏜️ Drought of summer means total dryness
🧠 David felt that dryness in himself
📖 Selah marks a pause to feel this

# Psalms 32:5
# 🗣️ I Acknowledged My Sin Unto Thee
---
## 🗣️ I Acknowledged My Sin Unto Thee

"Acknowledged" means admitting something out loud, not just noticing it privately.

David had already known about his sin during the silence of verse three.

Knowing was not enough on its own.

Saying it to God was the turn this whole psalm has been building toward.

🗣️ Acknowledged means admitting it out loud
🧠 Private knowing was not enough
🔄 This is the turn of the psalm
➡️ Confession requires actually speaking

## 🙅 Mine Iniquity Have I Not Hid

"Hid" is the opposite of the "covered" from verse one.

David had been the one hiding his sin from God.

Now he stops hiding, and lets God do the covering instead.

The two words trade places once David tells the truth.

🙅 Hid means David was concealing it
🔄 Hid is the opposite of covered
🤝 God covers what David stops hiding
📖 Honesty lets God do the covering

## ✍️ I Said, I Will Confess My Transgressions

"Confess" means agreeing with God about what actually happened, not making excuses.

"I will" shows a firm decision, not a reluctant admission.

David names the same word "transgressions" from verse one, now applied to himself directly.

He is no longer talking about sin in general.

✍️ Confess means agreeing with God fully
💪 I will shows a firm decision
🪞 Transgression now points at himself
📖 General sin becomes personal confession

## ✅ Thou Forgavest The Iniquity Of My Sin

The forgiveness in this line comes the moment David actually confesses.

There is no waiting period described here at all.

Many scholars connect this psalm to David and Bathsheba, alongside Psalm fifty one.

The prophet Nathan told David in that story, "the LORD also hath put away thy sin."

This verse shows what that forgiveness felt like from the inside.

✅ Forgiveness came with no delay
👑 Many link this psalm to David and Bathsheba
🗣️ Nathan spoke a similar word in that story
📖 This verse shows forgiveness from the inside

# Psalms 32:6-7
# 🌊 In The Floods Of Great Waters
---
## 🙏 In A Time When Thou Mayest Be Found

David turns from his own story to invite others into the same kind of prayer.

"Godly" here means someone devoted to God, not someone flawless.

"A time when thou mayest be found" describes a real window of opportunity.

That window is not promised to stay open forever.

David wants others to pray while it is still open.

🙏 Godly means devoted, not flawless
⏳ This describes a real window of time
🚪 The invitation will not stay open forever
➡️ David wants others to pray now

## 🌊 In The Floods Of Great Waters

"Floods of great waters" is a common Hebrew picture for overwhelming trouble or judgment.

Floods were a real danger in this region.

A sudden flood could sweep away everything in its path.

David promises those floods will not reach the person who trusts God.

That safety is real, not just emotional comfort.

🌊 Floods means overwhelming trouble or judgment
💦 Real floods were a genuine danger there
🛡️ These waters will not reach the trusting
📖 The safety promised is real, not just felt

## 🏠 Thou Art My Hiding Place

David uses the same root idea as "hid" back in verse five.

The meaning has completely flipped.

He once hid his sin from God out of fear.

Now he hides himself safely inside God instead.

The same word can describe both danger and shelter.

🏠 Hiding place echoes the hid of verse five
🔄 The meaning has completely flipped
🛡️ David now hides safely inside God
📖 The same word can mean danger or shelter

## 🎶 Thou Shalt Compass Me About With Songs Of Deliverance

"Compass about" means to surround completely on every side.

"Songs of deliverance" recalls the victory songs sung in Israel after a real rescue.

Israel sang this way after crossing the Red Sea.

David expects to be surrounded by that same kind of celebration.

Rescue in this psalm does not end quietly.

It ends in music.

🎶 Compass about means surrounded completely
🎉 Songs of deliverance recalls victory celebrations
🌊 Israel sang this way after the Red Sea
📖 Rescue here ends in music, not silence

# Psalms 32:8-9
# 🐴 I Will Guide Thee With Mine Eye
---
## 🧑‍🏫 I Will Instruct Thee And Teach Thee

The voice shifts here from David praying to God speaking directly.

"Instruct" and "teach" both describe patient, ongoing training, not a single lecture.

"The way which thou shalt go" points to a whole path, not just one decision.

God offers to walk alongside the reader the same way He walked David through this psalm.

🧑‍🏫 The voice shifts to God speaking
📚 Instruct and teach mean ongoing training
🧭 The way means a whole path
📖 God offers the same guidance David received

## 👁️ I Will Guide Thee With Mine Eye

Guiding "with mine eye" pictures a quiet glance, not a shove or a shout.

Think of a parent catching a child's attention across a room with one look.

That kind of guidance only works if the other person is paying close attention.

God offers the gentlest kind of correction first.

👁️ Guide with mine eye means a quiet glance
🧒 Think of a parent's look across a room
👀 It only works if someone is watching
📖 God offers gentle correction first

## 🐴 Be Ye Not As The Horse, Or As The Mule

Horses and mules were common work animals in this culture.

They were valued for their strength.

They were also known for stubbornness.

"Which have no understanding" means these animals cannot grasp instruction, only force.

David is warning the reader not to need that same kind of force from God.

🐴 Horses and mules were common work animals
💪 They were strong but often stubborn
🚫 They cannot grasp instruction, only force
➡️ The comparison is meant to sting a little

## 🔗 Whose Mouth Must Be Held In With Bit And Bridle

A "bit and bridle" is the metal piece and straps used to physically control a horse.

Without it, a stubborn animal will not go where it is led.

God prefers to lead with a glance instead of equipment built for resistance.

Bit and bridle exist because gentle guidance was refused first.

🔗 Bit and bridle are tools of force
🐴 They exist because animals resist leading
👁️ God prefers a glance over equipment
📖 Force is needed only after gentleness is refused

# Psalms 32:10-11
# 🎉 Be Glad In The LORD, And Rejoice
---
## 😟 Many Sorrows Shall Be To The Wicked

"Sorrows" describes the ongoing pain of a life not surrendered to God.

This echoes David's own bones wasting away back in verse three.

The wicked here are not being punished from the outside only.

Their own unconfessed path produces its own grief.

😟 Sorrows means ongoing, repeated pain
🦴 This echoes David's own suffering in verse three
🔄 The wicked bring this grief on themselves
📖 An unconfessed path produces its own sorrow

## 🛡️ Mercy Shall Compass Him About

"Compass about" repeats the exact phrase from verse seven, now describing mercy instead of songs.

"Mercy" means God's loyal, covenant kindness, not a passing feeling.

The trusting person ends up surrounded, the same way David was surrounded by deliverance.

The wicked's sorrow and the faithful's mercy sit side by side on purpose.

🛡️ Compass about repeats the word from verse seven
🤍 Mercy means loyal, covenant kindness
🔄 The trusting person ends up surrounded too
📖 Sorrow and mercy sit side by side here

## 🎉 Be Glad In The LORD, And Rejoice, Ye Righteous

"Righteous" and "upright in heart" both describe people who dealt honestly with their sin.

They do not describe people who never sinned at all.

David is not congratulating the flawless.

He is inviting the honest, the same kind of person he became in verse five.

Gladness here is available to anyone willing to confess.

🎉 Righteous means honest, not flawless
🪞 David speaks to people like his past self
🙌 The invitation is open to the honest
📖 Gladness is available to anyone who confesses

## 📣 Shout For Joy, All Ye That Are Upright In Heart

The psalm began with a man groaning in silence.

It closes with a call to shout.

That full turn, from silence to shouting, is the whole point of the psalm.

Confession did not just remove guilt.

It restored David's voice completely.

The same path is open to anyone who stops hiding and tells God the truth.

📣 The psalm moves from silence to shouting
🔄 That turn is the whole point
🗣️ Confession restored David's voice completely
📖 The same path is open to anyone
`.trim();

export const PSALMS_THIRTY_TWO_PERSONAL_SECTIONS = parsePsalmsThirtyTwoRawNotes(PSALMS_THIRTY_TWO_RAW_NOTES);
