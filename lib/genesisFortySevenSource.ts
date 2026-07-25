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

# 🐑 Joseph Presents His Brothers To Pharaoh

---

## 📢 My Father And My Brethren ... Are Come Out Of The Land Of Canaan

Joseph formally reports his family's arrival to Pharaoh himself, exactly as he planned back in chapter 46. He's taking full personal responsibility for introducing them into Egyptian society.

📢 Joseph personally reports his family's arrival, following through on his plan

---

## 🤝 He Took Some Of His Brethren, Even Five Men

Joseph selects only five brothers to formally meet Pharaoh, not all eleven. This was likely a deliberate, practical choice, representing the family without overwhelming a royal audience.

🤝 Five brothers represent the whole family before Pharaoh

---

## 🐑 Thy Servants Are Shepherds, Both We, And Also Our Fathers

The brothers answer exactly as Joseph coached them, openly identifying as shepherds. This honesty, rather than hiding their occupation, is what secures their separate settlement in Goshen.

🐑 The brothers follow Joseph's exact coaching from chapter 46

✅ Their honesty about being shepherds works in their favor, not against them

---

## 🏕️ For To Sojourn In The Land Are We Come

Sojourn means to live somewhere temporarily, as a resident foreigner rather than a permanent citizen. The brothers are clear this is meant to be a temporary stay because of the famine, not a permanent move away from the promised land.

🏕️ Sojourn means to live somewhere temporarily, as a foreigner

📖 The family sees Egypt as a shelter for now, not a permanent home

# Genesis 47:5-7

# 👑 Pharaoh Grants Goshen

---

## 🌍 The Land Of Egypt Is Before Thee; In The Best Of The Land Make Thy Father And Brethren To Dwell

Pharaoh gives Joseph full authority to settle his family wherever he chooses, and specifically points to the best land available. This is an extraordinarily generous offer to a family of foreign shepherds.

🌍 Pharaoh offers Joseph's family Egypt's best available land

👑 This generosity reflects how highly Pharaoh values Joseph

---

## 💪 Men Of Activity ... Rulers Over My Cattle

Men of activity means capable, skilled men. Pharaoh even offers to place qualified brothers in charge of his own royal livestock, a position of real trust and responsibility for foreign newcomers.

💪 "Men of activity" means capable, skilled individuals

🏆 Pharaoh offers positions of real royal trust, not just shelter

---

## 🙏 Jacob Blessed Pharaoh

Jacob, an aging shepherd with no political power, blesses Pharaoh, the most powerful ruler in the region. In Scripture's pattern, the person doing the blessing is understood to hold the greater spiritual standing, even without earthly power.

🙏 Jacob blessing Pharaoh reverses the visible power dynamic in the room

📖 In Scripture's pattern, the one who blesses holds the greater spiritual position

# Genesis 47:8-10

# 🎂 Jacob's Age And Testimony

---

## 🎂 The Days Of The Years Of My Pilgrimage Are An Hundred And Thirty Years

Pilgrimage here means a journey through life as a temporary traveler, not a permanent resident, echoing the same idea of sojourning mentioned earlier. Jacob describes his whole 130-year life this way, as a journey rather than a settled existence.

🎂 Pilgrimage describes Jacob's whole life as a temporary journey, not a settled home

---

## 😔 Few And Evil Have The Days Of The Years Of My Life Been

Jacob describes his own life honestly as short and hard, "evil" here meaning full of trouble and hardship, not moral wickedness. This is a striking admission from a man specially chosen by God, showing that being part of God's covenant never meant an easy life.

😔 "Evil" here means hardship and trouble, not wrongdoing

📖 Being chosen by God never meant Jacob's life was free of real suffering

---

## 🙏 Jacob Blessed Pharaoh, And Went Out From Before Pharaoh

Jacob blesses Pharaoh a second time before leaving, bookending this whole meeting with blessing. Even at the end of a hard life, Jacob's instinct is still to bless, not to complain to the most powerful man he'll ever meet.

🙏 Jacob blesses Pharaoh twice, framing the entire meeting

# Genesis 47:11-12

# 🏡 The Family Settles In Rameses

---

## 🏡 In The Land Of Rameses

Rameses was a fertile region within Goshen, later becoming significant as a store-city built by the enslaved Israelites in the book of Exodus. The family's first home in Egypt is the very ground their descendants will later labor over in bondage.

🏡 Rameses was a fertile area within the region of Goshen

🔮 This same area later becomes central to the story told in Exodus

---

## 🍞 Joseph Nourished His Father ... According To Their Families

Joseph personally ensures every household within his extended family receives food, distributed family by family, showing organized, careful provision rather than a vague general promise.

🍞 Joseph's provision is organized and specific, not just a broad promise

# Genesis 47:13-17

# 💰 The Famine Deepens: Money For Bread

---

## 😨 There Was No Bread In All The Land ... Fainted By Reason Of The Famine

Fainted here means grew weak and desperate, not literally passing out. Both Egypt and Canaan are suffering severely now, showing just how widespread and total this famine really is.

😨 Fainted means grew weak and desperate from hunger

🌍 The famine is crushing both Egypt and Canaan by this point

---

## 💰 Joseph Gathered Up All The Money ... Brought The Money Into Pharaoh's House

As people spend their savings on grain, Joseph collects all of it into the royal treasury. Egypt's economic system is being reshaped as the famine drags on, with wealth increasingly consolidating under Pharaoh's authority through Joseph's management.

