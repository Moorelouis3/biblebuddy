export type JeremiahTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwentyFourRawNotes(rawText: string): JeremiahTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 24:${startVerse}` : `Jeremiah 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Jeremiah 24 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWENTY_FOUR_RAW_NOTES = `# Jeremiah 24:1-3
# 🧺 Two Baskets Before The Temple
---
## 👁️ The LORD Shewed Me

"Shewed" is an old spelling of "showed."

God gives Jeremiah a vision here, not an ordinary sight on the street.

Jeremiah already received visions like this earlier in the book.

A boiling pot and an almond branch both carried a hidden message in chapter one.

This basket of figs works the same way.

👁️ Shewed means showed
🌰 Jeremiah 1 already used this pattern
🧺 An ordinary object hides a message
📖 God often teaches through pictures

## 🍇 Two Baskets Of Figs Were Set Before The Temple Of The LORD

Worshipers regularly brought baskets of fresh fruit to the temple as offerings.

A basket of figs sitting there would not look unusual at first glance.

That familiar picture is exactly why the vision lands so hard.

Something completely normal is about to carry a devastating message.

🍇 Fruit offerings were a normal temple sight
🧺 The baskets looked completely ordinary
😳 A normal image hides a hard message
📖 God often teaches through the familiar

## 👑 Nebuchadrezzar King Of Babylon Had Carried Away Captive Jeconiah

Jeconiah is also known by the name Jehoiachin in other parts of the Bible.

He ruled Judah for only three months before Babylon removed him.

Nebuchadrezzar is simply another spelling of the more familiar name Nebuchadnezzar.

This deportation happened years before Jerusalem itself was finally destroyed.

Judah's story includes more than one wave of exile, not just one final blow.

👑 Jeconiah is also called Jehoiachin
📆 He reigned only three months
🏛️ Nebuchadrezzar and Nebuchadnezzar are the same king
📖 This exile came before Jerusalem's final fall

## 🔨 The Carpenters And Smiths

Babylon did not only remove royalty and officials in this deportation.

Skilled workers like carpenters and smiths were taken as well.

Losing these workers made it far harder for Judah to rebuild or arm itself.

Babylon was thinning out the nation's ability to recover on its own.

🔨 Carpenters and smiths were skilled workers
🏗️ Judah lost its ability to rebuild
⚔️ It also lost the ability to arm itself
📖 Babylon weakened Judah on purpose

## 🍏 One Basket Had Very Good Figs...The Other Had Very Naughty Figs

"Naughty" here does not mean mischievous, like a scolded child.

It means completely worthless, rotten, and unfit to eat.

The contrast between the two baskets is total.

One basket is excellent and the other is ruined, with nothing in between.

🍏 Naughty means rotten and worthless
✅ One basket is excellent
❌ The other basket is ruined
📖 The contrast leaves no middle ground

## ❓ What Seest Thou, Jeremiah?

God already asked Jeremiah this same kind of question back in chapter one.

There, Jeremiah answered with a rod of an almond tree and a boiling pot.

Here he simply answers with figs, good and evil, with no confusion at all.

God draws Jeremiah into naming what he sees before explaining what it means.

❓ God repeats a question from chapter one
🌰 That earlier answer was an almond rod
🍇 This time the answer is figs
📖 God invites Jeremiah to see clearly first

# Jeremiah 24:4-7
# 🌱 The Good Figs Promise
---
## 🍇 Like These Good Figs, So Will I Acknowledge Them

"Acknowledge" here means far more than simply admitting someone exists.

It means God will regard these people with real favor and care.

The exiles carried off to Babylon are the ones God calls good figs.

That is the exact opposite of how most people would read this disaster.

🍇 Acknowledge means regarded with favor
🧺 The good figs are the exiles
🔄 This flips the expected reading
📖 God's favor rests on the captives

## 🏛️ Carried Away Captive Of Judah...Into The Land Of The Chaldeans For Their Good

"Chaldeans" is simply another name for the Babylonians.

Being carried into that land sounds like pure disaster on the surface.

God says plainly that He sent them there for their own good.

Exile becomes the very path God uses to protect this group.

🏛️ Chaldeans means the Babylonians
😳 Exile looked like total disaster
🛡️ God calls it for their good
📖 God can use hardship for good

## 👀 I Will Set Mine Eyes Upon Them For Good

Think of someone watching over a person from a distance, ready to help.

That is the picture behind God setting His eyes on someone for good.

The exiles are not abandoned in a foreign land.

God is actively watching over them the whole time.

👀 Setting eyes means active watching
🌍 The exiles are far from home
🛡️ God has not abandoned them
📖 Distance does not remove God's care

## 🌱 I Will Build Them, And Not Pull Them Down, And I Will Plant Them, And Not Pluck Them Up

God gave Jeremiah his exact calling using these same four verbs back in chapter one.

Pluck up, pull down, build, and plant described his whole ministry there.

Here God applies the positive half of that calling directly to the exiles.

Judgment is not the final word for this group.

🌱 Build and plant recall Jeremiah's calling
📜 Chapter one used these same four verbs
✅ Only the positive half applies here
📖 Judgment is not their final word

## ❤️ I Will Give Them An Heart To Know Me

This is not a promise of new information about God.

It is a promise of a changed inner heart.

Knowing facts about God is not the same as truly knowing Him.

God promises to change what the exiles want, not just what they know.

❤️ A new heart, not new facts
🧠 Knowledge alone was never the goal
🔄 God changes what they want
📖 True knowing starts in the heart

## 🚪 They Shall Return Unto Me With Their Whole Heart

A halfhearted return was Judah's old pattern for generations.

This time God promises a return that is complete and undivided.

The exile becomes the very thing that produces real repentance.

What looked like punishment becomes the doorway to genuine restoration.

💔 Halfhearted return was the old pattern
❤️ This return is whole and undivided
🚪 Exile becomes a doorway, not a dead end
📖 Real repentance follows real hardship

# Jeremiah 24:8-10
# ⚖️ The Bad Figs Judgment
---
## 👑 As The Evil Figs...So Will I Give Zedekiah The King Of Judah

Zedekiah is a different king than Jeconiah named back in verse one.

Babylon placed Zedekiah on the throne after removing Jeconiah into exile.

He was Jeconiah's uncle, originally named Mattaniah before Babylon renamed him.

The king who stayed on the throne becomes the bad fig in this vision.

👑 Zedekiah is a different king than Jeconiah
🔄 Babylon installed him after Jeconiah's exile
📛 His original name was Mattaniah
📖 Staying in power did not mean safety

## 🏙️ The Residue Of Jerusalem, That Remain In This Land

Those left behind in Jerusalem likely felt fortunate compared to the exiles.

They avoided the long march to a foreign land.

This verse says the opposite of what they probably believed.

Staying near the temple did not protect them from judgment.

🏙️ Those who stayed felt fortunate
🚶 They avoided exile to Babylon
🔄 The vision reverses that expectation
📖 Nearness to the temple was no shield

## 🌴 Them That Dwell In The Land Of Egypt

Some people fled south to Egypt hoping to escape Babylon's threat entirely.

Egypt seemed like a safer choice than staying in Judah.

This verse includes that group in the same coming judgment.

Running to Egypt for safety does not put them outside God's reach.

🌴 Egypt seemed like a safer refuge
🏃 Some fled there to escape Babylon
⚖️ God's judgment still reaches them there
📖 No location is outside God's reach

## 😢 A Reproach And A Proverb, A Taunt And A Curse

A "proverb" in this sense means becoming a byword other nations use to mock.

Judah's downfall would become the example people point to as a warning.

That is a far heavier fate than simple military defeat.

Their name becomes a lesson told at someone else's expense.

🗣️ Proverb here means a mocking byword
🌍 Other nations use their story as a warning
💔 A heavier fate than plain defeat
📖 Their name becomes someone else's lesson

## ⚔️ The Sword, The Famine, And The Pestilence

This three part threat shows up again and again in Jeremiah.

Sword means violent death in war.

Famine means starvation from a broken food supply.

Pestilence means widespread disease in a weakened population.

Together these three describe a complete collapse.

⚔️ Sword means violent death in war
🌾 Famine means starvation and broken supply
🦠 Pestilence means widespread disease
📖 Together they describe total collapse

## 🏚️ Till They Be Consumed From Off The Land

This judgment does not stop partway through.

It continues until the land itself is emptied of this group entirely.

The good figs from earlier in the chapter get a future and a homecoming.

The bad figs get removal with no promise of return attached.

🔥 The judgment runs to full completion
🏚️ The land is emptied of this group
🌱 The good figs get a homecoming instead
📖 Two futures split from one vision
`.trim();

export const JEREMIAH_TWENTY_FOUR_PERSONAL_SECTIONS = parseJeremiahTwentyFourRawNotes(JEREMIAH_TWENTY_FOUR_RAW_NOTES);
