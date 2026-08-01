export type GenesisThirtyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyNineRawNotes(rawText: string): GenesisThirtyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+39:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 39 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+39:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+39:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 39 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 39,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 39:${startVerse}` : `Genesis 39:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Genesis 39 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_NINE_RAW_NOTES = `# Genesis 39:1-6
# 🏺 Joseph Rises In Potiphar's House
---
## ⚔️ Captain Of The Guard

"Officer" here means a royal official who served Pharaoh directly.

"Captain of the guard" means Potiphar commanded Pharaoh's own bodyguard.

He also oversaw executions for the king.

That made him one of the most powerful men in Egypt.

A slave in a house like that could vanish without notice.

God had already placed Joseph inside Egypt's highest circles.

⚔️ Officer means a royal official

👮 Captain of the guard led Pharaoh's bodyguard

☠️ He also oversaw executions

📖 God placed Joseph among Egypt's most powerful

---
## 🌟 The LORD Was With Joseph

"Prosperous" does not mean he had an easy life.

It means everything he touched moved forward under God's hand.

Joseph was still a slave in a foreign country.

Yet the text credits his success to the LORD, not luck or skill.

That pattern will repeat again after Joseph loses everything a second time.

🌟 Prosperous means God caused it to succeed

⛓️ Joseph was still a slave

🙌 His success came from the LORD

📖 The same pattern will repeat later

---
## 🎁 Found Grace In His Sight

"Grace" here means favor a person did not earn or deserve.

Potiphar noticed something in Joseph beyond ordinary slave labor.

He made Joseph "overseer," meaning Joseph now ran the entire household.

Every decision Potiphar once made himself now belonged to Joseph.

Trust like that from a powerful Egyptian toward a foreign slave was rare.

🎁 Grace means unearned favor

🏠 Overseer means Joseph ran the household

🔑 Potiphar handed over full control

📖 Rare trust given to a foreign slave

---
## 🌾 Blessed The Egyptian's House For Joseph's Sake

God's blessing on Joseph did not stay contained to Joseph alone.

"For Joseph's sake" means Potiphar's entire household prospered because of one man.

The field and the house both grew because Joseph was in it.

God often blesses the people around someone He is already blessing.

🌾 Blessing spread through the whole house

👤 Potiphar benefited because of Joseph

🏡 The field and house both grew

📖 God's blessing overflows to others nearby

---
## 💪 Goodly Person, And Well Favoured

This phrase simply means Joseph was strikingly handsome.

The exact same words describe his mother Rachel back in Genesis twenty nine.

Joseph shares more than character with his mother.

He shares her appearance too.

That detail is about to become dangerous instead of a compliment.

💪 Goodly and well favoured means handsome

👩 The same words once described Rachel

🧬 Joseph resembled his mother

➡️ Beauty is about to cause trouble

# Genesis 39:7-10
# 😈 Potiphar's Wife Tempts Joseph
---
## 👀 Cast Her Eyes Upon Joseph

This idiom means she began desiring Joseph physically.

It was not a passing glance.

It was a fixed, deliberate attraction.

She holds real power in this house as her husband's wife.

Joseph has none, since he is still legally her husband's property.

👀 Cast her eyes means fixed desire

👑 She held real power in the house

⛓️ Joseph had none as a slave

📖 Power imbalance made this dangerous

---
## 🗣️ Lie With Me

Her request is blunt, with no disguise and no small talk.

She is Joseph's master's wife, so refusing her carries real risk.

Saying yes could have protected his position in the household.

Saying no could cost him everything he had built there.

Joseph has to choose in a single moment with no time to think.

🗣️ Her request was blunt and direct

⚖️ Saying yes seemed to protect him

🎯 Saying no risked everything he had

➡️ Joseph had to decide instantly

---
## 🤝 My Master Wotteth Not

"Wotteth" is an old word meaning knows.

Joseph reminds her that Potiphar trusts him completely.

He is not arguing that he might get caught.

He is arguing that betraying that trust would be wrong either way.

His loyalty does not depend on whether anyone is watching.

📝 Wotteth means knows

🤝 Potiphar trusts Joseph completely

👁️ Joseph is not afraid of being caught

➡️ His loyalty holds even unseen

---
## 💔 This Great Wickedness, And Sin Against God

Joseph does not call this a betrayal of Potiphar first.

He calls it sin against God first.

Every wrong done to another person is also a wrong done to God.

Joseph sees the true audience for this choice before anyone else does.

⚖️ Wickedness names the choice honestly

🙏 Joseph names God as the real witness

💔 Sin against a person is sin against God

📖 Joseph sees the true audience first

---
## 📆 She Spake To Joseph Day By Day

This was not one request Joseph refused a single time.

It repeated every day, likely for months.

Each refusal was its own separate choice, not a decision made once.

Staying faithful here took ongoing effort, not a single moment of willpower.

📆 Day by day means repeated pressure

🔁 Joseph had to refuse again and again

💪 Faithfulness took ongoing effort

➡️ One good choice was not enough

# Genesis 39:11-15
# 👘 Caught By The Garment
---
## 🏠 Went Into The House To Do His Business

This phrase simply describes an ordinary workday.

Joseph was not walking into a trap he suspected.

"None of the men of the house" means the two of them were completely alone.

That detail matters for everything that happens next.

🏠 This describes a normal workday

🚶 Joseph suspected nothing

🚪 No one else was in the house

➡️ Being alone set up the danger

---
## ✋ Caught Him By His Garment

She grabs his outer robe to physically stop him from leaving.

Joseph makes an instant choice to run rather than stay and argue.

He leaves the garment behind rather than risk one more moment in the room.

Fleeing costs him evidence, but it protects him from far worse.

✋ She physically grabbed his robe

🏃 Joseph chose to flee instantly

👕 He left the garment behind

📖 Fleeing cost him evidence, not integrity

---
## 👕 Left His Garment In Her Hand, And Fled

A garment caused Joseph's downfall once before, when his brothers dipped his coat in blood.

Now a garment is about to be used against him again.

This time the false evidence is not spilled blood but an abandoned robe.

Joseph could not have known a piece of clothing would trap him twice.

🩸 A coat once deceived his father

👕 A garment now becomes false evidence

🔁 The same object type used twice

📖 Joseph never saw either coming

---
## 🌍 He Hath Brought In An Hebrew Unto Us To Mock Us

"Hebrew" was the word Egyptians used for foreigners like Joseph's family.

It marked him as an outsider before any accusation was even made.

"To mock us" does not mean to tease.

It means to take advantage of us, a far more serious charge.

She blames Potiphar for even bringing a foreigner into their home.

🌍 Hebrew marked Joseph as an outsider

😤 Mock here means to take advantage

🎯 The accusation was deliberately serious

➡️ She blames Potiphar's own decision

# Genesis 39:16-18
# 🗣️ The False Accusation
---
## 👕 Laid Up His Garment By Her, Until His Lord Came Home

She keeps the garment as staged proof rather than getting rid of it.

Waiting for Potiphar to return means she plans exactly what to say.

This was not a panicked reaction.

It was a calculated setup aimed at Joseph specifically.

👕 She kept the garment as staged proof

⏳ She waited for Potiphar deliberately

🧠 This was planned, not panicked

➡️ The setup targeted Joseph specifically

---
## 🔁 The Hebrew Servant, Which Thou Hast Brought Unto Us

She repeats the same wording she already used with the household servants.

Notice she also blames Potiphar directly for bringing Joseph into their lives.

Rehearsed words are harder for a listener to see through.

Her husband hears the identical story twice, which makes it feel confirmed.

🔁 She repeats her rehearsed story

👉 She blames Potiphar's own choice

🎭 Rehearsed lies sound more convincing

➡️ Repetition made the lie feel true

---
## 🎭 As I Lifted Up My Voice And Cried

This is nearly the same wording she used with the servants back in verse fifteen.

Repeating the same version to different people is what makes a lie sound credible.

Potiphar has no way to know his wife rehearsed this story twice already.

The rehearsal is the reason the lie works.

🔁 The same wording as verse fifteen

🎭 Repetition made the lie sound credible

🙈 Potiphar never knew it was rehearsed

📖 A rehearsed lie is what worked

# Genesis 39:19-20
# ⛓️ Joseph Thrown Into Prison
---
## 🔥 His Wrath Was Kindled

"Kindled" compares Potiphar's anger to a fire catching and spreading.

It suggests sudden, burning rage rather than a slow, careful judgment.

Potiphar hears one side of the story and reacts immediately.

Joseph never gets the chance to explain what actually happened.

🔥 Kindled compares anger to catching fire

⚡ The reaction was sudden, not measured

🙉 Potiphar heard only one side

📖 Joseph never got to explain

---
## 🏰 A Place Where The King's Prisoners Were Bound

This was not an ordinary local jail.

It held prisoners connected to Pharaoh's own court.

The law in this culture allowed a much harsher punishment for this accusation.

Potiphar's choice to imprison rather than execute Joseph is worth noticing.

It may hint that even Potiphar was not fully certain of his wife's story.

🏰 This was Pharaoh's own royal prison

⚖️ The crime allowed a harsher penalty

🤔 Potiphar chose prison, not execution

📖 Doubt may explain his restraint

# Genesis 39:21-23
# 🕊️ The LORD Was With Joseph In Prison
---
## 🕊️ The LORD Was With Joseph, And Shewed Him Mercy

"Shewed" is simply the old spelling of showed.

Joseph's circumstances have gotten worse, not better.

Yet the exact same phrase from verse two returns here, the LORD was with him.

A prison cell did not put Joseph outside God's reach.

📝 Shewed simply means showed

⛓️ Joseph's situation had worsened

🔁 The same phrase from verse two returns

📖 Prison did not remove God's presence

---
## 🔁 Committed To Joseph's Hand All The Prisoners

This is the same pattern from Potiphar's house happening again.

There Joseph ran a wealthy man's home.

Here he runs a royal prison.

God keeps placing responsibility into Joseph's hands no matter where he is.

🔁 The same pattern repeats in prison

🏠 He once ran Potiphar's house

⛓️ Now he runs the prison

📖 God keeps entrusting him with responsibility

---
## 🙌 That Which He Did, The LORD Made It To Prosper

This closes the chapter with the same words it opened with.

Joseph went from favored son, to slave, to overseer, to prisoner, to overseer again.

Every circumstance changed, but this one sentence never did.

The LORD made it to prosper, no matter where Joseph stood.

🔁 The chapter closes like it opened

🎢 Joseph's circumstances kept changing

🙌 God's presence never changed

📖 Prosperity followed God, not position
`.trim();

export const GENESIS_THIRTY_NINE_PERSONAL_SECTIONS = parseGenesisThirtyNineRawNotes(GENESIS_THIRTY_NINE_RAW_NOTES);
