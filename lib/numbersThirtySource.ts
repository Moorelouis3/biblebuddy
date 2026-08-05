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
# 📜 Moses Delivers The Law Of Vows
---
## 🏛️ The Heads Of The Tribes

"Heads of the tribes" means the leaders of Israel's twelve family lines.

Earlier laws in this book were announced to the whole camp or handed to the priests.

This one goes straight to those household leaders instead.

A vow was a private promise inside a family, not a sacrifice at the altar.

The men responsible for enforcing it were the ones who heard it first.

🏛️ Tribal heads means family and clan leaders

📜 Earlier laws addressed the whole camp

🏠 This law is aimed at households

📖 Household leaders heard this law first

## ✅ This Is The Thing Which The LORD Hath Commanded

This exact sentence works like a stamp used across the Law.

It marks the start of a new, separate set of instructions.

Numbers 29 ended with nearly the same words in reverse order.

That link ties the vow law directly to the chapter just before it.

This is God's command, not Moses' own personal opinion.

✅ A formula marking a new law section

🔗 Ties directly back to Numbers 29's ending

📋 Marks God's command, not Moses' opinion

📖 Two chapters meant to be read together

## 🗣️ Swear An Oath To Bind His Soul With A Bond

The Hebrew behind this verse actually uses two separate words.

A vow usually meant promising to do something for God.

A bond, sometimes translated oath, usually meant promising to give something up.

Fasting, or avoiding wine, are both examples of a bond.

Both kinds of promise carried the same binding weight before the LORD.

🗣️ A vow usually promised to do something

🚫 A bond usually meant giving something up

🍷 Fasting or avoiding wine counted as a bond

📖 Both kinds of promise bound a person fully

## ⚖️ He Shall Not Break His Word

Whatever a man said out loud to God, he had to carry out.

In this culture, a spoken vow carried the same weight as a signed contract today.

Think of promising something in front of witnesses at a wedding.

Walking it back afterward was never treated as a small thing.

There was no room here for a grown man to say he did not mean it.

⚖️ Spoken words worked like a signed contract

🤝 Culture treated a vow as a public promise

🙅 No excuse to say he changed his mind

📖 A spoken vow could not be walked back

# Numbers 30:3-5
# 👧 A Daughter's Vow, Weighed By Her Father
---
## 🏠 Being In Her Father's House In Her Youth

"In her father's house, in her youth" means an unmarried young woman still living under her father's authority.

It does not describe every woman in Israel.

The next few verses apply only to this one case.

A married woman, a widow, and a divorced woman each get a separate rule later.

This verse simply narrows who the following law covers.

🏠 The phrase means an unmarried young woman

👧 She still lives under her father's authority

🎯 This law covers one narrow case

📖 Other women get their own rules later

## 🤐 Her Father Shall Hold His Peace At Her

"Hold his peace" is an old idiom for staying completely silent.

In this legal system, silence was never treated as neutral.

If the father said nothing after he learned of the vow, it became fully binding.

This same idiom returns later in the chapter for husbands.

Watch for it again once marriage enters the picture.

🤐 Hold his peace means staying silent

✅ Silence counted as full legal agreement

🔁 The same idiom returns later for husbands

📖 Saying nothing was never a neutral choice

## ⏰ If Her Father Disallow Her In The Day That He Heareth

"Disallow" means to reject or cancel a vow outright.

A hidden time limit sits inside this verse.

"In the day that he heareth" means the father had to act right away.

Waiting weeks or months to object was never an option.

This same day rule returns later in the chapter for husbands.

🚫 Disallow means to reject or cancel

⏰ He had to object the same day

🙅 Waiting months to object was not allowed

📖 The same time limit returns for husbands

## 🙏 And The LORD Shall Forgive Her

This is the striking part of the whole verse.

The vow gets cancelled, yet the text never says she sinned.

The decision was taken out of her hands by someone else's authority.

God does not hold her guilty for a promise she no longer controls.

This exact line of forgiveness will return two more times in this chapter.

🙏 God forgives her instead of blaming her

🤲 The decision was never fully in her control

🔁 This forgiveness line returns twice more

📖 Authority over the vow does not equal guilt

# Numbers 30:6-8
# 💍 A Vow She Carries Into Marriage
---
## 💍 If She Had At All An Husband, When She Vowed

This verse covers a new situation entirely.

A woman made a vow before her wedding day.

She then married before she had finished keeping it.

Marriage transfers the authority to confirm or cancel that vow from her father to her husband.

The vow itself does not disappear just because a wedding happened.

💍 A vow made before she was married

🔁 Authority shifts from her father to her husband

🚫 A wedding does not erase an old vow

📖 One promise, now under new authority

## 📝 Or Uttered Ought Out Of Her Lips

"Ought" is an old word simply meaning anything.

This widens the law beyond formal, ceremonial vows.

Even something said casually could still bind her soul.

The law closes any loophole around an informal promise.

A promise did not need a ritual to count.

📝 Ought is an old word for anything

🗣️ The law covers casual promises too

🔓 No loophole for an informal vow

📖 A promise never needed a ceremony to count

## 🤐 Held His Peace At Her In The Day That He Heard It

The exact same silence rule from her father now applies to her husband.

The same time limit is repeated as well.

He had to respond the moment he learned of the vow.

Marriage changed who held the authority, not the underlying rule itself.

🤐 The father's silence rule now covers husbands

⏰ He had to respond the same day

🔁 Marriage changes the authority, not the rule

📖 The same law, carried into a new home

## 🚫 Of None Effect

"Of none effect" is legal language for cancelled, with no power left.

