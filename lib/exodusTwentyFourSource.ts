export type ExodusTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyFourRawNotes(rawText: string): ExodusTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 24:${startVerse}` : `Exodus 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Exodus 24 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_FOUR_RAW_NOTES = `# Exodus 24:1-2

# 🏔️ Called Up The Mountain

---

## 👦 Thou, And Aaron, Nadab, And Abihu

Nadab and Abihu were Aaron's two oldest sons. God calls them by name here, months before they would be set apart as priests. Later in Leviticus 10, these same two brothers will die for offering "strange fire" the wrong way, so this early moment of being singled out for honor makes that later failure sting even more.

👦 Nadab and Abihu were Aaron's two oldest sons

🔥 Leviticus 10 later records both of them dying for disobeying God at the altar

😔 Being honored here makes their later failure harder to read

---

## 👴 Seventy Of The Elders Of Israel

These seventy men were tribal leaders, chosen not long before this in Exodus 18 when Moses' father-in-law Jethro convinced him he could not judge the whole nation alone. Having seventy representative leaders present made this covenant ceremony something the whole nation took part in through its leadership, not just Moses acting alone. Jewish tradition later points back to this group of seventy as the root of the Sanhedrin, Israel's ruling council that still existed in Jesus's day.

👴 These were the tribal leaders appointed back in Exodus 18

🤝 Their presence meant the whole nation was represented at the covenant, not just Moses

⚖️ Jewish tradition ties this group of seventy to the later Sanhedrin council

---

## 🚧 Worship Ye Afar Off

Everyone but Moses had to stop at a distance and worship from there. God's presence on the mountain was too holy to approach carelessly, so distance itself became part of how the people showed respect. This matches the boundary lines already set up back in Exodus 19, when the people were warned not to touch the mountain at all.

🚧 Distance itself was a way of showing respect for God's holiness

📏 This repeats the boundary lines already set in Exodus 19

---

## 🧍 Moses Alone Shall Come Near The Lord: But They Shall Not Come Nigh; Neither Shall The People Go Up With Him

This verse lays out three different levels of closeness to God, all at once. The regular people stayed at the bottom, the seventy elders and Aaron's sons could come partway up, and only Moses could come all the way near. This step-by-step access is exactly the pattern behind Israel's later worship system, where the ordinary person stayed in the outer court, priests could go further in, and only the high priest could enter the innermost room.

🧍 Three different levels of closeness are set up here: people, leaders, and Moses alone

🏛️ This pattern becomes the blueprint for the tabernacle's outer court, holy place, and Most Holy Place

🕊️ Moses stands here as the one mediator between God and the whole nation

# Exodus 24:3-4

# 📜 The People's Vow

---

## 📖 All The Words Of The Lord, And All The Judgments

"Words" and "judgments" are two different things here. The words are the Ten Commandments God spoke directly from the mountain in Exodus 20. The judgments are the case laws just given in Exodus 21-23, the detailed rules covering everyday situations like injuries, property, and justice. Moses repeats both sets, making sure the people heard the whole law, not just the headline commandments.

📖 "Words" means the Ten Commandments from Exodus 20

⚖️ "Judgments" means the detailed case laws from Exodus 21-23

✅ The people heard the whole law, not a summary

---

## 🗣️ All The People Answered With One Voice, And Said, All The Words Which The Lord Hath Said Will We Do

The whole nation agreed together, out loud, as one. This was not a quiet private decision, it was a public, spoken promise made by the entire community at once. Ancient treaties between a king and his people often worked exactly this way, terms were read aloud and the people responded with a formal yes, making the agreement official and binding.

🗣️ This was a public, spoken promise made by the whole nation together

📜 It follows the same pattern as ancient treaty ceremonies between a king and his people

🤝 The moment made the covenant official, not just understood privately

---

## ✍️ Moses Wrote All The Words Of The Lord

This is the first time the Bible describes Moses actually writing anything down. Up to this point, God had been speaking and Moses had been listening and repeating. Now the laws become a permanent written record instead of something that could fade or get changed by memory over time.

✍️ This is the first time Moses is shown writing Scripture down

📜 Writing it down made the law a permanent record, not just spoken memory

---

## 🪨 Builded An Altar Under The Hill, And Twelve Pillars, According To The Twelve Tribes Of Israel

The altar represented God's presence in the ceremony, and the twelve stone pillars stood in for the twelve tribes on the other side of the agreement. Setting up physical markers like this was a common way to seal a covenant in the ancient world, the stones themselves stood as permanent witnesses that both sides had made a deal.

🪨 The altar stood in for God's side of the covenant

🗿 The twelve pillars stood in for the twelve tribes of Israel

👁️ Physical markers like these served as permanent witnesses to the agreement

# Exodus 24:5-8

# 🩸 The Blood Of The Covenant

---

## 🙋 Young Men Of The Children Of Israel

These were not official priests, because there was no priesthood yet. Aaron and his sons would not be formally set apart as priests until Exodus 29, chapters later. Until then, ordinary young men from the community carried out the sacrifices, showing that at this early point, offering sacrifice was not yet limited to one special family.

🙋 There was no official priesthood yet at this point in the story

📅 Aaron and his sons are not formally ordained as priests until Exodus 29

🔓 Sacrifice was still open to ordinary members of the community

---

## 🔥 Offered Burnt Offerings

A burnt offering was completely burned up on the altar, nothing was kept back or eaten. Burning the whole animal pictured total surrender, the whole gift belonged to God with nothing held back for the person giving it.

🔥 The entire animal was burned, none of it was eaten

🎁 This pictured a gift that held back nothing for the giver

---

## 🍖 Sacrificed Peace Offerings Of Oxen

A peace offering worked differently. Only part of the animal was burned on the altar, and the rest was eaten in a shared meal. This type of sacrifice celebrated friendship and fellowship with God, which fits perfectly with what happens later in this same chapter when the leaders go up the mountain and eat in God's presence.

🍖 Only part of the animal was burned, the rest became a shared meal

🤝 This type of offering celebrated friendship and fellowship with God

🍽️ It sets up the meal the leaders share with God later in this chapter

---

## 🥣 Moses Took Half Of The Blood, And Put It In Basons; And Half Of The Blood He Sprinkled On The Altar

Basons just means bowls. Splitting the blood in half connected both sides of the agreement, one half touched the altar, standing in for God, and the other half would soon be sprinkled on the people. Blood sealed the covenant because in this culture, blood represented life itself, so a blood ceremony meant the two sides were bound together at the deepest possible level.

🥣 Basons simply means bowls

🔗 Splitting the blood connected both sides of the covenant, God and the people

❤️ Blood represented life itself, making this the deepest kind of binding agreement

---

## 📖 He Took The Book Of The Covenant, And Read In The Audience Of The People

The "book of the covenant" is the written record of everything just spoken, the Ten Commandments and the case laws from chapters 20 through 23. "In the audience of" is an old way of saying "within hearing of." Reading it publicly, out loud, made sure no one could later claim they never knew the terms.

📖 The book of the covenant means the laws written down in chapters 20-23

👂 "In the audience of" is an old phrase meaning "within hearing of"

✅ Reading it aloud meant no one could claim they never knew the terms

---

## 🤝 All That The Lord Hath Said Will We Do, And Be Obedient

This is the second time the people make this promise, and this time they add one more word: obedient. The first vow in verse 3 was about action, doing what God said. This second vow adds the deeper commitment of an obedient heart, not just going through the motions.

🤝 This is the people's second vow in this chapter

➕ "And be obedient" adds a deeper level of commitment beyond just doing the actions

❤️ It moves from outward action toward an inward attitude

---

## 🩸 Moses ... Sprinkled It On The People, And Said, Behold The Blood Of The Covenant

Sprinkling the same blood on the people that had already touched the altar formally sealed the agreement between them and God. This exact phrase, "the blood of the covenant," is not a one-time expression. Jesus uses almost the same words at the Last Supper when he says "this is my blood of the new testament," directly connecting his own death to this ancient covenant ceremony.

🩸 Sprinkling the same blood on the people sealed the agreement formally

🍷 Jesus echoes this exact phrase at the Last Supper

🔗 The New Testament writer of Hebrews points back to this same scene to explain Jesus's sacrifice

# Exodus 24:9-11

# 👣 They Saw The God Of Israel

---

## 👣 Moses, And Aaron, Nadab, And Abihu, And Seventy Of The Elders Of Israel: And They Saw The God Of Israel

This is a startling statement to read plainly. Seventy-four people, not just Moses, are described as seeing God directly and living to tell about it. This kind of direct, shared vision of God is rare anywhere in the Bible.

👣 Seventy-four people are described seeing God directly, not just Moses

😲 This kind of shared, direct vision of God is rare in the Bible

---

## ❗ Compared To "No Man Shall See Me, And Live"

Later in Exodus 33:20, God tells Moses plainly that no one can see His face and live. This earlier scene does not contradict that. What the elders saw here was almost certainly a partial or veiled glimpse, what was under God's feet, not His face directly, and it happens before Israel's later failure with the golden calf hardens the boundaries around approaching Him.

❗ Exodus 33:20 later says no one can see God's face and live

👣 What the elders saw here was what was under His feet, not His face

📅 This happens before the golden calf incident makes access more restricted

---

## 💎 A Paved Work Of A Sapphire Stone, And As It Were The Body Of Heaven In His Clearness

Sapphire here describes a deep, brilliant blue, like a clear sky. The elders are trying to describe something that defies ordinary words, so they reach for the closest earthly comparison they can find, a pavement as blue and clear as the sky itself. Centuries later, the prophets Ezekiel and John reach for very similar sky-blue, glass-like imagery when they try to describe their own visions of God's throne.

💎 Sapphire describes a deep, brilliant blue color, like a clear sky

🗣️ The elders are stretching ordinary language to describe something beyond it

👁️ Ezekiel and Revelation later use very similar sky-like imagery for God's throne

---

## ✋ Upon The Nobles Of The Children Of Israel He Laid Not His Hand

"Laid not his hand" is an old way of saying God did not strike them down. Given how dangerous it normally was to see God directly, this is a specific note of mercy, God chose to hold back judgment and let them live through this encounter unharmed.

✋ "Laid not his hand" means God did not strike them down

🛡️ This specifically notes God's mercy in an otherwise dangerous moment

---

## 🍽️ They Saw God, And Did Eat And Drink

Sharing a meal in someone's presence was a serious act of fellowship in this culture, not a casual snack. Ancient treaties between two parties were often sealed with a shared meal, so this meal on the mountain confirmed the covenant just made below, now celebrated in God's own presence.

🍽️ Sharing a meal was a serious act of fellowship, not a casual snack

📜 Ancient treaties were often sealed with a shared meal between both parties

🎉 This meal celebrated the covenant now confirmed in God's presence

# Exodus 24:12-14

# 🪨 Tables Of Stone

---

## ⛰️ Come Up To Me Into The Mount, And Be There

This is a second call, higher up and further in than the first invitation in verse 1. Moses had already been partway up the mountain with the elders. Now God calls him alone, even further, into a level of closeness none of the others would share.

⛰️ This is a second, higher call than the one in verse 1

🧍 Moses alone goes further in than even the elders did

---

## 🪨 Tables Of Stone, And A Law, And Commandments Which I Have Written

"Tables" here means flat tablets, not furniture. This is the first mention of the stone tablets that will hold the Ten Commandments, and notice that God says He has written them, not Moses. These would be inscribed directly by God's own hand, not copied down by a human scribe.

🪨 "Tables" means flat stone tablets, not furniture

✍️ God says He has written them Himself, not Moses

📜 These become the actual stone tablets of the Ten Commandments

---

## 🎓 That Thou Mayest Teach Them

The purpose of writing the law down was so it could be taught, not just possessed. God gives Moses a permanent copy specifically so it could be passed on accurately to others, turning one man's private encounter with God into instruction for an entire nation.

🎓 The written law existed so it could be taught to others

🔁 It turned one man's encounter with God into instruction for a whole nation

---

## 🧑 His Minister Joshua

"Minister" here means a personal assistant or attendant, not a religious title. This is an early, quiet introduction to Joshua, who goes partway up the mountain with Moses here, long before he becomes Israel's leader after Moses dies. Watching him serve closely here helps explain why he was ready for that role later.

🧑 "Minister" means personal assistant, not a religious title

👣 Joshua accompanies Moses partway up the mountain here

🔜 This is an early look at the man who later leads Israel after Moses

---

## 🛡️ Tarry Ye Here For Us ... Aaron And Hur Are With You

Moses did not leave the people leaderless while he was gone. Aaron and Hur, the same two men who held up Moses' hands during the battle with Amalek back in Exodus 17, were left in charge to handle any disputes below.

🛡️ Moses left Aaron and Hur in charge while he was away

🤝 These are the same two men who held up Moses' hands during the battle in Exodus 17

⚖️ They were left to handle any disputes among the people

# Exodus 24:15-18

# ☁️ Forty Days In The Cloud

---

## ☁️ Moses Went Up Into The Mount, And A Cloud Covered The Mount

This cloud was not ordinary weather. It was the same visible sign of God's presence that had already been leading Israel by day since Exodus 13, now settling directly over the mountain itself.

☁️ This was not ordinary weather, but a visible sign of God's presence

🔥 The same cloud had been leading Israel by day since Exodus 13

---

## ✨ The Glory Of The Lord Abode Upon Mount Sinai, And The Cloud Covered It Six Days

"Glory" describes the visible weight of God's presence, not just a feeling or an idea. Moses had to wait six full days on the mountain, inside the cloud, before God finally spoke to him directly, a real test of patience even for someone already invited up.

✨ "Glory" describes the visible weight of God's presence

⏳ Moses waited six full days before God spoke to him

---

## 7️⃣ The Seventh Day He Called Unto Moses Out Of The Midst Of The Cloud

God speaking on the seventh day echoes the same seven-day pattern set at creation, where the seventh day was set apart as different from the other six. Even the timing of this meeting reinforces the rhythm of six-and-seven built into the whole created order.

7️⃣ This echoes the same seven-day pattern set at creation

🔁 Even the timing here reinforces the six-and-seven rhythm found throughout Scripture

---

## 🔥 The Sight Of The Glory Of The Lord Was Like Devouring Fire

"Devouring" means consuming or completely burning up. From below, the people watching the mountain would have seen what looked like a fire that fully consumed everything it touched, a visible, frightening reminder of God's holiness that everyone in the camp, not just Moses, could witness.

🔥 "Devouring" means completely consuming, like fire that burns up everything

👀 The whole camp below could see this, not just Moses

⚠️ It served as a visible reminder of God's holiness to everyone watching

---

## 🕐 Moses Was In The Mount Forty Days And Forty Nights

Forty days and nights is a number that shows up again and again in Scripture at major turning points, the flood's rain, the spies scouting Canaan, and Jesus fasting in the wilderness. It consistently marks a period of testing or preparation before something significant happens next.

🕐 The number forty repeats at major turning points throughout Scripture

🌧️ It appears with the flood's rain, the scouting of Canaan, and Jesus's wilderness fast

⏳ It consistently marks a period of testing or preparation`;

export const EXODUS_TWENTY_FOUR_PERSONAL_SECTIONS = parseExodusTwentyFourRawNotes(EXODUS_TWENTY_FOUR_RAW_NOTES);
