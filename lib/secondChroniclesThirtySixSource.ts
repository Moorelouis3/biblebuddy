export type SecondChroniclesThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesThirtySixRawNotes(rawText: string): SecondChroniclesThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+36:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Chronicles 36 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+36:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+36:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Chronicles 36 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 36,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 36:${startVerse}` : `2 Chronicles 36:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Second Chronicles 36 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_THIRTY_SIX_RAW_NOTES = `# SecondChronicles 36:1-4
# 👑 Jehoahaz Reigns Three Months
---
## Made Him King In His Father's Stead

The people of Judah picked Jehoahaz to replace his father Josiah.

He was not the oldest surviving son.

Judah broke the normal rule of succession to choose him.

Kings usually inherited the throne strictly by birth order.

Judah was still reeling from Josiah's sudden death in battle.

They wanted a king who would stand against Egypt, not bow to it.

👑 Jehoahaz was chosen, not firstborn
⚔️ Josiah had just died in battle
🇪🇬 Judah wanted a king against Egypt
📖 Human choices happen inside God's larger plan

## Twenty And Three Years Old

Jehoahaz was twenty three when he took the throne.

His reign lasted only three months.

That is the shortest reign of any king in this chapter.

Egypt removed him almost as soon as he sat down.

A throne did not guarantee him any real safety.

📆 Twenty three when he became king
⏳ His reign lasted three months
👑 The shortest reign in this chapter
➡️ Power did not protect him

## Condemned The Land In An Hundred Talents Of Silver And A Talent Of Gold

A "talent" was a unit of weight, not a coin.

Silver talents weighed about seventy five pounds.

A hundred talents of silver was an enormous tax for one small kingdom.

Egypt was not just removing a king here.

Egypt was draining Judah's wealth on its way out the door.

⚖️ A talent was a weight, not a coin
💰 Silver talents weighed about seventy five pounds
🇪🇬 Egypt drained Judah's wealth as tribute
📖 Judah was crushed before Babylon even came

## Turned His Name To Jehoiakim

Egypt renamed Eliakim to Jehoiakim before crowning him king.

Forcing a name change was a way of showing who was really in charge.

The new king now owed his crown to a foreign ruler, not to his own people.

Joseph and later Daniel both had their names changed under foreign rule too.

A changed name marked a life now controlled by someone else.

🔤 Egypt renamed Eliakim to Jehoiakim
🇪🇬 A new name showed who was in charge
⛓️ His crown depended on a foreign king
📖 Renaming often marked control by outsiders

# SecondChronicles 36:5-8
# ⛓️ Jehoiakim Rebels Against Babylon
---
## Did That Which Was Evil In The Sight Of The Lord

This exact phrase marks a bad king throughout Chronicles.

Jehoiakim ruled for eleven years and never turned toward God.

His father Josiah had been one of Judah's most faithful kings.

The nation swung hard the other way within a single generation.

A good king never guarantees a good successor.

⚠️ This phrase always marks a bad king
👑 Jehoiakim ruled eleven years without reform
🔄 Judah reversed course from Josiah fast
📖 One generation can undo another's faithfulness

## Bound Him In Fetters, To Carry Him To Babylon

"Fetters" means chains used to bind a prisoner's hands or feet.

Nebuchadnezzar did not just defeat Jehoiakim in battle.

He humiliated him publicly by leading him away in chains.

This was Babylon's first direct strike on a king inside Jerusalem.

It would not be the last time this happened.

⛓️ Fetters means chains for a prisoner
👑 Nebuchadnezzar humiliated Jehoiakim publicly
🏛️ Babylon's first direct strike on Jerusalem's king
➡️ Worse would still follow

## Carried Of The Vessels Of The House Of The Lord To Babylon

These vessels were the sacred bowls, cups, and tools used in temple worship.

Nebuchadnezzar took them and set them inside his own god's temple.

Ancient armies often stole a nation's sacred objects as trophies of victory.

Doing so was a way of claiming that the defeated nation's god had lost.

This theft points ahead to the temple's full destruction later in this chapter.

🏺 Vessels means the temple's sacred tools
🏛️ Nebuchadnezzar placed them in his own temple
⚔️ Ancient armies stole gods as trophies
📖 This scene sets up the temple's destruction later

## The Book Of The Kings Of Israel And Judah

This is a royal record that no longer exists today.

Scripture names it several times as a fuller source than what got included here.

The writer is honest that a great deal about Jehoiakim was left out.

Scripture never claims to record every detail of every reign.

It records what God wanted preserved for His people.

📚 A now lost royal record
✂️ Chronicles included only part of the story
🤲 Scripture preserves what God wanted kept
📖 Not everything written down survives

# SecondChronicles 36:9-10
# 👶 Jehoiachin's Brief Reign
---
## Eight Years Old When He Began To Reign

Some manuscripts and 2 Kings 24:8 give his age as eighteen instead of eight.

Copies of numbers were especially easy to miscopy by hand.

Either way, he came to the throne extremely young for this crisis.

His reign lasted barely three months before Babylon removed him too.

A collapsing kingdom fell into the hands of a child.

🔢 Copies list his age as eight or eighteen
✍️ Numbers were the easiest details to miscopy
👶 He was very young for this crisis
📖 A collapsing kingdom fell to a child king

## Sent, And Brought Him To Babylon, With The Goodly Vessels

This is now the second time in one chapter that temple vessels leave for Babylon.

Nebuchadnezzar strips a little more of Jerusalem's wealth with every king he removes.

The pattern from verse seven repeats here almost exactly.

Each stolen shipment left the temple emptier than before.

🔁 A second wave of stolen temple vessels
📉 Babylon strips more wealth with each king
🏺 The pattern from verse seven repeats
📖 Each shipment left the temple emptier

## Made Zedekiah His Brother King

This does not mean Zedekiah was Jehoiachin's literal brother.

Hebrew kinship language often used "brother" loosely for any close male relative.

Zedekiah was actually Jehoiachin's uncle, his father Jehoiakim's own brother.

2 Kings 24:17 spells out that fuller family relationship.

Judah's throne was now passing sideways inside one troubled family.

👨‍👦 Brother here does not mean a literal brother
👴 Zedekiah was actually Jehoiachin's uncle
🔀 The throne moved sideways within one family
📖 Hebrew often used brother for close kin

# SecondChronicles 36:11-14
# 💔 Zedekiah's Hardened Heart
---
## Reigned Eleven Years In Jerusalem

Zedekiah was twenty one when Nebuchadnezzar placed him on the throne.

Eleven years does not sound short compared to Jehoahaz or Jehoiachin.

Those eleven years still ended in the total destruction of Jerusalem.

Length of reign was never the real measure of a king in Chronicles.

Faithfulness was always the real measure.

📆 Zedekiah reigned eleven years
👑 Longer than the two kings before him
🏚️ Those years still ended in ruin
📖 Length of reign was never the real test

## Humbled Not Himself Before Jeremiah The Prophet

Jeremiah was God's prophet, warning Judah through this entire reign.

He told the king plainly to surrender to Babylon and live.

Zedekiah heard that message and refused to act on it.

"Humbled not himself" means he would not lower his pride to accept correction.

A king who will not listen cannot be steered away from disaster.

📜 Jeremiah warned Zedekiah throughout his reign
🗣️ Jeremiah told him to surrender and live
💔 Humbled not himself means refusing correction
📖 Pride blocked the one way to survive

## Stiffened His Neck, And Hardened His Heart

A "stiff neck" pictures a stubborn animal that will not turn where it is led.

"Hardened his heart" means he made himself unable to feel conviction anymore.

Zedekiah had personally sworn loyalty to Nebuchadnezzar in God's own name.

He broke that oath anyway.

His political loyalty and his spiritual sensitivity both failed at once.

🐂 Stiff necked means stubborn like an animal
🧊 Hardened heart means losing all conviction
🤝 Zedekiah broke an oath sworn in God's name
📖 His loyalty and his conscience both failed

## All The Chief Of The Priests, And The People, Transgressed Very Much

This failure was not only the king's fault.

The priests, whose job was leading true worship, led the way into pagan practice instead.

"Polluted the house of the Lord" means they brought detestable, foreign worship into God's own temple.

The very people responsible for holiness became responsible for its collapse.

👥 Not just the king, the whole leadership failed
⛪ Priests led pagan worship instead of true worship
🚫 Polluted means defiled with detestable practices
📖 Those meant to guard holiness caused its loss

# SecondChronicles 36:15-21
# 🔥 Jerusalem Falls
---
## Rising Up Betimes, And Sending

"Betimes" is an old word meaning early, without delay.

This phrase pictures God sending prophet after prophet, starting early each time.

He was not slow to warn Judah.

The word "compassion" here explains why He kept sending messengers instead of judging right away.

God's patience in this verse is described as effort, not passiveness.

⏰ Betimes means early, without delay
📨 God sent warning after warning
❤️ Compassion is why He kept sending them
📖 Patience here was active effort

## They Mocked The Messengers Of God

Judah's response to these warnings grew worse in three stages.

First they mocked what the prophets said.

Then they despised the very words of God.

Finally they turned on the prophets themselves, sometimes with violence.

"Till there was no remedy" means a point was reached where judgment could no longer be avoided.

That point was not God running out of patience early.

It was Judah shutting every door He kept opening.

😤 Mocking came before violence
📉 Rejection grew worse in stages
🚪 No remedy means no doors left
📖 Judah closed every door itself

## No Compassion Upon Young Man Or Maiden, Old Man, Or Him That Stooped For Age

This verse lists every age group on purpose.

Young men, young women, and the elderly are all named with no exceptions.

That total scope shows how complete this judgment against Jerusalem was.

Ancient warfare usually spared some group, often the very old or the very young.

This time the whole city shared one fate together.

👥 Every age group is named on purpose
⚔️ No exceptions were made for anyone
🏙️ The whole city shared one fate
📖 Judgment reached everyone, not just soldiers

## They Burnt The House Of God

Solomon's temple had stood for about four hundred years before this moment.

It was the one place on earth where God's presence dwelled among His people.

Losing it was not just losing a building.

It felt like losing the center of the whole nation's relationship with God.

This was the lowest point in Judah's entire history.

🏛️ The temple had stood about four hundred years
🕯️ It was where God's presence dwelled
💔 Its loss felt like losing everything
📖 Judah hit its lowest point here

## Until The Reign Of The Kingdom Of Persia

God had commanded Israel to let the land rest one year out of every seven.

That rest was a sabbath for the soil itself.

For centuries, the nation ignored that command and kept farming without rest.

The seventy years of exile repaid the sabbath years Israel owed the land.

Even this judgment served a promise God had made long before.

🌾 God commanded a sabbath rest for the land
🚫 Israel ignored that command for centuries
🔢 Seventy years repaid the missed sabbaths
📖 Even exile fulfilled a promise from long before

# SecondChronicles 36:22-23
# 📜 Cyrus's Proclamation
---
## The Lord Stirred Up The Spirit Of Cyrus

Cyrus was a pagan king who did not worship the God of Israel.

God still moved his heart to act, without asking his permission first.

This fulfilled a promise Jeremiah had spoken decades earlier about the exile ending.

God can use a leader who does not know Him to accomplish His plans.

👑 Cyrus did not worship Israel's God
🙌 God still moved his heart to act
📜 This fulfilled Jeremiah's earlier promise
📖 God can work through any leader

## The Lord His God Be With Him, And Let Him Go Up

This is the very last verse of 2 Chronicles.

The Hebrew Bible's whole Old Testament ordering actually closes on this same word, "go up."

After seventy years of exile and a burned down temple, the book refuses to end in despair.

It ends instead with permission to return home and rebuild.

The story was never really over.

📖 2 Chronicles ends on this exact verse
⬆️ Go up points toward returning home
🏗️ The book ends with rebuilding ahead
➡️ Exile was not the final word
`.trim();

export const SECOND_CHRONICLES_THIRTY_SIX_PERSONAL_SECTIONS = parseSecondChroniclesThirtySixRawNotes(
  SECOND_CHRONICLES_THIRTY_SIX_RAW_NOTES,
);
