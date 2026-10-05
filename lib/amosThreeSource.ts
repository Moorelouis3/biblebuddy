export type AmosThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseAmosThreeRawNotes(rawText: string): AmosThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: AmosThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Amos\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Amos 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Amos\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Amos\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Amos 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Amos 3:${startVerse}` : `Amos 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Amos 3 sections, received " + sections.length);
  }

  return sections;
}

const AMOS_THREE_RAW_NOTES = `# Amos 3:1-2
# 📣 Against The Whole Family Which I Brought Up From The Land Of Egypt
---
## 📣 Against The Whole Family Which I Brought Up From The Land Of Egypt

This word is not aimed at a handful of guilty individuals.

The whole family means the entire covenant nation stands charged together.

God names Himself as the one who brought them out of Egypt.

That rescue is the reason He has the right to speak now.

The same hand that freed them is the hand now bringing the charge.

📣 This word charges the whole nation
🤝 God names His own rescue of them
👑 The rescuer has the right to judge
📖 Freedom from Egypt grounds this charge

## 🤲 You Only Have I Known Of All The Families Of The Earth

Known here means much more than simply being aware someone exists.

It describes a chosen, covenant relationship unlike any other on earth.

God had many nations He was aware of across the world.

Israel alone was the one He bound Himself to in covenant.

Being known by God was never a reward for good behavior.

It came first, and everything else followed from it.

🤲 Known means a chosen covenant bond
🌍 Many nations existed across the earth
💍 Israel alone held this bond with God
📖 Being chosen came before anything they did

## ⚖️ Therefore I Will Punish You For All Your Iniquities

Therefore ties this punishment directly back to being known by God.

Most readers would expect being chosen to mean being spared trouble.

Amos reverses that expectation completely.

Greater closeness to God brings greater responsibility, not an exemption from it.

The nation that received the most is held to the highest standard.

⚖️ Therefore links privilege to accountability
🔄 Being chosen does not mean exemption
📏 Closeness to God raises the standard
📖 Greater privilege brings greater responsibility

# Amos 3:3-6
# 🦁 Will A Lion Roar In The Forest, When He Hath No Prey
---
## 🚶 Can Two Walk Together, Except They Be Agreed

This opens a chain of simple cause and effect questions.

Two people do not end up walking the same road by accident.

Something had to bring them into agreement first.

Amos uses this everyday picture to set up his whole argument.

Every effect in this chapter has a cause behind it, including the judgment coming on Israel.

🚶 Walking together requires prior agreement
🔗 This opens a chain of cause and effect
🧭 Amos is building toward his real point
📖 Nothing in this chapter happens without a cause

## 🦁 Will A Lion Roar In The Forest, When He Hath No Prey

A lion in the wild does not roar out of habit.

It roars after it has already caught something, not before the hunt.

The roar is the sound of a kill already secured.

Amos uses this picture for how he himself prophesies.

He does not speak warnings at random.

He speaks because the LORD has already decided what is coming.

🦁 A lion roars after catching prey
🎯 The roar follows a secured kill
🗣️ Amos speaks the same way
📖 The warning follows a decision already made

## 🐾 Will A Young Lion Cry Out Of His Den, If He Have Taken Nothing

Hebrew poetry often repeats an image with a second, related picture.

Here the roaring lion of the open forest is matched by a young lion crying from its den.

Both images say the same thing from two different angles.

Neither sound happens unless prey has already been taken.

Repetition in Scripture is rarely filler.

It is the writer leaning harder on one point.

🐾 A young lion matches the first image
🔁 Hebrew poetry often repeats with variation
🎯 Neither sound happens without prey first
📖 The repetition presses the same point harder

## 🪤 Where No Gin Is For Him

A gin here is an old word for a trap or snare.

The question asks whether a bird falls into a trap for no reason at all.

It does not, any more than a lion roars without a catch.

Every snapped trap means something stepped into it first.

Amos keeps stacking ordinary pictures that all prove the same rule.

🪤 A gin means a trap or snare
🐦 A trap only springs when triggered
🔗 This matches the lion pictures before it
📖 Nothing happens in nature without a cause

## 😨 Shall There Be Evil In A City, And The LORD Hath Not Done It

Evil here means disaster or calamity, not moral wickedness.

Amos is not saying the LORD commits sin.

He is saying that judgment falling on a city does not happen by accident.

The whole chain of questions lands here.

A trumpet alarm, a trap, a lion, and now a coming disaster all share one cause.

The judgment about to fall on Israel has a clear source behind it.

😨 Evil here means disaster, not sin
🚨 Judgment on a city is never random
🔗 This is the end of the question chain
📖 Coming disaster has a clear source

# Amos 3:7-8
# 📜 He Revealeth His Secret Unto His Servants The Prophets
---
## 📜 He Revealeth His Secret Unto His Servants The Prophets

Secret here points to the LORD's own private council, His plan before He acts.

God does not send disaster on a nation without warning first.

Prophets are the ones trusted to carry that warning to the people.

This is the pattern behind every question asked so far in the chapter.

Nothing happens without a cause, and here the cause is named directly.

📜 Secret means God's plan before He acts
🤝 God warns before He judges
🗣️ Prophets carry that warning
📖 This chapter has been building to this pattern

## 🦁 The Lion Hath Roared, Who Will Not Fear

This returns to the lion picture from a few lines earlier.

Back then the roar simply proved prey had been caught.

Now the roar has actually sounded, and the picture turns personal.

Fear is the only sane response once the roar is heard.

Amos is telling Israel that the sound they should fear has already started.

🦁 The lion image returns from before
📢 The roar has now actually sounded
😨 Fear is the only sane response
📖 The feared sound has already begun

## 🗣️ The Lord GOD Hath Spoken, Who Can But Prophesy

This is Amos defending why he cannot stay silent.

He is a herdman, not a trained member of the prophet's guild.

Some in Israel wanted him to stop speaking and go home.

Amos answers that silence was never really an option for him.

Once God has spoken, the only honest response is to say what was heard.

🗣️ Amos defends his own calling here
🚫 Staying silent was never an option
👂 God spoke, so Amos speaks
📖 An honest messenger repeats what he heard

# Amos 3:9-10
# 🏛️ Assemble Yourselves Upon The Mountains Of Samaria
---
## 🏛️ Publish In The Palaces At Ashdod, And In The Palaces In The Land Of Egypt

Ashdod represents Philistia and Egypt represents another old enemy of Israel.

Both nations were judged by name back in chapters one and two of this book.

Now the LORD calls those same pagan nations to come and watch.

Foreign nations are invited to witness a trial, not to join an attack.

It is a sharp irony that outsiders are summoned to judge Israel's own corruption.

🏛️ Ashdod and Egypt are old rivals
⚖️ Both were already judged earlier in this book
👀 They are summoned now as witnesses
📖 Outsiders are asked to see Israel's corruption

## ⛰️ Assemble Yourselves Upon The Mountains Of Samaria

Samaria was the capital city of the northern kingdom of Israel.

The surrounding mountains gave a clear vantage point looking down into the city.

The witnesses are told exactly where to stand to see what is happening.

This is not a vague accusation aimed at no one in particular.

It names the city and sets up the scene for what comes next.

⛰️ Samaria was Israel's capital city
👁️ The mountains gave a clear view down
🎯 The witnesses are placed on purpose
📖 The accusation names a real place

## 😱 Behold The Great Tumults In The Midst Thereof

Tumults means loud, violent disorder, not simple disagreement.

From the mountains, the witnesses would see chaos playing out inside the city.

This disorder came from how the powerful were treating the weak.

Thereof simply points back to Samaria, the city just named.

The scene on display is a city at war with its own poor.

😱 Tumults means violent disorder
👀 Witnesses see this chaos from above
⚖️ The disorder comes from mistreating the poor
📖 Samaria is shown at war with itself

## 🙈 They Know Not To Do Right

This is not describing people who made an occasional mistake.

Not knowing to do right means losing the ability to even recognize justice.

Years of choosing wrong had dulled their sense of right and wrong entirely.

A conscience, like anything else, can be worn down through repeated misuse.

Israel reached a point where wrong simply felt normal.

🙈 This is not a single mistake
🧠 Their sense of justice had worn away
🔁 Years of wrong choices caused this
📖 Wrong had come to feel normal

## 💰 Who Store Up Violence And Robbery In Their Palaces

Palaces here belonged to Israel's wealthy ruling class, not foreign kings.

Store up pictures wealth piling up over time, not a single theft.

That wealth came from violence and robbery against their own people.

This echoes the bribery and stolen pledges already named back in chapter two.

A nation's buildings reveal exactly how its people got their money.

💰 Palaces belonged to Israel's elite
📦 Store up means wealth piled up over time
🔗 This echoes the charges from chapter two
📖 Buildings reveal how the money was made

# Amos 3:11-12
# 🗡️ An Adversary There Shall Be Even Round About The Land
---
## 🗡️ An Adversary There Shall Be Even Round About The Land

An adversary surrounding the land pictures a full siege, not a border raid.

The enemy is not named here, though Assyria would later fulfill this threat.

Round about means the whole land, with no open side left to flee through.

This answers the trumpet alarm asked about earlier in the chapter.

The disaster the questions warned about now has a shape.

🗡️ An adversary pictures a full siege
🗺️ Round about means no side left open
🚨 This answers the earlier trumpet question
📖 The warned disaster now has a shape

## 🏚️ He Shall Bring Down Thy Strength From Thee

Strength here points to Israel's military and economic power together.

The very palaces built on robbery are the ones about to be stripped.

What was gained through violence is lost through the same kind of force.

This is not random destruction.

It targets exactly what Israel had trusted in instead of God.

🏚️ Strength means military and economic power
🔗 The palaces built on robbery fall first
⚖️ What was stolen is now stripped away
📖 Judgment targets misplaced trust directly

## 🐑 As The Shepherd Taketh Out Of The Mouth Of The Lion Two Legs, Or A Piece Of An Ear

Shepherds in Israel were required by law to prove a sheep was killed by a beast, not stolen.

Bringing back only a leg or a torn ear from a lion's mouth counted as that proof.

The shepherd was never trying to save the whole animal at that point.

He was only recovering enough to show what had happened.

This becomes the picture for Israel itself.

Only a small, broken remnant will be left to prove the nation once existed.

🐑 Shepherds had to prove a sheep was killed
🦴 A leg or ear counted as proof
💔 The whole animal was already lost
📖 Only a broken remnant will remain of Israel

## 🛋️ In The Corner Of A Bed, And In Damascus In A Couch

This pictures Israel's wealthy resting comfortably on imported furniture.

Damascus was known for fine, expensive couches traded across the region.

The scene is one of ease and luxury, not alertness or danger.

Judgment arrives in that exact moment of comfort and ease.

Comfort bought with stolen wealth offers no protection when the adversary comes.

🛋️ This pictures wealthy Israelites at ease
🪑 Damascus couches were expensive imports
😴 The scene shows comfort, not alertness
📖 Stolen comfort offers no real protection

# Amos 3:13-15
# 🏠 I Will Also Visit The Altars Of Bethel
---
## 👂 Testify In The House Of Jacob

Testify means the witnesses are now called to speak what they have seen.

House of Jacob refers to the whole covenant nation, named after their ancestor.

This is the same summons given earlier, now aimed directly at Israel itself.

The trial pictured from the mountains of Samaria now reaches a verdict.

What was only observed before is about to be announced out loud.

👂 Testify means speak what was witnessed
🏠 House of Jacob means the whole nation
⚖️ This is the same trial from before
📖 Observation now becomes a verdict

## 🏠 I Will Also Visit The Altars Of Bethel

Bethel was home to one of two golden calf shrines Israel's kings had built.

It functioned as a rival worship site to the LORD's temple in Jerusalem.

To visit here means God coming personally to bring judgment, not a friendly visit.

The place built to worship a false god becomes the first target.

False worship and social injustice are judged together in this chapter, not separately.

🏠 Bethel held a golden calf shrine
🚫 It rivaled true worship in Jerusalem
⚡ To visit here means judgment, not a blessing
📖 False worship is judged along with injustice

## ✂️ The Horns Of The Altar Shall Be Cut Off

The horns were pointed projections built onto each corner of an altar.

They were used to apply sacrificial blood and were believed to offer safety.

A person could grab the horns of an altar and claim protection from harm.

Cutting them off removed that false sense of safety completely.

Nothing about this altar, including the shrine built around it, could protect Israel now.

✂️ Horns were projections at the altar's corners
🩸 They were used for sacrificial blood
🛡️ People believed grabbing them meant safety
📖 That false safety is removed completely

## ❄️ I Will Smite The Winter House With The Summer House

Wealthy Israelites owned separate homes built for different seasons of the year.

Having two houses for comfort alone marked extreme and unnecessary wealth.

Smite means both houses are struck down together, not one spared for the other.

No amount of seasonal comfort will be left standing after this judgment.

Luxury built for convenience offers no shelter from God's hand.

❄️ Winter and summer houses show extreme wealth
🏘️ Two homes existed for comfort alone
💥 Both are struck down together
📖 Luxury offers no shelter from judgment

## 🐘 The Houses Of Ivory Shall Perish

Ivory was an extremely expensive material used to decorate the finest homes.

A house of ivory did not mean solid ivory walls, but costly ivory inlay throughout.

This kind of wealth was built directly on the robbery named earlier in the chapter.

The very symbol of Israel's excess becomes the clearest target of its ruin.

What was gathered through injustice does not survive the day of judgment.

🐘 Ivory was an extremely costly material
🏛️ These homes displayed Israel's excess
🔗 That wealth came from earlier named robbery
📖 Unjust gain does not survive judgment

## 🔚 The Great Houses Shall Have An End

Great houses points to the largest, most powerful estates in the land.

Even these are told plainly that their end has come.

This closes the chapter the same way it opened, with the LORD speaking directly.

Every image in this chapter, the lion, the trap, the siege, the altar, points to one ending.

Power and wealth built without justice do not last, no matter how great they appear.

🔚 Even the greatest estates will end
🗣️ The LORD closes the chapter speaking
🔗 Every image in the chapter points here
📖 Power without justice does not last
`.trim();

export const AMOS_THREE_PERSONAL_SECTIONS = parseAmosThreeRawNotes(AMOS_THREE_RAW_NOTES);
