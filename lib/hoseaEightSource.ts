export type HoseaEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaEightRawNotes(rawText: string): HoseaEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 8:${startVerse}` : `Hosea 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Hosea 8 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_EIGHT_RAW_NOTES = `# Hosea 8:1-3
# 🚨 An Alarm For A Broken Covenant
---
## 🎺 Set The Trumpet To Thy Mouth

A trumpet here was a ram's horn blown to warn of danger.

It was not a musical instrument played for entertainment.

Setting it to the mouth means sounding the alarm immediately.

God commands this warning because judgment is already on its way.

The alarm cannot stop what is coming, only announce it.

🎺 A trumpet was a loud warning horn
🚨 Sounding it meant danger was near
📯 God commands the alarm right now
📖 The alarm warns, but cannot stop judgment

## 🦅 He Shall Come As An Eagle Against The House Of The LORD

An eagle pictures a bird swooping down fast on its prey.

This image describes an invading army arriving with sudden speed.

Many scholars believe this points to the coming Assyrian invasion.

The house of the LORD means the whole nation of Israel.

No warning could prepare them for an attack this fast.

🦅 An eagle pictures fast, sudden attack
⚔️ This describes an invading army coming
🏹 Many scholars see this as Assyria
📖 Israel could not prepare in time

## 📜 Because They Have Transgressed My Covenant, And Trespassed Against My Law

Transgressed means breaking an agreement on purpose.

Trespassed means crossing a boundary already known.

Covenant refers to the specific agreement God made with Israel at Sinai.

Both words describe choices, not accidents.

This is the reason named for the coming alarm.

📜 Transgressed means breaking an agreement
🚧 Trespassed means crossing a known line
🤝 Covenant points back to Sinai
📖 Their sin was a choice, not an accident

## 🗣️ Israel Shall Cry Unto Me, My God, We Know Thee

This sounds like a confession of faith on the surface.

To know God in this book means far more than knowing facts about Him.

It means an intimate, faithful relationship lived out in daily obedience.

Israel's claim to know God did not match how the nation lived.

Words without a changed life are an empty claim.

🗣️ This sounds like a confession of faith
🧠 To know means more than facts
💔 Their claim did not match their life
📖 Words without obedience are empty

## 🚫 Israel Hath Cast Off The Thing That Is Good

Cast off means Israel rejected something on purpose.

The thing that is good refers to God's law and His ways.

Israel did not simply drift away from what was good.

The nation deliberately pushed it aside.

🚫 Cast off means rejected on purpose
📘 The thing that is good means God's law
🏃 Israel pushed away from God's ways
➡️ The next verse names the consequence

## 🏃 The Enemy Shall Pursue Him

Pursue means actively chasing down, not just threatening from a distance.

Rejecting what is good left Israel exposed to real danger.

This enemy likely refers to the Assyrian army already named in this chapter.

The consequence follows directly from the choice made just before it.

🏃 Pursue means actively chasing down
⚔️ The enemy is likely Assyria
🔗 This follows the choice made before it
📖 Rejecting good things leaves people exposed

# Hosea 8:4-7
# 🐂 Idols That Cannot Save
---
## 👑 They Have Set Up Kings, But Not By Me, They Have Made Princes, And I Knew It Not

Setting up a king in Israel was supposed to happen with God's approval.

Not by me means these kings were installed without that approval.

I knew it not does not mean God never noticed them.

It means God never gave His consent to these rulers.

Israel's government was built on rejecting God's authority.

👑 Kings should be set up with approval
🚫 Not by me means without consent
🙈 I knew it not means withheld approval
📖 Israel's government rejected God's authority

## 💰 Of Their Silver And Their Gold Have They Made Them Idols, That They May Be Cut Off

Israel used its own wealth to build the idols that doomed it.

Silver and gold were valuable resources turned toward the wrong purpose.

Cut off means separated from God, not simply punished once.

The nation funded its own downfall.

💰 Silver and gold funded their idols
🗿 Resources were turned to a wrong purpose
✂️ Cut off means separated from God
📖 Israel funded its own downfall

## 🐂 Thy Calf, O Samaria, Hath Cast Thee Off

This calf points back to the golden calves King Jeroboam built at Bethel and Dan.

Those calves were meant to keep Israel from worshipping at Jerusalem's temple.

Cast thee off reverses the picture completely.

The very idol Israel trusted for protection offers none at all.

🐂 This calf points to Jeroboam's golden calves
🏛️ They replaced worship at Jerusalem's temple
🔄 Cast thee off reverses the picture
📖 The idol cannot protect its maker

## ⏳ How Long Will It Be Ere They Attain To Innocency?

Ere is an old word that simply means before.

Innocency means being cleared of guilt, not just feeling sorry.

The question sounds hopeful on the surface.

It really points to how far off that day still is.

God is not promising a quick turnaround here.

⏳ Ere means before
⚖️ Innocency means cleared of guilt
❓ The question points to how far off
📖 No quick turnaround is promised

## 🔨 The Workman Made It, Therefore It Is Not God

A workman here means a human craftsman, not a divine being.

Something built by human hands cannot be worshipped as God.

The logic is direct, an object made cannot also be its maker.

This calf was never anything more than shaped metal.

🔨 A workman means a human craftsman
🙅 Something human made cannot be God
⚖️ The logic here is direct and plain
📖 This calf was only shaped metal

## 💥 The Calf Of Samaria Shall Be Broken In Pieces

The very idol Israel trusted would not survive what was coming.

Broken in pieces means total, final destruction.

An object with no real power could not protect itself either.

Judgment would fall on the idol along with the nation that made it.

💥 Broken in pieces means total destruction
🙅 The idol could not protect itself
🔥 Judgment fell on the idol too
📖 The nation and its idol both fell

## 🌬️ They Have Sown The Wind, And They Shall Reap The Whirlwind

Farmers in this culture planted seed and expected a matching harvest later.

Sowing the wind means their actions produced nothing solid to begin with.

Reaping the whirlwind means the consequences came back far larger than the cause.

A small, careless choice grew into a disaster no one could control.

🌬️ Sowing the wind means empty actions
🌪️ Reaping the whirlwind means disaster returns
📈 Consequences grew far larger than the cause
📖 Careless choices can grow uncontrollable

## 🌾 It Hath No Stalk, The Bud Shall Yield No Meal

A stalk is the stem a grain plant needs to grow at all.

No stalk means the crop failed before it even had a chance.

Meal here means flour ground from grain, the whole purpose of planting it.

Their effort produced nothing useful in the end.

🌾 A stalk is what a grain plant needs
🚫 No stalk means the crop failed early
🍞 Meal means flour, the point of planting
📖 Their effort produced nothing useful

## 🌍 If So Be It Yield, The Strangers Shall Swallow It Up

Strangers here means foreign nations, not unfamiliar neighbors.

Even if a small harvest somehow came in, Israel would not keep it.

Outsiders would take whatever little the nation managed to produce.

Every path in this picture leads to the same empty result.

🌍 Strangers means foreign nations here
🌾 A small harvest might still appear
🫳 Outsiders would take it instead
📖 Every path leads to the same loss

# Hosea 8:8-10
# 🏺 A Vessel No One Wants
---
## 🌊 Israel Is Swallowed Up

Swallowed up pictures something being completely consumed by what surrounds it.

Israel was not simply influenced by other nations anymore.

The nation was being absorbed and losing its own identity.

What God's people once were began disappearing.

🌊 Swallowed up means completely consumed
🫥 Israel was losing its identity
🌍 Other nations absorbed the nation
📖 What Israel once was began disappearing

## 🏺 Now Shall They Be Among The Gentiles As A Vessel Wherein Is No Pleasure

A vessel here means a jar or pot made for everyday use.

Wherein is no pleasure means it no longer serves any useful purpose.

A cracked or useless jar gets pushed aside and forgotten.

Israel had become something the nations no longer valued at all.

🏺 A vessel means an ordinary jar
🚫 No pleasure means no longer useful
🗑️ A useless jar gets pushed aside
📖 The nations no longer valued Israel

## 🫏 They Are Gone Up To Assyria, A Wild Ass Alone By Himself

A wild ass in this picture is a stubborn animal that refuses a herd.

It wanders off alone instead of staying where it is safe.

Israel went to Assyria the same way, isolated and acting on its own.

Seeking safety alone, apart from God, left the nation more exposed, not less.

🫏 A wild ass is stubborn and alone
🚶 It wanders from the safety of the herd
🌍 Israel went to Assyria the same way
📖 Going alone left Israel more exposed

## 💍 Ephraim Hath Hired Lovers

This continues the marriage picture Hosea uses throughout this book.

Hired lovers means paying foreign nations for protection instead of trusting God.

Normally the unfaithful partner is the one being paid, not the one paying.

Israel was so desperate it paid others just to be used by them.

💍 This continues Hosea's marriage picture
💰 Hired lovers means paying for protection
🔄 Usually the unfaithful one gets paid
📖 Israel paid just to be used

## 🤝 Though They Have Hired Among The Nations, Now Will I Gather Them

Gather usually sounds like a hopeful word of restoration in this book.

Here it means something very different, a gathering for judgment, not rescue.

God would bring the nations Israel paid back against Israel itself.

The very alliances Israel trusted would become the tool of its punishment.

🤝 Gather often sounds hopeful in Hosea
⚠️ Here it means a gathering for judgment
🔄 Israel's allies would turn against it
📖 Trusted alliances became a tool of punishment

## 👑 They Shall Sorrow A Little For The Burden Of The King Of Princes

The king of princes likely refers to the powerful king of Assyria.

Burden here means the heavy tribute Israel would owe to a foreign ruler.

Sorrow a little suggests their regret would be brief, not lasting repentance.

Paying that burden was the direct cost of leaning on Assyria instead of God.

👑 The king of princes means Assyria's king
💸 Burden means heavy tribute owed
😔 Sorrow a little means brief regret
📖 This was the cost of trusting Assyria

# Hosea 8:11-14
# 🔥 Forgotten The Maker, Trusted The Walls
---
## ⛩️ Ephraim Hath Made Many Altars To Sin, Altars Shall Be Unto Him To Sin

More altars might sound like more devotion to God on the surface.

These altars were not built for the LORD at all.

Each new altar was really just another place to sin further.

Multiplying altars only multiplied the guilt piling up against Israel.

⛩️ More altars sounded like more devotion
🚫 These altars were not built for God
➕ Each altar became another place to sin
📖 More altars only multiplied the guilt

## 📜 I Have Written To Him The Great Things Of My Law

God had given Israel a full, detailed written law, not vague suggestions.

Great things means significant, weighty instructions covering every part of life.

This law was a gift meant to guide the whole nation.

It was never meant to be optional or forgettable.

📜 God gave a full written law
⚖️ Great things means significant, weighty instructions
🎁 The law was a gift to guide them
📖 It was never meant to be optional

## 🌍 But They Were Counted As A Strange Thing

Strange here means foreign, something unfamiliar and not their own.

Israel treated God's own law like it belonged to someone else.

A nation given this law firsthand acted like it had never heard it.

Familiarity with God's word had not produced real ownership of it.

🌍 Strange means foreign and unfamiliar
🙈 Israel treated God's law as not its own
❓ They acted like they never heard it
📖 Familiarity did not produce real ownership

## 🍖 They Sacrifice Flesh For The Sacrifices Of Mine Offerings, And Eat It

God's law allowed worshippers to eat a portion of certain offerings.

On the surface, this looks like proper, correct worship.

The ritual steps were being followed exactly as written.

Correct motions alone were never the point of true worship.

🍖 The law allowed eating part of offerings
✅ The ritual steps looked correct
📋 Every motion was followed exactly
📖 Correct motions were never the real point

## 🙅 But The LORD Accepteth Them Not

Correct ritual actions did not guarantee God's acceptance.

Accepteth them not means God rejected the worship despite the right steps.

Something underneath the ritual, the heart behind it, was wrong.

Going through the motions was never the same as real worship.

🙅 Correct ritual did not guarantee acceptance
💔 God rejected worship despite the right steps
❤️ The heart behind it was wrong
📖 Motions are not the same as worship

## 🧮 Now Will He Remember Their Iniquity, And Visit Their Sins

Remember here means God holds people responsible, not simply recalls facts.

Visit in the KJV usually means to inspect closely and act on what is found.

This is not a friendly visit but a visit to bring judgment.

Every sin ignored for years was still fully on record.

🧮 Remember means holding people responsible
🔍 Visit means inspecting closely before acting
⚖️ This visit brings judgment, not friendship
📖 Every sin was still on record

## ⛓️ They Shall Return To Egypt

Egypt was the land of slavery Israel's ancestors were rescued from.

Returning there reverses the whole story of the exodus on purpose.

This may describe literal exile or simply a return to slavery's condition.

Many scholars read it both ways, as prophecy and as picture together.

⛓️ Egypt was the land Israel escaped
🔄 Returning reverses the exodus story
🗺️ This may mean literal exile or symbol
📖 Both readings point to lost freedom

## 🧑‍🎨 Israel Hath Forgotten His Maker, And Buildeth Temples

Maker here names God as the one who formed Israel as a nation.

Forgotten does not mean Israel lost the memory by accident.

It means the nation stopped treating God as the one who made it.

New temples were built while the one true God was pushed aside.

🧑‍🎨 Maker names God who formed Israel
🙈 Forgotten was a choice, not an accident
🏛️ New temples replaced the true God
📖 Religion grew while God was pushed aside

## 🧱 Judah Hath Multiplied Fenced Cities

Fenced cities were towns built with thick walls for defense.

Multiplying them shows a nation trusting military strength for safety.

This mirrors Israel's trust in foreign alliances earlier in this chapter.

Walls built by human hands were never a substitute for God.

🧱 Fenced cities were walled towns for defense
🛡️ More walls meant more trust in defense
🔄 This mirrors trusting foreign alliances earlier
📖 Walls were never a substitute for God

## 🔥 I Will Send A Fire Upon His Cities, And It Shall Devour The Palaces Thereof

The very walls Judah trusted for safety would not survive this judgment.

Fire here pictures total, consuming destruction, not a small, contained blaze.

Palaces were the homes of the ruling class, not ordinary houses.

What the nation trusted most would burn first.

🔥 Fire pictures total, consuming destruction
🏯 Palaces belonged to the ruling class
🧱 The trusted walls would not survive
📖 What they trusted most would burn first
`.trim();

export const HOSEA_EIGHT_PERSONAL_SECTIONS = parseHoseaEightRawNotes(HOSEA_EIGHT_RAW_NOTES);
