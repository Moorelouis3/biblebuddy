export type NumbersTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyEightRawNotes(rawText: string): NumbersTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 28:${startVerse}` : `Numbers 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 28 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_EIGHT_RAW_NOTES = `# Numbers 28:1-2
# 📅 A Command For Every Offering, In Its Season
---
## 📢 Command The Children Of Israel

This law was not offered as a suggestion.

God tells Moses to relay it word for word to the whole nation.

Every Israelite heard the same command, not just the priests.

Nobody could later claim they simply did not know the schedule.

📢 A direct command, not advice

👥 Given to the whole nation

🕍 Not limited to the priests

➡️ No one could claim ignorance

## 🍞 My Offering, And My Bread For My Sacrifices Made By Fire

"Bread" here means food, used as a picture, not a literal need.

God does not need to eat.

Sharing a meal was how people in this culture sealed a close relationship.

Calling these offerings His bread pictured Israel staying close to God.

That picture runs through the rest of the chapter.

🍞 Bread means food, not literal

🤝 Meals sealed close relationships then

❤️ Israel pictured closeness with God

📖 This picture repeats all chapter

## 👃 A Sweet Savour Unto Me

"Savour" is an old word for smell.

Calling the offering's smoke a sweet savour does not mean God enjoys smoke.

It means the offering was accepted.

It was done the right way, for the right reason.

This exact phrase repeats every time a new offering appears.

👃 Savour is an old smell word

✅ Marks an offering as accepted

🔥 Not about God enjoying smoke

📖 The phrase repeats all chapter

## 📆 In Their Due Season

"Due season" means a fixed, appointed time.

It does not mean whenever it happens to be convenient.

This phrase sets up the whole chapter.

A daily, weekly, monthly, and yearly rhythm is about to be listed, in that order.

Worship here runs on God's calendar, not on personal convenience.

📆 Due season means a fixed time

🔁 Not whenever is convenient

📅 Sets up the whole chapter's rhythm

📖 God sets the calendar, not people

# Numbers 28:3-8
# 🌅 The Daily Offering That Never Stops
---
## 🔥 This Is The Offering Made By Fire

This introduces the continual offering, the most basic sacrifice in Israel's system.

"Continual" means it never stopped, offered every single day of the year.

No feast, no crisis, no change of season ever paused it.

This same law first appears back in Exodus 29:38, given at Mount Sinai.

🔥 Continual means it never stopped

📅 Offered every day, no exceptions

🏔️ First given back at Mount Sinai

📖 Exodus 29:38 records the same law

## 🐑 Two Lambs Of The First Year Without Spot

"First year" means young, healthy animals still in their prime.

"Without spot" means no visible defect, blemish, or injury.

Israel could not hand God its leftover or damaged animals.

Every sacrifice in this chapter has to meet this same standard.

🐑 First year means young and healthy

🚫 Without spot means no defect

💎 God received Israel's best animals

📖 Every offering meets this standard

## 🌾 A Tenth Part Of An Ephah Of Flour

An ephah was a dry measure, close to three gallons in modern terms.

A tenth of an ephah was the standard small unit used for grain offerings.

A hin was a liquid measure, close to a gallon and a half.

These same units repeat for every offering type in the chapter.

🌾 Ephah is a dry measure

🫙 Hin is a liquid measure

📏 Both units repeat all chapter

📖 Grain and oil measured this way

## 🫒 Beaten Oil

"Beaten" oil was made by crushing olives by hand instead of pressing them.

Hand crushing produced a purer, better grade of oil than the ordinary press method.

This detail quietly says only the best oil qualified for God's offering.

Small details like this show up throughout the chapter.

🫒 Beaten means crushed by hand

⭐ A higher grade than pressed oil

💎 Only the best oil qualified

📖 Small details carry this same point

## 🍷 The Drink Offering...Strong Wine Poured Unto The LORD

A drink offering was wine poured out at the altar.

It was not wine anyone drank.

Pouring it out completely, with nothing saved back, made the gift whole.

The wine was gone the moment it was given, not shared or stored.

🍷 Wine poured out, not shared

🚫 Nothing was kept back or saved

🎁 The gift became whole and final

📖 Giving here left nothing behind

## 🏔️ Ordained In Mount Sinai

This law was not new when Moses repeated it here.

It had already been given decades earlier, back at Mount Sinai.

By Numbers 28, Israel is camped on the plains of Moab, ready to enter Canaan.

This old law was restated so the same daily rhythm would continue in the new land.

🏔️ Not a new law here

📜 First given decades earlier at Sinai

🗺️ Israel now nears the promised land

📖 The daily rhythm was never meant to stop

# Numbers 28:9-10
# 🗓️ Doubling Up For The Sabbath
---
## ✖️ Two Lambs...And Two Tenth Deals Of Flour

On the Sabbath, Israel did not replace the daily offering.

It doubled it instead.

Two lambs instead of one, with double the grain and oil to match.

Doubling marked the day as more significant without changing the pattern itself.

✖️ Every amount doubled that day

🗓️ Marks the Sabbath as special

🔁 Same pattern, just twice as much

📖 More is offered, not something different

## ➕ Beside The Continual Burnt Offering

"Beside" here means added on top of, not instead of.

The Sabbath offering did not replace the daily offering.

It stacked directly on top of it.

On the Sabbath, Israel's altar was actually busier, not quieter.

This word beside repeats for every special day named in the rest of the chapter.

➕ Beside means added, not swapped in

🔥 The daily offering still happened

📈 The Sabbath altar grew busier

📖 This word repeats all chapter

# Numbers 28:11-15
# 🌙 Marking Every New Month
---
## 🌙 In The Beginnings Of Your Months

Israel's calendar followed the moon.

A new month began at each new moon.

This gave the nation a regular worship rhythm, every twenty nine or thirty days.

It came on top of the weekly Sabbath, not instead of it.

Later Jewish tradition calls this day Rosh Chodesh, meaning head of the month.

🌙 Israel's months followed the moon

📆 A worship rhythm on top of Sabbath

🕎 Later called Rosh Chodesh in Jewish tradition

📖 Head of the month is what it means

## 🐂 Two Young Bullocks, And One Ram, Seven Lambs

This offering is noticeably bigger than the Sabbath's two lambs.

Bullocks and a ram now join the lineup.

The size of an offering tracked the size of the occasion.

This same combination becomes the standard package reused for the rest of the chapter.

🐂 Bulls and a ram join now

📈 A bigger offering than the Sabbath

📦 Marks a bigger occasion overall

📖 This package repeats through the chapter

## ⚖️ A Several Tenth Deal

"Several" here is an old word meaning a separate, individual portion.

It does not mean "many," the way the word is used today.

Each animal in the offering got its own separate portion of flour.

The grain amount scaled with the size of the animal, more for a bull than a lamb.

⚖️ Several meant separate, not many

🌾 Each animal got its own portion

📏 More flour for bigger animals

📖 A fixed ratio runs the chapter

## 🐐 One Kid Of The Goats For A Sin Offering

This is the chapter's first sin offering, a different kind of sacrifice.

A burnt offering expressed devotion and worship.

A sin offering specifically covered guilt, even guilt the people did not realize they carried.

Even a joyful new month included a reminder that sin still needed covering.

🐐 The chapter's first sin offering

🙏 Burnt offerings express devotion and worship

⚖️ Sin offerings cover hidden guilt

📖 Joy and guilt sit side by side

# Numbers 28:16-19
# 🐑 Passover And The Feast Begins
---
## 📅 The Fourteenth Day...Is The Passover Of The LORD

Passover always fell on the same fixed date, the fourteenth day of the first month.

That month was called Abib, later known as Nisan.

The date marks the night God struck Egypt's firstborn.

Israelite homes marked with lamb's blood were passed over that night.

Israel was told to relive this event every single year.

📅 A fixed date every year

🩸 Marks the night of the Exodus

🏠 Israelite homes were passed over

📖 Israel relived this every year

## 🍞 Seven Days Shall Unleavened Bread Be Eaten

Passover itself was a single night.

It was followed right away by a separate seven day festival.

During that week, no leaven, meaning yeast, was allowed in any bread.

This recalled how Israel left Egypt in such a hurry there was no time for bread to rise.

🍞 A separate feast follows Passover

🚫 No yeast allowed all week

🏃 Recalls Israel's rushed exit from Egypt

📖 Bread had no time to rise

## 📯 An Holy Convocation

A holy convocation was a required, sacred gathering of the whole community.

It was not an optional worship service.

Missing it was not treated as a personal choice.

It was a break from a national, commanded assembly.

📯 A required sacred gathering

👥 The whole community had to attend

🚫 Not an optional service

📖 Missing it broke a national command

## 🛑 No Manner Of Servile Work

"Servile work" meant the paid or forced labor a servant would normally do.

That included ordinary farm work, trade, and business.

On this day, that kind of labor stopped completely across the whole nation.

This day functioned like an extra Sabbath inside the festival week.

🛑 Servile work means ordinary labor

🌾 Farm work and trade both paused

🇮🇱 The whole nation stopped together

📖 It worked like an extra Sabbath

# Numbers 28:20-25
# 🔥 A Week Of Daily Worship
---
## 🕊️ To Make An Atonement For You

"Atonement" means covering over guilt so a right relationship with God can continue.

This word appears here for the first time in the chapter.

Even during Israel's most joyful national festival, this covering was still required.

Joy and the need for forgiveness were never treated as opposites.

🕊️ Atonement means covering guilt

🎉 Required even during a festival

🤝 Restores a right relationship with God

📖 Joy and forgiveness are not opposites

## 🔁 After This Manner Ye Shall Offer Daily, Throughout The Seven Days

This whole bundle of sacrifices was not a one time event on day one.

Bulls, a ram, lambs, grain, wine, and a sin offering repeated in full every day.

It happened for all seven days of the festival.

The twice daily continual offering kept running underneath it the entire time.

🔁 The full bundle repeats daily

📅 Seven days, not just one

🔥 The continual offering runs underneath

➡️ A week of heightened worship, not a day

## 📯 On The Seventh Day Ye Shall Have An Holy Convocation

The festival closes exactly the way it opened.

Another required sacred assembly marks this final day.

Ordinary labor stops completely, just like on day one.

Matching holy days on both ends frame the whole week as one sacred unit.

📯 Closes the same way it opened

🛑 Labor stops again, like day one

🔗 Bookends frame the whole week

➡️ One sacred unit, not scattered days

# Numbers 28:26-31
# 🌾 The Feast Of Firstfruits
---
## 🌾 The Day Of The Firstfruits, After Your Weeks Be Out

This is the Feast of Firstfruits, also called the Feast of Weeks.

Centuries later, the New Testament calls this same day Pentecost.

"After your weeks be out" points to a count of forty nine days from an earlier firstfruits offering.

Leviticus 23:15 commands that count, seven full weeks.

The day marked the grain harvest reaching its completion.

🌾 Also called the Feast of Weeks

✝️ Later known as Pentecost

🔢 Counted forty nine days from firstfruits

📖 Marked the grain harvest complete

## 🚫 They Shall Be Unto You Without Blemish

The chapter closes by repeating its opening theme.

Every special offering was added on top of the daily rhythm.

It was never a replacement for it.

Every animal offered all year had to be without blemish.

That same requirement was first named back in verse three.

The whole chapter rests on that same unmoving daily foundation.

🚫 Without blemish required all year

🔁 Special offerings, never a replacement

🏛️ The daily rhythm holds it together

📖 One steady foundation the whole chapter
`.trim();

export const NUMBERS_TWENTY_EIGHT_PERSONAL_SECTIONS = parseNumbersTwentyEightRawNotes(NUMBERS_TWENTY_EIGHT_RAW_NOTES);
