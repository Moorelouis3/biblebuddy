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
## ✨ Ye Shall Be Holy For I The Lord Your God Am Holy

"Holy" means set apart, different, belonging to God in a special way.

This is not one command sitting among many others.

It is the reason behind every law that follows in this chapter.

Israel does not earn holiness by keeping the rules.

God calls them holy first, and obedience follows from that.

Peter quotes this exact line centuries later to teach the same point.

✨ Holy means set apart for God

📜 The reason behind every law here

🙏 Holiness comes before obedience

📖 Peter quotes this verse in the New Testament

## 👪 Ye Shall Fear Every Man His Mother And His Father

This restates the Ten Commandments' rule to honor father and mother, said a new way.

"Fear" here does not mean terror.

It means deep, serious respect.

The mother is named first in this verse, ahead of the father.

That order was unusual for this culture, where fathers usually led the household.

📜 Restates the fifth commandment

❤️ Fear means deep respect here

👩 Mother named first, an unusual order

➡️ Small details in scripture still carry meaning

## 🕊️ And Keep My Sabbaths

The sabbath command sits right next to honoring parents.

That placement ties the two together as the first concrete duties under being holy.

Keeping a weekly day of rest set Israel apart from every neighboring nation.

None of the surrounding cultures had anything close to a weekly rest day.

🕊️ Paired directly with honoring parents

📅 A weekly day of rest

🌍 No neighboring nation had this

📖 Rest itself marked Israel as set apart

## 🚫 Turn Ye Not Unto Idols

The Hebrew word behind "idols" here means "worthless things," or simply "nothings."

That was a deliberately insulting name for the gods worshipped by Israel's neighbors.

Calling them nothings was not just an insult.

It was a claim that these gods had no real power at all.

🔤 Idols means worthless things

😤 A deliberately insulting term

⚡ Claims these gods have no power

📖 Their own name mocks their weakness

## 🛠️ Nor Make To Yourselves Molten Gods

"Molten" means metal that has been melted and poured into a mold.

That is exactly how Aaron made the golden calf back in Exodus thirty two.

Naming this specific method is not random.

It points straight back at Israel's own worst failure.

This law is not aimed at a hypothetical temptation.

🛠️ Molten means melted and poured metal

🐂 The same method used for the golden calf

⚠️ Points back to Exodus thirty two

📖 Aimed at a real failure, not a hypothetical

# Leviticus 19:5-8
# 🍖 Eating The Peace Offering On Time
---
## 🍖 Ye Shall Offer It At Your Own Will

A peace offering was voluntary, not required like the sin offering.

People brought it out of thankfulness, or to complete a vow they had made.

"At your own will" means the offering had to come from a willing heart.

It could never come from pressure or outside obligation.

🍖 A voluntary offering, not required

🙏 Given from thankfulness or a vow

❤️ Had to come from a willing heart

📖 Worship here could not be forced

## 📅 The Same Day Ye Offer It, And On The Morrow

This law repeats a rule already given earlier in Leviticus seven.

The meat from this offering could be eaten the day of the sacrifice, or the next day.

After that, it was off limits.

In a hot climate with no refrigeration, this timeline also kept people from eating spoiled meat.

🔁 Repeats a rule from Leviticus seven

📅 Good for two days only

🌡️ Protected people from spoiled meat

📖 Practical wisdom built into worship

## 🔥 If Ought Remain Until The Third Day, It Shall Be Burnt In The Fire

Leftover meat past the deadline was not thrown out quietly or fed to animals.

It had to be burned completely.

Even the leftovers of an offering to God were treated with real care.

Careless disposal was never an option.

🔥 Leftovers were burned, not discarded

✨ Even leftovers deserved careful treatment

🚫 Casual disposal was never allowed

📖 Care extended to every part of worship

## 🚫 It Is Abominable, It Shall Not Be Accepted

Eating the meat past its deadline did more than risk sickness.

It made the entire original offering void.

It counted as though the sacrifice had never happened at all.

Obedience to the timeline was part of the offering itself, not a separate rule about food.

🚫 Voids the whole original offering

⏰ The timeline was part of the offering

📜 Not a separate food safety rule

📖 Obedience mattered as much as the gift

## ☠️ That Soul Shall Be Cut Off From Among His People

"Bear his iniquity" means the person carries the guilt and its consequences personally.

"Cut off" translates a Hebrew word, karet.

It meant formal removal from the whole covenant community.

Many scholars believe it could also point to an early death understood as coming from God.

