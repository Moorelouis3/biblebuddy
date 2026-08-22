export type ProverbsTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwentySevenRawNotes(rawText: string): ProverbsTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 27:${startVerse}` : `Proverbs 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Proverbs 27 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TWENTY_SEVEN_RAW_NOTES = `# Proverbs 27:1-3
# ⚖️ Boasting And Heavy Wrath
---
## 📅 Boast Not Thyself Of To Morrow

"To boast" means speaking with confident pride about something.

No one can control what a single day holds.

Plans can fall apart in a single day despite careful preparation.

The New Testament gives this same warning in the book of James.

Real confidence rests in God, not in a day that has not come yet.

🗣️ Boast means proud confident speech

⏳ No one controls what a day brings

📜 James repeats this same warning

📖 Confidence belongs in God, not tomorrow

## 👄 Let Another Man Praise Thee, And Not Thine Own Mouth

This proverb warns against praising your own accomplishments.

Genuine honor comes from someone else's honest observation, not your own words.

The verse repeats the same idea twice for emphasis, using a stranger and thine own lips.

Hebrew poetry often says one idea two ways to make sure it lands.

Self praise sounds hollow, no matter how true it might be.

🗣️ Warns against praising yourself

🎗️ Honor should come from someone else

🔁 The line repeats the point twice

📖 Self praise always sounds hollow

## 🪨 A Stone Is Heavy, And The Sand Weighty

Stone and sand were both common heavy loads in the ancient world.

Sand especially could settle into something surprisingly heavy to carry.

Both images picture something already difficult to bear.

That weight becomes the measuring stick for the next line.

🪨 Stone was a genuinely heavy load

🏖️ Sand could settle into real weight

⚖️ Both picture something hard to carry

➡️ Sets up a heavier comparison next

## 😡 But A Fool's Wrath Is Heavier Than Them Both

Wrath here means uncontrolled, burning anger.

A fool's anger outweighs even stone and sand in this comparison.

Physical weight can eventually be set down and rested from.

An angry fool's rage exhausts everyone around him without ever being set down.

That is a harder burden than anything physical.

😡 Wrath means uncontrolled burning anger

⚖️ It outweighs even stone and sand

🪨 Physical weight can be set down

📖 A fool's rage never gets set down

# Proverbs 27:4-6
# 💔 Envy And The Wounds Of A Friend
---
## 🔥 Wrath Is Cruel, And Anger Is Outrageous

Wrath and anger both describe fierce, uncontrolled emotion.

Cruel means willing to cause real harm without caring.

Outrageous here means anger that goes far past any reasonable limit.

Both emotions can turn violent in a single moment.

😡 Wrath means fierce uncontrolled emotion

💔 Cruel means willing to cause harm

🔥 Outrageous means far past reasonable limits

➡️ Both can turn violent quickly

## ❓ But Who Is Able To Stand Before Envy

This question expects one answer, nobody.

Envy means resenting someone else's blessing as if it were stolen from you.

Anger can cool down once the moment passes.

Envy often lingers quietly for years, feeding on someone else's success.

That is why the proverb ranks it above even cruel wrath.

❓ The question expects the answer nobody

💚 Envy means resenting someone else's blessing

🔥 Anger can cool down over time

📖 Envy lingers longer than open anger

## 🗣️ Open Rebuke Is Better Than Secret Love

Rebuke means honest correction, even when it stings to hear.

Open means spoken plainly instead of hidden away.

Secret love that never says anything helpful cannot actually protect anyone.

A friend willing to correct you openly is doing real love's work.

🗣️ Rebuke means honest, stinging correction

👀 Open means spoken plainly, not hidden

🤐 Silent love cannot protect anyone

📖 Honest correction is real love's work

## 🩹 Faithful Are The Wounds Of A Friend

Faithful here means trustworthy and reliable, not just kind.

A friend's honest words can sting like a small wound.

That sting comes from someone who genuinely wants what is best for you.

A true friend risks the discomfort of honesty instead of staying comfortably silent.

🤝 Faithful means trustworthy and reliable

🩹 A friend's honesty can sting briefly

❤️ The sting comes from real care

📖 True friends risk honesty over comfort

## 💋 But The Kisses Of An Enemy Are Deceitful

A kiss in this culture was a common greeting between friends.

An enemy's kiss looks warm on the surface while hiding real harm underneath.

Deceitful means intentionally misleading, not just mistaken.

The comparison contrasts a friend's painful honesty with an enemy's pleasant lie.

💋 A kiss was a common friendly greeting

🎭 An enemy's kiss hides real harm

🐍 Deceitful means intentionally misleading

📖 Painful honesty beats a pleasant lie

# Proverbs 27:7-9
# 🍯 Appetite, Distance, And Sweet Counsel
---
## 🍯 The Full Soul Loatheth An Honeycomb

Honeycomb was one of the sweetest foods available in the ancient world.

A person who has already eaten well has no appetite left for something sweet.

Loatheth means feeling real disgust, not just mild disinterest.

Even the best food loses its appeal to someone who is already full.

🍯 Honeycomb was a rare, sweet food

🙅 Loatheth means genuine disgust, not boredom

🍽️ A full person wants nothing more

📖 Even sweetness fails a satisfied appetite

## 😖 But To The Hungry Soul Every Bitter Thing Is Sweet

Need changes how something actually tastes to the person experiencing it.

A truly hungry person will eat food that would normally taste bitter or unpleasant.

This proverb pictures real physical hunger to make a point about perspective.

Circumstance can completely change what feels good or bad in the moment.

🍽️ Hunger changes how food actually tastes

😖 Bitter things become welcome when desperate

🔄 Circumstance reshapes what feels good

📖 Need can make anything taste sweet

## 🪺 As A Bird That Wandereth From Her Nest

A bird belongs in its nest, caring for its eggs and its young.

A bird wandering away from that nest has left the one place it was meant to be.

This pictures someone who has left home, family, or the community they belong to.

Wandering here is not adventure, it is loss.

🪺 A nest is where a bird belongs

🕊️ A wandering bird has left its place

🏠 The image pictures leaving home or family

📖 This kind of wandering is loss, not adventure

## 🌸 Ointment And Perfume Rejoice The Heart

Ointment and perfume were valuable, pleasant smelling luxuries in the ancient world.

They were used to refresh guests, mark celebrations, and honor important visitors.

Rejoice here means genuinely lifting someone's mood, not just pleasing their senses.

A good scent could turn an ordinary moment into something memorable.

🌸 Ointment and perfume were valued luxuries

🎉 They marked celebration and honored guests

😊 Rejoice means genuinely lifting the mood

📖 A good scent made moments memorable

## 🗣️ So Doth The Sweetness Of A Man's Friend By Hearty Counsel

Hearty counsel means advice given with real warmth, not cold correction.

A friend's honest, caring advice can lift someone's spirit the same way a good scent does.

The comparison connects something pleasant for the senses to something pleasant for the soul.

Wise, warm friendship refreshes a person just as much as any perfume.

🗣️ Hearty counsel means warm, caring advice

🌸 It compares to a pleasant scent

❤️ It refreshes the soul, not just senses

📖 Warm friendship refreshes like perfume does

# Proverbs 27:10-12
# 🏘️ Friendship, Foresight, And The Simple
---
## 🤝 Thine Own Friend, And Thy Father's Friend, Forsake Not

Forsake means abandoning someone completely, not just growing distant.

This verse tells the reader to keep both personal friendships and inherited family friendships.

A father's friend often carried decades of trust built before the reader was even born.

Loyalty to those relationships mattered as much as loyalty to blood family.

🤝 Forsake means abandoning someone completely

👨‍👦 A father's friend carried inherited trust

📆 That trust often spanned decades

📖 Loyalty extended beyond blood family

## ⚡ Neither Go Into Thy Brother's House In The Day Of Thy Calamity

Calamity means sudden disaster or serious trouble.

This does not forbid ever asking a brother for help.

It warns against relying on distant family who may be slow to respond in a real crisis.

A brother far away could not reach you quickly when trouble struck fast.

⚡ Calamity means sudden disaster or trouble

🚫 This is not a total ban on family

🐌 Distant family responds slowly in crisis

📖 Fast trouble needs a fast response

## 📍 Better Is A Neighbour That Is Near Than A Brother Far Off

This is the proverb's actual point, stated plainly at the end.

A nearby neighbor can show up within minutes during an emergency.

A brother living far away might take days to even hear the news.

Physical closeness can matter more than family title when trouble hits fast.

📍 States the proverb's point plainly

🏃 A nearby neighbor can respond fast

📬 A distant brother hears the news late

📖 Closeness can outweigh family title

## 👨‍👦 My Son, Be Wise, And Make My Heart Glad

This section shifts from friendship advice to a father speaking directly to his son.

A father's joy is tied to watching his child grow into real wisdom.

Wisdom here is not just cleverness, it is godly character.

That kind of growth brings a parent real, lasting gladness.

👨‍👦 A father speaks directly to his son

😊 A child's wisdom brings a parent joy

🧠 Wisdom means godly character, not cleverness

📖 Growth brings lasting parental gladness

## 🛡️ That I May Answer Him That Reproacheth Me

Reproacheth means insults or criticizes sharply.

A father was often judged in his community by how his children turned out.

A wise son gave his father a real answer against unfair criticism.

The son's character became living proof against anyone who doubted the father.

🗣️ Reproacheth means sharp insult or criticism

👀 A father was judged by his children

🛡️ A wise son answered that criticism

📖 Character became living proof of the father

## 👀 A Prudent Man Foreseeth The Evil, And Hideth Himself

Prudent means careful and wise in seeing what is coming.

Foreseeth means recognizing danger before it actually arrives.

This exact idea already appears earlier in Proverbs chapter twenty two.

Hiding here means taking real, practical steps to avoid unnecessary harm.

🧠 Prudent means careful and forward thinking

👀 Foreseeth means spotting danger early

🔁 This idea repeats from chapter twenty two

📖 Hiding means taking real precaution

## 🙈 But The Simple Pass On, And Are Punished

Simple here does not mean unintelligent, it means untrained and easily led.

Passeth on pictures someone walking straight into danger without noticing it.

Punished here often just means suffering the natural consequences of that carelessness.

The difference between the prudent and the simple is attention, not intelligence.

🙈 Simple means untrained, not unintelligent

🚶 Passeth on means walking into danger blind

💥 Punished means facing natural consequences

📖 The real difference is attention, not intelligence

# Proverbs 27:13-15
# 🤝 Surety, A Loud Blessing, And A Leaking Roof
---
## 👕 Take His Garment That Is Surety For A Stranger

Surety means promising to cover someone else's debt if they cannot pay it.

This exact warning already appears nearly word for word back in Proverbs chapter twenty.

A garment could legally be held as collateral until a debt was settled.

Taking the coat of someone who guaranteed a stranger's debt was a fair, practical penalty.

💰 Surety means covering someone else's debt

🔁 This warning repeats from chapter twenty

👕 A garment could be held as collateral

📖 The penalty fit a risky promise

## 📢 He That Blesseth His Friend With A Loud Voice, Rising Early In The Morning

This pictures someone shouting a loud, public blessing at an unreasonable early hour.

On the surface that sounds like genuine kindness and enthusiasm.

Something done that loudly and that early can actually feel intrusive or performed.

It shall be counted a curse to him means the gesture backfires completely.

Good intentions delivered the wrong way can land as an insult instead of a gift.

📢 A loud, early blessing sounds excessive

🎭 It can feel performed instead of sincere

🔄 It backfires and lands as a curse

📖 Good intentions can still land wrong

## 🌧️ A Continual Dropping In A Very Rainy Day

Ancient roofs often leaked steadily during a hard, lasting rain.

That constant dripping sound was a small but relentless annoyance no one could escape indoors.

The proverb compares that dripping directly to a contentious, quarreling woman.

This same comparison to a quarreling spouse appears several other times in Proverbs.

The comparison is about a personality that never lets an argument rest, not about any one gender.

🌧️ Ancient roofs leaked during hard rain

💧 The dripping was constant and inescapable

🔁 Proverbs repeats this comparison elsewhere

📖 It pictures conflict that never rests

# Proverbs 27:16-18
# 💨 Hidden Winds And Sharpened Faces
---
## 💨 Whosoever Hideth Her Hideth The Wind

This verse continues describing the same contentious woman from the line before it.

Scholars consider this one of the hardest verses in Proverbs to translate with full confidence.

The wind cannot be grabbed, contained, or controlled by human hands.

Trying to silence or control her is being compared to that same impossible task.

🔁 This continues the previous verse's picture

❓ Scholars find this verse genuinely difficult

💨 Wind cannot be grabbed or controlled

📖 Some behavior resists control the same way

## 🌸 And The Ointment Of His Right Hand, Which Bewrayeth Itself

Bewrayeth is an old word meaning reveals or gives itself away.

Perfumed oil held in an open hand cannot stay hidden, its scent spreads on its own.

This adds a second image to the same impossible task as trying to hold the wind.

Some things simply cannot be concealed no matter how hard someone tries.

🗣️ Bewrayeth means reveals or gives away

🌸 Oil in the hand cannot stay hidden

💨 It matches the impossible wind image

📖 Some things resist being concealed at all

## ⚒️ Iron Sharpeneth Iron

Iron tools in this culture were sharpened by rubbing them directly against another piece of iron.

That process created friction, sparks, and real resistance before the blade ever got sharper.

This is one of the most quoted verses in all of Proverbs.

Friction with the right person is not always something to avoid.

⚒️ Iron sharpened iron through friction

✨ The process made sparks before results

🌟 This verse is widely quoted today

📖 Useful friction is not always bad

## 🌳 Whoso Keepeth The Fig Tree Shall Eat The Fruit Thereof

Fig trees required real, patient work, watering, pruning, and protecting the fruit as it grew.

Whoever put in that ongoing care was the one who got to enjoy the harvest.

This pictures a simple, fair connection between effort and reward.

Nothing about this verse suggests instant results.

🌳 Fig trees required patient, ongoing care

👨‍🌾 The caretaker earned the harvest

⚖️ Effort and reward stayed connected directly

📖 Nothing here promised instant results

## 🎖️ So He That Waiteth On His Master Shall Be Honoured

Waiteth on here means faithfully serving, not simply standing around.

This applies the fig tree picture directly to a servant's steady, attentive work.

A servant who cared for his master's needs over time earned real honor in return.

Faithful effort pays off in relationships just as much as it does with a fruit tree.

🧑‍🍳 Waiteth on means faithful, steady service

🌳 It applies the fig tree picture directly

🎖️ Steady service earned real honor

📖 Faithful effort pays off with people too

# Proverbs 27:19-21
# 🪞 Reflections, Appetite, And The Refining Fire
---
## 💧 As In Water Face Answereth To Face

Still water in the ancient world worked the way a mirror does today.

A person looking into calm water sees their own face reflected back at them.

This verse extends that picture to something less visible, the human heart.

What is inside a person tends to show up in how another person responds.

💧 Still water worked like an ancient mirror

👤 A face reflects back exactly as it is

❤️ The heart works the same way

📖 What is inside shows in how others respond

## ⚰️ Hell And Destruction Are Never Full

Hell here translates the Hebrew word Sheol, the ancient term for the realm of the dead.

Destruction translates a related word, Abaddon, meaning ruin or the place of the dead.

Both words picture something that keeps receiving without ever reaching a limit.

Death takes in every generation and is never described as finally satisfied.

⚰️ Hell translates the Hebrew word Sheol

💀 Destruction translates the word Abaddon

♾️ Both picture something without any limit

📖 Death receives every generation endlessly

## 👀 So The Eyes Of Man Are Never Satisfied

This verse compares human desire directly to death itself.

Eyes here means human wanting, always looking for the next thing to have or see.

Satisfying one desire almost always reveals another one waiting right behind it.

Unchecked wanting can grow just as endless as death itself.

👀 Eyes here means ongoing human desire

🔄 One satisfied want reveals another

♾️ Wanting can grow just as endless

📖 Unchecked desire mirrors death's hunger

## 🔥 As The Fining Pot For Silver, And The Furnace For Gold

A fining pot and a furnace both burned away impurities to reveal pure metal underneath.

This exact image already appears earlier in Proverbs chapter seventeen.

The heat did not create the metal's value, it only exposed what was already real.

So is a man to his praise means how someone reacts to praise reveals their true character.

🔥 Fining pots and furnaces purified metal

🔁 This image repeats from chapter seventeen

✨ Heat revealed value, it did not create it

📖 Praise reveals a person's true character

# Proverbs 27:22-24
# 🌾 A Fool's Grain And A Fading Crown
---
## 🌾 Though Thou Shouldest Bray A Fool In A Mortar Among Wheat With A Pestle

A mortar and pestle were used to crush grain into fine flour.

Bray here means to pound or crush thoroughly, not the sound an animal makes.

This pictures literally grinding a fool down alongside wheat, as extreme as that sounds.

Yet his foolishness would not depart from him means even that could not change him.

Some stubborn foolishness resists even the harshest correction.

🌾 A mortar and pestle crushed grain

🔨 Bray means pound or crush thoroughly

🙅 Even crushing could not fix him

📖 Some foolishness resists harsh correction

## 🐑 Be Thou Diligent To Know The State Of Thy Flocks

Diligent means careful and consistent, not occasional or rushed.

A shepherd in this culture needed to know each animal's health and condition personally.

This begins a shift from short sayings to sustained, practical farming advice.

Real wisdom includes paying close attention to ordinary daily responsibilities.

🐑 Diligent means careful, consistent attention

🧑‍🌾 A shepherd knew each animal personally

🔀 The chapter shifts to practical advice

📖 Wisdom includes ordinary daily duties

## 👑 For Riches Are Not For Ever

This verse turns from flocks to a warning about wealth in general.

Riches here can disappear through disaster, theft, bad decisions, or simple time.

Even a crown, the highest symbol of power in the ancient world, was not guaranteed to last.

Nothing built on money or status alone was described as truly secure.

💰 Riches can vanish through many causes

👑 Even a crown is not guaranteed to last

🏛️ Money and status alone gave no security

📖 Nothing built on wealth was truly secure

# Proverbs 27:25-27
# 🐐 Providing From The Land
---
## 🌱 The Hay Appeareth, And The Tender Grass Sheweth Itself

This describes the normal yearly cycle of grass growing back after being cut or grazed.

Hay appearing marked the start of a new season of provision for the flocks.

Herbs of the mountains gathered adds wild growth beyond the cultivated fields.

This verse pictures the land itself steadily supplying what a family needed.

🌱 Hay marked a new growing season

🏔️ Mountain herbs added wild provision

🔄 This follows a normal yearly cycle

📖 The land steadily supplied real need

## 🐑 The Lambs Are For Thy Clothing, And The Goats Are The Price Of The Field

Wool from lambs was a primary source of clothing material in this culture.

Goats could be sold or traded for enough value to purchase land.

This shows flocks functioning as a full, working economy, not just food.

Careful, diligent flock keeping from verse twenty three produced real, lasting wealth.

🐑 Lamb wool provided clothing material

🐐 Goats could be traded for land

💰 Flocks functioned as a working economy

📖 Diligent care produced lasting wealth

## 🥛 And Thou Shalt Have Goats' Milk Enough For Thy Food

Goats' milk provided a steady, renewable food source beyond just meat or wool.

This provision covered three separate groups by name.

The man himself, his whole household, and his maidens all shared in it.

Maidens here likely refers to female servants who were also part of the household.

The chapter closes by showing that diligent work provides for everyone under someone's care.

Not just for the person in charge.

🥛 Goats' milk was steady, renewable food

👪 Provision covered the whole household

🏠 Maidens means household servants too

📖 Diligent work provides for everyone
`.trim();

export const PROVERBS_TWENTY_SEVEN_PERSONAL_SECTIONS = parseProverbsTwentySevenRawNotes(PROVERBS_TWENTY_SEVEN_RAW_NOTES);
