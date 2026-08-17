export type ProverbsElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsElevenRawNotes(rawText: string): ProverbsElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 11:${startVerse}` : `Proverbs 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Proverbs 11 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_ELEVEN_RAW_NOTES = `# Proverbs 11:1-3
# ⚖️ Honest Scales And Honest Hearts
---
## ⚖️ A False Balance Is Abomination To The LORD

"Balance" here means a merchant's scale, used to weigh goods in the marketplace.

A "false balance" is a scale secretly rigged to cheat whoever is buying or selling.

"Abomination" is a strong word for something God finds truly disgusting, not merely wrong.

A shopper could never see the rigged scale, only God could.

Ordinary honesty in a shop mattered to God as much as any public sin.

⚖️ Balance means a merchant's scale

🎭 False balance means a rigged scale

🤢 Abomination means truly disgusting to God

📖 Hidden cheating still matters to God

## ❤️ A Just Weight Is His Delight

A "just weight" is an honest, accurate measure, the opposite of the rigged scale.

"Delight" means real pleasure, more than simple approval.

This verse pairs God's strongest word for disgust with his strongest word for pleasure in one line.

Small, unseen honesty is treated here as something God actually enjoys.

⚖️ Just weight means an honest measure

❤️ Delight means real pleasure not mere approval

🔄 The verse pairs disgust and pleasure together

📖 Unseen honesty is something God enjoys

## 👑 When Pride Cometh, Then Cometh Shame

"Pride" means an inflated view of oneself that refuses correction.

This proverb states a pattern, pride now, shame later.

"Shame" in this culture meant a public loss of honor, not just a private embarrassed feeling.

Pride is pictured here as setting its own fall in motion.

👑 Pride means an inflated self view

⏳ This states a pattern, not a maybe

😳 Shame meant a public loss of honor

📖 Pride sets up its own fall

## 🙇 With The Lowly Is Wisdom

The "lowly" are people who do not overrate themselves and stay willing to be taught.

Wisdom in this book means a life aimed at knowing and obeying God, not raw intelligence.

The lowly person here stands opposite the proud person from the first half of the verse.

Humility positions someone to actually receive wisdom instead of blocking it.

🙇 Lowly means not overrating oneself

🧭 Wisdom means a life aimed at God

🔄 Lowly stands opposite the proud

📖 Humility lets a person receive wisdom

## 🧩 The Integrity Of The Upright Shall Guide Them

"Integrity" means being whole, the same person in private as in public.

"Guide" pictures integrity working like a compass, pointing the way through a decision.

The upright person's honesty is shown here as practically useful, not only morally nice.

Their own character becomes the thing that steers them right.

🧩 Integrity means the same in private and public

🧭 Guide pictures integrity as a compass

🛠️ Honesty is shown as practically useful

📖 Character itself steers a person right

## 🌀 The Perverseness Of Transgressors Shall Destroy Them

"Perverseness" means a twisted, crooked way of living, chosen on purpose.

"Transgressors" means people who cross a line they already knew was there.

This verse pairs directly with the one before it, guide against destroy.

What steers one person safely wrecks the other.

🌀 Perverseness means twisted living chosen on purpose

🚧 Transgressors means crossing a known line

🔄 This verse pairs guide with destroy

📖 What steers one person wrecks the other

# Proverbs 11:4-6
# 🛟 Riches Fail, Righteousness Delivers
---
## 💰 Riches Profit Not In The Day Of Wrath

The "day of wrath" refers to a moment of God's judgment, not simply a hard day.

"Profit not" means riches will not buy protection when that day comes.

This is not against having money, it warns against trusting money as ultimate security.

Everything money buys here fails at the one moment it would matter most.

💰 Day of wrath means a moment of judgment

🚫 Profit not means money buys no protection

⚖️ This warns against trusting money, not owning it

📖 Money fails at the moment it matters most

## 🛟 Righteousness Delivereth From Death

"Death" here often pictures ruin or being cut off from God, not only physical dying.

"Righteousness" means a life lived rightly before God.

This proverb sets two things side by side, what fails and what actually rescues.

Only one of the two things named in this verse works on judgment day.

⚰️ Death here often pictures ruin

🙏 Righteousness means a life lived rightly before God

⚖️ The verse contrasts what fails with what rescues

📖 Only one path works on judgment day

## 🛤️ The Righteousness Of The Perfect Shall Direct His Way

"Perfect" here does not mean flawless, it means blameless or fully devoted to God.

"Direct" means to make a path straight and clear ahead of someone.

A godly life is pictured here as something that clears the road in front of a person.

This repeats the guiding picture from verse three, stated a second way.

🙏 Perfect here means fully devoted, not flawless

🛤️ Direct means clearing a straight path

🧭 A godly life clears the road ahead

📖 This repeats the guiding picture from verse three

## 🪤 The Wicked Shall Fall By His Own Wickedness

"Fall by his own wickedness" means the wicked person's downfall grows out of their own choices.

This is not an outside punishment landing at random.

Their wrongdoing eventually becomes the very thing that trips them.

Sin is shown here carrying its own built in consequence.

🪤 Their downfall grows from their own choices

🎯 This is not a random outside punishment

🥾 Wrongdoing becomes the thing that trips them

📖 Sin carries its own built in consequence

## 🛟 The Righteousness Of The Upright Shall Deliver Them

"Deliver" means to rescue someone out of real danger.

This is the third verse in a row pairing righteousness with rescue.

Repetition in Proverbs is not filler, it presses one truth from several angles.

Deliverance is shown here as the normal outcome of an upright life, not a rare exception.

🛟 Deliver means rescue from real danger

🔁 Third verse pairing righteousness with rescue

📣 Repetition in Proverbs presses one truth from angles

📖 Deliverance is the normal outcome of uprightness

## 🪤 Transgressors Shall Be Taken In Their Own Naughtiness

"Naughtiness" is a strong old word for wickedness, not childish mischief.

"Taken" pictures being caught, like an animal caught in its own trap.

The wicked person's own scheme becomes the snare that catches them.

This closes the section with the same pattern as the verse before it, wickedness turning back on itself.

😈 Naughtiness here means real wickedness not mischief

🪤 Taken pictures being caught in a trap

🔄 Their own scheme becomes the snare

📖 This repeats wickedness turning on itself

# Proverbs 11:7-9
# 💨 What Dies With The Wicked
---
## 🎯 When A Wicked Man Dieth, His Expectation Shall Perish

"Expectation" means whatever the wicked person was counting on for the future.

Death exposes what a life was actually built on.

Everything the wicked person hoped in simply ends when they do.

Nothing they were banking on outlives them.

🎯 Expectation means what they were counting on

⚰️ Death exposes what a life was built on

💨 Their hope simply ends when they do

📖 Nothing they banked on outlives them

## 🔁 The Hope Of Unjust Men Perisheth

"Unjust men" repeats the same idea as "wicked man" from the first half of the verse.

This is Hebrew parallelism, saying the same truth twice in different words for emphasis.

"Perisheth" means to come to nothing, the same word already used back in chapter ten.

The whole verse hammers one point twice so the reader cannot miss it.

⚖️ Unjust repeats wicked from the first half

🔁 This is parallelism, one truth said twice

🕳️ Perisheth means coming to nothing

📖 The verse hammers one point twice

## 🛟 The Righteous Is Delivered Out Of Trouble

"Delivered out of trouble" means rescued from a difficulty already in progress.

This is not a promise that trouble never touches the righteous.

It is a promise that trouble does not have the final word over them.

"Trouble" in this book usually means real hardship, not minor inconvenience.

🛟 Delivered means rescued mid difficulty

🚫 This does not promise trouble never comes

🏁 Trouble does not get the final word

📖 Trouble here means real hardship

## 🔄 The Wicked Cometh In His Stead

"In his stead" means taking that very place, stepping into the trouble instead.

This proverb pictures trouble almost trading hands between the righteous and the wicked.

It is not describing a literal swap every time, it names a pattern this book keeps repeating.

The wicked person's own path eventually leads into what the righteous escaped.

🔄 In his stead means stepping into that place

⚖️ Trouble almost trades hands here

🌀 This is a pattern, not a literal swap

📖 The wicked walk into what the righteous escaped

## 🗣️ An Hypocrite With His Mouth Destroyeth His Neighbour

A "hypocrite" here is someone who says one thing while meaning another.

"Destroyeth with his mouth" means real damage done only through words, no weapon needed.

Gossip, false witness, or flattery could all ruin a neighbor's reputation or safety.

Speech is treated in this book as powerful enough to genuinely harm someone.

🎭 Hypocrite means saying one thing meaning another

🗣️ Destroyeth by mouth means harm through words

⚠️ Gossip or false witness could ruin a neighbor

📖 Speech is treated as genuinely powerful here

## 📚 Through Knowledge Shall The Just Be Delivered

"Knowledge" here means real, godly understanding, not simply information.

This answers the danger just named in the first half of the verse.

A just person's grounded understanding protects them from being fooled by a hypocrite's words.

Wisdom is shown here as a defense, not only a virtue.

📚 Knowledge here means real godly understanding

🛡️ This answers the danger just named

🧠 Understanding protects a person from being fooled

📖 Wisdom is shown as a defense

# Proverbs 11:10-14
# 🏙️ A City Rises Or Falls On Its People
---
## 🏙️ When It Goeth Well With The Righteous, The City Rejoiceth

This describes a whole community's reaction, not just one family's own joy.

A godly person's success was understood in this culture to benefit everyone nearby.

Ancient towns were small enough that one person's character visibly shaped daily life for neighbors.

The righteous were seen here as a public good, not only a private matter.

🏙️ This names a whole community's reaction

🌱 One person's success benefited everyone nearby

🏘️ Small towns felt one person's character directly

📖 The righteous were seen as a public good

## 📢 When The Wicked Perish, There Is Shouting

"Shouting" pictures open, public celebration, not quiet relief.

This is not cruelty celebrating a person's death.

It is relief that a source of harm to the community is finally gone.

The city's two reactions in this verse show how deeply one life can affect many.

📢 Shouting pictures open public celebration

🚫 This is not cruelty toward a person

😮‍💨 It is relief that harm is gone

📖 One life affects many in this verse

## 🙌 By The Blessing Of The Upright The City Is Exalted

"Blessing" here means the good influence and favor an upright person brings with them.

"Exalted" means lifted up, made to prosper and stand tall.

This repeats the theme from the verse before it, a community rising because of godly people in it.

A city's strength is tied here to the character of its people, not only its walls.

🙌 Blessing means the good influence godly people bring

⬆️ Exalted means lifted up and made to prosper

🔁 This repeats the theme from verse ten

📖 A city's strength is tied to its people

## 💥 It Is Overthrown By The Mouth Of The Wicked

"Overthrown" means torn down, brought to ruin.

"The mouth of the wicked" points to lies, slander, or corrupt speech spreading through a community.

Words are shown here as powerful enough to wreck an entire city, not just one relationship.

The same city can rise or fall depending on which kind of speech fills it.

💥 Overthrown means torn down to ruin

🗣️ Mouth of the wicked means corrupt speech spreading

🏙️ Words can wreck a whole city here

📖 A city rises or falls by its speech

## 👎 He That Is Void Of Wisdom Despiseth His Neighbour

"Void of wisdom" means genuinely lacking it, not simply young or untrained.

"Despiseth" means to look down on someone, treating them as worthless.

This is not disagreeing with a neighbor, it is contempt for them.

A lack of wisdom shows up here in how a person treats others, not only in bad decisions.

🕳️ Void of wisdom means genuinely lacking it

👎 Despiseth means looking down on someone

🚫 This is contempt, not simple disagreement

📖 Wisdom shows in how someone treats others

## 🤐 A Man Of Understanding Holdeth His Peace

"Holdeth his peace" means choosing to stay quiet rather than speak carelessly.

This directly contrasts the contempt described in the first half of the verse.

Restraint is treated here as a mark of real understanding, not weakness.

The wise response to a neighbor's fault is silence, not scorn.

🤐 Holdeth his peace means choosing to stay quiet

🔄 This contrasts the contempt just named

💪 Restraint is a mark of real understanding

📖 Silence, not scorn, is the wise response

## 🗣️ A Talebearer Revealeth Secrets

A "talebearer" is someone who spreads private information for their own gain or entertainment.

"Revealeth secrets" means exposing something someone trusted them to keep quiet.

This kind of person treats another person's trust as something to trade away.

Broken confidence like this could damage relationships or reputations badly in a small community.

🗣️ Talebearer means someone who spreads private information

🔓 Revealeth secrets means exposing a trust

💱 They treat trust as something to trade

📖 Broken confidence could damage a whole community

## 🤝 He That Is Of A Faithful Spirit Concealeth The Matter

A "faithful spirit" means someone who is trustworthy and reliable at their core.

"Concealeth the matter" means actively choosing to keep what was shared private.

This person is shown as the direct opposite of the talebearer from the first half of the verse.

Being trusted with something is treated here as a real responsibility, not idle information.

🤝 Faithful spirit means trustworthy at the core

🔒 Concealeth means actively keeping something private

🔄 This is the opposite of the talebearer

📖 Being trusted is a real responsibility

## 🗺️ Where No Counsel Is, The People Fall

"Counsel" here means wise guidance, especially from leaders making decisions for a group.

"Fall" pictures a whole community stumbling into disaster, not one person's mistake.

This proverb is about leadership, not only personal decision making.

A group without good advice is shown here as genuinely vulnerable.

🗺️ Counsel means wise guidance for decisions

🏚️ Fall pictures a whole community stumbling

👥 This is about leadership, not one person

📖 A group without advice is vulnerable

## 👥 In The Multitude Of Counsellors There Is Safety

"Multitude of counsellors" means gathering advice from more than one wise source.

"Safety" here means real protection from bad decisions, not comfort.

This does not mean more voices are automatically better, it assumes those voices are wise.

Good leadership in this book depends on being willing to listen, not deciding alone.

👥 Multitude means gathering more than one voice

🛡️ Safety means protection from bad decisions

⚖️ This assumes the voices are wise ones

📖 Good leadership means listening, not deciding alone

# Proverbs 11:15-19
# 🤝 Surety, Mercy, And What A Life Sows
---
## 📜 He That Is Surety For A Stranger Shall Smart For It

"Surety" means legally promising to pay someone else's debt if they cannot.

A "stranger" here means someone the guarantor does not know well enough to trust that deeply.

"Smart for it" means suffer real pain, especially financial loss.

This book repeatedly warns against this exact kind of risky financial promise.

📜 Surety means promising to cover another's debt

🚶 Stranger means someone not trusted deeply

💸 Smart for it means real financial pain

📖 This book repeatedly warns against this promise

## 🔒 He That Hateth Suretiship Is Sure

"Hateth suretiship" means strongly avoiding this kind of risky guarantee altogether.

"Sure" here means safe and secure, the opposite outcome from the first half of the verse.

This is practical wisdom about money, not only a spiritual lesson.

Avoiding an unwise promise is shown here as its own form of protection.

🙅 Hateth suretiship means avoiding a risky promise

🔒 Sure means safe, opposite of smarting for it

💰 This is practical wisdom about money

📖 Avoiding a bad promise protects a person

## 🕊️ A Gracious Woman Retaineth Honour

"Gracious" here means kind, dignified, and marked by good character.

"Retaineth honour" means she keeps and holds onto genuine respect over time.

This verse names a quality of character as a lasting kind of wealth in itself.

Honour earned through character was treated as more durable than money.

🕊️ Gracious means kind and marked by good character

👑 Retaineth honour means holding onto real respect

💎 Character is named as a lasting wealth

📖 Honour outlasts money in this verse

## 💪 Strong Men Retain Riches

"Strong" here likely points to diligence and effort, not simply physical strength.

"Retain riches" means hardworking men keep hold of wealth once they gain it.

Some ancient translations instead pair this line with violent men losing riches.

The Hebrew wording behind this half of the verse is genuinely uncertain.

💪 Strong likely points to diligence not muscle

💰 Retain riches means keeping wealth once gained

📜 Some ancient versions read this line differently

📖 The verse compares what different people keep

## 🔁 The Merciful Man Doeth Good To His Own Soul

"Merciful" means showing kindness to people who could not force it or repay it.

"Doeth good to his own soul" means kindness actually benefits the giver, not only the receiver.

This turns a common assumption backward, mercy is not just costly generosity.

Being merciful is shown here as a way of caring for oneself.

🕊️ Merciful means kindness that cannot be forced

🔁 Kindness benefits the giver too

🔄 This turns a common assumption backward

📖 Mercy is shown as self care

## 🔪 He That Is Cruel Troubleth His Own Flesh

"Cruel" means someone who deliberately causes pain or harm to others.

"Troubleth his own flesh" means cruelty circles back to actually hurt the cruel person too.

This is the mirror opposite of the merciful man in the same verse.

How a person treats others is shown here as inseparable from their own wellbeing.

🔪 Cruel means deliberately causing harm to others

🔄 Cruelty circles back to hurt the cruel person

⚖️ This mirrors the merciful man exactly

📖 Treatment of others shapes one's own wellbeing

## 🎭 The Wicked Worketh A Deceitful Work

"Deceitful work" means effort built on lies or dishonest gain.

"Worketh" suggests real, ongoing labor, not one isolated bad choice.

This verse compares two kinds of labor, one built on deception and one built on truth.

Effort itself is not the point, what the effort is built on matters more.

🎭 Deceitful work means effort built on lies

🔁 Worketh suggests ongoing labor not one act

⚖️ The verse compares two kinds of labor

📖 What effort is built on matters most

## 🌱 To Him That Soweth Righteousness Shall Be A Sure Reward

"Soweth" pictures planting seed, an image for actions that grow into a result later.

"Righteousness" here means living rightly toward God and other people.

"Sure reward" means a reliable, guaranteed outcome, unlike the deceitful work in the first half of the verse.

One kind of labor produces a harvest that lasts, the other does not.

🌱 Soweth pictures planting for a later result

🙏 Righteousness means living rightly toward God and people

✅ Sure reward means a reliable, guaranteed outcome

📖 One labor produces a lasting harvest

## 🛤️ As Righteousness Tendeth To Life

"Tendeth" means moves steadily toward, already seen earlier in chapter ten.

"Life" here means real flourishing, not merely staying alive.

Righteousness is pictured as a direction a person travels, not a single decision.

Where that direction leads matters more than any one step along it.

🌱 Tendeth means moving steadily toward something

🌿 Life here means real flourishing

🛤️ Righteousness is a direction, not one choice

📖 The direction matters more than one step

## 🏃 He That Pursueth Evil Pursueth It To His Own Death

"Pursueth" means actively chasing after something, not simply stumbling into it.

This person is not tempted once, they are pictured deliberately running toward evil.

"Death" here again pictures ruin, the opposite destination from the life just named.

Chasing evil and chasing life are pictured as two roads leading in opposite directions.

🏃 Pursueth means actively chasing something

🎯 This person deliberately runs toward evil

⚰️ Death here again pictures ruin

📖 Evil and life lead opposite directions

# Proverbs 11:20-22
# 💍 What The LORD Delights In
---
## 🌀 They That Are Of A Froward Heart Are Abomination To The LORD

"Froward" means stubborn and deliberately twisted, already seen back in chapter ten.

"Heart" here means the center of a person's will, not just their emotions.

"Abomination" is the same strong word used for the false balance back in verse one.

A twisted inner life is treated with the same seriousness here as dishonest business.

🌀 Froward means stubborn and deliberately twisted

❤️ Heart means the center of a person's will

🤢 Abomination repeats the word from verse one

📖 A twisted inner life is taken seriously

## 🙌 Such As Are Upright In Their Way Are His Delight

"Upright in their way" means honest and consistent across a whole pattern of living.

"Delight" repeats the word used for the just weight back in verse one.

This verse closes the loop, tying the chapter's opening image back to the human heart.

What began as a warning about scales ends here as a statement about character.

🛤️ Upright in their way means honest living

❤️ Delight repeats the word from verse one

🔄 This closes the loop with the chapter's opening

📖 Scales and character carry the same lesson

## 🤝 Though Hand Join In Hand, The Wicked Shall Not Be Unpunished

"Hand join in hand" was likely an idiom for making an alliance or a solemn agreement.

The picture is of wicked people banding together, perhaps for safety in numbers.

Even united, this proverb insists their wrongdoing will still catch up with them.

No amount of teamwork among the wicked cancels real consequences.

🤝 Hand join in hand pictures forming an alliance

👥 Wicked people are pictured banding together

⚖️ Their wrongdoing will still catch up

📖 Teamwork among evil cancels no consequence

## 🌱 The Seed Of The Righteous Shall Be Delivered

"Seed" here means descendants, a person's children and family line.

This promise stretches beyond one person's own lifetime into the next generation.

Deliverance is shown extending outward, protecting a whole family's future.

A righteous life is pictured here as leaving behind real, lasting protection for others.

🌱 Seed here means descendants and family line

⏳ This promise reaches beyond one lifetime

👨‍👩‍👧 Deliverance extends to a whole family

📖 A righteous life protects those who come after

## 💍 As A Jewel Of Gold In A Swine's Snout

A "jewel of gold" was a genuinely valuable ornament in this culture.

"Swine" were considered unclean animals in Israel, never kept as pets or treated as fine.

The picture is jarring on purpose, something precious wasted on something that cannot value it.

Swine also could not keep such an ornament clean or safe in the mud they lived in.

💍 A jewel of gold was genuinely valuable

🐷 Swine were considered unclean in Israel

😳 The picture is jarring on purpose

📖 Something precious wasted where it cannot be valued

## 🧠 So Is A Fair Woman Which Is Without Discretion

"Fair" here means physically beautiful, an outward quality.

"Discretion" means good judgment, wisdom applied to real choices.

This proverb is not attacking beauty, it names a mismatch between appearance and character.

Outward beauty without inner wisdom is compared here to real value placed somewhere it cannot be honored.

😍 Fair means physically beautiful

🧠 Discretion means good judgment applied to choices

⚖️ This names a mismatch, not beauty itself

📖 Value without wisdom is like gold in mud

# Proverbs 11:23-27
# 🌾 The Generous Hand And The Hoarding Hand
---
## ❤️ The Desire Of The Righteous Is Only Good

"Desire" here means what a righteous person actually wants deep down.

"Only good" means their deepest wants are consistently aimed at what is right.

This is a statement about the direction of a person's whole inner life.

A righteous life is shown here flowing from righteous wanting, not just righteous doing.

❤️ Desire means what a person wants deep down

✅ Only good means wanting what is right

🧭 This is about the direction of a life

📖 Righteous doing flows from righteous wanting

## ⚖️ The Expectation Of The Wicked Is Wrath

"Expectation" here means what the wicked person is ultimately heading toward.

"Wrath" means God's judgment, the same idea from the day of wrath in verse four.

This contrasts directly with the good the righteous desire in the first half of the verse.

What a person wants and what they end up getting are shown lining up in the end.

🎯 Expectation means what they are heading toward

⚖️ Wrath means God's judgment, echoing verse four

🔄 This contrasts with the righteous person's good

📖 Wanting and outcome line up in the end

## 🌾 There Is That Scattereth, And Yet Increaseth

"Scattereth" pictures generous giving, like a farmer scattering seed widely.

"Increaseth" means this generous person's own resources actually grow, not shrink.

This is a genuine surprise on purpose, giving freely leading to more instead of less.

Generosity is shown here working against the world's normal math.

🌾 Scattereth pictures generous giving like sowing seed

📈 Increaseth means their resources actually grow

😮 This is a real surprise on purpose

📖 Generosity works against normal math here

## 📉 There Is That Withholdeth More Than Is Meet, But It Tendeth To Poverty

"Withholdeth more than is meet" means holding back more than is right or fair.

"Meet" here means fitting or proper, an old word still used that way in some hymns.

"Tendeth to poverty" means this hoarding pattern moves a person toward lack, not security.

The proverb pairs two people who both handle money, only one ends up secure.

🔒 Withholdeth more than meet means unfair hoarding

⚖️ Meet here means fitting or proper

📉 Tendeth to poverty means hoarding leads to lack

📖 Only one of the two ends up secure

## 🍞 The Liberal Soul Shall Be Made Fat

"Liberal" here means generous, freely giving to others.

"Made fat" was a picture of prosperity and health in this culture, not a negative image.

This continues the same idea from the verse before it, generosity leading to genuine gain.

A generous life is pictured here as a well fed, thriving life.

🎁 Liberal means generous, freely giving to others

🍞 Made fat pictured prosperity in this culture

🔁 This continues the idea from the verse before

📖 A generous life is pictured as thriving

## 💧 He That Watereth Shall Be Watered Also Himself

"Watereth" pictures someone pouring out for another person's growth, like watering a plant.

"Watered also himself" means that same generosity circles back to refresh the giver.

The image fits a farming culture where water was scarce and precious.

Giving what someone needs is shown here returning to meet the giver's own needs.

💧 Watereth pictures pouring out for another's growth

🔄 Watered also himself means it circles back

🏜️ Water was scarce and precious in this culture

📖 Giving returns to meet the giver's own needs

## 🌾 He That Withholdeth Corn, The People Shall Curse Him

"Corn" here means grain in general, the basic food supply of the region.

"Withholdeth" pictures someone hoarding grain during a shortage to drive up the price.

"Curse him" means the community openly resents and condemns this kind of hoarding.

This names a very specific, real world form of greed familiar to the first readers.

🌾 Corn here means grain, the basic food supply

🔒 Withholdeth pictures hoarding during a shortage

😠 Curse him means the community condemns this

📖 This names a real world form of greed

## 🙌 Blessing Shall Be Upon The Head Of Him That Selleth It

"Selleth it" means releasing grain into the market at a fair time instead of hoarding it.

"Blessing upon the head" pictures visible favor resting on that person, the same image seen in chapter ten.

This person is praised here for meeting the community's need instead of exploiting it.

The chapter keeps returning to how one person's choices affect the wider community.

🌾 Selleth it means releasing grain to market

🙌 Blessing upon the head pictures visible favor

🤝 This person meets real need, not greed

📖 The chapter keeps returning to community impact

## 🔍 He That Diligently Seeketh Good Procureth Favour

"Diligently seeketh" means actively pursuing something, not passively hoping for it.

"Procureth favour" means this pursuit actually earns real goodwill from others.

Doing good is shown here as something a person can pursue on purpose, like a goal.

Favour is presented here as a natural result of consistent, intentional goodness.

🔍 Diligently seeketh means actively pursuing something

🤝 Procureth favour means earning real goodwill

🎯 Good is shown as a goal to pursue

📖 Favour follows consistent intentional goodness

## 😈 He That Seeketh Mischief, It Shall Come Unto Him

"Mischief" here means deliberate harm or wrongdoing, the same word seen back in chapter ten.

"It shall come unto him" means the trouble a person looks for eventually finds them.

This closes the verse with the same pattern seen throughout the chapter, actions circling back on their doer.

What a person actively seeks tends to become what they actually get.

😈 Mischief means deliberate harm, echoing chapter ten

🔄 Trouble they sought eventually finds them

🌀 This repeats the chapter's pattern again

📖 What someone seeks becomes what they get

# Proverbs 11:28-31
# 🌳 Riches That Fall, Fruit That Lasts
---
## 💰 He That Trusteth In His Riches Shall Fall

"Trusteth in his riches" means treating wealth as the real source of security.

"Fall" pictures a sudden, real collapse, not simply losing status.

This does not condemn having money, it condemns depending on it instead of God.

Riches are shown here as a foundation that cannot actually hold a person up.

💰 Trusteth in riches means treating wealth as security

🥾 Fall pictures a sudden real collapse

⚖️ This condemns depending on money, not owning it

📖 Riches cannot actually hold a person up

## 🌿 The Righteous Shall Flourish As A Branch

"Flourish as a branch" pictures healthy, visible, ongoing growth, like a living tree.

This is the opposite image of the collapse just named, one thing falls, the other keeps growing.

A branch stays green because it stays connected to a living root, not through its own effort alone.

The righteous life is pictured here as something alive and continuing, not a one time success.

🌿 Flourish as a branch pictures healthy ongoing growth

🔄 This is the opposite of that fall

🌳 A branch stays green through its root

📖 Righteousness is pictured as continuing life

## 🏠 He That Troubleth His Own House Shall Inherit The Wind

"Troubleth his own house" means bringing conflict or ruin onto one's own family.

"Inherit the wind" means ending up with nothing solid at all, wind cannot be grasped or kept.

This is a strong image of wasted effort, working hard and gaining nothing real.

"House" here was a person's whole household, including servants and dependents, not just relatives.

🏠 Troubleth his own house means ruining family

💨 Inherit the wind means ending up with nothing

🤲 This pictures effort that gains nothing real

📖 House meant a whole household, not just relatives

## 🧑‍🤝‍🧑 The Fool Shall Be Servant To The Wise Of Heart

"Servant" here pictures being placed under someone else's authority and direction.

This does not necessarily describe literal slavery in every case, though it could.

More broadly, it means a foolish life ends up depending on wiser people to function.

Wisdom is shown here leading to real influence, folly leading to real dependence.

🧑‍🤝‍🧑 Servant pictures being placed under authority

📜 This does not always mean literal slavery

🤷 Folly ends up depending on wiser people

📖 Wisdom leads to influence, folly to dependence

## 🌳 The Fruit Of The Righteous Is A Tree Of Life

"Fruit" here means the visible results a righteous life produces, echoing the tree imagery from chapter ten.

"Tree of life" recalls the tree from the garden of Eden, a symbol of life and blessing.

A righteous person's life is pictured here as something that gives life to others around them.

This is a high claim, ordinary righteousness reflecting Eden's own imagery.

🍎 Fruit means the visible results a life produces

🌳 Tree of life recalls the garden of Eden

🌿 A righteous life gives life to others

📖 This ties ordinary righteousness to Eden's imagery

## 🧑‍🤝‍🧑 He That Winneth Souls Is Wise

"Winneth souls" means helping guide other people toward wisdom and God.

This proverb ties wisdom directly to its effect on other people, not only personal growth.

A truly wise life naturally influences others toward that same wisdom.

This closes the fruit picture from the first half of the verse, wisdom itself becomes fruit that spreads.

🧑‍🤝‍🧑 Winneth souls means guiding others toward wisdom

🌱 Wisdom is tied to its effect on others

🔁 Real wisdom naturally spreads to others

📖 Wisdom becomes fruit that spreads to others

## 👀 Behold, The Righteous Shall Be Recompensed In The Earth

"Behold" signals that something important and worth pausing on is about to be said.

"Recompensed" means receiving what is actually due, whether reward or consequence.

"In the earth" means within this present life, not only in some distant future.

Even righteous people face real consequences here, this is not a promise of an easy life.

👀 Behold signals something important is coming

⚖️ Recompensed means receiving what is due

🌍 In the earth means within this present life

📖 Even the righteous face real consequences here

## 📈 Much More The Wicked And The Sinner

"Much more" makes an argument from the lesser case to the greater one.

If even the righteous face real consequences, the wicked can expect them even more certainly.

This verse closes the whole chapter's theme, choices lead to real outcomes in this life.

The chapter that opened with a rigged scale ends by weighing every life honestly.

📈 Much more argues from lesser case to greater

⚖️ If the righteous face this, wicked face more

🔒 This closes the chapter's theme of real outcomes

📖 The chapter ends by weighing every life honestly
`.trim();

export const PROVERBS_ELEVEN_PERSONAL_SECTIONS = parseProverbsElevenRawNotes(PROVERBS_ELEVEN_RAW_NOTES);
