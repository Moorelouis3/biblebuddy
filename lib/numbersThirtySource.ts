export type NumbersThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersThirtyRawNotes(rawText: string): NumbersThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 30:${startVerse}` : `Numbers 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 30 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_THIRTY_RAW_NOTES = `# Numbers 30:1-2
# 📜 The Law Of Vows Begins
---
## 🗣️ Moses Spake Unto The Heads Of The Tribes
The last two chapters ended with a quick mention of vows and freewill offerings tucked in among the festival calendar (Numbers 29:39). This chapter stops to explain, in full, exactly how a vow works and who has the authority to confirm or cancel one.
It's given to the heads of the tribes first, the family and clan leaders, because this is a law that plays out inside individual households, not something the priests would enforce at the altar.

📜 Follows directly from the vow mentioned back in 29:39

🏘️ Addressed to tribal and family leaders first, not the whole camp

🔑 A household law, not an altar law

## ✅ This Is The Thing Which The LORD Hath Commanded
This short line is a formula used across the Law to mark the start of a new, distinct set of instructions. It tells the reader this isn't Moses' personal advice about promises, it's a direct command from God.

✅ A standard opening formula for a new law section

📖 Signals this is God's command, not Moses' own idea

🔑 Prepares the reader for a fully new topic

## 🗣️ If A Man Vow A Vow Unto The LORD, Or Swear An Oath To Bind His Soul With A Bond
The Hebrew behind this verse actually uses two different words. A "vow" usually meant promising to *do* something for God, like bringing an offering. A "bond" (sometimes translated oath) usually meant promising to *not* do something, like giving up food or wine for a set time.

🗣️ A "vow" often promised to do something

🚫 A "bond" often promised to give something up

🔑 Both kinds of promise are covered by this one law

## ⚖️ He Shall Not Break His Word, He Shall Do According To All That Proceedeth Out Of His Mouth
Whatever a man said out loud to God, he was required to actually carry out. In this culture, a spoken vow carried the same weight as a signed contract does today, there was no "I didn't really mean it."

⚖️ Spoken words were treated like a signed contract

🙅 No excuse for a grown man to back out later

🔑 This baseline rule is what the rest of the chapter adjusts for others

# Numbers 30:3-5
# 👧 A Daughter's Vow, Weighed By Her Father
---
## 🏠 A Woman Also Vow A Vow...Being In Her Father's House In Her Youth
"In her father's house, in her youth" is the key phrase here: it means an unmarried young woman still living under her father's authority, not every woman in general. The rules in the next few verses only apply to this specific situation.

🏠 "Father's house" means still unmarried, living under him

👧 "In her youth" marks her as young and not yet independent

🔑 This law covers one specific case, not all women

## ✋ If A Woman Also Vow A Vow Unto The LORD
The word "also" matters. It ties straight back to verse 2 and says a woman has exactly the same standing as a man to make a real, binding vow directly to God. What's different isn't her ability to make the vow, it's who gets to confirm it.

✋ Women could make the same kind of binding vow as men

🔗 "Also" deliberately links back to the man's rule in verse 2

🔑 The difference here is about confirmation, not spiritual standing

## 🤐 Her Father Hear Her Vow...And Shall Hold His Peace At Her: Then All Her Vows Shall Stand
"Hold his peace" is an old idiom for staying completely silent. In this legal system, silence wasn't neutral, it counted as full approval. If the father said nothing when he found out, the vow became permanently binding.

🤐 An idiom for staying silent

✅ Silence legally counted as agreement

🔑 This same idiom returns for husbands later in the chapter

## 📌 Then All Her Vows Shall Stand, And Every Bond Wherewith She Hath Bound Her Soul Shall Stand
Once approved, either by silence or by not objecting, her vow locked in exactly like the man's vow in verse 2. Approval didn't create a weaker version of a vow, it created the same fully binding one.

📌 An approved vow was just as binding as a man's

🔒 No "soft" version of a confirmed vow existed

🔑 Approval makes it permanent, not provisional

## 🚫 If Her Father Disallow Her In The Day That He Heareth; Not Any Of Her Vows...Shall Stand
"Disallow" means to reject or cancel. But there's a time limit hidden in this phrase, "in the day that he heareth," the father had to act as soon as he found out, not months later after staying quiet.

🚫 "Disallow" means to reject or cancel the vow

⏰ He had to object as soon as he heard, not later

🔑 A time limit that matters again later in the chapter

## 🙏 And The LORD Shall Forgive Her, Because Her Father Disallowed Her
This is the striking part. Even though the vow gets cancelled, the text is careful to say God forgives her, not that she sinned. The decision was taken out of her hands by someone else's authority, so she isn't held guilty for a promise she no longer controls.

🙏 God forgives her rather than blaming her

🤲 The outcome wasn't fully in her control

🔑 This isn't about punishing her, it's about family authority over the decision

# Numbers 30:6-8
# 💍 A Vow She Brings Into Marriage
---
## 💍 If She Had At All An Husband, When She Vowed, Or Uttered Ought Out Of Her Lips
This covers a new situation: a woman made a vow while she was still unmarried, then got married before finishing it. Marriage transfers the authority to confirm or cancel that older vow from her father over to her new husband.

💍 A vow made before marriage, still unfulfilled at the wedding

🔁 Authority over it transfers from father to husband

🔑 The vow itself doesn't disappear just because she married

## 📝 Or Uttered Ought Out Of Her Lips, Wherewith She Bound Her Soul
"Ought" is an old word simply meaning "anything." This widens the rule beyond formal vows to cover any spoken promise she bound herself to, even something said casually rather than as a formal ceremony.

📝 "Ought" is an old word for "anything"

🗣️ Covers any spoken promise, not just formal vows

🔑 The law closes a loophole around informal promises

## 🤐 And Her Husband Heard It, And Held His Peace At Her In The Day That He Heard It: Then Her Vows Shall Stand
The exact same silence-equals-approval rule from the father now applies to the husband. And the same time limit is repeated too, "in the day that he heard it," he has to respond right when he learns of it.

🤐 The same silence-as-approval rule, now for husbands

⏰ Same same-day time limit as verse 5

🔑 The law repeats itself deliberately, not by accident

## 🚫 If Her Husband Disallowed Her On The Day That He Heard It...Of None Effect: And The LORD Shall Forgive Her
"Of none effect" is legal language for "cancelled, with no power at all." It's the marriage version of "disallow" from the father's case, same idea, same forgiveness promise attached at the end.

🚫 "Of none effect" means fully cancelled, no power left

🔁 The marriage version of the father's "disallow" rule

🔑 The forgiveness promise carries over into marriage too

## 👨‍👩‍👧 He Shall Make Her Vow...Of None Effect
Notice the text says the husband makes it void, not that it simply fades away. The cancelling is an active legal act on his part, something he has to actually do and be responsible for, not a default that just happens.

👨‍👩‍👧 Cancelling a vow was an active decision, not a default

📋 The husband bears responsibility for that choice

🔑 This detail sets up the warning coming in verse 15

## 🙏 And The LORD Shall Forgive Her
This is the second time in the chapter this exact forgiveness line appears, once for a daughter, now for a wife. The repetition itself is the point: whoever holds authority over the decision, God does not hold the woman guilty for it.

🙏 The second appearance of this exact forgiveness formula

🔁 Same principle, now applied inside marriage

🔑 The repetition is deliberate, not filler

# Numbers 30:9
# 🕊️ A Widow Or Divorced Woman Answers To No One
---
## 🕊️ Every Vow...Of A Widow, And Of Her That Is Divorced, Wherewith They Have Bound Their Souls, Shall Stand Against Her
A widow has no living husband, and a divorced woman is no longer under a husband's authority. With no father or husband positioned to confirm or cancel her vow, it simply stands, permanently, with no one able to overturn it.

🕊️ No husband and no father means no one left to cancel it

🔒 Her vow is automatically permanent, with no override

🔑 The shortest verse in the chapter, but a complete legal category

## ⚖️ Shall Stand Against Her
This single detail reveals what this whole chapter is really about. It was never about doubting a woman's word or judgment, it was about who managed a household's shared resources and commitments. Step outside that household structure entirely, and full authority over her own vows returns automatically, same as any man's.

⚖️ The rule was about household authority, not personal trustworthiness

👤 A widow or divorced woman has the same standing as a man here

🔑 Removes any doubt about why the earlier verses worked the way they did

# Numbers 30:10-12
# 🏡 A Vow Made Inside The Marriage
---
## 🏡 And If She Vowed In Her Husband's House, Or Bound Her Soul By A Bond With An Oath
This is a different case than verses 6-8. There, she brought an existing vow into the marriage. Here, she makes a brand new vow after the wedding, while already living under her husband's authority the whole time.

🏡 A new vow made after the wedding, not carried in from before

🆚 A separate legal case from verses 6-8

🔑 The law spells out each situation on its own, even when the outcome is the same

## 📝 Or Bound Her Soul By A Bond With An Oath
The chapter repeats both words, vow and bond, one more time here. That's the same "do something" versus "give something up" distinction from verse 2, showing this married-life case still covers both kinds of promise.

📝 Both "vow" and "bond" appear again, just like verse 2

🔁 Confirms both promise types apply inside marriage too

🔑 Nothing about being married narrows which vows count

## 🤐 Her Husband Heard It, And Held His Peace At Her, And Disallowed Her Not: Then All Her Vows Shall Stand
Silence-as-approval appears a third time, once for the father, once for a pre-marriage vow, and now for a vow made inside the marriage. Each situation gets its own explicit statement even though the underlying rule never changes.

🤐 The third appearance of the silence-as-approval rule

📖 Each case is spelled out on its own, not left to assumption

🔑 Legal precision, not needless repetition

## 🔁 And Disallowed Her Not
This phrase uses a double negative on purpose, "disallowed her not," to state plainly that the husband definitely did not object. Ancient legal language often stacked words like this to remove any possible ambiguity about which way the decision went.

🔁 A double negative used for total clarity

📜 A common style in ancient legal wording

🔑 Leaves zero room to argue he secretly objected

## ❌ If Her Husband Hath Utterly Made Them Void
"Utterly" means completely, with nothing left standing. There's no partial cancellation here, a husband either lets the whole vow stand or voids the whole thing, not a piece of it.

❌ "Utterly" means completely voided, no partial option

⚖️ No middle ground between fully standing and fully cancelled

🔑 A clean, all-or-nothing rule

## 🙏 Her Husband Hath Made Them Void; And The LORD Shall Forgive Her
The forgiveness formula appears a third and final time, covering every situation this chapter lists: an unmarried daughter, a wife who brought in an old vow, and a wife who made a brand new one. In every case, the woman is never described as guilty for a decision made over her head.

🙏 The third and final appearance of this forgiveness formula

📊 Covers all three of the chapter's main scenarios

🔑 A pattern too consistent to be accidental

# Numbers 30:13-15
# ⚖️ The Husband's Window To Decide
---
## 😔 Every Vow, And Every Binding Oath To Afflict The Soul
"Afflict the soul" is the same idiom used back in Numbers 29:7 for the Day of Atonement, an old phrase for fasting and serious self-denial. This confirms that many of the vows and bonds this chapter has in mind were commitments to give something up, not just promises to bring an offering.

😔 The same fasting idiom used for the Day of Atonement in 29:7

🍽️ Confirms many of these vows involved giving something up

🔑 Links this chapter back to the festival calendar just before it

## ⚖️ Her Husband May Establish It, Or Her Husband May Make It Void
This verse sums up the husband's whole role in one line before the chapter moves to timing. He has exactly two options, confirm it or cancel it, nothing in between, and no one else gets to make the call for him.

⚖️ Only two options: establish it or void it

👤 The decision belongs to the husband alone

🔑 A summary line before the chapter turns to timing

## 📅 If Her Husband Altogether Hold His Peace At Her From Day To Day
"From day to day" means ongoing silence over multiple days, not just staying quiet for one single moment. Extended silence locks in approval for good, closing off any chance to raise an objection much later.

📅 "Day to day" means silence stretched over time, not a single instant

🔒 Extended silence locks in approval permanently

🔑 Closes any loophole to object after the fact

## ✅ Then He Establisheth All Her Vows...Because He Held His Peace At Her In The Day That He Heard Them
This makes explicit what was only implied back in verses 5 and 7: a prompt response is required. Waiting isn't a neutral, safe choice, it's treated exactly the same as saying yes out loud.

✅ Makes the "respond promptly" rule explicit for the first time

🗣️ Silence is treated exactly like a spoken yes

🔑 There's no such thing as a truly neutral non-answer here

## 🔄 But If He Shall Any Ways Make Them Void After That He Hath Heard Them
This is the sharpest turn in the whole chapter. A husband can't sit on his hands for a while and then suddenly decide to cancel a vow he already, in effect, approved of by staying silent. Trying to void it late doesn't work the way it would have on day one.

🔄 A late attempt to cancel doesn't work like an early one

⏳ Waiting has already counted as approval by this point

🔑 The window for objecting has already closed

## ⚠️ Then He Shall Bear Her Iniquity
If a husband tries to cancel a vow after the window has passed, the guilt of the broken vow transfers to him instead of her. Delaying a decision and then reversing it doesn't protect him, it makes him legally and morally responsible in her place.

⚠️ The guilt for the broken vow shifts to the husband

🙅 Procrastinating doesn't shield him from responsibility

🔑 The chapter's clearest warning against putting off a hard decision

# Numbers 30:16
# 📖 The Statutes Moses Passed On
---
## 📖 These Are The Statutes, Which The LORD Commanded Moses, Between A Man And His Wife, Between The Father And His Daughter
This closing line mirrors how Numbers 29 ended, God gives the command, and Moses faithfully passes on every detail without softening or editing it. It also names the chapter's two relationships plainly: husband-and-wife, and father-and-daughter.

📖 Bookends the chapter the same way Numbers 29 closed itself

✅ Confirms Moses passed the law on exactly as given

🔑 Names the two relationships this whole chapter has covered

## 👤 Being Yet In Her Youth In Her Father's House
Notice what this closing verse does not mention: a married man's own vow, or an adult unmarried woman with no father at all. Those cases were already answered earlier, verse 2 for the man, verse 9 for a widow or divorced woman, so this summary only needs to name the two situations where someone else's approval was required.

👤 Doesn't repeat the cases already fully settled earlier

🧩 Verse 2 and verse 9 already cover the missing cases

🔑 A tight, deliberate summary, not an incomplete one
`.trim();

export const NUMBERS_THIRTY_PERSONAL_SECTIONS = parseNumbersThirtyRawNotes(NUMBERS_THIRTY_RAW_NOTES);
