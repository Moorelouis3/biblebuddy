export type LeviticusThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusThirteenRawNotes(rawText: string): LeviticusThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 13:${startVerse}` : `Leviticus 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Leviticus 13 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_THIRTEEN_RAW_NOTES = `# Leviticus 13:1-3
# 🔍 The Priest's First Examination
---
## 🗣️ Spake Unto Moses And Aaron

This law is spoken to Moses and Aaron together.

Most of Leviticus addresses Moses alone.

Aaron already carries the job of judging clean and unclean.

That duty was given to him back in chapter ten.

Naming him again here confirms this chapter belongs to that same ongoing role.

🗣️ Addressed to both leaders together

👤 Aaron already judges clean and unclean

📜 That duty began back in chapter ten

📖 This law continues a duty already given

## 🔍 A Rising, A Scab, Or Bright Spot

These are three different ways a skin problem could first appear.

A rising is a swelling or bump.

A scab is a rough scaly patch.

A bright spot is a pale shiny mark.

The law does not assume only one disease.

It builds one flexible test that can handle any of the three.

🔍 Three different starting appearances, not one disease

🩹 A scab means a rough scaly patch

🎯 One test applies no matter which appears

📖 A rising means a swelling or bump

## 🩺 Like The Plague Of Leprosy

"Leprosy" here translates a Hebrew word, tzaraat.

Tzaraat covers a much wider range of skin conditions than modern Hansen's disease.

It could include rashes, fungal infections, psoriasis, or other visible changes.

The King James translators did not have a closer English word available.

"Leprosy" became the standard word even though it covers far more than one illness.

🩺 Tzaraat covers many skin conditions

📜 Not the same as modern Hansen's disease

🔬 Rashes and fungal infections both qualify

📖 One English word covers a wider Hebrew idea

## ⚖️ Pronounce Him Unclean

Two specific signs decide this first case.

White hair growing inside the mark is the first sign.

A mark that sinks below the normal skin level is the second.

Both signs appearing together let the priest rule right away.

No doctor or medicine appears anywhere in this chapter.

The priest only looks, tests, and declares a ritual status.

⚪ White hair is the first warning sign

📏 Depth below the skin is the second

⚖️ Both signs together allow an instant ruling

📖 The priest rules on status, not disease

# Leviticus 13:4-8
# ⏳ The Seven Day Watch
---
## 🤔 The Hair Thereof Be Not Turned White

Here neither warning sign from verse three shows up.

The mark is pale but it does not sink below the skin.

The hair inside it has not changed color either.

This is the truly uncertain case the rest of the chapter exists to handle.

🤔 Neither earlier warning sign appears here

📏 No depth and no hair color change

⏳ A genuinely uncertain case, not an obvious one

📖 This case is why the watch system exists

## 🔒 Shut Up Him That Hath The Plague Seven Days

"Shut up" means confined or set apart from the camp.

This was not a punishment.

It gave the priest time to watch how the mark behaved.

An early, working version of an observation period.

Waiting let the evidence speak before any final ruling.

🔒 Shut up means confined and set apart

⏳ Not a punishment but an observation period

🩺 Time to watch behavior before ruling

📖 Waiting let the evidence speak first

## 📏 At A Stay, And The Plague Spread Not In The Skin

"At a stay" is an old way of saying unchanged.

Whether the mark spreads matters more than how it first looked.

An unchanged mark after a week gets treated very differently from a growing one.

The test has shifted from appearance to behavior over time.

⚖️ At a stay means unchanged

📏 Spreading matters more than first appearance

🔁 The test now tracks behavior over time

📖 Patience reveals what a first look cannot

## 🔁 Shut Him Up Seven Days More

If the case is still unclear after the first week, a second week gets added.

The law refuses to force a decision before it is ready.

Patience is written directly into this legal process.

Two weeks of watching cost far less than one wrong verdict.

🔁 A second week added when unclear

⏳ The law refuses a premature decision

🩺 Patience built directly into the process

📖 Two weeks protect against one wrong verdict

## 👕 It Is But A Scab: And He Shall Wash His Clothes, And Be Clean

A fading mark that has not spread gets read as a healing sign.

It gets downgraded from a possible disease to an ordinary scab.

Washing the clothes closes out the unclean period.

This same closing act repeats through the rest of the chapter.

🌑 Fading with no spread reads as healing

🩹 Downgraded from disease to ordinary scab

👕 Washing clothes closes the unclean period

📖 This closing act repeats all chapter long

## 🔁 The Scab Spreadeth In The Skin

Even a clean verdict was not the end of the story.

If the same spot started spreading later, the law required a fresh exam.

The old verdict did not just stand automatically.

New spreading flips the case straight to unclean.

Every ruling in this chapter stayed open to being revised.

🔁 A clean ruling could still be revisited

👤 A fresh exam required, not automatic trust

⚖️ New spreading flips the case to unclean

📖 Evidence over time outweighs one earlier snapshot

# Leviticus 13:9-11
# 👴 Advanced, Unmistakable Leprosy
---
## 🚶 Then He Shall Be Brought Unto The Priest

This case has already moved past the uncertain early marks just described.

It is already advanced and unmistakable.

The whole seven day watching process built for unclear cases becomes unnecessary here.

Not every case needed the same careful wait.

🚶 A far more advanced case than before

🩺 This handles the opposite of uncertainty

📖 Not every case needed the full wait

➡️ Total certainty gets a different process

## ⚪ The Rising Be White In The Skin, And It Have Turned The Hair White

Both markers from the very first test return here.

White hair and a visible rising confirm the same diagnostic system.

It is just applied to a case further along than the borderline ones already covered.

One consistent test, reused again and again.

⚪ The same white hair marker returns

📏 Also the same visible rising sign

🔁 One system reused across every case

📖 Familiar signs confirm a familiar test

## 🩸 Quick Raw Flesh In The Rising

"Quick" is an old word for living.

It is the same word behind the older phrase the quick and the dead.

"Quick raw flesh" means visibly living, open, exposed tissue.

That is a far more obvious sign than plain discoloration.

🩸 Quick is an old word for living

👁️ Open living tissue, plainly visible

🔎 Far more obvious than mere discoloration

📖 A word easy to misread today

## ⚖️ Shall Not Shut Him Up: For He Is Unclean

When a case is already this advanced, there is nothing left to observe.

The whole point of the seven day wait was managing real uncertainty.

An obviously advanced case has no uncertainty left to resolve.

The flat, unconditional tone here stands out against the careful language used earlier.

🔓 No quarantine needed when nothing is uncertain

⏳ Waiting only ever served real doubt

⚖️ A flat verdict, not a careful if

📖 Clear cases got clear, immediate rulings

# Leviticus 13:12-17
# 🤍 Total Whiteness, Ruled Clean
---
## 🌍 From His Head Even To His Foot

This case describes a mark that has spread across the whole body.

Head to foot, wherever the priest looks.

It sounds at first like the worst possible outcome the chapter could describe.

That first impression turns out to be wrong.

🌍 Spread across the entire body

😮 Sounds like the worst case scenario

🔍 Sets up a surprising verdict

➡️ First impressions here are misleading

## 👁️ Wheresoever The Priest Looketh

This detail stresses just how thorough the inspection is.

Not a quick glance, but a full check over every visible part of the body.

A total body case required total body confirmation before any verdict.

👁️ A full inspection, not a glance

📏 Total spread required total confirmation

🩺 Thoroughness mattered before any ruling

📖 A careful look came before the verdict

## ⚪ It Is All Turned White: He Is Clean

This is the chapter's biggest surprise.

Full, even whiteness covering the whole body is ruled clean, not unclean.

The reasoning becomes clear one verse later.

As long as no raw, open flesh is visible, nothing is still active or spreading.

⚪ Total whiteness is ruled clean

🔑 No raw flesh means nothing is active

😮 The opposite of what a reader expects

📖 Uniform reads differently than a partial mark

## 🩸 But When Raw Flesh Appeareth In Him, He Shall Be Unclean

The moment even one patch of open raw flesh shows up, the verdict flips.

This detail is the real key to the whole passage.

Color was never actually the point.

Exposed living tissue was.

🩸 One raw patch reverses the verdict

🔑 Raw flesh was the real test

🎨 Color alone was never the point

📖 Exposed tissue mattered more than color

## 🔑 For The Raw Flesh Is Unclean: It Is A Leprosy

This line states plainly what the passage has been building toward.

Raw exposed flesh is the constant test running under every case in the chapter.

That holds true on ordinary skin, a healed boil, a burn, or here on a whitened body.

🔑 One test unifies every case here

🔁 True for skin, boils, burns, and this

➡️ The chapter explains itself through this line

📖 Raw flesh is the constant, unifying test

## 🔄 The Raw Flesh Turn Again, And Be Changed Unto White

A case was never locked in forever.

If the raw flesh heals and turns white again, the status can still change.

The person returns to the priest for a fresh look.

Nothing here stayed unclean by default.

🔄 Status could still change after ruling

👤 A fresh exam required, not an assumption

🌱 Healing over reopens the case

📖 Nothing stayed unclean by default

## ⚪ Then The Priest Shall Pronounce Him Clean

The passage closes exactly where it began.

Uniform whiteness with no raw flesh anywhere equals clean.

The strange sounding rule from verse thirteen turns out to be fully consistent.

Once raw exposed flesh is understood as the real test, nothing here is contradictory.

⚪ Ends on the same rule it opened with

🔁 Fully consistent once raw flesh is the test

🧵 A tidy close to a strange passage

📖 Consistency was there the whole time

# Leviticus 13:18-23
# 🩹 A Healed Boil That Turns Bad
---
## 🩹 Was A Boil, And Is Healed

A boil is a painful, inflamed lump on the skin, like an abscess.

This verse starts from an already healed boil, not an active one.

That introduces a new scenario the chapter has not covered yet.

What happens when something new shows up on old scar tissue.

🩹 A boil is a painful skin abscess

🔙 This case starts from a healed wound

🎯 Old scar tissue gets its own test

📖 A new scenario the chapter has not covered

## 👁️ It Be Shewed To The Priest

"Shewed" is simply the old spelling of "showed."

A new mark forming right at the site of an old healed injury gets its own test.

Scar tissue behaves differently from ordinary untouched skin.

👁️ Shewed is the old spelling of showed

🔍 Old wounds do not heal like new skin

🩹 Scar tissue gets its own specific test

📖 A new mark raises its own question

## 📏 In Sight Lower Than The Skin, And The Hair Thereof Be Turned White

The identical two markers from verse three return here.

Depth and white hair, just worded slightly differently as lower than the skin.

It is the same underlying test, reapplied to a new situation.

📏 The same depth and hair test returns

🔁 Slightly different words, identical signs

🎯 Familiar signs, unfamiliar starting point

📖 One system reused for a new case

## 🔥 Broken Out Of The Boil

This phrase names a specific cause.

Not a brand new unrelated problem, but active disease resurfacing at the exact site of old damage.

The wording distinguishes a fresh outbreak from something erupting out of an old wound.

🔥 Names disease resurfacing at an old wound

🩹 The old boil site is directly implicated

🎯 Location matters as much as appearance

📖 Distinguishes this from a fresh new mark

## ✋ There Be No White Hairs Therein

The safer profile mirrors the earlier "at a stay" language.

No depth, and hair that has not changed color.

These are the visual cues the priest was trained to treat as reassuring.

A calm mark still earns a full week of watching before any final word.

✋ No depth and no hair color change

🩺 A trained, reassuring visual profile

⏳ Still earns a week of watching

📖 Reassuring signs still get checked, not assumed

## 👕 It Is A Burning Boil

"Burning boil" describes ordinary leftover scar inflammation from the original wound.

Not a new disease, just leftover healing from an old injury.

An unchanged, non spreading mark at an old boil site is simply what healed skin can look like.

🌑 Burning boil means leftover scar inflammation

🔙 Not a new disease, just healing residue

🩺 Unchanged marks can just be healed skin

📖 A reassuring, everyday close to this case

# Leviticus 13:24-28
# 🔥 A Burn That Turns Bad
---
## 🔥 A Hot Burning

This introduces a third specific starting scenario.

After ordinary skin and a healed boil, now an actual burn wound from fire or heat.

The chapter keeps working through every realistic way a mark could first appear on the body.

🔥 A third starting scenario, an actual burn

🩺 Burns get their own test, like boils did

🎯 Every injury type gets the same process

📖 The chapter covers every realistic starting point

## 🩸 The Quick Flesh That Burneth

"Quick" again means living, the same word used back in verse ten.

Here it describes the healthy living tissue right at the burn site.

A new pale or reddish mark has appeared there.

That mark is distinct from the burn's dead or scarred tissue.

🩸 Quick still means living tissue

🔥 Refers to healthy tissue at the burn site

🎯 Living tissue and scar tissue read differently

📖 A new mark near the injury itself

## 🔥 Broken Out Of The Burning

Once again the same depth and white hair test from verse three applies.

This time it is framed as disease breaking out from the burn site.

The wording echoes broken out of the boil from the case just before it.

No waiting is needed when both signs appear together.

📏 The same depth and hair test returns

🔁 Echoes the earlier boil language

⚖️ Both signs together mean an instant verdict

📖 One test, reused across every injury

## ✋ There Be No White Hair In The Bright Spot

The safer profile shows up again here, no white hair and a duller color.

This exact description has become a familiar pattern by this point in the chapter.

An uncertain case like this still earns the seven day watch, now for the fourth time.

The law never assumes a first look alone is enough for a hard case.

✋ The same reassuring profile as before

🔁 A familiar pattern by this point

🔒 The fourth use of the seven day watch

📖 A first look alone was never enough

## 🌱 It Is A Rising Of The Burning

A mark that does not spread gets read as ordinary burn scar inflammation, not disease.

That is the exact same logic used for the burning boil a few verses earlier.

Two different injuries, boils and burns, end up following one shared rule.

🌱 Read as scar inflammation, not disease

🔁 The same logic as the burning boil

🩹 Two injuries, one shared rule

📖 Consistency runs underneath every case here

# Leviticus 13:29-37
# 💇 The Scall: Head And Beard
---
## 👫 A Plague Upon The Head Or The Beard

This verse names women explicitly alongside men for the first time in this chapter's case list.

The beard case only applies to men.

The head condition applies to anyone.

The law makes a point of saying so directly.

👫 Women are named here too

🧔 The beard case is naturally male only

🎯 A new body region gets its own rule

📖 The head case applies to anyone

## 🟡 It Is A Dry Scall

"Scall" is an old word for a scaly, itchy condition affecting the scalp or beard.

Notice the marker itself changes here.

It is yellow thin hair, not white hair like earlier in the chapter.

Normal head and beard hair naturally comes in different colors than skin.

The test had to shift to match.

🟡 Scall means a scaly itchy condition

🔄 The color marker shifts to yellow here

🎯 Matched to how hair actually looks

📖 The test adapts to the body part

## ⚫ That There Is No Black Hair In It

Black hair was the ordinary hair color expected in this setting.

Its absence here does not settle the case either way.

It simply means the priest still cannot tell, so the watch period begins.

Later in this chapter, black hair growing back becomes the actual proof of healing.

⚫ Black hair was the expected normal color

🤔 Its absence keeps the case open

⏳ Uncertainty here still earns a full watch

📖 Its return later becomes real proof

## ✂️ He Shall Be Shaven, But The Scall Shall He Not Shave

This is a practical instruction.

Shave the surrounding hair so the priest can see the spot clearly.

Leave the affected patch itself untouched.

Shaving over the mark would erase the exact hair growth pattern the priest needs to track.

✂️ Shave around the mark, not over it

👁️ Keeps the evidence visible for tracking

🔍 A practical exam method, not a random rule

📖 Preserving evidence mattered more than appearance

## 🔒 Shall Shut Up Him That Hath The Scall Seven Days More

Just as with the very first case earlier in this chapter, a second week gets added.

This happens whenever the first week's check is still not conclusive.

The head and beard case follows the exact same two week structure already used for ordinary skin.

🔒 A second week added again here

🔁 Mirrors the pattern from earlier in the chapter

⏳ Patience stayed consistent, region to region

📖 One process applied across every body region

## 👕 Then The Priest Shall Pronounce Him Clean: And He Shall Wash His Clothes

An unchanged, non spreading scall after the full two week watch earns a clean verdict.

The same clothes washing close used throughout the rest of the chapter applies here too.

Consistency runs across every different body region this chapter has covered so far.

👕 The same clothes washing close as before

🔁 An unchanged mark reads as clean again

🩺 The scall case ends like the others

📖 Consistency across every body region covered

## 🔁 If The Scall Spread Much In The Skin After His Cleansing

Just like the ordinary scab, and the boil and burn cases before it, an already cleared scall can resurface.

Spreading later triggers a fresh examination.

No verdict here was automatically permanent.

🔁 A cleared case can still resurface

👤 A fresh exam required, not an assumption

➡️ The law tracked ongoing behavior, not one moment

📖 No verdict here was permanently locked in

## 🚫 The Priest Shall Not Seek For Yellow Hair

Once visible spreading has already happened, the hair color test becomes unnecessary.

Spreading alone is now sufficient proof on its own.

There is no need for a second confirming sign once behavior has already answered the question.

🚫 Spreading alone is now enough proof

🔑 Behavior can outweigh an earlier marker

➡️ One clear sign was enough here

📖 The law adapts as evidence accumulates

## ⚫ Black Hair Grown Up Therein

Normal colored hair actually regrowing inside the spot is treated as strong proof of real healing.

This closes the case for good.

Unlike some other rulings that stayed open to being revisited, healthy regrowth here reads as decisive.

New growth, not just an absence of symptoms, settles this case.

⚫ Regrowth of normal hair proves healing

🔒 Treated as a decisive, closing verdict

🌱 New growth settles the case for good

📖 Growth mattered more than a symptom's absence

# Leviticus 13:38-39
# ⚪ Freckled Spots, Clean
---
## 👫 Even White Bright Spots

Both men and women are addressed here, matching the pattern used for the scall.

The vocabulary in this verse deliberately echoes the dangerous marks described earlier in the chapter.

Bright spots and white sound alarming if a reader stops before the very next verse.

That alarm gets resolved immediately.

👫 Both men and women addressed here

🎭 Language echoes the earlier serious cases

😟 Could sound alarming on its own

📖 The next verse resolves the worry

## 🔎 It Is A Freckled Spot That Groweth In The Skin

"Freckled spot" likely translates a Hebrew word for a harmless, common skin discoloration.

Something like an ordinary blotchy pigment change, not any kind of disease.

This verse exists specifically to reassure people that not every pale mark is dangerous.

🔎 A freckled spot is likely harmless

🎨 An ordinary pigment change, not disease

✅ A verse written to head off worry

📖 Not every pale mark is dangerous

## ⚡ He Is Clean

No waiting period at all is required here, unlike almost every other borderline case.

A uniform, unchanging pattern was recognizable enough on sight.

The full seven day process was not needed at all.

This proves the law told the difference between real uncertainty and a simple lookalike.

⚡ No seven day wait required here

👁️ Recognizable enough on sight alone

🔓 The full process was not needed

📖 True uncertainty and lookalikes were told apart

# Leviticus 13:40-44
# 👨‍🦲 Baldness And The Bald Head Sore
---
## 👨‍🦲 He Is Bald, Yet Is He Clean

Ordinary hair loss at the back or crown of the head is declared harmless here.

Not a disease of any kind.

This reassurance comes right before the chapter covers baldness related marks.

Baldness itself was never the actual concern.

Elsewhere in scripture, baldness gets treated the same ordinary way.

In Second Kings, a group of children mock the prophet Elisha by calling him bald head.

That taunt only makes sense if baldness was seen as ordinary, not shameful.

👨‍🦲 Plain hair loss is explicitly harmless

✅ Never treated as any kind of disease

😄 Elisha's story shows baldness was ordinary

📖 Not shameful, simply an unremarkable trait

## 🧑 He Is Forehead Bald: Yet Is He Clean

The law names both directions of natural hair loss.

From the crown backward, and from the hairline forward.

Covering both makes sure no ordinary pattern of aging gets mistaken for disease.

Genetics and age explain most of what a person sees in the mirror.

🧑 Names both crown and receding hairline

✅ Neither pattern was ever a health concern

🪞 Aging alone explains most hair loss

📖 Deliberately thorough, covering ordinary patterns

## 🩹 A White Reddish Sore

Baldness itself stays completely fine under this law.

A genuinely new sore appearing within the already bald area is different.

That gets checked using the same core test used throughout the rest of the chapter.

The bald skin was never the problem.

A new mark on it is.

🩹 Baldness stays fine on its own

🆕 A new sore within it gets checked

🔍 The same core test applies here

📖 Location changed, but the test did not

## 🔁 As The Leprosy Appeareth In The Skin Of The Flesh

This is an explicit cross reference back to the original test from verses two and three.

Baldness does not get its own separate rulebook.

It only gets its own starting condition.

That condition gets plugged into the same diagnostic system established earlier.

🔁 A direct callback to the original test

🎯 The starting condition changes, not the test

🧩 Every case fits one shared framework

📖 One system, reused for a new case

## ⚖️ He Is A Leprous Man, He Is Unclean

This is the confident, flat verdict after the priest checks the sore against the earlier test.

The rising is white and reddish, matching the pattern already established for ordinary skin.

No new test was invented for this final scenario.

⚖️ A flat verdict, matching the earlier test

📏 White and reddish matches the known pattern

🔁 No new test invented for this case

📖 The chapter closes its main test here

## 👑 The Priest Shall Pronounce Him Utterly Unclean

"Utterly unclean" is a stronger phrase than the plain "unclean" used elsewhere.

The text does not spell out exactly why the emphasis is stronger here.

It is worth being honest about what the passage leaves unexplained.

Guessing at a reason would go beyond what the text actually says.

👑 Utterly is stronger than plain unclean

🤔 Honesty about the gap matters here

✅ Better than guessing beyond the text

📖 The text never explains this added emphasis

# Leviticus 13:45-46
# 📢 Unclean, Unclean: Life Outside The Camp
---
## 👕 His Clothes Shall Be Rent

"Rent" means torn, an old but simple word.

Tearing one's own clothes was a recognized mourning custom in scripture.

Jacob tore his clothes over Joseph in Genesis thirty seven.

Job tore his robe after losing everything.

The leper is required to visibly display that same signal of grief.

👕 Rent simply means torn

😢 A recognized mourning custom elsewhere in scripture

📜 Jacob and Job both did this

📖 The leper visibly displays the same grief

## 🧑‍🦲 His Head Bare

Uncovering the hair was another recognized mourning gesture.

Priests were specifically forbidden from doing this exact thing while on duty back in chapter ten.

The very same physical signal means mourning outside the sanctuary.

Inside it, during active service, it was not allowed at all.

🧑‍🦲 Uncovering hair, a standard mourning gesture

🚫 Priests were forbidden this in chapter ten

🔁 Same gesture, opposite meaning by setting

📖 Context changes what a gesture signals

## 🤐 A Covering Upon His Upper Lip

This likely means covering the lower part of the face, near the mouth.

Similar imagery of covering the lips in grief shows up elsewhere in scripture.

Ezekiel twenty four and Micah three both use this same picture.

It communicated the person's condition before a single word needed to be spoken.

🤐 Likely a covering over the lower face

📜 Similar imagery appears in Ezekiel and Micah

👁️ Signaled the condition without speaking

📖 A silent warning before any words

## 📢 Shall Cry, Unclean, Unclean

The leper is required to announce their own status out loud.

The word is repeated twice for emphasis.

This functioned as a warning system, protecting the community from unknowing contact.

It was not a ritual designed purely to shame the person.

📢 A required self announcement, said twice

🛡️ A practical warning, not humiliation

👥 Protected others from unknowing contact

📖 A function, not a punishment

## 🏕️ He Shall Dwell Alone

Removal from community life lasted only as long as the symptoms did.

It was never a fixed sentence handed down in advance.

This exact law explains real scenes found elsewhere in scripture.

Miriam was cast outside the camp for seven days in Numbers twelve.

King Uzziah lived in a separate house until his death in Second Chronicles twenty six.

The ten lepers kept their distance while calling out to Jesus in Luke seventeen.

🏕️ Removal lasted only as long as symptoms

📜 Explains Miriam's exile in Numbers twelve

👑 Also explains Uzziah's isolation later in scripture

📖 And the ten lepers calling out to Jesus

## 🔄 All The Days Wherein The Plague Shall Be In Him He Shall Be Defiled

Unclean status was tied strictly to active, present symptoms.

It was never treated as a fixed identity.

This detail matters directly for the next chapter.

Chapter fourteen lays out the full cleansing ritual for someone whose symptoms actually go away.

🔄 Tied strictly to active symptoms

🚫 Never treated as a fixed identity

➡️ Sets up chapter fourteen's cleansing ritual

📖 Status here was always reversible

# Leviticus 13:47-53
# 👕 Leprosy In A Garment
---
## 👕 The Garment Also That The Plague Of Leprosy Is In

The same Hebrew word used for the human skin condition now applies to fabric.

This almost certainly describes mold, mildew, or a fungal growth staining cloth or leather.

Not a literal human disease somehow spreading into an object.

👕 The same word now applies to fabric

🍄 Most likely mold, mildew, or fungus

🚫 Not a literal disease infecting cloth

📖 One word, two very different subjects

## 🧵 Whether It Be A Woollen Garment, Or A Linen Garment

Wool from sheep and linen from flax were the two main fabrics worn at this time.

Naming both covers nearly every common garment a person owned.

A thorough, all encompassing starting scope for this whole section.

🧵 Wool and linen were the two main fabrics

👕 Naming both covers nearly all clothing

🎯 No common garment falls outside this rule

📖 A deliberately thorough starting scope

## 🧶 The Warp, Or Woof

These are basic weaving terms.

The warp is the set of lengthwise threads stretched on a loom first.

The woof, also called the weft, is the crosswise threads woven through the warp.

Together the two words simply mean the entire garment, however it was made.

🧶 Warp is the lengthwise loom thread

🧵 Woof is the crosswise woven thread

🎯 No part of the weave is excluded

📖 Together they mean the whole garment

## 🐐 Or In A Skin, Or In Any Thing Made Of Skin

The rule extends beyond woven cloth to leather goods as well.

Covering nearly anything made from animal hide.

Not just fabric that was spun and woven on a loom.

🐐 Extends to leather items too

🎯 A deliberately broad scope for this law

🧩 Woven cloth was never the only concern

📖 Covers nearly any hide based material

## 🎨 If The Plague Be Greenish Or Reddish In The Garment

The human skin tests relied on depth and hair color.

The fabric test works differently.

It relies on color alone.

Greenish coloring suggests mold or mildew.

Reddish coloring suggests a different kind of staining.

🎨 The fabric test relies on color alone

🍄 Greenish likely points to mold

🔴 Reddish points to a different stain

📖 A simpler test for a different material

## 🔒 Shut Up It That Hath The Plague Seven Days

The same seven day observation pattern used throughout this chapter gets reapplied here.

Now to an object instead of a person.

The chapter's core method stays constant even as its subject changes completely.

🔒 The same seven day pattern again

🔁 Now applied to an object, not a person

🎯 The test outlasts the change in subject

📖 One method, used across every subject

## 🔥 The Plague Is A Fretting Leprosy

"Fret" or "fretting" is an old word meaning to eat away at something gradually.

Modern English still keeps a faint trace of this in fretting over worry.

Here the meaning is completely literal, an active, spreading, consuming stain.

🔥 Fret means to eat away gradually

🍄 Here the meaning is fully literal

🎯 An active stain, not a static one

📖 Modern fretting over worry is a faint echo

## 🔥 It Shall Be Burnt In The Fire

Burning fully destroys the contamination.

Simply discarding the item would not.

It could still be reused, resold, or passed along to someone unaware of the danger.

A permanent solution to a spreading problem.

🔥 Fire fully destroys the contamination

⚠️ Prevents reuse by someone unaware

🚮 Discarding alone was not enough

📖 A permanent answer to a spreading danger

# Leviticus 13:54-59
# 🧺 Washing, Watching, And The Law's Close
---
## 🧺 Command That They Wash The Thing Wherein The Plague Is

A middle option appears here for the first time in the fabric section.

Washing the item as an actual diagnostic test.

Checking whether the stain responds to washing, not jumping straight to a final ruling.

🧺 Washing used here as a real test

🔍 Checks how the stain responds first

🎯 Testing came before judging

📖 A middle option before any final ruling

## 🔒 He Shall Shut It Up Seven Days More

The seven day pattern reappears one final time in this chapter.

Now specifically applied after the item has already been washed.

This gives the stain time to reveal how it truly behaves once tested.

🔒 The pattern's final appearance in the chapter

⏳ Time given after the washing test

🎯 A stain gets time to reveal itself

📖 The chapter's central tool used to its close

## ⚖️ It Is Unclean

This flips the usual rule found elsewhere in the chapter.

Elsewhere, an unchanged, non spreading mark usually meant clean.

Here, surviving an actual wash without fading is read as proof the stain has set in deep.

Context, not just the pattern itself, decides the meaning.

⚖️ Reverses the usual unchanged equals clean rule

🧺 Surviving a wash proves deep staining

🔑 The same pattern can mean opposite things

📖 Context decides the meaning here

## 🔥 It Is Fret Inward, Whether It Be Bare Within Or Without

"Fret inward" means the stain has worked its way into the fabric's own structure.

Not just sitting on the surface.

This holds true regardless of which side of the material shows the visible mark.

🔥 The stain has entered the structure itself

🔁 Fret carries the same meaning as before

🎯 Depth inside the fabric, not just on it

📖 True on either side of the material

## ✂️ Then He Shall Rend It Out Of The Garment

Fading after a wash allows a more targeted fix.

The priest can cut out just the affected patch.

The rest of the garment does not have to be destroyed.

The law offers every reasonable chance to save what can be saved.

✂️ A targeted fix, cutting only the patch

💡 A real chance to save the rest

🎯 Saving something was always tried first

📖 Destruction was treated as a last resort

## 📜 This Is The Law Of The Plague Of Leprosy In A Garment Of Woollen Or Linen

This closing line works like a title placed at the end of the section.

It summarizes the whole garment law as one complete unit.

The same pattern was used to close chapter eleven back in its final verses.

It also quietly sets up chapter fourteen's matching law for a house with the same kind of plague.

📜 A closing summary placed at the end

🔁 Matches how chapter eleven closed

🏠 Sets up chapter fourteen's law for houses

📖 One complete unit of teaching now closed`.trim();

export const LEVITICUS_THIRTEEN_PERSONAL_SECTIONS = parseLeviticusThirteenRawNotes(LEVITICUS_THIRTEEN_RAW_NOTES);
