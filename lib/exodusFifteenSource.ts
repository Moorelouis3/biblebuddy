export type ExodusFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusFifteenRawNotes(rawText: string): ExodusFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 15:${startVerse}` : `Exodus 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 15 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_FIFTEEN_RAW_NOTES = `# Exodus 15:1-3

# 🎵 The Song Begins

---

## 🎵 Then Sang Moses And The Children Of Israel This Song Unto The LORD

This is the first recorded song in the entire Bible, composed spontaneously in response to witnessing God's deliverance firsthand. Worship here flows directly and immediately out of real experience.

🎵 This is the very first song recorded in the whole Bible

---

## 💪 The LORD Is My Strength And Song, And He Is Become My Salvation

This line later gets echoed and quoted throughout the rest of Scripture, especially in the Psalms, becoming one of the most foundational worship declarations in the entire Old Testament.

💪 This exact line is echoed repeatedly later throughout the Psalms

---

## ⚔️ The LORD Is A Man Of War

This bold, striking image describes God actively fighting on Israel's behalf, using deliberately vivid, forceful language to match the intensity of what Israel just witnessed at the Red Sea.

⚔️ This vivid image reflects God actively fighting for Israel, not standing back

# Exodus 15:4-8

# 🌊 Recounting The Red Sea Victory

---

## 🌊 Pharaoh's Chariots And His Host Hath He Cast Into The Sea

The song replays the Red Sea events poetically, crediting the victory entirely to God's direct action, cast meaning thrown, not simply describing an accident of nature or coincidence.

🌊 The song credits this victory entirely to God's direct, deliberate action

---

## 🪨 They Sank Into The Bottom As A Stone

This simile pictures instant, total sinking with no struggle or delay, emphasizing the completeness and swiftness of Egypt's defeat in the sea.

🪨 This simile emphasizes how instantly and completely Egypt's army sank

---

## 🌬️ With The Blast Of Thy Nostrils The Waters Were Gathered Together

This poetic, anthropomorphic image pictures God's powerful breath as the force behind the parting sea, vivid imagery rather than a literal claim about God having a physical body.

🌬️ This is poetic imagery for God's power, not a literal physical description

# Exodus 15:9-12

# 😤 The Enemy's Boast Versus God's Power

---

## 😤 I Will Pursue, I Will Overtake, I Will Divide The Spoil

The song quotes the Egyptian army's own arrogant, confident boasting before their defeat, four rapid "I will" statements revealing complete overconfidence just before total collapse.

😤 The repeated "I will" statements capture Egypt's arrogant overconfidence

---

## 💨 Thou Didst Blow With Thy Wind, The Sea Covered Them: They Sank As Lead

The enemy's confident boasting is immediately answered and undone by God's simple action, contrasting human arrogance directly against God's effortless, overwhelming power.

💨 Human boasting is immediately undone by God's effortless, overwhelming power

---

## ❓ Who Is Like Unto Thee, O LORD, Among The Gods?

This rhetorical question directly challenges every other god Egypt or any other nation might worship, declaring the LORD's complete, unmatched uniqueness and supremacy.

❓ This rhetorical question declares God's complete uniqueness above any other god

# Exodus 15:13-16

# 🌍 The Nations Will Tremble

---

## 🛡️ Thou In Thy Mercy Hast Led Forth The People Which Thou Hast Redeemed

The song shifts from recounting Egypt's defeat to looking ahead, describing God's ongoing, guiding mercy leading Israel forward toward their future home.

🛡️ The song shifts from past victory to God's ongoing guidance ahead

---

## 😨 The Dukes Of Edom Shall Be Amazed ... The Inhabitants Of Canaan Shall Melt Away

Dukes here means tribal chiefs or leaders. The song predicts that news of this stunning victory will spread fear among all the surrounding nations Israel will eventually encounter on their journey.

😨 Dukes means tribal chiefs, and their coming fear is predicted here in advance

---

## 🪨 They Shall Be As Still As A Stone; Till Thy People Pass Over

This poetic image pictures surrounding nations frozen with fear and unable to act, allowing Israel safe passage through territories that might otherwise oppose them.

🪨 This pictures enemy nations frozen with fear, unable to interfere

# Exodus 15:17-18

# 👑 The Promise Of The Sanctuary

---

## ⛰️ Thou Shalt Bring Them In, And Plant Them In The Mountain Of Thine Inheritance

This looks far ahead toward the promised land and eventually the temple itself, planting being a strong image of permanent, secure, lasting settlement rather than temporary residence.

⛰️ "Planting" pictures permanent, secure settlement, not a temporary stay

---

## 👑 The LORD Shall Reign For Ever And Ever

The song closes with a bold declaration of God's eternal kingship, a fitting climax to a song about His power displayed so dramatically at the Red Sea.

👑 This declaration of eternal kingship is the song's climactic conclusion

# Exodus 15:19-21

# 🎉 Miriam's Song And Dance

---

## 📢 Miriam The Prophetess, The Sister Of Aaron

Miriam is specifically identified as a prophetess here, a woman recognized with genuine spiritual authority and leadership, not merely mentioned as a background family relation.

📢 Miriam is specifically honored here with the title of prophetess

---

## 🥁 Took A Timbrel In Her Hand; And All The Women Went Out After Her With Timbrels And With Dances

A timbrel was a small hand drum, similar to a tambourine. Miriam leads the women of Israel in vibrant, physical, musical celebration, a full-bodied, communal response to God's deliverance.

🥁 A timbrel was a small hand drum, similar to a tambourine

💃 Miriam leads a vibrant, physical, communal celebration among the women

---

## 🎵 Sing Ye To The LORD, For He Hath Triumphed Gloriously

Miriam's song directly echoes Moses' opening line, showing this celebration wasn't one person's solo performance but a genuinely shared, communal outpouring of worship across the whole camp.

🎵 Miriam's echo shows this was shared, communal worship, not one person's solo

# Exodus 15:22-24

# 🏜️ Bitter Water At Marah

---

## 🏜️ They Went Three Days In The Wilderness, And Found No Water

The celebration at the Red Sea quickly gives way to a real, practical crisis, three full days without water in harsh wilderness conditions, testing the people almost immediately after their greatest triumph.

🏜️ Real hardship arrives almost immediately after the greatest celebration

---

## 😖 They Could Not Drink Of The Waters Of Marah, For They Were Bitter

Marah literally means "bitter" in Hebrew, and the place is named directly for this bitter water they finally find but still can't safely drink.

😖 Marah literally means "bitter" in Hebrew, named directly for this water

---

## 😠 The People Murmured Against Moses, Saying, What Shall We Drink?

Murmured means to complain persistently and bitterly. Despite witnessing the Red Sea miracle just days earlier, real physical thirst quickly produces doubt and complaint against Moses' leadership again.

😠 Murmured means persistent, bitter complaining

📖 Even a recent, massive miracle doesn't prevent real hardship from producing doubt

# Exodus 15:25-27

# 🌳 The Tree, The Statute, And Elim

---

## 🌳 The LORD Shewed Him A Tree ... The Waters Were Made Sweet

Shewed means showed. God provides a specific tree that, when placed in the water, makes it drinkable, another miraculous provision meeting Israel's real, practical need in the wilderness.

🌳 Shewed means showed, and this miracle meets a real, practical need

---

## ⚖️ There He Made For Them A Statute And An Ordinance, And There He Proved Them

Statute and ordinance mean binding rules or commands. Proved here means tested. This early moment already begins establishing the pattern of law and testing that will define much of Israel's wilderness experience.

⚖️ Statute and ordinance mean binding commands; proved means tested

🔮 This begins the pattern of law and testing that defines the wilderness years ahead

---

## 💊 I Am The LORD That Healeth Thee

God ties obedience directly to health and wellbeing, promising protection from the diseases Egypt suffered, revealing Himself here by a new descriptive title connected to healing and care.

💊 God reveals Himself here specifically as a healer, tied to obedience

---

## 🌴 Twelve Wells Of Water, And Threescore And Ten Palm Trees

Threescore means sixty, so seventy palm trees total. After the bitterness of Marah, Elim provides abundant, refreshing relief, twelve wells matching Israel's twelve tribes, a place of genuine rest and provision.

🌴 Threescore means sixty, so seventy palm trees total at this oasis

🔢 Twelve wells matching twelve tribes suggests abundant provision for the whole nation`;

export const EXODUS_FIFTEEN_PERSONAL_SECTIONS = parseExodusFifteenRawNotes(EXODUS_FIFTEEN_RAW_NOTES);
