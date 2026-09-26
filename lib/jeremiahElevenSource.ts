export type JeremiahElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahElevenRawNotes(rawText: string): JeremiahElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 11:${startVerse}` : `Jeremiah 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Jeremiah 11 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_ELEVEN_RAW_NOTES = `# Jeremiah 11:1-5
# 📜 The Words Of This Covenant
---
## 📜 Hear Ye The Words Of This Covenant

This covenant refers to the law God gave Israel at Mount Sinai.

Many scholars believe this chapter reflects King Josiah renewing that old covenant.

That renewal came after workers found the Book of the Law inside the temple.

Generations of the nation had drifted far from those original terms.

Jeremiah is sent to call the people back to a promise their ancestors made.

This covenant was old and forgotten, not new.

📜 Covenant means the law from Sinai
👑 Josiah likely renewed it here
🕰️ The nation had drifted away
➡️ An old promise called back again

## ⚖️ Cursed Be The Man That Obeyeth Not

God attaches a real curse to anyone who breaks this covenant.

Ancient covenants normally listed curses for disobedience right alongside blessings for keeping them.

Deuteronomy had already spelled out exactly what those curses looked like.

Israel agreed to this whole arrangement long before Jeremiah was ever born.

Breaking that old promise still carried real consequences now.

God does not forget an agreement his people made.

⚖️ Covenants held blessings and curses
📜 Deuteronomy listed those curses first
🤝 Israel agreed to this long ago
📖 God does not forget a promise

## 🔥 Out Of The Iron Furnace

"Iron furnace" describes the harsh forced labor Israel suffered in Egypt.

A furnace melts metal using extreme, punishing heat.

Egypt is being compared to that same kind of brutal pressure.

God reminds the people exactly where he pulled them out of.

Remembering that rescue was meant to keep them loyal to him.

🔥 Furnace means extreme punishing heat
⛓️ It pictures Egypt's harsh labor
🚶 God pulled them out of it
📖 Remembering the rescue should keep loyalty

## 🗣️ So Be It, O LORD

"So be it" works the same way the word "Amen" does today.

Jeremiah answers God's covenant warning with this short reply.

He is agreeing out loud to a covenant with real curses attached.

This response makes Jeremiah more than a messenger.

He becomes the first person newly bound to these old terms.

🗣️ So be it means Amen
✅ Jeremiah agrees out loud here
📜 He is bound to the covenant too
➡️ A messenger becomes the first to agree

# Jeremiah 11:6-8
# 📢 Proclaim These Words
---
## 📢 In The Streets Of Jerusalem

This was not a quiet message meant for the temple alone.

God tells Jeremiah to proclaim it in the open streets instead.

Streets were the busiest, most visible parts of an ancient city.

Everyone in the city would hear the warning, not just religious leaders.

The whole nation was being confronted at once.

📢 The message went to public streets
👥 Everyone in the city would hear
🚫 Not a private, quiet warning
➡️ The whole nation faced this together

## ⏰ Rising Early, And Protesting

"Rising early" is an idiom the KJV uses for urgent effort.

It describes someone who gets up before dawn to make sure a task gets done.

Jeremiah repeats this phrase for God many times in this book.

It pictures a God who kept warning his people again and again.

This was not a single warning given once and forgotten.

⏰ Rising early means urgent effort
🔁 Jeremiah repeats this phrase often
📣 God kept warning again and again
📖 One warning was never enough

## 🧠 The Imagination Of Their Evil Heart

"Imagination" here does not mean creativity or daydreaming.

It means the stubborn plans and desires a person's heart chases.

An evil heart in this sense means a heart set on its own way.

Jeremiah repeats this exact phrase for Israel's condition again and again.

Stubborn willfulness, not simple mistakes, drove Israel away from God.

🧠 Imagination means stubborn inner plans
💔 An evil heart follows its own way
🔁 Jeremiah repeats this exact phrase
📖 Willfulness, not mistakes, caused the drift

## ⚖️ I Will Bring Upon Them All The Words Of This Covenant

The curses named back in verse three were never empty threats.

God now says he will actually carry every one of them out.

The people had broken a covenant they promised long ago to keep.

Warnings ignored for generations were about to become reality.

A covenant with real curses eventually enforces them.

⚖️ The curses were never empty
🔨 God will now carry them out
📜 Ignored warnings became reality
📖 A broken covenant enforces its curses

# Jeremiah 11:9-13
# 🕵️ A Conspiracy Is Found
---
## 🕵️ A Conspiracy Is Found

"Conspiracy" means an organized plan, not one person acting alone.

This was not a handful of scattered individuals sinning quietly.

The whole community had agreed together to abandon God.

Organized rebellion is far harder to turn back than a single mistake.

God names it plainly for exactly what it was.

🕵️ Conspiracy means an organized plan
👥 The whole community joined in
🚫 Not a scattered, private failure
📖 Organized rebellion is harder to reverse

## 👴 Turned Back To The Iniquities Of Their Forefathers

"Their forefathers" points back to Israel's ancestors before this covenant existed.

Those ancestors worshiped other gods back in Egypt and beyond.

The nation is not falling into something brand new here.

It is returning to an old pattern the covenant was meant to break.

Progress had quietly reversed itself over the generations.

👴 Forefathers means Israel's earlier ancestors
🔁 Old idol worship had returned
📉 Progress reversed over generations
📖 An old pattern replaced a new promise

## 🚫 Which They Shall Not Be Able To Escape

God names the coming judgment as inescapable in this verse.

No hiding place or clever plan would stop it.

Even crying out to God later would not change the outcome.

The window for repentance that avoids this outcome had already closed.

Judgment delayed for generations was finally arriving in full.

🚫 No escape from this judgment
🙉 Even crying out would not help
⏳ The window for change had closed
📖 Delayed judgment still fully arrives

## 🗺️ According To The Number Of Thy Cities Were Thy Gods

This line means every single town had set up its own local idol.

Judah did not worship one false god, but dozens scattered everywhere.

Jeremiah uses this same accusation elsewhere in the book.

Idolatry had spread quietly into nearly every corner of the land.

Counting cities became the same as counting separate false gods.

🗺️ Every town had its own idol
🔢 Idolatry was not just one god
🌾 It spread into every corner
📖 Counting cities meant counting false gods

## ⛈️ Altars To Burn Incense Unto Baal

Baal was the Canaanite storm and fertility god worshiped throughout the region.

Burning incense on an altar was a normal act of worship at the time.

Jeremiah calls these altars "that shameful thing" instead of naming them proudly.

Naming something shameful was Jeremiah's way of refusing to dignify it.

Judah had built worship around a god that was never real.

⛈️ Baal was a Canaanite storm god
🔥 Incense was a normal worship act
😔 Jeremiah calls it a shameful thing
📖 Judah worshiped a god never real

# Jeremiah 11:14-17
# 🫒 The Green Olive Tree
---
## 🙏 Pray Not Thou For This People

Prophets normally interceded for their people, pleading with God for mercy.

Here God tells Jeremiah to stop pleading for them completely.

This does not mean God stopped caring about justice.

It means the time for that specific plea had passed.

Even Jeremiah's prayers could not undo what the people had chosen.

🙏 Prophets normally prayed for mercy
🛑 God tells Jeremiah to stop
⏳ The time for that plea passed
📖 Even prayer could not undo this

## 💔 My Beloved Hath Wrought Lewdness

"Lewdness" means sexual sin, but here it is used as a picture.

Prophets often compared Israel's idol worship to marriage unfaithfulness.

God is pictured as the husband in this relationship.

Israel is pictured as the wife who broke faith.

Worshiping other gods was a betrayal, not just a broken rule.

The relationship itself had been wounded, not only the law.

💔 Lewdness pictures marriage unfaithfulness
👰 Israel is pictured as an unfaithful wife
⚖️ Idolatry broke more than a rule
📖 A relationship was wounded, not just a law

## 🫒 A Green Olive Tree, Fair, And Of Goodly Fruit

God once pictured Israel as a healthy, fruitful olive tree.

Olive trees were valuable and slow growing in the ancient world.

"Fair" and "goodly fruit" describe a tree at its very best.

That same tree is about to be set on fire.

A tree planted with care can still be judged for its fruit.

🫒 Israel is pictured as an olive tree
🌿 Olive trees took years to grow
🔥 That healthy tree faces fire now
📖 Even a planted tree faces judgment

## 🔥 To Provoke Me To Anger In Offering Incense Unto Baal

This line names the exact reason for the coming judgment.

Both Israel and Judah are named together as guilty here.

Their own actions provoked this response, not random misfortune.

Burning incense to Baal was the specific offense repeated throughout the chapter.

The fire on the tree was never accidental.

🔥 This names the reason for judgment
🤝 Israel and Judah are both guilty
🚫 Not random misfortune, but a cause
📖 The judgment was never accidental

# Jeremiah 11:18-20
# 🐑 Like A Lamb To The Slaughter
---
## 🕵️ The LORD Hath Given Me Knowledge Of It

Jeremiah had no idea a plot against his life existed.

God personally reveals the danger to him before it happens.

Without that warning, Jeremiah would have walked straight into it.

This is the same kind of protection God gave earlier prophets.

Knowledge, not luck, is what kept Jeremiah safe here.

🕵️ A plot against Jeremiah existed
👁️ God revealed the danger first
🛡️ This warning kept him safe
📖 Knowledge, not luck, protected him

## 🐑 Like A Lamb Or An Ox That Is Brought To The Slaughter

A lamb led to slaughter has no idea what is about to happen.

It simply trusts wherever it is being led.

Jeremiah compares himself to that same kind of innocent unawareness.

He had trusted the very people who were now plotting against him.

Total trust made the coming betrayal even harder to see.

🐑 A lamb trusts wherever it is led
😳 Jeremiah shared that same unawareness
🤝 He trusted people plotting against him
📖 Trust made betrayal harder to see

## 🌳 Let Us Destroy The Tree With The Fruit Thereof

The conspirators speak of Jeremiah using another tree picture.

"The tree" means Jeremiah himself, still living and active.

"The fruit" means his message and his lasting influence.

Their plan was to erase the tree completely.

Killing the message, not only the messenger, was the real goal.

🌳 The tree pictures Jeremiah himself
🍎 The fruit pictures his message
🎯 Their plan aimed to erase him
📖 Silencing the message was the goal

## 🫘 That Triest The Reins And The Heart

"Reins" is an old word for the kidneys, deep inside the body.

Ancient people believed the reins held a person's deepest emotions.

"Triest" means to test or examine something closely.

Jeremiah appeals to a God who sees past every outward appearance.

No hidden plot could ever stay hidden from a God like that.

🫘 Reins is an old word for kidneys
❤️ They pictured deep inner emotion
🔍 Triest means to test closely
📖 No hidden plot escapes God's sight

# Jeremiah 11:21-23
# ⚔️ The Men Of Anathoth
---
## 🏘️ The Men Of Anathoth, That Seek Thy Life

Anathoth was Jeremiah's own hometown, just north of Jerusalem.

It was a town set aside for priests from the tribe of Levi.

The men plotting Jeremiah's death were his own neighbors and kinsmen.

Betrayal from a familiar hometown cuts deeper than a stranger's threat.

Even a prophet's own community could turn against him.

🏘️ Anathoth was Jeremiah's hometown
🕊️ It was a town for priests
👨‍👩‍👧 His own neighbors sought his death
📖 Betrayal from home cuts deepest

## ⚠️ Prophesy Not In The Name Of The LORD, That Thou Die Not

This is a direct death threat aimed at silencing Jeremiah's message.

His hometown wanted the warnings to stop, not to be corrected.

Silence, to them, mattered more than truth.

Threatening a prophet was itself proof his warnings were landing.

The message was dangerous enough that people wanted it gone completely.

⚠️ A direct threat to silence him
🤐 They wanted silence, not correction
🎯 The threat proved the warning landed
📖 A dangerous message drew real danger

## ⚔️ Their Sons And Their Daughters Shall Die By Famine

God answers this threat with a specific judgment on Anathoth itself.

Young men in Anathoth would die by the sword.

Their own children would die by famine instead.

The very town that tried to silence Jeremiah would not escape judgment.

Trying to stop a true warning never removes the danger it describes.

God defended his own messenger by confronting those who threatened him.

⚔️ Young men would die by war
🍽️ Children would die by famine
🚫 Silencing Jeremiah did not stop judgment
📖 God defended his own messenger

## 📅 The Year Of Their Visitation

"Visitation" in the KJV usually means a time when God steps in directly.

It can describe either blessing or judgment, depending on the moment.

Here it clearly means a specific appointed time of punishment.

Anathoth's plot against Jeremiah brought that appointed year closer.

A threat aimed at silencing God's word ends up fulfilling it instead.

📅 Visitation means God stepping in
⚖️ Here it means a time of judgment
🎯 Anathoth's own plot brought this on
📖 Fighting God's word can fulfill it
`.trim();

export const JEREMIAH_ELEVEN_PERSONAL_SECTIONS = parseJeremiahElevenRawNotes(JEREMIAH_ELEVEN_RAW_NOTES);
