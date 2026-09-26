export type JeremiahSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahSeventeenRawNotes(rawText: string): JeremiahSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 17:${startVerse}` : `Jeremiah 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Jeremiah 17 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_SEVENTEEN_RAW_NOTES = `# Jeremiah 17:1-4
# ✏️ Sin Carved In Stone
---
## ✏️ Written With A Pen Of Iron, And With The Point Of A Diamond

An iron pen and a diamond point could cut into solid stone.

That is not writing that a breeze can blow away like sand.

Judah's sin is engraved the very same permanent way.

Some sin runs too deep to simply fade with time.

✏️ Iron pen means a tool for engraving stone

💎 Diamond point could cut through anything

🪨 This sin is carved in permanently

📖 Some sin does not just fade away

## 📜 Graven Upon The Table Of Their Heart

"Table" is an old word for a flat stone tablet.

God's own law was once carved onto tablets just like this at Sinai.

Now this generation's sin fills that same carved space instead.

Their own hearts hold the evidence of what they chose.

📜 Table means a flat stone tablet

🗿 God's law was once carved this way

💔 Sin now fills that same space

📖 Their hearts hold the evidence

## 🐂 The Horns Of Your Altars

"Horns" were the four pointed corners rising from each corner of an altar.

Priests touched those horns with sacrificial blood to seek forgiveness.

Judah's sin is engraved even there, at the exact spot built for pardon.

The place meant to remove guilt is stained by guilt instead.

🐂 Horns means the altar's four corners

🩸 Blood touched them seeking forgiveness

⚠️ Even this sacred spot is stained

📖 The place for pardon holds guilt instead

## 🏔️ Thy Substance And All Thy Treasures To The Spoil

God addresses Judah directly here.

He calls it "my mountain in the field."

That mountain pictures Jerusalem, a city once precious to God.

"Spoil" means plunder carried off by a conquering army.

Generations of gathered wealth are about to be seized.

None of that treasure will offer any real protection.

🏔️ My mountain in the field means Jerusalem

📦 Spoil means goods taken as plunder

💰 Generations of wealth will be seized

📖 Riches cannot shield against judgment

## 🔥 A Fire In Mine Anger, Which Shall Burn For Ever

"Heritage" means the promised land God had already given Judah.

Losing it means being forced to serve strangers in a foreign land.

Fire here pictures God's judgment burning through completely.

"For ever" describes how thorough that judgment will be.

Sin like this carries consequences that reach far into the future.

🏡 Heritage means their promised inheritance

⛓️ They will serve strangers in exile

🔥 Fire pictures judgment burning through

📖 Sin's consequences reach far into the future

# Jeremiah 17:5-8
# 🌳 Two Trees, Two Trusts
---
## ⚠️ Cursed Be The Man That Trusteth In Man

"Cursed" means placed under God's judgment instead of His blessing.

This warning is not about having friends or leaders in life.

It is about looking to people instead of God for ultimate security.

Anyone who builds their whole life on human strength ends up let down.

⚠️ Cursed means under God's judgment

🙅 Not about having friends or leaders

🏗️ It means ultimate trust in people

📖 God alone deserves ultimate trust

## 💪 Maketh Flesh His Arm

"Arm" in scripture is a picture of strength or power.

"Flesh" means human beings, limited and mortal.

To make flesh your arm means leaning on human power as your true strength.

That kind of strength always runs out eventually.

💪 Arm pictures strength or power

👤 Flesh means limited human beings

🏗️ This means leaning on human power

📖 Human strength eventually runs out

## 🌵 Like The Heath In The Desert

"Heath" is an old word for a low, stunted desert shrub.

It survives in dry ground but it never truly flourishes.

The man who trusts in himself instead of God lives the same way.

He will not even notice when good things finally come.

🌵 Heath means a stunted desert shrub

🏜️ It survives but never flourishes

😶 That man misses good when it comes

📖 Self reliance leaves a person parched

## 🙏 Blessed Is The Man That Trusteth In The LORD

"Blessed" describes God's favor and security resting on someone.

This verse directly answers verse five.

One man is cursed.

The other is blessed.

Trusting the LORD here means daily reliance, not one decision.

Hope becomes solid ground instead of something uncertain.

🙏 Blessed means God's favor and security

⚖️ This directly answers verse five's curse

🔁 Trust here means daily reliance

📖 Hope in God becomes solid ground

## 🌳 As A Tree Planted By The Waters

This tree's roots reach down to a steady river.

Even during a drought, deep roots keep pulling in water.

Its leaves stay green and it keeps bearing fruit anyway.

Trusting God does not promise an easy life.

It promises a rooted life that keeps bearing fruit through hard years.

🌳 Roots reach down to steady water

🍃 Drought does not stop this tree

🍇 It keeps bearing fruit anyway

📖 Trust roots a person through hard years

# Jeremiah 17:9-11
# 🎭 The Deceitful Heart
---
## 🎭 The Heart Is Deceitful Above All Things

"Deceitful" means something that misleads, even the person who owns it.

The heart here does not mean just emotions.

It means the whole inner self, motives included.

People can talk themselves into believing their own excuses.

Nobody can fully trust their own read on their own motives.

🎭 Deceitful means it misleads its own owner

❤️ Heart means the whole inner self

🤥 People believe their own excuses

📖 Nobody fully knows their own motives

## 🫘 I The LORD Search The Heart, I Try The Reins

"Reins" is an old word for the kidneys.

Ancient people believed the kidneys held a person's deepest feelings.

God says here that He examines both the heart and the reins completely.

He judges a person by what their life actually produces.

🫘 Reins is an old word for kidneys

🧭 Ancient people saw them as conscience

🔍 God examines the whole inner person

📖 God judges by what a life produces

## 🥚 As The Partridge Sitteth On Eggs, And Hatcheth Them Not

A partridge in this culture was known for stealing eggs from other nests.

Those stolen eggs often would not hatch at all.

A person who gains wealth unfairly ends up the very same way.

Whatever was grabbed does not stay in their hands for long.

🥚 Partridges were known to steal eggs

🐣 Stolen eggs never actually hatched

💰 Unfair wealth disappears the same way

📖 Dishonest gain never truly lasts

# Jeremiah 17:12-13
# 💧 The Fountain Of Living Waters
---
## 🏛️ A Glorious High Throne From The Beginning

"Sanctuary" means the temple, where God's presence dwelled among His people.

This verse calls it a glorious throne that has stood since the very beginning.

Human kings in Judah are about to fall.

God's own throne was never actually shaken.

🏛️ Sanctuary means the temple itself

👑 God's throne has stood since the beginning

📉 Human kings are about to fall

📖 God's throne was never shaken

## 💧 The Fountain Of Living Waters

"Living waters" means water from a flowing spring, always moving and fresh.

Stored water in a cistern can run dry or turn stale.

Jeremiah already used this same picture back in chapter two.

God is the one constant source of life.

💧 Living waters means fresh flowing water

🪣 Stored water can run dry or spoil

🔁 Jeremiah used this picture before

📖 God is the constant source of life

## 🌍 They That Depart From Me Shall Be Written In The Earth

Names written in dust or soft ground wash away with the first rain.

That is the opposite of a name engraved in stone with an iron pen.

Anyone who abandons God is promised that same fading legacy.

Nothing about a life like that holds up over time.

🌍 Written in the earth means it fades

🌧️ Rain and wind erase it quickly

🪨 It is the opposite of stone engraving

📖 Abandoning God leaves no lasting legacy

# Jeremiah 17:14-18
# 🙏 Jeremiah's Honest Prayer
---
## 🙏 Heal Me, O LORD, And I Shall Be Healed

Jeremiah shifts here from preaching to Judah into his own personal prayer.

"Heal" and "save" cover more than just physical sickness.

They cover the exhaustion of years spent delivering a message nobody wanted.

Repeating the prayer this way is Jeremiah building his own confidence in God.

🙏 Jeremiah turns to personal prayer

😞 Years of rejection have worn him down

💊 Heal covers more than physical sickness

📖 Repeating the prayer builds his confidence

## 😏 Where Is The Word Of The LORD? Let It Come Now

This question comes from people mocking Jeremiah, not from Jeremiah himself.

He had warned of coming disaster for years without seeing it arrive yet.

His critics taunt him publicly, daring the judgment to actually show up.

Being a faithful prophet did not protect Jeremiah from ridicule.

😏 This mocking question targets Jeremiah

⏳ Disaster had not visibly arrived yet

🗣️ Critics taunted him publicly

📖 Faithfulness did not spare him ridicule

## 🐑 I Have Not Hastened From Being A Pastor To Follow Thee

"Pastor" is an old word for shepherd, describing Jeremiah's role guiding the people.

"Hastened" means he never rushed ahead of what God actually told him to say.

Jeremiah did not secretly want the coming disaster to happen either.

He delivered a hard message out of obedience, not personal desire.

🐑 Pastor is an old word for shepherd

🚫 He never rushed ahead of God's word

😔 He did not want disaster to come

📖 Obedience drove the message, not desire

## 😨 Be Not A Terror Unto Me

Jeremiah delivers terrifying warnings to others throughout this book.

Here he admits he does not want to be afraid of God himself.

He asks instead that God remain his hope on hard days.

A prophet can announce judgment and still trust God's care for himself.

😨 Jeremiah fears becoming afraid himself

🙏 He asks God to be his hope

⚖️ He announces judgment yet still trusts God

📖 Fear and hope can exist side by side

## 😳 Let Them Be Confounded That Persecute Me

"Confounded" means thrown into confusion and public shame.

Jeremiah names his own persecutors specifically here.

He asks that they face that shame instead of him.

This kind of raw honest prayer also fills the Psalms.

😳 Confounded means thrown into shame

🎯 Jeremiah names his own persecutors

🔄 He asks for their shame, not his

📖 Raw honesty like this fills the Psalms

## ✖️ Destroy Them With Double Destruction

"Double" echoes the same word already used for Judah's own punishment.

Jeremiah is not asking for petty personal revenge here.

He ties his persecutors to the same judgment already announced for the nation.

Bringing raw anger straight to God is safer than acting on it.

✖️ Double echoes the nation's own judgment

🚫 Not simple personal revenge

🔗 Ties enemies to the wider judgment

📖 Prayer is safer than taking revenge

# Jeremiah 17:19-23
# 🗓️ Keep The Sabbath Holy
---
## 🚪 Stand In The Gate Of The Children Of The People

City gates were the busiest public spot in an ancient city.

Legal matters, trading, and everyday foot traffic all passed through them.

God tells Jeremiah to preach there instead of only inside the temple.

This message was meant to reach everyone, not just religious insiders.

🚪 Gates were the busiest public spot

⚖️ Legal matters and trade happened there

📢 Preaching there reached everyone in town

📖 God wanted no one left out

## 🗓️ Bear No Burden On The Sabbath Day

The sabbath was one day in seven set apart for rest.

God had commanded that rest generations earlier at Sinai.

"Burden" here just means ordinary loads carried for work or trade.

God specifically bans carrying those loads through the city gates that day.

🗓️ Sabbath means one day set apart

📦 Burden means ordinary work loads

🚫 Carrying loads through the gates was banned

📖 A small test reveals real obedience

## ✨ Hallow Ye The Sabbath Day

"Hallow" means to treat something as holy, set apart from ordinary use.

Keeping the sabbath was never a new rule in Jeremiah's time.

God had already commanded it generations earlier.

This call simply asks Judah to return to a promise it had broken.

✨ Hallow means to treat as holy

🗓️ The sabbath sets one day apart

📜 This command dates back to Sinai

📖 It asks for a return, not something new

## 🐂 Made Their Neck Stiff

A "stiff neck" is an old picture of stubborn refusal.

It compares Judah to a stubborn animal that will not turn.

This is not one moment of disobedience.

It describes generations that refused correction again and again.

🐂 Stiff neck pictures stubborn refusal

🚫 Like an animal that will not turn

🔁 This describes years of refused correction

📖 Stubbornness becomes a lasting pattern

# Jeremiah 17:24-27
# 🔥 The Sabbath Promise And Warning
---
## 👑 Kings And Princes Sitting Upon The Throne Of David

God attaches a huge promise to one small daily choice here.

If Judah keeps the sabbath, kings from David's own line keep ruling.

The city stays filled with people, chariots, and worship instead of standing empty.

One weekly command carries the weight of the whole nation's future.

👑 David's throne symbolizes the whole dynasty

🏙️ Obedience keeps the city thriving

🐎 Kings and people keep filling it

📖 A small choice carries a big weight

## 🤝 This City Shall Remain For Ever

This is a genuine offer, not decoration.

The promise depended entirely on whether Judah actually obeyed.

History records that Jerusalem was destroyed only years after this warning.

The city's fall was a choice, not something forced on them.

🤝 The offer was genuine, not empty

⚖️ Everything depended on real obedience

📜 Jerusalem fell only years later

📖 The nation's fall was a choice

## 🔥 Then Will I Kindle A Fire In The Gates Thereof

God ties this fire directly to disobedience at the sabbath gates.

"Palaces" here means the grand buildings tied to the city's wealth.

People broke the sabbath trying to protect their trade.

That very trade ends up destroyed instead.

🔥 The fire matches the sabbath warning

🏛️ Palaces means the city's grand buildings

💸 Protected trade gets destroyed instead

📖 Disobedience opens the door to judgment
`.trim();

export const JEREMIAH_SEVENTEEN_PERSONAL_SECTIONS = parseJeremiahSeventeenRawNotes(JEREMIAH_SEVENTEEN_RAW_NOTES);
