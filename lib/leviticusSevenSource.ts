export type LeviticusSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusSevenRawNotes(rawText: string): LeviticusSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 7:${startVerse}` : `Leviticus 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Leviticus 7 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_SEVEN_RAW_NOTES = `# Leviticus 7:1-2

# 🩸 One More Law: The Guilt Offering

---

## 📜 Likewise This Is The Law Of The Trespass Offering: It Is Most Holy

The trespass offering (also called the guilt offering) was already explained back in chapter 5:14-6:7 - who brings it and for what wrongs. This new "law" heading shifts to the priest's side: how the priest is supposed to handle it once it reaches the altar, matching the same pattern already used for the burnt, grain, and sin offerings in chapter 6.

"Most holy" repeats the top sacredness ranking already given to the grain offering (6:17) and the sin offering (6:25) - the guilt offering shares that same highest category.

📜 This restarts the trespass offering from chapter 5, now from the priest's side

🔁 Same shift already made for burnt, grain, and sin offerings back in chapter 6

👑 "Most holy" repeats the same top ranking given to those other offerings

---

## 📍 In The Place Where They Kill The Burnt Offering Shall They Kill The Trespass Offering

Chapter 1:11 already established that the burnt offering was killed on the north side of the altar. This verse locks the trespass offering to that same exact spot, rather than describing a new location of its own.

One shared killing place for multiple offering types kept the ritual simple and consistent, and physically tied every sacrifice to the same holy ground.

📍 This reuses the exact killing spot chapter 1:11 set for the burnt offering

🔁 One shared location served several different offering types

🏛️ Every sacrifice was tied to the same specific holy ground

---

## 🩸 The Blood Thereof Shall He Sprinkle Round About Upon The Altar

"Round about" means the blood was splashed on all sides of the altar. This differs from the sin offering, whose blood in chapter 4 was applied to the horns (corners) of the altar. The trespass offering's blood is instead handled like the peace offering's, sprinkled generally "round about" (3:2).

This quietly connects the trespass offering more closely to the burnt and peace offerings than to the sin offering, even though its purpose sounds closer to the sin offering.

🩸 "Round about" means splashed on every side of the altar

🔀 This differs from the sin offering's blood, applied to the altar's horns

🔗 It links the trespass offering's ritual more to burnt/peace offerings

# Leviticus 7:3-5

# 🫀 Which Fat Portions Burn

---

## 🐑 All The Fat Thereof; The Rump

"Rump" refers to the fat tail. Many sheep raised in the ancient Near East were a fat-tailed breed, and the tail itself could grow large and heavy, storing a significant amount of fat - it was considered a genuine delicacy, not a scrap. That whole tail was burned for God rather than kept as food.

🐑 "Rump" means the fat tail of the sheep

⚖️ Fat-tailed sheep in this region could carry a large, heavy tail

🔥 This prized cut was burned for God, not eaten

---

## 🫀 The Fat That Covereth The Inwards

This is the layer of fat wrapped around the stomach and intestines. The exact same portion was already required for the sin offering (4:8) and the peace offering (3:3) - the trespass offering's fat list isn't new, it copies what earlier offerings already required.

🫀 This fat wraps around the stomach and intestines

🔁 Chapters 3 and 4 already required this exact same portion

📋 The trespass offering's fat list simply repeats earlier ones

---

## 🫘 The Two Kidneys, And The Fat That Is On Them, Which Is By The Flanks

In Hebrew thought, the kidneys were often connected with a person's innermost feelings, conscience, or motives - something close to how "heart" is used today. Requiring the kidneys specifically may reflect giving God the innermost, hidden parts of the animal, not merely the outer, visible ones.

🫘 Kidneys were connected to conscience and inner feelings in Hebrew thought

🎯 Their fat may represent giving God the hidden parts, not just the visible ones

🔁 This matches the same kidney requirement from chapters 3 and 4

---

## 🍖 The Caul That Is Above The Liver

The "caul" is a fatty membrane attached to the liver, sometimes translated "the lobe of the liver." This is the fourth and final specific fat portion named, completing a list that has stayed identical across the peace, sin, and now trespass offerings.

🍖 "Caul" here means a fatty membrane attached to the liver

📋 This completes the same four-part fat list used across multiple offerings

🔁 Peace, sin, and trespass offerings all share this identical fat requirement

---

## 🔥 The Priest Shall Burn Them Upon The Altar For An Offering Made By Fire

This closing line repeats a formula used across nearly every offering type in Leviticus so far - the fat portions go entirely into the fire, none of it kept for food, regardless of which offering brought them there.

🔥 This is the same closing fire-offering formula used throughout Leviticus

🚫 None of this fat became food, no matter which offering it came from

📖 The trespass offering's fat handling ends exactly like the others

# Leviticus 7:6-7

# 👨‍⚖️ One Law For Both Guilt And Sin

---

## 👑 Every Male Among The Priests Shall Eat Thereof: It Shall Be Eaten In The Holy Place

This repeats the exact male-only, holy-place-only eating rule already set for the grain offering (6:18) and the ordinary sin offering (6:29). The trespass offering's remaining meat follows the same restriction, not a new one written just for it.

👑 This repeats the male-only rule from 6:18 and 6:29

🏛️ The same "holy place only" location rule applies here too

🔁 No new restriction was invented for the trespass offering specifically

---

## ⚖️ As The Sin Offering Is, So Is The Trespass Offering: There Is One Law For Them

This sentence states directly what the last several verses have already been showing piece by piece: the sin offering and trespass offering aren't separate systems, they run on one identical set of rules. This answers exactly the question a careful reader would already be asking after noticing how similar the two offerings sound.

⚖️ This confirms sin and trespass offerings share one identical rulebook

🤔 It directly answers the "haven't I heard this already" feeling

📖 Repetition across offerings in this book is intentional, not accidental

---

## 🎁 The Priest That Maketh Atonement Therewith Shall Have It

This portion goes personally to whichever priest actually performed that specific atonement ritual - not divided among all the priests in general. Being the one who did the work came with a direct, personal benefit.

🎁 This food goes to the one priest who did the ritual, not all priests generally

🙋 Personal service came with a personal, direct benefit

🔁 This same "officiating priest keeps it" principle appears again later in the chapter

# Leviticus 7:8-10

# 🧥 Skins, Ovens, And Equal Shares

---

## 🧥 The Priest...Shall Have To Himself The Skin Of The Burnt Offering

This is new information not mentioned back in chapter 6:8-13's burnt offering instructions. Even though the meat of a burnt offering was wholly burned with nothing eaten, the hide itself wasn't burned - it went to the officiating priest, likely valuable for leather and other practical use.

🧥 The burnt offering's hide wasn't burned along with the meat

💰 This hide was valuable, useful material like leather

🙋 It went personally to whichever priest performed that offering

---

## 🍞 The Meat Offering That Is Baken In The Oven...Dressed In The Fryingpan, And In The Pan

This lists the same three grain-offering cooking methods chapter 2 already described - oven, flat pan, and fryingpan. Whichever method was used, the cooked result here goes to the officiating priest personally, the same "whoever did the ritual keeps this portion" rule already seen with the trespass offering.

🍞 These are the same three cooking methods chapter 2 already listed

🙋 Cooked grain offerings go to the specific priest who officiated

🔁 This matches the same personal-portion rule used elsewhere in this chapter

---

## 🤲 Every Meat Offering, Mingled With Oil, And Dry, Shall All The Sons Of Aaron Have, One As Much As Another

Uncooked grain offerings - raw flour mixed with oil, or offered dry - work differently than the cooked kind. Instead of going to one officiating priest, they're divided equally among the whole priestly family. "One as much as another" means an equal share regardless of age, seniority, or rank.

🤲 Raw or dry grain offerings are shared, not kept by one priest alone

⚖️ "One as much as another" means genuinely equal shares

👪 Seniority or rank made no difference to this particular division

---

## 🔀 Cooked Belongs To One Priest, Raw Is Shared By All

Stepping back across verses 9-10: whether a grain offering had already been cooked seems to be the deciding factor for how it was divided. Baked or fried offerings went to the one priest who handled that specific ritual, while raw or dry offerings were pooled and split evenly among the whole priestly family.

🔀 Whether it was cooked already decided how it got divided

🙋 Cooked portions rewarded the specific priest who officiated

👪 Raw portions kept the whole priestly family provided for equally

# Leviticus 7:11-15

# 🙏 The Peace Offering: Three Kinds Of Thanks

---

## 📖 This Is The Law Of The Sacrifice Of Peace Offerings

The peace offering itself was first introduced back in chapter 3. This verse begins the priest's-side instructions for it, following the exact same "here's the law of..." pattern already used for the burnt, grain, sin, and trespass offerings.

📖 Peace offerings were first introduced back in chapter 3

🔁 This follows the same "law of..." pattern used for every other offering

👔 These instructions are written for the priest's side of the ritual

---

## 🙏 If He Offer It For A Thanksgiving

This verse introduces the first of three peace offering subtypes covered in this section: a thanksgiving offering. It was brought specifically in response to a particular blessing or answered prayer already received - a spontaneous, occasion-driven expression of gratitude.

🙏 A thanksgiving offering responded to a specific blessing already received

✨ It was spontaneous, tied to one particular occasion

📋 Two more peace offering subtypes follow in the next verses

---

## 🍰 Unleavened Cakes Mingled With Oil

"Cakes" here were a thicker bread, made by mixing oil directly into the flour before baking - similar to the grain offering's basic recipe already described in chapter 2:4. No yeast was used, matching the same leaven ban given for offerings burned on the altar.

🍰 "Cakes" were a thicker bread with oil mixed into the dough

🔁 This matches chapter 2:4's basic grain-offering recipe

🚫 No yeast was used, following the standard leaven ban

---

## 🫓 Unleavened Wafers Anointed With Oil

"Wafers" were a separate, thinner style of flatbread, brushed with oil on the outside after baking rather than mixed in beforehand. Offering multiple bread styles together (cakes and wafers) gave variety within a still-strict, unleavened requirement.

🫓 "Wafers" were thin flatbread, oiled on the outside, not mixed in

🔀 This differs in method from the thicker "cakes" just named

🍞 Multiple bread styles were allowed, all still unleavened

---

## 🍞 Leavened Bread With The Sacrifice Of Thanksgiving

This is a real exception worth noticing: leavened (yeasted) bread shows up here, right alongside the unleavened cakes and wafers. Leaven was never allowed to be burned on the altar (chapter 2:11), so this leavened bread wasn't for the fire - it was extra food for the shared meal that followed the sacrifice.

🍞 Leavened bread appears here, unlike anywhere burned on the altar

🚫🔥 Chapter 2:11 already banned leaven from anything burned in the fire

🍽️ This bread was for the meal, not the altar

---

## ✋ One Out Of The Whole Oblation For An Heave Offering

"Heave offering" describes a portion physically lifted upward as a gesture of dedication before being set aside for the priest. It's a related but distinct action from the "wave offering" mentioned later in the chapter, which moved side to side instead. Both were presentation gestures marking food as reserved for God's servants.

✋ "Heave offering" involved lifting the portion upward as a gesture

🔀 This differs from the "wave offering," a side-to-side motion

🎯 Both gestures marked food as set apart for the priests

---

## 🙋 It Shall Be The Priest's That Sprinkleth The Blood Of The Peace Offerings

Just like the trespass offering and the cooked grain offering earlier in this chapter, this bread portion goes specifically to whichever priest personally performed that day's blood ritual - not shared generally among all the priests.

🙋 This portion goes to the one priest who did the blood ritual

🔁 The same personal-officiant rule already used twice in this chapter

🎁 Performing the ritual came with a direct personal benefit again

---

## 📅 Eaten The Same Day...Shall Not Leave Any Of It Until The Morning

The thanksgiving offering's meat had to be eaten the very same day it was sacrificed, with nothing saved overnight. This tight deadline likely encouraged inviting family, neighbors, and even the poor to share the meal immediately, rather than storing the meat for later.

📅 Thanksgiving offering meat had to be eaten that same day

⏰ Nothing could be saved or stored until morning

🤝 This likely pushed the offerer to share the meal right away

# Leviticus 7:16-18

# ⏳ Vows, Free Gifts, And A Third-Day Deadline

---

## 🤝 If The Sacrifice Of His Offering Be A Vow

A "vow" offering fulfilled a specific promise already made to God - something like "if you do this for me, I will offer this sacrifice." Unlike the thanksgiving offering's spontaneous gratitude, a vow offering paid off an obligation the offerer had already committed to in advance.

🤝 A vow offering fulfilled a promise already made to God

📜 It was an obligation the offerer had committed to in advance

🔀 This differs from thanksgiving's spontaneous, unplanned gratitude

---

## 🎁 Or A Voluntary Offering

A "voluntary" or freewill offering had no prior promise behind it at all - it was given purely out of the offerer's own generosity, with nothing owed and nothing prompting it beyond personal devotion.

🎁 A voluntary offering came with no prior promise attached

💛 It was given purely out of personal generosity

📋 This is the third and final peace offering subtype named in this chapter

---

## 📆 It Shall Be Eaten The Same Day...And On The Morrow Also

Vow and voluntary offerings got an extra day compared to thanksgiving's single-day limit. This may reflect that vow offerings could sometimes involve larger, more expensive animals, needing more time for a full meal to actually be eaten.

📆 Vow/voluntary offerings allowed two days, not just one

🐄 Larger animals may have needed more time to be eaten

🔀 This is a real, practical difference from the thanksgiving offering's rule

---

## 🔥 The Remainder...On The Third Day Shall Be Burnt With Fire

Whatever meat was still left by day three had to be destroyed completely, never quietly saved, eaten late, or given away. There was no allowance for stretching this deadline for convenience.

🔥 Leftover meat on day three was destroyed, not saved

🚫 There was no convenient way around this deadline

⏳ The two-day window was a hard limit, not a suggestion

---

## 🚫 It Shall Not Be Accepted, Neither Shall It Be Imputed Unto Him

Eating this meat on the third day didn't just break a food rule - it retroactively canceled the entire offering, as if it had never been accepted by God at all. The timing violation reached backward and undid the whole sacrifice's purpose.

🚫 Breaking this deadline canceled the entire offering after the fact

⏳ The problem wasn't just late eating, it undid what the sacrifice was for

⚖️ Timing here mattered as much as the sacrifice itself

---

## ⚠️ It Shall Be An Abomination, And The Soul That Eateth Of It Shall Bear His Iniquity

"Abomination" describes something God finds deeply offensive or detestable. "Bear his iniquity" means the guilt for this specific failure lands personally on the person who ate the old meat - not on the priest, and not spread across the community.

⚠️ "Abomination" marks this as something God finds deeply offensive

🙋 "Bear his iniquity" places the guilt on that one person specifically

🔒 This guilt didn't transfer to the priest or the wider community

# Leviticus 7:19-21

# 🚫 Clean Hands, Clean Meat

---

## 🔄 The Flesh That Toucheth Any Unclean Thing Shall Not Be Eaten; It Shall Be Burnt With Fire

Chapter 6:18 and 6:27 already described how touching most-holy food could spread holiness onto whatever touched it. This verse describes the exact opposite direction: touching something unclean spreads uncleanness onto this meat instead, ruining it for food.

🔄 This is a mirror image of the "holiness spreads by touch" rule from chapter 6

🚫 Here, uncleanness spreads onto meat instead of holiness

🔥 Contaminated meat was destroyed by fire, never eaten

---

## ✅ As For The Flesh, All That Be Clean Shall Eat Thereof

Unlike the "most holy" categories earlier in this chapter (limited to male priests only), peace offering meat could be eaten by a much wider circle - the offerer's own family and guests, as chapter 3 already implied - as long as everyone eating was ritually clean at the time.

✅ Peace offering meat could be shared beyond priests alone

👪 The offerer's own family and guests could share in this meal

🧼 Being ritually clean was the requirement, not being a priest

---

## ⚖️ Having His Uncleanness Upon Him, Even That Soul Shall Be Cut Off From His People

"Cut off from his people" (a phrase used repeatedly through Leviticus) describes losing standing within Israel's covenant community entirely - most likely understood as God himself acting against that person, not a punishment carried out by human judges or courts.

⚖️ "Cut off from his people" removes someone from the covenant community

🙏 This is generally understood as God's own action, not a human court's

🔁 This exact phrase repeats several more times across this chapter

---

## 🐍 The Uncleanness Of Man, Or Any Unclean Beast, Or Any Abominable Unclean Thing

This verse names three separate sources of uncleanness at once - a person's own ritual impurity, an unclean animal (categories chapter 11 will define in detail), and anything else generally detestable. Contamination could reach this meat from several completely different directions.

🐍 Three separate sources of uncleanness are named together here

📖 Chapter 11 will define exactly which animals count as unclean

🔀 Ritual impurity could reach this meat from several different directions

# Leviticus 7:22-27

# 🚫 No Fat, No Blood — Ever

---

## 📣 And The LORD Spake Unto Moses, Saying

This divine speech marker signals a real shift in topic. Everything from here through the end of verse 27 moves away from priestly portions specifically and addresses a permanent dietary rule for every Israelite.

📣 This marker signals a genuine topic shift in the chapter

👥 What follows applies to every Israelite, not just priests

📋 Two short laws follow: no eating fat, no eating blood

---

## 🚫 Ye Shall Eat No Manner Of Fat, Of Ox, Or Of Sheep, Or Of Goat

This fat ban applies to everyone in Israel, and specifically to the three animals used in the offering system - ox, sheep, and goat. That fat belonged to God by right, since it was the very portion always reserved for burning on the altar throughout this whole book.

🚫 This ban covers all Israelites, not priests alone

🐂 It specifically targets the three animals used in offerings

🔥 This fat had always been God's reserved, altar-only portion

---

## 🕯️ The Fat Of The Beast That Dieth Of Itself...May Be Used In Any Other Use

Fat from an animal that died of natural causes or was killed by a wild predator - meaning it was never eligible to be offered at all - could still be put to practical, non-food use, like making tallow for lamps or working leather. The ban is specifically about eating it, not about the fat's existence or usefulness.

🕯️ This fat could still be used practically, just not eaten

🐺 It came from animals never eligible to be offered in the first place

🚫 The rule targets eating specifically, not all possible uses

---

## ⛔ Ye Shall In No Wise Eat Of It

"In no wise" is an old English phrase meaning "absolutely not, under no circumstances at all." It's one of the strongest possible negations available in the King James English, leaving no room for exceptions.

⛔ "In no wise" means absolutely not, no exceptions

💪 It's one of the strongest negations the KJV language uses

🚫 No loophole is left open by this wording

---

## ⚖️ Whosoever Eateth The Fat Of The Beast...Shall Be Cut Off From His People

This repeats the same severe covenant penalty already explained in verse 20 - now applied specifically to fat instead of general ritual uncleanness. Fat wasn't a minor dietary preference; breaking this rule carried the same serious consequence as other major covenant violations.

⚖️ This repeats verse 20's same severe covenant penalty

🥩 Here it's applied specifically to eating forbidden fat

📖 Fat violations were treated as seriously as other major offenses

---

## 🩸 Ye Shall Eat No Manner Of Blood, Whether It Be Of Fowl Or Of Beast

This second ban covers blood, and it's even broader than the fat ban - it includes birds, not just the three offering animals named earlier. Blood represented life itself in this worldview, a principle Leviticus will state explicitly later, in chapter 17:11.

🩸 This blood ban is broader than the fat ban, including birds too

📖 Chapter 17:11 later explains why: blood represents life itself

🔀 Two separate bans, fat and blood, sit side by side here

---

## 🏠 In Any Of Your Dwellings

"In any of your dwellings" clarifies this rule applied at home, in everyday life - not only during tabernacle rituals. This made it a permanent dietary law woven into ordinary daily eating, not a rule limited to sacrifice days.

🏠 This rule applied to everyday home life, not just at the tabernacle

📅 It became a permanent part of ordinary daily eating

🔁 Not a ritual-only restriction, but a lasting dietary law

---

## ⚖️ Whatsoever Soul It Be That Eateth Any Manner Of Blood...Cut Off From His People

This is the third time in this short span that "cut off from his people" appears - first for peace-offering uncleanness, then for eating fat, now for eating blood. Repeating this same severe penalty three times underlines just how seriously all three violations were treated.

⚖️ This is the third "cut off" penalty in this short span of verses

🔁 It follows uncleanness (v.20) and forbidden fat (v.25)

📢 Repeating it three times underlines how seriously each one was treated

# Leviticus 7:28-34

# 🍖 The Priest's Fixed Pay: Breast And Shoulder

---

## ✋ His Own Hands Shall Bring The Offerings Of The LORD Made By Fire

The offerer personally carried the fat and breast to the priest, rather than simply handing over a live animal for someone else to process later. This kept the offerer personally involved all the way through the ritual, not just at the beginning.

✋ The offerer personally carried these specific portions forward

🙋 This kept the offerer involved through the whole ritual

🔁 Not just handing over an animal and walking away early

---

## 〰️ That The Breast May Be Waved For A Wave Offering Before The LORD

The "wave offering" (sometimes described as a back-and-forth or side-to-side motion) was a priest's physical presentation gesture, visibly dedicating the breast meat to God before it then became the priest's own food. Motion, not just words, marked this transfer as real.

〰️ "Wave offering" describes a physical side-to-side presentation gesture

👀 This visibly dedicated the meat to God in front of everyone present

🍖 Only afterward did this same meat become the priest's food

---

## 🔥 The Priest Shall Burn The Fat Upon The Altar: But The Breast Shall Be Aaron's And His Sons'

One single animal's parts split two different directions here - the fat went into God's fire, while the breast became food for the entire priestly family. Two separate destinations from one sacrifice.

🔥 The fat portion went entirely into the altar's fire

🍖 The breast instead became food for the priestly family

🔀 One sacrifice, two completely different destinations

---

## 💪 The Right Shoulder...For An Heave Offering

The right shoulder specifically - not the left - is singled out as a second, separate priestly portion beyond the breast. In Hebrew thought, the right side commonly carried associations with strength and honor, which may explain why this particular leg was chosen over the other.

💪 Specifically the right shoulder, not the left, was set aside

👑 The right side often carried honor and strength in Hebrew thought

🍖 This is a second, separate portion beyond the breast just mentioned

---

## 🙋 He...That Offereth The Blood Of The Peace Offerings, And The Fat, Shall Have The Right Shoulder For His Part

Unlike the breast (shared among the whole priestly family), the shoulder goes personally to whichever priest performed that day's blood-and-fat ritual - the same "officiating priest keeps this specific portion" principle already seen twice earlier in this chapter.

🙋 The shoulder goes to the one priest who did that day's ritual

🍖 This differs from the breast, shared among the whole family

🔁 This is the third time this personal-portion principle appears

---

## 👑 The Wave Breast And The Heave Shoulder Have I Taken Of The Children Of Israel

God speaks here in the first person, framing these two specific portions as his own rightful claim on every peace offering Israel brought. Rather than keeping this claim for himself in some other form, he hands both portions over to the priests as their food.

👑 God claims these two portions as rightfully his own

🎁 He then hands both over to the priests as their food

🔄 This turns God's own claim into permanent provision for the priesthood

---

## 📜 By A Statute For Ever...From Among The Children Of Israel

"For ever" matches the same permanent-statute language already used for the grain offering back in chapter 6:18 - meant to continue for every future generation of priests, not something limited to Aaron's own lifetime.

📜 This matches chapter 6:18's identical "for ever" language

🔁 Meant to continue through every future generation of priests

🏛️ Not a temporary rule limited to Aaron's own lifetime

# Leviticus 7:35-38

# 📖 Sinai's Full Sacrifice Code, Closed

---

## 👑 The Portion Of The Anointing Of Aaron, And Of His Sons...In The Day When He Presented Them To Minister

This ties these priestly food portions directly back to Aaron and his sons' ordination day - the ceremony that formally installed them into priestly service, described in full detail later in chapter 8. The food rights described throughout this chapter began on that specific day.

👑 This connects back to the ordination day fully described in chapter 8

📅 The priests' food rights began on that specific installation day

🔗 This chapter's rules and chapter 8's ceremony are directly linked

---

## 💰 Commanded To Be Given Them Of The Children Of Israel...By A Statute For Ever Throughout Their Generations

Israel's own offerings - not a separate treasury or outside source - were the actual means by which the priests were fed and supported. This built a permanent, direct economic relationship between the ordinary people and their priesthood.

💰 The people's own offerings, not a treasury, supported the priests

🤝 This created a direct, ongoing relationship between people and priesthood

📜 "For ever throughout their generations" made this permanent

---

## 📋 This Is The Law Of The Burnt Offering, Of The Meat Offering, And Of The Sin Offering, And Of The Trespass Offering, And Of The Consecrations, And Of The Sacrifice Of The Peace Offerings

This single sentence lists every offering type covered across chapters 1 through 7 - six categories in total. It functions as the formal closing summary of the whole sacrificial law section, right before the book moves into the ordination narrative in chapter 8.

📋 This lists all six offering types covered since chapter 1

📖 It formally closes this whole section of sacrificial law

➡️ Chapter 8's ordination narrative begins right after this

---

## ⛰️ Which The LORD Commanded Moses In Mount Sinai...In The Wilderness Of Sinai

This final line grounds the entire seven-chapter law code in one specific place and moment - Mount Sinai, during Israel's wilderness journey - not a vague, timeless, or symbolic setting.

⛰️ This anchors chapters 1-7 to one specific mountain and moment

🏜️ It happened during Israel's wilderness journey, a real point in time

📍 Nothing about this law code is left vague or symbolic in its setting`;

export const LEVITICUS_SEVEN_PERSONAL_SECTIONS = parseLeviticusSevenRawNotes(LEVITICUS_SEVEN_RAW_NOTES);
