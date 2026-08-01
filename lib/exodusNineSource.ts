export type ExodusNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusNineRawNotes(rawText: string): ExodusNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 9:${startVerse}` : `Exodus 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 9 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_NINE_RAW_NOTES = `# Exodus 9:1-7
# 🐄 The Plague On Livestock
---
## 🗣️ Let My People Go, That They May Serve Me

"Serve" means true worship, not just being allowed to leave.

This is the fourth time God sends this exact demand to Pharaoh.

Three plagues have already come and gone since Moses first said it.

The demand itself has never once changed.

Only Pharaoh's answer keeps changing plague after plague.

🗣️ Serve means true worship, not release
🔢 This is the fourth time God demands it
🔁 Three plagues have come and gone since
📖 Pharaoh changes, but the demand never does

## 🐄 There Shall Be A Very Grievous Murrain

"Murrain" means a deadly disease that kills livestock.

This plague strikes horses, donkeys, camels, oxen, and sheep all at once.

Every animal Egypt depended on for travel, farming, and trade is named specifically.

Nothing about this list was left vague or general.

🐄 Murrain means a deadly livestock disease
🐴 Horses, donkeys, camels, oxen, and sheep named
💰 These animals ran Egypt's whole economy
📖 Nothing about the target was left vague

## ⚖️ The LORD Shall Sever Between The Cattle Of Israel And The Cattle Of Egypt

"Sever" means to separate completely, not just to spare by luck.

God draws a clear line between Israel's herds and Egypt's herds before the plague even starts.

This same kind of visible distinction already appeared with the flies in the last chapter.

The line is announced first, then proven true.

⚖️ Sever means a deliberate separation
🗺️ Israel's herds and Egypt's herds get split
🔁 This distinction already showed up with the flies
📖 The line is announced, then proven

## 📅 The LORD Appointed A Set Time

God names the exact day the plague will strike, before it happens.

"Tomorrow" leaves no room to explain the deaths away as ordinary disease.

The next morning, every word comes true exactly as spoken.

A predicted plague cannot be dismissed as coincidence.

📅 God names the day in advance
🌅 Tomorrow removes any excuse of timing
✅ The plague strikes exactly as promised
📖 A predicted event cannot be coincidence

## 🔍 Pharaoh Sent, And, Behold, There Was Not One Of The Cattle Of The Israelites Dead

Pharaoh does not simply take Moses at his word this time.

He sends men to check Israel's herds in Goshen for himself.

Every single animal belonging to Israel is confirmed alive and well.

Even personal, firsthand proof is not enough to change Pharaoh's mind.

🔍 Pharaoh personally verifies Israel's herds
✅ Every one of Israel's animals survived
👀 This was firsthand proof, not rumor
📖 Proof alone cannot soften a hardened heart

## 🪨 The Heart Of Pharaoh Was Hardened

Verse seven ends the same way earlier chapters already have, hardened and unmoved.

This is now the fifth plague to end with the identical result.

The pattern is no longer a possibility, it is Pharaoh's established habit.

Real proof changes nothing when a heart refuses to bend.

🪨 Hardened again, the same as before
🔢 The fifth plague ends the same way
🔁 Pattern has become Pharaoh's habit now
📖 Proof cannot bend a heart that refuses

# Exodus 9:8-12
# 🔥 The Plague Of Boils
---
## 🔥 Take To You Handfuls Of Ashes Of The Furnace

"Furnace" here likely recalls the brick kilns Israel was forced to work under as slaves.

Moses and Aaron throw handfuls of that same kind of ash into the open sky.

The action itself carries meaning before a single boil ever appears.

The very furnace tied to Israel's forced labor becomes the sign of Egypt's judgment.

🔥 Furnace likely recalls Israel's forced brick labor
🤲 Moses throws the ash into the sky
✋ The action carries meaning before the plague hits
📖 Israel's furnace imagery becomes Egypt's judgment

## 🩹 A Boil Breaking Forth With Blains Upon Man, And Upon Beast

"Blains" means painful, swollen sores that break open on the skin.

Every earlier plague struck property, animals, rivers, or the ground itself.

This is the first plague to strike human bodies directly and painfully.

Egyptians and their remaining animals suffer through it together.

🩹 Blains means painful, swollen sores
📜 Earlier plagues struck property, not bodies
😖 This is the first plague on human skin
📖 Egyptians and their animals suffer alike

## 🚫 The Magicians Could Not Stand Before Moses Because Of The Boils

Egypt's magicians had matched or explained away several plagues already.

Here, the very plague meant to prove God's power lands on them personally.

They cannot even stay on their feet in front of Moses.

Their whole role in this contest quietly ends in this verse.

🚫 The magicians are struck by this plague too
📜 They had matched earlier signs before this
🧍 They cannot even stand before Moses
📖 Their role in this contest ends here

## 🪨 The LORD Hardened The Heart Of Pharaoh

Earlier verses in Exodus describe Pharaoh hardening his own heart.

This verse says plainly that the LORD hardened it instead.

Both descriptions run through the plagues, Pharaoh's own choice and God's confirming judgment.

God does not force a stubborn will where none already existed.

🪨 This time the LORD hardens Pharaoh's heart
📜 Earlier verses show Pharaoh hardening his own
🔁 Both descriptions appear across these chapters
📖 God confirms a choice already being made

# Exodus 9:13-17
# 📢 God Explains His Larger Purpose
---
## 🌅 Rise Up Early In The Morning, And Stand Before Pharaoh

Moses meets Pharaoh at the river most mornings, a routine already used earlier in these plagues.

God sends him again at the same early hour, in the same public place.

Nothing about the confrontation happens in private or by surprise.

Every warning Pharaoh receives comes out in the open, on the record.

🌅 Moses meets Pharaoh early again
🔁 This routine already appeared earlier in Exodus
👀 The warning happens in public each time
📖 Nothing here happens by surprise

## 💯 I Will At This Time Send All My Plagues Upon Thine Heart

God signals a shift in how this confrontation is aimed.

The plagues from here forward target Pharaoh's heart directly, not just his land.

"Heart" here means his will, the seat of his stubborn refusal.

The goal was never only Egypt's crops or cattle.

💯 God aims the next plagues at Pharaoh himself
❤️ Heart here means his stubborn will
🎯 The target has always been his refusal
📖 Crops and cattle were never the real goal

## ☠️ Thou Shalt Be Cut Off From The Earth

God states plainly that He could have already ended Pharaoh's life by now.

"Pestilence" means a deadly, fast spreading disease, one final plague God chooses not to send yet.

Pharaoh is still alive only because God has chosen to let him stand a little longer.

Mercy and warning are still doing the work judgment could already have finished.

☠️ God could have ended Pharaoh already
🦠 Pestilence means a deadly, fast spreading disease
⏳ Pharaoh survives only because God allows it
📖 Warning is still doing what judgment could

## 👑 For This Cause Have I Raised Thee Up, For To Shew In Thee My Power

This does not mean God made Pharaoh evil or forced his stubbornness.

It means God placed Pharaoh on the throne at exactly this moment in history.

A weaker or more reasonable king would not have made God's power nearly as visible.

Pharaoh's own resistance becomes the stage this power gets displayed on.

👑 God placed Pharaoh on the throne now
🚫 This is not God forcing Pharaoh's evil
🎭 A weaker king would show less power
📖 Resistance became the stage for God's power

## 🌍 That My Name May Be Declared Throughout All The Earth

God says His purpose here reaches past Egypt's own borders.

This confrontation is meant to become known to nations who never even meet Pharaoh.

Centuries later, this exact story still gets told and remembered around the world.

The goal from the very start was global, not local.

🌍 God's purpose reaches beyond Egypt
🗺️ Distant nations were meant to hear this
📜 This story is still told centuries later
📖 The goal was global from the start

## ❓ As Yet Exaltest Thou Thyself Against My People

"Exaltest" means to lift oneself up in pride, to act as though no one stands above you.

Four plagues have already struck Egypt hard by this point in the story.

Pharaoh still carries himself as though he outranks the one sending them.

Pride can survive proof it has already lost the argument.

❓ Exaltest means to proudly lift oneself up
🔢 Four plagues have already struck by now
👑 Pharaoh still acts like he outranks God
📖 Pride can outlast proof it has lost

# Exodus 9:18-21
# 🧊 Hail Is Announced
---
## 🧊 A Very Grievous Hail, Such As Hath Not Been In Egypt Since The Foundation Thereof

God promises a storm worse than anything Egypt has ever recorded.

"Since the foundation thereof" means since Egypt became a nation at all.

This is not exaggeration meant only to scare Pharaoh into acting.

The disaster about to strike genuinely has no precedent in Egypt's history.

🧊 This hail is promised worse than any before
📜 Foundation means since Egypt became a nation
🚫 This is not exaggeration or scare tactics
📖 The disaster truly has no precedent

## 🏠 Send Therefore Now, And Gather Thy Cattle

For the first time in these plagues, God offers a way to avoid the coming disaster entirely.

Anyone who brings animals and workers indoors before the storm will be spared.

The warning is not only for Israel this time, it goes out to all of Egypt.

Escape depends on believing the warning enough to act on it.

🏠 A way to avoid this plague is offered
🆕 This is the first plague offering escape
🌍 The warning goes out to all of Egypt
📖 Escape depends on believing the warning

## 🏠 He That Feared The Word Of The LORD ... Made His Servants And His Cattle Flee Into The Houses

Some Egyptians take God's warning through Moses seriously, not just Israel.

"Feared the word of the LORD" means they respected it enough to obey it.

They move their own servants and animals to safety before the storm hits.

Faith here looks like action taken before the danger actually arrives.

🏠 Some Egyptians act on the warning too
🙏 Feared means respected enough to obey
⚡ They act before the danger arrives
📖 Faith here means acting on a warning

## 🌾 He That Regarded Not The Word Of The LORD Left His Servants And His Cattle In The Field

Other Egyptians hear the exact same warning and simply ignore it.

"Regarded not" means they treated it as unimportant, not worth changing their plans for.

Their servants and animals stay exposed out in the open field.

The very same warning produces two completely different outcomes, based on the response.

🌾 Others ignore the same warning
🚫 Regarded not means treated as unimportant
⚠️ Their animals stay exposed in the field
📖 One warning, two very different outcomes

# Exodus 9:22-26
# ⚡ The Hail Strikes
---
## 🌩️ Moses Stretched Forth His Rod Toward Heaven: And The LORD Sent Thunder And Hail, And The Fire Ran Along Upon The Ground

Moses raises his rod, the same tool already used to bring earlier plagues.

Thunder, hail, and fire all strike Egypt together at the exact same moment.

Fire and hail do not naturally occur together in a real storm.

This combination alone marks the storm as something beyond ordinary weather.

🌩️ Moses raises the same rod as before
⚡ Thunder, hail, and fire strike together
🚫 Fire and hail do not naturally mix
📖 This storm goes beyond ordinary weather

## ✅ So There Was Hail, And Fire Mingled With The Hail, Very Grievous

This verse confirms that the warning from a few verses earlier came true exactly as spoken.

"Since it became a nation" repeats the same claim made in verse eighteen.

Egypt's own history now contains a marker event tied directly to this one storm.

A promise this specific, fulfilled this precisely, leaves nothing to chance.

✅ The earlier warning comes true exactly
📜 This repeats the claim from verse eighteen
🗓️ Egypt's history now marks this storm
📖 A precise fulfillment leaves nothing to chance

## 🌳 The Hail Smote Every Herb Of The Field, And Brake Every Tree Of The Field

The hail does not stop at people and animals left out in the open.

Every plant and every tree standing in a field gets struck as well.

This damage reaches past the current danger into Egypt's future food supply.

A nation cannot recover quickly once its fields and orchards are broken.

🌳 Crops and trees are struck too
🌾 Damage reaches past the immediate danger
🍽️ Egypt's future food supply takes the hit
📖 Broken fields threaten more than one season

## 🗺️ Only In The Land Of Goshen ... Was There No Hail

Goshen was the specific region in Egypt where Israel's people lived.

This same pattern of protection already appeared with the flies and the livestock plague.

By this point in the story, the distinction is no longer a surprise to anyone.

God's people keep standing untouched inside a nation being repeatedly struck.

🗺️ Goshen was Israel's home region in Egypt
🔁 This pattern already appeared with earlier plagues
👀 The distinction is no longer a surprise
📖 Israel stands untouched inside a struck nation

# Exodus 9:27-30
# 😔 Pharaoh Confesses, But Doubt Remains
---
## 😔 I Have Sinned This Time: The LORD Is Righteous, And I And My People Are Wicked

This is the clearest, most direct confession Pharaoh has given so far in this whole story.

He openly names his own sin and calls God righteous in plain words.

No earlier response in these chapters has gone this far in admitting guilt.

Clear words here still have to be tested against what happens next.

😔 This is Pharaoh's clearest confession yet
🗣️ He names his sin and calls God righteous
📜 No earlier response went this far
📖 Clear words still need to be tested

## 🙏 Intreat The LORD That There Be No More Mighty Thunderings And Hail

Pharaoh offers his strongest promise so far, full release with no further delay.

Earlier chapters only ever produced partial offers or conditions attached to the deal.

This time nothing is held back in what he says out loud.

Whether the promise actually holds is still an open question.

🙏 Pharaoh offers full release this time
📜 Earlier offers always carried conditions
✅ Nothing is held back in his words
➡️ Whether it holds is still unknown

## 🚶 That Thou Mayest Know How That The Earth Is The LORD's

Moses agrees to pray, but he keeps his prayer outside the city on purpose.

Praying inside a city full of idols would blur whose power actually stopped the storm.

The stated goal is not just relief, it is proof of who truly rules creation.

Even the small detail of where Moses prays carries that same message.

🚶 Moses prays outside the city on purpose
🏙️ Praying inside would blur the true source
🌍 The goal is proof, not just relief
📖 Even small details carry the message

## 🤔 I Know That Ye Will Not Yet Fear The LORD God

Moses says this to Pharaoh's face, before the storm has even stopped.

"Fear" here means genuine reverence, not simply being frightened by a storm.

Moses has watched this same pattern repeat enough times to predict what comes next.

Confession under pressure is not the same thing as a changed heart.

🤔 Moses predicts this before the storm ends
🙏 Fear means reverence, not just fright
🔁 The pattern has repeated enough to predict
📖 Confession under pressure is not change

# Exodus 9:31-35
# 🌾 Crops Destroyed, Pharaoh Hardens Again
---
## 🌾 The Flax And The Barley Was Smitten: For The Barley Was In The Ear, And The Flax Was Bolled

"In the ear" means the barley had already grown its grain heads, ready near harvest.

"Bolled" means the flax plant had already formed its seed pods.

Both crops were far enough along in growth to be destroyed completely by the hail.

This detail places the plague at a very specific point in Egypt's actual growing season.

🌾 In the ear means grain heads had formed
🌱 Bolled means the flax had formed pods
💥 Both crops were destroyed at this stage
📖 This detail matches Egypt's real growing season

## 🌱 But The Wheat And The Rie Were Not Smitten: For They Were Not Grown Up

Wheat and rye were planted later than barley and flax in Egypt's growing calendar.

Neither crop had grown tall enough yet to be exposed to the same damage.

This is not a random detail, it reflects real agricultural timing.

Even in judgment, the destruction follows what was actually true on the ground.

🌾 Wheat and rye were planted later
📏 Neither had grown tall enough to be hit
🗓️ This detail reflects real growing timing
📖 Judgment here follows real conditions, not guesswork

## 🙌 Moses Went Out Of The City From Pharaoh, And Spread Abroad His Hands Unto The LORD

Moses again keeps his word the exact moment he steps outside the city.

"Spread abroad his hands" describes an open, visible posture of prayer.

This is now a repeated pattern across multiple plagues in this part of Exodus.

Obedience here means doing exactly what was promised, without delay.

🚶 Moses acts the moment he leaves the city
🙌 Spread abroad hands means open, visible prayer
🔁 This pattern has repeated across plagues
📖 Obedience means keeping the promise exactly

## 🪨 He Sinned Yet More, And Hardened His Heart, He And His Servants

Relief arrives, and Pharaoh's heart reverses course yet again, exactly as Moses had already predicted.

This time the text names his servants alongside him, not Pharaoh alone.

The stubbornness Pharaoh models has spread to the men who serve under him.

A pattern this repeated no longer looks like weakness, it looks like a choice.

🪨 Pharaoh reverses course again after relief
👥 His servants are named alongside him now
🔁 The stubbornness has spread beyond Pharaoh
📖 A repeated pattern becomes a choice

## 📜 Neither Would He Let The Children Of Israel Go

This final line closes the chapter exactly where earlier chapters have closed before.

"As the LORD had spoken by Moses" means this outcome was told in advance, not a surprise twist.

Every hardened heart in this story has already been described before it happened.

Nothing about Pharaoh's stubbornness has caught God off guard, not even once.

🪨 The chapter ends in hardened refusal again
📜 This outcome was already spoken in advance
🔁 Every hardening has been predicted beforehand
📖 Pharaoh's stubbornness never catches God off guard`.trim();

export const EXODUS_NINE_PERSONAL_SECTIONS = parseExodusNineRawNotes(EXODUS_NINE_RAW_NOTES);
