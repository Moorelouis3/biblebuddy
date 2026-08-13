export type SecondKingsFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsFourteenRawNotes(rawText: string): SecondKingsFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsFourteen\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsFourteen\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsFourteen\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 14:${startVerse}` : `2 Kings 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Kings 14 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_FOURTEEN_RAW_NOTES = `# SecondKingsFourteen 14:1-4
# 👑 Amaziah Begins To Reign In Judah
---
## 📅 The Second Year Of Joash Son Of Jehoahaz

This dating formula ties Judah's new king to Israel's king again.

Joash son of Jehoahaz is the king from the previous chapter, ruling Israel.

Amaziah becomes king of Judah at this same moment.

Two kingdoms keep sharing one clock, even while living very different stories.

📅 Dated by Israel's king again

👑 Joash ruled Israel, not Judah

🔗 Two kingdoms share one timeline

📖 Their stories stay interwoven throughout

## 👩 Jehoaddan Of Jerusalem

Judah's official record consistently names the mother of each king.

Israel's parallel record almost never includes this detail.

Jehoaddan of Jerusalem is named here as Amaziah's mother.

A queen mother often carried real influence inside the royal court.

👩 Judah names each king's mother

🚫 Israel's record rarely does this

👑 Queen mothers held real influence

📖 One detail marks two royal customs

## 👴 Yet Not Like David His Father

Father here does not mean Amaziah's actual father.

It means ancestor, the way Bible writers often use the word.

David reigned many generations before Amaziah, not right before him.

Every king of Judah gets measured against David's own loyalty to God.

Amaziah passes that test only partly.

👴 Father here means ancestor

📏 David sets Judah's own standard

⚖️ Amaziah passes that test partly

📖 Every king gets measured by David

## 🔁 According To All Things As Joash His Father Did

Joash here really is Amaziah's own father this time.

Chapter twelve already showed his mixed record, real reform without full follow through.

Amaziah copies that same pattern instead of improving on it.

A son can inherit a parent's exact ceiling instead of raising it.

👨‍👦 Joash was Amaziah's real father

📜 Chapter twelve showed his mixed record

🔁 Amaziah repeats that same pattern

➡️ Sons can inherit ceilings, not just faith

## ⛰️ Howbeit The High Places Were Not Taken Away

High places were local hilltop shrines used for sacrifice and incense.

God had commanded that worship stay centered at the temple in Jerusalem.

This same sentence appears about nearly every king of Judah.

The repetition itself is the point, one habit outlives king after king.

⛰️ High places were hilltop shrines

🕍 Worship belonged at the temple

🔁 This same line repeats often

📖 One habit outlived many kings

# SecondKingsFourteen 14:5-7
# ⚖️ Justice For The Fathers, And Victory Over Edom
---
## ⚔️ Slew His Servants Which Had Slain The King His Father

This finally punishes the conspirators who murdered Joash back in chapter twelve.

Amaziah waited until his own throne was fully secure before acting.

Justice moved slowly here, but it still moved.

A crime does not stop being real just because years pass.

⚔️ Punishes Joash's murderers from chapter twelve

👑 He waited until his throne was secure

⏳ Justice was delayed, not denied

📖 Time does not erase real guilt

## 📜 According Unto That Which Is Written In The Book Of The Law Of Moses

This law comes from Deuteronomy chapter twenty four.

It states plainly that a father's guilt does not transfer to his children.

Each person answers only for their own sin.

Amaziah could have executed entire families for revenge, and the law forbade it.

He chose the law instead of his own anger.

📜 Points back to Deuteronomy twenty four

⚖️ Guilt does not pass down family lines

🙅 Each person answers for their own sin

📖 Amaziah chose law over personal anger

## 🗺️ He Slew Of Edom In The Valley Of Salt Ten Thousand

The valley of salt sat south of the Dead Sea, near Edom's border.

Edom had broken free from Judah's control generations earlier, in Jehoram's reign.

Amaziah wins back real ground through a decisive military victory.

Ten thousand is not a rounded guess, it is the number the record keeps.

🗺️ Valley of salt sat near Edom

🚩 Edom had broken free earlier

⚔️ Amaziah wins a real victory

📖 The record keeps an exact number

## 🏙️ Called The Name Of It Joktheel Unto This Day

Selah was the Edomite city Amaziah captured in this battle.

Renaming a conquered city was a common way to mark new ownership.

Joktheel likely means something close to subdued by God.

The new name became Judah's way of writing this victory onto the map.

🏙️ Selah was the captured city

🔄 Renaming marked a change of ownership

🙏 Joktheel points toward God's power

📖 A victory got written onto the map

# SecondKingsFourteen 14:8-10
# 🌵 The Parable Of The Thistle And The Cedar
---
## 🗣️ Come, Let Us Look One Another In The Face

This phrase sounds like a friendly invitation to meet in person.

In context, it is actually a challenge to battle.

Amaziah's Edom victory made him confident enough to challenge a stronger king.

One win can tempt a leader to reach for a fight he cannot win.

🗣️ Look in the face means fight

🏆 Edom's victory fueled his confidence

⚔️ This is a real war challenge

➡️ One win can tempt overreach

## 🌲 The Thistle That Was In Lebanon Sent To The Cedar

Jehoash answers with a short fable instead of a direct reply.

A thistle is a small thorny weed.

A cedar is Lebanon's tallest and strongest tree.

The thistle in the story asks the cedar for its daughter in marriage.

Jehoash is comparing Amaziah to the weed and himself to the towering tree.

🌵 A thistle is a small weed

🌲 A cedar is Lebanon's tallest tree

😏 Jehoash casts Amaziah as the thistle

📖 The comparison mocks Amaziah's ambition

## 🐾 There Passed By A Wild Beast, And Trode Down The Thistle

The fable ends with an animal simply crushing the thistle by accident.

The thistle never even reaches the cedar to finish its request.

Jehoash is warning that Amaziah could be destroyed without Israel even trying hard.

A story can carry a threat that plain words might soften.

🐾 A beast crushes the thistle by accident

🚫 The thistle never reaches the cedar

⚠️ Jehoash warns of easy destruction

📖 A story can carry a real threat

## ⚠️ Why Shouldest Thou Meddle To Thy Hurt

To meddle means getting involved in a conflict that does not concern you.

Jehoash tells Amaziah plainly to stay home and enjoy his one real victory.

Pride from beating Edom is pushing Amaziah toward a fight he cannot win.

The warning covers Amaziah and all of Judah together with him.

🗣️ Meddle means picking an unneeded fight

🏠 Jehoash tells him to stay home

💔 Pride from Edom fed this decision

📖 The warning covers all of Judah too

# SecondKingsFourteen 14:11-14
# ⚔️ Judah Defeated At Bethshemesh
---
## 🙉 Amaziah Would Not Hear

Jehoash's whole warning gets ignored here in one short line.

Amaziah had every reason to back down and chose to fight anyway.

This pattern shows up again and again across the kings of Judah.

Refusing good counsel is often the last step before real disaster.

🙉 Amaziah ignores a clear warning

⚔️ He chooses to fight anyway

🔁 This pattern repeats across many kings

➡️ Refused counsel often comes before disaster

## ☀️ Bethshemesh, Which Belongeth To Judah

Bethshemesh means house of the sun, a town on Judah's western border.

This same town already appears far earlier in the book of First Samuel.

The ark of the covenant returned there after its capture by the Philistines.

A place once linked to God's presence now becomes the site of defeat.

☀️ Bethshemesh means house of the sun

📦 The ark returned there in First Samuel

📉 Now it becomes the site of defeat

📖 One place holds two different stories

## 📉 Judah Was Put To The Worse Before Israel

Judah loses this battle badly and completely.

Fled every man to their tents is an old expression for a full retreat.

It does not mean the soldiers literally lived in tents at this point.

It simply means the army scattered and each man ran for home.

📉 Judah lost this battle badly

🏃 To their tents means a full retreat

🏠 It means running home, not literal tents

📖 A whole army simply scattered

## 🧱 Brake Down The Wall Of Jerusalem... Four Hundred Cubits

A cubit was about the length of a forearm, close to eighteen inches.

Four hundred cubits works out to around six hundred feet of broken wall.

The gate of Ephraim and the corner gate mark two real points on Jerusalem's wall.

This was not a symbolic gesture, it left the city genuinely exposed.

📏 A cubit was about eighteen inches

🧱 About six hundred feet of wall fell

🚪 Named gates mark the real damage

📖 Jerusalem was left truly exposed

## 💰 Took All The Gold And Silver... And Hostages

Jehoash strips both the temple treasury and the king's own house.

Earlier kings had already used these same treasuries to buy off enemies.

Hostages guaranteed that Judah would not retaliate right away.

A challenge Amaziah started ends with his own capital stripped bare.

💰 Temple and palace both plundered

🔁 The same treasuries used before

🔒 Hostages discouraged quick retaliation

📖 His own challenge backfired completely

# SecondKingsFourteen 14:15-18
# 😴 Jehoash's Death And Amaziah's Later Years
---
## 📖 The Rest Of The Acts Of Jehoash... Are They Not Written

Jehoash's reign actually began back in the previous chapter.

Kings often delays a king's closing formula until a related story finishes.

The Syria wars from chapter thirteen and this fight with Amaziah share one reign.

Waiting to close the account keeps a full life inside one connected story.

📖 Jehoash's reign began in chapter thirteen

⏳ Kings can delay a closing formula

⚔️ Syria wars and this fight share one reign

➡️ One king's story gets told as a whole

## 👑 Jeroboam His Son Reigned In His Stead

This Jeroboam already appeared briefly at the very end of chapter thirteen.

He becomes known to history as Jeroboam the second.

His own long reign gets told in full later in this chapter.

Kings often introduces a name early, then circles back with the full story.

👑 Already named in chapter thirteen

🎯 Known to history as Jeroboam the second

🔁 Kings often circles back to early names

📖 His full reign comes later here

## ⏳ Lived After The Death Of Jehoash Fifteen Years

Amaziah keeps his throne even after losing badly to Jehoash.

Fifteen more years pass before his own story finally ends.

A king can survive a humiliating defeat and still keep ruling for years.

Survival is not the same thing as restored honor.

👑 Amaziah keeps his throne after defeat

⏳ Fifteen more years pass first

🛡️ Survival did not mean restored honor

➡️ Losing badly does not always end a reign

## 📚 The Book Of The Chronicles Of The Kings Of Judah

This is Judah's version of the same kind of royal record already named for Israel.

Judah and Israel each kept their own official history.

Neither record survives today, only these summary lines remain.

Kings points the reader to a fuller history it does not retell.

📚 Judah kept its own royal record

🔀 Distinct from Israel's record last chapter

🚫 Neither record survives today

📖 Kings points to history it cannot retell

# SecondKingsFourteen 14:19-22
# 🗡️ Conspiracy Against Amaziah, And Azariah's Reign
---
## 🗡️ They Made A Conspiracy Against Him In Jerusalem

Amaziah dies the exact same way his own father Joash died back in chapter twelve.

Two kings from one family both fall to a palace conspiracy.

The defeat at Bethshemesh likely weakened his standing with his own officials.

A humiliated king often loses more than territory.

🗡️ Amaziah dies like his father Joash

👨‍👦 Two kings, same family, same fate

📉 Bethshemesh likely weakened his standing

➡️ Humiliation can cost more than land

## 🏰 He Fled To Lachish

Lachish was a major fortified city southwest of Jerusalem, toward the coastal plain.

Fleeing there was an attempt to find safety far from the capital.

The conspirators were determined enough to send men after him anyway.

Distance alone could not undo a plot already in motion.

🏰 Lachish was a fortified southern city

🏃 He fled there seeking safety

🗡️ Conspirators pursued him anyway

📖 Distance could not stop the plot

## 🐴 Buried At Jerusalem With His Fathers In The City Of David

Bringing him back on horses shows the disgrace of his death.

Judah still buries him with real honor, inside the city of David.

Disgraceful death and honorable burial sit side by side in this one verse.

His office as king still carried weight, even after a shameful end.

🐴 Horses show the disgrace of his death

🏙️ City of David shows real honor

⚖️ Disgrace and honor sit together

📖 An office outlasted its holder's shame

## 🗳️ All The People Of Judah Took Azariah

Azariah is also known by the name Uzziah in later chapters and other books.

The people of Judah, not just the officials, choose him as king here.

He is only sixteen years old when this happens.

A nation in crisis turns to a teenage heir rather than falling apart.

👑 Azariah is also called Uzziah later

🗳️ The whole people chose him

👦 He was only sixteen years old

📖 A young heir steadied a shaken nation

## ⚓ He Built Elath, And Restored It To Judah

Elath was a port city on the Red Sea, valuable for trade routes.

Amaziah's earlier victory over Edom back in verse seven had reopened this territory.

Azariah finishes what his father's Edom campaign had started.

One king's battlefield win can hand the next king a peacetime opportunity.

⚓ Elath was a Red Sea port

🗺️ Amaziah's Edom win opened this territory

🏗️ Azariah built on his father's victory

📖 One king's war can fund another's peace

# SecondKingsFourteen 14:23-29
# 👑 Jeroboam The Second Reigns In Israel
---
## ⏳ Reigned In Samaria Forty And One Years

Forty one years makes this the longest reign of any king in Israel's history.

His father Jehoash already appeared fighting Amaziah earlier in this chapter.

Political stability here does not equal spiritual faithfulness, as the next verse shows.

A long reign can still be a wasted one.

⏳ Longest reign in Israel's history

👨‍👦 His father Jehoash appears earlier in this chapter

⚖️ Stability did not equal faithfulness

➡️ A long reign can still be wasted

## 😔 He Departed Not From All The Sins Of Jeroboam The Son Of Nebat

This Jeroboam is not the same man who first built the golden calves.

That first Jeroboam ruled generations earlier, at the very start of Israel's kingdom.

Sharing his exact name here is a striking irony.

A king named after the original sinner still repeats the same old sin.

🔀 Two different men, same name Jeroboam

🐂 The calves go back to the first king

😔 This Jeroboam repeats the old sin

📖 A shared name became a quiet accusation

## 🐋 By The Hand Of His Servant Jonah

This Jonah is the same prophet from the Old Testament book that carries his name.

Gathhepher was his hometown, a small town in the territory of Zebulun.

Long before his famous trip to Nineveh, Jonah speaks this promise here in Israel.

One prophet's ministry can include both a local promise and a foreign mission.

🐋 Same Jonah as the book of Jonah

🏘️ Gathhepher was his hometown

🗺️ This word comes before Nineveh

📖 One prophet served near and far

## 😢 The LORD Saw The Affliction Of Israel, That It Was Very Bitter

This affliction is the same crushing pressure from Syria already described in the last chapter.

Bitter here means the suffering was severe, not a mild inconvenience.

None shut up, none left means no one remained with any power to help.

God's rescue came from compassion, the same pattern already shown for Jehoahaz.

😢 The same Syrian pressure from last chapter

⚖️ Bitter means severe, not mild

🚫 No one was left with power to help

📖 Compassion drove God's rescue again

## 🛡️ Saved Them By The Hand Of Jeroboam The Son Of Joash

Jeroboam never once turns from Israel's old idolatry, the verse before already said so.

God still uses him as the actual instrument of Israel's rescue.

Being used by God is not the same thing as being approved by God.

Mercy toward the nation did not depend on this king's own faithfulness.

🚫 Jeroboam never turned from idolatry

🛡️ God still used him to save Israel

⚖️ Being used differs from being approved

📖 National mercy did not depend on the king

## 🗺️ Recovered Damascus, And Hamath, Which Belonged To Judah, For Israel

These borders stretch close to the size of the kingdom under Solomon generations earlier.

Damascus and Hamath had been enemy territory pressing hard on Israel for years.

This military success fulfills the very deliverance the LORD had already promised.

Prosperity like this later drew the prophet Amos to warn of coming judgment.

🗺️ Borders approach Solomon's old size

🏙️ Damascus and Hamath had pressed Israel

✅ This fulfills the promise from the verse before

📖 This prosperity later drew Amos's warnings

## 👑 Zachariah His Son Reigned In His Stead

Zachariah is the fourth generation of Jehu's dynasty God had promised back in chapter ten.

That promise said Jehu's sons would sit on Israel's throne for four generations, no more.

Zachariah's own reign lasts only months before it ends in violence.

A promise measured in generations reaches its exact edge right here.

👑 Zachariah is Jehu's fourth generation

🔢 God's promise named exactly four generations

⚔️ His reign ends quickly and violently

📖 The promised limit arrives right on time
`.trim();

export const SECOND_KINGS_FOURTEEN_PERSONAL_SECTIONS = parseSecondKingsFourteenRawNotes(SECOND_KINGS_FOURTEEN_RAW_NOTES);
