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

"A vow" is a promise a person freely makes to God.

No one is forced to make one.

Once it is spoken out loud, it must be kept.

"Singular" means unusual or especially heavy, not just any promise.

This chapter covers one specific, hard kind of vow.

It is a person dedicating himself, or someone else, to the LORD.

💬 A vow is a voluntary promise

🎯 Singular means unusual and weighty

👤 This chapter covers dedicating a person

📖 A spoken vow had to be kept

## 🙏 The Persons Shall Be For The LORD

This does not mean handing a person over to live at the tabernacle.

That work already belonged only to the Levites.

Instead, a person could be set apart to God in a special way.

Often it was the one who made the vow, or a family member.

Hannah later makes this same kind of vow over her son Samuel.

🙏 The person is set apart, not handed over

🏕️ Tabernacle service already belonged to the Levites

📚 Hannah later vows her son Samuel this way

📖 This vow gave a whole life to God

## 💰 By Thy Estimation

"Estimation" is the key word for this entire chapter.

It means a price fixed by the priest.

That price let a person keep this vow with silver.

No one had to stay at the tabernacle forever.

The rest of the chapter is one long price list built on this word.

💰 Estimation means a price set by the priest

🥈 Silver could stand in for the person

📊 The whole chapter builds on this one word

➡️ A vow could be kept without lifelong service

# Leviticus 27:3-4
# 💰 Valuing A Grown Man Or Woman
---
## 💪 Fifty Shekels Of Silver

Twenty to sixty were considered a person's strongest working years.

Old enough to be fully capable, not yet weakened by age.

Fifty shekels was a serious sum for an ordinary family.

It matched years of a hired hand's wages.

This is the highest number in the whole price table.

💪 Twenty to sixty were prime working years

💰 Fifty shekels was a serious sum

📊 The highest number in the whole table

➡️ Value here was tied to labor strength

## ⚖️ Then Thy Estimation Shall Be Thirty Shekels

The lower number here is not God rating a woman's worth.

Genesis already states both sexes are equally made in God's image.

This value is tied to ancient physical labor economics.

A man's average manual output was priced higher than a woman's in that economy.

The gap describes the marketplace, not a person's value to God.

⚖️ Both sexes are equally made in God's image

💪 The value tracks labor economics, not worth

📊 Every number here is a labor estimate

📖 The marketplace priced this, not God's love

## ⚖️ After The Shekel Of The Sanctuary

A "shekel" was a unit of weight for silver, not a coin.

It was literally weighed out on a scale.

"The shekel of the sanctuary" names one official weight kept by the priests.

That kept anyone from cheating with a lighter or heavier weight.

⚖️ A shekel was weighed, not a coin

⛺ The sanctuary shekel was the official standard

🔍 Priests kept the standard weight

➡️ One standard stopped anyone from cheating

# Leviticus 27:5-7
# 👶 Younger, Older, And Everyone Between
---
## 👦 From Five Years Old Even Unto Twenty Years Old

This bracket covers childhood through the teen years.

A boy in this age range was valued at twenty shekels.

A girl in the same age range was valued at ten shekels.

Both numbers sit below the adult bracket in verses three and four.

Labor capacity at this age was still developing, not fully grown.

👦 Boys here were valued at twenty shekels

👧 Girls here were valued at ten shekels

📉 Both sit below the full adult value

➡️ The price tracked growing, not finished, strength

## 👶 From A Month Old Even Unto Five Years Old

This is the lowest bracket for young children in the whole table.

A boy this age was valued at five shekels.

A girl this age was valued at three shekels.

"A month old" matters here.

A baby was not counted in this system before one month.

That matches the same age used elsewhere for redeeming a firstborn son.

👶 The lowest bracket for young children

🔢 Five shekels for boys, three for girls

📅 A month old matches firstborn redemption law

📖 Even a low price could strain a family

## 📉 If It Be From Sixty Years Old And Above

Value drops again once a person passes sixty.

