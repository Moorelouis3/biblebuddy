export type NehemiahEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahEightRawNotes(rawText: string): NehemiahEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 8:${startVerse}` : `Nehemiah 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Nehemiah 8 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_EIGHT_RAW_NOTES = `# Nehemiah 8:1-3
# 📜 The People Ask For The Law
---
## 🤝 Gathered Themselves Together As One Man

"Gathered themselves together as one man" means the whole population moved with one shared purpose.

No official summoned this gathering by written decree.

The wall had only just been finished before this crowd assembled.

They did not come only to celebrate the wall itself.

They came because they wanted the law that gave the wall its meaning.

🤝 The whole population acted together

📢 No official summoned this gathering

🧱 The wall had just been finished

📖 They wanted the law behind it

## 💧 The Street That Was Before The Water Gate

The water gate sat on the east side of Jerusalem, near the temple.

It took its name from a nearby spring that supplied the city.

This exact spot was already tied to worship, not trade.

A crowd choosing this location was choosing a place built for gathering.

The setting matched what the people came there to do.

🚪 Water gate sat near the temple

💧 Named for a nearby water source

🏛️ Already tied to worship, not trade

📖 The setting matched their purpose

## 📖 The Book Of The Law Of Moses

The book of the law of Moses means the first five books of the Bible.

Modern readers often call these five books the Torah or the Pentateuch.

Moses received this teaching directly from God at Mount Sinai generations earlier.

This crowd had gone decades without hearing it read aloud in full.

That long absence is exactly why this one request meant so much.

📖 Means the first five books

🕎 Also called the Torah

⛰️ Moses received it at Sinai

➡️ The people had not heard it in decades

## 👨‍🏫 Ezra The Priest Brought The Law

Ezra held two roles at once, priest and scribe.

His priestly line connected him to Aaron, the first high priest.

His scribal training made him a skilled copier and teacher of scripture.

Ezra had already been in Jerusalem for years before this exact scene.

This moment finally let his years of teaching reach the whole city.

🙏 Ezra was both priest and scribe

👨‍👦 His priestly line traced to Aaron

✍️ Trained as a skilled scripture teacher

📖 His teaching finally reached the whole city

## 👩 Both Of Men And Women, And All That Could Hear With Understanding

This reading included women and any child old enough to follow along.

Many public readings in that world addressed adult men only.

Understanding, not gender or age, decided who belonged in this crowd.

Every person able to grasp the words got to hear them firsthand.

The law was never meant to belong to only part of the family.

👩 Women were included in this reading

🧒 So were children who could understand

🚫 Age and gender were not the barrier

📖 The whole family heard the law

## 🗓️ The First Day Of The Seventh Month

The seventh month on Israel's calendar was called Tishri.

This exact date was already set apart as the Feast of Trumpets.

Numbers chapter twenty nine commands a holy rest and trumpet blasts on this day.

The people chose to spend that sacred day listening to scripture instead.

A festival built around trumpets became a festival built around the word of God.

🗓️ The seventh month was called Tishri

📯 This date was the Feast of Trumpets

😴 It was normally a day of rest

📖 They filled it with scripture instead

## ⏳ From The Morning Until Midday

This reading lasted close to six hours without a real break.

Standing and listening that long took genuine physical effort from the crowd.

Ears attentive is an old idiom for complete, focused listening.

It means far more than simply standing within earshot.

Hunger for the word of God carried the whole crowd through the morning.

⏳ The reading lasted nearly six hours

🧍 The crowd stood and listened throughout

👂 Ears attentive means full, focused listening

📖 Hunger for the word carried them through

# Nehemiah 8:4-6
# 🪵 Ezra Stands To Open The Book
---
## 🪵 Ezra The Scribe Stood Upon A Pulpit Of Wood

This pulpit was a raised wooden platform built only for this occasion.

Standing above the crowd let every person actually see Ezra speak.

Nothing like this structure appears earlier anywhere in the Old Testament.

A visible speaker turned a massive crowd into one shared congregation.

Being seen mattered just as much as being heard that day.

🪵 A wooden platform built for this day

👀 Raised so the whole crowd could see

🆕 Nothing like it appears earlier in scripture

📖 Seeing Ezra mattered as much as hearing him

## 🧍 Beside Him Stood Mattithiah, And Shema, And Anaiah

Six men stood at Ezra's right hand that day.

Seven more men stood at his left hand.

Thirteen men in all flanked him on that wooden platform.

None of these thirteen names appear again anywhere else in the Bible.

Being present at this one moment was their only recorded role in scripture.

🧍 Thirteen men flanked Ezra in all

📜 Their names appear only this once

🤝 They supported this massive public reading

📖 Even quiet support has a place

## 📜 Ezra Opened The Book In The Sight Of All The People

Everyone in the crowd could watch Ezra unroll the scroll itself.

Ancient scrolls were rolled tightly around a wooden rod for storage.

The instant he opened it, the whole crowd rose to their feet.

No leader commanded that response.

The people moved together on their own.

📜 The crowd watched Ezra unroll the scroll

🧍 The people rose the instant it opened

🙌 No leader commanded that response

📖 Posture already showed the book's weight

## 🙏 Ezra Blessed The LORD, The Great God

Ezra opened with a spoken blessing before reading a single verse.

Blessing God here means praising Him aloud, not asking Him for anything.

The title the great God set the tone for everything about to be read.

Every law that followed would be read in light of that greatness.

Worship came before instruction, not after it.

🙏 Ezra praised God before reading anything

📢 Blessing meant praise, not a request

👑 The great God set the tone

📖 Worship came before instruction that day

## 🗣️ All The People Answered, Amen, Amen, With Lifting Up Their Hands

Amen means so be it, a way of agreeing with what was just said.

Saying it twice made their agreement even stronger.

Lifted hands were a common posture of prayer across the ancient world.

The gesture pictured hands reaching up toward God.

Their hands agreed with what their mouths had just said.

🗣️ Amen means so be it, agreed

🔁 Saying it twice strengthened their agreement

🙌 Lifted hands pictured reaching toward God

📖 Their hands matched their spoken Amen

## 🙇 They Bowed Their Heads, And Worshipped The LORD With Their Faces To The Ground

Faces to the ground was the deepest posture of worship in that culture.

It went further than lifted hands or a simple bow at the waist.

This posture usually appeared only in moments of overwhelming reverence.

The crowd moved from standing tall to lying low within one verse.

Their bodies told the same story their Amen already had.

🙇 Faces to the ground was deep worship

📈 It went further than lifted hands

😮 Usually reserved for overwhelming moments

📖 Their bodies matched their spoken worship

# Nehemiah 8:7-8
# 🧑‍🏫 The Levites Teach The Meaning
---
## 🧑‍🏫 Caused The People To Understand The Law

Thirteen named Levites moved through the crowd as Ezra read from the platform.

Their job was to explain hard words and customs as the people listened.

This moment is often pointed to as an early root of synagogue teaching.

A crowd this large could not have followed every word alone.

Reading the law aloud was never meant to happen without help.

🧑‍🏫 Thirteen Levites explained as Ezra read

📚 An early root of synagogue teaching

👥 The crowd needed this kind of help

📖 Reading the law was not a solo task

## 🧍 The People Stood In Their Place

Standing in their place likely means the crowd stayed grouped by family.

Nehemiah chapter three already organized workers along the wall this same way.

Keeping that grouping made it easier for a Levite to reach every ear.

Order, not only enthusiasm, made this massive gathering actually work.

A well organized crowd could hear teaching a scattered one never would.

👪 Likely grouped by family or clan

🧱 The same grouping used to build the wall

🧑‍🏫 It let Levites reach every group

📖 Order made the teaching actually work

## 🗣️ They Read In The Book In The Law Of God Distinctly

Distinctly means the reading was clear and separated word from word.

This likely describes reading slowly enough for every listener to follow.

Many scholars believe it may also describe translating into Aramaic.

By this period many Jews understood Aramaic better than Hebrew.

Either way, the goal was clarity for every single listener.

🗣️ Distinctly means clear, careful reading

🐢 Likely read slowly for every listener

🌍 May include translating into Aramaic

📖 The goal was clarity for everyone

## 💡 Gave The Sense, And Caused Them To Understand The Reading

Giving the sense means explaining what the words actually meant.

Understanding, not simply hearing, was the entire point of this gathering.

A reading without explanation would have left this crowd no wiser than before.

This one phrase names the whole purpose of Ezra and the Levites' effort.

The law had to reach the mind, not only the ear.

💡 Gave the sense means real explanation

🧠 Understanding, not just hearing, was the goal

❌ A bare reading would have taught nothing

📖 The law had to reach the mind

# Nehemiah 8:9-12
# 😢 From Weeping To Feasting
---
## 👑 Nehemiah, Which Is The Tirshatha

Tirshatha was the Persian title for the appointed governor of a province.

It was not Nehemiah's given name.

It was his official Persian office.

The king of Persia had personally sent him to lead this rebuilding project.

Governor and priest stood together to speak to the very same crowd.

👑 Tirshatha was a Persian governor's title

📜 It was his office, not his name

🏛️ Persia had sent him to lead

📖 Governor and priest spoke together

## ✝️ This Day Is Holy Unto The LORD Your God

Holy here means set apart for God, different from an ordinary day.

The seventh month's first day was already a commanded day of rest.

Declaring it holy again reminded the crowd why they had gathered at all.

A day already sacred by the calendar was now sacred by experience too.

Calendar and heart finally matched on this one particular morning.

✝️ Holy means set apart for God

🗓️ This day was already a commanded rest

❤️ Calendar and heart matched that morning

📖 Their own experience made it sacred too

## 🚫 Mourn Not, Nor Weep

Leaders gave the crowd a direct command not to grieve.

The command answered something that had already started happening in the crowd.

Hearing the law read aloud made many people realize how far they had drifted.

Genuine conviction, not stage fright, was breaking out across the gathering.

Leaders had to address real tears before the day could move forward.

🚫 A direct command not to grieve

💔 It answered tears already starting

😢 The law exposed how far they had drifted

📖 Leaders had to address real conviction

## 😭 For All The People Wept, When They Heard The Words Of The Law

Decades had passed since this crowd had heard the law explained clearly.

Hearing it in full likely revealed sin and neglect they had never noticed.

This weeping came from genuine conviction, not performance for the crowd.

Their tears proved the earlier teaching by the Levites had actually landed.

The reading had done exactly what it was meant to do.

😭 Decades had passed since a clear reading

💡 It likely revealed unnoticed sin and neglect

❤️ Their weeping showed genuine conviction

📖 The teaching had clearly landed

## 🍖 Eat The Fat, And Drink The Sweet

Fat and sweet both describe the richest food available in that culture.

This was not an ordinary meal.

It was a deliberate feast.

Grief called for fasting in that world, but joy called for a full table.

Choosing rich food over a plain meal was itself an act of worship.

🍖 Fat meant the richest available food

🍯 Sweet meant the best available drink

🎉 Rich food matched a deliberate feast

📖 Celebration replaced mourning that day

## 🤲 Send Portions Unto Them For Whom Nothing Is Prepared

Some families in the crowd were too poor to prepare a feast of their own.

Wealthier families were told to share their food directly with them.

This holy day was never meant to leave a neighbor out.

Joy that leaves someone out was never the joy this day called for.

Worship here included a plate handed to someone else.

🍽️ Some families had nothing prepared

🤲 Others were told to share directly

🚫 Celebrating should not leave anyone out

📖 Worship included a plate for someone else

## 💪 The Joy Of The LORD Is Your Strength

This phrase names joy itself as a real strength, not just a feeling.

Grief drains a person, but joy rooted in God renews their energy.

The people had just spent hours weeping over their own failure.

Now they were told that same day could become their strength instead.

Sorrow was allowed to turn into strength within a single afternoon.

💪 Joy in God is a real strength

😢 Grief alone can drain a person

🔄 Their sorrow was allowed to turn

📖 One afternoon held both weeping and strength

## 🤫 So The Levites Stilled All The People

Stilled means the Levites worked to calm the crowd back down.

Hold your peace was a direct call to stop weeping and be quiet.

Grief could easily have taken over a crowd already this emotional.

Leaders stepped in to protect the joy this holy day was meant to hold.

Their job now was comfort, not correction.

🤫 Stilled means they calmed the crowd

🗣️ Hold your peace meant stop weeping

🛡️ They protected the day's intended joy

📖 Their job shifted to comfort

## 🎊 Because They Had Understood The Words That Were Declared Unto Them

Their joy was not random.

It was a direct response to finally understanding.

Confusion had kept this same crowd distant from God's word for years.

Understanding turned that same distance into celebration within one single day.

Great mirth here means real, open celebration, not a quiet private feeling.

A crowd that once wept over the law now celebrated because of it.

💡 Their joy came from real understanding

😔 Confusion had kept them distant before

🎊 Great mirth meant open celebration

📖 The same law now brought joy

# Nehemiah 8:13-15
# 🌿 Rediscovering The Feast Of Booths
---
## 👥 On The Second Day Were Gathered Together The Chief Of The Fathers

This second gathering was smaller, made up only of family and tribal leaders.

The whole nation had already celebrated on the first day.

Now these leaders wanted to study further.

Genuine spiritual hunger rarely stops at one satisfying morning.

These men wanted to keep reading even after the public reading had ended.

Leadership here meant going back for more.

It did not mean moving on to the next task.

👥 A smaller group of leaders gathered

📚 They wanted to study further

🔥 One good morning was not enough for them

📖 Leadership meant going back for more

## 📜 They Found Written In The Law Which The LORD Had Commanded By Moses

This command sat inside Leviticus and had waited centuries to be practiced fully again.

Nobody had invented a new festival.

They had simply rediscovered an old one.

Moses received this exact command generations before any of these leaders were born.

Careful study, not new revelation, uncovered what they were about to do next.

📜 The command already sat in Leviticus

🕰️ It had waited centuries to be practiced

🔍 Careful study uncovered it, not new revelation

📖 Old scripture still taught something new

## 🏕️ The Children Of Israel Should Dwell In Booths

Booths were temporary shelters built from branches, not permanent houses.

This festival remembered Israel's forty years living in temporary shelters in the wilderness.

Living in one for a week deliberately recreated that same dependence on God.

Comfortable, settled Jerusalem was about to feel like the wilderness again on purpose.

Remembering hardship on purpose was itself a form of worship.

🏕️ Booths were temporary branch shelters

🏜️ They recalled forty years in the wilderness

🏙️ Settled Jerusalem would feel that again

📖 Remembering hardship was itself worship

## 🕎 In The Feast Of The Seventh Month

This later festival is known elsewhere as the Feast of Tabernacles.

It fell just five days after the Day of Atonement, in Leviticus twenty three.

Solemn confession and joyful celebration sat side by side in the same month.

The seventh month carried both the heaviest and the happiest days on the calendar.

One month held room for both kinds of worship.

🕎 Also called the Feast of Tabernacles

🗓️ It fell soon after the Day of Atonement

⚖️ The month held both weight and joy

📖 One month held both kinds of worship

## ⛰️ Go Forth Unto The Mount, And Fetch Olive Branches

The mount likely refers to the hills surrounding Jerusalem, thick with trees.

Gathering branches meant real physical work before any booth could be built.

Every family had to leave the city and return carrying their own materials.

Nobody could simply buy a finished booth or hire the work out.

Obedience here required their own hands, not only their agreement.

⛰️ The mount meant the hills near Jerusalem

🌿 Branches required real physical gathering

👪 Every family gathered their own materials

📖 Obedience required their own hands

## 🌴 Pine Branches, And Myrtle Branches, And Palm Branches

Each named branch came from a common, easily found local tree.

Myrtle carried a sweet fragrance often connected with joy elsewhere in scripture.

Palm branches later became a symbol of celebration in the New Testament.

A shelter woven from ordinary local branches carried real symbolic weight.

Common materials were about to build something set apart for God.

🌲 Each branch came from a common local tree

🌸 Myrtle carried a sweet, joyful scent

🌴 Palm later symbolized celebration and triumph

📖 Ordinary materials built something set apart

# Nehemiah 8:16-18
# 🎉 The City Keeps The Feast
---
## 🏠 Made Themselves Booths, Every One Upon The Roof Of His House

Flat rooftops in this culture were common outdoor living space, not just a roof.

Building a booth there put worship in plain view of every neighbor.

Courts, public streets, and rooftops all filled with the same simple shelters at once.

Nobody had to travel far to keep this command.

It happened right at home.

The whole city turned into one shared campsite for a week.

🏠 Rooftops were common outdoor living space

👀 Booths there were in plain view

🏙️ Courts and streets filled with them too

📖 The city became one shared campsite

## 🚪 In The Street Of The Water Gate, And In The Street Of The Gate Of Ephraim

These two named gates were public gathering places on opposite sides of the city.

The water gate was already familiar from the very first verse of this chapter.

Naming both locations shows this festival reached every corner, not only the temple courts.

The same street that once held only a crowd now held actual shelters.

The whole city, not one district, kept this feast together.

🚪 Two gates marked opposite sides of the city

💧 Water gate already appeared earlier in the chapter

🌆 The festival reached every corner of the city

📖 The whole city kept the feast together

## 🗡️ For Since The Days Of Jeshua The Son Of Nun Unto That Day Had Not The Children Of Israel Done So

Jeshua the son of Nun is better known by his other name, Joshua.

That comparison reaches back to Israel's original conquest of the land.

Nearly a thousand years had passed without this festival being kept so fully.

Even the generations of King David and King Solomon had not managed it fully.

A small, returning remnant did what powerful kings before them never finished.

🗡️ Jeshua son of Nun is Joshua

📅 The comparison reaches back nearly a thousand years

👑 Even earlier kings had not kept it fully

📖 A small remnant finished what kings did not

## 😊 There Was Very Great Gladness

This gladness followed real weeping only days earlier in this same chapter.

Genuine grief over sin and genuine joy in God are not opposites here.

One clears the way for the other instead of canceling it out.

The same crowd that mourned their neglect now celebrated their obedience.

Both emotions belonged to the very same act of worship.

😭 Real weeping came only days earlier

😊 Grief and joy are not opposites here

🔄 One cleared the way for the other

📖 Both belonged to the same worship

## 📅 He Read In The Book Of The Law Of God

Ezra kept reading the law aloud every day of the festival, not only once.

One powerful morning was not allowed to stand alone as the whole lesson.

Daily reading kept the crowd's attention on God's word through the entire celebration.

Feasting never became an excuse to stop listening to scripture that week.

Celebration and instruction ran side by side for the whole feast.

📅 Ezra read daily throughout the whole feast

🔁 One morning was not the whole lesson

🎉 Feasting never replaced listening to scripture

➡️ Celebration and instruction ran side by side

## 📜 On The Eighth Day Was A Solemn Assembly, According Unto The Manner

The feast itself lasted a full seven days, exactly as the law required.

An extra eighth day added one final, more solemn gathering after the celebration ended.

Leviticus twenty three had already commanded this exact closing assembly generations earlier.

According unto the manner means Ezra followed the original command precisely.

The celebration ended the same way it began, rooted in obedience to God's word.

🗓️ The feast itself lasted seven days

➕ An eighth day added a solemn close

📜 Leviticus already commanded this closing day

📖 Ezra followed the original command exactly
`.trim();

export const NEHEMIAH_EIGHT_PERSONAL_SECTIONS = parseNehemiahEightRawNotes(NEHEMIAH_EIGHT_RAW_NOTES);
