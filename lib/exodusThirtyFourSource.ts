export type ExodusThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyFourRawNotes(rawText: string): ExodusThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 34:${startVerse}` : `Exodus 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Exodus 34 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_FOUR_RAW_NOTES = `# Exodus 34:1-4

# 🪨 New Tablets Are Prepared

---

## 🔨 Hew Thee Two Tables Of Stone Like Unto The First... Be Ready In The Morning, And Come Up In The Morning Unto Mount Sinai

**"Hew"** means to cut or shape by cutting, as with a chisel or axe. This time Moses himself must do the physical work of cutting the stone, unlike the first set, which came directly from God's own hand (Exodus 31:18). The words will still be God's, but the material preparation now costs Moses real effort — a quiet consequence of the tablets he shattered in anger.

🔨 "Hew" means to cut or shape stone by cutting

🪨 Moses cuts these tablets himself, unlike the first set God made directly

📖 This is a quiet consequence of Moses breaking the first tablets in chapter 32

➡️ The mountain's boundary lines are drawn again

---

## 🚧 No Man Shall Come Up With Thee, Neither Let Any Man Be Seen Throughout All The Mount; Neither Let The Flocks Nor Herds Feed Before That Mount

This repeats the same restricted-access boundary already established the first time Moses ascended, back in chapter 19:12-13. The mountain's holiness hasn't lessened at all despite everything that went wrong below.

🚧 This restates the same access boundary already given in chapter 19

⛰️ The mountain's holiness is unchanged despite the golden calf disaster

➡️ Moses obeys without delay

---

## ⏰ Moses Rose Up Early In The Morning, And Went Up Unto Mount Sinai... And Took In His Hand The Two Tables Of Stone

Moses' prompt obedience — rising early — mirrors his same eager response the first time God called him up this mountain, back in chapter 24:4. Nothing about this second ascent shows any hesitation on his part.

⏰ Moses' quick obedience mirrors his response the first time, in chapter 24:4

🪨 He personally carries the stone tablets he cut up the mountain himself

➡️ God descends to meet him there

# Exodus 34:5-9

# 🌟 God Proclaims His Name

---

## 📛 The LORD Descended In The Cloud, And Stood With Him There, And Proclaimed The Name Of The LORD... Merciful And Gracious, Longsuffering, And Abundant In Goodness And Truth

This fulfills exactly what God promised back in chapter 33:19 — "I will proclaim the name of the LORD." **"Longsuffering"** is an old word meaning patient, slow to anger. This proclamation becomes one of the most quoted descriptions of God's character in the rest of the Old Testament, echoed later in Numbers 14:18, Psalm 103:8, Joel 2:13, and Jonah 4:2.

📛 This directly fulfills God's promise back in chapter 33:19

⏳ "Longsuffering" means patient and slow to anger

📖 This description is quoted again and again throughout the Old Testament

➡️ The proclamation continues with more detail

---

## ⚖️ Keeping Mercy For Thousands, Forgiving Iniquity And Transgression And Sin

Three separate concepts for wrongdoing are named together here: **iniquity** (guilt or a twisted wrong), **transgression** (deliberate rebellion), and **sin** (literally missing the mark). God's forgiveness is described as covering the full range of ways people fail, not one narrow category of wrongdoing alone.

⚖️ Iniquity, transgression, and sin name three distinct kinds of wrongdoing

🌊 Forgiveness here is described as covering the full range of human failure

➡️ The same proclamation holds justice just as firmly

---

## ⚡ That Will By No Means Clear The Guilty; Visiting The Iniquity Of The Fathers Upon The Children... Unto The Third And To The Fourth Generation

Mercy and justice are held together in the very same breath here, neither one softening the other. Consequences of sin can ripple forward into a family's future generations — though this is balanced elsewhere in Scripture by the individual accountability described later in passages like Ezekiel 18.

⚡ Mercy and justice are described together, not one at the expense of the other

👨‍👦‍👦 Sin's consequences are described as capable of rippling into future generations

📖 Ezekiel 18 later balances this with individual accountability for one's own sin

➡️ Moses responds the instant he hears this

---

## 🙇 Moses Made Haste, And Bowed His Head Toward The Earth, And Worshipped... Let My LORD, I Pray Thee, Go Among Us; For It Is A Stiffnecked People; And Pardon Our Iniquity

Moses' immediate response to hearing God's own self-description is worship, then a fresh plea built directly on what he just heard. He asks for forgiveness by openly naming Israel's stubbornness rather than hiding it — using God's own proclaimed mercy as the actual basis for the request.

🙇 Moses worships immediately, without hesitation, upon hearing this proclamation

🐂 He openly names Israel's stubbornness rather than minimizing it

🙏 The plea for pardon is built directly on the mercy God just proclaimed

➡️ God answers by renewing the covenant itself

# Exodus 34:10-17

# 📜 The Covenant Is Renewed

---

## 🤝 Behold, I Make A Covenant: Before All Thy People I Will Do Marvels... I Drive Out Before Thee The Amorite, And The Canaanite, And The Hittite, And The Perizzite, And The Hivite, And The Jebusite

God formally renews the covenant relationship, promising unprecedented "marvels" and repeating the same list of nations to be displaced already given back in chapter 33:2 and chapter 23:23.

🤝 God formally renews the covenant after the golden calf crisis

📖 This same list of nations already appeared in chapters 23 and 33

➡️ A clear warning comes with this renewal

---

## 🪤 Take Heed To Thyself, Lest Thou Make A Covenant With The Inhabitants Of The Land Whither Thou Goest, Lest It Be For A Snare In The Midst Of Thee

A **"snare"** is a trap, often used for catching animals. Alliances with the surrounding nations are described here as a trap Israel could easily wander into without even realizing the danger until it was too late.

🪤 A "snare" is a trap, often used for catching animals

🤔 Foreign alliances are described as a danger easy to miss until it's too late

➡️ Specific instructions follow for dealing with pagan worship sites

---

## 🪓 Ye Shall Destroy Their Altars, Break Their Images, And Cut Down Their Groves: For Thou Shalt Worship No Other God: For The LORD, Whose Name Is Jealous, Is A Jealous God

**"Groves"** here refers to wooden poles or trees used in pagan fertility worship. God's jealousy is relational, not petty — closer to the language of a husband who will not share his wife's devotion, a marriage metaphor that runs throughout the rest of the Old Testament, especially in Hosea.

🪓 "Groves" refers to wooden poles or trees used in pagan worship

💍 God's jealousy is described in relational, marriage-like terms

📖 This same marriage imagery for idolatry reappears later in Hosea

➡️ The warning turns to marriage itself

---

## 💔 Lest Thou Make A Covenant With The Inhabitants Of The Land, And They Go A Whoring After Their Gods... And Thou Take Of Their Daughters Unto Thy Sons, And Their Daughters Go A Whoring After Their Gods

**"Go a whoring"** is the KJV's blunt idiom for spiritual unfaithfulness, comparing idolatry directly to marital betrayal. Intermarriage is warned against specifically because of its power to quietly pull the next generation into these same practices, not because of ethnicity itself.

💔 "Go a whoring" is a blunt KJV idiom comparing idolatry to marital betrayal

👨‍👩‍👧 The warning targets religious influence on the next generation, not ethnicity

➡️ The chapter's clearest, most pointed warning follows

---

## 🐄 Thou Shalt Make Thee No Molten Gods

This is a direct, pointed callback to the exact sin of chapter 32 — the molten calf — named here explicitly as the renewed covenant's single clearest warning.

🐄 This directly names the golden calf sin from chapter 32

🎯 It stands as the renewed covenant's single most pointed warning

➡️ The covenant then turns to Israel's yearly calendar

# Exodus 34:18-26

# 📅 The Feast Calendar Renewed

---

## 🍞 The Feast Of Unleavened Bread Shalt Thou Keep... In The Time Of The Month Abib: For In The Month Abib Thou Camest Out From Egypt

**"Abib"** is the old Hebrew calendar name for the first month, roughly March-April, later called Nisan. This feast, first commanded back in chapters 12-13, is restated here as part of the newly renewed covenant.

🍞 "Abib" is the old name for the first month of the Hebrew calendar

📖 This feast was first commanded back in chapters 12 and 13

➡️ The firstborn law is restated next

---

## 👶 All That Openeth The Matrix Is Mine... The Firstling Of An Ass Thou Shalt Redeem With A Lamb: And If Thou Redeem Him Not, Then Shalt Thou Break His Neck. All The Firstborn Of Thy Sons Thou Shalt Redeem. And None Shall Appear Before Me Empty

**"Openeth the matrix"** means the firstborn from the womb. This repeats the firstborn dedication law first given in chapter 13, tying every family's firstborn permanently back to the night of the Passover rescue from Egypt.

👶 "Openeth the matrix" means the firstborn offspring from the womb

🔗 This ties every family's firstborn back to the Passover night in Egypt

➡️ The weekly rhythm of rest gets restated too

---

## 🌾 Six Days Thou Shalt Work, But On The Seventh Day Thou Shalt Rest: In Earing Time And In Harvest Thou Shalt Rest

**"Earing"** is an old word for plowing. Even during the two busiest seasons of the farming year, exactly when skipping the Sabbath would seem most justified, the rest command still applies without exception.

🌾 "Earing" is an old word meaning plowing

⏸️ Even the busiest farming seasons don't excuse skipping the Sabbath

➡️ The full yearly feast calendar is named next

---

## 🎉 Thou Shalt Observe The Feast Of Weeks... And The Feast Of Ingathering At The Year's End. Thrice In The Year Shall All Your Menchildren Appear Before The LORD

Three annual pilgrimage feasts are named together here — Unleavened Bread already covered, the Feast of Weeks (later called Pentecost), and the Feast of Ingathering (later called Tabernacles) — the same three-feast calendar already laid out back in chapter 23:14-17.

🎉 Three annual pilgrimage feasts are named together in this section

📖 This same three-feast calendar already appeared in chapter 23

➡️ A remarkable promise protects the land during these feasts

---

## 🛡️ For I Will Cast Out The Nations Before Thee, And Enlarge Thy Borders: Neither Shall Any Man Desire Thy Land, When Thou Shalt Go Up To Appear Before The LORD Thy God Thrice In The Year

A striking promise follows: leaving the land undefended three times a year to travel and worship will not leave it vulnerable to invasion, because God Himself guards its borders during that exact window of time.

🛡️ God promises to personally guard the land while it's left undefended

🧳 This makes obedience to the feast calendar practically safe, not risky

➡️ Two final, specific sacrifice rules close out this list

---

## 🥛 Thou Shalt Not Offer The Blood Of My Sacrifice With Leaven... Thou Shalt Not Seethe A Kid In His Mother's Milk

**"Seethe"** means to boil. This odd-sounding final law, repeated elsewhere in the Torah back in chapter 23:19, likely rejected a specific pagan fertility ritual practiced by Canaan's neighboring nations — closing this list with one more clear line drawn against pagan custom.

🥛 "Seethe" means to boil

🚫 This law likely rejected a specific pagan fertility ritual of neighboring nations

➡️ Moses is told to write all of this down

# Exodus 34:27-28

# ✍️ Moses Writes For Forty Days

---

## 📝 Write Thou These Words: For After The Tenor Of These Words I Have Made A Covenant With Thee And With Israel

**"Tenor"** here means the substance or general sense of the words. This time Moses himself is commanded to do the writing, a contrast with the first tablets, which were "written with the finger of God" back in chapter 31:18 — Moses becomes the human scribe of God's covenant from this point forward.

📝 "Tenor" means the substance or general sense of what was spoken

✍️ Moses himself writes these words, unlike the first tablets in chapter 31

🖋️ This marks Moses becoming the covenant's ongoing human scribe

➡️ The forty-day fast on the mountain repeats

---

## 🍽️ He Was There With The LORD Forty Days And Forty Nights; He Did Neither Eat Bread, Nor Drink Water. And He Wrote Upon The Tables The Words Of The Covenant, The Ten Commandments

Moses fasts completely through a second forty-day period on this mountain, the first having stretched across chapters 24-31. **"The ten commandments"** is literally "the ten words" in Hebrew — the same core law given the first time, now recorded again on these replacement stones.

🍽️ Moses fasts completely for a second forty-day stretch on this mountain

🔟 "The ten commandments" is literally "the ten words" in the original Hebrew

➡️ Moses comes back down changed in a way he can't see

# Exodus 34:29-35

# ✨ Moses' Shining Face

---

## 😮 When Moses Came Down From Mount Sinai... Moses Wist Not That The Skin Of His Face Shone While He Talked With Him

**"Wist not"** comes from the old verb "wit," meaning to know — so Moses did not know or realize his own face was glowing after this time in God's presence. The change is visible to everyone except Moses himself.

😮 "Wist not" means did not know or realize, from the old word "wit"

✨ Moses' face genuinely glows, though he has no idea it's happening

➡️ The people's reaction reveals just how visible this change is

---

## 😨 When Aaron And All The Children Of Israel Saw Moses, Behold, The Skin Of His Face Shone; And They Were Afraid To Come Nigh Him

**"Nigh"** means near. The same people who worshipped from a distance back in chapter 33:10 are now afraid even to approach their own leader — a visible, physical mark left behind by real closeness to God.

😨 "Nigh" means near

📖 This echoes the same distance the people kept back in chapter 33:10

➡️ Moses has to take the first step himself

---

## 📢 Moses Called Unto Them; And Aaron And All The Rulers Of The Congregation Returned Unto Him: And Moses Talked With Them... He Gave Them In Commandment All That The LORD Had Spoken With Him In Mount Sinai

Moses initiates contact himself, easing the people's fear enough to let him deliver everything he had just received on the mountain.

📢 Moses takes the initiative to close the distance the people are too afraid to cross

📜 He then delivers everything just received from God on the mountain

➡️ A new practice begins because of this shining

---

## 🧕 Till Moses Had Done Speaking With Them, He Put A Vail On His Face... When Moses Went In Before The LORD To Speak With Him, He Took The Vail Off, Until He Came Out

**"Vail"** is the old spelling of veil. The pattern reverses ordinary expectation: Moses veils his face while speaking to the people, but keeps it uncovered while speaking with God. The apostle Paul later reflects at length on this same veil in 2 Corinthians 3:13-16, using it as a picture of a fading glory that needed to be covered.

🧕 "Vail" is the old spelling of veil

🔄 Moses veils his face for the people but uncovers it before God, reversing expectation

📖 2 Corinthians 3:13-16 later reflects on this exact veil at length

## 🔁 The Children Of Israel Saw The Face Of Moses, That The Skin Of Moses' Face Shone: And Moses Put The Vail Upon His Face Again, Until He Went In To Speak With Him

The closing verse locks in a repeating rhythm that continues throughout the rest of Moses' ministry: unveiled before God, veiled before the people, over and over, every time he returns from the mountain's presence.

🔁 This becomes a repeating rhythm for the rest of Moses' ministry

🌟 Unveiled before God, veiled before the people, every single time

📖 The chapter closes on this pattern as Moses' new, ongoing normal`;

export const EXODUS_THIRTY_FOUR_PERSONAL_SECTIONS = parseExodusThirtyFourRawNotes(EXODUS_THIRTY_FOUR_RAW_NOTES);
