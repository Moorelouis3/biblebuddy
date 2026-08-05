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

This is a chain of four generations, listed backward from Zelophehad up to Manasseh.

Manasseh was one of Joseph's own sons.

A legal claim in Israel depended on proving your exact family line.

Naming every generation was not filler.

It was the proof these daughters needed before anyone would hear their case.

📜 Four generations trace back to Manasseh

⚖️ Israel required proof of family line

🌳 Manasseh was one of Joseph's sons

📖 The chain becomes the daughters' legal proof

## 👧 Mahlah, And Noah, And Hoglah, And Milcah, And Tirzah

Five daughters are named here, not just counted as one family unit.

Naming them by name kept their identity in the record.

This is one of the few places in the Law where women bring their own legal case.

They are not passive characters inside someone else's story.

They stand and speak for themselves.

👧 Five daughters named individually here

🗣️ They bring their own legal case

📜 A rare moment of named women speaking

📖 They act, not just appear in a list

## 🚪 Stood Before Moses, And Before Eleazar The Priest, And Before The Princes And All The Congregation

The sisters do not approach Moses quietly or alone.

They bring their case before every level of Israel's leadership at once.

Moses led the whole nation.

Eleazar served as high priest after Aaron.

The princes led each individual tribe.

Standing before all three at once made this a full public hearing, not a private request.

🚪 A fully public appeal, not private

⚖️ Addressed to every leader at once

👑 Eleazar was high priest after Aaron

📖 Shows real confidence in their claim

## 🛕 By The Door Of The Tabernacle Of The Congregation

The entrance to the tabernacle functioned like a courtroom for Israel.

It was considered the meeting place between the people and God.

Major legal and religious decisions were often settled right there.

Choosing this spot was not random.

It signaled that this was a formal legal matter, not a family argument.

🛕 Tabernacle entrance served as a courtroom

🤝 Considered the meeting place with God

⚖️ Signals a formal legal matter here

📖 Location alone showed how serious this was

## ⚰️ Our Father Died In The Wilderness

Zelophehad belonged to the generation God said would not enter Canaan.

That judgment came in Numbers fourteen, after Israel refused to trust God at the border of the land.

An entire generation of adults died during the years of wandering that followed.

Zelophehad was simply one of them.

He was not singled out for some unusual crime.

⚰️ Zelophehad died in the wandering years

🚫 That generation was judged in Numbers fourteen

👥 An entire generation died this way

📖 He was not singled out for wrongdoing

## ⚡ Not In The Company Of Them That Gathered Themselves Together Against The Lord In The Company Of Korah

The daughters go out of their way to clear their father's name here.

Korah led Israel's most infamous rebellion against Moses and Aaron.

The ground opened and swallowed Korah and his followers in Numbers sixteen.

Zelophehad had no part in that revolt.

The daughters protect his reputation before they ask for anything at all.

⚡ Denies any link to Korah's revolt

🌍 Korah's rebellion is told in Numbers sixteen

🛡️ Protects their father's name first

📖 Reputation matters before the request itself

## 💀 But Died In His Own Sin, And Had No Sons

"His own sin" most likely points to the general judgment on that whole generation.

It does not point to one dramatic act like Korah's.

Zelophehad was an ordinary man caught under a sentence that applied to almost everyone his age.

Having no son is the real legal problem the daughters now face.

💀 Likely the general judgment, not one act

👤 Zelophehad was an ordinary man here

👨‍👧 No son creates the real legal problem

📖 Sets up the question Moses must answer

## 🏠 Why Should The Name Of Our Father Be Done Away From Among His Family

A family's name survived mainly through land passed down to sons.

No land meant the name would fade from Israel's memory.

The daughters are not only asking for property.

They are fighting to keep their father's name alive in the record of the tribes.

🏠 Land ownership kept a family's name alive

📉 No land meant the name would fade

👧 Daughters fight for more than property

📖 They protect their father's memory here

## ✋ Give Unto Us Therefore A Possession Among The Brethren Of Our Father

This is the daughters' exact legal request.

They ask for land among their father's own brothers, inside the tribe of Manasseh.

That is the same inheritance Zelophehad would have received if he had a son.

They are not asking for a favor.

They are asking for what should already belong to them.

✋ A specific request for tribal land

⚖️ The same share a son would get

🙅 Not a favor, a fair claim

📖 This becomes the test case for a law

