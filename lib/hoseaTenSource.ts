export type HoseaTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaTenRawNotes(rawText: string): HoseaTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 10:${startVerse}` : `Hosea 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Hosea 10 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_TEN_RAW_NOTES = `# Hosea 10:1-4
# 🍇 A Vine That Fed Only Itself
---
## 🍇 Israel Is An Empty Vine

A vine exists for one reason, to produce fruit for someone else.

Israel is here called an empty vine, one that bears fruit only for itself.

The fruit of a good harvest should have turned hearts toward the LORD in thanks.

Instead Israel used that same prosperity to build more altars to other gods.

Blessing that is not shared with God curdles into something else entirely.

🍇 A vine exists to bear fruit
😔 Israel bore fruit for itself
🏛️ More harvest meant more altars
📖 Blessing turned into more idolatry

## 🗿 According To The Goodness Of His Land They Have Made Goodly Images

This is not a coincidence of timing in the text.

The more fertile the land became, the more statues of other gods appeared on it.

Goodly images means well made idols, carved with real skill and expense.

Prosperity did not lead Israel toward gratitude to the God who gave it.

It funded the very idols competing for credit instead.

The blessing became the budget for its own betrayal.

🌾 Good land brought more wealth
🗿 Goodly images means skillful idols
💰 Wealth funded more false worship
📖 The blessing financed its own betrayal

## 💔 Their Heart Is Divided

A divided heart does not mean simple indecision here.

It describes a loyalty split between the LORD and the calf idols of Bethel.

Israel kept temple language and sacrifices while trusting other gods underneath it.

That kind of split loyalty cannot hold once it is tested.

Now shall they be found faulty means the test is about to arrive.

A heart that serves two masters eventually answers to neither.

💔 A divided heart split their loyalty
🐂 Part of it trusted calf idols
⚖️ That split could not hold forever
📖 Serving two masters answers to neither

## 🔨 He Shall Break Down Their Altars, He Shall Spoil Their Images

God does not wait for an enemy army to start the punishment.

He promises to break down Israel's own altars with His own hand.

Spoil here means to ruin completely, not simply to damage.

The altars built from blessing would be torn down by the Giver who gave that blessing.

The hand that gave the harvest is the hand that ends the idols.

🔨 God breaks down their own altars
💥 Spoil means completely ruined
🔄 The Giver tears down what blessing built
📖 God ends what He once gave

## 👑 We Have No King, Because We Feared Not The LORD

This line admits something the nation rarely said out loud.

Israel's human kings existed instead of full trust in God as their true king.

Losing fear of the LORD was the root cause named here, not bad luck.

Once that fear was gone, no king could hold the nation together anyway.

What then should a king do to us is not confidence, it is despair.

A king can lead a nation that fears God, not replace Him.

👑 Kings stood in for trust in God
😨 Losing fear of God was the cause
🤷 A king could not fix that
📖 A king leads, never replaces God

## 🤝 Swearing Falsely In Making A Covenant

A covenant in this world was sealed with an oath, not just a signature.

Leaders swore loyalty to treaties and to the LORD using His own name.

Swearing falsely means breaking that oath while still claiming to keep it.

This was not one broken promise but a pattern running through the whole nation.

A nation built on false oaths cannot stand on anything solid.

🤝 Covenants were sealed with an oath
🤥 They swore but did not keep it
🔁 This broke promises again and again
📖 False oaths left nothing solid to stand on

## 🌿 Judgment Springeth Up As Hemlock In The Furrows Of The Field

Hemlock here means a poisonous, bitter weed, not a pleasant herb.

Furrows are the straight grooves a plow cuts to prepare ground for seed.

A good farmer expects grain to rise from those furrows, not poison.

This verse pictures justice growing up instead, bitter and unwanted.

What grows from a field always reveals what was planted in it.

🌿 Hemlock means a poisonous weed
🌾 Furrows should grow grain, not poison
⚖️ Judgment grew there instead
📖 What was planted decided what grew

# Hosea 10:5-8
# 🐂 Bethaven's Glory Carried Away
---
## 🏛️ The Inhabitants Of Samaria Shall Fear Because Of The Calves Of Bethaven

Bethaven means house of nothing, a mocking rename of Bethel, house of God.

Bethel had been a real place of worship back in the days of Jacob.

By Hosea's time it hosted golden calf idols instead of true worship.

Calling it Bethaven was a deliberate insult aimed at that corruption.

Fear here means dread, the kind that comes when a trusted god is about to fail.

The name itself already announced the coming disappointment.

🏛️ Bethaven means house of nothing
📍 Bethel once hosted true worship
🐂 It later housed golden calves
📖 Its new name predicted its failure

## 🙏 The Priests Thereof That Rejoiced On It For The Glory Thereof

It here refers to the golden calf idol just named at Bethaven.

The priests had built a whole livelihood around serving that idol.

Glory describes the honor and show the idol once seemed to carry.

That same glory is now described as departed, already gone.

Their joy in the idol is about to turn into mourning over its loss.

A glory that can depart was never glory worth keeping.

🙏 It refers to the golden calf
💼 Priests built a living around it
✨ Glory means its honor and show
📖 Joy was about to turn to grief

## 🎁 It Shall Be Also Carried Unto Assyria For A Present To King Jareb

A present to a foreign king here is not a gift of honor.

It means the idol itself, the calf that Samaria once trusted.

Carrying it to Assyria pictures Israel's own god hauled off as war loot.

King Jareb was likely a mocking title for the Assyrian king, not his real name.

A god that can be packed up and shipped away never had real power.

The idol could not even protect itself, let alone its worshippers.

🎁 A present here means war loot
🐂 It means the calf idol itself
👑 King Jareb likely mocks the Assyrian king
📖 A god shipped away has no power

## 🧠 Israel Shall Be Ashamed Of His Own Counsel

Counsel here means the political strategy Israel chose for itself.

Israel had trusted alliances and idols instead of trusting the LORD for safety.

That strategy is what Israel will end up ashamed of, not bad luck.

Shame in this verse is the direct result of a choice, not an accident.

Trusting the wrong counsel brings its own particular shame.

🧠 Counsel means their own strategy
🤝 They trusted alliances over God
😳 Shame followed their own choice
📖 Their own plan is what failed them

## 🌊 Her King Is Cut Off As The Foam Upon The Water

Foam on water looks substantial for a moment and then is simply gone.

Samaria's king is compared to that foam, not to something solid like a rock.

Cut off means removed suddenly, with no gradual fading.

A throne that looked powerful would vanish almost as quickly as it appeared.

What looks solid on the surface can still be nothing underneath.

🌊 Foam looks solid, then disappears
👑 The king is compared to foam
⚡ Cut off means a sudden end
📖 Looking solid did not mean being solid

## 🌵 The Thorn And The Thistle Shall Come Up On Their Altars

Thorn and thistle are the weeds that take over neglected ground.

These altars once stood busy with sacrifices and crowds of worshippers.

Weeds taking over pictures those same altars left abandoned and forgotten.

A ruined altar covered in thistles is a visible sign that the god worshipped there failed.

An abandoned altar preaches its own quiet sermon.

🌵 Thorn and thistle are weeds
🙏 Altars once held busy worship
🏚️ Weeds show those altars abandoned
📖 Nature reclaimed what false worship built

## ⛰️ To The Mountains, Cover Us, And To The Hills, Fall On Us

This is a cry for instant death rather than facing the coming judgment.

Being buried under a landslide was seen as faster and less painful than capture.

The people would rather disappear than stand exposed before this judgment.

This same desperate plea is echoed later in Luke and in Revelation.

A fear this deep shows how total the coming collapse would be.

When people beg mountains for mercy, no human rescue is left.

⛰️ They beg mountains to bury them
😱 Death looked better than judgment
📜 Luke and Revelation echo this plea
➡️ No human rescue was left

# Hosea 10:9-10
# 📍 Gibeah Catches Up With Them
---
## 📘 Thou Hast Sinned From The Days Of Gibeah

Gibeah names a specific horrifying event recorded back in the book of Judges.

A visiting woman was attacked there, and the whole nation was shaken by the crime.

Naming Gibeah again points to sin that goes back generations, not a recent slip.

Hosea already used this same place name just one chapter earlier.

Old sin that is never faced keeps shaping the present.

📘 Gibeah recalls a crime from Judges
🕰️ The sin goes back generations
🔁 Hosea named Gibeah just before this
📖 Unfaced sin keeps shaping the present

## ⚔️ The Battle In Gibeah Against The Children Of Iniquity Did Not Overtake Them

This does not mean Israel escaped punishment completely back then.

Judges 20 describes a civil war fought because of the crime at Gibeah.

Children of iniquity names the guilty tribe that started that war.

They were defeated in that war but the nation itself survived afterward.

A past escape does not cancel a debt still owed.

⚔️ Judges 20 tells that civil war
🧾 Children of iniquity names the guilty tribe
🏃 They survived that defeat
📖 Surviving once did not clear the debt

## ⚖️ It Is In My Desire That I Should Chastise Them

Chastise means to discipline with real pain, not a light correction.

God names this discipline as His own desire, not a reluctant last resort.

This is not God losing His temper after being pushed too far.

It is a deliberate decision made after watching the pattern already described.

Even hard discipline here comes from a decision, not a loss of control.

⚖️ Chastise means real discipline
🎯 God calls this His own desire
🧠 It is a deliberate decision
📖 The discipline has a purpose, not just anger

## ❓ When They Shall Bind Themselves In Their Two Furrows

This line is one of the hardest in Hosea to translate with certainty.

Many scholars believe it points to being bound for two specific sins together.

Those two sins are likely the calf worship and the political scheming against God.

The furrow image also sets up the farming picture that follows in the next verse.

Uncertainty about one phrase does not soften the warning around it.

❓ This line is genuinely hard to translate
🐂 It likely names two combined sins
🌾 Furrows set up the next farming image
📖 The warning stays clear either way

# Hosea 10:11-15
# 🌾 Plowed Wickedness, Reaped Ruin
---
## 🐂 Ephraim Is As An Heifer That Is Taught, And Loveth To Tread Out The Corn

Treading out corn means walking in circles over grain to separate it from the husk.

A heifer trained for this work genuinely enjoyed it, since it meant steady food and gentle handling.

This pictures Ephraim's comfortable, easy years before this point in the story.

Nothing about this image suggests hardship or forced labor yet.

Comfort like this was never meant to be the end of the story.

🐂 Treading corn separated grain from husk
😊 The heifer actually enjoyed this work
☀️ This pictures Ephraim's easy years
📖 That comfort was about to end

## 🐃 I Will Make Ephraim To Ride, Judah Shall Plow, And Jacob Shall Break His Clods

Passing over her fair neck pictures God placing a yoke where there had been none.

The easy threshing work from the line before is now replaced with a harder burden.

Judah and Jacob here stand for the southern and northern halves of the same family.

Plowing and breaking clods were harder, more exhausting farm labor than treading corn.

Discipline here reaches further than the one place that sinned the loudest.

🐃 A yoke replaced the easy work
🗺️ Judah and Jacob name the whole family
💪 Plowing was harder labor than treading
📖 This discipline reached beyond Ephraim alone

## 🌱 Sow To Yourselves In Righteousness, Reap In Mercy

This line reverses the whole farming metaphor used against Israel so far.

Sowing and reaping had pictured judgment up to this point in the chapter.

Here the same picture turns into an invitation instead of a warning.

Righteousness is what they are told to plant now, while there is still time.

Mercy is named as the harvest that kind of planting would bring.

Even inside a warning this harsh, an open door is still offered.

🌱 Farming language turns into invitation here
🌾 Righteousness is the seed to plant
🤲 Mercy is the harvest that follows
📖 An open door remained inside this warning

## 🌵 Break Up Your Fallow Ground, For It Is Time To Seek The LORD, Till He Come And Rain Righteousness Upon You

Fallow ground means land left unplowed and hardened, not actively farmed.

Breaking it up means doing the hard work of preparing a heart that has gone hard and unused.

Rain in this region decided whether an entire year's crop would succeed or fail.

Comparing God's righteousness to rain means it is something Israel needs and cannot create on its own.

Seeking the LORD now is pictured as the only way to get ready before that rain falls.

Readiness mattered more than timing, since the rain was never in Israel's control.

🌵 Fallow ground means hardened, unused land
💔 Breaking it up readies a hardened heart
🌧️ Rain decided if a whole crop survived
📖 Rain was never in their control

## 🌾 Ye Have Plowed Wickedness, Ye Have Reaped Iniquity

This verse answers the invitation just given with the nation's actual track record.

Instead of planting righteousness, Israel had been planting wickedness all along.

A harvest always matches whatever was actually planted, not what was hoped for.

Iniquity here is simply the predictable crop that wickedness always produces.

A field never lies about what was planted in it.

🌾 The invitation met the nation's real record
🥀 They had been planting wickedness instead
⚖️ Iniquity is wickedness's predictable harvest
📖 Cause and effect, not random punishment

## 🍎 Ye Have Eaten The Fruit Of Lies

Fruit of lies pictures deception as something that can actually be consumed and absorbed.

Israel did not just tell lies, it lived off of them like daily food.

False treaties, false gods, and false security all counted as this same fruit.

Eating something suggests it became part of the nation, not just something said out loud.

They had built a whole diet out of deception.

🍎 Fruit of lies means deception consumed
🥣 They lived off lies like food
🔄 False treaties and gods counted as this fruit
📖 What a nation feeds on shapes it

## 🗺️ Thou Didst Trust In Thy Way, In The Multitude Of Thy Mighty Men

Thy way here means Israel's own political and military strategy.

Multitude of mighty men means a large, well trained army, not a small guard.

Trusting that army meant leaning on human strength instead of leaning on God.

A large army felt safer than an unseen God, at least on paper.

The strength they counted on could not count for anything here.

🗺️ Thy way means their own strategy
⚔️ Mighty men means a large trained army
🛡️ They trusted strength over trusting God
📖 That strength was about to fail them

## 😱 Therefore Shall A Tumult Arise Among Thy People, And All Thy Fortresses Shall Be Spoiled

Tumult means sudden chaos and panic, not an organized protest.

Fortresses were the strong walled cities Israel trusted to withstand any attack.

Spoiled here means plundered and broken down, not simply damaged a little.

The very things built for safety are named as the things that would fail.

Trusted walls cannot outlast a trust that was already broken.

😱 Tumult means sudden chaos and panic
🏰 Fortresses were strong walled cities
💥 Spoiled means plundered, not just damaged
📖 What they trusted for safety failed first

## ⚔️ As Shalman Spoiled Betharbel In The Day Of Battle, The Mother Was Dashed In Pieces Upon Her Children

Shalman and Betharbel point to a real, remembered atrocity, not a vague threat.

Many scholars believe this names a specific brutal massacre already known to Hosea's readers.

This pictures mothers and children killed together in that same violence.

Naming a real historical horror made the coming threat impossible to dismiss as poetry.

Real history, not imagination, gave this warning its full weight.

⚔️ Shalman and Betharbel name a real massacre
💔 Mothers and children died together there
📜 Real history made the threat land harder
📖 This warning carried real historical weight

## 📍 So Shall Bethel Do Unto You Because Of Your Great Wickedness

Bethel here is the same corrupted worship site already named as Bethaven.

The chapter began with Bethaven's calf idols and now ends by naming Bethel directly.

This forms a frame around the whole chapter, starting and ending at the same guilty place.

Great wickedness names the cause plainly, not a mystery or an accident.

The place that replaced God becomes the place that seals the verdict.

📍 Bethel is the same site as Bethaven
🔄 This frames the whole chapter's warning
⚖️ Great wickedness names the plain cause
📖 Judgment traces back to this one place

## 🌅 In A Morning Shall The King Of Israel Utterly Be Cut Off

In a morning means suddenly, within a single day, not after a long decline.

Utterly cut off means a complete end, with no king left to replace him.

This closes out the sarcastic question asked back in verse three about what a king could do.

The answer, in the end, is that no king could do anything at all.

What took generations to build fell in less than a day.

🌅 In a morning means suddenly, within one day
👑 Utterly cut off means a complete end
❓ This answers the question from verse three
📖 Generations fell in less than a day
`.trim();

export const HOSEA_TEN_PERSONAL_SECTIONS = parseHoseaTenRawNotes(HOSEA_TEN_RAW_NOTES);
