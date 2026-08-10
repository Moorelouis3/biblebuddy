export type FirstSamuelTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwentySevenRawNotes(rawText: string): FirstSamuelTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 27:${startVerse}` : `1 Samuel 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 1 Samuel 27 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWENTY_SEVEN_RAW_NOTES = `# FirstSamuel 27:1-3
# 😨 David Flees To The Land Of The Philistines
---
## 💭 David Said In His Heart

"In his heart" means David is not praying or speaking out loud.

He is reasoning silently with himself.

The Bible often uses this phrase to mark a private, unspoken thought.

What David decides here comes from fear, not from a word from the Lord.

David is about to act on his own plan instead of asking God first.

💭 In his heart means silent thought

🤐 David does not speak this aloud

🙏 He does not ask God first

📖 This decision is his alone

---
## 😨 I Shall Now Perish One Day By The Hand Of Saul

This is not a new threat from Saul.

Saul had sworn twice, in the last two chapters, not to harm him.

David does not trust the oath.

Years of being hunted have worn down his hope.

Fear can outlast even a spoken promise.

He trusts his own escape plan more than Saul's word.

😨 David expects to die by Saul's hand

🤝 Saul had just sworn not to harm him

💔 Fear outweighs a spoken promise

📖 David trusts his own plan instead

---
## 🏃 Speedily Escape Into The Land Of The Philistines

The Philistines were Israel's longtime enemy.

This was not a neutral hiding place.

Saul would never risk chasing David into enemy land.

Going to the enemy is not surrender.

It is a calculated escape.

The very danger of the Philistines becomes David's safety.

🏃 Philistines were Israel's longtime enemy

🛡️ Saul would not chase him there

🧠 Danger becomes David's safety

📖 David thinks like a survivor here

---
## 👑 Achish, The Son Of Maoch, King Of Gath

Achish is not a new character in this story.

David had fled to this same king once before.

That time, David pretended to be insane to escape him.

Now he returns as an ally, not a desperate fugitive.

Gath was one of the five major Philistine cities.

Trusting a former enemy shows how far David has come.

👑 Achish already knew David before this

🎭 David once faked madness to escape him

🏙️ Gath was a major Philistine city

📖 This time David comes as an ally

---
## 🏘️ Every Man With His Household

This move is not a small military detachment.

Six hundred fighting men bring their families along.

David's entire community now lives among the Philistines.

This is not a raid.

It is a full relocation.

David is settling in for the long term.

🏘️ Whole households travel with the army

👪 Wives and children come along too

🏕️ This is a relocation, not a raid

📖 David is settling in for good

---
## 💍 Ahinoam The Jezreelitess, And Abigail The Carmelitess, Nabal's Wife

Two wives travel with David into Philistine territory.

Ahinoam came from Jezreel, a town in Israel's territory.

Abigail is the same woman from chapter twenty five.

She had been married to the wealthy but foolish Nabal before he died.

David married her right after Nabal's death.

Both women now share David's exile with him.

💍 Two wives travel with David

📍 Ahinoam came from the town of Jezreel

👰 Abigail was formerly Nabal's wife

📖 Both women now share David's exile

# FirstSamuel 27:4-7
# 🏡 Ziklag Becomes David's Own
---
## 📰 It Was Told Saul That David Was Fled To Gath

Someone reports David's location back to Saul.

The text does not name this informant.

Gath sat outside of Israel's borders, deep in Philistine land.

That distance changes everything about the chase.

Saul cannot easily follow him there.

📰 Someone reports David's location to Saul

🗺️ Gath lay outside Israel's borders

🚧 Distance now protects David

📖 Saul cannot easily follow him there

---
## 🛑 He Sought No More Again For Him

Saul finally stops hunting David.

This is not mercy or forgiveness.

It is simply that David is now out of reach.

The long chase ends without a final battle.

Saul's peace here is really just distance.

🛑 Saul stops the hunt for David

🚫 This is not forgiveness

📏 David is simply out of reach

📖 Distance ends the chase, not mercy

---
## 🙏 If I Have Now Found Grace In Thine Eyes

"Found grace in thine eyes" means David is asking for a favor.

It is not a claim that he deserves one.

This was a common way to ask a ruler for kindness in the ancient world.

David speaks humbly because he is a guest in Achish's land.

He is not equal to the king he is addressing.

🙏 Found grace means asking for favor

🎭 David is humble, not entitled

👑 He is a guest, not an equal

📖 Careful words were expected before a king

---
## 🏡 Let Them Give Me A Place In Some Town In The Country

David does not want to live in Gath itself.

He asks for a smaller town instead, away from the royal city.

A separate town gives David and his men more freedom to move.

It also keeps him out of Achish's daily sight.

This request is polite, but it is also strategic.

🏡 David asks for his own town

🚶 It gives him more freedom

👀 He stays out of Achish's daily sight

📖 The request is polite and strategic

---
## 🙇 Why Should Thy Servant Dwell In The Royal City With Thee

David calls himself "thy servant" while acting on his own plan.

This kind of humble language was expected when speaking to a king.

Underneath the polite words is a real request for independence.

A vassal living apart from the king could act with less supervision.

David's courtesy hides his own strategy.

🙇 Servant language shows expected courtesy

🎩 Polite words hide a real request

🕵️ Living apart means less supervision

📖 Courtesy and strategy work together here

---
## 🗺️ Achish Gave Him Ziklag That Day

Ziklag was a small town on the southern edge of Philistine land.

Achish hands it over the same day, without delay.

Giving David his own town was useful for Achish too.

A loyal foreign fighter guarding the border helped the king.

This was not a pure gift.

It also served Achish's own interests.

🗺️ Ziklag sat on the southern border

⚡ Achish gives it the very same day

🛡️ A loyal fighter guarded that border

📖 The gift served Achish too

---
## 📜 Ziklag Pertaineth Unto The Kings Of Judah Unto This Day

This line was written by someone looking back, long after these events.

By the time of writing, Ziklag belonged to the kings of Judah.

It was no longer Philistine land.

That detail shows David's stay here left a lasting mark.

A city David only borrowed became part of Israel's own territory.

"Unto this day" is the narrator's way of proving the claim.

📜 Written long after the events happened

🔀 Ziklag later belonged to Judah's kings

🏰 Philistine land became Israelite territory

📖 Unto this day marks a lasting change

---
## ⏳ A Full Year And Four Months

David spends about sixteen months living in Philistine territory.

That is a long stretch of his life spent outside Israel entirely.

This time period sets up the timeline for what happens next.

Saul dies not long after this stretch of time ends.

David's exile among the Philistines becomes the final chapter before he becomes king.

⏳ About sixteen months total

🗓️ A long stretch spent outside Israel

👑 Saul's death comes soon after this

📖 This sets up David becoming king

# FirstSamuel 27:8-9
# ⚔️ Raiding The Old Inhabitants Of The Land
---
## ⚔️ Invaded The Geshurites, And The Gezrites, And The Amalekites

These are three separate peoples living south of Philistine territory.

The Geshurites and Gezrites are lesser known groups named only a few times in the Bible.

The Amalekites are far more familiar, Israel's longtime enemy from the wilderness years.

David strikes all three groups in a single set of raids.

⚔️ Three separate peoples are named here

👥 Geshurites and Gezrites are lesser known

😠 Amalekites were Israel's longtime enemy

📖 David raids all three at once

---
## 🏺 Of Old The Inhabitants Of The Land

"Of old" means these groups had lived in this region for a very long time.

They were part of the peoples living in Canaan before Israel's conquest.

God had commanded Israel to remove groups like these when Joshua led the conquest.

David's raid here fits within that same older command.

🏺 Of old means long established there

🗺️ These peoples predate Israel's conquest

📯 Joshua's generation was told to remove them

📖 David's raid continues an old command

---
## 🗺️ As Thou Goest To Shur, Even Unto The Land Of Egypt

Shur was a wilderness region on the edge of Egypt.

This phrase marks the southern boundary of where David's raids reached.

Hagar once fled toward this same region generations earlier.

The area was remote and thinly populated, good ground for a raid no one would easily witness.

🗺️ Shur sat on Egypt's edge

🧭 This marks David's southern boundary

🐫 Hagar once fled through this same region

📖 Remote ground meant fewer witnesses

---
## ⚰️ Left Neither Man Nor Woman Alive

David kills every person in the towns he raids.

The text gives a reason for this later in the chapter.

It is not stated here, but it will matter by verse eleven.

This detail is disturbing on its own.

Scripture reports it plainly instead of hiding it.

⚰️ Every person in the towns dies

🤫 The reason comes later in the chapter

😔 The text does not soften this

📖 Scripture reports it plainly

---
## 🐑 Took Away The Sheep, And The Oxen, And The Asses, And The Camels, And The Apparel

David's men take everything of value from these towns.

Sheep and oxen meant food and trading wealth.

Donkeys and camels carried goods across long distances.

Even the clothing gets taken, since fine cloth took real time and skill to make.

This was not a quick raid.

It was a thorough one.

🐑 Livestock meant food and trade wealth

🐫 Camels carried goods over distance

👕 Even clothing counted as real plunder

📖 This raid was thorough, not quick

# FirstSamuel 27:10-12
# 🎭 The Lie That Protected David
---
## 🛤️ Whither Have Ye Made A Road To Day

"Road" here does not mean a paved path.

It is an old word for a raid or a hostile expedition.

Achish is asking David a simple question, where did you attack today.

He expects an honest answer from a loyal vassal.

David is about to lie to him directly.

🛤️ Road here means a raid

❓ Achish is asking where David struck

🤝 He expects honesty from a vassal

📖 David is about to lie

---
## 🧭 Against The South Of Judah

This claim is not true.

David never actually attacked Judah, his own tribe.

He tells Achish this to hide who he really raided.

Judah was David's own people, the very tribe he would one day rule.

Claiming to attack them protects David's real targets from suspicion.

🧭 This claim is a lie

👥 Judah was David's own tribe

🤥 He hides his real targets

📖 The lie protects David's cover

---
## 🤝 Against The South Of The Jerahmeelites, And Against The South Of The Kenites

The Jerahmeelites were a clan closely connected to Judah.

The Kenites had a long friendly history with Israel, going back to Moses's father in law.

Both groups were allies, not enemies, of Israel.

David names friendly peoples on purpose, to make his lie sound believable.

The lie is worse than it first appears, since it blames Israel's own friends.

🤝 Jerahmeelites were linked to Judah

🕊️ Kenites had old ties to Israel

👬 Both groups were really allies

📖 The lie blames Israel's own friends

---
## 🤐 Lest They Should Tell On Us

This line gives the real reason for the killing in verse nine.

David is not raiding for survival alone.

He kills every witness so his lie to Achish will hold.

The text does not hide this or excuse it.

This is one of the darker moments in David's story.

🤐 This explains the total killing

🕵️ It protects David's lie to Achish

😔 Scripture does not excuse this

📖 This is a dark moment for David

---
## 😤 He Hath Made His People Israel Utterly To Abhor Him

Achish believes David has burned every bridge back to Israel.

He thinks David has no way to return to his own people now.

That belief is completely wrong.

David has not attacked Israel at all, only enemies of Israel.

Achish trusts a story that is not true.

😤 Achish thinks Israel now hates David

🔥 He believes the bridge is burned

❌ That belief is false

📖 Achish trusts a lie completely

---
## ⛓️ He Shall Be My Servant For Ever

Achish believes he has won David's total loyalty.

He plans to keep David close permanently.

This confidence will not last.

Just two chapters later, the other Philistine lords will refuse to trust David in battle.

Achish's certainty here sets up his own disappointment down the road.

⛓️ Achish expects permanent loyalty

🛡️ He plans to keep David close

⏭️ This confidence will not last

📖 Other Philistine lords will doubt David soon
`.trim();

export const FIRST_SAMUEL_TWENTY_SEVEN_PERSONAL_SECTIONS = parseFirstSamuelTwentySevenRawNotes(
  FIRST_SAMUEL_TWENTY_SEVEN_RAW_NOTES,
);
