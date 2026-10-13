export type RomansThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansThirteenRawNotes(rawText: string): RomansThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 13:${startVerse}` : `Romans 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Romans 13 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_THIRTEEN_RAW_NOTES = `# Romans 13:1-7
# 👑 Submit To The Higher Powers
---
## 👑 Subject Unto The Higher Powers

"Subject" means to willingly place yourself under someone else's authority.

"Higher powers" means the government officials who hold legal authority over a nation.

Paul is not talking about personal opinions here.

He is talking about every Roman citizen and every believer in Rome.

Government was not an afterthought to God.

He built structure and order into human society on purpose.

👑 Subject means placed under authority
🏛️ Higher powers means government officials
🌍 This applied to every believer in Rome
📖 God built order into human society

## ⚡ There Is No Power But Of God

God stands behind every ruler's authority.

Every government leader holds power only because God allows it.

No king, president, or official rules apart from God's permission.

That does not mean every ruler acts in a godly way.

It means the authority itself still traces back to God.

⚡ God stands behind all authority
👑 No ruler rules apart from God
🚫 Approval of authority is not approval of actions
📖 Authority itself traces back to God

## 😠 Resisteth The Ordinance Of God

"Ordinance" means an official order or structure that has been set in place.

Paul says resisting lawful authority is the same as resisting what God Himself set up.

This does not mean a ruler can never be disobeyed no matter what.

Later in Acts, Peter and the other apostles refused to stop preaching when ordered to.

Scripture holds both truths together, real authority and real limits on that authority.

😠 Ordinance means an official structure
🚫 Resisting it means resisting God's design
❓ This is not unlimited obedience
📖 Acts shows real limits on authority

## 🛡️ Not A Terror To Good Works, But To The Evil

"Terror" here means a source of fear, not a modern horror word.

Paul says lawful rulers exist to frighten wrongdoers, not honest people.

A government doing its job should make a thief nervous, not a volunteer at a food pantry.

That is the standard Paul expects government to meet.

Rulers are not supposed to punish people simply for doing right.

🛡️ Terror means a source of fear
😇 Good rulers frighten wrongdoers only
🙅 Honest people should have nothing to fear
📖 Government should never punish good behavior

## 🏅 Thou Shalt Have Praise Of The Same

This does not mean every good deed gets a medal or a trophy.

It means a government doing its job generally notices and rewards good conduct.

In the Roman world, local leaders sometimes publicly honored citizens who served the community well.

Rome itself did this through public inscriptions naming generous citizens.

That pattern of public honor is what Paul has in mind here.

🏅 Praise does not mean a guaranteed reward
🏛️ Just rulers tend to honor good conduct
📜 Rome publicly honored generous citizens
📖 Government should reward good, not punish it

## ⚔️ The Minister Of God To Thee For Good

"Minister" here does not mean a pastor or clergyman.

It means a servant who carries out someone else's will.

Paul is saying government officials act, often without realizing it, as servants of God's purposes.

Their job, done well, actually works for the good of the people under them.

That is a high calling for an office most people treat as purely political.

⚔️ Minister means a servant, not a pastor
🏛️ Officials serve God's purposes, often unknowingly
🤝 Good government works for the people's good
📖 A political office can be a high calling

## 🗡️ He Beareth Not The Sword In Vain

"The sword" symbolizes a government's power to punish crime, even by execution.

Roman governors actually held the legal right to carry out the death penalty.

Paul says that power was not given without purpose.

It exists to restrain evil and protect the innocent.

🗡️ Sword means power to punish crime
⚖️ Rome held real power to execute
🛡️ That power protects the innocent too
📖 Authority to punish was given on purpose

## 🙏 Not Only For Wrath, But Also For Conscience Sake

Obedience to government has two separate reasons behind it.

The first reason is simple, fear of punishment.

The second reason is deeper, a clear conscience before God.

A believer obeys the law for more than just avoiding trouble.

Obedience becomes an act of faith, not only self preservation.

🙏 Two reasons stand behind obedience
😨 One reason is fear of punishment
🕊️ The other is a clear conscience
📖 Obedience can be an act of faith

## 💰 They Are God's Ministers, Attending Continually

"Tribute" was a direct tax paid to the Roman government.

Paul calls tax collectors and officials God's ministers, the same word used for rulers in verse four.

"Attending continually" means this was their full time, ongoing job.

Even a tax collector's desk work fits into God's larger design for order.

💰 Tribute means a direct government tax
🧑‍💼 Tax collectors are called God's ministers too
⏳ Attending continually means a full time job
📖 Even tax work fits God's design for order

## 🏛️ Render Therefore To All Their Dues

"Custom" means a tax charged on goods crossing a border, close to a modern tariff.

Paul lists four separate things that are owed, not only tribute.

"Fear" and "honour" are not money at all.

They are the basic respect owed to the office itself.

Paying what is owed covers both the wallet and simple respect.

🏛️ Four separate things are owed here
🚢 Custom means a tax on goods crossing
🙇 Fear and honour mean basic respect
📖 Obedience covers both money and respect

# Romans 13:8-10
# ❤️ Love Is The Debt Never Paid Off
---
## 💳 Owe No Man Any Thing

Paul is not against paying bills or settling debts.

He already discussed literal financial debts back in verse seven.

This command is about a different kind of debt, the debt of love.

Love is a debt that is never fully paid off.

There is always more of it to give.

💳 This is not about literal bills
🔁 Verse seven already covered real debts
❤️ Love is a different kind of debt
📖 Love can never be fully paid off

## ⚖️ Hath Fulfilled The Law

"Fulfilled" means completed, not just partly followed.

Paul says genuine love toward another person completes everything the law was trying to accomplish.

This does not erase the Ten Commandments.

It reveals what they were always pointing toward.

⚖️ Fulfilled means completed, not partial
❤️ Real love completes the law's purpose
🚫 The commandments are not erased
📖 Love reveals what the law pointed to

## 📜 Briefly Comprehended In This Saying

"Comprehended" here means summed up or gathered together into one statement.

Paul names five of the ten commandments, the ones about how people treat each other.

He then says all of them collapse into a single command, love your neighbor as yourself.

That one sentence was never meant to replace the ten commandments.

It was meant to explain what was behind every one of them from the start.

📜 Comprehended means summed up
🔢 Five commandments are named directly
❤️ All of them collapse into one command
📖 Love explains what was behind them all

## 🌊 Love Worketh No Ill To His Neighbour

"Worketh no ill" means love never actively causes harm to someone else.

This single test can replace a long list of rules in daily life.

If a choice would genuinely hurt another person, love already rules it out.

That is why Paul says love finishes what the whole law was reaching for.

🌊 Worketh no ill means causes no harm
🧭 Love works like a built in test
🚫 Harmful choices are already ruled out
📖 Love finishes what the law reached for

# Romans 13:11-14
# ⏰ Wake Up, The Day Is At Hand
---
## ⏰ High Time To Awake Out Of Sleep

"Sleep" here is a picture for spiritual carelessness, not literal rest.

Paul is not scolding anyone for being tired.

He is warning against drifting through life without paying attention to what matters most.

The wake up call is urgent, not a gentle suggestion.

⏰ Sleep pictures spiritual carelessness
🚫 This is not about literal tiredness
👀 The warning is about drifting through life
📖 This wake up call is urgent

## ⏳ Now Is Our Salvation Nearer

Paul is not saying salvation itself has changed since these believers first trusted Christ.

He means the final day of salvation, when Christ returns, is closer than it was before.

Every day that passes moves that day closer, not further away.

That should change how urgently a believer lives right now.

⏳ Salvation itself has not changed
📅 The final day keeps getting closer
➡️ Every passing day moves it nearer
📖 That should shape how urgently we live

## 🌙 The Night Is Far Spent, The Day Is At Hand

"Night" pictures the present age, still shadowed by sin and waiting.

"Day" pictures the full arrival of Christ, when everything hidden comes into the light.

Paul says the night is almost over, not barely started.

That should create real urgency, not calm indifference.

🌙 Night pictures the present shadowed age
☀️ Day pictures Christ's full arrival
⏳ The night is almost over
📖 That should create real urgency

## 🛡️ The Armour Of Light

"Armour" is protective gear a soldier wears into battle.

Paul is not describing literal metal armor here.

He means the character and conduct that protects a believer from being pulled back into darkness.

Putting it on is a daily choice, not a one time event.

🛡️ Armour means protective battle gear
🚫 This is not literal metal armor
🧍 It means character that resists darkness
📖 Putting it on is a daily choice

## 🚫 Not In Rioting And Drunkenness

"Rioting" here does not mean a violent protest.

It means reckless, excessive partying.

"Chambering" means sexual immorality outside of marriage, and "wantonness" means living with no self control at all.

Paul names these as the kind of life daytime living replaces.

🚫 Rioting means reckless partying, not protest
🛑 Chambering means sexual immorality
⚠️ Wantonness means no self control
📖 Daytime living replaces this old life

## 👕 Put Ye On The Lord Jesus Christ

"Put on" uses the picture of getting dressed each morning.

Paul is not talking about believing a fact about Jesus for the first time here.

He means deliberately choosing Christlike character before the day even starts.

It is a decision made again and again, not just once.

👕 Put on pictures getting dressed
🚫 This is not a one time belief
🌅 It means choosing Christ each morning
📖 The decision repeats every single day

## 🔥 Make Not Provision For The Flesh

"Provision" means advance planning, like packing supplies before a trip.

Paul is not just warning against giving in to temptation in the moment.

He is warning against planning ahead for it, setting up the conditions that make sin likely.

Avoiding sin starts earlier than the moment of choice.

It starts with what a person already planned for.

🔥 Provision means planning ahead
⚠️ Not just about the moment itself
🧭 It warns against future temptation
📖 Avoiding sin starts before it happens
`.trim();

export const ROMANS_THIRTEEN_PERSONAL_SECTIONS = parseRomansThirteenRawNotes(ROMANS_THIRTEEN_RAW_NOTES);
