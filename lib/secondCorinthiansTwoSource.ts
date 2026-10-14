export type SecondCorinthiansTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansTwoRawNotes(rawText: string): SecondCorinthiansTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 2:${startVerse}` : `2 Corinthians 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Second Corinthians 2 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_TWO_RAW_NOTES = `# SecondCorinthians 2:1-4
# ✍️ A Letter Written With Tears
---
## 🧠 I Determined This With Myself

"Determined" means Paul made a firm, settled decision, not a passing whim.

He is explaining a choice he already made before writing this letter.

The decision was not to visit Corinth again during this painful season.

Paul had made an earlier visit to Corinth that went badly wrong.

That visit is sometimes called the sorrowful visit.

He chose a letter instead of a second painful meeting.

🧠 Determined means a firm, settled choice

😢 Paul had already made one painful visit

✉️ He chose to write instead of visit again

📖 The letter replaces a second hard meeting

## 😔 I Would Not Come Again To You In Heaviness

"Heaviness" is an old word for deep sadness and grief.

Paul does not want a second visit that ends the same painful way.

The first visit left both Paul and the church hurting.

Staying away a little longer was an act of mercy, not avoidance.

A return too soon could have made the wound worse.

😔 Heaviness means deep sadness and grief

🔁 Paul avoids repeating a painful visit

💔 The first visit hurt everyone involved

📖 Staying away protected the church, not avoided it

## 😊 If I Make You Sorry

Paul ties his own joy directly to the condition of the Corinthians.

If his words bring them pain, that pain comes back to him too.

He is not detached from how the church feels.

A shepherd who causes sorrow cannot celebrate if his flock is hurting.

🔗 Paul's joy is tied to the church

😢 Their pain becomes his own pain too

🙏 Paul is not distant from their feelings

📖 A leader cannot celebrate over a hurting flock

## 🙂 Who Is He Then That Maketh Me Glad

This is Paul asking a question he already knows the answer to.

No one else in Corinth can make Paul glad if the church itself is suffering.

Their joy and his joy rise and fall together.

Paul is describing a real relationship, not a formal title.

❓ Paul asks a question with an obvious answer

🔄 Their joy and his joy move together

🙅 No one else can replace that bond

📖 Paul describes a real relationship, not a title

## 📝 I Wrote This Same Unto You

Paul refers back to an earlier letter he had already sent them.

This is not the letter known today as First Corinthians.

Many scholars believe it was a separate, now lost letter, written after a painful visit.

Paul mentions it again later in this very chapter.

📨 Paul mentions an earlier letter here

🔍 It is not First Corinthians

📜 Many believe it is a separate, lost letter

📖 Paul brings it up again later

## ❤️ My Joy Is The Joy Of You All

Paul says his own happiness is wrapped up in the church's wellbeing.

He does not separate his personal joy from their shared life.

A healthy church and a healthy pastor share the same joy.

This line explains why the earlier letter mattered so much to him.

❤️ Paul's joy depends on their wellbeing

🔗 His joy and their joy are shared

🤝 A pastor's joy rises with his church

📖 This explains why the letter mattered so much

## 😭 Out Of Much Affliction And Anguish Of Heart

"Affliction" means intense suffering, and "anguish" means deep emotional pain.

Paul is describing his own state as he wrote the earlier letter.

This was not a calm, calculated rebuke.

The letter came from real distress, not simple annoyance.

😣 Affliction means intense suffering

💔 Anguish means deep emotional pain

✉️ The letter came from real distress

📖 This was not a calm, calculated rebuke

## 💧 I Wrote Unto You With Many Tears

Paul was not ashamed to admit he cried as he wrote this letter.

Tears were not a sign of weakness for him.

They showed how much he loved the people he was correcting.

A letter written in tears carries a different weight than an angry one.

💧 Paul admits he cried writing this letter

🙅 Tears were not a weakness for Paul

❤️ Tears showed the depth of his love

📖 A tearful letter carries more weight than anger

## ❤️ That Ye Might Know The Love

Paul did not write to punish the Corinthians out of anger.

His real goal was for them to see how deeply he loved them.

Correction and love were never opposites for Paul.

A hard letter can come from love.

🚫 Paul did not write out of anger

🎯 His real goal was to show love

🤝 Correction and love were not opposites

📖 A hard letter can come from love

# SecondCorinthians 2:5-8
# 🤝 Forgive And Comfort Him
---
## 😟 If Any Have Caused Grief

Paul finally names the real issue behind the painful letter.

Someone in Corinth had personally wronged or defied him.

The text never gives the man's name or the exact offense.

Paul chooses not to make this about one person's shame.

😟 Someone caused real grief in Corinth

❓ The text never names this person

🙅 Paul avoids public shame for one man

📖 Paul cares more about healing than shame

## ⚖️ That I May Not Overcharge You All

"Overcharge" is an old word for placing too much blame on someone.

Paul does not want the whole church to feel crushed by this one conflict.

He is protecting the congregation, not just the offender.

Shared pain needs a measured response, not an overwhelming one.

⚖️ Overcharge means placing too much blame

🙅 Paul will not crush the whole church

🛡️ He protects the whole church, not one man

📖 A painful moment still needs a measured response

## ⚖️ Sufficient To Such A Man Is This Punishment

Paul says the discipline already given to this man was enough.

He does not call for more punishment on top of it.

The goal of discipline was correction, not endless suffering.

Once the point lands, continuing punishment stops helping anyone.

✅ The punishment already given was enough

🚫 Paul does not ask for more

🎯 Discipline aimed at correction, not suffering

📖 Continued punishment stops helping once the point lands

## 👥 Inflicted Of Many

"Many" means this discipline came from the whole church, not from Paul alone.

Corinth as a community had judged and corrected the man together.

This was corporate discipline, not one leader acting out of personal anger.

Paul refers to it to remind them the matter was already settled honestly.

👥 Many means the whole church acted

🙅 This was not Paul acting alone

⚖️ The church judged this together, honestly

📖 The matter was already settled as a group

## 🤝 Ye Ought Rather To Forgive Him, And Comfort Him

Paul shifts the church from punishment mode into forgiveness mode.

Discipline had already done its job.

Now the same man needed comfort more than correction.

Forgiveness is not weakness.

It means knowing when correction should end.

🔄 Paul shifts from punishment to forgiveness

✅ Discipline had already done its job

🫂 The man now needed comfort instead

📖 Forgiveness means knowing when correction should end

## 🌊 Swallowed Up With Overmuch Sorrow

This phrase pictures someone drowning under the weight of their own shame.

"Overmuch" means more than a person can actually carry.

Too much sorrow, left unanswered, can destroy a person instead of correcting them.

Paul warns that unending shame can hurt more than the sin itself caused.

🌊 This pictures someone drowning in shame

⚖️ Overmuch means more than a person can carry

💔 Unanswered sorrow can destroy instead of correct

📖 Unending shame can hurt more than sin

## 🙏 I Beseech You That Ye Would Confirm Your Love Toward Him

"Beseech" means to beg or plead with someone earnestly.

Paul is not giving a casual suggestion here.

"Confirm" means to make something official, like a public, formal decision.

He wants the whole church to openly and formally welcome the man back.

🙏 Beseech means to plead earnestly

🚫 This is not a casual suggestion

📜 Confirm means to make something official

📖 Paul wants a formal, public welcome back

# SecondCorinthians 2:9-11
# 🔓 Obedience And Satan's Devices
---
## 🎯 That I Might Know The Proof Of You

Paul admits the earlier letter had a second purpose beyond correction.

He wanted to see how the church would respond under pressure.

"Proof" here means evidence, the kind that is tested and shown true.

Their response to a hard letter revealed something about their character.

🎯 The letter had a second purpose

🧪 Paul wanted to test their response

📜 Proof means tested, shown true evidence

📖 Their response revealed their true character

## 🫡 Whether Ye Be Obedient In All Things

Paul is not asking for obedience to himself personally.

He means obedience to what is right, in every part of church life.

A church that gets this one situation right proves it can be trusted elsewhere too.

Forgiving the man was itself a test of obedience.

🙅 Not obedience to Paul personally

✅ Obedience to what is right, fully

🧩 One right choice proves trust elsewhere

📖 Forgiving the man was itself the test

## 🤲 To Whom Ye Forgive Any Thing, I Forgive Also

Paul joins his own forgiveness to whatever decision the church makes.

He does not set himself above their judgment on this matter.

Unity between Paul and the Corinthians mattered more than being right alone.

A leader who forgives alongside his people builds trust, not distance.

🤝 Paul joins the church's own forgiveness

🙅 He does not rule above their decision

🔗 Unity mattered more than being right alone

📖 Shared forgiveness builds trust, not distance

## ✝️ In The Person Of Christ

This phrase means Paul forgives standing in Christ's own presence.

He is not forgiving casually or just to smooth things over.

Forgiveness here carries the weight of something done before God himself.

Paul acts as someone representing Christ, not just himself.

✝️ Paul forgives in Christ's own presence

🚫 This is not a casual forgiveness

⚖️ It carries the weight of standing before God

📖 Paul acts as Christ's own representative

## 😈 Lest Satan Should Get An Advantage Of Us

Paul names a real spiritual danger behind unresolved conflict.

Refusing to forgive gives an opening for division and bitterness to grow.

Satan does not need a grand plan, just an unhealed wound.

A church that will not forgive becomes easy to divide.

😈 Unforgiveness opens a door for Satan

🌱 Bitterness grows in unresolved conflict

🎯 Satan only needs one unhealed wound

📖 An unforgiving church is easy to divide

## 🧠 We Are Not Ignorant Of His Devices

"Devices" means schemes, the strategies someone uses to trick or trap another person.

Paul assumes the Corinthians already know how Satan tends to operate.

Spiritual danger is not always a dramatic, obvious attack.

It is often a quiet, patient plan working through ordinary grudges.

🧩 Devices means schemes or tricks

👀 Paul assumes they already know this

⚡ Danger is not always dramatic or obvious

📖 It often works through ordinary grudges

# SecondCorinthians 2:12-13
# 🚢 No Rest Without Titus
---
## 🚢 When I Came To Troas

Troas was a port city on the coast of what is now northwest Turkey.

It sat in the Roman province of Asia, across the sea from Macedonia.

Paul passed through this same city on earlier travels in the book of Acts.

Troas was a natural stop for anyone moving between Asia and Europe.

🗺️ Troas was a port city in Asia

🌊 It faced Macedonia across the sea

📜 Paul had passed through here before

📖 Troas connected the roads of Asia and Europe

## 🚪 A Door Was Opened Unto Me Of The Lord

"A door opened" is an old way of describing a clear opportunity from God.

Paul found real, fruitful ministry waiting for him in Troas.

This was not a small or ordinary opening.

God himself was behind the timing of this opportunity.

🚪 An open door means a clear opportunity

🌱 Real ministry was already growing in Troas

✨ This opening was not small or ordinary

📖 God himself was behind the timing

## 😔 I Had No Rest In My Spirit

Paul had a genuine, fruitful opportunity right in front of him.

He still could not settle his own heart.

"Rest" here means inner peace, not physical sleep.

Worry about the Corinthians followed him even into open doors.

😟 Paul could not settle despite the open door

🧘 Rest here means inner peace, not sleep

💭 Worry followed him into real ministry

📖 Open doors could not fix an anxious heart

## 🤝 Because I Found Not Titus My Brother

Titus was a trusted companion Paul had sent ahead to Corinth.

Paul was waiting for news about how the church had responded to his letter.

Not finding Titus in Troas meant Paul had no word on that outcome.

"Brother" shows how close this working relationship actually was.

🤝 Titus was Paul's trusted companion

✉️ Paul was waiting for news from Corinth

❓ Missing Titus meant missing that news

📖 Brother shows how close this friendship was

## 🚶 I Went From Thence Into Macedonia

Paul chose to leave Troas, even with its open door, to search for Titus.

Macedonia was the region just across the sea, north of Corinth's province.

Personal concern for one coworker and one church outweighed a fruitful opportunity.

Paul's ministry was never just about the biggest open door available.

🚶 Paul left Troas to search for Titus

🗺️ Macedonia sat north of Corinth's province

❤️ Concern for people outweighed opportunity

📖 Ministry was never about the biggest opening

# SecondCorinthians 2:14-17
# 👃 The Savour Of Christ
---
## 🙏 Thanks Be Unto God

Paul's tone shifts suddenly from anxious to thankful.

He has just described real worry over Titus and the Corinthians.

Even in that worry, Paul still turns first to gratitude.

Thanksgiving was Paul's habit, not just a reaction to good news.

🔄 Paul's tone shifts from worry to thanks

😟 He had just described real anxiety

🙏 Gratitude came even before relief arrived

📖 Thanksgiving was Paul's habit, not a reaction

## 🏆 Which Always Causeth Us To Triumph In Christ

A "triumph" was a real Roman victory parade.

Conquering generals led their armies through the city streets.

Incense burned along the route, filling the air with smoke and fragrance.

Paul borrows this image to picture following Christ, who has already won.

Believers do not march toward victory, they march inside one already finished.

🏆 A triumph was a real Roman victory parade

🔥 Incense filled the air along the route

✝️ Paul applies this image to following Christ

📖 Believers march inside a victory already won

## 👃 The Savour Of His Knowledge

"Savour" means a smell or fragrance carried through the air.

In a Roman triumph, incense smoke reached every person nearby.

Paul pictures the spread of the gospel the same way.

Knowing Christ is not quiet or private.

It reaches everyone nearby, whether they welcome it or not.

👃 Savour means a smell carried in the air

🔥 Triumph incense reached everyone nearby

📢 The gospel spreads the same way

📖 It reaches people whether they want it

## 🌸 We Are Unto God A Sweet Savour Of Christ

Paul shifts the picture from the gospel's spread to the person carrying it.

To God, Paul and his coworkers themselves are the fragrance.

This is true no matter how people respond to their message.

God's own evaluation does not depend on human applause.

🔄 The fragrance is the messengers themselves

🌸 Paul is a sweet savour to God

🙅 This is true no matter the response

📖 God's view never depends on human applause

## ☠️ The Savour Of Death Unto Death

In a Roman triumph, the parade ended differently depending on who you were.

Freed captives walked on to new life, but condemned captives walked toward execution.

The same incense smoke surrounded both groups the entire time.

To those who reject the gospel, the very same message becomes connected to death.

🎭 The parade ended differently for different captives

⚰️ Some walked toward death in that same parade

🌬️ The same smoke surrounded everyone equally

📖 Rejecting the gospel ties it to death

## 🌱 The Savour Of Life Unto Life

The same fragrance that meant death to one group meant freedom to another.

To those who accept the gospel, it leads toward real, lasting life.

The message itself never changes, only what it leads to for the hearer.

One scent, two outcomes, depending entirely on the response.

🌱 The same message leads to life for some

🎁 Accepting the gospel leads to lasting life

🔀 The outcome depends on the hearer's response

📖 One message, two very different outcomes

## ❓ Who Is Sufficient For These Things?

"Sufficient" means adequate or equal to a task.

Paul asks this question about himself, not as false modesty.

Carrying a message with this much weight should make anyone pause.

No person is naturally equal to representing God to others.

⚖️ Sufficient means equal to the task

🙋 Paul asks this honestly about himself

😮 A message this weighty should humble anyone

📖 No one is naturally equal to this calling

## 🏪 Which Corrupt The Word Of God

"Corrupt" pictures a market peddler watering down wine to sell for more profit.

Some traveling teachers in the ancient world treated God's message the same way.

They trimmed and diluted the truth to make it easier to sell.

Paul refuses to turn the gospel into a product.

🍷 Corrupt pictures watering down wine to sell

🏪 Some teachers treated the gospel like a product

✂️ They trimmed the truth to make it easier

📖 Paul refuses to sell a watered down message

## 🤍 As Of Sincerity, But As Of God

"Sincerity" means being genuine all the way through, with nothing fake underneath.

Paul contrasts his own motives with the peddlers he just described.

He speaks because God sent him, not because it pays well.

A true messenger's motive can survive being tested in the light.

🤍 Sincerity means genuine all the way through

🙅 Paul is not like the peddlers

🎯 He speaks because God sent him

📖 A true motive can survive being tested

## 👁️ In The Sight Of God Speak We In Christ

Paul closes this chapter by naming his true audience.

He is not speaking mainly for Corinth's approval or anyone else's.

Every word is spoken as if God is standing right there.

Being "in Christ" means everything Paul says is tied to his relationship with Jesus.

👁️ God is Paul's true audience here

🙅 He does not speak for human approval

🗣️ He speaks as if God is present

📖 Paul speaks only from his place in Christ
`.trim();

export const SECOND_CORINTHIANS_TWO_PERSONAL_SECTIONS = parseSecondCorinthiansTwoRawNotes(SECOND_CORINTHIANS_TWO_RAW_NOTES);
