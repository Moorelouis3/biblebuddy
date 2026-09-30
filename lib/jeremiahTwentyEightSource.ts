export type JeremiahTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwentyEightRawNotes(rawText: string): JeremiahTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 28:${startVerse}` : `Jeremiah 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Jeremiah 28 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWENTY_EIGHT_RAW_NOTES = `# Jeremiah 28:1-4
# 😤 A Rival Prophet Stands Up
---
## 👑 In The Fourth Year Of Zedekiah

Zedekiah was not the king already taken to Babylon.

He became king only after that captivity happened.

Babylon still controlled Judah through him the whole time.

This chapter happens about four years into his reign.

👑 Zedekiah ruled after Jeconiah's exile

⛓️ Babylon controlled Judah through him

📆 The fourth year lands around 594 BC

📖 His throne always depended on Babylon

## 🗣️ Hananiah The Son Of Azur, Which Was Of Gibeon

Hananiah was a real, working prophet, not an outsider pretending to speak for God.

Gibeon was a town a few miles northwest of Jerusalem, inside Benjamin's territory.

Naming his hometown makes him sound like a known, local figure.

Nothing about his introduction warns the reader he is wrong.

That is exactly what makes a false prophet dangerous.

🗣️ Hananiah was a working prophet

🗺️ Gibeon sat near Jerusalem

🙂 Nothing marks him as suspicious

📖 A false prophet can look ordinary

## 🏛️ In The House Of The LORD

The house of the LORD was the temple in Jerusalem.

Its courtyard was a public space, not a private office.

Prophets often delivered messages there because priests and crowds already gathered daily.

Hananiah chose the busiest possible stage for this challenge.

A public claim demanded a public answer.

🏛️ House of the LORD means the temple

👥 Its courtyard drew daily crowds

🎤 Hananiah picked a public stage

📖 A public claim needs a public reply

## 🪵 I Have Broken The Yoke Of The King Of Babylon

"Yoke" means a wooden crossbar tied across an animal's neck to force it to work.

Jeremiah had worn one in public through all of chapter twenty seven.

That yoke stood for Judah's forced submission to Babylon.

Hananiah now announces God has already snapped it.

He is not offering a personal opinion.

He is claiming this came directly from God.

🪵 Yoke means a wooden crossbar

🎭 Jeremiah wore one in chapter 27

⛓️ It stood for submission to Babylon

📖 Hananiah claims God broke it

## ⏳ Within Two Full Years

Hananiah does not speak in vague hope.

He gives an exact deadline, two full years.

A specific deadline can be checked later against what actually happens.

That makes his claim risky, not safe.

A prophet who names a date cannot hide behind vague comfort forever.

⏳ Two full years is a real deadline

🎯 Specific claims can be checked

⚠️ Vague comfort would have been safer

📖 A named date makes proof possible

## 🏺 The Vessels Of The LORD's House

These vessels were the gold and silver items used in temple worship.

Nebuchadnezzar had already carried a group of them to Babylon in an earlier invasion.

Their loss was a visible, painful symbol of Judah's defeat.

Promising their quick return was an easy way to sound hopeful.

It told a hurting people exactly what they wanted to hear.

🏺 Vessels means the temple's gold items

📦 Babylon already carried some away

💔 Their loss symbolized real defeat

➡️ Hananiah's promise sounded comforting

## 👑 Jeconiah The Son Of Jehoiakim

Jeconiah is another name for Jehoiachin, the king taken captive in 597 BC.

He was Zedekiah's nephew, not his brother.

His exile is the very event that put Zedekiah on the throne.

Hananiah promises this exiled king will come home soon.

That promise would undo the very reason Zedekiah was ruling at all.

👑 Jeconiah is also called Jehoiachin

👨‍👦 He was Zedekiah's nephew

⛓️ His exile placed Zedekiah on the throne

📖 Hananiah promises to undo that exile

# Jeremiah 28:5-9
# 🤔 Jeremiah's Careful Answer
---
## 👥 In The Presence Of The Priests, And In The Presence Of All The People

Jeremiah answers in the exact same public setting Hananiah chose.

He does not pull him aside for a quiet, private correction.

The same crowd that heard the false promise now hears the reply.

A public claim about God deserves a public test.

Not a private argument.

👥 Jeremiah answers before the same crowd

🎤 He does not correct him privately

⚖️ The same witnesses hear both sides

📖 Public claims deserve public testing

## 🙏 Amen: The LORD Do So

This is not sarcasm.

"Amen" here means Jeremiah genuinely wishes it were true.

He loves his people and wants the exile to end as much as anyone.

Wanting something to be true is not the same as believing God said it.

Jeremiah separates his hope from his discernment.

🙏 Amen here means a sincere wish

❤️ Jeremiah wants the exile to end

🧠 Wishing something is not believing it

📖 Hope and discernment are not the same

## 🙌 The LORD Perform Thy Words Which Thou Hast Prophesied

Jeremiah even prays for Hananiah's words to come true.

He still has not said whether he believes they will.

A true prophet can hope for good news without confirming a false one.

Kindness toward a rival does not require agreeing with him.

🙌 Jeremiah prays for a good outcome

🤝 He is kind without agreeing

🚫 Hope is not confirmation

➡️ Kindness and correction can coexist

## 🔄 Hear Thou Now This Word

This short phrase signals a turn in the conversation.

Jeremiah's tone is about to shift from wishing to warning.

He asks for full attention before he explains his doubt.

The real answer is about to begin.

🔄 This phrase marks a turn

🗣️ Jeremiah shifts toward a warning

👂 He asks for full attention

➡️ The real answer is coming next

## 📜 The Prophets That Have Been Before Me And Before Thee Of Old

Jeremiah points to a long line of earlier prophets.

Figures like Isaiah, Amos, and Micah all warned Judah before this moment.

Their messages set the pattern Jeremiah is about to explain.

This is not just Jeremiah's opinion.

History itself backs him up.

📜 Jeremiah names earlier prophets

🗣️ Isaiah, Amos, and Micah warned before him

📚 Their pattern matters here

📖 History backs Jeremiah's point

## ⚔️ Of War, And Of Evil, And Of Pestilence

Israel's true prophets almost always warned of judgment, not comfort.

"Pestilence" means widespread disease, often following war and famine.

Warning of disaster was the normal, expected message.

A message promising quick relief was the unusual one.

Hananiah's peaceful promise broke that pattern.

It did not continue it.

⚔️ True prophets usually warned of judgment

🦠 Pestilence means widespread disease

📉 Warning of disaster was the norm

📖 A peaceful promise broke that pattern

## ☮️ The Prophet Which Prophesieth Of Peace

This does not mean peace prophecies are automatically false.

It means they cannot be trusted on the spot, the way a warning can.

A warning can be believed right away because judgment fits what had already happened.

A promise of peace has to wait and prove itself.

Good news carries a heavier burden of proof, not a lighter one.

☮️ Peace prophecies are not automatically false

⏳ They must wait to be proven

⚖️ Warnings were easier to trust quickly

📖 Good news needs more proof

## ⏰ Then Shall The Prophet Be Known, That The LORD Hath Truly Sent Him

Jeremiah hands the whole argument over to time.

He does not demand Hananiah be silenced right now.

He simply says wait and watch what actually happens.

The truth of this whole chapter will be settled by an outcome.

Not a debate.

⏰ Jeremiah leaves the verdict to time

🤫 He does not demand silence

👀 Watching the outcome will settle it

📖 Time itself will name the true prophet

# Jeremiah 28:10-11
# 🪵 The Yoke Is Broken
---
## 🎭 Took The Yoke From Off The Prophet Jeremiah's Neck, And Brake It

Prophets sometimes acted out a message instead of only speaking it.

Jeremiah had worn the wooden yoke as his own sign since chapter twenty seven.

Hananiah now stages a counter sign in front of the same crowd.

He does not just disagree with words.

He destroys the symbol itself.

🎭 Prophets sometimes acted out a message

🪵 Jeremiah wore the yoke since chapter 27

🔨 Hananiah stages a counter sign

📖 He destroys the symbol itself

## 🔁 Even So Will I Break The Yoke Of Nebuchadnezzar

Hananiah repeats his claim from earlier in the chapter.

This time he has a visible, broken piece of wood to point to.

A prop can make a claim feel more convincing.

It changes nothing about whether the claim is true.

🔁 Hananiah repeats his earlier claim

🪵 A broken yoke is now his prop

🎭 Drama can feel convincing

📖 A prop is not proof

## 🎯 Within The Space Of Two Full Years

This is the same two year deadline from verse three.

Hananiah doubles down on it instead of backing away.

He is staking his whole reputation on a date that can be checked.

The test Jeremiah described in verse nine is now fully in motion.

🔁 Same two year deadline as before

🎯 Hananiah doubles down on it

⏳ A checkable date is now set

📖 The test from verse nine begins

## 🚶 The Prophet Jeremiah Went His Way

This does not mean Jeremiah gave up or agreed.

He simply leaves without arguing further in that moment.

God's actual answer comes to him later, in private.

Sometimes the wisest response is silence until God actually speaks.

🚶 Jeremiah leaves without arguing

🤫 He does not concede anything

🕊️ God's answer comes to him later

➡️ Silence can outlast a loud claim

# Jeremiah 28:12-17
# ⚖️ God's Verdict On Hananiah
---
## ⏳ The Word Of The LORD Came Unto Jeremiah

This happens after Hananiah has already walked away with the crowd's attention.

Jeremiah did not have an instant comeback in the moment.

God's real answer arrives later, on God's own timing.

The best reply was worth waiting for.

⏳ God's word comes after the crowd leaves

🤐 Jeremiah had no instant comeback

🕊️ The real answer waits on God

📖 A true word is worth waiting for

## 🪵 Thou Hast Broken The Yokes Of Wood

God does not dispute what Hananiah actually did.

The wooden yoke really is broken.

That part is true.

The lie was never about the wood.

The lie was about what breaking it actually meant.

🪵 God confirms the wood really broke

✅ That physical fact is not disputed

🚫 The lie was not about the wood

📖 The lie was about its meaning

## ⛓️ Thou Shalt Make For Them Yokes Of Iron

Breaking a wooden symbol did not remove the real submission underneath it.

God answers the broken prop with a harder, heavier one.

Iron does not snap the way wood does.

Hananiah's stunt made Judah's coming captivity worse, not better.

⛓️ Wood gives way to iron

💪 Iron does not break like wood

📈 The real burden only grew heavier

📖 A stunt cannot cancel reality

## 🦁 I Have Given Him The Beasts Of The Field Also

This same phrase already described Nebuchadnezzar's authority back in chapter twenty seven.

It means his rule reached even the wild animals, not just nations.

Repeating it here shows nothing about that authority has changed.

Hananiah's stunt could not shrink a rule God himself had granted.

🦁 Beasts of the field means wild animals

👑 Nebuchadnezzar's rule reached that far

🔁 This repeats the claim from chapter 27

📖 Hananiah could not shrink God's grant

## ❌ The LORD Hath Not Sent Thee

This is the direct charge underneath everything else in the chapter.

Hananiah spoke using God's name and God's formulas correctly.

Using the right words does not mean the message actually came from God.

A message can sound godly and still be false.

❌ The LORD did not send Hananiah

🗣️ He used the right religious words

🎭 Correct words do not guarantee truth

📖 Sounding godly is not being sent

## 💔 Thou Makest This People To Trust In A Lie

False comfort is not harmless.

It convinced people to relax exactly when they needed to prepare.

A lie that feels good can do more damage than an honest warning.

That is why this mattered so much.

💔 False comfort is not harmless

😴 It convinced people to stop preparing

⚠️ A pleasant lie can cause real damage

📖 That is why this mattered so much

## ☠️ I Will Cast Thee From Off The Face Of The Earth

This is blunt, plain language for death.

Hananiah promised Judah's captives would come home.

Instead, he is the one who will not remain on the earth.

His own fate becomes the opposite of the promise he made.

☠️ Cast from the earth means death

🔄 Hananiah promised others would return

⚖️ His own fate reverses his promise

📖 The false prophet faces the harder outcome

## 📆 This Year Thou Shalt Die

God gives Hananiah the same kind of specific deadline Hananiah gave everyone else.

A testable claim about someone else's future now becomes testable about his own.

There is no room here to reinterpret the timing later.

The very tool Hananiah used to sound convincing is now used against him.

📆 A specific deadline is set for him

🔁 The same tactic now targets him

🔍 There is no room to reinterpret it

📖 His own method becomes the test

## 🚫 Thou Hast Taught Rebellion Against The LORD

This was never just an honest mistake.

Chapter twenty seven already recorded God's actual command, submit to Babylon for now.

Hananiah's message directly encouraged the opposite of that command.

Teaching people to resist what God had clearly said counts as rebellion.

Not confusion.

🚫 This was not an honest mistake

📜 Chapter 27 already gave God's real command

🔄 Hananiah urged the opposite

📖 Opposing God's word counts as rebellion

## 📆 Hananiah The Prophet Died The Same Year In The Seventh Month

Verse one placed this whole confrontation in the fifth month.

Hananiah dies only two months later, in the seventh month.

The exact test Jeremiah described back in verse nine plays out in real time.

Watching and waiting was never a weak response.

It was the only response that could actually prove who God had sent.

📆 This scene began in the fifth month

⏱️ Hananiah died just two months later

🔍 Verse nine's test plays out for real

📖 Waiting proved who God truly sent
`.trim();

export const JEREMIAH_TWENTY_EIGHT_PERSONAL_SECTIONS = parseJeremiahTwentyEightRawNotes(JEREMIAH_TWENTY_EIGHT_RAW_NOTES);
