export type LeviticusNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusNineteenRawNotes(rawText: string): LeviticusNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 19:${startVerse}` : `Leviticus 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Leviticus 19 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_NINETEEN_RAW_NOTES = `# Leviticus 19:1-4
# ✨ Be Holy Like Your God
---
## 🗣️ Speak Unto All The Congregation Of The Children Of Israel
This chapter's laws are spoken to everyone at once, not delivered privately to priests or elders first. That matters because almost every rule that follows is about everyday life - family, farming, business, and neighbors - not just temple worship.
👨‍👩‍👧‍👦 Addressed to the whole nation, not a select group
🌾 Covers ordinary daily life, not just temple ritual
📜 Sets the tone for the whole chapter
---
## ✨ Ye Shall Be Holy: For I The LORD Your God Am Holy
"Holy" means set apart, different, belonging to God in a special way. This line is the reason behind literally every law that follows in this chapter - Israel isn't holy because they earn it by keeping the rules; they keep the rules because God already called them to be his own set-apart people.
This same verse is quoted directly in 1 Peter 1:16 in the New Testament, showing early Christians still treated it as the reason for godly living centuries later.
✨ "Holy" means set apart, belonging to God
📜 The reason given for every law in this chapter
📖 Quoted directly in 1 Peter 1:16
---
## 👪 Ye Shall Fear Every Man His Mother, And His Father
This is the Ten Commandments' "honor thy father and thy mother" (Exodus 20:12), restated here with the word "fear," meaning deep respect, not terror. Unusually for this culture, the mother is named first, ahead of the father - a small detail that pushes back against assuming ancient Israel only valued fathers.
📜 A restatement of the fifth commandment
👩 Mother named first, an unusual order for this culture
❤️ "Fear" here means deep respect, not fright
---
## 🕊️ And Keep My Sabbaths
The sabbath command sits right next to honoring parents, tying the two together as the first two concrete duties under the "be holy" banner. Keeping a weekly day of rest was one of the most visibly distinct things about Israel compared to its neighbors, none of whom had anything like it.
🕊️ Paired directly with honoring parents
📅 A weekly rest day, unlike any neighboring nation's practice
✨ One of the most visible marks of Israel's set-apart identity
---
## 🚫 Turn Ye Not Unto Idols
The Hebrew word behind "idols" here (elilim) literally means "worthless things" or "nothings" - a deliberately insulting term for the gods worshipped by Israel's neighbors. Calling them "nothings" isn't just an insult; it's a theological claim that these gods have no real power at all.
🔤 "Idols" (elilim) literally means "worthless things"
😤 A deliberately insulting term, not neutral language
⚡ Claims these gods have no actual power
---
## 🛠️ Nor Make To Yourselves Molten Gods
"Molten" means melted and poured into a mold - this refers to metal images cast the way Aaron cast the golden calf back in Exodus 32. Naming this specific method points back to Israel's own worst failure, a reminder that this isn't a hypothetical temptation.
🛠️ "Molten" means metal melted and poured into a mold
🐂 The exact method used for the golden calf in Exodus 32
⚠️ Points back to Israel's own history, not just a hypothetical

# Leviticus 19:5-8
# 🍖 Eating The Peace Offering On Time
---
## 🕊️ If Ye Offer A Sacrifice Of Peace Offerings...Ye Shall Offer It At Your Own Will
A peace offering (also called a fellowship offering) was voluntary, not required like the sin offering - it was given out of thankfulness or to fulfill a vow, and part of the meat was eaten in a shared meal by the offerer and his family. "At your own will" means this sacrifice had to come from a genuine, willing heart, not from pressure.
🍖 A voluntary offering, not a required one
🎉 Involved a shared meal eaten by the offerer's family
❤️ Had to come from a willing heart, not obligation
---
## 📅 It Shall Be Eaten The Same Day Ye Offer It, And On The Morrow
This law repeats an identical rule already given back in Leviticus 7:16-18, showing how important it was - the meat could be eaten the day of the sacrifice or the next day, but no longer. In a hot climate without refrigeration, this timeline also protected people from eating spoiled meat.
🔁 Repeats the identical rule from Leviticus 7:16-18
📅 Meat good for the day of sacrifice and the next day only
🌡️ Practical protection against spoiled meat in a hot climate
---
## 🔥 If Ought Remain Until The Third Day, It Shall Be Burnt In The Fire
Leftover meat past the deadline wasn't quietly thrown away or given to animals - it had to be burned completely, treating even the leftovers of something offered to God with special care rather than casual disposal.
🔥 Leftovers burned completely, not discarded casually
✨ Even leftovers of a sacrifice were treated with special care
📜 Same rule repeated for emphasis
---
## 🚫 If It Be Eaten At All On The Third Day, It Is Abominable; It Shall Not Be Accepted
Eating the meat past its deadline didn't just risk food poisoning - it made the entire original sacrifice void, as if it had never been properly offered at all. Obedience to the timeline was treated as part of the offering itself, not a separate food-safety rule.
🚫 Voids the entire original offering, not just a food issue
⏰ Obedience to the deadline is part of the offering itself
📜 "Abominable" (a strong word) shows how serious this was treated
---
## ⚖️ Every One That Eateth It Shall Bear His Iniquity...That Soul Shall Be Cut Off
"Bear his iniquity" means the person carries the guilt and its consequences personally - and "cut off" (karet in Hebrew) is the same severe penalty seen throughout Leviticus, meaning formal removal from the covenant community, and possibly an early death understood as coming from God.
⚖️ "Bear his iniquity" means personally carrying the guilt
☠️ "Cut off" (karet) means formal removal from the community
📖 The same severe penalty used elsewhere across Leviticus

# Leviticus 19:9-12
# 🌾 Leaving Room For The Poor
---
## 🌾 Thou Shalt Not Wholly Reap The Corners Of Thy Field
Harvesters were required to leave the edges of their fields uncut, on purpose, rather than harvesting every last stalk of grain for themselves. This wasn't charity as an afterthought - it was built directly into how farming was supposed to work in Israel.
🌾 Field corners deliberately left uncut
📜 Built into the harvest process itself, not optional charity
🏡 Applied to every landowner in Israel
---
## 🌾 Neither Shalt Thou Gather The Gleanings Of Thy Harvest
"Gleanings" are the stray stalks of grain that fall to the ground during harvesting - normally the kind of thing a farmer would go back for, but this law says to leave them where they fall. This exact custom is what Ruth relies on to survive later in the book of Ruth, gleaning in Boaz's field (Ruth 2:2-3).
🌾 "Gleanings" are stray stalks dropped during harvest
🚫 Left on the ground on purpose, not collected
📖 The exact custom Ruth survives on in Ruth 2
---
## 🍇 Thou Shalt Not Glean Thy Vineyard, Neither Gather Every Grape
The same principle extends from grain fields to vineyards - grape growers had to leave some of the harvest ungathered too. Whatever fell to the ground or remained on the vine after the main harvest was meant for someone else.
🍇 Same rule extended from grain fields to vineyards
🍷 Applied to Israel's other major crop, not just grain
📜 Consistent principle across different kinds of farming
---
## 🤲 Thou Shalt Leave Them For The Poor And Stranger
This wasn't a vague suggestion to be generous - it named exactly who this food belonged to: the poor and the "stranger," meaning a foreigner living in Israel without land or inheritance of their own. Building this directly into property law meant provision for the poor didn't depend on anyone's mood or generosity.
🤲 Names exactly who the leftover harvest belongs to
🌍 "Stranger" means a foreigner with no land of their own
⚖️ Provision for the poor built into law, not left to charity
---
## 🚫 Ye Shall Not Steal, Neither Deal Falsely, Neither Lie One To Another
These three commands move from the specific harvest laws to the general - basic honesty in everyday dealings with anyone in the community. "Deal falsely" covers cheating or breaking trust more broadly than simple theft.
🚫 Moves from specific harvest law to general honesty
🤝 "Deal falsely" covers cheating and broken trust broadly
📜 Basic honesty required with anyone in the community
---
## 🙅 Ye Shall Not Swear By My Name Falsely, Neither Shalt Thou Profane The Name Of Thy God
This is the third commandment (Exodus 20:7) restated - using God's name to back up a lie or a false promise doesn't just harm the person being deceived, it drags God's own name into the deception. "Profane" means to treat something holy as common or worthless.
📜 Restates the third commandment from Exodus 20:7
🗣️ Using God's name to back a lie drags him into it
🔤 "Profane" means treating something holy as common

# Leviticus 19:13-16
# ⚖️ Protecting The Vulnerable
---
## 💰 Thou Shalt Not Defraud Thy Neighbour, Neither Rob Him
"Defraud" means cheating someone through deception or unfair advantage - a quieter, sneakier wrong than outright robbery, which is why both words appear together. The law covers both the obvious crime and the subtle one.
💰 "Defraud" means cheating through deception, not force
🤝 Named alongside robbery to cover both obvious and subtle wrongs
📜 Both forms of theft treated as equally forbidden
---
## 🌙 The Wages Of Him That Is Hired Shall Not Abide With Thee All Night Until The Morning
A day laborer in this culture was typically poor and lived hand-to-mouth, depending on that day's pay to buy food for that same evening. Withholding wages even overnight could mean a family going hungry, so the law requires same-day payment, not just eventual payment.
🌙 Requires same-day payment, not eventual payment
🍞 Day laborers depended on that day's wage for that day's food
⚖️ Protects the most economically vulnerable worker
---
## 🤫 Thou Shalt Not Curse The Deaf, Nor Put A Stumblingblock Before The Blind
A deaf person can't hear themselves being cursed, and a blind person can't see an obstacle placed in their path - this law specifically targets cruelty aimed at people who couldn't even detect or defend against it. The wrong isn't measured by whether the victim notices; it's wrong either way.
🤫 Targets cruelty the victim can't even detect
♿ Names two specific disabilities directly
⚖️ Wrong regardless of whether the victim notices
---
## ⚖️ Ye Shall Do No Unrighteousness In Judgment...Nor Honor The Person Of The Mighty
This law bans favoritism in court in both directions - judges couldn't go easy on someone just because they were poor and sympathetic, and couldn't favor someone just because they were rich or powerful. True justice meant judging the actual facts, not the social status of who stood in front of you.
⚖️ Bans favoritism toward both the poor and the powerful
👥 Justice based on facts, not social status
📜 Cuts both directions, not just protecting the vulnerable
---
## 🗣️ Thou Shalt Not Go Up And Down As A Talebearer Among Thy People
A "talebearer" is a gossip who spreads rumors or private information around the community, moving from person to person stirring up trouble. The picture of someone "going up and down" suggests a habit, not a single slip of the tongue.
🗣️ A "talebearer" spreads gossip and private information
🚶 "Going up and down" suggests habitual behavior
🚫 Named as a serious community offense, not harmless chatter
---
## 🩸 Neither Shalt Thou Stand Against The Blood Of Thy Neighbour
This means not endangering a neighbor's life through silence or inaction - if you know about a threat to someone's safety and say nothing, you share responsibility for what happens. It's paired with the talebearer warning because gossip itself could put someone's life at risk in a small, tightly connected community.
🩸 Bans staying silent about a threat to someone's life
🤐 Silence in the face of danger makes you responsible too
🔗 Paired with gossip because rumors could endanger lives

# Leviticus 19:17-18
# ❤️ Love Thy Neighbour As Thyself
---
## 😡 Thou Shalt Not Hate Thy Brother In Thine Heart
This law reaches past actions into the heart itself - you could technically never say or do anything cruel to someone and still break this command by nursing hatred silently inside. Jesus later does the same move in the Sermon on the Mount, tracing murder back to anger in the heart (Matthew 5:21-22).
❤️‍🩹 Targets hidden hatred, not just visible actions
🤫 You can break this law without ever saying a word
📖 Jesus makes the same move with anger in Matthew 5
---
## 🗣️ Thou Shalt In Any Wise Rebuke Thy Neighbour, And Not Suffer Sin Upon Him
The alternative to silent hatred isn't silence - it's honest, direct confrontation. If a neighbor is doing wrong, this law requires addressing it to their face rather than either exploding in secret resentment or quietly "suffering" (allowing) their sin to continue unchecked.
🗣️ Direct, honest confrontation is the required alternative to hatred
🚫 "Suffer sin upon him" means silently allowing wrong to continue
⚖️ Neither silent resentment nor silent tolerance is acceptable
---
## 🚫 Thou Shalt Not Avenge, Nor Bear Any Grudge Against The Children Of Thy People
"Avenge" means taking personal revenge rather than trusting God or Israel's courts to deal with a wrong, and a "grudge" is revenge stretched out over time instead of acted on immediately. Both the instant payback and the slow-burning resentment are ruled out here.
⚔️ "Avenge" means taking personal revenge yourself
⏳ A "grudge" is revenge stretched out over time
🚫 Both instant payback and slow resentment are forbidden
---
## ❤️ Thou Shalt Love Thy Neighbour As Thyself: I Am The LORD
This single line becomes one of the most quoted verses in the entire Bible - Jesus names it as the second greatest commandment, right after loving God (Matthew 22:39), and Paul says it sums up the entire law (Galatians 5:14, Romans 13:9). "As thyself" sets the standard: the same care and fairness you naturally give yourself is what's owed to everyone else.
📖 Jesus calls this the second greatest commandment
📜 Paul says it sums up the entire law
❤️ "As thyself" sets your own self-care as the standard

# Leviticus 19:19-22
# 🧵 Don't Mix What God Kept Separate
---
## 📜 Ye Shall Keep My Statutes
This short line marks a shift in the chapter - after several verses about relationships and honesty, the topic turns to a different kind of law entirely: rules about mixing categories God apparently intended to stay separate.
📜 Signals a shift to a new category of law
🔀 Introduces rules about mixing and separation
📖 Ties back to the "keep my statutes" language used elsewhere
---
## 🐄 Thou Shalt Not Let Thy Cattle Gender With A Diverse Kind
This bans crossbreeding two different kinds of animals together. Along with the seed and garment rules that follow, this reflects a broader Levitical pattern of keeping God's created categories distinct rather than blending them - similar reasoning shows up in the "confusion" (mixing) language back in chapter 18's ban on bestiality.
🐄 Bans deliberately crossbreeding different animal kinds
🔀 Part of a broader pattern of keeping categories distinct
📖 Echoes the "confusion" language from Leviticus 18
---
## 🌾 Thou Shalt Not Sow Thy Field With Mingled Seed
Farmers couldn't plant two different types of seed together in the same field. Like the animal law just before it, this treats the category itself - not the specific crop - as something worth protecting from being blurred together.
🌾 Bans planting two different seed types in one field
🔀 Protects the category, not any specific crop
📜 Same underlying principle as the animal-breeding law
---
## 👕 Neither Shall A Garment Mingled Of Linen And Woollen Come Upon Thee
This specific fabric mix (later called "shatnez" in Jewish tradition) bans wearing linen and wool woven together in the same garment. One possible reason: linen was the fabric specifically used for priestly garments, so mixing it with ordinary wool may have blurred a line meant to stay visible between priestly and everyday clothing.
👕 Bans wearing linen and wool woven together
🏷️ Later named "shatnez" in Jewish tradition
👔 Linen was priestly fabric - the mix may have blurred that line
---
## 👰 Whosoever Lieth Carnally With A Woman, That Is A Bondmaid, Betrothed To An Husband
This describes a female slave who was engaged to be married but hadn't yet been formally freed or fully redeemed - a vulnerable legal in-between status. The law that follows treats this situation with real seriousness, but with a different penalty than free adultery because of her unfree status.
👰 Describes an engaged slave, not yet formally freed
⚖️ A vulnerable, in-between legal status
📜 Treated seriously but with a different penalty than free adultery
---
## ⚖️ She Shall Be Scourged; They Shall Not Be Put To Death, Because She Was Not Free
"Scourged" means a physical whipping punishment, given here instead of the death penalty that normally applied to adultery with a betrothed woman (Deuteronomy 22:23-24). The text explicitly gives the reason: her unfree status changed the legal weight of the situation, since she couldn't have fully consented to or refused the betrothal in the first place.
⚖️ Whipping instead of the usual death penalty for this offense
📜 The text names the reason: her lack of freedom
🔗 Contrasts with Deuteronomy 22:23-24's rule for a free woman
---
## 🐏 He Shall Bring His Trespass Offering...The Priest Shall Make An Atonement For Him
The man involved still owed a trespass (guilt) offering - a ram brought to the tabernacle - even though the woman's unfree status changed her punishment. His sin still required atonement; her legal status didn't erase his responsibility.
🐏 A ram brought as a trespass offering
⚖️ His guilt required atonement regardless of her status
📜 Her legal status doesn't erase his responsibility

# Leviticus 19:23-25
# 🌳 Fruit Trees And The Orlah Law
---
## 🌳 When Ye Shall Come Into The Land...Then Ye Shall Count The Fruit Thereof As Uncircumcised
This law only applies once Israel enters and plants trees in the promised land - it's forward-looking, not for the wilderness years. "Count as uncircumcised" is a striking image: applying the same word used for a boy's covenant sign (Genesis 17:11) to fruit, treating the tree's first fruit as not yet fit for use.
🌳 Applies once Israel is settled and planting in the land
🔤 "Uncircumcised" fruit borrows covenant-sign language
📜 The tree's earliest fruit is treated as not yet fit for use
---
## 📅 Three Years Shall It Be As Uncircumcised Unto You: It Shall Not Be Eaten Of
For the tree's first three years of fruit, none of it could be eaten at all - later Jewish tradition calls this the "orlah" law. Practically, this also matched good farming sense: young trees often produce weaker, less useful fruit anyway, so the fruit was left instead of harvested early.
📅 No fruit eaten for three full years after planting
🏷️ Later known as the "orlah" (uncircumcised) law
🌱 Matches the practical reality that young trees fruit poorly
---
## ✨ In The Fourth Year All The Fruit Thereof Shall Be Holy To Praise The LORD Withal
The fourth year's entire harvest wasn't kept by the farmer at all - it belonged to God, likely brought to the tabernacle as an offering of praise and thanksgiving, similar to a firstfruits gift. Only from the fifth year onward could the farmer actually keep and eat the crop for their own use.
✨ The entire fourth-year harvest belonged to God
🙏 Functioned like a firstfruits offering of thanks
📅 Farmers had to wait until year five to keep their own crop
---
## 🍇 In The Fifth Year Shall Ye Eat Of The Fruit Thereof, That It May Yield Unto You The Increase
The text explains its own purpose here: waiting these five years, though it cost the farmer years of patience, was meant to actually increase the yield they'd eventually enjoy. The law isn't presented as an arbitrary sacrifice - it's framed as good for the farmer in the long run.
🍇 Farmer finally keeps the crop starting in year five
📈 The text frames the wait as increasing future yield
⏳ Patience is rewarded, not just demanded

# Leviticus 19:26-29
# 🚫 Pagan Practices To Avoid
---
## 🩸 Ye Shall Not Eat Any Thing With The Blood
This repeats the blood-eating ban already given in Leviticus 17, grouped here with a cluster of other practices associated with pagan worship. Blood represented life itself in this culture, reserved for God alone through the sacrificial system, not for ordinary eating.
🩸 Repeats the blood-eating ban from Leviticus 17
✨ Blood represented life, reserved for God alone
🔗 Grouped here with other pagan-associated practices
---
## 🔮 Neither Shall Ye Use Enchantment, Nor Observe Times
"Enchantment" here refers to divination practiced through omens, and "observe times" means treating certain days or moments as lucky or unlucky based on superstition. Both practices were common across Egypt, Canaan, and Mesopotamia, where people tried to predict the future or control fate through magic rather than trusting God.
🔮 "Enchantment" means divination through omens
📅 "Observe times" means superstition about lucky/unlucky days
🌍 Common practices across Egypt, Canaan, and Mesopotamia
---
## 💇 Ye Shall Not Round The Corners Of Your Heads
This bans a specific ancient hairstyle - shaving the hair back at the temples in a rounded pattern - that was reportedly associated with pagan mourning or worship rituals in surrounding cultures. Israel's appearance itself was meant to visibly set them apart from their neighbors.
💇 Bans a specific rounded temple-shaving hairstyle
🌍 Associated with pagan mourning or worship customs nearby
✨ Even physical appearance marked Israel as set apart
---
## 🧔 Neither Shalt Thou Mar The Corners Of Thy Beard
Paired with the hair law, this bans a specific way of trimming or damaging the edges of the beard, likely tied to the same pagan mourning customs. Together, these two rules cover the most visible parts of a man's appearance in this culture.
🧔 Bans a specific beard-trimming practice
🔗 Paired with the hair law, likely the same pagan custom
👤 Covers the most visible parts of appearance in this culture
---
## 🔪 Ye Shall Not Make Any Cuttings In Your Flesh For The Dead
Cutting or gashing your own skin as an act of mourning was a real practice in the ancient Near East, later echoed by the prophets of Baal cutting themselves in 1 Kings 18:28. Israel's grief was meant to look different from its neighbors', even at the most painful, emotional moments of loss.
🔪 Self-cutting was a real ancient Near Eastern mourning practice
📖 Echoed later by Baal's prophets in 1 Kings 18:28
😢 Even grief was meant to look distinctly different in Israel
---
## ✍️ Nor Print Any Marks Upon You: I Am The LORD
This bans permanent tattoo-like markings on the skin, likely also tied to marking devotion to a pagan god or to mourning rituals. The chapter's signature line, "I am the LORD," closes this cluster of body-related laws the same way it closes so many others - grounding even rules about appearance in God's own authority.
✍️ Bans permanent tattoo-like skin markings
🌍 Likely tied to marking devotion to a pagan god
🆔 Closed with the chapter's signature "I am the LORD"
---
## 😔 Do Not Prostitute Thy Daughter, To Cause Her To Be A Whore
This forbids a father selling or forcing his daughter into prostitution, a real economic temptation in the ancient world for a poor family. The reasoning given isn't only about the daughter's harm - it's also about corrupting the whole community.
😔 Forbids a father forcing his daughter into prostitution
💰 A real economic temptation for poor families in that world
🌍 Framed as harming the whole community, not just her
---
## 🌍 Lest The Land Fall To Whoredom, And The Land Become Full Of Wickedness
This echoes the exact same land-defilement language used throughout chapter 18 - one family's sin is described as something that can spread and corrupt the entire land, not stay contained to just the people directly involved.
🌍 Echoes chapter 18's land-defilement language
🔗 One family's sin is treated as capable of spreading
📜 Consistent with this book's pattern of communal consequence

# Leviticus 19:30-32
# 🙏 Sacred Things, Sacred People
---
## 🕊️ Ye Shall Keep My Sabbaths, And Reverence My Sanctuary
The sabbath command returns here, now paired with reverence for the sanctuary (the tabernacle) - one is sacred time, the other is sacred space. Both deserved the same kind of careful respect.
🕊️ Sabbath (sacred time) paired with the sanctuary (sacred space)
⛺ "Sanctuary" refers to the tabernacle itself
🙏 Both required the same kind of careful respect
---
## 🔮 Regard Not Them That Have Familiar Spirits, Neither Seek After Wizards
A "familiar spirit" refers to a supposed spirit consulted by a medium claiming to contact the dead or predict the future, and "wizards" means those who claimed this power. This isn't just a ban on being one of these people - it's a ban on going to consult them, since even seeking out that kind of guidance meant looking somewhere other than God for answers.
🔮 A "familiar spirit" claimed contact with the dead or future
🚫 Bans seeking them out, not just being one
🙏 Looking elsewhere for guidance instead of trusting God
---
## 📖 A Warning Israel's Own King Would Later Break
Later, king Saul breaks this exact law by seeking out a medium at Endor to contact the dead prophet Samuel (1 Samuel 28:7-8), even after Saul himself had banished mediums from the land. It's held up in Scripture as one of Saul's clearest acts of disobedience, right before his death.
📖 Saul breaks this exact law in 1 Samuel 28
👑 Even after banishing mediums himself
⚠️ Held up as one of his clearest acts of disobedience
---
## 👴 Thou Shalt Rise Up Before The Hoary Head, And Honour The Face Of The Old Man
"Hoary head" means gray or white hair - this law requires the physical act of standing up when an elderly person is present, not just polite words. Rising to your feet made respect visible and immediate rather than just a private attitude.
👴 "Hoary head" means gray or white hair
🧍 Requires the physical act of standing, not just words
✨ Made respect visible and immediate, not just internal

# Leviticus 19:33-34
# 🌍 Love The Stranger, You Were Strangers Too
---
## 🌍 If A Stranger Sojourn With Thee In Your Land, Ye Shall Not Vex Him
A "stranger" here means a foreigner living among Israel long-term, not just passing through - "vex" means to oppress, harass, or take advantage of. This law protects someone with the least legal standing and the fewest built-in protections in the society.
🌍 A "stranger" is a foreigner living among Israel long-term
🚫 "Vex" means oppress, harass, or take advantage of
⚖️ Protects the person with the least legal standing
---
## 🤝 The Stranger...Shall Be Unto You As One Born Among You
This sets a remarkably high standard for the ancient world - a foreign resident wasn't just tolerated, but treated legally and socially as if they were a native-born Israelite. Few other ancient cultures extended this kind of equal standing to outsiders.
🤝 Treated as legally equal to a native-born Israelite
🌟 An unusually high standard for the ancient world
📜 Few neighboring cultures offered outsiders this standing
---
## ❤️ Thou Shalt Love Him As Thyself; For Ye Were Strangers In The Land Of Egypt
This reuses the exact "love...as thyself" language from verse 18, extending it beyond fellow Israelites to foreigners too - and grounds the command in Israel's own memory of being outsiders and slaves in Egypt. Their own history of being mistreated foreigners becomes the reason they must never mistreat the foreigners living among them.
❤️ Repeats verse 18's "love as thyself" language, now for foreigners
📖 Grounded in Israel's own memory of being strangers in Egypt
🔄 Their past mistreatment becomes the reason not to repeat it

# Leviticus 19:35-37
# ⚖️ Honest Weights, Honest Measures
---
## ⚖️ Ye Shall Do No Unrighteousness In Judgment, In Meteyard, In Weight, Or In Measure
A "meteyard" is a measuring rod used for length, like measuring cloth. This expands the justice language used earlier for courts (verse 15) into the marketplace - cheating a customer with a rigged scale is treated as the same kind of "unrighteousness" as an unjust judge.
📏 A "meteyard" is a measuring rod, like for cloth
🏪 Extends court-justice language into marketplace honesty
⚖️ Cheating customers equated with corrupt judging
---
## ⚖️ Just Balances, Just Weights, A Just Ephah, And A Just Hin
An "ephah" measured dry goods like grain, and a "hin" measured liquids like oil or wine - naming both makes sure the law covers every kind of everyday transaction, not just one type of goods. A dishonest merchant could easily rig scales or use two sets of weights, one for buying and one for selling - this law closes both loopholes at once.
🌾 "Ephah" measured dry goods like grain
🍶 "Hin" measured liquids like oil or wine
🚫 Closes the loophole of using rigged or double weights
---
## 🇪🇬 I Am The LORD Your God, Which Brought You Out Of The Land Of Egypt
God's rescue of Israel from Egyptian slavery is given as the reason for honest business dealings - since God delivered them from being cheated and exploited themselves, they now owe the same fairness to everyone they deal with.
🇪🇬 God's rescue from Egypt is the reason given
🔄 They were once exploited, so they must not exploit others
📜 Ties ethical dealing directly to their own redemption story
---
## 📜 Therefore Shall Ye Observe All My Statutes, And All My Judgments, And Do Them: I Am The LORD
The chapter closes the way it opened, with the same "I am the LORD" signature, forming a bookend around this entire wide-ranging list. Everything from honoring parents to honest scales to loving foreigners is tied together under one single reason: this is what it looks like to belong to this God.
🔁 Closes with the same "I am the LORD" line that opened it
📚 Forms a bookend around this entire wide-ranging chapter
✨ Every law here flows from belonging to God, not separate rules
`;

export const LEVITICUS_NINETEEN_PERSONAL_SECTIONS = parseLeviticusNineteenRawNotes(LEVITICUS_NINETEEN_RAW_NOTES);
