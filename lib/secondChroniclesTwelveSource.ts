export type SecondChroniclesTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwelveRawNotes(rawText: string): SecondChroniclesTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 12:${startVerse}` : `2 Chronicles 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Chronicles 12 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWELVE_RAW_NOTES = `# SecondChronicles 12:1
# ⚖️ Rehoboam Forsakes The Law
---
## When Rehoboam Had Established The Kingdom

"Established" means Rehoboam's throne was finally secure and settled.

The early danger of civil war was behind him.

God had just given him peace in the previous chapter.

This safety is the exact moment he let God go.

Comfort turned out more dangerous than the earlier threat.

⚖️ Established means secure and settled

🕊️ Peace had just come in chapter eleven

😌 Comfort arrived right before the fall

📖 Ease was more dangerous than war

---

## He Forsook The Law Of The LORD

"Forsook" means a deliberate choice, not a slow drift.

Rehoboam did not lose the law by accident.

He set it down on purpose.

"The law" means the covenant instructions God gave through Moses.

Those instructions covered worship, justice, and how a king should live.

Abandoning the law left the whole nation without its standard.

🚶 Forsook means walking away on purpose

📜 The law was Moses' covenant instructions

👑 It even governed how the king lived

📖 Losing it cost the nation its standard

---

## And All Israel With Him

Israel here means Judah, the kingdom Rehoboam actually ruled.

The northern ten tribes had already split away.

A king's choices rarely stay private.

The nation followed Rehoboam away from the law.

They had followed him into building projects only one chapter earlier.

A leader's direction becomes the whole group's direction.

🏘️ Israel here means Judah, not the north

👑 A king's choices spread to his people

🔁 The people followed him away too

📖 A leader's direction becomes everyone's direction

# SecondChronicles 12:2-4
# 🐎 Shishak Invades Judah
---
## In The Fifth Year Of King Rehoboam

Only five years had passed since Rehoboam became king.

The three faithful years of chapter eleven were already over.

This invasion follows almost immediately after his drift in verse one.

Scripture ties the disaster to an exact point in time, not vague trouble.

Judgment did not wait long once the king turned away.

🔢 Five years is an exact, pointed number

🙏 The three faithful years had ended

⏱️ Invasion followed the drift almost immediately

📖 Judgment did not wait long

---

## Shishak King Of Egypt Came Up Against Jerusalem

Shishak was a real Egyptian pharaoh, not a symbolic threat.

Egyptian temple records at Karnak still list this very campaign.

"Came up against" means he marched north to attack.

Egypt had stayed quiet since Solomon's powerful reign.

A weakened, divided kingdom finally invited outside attack.

🇪🇬 Shishak was a real Egyptian pharaoh

🪨 Karnak's temple records confirm this campaign

⚔️ Came up against means marched to attack

📖 Weakness finally invited outside attack

---

## Because They Had Transgressed Against The LORD

"Transgressed" means they crossed a line God had clearly marked.

This was not bad luck or simple politics.

The chronicler names the exact cause of the invasion.

Egypt's army was the consequence, not the reason.

God let the nation's own choice catch up with it.

🚧 Transgressed means crossing a marked line

🎲 This was not random misfortune

📜 The chronicler names the real cause

📖 Their choice caught up with them

---

## With Twelve Hundred Chariots, And Threescore Thousand Horsemen

"Threescore" is an old word for sixty.

Sixty thousand horsemen alone dwarfed anything Judah could field.

The chariots and cavalry came with soldiers from Egypt, Libya, and Ethiopia.

"Without number" means the foot soldiers could not even be counted.

This was one of the largest armies Judah had ever faced.

🔢 Threescore is an old word for sixty

🐎 Sixty thousand horsemen dwarfed Judah's army

🌍 Soldiers came from Egypt, Libya, and Ethiopia

📖 Judah faced an overwhelming force

---

## He Took The Fenced Cities Which Pertained To Judah

These were the very cities Rehoboam had fortified in chapter eleven.

Every wall and captain he built could not stop this army.

Human defense still depends on God's protection to actually hold.

The fortresses fell exactly where Judah had trusted its own strength.

🏰 These were Rehoboam's own fortified cities

🛡️ Walls alone could not stop Shishak

🙏 Defense still depends on God's protection

📖 Trusted strength fell first

---

## And Came To Jerusalem

Jerusalem was the last line of defense, the capital itself.

Every outer city had already fallen one by one.

The enemy now stood at the doorstep of the temple and the throne.

This is the lowest point of Rehoboam's short reign so far.

🏙️ Jerusalem was the last line of defense

🚪 Every outer city had already fallen

⛪ The enemy reached the temple's doorstep

📖 This was Rehoboam's lowest point yet

# SecondChronicles 12:5-8
# 🙏 Judah Humbles Itself
---
## Ye Have Forsaken Me, And Therefore Have I Also Left You

God's words mirror Rehoboam's own action back to him exactly.

Verse one said Rehoboam forsook the law.

Now God says he forsook God himself, using the same word.

"Left you" does not mean God abandoned them forever.

It means God withdrew the protection they had stopped seeking.

Shishak's army was the direct result of that withdrawal.

🪞 God's words mirror Rehoboam's own action

🔁 Forsaken is the same word from verse one

🛡️ Left means withdrawn protection, not abandonment

📖 Shishak was the result of that withdrawal

---

## The Princes Of Israel And The King Humbled Themselves

"Humbled themselves" means they openly admitted they were wrong.

This was not just Rehoboam alone.

His officials joined him in owning the failure.

A whole leadership admitting fault together was rare in scripture.

Genuine repentance can still begin even after real disaster has already started.

🙇 Humbled themselves means admitting real fault

👥 The princes joined the king in this

🕊️ Leadership repented together, not alone

📖 Repentance can begin even mid disaster

---

## The LORD Is Righteous

This is not an excuse or a complaint against God.

The princes and king agree that the coming judgment is fair.

They admit Shishak's invasion matches what their sin deserved.

Calling God righteous while suffering is itself a form of worship.

⚖️ Righteous means the judgment was fair

🙏 They admitted the punishment fit the sin

✝️ Confessing this while suffering is worship

📖 Even judgment can be met with honesty

---

## I Will Grant Them Some Deliverance

"Some deliverance" means partial mercy, not a full rescue.

Judah would not be destroyed the way it deserved.

But Judah would also not simply be let off with nothing.

God's mercy here has real limits attached to it.

The next verse shows exactly what those limits looked like.

🕊️ Some deliverance means partial mercy

💀 Judah would not be destroyed

⚖️ Mercy still came with real limits

📖 The next verse shows those limits

---

## Nevertheless They Shall Be His Servants

"Nevertheless" signals a turn, mercy that still carries a cost.

Judah would survive, but only as Egypt's servant, not as a free nation.

"That they may know my service" means God wanted a lesson learned.

Serving Shishak would teach what serving God should have felt like.

Sometimes a lesser slavery teaches the true cost of leaving God.

🔄 Nevertheless signals mercy with a cost

⛓️ Judah survived as Egypt's servant, not free

📚 They needed to know real service

📖 Lesser slavery taught the cost of leaving God

# SecondChronicles 12:9-11
# 🥉 Gold Shields Become Brass
---
## He Carried Away Also The Shields Of Gold Which Solomon Had Made

These shields were never meant for actual battle use.

They were pure display, a symbol of Solomon's incredible wealth.

First Kings ten records Solomon making them for exactly this kind of glory.

Losing them meant losing a visible piece of Solomon's former glory.

The kingdom's golden age was leaving with Shishak's army.

✨ These shields were never for battle

📜 First Kings ten records Solomon making them

👑 Losing them meant losing visible glory

📖 The golden age left with Shishak

---

## Instead Of Which King Rehoboam Made Shields Of Brass

"Instead of" signals a real downgrade, not a simple replacement.

Brass looked similar to gold from a distance but was far cheaper.

Rehoboam could not restore what Shishak had taken away.

He could only cover the loss with an imitation.

A counterfeit glory took the place of the real one.

📉 Instead of signals a real downgrade

🥉 Brass looked like gold but was cheap

🔁 Rehoboam covered loss with imitation

📖 Counterfeit glory replaced the real one

---

## Committed Them To The Hands Of The Chief Of The Guard

These brass shields needed careful guarding, unlike ordinary equipment.

The chief of the guard controlled access to the king's own house.

Treating cheap brass with this much ceremony reveals how much appearance still mattered.

Judah kept performing a wealth it no longer actually had.

🛡️ Brass shields still needed careful guarding

🏛️ The guard controlled the king's house

🎭 Ceremony continued despite the real loss

📖 Judah performed a wealth it lost

---

## When The King Entered Into The House Of The LORD

These shields never actually left the palace grounds.

Guards brought them out only for formal appearances at the temple.

Afterward they went straight back to the guard chamber for storage.

A show of glory was staged again and again.

It was never actually restored.

🚶 These shields never left the palace

🏛️ Guards displayed them for royal appearances

🔄 Then returned them to storage each time

📖 Glory was staged, not restored

# SecondChronicles 12:12
# 😌 The Wrath Turns Away
---
## The Wrath Of The LORD Turned From Him

This links directly back to the humbling in verse six.

One act of genuine humility changed the outcome of the whole invasion.

God did not need years of penance, only real repentance in the moment.

Judgment already in motion can still be interrupted by a humbled heart.

🔗 This links back to verse six

🙇 One humble moment changed the outcome

⏱️ Real repentance mattered more than time

📖 A humbled heart can interrupt judgment

---

## And Also In Judah Things Went Well

"Went well" does not mean life simply returned to normal.

Judah still lost its treasures and its golden shields for good.

"Went well" means the nation survived and was allowed to rebuild.

Mercy after judgment often looks like survival, not a full undoing of loss.

⚠️ Things went well did not mean untouched

💰 The treasures and gold were gone for good

🌱 Judah survived and could rebuild

📖 Mercy often means survival, not undoing loss

# SecondChronicles 12:13-14
# 👑 Rehoboam's Reign Summarized
---
## So King Rehoboam Strengthened Himself In Jerusalem, And Reigned

This repeats the exact phrase from chapter eleven verse one.

Rehoboam is back to where he started, strengthened and secure again.

The invasion humbled him, but it did not permanently change his direction.

A cycle begins here that later kings of Judah will repeat again and again.

🔁 This repeats a phrase from chapter eleven

😌 Rehoboam was strengthened and secure again

🎢 Humility did not permanently change him

📖 This cycle repeats through Judah's kings

---

## His Mother's Name Was Naamah An Ammonitess

"Ammonitess" means she came from Ammon, a nation east of the Jordan River.

The Ammonites worshiped the false god Molech.

Solomon himself had married foreign wives who pulled his heart toward idols.

Rehoboam was raised by exactly the kind of influence Solomon fell to.

A king's mother often shaped a king's worship more than any law could.

🗺️ Ammonitess means she came from Ammon

🐐 Ammon worshiped the false god Molech

👑 Solomon fell to this same influence

📖 A mother's faith shaped a king's worship

---

## He Prepared Not His Heart To Seek The LORD

"Prepared" means a deliberate, ongoing decision, not something automatic.

Rehoboam's failure was not one bad choice on one bad day.

He simply never set his heart in that direction at all.

The whole chapter's cycle of sin and repentance traces back to this one root.

Real faithfulness takes preparation, not just good intentions in a crisis.

🎯 Prepared means a deliberate ongoing choice

🔁 This was not one single bad day

🌱 His heart never faced God's direction

📖 Faithfulness takes preparation, not just crisis instinct

# SecondChronicles 12:15-16
# ⚰️ Rehoboam Dies, Abijah Reigns
---
## Are They Not Written In The Book Of Shemaiah The Prophet

This is not a book found anywhere in the Bible today.

It cites a real historical source that has since been lost.

Shemaiah is the same prophet who spoke to Rehoboam earlier in this chapter.

Iddo the seer also recorded events tied to genealogies.

Scripture itself points beyond its own pages to other lost records.

📚 This cites a source lost to history

🔮 Shemaiah is the same prophet from before

📜 Iddo the seer recorded genealogies too

📖 Scripture points beyond its own pages

---

## There Were Wars Between Rehoboam And Jeroboam Continually

"Continually" means the conflict never actually stopped, even after Shishak's invasion.

God had already forbidden all out war back in chapter eleven.

This describes ongoing border conflict, not the large scale war God stopped.

A divided kingdom does not heal just because the fighting goes quiet.

🔥 Continually means the conflict never stopped

🚫 God had forbidden full scale war

⚔️ Border conflict still continued for years

📖 A divided kingdom does not simply heal

---

## Rehoboam Slept With His Fathers

"Slept with his fathers" is a common Old Testament phrase meaning he died.

It pictures death as rest, joining generations who came before him.

Being buried in the city of David placed him among Judah's own kings.

His seventeen year reign in Jerusalem now closes.

😴 Slept with his fathers means he died

🕊️ Death is pictured here as rest

🏙️ He was buried in the city of David

📖 His seventeen year reign closes here

---

## Abijah His Son Reigned In His Stead

"In his stead" means Abijah took the throne immediately, without delay.

This is the same Abijah named successor back in chapter eleven verse twenty two.

Rehoboam's earlier wise choice to name an heir prevented any succession crisis.

The next chapter picks up Abijah's own short and eventful reign.

➡️ In his stead means he took over

🔗 This is the same Abijah from before

👑 Naming an heir prevented a crisis

📖 The next chapter follows Abijah's reign
`.trim();

export const SECOND_CHRONICLES_TWELVE_PERSONAL_SECTIONS = parseSecondChroniclesTwelveRawNotes(SECOND_CHRONICLES_TWELVE_RAW_NOTES);
