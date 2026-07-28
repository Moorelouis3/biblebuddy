export type LeviticusTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentyFiveRawNotes(rawText: string): LeviticusTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 25:${startVerse}` : `Leviticus 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Leviticus 25 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_FIVE_RAW_NOTES = `# Leviticus 25:1-7
# 🌾 A Sabbath Year For The Land
---
## 🏔️ In Mount Sinai
Leviticus almost always says these laws came "from the tabernacle of the congregation," but this one specifically says Mount Sinai instead. That's likely because the whole sabbatical-year law was first given here, at the mountain, even though Israel would not need it until they were settled and farming in Canaan.
🏔️ Named location instead of Leviticus's usual "tabernacle" phrase
📜 Marks this law as part of the original Sinai giving
🌾 Applies to a future settled life, not the current wilderness camp
---
## 🗣️ Speak Unto The Children Of Israel, And Say Unto Them
This relay formula - God tells Moses, Moses tells the people - appears constantly through Leviticus, underlining that Moses never invented any of these laws himself. He was only the messenger passing along exactly what he had been told.
🗣️ A relay formula repeated constantly through Leviticus
📜 Moses never invented these laws himself
🔁 The same reminder already made about chapter 24's opening
---
## 🌱 When Ye Come Into The Land Which I Give You
This law could not be obeyed yet - Israel was still wandering in the wilderness with no fields or vineyards of their own. God is giving farming instructions decades before anyone could actually plant a single seed under them.
🌱 A law for a future life, not the present wilderness camp
⏳ Given decades before it could actually be followed
🎯 Shows God planning ahead for Israel's settled future
---
## 😴 Then Shall The Land Keep A Sabbath Unto The LORD
The word "sabbath" usually describes a person resting one day in seven. Here it is applied to the ground itself - the soil gets its own rest cycle, owed to God the same way a person's weekly rest is.
😴 Extends the sabbath idea from people to farmland itself
🌾 The soil gets a rest cycle, not just human workers
🙏 Framed as something owed "unto the LORD," not just good farming
---
## 🍇 Six Years Thou Shalt Sow... Prune Thy Vineyard
This describes ordinary, expected farm work - planting grain fields for six straight years and trimming back grapevines so they produce better fruit. Nothing unusual yet; it is the baseline before the interruption in verse 4.
🌾 Sowing means planting seed in the fields
🍇 Pruning means cutting back vines to improve the harvest
🔁 Six years of totally normal, expected labor
---
## 🛑 In The Seventh Year Shall Be A Sabbath Of Rest Unto The Land
Every seventh year, all planting and pruning stopped completely across the whole land at once. This was not one farmer resting while a neighbor kept working - it was a nationwide, synchronized fallow year.
🛑 All sowing and pruning stopped completely, everywhere
🗓️ Every seventh year, without exception
🇮🇱 A synchronized national fallow year, not an individual choice
---
## 🔁 A Sabbath Of Rest Unto The Land, A Sabbath For The LORD
Verse 4 uses the word "sabbath" twice in the same breath - once describing what the land experiences (rest), once describing who it is ultimately for (the LORD). The doubling is a deliberate emphasis, not accidental repetition.
🔁 "Sabbath" appears twice in the same verse deliberately
🌾 One use describes what happens: rest
🙏 The other describes who it is really for: the LORD
---
## 🌿 That Which Groweth Of Its Own Accord... Undressed
Whatever sprouted up on its own from leftover seed, or grapes that grew on unpruned vines, could not be formally harvested and stored as a crop. "Undressed" means the vines were left untrimmed and wild that year.
🌿 Volunteer plants could not be treated as a real harvest
🍇 "Undressed" means the vines were left untrimmed
🚫 No formal reaping or grape-gathering that year
---
## 🍽️ The Sabbath Of The Land Shall Be Meat For You
"Meat" here is the old word for food in general, not just animal flesh. Whatever grew wild during the rest year was not wasted - it stayed available to eat directly from the field as needed.
🍽️ "Meat" means food in general, an old use of the word
🌾 Wild growth still fed people, just not as stored stock
🙌 Nothing about the land's rest wasted its produce
---
## 🤝 For Thee, And For Thy Servant... Stranger That Sojourneth With Thee
This list deliberately includes everyone living on the property - the landowner, hired workers, household servants, and even foreign residents just passing through. The rest year's free food applied equally to all of them.
🤝 Covers landowner, servants, and foreign residents alike
🌍 "Sojourneth" means living there temporarily, not a citizen
⚖️ Free access to wild food applied to everyone, not just owners
---
## 🐐 And For Thy Cattle, And For The Beast That Are In Thy Land
Even livestock and wild animals were allowed to eat freely from whatever grew during the sabbatical year. The rest applied to the whole ecosystem, not just the human community.
🐐 Domestic livestock could graze the wild growth freely
🦌 Wild animals were included too
🌍 The land's rest touched the entire ecosystem, not just people

# Leviticus 25:8-13
# 📯 The Year Of Jubilee
---
## 🔢 Seven Sabbaths Of Years, Seven Times Seven Years
This counts sabbatical cycles the same way the weekly sabbath counts days - seven cycles of seven years each. Seven times seven equals forty-nine, marking off a bigger rhythm built on top of the smaller one from verses 1-7.
🔢 Seven cycles of seven years, just like counting weeks
🧮 Seven times seven equals forty-nine years
🔁 A bigger rhythm layered on top of the sabbatical-year pattern
---
## 📅 The Space Of The Seven Sabbaths Of Years Shall Be Unto Thee Forty And Nine Years
This spells out the math plainly so there is no confusion - forty-nine full years pass before the next special year arrives. The following year, the fiftieth, is the one this whole section has been building toward.
📅 Confirms forty-nine years is the length of the full cycle
➡️ Sets up the fiftieth year as something new and different
🔗 Directly follows the sabbatical pattern from verses 1-7
---
## 📯 The Trumpet Of The Jubile... Day Of Atonement
"Jubile" (jubilee) comes from a Hebrew word for a ram's horn trumpet, blown to announce the new fiftieth year. It was sounded specifically on the Day of Atonement, the year's most solemn day of national forgiveness, tying financial release to spiritual release.
📯 "Jubile" comes from the word for a ram's-horn trumpet
🗓️ Sounded on the tenth day of the seventh month
🙏 Announced on the Day of Atonement, linking money and forgiveness
---
## 🕊️ Hallow The Fiftieth Year, And Proclaim Liberty Throughout All The Land
"Hallow" means to set apart as holy. "Proclaim liberty" became one of the most famous phrases from this chapter - it is even engraved on America's Liberty Bell - and here it means releasing people and property back to where they started.
🕊️ "Hallow" means setting the year apart as holy
🔔 "Proclaim liberty" is the phrase later engraved on the Liberty Bell
🏡 Meant release of people and property, not political freedom broadly
---
## 🏡 Ye Shall Return Every Man Unto His Possession... Unto His Family
Every fiftieth year reset the map. Any land sold out of financial hardship went back to its original family, and anyone who had been separated from their household through debt was reunited with them.
🏡 Land sold off in hard times returned to its original owners
👪 People separated from family through debt were reunited
🔁 A built-in reset every fifty years, not a one-time event
---
## 🌾 Ye Shall Not Sow, Neither Reap... Nor Gather The Grapes... Undressed
The Jubilee year repeated the exact same farming rest as the regular sabbatical year - no planting, no harvesting, fields left wild. Since the Jubilee followed right after the 49th year, itself already a sabbatical year, this meant two rest years back to back.
🌾 Repeats the same no-farming rule from verses 4-5
🔁 The 49th year was already a sabbatical year on its own
2️⃣ Meant two fallow years in a row for the land
---
## ✨ For It Is The Jubile; It Shall Be Holy Unto You
Calling the year itself "holy" put it in the same category as sacred objects and holy days - set apart from ordinary time, not just an economic policy but something treated as sacred on the calendar.
✨ Calls the year itself holy, not just a set of rules
📅 Places it in the same category as other sacred times
🎯 Frames economics as something spiritual, not separate from it
---
## 🌱 Ye Shall Eat The Increase Thereof Out Of The Field
Like the regular sabbatical year, people lived directly off whatever grew wild in the fields that year rather than off stored grain. This repeats the trust-God's-provision theme that verses 20-22 address head-on.
🌱 Food came straight from the field, not storage
🙏 Repeats the same trust-in-provision idea as the sabbatical year
🔗 Sets up the direct question about food supply in verse 20
---
## 🔁 In The Year Of This Jubile Ye Shall Return Every Man Unto His Possession
This closing line repeats verse 10's promise almost word for word, making sure it is the section's clear takeaway before the chapter moves into the detailed pricing and redemption rules that follow.
🔁 Repeats verse 10's promise almost exactly
📌 Marks this idea as the section's central point
➡️ Sets up the specific sale and redemption laws in verses 14 and after

# Leviticus 25:14-17
# ⚖️ Fair Pricing, Not Oppression
---
## 🤝 If Thou Sell Ought Unto Thy Neighbour... Not Oppress One Another
This introduces a completely new topic - everyday buying and selling between neighbors - and immediately states the guiding rule before giving any specifics: whatever the price ends up being, it cannot be a way of taking advantage of someone.
🤝 Shifts topic from land-return to everyday trade
⚖️ States the guiding principle before any specific rule
🚫 "Not oppress" means not taking advantage through a bad deal
---
## 🤝 Buyest Ought Of Thy Neighbour's Hand
This pictures ordinary, face-to-face local trade between people who knew each other - not large-scale commerce or trading with strangers from other nations, but the everyday buying and selling within one Israelite community.
🤝 Pictures small-scale, local, face-to-face trade
👥 Between people who actually knew each other
🏘️ Not large commerce or trade with distant strangers
---
## 🔢 According To The Number Of Years After The Jubile Thou Shalt Buy
Because all land automatically returned to its original owner at the next Jubilee anyway, buying land was not really buying dirt forever - it was really buying however many harvests remained until that reset happened.
🔢 Price was based on years remaining, not permanent ownership
🌾 What was really being bought was future harvests
🔗 Only makes sense because of the Jubilee return rule just given
---
## 📈 According To The Multitude Of Years Thou Shalt Increase The Price
More years left until the next Jubilee meant more total harvests still available, so the price went up. Fewer years left meant fewer harvests to buy, so the price came down - a built-in fairness formula instead of haggling.
📈 More remaining years meant a higher price
📉 Fewer remaining years meant a lower price
🧮 A fixed formula, not open negotiation or guesswork
---
## 🌾 For According To The Number Of The Years Of The Fruits Doth He Sell Unto Thee
This restates the same principle plainly one more time, making sure it is unmistakable: the transaction was always priced as a sale of future crop yield, never as a permanent transfer of the land itself.
🌾 Restates the fruit-years pricing idea for clarity
🔁 Repetition signals how important this principle was
🏡 Reinforces that land could never truly change hands forever
---
## 🙏 Ye Shall Not Therefore Oppress One Another... Fear Thy God
The section closes exactly how it opened, bookending the pricing rules with the same warning against exploiting a neighbor - and adds "fear thy God" as the real reason to follow a formula nobody could easily audit at the market stall.
🙏 Bookends the section with the same warning from verse 14
😨 "Fear thy God" means real reverence, not just being scared
🔍 A rule enforced by conscience more than by any outside check
---
## 🙌 For I Am The LORD Your God
This short closing tag appears again and again throughout Leviticus, always at the end of a command. It roots obedience in who God is, not just in what is fair or profitable - the reason to keep the rule is relationship, not just economics.
🙌 A recurring closing tag used throughout Leviticus
🎯 Grounds the command in God's identity, not just fairness
🔁 Same pattern used repeatedly across earlier chapters

# Leviticus 25:18-22
# 🌾 A Promise Of Provision
---
## 📜 Do My Statutes, And Keep My Judgments, And Do Them
"Statutes" and "judgments" are two different words Leviticus regularly pairs together - statutes tend to mean fixed rules, judgments tend to mean case-by-case rulings. Together they cover the whole range of God's law, not just one type of command.
📜 "Statutes" and "judgments" are two related legal terms
⚖️ Statutes are fixed rules; judgments are case rulings
🔗 Paired together to mean the whole body of God's law
---
## 🏡 Ye Shall Dwell In The Land In Safety
This ties obedience directly to physical security - not a vague spiritual blessing, but the concrete promise of actually being safe from invasion, famine, or disaster while living in the land God gave them.
🏡 A concrete promise, not a vague spiritual reward
🛡️ Specifically about safety from invasion, famine, or disaster
🔗 Directly follows the pricing laws about trusting God's system
---
## 🌾 The Land Shall Yield Her Fruit, And Ye Shall Eat Your Fill
This answers, in advance, any worry that resting the land every seventh year would leave people hungry. Obedience to the sabbatical system was paired with a promise of full harvests, not scarcity.
🌾 A direct promise the sabbatical system would not cause hunger
🍽️ "Eat your fill" means genuine abundance, not rationing
🔗 Answers the worry the next verse states out loud
---
## ❓ What Shall We Eat The Seventh Year?
The text openly voices the obvious human fear before answering it - if nobody is allowed to plant or harvest, what happens to the food supply? This is not a rhetorical throwaway line; it is the exact anxiety any farmer would have.
❓ States the obvious fear plainly instead of ignoring it
🌾 The real practical worry behind resting the land
🎯 Sets up God's direct answer in the very next verse
---
## 🎁 I Will Command My Blessing Upon You In The Sixth Year
God's answer is a specific, supernatural promise - the sixth year's harvest would produce enough surplus to cover the seventh year's rest, and even stretch further depending on how the Jubilee cycle lined up.
🎁 A specific promise of a bigger sixth-year harvest
🙏 Framed as God's direct action, not a farming technique
📆 Meant to cover the coming fallow year's food needs
---
## 📦 It Shall Bring Forth Fruit For Three Years
One good sixth-year harvest was promised to last through three years of eating - covering the sabbatical seventh year and stretching into the eighth, until new crops could finally be planted and grown.
📦 One harvest stretched to feed three years of eating
🔢 Covers the sabbatical year plus the time to grow new crops
🙏 A promise of provision far beyond a normal single harvest
---
## 📖 Three Years Of Provision, Especially Around A Jubilee
A normal sabbatical year only needed to bridge one fallow year, but when the Jubilee's fiftieth year followed right after an already-fallow forty-ninth year, two rest years lined up back to back. Jewish teachers have long read this "three years" promise as addressing exactly that harder, doubled case.
📖 Addresses the harder case of two fallow years in a row
🗓️ Happens whenever the Jubilee follows a sabbatical year
📚 Long read this way by later Jewish teachers and tradition
---
## 🌱 Sow The Eighth Year, And Eat Yet Of Old Fruit Until The Ninth Year
This spells out the timeline exactly - people would plant again in the eighth year, but would not have a fresh harvest ready until sometime in the ninth year, living on the sixth year's stored surplus the whole time between.
🌱 Planting resumed in the eighth year
⏳ New harvest was not ready until into the ninth year
📦 The gap was bridged entirely by stored sixth-year grain

# Leviticus 25:23-28
# 🏞️ The Land Belongs To God
---
## 🚫 The Land Shall Not Be Sold For Ever
This is the legal foundation underneath everything already said about pricing and return - no sale of land could ever be truly permanent, no matter what price changed hands or what any private deed might claim.
🚫 No land sale could ever be truly permanent
📜 The legal foundation behind the earlier pricing rules
🔗 Explains why prices were based on years, not full ownership
---
## 🙏 For The Land Is Mine
God claims personal ownership of the ground itself, not just spiritual authority over Israel. Every Israelite family held their fields as a trust from God, never as something they owned outright forever.
🙏 God claims literal ownership of the physical land
🏡 Families held fields in trust, not outright forever
🎯 The theological reason behind every rule in this chapter
---
## 🏕️ For Ye Are Strangers And Sojourners With Me
"Strangers and sojourners" describes someone living as a guest on land that belongs to someone else - here applied to all of Israel in relation to God. Even in their own promised land, they were guests, not ultimate owners.
🏕️ Describes a guest living on someone else's land
🌍 Applied to all of Israel, even in their own homeland
🙏 Everyone answered to God as the true landowner
---
## 💰 Ye Shall Grant A Redemption For The Land
"Redemption" means buying something back. This required every land sale to include a built-in buyback option for the seller's family - selling land could never permanently cut off a family's right to reclaim it.
💰 "Redemption" means the right to buy something back
📜 Every land sale had to allow for a future buyback
👪 Protected a family's long-term claim to their land
---
## 🌍 In All The Land Of Your Possession
The word "all" leaves no exceptions - this was not a rule some families could opt out of or negotiate away. Every single piece of tribal land in Israel carried this same permanent buyback right, whether the current owner liked it or not.
🌍 "All" means no exceptions or opt-outs allowed
📜 Applied uniformly across every tribal allotment
🔒 Could not be negotiated away by buyer or seller
---
## 👪 If Any Of His Kin Come To Redeem It, Then Shall He Redeem That Which His Brother Sold
This introduces the "kinsman-redeemer" - a close relative with both the right and the responsibility to buy back family land or people from hardship. The same role and Hebrew idea shows up later as central to the story of Ruth and Boaz.
👪 Introduces the kinsman-redeemer role and responsibility
📖 The same concept later drives the whole book of Ruth
🤝 A relative's duty, not just an option, when possible
---
## 💪 If The Man Have None To Redeem It, And Himself Be Able To Redeem It
If no relative was available or willing, the original seller could still buy back his own land later if his situation improved - the redemption right was not lost just because family help was not there.
💪 The original owner could redeem it himself if he recovered
🔓 Loss of family help did not cancel the redemption right
⏳ Recovery could happen any time before the next Jubilee
---
## 🧮 Let Him Count The Years Of The Sale Thereof, And Restore The Overplus
"Overplus" means the leftover balance. Buying back land meant paying only for the years still remaining until Jubilee, refunding the buyer for years already used - the same fair, prorated pricing formula from verses 15-16.
🧮 "Overplus" means the remaining balance owed
💰 Buyback price was prorated to years left until Jubilee
🔗 Reuses the exact pricing formula from verses 15-16
---
## ⏳ If He Be Not Able To Restore It... Until The Year Of Jubile
If a family truly could not afford to buy their land back at all, it was not lost forever - it simply stayed with the buyer until the next Jubilee, at which point it returned automatically with no payment required.
⏳ Inability to pay did not mean losing the land permanently
🔄 The land still returned automatically at the Jubilee
💸 No payment was needed for this automatic reset

# Leviticus 25:29-34
# 🏘️ Houses, Villages, And The Levites' Exception
---
## 🏙️ If A Man Sell A Dwelling House In A Walled City
This shifts from farmland to city houses, and treats them differently right away - a walled city marked a permanent, defended settlement, distinct legally from open farmland out in the country.
🏙️ A completely different rule than farmland just covered
🧱 Walled cities were fortified, permanent settlements
📜 The change in setting signals a change in the law
---
## ⏳ He May Redeem It Within A Whole Year After It Is Sold
Unlike farmland, a house in a walled city only had a strict one-year window for the seller to buy it back - a much shorter deadline than the farmland rules, which allowed redemption anytime up until the Jubilee.
⏳ Only a one-year window to redeem a city house
📉 Far shorter than farmland's anytime-until-Jubilee rule
🏙️ City property followed its own separate timeline
---
## 🔒 If It Be Not Redeemed... Established For Ever... Shall Not Go Out In The Jubile
Once that one year passed without buyback, the house became the new owner's permanent property - it would not return at the next Jubilee the way farmland always did. City houses could genuinely change hands forever.
🔒 Missing the one-year window made the sale permanent
🚫 Unlike farmland, it never returned at Jubilee
🏙️ City houses could truly change ownership forever
---
## 🌾 The Houses Of The Villages Which Have No Wall... Counted As The Fields Of The Country
A house in an unwalled village was treated like farmland instead of a city house, because unwalled villages were tied closely to agricultural life rather than fortified urban life.
🌾 Village houses followed farmland rules, not city rules
🧱 The presence or absence of a wall decided which rule applied
🏡 Reflects how closely villages were tied to farming life
---
## 🔄 They May Be Redeemed, And They Shall Go Out In The Jubile
Because village houses counted as farmland, they got farmland's full protections - redeemable anytime, and automatically returned at the next Jubilee even without a buyback ever happening.
🔄 Got the same protections as regular farmland
⏳ Redeemable at any time, not just within one year
🎉 Automatically returned at Jubilee regardless
---
## 🕎 The Cities Of The Levites... May The Levites Redeem At Any Time
The Levites, the priestly tribe, received no full territory of their own inheritance - just scattered cities and surrounding pastureland. Because that was their only possession, they got a special right to redeem their houses at any time, not the one-year city limit.
🕎 Levites had no full tribal land, only scattered cities
📖 Their city-and-pasture system is detailed in Numbers 35
⏳ Given anytime-redemption as a special protection
---
## 🕎 Why The Levites Had No Full Land Inheritance
Unlike the other twelve tribes, the Levites were told elsewhere that "the LORD" was their inheritance instead of farmland - their calling was priestly service, supported by the other tribes' offerings rather than their own crops.
🕎 Told elsewhere that "the LORD" was their inheritance
📖 Referenced in Numbers 18:20
🙏 Supported by offerings instead of farming their own land
---
## 🎉 The House That Was Sold... Shall Go Out In The Year Of Jubile
Even inside a walled city, a Levite's house still returned automatically at the Jubilee - overriding the normal permanent-sale rule for city property, because Levite housing needed permanent protection.
🎉 Levite houses always returned at Jubilee, even in cities
🔓 Overrides the regular walled-city permanent-sale rule
🛡️ Extra protection since Levites depended on it entirely
---
## 🌾 The Field Of The Suburbs Of Their Cities May Not Be Sold
"Suburbs" here means the open pastureland ringing each Levite city, used for grazing livestock. Unlike houses, this land could never be sold at all, under any circumstances - permanently protected common ground.
🌾 "Suburbs" means pastureland surrounding each Levite city
🚫 Could never be sold at all, not even temporarily
🐑 Kept as permanent shared grazing ground

# Leviticus 25:35-38
# 🤲 Caring For A Poor Brother
---
## 🌙 Waxen Poor
"Waxen" is an old form of "become" - the same word used for a waxing moon growing fuller. Here it describes someone whose poverty is a process, not just a fixed condition: he is gradually becoming poor.
🌙 "Wax" is an old word meaning "become"
📉 Same word used for a moon "waxing," or growing
⏳ Describes an ongoing slide, not a fixed state
---
## 📉 Fallen In Decay With Thee
"Fallen in decay" pictures someone's situation actively crumbling - debts piling up, resources running out - happening right there in the community, not somewhere distant and easy to ignore.
📉 Pictures an actively worsening situation
🏘️ Happening right within the community, not far away
👀 Hard for neighbors to honestly claim they did not notice
---
## 🤲 Thou Shalt Relieve Him
"Relieve" meant active, practical help, not just sympathy. The following verses spell out exactly what that looked like: interest-free loans of money and food, so a struggling neighbor could recover without sinking deeper into debt.
🤲 "Relieve" means real, practical action, not just sympathy
💰 Specified in the next verses as interest-free help
🔗 Connects directly to the no-usury rules that follow
---
## 🌍 Yea, Though He Be A Stranger, Or A Sojourner
This obligation to help was not limited to full Israelites - it explicitly extended to foreign residents living among them too, widening the circle of who counted as "brother" for this specific command.
🌍 The help requirement was not limited to native Israelites
🤝 Foreign residents were explicitly included
💬 Widens who counts as "brother" in this command
---
## 🚫 Take Thou No Usury Of Him, Or Increase
"Usury" means charging interest on a loan. "Increase" is a second, overlapping word for the same idea - charging someone more than what was lent. Both were forbidden when lending to a struggling fellow Israelite or resident.
🚫 "Usury" means charging interest on a loan
➕ "Increase" is a second word for the same practice
🤝 Both were banned when helping someone in real need
---
## 🍞 Nor Lend Him Thy Victuals For Increase
The no-interest rule covered food loans too, not just money. "Victuals" means food supplies - even lending grain with a plan to collect back more grain than was given was against this law.
🍞 "Victuals" means food supplies, not just cash
🚫 The no-interest rule applied to food loans too
⚖️ Closed a loophole of profiting off someone's hunger
---
## 🙏 I Am The LORD Your God, Which Brought You Forth Out Of The Land Of Egypt
The reason given for financial mercy is not practical economics - it is Israel's own history. They were once helpless slaves rescued for free, so lending to a struggling neighbor for personal profit would betray the very story that defined them.
🙏 Grounds the command in Israel's own rescue story
🇪🇬 They were once helpless, freed without earning it
🎯 Profiting off a poor neighbor would betray that history

# Leviticus 25:39-46
# ⛓️ Servants, Not Slaves, Among Your Own People
---
## 👤 If Thy Brother... Be Sold Unto Thee; Thou Shalt Not Compel Him To Serve As A Bondservant
An Israelite could sell his own labor into debt-service if poverty left no other option, but the law immediately draws a hard line - he could never be treated as a "bondservant," meaning permanent, owned property.
👤 Covers an Israelite selling his own labor to survive debt
🚫 Explicitly forbidden to treat him as permanent property
⚖️ A hard legal line drawn immediately, not left vague
---
## 📖 Bondservant vs. The Ordinary Word For Servant
The vocabulary here distinguishes a general word for "servant," used often and even for God's own people, from a stronger term implying full, permanent ownership. Verse 39 specifically forbids applying that stronger, ownership-implying term to a fellow Israelite.
📖 Two different strength levels hide behind the English word "servant"
🚫 The stronger, ownership-implying term is what is forbidden here
🔍 A distinction easy to miss in English translation alone
---
## 💼 As An Hired Servant
A "hired servant" worked for wages under a set arrangement, expecting eventual payment and an end date - the model this whole relationship was supposed to follow instead of ownership.
💼 Wage labor with an expected end date
🚫 Explicitly not slavery or ownership
🔗 The standard this new law measures the arrangement against
---
## 🏕️ And As A Sojourner
A "sojourner" lived somewhere temporarily without full permanent rights there - applying that word to an Israelite debt-servant reinforced that his situation, however hard, was temporary and would end.
🏕️ Describes temporary residence, not permanent belonging
⏳ Reinforces that the arrangement was never meant to be forever
🔗 Paired with "hired servant" to describe the same limited status
---
## 🎉 Serve Thee Unto The Year Of Jubile
This debt-service arrangement had a guaranteed maximum length - it automatically ended at the next Jubilee, no matter how many years remained on any informal understanding between the two men.
🎉 Automatically ended at the next Jubilee
⏳ Guaranteed a maximum length, not indefinite service
🔗 Ties personal freedom to the same cycle as land return
---
## 🏡 Then Shall He Depart From Thee... Return Unto His Own Family, And Unto The Possession Of His Fathers
Release at Jubilee was not just freedom from work - it fully restored what he had lost, reuniting him with his family and returning any ancestral land, undoing the poverty's damage completely.
🏡 Full restoration, not just an end to labor
👪 Reunited with family at the same time
🔗 Ancestral land returned in the same reset, per verses 10-13
---
## 🙏 For They Are My Servants, Which I Brought Forth Out Of The Land Of Egypt: They Shall Not Be Sold As Bondmen
The reasoning here is theological, not economic - every Israelite already belonged to God as His own rescued people, so no human being had the right to permanently own another Israelite as property.
🙏 Every Israelite already belonged to God, not to any master
🇪🇬 Rooted in their shared rescue from Egyptian slavery
🚫 No human had the right to permanently own a fellow Israelite
---
## ⚔️ Thou Shalt Not Rule Over Him With Rigour; But Shalt Fear Thy God
"Rigour" means harsh, cruel treatment. Even during the legitimate working relationship, cruelty was explicitly forbidden - and again, the reason given is reverence for God, not just concern about fairness.
⚔️ "Rigour" means harsh or cruel treatment
🚫 Forbidden even during a legitimate work arrangement
😨 Grounded in fearing God, the same reasoning as verse 17
---
## 🌍 Thy Bondmen, And Thy Bondmaids... Shall Be Of The Heathen That Are Round About You
This draws an uncomfortable but important distinction: permanent, hereditary slavery, unlike the limited debt-service just described, was only permitted involving people from surrounding foreign nations, never among fellow Israelites.
🌍 Permanent slavery was limited to foreign nations only
🚫 Never permitted among fellow Israelites, as just stated
📖 A real historical distinction worth naming honestly
---
## 🌍 A Practice That Existed Across The Ancient World
Slavery was not invented by this law - it existed throughout the ancient Near East already. What this chapter does is restrict who could be permanently enslaved and set firm limits on how anyone under Israel's authority had to be treated, especially fellow Israelites.
🌍 Slavery already existed broadly across the ancient world
📜 This law restricts and regulates rather than invents the practice
🛡️ Firm protections applied especially to fellow Israelites
---
## 👶 Of The Children Of The Strangers That Do Sojourn Among You... They Shall Be Your Possession
This extended the same rule to children born in the land to foreign residents already living there - they too could become part of a permanent household in the same way, unlike a fellow Israelite ever could.
👶 Applied even to children born locally to foreign residents
🏠 Could become permanent household members, unlike Israelites
🔗 Extends the distinction drawn in the verse before it
---
## 📜 Ye Shall Take Them As An Inheritance For Your Children After You... For Ever
Unlike an Israelite's temporary, Jubilee-limited service, this arrangement with foreign slaves could be passed down permanently across generations like any other inherited property.
📜 Could be passed down across generations like property
🚫 No Jubilee reset applied to this category
🔗 The sharpest contrast yet with the Israelite rules above
---
## 🤝 But Over Your Brethren The Children Of Israel, Ye Shall Not Rule One Over Another With Rigour
The section ends by restating the core protection one final time, making sure the contrast just drawn does not get read backwards - fellow Israelites, whatever their circumstances, were never to be treated with cruelty.
🤝 Restates the protection for fellow Israelites one final time
⚠️ Makes sure the earlier contrast is not misread
🔁 Repeats "rigour" from verse 43 to close the loop

# Leviticus 25:47-55
# 🕊️ Redeeming A Brother Sold To A Foreigner
---
## 💰 If A Sojourner Or Stranger Wax Rich By Thee, And Thy Brother... Wax Poor
This flips the usual assumption - here a foreign resident living in Israel has become wealthy, while a native Israelite nearby has fallen into poverty, setting up a scenario the law had not yet directly addressed.
💰 A foreign resident growing wealthy in Israel
📉 An Israelite neighbor falling into poverty
🔄 Reverses the more typical situation assumed elsewhere
---
## 🤝 Sell Himself Unto The Stranger Or Sojourner By Thee
In desperation, an Israelite could end up selling his own labor to that wealthier foreign resident - the exact situation the following verses make sure never becomes permanent slavery.
🤝 An Israelite could sell his labor to a wealthy foreigner
🎯 Sets up the redemption protections in the verses that follow
⚖️ The law refuses to leave this case unaddressed
---
## 🔄 To The Stock Of The Stranger's Family
"Stock" here means lineage or extended family line, so the law covers not just being sold directly to the wealthy foreigner himself, but even to a member of his broader family line.
🔄 "Stock" means family lineage, not inventory
👪 Covers being sold to any relative in that family line
🔗 Closes a possible loophole around the direct-sale wording
---
## 🔓 After That He Is Sold He May Be Redeemed Again; One Of His Brethren May Redeem Him
Even sold to a non-Israelite, the same redemption right from earlier in the chapter still applied - a relative could step in and buy his freedom back at any point, the debt-slavery was never treated as final.
🔓 Redemption rights still applied, even sold to a foreigner
👪 Any relative could step in to buy back his freedom
🔗 Extends the same kinsman-redeemer idea from verse 25
---
## 👨‍👩‍👦 Either His Uncle, Or His Uncle's Son... Or If He Be Able, He May Redeem Himself
This spells out exactly who counted as a valid redeemer - uncles, cousins, or any close relative, plus the man himself if his own fortunes improved enough to buy his own freedom.
👨‍👩‍👦 Names uncles and cousins as valid redeemers
🌳 Also allows any other close relative to step in
💪 Self-redemption remained an option too, as in verse 26
---
## 🧮 He Shall Reckon With Him... According To The Time Of An Hired Servant Shall It Be With Him
The buyback price was calculated the same fair way as everything else in this chapter - based on the years of service remaining, priced like paid labor rather than as a permanent human purchase.
🧮 Price based on years of service remaining, not a flat sum
💼 Calculated like hired labor, never like owned property
🔗 The same prorated-years principle used throughout the chapter
---
## 📈 If There Be Yet Many Years Behind... Give Again The Price Of His Redemption
More years remaining until the Jubilee meant a higher buyback price, refunded from the original purchase amount - mirroring the exact math already used for land redemption in verse 27.
📈 More remaining years meant a higher redemption price
💰 Refunded proportionally from the original sale price
🔗 Mirrors the land-redemption math from verse 27
---
## 📉 If There Remain But Few Years Unto The Year Of Jubile... The Price Of His Redemption
The same formula worked in reverse - close to the Jubilee, the buyback price dropped sharply, since freedom was coming soon anyway regardless of payment.
📉 Fewer remaining years meant a much lower price
⏳ Freedom was close either way as Jubilee approached
⚖️ Kept the pricing consistently fair in both directions
---
## 👀 As A Yearly Hired Servant Shall He Be With Him... Not Rule With Rigour Over Him In Thy Sight
While still under this arrangement, an Israelite had to be treated as ordinary paid labor, not property - and "in thy sight" suggests the wider Israelite community was expected to actually watch for and call out mistreatment.
👀 "In thy sight" implies public accountability, not just private trust
💼 Treated as paid labor throughout, never as owned property
🚫 "Rigour," meaning cruelty, repeats the same ban as verse 43
---
## ⚖️ Not Treated As Foreign Chattel Slavery
This whole passage makes sure an Israelite sold to a foreigner still got Israelite protections, not the harsher permanent-ownership rules just described for foreign slaves in verses 44-46. Nationality determined the rules, not just who currently held the contract.
⚖️ Israelite protections followed the person, not just the buyer
🚫 Kept him out of the harsher category from verses 44-46
🔗 Directly answers a gap the previous section might have left open
---
## 🎉 If He Be Not Redeemed In These Years, Then He Shall Go Out In The Year Of Jubile, Both He, And His Children With Him
Just like the Israelite-to-Israelite arrangement earlier, this had a guaranteed end point even without any buyback ever happening - full freedom at the next Jubilee, for the man and his children both.
🎉 Guaranteed freedom at Jubilee regardless of buyback
👶 Included his children, not just himself
🔗 Mirrors the same guarantee already given in verse 41
---
## 🕊️ Between Redemption And Automatic Jubilee Release
This section builds in two separate paths to freedom - a relative or the man himself could pay to redeem him early, or if neither happened, freedom still arrived automatically at the next Jubilee regardless.
🕊️ Two separate paths to freedom, not just one
💰 Early redemption through payment, if available
🎉 Automatic release at Jubilee either way
---
## 📜 A Law That Reached Beyond Israel's Own Borders Of Authority
This is notable because it applied Israel's own protective law even to a transaction with someone outside Israel's community - the foreign buyer had to respect Israelite redemption rights he did not personally hold to under his own culture's norms.
📜 Applied Israelite protections even in a cross-cultural sale
🌍 Bound a foreign buyer to rules from outside his own culture
🛡️ Protected an Israelite regardless of who purchased him
---
## 🙏 For Unto Me The Children Of Israel Are Servants... I Am The LORD Your God
The chapter's closing line restates its deepest reason one final time - every Israelite ultimately belongs to God alone, rescued from Egypt for that purpose, which is exactly why no human ownership over them could ever be treated as final.
🙏 Restates the chapter's core theological reason one last time
🇪🇬 Rooted again in the Exodus rescue, as in verses 38 and 42
🔒 The reason no human ownership over an Israelite was ever final
`;

export const LEVITICUS_TWENTY_FIVE_PERSONAL_SECTIONS = parseLeviticusTwentyFiveRawNotes(
  LEVITICUS_TWENTY_FIVE_RAW_NOTES,
);
