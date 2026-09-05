export type PsalmsTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwentyThreeRawNotes(rawText: string): PsalmsTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 23:${startVerse}` : `Psalms 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 23 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWENTY_THREE_RAW_NOTES = `# Psalms 23:1-2
# 🐑 The Shepherd Who Provides
---
## 🐑 The LORD Is My Shepherd

A shepherd in this culture did far more than herd sheep from a distance.

He lived with the flock day and night.

He personally fought off predators that threatened the sheep.

David himself had worked as a shepherd before he became king.

Calling God his shepherd means trusting Him with that same constant, personal care.

🐑 A shepherd lived with the flock always
🛡️ He personally fought off real danger
👑 David himself once shepherded flocks
📖 God offers that same personal care

## 🚫 I Shall Not Want

"Want" means to lack something you truly need.

It does not describe simply wishing for more.

David is saying he lacks nothing that actually matters.

A well cared for sheep never worries about its next meal.

Trusting the shepherd removes the fear of running out.

🚫 Want means to lack, not merely wish
🐑 A cared for sheep lacks nothing needed
😌 Trust removes the fear of running out
📖 David depends on God to provide fully

## 😌 He Maketh Me To Lie Down In Green Pastures

Sheep will not lie down unless they feel completely safe.

Hunger keeps a flock standing and restless.

Fear does the same thing.

"Green pastures" means rich grazing land, thick with food.

A shepherd who gets sheep to lie down here has already removed every threat.

😌 Sheep only lie down when safe
😨 Hunger or fear keeps them restless
🌿 Green pastures means rich grazing land
📖 Rest here means every threat is gone

## 🌊 He Leadeth Me Beside The Still Waters

Sheep are actually afraid of fast moving water.

Wet wool grows heavy and can pull a sheep under.

"Still waters" means calm water that is actually safe to drink.

A good shepherd finds that safe place before ever leading the flock there.

🌊 Sheep fear fast moving water
🐑 Wet wool can pull them under
💧 Still waters means calm and safe
📖 The shepherd finds safety before leading

# Psalms 23:3-4
# 🌑 Restored And Led Through Darkness
---
## 🔋 He Restoreth My Soul

"Restoreth" means to bring something back to full strength.

Think of a worn out traveler finally resting and recovering.

"Soul" here means the whole inner life, not just an unseen part.

David pictures his mind, his emotions, and his will all being renewed.

This restoring happens quietly, alongside ordinary food and rest.

🔋 Restoreth means brought back to full strength
🧠 Soul means the whole inner life
❤️ Mind, emotions, and will all renewed
📖 Restoration happens quietly, through daily care

## 🛤️ In The Paths Of Righteousness For His Name's Sake

"Paths of righteousness" means the right, well marked tracks a good shepherd chooses.

These are not random trails but the safest, most direct routes.

"For his name's sake" points to God's own reputation as the reason.

God leads well because that reflects who He is.

🛤️ Paths of righteousness means the right tracks
🧭 The shepherd chooses safe, direct routes
🏷️ For his name's sake names the reason
📖 God leads well because of who He is

## 🌑 The Valley Of The Shadow Of Death

This pictures a deep, dark ravine where sunlight barely reaches the ground.

Shepherds in this region actually walked flocks through valleys like this one.

The phrase describes any season of deep danger or fear, not only dying.

David names the darkest possible place and still keeps walking through it.

🌑 A valley pictures a deep, dark ravine
🐑 Shepherds really walked flocks through places like this
⚠️ The phrase covers any deep danger or fear
📖 David keeps walking even through the darkest place

## 🚫 I Will Fear No Evil, For Thou Art With Me

David does not say the danger disappears.

He says the fear does not have to control him.

"Thou art with me" is the reason that fear loses its grip.

Presence, not the absence of danger, produces this courage.

🚫 The danger does not actually disappear
💪 Fear does not have to control him
🤝 God's presence is the reason for courage
📖 Presence, not safety, produces real courage

## 🏏 Thy Rod And Thy Staff They Comfort Me

A shepherd carried two different tools, not just one.

The rod was a short club used to fight off predators.

The staff was a long hooked pole used to guide and rescue sheep.

One tool protected.

The other guided.

Together, both tools brought real comfort.

🏏 The rod fought off predators
🦯 The staff guided and rescued sheep
🛡️ Two tools served two different jobs
📖 Protection and guidance together bring comfort

# Psalms 23:5-6
# 🍽️ A Table Prepared, A Home Forever
---
## 🍽️ Thou Preparest A Table Before Me In The Presence Of Mine Enemies

Preparing a table was an act of formal hospitality in this culture.

Hosting a guest publicly showed the world that guest was protected.

David pictures his enemies still watching nearby during this meal.

The meal itself becomes proof of whose side God is on.

🍽️ A prepared table meant formal hospitality
🛡️ A hosted guest stood under real protection
👀 Enemies are watching this happen nearby
📖 The meal itself proves God's protection

## 💧 Thou Anointest My Head With Oil

"Anointest" means to pour oil on someone as a mark of honor.

Hosts in this culture anointed the heads of honored guests.

This same oil was also used to refresh a tired traveler.

David is treated here like a welcomed guest, not a hunted man.

💧 Anointest means pouring oil in honor
🤵 Hosts anointed the heads of honored guests
🌬️ Oil also refreshed a tired traveler
📖 David is welcomed here, not hunted

## 🥛 My Cup Runneth Over

"Runneth over" means the cup is filled past its own capacity.

This is not merely enough.

It is more than what is needed.

The image pictures overflowing generosity, not bare survival.

David describes abundance he did not earn or expect.

🥛 Runneth over means filled past capacity
➕ This is more than what is needed
🌊 The image pictures overflowing generosity
📖 Abundance here is unearned and unexpected

## 🐕 Goodness And Mercy Shall Follow Me

"Follow" pictures goodness and mercy trailing behind David like companions.

Think of two loyal dogs walking behind a flock.

Those dogs watch the flock's back the whole way.

Goodness and mercy are not distant hopes but active pursuers.

They are not chasing him down.

They are simply staying close, day after day.

🐕 Follow pictures goodness and mercy as companions
🐑 Like dogs walking behind the flock
🏃 They are active, not distant hopes
📖 They stay close the whole journey

## 🏠 I Will Dwell In The House Of The LORD For Ever

"Dwell" means to live somewhere permanently, not just to visit.

"The house of the LORD" pictures living in God's own presence.

"For ever" reaches beyond this one lifetime into eternity itself.

The psalm that began with a shepherd ends with a permanent home.

🏠 Dwell means to live there permanently
🕍 The house of the LORD means His presence
♾️ For ever reaches beyond this lifetime
📖 A shepherd's care ends in a permanent home
`.trim();

export const PSALMS_TWENTY_THREE_PERSONAL_SECTIONS = parsePsalmsTwentyThreeRawNotes(PSALMS_TWENTY_THREE_RAW_NOTES);
