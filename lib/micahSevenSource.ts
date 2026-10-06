export type MicahSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMicahSevenRawNotes(rawText: string): MicahSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MicahSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Micah\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Micah 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Micah\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Micah\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Micah 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Micah 7:${startVerse}` : `Micah 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Micah 7 sections, received " + sections.length);
  }

  return sections;
}

const MICAH_SEVEN_RAW_NOTES = `# Micah 7:1-6
# 😩 Woe Is Me
---
## 🍇 As When They Have Gathered The Summer Fruits

Micah pictures an orchard already stripped bare after harvest.

Summer fruits and grapegleanings both describe the last scraps left behind.

Nothing good or ripe remains to be found.

Micah is not actually describing fruit at all.

He is describing how few godly people are left in the land.

🍇 Summer fruits means the last scraps left

🍃 Grapegleanings means leftover grapes after harvest

🙅 Nothing good remains to find

📖 Few godly people are left in the land
---
## 🍈 My Soul Desired The Firstripe Fruit

Firstripe fruit means the first and best fruit of the season.

Micah is not hungry for actual fruit.

He is longing for even one honest person to find.

That search comes up just as empty.

🍈 Firstripe fruit means the earliest best fruit

🔍 Micah searches for one honest person

😔 The search comes up empty

📖 Godliness itself has become scarce
---
## ⚰️ The Good Man Is Perished Out Of The Earth

Perished here does not mean every good man has physically died.

It means genuine goodness has disappeared from public life.

Micah looks across the whole nation and cannot find one.

Verse two now answers the longing from verse one directly.

⚰️ Perished means disappeared, not only died

🔍 Genuine goodness is missing nationwide

😔 Micah cannot find a single one

📖 This answers the longing from verse one
---
## 🪤 They Hunt Every Man His Brother With A Net

Hunting with a net was a method used to trap animals, not people.

Micah uses that picture to describe how neighbors now trap each other.

Brother does not only mean a blood relative here.

It describes anyone close enough to call family or countryman.

Trust itself has become the trap.

🪤 Hunting with a net was for animals

🤝 Brother here means any close neighbor

⚠️ Trust itself has become a trap

📖 Betrayal now runs through the whole nation
---
## ✋ Do Evil With Both Hands Earnestly

Effort like this is usually something worth admiring.

Here it describes people pouring that same effort into wrongdoing.

Both hands earnestly means doing something with total commitment.

Wickedness in this chapter is practiced and determined, not lazy.

✋ Both hands earnestly means full effort

👍 That kind of effort is usually a compliment

😈 Here it describes committed wrongdoing

📖 Wickedness here is practiced, not occasional
---
## ⚖️ The Judge Asketh For A Reward

A judge in this culture was supposed to decide cases honestly for free.

Asking for a reward means taking a bribe to rule a certain way.

The prince in the same verse is doing the exact same thing.

Justice itself was for sale in Micah's day.

⚖️ A judge should rule for free

💰 A reward here means a bribe

👑 The prince does the same thing

📖 Justice itself was for sale
---
## 🤝 So They Wrap It Up

They here means the prince, the judge, and the great man acting together.

Wrap it up pictures them finishing a scheme as a team.

Each one plays a distinct role in the same conspiracy.

Corruption here is organized, not scattered.

🎁 Wrap it up means finishing a scheme

👑 The prince, judge, and great man share it

🤝 Each one plays a role

📖 Corruption here is organized, not scattered
---
## 🌵 The Best Of Them Is As A Brier

A brier is a thorny, painful plant to brush against.

Micah says even the best people left are like that.

There is no safe, harmless person remaining to rely on.

The most upright one still cuts like a thorn hedge.

🌵 A brier is a painful thorny plant

😬 Even the best people now hurt others

🚫 No safe person is left to rely on

📖 Even the upright one still cuts
---
## 👁️ The Day Of Thy Watchmen And Thy Visitation Cometh

Watchmen were stationed to warn a city before danger arrived.

Visitation here means the day God personally comes to judge.

Micah says that day is no longer far off.

It is now arriving right on schedule.

👁️ Watchmen warned a city of danger

⚖️ Visitation means a day of judgment

⏰ That day is no longer far off

📖 Judgment is arriving right on schedule
---
## 🤐 Trust Ye Not In A Friend

Micah is not teaching that every friendship is fake.

He is warning that betrayal has spread this deep into society.

Even close relationships are no longer safe from it.

A guide here means someone trusted for advice and direction.

🤐 Not every friendship is condemned here

⚠️ Betrayal has spread this deep

🧭 A guide means a trusted advisor

📖 Even close relationships are not safe
---
## 💑 Her That Lieth In Thy Bosom

This phrase is an old way of naming a man's own wife.

Bosom pictures the closeness of marriage, not a hiding place.

Micah says even a husband should guard his words at home.

Betrayal in this chapter has reached all the way into marriage.

💑 Bosom here names a man's own wife

🏠 It pictures the closeness of marriage

🤐 Guard your words even at home

📖 Betrayal reached even into marriage
---
## 🏠 A Man's Enemies Are The Men Of His Own House

Family breakdown now reaches all the way into Micah's own house.

House here means the people living under one roof, not the building.

Jesus later quotes this exact line in the Gospel of Matthew.

Micah's own household becomes proof of just how deep corruption runs.

🏠 House means the people inside it

👪 Family itself is no longer safe

🔁 Jesus later quotes this same line

📖 Corruption runs as deep as family
# Micah 7:7-10
# 🌅 I Will Look Unto The LORD
---
## 👀 Therefore I Will Look Unto The LORD

Micah shifts here from describing corruption to speaking personally.

Looking unto the LORD means turning his attention away from a broken society.

He cannot fix his neighbors, but he can still trust God.

This single word, therefore, marks the turn of the whole chapter.

👀 Looking to God, not neighbors

🙋 Micah cannot fix his neighbors

🙏 He can still trust God

📖 Therefore marks the turn of the chapter
---
## 😤 Rejoice Not Against Me, O Mine Enemy

Micah speaks directly to a personified enemy nation watching Israel's fall.

Rejoicing against someone means celebrating their downfall out loud.

Micah is telling that enemy not to celebrate too soon.

The fall he describes will not be the end of the story.

😤 Micah speaks to a personified enemy nation

🎉 Rejoicing means celebrating someone's downfall

🙅 He tells them not to celebrate yet

📖 This fall will not be the end
---
## 🌅 When I Fall, I Shall Arise

Micah admits that a real fall is coming.

He does not pretend the judgment described earlier will be skipped.

Arise here means a future recovery God himself will bring.

Hope in this verse comes after honesty, not instead of it.

🌅 A real fall is still coming

🙏 Arise means a future recovery from God

🤝 Hope follows honesty, not instead of it

📖 God brings the rise after the fall
---
## 💡 The LORD Shall Be A Light Unto Me

Darkness here pictures the full weight of judgment and defeat.

A light in that same darkness means God's own presence and help.

Micah does not expect to avoid the dark season entirely.

He expects God to meet him inside it.

🌑 Darkness pictures judgment and defeat

💡 Light means God's presence and help

🚫 He does not skip the dark season

📖 God meets him inside the darkness
---
## ⚖️ I Will Bear The Indignation Of The LORD

Indignation here means God's righteous anger at real sin.

Micah admits the coming punishment is deserved, not unfair.

He accepts it instead of arguing his own innocence.

That honesty is very different from the corrupt officials back in verses one through six.

😠 Indignation means God's righteous anger

✅ Micah admits the punishment is deserved

🙅 He does not argue his own innocence

📖 Honesty here differs from the corrupt officials
---
## ⚖️ Until He Plead My Cause

Plead here is the same legal word already used back in chapter six.

It means arguing a case in court, not begging for pity.

Micah trusts God to one day argue his case before the nations.

The judge in this picture is also the one who will defend him.

⚖️ Plead means arguing a case in court

🔁 This word already appeared back in chapter six

🙏 Micah trusts God to argue his case

📖 His judge is also his defender
---
## 😏 Where Is The LORD Thy God

This question is a taunt, not a real question.

Enemies who watched Israel fall now mock its faith out loud.

They assume Israel's God has simply disappeared or failed.

Micah expects that taunt to be answered, not ignored.

😏 This question is a mocking taunt

👎 Enemies assume God has failed

🤐 Micah does not argue back yet

📖 The taunt will be answered later
---
## 🧱 Trodden Down As The Mire Of The Streets

Mire means wet mud and filth left in the street after rain.

Being trodden down like that pictures total, public humiliation.

Micah says this reversal is coming for the enemy, not for Israel.

The one doing the mocking will end up on the ground instead.

🧱 Mire means mud and filth in the street

👣 Trodden down pictures total humiliation

🔄 This reversal falls on the enemy

📖 The mocker ends up on the ground
# Micah 7:11-13
# 🧱 The Day Of Rebuilding
---
## 🧱 In The Day That Thy Walls Are To Be Built

City walls in the ancient world meant real safety from attack.

A city without walls was open to anyone who wanted to raid it.

Micah promises a day when Jerusalem's walls will stand again.

Rebuilding the walls pictures the whole nation's safety being restored.

🧱 Walls meant real safety from attack

⚠️ A city without walls was defenseless

🏙️ Jerusalem's walls will stand again

📖 Rebuilt walls picture a restored nation
---
## 📜 The Decree Shall Be Far Removed

Decree here points back to the judgment announced earlier in the chapter.

Far removed means that sentence will no longer apply.

This is not Israel escaping punishment altogether.

It is the punishment finally running its course and ending.

📜 Decree points back to the judgment

🚫 Far removed means the sentence ends

⏳ Israel is not escaping punishment entirely

📖 The punishment runs its course and ends
---
## 🗺️ He Shall Come Even To Thee From Assyria

Assyria was the empire that had scattered many of God's people by force.

Micah pictures those same exiles coming home again one day.

The context points to God's own people returning, not a foreign invader.

This promise reverses the exile Assyria had caused.

🗺️ Assyria scattered God's people by force

🏠 Micah pictures exiles coming home

🔄 This reverses what Assyria caused

📖 Exile was never going to be the end
---
## 🌊 From Sea To Sea, And From Mountain To Mountain

This phrase does not name two specific seas or two specific mountains.

It is an old way of saying every direction at once.

People scattered to the farthest corners will still find their way back.

No distance is too far for this homecoming.

🌊 This names every direction at once

🗻 Not two specific seas or mountains

🧭 Even the farthest corners come home

📖 No distance is too far to return
---
## 🏜️ The Land Shall Be Desolate... For The Fruit Of Their Doings

This verse shifts attention away from Israel to the nations that mistreated her.

Desolate here means left empty and ruined, the opposite of the rebuilding just promised.

Fruit of their doings is an old way of naming the result of someone's actions.

The nations reap what they planted, just as Israel will be restored for what God promised.

🔄 Attention shifts to the nations now

🏜️ Desolate means left empty and ruined

🌾 Means the natural result of actions

📖 Nations reap what they planted
# Micah 7:14-17
# 🐑 Feed Thy People
---
## 🐑 Feed Thy People With Thy Rod

A shepherd's rod was a wooden staff used to guide and protect sheep.

Calling Israel a flock pictures God as their shepherd, not a distant ruler.

Feed here means more than food, it means ongoing care and leadership.

This image sets up the whole restoration scene that follows.

🐑 Rod was a shepherd's guiding staff

🧑‍🌾 God is pictured as a shepherd

🍽️ Feed means ongoing care, not just food

📖 This image frames the restoration ahead
---
## 🌲 Dwell Solitarily In The Wood, In The Midst Of Carmel

Carmel was a fertile region known for good pasture and farmland.

Solitarily here means isolated, cut off from the rest of the nation.

Even a fertile place can feel empty when a people are scattered.

This pictures Israel's current condition before the restoration begins.

🌲 Carmel was known for fertile pasture

🏝️ Solitarily means isolated and cut off

😔 Even fertile land can feel empty

📖 This pictures Israel before restoration begins
---
## 🌿 Let Them Feed In Bashan And Gilead

Bashan and Gilead were both regions east of the Jordan River known for rich grazing land.

Letting the flock feed there pictures abundance replacing isolation.

These were lands Israel once held fully, before division and exile.

Restoration means more than survival, it means real plenty again.

🌿 Bashan and Gilead were rich grazing land

🔄 Abundance replaces earlier isolation

📜 These were lands Israel once held fully

📖 Restoration brings plenty, not just survival
---
## 📆 As In The Days Of Old

Days of old points back to an earlier, better season for the nation.

This likely recalls the years before the kingdom split and declined.

Micah is not asking for something new.

He is asking God to restore what was lost.

📆 Days of old names an earlier season

📉 This recalls years before the kingdom split

🙏 Micah asks for restoration, not novelty

📖 He wants back what was lost
---
## 🌍 According To The Days Of Thy Coming Out Of The Land Of Egypt

This phrase directly recalls the exodus out of Egypt under Moses.

Micah promises a future deliverance just as dramatic as that first one.

Marvellous things means miracles beyond ordinary human explanation.

God is not limited to acting powerfully only in the distant past.

🌍 This recalls the exodus under Moses

✨ Marvellous things means miracles beyond explanation

🔁 A future deliverance will match the first one

📖 God still acts powerfully today
---
## 🤐 They Shall Lay Their Hand Upon Their Mouth

This gesture is an old idiom for stunned, speechless shame.

The nations who mocked Israel's fall will have nothing left to say.

Their earlier confidence completely disappears in this picture.

Silence here is not respect, it is defeat.

🤐 This idiom means stunned speechless shame

😲 The nations run out of mocking words

📉 Their earlier confidence disappears

📖 This silence is defeat, not respect
---
## 👂 Their Ears Shall Be Deaf

Deaf here does not describe an actual physical condition.

It pictures the nations losing the ability to respond at all.

Their power to argue or boast has been taken away.

God's reversal leaves them with no answer and no voice.

👂 Deaf pictures losing the ability to respond

🚫 Their power to argue is gone

🔇 They have no answer left

📖 God leaves them without a voice
---
## 🐍 They Shall Lick The Dust Like A Serpent

This image echoes the curse placed on the serpent back in Genesis.

Licking dust pictures total defeat and humiliation.

Micah applies that same old picture to Israel's enemies now.

The same God who judged the first enemy judges these too.

🐍 This echoes the curse in Genesis

👣 Licking dust pictures total defeat

🔁 The same old picture is reused here

📖 The same God judges every enemy
---
## 🐛 They Shall Be Afraid Of The LORD Our God

Worms moving out of their holes pictures fear driving the nations into hiding.

The fear described here is not fear of Israel at all.

It is fear of the God standing behind Israel.

This line names the real point behind every picture in these verses.

🐛 Worms leaving holes pictures fear driving them out

😨 This is not fear of Israel

🙏 It is fear of Israel's God

📖 God himself is the real point
# Micah 7:18-20
# 🙏 Who Is A God Like Unto Thee
---
## ❓ Who Is A God Like Unto Thee

This question is not really a question, it is a statement of praise in disguise.

Micah's own name in Hebrew means who is like the LORD.

The prophet closes his book by living out the meaning of his own name.

No other god pardons sin and still remains perfectly just.

❓ This is praise phrased as a question

📛 His name means who is like God

✍️ The prophet closes by living his name's meaning

📖 No other god forgives and stays just
---
## 🚶 That Pardoneth Iniquity, And Passeth By The Transgression

Pardoneth means choosing to forgive instead of punishing deserved guilt.

Passeth by pictures God walking right past sin instead of stopping to count it.

This is not God pretending sin never happened.

It is God choosing not to hold it against his people anymore.

🚶 Pardoneth means choosing to forgive

👣 Passeth by pictures walking past sin

🙅 This is not pretending sin never happened

📖 God chooses not to hold it against them
---
## 👪 The Remnant Of His Heritage

Remnant means the smaller group that survives after a disaster.

Heritage here points back to God's own chosen people, not a possession.

Micah has spent this whole book warning about judgment that will thin that number down.

Even a small surviving group is still precious to God.

👪 Remnant means those who survive a disaster

🏷️ Heritage points to God's own chosen people

📉 Judgment has thinned this number down

📖 A small group is still precious to God
---
## ❤️ He Delighteth In Mercy

Delighteth means something more than simply tolerating or allowing.

It describes genuine joy, not a reluctant decision.

God is not shown here grudgingly letting sin go unpunished.

Mercy is something he actually wants to give.

❤️ Delighteth means genuine joy, not tolerance

🙅 This is not a grudging decision

🎁 Mercy is something God wants to give

📖 God's mercy comes from joy, not obligation
---
## ⚔️ He Will Subdue Our Iniquities

Subdue is a word normally used for conquering an enemy in battle.

Micah pictures sin itself as an enemy God actively defeats.

This is not God simply overlooking wrongdoing.

It is God winning a real battle against it.

⚔️ Subdue normally describes conquering an enemy

😈 Sin itself is pictured as the enemy

🙅 This is not simply overlooking wrong

📖 God wins a real battle against sin
---
## 🌊 Cast All Their Sins Into The Depths Of The Sea

This picture recalls Pharaoh's army sinking into the Red Sea during the exodus.

Just as that army never resurfaced, these sins are described as gone for good.

The image is deliberately dramatic to show how completely sin is removed.

Nothing here suggests a partial or temporary forgiveness.

🌊 This recalls Pharaoh's army sinking in the sea

🚫 Sins described here never resurface

✨ The image is deliberately dramatic

📖 Forgiveness here is complete, not partial
---
## 📜 Thou Wilt Perform The Truth To Jacob, And The Mercy To Abraham

Truth here means faithfulness to a promise already made, not just factual accuracy.

Jacob and Abraham both received specific promises many generations earlier in Genesis.

Micah ends his book by tying everything back to those ancient promises.

God's mercy in this chapter was never a new idea.

📜 Truth means faithfulness to a promise

👴 Jacob and Abraham received promises long ago

🔁 Micah ties this ending back to Genesis

📖 This mercy was never a new idea
---
## ⏳ Which Thou Hast Sworn Unto Our Fathers From The Days Of Old

Sworn here means a formal, binding oath, not a casual promise.

Our fathers names the patriarchs the whole nation descended from.

Days of old again points back to those ancient beginnings.

Micah's final word is confidence, not uncertainty, about God keeping that oath.

⏳ Sworn means a binding oath, not a hint

👴 Our fathers names the patriarchs

📆 Days of old points to ancient beginnings

📖 Micah ends in confidence, not uncertainty
`.trim();

export const MICAH_SEVEN_PERSONAL_SECTIONS = parseMicahSevenRawNotes(MICAH_SEVEN_RAW_NOTES);