⚖️ Bear his iniquity means personal guilt

☠️ Cut off means formal removal

🔁 The same penalty appears elsewhere in Leviticus

📖 Worship carried real weight in Israel

# Leviticus 19:9-12
# 🌾 Leaving Room For The Poor
---
## 🌾 Thou Shalt Not Wholly Reap The Corners Of Thy Field

Harvesters were required to leave the edges of their fields uncut, on purpose.

They could not cut every last stalk of grain for themselves.

This was not charity added on as an afterthought.

It was built directly into how farming itself was supposed to work in Israel.

🌾 Field corners were deliberately left uncut

📜 Built into the harvest process itself

🏡 Applied to every landowner in Israel

📖 Provision was part of the design, not extra

## 🌾 Neither Shalt Thou Gather The Gleanings Of Thy Harvest

"Gleanings" are the stray stalks of grain that fall to the ground during harvest.

Normally a farmer would circle back and gather every one of them.

This law says to leave them where they fall instead.

This exact custom is what lets Ruth survive later in the book of Ruth, gleaning in Boaz's field.

🌾 Gleanings means stray fallen stalks

🚫 Left on the ground on purpose

📖 The exact custom Ruth relies on

➡️ One law, generations later, saves a family

## 🍇 Thou Shalt Not Glean Thy Vineyard, Neither Gather Every Grape

The same principle now moves from grain fields to vineyards.

Grape growers had to leave part of the harvest ungathered too.

Whatever fell to the ground, or stayed on the vine after the main harvest, was meant for someone else.

🍇 Same rule extended to vineyards

🍷 Covers Israel's other major crop

📜 One principle across different kinds of farming

📖 Provision reached every part of the harvest

## 🤲 Thou Shalt Leave Them For The Poor And Stranger

This was not a vague suggestion to be generous.

It named exactly who this leftover food belonged to.

The "stranger" was a foreigner living in Israel with no land or inheritance of their own.

Building this into property law meant provision for the poor did not depend on anyone's mood.

🤲 Names exactly who the harvest belongs to

🌍 Stranger means a foreigner with no land

⚖️ Provision built into law, not left to charity

📖 Generosity here was not optional

## 🚫 Ye Shall Not Steal, Neither Deal Falsely, Neither Lie

These three commands move from specific harvest rules to a general standard.

Basic honesty was required with anyone in the community.

"Deal falsely" covers cheating or broken trust, wider than simple theft alone.

🚫 Moves from harvest law to general honesty

🤝 Deal falsely covers cheating and broken trust

📜 Basic honesty owed to everyone

📖 Integrity was expected in every dealing

## 🙅 Neither Shalt Thou Profane The Name Of Thy God

This restates the third commandment from Exodus twenty.

Swearing falsely by God's name did not just deceive the other person.

It dragged God's own name into the lie.

"Profane" means treating something holy as though it were common or worthless.

📜 Restates the third commandment

🗣️ A false oath drags God into it

🔤 Profane means treating holy things as common

📖 God's name was never meant for lies

# Leviticus 19:13-16
# ⚖️ Protecting The Vulnerable
---
## 💰 Thou Shalt Not Defraud Thy Neighbour, Neither Rob Him

"Defraud" means cheating someone through deception or an unfair advantage.

That is a quieter, sneakier wrong than outright robbery.

Both words appear together on purpose here.

The law covers the obvious crime and the subtle one at the same time.

💰 Defraud means cheating through deception

🤝 Named alongside robbery on purpose

📜 Covers both the obvious and the subtle wrong

📖 Quiet dishonesty is still theft

## 🌙 The Wages Of Him That Is Hired Shall Not Abide With Thee All Night

A day laborer in this culture usually lived hand to mouth.

He depended on that day's pay to buy food for that same evening.

Withholding wages even overnight could mean his family went hungry.

The law requires same day payment, not merely eventual payment.

🌙 Requires same day payment

🍞 Laborers depended on that day's wage

⚖️ Protects the most vulnerable worker

📖 Fair timing mattered as much as fair pay

## 🤫 Thou Shalt Not Curse The Deaf

A deaf person cannot hear themselves being cursed.

This law bans cruelty aimed at someone who could not even detect it.

The wrong is not measured by whether the victim notices.

It is wrong either way.

🤫 Targets cruelty the victim cannot detect

♿ Names a specific disability directly

⚖️ Wrong regardless of whether it is noticed

📖 God holds people accountable even in secret

## 🦯 Nor Put A Stumblingblock Before The Blind