Physical labor capacity naturally declines with age.

A man this age was valued at fifteen shekels.

A woman this age was valued at ten shekels.

Read across the whole table, value rises through youth, peaks in the strong years, then falls with age.

This was a chart of labor strength across a lifetime, not a ranking of worth.

📉 Value drops again after sixty

🔢 Fifteen shekels for men, ten for women

📊 The table charts strength across a lifetime

➡️ It never measured a person's worth to God

# Leviticus 27:8
# 🙏 If He Be Poorer Than Thy Estimation
---
## 🙏 Then He Shall Present Himself Before The Priest

This verse keeps the price table from blocking a sincere vow.

If someone could not afford the standard price, he did not just default.

He went in person to the priest to work out a fair number.

The vow still had to be kept, but the price could bend.

🙏 Poverty never excused breaking the vow

👤 A face to face meeting solved it

⚖️ The system built in real fairness

➡️ A hard vow still found a way through

## 💰 According To His Ability That Vowed Shall The Priest Value Him

"Ability" means what a person could truly afford.

The priest adjusted the price down to match real circumstances.

This avoided two bad outcomes.

One was an impossible debt.

The other was an empty, meaningless vow.

💰 Ability means what a person could truly afford

👤 The priest judged each hardship personally

🚫 No impossible debt was allowed

📖 No empty vow was allowed either

# Leviticus 27:9-10
# 🐐 Vowing An Animal Fit For Sacrifice
---
## 🐐 Whereof Men Bring An Offering Unto The LORD

This moves from vowing a person to vowing an animal.

It had to be a "clean" animal already approved for sacrifice.

Those animals were listed earlier, back in Leviticus chapters one through seven.

The moment it was given, it became holy.

"Holy" means set apart only for God, and it could never return to ordinary use.

🐐 Covers clean animals fit for sacrifice

📜 Defined back in Leviticus one through seven

🔒 It could never return to ordinary use

➡️ Once given, a gift became fully God's

## 🔄 A Good For A Bad, Or A Bad For A Good

This blocks an obvious loophole.

Someone could not swap a promised healthy animal for a weaker one.

Someone also could not trade a poor animal for a better one just to look generous.

Once an animal was named in the vow, it was locked in.

🔄 Blocks swapping a good animal for worse

🎭 Also blocks swapping a poor one upward

🔒 The named animal was locked in

➡️ Both directions of cheating were closed off

## ⚠️ It And The Exchange Thereof Shall Be Holy

If someone tried the swap anyway, the law did not just undo it.

Both animals became holy, the original and the replacement together.

Breaking the rule cost double instead of nothing.

⚠️ Attempting the swap did not erase the vow

🐐 Both animals became holy together

💰 Breaking the rule cost double

📖 Cheating the system only made it worse

# Leviticus 27:11-13
# 🐫 An Unclean Beast, Valued And Redeemed
---
## 🐫 If It Be Any Unclean Beast

"Unclean" animals, like donkeys or camels, were defined back in Leviticus eleven.

They could never be sacrificed on the altar.

A person could still vow to give one to God's service.

Since it could not be offered directly, the priest set its value instead.

🐫 Unclean animals were barred from the altar

🙏 They could still be given to God

👤 The priest set the value instead

📖 Leviticus eleven defined which animals counted

## 👀 Who Art The Priest, So Shall It Be

Unlike the fixed price table for people, there was no set number for animals here.

The priest personally inspected the animal.

He judged its actual condition and worth, case by case.

👀 No fixed table for this kind of animal

🔍 The priest inspected the real condition

⚖️ Every judgment was made case by case

➡️ A trained eye replaced a fixed number

## ➕ He Shall Add A Fifth Part Thereof

"Redeem" means buying something back after it was dedicated to God.

This introduces a pattern that repeats through the rest of the chapter.

Redeeming something back always cost the original value plus one fifth more.

That extra cost discouraged dedicating something on impulse and taking it back later.

💰 Redeem means buying something back

