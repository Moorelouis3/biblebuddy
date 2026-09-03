export type JobThirtySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirtySevenRawNotes(rawText: string): JobThirtySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirtySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+37:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 37 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+37:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+37:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 37 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 37,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 37:${startVerse}` : `Job 37:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 37 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTY_SEVEN_RAW_NOTES = `# Job 37:1-5
# ⚡ Thunder Is The Voice Of God
---
## ⚡ At This Also My Heart Trembleth

"Trembleth" means shakes, but not necessarily from fear.

Elihu is describing awe, the kind that comes from witnessing something enormous.

His heart feels displaced, almost knocked out of its normal rhythm.

He is reacting to the storm forming around him as he speaks.

😮 Trembleth means shakes with awe

❤️ His heart feels physically displaced

⛈️ A storm is forming as he speaks

📖 Awe can be a physical reaction

## 👂 Hear Attentively The Noise Of His Voice

"Voice" here does not mean literal words spoken aloud.

Elihu means the thunder itself, rolling out from the storm.

He tells Job to listen closely as it happens above them.

Ancient listeners often heard thunder as God speaking directly.

👂 Voice pictures thunder itself

⛈️ Elihu means literal storm sounds

🗣️ Ancient people heard thunder as speech

📖 God speaks through the storm

## 🌍 His Lightning Unto The Ends Of The Earth

This is not describing an occasional, local flash of light.

Elihu says God directs lightning across the entire sky at once.

Its reach covers the whole earth, not just the region overhead.

Nothing about the storm escapes God's direction, however far it travels.

⚡ Lightning is not just local

🌍 Its reach covers the whole earth

🧭 God directs its entire path

📖 Nothing in the storm escapes His control

## 🌩️ He Thundereth With The Voice Of His Excellency

Thunder always follows lightning in this description, not before it.

"Voice of his excellency" pictures thunder as pure, raw majesty.

Elihu says God does not hold back or delay the sound.

Once that voice sounds, no one nearby can ignore it.

🌩️ Thunder follows lightning here

👑 Excellency means pure majesty

🚫 God does not hold anything back

📖 No one can ignore His voice

## 🧠 Great Things Doeth He Which We Cannot Comprehend

Elihu ends this opening picture with plain humility.

God does things every day that human minds cannot fully grasp.

The storm becomes proof of something too large to explain away.

Elihu wants Job to feel that size before he says another word.

🙏 Elihu ends with humility here

🧠 Some of God's works defy full understanding

⛈️ The storm proves that size

📖 Job needs to feel it first

# Job 37:6-10
# ❄️ God Commands The Weather
---
## ❄️ He Saith To The Snow

God speaks to snow the way a person gives a command.

"Be thou on the earth" pictures snow appearing simply because God said so.

The same picture applies to gentle rain and driving rain alike.

Ordinary weather becomes a small picture of God's spoken authority.

❄️ God speaks and snow falls

🗣️ This phrase pictures a spoken command

🌧️ Both gentle and driving rain obey

📖 Weather shows God's spoken authority

## 🔒 He Sealeth Up The Hand Of Every Man

"Sealeth up" means to shut down or stop completely.

Winter weather forces outdoor work to a standstill for everyone.

Farmers, travelers, and laborers all feel the same pause at once.

Elihu says this happens so people notice God's work in it.

🔒 Sealeth up means stops completely

🌨️ Winter halts outdoor work

👥 Everyone feels the same pause

📖 The pause makes people notice God

## 🐻 Then The Beasts Go Into Dens

Wild animals respond to changing weather long before it fully arrives.

They retreat into dens and stay hidden until conditions change.

Creation obeys this rhythm automatically, without question or delay.

People often resist the very pause that animals accept naturally.

🐻 Beasts sense the change coming

🏠 They retreat into dens

🔁 Creation obeys this rhythm

📖 People resist what animals accept

## 🌪️ Out Of The South Cometh The Whirlwind

Elihu ties specific weather to specific directions in the sky.

Whirlwinds are pictured arriving from the south in this region.

Cold is pictured arriving instead from the north.

Ancient people read the sky like a map for coming weather.

🌪️ Whirlwind comes from the south

🥶 Cold comes from the north

🗺️ Direction shaped weather expectations

📖 Ancient people read the sky closely

## 🌬️ By The Breath Of God Frost Is Given

Elihu pictures frost as coming from God's own breath.

It is a vivid image, not a scientific explanation of ice.

"Straitened" means narrowed or squeezed into a tighter space.

Water freezing was, to Elihu, God visibly narrowing what once flowed freely.

🌬️ Frost pictured as God's breath

🧊 The image is poetic, not scientific

📏 Straitened means narrowed or squeezed

📖 Freezing water shows God's touch

# Job 37:11-13
# ☁️ Clouds Obey His Counsels
---
## 💧 He Wearieth The Thick Cloud

"Wearieth" means to load something down until it grows heavy.

Elihu pictures God loading a cloud with moisture until it must let go.

The image is exhaustion, not violence or force.

Rain becomes the natural result of a cloud that can hold no more.

💧 Wearieth means loaded down heavily

☁️ God loads the cloud with moisture

😩 The image is exhaustion, not force

📖 Rain follows when the cloud is full

## 🔄 It Is Turned Round About By His Counsels

This is not describing random or chaotic cloud movement.

Elihu says clouds move according to God's specific plans.

"Counsels" means wise decisions, not accidents or coincidence.

Weather that looks unpredictable to us still follows real direction.

🔄 Clouds are not random

🧭 God's counsels guide their movement

🧠 Counsels means wise decisions

📖 Unpredictable weather still follows a plan

## 🌍 Whatsoever He Commandeth Them Upon The Face Of The World

Clouds obey God's commands across the entire globe at once.

No region is skipped or forgotten in this description.

Elihu is building toward total, worldwide sovereignty over weather.

Nothing in the sky operates outside His instruction.

🌍 Clouds obey across the whole earth

🚫 No region is left out

👑 This shows total sovereignty

📖 Nothing in the sky escapes instruction

## ⚖️ Whether For Correction Or For His Land Or For Mercy

The same rain or storm can serve more than one purpose.

Sometimes it comes to correct wrongdoing among people.

Sometimes it comes simply to water the land itself.

Sometimes it comes as an act of plain mercy toward someone.

⚖️ Weather can serve different purposes

🌩️ Sometimes it comes as correction

🌾 Sometimes it waters the land

📖 Sometimes it is simply mercy

# Job 37:14-18
# 🌤️ Stand Still And Consider
---
## 👂 Hearken Unto This O Job

Elihu stops warning and gives Job a direct command.

"Hearken" means listen carefully, not just hear in passing.

He tells Job to stand still instead of responding right away.

Sometimes the right response to God's greatness is simply silence.

👂 Hearken means listen carefully

🛑 Elihu tells Job to stand still

🤐 Silence can be the right response

📖 Stillness prepares Job to truly hear

## 🧐 Consider The Wondrous Works Of God

"Consider" means to think deeply, not glance and move on.

Elihu wants Job to slow down and actually study creation.

The storm building around them becomes Job's assignment to examine.

Real answers come from careful attention, not quick reaction.

🧐 Consider means think deeply

🐢 Elihu wants Job to slow down

⛈️ The storm becomes Job's assignment

📖 Careful attention leads to real answers

## ❓ Dost Thou Know When God Disposed Them

This question expects Job to admit that he does not know.

"Disposed" means arranged or set in their proper order.

Job has been demanding answers he cannot actually produce himself.

Elihu uses the question to expose that gap honestly.

❓ The question expects Job to admit ignorance

📋 Disposed means arranged in order

🙊 Job cannot answer his own demand

📖 The question exposes that honestly

## ☁️ The Balancings Of The Clouds

Clouds are heavy with water, yet somehow they stay in the sky.

"Balancings" points to that very mystery, weight that does not fall.

Think of a fully loaded shelf that never once sags or breaks.

To ancient eyes, a floating cloud looked exactly that impossible.

☁️ Clouds are heavy yet they float

⚖️ Balancings names that mystery

📚 Think of a shelf that never sags

📖 Floating clouds looked impossible to ancient eyes

## 👕 How Thy Garments Are Warm

Elihu shifts from a massive storm to something small and personal.

He points to the simple warmth Job feels in his own clothes.

"Quieteth the earth by the south wind" pictures a still, warm breeze settling in.

Even that small comfort traces back to God's ordinary control of weather.

👕 Elihu points to something small

🌬️ A warm south wind quiets the earth

😌 Even comfort has a cause

📖 Small comforts trace back to God

## 🪞 Spread Out The Sky Which Is Strong

Elihu asks whether Job has ever helped build something like the sky.

Ancient people pictured the sky as a solid, dome shaped surface.

"Molten looking glass" compares it to a polished bronze mirror.

To them, the sky looked strong enough to actually hold weight.

❓ Elihu asks if Job helped build this

🌐 The sky was pictured as solid

🪞 Molten looking glass means a bronze mirror

📖 It looked strong enough to bear weight

# Job 37:19-24
# 🙏 We Cannot Find Him Out
---
## 🙏 Teach Us What We Shall Say Unto Him

Elihu suddenly admits that even he does not have adequate words.

This humility interrupts three chapters of confident speaking.

Facing God honestly can silence even a talkative man.

Elihu models the exact posture he wants Job to take.

🙏 Elihu admits he lacks words too

🤫 This interrupts his own confidence

😶 Facing God can silence anyone

📖 Elihu models Job's needed posture

## 🌑 We Cannot Order Our Speech By Reason Of Darkness

"Darkness" here does not describe the weather or the sky.

It pictures human understanding that is limited and incomplete.

Elihu admits people cannot arrange perfect words about a God this large.

Even honest confusion is safer than false confidence before Him.

🌑 Darkness here means limited understanding

🗣️ People cannot arrange perfect words

🤷 Confusion is honest, not shameful

📖 Honest confusion beats false confidence

## 🚫 If A Man Speak Surely He Shall Be Swallowed Up

This does not describe someone being literally eaten or destroyed.

"Swallowed up" pictures a person overwhelmed by their own careless words.

Elihu warns against speaking to God with casual confidence.

Some situations call for careful silence instead of quick opinions.

🚫 Not literal eating or destruction

🌊 Swallowed up means overwhelmed by words

🤐 Casual confidence before God is risky

📖 Silence can be the wiser choice

## 👀 The Wind Passeth And Cleanseth Them

Just before this, thick clouds blocked the bright light in the sky.

Job could not look at it directly, and that detail matters.

Elihu describes wind arriving and clearing that same sky again.

Cleanseth here pictures the storm passing rather than lingering forever.

👀 Bright light was hidden briefly

🌬️ Wind then clears the sky

🔄 Storms move on, they do not linger

📖 Even blinding storms eventually pass

## 🌤️ Fair Weather Cometh Out Of The North

The storm Elihu described finally begins to clear here.

Clear skies arriving from the north complete the picture of shifting weather.

"With God is terrible majesty" follows immediately after that calm.

Terrible here means awe inspiring, not evil or harmful.

🌤️ The storm finally begins to clear

🧭 Clear skies came from the north

👑 Terrible majesty follows right after

📖 Terrible here means awe inspiring, not evil

## 🔍 Touching The Almighty We Cannot Find Him Out

Elihu reaches the same conclusion Job will hear directly next chapter.

God cannot be fully searched out or reduced to a formula.

He remains excellent in power, judgment, and justice all at once.

"He will not afflict" promises that His power is never cruelty.

🔍 God cannot be fully searched out

⚖️ He holds power, judgment, and justice together

❤️ His power is never cruelty

📖 This sets up God's own answer next

## 🙇 Men Do Therefore Fear Him

Elihu ends with the natural response to everything he has said.

Fear here means deep reverence, not cowering or terror.

"He respecteth not any that are wise of heart" warns against relying on personal cleverness.

Elihu closes by pointing every reader back to plain reverence.

🙇 Fear here means deep reverence

🧠 Elihu warns against relying on cleverness

👑 Human wisdom impresses God the least

📖 The chapter closes on plain reverence
`.trim();

export const JOB_THIRTY_SEVEN_PERSONAL_SECTIONS = parseJobThirtySevenRawNotes(JOB_THIRTY_SEVEN_RAW_NOTES);
