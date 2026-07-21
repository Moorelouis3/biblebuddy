export type GenesisTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisTwentySevenRawNotes(rawText: string): GenesisTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 27:${startVerse}` : `Genesis 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Genesis 27 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_TWENTY_SEVEN_RAW_NOTES = `# Genesis 27:1–5

# 🦌 Isaac's Request

---

## 👴 When Isaac Was Old

Many years have passed since the previous chapter.

Isaac is now an old man.

He is 137 years old

Here's how we estimate his age:

- 👶 Isaac was **60 years old** when Jacob and Esau were born (Genesis 25:26).
- 💍 Esau was **40 years old** when he married Judith and Bashemath (Genesis 26:34). That made Isaac about **100 years old**.
- 📖 Genesis 27 does not tell us exactly how many more years have passed, but many Bible scholars estimate Isaac was **about 137 years old** here because Esau does not marry again until he is about 77 years old (Genesis 28), placing Isaac around 137.

Interestingly, Isaac does **not** die here.

He lives until **180 years old** (Genesis 35:28), meaning he still has many years left even though he believes death is near.

👴 Many years have passed

📖 Isaac is now an old man

📚 Many scholars estimate he is about 137 years old

⏳ Isaac believes he is near death, but he actually lives many more years

➡️ His eyesight begins to fail

---

## 👁️ His Eyes Were Dim, So That He Could Not See

Isaac's eyesight had become very poor.

He was either nearly blind or completely blind because of old age.

His blindness becomes one of the most important details in this chapter because he can no longer identify people by looking at them.

👁️ Isaac has become nearly blind

👴 His blindness comes with old age

📖 His condition sets up the events that follow

➡️ Isaac calls for Esau

---

## 👨 He Called Esau His Eldest Son

Isaac calls **Esau**, his firstborn son.

In that culture, the oldest son normally received the father's special blessing and became the new head of the family after his father died.

Isaac believes the time has come to pass that blessing on.

The reader already knows something Isaac either doesn't know or isn't acting on:

God had already told Rebekah,

"The elder shall serve the younger."

That makes the rest of this chapter very important.

👨 Isaac calls for Esau

👑 The firstborn normally received the father's blessing

⚠️ God had already spoken about Jacob years earlier

➡️ Isaac begins speaking

---

## 👋 My Son…Here Am I

Isaac says,

"My son."

Esau answers,

"Here am I."

This is simply a respectful way of saying,

"I'm here, Father."

👋 Isaac calls his son

🙋 Esau responds respectfully

➡️ Isaac tells him why he called

---

## ⏳ Behold Now, I Am Old; I Know Not The Day Of My Death

Isaac believes he is nearing the end of his life.

He doesn't know exactly when he will die, so he wants to settle the future of his family while he still can.

Although Isaac thinks death is close, God still has many more years planned for him.

⏳ Isaac believes his life is almost over

🙏 He wants to settle his family's future

➡️ He gives Esau an assignment

---

## 🏹 Take, I Pray Thee, Thy Weapons, Thy Quiver And Thy Bow

Isaac tells Esau to gather his hunting equipment.

A **quiver** was a case that held arrows.

Esau was known as a skilled hunter, so Isaac asks him to do what he does best.

🏹 Esau gathers his hunting equipment

🦌 Hunting was his specialty

➡️ Isaac requests his favorite meal

---

## 🥩 Take Me Some Venison…Make Me Savoury Meat Such As I Love, And Bring It To Me

**Venison** is meat from a wild animal, usually a deer or similar game.

Earlier in Genesis, we learned that Isaac especially enjoyed the meat Esau brought home from hunting.

This wasn't like opening a refrigerator or stopping at a market.

Esau would have had to:

🏹 Track a wild animal.

🦌 Hunt and kill it.

🔪 Skin it and prepare the meat.

🥩 Carry it home.

🔥 Then cook and season it before serving it to Isaac.

This whole process could easily take several hours or even most of the day.

That gave Rebekah enough time to prepare her own meal before Esau returned.

🥩 Isaac asks for fresh venison

🏹 Esau leaves to hunt

⏳ Preparing the meal could take many hours

➡️ Isaac plans to bless Esau afterward

---

## 🙏 That I May Eat; That My Soul May Bless Thee Before I Die

The meal itself did not give the blessing its power.

Isaac wanted to enjoy one final meal prepared by Esau before formally speaking the family blessing.

In the ancient world, a father's blessing was much more than kind words.

It was a public declaration about inheritance, leadership, and the future of the covenant family.

🙏 Isaac wants one final meal with Esau

👑 The blessing carries spiritual and family authority

📖 Isaac intends to pass leadership to Esau

➡️ Rebekah overhears everything

---

## 👂 Rebekah Heard When Isaac Spake To Esau His Son

Rebekah overhears the entire conversation.

She immediately realizes Isaac is preparing to bless Esau.

She also remembers God's promise that **the older son would serve the younger**.

Instead of waiting to see how God would fulfill His promise, Rebekah decides to act herself.

👂 Rebekah overhears Isaac

🧠 She remembers God's promise

⚠️ She decides to take matters into her own hands

➡️ Esau leaves to hunt

---

## 🌲 Esau Went To The Field To Hunt For Venison, And To Bring It

Esau immediately leaves to do what his father asked.

Finding wild game was not a quick errand.

He would have needed to search for an animal, track it, hunt it, prepare the meat, and return home.

The time required for that journey gave Rebekah the opportunity to prepare a meal for Isaac before Esau returned.

🌲 Esau leaves to hunt

🏹 Hunting and preparing the meat would take hours

⏳ His absence gives Rebekah time to carry out her plan

➡️ The story now shifts to Rebekah

# Genesis 27:6–17

# 🐐 Rebekah Makes A Plan

---

## 👂 Rebekah Spake Unto Jacob Her Son

After overhearing Isaac's conversation with Esau, Rebekah immediately goes to Jacob.

She knows Isaac is preparing to give the family blessing.

She also remembers what God told her years earlier:

"The elder shall serve the younger."

Instead of waiting for God to fulfill His promise, Rebekah decides to make her own plan.

👂 Rebekah goes straight to Jacob

🧠 She remembers God's promise

⚠️ She decides to take matters into her own hands

➡️ She tells Jacob what she heard

---

## 🗣️ I Heard Thy Father Speak Unto Esau Thy Brother

Rebekah tells Jacob exactly what she overheard.

She wants Jacob to understand that this is happening **right now**.

There isn't much time before Esau returns.

🗣️ Rebekah repeats Isaac's conversation

⏳ She knows time is running out

➡️ She explains Isaac's request

---

## 🦌 Bring Me Venison, And Make Me Savoury Meat…That I May Eat, And Bless Thee Before My Death

Rebekah repeats Isaac's instructions.

Isaac wanted Esau to hunt fresh game, prepare his favorite meal, and then receive the family blessing before Isaac died.

Rebekah understands that once Isaac gives that blessing, everything will change.

She believes she must act before Esau returns.

🦌 Isaac wanted fresh venison

🍖 He planned to bless Esau afterward

⏳ Rebekah believes there is only a small window of time

➡️ She gives Jacob instructions

---

## 👩‍👦 Now Therefore, My Son, Obey My Voice According To That Which I Command Thee

Rebekah now takes charge.

She tells Jacob,

**"Do exactly what I tell you."**

She already has a plan.

👩‍👦 Rebekah takes control

📖 She tells Jacob to follow her instructions

➡️ She sends him for the goats

---

## 🐐 Go Now To The Flock, And Fetch Me From Thence Two Kids Of The Goats

Instead of waiting for Esau to return with wild game, Rebekah tells Jacob to bring **two young goats** from the family's flock.

Why goats?

Rebekah likely knew exactly how Isaac liked his food prepared.

With the right seasoning and cooking, she could make goat taste very similar to wild game.

She had almost certainly prepared Isaac's meals for many years and knew exactly what he liked.

🐐 Jacob brings two young goats

👩‍🍳 Rebekah prepares the meal herself

🍖 She knows exactly how Isaac likes his food

➡️ Jacob will take it to Isaac

---

## 🍽️ I Will Make Them Savoury Meat For Thy Father Such As He Loveth

Rebekah doesn't ask Jacob to cook.

She prepares the meal herself.

As Isaac's wife, she would have cooked for him throughout their marriage and knew how to prepare his favorite dishes.

Her confidence shows she believes Isaac will not recognize the difference.

🍽️ Rebekah prepares the meal

👩‍🍳 She knows Isaac's favorite recipes

➡️ Jacob will deliver it

---

## 🙏 Thou Shalt Bring It To Thy Father…That He May Bless Thee Before His Death

Rebekah tells Jacob exactly what the plan is.

Jacob will take the meal to Isaac and receive the blessing **in Esau's place** before Esau returns from hunting.

Everything depends on timing.

Esau's hunting trip could take several hours, but every minute counts.

⏳ Jacob must act before Esau returns

👑 The goal is to receive Isaac's blessing

➡️ Jacob raises a concern

---

## 🧔 Esau My Brother Is A Hairy Man, And I Am A Smooth Man

Jacob isn't worried that the plan is morally wrong.

His concern is getting caught.

Esau was known for being unusually hairy.

Jacob had smooth skin.

Since Isaac was nearly blind, Jacob assumes his father will recognize him by touch instead of sight.

🧔 Esau was very hairy

✋ Jacob had smooth skin

👁️ Isaac would likely identify him by touch

➡️ Jacob fears the consequences

---

## ⚠️ My Father Peradventure Will Feel Me…I Shall Seem To Him As A Deceiver…And I Shall Bring A Curse Upon Me, And Not A Blessing

**Peradventure** means **perhaps** or **maybe**.

Jacob worries,

"What if Father touches me?"

If Isaac discovers the deception, Jacob believes he won't receive a blessing at all.

Instead, he could receive a **curse**.

A curse was the opposite of a blessing.

Instead of receiving favor, inheritance, and God's blessing, Jacob fears Isaac will pronounce judgment against him.

⚠️ Jacob fears being discovered

✋ Isaac may recognize him by touch

❌ A curse would replace the blessing

➡️ Rebekah accepts the risk

---

## ❤️ Upon Me Be Thy Curse, My Son…Only Obey My Voice, And Go Fetch Me Them

Rebekah answers immediately.

She says,

**"If there is any curse, let it fall on me."**

She is willing to accept whatever consequences come from the plan.

Then she tells Jacob one more time,

**"Just do what I tell you."**

❤️ Rebekah accepts the responsibility

👩‍👦 She urges Jacob to trust her plan

➡️ Jacob obeys

---

## 🐐 He Went And Fetched Them…And His Mother Made Savoury Meat Such As His Father Loved

Jacob obeys his mother.

He brings the goats to Rebekah.

She prepares the meal exactly the way Isaac likes it.

Meanwhile, Esau is still out hunting.

Everything has to happen before he returns.

🐐 Jacob brings the goats

🍽️ Rebekah prepares the meal

⏳ The race against time has begun

➡️ Rebekah prepares Jacob's disguise

---

## 👕 Rebekah Took The Goodly Raiment Of Her Elder Son Esau…And Put Them Upon Jacob Her Younger Son

**Goodly raiment** means Esau's best clothes.

Rebekah dresses Jacob in Esau's clothing so Isaac will recognize Esau's familiar smell.

In that culture, clothing often carried the smell of the outdoors, animals, and the person who regularly wore it.

Rebekah is trying to fool every one of Isaac's senses.

👕 Jacob wears Esau's best clothes

👃 Isaac may recognize Esau by his smell

➡️ Rebekah disguises Jacob's hands

---

## 🐐 She Put The Skins Of The Kids Of The Goats Upon His Hands, And Upon The Smooth Of His Neck

Rebekah places the soft goat skins on Jacob's hands and neck.

If Isaac reaches out to touch him, the goat hair will feel similar to Esau's unusually hairy skin.

She is thinking through every detail of the deception.

🐐 Goat skins cover Jacob's hands

✋ Isaac is expected to identify him by touch

🎭 The disguise is nearly complete

➡️ Jacob is ready to meet Isaac

---

## 🍞 She Gave The Savoury Meat And The Bread Which She Had Prepared Into The Hand Of Jacob

Everything is now ready.

Rebekah places the meal into Jacob's hands.

Esau is still away hunting.

Before he returns, Jacob must enter Isaac's tent, convince his blind father that he is Esau, receive the blessing, and leave without being discovered.

Every minute matters.

🍞 Jacob takes the prepared meal

⏳ Esau is still away hunting

⚠️ The plan now depends entirely on whether Isaac believes the deception

# Genesis 27:18–22

# 🎭 Jacob Lies To Isaac

---

## 👨 He Came Unto His Father, And Said, "My Father"

Jacob enters Isaac's tent carrying the meal Rebekah prepared.

Everything now depends on whether Isaac believes he is Esau.

Jacob knows there is no turning back.

👨 Jacob enters Isaac's tent

🍽️ He brings the prepared meal

⚠️ The deception begins

➡️ Isaac responds

---

## 👴 Here Am I; Who Art Thou, My Son?

Isaac answers,

**"Here am I."**

Then he asks,

**"Who are you, my son?"**

Isaac cannot see because he is nearly blind.

He recognizes that someone has entered his tent, but he cannot tell who it is just by looking.

So he asks the obvious question,

**"Who is it?"**

👴 Isaac cannot recognize the person before him

👁️ His blindness forces him to rely on his other senses

➡️ Jacob tells his first lie

---

## ❌ I Am Esau Thy Firstborn…I Have Done According As Thou Badest Me…Arise, I Pray Thee, Sit And Eat Of My Venison, That Thy Soul May Bless Me

Jacob immediately lies.

He says,

**"I am Esau, your firstborn."**

This is the first direct lie in the plan.

He also says,

**"I have done according as thou badest me."**

**Badest** means **"commanded"** or **"asked."**

Jacob repeats almost exactly what Rebekah heard Isaac say to Esau.

Rebekah had repeated Isaac's words to Jacob, so Jacob knows exactly what to say.

❌ Jacob claims to be Esau

🗣️ Badest means "commanded" or "asked"

🍽️ Jacob repeats Isaac's own words back to him

➡️ Isaac immediately becomes suspicious

---

## 🤔 How Is It That Thou Hast Found It So Quickly, My Son?

Isaac immediately notices something isn't right.

A real hunt should have taken much longer.

Tracking an animal…

Hunting it…

Preparing it…

Returning home…

That normally took hours.

Jacob has returned unusually fast.

Isaac's suspicion begins to grow.

🤔 Isaac notices the hunt was too quick

🏹 Hunting wild game normally took hours

⚠️ Isaac begins questioning the story

➡️ Jacob tells another lie

---

## 🙏 Because The Lord Thy God Brought It To Me

Instead of telling the truth, Jacob tells another lie.

He says God made the hunt successful.

This answer sounds believable because Isaac believes God blesses His people.

But Jacob is now doing something even more serious.

He is using **God's name** to support a lie.

🙏 Jacob claims God helped him

❌ He uses God's name to make the deception sound believable

⚠️ The lies continue to grow

➡️ Isaac wants proof

---

## ✋ Come Near, I Pray Thee, That I May Feel Thee, My Son, Whether Thou Be My Very Son Esau Or Not

Isaac is still not convinced.

Several things don't seem right.

👂 The voice sounds like Jacob.

🏹 The hunt happened too quickly.

🤔 Something feels wrong.

Since Isaac cannot trust his eyes, he decides to trust his hands.

He asks Jacob to come closer so he can touch him.

✋ Isaac is still suspicious

👂 The voice doesn't sound right

🤲 He decides to identify him by touch

➡️ Jacob approaches Isaac

---

## 🤲 Jacob Went Near Unto Isaac His Father, And He Felt Him

Jacob walks close enough for Isaac to touch him.

Isaac feels the goat skins covering Jacob's hands and neck.

The disguise works.

The hairy goat skins feel like Esau's unusually hairy skin.

🤲 Isaac examines Jacob by touch

🐐 The goat skins make the disguise believable

➡️ Isaac becomes conflicted

---

## 🤷 The Voice Is Jacob's Voice, But The Hands Are The Hands Of Esau

Isaac's senses are giving him two different answers.

👂 His ears tell him,

"That sounds like Jacob."

🤲 His hands tell him,

"This feels like Esau."

Isaac knows something isn't adding up.

He is caught between what he hears and what he feels.

This moment builds the tension of the story because Isaac suspects something is wrong, yet the disguise is convincing enough to make him hesitate.

👂 The voice sounds like Jacob

🤲 The hands feel like Esau

⚠️ Isaac's senses are in conflict

➡️ He continues questioning Jacob before giving the blessing

# Genesis 27:23–29

# 👑 Jacob Receives The Blessing

---

## ✋ He Discerned Him Not, Because His Hands Were Hairy, As His Brother Esau's Hands; So He Blessed Him

**Discerned** means **recognized** or **identified**.

Isaac could not tell that it was Jacob because the goat skins felt like Esau's hairy arms.

When it says, **"So he blessed him,"** this is a summary of what is about to happen.

Moses is telling us the result first.

The following verses explain **how** Isaac came to give the blessing.

This wasn't the actual blessing yet.

That begins a few verses later.

✋ Isaac could not recognize Jacob

🐐 The disguise fooled his sense of touch

📖 Verse 23 summarizes the outcome before explaining the details

➡️ Isaac asks one final question

---

## ❓ Art Thou My Very Son Esau? And He Said, I Am

Even after touching Jacob, Isaac still isn't completely convinced.

He asks one final time,

**"Are you really my son Esau?"**

Jacob tells another direct lie.

He simply answers,

**"I am."**

This is now the second time Jacob has openly claimed to be Esau.

❓ Isaac asks one final question

❌ Jacob tells another direct lie

⚠️ Isaac finally accepts the answer

➡️ Isaac asks for the meal

---

## 🍖 Bring It Near To Me, And I Will Eat Of My Son's Venison, That My Soul May Bless Thee

Now that Isaac believes he is speaking to Esau, he asks for the meal.

Again, the meal itself does **not** give the blessing its power.

The meal is simply part of this important family moment before Isaac formally speaks the blessing.

🍖 Isaac asks for the meal

👑 He is preparing to give the family blessing

➡️ Jacob serves his father

---

## 🍷 He Brought It Near To Him, And He Did Eat…And He Brought Him Wine, And He Drank

Jacob serves Isaac exactly as Rebekah instructed.

Isaac enjoys the meal and drinks the wine.

Everything appears normal from Isaac's perspective.

Jacob's plan is working.

🍷 Isaac eats the meal

🍇 Jacob also serves him wine

⚠️ The deception continues successfully

➡️ Isaac asks Jacob to come closer

---

## 💋 Come Near Now, And Kiss Me, My Son

Isaac asks Jacob to come close and kiss him.

In the ancient world, this was a normal sign of love and affection between family members.

But Isaac also has another reason.

Being close enough to kiss Jacob allows him to smell his clothing.

💋 Isaac calls Jacob close

❤️ A kiss was a normal family greeting

👃 Isaac also wants to smell him

➡️ Isaac smells Esau's clothing

---

## 👕 He Came Near, And Kissed Him; And He Smelled The Smell Of His Raiment, And Blessed Him

**Raiment** means **clothing**.

When Isaac smells Jacob's clothes, he smells Esau's familiar scent because Jacob is wearing Esau's garments.

This finally convinces Isaac.

Now Isaac begins speaking the actual blessing.

👕 Isaac recognizes Esau's clothing by its smell

👃 The disguise convinces him

👑 Isaac begins the formal blessing

➡️ The blessing begins

---

## 🌾 See, The Smell Of My Son Is As The Smell Of A Field Which The Lord Hath Blessed

Isaac compares Esau's smell to a field that God has blessed.

He's describing the fresh smell of the outdoors, fields, plants, and open country.

To Isaac, this is the smell of God's provision and abundance.

🌾 Isaac compares Esau to a fruitful field

🙏 The picture is one of God's blessing

➡️ Isaac begins pronouncing the blessing

---

## 🌧️ Therefore God Give Thee Of The Dew Of Heaven, And The Fatness Of The Earth, And Plenty Of Corn And Wine

This is the first part of Isaac's blessing.

He asks God to give Esau:

🌧️ **The dew of heaven** — regular rain and water for crops.

🌱 **The fatness of the earth** — rich, fertile land.

🌾 **Plenty of corn and wine** — abundant harvests and prosperity.

Isaac is praying for a life filled with God's provision.

🌧️ Plenty of rain

🌱 Fertile land

🌾 Abundant harvests

🙏 God's provision

➡️ Isaac blesses his future authority

---

## 👑 Let People Serve Thee, And Nations Bow Down To Thee

Isaac blesses Esau with leadership and influence.

He prays that many people and even nations will honor and serve him.

This is much bigger than personal wealth.

It speaks of future authority.

👑 Leadership over many people

🌍 Influence over nations

➡️ Isaac continues the blessing

---

## 👨 Be Lord Over Thy Brethren, And Let Thy Mother's Sons Bow Down To Thee

Now Isaac speaks directly about the family.

He intends for Esau to become the leader of his brothers.

This is striking because the reader already knows God's earlier promise:

**"The elder shall serve the younger."**

Isaac is attempting to give the leadership to Esau, but God had already declared that Jacob would become the covenant heir.

This shows that God's plan is greater than human plans.

👨 Isaac intends Esau to lead the family

📖 God had already promised the opposite years earlier

🙏 God's purpose will ultimately stand

➡️ Isaac finishes the blessing

---

## ✨ Cursed Be Every One That Curseth Thee, And Blessed Be He That Blesseth Thee

Isaac closes with words that echo God's covenant with Abraham.

Years earlier God told Abraham:

**"I will bless them that bless thee, and curse him that curseth thee."** (Genesis 12:3)

Now Isaac unknowingly passes that same covenant blessing to Jacob.

This is more than a father's personal wish.

It is the covenant God began with Abraham continuing through the next generation.

✨ Isaac repeats God's covenant promise

📖 This echoes Genesis 12:3

👑 The covenant blessing passes to Jacob, even though Isaac believes he is blessing Esau

➡️ The deception is complete, but Esau is about to return

# Genesis 27:30–33

# 🦌 Esau Returns

---

## ⏳ As Soon As Isaac Had Made An End Of Blessing Jacob…And Jacob Was Yet Scarce Gone Out

Everything happens within moments.

As soon as Isaac finishes blessing Jacob, Jacob leaves the tent.

**Scarce gone out** means **he had barely left**.

The timing could not have been any closer.

If Esau had returned just a few minutes earlier, the entire plan would have fallen apart.

⏳ Isaac finishes the blessing

🚶 Jacob has barely left the tent

⚠️ The timing is incredibly close

➡️ Esau returns from hunting

---

## 🏹 Esau His Brother Came In From His Hunting

After spending hours hunting, preparing the meat, and returning home, Esau finally arrives.

He has no idea that Jacob has already received the blessing.

As far as Esau knows, everything is happening exactly as Isaac planned.

🏹 Esau returns from hunting

🥩 He believes the blessing is still waiting for him

➡️ He presents the meal to Isaac

---

## 🍖 He Had Also Made Savoury Meat, And Brought It Unto His Father…Let My Father Arise, And Eat Of His Son's Venison, That Thy Soul May Bless Me

Esau prepares the meal exactly as Isaac requested.

He respectfully says,

**"Let my father arise and eat, so that you may bless me."**

These are almost the exact same words Jacob had already spoken just a short time earlier.

Esau has no idea someone has already taken his place.

🍖 Esau prepares the meal

🙏 He expects to receive the blessing

⚠️ He doesn't know Jacob has already come

➡️ Isaac is shocked

---

## 😳 Isaac His Father Said Unto Him, "Who Art Thou?"

Isaac is completely confused.

He already believes he has blessed Esau.

So when another voice says,

**"Father…"**

Isaac immediately asks,

**"Who are you?"**

This is the moment everything begins to unravel.

😳 Isaac is confused

❓ He realizes something is terribly wrong

➡️ Esau answers

---

## 👨 I Am Thy Son, Thy Firstborn Esau

Esau answers confidently.

**"I am your son, your firstborn Esau."**

At that instant, Isaac realizes he has been deceived.

Everything suddenly makes sense.

👨 Esau identifies himself

💥 Isaac realizes he has been deceived

➡️ Isaac reacts

---

## 😨 Isaac Trembled Very Exceedingly

This means Isaac shook violently with overwhelming emotion.

The words describe intense shock, fear, and amazement.

He suddenly realizes that someone else has already received the blessing.

Many Bible scholars also believe Isaac realizes something even deeper.

He may now understand that despite his own intentions to bless Esau, **God's will has prevailed**, just as God had told Rebekah years earlier.

😨 Isaac shakes with overwhelming shock

💥 He realizes he has been deceived

🙏 He may also recognize that God's purpose has been fulfilled

➡️ Isaac asks what happened

---

## ❓ Who? Where Is He That Hath Taken Venison, And Brought It Me? And I Have Eaten Of All Before Thou Camest

Isaac asks,

**"Who was here before you?"**

He realizes someone brought him the meal, he ate it, and he spoke the blessing.

The blessing has already been given.

There is no taking it back.

❓ Isaac asks who came first

🍖 He realizes he already ate the meal

👑 The blessing has already been spoken

➡️ Isaac gives his final answer

---

## 👑 Yea, And He Shall Be Blessed

Isaac does something surprising.

He does **not** try to cancel the blessing.

He does **not** attempt to give it back to Esau.

Instead, he says,

**"Yes…and he shall be blessed."**

Isaac recognizes that the blessing has been given and will stand.

Whether he fully understands it at that moment or not, God's promise that **"the elder shall serve the younger"** is now moving forward.

The covenant blessing has passed to Jacob.

👑 Isaac refuses to reverse the blessing

📖 The blessing is final

🙏 God's plan continues through Jacob

➡️ Esau is about to discover what has happened

# Genesis 27:34–40

# 😢 Esau Begs For A Blessing

---

## 😭 When Esau Heard The Words Of His Father, He Cried With A Great And Exceeding Bitter Cry

When Esau realizes Jacob has received the blessing, he completely breaks down.

This wasn't a quiet tear.

A **great and exceeding bitter cry** describes loud, uncontrollable crying filled with grief, heartbreak, and desperation.

To Esau, this wasn't simply losing a blessing.

He believed he had just lost the future he had expected his entire life.

It's important to remember the difference:

- 👑 **The birthright** was the legal inheritance of the firstborn. It included a larger inheritance and leadership of the family. Esau had willingly sold this to Jacob earlier for a bowl of stew.
- 🙏 **The blessing** was Isaac's formal declaration over the future. It confirmed leadership, inheritance, and, in this family, the continuation of God's covenant promises.

Esau had treated the birthright carelessly, but now he realizes what he has lost, and it is too late.

😭 Esau breaks down in uncontrollable grief

👑 The birthright and the blessing were related but not identical

⚠️ Esau now understands the value of what he once treated lightly

➡️ Esau pleads with Isaac

---

## 🙏 Bless Me, Even Me Also, O My Father

Esau desperately begs his father.

He isn't asking for money.

He isn't asking for land.

He's asking for the blessing he believed had belonged to him since birth.

His words show both desperation and heartbreak.

🙏 Esau begs for a blessing

💔 He still hopes something can be done

➡️ Isaac tells him what happened

---

## 🗣️ Thy Brother Came Subtly, And Hath Taken Away Thy Blessing

**Subtly** means **deceitfully**, **craftily**, or **by trickery**.

Isaac now knows exactly who came into the tent.

Jacob deceived him and received the blessing.

Isaac explains the truth to Esau.

🗣️ Subtly means deceitfully

🎭 Jacob received the blessing through deception

➡️ Esau responds with anger

---

## 😠 Is Not He Rightly Named Jacob?…For He Hath Supplanted Me These Two Times

The name **Jacob** comes from the idea of **grasping the heel** and came to describe someone who **grasps another's place** or **takes another's position**.

**Supplanted** means **to take someone else's place** or **replace them**.

Esau says,

"He's lived up to his name."

Then he says Jacob has done it **twice**.

First, he took the birthright.

Second, he has now taken the blessing.

It's worth remembering that Esau had **voluntarily sold** his birthright in Genesis 25.

At the time, he said,

"What profit shall this birthright do to me?"

Now, however, he blames Jacob for losing it.

😠 Jacob's name is connected with taking another's place

📖 Supplanted means to replace or take someone else's position

⚠️ Esau blames Jacob for both the birthright and the blessing

➡️ Esau asks if anything remains

---

## 🙏 Hast Thou Not Reserved A Blessing For Me?

Esau can't believe there is nothing left.

He asks his father,

"Don't you have another blessing for me?"

He still hopes Isaac can somehow give him what Jacob has received.

🙏 Esau begs for another blessing

💔 He hopes something is still available

➡️ Isaac explains why he cannot

---

## 👑 I Have Made Him Thy Lord…And All His Brethren Have I Given To Him For Servants

Isaac explains what he has already spoken over Jacob.

He has declared that Jacob will become the leader of the family.

The blessing has already been given.

In that culture, once a solemn blessing like this had been spoken, it was not something that could simply be taken back and given to someone else.

👑 Jacob has been declared family leader

📖 The blessing has already been spoken

⚠️ Isaac cannot simply reverse it

➡️ Isaac continues explaining

---

## 🌾 With Corn And Wine Have I Sustained Him…What Shall I Do Now Unto Thee, My Son?

Isaac has already prayed that Jacob would receive abundant crops, prosperity, and God's provision.

**Sustained** means **provided for** or **supported**.

Isaac feels he has already given away everything connected with the covenant blessing.

That's why he asks,

"What is left for me to give you?"

🌾 Sustained means provided for

🙏 Isaac believes he has already given the covenant blessing

➡️ Esau pleads once more

---

## 😭 Hast Thou But One Blessing, My Father?…Bless Me, Even Me Also…And Esau Lifted Up His Voice And Wept

Esau begs again.

He cannot accept that everything is gone.

**Lifted up his voice** means he cried out loudly.

This is deep grief.

He isn't quietly wiping away tears.

He is openly sobbing before his father.

For the first time, Esau truly understands the value of what has been lost.

😭 Esau cries out loudly

💔 His grief is overwhelming

⚠️ He realizes too late how valuable the blessing was

➡️ Isaac gives Esau his own prophecy

---

## ⚔️ Behold, Thy Dwelling Shall Be The Fatness Of The Earth, And Of The Dew Of Heaven From Above

Isaac now speaks over Esau.

Unlike Jacob's blessing, this is not the covenant blessing.

Instead, Isaac describes the future of Esau's descendants.

Esau's family will survive and become a nation, but they will not carry God's covenant promises.

🌎 Esau's descendants will become a nation

🙏 This is a prophecy about his future

➡️ Isaac describes Esau's life

---

## 🗡️ By Thy Sword Shalt Thou Live

Isaac tells Esau that his descendants will often live by warfare.

Their history would be marked by conflict, fighting, and defending themselves.

This became true of the nation of **Edom**, which descended from Esau.

🗡️ Esau's descendants become known for conflict

⚔️ Their history is marked by warfare

➡️ Isaac speaks about Jacob

---

## 👑 Thou Shalt Serve Thy Brother

This fulfills the prophecy God gave Rebekah before the twins were born.

"The elder shall serve the younger."

Jacob's family would become the covenant family through whom God's promises continued.

Esau's descendants would not carry that covenant.

👑 Esau will serve Jacob

📖 God's earlier prophecy begins to unfold

➡️ Isaac gives one final promise

---

## 🔓 It Shall Come To Pass When Thou Shalt Have The Dominion, That Thou Shalt Break His Yoke From Off Thy Neck

Isaac ends with hope.

Although Esau's descendants would serve Jacob's descendants for a time, that would not last forever.

**Dominion** means strength, independence, or gaining power.

**Break his yoke from off thy neck** means they would eventually throw off Jacob's rule and become independent.

History records that the nation of Edom was later ruled by Israel but eventually regained its independence for a time.

🔓 Dominion means gaining strength and independence

⛓️ Esau's descendants would not remain under Israel forever

📖 This is a prophecy about the future nation of Edom

➡️ Esau now turns his grief into anger toward Jacob

# Genesis 27:41–46

# 😠 Esau Wants Revenge

---

## 😡 Esau Hated Jacob Because Of The Blessing Wherewith His Father Blessed Him

Esau's anger turns into hatred.

He isn't just upset that Jacob tricked him.

In Esau's mind, Jacob has taken both his **birthright** and his **father's blessing**.

The relationship between the brothers is now completely broken.

😡 Esau's anger becomes hatred

💔 He blames Jacob for everything he has lost

⚠️ The family conflict reaches a dangerous point

➡️ Esau makes a deadly decision

---

## ❤️ Esau Said In His Heart…The Days Of Mourning For My Father Are At Hand; Then Will I Slay My Brother Jacob

**Said in his heart** means Esau made this decision within himself.

He wasn't saying it publicly.

He had already decided what he was going to do.

He thought,

"After my father dies and the mourning is over, I'm going to kill Jacob."

**Slay** simply means **to kill**.

Even in his anger, Esau waits because he doesn't want to add more grief to his father's final days.

❤️ "Said in his heart" means he made up his mind

⚔️ Slay means to kill

⏳ Esau decides to wait until after Isaac's death

➡️ Rebekah hears the plan

---

## 📢 These Words Of Esau Her Elder Son Were Told To Rebekah

Someone overhears Esau's plan and tells Rebekah.

The Bible doesn't tell us who.

What matters is that Rebekah now knows Jacob's life is in danger.

📢 Someone reports Esau's plan

⚠️ Rebekah realizes Jacob must leave immediately

➡️ She gives Jacob instructions

---

## 🏃 Obey My Voice, And Arise…Flee Thou To Laban My Brother

Rebekah tells Jacob to run.

**Flee** means **escape quickly**.

She sends him to her brother **Laban**, who lives back in Mesopotamia.

Laban is Jacob's **uncle**—Rebekah's brother, the same man we met when Abraham's servant came to find a wife for Isaac in Genesis 24.

🏃 Flee means escape quickly

👨 Laban is Jacob's uncle

🏠 Jacob will return to his mother's family

➡️ Rebekah thinks it will only be temporary

---

## ⏳ Tarry With Him A Few Days, Until Thy Brother's Fury Turn Away

**Tarry** means **stay** or **remain**.

Rebekah believes Esau's anger will cool off after a few days.

She has no idea that Jacob will actually remain away for about **20 years**.

This is one of the saddest moments in the story.

Rebekah thinks she's saying goodbye for a short time.

She never sees Jacob again.

⏳ Tarry means stay

😠 Rebekah expects Esau's anger to fade

💔 A few days become about 20 years

➡️ She hopes to bring Jacob home later

---

## 😔 Until Thy Brother's Anger Turn Away From Thee…And He Forget That Which Thou Hast Done

Rebekah hopes time will heal the relationship.

Notice that she now says,

**"What thou hast done."**

Earlier, she encouraged Jacob to carry out the plan and even told him,

"Upon me be thy curse."

Now she acknowledges that Jacob also bears responsibility for what happened.

She hopes Esau will eventually forgive him.

😔 Rebekah hopes time will calm Esau

🤝 She hopes the brothers can be reconciled

➡️ She promises to send for Jacob

---

## 📩 Then I Will Send, And Fetch Thee From Thence…Why Should I Be Deprived Also Of You Both In One Day?

Rebekah promises to send for Jacob when it is safe.

**Fetch thee** means **send for you to come home**.

When she says,

**"Why should I be deprived also of you both in one day?"**

she is talking about **both of her sons**.

If Esau kills Jacob, Esau would likely be punished or forced to flee because of the murder.

In one day, Rebekah could lose **both** sons—Jacob through death and Esau through the consequences of his actions.

📩 Fetch thee means send for you

👬 "Both" refers to Jacob and Esau

💔 Rebekah fears losing both of her sons

➡️ She now speaks to Isaac

---

## 😩 I Am Weary Of My Life Because Of The Daughters Of Heth

Rebekah does **not** tell Isaac that Esau wants to kill Jacob.

Instead, she gives another reason for sending Jacob away.

**Weary of my life** means,

"I am exhausted. I can't bear this anymore."

The **daughters of Heth** are Hittite women.

Esau had already married Hittite wives, and Genesis 26 tells us they were **a grief of mind** to Isaac and Rebekah because they did not worship the Lord.

Rebekah doesn't want Jacob to marry a Canaanite woman too.

😩 Weary of my life means deeply distressed

👰 The daughters of Heth were Hittite women

🙏 Rebekah wants Jacob to marry someone who follows the God of Abraham

➡️ She gives Isaac a reason to send Jacob away

---

## 💍 If Jacob Take A Wife Of The Daughters Of Heth…What Good Shall My Life Do Me?

Rebekah says,

"If Jacob marries one of these women too, what good will my life be?"

She is expressing how deeply she wants Jacob to marry within the family that still worships the Lord.

This also provides the perfect reason for Isaac to send Jacob back to Mesopotamia—where Rebekah's family lives—to find a wife.

Although Rebekah's immediate goal is protecting Jacob from Esau, God will also use this journey to continue His covenant plan.

💍 Rebekah wants Jacob to marry a woman who worships God

🏃 Sending Jacob away also protects his life

📖 God uses the family's crisis to accomplish His larger plan`;

export const GENESIS_TWENTY_SEVEN_PERSONAL_SECTIONS = parseGenesisTwentySevenRawNotes(GENESIS_TWENTY_SEVEN_RAW_NOTES);
