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
## 🙅 Separate Themselves From The Holy Things

Separate means stepping back for a season, not forever.

A priest who was ritually unclean had to stay away from the holy offerings.

He could return once he became clean again.

The rest of this chapter lists exactly which conditions counted as unclean.

🙅 Separate means a temporary step back

⏳ It applies only during uncleanness

📜 The unclean conditions come later in the chapter

📖 Holiness needed ongoing care, not just one moment

## 🔤 Profane Not My Holy Name

Profane means treating something set apart as if it were ordinary.

A priest serving while unclean did more than break a small rule.

He dragged God's own name into carelessness.

The priest represented God's holiness in everything he touched.

🔤 Profane means treating something holy as ordinary

👤 The priest represented God in his actions

⚠️ Carelessness reached beyond the priest himself

📖 It touched God's own reputation

## ✨ I Am The LORD

This short phrase closes the opening command in verse two.

It repeats again and again through the whole chapter.

Each time it appears, it points back to God's own authority.

These were never just tabernacle rules about tidy behavior.

They carried the weight of God's own name behind them.

✨ A refrain repeated through this chapter

👑 It points back to God's authority

🔁 Watch for it closing section after section

📖 Every rule carried God's own weight

# Leviticus 22:3-9
# 🩹 When A Priest May Not Eat The Holy Food
---
## 💀 Cut Off From My Presence

Cut off is one of the most serious penalties in the law.

It was used for violations that touched holy things directly.

Scholars are divided on its exact form.

Some think it meant execution, others exile, others God ending that life directly.

Every use of the phrase marks total separation from Israel's life with God.

💀 One of the most serious penalties

❓ Its exact form is debated

🚫 It always meant total separation

📖 Nothing mattered more than guarding what was holy

## 🩹 Is A Leper, Or Hath A Running Issue

Leper covers a range of skin conditions.

It does not mean only the disease called leprosy today.

Leviticus 13 lists all of them in detail.

A running issue means an ongoing bodily discharge.

Leviticus 15 explains that condition in full.

Both conditions kept a priest from serving until he was clean again.

🩹 Leper covers many skin conditions, not one disease

📜 Leviticus 13 lists them in full

💧 A running issue means an ongoing discharge

📖 Both kept a priest from serving until clean

## ⚰️ Toucheth Any Thing That Is Unclean By The Dead

Touching a dead body made a person unclean for a time.

So did touching anything the body had already touched.

Numbers 19 explains the full process for becoming clean again.

This was one of the most common ways a priest became disqualified from duty.

⚰️ Contact with a corpse caused uncleanness

📜 Numbers 19 explains the full process

🔁 One of the most common causes among priests

📖 Death was treated as the opposite of holiness

## 💧 A Man Whose Seed Goeth From Him

This refers to a bodily emission, a specific cause of uncleanness.

Leviticus 15 covers this case in detail.

It required washing and lasted only until evening.

That same pattern repeats for several conditions on this list.

💧 It refers to a bodily emission

📜 Leviticus 15 covers this case

🚿 It required washing to end

📖 Even minor uncleanness still needed real care

## 🐛 Toucheth Any Creeping Thing

Creeping thing points back to the unclean small animals named in Leviticus 11.

Insects, rodents, and similar small creatures fall into this category.

Even brief contact with one made a person unclean for the rest of the day.

This ties the purity rules in this chapter back to the food laws given earlier.

🐛 It points to Leviticus 11's small animals

👆 Even brief contact caused uncleanness

🔗 It ties back to the earlier food laws

📖 Small contact still carried real weight

## 🌆 Unclean Until Even

Even means evening, specifically the moment the sun went down.

Many of the milder uncleanness categories in this system lasted only until then.

This built in a reset that kept short term impurity from piling up.

A priest was not stuck carrying yesterday's uncleanness into tomorrow.

🌆 Even means evening, at sundown

⏰ Milder categories reset at sundown

🔄 Uncleanness did not pile up over time

📖 God built in a clean slate

## 🚿 Unless He Wash His Flesh With Water

Washing was not simply hygiene here.

It was the ritual act that officially ended a period of uncleanness.

Without it, the uncleanness did not just fade away once the sun went down.

The washing itself had to happen for the day to actually reset.

🚿 Washing was a ritual act, not just hygiene

✅ It was required to end the uncleanness

⏳ Sundown alone was not enough

📖 God asked for action, not time passing

## 🍞 Because It Is His Food

The holy offerings were not a luxury or a bonus for priests.

They were how priests and their families were fed.

