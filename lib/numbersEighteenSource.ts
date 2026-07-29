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
This time God speaks straight to Aaron, not through Moses. That's rare in Numbers - most instructions arrive by way of Moses first. It also answers the terrified question that closed chapter 17 almost immediately: "shall we be consumed with dying?"
This chapter is God's direct, structured answer to that fear. Instead of leaving Israel guessing about how to safely approach His presence, He lays out exactly who is responsible for what.
🗣️ One of the rare times God speaks directly to Aaron, not through Moses
❓ A direct answer to the fear that ended chapter 17
🔑 Structure, not more punishment, is God's response to Israel's panic
---
## ⚖️ Thou...Shalt Bear The Iniquity Of The Sanctuary
"Bear the iniquity" means to carry the legal responsibility and consequences if something goes wrong in worship - not that Aaron is guilty of a sin himself, but that he answers for the sanctuary's purity on Israel's behalf.
This is a major shift of risk. Instead of any Israelite who makes a mistake near the tabernacle facing death, Aaron and his priestly family absorb that risk first, as a protective buffer between the people and God's holiness.
⚖️ "Bear iniquity" means carrying responsibility, not being personally guilty
🛡️ Aaron's family becomes a protective buffer for the whole nation
🔑 Explains why the priesthood is dangerous, not just honorable
---
## 🏠 Thy Sons And Thy Father's House With Thee
"Thy father's house" means Aaron's own family line within the tribe of Levi - specifically the descendants of his father Amram, already singled out back in Numbers 3:27-28. This is narrower than "all Levites."
🏠 "Father's house" means Aaron's specific family line, not all of Levi
📖 The same family group already marked out in Numbers 3
🔑 Distinguishes priests (Aaron's line) from Levites (the wider tribe)
---
## 🤝 Thy Brethren...Of The Tribe Of Levi...Joined Unto Thee
The wider tribe of Levi is brought in as helpers, assisting the priests but not replacing them. This creates two ranks of service: priests who handle the holiest tasks, and Levites who support them.
🤝 Levites assist; priests alone perform the holiest tasks
🪜 Two ranks of service, not one flat role
🔑 Sets up the whole chapter's income-sharing system later on
---
## 🕍 Thou And Thy Sons...Shall Minister Before The Tabernacle Of Witness
Only Aaron's direct priestly line may serve at the tabernacle itself - the actual altar and holy furniture. Everyone else in Levi supports from a step back.
🕍 Only priests serve directly at the tabernacle's altar and furniture
🚶 Levites work in support roles, one step removed
🔑 Reinforces the two-tier structure from the verse before
---
## 📋 They Shall Keep Thy Charge
"Charge" here means an assigned duty or watch, like a guard keeping watch over a post. It's one of the most repeated words in this chapter, showing up again and again for different groups' specific jobs.
📋 "Charge" means an assigned duty, like a guard's watch
🔁 One of the most repeated words in this whole chapter
🔑 Everyone in the system has a named, specific job - nothing vague
---
## 🚫 They Shall Not Come Nigh The Vessels Of The Sanctuary...That Neither They, Nor Ye Also, Die
Levites are barred from touching the holy vessels and altar directly, and the text is clear this protects both sides. If a Levite oversteps, it isn't just the Levite at risk - Aaron's own family shares responsibility for keeping the boundary clear.
🚫 Levites may not touch the holy vessels or altar directly
🤝 The warning protects both Levites and priests together
🔑 Everyone has a stake in everyone else staying within their role
---
## 🚷 A Stranger Shall Not Come Nigh Unto You
"Stranger" in this law doesn't mean a foreigner - it means any Israelite who isn't part of the priestly or Levite system God just described. The word marks "unauthorized," not "outsider to the nation."
🚷 "Stranger" here means any unauthorized Israelite, not a foreigner
📖 A common Old Testament use of the word worth remembering
🔑 The boundary is about role, not nationality
---
## 🩹 That There Be No Wrath Any More Upon The Children Of Israel
This line ties the whole system directly back to chapter 16's plague, when 14,700 people died after Korah's rebellion. God is building a permanent structure specifically so that disaster never has to repeat.
🩹 Directly answers the plague that killed 14,700 in chapter 16
🏗️ A permanent system, not a one-time fix
🔑 Order here exists to prevent tragedy, not just to organize
---
## 🎁 I Have Taken Your Brethren The Levites...Given As A Gift
Numbers already called the Levites a "gift" back in chapters 3 and 8, set apart to serve instead of Israel's firstborn sons. Here God repeats that language to remind Aaron the Levites' help isn't something Aaron earned or arranged himself - it's a gift from God.
🎁 The same "gift" language already used in Numbers 3 and 8
👶 The Levites originally stood in for Israel's firstborn sons
🔑 Aaron's helpers are God's provision, not his own doing
---
## 🚪 Within The Vail
"The vail" is the curtain separating the Most Holy Place, where the ark sat, from the rest of the tabernacle. "Within the vail" means the innermost, most restricted space in the whole camp.
🚪 The vail is the curtain guarding the Most Holy Place
📦 The space where the ark of the covenant sat
🔑 Marks the single most restricted location in all of Israel
---
## 🎀 A Service Of Gift
God repeats the word "gift" for the priesthood itself, not just for the Levites. Aaron didn't qualify for this role by being better than his brothers - it was given, the same way the Levites were given to him.
🎀 The priesthood itself is called a gift, just like the Levites
🚫 Not earned by merit - given by God's choice
🔑 Undercuts any idea that Aaron's family deserved this by being special
---
## ☠️ The Stranger That Cometh Nigh Shall Be Put To Death
The chapter opens its very first law with a repeated death warning, the same warning that just triggered Israel's terror in chapter 17. It isn't new information, but stating it here, inside a chapter about order, reframes it: the danger isn't random, it's exactly why this whole structure exists.
☠️ The same warning that triggered chapter 17's terror, repeated here
🏗️ Framed now as the reason for structure, not just a threat
🔑 Order removes the danger; ignoring the order restores it

# Numbers 18:8-14
# 🎁 The Priests' Portion
---
## 📤 The Charge Of Mine Heave Offerings
A "heave offering" is a portion of a sacrifice physically lifted up and presented to God before being given to the priest to eat - the lifting motion itself is what "heave" refers to, not weight or effort.
📤 "Heave" refers to the lifting motion in the ritual, not physical effort
🔄 First presented up to God, then given down to the priest
🔑 A physical action that shows the gift passing through God first
---
## 🕯️ By Reason Of The Anointing
Aaron's right to this income traces back to a specific event: his anointing with oil as high priest, described back in Exodus 29 and Leviticus 8. The income isn't random generosity - it's tied to an office Aaron was formally installed into.
🕯️ Points back to Aaron's formal anointing in Exodus 29 and Leviticus 8
📜 Ties this income to an actual office, not just goodwill
🔑 The provision follows the position, permanently
---
## ♾️ By An Ordinance For Ever
"For ever" here means this law doesn't expire or get renegotiated - it's meant to apply to every generation of priests who come after Aaron, not just to Aaron personally.
♾️ Applies to every future generation of priests, not just Aaron
📅 A permanent statute, not a temporary arrangement
🔑 Sets up why priests still had this same right centuries later
---
## 🌾 Every Meat Offering Of Theirs
"Meat offering" is an old English term that means a grain offering - flour, oil, and sometimes frankincense, with no meat involved at all. Modern readers often misread this as an offering of animal flesh.
🌾 "Meat offering" is old English for a grain offering, not animal flesh
🌾 Made of flour, oil, and often frankincense
🔑 A common misreading this chapter is worth catching early
---
## 🔥 Most Holy...Reserved From The Fire
Israelite offerings had two tiers of holiness: "holy" and "most holy." Most holy portions couldn't be burned up entirely on the altar the way some sacrifices were - a set-aside share was reserved specifically for the priests to eat.
🔥 Israel's offerings had two tiers: holy, and most holy
🍽️ Most holy portions were reserved as food for priests, not burned
🔑 Explains why the priests' income was food, not money
---
## 👨 Every Male Shall Eat It...In The Most Holy Place
The most holy food could only be eaten by priestly men, and only inside the sanctuary itself - unlike other priestly income, described a few verses later, which the whole priestly household could eat anywhere.
👨 Most holy food: priestly men only, eaten inside the sanctuary
🏠 A stricter rule than the household provisions coming later
🔑 The strictness of a rule tracks the level of holiness involved
---
## 🌊 The Wave Offerings
A "wave offering" got its name from a different ritual motion than the heave offering - it was waved horizontally toward the altar and back, rather than lifted up and down. Both were ways of formally presenting a gift to God before it became food.
🌊 Named for a side-to-side waving motion, not a lifting one
📖 A different ritual gesture than the heave offering
🔑 Two distinct motions, same basic purpose: presenting the gift to God
---
## 👨‍👩‍👧 To Thy Sons And To Thy Daughters...Every One That Is Clean In Thy House
Unlike the most holy food restricted to priestly men in the sanctuary, this portion could be eaten by the whole priestly household - sons, daughters, anyone ritually clean - and anywhere, not just inside the tabernacle.
👨‍👩‍👧 Open to the whole priestly household, daughters included
🧼 Requires ritual cleanness, not gender or office
🔑 A noticeably wider, gentler rule than the most holy food
---
## 🌱 The Firstfruits
"Firstfruits" means the very first portion of a harvest, given to God before anyone else touches the rest of the crop - a way of publicly acknowledging that the whole harvest ultimately came from Him, not just human effort.
🌱 The first, best portion of a harvest, given before anything else
🙏 A public acknowledgment that God is the source of the harvest
🔑 Giving God the "first" is a recurring biblical principle, not unique to here
---
## 🍇 Whatsoever Is First Ripe In The Land
This restates and extends the firstfruits idea to whatever ripens earliest in the growing season, before the main harvest comes in - the very first evidence that the crop is coming at all.
🍇 Covers the earliest ripening produce, ahead of the main harvest
📅 The very first proof the season's crop is coming in
🔑 An early, specific case of the broader firstfruits principle
---
## 🚫 Every Thing Devoted
"Devoted" translates a Hebrew word (herem) for something permanently and irreversibly dedicated to God, far stronger than an ordinary gift. Later in the Bible, "devoted things" carry serious weight, including the story of Achan's disobedience in Joshua 7.
🚫 A stronger word than "gift" - permanently, irreversibly set apart
📖 The same word behind Achan's story in Joshua 7
🔑 A small phrase here previews a much bigger story later in Scripture

# Numbers 18:15-19
# 👶 Redeeming The Firstborn
---
## 🚼 Every Thing That Openeth The Matrix
"Openeth the matrix" is an old idiom simply meaning "is born first" - the firstborn of any womb, human or animal. It's the same phrase used back when this law was first introduced after the Exodus (Exodus 13:2).
🚼 An old idiom for "firstborn," human or animal
📖 The same phrase used when this law began in Exodus 13
🔑 Ties this chapter directly back to the Exodus story
---
## 💰 The Firstborn Of Man Shalt Thou Surely Redeem
"Redeem" here means paying a price to buy back something that technically belongs to God. Ever since the Passover, when God spared Israel's firstborn sons while striking Egypt's, Israel's firstborn belonged to Him in a special way - and had to be bought back rather than kept outright.
💰 "Redeem" means paying a price to buy back what belongs to God
🐑 Traces back to the Passover, when God spared Israel's firstborn
🔑 A human life is redeemed with money, never sacrificed
---
## 📅 Redeemed From A Month Old
Redemption happened once a baby reached one month old, not immediately at birth - likely allowing time to see the child survive the highest-risk early period before the formal payment was made.
📅 Waited until one month old, not immediate at birth
👶 Possibly allowed time past the highest-risk early days
🔑 A practical detail behind a spiritual law
---
## 🪙 Five Shekels, After The Shekel Of The Sanctuary
A shekel was a unit of weight used as currency, not a coin as we'd picture one. "The shekel of the sanctuary" specifies a standardized, more precise weight, twenty gerahs, kept at the tabernacle, preventing anyone from using a lighter, cheaper shekel to shortchange God.
🪙 A shekel was a weight of silver, not a minted coin
⚖️ "Sanctuary shekel" was a fixed, standardized weight - twenty gerahs
🔑 Stops anyone from underpaying with a lighter local shekel
---
## 🐄 The Firstling Of A Cow, Sheep, Or Goat...Not Redeem
Unlike humans and unclean animals, the firstborn of clean animals couldn't be bought back with money - they had to actually be sacrificed. These animals were already fit for the altar, so no substitute payment was allowed.
🐄 Clean-animal firstborns must be sacrificed, not bought back
🚫 No money substitute allowed for animals fit for the altar
🔑 A clear contrast with the redemption rule just given for people
---
## 🌸 A Sweet Savour Unto The LORD
"Sweet savour" is a common sacrificial idiom describing God's pleasure with an offering - it doesn't mean God has a nose the way people do, but expresses that the offering is accepted and welcomed.
🌸 An idiom for God's acceptance, not a literal smell
📖 Used throughout Israel's sacrificial law
🔑 Reassures Israel the sacrifice was received well, not just performed
---
## 🍖 The Flesh...As The Wave Breast And The Right Shoulder
The meat from these sacrificed firstborn animals became priestly food, the same specific cuts (breast and right shoulder) already assigned to priests back in Leviticus 7. The rule is being reapplied, not invented fresh here.
🍖 Same specific cuts already assigned to priests in Leviticus 7
🔁 A rule reapplied, not a brand-new one
🔑 Numbers keeps building directly on top of Leviticus's law
---
## 🧂 A Covenant Of Salt
Salt doesn't spoil or break down, so "a covenant of salt" is an idiom for an agreement meant to last permanently and never be undone. The same phrase shows up again later in 2 Chronicles 13:5, describing God's promise to David's family line.
🧂 Salt as a symbol of something permanent and unbreakable
👑 The same phrase later describes God's covenant with David's line
🔑 The priesthood's income is framed with the same permanence as a royal promise
---
## 👨‍👩‍👧 To Thee, And To Thy Sons And Thy Daughters With Thee
The chapter repeats the household-inclusion language one more time here, reinforcing that this income supports Aaron's whole family, not Aaron individually.
👨‍👩‍👧 Repeats the "whole household" provision one more time
🏠 Supports Aaron's family, not just Aaron
🔑 A pattern the chapter keeps returning to for emphasis

# Numbers 18:20-24
# 🏞️ No Land, But The LORD Himself
---
## 🗺️ Thou Shalt Have No Inheritance In Their Land
When Israel eventually divides up the promised land tribe by tribe, a story told later in Joshua, the priests won't receive a territory of their own. This is a major, permanent exception built in ahead of time.
🗺️ Priests get no tribal territory when the land is later divided
📖 A rule set in place well before Joshua's land division actually happens
🔑 A striking exception announced far in advance
---
## ✨ I Am Thy Part And Thine Inheritance
This is one of the most important lines in the chapter: instead of land, God says He himself is Aaron's inheritance. Later biblical writers pick up this exact idea - the Psalms use nearly identical language for anyone who treasures God above possessions (Psalm 16:5, Psalm 73:26).
✨ God himself replaces land as Aaron's inheritance
📖 The Psalms later echo this same idea word for word
🔑 A statement about identity, not just income
---
## 🔟 All The Tenth In Israel For An Inheritance
"The tenth" is the tithe, ten percent of Israel's produce and livestock. This verse explains why the tithe exists in the first place: it's the Levites' substitute for the land inheritance every other tribe receives.
🔟 The tithe is ten percent of Israel's produce
🏞️ Functions as the Levites' substitute for tribal land
🔑 Explains the tithe's purpose, not just its existence
---
## 🚫 Neither Must The Children Of Israel...Come Nigh
The boundary keeping ordinary Israelites away from the tabernacle is restated once more here, tying directly back to the fear that closed chapter 17 - this whole chapter has been building toward reassuring Israel that the danger is now managed.
🚫 Restates the boundary that caused chapter 17's fear
🏗️ Shows how this whole chapter answers that fear, piece by piece
🔑 The repetition itself is reassurance, not redundancy
---
## ⚖️ The Levites...Shall Bear Their Iniquity
Just like Aaron's family bears responsibility for the sanctuary, Levites now bear their own share of responsibility for their assigned service. Every layer of this system carries its own real risk, not just the priests at the top.
⚖️ Levites carry their own share of risk and responsibility
🪜 Risk exists at every layer of the system, not just for priests
🔑 Responsibility scales with role, at every level
---
## 📜 A Statute For Ever...They Have No Inheritance
The no-land rule is confirmed as permanent and applies to the whole tribe of Levi, not just Aaron's priestly branch - a distinction worth noticing, since not all Levites are priests.
📜 Confirmed as permanent for the whole tribe of Levi
🔍 Applies more broadly than just Aaron's specific priestly line
🔑 A reminder that "Levite" and "priest" aren't the same thing
---
## 🔁 The Tithes...I Have Given To The Levites To Inherit
The chapter closes this section by repeating the whole exchange one more time in plain terms: tithe instead of territory. Repetition here isn't filler - ancient legal and covenant texts often restated key terms deliberately, so they couldn't be misunderstood or disputed later.
🔁 Restates the tithe-for-land exchange one final time
📜 Ancient legal texts often repeated key terms on purpose
🔑 Makes the arrangement impossible to later dispute or "forget"

# Numbers 18:25-29
# 💰 A Tithe Of The Tithe
---
## 🗣️ The LORD Spake Unto Moses
This next law is delivered through Moses instead of directly to Aaron, because it's addressed to the Levites as a whole, not to the priesthood specifically - a small detail that signals a shift in who's being spoken to.
🗣️ Delivered through Moses this time, not directly to Aaron
👥 Because it's addressed to all Levites, not just priests
🔑 A small shift in speaker that marks a shift in audience
---
## 🔟 A Tenth Part Of The Tithe
Levites received a tithe from the rest of Israel, but now they must give a tenth of what they received back up to the priests. In practical terms, this "tithe of the tithe" comes out to about one percent of Israel's total produce.
🔟 Levites must tithe what they themselves received
🧮 Works out to roughly one percent of Israel's total produce
🔑 Even the Levites' income has its own layer of giving
---
## 📊 Reckoned Unto You, As Though It Were The Corn Of The Threshingfloor
"Reckoned" means counted or credited, treated as equivalent for legal purposes even though it isn't literally true. The Levites didn't personally farm this grain, but their offering is credited exactly as if they had grown it themselves.
📊 "Reckoned" means credited or counted as equivalent
🌾 Treated as if the Levites grew it themselves, though they didn't
🔑 A legal equivalence, not a literal description
---
## 🌾 The Threshingfloor...The Winepress
A threshingfloor was a flat, hard surface where grain was separated from its stalks and husks; a winepress was a carved stone basin where grapes were stomped to release their juice. Both were the standard finishing points of Israel's two major harvests - grain and grapes.
🌾 A threshingfloor separated grain from its husks
🍇 A winepress crushed grapes to release their juice
🔑 The two standard endpoints of Israel's main harvests
---
## 🎯 Ye Shall Give Thereof The LORD's Heave Offering To Aaron The Priest
This completes a three-step chain the chapter has been building the whole time: ordinary Israelites give to the Levites, and Levites in turn give a portion up to the priests. Nobody at any level simply keeps everything they receive.
🎯 Completes the chain: Israelites, then Levites, then priests
🔄 Nobody in the system keeps their full income unshared
🔑 The whole tithe system flows in one continuous, connected line
---
## 🌟 Of All The Best Thereof, Even The Hallowed Part
"Hallowed" means set apart as holy. Levites are required to give up their best portion, not their leftovers - the same standard of giving God the first and finest that runs throughout this whole chapter, from firstfruits to this final tithe.
🌟 "Hallowed" means set apart as holy, not ordinary
🥇 Requires the best portion, not leftovers
🔑 The same "give the best first" standard seen throughout the chapter

# Numbers 18:30-32
# ✅ Keeping The Rule, Free And Clear
---
## 🎁 Counted Unto The Levites As The Increase
Once Levites give up their required portion, everything left over is fully and legitimately theirs - the text reassures them the remainder isn't tainted or still owed to anyone else.
🎁 What's left over after giving is completely, legitimately theirs
✅ No lingering debt or guilt attached to the remainder
🔑 A reassurance, closing out the chapter's whole financial system
---
## 🏘️ Ye Shall Eat It In Every Place, Ye And Your Households
Unlike the priests' most holy food, restricted to the sanctuary itself, Levites can eat their portion anywhere, with their entire household. Their role carries a different, less concentrated level of holiness, so the rule around their food is more relaxed.
🏘️ Levites may eat their portion anywhere, unlike priests
👨‍👩‍👧‍👦 Includes their whole household, not just themselves
🔑 A rule that matches their role's different level of holiness
---
## 🏅 Your Reward For Your Service
"Reward" frames this income as earned payment for real work, not a handout. The Levites gave up owning land specifically to take on full-time service at the tabernacle - this is their fair compensation for that trade.
🏅 Framed as earned pay, not charity
🔄 Compensation for trading land ownership for tabernacle service
🔑 Fair payment for a real, ongoing job
---
## ✅ Ye Shall Bear No Sin By Reason Of It
Following the process correctly, giving the required best portion first, clears the Levites completely. The chapter is careful to state the positive outcome, not just the warning, for anyone who does this right.
✅ Doing it correctly clears the Levites completely
⚖️ Balances the warning with a clear, positive outcome
🔑 The system rewards obedience, not just punishes failure
---
## ⚠️ Neither Shall Ye Pollute The Holy Things...Lest Ye Die
The chapter that opened with Aaron bearing the sanctuary's risk closes with one final warning about the very same danger - mishandling holy things still carries the ultimate consequence, even at the very end of a chapter about careful order.
⚠️ The same life-and-death stakes from the chapter's opening
🔁 A bookend that closes the chapter exactly where it began
🔑 Order and structure exist because the danger was always real
`;

export const NUMBERS_EIGHTEEN_PERSONAL_SECTIONS = parseNumbersEighteenRawNotes(NUMBERS_EIGHTEEN_RAW_NOTES);
