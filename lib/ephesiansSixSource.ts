export type EphesiansSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEphesiansSixRawNotes(rawText: string): EphesiansSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EphesiansSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ephesians\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ephesians 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ephesians\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Ephesians\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ephesians 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ephesians 6:${startVerse}` : `Ephesians 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ephesians 6 sections, received " + sections.length);
  }

  return sections;
}

const EPHESIANS_SIX_RAW_NOTES = `# Ephesians 6:1-4
# 👨‍👩‍👧 Children And Parents
---
## 👂 Children, Obey Your Parents In The Lord

"In the Lord" means this command grows out of faith, not just family pressure.

Paul speaks straight to the children sitting in the service, not only the adults.

Obedience here is tied to belonging to Christ, not fear of punishment.

A child who knows the Lord has a reason to obey beyond simply avoiding trouble.

👂 Paul speaks directly to children

🙏 In the Lord ties obedience to faith

❤️ The reason is belonging, not fear

📖 Faith gives obedience its real reason

## 📜 Honour Thy Father And Mother

This command is not something Paul invented for the church.

He is quoting the fifth of the Ten Commandments word for word.

Out of all ten commandments, this is the only one that comes with a promise attached.

God ties long life to the simple act of honoring parents.

📜 Paul quotes the fifth commandment

🔢 It is the only one with a promise

👴 Honor here means lasting respect

📖 God ties life to honoring parents

## ⚖️ Thou Mayest Live Long On The Earth

This promise is not a guarantee that every obedient child lives to be old.

It describes a general pattern, not an exact formula.

Homes built on respect for parents tend to raise people who build stable, lasting lives.

The land in view was first the promised land of Israel, later any land where God's people live.

⚖️ Not a strict guarantee for everyone

🏠 Respect at home builds stability

🌍 Originally pointed to the promised land

📖 Honor shapes a lasting kind of life

## 🔥 Fathers, Provoke Not Your Children To Wrath

"Provoke" here means to stir up anger through unfair or harsh treatment.

Paul turns the instruction around and speaks straight to the fathers.

Authority in the home is not a license to rule without care.

A father can wound a child's spirit just as easily as a stranger can.

🔥 Provoke means stirring up anger

👨 Paul now addresses the fathers

⚖️ Authority is not a license to harm

📖 Fathers can wound as easily as help

## 🌱 Nurture And Admonition Of The Lord

"Nurture" means the patient training and care a parent provides day by day.

"Admonition" means correction given with words, a warning aimed at change.

Both come from the Lord, meaning they follow God's own pattern of raising His people.

Fathers are told to raise children the way God raises His own family.

🌱 Nurture means patient daily training

🗣️ Admonition means correction in words

🙏 Both patterns come from the Lord

📖 Parenting mirrors how God raises us

# Ephesians 6:5-9
# 🧑‍🌾 Servants And Masters
---
## 🧑‍🌾 Be Obedient To Them That Are Your Masters

"According to the flesh" marks this master as a human authority, not God Himself.

In Paul's world, many believers lived and worked inside the system of slavery.

Paul is not endorsing slavery as right, he is instructing people already living inside it.

He speaks to real believers facing a real, difficult situation.

🧑‍🌾 According to the flesh means a human master

⛓️ Many believers lived inside slavery

🚫 Paul does not endorse the system

📖 He speaks into a real situation

## 😨 In Singleness Of Your Heart

"Fear and trembling" here means serious, careful effort, not literal terror.

"Singleness of heart" means undivided sincerity, no secret resentment hiding behind obedience.

"As unto Christ" reframes the whole task, the real audience is Christ, not the master watching.

The task stays the same, but the meaning behind it changes completely.

😨 Fear and trembling means careful effort

❤️ Singleness means undivided sincerity

🙏 As unto Christ changes the real audience

📖 The task stays, the meaning changes

## 👀 Not With Eyeservice, As Menpleasers

"Eyeservice" means work performed only while someone is watching.

"Menpleasers" means people whose main goal is looking good to other people.

Paul contrasts that fake effort with work done from the heart, for God's sake.

The difference is not how the work looks, it is why the work gets done.

👀 Eyeservice means working only when watched

🎭 Menpleasers means performing for approval

❤️ From the heart means the real motive

📖 Why work gets done matters most

## 😊 With Good Will Doing Service

"Good will" means a willing, glad attitude, not grudging compliance.

Paul already named the motive in the verse before this one.

Here he names the attitude that motive is supposed to produce.

God sees the willingness behind the work, not only the finished task.

😊 Good will means a willing attitude

🔁 Attitude flows from the motive already named

👁️ God sees willingness, not just results

📖 Unnoticed work still matters to God

## ⚖️ Whether He Be Bond Or Free

God rewards good work no matter the social rank of the person doing it.

"Bond" means a slave, "free" means someone with full legal rights.

In the ancient world those two statuses were worlds apart, yet God treats the reward the same.

The system of the day could not touch how God saw the heart behind the work.

⚖️ God rewards good work equally

⛓️ Bond means a slave

🕊️ Free means someone with full legal rights

📖 God's view ignored human rank

## 🔁 Ye Masters, Do The Same Things Unto Them

Paul now turns the same standard back onto the masters.

"The same things" means masters owe their servants good will and sincerity too.

"Forbearing threatening" means masters must drop the constant threat of punishment as a management style.

Every master answers to a Master of his own in heaven, who plays no favorites at all.

🔁 The same standard applies to masters

🚫 Forbearing threatening means dropping constant threats

☁️ Every master has a Master in heaven

📖 God shows no favoritism to rank

# Ephesians 6:10-13
# 🛡️ The Whole Armour Of God
---
## 💪 In The Power Of His Might

This strength is not Paul telling people to simply try harder.

"In the Lord" means the source of the strength sits outside the person entirely.

"His might" points back to the same power that raised Christ from the dead.

Paul already named that same power earlier in this letter.

Paul is preparing readers for a real fight, not a motivational pep talk.

💪 Not a call to try harder

🙏 The source is the Lord, not self

⚡ Same power that raised Christ

📖 Paul prepares readers for a real fight

## ⚔️ Put On The Whole Armour Of God

"Armour" was the full protective gear a Roman soldier wore into battle.

Roman soldiers were a familiar, everyday sight to everyone reading this letter.

Paul borrows that image to describe spiritual protection God provides, piece by piece.

"The whole" matters, a soldier missing even one piece stood exposed.

⚔️ Armour means a soldier's protective gear

🪖 Roman soldiers were a familiar sight

🙏 God provides spiritual protection the same way

📖 Missing one piece leaves a soldier exposed

## 🎭 The Wiles Of The Devil

"Wiles" means tricks, traps, and clever schemes rather than open, honest attack.

The devil is pictured here as a strategist, not a brute force opponent.

"Stand" is a defensive word, the goal is holding ground, not charging forward.

Recognizing a trick is often the hardest part of resisting it.

🎭 Wiles means tricks and schemes

🧠 The devil is a strategist here

🛡️ Stand means holding ground

📖 Spotting the trick is half the battle

## 🧍 We Wrestle Not Against Flesh And Blood

"Flesh and blood" means other human beings, the people someone might blame for their problems.

Paul says the real battle is not against them at all.

"Principalities" and "powers" point to organized spiritual forces of evil, not random chaos.

"Rulers of the darkness" and "spiritual wickedness in high places" describe evil at the highest level.

This evil operates behind what people can actually see.

🧍 Flesh and blood means other people

🚫 They are not the real enemy

👑 Principalities means organized spiritual forces

📖 The real battle is unseen and cosmic

## 📅 Withstand In The Evil Day

"The evil day" refers to a specific moment of crisis or testing, not every ordinary day.

Paul repeats the command from the verse before, armor is not a one time decision.

"Withstand" carries the same defensive idea as "stand" earlier, holding a position under pressure.

Preparation happens before the crisis, not during it.

📅 The evil day means a crisis moment

🔁 Paul repeats the armor command

🛡️ Withstand means holding under pressure

📖 Preparation happens before the crisis

# Ephesians 6:14-17
# ⚔️ Every Piece Of Armour
---
## 🪢 Loins Girt About With Truth

"Girt" means wrapped tightly and secured, like a belt cinched around the waist.

Roman soldiers wore a wide belt that held the rest of the armor in place.

That belt also kept loose clothing from catching during a fight.

Truth plays that same holding role in a believer's life.

Without truth secured first, every other piece of armor shifts loose under pressure.

🪢 Girt means wrapped tightly, secured

🧷 The belt held the rest of the armor

✅ Truth plays that same holding role

📖 Everything else shifts loose without it

## 🛡️ The Breastplate Of Righteousness

A "breastplate" covered the chest and vital organs, the part of the body most exposed in close combat.

Righteousness guards the heart in the same way, protecting a person's integrity when temptation strikes close.

This is not sinless perfection, it is a settled commitment to living rightly before God.

A soldier without a breastplate could survive a graze but not a direct hit.

🛡️ Breastplate covered the chest and heart

❤️ Righteousness guards integrity the same way

🙏 Not perfection, a settled commitment

📖 Direct hits need real protection

## 🥾 The Preparation Of The Gospel Of Peace

"Shod" means fitted with footwear made for solid footing in rough terrain.

Roman soldiers wore sturdy sandals with studded soles built for long marches and steady ground in battle.

"The gospel of peace" gives a believer that same steady footing under pressure.

Good footwear decided whether a soldier could even stay standing in a fight.

🥾 Shod means fitted with sturdy footwear

🪖 Roman sandals gave steady footing

🕊️ The gospel gives that same stability

📖 Footing decides who stays standing

## 🔥 The Shield Of Faith

Roman shields were large, heavy wooden boards covered in leather, big enough to cover most of a soldier's body.

Soaking that leather in water let the shield smother burning arrows on contact instead of letting them catch fire.

"Fiery darts" pictures sudden temptations or doubts, the kind meant to catch a person off guard.

Faith works the same way, meeting an attack before it ever reaches the body.

🔥 Roman shields were large and wide

💧 Wet leather smothered burning arrows

😈 Fiery darts means sudden temptation

📖 Faith stops an attack before it lands

## 🪖 The Helmet Of Salvation

A helmet protected the head, the single most fatal target on a soldier's body.

Salvation functions the same way for the mind, guarding a person's thinking against despair and doubt.

Knowing where someone stands with God protects how they think under pressure, not just how they feel.

A clear mind holds up through a battle that a confused one cannot survive.

🪖 A helmet protected the most fatal target

🧠 Salvation guards the mind, not just the heart

😌 Clear thinking survives pressure better

📖 Confidence in God steadies the mind

## 🗡️ The Sword Of The Spirit

Every other piece listed so far was defensive, built to block or absorb an attack.

The sword is the one offensive weapon in the whole list.

"The word of God" is named directly here as that weapon, not a vague feeling.

Scripture itself is the tool a believer uses to actively fight back, not just survive.

🗡️ The sword is the only offensive piece

📖 The word of God is named directly

⚔️ Scripture is a weapon, not decoration

➡️ It is for fighting back, not just surviving

# Ephesians 6:18-20
# 🙏 Prayer And Paul's Request
---
## 🙏 Praying Always With All Prayer And Supplication In The Spirit

"Supplication" means urgent, specific requests, different from general praise or thanks.

"Always" does not mean nonstop talking, it means an ongoing readiness to pray whenever the need arises.

"In the Spirit" means prayer shaped and led by the Holy Spirit, not just a person's own words.

Prayer here is not a seventh piece of armor.

It is how a soldier stays connected to the one supplying the armor.

🙏 Supplication means urgent specific requests

🔁 Always means ongoing readiness, not nonstop talk

🕊️ In the Spirit means Spirit led prayer

📖 Prayer connects the soldier to God

## 👀 Watching Thereunto With All Perseverance

"Watching" means staying alert, the same word used for a soldier on guard duty through the night.

"Perseverance" means refusing to quit even when an answer takes a long time to arrive.

Paul widens the request beyond himself to pray for "all saints."

That means the whole church, not just his own circle.

Prayer here looks outward, not only inward.

👀 Watching means staying alert like a guard

⏳ Perseverance means not quitting early

👪 All saints means the whole church

📖 Prayer looks outward, not just inward

## 🏛️ An Ambassador In Bonds

An "ambassador" represents a king or kingdom in a foreign land, speaking with that ruler's full authority.

Paul calls himself Christ's ambassador while sitting in prison, a striking contradiction on purpose.

Ambassadors in the ancient world were normally treated with special protection and respect, never chained.

Paul's chains show the cost of representing a kingdom this world does not yet recognize.

🏛️ Ambassador means an official royal representative

⛓️ Paul says this from inside prison

👑 He represents Christ's kingdom, not Rome's

📖 His chains show the cost of that role

## 🔓 Open My Mouth Boldly

"The mystery" refers to the truth Paul already explained earlier in this letter.

Gentiles and Jews now belong to God's family as one body.

Paul does not ask for release from prison first.

He asks for boldness to keep speaking the gospel clearly, chains or no chains.

His priority stays fixed on the message, not his own comfort.

🔓 The mystery recalls Paul's earlier teaching

🧑‍🤝‍🧑 Jews and Gentiles now belong as one

🗣️ He asks for boldness, not release

📖 The message mattered more than comfort

# Ephesians 6:21-24
# ✉️ Closing Words
---
## 🧑‍🤝‍🧑 Tychicus, A Beloved Brother And Faithful Minister

Tychicus was a real traveling companion of Paul, mentioned in several of his other letters as well.

He was the one trusted to physically carry this letter to the church at Ephesus.

Calling him "faithful minister" means the church could trust him fully.

He was more than a mail carrier, he served the gospel itself.

Paul relied on real people to deliver real letters across long distances.

🧑‍🤝‍🧑 Tychicus was a real traveling companion

✉️ He carried this letter to Ephesus

🙏 Faithful minister means a true gospel servant

📖 Real people carried the gospel by hand

## 📨 That He Might Comfort Your Hearts

Paul sends Tychicus for two reasons, information and comfort.

The Ephesians could not simply check news online or call Paul on the phone.

A trusted messenger was often the only way a church far away could get real news.

That included knowing how their friend in prison was really doing.

Knowing Paul's situation firsthand was meant to steady their hearts, not just satisfy curiosity.

📨 Two reasons, information and comfort

🚫 No phones or instant news back then

🧑‍🤝‍🧑 A trusted messenger closed that distance

📖 Comfort came from knowing the truth

## 🔁 Peace Be To The Brethren, And Love With Faith

Paul closes the letter the way he opened it in chapter one, naming peace as a gift from God.

"Love with faith" pairs two things Paul has stressed through this whole letter.

Genuine love runs alongside real trust in God.

Both gifts are credited to their actual source, God the Father and the Lord Jesus Christ together.

Nothing in this closing is a generic farewell.

🔁 Peace echoes the letter's opening

❤️ Love with faith pairs two key themes

🙏 Both come from Father and Son together

📖 Even the closing carries real meaning

## ❤️ Love Our Lord Jesus Christ In Sincerity

"Sincerity" means a love free of pretending, without hidden motives or performance.

Paul's very last word is grace, the same word that opened this letter back in chapter one.

The whole letter started with grace and ends with grace, framing everything written in between.

"Amen" simply means let it be so, a final seal on everything Paul has said.

❤️ Sincerity means love without pretending

🔁 Grace opened and closes the letter

🙌 Amen means let it be so

📖 Grace frames the whole book
`.trim();

export const EPHESIANS_SIX_PERSONAL_SECTIONS = parseEphesiansSixRawNotes(EPHESIANS_SIX_RAW_NOTES);
