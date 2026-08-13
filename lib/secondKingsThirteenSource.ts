export type SecondKingsThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsThirteenRawNotes(rawText: string): SecondKingsThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsThirteen\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsThirteen\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsThirteen\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 13:${startVerse}` : `2 Kings 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Kings 13 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_THIRTEEN_RAW_NOTES = `# SecondKingsThirteen 13:1-3
# 👑 Jehoahaz Reigns In Israel
---
## 📅 The Three And Twentieth Year Of Joash

Israel's kings were dated by the reign of the king of Judah at the time.

This Joash is the boy king of Judah from the chapter before this one.

A different king named Joash appears later in this very chapter.

He rules Israel, not Judah, and he is a completely different person.

Keep the two Joashes separate as this chapter unfolds.

📅 Israel's kings are dated by Judah's king

👑 This Joash rules Judah, from the last chapter

⚠️ A second Joash appears later, ruling Israel

➡️ Two different kings share one name here

## 🏛️ Reign Over Israel In Samaria

Samaria was the capital city of the northern kingdom of Israel.

King Omri built it decades earlier as a new capital, replacing older cities.

Every king named in this chapter rules from this same city.

The name Samaria will later apply to the whole surrounding region as well.

🏛️ Samaria was Israel's capital city

👑 Omri built it as a new capital

🔁 Every king in this chapter rules from it

📖 The name later covers the whole region

## 🗡️ Jehoahaz The Son Of Jehu

Jehu was the general who tore down Baal worship and ended Ahab's dynasty.

That story fills 2 Kings 9 and 10.

God had promised Jehu that his own sons would sit on Israel's throne for four generations.

Jehoahaz is the first of those promised sons now taking the crown.

🗡️ Jehu ended Ahab's dynasty and Baal worship

📖 Told in 2 Kings 9 and 10

👑 God promised Jehu four generations on the throne

➡️ Jehoahaz is the first son to inherit it

## 😡 Followed The Sins Of Jeroboam The Son Of Nebat

This exact line is used for nearly every king of Israel in this book.

Jeroboam was the first king of the northern kingdom, generations earlier.

He built golden calves at Bethel and Dan so people would not travel to worship in Jerusalem.

Every king after him kept those calves standing, including Jehu, who tore down Baal but left this alone.

😡 A repeated verdict used for Israel's kings

🐂 Jeroboam built golden calves long before

🏛️ Bethel and Dan replaced Jerusalem worship

📖 Even reforming kings left the calves standing

# SecondKingsThirteen 13:4-7
# 🙏 A Savior For A Suffering Nation
---
## 🙏 Jehoahaz Besought The LORD

To beseech means to beg or plead urgently.

Jehoahaz is the son of a king who tore down Baal worship, yet he still kept the golden calves standing.

Even so, when Syria crushed his nation, he turned and pleaded with the LORD.

God does not wait for a perfect prayer before He listens.

🙏 Besought means begging urgently

😔 Jehoahaz still worshiped the golden calves

📣 He cried out anyway under pressure

➡️ God can hear an imperfect prayer

## 👂 The LORD Hearkened Unto Him

Hearkened means God listened and then acted on what He heard.

The text explains exactly why, He saw the oppression of Israel.

Syria's king was grinding the nation down, and God took notice of the suffering itself.

Mercy here is tied to compassion for the people, not to any reform by their king.

👂 Hearkened means God listened and acted

😢 God saw the people's real suffering

⚔️ Syria was crushing the whole nation

📖 Compassion moved God, not the king's reform

## 🕊️ The LORD Gave Israel A Saviour

The text does not name this saviour directly.

Many scholars believe this points to a king who pushed Syria back, possibly Jehoash later in this same chapter.

Others connect it to Assyria's rise, which pulled Syria's attention away from Israel entirely.

Either way, the deliverance came from outside Israel's own strength.

🕊️ The saviour is not named directly

👑 Many scholars point to a king here

🗺️ Others point to Assyria's rise nearby

➡️ Israel's rescue did not come from itself

## 🏕️ Dwelt In Their Tents, As Beforetime

This does not describe Israel going back to a nomadic desert lifestyle.

Tents here stands for ordinary daily life, home, family, and safety.

As beforetime means life returned to how it was before Syria's constant raids.

The relief was real, even if it did not last.

🏕️ Tents here means ordinary daily life

🏠 Not a return to desert wandering

🔁 Beforetime means life as it used to be

📖 Real relief came, even if brief

## 🌲 There Remained The Grove Also In Samaria

A grove here was not a stand of trees for shade.

It was an Asherah pole, a wooden object tied to worship of a Canaanite fertility goddess.

Samaria was Israel's capital city, the center of national life.

Rescue from Syria did not lead to removing this idol from the very heart of the nation.

🌲 A grove was an Asherah worship pole

👸 Asherah was a Canaanite fertility goddess

🏛️ Samaria was Israel's own capital

📖 Relief did not lead to real reform

## ⚔️ Made Them Like The Dust By Threshing

Threshing was how grain was separated from its husk, usually by crushing it under a heavy sledge or trampling feet.

The dust was what was left over, worthless and scattered.

Comparing Israel's army to threshed dust pictures total military collapse.

Only fifty horsemen and ten chariots remained from what had once been a real fighting force.

⚔️ Threshing crushed grain to separate it

💨 Dust was the worthless leftover part

📉 Israel's army was crushed the same way

📖 A once real army had almost vanished

# SecondKingsThirteen 13:8-13
# 👑 Two Kings Named Joash
---
## 📚 The Book Of The Chronicles Of The Kings Of Israel

This closing formula appears again and again throughout the book of Kings.

It points to a royal record that no longer exists today, not the Bible book called Chronicles.

The writer is telling the reader, more detail exists, just not here.

📚 A now lost royal record book

🚫 Not the same as the Bible's Chronicles

✍️ The writer points to more detail elsewhere

➡️ Kings often summarizes rather than retells

## 😴 Slept With His Fathers

This phrase is a common way Kings describes a king's death.

It pictures death as rest, joining ancestors who died before him.

Jehoahaz is buried in Samaria, the capital where he had reigned.

😴 A common way Kings describes death

⚰️ Death pictured as joining dead ancestors

🏛️ Jehoahaz was buried in his own capital

➡️ The next king takes the throne at once

## 👑 Joash His Son Reigned In His Stead

This new king is named Joash, the same name as the king of Judah introduced back in verse one.

They are two completely different men from two different kingdoms.

This Joash is also called Jehoash later in this chapter, since both names were used for the same king.

Watch for both names as the chapter continues, they refer to the same person.

👑 A second king also named Joash

🗺️ This one rules Israel, not Judah

🔀 He is also called Jehoash later

➡️ Same person, two spellings of one name

## 📅 The Thirty And Seventh Year Of Joash

This is the same dating system already explained at the start of this chapter.

Israel's kings are dated by how long Judah's king had already been reigning.

Fourteen years have passed in Judah's timeline since Jehoahaz first took Israel's throne.

The two kingdoms' histories stay locked together year by year.

📅 The same dating system as before

👑 Counted by Judah's king's own years

⏳ Fourteen years have passed since verse one

📖 Both kingdoms share one connected timeline

## 🔁 He Departed Not From All The Sins Of Jeroboam

This is now the third king in a row from Jehu's line to keep the golden calves standing.

Jehu tore down Baal worship with real zeal in 2 Kings 10.

That zeal never reached the calves at Bethel and Dan, and none of his sons removed them either.

A dynasty can fix one problem and still pass down another one unchanged.

🔁 A third king keeps the same sin

🗡️ Jehu had zeal against Baal worship

🐂 That zeal never touched the golden calves

📖 One reform does not undo every sin

## ⚔️ Fought Against Amaziah King Of Judah

This line briefly points ahead to a real war between Israel and Judah.

Amaziah was the king of Judah who would later challenge this Jehoash to battle.

That whole conflict is told in full two chapters ahead, in 2 Kings 14.

Two kingdoms that shared one God still went to war with each other.

⚔️ Points ahead to a real war

👑 Amaziah ruled Judah at that time

📖 The full story comes in 2 Kings 14

➡️ Shared faith did not prevent conflict

## 🎯 Jeroboam Sat Upon His Throne

This Jeroboam is not the first Jeroboam who built the golden calves generations earlier.

He is remembered as Jeroboam the second, son of this Jehoash.

His reign turns out to be long and militarily strong, told later in 2 Kings 14.

Kings often reuses names across generations, so each one has to be placed carefully.

🎯 A different Jeroboam than the first

👑 Known to history as Jeroboam the second

📖 His long reign appears in 2 Kings 14

➡️ Names repeat, so context decides who is who

# SecondKingsThirteen 13:14-17
# 🏹 Elisha's Final Prophecy
---
## 😢 Fallen Sick Of His Sickness Whereof He Died

Elisha is dying of ordinary illness, not a dramatic or sudden event.

His mentor Elijah never died at all.

Elijah was taken up into heaven in a whirlwind back in 2 Kings 2.

Elisha's own ending looks completely different, slow, human, and ordinary.

Even the greatest prophets still faced natural death.

😢 Elisha dies of plain old illness

🌪️ Elijah instead was taken up alive

⚖️ Their endings look completely different

📖 Even great prophets face natural death

## 👑 O My Father, My Father, The Chariot Of Israel

King Joash says the exact words Elisha once cried out over Elijah in 2 Kings 2:12.

Now the king applies that same title to Elisha himself.

Chariot and horsemen were symbols of military strength and protection in that world.

Calling a prophet this shows Elisha was worth more to Israel's safety than any army.

👑 Joash repeats Elisha's own words about Elijah

🐴 Chariot and horsemen symbolized military strength

🛡️ Elisha protected Israel more than any army

📖 A prophet outweighed the whole military

## 🏹 Elisha Put His Hands Upon The King's Hands

Elisha does not just speak the next instruction.

He physically guides the bow while the king holds it.

Physical touch like this appears elsewhere in scripture as a way of passing on blessing or power.

The prophet's strength stands directly behind the king's own action here.

🏹 Elisha physically guides the king's bow

🤝 Touch often carried blessing in scripture

💪 The prophet's power backs the king's act

➡️ God works through the contact itself

## 🌅 Open The Window Eastward

Syria sat to the east of Israel.

Opening a window in that direction aimed the coming action straight at the enemy.

This is a prophetic sign act, a symbol acted out instead of just spoken.

🌅 East was the direction toward Syria

🎯 The window aimed right at the enemy

🎭 A symbol acted out, not spoken

➡️ The action itself carried the message

## 🏆 The Arrow Of The LORD's Deliverance

Elisha names the shot arrow itself as a sign of coming victory.

This is not magic working through the arrow.

It is a promise from God acted out so the king could see it, not just hear it.

🏆 The arrow symbolizes a coming victory

🚫 Not magic working through the object

👁️ A promise made visible, not just spoken

📖 God let the king see the promise

## 🗺️ Smite The Syrians In Aphek

Aphek was a real city, the site of an earlier battle between Israel and Syria back in 1 Kings 20.

Naming that exact place ties this new promise to a past victory Israel already remembered.

The same battlefield now becomes the site of hope again.

🗺️ Aphek was a real Israelite battle site

📖 It appears earlier in 1 Kings 20

🔁 An old battlefield becomes new again

➡️ Past victories fed this new promise

# SecondKingsThirteen 13:18-21
# ⚰️ A Half Victory And A Living Miracle
---
## 🎯 Smite Upon The Ground

Elisha gives the king a second symbolic action, this time with the arrows themselves against the ground.

This is not a random gesture.

It pictures how completely, or how weakly, Syria would be struck down.

🎯 A second sign act with the arrows

🚫 Not a random or empty gesture

📉 It pictured how hard Syria would fall

➡️ The king's effort here would matter

## ✋ He Smote Thrice, And Stayed

Thrice means three times.

Stayed means he simply stopped.

Joash strikes the ground only three times and quits, instead of continuing with real effort.

Nothing in the instructions told him to stop that early.

✋ Thrice means three separate times

🛑 Stayed means he simply stopped

😴 Nothing told him to quit that soon

➡️ Half effort produced a half result

## 😠 The Man Of God Was Wroth With Him

Wroth means deeply angry.

Elisha's anger is not about the number three itself.

It reveals that the king's own lack of zeal set the real limit on his victory.

God's power was ready to give more than the king was willing to reach for.

😠 Wroth means deeply angry

🔢 The anger was not about the number itself

😔 The king's own effort set the limit

📖 God offered more than the king took

## 🔮 Thou Shalt Smite Syria But Thrice

Elisha turns the king's own half hearted act into a fixed limit.

This line is not the end of the story.

It sets up exactly what happens later in this same chapter, when Joash beats Syria three times and no more.

A single half finished gesture ends up shaping real events years later.

🔮 The half act becomes a real limit

🎯 It points forward within this chapter

⚔️ Joash later wins exactly three times

➡️ One small choice shaped a bigger outcome

## 🌱 The Bands Of The Moabites Invaded The Land

Coming in of the year refers to springtime, the season armies usually marched again after winter.

Elisha's death does not pause the danger surrounding Israel.

Moabite raiders take advantage of the moment almost immediately.

🌱 Coming in of the year means springtime

⚔️ That season was when armies usually marched

😢 Danger returned right after Elisha's death

➡️ Israel's threats did not pause for grief

## 💀 Touched The Bones Of Elisha, He Revived

Men burying another body in haste toss it into the nearest available tomb, which happens to be Elisha's own grave.

The moment the dead man's body touches Elisha's bones, he comes back to life and stands up.

This is the only miracle in the Old Testament worked through contact with a prophet's remains after his own death.

Even in the grave, Elisha's connection to God's power had not run out.

💀 A rushed burial lands in Elisha's tomb

⚡ Touching his bones brought a dead man back

🦴 The only miracle like it here

📖 God's power outlasted the prophet's own life

# SecondKingsThirteen 13:22-25
# 🛡️ Mercy That Outlasted The Oppressor
---
## ⚔️ Hazael King Of Syria Oppressed Israel

This line returns to summarize the whole period already described earlier in the chapter.

Hazael was the Syrian king Elisha had anointed years earlier, back in 2 Kings 8.

Elisha gave a grim warning then about the harm Hazael would cause.

That warning had now played out in full across Jehoahaz's entire reign.

⚔️ This line summarizes the earlier chapter

🗡️ Elisha anointed Hazael back in 2 Kings 8

😢 His harm matched Elisha's old warning

➡️ A grim prophecy had fully come true

## 🤝 Because Of His Covenant With Abraham, Isaac, And Jacob

This covenant goes back to a promise God made generations earlier in Genesis.

God promised to bless Abraham's family and give them a land.

Israel had broken faith with God again and again throughout this chapter.

God's patience here rests on His own old promise, not on Israel's behavior.

🤝 A promise made generations earlier to Abraham

📖 Israel kept breaking faith throughout this chapter

🙏 God's patience rested on His own word

➡️ Old promises can outlast present failure

## ⏳ Neither Cast He Them From His Presence As Yet

As yet is the key phrase here, it signals a limit, not a guarantee.

This mercy toward the northern kingdom would not last forever.

Later in 2 Kings, this same kingdom is finally carried off into exile for good.

⏳ As yet means a limit, not a promise

🛡️ Mercy protected Israel for now

😢 Exile still comes later in 2 Kings

📖 Patience delayed judgment, it did not cancel it

## 👑 Hazael King Of Syria Died

Hazael's death closes out a threat that had loomed over Israel for years.

His son Benhadad takes the throne next, a name shared with an earlier Syrian king from years before.

Kings changing does not automatically mean danger ends, but it does open a new chapter in the conflict.

👑 Hazael's long threat finally ends

👦 His son Benhadad takes the throne

🔁 A name already used by an earlier king

➡️ A new ruler meant a new chance

## 🏆 Three Times Did Joash Beat Him

This is the exact fulfillment of Elisha's limit from earlier in this chapter.

Joash strikes the ground only three times back then, and now he defeats Syria exactly three times, no more.

A half hearted act years earlier had set the ceiling on this victory precisely.

🏆 This fulfills Elisha's earlier limit exactly

🎯 Three strikes on the ground, three real wins

😔 A half hearted act had set the ceiling

📖 Small choices can shape years of outcome

## 🏙️ Recovered The Cities Of Israel

Even with a limited victory, real cities were won back from Syria.

This closes the chapter on a note of partial restoration rather than final defeat.

The mercy promised back in verse twenty three had not run out.

God kept working through an imperfect king toward a real, if incomplete, recovery.

🏙️ Real cities were still won back

⚖️ The chapter ends in partial restoration

🙏 The earlier promised mercy had not run out

📖 God worked through an imperfect king anyway
`.trim();

export const SECOND_KINGS_THIRTEEN_PERSONAL_SECTIONS = parseSecondKingsThirteenRawNotes(SECOND_KINGS_THIRTEEN_RAW_NOTES);