Priests owned no farmland of their own in Israel.

Numbers 18 explains that arrangement in full.

Every purity rule in this chapter protected something priests genuinely depended on.

🍞 Priests owned no farmland of their own

📜 Numbers 18 explains this arrangement

⚖️ These rules protected their actual livelihood

📖 Holiness and daily bread were tied together

## 🦴 That Which Dieth Of Itself, Or Is Torn With Beasts

An animal found already dead could never be eaten by a priest.

Neither could one killed and torn apart by a wild predator.

Its blood had not been properly drained the way a slaughtered offering required.

Exodus 22 gives this same ban to every Israelite, not only priests.

🦴 Its blood was never properly drained

📜 Exodus 22 gives this ban to all Israel

🔁 Applied here specifically to a priest's own food

📖 The standard for priests matched everyone else

## ✨ I The LORD Do Sanctify Them

The chapter's refrain returns here with a key addition.

God names himself as the one doing the sanctifying.

The priests were not sanctifying themselves through careful behavior alone.

Their obedience mattered, but their holy status ultimately came from God.

✨ God names himself as the one who sanctifies

🙏 Obedience mattered, but was not the source

🔁 Same refrain, slightly expanded from verse two

📖 Holiness was a gift before a duty

# Leviticus 22:10-13
# 🏠 Who Belongs To The Priest's Table
---
## 🚫 There Shall No Stranger Eat Of The Holy Thing

Stranger here does not mean a foreigner specifically.

It means anyone outside the priest's own household, even a fellow Israelite.

The holy food was tied to belonging to a priestly family.

It was never tied to nationality at all.

🚫 Stranger means outside the priest's household

👨‍👩‍👧‍👦 It was tied to family, not nationality

🍞 Eating this food required belonging

📖 Access followed household, not birth as a nation

## 👷 A Sojourner Of The Priest, Or An Hired Servant

A sojourner living with the priest still could not eat the holy food.

Neither could a paid worker the priest employed.

Both were temporary or contracted members of the household.

That was different from being born or bought into it permanently.

👷 Both were temporary members of the household

📄 A hired servant worked for wages only

🚫 Temporary status did not earn eating rights

📖 Belonging had to be permanent, not paid for

## 💰 If The Priest Buy Any Soul With His Money

This refers to a slave purchased and permanently owned by the priest.

That was a very different legal category from a hired servant working for wages.

Ancient household slavery made someone a lasting part of the family unit.

A hired worker's arrangement, by contrast, could end at any time.

💰 It refers to a permanently owned household slave

📊 A different legal category than a hired servant

👪 Counted as a lasting part of the family

📖 Permanence, not payment, decided who belonged

## 🏡 He That Is Born In His House

A slave born into the priest's household was raised there from birth.

He was treated the same as one who had been purchased.

Both belonged to the family in a way a hired worker never did.

Both categories were allowed to eat the holy food.

🏡 A household born slave, raised there from birth

🤝 Treated the same as a purchased slave

✅ Both were permitted to eat the holy food

📖 Birth in the house counted as real belonging

## 👰 The Priest's Daughter Married Unto A Stranger

Once a priest's daughter married a man outside the priestly family, everything changed.

She legally joined her husband's household instead.

That shift in household membership meant she lost her right to eat this food.

The food she grew up with was no longer hers to eat.

👰 Marriage moved her into her husband's household

🔗 Household membership decided access, not birth

🍞 She lost the right she grew up with

📖 A legal change carried real consequences

## 💔 If The Priest's Daughter Be A Widow, Or Divorced, And Have No Child

Three specific conditions could bring her back under her father's roof.

The first was her husband's death.

The second was a divorce.

The third was having no child to tie her to her former husband's household.

All three conditions had to be true together.

💔 Widowhood and divorce are the first two conditions

👶 Having no child is the third condition

📋 All three had to apply together

📖 The law traced exact circumstances, not general sympathy

## 🏠 Is Returned Unto Her Father's House, As In Her Youth

As in her youth makes the meaning plain.

She was treated exactly as she had been before she ever married.

Her original place in the priestly household was fully restored.

This was not a lesser or partial status.

🏠 She was fully restored, not partly

⏮️ Treated exactly as before her marriage

👪 Household membership could shift back

📖 Restoration here was complete, not partial

## 🍞 She Shall Eat Of Her Father's Meat

Her right to the holy food returned along with her restored household status.

The very same woman could gain and lose this right over her lifetime.

That detail confirms the rule really was about household, not personal identity.

