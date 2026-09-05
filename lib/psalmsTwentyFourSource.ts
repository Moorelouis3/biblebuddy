export type PsalmsTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwentyFourRawNotes(rawText: string): PsalmsTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 24:${startVerse}` : `Psalms 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 24 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWENTY_FOUR_RAW_NOTES = `# Psalms 24:1-2
# 🌍 The Whole Earth Belongs To God
---
## 🌎 The Earth Is The LORD's, And The Fulness Thereof

"Fulness" means everything the earth holds, not only the bare ground.

That includes every person, every animal, and every hidden resource.

David opens the psalm with a flat claim of total ownership.

Nothing on earth sits outside of that claim.

That claim covers the reader too.

🌎 Fulness means everything the earth holds
👥 People, animals, and resources included
📜 David claims total ownership up front
➡️ That claim covers every reader too

## 🌐 The World, And They That Dwell Therein

"They that dwell therein" means everyone who lives on the earth.

This is not limited to one nation or one people group.

David counted himself among those the claim covers.

A king writing this admits he is also owned.

The verse moves from claiming land to claiming people.

🌐 Dwell therein means everyone on earth
🚫 No nation stands outside this claim
👑 Even the king counts as owned
📖 The claim covers land and people alike

## 🏗️ For He Hath Founded It Upon The Seas

"Founded" means to set something down on a stable base.

Ancient people pictured the world surrounded by a vast, restless sea.

That sea stood for danger and disorder in this culture.

God did not fear that chaos when He built the earth.

He set solid ground firmly on top of it.

🏗️ Founded means set on a stable base
🌊 The sea pictured danger and disorder
😌 God was not afraid of that chaos
📖 He built solid ground above it

## 🔁 Established It Upon The Floods

"Floods" here means the same restless waters called seas in the line before.

This is not two different events but one idea said twice.

Hebrew poetry often repeats an idea in two different words.

The repetition works like emphasis, not new information.

God's foundation gets stated once and then confirmed again.

🔁 Floods repeats the same watery image
📝 Hebrew poetry often says one idea twice
🔊 Repetition works like emphasis, not new facts
📖 God's foundation gets stated and confirmed

# Psalms 24:3-6
# 🏔️ Who May Climb God's Mountain
---
## 🏔️ Who Shall Ascend Into The Hill Of The LORD?

The "hill of the LORD" points to Mount Zion, where the temple stood in Jerusalem.

Pilgrims literally walked uphill to reach it during Israel's yearly feasts.

"Ascend" pictures that physical climb toward worship.

The question asks who actually deserves to make that climb.

Not everyone who climbs the hill truly belongs there.

🏔️ Hill of the LORD means Mount Zion
🚶 Pilgrims climbed there for the feasts
❓ The question asks who truly belongs
📖 Climbing the hill is not enough alone

## 🙌 He That Hath Clean Hands, And A Pure Heart

"Clean hands" pictures a person's actions and daily deeds.

"A pure heart" pictures a person's private thoughts and motives.

Together they cover both the outside and the inside of a life.

A person could look clean in public and still fail this test.

The psalm demands honesty in both places at once.

🙌 Clean hands pictures right actions
❤️ Pure heart pictures right motives
👀 Together they cover inside and outside
📖 Both must be true, not just one

## 🚫 Who Hath Not Lifted Up His Soul Unto Vanity

"Vanity" in this verse means something empty and worthless, especially an idol.

To "lift up the soul" unto something means to set your hope on it.

This person has not placed their trust in worthless, empty things.

Idols promised power but delivered nothing real.

Real worship starts by refusing to hope in what cannot help.

🚫 Vanity means something empty and worthless
🙏 Lifting up the soul means hoping in something
🗿 Idols promised power but gave nothing
➡️ Real worship refuses empty hope

## 🤝 Nor Sworn Deceitfully

An oath in this culture called on God's own name as a witness.

Breaking that promise treated God's name as worthless.

"Deceitfully" means lying on purpose, not by honest mistake.

This person's word could actually be trusted.

Clean hands and a pure heart also show up in a person's promises.

🤝 An oath called on God as witness
💔 Breaking it treated God's name lightly
🗣️ Deceitfully means lying under a promise
📖 Trustworthy words prove a clean heart

## 🎁 He Shall Receive The Blessing From The LORD

"Receive" pictures a gift being handed over, not a wage earned by effort.

The honest person described in the verses before this one is the one who receives it.

Blessing here means God's own favor resting on someone's life.

It is God's response to a heart already turned toward Him.

The gift follows the honesty, but it still stays a gift.

🎁 Receive pictures a gift, not a wage
🙌 It reaches the honest person just described
🌟 Blessing means God's favor resting on someone
📖 The gift follows honesty, but stays a gift

## 🎯 Righteousness From The God Of His Salvation

"Righteousness" here is something given by God, not something built alone.

"The God of his salvation" names God specifically as the one who rescues.

The title ties this person's right standing directly to being rescued.

Blessing and righteousness arrive together, not as two separate rewards.

Both come from the same source named twice in one verse.

🎯 Righteousness here is given, not built alone
🛟 God of his salvation names God as rescuer
🔗 Right standing ties directly to being rescued
📖 Blessing and righteousness share one source

## 👥 This Is The Generation Of Them That Seek Him

"Generation" here does not mean everyone born in the same years.

It means a category of people who share the same defining trait.

This generation is defined by seeking God, not by a birth date.

Anyone from any age or era can belong to this same group.

The psalm has moved from describing one person to describing a whole family of them.

👥 Generation here means a type of people
🚫 Not defined by birth date or era
🔍 Defined instead by seeking God
➡️ Anyone can join this family by seeking

## 🔁 That Seek Thy Face, O Jacob. Selah

"Seek thy face" repeats "seek him" from the line before in different words.

"Face" pictures closeness, like wanting to be in someone's presence.

"O Jacob" addresses the entire nation of Israel by their ancestor's name.

"Selah" is a pause marker, likely a cue for musicians or a moment to reflect.

The section ends by inviting the whole nation to want that same closeness.

🔁 Seek thy face restates seek him
🤗 Face pictures wanting real closeness
🇮🇱 O Jacob addresses the nation Israel
📖 Selah invites a pause to reflect

# Psalms 24:7-10
# 👑 The King Of Glory Enters
---
## 🚪 Lift Up Your Heads, O Ye Gates

This command speaks to the city gates as if they could hear and obey.

"Lift up your heads" pictures gates rising taller to let something great pass through.

Many believe this psalm was sung when the ark of the covenant entered Jerusalem.

The gates stand for the whole city getting ready to welcome God's presence.

An object cannot really lift itself, so the command makes a bigger point.

🚪 Gates get commanded like they can hear
📈 Lift up your heads pictures rising taller
📦 Many link this to the ark entering
📖 The command signals God's presence arriving

## 🏛️ Ye Everlasting Doors

"Everlasting doors" pictures doors built to last far longer than an ordinary lifetime.

The word points to something ancient, sturdy, and already standing for generations.

Some readers hear this as heaven's own gates, not only an earthly city's.

Either way, something enormous and lasting is asked to open wide.

Old, familiar doors are still commanded to make room for something greater.

🏛️ Everlasting doors pictures ancient, sturdy gates
🏗️ Points to something already standing for ages
☁️ Some read this as heaven's own gates
📖 Even old doors must open for something greater

## 👑 The King Of Glory Shall Come In

"King of glory" names God Himself using a royal title.

"Glory" pictures visible weight and honor, not just a feeling.

A king in this culture entered a city through its main gate in public view.

This king enters the same way, publicly and unmistakably.

The line answers what the open gates were actually for.

👑 King of glory names God Himself
✨ Glory pictures visible weight and honor
🚶 Kings entered cities through the main gate
📖 The gates opened for this exact moment

## ❓ Who Is This King Of Glory?

This question was likely sung by one group of voices in a temple procession.

A second group answered back with the verse that follows.

Call and response singing was common in ancient temple worship.

The question builds suspense before naming exactly who is arriving.

Asking a question the singers already know is a teaching device.

🎤 Likely sung by one group of voices
🗣️ A second group answered back
🎶 Call and response was common worship style
📖 The question builds suspense on purpose

## ⚔️ The LORD Strong And Mighty, The LORD Mighty In Battle

"Strong and mighty" and "mighty in battle" say the same idea twice for emphasis.

Repeating "the LORD" twice in one line adds even more weight to the answer.

"Mighty in battle" pictures God as a warrior who wins every fight.

This answer matches Israel's own history of God fighting for them.

The King entering the gates is not weak or distant but a proven warrior.

🔁 Strong and mighty repeats for emphasis
🗣️ Naming the LORD twice adds weight
⚔️ Mighty in battle pictures a warrior
📖 This King has already proven Himself

## ⏫ Even Lift Them Up, Ye Everlasting Doors

Verses seven and nine repeat almost the exact same command.

"Even lift them up" adds urgency the first call did not have.

Poetry often repeats a line to build toward its climax instead of just filling space.

This second call sets up a second, final question and answer.

The psalm is building toward one last, complete answer.

🔁 Verses seven and nine nearly repeat
⏫ Even lift them up adds urgency
📈 Repetition builds toward a climax
📖 One more question and answer is coming

## ⚔️ The LORD Of Hosts

"Hosts" means armies, specifically the armies of heaven under God's command.

Calling God "the LORD of hosts" names Him commander over every unseen force.

Earlier He was named a warrior who wins battles on earth.

This title reaches further, into battles no human eye can see.

The King entering these gates commands more power than any earthly army.

⚔️ Hosts means armies, including heaven's own
👑 LORD of hosts names God as commander
🌌 This title reaches beyond earthly battles
➡️ No earthly army compares to this King

## 🏠 He Is The King Of Glory. Selah

This final line answers the question asked twice in this psalm.

"He is" settles the matter with no more question needed.

The earth that belonged to God back in verse one now welcomes Him home.

"Selah" closes the psalm with one last pause to let that land.

The whole psalm moves from ownership to worship to homecoming.

✅ This final line answers the question
🏠 The earth welcomes its owner home
⏸️ Selah gives one last pause
📖 Ownership becomes worship becomes homecoming
`.trim();

export const PSALMS_TWENTY_FOUR_PERSONAL_SECTIONS = parsePsalmsTwentyFourRawNotes(PSALMS_TWENTY_FOUR_RAW_NOTES);
