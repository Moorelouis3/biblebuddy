export type IsaiahFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFourRawNotes(rawText: string): IsaiahFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 4:${startVerse}` : `Isaiah 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Isaiah 4 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FOUR_RAW_NOTES = `# Isaiah 4:1
# 😔 Take Away Our Reproach
---
## 🙋 Seven Women Shall Take Hold Of One Man

Seven does not mean an exact count of women.

The Bible often uses seven to picture completeness or extreme scale.

Chapter three just pictured Judah's fighting men falling by the sword.

This verse shows what that loss left behind.

Far more women were left alive than men.

Take hold pictures women pursuing marriage instead of being sought after.

The war just described explains why marriage becomes this desperate.

🔢 Seven pictures scale, not a headcount
⚔️ Chapter three's war removed the men
👩 Far more women than men remained
📖 Desperation now drives them to seek marriage
---
## 🍞 We Will Eat Our Own Bread, And Wear Our Own Apparel

A husband was normally expected to provide food and clothing for his wife.

That support was a basic part of what marriage was supposed to guarantee.

These women offer to give up that expectation completely.

They will feed and clothe themselves.

They will ask for nothing in return.

That shows how badly they want to escape the shame of staying unmarried.

🍞 Husbands normally provided food and clothing
🙅 These women give up that support
💪 They will provide for themselves instead
📖 They want marriage, not material provision
---
## 😔 Only Let Us Be Called By Thy Name, To Take Away Our Reproach

Reproach means public shame, not simply personal embarrassment.

In this culture, an unmarried or childless woman carried a lasting social stigma.

Being called by a man's name simply meant becoming his legal wife.

That title alone was enough to remove the shame these women carried.

They are not asking for love or provision, only for the status marriage gave them.

😔 Reproach means public shame
👰 A man's name meant legal wife status
🚫 Being unmarried carried lasting stigma
📖 Status matters more here than provision
---
# Isaiah 4:2-3
# 🌿 The Branch Of The LORD
---
## 🌿 The Branch Of The LORD Be Beautiful And Glorious

Branch is a title, not a description of a plant.

Isaiah, Jeremiah, and Zechariah all use branch for a future ruler from David's line.

That ruler was expected to grow out of a family that looked cut down.

Beautiful and glorious describes honor being restored.

That honor returns after chapters of shame and judgment.

That same word branch reappears later in Isaiah pointing toward a coming king.

🌿 Branch is a title, not a plant
👑 It points to a future ruler from David
🌱 That ruler grows from a cut down line
📖 Honor returns after chapters of judgment
---
## 🌾 The Fruit Of The Earth Shall Be Excellent And Comely

Fruit of the earth points to real crops and harvests, not just a symbol.

Chapter three pictured a city stripped of food and worn down by siege.

This verse promises the opposite, land that produces abundantly again.

The physical land and the coming ruler are restored together, not separately.

🌾 Fruit of the earth means real crops
🏚️ Chapter three pictured food stripped away
🌱 This verse promises abundance instead
📖 Land and ruler are restored together
---
## 🙌 For Them That Are Escaped Of Israel

Escaped does not mean everyone in Israel receives this promise.

It points to survivors, the remnant left after the judgment already described.

Not the whole nation returns to blessing, only those who remain.

This remnant idea repeats often across the rest of Isaiah's book.

🙌 Escaped means survivors, not everyone
🌾 Only a remnant receives this promise
🔁 This idea repeats often in Isaiah
📖 Judgment and hope both narrow to the remnant
---
## 🕊️ He That Is Left In Zion, And He That Remaineth In Jerusalem

Left and remaineth both describe the same group, described twice for weight.

Zion and Jerusalem also name the same place from two different angles.

Repeating both pairs makes the promise land with more certainty.

Nothing about this promise is vague or accidental in its wording.

🕊️ Left and remaineth name the same group
🏙️ Zion and Jerusalem name the same city
🔁 Repetition adds certainty to the promise
📖 Nothing here is vague or accidental
---
## ✨ Shall Be Called Holy

Holy means set apart for God, not simply morally good.

Being called holy is a title given to this remnant, not something they earned.

It marks them as belonging to God after the judgment on the wider nation.

The name itself becomes proof of their new status.

✨ Holy means set apart for God
🎁 The title is given, not earned
🙏 It marks belonging after judgment
📖 The name itself proves their new status
---
## 📜 Written Among The Living In Jerusalem

Written among the living pictures an official record kept by God.

Ancient cities kept lists of citizens who belonged and had legal standing.

This borrows that picture and applies it to those who survive.

Being named on that list guarantees a place in the city's future.

📜 A written list pictures God's own record
🏛️ Cities once kept lists of true citizens
✅ Being listed guarantees a place
📖 The remnant's future is officially secured
---
# Isaiah 4:4-6
# 🛡️ A Cloud By Day, A Fire By Night
---
## 🧼 Washed Away The Filth Of The Daughters Of Zion

Filth here does not describe dirt or physical uncleanness.

Chapter three named the daughters of Zion and their proud, showy behavior.

Filth pictures the moral corruption behind that display.

Washing pictures God removing that corruption completely, not scrubbing away dust.

🧼 Filth means moral corruption, not dirt
💃 Chapter three named this same group
🔄 Washing pictures complete removal of sin
📖 The cleansing answers the pride shown earlier
---
## 🩸 Purged The Blood Of Jerusalem From The Midst Thereof

Blood here points to violence and bloodguilt, not a literal stain.

Prophets often use blood this way to describe injustice and murder within a city.

Purged means removed completely, the same word used for cleaning out something contaminated.

Jerusalem is pictured as a place that needs this violence cleared out from its core.

🩸 Blood pictures violence and injustice
⚖️ Prophets use this word for bloodguilt
🧹 Purged means removed completely
📖 The city needed this cleared from its core
---
## 🔥 By The Spirit Of Judgment, And By The Spirit Of Burning

Spirit here describes a force or power at work, not only a person.

Judgment describes God's decision setting things right.

Burning pictures fire that refines metal, burning away what is impure.

Both words together describe cleansing that is thorough and painful, not gentle.

🔥 Burning pictures a refining fire
⚖️ Judgment means God setting things right
💪 Spirit describes a power at work
📖 The cleansing is thorough, not gentle
---
## ☁️ A Cloud And Smoke By Day, And The Shining Of A Flaming Fire By Night

Cloud by day and fire by night are not a new image in the Bible.

God led Israel through the wilderness with exactly this same cloud and fire.

That same guiding presence is now promised to rest permanently over Zion.

This is not a passing visit.

It becomes a covering over the whole city.

☁️ Cloud and fire led Israel long ago
🏕️ The same guiding presence returns here
🏙️ It rests over the whole city
📖 God's presence becomes permanent, not passing
---
## 🛡️ For Upon All The Glory Shall Be A Defence

Glory here points to God's own visible presence resting over the city.

Defence pictures a covering that protects, not just something beautiful to look at.

The very presence that shows God's glory also becomes Zion's protection.

That protection is what the next verse describes in physical detail.

✨ Glory means God's visible presence
🛡️ Defence means a covering that protects
🔗 Presence and protection are the same
📖 The next verse pictures this literally
---
## ⛺ A Tabernacle For A Shadow In The Day Time From The Heat

Tabernacle here simply means a shelter or covering, not the specific tent of worship.

Judean summers brought harsh, direct heat with little natural shade in open areas.

This shelter promises relief from that heat as an act of God's care.

The same presence pictured as cloud and fire now also shades the people.

⛺ Tabernacle means shelter, not one specific tent
☀️ Judean heat made shade valuable
🌥️ This shelter offers relief from that heat
📖 The same presence now also shades the people
---
## 🌧️ A Place Of Refuge, And A Covert From Storm And From Rain

Refuge names a safe place to run to in danger.

Covert describes a hidden, sheltered spot away from a coming storm.

Together they promise protection from every direction, heat, storm, and rain alike.

This chapter opened with judgment and shame.

It closes here with total shelter instead.

🏃 Refuge means a safe place to run to
🌧️ Covert means shelter from a storm
🧭 Protection covers every direction
📖 Judgment gives way to total shelter
`.trim();

export const ISAIAH_FOUR_PERSONAL_SECTIONS = parseIsaiahFourRawNotes(ISAIAH_FOUR_RAW_NOTES);