Nothing about her own character changed the food laws around her.

🍞 Her eating rights returned with her household status

🔁 The rule tracked household, not personal identity

👤 The same woman gained and lost this right

📖 Belonging, not merit, controlled the outcome

# Leviticus 22:14-16
# 🔢 Eating The Holy Food By Accident
---
## 😳 If A Man Eat Of The Holy Thing Unwittingly

Unwittingly means without realizing it, an honest mistake.

This was never treated the same as deliberate theft or disrespect.

The law made real room for genuine accidents.

That distinction runs through Leviticus again and again.

😳 Unwittingly means an honest, unintentional mistake

⚖️ Treated differently than deliberate disrespect

📜 Leviticus separates accident from intent often

📖 God's law noticed the difference between the two

## ➕ He Shall Put The Fifth Part Thereof Unto It

The penalty for an honest mistake was repayment plus a fifth of the value.

That fifth part was added on top of the original amount owed.

Leviticus 5 uses this exact same formula for a related offense.

Consistent restitution math shows up across similar cases in this book.

➕ A fifth added on top of repayment

📜 Leviticus 5 uses the same formula

⚖️ Consistent math used across similar cases

📖 A mistake still carried a real cost

## 🛡️ They Shall Not Profane The Holy Things

The responsibility shifts here to the priests themselves.

They had a duty to guard the holy food carefully.

That duty went beyond simply receiving what was brought to them.

Letting it slip into careless hands counted as their own failure too.

🛡️ Responsibility shifts onto the priests as guardians

👀 Careless handling counted as their own failure

🔗 The same word profane runs through this chapter

📖 Guarding mattered as much as receiving

## ⚖️ Suffer Them To Bear The Iniquity Of Trespass

If priests let people eat holy things carelessly, guilt did not stop there.

The priests themselves would bear responsibility for allowing it to happen.

Guarding the system was treated as seriously as obeying it.

The chapter's refrain returns once more at the very end of this thought.

⚖️ Priests could bear guilt for careless enforcement

👥 Guilt reached beyond the one who ate

🛡️ Guarding mattered as much as obeying

📖 Careless oversight was never treated as small

# Leviticus 22:17-21
# 🐑 Offerings Must Be Without Blemish
---
## 🌍 Whatsoever He Be Of The House Of Israel, Or Of The Strangers In Israel

This rule widens out to include foreigners living among Israel.

It was not limited to native born Israelites.

The eating restrictions earlier in this chapter had been limited by household.

Bringing an acceptable offering was not limited the same way.

🌍 It includes foreigners living among Israel

🔀 Wider in scope than the earlier eating rules

🤝 Offering access was more open than table access

📖 Worship reached further than family lines

## 🙏 For All His Vows, And For All His Freewill Offerings

A vow offering fulfilled a specific promise already made to God.

A freewill offering was given spontaneously with no promise attached beforehand.

Both were fully voluntary acts of worship.

They still carried different levels of obligation once the words were spoken.

🙏 A vow fulfills a promise already made

🎁 A freewill offering has no promise attached

📊 Both were voluntary, but not equal

📖 Words spoken to God carried real weight

## 🐐 A Male Without Blemish, Of The Beeves, Of The Sheep, Or Of The Goats

Without blemish means physically whole and healthy.

Leviticus 21 already required this same standard of the priests themselves.

Beeves is an old plural word for cattle.

Cattle, sheep, and goats were the standard livestock accepted for this kind of offering.

🐐 Without blemish means physically whole and healthy

🔗 The exact same standard set for priests

🔤 Beeves is an old word for cattle

📖 The animal mirrored the offerer's own standard

## 🚫 Whatsoever Hath A Blemish, That Shall Ye Not Offer

This states the ban plainly, with no exceptions listed here.

Rejecting a blemished animal was never about God being hard to please.

It reflected the same wholeness standard already applied to the priests.

Consistency, not pickiness, was the real point.

🚫 States the ban with no exceptions

🔗 Mirrors the wholeness standard for priests

🎯 About consistency, not pickiness

📖 Every part of worship pointed the same direction

## ✅ It Shall Be Perfect To Be Accepted, There Shall Be No Blemish Therein

This closes the section by restating its core requirement once more.

Perfect and no blemish together leave no room for a partial exception.

The next verses turn from this general rule to specific disqualifying cases.

Repetition here was not filler, it was emphasis.

✅ Restates the requirement in its strongest language

🚫 Perfect and no blemish leave zero exceptions

📚 A firm close before specific cases follow

