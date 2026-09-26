export type JeremiahOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahOneRawNotes(rawText: string): JeremiahOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 1:${startVerse}` : `Jeremiah 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Jeremiah 1 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_ONE_RAW_NOTES = `# Jeremiah 1:1-3
# 📜 The Words Of Jeremiah
---
## 🕎 The Priests That Were In Anathoth

Anathoth was a small town northeast of Jerusalem.

It belonged to the tribe of Benjamin.

Joshua had set it apart long ago as a city for Aaron's priests.

Jeremiah grew up inside that priestly world.

His calling started long before he ever spoke a single word.

🕎 Anathoth sat just north of Jerusalem

🗺️ It belonged to the tribe of Benjamin

📚 Priests had lived there since Joshua

📖 Jeremiah's calling began inside that priestly life

## 🗓️ Unto The Eleventh Year Of Zedekiah

This verse marks the far end of Jeremiah's dated ministry.

It began in the thirteenth year of King Josiah.

That year lines up with about 627 BC.

Zedekiah's eleventh year lines up with 586 BC, when Jerusalem finally fell.

Three different kings sat on the throne across that whole stretch.

Josiah, Jehoiakim, and Zedekiah each heard Jeremiah's warnings in turn.

That adds up to about forty years of steady preaching.

🗓️ Ministry began in Josiah's thirteenth year

👑 Three kings reigned across this span

🏛️ Zedekiah's eleventh year saw Jerusalem fall

📖 Jeremiah preached for about forty years

## 🔥 The Carrying Away Of Jerusalem Captive

This phrase points ahead to the disaster that ends the whole book.

In 586 BC, Babylon finally broke through Jerusalem's walls.

The temple was burned and many of Judah's people were marched into exile.

"The fifth month" names the exact month on the Hebrew calendar when that happened.

Jeremiah's whole book leads toward this one devastating month.

Everything written in this book was building toward that day.

🔥 586 BC is the disaster this points to

🧱 Babylon broke through Jerusalem's walls

🏛️ The temple burned and people were exiled

📖 Every warning built toward this one day

# Jeremiah 1:4-5
# 🌱 Known Before Birth
---
## 🌱 Before I Formed Thee In The Belly I Knew Thee

God says he knew Jeremiah before he ever existed as a formed body.

This is not simply knowledge of facts about a future person.

In this context, "knew" carries the weight of a personal, chosen relationship.

God had already set Jeremiah apart for this exact work before his birth.

Jeremiah's calling did not begin with his own decision to serve God.

It began with God's decision, made long before Jeremiah could decide anything at all.

🌱 God knew Jeremiah before he was born

🤝 Knew here means a chosen relationship

📜 His calling started before his own choice

📖 God decided first, Jeremiah simply followed

## 🕊️ I Sanctified Thee

"Sanctified" means set apart for a special, holy purpose.

It is the same word used for setting apart priests, the temple, and the Sabbath.

God was not describing Jeremiah's personality or talent here.

He was describing a decision, marking Jeremiah out before anyone else had a say.

That setting apart happened before Jeremiah ever spoke a single word as a prophet.

🕊️ Sanctified means set apart for God

🏛️ The same word describes priests and the temple

👶 God marked him out before birth

📖 His purpose was decided, not earned

## 🌍 A Prophet Unto The Nations

Most prophets in the Old Testament spoke mainly to Israel or Judah.

Jeremiah's calling is bigger from the very first verse.

God names him a prophet unto the nations, not to Judah alone.

Later chapters show him speaking judgment over Egypt, Babylon, Moab, and other foreign nations.

His message was never meant to stay inside one small country.

🌍 Jeremiah's calling reached beyond Judah

📯 He would speak to whole nations

⚖️ Egypt, Babylon, and Moab all hear his words

📖 God's message was never just local

# Jeremiah 1:6-8
# 😟 Jeremiah's Fear
---
## 👶 I Am A Child

Jeremiah's protest is not about his exact age in years.

The Hebrew word here often describes someone young and inexperienced, not yet ready to lead.

Jeremiah feels unqualified to speak for God to kings and nations.

His fear sounds a lot like Moses, who also protested that he could not speak well.

God does not deny Jeremiah is young.

He simply refuses to let that excuse cancel the calling.

👶 Jeremiah calls himself too young

🗣️ He feels unqualified to speak for God

🔁 His protest echoes Moses' own excuse

📖 Youth does not cancel a real calling

## 🛡️ Be Not Afraid Of Their Faces

This is a Hebrew way of saying, do not be intimidated by how people look or react.

Kings, priests, and princes could all look powerful and frightening in person.

God is not promising Jeremiah an easy audience.

He is promising Jeremiah will not have to be controlled by fear of them.

Facing down powerful people is exactly what Jeremiah's whole ministry will require.

🛡️ Their faces means their presence or reaction

👑 Kings and priests could look frightening

😨 God does not promise an easy audience

📖 Fear of people would not control Jeremiah

## 🤝 I Am With Thee To Deliver Thee

This promise answers Jeremiah's fear directly.

God does not remove the danger Jeremiah will face.

He promises his own presence inside every dangerous moment ahead.

"Deliver" means God will rescue Jeremiah when real trouble arrives, not just comfort him with words.

The same promise repeats again later in this very chapter.

🤝 God promises presence, not an easy path

🛡️ Deliver means real rescue, not comfort

🔁 The same promise returns later in the chapter

📖 Presence, not safety, is what God gives

# Jeremiah 1:9-10
# 👄 Words In His Mouth
---
## ✋ Touched My Mouth

God's hand touching Jeremiah's mouth is a symbolic act of commissioning.

Isaiah receives a similar sign later, when a coal touches his lips.

The gesture marks the exact moment Jeremiah becomes God's spokesman.

It is not a magic trick.

It is a visible sign of an invisible calling.

From this point forward, Jeremiah speaks with real authority behind his words.

✋ God's hand touches Jeremiah's mouth

🔥 Isaiah later gets a similar sign

🎙️ This marks his true commissioning

📖 A visible sign of an invisible calling

## 🗣️ I Have Put My Words In Thy Mouth

This line settles where Jeremiah's message actually comes from.

He does not invent his own opinions and call them prophecy.

God supplies the exact words Jeremiah is required to speak.

That protects Jeremiah when his message makes people furious.

He can honestly say the words are not his own.

🗣️ God supplies the actual words

🚫 Jeremiah does not invent his message

🛡️ This protects him from later blame

📖 A true prophet speaks borrowed words

## 🌳 To Root Out, And To Pull Down, And To Destroy, And To Throw Down, To Build, And To Plant

This verse gives Jeremiah's calling six action words at once.

Four are about tearing down, to root out, pull down, destroy, and throw down.

Two are about building something new, to build and to plant.

Jeremiah's ministry will spend more time tearing down false hope than building.

Judgment always makes room for something God plants afterward.

🌳 Six action words describe his mission

💥 Four verbs mean tearing down

🌱 Two verbs mean building something new

📖 Judgment clears room for new growth

# Jeremiah 1:11-12
# 🌰 The Almond Rod
---
## 🌰 A Rod Of An Almond Tree

God asks Jeremiah what he sees, and Jeremiah answers plainly, an almond branch.

In Hebrew, the word for almond sounds almost identical to the word for watching.

The almond tree also blooms earlier than any other tree in the region.

Both details point to the same idea, God is alert and moving first.

A simple object in Jeremiah's own yard becomes a message about God's timing.

🌰 Almond in Hebrew sounds like watching

🌸 It blooms before any other tree

👁️ Both point to God watching closely

📖 An ordinary branch carries a real message

## ⏳ I Will Hasten My Word To Perform It

"Hasten" connects directly to the wordplay in the almond vision.

God is not slow to bring about what he has spoken.

This is a promise about God's timing, not just his power.

Jeremiah can trust that his hard message will actually happen.

Delay does not mean a word from God was empty.

⏳ Hasten connects to the almond wordplay

⚡ God is not slow to act

📅 This is a promise about timing

📖 A delayed word is not an empty one

# Jeremiah 1:13-16
# 🍲 The Seething Pot
---
## 🍲 A Seething Pot, And The Face Thereof Toward The North

God gives Jeremiah a second vision, a boiling pot in a fire.

The pot is tipped so its contents spill out toward the south.

That spill pictures disaster pouring down onto Judah itself.

Babylon sat mostly east of Judah on a map.

Its armies still had to travel the long route through the north to invade.

🍲 A boiling pot tips toward Judah

🌊 Its spill pictures coming disaster

🗺️ Babylon's armies still came from the north

📖 The route mattered more than the map

## 🌩️ Out Of The North An Evil Shall Break Forth

God names the source of Judah's coming disaster plainly here.

"The north" points to the direction every major invader actually traveled.

Assyria had already come this way once before Jeremiah's own lifetime.

Babylon will follow that same road a generation later.

The warning is specific, not a vague threat of trouble somewhere.

🌩️ Disaster is named plainly here

🧭 The north was the real invasion route

⚔️ Assyria already came this same way

📖 This warning is specific, not vague

## 👑 Set Every One His Throne At The Entering Of The Gates

Ancient conquerors sometimes set up their own throne at a captured city's gate.

It was a public display, proof of who now held power there.

God pictures foreign kings doing exactly that at Jerusalem's own gates.

The image is meant to shock a people who felt safe behind those walls.

Judah's security was never really in its walls to begin with.

👑 Kings set thrones at captured gates

🏙️ It publicly proved who now ruled

😨 This pictures Jerusalem's own gates falling

📖 Walls never were Judah's true safety

## 🔥 Burned Incense Unto Other Gods

This names the actual charge behind all the coming judgment.

Judah had turned to worship other gods, not only the LORD.

"Burned incense" describes a normal act of worship in that culture.

"The works of their own hands" points to idols people carved and then bowed down to.

Judgment in this chapter answers a real, named sin, not a vague anger.

🔥 This names the real charge here

🙏 Judah worshiped gods besides the LORD

🗿 The works of their hands means idols

📖 Judgment answers a named sin, not chance

# Jeremiah 1:17-19
# 🛡️ Facing The Opposition
---
## 🛡️ Gird Up Thy Loins

Everyday robes in this culture hung long and loose.

Before hard work or a fight, a man tucked the loose robe into his belt.

"Gird up thy loins" simply means get ready for serious work ahead.

God is telling Jeremiah to stop hesitating and prepare to act.

There will be no easy, comfortable season for this calling.

🛡️ Loose robes were tucked in before work

🏃 The phrase means get ready now

⚡ God tells Jeremiah to stop hesitating

📖 No easy season is coming for him

## 🏰 A Defenced City, And An Iron Pillar, And Brasen Walls

God gives Jeremiah three images of strength, all things people build for defense.

A city wall, an iron pillar, and bronze walls.

"Brasen" is an old word for bronze, a strong and durable metal.

None of that strength comes from Jeremiah's own courage.

God is describing what he will make Jeremiah able to withstand.

🏰 Three images picture real strength

🥉 Brasen is an old word for bronze

💪 The strength is not Jeremiah's own

📖 God supplies what he cannot supply himself

## ⚔️ Against The Kings Of Judah, Against The Princes Thereof, Against The Priests

This list names Jeremiah's opposition plainly.

It is not a foreign army first, it is his own nation's leaders.

Kings, officials, priests, and ordinary people all appear on this list.

Jeremiah's hardest battles will happen inside his own community, not outside it.

A true prophet often faces more resistance from home than from enemies abroad.

⚔️ Opposition comes from Jeremiah's own nation

👑 Kings, priests, and people all resist him

🏠 His hardest fight is close to home

📖 True prophets often suffer most at home

## 🛡️ They Shall Not Prevail Against Thee

God ends the chapter with a flat promise, not a maybe.

Opposition is guaranteed, but so is the outcome.

"Prevail" means to win completely, to finally overcome someone.

Jeremiah will face real attacks across his whole ministry.

None of them will ever succeed in silencing God's word through him.

🛡️ God promises real, guaranteed protection

⚔️ Prevail means to fully overcome someone

🗣️ Jeremiah's enemies will keep attacking

📖 None of them will ever silence him
`.trim();

export const JEREMIAH_ONE_PERSONAL_SECTIONS = parseJeremiahOneRawNotes(JEREMIAH_ONE_RAW_NOTES);
