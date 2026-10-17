export type SecondTimothyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondTimothyFourRawNotes(rawText: string): SecondTimothyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondTimothyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*2\s+Timothy\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Timothy 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+2\s+Timothy\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+2\s+Timothy\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Timothy 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Timothy 4:${startVerse}` : `2 Timothy 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 2 Timothy 4 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_TIMOTHY_FOUR_RAW_NOTES = `# 2 Timothy 4:1-5
# ⚔️ I Charge Thee Before God
---
## I Charge Thee Therefore Before God, And The Lord Jesus Christ

"Charge" means a solemn command, not a casual suggestion.

Paul calls on God and Christ as witnesses to this command.

That raises the weight of everything that follows.

Timothy could not brush this charge aside later.

⚖️ Charge means a solemn command
👁️ God and Christ stand as witnesses
📈 This raises the weight of what follows
📖 Timothy could not treat this lightly

## Who Shall Judge The Quick And The Dead

"Quick" is an old word meaning the living, not fast.

This names Christ as judge over every person ever born.

Paul grounds Timothy's charge in a coming day of judgment.

That future reckoning is why the charge carries real weight.

⏳ Quick is an old word for living
⚖️ Christ judges every person, living and dead
📅 Paul points to a coming reckoning
📖 Judgment gives the charge its weight

## At His Appearing And His Kingdom

"Appearing" names Christ's visible return to earth.

"Kingdom" names the full reign that begins at that return.

Paul ties this charge to an event still ahead of Timothy.

Timothy's work served something bigger than his own lifetime.

✨ Appearing means Christ's visible return
👑 Kingdom names his coming full reign
⏭️ This points to an event still ahead
📖 Timothy's work served something bigger than him

## Preach The Word

Paul gives the single clearest command in this whole charge.

"The word" means the gospel message Paul had already taught.

Preaching comes first, before any other task Paul lists here.

Everything else in this chapter builds on this one command.

📣 Preach means to proclaim publicly
🥇 Preaching comes first in this charge
📘 The word means the gospel message
➡️ Every other task builds on this one

## Be Instant In Season, Out Of Season

"Instant" here means ready at every moment, not forceful.

"In season" means when the timing feels convenient and welcome.

"Out of season" means even when the timing feels wrong.

Paul removes any excuse Timothy could reach for to wait.

⏰ Instant means ready at every moment
🌤️ In season means a convenient moment
🌧️ Out of season means an inconvenient one
➡️ Timothy had no excuse left to wait

## Reprove, Rebuke, Exhort With All Longsuffering And Doctrine

Paul lists three different tools Timothy needed ready at once.

"Reprove" means pointing out what is wrong.

"Rebuke" means a firmer, more direct correction of the problem.

"Exhort" means encouraging someone toward the right action instead.

"Longsuffering" means doing all of this with patience, not anger.

🔍 Reprove means pointing out what is wrong
📢 Rebuke means a firmer, direct correction
🤲 Exhort means encouraging the right action
📖 Longsuffering means patience instead of anger

## The Time Will Come When They Will Not Endure Sound Doctrine

Paul warns Timothy that this problem is coming, not already arrived.

"Endure" means tolerate something long enough to keep sitting under it.

"Sound doctrine" means teaching that lines up with the truth.

People would eventually grow tired of hearing truth stated plainly.

⏳ This problem was coming, not already here
🚪 Endure means tolerating something long term
✅ Sound doctrine means teaching that matches truth
📖 People would grow tired of plain truth

## Heap To Themselves Teachers, Having Itching Ears

"Heap" pictures gathering up a large pile on purpose.

People would collect teachers the same deliberate way.

"Itching ears" is an old picture for a craving to hear something new.

They wanted teaching that scratched that craving, not teaching that corrected them.

📚 Heap means gathering a large pile
🎯 People collected teachers on purpose
👂 Itching ears pictures craving new teaching
📖 They wanted comfort, not correction

## After Their Own Lusts

"Lusts" here names any strong desire, not only sexual appetite.

This desire decided which teachers these people would even listen to.

The craving came first, and the teaching got picked to match it.

That order is backward from how sound learning normally works.

🔥 Lusts means any strong desire
🎯 Desire decided which teachers they chose
🔄 Craving came first, teaching followed
📖 Backward order breaks real learning

## Turn Away Their Ears From The Truth

This completes the picture started by itching ears in the verse before.

They would actively stop listening to anything true.

That turning away was a choice, not an accident.

Paul names this drift here before it even happens.

🙉 This completes the itching ears picture
🚫 They stopped listening to truth
🎯 Turning away was a choice
📖 Rejecting truth never happens by accident

## Turned Unto Fables

"Fables" means made up stories with no real truth behind them.

People would trade real truth for stories that only felt satisfying.

A fable can feel meaningful while still being completely false.

This verse names the result of chasing itching ears to its end.

📖 Fables means made up, false stories
🔄 Truth gets traded for comforting stories
😌 A fable can feel meaningful yet false
➡️ This is where itching ears finally lead

## Watch Thou In All Things

"Watch" here means staying alert, not passively waiting around.

Paul contrasts Timothy directly against the drifting crowd just described.

Everyone else was turning away, but Timothy was told to stay awake.

Alertness was Timothy's defense against the very drift just named.

👁️ Watch means staying alert
⚖️ Timothy is contrasted with the drifting crowd
🛡️ Alertness defends against spiritual drift
📖 Staying awake protects what others lost

## Endure Afflictions

"Afflictions" names real hardship, not minor inconvenience.

Paul does not promise Timothy an easy ministry ahead.

Enduring means staying faithful through hardship, not escaping it.

This word prepares Timothy for what the rest of the letter already warned about.

💢 Afflictions means real hardship
🚫 Paul promises no easy path
🪨 Enduring means staying faithful through pain
📖 This matches warnings earlier in the letter

## Do The Work Of An Evangelist

"Evangelist" means someone whose task is spreading the good news directly.

Timothy already served as a pastor and teacher inside the church.

Paul adds this task on top of what Timothy already carried.

The gospel still needed to reach people outside the church walls.

📣 Evangelist means someone who spreads good news
⛪ Timothy already served inside the church
➕ Paul adds one more task here
📖 The gospel still needed to reach outsiders

## Make Full Proof Of Thy Ministry

"Make full proof" means carrying out the ministry completely, holding nothing back.

This closes a list of five commands given in one breath.

Paul expected all five to run together, not just one or two.

A ministry proven in full leaves nothing undone that was asked.

💯 Full proof means holding nothing back
🔢 This closes a list of five commands
🔗 All five commands were meant to run together
📖 Nothing asked of Timothy was left undone

# 2 Timothy 4:6-8
# 🏁 I Have Fought A Good Fight
---
## I Am Now Ready To Be Offered

"Offered" pictures a sacrifice poured out completely on an altar.

Paul describes his coming death the same way a drink offering was poured out.

He speaks of this moment as settled, not feared.

Paul had already made peace with how his life would end.

🍷 Offered pictures a sacrifice poured out
⚰️ Paul describes his coming death this way
😌 He speaks of it as settled
📖 Paul had already made peace with the end

## The Time Of My Departure Is At Hand

"Departure" here is a gentle word for death, almost like untying a ship.

Paul pictures leaving on a planned trip, not vanishing without warning.

"At hand" means the moment had nearly arrived.

Paul wrote this letter knowing his death was close.

⛵ Departure pictures untying a ship to leave
🗓️ Paul saw this as a planned trip
⏰ At hand means nearly arrived
📖 Paul wrote this knowing death was close

## I Have Fought A Good Fight

Paul pictures his life as an athletic contest, not a casual stroll.

"Fought" means he faced real resistance the whole way.

"A good fight" means fought with honesty, not one he is bragging about.

Paul is summarizing an entire life, not one single moment.

🥊 Fought pictures real resistance faced
🏅 A good fight means fought honestly
📜 Paul summarizes his whole life here
📖 Honest effort mattered more than outcome

## I Have Finished My Course

"Course" pictures a racetrack with a clear beginning and a clear end.

Paul uses the same picture Greek runners would have recognized instantly.

"Finished" means he reached the end, not just that he tried hard.

Paul had completed what he set out to do.

🏃 Course pictures a racetrack with an end
🏛️ Greek runners would recognize this picture
🏁 Finished means he reached the end
📖 Paul completed what he set out to do

## I Have Kept The Faith

"Kept" pictures guarding something valuable from being stolen or lost.

"The faith" means the actual body of teaching Paul had received and passed on.

Paul protected that teaching the whole time he was in ministry.

He handed it on to Timothy intact, not watered down.

🔒 Kept pictures guarding something valuable
📘 The faith means the teaching Paul received
🛡️ Paul protected it his whole ministry
📖 He passed it on intact to Timothy

## There Is Laid Up For Me A Crown Of Righteousness

"Laid up" pictures something stored safely away, waiting to be collected.

Ancient athletic contests awarded winners an actual physical crown.

Paul borrows that picture for a reward God is keeping for him.

This crown was already secured, not something Paul still had to earn.

🏆 Laid up pictures a reward stored safely
🥇 Ancient contests gave winners a real crown
👑 Paul borrows that image for his reward
📖 The reward was already secured, not earned

## The Lord, The Righteous Judge, Shall Give Me At That Day

Paul names the judge from verse one again here at the end.

"Righteous judge" means this verdict will be completely fair.

"That day" points back to Christ's appearing named earlier in the chapter.

The same judge who holds Timothy accountable will reward Paul justly.

⚖️ Paul names the same judge again
✅ Righteous judge means a fair verdict
📅 That day points back to Christ's appearing
📖 The same judge rewards and holds accountable

## Unto All Them Also That Love His Appearing

Paul makes clear this crown is not reserved for apostles alone.

"Love his appearing" means genuinely longing for Christ's return.

Anyone who holds that same longing shares in the same reward.

This closes Paul's own story by widening it to include everyone.

👥 Not reserved for apostles alone
❤️ Love his appearing means longing for Christ
🎁 Anyone with that longing shares the reward
📖 Paul's story widens to include everyone

# 2 Timothy 4:9-13
# 🧳 Do Thy Diligence To Come Shortly
---
## Do Thy Diligence To Come Shortly Unto Me

"Diligence" means real effort, not a vague hope to visit someday.

Paul is asking Timothy to make this trip an actual priority.

"Shortly" adds urgency, as if time was running short.

Paul wanted Timothy with him personally, not just in spirit.

🏃 Diligence means real, deliberate effort
📌 Paul asks Timothy to prioritize this trip
⏰ Shortly adds real urgency
📖 Paul wanted Timothy there in person

## Demas Hath Forsaken Me, Having Loved This Present World

Demas appears elsewhere in Paul's letters as a coworker.

"Forsaken" means he abandoned Paul completely, not just stepped away briefly.

"Loved this present world" means the exact reason he left.

Demas chose comfort and safety over standing with Paul.

🧑 Demas appears elsewhere as a coworker
🚪 Forsaken means a complete abandonment
🌍 He loved this present world instead
📖 Demas chose comfort over standing with Paul

## Is Departed Unto Thessalonica

Thessalonica was a major city in Macedonia, in modern day Greece.

Paul had planted a church there years earlier.

The text does not say why Demas went to this city specifically.

"Departed" here simply means he left for that destination.

🗺️ Thessalonica sat in Macedonia, modern Greece
⛪ Paul had planted a church there
❓ The text gives no reason for the choice
📖 Departed simply means he left for there

## Crescens To Galatia, Titus Unto Dalmatia

Crescens is named only this one time in the entire Bible.

Galatia was a region in what is now central Turkey.

Titus already had his own letter from Paul and his own assignment.

Dalmatia sat along the eastern coast of the Adriatic Sea.

These names show Paul's coworkers scattered across real, separate places.

📜 Crescens is named only this one time
🗺️ Galatia sat in modern day Turkey
🌊 Dalmatia sat along the Adriatic coast
📖 Paul's team was scattered across real places

## Only Luke Is With Me

Luke is the same physician and writer of Luke and Acts.

Paul names him as the one companion still present.

This moment shows how isolated Paul had become near the end.

Even one faithful friend mattered enormously in that isolation.

✍️ Luke wrote the gospel of Luke and Acts
🙋 Luke is the one companion still present
😔 This shows how isolated Paul had become
📖 One faithful friend mattered enormously here

## Take Mark, And Bring Him With Thee

This Mark had once abandoned Paul on an earlier mission trip.

Paul and Barnabas had actually split apart over that very failure.

Years later, Paul now calls for Mark by name, fully restored.

This request quietly shows that failure did not get the final word.

🏃 Mark once left Paul on a mission trip
💔 Paul and Barnabas split over that failure
🤝 Mark is now fully restored to Paul
📖 Failure did not get the final word

## For He Is Profitable To Me For The Ministry

"Profitable" means genuinely useful, not just pleasant company.

Paul states plainly that Mark had real value for the work.

This settles any lingering doubt about whether Mark was trustworthy again.

Restoration here is proven by real use, not only by words.

🧰 Profitable means genuinely useful
✅ Paul states Mark's real value plainly
🔓 This settles any lingering doubt
📖 Restoration showed up in real use

## Tychicus Have I Sent To Ephesus

Tychicus appears several times in Paul's letters as a trusted messenger.

Paul likely sent him to carry this letter, or to replace Timothy there.

Ephesus was the city where Timothy was currently serving.

This single line explains why Timothy might soon have help on the ground.

🏃 Tychicus was a trusted messenger
✉️ He likely carried this letter or replaced Timothy
🏛️ Ephesus was Timothy's current city
📖 Timothy was about to get real help

## The Cloke That I Left At Troas With Carpus

"Cloke" is an old spelling of cloak, a heavy outer garment.

Troas was a city Paul had passed through on earlier travels.

Carpus is not named anywhere else in the whole Bible.

Paul wanted this garment back as winter approached, named later in the chapter.

🧥 Cloke is an old spelling of cloak
🗺️ Troas was a city from earlier travel
📜 Carpus is named only this one time
📖 Paul needed it as winter approached

## The Books, But Especially The Parchments

"Books" here likely means scrolls, the standard format of that time.

"Parchments" names a specific, more costly writing material made from treated animal skin.

Paul singles out the parchments as more valuable than the rest.

These may well have included personal notes or portions of scripture itself.

📚 Books likely means scrolls, not bound books
🐑 Parchments means animal skin writing material
💰 Paul singles these out as more valuable
📖 These may hold notes or scripture itself

# 2 Timothy 4:14-18
# ⚡ Alexander The Coppersmith Did Me Much Evil
---
## Alexander The Coppersmith Did Me Much Evil

"Coppersmith" names his trade, a worker in copper and other metals.

This Alexander is likely the same man named earlier in this letter.

Paul does not explain exactly what evil Alexander did to him.

Naming him by trade and name made the warning concrete for Timothy.

🔨 Coppersmith means a worker in copper
🧑 Likely the same Alexander named earlier
❓ Paul does not detail the evil done
📖 Naming him made the warning concrete

## The Lord Reward Him According To His Works

Paul hands this situation over to God instead of chasing revenge himself.

"Reward" here is not kindness, it is simply fair payment for wrongdoing.

"According to his works" means Alexander would be judged by what he actually did.

Paul had already named the Lord as judge earlier in this chapter.

🙏 Paul hands this to God, not revenge
⚖️ Reward here means fair payment, not kindness
📋 Judgment matches what Alexander actually did
📖 Paul already named this judge earlier

## Of Whom Be Thou Ware Also

"Ware" is an old word for wary, meaning on guard and careful.

Paul is warning Timothy personally to watch out for this same man.

Alexander was apparently active where Timothy was now serving.

This warning turns a past wrong into present day advice.

👀 Ware is an old word for wary
⚠️ Paul warns Timothy about this same man
📍 Alexander was active near Timothy now
📖 A past wrong becomes present advice

## He Hath Greatly Withstood Our Words

"Withstood" means actively opposing and resisting, not just disagreeing quietly.

"Our words" likely means the gospel message Paul and his coworkers preached.

Alexander worked directly against the message itself, not just against Paul personally.

This made him a danger to the whole mission, not one man's enemy.

🚫 Withstood means actively resisting, not disagreeing
🎯 He opposed the message, not just Paul
⚠️ A danger to the whole mission
📖 Our words means the gospel message preached

## At My First Answer No Man Stood With Me

"First answer" likely points to an early stage of Paul's legal defense in Rome.

Paul faced that moment completely alone, with no one standing beside him.

Even people Paul had trusted did not show up for him.

This loneliness makes Luke's presence, named earlier, stand out even more.

⚖️ First answer points to an early legal defense
😔 Paul faced that moment completely alone
🚶 Trusted people did not show up
📖 This makes Luke's presence stand out more

## I Pray God That It May Not Be Laid To Their Charge

Paul had every reason to hold a grudge against the men who abandoned him.

Instead, he asks God not to count it against them.

This mirrors the kind of forgiveness Paul had preached his whole life.

Paul practiced the same mercy here that he had always taught.

💔 Paul had real reason for a grudge
🙏 He asks God not to count it
🔄 This mirrors forgiveness Paul always preached
📖 Paul practiced the mercy he taught

## Notwithstanding The Lord Stood With Me, And Strengthened Me

"Notwithstanding" means despite everything just described, in spite of it.

Every human friend had failed Paul in that moment.

God did not fail him the same way people did.

This line draws a sharp line between human loyalty and God's loyalty.

⚡ Notwithstanding means despite all of that
👥 Every human friend had failed Paul
🛡️ God did not fail him the same way
📖 Human loyalty and God's loyalty are not equal

## That By Me The Preaching Might Be Fully Known

Paul saw his own trial as a chance to preach, not only a threat to survive.

A Roman courtroom gave the gospel an audience it might not otherwise reach.

Paul's hardship became the very platform for the message to spread.

This turns Paul's danger into one more opportunity for the gospel.

⚖️ The trial was also a chance to preach
🏛️ A courtroom gave the gospel a new audience
📣 His hardship became a platform for the message
📖 Danger here became another gospel opportunity

## That All The Gentiles Might Hear

Paul's trial likely took place in front of Roman officials and a Roman audience.

That audience was mostly Gentile, not Jewish, by default.

Paul's lifelong mission to reach Gentiles continued even inside a courtroom.

A trial meant to silence Paul instead gave his message a wider reach.

🏛️ The audience was mostly Gentile by default
🌍 Paul's Gentile mission continued in court
📈 The trial spread his message instead
📖 Even danger served Paul's lifelong mission

## I Was Delivered Out Of The Mouth Of The Lion

"The lion" is a picture for mortal danger, not a literal animal here.

This echoes language from the Psalms about God rescuing from real threats.

Paul is not claiming he avoided danger, only that he survived it.

This deliverance mirrors the same kind of rescue Paul described back in chapter three.

🦁 The lion pictures mortal danger
🛡️ Paul survived the danger, did not avoid it
🔁 This mirrors the rescue named in chapter three
📖 This echoes rescue language from the Psalms

## The Lord Shall Deliver Me From Every Evil Work

Paul shifts from past rescue to a confident hope about the future.

This deliverance is not necessarily freedom from death itself.

Paul is confident evil will not have the final say over him.

That confidence holds even though Paul expected to die soon.

🔄 Paul shifts from past rescue to future hope
⚰️ Not necessarily freedom from death itself
🛡️ Evil will not have the final say
📖 Confidence held even facing death

## Preserve Me Unto His Heavenly Kingdom

"Preserve" means keep safe all the way to the destination.

Paul names heaven itself as the real destination, not just survival here.

This is the same kingdom named back at the start of the chapter.

Paul's whole outlook reaches past this life toward that kingdom.

🧭 Preserve means kept safe to the end
👑 Heaven is the real destination here
🔁 This echoes the kingdom named earlier
📖 Paul's outlook reached past this life

## To Whom Be Glory For Ever And Ever. Amen

Paul breaks into open praise in the middle of a personal letter.

This kind of praise is called a doxology, a short burst of worship.

Paul's confidence in the previous lines flows straight into worship here.

"Amen" means let it be so, sealing the statement as settled.

🙌 Paul breaks into open praise here
✅ Amen means let it be so
🔁 Confidence flows straight into worship here
📖 This burst of praise is called a doxology

# 2 Timothy 4:19-22
# 👋 Salute Prisca And Aquila
---
## Salute Prisca And Aquila

"Salute" here means send a warm greeting, not a formal military gesture.

Prisca and Aquila are a married couple who appear several times in the New Testament.

They had hosted Paul before and had taught alongside him in ministry.

Paul closes this letter the way he often did, with real names.

👋 Salute means send a warm greeting
💑 Prisca and Aquila were a married couple
🤝 They had hosted and taught with Paul
📖 Paul closes letters with real names

## The Household Of Onesiphorus

Onesiphorus was already named earlier in this same letter.

Paul had praised him there for searching him out while Paul was in chains.

Paul greets his household here, even though Onesiphorus himself is not named directly.

Some readers take that detail as a quiet sign Onesiphorus had died by this point.

🔍 He searched for Paul while Paul was chained
🏠 Paul greets the household, not the man
❓ This may quietly signal Onesiphorus had died
📖 Onesiphorus was already named earlier in the letter

## Erastus Abode At Corinth

This Erastus may be the same city official named in Romans chapter sixteen.

"Abode" is an old word simply meaning stayed or remained.

Corinth was a major port city Paul knew well from earlier ministry.

Paul tracks his coworkers city by city, even in his final letter.

🧑 This may be the official named in Romans
🏠 Abode is an old word for stayed
🏛️ Corinth was a major port city
📖 Paul tracked coworkers city by city

## Trophimus Have I Left At Miletum Sick

Trophimus traveled with Paul and is named earlier in the book of Acts.

"Miletum" is an old spelling of Miletus, a port city near Ephesus.

Paul had to leave a sick friend behind, not by choice.

This small detail shows Paul could not simply heal every illness at will.

🚶 Trophimus traveled with Paul, named in Acts
🗺️ Miletum is an old spelling of Miletus
😔 Paul left a sick friend, not by choice
📖 Paul could not heal every illness at will

## Do Thy Diligence To Come Before Winter

Paul repeats the same urgency from verse nine, now with a deadline.

Winter travel by sea was genuinely dangerous in the ancient world.

If Timothy waited too long, the trip might become impossible until spring.

This detail shows Paul expected to die soon, maybe before Timothy could arrive.

⏰ Paul repeats the same urgency as before
🌊 Winter sea travel was genuinely dangerous
🚫 Waiting too long could block the trip
📖 Paul expected to die before spring

## Eubulus Greeteth Thee, And Pudens, And Linus, And Claudia

These four names appear only here in the entire New Testament.

None of them get any further description beyond their name.

Early church tradition links some of these names to later figures.

That link cannot be confirmed from scripture alone.

Paul closes with real people, not abstract theology.

📜 These four names appear only here
❓ No further description is given for any
🤷 Tradition links some to later figures, unconfirmed
📖 Paul closes with real people, not theology

## The Lord Jesus Christ Be With Thy Spirit

Paul shifts from naming people to a final blessing over Timothy himself.

"Thy spirit" makes this personal, not just a general goodbye.

This is Paul's very last recorded word to his closest coworker.

The whole letter ends exactly where it began, pointing Timothy back to Christ.

🙏 Paul shifts to a final personal blessing
❤️ Thy spirit makes this deeply personal
🏁 This is Paul's last recorded word to Timothy
📖 The letter ends pointing Timothy back to Christ

## Grace Be With You. Amen

Paul switches from "thee," singular, to "you," which includes the whole church reading this letter.

This final line was meant for more than Timothy alone.

"Grace" was Paul's standard closing word across nearly every one of his letters.

The last word of the whole letter is still an unearned gift from God.

🔄 You here widens beyond Timothy alone
⛪ This closing reached the whole church
🎁 Grace was Paul's standard closing word
📖 The last word is still an unearned gift
`.trim();

export const SECOND_TIMOTHY_FOUR_PERSONAL_SECTIONS = parseSecondTimothyFourRawNotes(SECOND_TIMOTHY_FOUR_RAW_NOTES);
