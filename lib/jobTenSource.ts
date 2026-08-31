export type JobTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTenRawNotes(rawText: string): JobTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 10:${startVerse}` : `Job 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 10 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TEN_RAW_NOTES = `# Job 10:1-4
# 😩 My Soul Is Weary Of My Life
---
## 📜 I Will Leave My Complaint Upon Myself

"Complaint" here is not casual griping.

It means a formal legal case, laid out point by point.

Job says he will take full responsibility for every word of it.

He is not hiding behind excuses or blaming anyone else.

Whatever he says next belongs entirely to him.

📜 Complaint means a formal legal case
🙋 Job takes full responsibility for his words
🚫 He is not hiding behind excuses
📖 Everything he says next belongs to him

## 😖 I Will Speak In The Bitterness Of My Soul

"Bitterness" here means deep, aching grief.

It is not a passing complaint or bad mood.

Job says he will not soften his words to make them easier to hear.

The book of Job never punishes him for speaking this openly.

Honest pain, spoken to God, is treated as acceptable here.

😖 Bitterness means deep aching grief
🗣️ Job will not soften his words
🚫 The book never punishes his honesty
📖 Honest pain spoken to God is allowed

## ⚖️ Do Not Condemn Me

Job is not begging for a pardon here.

"Condemn" is a legal term meaning to declare guilty in court.

Job wants a fair verdict, not special treatment.

He believes if the case were heard honestly, he would be cleared.

This keeps him inside the same courtroom picture from chapter nine.

⚖️ Condemn means to declare guilty
🚫 Job is not asking for a pardon
🏛️ He wants a fair verdict instead
📖 This continues the courtroom picture from Job 9

## 📣 Shew Me Wherefore Thou Contendest With Me

"Shew" is an old spelling of show.

"Contendest" means to argue a formal case against someone.

Job is asking God to state the charges plainly.

He does not want vague suffering with no explanation attached.

Naming the accusation is the one thing Job actually asks for here.

📣 Shew is an old spelling of show
⚖️ Contendest means arguing a formal case
❓ Job wants the charges named plainly
📖 He wants to be told why, not spared

## 🤲 Despise The Work Of Thine Hands

Job reminds God that he himself is God's own handiwork.

"Despise" means to look down on or treat as worthless.

Job cannot understand why a Creator would treat his own creation this way.

The question exposes what feels like a contradiction in how God is acting.

🤲 Job is God's own handiwork
👎 Despise means treating as worthless
❓ Why would a Creator harm his own creation
📖 Job names what feels like a contradiction

## ☀️ Shine Upon The Counsel Of The Wicked

This phrase pictures God's blessing shining down on wicked people's plans.

Job feels like the wicked prosper while he suffers for no clear reason.

This same complaint returns later in the book from other speakers.

It was a common and honest question in the ancient world.

☀️ Shine pictures blessing shining down
😠 The wicked seem to prosper instead
🔁 This complaint returns later in Job
📖 It was a common ancient question

## 👁️ Hast Thou Eyes Of Flesh

Job is not asking a literal question about biology.

He is asking whether God's judgment works the same limited way human judgment does.

Human eyes miss things and misread situations constantly.

Job wonders out loud if God is judging him with those same limits.

The question sets up the deeper question asked in the next line.

👁️ Job is not asking about biology
⚖️ He asks if God judges with human limits
🙈 Human eyes miss things and misjudge
📖 This sets up the next question ahead

# Job 10:5-7
# ⏳ Are Thy Days As The Days Of Man
---
## ⏳ Are Thy Days As The Days Of Man

This question expects the answer no.

Human days are numbered and short.

God's years never run out the way human years do.

Job asks why God investigates him with such urgency.

That kind of urgency only makes sense for someone running out of time.

❓ The question expects the answer no
⏳ Human days are numbered and short
♾️ God's years never run out
📖 Job asks why God rushes like this

## 🔍 Thou Enquirest After Mine Iniquity

"Enquirest" is an old word meaning to investigate closely.

"Iniquity" means wrongdoing or sin.

Job pictures God searching through his life like a detective builds a case.

He is not denying that God can search him.

He is questioning why that search feels so urgent and relentless.

🔍 Enquirest means to investigate closely
⚖️ Iniquity means wrongdoing or sin
🕵️ Job pictures God building a case
📖 He questions the urgency, not the search

## 🙅 Thou Knowest That I Am Not Wicked

Job states his innocence directly here, not as a boast.

He believes God already knows the truth about his character.

This is the same claim that frustrated his three friends throughout their speeches.

Job is not claiming perfection, only that he is not guilty of secret sin.

🙅 Job states his innocence plainly
👀 He believes God already knows the truth
😤 This claim frustrated his three friends
📖 He claims innocence, not perfection

## 🛟 None That Can Deliver Out Of Thine Hand

"Deliver" here means to rescue or save someone from danger.

Job admits plainly that no one could save him from God even if he wanted rescue.

This is not defiance.

It is Job naming the size of the power he faces.

The same honesty about God's power shaped his argument back in chapter nine.

🛟 Deliver means to rescue or save
🚫 No one could rescue Job from God
😔 This is honesty, not defiance
📖 Echoes the argument from Job 9

# Job 10:8-12
# 🤲 Thine Hands Have Made Me
---
## 🏺 Thine Hands Have Made Me And Fashioned Me

"Fashioned" means shaped or formed with care, like a potter shapes clay.

Job pictures God as a craftsman working over every detail of his body.

This is not a distant Creator who set things moving and walked away.

God's hands were personally involved in making Job.

🏺 Fashioned means shaped with care
🤲 Job pictures God as a craftsman
👀 God was personally involved in making him
📖 This was never a distant Creator

## 💔 Yet Thou Dost Destroy Me

Job sets two facts side by side on purpose.

God made him carefully.

God now seems to be tearing him down.

That contrast is the real ache underneath this whole chapter.

Job cannot reconcile a careful Maker with what feels like careless destruction.

⚖️ Job sets two facts side by side
🏗️ God made him with great care
💔 God now seems to destroy him
📖 This contrast is the ache of the chapter

## 🙏 I Beseech Thee

"Beseech" is an old word meaning to beg earnestly.

Job is not making a calm request here.

He is pleading with real urgency for God to remember something specific.

The tone shifts from argument to raw appeal in this line.

🙏 Beseech means to beg earnestly
😣 Job pleads, he does not calmly ask
🔄 The tone shifts to raw appeal
📖 He begs God to remember something specific

## 🏺 Thou Hast Made Me As The Clay

Clay is soft, shapeable, and completely dependent on the potter's hands.

Job pictures himself as that same helpless material.

"Wilt thou bring me into dust again" asks if he will simply be unformed and returned to nothing.

The image of clay returning to dust closes a full circle back to how he was made.

🏺 Clay is soft and fully dependent
🙌 Job pictures himself as that material
🌫️ He asks if he returns to dust
📖 The image closes a full circle

## 🥛 Poured Me Out As Milk, And Curdled Me Like Cheese

This pictures the earliest stages of forming a body in the womb.

Ancient people saw milk turning into cheese as a natural picture of something soft becoming solid.

Job uses that everyday process to describe how God formed him before birth.

The image is intimate, not clinical.

🥛 Pictures early stages of forming a body
🧀 Milk becoming cheese pictures soft becoming solid
👶 Describes how God formed him before birth
📖 The image is intimate, not clinical

## 🦴 Clothed Me With Skin And Flesh, And Hast Fenced Me With Bones And Sinews

"Fenced" means enclosed and protected, like a wall around a field.

Job pictures his bones and sinews as a protective frame built around him.

Skin and flesh were added over that frame like a covering.

The verse describes the body being built in careful layers, not by accident.

🦴 Fenced means enclosed and protected
🏗️ Bones and sinews form a frame
🧵 Skin and flesh cover that frame
📖 The body was built in careful layers

## 👀 Thy Visitation Hath Preserved My Spirit

"Visitation" here does not mean a scary or punishing event.

It means God's personal attention and care.

Job admits that same attention has kept him alive up to this point.

Even in his complaint, Job cannot deny that God has been sustaining him.

👀 Visitation means personal attention and care
✅ Not a punishing event here
💨 That care has kept Job alive
📖 Even his complaint admits God sustains him

# Job 10:13-17
# 🗝️ These Things Hast Thou Hid In Thine Heart
---
## 🗝️ These Things Hast Thou Hid In Thine Heart

Job believes God had a hidden plan for his suffering from the very beginning.

"Hid in thine heart" pictures a secret God has been holding onto privately.

Job is not accusing God of cruelty for no reason.

He believes there is a reason, just one that has never been shared with him.

🗝️ Pictures a secret God has held privately
📋 Job believes there was a plan
🤐 The reason was never shared with him
📖 This is not an accusation of randomness

## 📝 If I Sin, Then Thou Markest Me

"Markest" means to keep close watch on and take note of.

Job pictures God tracking every failure like an entry in a ledger.

He is not denying that he sins.

He is describing how closely he feels watched, even for small things.

📝 Markest means to closely watch and note
📒 Job pictures failures tracked like a ledger
🙋 He does not deny that he sins
📖 He describes feeling constantly watched

## ⚖️ Thou Wilt Not Acquit Me From Mine Iniquity

"Acquit" is a legal word meaning to clear someone of guilt.

Job believes no confession or explanation would actually clear his record with God.

This feeling of being permanently guilty is part of what makes his pain so heavy.

The courtroom language from chapter nine continues here without a break.

⚖️ Acquit means to clear someone of guilt
🚫 Job feels nothing could clear his record
💔 That feeling adds real weight to his pain
📖 Continues the courtroom language from Job 9

## 😔 If I Be Wicked, Woe Unto Me

Job lays out both possible outcomes for himself here.

If he is guilty, he expects only judgment.

There seems to be no version of this where Job comes out safe.

That trapped feeling is the whole point of the next line as well.

⚖️ Job lays out both possible outcomes
😔 Guilt would mean only judgment for him
🪤 No version leaves him feeling safe
📖 This trapped feeling continues in the next line

## 🙇 If I Be Righteous, Yet Will I Not Lift Up My Head

"Lift up my head" is an old idiom for holding oneself with confidence or honor.

Job says even being innocent would not let him feel that confidence.

Shame and suffering have worn him down regardless of the truth about his guilt.

Being right on paper does not always restore how a person feels inside.

🙇 Lift up my head means standing with honor
😔 Even innocence would not restore that feeling
💔 Shame has worn him down either way
📖 Being right does not always feel like relief

## 😵 I Am Full Of Confusion

Job admits he genuinely does not understand what is happening to him.

This is not weak faith.

It is honest confusion spoken out loud.

The Bible allows this kind of admission without treating it as a failure.

😵 Job admits genuine confusion
🙏 This is not weak faith
🗣️ Honest confusion spoken out loud
📖 The Bible allows this kind of admission

## 🦁 Thou Huntest Me As A Fierce Lion

A lion hunting prey is relentless, powerful, and impossible to outrun.

Job pictures himself as the hunted animal in this image.

"Shewest thyself marvellous upon me" means God's power is displayed dramatically through Job's suffering.

The picture is frightening on purpose, showing exactly how small Job feels.

🦁 A lion hunting is relentless and powerful
🏃 Job pictures himself as the hunted animal
✨ God's power is displayed through his suffering
📖 The image shows how small Job feels

## 🔁 Thou Renewest Thy Witnesses Against Me

"Witnesses" here pictures evidence or accusations being brought against Job in a courtroom.

"Renewest" means these accusations keep coming, one after another, without stopping.

"Changes and war" pictures wave after wave of trouble, like an army sending fresh troops.

Job feels like he is fighting a battle that never lets up.

⚖️ Witnesses pictures accusations in a courtroom
🔁 Renewest means the accusations keep coming
⚔️ Changes and war pictures endless waves of trouble
📖 Job feels a battle that never lets up

# Job 10:18-22
# ⚰️ Wherefore Then Hast Thou Brought Me Forth
---
## ❓ Wherefore Then Hast Thou Brought Me Forth Out Of The Womb

Job asks why he was ever born at all.

This is the same painful question he raised back in chapter three.

It returns here with the same intensity, not as new information but as renewed grief.

Job is not planning anything.

He is voicing the depth of his exhaustion.

❓ Job asks why he was ever born
🔁 The same question returns from chapter three
😞 It comes back with renewed grief
📖 This is exhaustion spoken aloud, not a plan

## 💨 Oh That I Had Given Up The Ghost

"Given up the ghost" is an old phrase simply meaning to die.

Job wishes he had died before anyone ever saw him.

This is raw grief, not a plan to act.

The book of Job never treats this kind of honesty as sin.

💨 Given up the ghost means to die
😢 Job wishes he had died unseen
🙅 This is grief, not a plan
📖 The book never treats this as sin

## 👶 I Should Have Been Carried From The Womb To The Grave

Job imagines skipping life entirely, going straight from birth to burial.

He believes that outcome would have spared him all of this pain.

The wish is extreme because the pain behind it is extreme.

👶 Job imagines skipping life entirely
⚰️ Straight from birth to burial
😖 The wish matches the size of his pain
📖 Extreme grief produces extreme words

## ⏳ Are Not My Days Few

Job points out that his life is already short by any measure.

He is asking for one small mercy inside a much larger complaint.

The request that follows is modest compared to everything else in the chapter.

⏳ Job's life is already short
🙏 He asks for one small mercy
📉 A modest request inside a large complaint
📖 Even here, Job is not asking for everything

## ⏸️ Cease Then, And Let Me Alone

Job is not asking God to disappear forever.

He is asking for a pause, some room to breathe before the end comes.

"That I may take comfort a little" shows how small the request really is.

Job wants a moment of relief, not a full resolution.

⏸️ Job asks for a pause, not disappearance
🌬️ He wants room to breathe
🙏 The request is small on purpose
📖 He wants relief, not full resolution

## ⚰️ The Land Of Darkness And The Shadow Of Death

This phrase describes the ancient Hebrew picture of the grave.

It is not a detailed picture of an afterlife.

It describes an end, quiet and unknown, the opposite of the busy life Job has lived.

Ancient readers used this kind of language often when speaking about death.

⚰️ Describes the ancient Hebrew picture of the grave
🌑 Not a detailed picture of an afterlife
🤫 Pictures a quiet, unknown end
📖 Common language for death in that era

## 🌀 Without Any Order, And Where The Light Is As Darkness

Job ends the chapter with an image that resists comfort on purpose.

"Without any order" pictures chaos with no shape or structure at all.

Even light is described as behaving like darkness there.

The chapter closes on that bleak note, with no resolution offered yet.

🌀 Without any order pictures total chaos
🌑 Even light behaves like darkness there
😔 The chapter closes on a bleak note
📖 No resolution is offered yet
`.trim();

export const JOB_TEN_PERSONAL_SECTIONS = parseJobTenRawNotes(JOB_TEN_RAW_NOTES);
