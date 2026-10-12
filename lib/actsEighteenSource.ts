export type ActsEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsEighteenRawNotes(rawText: string): ActsEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 18:${startVerse}` : `Acts 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Acts 18 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_EIGHTEEN_RAW_NOTES = `# Acts 18:1-3
# 🧵 A Tentmaker In Corinth
---
## 🏛️ Came To Corinth

Corinth was one of the busiest trade cities in the whole Roman Empire.

It sat on a narrow strip of land between two major seaports.

That location made it wealthy, diverse, and famously immoral.

Paul was about to plant a church in one of the hardest cities he had yet faced.

🏛️ Corinth linked two busy seaports

💰 Trade brought real wealth here

🌀 The city mixed many cultures freely

➡️ Paul planted a church in a hard place

## 🗺️ Named Aquila, Born In Pontus

Pontus was a region along the Black Sea in what is now Turkey.

It sat far from both Rome and Jerusalem.

Aquila and his wife Priscilla show up again later in the New Testament.

Paul names them in Romans, First Corinthians, and Second Timothy.

🗺️ Pontus was near the Black Sea

📍 It sat far from Rome and Jerusalem

📜 Aquila and Priscilla appear again later

📖 Paul names them in three letters

## 👑 Claudius Had Commanded All Jews To Depart From Rome

The Roman emperor Claudius expelled Jews from the city of Rome.

Most historians place this expulsion near the year forty nine.

That single decision is why Aquila and Priscilla were in Corinth at all.

One emperor's order reshaped an ordinary couple's whole life.

👑 Claudius expelled Jews from Rome

📅 This happened near the year forty nine

🧵 It explains why they were in Corinth

➡️ One emperor's order reshaped their lives

## 🛠️ Of The Same Craft

Jewish teachers were expected to also know a practical trade.

Paul had learned this trade before he ever became an apostle.

Working with his hands let him support himself on the road.

Sharing a craft with Aquila also gave him an instant bond.

🛠️ Jewish teachers learned a trade too

💪 Paul supported himself through his hands

🤝 A shared craft built an instant bond

📖 Faith and work were never separated

## ⛺ They Were Tentmakers

A tentmaker cut and stitched heavy cloth or leather.

This craft made tents, sails, and other tough fabric goods.

A busy port city like Corinth needed this kind of work constantly.

Paul's trade fit perfectly into the city he had just entered.

⛺ Tentmakers cut and stitched heavy material

⛵ Sails and tents both used this skill

🏙️ A port city needed this trade often

📖 Paul's skill matched his new city

# Acts 18:4-8
# ⚖️ Belief And Opposition In Corinth
---
## 📖 Reasoned In The Synagogue Every Sabbath

"Reasoned" meant Paul built a structured argument from scripture.

He was not simply telling emotional stories about his own life.

Every sabbath gave him a fresh audience already gathered to study scripture.

This habit shaped nearly every city Paul visited in the book of Acts.

📖 Reasoned means a structured scripture based argument

🗓️ The sabbath gave him a built audience

🔁 This pattern repeats in nearly every city

➡️ Paul never relied on emotion alone

## 🌍 Persuaded The Jews And The Greeks

"Persuaded" means Paul aimed to convince, not merely to inform.

Jews in the synagogue already knew the scriptures Paul was using.

Greeks nearby were often Gentiles drawn to Israel's God without full conversion.

Paul shaped one message to reach two very different kinds of listeners.

🧠 Persuaded means aiming to convince

📚 Jews already knew the scriptures used

🌍 Greeks were drawn to this God

➡️ One message reached two audiences

## 🔥 Paul Was Pressed In The Spirit

"Pressed" here describes an urgent, almost burdened sense of compulsion.

Paul felt he had to speak, not that he merely wanted to.

Something inside him demanded the words come out immediately.

This urgency often shows up right before Paul takes a costly stand.

🔥 Pressed means urgent inner compulsion

💭 Paul felt he had to speak

⚡ The pressure did not wait for comfort

➡️ Urgency came before a costly stand

## 👥 Silas And Timotheus Were Come From Macedonia

Silas and Timotheus had stayed behind in Macedonia for a while.

Their arrival reunited Paul with his full missionary team again.

Paul later writes that they likely also brought financial support with them.

Companionship and provision arrived together at the same moment.

👥 Silas and Timotheus rejoined Paul here

🤝 The full missionary team reunited again

💰 They likely brought financial help too

📖 Support and companionship arrived together

## 👘 He Shook His Raiment

Shaking out one's clothing was a visible, symbolic act of rejection.

It pictured brushing off responsibility for whatever happened next.

Paul used a similar gesture of shaking dust off his feet elsewhere.

The action said more than words ever could.

👘 Shaking his garment was a visible act

🙅 It symbolized rejecting responsibility

🦶 Paul used a similar gesture elsewhere

📖 The gesture spoke louder than words

## ⚖️ Your Blood Be Upon Your Own Heads

This phrase is an old idiom meaning the fault now belongs to them.

The prophet Ezekiel used a similar phrase about a watchman's duty.

A clear warning freed the watchman from blame for what came next.

Paul had warned them clearly.

Their rejection became their own weight to carry.

⚖️ The phrase means fault now shifts to them

📜 Ezekiel used a similar watchman idiom

🗣️ A clear warning ends the watchman's duty

📖 Rejection became their own weight to carry

## 🌍 I Will Go Unto The Gentiles

Paul had made this exact kind of turn before, in other cities.

Jewish rejection in one place never ended his overall mission.

He simply redirected his effort toward a different audience nearby.

This pattern repeats across nearly the whole second half of Acts.

🔁 Paul had turned this way before

🚪 Rejection did not end his mission

🌍 He redirected toward a new audience

📖 This pattern repeats across Acts

## 🙏 One That Worshipped God

This phrase describes a Gentile who worshipped Israel's God without full conversion.

The same kind of seeker appears earlier in Thessalonica and Berea.

Justus became the next host willing to risk housing Paul.

God kept providing a doorway right after each rejection closed one.

🙏 Justus worshipped God without full conversion

🔁 This same seeker type appeared earlier

🏠 He became Paul's next willing host

➡️ A doorway opened right after one closed

## 📍 Joined Hard To The Synagogue

"Hard" here is an old way of saying close or right next to.

Justus's house sat directly beside the very synagogue that rejected Paul.

Paul did not retreat far away after being pushed out.

He kept teaching within sight of the people who opposed him.

📍 Hard here means close or right next to

🏠 Justus lived right beside the synagogue

🚶 Paul did not retreat far away

➡️ He taught in sight of his opposition

## 🕎 Crispus, The Chief Ruler Of The Synagogue, Believed

A ruler of the synagogue led the congregation's worship and teaching.

Crispus held real religious authority before he ever met Paul.

Paul later mentions personally baptizing Crispus in his letter to Corinth.

A leader converting carried real weight inside his own community.

🕎 A ruler led the synagogue's worship

👑 Crispus held real authority already

💧 Paul later names baptizing Crispus himself

➡️ A leader's conversion carried real weight

## 👪 With All His House

Household conversions appear again and again throughout the book of Acts.

Lydia and the Philippian jailer both believed along with their whole households.

Ancient households often included children, servants, and extended family members.

One person's faith regularly opened the door for an entire household.

👪 Households often believed together in Acts

🔁 Lydia and the jailer followed this pattern

👥 A household included family and servants

📖 One faith opened a whole household

# Acts 18:9-11
# 🌙 Encouraged By A Vision
---
## 🌙 The Lord Spake To Paul In The Night By A Vision

God had spoken to Paul through a similar night vision before.

A vision like this had already sent him toward Macedonia earlier in the journey.

This time the vision was not a new direction but fresh courage.

Paul needed reassurance just as much as he once needed guidance.

🌙 God spoke again through a night vision

🧭 An earlier vision had sent him to Macedonia

💪 This vision gave courage, not new direction

📖 Paul needed reassurance as much as guidance

## 🗣️ Be Not Afraid, But Speak, And Hold Not Thy Peace

This command admits that real fear was already present in Paul.

Recent riots in Thessalonica and Berea had followed him here.

"Hold not thy peace" means do not stay silent out of caution.

God answered Paul's fear with a direct command to keep speaking.

😟 Real fear was already present in Paul

⚠️ Riots had already followed him this far

🤐 Hold thy peace means to stay silent

➡️ God answered fear with a command to speak

## 🛡️ No Man Shall Set On Thee To Hurt Thee

This was a direct, personal promise of physical safety in this city.

Paul had been beaten, jailed, and chased out of other cities already.

Corinth would be different, even though nothing about the city looked safer.

Divine protection did not depend on how calm or hostile a city felt.

🛡️ God promised personal safety here

🤕 Paul had been harmed in other cities

🏙️ Corinth looked no safer on the surface

➡️ Protection did not depend on appearances

## 👥 I Have Much People In This City

God already claimed people in Corinth before any of them believed yet.

Corinth had a reputation for wealth, immorality, and open vice.

God's claim on a city never depends on its current reputation.

Paul was sent to gather people God had already marked as his own.

👥 God already claimed people here

🏙️ Corinth was known for open vice

🚫 Reputation never limited God's claim

📖 Paul gathered who God already marked

## 📅 A Year And Six Months

Eighteen months was an unusually long stay for Paul's missionary pattern.

Most earlier cities got only weeks or a few months at most.

The night vision's promise of safety made this long stay possible.

A long stay let a real, lasting church take root in Corinth.

📅 Eighteen months was unusually long for Paul

⏱️ Earlier cities got far less time

🌙 The vision's promise made this possible

📖 A long stay let a real church grow

# Acts 18:12-17
# 🏛️ Paul Before Gallio
---
## ⚖️ Gallio Was The Deputy Of Achaia

"Deputy" here means proconsul, the top Roman official over that province.

Achaia was the Roman province that included the city of Corinth.

An inscription found at Delphi names Gallio's actual term of office.

That inscription gives historians one of the firmest dates in all of Paul's travels.

⚖️ Deputy here means Roman proconsul

🗺️ Achaia was the province around Corinth

🪨 An inscription at Delphi names his term

📖 This gives Paul's travels a firm date

## 🤝 The Jews Made Insurrection With One Accord

"With one accord" means the group acted together, in full agreement.

This was a planned, coordinated legal attack, not a sudden outburst.

Opposition to Paul kept organizing itself at a higher level each time.

A whole community moved together against one single traveling teacher.

🤝 One accord means acting fully together

📋 This was planned, not a sudden outburst

📈 Opposition kept organizing at higher levels

➡️ A whole community moved against one man

## 🏛️ Brought Him To The Judgment Seat

"Judgment seat" names the raised platform where a Roman official heard legal cases.

Archaeologists have found a stone platform like this still standing in Corinth's marketplace.

Paul stood in a real location visitors can still see today.

This was an official Roman court, not a private argument among neighbors.

🏛️ The judgment seat was an official platform

🪨 A matching stone platform survives in Corinth

📍 Paul stood in a real, visitable spot

➡️ This was a real court, not a dispute

## ❓ Worship God Contrary To The Law

The accusers kept the charge deliberately vague about which law was broken.

They hoped Gallio would hear "the law" and assume they meant Roman law.

Judaism itself was a legally protected religion inside the Roman Empire.

A vague charge was their best chance of making Paul's teaching sound illegal.

❓ The charge named no specific law

⚖️ They hoped Gallio would assume Roman law

🛡️ Judaism itself was legally protected already

➡️ Vagueness was their best chance at a case

## ⚖️ A Matter Of Wrong Or Wicked Lewdness

"Lewdness" in this old sense means serious crime, not sexual misconduct.

Gallio names the actual kind of case a Roman court should hear.

Real crimes like theft or violence belonged in his courtroom.

Nothing Paul had done came close to fitting that description.

⚖️ Lewdness here means serious crime

🏛️ Gallio named what his court should hear

🔍 Real crimes like theft fit that category

📖 Paul's teaching did not fit it at all

## 📜 A Question Of Words And Names, And Of Your Law

Gallio sorts this dispute as purely religious, internal to Judaism itself.

Rome generally refused to referee arguments about another nation's own religion.

This official Roman ruling protected Paul without Gallio ever intending to.

A disinterested judge became an unlikely shield for the gospel's spread.

🏛️ Gallio called this a religious dispute

🚫 Rome avoided ruling on local religion

🛡️ The ruling protected Paul unintentionally

📖 An indifferent judge still shielded the gospel

## 🙅 I Will Be No Judge Of Such Matters

Gallio formally refused to let his court decide a religious question.

This refusal set an early legal precedent other officials could point to later.

Christianity briefly benefited from being lumped in with protected Judaism.

A Roman shrug became one more small piece of protection for the church.

🙅 Gallio refused to judge the matter

📜 This set an early legal precedent

🛡️ Christianity benefited from Judaism's protection

➡️ A shrug protected the young church

## 🚪 He Drave Them From The Judgment Seat

"Drave" is an old form of the word drove, meaning forced out.

Gallio did not politely dismiss the case, he physically removed the accusers.

Their case was treated as a waste of the court's time.

A confident ruling ended the matter quickly and firmly.

🚪 Drave means drove, or forced out

💪 Gallio physically removed the accusers

🗑️ Their case was treated as worthless

➡️ The ruling ended things quickly

## 🕎 Sosthenes, The Chief Ruler Of The Synagogue

Sosthenes appears to have replaced Crispus after Crispus believed in Paul's message.

This new ruler became the next target once the Roman case collapsed.

Paul later greets a man named Sosthenes in First Corinthians.

Many scholars believe this beaten ruler eventually became a believer himself.

🕎 Sosthenes likely replaced Crispus as ruler

🎯 He became the next target instead

📖 A Sosthenes is named again in First Corinthians

➡️ Many believe he later became a believer

## 🙄 Gallio Cared For None Of Those Things

Gallio's total indifference let an unofficial, violent punishment go unchecked.

He had dismissed the legal case but ignored the crowd's actual violence.

Indifference from power can be just as dangerous as active hostility.

Even so, that same indifference kept Paul himself safe from punishment.

🙄 Gallio showed total indifference here

👊 He ignored real violence against Sosthenes

⚠️ Indifference can be dangerous too

📖 That same indifference kept Paul safe

# Acts 18:18-23
# ⛵ The Journey Continues
---
## ✂️ Shorn His Head In Cenchrea

Shaving the head marked the end of a temporary religious vow.

This kind of vow is described in the Old Testament book of Numbers.

Cenchrea was Corinth's eastern port, a short trip from the city itself.

Paul completed a Jewish ritual obligation even while traveling as a missionary.

✂️ Shaving marked the end of a vow

📜 Numbers describes this kind of vow

⛵ Cenchrea was Corinth's eastern port

📖 Paul kept Jewish ritual even on mission

## 🙏 For He Had A Vow

This kind of vow usually meant growing the hair out for a set time.

The vow was a personal act of devotion, not a command Paul had to follow.

Paul remained a practicing, observant Jew throughout his ministry to the Gentiles.

Faith in Jesus never erased his own Jewish identity or customs.

🌱 Vows often meant growing hair out

🙏 This was devotion, not a command

🕎 Paul stayed an observant Jew

📖 Faith in Jesus did not erase his identity

## 👩 With Him Priscilla And Aquila

Priscilla's name appears before her husband's name in several places in Acts.

That order was unusual in a culture that normally named the husband first.

Many scholars believe this hints at her unusual skill or standing.

Luke's small detail quietly highlights a woman's prominence in the early church.

👩 Priscilla's name comes first sometimes

🔄 That order was unusual culturally

🌟 This hints at her unusual standing

📖 Luke quietly highlights a woman's prominence

## 🏙️ He Came To Ephesus, And Left Them There

Paul dropped Priscilla and Aquila off in Ephesus before continuing his own trip.

This couple would go on to mentor a major new teacher there.

Leaving them in Ephesus quietly sets up the next part of this very chapter.

A small travel detail turns out to matter later in the story.

🏙️ Paul left the couple in Ephesus

👨‍🏫 They would mentor a major teacher there

🔮 This detail sets up what comes next

➡️ A small choice mattered later

## 🙅 He Consented Not

The Ephesian believers wanted Paul to stay there with them longer.

Paul turned down their request, even though their offer seemed good.

A good invitation is not automatically the same thing as God's timing.

Paul kept moving toward a deadline that mattered more to him right then.

🙅 Paul declined their good invitation

⏱️ He stayed on his own timeline

🧭 A good offer is not always right

➡️ Paul moved toward what mattered more

## 📅 I Must By All Means Keep This Feast That Cometh In Jerusalem

Paul does not name which Jewish feast he meant in this verse.

Most likely this was either Passover or the feast of Pentecost.

Paul kept observing Israel's festival calendar throughout his years of ministry.

His mission to the Gentiles never replaced his own Jewish practice.

📅 Paul does not name the feast here

🕎 It was likely Passover or Pentecost

📖 He kept Israel's festival calendar

➡️ Gentile mission never replaced Jewish practice

## 🙏 I Will Return Again Unto You, If God Will

This small phrase keeps every future plan openly dependent on God.

Paul does not promise his own schedule as though it were guaranteed.

A similar caution appears later in the book of James about making plans.

Confidence in a plan and submission to God sat together in Paul's words.

🙏 Paul kept his plans open to God

🚫 He never treated his schedule as guaranteed

📜 James gives a similar caution later

📖 Confidence and submission sat together here

## ⛰️ Gone Up, And Saluted The Church

"Gone up" describes traveling toward Jerusalem, which sat on higher ground.

"Saluted" simply means Paul greeted the believers there in person.

This quick stop reconnected Paul with the very first congregation in Acts.

Even a brief visit kept Paul's ministry tied back to its starting point.

⛰️ Gone up describes traveling toward Jerusalem

👋 Saluted simply means he greeted them

🏛️ This reconnected him to the first church

📖 His ministry stayed tied to its start

## 🗺️ Went Over All The Country Of Galatia And Phrygia In Order

"In order" means Paul deliberately revisited these places one after another.

Galatia and Phrygia were regions Paul had already planted churches in earlier.

This marks the beginning of what is often called Paul's third missionary journey.

Paul kept returning to strengthen work he had already started, not just starting new work.

🗺️ In order means he visited deliberately

🌱 These churches already existed from before

🧭 This begins his third missionary journey

➡️ Paul strengthened old work, not just new

## 🌱 Strengthening All The Disciples

Planting a church and strengthening a church are two separate kinds of work.

New believers needed ongoing teaching, not just one single moment of decision.

Paul treated follow up visits as seriously as his first visit to any city.

Faith that survives takes real, continued investment after the first believing moment.

🌱 Planting and strengthening are different work

📖 New believers needed ongoing teaching

🔁 Paul treated follow up visits seriously

➡️ Faith needs investment after the first moment

# Acts 18:24-28
# 📚 Apollos Learns The Full Story
---
## 📚 Named Apollos, Born At Alexandria

Alexandria was one of the ancient world's great centers of learning.

The city held a massive library and a large, well educated Jewish population.

Apollos likely received serious training in both scripture and public speaking there.

His background explains the skill Luke immediately credits to him.

📚 Alexandria was a center of learning

🏛️ It held a massive library and school culture

🕎 Its Jewish community was large and trained

📖 Apollos likely trained there himself

## 🗣️ An Eloquent Man, And Mighty In The Scriptures

"Eloquent" describes real skill in public speaking and persuasion.

"Mighty in the scriptures" means deep, confident knowledge of the Old Testament.

Apollos combined both natural gift and real study before Paul ever met him.

Skill alone was not yet the same thing as full understanding.

🗣️ Eloquent means skilled public speaking

📖 Mighty means deep scripture knowledge

🎁 Apollos had natural gift and real study

➡️ Skill was not yet full understanding

## 🌊 Knowing Only The Baptism Of John

John's baptism called people to repent and prepare for a coming Messiah.

It never included the full news of Jesus's death, resurrection, and the Spirit.

Apollos was teaching real truth, but an incomplete version of the story.

A sincere, zealous teacher can still be missing an important piece.

🌊 John's baptism called people to repent

⏳ It pointed forward, not the full story

📖 Apollos taught truth, but an incomplete version

➡️ Zeal does not guarantee full understanding

## 🔥 Being Fervent In The Spirit

"Fervent" describes real passion and zeal, not polite, quiet interest.

Apollos taught diligently, putting genuine energy into every lesson.

This passion existed even before his understanding was fully complete.

Zeal and correct understanding are two separate things that can grow together.

🔥 Fervent means real passion and zeal

📢 Apollos taught with genuine energy

⏳ His zeal came before full understanding

➡️ Zeal and understanding can grow together

## 🤝 Expounded Unto Him The Way Of God More Perfectly

"Expounded" means they explained the full story to him in careful detail.

Aquila and Priscilla corrected a respected public teacher without public humiliation.

They did this privately, after hearing him teach boldly in the synagogue.

Quiet correction between believers can shape a teacher more than open conflict.

📖 Expounded means careful, full explanation

🤝 Aquila and Priscilla corrected him privately

🙊 No public humiliation was needed

➡️ Quiet correction shaped a public teacher

## 🗺️ Disposed To Pass Into Achaia

Apollos wanted to travel on to Achaia, the province that included Corinth.

He would be stepping right into the church Paul had already planted there.

This sets up Apollos continuing ministry in the very city Paul started.

One teacher's foundation became the next teacher's starting point.

🗺️ Apollos planned to travel to Achaia

🏙️ That province included Corinth itself

🔁 He continued Paul's work there

📖 One foundation became another's starting point

## ✉️ The Brethren Wrote, Exhorting The Disciples To Receive Him

Ephesian believers sent a written letter ahead to introduce Apollos.

This functioned much like a modern letter of recommendation between churches.

Early churches stayed connected across cities through letters like this one.

Trust between congregations was built through this kind of careful introduction.

✉️ Ephesus sent a letter ahead for him

🤝 It worked like a recommendation letter

🌍 Churches stayed connected through letters

📖 Trust was built through introduction

## 🎁 Helped Them Much Which Had Believed Through Grace

Apollos strengthened believers who already trusted Jesus before he ever arrived.

"Through grace" credits God's gift, not human effort, for their faith.

Apollos built on a foundation of grace rather than claiming credit himself.

His arrival added strength to a faith that was never his own achievement.

🙏 Apollos helped existing believers grow

🎁 Grace credits God, not human effort

🏗️ He built on an existing foundation

➡️ Their faith was never his achievement

## 📖 Shewing By The Scriptures That Jesus Was Christ

"Shewing" is an old spelling of showing, meaning to demonstrate with evidence.

Apollos argued from the Old Testament itself, the same method Paul used.

"Publickly" means he did this openly, not in private conversation alone.

Two very different teachers kept proving the exact same point from scripture.

📖 Shewing means demonstrating with evidence

🔁 Apollos used the same method as Paul

🗣️ Publickly means his proof was open

➡️ Two teachers proved one same point
`.trim();

export const ACTS_EIGHTEEN_PERSONAL_SECTIONS = parseActsEighteenRawNotes(ACTS_EIGHTEEN_RAW_NOTES);
