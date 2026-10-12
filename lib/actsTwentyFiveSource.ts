export type ActsTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwentyFiveRawNotes(rawText: string): ActsTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 25:${startVerse}` : `Acts 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Acts 25 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWENTY_FIVE_RAW_NOTES = `# Acts 25:1-5
# ⚖️ Festus Arrives And The Old Plot Resurfaces
---
## 🆕 Now When Festus Was Come Into The Province

Festus is the new Roman governor who takes over from Felix.

Paul had already spent two years in custody by this point.

A new governor did not erase his old enemies.

They were simply waiting for a fresh chance to strike.

🆕 Festus replaces Felix as governor
⏳ Paul had already waited two years
👥 His enemies had not given up
➡️ New leadership gave them a fresh chance

## 📆 After Three Days He Ascended From Caesarea To Jerusalem

Felix once let Paul's case sit for two years without a decision.

Festus moves within three days of arriving in the province.

That speed says something about the kind of governor he intended to be.

It also meant Paul's accusers barely had to wait before trying again.

📆 Three days is a strikingly fast start
🐌 Felix let the case sit for two years
⚡ Festus moved with real urgency
➡️ Paul's accusers barely had to wait

## 🏛️ The High Priest And The Chief Of The Jews Informed Him Against Paul

This is the same group of Jewish leadership that first arrested Paul back in chapter twenty one.

They renew their accusation the moment a new governor arrives.

A new official meant a new chance to press their case from the very beginning.

Their hostility toward Paul had not cooled in two years.

🏛️ The same leadership presses the case again
🔄 A new governor meant a fresh start
⏳ Two years had not cooled their hostility
➡️ Old enemies rarely give up quietly

## 🗡️ Laying Wait In The Way To Kill Him

This is the exact same assassination plot from chapter twenty three.

Back then, more than forty men swore not to eat until Paul was dead.

Two years later, some of them were apparently still willing to try.

A new governor gave them a chance to ask for exactly what they wanted the first time.

🗡️ This plot already appeared in chapter twenty three
🍽️ Forty men once swore an oath over it
⏳ Two years had not ended their resolve
➡️ They wanted the same ambush as before

## 🛡️ Festus Answered, That Paul Should Be Kept At Caesarea

Festus does not take the bait.

He refuses to move Paul to Jerusalem, the exact city where the ambush would happen.

Nothing in the text says Festus knew about the plot.

His caution may simply have come from normal Roman procedure, not suspicion.

🛡️ Festus refuses to move Paul
🏙️ Jerusalem was exactly where danger waited
❓ The text never says he knew the plot
➡️ Caution protected Paul either way

## 📜 Which Among You Are Able, Go Down With Me, And Accuse This Man

Roman law required accusers to appear in person before a judge.

Festus insists on following that process instead of granting a shortcut.

This same rule had already protected Paul once before, in chapter twenty three.

Proper procedure, not any particular kindness, kept Paul alive again.

📜 Roman law required accusers in person
🚫 Festus refuses to grant a shortcut
🛡️ The same rule once protected Paul before
➡️ Procedure, not kindness, kept him safe

# Acts 25:6-12
# 🏛️ Paul Appeals To Caesar
---
## 📖 Tarried Among Them More Than Ten Days

"Tarried" is an old word that simply means stayed or waited.

Festus spent this time in Jerusalem before heading back to Caesarea.

The delay was ordinary administrative business, not avoidance like Felix's stalling.

Paul's hearing follows soon after Festus returns.

📖 Tarried is an old word for stayed
🏙️ Festus spent this time in Jerusalem
🗓️ This delay was ordinary, not avoidance
➡️ Paul's hearing follows soon after

## 🪑 Sitting On The Judgment Seat

The judgment seat was the official chair a Roman governor used to hear legal cases.

Sitting on it marked the start of a formal trial, not an informal conversation.

Whoever occupied that seat represented the full authority of Rome in that room.

Paul is about to answer accusations with real legal weight behind them.

🪑 The judgment seat marked a formal trial
🏛️ It represented Rome's full legal authority
⚖️ This was not an informal talk
➡️ Real legal weight stood behind this hearing

## 📣 Laid Many And Grievous Complaints Against Paul, Which They Could Not Prove

"Grievous" means serious or severe.

The accusers bring heavy charges but no actual evidence to back them up.

This same pattern already happened once before Felix in chapter twenty four.

Loud accusations are not the same thing as a real case.

📣 Grievous means serious or severe
🚫 No real evidence backed these charges
🔁 The same pattern already happened before Felix
➡️ Volume is not the same as proof

## 📜 Neither Against The Law Of The Jews, Neither Against The Temple, Nor Yet Against Caesar

Paul answers by naming the three exact categories of accusation against him.

Jewish law, temple purity, and loyalty to Rome cover every charge raised so far.

He denies all three directly instead of arguing around them.

A clear denial of every specific charge is much stronger than a vague defense.

📜 Paul names three exact categories
✝️ Law, temple, and loyalty to Rome
🙅 He denies each one directly
➡️ A specific denial beats a vague one

## 🎭 Festus, Willing To Do The Jews A Pleasure

This is the same political motive already seen driving Felix back in chapter twenty four.

Keeping local Jewish leaders happy mattered more to Festus than Paul's actual guilt.

A new governor still had to govern the same difficult region.

Justice kept losing out to politics under more than one administration.

🎭 The same motive once moved Felix
🤝 Keeping leaders happy mattered more than truth
🏛️ A new governor faced the same old pressure
➡️ Politics kept outweighing justice

## ❓ Wilt Thou Go Up To Jerusalem, And There Be Judged Of These Things Before Me

This sounds like a reasonable question on the surface.

Jerusalem is exactly where Paul's enemies were already waiting to kill him.

Festus may not have known about the plot, but the danger was still real.

Paul has every reason to refuse this offer.

❓ The question sounds reasonable on the surface
🗡️ Jerusalem still held the waiting ambush
⚠️ The danger was real either way
➡️ Paul has every reason to refuse

## 🏛️ I Stand At Caesar's Judgment Seat, Where I Ought To Be Judged

Paul is already standing in a Roman court, under Roman authority.

As a Roman citizen, he had a legal right to be judged by Rome's own system.

He is not asking for a favor here.

He is asking for the trial he is already legally entitled to receive.

🏛️ Paul stands in a Roman court already
📜 Citizenship gave him this legal right
🙅 This is not a favor he requests
➡️ He is asking for what he is owed

## 👑 I Appeal Unto Caesar

Roman citizens had the legal right to ask for their case to be heard by the emperor himself.

This single sentence instantly moves Paul's trial out of the hands of local politics.

Once spoken, a lower official could no longer overturn or ignore it.

Paul uses his citizenship exactly the way Roman law intended it to be used.

👑 Citizens could appeal directly to Caesar
🔄 This moved the case out of local hands
🔒 A lower official could not undo it
➡️ Paul used his rights exactly as intended

## ✅ Hast Thou Appealed Unto Caesar? Unto Caesar Shalt Thou Go

Festus confirms the appeal out loud, making it official.

From this moment forward, Jerusalem is no longer a possible destination for Paul's trial.

The plot to kill him on that road has lost its only opportunity.

Paul's own legal strategy becomes the thing that keeps him alive.

✅ Festus confirms the appeal out loud
🚫 Jerusalem is no longer an option now
🗡️ The ambush has lost its opportunity
➡️ Paul's legal move became his protection

# Acts 25:13-16
# 👑 Agrippa And Bernice Arrive
---
## 👑 King Agrippa And Bernice Came Unto Caesarea To Salute Festus

This Agrippa is Herod Agrippa the Second, great grandson of Herod the Great.

He ruled a small territory under Roman oversight, not all of Judea.

Bernice was his sister, and ancient writers outside the Bible describe rumors about them.

"Salute" here simply means a formal visit to greet a fellow Roman official.

🗺️ He ruled a small territory, not all Judea
💍 Bernice was his sister, rumored lover
🤝 Salute meant a formal greeting visit
➡️ Old rumors still shadow this royal visit

## ⛓️ A Certain Man Left In Bonds By Felix

Festus introduces Paul to Agrippa in a single, almost dismissive line.

"Bonds" refers to Paul's custody, though it was a lenient custody, not a harsh prison.

Festus inherited this case along with the governorship itself.

Two years of a man's life get summed up in one passing sentence.

⛓️ Bonds describes Paul's lenient custody
📥 Festus inherited this case from Felix
🗣️ Paul gets introduced almost in passing
➡️ Two years reduced to one sentence

## ⚖️ The Chief Priests And The Elders Of The Jews Informed Me, Desiring To Have Judgment Against Him

"Judgment against him" means they wanted a conviction already decided, not a fair hearing.

Festus is quietly admitting what kind of request he actually received.

The religious leadership wanted an outcome, not a process.

This detail exposes the real goal behind the original accusation.

⚖️ Judgment against him meant a wanted conviction
🙅 Not a request for a fair hearing
🎯 Leaders wanted an outcome, not a process
➡️ This exposes the real goal all along

## 🛡️ It Is Not The Manner Of The Romans To Deliver Any Man To Die, Before That He Which Is Accused Have The Accusers Face To Face

Festus describes a basic Roman legal principle here.

An accused person had the right to face his accusers directly and answer for himself.

This same right already protected Paul once before, earlier in this very chapter.

Roman law, whatever its flaws, still built in real protection against a hasty execution.

📜 Rome required the accused to face accusers
🛡️ This right already protected Paul before
⚖️ A real legal protection, not just custom
➡️ Even flawed law can still protect the innocent

# Acts 25:17-22
# 🧐 Festus Explains The Real Case
---
## 🤔 They Brought None Accusation Of Such Things As I Supposed

Festus expected to hear about a serious political crime.

Instead, he found something far less dangerous to Rome than he had assumed.

His own confusion reveals just how overstated the original accusations were.

Even the Roman governor can tell the case does not match the alarm around it.

🤔 Festus expected a serious political crime
😮 He found something far less dangerous
📉 His confusion reveals the overstated case
➡️ Even Rome could see the mismatch

## 🏛️ Certain Questions Against Him Of Their Own Superstition

"Superstition" was a dismissive Roman word for a foreign religion they did not respect.

Festus uses it here to describe the entire Jewish faith, including the earliest Christian movement inside it.

He does not see a theological dispute as a real legal matter.

To Rome, this entire case looked like a disagreement over nothing of real substance.

🏛️ Superstition was a dismissive Roman word
✝️ It described Jewish and Christian belief here
🙄 Festus saw no real legal matter in it
➡️ Rome saw religion, not a real crime

## ✝️ Of One Jesus, Which Was Dead, Whom Paul Affirmed To Be Alive

Festus boils the entire gospel down to a single confused sentence.

He cannot explain the resurrection himself, so he describes it almost as a rumor.

This is one of the clearest moments in Acts where an outsider summarizes Christian belief in his own words.

What Festus treats as strange, Paul treats as the center of everything he believes.

✝️ Festus summarizes the gospel in one line
❓ He cannot explain the resurrection himself
👀 An outsider's confused view of belief
➡️ What confused Festus was Paul's whole center

## 🗣️ I Asked Him Whether He Would Go To Jerusalem

Festus retells this moment from his own point of view.

He leaves out that Jerusalem was exactly where an ambush had been planned.

His version makes the offer sound ordinary and harmless.

The full truth, already known to the reader, is more dangerous than Festus admits here.

🗣️ Festus retells this from his side
🙈 He leaves out the planned ambush
😐 His version sounds harmless on purpose
➡️ The reader already knows the real danger

## 👑 Appealed To Be Reserved Unto The Hearing Of Augustus

"Augustus" here is a title for whichever Caesar currently ruled, not one specific emperor.

By this point in history, the actual ruling emperor was Nero.

Paul's appeal goes all the way to the very top of the Roman world.

A prisoner from a small province now has access to the emperor's own court.

👑 Augustus was a title, not one emperor
🏛️ The actual ruler at this time was Nero
📈 Paul's appeal reaches the very top
➡️ A prisoner gained access to the emperor's court

## 👂 I Would Also Hear The Man Myself

Agrippa's curiosity sets up the entire scene that follows in the next chapter.

He has political and religious knowledge that Festus, a Roman outsider, simply lacks.

Festus seems glad for the help, since the case still confuses him.

A king's curiosity is about to give Paul one more audience before he ever reaches Rome.

👂 Agrippa's curiosity sets up chapter twenty six
🧠 He understood Jewish matters better than Festus
😌 Festus welcomed help with a confusing case
➡️ One more audience waits before Rome

# Acts 25:23-27
# 🎭 Paul Brought Forth With Pomp
---
## 🎭 With Great Pomp

"Pomp" means a grand, ceremonial display meant to show off power and status.

The Herod family was known across the ancient world for exactly this kind of display.

Agrippa and Bernice did not simply walk into the room.

Every detail of their entrance was designed to be seen and remembered.

🎭 Pomp means a grand ceremonial display
👑 The Herod family was known for this
🚶 Their entrance was carefully staged
➡️ Every detail was meant to be seen

## 🎖️ The Chief Captains, And Principal Men Of The City

This describes the full regional elite gathered in one room.

Military leaders and the city's most important citizens all came to watch.

Paul, a prisoner facing no proven crime, now stands before an audience built for a king.

The size of the audience says more about Paul's growing importance than any charge against him.

🎖️ Chief captains were military commanders
🏙️ Principal men were the city's leading citizens
👥 A full regional elite gathered to watch
➡️ The audience outgrew the actual charge

## 📣 Crying That He Ought Not To Live Any Longer

This echoes the same hostile crowds already seen back in chapters twenty one through twenty three.

Years and multiple governors later, this demand for Paul's death has not changed at all.

Consistency like this reveals a settled hatred, not a passing moment of anger.

The same cry keeps following Paul from one Roman court to the next.

📣 This echoes earlier hostile crowds
⏳ Years later, the demand stayed the same
💔 This reveals a settled hatred, not anger
➡️ The same cry follows Paul court to court

## ⚖️ I Found That He Had Committed Nothing Worthy Of Death

This is Festus stating his own verdict plainly, in his own words.

A Roman governor, with no reason to favor Paul personally, found him innocent of any capital crime.

This matches what Felix, Lysias, and even the Pharisees already concluded earlier in Acts.

Every Roman official who actually examines the case reaches the very same conclusion.

⚖️ Festus states his own verdict plainly
🙅 He found no crime worthy of death
🔁 Other officials already reached this same conclusion
➡️ Every fair examination lands on innocence

## 🤷 He Himself Hath Appealed To Augustus, I Have Determined To Send Him

Festus is caught in an odd position.

He believes Paul is innocent but must still send him to Rome because Paul demanded it himself.

Roman law required following through on an appeal once it was formally made.

Paul's own legal choice, not any new accusation, is what moves this case forward now.

🤷 Festus believes Paul is innocent
📜 Roman law required honoring the appeal
🚢 An innocent man is sent to Rome anyway
➡️ Paul's own choice drives the case forward

## 👑 I Have No Certain Thing To Write Unto My Lord

"My lord" refers to the emperor, who expected a clear report on every prisoner sent his way.

Festus genuinely does not know what crime to list in his official paperwork.

This hearing exists to help Festus figure out what he is even sending Paul to Rome for.

A governor's confusion becomes the reason Paul gets one more public audience.

👑 My lord refers to the emperor
📄 Festus lacks a clear charge to report
❓ This hearing exists to solve that confusion
➡️ Confusion earns Paul one more audience

## 📋 It Seemeth To Me Unreasonable To Send A Prisoner, And Not Withal To Signify The Crimes Laid Against Him

Roman procedure required a formal report listing specific charges, not vague complaints.

Festus openly admits he cannot meet that basic requirement right now.

This single admission sets up the entire hearing that fills the next chapter.

A confused governor's paperwork problem becomes Paul's open door to speak before a king.

📋 Rome required a formal list of charges
😕 Festus admits he cannot meet that bar
🚪 This sets up the next hearing
➡️ A paperwork problem opened a door for Paul
`.trim();

export const ACTS_TWENTY_FIVE_PERSONAL_SECTIONS = parseActsTwentyFiveRawNotes(ACTS_TWENTY_FIVE_RAW_NOTES);
