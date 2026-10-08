export type MarkTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkTwoRawNotes(rawText: string): MarkTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 2:${startVerse}` : `Mark 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Mark 2 sections, received " + sections.length);
  }

  return sections;
}

const MARK_TWO_RAW_NOTES = `# Mark 2:1-5
# 🏠 Four Friends And A Broken Roof
---
## 📍 He Entered Into Capernaum After Some Days

Capernaum had already become the base for Jesus and his ministry.

He had healed and taught there before, back in the previous chapter.

After some days signals a return visit, not a brand new place.

Word of his earlier miracles there was still spreading.

📍 Capernaum was already his ministry base

🏠 This was a return visit not first

📣 His earlier miracles were still spreading

➡️ Expectation was building before he even arrived

## 📢 It Was Noised That He Was In The House

To be noised means word of something spread by mouth, person to person.

There was no news broadcast or public announcement system in this culture.

A crowd gathered simply because neighbors told neighbors he had returned.

That alone shows how much attention Jesus already drew.

📢 Noised means word spread by mouth

🏠 No broadcast system existed back then

👥 Neighbors simply told other neighbors

➡️ Jesus already drew serious attention

## 🚪 No Room To Receive Them, Not So Much As About The Door

This describes a house packed completely full inside.

The crowd then spilled out past the door itself.

People could not even stand in the entryway to listen.

Mark often notes crowd size to show how fast demand for Jesus grew.

🚪 The house was packed completely full

🚶 The crowd spilled out past the door

👂 People could not even stand to listen

📖 Mark keeps tracking how fast demand grew

## 🛏️ Sick Of The Palsy, Which Was Borne Of Four

Palsy was the common word for a condition causing paralysis.

This man could not walk or carry himself at all.

Borne of four means four separate men carried his mat together.

Friendship here took real physical effort, not just good intentions.

🛏️ Palsy means a paralyzing condition

🧍 The man could not walk at all

🤝 Four friends carried him together

➡️ Real friendship took real physical effort

## 🏚️ They Uncovered The Roof Where He Was

Homes in this region had flat roofs built from branches, reeds, and packed clay.

An outside staircase usually led straight up to the roof.

Digging through that kind of roof was realistic, not a wild exaggeration.

The four men climbed up and over everyone else just to reach Jesus.

🏚️ Roofs were flat and made of clay

🪜 An outside stair led up to it

🕳️ Digging through it was genuinely possible

➡️ They climbed over the crowd to reach him

## ⛏️ When They Had Broken It Up

This was someone else's house, damaged on purpose.

The men paid a real cost in effort and property to get their friend inside.

Nothing about this plan was quiet, easy, or convenient.

Faith here looked like stubborn action, not a quiet feeling.

⛏️ They damaged a house that was not theirs

💪 The plan cost real effort and property

🚫 Nothing about this was quiet or easy

📖 Faith here looked like stubborn action

## 👀 When Jesus Saw Their Faith

The faith named here belongs to the four friends, not only to the sick man.

Jesus responds to effort he can plainly see, not just to words spoken aloud.

One person's bold faith can carry real weight for someone else.

This is the first time in Mark that someone else's faith moves Jesus to act.

👀 Jesus saw visible faith, not just words

🤝 The friends' faith is named here

⚖️ One person's faith can carry another

📖 Someone else's faith moved Jesus to act

## 🙏 Son, Thy Sins Be Forgiven Thee

"Son" here is a warm, personal term of address, not a formal title.

Everyone expected Jesus to heal the man's legs first.

He addresses the man's sins before he ever mentions his paralysis.

Jesus treats the deeper problem as the one worth naming first.

🙏 Son was a warm, personal address

🦵 Everyone expected healing first

💔 Jesus named sin before paralysis

📖 He treated the deeper problem first

# Mark 2:6-12
# ⚡ Authority To Forgive Sins
---
## 📜 Certain Of The Scribes Sitting There, Reasoning In Their Hearts

Scribes were trained experts in the Law of Moses, highly respected teachers.

Reasoning in their hearts means they thought this silently, without saying a word aloud.

They were watching Jesus closely, already forming a legal judgment against him.

Nothing said out loud yet, but the accusation had already begun.

📜 Scribes were trained experts in the Law

🤐 Reasoning in their hearts means silent thought

👀 They were already forming a judgment

➡️ An unspoken accusation had already begun

## ⚡ Who Can Forgive Sins But God Only

This question names the real charge against Jesus, blasphemy.

Forgiving sins was understood as something only God himself could do.

The scribes were not wrong about that part at all.

Their mistake was failing to consider who was actually speaking to them.

⚡ Blasphemy is the real charge here

🙇 Only God can forgive sins

✅ The scribes were right about that rule

📖 Their error was missing who stood before them

## 👁️ He Perceived In His Spirit That They So Reasoned

Jesus knows their unspoken thoughts without anyone telling him.

He did not overhear a whisper or read a face.

This kind of insight points to more than ordinary human perception.

It also quietly answers the very question they were silently asking.

👁️ Jesus knew their unspoken thoughts

🙉 No one whispered this to him

🧠 This was more than ordinary perception

📖 It answered their silent question already

## ⚖️ Whether Is It Easier To Say

Forgiving sins is invisible, nobody can see it happen or prove it.

Healing a paralyzed man is visible, anyone watching could judge it instantly.

Jesus sets up a direct comparison between the two claims.

He chooses to make the harder, unprovable claim first on purpose.

⚖️ Forgiving sins cannot be seen or proven

🚶 Healing can be checked by anyone watching

🎯 Jesus sets the two claims side by side

➡️ He makes the harder claim first

## 🔑 That Ye May Know That The Son Of Man Hath Power On Earth To Forgive Sins

"Son of man" was a title Jesus used for himself often, drawn from the prophet Daniel.

It pointed to a coming figure given lasting authority directly from God.

The healing that follows works as visible proof backing up the invisible claim.

What cannot be seen gets confirmed by something that can.

🔑 Son of man was Jesus's own chosen title

📜 It comes from the prophet Daniel

🔗 Healing becomes proof for the invisible claim

📖 What cannot be seen gets confirmed

## 🚶 Arise, Take Up Thy Bed, And Go Thy Way Into Thine House

Three short commands, given one right after another.

The man obeys all three at once, with no pause or delay.

He carries the very mat that once carried him.

The healing is complete enough to walk out under his own strength.

🚶 Three commands come one after another

⚡ The man obeys with no delay

🛏️ He now carries the mat himself

📖 The healing was complete at once

## 😲 We Never Saw It On This Fashion

"On this fashion" is an old way of saying "like this" or "in this way."

The crowd glorifies God, not Jesus directly, at least for now.

Amazement does not yet mean full understanding of who Jesus is.

Something genuinely new had just happened in front of everyone.

😲 On this fashion means like this

🙏 The crowd praised God, not Jesus yet

🤔 Amazement is not the same as understanding

📖 Something genuinely new had just happened

# Mark 2:13-17
# 🍽️ Jesus Calls Levi
---
## 🌊 He Went Forth Again By The Sea Side

Jesus returns to the Sea of Galilee, his common teaching spot from chapter one.

Open shoreline let large crowds gather in a way no building could.

Teaching outdoors was simply more practical for a growing audience.

The pattern of large crowds following him continues without a break.

🌊 The sea side was his common teaching spot

👥 Open shoreline could hold large crowds

🏗️ No building could fit that many people

➡️ Large crowds kept following him

## 💰 Levi The Son Of Alphaeus Sitting At The Receipt Of Custom

Levi is also known by another name later in the New Testament, Matthew.

The receipt of custom was a tax collection booth along a public road.

Tax collectors in this system worked for Rome and often overcharged people.

Most Jews viewed men in this job as traitors and cheats.

💰 Levi is also known as Matthew

🪙 This was a Roman tax collection booth

🚫 Tax collectors often overcharged people

➡️ Most Jews viewed this job as traitorous

## 🚶 Follow Me

This is the same short, direct call Jesus already gave to the fishermen.

Levi leaves a steady, profitable job the instant he hears it.

No negotiation, no delay, and no second thought is recorded.

A hated profession is no obstacle to being personally called by Jesus.

🚶 The same short call as the fishermen

💼 Levi leaves a steady, profitable job

⚡ He responds with no delay

📖 A hated job was no obstacle

## 🍽️ Many Publicans And Sinners Sat Also Together With Jesus

Sitting at meat describes the reclining style of eating used at the time.

Publicans means tax collectors, grouped here with sinners as a single despised class.

Sharing a meal in this culture signaled real acceptance and friendship.

Jesus deliberately eats with people the religious establishment refused to touch.

🍽️ Sitting at meat means reclining to eat

🪙 Publicans means tax collectors

🤝 Shared meals signaled real acceptance

➡️ Jesus ate with people others refused

## 😠 How Is It That He Eateth And Drinketh With Publicans And Sinners

Scribes and Pharisees ask this question to the disciples, not to Jesus directly.

Eating with "sinners" was seen as a serious breach of ritual purity.

They expected a holy teacher to keep careful distance from such company.

Jesus breaking that expectation in public was itself a quiet challenge to them.

😠 The question goes to the disciples first

🧼 Shared meals touched on ritual purity

🧑‍⚖️ A holy teacher was expected to keep distance

➡️ Jesus challenged that expectation in public

## ⚕️ They That Are Whole Have No Need Of The Physician

A physician is a doctor, someone trained to treat the sick.

Healthy people generally see no reason to visit one.

Jesus uses this everyday picture to explain exactly why he is there.

He is not avoiding the respectable crowd, he is seeking out the needy one.

⚕️ A physician is a doctor

💪 Healthy people do not seek one out

🎯 Jesus explains his purpose with this picture

📖 He sought out the needy, not the comfortable

## 🙏 I Came Not To Call The Righteous, But Sinners To Repentance

Jesus is not agreeing that the scribes and Pharisees are truly righteous.

He is naming his stated mission, not handing out a compliment.

Repentance means a real turn away from sin, not just regret.

His call goes to people who already know they need to change.

🙏 This names his mission, not a compliment

⚖️ He is not calling them truly righteous

🔄 Repentance means a real turn from sin

📖 His call reaches those who know their need

# Mark 2:18-22
# 🍷 A Question About Fasting
---
## 🍂 The Disciples Of John And Of The Pharisees Used To Fast

Fasting means going without food for a set time, usually for prayer or mourning.

Both John's followers and the Pharisees treated regular fasting as a mark of devotion.

It was common practice among serious religious people of that day.

That makes what comes next stand out even more sharply.

🍂 Fasting means going without food on purpose

🙏 It usually tied to prayer or mourning

📏 Regular fasting marked devout people

➡️ That makes Jesus's disciples stand out

## ❓ Why Do Thy Disciples Fast Not

This question carries a real edge, comparing Jesus's disciples unfavorably to others.

To skip an expected religious practice looked like a lack of seriousness.

The question assumes something is missing or wrong with this new group.

Jesus does not apologize, he explains the deeper reason instead.

❓ The question compares the disciples unfavorably

📏 Skipping fasting looked less serious

🤔 It assumes something is wrong here

➡️ Jesus answers with a reason, not an apology

## 💍 Can The Children Of The Bridechamber Fast, While The Bridegroom Is With Them

Children of the bridechamber means the wedding guests and close attendants.

Jewish weddings were joyful celebrations that could last an entire week.

Fasting during that celebration would have been strange and out of place.

Jesus pictures himself as the bridegroom, present among his own guests.

💍 Bridechamber children means the wedding guests

🎉 Weddings were week long celebrations

🚫 Fasting then would look strange

📖 Jesus pictures himself as the bridegroom

## ⏳ The Days Will Come, When The Bridegroom Shall Be Taken Away

This line quietly points ahead to Jesus's own coming death.

Joy and celebration belong to his time with them right now.

Grief and fasting will have their own appointed season later.

Jesus already knows the shape of the road ahead of him.

⏳ This points ahead to his own death

🎉 Joy belongs to this present time

😢 Grief has its own later season

📖 Jesus already knew the road ahead

## 🧵 No Man Seweth A Piece Of New Cloth On An Old Garment

Unshrunk cloth will still pull tighter the first time it gets wet.

A new patch sewn onto an old garment will shrink and tear loose.

That tear ends up worse than the original hole it was meant to fix.

Jesus uses an ordinary household picture everyone listening would recognize.

🧵 New cloth shrinks the first wash

🩹 A new patch tears loose from cloth

💔 The result is worse than the first hole

➡️ The picture came from ordinary household life

## 🍾 No Man Putteth New Wine Into Old Bottles

Bottles here means wineskins, bags made from animal hide, not glass containers.

New wine still ferments and keeps expanding with gas as it ages.

An old wineskin has already stretched and turned stiff over time.

That brittle old skin will burst under the pressure of new wine.

🍾 Bottles here means wineskins made from hide

🫧 New wine keeps expanding as it ferments

🪨 Old wineskins have already turned stiff

➡️ A stiff old skin bursts under pressure

## 🍷 New Wine Must Be Put Into New Bottles

Both pictures, the cloth and the wine, land on the exact same point.

What Jesus brings is not a patch stitched onto the old religious system.

It needs its own new structure, able to hold something genuinely new.

Trying to force new life into old containers only destroys both.

🍷 Both pictures land on the same point

🧩 Jesus brings something more than a patch

🆕 New life needs a new structure

📖 Forcing it into old containers destroys both

# Mark 2:23-28
# 🌾 Lord Of The Sabbath
---
## 🌾 He Went Through The Corn Fields On The Sabbath Day

"Corn" in this old English translation means grain generally, likely wheat or barley.

Walking along a public path through someone's grain field was completely normal.

The Sabbath was the weekly day of rest commanded in the Law of Moses.

Jesus and his disciples were simply passing through on an ordinary day of rest.

🌾 Corn here means grain, not maize

🚶 Walking a field path was normal

📅 Sabbath was the weekly commanded day of rest

➡️ They were simply passing through

## 🤲 His Disciples Began To Pluck The Ears Of Corn

Jewish law allowed a hungry traveler to hand pick a little grain while passing through a field.

This permission came from instructions written in Deuteronomy.

The disciples were not stealing, they were using an allowed provision.

Picking grain itself was never the actual problem here.

🤲 Travelers could hand pick a little grain

📜 This permission came from Deuteronomy

🚫 The disciples were not stealing anything

➡️ Picking grain was not the real problem

## ⚖️ Why Do They On The Sabbath Day That Which Is Not Lawful

The Pharisees treated plucking and rubbing grain as a tiny form of harvesting and threshing work.

Work of any kind was forbidden by their tradition on the Sabbath.

This specific rule came from rabbinic interpretation, not from the written Law itself.

The real dispute was about how strictly to define rest.

⚖️ Plucking grain counted as harvesting to them

🚫 Any work was forbidden on the Sabbath

📜 This rule came from tradition, not the Law

➡️ The real question was how to define rest

## 👑 Have Ye Never Read What David Did

Jesus answers a tradition based complaint with Scripture itself.

He points back to a real event recorded in First Samuel.

David and his hungry men once broke a strict ritual rule out of genuine need.

Jesus uses an accepted hero of Israel's own history to make his case.

👑 Jesus answers with Scripture, not opinion

📖 He points to a story in First Samuel

🍞 David once broke a rule out of need

➡️ He uses Israel's own history to argue

## 🍞 Did Eat The Shewbread, Which Is Not Lawful To Eat But For The Priests

Shewbread was special consecrated bread kept inside the house of God.

Normally only priests were permitted to eat it under the Law.

Ahimelech the priest gave it to David anyway because of his real hunger.

Human need took priority over the letter of a ritual rule that day.

🍞 Shewbread was consecrated bread in God's house

🧑‍⚖️ Only priests were normally allowed to eat it

🤲 A priest gave it to David in need

📖 Human need outweighed the ritual rule that day

## ❤️ The Sabbath Was Made For Man, And Not Man For The Sabbath

The Sabbath was always meant as a gift of rest for people.

It was never meant to be a burden people exist to serve.

Jesus flips the Pharisees' priorities completely back around.

Real human need should never be crushed by a rule meant to help people.

❤️ The Sabbath was a gift of rest

🎁 It was never meant as a burden

🔄 Jesus flips their priorities back around

📖 A rule meant to help should not crush

## 👑 The Son Of Man Is Lord Also Of The Sabbath

Jesus claims direct authority over an institution God himself commanded.

Only the one who established the Sabbath could rightly claim to rule over it.

This is a bold, unmistakable claim about who Jesus actually is.

The chapter that opened with forgiving sins closes by claiming authority over God's own law.

👑 Jesus claims authority over the Sabbath itself

🙏 Only God's own authority could claim this

⚡ This is a bold claim about his identity

📖 The chapter closes exactly where it began
`.trim();

export const MARK_TWO_PERSONAL_SECTIONS = parseMarkTwoRawNotes(MARK_TWO_RAW_NOTES);