It is the marriage version of "disallow" from the father's case.

The same forgiveness promise gets attached at the end of this verse too.

A husband cancelling a vow did not make his wife guilty of anything.

🚫 Of none effect means fully cancelled

🔁 The marriage version of disallow

🙏 The same forgiveness promise applies here

📖 Cancelling a vow never equals guilt

# Numbers 30:9
# 🕊️ A Widow Answers To No One
---
## 🕊️ Every Vow Of A Widow, And Of Her That Is Divorced

A widow has no living husband.

A divorced woman is no longer under a husband's authority.

Neither one has a father or husband left to confirm or cancel a vow.

With no one left to weigh in, the vow simply stands on its own.

🕊️ A widow has no living husband

🚪 A divorced woman answers to no husband

🔒 No one is left to cancel her vow

📖 Her vow stands permanently on its own

## ⚖️ Shall Stand Against Her

This one detail reveals what this whole chapter is actually about.

It was never about doubting a woman's word or judgment.

It was about who managed a household's shared resources and commitments.

Step outside that household structure, and full authority over her own vow returns.

That authority matches exactly what a man already held from verse two.

⚖️ The law was about household authority

🙅 Never about doubting a woman's judgment

👤 Outside a household, full authority returns

📖 Her standing matches a man's from verse two

# Numbers 30:10-12
# 🏡 A New Vow Made Inside Marriage
---
## 🏡 If She Vowed In Her Husband's House

This is a different situation than verses six through eight.

There, she brought an existing vow into the marriage with her.

Here, she makes a brand new vow after the wedding already happened.

She was living under her husband's authority the entire time.

The law spells out each case on its own, even when the outcome matches.

🏡 A brand new vow made after the wedding

🆚 A separate case from verses six through eight

📋 Each situation gets spelled out on its own

📖 Same outcome, different starting point

## 🔁 Disallowed Her Not

This phrase uses a double negative on purpose.

"Disallowed her not" states plainly that the husband did not object.

Ancient legal language often stacked words like this for total clarity.

The wording leaves no room to argue he secretly disapproved.

🔁 A double negative used on purpose

📜 A common style in ancient legal wording

🚫 Leaves no room for a hidden objection

📖 Clarity mattered more than short phrasing

## ❌ Utterly Made Them Void

"Utterly" means completely, with nothing left standing.

There is no partial cancellation available in this law.

A husband either let the whole vow stand or voided all of it.

Splitting a vow into pieces was never an option.

❌ Utterly means completely voided

⚖️ No partial cancellation was allowed

🚫 A vow could not be split apart

📖 All or nothing, with nothing in between

# Numbers 30:13-15
# ⚖️ The Husband's Window To Decide
---
## 😔 Every Binding Oath To Afflict The Soul

"Afflict the soul" is the same idiom used for the Day of Atonement.

Numbers 29:7 already used this exact phrase for fasting.

Many of the vows in this chapter were promises to give something up.

Fasting or another form of self denial were common examples.

This detail links the vow law directly back to the festival calendar before it.

😔 Afflict the soul is the fasting idiom

🔗 Numbers 29:7 already used this phrase

🍽️ Many vows involved giving something up

📖 This detail ties back to the festival calendar

## ⚖️ Establish It, Or Make It Void

This verse sums up the husband's whole role in one line.

He has exactly two options available to him.

He can establish the vow, or he can void it.

Nothing in between exists, and no one else makes this call for him.

⚖️ Only two options exist here

✅ He can establish the vow

❌ Or he can void it completely

📖 No one else can make this decision

## 📅 From Day To Day

"Day to day" means the silence stretched over time, not just one moment.

This was not a single quiet pause.

Extended silence across many days locked in approval for good.

It closed off any chance to raise an objection much later.

📅 Day to day means silence over time

🔒 Extended silence locked in approval for good

🚪 It closed the door on a late objection

📖 Waiting too long meant losing the chance

## ⚠️ Then He Shall Bear Her Iniquity

A husband could not stay silent for days and then suddenly object.

Trying to void a vow late did not work like objecting on day one.

If he tried anyway, the guilt of the broken vow shifted to him.

Delaying a decision did not protect him from responsibility.

It made him legally responsible in his wife's place instead.

⚠️ Guilt shifted to the husband instead

🙅 Delaying did not protect him

🔄 A late objection carried no weight

📖 He became responsible in his wife's place

# Numbers 30:16
# 📖 The Statutes Moses Passed On
---
## 📚 These Are The Statutes, Which The LORD Commanded Moses

This closing line mirrors how Numbers 29 ended.

God gave the command, and Moses passed on every detail faithfully.

Chapters 29 and 30 now bookend each other from start to finish.

Nothing in either chapter was softened or left out along the way.

📚 Mirrors how Numbers 29 closed

🔁 God commanded, Moses passed it on fully

🧩 Two chapters bookend each other

📖 Nothing here was softened or left out

## 👤 Being Yet In Her Youth In Her Father's House

Notice what this closing verse leaves out entirely.

A married man's own vow is not mentioned again here.

An adult unmarried woman with no father is not mentioned either.

Verse two already answered the man's case.

Verse nine already answered the widow's case.

This summary only needed to name the two cases where someone else's approval mattered.

👤 The verse leaves two cases unmentioned

✅ Verse two already covered the man's case

🕊️ Verse nine already covered the widow's case

📖 A tight summary, not an incomplete one
`.trim();

export const NUMBERS_THIRTY_PERSONAL_SECTIONS = parseNumbersThirtyRawNotes(NUMBERS_THIRTY_RAW_NOTES);