A blind person cannot see an obstacle placed in their path.

Setting one there on purpose is a private cruelty with no witness.

This law pairs with the command about the deaf just before it.

Together they cover people who could not catch the wrongdoer in the act.

🦯 Blind person cannot see the trap

🤐 A cruelty with no witness

🔗 Paired with the law about the deaf

➡️ Both laws protect the defenseless

## ⚖️ Thou Shalt Not Respect The Person Of The Poor, Nor Honor The Person Of The Mighty

This law bans favoritism in court in both directions.

A judge could not go easy on someone simply because they were poor.

A judge could not favor someone simply because they were rich or powerful.

True justice meant judging the facts, not the social status of who stood in front of you.

⚖️ Bans favoritism toward both rich and poor

👥 Justice judges facts, not status

📜 Cuts both directions, not just one

📖 Fairness protects everyone equally

## 🗣️ Thou Shalt Not Go Up And Down As A Talebearer

A "talebearer" is a gossip who spreads rumors around the community.

The picture here is someone moving from person to person, stirring up trouble.

"Going up and down" suggests a habit, not a single slip of the tongue.

🗣️ Talebearer means a spreader of gossip

🚶 Going up and down suggests habit

🚫 Treated as a serious offense, not idle chatter

📖 Words can wound a small community

## 🩸 Neither Shalt Thou Stand Against The Blood Of Thy Neighbour

This means not endangering a neighbor's life through silence or inaction.

If you know about a threat to someone's safety and say nothing, you share the responsibility.

It is paired with the talebearer warning just before it.

Gossip itself could put someone's life at risk in a small, tightly connected community.

🩸 Bans silence about a threat to life

🤐 Silence can make you responsible too

🔗 Paired with the gossip warning above

📖 Love for a neighbor includes their safety

# Leviticus 19:17-18
# ❤️ Love Thy Neighbour As Thyself
---
## 😡 Thou Shalt Not Hate Thy Brother In Thine Heart

This law reaches past actions and into the heart itself.

A person could say and do nothing openly cruel and still break this command.

Silently nursing hatred inside is enough to violate it.

Jesus makes this same move later, tracing murder back to anger in the heart.

❤️‍🩹 Targets hidden hatred, not just actions

🤫 You can break this without a word

📖 Jesus makes the same move with anger

➡️ God sees what stays hidden in the heart

## 🗣️ Thou Shalt In Any Wise Rebuke Thy Neighbour

The alternative to silent hatred is not silence.

It is honest, direct confrontation.

If a neighbor was doing wrong, this law required addressing it to their face.

Quietly "suffering" their sin to continue unchecked was not allowed either.

🗣️ Direct confrontation replaces silent hatred

🚫 Suffer sin means letting wrong continue

⚖️ Silent resentment was never the answer

📖 Honesty was owed even in conflict

## ⚔️ Thou Shalt Not Avenge, Nor Bear Any Grudge

"Avenge" means taking personal revenge rather than trusting God or Israel's courts.

A "grudge" is that same revenge, stretched out slowly over time instead of acted on right away.

Both the instant payback and the slow burning resentment are ruled out here.

⚔️ Avenge means taking revenge yourself

⏳ Grudge means revenge stretched over time

🚫 Both instant and slow revenge forbidden

📖 Trust in God replaces the urge for payback

## ❤️ Thou Shalt Love Thy Neighbour As Thyself

This single line becomes one of the most quoted verses in the whole Bible.

Jesus later names it the second greatest commandment, right after loving God.

Paul says it sums up the entire law in one sentence.

"As thyself" sets the standard, the same fairness you naturally give yourself.

📖 Jesus calls this the second greatest commandment

📜 Paul says it sums up the whole law

❤️ As thyself makes your own care the measure

➡️ One line, quoted across the whole Bible

# Leviticus 19:19-22
# 🧵 Do Not Mix What God Kept Separate
---
## 🐄 Thou Shalt Not Let Thy Cattle Gender With A Diverse Kind

This law bans deliberately crossbreeding two different kinds of animals together.

It sits alongside the seed law and the garment law that follow it.

Together they reflect a wider pattern in Leviticus of keeping God's created categories distinct.

The same reasoning already showed up in chapter eighteen's warning against "confusion."

🐄 Bans deliberately crossbreeding animals

🔀 Part of a pattern of keeping categories distinct

📖 Echoes the confusion language from Leviticus eighteen

➡️ Order itself carried theological weight

## 🌾 Thou Shalt Not Sow Thy Field With Mingled Seed

