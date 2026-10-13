export type FirstCorinthiansSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansSixteenRawNotes(rawText: string): FirstCorinthiansSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 16:${startVerse}` : `1 Corinthians 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 First Corinthians 16 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_SIXTEEN_RAW_NOTES = `# FirstCorinthians 16:1-4
# 📦 The Collection For The Saints
---
## 💰 Concerning The Collection For The Saints

"Collection" means money gathered from many people for one purpose.

"Saints" simply means believers, not specially holy figures.

Paul means ordinary Christians pooling their money for other ordinary Christians.

This particular gift was headed to the poor believers in Jerusalem.

A famine and ongoing hardship had left that church in real need.

💰 Collection means money gathered together
🙏 Saints simply means believers
🏙️ The gift was headed to Jerusalem
📖 Ordinary believers helped other believers in need

## 📜 As I Have Given Order To The Churches Of Galatia

Paul did not invent a new rule only for Corinth.

He had already given the exact same instructions to the churches in Galatia.

Galatia was a region in what is now central Turkey.

Paul planted several churches there on his earlier missionary journeys.

One consistent plan across many churches made the whole collection easier to trust.

📜 Paul reused the same instructions
🗺️ Galatia sat in modern day Turkey
⛪ Paul had planted churches there
➡️ One shared plan built shared trust

## 📅 Upon The First Day Of The Week

The first day of the week is Sunday on our modern calendar.

That was the day Jesus rose from the dead.

Within just a few decades believers were already gathering and giving on that day.

This is some of the earliest evidence of Sunday becoming the Christian day of worship.

Paul ties ordinary generosity to the day that proves the resurrection.

📅 First day of the week means Sunday
⚰️ Sunday is the day Jesus rose
⛪ Early believers already gathered on Sundays
📖 Generosity and resurrection are tied together

## 🏦 Lay By Him In Store

This phrase means setting money aside on a regular basis.

It describes a habit, not a single large gift given once.

Each person saved a little at a time as their income allowed.

By the time Paul arrived the full amount would already be ready.

Small steady giving adds up to something significant.

🏦 Lay by in store means save regularly
🔁 It describes a steady habit
💵 Each person gave as they were able
➡️ Small steady gifts add up

## ⏳ That There Be No Gatherings When I Come

Paul wants the money ready before he even arrives.

Without a plan churches often scrambled to raise a gift at the last minute.

That kind of rushed giving feels forced instead of willing.

A planned, steady habit avoids that last minute pressure completely.

⏳ No last minute scrambling allowed
📋 Paul wanted the gift ready early
😬 Rushed giving can feel forced
📖 Planned generosity replaces pressured generosity

# FirstCorinthians 16:5-9
# 🚪 Paul's Open Door
---
## 🗺️ Pass Through Macedonia

Macedonia was the Roman region just north of Corinth's province of Achaia.

Paul planned a travel route, not a sudden change of plans.

He had already told the Corinthians to expect him this way.

Knowing the route let them plan for his visit instead of guessing.

🗺️ Macedonia sat just north of Corinth
🧭 Paul followed a planned route
📅 The Corinthians could expect his timing
➡️ A clear plan helped everyone prepare

## ⚓ Abide, Yea, And Winter With You

Ancient ships avoided open sea travel during the winter months.

Storms made sailing far too dangerous that time of year.

Staying through winter was practical, not just a personal preference.

Paul may end up spending several months in Corinth because of this.

⚓ Ships avoided winter sea travel
🌊 Storms made sailing too risky
📆 Winter forced a longer visit
📖 Practical reality shaped Paul's plans

## 🧳 Bring Me On My Journey Whithersoever I Go

"Whithersoever" is an old word meaning wherever or to whatever place.

Churches often helped a traveling teacher with supplies, money, or companions for the next leg of a trip.

This custom is called being sent on one's journey.

Paul expects the Corinthians to help equip his next stop after Corinth.

🧳 Whithersoever means wherever he goes
🤝 Churches helped equip departing teachers
💰 This could mean money or supplies
➡️ Corinth would help launch his next trip

## 🚶 I Will Not See You Now By The Way

A visit "by the way" means a short stop in passing.

Paul wants something deeper than a quick hello on his way somewhere else.

He is asking the Lord's permission to stay a real while instead.

This shows he values time together, not just a brief hello.

🚶 By the way means a quick stop
❤️ Paul wanted more than a quick visit
🙏 He asked the Lord's permission first
📖 Depth mattered more than speed

## 🏛️ Tarry At Ephesus Until Pentecost

Ephesus was a major city on the coast of modern day Turkey.

"Pentecost" was a Jewish feast held fifty days after Passover.

Paul is writing this letter from Ephesus right now, giving a firm date for his departure.

Naming a feast day let the Corinthians track the calendar the same way Paul did.

🏛️ Ephesus sat on the coast of Turkey
📅 Pentecost fell fifty days after Passover
✍️ Paul wrote this letter from Ephesus
➡️ A feast day marked his timeline

## 🚪 A Great Door And Effectual Is Opened Unto Me

"A door" was a common way to picture a new opportunity.

"Effectual" means the opportunity was real and genuinely working, not just possible.

Paul saw real response and real ministry happening in Ephesus right now.

That is exactly why he was staying there rather than leaving early.

🚪 A door pictures a new opportunity
✅ Effectual means it was really working
🏙️ Ephesus was responding to the gospel
📖 Real fruit was reason enough to stay

## ⚔️ There Are Many Adversaries

"Adversaries" means people actively working against Paul's ministry.

Acts eighteen and nineteen describe real opposition and even a riot in Ephesus.

Open opportunity and open opposition were both present at the very same time.

Paul never expected fruitful ministry to come without resistance.

⚔️ Adversaries means active opposition
📚 Acts describes real conflict in Ephesus
🎭 Opportunity and opposition arrived together
📖 Resistance did not mean the door was closed

# FirstCorinthians 16:10-12
# 🤝 Timothy And Apollos
---
## 🧑 See That He May Be With You Without Fear

Timothy was likely the youngest and least experienced of Paul's coworkers.

Corinth already had a reputation for being a difficult, divided church.

Paul is asking the believers to protect Timothy from intimidation, not hostility.

A young worker doing the Lord's work still deserves real support.

🧑 Timothy was young and less experienced
🏙️ Corinth had a difficult reputation
🛡️ Paul asked them to protect him
📖 Young workers still deserve real support

## 👎 Let No Man Therefore Despise Him

"Despise" means to look down on someone as unworthy of respect.

Paul names the exact danger Timothy might face in Corinth.

Timothy was doing the same work Paul himself did.

Respect for the message should include respect for the messenger.

👎 Despise means looking down on someone
⚠️ Paul named the exact danger
🧑‍🏫 Timothy carried the same work as Paul
➡️ Respect the message, respect the messenger

## 👋 Conduct Him Forth In Peace

Sending a traveling worker off well was a real custom in the early church.

It meant practical help for the next leg of his trip, not just a friendly goodbye.

A cold send off would have embarrassed Timothy on his way back to Paul.

Corinth's response to Timothy would say something about Corinth itself.

👋 Conduct forth means send off well
🧳 This included practical travel help
😬 A cold goodbye would embarrass him
📖 How they treated Timothy reflected on them

## 🙅 His Will Was Not At All To Come At This Time

Apollos was a well known teacher the Corinthians already respected deeply.

Some in Corinth had even formed a faction loyal to Apollos over Paul.

Paul makes clear that Apollos chose to stay away on his own.

No pressure from Paul kept Apollos from returning right now.

🧑‍🏫 Apollos was a well known teacher
👥 Some Corinthians favored him over Paul
🙅 Apollos made his own choice to wait
📖 Paul did not force Apollos to come

# FirstCorinthians 16:13-14
# 💪 Final Marching Orders
---
## 👀 Watch Ye, Stand Fast In The Faith

"Watch" means staying spiritually alert instead of careless or half asleep.

"Stand fast" pictures a soldier holding a position under pressure.

These four short commands read like a drill sergeant's checklist.

Paul packs them together because the moment calls for urgency.

👀 Watch means staying spiritually alert
🛡️ Stand fast pictures holding a position
⚡ Four short commands build urgency
📖 The moment called for real readiness

## 🗡️ Quit You Like Men, Be Strong

"Quit you like men" is an old idiom meaning to act with courage.

It is not about gender but about facing hard things without backing down.

Paul uses it for the whole Corinthian church, women included.

Real strength here means standing firm under real pressure.

🗡️ Quit you like men means be courageous
🙋 This applies to the whole church
💪 Strength here means standing firm
➡️ Courage, not comfort, was the call

## ❤️ Let All Your Things Be Done With Charity

"Charity" in the King James Bible is an old word for love, not giving money to the poor.

This single line sums up every instruction in the letter so far.

Correcting division, settling disputes, even giving money, all of it needs love behind it.

Without love, even the right action misses the point.

❤️ Charity here means love, not money
📜 This line sums up the whole letter
⚖️ Right actions still need love behind them
📖 Love was the missing piece all along

# FirstCorinthians 16:15-18
# 🏠 The Household Of Stephanas
---
## 🌾 The Firstfruits Of Achaia

"Firstfruits" normally describes the first crops gathered in harvest season.

Paul borrows that farming picture for the first converts won in a region.

Achaia was the Roman province that included the city of Corinth.

Stephanas's household was likely among the very first believers in that whole area.

🌾 Firstfruits means the first harvest gathered
🗺️ Achaia was Corinth's Roman province
🏠 Stephanas was among the first believers
📖 A farming image describes a spiritual beginning

## 🙌 Addicted Themselves To The Ministry Of The Saints

"Addicted" here means devoted or fully committed, not the modern meaning of addiction.

This household chose serving other believers as their own ongoing mission.

Nobody assigned them this task, they took it up themselves.

Willing service like this is exactly what Paul wants the church to notice.

🙌 Addicted here means fully devoted
🤲 They chose this service themselves
👀 Paul wants the church to notice
➡️ Willing service deserves real recognition

## 🙏 That Ye Submit Yourselves Unto Such

"Submit" means recognizing someone's leadership and following it willingly.

Paul is not naming an official title or office here.

He is pointing to proven character and faithful service instead.

Authority in the church can grow from service, not just position.

🙏 Submit means following willingly
🚫 No official title is being named
🛠️ Faithful service earned this recognition
📖 Service can be its own authority

## ✉️ The Coming Of Stephanas And Fortunatus And Achaicus

These three names likely belonged to the delegation that carried the Corinthians' letter to Paul.

Their visit gave Paul direct, trustworthy news from Corinth instead of rumors.

Many scholars believe they may have returned to Corinth carrying this very letter back.

Real relationships carried this whole conversation, not just words on a page.

✉️ They likely carried Corinth's letter to Paul
👂 Paul got trustworthy news firsthand
🔄 They may have carried this letter back
📖 Real people carried this whole conversation

## 💧 They Have Refreshed My Spirit And Yours

"Refreshed" pictures a tired traveler finally getting rest and relief.

Their visit encouraged Paul directly during his time in Ephesus.

Paul says the same visit also benefited the Corinthians back home.

Good news and loyal visitors refresh everyone they touch.

💧 Refreshed pictures a tired traveler resting
😌 Paul was personally encouraged
🏠 Corinth benefited too, even from afar
📖 Good news refreshes everyone it touches

# FirstCorinthians 16:19-20
# ✉️ Greetings From The Churches
---
## 🗺️ The Churches Of Asia Salute You

"Asia" here means a Roman province in what is now western Turkey, not the whole continent.

Multiple churches across that region send their greeting together.

This shows Paul's letter and ministry connected churches across a wide area.

No church in this network stood completely alone.

🗺️ Asia was a Roman province, not the continent
⛪ Many churches sent one shared greeting
🔗 Paul's ministry connected distant churches
📖 No church stood completely alone

## 👫 Aquila And Priscilla, With The Church That Is In Their House

Aquila and Priscilla were a married couple who worked closely with Paul in several cities.

Acts eighteen describes them teaching and even correcting a preacher named Apollos.

Church buildings did not exist yet, so believers met inside ordinary homes.

This couple's own house had become a regular meeting place for believers in Ephesus.

👫 Aquila and Priscilla worked closely with Paul
📚 Acts shows them teaching Apollos
🏠 Early churches met inside homes
📖 Their home became a gathering place

## 💋 Greet Ye One Another With An Holy Kiss

A kiss on the cheek was a completely normal greeting across the ancient world.

"Holy" marks this greeting as warm, respectful, and free of any hidden motive.

It worked like a handshake does today, a simple sign of welcome.

Paul wants real affection between believers, not just polite words.

💋 A kiss was a normal ancient greeting
🙏 Holy marks it as respectful and warm
🤝 It worked like a handshake today
➡️ Real affection should back up polite words

# FirstCorinthians 16:21-24
# ✍️ Paul's Own Hand
---
## ✍️ The Salutation Of Me Paul With Mine Own Hand

Paul usually dictated his letters out loud to a scribe who wrote them down.

At the very end he often added a short line in his own handwriting.

That personal signature proved the letter truly came from him.

It guarded against anyone forging a letter in Paul's name.

✍️ Paul usually dictated to a scribe
🖊️ He added a closing line himself
🔏 His handwriting proved the letter real
📖 This guarded against forged letters

## ⚠️ Let Him Be Anathema Maranatha

"Anathema" is a strong word meaning cursed or set apart from God's favor.

"Maranatha" is Aramaic, meaning Our Lord, come.

These are actually two separate phrases placed side by side, not one word.

Paul closes with the most serious warning paired with the church's deepest hope.

⚠️ Anathema means cursed or set apart
🗣️ Maranatha is Aramaic for our Lord, come
✂️ These are two separate phrases
📖 Serious warning sits beside deep hope

## 🎁 The Grace Of Our Lord Jesus Christ Be With You

"Grace" means God's favor given freely, not earned by good behavior.

This exact blessing closes several of Paul's other letters as well.

After pages of correction, Paul still ends by wishing them grace.

Correction and blessing are not opposites in this letter.

🎁 Grace means favor that is not earned
📜 Paul closes other letters this same way
💌 Grace follows even sharp correction
➡️ Correction and blessing can coexist

## ❤️ My Love Be With You All In Christ Jesus

After naming hard problems across the whole letter, Paul still closes on love.

"In Christ Jesus" ties that love to their shared faith, not just personal affection.

"Amen" means let it be so, a final seal on everything just said.

A hard letter can still end with real tenderness.

❤️ Paul closes the letter on love
🙏 In Christ Jesus ties it to shared faith
✅ Amen means let it be so
📖 A hard letter still ended in tenderness
`.trim();

export const FIRST_CORINTHIANS_SIXTEEN_PERSONAL_SECTIONS = parseFirstCorinthiansSixteenRawNotes(FIRST_CORINTHIANS_SIXTEEN_RAW_NOTES);