📖 Emphasis, not filler, drove the repetition

# Leviticus 22:22-25
# 🔍 Specific Blemishes And Foreign Animals
---
## 👁️ Blind, Or Broken, Or Maimed, Or Having A Wen

This opens a detailed list of disqualifying conditions.

Blindness comes first, an obvious and total defect.

Broken and maimed cover fractures and injuries that damaged the body.

A wen is an old word for a lump or growth on the skin.

👁️ Blindness opens the list of disqualifiers

🦴 Broken and maimed cover fractures and injuries

🔤 Wen is an old word for a lump

📖 Every defect on this list was visible

## 🩹 Or Scurvy, Or Scabbed

Scurvy and scabbed both describe ongoing skin conditions here.

Crusty, scaly, or oozing skin disease is the meaning intended.

This is not the vitamin deficiency disease scurvy means in modern English.

Both were visible, lasting conditions, not short lived rashes.

🩹 Both describe ongoing, visible skin disease

🔤 Not the modern meaning of scurvy

⏳ Lasting conditions, not a passing rash

📖 Old words can quietly change meaning over time

## 🔥 Ye Shall Not Offer These Unto The LORD, Nor Make An Offering By Fire

Offering by fire refers to any sacrifice burned on the altar.

The ban stated here covered every kind of altar offering.

None of these animals could be substituted into a lesser sacrifice type.

The rejection was total, not partial.

🚫 A total ban across every altar offering

🔥 Offering by fire means anything burned there

📏 No partial exception for a lesser sacrifice

📖 Wholeness was required at every level

## ➕ A Bullock Or A Lamb That Hath Any Thing Superfluous Or Lacking In His Parts

Superfluous means an extra body part.

Lacking means a missing one.

Both were milder defects than the conditions just listed above.

This distinction sets up a more flexible rule in the very next verse.

➕ Superfluous means extra, lacking means missing

📊 A milder category than blindness or scabbing

🔜 It sets up the next verse's rule

📖 Not every defect was treated the same way

## 🎁 Thou Mayest Offer For A Freewill Offering, But For A Vow It Shall Not Be Accepted

This creates a clear tier based on the type of offering.

A minor extra or missing part defect was allowed for a freewill gift.

That same defect was not allowed for a vow tied to a specific promise.

Vows, as formal commitments, were held to the highest standard available.

📊 A two tier standard based on offering type

🙏 Vows required the highest standard available

🎁 Freewill offerings allowed slightly more flexibility

📖 A formal promise demanded the higher standard

## ✂️ That Which Is Bruised, Or Crushed, Or Broken, Or Cut

This points to injuries affecting an animal's reproductive organs.

Some in the ancient world used this practice to control breeding.

Whatever the original cause, the result made the animal unfit for this purpose.

An animal offered to God needed to picture wholeness, not damage.

✂️ It points to injuries in reproductive organs

🌍 An ancient practice used to control breeding

🚫 It made the animal unfit as an offering

📖 Wholeness, not utility, was the required picture

## 🗺️ Neither Shall Ye Make Any Offering Thereof In Your Land

This confirms the rule was not limited to the tabernacle setting alone.

It covered the whole land Israel would eventually settle.

No local shortcut or exception applied once the wilderness years were over.

The standard traveled with the people wherever they lived.

🗺️ It extends beyond just the tabernacle

🏡 Applied across the whole land Israel settled

🚫 No local loophole once they were settled

📖 The standard traveled with the people

## 🌍 Neither From A Stranger's Hand Shall Ye Offer The Bread Of Your God

Even an animal purchased from a foreign trader had to meet this standard.

There was no way to buy around the rule from someone outside Israel's own herds.

Their corruption is in them closes this whole discussion.

Corruption here means physical defect, not moral failing.

🌍 A foreign trader could not lower the standard

🔒 No way to import around this rule

🔤 Corruption here means physical defect

📖 The standard held no matter the source

# Leviticus 22:26-30
# 🐣 Timing Rules For Offering Animals
---
## 🍼 It Shall Be Seven Days Under The Dam

Dam is an old word for a mother animal.

A newborn calf, lamb, or kid had to stay nursing with its mother first.

That week had to pass before it could even be considered for sacrifice.

Leviticus 12 uses this same seven day pattern for a human baby boy.

🍼 Dam means an old word for a mother

🗓️ A full week had to pass first

🔗 Echoes the same pattern in Leviticus 12

📖 Even timing carried meaning in worship

## 8️⃣ From The Eighth Day And Thenceforth It Shall Be Accepted