Farmers could not plant two different types of seed together in the same field.

Like the animal law just before it, this protects the category itself.

The specific crop was never really the point.

🌾 Bans planting two seed types together

🔀 Protects the category, not one crop

📜 Same principle as the animal breeding law

📖 A small rule with a big underlying idea

## 👕 A Garment Mingled Of Linen And Woollen

This specific fabric mix was later called "shatnez" in Jewish tradition.

It banned wearing linen and wool woven together in one garment.

Linen was the fabric used specifically for priestly clothing.

Mixing it with ordinary wool may have blurred a line meant to stay visible.

👕 Bans linen and wool woven together

🏷️ Later named shatnez in Jewish tradition

👔 Linen marked priestly clothing specifically

📖 Even clothing kept sacred lines visible

## 👰 A Woman That Is A Bondmaid, Betrothed To An Husband

This describes a female slave who was engaged to be married.

She had not yet been formally freed or fully redeemed.

That left her in a vulnerable, in between legal status.

The law that follows treats her situation with real seriousness, even inside that unfairness.

👰 Describes an engaged slave, not yet freed

⚖️ A vulnerable, in between legal status

📜 Still treated with real seriousness

➡️ Vulnerable people still received protection under law

## ⚖️ She Shall Be Scourged, They Shall Not Be Put To Death

"Scourged" means a physical whipping punishment.

That replaced the death penalty that normally applied to lying with a betrothed woman.

The text names the exact reason for the lighter penalty.

Her unfree status meant she could not have fully consented to or refused the arrangement.

⚖️ Whipping replaced the usual death penalty

📜 The text explains the reason plainly

🔗 Her lack of freedom changed the ruling

📖 Law weighed her circumstances, not just the act

## 🐏 He Shall Bring His Trespass Offering Unto The Lord

The man involved still owed a trespass offering, a ram brought to the tabernacle.

That was true even though the woman's status changed her own punishment.

His guilt still required atonement.

Her legal status never erased his personal responsibility.

🐏 A ram brought as a trespass offering

⚖️ His guilt required atonement regardless

📜 Her status did not erase his responsibility

📖 Both people answered for what happened

# Leviticus 19:23-25
# 🌳 Fruit Trees And Waiting On God
---
## 🌳 Ye Shall Count The Fruit Thereof As Uncircumcised

This law only applied once Israel had entered and settled the promised land.

It looked forward to a future the people had not yet reached.

"Count as uncircumcised" borrows the same word used for a boy's covenant sign.

Applying that word to fruit was a striking way of saying the fruit was not yet fit for use.

🌳 Applies once Israel is settled and planting

🔤 Borrows covenant sign language for fruit

📜 Marks the fruit as not yet fit

📖 Even farming carried covenant language

## 📅 Three Years Shall It Be As Uncircumcised Unto You

For a tree's first three years of fruit, none of it could be eaten at all.

Later Jewish tradition calls this the "orlah" law.

Young trees also tend to produce weaker fruit anyway.

The command matched good farming sense as well as spiritual discipline.

📅 No fruit eaten for three full years

🏷️ Later known as the orlah law

🌱 Matches how young trees actually fruit

📖 Patience here was practical, not arbitrary

## ✨ In The Fourth Year All The Fruit Thereof Shall Be Holy

The entire fourth year harvest did not go to the farmer at all.

It belonged to God, likely brought to the tabernacle as an offering of thanks.

That function was similar to a firstfruits gift elsewhere in the law.

Only from the fifth year onward could the farmer finally keep the crop.

✨ The whole fourth year harvest belonged to God

🙏 Functioned like a firstfruits offering

📅 One more year of waiting remained

📖 God received the tree's first usable harvest

## 🍇 In The Fifth Year Shall Ye Eat Of The Fruit Thereof

The text explains its own purpose in this verse.

Waiting five years cost the farmer real patience.

That wait was framed as something that would increase the eventual yield.

The law was never presented as an arbitrary sacrifice.

🍇 Farmer finally keeps the crop in year five

📈 The text frames the wait as increasing yield

⏳ Patience was rewarded, not just demanded

📖 God's timing served the farmer's own good

# Leviticus 19:26-29
# 🚫 Practices Borrowed From Israel's Neighbors
---
## 🩸 Ye Shall Not Eat Any Thing With The Blood

This repeats a ban already given earlier in Leviticus seventeen.

It is grouped here with a cluster of other practices tied to pagan worship.

Blood represented life itself in this culture.

It was reserved for God alone through the sacrificial system, never for ordinary eating.

