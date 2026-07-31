export type LeviticusTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentyTwoRawNotes(rawText: string): LeviticusTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 22:${startVerse}` : `Leviticus 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Leviticus 22 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_TWO_RAW_NOTES = `# Leviticus 22:1-2
# 🕊️ Priests And The Holy Things
---
## 🕊️ Speak Unto Aaron And To His Sons
God is still addressing the priestly family directly, continuing straight from chapter 21's priest-only rules. This chapter narrows in on one specific piece of priestly duty: handling the holy offerings that ordinary Israelites brought to the tabernacle.
🕊️ Continues chapter 21's priests-only focus
🍞 This chapter zooms in on handling holy offerings specifically
🔗 A direct continuation, not a new topic
---
## 🙅 That They Separate Themselves From The Holy Things
"Separate" here means staying away from touching or eating the holy offerings at certain times, not a permanent ban. A priest who was ritually unclean had to step back from these duties until he was clean again, which the rest of the chapter explains in detail.
🙅 Means stepping back temporarily, not a lifetime ban
⏳ Applies only during periods of ritual uncleanness
📖 The specific unclean conditions come in verses 3-9
---
## 🔤 That They Profane Not My Holy Name
"Profane" means treating something set apart as if it were ordinary or careless. A priest handling holy things while unclean wouldn't just break a rule - it would drag God's own name down into carelessness, since the priest represented God's holiness in everything he touched.
🔤 "Profane" means treating something holy as ordinary
👤 A priest represented God's holiness in his actions
⚠️ The concern reaches beyond the priest to God's name itself
---
## ✨ I Am The LORD
This short refrain closes the opening command, the same way it closes almost every section in this chapter. It's a reminder that these aren't just tabernacle housekeeping rules - they carry the authority of God himself.
✨ A refrain repeated throughout this whole chapter
👑 Points back to God's authority behind every rule
🔁 Watch for this same phrase closing section after section

# Leviticus 22:3-9
# 🩹 When A Priest May Not Eat The Holy Food
---
## 👪 Whosoever He Be Of All Your Seed Among Your Generations
"Seed" means descendants, and "generations" makes clear this rule isn't just for Aaron's own sons - it covers every priest who will ever come from his family line, for as long as the priesthood lasts.
👪 "Seed" means descendants, not just Aaron's immediate sons
⏳ Written to apply across every future generation of priests
📜 A permanent standard, not a one-time instruction
---
## ⚠️ Having His Uncleanness Upon Him
"Uncleanness" refers to a whole system of ritual impurity covered in Leviticus 11-15 - touching a dead body, certain skin diseases, bodily discharges, and more. It wasn't about moral guilt; it was a temporary status that blocked someone from sacred duties until it passed.
⚠️ Ritual uncleanness, not moral sin
📖 The full list of causes is laid out in Leviticus 11-15
⏳ Always temporary, never a permanent condition
---
## 💀 That Soul Shall Be Cut Off From My Presence
"Cut off" is one of the Bible's most serious penalties, used for the worst violations of holy things. Scholars debate whether it means execution, exile from the community, or God himself ending that person's life directly - but every use of the phrase marks total separation from Israel's covenant life.
💀 One of the most serious penalties in the whole law
❓ Its exact form (death, exile, divine judgment) is debated
🚫 Always means total separation from the covenant community
---
## 🩹 Is A Leper, Or Hath A Running Issue
"Leper" describes a range of skin conditions covered in Leviticus 13, not only the disease known as leprosy today. A "running issue" is an ongoing bodily discharge, detailed in Leviticus 15 - both made a person unclean until treated and confirmed clean.
🩹 "Leper" covers various skin conditions from Leviticus 13
💧 "Running issue" means an ongoing bodily discharge (Leviticus 15)
⏳ Both required confirmed cleansing before service resumed
---
## ⚰️ Toucheth Any Thing That Is Unclean By The Dead
Contact with a corpse, or anything a corpse had touched, caused a period of ritual uncleanness explained fully in Numbers 19. This was one of the most common ways a priest could become temporarily disqualified from his duties.
⚰️ Corpse contact caused ritual uncleanness
📖 The full purification process is in Numbers 19
🔁 One of the most common causes of priestly uncleanness
---
## 💧 A Man Whose Seed Goeth From Him
This refers to a bodily emission, a specific cause of uncleanness detailed in Leviticus 15:16-18. It required washing and lasted until evening, the same pattern used for several of the conditions in this list.
💧 Refers to a bodily emission (Leviticus 15:16-18)
🚿 Required washing, same as other conditions on this list
🌆 Lasted until evening, a common pattern in this system
---
## 🐛 Toucheth Any Creeping Thing
"Creeping thing" points back to the unclean small animals listed in Leviticus 11 - insects, rodents, and similar creatures. Even brief contact with one made a person unclean for the rest of the day.
🐛 Refers to the unclean small animals from Leviticus 11
👆 Even brief contact triggered this uncleanness
🔗 Ties this chapter back to the food laws given earlier
---
## 🌆 Unclean Until Even
"Even" means evening, specifically sundown. Many of the milder uncleanness categories in this system lasted only until the sun went down, a built-in reset that kept short-term impurity from becoming a long-term problem.
🌆 "Even" means evening, at sundown
⏰ A built-in time limit for the milder uncleanness categories
🔄 Uncleanness resets rather than accumulating indefinitely
---
## 🚿 Unless He Wash His Flesh With Water
Washing wasn't just hygiene here - it was the ritual act that officially ended a period of uncleanness. Without it, the uncleanness didn't just go away on its own once the sun went down.
🚿 A ritual act, not simply hygiene
✅ Required to officially end the uncleanness
⏳ Sundown alone wasn't enough without this step
---
## 🍞 Because It Is His Food
This closes the section with the priest's own perspective: the holy offerings weren't a luxury or a bonus, they were how priests and their families were fed since they owned no farmland of their own (explained fully in Numbers 18:20). All these purity rules protected something priests genuinely depended on.
🍞 Priests had no farmland, so this was their livelihood
📖 Numbers 18:20 explains this arrangement in full
⚖️ Explains why these rules mattered so practically, not just religiously
---
## 🦴 That Which Dieth Of Itself, Or Is Torn With Beasts
An animal found already dead, or killed and torn apart by a wild predator, could never be eaten - its blood hadn't been properly drained the way a slaughtered offering required. This same ban applies to every Israelite back in Exodus 22:31, not only priests.
🦴 Blood wasn't properly drained from these animals
📖 The same ban is given to all Israel in Exodus 22:31
🔁 Applied here specifically to the priest's own food
---
## ⚖️ Lest They Bear Sin For It, And Die Therefore
Breaking this rule carried real consequences, described here as bearing sin and facing death. The warning is blunt on purpose - handling holy things carelessly was never treated as a small mistake.
⚖️ States the real consequence plainly: sin and death
🚫 Never framed as a minor or forgivable slip
📢 A deliberately blunt warning, not a soft suggestion
---
## ✨ I The LORD Do Sanctify Them
The chapter's refrain returns, but with a key addition: God is the one doing the sanctifying, not the priests sanctifying themselves through their own careful behavior. Their obedience mattered, but their holy status ultimately came from God.
✨ God, not the priest's own effort, does the sanctifying
🙏 Obedience mattered, but wasn't the source of their holiness
🔁 Same refrain, slightly expanded from verse 2

# Leviticus 22:10-13
# 🏠 Who Belongs To The Priest's Table
---
## 🚫 There Shall No Stranger Eat Of The Holy Thing
"Stranger" here doesn't mean a foreigner specifically - it means anyone outside the priest's own household, even a fellow Israelite. The holy food was tied to belonging to a priestly family, not to nationality.
🚫 "Stranger" means outside the priest's household here
👨‍👩‍👧‍👦 Tied to family membership, not nationality
🍞 Continues the theme from verse 7 - eating this food required belonging
---
## 👷 A Sojourner Of The Priest, Or An Hired Servant
A "sojourner" living with the priest, or a paid worker he employed, still couldn't eat the holy food. Both were temporary or contracted members of the household, not the same as being born or bought into it permanently.
👷 Both are temporary members of the household
📄 A hired servant worked under a paid, limited arrangement
🚫 Temporary status wasn't enough to earn eating rights
---
## 💰 If The Priest Buy Any Soul With His Money
This refers to a slave purchased and permanently owned by the priest - a very different legal category from a hired servant working for wages. Ancient household slavery, unlike the hired-servant arrangement just mentioned, made someone a lasting part of the family unit.
💰 Refers to a permanently owned household slave
📊 A different legal category than the hired servant in verse 10
👪 Counted as a lasting part of the family, unlike hired help
---
## 🏡 He That Is Born In His House
A slave born into the priest's household, raised there from birth, was treated the same as one purchased - both belonged to the family in a way a hired worker never did. Both categories were allowed to eat the holy food.
🏡 A household-born slave, raised there from birth
🤝 Treated the same as a purchased slave
✅ Both categories were permitted to eat the holy food
---
## 👰 The Priest's Daughter... Married Unto A Stranger
Once a priest's daughter married a man outside the priestly family, she legally joined her husband's household instead. That change in household membership meant she lost her right to eat the holy food she grew up with.
👰 Marriage moved her legally into her husband's household
🔗 Echoes the same marriage-and-household logic from chapter 21
🍞 Losing household membership meant losing this specific right
---
## 🚫 She May Not Eat Of An Offering Of The Holy Things
This restates the point plainly: her new household determined her access, not her birth family or her personal holiness. The rule tracks legal household membership, not affection or blood relationship.
🚫 Access followed her legal household, not her birth family
📏 Blood relationship alone wasn't enough once she married out
🔁 A direct restatement for emphasis
---
## 💔 If The Priest's Daughter Be A Widow, Or Divorced, And Have No Child
Three specific conditions bring her back under her father's roof legally: her husband's death, a divorce, and having no children to tie her to her former husband's household. All three had to be true together.
💔 Two life events - widowhood or divorce - open this door
👶 Having no children is the third required condition
📋 All three conditions needed to apply together
---
## 🏠 Is Returned Unto Her Father's House, As In Her Youth
"As in her youth" makes clear she's treated exactly as she was before she ever married - fully restored to her original place in the priestly household, not a lesser or partial status.
🏠 Fully restored, not a partial or lesser status
⏮️ Treated exactly as before her marriage
👪 Household membership can shift back under the right conditions
---
## 🍞 She Shall Eat Of Her Father's Meat
Her right to the holy food returns along with her restored household membership. This confirms the rule really is about household status, since the same woman gains and loses this right as her circumstances change.
🍞 Her eating rights return with her household status
🔁 Proves the rule tracks household, not personal identity
👤 The same woman gains and loses this right over her lifetime
---
## 🚫 There Shall No Stranger Eat Thereof
The section closes exactly where it opened, underlining the same core rule one more time: this food belonged to the priestly household, and nothing outside that household - however close or sympathetic - qualified.
🔁 Closes the section with the same rule it opened with
📚 A deliberate bookend, not a repeated accident
🏠 The household boundary is the one constant through every case

# Leviticus 22:14-16
# 🔢 Eating The Holy Food By Accident
---
## 😳 If A Man Eat Of The Holy Thing Unwittingly
"Unwittingly" means without realizing it - an honest mistake, not deliberate theft or disrespect. This law makes room for genuine accidents, separate from the harsher penalties given elsewhere for intentional violations.
😳 "Unwittingly" means an honest, unintentional mistake
⚖️ Treated differently than deliberate disrespect
📖 The law distinguishes accident from intent throughout Leviticus
---
## ➕ He Shall Put The Fifth Part Thereof Unto It
The penalty for an honest mistake was repayment plus 20% - the value eaten, plus a fifth of that value added on top. This exact formula for restitution shows up again in Leviticus 5:16 for a related offense.
➕ A 20% penalty added on top of straight repayment
🔗 The same formula appears again in Leviticus 5:16
⚖️ Consistent restitution math used across similar cases
---
## 🎁 Give It Unto The Priest With The Holy Thing
The repayment went straight back to the priesthood, restoring what was lost from the system the holy food belonged to. This wasn't a fine paid to some general fund - it replaced the exact thing that was wrongly consumed.
🎁 Repayment went directly back to the priesthood
🔄 Restored the exact system the food came from
🚫 Not a general fine - a direct, specific replacement
---
## 🛡️ They Shall Not Profane The Holy Things
The responsibility shifts here to the priests themselves - they had a duty to guard the holy food carefully, not just to receive it. Letting it slip into careless hands would count as their own failure too.
🛡️ Shifts responsibility onto the priests as guardians
👀 Careless handling by priests counted as their own failure
🔗 Same "profane" word used throughout this whole chapter
---
## ⚖️ Suffer Them To Bear The Iniquity Of Trespass
If priests let people eat the holy things carelessly, the guilt didn't stop with the person who ate it - the priests themselves would bear responsibility for allowing it. Guarding the system was treated as seriously as following it.
⚖️ Priests could bear guilt for careless enforcement too
👥 Guilt wasn't limited to just the person who made the mistake
🛡️ Guarding the system mattered as much as obeying it
---
## ✨ I The LORD Do Sanctify Them
The refrain closes this short section the same way it closed the last one - a reminder that behind every restitution rule and every guarding duty stands God's own claim on these things as holy.
✨ Same refrain, same reminder of God's ownership
🔁 Closes this section exactly as the previous one closed
📖 Ties this small case law back to the chapter's bigger theme

# Leviticus 22:17-21
# 🐑 Offerings Must Be Without Blemish
---
## 🌍 Whatsoever He Be Of The House Of Israel, Or Of The Strangers In Israel
This rule widens out to include foreigners living among Israel, not just native-born Israelites. Unlike the eating restrictions earlier in this chapter, bringing an acceptable offering wasn't limited by household or birth.
🌍 Includes foreigners living among Israel, not just natives
🔀 A wider scope than the eating rules earlier in the chapter
🤝 Offering access was more open than household food access
---
## 🙏 For All His Vows, And For All His Freewill Offerings
A "vow" offering fulfilled a specific promise made to God in advance, while a "freewill offering" was given spontaneously with no prior promise attached. Both were voluntary, but they carried different levels of obligation once the words were spoken.
🙏 A vow fulfills a promise already made to God
🎁 A freewill offering has no prior promise attached
📊 Both voluntary, but carrying different levels of obligation
---
## 🐐 Ye Shall Offer At Your Own Will A Male Without Blemish
"Without blemish" means physically whole and healthy, the same standard chapter 21 required of the priests themselves. The animal offered had to visually match the wholeness expected of the person presenting it.
🐐 "Without blemish" means physically whole and healthy
🔗 The exact same standard chapter 21 set for priests
👤 The animal's condition mirrored the offerer's expected standard
---
## 🐄 Of The Beeves, Of The Sheep, Or Of The Goats
"Beeves" is an old plural form of cattle, still used a few times in the King James Bible. These three animals - cattle, sheep, and goats - were the standard livestock accepted for this kind of offering throughout Leviticus.
🐄 "Beeves" is an old KJV plural word for cattle
🐑 Cattle, sheep, and goats were the standard offering animals
📖 The same three species appear throughout Leviticus's offering laws
---
## 🚫 Whatsoever Hath A Blemish, That Shall Ye Not Offer
This states the ban plainly, with no exceptions listed here. "Not acceptable" isn't about God's pickiness - it reflects the same wholeness standard already applied to the priests handling the offering.
🚫 States the ban plainly, no exceptions given
🔗 Mirrors the wholeness standard already set for priests
🎯 About consistent symbolism, not arbitrary pickiness
---
## 🕊️ A Sacrifice Of Peace Offerings...To Accomplish His Vow
A peace offering, explained fully back in Leviticus 3, was a fellowship meal shared between the offerer, the priests, and God - part of the animal burned, part eaten by the priests, part eaten by the person who brought it. Fulfilling a vow through this kind of offering added a personal promise on top of the usual peace-offering pattern.
🕊️ A peace offering is a shared fellowship meal (Leviticus 3)
🍖 Portions went to the altar, the priests, and the offerer
🙏 A vow added a personal promise on top of the usual pattern
---
## ✅ It Shall Be Perfect To Be Accepted; There Shall Be No Blemish Therein
The section closes by restating its core requirement one final time, in the strongest language yet - "perfect" and "no blemish" together leave no room for a partial exception.
✅ Restates the requirement in its strongest language yet
🚫 "Perfect" and "no blemish" together leave zero exceptions
📚 A firm close before the chapter turns to specific examples

# Leviticus 22:22-25
# 🔍 Specific Blemishes And Foreign Animals
---
## 👁️ Blind, Or Broken, Or Maimed, Or Having A Wen
This opens a detailed list of disqualifying conditions: blindness, a broken bone, a mutilated or injured body part, and a "wen" - an old word for a lump or growth on the skin, like a cyst or tumor.
👁️ Blindness opens the specific list of disqualifiers
🦴 "Broken" and "maimed" cover fractures and mutilation
🔤 A "wen" is an old word for a skin lump or cyst
---
## 🩹 Or Scurvy, Or Scabbed
"Scurvy" and "scabbed" both describe ongoing skin conditions - crusty, scaly, or oozing skin disease, not the vitamin-deficiency disease scurvy means in modern English. These were visible, lasting conditions, not short-term rashes.
🩹 Both describe ongoing, visible skin disease
🔤 Not the modern vitamin-deficiency meaning of "scurvy"
⏳ Lasting conditions, not a passing rash
---
## 🚫 Ye Shall Not Offer These Unto The LORD, Nor Make An Offering By Fire
"Offering by fire" refers to any sacrifice burned on the altar - the ban here is total, covering every kind of altar offering these animals might otherwise have been used for.
🚫 A total ban across every type of altar offering
🔥 "Offering by fire" means anything burned on the altar
📏 No partial exception for a lesser sacrifice type
---
## ➕ A Bullock Or A Lamb That Hath Any Thing Superfluous Or Lacking In His Parts
"Superfluous" means an extra body part, and "lacking" means a missing one - both milder defects than the conditions just listed. This distinction sets up the next verse's more lenient rule for this specific category.
➕ "Superfluous" means extra, "lacking" means missing
📊 A milder category than blindness or scabbing
🔜 Sets up the more flexible rule in the very next verse
---
## 🎁 Thou Mayest Offer For A Freewill Offering; But For A Vow It Shall Not Be Accepted
This creates a tier: a minor extra-or-missing-part defect was allowed for a spontaneous freewill gift, but not for a vow made with a specific promise attached. Vows, being formal commitments, were held to the highest standard available.
📊 Creates a two-tier standard based on offering type
🙏 Vows, as formal promises, required the highest standard
🎁 Freewill offerings had slightly more flexibility
---
## ✂️ Ye Shall Not Offer... That Which Is Bruised, Or Crushed, Or Broken, Or Cut
This points to injuries affecting an animal's reproductive organs, a practice sometimes used in the ancient world to control breeding. Whatever the original cause, the result made the animal unfit as a symbol of wholeness before God.
✂️ Points to injuries affecting reproductive organs
🌍 Reflects an ancient practice used to control animal breeding
🚫 Made an animal unfit as a symbol of wholeness
---
## 🗺️ Neither Shall Ye Make Any Offering Thereof In Your Land
This confirms the rule wasn't limited to animals brought specifically to the tabernacle - it covered the whole land Israel would settle, ruling out any local shortcut or exception once they were no longer wandering in the wilderness.
🗺️ Extends the rule beyond just the tabernacle setting
🏡 Applied across the whole land Israel would settle
🚫 Closed off any local loophole once settled
---
## 🌍 Neither From A Stranger's Hand Shall Ye Offer The Bread Of Your God Of Any Of These
Even an animal purchased from a foreign trader had to meet this same standard - there was no way to import around the rule by buying from someone outside Israel's own herds.
🌍 Closes a potential loophole: buying from a foreign trader
🚫 Foreign origin didn't lower the required standard
🔒 No way to import around this rule
---
## 🔤 Because Their Corruption Is In Them
"Corruption" here means physical defect or damage, not moral corruption. The word choice still carries weight, though - it frames a blemished animal as something broken, not simply imperfect by accident.
🔤 "Corruption" means physical defect, not moral failing
⚖️ Strong word choice for what's really a physical standard
📚 Closes this section's detailed blemish discussion

# Leviticus 22:26-30
# 🐣 Timing Rules For Offering Animals
---
## 🍼 When A Bullock, Or A Sheep, Or A Goat, Is Brought Forth
"Brought forth" means born. This introduces a minimum-age rule for any of these three animals before they could ever be considered for an offering.
🍼 "Brought forth" means born
📏 Introduces a minimum-age requirement for offering animals
🐑 Applies to cattle, sheep, and goats alike
---
## 7️⃣ It Shall Be Seven Days Under The Dam
"Dam" is an old word for a mother animal. A newborn had to stay nursing with its mother for a full week before it could even be considered for sacrifice - echoing the same seven-day pattern used for a human baby boy before circumcision in Leviticus 12:3.
7️⃣ "Dam" is an old word for a mother animal
🔗 Echoes the same seven-day pattern in Leviticus 12:3
🤱 Ensured a newborn animal wasn't taken too early
---
## 8️⃣ From The Eighth Day And Thenceforth It Shall Be Accepted
"Thenceforth" means from that point onward. Once the animal passed the seven-day mark, it became permanently eligible - this was a one-time waiting period, not a repeated restriction.
🔤 "Thenceforth" means from that point onward
✅ Once past day seven, permanently eligible from then on
⏳ A one-time waiting period, not a recurring rule
---
## 🚫 Ye Shall Not Kill It And Her Young Both In One Day
Whether a cow or a ewe, killing a mother animal and her offspring on the same day was specifically banned. This stands out as a rule of basic compassion toward animals, separate from the ritual purity concerns running through the rest of the chapter.
🚫 Bans killing a mother and her young the same day
❤️ A rule rooted in compassion, not ritual purity
🔀 Stands apart from this chapter's usual uncleanness themes
---
## 🙏 A Sacrifice Of Thanksgiving Unto The LORD, Offer It At Your Own Will
A thanksgiving offering was a specific type of peace offering given in gratitude, not to fulfill a vow or meet an obligation. "At your own will" reminds the reader this category stayed voluntary, matching the freewill offerings mentioned earlier in the chapter.
🙏 A specific, gratitude-driven type of peace offering
🎁 Voluntary, not tied to a vow or obligation
🔗 Matches the freewill-offering category from earlier
---
## 🌙 On The Same Day It Shall Be Eaten Up; Ye Shall Leave None Of It Until The Morrow
"Morrow" means the next day. This meat had to be eaten the same day it was offered, the same same-day rule given for Passover leftovers in Exodus 12:10 and for a related peace offering in Leviticus 7:15 - meant to be shared quickly with others rather than stored or hoarded.
🌙 "Morrow" means the next day
🔗 The same same-day rule appears in Exodus 12:10 and Leviticus 7:15
🤝 Encouraged sharing the meal quickly, not hoarding it

# Leviticus 22:31-33
# 🇪🇬 Closing: Keep My Commandments
---
## 📜 Therefore Shall Ye Keep My Commandments, And Do Them
"Therefore" ties this closing command back to everything just covered - the chapter's many specific cases all flow from this one general instruction to actually obey, not just admire the rules from a distance.
📜 "Therefore" ties this back to every rule just given
🎯 A call to actual obedience, not just agreement in principle
📚 Sums up the chapter's many specific cases in one line
---
## 🔤 Neither Shall Ye Profane My Holy Name
This closing warning echoes the chapter's opening line in verse 2 almost word for word, framing the entire chapter as one continuous thought bookended by the same concern.
🔁 Nearly repeats the chapter's opening line from verse 2
📚 Frames the whole chapter as one bookended unit
🔤 Same "profane" word used throughout the chapter
---
## ✨ But I Will Be Hallowed Among The Children Of Israel
"Hallowed" means treated as holy or set apart. This flips the responsibility outward - it's no longer just about individual priests, but about Israel as a whole nation reflecting God's holiness in how they lived.
✨ "Hallowed" means treated as holy, set apart
🇮🇱 Shifts focus from individual priests to the whole nation
👥 A corporate responsibility, not just a personal one
---
## 👑 I Am The LORD Which Hallow You
God names himself as the source of Israel's holy status, not their own effort or rule-keeping. Every earlier "I the LORD do sanctify them" line throughout this chapter has been building toward this same point.
👑 God, not human effort, is the source of Israel's holiness
🔗 Builds on every earlier "sanctify" line in this chapter
🙏 Obedience mattered, but never earned the status itself
---
## 🇪🇬 That Brought You Out Of The Land Of Egypt, To Be Your God
This closing reminder of the Exodus is a common formula throughout Leviticus, showing up again in chapters like 11, 19, and 25. It grounds every command in something Israel already knew was true - God had already rescued them before he ever asked anything of them.
🇪🇬 A recurring closing formula throughout Leviticus
📖 Appears again in chapters 11, 19, and 25
❤️ Rescue came first, obedience was the response to it
---
## ✨ I Am The LORD
The chapter's final word is the same refrain that opened it, closing the entire chapter exactly the way it began - a deliberate frame around everything in between.
🔁 The exact same phrase that opened the chapter
📚 A deliberate frame around the whole chapter
🏁 The final word, fittingly, belongs to God's own name
`;

export const LEVITICUS_TWENTY_TWO_PERSONAL_SECTIONS = parseLeviticusTwentyTwoRawNotes(LEVITICUS_TWENTY_TWO_RAW_NOTES);
