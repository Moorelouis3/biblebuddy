export type NumbersTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyNineRawNotes(rawText: string): NumbersTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 29:${startVerse}` : `Numbers 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 29 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_NINE_RAW_NOTES = `# Numbers 29:1-6
# 🎺 Trumpets For The Seventh Month
---
## 🍂 An Holy Convocation

"Convocation" means a required sacred gathering, not a casual meeting.

This is the seventh month, called Tishri, arriving in early autumn.

Israel counted its year from Nisan in spring, the month of the Exodus.

But Tishri carried its own weight, almost like a sabbath among months.

Three major feasts cluster inside this single month.

Trumpets on day one, Atonement on day ten, Tabernacles from day fifteen to twenty two.

🍂 Convocation means a required sacred gathering

📆 Tishri opens Israel's autumn festival season

🔟 Trumpets, Atonement, and Tabernacles fill this month

📖 A whole month set apart for God

## 🎺 A Day Of Blowing The Trumpets

The trumpet here is a shofar, a ram's horn, not a metal instrument.

In the ancient world, a horn blast like this announced a king's arrival.

Everyone within earshot knew to stop and pay attention.

Later Jewish tradition renamed this day Rosh Hashanah, meaning head of the year.

That tradition treats the blast as a wake up call before repentance.

🎺 A shofar is a ram's horn trumpet

👑 The blast once announced a king's arrival

🗓️ Later tradition calls this day Rosh Hashanah

📖 The sound calls Israel to attention

## 🛑 Ye Shall Do No Servile Work

"Servile work" means ordinary paid labor.

It was the daily grind of a hired worker.

On this day, all of that stopped completely.

This same rule already governed every festival day in Israel's calendar.

By now the command felt familiar, not surprising.

🛑 Servile work means ordinary paid labor

😴 All daily labor stopped for the day

🔁 The same rule covered every festival day

📖 A familiar pause, not a surprise

## 🐂 One Young Bullock, One Ram, And Seven Lambs

This animal count is smaller than expected for a festival day.

Numbers 28:11 already required two bullocks for the routine monthly New Moon offering.

Trumpets calls for only one bullock here.

Verse six explains why, other offerings already stack underneath this one.

A festival day did not automatically mean a bigger sacrifice.

🐂 One bullock here, fewer than New Moon's two

📉 A festival day is not automatically bigger

🧮 Verse six explains why the count looks small

📖 Every number in this system carries a reason

## 🐐 To Make An Atonement For You

Even a joyful trumpet blast day still required a sin offering.

A burnt offering expressed devotion to God.

A sin offering covered guilt the people may not have even noticed.

Joy and honesty about guilt sit side by side here.

🐐 A sin offering appears on a joyful day

🙏 Burnt offerings express devotion to God

😔 Sin offerings cover guilt people may not notice

📖 Joy and honesty about sin travel together

## ➕ According Unto Their Manner

"According unto their manner" is legal shorthand.

It means using the ratios already spelled out earlier.

The phrase saves the text from repeating the same numbers.

This day is also the New Moon.

Trumpets always falls on day one of the month.

Three layers of offering hit the altar at once here.

The daily offering, the New Moon offering, and Trumpets itself.

"Their drink offerings" means wine poured out beside the grain.

✂️ After their manner means using the same ratios

🌕 This day doubles as the New Moon too

🍷 Drink offerings means wine poured with the grain

📖 Three offerings stack on this single day

# Numbers 29:7-11
# 🕯️ Atonement's Extra Offering
---
## 📅 The Tenth Day Of This Seventh Month

This fixed date is Yom Kippur, the Day of Atonement.

It is the most solemn day on Israel's entire calendar.

It falls exactly ten days after the trumpet blast of verse one.

That gap gave the nation a short window to prepare.

📅 A fixed date, the tenth day of Tishri

🕯️ The most solemn day on Israel's calendar

⏳ It falls ten days after Trumpets

📖 A short window to prepare before this day

## 😔 Ye Shall Afflict Your Souls

"Afflict your souls" is an old idiom for fasting.

It meant going without food for the whole day.

It also meant setting aside ordinary comforts and pleasures.

The whole nation paused together to focus on repentance.

😔 Afflict your souls is an idiom for fasting

🍽️ Israel went without food for the entire day

🙏 Ordinary comforts were set aside for the day

📖 A whole nation paused together for repentance

## 🚫 Ye Shall Not Do Any Work Therein

Every other festival day in this calendar bans servile work.

That means ordinary paid or forced labor only.

This day goes further and bans any work at all.

No exceptions were allowed on the Day of Atonement.

It stands as the strictest rest command in the whole chapter.

🚫 This day bans any work at all

🔒 No exceptions were allowed on this one day

⚖️ Every other feast day only bans servile work

📖 The strictest rest command in the whole chapter

## 🐐 Beside The Sin Offering Of Atonement

This calendar goat is an addition, not a replacement.

Leviticus 16 describes the real Day of Atonement ceremony.

There the high priest offered a bull and two goats.

One goat was killed and one was sent into the wilderness.

That second goat became known as the scapegoat.

It carried the sins of the whole nation away for the year.

🐐 This offering adds to a bigger ceremony

🐏 One goat was sent away as the scapegoat

🙏 It carried the nation's sin for the year

📖 Leviticus 16 holds the fuller Atonement story

# Numbers 29:12-16
# 🌿 Tabernacles Begins
---
## 🌿 Ye Shall Keep A Feast Unto The LORD Seven Days

This is the Feast of Tabernacles, also called Sukkot.

Leviticus 23 explains why Israel kept this feast.

Israel built and lived in temporary leaf shelters for the week.

That remembered how their ancestors lived during the wilderness years.

It doubled as a harvest festival too.

Farmers called it the Feast of Ingathering once crops were gathered in.

🌿 Also called Sukkot, the Feast of Booths

🏕️ Israel lived in leaf shelters for the week

🌾 It doubled as a fall harvest festival

📖 One week honored both wilderness and harvest

## 🐂 Thirteen Young Bullocks, Two Rams, And Fourteen Lambs

Thirteen bullocks in a single day is the largest count in this whole calendar.

It is bigger than Trumpets, bigger than Atonement, bigger than the New Moon.

Tabernacles closes out the religious year as its longest festival.

This number also opens a countdown that runs the rest of the chapter.

Watch the bullock count drop by one every day this week.

🐂 The largest single day bullock count yet

📈 Bigger than Trumpets, Atonement, or the New Moon

📉 A countdown begins that runs all week

📖 Tabernacles closes the year as its biggest festival

## 📏 A Several Tenth Deal To Each Lamb

"Several" is an old word for a separate portion.

It does not mean many, the way it can today.

Each of the fourteen lambs got its own measured tenth deal of flour.

The grain was counted out one lamb at a time.

Precision mattered even at the largest scale of the year.

🔍 Several means a separate portion, not many

🐑 Each lamb got its own measured tenth deal

⚖️ Each animal's grain was measured separately

📖 Precision mattered even at the year's largest offering

## 🔥 Beside The Continual Burnt Offering

This sin offering closes verse sixteen.

It sits on top of the offering that never stops.

The continual burnt offering ran morning and evening every day of the year.

Even the biggest festival never paused that underlying daily rhythm.

Celebration never replaced the steady, ongoing offering underneath it.

🔥 The continual offering ran every morning and evening

🐐 A sin offering still stacks on top

🎉 Even festival days did not pause this rhythm

📖 Celebration never replaced the ongoing daily offering

# Numbers 29:17-25
# 📉 Days Two Through Four
---
## 🐂 Twelve Young Bullocks, Two Rams, Fourteen Lambs

Day two drops the bullock count by exactly one.

Yesterday's offering called for thirteen bullocks.

Today calls for twelve instead.

The rams and lambs stay fixed at two and fourteen.

Only the bullock number moves from day to day.

🐂 Twelve bullocks, one fewer than day one

🐑 Rams and lambs stay fixed all week

📉 Only the bullock count changes daily

📖 A steady countdown running under the feast

## ✂️ According To Their Number, After The Manner

"After the manner" points back to the ratios given for day one.

It means using those same fixed ratios again.

The text does not need to repeat every number a second time.

This same shorthand phrase will return on every remaining day of the feast.

✂️ After the manner means using day one's ratios

🔁 It saves the text from repeating every number

📏 This phrase returns again on each remaining day

📖 Only the totals change, not the formula

## 🐂 Eleven Bullocks, Two Rams, Fourteen Lambs

Day three drops the count to eleven.

The pattern is now unmistakable.

One fewer bullock than the day before, every single day.

Rams and lambs have not changed since day one.

🐂 Eleven bullocks, continuing the countdown

🔁 The pattern is now fully established

🐑 Rams and lambs still have not changed

📖 One fewer bullock, day after day

## 🐂 Ten Bullocks, Two Rams, And Fourteen Lambs

Day four brings the count down to ten.

Thirteen down to seven marks the whole week's countdown.

Ten sits exactly at its midpoint.

Three more days of the countdown remain after this one.

🐂 Ten bullocks, the countdown's exact midpoint

📊 Halfway through the seven day feast

⏳ Three more days of counting down remain

📖 The pattern holds steady through the middle

# Numbers 29:26-34
# 🔥 Countdown To Seven
---
## 🐂 Nine Bullocks, Two Rams, And Fourteen Lambs

Day five continues the steady drop.

Nine bullocks are called for today.

Only two days remain in the feast after this one.

The countdown has not broken its pattern once.

🐂 Nine bullocks, day five of the countdown

⏳ Two days remain in the feast

🔁 The pattern has not broken once

📖 Steady repetition is the point, not filler

## 🐂 Eight Bullocks, Two Rams, And Fourteen Lambs

Day six brings the count to eight.

Only one day remains after this one.

The number seven is coming next.

Every other part of the offering stays exactly the same.

🐂 Eight bullocks, one step from the final number

⏳ Only one day remains after this one

🔢 Seven is the number coming up next

📖 The finish line of the countdown is near

## 🐂 And On The Seventh Day Seven Bullocks

Seven bullocks closes the countdown that began at thirteen.

Add up every day's bullocks across the whole week.

Thirteen, twelve, eleven, ten, nine, eight, seven.

That list totals exactly seventy.

Later Jewish tradition ties seventy to the seventy nations of Genesis chapter ten.

That tradition comes from a later Jewish writing called the Talmud.

It reads this feast as Israel praying for the whole world.

🐂 Seven bullocks, the countdown's final number

➕ Thirteen down to seven totals seventy

🌍 Later tradition ties seventy to Genesis's seventy nations

📖 A tidy, deliberate finish, not a coincidence

## 🔥 His Meat Offering, And His Drink Offering

This same closing trio appears on day five, six, and seven.

A sin offering, the continual burnt offering, and its drink offering.

None of these three ever changed across the whole week.

Only the bullock count above them ever moved.

Consistency itself carried a lesson about God's unchanging character.

🔥 The same closing trio repeats every day

🐐 A sin offering sits inside all seven days

🍷 Drink offerings never varied across the week

📖 Only the bullock count above ever changed

# Numbers 29:35-38
# 🕯️ The Eighth Day
---
## 🕯️ A Solemn Assembly

Every other festival day in this chapter used the phrase holy convocation.

This closing day uses different wording, translated solemn assembly.

The Hebrew word behind it means something closer to held back.

It carries the sense of the people not being allowed to leave yet.

Later Jewish tradition named this day Shemini Atzeret, the eighth day of holding back.

Centuries later, John 7:37 is set during this very feast.

Jesus stood up and offered living water to anyone thirsty.

🕯️ Solemn assembly replaces holy convocation here

✋ The Hebrew sense is being held back

🗓️ Later tradition names this day Shemini Atzeret

📖 John 7:37 sets Jesus at this very feast

## 🛑 Ye Shall Do No Servile Work Therein

The same labor rule used all chapter closes out even this quiet day.

It bans only servile work, the ordinary paid labor of a hired worker.

That is a lighter rule than Atonement's ban on any work at all.

Rest still mattered even after a long festival week.

🛑 The same servile work rule closes the calendar

⚖️ Lighter than Atonement's ban on any work

😮 Rest still mattered after a long festival week

📖 Basic rules held firm to the very end

## 🐂 One Bullock, One Ram, Seven Lambs

After a week that peaked at thirteen bullocks, the offering drops back to one.

This is the smallest package in the whole two chapter calendar.

It matches the modest size used for Trumpets back in verse two.

The year's biggest festival closes quietly instead of with one more large offering.

🐂 Drops to one, the smallest count of all

📉 A striking contrast to day one's thirteen

🎺 It matches the modest size of Trumpets

📖 The biggest festival ends on the smallest note

# Numbers 29:39-40
# 📜 Vows, Freewill Gifts, And Moses' Report
---
## 🎁 Beside Your Vows, And Your Freewill Offerings

Everything listed across chapters twenty eight and twenty nine was a required floor.

It was never meant as a ceiling on what Israel could give.

A vow was a promise made to God, often during a crisis.

It was paid once the crisis had passed.

A freewill offering was an extra gift nobody required.

It was given simply out of gratitude.

📜 The two chapters together set the floor

🙏 A vow is a promise paid once answered

🎁 A freewill offering is extra, given freely

📖 Required offerings were the minimum, never the limit

## 🍽️ Your Peace Offerings

A peace offering was a shared meal built around a sacrifice.

Part of the animal was burned for God.

Part went to the priests.

The rest was eaten by the family who brought it.

A sin offering dealt with guilt.

A peace offering celebrated a relationship already at peace with God.

🍽️ A peace offering was a shared meal

🔥 Part burned for God, part for the priest

👪 The rest was eaten by the offerer's family

📖 It celebrated peace already made with God

## ✅ According To All That The LORD Commanded Moses

This closing line matches the opening line of Numbers chapter twenty eight.

There Moses was first told to command Israel with this exact calendar.

The two chapters bookend each other from start to finish.

God gave the command, and Moses passed on every detail faithfully.

Nothing in this long calendar was left out or shortened along the way.

✅ This bookends chapter twenty eight's opening line

📋 God commanded, and Moses passed it on fully

🔁 Nothing here got shortened or left out

📖 A faithful messenger for a very long list
`.trim();

export const NUMBERS_TWENTY_NINE_PERSONAL_SECTIONS = parseNumbersTwentyNineRawNotes(NUMBERS_TWENTY_NINE_RAW_NOTES);
