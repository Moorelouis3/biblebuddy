export type JobThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirteenRawNotes(rawText: string): JobThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 13:${startVerse}` : `Job 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Job 13 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTEEN_RAW_NOTES = `# Job 13:1-3
# 🎯 Job Wants A Hearing With God
---
## 👁️ Mine Eye Hath Seen All This

Job insists he has watched all of this happen with his own eyes.

"Mine eye hath seen" means personal firsthand experience, not a secondhand report.

Job is not guessing at how life works.

He has lived through the very patterns his friends keep lecturing him about.

Nothing his friends have said is actually new information to him.

👁️ Mine eye hath seen means firsthand experience
🗣️ Job is not guessing at how life works
🤝 He has lived through these same patterns
📖 His friends have told him nothing new

## 🧠 What Ye Know, The Same Do I Know Also

Job's friends have been speaking to him as if he lacks their understanding.

Job flatly denies that gap exists.

He already knows every argument they are about to repeat.

This is the same claim he made back in chapter twelve.

Job needed to say it again because his friends kept ignoring it.

🧠 Job denies any gap in understanding
🔁 He already knows their arguments
📣 This repeats his claim from chapter twelve
➡️ His friends kept ignoring that claim

## ⚖️ I Desire To Reason With God

Job has grown tired of arguing with his friends.

"Reason" here means to lay out a case and expect a fair answer.

Job wants to take his complaint straight to God instead.

He trusts God to judge him honestly, even in his pain.

This desire becomes the driving goal of the rest of the chapter.

⚖️ Reason means to lay out a fair case
🙅 Job is done arguing with his friends
🙏 He wants to speak directly to God
📖 This becomes his goal for the chapter

# Job 13:4-6
# 🩺 Physicians Of No Value
---
## 🔨 Ye Are Forgers Of Lies

"Forgers" means people who make something false and present it as true.

Job accuses his friends of manufacturing explanations that are not actually true.

They have built a whole theology to explain his suffering.

Job says that theology is simply wrong.

This is a serious charge, not a passing insult.

🔨 Forgers means people who make false things
📜 Job says their theology is not true
⚖️ This is a serious charge
➡️ Not a passing insult

## 🩺 Physicians Of No Value

Job pictures his friends as doctors who cannot actually heal anyone.

Think of a doctor who prescribes the same remedy to every patient.

That doctor never even examines what is actually wrong.

Job's friends have offered him that same kind of useless comfort.

Their words have not eased his suffering at all.

🩺 Job compares his friends to bad doctors
💊 A bad doctor prescribes without examining
🗣️ Their advice sounds official but is useless
📖 It has not eased his suffering

## 🤐 O That Ye Would Altogether Hold Your Peace

Job wishes his friends would simply stop talking.

"Hold your peace" means to stay silent.

Job says silence from them would actually be wiser than their speeches.

Their confident answers have made things worse, not better.

Sometimes the wisest thing a friend can do is say nothing.

🤐 Hold your peace means stay silent
🙊 Job wishes they would simply stop
📉 Their speeches made things worse
📖 Silence can be wiser than words

## 👂 Hear Now My Reasoning

Job asks for the same fair hearing he has not been given.

"Reasoning" means the actual argument he is about to make.

"Pleadings of my lips" points to how urgently Job wants to be heard.

Job is not simply venting.

He is presenting a real case and expects real attention.

👂 Job asks for a fair hearing
📢 Reasoning means the case he is making
🙏 Pleadings shows his urgency
➡️ He expects real attention, not dismissal

# Job 13:7-12
# ⚖️ Will Ye Speak Wickedly For God
---
## 🎭 Will Ye Speak Wickedly For God

This does not mean Job's friends are outright lying on purpose.

Job means they are twisting the truth while believing they defend God.

"Wickedly" here describes speech that harms even when it claims a good motive.

Good intentions do not make a false argument true.

Job wants them to see the danger in speaking for God carelessly.

🎭 They believe they are defending God
🗣️ Wickedly means harmful speech, even well meant
🚫 Good intentions do not make it true
📖 Speaking for God carelessly is dangerous

## ⚖️ Will Ye Accept His Person

"Accept his person" is an old way of saying to show favoritism.

Job asks if his friends are simply taking God's side no matter what.

That kind of loyalty is not the same as honesty.

A true friend tells the truth even when it is uncomfortable.

Job's friends have chosen comfort over honesty.

⚖️ Accept his person means show favoritism
🤝 Job asks if they favor God blindly
🗣️ Loyalty is not the same as honesty
📖 They chose comfort over honesty

## 🎭 As One Man Mocketh Another, Do Ye So Mock Him

Job asks a sharp question about how his friends are treating God.

He wonders if they think they can fool God the way they might fool another person.

"Mock" here means to deceive or trick.

Job warns that God cannot be manipulated with clever arguments.

God sees straight through flattery, even flattery meant to defend Him.

🎭 Mock here means to deceive or trick
🙅 God cannot be fooled like a person
👁️ He sees through flattery
📖 Even flattery meant to defend Him fails

## 📢 He Will Surely Reprove You

"Reprove" means to correct someone firmly, pointing out their fault.

Job warns his friends that God will eventually correct them, not him.

Their secret favoritism will not stay hidden forever.

Job flips the accusation back onto the men who accused him.

This is a serious warning, not an empty threat.

📢 Reprove means to correct someone firmly
🙈 Their favoritism will not stay hidden
🔄 Job flips the accusation back on them
📖 This warning is serious, not empty

## 👑 Shall Not His Excellency Make You Afraid

"Excellency" here refers to God's overwhelming greatness and majesty.

"Dread" describes the fear that greatness naturally produces.

Job asks why his friends are not more afraid of misrepresenting someone so great.

They speak about God casually, as if there were no risk in getting Him wrong.

Job wants them to feel the weight of what they are doing.

👑 Excellency means God's overwhelming greatness
😨 Dread is the fear that greatness brings
🗣️ They speak of God too casually
📖 Job wants them to feel that weight

## 🔥 Your Remembrances Are Like Unto Ashes

Job compares his friends' wise sayings to ashes.

Ashes look like they might still hold value, but they crumble at a touch.

"Remembrances" here means the proverbs and old sayings they keep quoting.

Job says those sayings cannot bear the weight they are being asked to carry.

Their arguments about him are just as fragile as clay.

🔥 Remembrances means the old sayings they quote
🌫️ Ashes look solid but crumble at a touch
🏺 Job compares their arguments to clay
📖 Their case cannot bear its own weight

# Job 13:13-16
# 🔥 Though He Slay Me
---
## 🙏 Let Me Alone, That I May Speak

Job asks his friends to step back and let him finally talk.

He no longer cares what consequences his honesty might bring.

Job has decided that silence has cost him more than speaking ever could.

He is ready to say what he actually thinks, whatever it costs.

This sets the tone for one of the boldest speeches in the whole book.

🙏 Job asks to finally be allowed to speak
🎯 He no longer fears the consequences
🗣️ Silence has cost him more than honesty
📖 This is one of Job's boldest moments

## 🦷 I Take My Flesh In My Teeth, And Put My Life In Mine Hand

This is an old idiom describing someone risking everything.

"Put my life in mine hand" means to knowingly walk into danger.

Job knows that speaking honestly to God could go badly for him.

He decides the risk is worth taking anyway.

Job would rather risk everything than stay silent about his innocence.

🦷 The idiom pictures someone facing great danger
✋ It means knowingly taking a huge risk
⚠️ Job knows honesty could go badly
📖 He risks it rather than stay silent

## 💔 Though He Slay Me, Yet Will I Trust In Him

This is one of the most famous lines Job ever speaks.

Job admits God could end his life at any moment.

Even facing that possibility, Job refuses to abandon his trust in God.

This is not blind optimism.

It is trust that holds on even without knowing the outcome.

💔 Job admits God could take his life
🙏 He refuses to abandon his trust
🌑 This is not blind optimism
📖 It is trust without knowing the outcome

## 🙅 I Will Maintain Mine Own Ways Before Him

This does not mean Job claims to be sinless.

"Maintain mine own ways" means Job will keep defending his actual conduct.

He refuses to confess to sins he has not committed just to end the argument.

Job separates trusting God from agreeing with his friends' false accusations.

A person can trust God completely while still disputing an unfair charge.

🙅 Job is not claiming to be sinless
🛡️ He defends his actual conduct
🚫 He will not confess to false sins
📖 Trusting God and disputing lies can coexist

## 🎭 An Hypocrite Shall Not Come Before Him

"Hypocrite" describes someone who pretends to be righteous while hiding sin.

Job says a truly dishonest person could never stand boldly before God like this.

His willingness to appear before God is itself evidence of his honesty.

A guilty man hides.

Job is doing the opposite.

🎭 Hypocrite means pretending to be righteous
🛑 A dishonest person could not do this
🙋 Job's boldness itself is evidence
📖 A guilty man hides, Job does not

# Job 13:17-19
# 🙏 I Know I Shall Be Justified
---
## 👂 Hear Diligently My Speech

Job asks for careful, focused listening, not a quick dismissal.

"Diligently" means paying close, careful attention.

He wants his declaration examined seriously, not brushed aside.

Job believes his case can hold up under real scrutiny.

He is not afraid of a fair hearing.

👂 Diligently means paying careful attention
🎯 Job wants real scrutiny, not dismissal
🛡️ He believes his case can hold up
📖 Job is not afraid of a fair hearing

## ⚖️ I Know That I Shall Be Justified

"Justified" means declared right or innocent.

Job has organized his defense the way a person prepares for trial.

He states his confidence plainly, without hedging.

This confidence comes from his own conscience, not from pride.

Job genuinely believes the truth will clear his name.

⚖️ Justified means declared right or innocent
📋 Job has prepared his case like a trial
🙏 His confidence comes from a clear conscience
📖 He believes the truth will clear him

## 💀 If I Hold My Tongue, I Shall Give Up The Ghost

"Give up the ghost" is an old way of saying to die.

Job says staying silent now would feel like dying inside.

He has held his pain in for far too long already.

Speaking honestly has become as necessary to Job as breathing.

Silence is no longer an option he can survive.

💀 Give up the ghost means to die
🤐 Silence now feels like dying to Job
🗣️ Speaking has become necessary for him
📖 Silence is no longer survivable

# Job 13:20-22
# 🤝 Only Two Requests
---
## 🤝 Only Do Not Two Things Unto Me

Job is about to lay down two specific conditions before God.

He is not refusing to face God at all.

Job simply wants the encounter to be fair.

Meeting these two conditions would let him stop hiding from the conversation.

Job wants honesty, not avoidance, on both sides.

🤝 Job sets two specific conditions
🙋 He is not refusing to face God
⚖️ He wants the encounter to be fair
📖 Job wants honesty, not avoidance

## ✋ Withdraw Thine Hand Far From Me

Job's first request is for relief from his physical suffering.

"Thine hand" here represents the pain God has allowed into his life.

Job asks for that pressure to lift, even briefly, so he can think clearly.

"Let not thy dread make me afraid" is the second half of the same request.

Overwhelming fear makes it hard to speak or reason honestly.

✋ Thine hand represents his suffering
😔 Job asks for the pressure to lift
😨 Dread describes overwhelming fear
📖 Fear makes honest reasoning difficult

## 📣 Then Call Thou, And I Will Answer

Job offers God two possible ways to begin the conversation.

God could call out to Job first, and Job promises to respond.

Or Job could speak first, and God would answer him.

Either order is acceptable to Job.

What matters most to him is that the conversation actually happens.

📣 Job offers two ways to start talking
🙏 God could speak first, Job would answer
🗣️ Or Job could speak, God would answer
📖 What matters is the conversation happening

# Job 13:23-28
# 🍂 A Leaf Driven To And Fro
---
## ❓ Make Me To Know My Transgression And My Sin

"Iniquities," "transgression," and "sin" all describe wrongdoing, but from slightly different angles.

Job is not denying that sin exists in the world.

He is asking God to name any specific wrong he has actually committed.

A vague accusation is impossible to answer or repent of.

Job wants clarity, not a general assumption of guilt.

📖 These words all describe wrongdoing
🙋 Job is not denying sin exists
❓ He wants a specific charge named
➡️ A vague accusation cannot be answered

## 🙈 Wherefore Hidest Thou Thy Face

In the Bible, God's face often represents His presence and favor.

When God "hides His face," it feels like He has withdrawn from someone completely.

Job feels abandoned right when he needs God most.

"Holdest me for thine enemy" shows how deep that feeling of abandonment goes.

Job feels treated like an enemy rather than a struggling servant.

🙈 God's face represents His presence
😔 Hiding it feels like withdrawal
💔 Job feels abandoned right now
📖 He feels treated like an enemy

## 🍂 Wilt Thou Break A Leaf Driven To And Fro

Job compares himself to a dry leaf blown around by the wind.

A leaf like that has no strength and no control over where it goes.

Job asks why God would bother attacking something already this fragile and powerless.

"Dry stubble" repeats the same picture with leftover pieces of harvested grain.

Job feels like God is using great force on something already broken.

🍂 Job compares himself to a blown leaf
💨 A leaf has no strength of its own
🌾 Stubble repeats the same fragile picture
📖 Great force against something already broken

## 📜 Thou Writest Bitter Things Against Me

Job pictures God keeping a written record of painful charges against him.

"Bitter things" means harsh accusations that cause real pain.

"Possess the iniquities of my youth" means Job answers for mistakes from long ago.

Old, forgotten failures are being brought back up against him now.

Job feels like nothing in his past has truly been let go.

📜 God keeps a record of harsh charges
😣 Bitter things means painful accusations
👦 Job answers for mistakes from his youth
📖 Nothing from his past feels forgiven

## ⛓️ Thou Puttest My Feet Also In The Stocks

"Stocks" were a wooden device that locked around a prisoner's feet.

They were used to hold a prisoner in place under close guard.

Job pictures himself as that kind of prisoner.

"Settest a print upon the heels of my feet" pictures a hunter tracking footprints.

God is tracking Job like hunted prey.

Job feels watched, trapped, and pursued all at once.

⛓️ Stocks were a device that restrained prisoners
👀 God watches his every move closely
🐾 Job feels tracked like hunted prey
📖 He feels watched, trapped, and pursued

## 🦋 As A Garment That Is Moth Eaten

Job ends the chapter with one final picture of slow decay.

A moth eaten garment does not fall apart all at once.

It wears away quietly, thread by thread, until it is ruined.

Job feels his life and body wasting away the very same slow way.

The chapter closes not with an answer but with Job still waiting for one.

🦋 A moth eaten garment decays slowly
🧵 It wears away thread by thread
💀 Job feels his life wasting the same way
📖 The chapter ends with Job still waiting
`.trim();

export const JOB_THIRTEEN_PERSONAL_SECTIONS = parseJobThirteenRawNotes(JOB_THIRTEEN_RAW_NOTES);
