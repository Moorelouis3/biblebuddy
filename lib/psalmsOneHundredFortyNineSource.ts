export type PsalmsOneHundredFortyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFortyNineRawNotes(rawText: string): PsalmsOneHundredFortyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFortyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+149:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 149 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+149:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+149:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 149 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 149,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 149:${startVerse}` : `Psalms 149:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 149 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FORTY_NINE_RAW_NOTES = `# Psalms 149:1-3
# 🎶 A New Song For God's People
---
## 🎶 Sing Unto The LORD A New Song

"A new song" in the Psalms almost always follows something God has just done.

Psalm 96, 98, and 144 all use this same phrase after a fresh victory.

This whole psalm builds toward a new act of deliverance still ahead.

Praise here looks toward what God is about to do, not only what already happened.

🎶 New song follows a mighty act
🔢 Psalms 96, 98, and 144 match this
⏳ This song points to what is coming
📖 Praise looks toward what God will do

## 🙏 Congregation Of Saints

"Saints" here does not mean people who are extra holy or set apart from everyone else.

It translates a Hebrew word describing people loyal to God through covenant.

Every ordinary worshipper singing this song already counts as a saint in that sense.

This is the whole assembled community, not one special class of people.

🙏 Saints means people loyal to God
🤝 The word points to covenant loyalty
👥 It describes the whole gathered assembly
📖 Ordinary worshippers are called saints here

## 👑 Rejoice In Him That Made Him

"Made him" does not describe God simply creating one more person alongside others.

It pictures God forming the entire nation of Israel out of nothing.

Isaiah uses this same picture, God shaping Israel the way a potter shapes clay.

Israel's joy in this verse is joy in its own birth as a nation.

👑 Made him means forming a nation
🏺 Isaiah pictures God as a potter
🌅 This describes Israel's national birth
📖 Israel rejoices in how God formed it

## 🏛️ Be Joyful In Their King

"Their King" names God Himself as Israel's ruler, not a human monarch.

Zion is the mountain in Jerusalem where God's presence dwelt among His people.

Israel would later ask for a human king instead, in First Samuel eight.

This verse says God was already Israel's true King before that request.

🏛️ Their King refers to God Himself
⛰️ Zion is where God's presence dwelt
👑 Israel later asked for a human king
📖 God was already Israel's true king

## 🩰 Praise His Name In The Dance

"Dance" here means using full body movement as an act of worship, not entertainment.

Miriam danced this same way after Israel crossed the Red Sea.

David danced before the ark with that same kind of full body praise.

Worship in this psalm involves the whole body, not just the voice.

🩰 Dance means worship with the body
🌊 Miriam danced after the Red Sea
👑 David danced before the ark too
📖 Worship here uses the whole body

## 🥁 With The Timbrel And Harp

A "timbrel" was a small hand held drum, close to what we would call a tambourine.

A "harp" was a small stringed instrument, closely tied to David throughout the Psalms.

Both instruments were common at Israel's biggest celebrations, not everyday music.

These instruments turn this verse's praise into a full public celebration.

🥁 Timbrel means a small hand drum
🎻 Harp means a small stringed instrument
🎉 Both were used at big celebrations
📖 This praise becomes a public celebration

# Psalms 149:4-6
# ⚔️ Praise And The Sword Together
---
## 💛 Taketh Pleasure In His People

"Taketh pleasure" means God takes real delight in His people, not simple approval.

This is the same kind of joy a parent feels watching a child they love.

The verse ties that delight directly to what God does for the meek next.

God's pleasure in His people is never distant or reluctant.

💛 Pleasure means real delight
👪 It feels like a parent's joy
🔗 This delight leads into the next line
📖 God's pleasure in His people is not distant

## 🤍 Beautify The Meek With Salvation

"Meek" here means people who are humble or treated unfairly by others, not weak.

"Beautify" means to dress someone up, the way a king might honor a guest.

Here salvation itself becomes the meek person's honor and adornment.

The people the world overlooks are the very ones God dresses in honor.

🤍 Meek means humble or mistreated
👑 Beautify means to honor like royalty
✨ Salvation itself becomes their adornment
📖 God honors the people the world overlooks

## 🌟 Be Joyful In Glory

"Glory" here means honor or weight given by God, not personal fame.

This picks up the exact honor promised to the meek one verse earlier.

The joy described here is a response to being honored by God Himself.

Real glory in this psalm always comes from God, never self made.

🌟 Glory means honor given by God
🔁 This continues the honor from verse four
😊 Joy responds to being honored
📖 Glory always comes from God

## 🌙 Sing Aloud Upon Their Beds

This does not describe singing while trying to fall asleep.

It pictures private worship at night, away from public gathering.

Psalm 63 describes this same habit of remembering God in the night hours.

Praise in this psalm is not only public, it also fills quiet moments.

🌙 This is nighttime, private worship
🛏️ It happens away from public gathering
📜 Psalm 63 describes this same habit
📖 Praise fills quiet moments too

## 📣 High Praises Of God

"High praises" describes loud, unrestrained vocal worship, not a quiet prayer.

"In their mouth" means this praise is spoken and sung out loud.

The psalm has already called for dancing and instruments, and now it adds a raised voice.

Every part of the body is now joined in this one act of praise.

📣 High praises means loud worship
🗣️ In their mouth means spoken aloud
🔁 This adds voice to dance and instruments
📖 The whole body now praises together

## ⚔️ Two Edged Sword In Their Hand

This sword does not cancel out the praise in the verse before it.

Many scholars believe this verse pictures worship and battle moving forward together.

Second Chronicles twenty describes Judah's singers marching out ahead of the army itself.

Praise here leads directly into the judgment that follows.

⚔️ The sword does not cancel the praise
🎵 Worship and battle move here together
📜 Second Chronicles twenty shows singers leading an army
📖 Praise here leads into judgment

# Psalms 149:7-9
# 👑 Judgment Given To The Saints
---
## 🗡️ Execute Vengeance Upon The Heathen

"Vengeance" here means God's own just judgment, not personal revenge.

"The heathen" refers to nations that stood against God and His people.

God's people act here as the instrument, not the source, of this judgment.

This judgment belongs to God, not to His people alone.

🗡️ Vengeance means God's own judgment
🌍 The heathen means nations against God
🤝 God's people are the instrument here
📖 Judgment belongs to God alone

## ⚖️ Punishments Upon The People

"The people" here repeats "the heathen" from the line just before it.

Hebrew poetry often says the same thing twice using two different words.

Both lines point to the same nations opposed to God.

One idea is being said twice here, not two separate groups.

⚖️ The people repeats the heathen above
🔁 Hebrew poetry often repeats one idea
🌍 Both point to the same nations
📖 One idea, said here twice

## ⛓️ Bind Their Kings With Chains

This pictures defeated kings led away in chains after a battle.

Ancient nations often paraded captured rulers this way to display a real victory.

Naming kings specifically shows that no earthly ruler stands above God's judgment.

Even the highest human power bends under God's authority here.

⛓️ This pictures captured, defeated kings
🏆 Ancient nations paraded captives after victory
👑 No earthly ruler outranks God
📖 Even the highest power bends here

## 🔩 Nobles With Fetters Of Iron

"Fetters" were heavy iron shackles locked around the hands or feet.

"Nobles" ranked below kings, so this verse binds an entire ruling class.

Both leaders and their officials fall under the same judgment together.

No level of human leadership escapes this reckoning.

🔩 Fetters means heavy iron shackles
👥 Nobles ranked just below kings
⛓️ Both ranks share the same judgment
📖 No leader escapes this reckoning

## 📜 The Judgment Written

This judgment is not a sudden decision made in the heat of anger.

"Written" points back to a sentence already recorded before this moment.

God's people are carrying out something already decreed, not inventing a punishment.

What happens here was decided long before it is carried out.

📜 Written means already recorded before now
🚫 This is not a sudden decision
📖 God's people carry out what is decreed
➡️ Judgment here was decided long ago

## 🎊 This Honour Have All His Saints

Carrying out God's judgment is called an honour here, not a burden.

Normally this kind of honour would belong only to a victorious king.

Here it belongs instead to God's own ordinary people.

The psalm ends exactly where it began, praise ye the LORD.

🎊 This honour is not a burden
👑 Normally only kings received this honour
🙏 Instead it belongs to God's people
📖 The psalm ends where it began
`.trim();

export const PSALMS_ONE_HUNDRED_FORTY_NINE_PERSONAL_SECTIONS = parsePsalmsOneHundredFortyNineRawNotes(
  PSALMS_ONE_HUNDRED_FORTY_NINE_RAW_NOTES,
);
