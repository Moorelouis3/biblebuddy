export type JobTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwentyFourRawNotes(rawText: string): JobTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 24:${startVerse}` : `Job 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Job 24 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWENTY_FOUR_RAW_NOTES = `# Job 24:1-4
# 😤 Job Asks Why God Delays Justice
---
## ⏳ Times Are Not Hidden From The Almighty

Job opens with a claim about what God knows.

"Times" here means the specific moments when justice is due.

God already knows exactly when every wrong took place.

Job is not questioning what God knows.

He is questioning why God waits to act on it.

⏳ Times means the moments justice is due
🧠 God already knows every wrong done
❓ Job questions why God delays action
📖 This opens Job's complaint about injustice

## 📅 They That Know Him Not See His Days

"His days" means the days God sets aside for judgment.

People who already know God still do not see those days arrive.

Job says even faithful believers cannot predict God's timing.

That uncertainty is what troubles Job through this whole chapter.

📅 His days means God's judgment days
👀 Even the faithful cannot see them
⏳ Job cannot predict God's timing
➡️ This uncertainty drives the whole chapter

## 🪨 Some Remove The Landmarks

"Landmarks" means the stone markers that separated one family's land from another's.

Moving one let a thief steal land without anyone noticing right away.

The Law forbid this directly back in Deuteronomy.

Moving a boundary stone stole a family's future, not just dirt.

🪨 Landmarks means the boundary stone markers
🕵️ Moving one let a thief steal land
📜 Deuteronomy's Law forbid this directly
📖 It stole a family's future, not dirt

## 🐑 They Violently Take Away Flocks, And Feed Thereof

This is not secret theft like the landmark verse before it.

Here the wicked take flocks by open force, in plain sight.

They even feed the stolen animals as if they owned them.

Nobody stops them, because they hold the power to do it openly.

🐑 This theft happens by open force
👀 It happens in plain sight
🍽️ They feed stolen animals as their own
➡️ Power lets them act without being stopped

## 🐴 They Drive Away The Ass Of The Fatherless

An "ass" here means a donkey, the main work animal for a poor family.

Fatherless children often depended on one donkey to farm or carry goods.

Taking it left them with no way to earn a living.

This was not random cruelty, it targeted people who could not fight back.

🐴 Ass means a donkey, a work animal
👶 Fatherless children relied on it to survive
🎯 Wicked target those who cannot fight back
➡️ Losing it meant losing the ability to work

## 🐂 They Take The Widow's Ox For A Pledge

A "pledge" means collateral, something held until a debt is repaid.

Taking a widow's ox for a pledge left her unable to farm at all.

The Law required lenders to leave the poor enough to survive.

This ignored that protection completely.

🐂 Pledge means collateral held for a debt
👩 The widow lost her only ox
🌾 She could no longer farm without it
📖 Her protection under the Law was ignored

## 🚶 They Turn The Needy Out Of The Way

This does not mean a small inconvenience.

It means the poor were pushed off the road entirely, denied a fair path.

In this culture, the public road was where legal matters got settled.

Being turned out of it meant losing a voice in the community.

🚶 The needy were pushed off the road
⚖️ Roads were where legal matters were settled
🤐 This silenced their voice in the community
➡️ Losing the road meant losing more than travel

## 🙈 The Poor Of The Earth Hide Themselves Together

Fear pushed the poor into hiding, not privacy.

They gathered together because there was safety in numbers.

Hiding together shows this was not one person's story, but a whole group.

Job describes a society where being poor made a person a target.

🙈 Fear pushed the poor into hiding
🤝 They hid together for safety in numbers
🌍 This was a whole group, not one
📖 Being poor made a person a target

# Job 24:5-8
# 🌵 The Poor Forced To Scavenge
---
## 🐴 As Wild Asses In The Desert

Job compares the poor here to wild donkeys, not tame ones.

Wild asses had to hunt for every meal themselves, with no owner to feed them.

"Rising betimes" means getting up very early, before dawn.

The poor rise that early just to have any chance of finding food.

🐴 Wild asses had to hunt for food
🌅 Betimes means very early, before dawn
🏜️ The desert gave them nothing easily
📖 The poor rise early just to survive

## 🌾 The Wilderness Yieldeth Food For Them And For Their Children

This line sounds hopeful on the surface, but it is not.

It means the wilderness, not their own land, is now their only food source.

Verse two already explained why, their land and flocks were stolen.

Even their children now depend on whatever scraps the wasteland provides.

🌾 The wilderness became their only food source
🏚️ Their own land had already been taken
👶 Their children depended on the same scraps
➡️ Theft in verse two explains this poverty

## 🌾 They Reap Every One His Corn In The Field

"Corn" in the King James Bible means grain in general, not modern corn.

This line pictures the poor working someone else's grain field for wages.

They are not stealing, they are laboring for barely enough to live on.

Their hunger from the verse before and this labor happen at the same time.

🌾 Corn means grain, not modern corn
👨‍🌾 The poor work fields that are not theirs
💰 They labor for barely enough to live
📖 Hunger and hard labor happen together here

## 🍇 They Gather The Vintage Of The Wicked

"Vintage" means the grape harvest, gathered to make wine.

Here the poor are hired to harvest grapes for a wicked landowner.

They do the hardest work of the harvest but keep none of the profit.

This sets up the same complaint that repeats through the whole chapter.

🍇 Vintage means the grape harvest
👐 The poor do the hardest harvest work
💸 The wicked landowner keeps the profit
➡️ This unfairness repeats through the chapter

## 👕 They Cause The Naked To Lodge Without Clothing

"Naked" here does not always mean fully unclothed.

It often meant stripped down to a thin under layer, with no outer cloak.

The outer cloak was also used as a blanket at night.

Without it, the poor had nothing to keep them warm at night.

👕 Naked here often meant no outer cloak
🌙 The cloak doubled as a nighttime blanket
🥶 Losing it left them cold at night
📖 The wicked caused this, not chance

## ❄️ That They Have No Covering In The Cold

This line explains exactly why losing the cloak mattered so much.

Exodus even commanded lenders to return a pledged cloak by nightfall.

The wicked in this chapter ignored that command completely.

Job is naming a real, specific law being broken, not just cruelty in general.

❄️ Covering meant protection from the cold
📜 Exodus required cloaks returned by nightfall
🚫 The wicked ignored that command
📖 Job names a specific broken law

## 🌧️ They Are Wet With The Showers Of The Mountains

With no home and no proper cloak, the poor were left fully exposed.

Mountain showers in this region could come on suddenly and cold.

There was no shelter to run to when the rain came.

This line paints a picture of complete physical exposure.

🌧️ Mountain showers came suddenly and cold
🏠 They had no home to run to
🥶 Exposure to weather was constant
📖 This shows their complete physical exposure

## 🪨 And Embrace The Rock For Want Of A Shelter

"Embrace" here does not mean affection.

It means clinging tightly to a rock for whatever small protection it offered.

A bare rock was the closest thing they had to a roof.

This single image sums up how little the poor had left.

🪨 Embrace here means clinging tightly
🏔️ A rock became their only shelter
🚫 They had no real roof at all
➡️ One image captures their whole condition

# Job 24:9-12
# 😢 God's Silence Toward The Oppressed
---
## 👶 They Pluck The Fatherless From The Breast

This describes creditors seizing a nursing baby from a poor mother as payment for debt.

In this culture a debt could be paid off using a person, not just money or goods.

Taking an infant this way was seen as an extreme, almost unthinkable cruelty.

Job lists it to show exactly how far this oppression had gone.

👶 A nursing baby is seized for debt
💰 People, not just goods, could pay debts
😨 This was seen as extreme cruelty
📖 Job shows how far oppression had gone

## 🤝 Take A Pledge Of The Poor

A "pledge" is collateral, something held until a debt gets paid back.

The Law limited what a lender could take from someone poor.

Taking a pledge from people who already had nothing broke that protection.

This repeats the same injustice named earlier about the widow's ox.

🤝 Pledge means collateral held for a debt
📜 The Law limited what could be taken
🚫 Taking from the poor broke that Law
➡️ This repeats the widow's ox injustice

## 🔁 They Cause Him To Go Naked Without Clothing

This repeats the same stripping described a few verses earlier.

Job is not describing a single event, he is describing a constant pattern.

Naming it twice shows how common this cruelty had become.

Nothing about it had improved by this point in the chapter.

🔁 This repeats the stripping from earlier
📈 It shows a constant pattern, not one event
😔 The cruelty had become common
📖 Nothing had improved through the chapter

## 🌾 They Take Away The Sheaf From The Hungry

A "sheaf" means a bundle of harvested grain, tied together for carrying.

The hungry worker had just cut this grain with his own hands.

It was taken from him before he could eat any of it.

He labors for food and still goes home with nothing.

🌾 A sheaf means a bundle of grain
✋ He cut it with his own hands
🚫 It was taken before he could eat
➡️ He labors yet still goes home empty

## 🫒 Which Make Oil Within Their Walls

This describes the poor pressing olives into oil on someone else's property.

"Their walls" refers to the property of the wicked landowners, not the workers.

The workers produce a valuable good they will never get to keep.

Even their labor happens inside a system built to profit someone else.

🫒 They press olives for oil
🏠 The walls belong to wicked landowners
💰 Workers never keep what they produce
📖 Their labor profits someone else entirely

## 🍷 Tread Their Winepresses, And Suffer Thirst

Treading a winepress meant crushing grapes barefoot inside a stone trough.

This was hot, exhausting work, done for someone else's wine.

The bitter twist is that the workers themselves stay thirsty the whole time.

They make wine for others and still get nothing to drink.

🍷 Treading crushed grapes barefoot for wine
🥵 The work was hot and exhausting
💧 The workers stayed thirsty the whole time
➡️ They made wine yet drank nothing

## 😩 Men Groan From Out Of The City

This is not one quiet complaint, it is many voices groaning together.

The suffering described in this chapter was public and widely heard.

"The city" suggests this was not hidden from anyone paying attention.

Whole communities carried this pain, not just isolated individuals.

😩 Many voices groaned together, not one
🏙️ This suffering was public, not hidden
👂 The whole city could hear it
📖 Communities carried this pain together

## ⚖️ Yet God Layeth Not Folly To Them

"Folly" here means blame or wrongdoing, not foolishness.

This line is the heart of Job's complaint in this whole chapter.

Job sees real suffering and real injustice here.

Yet there is no visible judgment from God.

⚖️ Folly here means blame or wrongdoing
😢 Job sees real suffering unanswered
❓ He questions God's silence, not existence
➡️ This is the heart of his complaint

# Job 24:13-17
# 🌑 Evildoers Who Work In Darkness
---
## 🌑 Of Those That Rebel Against The Light

Job now shifts to a new group of wicked people.

"Light" here means moral honesty and open, visible living.

These people deliberately choose to live and act in secrecy instead.

Rebelling against light means choosing darkness on purpose, not by accident.

🌑 Light here means honest, open living
🙅 They reject that kind of life on purpose
🕶️ They choose secrecy and darkness instead
📖 This starts a new group in the chapter

## 🌅 The Murderer Rising With The Light

"Rising with the light" here likely means the earliest, dimmest hour before sunrise.

A murderer moves in that low light to strike before anyone is fully awake.

He targets the poor and needy specifically, people least able to defend themselves.

The timing itself was part of his cruelty.

🌅 Rising with the light means predawn hours
🗡️ He strikes before people are fully awake
🎯 He targets the poor and needy
📖 The timing itself was calculated cruelty

## 🌙 In The Night Is As A Thief

The same man who kills at dawn becomes a thief once night falls.

This shows one person cycling between two different crimes.

Both crimes depend on catching people unguarded.

Darkness and low light are simply tools he uses on purpose.

🌙 The same man turns to theft at night
🔄 One person commits two different crimes
😴 Both crimes rely on catching people unguarded
➡️ Darkness is a tool he uses deliberately

## 🌆 The Eye Also Of The Adulterer Waiteth For The Twilight

"Twilight" here means the fading light right after sunset.

The adulterer waits for that exact window, dark enough to hide him but not full night.

He is not acting on impulse, he is planning around the light itself.

His timing shows this sin was calculated, not accidental.

🌆 Twilight means the fading light after sunset
🕰️ He waits for that exact window
🧠 His timing shows careful planning
📖 This sin was calculated, not accidental

## 🎭 Disguiseth His Face

In this culture, covering the face was a common way to travel unseen.

The adulterer disguises himself specifically so no one can identify him later.

He already knows what he is doing is wrong.

Hiding his face proves he cannot face his own action in the open.

🎭 Disguising the face meant traveling unseen
🙈 He hides so no one can identify him
😔 He already knows this action is wrong
➡️ He cannot face his own sin openly

## 🧱 In The Dark They Dig Through Houses

Ancient houses were often built from mud brick, not solid stone.

That made digging straight through a wall easier than breaking a door.

Thieves used this method specifically because it was quiet and quick.

The house itself became the easiest way in.

🧱 Houses were often built from mud brick
🕳️ Digging through a wall was easy and quiet
🚪 It avoided the risk of a locked door
📖 The building itself became the entry point

## 👀 Which They Had Marked For Themselves In The Daytime

This line reveals the crime was planned well before nightfall.

Thieves scouted houses during the day, acting harmless the whole time.

By night they already knew exactly which wall to break.

Their daytime disguise made their nighttime crime possible.

👀 They scouted houses during the day
🎭 Daytime disguise hid their real plan
🌙 By night they knew exactly where to strike
➡️ Careful planning made the crime possible

## 🌅 The Morning Is To Them Even As The Shadow Of Death

For most people, morning brings safety and a fresh start.

For these wicked men, morning brings the opposite feeling entirely.

Daylight threatens to expose everything they worked to hide overnight.

What comforts everyone else terrifies the people living this way.

🌅 Morning normally brings safety for most people
😱 For these men it brings terror instead
👁️ Daylight threatens to expose their secrets
📖 Their sin flips morning into a threat

# Job 24:18-21
# ⚰️ The Wicked Meet Their End
---
## 🌊 He Is Swift As The Waters

This pictures how quickly the wicked man's life or gain disappears.

Flowing water moves fast and never stays in one place.

Whatever he seemed to gain slips away just as fast.

His prosperity was never as solid as it looked.

🌊 Water moves fast and never stays put
💨 His gains disappear just as fast
🎭 His prosperity was never solid
📖 What looked lasting was actually fleeting

## 🍇 He Beholdeth Not The Way Of The Vineyards

Vineyards represented steady, long term prosperity in this culture.

Tending one took years of patient work to enjoy any harvest.

This wicked man never gets to walk that path himself.

He loses access to the slow, lasting reward others get to enjoy.

🍇 Vineyards meant long term, steady prosperity
⏳ They took years of patient work
🚫 He never gets to walk that path
➡️ Lasting reward passes him by completely

## ❄️ Drought And Heat Consume The Snow Waters

Melted snow from the mountains once fed streams in the dry season.

Drought and heat can dry up even that water completely.

Job uses this as a picture, not a random detail.

Just as heat erases snow melt, the grave quietly erases the wicked.

❄️ Snow melt once fed streams nearby
☀️ Drought and heat can dry it up
⚰️ The grave does the same to the wicked
📖 One picture explains how sin disappears from view

## 🪱 The Worm Shall Feed Sweetly On Him

This is blunt, physical language about decay after death.

"Sweetly" is a harsh, ironic word choice here, not a gentle one.

It shows nature moving on from this man without hesitation.

Even his own mother's womb is said to forget him.

🪱 This describes decay after death bluntly
😬 Sweetly is used ironically here
🌍 Nature moves on without hesitation
📖 Even his own mother forgets him

## 🌳 Wickedness Shall Be Broken As A Tree

This compares a wicked life to a tree that gets snapped, not gently trimmed.

A broken tree does not slowly wither, it stops growing all at once.

The image is sudden, not a slow fade.

Job pictures a clean, final end to this man's power.

🌳 A tree here means his whole life
💥 Broken means snapped, not slowly trimmed
⚡ The end comes suddenly, not slowly
➡️ His power reaches a final, clean stop

## 👩 He Evil Entreateth The Barren That Beareth Not

A woman without children had little social protection in this culture.

"Evil entreateth" means he mistreats her on purpose, not by accident.

He targets her specifically because she has no children to defend her.

This names one more vulnerable group harmed earlier in the chapter.

👩 Childless women had little social protection
🎯 He targets her because she is vulnerable
😔 This mistreatment is deliberate, not accidental
📖 It repeats the chapter's pattern of cruelty

## 🙅 Doeth Not Good To The Widow

This is not active cruelty, it is a refusal to help at all.

He had opportunities to show kindness to a widow and chose not to.

Withholding help was its own kind of wrong in this culture.

Doing nothing was still counted against him.

🙅 This describes a refusal to help
👀 He had chances to show kindness
🚫 He chose not to act
➡️ Doing nothing still counted as wrong

# Job 24:22-25
# 🌾 Cut Down Like Ripened Grain
---
## 👑 He Draweth Also The Mighty With His Power

Many scholars read this as a shift back to describing God directly.

"He" here draws away even the powerful, not just the poor and vulnerable.

No amount of strength or status protects someone from God's power.

This widens the chapter's scope from ordinary victims to the mighty themselves.

👑 This shift describes God's own power
💪 Even the mighty are not protected
⚖️ Strength and status offer no shield
📖 The chapter's scope widens here

## ❓ No Man Is Sure Of Life

This line states the point as plainly as possible.

When God acts, nobody's life is guaranteed, regardless of power or wealth.

This includes the very people who seemed untouchable earlier in the chapter.

Job uses this to balance out all the injustice described before it.

❓ No one's life is guaranteed
👑 This includes people who seemed untouchable
⚖️ It balances the injustice described earlier
➡️ Even the powerful answer to God eventually

## 😌 Yet His Eyes Are Upon Their Ways

The wicked may feel safe enough to rest.

That feeling of safety does not mean they are actually unwatched.

"His eyes" refers to God, still tracking every step they take.

Comfort and being watched are not the same thing.

😌 The wicked may feel safe enough to rest
👁️ God still watches every step they take
🚫 Feeling safe does not mean unwatched
📖 Comfort and being watched are not the same

## 📈 They Are Exalted For A Little While

"Exalted" means lifted up in power, wealth, or status.

This rise is real, but Job is careful to call it brief.

Whatever height the wicked reach, it does not last.

Their fall is already built into the word little.

📈 Exalted means lifted up in status
⏳ Job calls this rise brief on purpose
📉 Their height does not last
➡️ A fall is already built into it

## 🌾 Cut Off As The Tops Of The Ears Of Corn

This pictures a harvester slicing the ripe heads off grain stalks.

It happens fast, one clean motion, not a slow decline.

The wicked person's end comes the same way, sudden and complete.

This final image answers the chapter's opening question about delayed justice.

🌾 This pictures grain heads sliced off fast
⚡ It happens in one clean motion
⚰️ The wicked man's end is just as sudden
📖 This answers the chapter's opening question

## 🗣️ Who Will Make Me A Liar

Job ends this speech with a direct, confident challenge.

He is daring his friends to actually disprove what he just said.

His claim is simple, the wicked are not always punished right away.

Nobody in the story steps forward to answer him.

🗣️ Job ends with a direct challenge
🙋 He dares his friends to disprove him
⚖️ His claim, the wicked escape swift justice
📖 No one steps forward to answer him
`.trim();

export const JOB_TWENTY_FOUR_PERSONAL_SECTIONS = parseJobTwentyFourRawNotes(JOB_TWENTY_FOUR_RAW_NOTES);
