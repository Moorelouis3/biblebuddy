export type SecondChroniclesTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwentySixRawNotes(rawText: string): SecondChroniclesTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 26:${startVerse}` : `2 Chronicles 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Chronicles 26 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWENTY_SIX_RAW_NOTES = `# SecondChronicles 26:1-4
# 👑 A King At Sixteen
---
## 👑 Made Him King In The Room Of His Father Amaziah

"In the room of" means in the place of, not a literal room.

This is the normal Bible phrase for one king replacing another.

Uzziah takes the throne right after his father Amaziah is murdered.

Chapter twenty five already told that story in full.

A sixteen year old is now ruling one of the ancient world's nations.

👑 In the room of means in place of

🗡️ Amaziah was just murdered

🕐 Uzziah begins his reign at sixteen

📖 A new reign starts immediately

## ⚓ He Built Eloth, And Restored It To Judah

Eloth was a port city on the Red Sea, also called Elath.

Judah had lost control of it earlier under a weaker king.

Rebuilding it reopened trade routes toward Arabia and the south.

This detail is placed right before Amaziah's death is even mentioned.

Uzziah may have led this effort before he ruled alone.

⚓ Eloth was a Red Sea port

🗺️ Judah had lost it earlier

💰 It reopened valuable trade routes

📖 Uzziah acted before ruling alone

## 📏 He Reigned Fifty And Two Years In Jerusalem

Fifty two years is one of the longest reigns of any king in this book.

Only a few kings of Judah ruled anywhere close to that long.

His mother was Jecoliah of Jerusalem, named here like most queen mothers are.

Naming the mother was standard practice at the start of a king's story.

A reign this long gave Judah rare decades of stability.

📏 Fifty two years is unusually long

👑 Few kings of Judah matched it

👩 His mother Jecoliah is named

📖 Stability marked much of his reign

## 📋 According To All That His Father Amaziah Did

This sounds like full praise, but it is not.

Chapter twenty five already showed Amaziah did right, then still fell to pride.

Copying that same pattern is no guarantee of a clean ending.

The verse is quietly setting up what happens later in this chapter.

Watch for that same pattern to return.

📋 This copies his father's pattern

💔 Amaziah's own ending was not clean

🔮 The verse hints at what is coming

📖 A repeated pattern rarely stays hidden

# SecondChronicles 26:5-8
# 🙏 Prosperity While He Sought The Lord
---
## 👤 He Sought God In The Days Of Zechariah, Who Had Understanding In The Visions Of God

This Zechariah is not the prophet who later wrote his own Bible book.

He seems to have been a mentor or spiritual advisor to the young king.

"Understanding in the visions of God" means he could recognize God's guidance clearly.

Uzziah had someone actively pointing him toward God in these early years.

That guidance mattered more than his own age or experience.

👤 This Zechariah is not the prophet

🧭 He guided Uzziah toward God

👁️ He understood God's visions clearly

📖 A godly mentor shaped his early reign

## ⚖️ As Long As He Sought The Lord, God Made Him To Prosper

This sentence is not a random compliment.

It sets the condition for everything good that follows in this chapter.

Prosperity here is tied directly to seeking God, not to Uzziah's own skill.

The phrase "as long as" is doing real work in this verse.

Once that seeking stops later on, the prosperity stops with it.

⚖️ Prosperity is tied to seeking God

🔑 As long as sets a condition

📈 Success follows obedience here

📖 That condition will not last forever

## 🏰 Brake Down The Wall Of Gath, And The Wall Of Jabneh, And The Wall Of Ashdod

Gath was a major Philistine city, once the hometown of the giant Goliath.

Jabneh and Ashdod were two more of the leading Philistine cities.

Tearing down a city wall destroyed that city's ability to defend itself.

Uzziah was not raiding these cities, he was permanently weakening them.

This was a serious, lasting blow against Judah's oldest enemies.

🏰 Gath was Goliath's home city

🗺️ Jabneh and Ashdod were Philistine cities

🧱 Torn walls left cities defenseless

📖 Uzziah struck a lasting blow

## 🎁 The Ammonites Gave Gifts To Uzziah, And His Name Spread Abroad Even To The Entering In Of Egypt

These were not friendly presents between equals.

Gifts like this functioned as tribute, a payment made out of fear.

The Ammonites lived east of Judah and wanted to avoid becoming a target.

Uzziah's fame had grown so large that even Egypt's border region heard of it.

A teenage king had become a name other nations respected or feared.

🎁 These gifts were really tribute

😨 Fear motivated the Ammonites

🗺️ His fame reached toward Egypt

📖 A young king earned real respect

# SecondChronicles 26:9-10
# 🏗️ Towers, Wells, And Vineyards
---
## 🗼 He Built Towers In Jerusalem At The Corner Gate, And At The Valley Gate, And At The Turning Of The Wall

These were not decorative structures.

A tower built into a city wall gave defenders higher ground to watch from.

The corner gate and valley gate were two named entry points into Jerusalem.

"The turning of the wall" describes a bend where the wall changed direction.

Fortifying these exact spots closed off Jerusalem's most vulnerable points.

🗼 Towers gave defenders higher ground

🚪 Corner gate and valley gate were entrances

📐 The turning was a bend in the wall

📖 Uzziah secured Jerusalem's weak points

## 🌾 He Loved Husbandry

"Husbandry" means farming and the careful raising of crops and livestock.

This is an unusual thing to say about a king known mostly for war.

Uzziah dug wells in the desert so herds could survive on dry land.

He also kept farmers and vine growers working the hill country and Carmel.

A good king cared for the land itself, not only for the army.

🌾 Husbandry means farming and raising livestock

💧 He dug wells in the desert

🍇 Vine growers worked the hill country

📖 He cared for the land itself

# SecondChronicles 26:11-15
# 🛡️ An Army Built For War
---
## ⚔️ An Host Of Fighting Men, That Went Out To War By Bands, By The Hand Of Jeiel The Scribe

"Host" is an old word for an army.

This army was not a disorganized crowd.

Soldiers were counted and grouped into bands, like organized units.

Jeiel the scribe and Maaseiah the officer kept the official records.

Hananiah, one of the king's own captains, oversaw the entire structure.

⚔️ Host is an old word for army

📋 Soldiers were organized into bands

✍️ Jeiel the scribe kept records

📖 Uzziah built real military structure

## 🪖 Three Hundred Thousand And Seven Thousand And Five Hundred, That Made War With Mighty Power

Two thousand six hundred experienced officers led this army.

Under them stood three hundred and seven thousand five hundred fighting men.

That is one of the largest forces recorded for any king of Judah.

Numbers this specific came from an actual military count, not a legend.

Uzziah commanded serious, verified strength.

👥 2,600 officers led the army

🪖 307,500 men served under them

🔢 This came from a real count

📖 Uzziah's strength was real, not legend

## 🛡️ Prepared For Them Throughout All The Host Shields, And Spears, And Helmets, And Habergeons, And Bows, And Slings

A "habergeon" was a piece of body armor, close to a coat made of small metal rings.

Shields and spears handled close combat.

Bows and slings to cast stones covered longer range attacks.

Equipping an entire army with all of this took massive resources.

Uzziah funded and organized his soldiers down to their individual gear.

🛡️ Habergeon was a metal ring armor

🗡️ Shields and spears covered close combat

🏹 Bows and slings covered long range

📖 Every soldier was fully equipped

## ⚙️ He Made In Jerusalem Engines, Invented By Cunning Men, To Shoot Arrows And Great Stones

These "engines" were early war machines, not modern mechanical devices.

Picture large mounted devices built to launch stones and arrows from the walls.

"Cunning men" simply means skilled engineers or inventors.

This is one of the earliest specific mentions of siege technology in the Bible.

Uzziah's reputation for strength was backed by real innovation, not only numbers.

⚙️ Engines were early war machines

🎯 They launched stones and arrows

🧠 Cunning men means skilled engineers

📖 Innovation backed his reputation

# SecondChronicles 26:16-18
# 🚪 Pride Walks Into The Temple
---
## 🔀 But When He Was Strong, His Heart Was Lifted Up To His Destruction

This is the hinge of the entire chapter.

Everything before this verse was building strength.

Everything after this verse is a direct consequence of pride.

"Heart was lifted up" means he became proud and overconfident.

Strength did not ruin Uzziah, his response to it did.

🔀 This verse turns the whole chapter

💪 Strength itself was not the problem

💔 Pride followed his success

📖 His response to strength ruined him

## 🔥 He Transgressed Against The Lord His God, And Went Into The Temple To Burn Incense Upon The Altar Of Incense

Burning incense sounds like an act of worship, not a sin.

The problem is not the incense, it is who was doing the burning.

God had reserved that specific duty only for priests from the family of Aaron.

A king stepping into that role was crossing a line God had set.

Uzziah wanted an authority that was never given to kings.

🔥 Burning incense itself was not evil

🚫 Only Aaron's priests could do it

👑 Uzziah crossed into priestly territory

📖 He reached for authority not his own

## 💪 Azariah The Priest Went In After Him, And With Him Fourscore Priests Of The Lord, That Were Valiant Men

"Fourscore" is an old way of saying eighty.

Eighty priests followed Azariah into the temple together, not one brave man alone.

Standing up to a reigning king took real courage.

Calling them "valiant men" puts them in the same category as soldiers.

Their loyalty to God outweighed their fear of royal punishment.

🔢 Fourscore means eighty

👥 Eighty priests confronted the king together

💪 Valiant men means genuinely brave

📖 Loyalty to God outweighed fear

# SecondChronicles 26:19-21
# 🩹 Leprosy In The House Of The Lord
---
## 😡 Then Uzziah Was Wroth, And The Leprosy Even Rose Up In His Forehead Before The Priests

"Wroth" means furious, not just mildly annoyed.

Uzziah was still holding a censer, ready to burn incense himself, when this happened.

Leprosy appeared on his forehead instantly, while he stood there angry.

This was not a slow disease, it was sudden and visible to everyone present.

The timing left no room to argue it was a coincidence.

😡 Wroth means furious

🕯️ He still held the incense censer

🩹 Leprosy appeared instantly on his forehead

📖 The timing made the cause unmistakable

## 🏃 They Thrust Him Out From Thence, Yea, Himself Hasted Also To Go Out, Because The Lord Had Smitten Him

This was not only the priests forcing him out.

Uzziah himself rushed to leave once he understood what had happened.

He recognized instantly that God, not the priests, had struck him.

Even a proud king could not argue with a sign like that.

His own hurry to leave was its own confession.

🚪 Priests and Uzziah both moved him out

🏃 He hurried to leave on his own

🙏 He recognized God had struck him

📖 His own hurry admitted the truth

## 🏠 Uzziah The King Was A Leper Unto The Day Of His Death, And Dwelt In A Several House

"A several house" means a separate house, kept apart from others.

Old law required anyone with leprosy to live away from the rest of the community.

Even a king was not exempt from that rule.

He lost access to the temple completely for the rest of his life.

His son Jotham took over running the kingdom in his place.

🏠 A several house means a separate house

📜 Leprosy law applied even to kings

🚫 He lost access to the temple

📖 Jotham ran the kingdom instead

# SecondChronicles 26:22-23
# ⚰️ A Reign Remembered, A Burial Apart
---
## ✍️ The Rest Of The Acts Of Uzziah Did Isaiah The Prophet, The Son Of Amoz, Write

This Isaiah is the same prophet who wrote the book of Isaiah.

Isaiah's own book opens by naming Uzziah as one of the kings he served under.

Isaiah even dates his famous temple vision to the year Uzziah died.

These two books describe the very same king from two different angles.

Reading them together fills out the full picture of this reign.

✍️ This is the prophet Isaiah

📖 Isaiah's book names Uzziah directly

👁️ Isaiah's vision is dated to his death

➡️ Both books describe the same king

## ⚰️ They Buried Him With His Fathers In The Field Of The Burial Which Belonged To The Kings, For They Said, He Is A Leper

This sounds like a normal royal burial, but it was not.

Kings were normally buried inside the royal tombs themselves.

Uzziah was buried nearby, in a field connected to those tombs, but not inside them.

His leprosy kept him set apart even in death.

The consequence of that one act in the temple followed him to the very end.

⚰️ He was buried near the tombs, not inside

🩹 His leprosy still set him apart

📏 Even death did not erase the consequence

📖 One choice shaped his entire ending
`.trim();

export const SECOND_CHRONICLES_TWENTY_SIX_PERSONAL_SECTIONS = parseSecondChroniclesTwentySixRawNotes(
  SECOND_CHRONICLES_TWENTY_SIX_RAW_NOTES,
);
