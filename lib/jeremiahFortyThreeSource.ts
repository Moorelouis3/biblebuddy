export type JeremiahFortyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFortyThreeRawNotes(rawText: string): JeremiahFortyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFortyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+43:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 43 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+43:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+43:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 43 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 43,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 43:${startVerse}` : `Jeremiah 43:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Jeremiah 43 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FORTY_THREE_RAW_NOTES = `# Jeremiah 43:1-3
# 🗣️ The Accusation Against Jeremiah And Baruch
---
## 🗣️ When Jeremiah Had Made An End Of Speaking

"Made an end of" means Jeremiah had finished saying everything.

He had already promised in the last chapter to keep nothing back.

That full, complete word had now been delivered from start to finish.

What happens next comes before his words even have time to settle.

🗣️ Made an end means fully finished
🤐 Jeremiah kept his promise from chapter forty two
🏁 His whole message had now been given
➡️ Their reaction comes almost immediately after

## 🏷️ And All The Proud Men

This phrase singles out a specific group among the returned remnant.

The text does not call them wise or careful, it calls them proud.

Pride is the quality the narrator wants the reader to notice here.

That label sets up why they reject the word Jeremiah has just delivered.

🏷️ The text names a specific group
😤 These men are singled out as proud
📝 Pride is the narrator's own judgment
➡️ Pride explains the rejection that follows

## 🗯️ Thou Speakest Falsely

This is a direct accusation that Jeremiah is lying.

Calling a prophet a liar was a serious charge in Israel.

It is especially jarring here because Jeremiah had just answered their own request.

They asked God to speak, and then refused to believe He had.

🗣️ Speakest falsely means accused of lying
⚖️ Calling a prophet a liar was serious
❓ They are the ones who asked to hear
➡️ They refuse the very answer they requested

## 📣 Baruch The Son Of Neriah Setteth Thee On Against Us

"Setteth thee on" means to stir up or incite someone.

Baruch was Jeremiah's own scribe, the man who wrote his words in chapter thirty six.

Now he is accused of secretly turning Jeremiah against his own people.

Nothing anywhere in the text actually backs up that accusation.

📣 Setteth on means stirs up or incites
✍️ Baruch wrote Jeremiah's words in chapter thirty six
🎭 He is accused of secretly turning Jeremiah
➡️ Nothing in the text supports that claim

## 🏛️ Into The Hand Of The Chaldeans

"Chaldeans" is another name the Bible uses for the Babylonians.

The accusers believed Baruch wanted to hand them over to die or be deported.

This is the exact fear God had already addressed in the last chapter.

Chapter forty two told them plainly to stop being afraid of Babylon.

🏛️ Chaldeans is another name for Babylonians
😨 They feared being handed over to die
🔁 Chapter forty two already answered this fear
📖 God already told them to stop fearing Babylon

# Jeremiah 43:4-7
# 🚶 The Remnant Flees To Egypt
---
## 🙅 Obeyed Not The Voice Of The LORD

This line states plainly that Johanan and the people disobeyed God.

Back in chapter forty two they had promised to obey no matter the answer.

That promise is broken within only a few verses of being made.

Jeremiah had already warned that this exact failure had already happened in their hearts.

🙅 Obeyed not means they broke their word
🤝 They vowed full obedience in chapter forty two
⏱️ That promise lasted only a few verses
📖 Jeremiah already named this failure as settled

## ✋ Took All The Remnant Of Judah

The word "took" shows this move was Johanan's own decision.

He is the one leading the people, not simply following along with them.

The people who were meant to stay and rebuild under Gedaliah are now led away.

This single choice undoes everything Gedaliah had been trying to build since chapter forty.

✋ Took means this was Johanan's own choice
🧭 He led the people instead of following
🏚️ The plan to rebuild under Gedaliah unravels
➡️ One choice undoes Gedaliah's whole rebuilding effort

## 🔁 Returned From All Nations

This phrase points back to the refugees who had come home in chapter forty.

They had returned from Moab, Ammon, and Edom once Gedaliah began to govern.

Those same people who had just resettled are now being uprooted again.

Their return and this new exile happen within the very same short span of time.

🔁 Returned recalls the refugees from chapter forty
🗺️ They had returned from Moab, Ammon, Edom
🏠 Those same people are uprooted again
📖 Return and exile happen within days

## 👑 The King's Daughters

These are the surviving daughters of King Zedekiah.

Johanan had just rescued them from Ishmael's hands in the previous chapter.

They were the last visible piece of the royal family left in Judah.

Now even they are swept along into Egypt with everyone else.

👑 The king's daughters belonged to Zedekiah's family
🛡️ Johanan had just rescued them from Ishmael
🏯 They were the last visible piece of royalty
➡️ Even royalty is swept along into Egypt

## 🧎 Jeremiah The Prophet, And Baruch The Son Of Neriah

Jeremiah and Baruch are named right alongside everyone being taken to Egypt.

Both men had warned strongly against this exact move.

Neither one appears to be going willingly.

The very men accused of plotting this trip are now forced to make it.

🧎 Jeremiah and Baruch are named in this group
🚫 Both men had warned against this move
🔗 Neither one appears to go willingly
➡️ Both accused men are forced to go

## 🏰 Even To Tahpanhes

Tahpanhes was a fortified Egyptian city near the border, not deep inland.

It held one of Pharaoh's own residences, making it a center of royal power.

Modern archaeologists identify the site with Tell Defenneh in northern Egypt.

Arriving there put the remnant right at the edge of Egyptian authority.

🏰 Tahpanhes sat near Egypt's eastern border
👑 Pharaoh kept one of his own houses there
🗺️ The site is known today as Tell Defenneh
➡️ They landed right inside Egyptian royal territory

# Jeremiah 43:8-10
# 🧱 A Sign Act At Pharaoh's Door
---
## 📢 The Word Of The LORD Unto Jeremiah In Tahpanhes

God's word reaches Jeremiah even here, far outside the land of Judah.

Fleeing to Egypt did not put the remnant beyond God's reach.

The same voice that spoke in Jerusalem still speaks in a foreign country.

This answers the hidden assumption behind their whole flight to Egypt.

📢 God speaks to Jeremiah even in Egypt
🚫 Egypt is not beyond God's reach
🌍 The same voice follows them to Egypt
➡️ Their assumption about escaping God was wrong

## 🧱 Hide Them In The Clay In The Brickkiln

God tells Jeremiah to act out a prophecy instead of only speaking it.

A "brickkiln" was a paved area of clay where bricks were baked.

Jeremiah had used this kind of visible sign before, like wearing a yoke.

Burying stones there made the coming invasion something the people could literally watch happen.

🧱 A brickkiln was a paved clay brick yard
🎭 Jeremiah often acted out his prophecies
🪨 He buried stones instead of only speaking
➡️ This sign let them watch it unfold

## 👁️ In The Sight Of The Men Of Judah

This sign act needed specific witnesses, not a private audience.

The men of Judah were the very people who had rejected God's word.

They are the ones who will now watch that word play out at their own feet.

The sign was aimed directly at the people who refused to believe it.

👥 This sign needed real witnesses present
🙅 These men had rejected God's word already
👣 They will watch that word unfold near them
📖 The sign targeted people who refused to believe

## 👑 Nebuchadrezzar The King Of Babylon, My Servant

Calling a foreign, pagan king "my servant" sounds shocking at first.

God had already used this exact title for Nebuchadnezzar earlier in this book.

It means God can use even an enemy ruler to carry out His plans.

Nebuchadrezzar and Nebuchadnezzar are simply two spellings of the very same king.

👑 My servant is a shocking title
🔁 This same title appeared earlier in Jeremiah
🛠️ God can use even an enemy ruler
📖 Nebuchadrezzar and Nebuchadnezzar name the same king

## 🪨 Set His Throne Upon These Stones

The stones Jeremiah is told to hide right now will matter very soon.

Years later, Nebuchadnezzar's own throne is set directly on top of them.

Jeremiah's small, hidden action becomes a very public and literal sign.

The hiding place of the prophecy becomes the exact seat of judgment.

🪨 These hidden stones later carry real weight
👑 Nebuchadnezzar's throne sits directly on them
🤫 A hidden act becomes a public sign
➡️ The hiding place becomes the seat of judgment

## ⛺ His Royal Pavilion

A "pavilion" is a large tent or canopy used to mark a king's presence.

Spreading it over the hidden stones marks this very spot as his own.

This was not a battle camp, it was a declaration of ownership.

Pharaoh's own doorway becomes the place where a new king sets up his authority.

⛺ A pavilion is a king's large ceremonial tent
📍 Spreading it marks this exact spot
📜 This shows ownership, not just a camp
➡️ A new king claims Pharaoh's own doorway

# Jeremiah 43:11-13
# 🔥 Egypt And Its Gods Fall
---
## ⚖️ Such As Are For Death To Death

This verse sorts the people of Egypt into three separate groups.

Those marked for death will die.

Those marked for captivity will be captured.

Those marked for the sword will fall in battle.

No one here gets to simply avoid the invasion.

⚖️ This verse names three separate outcomes
💀 Some are marked for death
⛓️ Some are marked for captivity
➡️ No one avoids this invasion entirely

## 🔥 Kindle A Fire In The Houses Of The Gods Of Egypt

This invasion is not only political, it is also a judgment on Egypt's religion.

The "houses of the gods" were Egyptian temples filled with idols.

Burning them shows that Babylon's king acts here as God's own instrument.

Egypt's gods could not protect their own temples from this fire.

🔥 This judgment targets Egypt's own temples
🛕 Houses of the gods means Egyptian temples
⚔️ Babylon's king acts as God's instrument here
📖 Egypt's gods cannot protect their own houses

## 👕 As A Shepherd Putteth On His Garment

This is a simple, everyday picture any ancient reader would recognize.

A shepherd slips on his cloak without any struggle or effort.

In the same easy way, Nebuchadnezzar will take hold of all Egypt.

The conquest is pictured as effortless and complete, not a hard fought war.

👕 A shepherd puts on his cloak with ease
🐑 This image comes from ordinary shepherd life
🏺 Nebuchadnezzar takes Egypt just as easily
➡️ The conquest is pictured as effortless

## 🏳️ Go Forth From Thence In Peace

"In peace" here does not mean a friendly or harmonious ending.

It means Nebuchadnezzar will leave Egypt without real resistance.

No army rises up to stop him on his way out.

The word pictures an unopposed and total victory, not a close fought battle.

🕊️ In peace here does not mean friendly
🚷 No army rises up to stop him
🏳️ His departure is completely unopposed
📖 This pictures total, uncontested victory

## ☀️ The Images Of Bethshemesh

"Bethshemesh" means house of the sun, a major center of Egyptian sun worship.

This city is also called Heliopolis, or On, in other parts of the Bible.

Joseph's own father in law had once served as a priest there, back in Genesis.

Breaking its idols strikes at the very heart of Egypt's religion.

☀️ Bethshemesh means house of the sun
🏛️ The Bible also calls it On or Heliopolis
👴 Joseph's father in law once served there
📖 Breaking its idols strikes at Egypt's religion
`.trim();

export const JEREMIAH_FORTY_THREE_PERSONAL_SECTIONS = parseJeremiahFortyThreeRawNotes(JEREMIAH_FORTY_THREE_RAW_NOTES);