# Numbers 27:5-7
# ⚖️ Moses Brings The Case To God
---
## 🙏 Moses Brought Their Cause Before The Lord

Moses does not decide this case on his own authority.

When Israel's law had no answer yet, his pattern was to take the question straight to God.

He used this same approach for the man who broke the Sabbath in Numbers fifteen.

He used it again for the man who cursed God in Leviticus twenty four.

Moses refused to guess at what God had not yet said.

🙏 Moses refuses to decide this alone

📜 Same pattern used in Numbers fifteen

⚱️ Also used in Leviticus twenty four

➡️ Israel's law grows case by case

## 📣 The Lord Spake Unto Moses, Saying

This phrase marks a direct answer from God, not a guess or a borrowed custom.

What follows carries the same weight as any law given at Sinai.

Moses is not offering his own opinion here.

The daughters' question gets answered at the highest level there is.

📣 Marks a direct answer from God

⚖️ Carries the same weight as Sinai's law

🙅 Not Moses's own opinion at all

📖 Answered at the highest level there is

## ✅ The Daughters Of Zelophehad Speak Right

"Right" here means correct and fair, not simply polite.

God is publicly confirming that these five women argued their case accurately.

Their claim exposed a real gap in the existing law.

God sides with them, not against them.

✅ Right means correct and legally sound

👍 A public vindication of their claim

📜 Exposes a real gap in the law

📖 God sides with the petitioners here

## 🏡 Thou Shalt Surely Give Them A Possession Of An Inheritance Among Their Father's Brethren

God grants the daughters exactly what they asked for in verse four.

They receive real land, in the same place, among Zelophehad's own brothers.

Their private appeal has just become an official command.

This is the first concrete outcome of the whole chapter.

🏡 They receive precisely the land requested

📜 A private appeal becomes an official ruling

✅ The first real outcome of the chapter

📖 God answers their exact request

## 🔁 Cause The Inheritance Of Their Father To Pass Unto Them

This is the first time daughters are allowed to inherit land in Israel.

It happens when a father dies leaving no sons behind.

This is not a special favor granted only this once.

It becomes a real precedent for the rest of Israel's history.

🔁 First time daughters inherit land here

👨‍👧 Applies when a father leaves no sons

⚖️ A precedent, not a single exception

📖 Reshapes property law going forward

# Numbers 27:8-11
# 📜 A New Law For All Israel
---
## 👧 If A Man Die, And Have No Son, Then Ye Shall Cause His Inheritance To Pass Unto His Daughter

God turns one family's case into a permanent law for the whole nation.

From now on, any family with no sons has a clear answer already in place.

The daughters inherit instead of the land being lost or reassigned.

This is the first tier of a brand new inheritance order.

👧 One case becomes law for every family

📏 First tier: daughters inherit before anyone else

🏠 Prevents land from being lost or reassigned

📖 The daughters' names help build lasting law

## 👬 If He Have No Daughter, Then Ye Shall Give His Inheritance Unto His Brethren

If there is no daughter either, the land moves to the dead man's own brothers.

This keeps the land inside the closest possible family circle.

It does not leave the immediate family for a stranger to claim.

Each tier in this law only applies once every closer option is gone.

👬 Second tier: brothers inherit next

🏠 Keeps land inside the closest family

🚫 A stranger cannot claim it here

📖 Each tier waits for the one before it

## 👴 If He Have No Brethren, Then Ye Shall Give His Inheritance Unto His Father's Brethren

With no children and no brothers, the land passes to the father's own brothers.

These are the dead man's uncles.

The law widens the circle only as far as it truly has to.

It never jumps straight to a distant relative while a closer one exists.

👴 Third tier: uncles inherit next

📏 An ordered chain, not a free choice

🎯 Widens the circle only when needed

📖 A closer relative always comes first

## 🧬 Unto His Kinsman That Is Next To Him Of His Family, And He Shall Possess It

This is the final catch all in the chain.

Whoever is the closest living relative receives the land once every closer tier is empty.

The goal throughout is that land stays inside a tribe and a family.

It should never sit ownerless or pass to an outsider.

🧬 Final tier: the nearest living relative

🚫 Land should never sit ownerless

🏘️ Keeps land inside the tribe

📖 Land never passes to an outsider here

## ⚖️ It Shall Be Unto The Children Of Israel A Statute Of Judgment, As The Lord Commanded Moses

