export type MalachiOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMalachiOneRawNotes(rawText: string): MalachiOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MalachiOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Malachi\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Malachi 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Malachi\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Malachi\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Malachi 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Malachi 1:${startVerse}` : `Malachi 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Malachi 1 sections, received " + sections.length);
  }

  return sections;
}

const MALACHI_ONE_RAW_NOTES = `# Malachi 1:1-5
# 💔 Loved Jacob, Hated Esau
---
## ⚖️ The Burden Of The Word Of The LORD

Burden means a heavy warning, usually a message of judgment.

The word pictures something a prophet must carry and then set down in front of the people.

Malachi is not bringing good news to open the book.

He is bringing a weight God wants Israel to feel.

⚖️ Burden means a heavy warning

📦 A message the prophet must carry

😟 The book opens with weight

📖 God wants Israel to feel it

## 📯 By Malachi

Malachi means my messenger.

That name fits exactly what this book does.

Many scholars believe it was likely a title, not a birth name.

Malachi is the last prophet of the Old Testament.

He wrote after the Jews returned from exile and rebuilt the temple.

The nation was free again, but its faith had grown cold.

📯 Malachi means my messenger

🏷️ Likely a title, not a name

🔚 The last Old Testament prophet

📖 Freedom returned, but faith grew cold

## ❤️ I Have Loved You, Saith The LORD

God opens Malachi with a claim, not a question.

I have loved you is the first thing He says.

Everything else in the book answers a complaint the people raise next.

Love comes before any rebuke that follows.

❤️ God opens with love, not blame

🗣️ I have loved you comes first

⚖️ Rebuke follows, but love leads

📖 Complaint never gets the first word

## ❓ Wherein Hast Thou Loved Us?

Wherein means in what way, an old way to ask how.

The people answer God's love with a question instead of thanks.

This is the first of many such questions in Malachi.

Each one pushes back on something God just said.

A people who no longer notice love will always ask how it showed up.

❓ Wherein means in what way

🙄 Love gets answered with doubt

🔁 The first of many such questions

📖 Numb hearts stop noticing love

## 👬 Was Not Esau Jacob's Brother?

Esau and Jacob were twin sons born to Isaac and Rebekah.

Jacob later became Israel, the father of the twelve tribes.

Esau became the father of the nation of Edom.

God is reminding Israel that these two nations share one family tree.

What God does next is not about picking a stranger over a friend.

It is about choosing between two brothers from the very same home.

👬 Esau and Jacob were twin brothers

🇮🇱 Jacob became Israel's father

🏔️ Esau became Edom's father

📖 One family split into two nations

## 🙌 Yet I Loved Jacob

God says plainly that He chose Jacob over Esau.

This choice happened before either brother had done anything good or bad.

It was never about which brother behaved better.

It was about God keeping His own promise and plan.

The covenant line was always going to run through Jacob.

🙌 God chose Jacob on purpose

⏳ The choice came before any actions

🎯 Not about who behaved better

📖 God kept His own promise moving

## 💔 I Hated Esau

Hated here does not mean God felt rage toward Esau as a person.

In this kind of covenant language, hated means not chosen for the promised line.

Esau still received land, family, and a nation of his own.

He simply was not the one carrying God's covenant forward.

The word is strong because the choice itself was serious.

💔 Hated means not chosen, not rage

🏞️ Esau still kept land and family

🚫 He was not the covenant line

📖 Strong word, serious choice behind it

## 🏔️ Laid His Mountains And His Heritage Waste

Esau's descendants settled a rugged, mountainous land called Edom.

God let that land be struck down and left in ruin.

Heritage here means the land Esau's family expected to keep forever.

Even an inheritance can be undone when judgment comes.

🏔️ Edom was a mountainous homeland

💥 God let that land fall

🏚️ Heritage means the expected inheritance

📖 Inheritance can still be undone

## 🐺 For The Dragons Of The Wilderness

Dragons here is an old word for wild jackals, not mythical beasts.

Jackals are scavengers that move into places people have abandoned.

The image paints Edom as empty and overrun by wild animals.

A once proud homeland is reduced to a den for scavengers.

🐺 Dragons means wild jackals here

🏚️ Jackals move into abandoned places

🏞️ Edom pictured as empty land

📖 Pride reduced to a scavenger's den

## 🗣️ We Will Return And Build The Desolate Places

This is Edom speaking, not Israel.

Edom insists it will rebuild everything God tore down.

The claim sounds confident, almost defiant toward God himself.

Edom treats its own ruin as a problem it can fix alone.

🗣️ Edom speaks, not Israel here

🏗️ Edom vows to rebuild alone

😤 The claim defies God directly

📖 Ruin treated as fixable by pride

## ⚖️ The People Against Whom The LORD Hath Indignation For Ever

God answers Edom's confidence with a flat refusal.

Indignation means deep, lasting anger at persistent wrongdoing.

Edom's judgment here is not called temporary.

Israel's own eyes will see something different.

They will watch the LORD's name grow from their own border.

Judgment can sit next to blessing in the very same moment.

⚖️ Indignation means lasting, deep anger

🚫 Edom's ruin is not temporary

👀 Israel will see something different

📖 Judgment and blessing can sit together

# Malachi 1:6-10
# 🕯️ Honor Due, Offerings Refused
---
## 👨‍👦 A Son Honoureth His Father

Honoureth means to treat someone with the respect their position deserves.

In this culture, a son was expected to honor his father without question.

A servant owed that same kind of respect to his master.

God uses both relationships to ask a simple question of His priests.

👨‍👦 Honoureth means to show real respect

🏠 Sons were expected to honor fathers

🧑‍🌾 Servants owed the same to masters

📖 God asks the priests the same question

## ❓ Where Is Mine Honour?

God asks where the honor is that a father deserves.

He has acted as a father toward Israel from the very start.

The question exposes a relationship that has gone cold.

Respect that should be automatic is instead missing.

❓ God asks where His honor is

👨‍👧 He has been a true father

🧊 The relationship has gone cold

📖 Expected respect has gone missing

## 🧑‍⚖️ O Priests, That Despise My Name

This rebuke is aimed directly at the priests, not the whole nation.

Priests carried the job of teaching Israel how to honor God rightly.

Despise means to treat something as worthless or beneath real attention.

The very people meant to guard worship are the ones treating it as small.

🧑‍⚖️ Aimed at priests, not everyone

📚 Priests were meant to teach worship

🙄 Despise means treated as worthless

📖 Worship's guardians treat it as small

## 🙋 Wherein Have We Despised Thy Name?

The priests ask this question as if they are innocent.

Their own actions, named in the next verse, already answer them.

A pattern is forming where sin hides behind a question.

Pretending not to understand does not make someone innocent.

🙋 Priests ask as if innocent

🔍 Their own actions answer the question

🔁 Sin keeps hiding behind questions

➡️ Confusion is not the same as innocence

## 🍞 Ye Offer Polluted Bread Upon Mine Altar

Polluted means spoiled or made unfit for something holy.

The bread offered at the altar was meant to be the very best, set apart for God.

Priests had started bringing whatever was easiest instead.

What reaches the altar reveals what a worshiper really thinks of God.

🍞 Polluted means spoiled or unfit

🏛️ The altar deserved the very best

😮‍💨 Priests brought the easiest option instead

📖 What we offer reveals what we believe

## 😤 The Table Of The LORD Is Contemptible

Contemptible means worthy of scorn or disrespect.

The table pictures the altar itself, where offerings to God were placed.

Priests are not saying this out loud, but their actions say it for them.

Actions can speak louder than any confession of faith.

😤 Contemptible means worthy of scorn

🍽️ The table pictures the altar

🤐 Unspoken, but shown through actions

📖 Actions speak louder than words here

## 📜 If Ye Offer The Blind For Sacrifice

The law required sacrifices to be healthy animals without defect.

A blind or sick animal cost the owner far less to give up.

Priests were accepting these lesser animals instead of enforcing the law.

Convenience was replacing obedience at the altar.

📜 Sacrifices had to be healthy animals

🦯 Blind animals cost the giver less

✅ Priests accepted animals they should have refused

📖 Convenience was replacing real obedience

## 👑 Offer It Now Unto Thy Governor

God points to a normal human ruler as a test case.

Try giving a governor a damaged, worthless gift and see what happens.

No earthly official would accept a gift like that without insult.

Yet these same worshipers hand God exactly that kind of gift.

👑 A governor is the test case

🎁 A damaged gift insults any ruler

🚫 No official would accept it

📖 God receives worse than any ruler would

## 🙏 Beseech God That He Will Be Gracious Unto Us

Beseech means to beg earnestly, with real urgency.

The priests still want God's favor despite offering Him so little.

Grace is being requested by people unwilling to give God their best.

Mercy and careless worship do not usually travel together.

🙏 Beseech means to beg earnestly

🎭 They still want God's favor

⚖️ Careless worship, expected grace

📖 Mercy and carelessness rarely travel together

## 🚪 Shut The Doors For Nought

Nought is an old word meaning nothing, or for no real purpose.

God says He would rather see the temple doors shut completely.

Empty worship is not better than no worship at all.

A closed door causes less harm than a dishonest one left open.

🚪 Nought means nothing or no purpose

🔒 God prefers closed doors to empty worship

⚠️ Empty worship is still harmful

📖 Honesty matters more than appearances

## 🙅 Neither Will I Accept An Offering At Your Hand

This is God's final word for this part of the chapter.

He is not rejecting worship itself.

He is rejecting worship that costs the worshiper nothing real.

A gift that costs nothing was never really a gift at all.

🙅 God refuses this kind of offering

❌ Not rejecting worship itself

💸 Rejecting worship that costs nothing

📖 A costless gift is not a gift

# Malachi 1:11-14
# 👑 A Great King, Not A Beggar
---
## 🌅 From The Rising Of The Sun Even Unto The Going Down Of The Same

This phrase means everywhere on earth, from east to west.

It is an old way of saying the whole world, without exception.

God is widening the picture far beyond Israel's own borders.

His reputation was never meant to stay inside one nation.

🌅 East to west means everywhere

🌍 The whole world, no exceptions

🗺️ Wider than Israel's own borders

📖 God's reputation reaches beyond one nation

## 🌐 My Name Shall Be Great Among The Gentiles

Gentiles means people outside the nation of Israel.

This line looks forward, not backward at present pagan worship.

God is promising that true worship of Him will one day reach every nation.

That promise points all the way toward the New Testament.

🌐 Gentiles means non Israelite nations

🔮 This looks forward, not backward

🙏 True worship will reach every nation

📖 This promise points toward the New Testament

## 🕯️ In Every Place Incense Shall Be Offered

Incense was burned as a picture of prayer rising up to God.

Here it stands for worship that is pure and sincere everywhere.

The contrast with Israel's own careless offerings is sharp.

Pure worship here is not tied to any one place.

🕯️ Incense pictures prayer rising to God

✨ It stands for pure, sincere worship

⚖️ Sharp contrast with Israel's own offerings

📖 Pure worship is not tied to one place

## 💔 But Ye Have Profaned It

Profaned means treated something holy as if it were common.

Israel's own worship is the direct opposite of the picture just given.

Outsiders are pictured honoring God.

His own people are cutting corners instead.

💔 Profaned means treated as common

🔄 The opposite of the picture above

🌍 Outsiders pictured honoring God

📖 God's own people cut corners instead

## 🍖 The Fruit Thereof, Even His Meat, Is Contemptible

Fruit thereof simply means whatever that offering produced.

Meat here refers to the portion of the sacrifice eaten in worship.

Calling it contemptible repeats the charge from earlier in the chapter.

The same complaint keeps resurfacing because nothing has changed.

🍖 Fruit thereof means the offering's result

🍽️ Meat means the eaten portion

🔁 Repeats the earlier charge exactly

📖 Nothing has changed since verse seven

## 😩 Behold, What A Weariness Is It!

Weariness means a dragging sense of boredom and tiredness.

These are the priests' own words about serving God.

Holy work had turned into an exhausting chore for them.

A tired heart toward God rarely stays hidden for long.

😩 Weariness means dragging boredom

🗣️ The priests' own complaint, recorded

🧱 Holy work felt like a chore

📖 A tired heart rarely stays hidden

## 👃 Ye Have Snuffed At It

Snuffed pictures someone sniffing at something in scorn.

It is the same gesture as a sneer or an eye roll today.

Holy things were being treated like an annoying interruption.

Contempt had replaced reverence at the very altar of God.

👃 Snuffed means sniffing in scorn

🙄 Like a modern sneer or eye roll

⚠️ Holy things felt like an annoyance

📖 Contempt replaced reverence at the altar

## 🩹 That Which Was Torn, And The Lame, And The Sick

This list repeats the exact defects named back in verse eight.

Torn means an animal already injured, often by a predator.

The same corner cutting shows up again before the chapter ends.

Repetition in scripture is rarely an accident.

God is making sure this pattern cannot be missed or excused.

🔁 Repeats the defects from verse eight

🩹 Torn means already injured by a predator

📣 The pattern repeats for a reason

📖 This cannot be missed or excused

## 🎭 Cursed Be The Deceiver

A deceiver here is someone who promises one thing and delivers another.

Voweth means he formally promised God his very best male animal.

He then quietly substitutes a weaker, corrupt animal instead.

God is not fooled by a vow that is never actually kept.

🎭 Deceiver means one who breaks a promise

🐑 Voweth means a formal promise to God

🔄 A good vow, a weak substitute

📖 God is never fooled by broken vows

## 👑 I Am A Great King

God names Himself a great King, not a beggar at anyone's altar.

Dreadful here does not mean scary in an unfair way.

It means a weight and majesty that demands real respect.

Nothing Israel offers can make God smaller than He actually is.

His worth never depended on their worship to begin with.

👑 God names Himself a great King

😨 Dreadful means majestic, not unfair

⚖️ His worth demands real respect

📖 God's worth never depended on them
`.trim();

export const MALACHI_ONE_PERSONAL_SECTIONS = parseMalachiOneRawNotes(MALACHI_ONE_RAW_NOTES);
