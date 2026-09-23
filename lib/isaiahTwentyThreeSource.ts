export type IsaiahTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwentyThreeRawNotes(rawText: string): IsaiahTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 23:${startVerse}` : `Isaiah 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Isaiah 23 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWENTY_THREE_RAW_NOTES = `# Isaiah 23:1-3
# ⚓ The Burden Of Tyre
---
## 🌊 The Burden Of Tyre

"Burden" means a message of coming judgment, not a heavy object to carry.

Tyre stood as one of the richest trading cities in the ancient world.

Its ships sailed the whole Mediterranean Sea gathering wealth from many nations.

This whole chapter announces that Tyre's great trading empire is about to collapse.

🌊 Burden means a coming message of judgment
⚓ Tyre was one of the richest trading cities
🚢 Its ships gathered wealth from many nations
📖 This chapter predicts Tyre's coming collapse

---
## ⛵ Howl, Ye Ships Of Tarshish

Tarshish was a distant trading port, likely far to the west near Spain.

Ships bound there for business are told to cry out in grief instead.

The text adds that there is no house left, no door to enter.

Word of Tyre's fall reached these sailors before they ever came home.

⛵ Tarshish was a distant western trading port
😭 Howl means cry out loud in grief
🏚️ No house is left, no door remains
📖 Bad news reached sailors before they got home

---
## 🏝️ From The Land Of Chittim It Is Revealed To Them

"Chittim" is another name for the island of Cyprus.

Cyprus sat along the normal shipping route home from Phoenicia.

Sailors first learned that Tyre had fallen while stopping there.

Bad news can reach a traveler before it reaches their own front door.

🏝️ Chittim was the ancient name for Cyprus
🧭 Cyprus sat along the trade route home
📢 Sailors heard the news while stopping there
📖 Bad news can outrun a traveler home

---
## 🏙️ The Merchants Of Zidon That Pass Over The Sea

"Zidon," also spelled Sidon, was Tyre's older sister city on the coast.

Its merchants sailed the sea and grew rich trading with many lands.

"Sihor" is another name for the Nile River, Egypt's great waterway.

Grain and goods flowing down that river became part of Tyre's steady income.

The text calls Tyre "a mart of nations," a marketplace for the whole world.

🏙️ Zidon was Tyre's older sister city
💰 Zidon's merchants grew rich from sea trade
🌊 Sihor is another name for the Nile River
📖 Tyre was a marketplace for the whole world

# Isaiah 23:4-6
# 😳 Be Thou Ashamed, O Zidon
---
## 😳 Be Thou Ashamed, O Zidon

God now turns to address Zidon directly, calling out its coming shame.

Zidon had helped build Tyre's wealth as a trading partner for years.

Now that partnership is about to end in public disgrace.

Shared success is now followed by shared loss.

😳 Zidon is told to feel deep shame
🤝 Zidon helped build Tyre's wealth for years
📉 That trading partnership is about to end
📖 Partners can fall together, not just apart

---
## 🌊 The Sea Hath Spoken, Saying, I Travail Not

The prophet gives the sea itself a voice in this verse.

"Travail" means the pain of childbirth, and here the sea claims to feel none.

The sea says it has stopped producing new life, like a mother with no children.

This pictures Tyre and Zidon's trade routes going completely silent and empty.

A sea usually full of ships now sounds like a woman with nothing to show.

🌊 The sea itself speaks in this verse
👶 Travail means the pain of childbirth
🤐 The sea claims it has no pain
📖 Empty trade routes are pictured as silence

---
## 🏃 Pass Ye Over To Tarshish, Howl

Egypt had already suffered its own hard news earlier in Isaiah's prophecies.

Now Egypt hears about Tyre's fall and feels that same sharp pain.

One nation's disaster becomes bad news for every trading partner nearby.

The people of Phoenicia are told to flee toward Tarshish and mourn there.

😢 Egypt already felt this kind of pain
🔗 One nation's fall hurts its trading partners
🏃 Phoenicia is told to flee toward Tarshish
➡️ Running away cannot undo what happened

# Isaiah 23:7-9
# 👑 Is This Your Joyous City
---
## 🎉 Is This Your Joyous City, Whose Antiquity Is Of Ancient Days

"Antiquity" means great age, a history stretching back many generations.

Tyre had stood proud and joyful for centuries before this moment.

The question is asked with heavy irony, since that joy is now gone.

Her own feet will carry her far away to live as a stranger in another land.

🎉 Antiquity means a long, ancient history
🏙️ Tyre had stood joyful for centuries
❓ The question drips with bitter irony
📖 Tyre will now wander as a stranger

---
## 👑 Who Hath Taken This Counsel Against Tyre, The Crowning City

"Crowning city" pictures Tyre as a city that wore wealth like a royal crown.

Its merchants carried themselves like princes because of how much money they controlled.

Even its traders were treated as honorable men across the ancient world.

The question asks who could possibly bring down a city this powerful.

👑 Crowning city means wealth like a crown
🤵 Its merchants lived and acted like princes
🌍 Its traders were honored across the world
📖 The question asks who could topple such power

---
## ❓ The LORD Of Hosts Hath Purposed It, To Stain The Pride Of All Glory

This answers the question from the verse before directly and plainly.

It was not chance or a rival army that planned Tyre's fall.

The LORD of hosts himself purposed it from the start.

"Stain" means to ruin something's shine, like dirt on a bright surface.

Tyre's pride in its own glory is the very thing being brought down.

❓ This answers the previous question directly
👑 The LORD himself purposed Tyre's fall
🩸 Stain means to ruin something's shine
📖 Tyre's own pride is being brought down

# Isaiah 23:10-14
# 🌊 The LORD Shakes The Kingdoms
---
## 🗺️ Pass Through Thy Land As A River, O Daughter Of Tarshish

"Daughter of Tarshish" is a poetic way of naming that whole trading colony.

"Pass through thy land as a river" pictures the people spreading out and scattering.

A river has no walls to hold it back once it overflows.

Tyre no longer controls or restrains Tarshish the way it once did.

🗺️ Daughter of Tarshish names that trading colony
🌊 Passing through like a river means scattering
🧱 A river has no wall to hold it
📖 Tyre no longer restrains Tarshish at all

---
## ✋ He Stretched Out His Hand Over The Sea, He Shook The Kingdoms

This pictures God's hand reaching out over the entire Mediterranean Sea.

One simple gesture is enough to shake every kingdom that trades on it.

The LORD gave the actual command to destroy Tyre's strongholds.

"Strong holds" means fortified places built to protect the city from attack.

✋ God's hand reaches over the whole sea
🌍 One gesture shakes every trading kingdom
🏰 Strong holds means fortified defense structures
📖 No fortress stands against God's command

---
## 🛡️ O Thou Oppressed Virgin, Daughter Of Zidon

"Virgin" here pictures Zidon as a city that had never been conquered before.

"Oppressed" now describes what that untouched city is about to experience for the first time.

Zidon is told to arise and cross over to Chittim, the island of Cyprus.

Even there, no rest is promised, since the judgment follows wherever she flees.

🛡️ Virgin pictures a city never conquered
😖 Oppressed means suffering for the first time
🏝️ Zidon is told to flee toward Chittim
📖 Judgment follows even where she flees

---
## 🌱 Behold The Land Of The Chaldeans

The Chaldeans were once a small, unimportant people in the ancient world.

"This people was not" means they had no real standing as a nation before this.

The Assyrians actually built up that region for people living in the wilderness.

God can raise up a small, overlooked people to bring down an ancient power.

Tyre had centuries of history, yet this unlikely nation now stands ready to end it.

🌱 Chaldeans were once a small, unimportant people
🏗️ Assyria had built up that region first
💪 God can raise up unlikely nations
📖 An overlooked people now ends Tyre's history

---
## 🔁 Howl, Ye Ships Of Tarshish: For Your Strength Is Laid Waste

This same cry already opened the chapter back in verse one.

Now it returns to close out this section of judgment.

Repeating the refrain shows the prophecy has come full circle.

The ships that once carried treasure now carry only grief.

🔁 This cry already opened the chapter
🎯 The refrain closes out this section
⛵ Ships now carry grief instead of goods
➡️ The prophecy has come full circle

# Isaiah 23:15-18
# 🎵 Tyre Shall Sing As An Harlot
---
## 🔢 Tyre Shall Be Forgotten Seventy Years, According To The Days Of One King

"Seventy years" describes one full, complete lifetime of judgment.

"According to the days of one king" likely points to the length of a single reign.

During that whole time, Tyre would sit forgotten by the trading world.

A city once famous across the earth would simply disappear from memory.

🔢 Seventy years pictures one full lifetime
👑 It matches the length of one king's reign
🌫️ Tyre would sit forgotten the whole time
📖 A famous city disappears from memory

---
## 🎤 Tyre Shall Sing As An Harlot

After those seventy years, Tyre is pictured singing like a forgotten harlot.

In that culture, a harlot who had lost her customers would walk the streets.

She would play a harp and sing sweet songs just to be noticed again.

Tyre must now work hard to win back forgotten customers.

🎤 Tyre is pictured as a forgotten harlot
🎶 She sings to win back attention
🏙️ Tyre must work to win customers back
📖 A proud city is humbled to begging

---
## 👋 The LORD Will Visit Tyre, And She Shall Turn To Her Hire

After the seventy years end, God himself steps back into Tyre's story.

"Turn to her hire" means Tyre goes back to earning money through trade.

The city that had vanished from memory returns to business as before.

Judgment here is not the final word for Tyre.

👋 God steps back into Tyre's story
💰 Turn to her hire means earning trade money
🔄 Tyre returns to business as before
📖 Judgment was not Tyre's final word

---
## 🚫 Shall Commit Fornication With All The Kingdoms Of The World

This harsh phrase does not describe an actual physical act.

It pictures Tyre selling herself to any nation willing to pay for trade.

Loyalty in this kind of trading was owed to profit, not to God.

Tyre would deal with every kingdom on earth the same shameless way.

🚫 This phrase is not a literal act
💵 It pictures trading with anyone for profit
🌍 Tyre would deal with every kingdom
📖 Profit, not loyalty, ruled these deals

---
## 💎 Her Merchandise And Her Hire Shall Be Holiness To The LORD

This line completely reverses everything said just one verse earlier.

Money once earned through shameless trading is now called holy instead.

"Holiness to the LORD" means the profit will now be set apart for God's own use.

A pagan trading city's wealth ends up honoring the true God after all.

🔄 This verse reverses the verse before it
💎 Trade profit is suddenly called holy
🎁 Holiness means the money is set apart
📖 A pagan city's wealth ends up honoring God

---
## 🙏 For Them That Dwell Before The LORD, To Eat Sufficiently, And For Durable Clothing

"Them that dwell before the LORD" points to God's own worshiping people.

Tyre's profits would eventually supply food and clothing for that community.

"Durable clothing" means garments strong enough to last, not cheap or disposable.

A once proud, self serving city ends this chapter serving someone besides itself.

🙏 This points to God's own worshiping people
🍞 Tyre's profits would supply their food
👕 Durable clothing means clothes built to last
📖 A selfish city ends up serving others
`.trim();

export const ISAIAH_TWENTY_THREE_PERSONAL_SECTIONS = parseIsaiahTwentyThreeRawNotes(ISAIAH_TWENTY_THREE_RAW_NOTES);
