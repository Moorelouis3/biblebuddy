export type GenesisFortyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyRawNotes(rawText: string): GenesisFortyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+40:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 40 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+40:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+40:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 40 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 40,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 40:${startVerse}` : `Genesis 40:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Genesis 40 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_RAW_NOTES = `# Genesis 40:1–4

# 🍷 Joseph Is Given Charge Of Two New Prisoners

---

## 🍷 The Butler Of The King Of Egypt And His Baker Had Offended Their Lord

The word **"chief"** in front of both titles matters.

This is the **chief** butler and the **chief** baker.

Each man headed an entire department of Pharaoh's household staff.

Other bakers and cupbearers worked under them.

These were not individual servants. They were department heads inside the royal palace.

The **chief butler**, or cupbearer, held one of the most sensitive jobs in any ancient royal court.

His duty was to personally taste and serve the king's wine.

That meant he was the first line of defense against poisoning.

A king could not trust just anyone with this job.

It required someone he was confident would never conspire against him.

Centuries later, the Bible shows the same office held by a foreigner, Nehemiah, serving the king of Persia. A Hebrew was trusted with the king's own cup.

The **chief baker** held that same kind of trust over Pharaoh's food.

Both men had daily, unsupervised access to everything the king consumed.

That is why offending the king in this role was treated far more seriously than an ordinary servant's mistake.

It touched on the king's own safety.

🍷 "Chief" means each man led an entire department of staff

🛡️ The cupbearer's job existed specifically to guard against poisoning

👑 These roles required a level of trust few servants ever received

⚠️ That is why their offense was treated so seriously

➡️ Pharaoh's response confirms how serious this was

---

## 😠 Pharaoh Was Wroth Against Two Of His Officers

**"Wroth"** is an old English word.

It simply means furious, or intensely angry.

It is stronger than ordinary irritation.

Moses also calls them **"officers"** here.

That is a term used elsewhere in the Old Testament for men who held real administrative authority.

It was not a word used for menial staff.

Pharaoh is not angry at two random servants.

He is angry at two of his own government officials.

😠 Wroth means furious, not just mildly upset

📖 "Officers" signals real administrative rank, not menial status

➡️ Pharaoh decides their punishment

---

## ⛓️ He Put Them In Ward In The House Of The Captain Of The Guard, The Place Where Joseph Was Bound

**"Ward"** is an old legal term.

It means a place of guarded custody.

It is related to our modern words "guard" and "warden."

It describes confinement under watch.

It does not necessarily mean the harsh dungeon a modern reader might picture.

The phrase **"the house of the captain of the guard"** is the same detail given in chapter 39.

This facility belonged to Potiphar.

He is the very man Joseph had served.

He is also the very man whose false accusation put Joseph there in the first place.

This is not a coincidence in the story.

Two of Pharaoh's own officials are placed in the one prison, under the one official, where Joseph already has standing.

⛓️ Ward is an old legal word for guarded custody

🏠 This is the same prison, under the same official, as chapter 39

🙏 God is quietly positioning Joseph before Joseph even knows it

➡️ Joseph is placed directly over them

---

## 🤝 The Captain Of The Guard Charged Joseph With Them

This detail only makes sense with the end of chapter 39 in mind.

The prison keeper had already made Joseph a kind of administrator over the other prisoners.

Joseph was trusted with running the day to day affairs of the ward.

So when these two high ranking men arrive, Joseph is not simply thrown into a cell beside them.

He is formally assigned as their personal attendant within the prison's own structure.

Ancient prisons often relied on trusted inmates to help manage daily affairs.

Joseph had already earned that role.

🤝 Joseph was already functioning as a trusted prison administrator

📖 This built directly on the trust described at the end of chapter 39

➡️ Joseph's response to this new duty

---

## 🍽️ He Served Them

Joseph has lost his freedom, his family, and his name.

Even so, he takes up this assignment the same way he has taken up every assignment before it.

He serves faithfully. He does not serve with resentment.

🍽️ Joseph's character doesn't shift with his circumstances

➡️ Time passes before anything happens

---

## ⏳ They Continued A Season In Ward

**"A season"** is a general Hebrew way of marking an unspecified stretch of time.

It is long enough for a real relationship of trust to form.

That trust develops between Joseph and these two officials before the events of this chapter begin.

⏳ "A season" marks an unspecified but meaningful stretch of time

🤝 This is long enough for real trust to develop

➡️ Both men dream on the same night

# Genesis 40:5–8

# 💭 Two Troubling Dreams

---

## 🌙 They Dreamed A Dream Both Of Them, Each Man His Dream In One Night

Two separate dreams happen on the same night.

Each dream carries its own distinct meaning for the man who dreamed it.

In the ancient world, timing like this was often read as significant.

Dreams were not dismissed as random static from the mind.

They were treated as possible messages worth taking seriously.

🌙 Two distinct dreams occur on the very same night

📖 Ancient cultures generally treated dreams as meaningful, not random

➡️ Joseph notices something the next morning

---

## 😟 Joseph Came In Unto Them In The Morning, And They Were Sad

As their appointed attendant, Joseph could have simply done his duties and moved on.

Instead, he actually looks at them.

He notices their mood.

It is a small detail, but it says a great deal about his character.

😟 Joseph pays close attention to the men in his care

➡️ He asks them directly instead of guessing

---

## 🗣️ Wherefore Look Ye So Sadly To Day?

**"Wherefore"** is simply an old word for "why."

Joseph does not assume he already knows what is wrong.

He asks.

🗣️ Wherefore is an old word meaning "why"

➡️ Their answer reveals a specific problem

---

## 🔮 We Have Dreamed A Dream, And There Is No Interpreter Of It

This detail only makes sense against the backdrop of Egyptian religious culture.

Egypt had a well documented class of professional dream interpreters.

They were often priests or trained specialists.

They used established methods and reference texts to explain dreams.

Dreams were widely believed to be a channel through which the gods communicated with people.

For men accustomed to Pharaoh's court, being cut off from that professional class in prison would have felt like being cut off from any way to understand what might be a genuinely important message.

This detail also quietly sets up chapter 41.

There, Pharaoh's own trained magicians will fail completely to interpret his dreams.

Joseph, an imprisoned foreign slave with no formal training at all, succeeds instead.

🔮 Egypt had professional dream interpreters tied to its religion

🚫 The butler and baker have no access to that system in prison

📖 This foreshadows Egypt's own experts failing in chapter 41

➡️ Joseph's answer redirects everything

---

## 🙏 Do Not Interpretations Belong To God?

This is the turning point of the whole chapter.

Joseph does not claim to be a substitute for Egypt's professional interpreters.

He does not position himself as having personal mystical power at all.

Instead, he says plainly that true interpretation is not a human skill that can be trained into someone.

It belongs to God alone.

Whatever Joseph is about to say, he wants both men to understand where it actually comes from first.

🙏 Joseph refuses to claim personal mystical power

📖 He identifies God, not himself, as the true source

➡️ Joseph invites them to share their dreams

---

## 🤲 Tell Me Them, I Pray You

A humble, simple invitation.

It is not a promise of results.

It is only a willingness to listen and trust God with whatever comes next.

🤲 Joseph offers to listen, not a guarantee of good news

➡️ The butler shares his dream first

# Genesis 40:9–15

# 🍇 The Butler's Dream Interpreted

---

## 🍇 In My Dream, Behold, A Vine Was Before Me

It is worth noticing that the dream's imagery fits the dreamer's actual profession.

A man who works with wine every day dreams about a vine.

Ancient dream interpretation commonly assumed that dreams spoke in images drawn from a person's own life and work.

🍇 The vine directly reflects the butler's real occupation

➡️ The vine grows unusually fast

---

## 🌱 Three Branches...Budded...Blossoms...Ripe Grapes

In the dream, an entire growing season happens almost instantly.

Budding, blossoming, and ripening all occur together.

This compression of time is itself part of the message.

Whatever this dream points to is going to happen very soon. It is not months or years away.

Counting specific objects as stand ins for units of time was a recognizable pattern in ancient dream interpretation.

Branches here. Baskets later in this same chapter. Even cows and ears of grain later in Pharaoh's own dreams.

The language God uses here would have felt familiar in its form, even though the specific meaning could only come from Him.

🌱 An entire growing season is compressed into an instant

⏳ The speed itself signals how soon this will happen

📖 Using counted objects as time symbols was a familiar interpretive pattern

➡️ The butler completes his task in the dream

---

## 🍷 I Pressed Them Into Pharaoh's Cup, And Gave The Cup Into Pharaoh's Hand

The dream shows the butler doing his actual job successfully.

He serves Pharaoh's cup with his own hands, exactly as his role required.

🍷 The dream depicts him succeeding at his real duty

➡️ Joseph begins to explain what it means

---

## 🔢 This Is The Interpretation Of It: The Three Branches Are Three Days

Joseph assigns a precise, testable meaning.

This is not a vague spiritual impression.

It is a specific number tied to a specific unit of time.

This precision matters. It means Joseph's interpretation can be checked against reality within days.

🔢 Joseph gives a specific, verifiable meaning

📖 This precision is what makes the interpretation testable

➡️ Joseph reveals what those three days hold

---

## 👑 Within Three Days Shall Pharaoh Lift Up Thine Head, And Restore Thee Unto Thy Place

The phrase **"lift up thine head"** is a Hebrew idiom.

It means restoring someone's honor and status.

It is the opposite of hanging one's head in shame or disgrace.

It pictures Pharaoh publicly recognizing the butler again and reinstating him fully.

👑 "Lift up thine head" is an idiom for restoring honor and status

✅ The butler will be fully reinstated, not just released

➡️ Joseph makes his one personal request

---

## 💭 But Think On Me When It Shall Be Well With Thee

Joseph has endured betrayal, slavery, and false imprisonment without a single recorded complaint.

Now, finally, quietly, he asks for help.

It is the most personally vulnerable moment in his story so far.

💭 This is Joseph's only recorded request for personal help

❤️ It reveals real vulnerability beneath his steady exterior

➡️ Joseph explains exactly what kind of help he means

---

## 🙏 Make Mention Of Me Unto Pharaoh, And Bring Me Out Of This House

Joseph is asking the butler to use his restored access to the king.

That access is something Joseph himself has no way of reaching on his own.

He is asking the butler to advocate for his release.

🙏 Joseph is asking for access he has no other way to reach

🚪 The butler's restoration is Joseph's one hope of release

➡️ Joseph explains why he doesn't belong there

---

## 🇮🇱 For Indeed I Was Stolen Away Out Of The Land Of The Hebrews

The term **"Hebrew"** was typically the label outsiders used for Israelites.

It was more of an outsider's term than a name Israel's own family used internally for themselves.

Joseph identifies himself this way because he is speaking to an Egyptian official.

He uses the term that official would already recognize.

In one short sentence, Joseph summarizes his entire tragic history.

He was kidnapped and sold by his own family.

He says it without bitterness. He says it without a long explanation.

🇮🇱 "Hebrew" was the term outsiders used for Israel's people

📖 Joseph summarizes years of suffering in a single honest sentence

➡️ Joseph defends his innocence in Egypt too

---

## ⚖️ Here Also Have I Done Nothing That They Should Put Me Into A Prison

Joseph maintains his innocence regarding Potiphar's household as well.

He does not name Potiphar's wife.

He does not revisit the details of what happened.

He states the fact plainly and moves on.

⚖️ Joseph asserts his innocence without naming his accuser

📖 He shows restraint even while explaining his own suffering

➡️ The baker feels encouraged by what he's just heard

# Genesis 40:16–19

# 🍞 The Baker's Dream Interpreted

---

## 😊 When The Chief Baker Saw That The Interpretation Was Good

The baker hears good news for his colleague.

He assumes his own dream must be good news too.

It is an understandable leap. It is also a mistaken one.

One dream's meaning has no bearing on another's.

😊 The baker wrongly assumes his own news will also be good

➡️ He describes his dream

---

## 🧺 I Had Three White Baskets On My Head

Carrying goods balanced on the head, especially in stacked baskets, was a well documented practice among Egyptian bakers.

Ancient Egyptian artwork confirms exactly this kind of carrying method.

The dream's imagery, once again, fits the dreamer's real occupation.

🧺 Carrying baskets on the head matches real Egyptian baking practice

➡️ Something goes wrong in the dream

---

## 🐦 The Birds Did Eat Them Out Of The Basket Upon My Head

The butler actively and successfully completed his task in his own dream.

The baker is passive here instead.

He does nothing while birds simply take what was his to protect.

Even before any interpretation is given, this detail already carries a different, more troubling weight than the butler's dream.

🐦 The baker is powerless in his own dream, unlike the butler

⚠️ This detail already feels different in tone before it's explained

➡️ Joseph uses the same pattern to interpret it

---

## 🔢 This Is The Interpretation Thereof: The Three Baskets Are Three Days

The same three equals three days pattern applies here as it did for the butler.

Joseph does not shape his answer to soften the news.

He does not try to protect himself from delivering it.

He tells the baker the truth exactly as God has shown it to him.

🔢 The same time symbol pattern is used again

📖 Joseph delivers the truth without softening it

➡️ Joseph reveals the devastating meaning

---

## 💀 Pharaoh Shall Lift Up Thy Head From Off Thee

This is a deliberate variation on the phrase used for the butler.

"Lift up thine head" alone meant honor and restoration.

Here, the added words **"from off thee"** turn the same image inside out.

Instead of the man's head being lifted in honor, his head will be lifted away from him entirely.

The same picture, reused with one small addition, produces the opposite meaning.

This kind of wordplay is a real feature of the original language. It is not something added by translators.

💀 The phrase is a deliberate variation of the butler's, not identical

🔀 One small addition reverses the entire meaning of the image

📖 This wordplay exists in the original language itself

➡️ The method of death is spelled out plainly

---

## 🌳 Shall Hang Thee On A Tree; And The Birds Shall Eat Thy Flesh

To an Egyptian audience, this would have carried a weight beyond the physical fear of death.

Egyptian religion placed enormous importance on proper burial and preservation of the body.

Egyptians widely practiced mummification specifically because they believed the body's condition mattered for the afterlife.

Being hung up publicly and left exposed to birds meant total denial of a proper burial.

In Egyptian belief, that fate threatened a person beyond death itself, not just in the present life.

This is part of why the sentence is so severe. It strikes at what Egyptian culture feared most.

🌳 Proper burial mattered enormously in Egyptian religious belief

⚰️ Being left exposed denied any hope of that proper burial

📖 This made the sentence far more severe than death alone

➡️ Three days later, both fates play out exactly as Joseph said

# Genesis 40:20–23

# 🎂 Pharaoh's Birthday Feast Fulfills Both Dreams

---

## 🎂 The Third Day, Which Was Pharaoh's Birthday

This is one of very few birthday celebrations mentioned anywhere in the Old Testament.

It is worth noticing that it belongs to a pagan Egyptian king.

It does not belong to God's covenant family.

Scripture does not present the Hebrews marking birthdays this way.

It is a small but real detail of Egyptian royal culture.

It also explains why Pharaoh would be publicly reviewing his officials' fates on this particular day.

Birthday feasts were a customary occasion for a king to display his authority in front of his entire court.

🎂 Birthday celebrations were rare in Scripture and tied to Egyptian, not Hebrew, custom

👑 It gives Pharaoh a public occasion to display his authority

➡️ Both men are brought before him

---

## 👑 He Lifted Up The Head Of The Chief Butler And Of The Chief Baker Among His Servants

The narrator deliberately uses the same phrase for both men.

Only afterward does the text reveal that it means two completely different things for each of them.

This is a literary echo of the wordplay Joseph used back in his interpretations.

👑 The same phrase covers both men before their outcomes diverge

📖 This echoes the same wordplay from Joseph's interpretations

➡️ The butler's outcome comes first

---

## 🍷 He Restored The Chief Butler Unto His Butlership Again

Exactly as Joseph said.

The butler receives full restoration to his former rank and responsibility.

It is not merely release from custody.

🍷 The butler receives full reinstatement, not just freedom

✅ This matches Joseph's interpretation precisely

➡️ The baker's outcome follows

---

## 🌳 He Hanged The Chief Baker: As Joseph Had Interpreted To Them

Moses is careful to state that both outcomes matched Joseph's words exactly.

This is not framed as a lucky guess.

It is presented as proof that what Joseph spoke truly did come from God, just as he said back in verse 8.

🌳 Both outcomes matched Joseph's interpretation exactly

✅ This confirms Joseph's gift genuinely came from God

➡️ One final, quiet detail closes the chapter

---

## 😔 Yet Did Not The Chief Butler Remember Joseph, But Forgat Him

Despite Joseph's plea. Despite everything Joseph did for him.

The butler is now fully restored to a position where helping Joseph would have cost him almost nothing.

Even so, he simply forgets.

This quiet, disappointing ending is what stretches Joseph's imprisonment for two more full years.

It lasts until circumstances finally force the butler to remember him at the start of chapter 41.

😔 The butler forgets Joseph despite his easy ability to help

⏳ This forgetfulness costs Joseph two more years in prison

🙏 God's plan for Joseph does not depend on a man's memory`;

export const GENESIS_FORTY_PERSONAL_SECTIONS = parseGenesisFortyRawNotes(GENESIS_FORTY_RAW_NOTES);
