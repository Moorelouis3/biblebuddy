export type JobFortyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobFortyOneRawNotes(rawText: string): JobFortyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobFortyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+41:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 41 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+41:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+41:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 41 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 41,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 41:${startVerse}` : `Job 41:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Job 41 sections, received " + sections.length);
  }

  return sections;
}

const JOB_FORTY_ONE_RAW_NOTES = `# Job 41:1-3
# 🐊 Canst Thou Draw Out Leviathan
---
## 🐊 Canst Thou Draw Out Leviathan With An Hook

Leviathan means an enormous, untamable creature that lives in the water.

Many scholars believe the description matches a crocodile, stretched into poetic, larger than life terms.

God has just finished describing Behemoth in the previous chapter.

Now He turns to an even more fearsome creature.

An ordinary fisherman could pull a fish out of the water with a hook and a cord.

God asks Job if he could do the same thing to Leviathan.

🐊 Leviathan means an untamable water creature

🔬 Likely describes a crocodile in poetic form

🎣 A hook and cord catch ordinary fish

📖 Leviathan is nothing like an ordinary fish

## 🪢 Canst Thou Put An Hook Into His Nose

Ancient hunters sometimes led captured animals by a ring or cord through the nose or jaw.

That method controlled dangerous animals like bulls after they were caught.

God asks whether Job could do that to Leviathan.

No rope or hook could ever hold a creature this powerful.

🪢 Hunters led captured animals by a ring

🐂 This method controlled dangerous animals

❌ No one could do this to Leviathan

📖 Leviathan cannot be captured or led

## 🙏 Will He Make Many Supplications Unto Thee

Supplications means humble begging or pleading for mercy.

God asks if Leviathan would ever beg Job for its life like a servant would.

"Soft words" means gentle, submissive speech, spoken to calm someone in power.

A defeated animal or captured slave might speak that way to a master.

Leviathan would never speak that way to anyone.

🙏 Supplications means humble pleading for mercy

🗣️ Soft words means gentle submissive speech

⛓️ Only a defeated captive speaks this way

📖 Leviathan bows to no one

# Job 41:4-6
# 🐦 A Servant For Ever
---
## 🤝 Wilt Thou Take Him For A Servant For Ever

A covenant here means a formal agreement between two parties.

People made covenants with other people, not with wild animals.

God asks whether Job could ever bind Leviathan into a lifelong service agreement.

The real question is not about paperwork.

It is about whether Job holds any actual power over this creature.

🤝 A covenant means a formal agreement

🚫 People do not make covenants with animals

💪 Job holds no power over Leviathan

📖 Only God has real authority here

## 🐦 Wilt Thou Play With Him As With A Bird

Small birds were sometimes kept as pets and tied with a string for children to enjoy.

God asks if Job could treat Leviathan the same casual way.

Think of a child holding a bird on a leash in the yard.

Leviathan on a leash for a servant girl to play with is impossible.

The image makes Leviathan's power obvious through humor.

🐦 Small birds were once kept as pets

👧 Maidens means young female servants

😂 The image is meant to sound absurd

📖 Leviathan cannot be a household pet

## 🐟 Shall The Companions Make A Banquet Of Him

Merchants sometimes bought and divided large fish to sell in pieces at market.

God asks if traders could carve up Leviathan and sell his meat like an ordinary catch.

Nobody has ever hauled in a creature like this to sell.

The question exposes how far beyond human reach Leviathan really is.

🐟 Merchants divided large fish for market

💰 God asks if traders could sell him

🚫 No one has ever caught Leviathan

📖 He is far beyond human reach

# Job 41:7-11
# 🛡️ None Is So Fierce
---
## 🔱 Canst Thou Fill His Skin With Barbed Irons

Barbed irons and fish spears were fishing harpoons used to catch large sea creatures.

God asks if Job could stab enough of them into Leviathan's hide to bring him down.

Leviathan's skin was too tough for ordinary weapons to even pierce.

Every hunting tool a person might try would fail here.

🔱 Barbed irons and spears were harpoons

🎯 Meant for hunting large sea creatures

🛡️ Leviathan's skin cannot be pierced this way

📖 Human weapons fail against him

## ✋ Lay Thine Hand Upon Him, Remember The Battle

God dares Job to simply touch Leviathan once.

One touch would be enough to teach Job never to try that again.

"Remember the battle" is a warning, not an invitation.

The memory of that encounter would end any further attempt.

✋ God dares Job to touch him once

😳 One touch would teach a hard lesson

🚫 Job would never try it again

📖 Some battles are not worth starting

## 🙅 The Hope Of Him Is In Vain

Hope here means any confidence that a person could actually defeat Leviathan.

That hope is in vain, meaning it is completely false and empty.

Even seeing Leviathan from a distance is enough to overwhelm a grown man.

No one needs to fight him to feel powerless.

🙅 Hope of catching him is completely false

😨 Even the sight of him overwhelms people

👀 Fear starts before any fight begins

📖 Power like this does not need to attack

## ❓ Who Then Is Able To Stand Before Me

No man is fierce enough to provoke Leviathan on purpose.

God uses that fact to ask a much bigger question.

If no one dares wake up a creature God made, who could possibly stand against God Himself.

The question shifts from Leviathan to God in a single breath.

😬 No one dares to provoke Leviathan

❓ God asks a far bigger question

💪 If Leviathan is unbeatable, so is his Maker

📖 The creature points straight back to God

## ⏳ Who Hath Prevented Me, That I Should Repay Him

"Prevented" here is an old word meaning to give something first or go ahead of someone.

God asks who has ever given Him anything that He now owes a debt for.

Nobody has, because everything that exists already belongs to God.

Job cannot put God in his debt, and neither can anyone else.

⏳ Prevented means to go before or give first

💳 No one has ever put God in debt

🌍 Everything under heaven already belongs to Him

📖 God owes no one anything

# Job 41:12-17
# 🐉 The Face Of His Garment
---
## 📢 I Will Not Conceal His Parts, Nor His Power

God now shifts from questions to a direct description.

He promises to describe Leviathan's body, strength, and "comely proportion," meaning how well built the creature is.

This description is not exaggeration for its own sake.

It builds the case for exactly how far beyond Job's control this creature really is.

📢 God shifts to direct description now

💪 Comely proportion means well built and balanced

🐉 Every detail proves his impossible strength

📖 The description builds toward one point

## 🧥 Who Can Discover The Face Of His Garment

"His garment" refers to Leviathan's tough outer hide or scales.

"Discover" here means to uncover or strip away, not to find something new.

A "double bridle" pictures the strength of his jaws, like a set of reins no one could grip.

No person could peel back that hide or force open that mouth.

🧥 His garment means his tough hide

🔓 Discover means to strip away or uncover

🐴 Double bridle pictures unbeatable jaw strength

📖 No one can strip him down

## 🚪 Who Can Open The Doors Of His Face

His mouth is pictured as a set of heavy doors that will not budge.

Think of trying to force open a locked gate with your bare hands.

No one has that kind of strength.

"Terrible round about" means his teeth surround his mouth as a constant, frightening threat.

🚪 His mouth is compared to locked doors

🔒 No one can force it open

🦷 His teeth surround his mouth completely

📖 Every angle of his face threatens danger

## 🛡️ His Scales Are His Pride

His scales work like rows of small shields locked tightly together.

"Shut up together as with a close seal" means there is no gap or weak point anywhere.

A soldier's armor was only as strong as its weakest joint.

Leviathan's armor has no weak joint at all.

🛡️ His scales work like rows of shields

🔐 Close seal means no weak gaps

⚔️ Armor is only as strong as its joints

📖 His armor has no weak point

## 🌬️ One Is So Near To Another, That No Air Can Come Between Them

His scales sit so close together that nothing fits between them.

Not even a thin layer of air can pass through the gaps.

This continues the picture of armor with no weak points at all.

A single unbroken wall of scales covers his entire body.

🌬️ No air can pass between his scales

🧱 There are no gaps anywhere in his armor

🔗 This continues the picture from the verse before

📖 One unbroken wall covers his whole body

## 🔗 They Are Joined One To Another, They Stick Together

"Sundered" is an old word meaning pulled apart or separated.

His scales are joined so tightly that no force can ever split them.

This finishes four straight verses describing his impenetrable armor.

Every detail has built toward the same conclusion.

🔗 Sundered means pulled apart or separated

🚫 Nothing can ever split his scales apart

🛡️ This completes four verses about his armor

📖 Nothing can break through him

# Job 41:18-21
# 🔥 Burning Lamps Out Of His Mouth
---
## 🤧 By His Neesings A Light Doth Shine

"Neesings" is an old word for sneezes.

When Leviathan surfaces and blows water from his nose, it catches sunlight and flashes like light.

"His eyes are like the eyelids of the morning" pictures eyes glowing the way the sky glows before sunrise.

The image paints him as almost too dazzling and dangerous to look at directly.

🤧 Neesings means sneezes

✨ Water spray flashes like light in the sun

🌅 His eyes glow like the light of dawn

📖 He is almost too much to look at

## 🔥 Out Of His Mouth Go Burning Lamps

Poetry often stretches a real animal into something larger than life to make a point.

Here Leviathan's mouth is pictured breathing out fire and sparks like a torch.

No real creature literally breathes fire.

The image communicates raw, overwhelming power rather than a literal fact.

🔥 His mouth is pictured breathing fire

📜 Poetry stretches real animals for effect

🚫 No creature literally breathes flame

📖 The image shows overwhelming power

## 🍲 Out Of His Nostrils Goeth Smoke

A "seething pot or caldron" is a pot of boiling water or oil, steaming heavily over a fire.

Leviathan's breath is compared to smoke rising off one of those pots.

The comparison keeps building the picture of a creature that seems to burn from the inside.

🍲 A caldron is a pot boiling over fire

💨 His breath is compared to rising steam

🔥 The fire imagery keeps building

📖 He seems to burn from within

## 🔥 His Breath Kindleth Coals

"Kindleth" means to set something on fire or make it burn.

This verse closes out four straight verses of fire and smoke imagery.

The point was never really about actual flames.

It is about a creature so overwhelming that ordinary language reaches for fire to describe him.

🔥 Kindleth means to set on fire

📚 This ends four verses of fire imagery

🐉 The point is overwhelming power, not literal flame

📖 Ordinary words cannot fully capture him

# Job 41:22-25
# 🪨 A Heart As Firm As A Stone
---
## 💪 In His Neck Remaineth Strength

His neck alone is described as a source of great strength.

"Sorrow is turned into joy before him" is a genuinely difficult phrase in the original language.

Many scholars believe it pictures terror or panic running ahead of him wherever he moves.

Other creatures react with dread the moment he approaches.

💪 His neck itself carries great strength

❓ This phrase is genuinely hard to translate

😨 Many read it as terror going before him

📖 Other creatures dread his approach

## 🥩 The Flakes Of His Flesh Are Joined Together

"Flakes" here means the folds or layers of his thick flesh.

Those layers are packed so tightly that they hold firm under pressure.

"They cannot be moved" means nothing can shift or loosen that solid build.

His whole body works like one solid, unshakable mass.

🥩 Flakes means the folds of his flesh

🧱 The layers are packed firm and tight

🚫 Nothing can shift or loosen them

📖 His body acts like one solid mass

## 🪨 His Heart Is As Firm As A Stone

"The nether millstone" was the heavy bottom stone in a hand mill, built to take constant grinding pressure.

Comparing his heart to that stone pictures total fearlessness, not a heart literally made of rock.

Nothing rattles him and nothing makes him hesitate.

🪨 A millstone was the hardest working stone

😤 His heart pictures total fearlessness

🚫 Nothing rattles or slows him down

📖 Courage this solid has no equal

## 😱 When He Raiseth Up Himself, The Mighty Are Afraid

When Leviathan rises up, even strong and powerful creatures are afraid.

"By reason of breakings they purify themselves" is another unusually hard phrase to translate exactly.

The general sense is that his sudden movement sends others fleeing or reeling in shock.

The text leaves the exact detail unclear, but the fear itself is unmistakable.

😱 Even the mighty fear his rising

❓ This phrase is hard to pin down exactly

🏃 The general sense is panic and flight

📖 His power needs no explanation to be felt

# Job 41:26-29
# ⚔️ The Sword Cannot Hold
---
## ⚔️ The Sword Of Him That Layeth At Him Cannot Hold

A "habergeon" was a coat of armor worn to protect the chest and neck in battle.

God lists a sword, a spear, a dart, and a habergeon, the standard weapons and armor of the day.

None of them can wound or hold Leviathan.

Every weapon a soldier trusted in battle fails completely here.

⚔️ A habergeon was a coat of armor

🗡️ Sword, spear, dart, and armor all fail

🚫 Nothing wounds or holds him

📖 Human weapons cannot touch him

## ⚙️ He Esteemeth Iron As Straw

Iron and brass were the strongest metals people had for weapons.

To Leviathan, iron feels as weak as dry straw and brass feels as weak as rotten wood.

Think of trying to stop a truck with a broom.

That is the kind of mismatch being described here.

⚙️ Iron and brass were the strongest metals known

🌾 To him, iron feels like straw

🪵 Brass feels like rotten, crumbling wood

📖 Human strength cannot match his

## 🏹 The Arrow Cannot Make Him Flee

Arrows and slingstones were common long range weapons in ancient warfare.

Neither one can even scare Leviathan into running away.

"Slingstones are turned with him into stubble" means they feel as harmless as bits of dry straw against him.

Even the best long range weapons of the day are useless.

🏹 Arrows cannot make him run

🪨 Slingstones feel like harmless straw to him

🎯 Long range weapons fail just like close ones

📖 Distance offers no real advantage

## 😂 He Laugheth At The Shaking Of A Spear

"Darts are counted as stubble" repeats the same picture from the verse before, weapons treated like dry straw.

A shaking spear was meant to threaten an enemy before the fight even began.

Leviathan is not even slightly bothered by that display.

He responds the way a person might laugh at a child's toy weapon.

🏹 Darts feel like dry straw to him

🗡️ A shaking spear was meant to threaten

😂 He is not bothered by the threat

📖 Every human weapon becomes a joke to him

# Job 41:30-34
# 👑 King Over All The Children Of Pride
---
## 🔪 Sharp Stones Are Under Him

His underside is pictured as covered in sharp, pointed edges like broken pottery.

"He spreadeth sharp pointed things upon the mire" pictures him dragging across mud like a heavy threshing sledge.

A threshing sledge was a spiked board farmers dragged over grain to separate it.

Even the ground itself shows the weight of what just passed over it.

🔪 His underside is pictured as sharp edged

🌾 A threshing sledge was a spiked farm tool

🐾 He leaves deep marks dragging through mud

📖 His presence marks even the ground

## ♨️ He Maketh The Deep To Boil Like A Pot

When he moves through water, he churns it so hard it looks like it is boiling.

"The sea like a pot of ointment" pictures the water frothing and swirling like a thick, stirred oil.

A creature this size does not slip quietly through water.

He turns it into visible chaos.

♨️ He churns water until it looks boiling

🫙 An ointment pot pictures thick swirling froth

🌊 He never moves through water quietly

📖 His motion turns calm water to chaos

## 👴 One Would Think The Deep To Be Hoary

"Hoary" is an old word for white or gray, the color of aged hair.

As he swims, he leaves a shining, foamy trail behind him on the water's surface.

That trail is bright enough that the dark sea briefly looks pale and aged.

His path lingers even after he has already passed through.

👴 Hoary means white or gray like old hair

✨ He leaves a bright foamy trail

🌊 The dark sea briefly looks pale

📖 His path outlasts his passing

## 🌍 Upon Earth There Is Not His Like

No other creature on earth compares to Leviathan.

"Made without fear" means he was created without any capacity for being afraid.

Every other living thing responds to danger with some level of fear.

Leviathan simply does not.

🌍 No creature on earth compares to him

😐 Made without fear means fear cannot touch him

🐾 Every other creature knows some fear

📖 He stands utterly alone in this

## 👑 He Is A King Over All The Children Of Pride

Leviathan looks down on every high and proud thing without effort.

"Children of pride" likely means the proudest, most powerful creatures that exist.

God has just spent two full chapters describing two creatures Job cannot begin to control.

If Job cannot question Behemoth or Leviathan, he has no grounds to question the God who made them both.

This whole speech was never really about animals.

It was about showing Job exactly who he has been arguing with.

👑 He rules over every proud creature

🐉 Two chapters proved Job cannot control either one

❓ Cannot question them, cannot question God

📖 The real point was always about God
`.trim();

export const JOB_FORTY_ONE_PERSONAL_SECTIONS = parseJobFortyOneRawNotes(JOB_FORTY_ONE_RAW_NOTES);