🩸 Repeats the ban from Leviticus seventeen

✨ Blood represented life itself

🙏 Reserved for God, not ordinary meals

📖 Grouped here with other pagan associated practices

## 🔮 Neither Shall Ye Use Enchantment, Nor Observe Times

"Enchantment" refers to divination practiced through omens and signs.

"Observe times" means treating certain days as lucky or unlucky based on superstition.

Both practices were common across Egypt, Canaan, and Mesopotamia.

People there tried to predict or control the future through magic instead of trusting God.

🔮 Enchantment means divination through omens

📅 Observe times means superstition about days

🌍 Common across Egypt, Canaan, and Mesopotamia

📖 Israel trusted God instead of magic

## 💇 Ye Shall Not Round The Corners Of Your Heads

This bans a specific ancient hairstyle, shaving the hair back at the temples in a rounded pattern.

Many scholars believe it was tied to pagan mourning or worship customs nearby.

Israel's appearance itself was meant to visibly set them apart from their neighbors.

💇 Bans a specific rounded temple hairstyle

🌍 Tied to pagan mourning customs nearby

✨ Appearance itself marked Israel as set apart

📖 Even style carried spiritual meaning here

## 🧔 Neither Shalt Thou Mar The Corners Of Thy Beard

This pairs with the hair law just before it.

It bans a specific way of trimming or damaging the edges of the beard.

Many scholars believe it was tied to the same pagan mourning customs.

Together these two laws covered the most visible parts of a man's appearance.

🧔 Bans a specific beard trimming practice

🔗 Paired with the hair law above

👤 Covers the most visible parts of appearance

📖 Grief in Israel was meant to look different

## 🔪 Ye Shall Not Make Any Cuttings In Your Flesh For The Dead

Cutting or gashing your own skin as an act of mourning was a real practice nearby.

It shows up again later, when the prophets of Baal cut themselves in the book of Kings.

Israel's grief was meant to look different from its neighbors', even in the most painful moments.

🔪 A real ancient mourning practice nearby

📖 Echoed later by the prophets of Baal

😢 Even grief was meant to look distinct

➡️ Grief did not require self harm

## ✍️ Nor Print Any Marks Upon You

This bans permanent tattoo like markings on the skin.

Many scholars believe it was also tied to marking devotion to a pagan god.

The chapter's signature line, "I am the LORD," closes this cluster of body related laws.

That same line grounds even rules about appearance in God's own authority.

✍️ Bans permanent tattoo like markings

🌍 Likely tied to devotion to a pagan god

🆔 Closed with the chapter's signature line

📖 Even appearance answered to God

## 😔 Do Not Prostitute Thy Daughter, To Cause Her To Be A Whore

This forbids a father selling or forcing his daughter into prostitution.

That was a real economic temptation for a poor family in the ancient world.

The reasoning given is not only about the daughter's own harm.

It is also about corrupting the whole community around her.

😔 Forbids a father forcing his daughter

💰 A real economic temptation for poor families

🌍 Framed as harming the whole community

📖 One family's sin was never fully private

# Leviticus 19:30-32
# 🙏 Sacred Things And Sacred People
---
## 🕊️ Ye Shall Keep My Sabbaths, And Reverence My Sanctuary

The sabbath command returns here, now paired with reverence for the sanctuary.

The sabbath is sacred time.

The sanctuary, the tabernacle itself, is sacred space.

Both deserved the exact same kind of careful respect.

🕊️ Sabbath is sacred time

⛺ Sanctuary is sacred space

🙏 Both required equal respect

📖 Holiness touched both time and place

## 🔮 Regard Not Them That Have Familiar Spirits

A "familiar spirit" refers to a supposed spirit consulted by a medium.

Such a medium claimed to contact the dead or predict the future.

This law bans more than being one of these people.

It bans seeking them out for guidance at all.

🔮 Familiar spirit claimed contact with the dead

🚫 Bans seeking them out, not only being one

🙏 Looking elsewhere for answers instead of God

📖 Guidance belonged to God alone

## 🧙 Neither Seek After Wizards

"Wizards" here means people who claimed the power to contact spirits or foresee the future.

King Saul later breaks this exact law by seeking out a medium at Endor.

He did that even after banishing mediums from the land himself.

Scripture holds it up as one of Saul's clearest acts of disobedience, right before his death.

🧙 Wizards claimed power over spirits or fate

👑 Saul broke this exact law later

⚠️ Held up as one of his worst failures

📖 Old warnings still mattered generations later

