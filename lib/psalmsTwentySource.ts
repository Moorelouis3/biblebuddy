export type PsalmsTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwentyRawNotes(rawText: string): PsalmsTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 20:${startVerse}` : `Psalms 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 20 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWENTY_RAW_NOTES = `# Psalms 20:1-3
# 🙏 A Prayer Before The Battle
---
## 😥 The LORD Hear Thee In The Day Of Trouble

The day of trouble points to a specific crisis, most likely a coming war.

This psalm was probably sung by the people before their king rode out to fight.

David is not the one praying here.

The whole nation prays over him before he ever leaves for battle.

😥 Trouble points to a coming crisis
⚔️ Likely written before a battle
🗣️ The nation prays, not David
📖 A king's fight becomes everyone's prayer

## 🛡️ The Name Of The God Of Jacob Defend Thee

The name of someone in this culture means far more than just what he is called.

It stands for God's full character, His power and His presence together.

Calling on the God of Jacob points back to a specific history.

Jacob struggled with weakness his whole life, yet God still defended him again and again.

That same defending God is now asked to protect the king.

🛡️ Name means God's full character
👤 Jacob recalls a promise keeping God
🤼 Jacob was weak, God still defended him
📖 The same God now defends the king

## ⛪ Send Thee Help From The Sanctuary

The sanctuary refers to the tabernacle, the tent where God's presence dwelled among Israel.

This was not just a beautiful building.

It marked the one place heaven touched earth for this whole nation.

Asking for help from that place means asking God Himself to act, not visiting a shrine.

⛪ Sanctuary means the tabernacle tent
🌍 Where heaven touched earth for Israel
🙏 Help really comes from God Himself
📖 The place points past itself to God

## 🏔️ Strengthen Thee Out Of Zion

Zion is the specific hill in Jerusalem where the ark of the covenant was kept.

By David's own reign, Zion had become the worship center of the whole kingdom.

Calling on Zion is another way of calling on the God who lives there.

The king draws his strength from the same hill where the nation worships.

🏔️ Zion is Jerusalem's central hill
👑 It became the kingdom's worship center
💪 Strength is tied to God's dwelling
📖 The king draws power from God's house

## 🔥 Remember All Thy Offerings, And Accept Thy Burnt Sacrifice

Offerings covered many kinds of gifts brought to God, grain, animals, and more.

A burnt sacrifice was one specific kind, completely consumed by fire on the altar.

Nothing of it was kept back for the person who brought it.

The king had likely offered these before heading out, seeking God's favor first.

🎁 Offerings means gifts brought to God
🔥 Burnt sacrifice means fully consumed by fire
🙌 Nothing was kept back for the giver
📖 The king sought favor before the fight

## ⏸️ Selah

Selah appears often across the Psalms.

It most likely marked a pause.

Many scholars believe it signaled a musical interlude or a moment of silence.

It gave the singers and the hearers time to let the words sink in.

The prayer just offered deserves a real pause before moving on.

⏸️ Selah likely marked a pause
🎵 Many think it cued the music
🤫 It let the words sink in
📖 Some prayers deserve a real pause

# Psalms 20:4-6
# 🚩 Banners And Bold Confidence
---
## 💭 Grant Thee According To Thine Own Heart, And Fulfil All Thy Counsel

Counsel means the king's careful plans and decisions, not a passing wish.

The people are asking God to grant exactly what the king is hoping for.

They are not praying for something random or generic.

They are asking God to line up with the king's own careful plans.

💭 Heart means his deepest hopes
📋 Counsel means his careful plans
🙏 Not a random or generic prayer
📖 They ask God to back his plans

## 🎉 We Will Rejoice In Thy Salvation

The people speak in the first person now, we, not just praying about the king.

Their own joy is tied directly to whether the king succeeds or fails.

Salvation here does not mean spiritual rescue for eternity.

It means being physically saved from defeat in battle.

🎉 The people speak for themselves now
🔗 Their joy depends on the king
⚔️ Salvation here means rescue in battle
📖 One man's victory becomes shared joy

## 🚩 In The Name Of Our God We Will Set Up Our Banners

A banner was a flag or standard raised so soldiers could see where to gather.

Armies in this culture rallied around a specific banner during battle.

Raising it in the name of our God means marching under His authority, not a general's.

Every soldier looking at that flag was reminded whose fight this actually was.

🚩 Banner means a battle standard
👥 Soldiers rallied around their banner
🙌 This banner marched under God's authority
📖 Every soldier remembered whose fight this was

## 🙏 The LORD Fulfil All Thy Petitions

Petitions means specific requests, something narrower than the counsel named back in verse four.

The prayer moves here from broad strategy to something more personal.

Every specific thing the king has asked God for gets named in this line.

The people want nothing left unanswered.

🙏 Petitions means specific requests
🔀 Narrower than the counsel in verse four
🎯 Every specific request is included
📖 The people want nothing unanswered

## 👑 Now Know I That The LORD Saveth His Anointed

The voice shifts here from the crowd's we to one single speaker, I.

This may be the king himself, now speaking with fresh confidence.

Anointed means someone set apart for a task by having oil poured over his head.

Kings, priests, and prophets in this culture were all set apart this exact way.

👑 The speaker shifts to I
🛢️ Anointed means oil poured on the head
👥 Kings, priests, and prophets were anointed
📖 Confidence follows the nation's prayer

## ☁️ He Will Hear Him From His Holy Heaven

Verse two asked for help from the sanctuary on earth.

This verse now points somewhere higher, God's holy heaven.

The earthly sanctuary was always just a picture pointing toward that greater reality.

God's true throne was never limited to one building.

⛪ Verse two named the earthly sanctuary
☁️ This verse names heaven itself
🖼️ The sanctuary only pictured heaven
📖 God's throne is never limited to one place

## 💪 The Saving Strength Of His Right Hand

The right hand in this culture was almost always the hand of strength and honor.

A person's stronger hand did the fighting, the building, and the blessing.

Saying God acts with His right hand pictures Him personally stepping into the fight.

This is not distant help sent from far away.

💪 Right hand means strength and honor
⚔️ It pictures God fighting personally
🚫 Not distant, secondhand help
📖 God steps into the fight Himself

# Psalms 20:7-9
# 🐎 Trust That Does Not Fail
---
## 🐎 Some Trust In Chariots, And Some In Horses

Chariots and horses were the most advanced military technology of this whole era.

Nations with large chariot forces, like Egypt, were considered nearly unstoppable.

Israel had far fewer chariots and horses than the powers surrounding it.

Trusting in this kind of strength meant trusting raw military size and speed.

🐎 Chariots and horses meant top technology
🏆 Big chariot forces looked unstoppable
📉 Israel had far fewer of both
📖 This trust rests on raw military power

## 🗣️ We Will Remember The Name Of The LORD Our God

This verse deliberately sets two very different sources of confidence side by side.

One side counts horses and chariots.

The other side simply remembers a name.

Remember here means actively relying on, not just recalling a fact.

⚖️ Two very different sources compared
🐎 One side counts horses and chariots
🗣️ The other relies on God's name
📖 Remembering means relying, not just recalling

## ⬇️ They Are Brought Down And Fallen

They points back to the chariot and horse trusting nations just named.

Brought down describes a sudden, forced defeat, not a slow decline.

Fallen adds the picture of a body actually collapsing to the ground.

Trusting in horses and chariots did not save them in the end.

⬇️ They refers to the chariot trusters
💥 Brought down means a sudden defeat
🧎 Fallen pictures an actual collapse
📖 Military strength alone did not save them

## 🧍 We Are Risen, And Stand Upright

Risen describes standing back up after being knocked down.

This half of the verse pictures the exact opposite posture from the one before it.

Stand upright pictures someone steady and unshaken, still on his feet.

The nation trusting in the LORD ends this verse still standing.

🧍 The opposite posture is pictured here
⬆️ Risen means standing back up
🛡️ Upright means steady and unshaken
📖 Trust in God leaves them standing

## 🙏 Save, LORD

The whole psalm has been building toward this one short, urgent request.

Every earlier line about banners, chariots, and standing upright leads back to this single word.

It is short on purpose.

A real crisis rarely needs a long speech.

🙏 The psalm builds to one request
📉 Save is short on purpose
⚔️ It fits a real crisis
📖 Urgent prayers do not need long speech

## 👑 Let The King Hear Us When We Call

This final line circles back to where the psalm began, praying for the king.

The people are not asking to replace the king's leadership.

They are asking that he stay responsive to them, even in the middle of war.

A good king listens to his people at the very moment he is needed most.

🔁 This circles back to verse one
👂 The people ask to be heard
🙌 Not asking to replace his leadership
📖 A good king listens when needed most
`.trim();

export const PSALMS_TWENTY_PERSONAL_SECTIONS = parsePsalmsTwentyRawNotes(PSALMS_TWENTY_RAW_NOTES);
