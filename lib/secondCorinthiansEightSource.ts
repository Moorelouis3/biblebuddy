export type SecondCorinthiansEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansEightRawNotes(rawText: string): SecondCorinthiansEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 8:${startVerse}` : `2 Corinthians 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Second Corinthians 8 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_EIGHT_RAW_NOTES = `# SecondCorinthians 8:1-5
# 🌊 Generosity Born Out Of Hardship
---
## 🗺️ The Churches Of Macedonia

Macedonia refers to the Roman province north of Achaia.

It included the cities of Philippi, Thessalonica, and Berea.

Paul had personally planted churches in each of those cities earlier.

Those same churches are the ones Paul praises here for their giving.

🗺️ Macedonia sat north of Achaia

🏛️ Philippi, Thessalonica, and Berea were its churches

🚶 Paul personally started these churches

📖 These same churches now give generously

## 🎁 We Do You To Wit Of The Grace Of God

The phrase we do you to wit is an old way of saying we want you to know.

Paul is about to tell the Corinthians an important piece of news.

The word grace here does not only mean spiritual forgiveness.

Paul uses this same word throughout the chapter to describe generous giving.

Giving and grace share one root word in the language Paul wrote in.

🎁 Wit means to know in this phrase

💰 Grace here also means generous giving

🔗 Giving and grace share one root word

📖 Paul is about to share real news

## 🔥 A Great Trial Of Affliction

Affliction here means real ongoing suffering, not minor inconvenience.

Many scholars believe this points to persecution the Macedonian churches faced.

Philippi and Thessalonica both show up elsewhere in Paul's letters facing real pressure.

These churches were poor and under pressure at the very same time.

Their circumstances make what happens next even more surprising.

🔥 Affliction means real ongoing suffering

🏛️ Philippi and Thessalonica faced real pressure

💸 These churches were already poor

➡️ Hardship did not stop their generosity

## 😊 The Abundance Of Their Joy

Joy here does not mean their circumstances were easy.

Paul just called their situation a great trial of affliction.

Their joy came from somewhere other than comfort or ease.

Real joy and real hardship were both true for them at once.

😊 Joy did not mean easy circumstances

🔥 Their trial was real and ongoing

🌊 Joy and hardship both existed together

📖 Real joy can exist inside real pain

## 💧 Their Deep Poverty Abounded Unto The Riches Of Their Liberality

Liberality means being generous without holding back.

Paul puts two opposite ideas side by side on purpose.

Deep poverty and overflowing generosity do not normally go together.

The Macedonians had very little money yet gave as if they had plenty.

Their joy, not their income, decided how much they gave.

💧 Liberality means generous without holding back

⚖️ Poverty and generosity do not usually mix

🙌 They gave despite having very little

📖 Joy decided their giving, not income

## 💪 Beyond Their Power They Were Willing Of Themselves

I bear record means Paul is personally vouching for this as a witness.

To their power means giving everything they were able to give.

Beyond their power means they gave even more than that.

Nobody pressured them to stretch that far.

They chose it willingly, on their own.

💪 Paul personally vouches for this

📊 To their power means giving everything

🚀 Beyond their power means giving even more

📖 They chose this stretch willingly

## 🙏 Praying Us With Much Intreaty

Intreaty is an old word for urgent, earnest pleading.

The Macedonians were not reluctant givers who needed convincing.

They were the ones begging Paul for the chance to give.

That request flips the usual picture of fundraising upside down.

🙏 Intreaty means urgent earnest pleading

🙅 They were not reluctant givers

🙋 They begged for the chance to give

📖 This flips the usual fundraising picture

## 🤝 The Fellowship Of The Ministering To The Saints

This phrase describes the money collection Paul was organizing for Jerusalem.

The saints here means the believers living in Jerusalem.

That church was suffering through poverty and likely a famine.

Fellowship means more than friendly feeling, it means shared partnership in the work.

Giving money was itself an act of real partnership.

🤝 Fellowship means shared partnership, not feeling

🏛️ The saints means Jerusalem believers

🌾 That church faced poverty and famine

📖 Giving money became an act of partnership

## 🙌 First Gave Their Own Selves To The Lord

This was not something Paul expected going in.

He hoped only for a decent financial gift.

Instead the Macedonians handed over themselves to God first.

Their money followed naturally, once their hearts were already given.

A gift given without the heart first is just a transaction.

🙌 Paul expected only a financial gift

❤️ They gave themselves to God first

💰 Money followed once hearts were given

📖 A gift without a given heart is empty

# SecondCorinthians 8:6-9
# 🔥 Titus Finishes What He Started
---
## 🔁 As He Had Begun, So He Would Also Finish

Titus had already started this collection during an earlier visit to Corinth.

Paul now asks him to go back and finish the job.

The same grace again means the same generous giving already mentioned.

Titus was the right person because the Corinthians already trusted him.

🔁 Titus already started this collection

🏁 Paul asks him to finish it

💰 Grace again means generous giving

📖 Titus was already trusted there

## 🌟 Abound In Every Thing, In Faith, And Utterance, And Knowledge

Paul names several things the Corinthians were already strong in.

Faith, clear speech, real knowledge, true diligence, and genuine love for Paul all make the list.

Paul now asks for one more addition to that list.

Generous giving should stand right next to those other strengths.

🌟 They already had faith and knowledge

🗣️ Clear speech and real diligence too

❤️ Genuine love for Paul as well

📖 Giving should join that same list

## 🙅 I Speak Not By Commandment

Commandment would mean Paul ordering this as apostolic law.

He deliberately steps back from using that authority here.

What he wants instead is a willing choice, not a forced payment.

Real generosity cannot be commanded into existence.

🙅 Paul gives no direct order

🚫 Giving is not a forced payment

🙋 A willing choice matters more

📖 Real generosity cannot be commanded

## 🔍 To Prove The Sincerity Of Your Love

Forwardness of others points back to the eager Macedonians already described.

Paul uses their example almost like a friendly challenge.

Sincerity means love that is genuine, not just talk.

This gift becomes visible proof of a love already claimed.

🏃 Forwardness points to the eager Macedonians

🏆 Paul uses them as a challenge

💎 Sincerity means genuine, not just talk

📖 The gift proves love already claimed

## 💎 Though He Was Rich, Yet For Your Sakes He Became Poor

This verse points to Jesus leaving heaven to become human.

Rich describes his glory and position before he was ever born on earth.

Poor describes the humble, ordinary life he lived once he arrived.

He did not lose that richness by accident.

He gave it up on purpose, for other people's benefit.

💎 Rich describes his glory in heaven

👶 Poor describes his humble life on earth

🎯 He gave up richness on purpose

📖 His choice was for other people

## 🙌 That Ye Through His Poverty Might Be Rich

This richness is not about money in a bank account.

Paul means the spiritual riches that come through Jesus.

His becoming poor opened the door to real riches for others.

The whole argument for generous giving rests on this exchange.

💰 Not riches of money or bank accounts

✝️ Spiritual riches come through Jesus

🚪 His poverty opened that door

📖 This exchange is the whole argument

## 👑 The Grace Of Our Lord Jesus Christ

Paul anchors this whole appeal to something Jesus actually did.

Our Lord names his authority over every believer, including the Corinthians.

Jesus Christ ties his human life to his role as the promised Messiah.

The example that follows comes from their own Lord, not a stranger.

👑 Lord names his authority over believers

✝️ Christ ties him to the Messiah

📜 This example comes from their own Lord

📖 It is more than a nice story

# SecondCorinthians 8:10-12
# 🏁 From Willing To Doing
---
## 📋 Herein I Give My Advice

Paul calls this advice, not a command.

He already made that distinction back in verse eight.

Expedient means genuinely helpful, not just technically allowed.

Paul believes finishing this gift will actually benefit the Corinthians themselves.

📋 Advice again, not a command

🔙 Matches the point from verse eight

✅ Expedient means genuinely helpful

📖 Finishing benefits the Corinthians too

## 📆 Forward A Year Ago

The Corinthians had already started this collection a full year earlier.

Enthusiasm at the start had apparently cooled off since then.

Paul is not introducing something new to them here.

He is asking them to finish a race they already began running.

📆 They started this a year earlier

❄️ Their enthusiasm had since cooled off

🆕 Nothing here is actually new

📖 Paul asks them to finish the race

## 🏁 A Readiness To Will, So There May Be A Performance

Paul separates two different things, wanting to do something and actually doing it.

Readiness to will means they already had the right attitude.

Performance means actually carrying the plan through to the end.

Good intentions alone were never going to finish this collection.

🏁 Willing and doing are two different things

💭 Readiness to will means right attitude

🏃 Performance means carrying it through

📖 Good intentions alone do not finish anything

## ✅ Perform The Doing Of It

Perform here simply means to actually carry out an action.

This is blunt, practical language, not poetic flourish.

There is no hidden theology in this phrase, just a plain call to act.

Sometimes the simplest instruction is the one most needed.

✅ Perform means actually carry it out

🗣️ Paul uses plain practical language

🚫 No hidden theology in this phrase

📖 Sometimes the simplest instruction is needed

## 🙏 Accepted According To That A Man Hath

God does not grade every gift by the same dollar amount.

A willing mind matters more than the size of the gift itself.

Someone is not judged for lacking money they never had.

This verse frees anxious givers from an impossible standard.

🙏 A willing mind matters most

⚖️ Gifts are not graded by amount

🚫 Nobody is judged for lacking money

📖 This frees givers from an impossible standard

# SecondCorinthians 8:13-15
# ⚖️ Equality Across The Churches
---
## 🙅 Not That Other Men Be Eased, And Ye Burdened

Paul addresses a fear before anyone asks it out loud.

He is not asking the Corinthians to go without food or rent.

This was never meant to drain one church to fill another.

Fairness was the goal, not one sided sacrifice.

🙅 Paul addresses an unspoken fear

🚫 Nobody should go without necessities

⚖️ Fairness, not one sided sacrifice

📖 The goal was balance, not draining

## ⚖️ But By An Equality

Equality does not mean everyone ends up with the exact same amount.

It means needs get met wherever they show up.

Wealthy seasons and lean seasons move between churches over time.

Nobody stays permanently on only one side of that exchange.

⚖️ Equality does not mean identical amounts

🔄 It means needs get met honestly

📈 Wealthy and lean seasons both happen

📖 Nobody stays only on one side

## 📤 Your Abundance May Be A Supply For Their Want

Right now, Corinth has more than Jerusalem's suffering believers do.

Want here means genuine lack, not simple preference.

Paul asks the Corinthians to let their surplus move toward real need.

Generosity flows from whoever currently has more.

📤 Corinth currently has more than Jerusalem

❗ Want means genuine lack, not preference

🌊 Surplus should flow toward real need

📖 Generosity flows from whoever has more

## 🔄 That Their Abundance Also May Be A Supply For Your Want

Paul does not expect Corinth to always be the one giving.

Circumstances change, and roles can reverse over time.

One day Jerusalem's abundance might flow back toward Corinth instead.

This kind of giving was always meant to run both directions.

🔄 Roles between churches were not fixed

📆 Circumstances change for every church

↩️ Jerusalem might someday give back

📖 Generosity was meant to run both ways

## 📜 As It Is Written

Paul backs up his point with a quote from the Old Testament.

Quoting scripture gave his argument weight the Corinthians would respect.

This habit shows up again and again across Paul's letters.

He is not inventing a new principle, only applying an old one.

📜 Paul quotes the Old Testament here

💪 Scripture gave his argument real weight

🔁 This habit repeats across his letters

📖 He applies an old principle here

## 🍞 He That Had Gathered Much Had Nothing Over

This line quotes the story of manna from the book of Exodus.

God fed Israel in the wilderness with bread that appeared each morning.

Families were told to gather only what they needed for that day.

Whoever gathered extra found it useless, and whoever gathered little still had enough.

Paul applies that same balance to money within the church.

🍞 This quotes the manna story in Exodus

🌄 God fed Israel fresh bread daily

📏 Families gathered only what they needed

📖 Paul applies that balance to money

# SecondCorinthians 8:16-19
# 🙏 Titus And His Trusted Companions
---
## 🙏 Thanks Be To God, Which Put The Same Earnest Care Into The Heart Of Titus

Paul gives credit to God before giving any credit to Titus.

Earnest care means a genuine, serious concern, not a passing interest.

God placed that same concern Paul felt directly into Titus as well.

Shared concern between two people can still come from one source.

🙏 Paul credits God first, not Titus

❤️ Earnest care means genuine serious concern

🔗 God placed it in Titus too

📖 One source can create shared concern

## ✅ He Accepted The Exhortation

Exhortation means a strong, encouraging request to take action.

Paul had urged Titus to go, and Titus agreed.

Agreement here was not forced or reluctant.

Titus responded the moment he was asked.

✅ Exhortation means a strong request

🗣️ Paul urged him, Titus agreed

🙋 His agreement was not reluctant

📖 He responded the moment he was asked

## 🚶 Being More Forward, Of His Own Accord He Went Unto You

Of his own accord means Titus chose this himself.

Nobody had to push him a second time.

More forward means he was even more eager than expected.

His own enthusiasm for the Corinthians outran Paul's request.

🚶 Of his own accord means his choice

🚫 Nobody pushed him a second time

🔥 He was more eager than expected

📖 His enthusiasm outran Paul's own request

## 🤝 We Have Sent With Him The Brother

Paul does not name this companion directly in this letter.

Many scholars believe this may have been Luke, the author of Acts and the Gospel of Luke.

The text itself leaves the identity uncertain.

What matters more to Paul is this man's reputation.

🤝 An unnamed companion joins Titus

❓ Many scholars guess this was Luke

🔍 The text leaves it uncertain

📖 His reputation matters more than his name

## 📰 Whose Praise Is In The Gospel Throughout All The Churches

This man was well known for his gospel work.

Throughout all the churches means his reputation spread far beyond one city.

Sending someone already trusted everywhere protected this collection from suspicion.

A stranger handling money invites doubt, a known name does not.

📰 He was well known for gospel work

🗺️ His reputation spread far and wide

🛡️ A trusted name protected the collection

📖 Known people invite less suspicion

## 🗳️ Chosen Of The Churches To Travel With Us

This was an official appointment, not a personal favor.

Multiple churches selected this man themselves to represent them.

That gave him real standing, not just Paul's personal endorsement.

Group accountability sat behind this whole journey.

🗳️ This was an official church appointment

🏛️ Multiple churches chose him themselves

📜 His standing did not depend only on Paul

📖 Group accountability shaped this whole trip

## 💰 Which Is Administered By Us

Administered means handled and managed on behalf of someone else.

Paul is describing the practical logistics of moving real money.

Large sums traveling between cities needed careful, visible management.

This was not casual or careless handling of funds.

💰 Administered means handled and managed

🧳 Large sums had to travel safely

👀 Visible management mattered a great deal

📖 This handling was careful, not careless

## 🎯 Declaration Of Your Ready Mind

Ready mind means eager willingness, already mentioned back in verse twelve.

This whole journey was meant to put that eagerness on display.

Actions were about to prove what words had already promised.

The Corinthians would soon get the chance to show it was true.

🎯 Ready mind means eager willingness

🔙 This echoes the point from verse twelve

🎭 Actions were about to prove words

📖 Their actions could show it was true

# SecondCorinthians 8:20-24
# 🛡️ Protecting The Gift From Suspicion
---
## 🙅 Avoiding This, That No Man Should Blame Us

Paul was handling a large amount of other people's money.

He knew how easily that kind of responsibility invites suspicion.

So he built in extra safeguards before anyone could even accuse him.

Protecting his reputation was never about pride, it was about trust.

🙅 Paul handled a large amount of money

⚠️ That kind of role invites suspicion

🛡️ He built in safeguards early

📖 Protecting trust mattered more than pride

## 👀 In This Abundance Which Is Administered By Us

Administered repeats the word from verse nineteen on purpose.

Paul wants the Corinthians to see this collection as carefully run.

Nothing about this process was secret or informal.

Careful process protected everyone involved, including Paul himself.

👀 Administered repeats the word from verse nineteen

📋 The process was careful and visible

🔓 Nothing here stayed secret or informal

📖 Careful process protected everyone involved

## 🙏 Providing For Honest Things, Not Only In The Sight Of The Lord

Paul could have simply trusted that God alone saw his motives clearly.

Instead he also wanted people to see honesty for themselves.

Good character is not satisfied with only private innocence.

Paul cared just as much about how his actions looked publicly.

🙏 God already saw his motives clearly

👥 Paul wanted people to see it too

🔍 Private innocence alone was not enough

📖 Public honesty mattered just as much

## 🤝 We Have Sent With Them Our Brother

A third traveling companion now joins Titus and the unnamed brother.

Three independent witnesses were now responsible for this money together.

No single person carried the funds alone.

This structure made theft or suspicion far less likely.

🤝 A third companion now joins the team

👥 Three witnesses shared this responsibility

🚫 No one person carried the funds alone

📖 This structure made suspicion less likely

## 💪 Whom We Have Oftentimes Proved Diligent

This was not a stranger handed a sudden responsibility.

Paul had already watched this man work hard many times before.

Past reliability earned him this new assignment.

Trust here was built over time, not given blindly.

💪 Not a stranger given sudden trust

📆 Paul had watched him work before

🏆 Past reliability earned this assignment

📖 Trust was built over time

## 🔥 Now Much More Diligent, Upon The Great Confidence Which I Have In You

Something about this specific mission raised this man's effort even higher.

Paul connects that extra effort directly to his own confidence in Corinth.

Paul's trust in the Corinthians was contagious, even to his coworkers.

Confidence in people can actually make others work harder too.

🔥 His effort rose even higher here

🔗 Paul's own confidence fueled that effort

🙌 Trust in Corinth felt contagious

📖 Confidence in people inspires harder work

## 🤝 He Is My Partner And Fellowhelper Concerning You

Partner and fellowhelper were everyday business terms in Paul's time.

They described people who shared real work and real risk together.

Paul is not describing a casual acquaintance here.

Titus carried equal responsibility alongside Paul in this entire project.

🤝 Partner was an everyday business term

⚖️ They shared real work and risk

🙅 Not a casual acquaintance at all

📖 Titus carried equal responsibility here

## 📨 They Are The Messengers Of The Churches, And The Glory Of Christ

Messengers translates a word that can also mean apostles in a smaller sense.

These men were official representatives sent out on real church business.

Glory of Christ is a striking title to give ordinary traveling companions.

Paul says their faithful service itself reflects well on Christ.

📨 Messengers can also mean sent representatives

🏛️ They traveled on real church business

✝️ Glory of Christ is a striking title

📖 Faithful service reflects well on Christ

## 🏆 Shew Ye To Them, And Before The Churches, The Proof Of Your Love

Shew is an old spelling of show.

Paul is not asking for private sincerity alone anymore.

He wants that love made visible in front of these visiting witnesses.

Paul's own public boasting about Corinth is also riding on this outcome.

🏆 Shew is an old spelling of show

👀 Love needed to be made visible

🗣️ Paul's own boasting rode on this

📖 Their response would confirm or embarrass him
`.trim();

export const SECOND_CORINTHIANS_EIGHT_PERSONAL_SECTIONS = parseSecondCorinthiansEightRawNotes(SECOND_CORINTHIANS_EIGHT_RAW_NOTES);