## 👴 Thou Shalt Rise Up Before The Hoary Head

"Hoary head" means gray or white hair.

This law required the physical act of standing when an elderly person entered the room.

Polite words alone were not enough to satisfy it.

Rising to your feet made respect visible and immediate.

👴 Hoary head means gray or white hair

🧍 Required standing, not just words

✨ Made respect visible and immediate

📖 Honor for elders was acted out

# Leviticus 19:33-34
# 🌍 Love The Stranger, You Were Strangers Too
---
## 🌍 If A Stranger Sojourn With Thee In Your Land

A "stranger" here means a foreigner living among Israel long term, not just passing through.

This law protects the person with the least legal standing in the whole society.

He had the fewest built in protections of anyone around him.

🌍 Stranger means a long term foreign resident

⚖️ Protects the least legally protected person

🏡 Had the fewest built in defenses

📖 God's law reached even the most vulnerable

## 🚫 Ye Shall Not Vex Him

"Vex" means to oppress, harass, or take advantage of someone.

This single word closes off a wide range of everyday mistreatment.

Economic pressure, social exclusion, and outright cruelty all fall under it.

🚫 Vex means oppress or take advantage of

📜 Covers a wide range of mistreatment

🤝 Protection was not limited to one specific wrong

📖 Fair treatment extended to outsiders too

## 🤝 As One Born Among You

This sets a remarkably high standard for the ancient world.

A foreign resident was not merely tolerated in Israel.

He was treated legally and socially as though he were a native born Israelite.

Few other ancient cultures extended this kind of standing to outsiders.

🤝 Treated as legally equal to a native

🌟 An unusually high standard for that era

📜 Few neighboring cultures matched this

📖 Belonging did not depend only on birth

## ❤️ Thou Shalt Love Him As Thyself, For Ye Were Strangers In The Land Of Egypt

This reuses the exact "love as thyself" language from verse eighteen.

Now it extends that same command beyond fellow Israelites to foreigners as well.

The command is grounded in Israel's own memory of being outsiders in Egypt.

Their history of being mistreated becomes the reason they must never repeat it.

❤️ Repeats verse eighteen's language, now for foreigners

📖 Grounded in Israel's memory of Egypt

🔁 Their past mistreatment shaped this command

➡️ Memory of suffering was meant to produce mercy

# Leviticus 19:35-37
# ⚖️ Honest Weights And Honest Measures
---
## 📏 In Meteyard, In Weight, Or In Measure

A "meteyard" was a measuring rod used for length, such as measuring cloth.

This verse extends the justice language already used for courts back in verse fifteen.

Cheating a customer with a rigged scale is treated as the very same kind of wrong as an unjust judge.

📏 Meteyard means a measuring rod for length

🏪 Extends court justice into the marketplace

⚖️ Cheating a customer equals corrupt judging

📖 Everyday business answered to the same standard

## ⚖️ Just Balances, Just Weights, A Just Ephah, And A Just Hin

An "ephah" measured dry goods like grain.

A "hin" measured liquids like oil or wine.

Naming both made sure the law covered every kind of everyday transaction.

A dishonest merchant could keep two sets of weights, one for buying and one for selling.

This law closed that loophole completely.

🌾 Ephah measured dry goods like grain

🍶 Hin measured liquids like oil or wine

🚫 Closes the loophole of double weights

📖 Honesty was required in every transaction

## 🇪🇬 Which Brought You Out Of The Land Of Egypt

God's rescue of Israel from slavery in Egypt is given as the reason for honest dealing.

They had once been the ones cheated and exploited by someone stronger.

Because God delivered them from that, they now owed the same fairness to everyone else.

🇪🇬 God's rescue from Egypt is the reason given

🔄 They were once exploited themselves

🤝 Now they owed fairness to others

📖 Redemption shaped how they were meant to trade

## 📜 Therefore Shall Ye Observe All My Statutes

The chapter closes the way it opened, with the same "I am the LORD" signature.

That repetition forms a bookend around this entire wide ranging list of laws.

Honoring parents, honest scales, and loving foreigners all trace back to one single reason.

This is simply what it looked like to belong to this God.

🔁 Closes with the same opening signature

📚 Forms a bookend around the whole chapter

✨ Every law flows from belonging to God

📖 Holiness was meant to touch all of life
`.trim();

export const LEVITICUS_NINETEEN_PERSONAL_SECTIONS = parseLeviticusNineteenRawNotes(LEVITICUS_NINETEEN_RAW_NOTES);
