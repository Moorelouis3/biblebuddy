export type JoshuaFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaFiveRawNotes(rawText: string): JoshuaFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 5:${startVerse}` : `Joshua 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Joshua 5 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_FIVE_RAW_NOTES = `# Joshua 5:1
# 😨 Every King's Heart Melts
---
## 🏔️ Kings Of The Amorites, And All The Kings Of The Canaanites

The Amorites lived mainly in the hill country west of the Jordan.

The Canaanites lived along the coast, by the sea.

Together these two names cover every king in the land.

News of Israel crossing the Jordan reached every one of them at once.

No king in Canaan could pretend this was not happening.

🏔️ Amorites lived in the hill country

🌊 Canaanites lived along the coast

👑 Together they cover every king in the land

📖 Every king in Canaan heard the news

## 💔 Their Heart Melted, Neither Was There Spirit In Them Any More

Heart melted is an old idiom for total terror.

It does not describe a physical heart problem.

It means their courage completely failed them.

Spirit here means fighting will, the will to stand and fight.

Losing both at once left these kings paralyzed with fear.

💔 Heart melted means total terror

😨 Their courage completely failed

🛡️ Spirit means the will to fight

📖 Both failed the kings at once

## 🗣️ Until We Were Passed Over

The writer suddenly switches from they to we.

This same shift happens again later in the book.

It suggests someone who lived through the crossing wrote this down.

The history is not distant reporting.

It is a personal account instead.

🗣️ The writer shifts from they to we

🔁 This shift happens again later in Joshua

✍️ It suggests an eyewitness wrote this

📖 The record reads as personal, not distant

# Joshua 5:2-3
# 🔪 Circumcise Again
---
## ⏸️ At That Time

This command comes right after the whole nation just crossed the Jordan.

Jericho sits close by, already scouted and waiting to be attacked.

A military campaign would normally push forward at full speed here.

Instead God stops everything for a different kind of obedience first.

🌊 This follows right after crossing the Jordan

🏰 Jericho waited close by, ready for battle

⏸️ God paused the campaign completely

📖 Obedience came before the next battle

## 🗡️ Sharp Knives

These were knives made of flint stone, not metal.

Flint was already an outdated material by this point in history.

Many scholars believe stone was kept for sacred rites even after metal became common.

Using the old method here connects this act to Abraham's original covenant sign.

🗡️ Knives were made of flint, not metal

📜 Flint was already an outdated material

🙏 Stone was likely kept for sacred rites

📖 It echoes Abraham's original covenant sign

## 🔁 Circumcise Again The Second Time

Circumcision was the sign of God's covenant with Abraham, first given in Genesis seventeen.

Every male in Abraham's household was required to carry this mark.

Again does not mean each person was cut twice.

It means the nation as a whole was resuming a practice that had stopped.

The next verses explain exactly why it had stopped.

🤝 Circumcision marked Abraham's covenant with God

👪 Every male in his household carried it

🔁 Again means the nation resumes the practice

📖 The reason it stopped comes next

## ⛰️ The Hill Of The Foreskins

This hill gets its name from the very act performed there.

Foreskins were the physical evidence that the covenant sign had been carried out.

Naming a place after an event like this was common practice in the Bible.

Gilgal itself gets an explanation for its own name just a few verses later.

⛰️ The hill is named for what happened there

🔪 Foreskins were physical proof of the rite

📜 Naming places this way was common

📖 Gilgal gets its own name story soon

# Joshua 5:4-7
# 📜 Why This Generation Had Never Been Circumcised
---
## ⏸️ The Cause Why Joshua Did Circumcise

The story stops here to explain something the reader would otherwise wonder about.

Why would an entire generation need circumcising all at once.

The next few verses answer that question directly.

This kind of pause is rare in Joshua, which usually moves quickly.

⏸️ The narrative pauses to explain a gap

❓ Why would a whole generation need this

📜 The next verses answer directly

📖 Joshua rarely slows down like this

## ⚔️ All The Men Of War, Died In The Wilderness

Every man old enough to fight when Israel left Egypt was now dead.

None of them lived to see the promised land.

This was the judgment God announced back in Numbers.

Israel had refused to enter Canaan the first time.

That whole generation of soldiers exists only in the story now.

⚔️ Every fighting man from Egypt was dead

🚫 None lived to see the promised land

📜 Numbers already announced this judgment

📖 A whole generation was lost to unbelief

## 👶 Them They Had Not Circumcised

A whole new generation had grown up during the forty years of wandering.

Every one of them was born after Israel left Egypt.

Not a single one of them had ever been circumcised.

The sign of the covenant had quietly stopped for an entire generation.

👶 A new generation grew up in the wilderness

🚫 None of them were ever circumcised

🤝 The covenant sign had quietly stopped

📖 A whole generation grew up without it

## 📅 Forty Years In The Wilderness

Forty years matches the sentence God gave after the spies' report.

Numbers thirteen and fourteen tell that story in full.

One year of wandering matched each of the forty days the spies scouted the land.

The wilderness years were not wasted time.

They were the sentence itself.

📅 Forty years matched God's sentence

📜 Numbers thirteen and fourteen tell the story

🔢 One year for each day of scouting

➡️ The years were the sentence itself

## 🚫 Because They Obeyed Not The Voice Of The Lord

This names the real reason for the forty years directly.

The nation refused to trust God's promise at Kadesh Barnea.

Fear of the giants in the land overruled their faith.

An entire generation paid for one moment of unbelief.

🚫 This names the real reason plainly

😨 Israel refused to trust God at Kadesh Barnea

👹 Fear of giants overruled their faith

➡️ Unbelief cost an entire generation

## 🍯 A Land That Floweth With Milk And Honey

This phrase describes overflowing abundance, not a literal river of milk and honey.

Milk points to healthy herds and plenty of pasture land.

Honey points to rich, fertile ground blooming with wild flowers.

It became the Bible's standard shorthand for the promised land's abundance.

🥛 Milk means healthy herds and pasture

🍯 Honey means rich, fertile ground

🌍 It described overflowing abundance

📖 This became scripture's shorthand for Canaan's abundance

## 🤝 Their Children, Whom He Raised Up In Their Stead

Stead is an old word that means place, as in taking someone's place.

These children stepped into the exact role their parents forfeited.

God's promise did not die with the unbelieving generation.

It simply passed to the next one in line.

🔤 Stead means place, or in someone's place

👶 The children stepped into their parents' role

🤝 God's promise outlived the unbelieving generation

➡️ The promise passed to the next generation

## 🚶 Because They Had Not Circumcised Them By The Way

By the way simply means during the journey itself.

The text does not explain exactly why the practice stopped along the road.

Many scholars believe constant travel and enemy threats made the ritual too risky.

Whatever the reason, an entire generation reached the promised land still uncircumcised.

🚶 By the way means during the journey

❓ The text does not explain why it stopped

⚔️ Scholars believe travel made it too risky

📖 A whole generation arrived still uncircumcised

# Joshua 5:8-9
# 🔄 The Reproach Rolled Away
---
## 🏕️ They Abode In Their Places In The Camp

Abode means they stayed put.

Nobody moved from the camp during this time.

This was the same camp where the circumcision had just happened.

Staying still was itself a deliberate choice.

🏕️ Abode means they stayed put

🚫 Nobody moved from camp

🔪 This was right after the circumcision

📖 Staying still was a deliberate choice

## 🩹 Till They Were Whole

Whole here means healed from the wound of circumcision.

Adult circumcision takes real time to recover from, days at minimum.

During this window, Israel's fighting men could barely defend themselves.

Camping here, right across from Jericho, took real trust in God's protection.

🩹 Whole means healed from the wound

⏳ Healing from this takes real time

🛡️ The fighting men could barely defend themselves

➡️ Camping here took trust in God's protection

## 😔 This Day Have I Rolled Away The Reproach Of Egypt

Reproach means shame, or a mark of disgrace.

Being uncircumcised may have marked Israel as slaves in Egyptian eyes.

Many scholars connect it to Egypt's old taunt about Israel's God.

Either way, this act formally closes the door on Israel's old identity.

😔 Reproach means shame or disgrace

🇪🇬 It may mark their old slave identity

🗣️ It may answer Egypt's old taunt

📖 This day closes that chapter for good

## 🔤 The Name Of The Place Is Called Gilgal

Gilgal comes from a Hebrew word that means to roll.

That word choice directly matches rolled away just spoken in this same verse.

Chapter four already mentioned Gilgal as the camp's name.

This verse finally explains where that name actually came from.

🔤 Gilgal means to roll

🔗 It matches rolled away in this verse

📜 Chapter four already used the name

📖 This verse explains where it came from

# Joshua 5:10-12
# 🍞 The Manna Stops, The Land Provides
---
## 📅 Kept The Passover On The Fourteenth Day

The fourteenth day of the month is the exact date God set for Passover back in Exodus.

Passover required every participant to be circumcised, a rule set back in Exodus twelve.

That rule likely explains why this Passover could not happen until now.

This was the first Passover kept in the promised land itself.

📅 The fourteenth day matches Exodus exactly

🚫 Passover required circumcision to take part

🔪 That rule explains this Passover's timing

📖 This was the first Passover in Canaan

## 🌾 The Old Corn Of The Land

Corn here means grain in general, not the corn on the cob known today.

Old corn simply means grain already grown and harvested by the people living there.

Israel is eating food from Canaan's own soil for the first time.

The land is already beginning to prove itself.

🌾 Corn here means grain, not modern corn

🌱 Old corn was grain already growing in Canaan

🍽️ Israel eats Canaan's food for the first time

📖 The land begins proving itself immediately

## 🍞 Unleavened Cakes, And Parched Corn

Unleavened cakes are flat bread made without yeast.

Eating unleavened bread was a direct requirement of the Passover meal.

Parched corn means grain that was roasted or dried over fire.

Both were simple, practical foods, easy to prepare near enemy territory.

🍞 Unleavened means made without yeast

🔥 Parched corn means roasted or dried grain

📜 Unleavened bread was required at Passover

📖 Both were simple, practical camp food

## ⏹️ The Manna Ceased

Manna was the bread that fell from heaven every morning for forty years.

It first appeared in Exodus sixteen, right after Israel left Egypt.

The very next day after eating the land's own grain, it simply stopped.

God's daily miracle ends the moment it is no longer needed.

🍞 Manna fed Israel for forty years

📜 It began in Exodus sixteen

⏹️ It stopped right on cue

📖 The miracle ends when no longer needed

## 🍇 They Did Eat Of The Fruit Of The Land Of Canaan That Year

For forty years, every meal came from manna, provided directly by God's hand.

Now every meal comes from Canaan's own fields and orchards instead.

The provider does not change, only the method does.

God fed them through a miracle in the wilderness and a harvest in the land.

🍇 Meals now come from Canaan's fields

🙏 God still provides, only the method changes

🌾 The wilderness miracle gives way to harvest

📖 One God fed them both ways

# Joshua 5:13-15
# ⚔️ The Captain Of The Lord's Host
---
## 👀 Lifted Up His Eyes And Looked

This phrase is a common way the Bible introduces a sudden, important encounter.

Abraham looks up this same way right before he sees the ram caught in the thicket.

Joshua is standing alone, close to Jericho, likely scouting the city himself.

What he sees next changes the whole moment.

👀 This phrase signals a sudden encounter

📜 Abraham looks up the same way in Genesis

🚶 Joshua was likely scouting Jericho alone

➡️ What comes next changes everything

## ⚔️ A Man Over Against Him With His Sword Drawn In His Hand

A drawn sword means the weapon is already out, ready to be used immediately.

To Joshua, this figure could easily be mistaken for an enemy scout.

The man appears right on the edge of the coming battle for Jericho.

Nothing about his appearance yet reveals who he actually is.

⚔️ A drawn sword means ready to fight

❓ Joshua could not tell friend from enemy

🏰 He appears right at Jericho's edge

📖 His identity is still hidden

## ❓ Art Thou For Us, Or For Our Adversaries

Joshua asks the most natural question a commander could ask an armed stranger.

He expects one of two simple answers, friend or enemy.

The real answer he gets fits neither option he offered.

Some questions only make sense from a limited, human point of view.

❓ Joshua expects friend or enemy

🤷 Only two answers seem possible

🔄 The real answer breaks that pattern

📖 Some questions cannot capture the whole truth

## 🚫 As Captain Of The Host Of The Lord Am I Now Come

Nay is an old word for no, a firm denial.

Host is an old military term for army.

He is not on Israel's side and not on Jericho's side either.

He commands God's own army, above every human side in this war.

🚫 Nay means no, a firm denial

⚔️ Host is an old word for army

🙅 He stands above both human sides

📖 He commands God's own army

## 🙇 Joshua Fell On His Face To The Earth, And Did Worship

Falling face down was a posture of complete submission in the ancient world.

Worship here is not the polite bow Joshua gave normal messengers.

This response is reserved for God alone throughout scripture.

Joshua instantly recognizes he is standing before someone far greater than a soldier.

🙇 Falling face down showed total submission

🙏 Worship here is reserved for God alone

👑 Joshua recognizes something far greater

📖 His response reveals who this really is

## 👞 Loose Thy Shoe From Off Thy Foot, For The Place Whereon Thou Standest Is Holy

This is nearly the same command God gave Moses at the burning bush.

Removing a shoe was a sign of respect.

It compares to removing a hat today.

Holy means set apart, different from ordinary ground.

God's presence is what makes the ground holy, not the ground itself.

🔥 This echoes Moses at the burning bush

👞 Removing a shoe showed deep respect

✨ Holy means set apart from the ordinary

📖 God's presence alone makes ground holy
`.trim();

export const JOSHUA_FIVE_PERSONAL_SECTIONS = parseJoshuaFiveRawNotes(JOSHUA_FIVE_RAW_NOTES);
