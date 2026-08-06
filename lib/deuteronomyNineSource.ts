export type DeuteronomyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyNineRawNotes(rawText: string): DeuteronomyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 9:${startVerse}` : `Deuteronomy 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Deuteronomy 9 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_NINE_RAW_NOTES = `# Deuteronomy 9:1-3
# 🏰 Greater Nations Than Yourself
---
## 🧱 Cities Great And Fenced Up To Heaven

"Fenced" means walled and heavily fortified for defense.

"Up to heaven" is exaggeration, not a literal height.

It describes how tall and intimidating these walls looked.

Israel already feared exactly this kind of city once before.

Numbers thirteen recorded that same fear firsthand.

This time Moses tells them to go anyway.

🧱 Fenced means heavily walled and fortified
☁️ Up to heaven is dramatic exaggeration
📜 Numbers thirteen recorded that same fear
➡️ Moses commands them forward anyway

---
## 🗡️ The Children Of The Anakims

The Anakims were known as an unusually tall and powerful people.

Their name alone had triggered fear the last time Israel scouted this land.

Numbers thirteen recorded that dread firsthand, from the ten spies.

"Who can stand before the children of Anak" became a proverb of dread.

Moses repeats that same proverb here on purpose.

🗡️ Anakims were known for great size
😨 Their name alone caused real fear
📜 Numbers thirteen recorded that same dread
📖 Moses names the fear before answering it

---
## 🔥 As A Consuming Fire He Shall Destroy Them

"Consuming fire" pictures something that destroys completely, leaving nothing behind.

Moses used this same picture in Deuteronomy four, for God himself.

Here the picture shifts.

God goes ahead of Israel as that very fire.

Israel does not have to be strong enough on its own.

The point is who leads the battle.

Not who fights it.

🔥 Consuming fire means total destruction
📜 Deuteronomy four used this same image
🚶 God goes ahead of Israel, not behind
📖 The battle depends on who leads it

# Deuteronomy 9:4-6
# ⚖️ Not For Thy Righteousness
---
## 🤫 Speak Not Thou In Thine Heart

Moses warns against a thought before Israel can even think it.

"Heart" here means a private, unspoken assumption, not just emotion.

Success was about to tempt Israel toward exactly this kind of pride.

Naming the thought in advance makes it harder to believe later.

🤫 Heart means a private, unspoken thought
🏆 Success was about to tempt Israel
🛑 Moses names the pride before it forms
➡️ A warned thought is easier to resist

---
## ⚖️ For The Wickedness Of These Nations The LORD Doth Drive Them Out

Moses repeats this exact reason twice within three verses.

The land was never a reward for Israel's own goodness.

It was judgment falling on nations already guilty of real wickedness.

Genesis fifteen already promised this exact timing.

Timing depended on the nations' sin, not on Israel's merit.

🔁 Moses repeats this reason twice
⚖️ The land was judgment, not a reward
⏳ Timing depended on sin, not merit
📖 The promise held before Israel earned anything

---
## 🐂 Thou Art A Stiffnecked People

"Stiffnecked" pictures an ox refusing to turn toward its master.

It resists direction even when that guidance is good for it.

Moses uses this word about Israel repeatedly.

Exodus used it first, and Deuteronomy repeats it now.

Verse six says it plainly, right after promising the land.

The gift and the rebuke arrive in the very same breath.

🐂 Stiffnecked pictures an ox resisting its master
🚫 It means resisting good guidance
🔀 Exodus and Deuteronomy both use this word
📖 The gift and the rebuke arrive together

# Deuteronomy 9:7-8
# 🧠 Remember And Forget Not
---
## 🧠 Remember, And Forget Not

Moses pairs two commands that mean almost the same thing.

He does this on purpose, to double the urgency.

"Remember" here means actively recalling, not simply not forgetting by accident.

Moses wants Israel to hold this history in mind deliberately, every day.

🧠 Remember means actively recalling, not drifting
🔁 Two commands double the urgency
📆 This calls for deliberate memory
➡️ Moses expects this to be easy to lose

---
## 📆 Ye Have Been Rebellious Against The LORD

Moses states this as a summary covering the whole wilderness journey.

"From the day that thou didst depart" means the pattern began immediately.

It did not start partway through, at one bad moment.

Rebellion described the entire trip, start to finish.

📆 The pattern started the day they left Egypt
🚫 Rebellion was not one bad moment
🗺️ It covered the entire journey
📖 Moses names the whole pattern honestly

---
## ⛰️ Also In Horeb Ye Provoked The LORD To Wrath

Horeb is another name for Mount Sinai, where the law was given.

This is the very place Israel later built the golden calf.

Moses opens his case with the worst single example first.

The location makes the failure sharper.

It happened at the mountain of the covenant itself.

⛰️ Horeb is another name for Sinai
🐂 This is where the golden calf happened
📍 Moses opens with the worst example
📖 The failure happened at the covenant mountain itself

# Deuteronomy 9:9-11
# 📜 Forty Days On The Mountain
---
## 🍞 I Neither Did Eat Bread Nor Drink Water

Moses spent forty days on the mountain without food or water.

This was not a symbolic detail.

It describes a real, physical fast.

The length matches other forty day periods across scripture.

Noah's flood, Israel's spies, and Jesus in the wilderness all share this number.

God sustained Moses through the fast, not human endurance alone.

🍞 No bread or water for forty days
⏳ Forty is a recurring biblical number
🙏 Human endurance alone could not explain it
📖 God sustained Moses through the fast

---
## ✍️ Written With The Finger Of God

This phrase describes direct divine authorship, not human writing.

"Finger of God" appears elsewhere to describe God's own power at work.

Exodus eight uses this same phrase for the plagues on Egypt.

The law did not come through Moses' own hand or judgment.

✍️ Finger of God means direct divine writing
⚡ It marks God's own power at work
📜 Exodus used the same phrase for the plagues
📖 The law was not Moses' own invention

---
## 🪨 The Tables Of The Covenant

"Tables" here means flat stone slabs, not furniture.

They held the actual terms of the covenant made at Sinai.

Two tables likely meant two matching copies of that agreement.

Ancient treaties commonly gave both sides a copy of the terms.

🪨 Tables means flat stone slabs
📋 They held the covenant's actual terms
📑 Two tables likely meant two matching copies
📖 Ancient treaties worked the same way

# Deuteronomy 9:12-14
# 🐂 They Have Corrupted Themselves
---
## ⏱️ Get Thee Down Quickly From Hence

God interrupts Moses' forty days with an urgent command.

"Quickly" signals how serious the situation had already become below.

Moses was still receiving the law.

Israel was already breaking its very first command.

The gift and the failure overlapped in the very same moment.

⏱️ Quickly signals real urgency
📉 Israel failed while still on the mount
🎁 The gift and the failure overlapped
📖 Timing makes the failure sharper

---
## 🔥 They Have Made Them A Molten Image

"Molten" means metal melted down and poured into a shape.

This was the golden calf, told fully in Exodus thirty two.

It broke the command against carved and molten images given days earlier.

They broke the newest command first, before almost anything else.

🔥 Molten means metal melted and poured
🐂 This was the golden calf
📜 Exodus thirty two tells the full story
📖 They broke the newest command first

---
## 🚪 Let Me Alone, That I May Destroy Them

This is not a request Moses could grant simply by staying silent.

It functions instead as an invitation for Moses to speak up.

God states the threat plainly.

Then He leaves room for Moses to respond.

Moses does respond, and that answer fills the rest of this chapter.

🚪 Let me alone invites a response
⚠️ God states the threat plainly
🙏 Moses answers by interceding instead
➡️ That response fills the rest of the chapter

# Deuteronomy 9:15-17
# 💥 The Tables Broken
---
## 🔥 The Mount Burned With Fire

This detail recalls the fire already described in Deuteronomy four and five.

The mountain still burned even as Moses carried the tables down.

The image ties the giving of the law to God's visible presence.

Fire pictures both God's holiness and the weight of what was breaking.

🔥 The mountain still burned as Moses descended
📜 This recalls Deuteronomy four and five
👀 Fire marked God's visible presence
📖 It also marked the weight of the moment

---
## 👉 Had Made You A Molten Calf

Moses shifts here from telling the story to accusing the people directly.

"Ye" replaces the earlier, more distant description of what happened.

The accusation becomes personal, aimed at the generation listening right now.

This same generation stands here decades later, hearing it recounted.

👉 Ye makes the accusation personal
🔄 Moses shifts from story to direct address
👥 The same generation stands here now
📖 The accusation was not aimed at ancestors alone

---
## 👀 Brake Them Before Your Eyes

Moses breaks the tables in full public view, not privately.

The public breaking mirrors the public nature of the sin below.

It visually announces that the covenant had already been broken.

The tables did not cause the broken covenant.

They only displayed a break that had already happened.

👀 Broken publicly, not in private
🪞 It mirrored the public sin below
📉 It announced a covenant already broken
📖 The tables displayed the break, not caused it

# Deuteronomy 9:18-21
# 🙏 Moses Intercedes Again
---
## 🔁 I Fell Down Before The LORD, As At The First

Moses repeats the exact forty day fast, now as intercession.

"As at the first" ties this fast directly back to verse nine.

The first fast received the covenant.

This one pleads to save it.

Two identical forty day periods bracket the entire golden calf crisis.

🔁 A second identical forty day fast
📜 It ties back to verse nine
🙏 This fast was intercession, not receiving
📖 Two fasts bracket the whole crisis

---
## ➕ The LORD Was Very Angry With Aaron

Exodus thirty two never actually states that God was angry at Aaron.

Moses adds this detail decades later, filling in what happened.

Aaron had built the calf himself, told fully back in Exodus.

Moses also prayed for Aaron by name, a detail missing there too.

➕ Moses adds a detail missing from Exodus
🐂 Aaron had built the calf himself
🙏 Moses prayed for Aaron by name
📖 Even Aaron's guilt gets named honestly here

---
## ⚙️ I Cast The Dust Thereof Into The Brook

Moses ground the golden calf down until it was fine as dust.

He then scattered that dust into the stream flowing from the mountain.

Exodus thirty two adds that Israel was made to drink that water.

The destruction was total.

Nothing recognizable as an idol remained.

⚙️ The calf was ground down to dust
💧 Dust was scattered into the mountain stream
🥤 Exodus adds that Israel drank that water
📖 Nothing recognizable as an idol survived

# Deuteronomy 9:22-24
# 🗺️ A Long History Of Rebellion
---
## 🔥 At Taberah, And At Massah, And At Kibrothhattaavah

Moses lists three separate places, each marking a different rebellion.

"Taberah" means burning, named for a fire in Numbers eleven.

"Massah" means testing, named for Israel doubting God in Exodus seventeen.

"Kibrothhattaavah" means graves of lust, named for judgment over craving meat.

🔥 Taberah means burning
❓ Massah means testing
⚰️ Kibrothhattaavah means graves of lust
📖 Each name preserves a specific failure

---
## 🕵️ Then Ye Rebelled Against The Commandment Of The LORD

This refers to Kadeshbarnea, where twelve spies were sent into Canaan.

Numbers thirteen and fourteen tell the full story of that refusal.

Ten discouraging spies led Israel to refuse entering the land.

That single refusal cost an entire generation forty extra years.

🕵️ This points to the spies at Kadeshbarnea
📜 Numbers thirteen and fourteen tell the story
🚫 Israel refused to enter the promised land
📖 One refusal cost forty extra years

---
## 📆 From The Day That I Knew You

Moses closes this list with the widest possible claim.

This phrase reaches back to when Moses first led Israel out.

The pattern was not occasional.

It ran the entire length of his leadership.

Naming the full pattern makes the coming plea for mercy even sharper.

📆 This spans Moses' entire leadership
🔁 Rebellion was not occasional
📏 The pattern covered the whole journey
➡️ It sets up the plea for mercy next

# Deuteronomy 9:25-29
# 🤲 Remember Thy Servants
---
## 🙏 Destroy Not Thy People And Thine Inheritance

Moses opens his prayer with a direct request, not a lengthy defense.

"Thine inheritance" calls Israel God's own possession, not just another nation.

The word choice reminds God of His own stated relationship to this people.

Moses argues from what God already claimed, not from Israel's behavior.

🙏 Moses opens with a direct request
🏛️ Inheritance means God's own possession
🔗 It reminds God of His own claim
📖 The argument rests on relationship, not merit

---
## 🙈 Look Not Unto The Stubbornness Of This People

Moses asks God to judge by something other than present behavior.

He does not defend the golden calf or minimize what happened.

Instead he asks God to look elsewhere, toward the promise.

This becomes the pattern for the rest of the prayer.

🙈 Moses does not defend the sin
⚖️ He asks God to look elsewhere
📜 The promise, not the failure, becomes the focus
📖 This shapes the entire prayer

---
## 🌍 Lest The Land Whence Thou Broughtest Us Out Say

Moses' final argument concerns God's reputation among the nations.

If Israel is destroyed, Egypt could claim God lacked the power to finish.

Moses frames destruction as a problem for God's name, not Israel's fate alone.

This same argument for God's name appears again in Numbers fourteen.

🌍 Moses argues from God's reputation
❓ Egypt could claim God lacked power
🏷️ Destruction would cost God's name too
📖 Numbers fourteen repeats this same argument
`.trim();

export const DEUTERONOMY_NINE_PERSONAL_SECTIONS = parseDeuteronomyNineRawNotes(DEUTERONOMY_NINE_RAW_NOTES);
