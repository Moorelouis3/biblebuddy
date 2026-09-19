export type PsalmsOneHundredSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredSevenRawNotes(rawText: string): PsalmsOneHundredSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+107:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 107 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+107:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+107:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 107 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 107,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 107:${startVerse}` : `Psalms 107:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Psalms 107 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_SEVEN_RAW_NOTES = `# Psalms 107:1-3
# 🙌 The Redeemed Give Thanks
---
## 🙌 O Give Thanks Unto The LORD, For He Is Good

"O give thanks unto the LORD" also opens Psalm one hundred five.

This psalm adds "for he is good" right after that same opening line.

That second half matches the opening of Psalm one hundred six word for word.

Three psalms in a row begin by pointing straight at God's character.

🙌 Also opens Psalm one hundred five

🔁 The second half matches Psalm one hundred six

📚 Three psalms in a row open this way

📖 Each one starts by naming God's character

## 💞 His Mercy Endureth For Ever

"Mercy" here translates the Hebrew word for loyal, covenant love.

"For ever" means this love was never given a stopping point.

This exact phrase also appears in Psalm one hundred six, verse one.

The history the rest of this psalm tells will test that claim again.

💞 Mercy means loyal covenant love

⏳ For ever means no stopping point

🔁 Also appears in Psalm one hundred six

📖 The psalm will test this claim again

## 🗣️ Let The Redeemed Of The LORD Say So

"The redeemed" means people who were bought back out of real danger.

"Say so" is a command, not a suggestion.

Those who were rescued are told to say it out loud themselves.

Silence after a rescue this real would be strange.

🛟 Redeemed means bought back from danger

📢 Say so is a command

🗣️ The rescued must speak it themselves

➡️ Silence would not fit a rescue like this

## ✋ Whom He Hath Redeemed From The Hand Of The Enemy

"The hand of the enemy" is a common Old Testament picture for real, dangerous power.

"Redeemed" pictures a costly rescue, similar to buying someone out of slavery.

This was not a symbolic rescue or a change of feeling.

It was deliverance from an actual, threatening force.

✋ Hand of the enemy means real power

💰 Redeemed pictures a costly rescue

🚫 Not just symbolic or a feeling

📖 Deliverance from an actual threat

## 🧭 From The East, And From The West, From The North, And From The South

This line names all four directions on purpose.

It pictures people gathered back from every direction they had been scattered.

Many scholars believe this points to Israelites returning from exile among many nations.

Wherever they had been sent, God could gather them home again.

🧭 Names all four directions on purpose

🌍 Pictures people scattered everywhere

🏠 Many scholars connect this to the exile

📖 God gathers his people home again

# Psalms 107:4-9
# 🏜️ The Wanderers In The Wilderness
---
## 🥇 They Wandered In The Wilderness In A Solitary Way

This begins the first of four separate stories told in this psalm.

Each story pictures a different kind of trouble God rescued someone from.

This first group are travelers who lost their way in open desert.

"Solitary" means alone, with no other people or landmarks around them.

🥇 First of four separate rescue stories

🚶 This group are lost desert travelers

🏜️ Solitary means alone with no landmarks

➡️ Each story shows a different kind of trouble

## 🏙️ They Found No City To Dwell In

A city here means safety, water, food, and shelter all in one place.

Without one, a traveler in the ancient desert had almost nothing to rely on.

This was not a short detour or a minor inconvenience.

Survival itself was genuinely at stake.

🏙️ A city meant safety and supply

🚫 Without one they had almost nothing

⚠️ A real threat, not a small delay

📖 Survival itself was at stake

## 🍞 Hungry And Thirsty, Their Soul Fainted In Them

"Soul" here means their whole self, not just an inner feeling.

Fainted pictures a body running completely out of strength.

This is the low point of the wandering, right before help finally comes.

The psalm names the trouble honestly before it names the rescue.

🍞 Soul means their whole self

😵 Fainted means completely out of strength

📉 This is the story's low point

📖 Trouble gets named honestly first

## 📣 Then They Cried Unto The LORD In Their Trouble

This exact line repeats four separate times across this whole psalm.

Each time it marks the turning point inside one of the four stories.

Crying out here is not a quiet thought but a desperate call for help.

Every version of trouble in this psalm gets answered the same way.

🔁 This line repeats four times total

🔄 Each time marks a turning point

📣 Crying out means a desperate call

📖 Every trouble gets answered the same way

## 🧭 He Led Them Forth By The Right Way

"The right way" means the correct path, not a morally right choice.

God did not just end their wandering, he personally guided the next steps.

Rescue here includes real, practical direction, not only relief from danger.

The wandering ends with them walking toward an actual destination.

🧭 Right way means the correct path

🤝 God personally guided their next steps

🛤️ Rescue included real direction, not just relief

📖 They walked toward an actual destination

## 🙌 Oh That Men Would Praise The LORD For His Goodness

This exact line also repeats four times, once after each story.

It functions as the refrain that answers the cry for help refrain.

"Men" here means people in general, not warriors or leaders specifically.

The whole psalm alternates between someone's trouble and everyone's invitation to praise.

🔁 This refrain also repeats four times

🔄 It answers the cry for help refrain

🙋 Men here means people in general

📖 Trouble and praise alternate all through

## 😌 He Satisfieth The Longing Soul, And Filleth The Hungry Soul With Goodness

This verse directly answers the hunger and thirst named back in verse five.

"Longing soul" means a deep, aching desire, not a minor want.

"Filleth with goodness" pictures complete satisfaction, not just enough to survive.

The story that began with fainting ends with genuine fullness.

🔁 Answers the hunger named in verse five

😌 Longing soul means deep, aching desire

🍽️ Filleth with goodness means complete satisfaction

📖 Fainting turns into genuine fullness

# Psalms 107:10-16
# ⛓️ The Prisoners In Darkness And Iron
---
## 🥈 Such As Sit In Darkness And In The Shadow Of Death

This begins the second of the four rescue stories in this psalm.

This group are prisoners, not lost travelers like the first group.

"The shadow of death" pictures a darkness so deep it feels like slowly dying.

Their setting is a literal dungeon, not an open desert.

🥈 Second of the four rescue stories

⛓️ This group are prisoners, not travelers

🌑 Shadow of death pictures a slow dying darkness

📖 A literal dungeon, not open desert

## ⛓️ Being Bound In Affliction And Iron

"Iron" here means literal chains, not a figure of speech.

"Affliction" adds the ongoing suffering that came with being physically bound.

This paints a picture of real imprisonment, likely for actual crimes.

The next verse explains exactly what put them there.

⛓️ Iron means literal chains

😖 Affliction adds ongoing suffering

🔒 Pictures real, physical imprisonment

📖 The next verse explains why

## 🚫 Because They Rebelled Against The Words Of God

Unlike the wanderers in the first story, this group brought trouble on themselves.

"Rebelled" means an active, willful refusal, not an honest mistake.

"Contemned the counsel of the most High" means they openly despised God's advice.

This group's imprisonment is described as fully deserved.

🚫 This group caused their own trouble

😤 Rebelled means willful refusal

🙄 Contemned means openly despised

📖 Their imprisonment was fully deserved

## 💔 He Brought Down Their Heart With Labour

"Heart" here means their spirit and will, not just their emotions.

"Labour" points to hard, forced work placed on prisoners.

Their pride and strength were worn down over time.

"There was none to help" describes total, human hopelessness.

💔 Heart means their spirit and will

⛏️ Labour means hard, forced work

📉 Pride was worn down over time

📖 No human help was left

## 🔓 He Brought Them Out Of Darkness And The Shadow Of Death

This answers the darkness named back in verse ten directly.

"Brake their bands in sunder" means their chains were completely broken apart.

This was not a pardon on paper, it was a physical release.

The rescue matched the exact trouble that was named.

🔓 Answers the darkness from verse ten

⛓️ Bands in sunder means chains broken apart

🚪 A physical release, not just a pardon

📖 The rescue matched the exact trouble

## 🚪 He Hath Broken The Gates Of Brass, And Cut The Bars Of Iron In Sunder

Ancient prisons and city gates were sometimes reinforced with metal like this.

Breaking gates this strong pictures a rescue no ordinary person could pull off.

The same imagery later appears in Isaiah, describing God opening a way no one else could.

Nothing built to hold someone in was strong enough to hold against God.

🚪 Ancient gates were reinforced this way

💪 No ordinary person could break gates like these

📜 Similar imagery appears later in Isaiah

📖 Nothing could hold against God

# Psalms 107:17-22
# 🤢 The Fools At The Gates Of Death
---
## 🥉 Fools Because Of Their Transgression

This begins the third of the four rescue stories in this psalm.

"Fools" in scripture usually means someone who ignores God, not someone unintelligent.

This group's suffering came directly from their own foolish choices.

"Iniquities" means twisted, wrong actions, not simple mistakes.

🥉 Third of the four rescue stories

🙄 Fools means someone who ignores God

😖 Their suffering came from foolish choices

📖 Iniquities means twisted wrongdoing

## 🤢 Their Soul Abhorreth All Manner Of Meat

"Abhorreth" means a complete disgust, not simple lack of appetite.

Losing all desire for food was a well known sign of serious illness.

This detail makes the sickness feel real and physical, not vague.

The next line shows exactly how serious it had become.

🤢 Abhorreth means complete disgust

🍽️ Loss of appetite signaled serious illness

🩺 The sickness feels real and physical

📖 The next line shows how serious it was

## 💀 They Draw Near Unto The Gates Of Death

This is the same phrase family used for the prisoners in the second story.

Here it describes someone dying slowly from illness rather than sitting in a dungeon.

Two very different situations end up sounding the same at their worst point.

Both groups needed the same kind of rescue, whatever caused their trouble.

💀 Same phrase family as the second story

🤒 Here it means dying slowly from illness

🔀 Two different troubles sound the same at bottom

📖 Both needed the same kind of rescue

## 🗣️ He Sent His Word, And Healed Them

"His word" pictures God's command doing the actual healing work.

No medicine or ritual is mentioned here at all.

The New Testament later calls Jesus himself the Word made flesh.

Healing here comes directly from God speaking, not from any other cause.

🗣️ His word pictures a command that heals

🚫 No medicine or ritual is mentioned

📜 Later scripture calls Jesus the Word

📖 Healing came directly from God speaking

## 🙏 Let Them Sacrifice The Sacrifices Of Thanksgiving

This names a specific offering the law had already described in Leviticus seven.

It was a voluntary gift, never a payment required to earn healing.

"Declare his works with rejoicing" means telling others what God had done.

Gratitude here was meant to be spoken out loud, not kept private.

🙏 Names a specific offering from Leviticus

🎁 A voluntary gift, not payment for healing

🗣️ Declare means telling others what happened

📖 Gratitude was meant to be spoken aloud

# Psalms 107:23-27
# ⛵ Sailors Caught In The Storm
---
## 🎖️ They That Go Down To The Sea In Ships

This begins the fourth and final rescue story in this psalm.

Unlike the earlier groups, these are working sailors, not wanderers or prisoners.

"Go down to the sea" was the normal way to describe setting out on a voyage.

"Do business in great waters" means these were merchants earning a living at sea.

🎖️ Fourth and final rescue story

⛵ These are working sailors, not wanderers

🌊 Go down to the sea means setting sail

📖 They were merchants earning a living

## 👀 These See The Works Of The LORD, And His Wonders In The Deep

Sailors saw a side of God's power that land dwelling people rarely witnessed.

"The deep" means the open ocean, far from any coastline.

Their daily work put them face to face with real danger and real wonder.

A dangerous job became a front row seat to God's power.

👀 Sailors saw a rare side of God's power

🌊 The deep means the open ocean

⚠️ Their work meant real daily danger

📖 A dangerous job became a front row seat

## 🌬️ He Commandeth, And Raiseth The Stormy Wind

This storm is not described as random bad luck or ordinary weather.

God is named as the one directly commanding the wind to rise.

The same picture appears later when Jesus calms a storm with a word.

Nature answering a command is a theme repeated across scripture.

🌬️ The storm is not random bad luck

🗣️ God commands the wind directly

⛵ Jesus later calms a storm the same way

📖 Nature answering a command repeats in scripture

## 🎢 They Mount Up To The Heaven, They Go Down Again To The Depths

This describes massive waves lifting a ship high, then dropping it low.

The rise and fall happens again and again without any pause.

"Their soul is melted" pictures fear draining every bit of courage from them.

The poetry itself rocks back and forth like the waves being described.

🎢 Massive waves lift then drop the ship

🔁 The rise and fall repeats constantly

😨 Soul melted means fear drained their courage

📖 The poetry itself rocks like the waves

## 🥴 They Reel To And Fro, And Stagger Like A Drunken Man, And Are At Their Wit's End

"Reel to and fro" pictures a ship lurching wildly with no control.

"Stagger like a drunken man" compares the sailors to someone who has lost balance completely.

"Wit's end" is a phrase still used today, and it comes from this exact verse.

It means every plan and every skill has completely run out.

🥴 Means lurching with no control

🍷 Compared to someone who has lost balance

💬 Wit's end still used today comes from here

📖 It means every plan has run out

# Psalms 107:28-32
# 🌅 The Storm Made Calm
---
## 🏁 He Maketh The Storm A Calm

This is the fourth and final rescue inside this repeating pattern.

"Calm" here means completely still, not just calmer than before.

The same God who raised the storm now stops it completely.

The one who caused the danger is also the one who ends it.

🏁 Fourth and final rescue in the pattern

🤫 Calm means completely still, not just calmer

🔁 The same God raised and then stopped it

📖 The source of danger also ends it

## 😌 Then Are They Glad Because They Be Quiet

"Quiet" describes the sea, but it also pictures their own fear settling down.

Relief here is physical and emotional at the same time.

Nothing about their skill or effort changed the outcome.

Their gladness is a direct response to what God did, not what they did.

😌 Quiet describes the sea and their fear

🫀 Relief is physical and emotional together

🚫 Their own skill did not change anything

📖 Gladness answers what God did

## ⚓ So He Bringeth Them Unto Their Desired Haven

"Haven" means a safe harbor, the destination the sailors had been aiming for.

"Desired" shows this was the exact place they had hoped to reach all along.

The danger did not knock them off course from their real goal.

The story ends exactly where the sailors originally intended to arrive.

⚓ Haven means a safe harbor

🎯 Desired shows this was their goal all along

🧭 Danger did not knock them off course

📖 The story ends where they meant to arrive

## 🏛️ Let Them Exalt Him Also In The Congregation Of The People

"Congregation" means the larger public gathering of God's people.

"Assembly of the elders" names a smaller, more official group of leaders.

Praise here is asked for in both the biggest and smallest settings.

A private rescue is meant to become a public and formal testimony.

🏟️ Congregation means the larger public gathering

👴 Assembly of elders names official leaders

🔀 Praise is asked in both settings

📖 A private rescue becomes public testimony

# Psalms 107:33-38
# 🏞️ The LORD Reshapes The Land
---
## 🔀 He Turneth Rivers Into A Wilderness

The four rescue stories are finished, and the psalm now shifts to a new kind of teaching.

This section steps back to show God's control over the land itself.

"Watersprings" means natural springs that fed the rivers with fresh water.

Turning a river into desert pictures complete, total reversal.

🔀 The psalm shifts to a new teaching

🌍 Shows God's control over the land itself

💧 Watersprings means natural, feeding springs

📖 Pictures complete, total reversal

## 🏜️ A Fruitful Land Into Barrenness, For The Wickedness Of Them That Dwell Therein

This line gives the actual reason behind the reversal just described.

"Barrenness" means land that can no longer grow food or support life.

The land itself is pictured as responding to the sin of the people living on it.

This connects to warnings found earlier in Leviticus about the land being affected by sin.

📝 Gives the reason for the reversal

🏜️ Barrenness means land that cannot grow food

🌍 The land responds to the people's sin

📖 Connects to warnings back in Leviticus

## 💧 He Turneth The Wilderness Into A Standing Water

This verse flips the same picture from before in the opposite direction.

Now dry, empty ground becomes a source of life giving water.

The same God who can bring judgment can also bring restoration.

Nothing about the land itself is permanent without God's involvement.

🔄 Flips the earlier picture in reverse

💧 Dry ground becomes a water source

⚖️ The same God brings judgment and restoration

📖 Nothing about the land is permanent alone

## 🏘️ That They May Prepare A City For Habitation

This answers the earlier wanderers from the very first story in this psalm.

They once found no city to dwell in at all.

Now God is described actively preparing the very thing they once lacked.

The psalm quietly connects its ending back to its beginning.

🔁 Answers the wanderers from story one

🏙️ They once had no city at all

🏗️ God now prepares that missing thing

📖 The ending connects back to the start

## 🍇 Sow The Fields, And Plant Vineyards

Sowing fields and planting vineyards both take years to produce anything useful.

Choosing to do this shows genuine confidence that the danger will not return.

This is not survival for one season but a plan to settle permanently.

Real trust looks like planting something you will not harvest for years.

🌾 Both take years to produce anything

🍇 Shows confidence the danger will not return

🏡 A plan to settle permanently, not just survive

📖 Trust looks like planting for the future

## 📈 He Blesseth Them Also, So That They Are Multiplied Greatly

"Multiplied greatly" points to real growth in both people and livestock.

"Suffereth not their cattle to decrease" adds a very practical, everyday blessing.

This is not abstract spiritual language but a description of a growing, thriving community.

God's care here reaches all the way down to how many animals a family owned.

📈 Multiplied greatly means real growth

🐄 Cattle not decreasing is a practical blessing

🏘️ Describes a growing, thriving community

📖 God's care reaches everyday details

# Psalms 107:39-41
# ⚖️ Princes Brought Low, The Poor Lifted High
---
## 📉 Again, They Are Minished And Brought Low Through Oppression

"Minished" means reduced or made smaller, an old word rarely used today.

"Again" signals that blessing and hardship keep cycling back and forth.

This same up and down pattern already filled Psalm one hundred six.

Blessing in this psalm was never described as a one time fix.

📉 Minished means reduced or made smaller

🔁 Again signals a repeating cycle

📚 The same pattern filled Psalm one hundred six

📖 Blessing was never a one time fix

## 👑 He Poureth Contempt Upon Princes

"Contempt" means being treated with open scorn instead of honor.

Princes here represent people with real power and high status.

"Causeth them to wander in the wilderness" strips them of the very land they once ruled.

No amount of human rank protects someone from God's judgment.

👑 Contempt means being treated with scorn

🏛️ Princes represent people with real power

🏜️ They lose the land they once ruled

📖 Rank does not protect from judgment

## ⬆️ Yet Setteth He The Poor On High From Affliction

"Yet" marks a sharp turn from the princes brought low in the line just before.

The poor and the powerful trade places in a single verse.

"Setteth on high" means lifted into a position of safety and honor.

God is shown reversing status in both directions at once.

🔀 Yet marks a sharp reversal

⚖️ The poor and powerful trade places

⬆️ Setteth on high means lifted to honor

📖 Status is reversed in both directions

## 🐑 Maketh Him Families Like A Flock

A flock pictures a large group multiplying safely under careful watch.

This turns an image usually used for sheep into a picture of human families.

Growth here comes with the same kind of protection a shepherd gives.

The poor go from having nothing to being pictured as thriving and secure.

🐑 A flock pictures safe, multiplying growth

🔀 Applies a sheep image to human families

🧑‍🌾 Growth comes with a shepherd's protection

📖 They go from nothing to thriving

# Psalms 107:42-43
# 📖 The Wise Understand
---
## 👀 The Righteous Shall See It, And Rejoice

"It" points back to everything this psalm has just described.

Watching God reverse trouble again and again gives the righteous real reason to rejoice.

This joy comes from watching a pattern proven true, not from a single lucky moment.

The whole psalm builds toward this one reaction.

👀 It points back to everything described

🔁 Watching the pattern proven true brings joy

🙌 Joy comes from a pattern, not luck

📖 The whole psalm builds to this reaction

## 🤐 All Iniquity Shall Stop Her Mouth

"Iniquity" is treated almost like a person here, given a mouth to shut.

This pictures wrongdoing running out of excuses in the face of clear evidence.

After four stories of rescue, there is nothing left to argue against.

The evidence itself silences any remaining objection.

🤐 Iniquity is pictured almost like a person

🚫 Wrongdoing runs out of excuses here

📚 Four stories leave nothing left to argue

📖 The evidence itself silences objection

## 🧠 Whoso Is Wise, And Will Observe These Things

This closing line turns the whole psalm into a test for the reader.

"Observe" means paying careful attention, not simply reading the words once.

"Lovingkindness" matches the same loyal love named back in verse one.

The psalm ends by asking the reader to actually learn from what they just read.

🧠 Turns the psalm into a test for readers

👀 Observe means paying careful attention

💞 Lovingkindness matches the love named in verse one

📖 The psalm asks readers to actually learn
`.trim();

export const PSALMS_ONE_HUNDRED_SEVEN_PERSONAL_SECTIONS = parsePsalmsOneHundredSevenRawNotes(PSALMS_ONE_HUNDRED_SEVEN_RAW_NOTES);
