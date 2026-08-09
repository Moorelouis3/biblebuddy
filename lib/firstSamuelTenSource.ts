export type FirstSamuelTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTenRawNotes(rawText: string): FirstSamuelTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 10:${startVerse}` : `1 Samuel 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 1 Samuel 10 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TEN_RAW_NOTES = `# FirstSamuel 10:1-2
# 🫒 Anointed To Be Captain
---
## 🫙 A Vial Of Oil

A vial is a small flask, not a large jar.

Anointing with oil marked someone as chosen by God for a special task.

Kings, priests, and prophets were all anointed this way in Israel.

Oil poured on the head pictured God's Spirit resting on that person.

🫙 A vial holds a small amount

👑 Anointing marked God's chosen leader

🕊️ Oil pictured the Spirit resting on him

📖 Saul is now set apart by God

## 👋 Kissed Him

A kiss like this was a common greeting in the ancient world.

It also signaled loyalty and submission to the person being kissed.

Samuel kisses Saul the way a subject would honor a new king.

This is Samuel's way of publicly recognizing Saul's new position.

👋 Kissing was a normal greeting then

🤝 It also showed loyalty and submission

👑 Samuel honors Saul as the new king

📖 The kiss confirms what the anointing began

## 🎖️ Captain Over His Inheritance

Inheritance here does not mean money or property Saul will own.

It means the people of Israel, who belong to God himself.

Calling Saul captain over that inheritance makes him a caretaker, not an owner.

The real king of Israel is still the Lord.

🏛️ Inheritance means the people of Israel

🤲 Israel belongs to God, not to Saul

🎖️ Captain means caretaker, not owner

📖 God remains Israel's true king

## 🪦 Rachel's Sepulchre In The Border Of Benjamin

Rachel was Jacob's beloved wife and the mother of Joseph and Benjamin.

She died giving birth to Benjamin and was buried near Bethlehem.

That tomb sat right on the border of the tribe of Benjamin.

Samuel names a landmark Saul would already know from his own tribe.

👩 Rachel was Jacob's beloved wife

👶 She died giving birth to Benjamin

🪦 Her tomb marked the border of Benjamin

📖 The sign uses a place Saul already knew

## 🐴 Thy Father Hath Left The Care Of The Asses

Saul had left home searching for his father's lost donkeys.

This sign tells Saul that search is already finished.

His father has stopped worrying about the animals themselves.

Now Kish is only worried about his missing son.

🐴 The lost donkeys have already been found

😟 Kish stopped worrying about the animals

💛 Kish now only worries about Saul

📖 A father's love outweighs his losses

# FirstSamuel 10:3-6
# 🎺 Three Signs Along The Way
---
## 🏠 Three Men Going Up To God To Bethel

Bethel means house of God and was one of Israel's oldest holy sites.

Jacob had met God there in a dream generations earlier.

These three men are pilgrims heading there to worship and bring offerings.

Meeting them shows Saul that ordinary worship goes on around him.

🏠 Bethel means house of God

💤 Jacob once met God there

🚶 The men were pilgrims bringing offerings

📖 Ordinary worship continues around Saul

## 🍞 Two Loaves Of Bread Which Thou Shalt Receive

Strangers offering bread to a stranger was an act of hospitality.

Receiving the gift confirms Samuel's prediction is happening exactly as spoken.

Saul does nothing to earn this bread.

It simply happens because Samuel said it would.

🍞 Bread was offered out of hospitality

✅ The gift confirms Samuel's exact words

🤲 Saul receives it without asking

📖 God's word is proven true in small details

## ⚔️ The Garrison Of The Philistines

A garrison is a group of soldiers stationed to hold territory.

The Philistines had a garrison planted inside Israel's own land.

That is a sign of how much power Israel had lost.

Saul is about to lead a nation living under foreign control.

⚔️ A garrison is a stationed army camp

🚩 Philistines held ground inside Israel

📉 It showed how weak Israel had become

📖 Saul inherits a nation under threat

## 🎶 A Company Of Prophets Coming Down

A company of prophets was a group trained together in worship and praise.

They traveled together playing instruments and speaking words from God.

Their instruments included a psaltery, a tabret, a pipe, and a harp.

Music was one way Israel expressed prayer and prophecy together.

🎶 A company of prophets trained together

🎻 Their instruments included strings and drums

🥁 They played and spoke words from God

📖 Music carried prayer and prophecy together

## 🌀 Turned Into Another Man

This phrase describes a deep inner change, not just new information.

The Spirit of the Lord gave Saul courage and ability he did not have before.

God was equipping Saul for a role he never expected to hold.

The change was real, even though Saul's character would still be tested later.

🌀 Turned into another man means changed within

💪 The Spirit gave Saul new courage

🎁 God equips those he calls

📖 A changed heart still faces real tests

# FirstSamuel 10:7-9
# ⏳ Wait For Me At Gilgal
---
## ⏳ As Occasion Serve Thee

This phrase is an old way of saying act according to the moment.

Samuel is not giving Saul a detailed list of instructions to follow.

He is telling Saul to use wisdom as each situation comes up.

Leadership often means responding well to what actually happens, not a script.

⏳ Occasion serve thee means act in the moment

🧭 Samuel gives principle, not a checklist

🧠 Saul must use wisdom in the moment

📖 Real leadership responds to what happens

## 🏕️ Go Down Before Me To Gilgal

Gilgal was the first camp Israel set up after crossing the Jordan River.

It was the place where the nation renewed its covenant with God.

Sending Saul there ties his new kingship back to Israel's beginnings.

This same place will later become the site of Saul's first failure as king.

🏕️ Gilgal was Israel's first camp in Canaan

🤝 It was a place of covenant renewal

👑 Saul's kingship is tied to that history

📖 Gilgal will later test Saul's obedience

## 🔥 Burnt Offerings And Peace Offerings

A burnt offering was completely burned up as a gift wholly given to God.

A peace offering was partly burned and partly eaten in a shared meal.

Offering both together showed worship and fellowship happening side by side.

Samuel would lead this sacrifice himself once he arrived.

🔥 A burnt offering was fully given to God

🍽️ A peace offering became a shared meal

🙏 Together they showed worship and fellowship

📖 Samuel would lead the sacrifice himself

## 🔢 Seven Days Shalt Thou Tarry

Tarry means to wait or stay in one place.

Seven often marks a complete or set period of time in scripture.

Saul is told to wait exactly that long for Samuel to arrive.

Obeying this instruction later becomes the real test of his kingship.

⏳ Tarry means to wait in place

🔢 Seven marked a complete set time

⌛ Saul must wait for Samuel to come

📖 This instruction becomes Saul's real test

# FirstSamuel 10:10-13
# ❓ Is Saul Also Among The Prophets
---
## ✅ The Spirit Of God Came Upon Him

This is the sign Samuel promised now happening exactly as spoken.

The Spirit of God had already changed Saul back in verse nine.

Now that change becomes visible to people watching in public.

Private transformation is confirmed here by public evidence.

✅ This sign happens exactly as promised

🕊️ God's Spirit had already changed Saul

👀 The change is now visible publicly

📖 Private change is confirmed by public proof

## 😲 Is Saul Also Among The Prophets

This question is not really asking for information.

It expresses shock that Saul, a farmer's son, is prophesying with trained prophets.

Nobody expected someone from his background to act this way.

God had done something nobody around Saul could explain.

😲 The question expresses shock, not curiosity

🌾 Saul came from a farming family

🎓 Trained prophets usually had that role

📖 God surprised everyone who knew Saul

## 👪 But Who Is Their Father

This question points out that the prophets themselves had no famous family line.

The man is saying anyone can prophesy if God's Spirit comes upon them.

Family background does not decide who God can use.

The proverb remembers this strange, unexpected moment for Saul.

👪 The prophets had no famous lineage

🎯 Anyone can be used if God chooses

🚫 Family background does not limit God

📖 The moment became a lasting proverb

## 🏁 Made An End Of Prophesying

This marks the moment the prophetic sign officially finishes.

Saul had done everything Samuel said this sign would involve.

The public display is now over.

Every sign Samuel promised in this chapter has now come true.

🏁 The sign officially comes to an end

✅ Saul fulfilled everything Samuel described

🚶 Normal life resumes for him now

📖 Every promised sign has now come true

## ⛰️ He Came To The High Place

A high place was a raised site used for worship and sacrifice.

Many towns in Israel had one before the temple was ever built.

Saul goes there after his encounter with the prophets ends.

The chapter is showing Saul moving through ordinary, familiar worship life.

⛰️ A high place was a worship site

🏘️ Towns often had one of their own

🚶 Saul visits it after the sign ends

📖 Saul returns to ordinary worship life

# FirstSamuel 10:14-16
# 🤐 He Told Him Not
---
## 👴 Saul's Uncle Said Unto Him

This uncle is a family member checking in on Saul's return.

His question is simple, just where Saul had been.

Family members did not yet know anything unusual had happened.

This ordinary conversation hides an extraordinary secret.

👴 The uncle is Saul's own family

❓ He simply asks where Saul went

🙈 Nobody yet knows what happened to Saul

📖 An ordinary question hides an extraordinary secret

## 🐴 He Told Us Plainly That The Asses Were Found

Saul answers honestly about the part of the story that is simple.

The donkeys really were found, exactly as Samuel had said.

This part of the truth costs Saul nothing to share.

He gives an honest but incomplete answer.

🐴 Saul reports the donkeys were found

✅ This part of the story is simple

🗣️ Saul answers honestly but only partly

📖 An honest answer can still be incomplete

## 🗣️ Tell Me What Samuel Said Unto You

The uncle wants the full report of what Samuel told Saul.

He does not yet know Samuel said far more than directions home.

Saul is now the one holding back information.

The reader already knows the secret the uncle does not.

🗣️ The uncle wants the full report

🤫 He does not know the bigger news

🔐 Saul now holds back information

📖 The reader knows what the uncle does not

## 🤐 The Matter Of The Kingdom He Told Him Not

Saul keeps the news about becoming king completely to himself.

This could come from humility, fear, or simple caution.

Announcing a new king too early could have caused real danger.

Saul is learning to carry weight quietly before he carries it publicly.

🤐 Saul hides the news of his kingship

😨 Fear or humility may explain his silence

⚠️ An early announcement could have caused danger

📖 Saul carries the secret before the crown

# FirstSamuel 10:17-19
# 📯 Ye Have Rejected Your God
---
## 📍 Samuel Called The People Together Unto The Lord To Mizpeh

Mizpeh was a gathering place used for national meetings in Israel.

Samuel had called Israel there before in a moment of victory.

Now he calls them there again for something far more serious.

A public king needs a public confirmation before the whole nation.

📍 Mizpeh was a national gathering site

🏆 Israel had gathered there before in victory

👑 Now the nation gathers to confirm a king

📖 Kingship needed public confirmation, not secrecy

## ⛓️ I Brought Up Israel Out Of Egypt

Samuel reminds Israel of what God had already done for them.

God rescued them from slavery in Egypt long before any king existed.

Every enemy since then had been handled by God himself.

Samuel is building the case for what happens in the next verse.

⛓️ God rescued Israel from slavery in Egypt

🛡️ God defeated Israel's enemies before any king

📜 Samuel recalls this shared history

📖 The history sets up a hard rebuke

## 😔 Nay But Set A King Over Us

Israel had already asked for a king back in chapter eight.

Samuel calls that request a rejection of God as their ruler.

The people wanted a king like other nations had.

God gave them what they asked for, even though it grieved him.

😔 Israel had already demanded a king

🚫 That request rejected God as ruler

🌍 They wanted to be like other nations

📖 God granted the request anyway

## 🏛️ By Your Tribes And By Your Thousands

Israel was organized first by tribe and then by smaller family groups.

A thousand described a large extended family or clan, not an exact count.

This structure let Samuel narrow the search down step by step.

The process was about to single out one specific man.

🏛️ Israel was organized by tribe first

👪 A thousand meant a large family clan

🔍 This let Samuel narrow the search

📖 One specific man was about to be found

# FirstSamuel 10:20-24
# 🎒 Hid Among The Stuff
---
## 🎲 The Tribe Of Benjamin Was Taken

Israel likely used the Urim and Thummim to cast this kind of lot.

Those were sacred objects the high priest used to learn God's decision.

The process moves from the whole tribe down to one family.

God is choosing Saul in a way nobody can claim credit for.

🎲 Lots were likely cast using sacred objects

🙏 The high priest used them to seek God

🔽 The process narrowed step by step

📖 Nobody could claim they picked the king

## ❓ He Could Not Be Found

Saul is chosen, but he is nowhere to be seen.

This is strange for a man who was just named king.

His absence raises a question the next verse answers.

Something is clearly wrong at the very moment of his selection.

❓ Saul disappears at the moment of choosing

😳 This is strange timing for a new king

🔎 His absence raises an immediate question

📖 Something is clearly happening off stage

## 🎒 Hid Himself Among The Stuff

The stuff refers to baggage, supplies, and equipment kept with the camp.

Saul physically crawled in among the gear to avoid being seen.

This shows real fear or reluctance, not calm confidence.

A future king begins his story by trying to disappear.

🎒 The stuff means baggage and equipment

🙈 Saul hides among the gear

😰 His hiding shows real fear

📖 The future king begins by trying to vanish

## 📏 Higher Than Any Of The People

Saul stood taller than everyone else from his shoulders up.

In the ancient world, height often looked like a sign of strength.

People judged leaders partly by appearance back then.

Saul looked the part before he had proven anything.

📏 Saul stood taller than everyone else

💪 Height suggested strength to ancient eyes

👀 People judged leaders by appearance

📖 Saul looked kingly before he acted like one

## 📣 God Save The King

This phrase became Israel's shout of loyalty to a new king.

It means something closer to let the king live and reign.

The same phrase has echoed through history in other nations since.

The crowd's shout marks Saul's public acceptance as king.

📣 The phrase means let the king live

👑 It became Israel's shout of loyalty

🌍 Later nations echoed this same phrase

📖 The crowd publicly accepts Saul as king

# FirstSamuel 10:25-27
# 📜 The Manner Of The Kingdom
---
## 🧾 The Manner Of The Kingdom

This means the rights and limits that would govern Israel's king.

Samuel had already warned Israel what a king would take from them.

Now he writes down the actual terms of how kingship will work.

This document was meant to hold the king accountable.

⚠️ Samuel warned Israel about kings before

✍️ He wrote the actual terms down

🧾 The document held the king accountable

📖 Kingship in Israel came with real limits

## ⛺ Laid It Up Before The Lord

The book was placed in the tabernacle, God's own dwelling place.

Storing it there made the document sacred and unchangeable by human hands.

The king was bound by a record kept in God's presence.

Even Israel's king answered to something higher than himself.

⛺ The document was kept in the tabernacle

🔒 That made it sacred and unchangeable

👑 The king was bound by this record

📖 Even the king answered to God

## 🫂 A Band Of Men Whose Hearts God Had Touched

These men were not soldiers Saul recruited or paid.

God himself moved their hearts to support Saul.

Their loyalty came from God, not from Saul's own charm or effort.

This is the beginning of Saul's very first followers.

🫂 These men were not paid soldiers

🙏 God moved their hearts to follow

❤️ Their loyalty came from God, not Saul

📖 Saul's first followers were a gift from God

## 😤 The Children Of Belial

Belial is an old word for worthless or wicked.

These men openly doubted Saul's ability to save Israel.

Their scorn shows the whole nation was not united behind him.

Not everyone accepts God's chosen leader right away.

😤 Belial means worthless or wicked

🙄 These men openly doubted Saul

🚫 They refused to support their new king

📖 God's choice is not accepted by all

## 🤐 He Held His Peace

Saul chooses not to respond to the insult at all.

He does not argue, punish, or demand respect from his critics.

This restraint stands out from how Saul acts later in his story.

A quiet response here says more than an angry one would.

🤐 Saul says nothing back to his critics

🕊️ He shows restraint instead of anger

📉 This contrasts with his later behavior

📖 Silence here speaks louder than a defense
`.trim();

export const FIRST_SAMUEL_TEN_PERSONAL_SECTIONS = parseFirstSamuelTenRawNotes(FIRST_SAMUEL_TEN_RAW_NOTES);