➕ It always cost the value plus one fifth

🔁 This formula repeats through the whole chapter

📖 The extra cost made regret expensive

# Leviticus 27:14-15
# 🏠 Sanctifying A House
---
## 🏠 Then The Priest Shall Estimate It

"Sanctify" means to formally dedicate something to God.

It sets the thing apart from ordinary use.

A homeowner could do this with an actual house.

Just like the unclean animal, the priest personally inspected it.

He set a fair value rather than using a fixed table.

🏠 Sanctify means formally set apart for God

👤 The priest inspected the house himself

📊 No fixed table, just personal judgment

➡️ Real estate followed the same honest process

## 🔒 So Shall It Stand

This is a small but important legal detail.

Once the priest declared a value, that number was final.

There was no appeal and no second opinion.

The priest's word closed the matter.

⚖️ The valuation was final, not open to appeal

🔒 So shall it stand closed the matter

🎯 This stopped endless arguing over the price

📖 One trusted judgment ended the dispute

## ➕ He Shall Add The Fifth Part

The same one fifth redemption cost from the animal law applies here too.

Once that extra payment was made, the house belonged to the owner again.

It was no longer under any special holy status.

➕ The same one fifth penalty applies again

🏠 Paying it returned the house to normal use

🔓 It left its special holy status behind

📖 A pattern the reader keeps seeing repeat

# Leviticus 27:16-19
# 🌾 A Field Valued By Its Seed
---
## 🌾 Some Part Of A Field Of His Possession

"A field of his possession" means land that belonged to his family by inheritance.

It was part of the original tribal land grant.

A field's value here was not judged by the priest's eye like a house.

It was calculated by how much seed it took to plant it.

🌾 Possession means inherited family land

📏 Value here was measured by seed, not sight

🎯 Seed amount stood in for the field's size

➡️ Fields followed a different rule than houses

## 📦 An Homer Of Barley Seed Shall Be Valued At Fifty Shekels

A "homer" was a large unit of dry measure.

It was close to what one donkey could carry.

Barley was a common, everyday crop, easy to use as a standard.

However much seed it took to plant the field set the base price.

📦 A homer was a large dry measure

🐴 About what one donkey could carry

💰 Fifty shekels set the base price per homer

➡️ Barley made an easy, everyday standard

## 📅 If He Sanctify His Field From The Year Of Jubile

The Jubile was the every fiftieth year reset commanded back in Leviticus twenty five.

Land returned to its original family for free that year.

Dedicating a field right at the start of that cycle meant the full price applied.

A whole fifty years of use was still ahead of it.

📅 Jubile was the fifty year land reset law

⏳ A fresh cycle meant fifty years ahead

💰 So the full price applied

📖 Timing changed how much a field was worth

## 📉 According To The Years That Remain

"Abated" means reduced.

If someone dedicated a field partway through the fifty year cycle, the price dropped.

It matched however many years were left before the next Jubile.

Fewer years of use left meant a lower price.

This was a fair, math based system rather than a flat fee.

📉 Price shrank based on years left

🧮 Abated means reduced, year by year

⚖️ A field's worth tracked its remaining use

➡️ Fair math replaced a flat fee

# Leviticus 27:20-21
# 🚫 The Field That Is Never Redeemed
---
## 🚫 It Shall Not Be Redeemed Any More

This closes off a loophole.

If the owner let the redemption window pass, he lost the right to buy it back.

Selling the field to someone else made that loss final too.

There was a real cost to delaying the decision.

🚫 Missing the window closed the door for good

🔄 Selling it away made the loss final

⚠️ Delay itself carried a real cost

➡️ A choice not made became a choice made

## 💔 As A Field Devoted

Normally the Jubile returned land to its original family for free.

A field dedicated and never redeemed broke that pattern.

Instead of going back to the family, it stayed set apart to God.

Its use passed permanently to the priests.

"Devoted" translates a Hebrew word, cherem, describing something set apart so completely it could never be reclaimed.

