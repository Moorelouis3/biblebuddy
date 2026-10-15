export type FirstThessaloniansTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstThessaloniansTwoRawNotes(rawText: string): FirstThessaloniansTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstThessaloniansTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Thessalonians\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Thessalonians 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Thessalonians\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Thessalonians\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Thessalonians 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Thessalonians 2:${startVerse}` : `1 Thessalonians 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Thessalonians 2 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_THESSALONIANS_TWO_RAW_NOTES = `# 1 Thessalonians 2:1-4
# 🚪 An Entrance Worth Remembering
---
## 🚪 Our Entrance In Unto You

"Entrance" means the actual visit Paul made to this city.

He already proved that point back in chapter one.

Now he goes back to it and digs deeper.

That visit was not in vain.

Vain means empty, leaving nothing real behind.

Something lasting came out of that first visit.

🚪 Entrance means Paul's first visit

⏳ Chapter one already proved this

🌬️ Vain means empty or pointless

📖 That visit left something lasting

## ⛓️ Shamefully Entreated, As Ye Know, At Philippi

Paul already had a rough start before reaching Thessalonica.

At Philippi, he and Silas were beaten and thrown in prison.

"Shamefully entreated" means they were treated with public, humiliating abuse.

That whole story is told in Acts chapter sixteen.

Most men would stay quiet after abuse like that.

Paul kept speaking anyway.

⛓️ Philippi means beaten and imprisoned

😳 Shamefully entreated means public humiliation

📜 Acts sixteen tells the full story

📖 Abuse did not silence Paul

## 💪 We Were Bold In Our God

"Contention" means open conflict, not a quiet disagreement.

Thessalonica itself pushed back hard against this message.

Paul does not say he was bold in himself.

He says he was bold in our God.

The courage came from God, not from Paul's own nerve.

Fear did not get the final word here.

⚔️ Contention means real conflict

🏙️ Thessalonica resisted the message

💪 Bold in God, not himself

📖 Courage came from God, not nerve

## 🎭 Not Of Deceit, Nor Of Uncleanness, Nor In Guile

Paul lists three things his message never contained.

"Deceit" means lying to get people to believe something false.

"Uncleanness" here means a hidden, selfish motive behind the message.

"Guile" means using a trick to manipulate someone.

None of those three were part of how Paul preached.

The gospel he brought could stand on its own, without tricks.

🚫 Deceit means lying to persuade

🙈 Uncleanness means a hidden motive

🎭 Guile means a manipulative trick

📖 The message needed no tricks

## 🔍 Allowed Of God To Be Put In Trust

"Allowed" does not mean simply given permission here.

It means tested, examined, and approved as fit for the job.

God checked Paul before trusting him with this message.

The gospel was not handed to just anyone willing to carry it.

Paul speaks as someone who passed a real test.

🔍 Allowed means tested and approved

✅ God checked Paul first

📦 The gospel was not handed out carelessly

📖 Paul passed a real test

## 🔬 God, Which Trieth Our Hearts

"Trieth" means examines closely, the way a test checks metal for purity.

Paul is not trying to win over the crowd in this city.

He is not performing for human approval.

God is the one judge who actually matters to him.

Hearts can be examined by God in a way no person can match.

🔬 Trieth means examines closely

🙅 Paul is not performing for people

👁️ God is the real judge

📖 God examines what people cannot see

# 1 Thessalonians 2:5-8
# 🤱 Gentle As A Nursing Mother
---
## 🍯 Flattering Words

"Flattering words" means praise used only to manipulate someone.

Paul never buttered people up to win them over.

He wanted them to trust the message, not just like him.

Honest words protect a relationship more than nice sounding ones.

🍯 Flattering words means manipulative praise

🙅 Paul did not butter people up

🤝 Trust mattered more than being liked

📖 Honest words protect real relationships

## 🧥 A Cloke Of Covetousness

A "cloke" is a covering used to hide something underneath.

"Covetousness" means greed, wanting what is not rightfully yours.

Paul is saying he never used the gospel to disguise greed.

Religious leaders sometimes used religion as a cover for profit.

Paul refused to be one of them.

🧥 Cloke means a hidden covering

💰 Covetousness means greed for more

🙅 Paul never hid greed this way

📖 He refused that common shortcut

## 👁️ God Is Witness

Paul cannot prove his own motives to people watching from the outside.

Only God can see inside someone's heart completely.

So Paul calls on God directly as the one true witness.

This claim was too serious to leave unchecked.

👁️ Only God sees real motives

⚖️ Paul calls God as witness

🙏 This claim was serious

📖 Hidden motives answer to God

## 💰 We Might Have Been Burdensome

"Burdensome" means demanding support or money from other people.

Traveling teachers in this era often expected to be paid and housed.

Apostles of Christ had a real right to ask for that support.

Paul chose not to use that right in Thessalonica.

💰 Burdensome means demanding support

🧳 Traveling teachers usually expected payment

✅ Apostles had a real right to ask

📖 Paul gave up that right here

## 🤱 Even As A Nurse Cherisheth Her Children

"Nurse" here means a mother feeding and caring for her own baby.

"Cherisheth" means tender, careful warmth, not distant duty.

Paul is not describing a hired job.

He is describing a bond that feels like family.

That is the kind of care he gave this church.

🤱 Nurse means a caring mother

🫶 Cherisheth means tender warmth

👪 This was family, not a job

📖 Paul cared for them like his own

## ❤️ But Also Our Own Souls

Paul offered more than information in his preaching.

He says he was willing to hand over his own soul too.

That means his whole life, not just a message.

Teaching the gospel cost him more than words.

📜 Paul gave more than information

❤️ His own soul means his whole life

💪 Teaching cost him personally

📖 Love showed up as sacrifice

## 💛 Because Ye Were Dear Unto Us

Paul gives the actual reason behind that sacrifice.

"Dear" means deeply loved, not simply useful or interesting.

He did not love them because they were easy to reach.

He loved them first, and the sacrifice followed from that love.

❤️ Dear means deeply loved

🙅 Not loved for convenience

🔄 Love came before the sacrifice

📖 Real love explains real cost

# 1 Thessalonians 2:9-12
# 👨‍👧 Labour Like A Father's Care
---
## 💪 Our Labour And Travail

"Labour" means hard physical work.

"Travail" is a stronger word, often used for the pain of childbirth.

Paul is describing exhausting, painful effort, not easy teaching.

He worked a job alongside preaching the gospel in this city.

💪 Labour means hard physical work

🤰 Travail pictures the pain of childbirth

🛠️ Paul worked a job too

📖 This cost him real pain

## 💰 We Would Not Be Chargeable Unto Any Of You

"Chargeable" means becoming a financial burden on someone else.

Paul had already explained his right to ask for support.

He chose instead to work and cover his own costs.

That choice removed any excuse to doubt his motives.

💰 Chargeable means a financial burden

✅ Paul had the right to ask

🛠️ He worked to cover himself

📖 This choice removed every excuse

## ⚖️ Holily And Justly And Unblameably

These three words describe how Paul actually lived among them.

"Holily" means devoted and set apart for God.

"Justly" means fair and right in his dealings with people.

"Unblameably" means no one could honestly point to a failure.

He is not just claiming good character.

He is calling the church itself as a witness to it.

🙏 Holily means devoted to God

⚖️ Justly means fair dealing

🚫 Unblameably means no real fault

📖 The church itself can confirm this

## 🙋 Every One Of You

Paul was not preaching to a crowd in general terms.

He paid attention to individual people in this church.

"Every one" means personal, specific care for each person.

A large group never excused him from personal attention.

👥 Not just a general crowd

🙋 Every one means individual care

🎯 Personal attention mattered to Paul

📖 No person was overlooked

## 👨‍👧 As A Father Doth His Children

Paul lists three actions in this verse.

"Exhorted" means urging someone forward with encouragement.

"Comforted" means offering real comfort in a hard moment.

"Charged" means giving a firm, serious instruction.

A good father uses all three, depending on what a child needs.

📣 Exhorted means urging forward

🫂 Comforted means real comfort

📋 Charged means firm instruction

📖 Paul used whichever one they needed

## 🚶 Walk Worthy Of God

"Walk" is a common Bible idiom for how someone lives day to day.

It does not describe literal steps.

"Worthy" means living in a way that matches what God has done.

The goal was a daily life that matched a high calling.

🚶 Walk means daily living

👑 Worthy means matching the calling

📆 This was daily, not occasional

📖 Life was meant to match the calling

## 👑 Called You Unto His Kingdom And Glory

God's call was never only an invitation to escape judgment.

"Kingdom" points to God's present and future rule.

"Glory" points to the honor believers will share with him later.

The calling aims at something far bigger than relief from guilt.

📯 The call was more than escape

👑 Kingdom means God's rule

✨ Glory means shared honor later

📖 The calling aims at something greater

# 1 Thessalonians 2:13-16
# 😔 A Word Received, A People Opposed
---
## 🙏 Thank We God Without Ceasing

Paul already opened this letter with constant thanksgiving in chapter one.

"Without ceasing" means this was not a one time prayer.

Gratitude kept repeating every time Paul thought of this church.

Thanksgiving still comes first, even this far into the letter.

🙏 Without ceasing means ongoing, repeated

🔁 This echoes chapter one's opening

❤️ Gratitude kept returning

📖 Thanksgiving still leads the way

## 🗣️ Not As The Word Of Men, But As It Is In Truth, The Word Of God

This does not mean the message arrived without a human voice.

Paul and his friends clearly did speak it out loud.

The point is where the message actually originated.

They heard it as God's own word, carried through human lips.

That distinction changed how seriously they took it.

🗣️ A human voice still spoke it

🙏 The source was God, not men

🎯 Origin mattered more than delivery

📖 That changed how seriously they listened

## ⚙️ Effectually Worketh Also In You

"Effectually worketh" means actively producing real results, not sitting unused.

This is not describing a message that was simply heard once.

It describes a word that kept changing lives inside the church.

The word was still working, even as Paul wrote this letter.

⚙️ Effectually worketh means active, ongoing results

🚫 Not just heard and forgotten

🔄 The word kept changing lives

📖 It was still working as Paul wrote

## 👣 Followers Of The Churches Of God Which In Judaea

"Followers" here means people copying a pattern, the same word already used in chapter one.

The churches in Judaea were the earliest Christian communities, centered near Jerusalem.

They had already suffered for the same faith years earlier.

This young church in Greece was now walking the same road.

👣 Followers means imitators, same as chapter one

🏙️ Judaea's churches were the earliest ones

⏳ They suffered for this faith first

📖 Thessalonica now walks that same road

## 👊 Suffered Like Things Of Your Own Countrymen

"Your own countrymen" means fellow Thessalonians, not outsiders.

This persecution came from neighbors, not from a distant empire.

The book of Acts records a mob stirred up in this very city.

Being hurt by your own community cuts in a different way.

🏙️ Countrymen means fellow Thessalonians

👊 The threat came from neighbors

📜 Acts records a mob in this city

📖 Betrayal by your own hurts differently

## 📜 Killed The Lord Jesus, And Their Own Prophets

Paul is pointing at a specific group of people, not an entire nation.

He includes himself as a Jewish man in that same wider history.

The Old Testament already records prophets persecuted and killed before Jesus ever came.

This group also persecuted Paul and his own ministry team.

Jesus himself becomes the last name on that long list.

🎯 Paul names a specific group

👤 Paul himself is Jewish too

📜 Prophets were killed long before Jesus

📖 Jesus became the last name on that list

## 🚫 Contrary To All Men

"Contrary" means working directly against something, not merely disagreeing with it.

This describes active opposition to the spread of the gospel everywhere.

The goal of this opposition was stopping a message meant for everyone.

Blocking a message meant for the world is a serious charge.

🚫 Contrary means active opposition

🌍 The gospel was meant for everyone

🛑 This opposition tried to stop it

📖 Blocking a universal message is serious

## 🌍 Forbidding Us To Speak To The Gentiles

"Gentiles" means anyone who is not Jewish by birth.

Acts chapter seventeen records a synagogue crowd pushing Paul out of this very city.

Some opponents wanted the gospel kept inside one ethnic group only.

Paul saw that resistance as working against God's larger plan.

🌍 Gentiles means non Jewish people

🏙️ Acts seventeen records this opposition

🚧 Some wanted the message kept narrow

📖 That resistance fought against God's plan

## ⚡ The Wrath Is Come Upon Them To The Uttermost

"Wrath" here points to God's judgment, not simple bad luck.

"To the uttermost" means completely, holding nothing back.

Many scholars connect this to the coming destruction of Jerusalem in the following decades.

Paul is not celebrating this outcome.

He is warning that opposing God carries real, lasting consequences.

⚡ Wrath means God's judgment

💯 Uttermost means completely, fully

📜 Many link this to Jerusalem's later fall

📖 Opposing God carries real consequences

# 1 Thessalonians 2:17-20
# 💛 A Crown Still Waiting
---
## 🚶 Taken From You For A Short Time In Presence, Not In Heart

"Taken from you" describes physical distance, not emotional distance.

Paul had to leave the city, most likely for his own safety.

His body was somewhere else, but his attention never left this church.

Separation in space is not the same as separation in love.

🚶 Taken from you means physical distance

🛡️ Leaving was likely about safety

❤️ His heart never left them

📖 Distance and love are not the same

## 💪 Endeavoured The More Abundantly To See Your Face

"Endeavoured" means he actively tried, not just hoped quietly.

"The more abundantly" means he tried even harder than usual.

Separation did not cool his desire to return.

It only made him push harder to come back.

💪 Endeavoured means an active effort

📈 More abundantly means even harder

🚫 Distance did not cool his desire

📖 Separation pushed him to try harder

## ✍️ Even I Paul, Once And Again

Paul usually writes as part of a team with Silvanus and Timotheus.

Here he steps forward and names himself alone.

"Once and again" means he tried to return more than one time.

This was personal enough that he had to say it himself.

✍️ Paul names himself alone here

👥 He usually writes with a team

🔁 Once and again means repeated tries

📖 This was personal enough to say himself

## 👹 Satan Hindered Us

Paul does not blame simple bad luck or a busy schedule.

He names a real spiritual opponent working against his plans.

"Hindered" means actively blocked, not just delayed by accident.

Not every closed door in ministry is a sign from God to stop.

👹 Satan is named directly

🚧 Hindered means actively blocked

🚫 This was not simple bad luck

📖 A closed door is not always God's sign

## 🏆 Our Hope, Or Joy, Or Crown Of Rejoicing

A "crown of rejoicing" pictures the wreath given to a winning athlete.

It was not a king's crown, but a victor's prize at the games.

Paul pictures this church itself as that prize.

Their faith, not his own achievements, is what he hopes to present.

🏆 Crown of rejoicing means a victor's wreath

🏃 It pictures an athlete's prize, not a king's

👥 This church itself is the prize

📖 Their faith is what Paul will present

## ✝️ In The Presence Of Our Lord Jesus Christ At His Coming

"His coming" points forward to the same return already named in chapter one.

Paul pictures a future moment when believers stand together before Christ.

This church becomes part of Paul's own reward on that day.

The hope that closes chapter one now shapes how Paul sees his ministry.

✝️ His coming echoes chapter one

👥 Believers stand together before Christ

🏆 This church becomes part of Paul's reward

📖 Future hope shapes present ministry

## 👑 Ye Are Our Glory And Joy

Paul ends the chapter with a short, direct statement.

"Glory" means something worth being proud of before God.

"Joy" means the plain, personal happiness this church brought him.

People, not accomplishments, were Paul's real reward for his labor.

👑 Glory means something to be proud of

😊 Joy means personal happiness

👥 People were Paul's true reward

📖 Love for people outlasts any achievement`.trim();

export const FIRST_THESSALONIANS_TWO_PERSONAL_SECTIONS = parseFirstThessaloniansTwoRawNotes(FIRST_THESSALONIANS_TWO_RAW_NOTES);