💰 All the grain money ends up flowing into Pharaoh's treasury

---

## 🐄 Give Your Cattle; And I Will Give You For Your Cattle

When the people run out of money entirely, Joseph proposes trading livestock for food instead. This keeps people fed without simply giving grain away for nothing, while their resources are steadily transferring to Pharaoh's control.

🐄 Livestock becomes the new currency once money runs out

# Genesis 47:18-22

# 🏞️ Land For Bread: Egypt Becomes Pharaoh's

---

## 🙏 There Is Not Ought Left In The Sight Of My Lord, But Our Bodies, And Our Lands

Ought means anything. The Egyptian people admit they have nothing left to offer except themselves and their land. This is total economic desperation, laid out honestly to Joseph.

🙏 Ought means anything at all

---

## 🌾 Buy Us And Our Land For Bread, And We ... Will Be Servants Unto Pharaoh

The people themselves propose becoming servants to Pharaoh in exchange for survival. This wasn't a demand Joseph forced on them, it's a solution the starving people request themselves as their only remaining option.

🌾 The people propose this arrangement themselves, not Joseph

📖 Total desperation led the people to offer up their own freedom voluntarily

---

## 🏞️ So The Land Became Pharaoh's

Nearly all of Egypt's farmland transfers into Pharaoh's ownership through this famine, with Joseph managing the entire transition. This dramatically reshapes Egypt's economy for generations to come.

🏞️ Egypt's land ownership shifts almost entirely to Pharaoh through this crisis

---

## ⛪ Only The Land Of The Priests Bought He Not

Egyptian priests received a fixed food allotment directly from Pharaoh regardless of the famine, so they never needed to sell their land like everyone else. This detail shows the historically accurate, privileged position Egyptian priests held in this society.

⛪ Egyptian priests received guaranteed provision, unlike the general population

📖 This reflects the real, privileged social status priests held in ancient Egypt

# Genesis 47:23-26

# 📜 The Twenty Percent Law

---

## 🌱 Here Is Seed For You, And Ye Shall Sow The Land

Even though the people now technically belong to Pharaoh and work his land, Joseph gives them seed and lets them keep farming, rather than seizing everything outright. This is structured provision, not simple conquest.

🌱 Joseph restores the people's ability to farm rather than just controlling them

---

## 🌾 Ye Shall Give The Fifth Part Unto Pharaoh, And Four Parts Shall Be Your Own

Joseph sets a twenty percent tax on future harvests, the exact same fraction he proposed back in chapter 41 for storing up grain during the good years. The people keep the majority, eighty percent, for themselves and their households.

🌾 The tax is twenty percent, echoing Joseph's original plan from chapter 41

📊 The people retain the clear majority of what they grow

---

## ⚖️ Joseph Made It A Law Over The Land Of Egypt Unto This Day

This twenty percent tax becomes a lasting, permanent Egyptian law, still in effect at the time Genesis was written. Joseph's famine management doesn't just solve one crisis, it permanently reshapes Egypt's entire economic system.

⚖️ This tax structure becomes permanent Egyptian law, not just a temporary fix

# Genesis 47:27-31

# 💔 Jacob's Final Years And His Last Request

---

## 📈 They Had Possessions Therein, And Grew, And Multiplied Exceedingly

While Egypt as a whole is reshaped by famine and debt, Jacob's family specifically thrives and grows rapidly in Goshen. This early flourishing is exactly what sets up the much larger population the book of Exodus later describes.

📈 Jacob's family grows and prospers even during Egypt's economic crisis

🔮 This growth is the seed of the much larger nation described in Exodus

---

## 🎂 Jacob Lived In The Land Of Egypt Seventeen Years

Jacob spends his final seventeen years in Egypt, reunited with Joseph, after being separated from him for the previous twenty-two years. His total lifespan reaches 147 years.

🎂 Jacob's last seventeen years are spent reunited with Joseph in Egypt

---

## ✋ Put, I Pray Thee, Thy Hand Under My Thigh

This was a solemn, binding oath gesture used elsewhere in Genesis (see Abraham's servant in chapter 24), used specifically for the most serious promises. Jacob is asking Joseph for an unbreakable vow, not a casual favor.

✋ Placing a hand under the thigh signaled the most serious kind of oath in this culture

📖 This same gesture appears earlier in Genesis for equally weighty promises

---

## ⚰️ Bury Me Not, I Pray Thee, In Egypt ... I Will Lie With My Fathers

Jacob's final request is to be buried back in Canaan with Abraham and Isaac, in the family burial cave Abraham purchased generations earlier in Genesis 23. Even at the very end of his life, Jacob's heart, and his hope, is fixed on the promised land, not Egypt.

⚰️ Jacob wants to be buried in the same family tomb Abraham purchased in Genesis 23

🏡 Even dying in Egypt, Jacob's identity remains rooted in the promised land

---

## 🤝 Swear Unto Me. And He Sware Unto Him

Jacob doesn't settle for a spoken promise alone, he requires a formal oath, and Joseph gives it. This final scene closes with father and son bound together by a solemn vow about where Jacob's story will ultimately end.

🤝 Jacob requires a formal sworn oath, not just a casual promise

⚰️ The chapter closes with Jacob's final resting place already secured by vow`;

export const GENESIS_FORTY_SEVEN_PERSONAL_SECTIONS = parseGenesisFortySevenRawNotes(GENESIS_FORTY_SEVEN_RAW_NOTES);