Thenceforth means from that point onward.

Once an animal passed the seven day mark, it became permanently eligible.

This was a one time waiting period, not a repeated restriction.

Nothing about later use required waiting again.

🔤 Thenceforth means from that point onward

✅ Eligible permanently once past day seven

⏳ A one time wait, not a recurring rule

📖 Grace had a clear starting line

## 🚫 Ye Shall Not Kill It And Her Young Both In One Day

Whether a cow or a ewe, this rule applied the same way.

Killing a mother animal and her offspring on the same day was banned outright.

This stands out as a rule of basic compassion toward animals.

It sits apart from the ritual purity concerns running through the rest of the chapter.

🚫 Bans killing a mother and her young

❤️ Rooted in compassion, not ritual purity

🔀 Stands apart from this chapter's usual themes

📖 God's law made room for simple mercy

## 🙏 A Sacrifice Of Thanksgiving Unto The LORD, Offer It At Your Own Will

A thanksgiving offering was a specific type of peace offering.

It was given out of gratitude, not to fulfill a vow.

At your own will reminds the reader this stayed fully voluntary.

It matched the freewill offerings already mentioned earlier in the chapter.

🙏 A gratitude driven type of peace offering

🎁 Voluntary, not tied to a vow

🔗 Matches the freewill category from earlier

📖 Gratitude asked for a willing heart

## 🌙 Ye Shall Leave None Of It Until The Morrow

Morrow means the next day.

This meat had to be eaten the same day it was offered.

Exodus 12 gives this exact same rule for Passover leftovers.

Leviticus 7 gives it again for a related peace offering.

The meal was meant to be shared quickly, not stored or hoarded.

🌙 Morrow means the next day

📜 The same rule appears in Exodus 12

🔗 Leviticus 7 repeats it for a related offering

📖 Sharing quickly mattered more than saving

# Leviticus 22:31-33
# 🇪🇬 Closing: Keep My Commandments
---
## 📜 Keep My Commandments, And Do Them

Therefore ties this closing command back to everything just covered.

The chapter's many specific cases all flow from one general instruction.

That instruction was to actually obey, not just admire the rules from a distance.

Knowing the law was never the same as keeping it.

📜 Therefore ties this back to every rule given

🎯 A call to real obedience, not agreement

📚 Sums up many cases in one line

📖 Knowing was never the same as keeping

## 🔤 Neither Shall Ye Profane My Holy Name

This closing warning echoes the chapter's opening line in verse two almost exactly.

The whole chapter is framed as one continuous thought.

It opens and closes around the very same concern.

Nothing in between was accidental or unrelated.

🔁 Nearly repeats the opening line from verse two

📚 Frames the whole chapter as one unit

🔤 The word profane returns one final time

📖 Every rule in between served this one concern

## ✨ But I Will Be Hallowed Among The Children Of Israel

Hallowed means treated as holy, set apart.

This flips the responsibility outward at the very end of the chapter.

It was no longer just about individual priests handling holy things.

Israel as a whole nation was meant to reflect God's holiness in how they lived.

✨ Hallowed means treated as holy, set apart

🇮🇱 Shifts focus from priests to the whole nation

👥 A shared responsibility, not just a personal one

📖 A whole people were meant to reflect God

## 👑 I Am The LORD Which Hallow You

God names himself as the source of Israel's holy status.

It never came from their own effort or careful rule keeping.

Every earlier line in this chapter about God sanctifying them built toward this point.

Obedience mattered, but it never earned the status itself.

👑 God, not human effort, is the source

🔗 Builds on every earlier line in the chapter

🙏 Obedience mattered, but never earned holiness

📖 Status was given before it was lived out

## 🇪🇬 That Brought You Out Of The Land Of Egypt, To Be Your God

This closing reminder of the exodus is a common formula in Leviticus.

It shows up again in chapters like eleven, nineteen, and twenty five.

It grounds every command in something Israel already knew was true.

God had already rescued them before he ever asked anything of them.

The chapter's very last word is the same refrain that opened it in verse two.

That framing was deliberate, not accidental, a frame around the whole chapter.

🇪🇬 A recurring formula through Leviticus

📜 It appears again in later chapters

❤️ Rescue came first, obedience followed

📖 The final word belongs to God's own name
`.trim();

export const LEVITICUS_TWENTY_TWO_PERSONAL_SECTIONS = parseLeviticusTwentyTwoRawNotes(LEVITICUS_TWENTY_TWO_RAW_NOTES);
