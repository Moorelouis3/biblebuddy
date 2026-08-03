export type ExodusFortyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusFortyRawNotes(rawText: string): ExodusFortyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusFortyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+40:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 40 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+40:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+40:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 40 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 40,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 40:${startVerse}` : `Exodus 40:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Exodus 40 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_FORTY_RAW_NOTES = `# Exodus 40:1-3

# 🗓️ One Year To The Day

---

## 📅 On The First Day Of The First Month

The first month was called Abib, later renamed Nisan.

It falls in our March or April.

Exodus twelve made this the start of Israel's whole religious year.

That was the month of Passover, the month Israel left Egypt.

This command lands exactly one year after that first Passover night.

📆 Abib was Israel's first calendar month

🌱 It falls in March or April

🐑 It was the month of Passover

📖 The tabernacle rises on that anniversary

---

## 🏕️ The Tabernacle Of The Tent Of The Congregation

"Tabernacle" means a dwelling place.

It was the tent where God's presence lived among Israel.

"Tent of the congregation" is another name for the same tent.

It was the place Israel gathered to meet with God.

Two names, one structure, not two separate buildings.

God did not send a building.

He sent a portable house and chose to camp among His people.

🏕️ Tabernacle means a dwelling place

👥 Tent of congregation means the meeting tent

🔁 Two names for one structure

📖 God chose to camp among His people

---

## 📦 The Ark Of The Testimony

"The ark" was a wooden chest covered in gold.

"The testimony" means the two stone tablets carved with the Ten Commandments.

They were called the testimony because they testified to the covenant between God and Israel.

This chest was the most sacred object in the whole tabernacle.

Everything else in the tent was arranged around this one piece.

📦 The ark was a gold covered chest

🪨 The testimony means the stone tablets

🤝 They testified to God's covenant

📖 Everything else centers on this one object

---

## 🧵 Cover The Ark With The Vail

"The vail" was a heavy curtain.

It was not anything like a veil worn on someone's face.

It hung between the ark and the rest of the tent.

Behind it sat the Most Holy Place, the room filled with God's presence.

No one could walk past that curtain except the high priest.

Even he only entered once a year.

The most sacred object in the tent was covered before anything else moved in.

🧵 Vail means a heavy curtain

🚫 It blocked the Most Holy Place

🗓️ Only the high priest passed it yearly

📖 The most sacred object was covered first

---

# Exodus 40:4-8

# 🛠️ Every Piece In Its Place

---

## 🍞 Bring In The Table

This is the table of showbread, first described back in Exodus twenty five.

Bread sat on it at all times, representing God's constant provision for Israel.

Twelve loaves stood for the twelve tribes.

The bread was replaced weekly, and the old loaves went to the priests to eat.

God's people were always represented in His presence, loaf by loaf.

🍞 This is the table of showbread

🙏 Bread pictured God's constant provision

🔢 Twelve loaves stood for twelve tribes

📖 Israel stayed represented before God

---

## 🕯️ Light The Lamps Thereof

"The lamps" were the seven lamps of the golden candlestick.

The tabernacle had no windows, so this was the only light inside.

Later law required the lamps to stay lit continually, tended morning and evening.

Without this light, the priests could not see to serve inside the tent.

🕯️ The lamps sat on the golden candlestick

🌑 The tabernacle had no windows

⏰ Priests tended the lamps morning and evening

📖 Light made the priests' service possible

---

## 🥇 The Altar Of Gold For The Incense

This was a small golden altar, different from the large bronze altar outside.

It stood in front of the inner vail, inside the Holy Place.

Priests burned incense on it every morning and evening.

The rising smoke pictured prayer rising up to God.

🥇 A small golden altar, not the bronze one

🚪 It stood in front of the inner vail

💨 Priests burned incense morning and evening

📖 Smoke rising pictured prayer to God

---

## 🔥 The Altar Of The Burnt Offering

This was the large bronze altar, sitting out in the open courtyard.

Animal sacrifices were burned whole on this altar.

It stood at the very entrance, the first thing anyone met on the way in.

No one reached the ark without passing this altar of blood first.

🔥 The large bronze altar stood outside

🐑 Animal sacrifices burned here

🚪 It stood right at the entrance

📖 No one bypassed this altar to reach God

---

## 🛁 Set The Laver Between The Tent And The Altar

"The laver" was a bronze wash basin filled with water.

It stood between the burnt offering altar and the tent's entrance.

Priests had to wash there before they served or they could die.

Washing came right after sacrifice and right before entering God's presence.

🛁 The laver was a bronze wash basin

📍 It stood between the altar and the tent

⚠️ Priests who skipped washing risked death

📖 Washing bridged sacrifice and God's presence

---

## 🚧 Hang Up The Hanging At The Court Gate

"The court" was the fenced outer yard surrounding the whole tabernacle.

Its walls were tall linen curtains, not solid stone or wood.

"The hanging" at the gate was the one opening in that fence, the only way in.

Everyone who entered the court entered through that single doorway.

🧵 The court was a fenced linen yard

🚪 The hanging was the court's one gate

🔓 It was the only way inside

📖 One entrance meant one way to God

---

# Exodus 40:9-11

# 🫗 The Anointing Oil

---

## 🫗 Take The Anointing Oil, And Anoint The Tabernacle

The anointing oil was a specific blend, mixed from a recipe given earlier in Exodus.

"Anoint" means to pour or rub oil on something to set it apart for God.

Every piece inside the tent received this oil, not just the priests.

The whole structure became holy property before a single sacrifice was offered.

🫗 A specific oil blend, given earlier

✋ Anoint means set apart with oil

🏕️ Every piece received this oil

📖 The tent became holy before any sacrifice

---

## ✨ It Shall Be Holy

"Holy" means set apart for God's use alone, not for anything ordinary.

Once anointed, these objects could never go back to normal use.

A cup used at the altar could never become a kitchen cup again.

Holiness here is a permanent change of purpose, not a temporary label.

✨ Holy means set apart for God alone

🚫 Objects could not return to ordinary use

🍽️ A cup here could never be reused

📖 Holiness was a permanent change of purpose

---

## 🥇 Sanctify The Altar, And It Shall Be An Altar Most Holy

"Sanctify" is another word for making something holy, set apart on purpose.

This is the bronze altar out in the courtyard, not the ark inside.

Readers might expect only the ark to carry the label most holy.

Here even the outdoor altar of sacrifice receives that same highest rank.

The most holy label follows function, not just location.

🥇 Sanctify means to make holy on purpose

🔥 This is the outdoor bronze altar

😮 Even this altar reaches most holy rank

📖 Holiness follows function, not just location

---

## 🦶 Anoint The Laver And His Foot

"His foot" means the laver's base, the stand it rested on.

The base gets anointed along with the basin itself.

Nothing in the tabernacle was too small or too plain to be set apart.

Even a stand holding a washbasin belonged to God now.

🦶 His foot means the laver's base

🛁 The base was anointed too

🔍 Nothing was too small to be holy

📖 Even a stand belonged to God now

---

# Exodus 40:12-15

# 👨‍👦‍👦 Consecrating Aaron And His Sons

---

## 💧 Wash Them With Water

Before anything else happened, Aaron and his sons were washed in water.

This was a ceremonial washing, not simply getting clean from dust.

It marked the first step in becoming a priest, before robes or oil.

A priest's service began with being made clean, not with a title.

💧 A ceremonial washing, not a bath

🚦 It was the very first step

👔 It came before any robes or oil

📖 Priesthood began with being made clean

---

## 👑 Put Upon Aaron The Holy Garments

These garments were described in detail back in Exodus twenty eight.

They included a breastplate, an ephod, a robe, and a gold plated turban.

Each piece marked Aaron as the one priest who represented all of Israel.

No one else wore this exact set of clothing.

👑 Garments detailed back in Exodus twenty eight

🎽 Breastplate, ephod, robe, and turban

🇮🇱 Aaron represented all of Israel

📖 No one else wore this exact set

---

## 🧥 Clothe Them With Coats

Aaron's sons received simple linen coats, far plainer than Aaron's own garments.

They served as regular priests, not as the one high priest.

Simpler clothing marked a real difference in role, not a lesser worth.

Every priest mattered, even without Aaron's elaborate robes.

🧥 Plain linen coats, not Aaron's robes

👥 They served as regular priests

⚖️ Different role, not lesser worth

📖 Every priest mattered in God's house

---

## ♾️ An Everlasting Priesthood Throughout Their Generations

"Everlasting" here means lasting for generation after generation, not literally forever.

This priesthood belonged to Aaron's family line alone, called the Levitical priesthood.

A son could not choose this job, and no outsider could buy it.

It passed down by birth, family after family, for centuries.

♾️ Everlasting means generation after generation

👨‍👩‍👧 It belonged to Aaron's family line

🚫 No one could buy or choose it

📖 It passed down by birth for centuries

---

# Exodus 40:16-19

# 🏗️ Moses Raises The Tabernacle

---

## ✅ According To All That The LORD Commanded Him, So Did He

This exact sentence repeats again and again across these final chapters of Exodus.

Every single instruction God gave was carried out without a single change.

Moses did not improve the design or skip a step he found difficult.

Total obedience, piece by piece, is the real climax of the whole book.

🔁 This sentence repeats again and again

🛠️ Every instruction was carried out exactly

🚫 Nothing was changed or skipped

📖 Total obedience is the book's real climax

---

## 🗓️ In The First Month In The Second Year

This dates the tabernacle's raising to exactly one year after Israel left Egypt.

Israel had reached Sinai in the third month of that first year.

Building the tabernacle and receiving God's instructions took most of that first year.

God's timeline lands the finished tent on the anniversary of Israel's freedom.

🗓️ Exactly one year after leaving Egypt

⛰️ Israel reached Sinai in month three

🛠️ Building took most of that year

📖 The finished tent lands on freedom's anniversary

---

## 🪵 Fastened His Sockets, And Set Up The Boards

"Sockets" were heavy silver bases the wooden boards stood in, like feet.

"Boards" were the upright wooden wall frames, each covered in gold.

"Bars" were long rods sliding through rings to lock the boards together.

Each part had one job, and none of it worked alone.

🦶 Sockets were heavy silver bases

🪵 Boards were the gold covered wall frames

🔗 Bars locked the boards together

📖 Every part needed the others to stand

---

## ⛺ Spread Abroad The Tent Over The Tabernacle

The roof of this structure actually had three separate layers.

The inner layer, the tabernacle itself, was fine linen with woven cherubim.

The middle layer, the tent, was rougher cloth woven from goat hair.

A final layer of animal skins covered and protected everything underneath.

🧵 The inner layer was fine linen

🐐 The middle layer was woven goat hair

🐫 A tough outer layer of skins covered it

📖 God layered beauty inside and protection outside

---

# Exodus 40:20-23

# 📦 The Ark And The Table

---

## 🎋 Set The Staves On The Ark

"Staves" were long wooden poles overlaid in gold.

They slid through gold rings fixed to the ark's four corners.

This let the ark be carried without anyone touching it directly.

Later, touching the ark itself proved fatal, so the staves mattered.

🎋 Staves were gold covered carrying poles

💍 They slid through rings on the ark

🚫 No one had to touch the ark directly

📖 The staves kept the ark safely distant

---

## 👼 Put The Mercy Seat Above Upon The Ark

"The mercy seat" was the solid gold lid covering the ark.

Two gold cherubim stood on its ends, facing each other with wings spread.

This lid, not the tablets underneath, was where God's presence would appear.

Once a year, blood was placed here to cover the sins of the whole nation.

👼 The mercy seat was the ark's gold lid

🦅 Two cherubim faced each other on top

✨ God's presence appeared right here

📖 Blood here covered the nation's sin yearly

---

## 🧭 Upon The Side Of The Tabernacle Northward, Without The Vail

"Without the vail" means outside the inner curtain, not lacking one.

The table stood in the Holy Place, the outer room of the tent.

It sat on the north side, across from where the lampstand would stand.

Only the ark sat behind the vail, inside the Most Holy Place.

🧭 Without the vail means outside the curtain

🧎 The table stood in the outer room

📍 It sat on the north side

📖 Only the ark sat behind the vail

---

## 🍞 Set The Bread In Order Upon It

Twelve loaves sat on the table in two neat rows of six.

This bread is often called showbread, or the bread of the presence.

Priests replaced it every week and ate the old loaves themselves.

The bread pictured all twelve tribes staying continually before God.

🍞 Twelve loaves sat in two rows

🏷️ Also called the bread of the presence

🔄 Replaced weekly, eaten by the priests

📖 It pictured Israel staying before God

---

# Exodus 40:24-27

# 🕯️ Light And Incense

---

## 🕯️ On The Side Of The Tabernacle Southward

The candlestick stood across from the table, on the tent's south side.

The table sat north, the lampstand sat south, facing each other.

This layout gave the priests light to see the bread and their work.

Every placement inside the tent served a real, practical purpose.

🕯️ The lampstand stood on the south side

🍞 The table sat north, facing it

👀 This gave priests light to work by

📖 Every placement served a real purpose

---

## 🔥 He Lighted The Lamps Before The LORD

"Before the LORD" means the lamps burned in God's own presence, not just in a room.

Later law required these lamps to burn continually, tended every morning and evening.

This was the only light inside the tent, since it had no windows.

God's house was never left dark.

🔥 Before the LORD means in God's presence

⏰ Tended every morning and evening

🌑 The only light in a windowless tent

📖 God's house was never left dark

---

## 🥇 In The Tent Of The Congregation Before The Vail

This is the incense altar, already placed back in verse five.

It stood in the Holy Place, nearest the inner vail.

Nothing inside that outer room stood closer to God's presence.

Position here reflected nearness, not just furniture arrangement.

🥇 This is the same incense altar

📍 It stood nearest the inner vail

✨ Nothing stood closer to God's presence

📖 Position reflected spiritual nearness

---

## 💨 He Burnt Sweet Incense Thereon

"Sweet incense" was a specific blend, its recipe given earlier in Exodus thirty.

That exact formula could never be used for anything ordinary.

Priests burned it morning and evening, the same schedule as the lamps.

The rising smoke pictured prayer rising up to God.

💨 A specific blend, given in Exodus thirty

🚫 That formula was never for ordinary use

⏰ Burned morning and evening, like the lamps

📖 Rising smoke pictured rising prayer

---

# Exodus 40:28-33

# 🔥 Outer Court Finished

---

## 🍞 Offered Upon It The Burnt Offering And The Meat Offering

"The burnt offering" was a whole animal, burned completely as a gift to God.

"The meat offering" is confusing to modern ears, since it was not meat at all.

In old English, "meat" simply meant food in general.

This offering was actually made of flour, oil, and sometimes frankincense.

🐑 Burnt offering means a whole animal burned

🌾 Meat offering meant food in general

🍞 It was really flour, oil, and frankincense

📖 Old English words can mislead modern readers

---

## 💧 Washed Their Hands And Their Feet Thereat

Moses, Aaron, and Aaron's sons all washed at the laver before serving.

Hands and feet covered exactly what touched blood, dust, and altar ash.

This washing came right between the altar and the tent's entrance.

Skipping it was not a small matter, since the law tied it to life or death.

💧 Moses, Aaron, and his sons all washed

✋ Hands and feet touched blood and ash

📍 Washing came between altar and entrance

📖 Skipping it was a life or death matter

---

## 🔁 When They Went Into The Tent, They Washed

This is not a one time event, described here as an ongoing habit.

Every single time a priest approached the tent or the altar, he washed first.

Obedience here was not a single grand moment but a daily, repeated discipline.

Holiness got built through habits, not just big decisions.

🔁 This describes an ongoing habit, not one event

✋ Every approach to the tent meant washing first

📅 Obedience was a daily discipline

📖 Holiness gets built through habits

---

## ✅ So Moses Finished The Work

This line echoes Genesis, where God finished His work of creation in six days.

The tabernacle gets built the same way creation did, in careful, ordered stages.

Genesis ends with God resting in a finished world.

Exodus ends with God dwelling in a finished tent.

The tabernacle reads like a small, portable new creation.

✅ This echoes Genesis and creation's finish

🌍 Both stories move through ordered stages

🏡 Genesis ends with rest, Exodus with dwelling

📖 The tabernacle reads like a portable new creation

---

# Exodus 40:34-38

# ☁️ The Glory Fills The Tabernacle

---

## ☁️ A Cloud Covered The Tent Of The Congregation

This same cloud had led Israel out of Egypt and hovered over Sinai.

Here it settles down directly onto the finished tabernacle.

God is not just visiting this tent.

He is moving in.

The cloud is visible, physical proof that God kept His promise to dwell among Israel.

☁️ The same cloud from Egypt and Sinai

🏠 It settles onto the finished tabernacle

🤝 God moves in, He does not just visit

📖 Visible proof God kept His promise

---

## 🙅 Moses Was Not Able To Enter

Moses had climbed Mount Sinai before and stood inside God's cloud there.

Here, even Moses cannot walk into the tent he just finished building.

God's glory filled every inch of the space, leaving no room to enter.

Even Israel's own leader needed a safe way to approach God, not just courage.

🏔️ Moses had entered God's cloud on Sinai before

🚫 Even Moses could not enter this time

✨ God's glory filled the whole space

📖 Leaders still need a safe way to God

---

## 🧭 When The Cloud Was Taken Up, They Went Onward

From this point forward, the cloud became Israel's only travel signal.

No one voted, planned routes, or guessed when to move camp.

The cloud lifting was the only signal that mattered.

This same system gets explained in even more detail later, in Numbers nine.

🧭 The cloud became Israel's only travel signal

🚫 No one voted or planned the route

⬆️ Lifting meant it was time to move

📖 Numbers nine explains this system further

---

## 🔥 In The Sight Of All The House Of Israel

Cloud by day, fire by night meant the guide never disappeared.

It was visible even in total darkness.

This is also the very last verse of the whole book of Exodus.

The book opened with Israel enslaved and invisible to Egypt's rulers.

It closes with Israel free, visible, and led openly by God Himself.

Deliverance, law, and God's dwelling presence together close out the whole book.

🔥 Guidance never stopped, day or night

⛓️ Exodus opened with Israel enslaved and unseen

🕊️ It ends with Israel free and openly led

📖 Deliverance, law, and presence close the book
`.trim();

export const EXODUS_FORTY_PERSONAL_SECTIONS = parseExodusFortyRawNotes(EXODUS_FORTY_RAW_NOTES);
