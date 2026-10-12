export type ActsTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwentyFourRawNotes(rawText: string): ActsTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 24:${startVerse}` : `Acts 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Acts 24 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWENTY_FOUR_RAW_NOTES = `# Acts 24:1-4
# ⚖️ Tertullus Opens With Flattery
---
## 📆 After Five Days

"Five days" does not count from Paul's arrest back in Jerusalem.

It counts from the night soldiers rushed him into Caesarea at the end of the last chapter.

Ananias and the elders needed that time to travel the distance themselves.

They also needed to find and hire the right kind of speaker for a Roman court.

Bringing a formal case this fast shows how determined they still were after their murder plot failed.

📆 Five days counts from Paul's arrival
🚶 The elders traveled from Jerusalem themselves
⚖️ They needed time to build a case
➡️ Failure did not end their determination

## 🎙️ A Certain Orator Named Tertullus

"Orator" means a skilled public speaker, trained to argue cases in formal settings.

Roman trials rewarded rhetoric and performance as much as they rewarded facts.

Jewish leaders often lacked training in that specific Roman style of argument.

Hiring Tertullus meant hiring someone who knew exactly how to speak to a Roman governor.

🎙️ Orator means a trained public speaker
🏛️ Roman trials rewarded skilled rhetoric
📜 Jewish leaders lacked that training
➡️ Hiring him meant hiring persuasion itself

## 😊 We Enjoy Great Quietness

Tertullus opens with flattery, a standard move in Roman courtroom speeches.

Calling Felix's rule peaceful was not simply true.

Ancient historians record Felix's time in office as marked by unrest and harsh crackdowns.

The praise was strategy, not an honest account.

Flattering the judge first was expected to soften him before the real accusation came.

😊 Flattery opened the speech on purpose
📜 Felix's actual rule was far from peaceful
🎭 Praise here was strategy, not truth
➡️ Softening the judge came before the charge

## 👑 Most Noble Felix

"Most noble" was a formal title given to Roman officials of high rank.

It had nothing to do with Felix's actual character.

Felix had once been an imperial slave, later freed and promoted through family connections in Rome.

The title was protocol, not praise he had earned.

👑 Most noble was a formal Roman title
⛓️ Felix had once been an imperial slave
🤝 Family connections in Rome promoted him
➡️ Protocol, not earned praise

## 🙏 With All Thankfulness

This phrase closes the opening flattery before Tertullus gets to his actual accusation.

Ancient courtroom speeches followed a known pattern, praise first, charges second.

A listener trained in rhetoric would recognize the shift coming.

Paul will use this exact same opening move himself when he speaks later in the chapter.

🙏 Thankfulness ends the flattery section
📜 Ancient speeches followed praise then charges
👂 Trained listeners expected the shift
➡️ Paul later opens the same way

## 🤏 Of Thy Clemency A Few Words

"Clemency" means mercy or patience, here used to mean Felix's willingness to listen.

Promising "a few words" was another rhetorical trick.

Tertullus goes on to deliver a full formal accusation, not a short remark.

Claiming brevity made the speech sound more reasonable than it actually was.

🤏 Clemency means mercy or patience
🎭 A few words was not literal
📜 The speech that followed was lengthy
➡️ Claiming brevity made it sound reasonable

# Acts 24:5-9
# 🔥 Tertullus States The Charges
---
## ☣️ A Pestilent Fellow

"Pestilent" compares Paul to a disease, something that spreads harm wherever it goes.

The word was meant to strip away any sympathy before the real charges were even named.

Calling someone a plague was a common insult for a public troublemaker in the ancient world.

Tertullus wants Felix picturing an infection, not a man.

☣️ Pestilent compares Paul to a disease
💔 The word removes sympathy in advance
🗣️ A common ancient insult for troublemakers
➡️ Felix is meant to picture an infection

## 🔥 A Mover Of Sedition

"Sedition" means stirring up rebellion against a government's authority.

This was one of the most serious charges a Roman court could hear.

Rome executed people for proven sedition because it threatened the empire itself.

Tertullus is not accusing Paul of a religious dispute here.

He is accusing him of a capital crime against Rome.

🔥 Sedition means stirring up rebellion
⚖️ Rome treated this as a capital charge
🏛️ A threat against the empire itself
➡️ This was no small accusation

## ✝️ The Sect Of The Nazarenes

"Nazarenes" was an early outside label for the followers of Jesus of Nazareth.

Christians had not yet taken on the name used later in history.

Calling it a "sect" suggested a small, suspicious splinter group rather than a legitimate faith.

This is one of the earliest recorded uses of a name for the church from outside its own members.

✝️ Nazarenes named followers of Jesus of Nazareth
🏷️ Christians had no settled name yet
🎭 Sect suggested a suspicious splinter group
📖 An early outside name for the church

## 🏛️ Gone About To Profane The Temple

"Profane" means to treat something sacred as common or unclean.

Defiling the temple was a charge serious enough to carry the death penalty under Jewish law.

This accusation alone could have gotten Paul executed if it had actually been proven.

Nothing in Acts twenty one shows Paul ever entering the restricted area reserved only for Jews.

🏛️ Profane means treating something sacred as common
⚰️ Temple defilement carried a possible death penalty
❓ Nothing in Acts twenty one proves this
➡️ A capital charge built on nothing

## 👊 With Great Violence Took Him Away

Tertullus describes Lysias rescuing Paul as if it were an act of theft.

Acts twenty three already showed Lysias saving Paul from a mob and a secret murder plot.

Framing a rescue as violence flips the real story completely backward.

The chief captain becomes the villain in this version instead of the hero.

👊 Tertullus reframes a rescue as violence
🛡️ Acts twenty three already told the real story
🔄 The story gets flipped completely backward
➡️ A rescuer becomes a villain here

## 👥 The Jews Also Assented

"Assented" means they agreed with and backed up what had just been said.

A single accuser's word carried little legal weight on its own.

Having a crowd nod along made the accusation look far more credible to Felix.

None of them had to answer a single question about what they actually witnessed.

👥 Assented means agreeing and backing up a claim
⚖️ One accuser alone carried little weight
🎭 A crowd nodding made it look credible
➡️ No one answered a single question

# Acts 24:10-16
# 🗣️ Paul Answers The Charges
---
## 🙋 The Governor Had Beckoned Unto Him To Speak

Paul could not simply speak whenever he wanted in a Roman courtroom.

"Beckoned" means Felix made a signal giving him formal permission.

Roman trials followed strict order, accuser first, then the accused.

Paul waits for his turn instead of interrupting Tertullus.

🙋 Beckoned means a formal signal to speak
📜 Roman trials followed a strict order
⏳ Paul waits for his proper turn
➡️ Order mattered even inside a plot against him

## 📆 Of Many Years A Judge Unto This Nation

Paul is not flattering Felix the way Tertullus just did.

Felix had actually governed Judea for several years by this point.

That experience meant Felix already understood Jewish customs and disputes better than most Roman officials.

Paul can speak plainly because his judge already knows the background.

📆 Felix had governed Judea for years already
🧠 He understood Jewish customs better than most
🗣️ Paul can speak plainly because of that
➡️ Experience lets Paul skip lengthy explanation

## 🧮 But Twelve Days Since I Went Up To Jerusalem

Paul gives Felix an exact, checkable number.

Twelve days is barely enough time to arrive, worship, get arrested, and travel to Caesarea.

There was no real window left for Paul to organize a citywide uprising.

A specific number is much harder to argue against than a vague accusation.

🧮 Twelve days is an exact, checkable number
⏱️ Barely enough time for the events described
🚫 No real window for an uprising
➡️ Specific numbers defeat vague accusations

## 🙅 Neither Raising Up The People

"Raising up the people" was the ancient way of describing starting a riot.

This phrase answers the sedition charge directly, word for word.

Paul says plainly that none of the accusers actually saw him doing this.

An accusation without a single eyewitness has no real legal weight.

🙅 Raising up the people meant starting a riot
🎯 This answers the sedition charge directly
👀 No accuser actually witnessed this
➡️ An accusation needs more than a claim

## ⚖️ Neither Can They Prove The Things

Roman law, like most legal systems, placed the burden of proof on the accuser.

Paul is not required to prove his own innocence here.

Tertullus made serious claims but produced no witnesses who actually saw any crime.

A court built on proof protects people from exactly this kind of attack.

⚖️ Proof was the accuser's job, not Paul's
🚫 No witnesses backed up the claims
🛡️ Courts built on proof protect the innocent
➡️ Serious claims still need real evidence

## 📖 The Way Which They Call Heresy

"Heresy" in this period simply meant a school of thought or a sect.

It did not yet carry today's meaning of false, dangerous teaching.

Paul is willing to use the accusers' own label for a moment.

He is not admitting to anything false by using their word.

📖 Heresy once just meant a school of thought
🔄 It did not mean false teaching yet
🗣️ Paul borrows their own label briefly
➡️ A word can change meaning over time

## 📜 The God Of My Fathers

Paul insists that following Jesus is not a brand new religion.

He is still worshiping the same God worshiped by Abraham, Isaac, and Jacob.

Everything he believes lines up with the law and the prophets already accepted as scripture.

Christianity, in Paul's own words, continues the story rather than replacing it.

📜 Paul claims the same God as his ancestors
📖 He points to the law and the prophets
🔄 This continues the story, not replaces it
➡️ Paul is no stranger to his own faith

## ⚰️ A Resurrection Of The Dead, Both Of The Just And Unjust

The resurrection was already a major flashpoint in the council scene back in chapter twenty three.

Paul says this hope reaches everyone who has ever died, not just the righteous.

Judgment, not just reward, waits on the other side of that resurrection.

This belief was not some fringe idea Paul invented.

⚰️ This hope already split the council
⚖️ Both the just and unjust will face it
👑 Judgment waits alongside the reward
➡️ Paul invented none of this belief

## 🤝 Which They Themselves Also Allow

Not every accuser in the room actually disagreed with Paul on this point.

Pharisees already believed in the resurrection, as chapter twenty three showed.

Paul is quietly pointing out a split inside his own accusers' camp.

The very people attacking him are divided among themselves on this very issue.

🤝 Some accusers already agreed with Paul
🧠 Pharisees already believed in the resurrection
⚔️ Paul points out their own division
➡️ Paul's opponents disagree with each other

## 🕊️ A Conscience Void Of Offence

Paul used this same word, conscience, back in chapter twenty three before the council.

Here he adds something new, a clear conscience toward other people as well as toward God.

He is not claiming to be sinless.

He is claiming he has not knowingly wronged anyone on either side.

🕊️ Paul used this same word before
➕ Here he adds conscience toward people too
🚫 Not a claim of sinless living
📖 Paul claims honest effort, not perfection

# Acts 24:17-21
# 🎯 Paul Names What Actually Happened
---
## 💰 After Many Years I Came To Bring Alms

"Alms" means money or goods given to help the poor.

Paul traveled to Jerusalem carrying a collection gathered from churches in other cities.

Other letters Paul wrote describe this same collection for poor believers in Jerusalem.

Paul came to give generously, not to start trouble.

💰 Alms means money given to help the poor
✈️ Paul carried a collection from other churches
📜 Other letters describe this same gift
➡️ Paul arrived to give, not to fight

## 🌍 Certain Jews From Asia

These are the same accusers who actually started the riot back in chapter twenty one.

None of them traveled to Caesarea to repeat the charge in person.

Paul points out that his real accusers are conveniently missing from this trial.

A charge nobody will repeat under oath carries little weight.

🌍 They started the riot in chapter twenty one
🚫 None of them came to repeat it here
❓ Paul's real accusers are conveniently missing
➡️ An absent accuser proves very little

## 🛁 Found Me Purified In The Temple

Paul was not defiling the temple when this all began.

He was in the middle of a purification ritual described back in chapter twenty one.

That ritual was a sign of respect for Jewish law, not an attack on it.

The very charge from Tertullus is the opposite of what Paul was actually doing.

🛁 Paul was completing a purification ritual
📖 Chapter twenty one already describes this
🙏 The ritual honored Jewish law
➡️ The real facts contradict the charge

## 🚫 Neither With Multitude, Nor With Tumult

"Tumult" means a loud, chaotic disturbance.

Paul insists no crowd and no chaos surrounded him that day.

This directly answers the charge that he was a mover of sedition.

A riot needs a crowd, and Paul says plainly there was not one around him.

🚫 Tumult means a loud chaotic disturbance
🙅 Paul insists no crowd surrounded him
🎯 This answers the sedition charge directly
➡️ A riot needs a crowd that never came

## 👤 Who Ought To Have Been Here Before Thee

The men who actually caused the uproar in Jerusalem are not in this room.

Roman law expected real accusers to show up and testify directly.

Paul is naming a legal problem with the whole case, not just defending his character.

Hearsay should never carry the same weight as a witness under oath.

👤 The actual accusers never showed up
📜 Roman law expected direct testimony
⚖️ Paul names a real legal problem
➡️ Hearsay should never outweigh a sworn witness

## 🏛️ While I Stood Before The Council

This points back to chapter twenty three.

Paul invites Felix to ask anyone who was actually present that day.

The only real disturbance in that room came from the council members themselves.

Paul was not the one who caused the shouting.

🏛️ This points back to chapter twenty three
👂 Paul invites anyone present to speak up
⚔️ The council caused its own disturbance
➡️ Paul was not the source of the chaos

## ⚰️ Touching The Resurrection Of The Dead

Paul narrows the entire case down to a single sentence he actually said.

Everything Tertullus called sedition and temple defiling shrinks down to one theological claim.

Paul is willing to be judged on that one sentence alone.

If belief in the resurrection is his only real crime, Rome has no case against him.

⚰️ Paul narrows the case to one sentence
📉 Every charge shrinks to one belief
⚖️ Paul will be judged on that alone
➡️ Belief in resurrection is no crime

# Acts 24:22-23
# ⏳ Felix Delays The Verdict
---
## 🧠 Having More Perfect Knowledge Of That Way

Felix already knew real details about "the Way," the early name for Christianity.

A Roman governor over this region would have heard about it long before this trial.

His knowledge means he recognized the charges as weaker than they sounded.

Felix understood more than he ever lets Tertullus or the council know.

🧠 The Way was an early name for Christianity
👂 Felix likely heard about it before this trial
🎭 His knowledge exposed the weak charges
➡️ Felix knew more than he admitted

## ⏳ He Deferred Them

"Deferred" means he postponed a decision instead of making one.

Delay was a common and accepted Roman legal tactic.

Waiting for Lysias gave Felix a reasonable excuse to avoid ruling either way.

A governor who never rules never has to take a side.

⏳ Deferred means postponing a decision
📜 Delay was a normal Roman legal tactic
🎭 Waiting gave Felix a convenient excuse
➡️ Avoiding a ruling avoided taking a side

## 🔓 To Keep Paul, And To Let Him Have Liberty

This was a lenient form of custody, not a harsh prison cell.

Paul remained guarded but was treated with real respect.

Roman citizenship, raised earlier in Acts, likely shaped this gentler treatment.

Paul was restrained in his movement, not in his safety or basic comfort.

🔓 This custody was lenient, not harsh
🛡️ Paul remained guarded but respected
🏛️ Citizenship likely shaped this treatment
➡️ Restrained movement, not restrained comfort

## 👥 Forbid None Of His Acquaintance To Minister Unto Him

Paul's friends could freely visit and support him during this custody.

That access meant his ministry did not simply stop while he waited.

Other New Testament letters may trace back to visits like these.

A lenient guard unintentionally kept Paul's work alive during a long wait.

👥 Friends could freely visit Paul
🔄 His ministry continued during custody
📜 Some letters may trace to these visits
➡️ A lenient guard kept his work alive

# Acts 24:24-27
# 👑 Felix, Drusilla, And Two Wasted Years
---
## 👑 His Wife Drusilla, Which Was A Jewess

Drusilla was the daughter of Herod Agrippa the First, a Jewish ruler mentioned earlier in Acts.

She had already been married to another king before Felix took her as his own wife.

Historical records outside the Bible describe this marriage as a scandal at the time.

Felix was judging a Jewish prisoner while living inside a relationship Jewish law condemned.

👑 Drusilla was a daughter of Herod Agrippa
💍 She had already been married before this
📜 Outside records call this marriage a scandal
➡️ Felix judged Paul while living in scandal

## ✝️ Heard Him Concerning The Faith In Christ

"The faith" became an early shorthand name for belief in Jesus.

This was a private meeting, not a formal trial like before.

Curiosity, not justice, seems to be the real reason for this visit.

Drusilla's own Jewish background may have sparked some of that curiosity too.

✝️ The faith was shorthand for belief in Jesus
🔄 This meeting was private, not a trial
👀 Curiosity likely drove this visit
➡️ Drusilla's background may have shaped the curiosity

## ⚖️ Righteousness, Temperance, And Judgment To Come

Paul did not pick these three topics at random.

Felix was known for using his power unfairly and judging by financial self interest, not righteousness.

"Temperance" means self control, something a man married through scandal clearly lacked.

Judgment to come was the one subject neither Felix nor Drusilla wanted to hear.

⚖️ Three topics chosen with real purpose
💔 Righteousness confronted Felix's unfair rule
🚫 Temperance confronted his lack of self control
➡️ Judgment confronted what neither wanted to face

## 😨 Felix Trembled

This is a rare moment where Paul's preaching visibly shakes a powerful man.

Fear, not faith, is what actually moves Felix here.

He recognizes the truth in the moment but does not act on it.

Conviction without action changes nothing in the end.

😨 Felix visibly shook at the message
🧠 He recognized truth without embracing it
🚫 Fear moved him more than faith did
➡️ Conviction without action changes nothing

## 🕰️ When I Have A Convenient Season

This phrase has become famous as a symbol of stalling.

Felix never actually finds that convenient season anywhere in the rest of this chapter.

Putting off a decision about Christ never actually makes the decision easier later.

Felix's own words describe a moment that simply never arrives.

🕰️ A famous phrase for stalling
🚫 That season never actually arrives
⏳ Delay never makes a decision easier
➡️ Some choices do not wait forever

## 💰 He Hoped Also That Money Should Have Been Given Him

Felix wanted a bribe in exchange for Paul's freedom.

Roman officials historically faced real accusations of corruption, including Felix himself.

Visiting Paul "the oftener" was not kindness, it was a quiet shakedown.

Justice took a back seat to Felix's own greed.

💰 Felix wanted a bribe for Paul's release
📜 History records real corruption charges against him
🎭 Frequent visits hid a quiet shakedown
➡️ Greed replaced justice in this case

## 📆 After Two Years Porcius Festus Came

Paul waited in custody for two full years under Felix.

Porcius Festus was a real, historically documented governor who succeeded Felix in Judea.

This detail helps historians date the events of Acts with real confidence.

Two years of Paul's life passed simply because Felix refused to decide.

📆 Paul waited two years in custody
🏛️ Festus was a real historical governor
🗓️ This detail helps date the book of Acts
➡️ Years passed because Felix would not decide

## 🎭 Willing To Shew The Jews A Pleasure, Left Paul Bound

"Shew" is an old way of saying show.

Felix wanted to leave office on good terms with Jewish leaders, not with Paul.

Leaving Paul bound was a political favor that cost Felix nothing personally.

Two years of injustice ended with one final act of self interest.

🎭 Shew is an old word for show
🤝 Felix wanted goodwill with Jewish leaders
⛓️ Leaving Paul bound cost him nothing
➡️ Self interest opened and closed this chapter
`.trim();

export const ACTS_TWENTY_FOUR_PERSONAL_SECTIONS = parseActsTwentyFourRawNotes(ACTS_TWENTY_FOUR_RAW_NOTES);
