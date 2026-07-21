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

  if (sections.length !== 4) {
    throw new Error("Expected 4 Genesis 39 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_NINE_RAW_NOTES = `# Genesis 39:1–6

# 🏺 Joseph Prospers In Potiphar's House

---

## 📦 Joseph Was Brought Down To Egypt

This picks up right where chapter 37 left off.

Joseph's brothers sold him to a caravan of traders heading to Egypt, and now Moses returns to that thread.

**Potiphar** bought him from the hands of the Ishmeelites, the same traders his brothers had sold him to.

What looked like the end of Joseph's story to his brothers was actually God moving him into position for everything that comes next.

📦 Joseph arrives in Egypt as a slave

🐫 He is bought from the same traders his brothers sold him to

🙏 God is already at work behind what looks like tragedy

➡️ Moses tells us who bought him

---

## 👑 Potiphar, An Officer Of Pharaoh, Captain Of The Guard

**Potiphar** was not an ordinary Egyptian.

He was an **officer of Pharaoh**, meaning he served in the royal court, and **captain of the guard**, a title connected to Pharaoh's personal bodyguard and, likely, the execution of prisoners.

This was a position of real power and trust close to the throne.

Joseph did not land in just any household. He landed in one connected directly to the highest levels of Egyptian government — a detail that matters later.

👑 Potiphar served in Pharaoh's royal court

🛡️ Captain of the guard was a position of high trust

📖 This connection to the palace matters later in Joseph's story

➡️ Moses reveals the real reason for Joseph's success

---

## 🙏 The LORD Was With Joseph

This is the key sentence of the entire chapter.

Not "Joseph was talented." Not "Joseph worked hard." **The LORD was with him.**

Everything that follows — his rise in Potiphar's house, his integrity under temptation, his favor in prison — flows from this one fact.

This phrase repeats again later in the chapter (verse 21), forming a frame around the whole story: God's presence at the beginning, and God's presence at the end, no matter what happens in between.

🙏 God's presence is the true source of Joseph's success

📖 This phrase reappears later in the chapter

⭐ Everything Joseph experiences flows from this one reality

➡️ That presence produces real results

---

## 📈 He Was A Prosperous Man

**Prosperous** here does not mean rich or free.

Joseph is a slave in a foreign country, with no rights, no family, and no control over his own life.

Yet Scripture calls him prosperous, because prosperity in the Bible is not first about circumstances — it is about God's blessing resting on a person's life and work.

Joseph's chains do not cancel God's favor.

📈 Prosperity here is not about freedom or wealth

⛓️ Joseph is still a slave when this is written

🙏 True prosperity is God's blessing on a life, not just good circumstances

➡️ Even Potiphar notices something is different

---

## 👀 His Master Saw That The LORD Was With Him

Potiphar was an Egyptian who worshiped Egyptian gods, not the God of Abraham.

Yet even he could see that something set Joseph apart.

He could not explain it in the language of Joseph's faith, but he could see the results: everything Joseph touched succeeded.

Sometimes the clearest evidence of God's presence in a believer's life is what unbelievers notice from the outside.

👀 Potiphar was not a worshiper of the true God

✨ He still recognized God's hand on Joseph's life

📖 A godly life is visible even to those who don't share the faith

➡️ Joseph earns real trust

---

## 🤝 Joseph Found Grace In His Sight

**Grace** here means favor — Joseph earned Potiphar's genuine trust and goodwill.

This wasn't given automatically because Joseph was a slave who had to be tolerated. It was earned through faithful, honest, diligent service over time.

Joseph's character in a foreign house, under difficult circumstances, becomes the doorway to everything that follows.

🤝 Joseph earns real favor with his master

⏳ This trust builds over time through faithful service

📖 Character opens doors that status alone cannot

➡️ Potiphar promotes him

---

## 🏠 He Made Him Overseer Over His House

Potiphar puts Joseph in charge of his entire household.

An **overseer** managed the practical affairs of a large estate — servants, resources, daily operations, and finances.

This is a small-scale preview of what Joseph will eventually do for all of Egypt: take responsibility for someone else's house and manage it wisely and faithfully.

God is preparing Joseph for a much larger assignment by first trusting him with a smaller one.

🏠 Joseph is placed in charge of Potiphar's entire estate

📖 This role foreshadows his future position over all of Egypt

🙏 Faithfulness in a small role prepares him for a much bigger one

➡️ Potiphar's whole house is blessed because of Joseph

---

## 🌾 The LORD Blessed The Egyptian's House For Joseph's Sake

This directly echoes God's promise to Abraham: **"I will bless them that bless thee"** and **"in thee shall all families of the earth be blessed"** (Genesis 12:2–3).

Potiphar is a pagan Egyptian with no covenant relationship with God — yet his household prospers simply because Joseph, a covenant son of Abraham, lives there.

The blessing promised to Abraham's family is already beginning to spill out onto the nations, exactly as God said it would.

🌾 Potiphar's household prospers because of Joseph

📖 This fulfills God's promise to bless the nations through Abraham's family

🌍 Blessing flows outward from God's people to those around them

➡️ Potiphar hands Joseph total control

---

## 🔑 He Left All That He Had In Joseph's Hand

Potiphar's trust becomes total. He stops managing the details himself entirely.

**"He knew not ought he had save the bread which he did eat"** — meaning Potiphar's only remaining concern was his own food, likely for ceremonial or personal reasons rather than distrust.

Everything else — servants, property, business, wealth — Joseph oversees completely.

🔑 Potiphar hands over full control of his estate

🍞 He keeps only personal oversight of his own food

🤝 This is complete, total trust from master to slave

➡️ Moses describes Joseph himself

---

## ✨ Joseph Was A Goodly Person, And Well Favoured

Joseph is described as physically attractive — strong and good-looking.

This is the same language used earlier to describe his mother Rachel (Genesis 29:17), which is a small, tender detail connecting Joseph back to her.

Moses includes this detail here for a reason: it sets up exactly what happens next.

✨ Joseph is described as strikingly attractive

👩 The same language was used to describe his mother Rachel

⚠️ This detail sets up the temptation that follows immediately

# Genesis 39:7–12

# 🚪 Joseph Resists Temptation

---

## 👁️ His Master's Wife Cast Her Eyes Upon Joseph

Potiphar's wife notices Joseph — not just his character, but his appearance — and makes a direct, bold proposition: **"Lie with me."**

There is no seduction or subtlety here. It is a blunt demand from a woman with power over a slave who, in that culture, would have had little ability to refuse without consequence.

👁️ Potiphar's wife is drawn to Joseph

🗣️ Her proposition is direct and immediate

⚠️ Joseph has every worldly reason to fear saying no

➡️ Joseph's answer is immediate

---

## 🚫 But He Refused

Before Joseph explains anything, Moses tells us the outcome first: **he refused.**

This word order matters. Joseph's character was already settled before the temptation ever needed reasoning through. His answer wasn't a long internal debate — his convictions were already in place.

🚫 Joseph's refusal is immediate, not hesitant

🧠 His character was decided before the moment of testing arrived

📖 Real integrity is prepared in advance, not invented in the moment

➡️ Joseph explains his reasoning

---

## 🏠 My Master Wotteth Not What Is With Me In The House

**"Wotteth"** is old English for "knows."

Joseph's first reason is loyalty: Potiphar trusts him completely and has no idea what is happening in his own house. Betraying that trust would be a direct violation of the position Potiphar gave him.

Joseph doesn't begin with fear of punishment — he begins with faithfulness to the man who trusted him.

🏠 Wotteth is an old word meaning "knows"

🤝 Joseph's first concern is his master's trust

📖 Integrity begins with faithfulness to those who trust us

➡️ Joseph continues his reasoning

---

## 🙅 There Is None Greater In This House Than I

Joseph acknowledges how much authority Potiphar has already given him — everything except one thing: his wife.

Joseph recognizes that this single boundary exists precisely because she belongs to Potiphar alone. Crossing it would betray the one line Potiphar never crossed with him.

🙅 Joseph has authority over everything except this one thing

💍 Potiphar's wife is the one boundary that was never given to him

📖 Respecting boundaries is part of real trustworthiness

➡️ Joseph reaches the real reason behind his refusal

---

## ⚖️ How Then Can I Do This Great Wickedness, And Sin Against God?

This is the heart of Joseph's answer.

Notice the order: he calls it wickedness first, then names who it is ultimately against — **not primarily Potiphar, but God.**

Joseph's moral compass isn't rooted in "who might find out" or "who might punish me." It's rooted in God's presence and God's standard, even in a foreign land, far from his family, with no one watching but God Himself.

⚖️ Joseph names this sin as wickedness before anything else

🙏 He identifies God, not just Potiphar, as the one he would sin against

📖 True integrity holds even when no one else would know

➡️ The temptation doesn't stop after one conversation

---

## 📅 As She Spake To Joseph Day By Day

This wasn't a single moment of pressure Joseph resisted once and moved on from.

It was **daily, repeated pressure** — the kind that wears a person down over time. Joseph didn't just win one difficult moment; he kept winning the same battle again and again.

📅 The temptation was repeated, not a single event

⏳ Sustained pressure is often harder to resist than a single moment

🙏 Joseph's integrity held firm over time, not just once

➡️ His answer never changes

---

## 🚶 He Hearkened Not Unto Her

Joseph's refusal never wavers, no matter how many times she asks.

He doesn't negotiate, entertain the idea, or slowly wear down. His answer on day one is the same as his answer on the last day.

🚶 Joseph's answer never changes over time

🛡️ Consistency under repeated pressure is its own kind of strength

➡️ One day, the danger increases sharply

---

## 🏡 Joseph Went Into The House To Do His Business

One day, Joseph enters the house to carry out his normal duties, and this time **no other men of the household are present.**

The setting itself becomes dangerous — Joseph is now alone with her, with no witnesses and no one nearby to interrupt what happens next.

🏡 Joseph is simply doing his normal work

🚪 No one else is in the house this time

⚠️ The situation turns dangerous very quickly

➡️ She escalates from words to action

---

## ✋ She Caught Him By His Garment

Words become physical action. She grabs Joseph's garment and repeats her demand.

This is the most dangerous moment in the entire chapter — the point where fleeing becomes the only real option left.

✋ The temptation becomes physical, not just verbal

⚠️ This is the most dangerous moment in the chapter

➡️ Joseph makes his final move

---

## 🏃 He Left His Garment In Her Hand, And Fled

Joseph doesn't stay to argue, explain, or reason further. He runs, leaving his garment behind rather than staying one more second in that room.

This becomes a picture Scripture returns to elsewhere — the wisdom of physically removing yourself from temptation rather than trusting yourself to out-argue it. Centuries later, Paul would give nearly identical instruction: **"flee fornication"** (1 Corinthians 6:18).

Joseph loses a garment. He keeps his integrity. That was always the better trade.

🏃 Joseph chooses to flee rather than reason further

📖 This foreshadows Paul's later instruction to "flee" sexual temptation

🙏 Sometimes wisdom means leaving, not debating

➡️ That abandoned garment becomes dangerous evidence

# Genesis 39:13–18

# 🎭 Potiphar's Wife Lies About Joseph

---

## 📣 She Called Unto The Men Of Her House

The moment Joseph flees, Potiphar's wife acts quickly. She calls the household servants together **before** Joseph has any chance to explain himself.

Speed matters here — she is controlling the narrative before the truth has any opportunity to surface first.

📣 She acts immediately after Joseph flees

⏱️ Getting her story out first was a deliberate strategy

➡️ She reframes the entire situation

---

## 🗯️ He Hath Brought In An Hebrew Unto Us To Mock Us

Notice the word **"us."** She isn't just accusing Joseph to protect herself — she's rallying the other servants by appealing to a shared prejudice against Hebrews, framing Joseph's presence in the house as an insult to all of them, not just her.

This is a manipulation tactic as old as human nature: turn a personal accusation into a group grievance to gain instant sympathy and support.

🗯️ She frames this as an insult to the whole household, not just herself

⚠️ She uses prejudice against Hebrews to gain sympathy

📖 Manipulation often recruits others by appealing to shared bias

➡️ She invents her own version of events

---

## 😱 I Cried With A Loud Voice

Here is the lie itself: she claims **she** was the one resisting, and that her cries scared Joseph into fleeing.

The truth is the exact opposite of what she describes. This is a complete reversal — the pursuer recasting herself as the victim, and the one who resisted temptation recast as the aggressor.

😱 She invents a story opposite of what actually happened

🔄 The pursuer recasts herself as the victim

➡️ She keeps physical evidence to support her lie

---

## 👗 She Laid Up His Garment By Her, Until His Lord Came Home

She doesn't destroy the garment — she **saves** it as evidence, patiently waiting for Potiphar's return so she can present her false accusation with what looks like proof in hand.

This shows real premeditation. It isn't just panic — it's a calculated decision to build a convincing case against an innocent man.

👗 The garment becomes manufactured evidence

⏳ She waits patiently for the right moment to use it

📖 This was calculated, not just a panicked reaction

➡️ She repeats the same story to her husband

---

## 🗣️ She Spake Unto Him According To These Words

When Potiphar comes home, she tells him essentially the identical story she told the servants — keeping her account consistent to make it more believable.

Consistency is often mistaken for truth. Her story doesn't change, but that doesn't make it true.

🗣️ She repeats the same false account to Potiphar

🎭 A consistent lie can still sound convincing

➡️ She specifically blames Potiphar's own choice

---

## 👤 The Hebrew Servant, Which Thou Hast Brought Unto Us

There's a subtle jab buried in her wording here — **"which thou hast brought unto us."**

She quietly shifts a measure of blame onto Potiphar himself for bringing Joseph into the household in the first place, even while making Joseph the primary target of her accusation.

👤 She subtly blames Potiphar's own decision to bring Joseph in

🎯 Joseph remains the main target of the accusation

📖 A skilled lie often spreads blame in more than one direction

➡️ Potiphar has to respond to what he's just heard

# Genesis 39:19–23

# ⛓️ Joseph Is Imprisoned, Yet The Lord Is With Him

---

## 🔥 His Wrath Was Kindled

Potiphar hears his wife's accusation and becomes angry.

It's worth noticing what Moses doesn't say: he doesn't say Potiphar had Joseph executed, even though a slave accused of assaulting his master's wife could easily have faced death under the authority Potiphar held as captain of the guard.

That restraint may hint that Potiphar had at least some private doubt about the full story — though Scripture doesn't say so directly.

🔥 Potiphar responds with real anger

⚖️ He had the authority to have Joseph killed, but didn't

🤔 This restraint may hint at quiet doubt about his wife's story

➡️ Joseph still pays a heavy price

---

## ⛓️ Joseph's Master Took Him, And Put Him Into The Prison

Despite his innocence, Joseph is thrown into prison.

This is the second time Joseph has suffered severely for doing the right thing — first sold by his own brothers out of jealousy, and now imprisoned by his master for refusing to sin.

Doing what is right does not always protect a person from suffering for it.

⛓️ Joseph is imprisoned despite being innocent

📖 This is the second time doing right leads to Joseph's suffering

🙏 Integrity does not guarantee an easy outcome

➡️ Moses tells us exactly what kind of prison this was

---

## 👑 A Place Where The King's Prisoners Were Bound

This detail matters more than it first appears.

This wasn't an ordinary local jail — it was a **royal prison**, holding prisoners connected to Pharaoh himself. Because Potiphar was captain of the guard, this prison was likely under his direct authority.

This detail sets up the very next chapter, where Joseph will meet Pharaoh's butler and baker — the connection that eventually leads him all the way to Pharaoh's throne.

👑 This is a royal prison, not an ordinary jail

🔗 It connects directly to Potiphar's authority as captain of the guard

📖 This sets up Joseph's meeting with Pharaoh's butler and baker in the next chapter

➡️ God's presence follows Joseph into prison

---

## 🙏 But The LORD Was With Joseph

This phrase returns, word for word, from verse 2 — forming a frame around the entire chapter.

Prosperity, slavery, temptation, false accusation, imprisonment — through every single turn, one thing never changes: **God's presence never left him.**

🙏 This exact phrase also opened the chapter in verse 2

📖 It forms a frame around Joseph's entire story here

⭐ Circumstances change completely, but God's presence never does

➡️ That presence produces the same results as before

---

## 🤝 Gave Him Favour In The Sight Of The Keeper Of The Prison

The exact same pattern that happened with Potiphar now repeats with the prison keeper.

Joseph doesn't need a title or freedom to gain trust — wherever God's presence is with him, favor follows, even inside a prison cell.

🤝 The same pattern of favor repeats in a completely new setting

🔁 Joseph's circumstances change, but the pattern of blessing does not

➡️ The prison keeper responds the same way Potiphar did

---

## 🗝️ The Keeper Of The Prison Committed To Joseph's Hand All The Prisoners

Just as Potiphar once handed Joseph the entire household, the prison keeper now hands him authority over the entire prison.

Joseph rises to leadership again — even as a prisoner himself, with no freedom and no status, he becomes the one others depend on.

🗝️ Joseph is again placed in charge, even while imprisoned

📈 He rises to leadership regardless of his circumstances

➡️ The chapter closes exactly where it began

---

## ✨ That Which He Did, The LORD Made It To Prosper

The chapter ends the same way it started: God's presence, God's blessing, and Joseph's faithfulness working together, no matter what circumstances surround him.

Joseph's outward situation has completely collapsed — slave to prisoner — yet the inward reality God is building in him has never once been interrupted.

✨ The chapter closes with the same truth it opened with

🔄 Joseph's circumstances change completely, but God's blessing does not

🙏 What God is building in a person cannot be undone by unjust circumstances`;

export const GENESIS_THIRTY_NINE_PERSONAL_SECTIONS = parseGenesisThirtyNineRawNotes(GENESIS_THIRTY_NINE_RAW_NOTES);
