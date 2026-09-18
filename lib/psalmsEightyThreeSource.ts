export type PsalmsEightyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightyThreeRawNotes(rawText: string): PsalmsEightyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+83:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 83 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+83:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+83:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 83 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 83,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 83:${startVerse}` : `Psalms 83:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 83 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTY_THREE_RAW_NOTES = `# Psalms 83:1-2
# 🙊 A Prayer That Refuses Silence
---
## 🤫 Keep Not Thou Silence, O God

"Keep not silence" is said three different ways in this one verse.

"Hold not thy peace" and "be not still" both restate the same plea.

This psalm opens as an urgent cry, not a calm request.

The repetition itself begs God to act now, not later.

🤫 Three phrases beg God to act

🔁 Repetition shows real urgency

⏳ This is a now, not later, plea

📖 Silence from God feels unbearable here

## 📢 Thine Enemies Make A Tumult

"Tumult" means a loud, chaotic uproar, like a mob working itself up.

This is not a quiet threat forming in secret.

The enemies are already loud and visible.

Verse three explains that this noise hides a real plan underneath it.

📢 Tumult means a loud chaotic uproar

👂 The threat is loud, not hidden

🎭 Noise conceals a deeper plan

📖 Verse three reveals what is underneath

## 🙆 They That Hate Thee Have Lifted Up The Head

"Lifted up the head" is an old idiom for open defiance.

It pictures someone raising their head high instead of bowing it in respect.

This is not private hatred anymore.

It has turned into public, confident rebellion.

🙆 Lifted up the head means defiance

😤 It pictures a proud, raised posture

🔓 Private hatred has turned public

📖 Confidence marks their open rebellion

# Psalms 83:3-8
# 🤝 Ten Nations Unite Against Israel
---
## 🧠 They Have Taken Crafty Counsel Against Thy People

"Crafty counsel" means a carefully planned scheme, not a sudden outburst.

This plan was thought through and deliberate.

"Thy people" and "thy hidden ones" both point to Israel.

"Hidden ones" pictures a treasure kept safe and close, not exposed to danger.

🧠 Crafty counsel means a careful scheme

📋 This plot was deliberate, not sudden

👥 Thy people points to Israel

📖 Hidden ones pictures a protected treasure

## 🎯 Let Us Cut Them Off From Being A Nation

This is the actual goal behind the conspiracy.

The enemies want more than a military win.

They want Israel erased completely, with no future generations left.

Saying the name of Israel would no more be remembered makes the goal chillingly plain.

🎯 Their real goal is erasing Israel

⚔️ This goes past a military win

🚫 No future generation is meant to remain

📖 The plan targets Israel's very existence

## 🤝 They Are Confederate Against Thee

"Confederate" means bound together by a shared agreement or treaty.

Many of these nations were normally rivals with each other.

A shared hatred of Israel was strong enough to unite old enemies.

This alliance was actually aimed at God himself, not only at Israel.

🤝 Confederate means bound by agreement

⚔️ These nations were normally rivals

🎯 Shared hatred united old enemies

📖 The alliance targeted God, not just Israel

## 👨‍👦 The Tabernacles Of Edom, And The Ishmaelites

Edom descended from Esau, Jacob's own twin brother.

The Ishmaelites descended from Ishmael, Abraham's son through Hagar.

Both nations shared close family roots with Israel.

Old family history did not stop this hostility.

👨‍👦 Edom descended from Esau, Jacob's brother

🏕️ Ishmaelites descended from Ishmael, Abraham's son

👪 Family ties did not prevent hostility

📖 Even relatives can turn hostile

## 🌍 Of Moab, And The Hagarenes

Moab descended from Lot, Abraham's nephew, through a troubling family story in Genesis nineteen.

The Hagarenes were a nomadic people living east of Gilead.

Their name likely echoes Hagar.

Many scholars believe they were a separate tribe from the Ishmaelites.

🌍 Moab descended from Lot, Abraham's nephew

🏕️ Hagarenes were nomads east of Gilead

🔤 Their name likely echoes Hagar

📖 Another relative nation joins the plot

## ⚔️ Gebal, And Ammon, And Amalek

Ammon descended from Lot as well, a brother nation to Moab.

Amalek descended from Esau's grandson.

Amalek had been Israel's enemy since the exodus from Egypt.

"Gebal" here likely names a region near Edom, not the famous Phoenician city of the same name.

👨‍👦 Ammon also descended from Lot

⚔️ Amalek descended from Esau's grandson

🗡️ Amalek was Israel's enemy since the exodus

📖 Gebal likely names a region near Edom

## 🌊 The Philistines With The Inhabitants Of Tyre

The Philistines were Israel's constant enemy to the west.

Tyre was a Phoenician city that had usually been friendly to Israel.

King Hiram of Tyre had even helped build Solomon's temple.

Tyre joining this hostile coalition marks a real betrayal.

⚔️ Philistines were a constant western enemy

🌊 Tyre was usually a friendly neighbor

🏛️ Hiram of Tyre helped build the temple

📖 A former friend joins the enemy side

## 🏹 Assur Also Is Joined With Them

"Assur" names Assyria, the rising military power to the north.

Assyria did not simply join as an equal partner.

"Holpen" is an old word meaning helped or supported.

Assyria lent military muscle to back up Moab and Ammon.

🏹 Assur names the empire Assyria

🤝 Assyria backed the alliance with force

💪 Holpen means helped or supported

📖 The whole confederacy now stands complete

## ⏸️ Selah

"Selah" is a musical or liturgical marker inserted for the reader.

Many scholars believe it signaled a pause to let the words sink in.

The completed list of ten enemy nations lands right before this pause.

The size of the threat is meant to feel overwhelming here.

⏸️ Selah marks a pause for reflection

🎵 Many scholars believe it cued a pause

🔟 Ten nations now stand listed

📖 The pause lets the threat sink in

# Psalms 83:9-12
# 🏹 Remember Gideon's Victory
---
## 🛡️ Do Unto Them As Unto The Midianites

This calls back to Gideon's defeat of Midian in the book of Judges.

Midian had once terrorized Israel by raiding their crops year after year.

God gave Gideon a tiny army and still won a complete victory.

The prayer asks for that same kind of decisive defeat now.

📜 This recalls Gideon's victory in Judges

🌾 Midian once raided Israel's crops

🛡️ God won with a tiny army

📖 The prayer asks for that same defeat

## 👑 As To Sisera, As To Jabin, At The Brook Of Kison

This calls back to a second story from Judges, Deborah and Barak's victory.

Jabin was a Canaanite king and Sisera was his army commander.

"Kison" names the Kishon, a brook where Sisera's army was defeated.

Two separate deliverance stories are stacked together here as one prayer.

📜 This recalls Deborah and Barak's victory

👑 Jabin was a Canaanite king

⚔️ Sisera commanded Jabin's army

📖 Two old victories become one prayer

## 💀 Which Perished At Endor, They Became As Dung For The Earth

Endor sits near the battle site by the Kishon.

"Dung for the earth" is a blunt, disturbing picture of total defeat.

The bodies were left scattered and unburied on the ground.

The prayer asks for an equally total defeat this time.

📍 Endor sits near the Kishon battle

💀 Dung for the earth means total defeat

🚫 Bodies were left scattered, unburied

📖 A total defeat is the request again

## 🐦 Make Their Nobles Like Oreb, And Like Zeeb

Oreb and Zeeb were two Midianite commanders captured during Gideon's pursuit.

Their names literally mean raven and wolf in Hebrew.

Gideon's men killed them at a rock and a winepress later named for them.

This detail comes straight from Judges chapter seven.

🐦 Oreb means raven in Hebrew

🐺 Zeeb means wolf in Hebrew

🪨 Both died at places later named for them

📖 This detail comes from Judges seven

## 🏹 Yea, All Their Princes As Zebah, And As Zalmunna

Zebah and Zalmunna were two Midianite kings, a rank above Oreb and Zeeb.

Gideon personally pursued and killed these two kings in Judges chapter eight.

The prayer asks for every enemy leader, high or low, to fall the same way.

No rank offers protection in this request.

👑 Zebah and Zalmunna were Midianite kings

🏹 Gideon personally killed them in Judges eight

📊 Every rank of leader is included here

📖 No rank offers protection in this prayer

## 🏡 Let Us Take To Ourselves The Houses Of God In Possession

This finally states what the enemies actually wanted.

"Houses of God" means the land and pasturelands that belonged to God's people.

The enemies wanted to seize it and claim it as their own permanent property.

Naming their true motive here justifies everything asked for in this prayer.

🎯 This states the enemies' real motive

🏡 Houses of God means the land itself

✋ They wanted to seize it permanently

📖 A clear motive justifies this prayer

# Psalms 83:13-15
# 🌪️ Wind, Fire, And Storm
---
## 🌪️ Make Them Like A Wheel, As The Stubble Before The Wind

"A wheel" here pictures tumbleweed, a dry plant that rolls and spins across open ground.

"Stubble" means the dry leftover stalks after a harvest.

Both images picture something light, rootless, and easily blown away.

The prayer asks for the enemy to be scattered that easily.

🌪️ A wheel pictures rolling tumbleweed

🌾 Stubble means dry leftover harvest stalks

💨 Both images picture something rootless

📖 The prayer asks for easy scattering

## 🔥 As The Fire Burneth A Wood, And As The Flame Setteth The Mountains On Fire

This pictures a wildfire spreading fast through a forest.

The same fire then jumps and spreads across entire mountains.

Nothing about this destruction is slow or contained.

The image describes speed and totality, not cruelty for its own sake.

🔥 A wildfire pictures fast spreading destruction

🏔️ The fire spreads across whole mountains

⚡ Nothing about this image moves slowly

📖 The prayer asks for total, swift defeat

## 🌩️ So Persecute Them With Thy Tempest, And Make Them Afraid With Thy Storm

"Tempest" and "storm" both describe violent, overwhelming weather.

This verse ties the wind, fire, and storm pictures together into one request.

The prayer asks God himself to be the one chasing the enemy, not Israel's army.

Fear itself becomes part of the answer being asked for.

🌩️ Tempest and storm both mean violent weather

🔗 This verse ties every image together

🏹 God himself is asked to give chase

📖 Fear is part of the answer sought

# Psalms 83:16-18
# 👑 That They May Know Thy Name
---
## 🔄 Fill Their Faces With Shame, That They May Seek Thy Name, O LORD

This is the turn in the whole prayer.

Shame here is not the final goal by itself.

The purpose behind the shame is that the enemies would turn and seek God.

Even a prayer for judgment carries a hope for repentance underneath it.

🔄 This verse is the prayer's turning point

😳 Shame is not the final goal

🙏 The goal is enemies seeking God

📖 Judgment can carry hope for repentance

## ⚖️ Let Them Be Confounded And Troubled For Ever

This verse states the other possible outcome.

If the enemies refuse to turn toward God, lasting ruin is what remains.

Two paths sit side by side in these closing verses, repentance or ruin.

The prayer does not hide the harder possibility.

⚖️ This verse names the other outcome

🚫 Refusing God leads to lasting ruin

🔀 Two paths sit side by side

📖 The harder possibility is not hidden

## ⚰️ Let Them Be Put To Shame, And Perish

This adds a final, permanent outcome beyond mere embarrassment.

"Perish" means complete destruction, not just defeat.

The request escalates from trouble, to shame, to perishing entirely.

This is the last and most severe request in the whole psalm.

⚰️ Perish means complete destruction

📈 The request escalates step by step

🔚 This is the psalm's most severe ask

📖 Judgment reaches its full weight here

## 🔥 That Men May Know That Thou, Whose Name Alone Is JEHOVAH

"JEHOVAH" is God's personal, covenant name.

It is the same name revealed to Moses at the burning bush.

It appears written this way only a few times in the King James Version.

The psalm's ultimate goal is not defeating ten nations.

The goal is that people everywhere would know exactly who God is.

🔥 JEHOVAH is God's personal covenant name

📜 It was revealed to Moses at the bush

🔢 It appears this way rarely in the KJV

📖 The real goal is that people know God

## 👑 Art The Most High Over All The Earth

"Most High" is a title claiming authority above every other power.

This closing line reaches far beyond Israel's ten enemy nations.

God's rule is described as covering the entire earth, not one region.

The psalm that opened begging for a response ends in total confidence.

👑 Most High claims authority over all

🌍 This reaches beyond just ten nations

🗺️ God's rule covers the whole earth

📖 The psalm ends in confidence, not fear`.trim();

export const PSALMS_EIGHTY_THREE_PERSONAL_SECTIONS = parsePsalmsEightyThreeRawNotes(PSALMS_EIGHTY_THREE_RAW_NOTES);
