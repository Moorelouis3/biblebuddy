export type PsalmsOneHundredThirtySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirtySevenRawNotes(rawText: string): PsalmsOneHundredThirtySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirtySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+137:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 137 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+137:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+137:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 137 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 137,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 137:${startVerse}` : `Psalms 137:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 137 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTY_SEVEN_RAW_NOTES = `# Psalms 137:1-3
# 😢 Weeping By Babylon's Rivers
---
## 🌊 By The Rivers Of Babylon

"Rivers" points to the Euphrates River and Babylon's canals.

Babylon sat on flat ground crossed by wide waterways.

This is where the exiles from Jerusalem were forced to live.

The setting is a riverbank, not a battlefield.

The whole psalm grows out of that one place.

🌊 Rivers means the Euphrates and canals

🏜️ Babylon sat on flat, wide waterways

🏚️ Exiles from Jerusalem lived here

📖 The setting is exile, not battle

## 😢 There We Sat Down Yea We Wept

Sitting on the ground was a physical sign of grief.

In this culture, mourners lowered themselves down instead of standing.

"Wept" here means open, public crying, not private tears.

The exiles were not hiding their sorrow from each other.

Their grief poured out together, in the open air.

😢 Sitting marked open grief and mourning

🌍 Grief was expressed in public, not hidden

🤝 The exiles wept together, not alone

📖 Their sorrow was communal, not private

## 🎻 We Hanged Our Harps Upon The Willows

The harp was the instrument used for temple worship.

Hanging it up meant refusing to play it at all.

Willow trees grew thick along Babylon's rivers and canals.

Silence became its own kind of protest.

An instrument built for praise now hung there unused.

🎻 Harps were used for temple worship

🤐 Hanging them up meant refusing to play

🌳 Willows grew along Babylon's waterways

📖 Silence became a form of protest

## 😈 They That Carried Us Away Captive Required Of Us A Song

The captors here were Babylonian soldiers guarding the exiles.

"Required" means they demanded a song, not requested one politely.

Captives were expected to perform for their captors' entertainment.

Asking for a joyful song from grieving people was its own cruelty.

The demand turned worship into a show.

😈 Required means demanded, not asked politely

🎭 Captors wanted a song for entertainment

💔 Joy was demanded from grieving people

📖 Worship was twisted into a performance

## 🕍 Sing Us One Of The Songs Of Zion

"Songs of Zion" means the temple worship songs of Jerusalem.

Pilgrims once sang these very songs on their way to the temple.

Zion was another name for the mountain the temple stood on.

Singing them for captors would have mocked their true purpose.

These songs belonged to worship, not to a captor's amusement.

🕍 Songs of Zion means temple worship songs

🚶 Pilgrims sang these on their way to Jerusalem

🏔️ Zion names the mountain the temple stood on

📖 Singing them for captors mocked their purpose

# Psalms 137:4-6
# 🤚 A Vow Never To Forget
---
## ❓ How Shall We Sing The LORD's Song In A Strange Land

This is a rhetorical question, not a real request for advice.

The Psalms sung in worship were tied to the temple in Jerusalem.

"Strange land" means a foreign, pagan country, not simply somewhere new.

Singing those songs for entertainment here felt like a betrayal.

The question hangs in the air without an easy answer.

❓ This question is rhetorical, not literal

🏛️ Temple worship songs belonged to Jerusalem

🌍 Strange land means a foreign, pagan country

📖 Singing them here felt like betrayal

## 🏙️ If I Forget Thee O Jerusalem

Jerusalem here stands for far more than a hometown.

It was the city of the temple and God's covenant promises.

Forgetting it would mean giving up the whole story of Israel's faith.

This line is a vow, not a passing wish.

The exile could take their freedom but not that vow.

🏙️ Jerusalem stands for far more than home

📜 It held the temple and God's covenant

🤚 Forgetting Jerusalem meant losing the whole story

📖 This line is a vow, not a wish

## ✋ Let My Right Hand Forget Her Cunning

"Cunning" here means skill, not trickery or deceit.

It pictures the hand's skill at playing the harp.

A hand that forgets its skill can no longer make music.

This is a curse the psalmist calls down on himself.

He is staking his own ability on this promise.

✋ Cunning means skill, not trickery

🎵 It pictures skill at playing the harp

🚫 A forgetful hand could no longer play

📖 He stakes his own ability on this vow

## 👅 Let My Tongue Cleave To The Roof Of My Mouth

"Cleave" means to stick fast, not to split apart.

This pictures a mouth gone completely silent.

The psalmist calls down mutism on himself if he breaks his vow.

Losing his voice would match losing his ability to play.

Both curses target the very gifts he used for worship.

👅 Cleave means stick fast, not split

🤐 This pictures total silence

🎤 He calls this curse down on himself

📖 Voice and skill both go silent together

## 💛 Prefer Not Jerusalem Above My Chief Joy

"Chief joy" means whatever brings him the greatest happiness.

The vow says nothing, not even his best joy, will outrank Jerusalem.

This closes the set of three vows in these two verses.

Memory, skill, and voice are all placed under one loyalty.

Jerusalem sits above every other joy he could name.

💛 Chief joy means his greatest happiness

🥇 Nothing outranks Jerusalem, not even that joy

🔗 This is the third vow in a row

📖 One loyalty holds memory, skill, and voice

# Psalms 137:7-9
# ⚖️ A Raw Cry For Justice
---
## 📜 Remember O LORD The Children Of Edom

Edom was the nation descended from Esau, Jacob's brother.

Edom and Israel were relatives, not strangers.

When Jerusalem fell, Edom cheered instead of helping its kin.

The prophet Obadiah records this same betrayal in detail.

"Remember" does not ask God to forget mercy.

It asks Him to notice what Edom did.

📜 Edom descended from Esau, Jacob's brother

👪 Edom and Israel were relatives, not strangers

🚫 Edom cheered instead of helping Jerusalem

📖 Remember asks God to notice the crime

## 🏚️ Rase It Rase It Even To The Foundation Thereof

"Rase" is an old word for tear down completely.

This was Edom's cry as Jerusalem's walls came down.

"Foundation" means leaving nothing standing, not even the base stones.

The repetition doubles the force of the demand.

Edom wanted total destruction, not a partial defeat.

🏚️ Rase means tear down completely

🗣️ This was Edom's cry as Jerusalem fell

🧱 Foundation means nothing left standing at all

📖 Edom wanted total, not partial, destruction

## 👑 O Daughter Of Babylon Who Art To Be Destroyed

"Daughter of Babylon" is a poetic name for the whole city.

Hebrew poetry often pictures a city or nation as a woman.

The title is not about one literal person.

It speaks of Babylon's whole population and power together.

"Who art to be destroyed" already treats her defeat as certain.

👑 Daughter of Babylon names the whole city

📜 Hebrew poetry pictures nations as women

🌍 This means Babylon's whole population, not one person

📖 Her defeat is already treated as certain

## 💔 Happy Shall He Be That Rewardeth Thee As Thou Hast Served Us

"Happy" here means blessed or fortunate, not cheerful.

"Rewardeth" means paying back in the same kind.

The line asks for Babylon to receive what it gave Israel.

This is the ancient principle of measure for measure.

Babylon itself would later fall to this same kind of conquest.

💔 Happy here means blessed, not cheerful

🔁 Rewardeth means paying back the same way

⚖️ Babylon would receive what it gave Israel

📖 Babylon later fell the same way it conquered

## ⚡ That Taketh And Dasheth Thy Little Ones Against The Stones

This is the hardest line in the whole psalm to read.

It describes an act of war common among ancient conquerors.

Destroying a defeated nation's next generation was meant to end it completely.

The prophet Isaiah later describes this same fate falling on Babylon itself.

This line voices raw grief and rage.

It is not a command from God.

It is the pain of people who watched their families die.

⚡ This is the hardest line to read

⚔️ It describes a common act of ancient war

💥 Destroying a nation's next generation ended it completely

📖 This is grief, not a command from God
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTY_SEVEN_PERSONAL_SECTIONS = parsePsalmsOneHundredThirtySevenRawNotes(
  PSALMS_ONE_HUNDRED_THIRTY_SEVEN_RAW_NOTES
);
