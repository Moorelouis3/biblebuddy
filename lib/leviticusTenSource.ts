export type LeviticusTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTenRawNotes(rawText: string): LeviticusTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 10:${startVerse}` : `Leviticus 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Leviticus 10 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TEN_RAW_NOTES = `# Leviticus 10:1-3

# 🔥 Strange Fire

---

## 🔥 Nadab And Abihu, The Sons Of Aaron

Nadab and Abihu are Aaron's two oldest sons. They were part of the ordination ceremony in chapter 8 and stood right next to their father through chapter 9's first day of sacrifices.

This is the same pair named back in Exodus 24:1, when God called them up partway up Mount Sinai along with Moses and the seventy elders - long before either of them had ever served as a priest.

Being oldest and already experienced didn't protect them here. What happens next shows that family standing and ceremony experience didn't excuse a shortcut.

🔥 Aaron's two oldest sons, already ordained priests

📖 Also named back in Exodus 24:1, present at Sinai

⚖️ Rank and experience didn't excuse what happens next

---

## 🧰 Took Either Of Them His Censer

A censer was a small metal firepan used to carry burning coals and incense into the tabernacle. Priests used censers regularly - this wasn't a strange or forbidden tool by itself.

The problem in this story was never the equipment. It was what these two men chose to put inside it.

🔥 A censer was a standard priestly firepan for incense

🧰 A normal, approved tool - not the problem here

👀 What went inside it is what mattered

---

## 🚫 Offered Strange Fire Before The LORD, Which He Commanded Them Not

"Strange fire" means fire that wasn't taken from the proper source. Chapter 6:12-13 already commanded that the altar's fire must never go out and every offering must be lit from that one continual flame - not from some other source Nadab and Abihu apparently used instead.

"Which he commanded them not" is the real charge here. Their sin wasn't breaking a rule that was unclear. It was doing something God had never authorized in the first place.

🔥 "Strange" means fire from the wrong, unauthorized source

📖 Chapter 6 already required using only the altar's own continual fire

🚫 The core issue: they acted without any command to do so

---

## 🔥 There Went Out Fire From The LORD, And Devoured Them

This is the very same phrase used one verse earlier in chapter 9:24, when fire from God consumed the offering and the whole nation shouted for joy. Here, the identical kind of fire strikes the men themselves instead of an animal on the altar.

The repetition is deliberate. The same holy fire that proved God's presence and acceptance in chapter 9 becomes the instrument of judgment here, one chapter later.

🔥 The same "fire from the LORD" phrase as chapter 9:24

🔀 There it consumed an offering; here it consumes people

⚠️ One chapter separates total acceptance from sudden judgment

---

## 🕯️ They Died Before The LORD

"Before the LORD" means directly in front of the tabernacle, at or near the very altar where they had just been serving. Their deaths happened in the holiest, most public place in the whole camp.

🕯️ "Before the LORD" means right at the tabernacle itself

⚡ Death came suddenly, in the middle of active service

👀 It happened in the most visible place in the entire camp

---

## ✨ I Will Be Sanctified In Them That Come Nigh Me

"Sanctified" means treated as holy, set apart, and taken seriously. Moses explains that anyone who comes close to God - meaning anyone serving as a priest - has to treat that closeness with total seriousness, because God will make sure his holiness is respected one way or another.

This connects to a theme running through Leviticus from chapter 1 on: nearness to God is a privilege that comes with real weight, not a casual perk of the priestly job.

✨ "Sanctified" means treated as holy and set apart

⚖️ Nearness to God always demands total seriousness

📖 A theme running through Leviticus since chapter 1

---

## 👥 Before All The People I Will Be Glorified

This half of Moses's statement adds a public dimension to the private one. God's holiness wasn't just going to be respected by the priests behind the scenes - it was going to be visibly clear to the entire watching nation, for better or worse.

👥 God's holiness would be made visible to the whole nation

🎬 Not just a private lesson for priests alone

⚖️ The public and the personal stakes were tied together

---

## 🤐 Aaron Held His Peace

This means Aaron said nothing at all. No protest, no argument, no visible breakdown recorded in the text - just silence, right after losing two of his sons in an instant.

This kind of restrained response doesn't mean Aaron felt nothing. Verse 19, later in this chapter, shows his grief was real and near the surface the whole time.

🤐 "Held his peace" means Aaron said nothing at all

😢 Silence here doesn't mean he felt nothing

📖 Verse 19 later reveals how much he was still carrying

# Leviticus 10:4-7

# 😢 No Time To Mourn

---

## 👨‍👩‍👧 Mishael And Elzaphan, The Sons Of Uzziel The Uncle Of Aaron

Uzziel was a brother of Aaron and Moses's own father, Amram (see Exodus 6:18, 22) - which makes Mishael and Elzaphan first cousins to Aaron and Moses, not strangers pulled in from elsewhere.

Moses chose family for this job on purpose. Removing the bodies of Nadab and Abihu needed people close enough to be trusted, but not close enough to be Aaron's own sons, who were still bound by the restrictions in verse 6.

👨‍👩‍👧 First cousins to Aaron and Moses, not outsiders

📖 Uzziel was Aaron's uncle, per Exodus 6:18

🎯 Close family, but not under the same restrictions as Aaron's sons

---

## ⚰️ Carry Your Brethren From Before The Sanctuary Out Of The Camp

Dead bodies made a person and a place ceremonially unclean under the law, so anything dead had to be removed from the sanctuary area right away. "Out of the camp" was the same standard location used for anything unclean or destroyed, already seen with the burnt sin-offering remains in chapters 4 and 9.

⚰️ A dead body made the sacred space ceremonially unclean

🏕️ "Out of the camp" was the standard place for anything unclean

🔁 The same location already used for offering remains in chapters 4 and 9

---

## 👕 Carried Them In Their Coats

This means the bodies were removed still wearing the priestly garments they died in, not stripped and redressed first. There simply wasn't time or reason to treat this like a normal burial preparation.

👕 The garments stayed on; nothing was removed first

⏱️ This wasn't handled like an ordinary burial

🎬 Speed and respect mattered more than ceremony here

---

## 😢 Uncover Not Your Heads, Neither Rend Your Clothes

Loosening or uncovering the hair and tearing your clothes were Israel's standard mourning customs - visible signs everyone recognized as grief. Aaron and his surviving sons, Eleazar and Ithamar, were forbidden from doing either one.

😢 Loose hair and torn clothes were normal mourning signs

🚫 Aaron and his surviving sons couldn't do either

👨‍👦 Eleazar and Ithamar are named for the first time here

---

## ⚠️ Lest Ye Die, And Lest Wrath Come Upon All The People

The warning is severe on purpose. If Aaron and his sons stepped away from their active priestly duty to mourn normally, even for their own family members, God's anger could fall on the entire nation, not just on them personally.

⚠️ The stakes here extend beyond Aaron's own family

🇮🇱 Their conduct as priests affected the whole nation's safety

🛑 Active duty couldn't pause even for personal grief

---

## 👥 Let Your Brethren, The Whole House Of Israel, Bewail The Burning

Ordinary Israelites, unlike the priests currently on duty, were free to mourn Nadab and Abihu in the normal way. The grief was allowed and expected - just not from the men who had to keep functioning as priests in that exact moment.

👥 Ordinary Israelites could mourn in the usual way

🙏 Grief wasn't forbidden, only postponed for active priests

⚖️ The restriction was about active duty, not about caring less

---

## 🚪 Ye Shall Not Go Out From The Door Of The Tabernacle Of The Congregation

This echoes the exact confinement rule from chapter 8:33-35, when Aaron and his sons stayed at the tabernacle entrance for seven full days during their ordination. Here, the same boundary applies again, this time enforced through unimaginable grief.

🚪 The same boundary rule already used in chapter 8's ordination

🔁 A repeated restriction, now tested under real tragedy

⏳ Duty required staying put even in the worst moment

---

## 🫒 The Anointing Oil Of The LORD Is Upon You

The anointing oil from chapter 8 wasn't just a one-time ceremony - it marked Aaron and his sons as permanently set apart, and that status itself is given as the reason they couldn't step away to grieve like everyone else.

🫒 The anointing wasn't just symbolic; it created ongoing obligation

📖 Callback to the anointing oil poured out in chapter 8

⚖️ Being set apart came with a cost, not only a privilege

# Leviticus 10:8-11

# 🍷 No Wine Or Strong Drink

---

## 🗣️ The LORD Spake Unto Aaron

Through nearly all of Leviticus so far, God has spoken to Moses, who then relays the message to Aaron. This is the first time in the whole book that the text says God spoke directly to Aaron himself, without Moses in between.

🗣️ The first direct word from God to Aaron alone in this book

📖 Every earlier instruction came through Moses first

🎯 A notable shift, right after the tragedy of verses 1-3

---

## 🍷 Do Not Drink Wine Nor Strong Drink

"Strong drink" (Hebrew shekar) refers to a fermented beverage other than wine - made from grains, dates, or other fruit rather than grapes. Together, the command bans every kind of alcoholic drink, not just one specific type.

🍷 "Strong drink" means fermented drinks besides wine

🌾 Made from grain, dates, or other fruit, not just grapes

🚫 Between the two words, every alcoholic drink is covered

---

## ⏱️ Thou, Nor Thy Sons With Thee, When Ye Go Into The Tabernacle...Lest Ye Die

The ban applies specifically to entering the tabernacle for priestly duty, not to every moment of a priest's life. The stakes - death - are the same severe language just used for Nadab and Abihu, which is why many readers connect this law directly to what may have caused their fatal mistake.

⏱️ The ban applies specifically to active tabernacle service

⚠️ The same "lest ye die" language just used in verses 1-2

🍷 Many readers connect this law directly to Nadab and Abihu's failure

---

## ♾️ A Statute For Ever Throughout Your Generations

This phrase marks the command as permanent law, not a temporary rule for this one grieving moment. Every future priest, for as long as the priesthood exists, is bound by the same restriction.

♾️ "For ever" means this law never expires

👨‍👦‍👦 It binds every future generation of priests too

📖 A permanent rule born out of one specific tragedy

---

## 🧠 Put Difference Between Holy And Unholy, And Between Unclean And Clean

This explains the actual reason behind the alcohol ban: priests had to make careful, sober judgment calls constantly, telling apart what counted as holy or ordinary, clean or unclean. Impaired judgment in that role could lead straight back to something like verses 1-3.

🧠 Priests needed clear judgment for constant rulings

⚖️ Holy versus unholy, clean versus unclean - real decisions

🍷 Alcohol could compromise the very judgment the job required

---

## 📖 That Ye May Teach The Children Of Israel All The Statutes

Priests weren't only responsible for performing sacrifices. Verse 11 reveals a second major job: teaching the whole nation God's laws directly, which required the same sober clarity as making ritual judgment calls.

📖 A second priestly duty: teaching the law, not just sacrificing

🧠 Teaching accurately also required a clear, sober mind

🇮🇱 This duty extended the priesthood's role to the entire nation

# Leviticus 10:12-15

# 🍞 What The Priests Could Eat

---

## 🍞 The Meat Offering That Remaineth

"Meat offering" is the old English name for the grain offering explained back in chapter 2 - it's flour and oil, not animal meat. "That remaineth" refers to the portion left over after a small handful was burned on the altar as God's token share.

🍞 "Meat offering" means the grain offering from chapter 2

🔥 Only a handful of it was ever burned on the altar

🥖 "That remaineth" is the larger leftover portion for the priests

---

## 📊 Eat It Without Leaven Beside The Altar: For It Is Most Holy

"Most holy" is a specific ranking, higher than ordinary "holy," reserved for the few offerings closest to the sacrificial system's core. Because of that rank, this food could only be eaten unleavened (no yeast) and only in one specific location, right next to the altar itself.

📊 "Most holy" is a higher rank than plain "holy"

🍞 Unleavened means made without yeast, per chapter 2's rule

📍 It had to be eaten in one specific place: beside the altar

---

## 💰 Eat It In The Holy Place...Thy Due, And Thy Sons' Due

"Due" means this food was the priests' rightful payment, not a gift given out of kindness. Serving at the altar came with an actual right to a share of what was offered - this was how priests, who owned no farmland like the rest of Israel, were fed.

💰 "Due" means a rightful payment, not a generous extra

🌾 Priests owned no farmland, so offerings were their livelihood

📖 This system runs throughout the sacrificial laws so far

---

## 📊 The Wave Breast And Heave Shoulder Shall Ye Eat In A Clean Place

This portion, from the peace offering explained in chapters 3 and 7, came with looser rules than the grain offering just described. "Clean place" is a lower bar than "holy place" - any ceremonially clean spot would do, not only the area right by the altar.

📊 A lower-ranked portion than the "most holy" grain offering

📍 "Clean place" is a wider allowance than "holy place"

🍽️ Rules matched each offering's specific holiness ranking

---

## 👧 Thy Sons, And Thy Daughters With Thee

Unlike the "most holy" grain offering, which only male priests could eat, this peace-offering portion could be shared with daughters too. The difference in who could eat it traces directly back to the different holiness rank each offering carried.

👧 Daughters could share this portion, unlike the grain offering

⚖️ The difference comes straight from each offering's holiness rank

👨‍👩‍👧‍👦 A priest's whole household benefited from this specific gift

---

## 〰️ The Heave Shoulder And The Wave Breast...By A Statute For Ever

These two ceremonial gestures - "heave" (lifted up and down) and "wave" (moved side to side) - were already explained back in chapter 7. Repeating "statute for ever" here confirms this priestly food right is permanent, just like the alcohol ban given a few verses earlier.

〰️ "Wave" and "heave" describe two different lifting gestures

📖 Both gestures were already defined back in chapter 7

♾️ "For ever" makes this priestly right permanent, not temporary

# Leviticus 10:16-20

# 😠 The Goat That Was Burned

---

## 🔍 Moses Diligently Sought The Goat Of The Sin Offering, And It Was Burnt

"Diligently sought" means Moses went looking for this specific animal carefully, on purpose - this wasn't a casual question. He discovered that the people's sin-offering goat from chapter 9 had been completely burned instead of eaten by the priests, the way it was supposed to be.

🔍 "Diligently sought" means Moses looked with real purpose

🐐 The goat is the same sin offering first named in chapter 9

🔥 It had been burned entirely instead of eaten as required

---

## 😠 He Was Angry With Eleazar And Ithamar

These are Aaron's two surviving sons, the ones left after Nadab and Abihu died earlier in this same chapter. Moses directs his anger at them specifically, since they were the ones responsible for that particular offering.

😠 Aaron's two remaining sons, after losing Nadab and Abihu

👨‍👦 They were the ones responsible for this offering

🎬 The chapter's tragedy is still fresh in the background here

---

## ⚖️ Seeing It Is Most Holy, And God Hath Given It You To Bear The Iniquity Of The Congregation

This reveals something surprising: eating this portion wasn't just a priestly perk, it was part of how atonement actually worked. By eating the sin offering, the priests were understood to be symbolically carrying the people's guilt themselves, as part of making things right before God.

🍽️ Eating this food wasn't only a benefit, it was a duty

⚖️ "Bear the iniquity" means symbolically carrying the people's guilt

🙏 Eating it was part of how the atonement was completed

---

## ✅ To Make Atonement For Them Before The LORD

This confirms the deeper purpose from the previous phrase: the eating itself, not just the blood and burning, played a real role in the sin offering finishing its job of making atonement for the congregation.

✅ Atonement wasn't complete until every required step happened

🍽️ Eating the meat was one of those required steps

📖 This explains why skipping it was a real problem, not a technicality

---

## 🩸 The Blood Of It Was Not Brought In Within The Holy Place

Moses points to the specific rule from chapter 6:30 that decides whether a sin offering's meat gets eaten or burned: if its blood was carried into the tabernacle itself, the meat must be burned outside camp instead of eaten. Since this goat's blood stayed outside, by that rule it should have been eaten.

📖 A specific rule from chapter 6:30 governs this exact case

🩸 Blood carried inside the tent meant the meat had to be burned

🎯 This goat's blood never went inside, so it should have been eaten

---

## 😢 Such Things Have Befallen Me

Aaron's own defense begins here, referring to the deaths of Nadab and Abihu earlier in the chapter. He's pointing out, without needing to spell it out further, that this has been the worst day of his life.

😢 Aaron references his sons' deaths without naming them again

💔 A quiet way of saying this was the worst possible day

🗣️ The start of Aaron's own explanation to Moses

---

## ❓ Should It Have Been Accepted In The Sight Of The LORD?

Aaron's question suggests that eating a portion meant for celebration and priestly benefit, on the very day his own sons died, would have felt wrong - and possibly would not have honored God the way the ritual intended. Grief, in his reasoning, made this specific meal inappropriate even though the letter of the law allowed it.

❓ Aaron reasons that grief made this specific meal feel wrong

🍽️ Eating this portion was normally tied to celebration, not mourning

⚖️ He weighs the spirit of the law against its bare technical letter

---

## ✅ When Moses Heard That, He Was Content

Moses accepts Aaron's reasoning without further argument. This closes the chapter on a note of mercy and flexibility - a strict system that still made room for a father's genuine, unbearable grief.

✅ Moses accepts Aaron's explanation without further dispute

🤝 The chapter ends with resolution, not ongoing conflict

❤️ Even a strict ritual system made room for real human grief`;

export const LEVITICUS_TEN_PERSONAL_SECTIONS = parseLeviticusTenRawNotes(LEVITICUS_TEN_RAW_NOTES);
