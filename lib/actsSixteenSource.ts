export type ActsSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsSixteenRawNotes(rawText: string): ActsSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 16:${startVerse}` : `Acts 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 16 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_SIXTEEN_RAW_NOTES = `# Acts 16:1-5
# 🤝 Timothy Joins The Mission
---
## 🛤️ To Derbe And Lystra

Derbe and Lystra were small cities in Galatia.

Paul had already preached in both cities once before.

Lystra was the city where he was stoned and left for dead.

Acts chapter fourteen already told that story.

He is walking straight back into the place that nearly killed him.

🛤️ Derbe and Lystra sit in Galatia

⚠️ Lystra once left Paul stoned and dying

🔁 He walks back into that same city

📖 The gospel moved forward despite real danger

## 👦 A Certain Disciple Named Timotheus

Timotheus is the Greek form of the name we know as Timothy.

He was already a believer when Paul arrived, a disciple before this meeting.

Paul did not convert him here, he recruited him.

This chapter marks the start of one of the closest partnerships in the New Testament.

👦 Timotheus is the Greek form of Timothy

✅ He was already a believer

🤝 Paul recruited him, did not convert him

📖 A key partnership begins here

## 🕎 The Son Of A Certain Woman, Which Was A Jewess

Jewish identity passed down through the mother, not the father, under Jewish law.

Timothy's mother was Jewish, so the Jewish community considered him Jewish by birth.

His father was Greek, which is why he was never circumcised as a baby.

That unfinished detail is about to matter a great deal.

🕎 Jewish identity passed through the mother

👩 Timothy's mother made him Jewish by birth

👨 His Greek father meant no infant circumcision

➡️ That detail becomes important very soon

## 👂 Well Reported Of By The Brethren

Timothy's reputation was not just local, it reached two different cities.

Lystra and Iconium were both close enough that word traveled easily.

A good name earned real trust before anyone handed over ministry responsibility.

Paul takes this reputation seriously before choosing a new partner.

👂 Timothy's reputation reached two cities

🏙️ Lystra and Iconium both knew him

⭐ A good name earned real trust

➡️ Paul chose his partner carefully

## ✂️ Took And Circumcised Him

Circumcision marked a man as fully Jewish under the law of Moses.

Paul was not changing his gospel by doing this.

Just one chapter earlier, in Acts fifteen, Paul argued hard that Gentiles never need circumcision to be saved.

Timothy was different, he already counted as Jewish through his mother.

This was never about earning salvation.

It was about removing an unnecessary obstacle to reaching Jewish listeners.

✂️ Circumcision marked a man as Jewish

🚫 Paul was not changing his gospel

👩 Timothy already counted as Jewish through his mother

📖 Removing an obstacle, not earning salvation

## 👳 Because Of The Jews Which Were In Those Quarters

Jewish communities lived throughout that whole region.

An uncircumcised helper with a Jewish mother would have raised constant suspicion.

Paul needed Timothy to enter any synagogue without starting an argument first.

This was a practical decision, not a doctrinal one.

👳 Jewish communities filled that whole region

🤨 An uncircumcised helper raised suspicion

🚪 Timothy needed access into every synagogue

➡️ A practical choice, not a doctrine change

## 📜 They Delivered Them The Decrees

These decrees were the official ruling from the Jerusalem council.

Acts fifteen already explained what they required.

Gentile believers did not need circumcision.

They were only asked to avoid a short list of practices tied to pagan worship.

Paul and his team carried that letter from city to city.

It kept the churches united instead of splitting along ethnic lines.

📜 The decrees came from the Jerusalem council

🚫 Circumcision was never required for Gentiles

🧭 A short list of practices was asked instead

📖 One letter kept many churches united

## 📈 Increased In Number Daily

The churches were not just surviving, they were growing every single day.

Stability and growth go together in this verse.

A clear decision from Jerusalem removed a source of constant conflict.

Peace inside the church made room for the gospel to spread faster.

📈 Churches grew every single day

🕊️ Stability and growth arrived together

🤝 Jerusalem's decision removed constant conflict

➡️ Peace inside the church helped the gospel spread

# Acts 16:6-10
# 🌙 A Call To Macedonia
---
## 🗺️ Phrygia And The Region Of Galatia

Phrygia and Galatia were regions in the interior of what is now Turkey.

Paul had already planted churches in parts of this area on his first journey.

This leg of the trip was revisiting and strengthening work already begun.

Nothing about this journey was random, it followed real roads between real cities.

🗺️ Phrygia and Galatia sit in modern Turkey

🔁 Paul had already worked in this area

🌱 This trip strengthened existing churches

📖 Every step followed a real, planned route

## 🗺️ Forbidden Of The Holy Ghost To Preach The Word In Asia

Asia here means a Roman province, not the whole continent.

It covered the western coast of modern Turkey.

Ephesus sat inside that province and would later become a major ministry for Paul.

Here the Holy Ghost actively closes that door for now.

God's guidance can say not yet just as clearly as it can say go.

🗺️ Asia meant a Roman province, not a continent

🏙️ Ephesus sat inside that same province

🚫 The Spirit closed this door for now

📖 God's guidance can say not yet, too

## 🧭 Assayed To Go Into Bithynia

"Assayed" is an old word that means tried or attempted.

Paul's team had a plan, and that plan kept getting blocked.

Bithynia was another region along the coast, further north than where they ended up.

Closed doors were not failure, they were direction.

🧭 Assayed means tried or attempted

🚧 Their plan kept hitting closed doors

🗺️ Bithynia sat further north on their route

➡️ A closed door can still be guidance

## 🛑 The Spirit Suffered Them Not

"Suffered" here is an old word meaning allowed or permitted.

This is the second time in two verses the Spirit blocks their plan.

Twice in a row is not a coincidence, it is a pattern worth noticing.

God was steering them toward something they could not yet see.

🛑 Suffered here means allowed or permitted

🔁 This is the second block in a row

🧩 A repeated pattern is not a coincidence

📖 God was steering them somewhere unseen

## ⛵ Came Down To Troas

Troas was a port city on the northwest coast of modern Turkey.

It sat right across the water from Macedonia, in Greece.

Every closed door so far had pushed them toward this exact coastline.

They were now standing at the edge of Asia with nowhere left to go but across the water.

⛵ Troas sat on the northwest coast

🌊 Greece lay just across the water

🧭 Every closed door led to this coastline

➡️ They stood at the very edge of Asia

## 🌙 A Vision Appeared To Paul In The Night

This was not a dream Paul talked himself into.

Luke records it plainly as a vision, a real message from God.

Paul had already seen how God once used a vision to direct Ananias toward him in Acts chapter nine.

God still speaks through unexpected moments, even in the middle of the night.

🌙 Luke records this as a real vision

📣 Not a dream Paul invented himself

🔁 God used visions earlier in this book

📖 God still speaks in unexpected moments

## 👤 A Man Of Macedonia

Macedonia was a region in what is now northern Greece.

The gospel had already crossed from the Middle East into Asia.

This vision was about to push it into Europe for the first time.

One stranger in a dream was the hinge for that whole shift.

👤 Macedonia sat in what is now Greece

🌍 The gospel was about to reach Europe

🚪 One dream opened a whole new continent

📖 One stranger became a hinge for a continent

## 🙏 Come Over Into Macedonia, And Help Us

The plea in the vision is simple and direct.

It does not ask for a sermon on a schedule, it asks for help.

This is the same gospel urgency that drove Paul from the very beginning.

A real need became God's clearest signal yet.

🙏 The plea was simple, come and help

🧭 It was not a request for theory

🔥 This matched Paul's whole sense of urgency

📖 A real need became God's clearest signal

## ✅ Immediately We Endeavoured To Go Into Macedonia

Up to now, Luke the writer described Paul and his companions from the outside, as they.

Starting here, Luke himself appears to have joined the group in Troas.

He was not just recording history anymore, he was living inside it.

✅ The word we appears for the first time

📖 Luke had only written they before this

🤝 Luke himself joined the group at Troas

➡️ The writer now lived inside his own story

# Acts 16:11-15
# 💜 Lydia Opens Her Heart
---
## ⛵ Loosing From Troas

"Loosing" is an old sailing word for untying the ropes and setting sail.

The team did not wander toward Macedonia, they sailed there directly.

A straight course meant good winds and a short, uneventful crossing.

Sometimes obedience moved fast once the path was clear.

⛵ Loosing means setting sail

🧭 They sailed straight toward Macedonia

🌬️ Good winds made the crossing short

📖 Obedience moved fast once the path was clear

## 🏛️ The Chief City Of That Part Of Macedonia, And A Colony

A Roman colony was a city planted with retired Roman soldiers and full Roman law.

Philippi's people were proud of being Roman, not just living under Rome.

That pride is about to matter later in this very chapter.

This city lived strictly by Roman rules.

🏛️ A colony meant retired soldiers and Roman law

🦅 Philippi's people were proud to be Roman

⚖️ That pride returns later in this chapter

📖 This city lived strictly by Roman rules

## 🌊 By A River Side, Where Prayer Was Wont To Be Made

"Wont" is an old word for accustomed or used to.

Philippi apparently had no synagogue, since Jewish communities there were too small.

A river side spot became the substitute gathering place for prayer.

Paul looked for God's people exactly where they already were.

🌊 Wont means accustomed or used to

🕎 Philippi likely had no synagogue

📿 The riverside became a prayer gathering place

➡️ Paul found God's people right where they were

## 👩 Spake Unto The Women Which Resorted Thither

Only women are mentioned meeting at this riverside spot.

That detail quietly tells us how small Philippi's Jewish community really was.

A full synagogue needed at least ten Jewish men to even form.

God still used this small, overlooked gathering to start a church.

👩 Only women are named at this gathering

🔢 Ten Jewish men were needed for a synagogue

🤏 Philippi's Jewish community was clearly small

📖 God built a church from a small gathering

## 🟣 A Seller Of Purple

Purple dye was one of the most expensive products in the ancient world.

It took thousands of tiny sea snails to produce a small amount of color.

Selling it meant Lydia was a successful businesswoman with real financial independence.

She likely ran her own household, since Paul and his team stayed at her house later.

🟣 Purple dye was extremely expensive

🐌 Thousands of sea snails made one batch

💼 Lydia ran a successful business

📖 She likely headed her own household

## 🏙️ Of The City Of Thyatira

Thyatira sat across the water in Asia, in modern Turkey.

It was already known for its dye and textile trade.

Lydia had carried her trade far from home to find new customers.

Her business had already crossed the very sea Paul had just crossed.

🏙️ Thyatira sat across the water in Asia

🧵 The city was known for dye and textiles

💰 Lydia carried her trade far from home

➡️ Her journey crossed the same sea Paul did

## 🙏 Which Worshipped God

This phrase marks Lydia as a Gentile who already believed in the one true God.

She had not yet become a full Jewish convert.

She was no longer worshipping pagan gods either.

People like her were common across the Roman world.

They were often the easiest to reach with the gospel.

🙏 Lydia already believed in the one true God

🚪 She stood between paganism and full conversion

🌍 Seekers like her were common across Rome

📖 They were often the easiest to reach

## ❤️ Whose Heart The Lord Opened

Lydia did not talk herself into faith through clever argument.

The text says plainly that God opened her heart first.

Paul's words still mattered, but they were not what made the difference alone.

God reaches in before people reason it out.

❤️ God opened her heart first

🗣️ Paul's words still mattered

🚫 Clever argument was not what saved her

📖 God reaches in before people reason it out

## 🏠 Come Into My House, And Abide There

Lydia does not just believe, she immediately offers hospitality.

Hosting traveling teachers was a real risk and a real cost in that culture.

"She constrained us" means she would not let them say no easily.

New faith here shows up first as generosity, not as a private feeling.

🏠 Lydia offered her home right away

💰 Hosting travelers carried real risk and cost

🙅 She would not let them refuse

📖 Faith showed up first as generosity

# Acts 16:16-18
# 🔮 The Girl With A Spirit Of Divination
---
## 🔮 A Spirit Of Divination

The Greek text literally calls this a python spirit.

That name recalls the Oracle at Delphi, tied to a mythical serpent in Greek legend.

This girl was believed to channel that same kind of spiritual power for a price.

Her gift was not a trick, it was real influence from a demon.

🔮 The Greek text calls this a python spirit

🏛️ That name recalls the Oracle at Delphi

💰 People paid to hear what she spoke

📖 This was real influence from a demon

## 💰 Brought Her Masters Much Gain By Soothsaying

This girl was enslaved, owned by men who profited from her condition.

"Soothsaying" means telling fortunes or predicting the future for payment.

Her captors had no interest in her freedom, only in her usefulness.

This detail quietly exposes the cruelty hiding behind a seemingly spiritual gift.

💰 Her masters profited from her condition

🔮 Soothsaying means fortune telling for payment

⛓️ She was enslaved, not free

📖 Cruelty hid behind a spiritual gift

## 📣 These Men Are The Servants Of The Most High God

Everything this girl shouts about Paul and his team is actually true.

True words from a demonic source are still a trap, not a help.

Jesus faced the same kind of confession from demons during his own ministry, recorded in the Gospels.

Truth spoken for the wrong reason can still do damage.

📣 Her words about Paul were true

⚠️ A true statement can still be a trap

🔁 Demons made similar confessions in the Gospels

📖 Wrong motives can corrupt even true words

## 📆 This Did She Many Days

Paul does not react right away, even though the shouting continues.

Patience here is not weakness, it is discernment taking its time.

Stopping something false too quickly can sometimes do more harm than good.

Paul waits for the right moment, not just the first chance.

📆 Paul did not react right away

🧠 Patience here meant discernment, not weakness

⏳ Timing mattered more than speed

➡️ He waited for the right moment

## 😣 Paul, Being Grieved

"Grieved" describes real distress, not simple annoyance at the noise.

Paul was troubled by a demon using half truths to attach itself to his ministry.

A demonic endorsement could easily confuse anyone watching from the outside.

Compassion for the girl likely sat underneath that distress too.

😣 Grieved means real distress, not annoyance

🎭 A demon was mixing truth with deception

❓ Onlookers could easily grow confused

➡️ Compassion for the girl likely sat underneath

## ⚡ I Command Thee In The Name Of Jesus Christ

Paul does not perform a long ritual or chant.

He speaks with direct authority, tied entirely to the name of Jesus.

This is the same authority Jesus gave his followers back in the Gospels.

Power here came from who Paul represented, not from Paul himself.

⚡ Paul used direct, simple authority

✝️ Everything rested on the name of Jesus

🔁 Jesus had already given this same authority

📖 The power was Christ's, not Paul's own

## ✅ He Came Out The Same Hour

There is no delay and no struggle described here at all.

The spirit left the instant Paul gave the command.

Freedom for this girl came suddenly, after what may have been years of exploitation.

This immediate result is about to cost Paul and Silas dearly.

✅ The spirit left instantly

⏱️ No struggle is described here

🕊️ Years of exploitation ended in one moment

➡️ This miracle leads straight into real trouble

# Acts 16:19-24
# ⛓️ Paul And Silas Beaten And Jailed
---
## 💰 The Hope Of Their Gains Was Gone

The real motive behind this whole uproar finally comes into the open.

This was never about religion or law, it was about lost income.

Freedom for the girl meant an empty income stream for her masters.

Money, not theology, drove this accusation.

💰 Lost income was the real motive

🚫 This was never truly about religion

📉 Her freedom meant their income vanished

📖 Money, not theology, drove this accusation

## 🏛️ Drew Them Into The Marketplace Unto The Rulers

The marketplace, or agora, was the public center of any Roman city.

Legal and business matters were handled right out in the open there.

Dragging Paul and Silas there guaranteed a large, watching crowd.

This was meant to be a public spectacle from the very first step.

🏛️ The agora was the public city center

⚖️ Legal matters were handled right there

👀 A large crowd was guaranteed to watch

➡️ This was built to be a spectacle

## 🕎 These Men, Being Jews

The accusers do not mention the real issue, the lost income, at all.

Instead they lead with Paul and Silas being Jews, a vulnerable identity in Roman eyes.

Jewish communities already faced suspicion and occasional expulsion across the empire.

This accusation was designed to trigger prejudice, not to prove any actual crime.

🕎 Their real motive goes unmentioned here

⚠️ Being Jewish already carried suspicion in Rome

🚫 No actual crime is named yet

📖 Prejudice was the real weapon used here

## ⚖️ Teach Customs, Which Are Not Lawful For Us, Being Romans

Philippi's citizens were proud of their official Roman status.

Rome generally tolerated local religions but was wary of anything that looked disruptive to public order.

Calling Paul's message an unlawful foreign custom played directly into that civic pride.

The real issue was money, but the charge wore a patriotic disguise.

⚖️ Philippi took its Roman status seriously

🚫 Rome was wary of disruptive new customs

🎭 A money dispute wore a patriotic disguise

📖 Civic pride became a convenient weapon

## 👕 The Magistrates Rent Off Their Clothes

Tearing a prisoner's clothes in public was a deliberate act of humiliation.

It stripped away dignity before a single blow was even struck.

This step happened in front of the whole watching crowd from verse twenty two.

Shame was the point, every bit as much as the pain that followed.

👕 Torn clothes meant public humiliation

😔 Dignity was stripped before any blow landed

👀 The whole crowd watched this happen

📖 Shame mattered as much as pain here

## 🪵 Commanded To Beat Them

Roman beatings with rods were carried out by officials called lictors.

This is different from the Jewish whip punishment Paul describes elsewhere in his letters.

Paul later lists this exact beating among his sufferings in Second Corinthians.

His body carried the cost of this moment for the rest of his life.

🪵 Roman rods were used, not whips

📜 Paul later names this in Second Corinthians

🤕 His body carried lasting scars

➡️ This suffering followed him for life

## 🔒 Charging The Jailor To Keep Them Safely

Roman law held a jailer personally responsible for every prisoner in his care.

Losing a prisoner, even by escape, could cost the jailer his own life.

This single instruction quietly sets up everything that happens later that same night.

A stranger's job was about to become a matter of life and death.

🔒 Jailers were personally responsible for prisoners

⚠️ Escape could cost the jailer his life

🌙 This sets up the night ahead

➡️ One man's job becomes life or death

## 🦶 Made Their Feet Fast In The Stocks

Stocks were wooden frames that locked around a prisoner's ankles.

Some versions of this device could force the legs wide apart, adding real pain beyond simple restraint.

Paul and Silas were not just locked up, they were deliberately made to hurt.

What happens next in this cell is about to be remarkable.

🦶 Stocks locked around the ankles

😖 Some versions forced the legs apart

🤕 This added pain beyond simple restraint

➡️ What happens next is remarkable

# Acts 16:25-29
# 🎵 Midnight Praise And A Great Earthquake
---
## 🎵 At Midnight Paul And Silas Prayed, And Sang Praises

Their backs were freshly beaten and their feet were locked in stocks.

Instead of complaining, they chose prayer and singing in the middle of the night.

Worship here was not a performance, it was a real response of trust.

Pain did not get the final word over their faith.

🎵 They sang despite fresh, real wounds

🙏 Worship became their honest response

🌙 This happened in the middle of the night

📖 Pain did not get the final word

## 👂 The Prisoners Heard Them

Every other prisoner in that jail was awake and listening too.

This was not a private moment hidden from view.

Two beaten men singing at midnight became an unexpected sermon for everyone nearby.

Sometimes the clearest testimony is simply how a person suffers.

👂 Every prisoner nearby was listening

👀 This was not hidden or private

📣 Their singing became an unexpected sermon

➡️ How a person suffers can testify loudly

## 🌍 A Great Earthquake

Earthquakes were not unheard of in that region of the ancient world.

What makes this one remarkable is its exact timing, not its existence.

It struck the very moment two innocent, praying men needed rescue.

Perfect timing turned an ordinary event into an unmistakable act of God.

🌍 Earthquakes were not unusual in that region

⏱️ The timing is what made this one remarkable

🙏 It struck right when they needed rescue

📖 Perfect timing turned nature into a sign

## 🔓 Every One's Bands Were Loosed

This miracle was not limited to just Paul and Silas.

Every prisoner in that building suddenly found themselves unchained.

That detail matters, because it sets up a serious temptation a moment later.

Freedom for everyone made the next choice about staying far more costly.

🔓 Every prisoner was freed, not just two

🧩 This detail sets up what follows

⚠️ Freedom for all raised the stakes

➡️ Staying put would be the real test

## ⚔️ He Drew Out His Sword, And Would Have Killed Himself

Roman law could require a guard's own life as payment for a lost prisoner.

Suicide looked like the more honorable option compared to facing that punishment.

The jailer assumed every single prisoner, Paul and Silas included, had already escaped.

Despair outran the actual facts of the situation.

⚔️ Roman law could demand a guard's life

🎖️ Suicide seemed more honorable than that penalty

😰 He assumed every prisoner was already gone

📖 Despair outran the actual facts here

## 🗣️ Do Thyself No Harm, For We Are All Here

Paul stops the jailer before he can finish the act.

Nobody in that cell had actually tried to escape.

Freedom was available to all of them, and every single one stayed anyway.

Paul's shout saves a man who, hours earlier, had locked him in pain.

🗣️ Paul stopped him before it was too late

🚪 Nobody had actually tried to escape

🤝 Freedom was available, yet all of them stayed

➡️ Paul saved the very man who hurt him

## 😨 Came Trembling, And Fell Down Before Paul And Silas

The jailer's fear has completely shifted direction by this point.

Minutes earlier he feared Roman punishment, now he fears something far bigger.

Falling down was a posture of worship, not simple politeness.

He recognized that something beyond an earthquake had just happened in that cell.

😨 His fear had completely shifted direction

🏛️ He once feared only Roman punishment

🙇 Falling down showed real worship, not manners

📖 He sensed something beyond the earthquake itself

# Acts 16:30-34
# 💧 The Jailer Believes
---
## ❓ Sirs, What Must I Do To Be Saved?

This question comes from genuine terror, not polite curiosity.

"Saved" here reaches far beyond just surviving the night's events.

The jailer senses he is facing something eternal, not merely legal trouble.

Fear had cracked him open to the one question that actually mattered.

❓ This question came from real terror

♾️ Saved here means far more than survival

🌙 He sensed something eternal, not just legal trouble

📖 Fear opened him to the right question

## ✝️ Believe On The Lord Jesus Christ, And Thou Shalt Be Saved

Paul does not hand the jailer a list of religious tasks.

The answer is simple, trust Jesus Christ with your life.

"And thy house" does not mean the jailer's faith automatically saves his family.

Verse thirty two shows the whole household hearing and choosing the same message for themselves.

✝️ The answer was simple, trust Jesus

🚫 No long list of tasks was given

👪 His house still needed to hear it themselves

📖 Verse thirty two confirms everyone heard the message

## 📖 Spake Unto Him The Word Of The Lord, And To All That Were In His House

This verse quietly clears up the household promise from just before it.

Everyone in that home received the actual message, not a secondhand blessing.

Servants, children, anyone living under that roof, all heard the gospel directly.

Faith in scripture is personal, even inside a shared household decision.

📖 This clears up the household promise

🗣️ Everyone heard the real message directly

👪 Servants and family were included equally

➡️ Faith stayed personal, even in a shared home

## 🩹 Washed Their Stripes

Hours earlier, this same man had locked their feet into stocks.

Now he personally tends the wounds his own prison caused.

This was not just a kind gesture, it was repentance you could see in his hands.

Belief changed what this man was willing to do with his own hands.

🩹 He now tended the wounds he caused

🔄 His role completely reversed overnight

🙏 This was repentance, not simple kindness

➡️ Belief changed what his hands would do

## 💧 Was Baptized, He And All His, Straightway

"Straightway" is an old word meaning immediately, without delay.

There was no waiting period and no lengthy class before this baptism.

The jailer's whole household followed him into this same decision.

Belief led to action the same night it began.

💧 Straightway means immediately, without delay

⏱️ No waiting period came before this

👪 His whole household followed his decision

📖 Belief turned into action that same night

## 🍽️ He Set Meat Before Them

A shared meal in that culture signaled real trust between people.

The man who once threw them into chains now feeds them at his own table.

Hospitality here replaced hostility completely, in a single night.

Grace rewrote an entire relationship before the sun even came up.

🍽️ A shared meal signaled real trust

🔄 Hostility turned into hospitality overnight

🏠 He welcomed them to his own table

📖 Grace rewrote the relationship before sunrise

## 😊 Rejoiced, Believing In God With All His House

Joy, not relief, is the word Luke chooses to describe this household.

Their fear from the earthquake had completely given way to real celebration.

This family began the night as a jailer's household and ended it as believers.

One terrifying night became the start of a whole family's faith.

😊 Joy, not relief, is the word used

🔄 Fear gave way to real celebration

👪 A jailer's household became a believing one

📖 One night started a whole family's faith

# Acts 16:35-40
# 🚪 Set Free As Roman Citizens
---
## 🏛️ The Magistrates Sent The Serjeants

"Serjeants" refers to lictors, Roman officers who carried bundles of rods as a symbol of authority.

These were the same kind of officials who likely carried out the beating the day before.

Sending them again shows this release was still an official, formal act.

The same hands that punished them now carried the order to let them go.

🏛️ Serjeants were Roman officers called lictors

🪵 They likely carried out the beating too

📜 Their return kept this release official

➡️ The same hands that punished now freed them

## 🕊️ Let Those Men Go... Depart, And Go In Peace

The magistrates hoped this would quietly end the whole incident.

No apology and no explanation comes along with this release.

They wanted Paul and Silas gone before anyone asked harder questions.

A quiet exit would have let real wrongdoing disappear unnoticed.

🕊️ They hoped this would quietly end things

🙅 No apology came with this release

🤫 They wanted them gone before questions grew

➡️ A quiet exit would hide real wrongdoing

## 📛 Beaten Us Openly Uncondemned, Being Romans

Roman citizens had strong legal protection against public beating without a trial.

Paul finally reveals a fact he had not mentioned at his arrest.

Punishing a Roman citizen without due process was a serious legal violation.

This single fact turns Paul from criminal to victim in Roman eyes.

📛 Roman citizens were protected from this

📣 Paul had not mentioned this fact before

⚖️ Skipping a trial was a real violation

📖 This fact flipped Paul from criminal to victim

## 🤫 Now Do They Thrust Us Out Privily? Nay Verily

"Privily" is an old word meaning secretly or quietly.

"Nay verily" is an old, strong way of saying absolutely not.

Paul refuses to slip away like someone with something to hide.

A quiet exit would have left the young church's reputation hanging in the air unresolved.

🤫 Privily means secretly or quietly

🙅 Nay verily is an old, strong no

🚪 Paul refused to slip away quietly

📖 The church's reputation was worth defending openly

## 📣 Let Them Come Themselves And Fetch Us Out

Paul demands a public correction, not a private favor.

He wants the same magistrates who condemned them to personally walk them out.

A public release would clear Paul's name in front of the same crowd that watched the beating.

This protected the new believers in Philippi from being linked to a criminal.

📣 Paul demanded a public correction

🏛️ The same magistrates had to walk them out

👀 The same crowd needed to see this

➡️ This protected the new believers in Philippi

## 😰 They Feared, When They Heard That They Were Romans

Roman officials who mistreated a citizen without trial risked serious punishment themselves.

A career, or even a life, could end over an error like this one.

The magistrates' confidence from verse twenty two completely collapses here.

Power that looked absolute suddenly looks very fragile.

😰 Officials risked real punishment for this mistake

💼 A career could end over this error

🔄 Their earlier confidence completely collapsed

📖 Power that looked absolute proved fragile

## 🚪 Desired Them To Depart Out Of The City

The magistrates still want Paul and Silas gone, just now politely.

Fear replaced the earlier anger, but the goal stayed exactly the same.

Paul got his public vindication, then still chose to leave peacefully.

Standing up for truth did not require staying to prove a point further.

🚪 They still wanted them gone, now politely

🔄 Fear replaced anger, the goal stayed the same

✅ Paul got his vindication, then left peacefully

➡️ Truth did not require staying to prove more

## 🏠 Entered Into The House Of Lydia

This story closes exactly where the Philippi chapter began, at Lydia's house.

Paul and Silas go straight to encourage the believers before leaving town.

Lydia's home had already become the first gathering place for this new church.

One jailer's household and one businesswoman's household now shared the same faith.

🏠 The story returns to Lydia's house

🔁 This closes the loop from verse fifteen

⛪ Her home was this church's first gathering place

📖 Two households now shared one faith

## 💪 Comforted Them, And Departed

Paul and Silas take time to encourage the church before moving on.

Their own backs were still healing from the beating two nights before.

They comfort others before tending to their own pain.

This chapter that began with a vision of Macedonia ends with a church already standing strong there.

💪 They encouraged others while still healing

❤️ Comfort came before their own rest

⛪ A church now stood strong in Macedonia

📖 One vision became one lasting church
`.trim();

export const ACTS_SIXTEEN_PERSONAL_SECTIONS = parseActsSixteenRawNotes(ACTS_SIXTEEN_RAW_NOTES);
