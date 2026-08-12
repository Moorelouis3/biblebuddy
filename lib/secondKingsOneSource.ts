export type SecondKingsOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsOneRawNotes(rawText: string): SecondKingsOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsOne\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsOne\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsOne\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 1:${startVerse}` : `2 Kings 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Kings 1 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_ONE_RAW_NOTES = `# SecondKingsOne 1:1-2
# 🪟 The King Falls Through A Lattice
---
## 🚩 Moab Rebelled Against Israel

Moab had been forced to serve Israel and pay tribute for years.

Ahab's death removed the king who had kept that arrangement in place.

Rebelled means Moab stopped sending its yearly payment of sheep and wool.

Kings often marks a ruler's death by noting who breaks away the moment he is gone.

🐑 Moab paid tribute in sheep and wool

👑 Ahab's death opened the door

🚩 Rebelled means they stopped paying

📖 Political fallout often follows a king's death

---

## 👑 After The Death Of Ahab

Ahab was Ahaziah's own father.

This whole chapter opens right after Ahab dies.

Ahaziah had only reigned over Israel about two years by this point.

First Kings already showed him worshiping Baal, just like his parents.

👑 Ahab was Ahaziah's own father

📆 Ahaziah had reigned about two years

⛪ He already worshiped Baal like his parents

📖 This chapter closes out his short reign

---

## 🪟 Fell Down Through A Lattice In His Upper Chamber

A lattice was a crisscross wood screen covering a window opening.

It let in air and light without leaving the window fully open.

The upper chamber was a private room built on the flat roof of the house.

Ahaziah's weight broke through it and he fell to the floor below.

🪟 Lattice means a crisscross window screen

🏠 Upper chamber sat on the roof

📉 Ahaziah fell straight through it

➡️ A private space became a dangerous fall

---

## 🪰 Enquire Of Baalzebub The God Of Ekron

Ekron was one of five major Philistine cities, west of Israel.

Baalzebub means lord of the flies.

Many scholars believe Israelite scribes twisted the god's real name, Baal Zebul, lord of the high place, into an insult.

Ahaziah sent all the way to a foreign god just to ask if he would recover.

🏙️ Ekron was a Philistine city

🪰 Baalzebub means lord of the flies

😏 The name was likely a mocking twist

📖 Israel's own king turned to a foreign god

---

## 📜 He Sent Messengers, And Said Unto Them, Go, Enquire

Sending messengers to ask a god for a diagnosis was common across the ancient world.

Israel's own law commanded God's people to ask the LORD alone in times like this.

Ahaziah had access to true prophets his entire life and skipped them anyway.

His choice was not just foolish, it broke a direct command.

📜 Asking a god for healing was common

⚖️ Israel's law required asking the LORD alone

🙅 Ahaziah had true prophets available already

➡️ His choice broke a direct command

# SecondKingsOne 1:3-6
# 👼 The Angel Sends Elijah To Intercept
---
## 👼 The Angel Of The LORD

This messenger appears again and again through the Old Testament at key moments.

Sometimes the angel of the LORD speaks with the same authority as God himself.

Here the angel gives Elijah his instructions directly, without a vision or a dream.

Elijah does not need to search for God's will, it comes straight to him.

👼 A recurring messenger in the Old Testament

🗣️ Sometimes speaks with God's own authority

📩 Elijah gets direct instructions here

➡️ No vision or dream was needed

---

## 🏘️ Elijah The Tishbite

Tishbite means Elijah came from a town called Tishbe.

First Kings already showed him calling down fire on Mount Carmel.

He also fled from Jezebel, Ahaziah's own mother, right after that contest.

Now the son of the woman who once hunted him needs to hear from him.

🏘️ Tishbite means from the town Tishbe

🔥 Elijah already called fire down at Carmel

🏃 He once fled from Jezebel herself

📖 Now her son needs his message

---

## 🇮🇱 The Messengers Of The King Of Samaria

Samaria was the capital city of the northern kingdom of Israel.

Ahab built it as his royal residence, and his sons ruled from there after him.

The angel identifies these men by that city, not just by name.

That detail ties this whole scene straight back to the royal palace.

🏛️ Samaria was Israel's capital city

👑 Ahab built it as the royal seat

📜 The angel names them by that city

➡️ The scene ties straight to the throne

---

## ❓ Is It Not Because There Is Not A God In Israel

This question is not really a question, it is an accusation.

Israel was the one nation on earth that actually knew the true God.

Ahaziah skipped past the LORD entirely and sent all the way to Ekron instead.

The insult is that Israel's own king acted like the true God did not exist.

❓ A rhetorical question, not real doubt

🇮🇱 Israel already knew the true God

🚶 Ahaziah went around God completely

📖 His own choice insulted the LORD

---

## ⚰️ But Shalt Surely Die

This is a direct death sentence, delivered before Ahaziah even hears it.

The bed mentioned is the sickbed he fell into after breaking the lattice.

Ahaziah sought a diagnosis by way of a false god, and God sends him the truth instead.

The messengers now carry a verdict, not a diagnosis.

⚰️ A direct death sentence is given

🛏️ The bed is his own sickbed

🚫 He sought a diagnosis, got a verdict

📖 God answers louder than Baalzebub could

---

## ⏱️ Why Are Ye Now Turned Back

Ekron was a real journey away, several days round trip at least.

The messengers are back far too soon for that trip to be finished.

Ahaziah immediately senses something interrupted their errand.

His question already shows he suspects an intervention happened.

🛣️ Ekron was days away round trip

⏱️ The messengers returned far too fast

🤔 Ahaziah immediately suspects something

📖 A short return raises his question

# SecondKingsOne 1:7-8
# 🧥 The Hairy Man Is Identified
---
## ❓ What Manner Of Man Was He

Ahaziah does not ask for a name first, he asks for a description.

That order suggests he already fears he knows who sent this message.

A description will confirm his suspicion before he says the name out loud.

Dread often arrives before the name does.

❓ The king asks for a description first

😨 He may already fear who it was

🔍 A description will confirm his fear

📖 Dread often comes before the name

---

## 🧥 An Hairy Man, And Girt With A Girdle Of Leather About His Loins

Hairy man likely describes a rough garment made of animal hair, not just body hair.

A girdle of leather was a wide belt worn around the waist to hold the garment in place.

This simple, rough clothing marked a prophet living apart from comfort and luxury.

Centuries later, John the Baptist is described wearing this same kind of clothing.

🧥 Hairy likely means a rough hair garment

🪢 A girdle of leather was his belt

🏜️ This showed a life apart from comfort

📖 John the Baptist later dressed the same way

---

## ⚡ It Is Elijah The Tishbite

Ahaziah needs only one detail to know exactly who sent this word.

He had grown up in Ahab and Jezebel's house hearing about this prophet.

Recognition here is instant, and so is the dread that follows it.

The king already knows this is not a message he can ignore.

⚡ One detail is enough to identify him

🏠 Ahaziah grew up hearing of Elijah

😰 Recognition brings instant dread

➡️ Not a message he can ignore

# SecondKingsOne 1:9-12
# 🔥 Fire Falls On Two Captains
---
## 🪖 A Captain Of Fifty With His Fifty

Ancient armies were commonly organized into units of ten, fifty, and a hundred.

A captain of fifty led exactly fifty soldiers under his command.

Sending a full unit shows Ahaziah expects Elijah to resist or fight back.

He is treating a prophet like an enemy soldier, not a man of God.

🪖 Armies were split into set unit sizes

🔢 A captain of fifty led fifty men

⚔️ Ahaziah expects real resistance

📖 He forgets he is facing a prophet

---

## ⛰️ He Sat On The Top Of An Hill

Elijah is not hiding or fleeing from armed men.

High ground gave him a clear view of anyone approaching.

His posture already shows he is not afraid of fifty soldiers.

Calm confidence sets the tone before a single word gets spoken.

⛰️ Elijah sits calmly on high ground

👀 High ground gave him a clear view

😌 His posture shows no fear

📖 Confidence comes before the confrontation

---

## 🗣️ Thou Man Of God, The King Hath Said, Come Down

The captain uses a respectful title, man of God, then gives a blunt order anyway.

He treats Elijah's authority as something the king's word can simply override.

That mix of respect and command is really an act of disrespect.

Fire is about to answer exactly how wrong that assumption was.

🗣️ A respectful title hides a blunt order

👑 The king's word is treated as final

⚠️ That mix is really disrespect

📖 Judgment answers the wrong assumption

---

## 🔥 If I Be A Man Of God, Then Let Fire Come Down From Heaven

Elijah turns the captain's own title back on him as a challenge.

If that title is true, then God himself can prove it right now.

This same kind of fire already answered Elijah's prayer once before, on Mount Carmel.

God is not silent when His prophet's identity gets treated as a bluff.

🔥 Elijah turns the title into a test

⚡ Fire will prove the claim true

🏔️ The same fire answered him at Carmel

📖 God backs His prophet's identity

---

## ⚠️ Consumed Him And His Fifty

Fifty one men die because of one arrogant order given by a king.

The judgment falls only on the men sent to force Elijah down by threat.

A second captain arrives right after and repeats the exact same mistake.

He even makes the demand ruder, adding the word quickly.

🔥 Fifty one men die from one order

⚠️ Only the threatening messengers are judged

🔁 A second captain repeats the mistake

➡️ His demand adds an even ruder tone

---

## 😤 Come Down Quickly

The second captain adds one word the first did not use, quickly.

That single word shows he learned nothing from the first captain's death.

Impatience and pride replace any caution a wise man would have felt.

The same fire falls, this time with the exact same result.

⚡ Quickly is one added, prideful word

🚫 He learned nothing from the first death

😤 Pride replaced any real caution

📖 The same judgment falls again

# SecondKingsOne 1:13-15
# 🙏 The Third Captain Kneels
---
## 🙇 Fell On His Knees Before Elijah

The first two captains stood and issued commands.

This third captain kneels the moment he arrives.

His posture admits what the other two refused to see, real power stands in front of him.

Humility here comes only after watching a hundred men die.

🙇 The third captain kneels immediately

🚫 The first two only stood and commanded

👀 His posture admits real power is present

📖 Humility followed a costly lesson

---

## 🙏 Besought Him, And Said Unto Him

Besought means begged or pleaded with someone earnestly.

The captain does not command Elijah the way the first two did.

He pleads on his knees instead, fully aware of what is at stake.

His tone has completely reversed from the arrogance shown twice already.

🙏 Besought means begged earnestly

🙇 He pleads instead of commanding

😨 He knows exactly what is at stake

➡️ His tone reverses the earlier arrogance

---

## 💎 Let My Life... Be Precious In Thy Sight

Precious in thy sight is an old way of asking someone to value a life highly.

The captain is not commanding Elijah, he is begging him.

He asks the same mercy for his fifty men still standing behind him.

This plea protects the very men the first two captains put at risk.

💎 Precious in thy sight means valued highly

🙏 A plea, not a command

👥 He pleads for his fifty men too

📖 His words protect his own men

---

## 👀 Burnt Up The Two Captains Of The Former Fifties

The third captain names exactly what happened to the men before him.

Repeating it out loud shows he understands the danger is completely real.

This is not guesswork, he likely saw the smoke and the aftermath himself.

Fear grounded in fact, not just rumor, produces real humility.

🔥 He names what happened to the others

👀 He witnessed the danger firsthand

🚫 This is fact, not rumor

📖 Real fear produced real humility

---

## 🚶 Go Down With Him, Be Not Afraid Of Him

God tells Elijah exactly what to do, without leaving him to guess.

Be not afraid suggests even Elijah might have felt the danger in that moment.

This time Elijah does not send another fiery answer, he goes in person.

Obedience looks different depending on what God actually asks for each time.

🗣️ God gives Elijah a clear instruction

😨 Even Elijah may have felt afraid

🚶 This time he goes in person

📖 Obedience changes shape each time

# SecondKingsOne 1:16-18
# ⚰️ The Word Comes True
---
## 🗣️ Is It Not Because There Is No God In Israel To Enquire Of His Word

Elijah says the exact same words the messengers already carried.

Nothing changes when he says it to the king's face instead of through others.

He does not soften the message just because a king is now listening in person.

Standing before a throne raised the risk, but it never changed the truth.

🗣️ Elijah repeats the same message directly

🚫 Nothing softens now that a king listens

👑 Facing a throne raised the real risk

📖 Truth does not change based on the audience

---

## ✅ So He Died According To The Word Of The LORD

Every detail Elijah spoke back in verse four comes true exactly as stated.

Ahaziah never leaves the bed he fell into after breaking through the lattice.

The whole chapter traces one spoken word of judgment landing precisely on target.

Scripture keeps confirming that God's spoken word does not fail.

✅ Every detail from verse four comes true

🛏️ Ahaziah never leaves that same bed

🎯 God's word lands exactly on target

📖 A pattern scripture repeats often

---

## 👑 Jehoram Reigned In His Stead

Jehoram was Ahaziah's own brother, another son of Ahab and Jezebel.

The throne of Israel passes sideways here, not to a son.

Second Kings follows Jehoram's own reign in the chapters just ahead.

Confusingly, Judah's king at this exact time is also named Jehoram.

👑 Jehoram was Ahaziah's brother

↔️ The throne passes sideways, not to a son

📖 His reign begins in the next chapters

➡️ Judah's king shares the same name

---

## 🚫 Because He Had No Son

Ahaziah left no son who could take the throne after him.

Without an heir, the crown had to pass to the next male in line.

That is exactly why his brother, not his own child, becomes king.

A simple family fact quietly decided who ruled next.

🚫 Ahaziah had no son to inherit

👨‍👦 The crown needed a male heir

🔁 His brother inherited it instead

📖 A family detail decided the succession

---

## 📚 The Book Of The Chronicles Of The Kings Of Israel

This is not the same book as First and Second Chronicles in the Bible.

It was a separate royal record that no longer exists today.

Kings often points to this lost source for readers who want more detail.

Its disappearance does not weaken what the Bible itself already recorded.

📚 A lost royal record, not the Bible's Chronicles

❌ This document no longer survives today

🔍 Kings often points to it for more detail

📖 The Bible's own account still stands complete
`.trim();

export const SECOND_KINGS_ONE_PERSONAL_SECTIONS = parseSecondKingsOneRawNotes(SECOND_KINGS_ONE_RAW_NOTES);
