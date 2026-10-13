export type FirstCorinthiansFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansFourRawNotes(rawText: string): FirstCorinthiansFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 4:${startVerse}` : `1 Corinthians 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 First Corinthians 4 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_FOUR_RAW_NOTES = `# FirstCorinthians 4:1-5
# ⚖️ Stewards Who Answer To The Lord
---
## Ministers Of Christ, And Stewards Of The Mysteries Of God

"Minister" means someone who serves under another person's authority.

"Steward" means a manager trusted to run someone else's household.

Paul wants the Corinthians to see every teacher this way.

Teachers are not celebrities to rank.

They are trusted servants assigned real work.

The whole letter builds on getting that picture right.

🤝 Minister means a serving role
🗝️ Steward means a trusted manager
🙅 Teachers are not celebrities to rank
📖 Every teacher is a trusted servant

## Required In Stewards, That A Man Be Found Faithful

A steward only has one real job requirement.

Faithfulness, not talent, not charisma, not clever speech.

The steward does not own the household.

Trustworthiness with what was handed to him is everything.

That standard quietly undercuts every ranking contest happening in Corinth.

🔑 Faithfulness is the one requirement
🚫 Not talent or charisma
🏠 A steward never owns the house
📖 Trustworthiness outranks popularity contests

## A Very Small Thing That I Should Be Judged Of You

Paul says human opinion carries almost no real weight for him.

The Corinthians had been ranking teachers like a popularity contest.

Paul refuses to even enter that contest as a player.

Other people's verdicts cannot change whether his work was actually faithful.

⚖️ Human opinion barely matters here
🏆 Corinth ran a popularity contest
🙅 Paul will not compete in it
📖 Real faithfulness outranks any verdict

## He That Judgeth Me Is The Lord

Paul admits he cannot see every fault in his own heart.

A clear conscience right now does not prove he is innocent.

Self judgment stays unreliable, even for an apostle.

Only the Lord sees clearly enough to issue a true verdict.

🙈 Paul cannot see every fault
🤷 A clear conscience is not proof
🧭 Self judgment stays unreliable
📖 Only the Lord judges truly

## Judge Nothing Before The Time, Until The Lord Come

This is not a ban on ever evaluating anything.

It is a ban on pronouncing final verdicts too early.

Corinth kept ranking teachers as if the final score was already in.

The real scorecard only opens when the Lord returns.

⏳ Not a ban on all evaluation
🚫 No final verdicts allowed yet
🏁 Corinth rushed to a final score
📖 The real scorecard opens later

## Will Make Manifest The Counsels Of The Hearts

"Manifest" means brought out into plain sight.

"Counsels of the hearts" means the hidden motives behind every choice.

People in Corinth could fake good motives for years.

That day will expose every motive no one else could see.

🔎 Manifest means brought into plain sight
💭 Counsels means hidden motives
🎭 Fake motives can last for years
📖 That day exposes every motive

# FirstCorinthians 4:6-8
# 🎈 Puffed Up Over Favorite Teachers
---
## Transferred To Myself And To Apollos For Your Sakes

Paul applies the steward and judgment lessons to two real names.

Himself and Apollos, the two teachers Corinth kept ranking against each other.

He picks real examples on purpose, not hypothetical ones.

Seeing the lesson applied to real people makes it harder to dodge.

🎯 Paul names two real teachers
⚔️ Himself and Apollos, the two rivals
🪞 Real examples are harder to dodge
📖 The lesson now has real names

## Not To Think Of Men Above That Which Is Written

"That which is written" points back to scripture itself.

Corinth had started measuring teachers by personal preference instead.

Paul redirects the standard back to what scripture actually says.

A teacher's popularity was never the real measuring stick.

📜 Written points back to scripture
❤️ Corinth measured by personal preference
🧭 Paul resets the real standard
📖 Popularity was never the measure

## That No One Of You Be Puffed Up For One Against Another

"Puffed up" means inflated with pride, like air blown into a balloon.

It looks impressive from the outside but is actually empty inside.

Corinth had inflated some teachers.

Other teachers got deflated unfairly in the same breath.

That inflated pride is exactly what this chapter keeps targeting.

🎈 Puffed up means inflated pride
💨 Looks big but stays empty
⚖️ Some teachers inflated, others deflated
📖 This pride is the chapter's target

## What Hast Thou That Thou Didst Not Receive

Every gift a teacher has started somewhere outside himself.

Nobody builds a spiritual gift completely alone.

Paul's question has no good answer if people think honestly about it.

Boasting about a received gift makes no real sense.

🎁 Every gift started outside yourself
🙅 Nobody builds one alone
❓ Paul's question has no answer
📖 Boasting over a gift makes no sense

## Now Ye Are Full, Now Ye Are Rich, Ye Have Reigned As Kings

This sounds like a compliment, but Paul means the opposite.

Corinth acted like they had already reached spiritual perfection.

Full, rich, and reigning as kings is Paul mocking that attitude.

Real maturity still looked far off, no matter how satisfied they felt.

😏 This sounds like praise, is not
👑 Corinth acted already perfect
🎭 Paul is mocking that attitude
📖 Real maturity still looked far off

## I Would To God Ye Did Reign, That We Also Might Reign With You

Paul says he actually wishes their claim were true.

If Corinth had truly arrived, Paul's own suffering would be over too.

Their premature celebration was not something Paul envied.

It was something that left him still waiting for the real thing.

🙏 Paul wishes the claim were true
🔗 His own suffering is tied to theirs
⏳ He is still waiting with them
📖 Celebration came before the real thing

# FirstCorinthians 4:9-13
# 🎭 A Spectacle To The World
---
## Set Forth Us The Apostles Last, As It Were Appointed To Death

Roman arenas often closed with the condemned men fighting last.

Those fighters were the ones least likely to survive the show.

Paul pictures the apostles placed in that exact losing position.

Corinth's winners were strutting through that very same season.

The apostles stood exactly where the losers always stood.

🏛️ Roman arenas closed with the condemned
☠️ Those fighters rarely survived
🧑‍🦱 Apostles pictured in that spot
📖 Corinth's winners stood somewhere safer

## Made A Spectacle Unto The World, And To Angels, And To Men

"Spectacle" is the Greek word behind our word theater.

It means a public show everyone stops to watch.

Paul says the apostles' suffering became exactly that kind of show.

Humans and even angels were the watching audience.

🎭 Spectacle is the word behind theater
👀 It means a public show
😣 Their suffering became that show
📖 Humans and angels both watched

## We Are Fools For Christ's Sake, But Ye Are Wise In Christ

Paul draws a sharp contrast between himself and the Corinthians.

He accepts looking foolish because of his loyalty to Christ.

The Corinthians had been chasing a reputation for wisdom instead.

One side carried shame on purpose, the other side avoided it.

🤡 Paul accepts looking foolish
🧠 Corinth chased a wise reputation
⚖️ Two very different choices here
📖 One side chose shame on purpose

## Ye Are Honourable, But We Are Despised

Paul lists more contrasts between himself and the Corinthians.

Weak against strong, honoured against despised.

Each pair cuts the exact same way.

Corinth had comfort and status that the apostles never had.

Paul names the gap plainly instead of pretending it does not exist.

💪 Corinth claimed strength and honor
😣 Paul carried weakness and shame
⚖️ The pairs cut the same way
📖 Paul names the real gap

## We Both Hunger, And Thirst, And Are Naked, And Are Buffeted

Paul lists real physical hardships, not exaggerated complaints.

Hunger and thirst mean going without basic food.

They also mean going without water for days at a time.

Naked means lacking decent clothing, not full nudity.

Buffeted means taking actual physical blows, not a figure of speech.

This was daily life for an apostle, not a rare bad week.

🍞 Hunger means going without food
💧 Thirst means going without water
👕 Naked means lacking decent clothing
📖 This was daily life, not rare

## Labour, Working With Our Own Hands

Traveling teachers in that world often expected to be paid and housed.

Paul instead supported himself through ordinary manual work.

He made tents for a living, a skilled but humble trade.

Choosing that path avoided any charge of preaching only for profit.

🧵 Traveling teachers often expected pay
🛠️ Paul worked an ordinary trade
⛺ Tentmaking was his actual craft
📖 This avoided any charge of profit

## Being Reviled, We Bless

"Reviled" means insulted or cursed openly in public.

The normal human response to insult is a sharper insult back.

Paul describes answering that treatment with a blessing instead.

That response mirrors exactly what Christ taught about loving enemies.

🗣️ Reviled means public insults
🔥 The normal reply is a sharper insult
🙏 Paul answers with a blessing
📖 This mirrors Christ's own teaching

## Made As The Filth Of The World, And Are The Offscouring Of All Things

"Offscouring" means the scraped off dirt and waste nobody wants.

"Filth" carries that same picture of something treated as garbage.

Paul uses the lowest possible image on purpose.

The apostles were treated as society's throwaway scraps, not its heroes.

🧹 Offscouring means scraped off waste
🗑️ Filth means treated as garbage
📉 Paul picks the lowest image
📖 Apostles were treated as throwaway

# FirstCorinthians 4:14-17
# 👨‍👦 A Father's Warning, Not A Shaming
---
## I Write Not These Things To Shame You, But I Warn You

This whole chapter could sound like public humiliation.

Paul stops to clarify that shaming was never his goal.

"As my beloved sons" reframes the entire tone as fatherly love.

A hard warning and a loving warning can look alike on paper.

😳 This chapter could sound harsh
🚫 Shaming was never the goal
❤️ Beloved sons reframes the tone
📖 A hard warning can still be loving

## Ye Have Ten Thousand Instructors In Christ

"Instructors" here pictures a hired tutor, not a permanent family member.

Corinth had plenty of traveling teachers passing through over the years.

A tutor can be replaced the moment a better one shows up.

That revolving door is exactly the problem Paul is naming.

📚 Instructors means hired tutors
🔁 Corinth had many of them
🚪 A tutor is easily replaced
📖 That revolving door is the problem

## Yet Have Ye Not Many Fathers

A father is not the same as a tutor.

A tutor can walk away without losing anything personal.

A father's bond with his own child never works that way.

Corinth only ever had one spiritual father, and it was Paul.

👨‍👧 A father differs from a tutor
🔗 A father's bond runs deeper
🚶 A tutor can simply walk away
📖 Corinth had only one real father

## In Christ Jesus I Have Begotten You Through The Gospel

"Begotten" means fathered or brought into being, like a parent and child.

Paul is not claiming credit for their salvation itself.

He is naming his own role as the one who first preached to them.

That first gospel message is what started the whole Corinthian church.

👶 Begotten means fathered into being
🙅 Paul does not claim their salvation
📣 He preached the first gospel message
📖 That message started the church

## Be Ye Followers Of Me

This is not Paul asking for personal fans.

Earlier in this letter Paul already condemned exactly that kind of loyalty.

Following Paul here means copying how he follows Christ.

The goal was always Christ, with Paul simply walking in front.

🙅 Not a request for personal fans
⚔️ Earlier Paul condemned that loyalty
🧭 Followers means copy his pattern
📖 Christ was always the real goal

## Sent Unto You Timotheus, Who Shall Bring You Into Remembrance Of My Ways

Timotheus is the same Timothy who later received his own New Testament letters.

Paul calls him his beloved and faithful son in the Lord.

Timothy's job was reminding Corinth exactly how Paul taught everywhere else.

A trusted messenger carried real weight in a culture without phones or mail.

🧑 Timotheus is Timothy, known later
❤️ Called beloved and faithful son
🧭 His job was reminding them of Paul's ways
📖 A trusted messenger carried real weight

# FirstCorinthians 4:18-21
# 💪 The Kingdom Is Power, Not Talk
---
## Now Some Are Puffed Up, As Though I Would Not Come To You

Some teachers in Corinth assumed Paul was staying away for good.

That assumption let them act bolder than they otherwise would.

Pride tends to grow fastest when nobody expects to be checked.

Paul is about to remove that false assumption directly.

🎈 Some assumed Paul was gone
😤 That let pride grow bolder
🚫 No one expected a check
📖 Paul is about to correct that

## I Will Come To You Shortly, If The Lord Will

Paul plans a real visit, not just a strongly worded letter.

"If the Lord will" keeps the plan honestly under God's control.

Even an apostle's travel plans stay subject to God's timing.

That humility does not weaken the warning that follows it.

✈️ Paul plans an actual visit
🙏 If the Lord will stays honest
⏳ Even his plans depend on God
📖 Humility does not weaken this warning

## Will Know, Not The Speech Of Them Which Are Puffed Up, But The Power

Paul is not coming to listen to impressive speeches.

Fancy words had already fooled Corinth once in this letter.

He plans to test whether real spiritual power backs up the talk.

Talk is cheap, and Paul already knows it.

🗣️ Not coming to hear speeches
🎭 Fancy words already fooled them
⚡ He will test for real power
📖 Talk is cheap, power is not

## The Kingdom Of God Is Not In Word, But In Power

This line names the whole chapter's real point directly.

A kingdom is not proven by clever arguments or polished delivery.

It is proven by actual transformed lives and real spiritual power.

Corinth had been impressed by the wrong evidence the entire time.

👑 This line names the whole point
🗣️ Clever words do not prove it
⚡ Real power is the actual proof
📖 Corinth was impressed by the wrong thing

## Shall I Come Unto You With A Rod, Or In Love, And In The Spirit Of Meekness

"Rod" pictures the kind of discipline used to correct a misbehaving child.

"Meekness" does not mean weakness, it means strength kept under control.

Paul genuinely leaves the choice of approach up to the Corinthians.

How they respond right now will decide which Paul actually shows up.

🪄 Rod pictures a corrective discipline
💪 Meekness means controlled strength
🧭 The Corinthians choose which Paul arrives
📖 Their response decides the outcome
`.trim();

export const FIRST_CORINTHIANS_FOUR_PERSONAL_SECTIONS = parseFirstCorinthiansFourRawNotes(FIRST_CORINTHIANS_FOUR_RAW_NOTES);
