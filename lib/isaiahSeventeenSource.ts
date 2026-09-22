export type IsaiahSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSeventeenRawNotes(rawText: string): IsaiahSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 17:${startVerse}` : `Isaiah 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Isaiah 17 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SEVENTEEN_RAW_NOTES = `# Isaiah 17:1-3
# 🏚️ Damascus Loses Its Glory
---
## 📜 The Burden Of Damascus

"Burden" means a heavy message of coming judgment, not a physical weight.

Isaiah opens many chapters with this same word before naming a nation about to fall.

Damascus was the ancient capital city of Syria, home to kings and armies for centuries.

This one word tells the reader that everything after it is bad news.

📜 Burden means a coming judgment

🏛️ Damascus was Syria's ancient capital

⚠️ Isaiah opens many chapters this way

📖 The reader senses bad news immediately

---
## 🏙️ Damascus Is Taken Away From Being A City

This means Damascus will stop functioning as a city at all.

Many scholars believe this was fulfilled when the Assyrian empire conquered Damascus and ended Syria as its own kingdom.

A capital built for kings would be left with no government and no walls that mattered anymore.

The threat here is not damage.

The threat is erasure.

🏙️ Damascus stops being a real city

⚔️ Many scholars link this to Assyria's rise

🚫 No lasting walls or government survive

📖 Judgment turns a capital into rubble

---
## 🏘️ The Cities Of Aroer Are Forsaken

Aroer was a real town.

The text does not tell us exactly which one this refers to.

Several cities across the ancient Near East carried this same name.

What matters here is not the exact location.

It is what happens to that place instead.

🏘️ Aroer was a real named town

❓ The text never says which one

🐑 It becomes empty land instead

📖 A place for people turns silent

---
## 🐑 None Shall Make Them Afraid

Flocks lying safely in a field should be a peaceful picture.

Here it is not.

This peace only exists because every human who might disturb them is already gone.

Silence has replaced a city that used to be full of noise and life.

🐑 Flocks lie down with no threat

👥 No people remain to disturb them

🔇 Silence has replaced a living city

➡️ Peace here means total emptiness

---
## 🏹 The Fortress Also Shall Cease From Ephraim

Ephraim was the largest tribe in the northern kingdom of Israel.

Its name often stands in for the whole nation.

Israel and Syria had joined together as allies against Judah just a few chapters earlier.

That alliance does not save either side here.

Both partners in this partnership lose their strength at the same time.

🏹 Ephraim stands for the northern kingdom

🤝 Israel and Syria had been allies

💔 Their alliance fails to protect them

📖 Judgment falls on both nations together

---
## ⚖️ As The Glory Of The Children Of Israel

This does not mean Syria will now share in something good.

By this point in Isaiah, the glory of Israel's northern kingdom had already been fading fast.

The comparison means Syria's last bit of glory will shrink down to match Israel's.

It does not rise up to meet Israel's former glory.

Two proud nations end up humbled to the exact same low place.

🚫 This is not a shared honor

📉 Israel's own glory was already fading

⚖️ Syria is brought down to match it

📖 Two proud nations end up equally humbled

# Isaiah 17:4-6
# 🌾 Jacob's Harvest Grows Thin
---
## 👤 The Glory Of Jacob Shall Be Made Thin

"Jacob" here is another name for the whole nation of Israel, going back to their ancestor.

"Made thin" and "wax lean" both describe a body losing its strength and its weight.

Isaiah is describing a nation, not a person.

He borrows the picture of a body wasting away.

A once strong, healthy nation is about to look starved and weak.

👤 Jacob means the nation of Israel

📉 Made thin pictures a body losing strength

😟 A strong nation grows weak and thin

📖 National power can waste away like a body

---
## 🌾 As When The Harvestman Gathereth The Corn

A "harvestman" is simply a worker cutting grain by hand at harvest time.

He gathers the stalks close with one arm and cuts them down with the other.

Nothing in his path is left standing on purpose.

Isaiah compares this thorough, sweeping motion to how completely Israel will be stripped.

🌾 A harvestman cuts grain by hand

🤲 He gathers everything within his reach

🚫 Nothing is left standing on purpose

➡️ Israel is stripped just as completely

---
## 🗺️ The Valley Of Rephaim

The valley of Rephaim was a wide, fertile plain near Jerusalem known for its grain.

Farmers there could expect a rich, full harvest most years.

Even a valley famous for abundance gets picked clean in this picture.

If the best fields end up bare, no field is safe from this judgment.

🗺️ Rephaim was a fertile valley near Jerusalem

🌾 It was known for rich harvests

🧺 Even it gets picked completely clean

➡️ No field is safe from this judgment

---
## 🍇 Yet Gleaning Grapes Shall Be Left In It

"Gleaning" means the small amount of fruit left behind after the main harvest is finished.

In this culture, gleanings were normally gathered by the poor who owned no land of their own.

Even total judgment leaves a few grapes behind.

A remnant survives, even when nearly everything else is gone.

🍇 Gleaning means fruit left after harvest

👐 The poor usually gathered these leftovers

🌱 A remnant survives even total judgment

📖 God leaves something behind on purpose

---
## 🫒 As The Shaking Of An Olive Tree

Olive harvesters in this era knocked the fruit down by shaking or beating the branches.

After the shaking stopped, a few stubborn olives always stayed stuck at the very top.

Isaiah uses this same picture in other chapters for a surviving remnant.

The image is not about loss.

It is about what refuses to fall.

🫒 Olive trees were harvested by shaking

🌰 A few olives always stayed at the top

🔁 Isaiah reuses this image elsewhere for remnant

📖 The picture is about what remains

---
## 🔢 Two Or Three Berries

These exact small numbers are not a guess.

They describe a remnant so small it could be counted on one hand.

Out of a whole harvest, almost nothing physically remains.

Yet that tiny handful is still enough to carry the promise forward.

🔢 Two or three, four or five

🤏 A remnant small enough to count

🌾 Nearly the whole harvest is gone

📖 A small remnant still carries the promise

# Isaiah 17:7-8
# 🙏 Turning Back To The Maker
---
## 👀 A Man Shall Look To His Maker

Judgment is not the end of the story here.

After everything is stripped away, people finally turn their eyes toward the one who made them.

Loss can do what comfort never managed to do.

It can turn a distracted heart back toward God.

👀 People finally look to their Maker

💔 Loss succeeds where comfort failed

🙏 Judgment leads back toward God

📖 Sometimes losing everything turns the heart

---
## ✨ The Holy One Of Israel

This title appears again and again throughout the book of Isaiah.

"Holy" here means set apart, completely different from anything else that could be worshiped.

Calling God "the Holy One of Israel" reminds the reader exactly who deserves that attention.

The title itself is a quiet correction aimed at everyone who looked elsewhere first.

✨ Holy means set apart, wholly different

📚 This title repeats throughout Isaiah

🎯 It points straight at the true God

➡️ It corrects where people looked before

---
## 🔨 The Work Of His Hands

These altars were not gifts from God.

They were built by human hands.

Then people worshiped them as if they held real power.

Isaiah points out the irony directly.

A person ends up bowing down to something they built with their own hands.

True worship cannot aim at what a person's own hands assembled.

🔨 The altars were made by human hands

🙇 People worshiped their own handiwork

🔄 Isaiah names the irony directly

📖 Real worship cannot aim at itself

---
## 🌳 The Groves, Or The Images

"Groves" here means wooden poles or carved posts set up to honor a false goddess named Asherah.

"Images" means carved idols shaped by hand and treated like gods.

Both objects promised protection and blessing that they could never actually deliver.

Turning away from them clears space to look toward the real Maker instead.

🌳 Groves means poles honoring a false goddess

🗿 Images means carved, handmade idols

🚫 Neither one could deliver real protection

📖 Turning away clears space for the true God

# Isaiah 17:9-11
# 🥀 Forgetting The Rock Of Salvation
---
## 🌿 His Strong Cities Shall Be As A Forsaken Bough

A "bough" is simply a tree branch.

A forsaken bough is one left bare after everything useful has already been taken from it.

Cities that once felt unshakable end up looking just as empty and abandoned.

Strength built by human hands offers no real protection here.

🌿 A bough is a tree branch

🍂 Forsaken means stripped and left bare

🏙️ Strong cities end up just as empty

➡️ Human strength offers no real protection

---
## ❓ Which They Left Because Of The Children Of Israel

This is one of the hardest lines to translate in the whole book of Isaiah.

The text does not tell us exactly who this group originally was.

Many scholars believe it echoes how Canaanite cities were abandoned when Israel first conquered this same land.

If that reading is right, the very judgment Israel once caused is now landing back on Israel itself.

❓ This line is genuinely hard to translate

🏚️ The text never names them clearly

🔄 Many scholars connect it to Israel's old conquest

📖 The old judgment now returns on Israel

---
## 🗣️ Because Thou Hast Forgotten The God Of Thy Salvation

"Thou" here means the nation of Israel, spoken to directly as one person.

"Forgotten" does not mean a simple memory lapse.

It means walking away from a relationship on purpose, one choice at a time.

Israel is being told plainly why this judgment is happening at all.

🗣️ Thou means the nation of Israel

🧠 Forgotten means far more than forgetting

🚶 It describes walking away on purpose

📖 This verse names the reason for judgment

---
## 🪨 The Rock Of Thy Strength

Calling God a "Rock" is a common picture used throughout the Old Testament.

Think of a literal, massive rock that never moves no matter what storm hits it.

That is the kind of protection Israel had access to the whole time.

They forgot the one shelter that could never be shaken.

🪨 Rock is a common title for God

🌪️ A rock does not move in a storm

🛡️ It pictures real, lasting protection

📖 Israel forgot a shelter that never shakes

---
## 🌱 Plant Pleasant Plants, And Shalt Set It With Strange Slips

"Slips" here means small plant cuttings used to start a new garden.

"Strange" means these cuttings came from outside Israel's own faithful roots.

Historians connect this verse to a real practice from pagan worship at the time.

Worshipers planted fast growing seeds that sprouted quickly, then withered just as fast.

Planting foreign cuttings instead of trusting God became Isaiah's picture for chasing foreign gods.

🌱 Slips means small plant cuttings

🌍 Strange means cuttings from outside Israel

🎭 Historians link this to pagan garden rites

📖 Foreign cuttings picture chasing foreign gods

---
## 🌾 The Harvest Shall Be A Heap In The Day Of Grief

Fast growing plants promise a quick, easy harvest.

This one produces no harvest at all.

"Heap" here just means a pile of ruin, not a pile of grain.

A harvest built on foreign trust turns into a harvest of sorrow instead.

🌾 Fast growth promised an easy harvest

🚫 No real harvest actually comes

🪨 Heap means a pile of ruin

➡️ Foreign trust harvests sorrow instead

# Isaiah 17:12-14
# 🌊 The Roar That God Silences
---
## ⚠️ Woe To The Multitude Of Many People

"Woe" is a prophetic word announcing coming grief, almost like a funeral cry spoken in advance.

The "multitude of many people" points to the massive armies threatening Judah at this time.

A single word here carries the weight of an entire coming disaster.

The reader is meant to feel the danger before a single army is even described.

⚠️ Woe announces grief before it happens

⚔️ The multitude points to threatening armies

📢 One word carries the whole warning

📖 Danger is felt before it is described

---
## 🌊 Which Make A Noise Like The Noise Of The Seas

Picture standing near a rough, roaring ocean during a storm.

That constant, overwhelming sound is what a massive approaching army sounded like.

The comparison is about scale, not just volume.

An army this size felt as unstoppable as the sea itself.

🌊 Picture a rough, roaring ocean

📣 The sound pictures a massive army

📏 The comparison is about scale

📖 The army felt unstoppable as the sea

---
## 🗯️ But God Shall Rebuke Them

One word from God does what no army of Judah could.

"Rebuke" here means a firm, commanding word, not a scolding.

The same power that spoke creation into existence now speaks an invading army back out of it.

Size never impressed God enough to need a fight.

🗣️ Rebuke means a firm command

💪 One word does what armies could not

🌍 The same power that spoke creation itself

📖 Size never impresses God

---
## 💨 Chased As The Chaff Of The Mountains Before The Wind

"Chaff" is the light, useless husk left over after grain is separated out.

Farmers would toss grain into the air so wind could carry the chaff away.

What was heavy and valuable stayed.

What was worthless simply blew off.

This once feared army becomes just as easy to scatter.

🌾 Chaff means the useless leftover husk

💨 Wind carried the worthless part away

⚖️ Valuable grain stayed, chaff did not

➡️ A feared army scatters just as easily

---
## 🌵 Like A Rolling Thing Before The Whirlwind

A "rolling thing" likely pictures a dry, thistle like weed common across this region.

A strong wind could send it tumbling across open ground with nothing to stop it.

This is the second picture in one verse for the exact same total defeat.

Two images together make the point impossible to miss.

🌵 A rolling thing pictures a dry weed

💨 Wind sends it tumbling freely

🔁 A second image for the same defeat

📖 Two pictures make the point unmistakable

---
## 🌆 At Eveningtide Trouble, And Before The Morning He Is Not

Trouble arrives at evening, right when the sun goes down.

By morning, the threat has completely disappeared.

This same overnight reversal appears again later in the book.

A much larger army is destroyed by morning outside Jerusalem there.

God does not need a long campaign to undo a real threat.

🌆 Trouble arrives right at evening

🌅 By morning the threat is gone

🔁 The same pattern returns later in Isaiah

📖 God needs no long campaign to act

---
## 💰 The Portion Of Them That Spoil Us, And The Lot Of Them That Rob Us

"Spoil" and "rob" both describe enemies who plundered Judah's people and land.

"Portion" and "lot" both mean a fitting, assigned share, the exact fate someone earns.

The chapter closes by promising Judah's own plunderers will end up plundered themselves.

What an enemy takes by force eventually gets taken back.

💰 Spoil and rob describe past enemies

⚖️ Portion and lot mean a fitting fate

🔄 Plunderers end up plundered themselves

➡️ What enemies take comes back around
`.trim();

export const ISAIAH_SEVENTEEN_PERSONAL_SECTIONS = parseIsaiahSeventeenRawNotes(ISAIAH_SEVENTEEN_RAW_NOTES);
