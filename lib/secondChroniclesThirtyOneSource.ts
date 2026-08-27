export type SecondChroniclesThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesThirtyOneRawNotes(rawText: string): SecondChroniclesThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Chronicles 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Chronicles 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 31:${startVerse}` : `2 Chronicles 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Second Chronicles 31 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_THIRTY_ONE_RAW_NOTES = `# SecondChronicles 31:1
# 🔨 Destroying What Was Left
---
## 🕊️ All Israel That Were Present

The phrase "all Israel" here does not just mean the tribe of Judah.

Chapter thirty already showed King Hezekiah inviting the northern tribes to keep the Passover with Judah.

Those northern worshippers are the ones still present for this cleanup.

Judah and the north acted together, at least for this one moment.

🕊️ All Israel includes northern worshippers

📜 Chapter thirty explains their presence

🤝 Judah and the north acted together

📖 Unity like this was rare here

## 🗿 Brake The Images In Pieces

"Images" here means carved or cast idols made to represent false gods.

Breaking them into pieces was not random destruction.

It made sure nobody could quietly set the same idol back up later.

The people were not just clearing space.

They were making the old worship impossible to restart.

🗿 Images means carved or cast idols

🔨 Breaking them stopped quiet reuse

🚫 Old worship could not restart

📖 Destruction here was deliberate, not random

## 🌳 Cut Down The Groves

"Groves" does not mean forests or trees in general.

It refers to wooden poles set up to honor Asherah, a fertility goddess worshipped alongside other gods.

These poles often stood right next to altars meant for the LORD.

Cutting them down separated true worship from a false one it had gotten tangled up with.

🌳 Groves means Asherah worship poles

🙅 Not literal forests or trees

⚔️ They stood mixed in with true altars

📖 True worship gets separated from false

## 🗺️ In Ephraim Also And Manasseh

Ephraim and Manasseh were not part of Judah's kingdom.

They belonged to the northern kingdom of Israel.

That kingdom had its own king at this time.

Hezekiah's reform reached into land he did not even rule.

🗺️ Ephraim and Manasseh sat in the north

👑 That kingdom had its own king

🚶 Reform traveled home with the worshippers

📖 Faithfulness reached past Hezekiah's own borders

## 🏡 Every Man To His Possession

"Possession" here means the land and city each family had inherited.

Once the destruction was finished, everyone scattered back to their own towns.

This was not a permanent gathering.

It was a coordinated mission with a clear end point.

🏡 Possession means inherited land and city

🚶 Everyone returned to their own town

🏁 The mission had a clear end

➡️ A short campaign, not a new settlement

# SecondChronicles 31:2-4
# ⚖️ Hezekiah Organizes The Priests
---
## 📋 The Courses Of The Priests And The Levites

"Courses" means organized shifts, groups who rotated through temple duty at set times.

King David first set up this system generations earlier.

Hezekiah is not inventing something new here.

He is restoring a structure that had fallen apart.

📋 Courses means rotating shifts of duty

👑 David first organized this system

🔧 Hezekiah restores what had broken down

📖 Order returns to temple worship

## 👑 The King's Portion Of His Substance

Hezekiah paid for some of the daily offerings out of his own royal wealth.

This was not required of a king.

He could have left the cost entirely to the people's gifts.

Instead, he personally funded the regular sacrifices himself.

👑 Hezekiah funded offerings from his own wealth

🙅 No king was required to do this

💰 He covered the regular sacrifices personally

📖 His devotion started at the top

## 🌙 The New Moons, And The Set Feasts

"New moons" marked the start of each Hebrew month with its own offering.

"Set feasts" refers to the LORD's yearly appointed festivals, like Passover and Tabernacles.

Hezekiah made sure every one of these regular occasions had what it needed.

Nothing on the calendar was going to be skipped.

🌙 New moons began each Hebrew month

📅 Set feasts are the yearly festivals

✅ Every occasion was fully funded

📖 Nothing on God's calendar was skipped

## 🌾 That They Might Be Encouraged In The Law Of The Lord

Priests and Levites owned no land of their own to farm.

Without steady support, they could not stay in temple work.

Hezekiah commanded the people to give so the priests could stay focused on their calling.

Practical support made faithful ministry possible.

🌾 Priests and Levites owned no farmland

😟 Without support, they could not stay

🤝 The people's gifts kept them free

📖 Support and ministry worked together

# SecondChronicles 31:5-8
# 🌾 Gifts Pour In By The Heap
---
## 🌾 The Firstfruits Of Corn, Wine, And Oil, And Honey

"Firstfruits" means the very first portion of a harvest, given before the rest was used or sold.

Giving the first share was an act of trust.

The people did this the moment the command reached them.

They did not wait to see what they could spare.

🌾 Firstfruits means the harvest's first portion

🙏 Giving first meant trusting God with the rest

⚡ The people responded immediately

📖 Trust came before certainty

## 🔟 The Tithe Of All Things

A "tithe" is a tenth, the standard portion the law already required.

Here the people brought tithes of oxen, sheep, and holy things on top of the firstfruits.

This was not the bare minimum given reluctantly.

It was full obedience given eagerly.

🔟 Tithe means one tenth

🐑 Oxen, sheep, and holy things included

🙌 This went beyond the bare minimum

📖 Obedience here was eager, not forced

## 📦 Laid Them By Heaps

So much was brought in that it could not be stored neatly.

The gifts piled up into literal mounds on the ground.

That image alone tells the reader how large the response was.

No inventory list could have said it better.

🌾 Gifts piled into literal mounds

📦 Too much to store neatly

👀 The size spoke for itself

📖 Generosity outran the storage

## 📆 Began In The Third Month, Finished In The Seventh

This giving was not a single day of generosity.

It continued for four straight months, from spring into fall.

The third month lines up with the Feast of Weeks.

The seventh month lines up with the Feast of Tabernacles.

Two of Israel's major festivals bookend this whole season of giving.

📆 Giving lasted four straight months

🌸 The third month lines up with Weeks

🍂 The seventh month lines up with Tabernacles

📖 Two festivals frame this whole season

## 🙏 They Blessed The Lord, And His People Israel

Hezekiah and the leaders praised God first, which is expected.

But they also blessed the people, which is not as common.

Their generosity was treated as something worth genuinely honoring.

Leaders noticing ordinary obedience matters.

🙏 They blessed the LORD first

👏 They also blessed the people

🌟 Generosity was honored openly

📖 Leaders noticed ordinary faithfulness

# SecondChronicles 31:9-10
# 🍞 Enough To Eat And Plenty Left
---
## 👴 Azariah The Chief Priest Of The House Of Zadok

Zadok was a priest who stayed loyal to David during a family rebellion generations earlier.

His descendants kept the high priesthood because of that loyalty.

Azariah speaking here carries that whole family's long standing credibility.

This is not a random priest giving a casual answer.

👴 Zadok stayed loyal to David long ago

👑 His family kept the high priesthood

🗣️ Azariah speaks with real authority

📖 Loyalty from the past still mattered here

## 🍞 We Have Had Enough To Eat, And Have Left Plenty

Priests and Levites depended completely on what the people gave.

Azariah reports that the gifts did more than just meet the need.

There was food enough with real surplus left over.

The system Hezekiah restored was actually working.

🍞 Priests depended fully on the people's gifts

✅ The need was more than met

📦 Real surplus was left over

📖 The restored system was working

## 📦 This Great Store

Azariah does not just report enough.

He reports abundance so large it needed its own word, "store."

The surplus becomes visible proof of the people's obedience.

It is evidence anyone could see, not just a claim.

📦 Store means a large abundant supply

👀 The surplus was visible to everyone

✅ It proved the people's obedience

📖 God's blessing left physical evidence

# SecondChronicles 31:11-13
# 🏛️ Storerooms For The Overflow
---
## 🏛️ Prepare Chambers In The House Of The Lord

"Chambers" means storage rooms built right into the temple complex.

All this abundance needed somewhere safe and organized to go.

Hezekiah did not just receive the gifts, he planned for them.

Good intentions still need real logistics behind them.

🏛️ Chambers means temple storage rooms

📦 The abundance needed somewhere to go

📋 Hezekiah planned ahead, not just reacted

📖 Good intentions still need real planning

## 🗂️ Cononiah The Levite Was Ruler

Someone had to be personally responsible for all of this incoming wealth.

Cononiah is named as that person, with his brother Shimei right under him.

Naming individuals, not just a system, kept the operation accountable.

A pile of gifts still needs a person answering for it.

🗂️ Cononiah was named chief overseer

👥 Shimei served right under him

✅ Named leaders kept things accountable

📖 Systems still need real people responsible

## 📜 Overseers Under The Hand Of Cononiah

Ten more men are listed by name as overseers under Cononiah and Shimei.

That is a large administrative team for one operation.

The scale of the list matches the scale of the giving described just before it.

This was too large a task for two men alone.

📜 Ten named men served as overseers

👥 A large team, not just two men

⚖️ The team matched the scale of giving

📖 Big generosity required real organization

# SecondChronicles 31:14-19
# 📜 Distribution By Genealogy And Course
---
## 🎁 Over The Freewill Offerings Of God

"Freewill offerings" were gifts given beyond what the law required.

Unlike the tithe, nobody had to bring these.

Kore was placed in charge of this specific category, separate from the required tithes.

Even the voluntary gifts needed careful handling.

🎁 Freewill offerings went beyond what was required

🙅 Nobody was obligated to give these

🗂️ Kore managed this category specifically

📖 Voluntary generosity still needed order

## 🔁 To Give To Their Brethren By Courses

"Courses" already controlled who was on duty.

Now the same system controlled who received supplies.

Every priest and Levite received on a set rotation.

Nobody could jump ahead or play favorites.

🔁 Courses controlled duty and supplies

📋 Everyone received on a set rotation

🚫 No favorites, no jumping ahead

📖 Temple order also ran the pantry

## 📜 Genealogy Of Males, From Three Years Old And Upward

Recording a genealogy here was not about family pride.

It determined exactly who qualified to receive support from the temple's stores.

Even small children in priestly families were counted and provided for.

A name in this list was a name that would not go hungry.

📜 Genealogy decided who could receive support

👶 Even young children were counted

🍞 Being listed meant being provided for

📖 A family record became a lifeline

## 🔢 The Levites From Twenty Years Old And Upward

Earlier in Israel's history, Levites began official service at thirty.

By Hezekiah's time, the starting age had been lowered to twenty.

More hands were needed to keep the restored temple system running.

The workload had grown enough to change the rule.

🔢 Levites once started service at thirty

📉 The age was lowered to twenty

👥 More workers were needed for the load

📖 A growing ministry changed an old rule

## ⚖️ As Well To The Great As To The Small

This phrase means every person counted, whether prominent or ordinary.

A well known priest and an unnamed child in a priestly family were provided for by the same standard.

Status did not decide who got fed.

Being registered in God's house was enough.

⚖️ Great and small received the same standard

👑 Status did not decide who was fed

👶 An unnamed child counted just as much

📖 Belonging mattered more than rank

# SecondChronicles 31:20-21
# ❤️ Good, Right, And True
---
## ✅ Good, And Right, And Truth

These three words are not repeating the same idea three times.

"Good" means his actions actually benefited the people.

"Right" means his actions matched what God's law required.

"Truth" means his devotion was sincere, not just a public performance.

✅ Good means it truly helped people

📏 Right means it matched God's law

🙏 Truth means the devotion was sincere

📖 All three combine into real integrity

## ❤️ He Did It With All His Heart

This is not describing one single good decision.

It describes the whole pattern of Hezekiah's reign so far.

Passover, the priestly system, and this flood of giving all connect.

None of it was half finished or done for appearances.

❤️ This covers his whole reign so far

🔁 Passover, priesthood, and giving all connect

🚫 Nothing here was half finished

📖 Total effort marked every part

## 🌾 And Prospered

This prosperity describes the immediate result of this specific season of obedience.

It does not promise every faithful king an easy road ahead.

Harder chapters, including a coming invasion, still lie ahead for Hezekiah.

Right now, faithfulness and blessing are moving together.

🌾 Prosperity followed this season of obedience

🙅 It is not a guarantee of ease

⚔️ Harder chapters still lie ahead

📖 For now, faithfulness and blessing align
`.trim();

export const SECOND_CHRONICLES_THIRTY_ONE_PERSONAL_SECTIONS = parseSecondChroniclesThirtyOneRawNotes(
  SECOND_CHRONICLES_THIRTY_ONE_RAW_NOTES,
);
