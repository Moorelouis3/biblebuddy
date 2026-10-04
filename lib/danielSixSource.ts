export type DanielSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielSixRawNotes(rawText: string): DanielSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 6:${startVerse}` : `Daniel 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Daniel 6 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_SIX_RAW_NOTES = `# Daniel 6:1-3
# 👑 Daniel Rises Above The Princes
---
## 👑 An Hundred And Twenty Princes

Darius split his huge kingdom into smaller pieces to govern it.

Each of the hundred and twenty princes ruled one of those pieces, called a province.

Many historians recognize this title as what later writers called a satrap.

Running an empire this size took hundreds of trusted local rulers.

👑 Princes ruled one province each

🗺️ The kingdom was split into pieces

📚 Historians call this role a satrap

➡️ One empire needed many trusted rulers

## 🥇 Three Presidents, Of Whom Daniel Was First

Darius picked three men to oversee all hundred and twenty princes.

Daniel held the top spot among those three men.

This job let the princes report up through one clear chain of command.

Being first here means Daniel outranked every official in the kingdom except the king himself.

🥇 Daniel ranked first among the three

📊 Three presidents oversaw all the princes

🔗 One clear chain of command existed

➡️ Daniel outranked everyone except the king

## 🛡️ That The King Should Have No Damage

This system existed to protect the king from being cheated.

Every province had to answer for its own taxes and resources.

A king could lose enormous wealth to dishonest officials without this kind of oversight.

The structure protected Darius, not just Daniel.

🛡️ The system protected the king himself

💰 Officials answered for taxes and resources

⚠️ Dishonest officials could cost a king dearly

📖 Oversight protected the kingdom's wealth

## ✨ An Excellent Spirit Was In Him

"Excellent spirit" describes a quality of character, not special magic.

It means Daniel showed wisdom, honesty, and steady faithfulness others could see over time.

This same kind of language described Daniel back when Nebuchadnezzar first noticed him.

Decades had passed, and that same character still stood out.

✨ Excellent spirit means strong character

🧠 Wisdom and honesty marked Daniel

🔁 Nebuchadnezzar noticed this years earlier

📖 Character held steady across decades

## 👀 The King Thought To Set Him Over The Whole Realm

Darius was ready to promote Daniel above every other official in the empire.

That kind of favor from a king was rare and highly visible.

The other two presidents and all the princes would have noticed immediately.

Daniel's promotion was about to put a target on his back.

👑 Darius favored Daniel above everyone

👀 This favor was impossible to miss

😠 Other officials noticed the threat

➡️ Promotion made Daniel a target

# Daniel 6:4-9
# 📜 A Decree They Could Twist
---
## 🔍 Sought To Find Occasion Against Daniel Concerning The Kingdom

"Occasion" here means a legal excuse or formal charge.

The presidents and princes wanted a real accusation, not just gossip.

They needed something that would hold up if Darius ever questioned it.

Jealousy alone was not enough to bring down a man this trusted.

🔍 Occasion means a legal excuse

📋 They wanted a real accusation

⚖️ Gossip alone would not work

➡️ Jealousy needed a legal cover

## 🧹 Neither Was There Any Error Or Fault Found In Him

Daniel's enemies searched his entire record as a government official.

They found nothing, not even a small mistake.

This kind of clean record was rare for anyone holding real power.

Daniel's integrity left his accusers with nothing to use.

🔎 His enemies searched everything

🧹 They found not one mistake

🏆 This record was genuinely rare

📖 Integrity gave his accusers nothing

## 🎯 Except We Find It Against Him Concerning The Law Of His God

Daniel's enemies realize they cannot attack his work.

So they decide to attack his faith instead.

This plan only works because Daniel prays in a way everyone already knows about.

His own consistency becomes the very thing they use against him.

🎯 They shift from work to faith

🙏 Daniel's prayer habit was well known

😈 His consistency became the target

➡️ Enemies attack what cannot be hidden

## 📜 Ask A Petition Of Any God Or Man For Thirty Days, Save Of Thee, O King

This decree demanded that every request for thirty days go through the king alone.

No prayer to any other god was allowed during that time.

It was really a test of loyalty disguised as ordinary law.

Nobody could obey this and still pray the way Daniel did.

📜 The decree banned prayer to any god

⏳ It lasted for thirty full days

🎭 Loyalty was disguised as ordinary law

➡️ The law targeted Daniel directly

## 🦁 He Shall Be Cast Into The Den Of Lions

Lion dens were a real method of execution in the ancient Near East.

Being thrown into one meant near certain death.

This punishment was chosen to sound dramatic enough that nobody would risk breaking the law.

The threat alone was meant to guarantee obedience.

🦁 Lion dens were a real execution method

💀 Death there was almost certain

😨 The threat was meant to terrify

➡️ Fear was the whole point

## ⚖️ According To The Law Of The Medes And Persians, Which Altereth Not

Medes and Persian law worked differently than most ancient kingdoms.

Once a king signed a decree, not even he could undo it.

This made the law incredibly stable, but also incredibly dangerous.

The conspirators are counting on that very detail to trap Darius too.

⚖️ This law could never be changed

👑 Not even the king could undo it

🪤 The conspirators are counting on this

📖 Stability here becomes a trap

## ✍️ Wherefore King Darius Signed The Writing

Darius signs this decree without realizing what it actually targets.

He likely saw it as a normal act of loyalty toward himself.

He had no idea his own closest advisor would be caught inside it.

One signature was about to put Daniel's life at risk.

✍️ Darius signs without seeing the trap

👑 He thought it was simple loyalty

😧 He did not know Daniel was caught

➡️ One signature endangered his own friend

# Daniel 6:10-15
# 🙏 Found Praying As Before
---
## 🧭 His Windows Being Open In His Chamber Toward Jerusalem

Daniel prayed facing the direction of Jerusalem on purpose.

Jerusalem was where the temple used to stand before Babylon destroyed it.

Solomon had once prayed that exiled Israelites would pray this very way, facing that city.

Daniel's prayer connects directly back to that old promise.

🧭 Daniel faced Jerusalem on purpose

🕍 The temple once stood there

📖 Solomon prayed for this exact habit

➡️ Daniel kept an old promise alive

## 🙏 He Kneeled Upon His Knees Three Times A Day

Daniel prayed on his knees three separate times every single day.

The text adds that he did this "as he did aforetime," meaning this was his normal habit.

The decree did not scare Daniel into changing his routine at all.

He kept doing exactly what he always did, in plain view.

🙏 Three prayers happened every day

🔁 Aforetime means this was his habit

🚫 The decree did not change him

➡️ He prayed openly without hiding

## 👀 Found Daniel Praying And Making Supplication Before His God

Daniel's enemies did not have to search hard for proof.

He never tried to hide what he was doing.

"Supplication" means begging or asking earnestly, not casual conversation.

His enemies caught exactly the moment they were hoping for.

👀 Proof was never hard to find

🙏 Supplication means earnest, pleading prayer

🎯 Daniel never tried to hide this

➡️ His enemies got what they wanted

## 🌍 That Daniel, Which Is Of The Children Of The Captivity Of Judah

This phrase reminds Darius that Daniel is a foreigner, not a native Babylonian or Mede.

Judah was the Jewish kingdom conquered decades earlier by Babylon.

The accusers mention this detail to make Daniel sound like an outsider.

They want the king to see him as different, not simply loyal.

🌍 Daniel was a foreign exile

⛓️ Judah was conquered long before

😈 Accusers frame him as an outsider

➡️ His background becomes a weapon

## 😠 Regardeth Not Thee, O King, Nor The Decree That Thou Hast Signed

The accusers make it sound like Daniel disrespects Darius personally.

In reality, Daniel respected the king in everything except this one impossible command.

His prayer was never rebellion against Darius himself.

It was loyalty to a higher authority the decree could not override.

😠 Accusers frame this as disrespect

🙏 Daniel respected the king otherwise

👑 His prayer was not rebellion

📖 Loyalty to God came first

## 😔 Sore Displeased With Himself

Darius reacts with real regret, not pride or anger like Nebuchadnezzar once did.

"Sore displeased" means deeply upset, almost sick about his own mistake.

He realizes too late that he signed away his power to protect a friend.

This king, unlike earlier ones in Daniel, genuinely did not want this outcome.

😔 Sore displeased means deeply upset

🔁 Unlike earlier kings in this book

😣 Darius regretted his own decision

➡️ He never wanted this outcome

## ☀️ Laboured Till The Going Down Of The Sun To Deliver Him

Darius spent the entire day searching for any legal way out.

"Laboured" shows real effort, not a quick, careless attempt.

Nothing he tried could undo a law that altereth not.

By sunset, the king had completely run out of options.

☀️ Darius searched all day long

💪 Laboured means real, exhausting effort

🚫 No legal escape could be found

➡️ The king ran out of options

# Daniel 6:16-18
# 🦁 Sealed In The Lions' Den
---
## 👑 They Brought Daniel, And Cast Him Into The Den Of Lions

Darius has no legal way left to save Daniel.

He has to give the order himself, against his own wishes.

This is the exact punishment the decree promised back in verse seven.

Obeying his own law costs Darius the one thing he wanted to protect.

👑 Darius gives the order himself

😔 This goes against his own wishes

📜 The decree's punishment is now enforced

➡️ His own law costs him dearly

## 🗣️ Thy God Whom Thou Servest Continually, He Will Deliver Thee

Darius speaks these words to Daniel as the stone is about to seal the den.

He already recognizes that Daniel's God is real and powerful.

This is not Daniel comforting the king.

It is the king hoping out loud.

Darius has more faith in that moment than he probably realized.

🗣️ Darius speaks this hope aloud

🙏 He already believed God was real

🔁 The king hopes, not Daniel

➡️ Faith showed up in a desperate moment

## 🪨 A Stone Was Brought, And Laid Upon The Mouth Of The Den

A heavy stone covered the only opening into the lions' den.

This made escape physically impossible for Daniel.

It also made it impossible for anyone to secretly feed the lions or help him.

Whatever happened next would happen completely sealed off from outside hands.

🪨 A stone sealed the only opening

🚫 Escape became physically impossible

🙅 No outside help could reach him

➡️ Whatever happened was completely sealed

## 🔏 Sealed It With His Own Signet, And With The Signet Of His Lords

A signet was a personal stamp pressed into wax or clay to prove something untouched.

Using his own signet meant Darius wanted proof nobody secretly opened the den.

Adding the lords' signets too meant even they could not tamper with it alone.

Every powerful person in the room was locked out equally.

🔏 A signet proved something untouched

👑 Darius sealed it with his own

🤝 The lords sealed it too

📖 No one person could tamper alone

## 🍽️ Passed The Night Fasting

Darius skipped every meal that night out of genuine grief.

Fasting here shows real mourning, not just concern.

Kings rarely denied themselves comfort this completely.

His appetite disappeared along with his peace of mind.

🍽️ Darius skipped every meal

😢 Fasting showed genuine grief

👑 Kings rarely gave up comfort

➡️ His peace disappeared with his appetite

## 🎵 Neither Were Instruments Of Musick Brought Before Him

Kings in this culture normally had musicians and entertainment every evening.

Darius canceled all of it that night.

Silence in a palace built for constant celebration stood out immediately.

Every servant in that palace could tell something was deeply wrong.

🎵 Music usually filled the palace nightly

🔇 Darius canceled it completely

😟 The silence stood out immediately

➡️ Servants could tell something was wrong

## 😴 His Sleep Went From Him

Darius could not rest at all that night.

Worry kept him awake until morning.

This detail shows a king more attached to Daniel than to his own comfort.

His exhaustion matched the weight of what he had done.

😴 Darius could not sleep at all

😰 Worry kept him awake

❤️ He cared more about Daniel than comfort

📖 His exhaustion matched his guilt

# Daniel 6:19-23
# 🌅 Thy God Hath Delivered Thee
---
## 🌅 The King Arose Very Early In The Morning

Darius could not wait for a normal hour to check on Daniel.

He got up as soon as there was enough light to move.

A full night of worry drove him straight to the den.

Nothing about his schedule that morning was normal.

🌅 Darius rose before a normal hour

😰 A night of worry drove him

🏃 He rushed straight to the den

➡️ Nothing about that morning was normal

## 😢 He Cried With A Lamentable Voice Unto Daniel

"Lamentable" describes a voice full of grief, almost like mourning for the dead.

Darius does not expect good news when he calls out.

He sounds like a man bracing for the worst possible answer.

His voice reveals how little hope he actually had left.

😢 Lamentable means filled with grief

💭 Darius expected the worst news

😨 He sounded like he was mourning

➡️ His voice showed little remaining hope

## 🙌 O Daniel, Servant Of The Living God

Darius calls God "living" on purpose.

That is a direct contrast to the lifeless idols named back in chapter five.

That earlier chapter already described idols that cannot see, hear, or know anything.

This title alone shows how far Darius had come in understanding God.

🙌 Living God contrasts with dead idols

📖 Chapter five already made that contrast

🧠 Darius understood the real difference

➡️ His words showed real growth

## ❓ Able To Deliver Thee From The Lions

This question reveals real uncertainty, not confident faith.

Darius hopes Daniel's God can do this, but he genuinely does not know.

Belief and doubt sit side by side in this one question.

Many sincere prayers sound exactly like this one.

❓ The question reveals real uncertainty

🙏 Darius hoped without being sure

⚖️ Belief and doubt sat together

➡️ Sincere prayers often sound like this

## 👼 My God Hath Sent His Angel, And Hath Shut The Lions' Mouths

Daniel answers immediately, before Darius can even see him clearly.

An angel physically stopped the lions from attacking all night long.

This is not the first angel to appear and protect someone in this book.

God used a direct, visible method to answer this exact danger.

👼 An angel sealed the lions' mouths

🗣️ Daniel answered right away

🔁 Angels appear elsewhere in this book

📖 God answered danger directly

## ⚖️ Forasmuch As Before Him Innocency Was Found In Me

Daniel names two separate judges here.

God is the first judge, and his verdict matters most.

Daniel adds that Darius himself found him innocent too, since he never truly defied the king.

Both verdicts agree completely.

⚖️ Daniel names two separate judges

🙏 God found him innocent first

👑 Darius's own judgment agreed too

➡️ Both verdicts matched completely

## 🩹 No Manner Of Hurt Was Found Upon Him

Daniel came out of the den completely unharmed.

Not a single scratch marked his body anywhere.

Hungry lions had been locked in with him all night long.

This kind of total protection could not be explained any other way.

🦁 Hungry lions were locked in all night

🩹 Not one scratch was found

😲 This protection defied explanation

📖 God's protection was complete

## 🙏 Because He Believed In His God

This is the one sentence that explains everything that just happened.

Daniel's deliverance was not luck or coincidence.

His whole life, going back decades, had been built on this same trust.

That trust is exactly what carried him through the lions' den.

🙏 Belief explains the whole outcome

🚫 This was not luck or chance

📆 Decades of trust led to this

📖 Trust carried him through the den

# Daniel 6:24-28
# 👑 The Kingdom Bows To Daniel's God
---
## ⚖️ Cast Them Into The Den Of Lions, Them, Their Children, And Their Wives

Darius turns the same punishment back onto Daniel's accusers.

Ancient Near Eastern justice sometimes punished an entire household, not only the guilty person.

That custom explains why wives and children are included here.

This was common practice at the time, even though it still feels harsh to a modern reader.

⚖️ Darius reversed the punishment on them

👪 Entire households were sometimes punished

🌍 This matched the custom of that era

➡️ Justice here looked very different then

## 🦁 The Lions Had The Mastery Of Them, And Brake All Their Bones In Pieces

These same lions had not touched Daniel at all the night before.

Against his accusers, the lions acted with their full natural violence.

The contrast proves Daniel's safety was never about calm or tame animals.

It was entirely about God's protection, nothing less.

🦁 The same lions acted completely differently

🛡️ Daniel's safety was never about calm lions

💪 These lions were genuinely dangerous

📖 Protection, not luck, explains the difference

## 🌍 Wrote Unto All People, Nations, And Languages

This phrase describes the full reach of the Persian empire.

Darius sends this message to every group under his rule, not just his inner court.

The same phrase appears elsewhere in Daniel to describe total, worldwide authority.

What happened to Daniel was about to become public knowledge everywhere.

🌍 This phrase covers the whole empire

📜 Darius addressed every nation and language

🔁 Daniel uses this phrase elsewhere too

➡️ Daniel's story was about to spread everywhere

## 🔁 Men Tremble And Fear Before The God Of Daniel

The last decree in this chapter demanded worship directed only at Darius.

This new decree points every person in the empire toward Daniel's God instead.

Darius completely reverses the very law that nearly killed his friend.

One king's mistake becomes the reason an empire hears about the true God.

🔁 This decree reverses the last one

🙏 It points the empire toward God

😲 Darius undoes his own mistake

📖 One mistake led many to hear the truth

## 📖 He Is The Living God, And Stedfast For Ever

"Stedfast" is an old spelling of steadfast, meaning completely unchanging and reliable.

Darius contrasts this directly with the lifeless idols named earlier in the book.

A living, stedfast God does not rise and fall like human kingdoms do.

This is the exact lesson Nebuchadnezzar also learned the hard way in an earlier chapter.

🪨 Stedfast means unchanging and reliable

🙏 Darius contrasts this with lifeless idols

👑 Kingdoms rise and fall, God does not

📖 Nebuchadnezzar learned this lesson too

## 🪨 His Kingdom That Which Shall Not Be Destroyed

This phrase echoes the everlasting kingdom from Daniel's vision back in chapter two.

Every human empire in that vision eventually crumbled and was replaced.

God's kingdom was the one piece of that vision that never fell.

Darius is now repeating, without fully realizing it, a truth that vision already revealed.

📖 This echoes the vision from chapter two

👑 Human empires in that vision all fell

🪨 God's kingdom never fell

➡️ Darius repeats a truth already revealed

## ✨ He Delivereth And Rescueth, And He Worketh Signs And Wonders In Heaven And In Earth

Darius lists exactly what he watched happen with his own eyes.

Delivereth and rescueth describes exactly what happened to Daniel overnight.

Signs and wonders describes anything that proves God's power beyond normal explanation.

This whole decree grew out of one night Darius will never forget.

🛡️ Delivereth and rescueth describes Daniel's night

✨ Signs and wonders prove God's power

👑 Darius watched this happen personally

📖 One night changed what an empire believed

## 🦁 Who Hath Delivered Daniel From The Power Of The Lions

The decree ends by naming exactly what started this whole chapter.

Hungry lions were ready to destroy Daniel completely.

God's power reached further than any lion's jaw or any sealed stone.

Darius makes sure the entire empire knows exactly who gets the credit.

🦁 Lions were ready to destroy Daniel

🪨 No sealed stone stopped God's power

👑 Darius gives credit where it belongs

📖 The whole empire now knows the truth

## 📆 This Daniel Prospered In The Reign Of Darius, And In The Reign Of Cyrus The Persian

Daniel's career now stretches across multiple kings and even multiple empires.

Cyrus the Persian is the same king who later lets the Jewish exiles return home.

Daniel lived to see that empire rise after serving faithfully under Babylon and the Medes.

One faithful life quietly outlasted kingdom after kingdom.

📆 Daniel served through multiple empires

👑 Cyrus later frees the Jewish exiles

🏆 Daniel outlasted kingdom after kingdom

📖 Faithfulness outlived every throne around it
`.trim();

export const DANIEL_SIX_PERSONAL_SECTIONS = parseDanielSixRawNotes(DANIEL_SIX_RAW_NOTES);
