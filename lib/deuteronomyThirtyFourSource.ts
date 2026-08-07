export type DeuteronomyThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyThirtyFourRawNotes(rawText: string): DeuteronomyThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 34:${startVerse}` : `Deuteronomy 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Deuteronomy 34 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_THIRTY_FOUR_RAW_NOTES = `# Deuteronomy 34:1-4
# 🏔️ Moses Views The Promised Land
---
## 🏔️ Unto The Mountain Of Nebo, To The Top Of Pisgah

Nebo is a mountain peak east of the Jordan River, in the land of Moab.

Pisgah names the specific ridge at its very top.

This mountain sits directly across the Jordan from Jericho.

Moses climbs alone, one final time, to see the land he can never enter.

🏔️ Nebo is a mountain in Moab
🗻 Pisgah names its highest ridge
🌊 Jericho sits directly across the Jordan
📖 Moses climbs it for one last look
---
## 📜 The LORD Shewed Him All The Land Of Gilead

Shewed is an old spelling of showed.

Gilead was fertile hill country east of the Jordan River.

Reuben, Gad, and half of Manasseh had already settled that same region.

God personally guides this final tour, pointing to land Moses already knows.

📜 Shewed is an old spelling of showed
⛰️ Gilead was fertile land east of the Jordan
👪 Reuben, Gad, and half Manasseh settled there
📖 God personally guides this final tour
---
## ❓ Unto Dan

This does not mean a tribe named Dan already existed here.

Dan was not yet a settled tribal territory.

Moses stood on this mountain long before that tribe ever existed.

The tribe of Dan renamed this northern city generations later, recorded in Judges 18.

❓ Dan was not yet a tribe here
🏙️ The city was renamed Dan later
📜 Judges 18 records that renaming
📖 The name reflects later, familiar geography
---
## 🌊 All Naphtali, And The Land Of Ephraim, And Manasseh

Naphtali's territory sat in the far north, near the Sea of Galilee.

Ephraim and Manasseh together held the central hill country.

That land had been promised to Joseph's two sons.

Naming these regions in one sweep pictures Moses' eyes moving south across the land.

🌊 Naphtali sat near the Sea of Galilee
⛰️ Ephraim and Manasseh held the central hills
👶 Both were Joseph's sons' territories
📖 The whole land appears in one sweep
---
## 🧭 Unto The Utmost Sea

Utmost sea refers to the Mediterranean Sea, the land's western edge.

Naming it marks the full boundary of the promise, west to east.

From this one mountain, Moses' view stretches all the way to the coast.

The land promised centuries earlier is now laid out complete before him.

🌊 Utmost sea means the Mediterranean
🧭 It marks the land's western edge
👁️ The view stretches to the coast
📖 The promised land lies complete before him
---
## 🌴 The City Of Palm Trees

City of palm trees is another name for Jericho.

Jericho sat near a natural spring, making it a lush oasis in dry country.

Palm trees needed steady water, so their presence signaled real abundance.

This is the very city Israel will conquer first, just chapters later in Joshua.

🌴 City of palm trees means Jericho
💧 A spring made it a lush oasis
🏙️ It is the first city Israel conquers
📖 Abundance marks the edge of Moses' view
---
## 🏘️ Unto Zoar

Zoar was a small town near the southern end of the Dead Sea.

Lot fled to Zoar when Sodom and Gomorrah were destroyed in Genesis 19.

Naming Zoar marks the southernmost point of Moses' view.

Judgment and promise both appear inside this single glance.

🏘️ Zoar sat near the Dead Sea
🔥 Lot fled here in Genesis 19
🧭 It marks the southern edge of view
📖 Judgment and promise appear in one glance
---
## 📜 This Is The Land Which I Sware Unto Abraham, Unto Isaac, And Unto Jacob

Sware is an old form of the word swore.

This promise goes back to Genesis, first made to Abraham.

Isaac and Jacob each inherited that same promise after him.

Centuries separate that first promise from this exact moment on the mountain.

📜 Sware is an old form of swore
👴 The promise began with Abraham
👪 Isaac and Jacob inherited the same promise
📖 Centuries later, the promise still stands
---
## 👁️ I Have Caused Thee To See It With Thine Eyes, But Thou Shalt Not Go Over Thither

Thither is an old word meaning there.

God grants Moses the sight but withholds the entry.

This consequence traces back to Numbers 20.

There, Moses struck the rock instead of speaking to it as commanded.

Seeing a promise fulfilled and personally entering it are treated here as two separate things.

📍 Thither is an old word for there
👁️ Moses receives the sight, not the entry
🪨 Numbers 20 explains why he is kept out
📖 Seeing a promise differs from entering it

# Deuteronomy 34:5-6
# ⚰️ The Death And Hidden Grave Of Moses
---
## 👑 Moses The Servant Of The LORD Died There

Servant of the LORD was a title of high honor, used for very few people in the Bible.

It marks Moses as someone whose whole life was spent in God's direct service.

According to the word of the LORD suggests his death itself came directly from God.

Even the ending of Moses' life stayed under God's control, the same as everything before it.

👑 Servant of the LORD is a high title
🙏 Moses' whole life served God directly
📜 His death came by God's own word
📖 God controlled even the end of his life
---
## 🗺️ He Buried Him In A Valley In The Land Of Moab, Over Against Bethpeor

Bethpeor was a town in Moab, near where Israel had just camped.

That same area was the site of Israel's sin with Baal of Peor back in Numbers 25.

Moses is buried near the very place where Israel had failed so badly.

The location quietly ties his death to the nation's own struggle with faithfulness.

🗺️ Bethpeor sat in the land of Moab
⚠️ Numbers 25 records Israel's sin there
🪦 Moses is buried near that same place
📖 His burial site echoes Israel's own struggle
---
## 🪦 But No Man Knoweth Of His Sepulchre Unto This Day

Sepulchre is an old word for a grave or tomb.

No one, not even Israel's own leaders, ever learned exactly where Moses was buried.

Many scholars believe the hidden location kept the grave from becoming an object of worship.

Unto this day shows this line was written sometime after Moses died.

By then, the mystery had already lasted a while.

🪦 Sepulchre is an old word for tomb
❓ No one ever learned the exact location
🙅 A hidden grave prevented grave worship
📖 Unto this day marks a later writing

# Deuteronomy 34:7-8
# 📅 Moses' Strength And Israel's Mourning
---
## 🔢 Moses Was An Hundred And Twenty Years Old When He Died

An hundred and twenty is an old way of saying one hundred twenty.

Moses' life divides neatly into three periods of forty years each.

He spent forty years raised inside Pharaoh's household.

Then forty years as a shepherd in Midian.

Then forty years leading Israel out of Egypt.

Each stage prepared him for the one that followed.

🔢 An hundred and twenty means 120
📅 His life split into three forty year stages
👑 Egypt, then Midian, then leading Israel
📖 Each stage prepared him for the next
---
## 👁️ His Eye Was Not Dim, Nor His Natural Force Abated

Dim here means weak or failing eyesight.

Abated means lessened or worn down.

At one hundred twenty, Moses' body had not weakened the normal way age usually works.

His death came by God's timing, not by his body finally giving out.

👁️ Dim means weak or failing eyesight
💪 Abated means lessened or worn down
🙅 His body had not naturally declined
📖 His death came by God's timing
---
## 👪 The Children Of Israel Wept For Moses In The Plains Of Moab Thirty Days

Thirty days was the standard formal mourning period in Israel.

Aaron, Moses' own brother, received this same thirty day mourning back in Numbers 20.

An entire nation pausing together this long shows how central Moses had become.

Losing him meant losing the only leader most of them had ever known.

📅 Thirty days was the formal mourning period
👴 Aaron received the same mourning length
👪 The whole nation paused together
📖 Moses was the only leader most had known

# Deuteronomy 34:9
# 🤲 Joshua Receives Moses' Authority
---
## 🤲 Joshua The Son Of Nun Was Full Of The Spirit Of Wisdom

Joshua had already been commissioned as the next leader back in Numbers 27.

Moses had personally laid his hands on him at that time.

Full of the spirit of wisdom marks Joshua as genuinely equipped, not just appointed on paper.

God arranged this handoff himself, before Moses ever came up this mountain.

🤲 Laying on hands transferred authority
📜 Numbers 27 records that commissioning
🧠 Joshua was genuinely equipped, not just named
📖 God arranged this handoff himself
---
## 👂 The Children Of Israel Hearkened Unto Him, And Did As The LORD Commanded Moses

Hearkened is an old word meaning listened and obeyed.

Israel's obedience transfers smoothly from Moses to Joshua.

The text ties that obedience directly back to what the LORD had already commanded Moses.

The authority was never really about one man, it belonged to God the whole time.

👂 Hearkened means listened and obeyed
🔄 Obedience transferred smoothly to Joshua
🔗 Joshua's authority ties back to God's command
📖 The authority always belonged to God

# Deuteronomy 34:10-12
# 📖 No Prophet Like Moses
---
## 📜 There Arose Not A Prophet Since In Israel Like Unto Moses

Since marks this as written after Israel had already been watching for such a prophet.

Moses himself had already promised one prophet like him would come, back in Deuteronomy 18.

No prophet in Israel's history, up to this writing, had matched him.

That promise stays open here, quietly waiting for someone still to come.

📜 Since means written after years of watching
🔮 Deuteronomy 18 already promised a prophet like Moses
❓ No one had matched him yet
📖 The promise stays open here
---
## 👀 Whom The LORD Knew Face To Face

Face to face pictures the closest possible relationship, not literal physical sight.

Exodus 33 already says no one can see God's face and live.

Moses still spoke with God in a way no other prophet ever matched.

This closeness, not just his miracles, made Moses truly unique.

👀 Face to face pictures deep closeness
🚫 Exodus 33 says none see God's face
🗣️ Moses still spoke with God uniquely
📖 Closeness, not just power, made him unique
---
## ⚡ In All The Signs And The Wonders, Which The LORD Sent Him To Do In The Land Of Egypt

Signs and wonders refers to the ten plagues and the miracles surrounding the exodus.

The text says the LORD sent him to do them.

Moses did not perform these wonders on his own power.

Naming Pharaoh, his servants, and his whole land covers the full scope of that confrontation.

The book closes by remembering exactly where Israel's story with Moses began.

⚡ Signs and wonders means the exodus plagues
🙏 The power came from God, not Moses
👑 Pharaoh, his servants, and his land are named
📖 The book closes where the story began
---
## ✋ In All That Mighty Hand, And In All The Great Terror Which Moses Shewed In The Sight Of All Israel

Mighty hand is a phrase used throughout Deuteronomy for God's powerful action in the exodus.

Great terror describes the awe and fear those miracles produced in everyone who watched.

Shewed is again an old spelling of showed.

This is the last verse of the book.

It ends with Moses still standing in front of the whole nation.

✋ Mighty hand names God's powerful action
😨 Great terror describes the awe it caused
📖 Shewed is an old spelling of showed
➡️ The book ends with Moses before the nation
`.trim();

export const DEUTERONOMY_THIRTY_FOUR_PERSONAL_SECTIONS = parseDeuteronomyThirtyFourRawNotes(DEUTERONOMY_THIRTY_FOUR_RAW_NOTES);
