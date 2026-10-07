export type ZechariahSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahSevenRawNotes(rawText: string): ZechariahSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 7:${startVerse}` : `Zechariah 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Zechariah 7 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_SEVEN_RAW_NOTES = `# Zechariah 7:1-3
# 📨 A Delegation Asks About Fasting
---
## 📆 In The Fourth Year Of King Darius

Darius ruled the Persian empire that had let the Jewish exiles return home.

Nearly two years have passed since the eight visions in chapters one through six.

The temple itself was still being rebuilt while this new question arrived.

That unfinished rebuilding project is exactly why the question even came up.

👑 Darius ruled the Persian empire
📆 Nearly two years after the earlier visions
🏗️ The temple was still being rebuilt
➡️ The rebuilding explains why this question matters

## 🗓️ The Fourth Day Of The Ninth Month, Even In Chisleu

Chisleu is the Hebrew name for the ninth month on their calendar.

It falls where our November and December overlap.

Giving the exact day shows this message was a real event, not a vague memory.

Prophets in this book care about precise dates, not loose seasons.

🗓️ Chisleu names the ninth Hebrew month
🌙 It falls near November and December
📍 An exact day marks a real event
📖 Precise dates separate history from legend

## 👤 They Had Sent Unto The House Of God Sherezer And Regemmelech

Sherezer and Regemmelech were real men sent on a real errand, not symbols in a vision.

The house of God names the temple, even while it stood unfinished.

Sending envoys there meant reaching whoever the priests and prophets gathered around.

Naming real people grounds this question in an actual moment in Judah's history.

👤 Sherezer and Regemmelech were real men
🏛️ House of God names the temple
📍 The temple still stood unfinished
📖 Real names ground this in real history

## 🙏 To Pray Before The LORD

Praying before the LORD here means asking for an official ruling, not offering a casual prayer.

The envoys traveled all the way to the temple to get that answer from God himself.

Questions about religious practice were brought to priests and prophets, never decided alone.

This delegation wanted permission before changing something that had lasted for decades.

🙏 This prayer sought an official ruling
🏛️ They traveled to the temple for it
❓ Such questions were never decided alone
➡️ They wanted permission before changing practice

## 😢 Should I Weep In The Fifth Month, Separating Myself

Separating myself describes fasting, an old way of showing deep grief through the body.

The fifth month fast remembered the day Babylon burned Solomon's temple to the ground.

That fire happened about seventy years before this very question was asked.

The question really asks whether an old grief still needs the same response.

😢 Separating myself describes fasting
🔥 The fifth month mourned the temple's burning
📆 That happened about seventy years earlier
📖 The question asks if old grief still fits

## 📆 As I Have Done These So Many Years

These so many years points to about seven decades of this same yearly fast.

That stretch is close to how long the exile itself lasted.

The temple was now being rebuilt, which is exactly why the old habit felt uncertain.

A ritual born in grief does not automatically know when grief should end.

📆 These years point to seven decades of fasting
🏗️ The temple was now being rebuilt
❓ The old habit suddenly felt uncertain
📖 Grief rituals do not know when to end

# Zechariah 7:4-7
# ❓ Was It Really For Me
---
## 🗣️ Then Came The Word Of The LORD Of Hosts Unto Me

That formula marks a direct message from God, not Zechariah's own opinion.

Two visitors brought a narrow question, but the coming answer reaches everyone.

God often widens a small question into something much bigger than first asked.

What follows is not really about one fast on one calendar date.

🗣️ A direct message now comes from God
👥 Only two visitors had brought the question
🌍 God widens the answer to everyone
📖 The real issue is bigger than one fast

## 🔥 In The Fifth And Seventh Month, Even Those Seventy Years

The fifth month fast already explained mourned the temple's destruction.

A seventh month fast remembered a governor named Gedaliah, murdered after Jerusalem fell.

Both fasts had been kept every single year since the exile began.

Seventy years matches the very span the prophet Jeremiah had already promised the exile would last.

🔥 The fifth month mourned the temple
⚔️ The seventh month mourned Gedaliah's murder
📆 Both fasts repeated every single year
📖 Seventy years matches Jeremiah's own promise

## ❓ Did Ye At All Fast Unto Me, Even To Me

This does not mean God never noticed their fasting at all.

The real question is whether the fasting was aimed at him or only at their own sorrow.

Repeating even to me twice makes the challenge impossible to soften or explain away.

A religious habit can run on empty long after the heart behind it fades.

❓ This questions the fasting's real target
🔁 Even to me repeats for emphasis
💔 Sorrow is not the same as worship
📖 Habits can outlast the heart behind them

## 🍞 Did Not Ye Eat For Yourselves, And Drink For Yourselves

Fasting is not the only habit God questions in this chapter.

Feast days built around eating and drinking get the exact same challenge.

Both the sorrow of fasting and the joy of feasting had become about the people themselves.

Neither one was wrong by itself, but neither one was truly about God either.

🍞 Feasting gets the same challenge as fasting
😋 Both habits centered on the people
🙃 Sorrow and joy both missed the point
📖 Neither ritual was truly about God

## 🏙️ When Jerusalem Was Inhabited And In Prosperity

This looks back to the years before Jerusalem ever fell to Babylon.

The city was full of people then, and the land around it was thriving.

Prophets like Isaiah and Jeremiah warned the people clearly during exactly those good years.

Nobody listened until the warnings stopped being warnings and became history.

🏙️ Jerusalem was once full and thriving
📜 Earlier prophets warned during those years
🙉 Nobody listened while things were good
📖 Ignored warnings eventually become history

## 🗺️ The South And The Plain

The south names the dry region later called the Negev.

The plain names the lower, flatter farmland known as the Shephelah.

Naming both regions together pictures the whole land, not just the capital city.

Every corner of the country had once been full of people before the fall.

🏜️ The south refers to the Negev
🌾 The plain refers to the Shephelah
🗺️ Together they picture the whole land
📖 The whole country once stood full

## 📜 The Words Which The LORD Hath Cried By The Former Prophets

The former prophets means messengers like Isaiah and Jeremiah, sent before the exile.

Cried pictures God's message as an urgent shout, not a quiet suggestion.

Those same warnings went unheeded back when the land was still safe.

Zechariah now stands on the other side of exactly what those warnings predicted.

📜 Former prophets means Isaiah, Jeremiah, and others
📢 Cried pictures an urgent shout
🙉 Those warnings went unheeded back then
📖 Zechariah stands after they came true

# Zechariah 7:8-10
# ⚖️ True Justice And Mercy
---
## 🔁 The Word Of The LORD Came Unto Zechariah

That same formula repeats from verse four, marking a second, separate message.

The first message explained the people's history of empty fasting and feasting.

This second message now gives the actual command they should have been living out all along.

History comes first, then instruction, through this entire chapter.

🔁 This repeats the formula from verse four
📜 The first message explained their history
📋 This message gives the real command
📖 History comes before instruction here

## 📯 Thus Speaketh The LORD Of Hosts

That opening formula announces a formal decree, not a personal suggestion.

Prophets used this exact wording across the Old Testament to mark God's own words.

What follows carries the same weight as the law given at Sinai.

Nobody could later claim this command came only from Zechariah himself.

📯 This formula announces a formal decree
📜 Prophets used this wording across scripture
⛰️ It carries the weight of Sinai's law
📖 The command comes from God, not Zechariah

## ⚖️ Execute True Judgment

Judgment here means decisions made in court, not a general attitude.

True judgment means a verdict that actually matches the facts, not the richer party's wishes.

Courts across the ancient world could easily be bought by whoever had more money or power.

God's command assumes some judges were choosing comfort over truth.

⚖️ Judgment means legal decisions in court
✅ True means matching the real facts
💰 Richer parties could normally buy a verdict
📖 God demands truth over comfort

## 🕊️ Shew Mercy And Compassions Every Man To His Brother

Shew is an old spelling of show, meaning to put something into action.

Mercy means holding back punishment that someone actually deserves.

Compassion means actually feeling the weight of another person's suffering.

Brother here names a fellow Israelite, bound to the same covenant and the same God.

👁️ Shew is an old way of saying show
🕊️ Mercy means holding back deserved punishment
❤️ Compassion means feeling another's suffering
📖 Brother means a fellow covenant member

## 🥀 Oppress Not The Widow, Nor The Fatherless, The Stranger, Nor The Poor

These four groups could not easily defend themselves in any court.

Widows had no husband left to speak for them.

The fatherless, the stranger, and the poor all faced that same kind of powerlessness.

This same group gets protected throughout the first five books of the Bible.

Oppressing any one of them was treated as an offense against God himself.

🥀 Widows had no husband to defend them
🧒 The fatherless had no father's protection
🧳 Strangers had no family network nearby
📖 Harming them offends God himself

## 🧠 Let None Of You Imagine Evil Against His Brother In Your Heart

This command is not only about what people do.

Imagining evil describes secretly planning harm before it ever becomes an action.

Leviticus already commanded against hating a brother in your heart, long before this chapter.

God's standard for true judgment reaches all the way down to private thoughts.

🚫 This bans more than outward actions
🧠 Imagining evil means secretly planning harm
📜 Leviticus commanded this same heart standard
📖 God's standard reaches private thoughts too

# Zechariah 7:11-14
# 🌬️ They Refused To Hear And Were Scattered
---
## 🐂 Pulled Away The Shoulder

This idiom pictures a work animal jerking its shoulder away from the yoke on it.

An ox like that refuses to pull, no matter how well the harness fits.

The people are pictured the exact same way, refusing the direction God offered them.

Refusing a yoke like this is a decision, not confusion.

🐂 This pictures an ox refusing its yoke
🙅 The people refused God's direction the same way
🔁 The image makes stubbornness visible
📖 Refusing guidance was a decision, not confusion

## 🙉 Stopped Their Ears, That They Should Not Hear

This phrase describes a deliberate choice, not a hearing problem.

Stopping their ears pictures someone physically covering them to block out a sound.

The purpose clause, that they should not hear, removes any excuse of accident.

Willful deafness is harder to fix than simple confusion.

🙉 This describes a deliberate choice
🖐️ It pictures physically blocking the ears
🎯 The purpose clause removes any excuse
📖 Willful deafness resists even correction

## 💎 Made Their Hearts As An Adamant Stone

Adamant names one of the hardest stones known in the ancient world.

A heart like that cannot be shaped, softened, or reached by any appeal.

Ezekiel later promises God will replace a heart like this with a heart of flesh.

This chapter shows exactly why that later promise would ever be needed.

💎 Adamant names one of the hardest stones
🚫 A hardened heart cannot be reached
🔁 Ezekiel later promises a softer heart instead
📖 This hardness explains why that promise matters

## 🔥 Therefore Came A Great Wrath From The LORD Of Hosts

This wrath follows a long pattern, it does not start one.

It comes directly from a hardened heart that refused repeated warnings.

Many prophets had already carried this same message before judgment ever arrived.

Wrath here is the last step after every earlier step was ignored.

🔥 This wrath followed, it did not start
📜 Many prophets had already warned them
🪨 It followed a heart that refused to soften
📖 Judgment arrives after every warning is ignored

## 🔁 So They Cried, And I Would Not Hear

This verse mirrors the exact wording of their own earlier refusal back at God.

The people once refused to hear God's prophets speaking on his behalf.

Later, in exile, their own cries meet that same refusal in return.

This is not cruelty, it is their own pattern handed back to them.

🔁 This mirrors their own earlier refusal
🙉 They once refused to hear God's prophets
😢 Their later cries meet the same refusal
📖 Their own pattern is handed back to them

## 🌪️ I Scattered Them With A Whirlwind Among All The Nations Whom They Knew Not

A whirlwind pictures sudden, violent, uncontrollable force, not a gentle breeze.

Scattering among nations they knew not points to real deportations under Assyria and Babylon.

Families were split apart and sent to places they had never even heard of before.

The same hand that once offered mercy now carried out this judgment.

🌪️ A whirlwind pictures sudden violent force
🗺️ They were deported to unfamiliar nations
👨‍👩‍👧 Entire families were scattered and separated
📖 The hand offering mercy now judged instead

## 🌾 They Laid The Pleasant Land Desolate

Pleasant land recalls the same fertile country already pictured back in verse seven.

That full, thriving land now sits empty, with no one left to pass through it.

They once refused mercy to the poor among them.

Now the whole land shares that same poverty and emptiness.

The chapter opened with a question about fasting and ends with the land itself in mourning.

🌾 This recalls the fertile land from verse seven
🏜️ That land now sits completely empty
💔 They once refused mercy to the poor
📖 The whole land now mourns in their place
`.trim();

export const ZECHARIAH_SEVEN_PERSONAL_SECTIONS = parseZechariahSevenRawNotes(ZECHARIAH_SEVEN_RAW_NOTES);
