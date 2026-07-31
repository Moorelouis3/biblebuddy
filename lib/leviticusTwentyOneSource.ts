export type LeviticusTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentyOneRawNotes(rawText: string): LeviticusTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 21:${startVerse}` : `Leviticus 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Leviticus 21 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_ONE_RAW_NOTES = `# Leviticus 21:1-4
# 💀 Priests And The Dead
---
## 🕯️ Speak Unto The Priests The Sons Of Aaron
This chapter shifts who God is talking to. Chapters 18-20 gave rules for all of Israel, but here God speaks straight to Aaron's priestly family alone. Priests carried extra responsibility because they worked directly with the holy things in the tabernacle, so they also carried extra rules.
🕯️ Marks a shift from rules for all Israel to rules for priests only
👨‍👩‍👧 "Sons of Aaron" means the priestly family line
📜 More responsibility came with more specific rules
---
## 💀 There Shall None Be Defiled For The Dead Among His People
Touching a dead body made a person ritually unclean for a period of time, a separate system from moral sin explained fully in Numbers 19. An unclean priest could not serve at the altar until he was purified, so this rule protected the tabernacle's ongoing operation - a priest unexpectedly out of service for days at a time was a real problem.
💀 Touching a corpse caused ritual uncleanness, not moral guilt
📖 The full purification process is laid out in Numbers 19
⏳ An unclean priest couldn't serve until purified again
---
## 👪 For His Mother, And For His Father, And For His Son, And For His Daughter, And For His Brother
God lists exactly which deaths a priest is still allowed to mourn by becoming ritually unclean: parents, children, and brothers. This isn't heartlessness - it draws a clear line so priests know exactly which funerals they can attend without guessing.
👪 Names the closest family: parents, children, brothers
📏 A clear list removes guesswork about which funerals are allowed
⚖️ Limits, not a ban on grieving family at all
---
## 👰 And For His Sister A Virgin, That Is Nigh Unto Him, Which Hath Had No Husband; For Her May He Be Defiled
An unmarried sister still living under her father's household counted as close family a priest could mourn for. Once a sister married, she belonged to her husband's family for matters like this, so this exception only covers a sister who hadn't yet left home.
👰 Applies only to an unmarried sister
🏠 A married sister's mourning ties shifted to her husband's family
📏 Narrows the family list even further than it first sounds
---
## ⚖️ He Shall Not Defile Himself, Being A Chief Man Among His People, To Profane Himself
"Chief man" points to the priest's public position of leadership and honor among the people. Becoming ritually unclean for anyone outside that short family list would treat his sacred role carelessly, which is what "profane" means here - to strip something set-apart down to something common.
⚖️ "Chief man" points to the priest's public standing
🔤 "Profane" means treating something holy as ordinary
📏 The short family list exists to protect that public role

# Leviticus 21:5-6
# 💇 No Pagan Mourning Marks
---
## 🪒 They Shall Not Make Baldness Upon Their Head
Shaving the head bald was a common mourning ritual in the ancient Near East, a visible sign of grief worn on the body. Priests were told not to copy this practice, keeping their mourning customs different from the nations around them.
🪒 Head-shaving was a widespread ancient mourning custom
🚫 Priests were told not to adopt it
🌍 Kept Israel's priests visibly different from neighboring practices
---
## 🧔 Neither Shall They Shave Off The Corner Of Their Beard
This exact command was already given to every Israelite back in Leviticus 19:27. Repeating it here for priests specifically shows that a rule meant for everyone still needed restating for the people held to the highest standard.
🔗 The same rule already appears in Leviticus 19:27
👥 First given to all Israel, now repeated for priests specifically
📈 Priests were held to the same rule with less room for exceptions
---
## 🩸 Nor Make Any Cuttings In Their Flesh
Cutting the skin as an act of mourning or worship shows up elsewhere in the Bible tied to pagan religion - the prophets of Baal cut themselves while begging their god to answer in 1 Kings 18:28. Banning this practice separated Israel's worship and grief from rituals that treated pain as a way to get a god's attention.
🩸 Ritual self-cutting was tied to pagan worship practices
📖 1 Kings 18:28 shows Baal's prophets doing exactly this
🚫 Israel's God didn't need to be begged through self-harm
---
## ✨ They Shall Be Holy Unto Their God, And Not Profane The Name Of Their God
"Holy" means set apart for God's use, the opposite of "profane," which means common or ordinary. This line sums up the point of the mourning bans just given - priests' bodies and behavior needed to visibly match the set-apart role they held.
✨ "Holy" means set apart, the opposite of "profane"
🔗 Sums up the reason behind the mourning-custom bans
👤 Their behavior needed to visibly match their role
---
## 🔥 For The Offerings Of The LORD Made By Fire, And The Bread Of Their God, They Do Offer: Therefore They Shall Be Holy
This gives the actual reason behind the holiness requirement - priests handled the offerings burned on the altar and the bread set before God, so their own condition couldn't be treated separately from the sacred things they touched every day.
🔥 Names their daily job: handling fire offerings and holy bread
🔗 Ties personal holiness directly to daily priestly duties
📜 Explains the "why" behind the whole section

# Leviticus 21:7-8
# 💍 Who A Priest May Marry
---
## 🚫 They Shall Not Take A Wife That Is A Whore, Or Profane
A priest could not marry a woman who worked as a prostitute or who was considered "profane" - someone whose reputation or past made her, in this culture's eyes, unsuited to stand beside a man whose job required constant ritual purity.
🚫 Bans marriage to a prostitute
🔤 "Profane" again means not set apart, treated as common
👰 A priest's wife's status affected his fitness to serve
---
## 💔 Neither Shall They Take A Woman Put Away From Her Husband
"Put away" means divorced. This specific ban applied to ordinary priests marrying a divorced woman - notably, the stricter high priest rule coming a few verses later goes even further, showing this law had different tiers depending on rank.
💔 "Put away" means divorced
📊 A tier system - ordinary priests have one standard here
⬆️ The high priest's rule (coming in v13-14) is even stricter
---
## 🙏 For He Is Holy Unto His God
This closes out the marriage restrictions with the same reasoning used throughout the chapter - a priest's holy status wasn't private. Even his marriage choice reflected on the sacred role he carried in front of the whole community.
🙏 Repeats the chapter's core reasoning: holiness, not preference
👀 A priest's choices were never purely private
🔗 Same logic driving the mourning-custom rules earlier
---
## 🍞 Thou Shalt Sanctify Him Therefore; For He Offereth The Bread Of Thy God
This line switches direction - instead of telling the priest what to do, it tells the community to treat the priest as set apart, because of the sacred food-related duties he carries out on their behalf. Holiness here runs both ways: the priest keeps himself set apart, and the people are told to honor that status too.
🔄 Switches from commanding the priest to commanding the people
🍞 Ties back to his duty handling the holy bread
🤝 Holiness runs in both directions, not one-sided
---
## ✨ He Shall Be Holy Unto Thee: For I The LORD, Which Sanctify You, Am Holy
The final reason given for all of this traces back past the priest and the people, straight to God's own holiness. Every rule in this section exists because it reflects who God is, not just what keeps a religious system running smoothly.
✨ Traces the whole reasoning back to God's own character
🔝 Not just practical rules - a reflection of who God is
🔁 Echoes the "I am the LORD" refrain from chapters 19-20

# Leviticus 21:9
# 🔥 A Priest's Daughter Who Sins
---
## 👨‍👧 And The Daughter Of Any Priest, If She Profane Herself By Playing The Whore, She Profaneth Her Father
In this culture, a family's honor and a father's public standing were closely tied to his household's behavior. A priest's daughter turning to prostitution wasn't treated as only her own failure - the text says it profanes, or drags down, her father's holy standing too, because his household was expected to visibly reflect his role.
👨‍👧 Family honor and a father's standing were tightly linked
📉 Her actions are described as dragging down his status too
🏠 A priest's household was expected to reflect his sacred role
---
## 🔥 She Shall Be Burnt With Fire
Burning was one of the harshest penalties in this whole legal system, reserved for only a small handful of the worst offenses - the same penalty given for a man marrying both a wife and her mother in Leviticus 20:14. Applying it here shows just how seriously this offense within a priestly household was treated, precisely because of the higher standard that household was held to.
🔥 One of the rarest, harshest penalties in the whole law
🔗 The same penalty used in Leviticus 20:14
📈 Reflects the higher standard placed on a priest's family

# Leviticus 21:10-12
# 👑 The High Priest's Extra Restrictions
---
## 👑 He That Is The High Priest Among His Brethren, Upon Whose Head The Anointing Oil Was Poured
This section shifts one more time, from priests in general to the high priest specifically - the single man holding the top position, marked out by having oil poured over his head in the ordination ceremony described back in Exodus 29 and Leviticus 8. He carries every rule already given, plus a stricter set that follows here.
👑 Narrows the focus to one man: the high priest
🫗 The anointing-oil ceremony is described in Exodus 29 and Leviticus 8
➕ He keeps all the earlier priestly rules, plus more
---
## 👔 Shall Not Uncover His Head, Nor Rend His Clothes
Letting hair hang loose and tearing one's own clothing were normal signs of grief in this culture - Job tears his robe in Job 1:20, and other Old Testament figures do the same. The high priest was barred from even these ordinary mourning gestures, a stricter line than the rules given to regular priests just a few verses earlier.
👔 Loose hair and torn clothes were normal mourning customs
📖 Job 1:20 shows this exact custom in practice
⬆️ Stricter than the rules given to ordinary priests
---
## ⚰️ Neither Shall He Go In To Any Dead Body, Nor Defile Himself For His Father, Or For His Mother
Ordinary priests were allowed to become unclean for their own parents back in verse 2 - the high priest cannot, not even for his own father or mother. His office required him to be ready for sanctuary duty at every moment, without exception, even during the most painful family loss.
⬆️ Stricter than the ordinary-priest exception given in verse 2
⚰️ No exception at all, not even for his own parents
⏱️ His role required constant, uninterrupted readiness
---
## 🏛️ Neither Shall He Go Out Of The Sanctuary, Nor Profane The Sanctuary Of His God
This likely means the high priest could not leave in the middle of his sacred duties to attend to mourning rites, even for close family. Walking away from his post, even for grief, is described here as profaning - treating carelessly - the sanctuary itself.
🚪 Likely means not leaving mid-duty, even to mourn
🔤 "Profane" again means treating something holy as careless
🏛️ His presence at his post protected the sanctuary's holiness
---
## 👑 For The Crown Of The Anointing Oil Of His God Is Upon Him: I Am The LORD
"Crown" here pictures the anointing oil as something like a permanent, invisible crown resting on the high priest, marking him as continuously set apart, not just during ceremonies. The stricter rules in this section all trace back to that one image - he wears his consecration at all times, so he lives by it at all times.
👑 "Crown" pictures the anointing as a constant, invisible mark
⏳ Not just for ceremonies - a continuous status
🔗 Explains why his rules are stricter than other priests'

# Leviticus 21:13-15
# 👰 The High Priest Must Marry A Virgin
---
## 👰 And He Shall Take A Wife In Her Virginity
The high priest's marriage rules go further than the ones just given for ordinary priests. Where an ordinary priest could not marry certain categories of women, the high priest was required to marry a virgin specifically - the strictest version of this rule in the chapter.
👰 A stricter version of the marriage rule from verse 7
⬆️ Required, not just restricted from certain categories
📏 The tightest standard given anywhere in this chapter
---
## 🚫 A Widow, Or A Divorced Woman, Or Profane, Or An Harlot, These Shall He Not Take
Notice this list adds "widow" to the ban - a category ordinary priests were still allowed to marry back in verse 7. The high priest's unique national role, standing before God on behalf of the whole nation, came with the narrowest set of allowed marriages of anyone in Israel.
➕ "Widow" is newly added here, not banned for ordinary priests
👑 Tied to his unique role representing the whole nation
📏 The narrowest marriage rule given to anyone in this law
---
## 🇮🇱 But He Shall Take A Virgin Of His Own People To Wife
"Of his own people" means an Israelite woman, not a foreigner. This kept the high priest's household, and by extension the priestly line descending from him, clearly rooted within the covenant nation he represented before God.
🇮🇱 "Of his own people" means an Israelite, not a foreigner
👪 Kept his household clearly rooted in the covenant nation
🔗 Protected the priestly line's identity going forward
---
## 👶 Neither Shall He Profane His Seed Among His People: For I The LORD Do Sanctify Him
"His seed" means his children. This makes clear the marriage rule wasn't only about the high priest himself - his choice of wife directly affected whether his own children's status stayed set apart or became compromised, since priestly identity in Israel passed down through the family line.
👶 "His seed" means his own children
🔗 His marriage choice affected his children's status too
📜 Priestly identity in Israel passed down by family line

# Leviticus 21:16-20
# 🚫 Blemishes That Disqualify A Priest From Serving
---
## 🍞 Let Him Not Approach To Offer The Bread Of His God
This section lists physical conditions that disqualified a priest's descendant from serving at the altar. It's worth saying plainly up front: this isn't a judgment about a person's worth. It matches a pattern already set for sacrificial animals - offerings had to be "without blemish" (explained again in Leviticus 22:20-25), and this extended the same symbolic standard of wholeness to the person performing the offering.
🍞 Lists physical conditions barring altar service, not personhood
🐑 Mirrors the "without blemish" standard already required for animals
🔗 See Leviticus 22:20-25 for the matching animal-offering rule
---
## 👁️ A Blind Man, Or A Lame, Or He That Hath A Flat Nose, Or Any Thing Superfluous
This opens the list: blindness, an inability to walk normally, a damaged or missing nose, or an extra body part. Each condition listed here was visible and permanent, matching the "without blemish" standard just described.
👁️ Blindness and lameness open the list
👃 "Flat nose" likely means a damaged or disfigured nose
➕ "Superfluous" means an extra, unusual body part
---
## 🦴 Or A Man That Is Brokenfooted, Or Brokenhanded
This covers a permanently broken or malformed foot or hand, not a temporary injury like a healed fracture. The list is concerned with lasting physical conditions, not short-term recovery from an accident.
🦴 Refers to a permanent condition, not a temporary injury
⏳ A healed broken bone wasn't the concern here
📋 Continues the visible-and-lasting pattern of the list
---
## 🩺 Or Crookbackt, Or A Dwarf, Or That Hath A Blemish In His Eye, Or Be Scurvy, Or Scabbed, Or Hath His Stones Broken
This final cluster names a curved spine, short stature, an eye condition, ongoing skin disease, and a physical injury affecting reproduction. Piled together in one verse, this is the list's most detailed stretch, covering nearly every visible category the law could think to name.
🩺 Covers spine curvature, short stature, and eye conditions
🩹 "Scurvy" and "scabbed" point to ongoing skin conditions
📋 The most detailed cluster in the whole list
---
## 🌍 Why This Rule Doesn't Condemn Disability
It helps to be direct about what this law is and isn't doing. It never says a priest with one of these conditions is less loved by God or less a part of Israel - verse 22 makes sure he's still fed from the holy offerings. The rule is narrowly about who could physically perform the specific altar ritual, tied to the ancient symbolic idea that the visible offering and the person presenting it matched in wholeness.
❤️ Doesn't say these men were less loved or less part of Israel
🍞 Verse 22 confirms he was still fed from the holy offerings
🎯 Narrowly about altar service, not personal worth
---
## ✝️ A Forward Look At A Perfect High Priest
The New Testament book of Hebrews later describes Jesus as a high priest who is "holy, harmless, undefiled, separate from sinners" (Hebrews 7:26) - perfect in the deeper sense this whole blemish list was only ever a physical picture of. The Old Testament requirement for outward wholeness pointed toward something this law itself couldn't produce: complete inward wholeness in the one who mediates between God and people.
✝️ Hebrews 7:26 describes Jesus as the truly "undefiled" high priest
🖼️ The physical rule pictured a deeper wholeness this law couldn't create
🔮 A forward-pointing pattern, not the final word

# Leviticus 21:21-24
# 🍞 Provided For, But Limited
---
## 🍞 He Shall Eat The Bread Of His God, Both Of The Most Holy, And Of The Holy
A priest disqualified from altar service by one of these conditions still received his share of food from the offerings - both the "most holy" portions (like the shewbread and sin offering meat) and the regular "holy" portions. Exclusion from the altar never meant exclusion from provision or belonging to the priestly family.
🍞 Still receives his full food portion from the offerings
📊 Covers both the "most holy" and regular "holy" categories
🤝 Being barred from the altar isn't the same as being cut off
---
## 🚪 Only He Shall Not Go In Unto The Vail, Nor Come Nigh Unto The Altar, Because He Hath A Blemish
This defines exactly what he can't do: enter past the veil, into the areas nearest God's presence, or approach the altar itself to perform sacrifices. Everything else - eating the holy food, living among the priestly community - stayed open to him.
🚪 Two specific limits: the veil area and the altar
✅ Everything outside those two areas remained open to him
📏 A narrow restriction, not a blanket exclusion
---
## ✨ That He Profane Not My Sanctuaries: For I The LORD Do Sanctify Them
The reasoning returns one final time to the sanctuary's own holiness, not the man's worth. The restriction protects the set-apart status of the holy space itself, the same logic running through this entire chapter from the very first verse.
✨ About protecting the sanctuary's holiness, not judging the man
🔁 The same reasoning used throughout the whole chapter
📚 Brings the chapter's core theme full circle
---
## 📜 And Moses Told It Unto Aaron, And To His Sons, And Unto All The Children Of Israel
This closing line is easy to skim past, but it matters: even though this chapter's rules applied specifically to priests, Moses made sure the entire nation heard them too. Every Israelite depended on priests staying fit to mediate the offerings, so everyone needed to understand the standard their priests were held to.
📜 A rule for priests, but announced to the whole nation
🤝 Everyone depended on priests staying fit to serve
👥 Closes the chapter the same way it opened - Moses relaying God's word
`;

export const LEVITICUS_TWENTY_ONE_PERSONAL_SECTIONS = parseLeviticusTwentyOneRawNotes(LEVITICUS_TWENTY_ONE_RAW_NOTES);
