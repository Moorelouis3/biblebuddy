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

  if (sections.length !== 6) {
    throw new Error("Expected 6 Genesis 40 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_RAW_NOTES = `# Genesis 40:1-4
# 🍷 Joseph Is Given Charge Of Two Prisoners
---
## 🍷 The Butler Of The King Of Egypt

Butler here means much more than a household servant.

He was the king's personal cupbearer.

His job was to taste and serve Pharaoh's wine before anyone else touched it.

That made him the first line of defense against poison.

A king trusted this role to almost no one.

Centuries later, a Hebrew named Nehemiah held this same office for a Persian king.

🍷 Butler means cupbearer, not a general servant
🛡️ His duty guarded against poison
👑 Kings entrusted this role to almost no one
📖 Nehemiah later held this same office

## ⚠️ Had Offended Their Lord

Offended here does not mean a small annoyance.

It means a real, serious breach of trust.

Something happened that put Pharaoh's own safety or authority at risk.

The text never says exactly what either man did.

What matters is how seriously Pharaoh treated it.

⚠️ Offended means a serious breach, not annoyance
🔒 Pharaoh's safety or authority was at risk
❓ The text never says exactly what happened
➡️ Pharaoh's reaction shows how serious it was

## 😠 Pharaoh Was Wroth

Wroth is an old word for burning, intense anger.

It is much stronger than ordinary irritation.

Pharaoh is not mildly annoyed with these two men.

He is furious enough to imprison them both.

😠 Wroth means burning, intense anger
🔥 It is stronger than irritation
⛓️ Pharaoh responds by imprisoning both men
➡️ Two officials now face serious consequences

## 👑 Against The Chief Of The Butlers, And Against The Chief Of The Bakers

Chief means the head of an entire department.

These two men were not ordinary servants.

Each one ran a whole staff inside Pharaoh's household.

One led all the men who handled Pharaoh's drink.

The other led all the men who handled his food.

That rank is exactly why their offense mattered so much.

👑 Chief means head of a department
🍷 One led all of Pharaoh's cupbearers
🍞 The other led all of Pharaoh's bakers
📖 Their high rank made the offense serious

## ⛓️ He Put Them In Ward

Ward is an old legal word.

It means a place of guarded custody.

It is related to the modern words guard and warden.

It describes confinement under watch, not always a harsh dungeon.

⛓️ Ward means guarded custody
🔒 It relates to guard and warden
👀 It describes confinement under watch
➡️ The location itself is worth noticing

## 🏠 The House Of The Captain Of The Guard, The Place Where Joseph Was Bound

This is the very same prison from chapter thirty nine.

It belonged to Potiphar, the official Joseph had served.

Potiphar is also the man whose household falsely accused Joseph.

Now two of Pharaoh's own officials land in that same prison.

That is not a coincidence in this story.

🏠 The same prison as chapter thirty nine
🔁 It belonged to Potiphar, Joseph's former master
🎯 Two officials now share Joseph's prison
📖 God positions Joseph before he even knows it

## 🤝 The Captain Of The Guard Charged Joseph With Them

The prison keeper already trusted Joseph with real responsibility.

Chapter thirty nine ends with Joseph running the ward's daily affairs.

So these two officials are not simply placed near Joseph.

Joseph is formally assigned to attend to them personally.

🔑 Joseph already held real trust in the prison
📖 Chapter thirty nine set this trust in place
🤝 Joseph is assigned to serve these two men
➡️ How Joseph responds says everything about his character

## ⏳ They Continued A Season In Ward

A season is a general way of marking time.

It does not give an exact number of days or months.

It is long enough for real trust to form between them.

That trust matters once both men have their dreams.

⏳ A season means an unspecified stretch of time
🤝 It gave time for real trust to grow
💭 That trust matters later in the chapter
➡️ Both men dream on the very same night

# Genesis 40:5-8
# 💭 Two Troubling Dreams
---
## 🌙 Each Man His Dream In One Night

Two separate dreams happen on the very same night.

That timing was not treated as random in the ancient world.

Dreams were often seen as possible messages worth taking seriously.

🌙 Two distinct dreams happen the same night
👀 Ancient cultures rarely treated that as random
📖 Dreams were often seen as real messages
➡️ Each dream carries its own separate meaning

## 🔀 Each Man According To The Interpretation Of His Dream

This phrase tells the reader something important before the story continues.

The two dreams are not the same dream told twice.

Each one carries its own distinct meaning for the man who dreamed it.

One dream's meaning will not predict the other man's outcome.

🔀 Each dream carries its own meaning
🚫 One dream never predicts the other
🍷 The butler's fate is his alone
📖 Two dreams, two very different endings

## 👀 Joseph Came In Unto Them In The Morning

As their assigned attendant, Joseph could have simply done his duties.

Instead he actually studies their faces.

He notices something is wrong before either man says a word.

That kind of attention says a great deal about his character.

👀 Joseph pays close attention to the men
😟 He notices their sadness immediately
❤️ This reveals real care, not just duty
➡️ He asks them directly instead of guessing

## ❓ Wherefore Look Ye So Sadly To Day

Wherefore is an old word that simply means why.

Joseph does not assume he already knows the answer.

He asks a direct question instead of guessing.

❓ Wherefore is an old word for why
🗣️ Joseph asks instead of assuming
👂 He wants to actually hear their answer
➡️ Their answer reveals a real problem

## 🔮 We Have Dreamed A Dream, And There Is No Interpreter Of It

Egypt had a well known class of professional dream interpreters.

They were often priests trained in fixed methods and reference texts.

Egyptians widely believed dreams were a channel the gods used to speak.

In prison, these two men have no access to that entire system.

That left them stuck with no way to understand something they believed truly mattered.

🔮 Egypt had trained, professional dream interpreters
🙏 Dreams were seen as messages from the gods
🚫 Prison cut them off from that whole system
📖 Their one hope was left unanswered

## 🙏 Do Not Interpretations Belong To God

This is the turning point of the whole chapter.

Joseph does not claim to be Egypt's replacement interpreter.

He does not claim any personal mystical power of his own.

He says plainly that true interpretation belongs to God alone.

That same claim will be proven true again in chapter forty one.

🙏 Joseph refuses to claim personal power
📖 True interpretation belongs to God alone
🔮 Egypt's own experts will fail later
➡️ Joseph now asks to hear the dreams

## 🤲 Tell Me Them, I Pray You

This is a humble, simple invitation.

It is not a promise that the news will be good.

It is only a willingness to listen and trust God with what comes next.

🤲 Joseph offers to listen, not a guarantee
🙏 He trusts God with the outcome
👂 A willing ear starts this whole exchange
➡️ The butler shares his dream first

# Genesis 40:9-13
# 🍇 The Butler's Dream And Its Meaning
---
## 🍇 A Vine Was Before Me

This vine image is not random.

It directly reflects the butler's real job working with Pharaoh's wine.

Ancient dream interpretation commonly assumed dreams spoke through images from a person's own life.

🍇 A vine matches the butler's real job
🍷 He worked with wine every day
📖 Dreams often used images from daily life
➡️ The vine then grows in a strange way

## 🔢 Three Branches

Counting specific objects was a real pattern in ancient dream interpretation.

Numbers like this often stood in for units of time.

This same pattern appears again later in the chapter with baskets.

It appears once more in Pharaoh's own dreams in chapter forty one.

🔢 Counted objects often meant units of time
🧺 Baskets repeat this same pattern later
🐄 Pharaoh's own dreams reuse this pattern
📖 The pattern's meaning still comes only from God

## 🌱 It Budded, And Her Blossoms Shot Forth

In the dream, an entire growing season happens almost instantly.

Budding, blossoming, and ripening all occur together in one moment.

That compressed timing is part of the message itself.

Whatever this dream points to will happen very soon, not months away.

🌱 A full growing season is compressed together
⏳ The speed itself signals how soon
📖 This is not a distant, far off event
➡️ The butler finishes the dream by serving Pharaoh

## 🍷 I Pressed Them Into Pharaoh's Cup

The dream shows the butler succeeding at his actual job.

He serves Pharaoh's cup with his own hands, just as his role required.

Nothing about this image is strange or symbolic on its own.

It is simply the butler doing his normal duty well.

🍷 The dream shows him doing his real job
✅ He succeeds at his normal duty
👋 He serves the cup with his own hands
➡️ Joseph now explains what the dream means

## ✅ The Three Branches Are Three Days

Joseph gives a precise, testable meaning, not a vague feeling.

He ties one specific number to one specific unit of time.

That precision matters because it can be checked against reality within days.

🔢 Joseph gives a specific, checkable meaning
📆 Three branches becomes three exact days
✅ A testable answer, not a vague guess
➡️ Joseph reveals what those three days hold

## 👑 Pharaoh Shall Lift Up Thine Head

Lift up thine head is a Hebrew idiom.

It means restoring someone's honor and status publicly.

It is the opposite of hanging one's head in shame.

👑 Lift up thine head means public honor restored
😔 It is the opposite of shame
🎉 Pharaoh will recognize the butler again
➡️ The exact way he is restored comes next

## 🔁 Restore Thee Unto Thy Place, After The Former Manner

This is not just release from prison.

Joseph promises the butler will get his full job back.

After the former manner means everything returns exactly as it was before.

🔁 The butler gets his full job back
🚫 This is more than a simple release
📖 Everything returns exactly as it was
➡️ Joseph then makes one personal request

# Genesis 40:14-15
# 🙏 Joseph's Plea For Help
---
## 💭 Think On Me When It Shall Be Well With Thee

Joseph has endured betrayal, slavery, and false imprisonment without one recorded complaint.

Now, quietly, he finally asks for help.

This is the most personally vulnerable moment in his story so far.

💭 This is Joseph's only recorded request for help
❤️ It reveals real vulnerability beneath his steady exterior
🙏 He waits until now to finally ask
➡️ He explains exactly what help he needs

## 🤝 Shew Kindness, I Pray Thee, Unto Me

Shew is simply an old spelling of the word show.

Joseph is asking for one specific act of loyalty in return.

He has served the butler faithfully during this whole ordeal.

Now he asks for the same kind of faithfulness back.

📖 Shew is an old spelling of show
🤝 Joseph asks for loyalty in return
⚖️ He served faithfully and now asks the same
➡️ He names the exact favor he needs

## 🚪 Make Mention Of Me Unto Pharaoh, And Bring Me Out Of This House

Joseph is asking the butler to use his restored access to the king.

That access is something Joseph has no way of reaching on his own.

He is asking the butler to speak up for his release.

🚪 Joseph needs access he cannot reach alone
🗣️ He asks the butler to speak for him
👑 Only the butler can reach Pharaoh directly
➡️ Joseph explains why he does not belong there

## 🇮🇱 I Was Stolen Away Out Of The Land Of The Hebrews

Hebrew was typically the label outsiders used for Israel's people.

It was more of an outsider's term than a name the family used for itself.

Joseph uses it here because he is speaking to an Egyptian official.

In one short sentence, he summarizes his entire tragic history.

He was kidnapped and sold by his own family.

He says it without bitterness and without a long explanation.

🇮🇱 Hebrew was the term outsiders used
🗣️ Joseph uses the word his listener knows
📖 One sentence summarizes years of suffering
➡️ Joseph defends his innocence in Egypt too

## ⚖️ Here Also Have I Done Nothing

Joseph maintains his innocence about Potiphar's household too.

He does not name Potiphar's wife.

He does not revisit the details of what happened there.

He states the plain fact and moves on.

⚖️ Joseph states his innocence plainly
🤐 He does not name his accuser
📖 He shows restraint even in his own defense
➡️ The baker feels encouraged by what he hears

# Genesis 40:16-19
# 🍞 The Baker's Dream And Its Dark Meaning
---
## 😊 When The Chief Baker Saw That The Interpretation Was Good

The baker hears good news for his fellow prisoner.

He assumes his own dream must also be good news.

That leap feels natural, but it is a mistake.

One dream's meaning has no bearing on another dream's meaning.

😊 The baker assumes his news will match
🚫 One dream's meaning does not predict another
❌ His assumption turns out to be wrong
➡️ He describes his own dream next

## 🧺 Three White Baskets On My Head

Carrying goods balanced in stacked baskets on the head was a documented Egyptian baking practice.

Ancient Egyptian artwork actually shows exactly this method.

The dream's image, once again, fits the dreamer's real occupation.

🧺 Carrying baskets on the head matches Egyptian custom
🎨 Ancient artwork confirms this exact practice
🍞 The image fits the baker's real job
➡️ Something in the dream goes badly wrong

## 🍞 Bakemeats For Pharaoh

Bakemeats simply means baked goods.

The top basket held food meant specifically for the king's own table.

This detail shows the baker's high standing in Pharaoh's household.

🍞 Bakemeats simply means baked goods
👑 The top basket was meant for Pharaoh himself
🏆 This shows the baker's high standing
➡️ What happens to that basket matters greatly

## 🐦 The Birds Did Eat Them Out Of The Basket

The butler actively succeeded at his task inside his own dream.

The baker is passive here instead.

He does nothing while birds simply take what he was meant to protect.

Even before Joseph explains anything, this detail already feels troubling.

🐦 The baker is powerless in his own dream
⚠️ This detail feels different from the butler's dream
😟 Something has clearly gone wrong
➡️ Joseph uses the same pattern to explain it

## 🔢 The Three Baskets Are Three Days

The same three equals three days pattern applies here as it did for the butler.

Joseph does not shape his words to soften the news.

He tells the baker the truth exactly as God has shown it to him.

🔢 The same time pattern is used again
📖 Joseph does not soften what he says
✅ He speaks the truth exactly as shown
➡️ The actual meaning is far more severe

## 💀 Pharaoh Shall Lift Up Thy Head From Off Thee

This phrase is a deliberate twist on the butler's earlier idiom.

Lift up thine head alone meant honor and restoration.

Adding from off thee turns that same image completely inside out.

Instead of honor, the baker's head will be lifted away from him entirely.

🔀 This twists the butler's own idiom
👑 Alone, the phrase meant honor
💀 Adding from off thee reverses it completely
📖 One small addition changes everything

## 🌳 Shall Hang Thee On A Tree

To an Egyptian, this threat carried weight beyond death itself.

Egyptian religion placed enormous importance on proper burial and preserving the body.

Being left exposed to birds meant losing any hope of that burial.

In Egyptian belief, that fate threatened a person beyond this life.

⚰️ Proper burial mattered deeply in Egyptian belief
🌳 Exposure denied any hope of burial
😨 The threat reached beyond death itself
➡️ Three days later, both fates play out exactly

# Genesis 40:20-23
# 🎂 Pharaoh's Birthday Feast Fulfills Both Dreams
---
## 🎂 The Third Day, Which Was Pharaoh's Birthday

Birthday celebrations are rarely mentioned anywhere in the Old Testament.

This one belongs to a pagan Egyptian king, not to God's covenant family.

Scripture never shows the Hebrews marking birthdays this same way.

This detail also explains why Pharaoh reviews his officials' fates on this exact day.

🎂 Birthdays are rare in the Old Testament
🇪🇬 This custom belonged to Egypt, not Israel
👑 Kings used feasts to display their authority
➡️ Both men are brought before Pharaoh

## 👑 He Lifted Up The Head Of The Chief Butler And Of The Chief Baker

The narrator deliberately uses the same phrase for both men.

Only afterward does the text reveal two completely different meanings.

This is the same wordplay Joseph already used in his interpretations.

👑 The same phrase covers both men at first
🔀 It means two very different things
📖 This echoes Joseph's own wordplay
➡️ The butler's outcome comes first

## 🍷 He Restored The Chief Butler Unto His Butlership Again

This happens exactly as Joseph said it would.

The butler receives full reinstatement to his old rank.

It is not merely release from custody.

🍷 The butler is fully reinstated
✅ This matches Joseph's exact words
🚫 It is more than simple freedom
➡️ The baker's outcome follows right after

## 🤲 He Gave The Cup Into Pharaoh's Hand

This is the literal action from the butler's own dream.

The dream image and the real event now match perfectly.

Nothing about Joseph's interpretation missed a single detail.

🍷 This matches the dream's exact image
🎯 The interpretation proved perfectly accurate
✅ Every detail Joseph gave came true
➡️ The baker's fate matches just as closely

## 🌳 He Hanged The Chief Baker

Moses is careful to state that both outcomes matched Joseph's words exactly.

This is not framed as a lucky guess.

It stands as proof that Joseph's gift truly came from God.

🌳 Both outcomes matched Joseph's words exactly
🎲 This was never a lucky guess
📖 It proves Joseph's gift came from God
➡️ One quiet, disappointing detail closes the chapter

## 😔 Yet Did Not The Chief Butler Remember Joseph

Joseph had asked for one simple favor.

The butler was now free to grant it easily.

Instead, he simply forgets.

This quiet ending stretches Joseph's imprisonment two more full years.

God's plan for Joseph never depended on one man's memory.

😔 The butler forgets, despite an easy chance
⏳ This costs Joseph two more years in prison
🙏 God's plan never depended on his memory
📖 Faithfulness does not always bring quick rewards
`.trim();

export const GENESIS_FORTY_PERSONAL_SECTIONS = parseGenesisFortyRawNotes(GENESIS_FORTY_RAW_NOTES);
