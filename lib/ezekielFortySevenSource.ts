export type EzekielFortySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFortySevenRawNotes(rawText: string): EzekielFortySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFortySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+47:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 47 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+47:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+47:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 47 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 47,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 47:${startVerse}` : `Ezekiel 47:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ezekiel 47 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FORTY_SEVEN_RAW_NOTES = `# Ezekiel 47:1-5
# 🌊 Water Flows From Under The Altar
---
## 🏛️ Waters Issued Out From Under The Threshold

The threshold is the stone sill at the bottom of the temple doorway.

Water begins flowing out from under that exact spot.

This is not rain, and it is not a spring Ezekiel stumbled onto.

The water starts inside the temple itself, at its very entrance.

Life in this vision flows directly out of God's own dwelling place.

🏛️ Threshold means the stone sill of a doorway

💧 Water begins flowing from inside the temple

🚪 This is not rain or a natural spring

📖 Life flows out from God's own dwelling place

## 🌅 The Forefront Of The House Stood Toward The East

The front of the temple faced east, toward the rising sun.

This direction mattered because of what happened earlier in this book.

In chapter eight, Ezekiel saw leaders worshiping the sun in that same eastward direction.

God's own glory had also departed eastward back in chapter eleven.

Now life pours out of the temple facing that very direction.

💔 Chapter eight showed sun worship facing east

🚶 God's glory had departed eastward too

🌅 East once marked judgment and false worship

📖 That same direction now produces healing

## 🔥 At The South Side Of The Altar

The altar sat at the center of all temple worship.

This water comes out from beside the altar, not from a side room.

The altar was where sacrifices for sin were offered to God.

The source of this river is the exact place where atonement happened.

Healing for the whole land begins where sacrifice once covered sin.

🔥 The altar was the center of worship

🩸 Sacrifices for sin happened at the altar

💧 The river starts right beside it

📖 Healing begins where atonement once happened

## 📏 He Measured A Thousand Cubits

A cubit measured about eighteen inches, close to the length of a forearm.

A thousand cubits comes to nearly a third of a mile.

The man measuring the water is a guide figure carrying a measuring line from earlier chapters.

He measures this growing river the same careful way he measured the whole temple.

Every stage of this river gets exact, deliberate measurement.

📏 A cubit was about eighteen inches

🚶 A guide measures the water's growth

📐 The same careful measuring covered the whole temple

📖 This river grows in careful, measured stages

## 👣 The Waters Were To The Ankles

The first measurement is barely enough to wet the feet.

This river does not begin as something overwhelming.

It begins small enough to walk through without even noticing the current.

Small beginnings in this vision grow into something no one can control.

👣 Ankles means barely enough to wet the feet

🌱 The river begins small, not overwhelming

📈 The growth comes later, not at the start

📖 Small beginnings can grow beyond anyone's control

## 🦵 The Waters Were To The Loins

Three more measurements follow, and the river rises each time.

At a thousand cubits more, the water reaches the knees.

At another thousand cubits, it reaches the loins, meaning the waist.

Each identical measurement produces a deeper river than the one before it.

The same simple process keeps producing more than distance alone would explain.

🦵 Knees and loins mark the next two stages

📏 Each new measurement is the same thousand cubits

📈 The river deepens faster than distance explains

📖 God's work keeps multiplying on its own

## 🏊 A River That I Could Not Pass Over

By the fourth measurement, Ezekiel can no longer cross the river on foot.

The water has grown from ankle deep to swimming deep in four short stages.

No new spring or stream joins the river to explain this growth.

God's presence here only grows stronger the farther it travels from the temple.

🏊 By the fourth stage he must swim

📈 Ankle deep becomes swimming deep in four steps

❓ No new source explains this growth

📖 God's presence only grows stronger with distance

# Ezekiel 47:6-12
# 🌳 A River That Heals Everything It Touches
---
## ❓ Hast Thou Seen This

The guide asks Ezekiel a question he already knows the answer to.

This is not a request for information.

It is a command to pay close attention to what is happening.

God often uses a simple question to make a point land harder.

Ezekiel must carry this picture back to the exiles in vivid detail.

❓ The guide already knows the answer

👀 The question demands close attention

🗣️ A question can land harder than a statement

📖 Ezekiel must carry this vision back clearly

## 🌳 At The Bank Of The River Were Very Many Trees

Trees line both banks of the river in great number.

This scene echoes the garden of Eden.

Genesis describes a river flowing out of Eden to water that garden and its trees.

This temple river deliberately pictures Eden's life being restored.

What sin undid in Genesis, this vision shows being rebuilt.

🌳 Trees line both sides of the river

🌿 This river echoes the river in Eden

📜 Genesis describes a river watering that garden

📖 Eden's lost life appears restored here

## 🏜️ These Waters Issue Out Toward The East Country And Go Down Into The Desert

The river flows east and down toward the desert region.

This desert is the Arabah, the dry valley running down toward the Dead Sea.

That valley was one of the driest, most lifeless places in the whole region.

Sending healing water into the driest possible place makes the miracle unmistakable.

🏜️ The desert here is the dry Arabah valley

🌵 This region was known for being lifeless

💧 Healing water flows into the driest place

📖 The miracle is made unmistakable there

## 🌊 Which Being Brought Forth Into The Sea The Waters Shall Be Healed

The sea here is the Dead Sea, famous for water too salty to support life.

No fish or plants can normally survive in it.

This river reaches the Dead Sea and heals its deadly salt water.

The most lifeless body of water in the land becomes alive.

🌊 The sea here is the Dead Sea

☠️ Its water is normally too salty for life

💧 This river heals that deadly water

📖 The most lifeless water becomes alive

## 🌍 Whithersoever The Rivers Shall Come

Wherever this river reaches, life follows it.

"Whithersoever" is an old word that simply means wherever.

The text promises life will spread anywhere the water goes.

A very great multitude of fish will fill these once dead waters.

The scale of this new life matches the scale of the healing.

🌍 Whithersoever is an old word for wherever

🐟 A great multitude of fish will fill it

💧 Life follows the water everywhere it goes

📖 The scale of life matches the healing

## 🏘️ The Fishers Shall Stand Upon It From Engedi Even Unto Eneglaim

Engedi and Eneglaim were real towns along the shore of the Dead Sea.

Naming both ends of the shoreline shows fishing will stretch its entire length.

A sea once too salty for fishing becomes lined with working fishermen.

Naming real places grounds this vision in an actual, recognizable geography.

🏘️ Engedi and Eneglaim were real towns

🎣 Fishing will stretch the whole shoreline

🐟 A dead sea becomes a working fishery

📖 Real places ground this vision in geography

## 🐠 As The Fish Of The Great Sea Exceeding Many

The great sea here means the Mediterranean, known for its large and varied fish.

The once dead sea will now match that same abundance.

This comparison told the first readers exactly how plentiful to imagine the new fish.

A place with no life at all becomes as full as the richest fishing waters they knew.

🌊 The great sea means the Mediterranean

🐠 It was known for abundant fish

📈 The Dead Sea will now match that abundance

📖 Nothing becomes as full as everything

## 🧂 They Shall Be Given To Salt

Not every part of the sea changes.

"Miry places" and "marishes" refer to swampy, muddy marsh areas near the shore.

Those marshes stay salty on purpose, left just as they were.

Salt marshes were useful for harvesting salt, a valuable resource in the ancient world.

Even in a vision of total healing, one useful detail of ordinary life is kept.

🐊 Miry places and marishes mean marsh areas

🧂 Those marshes stay salty on purpose

💰 Salt was a valuable ancient resource

📖 Not everything changes, even in healing

## 🌿 Whose Leaf Shall Not Fade

Trees grow on both banks of the healed river.

Their leaves never wither or dry out, no matter the season.

This pictures a kind of life that never runs out or grows tired.

Revelation later pictures this same tree, with leaves that never fade.

Revelation even says those leaves are for healing the nations.

🌿 These leaves never wither or dry out

🌳 Trees grow on both riverbanks

🔁 Revelation describes this same unending tree

📖 Revelation ties its leaves to healing nations

## 🍇 It Shall Bring Forth New Fruit According To His Months

These trees produce a fresh crop of fruit every single month.

Ordinary fruit trees bear once or twice a year at most.

This is fruit on a schedule no natural tree could keep.

The miracle in the water produces an equally impossible harvest in the trees it feeds.

🍇 Normal fruit trees bear once or twice yearly

📅 These trees bear new fruit every month

🌊 The river's miracle feeds the trees

📖 Impossible water makes impossible fruit

## 🕊️ Because Their Waters They Issued Out Of The Sanctuary

The sanctuary is the holiest part of the temple, where God's presence rested.

This line explains why these trees never stop producing.

Their water traces back to God's own presence, not an ordinary spring.

A source that never runs dry cannot produce a tree that runs dry either.

🕊️ Sanctuary means the holiest part of the temple

💧 This water traces back to God's presence

🌳 That source explains the endless fruit

📖 A source that never dries never fails

## 💊 The Leaf Thereof For Medicine

These leaves are used for real healing, not only as a picture of it.

Ancient readers already used plant leaves as real medicine, so this detail felt practical.

Revelation later borrows this exact image for healing the nations.

God's provision in this vision reaches all the way down to ordinary sickness.

🌿 These leaves are used for real healing

💊 Ancient readers already used leaves as medicine

🔁 Revelation borrows this same image

📖 God's provision reaches down to sickness

# Ezekiel 47:13-14
# 🗺️ Joseph's Two Portions
---
## 🗺️ This Shall Be The Border Whereby Ye Shall Inherit The Land

God now shifts from the river vision to dividing the actual land.

The border defines exactly which ground belongs to which tribe.

This is not a vague promise but a specific property line.

Twelve tribes means Israel's full tribal family will each receive a share.

🗺️ The vision shifts to dividing land

📏 A border is a specific property line

👨‍👩‍👧‍👦 Twelve tribes means Israel's full family

📖 The promise becomes an exact plan

## 👦 Joseph Shall Have Two Portions

Joseph himself is not one of the twelve tribes receiving land directly.

Instead his two sons, Ephraim and Manasseh, each receive a full share.

That gives Joseph's family double the normal portion of land.

Genesis forty eight records Jacob adopting Ephraim and Manasseh as his own sons before he died.

👦 Ephraim and Manasseh are Joseph's two sons

➕ Together they receive a double portion

📜 Jacob blessed them this way in Genesis

📖 An old promise still shapes this land plan

## ⚖️ Ye Shall Inherit It One As Well As Another

Every tribe receives an equal share of this new land.

No tribe gets a smaller or lesser portion than the others.

This matters because Israel's history included real jealousy over status and blessing.

Equal inheritance here closes the door on that old rivalry.

⚖️ Every tribe receives an equal share

🚫 No tribe gets a lesser portion

💔 Old rivalries once centered on status

📖 Equal shares close the door on rivalry

## ✋ Concerning The Which I Lifted Up Mine Hand To Give It Unto Your Fathers

"Lifted up mine hand" is an old way of describing a solemn, binding oath.

God is not making a brand new promise here.

He is fulfilling a promise originally sworn to Abraham, Isaac, and Jacob.

Centuries of exile and judgment never erased that original oath.

✋ Lifted up mine hand means a binding oath

📜 God swore this to Abraham, Isaac, and Jacob

⏳ Centuries passed, but the oath still held

📖 Exile never erased God's promise

# Ezekiel 47:15-21
# 🧭 The Borders Of The Promised Land
---
## 🧭 This Shall Be The Border Of The Land Toward The North Side

The chapter now walks the reader around the land's entire border.

It starts at the north and moves through each direction in order.

These borders mostly match the land boundaries given centuries earlier through Moses.

A promise first given at Mount Sinai is still standing here after the exile.

🧭 The border tour starts at the north

🔄 It moves through each direction in order

📜 These match boundaries given through Moses

📖 An old promise still stands after exile

## 🏙️ Hamath, Berothah, Sibraim

These were real cities and regions in ancient Syria, north of Israel's heartland.

Naming each place makes this border concrete instead of vague.

Hamath marked one of the farthest points Israel's territory was ever said to reach.

This northern border runs deep into what is modern day Syria.

🏙️ These were real cities in ancient Syria

📍 Naming them makes the border concrete

🗺️ Hamath marked a far northern point

📖 The land reached deep into Syria

## 🌊 From The Border Unto The East Sea

The east sea refers to the Dead Sea, the same sea this river just healed.

The Jordan river forms a large stretch of this eastern border.

Using a real river and a real sea made the border easy to find on the ground.

The healed sea from earlier in this chapter now also marks the land's edge.

🌊 East sea means the Dead Sea

🏞️ The Jordan river forms part of this border

📍 Real rivers and seas made clear borders

📖 The healed sea also marks the land's edge

## 💧 The Waters Of Strife In Kadesh

Kadesh was the place where Israel's people quarreled with Moses over a lack of water.

"Waters of strife" is another name for that same event, also called Meribah.

Numbers twenty records Moses striking the rock in anger instead of simply speaking to it.

A place once marked by failure becomes, generations later, a border of the promised land.

💧 Waters of strife means Meribah

😠 Moses struck the rock there in anger

📜 Numbers twenty records that failure

📖 Old failure becomes a border of promise

## 🌅 The West Side Also Shall Be The Great Sea

The great sea here is the Mediterranean, the natural western edge of the land.

Unlike the inland borders, the western border needed no cities or rivers to mark it.

A sea this large made an obvious, unmistakable boundary line.

God's planning used the clearest, simplest marker available on that side.

🌊 The great sea means the Mediterranean

🗺️ It forms the natural western border

👀 A sea this large is unmistakable

📖 God used the clearest marker available

## 📖 So Shall Ye Divide This Land Unto You According To The Tribes Of Israel

The long border description now closes with a simple summary line.

Every direction has been walked and marked in detail.

The same land once lost to exile is now mapped out in full.

A God who can track a border this precisely has not forgotten His people.

🗺️ Every direction is now fully marked

📍 The land is mapped in full detail

💔 This land was once lost to exile

📖 God has not forgotten His people

# Ezekiel 47:22-23
# 🤝 Inheritance For The Stranger Too
---
## 🌍 To The Strangers That Sojourn Among You

A stranger here means a foreigner living among Israel, not a native born Israelite.

Dividing land by lot meant letting God decide the exact plot through a random draw.

Including foreigners in that same land lottery was strikingly generous for the ancient world.

Most ancient nations gave land only to their own native citizens.

🌍 Stranger means a foreigner living among Israel

🎲 Land was divided by lot, a random draw

🤝 Foreigners were included in that same lottery

📖 Most ancient nations never did this

## ⚖️ They Shall Be Unto You As Born In The Country Among The Children Of Israel

This gives resident foreigners the same legal standing as a native Israelite.

Their children born in the land share that same standing automatically.

Status here depends on where someone chooses to live, not only on bloodline.

A future king from this same line will later welcome outsiders into God's family the same way.

⚖️ Foreigners gain the same legal standing

👶 Their children share that standing too

🩸 Status depends on choice, not only bloodline

📖 This pictures outsiders later welcomed by God

## 🏡 They Shall Have Inheritance With You Among The Tribes Of Israel

Inheritance here means actual land ownership, not just permission to live somewhere.

A foreigner could now own property passed down to their own children.

Land ownership in Israel was tied closely to tribal identity and belonging.

Giving land to outsiders folded them permanently into that same identity.

🏡 Inheritance means real land ownership

👨‍👩‍👧 Property could pass down to their children

🧬 Land ownership was tied to tribal identity

📖 Outsiders were folded into that identity

## 📍 In What Tribe The Stranger Sojourneth There Shall Ye Give Him His Inheritance

A foreigner's inheritance was not assigned randomly from anywhere in the land.

It came from the specific tribe's territory where that person already lived.

This tied each foreigner's new land directly to the community already around them.

A newcomer became a full, rooted member of one tribe, not a wandering outsider.

📍 Inheritance came from wherever the stranger lived

🏘️ It tied them to their local community

🌳 A newcomer became rooted in one tribe

📖 No one stayed a wandering outsider
`.trim();

export const EZEKIEL_FORTY_SEVEN_PERSONAL_SECTIONS = parseEzekielFortySevenRawNotes(EZEKIEL_FORTY_SEVEN_RAW_NOTES);
