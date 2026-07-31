export type GenesisThirtySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtySevenRawNotes(rawText: string): GenesisThirtySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+37:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 37 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+37:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+37:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 37 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 37,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 37:${startVerse}` : `Genesis 37:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Genesis 37 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_SEVEN_RAW_NOTES = `# Genesis 37:1-4
# 🏕️ Jacob Settles In The Promised Land
---
## 🏕️ In The Land Wherein His Father Was A Stranger

"Stranger" here does not mean an unwelcome outsider.

It means a sojourner, someone living as a temporary resident in a land not fully his own.

Isaac lived his whole life in Canaan without ever owning most of it.

He held onto God's promise instead of a deed to the land.

Jacob now settles in that very same place, still waiting on the same promise.

🏕️ Stranger means a temporary resident

📜 Isaac never owned the land himself

🙏 He lived there trusting God's promise

📖 Jacob inherits the same unfulfilled promise

## 📜 These Are The Generations Of Jacob

This phrase marks a turning point in the book of Genesis.

Moses uses it to introduce a new major section of the story.

The word "generations" does not just mean a family list here.

It means the account of what happened through this person's family.

From this point forward, Genesis follows Jacob through the life of his son Joseph.

Joseph enters the story at seventeen years old, working as a shepherd.

🔀 Generations means an account, not a list

📜 This phrase opens a new section

👦 Joseph enters the story at seventeen

➡️ He works as a shepherd with his brothers

## 👪 The Sons Of Bilhah, And With The Sons Of Zilpah

Bilhah and Zilpah were servants given to Rachel and Leah as maids.

Jacob later had sons through both women as well.

Bilhah's sons were Dan and Naphtali.

Zilpah's sons were Gad and Asher.

Joseph worked alongside these four brothers instead of all eleven.

Scripture never explains why this specific group is named here.

👪 Bilhah and Zilpah were Rachel and Leah's maids

👦 Dan and Naphtali were Bilhah's sons

🐐 Gad and Asher were Zilpah's sons

📖 Scripture never explains why this group is named

## 📢 Joseph Brought Unto His Father Their Evil Report

Joseph told Jacob about wrongdoing he had seen among his brothers.

"Evil report" means real wrongdoing, not childish tattling.

Scripture never says exactly what the brothers had done.

Reuben had already dishonored his father earlier in Genesis.

Simeon and Levi had already killed the men of an entire city in revenge for their sister.

Jacob had good reason to take a report like this seriously.

📢 Evil report means real wrongdoing, not tattling

❓ Scripture never says exactly what happened

⚠️ Reuben, Simeon, and Levi had sinned before

📖 Jacob had reason to take Joseph seriously

## 👑 He Made Him A Coat Of Many Colours

This was not just a pretty gift.

In this culture, a robe like this marked someone who did not do hard manual labor.

Jacob already favored Joseph as the son of his old age.

Joseph was also the first son of Rachel, the wife Jacob loved most.

The coat made that favor impossible to hide.

Every brother working the flocks in rough clothes could see exactly who their father loved best.

This coat becomes the spark behind everything that follows.

👑 A coat like this marked nobility, not labor

❤️ Jacob favored Joseph as his old age son

👀 Every brother could see the favoritism plainly

➡️ The coat sparks everything that follows

## 😡 They Hated Him, And Could Not Speak Peaceably Unto Him

Jealousy in this family did not stay quiet for long.

Hatred here is more than mild annoyance.

It means a deep resentment that wishes someone harm.

The brothers could no longer speak a kind word to Joseph.

Every conversation between them now carried hidden hostility.

This broken relationship sets up everything that happens next.

😡 Hatred means wishing harm, not just annoyance

🗣️ The brothers could not speak kindly to him

⚡ Every conversation now carried hidden hostility

➡️ This broken family shapes what comes next

# Genesis 37:5-8
# 💭 Joseph's First Dream
---
## 💭 Joseph Dreamed A Dream, And He Told It His Brethren

God gave Joseph a dream, and Joseph immediately told his brothers.

That honesty also shows his youth.

The brothers already hated him for his father's favor.

Telling them this dream only made that hatred grow.

Moses reveals the result before he even tells us the dream itself.

That order builds tension on purpose.

💭 God gave Joseph a real dream

🗣️ Joseph told his brothers right away

😡 Telling them made the hatred grow

📖 The story builds tension on purpose

## 🙏 Hear, I Pray You, This Dream Which I Have Dreamed

The phrase "I pray you" does not mean Joseph is praying to his brothers.

It is an old way of saying please.

Joseph is politely asking his brothers to listen.

Given how much they already hated him, that politeness did not soften what came next.

🙏 I pray you means please

👂 Joseph is asking his brothers to listen

😑 His politeness did not soften their hatred

➡️ What comes next will only make it worse

## 🌾 We Were Binding Sheaves In The Field

A sheaf is a bundle of cut grain stalks tied together after harvest.

Binding sheaves means gathering the grain and tying it up so it could be carried or stored.

Jacob's family raised both flocks and crops.

This was an ordinary, familiar scene for everyone listening to the dream.

🌾 A sheaf is a bundle of harvested grain

🪢 Binding means tying the grain into bundles

👨‍🌾 Jacob's family also worked the land

➡️ The dream starts with an ordinary scene

## 🌾 My Sheaf Arose, And Also Stood Upright

In the dream, Joseph's bundle of grain suddenly stood up on its own.

The other sheaves stayed lying on the ground around it.

An ordinary harvest does not work that way.

The strange detail is the point.

It signals that this dream carries a hidden meaning, not just a memory of farm work.

🌾 Joseph's sheaf stood up on its own

😮 The other sheaves stayed lying down

🔍 The strangeness signals a hidden meaning

📖 God is speaking through the picture

## 🙇 Your Sheaves Stood Round About, And Made Obeisance To My Sheaf

Obeisance means bowing down to show respect or submission to someone in authority.

In the dream, the other sheaves circled Joseph's sheaf and bowed to it.

The brothers understood exactly what that picture meant.

It pictured them one day bowing down to Joseph himself.

🙇 Obeisance means bowing in respect or submission

🌾 The other sheaves bowed to Joseph's sheaf

👀 The brothers understood the picture instantly

➡️ It pointed to them bowing to Joseph

## 😠 Shalt Thou Reign Over Us

The brothers respond with an angry question, not real curiosity.

In this culture, the oldest son normally held the most honor in the family.

Reuben, the firstborn, would have expected to lead after Jacob.

Joseph was nearly the youngest, describing a future where he ruled instead.

That idea struck the brothers as both unbelievable and insulting.

😠 The question drips with anger, not curiosity

👴 The oldest son normally led the family

👦 Joseph was nearly the youngest of them

➡️ His dream flipped their expected order

## 🔥 They Hated Him Yet The More For His Dreams, And For His Words

The dream did not create their hatred.

It poured fuel on hatred that already existed.

Moses says plainly that both the dream and Joseph's words fed their anger.

Instead of wondering whether God was speaking, the brothers only grew more bitter.

🔥 The dream added fuel to existing hatred

💔 Both his dream and his words fed it

❌ Nobody stopped to ask if God was speaking

➡️ Bitterness kept winning over curiosity

# Genesis 37:9-11
# 🌙 Joseph's Second Dream
---
## 🌙 I Have Dreamed A Dream More

Joseph now has a second dream, and he tells his brothers again.

A second dream on the same theme was not random to people in this culture.

When something repeated in a dream, it meant the message was certain and would happen.

Joseph did not yet grasp how badly this news would land.

🌙 Joseph received a second dream

🔁 A repeated dream signaled certainty back then

👦 Joseph still did not see the danger

📖 The message was becoming impossible to miss

## ⭐ The Sun And The Moon And The Eleven Stars Made Obeisance To Me

This dream uses the sky instead of a wheat field.

The sun stands for Jacob, the head of the family.

The eleven stars stand for Joseph's eleven brothers.

The moon most likely stands for the mother figure of the family.

Rachel had already died by this point, so scholars are not certain exactly who the moon represents.

Every part of the picture bows to Joseph, just like the sheaves did before.

☀️ The sun represents Jacob, the father

⭐ The eleven stars represent the brothers

🌙 The moon likely represents the mother figure

📖 The whole family bows in this picture

## ❓ What Is This Dream That Thou Hast Dreamed

This time Jacob hears the dream directly, and he does not stay quiet.

He immediately understands what the sun and moon and stars represent.

His question is sharp.

Shall the whole family now bow down to Joseph?

Jacob had experienced God speaking through dreams before, at Bethel and other places.

He questions Joseph publicly, but he does not dismiss the dream as nothing.

❓ Jacob understands the dream immediately

👪 His question asks if all will bow

🪜 God had spoken to him in dreams before

📖 He questions Joseph but does not dismiss it

## 😠 His Brethren Envied Him, But His Father Observed The Saying

The brothers' anger now has a name, envy.

Envy is the painful wish to have what someone else has, or resentment over the favor they receive.

Jacob's response is very different from theirs.

"Observed the saying" means he kept turning it over in his mind instead of dismissing it.

He had learned before that God's plans often looked impossible until they suddenly were not.

😠 Envy means resenting someone else's favor

🤔 Jacob quietly kept turning the dream over

🪜 He had seen God's plans unfold before

📖 He waited instead of dismissing it

# Genesis 37:12-17
# 🚶 Joseph Searches For His Brothers
---
## 🐑 His Brethren Went To Feed Their Father's Flock In Shechem

The brothers traveled north to Shechem to graze the family's flocks.

Shechem was not a neutral place for this family.

It was where their sister Dinah had been assaulted.

Simeon and Levi had killed every man in that city in revenge.

The brothers were now grazing sheep in the very place their own violence had happened.

🐑 The brothers traveled north to graze flocks

⚔️ Simeon and Levi took revenge here

👀 The family had real history in this place

📖 Old violence still shadows this new scene

## 🙋 Here Am I

Jacob asks Joseph to go check on his brothers.

Joseph answers with two simple words, here am I.

That phrase means full readiness and full willingness to obey.

Abraham answered God the very same way in Genesis twenty two.

Moses and Isaiah would later answer the same way when God called them.

🙋 Here am I means full readiness

🙏 Abraham answered God this same way

📜 Faithful servants often answer this way

➡️ Joseph obeys without any hesitation

## 🙏 Go, I Pray Thee, See Whether It Be Well With Thy Brethren

"I pray thee" is simply an old way of saying please.

Jacob sends Joseph alone to check on his brothers and the flocks.

The trip from Hebron to Shechem covered about fifty miles.

Walking that far with no companion meant real danger from wild animals or robbers.

Joseph agrees to go without any argument.

🙏 I pray thee simply means please

🚶 Joseph traveled the fifty miles alone

🐺 The road carried real danger

➡️ He went without any argument

## 👤 A Certain Man Found Him, Wandering In The Field

Joseph reached Shechem, but his brothers were gone.

As he searched the open country, a stranger noticed him wandering.

Scripture never names this man or explains who he was.

This small, unplanned meeting keeps Joseph moving toward what God was already setting in motion.

👤 An unnamed man finds Joseph searching

❓ Scripture never explains who this man was

🧭 This meeting redirects Joseph toward his brothers

📖 A small moment served a much larger plan

## 👨‍👦 I Seek My Brethren

Joseph explains plainly why he is wandering the fields.

He is looking for his brothers and does not know where they went.

Despite the long walk already behind him, Joseph keeps searching instead of turning back.

👨‍👦 Joseph explains he is looking for his brothers

🚶 He has already walked a long way

💪 He keeps searching instead of quitting

➡️ His persistence pushes the story forward

## 📍 Let Us Go To Dothan

The man tells Joseph his brothers already moved on.

They had gone to Dothan, another area with good pasture.

Dothan sat about twelve miles north of Shechem.

That meant yet another day of walking for Joseph.

📍 The brothers had moved on to Dothan

🌿 Dothan offered more grazing land

🚶 The move added another day of travel

➡️ Joseph kept following without turning back

## 🚶 Joseph Went After His Brethren, And Found Them In Dothan

Joseph finally catches up to his brothers in Dothan.

By this point he had walked over sixty miles from home, alone.

He still had a long walk back to Hebron waiting for him after this.

His obedience carried him the whole distance without complaint.

🚶 Joseph walked over sixty miles to find them

🏡 A long walk home still waited after this

💪 His obedience carried him the whole way

➡️ He finally reaches his brothers in Dothan

# Genesis 37:18-24
# 🕳️ The Brothers Plot Against Joseph
---
## ⚔️ They Conspired Against Him To Slay Him

The brothers see Joseph coming from far away.

That distance gives them time to plan before he ever arrives.

"Conspired" means they secretly planned this together.

"Slay" means to kill.

Before Joseph speaks a single word, his brothers have already decided to murder him.

👀 They spot Joseph from far away

🤫 Conspired means they planned this in secret

⚔️ Slay means to kill

📖 The plan is set before Joseph speaks

## 💭 Behold, This Dreamer Cometh

The brothers no longer call Joseph their brother.

They call him "this dreamer" instead, and they mean it as an insult.

His dreams had become the very thing they hated most about him.

Every time they saw him, they were reminded of a future where they bowed to him.

💭 They mock Joseph by calling him the dreamer

😠 The nickname was meant as an insult

👑 His dreams reminded them of bowing to him

➡️ Mockery had replaced any real brotherhood

## 🕳️ Let Us Slay Him, And Cast Him Into Some Pit

The plan was to kill Joseph and throw his body into a pit.

These pits were usually dry cisterns dug to collect rain water.

Empty ones became deep holes with steep sides, nearly impossible to climb out of.

Many ran ten to twenty feet deep.

🕳️ A pit was often a dry water cistern

⬇️ Some ran ten to twenty feet deep

🚫 Climbing out alone was nearly impossible

📖 The brothers chose a cruel, hidden method

## 💔 We Shall See What Will Become Of His Dreams

This line reveals the real motive behind the murder plot.

The brothers were not only angry at Joseph.

They wanted to destroy the future his dreams had promised.

Every step they took to stop that future would end up serving it instead.

💔 Their anger targeted Joseph's future, not just him

👑 They wanted to erase what the dreams promised

🔄 Their plan would later serve God's plan instead

📖 Human plots cannot outrun God's purpose

## 🛡️ Reuben Heard It, And He Delivered Him Out Of Their Hands

Reuben, the oldest brother, steps in to stop the murder.

As the firstborn, he carried real responsibility for the family.

Reuben had failed his father badly earlier in Genesis.

Here, though, he refuses to let Joseph be killed.

🛡️ Reuben stops the murder before it happens

👴 As the firstborn, he carried real weight

📖 He had failed his father before

➡️ Here he chooses to protect Joseph instead

## 🕳️ Shed No Blood, But Cast Him Into This Pit

Reuben proposes throwing Joseph into a dry pit instead of killing him directly.

Scripture tells us his true plan right away.

Reuben meant to come back later and pull Joseph out in secret.

His real goal was to return Joseph safely to their father.

🕳️ Reuben suggests the pit instead of murder

🤫 His secret plan was to rescue Joseph later

❤️ He wanted to return Joseph to Jacob

📖 Reuben's caution bought Joseph time

## 👕 They Stript Joseph Out Of His Coat

The brothers strip off the robe the moment Joseph arrives.

This was the very coat that marked their father's favor.

Removing it was not only about the clothing.

It was an attack on everything that coat represented to them.

👕 The brothers strip off Joseph's special coat

❤️ The coat marked their father's open favor

💔 Removing it attacked what it represented

➡️ The next act only gets worse from here

## 🕳️ They Took Him, And Cast Him Into A Pit

Joseph is thrown into the dry cistern with no water and no way out.

Genesis does not say here whether Joseph was hurt in the fall.

Years later, the brothers admit they heard him beg for his life and ignored him.

That detail makes this moment even harder to read.

🕳️ Joseph is trapped with no way out

😢 He later remembered begging for mercy

👂 His brothers heard him and ignored him

📖 Their silence made the cruelty complete

# Genesis 37:25-28
# 🐪 Sold To The Ishmeelites
---
## 🍞 They Sat Down To Eat Bread

With Joseph trapped and crying out beneath them, the brothers calmly sit down to eat.

That detail shows exactly how hard their hearts had become.

Years later they would still remember hearing his pleas.

They also remembered ignoring every one of them.

A meal continued as if nothing unusual had happened at all.

🍞 The brothers eat calmly as Joseph suffers

💔 Their hearts had grown hard toward him

😢 They later remembered ignoring his cries

📖 A meal went on as if nothing happened

## 🐪 A Company Of Ishmeelites Came From Gilead

A caravan of traders appears on the road, right on time.

The Ishmeelites descended from Ishmael, Abraham's son through Hagar.

That made them distant relatives of Jacob's own family.

Gilead, the region they came from, was known for producing valuable goods for trade.

🐪 A trading caravan appears right on time

👪 The Ishmeelites were distant relatives of Jacob

🗺️ They came from the region of Gilead

📖 God used ordinary traders to move His plan

## 🌿 Spicery And Balm And Myrrh

The caravan carried valuable goods bound for Egypt.

Spicery refers to aromatic spices used in cooking and perfume.

Balm was a healing resin from trees, prized as medicine.

Myrrh was a fragrant resin used in perfume, medicine, and burial customs.

🌿 Spicery means aromatic cooking and perfume spices

🌳 Balm was a healing resin from trees

💧 Myrrh was used in perfume and burial

➡️ This same caravan would soon carry Joseph too

## 💰 What Profit Is It If We Slay Our Brother

Judah speaks up with a new idea.

He does not ask what is right.

He asks what they would gain instead.

"Profit" means benefit or financial gain.

If Joseph is going to disappear either way, Judah reasons, they might as well make money from it.

💰 Judah asks about profit, not right and wrong

❓ He reframes murder as a business question

⚖️ His plan trades one sin for another

📖 Even his mercy still served self interest

## 💰 Sold Joseph To The Ishmeelites For Twenty Pieces Of Silver

The brothers pull Joseph out of the pit, but not to save him.

They sell him instead, for twenty pieces of silver.

That price matched what a healthy young slave typically cost in this period.

It amounted to only a few months of an ordinary worker's wages.

For that small amount, they gave away their own brother.

💰 Joseph is sold for twenty pieces of silver

⛓️ That was a young slave's normal price

📉 It equaled only a few months of wages

📖 They traded their brother for a small sum

# Genesis 37:29-30
# 😢 Reuben's Grief
---
## 👕 Reuben Returned Unto The Pit, And He Rent His Clothes

Reuben had stepped away, planning to come back later and rescue Joseph in secret.

When he returns, Joseph is simply gone.

"Rent his clothes" means he tore his own garment.

In this culture, tearing your clothing was a visible sign of overwhelming grief or shock.

🏃 Reuben planned to rescue Joseph later

😨 He returns to find Joseph already gone

👕 Tearing clothes showed deep grief or shock

📖 His rescue plan has already failed

## 😢 The Child Is Not, And I, Whither Shall I Go

Reuben immediately understands what has happened.

As the oldest son, he carried special responsibility for his younger brothers.

"Whither shall I go" is an old way of asking, how can I possibly face my father now.

He dreads returning home with news like this.

😢 Reuben feels the weight of his failure

👴 As firstborn, he answered for the family

❓ His question means how can I face father

➡️ Dread now hangs over the walk home

# Genesis 37:31-36
# 💔 Jacob Mourns For Joseph
---
## 🐐 They Killed A Kid Of The Goats, And Dipped The Coat In The Blood

A kid of the goats is simply a young goat.

The brothers kill it so they can use its blood to build a lie.

They already planned to blame a wild animal for Joseph's disappearance.

Soaking the coat in blood was meant to make that story look believable.

🐐 A kid means a young goat

🩸 The blood was used to fake an attack

🎭 The brothers built false evidence on purpose

📖 One lie required staged proof to work

## 👕 This Have We Found: Know Now Whether It Be Thy Son's Coat

Notice what the brothers do not say.

They never tell Jacob that Joseph is dead.

Instead they hand him the bloody coat and ask him to identify it.

That way, Jacob reaches the worst conclusion entirely on his own.

🤐 The brothers never say Joseph is dead

👕 They only ask Jacob to identify the coat

🧠 They let Jacob draw his own conclusion

📖 A careful lie can hide behind silence

## 💔 An Evil Beast Hath Devoured Him

The moment Jacob recognizes the coat, he believes the worst instantly.

"Rent in pieces" means torn completely apart.

Jacob is certain his son could not have survived an attack like that.

Everything Jacob believes in this moment is wrong, though he has no way to know it.

💔 Jacob believes the worst instantly

🐺 Rent in pieces means torn completely apart

😭 He is certain Joseph could not survive

📖 His real grief came from a false story

## 👕 Jacob Rent His Clothes, And Put Sackcloth Upon His Loins

Jacob tears his own clothing, just as Reuben had done earlier.

Tearing your garment was a public sign of overwhelming grief.

Sackcloth was a rough, coarse fabric usually made from goat hair.

Wearing it around the waist was another visible mark of deep mourning.

👕 Tearing clothes showed grief in public

🧵 Sackcloth was rough cloth made from goat hair

😭 Wearing it marked deep, visible mourning

📖 Jacob's whole body now displayed his sorrow

## 😭 Mourned For His Son Many Days

To mourn means far more than feeling sad for a moment.

Scripture does not say exactly how many days Jacob grieved.

"Many days" simply tells us his sorrow lasted a long time.

Day after day, Jacob believed his favorite son was gone for good.

😭 Mourning is deep, lasting grief

📅 Many days means a long, unspecified time

💔 Jacob believed Joseph was gone for good

➡️ His family watches him grieve without relief

## 🚫 He Refused To Be Comforted

Jacob's whole family tries to ease his grief, and none of it works.

His own words explain why, I will go down to the grave mourning for my son.

"Grave" here translates the Hebrew word sheol, the realm of the dead.

Jacob believed only death itself would end this pain.

🤝 The whole family tries to comfort him

🚫 Jacob refuses every attempt at comfort

⚰️ Sheol refers to the realm of the dead

📖 He expected this grief to last a lifetime

## 🇪🇬 Sold Him Into Egypt Unto Potiphar

Jacob mourns at home, unaware of anything else.

The caravan finishes its trip into Egypt.

There they sell Joseph to Potiphar, an official in Pharaoh's court.

"Captain of the guard" means Potiphar held real authority, likely over the royal guard or prison.

Joseph the favored son is now a slave in a foreign land.

Even here, God was already placing Joseph inside a household of real influence.

🇪🇬 Joseph is sold to Potiphar in Egypt

👑 Potiphar was a high ranking Egyptian official

⛓️ The favored son is now a slave

📖 God was already positioning Joseph ahead
`.trim();

export const GENESIS_THIRTY_SEVEN_PERSONAL_SECTIONS = parseGenesisThirtySevenRawNotes(GENESIS_THIRTY_SEVEN_RAW_NOTES);
