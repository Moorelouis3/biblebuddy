export type MicahOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMicahOneRawNotes(rawText: string): MicahOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MicahOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Micah\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Micah 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Micah\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Micah\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Micah 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Micah 1:${startVerse}` : `Micah 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Micah 1 sections, received " + sections.length);
  }

  return sections;
}

const MICAH_ONE_RAW_NOTES = `# Micah 1:1-4
# 🌩️ The LORD Comes Down In Judgment
---
## 🏠 Micah The Morasthite

"Morasthite" means Micah came from the small town of Moresheth Gath.

That same town is named again later in this very chapter.

Micah is not writing about a place he never saw himself.

He prophesies over his own neighbors, not from a safe distance.

🏠 Morasthite means from Moresheth Gath

📍 His hometown appears again later

🧑‍🌾 Micah is not a distant outsider

📖 He prophesies over his own neighbors

## 👑 In The Days Of Jotham, Ahaz, And Hezekiah

Micah served as a prophet across the reigns of three kings.

That span covers several decades, not a single short moment.

Isaiah prophesied during these same years in the same kingdom.

God kept sending warnings long before judgment finally arrived.

👑 Three kings mark decades of ministry

📅 Not a short or brief span

🗣️ Isaiah served during these same years

📖 God warned long before judgment came

## 🏛️ Concerning Samaria And Jerusalem

Samaria was the capital of the northern kingdom of Israel.

Jerusalem was the capital of the southern kingdom of Judah.

One prophet addresses both nations in a single opening line.

The coming judgment will not stop at either border.

🏛️ Samaria led the northern kingdom

🏙️ Jerusalem led the southern kingdom

🌍 One message reaches both nations

📖 Judgment will not stop at a border

## ⚖️ Let The Lord GOD Be Witness Against You

This verse pictures a courtroom scene before anything else happens.

God calls heaven and earth together as witnesses to a case.

He is not just the witness here.

He is also the judge who will rule on the evidence.

⚖️ A courtroom scene opens the book

👂 Heaven and earth stand as witnesses

🧑‍⚖️ God is both witness and judge

📖 The case is already being heard

## 🏛️ The LORD From His Holy Temple

This temple is not the building standing in Jerusalem.

It points to God's own dwelling place in heaven.

He is about to leave it and come down himself.

The next verse describes exactly that departure.

🏛️ Not the Jerusalem temple building

☁️ God's dwelling place in heaven

🚪 He is about to leave it

📖 The next verse shows that departure

## 🚶 The LORD Cometh Forth Out Of His Place

God does not simply send a message from a distance here.

He pictures himself personally stepping out to act.

This same kind of appearing happened when God met Israel at Sinai.

God's presence always makes creation itself react.

🚶 God steps out personally this time

🏔️ Sinai saw a similar appearing

🌍 Creation reacts to his presence

📖 This is action, not a distant message

## ⛰️ Tread Upon The High Places Of The Earth

High places were hilltop sites often used for pagan worship.

Treading on them is a picture of total dominance.

God is not asking permission to enter these spaces.

He walks over the very places people trusted instead of him.

⛰️ High places were pagan worship sites

👣 Treading shows total dominance

🚫 No permission is asked here

📖 God walks over false trust itself

## 🔥 The Mountains Shall Be Molten Under Him

"Molten" means melted completely, like metal turning liquid in fire.

Even solid mountains cannot stay solid before God's presence.

Wax melting near a flame paints the same picture.

Nothing stays the same shape once God shows up.

🔥 Molten means completely melted

🏔️ Even mountains cannot stay solid

🕯️ Wax near fire shows the picture

📖 Nothing stays fixed before God's presence
# Micah 1:5-9
# ⚖️ The Transgression Of Jacob
---
## 👤 The Transgression Of Jacob Is All This

"Jacob" here means the whole nation, not one man.

Jacob's descendants became the twelve tribes of Israel.

Both the northern and southern kingdoms trace back to him.

The coming judgment covers the whole family, not one tribe.

👤 Jacob means the whole nation here

🌳 His line became twelve tribes

🏛️ Both kingdoms trace back to him

📖 Judgment covers the whole family

## 📍 Is It Not Samaria

The question names the sin's exact location.

Samaria was the capital city of the northern kingdom.

Jerusalem was the capital city of the southern kingdom.

Sin is not vague here, it has a street address.

📍 The question names an exact place

🏛️ Samaria was the northern capital

🏙️ Jerusalem was the southern capital

📖 Sin is given a street address

## 🏙️ I Will Make Samaria As An Heap Of The Field

A city once full of houses becomes an empty heap.

"As an heap of the field" means rubble scattered like a plowed field.

Samaria fell to Assyria exactly this way in history.

The city never truly recovered after that fall.

🏙️ A thriving city becomes a heap

🌾 Rubble scattered like a plowed field

⚔️ Assyria fulfilled this years later

📖 Samaria never fully recovered

## ⛰️ I Will Pour Down The Stones Thereof Into The Valley

Samaria sat built up high on a hill.

This verse pictures its stones being torn down and dumped below.

Even the foundations get uncovered and exposed.

Nothing about the city is left standing or hidden.

⛰️ Samaria sat high on a hill

🪨 Its stones get torn down

🕳️ Even the foundations are exposed

📖 Nothing is left standing or hidden

## 💰 She Gathered It Of The Hire Of An Harlot

"Hire of an harlot" means payment earned through prostitution.

Prophets often pictured Israel's idol worship as a kind of unfaithfulness.

The wealth behind Samaria's idols came from that same unfaithfulness.

What was gained through betrayal will be lost just as easily.

💰 Hire of an harlot means paid betrayal

🙏 Idol worship pictured as unfaithfulness

🏛️ Samaria's wealth came from that betrayal

📖 What was gained wrongly will be lost

## 🔁 They Shall Return To The Hire Of An Harlot

The very wealth Samaria gained wrongly gets taken again.

Whoever conquers the city carries off those same riches.

The cycle of wrongly gained wealth simply repeats with a new owner.

Sin built on theft rarely holds onto what it gained.

🔁 The same wealth changes hands again

⚔️ A conqueror carries off the riches

🔄 Wrongly gained wealth repeats its cycle

📖 Sin built on theft does not last

## 😭 I Will Wail And Howl, I Will Go Stripped And Naked

Micah does not just predict judgment from a safe distance.

He acts out the coming grief with his own body.

Going stripped and naked was a public sign of deep mourning.

The prophet feels the weight of his own message.

😭 Micah does not stay distant here

🧍 He acts out the grief himself

👕 Stripped and naked signals public mourning

📖 He feels his own message's weight

## 🐺 A Wailing Like The Dragons, And Mourning As The Owls

"Dragons" here is an old word for jackals, not mythical beasts.

Jackals make a sharp, haunting cry at night.

Owls were also known for their mournful sound in that region.

Micah borrows the most haunting sounds he knows to picture grief.

🐺 Dragons means jackals, not myths

🌙 Jackals cry sharply at night

🦉 Owls carried a mournful sound too

📖 Micah picks the most haunting sounds

## 🩹 Her Wound Is Incurable

This is not an injury that can heal over time.

The damage to Samaria has already gone past the point of repair.

Judgment language this strong rarely leaves room for recovery.

The next line shows the wound is already spreading.

🩹 Not an injury that can heal

⏳ Past the point of repair

⚠️ Strong language leaves no recovery

📖 The wound is already spreading

## 🧭 He Is Come Unto The Gate Of My People

Samaria's judgment does not stay inside its own borders.

It travels south into Judah's own territory.

It reaches all the way to Jerusalem's own gate.

History later shows an Assyrian army actually reaching that gate.

🧭 Judgment moves south into Judah

🚪 It reaches Jerusalem's own gate

⚔️ Assyria later reached that same gate

📖 No border stopped this danger
# Micah 1:10-13
# 🗺️ A Lament Of Wordplay Over The Towns
---
## 📜 Declare Ye It Not At Gath

This exact wording echoes an old funeral song in Second Samuel.

David once said the same thing mourning Saul and Jonathan's deaths.

Micah borrows that famous line of grief for this new disaster.

Even the choice of words carries the weight of a funeral.

📜 This echoes David's funeral song

👑 David mourned Saul and Jonathan this way

😭 Micah borrows that same grief

📖 Even the wording carries funeral weight

## 🏠 In The House Of Aphrah Roll Thyself In The Dust

"Aphrah" sounds like the Hebrew word for dust.

Micah tells Dust Town to literally roll in dust.

Rolling in dust and ashes was a known sign of grief.

The town's own name becomes part of its own mourning.

🏠 Aphrah sounds like the word for dust

🌪️ Dust Town rolls in real dust

😢 Rolling in dust signaled grief

📖 A name becomes its own mourning

## ✨ Pass Ye Away, Thou Inhabitant Of Saphir, Having Thy Shame Naked

"Saphir" sounds like the Hebrew word for beautiful.

Beautiful Town is told it will leave in shame instead.

Being exposed naked in public was a mark of total disgrace.

The irony sharpens the warning for anyone who hears the name.

✨ Saphir sounds like the word beautiful

😳 Beautiful Town leaves in shame instead

👕 Public nakedness meant total disgrace

📖 The irony sharpens this warning

## 🚶 The Inhabitant Of Zaanan Came Not Forth

"Zaanan" sounds like the Hebrew phrase for go forth.

Go Forth Town is the one place that does not go forth.

Fear likely kept its people from coming out to help anyone.

The town's own name turns into a quiet accusation.

🚶 Zaanan sounds like go forth

🚫 This town does not go forth

😨 Fear likely kept them inside

📖 A name becomes a quiet accusation

## 🏠 In The Mourning Of Bethezel

"Bethezel" likely means house of nearness or house of withdrawal.

Its exact meaning is still debated among scholars today.

Either way, the town offers no real shelter in this moment.

A place meant for support fails when it is needed most.

🏠 Bethezel may mean nearness or withdrawal

❓ Scholars still debate the exact meaning

🚫 No real shelter is offered here

📖 Support fails right when it matters

## 🍋 The Inhabitant Of Maroth Waited Carefully For Good

"Maroth" sounds like the Hebrew word for bitter.

Bitter Town hoped for good news instead of bad.

Evil came down from the LORD instead of the good it hoped for.

Its own name already hinted at the outcome waiting for it.

🍋 Maroth sounds like the word bitter

🤞 This town hoped for good news

⚡ Evil came down from the LORD instead

📖 Its name already hinted the outcome

## 🐎 Bind The Chariot To The Swift Beast

"Lachish" sounds like the Hebrew word for a team of horses.

Micah pictures the city hitching up chariots to flee fast.

Lachish was a real, heavily fortified city in Judah.

Assyria later besieged this exact city in a famous siege.

🐎 Lachish sounds like team of horses

🏃 Micah pictures a fast chariot escape

🏰 Lachish was a real fortified city

📖 Assyria later besieged this same city

## 🏙️ The Transgressions Of Israel Were Found In Thee

Lachish sat in Judah, not in the northern kingdom.

Yet northern Israel's sin is found inside its walls too.

Sin spread south long before Assyria's armies ever did.

No city stayed untouched once compromise took root.

🏙️ Lachish sat inside Judah's borders

🔀 Northern sin reached this southern city

🧭 Sin traveled south before armies did

📖 No city stayed fully untouched
# Micah 1:14-16
# 🦅 Baldness And Captivity
---
## 🏠 Thou Shalt Give Presents To Moreshethgath

"Moreshethgath" is Micah's own hometown, named back in verse one.

The name sounds like the Hebrew word for betrothed or promised.

A father once gave gifts when sending a daughter off in marriage.

Here that gift language describes handing the town to a conqueror.

🏠 Moreshethgath was Micah's own hometown

💍 Its name sounds like betrothed

🎁 Marriage gifts once used this language

📖 The town is handed to a conqueror

## 🤥 The Houses Of Achzib Shall Be A Lie

"Achzib" sounds like the Hebrew word for a lie.

Lie Town will prove to be exactly that, a lie.

Judah's kings trusted it for safety that never actually came.

A name meant as a warning gets ignored until too late.

🤥 Achzib sounds like the word lie

🏰 Lie Town becomes exactly that

👑 Judah's kings trusted it wrongly

📖 A warning name gets ignored too long

## 👑 I Will Bring An Heir Unto Thee, O Inhabitant Of Mareshah

"Mareshah" sounds like the Hebrew word for an heir or conqueror.

An heir is supposed to be family, not an enemy.

Here the heir arriving is a foreign invader instead.

The town's own name predicts exactly who will come to claim it.

👑 Mareshah sounds like heir or conqueror

👨‍👩‍👧 An heir is usually family

⚔️ This heir arrives as an invader

📖 The name predicts its own conqueror

## 🕳️ He Shall Come Unto Adullam The Glory Of Israel

David once hid from Saul in a cave at Adullam.

That cave marked one of David's lowest, most hunted moments.

Now Israel's own leaders are pictured fleeing to that same place.

The nation's glory ends up hiding exactly where David once hid.

🕳️ David once hid in a cave here

👑 That was one of his lowest moments

🏃 Israel's leaders now flee to the same place

📖 The nation's glory ends up hiding too

## ✂️ Make Thee Bald, And Poll Thee For Thy Delicate Children

"Poll" is an old word meaning to shave the head.

Shaving the head was a public sign of deep mourning.

The grief here is for children being taken away, not for the dead.

Losing children to captivity could feel as final as losing them to death.

✂️ Poll means to shave the head

😢 Shaving the head signaled mourning

👶 This mourning is for lost children

📖 Captivity could feel as final as death

## 🦅 Enlarge Thy Baldness As The Eagle

Certain large birds go through a visible molting season.

During that season they can look strikingly bald around the head.

Micah pictures Judah's mourning growing that same visible and total.

Grief here is worn in the open, not hidden.

🦅 Large birds go bald while molting

👀 The baldness looked striking and visible

😭 Judah's mourning grows just as visible

📖 Grief here is worn in the open

## 🚶 For They Are Gone Into Captivity From Thee

The chapter ends with real people being taken from their homes.

This was not a distant threat anymore by this point.

Captivity meant losing land, family structure, and daily life all at once.

Micah's warnings were never only about buildings or cities.

🚶 Real people are taken from home

⏳ The threat is no longer distant

🏡 Captivity meant losing an entire life

📖 Micah's warnings were always about people
`.trim();

export const MICAH_ONE_PERSONAL_SECTIONS = parseMicahOneRawNotes(MICAH_ONE_RAW_NOTES);
