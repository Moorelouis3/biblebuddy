export type PsalmsOneHundredFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFiveRawNotes(rawText: string): PsalmsOneHundredFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+105:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 105 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+105:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+105:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 105 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 105,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 105:${startVerse}` : `Psalms 105:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Psalms 105 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FIVE_RAW_NOTES = `# Psalms 105:1-4
# 📣 A Call To Praise And Seek God
---
## 🙏 O Give Thanks Unto The LORD

Giving thanks in this psalm is not a private feeling kept inside.

It is a public act done out loud in front of others.

The whole psalm opens by pointing everyone toward God first.

Before anything else is said, gratitude comes first.

🙏 Give thanks means a public act

📢 It happens out loud, not silently

🎯 The psalm opens with God first

📖 Gratitude leads the whole psalm

## 🗣️ Call Upon His Name

To call upon God's name means to pray to him directly.

A name in this culture stood for a person's whole character.

Calling on the name is calling on everything God actually is.

This phrase appears again and again across the Psalms as an invitation to pray.

🗣️ Calling means praying directly to God

🏷️ A name represented a person's character

🙌 Calling on it means trusting who he is

➡️ Prayer starts with calling on him

## 📣 Make Known His Deeds Among The People

This is not private worship alone.

The psalm commands the reader to tell other people what God has done.

Deeds means the real, specific things God accomplished in history.

Faith here was always meant to be spoken out loud to someone else.

📣 Make known means tell other people

🏛️ Deeds means specific historical acts

👥 Faith was meant to be shared

📖 Worship spreads outward, not just inward

## 🎶 Sing Unto Him, Sing Psalms Unto Him

The same command is given twice in a row.

Hebrew poetry often repeats an idea using slightly different words for emphasis.

Singing plain praise and singing a written song set to music are named separately here.

Both point to the same goal, worship through music.

🎶 The command repeats for emphasis

📜 A psalm was a written song

🎵 Both lines point to music

📖 Repetition shows how important praise is

## 💬 Talk Ye Of All His Wondrous Works

Talk here is an everyday, conversational word.

This is not limited to formal worship inside a temple.

God's wondrous works were meant to come up in normal daily conversation.

A sincere believer speaks about God the way anyone speaks about something they love.

💬 Talk means ordinary conversation

🏛️ Not limited to formal worship

🗓️ Meant for everyday conversation

➡️ Love for God shows in daily speech

## 🏆 Glory Ye In His Holy Name

To glory in something means to take pride in it and boast about it.

This psalm commands that pride be aimed at God's name, not personal achievement.

Holy means set apart, completely different from anything ordinary.

Boasting is not wrong here, it is simply redirected toward the right object.

🏆 Glory means to boast with pride

🎯 Pride is aimed at God, not self

✨ Holy means set apart and different

📖 Boasting redirected becomes true worship

## 🔍 Let The Heart Of Them Rejoice That Seek The LORD

Seeking the LORD is described here as a deliberate, ongoing pursuit.

Real joy is tied to that pursuit, not to comfortable circumstances.

The heart, the center of a person's whole inner life, is where this joy lives.

Anyone who genuinely seeks God is promised real gladness.

🔍 Seeking means deliberate pursuit

❤️ Heart means the whole inner life

😊 Joy is tied to seeking, not comfort

➡️ Real pursuit brings real gladness

## 👀 Seek His Face Evermore

His face is a way of describing God's presence and attention.

Evermore means this seeking never has a finish line.

There is no point where a person has sought God enough and can stop.

The relationship this psalm describes is meant to last a lifetime.

👀 Face means God's presence

⏳ Evermore means no finish line

🚫 Seeking never reaches a stopping point

📖 The relationship is meant to last a lifetime

# Psalms 105:5-8
# 📜 Remembering His Covenant
---
## ✨ Remember His Marvellous Works That He Hath Done

Marvellous describes something so extraordinary it could only come from God.

Remembering here is not a passive feeling.

It is a deliberate choice to recall what actually happened in history.

A nation that forgets what God has done quickly stops trusting him.

✨ Marvellous means extraordinary, from God alone

🧠 Remembering is a deliberate choice

📚 It recalls real historical events

📖 Forgetting leads to lost trust

## ⚖️ The Judgments Of His Mouth

Judgments here means God's spoken decisions and rulings.

His mouth is pictured as the source of real authority.

What God says out loud actually shapes what happens in history.

This is not empty talk, every word carries weight.

⚖️ Judgments means his spoken decisions

👄 His mouth carries real authority

🌍 His words shape history itself

➡️ God's speech is never empty talk

## 🌱 O Ye Seed Of Abraham His Servant

Seed is an old word for offspring or descendants.

Abraham is called God's servant here, a title of honor, not lower status.

Every reader of this psalm is being addressed as part of that family line.

The whole psalm is written to people who already belong to this story.

🌱 Seed means descendants or offspring

🏅 Servant here is a title of honor

👪 Readers belong to Abraham's family line

📖 This story already includes the reader

## 🔄 Ye Children Of Jacob His Chosen

Jacob was later renamed Israel after wrestling with God.

Children of Jacob simply means the whole nation descended from him.

Chosen means selected by God for a specific purpose, not earned by merit.

The nation's identity rests entirely on being picked, not on being deserving.

🔄 Jacob was later renamed Israel

👪 Children of Jacob means the whole nation

🎯 Chosen means selected, not earned

📖 Identity rests on being picked by God

## 🙋 He Is The LORD Our God

This is a flat statement of loyalty and belonging.

Israel had one God, unlike the surrounding nations with many gods.

Saying our God was a claim of relationship, not just a fact.

The whole rest of the psalm builds on this one short sentence.

🙋 A flat statement of loyalty

🌍 Unlike nations who worshiped many gods

🤝 Our God claims a real relationship

📖 Everything else builds on this claim

## 🌏 His Judgments Are In All The Earth

God's authority is not limited to Israel alone.

Every nation on earth, even ones that never heard of him, still answers to him.

This widens the scope of the whole psalm beyond one family.

The God who chose Israel also rules the whole world.

🌏 God's rule is not limited to Israel

👥 Every nation answers to him

🔭 This widens the psalm's scope

📖 The God of Israel rules the world

## 🤝 He Hath Remembered His Covenant For Ever

A covenant is a binding promise, sealed and meant to last.

For ever means this promise was never given an expiration date.

God's memory is not like human memory, he never simply forgets a promise.

This line sets up everything the rest of the psalm will retell.

🤝 Covenant means a binding promise

⏳ For ever means no expiration date

🧠 God's memory never forgets a promise

📖 This sets up the rest of the psalm

## 🔢 The Word Which He Commanded To A Thousand Generations

A thousand generations is not meant as an exact number.

It is a way of saying this promise will last farther than anyone can count.

The specific families named in this psalm are only the beginning of it.

A promise this large was never meant to end with one family.

🔢 A thousand generations is not literal

📏 It means farther than anyone can count

👪 Named families are only the beginning

➡️ A promise this large was never small

# Psalms 105:9-12
# 🌍 The Covenant With Abraham, Isaac, And Jacob
---
## 📜 Which Covenant He Made With Abraham

This points back to Genesis, when God first promised Abraham land, descendants, and blessing.

The covenant did not start with Israel as a nation.

It started with one man and one promise, long before Israel even existed.

Everything in this psalm traces back to that single starting point.

📜 Points back to Genesis and Abraham

👤 Started with one man, not a nation

🌱 Promised land, descendants, and blessing

📖 Everything traces back to this start

## 🤝 His Oath Unto Isaac

An oath is a promise sealed with God's own word as the guarantee.

This same promise made to Abraham was passed directly to his son Isaac.

Isaac did not have to earn a separate promise of his own.

The covenant moved forward through the family line, generation by generation.

🤝 An oath is a sealed promise

🔗 Passed directly from Abraham to Isaac

🚫 Isaac did not earn a new one

📖 The covenant moves through the family line

## 🔁 Confirmed The Same Unto Jacob For A Law

Confirmed means the promise was formally reaffirmed, not weakened or changed.

Jacob received the exact same covenant already given to his father and grandfather.

Calling it a law here means it was fixed and binding, not a loose suggestion.

Three generations now carried the same unchanged promise.

🔁 Confirmed means formally reaffirmed

👴 Same promise as his father and grandfather

📏 Law means fixed and binding

📖 Three generations, one unchanged promise

## 🔄 To Israel For An Everlasting Covenant

Israel is Jacob's new name after his encounter with God in Genesis thirty two.

Using that name here signals the shift from one family to a whole nation.

Everlasting means the promise still has not been retired.

This same covenant is the reason the psalm still calls the reader to remember it.

🔄 Israel was Jacob's new name

👪 Marks the shift to a whole nation

⏳ Everlasting means it is still active

📖 This is why the psalm remembers it

## 🎁 The Land Of Canaan, The Lot Of Your Inheritance

Lot here means an allotted portion, something given, not something earned.

Canaan was promised as the specific inheritance for this family.

An inheritance normally passes from a parent, and here it comes from God directly.

The land itself becomes proof that the promise was real.

🎁 Lot means a given portion

🗺️ Canaan was the promised inheritance

👨‍👧 God, not a parent, gives it here

📖 The land itself proves the promise

## 👨‍👩‍👧 When They Were But A Few Men In Number

At this point the promise was made to a tiny family, not yet a nation.

Very few and strangers both describe complete vulnerability.

They had no army, no land of their own, and no political power.

The promise was given long before there was any visible reason to believe it.

👨‍👩‍👧 A tiny family, not yet a nation

🚫 No army or land of their own

😟 Complete vulnerability at the time

➡️ The promise came before proof of it

## 🚶 Strangers In It

Strangers means they lived in Canaan as outsiders, not owners.

Abraham, Isaac, and Jacob all died before the land was ever legally theirs.

The gap between the promise and its fulfillment lasted many generations.

Faith here meant trusting a promise nobody in that family would live to see completed.

🚶 Strangers means outsiders, not owners

⏳ The promise outlived three generations

😌 Faith trusted what they never saw

📖 Trust does not require seeing the ending

# Psalms 105:13-15
# 👑 Protected Among The Nations
---
## 🧭 When They Went From One Nation To Another

Abraham, Isaac, and Jacob all moved repeatedly between Canaan, Egypt, and Gerar.

None of them ever settled permanently in one place during their lifetimes.

This constant movement made them vulnerable to whichever ruler controlled the land they entered.

God's protection had to follow them everywhere they went.

🧭 They moved between several lands

🏕️ None of them settled permanently

⚠️ Constant movement meant real vulnerability

📖 God's protection traveled with them

## ⚠️ He Suffered No Man To Do Them Wrong

This line covers real, specific danger the family actually faced.

In Genesis twelve, Pharaoh nearly took Sarah into his own household by mistake.

In Genesis twenty, Abimelech came close to the exact same mistake with Sarah again.

Both times, God stepped in before real harm was done.

⚠️ Real danger, not just a general idea

👑 Pharaoh almost took Sarah in Genesis twelve

🏰 Abimelech nearly repeated it in Genesis twenty

📖 God intervened before harm occurred

## 🗣️ He Reproved Kings For Their Sakes

Reproved means God directly corrected and warned these rulers.

Pharaoh and Abimelech were both powerful kings, far stronger than one wandering family.

Yet God held them personally accountable anyway.

Power did not make either king untouchable to God.

🗣️ Reproved means directly corrected

👑 Both kings were far more powerful

⚖️ God still held them accountable

📖 Power never made them untouchable

## 🛡️ Touch Not Mine Anointed

Anointed usually describes someone set apart for a special role, like a king or priest.

Here it is used for the patriarchs themselves, long before Israel ever had a king.

The title shows how seriously God treated this one family's safety.

Being chosen by God came with real protection attached to it.

🛡️ Anointed means specially set apart

👑 Usually used for kings or priests

👴 Applied here to the patriarchs

📖 Being chosen came with real protection

## 📜 Do My Prophets No Harm

A prophet is someone who receives and speaks messages directly from God.

In Genesis twenty, God specifically calls Abraham a prophet in a warning to Abimelech.

This shows the patriarchs were not just ordinary wandering herdsmen.

They carried a level of spiritual authority the surrounding kings had to respect.

📜 A prophet speaks messages from God

📖 Genesis twenty calls Abraham a prophet

🚫 Not simply ordinary wandering herdsmen

➡️ Their authority demanded real respect

# Psalms 105:16-19
# 🌾 Famine And Joseph Sold Into Egypt
---
## 🌾 He Called For A Famine Upon The Land

This famine was not a random natural disaster.

The psalm states plainly that God himself called for it.

The same famine that threatened to destroy Jacob's family became the reason they eventually moved to Egypt.

Even a disaster served a larger plan already in motion.

🌾 The famine was not random

📢 God himself called for it

🚶 It eventually pushed the family to Egypt

📖 Even disaster served a larger plan

## 🦯 He Brake The Whole Staff Of Bread

Staff of bread is an old idiom, not a literal object.

A staff supports a person's weight while walking.

Calling bread a staff pictures it as the thing that holds daily life up.

Breaking that staff means the entire food supply collapsed at once.

🦯 Staff of bread is an idiom

🚶 A staff normally supports weight

🍞 Bread supported daily survival

📖 Breaking it meant total food collapse

## 🚶 He Sent A Man Before Them, Even Joseph

Before them means Joseph arrived in Egypt years ahead of the rest of his family.

His early, painful journey there was not random timing.

That early arrival later let him save the very family that once rejected him.

Genesis thirty seven already tells the full story behind this one line.

🚶 Before them means he arrived first

😢 His journey there was painful

🛡️ It later let him save them

📖 Genesis thirty seven tells the full story

## 😔 Who Was Sold For A Servant

This line quietly summarizes one of the darkest moments in Genesis.

Joseph's own brothers sold him into slavery out of jealousy.

A servant in this context meant a person bought and owned as property.

Betrayal by family became the unlikely starting point of the whole rescue.

😔 A dark moment from Genesis

👪 His own brothers sold him

⛓️ Servant means owned as property

📖 Betrayal became the start of rescue

## ⛓️ Whose Feet They Hurt With Fetters

Fetters means shackles used to restrain a prisoner's feet.

Joseph was not simply enslaved, he was later imprisoned in Egypt on a false accusation.

This detail makes the suffering concrete and physical, not just emotional.

The one meant to save his family first had to endure real chains.

⛓️ Fetters means shackles on the feet

😣 Suffering here was physical, not emotional

🏛️ He was imprisoned on a false charge

📖 The rescuer endured real chains first

## 🔁 He Was Laid In Iron

Iron here refers to the metal chains used to hold a prisoner.

This repeats and strengthens the previous line about fetters.

Ancient Hebrew poetry often restates an idea a second way for emphasis.

The repetition makes sure the reader does not skip past how severe this was.

🔁 Iron means the chains themselves

📜 Repeats the fetters line for emphasis

🎭 A common pattern in Hebrew poetry

📖 The repetition stresses real severity

## 🔥 The Word Of The LORD Tried Him

Tried means tested or refined, similar to how fire purifies metal.

Joseph had already received dreams about his family one day bowing to him.

Years in prison seemed to completely contradict those early dreams.

Only time proved that the word from God was true all along.

🔥 Tried means tested like refined metal

💭 His early dreams seemed contradicted

⏳ Years passed before it proved true

📖 Testing came before fulfillment

# Psalms 105:20-22
# 🏛️ Joseph Freed And Exalted
---
## 🔓 The King Sent And Loosed Him

Loosed means set free from prison or bondage.

Pharaoh himself gave the order, not a lower official.

This happened after Joseph correctly interpreted Pharaoh's troubling dreams.

A prisoner with no rights was suddenly freed by the highest authority in Egypt.

🔓 Loosed means set free

👑 Pharaoh personally gave the order

💭 Followed Joseph interpreting his dreams

📖 The highest authority freed him

## 🏠 He Made Him Lord Of His House

This means Joseph was placed in charge of Pharaoh's own household affairs.

Such a position required complete trust from the king.

A former prisoner and foreigner was handed authority over the king's own home.

This reversal happened within a single day, according to Genesis forty one.

🏠 Lord of his house means household authority

🤝 Required Pharaoh's complete trust

😲 A prisoner suddenly given real power

📖 The reversal happened in a single day

## 💰 Ruler Of All His Substance

Substance means wealth, property, and possessions.

Joseph's authority extended beyond the household into all of Pharaoh's holdings.

This included the resources Egypt would soon need to survive the coming famine.

God placed Joseph in exactly the position needed before the crisis even began.

💰 Substance means wealth and possessions

🏛️ Authority extended over all of Egypt's holdings

🌾 In place before the famine even started

📖 God's timing prepared the solution early

## 👥 To Bind His Princes At His Pleasure

Princes here means Egypt's high officials and nobles.

Bind means Joseph could command or restrain them as needed.

At his pleasure means this authority was not limited by anyone else's approval.

A foreign slave now outranked Egypt's own ruling class.

👥 Princes means Egypt's high officials

🔗 Bind means command or restrain them

✅ Not limited by anyone else's approval

📖 A foreign slave outranked the ruling class

## 🎓 Teach His Senators Wisdom

Senators means Egypt's elders and experienced advisors.

Normally these were the very people who would teach a young foreigner, not the reverse.

Joseph's wisdom for surviving the famine came directly from God, not from Egyptian training.

Even the most experienced leaders in Egypt needed what Joseph brought.

🎓 Senators means Egypt's elders and advisors

🔄 Normally roles ran the other direction

🙏 Joseph's wisdom came from God

📖 Experienced leaders still needed his wisdom

# Psalms 105:23-27
# ⛓️ Israel In Egypt And The Call Of Moses
---
## 🚶 Israel Also Came Into Egypt

This marks the whole family's move from Canaan down into Egypt.

Genesis forty six describes seventy people traveling together for this move.

What began as one man's rescue plan became an entire family's relocation.

This single verse compresses years of story into one short line.

🚶 The whole family moved to Egypt

🔢 Genesis forty six counts seventy people

🛡️ One man's plan became the family's rescue

📖 Years of story compressed into one line

## 🏕️ Jacob Sojourned In The Land Of Ham

Sojourned means living somewhere temporarily, as an outsider rather than a citizen.

Ham was one of Noah's sons, and Egypt was later named after his descendants.

Calling Egypt the land of Ham is simply a poetic way of naming the country.

Jacob's family never fully belonged there, even while living there for generations.

🏕️ Sojourned means living as a temporary outsider

👴 Ham was one of Noah's sons

🗺️ A poetic way of naming Egypt

📖 They never fully belonged there

## 📈 He Increased His People Greatly

This directly fulfills the promise made generations earlier to Abraham.

Exodus chapter one describes the Israelites multiplying rapidly while living in Egypt.

A small, vulnerable family had grown into a genuine population.

A promise made to one man was now visibly coming true.

📈 Fulfills Abraham's earlier promise

📚 Exodus one describes rapid growth

👪 A small family became a real population

➡️ A promise was visibly coming true

## 😨 Made Them Stronger Than Their Enemies

Rapid growth turned into a source of real fear for Egypt's rulers.

A minority group that keeps growing can start to look like a threat.

That fear is exactly what drives the events described in the next verse.

Blessing and danger arrived together in this part of the story.

😨 Growth became a source of fear

👑 Egypt's rulers felt threatened

⚠️ Fear drives the next part of the story

📖 Blessing and danger arrived together

## 👑 He Turned Their Heart To Hate His People

Exodus chapter one describes a new king who did not personally know Joseph.

That change in leadership shifted Egypt's whole attitude toward Israel.

God is described here as sovereign even over a hostile ruler's changing heart.

Nothing that happens next catches God by surprise.

👑 A new king forgot Joseph's legacy

🔄 Leadership change shifted Egypt's attitude

🕊️ God remains sovereign over hostile hearts

📖 Nothing here surprises God

## 🎭 To Deal Subtilly With His Servants

Subtilly is an old word meaning deceitfully or craftily.

Exodus chapter one describes Pharaoh secretly ordering Hebrew midwives to kill baby boys.

This was not open, honest conflict, it was a hidden plot against a whole people.

Real oppression often hides behind quiet, official sounding orders.

🎭 Subtilly means deceitfully or craftily

👶 Pharaoh secretly targeted Hebrew infants

🤫 A hidden plot, not open conflict

📖 Oppression often hides behind quiet orders

## 🧑 He Sent Moses His Servant

Moses is introduced here as God's chosen deliverer for this crisis.

From the basket in the Nile to fleeing to Midian, his whole life led to this moment.

The word servant places Moses in the same category of honor already used for Abraham.

God had been preparing this rescue long before Israel even knew it was coming.

🧑 Moses introduced as the chosen deliverer

🌊 His whole earlier life prepared him

🏅 Servant is a title of honor

📖 The rescue was prepared in advance

## 👴 Aaron Whom He Had Chosen

Aaron was Moses' older brother, later appointed as Israel's first high priest.

Exodus chapter four describes Aaron being chosen specifically to speak for Moses.

Neither brother carried out this mission entirely alone.

God paired leadership together instead of placing the whole burden on one man.

👴 Aaron was Moses' older brother

🎙️ Chosen to speak for Moses

🤝 Neither brother worked entirely alone

📖 God paired leadership rather than isolating it

## 📜 They Shewed His Signs Among Them, And Wonders In The Land Of Ham

Shewed is an old spelling of showed.

Signs and wonders both describe the plagues about to be listed in the next section.

These were not random disasters, they were deliberate proof of God's power to Egypt.

The next several verses will name each one directly.

📜 Shewed is an old spelling of showed

⚡ Signs and wonders point to the plagues

🎯 These were deliberate proof, not accidents

📖 The next verses name each one

# Psalms 105:28-32
# ⚡ The Ten Plagues Begin
---
## 🌑 He Sent Darkness, And Made It Dark

This psalm lists the plagues out of their original order in Exodus.

Darkness was actually the ninth plague, not the first.

Poetry often reorders events for rhythm and impact rather than strict timeline.

Starting with darkness sets a heavy, ominous tone for the whole list.

🌑 Darkness was actually the ninth plague

📜 Poetry does not always follow strict order

🎭 Reordering creates rhythm and impact

📖 It sets a heavy tone for the list

## ✅ They Rebelled Not Against His Word

They here refers to the plagues themselves, obeying God's command exactly.

Darkness came and stayed exactly as long as God intended, nothing more.

This is a quiet contrast building through the whole passage.

Nature obeyed instantly while Pharaoh's heart kept refusing to obey.

🌑 They refers to the plagues themselves

✅ Nature obeyed God's command exactly

⚔️ A contrast with Pharaoh's refusal

📖 Creation obeys where people resist

## 🌊 He Turned Their Waters Into Blood

This was the first plague, striking the Nile River directly.

Egyptians worshiped the Nile as a source of life and even treated it as a god.

Turning it to blood struck directly at that false worship.

The very river Egypt depended on became undrinkable overnight.

🌊 The first plague struck the Nile

🛐 Egyptians worshiped the Nile as a god

💔 The plague struck that false worship

📖 Their water source became undrinkable

## 🐟 Slew Their Fish

Blood in the river meant every fish inside it died.

Fish were a major food source for ordinary Egyptians, not just a symbolic detail.

This turned a religious insult into an immediate, practical crisis.

Judgment on false worship also became judgment on daily survival.

🐟 Blood killed all the river's fish

🍽️ Fish were a major food source

⚠️ A religious insult became a real crisis

📖 Judgment reached daily survival, not just belief

## 🐸 Frogs In Abundance, In The Chambers Of Their Kings

This second plague did not stay outside in the river or fields.

Frogs invaded even the private rooms inside Pharaoh's own palace.

No place in Egypt, not even the king's private chambers, stayed untouched.

The plague made a public statement, nothing in Egypt was outside God's reach.

🐸 The second plague was frogs

🏰 They reached Pharaoh's private chambers

🚫 No place in Egypt stayed untouched

📖 Nothing was outside God's reach

## 🪰 Divers Sorts Of Flies, And Lice In All Their Coasts

Divers sorts is an old way of saying various different kinds.

This single line actually compresses two separate plagues, flies and lice, into one verse.

Coasts here means the borders or territory of the whole land.

The infestation covered the entire country, not just isolated areas.

🪰 Divers sorts means various kinds

🔢 Two separate plagues compressed here

🗺️ Coasts means the whole territory

📖 The infestation covered the entire land

## 🧊 He Gave Them Hail For Rain, And Flaming Fire

Exodus describes this seventh plague as fire mixed together with hail.

That combination should be physically impossible under normal weather.

Egyptians would have recognized this as something beyond any natural storm.

An unnatural weather event was itself a sign pointing back to God.

🧊 The seventh plague combined hail and fire

🔥 A combination normally impossible in nature

🌩️ Recognized as beyond a natural storm

📖 The impossible weather pointed back to God

# Psalms 105:33-36
# 🌾 The Plagues Reach The Land Itself
---
## 🍇 Smote Their Vines Also And Their Fig Trees

Vines produced grapes for wine, an important part of the ancient diet.

Fig trees were another key food source across the region.

The hail plague did not just frighten people, it destroyed real crops.

An economy built on agriculture was struck at its foundation.

🍇 Vines produced grapes for wine

🌳 Fig trees were a key food source

💥 Real crops were destroyed, not just scared

📖 The economy was struck at its root

## 🦗 The Locusts Came, And Caterpillers, And That Without Number

This eighth plague followed right after the hail had already damaged the crops.

Locusts and caterpillars together describe a swarm too large to count.

Whatever survived the hailstorm was now finished off completely.

Total devastation from two plagues in a row left Egypt with almost nothing.

🦗 The eighth plague was locusts

🔢 Without number means an uncountable swarm

🌾 It finished what hail had started

📖 Two plagues in a row left almost nothing

## 🌱 Devoured The Fruit Of Their Ground

This line summarizes the total scope of the locust plague.

Nothing green or growing was left standing across the land.

An entire nation's food supply for the coming year was wiped out.

The devastation reached every household, not just the wealthy or the poor alone.

🌱 Nothing green was left standing

📅 The coming year's food supply was wiped out

🏘️ It reached every household equally

📖 Devastation touched the whole nation

## 💀 Smote Also All The Firstborn In Their Land

This tenth and final plague was the most severe of them all.

Every Egyptian household lost its firstborn son in a single night.

Exodus describes this as the plague that finally broke Pharaoh's resistance.

Nine warnings had already come and gone before this last one arrived.

💀 The tenth plague was the most severe

🌙 It happened in a single night

🛑 It finally broke Pharaoh's resistance

📖 Nine warnings came before the last one

## 👨‍👦 The Chief Of All Their Strength

In this culture, the firstborn son carried the family's future, name, and inheritance.

Losing him meant losing the family's whole sense of continued strength.

Chief of their strength pictures the firstborn as the anchor of a household's future.

Striking the firstborn was striking every Egyptian family's hope for what came next.

👨‍👦 The firstborn carried the family's future

🏛️ He held the name and inheritance

⚓ Chief of strength means the family's anchor

📖 The plague struck every family's hope

# Psalms 105:37-41
# 🌙 The Exodus Journey
---
## 🎁 He Brought Them Forth Also With Silver And Gold

Genesis fifteen had already promised centuries earlier that Israel would leave Egypt with great wealth.

Exodus twelve describes the Egyptians willingly giving silver, gold, and clothing before Israel departed.

This was not theft, it was the exact fulfillment of an old promise.

A nation once enslaved left as a nation carrying real wealth.

📜 Genesis fifteen promised this centuries earlier

🎁 Egyptians willingly gave silver and gold

🚫 This was not theft

📖 An old promise was exactly fulfilled

## 💪 Not One Feeble Person Among Their Tribes

Feeble means physically weak or unable to keep up.

An entire nation traveling together through the wilderness would normally include the weak and exhausted.

This verse claims not a single person among them was too weak for the journey.

God's provision covered the whole nation's physical strength, not just their food and water.

💪 Feeble means physically weak

👥 An entire nation traveled together

😲 Not one person was too weak

📖 God's provision covered physical strength itself

## 🔄 Egypt Was Glad When They Departed

This is a striking reversal from Pharaoh's earlier refusal to let Israel go at all.

After ten plagues, relief finally outweighed Pharaoh's stubborn pride.

Egypt's gladness here is really a confession of how much they had suffered.

The nation that once enslaved Israel now wanted them gone as fast as possible.

🔄 A reversal from earlier refusal

😌 Relief finally outweighed stubborn pride

😣 Their gladness confessed real suffering

📖 They wanted Israel gone quickly

## 😨 The Fear Of Them Fell Upon Them

Fear of them describes the terror the plagues had left behind in Egypt.

Egyptians were not just relieved, they were genuinely afraid of what might come next.

This fear explains why Egypt gave away wealth so willingly in the previous line.

Ten plagues had completely broken Egypt's earlier confidence.

😨 Fear of them means real terror

⚠️ Egyptians feared what might come next

🎁 This fear explains their generosity

📖 Ten plagues broke Egypt's confidence

## ☁️ He Spread A Cloud For A Covering

This cloud, described fully in Exodus thirteen, followed Israel through the wilderness by day.

It provided real shade and protection from the harsh desert sun.

A traveling nation with no buildings or shelter still stayed covered.

God's presence itself became the nation's protection from the elements.

☁️ The cloud followed them by day

☀️ It shielded them from harsh desert sun

🏕️ No buildings, yet they stayed covered

📖 God's presence was their shelter

## 🔥 Fire To Give Light In The Night

At night, the same guiding presence appeared as a pillar of fire instead of cloud.

This gave the traveling nation light to see by, even far from any city.

It also served as visible proof that God had not left them once darkness fell.

Guidance did not pause just because the sun went down.

🔥 A pillar of fire appeared at night

🌌 It provided light far from any city

👀 Proof God had not left them

📖 Guidance continued after sunset

## 🍗 The People Asked, And He Brought Quails

Exodus sixteen describes the people complaining about a lack of meat in the wilderness.

God responded by sending large numbers of quail into the camp.

This detail shows God meeting a specific, practical complaint, not just a spiritual one.

Even ordinary hunger was something God chose to answer.

🍗 Quail answered a real complaint about meat

📚 Exodus sixteen tells the full story

🙏 God met a practical need directly

➡️ Even ordinary hunger mattered to God

## 🍞 Satisfied Them With The Bread Of Heaven

Bread of heaven refers to manna, a substance that appeared on the ground each morning.

The people had never seen anything like it before, and had to be told what it was.

This provision arrived daily for the entire wilderness journey, not just once.

It became one of the clearest, most repeated pictures of God's provision in the whole Bible.

🍞 Bread of heaven means manna

🌅 It appeared fresh on the ground each morning

📅 Provided daily for the whole journey

📖 One of the Bible's clearest pictures of provision

## 🪨 He Opened The Rock, And The Waters Gushed Out

This recalls two separate moments in Exodus and Numbers when water came from solid rock.

There was no natural water source anywhere nearby in the desert terrain described.

Striking or speaking to a rock and having water pour out defies any natural explanation.

Physical thirst in the wilderness was met by a genuine miracle each time.

🪨 Water came from solid rock twice

🏜️ No natural water source was nearby

⚡ This defies any natural explanation

📖 Real thirst was met by real miracle

## 💧 Ran In The Dry Places Like A River

This water was not a small trickle barely enough to survive on.

Ran like a river describes genuine abundance flowing through dry, barren ground.

A nation in the desert received more than the bare minimum to get by.

God's provision throughout the wilderness journey was generous, not just adequate.

💧 Not a small trickle, real abundance

🏜️ Flowed through dry, barren ground

📈 More than the bare minimum

📖 God's provision was generous, not just enough

# Psalms 105:42-45
# 🕊️ The Promise Fulfilled
---
## 🔄 For He Remembered His Holy Promise

This line circles back directly to the covenant already described earlier in the psalm.

Every plague, every provision, and every step of the journey served this one purpose.

Holy here means the promise itself was set apart, not an ordinary bargain.

Nothing in this whole long story happened by accident.

🔄 Circles back to the earlier covenant

🎯 Everything served this one purpose

✨ Holy means set apart, not ordinary

📖 None of this happened by accident

## 🔁 And Abraham His Servant

The psalm ends its long historical review the same way it began, with Abraham.

Generations after his death, his promise was still the reason for everything happening.

Servant repeats the same title of honor already used for Abraham back in verse six.

One man's faith outlived him by hundreds of years.

🔁 The psalm returns to Abraham again

⏳ His promise outlived him by generations

🏅 Servant repeats his earlier title of honor

📖 One man's faith outlived his lifetime

## 😊 He Brought Forth His People With Joy

The whole exodus story is framed here as a joyful event, not merely a rescue from danger.

Freedom by itself is only part of the story this psalm wants told.

Joy describes the emotional weight of watching a centuries old promise finally come true.

The ending was not just survival, it was genuine celebration.

😊 Framed as joyful, not just a rescue

🕊️ Freedom alone is not the whole story

🎉 Joy fits watching a promise finally happen

📖 The ending was celebration, not just survival

## 🌍 Gave Them The Lands Of The Heathen

Heathen here refers to the nations already living in Canaan who did not worship the true God.

This points ahead to the conquest of Canaan described in the book of Joshua.

The land promised generations earlier in this same psalm was finally, physically received.

A promise spoken to one small family became land held by an entire nation.

🌍 Heathen means nations without the true God

📖 Points ahead to the book of Joshua

🗺️ The old promise was finally received

➡️ One family's promise became a nation's land

## 🏘️ They Inherited The Labour Of The People

This means Israel received existing cities, vineyards, and wells they had never personally built.

Deuteronomy describes this exact kind of inheritance in more detail later.

The generation entering Canaan benefited directly from work they never did themselves.

Not every blessing in this story had to be earned firsthand.

🏘️ They received cities they never built

🍇 Vineyards and wells came already established

📜 Deuteronomy describes this same kind of gift

📖 Not every blessing has to be earned firsthand

## 🎯 That They Might Observe His Statutes, And Keep His Laws

This line reveals the real purpose behind the entire story just told.

Rescue, provision, and land were never meant to be the final goal by themselves.

Obedience to God was always the actual point of everything that happened.

A blessed life was meant to lead toward a faithful life.

🎯 Reveals the real purpose of the story

🚫 Blessing was never the final goal

🙏 Obedience was the actual point

📖 Blessing should lead to a faithful life

## 🙌 Praise Ye The LORD

This closing phrase is the Hebrew word Hallelujah in English translation.

It matches the very first line of the psalm, which also called for praise.

The whole psalm forms a complete circle, opening and closing on the same note.

After tracing centuries of history, there is only one fitting response left, praise.

🙌 Hallelujah is Hebrew for praise the LORD

🔄 It matches the psalm's opening line

🔵 The psalm forms a complete circle

📖 History this large deserves this response
`.trim();

export const PSALMS_ONE_HUNDRED_FIVE_PERSONAL_SECTIONS = parsePsalmsOneHundredFiveRawNotes(PSALMS_ONE_HUNDRED_FIVE_RAW_NOTES);
