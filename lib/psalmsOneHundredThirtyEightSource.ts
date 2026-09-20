export type PsalmsOneHundredThirtyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirtyEightRawNotes(rawText: string): PsalmsOneHundredThirtyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirtyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+138:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 138 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+138:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+138:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 138 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 138,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 138:${startVerse}` : `Psalms 138:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 138 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTY_EIGHT_RAW_NOTES = `# Psalms 138:1-4
# 🎤 Praise Loud Enough For Rivals To Hear
---
## ⚖️ Before The Gods Will I Sing Praise Unto Thee

"Gods" here does not mean David believed in many real gods.

Hebrew judges and rulers were sometimes called elohim, the same word used for God.

Other nations also worshiped many so called gods that could not compare.

David sings his praise loud enough to be heard in their presence.

He is not competing with real gods.

He is showing whose praise wins even in the room with rivals.

⚖️ Gods can mean judges or foreign idols
👑 Elohim also names human rulers
🗣️ David praises loud among rivals
📖 True praise wins even among false gods

## 🕍 I Will Worship Toward Thy Holy Temple

"Worship toward" the temple meant praying in its direction, not physically inside it.

Israelites did this even from far away, without needing the temple in sight.

Facing that direction was itself an act of worship.

Daniel later prayed toward Jerusalem three times a day, even from Babylon.

The temple held the presence of God in a way no other place did.

Praying toward it meant turning the heart toward God Himself.

🕍 Worship toward means praying in that direction
📍 This worked even from far away
📜 Daniel prayed toward Jerusalem from Babylon too
📖 Facing the temple turned the heart to God

## 💗 Thy Lovingkindness And For Thy Truth

"Lovingkindness" translates a Hebrew word meaning loyal, covenant love.

It describes love that keeps a promise no matter what.

"Truth" here means faithfulness, not just factual accuracy.

Together these two words describe how God keeps His word over time.

He does not love one day and walk away the next.

His love and faithfulness move together, never apart.

💗 Lovingkindness means loyal covenant love
🤝 It keeps a promise no matter what
✅ Truth means faithfulness, not just facts
📖 God's love and faithfulness never separate

## 📜 Thou Hast Magnified Thy Word Above All Thy Name

God has made His own promise more important than His own reputation.

"Magnified" means lifted up and treated as greater.

His "name" stood for His whole reputation among the nations.

Yet God ties His reputation to keeping His word.

If His word ever failed, His name would fail with it.

God ties Himself to what He has said, not just who He is.

📜 Magnified means lifted up as greater
🏷️ Name stood for God's whole reputation
🔗 God ties His reputation to His word
📖 God keeps what He says, always

## 📣 In The Day When I Cried Thou Answeredst Me

"Cried" here means calling out to God in real distress, not casual complaining.

This looks back to a specific moment David remembered clearly.

"Answeredst" means God responded, not that David simply felt better on his own.

The order matters here.

David cried first, and God answered after.

This verse becomes his evidence that prayer actually works.

📣 Cried means calling out in real distress
🙏 Answeredst means God actually responded
⏱️ David cried first, God answered after
📖 This became David's proof that prayer works

## 🧠 Strengthenedst Me With Strength In My Soul

This strength was not physical muscle.

"Soul" here means the inner self, the will and emotions.

God strengthened David's courage and resolve from the inside.

The outside trouble had not disappeared yet.

Inner strength can grow before outside circumstances change.

God builds the inside first.

🧠 Strength here means inner, not physical
🌱 Soul means the will and emotions
💪 God strengthened David from the inside
📖 God builds inner strength before outer relief

## 👑 All The Kings Of The Earth Shall Praise Thee

This promise reaches far beyond Israel's own borders.

David pictures foreign kings eventually praising the God of Israel.

That was a bold hope in a world full of rival gods and nations.

"The words of thy mouth" points to God's own spoken revelation reaching them.

This looks forward to a day when all nations recognize the LORD.

Prophets like Isaiah pick up this same hope later.

👑 This promise reaches beyond Israel alone
🌍 Foreign kings would one day praise the LORD
🗣️ God's own words would reach them
📖 Isaiah later echoes this same hope

# Psalms 138:5-8
# 🛡️ Trouble, Trust, And Unfinished Work
---
## 🎶 They Shall Sing In The Ways Of The LORD

"Ways of the LORD" means how God acts and rules.

Singing in His ways means celebrating His actions, not staying silent.

This links back to the kings praising God in the verse before.

Their praise now becomes real participation.

"Great is the glory of the LORD" gives the reason for that song.

His greatness alone is worth singing about.

🎶 Ways of the LORD means His actions
🙌 Singing means celebrating, not just observing
🔗 This continues the kings' praise from before
📖 His greatness is the reason for the song

## ⛰️ Though The LORD Be High Yet Hath He Respect Unto The Lowly

God is high above everything, yet He is not distant from ordinary people.

"Respect" here means He pays attention and cares, not just formal politeness.

"The lowly" means people the world often overlooks or looks down on.

His greatness does not make Him hard to reach.

It makes His attention to the lowly even more surprising.

Bigness and closeness sit together in Him without contradiction.

⛰️ God is high above everything that exists
👀 Respect here means real attention and care
🤲 Lowly means people others overlook
📖 God's height never blocks His closeness

## 🚧 The Proud He Knoweth Afar Off

"Knoweth afar off" does not mean God cannot see the proud clearly.

It means He keeps them at a distance.

He does not let them draw close.

Pride pushes away the closeness that humility invites.

This is the flip side of the verse before it.

The lowly receive nearness.

The proud receive distance.

🚧 Knoweth afar off means kept at a distance
🙅 God does not let pride draw close
🤝 Lowly receive nearness, proud receive distance
📖 This flips the promise from the verse before

## 🌊 Though I Walk In The Midst Of Trouble Thou Wilt Revive Me

"Midst of trouble" means trouble surrounding him on every side.

This is not a small, passing problem.

"Revive" here means restoring life and strength.

That is more than simply feeling encouraged.

David is not expecting an easy road.

His confidence is that God keeps him alive and strong through real trouble.

🌊 Midst of trouble means surrounded on all sides
🩹 Revive means restoring life and strength
🛡️ David does not expect an easy road
📖 God sustains him through real trouble

## ✋ Thou Shalt Stretch Forth Thine Hand Against The Wrath Of Mine Enemies

"Hand" here is a common Bible picture for God's power in action.

Stretching it out pictures God actively intervening, not staying passive.

"Wrath of mine enemies" points to real, hostile anger aimed at David.

God's hand moves directly against that hostility.

This is protection pictured as action, not just a feeling of safety.

David is not just hoping for peace.

He is picturing God physically standing between him and danger.

✋ Hand pictures God's power in action
⚡ Stretching it out means active intervening
😠 Wrath of mine enemies means real hostility
📖 God pictures Himself standing between David and danger

## 🏗️ The LORD Will Perfect That Which Concerneth Me

"Perfect" here means finish completely, not flawless or without fault.

"Concerneth me" points to everything happening in David's life right now.

David trusts God to complete what He already started in him.

This looks forward to a promise, not backward to something already done.

The confidence is that God does not leave things half built.

He finishes what He begins.

🏗️ Perfect here means finish completely
📋 Concerneth me means David's whole life
🙏 David trusts God to complete His work
📖 God does not leave things half built

## 🔁 Thy Mercy O LORD Endureth For Ever

This exact phrase is the refrain repeated many times in Psalm 136.

David borrows a phrase every worshiper already knew by heart.

"Mercy" here means the same covenant love mentioned back in verse 2.

Placing it here reminds David that this promise never runs out.

He asks God to finish His work, but he already trusts the outcome.

Confidence and request sit side by side in this one verse.

🔁 This phrase echoes the refrain in Psalm 136
💗 Mercy repeats the covenant love from verse 2
♾️ Endureth for ever means it never runs out
📖 Confidence and request stand together here

## 🙌 Forsake Not The Works Of Thine Own Hands

This is David's closing request, not a statement of doubt.

"The works of thine own hands" means David himself, made and shaped by God.

He is appealing to God's own investment in him.

Abandoning David would mean abandoning something God Himself built.

The psalm that began with bold praise ends with a humble plea.

Confidence and need for God sit together in the same prayer.

🙌 Works of thine own hands means David himself
🛠️ God Himself made and shaped him
🤲 David appeals to God's own investment
📖 Bold praise ends with a humble plea
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTY_EIGHT_PERSONAL_SECTIONS = parsePsalmsOneHundredThirtyEightRawNotes(
  PSALMS_ONE_HUNDRED_THIRTY_EIGHT_RAW_NOTES
);
