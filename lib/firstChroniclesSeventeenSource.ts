export type FirstChroniclesSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesSeventeenRawNotes(rawText: string): FirstChroniclesSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 17:${startVerse}` : `1 Chronicles 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Chronicles 17 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_SEVENTEEN_RAW_NOTES = `# FirstChronicles 17:1-2
# 🏠 David Wants To Build God A House
---
## 🏛️ I Dwell In An House Of Cedars

A house of cedars means a permanent palace built from expensive imported wood.

David had already built this home in Jerusalem with help from the king of Tyre.

The contrast in this verse is deliberate.

David slept inside solid walls while the ark still sat inside a tent.

🏛️ House of cedars means a permanent palace
🌲 Cedar wood was rare and costly
😟 David lived in comfort the ark lacked
➡️ That contrast pushed David to speak up

---

## ⛺ The Ark Of The Covenant Of The LORD Remaineth Under Curtains

Curtains here means the tabernacle, the portable tent that once traveled with Israel.

The tabernacle held the ark from the days of Moses through this entire chapter.

A tent was never meant to be a lesser home for God.

It was built exactly to the pattern God gave on Mount Sinai.

⛺ Curtains means the tabernacle tent
🚶 It had traveled with Israel since Moses
📜 It followed God's own blueprint
📖 A tent was never lesser than a palace

---

## 🗣️ Do All That Is In Thine Heart

Nathan answers David immediately, before checking with God at all.

His response sounds wise, but it is really just a guess.

A prophet speaking without a word from God can still be wrong.

That is exactly what happens a few verses later.

🗣️ Nathan answered without asking God first
🤷 His answer sounded wise but was a guess
⚠️ Even a prophet can guess wrong
📖 God corrects Nathan later that same night

---

## ✅ For God Is With Thee

Nathan says this because David has succeeded at nearly everything so far.

It sounds like a safe assumption to make.

Success in the past does not guarantee that every new plan is God's plan.

God is about to make that difference clear.

✅ Nathan assumed success meant approval
📈 David had succeeded at almost everything
❌ Past success does not guarantee this plan
➡️ God is about to correct that assumption

# FirstChronicles 17:3-6
# 🚫 God Refuses David's Offer
---
## 🌙 The Word Of God Came To Nathan

This happened the very same night as the conversation with David.

God stops Nathan before the plan goes any further.

A private conversation between two men becomes an official word from God.

This is the moment Nathan's earlier guess gets replaced with the real answer.

🌙 This happened that same night
🛑 God stopped the plan before it started
📜 A private talk became an official word
📖 Nathan's guess is about to be replaced

---

## 🚫 Thou Shalt Not Build Me An House To Dwell In

God answers David's private plan with a direct no.

This is not a rejection of David himself.

It is simply not David's assignment to carry out.

The task will belong to someone else, and God explains why next.

🚫 God answers with a direct no
👤 This is not a rejection of David
📋 Building the house is simply not his job
➡️ God explains why in the next verses

---

## 📅 I Have Not Dwelt In An House Since The Day That I Brought Up Israel

God is describing about four hundred years of Israel's history in one line.

From the exodus out of Egypt until now, God's presence traveled in a tent.

That tent was the tabernacle, first built at Mount Sinai.

God chose to be mobile long before He agreed to be permanent.

📅 This spans about four hundred years
🚶 God's presence traveled with Israel the whole time
⛺ The tabernacle was that traveling tent
📖 God chose mobile before He chose permanent

---

## 🚶 From Tent To Tent, And From One Tabernacle To Another

The tabernacle was never one fixed building in Israel's early history.

It stood first at Gilgal, then Shiloh, then later at Nob and Gibeon.

Each move reflected the nation's unsettled, dangerous early years.

God was willing to keep moving as long as His people needed Him to.

🚶 The tabernacle was never fixed in one place
🗺️ It stood at Gilgal, Shiloh, Nob, and Gibeon
⚔️ Its moves matched Israel's unsettled early years
📖 God kept moving as long as needed

---

## ⚖️ Spake I A Word To Any Of The Judges Of Israel

Judges here does not mean a courtroom official.

These were the temporary military leaders described in the book of Judges.

God never once told any of them to build Him a permanent house.

David's plan came entirely from David, not from a prior instruction.

⚖️ Judges here means military leaders, not officials
📖 They are named throughout the book of Judges
🚫 God never gave that command to them
➡️ David's plan came from David, not from God

---

## 🐑 Feed My People

Feed here is shepherd language, not a reference to actual food.

A shepherd leads, protects, and cares for a flock day by day.

Calling Israel's leaders shepherds sets up exactly what kind of king David is supposed to be.

This same shepherd picture will return later when David himself is compared to a shepherd king.

🐑 Feed means shepherd, not food
🧑‍🌾 A shepherd leads and protects the flock
👑 This sets the standard for Israel's kings
📖 David himself becomes that shepherd king

# FirstChronicles 17:7-10
# 🐑 God Recounts David's Rise
---
## 🐑 I Took Thee From The Sheepcote, Even From Following The Sheep

A sheepcote was a fenced pen used to shelter sheep at night.

David spent his early years there, tending his father's flock.

No one expected a shepherd boy to become king.

God is reminding David exactly where this whole story started.

🐑 A sheepcote was a fenced sheep pen
👦 David spent his youth herding sheep there
👑 No one expected him to become king
📖 God reminds David where this story began

---

## 📛 I Have Made Thee A Name Like The Name Of The Great Men That Are In The Earth

A name here means reputation, not just a word people call you.

David's fame now reaches far beyond Israel's own borders.

God states plainly that He is the one who built that reputation.

David did not build his own legacy alone.

📛 A name means reputation, not a label
🌍 David's fame now reaches beyond Israel
🙌 God says He built that reputation
📖 David did not build his own legacy

---

## 🌱 I Will Ordain A Place For My People Israel, And Will Plant Them

Plant here is an agricultural picture, not a literal seed in the ground.

A planted nation puts down roots and stays.

That is very different from the nomadic decades before this point.

Israel is finally being promised a permanent home.

🌱 Plant means to put down roots and stay
🏕️ Israel had spent decades moving instead
🏡 This promises a permanent home
📖 A wandering nation is finally offered rest

---

## 📜 Neither Shall The Children Of Wickedness Waste Them Any More, As At The Beginning

The beginning refers to the harsh years described in the book of Judges.

During that period, enemy nations repeatedly invaded and oppressed Israel.

Children of wickedness is simply another way to name those enemies.

God is promising that specific danger will not return.

📜 The beginning points back to Judges
⚔️ Enemies had repeatedly oppressed Israel then
👥 Children of wickedness means those enemy nations
📖 God promises that danger will not return

---

## 🔄 The LORD Will Build Thee An House

David wanted to build God a house, meaning a temple.

God flips the plan entirely in this one line.

Here house means a lasting family line, a dynasty, not a building.

The very word David offered to God is handed right back to him.

🔄 David offered to build God a house
🏛️ God flips the plan completely
👨‍👩‍👧‍👦 House now means a dynasty, not a building
📖 The offer comes back to David transformed

# FirstChronicles 17:11-12
# 👑 The Promise Of A Son And A Throne
---
## 🌾 I Will Raise Up Thy Seed After Thee, Which Shall Be Of Thy Sons

Seed here means a direct descendant, one of David's own sons.

The immediate fulfillment of this promise is Solomon.

God is naming the next chapter of the story before it happens.

This promise narrows from all Israel down to one specific family line.

🌾 Seed means a direct descendant
👑 Solomon is the immediate fulfillment
📅 God names this before it happens
📖 The promise narrows to one family line

---

## 🏗️ He Shall Build Me An House

Solomon, not David, will be the one to build the temple.

David's original wish in verse one is finally granted, just not to him.

Timing here matters as much as the promise itself.

God's plans often arrive a generation later than expected.

🏗️ Solomon will build the temple, not David
🎁 David's original wish is granted through his son
⏳ Timing mattered as much as the promise
📖 God's plans can skip a generation

---

## 🔒 I Will Stablish His Throne For Ever

Stablish is an older spelling of establish, meaning to make secure and lasting.

On its own, this line could describe Solomon's own long reign.

Read alongside the rest of the chapter, it reaches much further than Solomon.

Later New Testament writers connect this exact promise to Jesus.

🔒 Stablish means to make secure and lasting
👑 On its own, this could mean Solomon
♾️ The full promise reaches further than Solomon
📖 Luke later connects this promise to Jesus

# FirstChronicles 17:13-14
# 👨‍👦 A Forever Father Son Covenant
---
## 👨‍👦 I Will Be His Father, And He Shall Be My Son

This describes a father son relationship between God and Solomon.

It is legal and covenantal language, not a claim about physical birth.

Kings in the ancient Near East were sometimes called sons of their god.

Here the LORD applies that language specifically to David's own line.

👨‍👦 This describes a covenant father son bond
📜 It is legal language, not physical birth
👑 Other ancient kings used similar language
📖 The LORD applies it to David's own line

---

## 👑 I Will Not Take My Mercy Away From Him, As I Took It From Him That Was Before Thee

Him that was before thee refers to Saul, Israel's first king.

God had removed His favor from Saul because of Saul's own disobedience.

This new promise to David's line comes with a guarantee Saul never had.

Chronicles leaves out a warning about future discipline found in the parallel account in Samuel.

👑 Him before thee refers to Saul
❌ God removed favor from Saul for disobedience
🔒 This promise comes with a stronger guarantee
📖 Chronicles softens a warning found in Samuel

---

## 🏛️ I Will Settle Him In Mine House And In My Kingdom For Ever

Mine house here connects back to the temple Solomon will build.

My kingdom widens the promise from one building to the entire nation.

Solomon's rule over Israel is folded directly into God's own rule.

This is not two separate kingdoms running side by side.

🏛️ Mine house points to Solomon's temple
👑 My kingdom widens this to the whole nation
🔗 Solomon's rule is folded into God's rule
📖 These were never two separate kingdoms

---

## 🔁 His Throne Shall Be Established For Evermore

This line repeats verse twelve almost word for word.

Repetition in Hebrew poetry usually signals real emphasis, not filler.

The chapter wants this specific promise to be impossible to miss.

An eternal throne is the single largest claim in the entire chapter.

🔁 This repeats verse twelve on purpose
📢 Repetition signals emphasis, not filler
♾️ An eternal throne is the chapter's biggest claim
📖 This promise is impossible to miss

# FirstChronicles 17:15-19
# 🙇 David's Humble Response
---
## 👁️ According To All These Words, And According To All This Vision, So Did Nathan Speak Unto David

Vision here describes how Nathan actually received this message from God.

Nathan reports the message back to David exactly as he received it.

This is very different from Nathan's earlier answer in verse two.

That earlier answer came from Nathan's own head, not from God.

👁️ Vision describes how Nathan received the message
🗣️ Nathan repeats it back to David exactly
🔄 This differs sharply from his earlier answer
📖 That earlier answer came from Nathan alone

---

## 🧎 David The King Came And Sat Before The LORD

Sitting was an unusual posture for prayer in this culture.

Most prayers in the Bible are offered standing up or lying face down.

Sitting suggests David is settling in for a long, thoughtful response.

This is a king overwhelmed enough to need a moment before he can speak.

🧎 Sitting was an unusual prayer posture
🧍 Most Bible prayers were spoken standing
⏳ Sitting suggests a long, thoughtful pause
📖 Even a king needed a moment here

---

## 👑 Who Am I, O LORD God

David already rules the most powerful kingdom in the region.

He is not asking this question out of low self worth.

He is asking it because this new promise still feels too large.

The most secure kings can still be humbled by God's generosity.

👑 David already rules a powerful kingdom
❓ This is not false humility
🎁 The promise still feels too large
📖 Even secure kings can be humbled by grace

---

## 🎉 This Was A Small Thing In Thine Eyes

The small thing David means is his own rise to kingship.

Becoming king already felt like an enormous gift to David.

God treats that huge event as only a starting point.

An eternal dynasty is layered on top of an already remarkable life.

👑 The small thing means David's own kingship
🎉 Becoming king already felt enormous to David
➕ God treats it as only a starting point
📖 An eternal promise is added on top

---

## ⏳ Spoken Of Thy Servant's House For A Great While To Come

David can see that this promise reaches centuries past his own lifetime.

No earlier king in Israel's story had ever received a promise this large.

David is reacting to scale here, not just to kindness.

He understands that history itself is being redirected in this moment.

⏳ This promise reaches far past David's life
📏 No earlier king received one this large
📈 David reacts to the promise's scale
📖 History is being redirected in this moment

---

## 📊 According To The Estate Of A Man Of High Degree

Estate here means rank or social standing, not property.

High degree describes someone treated with real honor and dignity.

David says God has treated him like nobility, not like an ordinary man.

That honor came entirely from God's choice, not from David's birth.

📊 Estate means rank, not property
🎖️ High degree means treated with honor
👑 David compares this to being treated as nobility
📖 That honor came from God's choice alone

---

## 🤐 For Thou Knowest Thy Servant

David stops piling up more words after this line.

He admits that God already knows him completely.

There is nothing left for David to explain or prove.

Sometimes the most honest prayer is simply admitting you have run out of words.

🤐 David stops adding more words here
👁️ God already knows him completely
🚫 There is nothing left to prove
📖 Honest prayer can run out of words

# FirstChronicles 17:20-22
# 🌟 There Is None Like Thee
---
## ☝️ There Is None Like Thee, Neither Is There Any God Beside Thee

This is a direct, flat declaration that David has no other god to compare.

The line does not argue the point, it simply states it.

David has just watched God's promise, not just heard about it secondhand.

That firsthand experience makes this declaration personal, not just doctrinal.

☝️ David declares there is no other god
📢 The line states this rather than arguing it
👀 David just witnessed this promise firsthand
📖 Firsthand experience makes this declaration personal

---

## 👂 According To All That We Have Heard With Our Ears

Israel did not have written Scripture the way later generations would.

Most of what people knew about God came through spoken retelling.

Parents passed these stories to their children generation after generation.

David is standing inside a long chain of listeners just like everyone else.

👂 Israel mostly learned God's story by ear
👨‍👩‍👧 Parents retold it to their children
🔗 David stands inside that same long chain
📖 Spoken memory carried the story for generations

---

## 🌍 What One Nation In The Earth Is Like Thy People Israel

David widens his focus from himself to his entire nation.

He is asking a real question, not just praising for effect.

No other nation had been rescued the way Israel had been rescued.

Israel's story was unlike anything else happening among other peoples.

🌍 David widens his focus to the whole nation
❓ This is a genuine question, not flattery
🆓 No other nation was rescued this way
📖 Israel's story stood apart from every other nation

---

## 😨 To Make Thee A Name Of Greatness And Terribleness

Terribleness here does not mean cruel or bad.

It means something that causes real awe and fear.

The plagues in Egypt and the parting of the Red Sea earned that reputation.

God's own reputation grew directly out of what He did for Israel.

😨 Terribleness means awe and fear, not cruelty
⚡ Egypt's plagues earned that reputation
🌊 The Red Sea crossing added to it
📖 God's reputation grew through Israel's rescue

---

## 🤝 Thy People Israel Didst Thou Make Thine Own People For Ever

This is the ancient covenant formula repeated many times across the Bible.

It usually appears as, I will be your God, and you will be my people.

This is not a temporary partnership that either side can walk away from.

The chapter treats this bond as permanent, matching the throne promised in verse fourteen.

🤝 This is the Bible's covenant formula
🔁 It repeats across many books of the Bible
🔒 It was never meant to be temporary
📖 It matches the permanent throne of verse fourteen

# FirstChronicles 17:23-25
# 🙏 David Asks God To Keep His Word
---
## 🙏 Let The Thing That Thou Hast Spoken Concerning Thy Servant

David is not asking for anything new in this line.

He is simply asking God to keep the promise already given.

Asking God to fulfill His own word is a common pattern in biblical prayer.

Bold prayer here is not invented, it grows directly out of God's own promise.

🙏 David asks God to keep His own word
🚫 This is not a brand new request
📜 Praying God's promises back to Him is common
📖 Bold prayer grows out of what God revealed

---

## 🔍 That Thy Name May Be Magnified For Ever

Magnified means made great or made more visible, not made bigger in size.

David's real goal in this whole prayer is God's own glory.

His own dynasty is treated as a means, not the main point.

This shifts the chapter's entire center of gravity away from David himself.

🔍 Magnified means made great or visible
🎯 God's glory is David's real goal
➡️ David's dynasty becomes a means, not the point
📖 This prayer centers on God, not David

---

## ⚔️ The LORD Of Hosts Is The God Of Israel

Hosts here refers to armies, specifically the armies of heaven.

The title pictures God as a commander leading a vast heavenly force.

David uses this powerful title right in the middle of a humble prayer.

Even his humility is directed at the most powerful possible version of God.

⚔️ Hosts means armies, specifically of heaven
👑 The title pictures God as a commander
🙇 David uses it inside a humble prayer
📖 His humility aims at the strongest possible God

---

## 💡 Thy Servant Hath Found In His Heart To Pray Before Thee

David is explaining why he feels free to pray so boldly.

He did not invent this hope on his own.

God spoke the promise first, and David is only responding to it.

Prayer here follows revelation instead of leading it.

💡 David explains his boldness in this line
🚫 He did not invent this hope himself
🗣️ God spoke first, David only responds
📖 Prayer here follows revelation, not the reverse

# FirstChronicles 17:26-27
# 💫 Thou Blessest, And It Shall Be Blessed
---
## ✅ Thou Art God, And Hast Promised This Goodness Unto Thy Servant

David restates two simple facts before making his final request.

God is truly God, and God has spoken this specific promise.

Naming both facts together gives David firm ground to stand on.

Confidence in prayer often starts with saying plainly what is already true.

✅ David restates two plain facts here
👑 God is truly God
📜 God has spoken this exact promise
📖 Confidence in prayer starts with what is true

---

## 🙏 Let It Please Thee To Bless The House Of Thy Servant

David finally states his actual request after pages of praise and reflection.

The request itself is short compared to everything that led up to it.

He asks God to bless his family line going forward.

The size of the request matches the size of trust David has already shown.

🙏 David finally states his request
📏 The request is short after so much praise
👨‍👩‍👧‍👦 He asks blessing on his family line
📖 Its size matches David's trust in God

---

## 🔒 For Thou Blessest, O LORD, And It Shall Be Blessed For Ever

This closing line describes how God's blessing actually works.

Once God blesses something, that blessing cannot be undone later.

The whole chapter opened with David wanting to build God a house.

It closes with God building David a house that will never fall.

🔒 God's blessing cannot be undone
🔄 The chapter opened with David's own plan
🏛️ It closes with God's far bigger plan
📖 David's house will never fall
`.trim();

export const FIRST_CHRONICLES_SEVENTEEN_PERSONAL_SECTIONS = parseFirstChroniclesSeventeenRawNotes(FIRST_CHRONICLES_SEVENTEEN_RAW_NOTES);
