export type FirstTimothyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstTimothyOneRawNotes(rawText: string): FirstTimothyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstTimothyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Timothy\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Timothy 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Timothy\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Timothy\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Timothy 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Timothy 1:${startVerse}` : `1 Timothy 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Timothy 1 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_TIMOTHY_ONE_RAW_NOTES = `# 1 Timothy 1:1-2
# 👋 Paul's Greeting To Timothy
---
## 📯 By The Commandment Of God

An apostle is someone sent out to speak with the sender's own authority.

Paul says God himself gave the command that sent him.

This title was not something Paul chose or earned.

It was handed to him directly, like a king commissioning an ambassador.

Paul writes this whole letter as someone carrying out an assignment.

📯 Apostle means sent with authority

👑 God himself gave the command

🚫 Not a title Paul chose

📖 Paul writes as one assigned
---
## 🙏 Which Is Our Hope

Paul calls Jesus Christ our hope.

In the Bible, hope does not mean wishing for something uncertain.

It means confident trust in something God has already promised.

Paul is not hoping Jesus might save him.

He is resting on a promise he considers settled.

🙏 Hope means confident trust, not wishing

✅ The promise is already settled

🧭 Jesus Christ is that hope

📖 Trust rests on God's promise
---
## 👨‍👦 My Own Son In The Faith

Timothy was not Paul's biological son.

Paul likely led Timothy to faith in Christ himself.

Calling him son in the faith shows deep trust.

The bond was like a father training his own son.

Paul mentions Timothy by name in six different New Testament letters.

👨‍👦 Timothy was not Paul's blood son

🙏 Paul likely led him to Christ

🤝 The bond was like father and son

📖 Timothy appears in six Pauline letters
---
## ✉️ Grace, Mercy, And Peace

Most of Paul's letters open with only grace and peace.

Here he adds a third word, mercy.

Mercy is the compassion shown to someone who does not deserve rescue.

Timothy was a young pastor facing real pressure in Ephesus.

Paul widens the blessing because Timothy needed it most.

✉️ Most letters open with two words

➕ Here Paul adds a third, mercy

💙 Mercy means compassion toward the undeserving

📖 Timothy needed that blessing most
---
# 1 Timothy 1:3-7
# 📜 The Charge Left At Ephesus
---
## 🏛️ Abide Still At Ephesus

Ephesus was a major city on the coast of what is now Turkey.

It held one of the largest pagan temples in the ancient world, the temple of Artemis.

Paul had already spent real time building the church there.

He now leaves Timothy behind to keep that church on track.

Staying in a hard city for the sake of others took real courage.

🏛️ Ephesus held a huge pagan temple

⛪ Paul had built a real church there

🧍 Timothy stays behind to guard it

📖 Staying took real courage
---
## 📏 Charge Some That They Teach No Other Doctrine

The word some points to specific teachers inside the Ephesian church.

Paul does not name them yet in this letter.

Their problem was not unbelief but false teaching from within.

A charge like this functions like a direct order, not a suggestion.

👥 Some means teachers inside the church

🚫 The problem came from within

📏 No other doctrine means stay on message

➡️ A charge was a direct order
---
## 📖 Fables And Endless Genealogies

Fables means invented stories treated as true history.

Endless genealogies likely points to speculative Jewish teaching about ancestry.

Some teachers built elaborate theories out of Old Testament family lists.

These theories entertained the mind without building real faith.

📚 Fables means invented, false stories

🌳 Genealogies means family line speculation

🧠 Clever theories fed curiosity, not faith

📖 None of it built real belief
---
## 🏗️ Rather Than Godly Edifying Which Is In Faith

Edifying means building something up, the way a builder adds to a house.

Paul contrasts two outcomes here.

Fables stir up arguments and questions with no real answer.

Godly teaching builds a person's actual faith, brick by brick.

🏗️ Edifying means building something up

❓ Fables stir up endless questions

🧱 Godly teaching builds real faith

📖 One tears down, the other builds
---
## 🎯 The End Of The Commandment Is Charity

End here means goal, not conclusion.

Charity means selfless love for other people.

Every command God ever gave was aimed at producing that love.

A teacher who causes arguments has already missed the entire point.

🎯 End means goal, not conclusion

❤️ Charity means selfless love

📏 Every command aims at love

📖 Arguments miss the whole point
---
## 💗 Out Of A Pure Heart, And Of A Good Conscience, And Of Faith Unfeigned

Paul names three sources that real love grows from.

A pure heart means motives that are not secretly selfish.

A good conscience means a mind that is not hiding guilt.

Faith unfeigned means belief that is not just performed for show.

Love without these three roots will not hold up under pressure.

💗 A pure heart means honest motives

🧠 A good conscience means no hidden guilt

🙏 Unfeigned faith means belief that is real

📖 Real love needs all three roots
---
## 🧭 Turned Aside Unto Vain Jangling

Swerved means they drifted off the path without even noticing at first.

Vain jangling means empty, pointless talk that goes nowhere.

These teachers traded real teaching for arguments that sounded clever.

Clever sounding words can still be completely empty.

🧭 Swerved means they drifted off course

🗣️ Jangling means empty, pointless talk

🎭 It sounded clever but taught nothing

📖 Clever words can still be empty
---
## 🎓 Desiring To Be Teachers Of The Law

These men wanted the status of being called teachers.

Wanting the title was never the same as being qualified for it.

Paul does not question their ambition, only their actual understanding.

🎓 They wanted the title of teacher

🚫 Wanting it is not earning it

❓ Paul questions their understanding, not their desire

📖 Ambition without understanding is dangerous
---
## 🤷 Understanding Neither What They Say, Nor Whereof They Affirm

These teachers did not understand their own words.

They could not even explain what they were so confidently claiming.

Confidence is not the same thing as actually knowing the truth.

A teacher who does not understand his own claims will mislead everyone listening.

🤷 They did not understand their own words

🎤 Confidence is not the same as knowledge

⚠️ Unclear teachers mislead everyone listening

📖 Confusion at the top spreads downward
---
# 1 Timothy 1:8-11
# ⚖️ The Lawful Use Of The Law
---
## ✅ If A Man Use It Lawfully

Paul is not saying the law is a bad thing.

The law is good when it is used for its real purpose.

Its purpose is to expose wrongdoing, not to earn salvation.

A good tool used the wrong way can still cause real harm.

✅ The law itself is good

🎯 Its purpose is exposing wrongdoing

🚫 It was never meant to earn salvation

📖 Good tools can still be misused
---
## 🙂 Not Made For A Righteous Man

A righteous person already wants to do what is right.

That person does not need a law forcing them to obey.

The law exists mainly to restrain people who would otherwise do real harm.

It works like a fence built around a dangerous edge.

🙂 A righteous person already wants to obey

🚧 The law restrains harmful behavior

🧱 It works like a protective fence

📖 Its target is the lawless, not the willing
---
## ⛓️ For Menstealers

Menstealers means people who kidnap others to sell them into slavery.

This practice was common across the ancient world.

Paul names it plainly as a sin God condemns.

The Bible never treats human trafficking as acceptable, even in cultures that normalized it.

⛓️ Menstealers means kidnapping people to sell them

🌍 This was common in the ancient world

🚫 Paul names it as real sin

📖 God never approved of trafficking people
---
## 🤥 For Perjured Persons

Perjured persons means people who lie under a formal oath.

Swearing falsely was treated as a serious offense in Israel's law.

Breaking an oath meant more than lying, it meant abusing God's own name.

The ninth commandment already named this exact sin centuries earlier.

🤥 Perjured means lying under oath

📜 Oaths carried God's own name

⚠️ This broke the ninth commandment

📖 Lying under oath is sin against God
---
## 🩺 Contrary To Sound Doctrine

Sound here means healthy, the way a doctor checks for a sound heart.

Sound doctrine means teaching that keeps the church spiritually healthy.

Anything that contradicts it works like an infection in the body.

Paul is not just listing crimes, he is diagnosing what makes teaching dangerous.

🩺 Sound means healthy, not just correct

⛪ Sound doctrine keeps the church healthy

🦠 False teaching spreads like infection

📖 Paul is diagnosing, not just listing
---
## 🎁 Committed To My Trust

Trust here means something valuable handed over for safekeeping.

Paul says the gospel itself was placed in his care.

He did not invent the message, he was made responsible for carrying it.

Every apostle acted as a steward, not an owner, of the gospel.

🎁 Trust means something given for safekeeping

📦 Paul carried the gospel, did not invent it

🧑‍💼 He was a steward, not an owner

📖 The gospel was never Paul's to change
---
# 1 Timothy 1:12-14
# 🙏 From Blasphemer To Minister
---
## 💪 Who Hath Enabled Me

Enabled means given the strength to do something a person could not do alone.

Paul is not crediting his own talent for his ministry.

He is pointing straight at the power that equipped him for it.

Nobody qualifies themselves for the calling God gives them.

💪 Enabled means given strength for the task

🙅 Not Paul's own talent

⚡ God supplied the power

📖 Nobody qualifies themselves for a calling
---
## 🛠️ Putting Me Into The Ministry

Ministry here means active service, not a job title.

God placed Paul into real work, not just a position of honor.

This was real work handed to someone who did not deserve it.

Paul never treats ministry as a reward he earned.

🛠️ Ministry means active service, not a title

🎁 It was work, not an award

🙏 Paul never treats it as earned

📖 Service matters more than status
---
## 🗣️ A Blasphemer, And A Persecutor, And Injurious

Blasphemer means someone who spoke against God or sacred things.

Persecutor means someone who actively hunted down believers to harm them.

Before his conversion, Paul helped arrest and even kill followers of Jesus.

He is not softening his own record here.

Paul names his past plainly, without excuse.

🗣️ Blasphemer means speaking against God

🏃 Persecutor means hunting down believers

⚔️ Paul once helped harm Christians

📖 He names his past honestly
---
## 🙅 I Did It Ignorantly In Unbelief

Ignorantly does not erase what Paul did.

It explains why mercy was even possible for someone like him.

He attacked the church before he believed Jesus was Lord.

Unbelief made his sin real, not excusable.

It still left a door open for mercy.

🙅 Ignorance does not erase guilt

🚪 It left a door open for mercy

❌ Paul did not yet believe

📖 Mercy can reach even real guilt
---
## 🌊 Exceeding Abundant With Faith And Love

Exceeding abundant means overflowing far past what was expected or needed.

Paul is not describing an ordinary measure of grace.

He received more faith and love than his past could seem to deserve.

Grace does not ration itself to match someone's history.

🌊 Exceeding abundant means overflowing

📏 Far beyond what was expected

❤️ Faith and love both overflowed

📖 Grace does not ration by history
---
# 1 Timothy 1:15-17
# 👑 Christ Jesus Came To Save Sinners
---
## 🗣️ A Faithful Saying

A faithful saying was a trusted phrase the early church repeated often.

Paul uses this exact label several times across his letters to Timothy and Titus.

It worked like a line of catechism, something short enough to remember by heart.

These were truths the whole church already agreed on, not Paul's own new idea.

🗣️ A trusted phrase repeated often

📜 Paul uses this label several times

🧠 Short enough to remember by heart

📖 Agreed truth, not a new idea
---
## 🥇 Of Whom I Am Chief

Chief here means the worst example, not just one example among many.

Paul is not exaggerating for effect.

He genuinely saw his own violent past as the extreme case.

If grace could reach him, it could reach absolutely anyone.

🥇 Chief means the worst example

😔 Paul is not exaggerating here

⚔️ His past was genuinely extreme

📖 If grace reached him, it reaches anyone
---
## 🧩 For This Cause I Obtained Mercy

This cause points back to Paul calling himself the worst sinner.

God chose to show mercy to the worst case first.

That order was not an accident.

Paul's rescue became proof for everyone doubting their own rescue.

🎯 This cause points back to his sin

🙏 God chose the worst case first

🔍 That order was not an accident

📖 His rescue became proof for others
---
## 🔮 A Pattern To Them Which Should Hereafter Believe

Pattern means a model other people can look at and learn from.

Hereafter means everyone who would come to faith after Paul, including readers today.

Paul's story was not written just for his own generation.

Anyone who thinks their past disqualifies them can look at Paul's own case.

🧩 Pattern means a model to learn from

🔮 Hereafter means every future believer

📖 Written for readers centuries later

➡️ No past disqualifies someone from mercy
---
## ⏳ The King Eternal, Immortal, Invisible

Eternal means God has no beginning and no end.

Immortal means God cannot die or stop existing.

Invisible means no human eye has ever seen God's full being.

Paul stacks three descriptions together to show how far beyond human limits God truly is.

⏳ Eternal means no beginning or end

🛡️ Immortal means God cannot die

👁️ Invisible means unseen by human eyes

📖 Three words describe one limitless God
---
## 🙌 Honour And Glory For Ever And Ever

A doxology is a short burst of praise, usually placed at the end of a thought.

Paul cannot talk about his own rescue without turning to worship.

The grammar of the sentence almost breaks down into praise mid thought.

The mention of mercy for one sinner ends in worship of the one true God.

🙌 A doxology is a burst of praise

🔚 It breaks in right at the end

🙏 Paul moves from testimony to worship

📖 Mercy for one sinner leads to praise
---
# 1 Timothy 1:18-20
# ⚔️ War A Good Warfare
---
## 🔁 This Charge I Commit Unto Thee

Charge here is the same word Paul already used back in verse three.

That first charge was about stopping false teachers.

This second charge hands Timothy an active assignment of his own.

The chapter opens and closes on the exact same word for a reason.

🔁 Charge repeats the word from verse three

🚫 The first charge targeted false teaching

🎯 This charge hands Timothy his own task

📖 One word frames the whole chapter
---
## 🗣️ According To The Prophecies Which Went Before On Thee

At some point, people in the church spoke prophetic words directly over Timothy.

These words likely came at the moment leaders set him apart for ministry.

Paul later mentions this same moment again in his second letter to Timothy.

Timothy's calling was confirmed publicly, not just decided privately.

🗣️ Prophecies were words spoken over Timothy

⛪ Likely spoken when he was set apart

🔁 Paul mentions this again later

📖 His calling was confirmed publicly
---
## ⚔️ War A Good Warfare

Paul switches from courtroom language to military language here.

Warfare means Timothy's ministry will involve real, ongoing conflict.

Good warfare means fighting for the right side, not fighting to win an argument.

Ministry was never going to be peaceful for Timothy in a city like Ephesus.

⚔️ Warfare means real, ongoing conflict

🛡️ Good warfare means fighting for truth

🚫 Not fighting just to win arguments

📖 Ministry in Ephesus would not be peaceful
---
## 🔁 Holding Faith, And A Good Conscience

This phrase repeats the same two things named back in verse five.

Faith and a good conscience work together like two hands on one weapon.

Losing either one puts the other at risk.

Paul is not introducing a new idea, he is reinforcing the one he already gave.

🔁 Repeats the idea from verse five

🤝 Faith and conscience work together

⚠️ Losing one risks the other

📖 Paul reinforces, not invents
---
## 🚢 Made Shipwreck

Shipwreck means a ship that is completely destroyed, not just damaged.

Paul pictures someone's faith breaking apart completely, not just struggling.

A good conscience works like a ship's rudder, keeping the whole voyage steady.

Throw the rudder away and the ship has no way to stay on course.

🚢 Shipwreck means total destruction

🧭 Conscience works like a ship's rudder

⚠️ Losing it wrecks the whole voyage

📖 Faith needs a steady conscience
---
## 🧍 Hymenaeus And Alexander

These were not vague examples, they were real men in the Ephesian church.

Paul names them specifically instead of speaking only in general warnings.

A man named Hymenaeus appears again later in Paul's second letter to Timothy, still teaching error.

Naming names made the warning impossible to dismiss as hypothetical.

🧍 Real men, not vague examples

📛 Paul names them specifically

🔁 Hymenaeus appears again later

📖 Naming names made the warning concrete
---
## 🚪 Delivered Unto Satan, That They May Learn Not To Blaspheme

Delivered unto Satan likely means formally removed from the protection and fellowship of the church.

Paul uses this same severe language again in his letter to Corinth.

This was not personal revenge.

The goal stated plainly was correction, that they may learn, not simple punishment.

🚪 Delivered means removed from the church

🛡️ They lose that community's protection

🎯 The goal was correction, not revenge

📖 Discipline aimed at learning, not punishment
`.trim();

export const FIRST_TIMOTHY_ONE_PERSONAL_SECTIONS = parseFirstTimothyOneRawNotes(FIRST_TIMOTHY_ONE_RAW_NOTES);
