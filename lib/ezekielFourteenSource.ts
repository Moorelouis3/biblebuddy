export type EzekielFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFourteenRawNotes(rawText: string): EzekielFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 14:${startVerse}` : `Ezekiel 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Ezekiel 14 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FOURTEEN_RAW_NOTES = `# Ezekiel 14:1-3
# 👴 Elders Who Carry Hidden Idols
---
## 🪑 Certain Of The Elders Of Israel Sat Before Me

Elders were the respected leaders of each family and town.

People came to them for judgment and for wisdom.

Here the elders instead come to Ezekiel.

Sitting before a prophet was a normal way to seek a word from God.

👴 Elders means respected community leaders
🙏 They came seeking a word from God
🪑 Sitting before Ezekiel showed respect
📖 Even leaders need a true word

## 🧠 Set Up Their Idols In Their Heart

Idols were not only statues standing in a temple.

Here the idol is something hidden inside a person's thinking.

These elders still worshipped the true God in public.

Privately their devotion belonged somewhere else.

🧠 Idols can live inside the mind
🎭 Public worship hid a private loyalty
🤫 The elders kept it hidden
📖 God sees past public appearance

## 🪨 Stumblingblock Of Their Iniquity Before Their Face

A stumblingblock is anything that trips a person into sin.

Setting it before their face means they kept staring at it.

Their sin was not a quick lapse.

It was something they kept returning to look at.

🪨 Stumblingblock means a trap toward sin
👀 Before their face means constant focus
🔁 They returned to it often
📖 Sin can become something we stare at

## ❓ Should I Be Enquired Of At All By Them?

Enquired means consulted for a decision from God.

The question sounds open, but the answer is already no.

A divided heart cannot bring a sincere question.

God will not play along with pretend devotion.

❓ Enquired means formally consulted
🚫 A divided heart cannot ask sincerely
🎭 Pretend devotion still shows through
📖 God answers hearts, not just words

# Ezekiel 14:4-8
# ⚖️ God Answers According To The Idols
---
## 📣 I The LORD Will Answer Him According To The Multitude Of His Idols

God promises a real answer to anyone who comes with hidden idols.

The answer will match the sin, not the pretend sincerity.

A person full of idols will get a response shaped by judgment.

God does not ignore hypocrisy just because someone shows up to ask.

📣 God will answer, but not kindly
⚖️ The answer matches the hidden sin
🙅 Hypocrisy does not go unnoticed
📖 God responds to the real heart

## 💔 Estranged From Me Through Their Idols

Estranged means pulled apart, like two people who were once close.

These people were still inside Israel's camp physically.

Their hearts had already wandered far from God.

Idolatry works quietly before anyone even moves away.

💔 Estranged means pulled apart from someone close
🏕️ They stayed in the camp physically
🧠 Their hearts had already left
📖 Distance in the heart comes first

## 🔄 Repent, And Turn Yourselves From Your Idols

Repent means more than feeling sorry.

It means an actual change of direction.

Turning away from idols required turning back toward God at the same time.

A changed mind without a changed direction is not repentance.

🔄 Repent means a real change of direction
🚶 Turning away means turning back too
🧭 Direction matters more than feelings
📖 True repentance always moves the feet

## 🌍 The Stranger That Sojourneth In Israel

Sojourn means living somewhere as a temporary resident, not a citizen.

Foreigners who settled among Israel still had to answer to this same warning.

God held outsiders to the same standard as His own people.

No one got a quiet exception because of where they were born.

🌍 Sojourn means a temporary resident
👥 Foreigners faced the same warning
⚖️ One standard applied to everyone
📖 Birthplace earned no exception

## 🚩 I Will Set Him For A Sign And A Proverb

A sign points to something true that others need to notice.

A proverb is a saying people repeat for generations.

This person's judgment would become a lasting example for everyone else.

Other people would learn the lesson from watching what happened to him.

🚩 Sign means a visible warning
🗣️ Proverb means a saying repeated often
👀 His judgment became an example
📖 One person's fall warned many others

# Ezekiel 14:9-11
# 🌀 When A Prophet Is Deceived
---
## 🌀 I The LORD Have Deceived That Prophet

This does not mean God tricked an innocent person for no reason.

A false prophet speaking to an already idolatrous crowd gets handed over to his own lie.

God allows the deception as part of the judgment already in motion.

The lie was not the first sin in this scene.

🌀 Deceived means handed over to a lie
⚠️ This followed an already sinful crowd
🔗 The lie was part of the judgment
📖 Sin can open the door to deeper sin

## ⚖️ The Punishment Of The Prophet Shall Be Even As The Punishment Of Him

The false prophet and the one who asked him share the same guilt.

Seeking a lie is not safer than telling one.

Both the asker and the speaker answer for the same sin.

No one gets to hide behind someone else's false word.

⚖️ Both share the same punishment
🙋 Asking for a lie is still guilt
🗣️ The speaker cannot be blamed alone
📖 No one hides behind another's words

## 🧭 That They May Go No More Astray

The goal behind this warning was never destruction for its own sake.

God wanted Israel to stop wandering toward false worship.

Judgment here was meant to correct the whole nation's direction.

A hard warning can still come from a desire to restore someone.

🧭 Astray means wandering off course
🎯 The goal was correction, not ruin
🛤️ Judgment aimed at the whole nation
📖 Hard warnings can still come from love

## 🤝 I May Be Their God

My people and their God was the heart of Israel's whole covenant.

Every warning in this chapter still points back to that relationship.

God was not looking for an excuse to walk away.

He was working to keep the relationship alive.

🤝 My people, their God names the covenant
💞 Every warning still points to this bond
🚶 God was not looking to leave
📖 Judgment served the relationship, not its end

# Ezekiel 14:12-14
# 🌾 The First Of Four Judgments
---
## 🍞 Break The Staff Of The Bread Thereof

Bread was the one food that kept an ordinary household alive.

Calling it a staff pictures something a person leans on for support.

Breaking that staff means removing the support completely, not just making food scarce.

This describes a famine severe enough to end daily survival.

🍞 Staff of bread means food as support
🦯 Breaking it removes all support
🌾 This is a total famine
📖 The picture makes the loss feel real

## 📜 Noah, Daniel, And Job

These three men were widely known for personal righteousness.

Many scholars believe this Daniel is an ancient figure, not the Daniel from the exile.

Each of these men once saved people close to them through faith.

Here the text says they could only save themselves.

📜 Three men known for righteousness
❓ This Daniel may be an ancient figure
👪 Each once saved people close to him
📖 Even great faith does not rescue everyone

## 🏠 They Should Deliver But Their Own Souls By Their Righteousness

In the stories of Noah and Job, their righteousness reached their whole household.

Here that pattern breaks completely.

Personal righteousness in this judgment saves only the person who has it.

Family ties and reputation could not transfer anyone else's safety.

🏠 Their righteousness once saved whole households
🛑 That pattern breaks in this judgment
🙋 Only the righteous person is saved
📖 Righteousness here does not transfer to others

## 🐑 Will Cut Off Man And Beast From It

This famine was not a shortage that only hurt people.

Animals died alongside their owners.

Nothing in the land was left untouched by this judgment.

The scale here covers every living thing, not just the guilty.

🐑 Even livestock did not survive
🌍 Nothing in the land was spared
⚠️ Judgment here was total
📖 Scale shows the weight of the sin

# Ezekiel 14:15-16
# 🐾 If I Cause Noisome Beasts
---
## 🐺 Noisome Beasts

Noisome is an old word for harmful or destructive, not simply smelly.

These beasts are likely wild predators left to multiply after people are gone.

A depopulated land quickly becomes dangerous to walk through.

This same pattern shows up later when Samaria is resettled in 2 Kings 17.

🐺 Noisome means harmful, not smelly
🌾 Fewer people meant more wild predators
🚷 The land became unsafe to enter
📖 History shows this pattern happening before

## 🙏 As I Live, Saith The Lord GOD

This phrase is an oath, not a passing comment.

God swears by His own eternal existence.

There is no higher guarantee available than this one.

When God says this, the outcome is certain.

🙏 As I live means a solemn oath
♾️ God himself is the guarantee
🔒 No higher promise could be given
📖 This phrase marks a certain outcome

## 👶 They Shall Deliver Neither Sons Nor Daughters

In the stories behind Noah and Job, children were part of what got saved.

Here even that gets cut off.

Righteousness protects the righteous person alone this time.

Even his own children stand outside that protection.

👶 Children were once part of the rescue
🚫 Here even children are not covered
🙋 Protection covers only the righteous one
📖 The judgment grows sharper each time

# Ezekiel 14:17-18
# ⚔️ Or If I Bring A Sword
---
## ⚔️ Sword, Go Through The Land

God speaks to the sword directly, as if it were a soldier taking orders.

This is war language, not a vague threat.

The command makes the judgment feel immediate and active.

Nothing about this sounds distant or theoretical.

⚔️ The sword is spoken to directly
🪖 This pictures war, not a vague idea
⏱️ The judgment feels immediate
📖 God's words carry real action

## 🔍 They Shall Deliver Neither Sons Nor Daughters, But They Only Shall Be Delivered Themselves

This time the land itself is not even mentioned as spared.

Earlier the beasts left the land desolate but spared no household.

Here attention narrows down to just the righteous person alone.

Each of these four judgments carries its own small shift in wording.

🔍 This version leaves out the land
📉 Attention narrows to one person
🧩 Each judgment shifts its wording slightly
📖 Small changes still carry real meaning

## 🔗 So That I Cut Off Man And Beast From It

This exact phrase also appeared back in the famine warning.

Both the famine and the sword specifically target animals, not only people.

The beasts and pestilence sections do not repeat this same line.

Small differences like this reward a slow, careful reading.

🔗 This phrase repeats from the famine section
🐑 Animals are named specifically here too
🔎 Other sections phrase it differently
📖 Careful reading catches these small patterns

# Ezekiel 14:19-20
# 🩸 The Fourth Judgment Completes The List
---
## 🦠 If I Send A Pestilence Into That Land

Pestilence means a widespread, deadly disease.

This is the fourth and final judgment named in the list.

Each of the four judgments reaches the same end through a different method.

Disease could spread through a population far faster than any army.

🦠 Pestilence strikes without warning
🔢 Four judgments now stand complete
⚡ Disease spreads faster than an army
📖 Different methods reach the same end

## 🩸 Pour Out My Fury Upon It In Blood

This phrase pictures violent, visible death across the whole land.

Fury poured out like a liquid shows judgment with full force, not a partial one.

Blood here signals mass death, not a single execution.

The image leaves no doubt about the scale being described.

🩸 Blood pictures mass death here
💥 Fury poured out means full force
🌊 The image shows widespread scale
📖 Scale here leaves nothing in doubt

## 📚 Though Noah, Daniel, And Job, Were In It

This is the third time these three men are named directly in this chapter.

Between their two full name mentions, the text used the phrase these three men instead.

That pattern frames the whole list, like bookends on a shelf.

Naming them again here closes out all four judgments together.

📚 Named directly three times total
🔁 Full names frame the whole list
📏 This repetition is deliberate, not careless
📖 The ending echoes the beginning on purpose

## 🔂 They Shall But Deliver Their Own Souls By Their Righteousness

This phrase almost exactly repeats the wording from the famine judgment back in verse fourteen.

The list opened and closed with the same idea stated the same way.

Each middle judgment, the beasts and the sword, used slightly different wording instead.

This design shows the whole passage was written with careful intention.

🔂 This wording matches verse fourteen exactly
📐 Outer judgments share one wording pattern
🧱 Middle judgments shift the wording slightly
📖 Careful structure shows careful intention

# Ezekiel 14:21-23
# 🕊️ A Remnant Left For Comfort
---
## 🏙️ My Four Sore Judgments Upon Jerusalem

The whole chapter has been building toward this one city by name.

Sword, famine, beasts, and pestilence are no longer just an illustration.

Jerusalem itself stands under all four at once.

The hypothetical case now becomes a specific warning.

🏙️ Jerusalem is named directly here
🔗 All four judgments apply at once
📣 The illustration becomes a real warning
📖 Specific judgment follows specific sin

## 👨‍👩‍👧 A Remnant That Shall Be Brought Forth, Both Sons And Daughters

Earlier in this chapter, sons and daughters were the ones left unprotected.

Here a remnant including sons and daughters actually survives.

These survivors were not spared for their own righteousness.

They were kept alive so the exiles could witness what truly happened.

👨‍👩‍👧 A remnant of children does survive
🎯 Survival here serves a different purpose
👁️ Exiles would witness them firsthand
📖 Even mercy here still serves judgment

## 😖 Ye Shall Be Comforted Concerning The Evil

Watching Jerusalem's sin up close would not feel comforting at first.

Seeing the real reasons behind the judgment would settle the exiles' questions.

Comfort here means finally understanding why this happened.

It is not comfort that erases pain, but comfort that makes sense of it.

😖 This comfort does not feel pleasant
🧩 Clarity becomes its own comfort
❓ It answers the exiles' hardest question
📖 Understanding can comfort even in grief

## 🎯 I Have Not Done Without Cause All That I Have Done

This is the final line of the whole chapter.

Every judgment described here had a real reason behind it.

Nothing happened at random or out of uncontrolled anger.

The entire chapter has been building toward proving this one sentence true.

🎯 God never judges without reason
🚫 Anger here was never blind
🧮 The whole chapter proves this point
📖 God's judgments are never arbitrary
`.trim();

export const EZEKIEL_FOURTEEN_PERSONAL_SECTIONS = parseEzekielFourteenRawNotes(EZEKIEL_FOURTEEN_RAW_NOTES);
