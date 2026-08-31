export type JobFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobFiveRawNotes(rawText: string): JobFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 5:${startVerse}` : `Job 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 5 sections, received " + sections.length);
  }

  return sections;
}

const JOB_FIVE_RAW_NOTES = `# Job 5:1-5
# ⚖️ The Fate Of The Foolish
---
## 📢 Call Now, If There Be Any That Will Answer Thee

Eliphaz is daring Job to find anyone who can rescue him.

"Call now" means to shout out a challenge.

It is like summoning a witness into a courtroom.

Eliphaz believes no one will answer.

He already assumes Job's suffering proves his guilt.

This is not a comforting invitation.

It is an accusation dressed up as a question.

📢 Call now means to issue a challenge

🤔 Eliphaz expects no one to answer

😔 He assumes Job's guilt already

📖 A question that hides an accusation

## 👼 To Which Of The Saints Wilt Thou Turn

"Saints" here does not mean deceased Christians.

That is how the word is often used today.

In the Old Testament, saints often means holy ones.

That usually points to angels in God's heavenly court.

Eliphaz is asking Job which angel could plead his case.

No angel can undo what Eliphaz already believes about Job.

👼 Saints here means holy ones or angels

⚖️ Eliphaz asks which angel could help

🚫 The implied answer is none

📖 No angel can undo what he assumes

## 😡 For Wrath Killeth The Foolish Man

"Wrath" means more than simple anger.

It describes anger that has grown completely out of control.

Eliphaz is not describing an outside attack.

He means the foolish man's own rage is what ruins him.

Foolish in this book usually means morally reckless.

It does not mean unintelligent.

😡 Wrath means anger grown out of control

💥 It destroys the person holding it

🙅 Not an outside attack from God

📖 Foolish means morally reckless here

## 😒 And Envy Slayeth The Silly One

"Envy" here means bitter resentment toward someone else's success.

"Silly" is an old word for a person lacking moral sense.

It does not mean careless or funny.

Eliphaz pairs wrath and envy as twin poisons.

Together they destroy a foolish life from the inside.

Neither one describes a sudden accident.

Both describe a slow rot that eventually catches up with a person.

😒 Envy means bitter resentment

🙃 Silly meant morally senseless, not funny

☠️ Wrath and envy are twin poisons

📖 Both describe a slow inward rot

## 🌱 I Have Seen The Foolish Taking Root, But Suddenly I Cursed His Habitation

This does not mean Eliphaz watched God personally strike someone down.

"Taking root" is a farming picture.

It describes a person settling in and prospering like a spreading plant.

"Habitation" means home or household, the whole life a person has built.

Eliphaz claims he has watched proud, foolish people prosper for a season.

Then he watched them lose everything without warning.

🌱 Taking root means settling and prospering

🏚️ Habitation means a person's whole household

⚡ Prosperity ended suddenly and without warning

📖 Eliphaz claims this pattern always holds

## 🏛️ His Children Are Far From Safety, And They Are Crushed In The Gate

"The gate" was not a garden entrance.

City gates in the ancient world doubled as the courtroom.

Elders settled disputes and legal cases there, in public.

To be "crushed in the gate" meant losing a case in front of the whole town.

Eliphaz claims the foolish man's own children inherit that public disgrace.

Their fall happens in the most visible place a family's name could be ruined.

🏛️ The gate was the ancient courtroom

⚖️ Crushed in the gate means losing publicly

👨‍👩‍👧 Children inherit their father's disgrace

📖 The shame happens in full public view

## 🌾 Whose Harvest The Hungry Eateth Up

Eliphaz pictures a family's entire livelihood disappearing into other hands.

A harvest represented a full year of labor.

It was stored up to feed a household through the next season.

Here it gets stripped away by hungry strangers before the family can use it.

"Eateth up" pictures total loss, not a partial shortage.

Nothing is left over for the people who actually planted it.

🌾 A harvest fed a household all year

😋 Hungry strangers strip it away instead

📉 Eateth up pictures total loss

📖 The family that planted it gets nothing

## 🦹 The Robber Swalloweth Up Their Substance

"Substance" means a person's total property.

It covers everything a person owns.

First hungry strangers take the harvest.

Then robbers take whatever is left.

"Swalloweth up" pictures something consumed whole, leaving no trace behind.

Eliphaz is stacking loss on top of loss for effect.

He wants Job to hear that folly ends in total ruin.

💰 Substance means all of a person's property

🦹 Robbers take what hunger left behind

🕳️ Swalloweth up means consumed completely

📖 Eliphaz stacks loss to sound complete

# Job 5:6-9
# 🔥 Man Is Born Unto Trouble
---
## 🌍 Although Affliction Cometh Not Forth Of The Dust

This does not mean trouble is random or comes from the dirt itself.

"Dust" and "ground" picture the natural world, the soil under a person's feet.

Eliphaz is saying suffering does not simply spring up on its own.

He believes there is always a cause behind it.

Usually, in his view, that cause is a person's own sin.

This line sets up the idea he states plainly next.

🌍 Dust and ground picture the natural world

🌱 Trouble does not just spring up alone

🔍 Eliphaz believes there is always a cause

📖 He blames sin as that cause

## 🔥 Yet Man Is Born Unto Trouble, As The Sparks Fly Upward

This is one of the most quoted lines in the whole book.

Sparks from a fire naturally rise upward.

No one has to push them.

Eliphaz says trouble rises out of human life just as naturally.

On its own, this line is simply true.

Every life includes real hardship.

The danger comes later, when Eliphaz turns this true idea into a weapon against Job.

🔥 Sparks rise upward without being pushed

😔 Trouble rises out of life just as naturally

✅ The observation itself is simply true

📖 Eliphaz will misuse it against Job

## ⚖️ I Would Seek Unto God, And Unto God Would I Commit My Cause

"Commit my cause" is legal language.

It means handing a case over to a judge.

Eliphaz says that if he were suffering like Job, he would take his complaint straight to God.

This is meant as advice for Job.

It comes wrapped inside a subtle rebuke.

The implication is that Job has not been doing this correctly.

⚖️ Commit my cause means bring it to court

🙏 Eliphaz claims he would go straight to God

😬 The advice hides a quiet rebuke

📖 God will judge Eliphaz's own words later

## 🔎 Which Doeth Great Things And Unsearchable

"Unsearchable" means beyond what a person could ever fully investigate.

Eliphaz begins praising God's power here.

This part of his speech is not wrong.

He is building toward advice he thinks Job desperately needs.

The praise itself sounds almost like something lifted from the Psalms.

The problem will not be what Eliphaz says about God.

It will be how he applies it to Job.

🔎 Unsearchable means beyond full investigation

🙌 Eliphaz genuinely praises God's power

📜 This part sounds almost like a psalm

📖 The problem comes later, in the application

## ✨ Marvellous Things Without Number

This is not simply flattering language aimed at pleasing God.

"Marvellous" means wonderful in a way that goes beyond normal explanation.

"Without number" means too many to count, not a small tidy list.

Eliphaz is about to list specific examples of what he means.

That list is meant to prove God is active and fair in how the world works.

✨ Marvellous means wonderful beyond explanation

🔢 Without number means too many to count

📋 Eliphaz is about to list examples

📖 The list will argue God is fair

# Job 5:10-16
# 🌧️ God Exalts The Lowly
---
## 🌧️ Who Giveth Rain Upon The Earth, And Sendeth Waters Upon The Fields

Eliphaz starts his list of God's great deeds with something every farmer depended on.

In this dry region, rain was never guaranteed.

A failed season could mean real hunger.

Naming rain first grounds Eliphaz's praise in something Job's whole community could recognize.

God is not distant here.

He personally waters the fields that feed people.

🌧️ Rain was never guaranteed in this region

🌾 A failed season could mean real hunger

💧 God personally waters the fields

📖 The same God Eliphaz says judges Job

## ⬆️ To Set Up On High Those That Be Low

"Those that be low" means people brought down by grief, poverty, or hardship.

"Set up on high" pictures someone lifted out of the dust.

They are given a stable place to stand again.

Eliphaz says God is the one who reverses a person's fortune.

It is not chance or luck.

"Exalted to safety" describes both rescue and real relief from danger.

⬇️ Those that be low means people brought down

⬆️ Set up on high means lifted to stability

🎲 God reverses fortune, not chance

📖 This part of the speech aims at comfort

## 🕵️ He Disappointeth The Devices Of The Crafty

"Devices" means secret schemes or calculated plans.

"Crafty" describes someone clever enough to manipulate a situation for gain.

Eliphaz says God actively works against these hidden plans.

This is not only the obviously evil ones.

This introduces the idea that cleverness alone cannot outmaneuver God.

🕵️ Devices means secret schemes

😏 Crafty means cleverly manipulative

🛑 God actively works against hidden plans

📖 Cleverness cannot outmaneuver God

## 🏗️ So That Their Hands Cannot Perform Their Enterprise

"Enterprise" here means an ambitious plan or undertaking.

It is not a business in the modern sense.

"Their hands cannot perform" pictures a scheme collapsing right when it should succeed.

The failure is not random bad luck in Eliphaz's view.

He believes God personally intervenes to stop plans built on manipulation.

🏗️ Enterprise means an ambitious undertaking

🤲 Their hands cannot perform pictures collapse

🎯 Not random luck, in Eliphaz's view

📖 God personally stops manipulative plans

## 🧠 He Taketh The Wise In Their Own Craftiness

This does not mean God tricks people who never had a chance.

"The wise" here means people clever enough to scheme.

It does not mean people who are simply intelligent.

"Craftiness" describes their own tactics turning around and trapping them instead.

This line is quoted directly in the New Testament, in 1 Corinthians 3:19.

🧠 The wise means the cleverly scheming here

🪤 Craftiness turns and traps its own user

🔁 Their own tactic becomes their downfall

📖 Paul later quotes this exact line

## 😤 And The Counsel Of The Froward Is Carried Headlong

"Froward" is a common KJV word meaning stubborn and rebellious.

It describes someone who resists correction on purpose.

"Counsel" means their plan, the direction they intended to go.

"Carried headlong" pictures that plan rushing forward out of control.

It heads straight toward disaster.

Eliphaz keeps stacking pictures of clever plans that collapse on themselves.

😤 Froward means stubborn and rebellious

🗺️ Counsel means their intended plan

🌀 Carried headlong means rushing out of control

📖 Clever plans keep collapsing on themselves

## 🖐️ They Meet With Darkness In The Day Time, And Grope In The Noonday As In The Night

"Grope" means feeling around blindly.

It describes the way a person searches a dark room with their hands.

Eliphaz pictures confident, scheming people suddenly unable to see.

"Noonday" is the brightest point of the day.

That makes the image especially striking.

Their confusion has nothing to do with actual sunlight outside.

It describes a total loss of direction that Eliphaz says God brings on the crafty.

🖐️ Grope means feeling around blindly

☀️ Noonday is the brightest point of the day

😵 Confident people suddenly cannot see

📖 God confuses those who scheme, in this view

## 🗡️ He Saveth The Poor From The Sword, From Their Mouth, And From The Hand Of The Mighty

"Their mouth" refers back to the crafty and mighty people described just before.

Eliphaz shifts from describing judgment on schemers to describing rescue for the vulnerable.

"The sword" pictures violent threats.

"Their mouth" pictures threats made through words and false accusations.

"The mighty" means people with power and influence who could crush someone weaker.

God is presented here as the defender of those with no other defender.

🗡️ The sword pictures violent threats

🗣️ Their mouth pictures threats made through words

💪 The mighty means powerful, influential people

📖 God defends those with no other defender

## 😈 So The Poor Hath Hope, And Iniquity Stoppeth Her Mouth

"Iniquity" means deliberate wrongdoing.

It is not an innocent mistake.

Eliphaz personifies iniquity here, almost like a person with a mouth.

"Stoppeth her mouth" pictures injustice losing its voice.

It loses its power to threaten anyone further.

This closes Eliphaz's list of examples on a note of hope for the powerless.

😈 Iniquity means deliberate wrongdoing

🗣️ Eliphaz personifies injustice with a mouth

🤐 Stoppeth her mouth means silenced

📖 Comfort here makes the next turn sharper

# Job 5:17-21
# 🩹 Happy Is The Man Whom God Correcteth
---
## 👀 Behold, Happy Is The Man Whom God Correcteth

Eliphaz now turns his praise of God directly toward Job.

"Behold" signals a shift.

It tells Job to pay close attention to what comes next.

"Correcteth" means disciplined or trained.

Think of a parent correcting a child out of love, not cruelty.

Eliphaz wants Job to hear his suffering as discipline rather than random disaster.

He applies this idea to Job without knowing the real cause of his pain.

👀 Behold signals a shift in the speech

🩺 Correcteth means loving discipline, not cruelty

🎯 Eliphaz aims this directly at Job

📖 He applies it without knowing the real cause

## 🙅 Therefore Despise Not Thou The Chastening Of The Almighty

"Despise" means to reject or look down on something with contempt.

"Chastening" is closely related to correction.

It describes discipline meant to teach, not to destroy.

Eliphaz is urging Job not to resent what he believes is loving discipline.

The advice would be good counsel for someone who actually needed correcting.

The book will later show Job's suffering was never punishment for sin.

🙅 Despise means to reject with contempt

🎓 Chastening means discipline meant to teach

🙏 Eliphaz urges Job not to resent it

📖 Job was never being punished for sin

## 🤕 For He Maketh Sore, And Bindeth Up: He Woundeth, And His Hands Make Whole

"Maketh sore" means to wound or cause pain.

"Bindeth up" means to bandage and heal that same wound afterward.

Eliphaz pictures the same hand that hurts also being the hand that restores.

"Woundeth" and "make whole" repeat this same idea a second time.

Hebrew poetry often repeats one thought twice for emphasis.

Eliphaz uses that pattern here.

🤕 Maketh sore means to wound

🩹 Bindeth up means to bandage and heal

🔁 The same hand hurts and restores

📖 Hebrew poetry repeats the thought for emphasis

## 🔢 He Shall Deliver Thee In Six Troubles: Yea, In Seven There Shall No Evil Touch Thee

This numeric pattern, naming one number then the next, is common in Hebrew poetry.

"Six troubles, yea in seven" does not mean exactly six or seven specific disasters.

It means no matter how many troubles come.

Seven often carries the idea of completeness in scripture.

Eliphaz is promising Job total protection.

He offers it if Job accepts correction the way Eliphaz describes.

🔢 One number then the next is Hebrew style

♾️ It means however many troubles come

💯 Seven often pictures completeness

📖 Eliphaz promises Job total protection

## 💰 In Famine He Shall Redeem Thee From Death: And In War From The Power Of The Sword

"Redeem" means to rescue or buy back.

It is often used for saving someone from real danger.

Eliphaz lists two of the worst threats a family could face.

Those threats are starvation and violent war.

He promises Job that faithful discipline leads to rescue from both.

Job's own story will later complicate the idea that suffering has such a clean exit.

💰 Redeem means to rescue or buy back

🍞 Famine and war name two major threats

✅ Eliphaz promises rescue from both

📖 Job's story complicates such a clean promise

## 🩸 Thou Shalt Be Hid From The Scourge Of The Tongue

"Scourge" was originally a whip used to inflict punishment.

"Scourge of the tongue" is an idiom for cruel words and slander.

It describes words that wound like a physical blow.

Eliphaz promises Job protection even from the pain other people cause.

There is a bitter irony here.

Eliphaz's own words are about to become exactly that kind of wound.

🩸 Scourge originally meant a punishing whip

🗣️ Scourge of the tongue means cruel words

😢 Eliphaz promises protection from this pain

📖 His own words will soon wound Job

# Job 5:22-27
# 🌾 A Full Age Like A Shock Of Corn
---
## 😄 At Destruction And Famine Thou Shalt Laugh

"Laugh" here does not mean finding disaster funny.

It pictures a confidence so complete that even devastating threats lose their power to frighten.

Eliphaz promises Job a kind of fearlessness in the face of ruin and starvation.

This is the emotional peak of Eliphaz's promise.

It is total security rather than mere survival.

The beauty of this promise is exactly why it will sting once it fails to match Job's life.

😄 Laugh means fearless confidence, not humor

💥 Destruction and famine lose their power to frighten

🏔️ This is the peak of Eliphaz's promise

📖 The beauty makes its failure sting more

## 🐺 Neither Shalt Thou Be Afraid Of The Beasts Of The Earth

Wild animals were a genuine daily danger in this world.

They were not a distant fear.

Shepherds and farmers regularly lost livestock, and sometimes their own safety, to predators.

Eliphaz promises Job freedom from this constant, practical worry as well.

The promise widens from disasters like famine to everyday dangers of ordinary life.

Nothing, in Eliphaz's picture, is left for Job to fear.

🐺 Wild animals were a real daily danger

🐑 Shepherds regularly lost livestock to predators

🕊️ Eliphaz promises freedom from this worry too

📖 Nothing is left for Job to fear

## 🤝 Thou Shalt Be In League With The Stones Of The Field

This does not describe stones as living things Job could speak with.

"In league with" means in agreement or alliance.

Stony ground could ruin a harvest, breaking plows and choking out crops.

Eliphaz pictures even the land itself cooperating with a righteous farmer.

It is a poetic way of promising total harmony with the natural world.

🤝 In league with means in alliance

🪨 Stony ground could ruin a harvest

🌾 Eliphaz pictures the land cooperating instead

📖 It promises total harmony with nature

## 🦁 And The Beasts Of The Field Shall Be At Peace With Thee

Eliphaz extends the same promise from stones to wild animals.

Earlier he promised Job would not fear beasts.

Now he promises those beasts would actually be at peace with him.

This echoes a picture of creation living in harmony.

It resembles the peace described in the garden of Eden.

The promise reaches beyond mere safety into full reconciliation with the created world.

🦁 The promise moves from fear to peace

🌿 It echoes harmony like the garden of Eden

🌍 Reconciliation, not just safety

📖 One of Eliphaz's most sweeping promises

## ⛺ Thy Tabernacle Shall Be In Peace

This "tabernacle" does not refer to the wilderness Tabernacle built later for worship.

Here it simply means a tent or dwelling.

It is an ordinary word for someone's home.

"Thou shalt visit thy habitation" pictures Job checking on his household and finding everything secure.

"Shalt not sin" likely means he will find nothing missing or out of place.

It is not a promise about moral perfection.

⛺ Tabernacle here simply means a tent or home

🏠 Visiting his habitation means checking on his household

✅ Shalt not sin likely means nothing amiss

📖 Home peace is the promised reward

## 🌱 Thy Seed Shall Be Great, And Thine Offspring As The Grass Of The Earth

"Seed" and "offspring" both mean children and descendants.

"As the grass of the earth" pictures something spreading widely without limit.

In this culture, a large family meant lasting security and honor for a household.

Eliphaz promises Job not just comfort but a legacy that continues long after he is gone.

This promise carries painful weight.

Job has already lost all ten of his children.

🌱 Seed and offspring both mean descendants

🌾 Grass of the earth pictures wide multiplying

👨‍👩‍👧‍👦 A large family meant lasting honor here

📖 It wounds a father who lost ten children

## 🌅 Thou Shalt Come To Thy Grave In A Full Age, Like As A Shock Of Corn Cometh In In His Season

A "shock of corn" is a bundle of ripe grain gathered and stacked at the right time.

It is not cut too early, and it is not left to rot in the field.

"Full age" means dying old, after a long and complete life.

It is not a sudden or early death.

Eliphaz compares this ideal death to a harvest gathered in right on schedule, at its peak.

The picture is meant to feel peaceful, the natural end of a long life.

🌾 A shock of corn is ripe, gathered grain

⏳ Full age means dying old and complete

🌅 Death compared to a harvest on schedule

📖 The picture is meant to feel peaceful

## 🔍 Lo This, We Have Searched It, So It Is

Eliphaz closes his entire speech with total confidence in his own wisdom.

"We have searched it" claims this teaching has been carefully tested.

It was not just guessed at.

Everything Eliphaz has said so far sounds wise and even kind on its surface.

The rest of the book will show his tidy theory does not explain what happened to Job.

🔍 We have searched it claims careful testing

🙌 Eliphaz closes with full confidence

🧪 He presents his theory as tested fact

📖 The book will show his theory falls short

## 🎁 Hear It, And Know Thou It For Thy Good

Eliphaz ends with a final, gentle sounding command.

He urges Job to accept his whole theory, calling it "for thy good."

The phrase makes the advice sound like a caring gift, not an accusation.

That gentle tone is exactly what will make it so hard for Job to simply dismiss.

Three more friends still have speeches left, and Job still has to answer every one of them.

🎁 He frames the advice as for Job's good

😊 The gentle tone hides the accusation underneath

🗣️ Job still must answer this whole speech

📖 A caring tone does not make advice correct
`.trim();

export const JOB_FIVE_PERSONAL_SECTIONS = parseJobFiveRawNotes(JOB_FIVE_RAW_NOTES);
