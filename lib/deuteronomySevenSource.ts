export type DeuteronomySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomySevenRawNotes(rawText: string): DeuteronomySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 7:${startVerse}` : `Deuteronomy 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Deuteronomy 7 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_SEVEN_RAW_NOTES = `# Deuteronomy 7:1-2
# ⚔️ Seven Enemy Nations
---
## 🗺️ Seven Nations Greater And Mightier Than Thou

Israel was about to enter a land filled with seven established nations.

The Hittites, Girgashites, Amorites, Canaanites, Perizzites, Hivites, and Jebusites all lived there.

Each nation controlled its own cities, armies, and gods.

Together they were older, larger, and better armed than the tribes coming out of the wilderness.

God was sending Israel against forces that looked impossible to beat.

🗺️ Seven established nations filled the land

🏛️ Each had its own cities and gods

💪 Older, larger, and better armed than Israel

📖 God sent Israel against impossible odds

---
## 🔥 Utterly Destroy Them

"Utterly destroy" means far more than winning a battle.

It describes total destruction with nothing kept back.

The Hebrew word behind it is the same word used for offerings fully devoted to God.

Taking these cities was not simple conquest for land or loot.

This was judgment aimed straight at false worship.

🔥 Utterly destroy means total destruction

📜 Same word used for offerings devoted to God

🚫 Not simple conquest for land or loot

📖 The goal was judgment on false worship

---
## 👁️ Shew Mercy Unto Them

"Shew" is an old spelling of the word show.

To shew mercy here means sparing an enemy through treaty or ransom.

Israel is told not to offer that option to these seven nations.

The danger was never about ethnic hatred.

It was about the false gods these nations would bring into Israel's homes.

👁️ Shew is an old spelling of show

🤝 Mercy here meant sparing an enemy by treaty

🚫 That option was closed for these nations

📖 The real danger was false gods, not ethnicity

# Deuteronomy 7:3-5
# 🚫 No Marriages, No Idols
---
## 💍 Neither Shalt Thou Make Marriages With Them

This law was not about race or bloodline.

Marriage in the ancient world usually meant joining two households and their gods together.

A daughter given in marriage brought her family's worship into the new home.

Israel could not stay loyal to one God while inheriting a spouse's old ones.

The command protected worship, not ancestry.

💍 Marriage joined two households and their gods

🏠 A wife brought her family's worship home

☝️ Israel could not split loyalty between gods

📖 The command protected worship, not ancestry

---
## 😡 Turn Away Thy Son From Following Me

God names the real fear behind this command directly.

A foreign spouse would pull the next generation toward other gods.

One generation of compromise could quietly end true worship in a family.

The warning is aimed at the children not yet born.

😡 God names the real danger plainly

👶 A spouse could pull children toward other gods

⏳ One compromise could end true worship

📖 The warning protected generations not yet born

---
## 🪨 Destroy Their Altars, And Break Down Their Images

Canaanite worship centered on outdoor altars built on hills and under trees.

"Images" here means carved stone or wood figures representing local gods.

Leaving even one altar standing would give old worship a way back in.

Complete removal, not partial cleanup, was the actual command.

🪨 Canaanite altars sat on hills and under trees

🗿 Images meant carved figures of local gods

🚫 One leftover altar could invite old worship back

📖 The command called for complete removal

---
## 🌳 Cut Down Their Groves, And Burn Their Graven Images With Fire

"Groves" refers to wooden poles set up beside altars for the goddess Asherah.

They stood as a visible symbol of Canaanite fertility worship.

"Graven images" means idols carved by hand from wood or stone.

Burning them made the destruction final.

Nothing could be saved and rebuilt later.

🌳 Groves were wooden poles for Asherah worship

🗿 Graven images meant hand carved idols

🔥 Burning made the destruction final

📖 Nothing could be saved and rebuilt later

# Deuteronomy 7:6-8
# 👑 A People Set Apart
---
## 👑 An Holy People Unto The Lord Thy God

"Holy" does not mean morally perfect here.

It means set apart for a specific purpose.

Israel was marked off from every surrounding nation for God's own use.

Being holy was a status given, not a reward earned.

👑 Holy means set apart, not perfect

🌍 Israel was marked off from other nations

🎁 Holiness was given, not earned

📖 A people belongs to whoever set them apart

---
## 💎 A Special People Unto Himself, Above All People

"Special" here translates a Hebrew word meaning a treasured possession.

The same word describes a king's personal treasure, kept apart from the national wealth.

God claims Israel the same way a king claims his own private treasure.

This was never a claim that Israel deserved more than other nations.

💎 Special means a treasured possession

👑 Like a king's own private treasure

🚫 Not a claim that Israel deserved more

📖 God claimed Israel as His own

---
## 🔢 Not Because Ye Were More In Number Than Any People

A reader might assume Israel earned this position by growing into a great nation.

Moses corrects that assumption immediately.

Israel was actually the smallest and weakest group among its neighbors.

God's choice never depended on Israel's size or strength.

🔢 Israel was the fewest, not the greatest

🚫 Size was never the reason for choosing

😔 A small, weak people got chosen anyway

📖 God's choice never depended on strength

---
## ❤️ Because The Lord Loved You

God gives the actual reason in plain words.

He loved them and kept an oath sworn generations earlier to their fathers.

That oath traces back to the promise God made to Abraham.

The whole relationship rests on God's love and God's word, not on Israel's merit.

❤️ Love, not merit, was the real reason

📜 An old oath to Abraham stood behind it

🤝 God kept His word across generations

📖 The relationship rested on God, not Israel

# Deuteronomy 7:9-11
# 🤝 The Faithful God
---
## 🛡️ The Faithful God, Which Keepeth Covenant And Mercy

"Faithful" here means completely reliable, never breaking a promise.

"Covenant" is a binding agreement, sealed with real obligations on both sides.

"Mercy" pairs with it, meaning loyal love that outlasts any excuse to quit.

Together the two words describe a God who never walks away from His word.

🛡️ Faithful means completely reliable

🤝 Covenant means a binding agreement

❤️ Mercy means loyal love that outlasts excuses

📖 God never walks away from His word

---
## ⏳ To A Thousand Generations

A thousand generations is a way of saying without any real limit.

No family alive at the time could count that far into the future.

The phrase promises loyalty stretching far beyond anyone's own lifetime.

God's memory of a promise does not fade the way human memory does.

⏳ A thousand generations means without real limit

👴 No one could count that far ahead

♾️ The promise outlasts any single lifetime

📖 God's memory of a promise never fades

---
## ⚡ Repayeth Them That Hate Him To Their Face

"To their face" means directly and in that same lifetime.

This is not a delayed punishment passed down to grandchildren.

Whoever hates God answers for it personally, not through their descendants.

The text pairs mercy for the faithful with direct justice for the defiant.

⚡ To their face means direct and personal

🚫 Not punishment delayed onto grandchildren

⚖️ Each person answers for their own hatred

📖 Mercy and justice both land directly

---
## 📚 Keep, And Do Them

Moses moves from describing God's character to giving a command.

Knowing who God is comes before obeying what He says.

"Keep" means guard carefully, not just remember.

"Do" means actually carry it out in daily life.

📖 Knowing God comes before obeying God

🛡️ Keep means guard carefully

🏃 Do means actually carry it out

➡️ Belief was always meant to lead to action

# Deuteronomy 7:12-16
# 🌾 The Blessing Of Obedience
---
## 🤝 The Lord Thy God Shall Keep Unto Thee The Covenant

This blessing works in both directions.

God already promised to love and choose Israel regardless of merit.

Now He promises to actively keep blessing them as they walk in obedience.

The relationship was never one sided, even though it started with grace.

🤝 The blessing runs in both directions

🎁 God chose Israel by grace first

🌾 Obedience opened the door to blessing

📖 Grace and obedience worked together

---
## 👶 Bless The Fruit Of Thy Womb

Children were counted among the greatest blessings in this culture.

A large family meant labor for the fields, protection, and care in old age.

Fertility was never taken for granted in the ancient world.

This promise answered a very real and common fear.

👶 Children counted as a major blessing

🌾 More children meant more labor and care

😌 Fertility was never taken for granted

📖 This promise answered a real fear

---
## 🌾 Thy Corn, And Thy Wine, And Thine Oil

"Corn" in this old English does not mean the yellow vegetable eaten today.

It means grain in general, mostly wheat and barley.

Grain, wine, and oil together were the three basic staples of life in Israel.

Naming all three covers food, drink, and daily cooking at once.

🌾 Corn here means grain, not the modern vegetable

🍇 Wine came from the vineyards

🫒 Oil came from the olive trees

📖 Together they covered a whole household's needs

---
## 🐄 The Increase Of Thy Kine, And The Flocks Of Thy Sheep

"Kine" is an old word for cattle.

A growing herd meant real, visible wealth in this economy.

Cattle and sheep provided milk, meat, wool, and labor for plowing fields.

An increasing flock was proof that the blessing promised earlier was actually happening.

🐄 Kine is an old word for cattle

💰 Growing herds meant real visible wealth

🐑 Flocks supplied milk, meat, and wool

📖 Growth proved the promised blessing was real

---
## 🚫 There Shall Not Be Male Or Female Barren Among You

Barrenness carried heavy shame in the ancient world.

Sarah, Rachel, and Hannah all struggled with this exact pain elsewhere in scripture.

A promise removing barrenness answered one of the deepest fears a family could carry.

This blessing reached both people and their animals.

🚫 Barrenness carried heavy shame back then

😢 Sarah, Rachel, and Hannah faced this pain

👨‍👩‍👧 This promise answered a deep family fear

📖 The blessing covered people and animals alike

---
## 🩹 Take Away From Thee All Sickness

God names Egypt's diseases specifically as the ones Israel would be spared.

This generation had watched plagues strike Egypt firsthand.

The same power that sent sickness on Egypt could just as easily hold sickness back from Israel.

Health here is tied directly to the same hand that judged Pharaoh.

🩹 God names Egypt's diseases specifically

👁️ This generation watched those plagues firsthand

💪 The same hand that judged could also protect

📖 Israel's health was tied to God's power

---
## 👎 Lay Them Upon All Them That Hate Thee

The very sicknesses spared from Israel would fall on their enemies instead.

This is a full reversal, not simply an absence of harm.

What Egypt suffered becomes the fate of whoever opposes God's people next.

The blessing was never passive.

It actively moved harm away from Israel.

👎 Enemies would suffer what Israel was spared

🔄 This is a full reversal, not just relief

⚔️ Opposing God's people carried real danger

📖 The blessing actively moved harm away

# Deuteronomy 7:17-19
# 😨 Do Not Be Afraid
---
## 💭 If Thou Shalt Say In Thine Heart, These Nations Are More Than I

Moses puts the reader's private fear into actual words.

Looking at seven larger nations, doubt was a completely natural reaction.

Naming a fear out loud is often the first step toward facing it.

Moses does not shame Israel for feeling small.

💭 Moses names Israel's private fear directly

😰 Doubt was a natural reaction here

🗣️ Naming fear is the first step past it

📖 Feeling small was never treated as shameful

---
## 🚫 Thou Shalt Not Be Afraid Of Them

The command follows immediately after the fear is named.

Courage here is not the absence of fear.

It is a choice made in spite of it.

Moses answers the fear with a direct reminder of what God already did.

🚫 The command follows right after the fear

💪 Courage is not the absence of fear

✅ Courage is a choice made anyway

📖 Moses answers fear with a reminder of God

---
## 👁️ Well Remember What The Lord Thy God Did Unto Pharaoh

Moses points Israel back to the exodus as proof, not just as history.

Pharaoh ruled the strongest empire in the region at the time.

God defeated that empire in front of the whole nation.

If Pharaoh could not stand against God, neither could seven smaller nations.

👁️ Moses points back to the exodus as proof

👑 Pharaoh ruled the strongest empire around

💪 God defeated that empire completely

📖 Seven smaller nations stood no real chance

---
## ⚡ The Signs, And The Wonders, And The Mighty Hand

"Signs and wonders" refers to the ten plagues that struck Egypt.

"The mighty hand" is a common phrase in the Old Testament for God's raw power in action.

"The stretched out arm" pictures God personally reaching into history to act.

Moses stacks all three phrases together for full weight.

⚡ Signs and wonders means the ten plagues

💪 Mighty hand pictures God's raw power

🦾 Stretched out arm pictures God acting directly

📖 Three phrases stacked for full weight

# Deuteronomy 7:20-24
# 🐝 The Hornet And The Slow Conquest
---
## 🐝 The Lord Thy God Will Send The Hornet Among Them

"The hornet" is one of the more debated phrases in this chapter.

Many scholars believe it describes real swarms of stinging insects sent ahead of Israel.

Others believe it pictures panic and terror spreading through the enemy camps.

The text does not tell us which reading is correct.

Either way, the point stays the same.

God cleared the way before Israel ever arrived.

🐝 The hornet is a debated phrase

🦟 Many scholars believe it means real insects

😱 Others believe it pictures spreading panic

📖 Either way, God cleared the way first

---
## 😨 Thou Shalt Not Be Affrighted At Them

"Affrighted" is an old word for terrified or badly shaken.

The command repeats an idea already given earlier in the chapter.

Repeating a command in scripture usually signals real importance, not carelessness.

Fear was the real enemy Moses kept addressing throughout this speech.

😨 Affrighted means terrified or badly shaken

🔁 The command repeats an earlier warning

📢 Repetition in scripture signals importance

📖 Fear itself was the real enemy here

---
## 🔥 The Lord Thy God Is Among You, A Mighty God And Terrible

This is the real reason fear should not win.

God's presence, not Israel's strength, decided the outcome of this conquest.

"Terrible" here means awe inspiring and fearsome, not evil.

The same God who is with Israel is the God every enemy nation should truly fear.

🔥 God's presence decided the outcome, not Israel

👑 Terrible here means awe inspiring, not evil

🛡️ Israel's strength was never really the point

📖 The real fear belonged to Israel's enemies

---
## 🐌 Put Out Those Nations Before Thee By Little And Little

God promises victory but not all at once.

The conquest was planned to happen gradually, nation by nation.

A sudden total victory might have actually created a new problem.

The text explains exactly what that problem would have been.

🐌 Victory was planned gradually, not all at once

📈 God paced the conquest nation by nation

❓ A sudden victory could create a new problem

📖 The next verse explains exactly what that was

---
## 🦁 Lest The Beasts Of The Field Increase Upon Thee

Empty land left behind by defeated nations would not stay empty for long.

Without people to farm and settle it, wild animals would move in and multiply.

Too many predators too fast would threaten the very people God was bringing in.

The slow pace was practical wisdom, not weak follow through.

🦁 Empty land would not stay empty long

🐾 Wild animals would move in and multiply

⚠️ Too many predators too fast was risky

📖 The slow pace was practical wisdom

---
## 💀 Destroy Their Name From Under Heaven

This phrase is a strong ancient way of describing total, permanent defeat.

Destroying a name meant erasing a people's memory, not only their army.

No descendants, no records, no lasting legacy would remain to carry it forward.

This same phrase appears again later, aimed at Amalek in Deuteronomy twenty five.

💀 Destroying a name meant total permanent defeat

🧬 It erased memory, not just an army

📜 No legacy would remain to carry it on

📖 The same phrase returns later against Amalek

# Deuteronomy 7:25-26
# 🔥 Burn The Idols
---
## 💰 Not Desire The Silver Or Gold That Is On Them

Canaanite idols were often overlaid with real silver and gold.

Israel is warned not to loot that metal, even for personal use.

Taking it would mean walking away from an idol still owning a piece of it.

This exact temptation shows up again later, when Achan hides stolen silver and gold at Jericho.

💰 Idols were often coated in silver and gold

🚫 Looting that metal was strictly forbidden

👤 Achan later fails this exact test at Jericho

📖 The temptation to keep a piece was real

---
## 🚫 It Is An Abomination To The Lord Thy God

"Abomination" describes something God finds deeply offensive, not just distasteful.

The word appears throughout the Old Testament for practices that directly oppose God's holiness.

Calling an object an abomination is stronger language than calling it forbidden.

It marks the object as something God actively detests.

🚫 Abomination means deeply offensive to God

📜 The word appears throughout the Old Testament

⚡ It opposes God's holiness directly

📖 Stronger language than simply forbidden

---
## ☠️ Lest Thou Be A Cursed Thing Like It

The word for cursed thing here is the same word used earlier for utterly destroying these nations.

Bringing a devoted object into a home transferred its cursed status onto the household.

This is exactly what happens later when Achan hides forbidden items in his own tent.

His whole family suffered because of what one man brought home.

☠️ Cursed thing repeats the earlier word for destroy

🏠 Bringing it home spread the curse further

👤 Achan's story shows this exact danger

📖 One man's choice endangered his whole family

---
## 💔 Thou Shalt Utterly Detest It, And Thou Shalt Utterly Abhor It

Moses ends the chapter with two different words for the same total rejection.

"Detest" and "abhor" both describe a deep, physical revulsion, not mild disapproval.

Saying it twice in one breath is a Hebrew way of adding full emphasis.

This whole chapter began with seven nations and ends with one clear command.

Leave no room in the house, or the heart, for anything that competes with God.

💔 Detest and abhor both mean deep revulsion

🔁 Saying it twice added full emphasis

🏠 The chapter closes exactly where it began

📖 No room was left for rival gods
`.trim();

export const DEUTERONOMY_SEVEN_PERSONAL_SECTIONS = parseDeuteronomySevenRawNotes(DEUTERONOMY_SEVEN_RAW_NOTES);