"Statute of judgment" means this rule is now permanent and binding, not a passing favor.

Judges and leaders had to follow it in every future case.

It is unusual for a law in the Torah to start from one family's honest question.

Most laws are announced as a general command from the very start.

⚖️ A permanent, binding rule for Israel

🙋 Grew out of one family's honest question

📜 An unusual origin for a law this size

📖 Five sisters changed Israel's legal code

# Numbers 27:12-14
# ⛰️ Moses Is Told He Will Die
---
## ⛰️ Get Thee Up Into This Mount Abarim

Mount Abarim was a mountain range east of the Jordan River.

Israel had just taken this territory from two kings named Sihon and Og.

From high ground there, a person could look west across the valley into Canaan itself.

Deuteronomy later names the exact peak as Mount Nebo.

⛰️ A mountain range east of the Jordan

🗺️ Taken recently from Sihon and Og

👀 High enough to see into Canaan

📖 Later called Mount Nebo in Deuteronomy

## 👁️ See The Land Which I Have Given Unto The Children Of Israel

God lets Moses look at the promised land with his own eyes.

He will never be allowed to walk into it himself.

This is still a real gift, not only a painful reminder.

It confirms the promise is about to be kept, even for the generation left behind.

👁️ Moses sees the land, but cannot enter

🎁 A genuine gift, not only a loss

✅ Confirms the promise is about to be kept

📖 Even this generation is not forgotten

## 💀 Thou Also Shalt Be Gathered Unto Thy People, As Aaron Thy Brother Was Gathered

"Gathered unto thy people" is a gentle way of describing death.

It pictures dying as rejoining ancestors who have already passed, not simply ending.

Aaron had already died this same way, up on Mount Hor.

Moses is now told plainly that his own death is coming soon.

💀 A gentle Hebrew way to say death

👴 Pictures rejoining ancestors already gone

⛰️ Aaron died the same way on Mount Hor

📖 Moses is told his death is near

## 🪨 To Sanctify Me At The Water Before Their Eyes

This explains the exact reason Moses himself cannot enter Canaan.

Israel had run out of water and complained loudly.

God told Moses to speak to a rock so water would flow.

Moses struck the rock instead, in anger, in front of the whole nation.

🪨 Moses struck the rock instead of speaking

😤 Done in anger before all of Israel

💧 The disobedience happened at a water crisis

📖 This single act cost him entry to Canaan

## 🏞️ The Water Of Meribah In Kadesh In The Wilderness Of Zin

"Meribah" means strife or arguing in Hebrew.

The place kept that name permanently, as a reminder of Israel's complaint.

Kadesh sat inside the wilderness of Zin, a region Israel crossed many times while wandering.

The name marks one moment's lasting consequence for Moses.

🏞️ Meribah literally means strife

📍 Located in the wilderness of Zin

🔁 Israel passed through this region often

📖 One name marks a lasting consequence

# Numbers 27:15-17
# 🐑 Moses Asks For A Shepherd
---
## 🙏 Moses Spake Unto The Lord, Saying

Moses has just been told that he will die soon.

His very next words are not about himself at all.

He asks God to provide for Israel's future instead.

That is a striking act of selflessness right after hearing his own sentence.

🙏 His first response is concern for Israel

❤️ A clear window into his priorities

⏳ Comes right after his own death sentence

📖 Moses stays focused on the people, not himself

## 🌬️ The God Of The Spirits Of All Flesh

This unusual title stresses that God rules over every living being, not only Israel.

Moses chooses this title on purpose here.

Choosing the next leader of the whole nation calls for that level of authority.

Moses names no candidate himself and leaves the choice entirely to God.

🌬️ Stresses God's rule over all living things

👑 Fitting language for this size of decision

🙋 Moses names no candidate himself

📖 The choice is left entirely to God

## 🚶 Which May Go Out Before Them, And Which May Go In Before Them

This is a Hebrew idiom for hands on, active leadership.

It pictures someone who personally leads people out to battle and safely brings them home.

It is not the language of a distant administrator.

It is the language of a leader who fights alongside his people.

🚶 An idiom for hands on leadership

⚔️ Pictures leading people out to battle

🏠 And safely bringing them home again

📖 Not a distant, administrative kind of leader

## 🐑 As Sheep Which Have No Shepherd

Sheep without a shepherd wander off and become easy targets for predators.

