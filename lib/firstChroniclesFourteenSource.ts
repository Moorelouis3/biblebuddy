export type FirstChroniclesFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesFourteenRawNotes(rawText: string): FirstChroniclesFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 14:${startVerse}` : `1 Chronicles 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 1 Chronicles 14 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_FOURTEEN_RAW_NOTES = `# FirstChronicles 14:1-2
# 🏗️ Hiram Builds David A House
---
## 🌊 Hiram King Of Tyre Sent Messengers To David

Hiram was the king of Tyre, a wealthy port city on the coast of Phoenicia.

Tyre traded in cedar wood, purple dye, and fine craftsmanship, not farmland or armies.

Sending messengers first was how ancient kings opened formal contact with a new ruler.

Hiram was not just being friendly.

He was recognizing David as a king worth doing business with.

🌊 Tyre was a wealthy coastal city
👑 Hiram ruled Phoenicia's trade power
✉️ Messengers opened formal royal contact
📖 Hiram treated David as a real king

---

## 🌲 Timber Of Cedars, With Masons And Carpenters

Israel had no cedar forests of its own, only stone and mudbrick materials.

Cedar from Lebanon was famous for its strength and pleasant smell.

It was prized across the whole region for building and trade.

Masons and carpenters were skilled builders Israel did not yet have in large numbers.

Hiram sent both the material and the workers, not just a gift of wood.

🌲 Cedar came from Lebanon's forests
🏗️ Israel lacked skilled builders of its own
🎁 Hiram sent material and workers together
📖 A real palace required outside help

---

## 🏠 To Build Him An House

An house here means a royal palace, David's own residence in Jerusalem.

This is not the temple, which Solomon builds many years later.

David wanted to live in a proper palace, not the tent Israel used to worship.

That contrast becomes an actual conversation in the very next chapter.

For now, this is simply David finally getting a permanent home.

🏠 An house means David's own palace
⛪ The temple comes later, under Solomon
⛺ Israel still worshipped from a tent
📖 A permanent palace came before a permanent temple

---

## 👀 David Perceived That The LORD Had Confirmed Him King

To perceive means to realize something clearly, not just guess at it.

David had already been anointed king years earlier, back in chapter eleven.

This moment with Hiram made that calling visible to the watching world outside Israel.

A foreign king building him a palace was proof his kingdom was real and lasting.

👀 Perceived means realizing something clearly
👑 David was anointed king back in chapter eleven
🌍 Hiram's help made that kingship visible abroad
📖 God's calling was now plain to see

---

## 📈 His Kingdom Was Lifted Up On High

Lifted up on high is an idiom meaning David's rule was now firmly established.

It is not a claim about David's own greatness.

The verse ties it directly to his people Israel, not to David alone.

A king in this book exists for the nation, not the nation for the king.

📈 Lifted up on high means firmly established
👑 This is about the kingdom, not David's ego
🇮🇱 The verse ties it to all Israel
📖 A king exists to serve his people

# FirstChronicles 14:3-7
# 👨‍👩‍👧‍👦 David's Family Grows In Jerusalem
---
## 💍 David Took More Wives At Jerusalem

David already had wives from his years ruling in Hebron.

Now that he reigns from Jerusalem, the chronicler records him taking still more.

God's law had warned kings directly not to multiply wives for themselves.

The text does not pause to praise this choice.

It simply records what happened.

💍 David already had wives from Hebron
🏙️ More wives came once he ruled from Jerusalem
📜 God's law warned kings against this pattern
📖 The record states it without excusing it

---

## 👶 David Begat More Sons And Daughters

Begat is an old word simply meaning fathered or had children.

Each new child strengthened David's growing house and its future claim to the throne.

A king's many children could also mean many rivals once he grew old.

That exact danger shows up later, in the fight over who would succeed him.

👶 Begat means fathered children
🏛️ More children meant a stronger royal house
⚔️ More sons could also mean future rivals
📖 That rivalry surfaces later in David's story

---

## 📜 The Names Of His Children Which He Had In Jerusalem

Chronicles already listed David's sons born earlier in Hebron, in chapter three.

This new list only covers children born after he moved to Jerusalem.

Being born in Jerusalem marked these sons as part of the settled, established kingdom.

The list itself is a quiet sign of how much David's reign had grown.

📜 Hebron sons were already listed in chapter three
🏙️ These sons were born in Jerusalem instead
👑 Jerusalem birth marked the settled kingdom
📖 The list shows how much David's reign grew

---

## 🤐 Shammua, And Shobab

Shammua and Shobab were both sons born to David by Bathsheba.

Their names appear again in the genealogy list back in chapter three.

Little is recorded about either son individually elsewhere in scripture.

Simply being named here preserved their place in David's family line permanently.

🤐 Shammua and Shobab were Bathsheba's sons
📜 Both appear again in chapter three
🙊 Scripture says little else about them
📖 Being named preserved their place in the family

---

## ✝️ Nathan, And Solomon

Nathan and Solomon were also sons of David through Bathsheba.

Solomon became the next king.

Solomon later built the temple in Jerusalem.

Nathan never became king himself.

Yet Luke's gospel traces Jesus back through Nathan's own line.

👑 Solomon became Israel's next king
🏛️ Solomon later built the temple
✝️ Nathan's line mattered just as much
📖 Luke traces Jesus through Nathan's line instead

---

## ✍️ Ibhar, Elishua, And Elpalet

Ibhar, Elishua, and Elpalet were three more sons born to David in Jerusalem.

Little else is recorded about any of these three men.

Ancient readers still valued a name being written down and remembered.

A name in scripture was treated as a small but permanent mark of belonging.

✍️ Three more sons born in Jerusalem
🙊 Scripture records little else about them
📛 Being named was itself an honor
📖 Every name here marked a real, remembered life

---

## ✨ Nogah, Nepheg, And Japhia

Nogah, Nepheg, and Japhia were three more of David's sons.

Nogah is a Hebrew word meaning brightness or light.

Names like this often carried a hopeful meaning chosen by a parent.

Even minor names in a genealogy can quietly point back to God's goodness.

✨ Three more sons of David
💡 Nogah means brightness in Hebrew
🙏 Parents often chose names with hope
📖 Small names still pointed back to God

---

## 🔄 Elishama, Beeliada, And Eliphalet

Elishama, Beeliada, and Eliphalet complete the list of sons born in Jerusalem.

Beeliada contains the word Baal, a term that could simply mean lord or master.

The parallel list in chapter three instead calls this same son Eliada.

Later scribes were likely careful about a name that echoed a false god's title.

Swapping out Baal for a safer word protected the name from that association.

👶 These three sons complete the Jerusalem list
📜 Beeliada contains the word Baal
🔀 Chapter three calls him Eliada instead
📖 Scribes were careful with names near Baal's title

# FirstChronicles 14:8-12
# ⚔️ The Philistines Attack At Baalperazim
---
## 🇮🇱 The Philistines Heard That David Was Anointed King Over All Israel

Until now, David had only reigned as king over Judah for several years.

Once all Israel united behind him, that changed completely.

A divided Israel had never threatened Philistine control of the region.

A united Israel was a completely different problem for them.

🇮🇱 David had ruled only Judah at first
🤝 All Israel now stood united behind him
🛡️ A divided Israel never threatened the Philistines
📖 A united Israel changed everything for them

---

## 🏃 David Heard Of It, And Went Out Against Them

David did not wait behind Jerusalem's walls for the Philistines to arrive.

He heard the report and moved out to meet the threat directly.

This matches a pattern already set back in chapter eleven.

David led from the front then too.

A king who leads his own army earns real trust from his people.

🏃 David moved out to meet the threat
🛡️ He did not wait behind the walls
👑 This matched his pattern of leading personally
📖 A leading king earns real trust

---

## 🗺️ Spread Themselves In The Valley Of Rephaim

The valley of Rephaim sat just southwest of Jerusalem, along a major route into the city.

Rephaim was also the name of an ancient people known for their unusual height.

Goliath's own family line is later connected to descendants of the Rephaim.

Camping in this valley put the Philistine army within a short march of David's capital.

🗺️ Rephaim valley sat near Jerusalem
📏 Rephaim was also a people of great height
🛡️ Goliath's family line traces back to them
📖 This camp threatened David's own capital

---

## 🙏 David Enquired Of God

To enquire of God meant asking through the proper channel, likely the priest and the ephod.

This is the opposite of what happened with the ark back in chapter thirteen.

There, David acted first and paid for it.

Here, before any battle plan, David stops and asks God directly.

🙏 Enquired means asking God through the priest
📦 Chapter thirteen showed acting without asking first
🛑 David stops to ask before this battle
📖 Asking first replaced acting first

---

## 🤝 Wilt Thou Deliver Them Into Mine Hand

David does not just ask whether to fight.

He asks whether God will actually hand him the victory.

God answers both questions plainly, with a clear yes.

An unclear plan became a certain one the moment God spoke.

❓ David asked more than just permission
🤝 He asked for a guaranteed outcome
✅ God answered with a plain yes
📖 A clear word replaced David's uncertainty

---

## 📍 They Came Up To Baalperazim And David Smote Them There

Baalperazim combines a word for lord or master with a word for breaking through.

Put together, the name means the place of breaking through.

David named the location right after winning there.

The victory itself is what gave this ground its lasting name.

📍 Baalperazim means the place of breaking through
⚔️ David won the battle at this spot
🏷️ The name came after the victory
📖 The win gave this ground its name

---

## 🌊 Like The Breaking Forth Of Waters

David compares this victory to a flood breaking through a dam.

Ancient readers knew how sudden and unstoppable a flash flood could be.

The image captures how quickly and completely the Philistine line collapsed.

David gives credit for that force to God, not to his own army's strength.

🌊 David compares the win to a flood
💥 Floods were sudden and unstoppable
⚔️ The Philistine line collapsed just as fast
📖 David credited God, not his own strength

---

## 🗿 When They Had Left Their Gods There

Armies in the ancient Near East often carried images of their gods into battle.

The idea was that the god's presence would help secure victory.

The Philistines fled in a hurry and left these idols on the field.

Their own gods could not even protect themselves, let alone the army carrying them.

🗿 Armies carried idols for protection in battle
🏃 The Philistines fled and left theirs behind
🙈 Their gods could not protect even themselves
📖 A fleeing army exposed powerless idols

---

## 🔥 David Gave A Commandment, And They Were Burned With Fire

God's law commanded Israel to burn the carved images of foreign gods.

David gives this order immediately, without needing to be told.

He treats the command from Deuteronomy as something to obey right away.

Destroying the idols also kept Israel's soldiers from being tempted to keep them.

🔥 God's law commanded burning foreign idols
📜 David obeyed that command right away
🚫 Burning them removed any temptation to keep them
📖 Obedience followed the victory immediately

# FirstChronicles 14:13-17
# 🌳 The Second Battle At The Mulberry Trees
---
## 🔁 The Philistines Yet Again Spread Themselves Abroad

One defeat did not end the Philistine threat.

They regroup and spread out across the same valley again.

A single victory rarely settles a conflict for good in this period of Israel's history.

David now faces a choice about whether to repeat his earlier plan.

🔁 The Philistines returned for another fight
🗺️ They spread out in the same valley
⚔️ One victory rarely ended a conflict
📖 David faced a new decision to make

---

## 🙏 David Enquired Again Of God

David does not assume the same plan will work twice.

He asks God for direction a second time, just as carefully as the first.

Repeating a winning strategy without asking again would have been an easy trap.

David avoids that trap by staying dependent on God each time.

🙏 David asked God a second time
🔁 He refused to assume the old plan
⚠️ Repeating a plan without asking was risky
📖 Staying dependent on God each time mattered

---

## 🔄 Go Not Up After Them, Turn Away From Them

This time God gives David the opposite instruction from before.

Instead of a direct charge, David is told to circle around them.

The exact same enemy required a completely different approach the second time.

God's guidance was not a fixed formula David could reuse without asking.

🔄 God gave the opposite instruction this time
🚶 David was told to circle around instead
⚔️ The same enemy needed a new approach
📖 God's guidance was never a fixed formula

---

## 🌳 Over Against The Mulberry Trees

Many scholars believe these were balsam or baca trees, not the mulberry tree known today.

Their exact identity is less important than where they stood.

They gave David's men enough natural cover to approach without being seen.

God's plan used ordinary trees to set up an ambush.

🌳 The trees may not match modern mulberries
👀 Their location mattered more than their name
🥷 The trees hid David's approaching men
📖 God used ordinary trees for an ambush

---

## 👂 A Sound Of Going In The Tops Of The Mulberry Trees

This sound was not wind moving through the branches on its own.

It was the sign God promised, meant to signal the exact moment to attack.

Ancient readers would have understood this as the sound of God's own army marching overhead.

David had to trust an invisible sign before he could see any actual result.

👂 The sound was a promised signal
🌬️ It was not ordinary wind
⚔️ It marked God's army moving ahead
📖 David had to trust the sign first

---

## 🎖️ God Is Gone Forth Before Thee

God is described here as marching ahead of Israel's own army.

David is not being sent into battle alone.

The actual fighting is described as something God does, with Israel following behind.

This picture of God as a warrior going first repeats throughout Israel's story.

🎖️ God marches ahead of Israel's army
🛡️ David does not fight alone
⚔️ God is pictured as a warrior here
📖 This picture repeats throughout Israel's story

---

## ✅ David Did As God Commanded Him

David follows the exact instructions this time, without changing a single detail.

This obedience stands in sharp contrast to the mistake with the ark in chapter thirteen.

There, David used a method the law never allowed.

Here, he does precisely what he was told, nothing more and nothing less.

✅ David followed the exact instructions
📦 This contrasts with the ark mistake earlier
🚫 That earlier method broke God's law
📖 This time obedience was exact

---

## 🗺️ From Gibeon Even To Gazer

Gibeon sat just a few miles northwest of Jerusalem.

Gazer, also spelled Gezer, was much farther away, near the coastal plain.

The distance between these two places shows how far David's men chased the fleeing army.

This was not a narrow win but a complete rout across a wide stretch of land.

📍 Gibeon sat near Jerusalem
🗺️ Gazer lay far off near the coast
🏃 The chase covered a wide distance
📖 This was a complete rout

---

## 🌍 The Fame Of David Went Out Into All Lands

David's reputation now reaches nations well beyond Israel's own borders.

This kind of widespread fame had not followed any king in Israel before him.

It echoes God's old promise to Abraham that his name would become great.

A king's fame here is treated as evidence of God's own hand on him.

🌍 David's fame spread far beyond Israel
👑 No earlier king had fame like this
📜 It echoed God's promise to Abraham
📖 Fame here pointed back to God's hand

---

## 😨 The LORD Brought The Fear Of Him Upon All Nations

This fear was not about cruelty or terror David caused on purpose.

Nations respected and feared the God who so clearly fought for him.

The same pattern later describes how the whole world will one day regard God's promised King.

David's growing fame in this chapter points forward to something far greater than David himself.

😨 Nations feared the God behind David
🙌 This was respect, not cruelty
👑 A greater King is foreshadowed here
📖 David's fame pointed beyond David himself
`.trim();

export const FIRST_CHRONICLES_FOURTEEN_PERSONAL_SECTIONS = parseFirstChroniclesFourteenRawNotes(FIRST_CHRONICLES_FOURTEEN_RAW_NOTES);
