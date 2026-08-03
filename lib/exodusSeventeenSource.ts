export type ExodusSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusSeventeenRawNotes(rawText: string): ExodusSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 17:${startVerse}` : `Exodus 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Exodus 17 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_SEVENTEEN_RAW_NOTES = `# Exodus 17:1-3
# 💧 No Water At Rephidim
---
## 🧭 According To The Commandment Of The LORD

This is not Israel choosing its own path through the wilderness.

Every stop, including this one, follows a direct command from God.

The cloud and fire from earlier chapters lead each stage of travel.

God brings His people to Rephidim on purpose, before their need is even visible.

🧭 Israel follows God's command, not their own path
☁️ The cloud and fire guide each stop
📍 Rephidim was God's chosen next step
📖 God leads before the need is seen

## 🏕️ Pitched In Rephidim

"Pitched" means camped, setting up tents for a temporary stay.

Israel makes camp at Rephidim after following the cloud and fire the whole way.

Yet there is no water anywhere for the whole camp to drink.

This crisis lands right in the middle of obedience, not away from it.

🏕️ Pitched means camped for a time
🐑 Israel had been following God's own guidance
💧 No water was anywhere in the camp
📖 Crisis struck even inside obedience

## 😠 Wherefore Do Ye Tempt The LORD

"Chide" means to quarrel or scold sharply.

"Tempt" here means to test, doubting whether God can be trusted.

Moses reframes their complaint as something far more serious than thirst.

Asking for water is not sin, but testing God's character is.

😠 Chide means to quarrel or scold sharply
❓ Tempt means to test or doubt
⚖️ Moses names this as testing God's character
📖 Real need differs from doubting God's care

## 🐄 To Kill Us And Our Children And Our Cattle With Thirst

The people's fear here is genuine, not exaggerated for effect.

Real thirst threatens the whole camp, not just the adults complaining.

Children and livestock stand under the same threat as everyone else.

Desperation, not defiance, drives the intensity behind their words.

🐄 The threat covers people, children, and cattle
😨 This fear was genuine, not exaggerated
👶 Children were as endangered as adults
📖 Desperation drove the intensity of their complaint

# Exodus 17:4-7
# 🪨 Water From The Rock
---
## 😨 They Be Almost Ready To Stone Me

Moses brings the real danger straight to God, without softening it.

He is not just frustrated, his life is genuinely at risk.

Leading God's people does not make Moses immune to their anger.

Honest prayer includes naming fear exactly as it is.

😨 Moses names a real physical danger
🗣️ He brings the crisis straight to God
👑 Leadership did not protect him from anger
📖 Honest prayer names fear plainly

## 🪄 Thy Rod, Wherewith Thou Smotest The River

This is the same rod used to turn the river to blood in Exodus seven.

The very tool of judgment on Egypt now becomes a tool of provision.

God does not need a new instrument to meet a new need.

One rod carries both plague and rescue in the same hand.

🪄 The rod once turned the river to blood
⚖️ Judgment on Egypt used this same rod
💧 Now the rod provides water instead
📖 One tool serves both plague and rescue

## 🪨 Thou Shalt Smite The Rock, And There Shall Come Water Out Of It

God provides water through an entirely unexpected source, solid rock.

Moses obeys in full view of the elders, not in private.

Public obedience lets the whole community witness God's provision firsthand.

The same power that parted the sea now splits open a rock.

🪨 Water comes from solid rock itself
👥 Moses obeys before the watching elders
👀 The whole community witnesses this provision
📖 The same power now opens a rock

## 🏷️ Massah, And Meribah

"Massah" means testing.

"Meribah" means quarreling or strife.

Moses names this place permanently after Israel's failure here.

The name becomes a lasting reminder for every future traveler.

A place can carry the memory of a specific failure.

🏷️ Massah means testing
📛 Meribah means quarreling or strife
📍 This name permanently marks Israel's doubt
📖 A place can preserve a hard memory

## ❓ Is The LORD Among Us, Or Not?

This question is the real complaint underneath all the arguing about water.

Israel is not only asking for a drink.

They are questioning whether God is truly present among them.

Thirst was the surface problem.

Doubt was the deeper one.

This same pattern of doubt returns again later in the wilderness.

❓ This question reveals the real complaint
💭 Doubt runs deeper than simple thirst
🔁 The same doubt pattern returns later
📖 Presence was the deeper question here

# Exodus 17:8-10
# ⚔️ Amalek Attacks
---
## ⚔️ Amalek, And Fought With Israel In Rephidim

Amalek was a nomadic people descended from Esau's grandson.

This attack begins a hostile relationship lasting for many generations.

Israel faces this threat right after the crisis over water.

One trial follows immediately after another in the wilderness.

⚔️ Amalek descended from Esau's grandson
🏜️ Amalek lived as a nomadic desert people
🔁 This begins many generations of hostility
📖 One trial follows quickly after another

## 🗡️ Choose Us Out Men, And Go Out, Fight With Amalek

This is Joshua's first appearance anywhere in Scripture.

Moses hands him real responsibility before Joshua has proven anything.

Joshua later becomes Moses' own successor leading Israel into Canaan.

A famous leader's story often begins in a single small assignment.

🗡️ Joshua's first appearance in all Scripture
👑 Moses trusts him with real responsibility
🧭 Joshua later succeeds Moses as leader
📖 Great leadership often starts with one small task

## ⛰️ Moses, Aaron, And Hur Went Up To The Top Of The Hill

Hur appears here for the very first time in the Bible.

He joins Aaron in a quiet, supporting role beside Moses.

Moses positions himself where he can watch the entire battle below.

Not every important person in Scripture gets a dramatic introduction.

⛰️ Moses watches the battle from the hilltop
🙋 Hur is introduced here for the first time
🤝 Hur joins Aaron in a supporting role
📖 Quiet roles still matter in Scripture

# Exodus 17:11-13
# ✋ Moses' Hands Held Up
---
## ✋ When Moses Held Up His Hand, That Israel Prevailed

The battle's outcome ties directly to Moses' raised hands.

This is not about which army fights harder on the ground.

Victory depends on continued reliance on God's power above the battle.

Prayer and dependence shape the outcome as much as swords do.

✋ Moses' raised hands decide the outcome
⚔️ The battle is not won by skill alone
🙏 Victory depends on continued reliance on God
📖 Dependence shapes outcomes as much as swords

## 🤝 Aaron And Hur Stayed Up His Hands

Moses' own strength eventually fails from simple exhaustion.

Aaron and Hur do not rebuke him for growing tired.

They seat him on a stone and physically support his arms.

Their help keeps the whole battle turning in Israel's favor.

🪨 They seat Moses on a stone to rest
🤝 Aaron and Hur support his arms directly
😓 Even Moses' own strength eventually gave out
📖 Community support can sustain someone's faithfulness

## 🌅 Until The Going Down Of The Sun

The support continues for the entire length of the battle.

This is not a brief moment of help.

It lasts the whole day, all the way until sunset.

Joshua defeats Amalek only once this steady support holds firm.

Sustained faithfulness, not a quick effort, wins the day.

🌅 The support lasts until sunset itself
🏆 Joshua defeats Amalek because the support held
⏳ Sustained effort mattered more than a quick boost
📖 Faithfulness sustained over time wins the day

# Exodus 17:14-16
# 📜 A Memorial, And Jehovahnissi
---
## 📜 Write This For A Memorial In A Book

A "memorial" is a permanent written record meant to be remembered later.

God commands this victory be preserved in writing, not just in memory.

Spoken memories fade or shift with each retelling over time.

A written record protects the truth of what actually happened here.

📜 Memorial means a permanent written record
✍️ God commands this victory be written down
🗣️ Spoken memory alone can shift over time
📖 Writing protects the truth for later readers

## 👂 Rehearse It In The Ears Of Joshua

"Rehearse" means to repeat or recount aloud, not simply to practice.

God commands this lesson be spoken directly to Joshua by name.

Joshua will lead Israel into battle again in future books.

Writing and speaking together make sure the lesson truly survives.

🗣️ Rehearse means to repeat something aloud
👂 Joshua hears this lesson directly by name
📚 Joshua will lead many future battles
📖 Written and spoken lessons together last longer

## 🏛️ Moses Built An Altar, And Called The Name Of It Jehovahnissi

"Jehovahnissi" means "the LORD is my banner."

A banner was a military flag used to rally troops in battle.

Moses names God as the true source of this victory.

The altar itself becomes a lasting marker of what God did here.

🏛️ Jehovahnissi means the LORD is my banner
🚩 A banner was a military rallying flag
🙌 God receives credit for the victory
📖 Altars mark what God has already done

## ⚔️ The LORD Will Have War With Amalek From Generation To Generation

This declares a conflict that stretches far beyond a single afternoon.

Amalek becomes a recurring enemy across many future books of the Bible.

God takes personal responsibility for this ongoing conflict, not just Israel.

Today's battle turns out to be only the very first one.

⚔️ This declares conflict across many generations
📚 Amalek recurs across many later books
🛡️ God takes this conflict on Himself
➡️ Today's battle was only the first one`.trim();

export const EXODUS_SEVENTEEN_PERSONAL_SECTIONS = parseExodusSeventeenRawNotes(EXODUS_SEVENTEEN_RAW_NOTES);
