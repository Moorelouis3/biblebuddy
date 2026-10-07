export type ZechariahSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahSixRawNotes(rawText: string): ZechariahSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 6:${startVerse}` : `Zechariah 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Zechariah 6 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_SIX_RAW_NOTES = `# Zechariah 6:1-3
# 🐎 Four Chariots From Two Mountains Of Brass
---
## 🌙 I Turned, And Lifted Up Mine Eyes

This phrase opens the eighth and final vision of Zechariah's long night.

"Turned" means he shifted his attention, not that he walked away.

He has already watched seven other visions unfold since the night began.

The very first vision of that night also opened with colored horses.

This last vision closes the night with the same picture it started with.

🌙 This opens the eighth and final vision
👀 Turned means he shifted his attention
🔁 The first vision also opened with horses
📖 The night ends where it began

## 🏔️ There Came Four Chariots Out From Between Two Mountains

A chariot was a fast two wheeled cart pulled by horses, built for speed in war.

These four chariots come out from between two mountains, like riders passing through a gate.

They do not carry soldiers into human battle.

They carry out God's own orders to the far corners of the earth.

🛞 A chariot was a fast war vehicle
🚪 They pass out from between two mountains
🌍 They carry God's orders, not soldiers
📖 A war machine now serves God's rule

## 🥉 The Mountains Were Mountains Of Brass

Brass was a strong metal, a mix of copper and tin that does not rust or break easily.

Two mountains stand on either side of the chariots like a gateway they pass between.

Many scholars connect this image to the two bronze pillars at the front of Solomon's temple.

A doorway built from something this strong cannot be forced open by anything on earth.

🥉 Brass is copper and tin mixed strong
🚪 Two mountains form a gateway
🏛️ Many link this to the temple's bronze pillars
📖 No earthly force can break this door

## 🔴 In The First Chariot Were Red Horses

Red often pictures bloodshed or war, the same meaning it carried in the first vision of this night.

The second chariot carries black horses, a color that pictures death, mourning, or famine.

Each color marks a separate chariot sent toward a separate part of the earth.

Together the colors hint at different kinds of judgment moving out from God's presence.

🔴 Red often pictures war or bloodshed
⚫ Black pictures death or famine
🧭 Each color marks a separate chariot
📖 The colors hint at different judgments

## 🤍 In The Third Chariot White Horses

White often pictures victory, purity, or triumph throughout scripture.

The fourth chariot carries horses described as grisled, meaning spotted or speckled with gray.

That same fourth chariot is also called bay, a reddish brown color common among horses.

These same four colors, red, black, white, and spotted, return later in Revelation's four horsemen.

🤍 White often pictures victory or purity
🌫️ Grisled means spotted with gray
🟤 Bay means reddish brown
📖 Revelation later echoes these same four colors

# Zechariah 6:4-8
# 👼 The Four Spirits Of The Heavens
---
## 🙋 What Are These, My Lord

Zechariah does not guess at what he is seeing.

He stops and asks the angel directly, the same way he has asked throughout this long night.

My lord is a respectful title, not a claim that the angel is God himself.

A prophet who does not understand still asks instead of guessing.

🙋 Zechariah asks instead of guessing
🔁 This matches his pattern all night
🙇 My lord is a respectful title
📖 Asking beats inventing an answer

## 👼 These Are The Four Spirits Of The Heavens

Spirits here means angelic agents, not literal wind or weather.

The heavens names the place where these agents stood, in God's own throne room.

Four spirits match the four chariots, one assigned to each.

These are living messengers, not forces of nature.

👼 Spirits means angelic agents
🏛️ Heavens names God's throne room
🔢 Four spirits match four chariots
📖 These are messengers, not weather

## 🧍 Which Go Forth From Standing Before The LORD Of All The Earth

These four had been standing in God's presence before they were ever sent out.

Standing before a king pictures a servant waiting for orders, ready to move the moment they come.

LORD of all the earth names God as ruler over every nation, not only Israel.

The chariots do not act on their own.

They wait, then are sent.

🧍 Standing pictures a servant awaiting orders
👑 LORD of all the earth means total rule
🫡 They wait, then obey
📖 Their authority comes from God alone

## 🧭 The Black Horses Which Are Therein Go Forth Into The North Country

The north country points toward Babylon and Assyria, the empires that had conquered Judah.

Sending a chariot there means God's attention turns to the nations that had oppressed his people.

The white horses follow directly behind the black ones toward that same direction.

Judgment and victory appear to travel together toward Judah's old oppressors.

🧭 North points toward Babylon and Assyria
⚫ Black fits a nation facing judgment
🤍 White follows right behind toward the same place
📖 Judgment and victory travel together there

## 🏺 The Grisled Go Forth Toward The South Country

The south country points toward Egypt, another major world power of the ancient world.

Egypt had also played a role in Israel's long and painful history, long before Babylon.

Sending a chariot south means no major power escapes this review.

God's rule reaches every direction at once, not one enemy at a time.

🧭 South points toward Egypt
🏺 Egypt was another major ancient power
🌍 No power escapes this review
📖 God's rule reaches every direction

## 🔄 Sought To Go That They Might Walk To And Fro Through The Earth

To and fro means moving constantly back and forth, covering the same ground again and again.

The angel repeats the phrase walk to and fro through the earth three times in this single verse.

That repetition itself is the point, since it stresses constant, ongoing motion.

This chariot patrols the whole earth broadly instead of one single direction like the others.

🔄 To and fro means constant back and forth
🔁 The phrase repeats three times in one verse
🌐 This chariot patrols the whole earth
📖 Repetition itself stresses constant motion

## 😌 These That Go Toward The North Country Have Quieted My Spirit In The North Country

Quieted my spirit means God's own anger has finally come to rest.

Babylon sat in the north country, the empire that had crushed Jerusalem and the temple.

That empire had already fallen by the time Zechariah received this vision.

Sending a chariot there pictures God's judgment finally settling the matter for good.

😌 Quieted my spirit means God's anger rests
🏯 Babylon sat in the north country
📜 Babylon had already fallen by now
📖 God's judgment settles the matter for good

# Zechariah 6:9-11
# 👑 Crowns For The High Priest
---
## 🔄 The Word Of The LORD Came Unto Me

Zechariah shifts here from watching visions to receiving a direct command.

This same wording opens many prophetic messages across the Old Testament.

Zechariah now receives a plain instruction instead of a picture to interpret.

What comes next is something Zechariah must actually go and do.

🔄 This marks a shift from vision to instruction
🗣️ The LORD now speaks directly, not in pictures
📜 This formula opens messages across scripture
📖 Zechariah must now act, not just watch

## ⛓️ Take Of Them Of The Captivity

The captivity means the Jews who had been held in exile in Babylon for seventy years.

Some of those exiles had just returned home to Jerusalem by this point in the story.

God tells Zechariah to take gold and silver gifts these returnees had brought back with them.

A priest's crown here gets funded by people who had once lived as captives in a foreign land.

⛓️ The captivity means the Babylonian exile
🏠 Some exiles had just returned home
💰 They brought gold and silver gifts back
📖 Former captives help fund this crown

## 👤 Even Of Heldai, Of Tobijah, And Of Jedaiah, Which Are Come From Babylon

Heldai, Tobijah, and Jedaiah are three real men named by Zechariah, not symbols.

All three had just made the long journey back from Babylon to Jerusalem.

Naming real people grounds this vision in an actual moment in Judah's history.

Their gold becomes the material for something far bigger than themselves.

👤 Heldai, Tobijah, and Jedaiah are real men
🚶 All three had just returned from Babylon
📍 This grounds the vision in real history
📖 Their gift becomes something bigger

## 🏠 Go Into The House Of Josiah The Son Of Zephaniah

Josiah the son of Zephaniah is a separate man from the famous king Josiah earlier in the Bible.

His house appears to be where the returning exiles' gold and silver were being kept.

Zechariah is told to go there the very same day he receives this instruction.

The timing shows this crowning was not left to wait.

🏠 Josiah son of Zephaniah held the gold
👤 Not the same Josiah as the earlier king
📅 Zechariah goes there the very same day
📖 This crowning was not left to wait

## 🪙 Take Silver And Gold, And Make Crowns

Silver and gold were among the most valuable metals available in the ancient world.

Crowns appears as more than one, possibly describing a single crown made of multiple tiers.

A crown built from precious metal signals royal authority, not an ordinary priestly garment.

Something new is about to be placed on a head that has never worn one before.

🪙 Silver and gold were the most valuable metals
👑 Crowns may describe one multi tiered crown
💍 A crown signals royal authority
📖 A new kind of head wears one

## 🧢 Set Them Upon The Head Of Joshua The Son Of Josedech, The High Priest

This Joshua is the high priest named back in chapter three of this book.

He is not the same Joshua who led Israel into Canaan long before.

Priests normally wore a turban, never a king's crown.

This strange combination points forward to someone who will hold both offices at once.

🧢 This Joshua is the high priest
📅 Not the Joshua who led Israel long before
🚫 Priests normally wore a turban, not a crown
📖 It points to someone who will hold both

# Zechariah 6:12-15
# 🌿 The Branch Builds The Temple
---
## 🌿 Behold The Man Whose Name Is The BRANCH

The BRANCH is written here as a title, not an ordinary word for a tree limb.

Zechariah already used this same title back in chapter three for someone still to come.

Isaiah and Jeremiah both use the same title for a future king from David's family line.

One man is being named as the fulfillment of promises made generations earlier.

🌿 The Branch is a title, not a plant
🔁 Zechariah already used this title in chapter 3
📜 Isaiah and Jeremiah use it the same way
📖 One man fulfills generations of promise

## 🌱 He Shall Grow Up Out Of His Place

This pictures new growth rising from a root that looked finished.

Isaiah describes a similar branch growing from the stump of Jesse, David's own father.

A stump looks dead, yet a shoot can still rise from it.

David's royal line had been cut down, and this promise says it is not finished.

🌱 This pictures growth from an old root
🪵 Isaiah pictures the same thing from Jesse's stump
💔 David's line looked cut down
📖 God's promise says it is not finished

## 🏗️ He Shall Build The Temple Of The LORD

Zerubbabel and the returned exiles were already rebuilding the temple at this very time.

This promise points past that current building project to something still ahead.

Verse thirteen repeats the same promise word for word, showing how important it is.

The Branch himself finishes the real building God has in mind, not a human governor.

🏗️ Zerubbabel was already rebuilding the temple
⏭️ This promise points past that project
🔁 Verse 13 repeats it word for word
📖 The Branch finishes God's real building

## ✨ He Shall Bear The Glory, And Shall Sit And Rule Upon His Throne

Bear the glory means carrying the full weight and honor of God's own splendor.

Sitting on a throne pictures settled, lasting authority, not a temporary assignment.

Most kings in Zechariah's world ruled for a lifetime at best, then lost their throne to another family.

This king's rule is tied directly to God's own glory, not to his own family's strength.

✨ Bear the glory means carrying God's honor
👑 A throne pictures lasting authority
⏳ Other kings eventually lost their thrones
📖 This rule is tied to God's own glory

## 👑 He Shall Be A Priest Upon His Throne

Israel always kept the king's throne and the priest's duties as two separate jobs, held by two different men.

No earlier king of Judah ever also served as the priest at the altar.

This verse names one man holding both roles on the same throne at the same time.

What took two offices and two families before now belongs to one person.

👑 King and priest were always separate jobs
🚫 No earlier king also served as priest
🔀 One man now holds both at once
📖 Two offices now belong to one person

## 🤝 The Counsel Of Peace Shall Be Between Them Both

Counsel here means an agreement or plan reached between two parties.

Them both points back to the king's role and the priest's role described just before.

Those two roles could easily pull against each other, since a king rules and a priest intercedes.

In this one man, ruling and interceding work together instead of competing.

🤝 Counsel means an agreement between two sides
👥 Them both means the king and priest roles
⚖️ Those roles could easily pull apart
📖 In him, they work together instead

## 🏷️ The Crowns Shall Be To Helem, And To Tobijah, And To Jedaiah, And To Hen The Son Of Zephaniah

Helem is likely another name for Heldai, one of the three men named back in verse ten.

Hen likely works as an honorary title meaning gracious, pointing back to Josiah the son of Zephaniah.

For a memorial means the crowns stayed as a lasting physical reminder, kept where people could see them.

The temple keeps the crown so no one forgets who gave the gold that made it.

👤 Helem likely refers to Heldai from verse 10
🏷️ Hen likely honors Josiah as gracious
🏛️ Memorial means a lasting physical reminder
📖 The temple remembers who gave the gold

## 🗺️ They That Are Far Off Shall Come And Build In The Temple Of The LORD

Far off points to Jewish exiles still scattered outside the land, beyond those who had already returned.

This promises that more of the scattered people will eventually come home to help.

Their future arrival was not something Zechariah could fake or force to happen.

A promise about people not yet present rests entirely on God keeping his word.

🗺️ Far off means exiles still scattered abroad
🏠 More exiles are promised to return
🙅 Zechariah could not force this to happen
📖 The promise rests on God keeping his word

## 🔍 Ye Shall Know That The LORD Of Hosts Hath Sent Me Unto You

Zechariah ties his own credibility to whether this promise actually comes true.

A true prophet's words were always tested against what actually happened later.

If scattered exiles never returned to help build, that failure would have exposed a false message.

The fulfillment of a small, checkable detail backs up the larger promise about the Branch.

🔍 Zechariah's credibility rests on this coming true
✅ True prophecy was tested against later events
❌ A failed return would expose a false message
📖 A small detail backs up the larger promise

## 🤝 If Ye Will Diligently Obey The Voice Of The LORD Your God

Diligently means careful and continued effort, not a single act done once.

This final promise is not forced on the people no matter how they live.

Their obedience plays a real part in whether these things come to pass.

The vision that began with chariots sent across the earth ends by placing responsibility on the people listening.

🔁 Diligently means continued, careful effort
🙅 This is not forced on the people
🤝 Their obedience plays a real part
📖 Responsibility lands on the people listening
`.trim();

export const ZECHARIAH_SIX_PERSONAL_SECTIONS = parseZechariahSixRawNotes(ZECHARIAH_SIX_RAW_NOTES);
