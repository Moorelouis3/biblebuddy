export type FirstThessaloniansOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstThessaloniansOneRawNotes(rawText: string): FirstThessaloniansOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstThessaloniansOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Thessalonians\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Thessalonians 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Thessalonians\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Thessalonians\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Thessalonians 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Thessalonians 1:${startVerse}` : `1 Thessalonians 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 1 Thessalonians 1 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_THESSALONIANS_ONE_RAW_NOTES = `# 1 Thessalonians 1:1-3
# 🙏 Grace, Peace, And A Thankful Prayer
---
## ✉️ Paul, And Silvanus, And Timotheus

Paul did not write this letter alone.

Silvanus is another name for Silas.

Silas was Paul's companion on his journey through Macedonia.

Timotheus is the King James spelling of Timothy.

Timothy was a younger worker Paul trained and trusted.

All three men helped start this church together in Thessalonica.

✉️ Paul writes with two named companions

🧑‍🤝‍🧑 Silvanus is another name for Silas

🎓 Timotheus is the King James Timothy

📖 All three helped start this church

## 🤝 Grace Be Unto You, And Peace

This greeting joins two different worlds into one sentence.

Grace was the normal word Greek letters opened with.

Peace was the normal word Hebrew letters opened with.

Paul puts both together on purpose.

Jewish and Gentile believers in this church could each hear something familiar.

The gospel was never meant for only one culture.

🤝 Grace was a normal Greek greeting

🕊️ Peace was a normal Hebrew greeting

🌍 Paul joins both on purpose

📖 This church included more than one culture

## 🙏 We Give Thanks To God Always For You All

This opens nearly every one of Paul's letters to a healthy church.

Thanksgiving comes before any correction or complaint.

Always and all are not small words here.

Paul is not thanking God for one person or one moment.

He is thanking God for the whole church, every time he prays.

🙏 Thanksgiving opens the letter first

⏳ Always means this was constant

👥 All means the whole church

📖 Gratitude comes before any correction

## 📿 Making Mention Of You In Our Prayers

Paul is describing an actual habit, not a passing feeling.

He brought this church's name before God by name, on purpose.

Planting a church did not end Paul's involvement with it.

He kept praying for people he could no longer see in person.

📿 This describes a real habit

🗣️ Paul prayed for them by name

🚶 Distance did not end his care

📖 Prayer kept the relationship alive

## 🛠️ Your Work Of Faith, And Labour Of Love

Faith and love are not only feelings in this verse.

Faith produces work, something done because it is believed.

Love produces labour, a harder word that means heavy, tiring effort.

Real faith and real love always show up as action.

🛠️ Faith produces real work

💪 Labour means heavy, tiring effort

❤️ Love was shown through effort

📖 Faith and love always show up as action

## ⏳ Patience Of Hope In Our Lord Jesus Christ

Patience here does not mean quietly waiting around.

It means steady endurance through pressure that does not quit.

Hope is not wishful thinking in the Bible.

Hope is confident expectation, aimed at Jesus Christ himself.

This church kept enduring because of where their hope was aimed.

⏳ Patience means steady endurance

🎯 Hope means confident expectation

✝️ Their hope was aimed at Christ

📖 Endurance held because hope was certain

# 1 Thessalonians 1:4-6
# ⚡ A Gospel That Came With Power
---
## ❤️ Knowing, Brethren Beloved

Brethren means fellow believers, not only blood relatives.

Beloved means dearly loved, not a polite formality.

Paul had real affection for people he had only known a short time.

This church had already suffered for their faith.

Paul leads with love before he says anything else.

👨‍👩‍👧 Brethren means fellow believers

❤️ Beloved means dearly loved

⏱️ Paul loved them after only a short time

📖 Love comes before anything else he says

## 🎯 Your Election Of God

Election means being chosen, not earning a spot.

God did the choosing before they did anything to deserve it.

This is not about who is smarter or better.

It is about who God set his love on first.

🎯 Election means being chosen

🙅 It was not earned

❤️ God chose them first

📖 His love moved before their effort

## 🗣️ Our Gospel Came Not Unto You In Word Only

Word only would mean just talk, with nothing behind it.

Paul is ruling that out immediately.

The message he brought was never just information to hear.

Something more than words showed up when he preached.

🗣️ Word only would mean empty talk

🚫 Paul rules that out

💥 Something more than talk arrived

📖 The gospel was never just information

## 💥 Also In Power, And In The Holy Ghost, And In Much Assurance

Power points to real changes the gospel caused in their lives.

The Holy Ghost is the Holy Spirit, God's own presence at work.

Much assurance means Paul and his team preached with full confidence, not guesswork.

All three worked together to make the message land.

💥 Power means real change happened

🕊️ Holy Ghost means God's own presence

💯 Assurance means full confidence, not guessing

📖 All three worked together

## 👀 What Manner Of Men We Were Among You For Your Sake

Paul points to his own daily conduct as proof.

He is not asking them to simply take his word for it.

He is asking them to remember how he actually lived among them.

For your sake means his conduct was aimed at their good, not his own comfort.

👀 Paul points to his own conduct

🧠 He asks them to remember, not just believe

🎁 For your sake means it served them

📖 His life backed up his words

## 👣 Ye Became Followers Of Us, And Of The Lord

Followers here means more than fans or admirers.

The word pictures someone copying another person's example closely.

The church first watched Paul, then watched the Lord through Paul's example.

Imitation was the real goal, not just agreement.

👣 Followers means imitators, not fans

👀 They copied what they watched

✝️ Paul's example pointed to the Lord

📖 Imitation was the real goal

## ⚔️ Received The Word In Much Affliction, With Joy Of The Holy Ghost

Affliction means real suffering, likely public pressure or persecution.

Joy here is not the absence of pain.

It is joy that exists right alongside the pain.

The Holy Ghost supplied a joy that suffering could not cancel out.

⚔️ Affliction means real suffering

😊 Joy did not erase the pain

🕊️ The Holy Ghost supplied that joy

📖 Joy and suffering existed together

# 1 Thessalonians 1:7-8
# 📣 A Faith Heard Everywhere
---
## 📝 Ye Were Ensamples To All That Believe

Ensamples is the King James spelling of examples.

It means a pattern other people could copy.

This church was not just surviving its hardship quietly.

Other believers were watching them as a model to follow.

📝 Ensamples means examples

🎯 It means a pattern to copy

👀 Other believers were watching them

📖 Their faith became a model

## 🗺️ In Macedonia And Achaia

Macedonia and Achaia were the two main regions of what is now Greece.

Macedonia sat in the north, where Thessalonica itself was located.

Achaia sat in the south, home to the city of Corinth.

Together the two names cover nearly the whole region.

🗺️ Macedonia and Achaia cover Greece

⬆️ Macedonia is the northern region

⬇️ Achaia is the southern region

📖 Their example reached a whole region

## 📯 From You Sounded Out The Word Of The Lord

Sounded out pictures a trumpet blast, loud and carrying far.

This church did not need Paul to advertise them.

News of their faith was already spreading on its own.

Thessalonica sat on a major trade road.

That road only helped the news travel even faster.

📯 Sounded out means a loud blast

🚫 Paul did not need to advertise

📢 Their faith spread on its own

📖 A trade city helped news travel

## 🧭 Your Faith To Godward Is Spread Abroad

"Godward" means aimed toward God, facing him in devotion.

This is not describing where they lived.

It describes where their faith was pointed.

Spread abroad means the news had already traveled far beyond their own city.

🧭 Godward means aimed toward God

📍 It describes direction, not location

🌍 Spread abroad means far beyond their city

📖 Their devotion became widely known

## 🤐 We Need Not To Speak Any Thing

Paul is not bragging about this church to strangers.

He does not need to say much himself.

Their own reputation already arrived before he did.

A good report needs no extra promotion.

🤐 Paul had nothing left to add

🗣️ He did not need to say much

📨 Their reputation arrived before he did

📖 A good report needs no promotion

# 1 Thessalonians 1:9-10
# 🙌 Turning From Idols To Wait For Jesus
---
## 🚪 What Manner Of Entering In We Had Unto You

People outside the church were describing Paul's actual visit.

Entering in means how Paul first arrived and behaved among them.

Strangers were reporting on his conduct, not just his message.

They reported it back to other churches.

🚪 Entering in means his first visit

👀 Strangers noticed how he behaved

🗣️ They reported it to other churches

📖 His conduct became part of the story

## 🔄 Ye Turned To God From Idols To Serve The Living And True God

Turned describes a complete change of direction, not a small adjustment.

Most cities in the Roman world worshiped many different gods and idols.

Idols were statues or images people treated as real gods.

The living and true God stands in direct contrast to lifeless statues.

🔄 Turned means a complete change

🗿 Idols were statues treated as gods

🌍 Most Roman cities worshiped many gods

📖 The living God stands apart from idols

## ⏳ To Wait For His Son From Heaven

Waiting here does not mean passing time with nothing to do.

It pictures eager watching, like someone expecting a loved one's return.

This church genuinely expected Jesus to come back.

Hope kept them watching instead of growing careless.

⏳ Waiting here means eager watching

👀 This is not empty waiting

🚪 They expected Jesus to return

📖 Hope kept them watching, not idle

## 🌅 Whom He Raised From The Dead, Even Jesus

This names the resurrection directly, without softening it.

Jesus did not simply survive death or escape it somehow.

God raised him back to life after he had truly died.

The resurrection is the proof behind everything else in this letter.

⚰️ Jesus truly died

🌅 God raised him back to life

🚫 Nothing here is softened or vague

📖 The resurrection backs up the whole letter

## ⚡ Which Delivered Us From The Wrath To Come

Wrath to come points to a future judgment still ahead.

This is not describing God's anger as it already happened.

Delivered means Jesus rescues believers from that coming judgment entirely.

The letter ends its first chapter looking forward, not backward.

⚡ Wrath to come means future judgment

🛡️ Delivered means fully rescued

✝️ Jesus is the one who rescues

📖 The chapter ends looking forward`.trim();

export const FIRST_THESSALONIANS_ONE_PERSONAL_SECTIONS = parseFirstThessaloniansOneRawNotes(FIRST_THESSALONIANS_ONE_RAW_NOTES);
