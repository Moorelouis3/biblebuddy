export type PsalmsOneHundredThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirtySixRawNotes(rawText: string): PsalmsOneHundredThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+136:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 136 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+136:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+136:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 136 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 136,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 136:${startVerse}` : `Psalms 136:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 136 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTY_SIX_RAW_NOTES = `# Psalms 136:1-3
# 🙏 One Line Answers Every Line
---
## 🙏 O Give Thanks Unto The LORD

Give thanks here is a command, not a suggestion.

The whole nation was expected to answer it out loud.

The reason follows right behind the command.

"For he is good" answers the unasked question.

That one word becomes the claim this whole psalm sets out to prove.

🙏 Give thanks is a command, not a suggestion

👥 The whole nation answers together

✅ For he is good gives the reason

📖 The psalm spends twenty six verses proving it

## 🔁 For His Mercy Endureth For Ever

This exact line follows every single verse in the psalm.

Twenty six verses, twenty six times, the same six words.

"Mercy" here translates the Hebrew word hesed.

Hesed means loyal, unbreakable love inside a covenant, not just a kind feeling.

Jewish tradition calls this whole song the Great Hallel, the great praise.

It was sung at Passover.

One leader sang each opening line.

The people answered back with this same refrain.

🔁 Repeats after every verse, twenty six times

💛 Hesed means loyal, unbreakable covenant love

📯 Called the Great Hallel, the great praise

📖 Sung as a call and response at Passover

## 👑 The God Of Gods

This phrase does not admit that other gods are real.

Ancient nations each claimed their own chief god ruled the skies.

Calling the LORD the God of gods places him above every one of those claims at once.

The title is a superlative, the highest form of a Hebrew comparison.

No rival god gets named because none of them deserve a name here.

👑 God of gods is a superlative title

🆚 It does not admit other gods are real

📛 Rival gods go unnamed on purpose

📖 The LORD stands above every claimed god

## 🏛️ The Lord Of Lords

This line repeats the same pattern as the verse just before it.

"Lord" here means master or ruler, not merely a polite title.

Kings and emperors in the ancient world called themselves lord over their subjects.

The psalm answers every one of those claims with one higher title.

No human ruler, however powerful, sits above the LORD.

🏛️ Lord means master or ruler

👑 Kings called themselves lord over their people

⚖️ This title answers every human claim to power

📖 No ruler stands above the LORD

# Psalms 136:4-9
# 🌌 The God Who Made The Heavens
---
## 🌟 Him Who Alone Doeth Great Wonders

The word "alone" is doing the real work in this line.

No other power helped, competed, or gets credit here.

Ancient peoples often pictured many gods working together to run the world.

This psalm insists one God alone accounts for every wonder that follows.

The next five verses list exactly what those wonders are.

🌟 Alone means no other power helped

🚫 No rival god shares the credit

📜 Other nations pictured many gods ruling together

📖 One God alone did every wonder that follows

## 🧠 By Wisdom Made The Heavens

"Wisdom" here is not just cleverness or good planning.

In the Bible, wisdom is pictured as skill, the kind a master craftsman uses.

Proverbs pictures wisdom standing beside God at creation, like a skilled worker.

The heavens are not an accident.

They were built with the same kind of skill a craftsman brings to fine work.

🧠 Wisdom means skilled craftsmanship, not just cleverness

🛠️ Proverbs pictures wisdom at God's side during creation

🌌 The heavens were built, not accidental

📖 God's skill shows in the sky itself

## 🌍 Stretched Out The Earth Above The Waters

This line describes how ancient people pictured the shape of the world.

They saw the earth as a flat expanse set above deep waters below it.

Genesis opens with that same picture, waters everywhere before land appears.

"Stretched out" pictures God spreading the earth the way a tent is spread open.

The ground under every reader's feet was placed there on purpose.

🌍 The earth was pictured resting above the waters

⛺ Stretched out means spread out, like a tent

🌊 Genesis opens with that same picture of waters

📖 Solid ground was placed there on purpose

## ☀️ To Him That Made Great Lights

"Great lights" refers to the sun and the moon together.

Verse eight and verse nine will split this phrase into each light by name.

Ancient neighbors of Israel worshiped the sun and moon as gods in their own right.

This psalm calls them lights instead, objects God made, not powers to bow to.

The sky itself becomes a quiet argument against worshiping the sky.

☀️ Great lights means the sun and the moon

🙅 Neighboring nations worshiped sun and moon as gods

🔦 This psalm calls them lights, not gods

📖 The sky argues against worshiping the sky

## 🌙 The Sun By Day, The Moon And Stars By Night

God assigned two lights specific jobs, one for day and one for night.

"To rule" pictures the sun governing daylight hours like a king governs a kingdom.

The moon and stars share that same kind of rule over the night.

Genesis chapter one already called them the greater light and the lesser light.

Time itself runs on lights God set in place, not on gods people invented.

☀️ The sun rules the day

🌙 The moon and stars rule the night

📅 Genesis one already named them greater and lesser

📖 Time runs on lights God placed

# Psalms 136:10-15
# 🌊 The Exodus Retold Line By Line
---
## ⚔️ Smote Egypt In Their Firstborn

"Smote" is an old word for struck down with force.

This points to the tenth and final plague on Egypt.

Every firstborn son in Egypt died in a single night.

Israel's own firstborn sons were spared through the blood of the Passover lamb.

This single line compresses the entire Exodus story into six words.

⚔️ Smote means struck down with force

🌙 This points to the final plague on Egypt

🐑 Israel's firstborn were spared by the Passover lamb

📖 Six words carry the whole Exodus story

## 🚪 Brought Out Israel From Among Them

"Among them" means Israel was living inside Egypt, not visiting from outside it.

For four hundred years, Israel had grown up as slaves inside someone else's land.

"Brought out" describes a rescue, not an escape Israel managed on its own.

God is the one doing the bringing in every verb of this psalm.

Israel did not save itself out of Egypt.

🏚️ Among them means living inside Egypt itself

⏳ Israel had been there for four hundred years

🚪 Brought out means rescued, not self freed

📖 God is the one doing the rescuing

## 💪 With A Strong Hand, And With A Stretched Out Arm

This exact phrase shows up again and again across the Exodus story.

"Hand" and "arm" are pictures of raw, personal power, not actual limbs.

A strong hand pictures a grip no one can break.

A stretched out arm pictures reaching in to act, not standing back and watching.

Deuteronomy repeats this same pair of images to describe the same rescue.

✊ A strong hand means an unbreakable grip

💪 A stretched out arm pictures God reaching in

🔁 This exact pair of images repeats across Exodus

📖 Deuteronomy repeats the same picture for this rescue

## 🌊 Divided The Red Sea Into Parts

The Red Sea did not simply part down the middle by chance.

God split the water into sections, like walls standing on either side.

Israel then walked through the middle of the sea on dry ground.

What blocked every escape route became the very road out.

A sea became a highway for one night only.

🌊 Divided into parts means split into sections

🧱 The water stood like walls on each side

🚶 Israel walked through the sea on dry ground

📖 A sea became a road for one night

## 🪖 Overthrew Pharaoh And His Host In The Red Sea

"Host" is an old word for an army.

Pharaoh's entire army followed Israel into the sea God had just opened.

"Overthrew" means completely defeated, left with nothing standing.

The same sea that saved Israel destroyed the army chasing them.

The most powerful army of the ancient world drowned in a single moment.

🪖 Host is an old word for army

🌊 Pharaoh's army followed Israel into the open sea

💥 Overthrew means completely and finally defeated

📖 The sea that saved Israel destroyed Pharaoh's army

# Psalms 136:16-22
# 👑 Through The Wilderness To The Land
---
## 🏜️ Led His People Through The Wilderness

The rescue at the sea was not the end of the journey.

Israel still had forty years of wandering ahead of them.

"Led" pictures God going ahead, not just pushing from behind.

A pillar of cloud and fire led them through that wandering.

God did not save Israel and then leave them to find their own way.

🏜️ Led means God went ahead, not behind

⏳ Forty years of wandering followed the rescue

🔥 A pillar of cloud and fire led them

📖 God did not save them and then leave

## ⚔️ Smote Great Kings, And Slew Famous Kings

These two lines say almost the same thing in different words.

Hebrew poetry often repeats one idea twice instead of arguing a point once.

"Smote" and "slew" both describe kings defeated in battle.

"Great" and "famous" both describe rulers with real power and reputation.

Repeating the idea twice makes the victory sound even more complete.

🔁 These two lines repeat one idea twice

📜 Hebrew poetry often says one thing two ways

⚔️ Smote and slew both mean defeated in battle

📖 Saying it twice makes the victory sound total

## 🗺️ Sihon King Of The Amorites

Sihon was a real king who ruled land east of the Jordan River.

He refused to let Israel pass peacefully through his territory.

Numbers chapter twenty one records Israel's war against him in full.

His defeat gave Israel its first solid ground on the way to Canaan.

A named king, not a vague enemy, is remembered here on purpose.

🗺️ Sihon ruled land east of the Jordan

🚫 He refused to let Israel pass through

⚔️ Numbers twenty one records the war against him

📖 His defeat gave Israel its first solid ground

## 🗻 Og The King Of Bashan

Og ruled Bashan, a fertile region further north than Sihon's kingdom.

Deuteronomy remembers him as the last of a race of giants.

His iron bed is described later in Deuteronomy as unusually large.

Two named kings, back to back, show this was a real war, not a legend.

Every king in Israel's path fell, one after another.

🗻 Og ruled Bashan, further north than Sihon

🛏️ Deuteronomy remembers his unusually large iron bed

👣 A giant king still could not stand

📖 Every king in the path still fell

## 🏡 Gave Their Land For An Heritage

"Heritage" means an inheritance, something passed down and owned for good.

This was not a loan or a temporary camp.

The land itself became a lasting possession, not a stop along the way.

Every promise God made to Abraham lands here, in dirt Israel could finally call home.

The wandering finally had an ending.

🏡 Heritage means a lasting inheritance

🚫 This was not a loan or a camp

📜 Every promise to Abraham lands in this ground

📖 The wandering finally reached an ending

## 🎖️ An Heritage Unto Israel His Servant

This verse names exactly who receives the inheritance just described.

"His servant" is a title of honor here, not a term of low status.

Israel serves God the way a trusted official serves a king.

The nation exists to carry out God's purposes in the world.

Receiving the land came with a role attached to it, not just a gift.

👤 This names who receives the land

🎖️ Servant here is a title of honor

🤝 Israel serves God like a trusted official

📖 The land came with a purpose attached

# Psalms 136:23-26
# 🍞 God Still Remembers, God Still Feeds
---
## 🔀 Who Remembered Us In Our Low Estate

The psalm suddenly shifts from "they" to "us."

The singers are no longer just retelling ancient history.

"Low estate" means a humbled, weakened condition, not simply poverty.

This may recall a hard season of exile, long after the Exodus story.

God's memory did not stop with the Exodus.

🔀 The psalm shifts from they to us

📉 Low estate means humbled, not just poor

🕯️ This may recall a hard season of exile

📖 God's memory did not stop with the Exodus

## 💰 Hath Redeemed Us From Our Enemies

"Redeemed" is a rescue word with a price attached to it.

In ancient Israel, a close relative could pay to free a family member from debt or slavery.

That relative was called a redeemer.

The psalm pictures God acting as Israel's own family redeemer.

Rescue here was not distant or impersonal.

💰 Redeemed means rescued at a price

👪 A family member could pay this price

🤲 God acts as Israel's own family redeemer

📖 The rescue was personal, not distant

## 🍽️ Who Giveth Food To All Flesh

The focus suddenly widens from Israel to every living creature.

"All flesh" means every creature that eats, not just God's chosen people.

The God who split seas and toppled kings also feeds sparrows.

He feeds farmers too, every single day, without exception.

History making power and everyday care come from the same God.

🌍 The focus widens to every living creature

🍽️ All flesh means every creature that eats

🐦 The same God who split seas feeds sparrows

📖 Great power and daily care share one source

## 🔁 O Give Thanks Unto The God Of Heaven

The psalm ends exactly where it began, with a command to give thanks.

"God of heaven" is a title used often after Israel returned from exile.

It points to God's rule over everything, not just one nation's history.

Twenty six verses of evidence stand behind this final command.

The same refrain that closed every verse gets the last word here too.

🔁 The psalm ends exactly where it began

🌌 God of heaven points to rule over everything

📚 Twenty six verses of evidence back this command

📖 The same refrain gets the very last word
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTY_SIX_PERSONAL_SECTIONS = parsePsalmsOneHundredThirtySixRawNotes(
  PSALMS_ONE_HUNDRED_THIRTY_SIX_RAW_NOTES
);
