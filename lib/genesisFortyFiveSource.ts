export type GenesisFortyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyFiveRawNotes(rawText: string): GenesisFortyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+45:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 45 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+45:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+45:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 45 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 45,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 45:${startVerse}` : `Genesis 45:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Genesis 45 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_FIVE_RAW_NOTES = `# Genesis 45:1-3
# 🎭 Joseph Reveals Himself
---
## 😭 Could Not Refrain Himself

To refrain means to hold something back on purpose.

Joseph has already held this same feeling back twice in this story.

Both times he stepped out of the room and wept alone.

Now, in front of everyone, he finally cannot hold it back.

Judah's offer to trade his own freedom for Benjamin's was the proof Joseph needed.

His brothers had truly changed.

😭 Refrain means holding it back

⏳ He held it back twice before

💧 Both times he wept alone

📖 Judah's offer proved real change

## 🚪 Cause Every Man To Go Out From Me

Joseph clears the room before he says another word.

Every Egyptian official and servant has to leave first.

This is about to become a private family moment, not a public scene.

Joseph is about to admit his brothers sold him into slavery.

If Egyptians overheard that, it could bring real shame or danger on the brothers.

Joseph protects his brothers before he even speaks to them.

🚪 Joseph clears the room first

🤫 This becomes a private family moment

🛡️ He protects his brothers from shame

📖 Privacy comes before the reveal

## 📢 He Wept Aloud And The Egyptians And The House Of Pharaoh Heard

Joseph's crying is not quiet.

Even with the room cleared, the sound carries straight through the walls.

It reaches the Egyptian officials outside and even reaches Pharaoh's own household.

This is not composed, controlled crying.

It is more than twenty years of grief, fear, and hope breaking open at once.

📢 His weeping is heard outside the room

🏰 It reaches all the way to Pharaoh's house

💔 Decades of hidden emotion surface at once

➡️ Nothing about this reunion stays quiet

## 🎭 I Am Joseph

Joseph says his own name for the first time in over twenty years.

He has worn an Egyptian name and an Egyptian mask this whole time.

Many scholars believe his Egyptian name may have meant something like revealer of secrets.

After every disguise and every harsh test, this is the moment the mask finally comes off.

Two words end more than twenty years of hidden identity.

🎭 Joseph reveals his true identity

🎪 He dropped the Egyptian mask he wore

📜 His Egyptian name may mean revealer of secrets

➡️ Twenty years of hiding end in two words

## ❓ Doth My Father Yet Live

Joseph's very next question is about Jacob.

Not the silver, not the accusations, not the years of testing.

Just one question, is his father still alive.

This reveals exactly what has been sitting on Joseph's heart the whole time.

Not revenge. His father.

❓ His first question is about Jacob

🚫 Not about revenge or the past

💛 This reveals what weighed on him

📖 His father mattered more than anything

## 😳 They Were Troubled At His Presence

Troubled here means far more than a little uncomfortable.

It means shaken to the core, even afraid.

The man who has held their lives in his hands this whole time turns out to be their own brother.

He accused them, tested them, and could have destroyed them at any point.

Twenty years after selling him, the brothers stand silent in front of the brother they betrayed.

😳 Troubled means deeply shaken or afraid

⚡ Their judge turns out to be family

🔍 He held every test in his hands

📖 Silence meets the brother they betrayed
# Genesis 45:4-8
# 🙏 Joseph Explains God's Plan
---
## 🤝 Come Near To Me, I Pray You

Joseph does not wait for his stunned brothers to move first.

Fear had frozen his brothers where they stood.

He closes the distance himself instead of letting the silence stretch on.

This small invitation softens the shock of what he just said.

🤝 Joseph invites them closer himself

👣 He closes the distance first

😶 This softens a shocking moment

➡️ Joseph leads the reconciliation

## 💔 I Am Joseph Your Brother, Whom Ye Sold Into Egypt

Joseph says the hardest part himself instead of making his brothers say it.

He names exactly what happened, whom ye sold into Egypt.

He does not dance around it or soften the truth.

Naming the wrong plainly is what makes the forgiveness that follows mean something.

💔 Joseph names the wrong directly

🗣️ He says it before they do

🚫 No dancing around the truth

➡️ Honesty makes the forgiveness real

## 🕊️ Be Not Grieved, Nor Angry With Yourselves

Grieved here means weighed down by guilt, not simple sadness.

Joseph's first instruction to his brothers is to let go of that guilt.

He is not pretending the sale never happened.

He is releasing them from carrying it for the rest of their lives.

🕊️ Grieved means weighed down by guilt

🙅 Joseph is not excusing what happened

🎁 He releases them from carrying it

📖 Forgiveness does not erase the truth

## 🌾 God Did Send Me Before You To Preserve Life

Joseph reframes his entire story in one sentence.

He does not say you sent me to Egypt.

He says God sent me before you.

This does not erase his brothers' choice to sell him.

It means God worked through that choice for a purpose bigger than they intended.

🌾 Joseph reframes the whole story

🙅 This does not excuse the brothers

🧭 God worked through their choice

📖 A wrong does not cancel God's plan

## 🌱 Neither Be Earing Nor Harvest

Earing is an old word for plowing the ground to plant seed.

Joseph explains there will be no plowing and no harvest anywhere for five more years.

The famine is far from over.

This detail shows exactly how much worse things would get for the family without Joseph.

🌱 Earing means plowing the ground

⏳ Five more years of famine remain

🌍 No harvest anywhere in the region

📖 The family needed Joseph's position now

## 🛟 To Preserve You A Posterity In The Earth

Posterity means future descendants, the generations still to come.

Joseph explains that his years of suffering were not random.

God used his position in Egypt to keep the covenant family alive.

That includes generations of the family not even born yet.

🛟 Posterity means future descendants

🌍 God used Joseph to protect them

👶 This includes generations not yet born

📖 Suffering was not wasted or random

## 🙌 To Save Your Lives By A Great Deliverance

Deliverance means rescue from real danger, not a small favor.

Joseph is not just talking about extra food during a hard season.

Without his position, the whole covenant family could have died in this famine.

This rescue protects the entire promise God made to Abraham.

🙌 Deliverance means real rescue

⚠️ The danger was true starvation

👪 The whole family was at risk

📖 God's promise to Abraham was protected

## 🙏 It Was Not You That Sent Me Hither, But God

Joseph repeats the same point a second time, on purpose.

He wants his brothers to hear it clearly, not just once.

Their sin was real, but it was not the deepest cause of his journey.

God's plan was working underneath their choice the whole time.

🙏 Joseph repeats the point on purpose

✅ He wants it heard clearly

🧵 God's plan ran under their sin

📖 God's plan outlasts human sin

## 👑 He Hath Made Me A Father To Pharaoh

Being called a father to Pharaoh was a real Egyptian title, not a family claim.

It marked Joseph as a top royal advisor, second only to Pharaoh himself.

Joseph explains again that God placed him there, not his own effort or his brothers' actions.

This is the third time in one short speech that Joseph credits God instead of himself.

👑 Father to Pharaoh was a royal title

🥈 It made Joseph second only to Pharaoh

🙏 Joseph credits God a third time

📖 God gets the credit, not Joseph
# Genesis 45:9-11
# 🏃 Joseph's Urgent Instructions
---
## 🏃 Come Down Unto Me, Tarry Not

Tarry is an old word that means delay or wait around.

Joseph wants his father moved to Egypt right away.

This urgency is not about testing anymore.

The famine still has five years left to run, and time matters.

🏃 Tarry means delay or wait

⏳ Five years of famine remain

🚫 This is not another test

📖 Time still works against the family

## 👑 God Hath Made Me Lord Of All Egypt

Joseph wants his father to hear this exact message, word for word.

Lord of all Egypt means Joseph answers to no one but Pharaoh himself.

Joseph knows exactly what will convince his father this is real.

This message is proof, not boasting, aimed at a father who has grieved his son for decades.

👑 Lord of Egypt means top authority

📜 Joseph sends his father exact words

🎯 This is proof, not boasting

📖 Proof matters to a grieving father

## 🌾 Thou Shalt Dwell In The Land Of Goshen

Goshen was a fertile region in the northeast corner of Egypt.

It was well suited for grazing sheep and cattle, the family's whole livelihood.

Goshen also sat apart from the main Egyptian population.

That distance let Jacob's family keep their own customs and way of life.

🌾 Goshen sat in northeast Egypt

🐑 It was ideal for grazing flocks

🏠 The family stayed separate from Egyptians

📖 Distance protected their own identity

## 👨‍👩‍👧‍👦 Thou, And Thy Children, And Thy Children's Children

Joseph is not inviting Jacob alone.

He names three generations by name, children and grandchildren included.

The flocks and herds come too, the family's entire way of making a living.

This is a full household move, not a short visit.

👨‍👩‍👧‍👦 Three generations are named by Joseph

🐑 Flocks and herds move too

📦 This is a full household move

📖 Joseph provides for the whole family

## 🤲 There Will I Nourish Thee

Nourish means to feed and provide for someone over time, not just once.

Joseph promises to personally support his father through the years of famine left.

This is the same brother who was once sold for silver.

Now he is the one offering full provision in return.

🤲 Nourish means ongoing provision

👨‍👦 Joseph personally commits to his father

🔄 The sold brother now provides

📖 Grace replaces what betrayal took

## ⚠️ Lest Thou, And Thy Household, And All That Thou Hast, Come To Poverty

Joseph names the real danger plainly, poverty.

Five more years without a harvest could wipe out everything the family owns.

This is not a kind gesture Joseph could skip.

Without Egypt, Jacob's whole household could lose everything it has.

⚠️ Poverty was the real danger

📉 Five more years without harvest

🏚️ The family could lose everything

📖 Joseph's offer was truly necessary
# Genesis 45:12-15
# 🤗 Joseph Embraces His Brothers
---
## 👀 Your Eyes See, And The Eyes Of My Brother Benjamin

Joseph points out that his brothers can see him with their own eyes.

He names Benjamin specifically, his only full brother, sharing the same mother.

This is not a trick or an actor wearing Joseph's clothes.

The proof is standing right in front of them.

👀 Joseph asks them to trust their eyes

👬 Benjamin is named specifically here

🚫 This is not a trick

📖 The proof stands in front of them

## 🗣️ It Is My Mouth That Speaketh Unto You

Back in Genesis forty two, Joseph spoke to his brothers through an interpreter.

Now he speaks to them directly, in their own language, with no one standing between them.

This detail would have struck his brothers immediately.

His own voice is part of the proof he offers.

🗣️ Joseph once used an interpreter

🎯 Now he speaks directly to them

🔓 No one stands between them now

📖 His own voice becomes proof

## 📣 Ye Shall Tell My Father Of All My Glory In Egypt

Joseph wants Jacob to hear more than just that his son is alive.

He wants Jacob to hear exactly how well things have gone for him.

This is not pride talking.

It is reassurance for a father who has grieved his son as dead for over twenty years.

📣 Joseph wants Jacob truly reassured

🙅 This is not pride or boasting

💛 Jacob has grieved for twenty years

📖 Comfort was the real goal

## 🏃 Ye Shall Haste And Bring Down My Father Hither

Joseph repeats the same urgency from earlier in this chapter.

He does not want a slow, careful trip.

He wants his father in Egypt as fast as possible.

Every day still matters with five years of famine left.

🏃 Joseph repeats his earlier urgency

⏱️ He wants no delay this time

👴 His father's safety is the goal

📖 Every day still counted

## 😭 He Fell Upon His Brother Benjamin's Neck, And Wept

Joseph embraces Benjamin first, before any of the other brothers.

Benjamin is Joseph's only full brother, both sons of Rachel.

Every test since Genesis forty two was really aimed at keeping Benjamin safe.

This reunion is what all of it was building toward.

😭 Benjamin is embraced first

👬 Both are Rachel's only sons

🎯 Every earlier test aimed at this

📖 The whole plan led to this

## 💧 Benjamin Wept Upon His Neck

This time the weeping goes both directions.

Benjamin was too young to remember losing Joseph the way the other brothers do.

He still feels the full weight of this moment.

Grief and relief blur together in this embrace.

💧 The weeping goes both directions

👶 Benjamin was too young to remember

❤️ He still feels the full weight

📖 Grief and joy arrive together

## 💋 He Kissed All His Brethren, And Wept Upon Them

Joseph moves from Benjamin to the ten other brothers.

A kiss here was a customary greeting of full acceptance in this culture.

This is not a cold formality.

Every brother, even the ones who plotted his death, receives this same welcome.

💋 A kiss signals full acceptance

🔄 Joseph moves to all his brothers

🚫 This is not a cold formality

📖 Even the plotters are welcomed

## 🗣️ His Brethren Talked With Him

Real conversation only becomes possible after this moment.

Fear and shame had kept the brothers silent since Joseph first spoke his name.

Trust had to be shown before it could be spoken.

Once that trust is felt, through tears and a kiss, words can finally follow.

🗣️ Real talk follows real trust

😶 Fear had kept them silent

🤝 Physical trust came before words

📖 Reconciliation opens the conversation
# Genesis 45:16-20
# 👑 Pharaoh's Generous Response
---
## 📢 The Fame Thereof Was Heard In Pharaoh's House

News that Joseph's brothers have arrived spreads fast through the royal household.

Joseph's story is already well known enough that this news reaches Pharaoh personally.

This is not a private family matter anymore.

Joseph's position turns family news into a palace event.

📢 News spreads through the palace

👑 Joseph's story was already known

🏠 This reaches Pharaoh personally

📖 A family reunion becomes public news

## 😊 It Pleased Pharaoh Well, And His Servants

Pharaoh is not just tolerant of this reunion.

He is genuinely glad about it, and so is his entire court.

That reaction says something about how much Egypt already trusts Joseph.

This joy sets up the unusually generous response that follows.

😊 Pharaoh is genuinely glad

👥 His whole court agrees

🎁 This sets up real generosity

📖 Joy from the top spreads down

## 🐫 Lade Your Beasts, And Go, Get You Unto The Land Of Canaan

Lade means load up with cargo for a journey.

Pharaoh personally instructs Joseph's brothers to head back to Canaan.

This is not just Joseph's invitation anymore.

Royal authority now backs the whole plan.

🐫 Lade means load up for travel

👑 Pharaoh gives the order himself

📜 Royal authority backs the plan

📖 A family plan becomes a decree

## 🏠 Take Your Father And Your Households, And Come Unto Me

Pharaoh's invitation is not limited to Jacob alone.

He includes every household connected to the family.

This matches Joseph's own instructions from earlier in the chapter.

A king and a governor are now saying the exact same thing.

🏠 The whole family is invited

👪 Every household is included

🔁 This matches Joseph's own words

📖 Pharaoh confirms Joseph's promise

## 🧈 Ye Shall Eat The Fat Of The Land

The fat of the land is an old idiom, not a comment about animal fat.

It means the richest and best produce a land has to offer.

Pharaoh is promising more than bare survival here.

He is offering Jacob's family full access to Egypt's finest resources.

🧈 The idiom means the very best

🌾 It refers to rich produce

🎁 Egypt's finest is offered here

📖 Pharaoh offers more than survival

## 📜 Now Thou Art Commanded, This Do Ye

Pharaoh shifts from a friendly offer to a direct royal order.

That word choice matters.

An order from Pharaoh removes any doubt the brothers might still feel.

Hesitation is no longer an option once a king has spoken.

📜 Pharaoh turns this into an order

🚫 No more room for hesitation

👑 A king's word settles doubt

📖 Certainty replaces any lingering fear

## 🚚 Take You Wagons Out Of The Land Of Egypt For Your Little Ones, And For Your Wives

Egyptian wagons are provided specifically for family members who could not travel that far on foot.

Little ones and wives ride in the wagons.

The men likely walk alongside instead.

This detail shows real, practical care, not just a kind word.

🚚 Wagons are provided by Egypt

👶 They carry the most vulnerable

🚶 Others likely walk alongside

📖 Generosity here is practical, not just words

## 📦 Regard Not Your Stuff

Stuff here means household belongings and possessions left behind in Canaan.

Pharaoh tells the brothers not to worry about any of it.

Egypt's resources will cover everything the family could possibly need.

📦 Stuff means belongings left behind

🚫 Pharaoh says do not worry

🎁 Egypt covers what is needed

📖 Nothing has to be left in fear
# Genesis 45:21-24
# 🎁 Gifts And Departure
---
## 🎁 Joseph Gave Them Wagons, According To The Commandment Of Pharaoh

Joseph follows through on Pharaoh's order immediately.

He does not wait or delegate the task to someone else.

The wagons Pharaoh promised in the last section actually show up here.

🎁 Joseph acts on the order at once

🚚 The promised wagons arrive

✅ No delay or delegation

📖 Joseph turns a promise into action

## 🍞 Gave Them Provision For The Way

Provision means food and supplies for the journey ahead.

Joseph personally makes sure his brothers have what they need for the trip home.

This is a long trip through land hit hard by famine.

Joseph does not leave that detail to chance.

🍞 Provision means food for travel

🛤️ The journey home was long

🌍 Famine still gripped the land

📖 Joseph provides for the road itself

## 👘 To All Of Them He Gave Each Man Changes Of Raiment

Raiment is an old word for clothing.

Every brother receives a fresh change of clothes for the journey.

This is a normal, generous gift, nothing unusual yet.

👘 Raiment means clothing

🎁 Every brother gets a fresh set

✅ A normal, generous gift so far

📖 The next verse changes that

## 💰 But To Benjamin He Gave Three Hundred Pieces Of Silver, And Five Changes Of Raiment

Benjamin receives far more than the other ten brothers.

This is deliberate favoritism, the same pattern that once tore this family apart over Joseph's coat.

This time, though, the other brothers already know the full story.

None of them react with the old jealousy.

That is the real proof of how much they have changed.

💰 Benjamin receives far more than the rest

👘 This echoes Joseph's old coat

🕊️ No jealousy follows this time

📖 Real change shows in their silence

## 🐴 Ten Asses Laden With The Good Things Of Egypt

Laden means loaded down with cargo.

Ten male donkeys carry Egypt's finest goods, specifically chosen for Jacob's journey.

This gift is aimed at comfort, not just survival.

🐴 Laden means loaded with cargo

👑 These carry Egypt's finest goods

🎯 Chosen specifically for Jacob

📖 Comfort mattered as much as food

## 🌾 Ten She Asses Laden With Corn And Bread And Meat

A second set of ten female donkeys carries grain, bread, and meat.

Twenty animals total are loaded specifically for one man's journey.

Joseph is not sending a small token gift.

He is sending enough to sustain his father the entire way.

🌾 Ten more donkeys carry food

🔢 Twenty animals total are sent

🎯 All aimed at Jacob's journey

📖 This is provision, not a token

## ⚠️ See That Ye Fall Not Out By The Way

Joseph's parting words are a warning, not a goodbye.

Fall not out means do not quarrel or blame each other.

Joseph knows this family's history of conflict.

Old tensions could resurface once they are alone on the road.

He speaks from experience, not suspicion.

⚠️ Fall not out means do not quarrel

🧠 Joseph knows their history well

🛣️ Old tension could return alone

📖 He warns from experience, not fear
# Genesis 45:25-28
# 💔 Jacob Hears The News
---
## 🐫 They Went Up Out Of Egypt, And Came Into The Land Of Canaan

The brothers begin the same journey they will soon make again, this time with their father.

Egypt sits lower in elevation than Canaan, which is why the text says went up.

This detail is geographic, not just a figure of speech.

🐫 The brothers head back to Canaan

⛰️ Went up refers to real elevation

🗺️ Egypt sits lower than Canaan

📖 The text tracks real geography

## 📣 Joseph Is Yet Alive, And He Is Governor Over All The Land Of Egypt

The brothers deliver the biggest news of Jacob's life in one sentence.

Joseph is alive, and Joseph now rules over Egypt.

Either fact alone would be shocking after twenty years of grief.

Together, they are almost impossible to believe.

📣 Two shocking facts in one line

❤️ Joseph is alive after twenty years

👑 Joseph now rules over Egypt

📖 Grief made both facts hard to accept

## 😨 Jacob's Heart Fainted, For He Believed Them Not

Fainted here does not mean he physically collapsed.

It describes his heart going numb, unable to process the news.

More than twenty years of believing Joseph was dead does not dissolve with one sentence.

Jacob simply cannot accept it as true, not yet.

😨 Fainted means numb, not collapsed

⏳ Twenty years of grief run deep

🚫 One sentence cannot undo that

📖 Belief takes more than words

## 🗣️ They Told Him All The Words Of Joseph

The brothers do not just announce the news.

They repeat everything Joseph actually said to them, word for word.

Every detail matters when trying to convince a grieving father of something this unbelievable.

🗣️ They repeat Joseph's exact words

📋 Every detail is included

🎯 Detail helps convince a doubting father

📖 Truth needed proof, not just a claim

## ❤️‍🩹 The Spirit Of Jacob Their Father Revived

Words alone did not convince Jacob.

Seeing the wagons Joseph actually sent is what finally breaks through decades of grief.

Real, physical evidence succeeds where a spoken report could not.

❤️‍🩹 Real proof convinces Jacob

🚚 The wagons become physical evidence

🚫 Words alone were not enough

📖 Sight succeeded where speech failed

## 🙌 It Is Enough, Joseph My Son Is Yet Alive

Jacob's response is short and complete.

After all the favoritism, the loss, and decades of grief, one truth is enough for him.

He does not ask for more proof or more detail.

🙌 One truth outweighs every year of grief

🙅 Jacob does not need more proof

❤️ His son being alive is enough

📖 Simple truth can outweigh decades of pain

## ➡️ I Will Go And See Him Before I Die

Jacob names his own age and mortality plainly.

He does not simply celebrate the news.

He decides to act at once.

This line sets up his own journey to Egypt later in the story.

🧓 Jacob names his own mortality

🏃 He decides to act at once

🛤️ This sets up his own journey

📖 Jacob chooses to see Joseph himself
`.trim();

export const GENESIS_FORTY_FIVE_PERSONAL_SECTIONS = parseGenesisFortyFiveRawNotes(GENESIS_FORTY_FIVE_RAW_NOTES);
