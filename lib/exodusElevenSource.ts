export type ExodusElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusElevenRawNotes(rawText: string): ExodusElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 11:${startVerse}` : `Exodus 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Exodus 11 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_ELEVEN_RAW_NOTES = `# Exodus 11:1-3
# 💰 The Last Warning, And Parting Gifts
---
## 🔑 Yet Will I Bring One Plague More Upon Pharaoh

God tells Moses this privately before it happens.

Nine plagues have already struck Egypt hard.

This message names the end point in advance.

Moses now knows exactly how close deliverance really is.

🔑 God names the last plague in advance
📢 Nine plagues have already struck Egypt
🕰️ Moses learns how close the end is
📖 God reveals the end before it comes

## 🚪 He Shall Surely Thrust You Out Hence Altogether

"Hence" is an old word meaning from this place.

Thrust means forced out, not politely asked to leave.

Pharaoh's attitude is about to flip completely.

He has clung to Israel as free labor for months.

Soon he will beg them to go, and quickly.

🚪 Hence means from this place
💪 Thrust means forced out, not asked
🔄 Pharaoh will flip from refusal to urgency
➡️ Clinging to Israel turns into desperate expulsion

## 🗣️ Let Every Man Borrow Of His Neighbour

"Borrow" here does not mean something given back later.

It means request, or simply ask for.

Nobody expected these silver and gold items to return to Egypt.

This request had already been promised back in chapter three.

🗣️ Borrow means request, not something returned
💰 Egyptians hand over silver and gold freely
📜 Chapter three already promised this wealth
➡️ Israel leaves Egypt with real, lasting wealth

## 👩 And Every Woman Of Her Neighbour

This instruction is not aimed at men alone.

Women receive the exact same command to ask for gifts.

Every household in Israel takes part in this moment.

Nobody in the whole nation is left out of it.

👩 Women receive the same command as men
🏠 Every household shares in this moment
🙌 The whole nation takes part together
➡️ Nobody in Israel is left out of it

## 🤝 The LORD Gave The People Favour In The Sight Of The Egyptians

"Favour" means goodwill, not luck or coincidence.

God is the one working directly on the Egyptians' hearts.

Ordinary Egyptians now feel generous toward Israel instead of hostile.

This favour makes the borrowing in the previous verse actually work.

🤝 Favour means goodwill, not luck
❤️ Egyptians feel generous instead of hostile
🎁 This favour makes the borrowing possible
📖 God moves hearts before Israel even asks

## 🐑 The Man Moses Was Very Great In The Land Of Egypt

Moses started this story as a wanted fugitive shepherd.

Now even Pharaoh's own officials treat him with real respect.

Nine plagues have changed how all of Egypt sees him.

Greatness here is public reputation, not a title or throne.

🐑 Moses once fled Egypt as a fugitive
👑 Officials now treat him with real respect
🌊 Nine plagues reshaped his reputation completely
➡️ His greatness comes from what God did

# Exodus 11:4-6
# 🌙 Midnight Marks The End
---
## 🕛 About Midnight Will I Go Out Into The Midst Of Egypt

Midnight names an exact, fixed time, not a rough guess.

This removes any chance for Pharaoh to prepare or negotiate.

The LORD says "I will go out" himself.

No angel or messenger carries this one out instead.

🕛 Midnight is an exact fixed time
🚫 Pharaoh gets no chance to prepare
👑 The LORD himself carries this one out
📖 This plague is personal, not delegated

## 👶 All The Firstborn In The Land Of Egypt Shall Die

This plague strikes the exact category Pharaoh attacked first.

Long ago Pharaoh ordered Hebrew baby boys thrown into the river.

Back in chapter four, God called Israel his own firstborn son.

Pharaoh refused to let that firstborn son go free.

Now Egypt's own firstborn sons pay the price instead.

👶 Pharaoh once ordered Hebrew baby boys killed
🐑 Chapter four calls Israel God's firstborn son
⚖️ Pharaoh refused to free that firstborn son
📖 Egypt's firstborn now bear the consequence

## ⚙️ Even Unto The Firstborn Of The Maidservant That Is Behind The Mill

"The mill" was a small stone tool used to grind grain by hand.

Grinding grain this way was hard, low ranked daily work.

This plague reaches from Pharaoh's own throne to that lowest servant.

No wealth or rank offers any real protection here.

⚙️ A hand mill ground grain daily
👑 This plague reaches Pharaoh's own throne
🧎 It also reaches the lowest servant
📖 Wealth and rank offer no protection here

## 🐄 And All The Firstborn Of Beasts

This plague is not limited to human households alone.

Livestock and animals lose their firstborn too.

Egyptian religion worshiped many animals as sacred, including cattle.

Even the gods Egypt trusted could not escape this judgment.

🐄 Animals lose their firstborn as well
🐂 Egyptians worshiped many animals as gods
🚫 Their sacred animals could not escape
📖 This plague judges Egypt's false gods too

## 😭 There Shall Be A Great Cry Throughout All The Land Of Egypt

This describes one massive, simultaneous wave of grief.

Every Egyptian home loses someone at the exact same hour.

Scripture says nothing like this ever happened before or after.

Grief this widespread and sudden has no real comparison.

😭 Every home grieves at the same hour
🌊 Grief hits all of Egypt at once
📏 Scripture calls this unmatched before or after
➡️ No other national grief compares to this one

# Exodus 11:7-8
# 🐕 A Clear Difference, Then Fury
---
## 🐕 Shall Not A Dog Move His Tongue

This old phrase means not even the smallest disturbance happens.

Not one dog barks, growls, or stirs in all Israel.

Complete calm surrounds Israel's homes during Egypt's worst night.

That silence itself becomes proof of God's deliberate protection.

🐕 Not even a dog barks or stirs
🤫 Total calm covers every Israelite home
🛡️ This calm proves deliberate divine protection
📖 Silence itself becomes the evidence here

## ⚖️ That Ye May Know How That The LORD Doth Put A Difference

God has drawn this same line before, in earlier plagues.

Flies and hail already spared Israel while striking Egypt.

This final plague repeats that same distinction one more time.

The contrast itself is the point, not just the outcome.

⚖️ God drew this line in earlier plagues
🐝 Flies and hail already spared Israel
🔁 The tenth plague repeats that pattern
📖 The contrast itself proves God caused it

## 🙇 All These Thy Servants Shall Come Down Unto Me, And Bow Down Themselves Unto Me

Moses predicts Pharaoh's own officials will soon beg him directly.

These are the same officials who once dismissed Moses completely.

Bowing down was a formal act of surrender and respect.

The most powerful men in Egypt will soon plead for mercy.

👑 Officials once dismissed Moses completely
🙇 Bowing down showed formal surrender
🔄 Egypt's powerful men will soon plead
📖 Their pride will not survive this night

## 🗣️ Get Thee Out, And All The People That Follow Thee

This is the exact demand Moses has repeated for months.

Soon Egypt's own officials will beg Israel to leave.

Pharaoh's stubborn refusal is about to become everyone else's plea.

The tables have fully turned by this point in the story.

🗣️ Moses has repeated this demand for months
🙏 Egyptians will soon beg Israel to leave
🔄 Pharaoh's refusal becomes everyone else's plea
➡️ The tables have fully turned by now

## 🚶 And After That I Will Go Out

Moses states his own timeline with calm confidence here.

He no longer waits on Pharaoh's permission or mood.

Nine rounds of failed negotiation have ended for good.

Moses now simply announces what will happen next.

🚶 Moses states his own plan calmly
🚫 He no longer waits on Pharaoh
🏁 Nine rounds of negotiation are finished
➡️ Moses now announces the outcome directly

## 😠 He Went Out From Pharaoh In A Great Anger

Moses leaves this final meeting visibly and genuinely angry.

This anger is not a loss of self control.

It responds to months of cruelty toward an enslaved nation.

Even a godly leader can feel righteous anger at injustice.

😠 Moses leaves this meeting genuinely angry
🚫 This is not a loss of control
⚖️ Cruelty toward Israel earned this response
📖 Righteous anger can still honor God

# Exodus 11:9-10
# 📖 The Pattern Is Complete
---
## 🗣️ Pharaoh Shall Not Hearken Unto You

God tells Moses this refusal in advance, before it happens.

"Hearken" is an old word meaning to listen and obey.

Pharaoh will hear every word and still refuse to act.

This warning keeps Moses from losing hope at the final hour.

🗣️ Hearken means to listen and obey
🚫 Pharaoh will hear and still refuse
🕰️ God reveals this refusal in advance
📖 Moses does not lose hope at the end

## 🌟 That My Wonders May Be Multiplied In The Land Of Egypt

This purpose statement covers the entire plague sequence, not just one event.

God wanted his power revealed fully, not simply Israel freed quickly.

Multiplied wonders leave no doubt about who caused each disaster.

Egypt's own gods could not explain away this many signs.

🌟 This purpose covers the whole plague sequence
💪 God wanted his power revealed fully
❓ Multiplied wonders leave no room for doubt
📖 Egypt's gods could not explain these signs

## 📚 Moses And Aaron Did All These Wonders Before Pharaoh

This sentence closes out the entire plague story as one unit.

Ten separate confrontations now stand complete.

Moses and Aaron are named together as a team one final time.

The very next chapter shifts straight into Passover instructions.

📚 This verse closes the whole plague story
🔟 Ten confrontations now stand complete
👥 Moses and Aaron are named together again
➡️ Passover instructions begin in the very next chapter

## 🧠 The LORD Hardened Pharaoh's Heart

This does not mean God forced Pharaoh against a soft will from the start.

Earlier chapters already showed Pharaoh hardening his own heart on his own.

By this point God confirms the direction Pharaoh already chose.

This is the last time this phrase appears before the final plague strikes.

🧠 Pharaoh hardened his own heart earlier
🔁 God now confirms the direction Pharaoh chose
🚫 This was not forced against a soft will
📖 This phrase appears here one final time`.trim();

export const EXODUS_ELEVEN_PERSONAL_SECTIONS = parseExodusElevenRawNotes(EXODUS_ELEVEN_RAW_NOTES);