📅 Jubile normally returned land for free

🔄 This case broke that pattern

⛺ Its use passed permanently to the priests

📖 Devoted meant set apart beyond recall

# Leviticus 27:22-24
# 🌱 A Field That Was Bought, Not Inherited
---
## 🌱 Which He Hath Bought

This covers a different case than before.

Not ancestral land passed down through the family.

A field someone had purchased separately.

Israelite law always treated these two kinds of ownership differently.

🌱 A purchased field, not inherited land

📜 The law treated these two cases differently

🎯 Sets up a different ending than before

➡️ Ownership history changed the outcome

## ✨ As A Holy Thing Unto The LORD

Just like the inherited field, the price was based on years left until Jubile.

Here the payment had to be handed over immediately.

It was due that same day, not gradually over time.

🧮 Same years remaining pricing as the field above

📅 Payment was due that same day

✨ It was handed over as fully dedicated

➡️ Timing was stricter for a purchased field

## 🔄 The Field Shall Return Unto Him Of Whom It Was Bought

Here is the key difference from the inherited field case.

A purchased field was never truly the buyer's permanent possession.

Leviticus twenty five already established that land returns to its original family line.

So it went back to the original owner at Jubile, not to the priests.

🔄 The field returned to its original family

📖 Leviticus twenty five set this land rule

🎯 A person could only give what he owned

➡️ Purchased land always went home eventually

# Leviticus 27:25
# ⚖️ Twenty Gerahs Shall Be The Shekel
---
## ⚖️ According To The Shekel Of The Sanctuary

This restates the standard first named back in verse three.

Now it applies as the fixed rule for every value in this whole chapter.

People, animals, houses, and fields all used the same official weight.

⚖️ The sanctuary shekel applies to everything here

📏 People, animals, houses, and fields, all one standard

🎯 One consistent weight stopped cheating

📖 A single rule governed the entire chapter

## 🔬 Twenty Gerahs Shall Be The Shekel

A "gerah" was the smallest unit of weight in this system.

This verse finally defines the shekel in exact terms.

Twenty gerahs made up one shekel.

Precision mattered in an economy built on weighed silver, not printed coins.

🔬 A gerah was the smallest weight unit

🧮 Twenty gerahs equaled one shekel

💰 Silver was weighed, not printed like coins

➡️ Precision protected buyer and seller alike

# Leviticus 27:26-27
# 🐄 The Firstling Already Belongs To God
---
## 🐄 No Man Shall Sanctify It

A "firstling" is the first male offspring born to an animal.

Exodus thirteen already dedicated every firstling automatically to God.

That happened back when Israel left Egypt.

No one could vow one as a special gift later.

It was never actually theirs to give in the first place.

🐄 A firstling is an animal's first male offspring

📖 Exodus thirteen already claimed it for God

🚫 You cannot vow away what is not yours

➡️ Some things were already dedicated before the vow

## 🐫 If It Be Of An Unclean Beast

This handles one exception.

If the firstling came from an unclean animal, like a donkey, it could not go on the altar.

The owner either redeemed it with the usual value plus one fifth.

Or he sold it outright at the priest's valuation.

🐫 Covers the exception of an unclean firstling

➕ Redeemed with the usual value plus one fifth

💰 Or sold outright at the set value

📖 Even an exception followed the chapter's pattern

# Leviticus 27:28-29
# 💀 Devoted Things Cannot Be Redeemed
---
## 💔 That A Man Shall Devote Unto The LORD

"Devoted" translates the Hebrew word cherem.

It names a stronger, more final category than the ordinary vows earlier in this chapter.

Once something was devoted this way, none of this chapter's redemption options applied.

No buying it back, and no priest's valuation.

💔 Devoted is stronger than an ordinary vow

🚫 None of this chapter's redemption options applied

🔒 There was no buying it back

➡️ Some dedications allowed no way out

## ✨ Every Devoted Thing Is Most Holy Unto The LORD

