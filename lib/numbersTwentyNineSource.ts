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

  if (sections.length !== 11) {
    throw new Error("Expected 11 Numbers 29 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_NINE_RAW_NOTES = `# Numbers 29:1-6
# 📯 Trumpets For The Seventh Month
---
## 🍂 In The Seventh Month, On The First Day Of The Month
Israel counted its religious year starting with Nisan in the spring, the month of the Exodus, but the seventh month, later called Tishri, carried its own weight, almost like a "sabbath month" the way the seventh day of the week was already set apart.
Nearly every major fall festival in Israel's whole calendar bunches up inside this one month: Trumpets on day one, the Day of Atonement on day ten, and the week-long Feast of Tabernacles from day fifteen through twenty-two.

🍂 Tishri, the seventh month, falls in early autumn

📆 Trumpets, Atonement, and Tabernacles all cluster into this single month

🔑 The number seven marking this month echoes the weekly Sabbath pattern

## 📯 Ye Shall Have An Holy Convocation...A Day Of Blowing The Trumpets
This festival is built around a single sound: a blast from a ram's horn, called a shofar, not a metal instrument. In the ancient world, a blast like this announced that a king had arrived and everyone needed to pay attention.
Later Jewish tradition renamed this day Rosh Hashanah, "head of the year," and treats the blast as a wake-up call to self-examination before the Day of Atonement ten days later.

📯 A ram's-horn blast (a shofar), not a metal trumpet

👑 The sound worked like an announcement that a king had arrived

🔑 Later Judaism calls this day Rosh Hashanah, the start of the civil year

## 🛑 Ye Shall Do No Servile Work
"Servile work" means the ordinary paid or forced labor a hired servant would normally do all day, farming, trading, running a business. On this day, all of that stopped completely.
This is the same rule used for every major festival day in Israel's calendar, so by this point in the year it was familiar and expected, not a surprise.

🛑 "Servile work" means ordinary paid or forced labor

🔁 The same rule already used for every major feast day

🔑 A recognizable, expected pause, not a surprise

## 🐂 A Burnt Offering For A Sweet Savour...One Young Bullock, One Ram, And Seven Lambs
This is actually a smaller offering than the routine monthly New Moon offering described back in Numbers 28:11, which called for two bullocks instead of one. A festival day didn't automatically mean a bigger sacrifice than an ordinary month.
The reason becomes clear in verse 6: this day already has other offerings stacked underneath it, so the festival package itself can stay modest.

🐂 One bullock here, smaller than the New Moon's two bullocks

📉 Festival days don't automatically mean bigger sacrifices

🔑 Verse 6 explains why: other offerings are already stacked underneath

## 🌾 Their Meat Offering Shall Be Of Flour Mingled With Oil, Three Tenth Deals For A Bullock, And Two Tenth Deals For A Ram
This is the same fixed ratio used throughout Numbers 28: more flour and oil for a bullock than a ram, and more for a ram than a lamb. The amount of grain offered always tracked the size of the animal it accompanied.

🌾 The same fixed flour-to-animal ratio used all through Numbers 28

⚖️ Bigger animal, bigger grain portion

🔑 Nothing here is random, it's one consistent system

## 🐐 One Kid Of The Goats For A Sin Offering, To Make An Atonement For You
Even on a joyful trumpet-blast celebration, a sin offering was still required. A burnt offering expressed devotion, but a sin offering specifically covered guilt the community may not have even realized it carried.

🐐 A sin offering included even on a festival built around celebration

🙏 Burnt offerings express devotion; sin offerings deal with guilt

🔑 Joy and honesty about guilt sit side by side, just like in Numbers 28

## ➕ Beside The Burnt Offering Of The Month, And His Meat Offering, And The Daily Burnt Offering
Trumpets always falls on the first day of the month, which means this day is a double celebration: it's the New Moon and the Feast of Trumpets on the very same day. Three separate layers of offering hit the altar at once: the twice-daily continual offering, the routine monthly New Moon offering, and now the Trumpets festival offering stacked on top of both.
This is why the festival offering itself could stay small, it was never standing alone.

➕ "Beside" means added on top of, not instead of

📚 Three layers of offering stack on this single day: daily, monthly, festival

🔑 Explains why verse 2's animal count looks smaller than expected

## 📏 According Unto Their Manner, For A Sweet Savour
"After their manner" is legal shorthand. It means "using the standard ratios already spelled out earlier," so the text doesn't have to repeat every exact number all over again.

📏 Shorthand for "using the ratios already established"

✂️ Saves the text from repeating the same numbers over and over

🔑 A phrase that will reappear constantly through the rest of the chapter

# Numbers 29:7-11
# 🕯️ The Day Of Atonement's Add-On Offering
---
## 📅 The Tenth Day Of This Seventh Month
This fixed date is Yom Kippur, the Day of Atonement, the most solemn day on Israel's entire calendar. It falls exactly ten days after the trumpet blast of verse 1, giving the nation a short window to prepare.

📅 A fixed date: the 10th day of the 7th month

🕯️ The most solemn day in Israel's whole calendar

🔑 Falls just ten days after the Trumpets of verse 1

## 😔 Ye Shall Afflict Your Souls
"Afflict your souls" is an old idiom for fasting and serious self-denial, not literal self-harm. It meant going without food and setting aside ordinary comforts for the day, so the whole nation could focus on repentance.

😔 An idiom for fasting and self-denial, not physical harm

🍽️ Israel went without food for the day

🔑 A whole-nation pause built around repentance

## 🚫 Ye Shall Not Do Any Work Therein
Every other festival day in this calendar bans "servile work," ordinary paid labor. This day goes further and bans "any work" at all, no exceptions. It's the strictest rest command in the whole chapter.

🚫 Bans "any work," stricter wording than "servile work" elsewhere

🔒 The strictest rest command in this entire chapter

🔑 Matches how seriously Israel treated this one day

## 🐂 A Burnt Offering...One Young Bullock, One Ram, Seven Lambs...Without Blemish
Like Trumpets before it, the animal package here stays modest, just one bullock. The real weight of this day wasn't in the size of this calendar sacrifice, it was in the elaborate, separate Day of Atonement ceremony described back in Leviticus 16.

🐂 A modest package again, just one bullock

📖 The day's real weight sits in Leviticus 16, not in this list

🔑 "Without blemish" still applies, same standard as every other offering

## ⚖️ Their Meat Offering...After The Manner
Same fixed ratio, same shorthand phrase already explained in verse 6. Grain and oil scale to match the bullock, ram, and lambs exactly the way they do everywhere else in this chapter.

⚖️ The same grain-to-animal ratio used all through the chapter

🔁 "After the manner" again, this time for the Atonement offerings

🔑 Consistency itself is part of the design

## 🐐 One Kid Of The Goats For A Sin Offering, Beside The Sin Offering Of Atonement
This line points back to the huge, separate ceremony in Leviticus 16, where the high priest offered a bull and two goats, one killed and one sent out into the wilderness as the "scapegoat," to cover the sins of the entire nation for the year. This calendar goat in Numbers 29 is an addition on top of that whole ceremony, not a replacement for it.

🐐 Points back to the full Leviticus 16 Day of Atonement ceremony

🐏 That ceremony included the famous "scapegoat," sent away into the wilderness

🔑 This is an add-on offering, not the main event of the day

# Numbers 29:12-16
# 🌿 Tabernacles Begins: The Biggest Day Of Sacrifice
---
## 🌿 In The Fifteenth Day...Ye Shall Keep A Feast Unto The LORD Seven Days
This is the Feast of Tabernacles, also called Sukkot or the Feast of Booths. Leviticus 23:42-43 explains the name: Israel built and lived in temporary leaf-and-branch shelters for the week, remembering how their ancestors lived in similarly fragile shelters during the wilderness wandering after the Exodus.
It doubled as a fall harvest festival too, sometimes called the Feast of Ingathering, celebrated once the year's grain and fruit had all been gathered in.

🌿 Also called Sukkot, the Feast of Booths

🏕️ Israel lived in temporary leaf shelters for the week, per Leviticus 23:42-43

🔑 Also a harvest festival, celebrating the year's gathered crops

## 🐂 Thirteen Young Bullocks, Two Rams, And Fourteen Lambs Of The First Year Without Blemish
Thirteen bullocks in a single day is the largest animal count anywhere in this whole sacrificial calendar, bigger than Trumpets, bigger than Atonement, even bigger than the New Moon. Tabernacles closes out the religious year, and the offering size matches its importance as the last and longest festival before winter.

🐂 The single largest bullock count in the entire calendar

📈 Marks Tabernacles as the year's biggest, longest festival

🔑 The size of the offering again tracks the size of the occasion

## 📉 A Countdown Begins: Thirteen Bullocks Today, Twelve Tomorrow
Something worth watching for across the rest of this chapter: the bullock count drops by exactly one every day of this seven-day feast, thirteen, twelve, eleven, all the way down to seven on the final day. Everything else, the two rams and fourteen lambs, stays fixed the whole week.
Much later Jewish tradition (recorded in the Talmud, tractate Sukkah) reads real meaning into that math: thirteen down to seven adds up to seventy bullocks total across the week, a number tied to the seventy nations listed back in Genesis 10, read as Israel interceding on behalf of the whole world during this feast.

📉 Bullocks drop by one each day: 13, 12, 11, 10, 9, 8, 7

🔢 Total across the week: seventy bullocks

🔑 Later tradition links seventy to the seventy nations of Genesis 10

## 🌾 Their Meat Offering...Three Tenth Deals For Every Bullock Of The Thirteen Bullocks, Two Tenth Deals To Each Ram
With thirteen bullocks and two rams to account for, this is the most flour and oil measured out for any single day in the whole calendar, still following the exact same per-animal ratio used everywhere else in Numbers 28-29.

🌾 The largest single-day grain total in the whole calendar

⚖️ Same per-animal ratio as every other offering

🔑 A big feast just means the same formula run at a bigger scale

## 📖 A Several Tenth Deal To Each Lamb Of The Fourteen Lambs
"Several" is an old word for "a separate, individual" portion, not "many." Each of the fourteen lambs got its own measured tenth-deal of flour, counted out one at a time rather than dumped in as one large batch.

📖 "Several" means "one separate portion each," an old usage

🐑 Fourteen individual portions, one per lamb

🔑 Precision mattered even at the largest scale of the year

## 🐐 One Kid Of The Goats For A Sin Offering; Beside The Continual Burnt Offering
Even at the year's largest, most joyful festival, a sin offering still closes out the list. The pattern holds one more time: celebration never replaced the ongoing need to deal honestly with guilt.

🐐 A sin offering closes the day, same as every major feast

🎉 Even the biggest celebration of the year includes this

🔑 A repeated reminder, not a one-time lesson

# Numbers 29:17-19
# 🐂 Day Two: The Countdown Continues
---
## 🐂 On The Second Day, Twelve Young Bullocks, Two Rams, Fourteen Lambs
The countdown from verse 13 continues right on schedule: one fewer bullock than yesterday. The rams and lambs stay exactly the same, two rams and fourteen lambs, every single day of the feast. Only the bullock count moves.

🐂 Twelve bullocks, one fewer than day one

🐑 Rams and lambs stay fixed at two and fourteen all week

🔑 Only the bullock number changes day to day

## ⚖️ Their Meat Offering And Their Drink Offerings...Shall Be According To Their Number, After The Manner
Rather than re-listing every exact measurement again, the text just says "after the manner," meaning "use the same ratios already spelled out for day one." It's a shortcut, not a gap.

⚖️ Shorthand for "use the ratios already given"

✂️ Saves rewriting the same numbers seven times over

🔑 The same shortcut phrase used throughout Numbers 28 too

## 🐐 One Goat For A Sin Offering; Beside The Continual Burnt Offering
Same closing pattern as every day so far: a sin offering, stacked on top of the twice-daily continual offering that never stops running underneath the whole festival week.

🐐 The same sin-offering close as every day this week

🔥 The daily continual offering keeps running underneath it all

🔑 A pattern repeated on purpose, not by accident

# Numbers 29:20-22
# 🐂 Day Three: Eleven Bullocks
---
## 🐂 On The Third Day Eleven Bullocks, Two Rams, Fourteen Lambs Of The First Year Without Blemish
The countdown drops to eleven. By now the pattern is unmistakable: one fewer bullock than the day before, everything else identical.

🐂 Eleven bullocks, continuing the countdown

🔁 Identical ram and lamb counts for the third day running

🔑 The pattern is now fully established

## ⚖️ According To Their Number, After The Manner
The same shorthand phrase carries the reader through day after day without repeating the full measurement list. Once a reader recognizes it, the rest of the chapter reads much faster.

⚖️ The same shorthand seen on day two

📖 Lets the text move quickly through repeated days

🔑 Recognizing it makes the whole chapter easier to follow

## 🐐 One Goat For A Sin Offering; Beside The Continual Burnt Offering, And His Meat Offering, And Their Drink Offerings
Day three closes exactly like days one and two, a sin offering on top of the never-stopping continual offering.

🐐 The same closing formula, third day in a row

🔥 The continual offering never pauses

🔑 Consistency is the whole point of this calendar

# Numbers 29:23-25
# 🐂 Day Four: The Middle Of The Week
---
## 🐂 And On The Fourth Day Ten Bullocks, Two Rams, And Fourteen Lambs Of The First Year Without Blemish
Ten bullocks marks the midpoint of the seven-day countdown, thirteen down to seven, with day four sitting right in the middle at ten.

🐂 Ten bullocks, the countdown's midpoint

📊 Halfway through the seven-day feast

🔑 Three more days of the countdown remain

## ⚖️ Their Meat Offering And Their Drink Offerings...According To Their Number, After The Manner
The fourth repetition of the same shorthand, still pointing back to the same fixed ratios first spelled out for day one's thirteen bullocks.

⚖️ Fourth appearance of the same shorthand phrase

🔁 Still points back to day one's original ratios

🔑 The formula never changes, only the totals do

## 🐐 One Kid Of The Goats For A Sin Offering; Beside The Continual Burnt Offering
The sin offering closes day four exactly as it has every day this week, a steady rhythm underneath the shrinking bullock count.

🐐 Same sin-offering close, day four

🎯 A steady rhythm despite the shrinking numbers above it

🔑 The constants matter as much as what's changing

# Numbers 29:26-28
# 🐂 Day Five: Nine Bullocks
---
## 🐂 And On The Fifth Day Nine Bullocks, Two Rams, And Fourteen Lambs Of The First Year Without Spot
Nine bullocks continues the steady one-per-day drop. Only two days remain after this one.

🐂 Nine bullocks, day five of the countdown

⏳ Two days left in the feast

🔑 The pattern holds without exception

## ⚖️ According To Their Number, After The Manner
The same shorthand carries through a fifth time, letting the text move through the week's repeating structure without restating every measurement.

⚖️ Fifth use of the same shorthand phrase

📏 Still the same ratios from day one

🔑 Repetition is the chapter's own built-in memory aid

## 🐐 One Goat For A Sin Offering; Beside The Continual Burnt Offering, And His Meat Offering, And His Drink Offering
Day five closes the same way every day has, a sin offering layered on the never-ending daily offering.

🐐 Same closing formula, day five

🔥 The continual offering still hasn't paused once all week

🔑 Five days in, the rhythm hasn't broken once

# Numbers 29:29-31
# 🐂 Day Six: One Day Left
---
## 🐂 And On The Sixth Day Eight Bullocks, Two Rams, And Fourteen Lambs Of The First Year Without Blemish
Eight bullocks, one more day of the countdown to go before it reaches its final number, seven.

🐂 Eight bullocks, the countdown's second-to-last step

⏳ Only one day of the feast remains after this

🔑 The number seven is coming up next

## ⚖️ Their Meat Offering And Their Drink Offerings For The Bullocks...According To Their Number, After The Manner
The sixth appearance of the same shorthand phrase, still resting on the exact ratios given back in verse 14.

⚖️ Sixth use of the shorthand phrase

🔁 Unchanged since verse 14

🔑 By now a reader can predict this line before reading it

## 🐐 One Goat For A Sin Offering; Beside The Continual Burnt Offering, His Meat Offering, And His Drink Offering
Day six closes exactly like every day before it. Only one more day of this rhythm remains.

🐐 The same sin offering, sixth day running

🔚 One day of the pattern left

🔑 The finish line is now in sight

# Numbers 29:32-34
# 🎉 Day Seven: The Countdown Completes
---
## 🐂 And On The Seventh Day Seven Bullocks, Two Rams, And Fourteen Lambs Of The First Year Without Blemish
Seven bullocks closes the countdown that began at thirteen on day one. Add up every day's bullocks, thirteen, twelve, eleven, ten, nine, eight, seven, and the total comes to exactly seventy across the week.

🐂 Seven bullocks, the countdown's final number

➕ 13+12+11+10+9+8+7 = seventy total across the week

🔑 A tidy, deliberate finish, not a coincidence

## 🌿 The Seventh Day Of A Seven-Day Feast In The Seventh Month
This day stacks the number seven three different ways at once: the seventh day, of a seven-day feast, inside the seventh month. In a culture where seven already meant completeness (six days of work plus a seventh day of rest), this triple-seven closing day marked Tabernacles as the true completion of Israel's entire religious year.

🌿 Seven, times seven, times seven, all in one day

✅ Seven already meant "complete" throughout Israel's calendar

🔑 Tabernacles closes the religious year on its most complete-feeling day

## ⚖️ According To Their Number, After The Manner...One Goat For A Sin Offering
The final day of the countdown closes exactly like all six before it, same ratios, same sin offering, same continual offering running underneath. The consistency itself is the last lesson of the week.

⚖️ The same shorthand and sin offering one final time

🔁 Total consistency across all seven days

🔑 A whole week built on one unchanging foundation

# Numbers 29:35-38
# 🕯️ The Eighth Day: A Quiet Close
---
## 🕯️ On The Eighth Day Ye Shall Have A Solemn Assembly
Every other festival day in this chapter used the phrase "holy convocation." This day uses different wording, translated "solemn assembly," from a Hebrew word that means something closer to "held back" or "detained," as if the people were being asked not to leave just yet.
Later Jewish tradition named this extra day Shemini Atzeret, "the eighth day of holding back," treated as its own separate, quieter holiday tacked onto the end of the bigger Tabernacles week.

🕯️ Different wording than "holy convocation," used everywhere else

✋ Carries the sense of being "held back," not wanting to let go

🔑 Later Judaism names it Shemini Atzeret, its own separate holy day

## 🛑 Ye Shall Do No Servile Work Therein
The same labor-stopping rule used throughout the chapter closes out even this final, quieter day. The rest requirement never eased up, even after a full week of festival activity.

🛑 The same servile-work rule, one last time

😮‍💨 Rest didn't ease up even after a long festival week

🔑 The calendar's basic rules hold steady to the very end

## 🐂 One Bullock, One Ram, Seven Lambs Of The First Year Without Blemish
After a week that peaked at thirteen bullocks, the offering suddenly drops back down to just one, the smallest package in the whole two-chapter calendar, matching the modest size used for Trumpets back in verse 2. After the grandest week of the year, the calendar closes quietly instead of with one more large celebration.

🐂 Drops to one bullock, the smallest count in the whole calendar

📉 A striking contrast to day one's thirteen bullocks

🔑 The year's biggest festival ends on its smallest note

## 📜 That Great Day Of The Feast
Centuries later, John 7:37 describes Jesus standing up "on the last day, that great day of the feast" during this very festival, and crying out that anyone thirsty should come to Him for living water. Many readers connect that moment to this eighth day specifically, the quiet, climactic close of Tabernacles that this chapter describes.

📜 A New Testament echo, John 7:37, set during this same feast

💧 Jesus offers "living water" on the feast's climactic day

🔑 Tabernacles' themes of harvest and God's presence carry into the New Testament

# Numbers 29:39-40
# 📜 Vows, Freewill Gifts, And What Moses Passed On
---
## 📜 These Things Ye Shall Do Unto The LORD In Your Set Feasts, Beside Your Vows, And Your Freewill Offerings
Everything listed across Numbers 28-29, the daily, weekly, monthly, and yearly offerings, was the required minimum, not the ceiling. "Vows" were promises made to God, often during a crisis or a prayer for help, paid once the need had passed. "Freewill offerings" were extra gifts nobody required, given simply out of gratitude.

📜 Everything in chapters 28-29 was the required floor, not the limit

🙏 Vows: promises made to God, paid once answered

🎁 Freewill offerings: extra gifts nobody required

## 🍽️ Your Peace Offerings
A peace offering was a shared meal built around a sacrifice: portions burned for God, portions given to the priests, and the rest eaten by the person who brought it, together with family and friends. Unlike a sin offering, which dealt with guilt, a peace offering celebrated an already-good relationship with God.

🍽️ A shared meal offering, not just smoke on an altar

🤝 Portions went to God, the priest, and the offerer's own table

🔑 Celebrated a relationship already at peace, not a debt owed

## ✅ And Moses Told The Children Of Israel According To All That The LORD Commanded Moses
This closing line matches the opening line of chapter 28, where Moses was first told to "command the children of Israel" with this exact calendar. The two chapters bookend each other: God gives the command, and Moses faithfully passes on every detail, without editing or shortening it.

📖 Bookends the opening command back in Numbers 28:1-2

✅ Confirms Moses passed the whole calendar on faithfully

🔑 Nothing in this long list got left out or simplified along the way
`.trim();

export const NUMBERS_TWENTY_NINE_PERSONAL_SECTIONS = parseNumbersTwentyNineRawNotes(NUMBERS_TWENTY_NINE_RAW_NOTES);
