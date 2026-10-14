export type SecondCorinthiansNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansNineRawNotes(rawText: string): SecondCorinthiansNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 9:${startVerse}` : `2 Corinthians 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Second Corinthians 9 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_NINE_RAW_NOTES = `# SecondCorinthians 9:1-5
# 📬 Making Sure The Gift Is Ready
---
## 📨 Touching The Ministering To The Saints

Touching here is an old word for about or concerning.

Ministering to the saints means the relief gift bound for Jerusalem.

Paul already described this same gift back in chapter eight.

Saints simply means the Christians living in that city.

This whole chapter keeps unpacking a gift already set in motion.

📨 Touching means about or concerning

🙏 Ministering means the Jerusalem relief gift

✝️ Saints means ordinary believers there

📖 Chapter eight already introduced this gift

## ✍️ It Is Superfluous For Me To Write

Superfluous means unnecessary or more than what is needed.

Paul says writing about this is superfluous, then spends two chapters doing it anyway.

That is not a contradiction, it is a polite way of speaking.

Paul is really saying he already trusts they are on board.

✍️ Superfluous means unnecessary

🙃 Paul writes about it anyway

🤝 This shows confidence, not doubt

📖 Trust itself can encourage someone

## 🏃 The Forwardness Of Your Mind

Forwardness means eagerness or readiness to act.

Paul used this exact word for the Macedonians back in chapter eight.

Now he applies that same word to the Corinthians themselves.

He is reminding them of an eagerness they already showed once.

🏃 Forwardness means eagerness to act

🔁 Paul used this word before

🪞 Now he applies it to them

📖 He recalls their own enthusiasm

## 🗺️ Achaia Was Ready A Year Ago

Achaia was the Roman province covering southern Greece.

Corinth was its largest and most important city.

Paul told Macedonia that Corinth already had this gift ready.

That claim was actually a year old and getting stale.

🗺️ Achaia covered southern Greece

🏛️ Corinth was its leading city

📆 This readiness was a year old

📖 Paul's boast now needs catching up

## 🔥 Your Zeal Hath Provoked Very Many

Zeal means strong enthusiasm or passion.

Provoked here does not mean made angry.

It means stirred into action by example.

The Corinthians' reported zeal had already motivated many Macedonian believers.

🔥 Zeal means strong enthusiasm

⚡ Provoked here means stirred to action

🙌 Many Macedonians were moved by it

📖 One church's zeal fueled another's

## 🗣️ Lest Our Boasting Of You Should Be In Vain

Paul had already bragged about Corinth's generosity to the Macedonians.

In vain means empty or proven false.

If Corinth failed to deliver, that boast would collapse in front of witnesses.

Ready here meant an actual finished gift, not just willingness.

His reputation and their follow through were now tied together.

🗣️ Paul had already bragged about them

📉 In vain means proven false

✅ Ready meant a finished gift, not just willingness

📖 His reputation now depended on them

## 🚶 If They Of Macedonia Come With Me

Paul pictures a specific, awkward scenario.

Macedonian believers might travel south with him to Corinth.

If they arrived and found nothing collected, the shame would be public.

Paul wanted this handled before that moment ever happened.

🚶 Macedonians might travel with Paul

😳 An unprepared gift means public shame

⏰ Paul wants this settled beforehand

📖 He is heading off embarrassment early

## ✋ We That We Say Not Ye Should Be Ashamed

Paul catches himself mid sentence on purpose.

He almost says you should be ashamed, then softens it to we.

That we say not ye means Paul is being careful with his words.

He puts himself in the shame first instead of only blaming them.

✋ Paul catches his own words

🙋 He includes himself in the shame

🤝 This softens the blame on them

📖 Correction can still be gentle

## 🎁 Make Up Beforehand Your Bounty

Bounty means a generous gift, the same word used often in chapter eight.

Beforehand means finishing the collection before Paul himself shows up.

This was not a surprise request, Corinth had notice long before.

Paul wanted generosity finished, not improvised at the last minute.

🎁 Bounty means a generous gift

⏳ Beforehand means finished before Paul arrives

📬 They already had notice of this

📖 Generosity here was planned, not improvised

## 💰 Not As Of Covetousness

Covetousness means a greedy, grudging unwillingness to give.

Paul wants this gift collected willingly, not squeezed out reluctantly.

The same concern about forced giving showed up back in chapter eight.

A gift given through pressure was never the goal here.

💰 Covetousness means greedy reluctance

🙅 Paul does not want forced giving

🔁 This echoes the point from chapter eight

📖 Pressure was never the goal

# SecondCorinthians 9:6-9
# 🌱 Sowing And Reaping Generosity
---
## 🌱 He Which Soweth Sparingly Shall Reap Also Sparingly

Sowing and reaping was a farming reality every reader understood firsthand.

Sparingly means holding back a small handful of seed on purpose.

Bountifully means scattering seed generously across the whole field.

The size of the harvest usually matched the size of what got planted.

🌱 Sowing and reaping was everyday farming

✋ Sparingly means holding seed back

🌾 Bountifully means scattering it generously

📖 Paul applies this logic to giving

## 😤 Not Grudgingly Or Of Necessity

Grudgingly means giving while feeling resentful or unwilling.

Necessity means giving only because of outside pressure or guilt.

Paul rules out both of these as acceptable motives.

Chapter eight already made a similar point about forced giving.

What remains, once both are removed, is a free choice.

😤 Grudgingly means giving while resentful

😬 Necessity means giving under pressure

🙅 Paul rules out both motives

📖 What remains is a free choice

## 😄 God Loveth A Cheerful Giver

Cheerful here means genuinely joyful, not simply polite.

The original word is close to the root of the English word hilarious.

God is not just tolerating generosity, he actually delights in joyful givers.

The attitude behind a gift matters to God as much as the gift itself.

😄 Cheerful means genuinely joyful

🔤 The word is close to hilarious

❤️ God delights in joyful givers

📖 Attitude matters as much as the gift

## 📈 God Is Able To Make All Grace Abound Toward You

Grace here means generous provision, the same sense used throughout chapter eight.

Abound means to increase well beyond what is strictly needed.

The source of that increase is God, not the giver's own effort.

Nobody has to give from fear of running out.

📈 Grace here means generous provision

💹 Abound means increasing beyond need

🙏 God is the source of increase

📖 Nobody gives from fear of running out

## ⚖️ Always Having All Sufficiency In All Things

Sufficiency means having exactly enough, not having extra to hoard.

This does not promise unlimited wealth or comfort.

It promises enough resources to keep being generous without running dry.

The goal here was steady enough, not stacked up rich.

⚖️ Sufficiency means having exactly enough

🙅 Not a promise of unlimited wealth

🔁 Enough to keep giving without drying up

📖 The goal was steady, not rich

## 🛠️ Abound To Every Good Work

God's purpose for the increase was never personal comfort.

Good work here means tangible actions that help other people.

Whatever overflow a person receives is meant to keep moving outward.

Generosity was designed to be a cycle, not a stopping point.

🙌 Increase was never for personal comfort

🛠️ Good work means tangible helpful action

🔄 Overflow was meant to keep moving

📖 Generosity was designed as a cycle

## 📜 As It Is Written

This phrase quotes directly from Psalm one hundred twelve.

Paul used this exact same phrase back in chapter eight.

Quoting scripture gave Paul's point weight his readers would respect.

He is not inventing a new idea, only applying an old one.

📜 This quotes Psalm one hundred twelve

🔁 Paul used this same phrase before

💪 Scripture gave his point real weight

📖 He applies an old truth here

## 🌾 His Righteousness Remaineth For Ever

Dispersed abroad means scattered generously, much like seed thrown across a field.

Righteousness here is not about rule keeping.

It describes a right hearted generosity visible in how someone treats the poor.

That kind of character outlasts the specific gift that revealed it.

🌾 Dispersed abroad means scattered generously

❤️ Righteousness here means generous character

👁️ It shows in how the poor are treated

📖 Character outlasts the gift that revealed it

# SecondCorinthians 9:10-12
# 🌾 God Supplies And Multiplies
---
## 🌿 He That Ministereth Seed To The Sower

This pictures God as the one who supplies seed in the first place.

Before a farmer ever plants, God already provided what gets planted.

The same is true of whatever a generous person has to give.

Nobody's generosity starts from their own private resource.

🌱 God supplies the seed first

🚜 Before planting, provision already happened

🙏 The same is true of any gift

📖 Generosity never starts from nowhere

## 🌾 Multiply Your Seed Sown

Multiply here does not promise that giving money guarantees more money back.

The increase Paul describes is bigger character and more capacity to give again.

God is not running a financial exchange with Corinth.

What grows back is not identical to what was planted.

🌾 Not a guarantee of more money

📈 The increase is character and capacity

🙅 God is not running an exchange

📖 What grows back differs from what was sown

## 🍇 Increase The Fruits Of Your Righteousness

Fruits of your righteousness means the good actions generosity produces over time.

This is not a promise of personal riches.

It is a promise that the giving habit itself keeps growing.

The real harvest here is becoming more generous, not more wealthy.

🍇 Fruits means good actions over time

🙅 Not a promise of riches

🔁 The giving habit itself keeps growing

📖 The harvest is generosity, not wealth

## 💎 Enriched In Every Thing To All Bountifulness

Enriched here describes being given more resources to work with.

Bountifulness means generosity that touches every area, not just one gift.

The purpose of that enrichment was always more giving, not more keeping.

Resources kept flowing through, instead of stopping with the person who received them.

💎 Enriched means more resources given

🌐 Bountifulness touches every area, not one

➡️ The purpose was more giving, not keeping

📖 Resources flow through, not stop

## 🙏 Which Causeth Through Us Thanksgiving To God

The gift becomes an occasion for other people to praise God.

That thanksgiving travels through Paul and the Corinthians to reach Jerusalem.

Nobody ends up thanking the giver as the final destination.

A generous gift was designed to point past itself, straight to God.

🙏 The gift becomes an occasion for praise

➡️ Thanksgiving travels through to Jerusalem

🙅 The giver is not the final destination

📖 Generosity was designed to point to God

## ❗ Supplieth The Want Of The Saints

Administration repeats a word Paul already used back in chapter eight.

Want here means a genuine physical need, not a simple wish.

This gift was meeting real hunger or hardship in Jerusalem.

The money had a specific, practical destination, not an abstract purpose.

📋 Administration echoes chapter eight's word

❗ Want means genuine need, not a wish

🏛️ The need was real, in Jerusalem

📖 This gift had a practical destination

## 🌊 Abundant Also By Many Thanksgivings Unto God

This single gift produced two separate effects at once.

One effect met a physical need for food or shelter.

The other effect multiplied praise to God across many people.

A single act of generosity rippled out further than the money itself ever could.

🍞 One effect met physical need

🙌 The other multiplied praise to God

🌊 One gift produced two separate effects

📖 Generosity rippled further than the money

# SecondCorinthians 9:13-15
# 🙏 A Gift That Points To Christ
---
## 🔬 The Experiment Of This Ministration

Experiment here is an old word for proof or clear demonstration.

It does not mean a scientific test or trial.

Ministration means the gift itself, the same service named back in verse one.

The gift itself became living proof of something the Corinthians already claimed.

🔬 Experiment here means proof, not a test

🎁 Ministration means the gift itself

🔁 This echoes verse one's wording

📖 The gift proved a claimed belief

## 🗣️ Your Professed Subjection Unto The Gospel Of Christ

Professed means openly declared, not privately assumed.

Subjection means willing submission, not forced obedience.

Their generosity gave visible proof of a loyalty they had already claimed in words.

Actions were finally catching up to what their mouths had already said.

🗣️ Professed means openly declared

🙇 Subjection means willing submission

👀 Generosity proved a claimed loyalty

📖 Actions caught up to their words

## 💸 Your Liberal Distribution Unto Them And Unto All Men

Liberal here is an old word for generous, not a political label.

A modern reader might wrongly hear a reference to modern politics.

Distribution unto all men means this generosity had a wide, public reputation.

The word only describes open handed giving, nothing more.

💸 Liberal here simply means generous

🙅 Not a modern political term

🌍 This generosity had a wide reputation

📖 The word only describes open giving

## ⏳ Which Long After You

Long after here does not refer to a span of time.

It is an old way of saying to deeply desire or yearn for someone.

Jerusalem's believers missed and longed to see the Corinthians, not merely later.

Their prayer was personal affection, not a vague future reference.

⏳ Long after here means yearn, not later

❤️ It describes deep personal desire

🙏 Jerusalem longed to see Corinth

📖 Their prayer was personal affection

## 💰 The Exceeding Grace Of God In You

Grace again means the generous giving running through this whole chapter.

Exceeding means far beyond what anyone had reason to expect.

Jerusalem's prayer was really thanking God for what he had done in Corinth.

The credit for this generosity still traces back to God, not Corinth's own character.

💰 Grace again means generous giving

📈 Exceeding means beyond expectation

🙏 Jerusalem thanked God, not Corinth

📖 Credit traces back to God

## 🎁 His Unspeakable Gift

Unspeakable means too great to fully put into words.

Thanks be unto God closes the chapter by thanking God, not the Corinthians.

Many scholars believe this gift points beyond money to Christ himself.

Two chapters about a collection end by pointing somewhere much bigger.

🎁 Unspeakable means too great for words

🙏 Paul thanks God, not the Corinthians

✝️ Many scholars see this pointing to Christ

📖 Every gift here points back to Jesus
`.trim();

export const SECOND_CORINTHIANS_NINE_PERSONAL_SECTIONS = parseSecondCorinthiansNineRawNotes(SECOND_CORINTHIANS_NINE_RAW_NOTES);
