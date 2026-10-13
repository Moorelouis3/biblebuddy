export type FirstCorinthiansEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansEightRawNotes(rawText: string): FirstCorinthiansEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 8:${startVerse}` : `1 Corinthians 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 First Corinthians 8 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_EIGHT_RAW_NOTES = `# FirstCorinthians 8:1-3
# ⚖️ Knowledge And Love
---
## 🍖 Things Offered Unto Idols

"Things offered unto idols" means meat left over from a sacrifice to a pagan god.

In Corinth, much of the meat sold in the market had passed through a temple first.

A priest would offer part of the animal to the god.

Then he would sell the rest to local butchers.

Almost any meal with meat could trace back to idol worship somewhere in the city.

This single question split the whole church into two different camps.

🍖 Idol meat came from sacrifices

🏛️ Corinth's temples supplied the market

🔪 Priests sold the leftover meat

📖 Ordinary meals carried hidden tension

## 🎈 Knowledge Puffeth Up, But Charity Edifieth

"Puffeth up" means knowledge can inflate a person with pride.

Think of air slowly filling a balloon.

The balloon looks bigger, but nothing solid is inside it.

"Charity" means selfless love for other people, not just giving money.

"Edifieth" means to build something up.

Think of a wall built one stone at a time.

Love is what actually strengthens a church.

🎈 Puffeth up means pride, not substance

🧱 Edifieth means building something real

❤️ Charity means selfless love for others

📖 Love strengthens a church, not pride

## 🤔 He Knoweth Nothing Yet As He Ought To Know

This does not mean a confident believer actually knows nothing.

Paul is warning about one specific kind of knowing.

The kind that stops listening to anyone else.

Real understanding of God always leaves room to keep learning.

A person who thinks they have fully arrived has already stopped growing.

Verse three flips the entire test.

Loving God matters more than winning an argument about God.

🤔 Full certainty can be a warning sign

📚 Real understanding leaves room to grow

🛑 Thinking you have arrived stops growth

📖 Loving God outweighs winning an argument

# FirstCorinthians 8:4-6
# 🙏 One God, One Lord
---
## 🗿 An Idol Is Nothing In The World

An idol has no real power behind it at all.

It is a carved image, nothing more.

That stays true no matter how costly or impressive it looks.

Corinth was full of temples built to gods like Aphrodite and Apollo.

Each one claimed real power over love, war, or fortune.

Paul strips all of that away in one sentence.

Behind every idol in the city stood an empty statue, not a rival god.

🗿 Idols are carved images, not gods

🏛️ Corinth worshiped many named gods

💨 None of them held real power

📖 Behind every idol stood an empty statue

## 🏛️ Gods Many, And Lords Many

Paul admits plenty of other beings were called gods and lords in Corinth.

The city had temples to gods like Aphrodite, Apollo, and Poseidon.

Emperors were sometimes worshiped as lords too, with their own festivals.

None of this means Paul agreed they were real.

He is naming the crowded religious world a new Christian in Corinth actually lived inside.

🏛️ Corinth held temples to many gods

👑 Emperors were sometimes worshiped as lords

🎭 Paul names the city's crowded beliefs

📖 Naming them is not agreeing with them

## 👆 To Us There Is But One God, The Father

Against a whole city of competing gods, Paul draws one hard line.

Christians answer to a single God, not one option among many.

"Of whom are all things" means God is the source behind everything that exists.

That claim was not safe to say out loud in Corinth.

It directly challenged temples that profited from every other god in town.

👆 Paul draws one hard line here

🌍 God is the source of everything

💰 Corinth's temples profited off other gods

📖 This claim was not a safe one

## ✝️ One Lord Jesus Christ, By Whom Are All Things

Paul places Jesus right beside God the Father in the same sentence.

"By whom are all things" means Christ was active in creating everything that exists.

"We by him" means a believer's own life runs through Christ too.

Lord was already a loaded title in Corinth, used for the emperor and for other gods.

Paul is not downgrading Jesus to a lesser figure.

✝️ Jesus stands beside God the Father

🌍 Christ was active in creation

👑 Lord was already a loaded title

📖 Jesus is not a lesser figure

# FirstCorinthians 8:7-8
# 😟 A Weak Conscience
---
## 🙋 Not In Every Man That Knowledge

Not every believer in Corinth grew up the same way.

Some had spent years as actual worshipers at these idol temples before becoming Christians.

For them, eating meat from a sacrifice did not feel like a neutral meal.

It still felt like taking part in the old worship itself.

Head knowledge that idols are nothing had not yet caught up with their gut reaction.

🙋 Some believers were former idol worshipers

🍖 Sacrificed meat still felt loaded to them

💭 Old habits outlasted new head knowledge

📖 Not everyone starts from the same place

## ⚠️ Their Conscience Being Weak Is Defiled

"Weak" here does not mean morally inferior.

It means a conscience still sensitive to something it used to treat as sacred.

"Defiled" means that conscience gets stained with guilt, even over something that is not sin.

A strong believer eating the same meat might feel nothing at all.

The weak believer eating it would feel like they had betrayed God.

⚠️ Weak means sensitive, not inferior

💔 Defiled means stained with real guilt

🍖 Same meal, two different inner reactions

📖 Guilt can be real even when misplaced

## 🍽️ Meat Commendeth Us Not To God

"Commendeth" means to put someone in good standing or earn them credit.

Eating the meat earns no extra credit with God.

Avoiding the meat does not lose any credit either.

Food was never the real battlefield here.

The real issue was always how that food choice affected another person.

🍽️ Commendeth means earning credit or favor

➕ Eating it earns no extra credit

➖ Avoiding it loses nothing either

📖 The real issue was never the food

# FirstCorinthians 8:9-11
# 🧱 A Stumblingblock To The Weak
---
## 🗽 This Liberty Of Yours

"Liberty" means the freedom Paul just spent six verses defending.

A Christian really is free to eat meat once offered to idols.

That freedom is genuine, not a trick or a trap.

But Paul immediately turns to how that freedom gets used.

Freedom that only serves yourself can end up hurting someone else.

🗽 Liberty means real Christian freedom

🍖 Eating the meat was genuinely allowed

🙋 The question becomes how it is used

📖 Freedom used carelessly can still wound

## 🧱 Become A Stumblingblock To Them That Are Weak

A "stumblingblock" is something placed in someone's path to make them trip and fall.

Paul is not talking about a physical object here.

He means an action that causes a weaker believer to fall back into something harmful.

A strong believer's freedom can become exactly that kind of trap.

All it takes is using it in front of the wrong person.

🧱 Stumblingblock means something that trips someone

🚶 It means an action, not a thing

📉 It can make a weak believer fall

📖 Freedom can become a trap for someone else

## 🏛️ Sit At Meat In The Idol's Temple

Pagan temples in Corinth were not only places of worship.

They also worked as banquet halls for weddings and business deals.

A Christian with strong convictions might attend one of these meals for a purely social reason.

A weaker believer watching would only see the old temple itself.

Appearance mattered just as much as the real reason for being there.

🏛️ Temples also worked as banquet halls

🍽️ Meals there were social, not only religious

👀 A weak believer only saw the temple

📖 Appearance mattered as much as intention

## 💔 The Weak Brother Perish, For Whom Christ Died

"Perish" here does not mean sudden physical death.

It means this believer's faith collapses, pulled back into the old idol worship.

Paul reminds the reader exactly what this person is worth.

Christ died for this one weak brother, the same as for anyone with more knowledge.

No argument about personal freedom outweighs that price.

💔 Perish means a collapsed, ruined faith

✝️ Christ died for this exact person

⚖️ Their worth is not about their knowledge

📖 No freedom outweighs a soul

# FirstCorinthians 8:12-13
# 🚫 Paul's Resolve
---
## ✝️ Ye Sin Against Christ

This is not framed as simply being unkind or thoughtless.

Wounding a weaker believer's conscience is called sin, aimed directly at Christ himself.

Jesus later says something similar about caring for the least of his people.

Whatever is done to one of his followers, he counts as done to him.

Hurting a weak believer is never a small, private matter.

✝️ Harming them is called sin against Christ

🤝 Christ identifies with his weakest followers

🚫 This is never a small, private matter

📖 People matter more than personal freedom

## 🙅 I Will Eat No Flesh While The World Standeth

Paul is not making a permanent rule for every Christian to follow.

He is describing how far he personally is willing to go.

Giving up meat entirely, for the rest of his life.

He would do that to protect even one weaker believer.

That is the size of love Paul wants Corinth to practice.

Chapter eight opened with a question about meat.

It closes with a picture of what real love actually costs.

🙅 Paul offers to give up meat

❤️ This shows the size of real love

⚖️ One person's freedom, weighed against another's faith

📖 Real love costs something real
`.trim();

export const FIRST_CORINTHIANS_EIGHT_PERSONAL_SECTIONS = parseFirstCorinthiansEightRawNotes(FIRST_CORINTHIANS_EIGHT_RAW_NOTES);
