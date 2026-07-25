export type ExodusSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusSixteenRawNotes(rawText: string): ExodusSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 16:${startVerse}` : `Exodus 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Exodus 16 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_SIXTEEN_RAW_NOTES = `# Exodus 16:1-3

# 😠 Israel Murmurs About Food

---

## 📅 The Fifteenth Day Of The Second Month After Their Departing Out Of The Land Of Egypt

This precise date shows exactly one month has passed since leaving Egypt, meaning any food supplies they carried out would realistically be running low by now, real practical hunger, not simple impatience.

📅 One full month has passed, meaning food supplies are realistically running out

---

## 😠 The Whole Congregation ... Murmured Against Moses And Aaron

Murmured means persistent, bitter complaining. This time it's described as the entire community complaining together, not just a scattered few individuals, showing how widespread real hunger had become.

😠 Murmured means persistent, bitter complaining, now from the whole community

---

## 🍖 When We Sat By The Flesh Pots, And When We Did Eat Bread To The Full

Flesh pots means cooking pots full of meat. The people romanticize their slavery in Egypt, remembering only the food while completely forgetting the brutal, forced labor and suffering that came with it.

🍖 Flesh pots means pots of cooking meat

💭 The people selectively remember Egypt's food while forgetting its brutal slavery

# Exodus 16:4-5

# 🍞 Bread From Heaven Is Promised

---

## 🍞 I Will Rain Bread From Heaven For You

God's response to genuine complaint isn't punishment but provision, promising food that will fall from the sky itself, meeting real physical need generously despite the people's harsh, ungrateful words.

🍞 God responds to bitter complaint with generous provision, not punishment

---

## 📏 Gather A Certain Rate Every Day, That I May Prove Them

Prove here means test. This daily provision isn't just about food, it's designed specifically to test whether Israel will trust God daily rather than hoarding out of fear or self-reliance.

📏 Prove means test, and this daily rhythm is designed to build daily trust

---

## 2️⃣ On The Sixth Day ... It Shall Be Twice As Much As They Gather Daily

God builds in an exception to the daily-only rule specifically for the sixth day, quietly introducing the pattern of Sabbath rest before it's even formally explained or commanded later in this same chapter.

2️⃣ This quietly introduces the Sabbath pattern before it's formally explained

# Exodus 16:6-9

# 🗣️ Moses And Aaron Respond

---

## 👀 Ye Shall See The Glory Of The LORD; For That He Heareth Your Murmurings

Moses connects the coming provision directly to a visible display of God's glory, framing this not just as food arriving but as proof of God's real, personal awareness of their complaints.

👀 The provision itself becomes visible proof God genuinely hears their complaints

---

## ❓ What Are We, That Ye Murmur Against Us?

Moses and Aaron point out something important: while the people direct their anger at human leaders, the complaint's real target is actually God Himself, who provided the entire journey and its plan.

❓ Moses clarifies the complaint's true target is God, not human leadership

---

## 🌙 Your Murmurings Are Not Against Us, But Against The LORD

This is stated twice for emphasis, making unmistakably clear that ordinary human frustration with hardship, when it turns to persistent complaint against God's provision, becomes something more serious than it might first appear.

🌙 This point is repeated twice, underlining how seriously it's meant

# Exodus 16:10-12

# ✨ The Glory Of The LORD Appears

---

## ✨ The Glory Of The LORD Appeared In The Cloud

God's presence becomes visibly manifest to the entire community, a direct, undeniable response confirming everything Moses and Aaron had just told them about being heard.

✨ God's presence becomes directly, visibly manifest to the whole community

---

## 🍖 At Even Ye Shall Eat Flesh, And In The Morning Ye Shall Be Filled With Bread

God confirms the specific provision Himself directly, meat in the evening and bread in the morning, meeting the people's complaint about food with complete, generous abundance.

🍖 God personally confirms complete provision for both evening and morning meals

# Exodus 16:13-15

# 🍯 Quail And Manna Arrive

---

## 🐦 At Even The Quails Came Up, And Covered The Camp

Quails were migratory birds that could be caught easily when exhausted from flight, a real, natural phenomenon in this region that God uses to provide the promised evening meat.

🐦 Quails were migratory birds, easily caught when exhausted, a real natural provision

---

## ❄️ A Small Round Thing, As Small As The Hoar Frost On The Ground

Hoar frost means a thin, white, icy morning coating. The morning provision appears as small, unfamiliar flakes covering the ground, completely unlike any food the people had ever seen before.

❄️ Hoar frost describes thin, white, icy morning coating, describing manna's appearance

---

## ❓ It Is Manna: For They Wist Not What It Was

Wist means knew. The very name "manna" likely comes from the Israelites' own confused question, "what is it?" since they genuinely had no idea what this substance actually was at first.

❓ Wist means knew, and "manna" likely comes from their own confused question

# Exodus 16:16-18

# 📏 Gathering By The Omer

---

## 📏 An Omer For Every Man, According To The Number Of Your Persons

An omer was a specific unit of dry measurement, roughly two quarts. Each household gathers according to its actual size and need, not an identical flat amount regardless of family size.

📏 An omer was a specific unit of dry measure, roughly two quarts

---

## ⚖️ He That Gathered Much Had Nothing Over, And He That Gathered Little Had No Lack

Remarkably, regardless of how much each person physically collected, everyone ends up with exactly the right amount needed, a small daily miracle of provision matching real need precisely.

⚖️ Everyone ends up with exactly the right amount, regardless of effort spent gathering

# Exodus 16:19-21

# 🐛 Don't Hoard It

---

## 🐛 Some Of Them Left Of It Until The Morning, And It Bred Worms, And Stank

Despite Moses' clear instruction, some people try to save extra manna overnight anyway, only to find it rotted and became inedible, a direct, physical lesson about trusting God's daily provision rather than hoarding out of fear.

🐛 Hoarded manna rots overnight, teaching a physical lesson about daily trust

---

## 😠 Moses Was Wroth With Them

Wroth means angry. Moses responds with real frustration at this disobedience, showing this instruction wasn't just a casual suggestion but a serious command meant to build a specific pattern of daily dependence.

😠 Wroth means angry, showing this instruction carried real weight

---

## ☀️ When The Sun Waxed Hot, It Melted

Waxed means became. The manna itself was temporary and couldn't be stockpiled through the heat of the day either, reinforcing the same daily, ongoing dependence on God's provision.

☀️ Waxed means became, and the manna's melting reinforces daily dependence

# Exodus 16:22-26

# 📅 A Double Portion For The Sabbath

---

## 2️⃣ On The Sixth Day They Gathered Twice As Much Bread

Exactly as God promised back in verse 5, the people find double the usual amount available on the sixth day specifically, without yet fully understanding why.

2️⃣ The doubled amount on day six happens exactly as God promised earlier

---

## 🛐 To Morrow Is The Rest Of The Holy Sabbath Unto The LORD

Moses now formally explains what's been building quietly since verse 5: this doubled provision exists specifically to allow full rest from gathering on the seventh day, the Sabbath.

🛐 Moses now formally explains the Sabbath pattern hinted at since verse 5

---

## ✅ It Did Not Stink, Neither Was There Any Worm Therein

Unlike every other day, the Sabbath-eve portion miraculously doesn't spoil overnight, a specific exception proving this rest pattern comes directly from God's design, not coincidence.

✅ This specific exception to spoiling proves the Sabbath pattern is God's design

# Exodus 16:27-31

# 🚫 Some Still Go Out, And Manna Is Named

---

## 🚫 There Went Out Some Of The People On The Seventh Day For To Gather, And They Found None

Despite clear instruction, some people test the rule anyway by going out on the Sabbath, only to find, exactly as promised, no manna waiting for them that day.

🚫 Some test the Sabbath rule directly, finding exactly what was promised: nothing

---

## ❓ How Long Refuse Ye To Keep My Commandments And My Laws?

God directly confronts this repeated pattern of testing and disobedience, treating it as a serious, ongoing issue rather than simply overlooking a minor mistake.

❓ God treats this repeated testing as a serious pattern, not a small mistake

---

## 🌾 It Was Like Coriander Seed, White; And The Taste Of It Was Like Wafers Made With Honey

The chapter finally gives a fuller physical description: small and white like coriander seed, sweet like honey wafers, helping readers actually picture and understand what this daily provision looked and tasted like.

🌾 This gives a full physical description: small, white, and honey-sweet in taste

# Exodus 16:32-36

# 🏺 Manna Preserved As A Testimony

---

## 🏺 Fill An Omer Of It To Be Kept For Your Generations

God commands a permanent sample of manna be preserved specifically as a lasting physical reminder, ensuring future generations who never experienced the wilderness could still see tangible proof of God's provision.

🏺 A preserved sample ensures future generations can see tangible proof of provision

---

## 📦 Lay It Up Before The Testimony

The Testimony refers to the Ark of the Covenant and its contents, not yet built at this point in the story but already anticipated here, showing this preserved manna's future intended location.

📦 The Testimony refers to the Ark of the Covenant, anticipated before it's built

---

## ⏳ The Children Of Israel Did Eat Manna Forty Years

This single provision sustains the entire nation for the full duration of their wilderness wandering, a remarkably long, consistent display of daily faithfulness stretching across an entire generation.

⏳ Manna sustains the whole nation for the entire forty years of wilderness wandering

---

## 📏 An Omer Is The Tenth Part Of An Ephah

This closing note explains the exact measurement for readers unfamiliar with these ancient units, an ephah being a larger standard dry measure, helping ground this miracle in real, precise, understandable terms.

📏 An ephah was a larger standard measure; an omer equals one-tenth of it`;

export const EXODUS_SIXTEEN_PERSONAL_SECTIONS = parseExodusSixteenRawNotes(EXODUS_SIXTEEN_RAW_NOTES);
