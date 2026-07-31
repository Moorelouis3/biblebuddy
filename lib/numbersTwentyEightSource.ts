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

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 28 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_EIGHT_RAW_NOTES = `# Numbers 28:1-2
# 📅 A Calendar Of Offerings, In Their Due Season
---
## 📢 Command The Children Of Israel
Everything that follows in this chapter is a direct order, not friendly advice. Moses is told to relay it word for word to the whole nation, so nobody could later claim they simply didn't know the schedule.

📢 A direct command, not a suggestion

👥 Addressed to every Israelite, not just the priests

🔑 Ignorance of this calendar was never going to be an excuse

## 🍞 My Offering, And My Bread For My Sacrifices Made By Fire
God calls these offerings His own "bread," even though He has no physical need to eat. This is picture-language borrowed from ordinary meals shared between people who trust each other. Offering food regularly to God pictured Israel staying in an ongoing relationship with Him, the way sharing a table did between people in this culture.

🍞 "Bread" is a figure of speech, not a literal need

🤝 Regular meals pictured an ongoing relationship, ancient Near Eastern style

🔑 The chapter is really about staying in rhythm with God, not just feeding an altar

## 👃 A Sweet Savour Unto Me
"Savour" is an old word for smell or aroma. Calling a burnt offering's smoke a "sweet savour" doesn't mean God enjoys smoke the way a person enjoys a scent. It's the Bible's way of saying the offering was accepted and pleasing, done the right way, for the right reason.

👃 "Savour" is an old word for smell

✅ Marks an offering as accepted, not just performed

🔑 This phrase repeats through the whole chapter every time a new offering type is described

## 📆 Ye Shall Observe To Offer Unto Me In Their Due Season
"Due season" means a fixed, appointed time, not whenever it happens to be convenient. This one line sets up the whole chapter: a fixed rhythm of daily, weekly, monthly, and yearly offerings that never changes based on people's moods or schedules.

📆 Introduces a set, repeating religious calendar

🔁 Daily, weekly, monthly, and yearly patterns are about to be listed, in that order

🔑 Worship here runs on God's schedule, not personal convenience

# Numbers 28:3-8
# 🌅 The Daily Offering That Never Stops
---
## 🔥 This Is The Offering Made By Fire Which Ye Shall Offer Unto The LORD
This introduces what's often called the "continual" or "daily" offering, the base-level sacrifice repeated every single day of the year, no matter what else is happening in Israel's life.

🔥 The most basic, repeating sacrifice in Israel's whole system

📅 Offered every day, with no exceptions

🔑 This same law first appears back in Exodus 29:38-42, given at Sinai

## 🐑 Two Lambs Of The First Year Without Spot, Day By Day
"First year" means young, healthy animals in their prime, not old or weak ones. "Without spot" means no visible defect, blemish, or injury. Israel wasn't allowed to hand God its leftover or damaged animals.

🐑 Young, healthy lambs only

🚫 "Without spot" rules out any visible defect

🔑 God consistently gets Israel's best, not its leftovers

## 🌅 The One Lamb Shalt Thou Offer In The Morning, And The Other Lamb...At Even
Splitting the offering across morning and evening bookends every single day with worship. Israel's daily rhythm literally opened and closed with a sacrifice, the same pattern repeated every day for centuries.

🌅 One lamb offered at sunrise

🌇 One lamb offered at sunset

🔑 Worship bookends the entire day, every day

## 🌾 A Tenth Part Of An Ephah Of Flour...Mingled With The Fourth Part Of An Hin Of Beaten Oil
An ephah was a dry measure, somewhere around three gallons by modern estimate. A tenth of one, called an "issaron" in Hebrew, was the standard small unit used for grain offerings. A hin was a liquid measure, roughly a gallon and a half, so a fourth of a hin was a modest amount of oil mixed into the flour.

🌾 Ephah = a dry measure, roughly three gallons

🫙 Hin = a liquid measure, roughly a gallon and a half

🔑 These exact units repeat throughout the chapter for every offering type

## 🫒 Beaten Oil
"Beaten" oil was made by crushing olives by hand in a mortar rather than pressing them in a heavy olive press. It produced a purer, higher-grade oil than the ordinary press method, so this detail is a quiet way of saying only the best oil qualified.

🫒 Made by hand-crushing olives, not pressing them

⭐ A higher grade than ordinary press oil

🔑 Another small sign that God receives Israel's best, not its ordinary stock

## 📜 It Is A Continual Burnt Offering, Which Was Ordained In Mount Sinai
This isn't a new law. It's Moses reminding Israel of a command already given back at Sinai in Exodus 29:38-42, decades earlier. By the time of Numbers 28, Israel is camped on the plains of Moab about to enter Canaan, and this old law is being restated so the daily rhythm continues in the new land too.

📜 A callback to Exodus 29:38-42, not a brand-new law

🗺️ Restated as Israel prepares to enter Canaan

🔑 The point being made: this daily rhythm was never meant to stop

## 🍷 The Drink Offering Thereof...Strong Wine...Poured Unto The LORD
A drink offering was wine poured out at the altar, not wine anyone drank. Pouring it out completely, with nothing held back or saved, made the gift final and total rather than partial.

🍷 Wine poured out completely, not consumed by anyone

🚫 Nothing kept back or saved

🔑 A visual picture of total, no-strings-attached giving

## 🥖 As The Meat Offering Of The Morning...Of A Sweet Savour Unto The LORD
In the King James Bible, "meat" is an old general word for food, not specifically animal flesh. The "meat offering" here is really a grain offering, the flour-and-oil mixture from verse 5, paired with the evening lamb the same way it was paired with the morning lamb.

🥖 "Meat offering" is old English for a grain offering, not meat

🔁 The evening sacrifice repeats the same grain-and-oil pattern as the morning

🔑 Every sacrifice in this chapter combines an animal, grain, and wine together

# Numbers 28:9-10
# 🗓️ Doubling Up For The Sabbath
---
## ✖️ Two Lambs...And Two Tenth Deals Of Flour...Mingled With Oil, And The Drink Offering Thereof
On the Sabbath, Israel didn't replace the daily offering, it doubled it. Two lambs instead of one, with double the grain and oil to match, marked the day as more significant without changing the basic pattern.

✖️ Every quantity from the daily offering is doubled

🗓️ Sets the Sabbath apart as a heightened day

🔑 Same ingredients as the daily offering, just twice as much

## ➕ This Is The Burnt Offering Of Every Sabbath, Beside The Continual Burnt Offering
"Beside" here means "in addition to," not "instead of." The Sabbath offering was stacked on top of the regular daily offering, not a substitute for it, so on a Sabbath, Israel's altar was actually busier, not quieter.

➕ "Beside" means added on top of, not swapped in

🔥 The daily offering still happened even on the Sabbath

🔑 A pattern that repeats for every special day in the rest of the chapter

# Numbers 28:11-15
# 🌙 Marking Every New Month
---
## 🌙 In The Beginnings Of Your Months Ye Shall Offer A Burnt Offering Unto The LORD
Israel's calendar was based on the moon, so a new month began at each new moon. This monthly marker gave the nation a regular, built-in rhythm for pausing to worship roughly every 29 or 30 days, on top of the weekly Sabbath.

🌙 Israel's months were tracked by the lunar cycle

📆 A worship rhythm layered on top of the weekly Sabbath

🔑 Later Jewish tradition calls this day Rosh Chodesh, "head of the month"

## 🐂 Two Young Bullocks, And One Ram, Seven Lambs Of The First Year Without Spot
This is a noticeably bigger offering than the Sabbath's two lambs, now bullocks and a ram join the lineup. The size of an offering tracked the size of the occasion: bigger day, bigger sacrifice.

🐂 Two young bulls plus a ram now join the lambs

📈 A clearly larger offering than the weekly Sabbath's

🔑 This exact combination becomes the standard "special occasion" package for the rest of the chapter

## ⚖️ Three Tenth Deals Of Flour...For One Bullock; And Two Tenth Deals...For One Ram; And A Several Tenth Deal...For One Lamb
The grain offering scaled with the size of the animal, more flour for a bull than a ram, and more for a ram than a lamb. "Several" here is an old word meaning "a separate, individual" portion for each animal, not "many."

⚖️ Grain amounts scale to match each animal's size

📖 "Several" means "one separate portion each," an old usage

🔑 Nothing here is random, every quantity follows a fixed ratio

## 🍷 Half An Hin Of Wine Unto A Bullock, And The Third Part Of An Hin Unto A Ram, And A Fourth Part Of An Hin Unto A Lamb
The wine poured out scaled the same way as the flour, more for the larger animals. This same three-tier ratio, half, a third, and a fourth of a hin, becomes the standard formula reused for every large offering later in the chapter.

🍷 Wine amounts scale in the same three tiers as the grain

🔁 This exact ratio repeats at every major feast later in the chapter

🔑 A consistent system, not a one-time set of numbers

## 🐐 One Kid Of The Goats For A Sin Offering, Beside The Continual Burnt Offering
This is the chapter's first sin offering, a different kind of sacrifice than everything before it. A burnt offering expressed devotion and worship; a sin offering specifically dealt with guilt and covered unintentional wrongdoing the community may not even have realized it committed.

🐐 The chapter's first sin offering, a new offering type

🙏 Burnt offerings express devotion; sin offerings deal with guilt

🔑 Even a joyful new-month celebration includes a reminder that sin still needs covering

# Numbers 28:16-25
# 🐑 Passover And The Days Of Unleavened Bread
---
## 📅 In The Fourteenth Day Of The First Month Is The Passover Of The LORD
Passover always fell on the same fixed date, the fourteenth day of Israel's first month, called Abib or Nisan. This is the anniversary of the night God struck Egypt's firstborn but passed over Israelite homes marked with lamb's blood, described back in Exodus 12.

📅 A fixed yearly date, the 14th of the first month

🩸 Marks the anniversary of Exodus 12's original Passover night

🔑 Israel is told to keep re-living this event every single year

## 🍞 In The Fifteenth Day Of This Month Is The Feast: Seven Days Shall Unleavened Bread Be Eaten
Passover itself was a single night, but it was immediately followed by a separate seven-day festival, the Feast of Unleavened Bread. During this week, no leaven (yeast) was allowed in any bread, recalling how Israel left Egypt in such a hurry there was no time to let bread rise.

🍞 A separate 7-day feast starting the day after Passover

🚫 No yeast/leaven allowed anywhere during the week

🔑 Recalls the rushed, no-time-to-wait exit from Egypt in Exodus 12:34

## 📯 In The First Day Shall Be An Holy Convocation
A "holy convocation" was a required, sacred gathering of the whole community, not an optional worship service. Missing it wasn't treated as a personal choice, it was a break from a national, commanded assembly.

📯 A required sacred assembly, not an optional service

👥 The whole community was expected to gather

🔑 The first and seventh days of this feast are both treated this way

## 🛑 Ye Shall Do No Manner Of Servile Work Therein
"Servile work" meant the kind of paid or forced labor a servant would normally do, ordinary farm work, business, and trade. On this day, that kind of labor stopped completely across the whole nation.

🛑 "Servile work" means ordinary paid or forced labor

🚜 Farm work, trade, and business all paused

🔑 This day functioned like an extra Sabbath inside the festival week

## 🔁 Two Young Bullocks, And One Ram, And Seven Lambs Of The First Year: They Shall Be Unto You Without Blemish
This is the exact same animal count used for the New Moon offering back in verse 11: two bulls, one ram, seven lambs. Israel used one standard "special occasion" package and applied it to every major appointed time, rather than inventing a new formula for each one.

🔁 The identical animal count as the New Moon offering in verse 11

📦 One reusable "big occasion" package, not a new formula each time

🔑 Recognizing the repeated pattern makes the whole chapter far easier to follow

## 📏 Their Meat Offering Shall Be Of Flour Mingled With Oil: Three Tenth Deals...For A Bullock, And Two Tenth Deals For A Ram
The grain measurements here match the same three-tier ratio explained back in verses 12-14. The text keeps repeating the exact numbers on purpose, because every appointed feast was expected to follow the identical standard, with no shortcuts.

📏 The same three-tier ratio as the New Moon offering

🔂 Deliberately repeated, not accidentally duplicated

🔑 Consistency itself was part of the point, no feast got a discount

## 🐐 One Goat For A Sin Offering, To Make An Atonement For You
Even during Israel's most joyful national festival, a sin offering was still required. "Atonement" means covering over guilt so a right relationship with God could continue. Joy and the need for forgiveness weren't treated as opposites here.

🐐 A sin offering included even during a celebration

🕊️ "Atonement" means covering guilt, restoring relationship

🔑 Celebration and repentance sit side by side in Israel's worship

## ➕ Ye Shall Offer These Beside The Burnt Offering In The Morning, Which Is For A Continual Burnt Offering
Even during a major seven-day festival, the ordinary daily morning-and-evening offering from earlier in the chapter never paused. Every special offering was always additional, stacked on top of the baseline rhythm, never a replacement for it.

➕ The daily offering continues underneath the festival offerings

🔁 The same "addition, not replacement" pattern as the Sabbath

🔑 Israel's worship rhythm never actually stopped, even during the biggest weeks of the year

## 🔁 After This Manner Ye Shall Offer Daily, Throughout The Seven Days...Beside The Continual Burnt Offering, And His Drink Offering
This whole bundle of sacrifices, bulls, ram, lambs, grain, wine, and sin offering, wasn't a one-time event on day one. It repeated in full every single day for all seven days of the festival, on top of the twice-daily continual offering.

🔁 The full offering bundle repeats every day for 7 days

📅 Not a single event, but a week-long daily pattern

🔑 Passover week meant seven full days of heightened worship, not one

## 📯 On The Seventh Day Ye Shall Have An Holy Convocation; Ye Shall Do No Servile Work
The festival closes exactly the way it opened, with another required sacred assembly and a full stop on ordinary labor. Bookending the week with matching holy days framed the whole seven days as one continuous sacred unit.

📯 A matching holy convocation closes the week

🛑 The same no-servile-work rule as day one

🔑 The bookend structure marks the whole week as a single sacred unit, not just its first day

# Numbers 28:26-31
# 🌾 The Feast Of Firstfruits
---
## 🌾 Also In The Day Of The Firstfruits, When Ye Bring A New Meat Offering Unto The LORD, After Your Weeks Be Out
This is the Feast of Firstfruits, later called the Feast of Weeks, and centuries later, Pentecost in the New Testament. "After your weeks be out" points back to Leviticus 23:15-16, which commands counting seven full weeks, forty-nine days, starting from an earlier firstfruits offering, then celebrating on the fiftieth day.

🌾 Also called the Feast of Weeks, later Pentecost

🔢 Counted 49 days (7 weeks) from an earlier firstfruits offering, per Leviticus 23:15-16

🔑 Marked the grain harvest reaching completion

## 📯 Ye Shall Have An Holy Convocation; Ye Shall Do No Servile Work
The same required assembly and work-stoppage rule from the Passover week applies here too. By this point in the chapter, this exact phrase has appeared several times, showing how consistently Israel's calendar treated its major feast days.

📯 The same holy-convocation rule seen earlier in the chapter

🔁 Consistent treatment across every major feast day

🔑 A reader could now predict this phrase before reading it

## 🔁 Ye Shall Offer...Two Young Bullocks, One Ram, Seven Lambs Of The First Year
Once again, this is the identical standard "big occasion" package first seen at the New Moon offering and repeated at Passover: two bulls, one ram, seven lambs. Three completely different holidays, spread across the whole year, all use the exact same animal count.

🔁 The third appearance of the same fixed animal count

📦 New Moon, Passover, and now Firstfruits all match exactly

🔑 One standard package used everywhere, easy to recognize once you spot it

## 📏 Their Meat Offering Of Flour Mingled With Oil...And Their Drink Offerings
The grain and wine amounts follow the same three-tier scaling used every other time in this chapter. By now, the pattern is fully established: whichever feast it is, the ratio between bullock, ram, and lamb portions never changes.

📏 Same three-tier grain-and-wine ratio as every prior feast

🔂 A fixed system rather than case-by-case decisions

🔑 Repetition itself teaches that God's worship system doesn't play favorites between feasts

## 🐐 One Kid Of The Goats, To Make An Atonement For You
A sin offering closes out this feast too, just like the New Moon and Passover offerings before it. No matter how joyful or agriculturally focused a festival was, Israel's calendar never let the people forget that guilt still needed to be dealt with honestly.

🐐 A sin offering included at every major feast in this chapter

🕊️ Joy and honesty about guilt are treated as compatible, not opposites

🔑 A repeated reminder rather than a one-time lesson

## ➕ Ye Shall Offer Them Beside The Continual Burnt Offering...They Shall Be Unto You Without Blemish
The chapter's closing line repeats its opening theme one last time: every special offering is added on top of the daily rhythm, never a replacement for it, and every animal offered all year long has to be without blemish. The whole chapter's structure, daily, weekly, monthly, yearly, rests on that same unchanging foundation.

➕ The chapter closes by repeating its own "addition, not replacement" rule

🚫 "Without blemish" bookends the chapter, first mentioned in verse 3

🔑 Every layer of Israel's calendar rests on the same unmoving daily foundation
`.trim();

export const NUMBERS_TWENTY_EIGHT_PERSONAL_SECTIONS = parseNumbersTwentyEightRawNotes(NUMBERS_TWENTY_EIGHT_RAW_NOTES);
