export type ExodusOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusOneRawNotes(rawText: string): ExodusOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 1:${startVerse}` : `Exodus 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 1 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_ONE_RAW_NOTES = `# Exodus 1:1-5
# 📜 Israel's Family Arrives In Egypt
---
## 📜 These Are The Names Of The Children Of Israel

Exodus opens by naming the same family already introduced in Genesis.

This is not a new story starting fresh.

It is a direct continuation of the last chapters of Genesis.

Israel here means the man Jacob.

God renamed him Israel back in Genesis thirty two.

Each son traveled to Egypt with his own household, not alone.

📜 Exodus continues where Genesis ended

👤 Israel is another name for Jacob

👪 Each son brought his own household

➡️ One story continues into a new book

## 👪 Reuben, Simeon, Levi, And Judah

This list names eleven of Jacob's twelve sons.

Joseph is left off this list on purpose.

He was already in Egypt.

The text names him separately in the next verse.

The order here follows each son's mother, not age.

Reuben, Simeon, Levi, and Judah were born to Leah first.

These twelve names become the twelve tribes of Israel.

🔢 Eleven of Jacob's twelve sons named

👤 Joseph is named separately in verse five

👪 Order follows each son's mother

📖 These sons become Israel's twelve tribes

## 🔢 All The Souls That Came Out Of The Loins Of Jacob Were Seventy Souls

"Loins" is an old word for the body that produces offspring.

The phrase simply means everyone directly descended from Jacob.

Genesis forty six already gave this same exact number.

That count was seventy people.

Repeating it here ties Exodus straight back to that earlier count.

Seventy is a small, specific number.

The next two verses make that smallness matter.

🔢 Loins means the source of descendants

👪 Seventy counts everyone descended from Jacob

📜 Genesis forty six already gave this number

➡️ A small number is about to explode

## 👑 For Joseph Was In Egypt Already

Joseph is not counted as arriving with the rest of the family.

He was already governing Egypt when his brothers moved there.

Genesis already told that whole story, from slavery to power.

Joseph rose to become second in command under Pharaoh.

His position is exactly why the family had a safe place to move to.

👑 Joseph was already ruling in Egypt

📖 Genesis already told his rise to power

🏠 His position made the family's move possible

➡️ Joseph's success set up his family's safety

# Exodus 1:6-7
# 📈 Israel Multiplies Rapidly
---
## 💔 Joseph Died, And All His Brethren, And All That Generation

One verse erases an entire generation of memory.

Joseph is gone.

His brothers are gone.

Everyone who remembered why Egypt welcomed this family is gone too.

Nobody left in power owes this family anything personally.

That gap in memory makes the next Pharaoh's actions possible.

💔 Joseph and his brothers have died

⏳ Their whole generation is gone too

🧠 No one remembers Joseph's service firsthand

➡️ That forgotten history enables what comes next

## 🌾 Waxed Exceeding Mighty

"Waxed" is an old word meaning grew or became.

This verse stacks four different growth words in a row.

Fruitful, increased, multiplied, and waxed all describe the same explosion from different angles.

That pileup is not repetition for no reason.

It is the text's way of shouting just how fast this family grew.

Genesis promised Abraham a nation as many as the stars.

This verse shows that promise actually happening.

🌾 Waxed means grew or became

📈 Four growth words are stacked together

⭐ This fulfills God's promise to Abraham

📖 A promise from Genesis becomes visible here

# Exodus 1:8-10
# 😨 A New King Forgets Joseph
---
## 👑 There Arose Up A New King Over Egypt, Which Knew Not Joseph

A new ruler takes Egypt's throne with no personal history with Joseph.

This does not necessarily mean he never heard of Joseph.

Many scholars believe this describes a change in dynasty.

A different royal family may have taken over Egypt by this point.

Whatever loyalty Joseph earned no longer matters to whoever sits on the throne now.

👑 A new king takes Egypt's throne

🔄 This may mark a new dynasty

🚫 Joseph's service means nothing to him

➡️ Old debts no longer apply here

## 😨 The People Of The Children Of Israel Are More And Mightier Than We

The king says this out loud to his own people.

He is naming a real political fear, not exaggerating.

A foreign family has grown large enough to possibly outnumber native Egyptians.

Fear is what starts everything that follows in this chapter.

Israel has done nothing wrong to cause this fear.

😨 The king fears Israel's growing numbers

🗣️ He says this openly to his people

🚫 Israel has done nothing wrong here

➡️ Fear alone launches the coming oppression

## 🧠 Let Us Deal Wisely With Them

"Deal wisely" sounds like careful strategy.

It actually means calculated cruelty dressed up as clever planning.

The king worries Israel might join an invading army during a war.

He fears they would then leave Egypt entirely.

Losing Israel as a labor force is his true concern, not simply being invaded.

Oppression begins here as a plan on paper before it becomes an action.

🧠 Deal wisely really means planned cruelty

⚔️ The king fears Israel joining an enemy

💼 Losing free labor is his true worry

📖 Oppression starts as a plan first

# Exodus 1:11-14
# ⛏️ Slavery Begins
---
## 👷 Taskmasters To Afflict Them With Their Burdens

A taskmaster was an official appointed to enforce brutal, forced labor.

This job existed only to make life harder on purpose.

This is the exact moment forced slavery formally begins for Israel.

One generation earlier, Joseph's family arrived as honored guests of Pharaoh.

Now their descendants are treated as property to be worked.

👷 Taskmasters were officials enforcing cruelty

⛓️ This begins Israel's formal slavery

📜 Genesis showed an honored welcome instead

➡️ Honor turned into oppression in one generation

## 🏙️ They Built For Pharaoh Treasure Cities, Pithom And Raamses

Treasure cities were fortified storage centers for Egypt's government wealth.

Pithom and Raamses were real, specific cities, not a vague description.

Israel's forced labor built up the very government oppressing them.

Their own strength was used to strengthen the nation enslaving them.

🏙️ Treasure cities stored Egypt's supplies and wealth

📍 Pithom and Raamses were real cities

😔 Israel's labor built up their oppressor

➡️ Their strength fed the system against them

## 📈 The More They Afflicted Them, The More They Multiplied And Grew

The plan backfires immediately.

Oppression was meant to shrink Israel's population.

Instead, growth continues right alongside the cruelty.

"Grieved" here means the Egyptians felt dread, not sympathy.

Their own strategy is making the problem they feared even worse.

📈 Oppression fails to slow Israel's growth

😠 Grieved here means Egyptian dread, not pity

🔁 Their fear only grows with the cruelty

📖 God's blessing outworks human cruelty

## ⛓️ The Egyptians Made The Children Of Israel To Serve With Rigour

"Rigour" means harsh, severe cruelty, not simply strict discipline.

This is not describing difficult but fair work.

"Bitter" describes how their entire daily life felt under this treatment.

Bondage means slavery, a complete loss of control over their own lives.

⛓️ Rigour means severe, deliberate cruelty

😖 Bitter describes their daily experience

🚫 Bondage means total loss of freedom

📖 This is real slavery, not strict work

## 🧱 In Morter, And In Brick, And In All Manner Of Service In The Field

Mortar and brick describe actual construction labor.

Workers mixed wet clay and straw by hand.

They shaped and dried it into bricks all day long.

Field service adds outdoor farm labor on top of that.

This was physically brutal work under a hot sun, not light chores.

🧱 Mortar and brick meant hand built construction

🌾 Field service added farm labor too

☀️ This work was physically brutal

➡️ Real bodies bore this real cost

# Exodus 1:15-17
# 👩‍⚕️ The Midwives Refuse To Obey
---
## 👩‍⚕️ Shiphrah, And The Name Of The Other Puah

These two women are named individually in Scripture.

The king of Egypt himself is never named anywhere in this chapter.

That is not an accident of the text.

Scripture preserves the names of two quiet, faithful women.

It leaves the name of a powerful ruler out entirely.

Their courage mattered enough to outlast his throne.

👩‍⚕️ Shiphrah and Puah are named individually

👑 Egypt's king is never named here

📖 Scripture honors faithfulness over raw power

➡️ Their names outlasted his throne

## 🩸 If It Be A Son, Then Ye Shall Kill Him

Pharaoh orders a quiet, secret killing instead of a public one.

He wants the midwives themselves to carry it out.

This was meant to happen at the very moment of birth.

Only sons are targeted here.

Sons were feared as future soldiers or laborers who could threaten Egyptian control.

Daughters are left alive because they were not seen as that same threat.

🩸 Pharaoh orders a secret killing plan

👶 Only baby boys are targeted

⚔️ Sons were feared as future soldiers

➡️ Daughters are spared, seen as no threat

## 🙏 The Midwives Feared God, And Did Not As The King Of Egypt Commanded Them

"Feared God" means holding Him in reverence above every other authority.

That includes a king's direct command.

Shiphrah and Puah choose God's authority over Pharaoh's order.

This is not passive resistance.

Disobeying a king's command was genuinely dangerous, and they knew it.

Their choice protects the very children Pharaoh wanted dead.

🙏 Feared God means reverence above any king

🛡️ Disobeying Pharaoh was genuinely dangerous

👶 Their choice saved the children's lives

➡️ Reverence for God outweighed royal fear

# Exodus 1:18-21
# ⚖️ Pharaoh Confronts The Midwives
---
## ❓ Why Have Ye Done This Thing, And Have Saved The Men Children Alive

Pharaoh notices his order is not being carried out.

He confronts the midwives directly instead of quietly replacing them.

They have already disobeyed him once.

Now they must answer for it face to face.

❓ Pharaoh questions them face to face

🕵️ He noticed his plan was failing

😬 They must now answer for disobeying

➡️ Direct confrontation raises the danger

## 🗣️ The Hebrew Women Are Not As The Egyptian Women, For They Are Lively

"Lively" here means vigorous, quick to give birth.

The midwives claim Hebrew women give birth too fast for them to interfere.

This is a clever, believable excuse.

It protects the midwives while still refusing Pharaoh's command.

The text does not tell us whether Pharaoh believed them.

🗣️ Lively means quick, fast childbirth

🧠 This is a clever, protective excuse

🚫 They still refuse Pharaoh's order

📖 Wisdom can also look like resistance

## 🙌 God Dealt Well With The Midwives

God rewards their courage directly, not just quietly from a distance.

The population of Israel keeps multiplying right alongside their bravery.

Pharaoh's whole plan to shrink Israel keeps failing.

It fails at every single stage.

🙌 God directly rewards their courage

📈 Israel's population keeps growing anyway

🚫 Pharaoh's plan keeps failing completely

📖 Obedience to God is never wasted

## 🏠 Because The Midwives Feared God, That He Made Them Houses

"Made them houses" means God gave the midwives households of their own.

This likely means children and lasting family lines carrying their names forward.

Their reverence for God is named as the direct cause of this reward.

God notices the ones who honor Him even in danger.

🏠 Made them houses means families of their own

👪 This likely means children and lasting lines

🙏 Their reverence caused this reward

➡️ God remembers those who honor Him

# Exodus 1:22
# 🌊 Pharaoh's Public Decree
---
## 🌊 Every Son That Is Born Ye Shall Cast Into The River

The secret plan through the midwives has completely failed.

Pharaoh escalates from a quiet order to an open, public command.

He now commands his entire nation, not just two midwives.

The order is to drown every Hebrew baby boy.

The river here is the Nile, Egypt's main water source.

🌊 Pharaoh issues a public drowning order

📈 This escalates far past the midwives' plan

🇪🇬 The whole nation is now ordered

➡️ Secret failure leads to open cruelty

## 👧 And Every Daughter Ye Shall Save Alive

Pharaoh spares daughters for the same reason he targeted sons.

They were not seen as a future military threat.

This decree sets the stage for the very next chapter.

One baby boy will need to be hidden and rescued from this exact river.

The river Pharaoh chose as a weapon soon becomes a place of rescue instead.

👧 Daughters are spared as no threat

🍼 This decree sets up the next chapter

🌊 The Nile soon saves instead of kills

📖 God turns Pharaoh's weapon into rescue`.trim();

export const EXODUS_ONE_PERSONAL_SECTIONS = parseExodusOneRawNotes(EXODUS_ONE_RAW_NOTES);
