export type GenesisFortySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortySevenRawNotes(rawText: string): GenesisFortySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+47:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 47 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+47:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+47:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 47 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 47,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 47:${startVerse}` : `Genesis 47:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Genesis 47 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_SEVEN_RAW_NOTES = `# Genesis 47:1-4

# 🐑 Joseph Brings His Family Before Pharaoh

---

## 📢 Joseph Came And Told Pharaoh

Joseph goes to Pharaoh in person instead of sending a messenger.

This meeting was already planned back in chapter forty six.

Joseph is putting his own reputation behind his whole family.

A single conversation decides where they will live.

Joseph is staking his standing with Pharaoh on his family's future.

📢 Joseph reports the news in person

📋 Chapter forty six already set the plan

👑 Joseph's reputation now covers his whole family

➡️ One meeting decides where they will live

---

## 🗺️ They Are In The Land Of Goshen

Goshen was a fertile region in the northeastern part of Egypt.

It sat close to the border with Canaan, not deep inside Egyptian territory.

Good grazing land made it ideal for a family of shepherds.

Its location also kept Jacob's family apart from most of Egypt.

The land God provided fit exactly what a shepherd family needed.

🗺️ Goshen sat in Egypt's northeast corner

🌾 Its grassland suited a shepherd family

🚧 The location kept them apart from Egypt's cities

📖 God provided land that fit their needs

---

## 🖐️ Even Five Men

Joseph brings only five of his eleven brothers to meet Pharaoh.

A full royal audience with eleven strangers at once could feel overwhelming.

Five was enough to represent the family without crowding the room.

Joseph is managing this meeting with the same care he used to manage the famine.

🖐️ Joseph selects five of eleven brothers

👑 A royal audience called for a small group

🎯 Five brothers were enough to represent the family

➡️ Joseph plans this meeting with care

---

## 💼 What Is Your Occupation

Occupation means the work someone does regularly to support their family.

Pharaoh asks the brothers directly, without going through Joseph first.

This question decides where the family will be allowed to live and work.

The brothers answer honestly instead of hiding what they do for a living.

💼 Occupation means someone's regular work

👑 Pharaoh asks the brothers directly

🏠 Their answer will decide where they live

📖 The brothers answer with honesty

---

## 🐑 Thy Servants Are Shepherds, Both We, And Also Our Fathers

Shepherding was considered a low status trade in Egyptian society.

Egyptians of this time generally kept a distance from shepherds and their flocks.

The brothers do not hide this or try to sound more impressive.

Their honesty is also strategic, since it justifies living apart in Goshen instead of inside Egypt.

🐑 Shepherding ranked low in Egyptian society

🙅 Egyptians usually kept shepherds at a distance

🗣️ The brothers answer without any pretending

📖 Their honesty secures separate land in Goshen

---

## 🏕️ For To Sojourn In The Land Are We Come

Sojourn means to live somewhere for a while as a visitor, not as a permanent citizen.

The brothers make clear up front that this move is temporary.

They see Egypt as shelter from famine, not a new home.

That same word describes Abraham's whole life generations earlier in Canaan.

🏕️ Sojourn means a temporary stay, not a home

⏳ The brothers plan to return one day

🌾 Egypt is shelter, not a new homeland

📖 Abraham lived this same way generations earlier

---

## 🔥 The Famine Is Sore In The Land Of Canaan

Sore here means severe or intense, not physical pain.

The brothers explain plainly why they had to leave home at all.

This is not a vacation or an opportunity they went looking for.

Survival alone forced this whole journey to Egypt.

🔥 Sore here means severe, not painful

🌾 Canaan can no longer feed the family

🚶 Survival forced this whole journey

➡️ Necessity brought them to Pharaoh's door

# Genesis 47:5-7

# 👑 Pharaoh Welcomes Jacob And His Sons

---

## 🌍 The Land Of Egypt Is Before Thee

Pharaoh hands Joseph complete freedom to choose where the family settles.

This is not a small, cautious offer to a foreign family.

Pharaoh is putting the whole nation on the table for Joseph to choose from.

That kind of trust reflects everything Joseph already proved during the famine.

🌍 Pharaoh gives Joseph full freedom to choose

🤝 This reflects deep trust in Joseph

👀 Such trust was rare for a foreign family

📖 Years of faithful service earned this trust

---

## 💎 In The Best Of The Land

Pharaoh does not offer leftover or poor quality ground.

He specifically names the best land available in the whole country.

A foreign family of shepherds receiving prime land was unusual and generous.

This generosity flows entirely through Joseph's standing with the king.

🌾 Pharaoh offers the best land available

👀 This was unusual for a foreign family

💎 The offer is generous, not minimal

➡️ Joseph's standing shapes his family's future

---

## 💪 Men Of Activity ... Rulers Over My Cattle

Men of activity means capable, skilled workers.

Pharaoh offers to place qualified brothers over his own royal livestock.

That is a position of real trust, not a menial job.

A king does not hand his own animals to people he suspects.

💪 Men of activity means skilled workers

🐄 Pharaoh offers charge of his royal herds

👑 This role required real royal trust

📖 Pharaoh trusts them more than mere strangers

---

## 🙏 Jacob Blessed Pharaoh

Jacob is an aging shepherd with no political power of his own.

Pharaoh is the most powerful ruler in the region.

Yet Jacob is the one who blesses Pharaoh, not the other way around.

In scripture, the one who blesses is understood to hold the greater standing before God.

🙏 Jacob blesses Pharaoh, not the reverse

👑 Pharaoh holds all the earthly power

⚖️ Blessing reveals a different kind of standing

📖 Spiritual standing does not depend on earthly power

# Genesis 47:8-10

# 🎂 Jacob Tells Pharaoh His Age

---

## ❓ How Old Art Thou

This is a simple, direct question from one ruler figure to another.

Age carried real weight and respect in the ancient world.

Pharaoh is showing Jacob honor by asking him personally.

Jacob's answer is about to be anything but simple.

❓ Pharaoh asks Jacob directly

👴 Age carried real honor in this culture

👑 Pharaoh treats Jacob with respect

➡️ Jacob's answer goes beyond the question

---

## 🧭 The Days Of The Years Of My Pilgrimage

Pilgrimage describes a journey through life as a traveler, not a settled resident.

Jacob describes his whole one hundred thirty years this way.

He never speaks of his life as a life spent at home.

This same idea of sojourning already shaped his sons' words to Pharaoh.

🧭 Pilgrimage means life as a traveler

🎂 Jacob is one hundred thirty years old

🏕️ He never calls his life settled

📖 The same idea shaped his sons' words too

---

## 😔 Few And Evil Have The Days Of The Years Of My Life Been

Evil here means hardship and trouble, not moral wrongdoing.

Jacob is being honest that his life has been short and difficult.

He lost his mother early, fled his brother, and mourned Rachel and Joseph.

Being chosen by God never meant Jacob's life was free of real pain.

😔 Evil here means hardship, not sin

📉 Jacob calls his life short and hard

💔 Real losses filled his whole story

📖 God's calling never promised an easy life

---

## 📊 Have Not Attained Unto The Days Of The Years Of The Life Of My Fathers

Abraham lived one hundred seventy five years.

Isaac lived one hundred eighty years.

Jacob openly admits his own one hundred thirty years falls short of both.

This is not bragging about the family name, it is honest humility in front of a king.

👴 Abraham lived one hundred seventy five years

📆 Isaac lived one hundred eighty years

😌 Jacob admits his years fall short

➡️ Jacob speaks with humility, not pride

---

## 🔁 Jacob Blessed Pharaoh, And Went Out From Before Pharaoh

Jacob blesses Pharaoh a second time before leaving the room.

The whole meeting is framed by blessing at both ends.

Jacob could have used this moment to complain about his hard life.

Instead his final instinct is still to bless the most powerful man he will ever meet.

🙏 Jacob blesses Pharaoh a second time

🔁 Blessing opens and closes this meeting

😌 Jacob does not complain to Pharaoh

📖 His instinct is to bless, not grumble

# Genesis 47:11-12

# 🏡 The Family Settles In Rameses

---

## 🏡 Gave Them A Possession In The Land Of Egypt

Possession means land they actually owned, not just borrowed for a season.

Joseph follows through on Pharaoh's offer exactly as promised.

The family gains real legal standing in Egypt, not a temporary camp.

That ownership matters later when their descendants leave Egypt with a real claim behind them.

🏡 Possession means land they actually owned

✅ Joseph follows Pharaoh's promise exactly

📜 The family gains real legal standing

📖 That ownership matters generations later

---

## 🗺️ In The Land Of Rameses

Rameses was a fertile district that sat within the wider region of Goshen.

Centuries later, the book of Exodus names Rameses as a store city built by enslaved Israelites.

The family's first home in Egypt is the very ground their descendants will later labor over.

A place of rest here becomes a place of bondage later in the story.

🗺️ Rameses was a fertile part of Goshen

🏗️ Exodus later names it a store city

⛓️ Their descendants will labor on this same ground

📖 Rest here comes before bondage later

---

## 🍞 Joseph Nourished His Father ... According To Their Families

Joseph personally makes sure every household in his extended family gets fed.

He distributes food family by family, not as one vague general shipment.

This is the same careful management style he used to save all of Egypt.

Joseph treats his own relatives with the same order he gave the whole nation.

🍞 Joseph provides for every household

📋 Food is distributed family by family

🎯 This mirrors his careful famine management

➡️ Joseph runs his family with real order

# Genesis 47:13-17

# 💰 Money For Bread

---

## 🔥 The Famine Was Very Sore

Sore again means severe, the same word used back in verse four.

This famine is not a local shortage limited to one region.

Both Egypt and Canaan suffer under it at the same time.

The scale of the crisis explains everything Joseph does next.

🔥 Sore means severe, repeated from verse four

🌍 Both Egypt and Canaan suffer together

📉 This is a massive, widespread crisis

➡️ Scale explains Joseph's coming decisions

---

## 😨 Fainted By Reason Of The Famine

Fainted here means the people grew weak and desperate, not that they literally collapsed.

Years of hunger were wearing down entire populations, not just a few families.

This word paints the human cost behind Joseph's economic plan.

The numbers alone do not tell the full story of what people were living through.

😨 Fainted means weak and desperate, not unconscious

📉 Hunger wore down whole populations

💔 A human cost sits behind every decision

📖 Numbers alone do not tell this story

---

## 💰 Joseph Gathered Up All The Money ... Brought The Money Into Pharaoh's House

People spend their savings buying grain to survive.

Joseph collects that money and deposits all of it into the royal treasury.

Egypt's wealth is steadily shifting into Pharaoh's hands as the famine drags on.

Joseph is managing this transfer, he is not personally profiting from it.

💰 People spend savings to buy grain

🏛️ Joseph deposits it all in Pharaoh's treasury

📈 Egypt's wealth shifts toward the crown

➡️ Joseph manages this, he does not pocket it

---

## ❓ For Why Should We Die In Thy Presence

The Egyptians come to Joseph directly once their money runs out.

Their question is not rhetorical, it is genuine desperation.

They are asking Joseph, the one man with any grain left, to keep them alive.

Their whole future now depends entirely on his answer.

❓ Their question expresses real desperation

💀 Starvation is a real, immediate threat

🙏 They appeal to Joseph directly

➡️ Joseph alone controls what happens next

---

## 🐄 Give Your Cattle

Once money runs out, Joseph proposes trading livestock for food instead.

Livestock becomes the new form of payment once coin and silver are gone.

This keeps people fed without simply giving grain away for free.

Resources keep flowing to Pharaoh even after the people's money is gone.

🐄 Livestock replaces money as payment

🍞 People still receive food this way

🚫 Nothing is simply given away for free

📖 Resources keep moving toward Pharaoh

# Genesis 47:18-22

# 🌾 Land For Bread

---

## 📢 There Is Not Ought Left In The Sight Of My Lord, But Our Bodies, And Our Lands

Ought is an old word meaning anything at all.

The people admit they have nothing left to offer except themselves and their ground.

This is total economic collapse, stated plainly and without hiding it.

They lay their whole situation before Joseph with complete honesty.

📢 Ought means anything at all

📉 The people have nothing else left

😔 This is total economic collapse

➡️ They hide nothing from Joseph

---

## 🗣️ Buy Us And Our Land For Bread, And We ... Will Be Servants Unto Pharaoh

The people themselves propose becoming servants to Pharaoh.

Joseph never forces this arrangement on anyone.

Starving people offer up their own freedom because it is their only path to survival.

That desperation shapes the whole economic system Egypt will run under going forward.

🗣️ The people propose this themselves

🚫 Joseph does not force the arrangement

😨 Desperation drives this decision, not force

📖 Survival reshapes Egypt's whole economy

---

## 🏞️ So The Land Became Pharaoh's

Nearly all of Egypt's farmland transfers into Pharaoh's ownership through this famine.

Joseph manages the entire transition on Pharaoh's behalf.

A single crisis permanently reshapes who owns the whole nation's ground.

This land shift stays in place for generations after the famine ends.

🏞️ Egypt's land shifts to Pharaoh's ownership

📋 Joseph manages the whole transition

🔄 One crisis reshapes national ownership

➡️ The change outlasts the famine itself

---

## 🏙️ He Removed Them To Cities

Joseph relocates the general population into cities across the country.

This move likely made it easier to distribute grain in an organized way.

It also gave Pharaoh more direct oversight of a now dependent population.

Order, not simple efficiency, is behind this large scale relocation.

🏙️ Joseph relocates people into cities

📦 Grain distribution becomes more organized

👀 Pharaoh gains closer oversight of the people

📖 Order shapes this massive relocation

---

## ⛪ Only The Land Of The Priests Bought He Not

Egyptian priests received a fixed food allotment straight from Pharaoh.

That guaranteed provision meant they never needed to sell their land like everyone else.

This detail matches what history records about the privileged place priests held in Egypt.

The exception is not favoritism from Joseph, it reflects Egypt's existing social order.

⛪ Priests received guaranteed food from Pharaoh

🏞️ They never had to sell their land

📚 This matches Egypt's known social order

📖 Joseph works within Egypt's existing system

# Genesis 47:23-26

# 📜 Joseph's Tax Law

---

## 🌱 Here Is Seed For You, And Ye Shall Sow The Land

The people now technically belong to Pharaoh and work his land.

Joseph still hands them seed and lets them keep farming it themselves.

He restores their ability to work and provide, rather than simply controlling them outright.

This is structured provision, not plain conquest.

🌱 Joseph gives the people seed to plant

🚜 They keep working the land themselves

🤝 This restores dignity, not just control

📖 Provision shapes this system, not conquest

---

## 🌾 Ye Shall Give The Fifth Part Unto Pharaoh

Joseph sets a twenty percent tax on future harvests.

This is the exact same fraction he proposed back in chapter forty one for storing grain during the good years.

The same plan that once saved Egypt from famine now becomes its permanent tax rate.

One idea carries the nation through two very different seasons.

🌾 The tax rate is twenty percent

🔁 This matches Joseph's plan from chapter forty one

📊 One idea now becomes permanent policy

➡️ The same plan saves and then sustains

---

## 📊 Four Parts Shall Be Your Own

The people keep eighty percent of everything they grow.

That share covers new seed, their own food, and food for their households and children.

Joseph's system takes a portion, it does not strip families bare.

The tax leaves enough for a family to actually live on.

📊 The people keep eighty percent

🌱 Their share covers seed and food

👨‍👩‍👧 Households and children are provided for

📖 The system leaves families enough to live

---

## 🙏 Thou Hast Saved Our Lives

The people respond to Joseph's plan with genuine gratitude, not resentment.

They openly credit Joseph with saving their lives, not just managing a crisis well.

Willingly becoming Pharaoh's servants feels like a fair trade for staying alive.

Their own words confirm the arrangement was received as rescue, not exploitation.

🙏 The people respond with real gratitude

❤️ They credit Joseph with saving their lives

🤝 Servitude feels like a fair trade to them

📖 Their words confirm this was rescue

---

## ⚖️ Joseph Made It A Law Over The Land Of Egypt Unto This Day

This twenty percent tax becomes lasting, permanent Egyptian law.

The phrase unto this day tells the reader it was still in effect when Genesis was written.

Joseph's famine management does not just solve one crisis and end there.

It permanently reshapes Egypt's entire economic system for generations to come.

⚖️ The tax becomes permanent Egyptian law

📜 Unto this day means it still applied later

🏛️ One plan reshapes a whole economy

➡️ Joseph's impact outlasts the famine itself

# Genesis 47:27-31

# ⚰️ Jacob's Final Request

---

## 📈 They Had Possessions Therein, And Grew, And Multiplied Exceedingly

While Egypt as a whole is reshaped by famine and debt, Jacob's family thrives.

They gain real property and grow rapidly inside Goshen.

This early growth is the small beginning of the much larger nation Exodus later describes.

A famine that crushed a nation becomes the setting where God's people flourish.

📈 Jacob's family grows rapidly in Goshen

🏡 They gain real property of their own

🌱 This growth seeds the nation in Exodus

📖 They flourish while the nation struggles

---

## 🎂 Jacob Lived In The Land Of Egypt Seventeen Years

Jacob spends his final seventeen years reunited with Joseph in Egypt.

He had lost Joseph for twenty two years before that reunion.

Jacob's whole lifespan reaches one hundred forty seven years.

His last chapter is spent in peace, not in the grief that defined his middle years.

🎂 Jacob's final years total seventeen

💔 Twenty two years of separation came before

📊 His full lifespan reaches one forty seven

📖 His last years are marked by peace

---

## ⏳ The Time Drew Nigh That Israel Must Die

Nigh is an old word meaning near.

Jacob is called Israel here, the covenant name God gave him back in Genesis thirty two.

Facing death, Jacob turns to Joseph with one final, serious request.

The man who once wrestled with God now prepares calmly to meet him.

⏳ Nigh means near, an old word for close

👤 Israel is Jacob's covenant name

🤝 Jacob turns to Joseph with one request

📖 He faces death without fear

---

## ✋ Put, I Pray Thee, Thy Hand Under My Thigh

This gesture sealed the most serious kind of oath in this culture.

Abraham's servant made this same gesture back in Genesis twenty four.

Jacob is not asking for a casual favor here.

He wants a promise Joseph cannot walk away from later.

✋ This gesture sealed the most serious oaths

📖 Abraham's servant used it in Genesis twenty four

🤝 Jacob wants an unbreakable promise

➡️ Some requests demand more than words

---

## ⚰️ Bury Me Not, I Pray Thee, In Egypt

Jacob's final request is to be buried back in Canaan, not in Egypt.

He wants to lie in the family tomb Abraham purchased generations earlier in Genesis twenty three.

Even living comfortably in Egypt, Jacob's heart stays fixed on the promised land.

His burial place becomes his last quiet statement of faith in God's promise.

⚰️ Jacob wants burial in Canaan, not Egypt

🪦 Abraham bought that family tomb long before

🏡 His heart stays fixed on the promised land

📖 The burial site itself declares his faith

---

## 🤝 Swear Unto Me. And He Sware Unto Him

Jacob does not settle for a simple spoken promise.

He requires Joseph to make a formal, binding oath.

Joseph gives that oath without hesitation.

Father and son close this scene bound together by a solemn vow.

🤝 Jacob requires a formal, binding oath

✅ Joseph gives his word without delay

👨‍👦 Father and son are bound by this vow

➡️ A promise this serious needed an oath

---

## 🙏 Israel Bowed Himself Upon The Bed's Head

Jacob bows in worship once Joseph's oath is settled.

This is a posture of gratitude and release, not exhaustion.

His last recorded act in this chapter is turned toward God, not toward Joseph.

Peace, not fear, marks the end of this long life.

🙏 Jacob bows in worship, relieved

🛏️ He bows from his own bed

❤️ Gratitude shapes his final act here

📖 Peace marks the end of his story`.trim();

export const GENESIS_FORTY_SEVEN_PERSONAL_SECTIONS = parseGenesisFortySevenRawNotes(GENESIS_FORTY_SEVEN_RAW_NOTES);