This image would be instantly familiar in a culture built around herding.

Moses is warning that a leaderless Israel would not just be disorganized.

It would be genuinely unsafe.

🐑 A common image for danger without leadership

🦁 Unshepherded sheep become easy targets

⚠️ Warns Israel could scatter or be preyed on

📖 The same image returns later for Jesus

# Numbers 27:18-23
# 🌟 Joshua Is Commissioned
---
## 🕵️ Take Thee Joshua The Son Of Nun, A Man In Whom Is The Spirit

God answers immediately, and the choice is not random.

Joshua was one of twelve spies sent into Canaan back in Moses's day.

He was one of only two spies who trusted God's promise instead of giving in to fear.

"The spirit" in him points to qualities already proven decades earlier.

🕵️ Joshua was one of the twelve spies

💪 One of only two who trusted God

⏳ His character was proven decades earlier

📖 God's choice was already tested

## ✋ Lay Thine Hand Upon Him

This physical act was how authority was formally passed from one leader to another.

It made the succession visible, not just a private decision.

Everyone watching would know exactly what this gesture meant.

The same kind of gesture appears elsewhere in the Law to ordain priests and leaders.

✋ A physical act transferring authority

👀 Makes the succession publicly visible

🤝 Everyone present understands its meaning

📖 The same gesture ordains priests elsewhere

## 🛕 Set Him Before Eleazar The Priest, And Before All The Congregation

Just like the daughters' case earlier in this chapter, this happens in public.

Joshua's appointment takes place before the priest and the entire community.

Nothing about this new leadership is settled quietly or behind closed doors.

Everyone present would witness exactly who Israel's next leader was.

🛕 A fully public appointment, like the chapter's opening

👥 Witnessed by the priest and the whole nation

🚫 Nothing settled quietly behind closed doors

📖 No future doubt about who was chosen

## 📣 Give Him A Charge In Their Sight

"A charge" means specific instructions are spoken over Joshua out loud.

This happens in front of everyone, not handed to him privately.

The whole nation hears exactly what Joshua is now expected to do.

There is no room left for confusion about his new authority.

📣 Instructions spoken aloud, not given privately

👂 The whole nation hears his new role

🎯 Everyone knows exactly what he must do

📖 No confusion left about his authority

## 👑 Put Some Of Thine Honour Upon Him

The word "some" matters a great deal here.

Joshua receives real, genuine authority from Moses.

He does not receive the full measure of what Moses carried as Israel's lawgiver and prophet.

This sets up why Joshua will lead differently than Moses did.

👑 Some, not all, of Moses's authority

📉 Joshua does not fully replace Moses

🎓 A real but smaller measure of honor

📖 Sets up a different kind of leadership

## 🎲 He Shall Stand Before Eleazar The Priest, Who Shall Ask Counsel For Him After The Judgment Of Urim

The Urim was a sacred object kept in the high priest's breastplate.

It was used to seek yes or no answers from God on major decisions.

Moses spoke with God directly, face to face.

Joshua will need Eleazar and the Urim standing between him and God.

🎲 The Urim gave yes or no answers

🗣️ Moses spoke with God face to face

🙏 Joshua needs a priest standing between

📖 A real difference from Moses's unique office

## 🚶 At His Word Shall They Go Out, And At His Word They Shall Come In

This directly answers Moses's own request from just a few verses earlier.

Israel now has exactly the kind of active, present leader Moses asked God to provide.

God answers the prayer using nearly the same words it was asked in.

The shepherd Moses asked for has now arrived.

🚶 Directly answers Moses's own request

✅ Confirms Joshua as the leader Moses hoped for

🔁 God answers using nearly the same words

📖 The shepherd Moses asked for has arrived

## ✅ Moses Did As The Lord Commanded Him

The chapter closes with simple obedience.

Moses has just learned that his own death is near.

He is training the very successor who will finish the journey he cannot.

He carries out God's instructions completely, without any recorded complaint.

✅ Moses obeys despite the weight of the moment

🎓 He trains the man who succeeds him

🤐 No recorded complaint from Moses here

📖 A quiet, dignified close to his leadership
`.trim();

export const NUMBERS_TWENTY_SEVEN_PERSONAL_SECTIONS = parseNumbersTwentySevenRawNotes(NUMBERS_TWENTY_SEVEN_RAW_NOTES);
