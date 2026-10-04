export type HoseaSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaSixRawNotes(rawText: string): HoseaSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 6:${startVerse}` : `Hosea 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Hosea 6 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_SIX_RAW_NOTES = `# Hosea 6:1-3
# 🌅 Israel Calls Its People Back To God
---
## 🗣️ Come, And Let Us Return Unto The LORD

This verse is the people speaking to each other, not God speaking to them.

Return here means turning back after walking away on purpose.

Chapter five ended with God waiting for exactly this response.

These words answer that waiting directly.

🗣️ The people urge each other to return
🔄 Return means turning back after leaving
⏳ Chapter five ended with God waiting
📖 These words finally answer that waiting

## 🦁 He Hath Torn, And He Will Heal Us

This continues the lion image from the end of chapter five.

Torn described the violent judgment already pictured there.

Heal shows the same hand now moving to cure what it broke.

Judgment was never meant to be the end of the story.

🦁 This continues the lion image from chapter five
⚔️ Torn described the violent judgment pictured there
🩹 Heal means God Himself cures what He broke
📖 Judgment was never meant to be the end

## 🩸 He Hath Smitten, And He Will Bind Us Up

Smitten means struck down hard, not a light tap.

Bind up pictures wrapping a wound to help it heal.

This is the ordinary language of ancient medical care.

God's correction always moves toward restoring, not destroying.

🩸 Smitten means struck down hard
🩹 Bind up pictures wrapping a wound
🏥 This uses ordinary ancient medical language
📖 Correction here moves toward restoring, not destroying

## 🔁 After Two Days Will He Revive Us, In The Third Day He Will Raise Us Up

This states one idea twice in two different ways.

Hebrew poetry often repeats an idea for emphasis like this.

Two days and the third day both picture a short, certain time.

Later readers have long connected the third day with Christ's own resurrection.

The original point here is how soon and sure the relief would be.

🔁 Hebrew poetry often repeats one idea twice
⏳ Two days and third day both mean soon
✝️ Many later readers connect this to Christ's resurrection
📖 Relief would come soon and for certain

## ❤️ We Shall Live In His Sight

Live here means more than simply staying alive physically.

It pictures full life lived in God's presence and favor.

The goal was never mere survival after judgment.

Real life only happens close to God, not apart from Him.

❤️ Live means more than staying alive
🙏 It means life lived in God's favor
🚫 The goal was never mere survival
📖 Real life happens close to God

## 🔎 Then Shall We Know, If We Follow On To Know The LORD

Chapter four and five both said Israel did not know the LORD.

Now the people promise to chase after that knowledge on purpose.

Follow on pictures ongoing pursuit, not one quick decision.

Knowing God here still means closeness, not just facts about Him.

🔁 Earlier chapters said Israel did not know God
🏃 The people now promise to chase that knowledge
🎯 Follow on means ongoing pursuit, not one decision
📖 Knowing God still means closeness, not facts

## 🌄 His Going Forth Is Prepared As The Morning

Going forth pictures God acting to help His people.

The sunrise happens every single day without fail.

Comparing God's action to the sunrise says it is just as certain.

Nothing about this promise is random or occasional.

🌅 Going forth pictures God acting to help
☀️ Sunrise happens every single day without fail
✅ This comparison means the promise is certain
📖 Nothing about this promise is random

## 🌧️ As The Rain, As The Latter And Former Rain Unto The Earth

Israel depended on two separate rainy seasons each year.

The former rain fell in autumn and softened the ground for planting.

The latter rain fell in spring and matured the crops before harvest.

Comparing God to both rains means His help was essential, not optional.

🌧️ Israel depended on two yearly rainy seasons
🍂 Former rain fell in autumn before planting
🌱 Latter rain fell in spring before harvest
📖 God's help was essential, not optional

# Hosea 6:4-6
# ☁️ A Devotion That Fades Like Morning Mist
---
## ❓ O Ephraim, What Shall I Do Unto Thee? O Judah, What Shall I Do Unto Thee?

This is not God asking for information He lacks.

It pictures a parent out of easy options with a child.

Naming both Ephraim and Judah shows neither kingdom is exempt.

The question carries real grief, not real confusion.

❓ God is not asking for missing information
😔 It pictures a parent out of options
🏞️ Both Ephraim and Judah are named here
📖 The question carries grief, not confusion

## ☁️ Your Goodness Is As A Morning Cloud

A morning cloud in this climate often looks like it will bring rain.

Instead it burns away within an hour once the sun rises.

Israel's devotion looked promising but disappeared just as fast.

Appearance and follow through were never the same thing here.

☁️ A morning cloud looks like rain is coming
🔥 It burns away within an hour of sunrise
📉 Israel's devotion looked promising but faded fast
📖 Appearance and follow through were not the same

## 💧 As The Early Dew It Goeth Away

Dew forms overnight and covers the ground by early morning.

Once the sun climbs higher, it disappears within minutes.

This is the second fading image used back to back in this verse.

Short lived here describes feelings, not lasting commitment.

💧 Dew forms overnight and covers the ground
🌄 It disappears within minutes once the sun climbs
🔁 This is the second fading image here
📖 Short lived described feelings, not lasting commitment

## 🪵 Therefore Have I Hewed Them By The Prophets

Hewed means cutting or shaping wood or stone with sharp blows.

God compares His prophets' words to a tool that cuts deep.

Their warnings were not gentle suggestions but forceful corrections.

The prophets' job was to shape the nation back toward God.

🪵 Hewed means cutting wood or stone with blows
🗣️ Prophets' words are compared to a cutting tool
⚔️ Their warnings were forceful, not gentle suggestions
📖 Prophets shaped the nation back toward God

## 🗡️ I Have Slain Them By The Words Of My Mouth

Slain here is a strong word picture, not a literal killing.

God's spoken judgments carried the same force as a weapon.

Words alone were enough to bring down this kind of verdict.

Speech becomes the instrument of judgment throughout this chapter.

🗡️ Slain pictures force, not a literal killing
🗣️ God's words carried the force of a weapon
💥 Words alone were enough to bring this verdict
📖 Speech itself becomes the instrument of judgment

## ☀️ Thy Judgments Are As The Light That Goeth Forth

Light that goes forth pictures daylight breaking in without hiding.

Nothing about this judgment would stay hidden or unclear.

Everyone would be able to see exactly what had happened.

God's verdict here is public, not secret or ambiguous.

☀️ Light going forth pictures daylight breaking in
👀 Nothing about this judgment would stay hidden
📣 Everyone would see exactly what had happened
📖 God's verdict here is public, not secret

## 🙅 I Desired Mercy, And Not Sacrifice

God is not rejecting the sacrifices He Himself commanded earlier in Israel's law.

He is rejecting sacrifice offered without any real mercy behind it.

Mercy here means loyal love shown toward other people and toward God.

Jesus later quotes this exact verse twice in the Gospel of Matthew.

🙅 God is not rejecting sacrifice itself here
💔 He is rejecting sacrifice offered without mercy
❤️ Mercy means loyal love toward God and people
📖 Jesus later quotes this exact verse twice

## 🔥 The Knowledge Of God More Than Burnt Offerings

Burnt offerings were sacrifices completely consumed by fire on the altar.

This was the costliest kind of offering a worshipper could bring.

Even that level of sacrifice means little without real relationship.

Knowing God personally outweighs the most expensive ritual a person can offer.

🔥 Burnt offerings were sacrifices fully consumed by fire
💰 This was the costliest offering one could bring
🤝 Real relationship matters more than costly ritual
📖 Knowing God outweighs the most expensive offering

# Hosea 6:7-9
# 🗡️ Priests Who Became Robbers
---
## 📜 But They Like Men Have Transgressed The Covenant

The Hebrew word translated men here can also be read as the name Adam.

Many scholars believe this points back to Adam breaking covenant in the garden.

Either reading says the same thing.

This generation broke its covenant on purpose, not by accident.

📜 Men here may also read as Adam
🌳 Many scholars connect this to Adam's own covenant
🔁 Either reading says the same thing happened again
📖 This generation broke covenant on purpose

## 💔 There Have They Dealt Treacherously Against Me

Treacherously describes the betrayal of someone who broke a trusted bond.

This is the same language Hosea uses for an unfaithful spouse.

The covenant with God was never just a legal contract.

Breaking it felt like breaking a marriage vow.

💔 Treacherously means betraying someone who trusted you
💍 This echoes the unfaithful spouse image in Hosea
📜 The covenant was never only a legal contract
📖 Breaking it felt like breaking a marriage vow

## 🗺️ Gilead Is A City Of Them That Work Iniquity

Gilead was a region and city east of the Jordan River.

It already had a history of violence recorded earlier in Judges.

Work iniquity means the people there made sin into a regular practice.

This was not one bad moment but an ongoing pattern.

🗺️ Gilead sat east of the Jordan River
📜 Judges already recorded violence happening there
🔁 Work iniquity means sin became a regular practice
📖 This was a pattern, not one moment

## 🩸 And Is Polluted With Blood

Polluted here points to actual violence, not just ritual uncleanness.

Blood on the ground pictures real lives taken by force.

This city built its reputation on real human death.

The corruption inside Israel had become physically visible.

🩸 Polluted here means real violence, not ritual
⚰️ Blood pictures real lives taken by force
🏙️ This city's reputation rested on real death
📖 Israel's corruption had become physically visible

## 🛣️ As Troops Of Robbers Wait For A Man

Robbers in this picture hide along a road waiting for a traveler.

They plan the attack ahead of time instead of acting on impulse.

This image describes patient, organized violence, not a single angry outburst.

The comparison sets up a shocking turn in the next line.

🛣️ Robbers hide along roads waiting for travelers
🗂️ The attack is planned ahead, not impulsive
😈 This pictures patient, organized violence
📖 This comparison sets up a shocking turn

## ⛪ So The Company Of Priests Murder In The Way By Consent

Priests were meant to guide people safely toward God.

Instead this group acted like the robbers just described.

By consent means several priests agreed together to commit this violence.

The very people meant to protect worship had become its danger.

⛪ Priests were meant to guide people to God
🗡️ Instead this group acted like the robbers
🤝 By consent means they agreed together to act
📖 Those meant to protect worship became its danger

## 😠 For They Commit Lewdness

Lewdness here points to shameful, disgraceful conduct unfit for God's servants.

It likely combines sexual sin with the idolatry already named in this book.

Priests held the highest standard for holy living in all Israel.

This verse says they had fallen the farthest from it.

😠 Lewdness means shameful conduct unfit for God's servants
🗿 It likely combines sexual sin with idolatry
⛪ Priests held the highest standard in Israel
📖 They had fallen the farthest from it

# Hosea 6:10-11
# 🌾 A Harvest Appointed For Judah Too
---
## 👁️ I Have Seen An Horrible Thing In The House Of Israel

God again claims to be a direct witness.

This same claim was made back in chapter five.

Horrible thing signals something that shocked even God to name it this way.

House of Israel points to the whole northern kingdom, not one city.

Nothing described here happened outside of God's sight.

👁️ God again claims to witness this directly
😨 Horrible thing signals something truly shocking
🏞️ House of Israel means the whole northern kingdom
📖 Nothing here happened outside God's sight

## 💔 There Is The Whoredom Of Ephraim, Israel Is Defiled

Whoredom in Hosea almost always pictures worship given to other gods.

This exact charge already appeared back in chapter five.

Repeating it here shows the problem never actually stopped.

Defiled means made unclean and unfit to approach God again.

💔 Whoredom pictures worship given to other gods
🔁 This same charge already appeared in chapter five
😔 Repeating it shows the problem never stopped
📖 Defiled means unfit to approach God again

## 🌾 Also, O Judah, He Hath Set An Harvest For Thee

Harvest can picture a season of blessing or a season of reckoning.

Here it most likely points to judgment finally coming due for Judah.

A harvest arrives on its own schedule, not whenever someone wants it.

Judah cannot escape what chapter five already warned was coming.

🌾 Harvest can mean blessing or a reckoning
⚖️ Here it most likely means judgment coming due
📅 A harvest comes on its own schedule
📖 Judah cannot escape what chapter five warned

## ⏳ When I Returned The Captivity Of My People

This phrase sounds like it describes something already finished.

Prophets sometimes describe a future certainty as if it already happened.

This habit is often called the prophetic perfect tense.

Speaking of it this way says the outcome is as good as settled.

⏳ This phrase sounds like something already finished
🔮 Prophets sometimes speak of the future as settled
📚 This habit is called the prophetic perfect
📖 The outcome here is treated as certain
`.trim();

export const HOSEA_SIX_PERSONAL_SECTIONS = parseHoseaSixRawNotes(HOSEA_SIX_RAW_NOTES);
