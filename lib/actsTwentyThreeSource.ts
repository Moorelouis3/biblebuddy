export type ActsTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwentyThreeRawNotes(rawText: string): ActsTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 23:${startVerse}` : `Acts 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Acts 23 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWENTY_THREE_RAW_NOTES = `# Acts 23:1-5
# 😤 Paul Strikes Back At The Council
---
## 👁️ Earnestly Beholding The Council

"The council" means the Sanhedrin, the top Jewish court in Jerusalem.

It held seventy elders plus the high priest himself.

This is the same body that handed Jesus over for crucifixion.

Paul looks straight at them instead of looking away.

His steady gaze shows confidence, not disrespect.

🏛️ Council means the Jewish Sanhedrin court
⚖️ Seventy elders plus the high priest
✝️ The same body that condemned Jesus
➡️ Paul meets their eyes with confidence

## 👊 Smite Him On The Mouth

Striking someone on the mouth was a way to silence and shame a speaker.

This happened before any formal accusation or verdict was given.

Roman and Jewish law both expected an accused man to be heard, not struck.

Ananias breaks his own court's order the instant Paul starts speaking.

👊 A strike on the mouth meant shame
🚫 This came before any formal verdict
📜 Both Roman and Jewish law required a hearing
➡️ Ananias breaks the law meant to protect him

## 🙏 I Have Lived In All Good Conscience

This is not Paul claiming he never sinned.

A clear conscience means he was not hiding anything or living in deceit.

He had obeyed what he understood God was asking of him, before and after his conversion.

Even his past persecution of Christians was done sincerely, in ignorance, not malice.

Paul opens his defense by naming his own integrity first.

🙏 Clear conscience does not mean sinless
🚫 Paul claims honesty, not perfection
🔄 True even before and after his conversion
➡️ Paul opens by naming his integrity

## 🎨 Thou Whited Wall

"Whited wall" means something painted to look clean while hiding decay underneath.

Paul throws the same kind of insult Jesus once used for hypocritical leaders.

Ananias looked impressive in his priestly robes but had just broken the law himself.

The judge who ordered Paul struck becomes the one accused of corruption.

🎨 Whited wall means painted over decay
🗣️ Jesus used this same kind of insult
👔 Ananias looked clean but broke the law
➡️ The accuser becomes the accused

## ⚖️ Sittest Thou To Judge Me After The Law

Jewish law required a formal trial before any punishment was given.

Paul had not been convicted of anything when the order to strike him came.

He points out that the judge broke the very law he was supposed to uphold.

This is a sharp, specific legal objection, not just an angry insult.

📜 Jewish law required trial before punishment
🚫 Paul had not been convicted yet
⚖️ The judge broke his own law
➡️ A legal objection, not just anger

## 👑 Revilest Thou God's High Priest

The high priest held the most honored religious office in Israel.

Speaking against him was treated as an insult against God himself.

The bystanders assume Paul is just lashing out without a real reason.

They do not yet know that Ananias had just broken the law.

👑 High priest held Israel's highest office
🙏 Insulting him was treated like insulting God
❓ Bystanders assume Paul has no real reason
➡️ They do not know what Ananias did

## 🤷 I Wist Not That He Was The High Priest

"Wist" is an old word for knew.

Paul says he did not realize the man was the high priest.

Many scholars believe Paul could not see Ananias clearly in the crowd.

Others think Paul is speaking with irony, since Ananias was not acting like one.

The text does not tell us which reading is certain.

👀 Paul says he did not recognize him
🤔 Many scholars believe this was literal
❓ Others hear irony in Paul's words
📖 Wist is an old word for knew

## 📜 Speak Evil Of The Ruler Of Thy People

Paul quotes a command from the law of Moses, found in Exodus.

He is proving he respects scripture even while defending himself.

The rule protected any appointed ruler from being cursed or mocked.

Paul corrects his own tone the moment he learns who he insulted.

📜 Paul quotes the law of Moses
🙏 He respects scripture while defending himself
👑 The rule protected any appointed ruler
➡️ Paul corrects himself once he knows

# Acts 23:6-11
# ⚖️ Pharisees Against Sadducees
---
## 🧠 I Am A Pharisee, The Son Of A Pharisee

Paul names his background to split the council against itself.

Pharisees and Sadducees disagreed sharply about life after death.

Paul knows exactly which side will defend him once he says this.

This is a deliberate strategy, not just a statement of pride.

🧠 Paul names his religious background
⚔️ Pharisees and Sadducees disagreed on resurrection
🎯 Paul knows this will split the room
➡️ A deliberate strategy, not simple pride

## ✝️ Of The Hope And Resurrection Of The Dead

Paul is not just picking a side to save himself.

The resurrection of the dead was the heart of his actual message about Jesus.

By raising this topic, he turns his trial into a conversation about the gospel.

The council ends up arguing about the very truth Paul has been preaching.

✝️ Resurrection was the heart of Paul's message
🗣️ He turns his trial into a gospel moment
🔥 The council argues his own point for him
➡️ Even a trial becomes an opportunity

## ⚔️ There Arose A Dissension Between The Pharisees And The Sadducees

A trial meant to question Paul turns into the two groups attacking each other.

Old theological arguments between Pharisees and Sadducees resurface instantly.

Paul becomes almost a bystander to a fight that was already brewing before he spoke.

This chaos becomes part of what eventually saves his life.

⚔️ The two groups turn on each other
🔥 Old arguments resurface instantly
👀 Paul becomes a bystander to their fight
➡️ Their chaos ends up protecting him

## 🏛️ The Sadducees Say There Is No Resurrection

Sadducees were a wealthy, priestly group tied closely to the temple.

They only accepted the five books of Moses as scripture.

They denied any resurrection, angels, or spirits because those ideas are not clearly in those five books.

This single belief put them at odds with ordinary Jewish hope.

🏛️ Sadducees were a wealthy priestly group
📜 They only trusted the five books of Moses
🚫 They denied resurrection, angels, and spirits
➡️ One belief divided the whole council

## 🙌 The Pharisees Confess Both

Pharisees believed firmly in the resurrection of the dead.

They also believed in angels and spirits as real and active.

They were popular with ordinary people and read scripture more broadly than the Sadducees.

Paul had been trained as one of them before he met Jesus.

🙌 Pharisees believed in the resurrection
👼 They believed in angels and spirits
👥 They were popular with ordinary people
➡️ Paul was trained among them

## 🔄 We Find No Evil In This Man

Pharisee scribes suddenly defend the very man they were trying to convict.

Their real target has shifted from Paul to the Sadducees across the room.

They even raise the chance that an angel or spirit spoke to Paul.

A trial meant to condemn Paul briefly turns into his unlikely defense.

🔄 Pharisees suddenly defend Paul instead
🎯 Their real fight is with the Sadducees
👼 They consider an angel may have spoken
➡️ The trial briefly turns in Paul's favor

## 🪖 Fearing Lest Paul Should Have Been Pulled In Pieces

The chief captain was the Roman officer in charge of the garrison in Jerusalem.

The argument had grown violent enough to tear a prisoner apart physically.

Rome cared more about keeping order than about settling a religious dispute.

Soldiers pull Paul out before either side can do real damage.

🪖 Chief captain led the Roman garrison
😨 The dispute turned physically dangerous
🏛️ Rome valued order over religious disputes
➡️ Soldiers rescue Paul from both sides

## 🏰 Bring Him Into The Castle

"The castle" refers to the Roman fortress attached to the temple area.

Roman soldiers were stationed there to respond quickly to any unrest.

Paul is pulled from danger straight into Roman protective custody.

This fortress becomes his safe base for the chapters that follow.

🏰 The castle was a Roman fortress
🪖 Roman soldiers were stationed there
🛡️ Paul is moved into their custody
➡️ This fortress becomes his safe base

## 🌙 Be Of Good Cheer, Paul

God speaks directly to Paul the same night, right after the chaos.

This encouragement arrives exactly when Paul might feel most alone.

The Lord does not promise an easy road, only His continued presence.

Comfort here comes paired with a clear mission, not just comfort alone.

🌙 God speaks to Paul that same night
😌 Comfort arrives right after real danger
🤝 Presence is promised, not an easy road
➡️ Comfort comes paired with a mission

## 🗺️ So Must Thou Bear Witness Also At Rome

This single sentence previews the rest of the book of Acts.

Paul had already testified about Jesus in Jerusalem, as this verse says.

Now God tells him plainly that Rome is still ahead of him.

Everything that happens for the rest of Acts moves toward this promise.

🗺️ This verse previews the rest of Acts
📣 Paul already testified in Jerusalem
🏛️ Rome is confirmed as his next stop
📖 Every later chapter moves toward this promise

# Acts 23:12-15
# 🗡️ A Plot To Kill Paul
---
## 🤝 Bound Themselves Under A Curse

This group makes a formal vow, calling down a curse on themselves if they fail.

Refusing food and drink was a way to prove how serious the vow was.

This was not an angry threat spoken in the heat of the moment.

It was a deliberate, binding commitment to murder.

🤝 A curse vow calls judgment on themselves
🍽️ Fasting proved how serious the vow was
🗡️ This was planned, not a sudden threat
➡️ A binding commitment to commit murder

## 🔢 More Than Forty Which Had Made This Conspiracy

Forty or more men agreed together to carry out this plan.

That number shows real organization, not a few angry individuals.

Some among them likely had real influence or useful connections.

Paul faces a coordinated plot, not a random mob.

🔢 Forty or more men joined the plot
🧩 Real organization, not a few angry men
🎯 Paul faces a coordinated conspiracy
➡️ This was planned, not random anger

## 🏛️ They Came To The Chief Priests And Elders

The conspirators bring their plan to the same leaders already hostile to Paul.

This links ordinary zealots directly to the official religious leadership.

The chief priests and elders do not stop the plan or report it.

Their silence makes them part of the plot.

🤝 Conspirators ally with the religious leaders
🏛️ This links the plot to official leadership
🤐 Leaders stay silent instead of stopping it
➡️ Silence makes them part of the plan

## 🔁 We Will Eat Nothing Until We Have Slain Paul

The plan is restated here almost word for word from the start of the plot.

Repeating it this way shows how fixed and unshakable their intention had become.

A vow like this left little room for the conspirators to quietly back out.

Their own words were now a trap for themselves as much as for Paul.

🔁 The vow is restated almost word for word
🗜️ Repetition shows how fixed their resolve was
🚪 The vow left little room to back out
➡️ Their own words became a trap too

## 📝 Signify To The Chief Captain

"Signify" means to make a formal request or notify officially.

The council plans to make this request sound routine and proper.

Behind that polite request sits a plan to commit murder.

Religious authority is being used to disguise violence.

📝 Signify means to request formally
🎭 The request is made to sound routine
🗡️ Murder hides behind a polite request
➡️ Authority is used to disguise violence

## 🎭 Or Ever He Come Near, Are Ready To Kill Him

The plan asks the chief captain to bring Paul back for a fake hearing.

The real goal is an ambush before Paul even reaches the council room.

Every detail of the plot depends on the captain trusting the council's request.

Paul's life now depends entirely on that plan being discovered in time.

🎭 The hearing request is just a trick
🗡️ The real plan is an ambush
🤞 Everything depends on the captain trusting them
➡️ Paul's life depends on this plot failing

# Acts 23:16-22
# 🤫 The Nephew Warns Paul
---
## 👨‍👩‍👧 Paul's Sister's Son

This verse reveals Paul has family living in Jerusalem.

His nephew somehow hears about the plot before it happens.

Family connection becomes the way God protects Paul here.

Scripture rarely mentions Paul's relatives, which makes this detail stand out.

👨‍👩‍👧 Paul had family living in Jerusalem
👂 His nephew learns of the plot early
🛡️ Family becomes the means of protection
➡️ A rare glimpse into Paul's relatives

## 🪖 Called One Of The Centurions Unto Him

A centurion commanded about a hundred Roman soldiers.

Paul, though a prisoner, still has enough standing to request a meeting.

His Roman citizenship, mentioned earlier in Acts, likely earned him this respect.

Paul uses that access immediately to protect his own life.

🪖 A centurion commanded about a hundred soldiers
🙋 Paul still has standing despite being a prisoner
🏛️ His citizenship likely earned this respect
➡️ Paul uses this access to stay alive

## 🔁 Paul The Prisoner Called Me Unto Him

The centurion repeats Paul's own words almost exactly to his superior.

He treats Paul's request seriously instead of dismissing a prisoner's concern.

Paul had clearly earned a measure of trust during his time in custody.

A chain of respect carries this warning all the way to the top.

🔁 The centurion repeats Paul's words exactly
🙏 He takes a prisoner's request seriously
🤝 Paul had earned trust in custody
➡️ Respect carries the warning upward

## 🤝 Took Him By The Hand, And Went With Him Aside Privately

The chief captain wants no one else to overhear this conversation.

Taking him by the hand was a gesture of care, not force.

Privacy protects both the young man and the information itself.

The captain already senses this news matters more than routine prisoner business.

🤝 The hand gesture shows care, not force
🤫 Privacy protects the young man's safety
🔒 Secrecy protects the information itself
➡️ The captain senses this news matters

## 👂 What Is That Thou Hast To Tell Me

The chief captain does not dismiss a message passed through a lowly prisoner.

He takes time personally to hear it out in private.

This same captain had already shown fairness earlier in the chapter.

A willingness to listen carefully becomes the thing that saves Paul's life.

👂 The captain takes the message seriously
🤝 He listens personally and in private
⚖️ He had already shown fairness earlier
➡️ Careful listening saves Paul's life

## 👥 The Jews Have Agreed To Desire Thee

"The Jews" here means the specific conspirators, not the whole Jewish nation.

This group has disguised their murder plot as a normal legal request.

They are counting on the captain not knowing their real plan.

Their request sounds reasonable on the surface alone.

👥 The Jews here means the conspirators only
🎭 Murder is disguised as a legal request
🤞 They count on the captain's trust
➡️ The request sounds reasonable on the surface

## ✅ There Lie In Wait For Him Of Them More Than Forty Men

The nephew's report matches the plot already described back in verse thirteen.

Two separate sources now confirm the same number and the same plan.

This agreement removes any doubt about whether the threat is real.

The chief captain now has every reason to act immediately.

🔢 Forty men matches the earlier report
✅ Two sources confirm the same plot
🚫 No real doubt is left here
➡️ The captain now must act fast

## 🤐 See Thou Tell No Man That Thou Hast Shewed These Things To Me

"Shewed" is an old way of saying showed or revealed.

The captain protects his source the same way Paul protected his.

If word got out, the nephew's life would be in immediate danger.

Secrecy here saves two lives, not just one.

📖 Shewed is an old word for showed
🤐 The captain protects his source carefully
⚠️ Exposure would endanger the nephew's life
➡️ Secrecy here protects two lives

# Acts 23:23-30
# ✉️ The Letter To Felix
---
## 🪖 Horsemen Threescore And Ten, And Spearmen Two Hundred

Nearly five hundred armed men escort a single prisoner out of Jerusalem.

"Threescore and ten" is an old way of saying seventy.

This massive force shows exactly how seriously the captain takes the threat.

Paul leaves the city safer than almost anyone else in it that night.

🔢 Threescore and ten means seventy
🪖 Nearly five hundred men guard one prisoner
⚠️ The size reveals how real the threat was
➡️ Paul leaves the city heavily protected

## 🌙 At The Third Hour Of The Night

Roman nights were divided into watches, not hours the way clocks mark them today.

The third hour of the night falls around nine in the evening.

Moving Paul in darkness kept the conspirators from noticing in time.

Speed and secrecy together kept the escort ahead of the plot.

🌙 Roman nights were divided into watches
🕘 This hour falls around nine at night
🤫 Darkness hid the escort from the plotters
➡️ Speed and secrecy protected Paul's life

## 🏛️ Bring Him Safe Unto Felix The Governor

Felix was the Roman governor over Judea at this time.

He held full legal authority over Paul's case from this point forward.

Rome passes Paul from a local garrison straight to the provincial ruler.

Paul's case has just become a matter for the highest regional court.

🏛️ Felix governed the province of Judea
⚖️ He now holds full authority over Paul
🔄 The case moves to Rome's regional ruler
➡️ Paul faces the highest court in the region

## 🏷️ Claudius Lysias Unto The Most Excellent Governor Felix

This is the first time the chief captain's full name is given, Claudius Lysias.

"Most excellent" was a formal title of respect used for high Roman officials.

The letter follows the standard format of an official Roman report.

Lysias is covering himself legally as much as he is protecting Paul.

🏷️ Claudius Lysias is the captain's full name
🎖️ Most excellent was a formal Roman title
📋 The letter follows standard Roman format
➡️ Lysias protects himself as much as Paul

## 🏛️ Having Understood That He Was A Roman

This refers back to Paul revealing his Roman citizenship earlier in the previous chapter.

Lysias quietly leaves out that he almost had Paul beaten before learning this.

Roman citizenship legally protected a person from being punished without a trial.

Lysias shapes the letter to make his own actions look better than they were.

🏛️ Roman citizenship legally protected Paul
🤐 Lysias leaves out his own near mistake
📜 Citizens could not be punished without trial
➡️ The letter quietly protects Lysias too

## ❓ I Would Have Known The Cause Wherefore They Accused Him

Lysias wanted a clear, specific charge before sending Paul anywhere.

Vague accusations were not enough for a Roman legal process.

This insistence on clarity is what led to the council hearing in the first place.

Paul benefits every time Roman law demands real evidence instead of rumor.

❓ Lysias wanted a clear specific charge
🚫 Vague accusations were not enough
🏛️ This demand led to the council hearing
➡️ Paul benefits when law demands real evidence

## 📝 I Brought Him Forth Into Their Council

Lysias explains that he arranged the earlier hearing just to learn the real charge.

That hearing was the very meeting that erupted into the Pharisee and Sadducee dispute.

Lysias frames his own actions as careful and proper throughout.

The letter smooths over just how chaotic that meeting actually became.

📝 Lysias recaps the earlier council hearing
⚔️ That hearing is the one that erupted
🎭 Lysias frames himself as careful and proper
➡️ The letter smooths over real chaos

## ⚖️ Nothing Laid To His Charge Worthy Of Death Or Of Bonds

Lysias states plainly that Paul has done nothing deserving death or prison.

This is a Roman officer's own written conclusion, not Paul's defense alone.

The accusations against Paul are religious disagreements, not real crimes.

This letter becomes Paul's first official record of innocence.

⚖️ Lysias finds no real crime
📜 This is a Roman officer's own conclusion
🙏 The charges were religious, not criminal
📖 Paul's innocence is now officially recorded

## 📝 Farewell

This single word was the standard way to end a formal Roman letter.

It matches the structure of other real letters preserved from the ancient world.

Luke, the writer of Acts, likely had access to an actual copy of this letter.

This small detail adds real historical weight to the account.

📝 Farewell was the standard Roman closing
📜 It matches real letters from that era
📖 Luke may have used an actual copy
➡️ A small detail that adds real history

# Acts 23:31-35
# 🏰 Paul Arrives In Caesarea
---
## 🗺️ Brought Him By Night To Antipatris

Antipatris was a Roman city about halfway between Jerusalem and Caesarea.

Reaching it required marching through the night at a fast pace.

Once this far, Paul was well beyond the reach of the forty conspirators.

The danger from Jerusalem effectively ends at this point in the journey.

🗺️ Antipatris sat about halfway to Caesarea
🌙 The soldiers marched through the night
🛡️ Paul was now beyond the plotters' reach
➡️ The danger from Jerusalem effectively ends

## 🐎 Left The Horsemen To Go With Him

Only the mounted soldiers continue on with Paul from this point.

The foot soldiers and spearmen return to Jerusalem once the danger has passed.

This detail shows the threat was specific to the roads near Jerusalem.

A smaller, faster escort was now considered safe enough.

🐎 Only the horsemen continue onward
🚶 Foot soldiers return once danger passes
🗺️ The threat was tied to Jerusalem's roads
➡️ A smaller escort was now safe enough

## ⚓ Delivered The Epistle To The Governor

Caesarea was a major port city built by Herod the Great.

It served as the Roman capital of the province of Judea.

Felix the governor lived and ruled from this city.

Paul now stands in the center of Roman power in the region.

⚓ Caesarea was a major port city
🏛️ It served as Rome's provincial capital
👑 Felix governed from this very city
➡️ Paul now stands at Rome's center of power

## 🗺️ He Was Of Cilicia

Cilicia was Paul's home region, with Tarsus as its main city.

Roman officials needed to know a person's home province to confirm proper jurisdiction.

This detail connects back to Paul's own introduction of himself earlier in Acts.

Confirming his province also confirmed Felix had the legal right to hear his case.

🗺️ Cilicia was Paul's home province
🏙️ Tarsus was its main city
⚖️ Jurisdiction depended on knowing his province
➡️ This confirmed Felix had legal authority

## ⚖️ When Thine Accusers Are Also Come

Felix promises Paul a real hearing once his accusers actually arrive.

This mirrors the fair process Lysias had already demanded back in Jerusalem.

Paul's case keeps moving forward through proper legal channels, not through secret plots.

The chapter that began with a planned murder ends with an orderly trial ahead.

⚖️ Felix promises a real hearing
🔁 This mirrors Lysias earlier demand for fairness
📜 Proper legal process keeps protecting Paul
📖 A murder plot ends in an orderly trial

## 🏰 Herod's Judgment Hall

This building was originally Herod the Great's palace, later used as a Roman headquarters.

It held both living quarters and a holding area for prisoners awaiting trial.

Paul now waits safely inside a building built by the very dynasty that once hunted the church.

What was built for a king's comfort now shelters God's prisoner instead.

🏰 Once Herod the Great's own palace
⚖️ Now used as a Roman headquarters
🔒 It held a space for waiting prisoners
📖 A king's palace now shelters God's prisoner
`.trim();

export const ACTS_TWENTY_THREE_PERSONAL_SECTIONS = parseActsTwentyThreeRawNotes(ACTS_TWENTY_THREE_RAW_NOTES);
