export type IsaiahThirtyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirtyEightRawNotes(rawText: string): IsaiahThirtyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirtyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+38:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 38 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+38:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+38:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 38 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 38,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 38:${startVerse}` : `Isaiah 38:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Isaiah 38 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTY_EIGHT_RAW_NOTES = `# Isaiah 38:1-3
# 😢 Hezekiah's Death Sentence
---
## 🩺 Sick Unto Death

Sick unto death means the illness had already reached a fatal stage.

This was not a rumor or a guess from a worried servant.

Isaiah the prophet delivered the diagnosis directly from the LORD.

Hezekiah is hearing that his life is ending, not only that he feels unwell.

The word comes through the same prophet who had just promised Jerusalem would survive Assyria.

The king who was delivered from an army now faces a battle no army can fight.

🩺 Sick unto death means fatal illness
📜 The prophet delivers this news directly
⚔️ This danger differs from the Assyrian siege
📖 Only God controls how life ends

## 📋 Set Thine House In Order

Set thine house in order was the ancient way of saying finish your affairs.

A king in this position had a household, a treasury, and a throne to arrange.

There was no named heir ready, since Manasseh was not yet born.

The command forces Hezekiah to face the ending honestly instead of avoiding it.

📋 Set thine house means finish your affairs
👑 A king had a throne to arrange
👶 No heir was ready yet
📖 The command forces honesty about the ending

## 🧱 Turned His Face Toward The Wall

Turning his face toward the wall was a private way to pray.

Hezekiah does not argue with the prophet in front of the court.

He turns from every onlooker so his grief and his prayer stay unseen.

This same posture appears elsewhere in scripture when a person wants to be alone with God.

The wall becomes the one witness to a conversation meant for God alone.

🧱 Turning to the wall means seeking privacy
👑 Hezekiah steps away from the court
🙏 His grief and prayer stay unseen
📖 Some prayers are meant for God alone

## ❤️ Walked Before Thee In Truth

Walked before thee in truth describes a whole life lived openly toward God.

A perfect heart does not mean Hezekiah never sinned.

It means his loyalty to the LORD was whole and undivided, not split between other gods.

He reminds God of that loyalty while he weeps bitterly over the sentence he has just heard.

This is a prayer built on relationship, not a bargain offered to earn more time.

❤️ Walked in truth means a loyal life
🙌 A perfect heart means undivided devotion
😢 Hezekiah weeps bitterly as he prays
📖 This plea rests on relationship, not bargaining

# Isaiah 38:4-6
# 🕊️ God's Answer Through Isaiah
---
## 🔁 Go, And Say To Hezekiah

Isaiah had just walked out with a message of death.

Now the LORD sends him straight back in with a completely different word.

The same prophet who pronounced the sentence now carries the reversal.

This shows the message belonged to God the whole time, not to Isaiah's own judgment.

🔁 Isaiah returns before even leaving the palace
📜 The prophet carries both messages
🙌 The reversal comes from God, not Isaiah
📖 A word from God can still change

## 👴 The God Of David Thy Father

Naming God as the God of David thy father recalls a specific promise.

Centuries earlier, God had promised David an everlasting line of kings.

By using that title now, God ties Hezekiah's healing to that older covenant.

This sickness threatened more than one man, since Hezekiah still had no son on the throne.

👴 David thy father recalls an old promise
👑 God promised David a lasting line
🔗 Hezekiah's healing ties to that covenant
📖 One man's life carried a whole promise

## 🔢 I Will Add Unto Thy Days Fifteen Years

I will add unto thy days fifteen years is a specific, countable promise.

God does not simply say Hezekiah will recover.

He names the exact extension so there can be no doubt later about whether it happened.

Manasseh, the son who would inherit the throne, was born within those fifteen added years.

🔢 Fifteen years is a specific promise
📆 God names an exact number, not a guess
👶 Manasseh is born during those years
📖 A precise promise leaves no room for doubt

## 🛡️ I Will Deliver Thee And This City

I will deliver thee and this city links Hezekiah's healing to Jerusalem's safety.

Chapters thirty six and thirty seven already told how Assyria surrounded the city.

The same chapter that heals the king also renews the promise to defend the capital.

One man's recovery and an entire city's survival are wrapped into a single promise here.

🛡️ Deliver thee and this city are joined
🏰 Assyria had already surrounded Jerusalem
📜 The prior chapters already set the stage
📖 A king's healing and a city's future connect

# Isaiah 38:7-8
# ☀️ The Sign On The Sundial
---
## ✅ This Shall Be A Sign Unto Thee

A sign in scripture is a visible proof that confirms a spoken word.

God offers Hezekiah something his own father Ahaz once refused to ask for.

Isaiah seven records Ahaz turning down a sign out of false humility.

Hezekiah is given the very thing his father would not request.

✅ A sign confirms a spoken word
🙅 Ahaz once refused to ask for one
👴 Ahaz was Hezekiah's own father
📖 The son receives what the father declined

## 🕰️ The Sun Dial Of Ahaz

A sun dial marked time by the shadow it cast across the day.

This particular dial was already known by the former king's own name.

Every person in the palace would have recognized it and used it daily.

Choosing something this ordinary and public made the coming miracle impossible to miss or fake.

🕰️ A sun dial tracked time by shadow
👑 It carried the name of Ahaz
👀 Everyone in the palace knew this dial
📖 An everyday object became unmistakable proof

## ⏪ The Sun Returned Ten Degrees

The shadow on the dial moved backward by ten degrees instead of forward.

This reversed the normal direction time always seemed to move.

No ordinary weather or shadow trick explains a shift like this.

The same God who spoke creation into order can bend its ordinary patterns to prove His word.

⏪ The shadow moved backward, not forward
🌗 This broke the normal pattern of time
🚫 No natural explanation accounts for it
📖 God can bend His own patterns freely

# Isaiah 38:9-14
# 📜 The Writing Of Hezekiah
---
## ✍️ The Writing Of Hezekiah

The writing of Hezekiah introduces a poem the king composed himself.

Most psalms in scripture come from David or from temple singers.

This one is rare because a reigning king wrote it about his own brush with death.

What follows are his private words, preserved so every later reader can feel exactly what he felt.

✍️ Hezekiah wrote this poem personally
👑 Kings rarely composed scripture themselves
💭 It records his own private thoughts
📖 His words were preserved for every later reader

## ⚰️ The Gates Of The Grave

The grave here translates a Hebrew word for the realm of the dead.

Gates suggest a boundary that, once crossed, cannot be crossed back again.

Hezekiah pictures himself already standing at that threshold, not merely worried about reaching it.

The image captures how sudden and final this diagnosis felt to him.

⚰️ The grave means the realm of the dead
🚪 Gates mark a boundary with no return
😨 Hezekiah felt he was already there
📖 The image shows how final death felt

## ⛺ As A Shepherd's Tent

A shepherd's tent was never meant to stay in one place.

It was built to be taken down quickly and carried to new pasture.

Hezekiah compares his own life to that impermanence, gone in what feels like a moment.

The picture is not of a slow decline but of a sudden, complete removal.

⛺ A shepherd's tent moved constantly
🏕️ It was never meant to be permanent
💨 Hezekiah felt his life vanish that fast
📖 The image shows sudden removal, not slow decline

## 🧵 Cut Off Like A Weaver

A weaver worked threads on a loom, cutting the finished cloth free at the end.

Hezekiah pictures his own life as that cloth, severed while still unfinished.

The image assumes a plan already in progress, not a life that simply ran out on its own.

Someone else controls the loom, and Hezekiah believed his thread was about to be cut short.

🧵 A weaver cuts finished cloth from the loom
😔 Hezekiah felt cut off unfinished
🧶 The image assumes a plan already underway
📖 Someone beyond Hezekiah controlled the thread

## 🐦 Like A Crane Or A Swallow

A crane and a swallow both make high, broken, anxious sounds.

Hezekiah says his own cries sounded that way, not calm or composed words.

He adds that he mourned as a dove, another bird known for a low, grieving call.

Three different bird sounds together paint a single picture of raw, wordless distress.

🐦 A crane and swallow cry out sharply
😢 Hezekiah's own cries sounded the same
🕊️ He also mourned like a grieving dove
📖 Three bird sounds picture raw distress

## 👀 Mine Eyes Fail With Looking Upward

Looking upward pictures a person straining toward heaven for help that has not yet come.

Eyes that fail describes the exhaustion of watching and hoping for so long.

Hezekiah is not giving up on God even here.

He is describing how tiring real, sustained hope can feel while the answer is still delayed.

👀 Looking upward pictures straining toward heaven
😩 Failing eyes describes exhausted hope
🙏 Hezekiah has not given up on God
📖 Real hope can still feel exhausting to hold

# Isaiah 38:15-17
# 💔 From Bitterness To Grace
---
## 🚶 I Shall Go Softly All My Years

Go softly pictures a slow, careful walk rather than a confident stride.

Hezekiah does not expect to forget what he has just been through.

He expects the memory of this near death experience to shape how he lives from now on.

Humility, not confidence, becomes the tone of the years he has left.

🚶 Go softly means a careful, humbled walk
💭 Hezekiah will not forget this ordeal
🕰️ It will shape the rest of his life
📖 Humility follows a brush with death

## 🌿 By These Things Men Live

These things refers back to the word and promise God had just spoken to him.

Hezekiah is not talking about food, air, or ordinary survival here.

He means that a life is genuinely sustained by God's own word and presence.

Without that word reaching him, no doctor or remedy could have changed the outcome.

🌿 These things means God's own word
💨 It is not just food or air
🙌 God's word actually sustains a life
📖 No remedy works without God's word behind it

## 💧 For Peace I Had Great Bitterness

Hezekiah admits the suffering was real, not something he is pretending did not hurt.

Peace here does not mean the pain was avoided.

It means God used that very bitterness to bring him to a deeper peace afterward.

The bitterness was not wasted, since it became the path to something better on the other side.

💧 The suffering was genuinely painful
🕊️ Peace came through the bitterness, not around it
🌱 Nothing about the pain was wasted
📖 God can turn real pain into real peace

## 🙌 Cast All My Sins Behind Thy Back

Casting something behind the back is an old picture of removing it from view completely.

Hezekiah connects his physical healing directly to the forgiveness of his sins.

He is not only thanking God for more years but for mercy already shown.

The same chapter that heals his body also settles the deeper matter of his guilt.

🙌 Cast behind the back means removed from view
❤️ Hezekiah links healing to forgiveness
🙏 He thanks God for mercy already given
📖 Healing and forgiveness arrive together here

# Isaiah 38:18-20
# 🎶 The Living Shall Praise Thee
---
## 🔇 The Grave Cannot Praise Thee

Ancient Israel understood the grave as a place of silence, cut off from temple worship.

Hezekiah is not describing where a soul finally rests in eternity.

He is describing why staying alive mattered so much to him in this moment.

Every day still breathing was another day he could still bring God praise.

🔇 The grave meant silence, not worship
🕍 Israel connected worship with the temple
🙏 Hezekiah valued each living day
📖 Life itself becomes a reason to praise

## 🗣️ The Living, The Living, He Shall Praise Thee

The phrase repeats itself on purpose, once for emphasis and once again for weight.

Hezekiah is not simply stating a fact here.

He is declaring his own resolve to actually do it, not merely acknowledge it.

The repetition turns a quiet observation into a personal, determined vow.

🗣️ The repeated phrase adds real weight
💭 It is more than a simple fact
🙌 Hezekiah is making a personal vow
📖 Repetition turns an idea into a resolve

## 👨‍👧 The Father To The Children Shall Make Known Thy Truth

This line looks past Hezekiah's own lifetime toward the next generation entirely.

Faith in this culture was expected to pass from a father directly to his children.

Manasseh, born in the very years God added, would grow up hearing this exact story.

One man's rescue was never meant to end with him alone.

👨‍👧 Faith was meant to pass to children
👶 Manasseh would grow up hearing this story
🔗 This truth reaches beyond Hezekiah's own life
📖 A rescue is meant to be passed on

## 🎵 Sing My Songs To The Stringed Instruments

A stringed instrument here likely means something like a harp used in temple worship.

Hezekiah is not only planning to pray quietly.

He commits to public, musical worship for the rest of his life in the house of the LORD.

Private gratitude turns into a lifelong, public habit of praise.

🎵 Stringed instruments were used in temple worship
🙏 Hezekiah commits to public worship now
🕍 This becomes a lifelong habit in the temple
📖 Gratitude turned into a lasting practice

# Isaiah 38:21-22
# 🩹 The Sign And The Remedy
---
## 🩹 A Lump Of Figs

A lump of figs served as an ancient remedy applied to infected skin.

Isaiah instructs that it be laid directly on the boil troubling Hezekiah.

God's healing did not skip the ordinary means available at the time.

The miracle of fifteen added years still worked through a real, physical treatment.

🩹 A fig lump was an ancient remedy
🧴 It was applied directly to the boil
🙌 God still used an ordinary treatment
📖 A miracle can still work through real means

## ❓ What Is The Sign

Hezekiah's question about a sign actually happened earlier in the timeline than it appears here.

Isaiah often groups events by theme rather than by strict order, and this chapter does the same.

The sign in question is the very sundial miracle already described back in verses seven and eight.

Placing the question here ties the whole chapter together as one connected account of the same healing.

❓ This question happened earlier in the timeline
📚 Isaiah often orders events by theme
🕰️ The sign refers back to the sundial
📖 The chapter ties every piece to one healing
`.trim();

export const ISAIAH_THIRTY_EIGHT_PERSONAL_SECTIONS = parseIsaiahThirtyEightRawNotes(ISAIAH_THIRTY_EIGHT_RAW_NOTES);
