export type NumbersSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersSixteenRawNotes(rawText: string): NumbersSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 16:${startVerse}` : `Numbers 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Numbers 16 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_SIXTEEN_RAW_NOTES = `# Numbers 16:1-3
# ⚔️ Korah's Rebellion Begins
---
## 👨‍👩‍👧 Korah, The Son Of Izhar, The Son Of Kohath, The Son Of Levi

Korah was not an outsider attacking Moses from a distance.

Kohath had four sons, Amram, Izhar, Hebron, and Uzziel.

Amram fathered Moses and Aaron.

Izhar fathered Korah.

That makes Korah and Moses first cousins.

This rebellion started inside the family, not outside it.

👨‍👩‍👧 Korah was Moses and Aaron's first cousin

🌳 Kohath had four sons, one being Izhar

🏠 The rebellion began inside the family

📖 Family conflict, not an outsider's complaint

## 🧍 Dathan And Abiram, The Sons Of Eliab...And On, The Son Of Peleth, Sons Of Reuben

These three men came from Reuben, Jacob's firstborn son.

Reuben lost his birthright generations earlier.

He slept with his father's concubine, and Jacob never forgave it.

That story is told back in Genesis thirty five and forty nine.

Reuben's whole tribe carried that lost status forward.

Joining Korah gave two very different grudges one shared cause.

👶 Reuben was Jacob's firstborn son

📜 He lost his birthright in Genesis thirty five

😔 His tribe carried that loss forward

➡️ Two grudges joined into one rebellion

## 👑 Two Hundred And Fifty Princes Of The Assembly, Famous In The Congregation, Men Of Renown

"Princes" here does not mean royalty.

It means tribal leaders, the heads of families counted back in Numbers one and two.

"Famous" and "men of renown" both mean these men were already well known and respected.

This was not a mob of nobodies.

Respected leaders make a rebellion far more convincing.

👑 Princes means tribal leaders, not royalty

⭐ These men were already well known

🗳️ Not a mob, a leadership class

📖 Respected leaders make a revolt persuasive

## 🗣️ Ye Take Too Much Upon You

Korah's accusation sits at the center of the whole rebellion.

He claims Moses and Aaron grabbed more authority than God actually gave them.

It sounds like a fairness complaint, not open rebellion.

That is exactly what makes it dangerous.

A charge dressed as fairness spreads faster than an obvious lie.

🗣️ The core accusation against Moses and Aaron

⚖️ Framed as fairness, not open rebellion

🎭 Dangerous because it sounds reasonable

📖 A dressed up lie spreads fastest

# Numbers 16:4-7
# 🔥 Moses Proposes A Test
---
## 🙇 When Moses Heard It, He Fell Upon His Face

Falling on his face was not fear or defeat.

It was a posture of prayer, a humble appeal straight to God.

Moses does this three separate times before this chapter ends.

His first move under attack is not to argue back.

It is to go to God.

🙇 Falling down means prayer, not fear

🔁 Moses does this three times in this chapter

🙏 His first move is toward God

➡️ Appeal comes before argument

## 🕯️ Cause Him To Come Near Unto Him

"Come near" is priestly language used throughout the Law.

It describes the right to approach the altar and serve in God's presence.

Only Aaron's family was ever given that right.

Korah is trying to claim it for himself.

This phrase names the exact privilege at stake in the whole chapter.

🕯️ Come near means approach the altar

🚪 Only Aaron's family held that right

🎯 The exact privilege Korah wants

📖 Names the real stakes of the test

## 🔥 Take You Censers... And Put Fire Therein, And Put Incense In Them

A censer was a small metal pan for carrying burning coals and incense.

Aaron used one like it every morning and evening inside the tabernacle.

Moses is not offering a symbolic gesture.

This same ritual, done wrong, had already killed Aaron's own sons Nadab and Abihu.

Moses hands two hundred fifty men a tool that had already proven fatal.

🔥 A censer carried burning incense before God

⚠️ The same ritual that killed Nadab and Abihu

🎯 A real test, not a symbolic one

📖 The tool had already proven fatal

## ⚠️ Ye Take Too Much Upon You, Ye Sons Of Levi

Moses throws Korah's own accusation back at him, word for word.

Korah aimed those words at Moses and Aaron's leadership.

Moses now aims them at Korah's reach for the priesthood.

The same sentence now lands on the man who first spoke it.

🔄 Korah's own words, turned back on him

🎯 Now aimed at Korah's overreach

⚖️ Same phrase, opposite target

📖 An accusation becomes its own indictment

# Numbers 16:8-11
# 👥 Moses Rebukes The Levites
---
## 🤏 Seemeth It But A Small Thing Unto You

Moses is not asking a simple question here.

He is asking whether the Levites have lost sight of what they already have.

Their calling was already an enormous honor.

Ambition can make a real privilege feel small.

🤏 A pointed question, not a simple one

🎁 The Levites already held a great honor

😑 Ambition can shrink a real gift

➡️ Sets up the list that follows

## 🎗️ That The God Of Israel Hath Separated You From The Congregation Of Israel

"Separated" means deliberately and permanently set apart.

Out of twelve tribes, the Levites alone were chosen for tabernacle service.

That was already an access to God most of Israel never had.

Korah is asking for more on top of an already rare gift.

🎗️ Separated means deliberately set apart

🏆 One tribe out of twelve, chosen

🚪 Already more access than most of Israel

📖 Korah wants more on top of much

## 👑 And Seek Ye The Priesthood Also?

Korah's real complaint finally gets named directly.

Levites cared for the tabernacle.

Only Aaron's direct descendants could serve as priests at the altar.

Korah already had honored work.

He wanted someone else's calling stacked on top of his own.

👑 Names Korah's real complaint plainly

🛠️ Levites served, priests alone stood at the altar

🎯 Korah already had honored work

➡️ He wanted a calling that was not his

## 😤 What Is Aaron, That Ye Murmur Against Him?

Aaron has no independent power of his own to resent.

He only carries out what God already assigned him.

Being angry at Aaron misses where the real decision was made.

He is the messenger, not the source.

😤 Aaron holds no independent authority

📜 He only carries out God's assignment

🎯 Anger misses the real decision maker

📖 The messenger is not the source

# Numbers 16:12-14
# 🚫 Dathan And Abiram Refuse To Come
---
## ❌ We Will Not Come Up

Moses sends for Dathan and Abiram, and they simply refuse.

They say it twice, once here and again later in this same passage.

Korah at least showed up to make his case.

These two will not even appear before Moses to argue it.

❌ A flat refusal, stated twice

🚪 They will not appear before Moses

😤 A harder stance than Korah's own

➡️ Defiance without even a conversation

## 🍯 A Land That Floweth With Milk And Honey

"A land flowing with milk and honey" is the Bible's usual phrase for the Promised Land.

Dathan and Abiram apply it here to Egypt instead.

They are calling the place of their slavery the good land they lost.

Their own history has been rewritten to fit their complaint.

🍯 Normally describes Canaan, the promised land

🔁 Here applied to Egypt instead

⛓️ Egypt was the place of their slavery

📖 A complete rewrite of their own history

## 👁️ Wilt Thou Put Out The Eyes Of These Men?

This old phrase means to deceive or blind someone to the truth.

It is not a literal threat of violence.

Dathan and Abiram accuse Moses of trying to keep Israel fooled.

A question dressed up as concern is really an accusation.

👁️ An idiom meaning to deceive, not blind

🎭 Not a literal act of violence

❓ Accuses Moses of fooling the people

📖 A question that hides an accusation

# Numbers 16:15-19
# 😠 The Test Begins
---
## 😠 Moses Was Very Wroth

"Wroth" is an old word for deep, burning anger.

This is the first time in the story Moses shows open anger.

Everything before this was patient, falling on his face, reasoning gently.

Dathan and Abiram's twisted accusation is what finally breaks that patience.

🔥 Wroth means deep burning anger

🆕 The first open anger Moses shows

⏳ Comes after the harshest accusation yet

➡️ Even patience has a limit

## 🫏 I Have Not Taken One Ass From Them, Neither Have I Hurt One Of Them

Moses defends his own record here, not just his feelings.

He has never exploited his position for personal gain.

Centuries later the prophet Samuel makes nearly the same claim when his leadership is questioned.

An honest record answers an accusation better than a raised voice.

🫏 Moses defends his record, not his temper

🚫 No exploitation, no abuse of power

📜 Samuel later makes a nearly identical claim

📖 An honest record outlasts an accusation

## 🔥 Take Every Man His Censer...Two Hundred And Fifty Censers

All two hundred fifty men actually go through with the test.

Every one of them brings his own censer.

Nobody backs out once the moment arrives.

That level of commitment shows how convinced this group really was.

🔥 All two hundred fifty follow through

🚫 No one backs out at the last moment

😳 Full commitment from the whole group

📖 Conviction, not a bluff

## ✨ The Glory Of The LORD Appeared Unto All The Congregation

God does not stay hidden for this moment.

His visible glory appears in front of the entire nation.

The same kind of appearance had already filled the tabernacle back in Exodus forty.

Whatever happens next cannot be explained away as coincidence.

✨ God's glory appears before the whole nation

📖 Echoes the tabernacle's dedication in Exodus forty

👀 Nobody present can miss it

➡️ What follows cannot be dismissed later

# Numbers 16:20-22
# 🙏 Moses And Aaron Intercede
---
## 🔥 Separate Yourselves From Among This Congregation, That I May Consume Them In A Moment

God offers to destroy the entire nation, not just the two hundred fifty rebels.

He had proposed judgment on this same scale before, after the golden calf and after the spies' report.

The whole camp gathering behind Korah put every single Israelite at risk.

This was never only about the ringleaders.

🔥 God offers to destroy the whole nation

🔁 The same scale as the golden calf judgment

⚖️ The crowd's support widened the danger

📖 Not only the ringleaders were at risk

## 🌬️ O God, The God Of The Spirits Of All Flesh

This title for God appears only here and in one other place in the whole Bible.

It points to God as the source of life for every living thing.

Moses and Aaron choose it deliberately.

The God who gives life to everyone should weigh that before the whole camp is destroyed.

🌬️ A rare title used only twice in scripture

💨 Points to God as life's giver

🎯 Chosen deliberately for this appeal

📖 Life's source is asked to spare life

## ⚖️ Shall One Man Sin, And Wilt Thou Be Wroth With All The Congregation?

Moses and Aaron appeal to a simple principle here.

Guilt belongs to the guilty, not to everyone standing nearby.

Abraham made a strikingly similar appeal for Sodom, asking whether the righteous should die with the guilty.

The appeal works, and judgment lands on the guilty alone.

⚖️ Guilt belongs to the guilty, not the crowd

📖 Echoes Abraham's appeal for Sodom

✅ The appeal actually succeeds

➡️ Judgment lands where the sin was

# Numbers 16:23-30
# ⚖️ The Line Is Drawn
---
## 🚶 Get You Up From About The Tabernacle Of Korah, Dathan, And Abiram

God's answer is not to destroy everyone.

Instead He commands the rest of the camp to physically move away from the three ringleaders' tents.

Distance itself becomes the way the innocent are protected.

The appeal from the verse before gets a specific, workable answer.

🚶 God's answer is separation, not destruction

📏 Distance protects the rest of the camp

🎯 A direct answer to the appeal made

➡️ Judgment narrows to the guilty tents

## ⚠️ Touch Nothing Of Theirs, Lest Ye Be Consumed In All Their Sins

Moses warns the crowd to stay clear of the rebels and their belongings.

Even physical contact with what they owned carried real risk.

This follows the same logic already given in the uncleanness laws of Leviticus.

Consequences here could spread by association, not only by guilt.

⚠️ Warns against touching their belongings

🦠 Follows the uncleanness laws in Leviticus

🔗 Consequences can spread by association

📖 Nearness to sin carried real risk

## 👨‍👩‍👧‍👦 Their Wives, And Their Sons, And Their Little Children

One of the hardest details in this whole chapter shows up here.

The text specifically names the wives and small children standing at the tent doors.

It does not soften what is about to happen or hide who was standing there.

The Bible does not pretend this rebellion only touched the guilty men.

👨‍👩‍👧‍👦 Wives and small children are named directly

😔 One of the hardest details in the chapter

🚫 The text does not soften this

📖 The cost is not hidden from the reader

## 🎯 Hereby Ye Shall Know That The LORD Hath Sent Me... For I Have Not Done Them Of Mine Own Mind

Moses puts everything on the line in this one sentence.

He is not asking Israel to simply trust him.

He states in advance exactly what would prove his leadership true or false.

He risks his entire credibility on a specific, public outcome.

🎯 States in advance what would prove him wrong

📢 Said publicly, before the outcome is known

⚖️ Risks his whole credibility on one test

📖 Truth staked on a testable outcome

## 🕳️ They...Went Down Quick Into The Pit

"Quick" here is an old word meaning alive, not fast.

It is the same meaning behind the older phrase "the quick and the dead."

Moses predicts the rebels will be swallowed while still living.

Not killed first and then buried, but taken down alive.

🕳️ Quick is old English for alive

😱 Predicts they are swallowed alive

🎯 Not death first, then burial

📖 Same meaning as "the quick and the dead"

# Numbers 16:31-35
# 🌍 The Earth Opens
---
## ⚡ As He Had Made An End Of Speaking All These Words

The timing here is immediate and exact.

Judgment happens the instant Moses finishes speaking.

Not later, not gradually, not after some delay.

There is no gap where the prediction could look like a lucky guess.

⚡ Happens the moment Moses stops speaking

⏱️ No delay, no gradual buildup

🎯 No room to call it coincidence

📖 Timing itself becomes part of the proof

## 🪨 The Ground Clave Asunder That Was Under Them

"Clave asunder" is old English for split completely apart.

The ground does not just crack somewhere nearby.

It opens specifically under the men standing there.

A precise judgment, not a random disaster.

🪨 Clave asunder means split completely apart

🎯 Opens exactly under the rebels

🚫 Not a random or nearby disaster

📖 Precision, not general destruction

## 😱 All Israel That Were Round About Them Fled At The Cry Of Them

The crowd's panic is described in raw, human terms here.

People are screaming and running as the ground opens beneath their neighbors.

This is not a calm, distant miracle happening far away.

It is a terrifying scene happening up close.

😱 Described in raw human panic

🏃 People scream and run in real time

🚫 Not calm or distant at all

📖 A terrifying scene, not an abstraction

## 💭 Lest The Earth Swallow Us Up Also

The fleeing crowd's own words reveal what they understood.

They knew this judgment was targeted, aimed at the rebels specifically.

Their fear is for their own safety, not grief for the men who died.

Even in a panic, the message of the judgment landed clearly.

💭 Reveals the crowd understood the target

😨 Fear for themselves, not grief for the dead

🎯 The judgment's meaning landed even in panic

➡️ Understanding did not require sympathy

## 🔥 There Came Out A Fire From The LORD, And Consumed The Two Hundred And Fifty Men

This is a separate judgment from the earth swallowing Korah's household.

The two hundred fifty censer bearing leaders die by fire instead.

This echoes exactly how Nadab and Abihu died for unauthorized incense back in Leviticus.

The punishment matches the specific sin, fire judges those who misused fire.

🔥 A separate judgment from the earth opening

🎯 Punishment matches the specific misuse

⚖️ Fire judges those who misused fire

📖 Echoes Nadab and Abihu's death by fire

# Numbers 16:36-40
# 🔨 The Censers Become A Warning
---
## 👨‍⚕️ Speak Unto Eleazar The Son Of Aaron The Priest, That He Take Up The Censers

God assigns this task to Eleazar, not to Aaron himself.

As the active high priest, Aaron likely needed to stay clear of the dead.

Purity rules given earlier in Leviticus already shape this choice.

Eleazar, next in line, handles the burned remains instead.

👨‍⚕️ Assigned to Eleazar, not Aaron

🚫 Likely tied to corpse purity rules

📜 Leviticus already shaped this choice

📖 The priesthood's rules already at work

## ✨ For They Are Hallowed

The two hundred fifty men used these censers wrongly.

But the objects themselves became holy the moment they were offered before the LORD.

A person's misuse does not undo an object's holy status once given.

The censers outlast the men who carried them.

✨ Wrongly used, yet the objects stayed holy

🔄 Misuse does not undo an offered object's status

⏳ The censers outlast the men who carried them

📖 Holiness given cannot be taken back by misuse

## 🔨 Broad Plates For A Covering Of The Altar

The two hundred fifty bronze censers were hammered flat.

They became a permanent covering over the altar of burnt offering.

Every Israelite bringing a sacrifice from now on would see this altar.

A judgment became something built into daily worship.

🔨 Hammered flat into the altar's covering

👁️ Seen by every Israelite who brought a sacrifice

🏛️ Built into daily worship, not forgotten

📖 A judgment turned into a lasting lesson

## 📌 A Memorial Unto The Children Of Israel... A Sign

"Memorial" and "sign" both point to the same purpose here.

They mean a permanent, physical reminder meant to outlast the people who actually saw the event.

Future generations who never watched the earth open would still see this bronze covering.

An object can carry a story further than memory alone.

📌 Memorial and sign both mean lasting reminder

🔔 Outlasts everyone who saw the event happen

👶 Future generations would still see the proof

📖 Objects can carry a story further than memory

## 🚫 That No Stranger, Which Is Not Of The Seed Of Aaron, Come Near To Offer Incense

This states the direct rule this whole event was meant to settle.

Only Aaron's actual descendants may offer incense before the LORD.

Korah's entire challenge gets a permanent, written answer.

That answer is built right into the altar itself.

🚫 States the rule this event settled

👨‍👦 Only Aaron's descendants could offer incense

📜 Korah's challenge gets a permanent answer

📖 The answer is built into the altar

# Numbers 16:41-45
# 😤 Israel Blames Moses Again
---
## 😤 On The Morrow

This whole scene happens the very next day.

The earth had just swallowed Korah's group.

Fire had just consumed the two hundred fifty leaders.

Not weeks later, when memory might have faded, but immediately.

😤 Happens the very next day

🔥 Right after the earth and fire judgment

🕐 No time to have simply forgotten

📖 Denial arrived faster than memory could fade

## 💀 Ye Have Killed The People Of The LORD

This accusation is staggering given what the people just watched.

The crowd blames Moses and Aaron for a judgment that came directly from God.

They saw the earth open and fire fall with their own eyes.

They still found a way to place the blame on human leaders.

💀 Blames Moses for what God did

👀 Said by people who watched it happen

🎭 Denial that ignores their own eyes

📖 Blame can survive plain evidence

## ☁️ The Cloud Covered It, And The Glory Of The LORD Appeared

This phrase almost repeats what happened earlier in verse nineteen.

That earlier moment came right before the first judgment in this chapter.

The nearly identical wording signals a second, similar confrontation is starting.

The pattern repeats because the underlying complaint has repeated too.

☁️ Nearly the same wording as verse nineteen

🔁 Signals a second confrontation beginning

🎯 The complaint repeated, so the pattern repeated

📖 History rhymes when the sin does

## 🔥 Get You Up From Among This Congregation, That I May Consume Them As In A Moment

God repeats almost exactly what He said back in verse twenty one.

This is a second offer to destroy the entire nation at once.

The people had just watched undeniable judgment and blamed Moses anyway.

Their continued blame put everyone at risk all over again.

🔥 Nearly repeats God's offer in verse twenty one

🔁 A second offer to destroy the nation

😤 Comes right after watching real judgment

📖 Continued blame renewed the danger

# Numbers 16:46-50
# 🕯️ Aaron Stands Between The Dead And The Living
---
## 🔥 Take A Censer, And Put Fire Therein From Off The Altar

This is the same tool that had just killed two hundred fifty men.

The difference this time is where the fire comes from.

This fire is taken from the authorized altar itself.

The censer was never the problem, using it without authorization was.

🔥 The tool that killed two hundred fifty

✅ This time the fire comes from the altar

🎯 Authorization was always the real issue

📖 The tool was never the problem

## 🏃 Go Quickly Unto The Congregation, And Make An Atonement For Them

There is real urgency in this command.

People are already dying while Aaron runs to intervene.

Atonement here is not a scheduled ritual.

It is an emergency response to an active, spreading disaster.

🏃 People are already dying as Aaron runs

⏱️ Not a scheduled ritual, an emergency

🌬️ Wrath already moving through the camp

📖 Urgency itself became part of the response

## 🧍 He Stood Between The Dead And The Living

One of the most vivid pictures in the whole book happens here.

Aaron physically positions himself between those already dead and those still at risk.

The plague simply stops advancing past where he stands.

A living picture of a priest standing in the gap for his people.

🧍 Aaron stands between death and life

🛑 The plague stops advancing at that line

👤 A vivid, literal picture of mediation

📖 A priest stands in the gap

## 🔢 Fourteen Thousand And Seven Hundred, Beside Them That Died About The Matter Of Korah

This death toll is kept separate from Korah's group on purpose.

Fourteen thousand seven hundred people died in this second wave alone.

That number sits on top of whoever died with Korah and the two hundred fifty leaders.

The chapter refuses to blur these numbers together or soften the total cost.

🔢 A separate death toll from Korah's group

📊 Fourteen thousand seven hundred died in this wave

➕ Added on top of the earlier deaths

📖 The real cost is not softened

## 🚪 Aaron Returned Unto Moses Unto The Door Of The Tabernacle Of The Congregation

The chapter closes at the very same location where the first confrontation began.

That location was the tabernacle's own door, back in verses eighteen and nineteen.

What began as a challenge to Aaron's priesthood ends with that priesthood saving the nation.

The chapter comes full circle on purpose.

🚪 Closes where the confrontation first began

🔄 The challenge ends with Aaron saving the people

⭕ A deliberate full circle ending

📖 The very thing challenged became the rescue
`.trim();

export const NUMBERS_SIXTEEN_PERSONAL_SECTIONS = parseNumbersSixteenRawNotes(NUMBERS_SIXTEEN_RAW_NOTES);
