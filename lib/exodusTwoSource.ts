export type ExodusTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwoRawNotes(rawText: string): ExodusTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 2:${startVerse}` : `Exodus 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Exodus 2 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWO_RAW_NOTES = `# Exodus 2:1-4
# 🧺 Moses Is Hidden And Set Adrift
---
## 👨‍👩‍👦 Took To Wife A Daughter Of Levi

The man and his wife are not named here.

Exodus chapter six later reveals them as Amram and Jochebed.

Both come from the tribe of Levi, one of Jacob's twelve sons.

That same tribe becomes Israel's priesthood generations later.

👨‍👩‍👦 Named later as Amram and Jochebed

📜 Revealed in Exodus chapter six

✡️ Levi is one of Jacob's sons

📖 Levi's line becomes Israel's priests

## 👶 A Goodly Child

Goodly means healthy and pleasing to look at.

Moses' mother notices this the moment he is born.

Pharaoh had already ordered every Hebrew baby boy drowned in the river.

Hiding Moses was not simple caution.

It was open defiance of that order.

👶 Goodly means healthy and attractive

🚫 Pharaoh ordered Hebrew sons drowned

🛡️ Hiding Moses defied that order

📖 One mother's courage begins Exodus

## 🕒 She Hid Him Three Months

Three months was about as long as a newborn could stay hidden.

After that a baby grows too loud and too visible to hide safely.

Jochebed had reached the edge of what hiding alone could do.

The next step could not simply be more delay.

It had to be real action.

🕒 Three months was the hiding limit

🔊 Babies grow loud and visible

⏳ Jochebed reached hiding's limit

➡️ Delay gives way to action

## 🧺 An Ark Of Bulrushes

Bulrushes are tall reed plants that grow along riverbanks.

Jochebed weaves them into a small floating basket.

The word used for this basket is the same Hebrew word used for Noah's ark.

Both are vessels that carry someone through danger toward safety.

🧺 Bulrushes are tall river reeds

🌊 Jochebed weaves a floating basket

📚 Same Hebrew word as Noah's ark

📖 Both vessels carry someone to safety

## 🛠️ Daubed It With Slime And With Pitch

Daubed means coated or sealed over completely.

Slime here means a tar like substance.

Pitch is a thick waterproofing resin.

Together they seal the basket so no water gets in.

This makes it safe enough to float on the river's current.

🛠️ Daubed means coated and sealed

🪨 Slime means a tar like substance

🌊 Pitch waterproofs against the river

📖 The basket becomes truly watertight

## 🌾 Laid It In The Flags By The River's Brink

Flags here does not mean cloth banners.

It means tall reeds growing right at the water's edge.

The basket rests in the shallow reeds, not open water.

This keeps Moses close to shore and easier to watch over.

🌾 Flags means reeds, not banners

🏞️ Reeds grow at the water's edge

🧺 The basket stays near the shore

📖 Close water keeps Moses watched over

## 👧 To Wit What Would Be Done To Him

To wit is an old way of saying to find out.

Moses' sister is not named yet here.

Exodus chapter fifteen later identifies her as Miriam.

She watches from a distance, ready to act if a chance appears.

The family had a careful plan, not just a desperate gamble.

👧 To wit means to find out

📛 The sister is later named Miriam

👀 She watches, ready to act

📖 This was a careful family plan

# Exodus 2:5-10
# 👑 Pharaoh's Daughter Finds And Names Moses
---
## 🚿 Came Down To Wash Herself At The River

This is the very river Pharaoh commanded be used to drown Hebrew sons.

Now his own daughter comes to that same river.

She is about to become the reason one of those sons survives.

The place built for death becomes the place of rescue instead.

🚿 Same river from Pharaoh's death order

🔄 His daughter now stands there instead

👶 She becomes the reason Moses lives

📖 Death's river becomes rescue's river

## 😢 Behold, The Babe Wept

Pharaoh's daughter opens the basket expecting almost anything.

What she finds is a crying baby.

That sound is what turns her attention into compassion.

A simple human reaction changes the course of Israel's entire future.

😢 A crying baby greets her

👂 The sound stirs her compassion

🍼 A small moment, a huge outcome

📖 One cry shapes Israel's whole future

## 💛 She Had Compassion On Him

Pharaoh's daughter is not required to feel anything for this child.

She could hand him over or simply walk away.

Instead she chooses compassion toward a baby who is not her own people.

That choice alone is what saves Moses' life.

💛 She was not required to care

🚶 Walking away was fully possible

🤝 She chooses mercy instead

📖 Her compassion alone saves Moses

## 🕵️ This Is One Of The Hebrews' Children

Pharaoh's daughter recognizes the baby as Hebrew immediately.

Something about his appearance or the basket itself gives it away.

Her own father had ordered every Hebrew son thrown into this river.

She sees the truth and protects him anyway.

🕵️ She recognizes the baby as Hebrew

👁️ Something marks him as Hebrew

👑 Her father gave the death order

➡️ She protects him despite that order

## 👧 Shall I Go And Call To Thee A Nurse Of The Hebrew Women

Moses' sister has been watching this whole scene from a distance.

She steps forward with a bold and clever offer.

She proposes finding a Hebrew nurse for the baby.

This sets up a way to reunite Moses with his own mother.

👧 The sister has watched quietly

💡 She offers a clever plan

🤱 She proposes a Hebrew nurse

➡️ This plan reunites Moses with his mother

## 💰 I Will Give Thee Thy Wages

Pharaoh's daughter agrees to pay for a nurse without knowing the truth.

The nurse she hires turns out to be Moses' own mother.

Jochebed is paid by Egypt's royal household to raise her own son.

She gets years with her child that the drowning order was meant to prevent.

💰 Egypt pays for the nurse

👩 The nurse is Moses' mother

👶 Jochebed raises her own son

📖 Years restored that the order tried to steal

## 🏷️ She Called His Name Moses

The name Moses sounds like the Hebrew word for drawing out.

Pharaoh's daughter names him for the act of pulling him from the river.

She has no idea how fitting that name will become.

One day Moses will draw his whole people out of Egypt.

🏷️ Moses means drawn out

🌊 Named for being pulled from the river

🔮 She could not know how fitting

📖 Moses later draws out his people

# Exodus 2:11-15
# ⚔️ Moses Kills An Egyptian And Flees
---
## ⏳ When Moses Was Grown

Years pass in silence between verse ten and verse eleven.

Moses has grown up entirely inside Pharaoh's palace.

Stephen's speech in Acts chapter seven says Moses was about forty years old by now.

That is decades of Egyptian privilege about to be set aside.

⏳ Years pass silently in the text

🏛️ Moses grew up in the palace

🔢 About forty years old by now

➡️ Decades of privilege about to change

## 👀 He Went Out Unto His Brethren, And Looked On Their Burdens

Moses could have stayed comfortable inside the palace his whole life.

Instead he goes out to see his own people's suffering firsthand.

He calls them his brethren, not the Egyptians who raised him.

That single word shows exactly where his loyalty actually lies.

👀 Moses seeks out Hebrew suffering

🏛️ He leaves palace comfort behind

👨‍👩‍👦 He calls them his brethren

📖 His loyalty lies with his people

## ⚔️ He Slew The Egyptian, And Hid Him In The Sand

Moses reacts to an Egyptian beating a Hebrew slave with sudden violence.

He kills the man and then hides the body in the sand.

This is not a planned rescue.

It is an impulsive act of violence.

Hiding the body shows Moses already knows this was wrong.

⚔️ Moses reacts with sudden violence

🏖️ He hides the body in sand

🎯 This was impulsive, not planned

➡️ Hiding it shows he knew it was wrong

## ❓ Who Made Thee A Prince And A Judge Over Us?

The next day Moses tries to stop a fight between two Hebrews.

Instead of thanks he gets rejected by his own people.

This painful rejection is not the last time it happens.

Israel will doubt and challenge Moses again and again in the wilderness.

❓ Moses tries to help his people

🙅 He is rejected, not thanked

🔮 This rejection repeats later

📖 Israel keeps doubting Moses ahead

## 😨 Surely This Thing Is Known

Moses realizes his secret killing has already become common knowledge.

That means word will eventually reach Pharaoh himself.

His fear here comes from acting on his own timing.

He is not yet someone secure in God's calling.

😨 The secret is already out

👑 Pharaoh will eventually hear

⏰ Moses acted on his own timing

➡️ He is not yet secure in God's calling

## 🏜️ Fled From The Face Of Pharaoh, And Dwelt In The Land Of Midian

Pharaoh wants Moses dead once he hears about the killing.

Moses runs, leaving Egypt completely behind.

Midian was likely a region in northwest Arabia or the Sinai area.

Its people descended from Abraham through his later wife Keturah.

🏃 Pharaoh now wants Moses dead

🚪 Moses leaves Egypt completely

🗺️ Midian sits near Sinai or Arabia

📖 Midianites descend from Abraham through Keturah

## 💧 He Sat Down By A Well

Wells carry real weight throughout the book of Genesis.

Isaac's servant met Rebekah at a well.

Jacob met Rachel at a well too.

Moses is about to meet his future wife at a well too.

💧 Wells matter throughout Genesis

🤝 Rebekah was met at a well

💍 Rachel was met at a well

➡️ Moses meets his wife the same way

# Exodus 2:16-22
# 💍 Moses Finds A Family In Midian
---
## 👧 The Priest Of Midian Had Seven Daughters

This priest serves a people descended from Abraham, not the Egyptians.

He has seven daughters who do hard physical labor themselves.

They draw water and water their father's flock with their own hands.

This is a working family, not simply wealthy nobility.

👧 Seven daughters work the flock

💧 They draw their own water

👨‍🌾 A working family, not nobility

📖 Hard labor was normal for daughters

## 🛡️ The Shepherds Came And Drove Them Away

Other shepherds push the young women away from the watering troughs.

This kind of bullying was apparently common enough to expect.

Moses steps in without being asked.

The same instinct that got him in trouble in Egypt shows up again.

🛡️ Other shepherds bully the daughters

😤 This bullying was common

🦸 Moses steps in unasked

➡️ The same defender instinct returns

## ✅ Moses Stood Up And Helped Them

Moses defended a Hebrew slave in Egypt and it ended in a killing.

Here he defends strangers in Midian and it ends peacefully.

Same instinct, completely different outcome.

Sometimes the same courage lands very differently depending on the moment.

✅ This time it ends peacefully

⚖️ Same instinct as the Egypt scene

🔄 A very different outcome

📖 Courage can land differently each time

## 👴 Reuel Their Father

The priest of Midian is named Reuel here.

Later chapters of Exodus call this same man Jethro.

Many scholars believe Jethro may have been his title as priest.

Reuel likely served as his personal name.

👴 Reuel is the priest's name

📛 Later called Jethro instead

🏛️ Jethro may be a priestly title

📖 Two names, one same man

## 🇪🇬 An Egyptian Delivered Us

The daughters describe their rescuer as an Egyptian.

Moses' clothing, accent, or manner all came from Pharaoh's palace.

His true identity as a Hebrew is still invisible to outsiders.

Nobody meeting him yet can see who he really is inside.

🇪🇬 They assume he is Egyptian

👗 His appearance says Egyptian upbringing

🎭 His true identity stays hidden

➡️ Nobody yet sees who he really is

## 🍞 Call Him, That He May Eat Bread

Sharing a meal was a serious act of honor in this culture.

Reuel is not just being polite by inviting Moses to eat.

He is formally welcoming a stranger into his household.

This meal is the doorway into everything that follows.

🍞 Sharing food was a real honor

🏠 It welcomed Moses into the family

🚪 A meal opened the door

➡️ Everything else follows this invitation

## 💍 He Gave Moses Zipporah His Daughter

Moses has now lived through three completely different lives.

He was raised a prince in Pharaoh's palace.

He became a fugitive fleeing for his life.

Now he becomes a shepherd with a family of his own in Midian.

💍 Moses marries Zipporah here

🏛️ Once a prince in Egypt

🏃 Then a fugitive on the run

📖 Now a shepherd with a family

## 🌍 I Have Been A Stranger In A Strange Land

Gershom sounds like the Hebrew phrase for a stranger there.

Moses names his son to mark his own sense of displacement.

He belongs fully to neither Egypt nor Midian.

This name captures exactly where Moses stands at this point in his life.

🌍 Gershom means a stranger there

🏛️ He does not fully belong in Egypt

🏕️ He does not fully belong in Midian

📖 The name captures his identity crisis

# Exodus 2:23-25
# 🙏 God Hears Israel's Cry
---
## 👑 The King Of Egypt Died

Time passes and Egypt gets an entirely new ruler.

A change at the very top usually changes something for the people below.

Here it changes nothing at all for Israel.

Their slavery and suffering continue completely unchanged.

👑 Egypt gets a new king

🔄 New leadership usually changes something

🚫 Nothing changes for Israel here

📖 Their bondage continues unchanged

## 🙏 Their Cry Came Up Unto God

Generations of Hebrew suffering have gone unmentioned in the text until now.

This verse marks the moment their pain is described as reaching God directly.

Nothing before this point in Exodus has said that plainly.

Everything that happens for the rest of the book grows from this moment.

🙏 Their cry reaches God directly

📖 The first time this is stated

⏳ Generations of silent suffering before this

➡️ The rest of Exodus grows from here

## ❤️ God Heard Their Groaning, And God Remembered His Covenant

God's response unfolds here in clear, deliberate stages.

First He hears their pain.

Then He remembers the covenant promise made generations earlier.

This is not God forgetting and suddenly recalling.

It is the appointed moment for that old promise to move forward.

❤️ God hears their pain first

📜 Then He remembers His covenant

👴 Made generations earlier to the patriarchs

📖 This is the promise moving forward

## 👀 God Looked Upon The Children Of Israel, And God Had Respect Unto Them

Had respect unto them means God took real personal notice of their pain.

Four distinct actions appear for God in just these two verses.

Hearing, remembering, looking, and respecting are named one by one.

That stacking of verbs stresses just how fully God is now engaged.

👀 Had respect means real personal notice

🔢 Four distinct actions in two verses

📋 Hearing, remembering, looking, and respecting

➡️ This sets up God's call to Moses next`.trim();

export const EXODUS_TWO_PERSONAL_SECTIONS = parseExodusTwoRawNotes(EXODUS_TWO_RAW_NOTES);
