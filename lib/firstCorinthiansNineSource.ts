export type FirstCorinthiansNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansNineRawNotes(rawText: string): FirstCorinthiansNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 9:${startVerse}` : `1 Corinthians 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 First Corinthians 9 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_NINE_RAW_NOTES = `# FirstCorinthians 9:1-3
# 🎤 Paul Defends His Apostleship
---
## 🎤 Am I Not An Apostle

Paul opens with a question he already knows the answer to.

Some people in Corinth were questioning his right to lead them.

An apostle was someone personally sent and commissioned by Jesus himself.

Paul is not boasting here.

He is answering real doubts that had been raised against him.

❓ A rhetorical question with an obvious answer

📨 Apostle means someone personally sent by Christ

😕 Some in Corinth doubted his authority

📖 Paul answers real accusations, not pride

## 🆓 Am I Not Free

This question connects straight back to chapter eight.

There Paul gave up his right to eat certain meat.

He did that for the sake of weaker believers.

Here he reminds the Corinthians that giving up a right is a choice.

It is not the same as never having had that right at all.

🔗 Connects directly to chapter eight

🎁 Giving up a right is a choice

🆓 Paul genuinely has that right

➡️ Restraint is not the same as lacking freedom

## ✨ Have I Not Seen Jesus Christ Our Lord

Paul is pointing to a specific moment, not a feeling.

On the road to Damascus, the risen Jesus appeared to him directly.

That encounter helped qualify him to be called an apostle.

Most of the other apostles walked with Jesus for years before the resurrection.

Paul met him suddenly, after years of persecuting the church instead.

🛣️ Points to the Damascus road meeting

✨ Jesus appeared to him after the resurrection

📜 This encounter helped qualify his apostleship

📖 God can commission even a former persecutor

## 🍇 Are Not Ye My Work In The Lord

Paul personally planted the church in Corinth.

He calls the Corinthians themselves living proof of his ministry.

A tree is known by its fruit.

This church is that fruit.

If his work changed their lives, that result speaks for his calling.

🌱 Paul personally planted this church

🍇 The Corinthians are the fruit of his work

👀 Results testify to a real calling

📖 A changed life proves a true ministry

## 🔏 The Seal Of Mine Apostleship

A "seal" was a stamped mark proving a document was genuine.

Ancient letters and contracts were sealed with wax pressed by a signet ring.

Paul says the Corinthian church itself is that seal.

Their transformed lives are the proof that stamps his apostleship as real.

🔏 Seal means an official mark of proof

📜 Ancient documents were sealed with wax

⛓️ The church itself is that seal

📖 Their changed lives prove his calling

## ⚖️ Them That Do Examine Me

"Examine" here is closer to a courtroom term than a casual question.

Paul describes himself as someone being cross examined by accusers.

Certain people in Corinth had set themselves up as his judges.

Paul answers like a defendant giving testimony.

He is not simply chatting with friends.

⚖️ Examine means a formal cross examination

🏛️ Paul pictures himself on trial

😠 Accusers had set themselves up as judges

➡️ Paul responds like a defendant, not a friend

# FirstCorinthians 9:4-7
# 🍞 The Right To Be Supported
---
## 🍽️ Power To Eat And To Drink

"Power" here does not mean physical strength.

It means a right or an authority to do something.

Paul is asking whether he has the right to receive food and drink.

Any worker expects support that covers basic needs.

💪 Power means right or authority

🍽️ The right includes basic food and drink

👷 Workers expect support for their labor

➡️ Paul is stating an obvious right

## 🏠 Lead About A Sister, A Wife

Some apostles traveled together with their believing wives.

This was normal during their ministry travels.

A wife on these trips could help with practical needs and hospitality.

Paul says other apostles had this same right, supported by the churches.

🚶 Describes traveling with a believing wife

🏠 Wives helped with ministry and hospitality

👫 Other apostles practiced this openly

📖 It was a normal, accepted right

## 👨‍👩‍👦 The Brethren Of The Lord

This phrase refers to Jesus's own half brothers.

Names like James, Joses, Simon, and Judas appear elsewhere in the Gospels.

They did not believe in Jesus during his earthly ministry.

Several of them became believers and leaders after the resurrection.

👨‍👩‍👦 Refers to Jesus's actual half brothers

❌ They did not believe at first

✅ Several became leaders after the resurrection

📖 Family doubt did not block later faith

## 🪨 And Cephas

Cephas is simply another name for Peter.

It comes from an Aramaic word meaning rock.

Paul uses this name instead of Peter here.

Some Corinthians had formed a faction loyal to Cephas earlier in this letter.

🪨 Cephas means rock in Aramaic

🗣️ Another name for the apostle Peter

👥 Some Corinthians favored his name as a faction

📖 Paul names him without picking a side

## 🛑 Forbear Working

"Forbear" means to hold back or refrain from doing something.

Paul asks whether he and Barnabas had the right to stop secular labor.

They had that right, the same as other apostles.

Paul is setting up a contrast here.

He chose not to use this right in Corinth.

🛑 Forbear means to hold back from

🔨 The right to stop secular labor

🤝 Paul and Barnabas shared this right

➡️ He is setting up a contrast

## 🪖 Goeth A Warfare Any Time At His Own Charges

A soldier does not pay for his own weapons, food, or gear.

His commanding army is expected to supply what he needs.

Paul uses this as the first of three everyday illustrations.

No reasonable person expects a soldier to fund his own war effort.

🪖 A soldier does not fund his own supplies

🏛️ The army provides for its own soldiers

🔰 The first of three illustrations

➡️ Supporting a worker is simple common sense

## 🍇 Planteth A Vineyard, And Eateth Not Of The Fruit Thereof

A farmer who plants a vineyard expects to eat some of its grapes.

Nobody plants years of labor into a field for nothing.

This is Paul's second illustration, pulled from everyday farm life.

The same principle applies no matter the type of work.

🍇 A farmer expects to eat his own fruit

🌾 Labor naturally expects some return

🔸 The second of three illustrations

📖 Even a farmer's harvest proves the point

## 🐑 Feedeth A Flock, And Eateth Not Of The Milk Of The Flock

A shepherd who tends a flock expects to drink some of its milk.

This is the third and final everyday illustration Paul uses.

Soldier, farmer, and shepherd all point to one obvious truth.

Anyone who labors for something has a right to benefit from it.

🐑 A shepherd expects milk from his flock

🔹 The third of three illustrations

🔁 Soldier, farmer, and shepherd all agree

📖 Labor and benefit naturally belong together

# FirstCorinthians 9:8-10
# 🐂 Even The Law Agrees
---
## 🗣️ Say I These Things As A Man

Paul pauses to clarify where his argument is coming from.

So far he has only used everyday human examples, like a soldier or a farmer.

He is about to show that scripture backs up the same principle.

Common sense and God's law are about to agree completely.

🗣️ Paul checks the source of his argument

👤 So far, only human examples were used

📜 Scripture is about to confirm the point

➡️ Common sense and God's law will agree

## 🐂 Thou Shalt Not Muzzle The Mouth Of The Ox

This is a direct quote from the law of Moses, found in Deuteronomy.

An ox pulled a heavy stone over grain to separate it from the stalk.

This process was called "treading."

A muzzle would have covered the ox's mouth completely.

The law forbade blocking the ox from eating a portion of that grain.

🐂 An ox trod grain to thresh it out

🚫 Muzzle means blocking its mouth from eating

📜 The law of Moses forbade this

➡️ Working animals got to share in the harvest

## ❓ Doth God Take Care For Oxen

Paul asks whether God's concern in this law was only about animals.

He is not denying that God cares for animals at all.

He is pointing toward a deeper purpose behind the wording.

The question sets up his next point about who the law was really for.

❓ A question that expects a deeper answer

🐂 Not a denial of care for animals

🎯 Points toward a larger purpose

➡️ Sets up the next verse's conclusion

## 📜 Altogether For Our Sakes

Paul says the law was written with people in mind, not just oxen.

Jewish teachers often reasoned from a smaller case to a larger one.

If an ox deserves a share of what it produces, a worker deserves one too.

The ox law was really about a much bigger principle.

👤 The law's real audience was people

📚 A common lesser to greater argument

🐂 Even an ox gets a fair share

📖 A small example proves a bigger truth

## 🚜 He That Ploweth Should Plow In Hope

Plowing broke up the ground before seed could be planted.

No farmer plows a field expecting nothing to grow afterward.

Paul applies that same logic to threshing grain.

Ministry labor carries that same forward looking hope of a real result.

🚜 Plowing prepares ground before planting

🌱 Farmers plow expecting a harvest

🌾 Threshing shares the same hopeful logic

📖 Ministry labor carries the same hope

# FirstCorinthians 9:11-14
# 🌱 Reaping What Was Sown
---
## 🌱 Sown Unto You Spiritual Things

Paul compares his teaching and preaching to planting seed.

He personally brought the gospel to Corinth and helped the church take root.

That work was spiritual, not physical or financial.

Seed planted in good soil is expected to eventually produce a harvest.

🌱 Spiritual things means his teaching and preaching

🏙️ He personally planted the Corinthian church

🌾 Seed is meant to produce a harvest

➡️ Spiritual investment expects a real return

## 💰 Reap Your Carnal Things

"Carnal" simply means physical or material here, not sinful.

Paul asks whether receiving ordinary material support back is really such a big request.

He gave the Corinthians something spiritual.

Receiving basic material help in return is a small, fair exchange by comparison.

💰 Carnal here means material, not sinful

⚖️ A fair exchange, not a heavy burden

🤲 Spiritual gift given, small support asked

📖 The request is modest compared to the gift

## 👥 Others Be Partakers Of This Power Over You

Other teachers in Corinth were already receiving support from the church.

Paul points out that if they had this right, he certainly does too.

He founded the church himself.

That gives him an even stronger claim than theirs.

👥 Other teachers already received support

🏗️ Paul founded this church himself

📈 His claim is even stronger than theirs

➡️ The comparison strengthens his case

## 🚫 We Have Not Used This Power

Paul had a clear right to support in Corinth.

He chose not to use that right there.

Acts records that he worked as a tentmaker to pay his own way instead.

This was a deliberate decision, not an oversight.

🚫 Paul did not take Corinth's support

🧵 He worked as a tentmaker instead

🎯 This was a deliberate choice

➡️ His reason comes in the next line

## 🎯 Lest We Should Hinder The Gospel Of Christ

Paul explains his real motive for refusing support.

Some critics in the ancient world mocked teachers who charged money for their message.

Refusing payment removed that exact accusation before anyone could raise it.

Nothing about money would stand between the Corinthians and the gospel itself.

🎯 His real motive was protecting the message

💸 Paid teachers could be seen as greedy

🛡️ Refusing pay removed that accusation

📖 Nothing financial should block the gospel

## 🏛️ They Which Minister About Holy Things Live Of The Things Of The Temple

Paul now draws from the Old Testament priesthood for a second line of proof.

Priests and Levites served at the temple.

They received a portion of the people's offerings as their own support.

This system came from the law of Moses, found in the book of Numbers.

Ministers living from the people they serve was never a new idea.

🏛️ Priests served at the temple itself

🍞 They lived on a share of the offerings

📜 This system came from the law of Moses

➡️ Support for ministers is an old, established pattern

## 🔥 Partakers With The Altar

Priests who served at the altar received a portion of the sacrifices they offered.

They did not just perform a ceremony and walk away empty handed.

Serving at the altar and sharing in its food went together.

Paul applies the same pattern to those who preach the gospel today.

🔥 Priests shared in the sacrifices offered

🍖 Service and support went together

🤝 Not ceremony without any benefit

📖 The same pattern applies to gospel preachers

## 👑 That They Which Preach The Gospel Should Live Of The Gospel

Paul closes this argument by naming its true source.

He is not inventing this principle on his own authority.

This command comes from the Lord Jesus himself.

Luke's Gospel records it as "the laborer is worthy of his hire."

Ministers receiving support was Christ's own instruction, not Paul's personal opinion.

👑 This command comes from the Lord himself

📖 Echoes Luke's laborer worthy of his hire

🧑‍🏫 Not Paul's personal opinion alone

➡️ Christ himself established the principle

# FirstCorinthians 9:15-18
# 🎁 The Reward Of Preaching Free
---
## 🚫 I Have Used None Of These Things

Paul restates plainly that he never took this support from Corinth.

Every right he just spent several verses proving, he chose not to use.

This was not weakness.

It was not an inability to ask either.

It was a deliberate, personal decision he held to firmly.

🚫 Paul never took this kind of support

💪 He had the right, but chose otherwise

🎯 A deliberate, personal decision

➡️ Firm conviction, not simple weakness

## 🔥 It Were Better For Me To Die

This is unusually strong language, even for Paul.

He says he would rather die than give up this one practice.

That intensity shows how deeply this choice mattered to him.

It was not a minor preference he could easily drop.

🔥 Extremely strong, intense language

☠️ He would rather die than change this

❤️ Shows how deeply this choice mattered

➡️ Not a minor, easily dropped preference

## 🏆 Make My Glorying Void

"Glorying" here means Paul's one source of personal pride in his ministry.

He is not boasting about his gifts or his success.

His boast is narrow and specific.

He preached without ever charging for it.

Losing that one distinction would feel like losing something that truly belonged to him.

🏆 Glorying means his one point of pride

🎯 A narrow, specific kind of boast

💵 Preaching completely free of charge

📖 Losing it would feel like a real loss

## ⚖️ Necessity Is Laid Upon Me

"Necessity" means a compulsion, something Paul could not simply walk away from.

This likely points back to his sudden calling on the road to Damascus.

Preaching was never a career choice he weighed against other options.

It was a debt placed on him that he was required to pay.

⚖️ Necessity means a real compulsion

🛣️ Echoes his Damascus road calling

🚫 Never a simple career choice

➡️ A debt he was required to pay

## 😨 Woe Is Unto Me, If I Preach Not The Gospel

"Woe" is a cry of serious warning or distress.

Old Testament prophets often used this same kind of language.

Paul says failing to preach would bring that kind of judgment on himself.

Staying silent was never a real option he considered.

😨 Woe signals serious warning or distress

📜 Echoes Old Testament prophetic language

🤐 Silence was never a real option

📖 The call carried real, personal weight

## 🙋 If I Do This Thing Willingly, I Have A Reward

Paul distinguishes between two different attitudes toward the same task.

Doing something willingly, out of genuine desire, earns its own kind of credit.

He is building toward a contrast with the next verse.

Willing service and forced service are not the same thing.

🙋 Willing service earns its own credit

⚖️ Sets up a contrast with forced duty

❤️ Genuine desire matters to the outcome

➡️ Two different attitudes, two different rewards

## 📦 A Dispensation Of The Gospel Is Committed Unto Me

"Dispensation" means a task or a stewardship handed to someone else to manage.

Paul did not choose this assignment the way someone picks a career.

It was entrusted to him, the way a servant is given a job.

Preaching the gospel was the task God placed in his hands.

📦 Dispensation means a task entrusted to someone

🧑‍🔧 Like a servant handed a task

🚫 Not a career Paul chose himself

📖 Preaching was the task God handed him

## 🎁 That I Abuse Not My Power In The Gospel

Paul finally names what his unique reward actually is.

He gets to preach the gospel completely free of charge.

That choice protects his right from ever being twisted into a financial motive.

No one could ever accuse him of preaching for money.

🎁 His reward is preaching completely free

🛡️ This protects his right from misuse

💸 No one can accuse him of greed

➡️ A clean motive, with nothing to hide

# FirstCorinthians 9:19-23
# 🤝 Becoming All Things To All Men
---
## 🆓 Free From All Men

Paul circles back to the question he opened the chapter with.

He is not controlled or owned by any person or group.

His freedom is real, not just a word he uses loosely.

That freedom is exactly what makes his next choice meaningful.

🔁 Circles back to the chapter's opening question

🆓 Paul is genuinely free, not controlled

✅ His freedom is real, not just claimed

➡️ Real freedom makes his next choice meaningful

## 🙇 Made Myself Servant Unto All

Paul voluntarily limits his own freedom for the sake of others.

Nobody forced this decision on him.

This matches the exact pattern from chapter eight.

There he gave up a right to protect someone weaker.

A free man choosing to serve is more powerful than a servant with no choice.

🙇 A voluntary choice, not a forced one

🔗 Matches the pattern from chapter eight

💪 Choosing service shows real strength

📖 Freedom used for others is freedom well spent

## 🕍 Unto The Jews I Became As A Jew

When working among Jewish people, Paul kept Jewish customs.

These included things like dietary practice and synagogue worship.

This was not dishonesty or pretending to be something he was not.

He genuinely adapted his lifestyle to remove needless barriers to the message.

The goal was always to reach people, not to confuse them.

🕍 He kept Jewish customs among Jews

🤝 Not pretending, but genuine adaptation

🚧 Removing needless barriers to the gospel

➡️ The goal was always reaching people

## 📜 Them That Are Under The Law

This phrase describes people still living under the Mosaic law.

It mainly points to Jewish believers and converts to Judaism.

Paul adjusted his behavior around them too.

He himself was not bound to that law for his own salvation.

He respected their customs without making those customs a requirement for anyone else.

📜 Describes those bound to the Mosaic law

🤝 Paul respected their customs around them

🚫 He never made it a requirement for others

📖 Flexibility never changed the actual gospel

## 🚫 Not Without Law To God, But Under The Law To Christ

Paul makes sure nobody mistakes his flexibility for lawlessness.

He is not free to do whatever he personally wants.

His true obligation is to the law of Christ.

That law centers on love for others.

Adapting his customs never meant abandoning his actual convictions.

🚫 Not lawless or free to do anything

👑 Bound instead to the law of Christ

❤️ Christ's law centers on love

➡️ Flexible customs, unmoved convictions

## 🔗 To The Weak Became I As Weak

This recalls the weak believers described back in chapter eight.

Those believers had sensitive consciences around food once connected to idol worship.

Paul limited his own freedom around them specifically.

He did this so they would not stumble.

His personal comfort mattered less to him than their spiritual safety.

🔗 Recalls the weak believers from chapter eight

🍖 Their concern involved food and idols

🙇 Paul limited himself for their sake

📖 Their safety mattered more than his comfort

## 📋 I Am Made All Things To All Men

This line summarizes everything Paul just described about Jews, Gentiles, and the weak.

It is not about having no real identity of his own.

It means adjusting customs and approach.

The actual message he preached never changed.

Paul stayed the same person the whole time.

He simply flexed how he reached very different groups.

📋 Summarizes the examples just given

🧩 Not a loss of his own identity

🔄 Customs changed, the message never did

➡️ Same person, many different approaches

## 🎯 That I Might By All Means Save Some

Paul names the real goal behind all this flexibility.

It was never about being liked for its own sake.

Every adjustment served one single purpose.

That purpose was helping people actually hear and receive the gospel.

"By all means" shows just how far he was willing to go for that goal.

🎯 The real goal was saving people

🙅 Never about simply fitting in

📣 Every choice served the gospel's reach

📖 He went to great lengths for this goal

## 🤝 That I Might Be Partaker Thereof With You

Paul does not want to stand apart from the Corinthians as an outside observer.

He wants to personally share in the same blessings the gospel brings to them.

"Thereof" refers back to the gospel itself and everything it produces.

His ministry and his own hope are tied to that same outcome.

🤝 Paul does not stand apart from them

🎁 He shares in the gospel's own blessings

🔗 Thereof points back to the gospel

📖 His hope is tied to theirs

# FirstCorinthians 9:24-27
# 🏃 Running To Win The Prize
---
## 🏟️ They Which Run In A Race Run All

Corinth sat near the site of the Isthmian Games, a major athletic contest.

Every Corinthian reader would have known exactly what a stadium race looked like.

Paul reaches for an illustration his audience could picture immediately.

Many runners enter a race.

The moment of victory belongs to only one of them.

🏟️ Corinth sat near the Isthmian Games

🏃 A vivid, local illustration for readers

👥 Many runners enter the same race

➡️ Victory belongs to only one of them

## 🥇 But One Receiveth The Prize

Out of every runner who enters, only a single winner takes the top prize.

Paul is not saying only one person can be saved.

He is making a point about intensity and effort.

Running the Christian life takes the same focused effort a winning racer gives.

🥇 Only one runner wins the top prize

🚫 Not a statement about who gets saved

🎯 A point about intensity and effort

📖 Faith deserves a racer's full focus

## 🏃 So Run, That Ye May Obtain

This is a direct command, not just an observation about races.

Paul applies the illustration straight to the Corinthians themselves.

Watching a race is not the same as running one with everything you have.

He wants them to compete for real, not just admire the idea of it.

🏃 A direct command, not just an observation

👀 Watching is not the same as running

💯 Paul wants real effort, not admiration

➡️ The illustration becomes a personal challenge

## 🏋️ Striveth For The Mastery Is Temperate In All Things

"Strive for the mastery" describes an athlete competing seriously to win.

"Temperate" means strict, disciplined self control.

Ancient athletes followed demanding training routines.

They watched their diet and daily habits closely.

Paul points to that same level of discipline for spiritual life.

🏋️ Strive for the mastery means competing seriously

🧘 Temperate means strict self control

📅 Ancient athletes trained with daily discipline

➡️ Spiritual growth asks for the same discipline

## 🌿 A Corruptible Crown

The actual prize at the Isthmian Games was a simple wreath of leaves.

It was often made of pine or wild celery.

That wreath would wither and fall apart within days.

Athletes trained for years to win something that barely lasted.

🌿 The prize was a wreath of leaves

⏳ It withered away within days

🏆 Years of training for a short lived prize

📖 A temporary reward for real effort

## ♾️ We An Incorruptible

Paul draws a direct contrast with the athlete's quick fading wreath.

The reward Christians pursue never wears out or falls apart.

That contrast is the whole point of bringing up the Isthmian Games.

A reward that lasts forever deserves even more effort than a fading one.

🔄 A direct contrast with the fading wreath

♾️ This reward never wears out or fades

🎯 The whole reason for the illustration

➡️ A lasting reward deserves real effort

## ❓ Not As Uncertainly

"Uncertainly" means without a clear direction or goal.

Paul says he is not running that way.

Imagine a runner sprinting hard but never sure where the finish line is.

That kind of effort would be wasted no matter how fast someone ran.

Paul knows exactly what he is aiming for.

❓ Uncertainly means without clear direction

🏁 Like a runner unsure where to finish

⏳ Fast effort wasted without real purpose

➡️ Paul runs with a clear, fixed goal

## 🥊 Not As One That Beateth The Air

"Beateth the air" pulls from boxing, not running.

A fighter who swings and never lands a real punch wastes every bit of effort.

Paul says his spiritual discipline is not empty shadow fighting either.

His training actually connects with something real.

🥊 Beateth the air means swinging and missing

💨 Describes wasted, empty effort

🎯 Paul's discipline actually connects with something real

📖 Real training requires a real target

## 💪 I Keep Under My Body, And Bring It Into Subjection

This phrase borrows the language of subduing an opponent in a fight.

Paul applies that same intensity to his own body and its impulses.

He actively disciplines his physical desires.

He does not let them lead him instead.

This takes ongoing, deliberate effort, not a single decision made once.

🥊 Language borrowed from subduing an opponent

💪 Paul disciplines his own body and desires

🔁 Ongoing effort, not a single decision

➡️ Self control takes real, constant work

## 🚫 I Myself Should Be A Castaway

"Castaway" describes an athlete disqualified after breaking the competition's rules.

Paul's fear is not losing his salvation by accident.

His fear is inconsistency.

That means preaching one message but living in a way that contradicts it.

Even faithful hard training does not excuse ignoring the rules along the way.

🚫 Castaway means disqualified from competing

😨 Paul fears inconsistency, not accidental loss

🗣️ Preaching one way, living another, is the danger

📖 Faithful living must match faithful preaching
`.trim();

export const FIRST_CORINTHIANS_NINE_PERSONAL_SECTIONS = parseFirstCorinthiansNineRawNotes(FIRST_CORINTHIANS_NINE_RAW_NOTES);
