export type NumbersEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersEighteenRawNotes(rawText: string): NumbersEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 18:${startVerse}` : `Numbers 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 18 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_EIGHTEEN_RAW_NOTES = `# Numbers 18:1-7
# ⚖️ Bearing The Weight Of The Sanctuary
---
## 🗣️ The LORD Said Unto Aaron

God speaks directly to Aaron here, not through Moses.

That is rare in the book of Numbers.

Most instructions in this book arrive by way of Moses first.

This chapter opens right after Israel's terrified question at the end of chapter seventeen.

Shall we be consumed with dying, they had just asked.

God answers that fear immediately, in person, to the one it concerns most.

🗣️ Rare moment God speaks directly to Aaron

❓ Comes right after Israel's fearful question

🛡️ Answers that fear immediately

📖 Structure is God's response to panic

## ⚖️ Bear The Iniquity Of The Sanctuary

To bear iniquity means to carry legal responsibility if something goes wrong.

It does not mean Aaron himself is guilty of a sin.

It means he answers on Israel's behalf for the sanctuary's purity.

This shifts real risk onto Aaron's family alone.

Before this, any Israelite who made a mistake near the tabernacle could die.

Now Aaron and his sons absorb that danger first, as a shield for the whole camp.

⚖️ Bear iniquity means carrying responsibility

🙅 Not the same as personal guilt

🛡️ Aaron's family becomes a shield

📖 Risk shifts away from ordinary Israelites

## 🏠 Thy Father's House With Thee

Thy father's house means Aaron's own family line inside the tribe of Levi.

It points specifically to the descendants of his father Amram.

That group was already singled out earlier, back in Numbers chapter three.

This phrase is narrower than all of Levi.

It marks out priests from the wider tribe they came from.

🏠 Father's house means Aaron's specific line

📖 Already marked out in Numbers three

🔍 Narrower than the whole tribe of Levi

➡️ Separates priests from Levites in general

## 🤝 Thy Brethren Also Of The Tribe Of Levi

The wider tribe of Levi now gets brought in as helpers.

They assist the priests but never replace them.

This creates two ranks of service inside one tribe.

Priests handle the holiest tasks at the altar itself.

Levites support that work from one step back.

This two rank system shapes the rest of the whole chapter.

🤝 Levites assist, priests do not share their role

🪜 Two ranks inside one tribe

🕍 Priests alone handle the holiest tasks

📖 Sets up the chapter's whole structure

## 🕍 Before The Tabernacle Of Witness

Only Aaron's direct priestly line may serve at the tabernacle itself.

That means the actual altar and the holy furniture inside it.

Everyone else from the tribe of Levi works in support roles only.

Tabernacle of witness is one of several names this same tent carries in this chapter.

Each name points back to what sits inside it, the tablets of the covenant.

🕍 Only priests serve at the altar directly

🚶 Levites support from one step back

📜 Witness points to the covenant tablets inside

📖 One tent, several names in this chapter

## 📋 They Shall Keep Thy Charge

Charge means an assigned duty, like a guard keeping watch over a post.

This word repeats again and again through the whole chapter.

Each group gets its own specific charge to keep.

Nothing in this system is left vague or optional.

📋 Charge means an assigned duty

🔁 One of the chapter's most repeated words

🎯 Every group gets a specific job

📖 Nothing here is left vague

## 🚫 Shall Not Come Nigh The Vessels Of The Sanctuary

Levites are barred from touching the holy vessels and the altar directly.

The text says this protects both sides, not just the Levites.

If a Levite oversteps this line, Aaron's own family shares the consequence.

Everyone in this system has a stake in everyone else staying inside their role.

🚫 Levites may not touch the holy vessels

🤝 The warning protects both sides at once

⚖️ Aaron's family shares the consequence too

📖 Everyone has a stake in the boundary

## 🚷 A Stranger Shall Not Come Nigh Unto You

Stranger in this law does not mean a foreigner.

It means any Israelite who is not part of the priestly or Levite system.

The word marks who is unauthorized, not who belongs to the nation.

This same meaning of stranger shows up often across the Old Testament's laws.

🚷 Stranger means unauthorized here, not foreign

📖 A common Old Testament use of the word

🎯 About role, not nationality

➡️ Worth remembering in other Old Testament laws

## 🩹 That There Be No Wrath Any More

This line ties the whole chapter back to the plague in chapter sixteen.

Fourteen thousand seven hundred people died there after Korah's rebellion.

God is building a lasting structure so that disaster never has to repeat.

Order here exists to prevent tragedy, not simply to organize the camp.

🩹 Points back to chapter sixteen's plague

📊 That plague killed thousands

🏗️ A lasting system, not a one time fix

📖 Order here exists to prevent tragedy

## 🎁 Given As A Gift For The LORD

Numbers already called the Levites a gift, back in chapters three and eight.

They were set apart to serve in place of Israel's firstborn sons.

God repeats that word here to remind Aaron of something important.

Aaron did not earn or arrange this help himself.

It is God's provision, given to him.

🎁 Same gift language from Numbers three and eight

👶 Levites once stood in for Israel's firstborn

🙌 Aaron did not earn this help

📖 A provision, not his own doing

## 🚪 Within The Vail

The vail is the curtain separating the Most Holy Place from the rest of the tabernacle.

The ark of the covenant sat behind that curtain.

Within the vail means the single most restricted space in the whole camp.

Only Aaron's priestly service reaches into a space this sacred.

🚪 The vail guards the Most Holy Place

📦 Where the ark of the covenant sat

🔒 The most restricted space in the camp

📖 Only Aaron's line serves this close

## 🎀 A Service Of Gift

God repeats the word gift here, this time for the priesthood itself.

Aaron did not qualify for this role by being better than his brothers.

It was given to him, the same way the Levites were given to him.

This undercuts any idea that Aaron's family deserved the honor by merit.

🎀 The priesthood itself is called a gift

🚫 Not earned by being better than his brothers

🎁 Given, the same way the Levites were given

📖 Undercuts any claim of merit

## ☠️ The Stranger That Cometh Nigh Shall Be Put To Death

This warning is the same one that triggered Israel's terror in chapter seventeen.

It is not new information here.

Stating it now, inside a chapter about order, reframes the danger.

The danger is not random.

It is exactly why this whole structure exists in the first place.

☠️ The same warning that caused chapter seventeen's fear

🏗️ Now framed as the reason for structure

🔑 The danger was never random

📖 Order removes it, ignoring order restores it

# Numbers 18:8-14
# 🎁 The Priests' Portion
---
## 📤 The Charge Of Mine Heave Offerings

A heave offering is a portion of a sacrifice lifted up and presented to God.

The lifting motion itself is what heave refers to.

It is not about weight or effort.

The gift is presented up to God first.

Then it is given down to the priest to eat.

That order matters.

The gift passes through God before it becomes food.

📤 Heave refers to a lifting motion

🔄 Presented to God, then given to the priest

🍽️ Becomes food only after that

📖 The gift passes through God first

## 🕯️ By Reason Of The Anointing

Aaron's right to this income traces back to one specific event.

That event was his anointing with oil as high priest.

It is described in Exodus twenty nine and Leviticus eight.

This income is not random generosity.

It is tied to an office Aaron was formally installed into.

The provision follows the position.

It lasts permanently.

🕯️ Points back to Aaron's anointing

📜 Described in Exodus and Leviticus

🏛️ Tied to an office, not goodwill

📖 The provision follows the position

## ♾️ By An Ordinance For Ever

For ever here does not mean this law might expire someday.

It applies to every future generation of priests.

Not only to Aaron himself.

This is a permanent statute, not a temporary arrangement.

It explains why priests still held this right centuries later.

♾️ For ever means permanent, not temporary

👨‍👩‍👧 Applies to every future generation of priests

📅 Not limited to Aaron alone

📖 Explains a right priests held for centuries

## 🌾 Every Meat Offering Of Theirs

Meat offering is an old English term.

It actually means a grain offering.

It was made of flour, oil, and often frankincense.

No animal flesh was involved at all.

Modern readers often misread this phrase as meat in the modern sense.

That misreading is worth catching early in this chapter.

🌾 Meat offering means a grain offering

🫒 Made of flour, oil, and frankincense

🚫 No animal flesh involved at all

📖 A common misreading worth catching early

## 🔥 Most Holy, Reserved From The Fire

Israel's offerings had two tiers of holiness.

One tier was simply holy.

The other was most holy, a higher tier.

Most holy portions were not burned up completely on the altar.

A set aside share was reserved specifically for the priests to eat.

This explains why the priests' income was food, not money.

🔥 Two tiers of holiness existed

🍽️ Most holy portions were saved as food

🙅 Not burned up completely

📖 Explains why priests were paid in food

## 👨 Every Male Shall Eat It

This most holy food could only be eaten by priestly men.

It also had to be eaten inside the sanctuary itself.

That is stricter than the household provisions described a few verses later.

The whole priestly household could eat those provisions anywhere.

This rule's strictness tracks how holy the food actually was.

👨 Priestly men only, eaten in the sanctuary

🏠 Stricter than the household provisions later

🔒 Confined to the sanctuary itself

📖 Strictness tracks the level of holiness

## 🌊 The Wave Offerings

A wave offering got its name from a specific ritual motion.

It was waved side to side toward the altar and back.

A heave offering, by contrast, was lifted up and down.

Both motions were ways of formally presenting a gift to God.

Only after that presentation did the gift become food for the priests.

🌊 Named for a side to side motion

📤 Different from the heave offering's lifting motion

🎁 Both present a gift to God first

📖 Presentation always comes before it becomes food

## 👨‍👩‍👧 To Thy Sons And To Thy Daughters

This portion could be eaten by the whole priestly household.

That includes sons, daughters, and anyone ritually clean in the house.

It could be eaten anywhere, not only inside the tabernacle.

This is a noticeably wider rule than the most holy food.

That earlier food was limited to priestly men inside the sanctuary.

👨‍👩‍👧 Open to the whole priestly household

🧼 Requires ritual cleanness, not gender or office

🗺️ Could be eaten anywhere

📖 A wider rule than the most holy food

## 🌱 The Firstfruits

Firstfruits means the very first portion of a harvest.

It was given to God before anyone touched the rest of the crop.

This was a public way of acknowledging where the harvest came from.

Giving God the first and best portion is a recurring pattern in the Bible.

It shows up far beyond this one chapter.

🌱 The first portion of a harvest

🙏 Given before anyone else touches the crop

🔁 A recurring biblical pattern, not unique here

📖 Publicly credits God as the source

## 🍇 Whatsoever Is First Ripe In The Land

This line extends the firstfruits idea one step further.

It covers whatever ripens earliest in the whole growing season.

That is the very first proof the season's crop is actually coming.

It comes before the main harvest arrives.

🍇 Covers the earliest ripening produce

📅 The first proof a harvest is coming

🌾 Comes ahead of the main harvest

📖 An early case of the firstfruits principle

## 🚫 Every Thing Devoted

Devoted translates a Hebrew word, herem.

It describes something permanently and completely set apart to God.

That is a far stronger word than an ordinary gift.

This same word carries serious weight later in the Bible.

It appears in the story of Achan's disobedience in Joshua seven.

🚫 A word far stronger than gift

🔒 Permanently and completely set apart

📖 The same word behind Achan's story

➡️ Previews a bigger story later in scripture

# Numbers 18:15-19
# 👶 Redeeming The Firstborn
---
## 🚼 Every Thing That Openeth The Matrix

Openeth the matrix is an old idiom.

It simply means whatever is born first, human or animal.

This same phrase was used when the law began, back in Exodus thirteen.

That connects this chapter directly back to the Exodus story.

🚼 An old idiom for firstborn

🐑 Applies to humans and animals alike

📖 The same phrase used back in Exodus

➡️ Ties this chapter to the Exodus story

## 💰 The Firstborn Of Man Shalt Thou Surely Redeem

Redeem here means paying a price to buy something back.

That something technically belonged to God.

Ever since the Passover, Israel's firstborn belonged to Him in a special way.

God had spared Israel's firstborn sons while striking Egypt's.

A human life is redeemed here with money, never with a sacrifice.

💰 Redeem means buying back what belongs to God

🐑 Traces back to the Passover in Egypt

🙅 Never a human sacrifice

📖 A life is redeemed with money

## 📅 Redeemed From A Month Old

Redemption happened once a baby reached one month old.

It did not happen immediately at birth.

This likely allowed time for the child to survive the riskiest early days.

Then the formal payment was made.

📅 Waited until one month old

👶 Not required immediately at birth

🕰️ Possibly allowed time past the riskiest days

📖 A practical detail behind a spiritual law

## 🪙 Five Shekels, After The Shekel Of The Sanctuary

A shekel was a unit of weight used as currency.

It was not a coin the way we picture one today.

The shekel of the sanctuary was a fixed, standardized weight.

It equaled twenty gerahs exactly.

That standard stopped anyone from underpaying with a lighter local shekel.

🪙 A shekel was a weight, not a coin

⚖️ The sanctuary shekel was a fixed standard

🔢 Equaled twenty gerahs exactly

📖 Stopped anyone from underpaying God

## 🐄 The Firstling Of A Cow, Or A Sheep, Or A Goat, Thou Shalt Not Redeem

Clean animals could not be bought back with money.

They had to actually be sacrificed instead.

These animals were already fit for the altar.

That is why no substitute payment was allowed for them.

This creates a clear contrast with the redemption rule just given for people.

🐄 Clean animal firstborns must be sacrificed

🚫 No money substitute allowed

🔥 Already fit for the altar

📖 Contrasts with the rule for redeeming people

## 🌸 A Sweet Savour Unto The LORD

Sweet savour is a common sacrificial idiom.

It describes God's pleasure with an offering.

It does not mean God has a sense of smell the way people do.

The phrase reassures Israel that the offering was accepted.

🌸 An idiom for God's pleasure

👃 Not a literal smell

✅ Used throughout Israel's sacrificial law

📖 Reassures Israel the offering was accepted

## 🍖 As The Wave Breast And The Right Shoulder

The meat from these sacrificed animals became priestly food.

It used the same specific cuts already assigned to priests in Leviticus seven.

This rule is being reapplied here, not invented fresh.

Numbers keeps building directly on top of laws already given in Leviticus.

🍖 Same cuts already assigned in Leviticus

🔁 A rule reapplied, not brand new

📚 Numbers builds directly on Leviticus

📖 A pattern that runs through both books

## 🧂 A Covenant Of Salt For Ever

Salt does not spoil or break down over time.

A covenant of salt is an idiom for something permanent.

It describes an agreement meant to never be undone.

The same phrase later describes God's covenant with David's family line.

That comparison appears in second Chronicles thirteen.

🧂 Salt symbolizes something unbreakable

♾️ An idiom for a permanent agreement

👑 Later describes God's covenant with David

📖 Framed with the weight of a royal promise

## 👨‍👩‍👧 To Thee, And To Thy Sons And Thy Daughters With Thee

The chapter repeats the household inclusion language here again.

This income supports Aaron's whole family.

It is not only for Aaron himself.

The repetition itself is a pattern this chapter keeps returning to.

👨‍👩‍👧 Repeats the whole household provision

🏠 Supports the family, not one man

🔁 A pattern this chapter keeps returning to

📖 Emphasis through deliberate repetition

# Numbers 18:20-24
# 🏞️ No Land, But The LORD Himself
---
## 🗺️ Thou Shalt Have No Inheritance In Their Land

Israel will eventually divide up the promised land tribe by tribe.

That story is told later, in the book of Joshua.

The priests will not receive a territory of their own.

This rule is announced here, well before that division actually happens.

It is a major, permanent exception built in ahead of time.

🗺️ Priests get no tribal territory

📖 Set long before Joshua's land division

⏳ A rule announced far in advance

➡️ A striking, permanent exception

## ✨ I Am Thy Part And Thine Inheritance

This is one of the most important lines in the whole chapter.

Instead of land, God says he himself is Aaron's inheritance.

Later biblical writers pick up this exact idea.

The Psalms use nearly identical language for anyone who treasures God above possessions.

That language appears in Psalm sixteen and Psalm seventy three.

✨ God himself replaces land as the inheritance

📖 The Psalms echo this same idea

🙏 About identity, not just income

➡️ A promise that outlasts any territory

## 🔟 All The Tenth In Israel For An Inheritance

The tenth means the tithe, ten percent of Israel's produce and livestock.

This verse explains why the tithe exists in the first place.

It is the Levites' substitute for the land inheritance every other tribe receives.

The tithe has a clear purpose here, not just an existence.

🔟 The tithe equals ten percent

🏞️ A substitute for tribal land

📊 Given specifically to the Levites

📖 Explains the tithe's real purpose

## 🚫 Neither Must The Children Of Israel Henceforth Come Nigh

The boundary keeping ordinary Israelites away from the tabernacle is restated here.

It ties directly back to the fear that closed chapter seventeen.

This whole chapter has been answering that fear, piece by piece.

The repetition itself works as reassurance.

🚫 Restates the boundary from chapter seventeen

🏗️ Shows this chapter answering that fear

🔁 Repetition used as reassurance

📖 Order continues to prevent tragedy

## ⚖️ The Levites Shall Bear Their Iniquity

Aaron's family bears responsibility for the sanctuary itself.

Now the Levites bear their own share of responsibility too.

It covers their assigned service specifically.

Every layer of this system carries its own real risk.

It is not only the priests at the top who answer for mistakes.

⚖️ Levites carry their own risk

🪜 Every layer of the system has stakes

🙅 Not only the priests at the top

📖 Responsibility scales with each role

## 📜 A Statute For Ever, They Have No Inheritance

The no land rule is confirmed here as permanent.

It applies to the whole tribe of Levi, not only Aaron's line.

That distinction is worth noticing.

Not all Levites are priests, even though all priests are Levites.

📜 Confirmed as permanent

🌳 Applies to the whole tribe of Levi

🔍 Levite and priest are not the same

📖 A distinction worth remembering

## 🔁 The Tithes I Have Given To The Levites To Inherit

The chapter closes this section by restating the whole exchange plainly.

Tithe replaces territory for the Levites.

Ancient legal texts often repeated key terms on purpose.

That repetition made an arrangement impossible to later dispute or forget.

🔁 Restates the tithe for land exchange

📜 Ancient texts often repeated key terms

🔒 Made hard to dispute later

📖 One final, plain confirmation

# Numbers 18:25-29
# 💰 A Tithe Of The Tithe
---
## 🗣️ The LORD Spake Unto Moses

This next law comes through Moses instead of directly to Aaron.

It is addressed to the Levites as a whole, not to the priesthood alone.

That is a small shift, but it signals a shift in audience.

The chapter has been careful about who each instruction is aimed at.

🗣️ Delivered through Moses this time

👥 Addressed to all the Levites

🔀 A shift that marks a new audience

📖 The chapter tracks its audience carefully

## 🔟 A Tenth Part Of The Tithe

Levites received a tithe from the rest of Israel.

Now they must give a tenth of what they received back up to the priests.

In practical terms, that works out to about one percent of Israel's produce.

Even the Levites' income carries its own layer of giving.

🔟 A tithe on what Levites received

🧮 About one percent of Israel's total produce

🔁 Even Levites give a portion onward

📖 No layer of the system keeps everything

## 📊 Reckoned Unto You, As Though It Were The Corn Of The Threshingfloor

Reckoned means counted or credited, treated as equal for legal purposes.

The Levites did not personally farm this grain.

Their offering is credited exactly as if they had grown it themselves.

This is a legal equivalence, not a literal description.

📊 Reckoned means credited or counted

🌾 Treated as if the Levites grew it

⚖️ A legal equivalence, not a literal claim

📖 Credit given regardless of the source

## 🌾 The Threshingfloor, And The Fulness Of The Winepress

A threshingfloor was a flat, hard surface.

Grain was separated there from its stalks and husks.

A winepress was a carved stone basin.

Grapes were crushed there to release their juice.

Both were the standard finishing points of Israel's two major harvests.

🌾 A threshingfloor separated grain from husks

🍇 A winepress crushed grapes for juice

🏺 The endpoints of Israel's two harvests

📖 Grain and grapes, side by side

## 🎯 Ye Shall Give Thereof The LORD's Heave Offering To Aaron The Priest

This completes a chain the chapter has been building the whole time.

Ordinary Israelites give to the Levites.

Levites in turn give a portion up to the priests.

Nobody at any level simply keeps everything they receive.

🎯 Completes a three part chain

🔄 Israelites, then Levites, then priests

🙅 Nobody keeps everything unshared

📖 One continuous, connected line of giving

## 🌟 Of All The Best Thereof, Even The Hallowed Part

Hallowed means set apart as holy.

Levites must give up their best portion here, not their leftovers.

That is the same standard seen through this entire chapter.

It runs from the firstfruits all the way to this final tithe.

🌟 Hallowed means set apart as holy

🥇 Requires the best, not leftovers

🔁 The same standard seen throughout the chapter

📖 Give God the first and finest

# Numbers 18:30-32
# ✅ Keeping The Rule, Free And Clear
---
## 🎁 Counted Unto The Levites As The Increase

Once Levites give up their required portion, the rest is fully theirs.

The text reassures them the remainder is not tainted.

Nothing left over is still owed to anyone else.

This closes out the chapter's whole financial system with reassurance.

🎁 What remains is fully theirs

✅ No lingering debt attached

🔓 Nothing left over is still owed

📖 A note of reassurance, not warning

## 🏘️ Ye Shall Eat It In Every Place, Ye And Your Households

Priests were restricted to eating the most holy food inside the sanctuary.

Levites can eat their own portion anywhere.

Their entire household may share in it too.

Their role carries a different level of holiness than the priests'.

That is why the rule around their food is more relaxed.

🏘️ Levites may eat their portion anywhere

👨‍👩‍👧‍👦 Includes the whole household

🔀 A different level of holiness than priests

📖 A rule that matches a different role

## 🏅 Your Reward For Your Service

Reward frames this income as earned payment, not a handout.

The Levites gave up owning land to take on tabernacle service.

This income is their fair trade for that choice.

It is compensation for a real, ongoing job.

🏅 Framed as earned pay, not charity

🔄 A trade for giving up land

💼 Compensation for real, ongoing work

📖 Payment that matches their sacrifice

## ✅ Ye Shall Bear No Sin By Reason Of It

Following this process correctly clears the Levites completely.

Giving the required best portion first is what matters.

The chapter states the positive outcome here, not only the warning.

The system rewards obedience, not only punishing failure.

✅ Doing it right clears the Levites

🥇 The best portion must go first

⚖️ Balances warning with a clear reward

📖 Obedience is rewarded, not just enforced

## ⚠️ Neither Shall Ye Pollute The Holy Things, Lest Ye Die

The chapter opened with Aaron bearing the sanctuary's risk.

It closes here with the very same warning, one more time.

Mishandling holy things still carries the ultimate consequence.

That is true even at the end of a chapter about careful order.

⚠️ The same stakes from the chapter's opening

🔁 A bookend that closes where it began

🔥 Mishandling still carries real consequence

📖 Order exists because the danger is real
`.trim();

export const NUMBERS_EIGHTEEN_PERSONAL_SECTIONS = parseNumbersEighteenRawNotes(NUMBERS_EIGHTEEN_RAW_NOTES);
