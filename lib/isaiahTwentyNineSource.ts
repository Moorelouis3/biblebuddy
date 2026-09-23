export type IsaiahTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwentyNineRawNotes(rawText: string): IsaiahTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 29:${startVerse}` : `Isaiah 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Isaiah 29 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWENTY_NINE_RAW_NOTES = `# Isaiah 29:1-4
# 🔥 Woe To Ariel
---
## 🔥 Woe To Ariel, To Ariel, The City Where David Dwelt

"Ariel" means altar hearth, the stone surface where sacrifices burned.

Many scholars believe the name can also mean lion of God.

Isaiah uses it here as a hidden name for Jerusalem.

David once captured this city and made it his own.

Naming Jerusalem after an altar was not a compliment.

The city that offered sacrifices is about to become one.

🔥 Ariel likely means altar hearth
👑 David once ruled this city
🦁 The name can also mean lion
📖 Jerusalem becomes its own altar

## 🍇 Add Ye Year To Year, Let Them Kill Sacrifices

This line is not a real invitation to keep worshiping.

It is sarcasm aimed at a people who trust in ritual instead of God.

Keep the festivals coming, Isaiah says, none of it will stop what is next.

The sacrifices themselves cannot buy off coming judgment.

🗓️ Keep the yearly feasts, God says
🎭 The line is sarcastic, not kind
🚫 Ritual alone cannot buy safety
📖 Empty religion never stops judgment

## 🏕️ I Will Camp Against Thee Round About

God himself becomes the attacking army here, not a foreign king.

"Camp against thee round about" describes a full siege, surrounding the city on every side.

A "mount" was a ramp of dirt and timber built up against a city wall.

Attackers used it to reach the top and break through.

"Forts" were wooden siege towers rolled close enough to attack the defenders directly.

🏕️ God surrounds the city himself
⛰️ A mount was a siege ramp
🗼 Forts were wooden siege towers
📖 The Lord leads this attack

## 👻 Thy Speech Shall Be Low Out Of The Dust

Jerusalem is pictured as a person brought down and barely able to speak.

Its voice sinks until it sounds like it comes from underground.

A "familiar spirit" was the term for a ghostly voice a medium claimed to summon from the dead.

The comparison is meant to shock.

Proud Jerusalem is reduced to a faint whisper, as if speaking from the grave.

👻 Jerusalem is pictured brought down low
🗣️ Its voice sinks into the dust
🔮 Familiar spirit means a medium's ghostly voice
📖 Pride can be reduced to a whisper

# Isaiah 29:5-8
# 💨 Vanished Like A Dream
---
## 💨 The Multitude Of Thy Strangers Shall Be Like Small Dust

"Strangers" here means the foreign armies gathered to attack Jerusalem.

A crowd that looked unstoppable is compared to dust that a breeze scatters.

"Chaff that passeth away" pictures the husks blown off grain at harvest, gone in a moment.

The army that seemed permanent is about to disappear just as fast.

💨 Strangers means the attacking armies
🌬️ Dust and chaff both scatter easily
🌾 Chaff was husks blown away at harvest
📖 A huge army can vanish that fast

## ⚡ Thou Shalt Be Visited Of The LORD Of Hosts With Thunder, And With Earthquake

God intervenes personally, not through another human army.

Thunder, earthquake, storm, and fire describe overwhelming, uncontrollable power.

Years later, Assyria's own army camped against Jerusalem and was struck down in a single night.

The rescue did not come from clever strategy.

⚡ God intervenes with his own power
🌩️ Thunder and earthquake picture overwhelming force
🏛️ This later matched Assyria's real defeat
📖 Rescue came from God, not strategy

## 💤 As A Dream Of A Night Vision

The whole attacking coalition is compared to something that only seemed real.

A dream feels solid while it lasts.

The moment the sleeper wakes, it is gone completely.

That is how fast this massive army will disappear from Jerusalem's sight.

💤 The attack is compared to a dream
😴 A dream feels real while it lasts
⏰ Waking erases it instantly
📖 The army disappears just as fast

## 🍽️ As When An Hungry Man Dreameth, And Behold He Eateth

This is an everyday picture stretched into two matching examples.

A starving man dreams of a feast and wakes up still empty.

A thirsty man dreams of water and wakes up still parched.

The nations who dreamed of conquering Zion will wake up with nothing to show for it.

🍽️ A hungry dreamer wakes still empty
💧 A thirsty dreamer wakes still parched
🎯 Zion's attackers dreamed of victory
📖 Their conquest turns out to be nothing

# Isaiah 29:9-12
# 📕 The Sealed Book
---
## 😳 Stay Yourselves, And Wonder... They Are Drunken, But Not With Wine

The people react to all this with shock and confusion.

They stagger and act confused the way a drunk person does.

Isaiah is clear that no actual wine caused it.

Something has clouded their ability to understand what God is doing.

😳 The people react in total shock
🥴 They stagger like drunk people
🍷 No real wine is involved
📖 Confusion here is spiritual, not physical

## 😴 The LORD Hath Poured Out Upon You The Spirit Of Deep Sleep

This "deep sleep" is not ordinary tiredness.

It is judgment, a spiritual numbness God allows to fall on people who already refused to listen.

The prophets and rulers, the very people meant to see clearly, are covered by it too.

Later New Testament writers describe this same kind of spiritual blindness among people who reject the truth.

😴 Deep sleep means spiritual numbness
⚖️ It comes as judgment, not accident
👁️ Even the prophets and rulers are covered
📖 Refusing truth can lead to real blindness

## 📕 The Vision Of All Is Become Unto You As The Words Of A Book That Is Sealed

God's message is pictured as a scroll closed with a wax seal.

A sealed scroll could not be opened or read until the seal was broken.

Handing someone a sealed book they are told to read is a picture of a message they cannot access.

The people have the words of God near them, yet cannot take hold of the meaning.

📕 The message is like a sealed scroll
🔒 A seal kept a scroll closed
📖 They cannot access what is right there
➡️ Nearness to truth is not understanding

## 🤷 Read This, I Pray Thee, And He Saith, I Am Not Learned

Isaiah gives two matching failures.

The educated man cannot read the scroll because it is sealed shut.

The uneducated man cannot read it because he never learned his letters.

Neither excuse is really the problem, since both point to a deeper inability no education could fix on its own.

🤷 Two different men, two different excuses
🔒 One cannot read because it is sealed
📚 The other cannot read because he is unlearned
📖 The real problem runs deeper than education

# Isaiah 29:13-14
# 👄 Near With Lips, Far With Hearts
---
## 👄 This People Draw Near Me With Their Mouth... But Have Removed Their Heart Far From Me

God names the exact problem behind the confusion in the verses before this.

The people still show up, still speak the right religious words.

Their hearts, the part that actually loves and trusts God, have quietly wandered off.

Centuries later Jesus quotes this very verse word for word to describe religious leaders of his own day.

👄 Their mouths still speak religious words
💔 Their hearts have wandered away
🔁 Jesus later quotes this exact verse
📖 Words without heart are empty worship

## 📜 Their Fear Toward Me Is Taught By The Precept Of Men

Real reverence for God should grow out of actually knowing him.

Instead, this generation's worship runs on rules other people handed down to them.

"Precept of men" means human tradition treated as if it carried God's own authority.

Following inherited habits is not the same thing as knowing the God those habits were meant to honor.

📜 Precept of men means human tradition
🔁 Their worship runs on inherited rules
🎭 Tradition replaced real reverence
📖 Habits are not the same as knowing God

## 🌟 I Will Proceed To Do A Marvellous Work... For The Wisdom Of Their Wise Men Shall Perish

God promises to act in a way that will stun everyone watching.

The very people who consider themselves wise will be shown to have no real understanding at all.

Paul later quotes this exact verse about the cross confusing the wisest minds.

Human cleverness cannot predict or contain what God is about to do.

🌟 God promises a shocking work
🧠 The wise will be shown wrong
✝️ Paul later quotes this about the cross
📖 God's plans outrun human cleverness

# Isaiah 29:15-16
# 🏺 Hiding From The Potter
---
## 🕶️ Woe Unto Them That Seek Deep To Hide Their Counsel From The LORD

Some leaders in Jerusalem are making secret plans, likely political deals with other nations.

They work in the dark on purpose, believing no one can trace what they are doing.

The next line reveals exactly what false confidence is driving this secrecy.

🕶️ Leaders make plans in secret
🌑 They work in the dark on purpose
🤫 They assume no one can trace it
📖 Secrecy from people is not secrecy from God

## 👀 Who Seeth Us, And Who Knoweth Us

This question says the quiet part out loud.

These plotters assume God cannot see what happens behind closed doors.

That assumption is the real sin being exposed here, more than the secret plan itself.

👀 The question reveals their true belief
🙈 They assume God cannot see them
⚠️ That assumption is the deeper problem
📖 Nothing stays hidden from God

## 🏺 Shall The Work Say Of Him That Made It, He Made Me Not

Isaiah pictures rebellious people as clay talking back to the potter who shaped it.

Clay has no right to claim the potter does not understand what he built.

This image flips the natural order, treating the created thing as wiser than its maker.

Paul later builds directly on this same picture when he writes about God's authority over what he creates.

🏺 Clay talking back to its potter
🙃 The order gets flipped upside down
🧱 The clay cannot outknow its maker
📖 Paul later builds on this same picture

# Isaiah 29:17-21
# 🌳 The World Turned Right Side Up
---
## 🌳 Lebanon Shall Be Turned Into A Fruitful Field

Lebanon was famous for its thick, wild forests of cedar trees.

Isaiah pictures that same wild forest becoming rich farmland.

At the same time, today's fruitful field will grow wild again like a forest.

The image describes a complete reversal, everything reordered by God's hand.

🌳 Lebanon was known for wild forests
🌾 It will become rich farmland instead
🔄 Farmland and forest will trade places
📖 God can reorder anything completely

## 👂 In That Day Shall The Deaf Hear The Words Of The Book

This is the same sealed book from earlier in the chapter, now finally opened.

The deaf hearing and the blind seeing describe restored spiritual understanding, not only physical healing.

Centuries later, Jesus points to exactly this kind of miracle as proof that he is the promised one.

👂 The sealed book is opened here
👁️ Deaf hearing pictures restored understanding
✝️ Jesus later points to this same sign
📖 What was closed becomes open again

## 😊 The Meek Also Shall Increase Their Joy In The LORD

"Meek" describes people with no power to defend themselves, easily pushed aside by others.

"The poor among men" describes those who have been overlooked and mistreated.

Both groups are promised real joy, not just quiet relief.

The people the world ignored are the ones God lifts up here.

😊 Meek means those with little power
💰 Poor among men means the overlooked
🎉 Both are promised real joy
📖 God lifts up who the world ignores

## 💀 The Terrible One Is Brought To Nought, And The Scorner Is Consumed

"The terrible one" describes a ruthless oppressor who ruled through fear.

"The scorner" describes someone who mocked God and mocked the people who trusted him.

Both figures look powerful right up until this promised reversal arrives.

Cruelty and mockery do not get the last word.

💀 The terrible one means a ruthless tyrant
🎭 The scorner means someone who mocks God
⚖️ Both are removed by this promise
📖 Cruelty does not get the last word

## ⚖️ That Make A Man An Offender For A Word, And Lay A Snare For Him That Reproveth In The Gate

"The gate" was the city entrance where elders heard legal cases and settled disputes.

Corrupt leaders twisted an honest witness's own words to convict him unfairly.

They set traps for anyone who spoke up against wrongdoing in that courtroom setting.

This promise means honest people will finally get real justice there.

⚖️ The gate was where court cases were heard
🎯 Leaders twisted honest words into charges
🪤 Traps caught anyone who spoke up
📖 Real justice is promised at last

# Isaiah 29:22-24
# 🕊️ Jacob No Longer Ashamed
---
## 🌍 Thus Saith The LORD, Who Redeemed Abraham

This unusual title looks all the way back to the very first patriarch.

Abraham's own family once worshiped other gods before God called him out.

Naming God this way reminds the reader that rescue has been his pattern from the very beginning of the story.

🌍 This looks back to Abraham himself
🙏 Abraham's family once worshiped other gods
📜 God called Abraham out of that
📖 Rescue has always been God's pattern

## 🙌 Jacob Shall Not Now Be Ashamed, Neither Shall His Face Now Wax Pale

Shame and a pale face describe the fear of coming disaster.

That fear has hung over this whole chapter, from the siege on Ariel onward.

Here it is finally lifted for good.

The nation that once trembled is promised real relief instead.

🙌 Shame and fear are finally lifted
🔥 That fear ran through this whole chapter
😌 Relief replaces dread completely
📖 God turns fear into peace

## 👨‍👧 When He Seeth His Children, The Work Of Mine Hands

Future generations who live faithfully will become living proof of what God has done.

Jacob's descendants seeing that faithfulness will honor God because of it.

A changed family becomes a testimony bigger than words alone.

👨‍👧 Faithful children prove God's work
👀 Seeing that faithfulness changes hearts
🙏 It leads people to honor God
📖 A changed family speaks louder than words

## 🧠 They Also That Erred In Spirit Shall Come To Understanding

This closes the chapter by undoing everything it opened with.

The deep sleep, the sealed book, the confusion, all of it reverses here.

Even those who complained and grumbled are promised real understanding at last.

The chapter that began with blindness ends with sight fully restored.

🧠 The chapter's blindness finally reverses
📕 The sealed book problem is undone
🗣️ Even grumblers gain real understanding
📖 Blindness ends in restored sight
`.trim();

export const ISAIAH_TWENTY_NINE_PERSONAL_SECTIONS = parseIsaiahTwentyNineRawNotes(ISAIAH_TWENTY_NINE_RAW_NOTES);
