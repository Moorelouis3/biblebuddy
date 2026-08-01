export type ExodusSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusSixRawNotes(rawText: string): ExodusSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 6:${startVerse}` : `Exodus 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 6 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_SIX_RAW_NOTES = `# Exodus 6:1-5
# ✨ God Reveals The Name JEHOVAH
---
## 💪 With A Strong Hand Shall He Let Them Go

Pharaoh will not release Israel because he changes his mind.

A strong hand means force applied against someone who refuses.

This same idea repeats twice in one verse for emphasis.

God says Pharaoh will not just release Israel eventually.

He will actually drive them out of Egypt himself.

This warns Moses that force is coming, not talk.

💪 A strong hand means forced action
🔁 The verse repeats itself for emphasis
🚪 Pharaoh will drive them out himself
📖 Force is coming, not persuasion

## 🗣️ I Am The LORD

God opens His speech to Moses with His own name spoken first.

I am the LORD is not just a greeting.

It is a formal claim of authority before anything else is said.

This exact phrase returns three more times before the chapter ends.

Each repeat reminds Moses whose promise stands behind these words.

🗣️ I am the LORD opens the speech
👑 This claims authority before anything else
🔁 The phrase returns three more times
📖 Every promise here rests on this name

## 🏔️ By The Name Of God Almighty

God Almighty translates the Hebrew title El Shaddai.

Many scholars believe the name points to God as all powerful.

Abraham, Isaac, and Jacob knew God mostly under this title.

It described His power to provide for a small wandering family.

A new stage of the story now calls for a deeper name.

🏔️ God Almighty translates El Shaddai
💪 It points to God as all powerful
👪 The patriarchs mainly knew God by this name
➡️ A bigger name is coming next

## 📛 By My Name JEHOVAH Was I Not Known To Them

JEHOVAH represents God's personal covenant name, often written as YHWH.

This is the same name connected to I AM back in chapter three.

The patriarchs trusted God without experiencing this fuller side of Him.

Now, at the start of this new stage, that name becomes central to Israel's story.

A deeper relationship is opening up for a nation about to be born.

📛 JEHOVAH is God's personal covenant name
🔥 Chapter three already revealed I AM
👪 The patriarchs never knew this side fully
📖 This name now anchors Israel's whole story

## 🗺️ To Give Them The Land Of Canaan

God restates the ancient promise made first to Abraham.

Canaan was the specific land promised generations earlier in Genesis.

This same promise gets repeated to Isaac and then to Jacob.

Slavery in Egypt never canceled that original promise.

God still intends to keep every word of it.

🗺️ Canaan was promised generations earlier
📜 Abraham, Isaac, and Jacob all heard this
⛓️ Slavery never canceled the promise
📖 God still intends to keep His word

## 🏕️ The Land Of Their Pilgrimage, Wherein They Were Strangers

Pilgrimage here means a temporary stay in a land not yet owned.

Strangers means outsiders without full legal rights to the ground they walked on.

Abraham, Isaac, and Jacob all lived in Canaan without ever owning it.

They held only a promise, not a deed.

Their children would be the ones to actually receive it.

🏕️ Pilgrimage means a temporary stay
🚶 Strangers means outsiders with no legal claim
📜 The patriarchs held a promise, not a deed
➡️ Their children would receive what they did not

## 👂 I Have Also Heard The Groaning Of The Children Of Israel

Groaning describes the low, exhausted sound of people in real pain.

God says plainly that He has heard this sound Himself.

This is not distant or uninvolved watching from far away.

Their suffering under Egyptian slavery reached God directly.

He responds to Israel's own cries, not only to Moses.

👂 Groaning means a sound of real pain
👀 God hears this Himself directly
🚫 This is not distant, uninvolved watching
📖 Israel's own cries reach God

## 🤝 I Have Remembered My Covenant

Remembered does not mean God forgot and then recalled something.

In scripture it usually means God is about to act on a promise.

The covenant here goes back to Abraham, long before Egypt or Moses existed.

God ties Israel's present suffering directly to that ancient promise.

Present pain and old promises were never separate things to Him.

🤝 Remembered means God is about to act
📜 The covenant reaches back to Abraham
⛓️ Suffering and promise were never separate
📖 God acts because He keeps His word

# Exodus 6:6-8
# 🗣️ Seven I Will Promises
---
## 🔓 I Will Bring You Out From Under The Burdens Of The Egyptians

Burdens here means the forced labor Egypt piled onto Israel.

This is the first of several I will promises packed into these three verses.

Each promise builds on the last, moving from rescue toward a whole new future.

God is not just describing an escape, He is announcing a full plan.

🔓 Burdens means forced Egyptian labor
🔢 This starts a whole list of promises
🪜 Each promise builds on the one before
📖 God announces a full plan, not an escape

## 🕊️ I Will Rid You Out Of Their Bondage

Rid is an old way of saying completely free or fully remove.

Bondage means slavery, a state with no freedom or personal control.

This promise goes further than simply reducing Israel's workload.

It promises a full and total end to their slavery.

🕊️ Rid means completely free
⛓️ Bondage means slavery with no control
🚫 This is more than lighter work
📖 A total end is promised, not a break

## 🦾 I Will Redeem You With A Stretched Out Arm, And With Great Judgments

Redeem means to rescue someone by paying a price or using real power.

A stretched out arm is a picture of strength put to direct use.

Great judgments points forward to the plagues about to strike Egypt.

This promise is both personal rescue and public punishment at the same time.

🦾 Redeem means rescue through real power
💪 A stretched out arm pictures strength in action
🌪️ Great judgments points toward the coming plagues
📖 Rescue and judgment arrive together here

## 🤝 I Will Take You To Me For A People, And I Will Be To You A God

This is covenant language, the kind used to seal a lasting relationship.

God is not only rescuing Israel from Egypt.

He is forming Israel into His own people on purpose.

This same pattern of promise appears throughout the rest of the Old Testament.

🤝 This is formal covenant language
👪 Israel becomes God's own people
🎯 Rescue and relationship happen together
📖 This pattern repeats through the Old Testament

## 👁️ Ye Shall Know That I Am The LORD Your God

Knowing God here means more than knowing facts about Him.

It means experiencing His power and faithfulness firsthand.

Israel will not just hear about deliverance, they will live through it.

Watching these promises come true will teach them who God really is.

👁️ Knowing means real experience, not facts
🙌 Israel will live through this deliverance
📚 Watching it happen becomes their teacher
📖 Experience reveals who God really is

## 🏡 I Will Bring You In Unto The Land ... I Will Give It You For An Heritage

God now completes a whole sequence of promises.

First is rescue, then relationship, then inheritance.

Heritage means a lasting possession passed down through generations.

This is not a loan or a temporary gift.

The land was sworn to Abraham, Isaac, and Jacob long before this moment.

🏡 Heritage means a lasting possession
🪜 Rescue, relationship, and inheritance complete the set
📜 The land was already sworn to the patriarchs
📖 This gift was never temporary

# Exodus 6:9
# 😔 Israel Cannot Hear It
---
## 😔 They Hearkened Not Unto Moses For Anguish Of Spirit

Hearkened is an old word for listening closely enough to obey.

Israel did not reject Moses out of stubbornness or unbelief here.

Anguish of spirit describes a mind and heart worn down by suffering.

Even wonderful promises can fail to reach someone this exhausted.

😔 Hearkened means listening in order to obey
💔 Israel was not being stubborn here
😩 Anguish of spirit means deep inner exhaustion
📖 Suffering can block even good news

## ⛓️ For Cruel Bondage

Cruel here means harsh treatment carried out without mercy.

This phrase names the actual cause of Israel's exhaustion.

Slavery in Egypt was not simply hard work, it was brutal.

The text does not hide or soften how bad it really was.

⛓️ Cruel means harsh and without mercy
😣 This names the real cause of their pain
🚫 Egypt's slavery was brutal, not just hard
📖 Scripture does not soften how bad it was

# Exodus 6:10-13
# 🙋 Moses Doubts Himself Again
---
## 🗣️ Go In, Speak Unto Pharaoh King Of Egypt

God repeats almost the same command Moses already received before.

Israel's failure to listen does not change God's instructions to Moses.

Moses is sent back to Pharaoh with no new excuse offered.

God's plan moves forward even after a setback.

🗣️ God repeats His earlier command
🚫 Israel's response does not change the plan
🚶 Moses is sent back to Pharaoh again
📖 A setback does not stop God's plan

## 👥 The Children Of Israel Have Not Hearkened Unto Me

Moses points back to what just happened in the verse before.

His own suffering people would not listen to him.

He reasons that Pharaoh certainly will not listen either.

Moses argues from the evidence sitting right in front of him.

👥 Moses points back to verse nine
🚫 His own people would not listen
👑 He assumes Pharaoh will refuse too
📖 Moses argues from real evidence

## 👄 Who Am Of Uncircumcised Lips

Uncircumcised lips is an old idiom for someone who feels unfit to speak.

It does not describe an actual physical condition of Moses' mouth.

This echoes his same complaint about slow speech from chapter four.

Moses still doubts his own ability, even after everything God has already done.

👄 Uncircumcised lips means unfit to speak
🚫 This is not a real physical condition
🔁 Moses raised this same doubt before
📖 Old doubts can outlast new evidence

## 📜 The LORD ... Gave Them A Charge Unto The Children Of Israel, And Unto Pharaoh

Charge means a formal, official assignment handed down with authority.

God commissions Moses and Aaron together, not Moses alone.

Their assignment covers two very different audiences.

They must speak to their own suffering people and to a hostile king.

📜 Charge means a formal official assignment
🤝 Moses and Aaron are commissioned together
👥 Their mission covers two different audiences
📖 It reaches a people and a king

# Exodus 6:14-19
# 📜 The Family Line Of Reuben, Simeon, And Levi
---
## 📜 These Be The Heads Of Their Fathers' Houses

The story pauses here for a formal family record.

Ancient readers cared deeply about exact family lines like this.

This genealogy specifically narrows down toward one family, the tribe of Levi.

Levi's line matters because that is where Moses and Aaron come from.

📜 The story pauses for a genealogy
👪 Ancient readers valued exact family lines
🎯 This genealogy narrows down to Levi
📖 Levi's line leads straight to Moses

## 👑 The Sons Of Reuben The Firstborn Of Israel

Firstborn normally meant the first son inherited a double share and family leadership.

Reuben held that honored position by simple birth order.

Genesis already recorded that Reuben lost his father's blessing over a serious sin.

Naming him first here still honors his birth order, even after that failure.

👑 Firstborn meant a double inheritance
📉 Reuben lost his blessing in Genesis
📋 Birth order still gets him listed first
📖 A title can outlast the failure behind it

## 🌍 Shaul The Son Of A Canaanitish Woman

This short detail marks Shaul's mother as a Canaanite, not an Israelite.

Israel's family was not yet cut off from marrying outside the group at this point.

Laws limiting these marriages come only once Israel reaches Sinai.

The text records this plainly, without hiding or excusing it.

🌍 Shaul's mother was a Canaanite
📆 These marriage limits did not exist yet
⚖️ Later laws come only after Sinai
📖 Scripture records this detail plainly

## ⏳ The Years Of The Life Of Levi Were An Hundred Thirty And Seven Years

Genesis regularly tracked lifespans this way, and Exodus continues the same habit.

Levi's long life bridges the gap between Jacob's family and Moses' own generation.

This number helps a reader measure how much time has actually passed.

Slavery in Egypt did not happen overnight, it built up across generations.

⏳ Genesis style lifespans continue here
🌉 Levi's life bridges Jacob to Moses
📏 The number measures real passing time
📖 Slavery built up slowly across generations

## 🔢 The Years Of The Life Of Kohath Were An Hundred Thirty And Three Years

Kohath was Levi's son and one link further down this same family chain.

His recorded lifespan keeps the same generational count moving forward.

Kohath's own son Amram becomes the father of Moses and Aaron.

Each lifespan here is another rung on the ladder toward the exodus.

🔢 Kohath was Levi's own son
🪜 His life adds another generational rung
👶 Kohath's son Amram fathers Moses
📖 Every rung leads toward the exodus

## 👶 The Years Of The Life Of Amram Were An Hundred And Thirty And Seven Years

Amram is Moses and Aaron's own father, ending this short chain of lifespans.

Some readers notice that only four generations separate Jacob's family from Moses.

Scripture elsewhere describes four hundred years of slavery in Egypt.

Many scholars believe this genealogy names key generations, not a full count.

The point is a clear line back to Jacob, not a perfect head count.

👶 Amram is Moses and Aaron's father
🔢 Only four names span this whole time
📜 Many scholars see key names here
📖 The line back to Jacob stays clear

# Exodus 6:20-25
# 👨‍👩‍👦 Moses And Aaron's Immediate Family
---
## 👨‍👩‍👦 Amram Took Him Jochebed His Father's Sister To Wife

This verse finally names Moses' parents directly, Amram and Jochebed.

Chapter two described this same couple without ever naming them.

Jochebed was actually Amram's aunt, his father's sister, not simply a stranger he married.

Laws given later at Sinai specifically forbid this kind of marriage.

This detail shows the marriage happened before those laws ever existed.

👨‍👩‍👦 Amram and Jochebed are finally named
📖 Chapter two described them without naming them
⚖️ Sinai later forbids this exact marriage
➡️ It happened before that law existed

## 👶 She Bare Him Aaron And Moses

Aaron is named here before Moses, showing Aaron was the older brother.

Chapter seven later confirms Aaron's exact age difference from Moses.

Birth order in this culture usually carried real social weight.

Moses becomes the primary leader anyway, despite being the younger brother.

👶 Aaron is listed first as the older brother
📅 Chapter seven confirms their age gap
👑 Birth order usually carried real weight
📖 Moses leads anyway as the younger son

## ⚔️ Korah, And Nepheg, And Zichri

These are the sons of Izhar, a cousin to Moses and Aaron.

Korah's name here looks completely ordinary in this quiet list.

The book of Numbers later tells how Korah leads a serious rebellion against Moses.

A name that seems minor now becomes a major story later on.

⚔️ Korah is Moses and Aaron's cousin
📖 Numbers tells of Korah's later rebellion
😐 This list gives no hint of that yet
➡️ Small names can carry a big future

## 👰 Aaron Took Him Elisheba ... To Wife

Elisheba's family connects Aaron's household to the tribe of Judah.

Her brother Naashon becomes an important leader within that same tribe.

This marriage links the priestly line to Judah's royal future line.

Two major roles in Israel's story, priest and king, meet briefly here.

👰 Elisheba links Aaron to Judah's tribe
👑 Her brother Naashon leads within Judah
🤝 Priestly and royal lines briefly connect
📖 Two futures meet in one marriage

## 🙏 She Bare Him Nadab, And Abihu, Eleazar, And Ithamar

These four sons establish the priestly family line for the rest of the Old Testament.

Nadab and Abihu are named first, as the two oldest sons.

Leviticus later records how Nadab and Abihu die for a serious act of disobedience.

Eleazar and Ithamar are the two sons whose lines actually continue the priesthood.

🙏 These sons begin the priestly line
⚠️ Nadab and Abihu die later in Leviticus
🔥 Their death came from real disobedience
📖 Eleazar and Ithamar carry the line forward

## 👤 She Bare Him Phinehas

Phinehas is Eleazar's son, one more generation past Aaron.

The book of Numbers later shows Phinehas acting with fierce zeal for God's holiness.

This short mention here plants a name that matters much more later.

Genealogies often work exactly this way, quiet seeds for bigger stories.

👤 Phinehas is Eleazar's son
🔥 Numbers shows his fierce zeal for God
🌱 A quiet name planted here early
📖 Genealogies often seed bigger stories later

# Exodus 6:26-27
# ✅ Confirming Moses And Aaron's Identity
---
## ✅ These Are That Aaron And Moses

The text now steps back out of the genealogy entirely.

This sentence confirms that this Aaron and Moses are the same men from before.

The whole family record existed to establish exactly who these two leaders are.

Nothing about the pause was a random detour from the main story.

✅ The genealogy pause now ends
🎯 This confirms Aaron and Moses' identity
📜 The record proves exactly who they are
📖 Nothing here was a random detour

## 🔁 These Are That Moses And Aaron

This verse repeats the same idea, but flips the brothers' order.

Verse twenty six named Aaron first, this verse names Moses first.

Ancient writers often used this kind of repeated, reversed structure on purpose.

It works like a bracket, closing out the genealogy section cleanly.

🔁 The same idea repeats in reverse order
📖 Verse twenty six named Aaron first
✍️ Ancient writers used this pattern on purpose
➡️ It closes the genealogy like a bracket

# Exodus 6:28-30
# 🔁 The Objection Repeats
---
## 📆 On The Day When The LORD Spake Unto Moses

This sentence signals the story returning to where it paused.

Ancient writers often repeated a line like this after a long break.

It marks a return to the main story after the genealogy.

The confrontation with Pharaoh is about to continue from where it stopped.

📆 This marks a return to the story
✍️ Ancient writers used repeated lines this way
📜 It signals the end of the genealogy break
➡️ The Pharaoh confrontation picks back up now

## 🗣️ I Am The LORD: Speak Thou Unto Pharaoh King Of Egypt All That I Say Unto Thee

God repeats His command once more, word for word similar to before.

The instruction has not changed at all since chapter six began.

Moses is told to speak everything God says, nothing more and nothing less.

God's patience here matches His clear determination to see this through.

🗣️ God repeats the same command again
🔁 The instruction has not changed at all
📢 Moses must speak exactly what God says
📖 Patience and determination move together here

## 👄 I Am Of Uncircumcised Lips, And How Shall Pharaoh Hearken Unto Me

Moses repeats his own doubt from earlier in this same chapter almost word for word.

He still believes his speaking ability disqualifies him from this mission.

This sets up God's patient response and a plan to use Aaron's voice instead.

Old doubts can resurface even after God has already answered them once.

👄 Moses repeats his own earlier doubt
🚫 He still doubts his speaking ability
🗣️ This sets up God's plan through Aaron
➡️ Old doubts can return even after answers`.trim();

export const EXODUS_SIX_PERSONAL_SECTIONS = parseExodusSixRawNotes(EXODUS_SIX_RAW_NOTES);
