export type IsaiahThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirtyThreeRawNotes(rawText: string): IsaiahThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 33:${startVerse}` : `Isaiah 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Isaiah 33 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTY_THREE_RAW_NOTES = `# Isaiah 33:1-4
# ⚔️ Woe To The Spoiler And A Prayer For Grace
---
## ⚔️ Woe To Thee That Spoilest, And Thou Wast Not Spoiled

"Woe" opens a specific announcement of coming judgment.

Many scholars believe this verse targets Assyria, the empire crushing every nation around it.

"Spoilest" means to raid and plunder by force.

Assyria had plundered nation after nation without ever once being plundered itself.

That one sided pattern is about to end.

⚔️ Woe announces a specific judgment
👑 Many scholars see Assyria here
🏴 Spoilest means to raid and plunder
📖 Assyria's one sided pattern is ending

## 🔄 When Thou Shalt Cease To Spoil, Thou Shalt Be Spoiled

This verse names a principle, not just a threat to one nation.

Treachery eventually comes back on the one who practices it.

The spoiler will finally be spoiled in return.

Betrayal gets repaid with betrayal.

This same pattern repeats often across the Old Testament.

🔄 This verse names a real principle
⚖️ Treachery comes back on its source
🎯 The spoiler will finally be spoiled
📖 This pattern repeats often in scripture

## 🙏 O LORD, Be Gracious Unto Us, We Have Waited For Thee

"Gracious" means showing favor that was never earned.

The tone shifts here from judgment against the spoiler to prayer from God's people.

"We have waited for thee" pictures patient hope, not passive giving up.

Judah is asking for mercy while trouble is still on its way.

Prayer becomes the answer before the danger even fully arrives.

🙏 Gracious means unearned favor
🔄 The tone shifts to prayer here
⏳ Waited pictures patient, active hope
📖 Prayer comes before the danger arrives

## 💪 Be Thou Their Arm Every Morning, Our Salvation Also In The Time Of Trouble

In the Old Testament, an "arm" is a common picture for strength in battle.

Asking God to be an arm means asking him to fight for his people.

"Every morning" pictures a need renewed fresh each day, not solved once and forgotten.

Salvation here is not only spiritual, it is real rescue from real danger.

💪 Arm pictures God's battle strength
🌅 Every morning means daily renewed need
🛡️ God is asked to fight for them
📖 Salvation here means real, physical rescue

## 🌊 At The Noise Of The Tumult The People Fled

"Tumult" means the roar and chaos of battle or an approaching army.

The peoples on the move here are likely the very armies threatening Judah.

Just the sound of what is coming is enough to send them running.

Isaiah pictures God's coming action as loud enough to scatter armies before he even acts.

🌊 Tumult means the roar of battle
🏃 Even armies flee at the sound
👂 The noise alone causes the panic
📖 God's power scatters enemies in advance

## 🦁 At The Lifting Up Of Thyself The Nations Were Scattered

This line repeats the same idea as the line before it in different words.

That repeating pattern is called parallelism, common throughout Hebrew poetry.

"Lifting up" pictures God rising to act, the way a lion rises before it charges.

When God stands up in judgment, entire nations scatter in fear.

🔁 This repeats the idea before it
📜 That pattern is called parallelism
🦁 Lifting up pictures God rising to act
📖 Nations scatter when God stands up

## 🦗 Your Spoil Shall Be Gathered Like The Gathering Of The Caterpiller

"Caterpiller" is the King James spelling of an old word for a swarming, crop eating locust.

It does not mean the slow crawling insect a modern reader pictures.

Locust swarms strip a field bare and gather every last scrap of food.

The spoiler's own loot is about to be gathered up the very same way.

The one who plundered others is about to be plundered clean.

🦗 Caterpiller here means a swarming locust
🌾 Locusts stripped a field completely bare
🔄 The spoiler's loot gets gathered too
📖 The plunderer is about to be plundered

## 🏃 As The Running To And Fro Of Locusts Shall He Run Upon Them

Locust swarms move fast, covering every inch of a field within minutes.

"Running to and fro" pictures that frantic, thorough motion.

This time the picture is aimed at the plunderers themselves, not their victims.

Whoever gathers up their remaining goods will move with that same locust speed.

🏃 Locusts moved fast across a field
🔄 This picture now targets the plunderers
⚡ Their goods get taken just as fast
📖 The spoiler becomes the spoiled one

# Isaiah 33:5-9
# 🌾 The LORD Is Exalted, The Land Mourns
---
## 👑 The LORD Is Exalted, For He Dwelleth On High

"Exalted" means lifted up above everyone and everything else.

Isaiah has spent many chapters describing proud kings who eventually fell.

God's high place is not threatened the way theirs were.

This is a statement about who actually holds ultimate authority.

👑 Exalted means lifted above all else
📉 Many earthly kings in Isaiah fell
🏔️ God's high place cannot be threatened
📖 This names who holds real authority

## 🏙️ He Hath Filled Zion With Judgment And Righteousness

"Zion" is another name for Jerusalem, the city where God chose to dwell among his people.

"Judgment" here means fair ruling, and "righteousness" means right standing before God.

Chapter 32 already promised a king who would rule by that same pairing.

That promised rule is now pictured as already filling the city.

🏙️ Zion is another name for Jerusalem
⚖️ Judgment means fair, careful ruling
✅ Righteousness means right standing before God
📖 Chapter 32's promised rule fills Zion here

## 📚 Wisdom And Knowledge Shall Be The Stability Of Thy Times

"Stability" means what actually holds a nation steady through hard times.

Judah's leaders often looked for that stability in military alliances instead.

This verse names wisdom and knowledge as the true foundation, not political deals.

Real security was never going to come from foreign armies.

📚 Stability means what holds a nation steady
🤝 Judah often trusted alliances instead
🧠 Wisdom and knowledge are the true foundation
📖 Real security never came from armies

## 💰 The Fear Of The LORD Is His Treasure

"Fear of the LORD" means reverent awe and obedience, not being scared of God.

Calling it a "treasure" ranks it above gold, silver, or any earthly wealth.

This verse ties back to the wisdom and knowledge named just before it.

Reverence for God is the real wealth this promised king will hold.

💰 Fear of the LORD means reverent awe
🚫 It is not the same as terror
💎 This treasure outranks gold or silver
📖 Reverence for God is real wealth

## 😢 Their Valiant Ones Shall Cry Without, The Ambassadors Of Peace Shall Weep Bitterly

"Valiant ones" means brave, trained warriors, not ordinary citizens.

Even they are pictured crying out in the open streets.

"Ambassadors of peace" were diplomats sent out to negotiate a treaty or truce.

Earlier chapters already warned Judah against trusting exactly this kind of foreign diplomacy.

Here those very peace talks are shown breaking down completely.

😢 Valiant ones means brave, trained warriors
📢 Even warriors cry out in the streets
🤝 Ambassadors of peace were treaty negotiators
📖 Those peace talks are breaking down

## 🛣️ The Highways Lie Waste, The Wayfaring Man Ceaseth

A "wayfaring man" is simply a traveler on foot, someone going from town to town.

Busy highways were a sign of normal trade and daily life.

War and invasion emptied those same roads completely.

No one dared travel while danger like this was spreading.

🛣️ Wayfaring man means an ordinary traveler
🚶 Busy roads once meant normal daily life
⚠️ War emptied those same roads completely
📖 No one dared travel through the danger

## 📜 He Hath Broken The Covenant, He Hath Despised The Cities

Many scholars believe "he" here points to the invading king, not Judah's own ruler.

"Covenant" means a formal treaty or agreement made between nations.

History records an Assyrian king breaking exactly this kind of peace agreement with Judah.

Despising the cities means treating conquered towns with open contempt.

📜 Covenant means a formal treaty
👑 This likely points to the invading king
📚 History records an Assyrian treaty broken
📖 Conquered cities were treated with contempt

## 🌲 Lebanon Is Ashamed And Hewn Down

Lebanon was famous throughout the ancient world for its massive cedar forests.

"Hewn down" means chopped down, tree after tree.

Even Lebanon's proud, iconic trees end up destroyed in this picture.

If devastation reaches Lebanon's forests, no region is pictured as safely out of reach.

🌲 Lebanon was famous for its cedar forests
🪓 Hewn down means cut down completely
😔 Even famous cedars get destroyed here
📖 No region is shown safely out of reach

## 🌾 Sharon Is Like A Wilderness, And Bashan And Carmel Shake Off Their Fruits

Sharon was a fertile coastal plain known for rich farmland.

Bashan was wide grazing country east of the Jordan, known for strong cattle.

Carmel was a fruitful, wooded mountain region near the coast.

All three of Judah's most fertile regions are pictured collapsing at once.

🌾 Sharon was known for rich farmland
🐂 Bashan was known for strong cattle
🏔️ Carmel was a fruitful mountain region
📖 All three fertile regions collapse together

# Isaiah 33:10-14
# 🔥 Now Will I Rise, Who Can Dwell With The Fire
---
## 🔥 Now Will I Rise, Saith The LORD, Now Will I Be Exalted, Now Will I Lift Up Myself

The speaker suddenly shifts from Isaiah's own words to God speaking directly, in the first person.

This three part statement repeats one idea three times for emphasis.

God had let the crisis build through many earlier chapters without visibly stepping in.

That silence is about to end.

🔥 The speaker shifts to God himself
🔁 One idea repeats three times here
⏳ God had let the crisis build first
📖 God's silence is about to end

## 🌾 Ye Shall Conceive Chaff, Ye Shall Bring Forth Stubble

"Conceive" and "bring forth" borrow the language of pregnancy and birth.

Here they describe the wicked planning and finally producing their schemes.

"Chaff" is the worthless husk separated from grain during threshing.

"Stubble" is the dry, leftover stalks left standing after a harvest.

Both pictures describe something with no real substance at all.

🌾 Conceive and bring forth picture birth
🌬️ Chaff is the worthless husk from grain
🟤 Stubble is dry stalks left after harvest
📖 Their schemes produce nothing of substance

## 🔥 Your Breath, As Fire, Shall Devour You

"Your breath" is a picture for a person's words, boasts, or plans.

Chaff and stubble both catch fire instantly, they cannot survive flame.

The very words and schemes these people relied on become the fire that destroys them.

Their own plans turn into the thing that consumes them.

🔥 Breath pictures a person's words or plans
🌬️ Chaff and stubble catch fire instantly
💥 Their own plans become their downfall
📖 Their words end up consuming them

## ⚪ The People Shall Be As The Burnings Of Lime

Making lime in the ancient world meant burning limestone inside a kiln.

The heat was so intense the stone crumbled completely into white powder.

This verse pictures that same total, reducing destruction happening to people.

Nothing solid or recognizable is left standing afterward.

⚪ Lime was made by burning limestone
🔥 Intense heat crumbled stone into powder
💨 This pictures total, reducing destruction
📖 Nothing solid is left standing after

## 🌵 As Thorns Cut Up Shall They Be Burned In The Fire

Isaiah already used thorns and briers as a picture of judgment back in chapter 5.

A neglected vineyard there grew thorns instead of good grapes.

Cut thorns were useless for anything except burning as fuel.

This same worthless, burnable picture returns here to describe the coming judgment.

🌵 Isaiah used this picture in chapter 5
🍇 A neglected vineyard grew thorns there
🔥 Cut thorns were only good for burning
📖 The same picture returns for judgment

## 🌍 Hear, Ye That Are Far Off, What I Have Done, And, Ye That Are Near, Acknowledge My Might

God suddenly addresses two very different audiences in the same breath.

"Ye that are far off" likely means distant, watching nations.

"Ye that are near" likely means Judah itself, close to the events.

Both groups are called to recognize the very same display of power.

🌍 Two very different audiences are addressed
👀 Far off likely means watching nations
🏠 Near likely means Judah itself
📖 Both groups witness the same power

## 😨 The Sinners In Zion Are Afraid, Fearfulness Hath Surprised The Hypocrites

"Hypocrites" here means people who looked faithful on the outside but were not.

Living inside God's holy city had made them feel falsely secure.

Fear reaches even people who assumed their location kept them safe.

Belonging to the right city was never the same as belonging to God.

😨 Hypocrites looked faithful but were not
🏙️ Living in Zion felt falsely secure
⚡ Fear surprised even the falsely secure
📖 Belonging to God matters more than location

## 🔥 Who Among Us Shall Dwell With The Devouring Fire? Who Among Us Shall Dwell With Everlasting Burnings?

Fire is a common Bible picture for God's own holiness.

This holiness is not gentle, it is described as devouring and everlasting.

The question is genuine, who could possibly survive standing that close to it.

This question sets up the answer given in the very next verses.

🔥 Fire pictures God's own holiness
⚡ This holiness devours, it is not gentle
❓ The question asks who can survive it
📖 The next verses answer this question

# Isaiah 33:15-19
# 👁️ He That Walketh Righteously Shall Dwell On High
---
## 🚶 He That Walketh Righteously, And Speaketh Uprightly

This verse answers the question asked at the end of the last section.

"Walketh" and "speaketh" describe ongoing daily habits, not one good decision.

Righteous conduct here means consistent honesty in both action and speech.

This is the kind of person who can actually dwell with God's holy fire.

🚶 This answers the previous section's question
🔁 Walketh and speaketh describe daily habits
✅ Honesty in action and speech both matter
📖 This person can dwell near God's fire

## 🙅 He That Despiseth The Gain Of Oppressions

"Despiseth" means to actively refuse and reject, not just dislike.

"Gain of oppressions" means profit made by exploiting people who are weaker.

The same verse lists several ways this refusal shows up in real life.

Refusing bribes, refusing violence, and refusing to watch evil all count as this same kind of despising.

This is a whole pattern of integrity, not one isolated decision.

🙅 Despiseth means to actively refuse
💰 Gain of oppressions means exploiting the weak
🔁 The verse lists several real examples
📖 This is a whole pattern of integrity

## 🤲 That Shaketh His Hands From Holding Of Bribes

"Shaketh his hands" pictures someone physically refusing a bribe being offered to him.

Ancient court cases were often decided at the city gate by local judges.

A judge who accepted bribes could legally ruin an innocent person's life.

This righteous person refuses that kind of corruption on sight.

🤲 Shaketh his hands pictures refusing a bribe
🏛️ Court cases were decided at the city gate
⚖️ Bribed judges could ruin innocent lives
📖 This person refuses corruption on sight

## 👂 That Stoppeth His Ears From Hearing Of Blood

"Hearing of blood" means listening to plans for violence or murder.

Stopping his ears pictures a deliberate refusal to be part of that plotting.

Simply staying silent about a violent plan can still make someone complicit.

This person refuses even to listen when violence is being planned.

👂 Hearing of blood means plans of violence
🙉 Stopping ears means refusing to listen
⚠️ Silence about violence can still be complicit
📖 This person refuses to even listen

## 👁️ And Shutteth His Eyes From Seeing Evil

This is the third refusal in a row describing the same righteous person.

Shutting his eyes means deliberately avoiding evil rather than just happening to miss it.

Hands, ears, and eyes together cover action, speech, and sight.

Integrity here reaches every part of how a person interacts with the world.

👁️ This is the third refusal listed here
🙈 Shutting eyes means avoiding evil on purpose
🖐️ Hands, ears, and eyes are all covered
📖 Integrity reaches every part of a person

## 🏔️ He Shall Dwell On High, His Place Of Defence Shall Be The Munitions Of Rocks

"Munitions" in this old sense means a fortress or stronghold, not weapons or ammunition.

A modern reader can easily misread this word completely.

"Rocks" pictures a natural, unshakable fortress, echoing the great rock from chapter 32.

This person's safety comes from where he stands, not from what he owns.

🏔️ Munitions here means a fortress, not weapons
❗ Modern readers often misread this word
🪨 Rocks echoes the great rock from chapter 32
📖 His safety comes from where he stands

## 🍞 Bread Shall Be Given Him, His Waters Shall Be Sure

This promise is refreshingly simple after such a heavy passage.

"Given" pictures provision handed over, not earned through struggle.

"Sure" means guaranteed and reliable, never in doubt.

Basic daily needs are promised without any scarcity attached.

🍞 This promise is simple and direct
🤲 Given pictures provision handed over freely
✅ Sure means guaranteed and reliable
📖 Daily needs come without any scarcity

## 👑 Thine Eyes Shall See The King In His Beauty

This promise connects directly back to the righteous king pictured in chapter 32.

The reader is not just told about this king, they are promised they will see him.

"Beauty" here points to his glory and honor, not simply his appearance.

This is a personal, direct promise, not a distant hope.

👑 This connects to the king in chapter 32
👀 The reader is promised to see him
✨ Beauty points to glory and honor
📖 This promise is personal, not distant

## 🗺️ They Shall Behold The Land That Is Very Far Off

This pictures a wide, open view all the way to the horizon.

No army or danger is pictured crowding that view anymore.

Being able to see that far pictures complete safety, nothing left to fear nearby.

Peace this size changes even how far a person can comfortably look.

🗺️ This pictures a view to the horizon
🚫 No danger crowds that view anymore
👀 Seeing far pictures complete safety
📖 Peace changes how far someone can look

## 📜 Where Is The Scribe? Where Is The Receiver? Where Is He That Counted The Towers?

A "scribe" recorded official business, including the terms of war or tribute.

A "receiver" collected the heavy payments a conquered people were forced to hand over.

Someone whose job was counting the towers was assessing a city's defenses before an attack.

All three of these grim wartime jobs are now pictured as simply gone.

Peace is so complete these officials are barely even remembered.

📜 Scribe recorded terms of war or tribute
💰 Receiver collected forced war payments
🏰 Counting towers meant assessing defenses to attack
📖 Peace made these grim jobs disappear

## 🗣️ Thou Shalt Not See A Fierce People, A People Of A Deeper Speech Than Thou Canst Perceive

This pictures the frightening experience of being ruled by conquerors who speak an unfamiliar language.

Assyrian officials once spoke to Jerusalem's own officials in a foreign tongue during a siege.

"Stammering tongue" describes speech that sounds broken and confusing to a foreign ear.

This verse promises that terrifying experience will not happen again.

🗣️ This pictures rule by foreign conquerors
📯 Assyria once did exactly this to Jerusalem
🌀 Stammering tongue means unintelligible foreign speech
📖 This terrifying experience will not happen again

# Isaiah 33:20-24
# 🏕️ Zion The Secure Tabernacle
---
## 🏕️ Look Upon Zion, The City Of Our Solemnities

"Solemnities" means the appointed religious feasts and festivals of Israel's calendar.

Zion, another name for Jerusalem, was the fixed place where those feasts were held.

The invitation to "look upon" Zion means to see it in this new, restored state.

This city was always meant to be a gathering place for worship, not just a fortress.

🏕️ Solemnities means Israel's appointed feasts
🏙️ Zion is another name for Jerusalem
👀 Look upon means to see it restored
📖 Zion was built for worship, not war

## ⛺ Thine Eyes Shall See Jerusalem A Quiet Habitation, A Tabernacle That Shall Not Be Taken Down

A "tabernacle" is a tent, something that could normally be packed up and moved at any time.

Comparing Jerusalem to a tabernacle that will never be taken down is a striking reversal.

"Quiet habitation" means a home finally free from constant threat.

This is permanence pictured using the language of something usually temporary.

⛺ Tabernacle means a tent, usually temporary
🔄 This tent will never be taken down
🏠 Quiet habitation means freedom from threat
📖 Permanence is pictured through a temporary image

## 🪢 Not One Of The Stakes Thereof Shall Ever Be Removed, Neither Shall Any Of The Cords Thereof Be Broken

"Stakes" and "cords" are the pegs and ropes that hold a tent firmly to the ground.

This verse continues the tent picture from the line right before it.

Even the smallest structural details are promised complete, lasting security.

Nothing about this dwelling will come loose, not even the smallest part.

🪢 Stakes and cords held a tent down
🔁 This continues the previous tent picture
🔒 Even small details are promised security
📖 Nothing about this home comes loose

## 🌊 There The Glorious LORD Will Be Unto Us A Place Of Broad Rivers And Streams

Jerusalem, unlike Babylon or Nineveh, never actually sat beside a major river.

Great ancient cities usually depended on a river for defense, trade, and water.

This verse promises that God himself will be the river Jerusalem never had.

The picture is not a literal river, it is God supplying what the city naturally lacked.

🌊 Jerusalem never had a major river
🏛️ Great cities usually depended on rivers
✨ God promises to be that river himself
📖 God supplies what the city lacked

## ⛴️ Wherein Shall Go No Galley With Oars, Neither Shall Gallant Ship Pass Thereby

A real river could also be used by enemy warships to launch an attack.

"Galley with oars" and "gallant ship" both describe vessels built for war, not trade.

This river protects the city without ever becoming a way in for an enemy.

Its safety comes with no hidden weakness attached.

⛴️ Galley and gallant ship mean warships
🛡️ Real rivers could let enemies attack
🚫 This river offers no such weakness
📖 Safety here comes with no hidden risk

## ⚖️ For The LORD Is Our Judge, The LORD Is Our Lawgiver, The LORD Is Our King, He Will Save Us

This verse names three separate governing roles and gives all three to God alone.

A "judge" settles disputes, a "lawgiver" sets the rules, a "king" rules the nation.

Ancient Israel usually split these roles among different human leaders.

Here, one person holds every role, and that same person promises to save them.

⚖️ Judge, lawgiver, and king are three roles
👑 Israel usually split these among leaders
☝️ God alone holds every role here
📖 The same God promises to save them

## 🪢 Thy Tacklings Are Loosed, They Could Not Well Strengthen Their Mast, They Could Not Spread The Sail

"Tacklings" means the ropes and rigging that hold a ship's mast and sails together.

A ship with loosed tacklings cannot sail anywhere at all.

This pictures the enemy's entire war effort falling completely apart.

What once looked like an unstoppable force cannot even function anymore.

🪢 Tacklings means a ship's ropes and rigging
⛵ A ship like this cannot sail at all
💥 This pictures an enemy falling apart
📖 The unstoppable force cannot even function

## 🎁 Then Is The Prey Of A Great Spoil Divided, The Lame Take The Prey

This reverses the very first verse of this chapter completely.

Back then, the spoiler was taking plunder from everyone else.

Now the plunder is shared so abundantly that even the disabled gather some.

No fighting is required to receive a share of this reversal.

🎁 This reverses the chapter's opening verse
🔄 The spoiler once took, now shares
🦯 Even the lame gather a share
📖 No fighting is needed for this reversal

## 🩹 The Inhabitant Shall Not Say, I Am Sick

This pictures a community completely free of illness and weakness.

Sickness in the ancient world often had no real remedy available.

This promise removes that fear entirely from daily life.

Physical wholeness matches the emotional and political peace described throughout this chapter.

🩹 This pictures a community free of illness
⚠️ Ancient sickness often had no remedy
😌 This promise removes that fear entirely
📖 Physical wholeness matches the peace described

## 🙏 The People That Dwell Therein Shall Be Forgiven Their Iniquity

"Iniquity" means deep moral guilt, the real root problem behind everything in this chapter.

Every promise of safety, provision, and peace in this chapter rests on this one final line.

Forgiveness is not an afterthought here, it is the foundation underneath everything else.

The chapter that opened with a warning to a spoiler closes with mercy for God's own people.

🙏 Iniquity means deep moral guilt
🏗️ This line is the chapter's real foundation
✅ Forgiveness makes every other promise possible
📖 The chapter moves from warning to mercy
`.trim();

export const ISAIAH_THIRTY_THREE_PERSONAL_SECTIONS = parseIsaiahThirtyThreeRawNotes(ISAIAH_THIRTY_THREE_RAW_NOTES);
