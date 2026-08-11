export type SecondSamuelSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelSixRawNotes(rawText: string): SecondSamuelSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 6:${startVerse}` : `2 Samuel 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Samuel 6 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_SIX_RAW_NOTES = `
# SecondSamuel 6:1-5
# 🎶 David Gathers To Bring Up The Ark
---
## ⚔️ All The Chosen Men Of Israel

"Chosen men" means trained fighters, not the whole nation.

David is not gathering a random crowd for a parade.

Thirty thousand is the size of a full army on the move.

This chapter opens more like a military campaign than a simple errand.

⚔️ Chosen men means trained soldiers

🔢 Thirty thousand equals a full army

🎉 This looks military, not casual

📖 Bringing the ark home was a national event

## 🗺️ Baale Of Judah

Baale of Judah is another name for Kirjathjearim.

The ark rested there since First Samuel seven.

That was close to twenty years earlier.

David is finally bringing it back into full national worship.

🗺️ Baale of Judah means Kirjathjearim

📜 The ark rested there since First Samuel seven

⏳ Nearly twenty years had passed

📖 David restores the ark to full worship

## 👑 Whose Name Is Called By The Name Of The LORD Of Hosts

"LORD of hosts" means commander over heaven's armies.

The title is not decorative.

It reminds Israel that this ark represents real, active power.

The ark is never just a box of wood and gold.

👑 LORD of hosts means commander of heaven's armies

⚡ The title signals real power

📦 The ark is not just an object

📖 God's presence rides with His people

## 👼 That Dwelleth Between The Cherubims

Cherubim were carved angelic figures on the ark's lid.

Their wings faced each other over the mercy seat.

That space between them pictured God's throne on earth.

The ark carried the idea of God sitting enthroned among His people.

👼 Cherubim are carved angelic figures

🪶 Their wings faced each other

🎯 The space between pictured God's throne

📖 God was pictured as enthroned among Israel

## 🚚 Set The Ark Of God Upon A New Cart

This detail sounds harmless but it was a real mistake.

The law required the ark to be carried on the shoulders of Levites.

Long poles called staves ran through rings on its sides for that purpose.

A cart was the method the Philistines had used earlier in this book.

David copies the wrong model instead of the one Moses commanded.

🚚 A cart replaced the required shoulder carry

📜 Numbers four commands carrying by staves

🙅 This mirrors the Philistines' method

📖 The right method mattered to God

## 🏠 The House Of Abinadab That Was In Gibeah

This is the same house named back in First Samuel seven.

Abinadab's family guarded the ark all those years.

Gibeah just names the hill it sat on.

A long, quiet chapter of waiting is finally ending.

🏠 Same house named in First Samuel seven

🛡️ Abinadab's family guarded the ark

⛰️ Gibeah just names the hill it sat on

📖 A long wait is finally ending

## 👦 Uzzah And Ahio The Sons Of Abinadab

Uzzah and Ahio grew up in the house where the ark sat.

They likely saw it every day of their lives.

That familiarity may explain why Uzzah later treated it so casually.

Growing up near something holy does not make it any less holy.

👦 Uzzah and Ahio grew up beside the ark

👀 They saw it every day

😌 Familiarity can breed carelessness

📖 Holiness does not fade with familiarity

## 🚶 Ahio Went Before The Ark

Ahio walked ahead of the cart to guide the way.

Uzzah stayed alongside it, close enough to reach out and touch it.

Neither brother seems to have questioned the cart itself.

That closeness put Uzzah in the exact spot where danger was waiting.

🚶 Ahio led from the front

🤚 Uzzah stayed close beside the ark

⚠️ Closeness placed him at risk

➡️ Position mattered more than anyone realized yet

## 🎶 Played Before The LORD On All Manner Of Instruments

Israel celebrates with a full band of instruments.

Harps and psalteries were both plucked, stringed instruments.

Timbrels were small hand held drums.

Cornets were simple horns.

Cymbals were paired metal discs struck together.

This was loud, joyful worship in front of everyone.

🎻 Harps and psalteries were stringed instruments

🥁 Timbrels means a small hand drum

📯 Cornets were simple horns

📖 Worship here was loud and public

# SecondSamuel 6:6-8
# ⚡ Uzzah Reaches Out And Dies
---
## 🌾 Nachon's Threshingfloor

A threshingfloor was a flat, open area used to separate grain from stalks.

Nachon was simply the name of this particular one.

It sat along the road, an ordinary work spot.

Nothing here hints at what is about to happen.

🌾 Threshingfloor means a flat grain work area

📍 Nachon just names this location

🛣️ It sat along the road

➡️ An ordinary spot becomes unforgettable

## 🤚 Put Forth His Hand To The Ark Of God

This looks like a small, careful reflex.

The oxen stumbled.

The cart tilted hard.

Uzzah reached out only to steady it.

The law never allowed an exception for good intentions.

Touching the ark was forbidden no matter the reason.

🐂 The oxen stumbled first

🤚 Uzzah only meant to help

🚫 Good intentions were not an exception

📖 The law allowed no exception here

## 🔥 The Anger Of The LORD Was Kindled

"Kindled" pictures anger catching like a flame.

This is not a slow build of irritation.

It describes a sudden, intense response.

The seriousness of touching the ark becomes obvious immediately.

🔥 Kindled means anger catching like fire

⚡ This was sudden, not gradual

😠 The response was intense

📖 Holiness demanded to be taken seriously

## ⚠️ Smote Him There For His Error

"Error" here does not mean a small slip.

It refers to a real violation, even without evil intent.

Numbers four already warned that touching holy things could bring death.

Uzzah's death enforces a rule that had existed for centuries.

⚠️ Error means a real violation here

📜 Numbers four already warned of this danger

🚫 Intent did not remove the danger

📖 An old rule was enforced that day

## 😠 David Was Displeased

David's reaction is not calm acceptance.

He feels real anger mixed with real grief.

Losing a friend never feels simple.

Being corrected in public adds to the pain.

Even a king faithful to God can struggle with a hard moment.

😠 David feels anger, not calm

😢 Grief mixes in as well

👑 Even David struggles here

📖 Correction can be hard to accept

## 📛 Called The Name Of The Place Perezuzzah

"Perezuzzah" means the breach of Uzzah.

Naming a place after an event was common in the Bible.

It kept the memory alive for anyone who passed by later.

This name would not let the lesson be forgotten quietly.

📛 Perezuzzah means breach of Uzzah

🗺️ Naming places after events was common

🧠 The name preserved the memory

📖 The lesson could not be forgotten quietly

# SecondSamuel 6:9-11
# 😨 The Ark Waits At Obededom's House
---
## 😨 David Was Afraid Of The LORD That Day

David's fear is not simple embarrassment.

He suddenly feels the real weight of God's holiness.

The ark is not a harmless national symbol to David anymore.

This fear will shape his very next decision.

😨 David feels real fear, not embarrassment

⚡ Holiness suddenly feels weighty

📦 The ark is not harmless to him now

➡️ Fear shapes his next move

## ❓ How Shall The Ark Of The LORD Come To Me

This question is not really about logistics.

David is asking how anyone approaches something this holy safely.

He has just watched what happens when it is handled wrong.

The question hangs unanswered for now.

❓ The question is not about logistics

⚡ It is about approaching holiness safely

👀 David just watched the danger firsthand

➡️ The answer waits for now

## 🛑 Would Not Remove The Ark Of The LORD Unto Him

David chooses to pause instead of pushing forward.

Fear, not laziness, drives this decision.

He needs time before trying again.

Sometimes wisdom looks like simply stopping.

🛑 David pauses instead of pushing on

😨 Fear drives the decision

⏳ He needs time to think

📖 Wisdom can look like stopping

## 🏙️ Obededom The Gittite

"Gittite" usually points to the Philistine city of Gath.

Many scholars believe Obededom came from Gathrimmon instead, a Levite city.

Gathrimmon belonged to the family of Kohath in Joshua twenty one.

If that is right, the ark finally reached a Levite family.

🏙️ Gittite usually points to Gath

🏘️ Many scholars link him to Gathrimmon instead

🙏 Gathrimmon was a Levite city

📖 The ark may have found its proper home

## 📆 Continued In The House Of Obededom The Gittite Three Months

Three months is not a short pause.

That is enough time for word of what happens next to spread.

Nothing dramatic happens during these months.

The quiet itself becomes part of the story.

📆 Three months passed quietly

🗣️ Enough time for word to spread

😌 Nothing dramatic happens here

➡️ Quiet became part of the story

## 🙏 The LORD Blessed Obededom And All His Household

The ark did not bring Obededom the fate it brought Uzzah.

This is not random luck.

It shows the ark itself was never the danger.

Handling it without reverence was the danger.

🙏 Obededom was blessed, not harmed

🎲 This was not random luck

📦 The ark itself was never the danger

📖 Reverence made the difference

# SecondSamuel 6:12-15
# 💃 The Ark Enters The City With Gladness
---
## 📰 The LORD Hath Blessed The House Of Obededom

David hears the report and takes note.

The very thing he feared has turned into visible blessing for someone else.

That news changes how he sees his next move.

Fear starts giving way to confidence.

📰 David hears the good report

🙏 What he feared became a blessing elsewhere

🔄 His outlook begins to shift

➡️ Confidence starts to return

## 😊 Into The City Of David With Gladness

The mood here is the opposite of the first attempt.

That earlier trip ended in death and fear.

This time David moves forward with real joy.

The parallel account in First Chronicles fifteen explains why.

This time the Levites carried the ark on their shoulders.

That was the method the law required all along.

😊 Gladness replaces the earlier fear

📖 First Chronicles fifteen explains the change

🙌 Levites carried it properly this time

➡️ Doing it right restored the joy

## 🚶 They That Bare The Ark Of The LORD Had Gone Six Paces

"Bare" means carried, not driven on a cart.

This detail quietly confirms the method finally changed.

Six paces is a very short distance.

David stops that quickly to make sure everything is going right.

🚶 Bare means carried, not driven

🔄 The method has changed

👣 Six paces is a very short distance

📖 David checks in almost immediately

## 🐂 He Sacrificed Oxen And Fatlings

"Fatlings" means animals specially fattened for sacrifice.

Stopping here so soon shows real caution.

David is not rushing the way he did the first time.

Careful worship replaces careless celebration.

🐂 Fatlings means specially fattened animals

🛑 Stopping this soon shows caution

🚫 No more rushing this time

📖 Careful worship replaces carelessness

## 💃 David Danced Before The LORD With All His Might

This is full body worship, not a restrained royal gesture.

David holds nothing back in front of the whole nation.

A king does not usually move this way in public.

Joy here outweighs any concern about appearances.

💃 Full body worship, not restraint

👑 Kings rarely moved this way in public

😊 Joy outweighs appearances

📖 Worship here holds nothing back

## 👕 Girded With A Linen Ephod

An ephod was a simple garment usually worn by priests.

It was not royal clothing meant to display status.

David sets aside his usual authority to look like an ordinary worshiper.

The king humbles himself in front of everyone watching.

👕 Ephod means a simple priestly garment

🚫 Not royal clothing at all

👑 David sets aside his usual status

📖 The king humbles himself publicly

## 📯 With Shouting And With The Sound Of The Trumpet

Trumpets in Israel were not just musical instruments.

Numbers ten shows they were used to announce important, sacred moments.

Shouting and trumpets together mark this as a major national event.

The whole procession sounds like a celebration, not a quiet ceremony.

📯 Trumpets announced sacred moments

📜 Numbers ten explains their use

🎉 This marks a major event

📖 Celebration, not a quiet ceremony

# SecondSamuel 6:16-19
# 👑 David Blesses The People, Michal Watches
---
## 🪟 Michal Saul's Daughter Looked Through A Window

Michal is David's first wife and Saul's daughter.

A window already mattered once before between them.

In First Samuel nineteen, Michal let David escape through a window to save his life.

Now she watches him again through a window, but everything between them has changed.

👀 Michal is David's first wife

🪟 A window already mattered once before

🏃 That window once saved David's life

📖 The same window now frames something different

## 🦘 Leaping And Dancing Before The LORD

The text repeats two different words for David's movement.

Leaping and dancing together paint an image of full, unrestrained joy.

This was not a small, dignified nod of respect.

David's whole body was caught up in worship.

🦘 Leaping means jumping with energy

💃 Dancing adds full body movement

🙌 Together they show unrestrained joy

📖 Worship filled his whole body

## 💔 She Despised Him In Her Heart

"Despised" means she looked down on him with real contempt.

Michal grew up as a king's daughter, used to royal formality.

To her, David looked more like a common man than a king.

Her judgment happens silently, before she ever says a word out loud.

💔 Despised means looked down on with contempt

👑 Michal expected royal formality

😳 David looked common to her instead

➡️ Her judgment starts silently

## ⛺ The Tabernacle That David Had Pitched For It

This is not the original tabernacle Moses built in the wilderness.

That older tabernacle was still standing at a place called Gibeon.

David set up a separate tent in Jerusalem just for the ark.

Two holy sites exist side by side for a time in Israel's history.

⛺ This tent is not Moses' original tabernacle

📍 The older one still stood at Gibeon

🏗️ David built a separate tent for the ark

📖 Two holy sites existed side by side

## 🔥 Offered Burnt Offerings And Peace Offerings

A burnt offering was completely consumed on the altar.

It pictured total devotion, holding nothing back.

A peace offering was partly eaten in a shared meal.

It pictured fellowship and thanksgiving between God and His people.

🔥 Burnt offerings were fully consumed

🙏 They pictured total devotion

🍽️ Peace offerings were shared in a meal

📖 They pictured fellowship with God

## 🗣️ Blessed The People In The Name Of The LORD Of Hosts

This does not mean David replaced the priests.

He speaks a blessing as the nation's leader, not as a priest performing a ritual.

A king pronouncing blessing shows how closely his role was tied to worship.

Leadership and worship were never fully separate in Israel.

👑 David is not replacing the priests

🗣️ He blesses as the nation's leader

🙏 His role stayed tied to worship

📖 Leadership and worship overlapped in Israel

## 🍞 A Cake Of Bread, And A Good Piece Of Flesh, And A Flagon Of Wine

Every single person in Israel receives food, not just leaders or men.

Many scholars believe "flagon" is a mistranslation here.

The word likely meant a pressed cake of raisins, not a wine container.

Either way, the celebration reached the whole nation.

Women were included, not just men.

🍞 Everyone received food, not just men

🍇 Flagon may really mean raisin cake

🎉 Celebration reached the whole nation

📖 Details like this reward a closer look

# SecondSamuel 6:20-23
# 🔥 David And Michal Clash
---
## 🏠 Then David Returned To Bless His Household

The public celebration is over.

Now David turns to bless his own family in private.

That shift from public to private sets up the very next scene.

Not every blessing happens in front of a crowd.

🏠 The scene shifts from public to private

🙏 David blesses his own household now

🔀 This sets up the next scene

📖 Not every blessing needs a crowd

## 😏 How Glorious Was The King Of Israel To Day

These words sound like a compliment at first.

Michal's tone is not sincere.

She means the exact opposite of what she says.

Sarcasm carries the real sting of this line.

🗣️ The words sound like praise at first

😏 Michal's tone is sarcastic

🔄 She means the opposite

➡️ Sarcasm carries the real sting

## 👕 Uncovered Himself To Day In The Eyes Of The Handmaids Of His Servants

The linen ephod likely did not literally expose David.

Michal exaggerates the moment on purpose.

She frames simple worship clothing as public shame.

Her complaint is really about status, not actual modesty.

👕 The ephod likely did not truly expose him

🎭 Michal exaggerates on purpose

👑 Her real issue is status

📖 Status hides behind a modesty complaint

## 👎 As One Of The Vain Fellows Shamelessly Uncovereth Himself

"Vain fellows" means worthless, low class men.

Michal compares the king to the lowest class of person she can imagine.

That comparison reveals what she values most.

She wants royal dignity, not open worship.

Her father Saul cared about appearances too.

👎 Vain fellows means worthless men

👑 Michal compares David to the lowest class

💭 This reveals what she values most

📖 Saul's family valued appearances too

## 👑 It Was Before The LORD Which Chose Me Before Thy Father

David answers with a pointed reminder.

God chose him over Michal's own father's entire house.

The dancing was not for show.

It was aimed at God, not at impressing anyone watching.

👑 God chose David over Saul's house

🎯 This is a pointed reminder to Michal

💃 The dancing was aimed at God

📖 Worship was never about impressing people

## 🙌 I Will Yet Be More Vile Than Thus, And Will Be Base In Mine Own Sight

David hears Michal's insult.

He embraces it on purpose.

He says he is willing to look even lower than this.

Status means less to him than honest worship.

That is a direct answer to everything Michal values.

🙌 David embraces the insult on purpose

⬇️ He is willing to look even lower

💃 Honest worship matters more than status

📖 This directly answers what Michal values

## ❤️ Of Them Shall I Be Had In Honour

David expects the common people to honor him for this, not despise him.

That is the opposite of what Michal predicts.

Humility in worship earns real respect from ordinary people.

Status among the proud and honor among the humble rarely line up.

🙌 David expects honor, not scorn

🔄 This is the opposite of Michal's view

❤️ Humility earns respect from ordinary people

📖 Pride and humility measure honor differently

## 👶 Michal The Daughter Of Saul Had No Child Unto The Day Of Her Death

This does not have to mean God struck her for this one moment.

Childlessness carried heavy weight in this culture.

It was often treated as a quiet sorrow.

Many readers connect it to this rift with David.

The text does not fully explain the cause.

👶 Childlessness carried heavy weight then

❓ The text does not explain the cause

💭 Many readers connect it to this rift

📖 Their story ends in quiet distance
`.trim();

export const SECOND_SAMUEL_SIX_PERSONAL_SECTIONS = parseSecondSamuelSixRawNotes(
  SECOND_SAMUEL_SIX_RAW_NOTES,
);
