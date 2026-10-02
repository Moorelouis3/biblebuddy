export type EzekielTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwelveRawNotes(rawText: string): EzekielTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 12:${startVerse}` : `Ezekiel 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 12 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWELVE_RAW_NOTES = `# Ezekiel 12:1-7
# 🎒 A Sign Acted Out In Their Sight
---
## 🏠 Thou Dwellest In The Midst Of A Rebellious House

Rebellious here means stubborn, not just occasionally disobedient.

The people can see and hear just fine.

Their real problem is refusal, not lack of information.

Chapter two already used this same description for Ezekiel's own calling.

🏠 Rebellious means stubborn resistance

👂 Nothing is wrong with their ears

🚫 Refusal is the real problem

📖 Chapter two named this flaw already

## 👀 Which Have Eyes To See, And See Not

This is not a comment on physical eyesight.

It describes a willful refusal to understand what God keeps showing them.

Jesus later uses this same picture for hardened hearts in the Gospels.

Having the ability to understand is not the same as choosing to.

👀 Not physical blindness here

🧠 A willful refusal to understand

📜 Jesus later uses this picture too

📖 Ability is not the same as choice

## 🎒 Prepare Thee Stuff For Removing

"Stuff" means baggage packed for a journey, not clutter.

It is the exact bundle someone grabs before fleeing.

God tells Ezekiel to pack an actual bag.

This becomes a physical sign, not only spoken words.

🎒 Stuff means packed baggage

🏃 What someone grabs before fleeing

✋ Ezekiel packs a real bag

📖 A physical sign, not just words

## ☀️ Remove By Day In Their Sight

God insists this happens in broad daylight.

A private symbolic act would have taught nobody anything.

The exiles needed to see it with their own eyes.

This public act becomes Ezekiel's sermon for the day.

☀️ By day means broad daylight

👥 Everyone needed to watch it

🎭 This act became his sermon

📖 A public sign teaches more

## 🚪 It May Be They Will Consider, Though They Be A Rebellious House

God leaves the door open even while naming their stubbornness.

"Consider" means stopping to actually think it through, not just notice.

Even a hardened people still get a real chance to respond.

Judgment here has not yet become unavoidable.

🚪 God still leaves room to respond

🧠 Consider means stopping to think

💔 Even stubborn people get a chance

📖 Judgment is not yet unavoidable

## 🚶 As They That Go Forth Into Captivity

Ezekiel is told to act exactly like someone being marched into exile.

This is a specific picture, not vague theater.

Everyone watching had already seen real deportations happen before.

The performance would have looked painfully familiar to them.

🚶 Ezekiel mimics a real deportation

👁️ This sight was already familiar

😟 The performance looked painfully real

📖 A rehearsal of what is coming

## 🧱 Dig Thou Through The Wall

Mud brick walls in this period could actually be broken through by hand.

Digging out instead of leaving by the door suggests a desperate secret escape.

This small detail returns later in the story.

A king will try exactly this when the real siege comes.

🧱 Mud brick walls could be dug

🕳️ Digging out suggests a secret escape

🔮 This detail returns again later

📖 A small detail with a future echo

## 🙈 Cover Thy Face, That Thou See Not The Ground

Covering his own eyes forces Ezekiel to move through the dark half blind.

This detail quietly points forward to Jerusalem's king losing his sight during his own escape.

Second Kings records exactly that detail happening when Jerusalem finally fell.

A strange sign here becomes literal history later.

🙈 Ezekiel moves through the dark blind

👑 This points to a king's own fate

📜 Second Kings records it literally

📖 A sign that becomes real history

## 🎭 I Have Set Thee For A Sign Unto The House Of Israel

A sign here means a living illustration, not a magic omen.

Ezekiel's own body and actions carry the message, not only his words.

The chapter already said these people refuse to listen to words alone.

God chooses to speak through something they cannot easily ignore.

🎭 A sign means a living illustration

🧍 Ezekiel's body carries the message

🙉 Words alone were not working

📖 God speaks in a way hard to ignore

# Ezekiel 12:8-11
# 📣 I Am Your Sign
---
## ❓ What Doest Thou?

The people notice the strange performance and ask about it.

Their curiosity is actually the whole point of acting it out in public.

God now gives Ezekiel the explanation to go with the sign.

A sign without an explanation would stay only a confusing spectacle.

❓ The people noticed and asked

🎯 Curiosity was the point of the act

🗣️ God now gives the explanation

📖 A sign still needs words to land

## ⚖️ This Burden Concerneth The Prince In Jerusalem

A "burden" in prophetic language means a heavy message of coming judgment.

The prince named here is Zedekiah, the king still ruling in Jerusalem.

Ezekiel calls him prince, not king, on purpose.

Many still viewed the exiled King Jehoiachin as the rightful ruler.

This word choice alone signals how God views his authority.

⚖️ Burden means a heavy judgment message

👑 The prince is King Zedekiah

🏷️ Prince, not king, is deliberate

📖 Word choice signals God's view

## 🎭 I Am Your Sign

Ezekiel repeats the exact word already used back in verse six.

This confirms the strange act was always aimed at Zedekiah and Jerusalem.

The sign was never a vague illustration for exiles in general.

It targets one particular ruler and his particular fate.

🎭 Sign repeats the word from verse six

👑 This targets Zedekiah specifically

🎯 Not a vague illustration for everyone

📖 One sign, one specific fate

## 🚶 They Shall Remove And Go Into Captivity

This plainly states what the acted out sign actually meant.

Jerusalem's remaining leadership would soon be marched off exactly like Ezekiel pretended to be.

The sign and its explanation now match perfectly.

Nothing about this message stays in riddle form any longer.

🚶 Jerusalem's leaders will be exiled

🎭 This matches Ezekiel's acted sign

🔓 No riddle remains, only plain meaning

📖 The warning is now unmistakable

# Ezekiel 12:12-16
# 🕸️ The Prince Is Caught, The Remnant Scattered
---
## 🙈 He Shall Cover His Face, That He See Not The Ground With His Eyes

Zedekiah repeats Ezekiel's exact actions from verse six, move for move.

Even the strangest detail, covering the face, now attaches to a real historical figure.

A strange acted out sign is about to become literal fact.

👑 Zedekiah repeats Ezekiel's exact actions

🙈 Even covering the face is included

📜 A sign becomes literal fact

📖 The acted sign names its real target

## 🕸️ My Net Also Will I Spread Upon Him, And He Shall Be Taken In My Snare

A net and a snare were both common tools for trapping animals.

God describes Zedekiah's capture the same way a hunter would describe trapping prey.

Babylon's army does not act alone here.

God names himself as the one truly closing the trap.

🕸️ Net and snare are hunting tools

🏹 This pictures Zedekiah as caught prey

⚔️ Babylon's army does not act alone

📖 God names himself the true hunter

## 👁️ Yet Shall He Not See It, Though He Shall Die There

This line sounds like a contradiction at first.

How can someone be brought somewhere but never actually see it.

Second Kings later explains this plainly.

Zedekiah's eyes were put out before he ever reached Babylon.

A sign Ezekiel acted out years earlier becomes exact fulfilled history.

❓ This verse first sounds like a riddle

👁️ Zedekiah is later blinded before arriving

📜 Second Kings confirms the exact detail

📖 Prophecy and history match precisely

## 🌬️ I Will Scatter Toward Every Wind All That Are About Him

This widens the judgment past Zedekiah himself to his whole inner circle.

"Every wind" means being driven off in every possible direction.

Nobody close to the king escapes the coming collapse untouched.

🌬️ Every wind means every direction

👥 This includes the king's whole circle

🚫 Nobody near him escapes untouched

📖 Judgment widens past one man

## 🔁 They Shall Know That I Am The LORD

This exact phrase repeats constantly throughout the whole book of Ezekiel.

Judgment here is never only about punishment for its own sake.

The stated goal is recognition, that scattered people would finally know who God really is.

Even disaster still points back toward a relationship, not only a consequence.

🔁 This phrase repeats throughout Ezekiel

🎯 Recognition is the real goal

💔 Even judgment aims at relationship

📖 Disaster still points back to God

## ⚔️ I Will Leave A Few Men Of Them From The Sword, From The Famine, And From The Pestilence

Sword, famine, and plague are named together repeatedly across this book.

They describe the three main ways judgment was expected to arrive.

Even inside total devastation, God deliberately leaves a few survivors.

Their survival carries a purpose, not simple luck.

They are meant to carry the true story to the watching nations.

⚔️ Sword, famine, and plague named together

🙌 A few survivors are kept on purpose

📣 Their job is to carry the story

📖 Survival here carries a real purpose

# Ezekiel 12:17-20
# 🍞 Eating Bread With Quaking
---
## 😨 Eat Thy Bread With Quaking, And Drink Thy Water With Trembling

God gives Ezekiel a second acted out sign, this time about fear.

"Quaking" and "trembling" describe genuine physical shaking, not mild worry.

Ezekiel must perform this fear at every single meal.

This sign is lived out, not only explained in words.

🍞 A second sign, this time about fear

😨 Quaking means real physical shaking

🍽️ Performed at every single meal

📖 A sign lived out, not just spoken

## 😧 They Shall Eat Their Bread With Carefulness, And Drink Their Water With Astonishment

This describes conditions expected during a coming siege.

"Carefulness" here means anxious caution, not simple attention.

"Astonishment" means a stunned, shaken state, not mild surprise.

Ordinary meals become filled with dread instead of comfort.

🏚️ This describes siege conditions

😟 Carefulness means anxious caution

😧 Astonishment means being genuinely shaken

📖 Ordinary meals filled with dread

## ⚔️ Because Of The Violence Of All Them That Dwell Therein

This names the real cause behind the coming desolation plainly.

The land suffers because of violence its own people committed.

This judgment is not random disaster striking an innocent population.

⚔️ Violence is named as the cause

🏘️ Their own people caused this

🚫 Not random disaster on the innocent

📖 Consequences trace back to real guilt

## 🏙️ The Cities That Are Inhabited Shall Be Laid Waste

This completes the earlier warning with no ambiguity left.

Full cities, not just the king, face complete destruction.

The chapter closes this section the same way the last one closed.

They will finally know that God is the LORD.

🏙️ Full cities face total destruction

👑 This goes beyond the king alone

🔁 The chapter repeats its closing line

📖 Knowing the LORD ends the warning

# Ezekiel 12:21-25
# ⏳ The Days Are Prolonged
---
## 🗣️ The Days Are Prolonged, And Every Vision Faileth

This is a popular saying the people kept repeating to dismiss every warning.

It claims that every prophet's warning just quietly fails to come true.

Years of unfulfilled sounding threats had made people stop taking them seriously.

🗣️ A popular saying mocking the prophets

⏳ It claims warnings just fade away

😴 Years of delay bred disbelief

📖 A proverb born from repeated delay

## 🛑 I Will Make This Proverb To Cease

God directly answers a popular saying with a flat denial.

"Cease" here means the saying itself stops being usable at all.

Reality is about to prove the proverb completely wrong.

🚫 God flatly denies the saying

🛑 Cease means it stops working

⚡ Reality is about to disprove it

📖 God answers mockery directly

## 🔄 The Days Are At Hand, And The Effect Of Every Vision

This directly reverses the old proverb's claim word for word.

"At hand" means the fulfillment is close, not distant.

"The effect" means the prophecy is about to actually happen, not fail.

🔄 This reverses the old proverb exactly

⏰ At hand means close, not distant

✅ Vision now means fulfillment, not failure

📖 Prophecy is about to prove itself

## 🙅 No More Any Vain Vision Nor Flattering Divination

"Vain vision" means a false, empty claim of revelation from God.

"Flattering divination" means a prediction designed only to please the hearer.

False prophets had been telling people comforting lies for years.

That entire practice is about to be exposed and ended.

🚫 Vain vision means a false claim

🍯 Flattering divination means comforting lies

🗣️ False prophets fed this problem

📖 The whole practice is about to end

## ✅ I Will Speak, And The Word That I Shall Speak Shall Come To Pass

God directly contrasts his own word with the false prophets just named.

"Come to pass" means it will actually happen, not just get spoken.

Unlike human predictions, nothing God declares ever quietly fades away.

🗣️ God contrasts himself with false prophets

✅ Come to pass means real fulfillment

🔒 God's word never quietly fades

📖 His word always lands as spoken

## 📆 In Your Days, O Rebellious House, Will I Say The Word, And Will Perform It

This promises fulfillment within the people's own lifetime, not some distant future.

The exact phrase "rebellious house" returns from the chapter's opening verse.

The same stubborn people who dismissed every warning will personally watch it happen.

📆 Fulfillment comes in their own lifetime

🔁 Rebellious house returns from verse two

👀 They will personally witness it

📖 Stubbornness does not delay the outcome

# Ezekiel 12:26-28
# ⏱️ No More Delay
---
## 🔮 The Vision That He Seeth Is For Many Days To Come

This is a second excuse, different from the proverb back in verse twenty two.

Instead of claiming prophecy fails, this one claims it is simply not for right now.

Pushing a warning into the distant future is still a way to ignore it.

🔮 A second excuse, different from before

📅 This claims the warning is not urgent

🙈 Pushing it off still ignores it

📖 Delay and denial are both excuses

## 🤷 He Prophesieth Of The Times That Are Far Off

This excuse admits the prophecy is likely true, just not for anyone alive now.

It lets people nod along with Ezekiel while changing nothing about their lives.

A warning treated as distant stops functioning as a warning at all.

🤷 This admits truth but denies urgency

😌 People nod along and change nothing

⏳ Distant warnings stop working as warnings

📖 Agreement without urgency means nothing

## ⏳ There Shall None Of My Words Be Prolonged Any More

God closes the chapter by answering both excuses at once.

"Prolonged" repeats the same key word used for the proverb back in verse twenty five.

Nothing about God's timing bends to human comfort or convenience.

🔁 This answers both excuses at once

⏳ Prolonged repeats the earlier key word

🚫 God's timing bends to no one

📖 Delay has officially run out

## 🏁 The Word Which I Have Spoken Shall Be Done

This is the chapter's final word against every excuse raised against it.

"Done" means completed in reality, not just announced out loud.

The chapter opened with a sign nobody wanted to watch.

It ends with a promise nobody can argue away.

🏁 The final answer to every excuse

✅ Done means real completion

🎭 Began with a sign, ends with certainty

📖 No excuse outlasts God's own word
`.trim();

export const EZEKIEL_TWELVE_PERSONAL_SECTIONS = parseEzekielTwelveRawNotes(EZEKIEL_TWELVE_RAW_NOTES);
