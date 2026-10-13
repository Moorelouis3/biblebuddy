export type RomansSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansSixteenRawNotes(rawText: string): RomansSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 16:${startVerse}` : `Romans 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Romans 16 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_SIXTEEN_RAW_NOTES = `# Romans 16:1-2
# 🤝 Commending Phebe
---
## I Commend Unto You Phebe Our Sister

"Commend" means to formally introduce someone with a word of trust on their behalf.

Paul is not just saying hello to Phebe.

He is vouching for her, the way a letter of reference vouches for someone today.

She likely carried this very letter from Corinth to Rome, since Paul names her first.

🤝 Commend means a formal word of trust
✉️ Phebe likely carried this letter
📍 Paul vouches for her by name
📖 He puts his own trust behind her

## A Servant Of The Church Which Is At Cenchrea

The word translated "servant" here is the same word elsewhere rendered deacon, a recognized role of service.

Cenchrea was the eastern port town of Corinth, a few miles from the city itself.

Paul names her specific church so the Roman believers know exactly who is vouching for her.

A small coastal town gets named in a letter still read two thousand years later.

🛳️ Cenchrea was Corinth's eastern port
🙋 Servant is the same word as deacon
📍 Her church gets named by place
📖 A small town enters a lasting letter

## A Succourer Of Many, And Of Myself Also

"Succourer" means a helper who provides real support, often financial or practical.

In Roman culture, a person of means often acted as a patron for traveling teachers.

Phebe appears to have financially backed Paul's ministry, not just cheered it on.

Paul puts his own name on the list of people she helped.

💰 Succourer means a real practical helper
🧳 Patrons funded traveling teachers like Paul
🙏 She likely supported Paul's own work
📖 Paul counts himself among the helped

# Romans 16:3-5
# 👋 Greeting Priscilla And Aquila
---
## My Helpers In Christ Jesus

Priscilla and Aquila were a married couple, tentmakers by trade, who worked alongside Paul in Corinth.

Acts 18 shows them opening their home and their business to him when he arrived with nothing.

Priscilla is named first here, unusual in a culture that normally listed the husband first.

Many scholars believe that order reflects how active and respected her ministry had become.

🪢 They were tentmakers alongside Paul
🏠 Their home became Paul's base in Corinth
👩 Priscilla is named first, unusually
📖 Her role in ministry was real and visible

## Who Have For My Life Laid Down Their Own Necks

This phrase is an idiom for risking death, like laying your neck on a chopping block.

It does not describe a literal execution that happened to them.

Many scholars connect it to a dangerous moment in Ephesus, perhaps the riot described in Acts 19.

Whatever the exact event, Paul says plainly that they risked their lives to protect his.

🪓 The idiom pictures risking execution
🌀 It likely points to danger in Ephesus
🛡️ They protected Paul at real risk
📖 Paul never forgets a debt like that

## Likewise Greet The Church That Is In Their House

Rome had no church buildings yet in this period.

Believers met in the homes of members large enough to host a crowd.

Priscilla and Aquila's house doubled as a gathering place for an entire congregation.

Opening a home like that required real wealth and real courage under Roman suspicion of new groups.

🏠 Early churches met inside homes
🚪 This couple's house held a congregation
💪 Hosting took wealth and courage
📖 Ordinary rooms carried the early church

## The Firstfruits Of Achaia Unto Christ

"Firstfruits" originally described the first portion of a harvest, set apart and offered to God before the rest was gathered.

Paul borrows that farming picture to mark Epaenetus as the very first convert in a whole region.

"Achaia" was the Roman province that included Corinth, in southern Greece.

One early yes to the gospel becomes the marker for a harvest still being gathered.

🌾 Firstfruits means the first portion offered
🗺️ Achaia was the province around Corinth
🥇 Epaenetus was that region's first convert
📖 One early believer marks a whole harvest

# Romans 16:6-9
# 👥 Mary, Andronicus, And Junia
---
## Mary, Who Bestowed Much Labour On Us

"Bestowed much labour" describes hard, repeated physical effort, not a single kind gesture.

This Mary is not Jesus' mother, simply a common name shared by several women in the New Testament.

Paul singles her out by name for work that history otherwise leaves undescribed.

A name and one line of praise is sometimes all that survives of a whole life of service.

💪 Bestowed labour means hard repeated work
👤 This Mary is a different woman
📝 Her exact work is not detailed
📖 One line preserves a whole life of service

## Of Note Among The Apostles

Andronicus and Junia are named together, and Junia is a woman's name.

Many scholars believe this verse places a woman among those recognized as apostles in the sense of sent, commissioned messengers.

The text does not give further detail about what that role looked like in practice.

Whatever its exact shape, Paul clearly honors her standing without hesitation.

👩 Junia is a woman's name
📜 Many scholars read this as apostolic honor
❓ The text gives no further detail
📖 Paul honors her standing without hesitation

## My Kinsmen, And My Fellow Prisoners

"Kinsmen" likely means fellow Jews, people who shared Paul's own ethnic background, rather than literal blood relatives.

"Fellow prisoners" means they had been imprisoned alongside Paul at some point, sharing that specific hardship.

Paul does not explain which imprisonment, only that they share the memory of it.

Shared suffering for the same gospel created a bond Paul names directly.

🧬 Kinsmen likely means fellow Jews
⛓️ They were imprisoned alongside Paul
🤝 That shared hardship is named directly
📖 Suffering for the gospel built a bond

## Who Also Were In Christ Before Me

Andronicus and Junia became believers before Paul's own conversion on the road to Damascus.

That means the gospel had already reached beyond Jerusalem while Paul was still persecuting the church.

Paul, often seen as the great pioneer, admits others got there first.

The gospel's spread never depended on any one person starting it.

⏳ They believed before Paul's conversion
🗺️ The gospel had already spread early
🙇 Paul admits others arrived first
📖 No single person started this movement

# Romans 16:10-13
# 🏠 Households And Workers
---
## Apelles Approved In Christ

"Approved" describes someone tested and found genuine, like metal proven pure after fire.

The word suggests Apelles had been through some trial that revealed the quality of his faith.

Paul does not record what that test was, only its result.

A reputation for being tested and found faithful was its own kind of honor.

🔥 Approved pictures metal tested by fire
✅ Apelles was tested and found genuine
❓ The exact trial is not recorded
📖 A proven faith earns its own honor

## Them Which Are Of Aristobulus' Household

"Household" in Rome usually meant the servants and freed workers tied to a wealthy family, not the family head himself.

Paul greets believers inside that household, not necessarily Aristobulus personally.

Aristobulus was a name connected to the extended family of King Herod.

The gospel had quietly reached the staff of a household tied to royalty.

🏛️ Household meant servants, not the master
👑 Aristobulus was linked to Herod's family
🤫 The gospel reached that household quietly
📖 Faith spread even through royal staff

## The Household Of Narcissus, Which Are In The Lord

Narcissus was a well known freed slave who had served and grown wealthy under Emperor Claudius.

Again, Paul greets the believers inside that household, not the famous man himself.

A household tied to imperial power still had believers quietly inside it.

The gospel reached into places with no political safety at all.

👑 Narcissus served under Emperor Claudius
🏠 The believers served inside his household
🤫 Faith stayed hidden in a risky place
📖 The gospel reached even imperial staff

## Tryphena And Tryphosa, Who Labour In The Lord

These two names sound like sisters, and many scholars believe they likely were.

Their names mean something close to "delicate" or "dainty," almost the opposite of hard labor.

Paul pairs those delicate names with the same word for hard, repeated work used of Mary in verse six.

The contrast between a soft name and a tireless worker is probably not an accident.

👭 Tryphena and Tryphosa were likely sisters
🌸 Their names mean something like delicate
💪 Paul pairs that name with hard labor
📖 Soft names, tireless service

## The Beloved Persis, Which Laboured Much In The Lord

"Persis" was a common name given to slaves, meaning "a Persian woman."

Paul adds "much" here, going further than the plain "labour" used for Tryphena and Tryphosa just before.

A woman with a slave's name receives one of the warmest descriptions in the whole chapter.

Status in Rome and standing in Christ were clearly not the same scale.

🔗 Persis was a common slave name
📈 "Much" goes beyond the praise just before
❤️ She receives one of the chapter's warmest lines
📖 Roman status did not decide standing in Christ

## Rufus Chosen In The Lord, And His Mother And Mine

Many scholars connect this Rufus to the son of Simon of Cyrene.

Simon was the man who carried Jesus' cross in Mark 15.

If that connection holds, this greeting reaches all the way back to the crucifixion itself.

Paul calling Rufus' mother "mine" shows she had cared for Paul personally at some point, like a mother would.

A family tied to the cross may be standing in this very greeting list.

✝️ Rufus may be Simon of Cyrene's son
🪵 That link reaches back to the cross
🤱 Paul calls her mother "mine" too
📖 This greeting may reach back to Calvary

# Romans 16:14-16
# 💋 Final Names And A Holy Kiss
---
## Asyncritus, Phlegon, Hermas, Patrobas, Hermes, And The Brethren

These five names were common among slaves and freed workers across the Roman Empire.

Paul does not attach a detail to any of them.

Only the plain fact that they belong to the family of believers.

A church this ordinary and unranked was still worth a personal greeting by name.

Faith did not require fame to be remembered in Scripture.

🔗 These were common worker and slave names
📝 No extra detail is attached to them
🤝 They still belong to the family of faith
📖 Fame was never the price of being remembered

## Philologus, And Julia, Nereus, And His Sister, And Olympas

This last cluster likely names another household, Philologus and Julia possibly a married pair, Nereus and his unnamed sister siblings.

Olympas closes the list with no detail at all beyond a name.

The chapter keeps naming people all the way to its final greetings, never trailing off into vague summary.

Every single person in a church mattered enough to be named.

👨‍👩‍👧 Likely another household unit
🤷 Olympas gets no detail at all
📝 Paul keeps naming people to the end
📖 Every believer mattered enough to be named

## Salute One Another With An Holy Kiss

A kiss on the cheek was a completely normal greeting across the ancient Mediterranean, much like a handshake today.

Paul calls this one "holy" to mark it as a sign of family affection among believers, not a romantic gesture.

Rich and poor, free and slave, Jew and Gentile, all greeted each other the same way in church.

A simple shared greeting erased distinctions the surrounding culture took for granted.

🤝 A kiss was a normal ancient greeting
✨ "Holy" marks it as family affection
⚖️ It was given the same way to everyone
📖 A simple greeting erased social distinctions

# Romans 16:17-20
# ⚠️ A Warning About Those Who Cause Divisions
---
## Mark Them Which Cause Divisions And Offences

"Mark" here means to watch closely and take careful note, not a casual glance.

Paul is warning about people inside the church, not outside enemies.

He has spent fifteen chapters building unity between Jewish and Gentile believers, and this threat could undo it.

A letter about unity ends with a clear warning about what breaks unity.

👀 Mark means watch closely, not glance
🚪 The threat comes from inside the church
🧩 It could undo the unity Paul just built
📖 A letter on unity ends with a warning

## Contrary To The Doctrine Which Ye Have Learned

"Doctrine" here means the settled teaching the Roman believers had already received, not an open question.

Paul is not describing a new idea they had never heard before.

He is describing people teaching something that contradicts what was already taught and already settled.

A church does not need new truth so much as it needs to hold the truth it has.

📚 Doctrine means teaching already received
🆕 This is not a brand new idea
❌ It contradicts what was already settled
📖 Holding ground matters as much as learning more

## They Serve Not Our Lord Jesus Christ, But Their Own Belly

This is an idiom for being driven by personal appetite and comfort, not a literal statement about food.

Paul is naming the real motive behind the smooth talk these people use.

Their words sound spiritual, but their actual goal is self interest.

A motive like that can hide behind very religious sounding language.

🍽️ "Own belly" means personal appetite
🎭 Their words sound spiritual on the surface
💰 Their real goal is self interest
📖 Religious language can hide a selfish motive

## By Good Words And Fair Speeches Deceive The Hearts Of The Simple

"Fair speeches" means smooth, pleasant sounding talk, the opposite of an obvious threat.

"The simple" here means the unsuspecting, people without the experience to spot a trap.

Paul is warning that the most dangerous voices rarely sound dangerous at all.

A church is rarely wrecked by someone who announces bad intentions up front.

🍯 Fair speeches means smooth pleasant talk
🎯 "Simple" means the unsuspecting, not foolish
🚫 Danger rarely announces itself
📖 Smooth talk is often the real threat

## Wise Unto That Which Is Good, And Simple Concerning Evil

Paul wants sharp discernment about good, paired with real inexperience in practicing evil.

This is not a call to stay ignorant that evil exists in the world.

It is a call to stay unpracticed in doing it, even while recognizing it clearly.

Knowing evil exists and knowing how to commit it are two very different things.

🧠 Wise about good means sharp discernment
👁️ "Simple concerning evil" is not ignorance
🙅 It means staying unpracticed in doing it
📖 Knowing evil differs from doing it

## The God Of Peace Shall Bruise Satan Under Your Feet Shortly

This promise echoes Genesis 3:15, where God first told the serpent his head would one day be crushed.

Paul is not offering a new promise here.

He is pointing back to the very first one, given right after the fall.

"Shortly" means this victory is already in motion, not far off and uncertain.

An ancient promise about a defeated enemy lands right in the middle of a church's daily struggles.

🐍 This echoes the promise in Genesis 3:15
👣 Satan's defeat is pictured under their feet
⏱️ "Shortly" means already in motion
📖 An old promise answers a present struggle

# Romans 16:21-24
# ✍️ Paul's Companions Add Their Greetings
---
## Timotheus My Workfellow, And Lucius, And Jason, And Sosipater

Timotheus, usually known as Timothy, was Paul's closest and most trusted younger partner in ministry.

Jason may be the same man from Thessalonica who hosted Paul.

That Jason was dragged before the city rulers in Acts 17.

Sosipater and Lucius are named as kinsmen, likely meaning fellow Jews traveling with Paul.

A letter written from one city carries greetings from a small traveling team gathered around Paul.

🤝 Timotheus was Paul's closest partner
🏠 Jason may be the host from Acts 17
🧬 Lucius and Sosipater were likely fellow Jews
📖 A small traveling team surrounded Paul

## I Tertius, Who Wrote This Epistle, Salute You In The Lord

Paul usually dictated his letters aloud to a scribe rather than writing every word by hand himself.

Tertius was that scribe for this letter, physically writing down the words as Paul spoke them.

Here Tertius briefly steps out of the background to add his own personal greeting.

Even the hand that copied the words belonged to a real person worth naming.

🖊️ Paul usually dictated his letters aloud
✍️ Tertius was the scribe who wrote this one
👋 He adds his own short greeting
📖 Even the copying hand was a real person

## Gaius Mine Host, And Of The Whole Church

Gaius had a large enough home in Corinth to host both Paul and the entire local church at once.

A house able to hold a whole congregation meant real wealth and a lot of available space.

Hospitality like that made the gathered church possible in the first place.

A roof over a congregation's head was as vital as any sermon preached under it.

🏠 Gaius hosted the whole Corinthian church
💰 That kind of space meant real wealth
🚪 His hospitality made gathering possible
📖 A roof mattered as much as a sermon

## Erastus The Chamberlain Of The City

"Chamberlain" was a real civic office, close to a city treasurer responsible for public funds and projects.

Holding that position meant Erastus had real standing and responsibility in Corinth's city government.

A believer with that kind of public office shows the gospel had reached well beyond the poor and powerless.

Faith in Christ did not require stepping out of public life.

🏛️ Chamberlain meant a city treasurer role
📈 Erastus held real civic standing
🌐 The gospel reached beyond the powerless
📖 Faith did not require leaving public life

## The Grace Of Our Lord Jesus Christ Be With You All

Paul already gave this same blessing back in verse twenty, just a few lines earlier.

Repeating it here was common in ancient letters, used almost like a formal closing seal.

It shows how naturally Paul's letters flowed between personal greetings and worship.

A list of ordinary names sits wrapped on both sides by the same grace.

🔁 This blessing already appeared in verse 20
📜 Repeating it was a common ancient closing
🙏 Greetings and worship flowed together naturally
📖 Grace wraps around the whole list of names

# Romans 16:25-27
# 📖 Closing Doxology
---
## Of Power To Stablish You According To My Gospel

"Stablish" is an older spelling of establish, meaning to make firm and secure.

Paul closes by pointing back to God's power, not his own effort.

That power is what will keep these believers steady.

"My gospel" does not mean Paul invented a private message, it means the gospel entrusted specifically to his preaching.

The whole letter has argued for this gospel, and now it closes by trusting God to make it stick.

🏗️ Stablish is an older spelling of establish
💪 God's power secures them, not Paul's effort
📢 "My gospel" means the gospel Paul was given
📖 The letter trusts God to make it stick

## The Revelation Of The Mystery, Which Was Kept Secret

"Mystery" in Paul's letters does not mean something confusing or impossible to understand.

It means a plan God always had, that stayed hidden until the right moment to reveal it.

The content of that mystery is the inclusion of Gentiles as full members of God's own people.

What looked sudden and new was actually God's plan from the very beginning, only now unveiled.

🔒 Mystery means a hidden plan, not confusion
⏳ It stayed hidden until the right time
🌍 It is the inclusion of the Gentiles
📖 What seemed new was planned from the start

## Made Known To All Nations For The Obedience Of Faith

This exact phrase, "obedience of faith," also appears in Romans 1:5, near the very start of the letter.

Paul is deliberately closing the letter with the same words he opened it with.

That matching bookend ties the whole argument of Romans together as one complete thought.

Sixteen chapters later, the letter lands back on the exact phrase it began with.

🔗 This phrase also opens the letter in 1:5
📚 Paul closes with the words he started with
🧵 It ties the whole letter together
📖 The ending returns to the very beginning

## To God Only Wise, Be Glory Through Jesus Christ

A doxology is a short, formal statement of praise, usually placed at the very end of a prayer or letter.

Calling God "only wise" credits every bit of the letter's reasoning, mercy, and plan to Him alone.

The glory is given specifically "through Jesus Christ," not as a vague gesture toward God in general.

After sixteen chapters of argument, history, and personal greetings, the whole letter ends on praise.

🙏 A doxology is a closing statement of praise
🧠 "Only wise" credits the plan to God alone
✝️ The glory flows through Jesus Christ
📖 The letter ends exactly on praise
`.trim();

export const ROMANS_SIXTEEN_PERSONAL_SECTIONS = parseRomansSixteenRawNotes(ROMANS_SIXTEEN_RAW_NOTES);
