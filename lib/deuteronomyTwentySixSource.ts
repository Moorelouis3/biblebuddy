export type DeuteronomyTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwentySixRawNotes(rawText: string): DeuteronomyTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 26:${startVerse}` : `Deuteronomy 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Deuteronomy 26 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWENTY_SIX_RAW_NOTES = `# Deuteronomy 26:1-4
# 🧺 Bringing The First Basket Of Fruit
---
## 🏡 When Thou Art Come In Unto The Land

This command looks ahead to a future not yet arrived.

Israel was still years away from crossing into Canaan.

The law waited until the people had actually entered and settled.

This ritual only starts once the wandering ends.

🏡 Written for a future entry, not the wilderness

⏳ Israel was still years away from Canaan

🚶 The wandering had to end first

📖 This ritual begins only after settling down

---

## 🌾 Possessest It, And Dwellest Therein

"Possessest" means owning the land permanently, not just passing through.

"Dwellest" means actually living there day to day.

Together the words describe full settled life, not a visit.

This offering was tied to permanent life in the land, not conquest.

🌾 Possessest means permanent ownership

🏠 Dwellest means actual daily living

🚫 Not a visit or a raid

📖 The offering ties to settled life

---

## 🧺 The First Of All The Fruit Of The Earth

"Firstfruits" means the earliest crops ready for harvest each year.

Giving that first portion away took real trust.

No farmer could yet know how the rest of the harvest would turn out.

Giving first, before knowing the total, was itself an act of faith.

🧺 Firstfruits means the earliest harvest

🙏 Given before the rest was known

⚠️ No guarantee more crops would come

📖 Giving first was itself an act of trust

---

## 🧺 Shalt Put It In A Basket

The basket itself was a simple farming tool, not a fancy container.

Carrying the fruit this way kept the ritual close to ordinary daily work.

God did not ask for something expensive or hard to obtain.

He asked for something already sitting in every farmer's hands.

🧺 A basket was a common farm tool

🌾 Kept the ritual tied to daily work

💰 Nothing expensive or rare was required

📖 God asked for what was already at hand

---

## 🏛️ The Place Which The LORD Thy God Shall Choose

This refers to the one central worship site, not any local altar.

At this point in Israel's history, that place would later be Jerusalem.

Centralizing this offering kept Israel from drifting into mixed local worship.

One place, one altar, kept the whole nation united around the same God.

🏛️ One central worship site, not a local altar

🏙️ Later fixed at Jerusalem

🚫 Prevented drifting into mixed local worship

📖 One altar kept the nation united

---

## 👳 The Priest That Shall Be In Those Days

This phrase does not name a specific priest by title.

It simply means whoever was serving in that role when the worshiper arrived.

The ritual did not depend on one famous individual, like Aaron.

The office mattered more than the man who happened to be holding it.

👳 No specific priest named

🔄 Whoever was serving at the time

🏛️ The office mattered, not the man

📖 The ritual outlived any one priest

---

## 🗣️ I Profess This Day Unto The LORD Thy God

"Profess" means to state something formally and publicly, out loud.

This was not a private, silent prayer said only in the heart.

The worshiper had to speak the words where the priest could hear them.

Saying it out loud made the declaration official and binding.

🗣️ Profess means a formal, spoken statement

🙊 Not a silent, private prayer

👂 Spoken so the priest could hear

📖 Speaking it made the declaration binding

---

## 🍞 The Priest Shall Take The Basket, And Set It Down Before The Altar

The worshiper's part ended the moment the basket left his hands.

From there, the priest carried it the rest of the way.

Setting it before the altar formally offered the gift to God.

The basket and the spoken words worked together as one single act.

🤲 The worshiper's role ended at the basket

👳 The priest carried it the rest

🔥 Setting it down formally offered the gift

📖 Basket and words together made one offering

# Deuteronomy 26:5-11
# 📜 The Confession Of A Wandering People
---
## 😢 A Syrian Ready To Perish Was My Father

"Syrian" here means an Aramean, from the region later called Syria.

This refers to Jacob, whose father in law Laban lived in that region.

"Ready to perish" means close to death, wandering without land or security.

The worshiper's own ancestor started out with almost nothing.

😢 Syrian means Aramean, from that region

👴 This refers to Jacob

⚠️ Ready to perish means near death

📖 The family started with almost nothing

---

## 🚶 Sojourned There With A Few

"Sojourned" means living somewhere temporarily, without owning the land.

Jacob's family entered Egypt as outsiders, not as citizens or landowners.

"With a few" means the family arrived small, only a handful of people.

Genesis 46 counts that original group at seventy people total.

🚶 Sojourned means living there temporarily

🌍 They entered Egypt as outsiders

👨‍👩‍👧‍👦 With a few means a small group

📖 Genesis 46 counts seventy people total

---

## 🌾 Became There A Nation, Great, Mighty, And Populous

This one sentence covers hundreds of years in a single breath.

A family of seventy people grew into an entire nation in Egypt.

"Great, mighty, and populous" describes real numbers, not just a feeling of pride.

God's promise to Abraham, to multiply his family, was already being fulfilled.

🌾 Seventy people grew into a nation

📈 Great, mighty, populous means real numbers

⏳ Hundreds of years compressed into one line

📖 Fulfilled God's promise to Abraham

---

## ⛓️ The Egyptians Evil Entreated Us, And Afflicted Us, And Laid Upon Us Hard Bondage

"Evil entreated" means treated cruelly and unfairly on purpose.

"Afflicted" adds ongoing suffering on top of that cruelty.

"Hard bondage" names it plainly as forced, unpaid slave labor.

Three different words stack up to describe one long, worsening nightmare.

⛓️ Evil entreated means treated cruelly

😣 Afflicted means ongoing suffering

🔨 Hard bondage means forced slave labor

📖 Three words describe one worsening nightmare

---

## 🙏 We Cried Unto The LORD God Of Our Fathers

"Cried" means calling out loud, in real desperation.

It was not a quiet complaint kept to themselves.

Calling him the God "of our fathers" reached back to Abraham's promise.

Israel was praying to a God their family already knew.

🙏 Cried means calling out loud

😢 Not a quiet, private complaint

👴 Of our fathers points back to Abraham

📖 They already knew this God

---

## 👀 Looked On Our Affliction, And Our Labour, And Our Oppression

God's response is described using three separate words on purpose.

"Affliction" points to their emotional suffering under Egypt's cruelty.

"Labour" points to the physical exhaustion of forced work.

"Oppression" points to the ongoing pressure of an unjust system pressing on them.

👀 God saw three kinds of suffering

😞 Affliction means emotional suffering

💪 Labour means physical exhaustion

📖 Oppression means constant unjust pressure

---

## 💪 With A Mighty Hand, And With An Outstretched Arm

"With a mighty hand" pictures God's raw power breaking Pharaoh's grip.

This exact phrase becomes a fixed formula, repeated again and again through Deuteronomy.

The same verse also names terribleness, signs, and wonders as further proof.

Together, these describe one rescue from every possible angle.

💪 Mighty hand means raw power

🦾 Outstretched arm means the same power extended

📜 A formula repeated through Deuteronomy

📖 One rescue described from every angle

---

## 🍯 A Land That Floweth With Milk And Honey

This phrase does not describe a literal river of milk or honey.

It means a land rich enough to support herds and wild bees with ease.

Milk represents healthy livestock, and honey represents abundant, natural food.

It became a shorthand phrase for the promised land's fertility.

🍯 Not a literal river of food

🐄 Milk represents healthy livestock

🐝 Honey represents natural abundance

📖 Shorthand for the land's fertility

---

## 🧺 I Have Brought The Firstfruits Of The Land

The whole spoken history in this passage leads back to this one basket.

The worshiper does not just recite the past, he connects it to the fruit.

Remembering the exodus is what gives the gift its real meaning.

Gratitude only makes sense once the whole story is remembered first.

🧺 The history leads back to the basket

🗣️ Remembering connects the past to the gift

🙏 Gratitude follows remembering, not the reverse

📖 The story gives the gift its meaning

---

## 🙇 Worship Before The LORD Thy God

"Worship" here involved physically bowing down, not just a feeling of respect.

The idea behind it pictures someone lowering themselves to the ground.

This was a full body response, not only an inward attitude.

The whole ritual ended with the body matching what the heart had declared.

🙇 Worship meant physically bowing down

🙏 More than an inward feeling

🧍 A full body response

📖 Body matched what the heart declared

---

## 🎉 Thou Shalt Rejoice In Every Good Thing

This command is not optional or merely suggested.

Celebrating the harvest was treated as an actual duty, not a private choice.

Gratitude here takes the shape of real joy, not quiet politeness.

God wanted a party, not just a formal transaction at the altar.

🎉 Rejoicing was commanded, not optional

🎊 A duty, not a private choice

😄 Real joy, not quiet politeness

📖 God wanted celebration, not a transaction

---

## 🤝 Thou, And The Levite, And The Stranger That Is Among You

The Levite owned no land and could not grow his own firstfruits.

The "stranger" was a foreigner living among Israel without inherited property either.

Both groups depended on others for a share in the harvest joy.

Israel's celebration was never meant to be a private, family only affair.

🤝 The Levite owned no land

🌍 The stranger lived among Israel without land

🍇 Both depended on others to share

📖 Celebration was never private to one family

# Deuteronomy 26:12-15
# 🍞 The Third Year Tithe
---
## 📅 The Third Year, Which Is The Year Of Tithing

Israel gave a tithe most years, but the third year worked differently.

This special tithe stayed local instead of traveling to the central sanctuary.

It functioned like a dedicated welfare year built into the farming calendar.

The rhythm of giving was not identical every single year.

📅 The third year worked differently

🏠 This tithe stayed local, not central

🤝 A built in welfare year

📖 Giving was not the same every year

---

## 👪 The Levite, The Stranger, The Fatherless, And The Widow

These four groups are named together often in this law.

None of them owned farmland of their own to harvest.

The Levite served at the sanctuary instead of working fields.

The other three simply had no family land or protector to rely on.

👪 Four groups with no farmland

⛪ The Levite served instead of farming

🌍 The stranger had no inherited land

📖 The fatherless and widow lacked a protector

---

## 🍽️ Eat Within Thy Gates, And Be Filled

This tithe never left the local town at all.

"Within thy gates" simply means inside the community's own walls.

Unlike the festival tithe, this food was not carried to a central altar.

Local hunger got a local answer, right where the need actually was.

🍽️ This tithe stayed inside the town

🚪 Within thy gates means the local community

🏛️ Unlike the festival tithe eaten centrally

📖 Local need met with a local answer

---

## 🏠 I Have Brought Away The Hallowed Things Out Of Mine House

"Hallowed" means set apart as holy, not ordinary property anymore.

Once tithed, that portion no longer belonged to the farmer at all.

Saying it out loud turned private obedience into a formal, spoken record.

The declaration made honesty checkable, not just something claimed in private.

🏠 Hallowed means set apart as holy

🚫 No longer the farmer's own property

🗣️ Spoken aloud, not just done privately

📖 Honesty became a checkable, formal record

---

## ✅ I Have Not Transgressed Thy Commandments, Neither Have I Forgotten Them

This line functions like a sworn legal oath, not a casual comment.

"Transgressed" means broken or crossed over a clear boundary on purpose.

The worshiper had to affirm both correct action and correct memory.

Forgetting a command was treated as seriously as breaking one outright.

✅ Functions like a sworn legal oath

🚫 Transgressed means crossing a boundary on purpose

🧠 Both action and memory were required

📖 Forgetting counted as seriously as breaking

---

## 😢 I Have Not Eaten Thereof In My Mourning

Mourning customs in this culture could involve fasting or ritual impurity.

Eating the holy tithe while in that state would have defiled it.

The farmer had to keep grief and sacred food carefully separated.

Even personal sorrow was not allowed to compromise a sacred offering.

😢 Mourning could bring ritual impurity

🚫 Impurity would have defiled the tithe

🍞 Grief and sacred food stayed separate

📖 Personal sorrow could not compromise worship

---

## 💀 Nor Given Ought Thereof For The Dead

Surrounding nations had a custom of leaving food offerings for dead ancestors.

This law directly forbids using the holy tithe for that pagan practice.

Israel's dead received honor through memory and burial, never through fed offerings.

Worship stayed pointed at the living God, never redirected toward the dead.

💀 Neighboring nations fed offerings to the dead

🚫 The tithe could never be used that way

🙏 Israel honored the dead through memory instead

📖 Worship stayed aimed at the living God

---

## ☁️ Look Down From Thy Holy Habitation, From Heaven

The prayer suddenly shifts from a legal declaration into an actual request.

"Holy habitation" pictures God's dwelling place as high above, in heaven itself.

After proving obedience, the worshiper finally asks God to act in return.

Obedience came first, and the request for blessing followed only after.

☁️ The prayer shifts to a request

🏠 Holy habitation means God's home in heaven

🙏 Obedience is declared before blessing is asked

📖 Blessing follows obedience, not before it

# Deuteronomy 26:16-19
# 🤝 The Covenant Sealed
---
## 📜 This Day The LORD Thy God Hath Commanded Thee

The phrase "this day" appears constantly throughout Deuteronomy on purpose.

It keeps pushing the command out of ancient history and into the present.

Every generation reading this was meant to feel personally addressed, not just informed.

The covenant was never meant to feel like old news.

📜 This day repeats often in Deuteronomy

⏰ It pushes the command into the present

🙋 Every generation felt personally addressed

📖 The covenant was never old news

---

## ❤️ With All Thine Heart, And With All Thy Soul

This exact phrase already appeared as the heart of the Shema, in Deuteronomy 6.

Repeating it here ties this ordinary offering back to Israel's central command.

"Heart" points to full inward devotion, and "soul" to the whole of a life.

Even a basket of fruit was meant to carry that same total devotion.

❤️ Echoes the Shema from Deuteronomy 6

🧠 Heart means full inward devotion

🫁 Soul means the whole of a life

📖 Even fruit carried total devotion

---

## ✍️ Thou Hast Avouched The LORD This Day To Be Thy God

"Avouched" is an old legal word meaning formally declared or affirmed.

It carries the weight of signing a contract, not just saying something nice.

Israel is pictured publicly choosing, and naming, exactly who their God is.

This was a specific, spoken commitment, not a vague feeling.

✍️ Avouched means formally declared

📜 Carries the weight of a signed contract

🙋 Israel publicly named their God

📖 A specific commitment, not a vague feeling

---

## 💎 The LORD Hath Avouched Thee To Be His Peculiar People

"Peculiar" in this old English does not mean strange or odd.

It means treasured, set apart, and specially owned by God.

Both sides made the same declaration on the same day, together.

God's avouchment of Israel matched Israel's avouchment of God, word for word.

💎 Peculiar means treasured, not odd

🤝 Both sides declared on the same day

🔄 God's declaration matched Israel's declaration

📖 A two sided covenant, sealed together

---

## 👑 To Make Thee High Above All Nations Which He Hath Made

This promise names three specific rewards, praise, name, and honour.

"Praise" means other nations would speak well of Israel.

"Name" means Israel's reputation itself would carry real weight.

"Honour" means genuine respect, not fear or resentment from watching nations.

👑 Three rewards named together

🗣️ Praise means nations speaking well of Israel

📛 Name means a weighty reputation

📖 Honour means real respect, not fear

---

## ⛪ That Thou Mayest Be An Holy People Unto The LORD Thy God

"Holy" means set apart for God's own purpose, not simply morally good.

This chapter opened with one basket of fruit, brought in quiet obedience.

It closes with an entire nation declared holy in the sight of every other nation.

Small, faithful acts were always building toward that much larger identity.

⛪ Holy means set apart for God

🧺 Opened with one basket of fruit

🌍 Closes with a nation's identity

📖 Small obedience built toward a larger purpose
`.trim();

export const DEUTERONOMY_TWENTY_SIX_PERSONAL_SECTIONS = parseDeuteronomyTwentySixRawNotes(
  DEUTERONOMY_TWENTY_SIX_RAW_NOTES,
);
