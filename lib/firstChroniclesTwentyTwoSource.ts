export type FirstChroniclesTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwentyTwoRawNotes(rawText: string): FirstChroniclesTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 22:${startVerse}` : `1 Chronicles 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Chronicles 22 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWENTY_TWO_RAW_NOTES = `# FirstChronicles 22:1-2
# 🏛️ David Marks The Building Site
---
## 🏛️ This Is The House Of The LORD God

"House" here does not mean a building yet.

It means the ground where the Temple will one day stand.

David names this spot after fire fell from heaven in the last chapter.

A single sentence turns a threshingfloor into a permanent decision.

🏛️ House here means the site, not the building
🔥 Fire fell here in the last chapter
📍 David names the future Temple ground
📖 A threshingfloor becomes a permanent decision

---

## 🔥 This Is The Altar Of The Burnt Offering For Israel

David names two things in the same breath.

The house for God and the altar for sacrifice.

That altar already stopped a plague in the chapter before this one.

Naming it again confirms it was never meant to be temporary.

🔥 David names the house and the altar
🛑 This altar already stopped a plague
📍 It was never meant to be temporary
📖 Two structures now share one holy site

---

## 🌍 Commanded To Gather Together The Strangers

"Strangers" here means foreigners living inside Israel's borders.

These were not native Israelites, but resident outsiders.

David organizes their labor years before Solomon ever becomes king.

This same foreign workforce reappears later in the book of Kings.

🌍 Strangers means foreign residents in Israel
🏗️ They were not native Israelites
🔨 David organizes labor before Solomon reigns
📖 Kings later reuses this same workforce

---

## 🪨 Set Masons To Hew Wrought Stones

A mason cuts and shapes stone for building work.

"Hew" means to cut and shape stone into a needed form.

"Wrought stones" means stones already worked smooth and ready to use.

This detail shows planning years before construction ever begins.

🪨 A mason shapes stone for building
🔨 Hew means cutting into shape
⬜ Wrought stones means stones already smoothed
📖 Planning starts years before construction

# FirstChronicles 22:3-5
# 🪵 Gathering Materials For The Temple
---
## 🔩 Iron In Abundance For The Nails

David stockpiles iron long before any builder needs it.

The nails held doors and gates together across the whole structure.

"Joinings" means the places where separate pieces of wood or metal connect.

Even the smallest connecting pieces get planned for in advance.

🔩 Iron supplied every nail needed
🚪 Nails held the doors and gates
🔗 Joinings means where pieces connect
📖 Small pieces were planned for too

---

## 🟫 Brass In Abundance Without Weight

"Without weight" is an old way of saying too much to count.

Nobody bothered weighing the brass because there was simply so much of it.

Solomon later uses huge amounts of brass for the temple's furnishings.

David's stockpile made that later work possible.

🟫 Without weight means too much to count
⚖️ Nobody bothered weighing the brass
🛠️ Solomon later used brass for furnishings
📖 David's stockpile made that possible

---

## 🌲 The Zidonians And They Of Tyre Brought Much Cedar Wood

Zidon and Tyre were coastal cities known for their skilled timber trade.

Cedar from that region was prized for its strength and pleasant smell.

This same partnership continues later when Solomon deals directly with king Hiram.

A trade relationship starts here that outlives David himself.

🌲 Zidon and Tyre supplied cedar wood
🪵 Cedar was prized for strength and smell
🤝 This partnership continues under Solomon
📖 A trade relationship outlives David

---

## 👶 Solomon My Son Is Young And Tender

"Tender" here does not describe Solomon's actual age.

It describes his lack of experience for a job this large.

Solomon was likely a young adult, not a literal child, when he became king.

David wants him equipped, not just old enough.

👶 Tender means inexperienced, not literally young
📆 Solomon was likely a young adult
🏗️ The job ahead was enormous
📖 David wants him equipped, not just older

---

## ✨ Exceeding Magnifical Of Fame And Of Glory

"Magnifical" is an old word meaning magnificent or splendid.

David wants a building that reflects God's own greatness.

Fame here means the Temple's reputation would spread beyond Israel's own borders.

A house for God was never meant to look ordinary.

✨ Magnifical means magnificent or splendid
🏛️ The building reflects God's greatness
🌍 Fame meant a reputation beyond Israel
📖 A house for God was never ordinary

---

## 🙏 So David Prepared Abundantly Before His Death

David is not building the Temple himself.

He is spending his final years stockpiling everything Solomon will need.

This kind of preparation is a quiet form of love for a son.

David finishes what he can, then hands off what he cannot.

🙏 David will not build the Temple himself
📦 He spends his final years stockpiling
❤️ Preparation here is a quiet form of love
📖 David hands off what he cannot finish

# FirstChronicles 22:6-10
# 👑 David's Charge To Solomon
---
## 👑 Charged Him To Build An House For The LORD God Of Israel

David calls Solomon in for a direct, personal charge.

"Charged" means gave a formal, serious instruction.

This is not a casual conversation between father and son.

It is the passing of a lifelong assignment.

👑 David gives Solomon a formal charge
🗣️ Charged means a serious instruction
🔑 This moment is father to son
📖 A lifelong assignment changes hands

---

## 🗣️ It Was In My Mind To Build An House Unto The Name Of The LORD My God

David admits his own heartfelt desire before explaining why he cannot act on it.

Wanting to build something for God is never wrong by itself.

The desire and the permission to act on it are two different things.

David separates his intention from what actually happened.

🗣️ David admits his own desire first
💛 Wanting to build God something is not wrong
🚧 Desire and permission are different things
📖 Intention alone did not decide the outcome

---

## 🩸 Thou Hast Shed Blood Abundantly And Hast Made Great Wars

God gives David a direct, personal reason for the refusal.

David's whole reign involved constant warfare to secure the kingdom.

That warfare was often necessary, but it still disqualified him from this specific task.

Even a faithful king was not exempt from this particular limit.

🩸 God gives a direct reason here
⚔️ David's reign involved constant warfare
🚫 Warfare disqualified him from this task
📖 Even a faithful king had this limit

---

## 🚫 Thou Shalt Not Build An House Unto My Name

God states the decision plainly, with no room for negotiation.

This is the same restriction already given to David back in 2 Samuel chapter seven.

The refusal was not a punishment for a single sin.

It was tied to David's whole career as a warrior king.

🚫 God states the decision plainly
📜 2 Samuel seven already gave this restriction
⚖️ This was not punishment for one sin
📖 It was tied to David's whole career

---

## 👶 A Son Shall Be Born To Thee Who Shall Be A Man Of Rest

God promises a specific future son, not just any heir.

"A man of rest" describes someone whose reign brings peace instead of war.

That description sets up a sharp contrast with David's own violent reign.

The son's very nature will differ from the father's.

👶 God promises one specific son
🕊️ Man of rest means a peaceful reign
⚖️ This contrasts with David's violent reign
📖 Father and son differ by design

---

## ✌️ I Will Give Him Rest From All His Enemies Round About

God is not only naming Solomon's character in advance.

He is promising the actual military outcome of his reign.

First Kings later confirms this promise came true, with peace on every border.

The rest Solomon receives was planned before he was even born.

✌️ God promises the outcome in advance
🗺️ Peace would reach every border
📜 1 Kings later confirms this came true
📖 The rest was planned before birth

---

## 🕊️ His Name Shall Be Solomon And I Will Give Peace And Quietness Unto Israel

"Solomon" comes from the Hebrew word for peace, shalom.

The name itself becomes a promise before the boy is even named at birth.

Quietness here means a settled, undisturbed kingdom, free from constant threat.

A name carries the whole plan for this son's reign.

🕊️ Solomon comes from the word for peace
👶 The name is a promise before birth
🏞️ Quietness means a settled kingdom
📖 A name carries the plan for his reign

---

## 🏛️ He Shall Build An House For My Name

God repeats the promise a second time, now to seal it further.

What David was forbidden to do, his son will now be allowed to finish.

The task moves from father to son without ever disappearing.

God's plan simply shifts to the next generation.

🏛️ God repeats the promise again
🔁 David's forbidden task passes to Solomon
🧭 The task never disappears
📖 God's plan shifts to the next generation

---

## 👑 He Shall Be My Son And I Will Be His Father

God promises Solomon a father son relationship with Himself.

This same language reappears later applied to Jesus in the New Testament.

The relationship is personal, not political or ceremonial.

God commits to Solomon the way a real father commits to a child.

👑 God promises a father son bond
📜 The New Testament later applies this to Jesus
❤️ The relationship is personal, not political
📖 God commits like a real father

---

## ♾️ I Will Establish The Throne Of His Kingdom Over Israel For Ever

This promise reaches far beyond Solomon's own lifetime.

It becomes the foundation for every later hope of a forever king.

The New Testament eventually applies this exact promise to Jesus Christ.

A father's private conversation ends up shaping the whole story of scripture.

♾️ The promise outlasts Solomon's lifetime
👑 It becomes the hope for a forever king
📜 The New Testament applies it to Jesus
📖 One conversation shapes the whole story

# FirstChronicles 22:11-13
# 🙏 The Blessing And The Warning
---
## 🤲 Now My Son The LORD Be With Thee

David's tone shifts here from explanation to blessing.

He has just finished telling Solomon why he himself was disqualified.

Now he speaks a direct prayer over his son's future instead.

Explanation gives way to genuine fatherly hope.

🤲 David shifts from explaining to blessing
🙏 He just finished explaining his disqualification
❤️ Now he prays over Solomon's future
📖 Explanation gives way to fatherly hope

---

## 🌱 Prosper Thou And Build The House Of The LORD Thy God

"Prosper" here means more than simply having wealth.

It means the whole project succeeding under God's own favor.

David ties Solomon's personal success directly to this one building task.

Success and obedience are bound together in this blessing.

🌱 Prosper means more than wealth
✅ It means success under God's favor
🏗️ Success is tied to this one task
📖 Success and obedience are bound together

---

## 🧠 Only The LORD Give Thee Wisdom And Understanding

David asks for something specific, not just general blessing.

Wisdom and understanding, not wealth or military strength, top his list.

This exact prayer gets answered directly in Solomon's own request at Gibeon.

A father's hope becomes his son's own choice later.

🧠 David asks for wisdom specifically
📋 Wisdom tops the list, not wealth
🙏 Solomon later asks for this at Gibeon
📖 A father's hope becomes a son's choice

---

## 📜 Give Thee Charge Concerning Israel That Thou Mayest Keep The Law

God's gift of wisdom comes paired with a real responsibility.

Solomon is charged with governing the whole nation, not just himself.

"Keep the law" means ruling by God's standard, not personal preference.

Wisdom without obedience was never the actual goal.

📜 Wisdom comes paired with responsibility
🏛️ Solomon must govern the whole nation
⚖️ Keep the law means rule by God's standard
📖 Wisdom without obedience was not the goal

---

## 💪 Be Strong And Of Good Courage Dread Not Nor Be Dismayed

This exact phrase already appeared once before, spoken to Joshua.

God used it to prepare a leader for a huge, unfamiliar task.

David now hands Solomon the very same charge before the same kind of assignment.

Courage gets passed down the same way wisdom does.

💪 This phrase already appeared with Joshua
🗺️ It prepared a leader for a huge task
🔁 David passes down the same charge
📖 Courage gets passed down like wisdom

# FirstChronicles 22:14-16
# 💰 Resources Without Number
---
## 😔 In My Trouble I Have Prepared For The House Of The LORD

"Trouble" here does not mean complaining about hardship.

It refers honestly to David's difficult, war filled reign.

Even during hard years, David kept setting resources aside for this project.

Difficulty never stopped the preparation from continuing.

😔 Trouble means David's difficult reign
⚔️ His years were filled with war
📦 He still set resources aside
📖 Difficulty never stopped the preparation

---

## 💰 An Hundred Thousand Talents Of Gold And A Thousand Thousand Talents Of Silver

A talent was a unit of weight, not a coin.

One talent of gold weighed close to what a grown man weighs.

These totals are almost impossible to picture at ordinary human scale.

Many scholars believe the numbers may include gifts David gathered from conquered nations.

💰 A talent was a weight, not a coin
⚖️ One talent equaled close to a man's weight
🤯 These totals are hard to picture
📖 Many scholars link this to David's conquests

---

## 🪵 Timber Also And Stone Have I Prepared

David's list covers every category a builder would need.

Metal for structure, timber for framing, stone for the walls themselves.

Nothing about this project was left for Solomon to scramble and find later.

A father's planning removes obstacles before his son even starts.

🪵 David's list covers every category
🧱 Metal, timber, and stone all included
🚫 Nothing was left for Solomon to find
📖 Planning removes obstacles before the start

---

## 🛠️ Workmen With Thee In Abundance All Manner Of Cunning Men

"Cunning" here does not mean sneaky or deceptive.

It is an old word meaning highly skilled at a craft.

David provides the people, not just the raw materials.

A great building always needs skilled hands as much as supplies.

🛠️ Cunning does not mean sneaky here
🎨 It means highly skilled at a craft
👷 David provides people, not just supplies
📖 Skilled hands matter as much as supplies

---

## ⚡ Arise Therefore And Be Doing And The LORD Be With Thee

David closes this speech with a call to action, not more talk.

The materials and workers are ready, so the next move belongs to Solomon.

This phrase echoes the same urgency found throughout the book of Joshua.

Preparation always has to end somewhere and turn into work.

⚡ David closes with a call to action
📦 The resources are ready for Solomon
📜 This echoes urgency found in Joshua
📖 Preparation must eventually turn into work

# FirstChronicles 22:17-19
# 🕊️ The Princes Are Called To Help
---
## 📯 David Also Commanded All The Princes Of Israel To Help Solomon

David widens the charge beyond his own family now.

"Princes" here means Israel's tribal and military leaders, not royal children.

Solomon will need the whole nation's leadership, not just his father's resources.

A personal project becomes a shared national effort.

📯 David widens the charge nationwide
👥 Princes here means tribal leaders
🤝 Solomon needs the whole nation's help
📖 A personal project becomes a shared one

---

## ❓ Is Not The LORD Your God With You

David turns from personal charge to a rhetorical question for the crowd.

The answer is obviously yes, and everyone listening already knows it.

He is reminding the leaders of what they already have, not announcing new news.

A question can make a shared truth land harder than a statement.

❓ David asks a rhetorical question
✅ The obvious answer is yes
👥 He reminds leaders of what they have
📖 A question can land harder than a statement

---

## 🕊️ Hath He Not Given You Rest On Every Side

This question recalls exactly the same promise made about Solomon back in verse nine.

The rest has already arrived, this is not a future hope anymore.

David asks the leaders to notice the peace they are already living inside.

Gratitude for what already happened should shape what happens next.

🕊️ Rest recalls the promise from verse nine
✅ The rest has already arrived
👀 David asks leaders to notice the peace
📖 Gratitude should shape what comes next

---

## 🗺️ The Land Is Subdued Before The LORD And Before His People

"Subdued" means brought fully under control, with no remaining threat.

David credits this military outcome to God first, then to the people.

The order of that credit matters, God gets named before the army does.

Victory belongs to God even when human soldiers did the fighting.

🗺️ Subdued means fully under control
🙏 God gets credited before the army
📋 The order of credit matters
📖 Victory belongs to God, not just soldiers

---

## ❤️ Now Set Your Heart And Your Soul To Seek The LORD Your God

David gives the leaders one final, personal instruction before ending.

"Heart and soul" means total, undivided devotion, not partial effort.

This is not a suggestion for private worship alone.

It is a call meant to shape the whole nation's direction.

❤️ David gives one final instruction
💯 Heart and soul means total devotion
🙏 This is not private worship only
📖 It shapes the whole nation's direction

---

## ⛪ Build Ye The Sanctuary Of The LORD God

The final word of this chapter is a direct command to act.

"Sanctuary" means a set apart, holy dwelling place for God.

Everything David has prepared, materials, workers, and leaders, points toward this one command.

The chapter closes on instruction, not celebration.

⛪ The chapter ends with a direct command
🙏 Sanctuary means a holy dwelling place
📦 Everything prepared points to this command
📖 The chapter closes on instruction, not celebration

---

## 📦 To Bring The Ark Of The Covenant Of The LORD And The Holy Vessels Of God

The ark has been sitting in a separate tent in Jerusalem since chapter sixteen.

This new house will finally reunite the ark with a true sanctuary.

"Holy vessels" means the sacred items used for worship and sacrifice.

The whole chapter has been building toward this one final purpose.

📦 The ark has waited since chapter sixteen
⛪ This house reunites the ark with worship
🏺 Holy vessels means sacred worship items
📖 The whole chapter built toward this purpose
`.trim();

export const FIRST_CHRONICLES_TWENTY_TWO_PERSONAL_SECTIONS = parseFirstChroniclesTwentyTwoRawNotes(FIRST_CHRONICLES_TWENTY_TWO_RAW_NOTES);
