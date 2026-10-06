export type HabakkukOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHabakkukOneRawNotes(rawText: string): HabakkukOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HabakkukOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Habakkuk\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Habakkuk 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Habakkuk\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Habakkuk\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Habakkuk 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Habakkuk 1:${startVerse}` : `Habakkuk 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Habakkuk 1 sections, received " + sections.length);
  }

  return sections;
}

const HABAKKUK_ONE_RAW_NOTES = `# Habakkuk 1:1-4
# 😩 The Burden Habakkuk Saw
---
## 📜 The Burden Which Habakkuk The Prophet Did See

"Burden" here does not mean a heavy weight to carry.

It means a message from God, usually one about coming judgment.

Habakkuk was a prophet, someone chosen to speak God's words to the people.

The Bible tells us almost nothing else about his life.

This opening line warns the reader that hard news is coming.

📜 Burden means a message of judgment
🗣️ Habakkuk was a prophet of God
❓ Little else is known about him
📖 The title warns hard news is coming

---

## 😢 How Long Shall I Cry, And Thou Wilt Not Hear

Habakkuk is not politely asking a question here.

He is crying out in real pain, and nothing seems to change.

"How long" is the ancient cry of someone who has prayed the same prayer for years.

God's silence hurts him as much as the violence he sees.

The book of Psalms is full of this same complaint.

😢 Habakkuk cries out in real pain
⏳ How long signals a long wait
🤐 God seems silent to his prayer
📖 This lament echoes many of the Psalms

---

## ⚔️ Cry Out Unto Thee Of Violence

"Violence" here does not mean a foreign army at the border.

Habakkuk is crying about violence happening inside his own nation of Judah.

Neighbors were hurting neighbors, and the courts were not stopping it.

The real threat was still coming from outside, but the harm inside Judah came first.

⚔️ Violence happens inside Judah itself
🏚️ Neighbors were hurting their own neighbors
⚖️ The courts failed to stop it
📖 Inner decay came before the outer threat

---

## ❓ Why Dost Thou Shew Me Iniquity

"Iniquity" means serious, moral wrongdoing, not just a small mistake.

Habakkuk is asking God directly why he keeps having to watch sin happen around him.

"Shew" is an old spelling of "show."

He feels trapped, forced to see evil every day with no power to stop it.

❓ Habakkuk questions why he sees sin
💔 Iniquity means serious moral wrongdoing
👁️ Shew is an old word for show
📖 This question opens the book's struggle

---

## 🏚️ Spoiling And Violence Are Before Me

"Spoiling" means plunder, people and property stolen by force.

Habakkuk says this ruin is right in front of him, impossible to ignore.

He is not describing a rumor from far away.

He is describing what he sees every single day in his own town.

🏚️ Spoiling means plunder and ruin
👀 Habakkuk sees it right in front of him
📍 This is local, not distant news
📖 Daily life in Judah had collapsed

---

## 😡 There Are That Raise Up Strife And Contention

"Strife" means ongoing conflict between people.

"Contention" means constant arguing and legal fighting.

Habakkuk says people were actively stirring up fights, not just living with bad luck.

This points to a society where relationships had broken down at every level.

😡 Strife means ongoing conflict
🗯️ Contention means constant arguing
🤝 Relationships were breaking down everywhere
📖 People were actively causing the chaos

---

## 📜 Therefore The Law Is Slacked

The "law" here refers to God's instructions for how to live justly.

"Slacked" means it had gone limp, no longer being enforced.

Judges and leaders were simply not applying it anymore.

A law nobody enforces might as well not exist.

📜 Law means God's instructions for justice
💤 Slacked means no longer enforced
⚖️ Judges stopped applying it
📖 An unenforced law protects no one

---

## 😈 The Wicked Doth Compass About The Righteous

"Compass about" means to surround or close in on something.

Habakkuk pictures the righteous being hemmed in on every side by wicked people.

This flips the normal expectation that good people are safe and evil people are punished.

Justice in Judah had been turned completely upside down.

🔄 Compass about means to surround
🧍 The righteous are hemmed in
⚖️ Justice had flipped upside down
📖 The expected order was broken

# Habakkuk 1:5-6
# 😮 Behold, For I Will Work A Work
---
## 👀 Behold Ye Among The Heathen

"Heathen" is an old word for the nations outside Israel.

"Behold" means stop and look closely, pay real attention.

God is telling Habakkuk to look outward, past his own nation's problems.

Something is about to happen on a much bigger stage than Judah alone.

👀 Behold means look closely now
🌍 Heathen means nations outside Israel
🔭 God points Habakkuk outward
📖 A bigger story is about to unfold

---

## 😲 Wonder Marvellously

God warns Habakkuk that what comes next will leave him stunned.

"Marvellously" means in a way that causes real amazement, not mild surprise.

This is not a gentle correction to Habakkuk's complaint.

It is a plan so large it will shake him.

😲 Marvellously means truly amazed
⚡ This is not a gentle answer
💥 The coming plan will shake Habakkuk
📖 God's answers are sometimes overwhelming

---

## 🤯 A Work In Your Days Which Ye Will Not Believe

This does not mean Habakkuk will simply be surprised by good news.

God is saying the plan is so extreme that watching it happen will not make it easier to accept.

"Though it be told you" means even a clear warning will not prepare them for it.

Some events are too big to grasp until they are actually lived through.

🤯 The plan is almost unbelievable
⚠️ A warning will not soften the shock
⏳ It happens within their own lifetime
📖 Some events must be lived to be understood

---

## 🏹 I Raise Up The Chaldeans

"Chaldeans" refers to the Babylonians, the rising world power centered in Mesopotamia.

God himself claims responsibility for bringing this army onto the stage.

This is a stunning claim, that God is the one raising up Judah's coming destroyer.

The Babylonians will go on to conquer Jerusalem itself within Habakkuk's lifetime.

🏹 Chaldeans means the Babylonians
🗺️ They rose to power in Mesopotamia
😮 God claims responsibility for raising them
📖 Babylon later conquers Jerusalem itself

---

## 😤 That Bitter And Hasty Nation

"Bitter" describes a people who are harsh and cruel in how they treat others.

"Hasty" means acting quickly and impulsively, without careful thought first.

Together the words paint a nation that attacks fast and shows no mercy.

This is the opposite of the patient justice Habakkuk had been asking for.

😤 Bitter means harsh and cruel
⚡ Hasty means quick and impulsive
🗡️ Babylon attacks fast without mercy
📖 This is the opposite of patient justice

---

## 🏘️ To Possess The Dwellingplaces That Are Not Theirs

"Dwellingplaces" simply means homes and settled land.

God says the Babylonians will take land that never belonged to them.

This is conquest for its own sake, not a rightful claim to territory.

History records the Babylonian empire doing exactly this across the ancient Near East.

🏘️ Dwellingplaces means homes and land
🗺️ Babylon takes land not their own
⚔️ This is conquest, not rightful claim
📖 History confirms Babylon's wide expansion

# Habakkuk 1:7-11
# 🦅 The Terror Of The Chaldean Army
---
## 😱 Terrible And Dreadful

"Terrible" and "dreadful" both describe something that causes deep fear.

Habakkuk is not using exaggerated language here.

Historical records describe Babylon's army in the same way.

Other nations often surrendered instead of fighting them.

😱 Terrible means causing deep fear
📜 This matches real historical records
🏳️ Nations often surrendered instead of fighting
📖 The fear described was completely real

---

## ⚖️ Their Judgment And Their Dignity Shall Proceed Of Themselves

This means Babylon answers to no higher law or ruler.

"Judgment" here means their decisions, and "dignity" means their authority.

They decide for themselves what is right and act on it immediately.

No council, no treaty, and no god outside themselves holds them back.

⚖️ Judgment means their own decisions
👑 Dignity means their own authority
🚫 No outside power restrains them
📖 Babylon answers only to itself

---

## 🐆 Their Horses Also Are Swifter Than The Leopards

Leopards were known in the ancient world for incredible speed over short distances.

Comparing Babylon's cavalry to leopards tells the reader there would be no outrunning them.

This is the first of several animal comparisons in these verses.

Each one adds to the picture of an unstoppable, predatory force.

🐆 Leopards were famous for raw speed
🐎 Babylon's cavalry outran everything
🏃 There was no outrunning them
📖 The first of several predator images

---

## 😤 More Fierce Than The Evening Wolves

Wolves hunting at evening are at their hungriest and most desperate.

That hunger makes them more aggressive and harder to stop.

Comparing Babylon's soldiers to evening wolves pictures soldiers driven by appetite, not duty.

This was conquest fueled by greed, not a controlled military campaign.

🐺 Evening wolves hunt at their hungriest
🍖 Hunger makes them more aggressive
💰 Babylon's soldiers were driven by greed
📖 This was not a controlled campaign

---

## 🦅 They Shall Fly As The Eagle That Hasteth To Eat

An eagle diving toward prey moves fast and does not hesitate.

"Hasteth" is an old word for hurries.

The image combines speed from the air with hunger from the ground.

Nothing about this invasion would be slow or cautious.

🦅 An eagle dives fast without hesitation
⏩ Hasteth means hurries
🌪️ Speed and hunger combine in this image
📖 Nothing about this invasion is slow

---

## 🌬️ Their Faces Shall Sup Up As The East Wind

The east wind in this region was a hot, dry wind blowing in from the desert.

It could wither crops and dry up water in a short time.

"Sup up" means to swallow or drink up completely.

Babylon's army is pictured consuming everything in its path the way that wind dries the land.

🌬️ East wind means a harsh desert wind
🏜️ It withers crops and dries water
🥤 Sup up means to swallow completely
📖 Babylon consumes everything in its path

---

## 🏖️ They Shall Gather The Captivity As The Sand

Sand on a shore cannot be counted.

There is simply too much of it.

Comparing captives to sand means the number of people taken would be enormous.

This is not a small raid but mass conquest.

Entire populations were being swept into exile.

🏖️ Sand pictures an uncountable number
👥 Captives would be taken in huge numbers
🌍 This is mass conquest, not a raid
📖 Whole populations faced exile

---

## 🏰 They Shall Deride Every Strong Hold

"Deride" means to mock or laugh at with contempt.

A "strong hold" was a fortified city wall meant to keep an army out.

Babylon's army did not fear these defenses at all.

What once felt unbreakable to Judah's neighbors would fall easily.

😏 Deride means to mock with contempt
🏰 Strong hold means a fortified city
🚫 Babylon feared no city's defenses
📖 Supposedly unbreakable walls would fall

---

## 🙏 Imputing This His Power Unto His God

Babylon did not credit their victories to skill or luck.

"Imputing" means crediting or attributing something to a source.

They believed their own false god had given them this power.

This sets up Habakkuk's deeper question about why God would let a rival god get the credit.

🙏 Imputing means crediting a source
🗿 Babylon credited a false god
😤 Their pride was deeply religious
➡️ This sets up Habakkuk's next question

# Habakkuk 1:12-13
# ❓ Why Does A Holy God Allow This
---
## ♾️ Art Thou Not From Everlasting, O LORD My God

Habakkuk begins his second complaint by reaffirming what he already knows about God.

"Everlasting" means God has always existed and never changes.

Even in deep confusion, Habakkuk does not abandon his faith.

He argues with God as someone who still trusts him, not someone walking away.

♾️ Everlasting means God never changes
🙏 Habakkuk still trusts God here
💬 This is argument, not abandonment
📖 Faith and hard questions can coexist

---

## ✝️ Mine Holy One

"Holy" means set apart, completely different from anything sinful or ordinary.

Calling God "mine Holy One" is personal, not just a title used in worship.

Habakkuk is reminding himself who he is actually talking to.

This makes his coming questions even bolder.

✝️ Holy means set apart from sin
🙋 Mine makes this deeply personal
💬 Habakkuk reminds himself who he addresses
📖 This makes his questions even bolder

---

## 🛡️ We Shall Not Die

Despite everything, Habakkuk declares his confidence that God's people will survive.

This is not naive optimism.

It is covenant trust.

God had promised long before this that Israel would not be destroyed completely.

Judgment was coming, but total destruction was not God's plan.

🛡️ Habakkuk trusts his people will survive
📜 This rests on God's old promises
⚖️ Judgment was coming, not total ruin
📖 Covenant trust anchors this complaint

---

## ⚖️ Thou Hast Ordained Them For Judgment

"Ordained" means appointed or set apart for a specific purpose.

Habakkuk admits that God himself chose Babylon as a tool of judgment.

This is the hardest part of his complaint, that God is behind all of it.

A pagan nation becomes God's instrument, and still stays fully responsible for its own evil.

⚖️ Ordained means appointed for a purpose
😮 God chose Babylon as his tool
🤔 This is the hardest part to accept
📖 A tool stays responsible for its evil

---

## 👁️ Thou Art Of Purer Eyes Than To Behold Evil

This describes God's complete moral purity.

God cannot casually look at evil the way people often do.

"Behold" here means to look at with approval or acceptance.

Habakkuk is building toward a real contradiction he cannot solve on his own.

👁️ Purer eyes means complete moral purity
🚫 God cannot casually accept evil
❓ This sets up a real contradiction
📖 Habakkuk cannot solve it himself

---

## 😠 The Wicked Devoureth The Man That Is More Righteous Than He

"The wicked" refers to Babylon, and "the man more righteous" refers to Judah.

This does not mean Judah was innocent, only less guilty than Babylon.

Habakkuk's complaint is that a very bad nation is destroying a less bad one.

From where he stands, that still looks like injustice, not justice.

😠 The wicked here means Babylon
🧍 The righteous man here means Judah
⚖️ Judah was less guilty, not innocent
📖 Habakkuk still calls this unjust

# Habakkuk 1:14-17
# 🎣 Men Caught Like Fish
---
## 🐟 Makest Men As The Fishes Of The Sea

Habakkuk pictures entire nations reduced to something as helpless as fish.

Fish have no say in who catches them.

This is how Babylon treats the people it conquers.

Human lives are being handled like a catch, not treated as people.

🐟 Fish have no say in their fate
🎣 Babylon treats nations the same way
💔 Human lives reduced to a catch
📖 This is the heart of Habakkuk's complaint

---

## 🪱 As The Creeping Things, That Have No Ruler Over Them

"Creeping things" means small crawling creatures with no one to protect them.

Normally a king or ruler would defend his own people.

Habakkuk pictures nations with nobody standing between them and Babylon.

They are left completely exposed.

🪱 Creeping things means small defenseless creatures
👑 No ruler means no real protector
🛡️ These nations stand completely exposed
📖 Nobody defends them from Babylon

---

## 🪝 They Take Up All Of Them With The Angle

"Angle" is an old word for a fishhook.

A fishhook catches one fish at a time, carefully and precisely.

This compares Babylon's conquest to patient, deliberate fishing, not random violence.

Every conquest was targeted and intentional.

🪝 Angle is an old word for fishhook
🎯 Fishing is careful and precise
🗺️ Babylon's conquests were just as deliberate
📖 This was targeted, not random violence

---

## 🕸️ They Catch Them In Their Net, And Gather Them In Their Drag

A "net" catches whatever swims into it.

A "drag" is a large net pulled along the sea floor to catch everything at once.

Together these pictures show Babylon capturing people on a massive scale.

Nothing escaped a drag net, and nothing escaped Babylon's conquest.

🕸️ Net means a tool that catches
🕳️ Drag means a net dragging everything
📊 Both describe capture on a massive scale
📖 Nothing escaped Babylon's conquest

---

## 😊 Therefore They Rejoice And Are Glad

Babylon does not just conquer, they celebrate the conquest itself.

There is no guilt in how they describe their own violence.

This is part of what makes Habakkuk's complaint so sharp.

A nation this proud of its cruelty seems to be getting away with it.

😊 Babylon celebrates its own conquests
😶 There is no guilt in their joy
💢 This sharpens Habakkuk's complaint
📖 Cruelty seems to go unpunished

---

## 🕯️ They Sacrifice Unto Their Net, And Burn Incense Unto Their Drag

Babylon worships the tools of its own conquest as if they were gods.

Sacrifice and incense were acts reserved for worship, not ordinary tool use.

Their military power had become their actual religion.

This is the clearest picture yet of a nation worshiping itself.

🕯️ Sacrifice and incense are acts of worship
⚔️ Babylon worships its own military power
🪞 Their power had become their religion
📖 This is a nation worshiping itself

---

## ❓ Shall They Therefore Empty Their Net, And Not Spare Continually To Slay The Nations

Habakkuk ends his second complaint with one final, pointed question.

Will Babylon's violence simply continue forever, unanswered and unchecked?

"Continually" means without stopping, again and again.

The chapter ends in tension, waiting for God's response in chapter two.

❓ Habakkuk asks if this will ever stop
🔁 Continually means without stopping
⏳ The question is left hanging
➡️ Chapter two will answer Habakkuk directly
`.trim();

export const HABAKKUK_ONE_PERSONAL_SECTIONS = parseHabakkukOneRawNotes(HABAKKUK_ONE_RAW_NOTES);
