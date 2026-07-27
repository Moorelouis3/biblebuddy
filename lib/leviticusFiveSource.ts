export type LeviticusFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusFiveRawNotes(rawText: string): LeviticusFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 5:${startVerse}` : `Leviticus 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 5 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_FIVE_RAW_NOTES = `# Leviticus 5:1-4

# 🤐 Four Ways To Become Guilty Without Meaning To

---

## 🗣️ If A Soul Sin, And Hear The Voice Of Swearing, And Is A Witness

"The voice of swearing" means a public oath - someone in a legal dispute standing up and putting a claim on oath, calling anyone who knows the truth to come forward. A "witness" here is a person who actually saw or knew the facts of the case.

🗣️ "The voice of swearing" means a formal, public legal oath

👁️ A witness is someone who genuinely saw or knew the truth

⚖️ This describes a real dispute, not a casual conversation

---

## 🤐 If He Do Not Utter It, Then He Shall Bear His Iniquity

This is the first case in the chapter, and it's different from every sin covered in chapter 4. Chapter 4 dealt with doing something forbidden. This is a sin of staying silent - a witness who knew the truth and said nothing when the law required them to speak up.

"Iniquity" means guilt and its consequences. "Bear his iniquity" means the guilt is now his to carry and answer for, not something that just fades away with time.

🤐 This sin is failing to speak, not doing something forbidden

⚖️ Chapter 4 covered wrong actions; this chapter starts covering wrong silence

📖 "Iniquity" means guilt, and "bear" means it becomes his responsibility to deal with

---

## 🐫 Or If A Soul Touch Any Unclean Thing, Or The Carcase Of An Unclean Beast

A "carcase" is a dead body. Touching a dead unclean animal made a person ceremonially unclean under the purity laws (fully explained later in Leviticus 11) - not a moral sin by itself, but a state that had to be dealt with before that person could take part in worship again.

🐫 "Carcase" means a dead body, here a dead animal's

🚫 Touching it made a person ceremonially unclean, not automatically sinful

📖 Leviticus 11 later spells out exactly which animals count as unclean

---

## 🙈 And If It Be Hidden From Him; He Also Shall Be Unclean, And Guilty

"Hidden from him" means he didn't realize at the time that he'd touched something unclean - maybe he brushed past it in the dark, or didn't recognize what it was. The guilt here isn't for touching it on purpose; it's for not dealing with the uncleanness once he does realize it.

🙈 "Hidden from him" means he didn't notice or realize it at the time

🔁 This matches chapter 4's whole theme: unintentional guilt still needs handling

⏰ The guilt attaches once he becomes aware, not the moment it happened

---

## 🧍 Or If He Touch The Uncleanness Of Man...When He Knoweth Of It, Then He Shall Be Guilty

This third case covers touching another person's ceremonial uncleanness - bodily conditions Leviticus 12-15 will cover in detail later (like childbirth or skin disease). Same pattern as the animal carcase: the uncleanness happens first, awareness comes later, and guilt begins at the moment of realizing it.

🧍 This covers contact with another person's ceremonial uncleanness

📖 Leviticus 12-15 later explains exactly which human conditions count

🔁 Same pattern again: guilt starts once the person becomes aware

---

## 🗯️ Or If A Soul Swear, Pronouncing With His Lips To Do Evil, Or To Do Good

This fourth case is different from the courtroom oath in verse 1 - this is a personal, private vow, made rashly with the mouth, promising to do something (good or bad) without thinking it through first. "Pronouncing with his lips" stresses that words alone, spoken out loud, created a binding obligation.

🗯️ This is a rash personal vow, not the courtroom oath from verse 1

🗣️ "Pronouncing with his lips" means the spoken words themselves created the obligation

💭 Numbers 30 later covers vows in even more detail

---

## 📢 And It Be Hid From Him; When He Knoweth Of It, Then He Shall Be Guilty In One Of These

All four scenarios in this section - silent witness, touching an unclean carcase, touching human uncleanness, and a careless oath - end with the exact same rule: guilt begins the moment the person realizes what happened, not before. This closes the pattern before the chapter moves on to what to do about it.

📢 All four cases share one closing rule: guilt starts at the moment of realization

🔁 This groups four very different situations under one shared principle

🎯 The next verses explain what a guilty person is now required to do

# Leviticus 5:5-6

# 🗣️ Confess, Then Bring An Offering

---

## 🗣️ He Shall Confess That He Hath Sinned In That Thing

This is a new requirement not spelled out back in chapter 4: an actual spoken confession, naming the specific sin, comes before the offering. It isn't enough to quietly bring an animal - the person has to first admit out loud what they did.

🗣️ Confession here means speaking the specific sin out loud

🆕 Chapter 4 didn't spell out a confession step this plainly

✅ Owning the sin comes before the ritual that deals with it

---

## 🔀 One Offering Covers All Four Situations

Whether the guilt came from silence as a witness, touching a dead animal, touching human uncleanness, or a careless oath, the required offering is exactly the same: a female lamb or goat, the same tier chapter 4 set for an ordinary Israelite's sin offering. Four different-looking situations, but Leviticus treats them as one category: unintentional guilt discovered after the fact.

🔀 All four scenarios in verses 1-4 share this identical offering

🐑 It matches the ordinary Israelite's tier already set in chapter 4

🧩 Leviticus treats these as one category despite looking different on the surface

---

## 🐑 A Female From The Flock, A Lamb Or A Kid Of The Goats, For A Sin Offering

"Trespass offering" and "sin offering" appear together in this same verse describing one single animal - a reminder that these Hebrew terms overlapped in everyday use even though later verses in this chapter (starting at v14) will treat "trespass offering" as its own distinct, separate category.

🐑 A female lamb or goat, the same choice given in chapter 4:28-35

🔤 "Trespass" and "sin offering" describe the same animal here

📖 Verse 14 onward introduces a truly separate trespass offering category

---

## ✝️ The Priest Shall Make An Atonement For Him Concerning His Sin

The same atonement formula from chapter 4 closes this section too. No matter which of the four situations applied, the outcome is identical: the priest performs the ritual, and the guilt is dealt with. The path to being made right stays constant even while the details of the sin vary widely.

✝️ Same atonement promise already used repeatedly in chapter 4

🎯 One consistent outcome no matter which of the four sins applied

🔁 The ritual process, not the sin itself, determines the offering required

# Leviticus 5:7-10

# 🕊️ Too Poor For A Lamb? Bring Two Birds

---

## 🕊️ If He Be Not Able To Bring A Lamb

This begins an economic accommodation that runs the rest of the chapter. Nobody was priced out of forgiveness - if a lamb or goat was genuinely out of reach, the law immediately offers a cheaper path instead of demanding the impossible.

🕊️ This introduces a cheaper option for those who can't afford a lamb

💰 The system never let cost become a wall to forgiveness

📖 An even cheaper option follows in verse 11 for those who can't afford this

---

## 🕊️ Two Turtledoves, Or Two Young Pigeons

Turtledoves and young pigeons were common, inexpensive birds that even a poor family could usually catch or raise. Luke 2:24 records Mary and Joseph bringing exactly this offering at Jesus's dedication - a quiet detail showing Jesus's family fit this lower economic tier.

🕊️ These were cheap, common birds available even to the poor

✝️ Luke 2:24 shows Mary and Joseph bringing this exact offering

👶 It's a small clue about the economic situation of Jesus's own family

---

## 🔀 One For A Sin Offering, And The Other For A Burnt Offering

The two birds don't do identical jobs. The first bird replaces the lamb or goat as the sin offering dealing with the guilt. The second bird becomes an additional burnt offering, a category covered back in chapter 1 - meaning this cheaper option actually includes an extra offering the lamb/goat tier didn't require.

🔀 The two birds serve two different offering purposes, not one

🐑 The first bird stands in for the lamb or goat sin offering

🔥 The second bird adds a burnt offering, from chapter 1's category

---

## ✂️ Wring Off His Head From His Neck, But Shall Not Divide It Asunder

"Wring off" means twisting the head to kill the bird, a method suited to something this small - very different from the throat-cutting used on larger animals in chapters 1 and 4. "Not divide it asunder" means don't tear the bird fully into two pieces; it stays mostly whole.

✂️ "Wring off" means twisting, a killing method fit for a small bird

🔪 This differs from the throat-cutting used on larger animals earlier

🧩 "Not divide it asunder" means the bird isn't torn fully apart

---

## 🩸 Sprinkle Of The Blood...Upon The Side Of The Altar

A bird has far too little blood to apply to the altar's horns the way a bullock's or goat's blood was in chapter 4. Instead, the blood is simply sprinkled on the altar's side - the ritual scales down to match what the animal can actually provide.

🩸 A bird's blood is applied to the altar's side, not its horns

📏 This scales the ritual down to match the animal's small size

🔁 The principle (blood applied to the altar) still holds even at this scale

---

## ⬇️ The Rest Of The Blood Shall Be Wrung Out At The Bottom Of The Altar

Same leftover-blood principle from chapter 4, just applied to a far smaller amount. Even a few drops of leftover blood were never simply discarded - they were disposed of at the altar's base, same as a full bullock's blood.

⬇️ Same base-of-the-altar disposal principle used throughout chapter 4

🔁 It applies even when the leftover amount is just a few drops

🚫 Blood was never treated as ordinary waste, regardless of quantity

---

## 🔥 He Shall Offer The Second For A Burnt Offering, According To The Manner

"According to the manner" points back to chapter 1's detailed fowl instructions instead of repeating them. Leviticus assumes the reader already knows the burnt-offering procedure for birds by this point in the book.

🔥 "According to the manner" cross-references chapter 1's bird instructions

✂️ Leviticus shortens repeated instructions once already fully explained

📖 Chapter 1:14-17 is exactly where that fowl procedure was first given

---

## ✝️ The Priest Shall Make An Atonement For Him...And It Shall Be Forgiven Him

The same closing promise as every tier so far: whether the offering was a bullock, a goat, a lamb, or now two birds, the outcome is identical forgiveness. Poverty changed the animal required; it never changed the result.

✝️ Same atonement-and-forgiveness formula repeated for this poorer tier

💰 A cheaper offering still produced the exact same forgiveness

📏 Only the animal's cost changes across every tier - never the outcome

# Leviticus 5:11-13

# 🌾 Too Poor For Birds? Bring Flour

---

## 🌾 If He Be Not Able To Bring Two Turtledoves

A third and even lower economic tier: someone too poor to afford even two cheap birds. Leviticus keeps lowering the bar rather than ever telling someone forgiveness is simply out of their reach.

🌾 This is the third and lowest economic tier in the chapter

💰 It exists for someone who can't afford even the cheap bird option

🙌 Nobody in Israel was ever priced entirely out of atonement

---

## 🌾 The Tenth Part Of An Ephah Of Fine Flour

An ephah was a dry measure, roughly two-thirds of a bushel. A tenth of an ephah is the same amount called an "omer" elsewhere in the Bible - the exact portion of manna God provided per person, per day, in Exodus 16:16. Even the poorest sinner's offering echoes God's own daily provision for His people.

🌾 An ephah is a dry measure, roughly two-thirds of a bushel

🍞 A tenth of an ephah equals one omer, the same unit from the manna story

📖 Exodus 16:16 uses this identical amount as one person's daily food portion

---

## 🚫 He Shall Put No Oil Upon It, Neither Shall He Put Any Frankincense Thereon

Chapter 2's grain offering required both oil and frankincense as marks of a joyful, willing gift. Leaving them out here is deliberate: withholding these costly extras marks this specific flour as a sin offering, dealing with guilt, not a celebratory gift like the grain offering in chapter 2.

🚫 Oil and frankincense were required for the joyful grain offering in chapter 2

⚠️ Leaving them out here marks this as a somber sin offering instead

🎯 The missing ingredients are a deliberate signal, not an oversight

---

## ✋ The Priest Shall Take His Handful Of It, Even A Memorial Thereof

"Memorial" is the same term used for the grain offering's handful back in chapter 2 - a symbolic token portion representing the whole gift, burned to represent the entire offering being given to God even though only a handful actually goes on the fire.

✋ "Memorial" is the same term chapter 2 used for its symbolic handful

🔥 Only a small portion is burned, standing in for the whole offering

🔁 This reuses chapter 2's grain-offering procedure rather than inventing a new one

---

## 🔥 Burn It On The Altar, According To The Offerings Made By Fire Unto The LORD

Another cross-reference back to earlier chapters instead of repeating full instructions - by this point in Leviticus, the reader is expected to already understand what "offerings made by fire" involves.

🔥 This phrase again links back to the burnt, grain, and peace offerings

✂️ Leviticus shortens instructions once a pattern is already established

🔗 It ties this flour offering into the same family as every earlier type

---

## 🍞 The Remnant Shall Be The Priest's, As A Meat Offering

"Meat offering" here doesn't mean animal meat - in KJV English it's an old term for a grain offering (from chapter 2). The leftover flour, after the priest's memorial handful is burned, became food for the priests, meaning even the poorest sinner's offering still fed the men who served at the tabernacle.

🍞 "Meat offering" in the KJV means a grain offering, not animal meat

🍽️ The leftover flour became actual food for the priests

🙏 Even the smallest, cheapest offering still fed those who served

# Leviticus 5:14-16

# ⚠️ Sinning Against Holy Things

---

## 📜 And The LORD Spake Unto Moses, Saying

This formula marks a new topic starting mid-chapter. Everything from here to the end of chapter 5 shifts from the "sin offering" (Hebrew chattat) covered so far to a related but distinct category: the "trespass offering" (Hebrew asham).

📜 This formula signals a fresh topic beginning partway through the chapter

🔀 Verses 1-13 covered the sin offering; verses 14-19 cover the trespass offering

📖 These are related but genuinely separate categories in Leviticus

---

## ⚠️ If A Soul Commit A Trespass...In The Holy Things Of The LORD

"Holy things of the LORD" means anything set apart for God - tithes, firstfruits, or portions of offerings reserved for the priests. This case covers accidentally mishandling one of these: eating something reserved for the priests by mistake, or being careless with a tithe or dedicated gift.

⚠️ "Holy things" means tithes, firstfruits, or portions set apart for God

🤝 This covers accidentally misusing or mishandling something sacred

🍞 A common example: unknowingly eating food reserved for the priests

---

## 🐏 A Ram Without Blemish...With Thy Estimation By Shekels Of Silver, After The Shekel Of The Sanctuary

For the first time in this chapter, a ram is required rather than a lamb, goat, bird, or flour - a bigger, costlier animal reserved specifically for trespasses against holy things. "The shekel of the sanctuary" was a fixed, official weight standard, heavier and more precise than an everyday shekel, so nobody could shortchange the payment. "Thy estimation" means the priest set the exact monetary value owed.

🐏 A ram is required here, bigger and costlier than any earlier option in this chapter

⚖️ "The shekel of the sanctuary" was an official, fixed weight standard

💰 "Thy estimation" means the priest set the precise value of what was owed

---

## 💰 Make Amends...And Shall Add The Fifth Part Thereto

This is new: actual repayment, not just ritual. The guilty person had to pay back the value of whatever holy thing they'd mishandled, plus an extra 20% penalty on top. No earlier offering in Leviticus required literally repaying anything - this trespass category deals with real, measurable damage.

💰 This requires real repayment, on top of the ritual offering

➕ A 20% penalty was added to whatever was owed

🆕 No earlier offering in Leviticus demanded literal repayment like this

---

## ✝️ The Priest Shall Make An Atonement For Him With The Ram Of The Trespass Offering

Both parts were required together: paying back the debt plus 20%, and the ram ritual. Repayment alone didn't finish the matter, and the ritual alone didn't either - making things right with people and making things right with God both had to happen.

✝️ Both restitution and the ritual offering were required, not either one alone

🤝 Making things right with people didn't replace making things right with God

🎯 This trespass category demands both repayment and atonement together

# Leviticus 5:17-19

# 🐏 Guilty Even Without Knowing The Law

---

## ❓ Commit Any Of These Things Which Are Forbidden...Though He Wist It Not, Yet Is He Guilty

"Wist" is an old word meaning "knew." This verse states plainly that not even knowing a specific law existed doesn't remove the guilt of breaking it. Chapter 4 already established that guilt can exist without intent - this verse pushes even further, saying guilt exists even without any awareness that a rule was being broken at all.

❓ "Wist" is the old word for "knew"

⚖️ Not knowing a law existed still doesn't remove the guilt of breaking it

📈 This pushes chapter 4's "through ignorance" idea even further

---

## 🐏 A Ram Without Blemish Out Of The Flock, With Thy Estimation

The same ram and the same priestly valuation from the holy-things trespass in verses 14-16 applies again here, now for this broader, less specific category of "forbidden things." The required offering matches, even though the exact wrongdoing this time is left unnamed.

🐏 The same ram and priestly-valuation system from verses 14-16 repeats here

📏 This time it covers a broader, unnamed category of forbidden acts

🔁 Leviticus reuses the same offering rather than inventing a new one

---

## ✝️ Make An Atonement...Concerning His Ignorance Wherein He Erred And Wist It Not

"Erred" means made a mistake, and "wist it not" repeats that he genuinely didn't know. Real ignorance doesn't erase real guilt - but it also doesn't put someone beyond forgiveness. This verse holds both truths at once: accountability stays, and grace is still available.

✝️ "Erred" means made a mistake, and this verse repeats he didn't know

⚖️ True ignorance doesn't erase guilt, but it also doesn't block forgiveness

🎯 This verse holds accountability and grace together, not one instead of the other

---

## 💵 Restitution Required Only Here

Looking back across the whole chapter: the four situations in verses 1-6, the poor person's birds, and the poorest person's flour never mention repaying anyone. Only the trespass offering, starting at verse 14, adds the repay-plus-20%-penalty requirement - because holy things and other people's property can actually be measured and paid back, unlike the more personal, internal sins covered earlier.

💵 Only the trespass offering (from verse 14 on) requires repayment

📏 Earlier sins in this chapter involved no measurable damage to repay

🎯 Restitution applies specifically where real, countable loss occurred

---

## 📋 It Is A Trespass Offering: He Hath Certainly Trespassed Against The LORD

This closing label states plainly that the guilt was real, using the word "certainly" to remove any doubt - even when the sinner never knew they were breaking a rule. Human courts sometimes excuse genuine ignorance; this verse makes clear that before God, the guilt still stood, and still had to be dealt with.

📋 "Trespass offering" is the formal closing label for this whole section

✅ "Certainly" removes any doubt that the guilt was real

⚖️ Genuine ignorance still required dealing with the guilt, not excusing it

---

## 🎯 Two Related Offerings Close Out The Chapter

Chapter 5 covers two connected but distinct categories: the sin offering (verses 1-13), scaled down through four tiers - lamb, goat, birds, or flour - based purely on what the sinner could afford; and the trespass offering (verses 14-19), a fixed ram plus repayment, for damage that could actually be measured and repaid. Leviticus 6:1-7 continues this second category with more trespass case law still to come.

🎯 Verses 1-13 (sin offering) and 14-19 (trespass offering) are two related categories

📉 The sin offering scaled by ability to pay; the trespass offering stayed fixed

📖 Leviticus 6:1-7 continues the trespass offering with more case law`;

export const LEVITICUS_FIVE_PERSONAL_SECTIONS = parseLeviticusFiveRawNotes(LEVITICUS_FIVE_RAW_NOTES);
