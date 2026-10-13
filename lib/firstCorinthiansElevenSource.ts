export type FirstCorinthiansElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansElevenRawNotes(rawText: string): FirstCorinthiansElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 11:${startVerse}` : `1 Corinthians 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 First Corinthians 11 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_ELEVEN_RAW_NOTES = `# FirstCorinthians 11:1-2
# 👣 Followers Of Christ
---
## 👣 Be Ye Followers Of Me, Even As I Also Am Of Christ

Paul tells the Corinthians to copy his example.

He limits that command with one condition.

Follow me only as far as I follow Christ.

Paul never asks for loyalty to himself alone.

Chapter ten already modeled what following Christ looks like.

Paul gave up his own rights there for the good of others.

That same giving up of self is what he wants copied here.

👣 Followers means copy this example

✝️ The example works only through Christ

🚫 Not loyalty to Paul himself

📖 Chapter ten already modeled this pattern

## 📜 Keep The Ordinances, As I Delivered Them To You

"Ordinances" means traditions or instructions passed down with authority behind them.

Paul did not invent these teachings himself.

He received them and passed them on exactly as he got them.

The Corinthians already had a track record of praise here.

They had kept these teachings faithfully up to this point.

Paul is about to correct them on a specific issue.

He opens with genuine praise before any correction begins.

📜 Ordinances means traditions passed with authority

🔁 Paul delivered what he first received

✅ Corinthians kept these faithfully so far

➡️ Praise comes before the coming correction

# FirstCorinthians 11:3-6
# 🧕 Head Coverings Begin
---
## 🔗 The Head Of Every Man Is Christ

"Head" here pictures a source or an authority relationship, not simply a body part.

Paul lays out a chain, Christ over man, man over woman, God over Christ.

This is not a chain of worth or value.

Christ fully submits to God without being less than God.

The chain describes order within relationship, not superiority.

Paul uses this chain to explain the custom he addresses next.

🔗 Head means a source or authority link

⛓️ Christ, man, woman, and God form a chain

⚖️ Order here is not about worth

📖 This chain explains the custom ahead

## 🧕 Every Man Praying Or Prophesying, Having His Head Covered

In this culture, a covered head on a man during worship carried a specific meaning.

It could signal shame or echo a Roman custom tied to pagan worship.

"Prophesying" here means speaking a message from God under the Spirit's guidance.

It does not mean predicting the future.

Paul says a covered head undercut the honor a man's position was meant to carry.

🧕 A covered head carried social meaning here

🛐 It echoed pagan Roman worship customs

🗣️ Prophesying means Spirit guided speech

📖 Paul ties dress to honor in worship

## 😳 Every Woman That Prayeth Or Prophesieth With Her Head Uncovered

An uncovered head on a woman in this culture carried its own strong signal.

Many scholars believe it resembled the look of a woman already shamed or shorn.

Paul compares it directly to being shaved, a mark of public disgrace in that world.

The covering was not about silence or restriction here.

Prophesying, speaking God's message aloud, is assumed as something women in Corinth already did.

😳 Uncovered heads carried a shame signal

✂️ Compared directly to being shaved

🗣️ Women are assumed to prophesy here

📖 The issue is custom, not silence

## ✂️ Let Her Also Be Shorn

Paul uses a blunt comparison to make his point land.

If going uncovered is acceptable, then being shorn should be too.

Shearing a woman's hair in this culture marked public shame or even punishment.

Paul knows no one would actually accept that outcome.

The comparison forces the Corinthians to see the covering as the easier, reasonable choice.

✂️ Shorn means hair cut off as shame

😬 No one would accept that outcome

⚖️ The comparison exposes the real choice

➡️ Covering becomes the obviously better option

# FirstCorinthians 11:7-10
# ✨ Image And Glory
---
## 🖼️ He Is The Image And Glory Of God

Every human being carries God's image, as Genesis one already established.

Paul narrows the focus here to how that image gets displayed in worship.

"Glory" means something that reflects honor back onto its source.

A man's uncovered head in worship was meant to reflect God's honor directly.

🖼️ Every person already carries God's image

✨ Glory means reflecting honor to its source

🙇 A man's bare head reflected God's honor

📖 Paul narrows image language to worship dress

## 🤝 The Woman Is The Glory Of The Man

Paul draws on the creation account in Genesis two here.

Eve was formed from Adam, not the other way around.

That origin story shapes the picture Paul is building about headship.

This is about origin and relationship, not about one gender's worth over the other.

🤝 Draws on Genesis two's creation account

👤 Eve was formed out of Adam

🔗 Origin shapes this relationship picture

➡️ Order, not worth, is the real point

## 💍 Neither Was The Man Created For The Woman

Genesis two also records why Adam was given a companion in the first place.

Man's loneliness was the problem the woman's creation solved.

Paul reads that original purpose back into the current argument.

The order of creation, not the value of either person, drives his point here.

💍 Woman's creation solved Adam's loneliness

📜 Genesis two supplies the original purpose

🔗 Paul reads that order into this argument

➡️ Order again, not unequal value

## 👼 Power On Her Head Because Of The Angels

"Power" here most likely refers to the head covering itself as a symbol of authority.

Many scholars read this as the woman having standing to pray and prophesy under it.

Why angels are mentioned is genuinely debated among scholars today.

One common view is that angels witness worship and expect it done in proper order.

👼 Angels are mentioned as witnesses to worship

❓ Their exact role here is genuinely debated

🧕 Power likely points to the covering itself

📖 The covering marks order, not silence

# FirstCorinthians 11:11-16
# 🌿 Nature Itself Teaches
---
## 🤝 Neither Is The Man Without The Woman

Paul balances the chain he just described with real mutual dependence.

In the Lord, men and women need each other fully.

Every man was born of a woman, no exception.

Paul will not let the earlier order become an excuse for superiority.

🤝 Men and women depend on each other

👶 Every man was born of a woman

🚫 Order never becomes an excuse for superiority

📖 Mutual need balances the earlier chain

## 🌍 But All Things Of God

Paul traces every origin story back to one ultimate source.

Man came from God's hand first.

Woman came through man, and every later man comes through woman.

God stands behind the whole chain, not just one link of it.

🌍 God is the source behind every link

🔁 The chain cycles man, woman, man again

⛓️ No single link stands on its own

📖 God holds the whole chain together

## 👀 Is It Comely That A Woman Pray Unto God Uncovered

"Comely" means fitting or appropriate within that specific culture.

Paul appeals to the Corinthians' own sense of what looked proper.

He is not issuing a brand new command out of nowhere here.

He is asking them to judge their own practice by a standard they already held.

👀 Comely means fitting or proper

🤔 Paul appeals to their own judgment

🚫 Not a brand new command invented here

➡️ He points back to a standard they held

## 💇 If A Man Have Long Hair, It Is A Shame Unto Him

Paul points to an everyday observation nearly anyone in that culture would recognize.

Long hair on a man was widely viewed as improper in Greco Roman society.

"Nature" here means the natural customs widely observed, not a strict biological law.

Paul uses a shared cultural instinct to support his larger point about worship dress.

💇 Long hair on men read as improper

🏛️ A common view across Greco Roman culture

🌿 Nature here means widely observed custom

📖 Shared instinct supports Paul's larger point

## 👩 Her Hair Is Given Her For A Covering

A woman's long hair functioned as a kind of built in covering in this culture.

That natural covering becomes Paul's bridge to the covering he has been discussing.

If nature itself gives women this covering, Paul argues, culture's covering fits that pattern.

The two coverings, natural and worn, work together in his argument.

👩 Long hair functioned as a natural covering

🌉 It bridges to the cloth covering discussed

🧵 Natural and worn coverings match one pattern

📖 Nature itself supports Paul's instruction

## 🚫 We Have No Such Custom, Neither The Churches Of God

Paul closes this section by appealing to common practice across many churches.

If anyone wants to argue the point further, Paul points to universal church practice.

This was not one apostle's personal preference invented on the spot.

Every established church already followed this same custom.

🚫 No competing custom existed elsewhere

🌍 Universal church practice settles the question

🙅 Not one apostle's personal preference

📖 Many churches already shared this custom

# FirstCorinthians 11:17-22
# 😔 Divisions At The Table
---
## 😔 I Praise You Not

Paul's tone shifts sharply away from the praise he opened with in verse two.

Their gatherings were actually making things worse, not better.

Coming together as a church should build people up, not tear them down.

Paul names the problem directly instead of softening it.

😔 Paul's tone shifts from praise to rebuke

📉 Their gatherings made things worse

🏗️ Church gatherings should build people up

➡️ Paul names the problem directly

## ⚔️ There Be Divisions Among You

"Divisions" describes real splits forming inside the church body itself.

Paul already addressed rival loyalty groups back in chapter one.

Those same fractures were apparently still showing up at the shared meal.

Hearing a report, rather than seeing it firsthand, is why Paul says he only "partly" believes it.

⚔️ Divisions means real splits in the church

🔁 Echoes the rival groups from chapter one

🍽️ The fractures showed up at shared meals

📖 Paul responds to a secondhand report

## 🎭 There Must Be Also Heresies Among You

"Heresies" here means factions built around chosen loyalties, not formal doctrine yet.

Paul says something almost surprising, that these divisions actually serve a purpose.

They expose which believers are genuinely tested and approved under pressure.

A crisis often reveals character that calm times leave hidden.

🎭 Heresies means factions built on loyalty

🔍 Divisions expose who is truly tested

💪 Approved believers show up under pressure

📖 Crisis reveals what calm hides

## 🍽️ This Is Not To Eat The Lord's Supper

Early church meals combined a full communal dinner with the symbolic bread and cup.

What the Corinthians were doing no longer resembled that shared meal at all.

Paul says their gathering had stopped being the Lord's supper in anything but name.

Calling something sacred does not make it sacred once the practice is corrupted.

🍽️ Early church meals combined dinner and communion

🚫 Corinth's version no longer matched that pattern

🏷️ The name remained, the practice did not

📖 A sacred label cannot fix a corrupted practice

## 🍷 One Is Hungry, And Another Is Drunken

Wealthier members apparently arrived early and ate their own private portions.

Poorer members, often arriving later after a full day's labor, found nothing left.

The very meal meant to unite the church instead put its inequality on display.

Some left hungry while others grew drunk at the very same table.

🍷 Wealthier members ate before others arrived

😔 Poorer members were left with nothing

⚖️ The meal displayed inequality instead of unity

📖 One table, two very different experiences

## 🏠 Have Ye Not Houses To Eat And To Drink In

Paul asks a sharp, pointed question to expose the real issue.

Private hunger has a private solution, a believer's own home.

Treating the church gathering like an ordinary private meal missed its entire purpose.

Paul asks whether they still valued what the church gathering was meant to be.

🏠 A private meal belongs in a private home

❓ Paul's question exposes the real issue

🙇 The gathering's true purpose was being missed

➡️ Their actions showed where their values sat

# FirstCorinthians 11:23-26
# 🍞 The Lord's Supper Instituted
---
## 📜 I Have Received Of The Lord

Paul claims direct revelation for this account of the Lord's supper.

This is not secondhand information gathered from rumor or tradition alone.

Paul treats this teaching with the same authority as the gospel he preached elsewhere.

What follows carries full apostolic weight, not casual suggestion.

📜 Paul claims direct revelation here

🚫 Not secondhand rumor or guesswork

⚖️ Carries full apostolic authority

📖 This account demands careful attention

## 🌙 The Same Night In Which He Was Betrayed

Paul deliberately places this meal at its darkest possible moment.

Judas had already agreed to hand Jesus over when this supper happened.

Jesus established this lasting practice knowing exactly what was about to happen to him.

The timing itself carries weight the Corinthians were missing in their own careless meals.

🌙 Set on the night of the betrayal

😈 Judas had already made his deal

💔 Jesus knew what was coming

📖 Timing gives the meal its weight

## 🍞 This Is My Body, Which Is Broken For You

Jesus speaks over ordinary bread and gives it entirely new meaning.

The breaking of the bread pictures his body given up in suffering.

"For you" makes this personal, not a distant theological idea.

The meal was never meant to be eaten casually or carelessly.

🍞 Ordinary bread given new meaning

💔 Breaking pictures his body in suffering

🤲 For you makes this deeply personal

📖 Never meant to be eaten carelessly

## 🍷 This Cup Is The New Testament In My Blood

"Testament" here means a covenant, a binding agreement sealed with blood.

The old covenant at Sinai was sealed with animal blood, as Exodus twenty four records.

Jesus announces a new covenant sealed instead with his own blood.

This cup carries the weight of a whole new relationship between God and his people.

🍷 Testament means a binding covenant

🩸 The old covenant used animal blood

✝️ Jesus seals a new covenant himself

📖 One cup marks a whole new relationship

## 📢 Ye Do Shew The Lord's Death Till He Come

"Shew" means to proclaim or publicly announce, not merely to remember privately.

Every time this meal happens, it preaches Christ's death out loud again.

"Till he come" points the whole meal forward to his promised return.

The supper holds past, present, and future together in one simple act.

📢 Shew means proclaim publicly

✝️ Each meal preaches Christ's death again

⏳ Till he come points toward his return

📖 Past, present, and future meet here

# FirstCorinthians 11:27-29
# ⚠️ Eating Unworthily
---
## ⚠️ Shall Be Guilty Of The Body And Blood Of The Lord

"Unworthily" describes the careless, divisive manner Paul just described, not personal sinlessness.

Treating this meal the way the Corinthians had treated it disrespects what it represents.

Guilt here means being implicated in treating Christ's sacrifice carelessly.

No one qualifies for this meal through their own perfection anyway.

⚠️ Unworthily means careless, divisive manner

🚫 Not a claim of personal sinlessness

💔 Carelessness disrespects what the meal represents

📖 No one earns this meal through perfection

## 🔍 Let A Man Examine Himself

"Examine" means a careful, honest self check before approaching the table.

Paul calls for private reflection, not public interrogation of anyone else.

The goal is approaching the table with real reverence, not with anxiety.

This checking happens before eating, not as an excuse to avoid the table.

🔍 Examine means honest self check

🙇 Private reflection, not public judgment

🙏 The goal is reverence, not anxiety

➡️ Done before eating, not as an excuse

## ⚖️ Not Discerning The Lord's Body

"Discerning" means recognizing what the bread and cup truly represent.

The Corinthians were treating this meal like any ordinary dinner party.

Failing to discern the Lord's body may also point back to ignoring fellow believers.

The body of Christ names both his sacrifice and the church gathered around it.

⚖️ Discerning means recognizing true meaning

🍽️ They treated it like an ordinary dinner

👥 The body may also mean the church

📖 Two meanings of the same word collide here

# FirstCorinthians 11:30-32
# 🛌 Weak, Sickly, And Chastened
---
## 🛌 Many Are Weak And Sickly Among You, And Many Sleep

"Sleep" here is the New Testament's common, gentle word for a believer's death.

Paul connects real physical consequences directly to the careless way they treated this meal.

This is a strong claim, and Paul states it plainly rather than softening it.

God was treating their disrespect for this meal as a serious matter.

🛌 Sleep means a believer's death here

⚰️ Paul links real consequences to their conduct

💬 He states the claim plainly

📖 God treated this disrespect seriously

## ⚖️ If We Would Judge Ourselves, We Should Not Be Judged

Paul offers a way out of this pattern of discipline.

Honest self examination can prevent harsher correction later.

Catching a problem early costs far less than ignoring it.

This echoes the self check Paul just called for at the table.

⚖️ Self judgment can prevent harsher correction

⏳ Catching it early costs less

🔁 Echoes the table examination from verse twenty eight

➡️ Honesty now avoids discipline later

## 🛡️ Chastened Of The Lord, That We Should Not Be Condemned With The World

"Chastened" means loving discipline aimed at correction, not final punishment.

Paul draws a clear line between a believer's discipline and the world's coming condemnation.

God's correction here is actually a sign of care, not of rejection.

A parent who disciplines a child is still protecting that child from a far worse outcome.

🛡️ Chastened means loving discipline

⚖️ Different from the world's final condemnation

❤️ Correction here is a sign of care

📖 Discipline protects from a worse outcome

# FirstCorinthians 11:33-34
# 🤝 One Table, Together
---
## ⏳ Tarry One For Another

"Tarry" means wait, a simple practical fix for the whole problem Paul described.

Waiting for everyone to arrive turns a private meal back into a shared one.

This single small habit reverses the inequality that had crept into their gatherings.

Paul's solution is remarkably simple given how serious the problem was.

⏳ Tarry means wait for everyone

🤝 Waiting restores the meal's shared nature

⚖️ One habit reverses the inequality

📖 A simple fix for a serious problem

## 🏠 If Any Man Hunger, Let Him Eat At Home

Paul separates ordinary appetite from the sacred purpose of this gathering.

Satisfying hunger belongs at home, not at the Lord's table.

This protects the shared meal from becoming just another private dinner again.

Paul closes with a practical, pastoral fix rather than a long theological lecture.

🏠 Ordinary hunger belongs at home

🍽️ The table keeps its sacred purpose

🛡️ This protects the meal from misuse

➡️ A practical fix ends the problem

## 📋 The Rest Will I Set In Order When I Come

Paul leaves some matters unresolved for a planned future visit.

He has already addressed the most urgent and serious problem by letter.

The remaining details can wait until he arrives in person.

Not every issue needs solving in the same breath as the main one.

📋 Paul saves smaller matters for later

✅ The urgent issue is addressed first

🧳 He plans an in person follow up visit

📖 Not everything needs solving at once
`.trim();

export const FIRST_CORINTHIANS_ELEVEN_PERSONAL_SECTIONS = parseFirstCorinthiansElevenRawNotes(FIRST_CORINTHIANS_ELEVEN_RAW_NOTES);
