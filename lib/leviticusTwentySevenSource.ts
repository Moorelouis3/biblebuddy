export type LeviticusTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentySevenRawNotes(rawText: string): LeviticusTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 27:${startVerse}` : `Leviticus 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 15) {
    throw new Error("Expected 15 Leviticus 27 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_SEVEN_RAW_NOTES = `# Leviticus 27:1-2
# 🗣️ A Vow Beyond The Ordinary
---
## 💬 When A Man Shall Make A Singular Vow
A "vow" is a promise made freely to God - nobody is forced to make one, but once made, it has to be kept. "Singular" here means unusual or especially weighty, not just any promise. This chapter deals with one specific, hard kind of vow: dedicating a person's very self to the LORD.
Vows show up all through the Old Testament as a way of committing something valuable to God out of gratitude or in a moment of need. This chapter exists because that kind of vow, once spoken out loud, needed a clear and fair system for actually being carried out.
💬 A "vow" is a voluntary promise, not a command
🎯 "Singular" marks this as one specific, weighty kind of vow
👤 The vow covered in this chapter dedicates a person, not a thing
---
## 🙏 The Persons Shall Be For The LORD
This does not mean handing a person over to literally live and work at the tabernacle - that job already belonged only to the Levites. Instead, someone could vow that a person, often themselves or a family member, belonged to God in a special way, similar in spirit to how Hannah later dedicates her son Samuel.
🙏 The person is set apart to God, not literally handed over to serve
📖 Similar in spirit to Hannah's vow dedicating Samuel
⚖️ This chapter explains how a vow like that actually gets carried out
---
## 💰 By Thy Estimation
"Estimation" is the key word for this whole chapter - a set price, fixed by the priest, that let a person fulfill this kind of vow with silver instead of literally staying at the tabernacle forever. The rest of the chapter is essentially one long price table built around that word.
💰 "Estimation" means a fixed price set by the priest
📊 The rest of the chapter is basically one long price table
🎯 Silver payment stood in for the person actually being given

# Leviticus 27:3-4
# 💰 The Value Of A Grown Man Or Woman
---
## 💪 Thy Estimation Shall Be Of The Male From Twenty Years Old Even Unto Sixty Years Old, Even Thy Estimation Shall Be Fifty Shekels Of Silver
Twenty to sixty was considered a person's prime working years in ancient Israel - old enough to be fully capable, not yet weakened by age. Fifty shekels was a serious sum for an ordinary family, roughly the value of years of a hired hand's labor.
💪 Twenty to sixty was considered a person's prime working years
💰 Fifty shekels was a serious sum for an average family
🎯 The highest number in the whole table, tied to labor capacity
---
## ⚖️ And If It Be A Female, Then Thy Estimation Shall Be Thirty Shekels
The lower number is not God rating a woman's worth as a human being below a man's - Genesis 1:27 already states both sexes are equally made in God's image. This value is tied strictly to ancient physical-labor economics, in a world where a man's average manual output was priced higher than a woman's.
⚖️ Both sexes are equally made in God's image (Genesis 1:27)
💪 The gap reflects ancient labor-market economics, not human worth
📊 Every number in this table is a labor-value estimate, not a moral rating
---
## ⚖️ After The Shekel Of The Sanctuary
A "shekel" was a unit of weight for silver, not a coin like modern money - it was literally weighed out on a scale. "The shekel of the sanctuary" points to one official, standardized weight kept by the priests, so nobody could cheat the system with a lighter or heavier weight.
⚖️ A shekel was a weight of silver, not a stamped coin
⛺ "Of the sanctuary" means the one official standard, kept by the priests
🎯 Guards against anyone using a rigged, unequal weight

# Leviticus 27:5-7
# 👶 Younger, Older, And In Between
---
## 👦 If It Be From Five Years Old Even Unto Twenty Years Old, Then Thy Estimation Shall Be Of The Male Twenty Shekels
Children and teenagers were valued lower than adults, since their labor capacity was still developing rather than fully grown. Twenty shekels sits less than halfway to the full adult male value of fifty.
👦 Five to twenty covers childhood through the teen years
📉 Lower than the adult bracket, since labor capacity is still developing
🔢 Twenty shekels, less than half the adult male value
---
## 👧 And For The Female Ten Shekels
The same male-higher, female-lower gap from the adult bracket continues here too, at exactly the same one-third ratio as verses 3-4 (ten is one-third of thirty, just as thirty was three-fifths of fifty). The table is applying one consistent formula, not making it up bracket by bracket.
👧 The same male-female gap continues at this age
🔢 Ten shekels keeps a similar ratio to the adult female value
🎯 One consistent formula, not a random number each time
---
## 👶 If It Be From A Month Old Even Unto Five Years Old, Then Thy Estimation Shall Be Of The Male Five Shekels Of Silver
This is the lowest bracket for boys in the whole table. "A month old" matters - a baby wasn't counted in this system before one month, matching the same one-month mark used elsewhere in the law for redeeming a firstborn son.
👶 One of the lowest brackets in the entire table
📅 "A month old" matches the age used for firstborn redemption elsewhere
💰 Even this low value could still strain a poor family's finances
---
## 👶 And For The Female Thy Estimation Shall Be Three Shekels Of Silver
The lowest number anywhere in the chapter. Even at this age, before a child could do any real labor at all, the same male-higher pattern still holds - the whole system is built around projected future labor capacity, not present ability, since neither a one-month-old boy nor girl could work yet.
👶 The single lowest value in the entire price table
🔮 Based on projected future labor capacity, not present ability
⚖️ Neither a one-month-old boy nor girl could actually work yet
---
## 📉 If It Be From Sixty Years Old And Above; If It Be A Male, Then Thy Estimation Shall Be Fifteen Shekels, And For The Female Ten Shekels
Value drops again past sixty, as physical labor capacity naturally declines with age. Notice the female number barely moves from the adult bracket (thirty down to ten), a steeper percentage drop than the male number (fifty down to fifteen) - the table isn't a flat percentage, it's a rough real-world guess at how much heavy labor each group could still do.
📉 Values drop again past sixty as labor capacity declines
🔢 The female value drops by a steeper percentage than the male value
🎯 Shows the table was a rough labor estimate, not a fixed formula
---
## 📊 Reading The Whole Age Table Together
Laid out from youngest to oldest, this price table has one shape: value rises through the growing years, peaks in the ages of full strength between twenty and sixty, then falls again in old age. It is best read the same way you'd read a labor-value chart, not as God ranking human worth.
📈 Values rise, peak in adulthood, then fall again with old age
🎯 The shape tracks physical strength across a lifetime
💡 Not a ranking of a person's worth as a human being

# Leviticus 27:8
# 🙏 If He Be Poorer Than Thy Estimation
---
## 🙏 But If He Be Poorer Than Thy Estimation, Then He Shall Present Himself Before The Priest
This verse exists so the price table never became an obstacle to keeping a sincere vow. If someone genuinely couldn't afford the standard price, he didn't just default on the promise - he went in person to the priest to work out a fair number instead.
🙏 Poverty was never treated as an excuse to break the vow
👤 The solution was a face-to-face meeting with the priest
⚖️ Built-in fairness, not a rigid one-size-fits-all rule
---
## 💰 According To His Ability That Vowed Shall The Priest Value Him
"Ability" means what the person could actually, realistically afford - the priest adjusted the price downward to match real financial circumstances, rather than forcing an impossible payment or letting the person off the hook entirely.
💰 "Ability" means realistic means, not the standard table price
👤 The priest personally judged each individual hardship case
🎯 Neither impossible debt nor an empty, meaningless vow

# Leviticus 27:9-10
# 🐐 Vowing An Animal Fit For Sacrifice
---
## 🐐 And If It Be A Beast, Whereof Men Bring An Offering Unto The LORD, All That Any Man Giveth Of Such Unto The LORD Shall Be Holy
This shifts from vowing a person to vowing an animal already fit for sacrifice - one of the "clean" animals already approved for offerings back in Leviticus 1-7. The moment it was given, it became "holy," meaning set apart only for God's use, and could never go back to ordinary use again.
🐐 Covers clean animals already usable for sacrifice
✨ "Holy" means set apart only for God, permanently
🚫 Once given, it could never return to ordinary use
---
## 🔄 He Shall Not Alter It, Nor Change It, A Good For A Bad, Or A Bad For A Good
This blocks an obvious loophole - swapping out a promised healthy animal for a weaker, cheaper one at the last minute, or trying to trade up a poor one for a better one just to look more generous. Once named, the specific animal was locked in.
🔄 Blocks swapping a good animal for a worse one
🎭 Also blocks swapping a poor one for a better one, just to look good
🔒 The specific animal named in the vow was locked in
---
## ⚠️ If He Shall At All Change Beast For Beast, Then It And The Exchange Thereof Shall Be Holy
If someone tried to swap anyway, the law didn't just cancel the swap - it made both animals holy, the original and the replacement together. Breaking the rule cost double instead of nothing.
⚠️ Attempting the swap didn't erase the vow, it doubled it
🐐 Both the original animal and the replacement became holy
🎯 A built-in penalty that made cheating pointless

# Leviticus 27:11-13
# 🐫 An Unclean Beast, Valued And Redeemed
---
## 🐫 And If It Be Any Unclean Beast, Of Which They Do Not Offer A Sacrifice Unto The LORD, Then He Shall Present The Beast Before The Priest
"Unclean" animals, like donkeys or camels, defined back in Leviticus 11, could never be sacrificed on the altar, but a person could still vow to give one to God's service. Since it couldn't be offered directly, the priest stepped in to set its value instead.
🐫 "Unclean" animals were barred from the altar (Leviticus 11)
🙏 They could still be given to God, just not sacrificed
👤 The priest personally set the value instead
---
## 👀 And The Priest Shall Value It, Whether It Be Good Or Bad: As Thou Valuest It, Who Art The Priest, So Shall It Be
Unlike the fixed-price human table above, there was no set number for animals - the priest personally inspected the specific animal and judged its actual condition and worth, case by case.
👀 No fixed price table here, unlike the human valuations
🔍 The priest personally inspected the animal's real condition
⚖️ A judgment call, made case by case
---
## ➕ But If He Will At All Redeem It, Then He Shall Add A Fifth Part Thereof Unto Thy Estimation
"Redeem" means buying something back after it had already been dedicated to God. This introduces a pattern that repeats through the rest of the chapter: redeeming something back always cost the original value plus an extra twenty percent on top - a real disincentive against dedicating something on impulse and taking it back later.
💰 "Redeem" means buying something back after dedicating it
➕ Adds a fifth, twenty percent, on top of the base value
🔁 The same "value plus a fifth" formula repeats through this whole chapter
---
## 🔁 Why The Extra Fifth
Adding a flat twenty percent penalty every time someone changed their mind made dedicating something to God a decision worth taking seriously the first time. It didn't ban regret, but it made sure regret had a real, honest cost attached to it.
🔁 The penalty appears every time someone redeems a dedicated item
💡 Made a vow something worth thinking through before speaking it
⚖️ Regret wasn't banned, just given a real, honest cost

# Leviticus 27:14-15
# 🏠 Sanctifying A House
---
## 🏠 And When A Man Shall Sanctify His House To Be Holy Unto The LORD, Then The Priest Shall Estimate It, Whether It Be Good Or Bad
"Sanctify" means to formally dedicate something to God, setting it apart from ordinary use. A homeowner could do this with an actual house, and just like the unclean animal, the priest personally inspected it and set a fair value rather than using a fixed table.
🏠 "Sanctify" means formally setting something apart for God
👤 The priest personally inspected the house's real condition
📊 No fixed price table, just like the unclean-animal valuation
---
## 🔒 As The Priest Shall Estimate It, So Shall It Stand
This is a simple but important legal detail - once the priest declared a value, that number was final and binding. There was no appeal process or second opinion; the priest's word closed the matter.
⚖️ The priest's valuation was final, not open to appeal
🔒 "So shall it stand" is legal language for a closed decision
🎯 Prevented endless arguing over the house's true worth
---
## ➕ And If He That Sanctified It Will Redeem His House, Then He Shall Add The Fifth Part Of The Money Of Thy Estimation Unto It, And It Shall Be His
The same twenty-percent redemption penalty from the animal law applies here too - and once that extra payment was made, the house legally, fully belonged to the original owner again, no longer under any special holy status.
➕ The same one-fifth redemption penalty applies again
🏠 Paying it in full returned the house to normal, ordinary ownership
🔁 A pattern the reader keeps seeing repeat through the chapter

# Leviticus 27:16-19
# 🌾 Sanctifying A Field, Valued By Seed
---
## 🌾 And If A Man Shall Sanctify Unto The LORD Some Part Of A Field Of His Possession, Then Thy Estimation Shall Be According To The Seed Thereof
"A field of his possession" means land that belonged to his family by inheritance, part of the original tribal land grant. Unlike a house, a field's value here wasn't judged by the priest's eye - it was calculated by how much seed it took to plant it, a practical stand-in for the field's actual size.
🌾 "Possession" means inherited family land, not just any land
📏 Valued by how much seed it took to plant, not by direct inspection
🎯 Seed amount was a practical stand-in for size and productivity
---
## 📦 An Homer Of Barley Seed Shall Be Valued At Fifty Shekels Of Silver
A "homer" was a large dry-measure unit, roughly the amount one donkey could carry. This sets a fixed conversion rate - however much barley seed it took to plant the whole field, that amount multiplied out at fifty shekels per homer gave the base price.
📦 A "homer" was a large unit of dry measure, about a donkey-load
🌾 Barley was a common, everyday crop, easy to use as a standard
💰 Fifty shekels per homer set the base conversion rate
---
## 📅 If He Sanctify His Field From The Year Of Jubile, According To Thy Estimation It Shall Stand
The Jubile was the every-fiftieth-year reset commanded back in Leviticus 25, when land returned to its original family for free. Dedicating a field right at the start of that fifty-year cycle meant the full value applied, since a whole fifty years of use was still ahead.
📅 The Jubile is the fifty-year land-reset law from Leviticus 25
⏳ Dedicating right after Jubile means a full fifty years of value remain
💰 So the full, undiscounted price applied
---
## 📉 But If He Sanctify His Field After The Jubile, Then The Priest Shall Reckon Unto Him The Money According To The Years That Remain, Even Unto The Year Of The Jubile, And It Shall Be Abated From Thy Estimation
If someone dedicated the field partway through the fifty-year cycle instead, the price dropped to match however many years were actually left before the next Jubile reset it anyway. Fewer years of use left meant a lower price - a genuinely fair, math-based system rather than a flat fee.
📉 Price shrinks based on years actually remaining until Jubile
🧮 "Abated" means reduced, calculated fairly year by year
⚖️ A field's value was tied directly to how much use was actually left

# Leviticus 27:20-21
# 🎺 The Field That Is Never Redeemed
---
## 🚫 And If He Will Not Redeem The Field, Or If He Have Sold The Field To Another Man, It Shall Not Be Redeemed Any More
This closes off a loophole - if the original owner let the redemption window pass, or worse, sold the field to someone else after dedicating it, he permanently lost the right to ever buy it back, even at the next Jubile.
🚫 Missing the redemption window closed the door permanently
🔄 Selling it to someone else made the loss final too
⚠️ There was a real cost to delaying the decision
---
## ⛺ But The Field, When It Goeth Out In The Jubile, Shall Be Holy Unto The LORD, As A Field Devoted; The Possession Thereof Shall Be The Priest's
Normally the Jubile returned land to its original family for free - but a field that was dedicated and never redeemed broke that pattern. Instead of going back to the family, it stayed set apart to God permanently, and its use passed to the priests.
📅 Normally Jubile returns land to its original family for free
🔄 This case breaks that pattern - the field does not go back
⛺ Instead its use passes permanently to the priests
---
## 💔 As A Field Devoted
"Devoted" is a serious word in the Old Testament, translating a Hebrew idea (cherem) usually describing something set apart to God so completely it could never be reclaimed for ordinary use again. This chapter picks the word back up later, in verses 28-29, for the most serious version of that same idea.
💔 "Devoted" translates a Hebrew word (cherem) meaning irreversibly set apart
🔗 The same word returns later in this chapter, in its most serious form
🎯 A field left unredeemed became permanently, unchangeably God's

# Leviticus 27:22-24
# 🌱 A Field That Was Bought, Not Inherited
---
## 🌱 And If A Man Sanctify Unto The LORD A Field Which He Hath Bought, Which Is Not Of The Fields Of His Possession
This covers a different situation than before - not ancestral land passed down through the family, but a field someone had purchased separately. Israelite law always distinguished carefully between these two kinds of land ownership.
🌱 A purchased field, not inherited ancestral land
📜 Israelite law treated these two kinds of ownership very differently
🎯 Sets up a different ending than the inherited-field case above
---
## 🧮 Then The Priest Shall Reckon Unto Him The Worth Of Thy Estimation, Even Unto The Year Of The Jubile: And He Shall Give Thine Estimation In That Day, As A Holy Thing Unto The LORD
Just like the inherited field, the price was calculated based on years remaining until Jubile - but here the payment had to be handed over immediately, on the very day the vow was made, not gradually over time.
🧮 Same years-remaining-until-Jubile pricing as the inherited field
📅 But payment was due immediately, that same day
✨ Handed over "as a holy thing," fully dedicated at once
---
## 🔄 In The Year Of The Jubile The Field Shall Return Unto Him Of Whom It Was Bought, Even To Him To Whom The Possession Of The Land Did Belong
Here is the key difference from the inherited-field case: because a purchased field was never truly the buyer's permanent possession in the first place, Leviticus 25 already established that all land ultimately returns to its original family line, so it went back to the original ancestral owner at Jubile, not to the priests.
🔄 The field returns to its original ancestral family, not the priests
📖 Ties directly back to Leviticus 25's land-ownership rules
🎯 You could only permanently dedicate land you actually owned long-term
---
## 📖 A Purchased Field Versus An Inherited One
Placed side by side, these two field laws teach the same underlying idea from two directions: a person could only give to God, permanently, what actually belonged to him forever. Ancestral land belonged to the family forever, so dedicating it unredeemed made it God's forever too; purchased land was always temporary anyway, so it simply went home at Jubile like it always would have.
📖 Both laws rest on the same underlying principle
🏡 You can only permanently give away what is permanently yours
🔁 Purchased land just returns home early, as it always would have

# Leviticus 27:25
# ⚖️ The Shekel Of The Sanctuary
---
## ⚖️ And All Thy Estimations Shall Be According To The Shekel Of The Sanctuary
This restates the standard first mentioned back in verse 3, now applied as the single fixed rule for every value in this entire chapter - people, animals, houses, and fields all used the exact same official weight standard.
⚖️ The same "sanctuary shekel" standard from verse 3, now made universal
📏 Applied to every kind of valuation in this whole chapter
🎯 One consistent standard prevented cheating anywhere in the system
---
## 🔬 Twenty Gerahs Shall Be The Shekel
A "gerah" was the smallest unit of weight in this system, and this verse finally defines the shekel in exact terms - twenty gerahs made up one shekel. This kind of precise definition mattered in a barter-and-weighed-silver economy with no printed, guaranteed-value coins.
🔬 A "gerah" was the smallest weight unit in this system
🧮 Twenty gerahs equaled exactly one shekel
💰 Precision mattered in an economy built on weighed silver, not coins

# Leviticus 27:26-27
# 🐄 The Firstling Already Belongs To God
---
## 🐄 Only The Firstling Of The Beasts, Which Should Be The LORD'S Firstling, No Man Shall Sanctify It; Whether It Be Ox, Or Sheep: It Is The LORD'S
A "firstling" is the first male offspring born to an animal. Exodus 13 already dedicated every firstling automatically to God, back when Israel left Egypt, so nobody could vow one as a "special gift" later, because it was never actually theirs to give in the first place.
🐄 A "firstling" is an animal's first male offspring
📖 Already claimed by God back in Exodus 13, at the Exodus itself
🚫 You cannot vow away something that was never yours to give
---
## 🇪🇬 It Is The LORD'S
This phrase closes the loop from Exodus: the tenth plague killed Egypt's firstborn while sparing Israel's, and in response, every one of Israel's own firstborn sons and firstling animals was claimed as belonging to God from that point on. This law simply protects that older claim from being reused as a personal vow.
🇪🇬 Ties directly back to the Passover and the tenth plague
👶 Firstborn sons and firstling animals were claimed together back then
🔒 This law protects that older claim from being double-counted
---
## 🐫 And If It Be Of An Unclean Beast, Then He Shall Redeem It According To Thine Estimation, And Shall Add A Fifth Part Of It Thereto: Or If It Be Not Redeemed, Then It Shall Be Sold According To Thy Estimation
This handles the one exception - if the firstling happened to be from an unclean animal like a donkey, it couldn't go on the altar at all, so the owner either redeemed it with the usual value-plus-a-fifth payment, or sold it outright at the priest's valuation.
🐫 Covers the exception: a firstling from an unclean animal
➕ Same value-plus-a-fifth redemption formula as before
💰 If not redeemed, it was simply sold at the set value instead

# Leviticus 27:28-29
# 💀 Devoted Things Cannot Be Redeemed
---
## 💔 Notwithstanding No Devoted Thing, That A Man Shall Devote Unto The LORD Of All That He Hath, Both Of Man And Beast, And Of The Field Of His Possession, Shall Be Sold Or Redeemed
"Devoted" translates the Hebrew word cherem, a much stronger and more final category than the ordinary vows described earlier in this chapter. Once something was devoted this way, none of the redemption options used throughout the rest of the chapter applied anymore - no buying it back, no priest's valuation, no fifth added on top.
💔 "Devoted" (cherem) is stronger and more final than an ordinary vow
🚫 None of this chapter's redemption options apply to it
🔒 There was no buying it back, under any circumstance
---
## ✨ Every Devoted Thing Is Most Holy Unto The LORD
"Most holy" was the highest level of holiness in the whole sacrificial system, usually reserved for things like the ark of the covenant or the priests' own portion of certain offerings. Applying that same top-tier label here shows just how absolute and irreversible this kind of dedication really was.
✨ "Most holy" was the system's highest level of holiness
📦 Usually reserved for things like the ark of the covenant
🎯 Shows how total and irreversible this dedication really was
---
## ⚔️ None Devoted, Which Shall Be Devoted Of Men, Shall Be Redeemed; But Shall Surely Be Put To Death
This describes a different, specific situation than an ordinary vow. "Devoted" (cherem) elsewhere in the Old Testament describes people or things marked for complete destruction under a war-related ban, such as Jericho in Joshua 6. It is not describing a parent giving up a child through a vow like the one in verses 1-8; it's the same legal category applied to its most extreme, wartime use.
⚔️ "Devoted" elsewhere describes a war-related destruction ban
📖 Jericho in Joshua 6 is the clearest later example of this exact idea
🎯 A different, specific situation from the ordinary vows earlier in this chapter
---
## 📖 A Word That Reappears Later In The Old Testament
The same cherem idea shows up again at Ai and Achan's sin in Joshua 7, where keeping devoted plunder for himself brought disaster on all of Israel, and at Hormah in Numbers 21, where a captured Canaanite city was devoted to destruction after a battle. It is one of the most serious legal categories in the whole Old Testament.
📖 The same idea reappears at Achan's sin in Joshua 7
📖 Also appears at Hormah, a captured city, in Numbers 21
⚠️ One of the most serious legal categories anywhere in the Old Testament
---
## 🔒 Why This Verse Sits Inside A Chapter About Vows
At first this feels out of place next to voluntary vows about people, houses, and fields - but the connection is the word "devoted" itself, used in both the ordinary sense (verses 21 and 28) and this most extreme sense together. The chapter is making sure the reader understands both ends of the same word before it closes.
🔗 Connects back to the same word used in verses 21 and 28
📊 Shows both the mild and the most extreme uses of one word
🎯 The chapter closes out this term fully before moving on

# Leviticus 27:30-33
# 🌾 The Tithe Belongs To The LORD
---
## 🔟 And All The Tithe Of The Land, Whether Of The Seed Of The Land, Or Of The Fruit Of The Tree, Is The LORD'S: It Is Holy Unto The LORD
A "tithe" is a tenth - one out of every ten, given to God as a standing requirement, not a voluntary vow like the rest of this chapter. Unlike the field-dedication laws above, which were optional and only kicked in if a person chose to sanctify something, the tithe applied automatically to everyone's harvest every single year.
🔟 A "tithe" means exactly one-tenth, not just "a lot"
📅 Unlike the rest of this chapter, this was mandatory every year
🌾 Covers both grain crops and fruit-tree harvests
---
## ➕ And If A Man Will At All Redeem Ought Of His Tithes, He Shall Add Thereto The Fifth Part Thereof
A farmer could still keep his own tithed grain instead of physically handing it over, using the same value-plus-a-fifth formula used throughout this whole chapter - practical, since carrying grain long distances to the tabernacle was harder than carrying its silver equivalent.
➕ The same value-plus-a-fifth formula from earlier in the chapter
🌾 Let a farmer keep the grain and pay its cash equivalent instead
🚚 Practical, since hauling grain long distances was harder than silver
---
## 🐑 And Concerning The Tithe Of The Herd, Or Of The Flock, Even Of Whatsoever Passeth Under The Rod, The Tenth Shall Be Holy Unto The LORD
"Passeth under the rod" describes how a shepherd actually counted his animals - herding them single-file through a narrow gate or opening while touching each one with a rod or staff to keep count. Every tenth animal to pass that way, no matter its condition, belonged to God.
🐑 "Passeth under the rod" describes a shepherd's actual counting method
🚪 Animals filed through single-file so none were missed or double-counted
🔟 Every tenth one, automatically, belonged to God
---
## 🎲 He Shall Not Search Whether It Be Good Or Bad, Neither Shall He Change It: And If He Change It At All, Then Both It And The Change Thereof Shall Be Holy; It Shall Not Be Redeemed
Unlike the person-and-property vows earlier in the chapter, there was no redemption option here at all - a shepherd couldn't inspect the herd and specifically pick out his tenth animal to guarantee it was one of the weaker ones. Whichever animal happened to fall on the tenth count was the one that went, no exceptions.
🚫 No redemption option here, unlike the rest of this chapter
🎲 The tenth animal by count went, regardless of its quality
🔁 Swapping it echoes the same doubling penalty from verses 9-10
---
## 🌾 Why The Tithe Gets No Redemption Option
Every other law in this chapter dealt with something a person chose to give beyond what was required. The tithe was never optional in the first place - it already belonged to God by standing command, so there was nothing left to negotiate a way out of, the way there was with a voluntary vow.
🔟 The tithe was never optional, unlike everything earlier in the chapter
🔒 Already belonged to God automatically, with nothing to negotiate
🎯 Explains why this is the one law in the chapter with no exceptions

# Leviticus 27:34
# 🏔️ The Last Statute Of Leviticus
---
## 🏔️ These Are The Commandments, Which The LORD Commanded Moses For The Children Of Israel In Mount Sinai
This single sentence closes the entire book of Leviticus. Every law since the tabernacle's dedication at the end of Exodus, the sacrifices, the priesthood, clean and unclean foods, the Day of Atonement, holiness laws, feast days, the sabbatical and Jubile years, and now these vow-and-valuation laws, all came from this one place and this one lawgiving encounter at Mount Sinai.
🏔️ Closes the entire book of Leviticus in one sentence
📜 Everything since Exodus 40's tabernacle dedication traces back here
✍️ Moses is named only as the messenger, not the source, of the law
---
## 📖 MILESTONE: The Book Of Leviticus Is Complete
Leviticus began with instructions for approaching a holy God through sacrifice in chapter 1 and ends here with the practical, everyday question of how to fairly keep a promise made to Him. In between, it built an entire system for a sinful people to live in the presence of a holy God without being destroyed by that holiness - sacrifice, priesthood, purity, atonement, and now, honesty in what is promised to Him. The next book, Numbers, picks up the story with Israel counted, organized, and ready to leave Sinai for the promised land.
📖 Leviticus opens with sacrifice in chapter 1 and closes with vows here
⛺ The whole book teaches how a sinful people can live near a holy God
➡️ Numbers picks up next, as Israel prepares to leave Sinai
`;

export const LEVITICUS_TWENTY_SEVEN_PERSONAL_SECTIONS = parseLeviticusTwentySevenRawNotes(
  LEVITICUS_TWENTY_SEVEN_RAW_NOTES,
);
