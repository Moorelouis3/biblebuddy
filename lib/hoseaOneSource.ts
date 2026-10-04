export type HoseaOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaOneRawNotes(rawText: string): HoseaOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 1:${startVerse}` : `Hosea 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Hosea 1 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_ONE_RAW_NOTES = `# Hosea 1:1-3
# 📜 Hosea's Call And His Strange Marriage
---
## 📜 The Word Of The LORD That Came Unto Hosea

This opening line is the standard way the Old Testament introduces a true message from God.

A prophet did not invent what he said.

He only passed along words that were given to him first.

Everything that follows in this book carries that same weight.

📜 The word of the LORD means God's message

🗣️ A prophet only passed the message along

✅ Hosea did not invent what he said

📖 Everything after this carries God's own weight

## 👤 The Son Of Beeri

Hosea is introduced simply as the son of Beeri.

No other verse in the Bible tells us anything else about Beeri.

Naming a father was the normal way a person was identified in this culture.

Hosea was a real, traceable man, not a symbol or a legend.

👤 Beeri is named only here in the Bible

🧾 Naming a father identified a real person

📜 Hosea was a known, real prophet

📖 God's message came through an actual man

## 👑 In The Days Of Uzziah, Jotham, Ahaz, And Hezekiah, Kings Of Judah

These four names date Hosea by the kings ruling in Judah, the southern kingdom.

That is unusual.

Hosea actually preached to Israel, the northern kingdom.

Together these four reigns cover much of the eighth century before Christ.

Dating him this way ties his short book to real, known history.

👑 These four kings ruled Judah, not Israel

🧭 Hosea preached in Israel, the north

📅 Together they span the eighth century BC

📖 This book sits inside real history

## 🏆 Jeroboam The Son Of Joash, King Of Israel

This Jeroboam is often called Jeroboam the Second.

He is not the first Jeroboam, who split the kingdom generations earlier.

Jeroboam the Second ruled during a brief high point of wealth and power for Israel.

Hosea's whole book speaks right into that false sense of security.

🏆 This is Jeroboam the Second, not the first

🔀 The first Jeroboam split the kingdom earlier

💰 His reign brought wealth and false confidence

📖 Hosea warns right into that comfort

## 💍 Take Unto Thee A Wife Of Whoredoms

God gives Hosea a command that sounds shocking on purpose.

Whoredoms here points forward to a woman who would prove unfaithful.

Scholars disagree on whether Gomer was already unfaithful or only would become so.

Either way, the marriage itself becomes a living picture for the nation to watch.

💍 The command sounds shocking on purpose

🚨 Whoredoms points to future unfaithfulness

❓ Scholars disagree on Gomer's exact past

📖 The marriage becomes a living picture

## 👶 Children Of Whoredoms

This phrase is said about the children before they are even born.

It does not mean the children themselves did anything wrong.

It means each child would grow up to carry a symbolic name and message.

Their whole lives would preach a sermon they never chose.

👶 Said about the children before birth

🚫 Not a judgment on the children themselves

🏷️ Each child carries a symbolic name

📖 Their lives preach a message they never chose

## 🗺️ The Land Hath Committed Great Whoredom

The land means the whole nation of Israel, not one person.

Prophets regularly pictured idolatry as adultery against God.

Israel had bound itself to God in a covenant much like a marriage.

Worshipping Baal and other gods broke that covenant the same way an affair breaks a marriage.

🗺️ The land means the whole nation

🖼️ Idolatry is often pictured as adultery

💍 Israel's covenant with God was like a marriage

📖 Worshipping other gods broke that bond

## 👩 Gomer The Daughter Of Diblaim

Gomer and her father Diblaim are named nowhere else in the Bible.

Naming them this plainly signals a real woman, not a parable character.

The text treats this marriage as an actual event in Hosea's life.

A real wife and real children made the message impossible to ignore.

👩 Gomer is named only in this book

🧾 Naming her signals a real woman

📜 This marriage really happened

📖 A real family made the message unavoidable

# Hosea 1:4-5
# ⚔️ The Name Jezreel
---
## 🌾 Call His Name Jezreel

Naming a child something strange and public was itself a prophetic act.

Jezreel is both a real place and a word meaning God sows or God scatters.

Every time this child was called by name, the warning was repeated out loud.

A name became a sermon that never stopped preaching.

🌾 Jezreel means God sows or God scatters

🏷️ Naming the child was itself a message

📢 The warning repeated every time he was called

📖 A name became an ongoing sermon

## ⚔️ I Will Avenge The Blood Of Jezreel Upon The House Of Jehu

This points back to a real massacre at the city of Jezreel.

King Jehu killed the entire royal family ruling before him there.

Jehu carried out God's judgment that day.

But he also spilled more blood than he was ever told to.

Jeroboam the Second was Jehu's own descendant.

So the coming judgment lands on his own family line.

⚔️ Jezreel was the site of Jehu's massacre

👑 Jehu founded the dynasty ruling now

🩸 Jehu shed more blood than commanded

📖 Judgment now falls on Jehu's own family

## 🏳️ Will Cause To Cease The Kingdom Of The House Of Israel

This is a direct prediction that Israel's kingdom will come to an end.

Jeroboam the Second was still ruling in prosperity when this was spoken.

Israel's kingdom actually did fall a few decades later, conquered by Assyria.

God names the end of a nation before anyone could see it coming.

🏳️ A real kingdom's end is predicted here

💰 Jeroboam was still prosperous when this was spoken

🏛️ Assyria conquered Israel only decades later

📖 God named the end before it was visible

## 🏹 I Will Break The Bow Of Israel In The Valley Of Jezreel

The bow stands for Israel's whole military strength, not one weapon.

The valley of Jezreel was a wide, flat plain, good for chariots and battles.

Armies had already fought there many times because of its open ground.

God promises to break Israel's power on the very battlefield tied to its past violence.

🏹 The bow stands for military strength

🗺️ Jezreel's valley was a real battlefield plain

⚔️ Armies often fought there on its open ground

📖 Judgment lands on this same violent ground

# Hosea 1:6-7
# 💔 The Name Loruhamah
---
## 💔 Call Her Name Loruhamah

Loruhamah is a Hebrew name built from a single negative word.

It means not pitied or no mercy shown.

Parents in Israel usually gave children names of blessing and hope.

This name broke that pattern on purpose, in public, every time it was spoken.

💔 Loruhamah means not pitied

🚫 It reverses the usual hopeful naming pattern

📢 The name was spoken in public, repeatedly

📖 A name itself became the warning

## ⚖️ I Will No More Have Mercy Upon The House Of Israel

God had already shown Israel patience for generations before this point.

Prophets before Hosea had already warned Israel to turn back.

This verse marks a shift from patient warning toward decided judgment.

Mercy delayed is not mercy denied forever, but it has a limit.

⚖️ God had already been patient for generations

📢 Earlier prophets already gave warning

🔄 This verse marks a real shift

📖 Mercy has a limit, not an endless supply

## 🚪 I Will Utterly Take Them Away

Utterly means completely, leaving nothing behind.

This foreshadows Israel's coming exile out of their own land.

Assyria later removed the northern kingdom's people and scattered them among other nations.

The warning here comes true in verifiable history, not just in poetry.

🚪 Utterly means completely, nothing left behind

🏛️ This foreshadows Israel's coming exile

🌍 Assyria later scattered Israel's people

📖 This warning became verifiable history

## 🛡️ But I Will Have Mercy Upon The House Of Judah

Judah is the southern kingdom, a separate nation from Israel by this point.

The two kingdoms had split apart generations earlier, after Solomon's reign.

God draws a clear line here between judgment for one and mercy for the other.

Judah's mercy was real, but it was not permanent either, as later chapters of the Bible show.

🛡️ Judah was a separate southern kingdom

🔀 The two kingdoms split after Solomon

⚖️ Judgment and mercy land on different nations here

📖 Judah's mercy was real but not permanent

## 🐎 Not Save Them By Bow, Nor By Sword, Nor By Battle, By Horses, Nor By Horsemen

This list names every normal tool of ancient warfare, one by one.

God says deliverance will not come from any of them.

Years later, Jerusalem was saved from an Assyrian siege without Judah's army winning a battle.

The rescue recorded in 2 Kings 19 shows this exact promise kept in real history.

🐎 This lists every normal tool of war

🚫 None of them will provide the rescue

🏙️ Jerusalem was later saved without a battle

📖 Real history later confirmed this promise

# Hosea 1:8-9
# 🚫 The Name Loammi
---
## 🍼 When She Had Weaned Loruhamah

Weaning in this culture usually happened around two to three years of age.

That gap tells us real years passed between each of these three births.

This is not one dramatic scene but a family's actual, unfolding life.

The message kept growing and changing right along with the children.

🍼 Weaning usually took two to three years

📅 Real years passed between each child's birth

👨‍👩‍👧 This is a real family's unfolding life

📖 The message grew as the children grew

## 👦 She Conceived, And Bare A Son

This is the second son born into this prophetic family.

A son came first, then a daughter, and now this second son.

Nothing about this family's life stayed ordinary once Hosea obeyed God's first command.

Even a plain birth notice carries prophetic weight here.

👦 This is the second son born

👧 A daughter came between the two sons

🔗 Each child carried a different piece of it

📖 Even a plain birth notice carries weight here

## 🚫 Call His Name Loammi

Loammi is Hebrew for not my people.

This is the third and harshest of the three children's names.

Jezreel warned of coming judgment, Loruhamah removed mercy, and Loammi now breaks the relationship itself.

Each child's name pushed the warning one step further than the last.

🚫 Loammi means not my people

🥉 This is the third and harshest name

📈 Each name pushed the warning further

📖 The relationship itself is now broken

## 📜 Ye Are Not My People, And I Will Not Be Your God

This flips a promise God made back in the covenant at Mount Sinai.

God had said, I will be your God, and ye shall be my people.

Here that same formula runs in reverse, word for word.

Breaking a covenant this old was never going to be announced quietly.

📜 This reverses the covenant formula from Sinai

🔄 The same words now run backward

💔 The oldest promise is the one broken

📖 Nothing this serious happens quietly

# Hosea 1:10-11
# 🌊 The Reversal Of Judgment
---
## 🏖️ As The Sand Of The Sea, Which Cannot Be Measured Nor Numbered

This exact image goes all the way back to God's promise to Abraham.

God told Abraham his children would be like the sand of the seashore.

Judgment on this generation does not cancel that much older promise.

God's covenant with Abraham outlasts Israel's own unfaithfulness.

🏖️ This echoes God's promise to Abraham

📜 Abraham's children were promised to be countless

⚖️ Judgment does not cancel this older promise

📖 God's covenant outlasts Israel's own failure

## 🌅 Ye Are The Sons Of The Living God

This is the exact reversal of the name Loammi, not my people.

The very words used to break the relationship now describe its repair.

Later writers in the New Testament quote this reversal and apply it to Gentiles too.

The worst verdict in this chapter was never meant to be the final word.

🌅 This directly reverses the name Loammi

🔄 The same broken words now describe repair

✝️ New Testament writers later quote this reversal

📖 Judgment was never meant to be final

## 🤝 The Children Of Judah And The Children Of Israel Be Gathered Together

Judah and Israel had been two separate, often rival kingdoms for generations.

This verse pictures them coming back together as one people again.

That split began generations earlier under Rehoboam and the first Jeroboam.

A promised reunion answers a division that still had not been healed.

🤝 Judah and Israel had been divided for generations

🔀 That split began under Rehoboam and Jeroboam

🔗 This verse pictures them reunited

📖 A promised reunion answers an old wound

## 👑 Appoint Themselves One Head

One head means a single shared ruler over both kingdoms again.

Since Solomon's death, Israel and Judah had followed two separate royal lines.

This pictures the kind of unity the nation had under David and Solomon.

Hope here looks backward to a united kingdom to imagine one still ahead.

👑 One head means a single shared ruler

🔀 The two kingdoms had followed separate royal lines

🏛️ David and Solomon once ruled this way

📖 Old unity becomes the picture of future hope

## 🌾 Great Shall Be The Day Of Jezreel

This is the same word, Jezreel, that opened this chapter as a warning.

Back in verse four it marked bloodshed and a coming end.

Jezreel can also simply mean God sows or God plants.

The same name that once meant judgment now describes God planting His people again.

🌾 Jezreel opened this chapter as a warning

🩸 It once marked bloodshed and an ending

🌱 Jezreel can also mean God sows or plants

📖 The same word now describes God planting again
`.trim();

export const HOSEA_ONE_PERSONAL_SECTIONS = parseHoseaOneRawNotes(HOSEA_ONE_RAW_NOTES);
