export type GenesisFiftyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFiftyRawNotes(rawText: string): GenesisFiftyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFiftyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+50:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 50 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+50:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+50:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 50 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 50,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 50:${startVerse}` : `Genesis 50:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Genesis 50 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FIFTY_RAW_NOTES = `# Genesis 50:1-3
# 😭 Joseph Mourns His Father
---
## 😭 Joseph Fell Upon His Father's Face, And Wept Upon Him, And Kissed Him

Joseph is the second most powerful man in all of Egypt right now.

He falls on his father's body anyway, in front of everyone watching.

Weeping and kissing a body were normal ways to say a final goodbye.

Power never makes real love optional.

😭 Joseph weeps openly despite his high rank

👑 Egypt's second most powerful man kneels here

💋 Kissing was a normal way to say goodbye

📖 Power never cancels real grief

## 💉 Commanded His Servants The Physicians To Embalm His Father

To embalm means to treat a body so it will not decay.

Egyptian embalming took real skill and specialized training.

It was normally reserved for Egyptian royalty and top officials.

Joseph orders it for Jacob, a foreign shepherd, not an Egyptian noble.

Joseph spends his own high rank honoring his father.

💉 Embalm means to preserve a body

👑 This honor was normally reserved for royalty

🐑 Jacob was a shepherd, not Egyptian nobility

📖 Joseph spends his rank honoring his father

## 🔁 The Physicians Embalmed Israel

Israel was the name God gave Jacob after they wrestled at Peniel.

Jacob was his birth name.

Israel was his covenant name, the name of promise.

Genesis reaches for that covenant name even here at his death.

🔁 Israel was Jacob's covenant name

🤼 God gave it after Jacob wrestled at Peniel

👪 Israel became the name of a whole nation

📖 Even in death the covenant name is used

## 📅 So Are Fulfilled The Days Of Those Which Are Embalmed

Forty days was the standard length of the Egyptian embalming process.

This was a fixed, known number in Egyptian practice.

Jacob simply received the normal treatment given to the embalmed.

Custom, not favoritism, explains this exact number.

📅 Forty days was the standard embalming length

⚗️ This process followed known Egyptian practice

🐑 Jacob received the usual treatment for the embalmed

📖 Custom, not favoritism, sets this number

## 🔟 The Egyptians Mourned For Him Threescore And Ten Days

Threescore means sixty.

Sixty plus ten adds up to seventy days of mourning.

Egyptian royalty traditionally received about seventy two days of mourning.

Jacob's seventy days come remarkably close to a royal mourning period.

A shepherd's family receives an honor built for kings.

🔟 Threescore means sixty

➕ Sixty plus ten equals seventy days

👑 Egyptian royalty mourned about seventy two days

📖 Jacob's mourning nearly matches royal honor

# Genesis 50:4-6
# 🙏 Joseph Asks Permission To Bury Jacob
---
## 🏛️ Joseph Spake Unto The House Of Pharaoh

The house of Pharaoh means his royal officials, not Pharaoh himself.

Joseph does not walk straight into the throne room to ask.

He works through Pharaoh's staff first, the normal channel for a request.

That protocol mattered even for Egypt's second highest official.

🏛️ House of Pharaoh means his royal officials

📋 Joseph goes through the normal channel

👑 Even a top official follows protocol here

📖 Respect for order comes before the request

## 🙏 If Now I Have Found Grace In Your Eyes

This phrase was a polite, formal way to ask for a favor.

It means something like, if you are willing to help me.

Joseph is asking humbly here, not commanding anyone.

Manners mattered even for the man running Egypt's food supply.

🙏 The phrase is a polite, formal request

🤝 It means, if you are willing to help

👑 Joseph asks humbly despite his authority

➡️ Manners mattered even at the top of Egypt

## 📜 My Father Made Me Swear

This oath was first recorded back in Genesis forty seven.

Jacob made Joseph swear with his hand under his thigh.

That gesture sealed a solemn, binding promise in this culture.

Joseph is not asking Pharaoh for a personal favor here.

He is fulfilling a promise made to his dying father.

📜 Oath made back in Genesis forty seven

✋ A hand under the thigh sealed it

⚖️ This is a binding oath, not a request

📖 Joseph keeps a promise to his father

## 🔙 I Will Come Again

Joseph promises Pharaoh he will return to Egypt.

He does not use this trip as a chance to leave for good.

Joseph could have simply stayed in Canaan with his family's land.

Instead he commits to Egypt before he even leaves.

🔙 Joseph promises to come back to Egypt

🚪 He does not use this as an exit

💼 His responsibilities in Egypt still matter

➡️ A promise kept before the trip begins

## ✅ Go Up, And Bury Thy Father, According As He Made Thee Swear

Pharaoh grants the request immediately, with no negotiation at all.

He specifically names the oath Joseph swore to his father.

Egypt is in the middle of a famine Joseph is personally managing.

Pharaoh still lets his top official leave during a crisis.

A sworn promise outweighs even a national emergency.

✅ Pharaoh grants the request without delay

📜 He specifically names the oath Joseph swore

🌾 Egypt is still deep in a famine

📖 A sworn oath outweighs even a crisis

# Genesis 50:7-9
# 🐎 A Massive Funeral Procession
---
## 👑 All The Servants Of Pharaoh, The Elders Of His House

Egypt's own royal officials personally join this funeral procession.

These are not low ranking staff members.

They are the senior leadership of Pharaoh's own household.

A foreign shepherd's burial becomes a state level event.

👑 Pharaoh's own officials join the procession

🎖️ These are senior leaders, not staff

🐑 A shepherd's funeral becomes a state event

📖 Joseph's standing lifts his whole family

## 🌍 All The Elders Of The Land Of Egypt

This phrase widens the honor even further.

It is not just Pharaoh's household attending this funeral.

Senior leaders from across the entire nation of Egypt join.

This becomes one of the largest displays of honor in Genesis.

🌍 Elders from across all of Egypt attend

📈 The honor keeps expanding in scale

🐎 This becomes a massive national procession

➡️ Few funerals in Genesis reach this size

## 👨‍👩‍👧‍👦 All The House Of Joseph, And His Brethren, And His Father's House

Three separate households travel together here.

Joseph's own family, his brothers' families, and Jacob's household all go.

This whole extended family unit moves as one for this burial.

👨‍👩‍👧‍👦 Three households travel together

🤝 Joseph and his brothers unite for this trip

🏠 Jacob's whole extended family goes along

📖 The family moves as one for this burial

## 🏡 Only Their Little Ones, And Their Flocks, And Their Herds, They Left In The Land Of Goshen

The children and animals stay behind in Goshen.

This was likely a practical decision for safety and speed.

A slow group of children and livestock could not make this trip easily.

Careful planning shaped even the funeral procession itself.

🏡 Children and animals stay in Goshen

🐑 Livestock would slow the trip down

🛡️ Safety likely shaped this decision

➡️ Even grief involved careful planning

## 🐎 Both Chariots And Horsemen

Chariots and horsemen were Egypt's military transport, not decoration.

Their presence marks this procession as an official, protected event.

A very great company traveled together on this trip.

Such a large, wealthy group crossing open country needed real protection.

This was a guarded state procession, not a quiet family trip.

🐎 Chariots and horsemen mean military escort

🛡️ Protection mattered for such a wealthy group

🎖️ This marks an official state procession

📖 Grief here traveled with real security

# Genesis 50:10-11
# 🕊️ Mourning At The Threshingfloor Of Atad
---
## 🌾 The Threshingfloor Of Atad, Which Is Beyond Jordan

A threshingfloor was a flat open space used for separating grain.

It made a natural gathering place for a large group.

Beyond Jordan means the eastern side of the Jordan River.

That route was not the most direct path into Canaan.

The longer route likely avoided danger closer to the coast.

🌾 A threshingfloor was a flat grain area

🗺️ Beyond Jordan means the river's eastern side

🧭 This was not the most direct route

📖 The detour likely avoided danger

## 😭 They Mourned With A Great And Very Sore Lamentation

Sore here means severe or intense, not painful in the modern sense.

Lamentation means loud, visible grief, not quiet sadness.

This was a public, dramatic display, not private weeping.

😭 Sore means severe or intense

📢 Lamentation means loud, visible grief

👥 This mourning was public, not private

➡️ Grief here was meant to be seen

## 📅 He Made A Mourning For His Father Seven Days

The procession stops for a full seven days at this spot.

This happens before the group even crosses into Canaan.

Seven full days is a long, deliberate pause, not a quick stop.

Jacob is honored at length before he is even home.

📅 Seven full days of mourning here

🚶 This happens before reaching Canaan

⏳ A long pause, not a quick stop

📖 Jacob is honored before he is home

## 👀 The Inhabitants Of The Land, The Canaanites, Saw The Mourning

The Canaanites were the local people already living in this region.

They watch this Egyptian style mourning from the outside.

Their reaction shows how unusual and large this display looked.

👥 Canaanites were the local residents there

👀 They witness this mourning from outside

😮 The scale clearly surprised them

📖 An outsider's reaction reveals the scene's size

## 🏷️ The Name Of It Was Called Abelmizraim

Abelmizraim means mourning of the Egyptians.

The Canaanites name the place after what they witnessed.

A location on the map now marks this one event forever.

Jacob's funeral leaves its name on the land itself.

🏷️ Abelmizraim means mourning of the Egyptians

👥 Canaanites gave the place this name

🗺️ The event becomes part of the map

📖 One funeral reshapes the region's memory

# Genesis 50:12-14
# ⚰️ Jacob Is Buried, Joseph Returns
---
## ✅ His Sons Did Unto Him According As He Commanded Them

Jacob gave detailed burial instructions back in Genesis forty nine.

His sons carry out those exact instructions here.

No detail is skipped or changed along the way.

A father's final wishes are honored completely.

📜 Jacob's instructions came in Genesis forty nine

✅ His sons follow them exactly

🚫 Nothing is skipped or changed

📖 A father's last wishes are honored fully

## 🏛️ Buried Him In The Cave Of The Field Of Machpelah

Machpelah was a family burial cave purchased generations earlier.

Abraham bought it from Ephron the Hittite in Genesis twenty three.

Jacob now joins that same family tomb.

This cave anchors the family's claim to the promised land.

🏛️ Machpelah was the family burial cave

📜 Abraham bought it in Genesis twenty three

👴 Jacob now joins that same tomb

📖 One cave anchors the whole promise

## 📜 Which Abraham Bought With The Field For A Possession Of A Buryingplace

A buryingplace means a permanently owned burial site, not a borrowed grave.

Possession means Abraham legally owned this land, not just used it.

This was the first piece of the promised land Abraham ever owned.

⚰️ Buryingplace means a permanently owned grave site

📜 Possession means Abraham legally owned it

🗺️ This was Abraham's first owned land in Canaan

📖 A grave became the family's first foothold

## 🔙 Joseph Returned Into Egypt

Joseph keeps his earlier promise to Pharaoh here.

He does not stay behind in Canaan once the burial ends.

All who traveled with him return to Egypt together.

Even in grief, Joseph follows through on his own word.

🔙 Joseph returns to Egypt as promised

🚪 He does not stay behind in Canaan

🤝 He keeps his word even in grief

➡️ A promise outlives the moment it was made

# Genesis 50:15-18
# 😨 The Brothers Fear Joseph's Revenge
---
## 👴 Joseph's Brethren Saw That Their Father Was Dead

Jacob had been the one steady link holding this family together.

With him gone, old fears the brothers never resolved come rushing back.

Their guilt over selling Joseph into slavery never actually disappeared.

👴 Jacob had held the family together

😨 Old guilt returns once he is gone

🕳️ Their guilt was never fully resolved

📖 Unresolved guilt can resurface years later

## 😨 Joseph Will Peradventure Hate Us

Peradventure is an old word meaning perhaps or what if.

The brothers are not actually certain Joseph forgives them.

They only assumed his kindness depended on Jacob still being alive.

😨 Peradventure means perhaps or what if

❓ The brothers are not actually certain

👴 They assumed kindness depended on Jacob living

➡️ Fear can outlast real forgiveness

## ⚖️ Will Certainly Requite Us All The Evil Which We Did Unto Him

Requite means to pay someone back, here in the sense of revenge.

The brothers expect Joseph to finally settle the score.

Their own guilt convinces them punishment must be coming.

⚖️ Requite means pay back, here as revenge

😟 The brothers expect punishment now

🕳️ Guilt shapes what they expect from Joseph

📖 Fear often assumes the worst

## 📜 Thy Father Did Command Before He Died

The brothers send Joseph a message claiming Jacob left this instruction.

Scripture never actually records Jacob giving this command earlier.

This message may be the brothers' own invention, born out of fear.

Desperation, not necessarily dishonesty, likely shaped their words.

📜 This claimed command is not recorded earlier

😰 The brothers may have invented it

😨 Real fear likely drives the message

➡️ Desperation can shape what people say

## 🙏 Forgive The Trespass Of Thy Brethren, And Their Sin

Trespass means wrongdoing, a violation against another person.

The brothers finally name what they did without softening it.

They ask directly for forgiveness rather than making excuses.

🙏 Trespass means wrongdoing or sin

🗣️ The brothers finally name it plainly

🚫 No excuses are offered here

📖 Honest confession comes before forgiveness

## 🕊️ Forgive The Trespass Of The Servants Of The God Of Thy Father

The brothers appeal to shared faith here, not just family ties.

The God of thy father points back to Jacob's own God.

They ask Joseph to forgive them as fellow servants of that God.

🕊️ They appeal to shared covenant faith

👴 The God of thy father means Jacob's God

🤝 They call themselves fellow servants of God

📖 Shared faith becomes the basis for the plea

## 😭 Joseph Wept When They Spake Unto Him

This is the second time Joseph weeps in this very chapter.

His tears here come from being feared by the people he loves.

Joseph's power never stopped him from feeling deeply.

😭 Joseph weeps a second time in this chapter

💔 He is hurt by his brothers' fear

👑 Power never stopped his real feelings

📖 Strength and tears can share one man

## 🙇 His Brethren Also Went And Fell Down Before His Face

The brothers physically bow before Joseph one more time.

Joseph dreamed of this exact scene decades earlier, in Genesis thirty seven.

This is the last of several bowing scenes across these chapters.

A boyhood dream finally reaches its complete fulfillment.

🙇 The brothers bow before Joseph again

💭 Joseph dreamed this in Genesis thirty seven

🔁 This is the final bowing scene in Genesis

📖 A childhood dream reaches full fulfillment

# Genesis 50:19-21
# ❤️ Joseph's Famous Forgiveness
---
## ⚖️ Fear Not: For Am I In The Place Of God?

Joseph refuses to act as his brothers' judge here.

He recognizes that final judgment and revenge belong to God alone.

Joseph holds total power over his brothers' lives right now.

Even so, he will not claim that role for himself.

⚖️ Joseph refuses the role of judge

🙏 Final judgment belongs to God alone

👑 He holds power but will not use it

📖 Restraint here reflects real humility

## 😔 Ye Thought Evil Against Me

Joseph does not pretend his brothers' actions were harmless.

He names what happened plainly, as real evil, not confusion.

Forgiveness here does not require rewriting the past.

😔 Joseph names the evil plainly

🚫 He does not soften what happened

📖 Real forgiveness does not erase real wrong

➡️ Honesty and forgiveness can stand together

## 🔄 But God Meant It Unto Good

This is one of the most quoted lines in the whole Bible.

Joseph sees God working through the very evil his brothers chose.

That does not make what they did any less wrong.

God's good plan and human sin can occupy the same story.

🔄 God worked good through real human evil

🚫 Their sin is still not excused

📖 God's plan and human sin share one story

➡️ Good outcomes do not erase real wrongdoing

## 🌍 To Save Much People Alive

Joseph connects his own suffering to an entire region's survival.

Much people means far more than just his own family.

Egypt and its neighbors were fed because Joseph once suffered greatly.

🌍 Much people means the wider region

🌾 Joseph's suffering fed an entire famine zone

🔗 His pain connects directly to their survival

📖 One life's suffering saved countless others

## 🍞 I Will Nourish You, And Your Little Ones

Joseph does not simply forgive his brothers in words alone.

He commits to providing for them and their children going forward.

Nourish means to feed and sustain over time, not one gift.

🍞 Nourish means to feed and sustain

👶 Joseph commits to their children too

🤝 Forgiveness here becomes real provision

➡️ Words of forgiveness turn into action

## 💛 He Comforted Them, And Spake Kindly Unto Them

Joseph follows his words with ongoing comfort, not one speech.

Spake kindly means his gentle words continued after this moment passed.

Real reconciliation shows up in a pattern, not one announcement.

💛 Joseph offers ongoing comfort, not one speech

🗣️ Spake kindly means gentle words continued

🔁 His kindness becomes a lasting pattern

📖 Reconciliation is proven over time

# Genesis 50:22-23
# 👴 Joseph's Long Life
---
## 🎂 Joseph Lived An Hundred And Ten Years

Living to one hundred ten years was Egypt's ideal complete lifespan.

Some cultures today picture a full one hundred years that way.

This number told an Egyptian audience Joseph's life was fully blessed.

🎂 One hundred ten years was Egypt's ideal

👑 It signaled a fully complete, blessed life

🌍 This detail spoke to an Egyptian audience

📖 Joseph's story ends marked as blessed

## 👶 Ephraim's Children Of The Third Generation

Ephraim was Joseph's younger son, blessed ahead of his brother.

That blessing happened back in Genesis forty eight.

Third generation here means Joseph lives to see his great grandchildren.

That was considered a rare and deeply honored kind of long life.

👶 Ephraim was Joseph's younger son

👴 Third generation means great grandchildren

🎉 Seeing this many generations was rare

📖 Joseph's life is honored with real length

## 🦵 The Children Also Of Machir The Son Of Manasseh Were Brought Up Upon Joseph's Knees

Machir was Manasseh's own son, Joseph's grandson through his other son.

Brought up upon Joseph's knees describes a formal custom.

It marked a patriarch officially accepting descendants into the family line.

Joseph personally welcomes four generations into the covenant family.

👨‍👦 Machir was Manasseh's own son

🦵 Upon Joseph's knees marks a formal act

👪 It formally welcomed descendants into the family

📖 Joseph personally links four generations together

# Genesis 50:24-26
# ⚰️ Joseph's Final Words And Death
---
## 👋 I Die: And God Will Surely Visit You

To visit here does not mean a short friendly stop.

It means God will personally step in and act for Israel.

Joseph's final recorded words look forward, not backward.

👋 Visit here means God will personally act

🔮 Joseph's last words point to the future

🚫 This is not a casual stop by God

📖 Even in death Joseph looks ahead in faith

## 📜 Bring You Out Of This Land Unto The Land Which He Sware To Abraham, To Isaac, And To Jacob

Joseph names the whole covenant chain, Abraham, Isaac, and Jacob.

He is directly predicting the events that later become Exodus.

This promise was made generations before the family ever needed it.

📜 Joseph names Abraham, Isaac, and Jacob together

🔮 He predicts the events of Exodus

⏳ The promise predates the family's need for it

📖 One covenant carries across many generations

## ⚖️ Joseph Took An Oath Of The Children Of Israel

Joseph does not simply hope his family remembers this promise.

He makes them swear a formal, binding oath before he dies.

A promise this important deserved more than a passing wish.

⚖️ Joseph secures a formal, binding oath

🚫 He does not leave it as a hope

👪 The whole family swears together

➡️ Important promises deserve real commitment

## ⚰️ Ye Shall Carry Up My Bones From Hence

Joseph asks that his bones eventually leave Egypt for the promised land.

This exact oath gets remembered generations later, in Exodus thirteen.

It is finally fulfilled far later still, in Joshua twenty four.

Joseph believes the promise before he ever sees it kept.

⚰️ Joseph's bones are meant to leave Egypt

📜 Exodus thirteen later recalls this oath

🏛️ Joshua twenty four finally fulfills it

➡️ Joseph trusted a promise he would not see

## 👴 So Joseph Died, Being An Hundred And Ten Years Old

Joseph dies at the same ideal age noted earlier in this chapter.

One hundred ten years was Egypt's picture of a complete life.

Even Joseph's death carries that same mark of full blessing.

👴 Joseph dies at Egypt's ideal age

🎂 One hundred ten years marked completeness

👑 Even his death carries that blessing

📖 A blessed life reaches a blessed end

## ⚱️ He Was Put In A Coffin In Egypt

Genesis does not end in the promised land.

It ends with Joseph's body resting inside an Egyptian coffin.

The whole book closes still waiting for a promise not yet kept.

⚱️ Genesis ends in an Egyptian coffin

🚫 The promised land is not yet reached

⏳ The story closes still unresolved

➡️ Genesis points forward to Exodus`.trim();

export const GENESIS_FIFTY_PERSONAL_SECTIONS = parseGenesisFiftyRawNotes(GENESIS_FIFTY_RAW_NOTES);
