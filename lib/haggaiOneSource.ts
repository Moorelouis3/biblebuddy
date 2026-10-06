export type HaggaiOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHaggaiOneRawNotes(rawText: string): HaggaiOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HaggaiOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Haggai\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Haggai 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Haggai\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Haggai\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Haggai 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Haggai 1:${startVerse}` : `Haggai 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Haggai 1 sections, received " + sections.length);
  }

  return sections;
}

const HAGGAI_ONE_RAW_NOTES = `# Haggai 1:1-4
# 📅 The Time Has Not Come, They Say
---
## 📅 In The Second Year Of Darius The King

This date anchors the whole book to a real moment in history.

Darius the king ruled the Persian Empire, which controlled Judah at this time.

His second year lines up with the year 520 before Christ.

Haggai is the only prophet whose book is dated this precisely all the way through.

Every message in this short book can be placed on an exact calendar day.

📅 This date anchors the book in history

👑 Darius ruled the Persian Empire

🗓️ His second year was 520 before Christ

📖 Haggai is dated precisely all through

## 📜 Came The Word Of The LORD By Haggai The Prophet

A prophet's job was to carry God's exact message, not his own personal opinion.

"By Haggai" means the message passed through him, but did not originate with him.

Haggai delivers these words faithfully even though the people had stopped listening for years.

Being a messenger took courage, since unwelcome words rarely earn a warm reception.

📜 A prophet carries God's message exactly

🚫 The message did not originate with him

🗣️ Haggai delivers it faithfully anyway

📖 Being a messenger took real courage

## 👑 Zerubbabel The Son Of Shealtiel, Governor Of Judah, And To Joshua The Son Of Josedech, The High Priest

Zerubbabel was the civil governor, the grandson of a former king of Judah before the exile.

Joshua, also called Jeshua elsewhere, served as the high priest over temple worship.

God sends this message to both leaders together, not just one or the other.

Rebuilding the temple needed political authority and religious authority working side by side.

Neither leader could finish this project alone.

👑 Zerubbabel was the civil governor

🙏 Joshua was the high priest

🤝 Both leaders receive this message together

📖 Neither could finish this project alone

## 🗣️ The Time Is Not Come, The Time That The LORD's House Should Be Built

This is the people's own excuse, quoted back to them word for word.

Work on the temple had actually stalled for about sixteen years by this point.

Early opposition and discouragement, described earlier in the book of Ezra, had worn the people down.

"Not come" sounds like patience, but it was really an excuse for neglect.

God repeats their own words so they cannot pretend He misunderstood them.

🗣️ This is the people's own excuse

⏳ Work had stalled about sixteen years

😔 Early opposition wore the people down

📖 Patience was really just neglect

## 🪵 Is It Time For You, O Ye, To Dwell In Your Cieled Houses?

"Cieled" means paneled or finished with fine wood on the inside walls.

This was not a modest dwelling.

It was a comfortable, well decorated home.

The people claimed there was no time to build God's house.

At the very same time, they had plenty of time to finish their own.

God exposes the real excuse hiding behind their words.

🪵 Cieled means finished with fine wood

🏠 This was a comfortable, decorated home

⏰ They found time for their own house

📖 God exposes the real excuse

## 🏚️ And This House Lie Waste?

"Waste" here does not just mean empty or unused.

It means ruined, abandoned, and falling apart like rubble.

The temple foundation had been laid years earlier, then left half finished.

Weeds, debris, and decay had taken over a sacred building site for over a decade.

God asks them to actually picture it instead of ignoring it.

🏚️ Waste means ruined and falling apart

🧱 The foundation sat half finished

🌿 Weeds and debris took over the site

📖 God makes them picture it clearly
# Haggai 1:5-9
# 🕳️ A Bag With Holes
---
## 🔍 Consider Your Ways

"Consider" means to stop and actually examine something closely, not just glance at it.

"Ways" here means their daily choices, priorities, and habits.

God is not asking for a quick apology.

He is asking for honest self examination.

This short command carries the weight of the whole chapter's challenge.

🔍 Consider means examine closely

🛣️ Ways means daily choices and priorities

🙏 God wants honest self examination

📖 A short command with real weight

## 🌱 Ye Have Sown Much, And Bring In Little

Sowing seed was the most basic form of work in this farming society.

Bringing in little despite heavy sowing describes a harvest that keeps failing.

This exact kind of failure appears earlier in the law as a covenant curse for disobedience.

The people were living under that curse without realizing why.

🌱 Sowing was the most basic work

📉 The harvest kept failing anyway

📜 This matches an old covenant curse

📖 They lived under it, unaware why

## 🍞 Ye Eat, But Ye Have Not Enough

Food was going into their mouths, but never enough to satisfy.

This was not ordinary hunger from a bad season.

It was a pattern God himself was causing on purpose.

Scarcity became the normal condition of daily life.

🍞 Eating never led to being full

🌾 This was not an ordinary bad season

✋ God was causing this on purpose

📖 Scarcity became their normal life

## 🧥 Ye Clothe You, But There Is None Warm

Putting on clothes should have solved the problem of being cold.

Instead, the cold kept getting through anyway.

Wool and cloth were likely scarce from the same failing harvests.

Even basic comfort was slipping out of their reach.

🧥 Clothes still left them cold

🐑 Wool was likely scarce too

❄️ Even basic comfort kept slipping away

📖 Nothing basic worked as it should

## 👛 Earneth Wages To Put It Into A Bag With Holes

This pictures a bag with holes in the bottom.

Money goes in, and it quietly leaks right back out.

No amount of hard work could ever get ahead under these conditions.

The image captures a whole economy that refuses to add up.

👛 A bag with holes leaks money

💸 Hard work could not get ahead

🔁 Effort went in, nothing stayed

📖 Their whole economy refused to add up

## 🔁 Thus Saith The LORD Of Hosts, Consider Your Ways

This exact command already appeared back in verse five.

Repeating it here is not an accident or a copy and paste mistake.

Hebrew writers often framed a whole section between two matching bookends.

Everything between these two commands is the full case God is building.

The repetition signals the diagnosis is finished and the command is coming next.

🔁 This repeats the verse five command

📚 Hebrew writers often used bookends

🧱 Everything between is one connected case

📖 Diagnosis is done, the command is next

## 🏔️ Go Up To The Mountain, And Bring Wood, And Build The House

"The mountain" likely refers to nearby hills with cedar and timber, not one single famous peak.

This is a direct, practical command with three clear steps.

Go, gather material, and build.

God moves from diagnosing the problem straight into giving the solution.

No more waiting for a better moment is allowed after this verse.

🏔️ The mountain means nearby timber hills

📋 Three clear steps are given

🔨 Go, gather, and build

📖 No more waiting after this verse

## 🏗️ I Will Take Pleasure In It, And I Will Be Glorified

Building a structure was never the actual goal here.

God names two deeper reasons for the whole project.

His own pleasure, and his own glory being made visible to everyone watching.

A temple without that purpose behind it would just be a building.

This is the real reason the project matters at all.

🏗️ Building was never the real goal

😊 God names his own pleasure

✨ God names his own glory

📖 Purpose is the real reason it matters

## 💨 I Did Blow Upon It

This idiom pictures God actively scattering a harvest the moment it was gathered in.

It is not describing an accident of bad weather.

God names himself as the direct cause behind the failure.

Blaming chance would have let the people avoid the real lesson.

💨 Blow upon it means active scattering

🎲 This was not an accident

✋ God names himself as the cause

📖 Chance would have hidden the real lesson

## 🎯 Because Of Mine House That Is Waste, And Ye Run Every Man Unto His Own House

God finally states the reason behind every failed harvest in this chapter.

It was never really about weather, soil, or bad luck at all.

Neglecting God's house while chasing personal comfort caused the shortage.

This single line connects every earlier complaint back to one root cause.

🎯 God finally names the real reason

🌦️ It was never about weather or luck

🏠 Neglect caused the shortage, not chance

📖 One root cause explains it all
# Haggai 1:10-11
# 🌾 Heaven Withholds The Dew
---
## 🚫 The Heaven Over You Is Stayed From Dew

"Stayed" means held back or stopped on purpose.

Dew was essential moisture for crops in this region's dry climate.

Without it, the ground simply could not produce a healthy harvest.

God is withdrawing something the people never even noticed was a gift until it was gone.

🚫 Stayed means held back on purpose

💧 Dew was essential crop moisture

🏜️ Without it, the ground failed

📖 They never noticed the gift until it left

## ✋ I Called For A Drought Upon The Land

God names himself as the one who called for this drought.

This was never framed as bad luck or random weather patterns.

Every failed crop in this chapter traces back to a deliberate decision.

Taking responsibility this directly is rare, and it is meant to get their attention.

✋ God called for this drought himself

🎲 This was never random weather

🌾 Every failure traces to one decision

📖 This directness was meant to wake them up

## 📝 Upon The Labour Of The Hands

This phrase closes out a long list that already named land, mountains, corn, wine, and oil.

Even the effort people put into their own work did not escape the drought.

Nothing in their daily life was left untouched by this judgment.

The total reach of the drought matched the totality of their neglect.

📝 This closes a long list of losses

💪 Even human effort was not spared

🌍 Nothing in daily life escaped it

📖 Total judgment matched total neglect
# Haggai 1:12-15
# 🔨 The Remnant Begins To Build
---
## 👥 The Remnant Of The People, Obeyed The Voice Of The LORD

"Remnant" means the group that survived exile and actually returned to the land.

This is the turning point of the entire book.

After years of excuses, the exact same people finally obey.

One clear message from God changed behavior that sixteen years of silence had not.

👥 Remnant means those who returned from exile

🔄 This is the chapter's turning point

🗣️ One message changed years of excuses

📖 Obedience finally arrives here

## 🙏 The People Did Fear Before The LORD

"Fear" here does not mean being terrified or panicked.

It means a deep, reverent respect for who God actually is.

This kind of fear usually shows up right after people realize they were wrong.

It is the appropriate response once the real message finally lands.

🙏 Fear means reverent respect, not terror

💡 It shows up after realizing they were wrong

✅ This is the appropriate response here

📖 The message finally landed

## 🤝 I Am With You, Saith The LORD

This promise comes immediately after the people's obedience, not before it.

God is not demanding more proof or more time.

A short, direct reassurance replaces sixteen years of silence and distance.

Grace often follows obedience closely, encouraging the very next step forward.

🤝 This promise follows their obedience

🚫 God demands no further proof

💬 A short reassurance replaces years of silence

📖 Grace follows obedience closely here

## 🔥 The LORD Stirred Up The Spirit

"Stirred up" pictures God reaching inside a person and igniting real motivation.

This was not just the leaders deciding on their own to try harder.

God himself supplied the willingness the people had been missing for sixteen years.

Real obedience to God usually starts with God's own work on the inside first.

🔥 Stirred up means God ignites motivation

🙅 This was not pure human willpower

🎁 God supplied the willingness himself

📖 God's work inside comes first

## 🏗️ They Came And Did Work In The House Of The LORD

This is the exact same house that was called waste back in verse four.

Years of excuses and one failed harvest after another finally end in action.

The whole chapter moves from complaint, to command, to consequence, and finally to obedience.

A single sentence now holds everything the rest of the chapter was building toward.

🏗️ This is the same house from verse four

📈 The chapter moves from complaint to action

🔁 Every earlier thread lands here

📖 One sentence holds the whole chapter's weight

## 🗓️ In The Four And Twentieth Day Of The Sixth Month

Haggai's first message came on the very first day of this same month, named back in verse one.

This new date is only twenty three days later.

That is a remarkably fast turnaround for a project that had been stalled for sixteen years.

One short message from God moved a nation faster than sixteen years of silence ever did.

🗓️ The first message came just 23 days earlier

⚡ That is a remarkably fast turnaround

⏳ Sixteen years of delay, then quick action

📖 One message outworked sixteen years of silence
`.trim();

export const HAGGAI_ONE_PERSONAL_SECTIONS = parseHaggaiOneRawNotes(HAGGAI_ONE_RAW_NOTES);
