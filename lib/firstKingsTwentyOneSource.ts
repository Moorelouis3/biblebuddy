export type FirstKingsTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsTwentyOneRawNotes(rawText: string): FirstKingsTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsTwentyOne\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsTwentyOne\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsTwentyOne\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 21:${startVerse}` : `1 Kings 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Kings 21 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_TWENTY_ONE_RAW_NOTES = `# FirstKingsTwentyOne 21:1-4
# 🍇 Naboth Refuses To Sell
---
## 🍇 Naboth The Jezreelite Had A Vineyard

Jezreel sat in a fertile valley.

Ahab kept a second royal home there, beside the one in Samaria.

Naboth owned a vineyard growing right next to that royal ground.

Vines took years to plant and grow.

This was not a quick garden but land Naboth's family had worked for generations.

🍇 Jezreel held one of Ahab's homes

🏡 Naboth's vineyard sat right beside it

🌱 Vines take years to grow

📖 The land ran in Naboth's family

## 🏡 A Garden Of Herbs, Because It Is Near Unto My House

Ahab does not want the land for another vineyard.

He wants a garden of herbs, a plot for growing vegetables.

He wants it close to his own house.

Kings normally seized land like this without asking.

Ahab instead offers Naboth a fair trade or full payment.

🥬 Herbs means a vegetable garden

🏠 He wants it near his house

👑 Kings usually just seized land

📖 Ahab offers a fair trade first

## ⚖️ The LORD Forbid It Me, That I Should Give The Inheritance Of My Fathers

Naboth is not just being stubborn about his farm.

Under God's law, family land could not be sold away forever.

Leviticus twenty five ties that rule directly to God himself.

The land was always understood to belong to Him first.

Selling it, even for a fair price, would break God's law.

Naboth chooses obedience over profit.

⚖️ Family land could not be sold forever

📜 Leviticus twenty five ties this to God

🙅 Naboth refuses even a fair price

📖 He puts obedience over profit

## 😠 He Laid Him Down Upon His Bed, And Turned Away His Face

Ahab reacts like a child, not like a king.

He lies down and turns his face to the wall.

He refuses to eat.

This same heavy and displeased reaction closed out chapter twenty.

A pattern is forming in Ahab, not just one bad mood.

😠 Ahab sulks like a child

🛏️ He turns away and refuses food

🔁 The same reaction closed chapter twenty

📖 A pattern keeps repeating in Ahab

# FirstKingsTwentyOne 21:5-7
# 👑 Jezebel Takes Charge
---
## 😟 Why Is Thy Spirit So Sad, That Thou Eatest No Bread

Jezebel notices Ahab's mood right away.

She asks him directly instead of guessing.

Ahab is the king of Israel, yet he is sulking like a child over land.

Jezebel sees this as weakness, not grief.

👀 Jezebel notices Ahab's mood at once

❓ She asks him what is wrong

👑 A king sulking looks weak to her

📖 She sees weakness, not real grief

## 🗣️ Dost Thou Now Govern The Kingdom Of Israel

Jezebel mocks Ahab for acting powerless.

She grew up in Sidon, where the king's word was absolute law.

Israel's kings answered to God's law and could not simply take land.

Jezebel does not understand or accept that limit on Ahab's power.

🗣️ Jezebel mocks Ahab's weakness

👑 She grew up under absolute kings

📜 Israel's kings answered to God's law

📖 Jezebel rejects that limit on power

## 🍷 I Will Give Thee The Vineyard Of Naboth The Jezreelite

Jezebel makes a bold promise on her own.

She never asks Ahab how she plans to get it.

Ahab does not question her either.

His silence lets her take charge of the whole plot.

🍷 Jezebel promises the vineyard herself

❓ She never explains her plan

🤐 Ahab asks no questions

📖 His silence hands her control

## 🍞 Arise, And Eat Bread, And Let Thine Heart Be Merry

Jezebel gives Ahab three quick commands in a row.

She tells him to get up, eat, and enjoy himself again.

None of these commands deal with Naboth's actual refusal.

She is changing the subject, not solving the real problem.

👑 Jezebel gives three quick commands

🍞 Get up, eat, and be merry

🙈 She ignores Naboth's real refusal

📖 She changes the subject, not the problem

# FirstKingsTwentyOne 21:8-10
# ✉️ The Plot By Letter
---
## ✉️ Wrote Letters In Ahab's Name, And Sealed Them With His Seal

Jezebel writes official letters without telling Ahab.

A royal seal was pressed into wax or clay to prove a letter's authority.

Using Ahab's own seal made the letters carry full royal power.

Anyone reading them would believe the king himself gave the order.

✉️ Jezebel writes the letters herself

🔏 A seal proved royal authority

👑 She uses Ahab's own seal

📖 Readers believed the king ordered it

## 🍽️ Proclaim A Fast, And Set Naboth On High Among The People

A fast was normally called during a crisis or after some serious sin.

Calling one here made it look like Naboth had done something wrong.

Setting Naboth on high meant seating him in a place of honor at first.

That seat made the coming accusation look like a formal public trial.

🍽️ A fast suggested a hidden sin

🎭 It made Naboth look guilty already

🪑 High seating looked like honor first

📖 It staged a fake public trial

## ⚖️ Sons Of Belial, Before Him, To Bear Witness Against Him

Belial meant worthless or wicked in this culture.

God's law required two or three witnesses before anyone could be executed.

Jezebel supplies exactly two men to meet that legal requirement.

She uses the letter of the law to commit a lie.

⚖️ Belial means worthless or wicked

📜 Two witnesses met the legal minimum

🎯 Jezebel picks exactly two men

📖 She twists the law into a lie

# FirstKingsTwentyOne 21:11-14
# 🪨 Naboth Is Stoned
---
## 👥 Did As Jezebel Had Sent Unto Them

The elders and nobles were the respected leaders of Naboth's own city.

They receive a royal letter ordering a man's death on a false charge.

Not one of them objects or investigates the claim.

They carry out the plan exactly as it was written.

👥 Local leaders received the order

❌ None of them questioned it

🤐 No one investigated the charge

📖 They obeyed the letter exactly

## 🗣️ Naboth Did Blaspheme God And The King

Blasphemy against God or the king was treated as a capital crime.

The two false witnesses accuse Naboth of both at once.

This charge was designed to leave no room for mercy.

The whole accusation is a complete lie from Jezebel's letter.

🗣️ Blasphemy was a capital charge

👥 Two witnesses accuse Naboth falsely

❌ The charge left no room for mercy

📖 The whole accusation was a lie

## 🪨 Carried Him Forth Out Of The City, And Stoned Him With Stones

Executions were carried out outside the city, not inside it.

This kept the community from being made unclean by the death.

A crowd stones Naboth until he dies.

The whole city takes part in killing an innocent man.

🚶 Executions happened outside city walls

🩸 This avoided ritual uncleanness inside

🪨 A crowd stones Naboth to death

📖 The whole city shares the guilt

## 📨 They Sent To Jezebel, Saying, Naboth Is Stoned, And Is Dead

The city reports back to Jezebel like a job completed.

No one questions what just happened or why.

The message is short and businesslike.

An innocent man's death gets treated as a simple errand.

📨 The city reports back to Jezebel

✅ They treat it as finished business

🤐 No one questions the outcome

📖 A murder gets treated like an errand

# FirstKingsTwentyOne 21:15-16
# 🤫 Take Possession
---
## 🍇 Arise, Take Possession Of The Vineyard Of Naboth

Jezebel tells Ahab the vineyard is finally his.

She never mentions how she got it.

Jezebel simply says Naboth is not alive, but dead.

Ahab does not ask a single question about how Naboth died.

🍇 Jezebel says the land is his

🤐 She hides how she got it

❓ Ahab asks nothing about Naboth's death

📖 His silence makes him guilty too

## 🚶 Rose Up To Go Down To The Vineyard Of Naboth The Jezreelite, To Take Possession Of It

Ahab wastes no time once he hears the news.

He heads straight to Jezreel to claim the land himself.

His quick trip shows real eagerness, not reluctance.

The king who once sulked over this vineyard now hurries toward it.

🚶 Ahab rushes to claim the land

⏱️ He wastes no time at all

😊 His eagerness shows real desire

📖 The sulking king now hurries with joy

# FirstKingsTwentyOne 21:17-19
# 😡 Elijah Confronts Ahab
---
## 👤 The Word Of The LORD Came To Elijah The Tishbite

Elijah last appeared fleeing for his life in chapter nineteen.

God now sends him straight back into danger, to confront the king himself.

Elijah the Tishbite was from Gilead, a rugged region east of the Jordan River.

God interrupts Ahab's celebration at the very moment he takes the land.

👤 Elijah last fled in chapter nineteen

🔥 God sends him back to confront Ahab

🗺️ Tishbite marks him as from Gilead

📖 God interrupts Ahab at his happiest moment

## 📍 Behold, He Is In The Vineyard Of Naboth, Whither He Is Gone Down To Possess It

God tells Elijah exactly where to find Ahab.

Ahab is standing in the stolen vineyard at this very moment.

Whither means to the place where, an old way of giving direction.

God confronts sin at the exact scene of the crime.

📍 God tells Elijah exactly where to look

🍇 Ahab stands in the stolen vineyard

🗺️ Whither means to the place where

📖 God meets Ahab at the crime scene

## ❓ Hast Thou Killed, And Also Taken Possession

Elijah's question names two separate crimes at once.

Killing Naboth was the first crime.

Taking his land was the second, separate crime.

Ahab tried to treat the land as a simple inheritance, not stolen property.

❓ Elijah names two crimes at once

🪨 Killing Naboth was the first crime

🍇 Taking the land was the second crime

📖 Ahab treated stolen land as normal

## 🐕 In The Place Where Dogs Licked The Blood Of Naboth Shall Dogs Lick Thy Blood

Dogs in this culture were scavengers, not pets.

Being eaten by dogs meant a shameful death with no proper burial.

Elijah promises Ahab will die in the exact spot Naboth died.

The punishment mirrors the crime with painful precision.

🐕 Dogs were scavengers, not pets

💀 Dog death meant a shameful end

📍 Ahab will die where Naboth died

📖 The punishment mirrors the crime exactly

# FirstKingsTwentyOne 21:20-24
# ⚖️ The Sentence Pronounced
---
## 😠 Hast Thou Found Me, O Mine Enemy

Ahab calls Elijah his enemy the moment he sees him.

Elijah already confronted Ahab's sin once before, back on Mount Carmel.

Ahab still refuses to see Elijah as anything but a threat.

He never calls him a true prophet of God.

😠 Ahab greets Elijah as an enemy

🔥 Carmel already exposed Ahab's sin before

❌ Ahab still calls him only a threat

📖 He never names Elijah a true prophet

## 💰 Because Thou Hast Sold Thyself To Work Evil

Elijah answers Ahab's question with a direct verdict.

Selling himself means Ahab gave himself over completely to wrongdoing.

This was not one bad decision but a life pattern.

Naboth's murder is simply the latest proof of it.

💰 Sold himself means total surrender to evil

🔁 This was a pattern, not one act

🪨 Naboth's murder proves the pattern

📖 Elijah names the real problem plainly

## 👨‍👩‍👧 Cut Off From Ahab Him That Pisseth Against The Wall

This blunt phrase was a common way of saying every male in a family line.

God promises to end Ahab's entire dynasty, not just punish Ahab himself.

Shut up and left meant everyone, whether slave or free.

No member of Ahab's household would escape this judgment.

👨‍👩‍👧 The phrase means every male heir

⚰️ Ahab's whole dynasty is condemned

🔓 Shut up and left meant slave or free

📖 No household member escapes this judgment

## 🏚️ Like The House Of Jeroboam The Son Of Nebat

Jeroboam and Baasha were two earlier kings of Israel's northern kingdom.

God had already ended both of their family lines because of their sin.

Ahab's family now faces that same exact fate.

A clear pattern keeps repeating across Israel's kings.

🏚️ Jeroboam and Baasha were earlier kings

⚰️ Both dynasties were wiped out before

🔁 Ahab's family repeats their same fate

📖 A pattern is forming across Israel

## 🛐 Made Israel To Sin

This phrase describes almost a title used again and again for Israel's worst kings.

Ahab did not just sin privately in his own life.

He led the whole nation of Israel into worshiping Baal alongside him.

A king's sin in this story never stays personal.

🏷️ This phrase describes Israel's worst kings

🙇 Ahab's sin was never just private

🛐 He led the nation into worshiping Baal

📖 A king's sin becomes a nation's sin

## 🐕 The Dogs Shall Eat Jezebel By The Wall Of Jezreel

Jezebel receives her own specific and gruesome sentence.

Dogs eating her body meant total public shame with no honorable burial.

This judgment names the exact wall of the very city she schemed in.

Her plot against Naboth brings a punishment matched to her by name.

🐕 Jezebel gets her own sentence

💀 Dogs eating her meant total shame

📍 It happens at Jezreel, her own scheme

📖 The punishment fits her crime exactly

## 🕊️ Him That Dieth Of Ahab In The City The Dogs Shall Eat

This sentence covers every possible way a family member might die.

Someone dying inside the city becomes food for dogs.

Someone dying out in open fields becomes food for birds instead.

No member of Ahab's line gets a proper burial anywhere.

🕊️ The sentence covers every death location

🐕 City deaths are eaten by dogs

🦅 Field deaths are eaten by birds

📖 No proper burial awaits this family

# FirstKingsTwentyOne 21:25-26
# 💔 Ahab's Wickedness Summarized
---
## 💔 There Was None Like Unto Ahab, Which Did Sell Himself To Work Wickedness

This verse steps back and judges Ahab's entire reign at once.

No king of Israel had ever sold himself this completely to sin.

Jezebel is named directly as the one who stirred him toward it.

Ahab still bears full responsibility for his own choices.

💔 This verse judges Ahab's whole reign

🥇 No king had sold out this far

👑 Jezebel stirred him toward evil

📖 Ahab still owns his own choices

## 🗿 He Did Very Abominably In Following Idols, According To All Things As Did The Amorites

The Amorites were a Canaanite people whose idol worship God had judged long before Israel arrived.

Comparing Ahab to them is one of the harshest insults the Bible can give a king of Israel.

God had removed the Amorites from the land for this exact sin.

Ahab now repeats the very evil that got them removed.

🗿 Amorites were an idol worshiping people

⚔️ God removed them from the land before

😔 Comparing Ahab to them is harsh

📖 Ahab repeats the sin that ended them

# FirstKingsTwentyOne 21:27-29
# 🙇 Ahab's Repentance
---
## 🧵 He Rent His Clothes, And Put Sackcloth Upon His Flesh

Ahab tears his own clothing the moment he hears Elijah's sentence.

Sackcloth was coarse, rough cloth worn to show real grief or humility.

He wears it directly against his skin, not just over his robes.

This response looks nothing like his earlier sulking over the vineyard.

🧵 Ahab tears his own clothing

🩹 Sackcloth showed real grief or humility

🙇 He wears it against his own skin

📖 This differs from his earlier sulking

## 🚶 Fasted, And Lay In Sackcloth, And Went Softly

Ahab fasts and sleeps in the rough sackcloth for a period of time.

Going softly means walking humbly and subdued, not with his usual pride.

This is a real, sustained act of mourning, not a brief gesture.

For once, Ahab responds to correction instead of resisting it.

🚶 Went softly means walking humbly

⏳ This mourning lasted for a while

🙇 It was sustained, not just a moment

📖 Ahab finally responds instead of resisting

## 👀 Seest Thou How Ahab Humbleth Himself Before Me

God notices Ahab's humility immediately and points it out to Elijah.

This shows God responds to real repentance, even from a wicked king.

Because of it, God delays the promised judgment.

The disaster will fall on Ahab's son instead of on Ahab himself.

👀 God notices Ahab's humility at once

🙏 Real repentance changes God's response

⏳ The judgment gets delayed, not canceled

📖 It falls on Ahab's son instead
`.trim();

export const FIRST_KINGS_TWENTY_ONE_PERSONAL_SECTIONS = parseFirstKingsTwentyOneRawNotes(FIRST_KINGS_TWENTY_ONE_RAW_NOTES);
