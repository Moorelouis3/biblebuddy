export type RomansTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansTwoRawNotes(rawText: string): RomansTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 2:${startVerse}` : `Romans 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Romans 2 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_TWO_RAW_NOTES = `# Romans 2:1-5
# ⚖️ The Trap Of Judging Others
---
## ⚖️ Thou Art Inexcusable, O Man

"Therefore" ties this verse straight back to the end of chapter one.

Paul just finished describing people who approved of evil in others.

Now he turns to someone who judges that same evil instead.

"Inexcusable" means no defense can stand up in court.

Judging sin in someone else does not erase your own.

⚖️ Therefore links back to chapter one
👤 Paul now addresses the one who judges
🚫 Inexcusable means no valid defense
📖 Judging others does not erase your own sin

## 🔁 Thou That Judgest Doest The Same Things

Paul is not condemning all moral judgment here.

He is condemning hypocrisy, judging a sin while secretly doing it yourself.

This judge may stand for the moralist or the self righteous Jew from chapter one.

The real problem is the double standard, not judging itself.

🔁 Not all judgment is condemned here
🎭 Hypocrisy is the real target
👥 Could describe a moralist or a Jew
📖 Shared guilt removes any higher ground

## 🎯 We Are Sure That The Judgment Of God Is According To Truth

"According to truth" means God's judgment matches reality exactly.

Human judges can be fooled by status, wealth, or reputation.

God weighs the actual facts of a life, not the image a person presents.

No one slips past God's judgment by looking respectable on the outside.

🎯 According to truth means fully accurate
🎭 Humans can be fooled by image
⚖️ God weighs the real facts
📖 Looking respectable does not fool God

## 🏃 That Thou Shalt Escape The Judgment Of God

Paul asks this as a rhetorical question, not a real possibility.

The one judging others might assume it buys some kind of exemption.

No one earns an exemption from judgment by pointing at someone else's sin.

Judgment applies the same way to the judge as to everyone else.

❓ A rhetorical question, not a real option
👉 Pointing at others buys no exemption
⚖️ The judge faces judgment too
📖 No one is exempt by comparison

## 💰 Despisest Thou The Riches Of His Goodness

"Despisest" means to treat something as unimportant or worthless.

"Riches" pictures God's goodness as an overflowing abundance, not a small gift.

"Forbearance" means holding back a punishment that could rightly be given right now.

"Longsuffering" means extended patience stretched out over a long time.

God delays judgment on purpose, not because he has forgotten.

💰 Riches pictures overflowing goodness
⏳ Forbearance means holding back punishment
🕰️ Longsuffering means patience over time
📖 Delay is on purpose, not forgetfulness

## 🔄 The Goodness Of God Leadeth Thee To Repentance

This line names the real purpose behind God's patience.

God's kindness is not a sign that sin does not matter.

It is meant to lead a person away from sin, not deeper into it.

Kindness from God carries a direction, and that direction is repentance.

🔄 Names the purpose of God's patience
🚫 Kindness does not mean sin is fine
🧭 Patience points toward repentance
📖 Kindness has a direction, not just a pause

## 🧱 Hardness And Impenitent Heart

"Hardness" describes a heart that has grown stiff toward God.

"Impenitent" means refusing to feel sorry or change direction.

Together these words describe someone who treats God's patience as an excuse to keep going.

The same kindness that could soften a heart can also harden it further.

🧱 Hardness means a stiff, unresponsive heart
🚫 Impenitent means refusing to change
🔁 Patience abused becomes an excuse
📖 Kindness can soften or harden a heart

## 🔥 Treasurest Up Unto Thyself Wrath Against The Day Of Wrath

"Treasurest up" usually describes storing up something valuable, like savings.

Paul flips that picture, this person stores up wrath instead of wealth.

"The day of wrath" points to a future day of final judgment.

Every act of hardened resistance adds to an account that will one day come due.

🔥 Treasurest up usually means storing wealth
🔄 Here it stores up wrath instead
📅 Day of wrath means final judgment
📖 Resistance adds to an account owed later

# Romans 2:6-11
# 🎯 God Judges Without Favoritism
---
## ⚖️ Who Will Render To Every Man According To His Deeds

"Render" means to pay back or give in return.

This states a basic principle, God's judgment responds to what a life produced.

Paul is not contradicting salvation by faith here.

He is describing the outward evidence that faith, or its absence, leaves behind.

A real faith always leaves a trail of deeds behind it.

⚖️ Render means to pay back
🎯 Judgment responds to what a life produced
🤲 This does not contradict faith alone
📖 Real faith leaves deeds behind it

## 🏃 Patient Continuance In Well Doing

"Continuance" means persevering steadily over time, not a single good act.

This describes the lifelong shape of a genuine faith.

It does not describe a method for earning salvation.

Seeking God patiently is itself the visible mark of a real relationship with him.

🏃 Continuance means steady perseverance
🎯 Describes faith, not earning salvation
🌱 A genuine faith keeps walking
📖 Seeking God is itself the evidence

## 🏆 Glory And Honour And Immortality, Eternal Life

This phrase names the reward waiting at the end of patient faith.

"Immortality" means a life no longer subject to death.

"Eternal life" restates the same reward in different words for emphasis.

The reward described here is permanence, a life death cannot touch.

🏆 Names the reward of patient faith
♾️ Immortality means life beyond death
🔁 Eternal life restates the same reward
📖 The reward is permanence itself

## 😤 Contentious, And Do Not Obey The Truth

"Contentious" describes a quarrelsome, stubborn resistance to correction.

This person does not simply fail to know the truth.

They know it and refuse to obey it on purpose.

Disobeying truth instead of following it is always a choice, never an accident.

😤 Contentious means stubborn resistance
🧠 This is refusal, not ignorance
🚫 Truth was known and rejected
📖 Disobedience here is a choice

## 🔥 Obey Unrighteousness, Indignation And Wrath

Obeying unrighteousness means letting wrongdoing direct your choices.

"Indignation" and "wrath" describe God's response to that pattern.

Chapter one already defined wrath as settled justice, not a loss of temper.

Choosing unrighteousness over truth invites a real, deserved response.

🔥 Unrighteousness means wrongdoing over truth
⚡ Indignation and wrath are God's response
🧘 Wrath means settled justice, not temper
📖 Choosing wrong over truth has consequences

## 💔 Tribulation And Anguish, Upon Every Soul Of Man That Doeth Evil

"Tribulation" describes crushing pressure or distress.

"Anguish" describes the deep inward pain that pressure produces.

Together they describe what judgment feels like from the inside, not only a legal verdict.

Judgment is not only a sentence, it is something actually felt.

💔 Tribulation means crushing pressure
😢 Anguish means deep inward pain
⚖️ Judgment is felt, not just declared
📖 A verdict becomes a real experience

## 🌍 Of The Jew First, And Also Of The Gentile

This same order, Jew first and also the Gentile, already appeared in chapter one.

There it described who the gospel reaches first.

Here it describes who faces judgment first instead.

The same order holds whether the news is good or bad.

🌍 This phrase repeats from chapter one
📰 There it described the gospel's reach
⚖️ Here it describes judgment's reach
📖 The same order holds either way

## 🙌 Glory, Honour, And Peace, To Every Man That Worketh Good

This verse mirrors the positive side of the same pattern.

"Worketh good" describes the outward life that flows from genuine faith.

The reward named here matches the reward named back in verse seven.

Good and evil both receive a response that fits exactly what they produced.

🙌 Mirrors the positive side of the pattern
🌱 Worketh good describes a life from faith
🔁 Matches the reward from verse seven
📖 The response always fits what was produced

## 👁️ No Respect Of Persons With God

"Respect of persons" means showing favoritism based on status or identity.

A human judge might favor the wealthy, the powerful, or their own people.

God's judgment never bends for any of those reasons.

Standing before God, no background buys special treatment.

👁️ Respect of persons means favoritism
👑 Humans often favor status or power
⚖️ God's judgment never bends that way
📖 No background buys special treatment

# Romans 2:12-16
# 📜 Law, Conscience, And Judgment
---
## ⚖️ As Many As Have Sinned Without Law Shall Also Perish Without Law

"Without law" describes Gentiles, people who never received the law of Moses directly.

They are still judged, just not by a legal code they never had.

Paul is not saying Gentiles get a free pass from judgment.

Lacking the law does not mean lacking accountability.

⚖️ Without law means lacking the Mosaic law
🌍 Describes Gentiles, not a free pass
📏 Judged by a different standard still
📖 No law does not mean no accountability

## 📜 As Many As Have Sinned In The Law Shall Be Judged By The Law

This half of the verse turns to the Jewish people, who received the law directly.

They are judged by the specific standard they were actually given.

Each group faces a standard that fits what they were given.

Fair judgment matches the measure each person actually received.

📜 Describes those who had the law
📏 Judged by the standard they received
⚖️ Fits what each group was given
📖 Fair judgment matches what was received

## 👂 Not The Hearers Of The Law Are Just

"Hearers" describes people who listened to the law read aloud in the synagogue.

Simply hearing it recited was never the same as keeping it.

Head knowledge without a changed life does not make a person right before God.

Hearing the law and obeying it are two very different things.

👂 Hearers means those who listened only
🧠 Hearing is not the same as keeping
📚 Head knowledge alone changes nothing
📖 Hearing and obeying are different things

## ✅ The Doers Of The Law Shall Be Justified

"Doers" describes people whose actions actually matched what the law required.

This verse sets up a real problem Paul answers fully later in the letter.

No one, Jew or Gentile, keeps the law perfectly enough to be justified this way.

Paul raises the bar here before showing that no one clears it.

✅ Doers means actions that matched the law
❓ This sets up a problem for later
🚫 No one clears this bar perfectly
📖 Paul answers this later in the letter

## 🕊️ Do By Nature The Things Contained In The Law

Paul describes Gentiles who never read the law.

They still act in line with some of what it requires.

"By nature" means this comes from an inner sense, not formal study.

This does not mean these Gentiles are sinless or saved by good behavior.

Right and wrong remains built in, even without the written law.

🕊️ Gentiles here never studied the law
🧭 By nature means an inner sense
🚫 This does not mean sinless or saved
📖 Right and wrong remains built in

## 📝 A Law Unto Themselves

This phrase does not mean these Gentiles invented their own private rules.

It means their conscience functions the way the written law functions for a Jew.

Their inner sense of right and wrong stands in for a law they never received.

An unwritten law can still hold real moral weight.

📝 Not inventing their own private rules
🧭 Conscience functions like a written law
💭 An inner sense stands in for it
📖 Unwritten law still carries real weight

## ❤️ The Work Of The Law Written In Their Hearts

This pictures something usually carved on stone tablets written instead on a living heart.

It describes a moral awareness built into every person, not a formal legal code.

Conscience "bearing witness" means it testifies for or against a person's own choices.

Everyone carries an inner witness to right and wrong.

❤️ Pictures the law written on a heart
🧠 A built in moral awareness
⚖️ Conscience bears witness like a testimony
📖 Everyone carries an inner witness

## 🤔 Their Thoughts The Mean While Accusing Or Else Excusing One Another

"The mean while" is an old phrase simply meaning meanwhile.

Paul describes an internal courtroom running inside every person's own mind.

Sometimes conscience accuses, and sometimes it excuses, depending on the choice being judged.

Everyone already carries a built in sense of their own guilt or innocence.

🤔 The mean while simply means meanwhile
⚖️ Pictures an internal courtroom in the mind
🔄 Conscience can accuse or excuse
📖 Everyone senses their own guilt or innocence

## 📅 In The Day When God Shall Judge The Secrets Of Men

This points forward to one final day of reckoning for everyone.

"Secrets" means hidden thoughts and motives, not only visible actions.

Nothing done in private will stay private on that day.

Final judgment reaches all the way down to what no one else ever saw.

📅 Points to one final day of judgment
🔍 Secrets means hidden thoughts and motives
🙈 Nothing stays private on that day
📖 Judgment reaches what no one else saw

## ✝️ By Jesus Christ According To My Gospel

Paul names Jesus Christ as the one who carries out this final judgment.

"My gospel" means the specific message about Jesus that Paul was given to preach.

This ties the whole discussion of judgment directly back to the good news itself.

The judge on that day is the same Jesus the gospel proclaims.

✝️ Jesus Christ carries out final judgment
📰 My gospel means Paul's specific message
🔗 Ties judgment back to the gospel
📖 The judge is the one the gospel proclaims

# Romans 2:17-24
# 🪞 The Hypocrisy Of The Law Teacher
---
## 🏷️ Thou Art Called A Jew

Paul now turns to address a Jewish reader directly, by name.

"Called" here means identified or named, not merely invited.

Carrying this name came with real pride in ancient Israel.

Paul speaks to someone who takes real pride in this identity.

🏷️ Called means identified, not invited
🇮🇱 Jew carried deep pride in that identity
🗣️ Paul now speaks to this reader directly
📖 Pride in the name sets up the trap

## 🛌 Restest In The Law

"Restest" means to lean on something for confidence or security.

This person treats simply possessing the law as enough on its own.

Owning a copy of God's commands is not the same as living by them.

Possessing the law was never meant to replace obeying it.

🛌 Restest means leaning on for security
📜 Treats possessing the law as enough
🚫 Owning it differs from living it
📖 Possession was never meant to replace obedience

## 😏 Makest Thy Boast Of God

"Boast" here is not automatically a bad word.

It can describe rightful pride in belonging to the one true God, unlike the Gentile nations.

The danger comes later, if that pride turns into empty pride instead of gratitude.

Knowing the true God is a real privilege Paul is about to test.

😏 Boast is not automatically wrong here
✝️ Describes pride in the true God
⚠️ The danger comes if pride replaces gratitude
📖 A real privilege Paul is about to test

## 💡 Knowest His Will, And Approvest The Things That Are More Excellent

"Approvest" means recognizing and endorsing what is genuinely good.

"The things that are more excellent" means moral and spiritual priorities, ranked correctly.

Having good moral discernment from studying the law was a real strength.

Knowing right from wrong clearly is a real gift, not an empty claim.

💡 Approvest means recognizing what is good
🎯 More excellent means correctly ranked priorities
📚 Discernment came from studying the law
📖 Clear moral knowledge is a real gift

## 🎓 Being Instructed Out Of The Law

This describes a real, formal education in the Jewish scriptures.

This person was not guessing at morality or picking it up casually.

They had years of structured religious training behind them.

Real training in God's word makes what comes next even more serious.

🎓 Describes formal religious education
📖 Not guessing at morality casually
📚 Years of structured training stood behind it
➡️ Serious training raises the stakes ahead

## 👁️ A Guide Of The Blind, A Light Of Them Which Are In Darkness

This person saw themselves as a teacher and example for Gentiles.

"Blind" and "darkness" picture people without the law's moral clarity.

This self image sounded humble, but it was also a high claim to make.

Claiming to guide others puts your own example under a much brighter light.

👁️ Sees self as teacher of Gentiles
🕶️ Blind and darkness picture moral confusion
🙋 A high claim dressed as humility
📖 Guiding others invites closer scrutiny

## 🧒 An Instructor Of The Foolish, A Teacher Of Babes

"Foolish" here is a moral word, describing those who reject wisdom, not low intelligence.

"Babes" pictures spiritual beginners who still need basic teaching.

This person saw themselves standing well above both groups.

The higher the claimed position, the harder the coming fall will land.

🧒 Babes pictures spiritual beginners
🙄 Foolish is moral, not about intelligence
📈 This person claimed a high position
📖 A high claim sets up a hard fall

## 📐 The Form Of Knowledge And Of The Truth In The Law

"Form" means the outward shape or pattern of something, not its full substance.

This person had the shape of true knowledge from studying the law closely.

Having the outline of truth is not the same as living inside it.

A shape can exist without the substance that is supposed to fill it.

📐 Form means outward shape, not substance
📜 Shape came from studying the law
🕳️ Shape without substance leaves it empty
📖 Outline is not the same as living it

## 🪞 Teachest Thou Not Thyself

Paul suddenly flips from description into direct challenge.

Someone who teaches others the law should obviously live by it first.

This single question exposes the gap between claimed knowledge and actual practice.

Teaching truth to others means nothing if you refuse to live by it yourself.

🪞 Paul flips to direct challenge
📚 Teachers should live by what they teach
🕳️ Exposes a gap between claim and practice
📖 Teaching means nothing without living it

## 🏃 Thou That Preachest A Man Should Not Steal, Dost Thou Steal

Paul names stealing as the first specific example of this hypocrisy.

Preaching against a sin and still committing it in private makes the preaching hollow.

This is a concrete test, not a vague accusation.

A command preached loudly means little if it is broken quietly.

🏃 First specific example named, stealing
🗣️ Preaching against sin while doing it
🧪 A concrete test, not a vague charge
📖 Loud preaching means little if broken quietly

## 💔 Thou That Abhorrest Idols, Dost Thou Commit Sacrilege

Adultery names a second specific sin behind the same public teaching.

"Sacrilege" means stealing or misusing something set apart for sacred use.

Some teachers of that era profited from pagan temple goods.

They also condemned idolatry loudly in public.

Loud condemning and quiet profiting is the same hypocrisy.

💔 Adultery, a second specific sin named
🏛️ Sacrilege means misusing something sacred
💰 Some profited from pagan temple goods
📖 Loud condemning, quiet profiting, same hypocrisy

## ⚖️ Through Breaking The Law Dishonourest Thou God

"Dishonourest" means to strip away proper honor and respect.

Boasting in the law was supposed to honor the God who gave it.

Breaking that same law does the opposite, it drags God's name down instead.

Claiming God's law while breaking it insults the very God being claimed.

⚖️ Dishonourest means stripping away honor
📜 The law was meant to honor God
🔄 Breaking it does the opposite
📖 Claiming God while breaking his law insults him

## 😠 The Name Of God Is Blasphemed Among The Gentiles Through You

This line echoes language from the prophet Isaiah, written centuries earlier.

Watching Jewish hypocrisy did not make Gentiles respect the Jewish God more.

It gave them a reason to mock and dismiss him instead.

One person's hypocrisy can damage how an entire outside world sees God.

😠 Echoes language from the prophet Isaiah
👀 Gentiles watched Jewish hypocrisy closely
🙄 It gave them reason to mock God
📖 One hypocrite can damage how God is seen

# Romans 2:25-29
# ❤️ True Circumcision Is Of The Heart
---
## ✂️ Circumcision Verily Profiteth, If Thou Keep The Law

Circumcision was the physical sign of belonging to God's covenant with Israel.

"Verily" simply means truly or certainly.

Paul says the sign has real value, but only alongside actually keeping the law.

A covenant sign was never meant to work apart from a covenant life.

✂️ Circumcision marked covenant belonging
✅ Verily means truly or certainly
📜 The sign's value depends on obedience
📖 A sign was never meant to stand alone

## 🚫 Thy Circumcision Is Made Uncircumcision

This is a startling reversal, the physical sign itself becomes meaningless.

Breaking the law strips the sign of the covenant meaning it was meant to carry.

The mark on the body stays, but its spiritual value disappears.

A sign without the life behind it is really no sign at all.

🚫 A startling reversal in meaning
📉 Lawbreaking strips the sign's meaning
👁️ The mark stays, the value disappears
📖 A sign without the life is no sign

## 🔄 If The Uncircumcision Keep The Righteousness Of The Law

Paul now flips the picture entirely to describe a Gentile without the sign.

If that same Gentile actually lived out the law's righteousness, something remarkable follows.

God, Paul says, would count that person's uncircumcision as if it were circumcision.

The reality behind a sign matters more to God than the sign itself.

🔄 Flips the picture to a Gentile
🌱 Describes real righteousness without the sign
✅ God counts it as if circumcised
📖 Reality matters more than the sign

## 👑 Uncircumcision Which Is By Nature

"By nature" here means someone born outside the covenant sign entirely.

Paul pictures that person standing in judgment over the lawbreaking Jew.

This Gentile keeps the law's substance without ever having the letter or the ritual.

Obedience without the sign outranks the sign without obedience.

👑 By nature means born outside the sign
⚖️ Pictures a Gentile judging a Jew
📜 Substance kept without the letter
📖 Obedience outranks the sign alone

## 🫀 He Is Not A Jew, Which Is One Outwardly

Paul redefines what the word Jew most truly means.

Birth alone is not the full picture.

An outward identity alone was never the deepest point of the covenant.

God was always looking past the outward mark toward something deeper.

🫀 Paul redefines what Jew truly means
👤 Birth alone is not the full picture
🔍 Outward identity was never the deepest point
📖 God looks past the mark toward the heart

## ❤️ Circumcision Is That Of The Heart, In The Spirit

The true circumcision Paul describes happens inside a person, not on the body.

"In the spirit" points to a change worked by God's own Spirit.

This inward change was always the real point the physical sign was pointing toward.

The outward ritual was only ever a picture of this deeper, inward work.

❤️ True circumcision happens inside a person
🕊️ In the spirit means God's own work
🎯 The ritual always pointed toward this
📖 The outward picture points to inward change

## 🙏 Whose Praise Is Not Of Men, But Of God

This closing line names where real commendation ultimately comes from.

Human approval can be earned by appearances alone.

God's approval responds only to what is genuinely true on the inside.

Chapter two ends by pointing every reader back to an audience of one.

🙏 Names where real praise comes from
👥 Human approval can be earned by appearances
🎯 God's approval responds to what is true
➡️ Chapter two points to an audience of one
`.trim();

export const ROMANS_TWO_PERSONAL_SECTIONS = parseRomansTwoRawNotes(ROMANS_TWO_RAW_NOTES);
