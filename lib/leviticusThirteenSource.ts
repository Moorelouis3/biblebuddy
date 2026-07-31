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

# 🔍 The Priest's First Look

---

## 🗣️ The LORD Spake Unto Moses And Aaron

Like chapter 11, this law is addressed to both leaders together, not to Moses alone. What follows is one of the longest single laws in the whole book, spelling out exactly how a priest examines and rules on skin conditions.

🗣️ Addressed to both leaders together, same pattern as chapter 11

📏 One of the longest connected laws in all of Leviticus

👤 The priest's job here is diagnosis and ritual status, not medicine

---

## 🔍 A Rising, A Scab, Or Bright Spot

These are three different starting points a skin problem could take: a rising (a swelling or bump), a scab (a rough, scaly patch), or a bright spot (a pale, shiny mark). The law doesn't assume one single disease. It builds a flexible test that can be applied no matter which of these three ways the problem first shows up.

🔍 Three different visual starting points, not one fixed disease

📖 A flexible test built to handle any of the three

🩹 Each Hebrew word describes a distinct kind of visible mark

---

## 🩺 Like The Plague Of Leprosy

"Leprosy" here translates a Hebrew word, tzaraat, that covers a much wider range of skin conditions than what doctors today call leprosy (Hansen's disease). It could include rashes, fungal infections, psoriasis, or other visible skin changes. The King James translators didn't have a better English word available, so "leprosy" became the standard, even though it's broader than the modern medical term.

🩺 Tzaraat covers many skin conditions, not one specific illness

📖 "Leprosy" was the best available English word, not a perfect match

🔬 Modern Hansen's disease is only one possible condition among several

---

## 👤 Brought Unto Aaron The Priest, Or Unto One Of His Sons The Priests

No doctor or physical treatment appears anywhere in this chapter. The priest's entire job is to look, apply a fixed set of visual tests, and declare a person clean or unclean. This connects directly to Aaron's teaching charge from chapter 10:10-11, to "put difference between... unclean and clean."

👤 The priest diagnoses and rules; he does not treat or heal

⚖️ A ritual and social judgment, not a medical procedure

🔗 A direct continuation of Aaron's chapter 10:10 assignment

---

## ⚪ When The Hair In The Plague Is Turned White

This is the first of two key warning signs the priest looks for. Hair growing white inside the mark, rather than its normal color, signals that whatever is happening has reached down into the hair follicle itself, not just sitting on the surface.

⚪ White hair growing inside the mark is warning sign number one

📏 A sign that the problem reaches below the surface

🔁 This exact marker gets reused throughout the rest of the chapter

---

## 📏 The Plague In Sight Be Deeper Than The Skin Of His Flesh

The second warning sign is how the mark looks compared to the surrounding skin: does it appear to sink down below the normal skin level, rather than sitting flat on top of it? Depth, more than color or size, is the test the priest is trained to look for again and again in this chapter.

📏 A mark that looks sunken below the skin, not sitting on top

🔁 Depth becomes the chapter's single most repeated diagnostic clue

🩺 Together with white hair, these two signs settle a case fast

---

## ⚖️ Pronounce Him Unclean

When both warning signs show up together right away, no waiting period is needed. The priest can rule immediately. This immediate-verdict pattern sets up a contrast with the very next section, where neither sign is present and the priest has to wait and watch instead.

⚖️ Both signs present together means an instant ruling

⏳ Sets up the "wait and see" cases explained next

📖 The chapter's fastest possible verdict, used as a baseline

# Leviticus 13:4-8

# ⏳ The Seven-Day Watch

---

## 🤔 If The Bright Spot Be White... Not Deeper... Hair Thereof Be Not Turned White

Here neither of the two warning signs from verse 3 is present. The mark is pale, but not sunken, and the hair inside it hasn't changed color. This is the genuinely uncertain case the rest of the chapter's seven-day system exists to handle.

🤔 Neither warning sign from verse 3 shows up here

⏳ The genuinely uncertain case, not an obvious one

📖 What the whole seven-day watch system was built to solve

---

## 🔒 Shut Up Him That Hath The Plague Seven Days

"Shut up" means confined or quarantined, kept apart from the rest of the camp for a set period. This isn't a punishment. It's an ancient, working version of a diagnostic observation period, buying time to see how the mark behaves before making a final call.

🔒 "Shut up" means confined, kept apart from the camp

⏳ A built-in waiting period, not a punishment

🩺 An early form of watching a condition to see how it develops

---

## ⚖️ At A Stay, And The Plague Spread Not In The Skin

"At a stay" is an old way of saying unchanged, staying the same size and shape. Whether the mark spreads turns out to matter more than what it looked like on day one. An unchanged mark after a week is treated very differently from a growing one.

⚖️ "At a stay" means unchanged, staying the same

📏 Spreading matters more than the mark's original appearance

🔁 The test now shifts from looks to behavior over time

---

## 🔒 Then The Priest Shall Shut Him Up Seven Days More

If the case is still unclear after the first week, the law builds in a second week rather than forcing a premature decision either way. Patience, not speed, is built directly into the legal process here.

🔒 A second full week added when the first wasn't conclusive

⏳ The law refuses to force a premature decision

📖 Patience is written directly into the legal process

---

## 🌑 Somewhat Dark, And The Plague Spread Not... It Is But A Scab

Darkening (fading toward the normal skin tone) combined with no spreading is read as a healing sign. The mark gets downgraded from a possible disease to an ordinary scab, something already resolving on its own.

🌑 Fading color plus no spreading reads as a healing sign

🩹 Downgraded from possible disease to an ordinary scab

📖 Two full weeks of watching finally pays off with an answer

---

## 👕 He Shall Wash His Clothes, And Be Clean

Washing the clothes is the final formal act that closes out an unclean period and marks the return to ordinary life. This same closing step appears again and again through the rest of the chapter every time someone is finally declared clean.

👕 The formal closing act of an unclean period

🔁 This exact step repeats throughout the rest of the chapter

📖 A visible, physical marker of the ritual status changing back

---

## 🔁 If The Scab Spread Much Abroad In The Skin, After That He Hath Been Seen Of The Priest For His Cleansing

Even a clean verdict wasn't necessarily the end of the story. If the same spot started spreading later, after already being cleared, the law required a fresh examination rather than letting the old verdict stand automatically.

🔁 A clean ruling could still be revisited later if things changed

👤 A fresh exam required, not just relying on the old verdict

📖 The law tracked ongoing behavior, not a single moment in time

---

## ⚖️ The Scab Spreadeth In The Skin... Pronounce Him Unclean: It Is A Leprosy

New spreading after a clean verdict flips the diagnosis entirely. What looked like an ordinary healed scab is reclassified as leprosy after all, showing that every ruling in this chapter stayed open to correction based on new evidence.

⚖️ New spreading can overturn an earlier clean verdict

🔄 Every ruling here stayed open to being revised

📖 Evidence over time outweighs any single earlier snapshot

# Leviticus 13:9-11

# 👴 Old, Established Leprosy

---

## 🚶 The Plague Of Leprosy Is In A Man, Then He Shall Be Brought Unto The Priest

This case moves past the uncertain, early-stage marks of verses 2-8 into something already advanced and unmistakable. The whole seven-day watching process built for ambiguous cases becomes unnecessary once a case is this far along.

🚶 A more advanced case than the uncertain ones just covered

📖 Not every case needed the full seven-day process

🩺 The chapter now handles the opposite extreme: total certainty

---

## ⚪ The Rising Be White In The Skin, And It Have Turned The Hair White

Both markers from the very first test in verse 3 reappear here (white hair, a visible rising), confirming this is the same underlying diagnostic system, just applied to a case that's already gone further along than the borderline ones just described.

⚪ The same white-hair marker from verse 3 shows up again

📖 One consistent diagnostic system reused across every case

🔁 The chapter builds by reapplying a small set of core signs

---

## 🩸 There Be Quick Raw Flesh In The Rising

"Quick" is an old English word for living (the same word behind the older phrase "the quick and the dead"). "Quick raw flesh" means visibly living, open, exposed tissue, not just discoloration. This is a much more obvious, unmistakable sign than anything in the previous ambiguous cases.

🩸 "Quick" is an old word for living, not fast-moving

👁️ Open, exposed living tissue, plainly visible on sight

📖 Unmistakable in a way the earlier borderline cases weren't

---

## 🔓 It Is An Old Leprosy... And Shall Not Shut Him Up

When a case is already this advanced, there's nothing left to observe. The whole point of the seven-day quarantine was managing genuine uncertainty, and an obviously advanced case has no uncertainty left to resolve.

🔓 No quarantine needed when nothing is left uncertain

⏳ The waiting period only ever existed to manage real doubt

📖 Confirms the seven-day system was practical, not ritualistic filler

---

## ⚖️ For He Is Unclean

The confident, flat tone here (no "if," no conditions) stands out against the careful conditional language used through verses 4-8. Clear cases got clear, immediate rulings; unclear cases got the patient, staged process instead.

⚖️ A flat, unconditional statement, unlike the careful "if" language before

🔁 The law matched its process to how much doubt actually existed

📖 Closes the chapter's first extended case study

# Leviticus 13:12-17

# 🤍 The Strange Case Of Total Whiteness

---

## 🌍 Break Out Abroad In The Skin... Cover All The Skin... From His Head Even To His Foot

This scenario pictures a case that has spread across a person's entire body, head to foot, wherever the priest looks. It sounds, at first read, like the worst possible outcome the chapter could describe.

🌍 A mark that has spread across the entire body

📖 Sounds like it should be the chapter's worst-case scenario

🔍 Sets up one of the chapter's most surprising verdicts

---

## 👁️ Wheresoever The Priest Looketh

This detail emphasizes just how thorough the inspection is: not a quick glance, but a full check over every visible part of the body before any verdict gets made. Total-body cases required total-body confirmation.

👁️ A full, systematic inspection, not a quick glance

📏 Total-body spread required total-body confirmation

🩺 Reinforces how seriously the priestly exam was carried out

---

## ⚪ It Is All Turned White: He Is Clean

This is the chapter's biggest surprise. Full, uniform whiteness covering the whole body is declared clean, not unclean. The reasoning becomes clear a verse later: as long as no raw, open flesh is visible anywhere, there's nothing actively spreading or unhealed to worry about. A uniform, fully "turned" pattern reads completely differently than a partial, still-developing mark.

⚪ Total whiteness is ruled clean, the opposite of what you'd expect

🔑 No visible raw flesh means nothing is still actively active

📖 A uniform pattern reads differently than a partial, developing one

---

## 🩸 But When Raw Flesh Appeareth In Him, He Shall Be Unclean

The moment even one patch of open, raw flesh shows up, the verdict flips instantly. This single detail is the real key to understanding the whole strange passage: color was never actually the point, exposed living tissue was.

🩸 Even one raw patch reverses the clean verdict immediately

🔑 Raw flesh, not white color, was the real deciding factor all along

⚖️ A single detail flips the entire ruling

---

## 🔑 For The Raw Flesh Is Unclean: It Is A Leprosy

This line states plainly what the whole passage has been building toward: raw, exposed flesh is the constant, unifying test running underneath every single case in this chapter, whether on ordinary skin, a healed boil, a burn, or here on a fully whitened body.

🔑 The chapter's real, unifying diagnostic principle stated plainly

🔁 The same underlying test as every other case so far

📖 Explains why total whiteness and total uncleanness aren't the same

---

## 🔄 Or If The Raw Flesh Turn Again, And Be Changed Unto White

A case isn't locked in forever. If the exposed raw flesh itself heals over and turns white like the rest of the skin, the person returns to the priest for a fresh look rather than staying unclean by default.

🔄 The status could still change again after an unclean ruling

👤 A fresh examination required, not an automatic assumption

📖 Confirms these rulings were reversible, not permanent labels

---

## ⚪ The Plague Be Turned Into White; Then The Priest Shall Pronounce Him Clean

The passage closes exactly where it began: uniform whiteness, no raw flesh anywhere, equals clean. The strange-sounding rule from verse 13 turns out to be completely consistent once raw exposed flesh is understood as the chapter's true test.

⚪ Ends on the same "all white equals clean" rule it opened with

🔁 Fully consistent once raw flesh is understood as the real test

📖 A tidy close to the chapter's most counterintuitive passage

# Leviticus 13:18-23

# 🩹 A Boil That Turns Bad

---

## 🩹 The Flesh Also, In Which... Was A Boil, And Is Healed

A "boil" is a painful, inflamed lump on the skin, like an abscess. This verse starts from an already-healed boil, not an active one, introducing a new starting scenario: what happens when something new shows up on old scar tissue.

🩹 A boil is a painful, inflamed skin abscess

🔙 This case starts from an already-healed wound, not a fresh one

📖 A new starting scenario the chapter hasn't covered yet

---

## 👁️ A White Rising, Or A Bright Spot, White, And Somewhat Reddish, Be Shewed To The Priest

"Shewed" is the old spelling of "showed." A new mark forming right at the site of an old, already-healed injury gets its own dedicated test, since scar tissue behaves differently from ordinary untouched skin.

👁️ "Shewed" is simply the old spelling of "showed"

🩹 Old scar tissue gets its own specific test, not a generic one

📖 A new mark at an old wound site raises its own questions

---

## 📏 In Sight Lower Than The Skin, And The Hair Thereof Be Turned White

The identical two markers from verse 3 (depth and white hair) return here, just worded slightly differently ("lower than the skin" instead of "deeper than the skin"). It's the same underlying test, reapplied to this new scenario.

📏 The same depth-and-white-hair test from verse 3, reused

🔁 Slightly different wording, but the identical underlying signs

📖 Confirms one consistent system runs through every case

---

## 🔥 Broken Out Of The Boil

This phrase gives a specific cause: not a brand-new, unrelated problem, but active disease resurfacing at the exact site of old damage. The wording distinguishes a fresh outbreak from something erupting out of an old wound.

🔥 Names the specific cause: disease resurfacing at an old wound

📖 Distinguishes this case from a totally unrelated fresh mark

🩹 The old boil's location is directly implicated

---

## 🔒 Then The Priest Shall Shut Him Up Seven Days

The same quarantine-and-observe pattern from verses 4-5 gets reapplied here for the ambiguous version of this case. The chapter keeps reusing one small set of tools rather than inventing a new process for every new scenario.

🔒 The same seven-day quarantine, reused for this new scenario

🔁 One toolkit, applied repeatedly rather than reinvented each time

⏳ Uncertainty still gets the same patient, staged response

---

## 🌑 If It Spread Much Abroad In The Skin, Then The Priest Shall Pronounce Him Unclean: It Is A Plague

Spreading after the quarantine period flips the case to unclean, exactly the same pattern already seen with the ordinary scab back in verses 7-8. The law treats "spreading over time" as trustworthy evidence no single glance could provide.

🌑 Spreading after quarantine means an unclean ruling, as before

🔁 The same pattern already used for the ordinary scab case

📖 Behavior over time outweighs the mark's original appearance

---

## ✋ It Be Not Lower Than The Skin, But Be Somewhat Dark

The safer profile mirrors the earlier "at a stay" language: no depth, and a fading, darker color rather than a bright, angry tone. These are the visual cues the priest is trained to treat as reassuring.

✋ No depth, plus a darkening color, reads as a safer sign

🔁 Mirrors the same "at a stay" reassurance from earlier verses

🩺 Trained visual cues, not guesswork

---

## 🌑 It Is A Burning Boil; And The Priest Shall Pronounce Him Clean

"Burning boil" describes ordinary leftover scar inflammation from the original healed wound, not a new disease. An unchanged, non-spreading mark at an old boil site is simply what healed skin sometimes looks like, nothing more.

🌑 "Burning boil" means ordinary scar-tissue inflammation

🔙 Not a new disease, just leftover healing from the original wound

📖 Closes the boil scenario on a reassuring, everyday note

---

## 🔁 The Same Two-Step Test, A Third Time

By this point in the chapter, a clear pattern has emerged: whatever the starting scenario (ordinary skin, an advanced case, now a healed boil), the underlying test is always the same handful of signs — depth, hair color, and whether the mark spreads over time.

🔁 Three different scenarios, one consistent underlying test

📖 The law is a reusable diagnostic engine, not a random list

🩺 Learning the test once means recognizing it everywhere

# Leviticus 13:24-28

# 🔥 A Burn That Turns Bad

---

## 🔥 A Hot Burning

This introduces a third specific starting scenario, after ordinary skin and a healed boil: an actual burn wound from fire or heat. The chapter keeps working through every realistic way a mark could first appear on someone's body.

🔥 A third starting scenario: an actual fire or heat burn

📖 The chapter systematically covers every realistic starting point

🩺 Burns get their own test, just like boils did

---

## 🩸 The Quick Flesh That Burneth Have A White Bright Spot, Somewhat Reddish, Or White

"Quick" again means living, the same word used back in verse 10. Here it describes the healthy, living tissue right at the burn site where a new pale or reddish mark has appeared, distinct from the burn's dead or scarred tissue.

🩸 "Quick" still means living, same as in verse 10

🔥 Refers to healthy tissue right at the burn site

📖 A new mark forming on living tissue near the injury

---

## 📏 It Be In Sight Deeper Than The Skin... Broken Out Of The Burning: Wherefore The Priest Shall Pronounce Him Unclean

Once again, the same depth-and-white-hair combination from verse 3 delivers an immediate unclean verdict, this time framed as disease breaking out from the site of the burn injury, echoing the boil case just before it.

📏 The same depth-and-hair test delivers an immediate verdict

🔁 Echoes the "broken out of" language from the boil case

⚖️ No waiting needed when both signs appear together

---

## ✋ No White Hair In The Bright Spot... Somewhat Dark

The safer profile appears again: no white hair, and a darker, non-angry color. By now this exact description has become a familiar, recognizable pattern across several different scenarios in the chapter.

✋ The same reassuring profile seen in earlier cases

🔁 A familiar, recognizable pattern by this point in the chapter

🩺 Consistency makes the law easier to actually apply in practice

---

## 🔒 Then He Shall Shut Him Up Seven Days

The seven-day observation window gets applied here too, for the fourth time in the chapter. The law never assumes it can read an uncertain case correctly on the first look.

🔒 The seven-day window applied for the fourth time in the chapter

⏳ Never assumes a first look alone is enough for a hard case

🔁 Same tool, same patience, new scenario

---

## 🌑 If It Be Spread Much Abroad In The Skin, Then The Priest Shall Pronounce Him Unclean

Spreading after the waiting period settles the case, exactly as it has in every previous scenario. By now the reader should be able to predict this outcome before even reaching the verse.

🌑 Spreading after the wait settles it, as always

🔁 A now-predictable pattern, repeated on purpose

📖 The law's consistency is itself part of what makes it trustworthy

---

## 🌱 It Is A Rising Of The Burning... An Inflammation Of The Burning

A non-spreading, unchanged mark gets read as ordinary burn-scar inflammation rather than disease, the exact same logic used for the "burning boil" a few verses earlier. Two different injuries, boils and burns, end up following the identical reasoning.

🌱 Read as ordinary burn-scar inflammation, not disease

🔁 The exact same logic as the earlier "burning boil" case

📖 Two different injuries, one shared underlying rule

# Leviticus 13:29-37

# 💇 The Scall: Head And Beard

---

## 👫 If A Man Or Woman Have A Plague Upon The Head Or The Beard

This verse names women explicitly alongside men for the first time in the chapter's specific case list. The beard reference is naturally male-only, but the head condition applies to anyone, and the law makes a point of saying so.

👫 Women are explicitly named alongside men here

🧔 The beard case is naturally male-specific; the head case isn't

📖 A new body region requiring its own separate rule

---

## 🟡 A Yellow Thin Hair; Then The Priest Shall Pronounce Him Unclean: It Is A Dry Scall

"Scall" is an old word (from the Hebrew netek) for a scaly, itchy skin condition affecting the scalp or beard. Notice the marker itself changes here: it's yellow thin hair, not white hair like earlier in the chapter. That's because normal head and beard hair naturally comes in different colors than skin, so the diagnostic marker had to shift to match.

🟡 "Scall" means a scaly, itchy scalp or beard condition

🔄 The color marker shifts from white to yellow for this body region

🎯 A test carefully matched to how hair actually looks in this area

---

## ⚫ There Is No Black Hair In It

Black hair, the ordinary hair color assumed in this setting, showing up in the spot was read as reassuring. Its presence suggested normal, healthy hair growth rather than the sparse, discolored pattern tied to active disease.

⚫ Normal-colored hair present was read as a reassuring sign

🌱 Suggested healthy growth rather than active disease

🔁 The same "normal color present equals safer" logic seen before

---

## 🔒 Then The Priest Shall Shut Up Him That Hath The Plague Of The Scall Seven Days

Quarantine gets reapplied here for the fifth time in the chapter, now specifically for an uncertain head or beard case. The reader should recognize this pattern instantly by now.

🔒 The fifth use of the seven-day quarantine in this chapter

🔁 An instantly recognizable pattern by this point

⏳ Uncertainty still earns patience, not a rushed guess

---

## ✂️ He Shall Be Shaven, But The Scall Shall He Not Shave

This is a practical instruction: shave the surrounding hair so the priest can see the spot clearly, but leave the affected patch itself untouched. Shaving over the mark would erase the exact evidence (hair color and growth pattern) the priest needs to track.

✂️ Shave the surrounding area, but leave the mark itself alone

👁️ Keeps the exact evidence visible for tracking over time

🔍 A practical exam technique, not an arbitrary rule

---

## 🔒 The Priest Shall Shut Up Him That Hath The Scall Seven Days More

Just as with the very first case back in verses 4-5, a second week gets added when the first week's check still isn't conclusive. The head-and-beard case follows the exact same two-week structure already used for ordinary skin.

🔒 A second week added, mirroring the pattern from verses 4-5

🔁 The scall case follows the same two-week structure as before

📖 One process, applied consistently across different body regions

---

## 👕 The Priest Shall Pronounce Him Clean: And He Shall Wash His Clothes, And Be Clean

An unchanged, non-spreading scall after the full two-week watch earns the same clean verdict and clothes-washing close used throughout the rest of the chapter.

👕 The same clothes-washing close used throughout the chapter

🔁 An unchanged, non-spreading mark reads as clean here too

📖 Consistency across every different body region covered so far

---

## 🔁 If The Scall Spread Much In The Skin After His Cleansing

Just like the ordinary scab in verses 7-8 and the boil and burn cases before it, an already-cleared scall can still resurface and spread later, triggering a fresh examination rather than an automatic pass.

🔁 The same "cleared, but it came back" pattern seen before

👤 A fresh exam required rather than trusting the old verdict

📖 No status in this chapter is treated as permanently locked in

---

## 🚫 The Priest Shall Not Seek For Yellow Hair; He Is Unclean

Once visible spreading has already happened, the hair-color test becomes unnecessary. Spreading alone is now sufficient proof on its own; there's no need for a second confirming sign once the behavior has already answered the question.

🚫 Spreading alone is now enough proof, no second sign needed

🔑 Behavior can outweigh and replace an earlier diagnostic marker

📖 The law adapts its own standard of proof as evidence accumulates

---

## ⚫ If The Scall Be In His Sight At A Stay, And That There Is Black Hair Grown Up Therein; The Scall Is Healed

Normal-colored hair actually regrowing inside the spot is treated as strong, durable proof of real healing, closing the case for good. Unlike some other rulings in this chapter that stayed open to being revisited, healthy regrowth here reads as decisive.

⚫ Regrowth of normal hair color reads as durable proof of healing

🔒 Treated as a decisive, closing verdict rather than a temporary one

🌱 New growth, not just an absence of symptoms, settles this case

# Leviticus 13:38-39

# ⚪ Freckled Spots: Clean

---

## 👫 If A Man Also Or A Woman Have In The Skin Of Their Flesh Bright Spots

Both sexes are addressed again here, matching verse 29's pattern for the scall. This short passage introduces one more look-alike case, deliberately worded to sound similar to the disease markers described earlier in the chapter.

👫 Both men and women addressed, matching verse 29's pattern

🎭 A case worded to sound like the earlier disease markers

📖 A short passage with an important reassurance to offer

---

## 🎭 Even White Bright Spots

The vocabulary here ("bright spots," "white") deliberately echoes the language used for genuinely dangerous marks earlier in the chapter. A reader who only knew the earlier verses might panic at this description before reaching the actual verdict.

🎭 Language that deliberately echoes the earlier, serious cases

😟 Could sound alarming without reading the next verse

📖 Sets up a reassuring contrast the very next verse resolves

---

## 🔎 Darkish White; It Is A Freckled Spot That Groweth In The Skin

"Freckled spot" (Hebrew bohak) likely describes a harmless, common skin discoloration, something like ordinary blotchy pigment changes rather than any kind of disease. This verse exists specifically to reassure people that not every pale mark on the skin is dangerous.

🔎 "Bohak" likely means an ordinary, harmless pigment change

✅ Exists specifically to head off unnecessary worry

📖 Not every pale mark in this chapter is treated as disease

---

## ⚡ He Is Clean

No waiting period at all is required here, unlike almost every other borderline case in the chapter. A uniformly darkish-white, unchanging pattern was apparently recognizable enough on sight that the full seven-day process wasn't needed.

⚡ No seven-day wait required, unlike most borderline cases

👁️ Recognizable enough on sight to skip the observation period

📖 Proof the law distinguished true uncertainty from simple lookalikes

# Leviticus 13:40-44

# 👨‍🦲 Baldness And The Bald-Head Sore

---

## 👨‍🦲 The Man Whose Hair Is Fallen Off His Head, He Is Bald; Yet Is He Clean

Ordinary hair loss at the back or crown of the head is explicitly declared harmless, not a disease of any kind. This reassurance appears right before the chapter takes on baldness-related skin marks, making clear the baldness itself was never the concern.

👨‍🦲 Plain hair loss is explicitly declared harmless here

✅ Not treated as disease under any circumstance

📖 Sets up the real issue: not baldness, but marks within it

---

## 🧑 He That Hath His Hair Fallen Off From The Part Of His Head Toward His Face, He Is Forehead Bald: Yet Is He Clean

The law names both directions of natural hair loss: from the crown backward, and from the hairline forward. Covering both makes sure no ordinary pattern of aging or genetics ever gets mistaken for disease.

🧑 Names both crown baldness and receding-hairline baldness

📖 Deliberately thorough, covering every ordinary balding pattern

✅ Neither pattern was ever treated as a health concern on its own

---

## 🩹 A White Reddish Sore; It Is A Leprosy Sprung Up In His Bald Head

Baldness itself stays completely fine, but a genuinely new sore appearing within the already-bald area gets checked using the same core test used throughout the rest of the chapter. The bald skin isn't the problem; a new mark on it is.

🩹 Baldness stays fine; a new sore within it gets checked

🔍 Uses the same core test as the rest of the chapter

📖 The location changed, but the underlying test didn't

---

## 🔁 As The Leprosy Appeareth In The Skin Of The Flesh

This is an explicit cross-reference back to the original test from verses 2-3. Baldness doesn't get its own separate rulebook; it only gets its own starting condition, plugged into the same diagnostic system already established earlier.

🔁 An explicit callback to the original test from verses 2-3

📖 One system, reused rather than rebuilt for every new case

🎯 The starting condition changes; the underlying test doesn't

---

## ⚖️ He Is A Leprous Man, He Is Unclean: The Priest Shall Pronounce Him Utterly Unclean; His Plague Is In His Head

"Utterly unclean" is a stronger phrase than the plain "unclean" used elsewhere in the chapter. The text doesn't spell out exactly why the emphasis is stronger here, and it's worth being honest that the reason isn't explained, rather than guessing confidently at one.

⚖️ "Utterly unclean" is stronger wording than used elsewhere

📖 The text doesn't explain the reason for the added emphasis

🤔 Worth being honest about what the passage doesn't say

---

## 😄 An Ordinary, Unremarkable Trait

Baldness on its own being declared clean fits with how the rest of the Bible treats it elsewhere. In 2 Kings 2:23, children mock the prophet Elisha by calling him "bald head," a taunt that only makes sense if baldness was an ordinary, everyday trait, not something shameful or diseased in itself.

😄 Baldness elsewhere in Scripture is treated as ordinary, not shameful

📖 The taunt in 2 Kings 2:23 only makes sense if it was unremarkable

✅ Confirms this chapter's own "yet is he clean" verdict

# Leviticus 13:45-46

# 📢 Unclean, Unclean: Life Outside The Camp

---

## 👕 His Clothes Shall Be Rent

"Rent" means torn. Tearing one's own clothes was a recognized mourning custom used elsewhere in Scripture for grief and loss, such as Jacob tearing his clothes over Joseph in Genesis 37:34, or Job tearing his robe after losing everything. The leper is required to visibly display the same signal of grief.

👕 "Rent" means torn, an old but simple word

😢 A recognized mourning custom used elsewhere in the Bible

🎭 The leper visibly displays grief rather than hiding the condition

---

## 🧑‍🦲 His Head Bare

Uncovering the hair was another recognized mourning gesture. Interestingly, priests were specifically forbidden from doing this exact thing while on active duty back in chapter 10:6. The very same physical signal means "mourning, keep your distance" outside the sanctuary, and "don't do this" while serving inside it.

🧑‍🦲 Uncovering the hair, another standard mourning gesture

🔁 The opposite instruction was given to active priests in chapter 10:6

📖 Context changes what the identical gesture is meant to signal

---

## 🤐 A Covering Upon His Upper Lip

This likely means covering the lower part of the face, near the mouth. Similar imagery of covering the lips or face in grief or shame shows up elsewhere in Scripture, such as Ezekiel 24:17 and 22, and Micah 3:7. It communicated the person's condition to anyone approaching before a single word needed to be spoken.

🤐 Likely a covering over the lower face, near the mouth

📖 Similar imagery appears in Ezekiel 24 and Micah 3

👁️ Signals the condition silently, before any words are exchanged

---

## 📢 Shall Cry, Unclean, Unclean

The leper is required to self-announce their own status out loud, and the word is repeated twice for emphasis. This functioned as a built-in warning system, protecting the wider community from unknowingly making contact, not a humiliation ritual designed to shame the person.

📢 A required self-announcement, repeated twice for emphasis

🛡️ A practical warning system, protecting others from contact

⚖️ Functional, not designed purely to humiliate

---

## 🏕️ He Shall Dwell Alone; Without The Camp Shall His Habitation Be

Full removal from community life lasted only as long as the symptoms did, never a fixed sentence handed down in advance. This exact law explains several real narrative scenes elsewhere in Scripture: Miriam cast outside the camp for seven days in Numbers 12:14-15, King Uzziah living in a separate house until his death after being struck with leprosy in 2 Chronicles 26:19-21, and the ten lepers keeping their distance while calling out to Jesus in Luke 17:12-13.

🏕️ Removal lasted only as long as symptoms did, not a fixed term

📖 Explains Miriam's exile in Numbers 12 and Uzziah's isolation in 2 Chronicles 26

✝️ Also explains why the ten lepers kept their distance in Luke 17

---

## 🔄 All The Days Wherein The Plague Shall Be In Him He Shall Be Defiled

Unclean status here was tied strictly to active, present symptoms, never treated as a fixed identity. This detail matters directly for the next chapter, which lays out the full cleansing ritual for someone whose symptoms actually go away.

🔄 Status tied strictly to active symptoms, not a fixed identity

📖 Always described as reversible, never permanent

➡️ Sets up chapter 14's cleansing ritual for a recovered leper

# Leviticus 13:47-53

# 👕 Leprosy In A Garment

---

## 👕 The Garment Also That The Plague Of Leprosy Is In

The same Hebrew word used for the human skin condition now applies to fabric. This almost certainly describes mold, mildew, or a fungal growth staining cloth or leather, not a contagious human disease somehow spreading into an object.

👕 The same word now applies to fabric, not skin

🍄 Most likely describes mold, mildew, or fungal staining

📖 Not a literal human disease infecting an object

---

## 🧵 Whether It Be A Woollen Garment, Or A Linen Garment

Wool (from sheep) and linen (from flax) were the two main fabrics used in Israelite clothing at the time. Naming both covers essentially every common garment a person owned.

🧵 Wool and linen were the two primary Israelite fabrics

👕 Naming both covers nearly all common clothing

📖 A thorough, all-encompassing starting scope

---

## 🧶 The Warp, Or Woof

These are basic weaving terms. The warp is the set of lengthwise threads stretched tight on a loom first; the woof (also called the weft) is the crosswise threads woven back and forth through the warp afterward. Together, the two terms simply mean "the entire garment, however it was constructed."

🧶 Warp is the lengthwise threads set up first on a loom

🧵 Woof (weft) is the crosswise threads woven through them

📖 Together, the two words just mean "the whole garment"

---

## 🐐 Or In A Skin, Or In Any Thing Made Of Skin

The rule extends beyond woven cloth to leather goods as well, covering essentially anything made from animal hide, not just fabric that was spun and woven.

🐐 Extends the rule to leather items, not just woven cloth

📖 Covers essentially any material made from animal hide

🎯 A deliberately broad scope for this whole passage

---

## 🟢 If The Plague Be Greenish Or Reddish In The Garment

Unlike the human skin tests, which relied on depth and hair color, the fabric test relies on color alone. Greenish coloring suggests mold or mildew; reddish coloring suggests certain other fungal or bacterial staining.

🟢 The fabric test relies on color, unlike the depth-based skin tests

🍄 Greenish likely points to mold or mildew

🔴 Reddish likely points to a different kind of staining

---

## 🔒 The Priest Shall Look Upon The Plague, And Shut Up It That Hath The Plague Seven Days

The identical seven-day observation pattern used throughout the chapter for people gets reapplied here, now to an object instead of a person. The chapter's core method stays constant even as its subject changes completely.

🔒 The same seven-day pattern, now applied to an object

🔁 The method stays constant even as the subject changes

📖 A final reuse of the chapter's central diagnostic tool

---

## 🔥 The Plague Is A Fretting Leprosy

"Fret" (or "fretting") is an old word meaning to eat away at or corrode something gradually. Modern English still keeps a faint trace of this in "fretting" over worry, but the meaning here is completely literal: an active, spreading, consuming stain.

🔥 "Fret" means to eat away at or corrode gradually

📖 Modern "fretting" (worrying) is a faint echo of this older sense

🍄 Here it's completely literal: an active, spreading stain

---

## 🔥 He Shall Burn That Garment... It Shall Be Burnt In The Fire

Burning, rather than simply discarding, ensures the contamination is fully and permanently destroyed rather than risked being reused, resold, or passed along to someone else unaware of the danger.

🔥 Fire fully destroys the contamination, unlike simple discarding

⚠️ Prevents the item from being reused or passed along unaware

📖 A permanent solution to a spreading problem

---

## ✋ If The Plague Be Not Spread In The Garment

This closes the section on a note of possibility: not every marked garment was automatically doomed to burning. A non-spreading case opens the door to the gentler options explored in the final section of the chapter.

✋ Not every marked garment was automatically destroyed

🔓 Opens the door to gentler options explored next

📖 A deliberate transition into the chapter's closing passage

# Leviticus 13:54-59

# 🧺 Washing, Watching, And The Law's Close

---

## 🧺 Then The Priest Shall Command That They Wash The Thing Wherein The Plague Is

A middle option appears here for the first time in the fabric section: washing the item as an actual diagnostic test, checking whether the stain responds to washing, rather than jumping straight to a final ruling.

🧺 Washing used here as a diagnostic test, not just cleaning

🔍 Checks how the stain responds before any final ruling

📖 A middle option between immediate clearance and destruction

---

## 🔒 He Shall Shut It Up Seven Days More

The seven-day pattern reappears one final time, now specifically applied after the item has been washed, giving the stain time to reveal how it truly behaves once it's been tested.

🔒 The seven-day pattern's final appearance in the chapter

⏳ Time given to see how the stain behaves after washing

🔁 The chapter's central tool, used right up to its close

---

## ⚖️ If The Plague Have Not Changed His Colour, And The Plague Be Not Spread; It Is Unclean

This flips the usual rule. Elsewhere in the chapter, an unchanged, non-spreading mark usually meant clean, like the burning-boil scar earlier. But here, surviving an actual wash without fading is read as proof the stain has set in deep, not proof it's harmless.

⚖️ Reverses the usual "unchanged equals clean" pattern

🧺 Surviving a real wash is treated as proof of deep staining

📖 Context, not just the pattern itself, decides the meaning

---

## 🔥 It Is Fret Inward, Whether It Be Bare Within Or Without

"Fret inward" means the stain has worked its way into the fabric's actual structure, not just sitting on the surface. This holds true regardless of which side of the material shows the visible mark.

🔥 The stain has penetrated the fabric's structure itself

📖 True regardless of which side shows the visible mark

🔁 "Fret" carries the same corroding meaning as verse 51

---

## ✂️ If The Plague Be Somewhat Dark After The Washing Of It; Then He Shall Rend It Out Of The Garment

Fading after a wash allows a more targeted fix: cutting out just the affected patch rather than destroying the entire garment. The law offers every reasonable chance to salvage what can be saved before requiring a complete loss.

✂️ A targeted fix: cut out only the affected patch

💡 Offers a real chance to save the rest of the garment

📖 Destruction is treated as a last resort, not a first response

---

## 🔥 If It Appear Still In The Garment... It Is A Spreading Plague: Thou Shalt Burn That Wherein The Plague Is

If the stain keeps reappearing even after the affected section has already been cut away, the whole item is finally condemned. Every reasonable step to save the garment has already been tried and failed by this point.

🔥 Reappearance after cutting means the whole item is condemned

📖 Every reasonable option has already been exhausted by now

⚖️ Destruction only follows repeated, confirmed failure to resolve

---

## 👕 It Shall Be Washed The Second Time, And Shall Be Clean

The successful outcome closes the process: once the affected section is removed and gone for good, a second full wash finally clears the remaining garment for normal use again.

👕 The successful path: removal followed by a second wash

✅ Fully restored to normal use once truly clear

📖 Proof the process could end well, not only in destruction

---

## 📜 This Is The Law Of The Plague Of Leprosy In A Garment Of Woollen Or Linen

This closing line works like a title placed at the end, summarizing the whole garment section as one complete unit, the same pattern used to close chapter 11 back in verses 46-47. It also quietly sets up chapter 14's matching law for a house showing the same kind of plague.

📜 A closing summary title, matching chapter 11's ending pattern

🏠 Quietly sets up chapter 14's parallel law for houses

📖 One complete, self-contained unit of teaching now closed`;

export const LEVITICUS_THIRTEEN_PERSONAL_SECTIONS = parseLeviticusThirteenRawNotes(LEVITICUS_THIRTEEN_RAW_NOTES);