"Most holy" was the highest level of holiness in the whole sacrificial system.

It was usually reserved for things like the ark of the covenant.

Applying that same top level label here shows how absolute this dedication was.

✨ Most holy was the system's highest level

📦 Usually reserved for things like the ark

🎯 Shows how total this dedication really was

📖 The highest label marked the highest stakes

## ⚔️ Shall Surely Be Put To Death

This describes a different, specific situation than an ordinary vow.

"Devoted" elsewhere in the Old Testament describes people marked for destruction under a war ban.

Jericho in Joshua six is the clearest later example.

This is not a parent giving up a child through a vow like verses one through eight.

It is the same legal word applied to its most extreme, wartime use.

⚔️ Describes a war related destruction ban

📖 Jericho in Joshua six shows this same word

🎯 A different case from the ordinary vows above

➡️ One word covered a mild and extreme use

# Leviticus 27:30-33
# 🌾 The Tithe Belongs To The LORD
---
## 🔟 All The Tithe Of The Land

A "tithe" is a tenth, one out of every ten.

It was given to God as a standing requirement, not a voluntary vow.

The field dedication laws above were optional.

It applied automatically to every harvest, every year.

🔟 A tithe means exactly one tenth

📅 This tithe was mandatory every single year

🌾 It covered both grain and fruit

➡️ Some giving to God was never optional

## ➕ He Shall Add Thereto The Fifth Part

A farmer could keep his own tithed grain instead of handing it over.

He used the same value plus one fifth formula from earlier in the chapter.

This was practical, since hauling grain long distances was harder than carrying silver.

➕ Same value plus one fifth formula again

🌾 A farmer could keep the grain itself

🥈 He paid its cash equivalent instead

➡️ Silver traveled easier than a wagon of grain

## 🐑 Whatsoever Passeth Under The Rod

"Passeth under the rod" describes how a shepherd actually counted his animals.

He herded them single file through a narrow gate.

He touched each one with a rod to keep count.

Every tenth animal to pass that way belonged to God, no matter its condition.

🐑 Passeth under the rod means a shepherd's count

🚪 Animals filed through single file

🔟 Every tenth one belonged to God

➡️ A simple method kept the count honest

## 🎲 He Shall Not Search Whether It Be Good Or Bad

Unlike the vows earlier in the chapter, there was no redemption option here.

A shepherd could not inspect the herd and pick out a weaker tenth animal.

Whichever animal happened to fall on the tenth count was the one that went.

The tithe was never optional in the first place, so there was nothing to negotiate.

🚫 No redemption option for the tithe

🎲 The tenth animal by count simply went

🔁 Swapping it doubled the cost too

📖 What was never optional needed no exception

# Leviticus 27:34
# 🏔️ The Last Statute Of Leviticus
---
## 🏔️ These Are The Commandments

This single sentence closes the entire book of Leviticus.

Every law since the tabernacle's dedication came from one place.

It covered sacrifice, priesthood, purity, atonement, and the feasts.

Moses delivered the law, not its source.

🏔️ Closes the entire book of Leviticus

📜 Every law traces back to one place

✍️ Moses delivered the law, not its source

➡️ One mountain grounded an entire book of law

## ⛰️ In Mount Sinai

Leviticus opened with instructions for approaching a holy God through sacrifice.

It closes here with the everyday question of how to keep a promise honestly.

In between, it built a way for a sinful people to live near a holy God.

The next book, Numbers, picks up the story as Israel prepares to leave Sinai.

📖 Leviticus opens with sacrifice, closes with vows

⛺ It teaches life near a holy God

🎯 A whole book taught nearness without destruction

➡️ Numbers picks up next, as Israel leaves Sinai
`.trim();

export const LEVITICUS_TWENTY_SEVEN_PERSONAL_SECTIONS = parseLeviticusTwentySevenRawNotes(
  LEVITICUS_TWENTY_SEVEN_RAW_NOTES,
);
