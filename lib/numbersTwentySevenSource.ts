export type NumbersTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentySevenRawNotes(rawText: string): NumbersTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 27:${startVerse}` : `Numbers 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 27 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_SEVEN_RAW_NOTES = `# Numbers 27:1-4
# 👧 The Daughters Of Zelophehad Step Forward
---
## 📜 The Son Of Hepher, The Son Of Gilead, The Son Of Machir, The Son Of Manasseh
This is a full four-generation family chain, listed backward from Zelophehad up to Manasseh, Joseph's son. Legal claims in Israel depended on proving exactly which family and tribe you belonged to, so naming every link in the chain wasn't padding, it was the daughters' proof that they had a real, provable right to make this request.

📜 Four generations named to prove tribal and family standing

⚖️ This detail is the legal foundation for everything that follows

🔑 The same family line traced back in Numbers 26:29-33

## 👧 The Daughters Of Zelophehad... Mahlah, Noah, Hoglah, Milcah, And Tirzah
These five sisters were already named once, back in the census of Numbers 26:33, but there they were just a genealogy entry. Here, in this chapter, they become people with a voice, stepping forward together to argue their own case.

👧 The same five names first listed in Numbers 26:33

🗣️ Now shown as active participants, not just names in a list

🔑 One of the few moments in the Torah where named women bring their own legal case

## 🚪 They Stood Before Moses, And Before Eleazar The Priest, And Before The Princes And All The Congregation
The sisters didn't approach Moses privately. They brought their case in front of the top religious leader, the tribal leaders, and the whole community at once, the ancient equivalent of a full public hearing.

🚪 A fully public appeal, not a private request

⚖️ Addressed to every level of Israel's leadership at once

🔑 Shows real confidence that their claim could stand up to public scrutiny

## 🛕 By The Door Of The Tabernacle Of The Congregation
The entrance to the tabernacle was where Israel's most serious legal and religious business was handled, since it was considered the meeting place between the people and God. Choosing this spot signaled that this wasn't a small family dispute, it was a formal legal matter.

🛕 The tabernacle entrance functioned as Israel's courtroom

⚖️ Signals the seriousness of the daughters' claim

🔑 The same location where major disputes and offerings were brought before the Lord

## ⚰️ Our Father Died In The Wilderness
This confirms Zelophehad belonged to the generation God sentenced to die in the wilderness back in Numbers 14, after Israel refused to trust God and enter Canaan following the spies' report. He was one of the many ordinary men who died simply for being part of that condemned generation.

⚰️ Zelophehad died as part of the generation judged in Numbers 14

📆 That judgment played out over the roughly 38 years of wandering

🔑 Explains why he never reached Canaan, without singling him out for a unique crime

## ⚡ Not In The Company Of Them That Gathered Themselves Together Against The Lord In The Company Of Korah
The daughters go out of their way to clear their father's name of Israel's most infamous rebellion, the uprising in Numbers 16 where Korah, Dathan, and Abiram were swallowed by the earth for openly defying Moses and Aaron.

⚡ A direct denial that Zelophehad joined Korah's rebellion

🌍 Korah's revolt and its judgment are described in Numbers 16

🔑 The daughters protect their father's reputation before asking for anything

## 💀 But Died In His Own Sin, And Had No Sons
"His own sin" most likely points back to the general judgment on the whole unbelieving generation from Numbers 14, not one specific dramatic act like Korah's. Zelophehad wasn't a rebel leader, just an ordinary man caught under a sentence that applied to almost everyone his age.

💀 Likely refers to the general Numbers 14 judgment, not a unique crime

👨‍👧 Having no sons is the actual legal problem the daughters need solved

🔑 Sets up the exact question Moses has never had to answer before

## 🏠 Why Should The Name Of Our Father Be Done Away From Among His Family
In this culture, a family's name and identity lived on mainly through land ownership passed down to sons. If Zelophehad's line got no land, his name would essentially vanish from Israel's memory and from the record of the tribes.

🏠 Land ownership was how a family's name survived across generations

📉 No sons meant no land, and no land meant the name would disappear

🔑 The daughters are fighting to preserve their father's memory, not just get property

## ✋ Give Unto Us Therefore A Possession Among The Brethren Of Our Father
This is the exact legal request: land among their father's brothers, in the tribe of Manasseh, the same inheritance Zelophehad would have received if he'd had a son. They aren't asking for a favor, they're asking for what would already be theirs under a different family situation.

✋ A specific, concrete request: land within their father's own tribal branch

⚖️ Framed as restoring a fair outcome, not requesting special treatment

🔑 This exact request becomes the test case for a brand-new law

# Numbers 27:5-7
# ⚖️ Moses Brings The Case To God
---
## 🙏 Moses Brought Their Cause Before The Lord
Moses doesn't rule on this himself. When Israel's existing law had no answer for a new situation, Moses's pattern was to take the question straight to God rather than guess, the same approach used for the Sabbath-breaker in Numbers 15:32-36 and the blasphemer in Leviticus 24:10-12.

🙏 Moses refuses to invent an answer on his own authority

📖 Matches his handling of other unprecedented legal questions elsewhere in the Torah

🔑 Shows Israel's law growing case by case under direct divine guidance

## 📣 The Lord Spake Unto Moses, Saying
This phrase marks a direct answer from God, not Moses's own opinion or a guess based on existing custom. What follows carries the same authority as any other law given at Sinai.

📣 Signals a direct, authoritative divine ruling

⚖️ Carries the same weight as the rest of the Law

🔑 The daughters' question gets answered at the highest possible level

## ✅ The Daughters Of Zelophehad Speak Right
"Right" here means correct, fair, and legally sound, not just polite or well-spoken. God is publicly confirming that these five women argued their case accurately and justly.

✅ "Speak right" means their legal argument was correct

👍 A clear, public vindication of their claim

🔑 God sides with the petitioners against the existing gap in the law

## 🏡 Thou Shalt Surely Give Them A Possession Of An Inheritance Among Their Father's Brethren
God grants the daughters exactly what they asked for in verse 4: real land, in the same location, among Zelophehad's own brothers in Manasseh. Their specific request becomes an actual command.

🏡 The daughters receive precisely the land they requested

📜 Their private appeal becomes an official ruling

🔑 The first concrete legal outcome of the whole chapter

## 🔁 Cause The Inheritance Of Their Father To Pass Unto Them
This is the moment daughters are formally allowed to inherit land in Israel for the first time, when a father dies with no sons. It's a genuine legal first, not just a one-time exception made only for this one family.

🔁 The first time daughters are granted a father's land inheritance

⚖️ Sets a real precedent, not a one-family exception

🔑 This single ruling reshapes property law for the rest of Israel's history

# Numbers 27:8-11
# 📜 A New Law For All Israel
---
## 👧 If A Man Die, And Have No Son, Then Ye Shall Cause His Inheritance To Pass Unto His Daughter
God turns Zelophehad's individual case into a permanent rule for the whole nation. From now on, any Israelite family with no sons has a clear answer: the daughters inherit, instead of the land being lost or reassigned outside the family.

👧 One family's question becomes a law covering every future Israelite family

📏 The first tier of a new inheritance chain, starting with daughters

🔑 The daughters' names get preserved, but so does the whole legal system after them

## 👨‍👩‍👦 If He Have No Daughter, Then Ye Shall Give His Inheritance Unto His Brethren
If there's no daughter either, the land moves sideways to the dead man's own brothers rather than leaving the immediate family. This keeps the property inside the closest possible relatives.

👨‍👩‍👦 Second tier: brothers inherit if there are no children at all

🏠 Keeps land as close to the original family as possible

🔑 Each tier only activates if every closer option is unavailable

## 👴 If He Have No Brethren, Then Ye Shall Give His Inheritance Unto His Father's Brethren
With no children and no brothers, the land goes to the dead man's uncles, his father's brothers. The law keeps widening the circle only as far as it has to.

👴 Third tier: uncles inherit if there are no brothers either

📏 A carefully ordered chain, not a random free-for-all

🔑 Land almost never leaves the extended family line by this system

## 🧬 Unto His Kinsman That Is Next To Him Of His Family, And He Shall Possess It
This is the final catch-all: whoever is the closest living relative, however distantly related, gets the land if every closer tier is empty. The goal throughout is that land always stays inside a tribe and family, never becomes ownerless or gets absorbed by outsiders.

🧬 Final tier: the nearest relative of any degree

🚫 Built to make sure land never ends up ownerless or outside the tribe

🔑 Ties directly into why land later can't be permanently sold outside a family, seen in Leviticus 25

## ⚖️ It Shall Be Unto The Children Of Israel A Statute Of Judgment, As The Lord Commanded Moses
"Statute of judgment" means this is now a permanent, binding legal rule courts and leaders must follow, not a one-time favor. It's unusual in the Torah for a law like this to begin with an ordinary family's specific question instead of being announced as a general command from the start.

⚖️ Officially locked in as lasting Israelite law

🙋 A rare case of Torah law growing directly out of a real family's petition

🔑 Five sisters asking one honest question permanently changed Israel's legal code

# Numbers 27:12-14
# ⛰️ Moses Is Told He Will Die
---
## ⛰️ Get Thee Up Into This Mount Abarim
Mount Abarim is a mountain range east of the Jordan River, in the territory Israel had just taken from Sihon and Og back in Numbers 21. From up there, someone could look west across the Jordan valley into the land of Canaan itself.

⛰️ A mountain range east of the Jordan, in newly conquered territory

👀 High enough to see across into the Promised Land itself

🔑 Later identified more specifically as Mount Nebo in Deuteronomy 32:49

## 🗺️ See The Land Which I Have Given Unto The Children Of Israel
God allows Moses to look at the Promised Land with his own eyes, even though he will never be allowed to walk into it. This is a real gift, not just a cruel reminder of what he's losing.

🗺️ Moses gets to see the land, even though he can't enter it

🎁 A genuine mercy, not only a punishment

🔑 Confirms the promise is real and about to be fulfilled, even for the generation left behind

## 💀 Thou Also Shalt Be Gathered Unto Thy People, As Aaron Thy Brother Was Gathered
"Gathered unto thy people" is a gentle way of saying death, picturing it as reuniting with ancestors who died before you rather than simply ending. Aaron had already died this way back in Numbers 20:23-29, on Mount Hor.

💀 A softer Hebrew way of describing death as a family reunion

⚰️ Aaron's death is described the exact same way in Numbers 20

🔑 Moses is now told plainly that his own death is coming soon too

## 🪨 Ye Rebelled Against My Commandment... In The Strife Of The Congregation, To Sanctify Me At The Water Before Their Eyes
This is the reason Moses himself can't enter Canaan: back in Numbers 20:1-13, Israel ran out of water and complained, and God told Moses to speak to a rock so water would flow. Instead, in frustration, Moses struck the rock twice with his staff, disobeying the exact instruction in front of the whole nation.

🪨 A callback to Moses striking the rock instead of speaking to it, Numbers 20:1-13

😤 Done publicly, in anger, in front of all of Israel

🔑 "Sanctify me" means Moses's actions in that moment misrepresented God's character to the people watching

## 🏞️ That Is The Water Of Meribah In Kadesh In The Wilderness Of Zin
"Meribah" means "strife" or "quarreling" in Hebrew, and the place kept that name permanently as a reminder of Israel's complaint and Moses's failure there. Kadesh sat in the wilderness of Zin, a region Israel passed through repeatedly during the wandering years.

🏞️ "Meribah" literally means strife or quarreling

📍 Located in the wilderness of Zin, near Kadesh

🔑 A place name that permanently marks one moment's consequences for Moses

# Numbers 27:15-17
# 🐑 Moses Asks For A Shepherd
---
## 🙏 Moses Spake Unto The Lord, Saying
Moses has just been told he's going to die soon, yet his very next words aren't about himself at all. He immediately asks God to provide for Israel's future, a striking act of selflessness right after receiving his own death sentence.

🙏 Moses's first response to his own death sentence is concern for Israel

❤️ A clear character moment showing where his priorities actually sit

🔑 Even facing death, Moses's focus stays on the people, not himself

## 🌬️ Let The Lord, The God Of The Spirits Of All Flesh, Set A Man Over The Congregation
This unusual title for God, "the God of the spirits of all flesh," stresses that God alone has authority over every living being, not just Israel. Moses uses it deliberately here, since choosing the next leader of the whole nation is exactly the kind of decision that requires that level of authority.

🌬️ A title emphasizing God's authority over every living person

👑 Fitting language for a decision this consequential

🔑 Moses leaves the actual choice entirely up to God, naming no candidate himself

## 🚶 Which May Go Out Before Them, And Which May Go In Before Them
This is a Hebrew idiom for active, hands-on leadership, someone who physically leads the people out to battle and safely brings them back again, not a distant administrator. It's the language of a field commander, not a desk job.

🚶 An idiom describing a leader who personally leads in battle

⚔️ Points toward the military leadership Israel will soon need for conquest

🔑 Exactly the kind of leader Joshua is about to become

## 🐑 That The Congregation Of The Lord Be Not As Sheep Which Have No Shepherd
Sheep without a shepherd wander, scatter, and become easy prey, a vivid and familiar image in a culture built around herding. Moses is warning that a leaderless Israel wouldn't just be disorganized, it would be genuinely vulnerable.

🐑 A common ancient image for danger and vulnerability without leadership

🛡️ Warns that leaderless Israel could scatter or be preyed upon

🔑 This same shepherd image reappears centuries later in Matthew 9:36, describing Jesus's compassion for the crowds

# Numbers 27:18-23
# 🌟 Joshua Is Commissioned
---
## 🕵️ Take Thee Joshua The Son Of Nun, A Man In Whom Is The Spirit
God answers immediately, and the choice isn't random. Joshua was one of the twelve spies sent into Canaan back in Numbers 13-14, and one of only two who trusted God's promise instead of giving in to fear.

🕵️ Joshua was one of the twelve spies sent in Numbers 13

💪 One of only two spies who gave a faithful, hopeful report

🔑 "In whom is the spirit" points to qualities Joshua had already proven decades earlier

## ✋ Lay Thine Hand Upon Him
This physical gesture was how leadership and authority were formally transferred from one person to another in this culture. It's a visible, hands-on way of publicly marking Joshua as Moses's chosen successor.

✋ A physical act symbolizing the transfer of authority

👐 Makes the succession visible, not just a private decision

🔑 The same kind of gesture used elsewhere in the Torah to ordain priests and leaders

## 🛕 Set Him Before Eleazar The Priest, And Before All The Congregation
Just like the daughters' legal case earlier in this chapter, Joshua's appointment happens in public, in front of the priest and the entire community, not quietly or behind closed doors. Everyone would witness exactly who Israel's next leader was.

🛕 A fully public appointment, matching the chapter's opening scene

👥 Witnessed by the priest and the whole congregation together

🔑 Public commissioning removes any future doubt about who was chosen

## 📣 Give Him A Charge In Their Sight
"A charge" means specific instructions and responsibilities are spoken over Joshua out loud, in front of everyone, not handed to him privately. The whole nation hears exactly what Joshua is now expected to do.

📣 Instructions given out loud, publicly, not privately

👂 The whole nation hears Joshua's new responsibilities directly

🔑 Leaves no room for confusion about what authority Joshua now carries

## 👑 Put Some Of Thine Honour Upon Him
The word "some" matters here. Joshua receives real, genuine authority, but not the full measure of what Moses himself carried as Israel's unique lawgiver and prophet.

👑 "Some," not "all" -- a real but smaller measure of Moses's authority

📉 Joshua doesn't fully replace Moses's unique role

🔑 Sets up why Joshua leads differently than Moses did, seen in the next phrase

## 🎲 He Shall Stand Before Eleazar The Priest, Who Shall Ask Counsel For Him After The Judgment Of Urim
The Urim was a sacred object kept in the high priest's breastplate, used to seek yes-or-no answers from God on major decisions. Unlike Moses, who spoke with God directly, face to face, according to Numbers 12:6-8, Joshua will need Eleazar and the Urim as a go-between for major decisions.

🎲 The Urim was a priestly tool for seeking God's direct guidance

🗣️ Moses spoke to God face to face; Joshua needs a priestly intermediary

🔑 A real, visible difference between Moses's unique office and every leader after him

## 🚶 At His Word Shall They Go Out, And At His Word They Shall Come In
This directly answers Moses's own request from verse 17, word for word. Israel now has exactly the kind of active, present leader Moses asked God to provide.

🚶 A direct fulfillment of Moses's request in verse 17

✅ Confirms Joshua is precisely the leader Moses hoped for

🔑 Shows God answering a prayer in the same language it was asked

## ✅ Moses Did As The Lord Commanded Him
The chapter closes with simple obedience. Even after learning his own death is near, and even while training the very successor who will finish the journey he can't, Moses carries out God's instructions completely, without recorded complaint.

✅ Moses obeys fully despite the personal weight of the moment

🎓 Personally trains the man who will succeed him in his place

🔑 A quiet, dignified close to Moses's own leadership story
`.trim();

export const NUMBERS_TWENTY_SEVEN_PERSONAL_SECTIONS = parseNumbersTwentySevenRawNotes(NUMBERS_TWENTY_SEVEN_RAW_NOTES);
