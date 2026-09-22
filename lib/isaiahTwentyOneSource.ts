export type IsaiahTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwentyOneRawNotes(rawText: string): IsaiahTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 21:${startVerse}` : `Isaiah 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 21 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWENTY_ONE_RAW_NOTES = `# Isaiah 21:1-2
# 🌪️ A Grievous Vision From The Desert
---
## 📜 The Burden Of The Desert Of The Sea

"Burden" here does not mean a heavy load someone carries.

It is the name for a message of judgment God gives a prophet to declare.

The phrase "desert of the sea" is a strange nickname for Babylon.

Babylon sat on a flat plain crossed by rivers and canals that could flood like a sea.

A message this heavy is now aimed at the most powerful city on earth.

📜 Burden means a message of judgment
🏜️ Desert of the sea is Babylon's nickname
🌊 Babylon's plain could flood like a sea
📖 A judgment message now targets Babylon

---
## 🌪️ As Whirlwinds In The South Pass Through

Whirlwinds in the south were violent desert storms.

They swept in fast from the dry Negev region.

Isaiah compares Babylon's coming judgment to that same kind of storm.

It will not creep in slowly.

It will hit without warning, like a storm bursting out of the desert.

🌪️ Whirlwinds were sudden desert storms
🏜️ They came fast from the Negev
⚡ Babylon's judgment will strike the same way
📖 No warning comes before it hits

---
## 🔁 The Treacherous Dealer Dealeth Treacherously

This line repeats the same idea twice on purpose.

Hebrew poetry often repeats a word like this for emphasis.

Think of someone saying "again and again" to stress how often something happens.

Babylon spent years betraying and plundering nations around it.

Now that same treachery is about to fall back on Babylon.

The one who spoiled others is about to be spoiled.

🔁 Repeated words show emphasis in Hebrew
📢 It means the idea happens again and again
⚔️ Babylon betrayed and plundered nations
📖 That same fate now returns to Babylon

---
## 🗺️ Go Up O Elam Besiege O Media

Elam and Media were two real nations east of Babylon.

God is directly commanding them to attack the empire that once seemed unstoppable.

Both nations later became part of the Persian empire under Cyrus the Great.

That same empire is the one history records as conquering Babylon.

Isaiah wrote this about a hundred and fifty years before it happened.

🗺️ Elam and Media sat east of Babylon
⚔️ God commands them to attack Babylon
👑 Both later joined the Persian empire
📖 This was written long before it happened

---
## 😩 All The Sighing Thereof Have I Made To Cease

"Sighing" here means the groaning of everyone Babylon had crushed.

Babylon had conquered and enslaved nation after nation for generations.

Every one of those nations groaned under that weight.

When Babylon falls, that groaning finally stops.

God is not just judging Babylon.

He is answering the cries of everyone Babylon hurt.

😩 Sighing means the groaning of crushed nations
👑 Babylon conquered many nations for generations
🛑 Babylon's fall ends that groaning
📖 God answers the cries of the hurt

# Isaiah 21:3-4
# 😨 Isaiah's Body Reacts To The Vision
---
## 🤰 As The Pangs Of A Woman That Travaileth

"Travaileth" is an old word for going through labor pains.

Isaiah compares his reaction to a woman in the middle of childbirth.

That kind of pain arrives suddenly and cannot be stopped once it starts.

This was not a calm vision from a distance.

It hit Isaiah in his own body.

🤰 Travaileth means going through labor pains
😖 Isaiah's pain is compared to childbirth
⚡ That pain arrives suddenly and hard
📖 The vision hit Isaiah physically

---
## 🙇 I Was Bowed Down At The Hearing Of It

Isaiah is not only troubled by what he saw.

He is troubled by simply hearing about it.

"Bowed down" pictures someone doubled over, the way pain or grief bends the body forward.

Prophets in scripture often felt a vision in their whole body, not just their mind.

The weight of this message physically staggered him.

👂 Even hearing the news staggered Isaiah
🙇 Bowed down means doubled over in pain
💭 Prophets often felt visions in their bodies
📖 This message hit more than his mind

---
## 🌙 The Night Of My Pleasure Turned Into Fear

Isaiah likely means a night he expected to be restful or enjoyable.

Instead, that same night became filled with dread.

"Fearfulness affrighted me" repeats the idea of fear for emphasis.

That kind of doubling shows up earlier in this chapter too.

The vision did not just inform Isaiah.

It terrified him.

🌙 A restful night turned into dread
😱 Fearfulness affrighted repeats the idea of fear
🔁 Isaiah uses this doubling more than once
📖 The vision terrified him, not just informed him

# Isaiah 21:5
# 🍽️ A Feast Interrupted By War
---
## 🍽️ Prepare The Table Watch In The Watchtower

This verse jumps into the middle of a scene inside Babylon itself.

Someone inside is setting a table for a feast.

A watchman stands guard outside at the very same time.

This picture matches the famous story in Daniel 5.

There, King Belshazzar feasted the very night Babylon actually fell.

The city's fall arrived in the middle of an ordinary evening.

🍽️ A feast is set inside Babylon
👀 A watchman guards the city outside
📜 This matches Belshazzar's feast in Daniel 5
📖 Babylon fell in the middle of a feast

---
## 🛡️ Arise Ye Princes And Anoint The Shield

Anointing a shield meant rubbing oil into the leather to keep it strong and ready for battle.

This was normally done calmly, well before any fighting started.

Here the princes are told to do it in a sudden panic.

The feast has just been interrupted by an emergency.

There is no time left to prepare properly.

🛡️ Anointing a shield meant oiling its leather
😰 Normally done calmly, now done in panic
🚨 The feast is suddenly interrupted
📖 There is no time left to prepare

# Isaiah 21:6-10
# 🏰 The Watchman Sees Babylon Fall
---
## 👁️ Go Set A Watchman Let Him Declare What He Seeth

God tells Isaiah to appoint a watchman, a lookout stationed to scan the horizon.

Watchmen were a normal part of ancient city life, watching for approaching armies or messengers.

This watchman's job is simply to report exactly what he sees, nothing more.

The reader is about to see the fall of Babylon through this one man's eyes.

👁️ A watchman was a city lookout
🗼 He watched for approaching armies
📢 His job was to report what he saw
📖 The reader sees Babylon's fall through him

---
## 🐪 A Chariot Of Asses And A Chariot Of Camels

The watchman sees a strange mixed convoy approaching.

Donkeys and camels were common pack animals in the ancient Near East.

This is not one army's chariots.

It looks like riders from more than one nation moving together.

These are likely the combined forces of Media and Persia named earlier in this chapter.

🐪 Camels and donkeys were common pack animals
🐎 A mixed convoy of riders approaches
🤝 This suggests combined armies moving together
📖 Media and Persia return from verse 2

---
## 📯 Babylon Is Fallen Is Fallen

The watchman finally shouts the news everyone has been waiting for.

Saying "fallen" twice is another example of Hebrew repetition for emphasis.

It makes the announcement sound final and certain, not a rumor.

Babylon was the greatest power of its day.

Its sudden collapse would have stunned anyone who heard this news.

📯 The watchman announces Babylon's fall
🔁 Fallen is repeated for emphasis
✅ The news is certain, not a rumor
📖 A great empire's collapse stuns the world

---
## 🗿 All The Graven Images Of Her Gods He Hath Broken

"Graven images" are statues carved to represent Babylon's gods.

Babylon worshipped many gods and trusted them to protect the city.

When Babylon fell, its own idols were smashed along with it.

This detail makes a quiet point about false gods.

They could not even protect themselves, let alone the people who worshipped them.

🗿 Graven images means carved idol statues
🙏 Babylon trusted these gods for protection
💥 The idols were smashed with the city
📖 False gods could not save themselves

---
## 🌾 O My Threshing And The Corn Of My Floor

Threshing is the process of separating grain from the stalks around it.

It was usually done on a flat floor by beating or trampling the grain.

Isaiah calls this hard vision his own "threshing."

It was something painful he had to go through to reach the message inside it.

The message finally reaching Israel cost Isaiah something real to deliver.

🌾 Threshing separates grain from the stalk
😖 Isaiah calls this vision his own threshing
💬 The message was the grain worth keeping
📖 This truth cost Isaiah something real

# Isaiah 21:11-12
# 🌙 Watchman What Of The Night
---
## 📜 The Burden Of Dumah

This is a second, separate prophecy inside the same chapter.

"Dumah" was a region connected to the descendants of Ishmael, near Edom.

The name also sounds like the Hebrew word for silence.

That fits this prophecy, which is short and gives few details.

The silence itself may be part of the message.

📜 Dumah begins a second short prophecy
🏜️ Dumah was a region near Edom
🤫 The name sounds like the word for silence
📖 Even the silence carries meaning

---
## 🌗 Watchman What Of The Night

Someone from Seir calls out to a watchman.

The question "what of the night" is asked twice, showing real fear and urgency.

The watchman's answer is deliberately unclear.

"The morning cometh, and also the night" means relief is coming, but so is more trouble.

The watchman tells them to keep asking and come back later.

That open ended answer fits a prophecy that never spells out a full resolution.

😰 The question is asked twice in fear
🌗 Morning and night both are coming
🤷 The watchman's answer stays unclear
📖 Relief and trouble arrive together

# Isaiah 21:13-17
# 🐫 The Burden Upon Arabia
---
## 🐫 The Burden Upon Arabia

This is the third and final prophecy inside this chapter.

Arabia was the desert region south and east of Israel, home to traveling trade caravans.

"Travelling companies of Dedanim" refers to merchant caravans from Dedan, a trading people descended from Abraham through Keturah.

These traders are told to hide in the forest instead of traveling the open road.

Something dangerous is coming that makes even seasoned traders change their route.

🏜️ This begins a third short prophecy
🐫 Dedanim were traders descended from Abraham
🌲 Danger forces them to hide in the forest
📖 Even seasoned traders are not safe now

---
## 🏝️ The Inhabitants Of The Land Of Tema Brought Water

Tema was an oasis town along the Arabian trade routes.

Its people are shown giving water and bread to exhausted refugees passing through.

"Prevented" here is an old word meaning they went ahead and met the need before being asked.

This is a small act of mercy tucked inside a chapter about judgment and war.

Even in the middle of disaster, ordinary kindness still shows up.

🏝️ Tema was an oasis trading town
🍞 Its people fed fleeing refugees
⏱️ Prevented means they acted before being asked
📖 Mercy still appears in the middle of war

---
## ⚔️ The Grievousness Of War

This verse explains why the refugees in the last verse were running.

They were not just avoiding a distant threat.

They were fleeing swords already drawn and bows already bent, ready to fire.

"Grievousness" is an old word for something that causes deep, heavy suffering.

War here is not described in the abstract.

It is described as something that leaves people running for their lives.

⚔️ Refugees fled drawn swords and bent bows
😥 Grievousness means deep, heavy suffering
🏃 War forced people to run for their lives
📖 This war was already underway

---
## 💰 Within A Year According To The Years Of An Hireling

"Hireling" means a hired worker, someone paid for a fixed, agreed term of work.

A hired worker counted their contract to the very day, no longer and no shorter.

God uses that same precision here.

This judgment on Kedar will happen within one exact year, not vaguely someday.

That kind of specific timing gave the prophecy a real test.

💰 Hireling means a worker on a fixed contract
📅 Hired workers counted their term exactly
⏳ Kedar's judgment comes within one exact year
📖 A precise timeline made this testable

---
## 🏹 The Glory Of Kedar Shall Fail

Kedar was a nomadic Arab tribe descended from Ishmael's son of the same name.

They were known across the ancient world for skilled archers and large flocks.

"Glory" here means their strength, wealth, and reputation, not physical beauty.

The chapter ends by declaring that even a proud desert power like Kedar is not beyond God's reach.

No nation, however strong or remote, sits outside His judgment.

🏹 Kedar was known for skilled archers
🐑 Kedar also had large flocks and wealth
💔 Glory here means strength and reputation
📖 No nation is beyond God's judgment
`.trim();

export const ISAIAH_TWENTY_ONE_PERSONAL_SECTIONS = parseIsaiahTwentyOneRawNotes(ISAIAH_TWENTY_ONE_RAW_NOTES);
