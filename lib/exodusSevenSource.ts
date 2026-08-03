export type ExodusSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusSevenRawNotes(rawText: string): ExodusSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 7:${startVerse}` : `Exodus 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Exodus 7 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_SEVEN_RAW_NOTES = `# Exodus 7:1-5
# 👑 God Explains The Whole Plan
---
## 👑 I Have Made Thee A God To Pharaoh

This does not mean Moses becomes divine.

It means Moses will carry God's authority when he stands before Pharaoh.

Pharaoh is used to hearing from gods through priests and omens.

Now he will hear directly from a man carrying God's own authority.

👑 Moses carries God's authority, not divinity

🎭 Pharaoh expected messages through priests and omens

🗣️ Moses now speaks with real authority behind him

📖 Authority does not require becoming divine

## 🗣️ Aaron Thy Brother Shall Be Thy Prophet

A "prophet" is someone who speaks on behalf of another.

Aaron will take Moses' words and speak them out loud to Pharaoh.

This mirrors how a true prophet relays God's own words to people.

Moses stands in God's role here, and Aaron stands in the prophet's role.

The roles were assigned back in chapter four, when Moses said he was slow of speech.

🗣️ Prophet means one who speaks for another

🔁 Aaron relays Moses' words to Pharaoh

🪞 Moses stands in God's role in this pairing

📖 Chapter four already set up this arrangement

## 🔗 Thou Shalt Speak All That I Command Thee

God is laying out a clear chain of communication for this whole mission.

God speaks to Moses.

Moses speaks to Aaron.

Aaron speaks to Pharaoh.

Nothing gets added or changed along the way.

Every plague and every warning that follows travels through this same chain.

🔗 A clear chain carries God's words

🗣️ God speaks first, to Moses

👂 Aaron hears it next, from Moses

📖 Every plague travels through this chain

## 🪨 I Will Harden Pharaoh's Heart

To "harden" someone's heart means to make them stubborn and unwilling to listen.

God states this outcome before the confrontation even begins.

Pharaoh's resistance is not a surprise that catches God off guard.

It is treated here as an expected part of how this conflict will unfold.

🪨 Hardened means stubborn and unwilling

📜 God names this outcome in advance

😤 Pharaoh's resistance is expected, not shocking

📖 God works even through resistance

## ✨ Multiply My Signs And My Wonders

"Signs and wonders" are miracles meant to prove something, not just impress a crowd.

A sign points to a truth.

A wonder makes people stop and pay attention.

God promises there will be many of them, not just one dramatic moment.

The plagues that follow are these signs and wonders playing out one after another.

✨ Signs point toward a truth

😮 Wonders make people stop and notice

🔢 Many signs are promised, not one

📖 The plagues fulfill this promise

## ⚔️ Bring Forth Mine Armies

This does not describe soldiers marching out to war.

God is calling the enslaved people of Israel His own armies.

It is a striking title for a group of exhausted slaves with no weapons.

God is claiming them as His organized people, not a scattered crowd of victims.

⚔️ Armies here does not mean soldiers

👥 Israel is the group being named

💪 God claims them as organized, not scattered

📖 God dignifies His people before freedom

## ⚖️ By Great Judgments

A "judgment" in this context is a legal punishment carried out by a ruling authority.

The plagues that follow are not random disasters or bad luck.

They are framed here as God acting as judge over Egypt.

Egypt held Israel in slavery, and these judgments answer that wrong directly.

⚖️ Judgment means a legal punishment

🎲 The plagues are not random disasters

👨‍⚖️ God acts as judge over Egypt

📖 The punishment answers real wrongdoing

## 🌍 The Egyptians Shall Know That I Am The LORD

The goal of this whole confrontation reaches beyond freeing Israel alone.

Egypt worshiped many different gods and did not know the LORD at all.

God intends for Egypt itself to recognize His identity through these events.

Freedom for Israel and revelation for Egypt happen through the very same plagues.

🌍 Egypt worshiped many different gods

🎯 Knowing the LORD is a stated goal

🔓 Israel's freedom and Egypt's knowledge come together

📖 One set of plagues accomplishes both

# Exodus 7:6-7
# ⏳ Two Old Men Face Pharaoh
---
## ✅ Moses And Aaron Did As The LORD Commanded

This line covers both men obeying immediately, with no recorded objection or delay.

Moses had argued with God back in chapters three and four about taking on this task.

Here, none of that earlier hesitation shows up anymore.

Obedience has replaced the resistance Moses once carried.

✅ Both men obey without delay

🗣️ Moses once argued with God about this

🚫 No hesitation appears here now

📖 Obedience has replaced earlier resistance

## 🔢 Moses Was Fourscore Years Old

"Fourscore" is an old way of saying eighty.

Moses is eighty years old when this confrontation with Pharaoh truly begins.

That is well past the age most cultures expect someone to start a demanding new mission.

🔢 Fourscore means eighty

👴 Moses starts this mission at eighty

⏳ Most people expect new work much younger

📖 God calls people at any age

## 👴 Aaron Fourscore And Three Years Old

Aaron is three years older than Moses, making him eighty three here.

Both brothers are elderly by the time this mission actually begins.

Neither one is a young, brash leader trying to prove himself.

Their age adds real weight to the steady, patient obedience that follows.

👴 Aaron is eighty three years old

🤝 Both brothers are elderly leaders

🚫 Neither is young or brash

📖 Their age adds weight to their patience

# Exodus 7:8-13
# 🐍 The Rod Becomes A Serpent
---
## 🎭 Shew A Miracle For You

Pharaoh is expected to ask for proof before taking Moses and Aaron seriously.

A "miracle" here means a visible sign that confirms someone truly speaks for God.

This exact request was already anticipated by God back in verse three.

The whole scene is not a surprise test.

It is the moment God already said would come.

🎭 Pharaoh will demand visible proof

✨ Miracle means a confirming sign

📜 God already predicted this request

📖 Nothing here catches God by surprise

## 🐍 It Shall Become A Serpent

This is the same sign God first gave Moses back in chapter four.

There, it was private, meant to convince Moses himself that God was really speaking to him.

Here, the very same sign is performed publicly, in front of Pharaoh and his whole court.

A private proof for Moses becomes a public proof for Egypt's king.

🔥 The sign began privately in chapter four

👑 Now it happens before Pharaoh himself

🔁 A private proof becomes a public one

📖 The same sign now confronts a king

## 🙌 Aaron Cast Down His Rod Before Pharaoh

Aaron performs the miracle, not Moses, matching the roles God assigned back in verse one.

Pharaoh's servants are also named as witnesses in this same verse.

Egypt's royal officials and advisors watch the sign directly, alongside Pharaoh.

No one in the room can later claim they did not see it happen.

🙌 Aaron performs the sign, as assigned

👑 Pharaoh watches directly

👥 His servants witness it too

📖 No one present can deny seeing it

## 📚 The Wise Men And The Sorcerers

"Wise men" were trained scholars and advisors attached to Pharaoh's royal court.

"Sorcerers" practiced magic rituals believed to control spiritual or unseen forces.

Egypt's court kept both types on hand for exactly this kind of moment.

Pharaoh does not simply dismiss Moses and Aaron.

He calls in his own experts to answer them instead.

📚 Wise men were trained royal advisors

🔮 Sorcerers practiced ritual magic

🏛️ Egypt's court kept both on staff

📖 Pharaoh answers with his own experts

## 🔮 In Like Manner With Their Enchantments

"Enchantments" were trained magical or ritual practices, not simple stage tricks.

Egypt's magicians manage to copy the sign, turning their own rods into serpents too.

This means Pharaoh has real access to some kind of counterfeit power.

The contest between God and Egypt does not look one sided yet.

🔮 Enchantments means trained ritual practices

🐍 The magicians copy the sign

⚖️ Pharaoh has real counterfeit power

📖 The contest looks even, for now

## 🏆 Aaron's Rod Swallowed Up Their Rods

Despite the magicians' apparent success, Aaron's serpent consumes all of theirs completely.

This single detail settles the contest that looked even just moments earlier.

Egypt can copy the surface of a miracle but cannot match its true power.

The swallowing becomes a visible picture of who actually holds authority here.

🐍 Aaron's serpent swallows all the others

🏆 The contest is settled immediately

🎭 Egypt copies the surface, not the power

📖 One image settles who holds authority

## 👂 He Hardened Pharaoh's Heart

"Hearkened" is an old word for listened and obeyed.

Even after watching this clear sign, Pharaoh still refuses to listen.

This happens exactly as God predicted back in verse three, before the sign was even shown.

The pattern of resistance despite clear evidence starts here.

It will repeat through every plague still ahead.

👂 Hearkened means listened and obeyed

🚫 Pharaoh refuses despite clear proof

📜 This matches God's prediction exactly

📖 This pattern repeats through every plague

# Exodus 7:14-18
# 🩸 The First Plague Is Announced
---
## 📖 He Refuseth To Let The People Go

"Refuseth" is an old form of refuses.

God states Pharaoh's condition plainly before sending Moses back to him again.

This is not a new development.

It confirms what already happened back in verse thirteen.

God moves forward with the plan anyway, even knowing exactly how Pharaoh will respond.

📖 Refuseth is an old form of refuses

🪨 This confirms Pharaoh's condition from before

🔁 Moses is sent back anyway

➡️ God proceeds despite the expected response

## 🌅 He Goeth Out Unto The Water

Pharaoh apparently kept a regular morning routine that involved going to the Nile.

Many scholars believe this was tied to worship, since Egyptians honored the Nile as the god Hapi.

God tells Moses exactly where and when to find him, down to this daily habit.

Nothing about this confrontation happens by accident or guesswork.

🌅 Pharaoh had a regular morning routine

🌊 Egyptians likely worshiped the Nile as Hapi

📍 God names the exact time and place

📖 Nothing here happens by accident

## 🌊 Stand By The River's Brink

"Brink" means the edge, in this case the edge of the riverbank.

"Against" here is an old way of saying just before, or in preparation for.

Moses is told to be waiting at the water's edge before Pharaoh even arrives.

The confrontation is planned down to the smallest detail.

🌊 Brink means the edge of the river

⏳ Against means just before he arrives

📍 Moses waits there ahead of time

📖 Every detail of this meeting is planned

## 🏷️ The LORD God Of The Hebrews

"Hebrews" was the name Egyptians commonly used for Israel's people, going back to Genesis.

Moses does not soften this claim or hide where his authority comes from.

He states plainly that Israel's God, not Pharaoh or Egypt's gods, sent him.

Every word Pharaoh hears from this point forward carries that same claim behind it.

🏷️ Hebrews was Egypt's name for Israel

🗣️ Moses names his source directly

👑 Israel's God sent him, not Egypt's

📖 This claim stands behind every word ahead

## 🙏 That They May Serve Me In The Wilderness

This request is not only about escaping slavery to live somewhere else freely.

The stated purpose is worship, serving God in the wilderness, not just relocation.

Pharaoh is being asked to release Israel for a specific reason.

The exodus was always about who Israel would serve next, not simply who they would leave.

🚫 This is not just about relocation

🙏 Serve means worship, the real purpose

🏜️ The wilderness is the stated destination

📖 The exodus is about who Israel serves

## 🩸 They Shall Be Turned To Blood

The very first plague targets the Nile River directly.

Egypt worshiped this river as sacred and depended on it completely for water, food, and travel.

One plague strikes Egypt's religion and its everyday survival at the exact same time.

Nothing about this first sign is a random or minor choice.

🩸 The Nile itself becomes the target

🌊 Egypt worshiped and depended on it

⚔️ Religion and survival are struck together

📖 This first plague is carefully chosen

## 🐟 The River Shall Stink

The consequences of this plague are described in real, physical detail.

Dead fish, a rotting smell, and undrinkable water follow immediately.

This is not a symbolic gesture or a distant warning.

It is an immediate crisis touching food, water, and daily life across the whole nation.

🐟 Dead fish appear immediately

👃 The river gives off a rotting smell

🚱 The water becomes undrinkable

📖 This is a real crisis, not a symbol

## 🤢 The Egyptians Shall Lothe To Drink

"Lothe" is an old spelling of loathe, meaning to feel disgust toward something.

Egyptians relied on the Nile for their everyday drinking water more than any other source.

Now that same water becomes something their own bodies recoil from.

The plague turns Egypt's most trusted resource into something repulsive overnight.

🤢 Lothe means to feel disgust

🚰 The Nile was Egypt's main water source

🔄 Trust turns into disgust overnight

📖 Egypt's most reliable resource becomes repulsive

# Exodus 7:19-21
# 💧 Every Water Source Turns To Blood
---
## 💧 Upon All Their Pools Of Water

This plague does not stop at the Nile River alone.

It spreads to every stream, every smaller river, every pond, and every pool across Egypt.

Nothing counts as a safe backup water source once this list is covered.

The plague reaches into every corner of daily Egyptian life at once.

🌊 The plague spreads beyond the Nile

💧 Streams, ponds, and pools are all included

🚫 No backup water source remains safe

📖 Every corner of daily life is reached

## 🏺 In Vessels Of Wood And In Vessels Of Stone

Even water already collected and stored inside jars and containers turns to blood.

This detail matters because stored water is normally a family's safety net during a crisis.

Wood and stone containers were the common household storage of the time.

The plague removes that safety net completely, reaching water that was never even in a river.

🏺 Stored water turns to blood too

🛡️ Stored water was normally a safety net

🪵 Wood and stone were common containers

📖 The plague removes every safety net

## 👁️ In The Sight Of Pharaoh And His Servants

This miracle happens in the open, directly in front of Pharaoh and his officials.

Nobody in the royal court can later dismiss this as a rumor or exaggeration.

Everyone present with real authority in Egypt witnesses it firsthand, at the same moment.

The public setting removes any excuse for doubt among the people who matter most politically.

👁️ Pharaoh witnesses this directly

👥 His officials see it too

🚫 No one can call it a rumor

📖 Public proof removes political excuses

## 🗺️ Blood Throughout All The Land Of Egypt

This line summarizes the plague's full reach in one short sentence.

Every stream, pond, pool, and stored container mentioned earlier is now included in this total.

Egypt has no region and no household left untouched by this disaster.

The scale of the plague matches the scale of the message God is sending Pharaoh.

🩸 This line summarizes the whole plague

🗺️ Every region of Egypt is affected

🏠 No household is left untouched

📖 The scale matches the size of the message

# Exodus 7:22-25
# 🚪 Pharaoh Walks Away Unmoved
---
## 🔮 The Magicians Of Egypt Did So With Their Enchantments

This does not mean the magicians turned normal water back into blood a second time.

The text does not explain exactly how they managed to imitate the plague here.

Nearly all the water in Egypt was already blood at this point.

Many scholars believe this was a smaller scale copy.

That would have been enough to give Pharaoh an excuse to dismiss it.

🔮 The text does not explain their method

🩸 Nearly all the water was already blood

🎭 A small copy may have been enough

📖 Pharaoh uses it to dismiss the whole sign

## 🔁 Neither Did He Hearken Unto Them

This is the second time in this same chapter that Pharaoh's hardened heart is mentioned.

The pattern from verse thirteen repeats here without any real change in Pharaoh's response.

One dramatic plague was not enough to move him toward listening.

This repetition previews exactly how the rest of the plagues will unfold.

🔁 This is the second hardening in one chapter

🪨 The pattern repeats without real change

🚫 One plague was not enough

📖 This previews the plagues still ahead

## ❤️ He Set His Heart To This Also

To "set his heart" to something means to take it seriously and let it matter.

Pharaoh simply turns around and walks back into his house instead.

He witnessed the Nile turn to blood and still refuses to genuinely engage with it.

Walking away becomes Pharaoh's actual response to overwhelming evidence.

❤️ Set his heart means to take seriously

🚪 Pharaoh simply walks away instead

👀 He witnessed the sign firsthand

📖 Walking away is his real response

## ⛏️ Digged Round About The River For Water

While Pharaoh dismisses the crisis, his own people face its real, physical consequences.

Ordinary Egyptians dig into the ground near the river, searching for any drinkable water.

Pharaoh's denial does not shield his people from the suffering this plague actually causes.

The gap between the ruler's response and the people's suffering only grows wider from here.

⛏️ Ordinary Egyptians dig for drinkable water

🚫 Pharaoh's denial does not protect them

😔 The people suffer while Pharaoh dismisses it

📖 This gap grows wider with each plague

## 💥 The LORD Had Smitten The River

"Smitten" is an old word meaning struck.

Seven full days pass with the Nile left in this ruined, bloody state.

Seven often marks a complete or full period of time throughout scripture.

This first plague is not a quick, passing moment.

It lasts a full and complete stretch of days.

💥 Smitten means struck

📅 Seven full days pass like this

🔢 Seven often signals completeness in scripture

📖 This plague lasts a full stretch of time`.trim();

export const EXODUS_SEVEN_PERSONAL_SECTIONS = parseExodusSevenRawNotes(EXODUS_SEVEN_RAW_NOTES);
