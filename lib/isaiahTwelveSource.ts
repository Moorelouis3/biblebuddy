export type IsaiahTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwelveRawNotes(rawText: string): IsaiahTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 12:${startVerse}` : `Isaiah 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Isaiah 12 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWELVE_RAW_NOTES = `# Isaiah 12:1-3
# 🎉 A Song Of Personal Thanksgiving
---
## 📅 And In That Day Thou Shalt Say

"In that day" points back to the promises just given in chapter 11.

Isaiah has just described a future king who brings perfect peace.

This song is the reply once that day finally arrives.

It moves from prophecy about the future straight into worship in the present.

The whole chapter reads like words rehearsed ahead of time for that moment.

📅 In that day points back to chapter 11

👑 Isaiah just described a coming king

🎶 This song answers that future promise

📖 Prophecy turns into worship in this chapter

## 😔 Though Thou Wast Angry With Me, Thine Anger Is Turned Away

Much of Isaiah before this point describes real anger from God.

That anger was not invented or exaggerated by the prophet.

It answered Judah's own unfaithfulness and injustice.

Here the anger is named honestly, then named as already over.

God's anger in Isaiah is real, but it never gets the last word.

😔 Isaiah has described real anger before this

⚖️ That anger answered real unfaithfulness

🔄 The anger is named as now over

📖 God's anger is real but never final

## 🙌 Behold, God Is My Salvation

"Salvation" means real rescue from danger, not a vague feeling.

The Hebrew word behind salvation is the same root the name Jesus comes from.

That name later means literally "the LORD saves."

Calling God "my salvation" makes the rescue personal, not only national.

The whole nation's hope becomes one person's own confession here.

🙌 Salvation means real rescue, not a feeling

📛 The name Jesus comes from this same word

🤝 My salvation makes the rescue personal

📖 One person's confession carries the nation's hope

## 😌 I Will Trust, And Not Be Afraid

Trust and fear cannot fill the same heart at the same time.

Isaiah has spent many chapters warning about very real reasons to be afraid.

Invading armies and coming judgment were never empty threats.

Trusting God here does not mean the danger was never real.

It means fear no longer gets the final say.

😌 Trust and fear cannot share one heart

⚔️ Isaiah warned of very real dangers

🛡️ Trusting God does not deny the danger

📖 Fear no longer has the final say

## 💪 The LORD JEHOVAH Is My Strength And My Song

"JEHOVAH" spells out God's own personal covenant name, not just a title.

That name was first fully revealed to Moses at the burning bush.

"Strength and song" repeats a phrase Moses himself sang after crossing the Red Sea.

Using that same phrase links this moment to that first great rescue.

The God who saved His people once is praised the very same way again.

💪 JEHOVAH is God's own personal covenant name

🔥 That name was first revealed to Moses

🌊 Strength and song echoes Moses at the sea

📖 The same God is praised the same way

## 💧 With Joy Shall Ye Draw Water Out Of The Wells Of Salvation

Drawing water was one of the most repetitive chores in the ancient world.

It usually meant a long, plain walk to a well every single day.

Here that same daily task is pictured overflowing with joy instead.

Later Jewish tradition tied this exact verse to a water ceremony at the Feast of Tabernacles.

Centuries later, Jesus stood at that same feast and offered living water.

💧 Drawing water was a plain daily chore

😊 Here that chore is filled with joy

🎪 Later tradition linked this to a temple feast

📖 Jesus later offered living water at that feast

# Isaiah 12:4-6
# 📣 A Call To Public Praise
---
## 🗣️ Praise The LORD, Call Upon His Name

The song shifts here from "I" to "ye," speaking to the whole community.

"Call upon his name" means approaching God directly and personally in prayer.

In the ancient world, a god's name carried real access to that god's power.

Calling on the LORD's name means approaching the one true God, not a substitute.

Personal praise has now become something the whole people are told to do together.

🗣️ The song shifts from I to ye

🙏 Call upon his name means direct prayer

🔑 A name carried access to a god's power

📖 Personal praise becomes a shared calling

## 🌍 Declare His Doings Among The People

"The people" here means the other nations, not just Israel.

Israel is told to actively tell outsiders what God has done.

This turns personal thanksgiving into public testimony.

The rest of Isaiah repeatedly pictures Israel as a light to other nations.

God's rescue was never meant to stay a private secret.

🌍 The people means nations outside Israel

📢 Israel is told to tell outsiders

💡 Isaiah pictures Israel as a light to nations

📖 God's rescue was never meant to stay private

## 🎵 He Hath Done Excellent Things

"Excellent things" means acts of power beyond ordinary human ability.

The verse does not list which specific acts it means.

Leaving it open lets the phrase cover every rescue God has done.

The exodus from Egypt and the promises of chapters 7 through 11 both count.

One general phrase holds together every act of God worth singing about.

🎵 Excellent things means acts beyond human power

❓ The verse leaves the specific acts open

📜 It can cover every rescue God has done

📖 One phrase holds all of God's work

## 🌐 This Is Known In All The Earth

"All the earth" reaches far beyond the borders of Israel.

God's mighty acts were never meant to stay a local secret.

The same universal reach already appeared in chapter 11.

A private God confined to one small nation could not fill the whole earth.

This is one people's song, but it names a truth for everyone.

🌐 All the earth reaches beyond Israel

🔁 This repeats the reach named in chapter 11

🌍 God's acts were never meant to stay local

📖 One nation's song names a truth for all

## 📯 Cry Out And Shout, Thou Inhabitant Of Zion

"Zion" was the specific hill in Jerusalem where God's presence dwelled.

Over time it came to stand for Jerusalem, and for God's people as a whole.

"Cry out and shout" describes loud, public celebration, not quiet reflection.

This is not a private prayer said alone in a room.

The whole city is called to celebrate together, out loud.

📯 Zion names the hill where God dwelled

🏙️ Zion came to stand for Jerusalem itself

📢 Cry out and shout means loud celebration

📖 The whole city celebrates together, out loud

## ✨ The Holy One Of Israel In The Midst Of Thee

"The Holy One of Israel" is one of Isaiah's favorite titles for God.

"Holy" means set apart, completely different from anything else that exists.

"In the midst of thee" means God's presence living among His people, not far away.

The chapter opened with anger and ends with God living close by.

The whole song moves from distance and judgment to nearness and joy.

✨ Holy One of Israel is a favorite title

🔱 Holy means set apart, wholly different

🏠 In the midst means God dwells close by

📖 The chapter moves from distance to nearness
`.trim();

export const ISAIAH_TWELVE_PERSONAL_SECTIONS = parseIsaiahTwelveRawNotes(ISAIAH_TWELVE_RAW_NOTES);
