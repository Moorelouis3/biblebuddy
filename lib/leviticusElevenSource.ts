export type LeviticusElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusElevenRawNotes(rawText: string): LeviticusElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 11:${startVerse}` : `Leviticus 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Leviticus 11 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_ELEVEN_RAW_NOTES = `# Leviticus 11:1-3

# 🐄 The Test For Land Animals

---

## 🗣️ The LORD Spake Unto Moses And To Aaron

Most laws so far in Leviticus came to Moses alone, who then passed them on to Aaron. This chapter is addressed to both of them together from the start.

That fits right after chapter 10:10-11, where God had just told Aaron directly that priests must "put difference between holy and unholy, and between unclean and clean," and must teach Israel every statute. This chapter is the first big block of that exact teaching material.

🗣️ Addressed to both leaders together, not Moses alone

📖 Follows right after Aaron's teaching duty was defined in chapter 10

🍽️ This chapter is the "difference between clean and unclean" put into practice

---

## 🍽️ These Are The Beasts Which Ye Shall Eat

The chapter opens by stating what's allowed, not what's banned. Before any forbidden animal gets named, Israel first hears the positive rule that will let them recognize every exception around it.

🍽️ The permitted rule comes first, exceptions come after

📖 A pattern that repeats through the whole chapter

🇮🇱 Addressed to "the children of Israel" specifically, not all nations

---

## 🐾 Parteth The Hoof, And Is Clovenfooted

"Parteth the hoof" and "clovenfooted" describe the same thing two ways: a foot split into two separate toes, like a cow, sheep, goat, or deer has. Animals with a single solid hoof, like a horse or donkey, don't qualify.

🐾 A hoof split into two distinct toes

🐴 Solid, single hooves (horses, donkeys) don't count

📖 The first of two required traits

---

## 🌾 Cheweth The Cud

"Chewing the cud" means the animal is a ruminant: it swallows food into a special stomach, then brings it back up later to chew again before fully digesting it. Cows and sheep do this constantly, which is why they always look like they're chewing something.

Both traits, cloven hoof and cud-chewing, had to be true at once. One alone was never enough, which is exactly what the next section's exceptions are built to prove.

🌾 Re-chewing already-swallowed food from a special stomach

🐄 Easy to picture: a cow's constant slow chewing

⚖️ Both traits were required together, not just one

---

## 🌍 Among All The Beasts That Are On The Earth

This phrase marks out the scope of this first test: land animals specifically. The chapter is organized by habitat, and it moves next through water creatures, then flying creatures, before circling back to ground-level creeping things — this opening line sets the first of those categories.

🌍 Marks this test as covering land animals specifically

📖 The chapter is organized by where a creature lives

🗺️ Water and flying creatures each get their own separate rule ahead

# Leviticus 11:4-8

# 🐫 Four Named Exceptions

---

## 🐫 The Camel, Because He Cheweth The Cud, But Divideth Not The Hoof

Camels do chew the cud, but their feet don't split into a true hoof at all. A camel's foot is a broad, padded toe built for walking on sand, closer to a large paw than a hoof.

Camels were valuable, useful animals across the ancient Near East, used for trade, travel, and carrying heavy loads. This law didn't ban them because they were worthless or strange to Israel's neighbors; it banned them despite how common and useful they were.

🐫 Chews the cud, but its foot isn't a true split hoof

🏜️ A broad, padded foot built for desert sand

💰 Valuable and common elsewhere, banned anyway

---

## 🪨 The Coney

A "coney" is the hyrax, a small, rabbit-sized animal that lives in rocky cliffs and crevices across the Middle East (see Psalm 104:18, "the rocks for the conies"). Its jaw moves constantly in a way that looks like cud-chewing, but a hyrax isn't a true ruminant with a multi-chambered stomach like a cow.

🪨 A small rock-dwelling animal, not a rabbit despite the old name

👄 Its jaw movement only looks like true cud-chewing

📖 Fails the test on a technicality of appearance, not diet

---

## 🐇 The Hare

The hare (a wild relative of the rabbit) has the same problem as the coney: its digestive habits can look like cud-chewing from the outside, but it isn't a true ruminant either. Both animals fail the same half of the two-part test.

🐇 Looks like it chews cud, but isn't a true ruminant

🪨 Grouped with the coney for the exact same reason

📖 Neither one splits a true hoof either

---

## 🐷 The Swine, Though He Divide The Hoof, And Be Clovenfooted, Yet He Cheweth Not The Cud

The pig fails the opposite half of the test from the camel, coney, and hare. Its foot genuinely does split into a true cloven hoof, but it doesn't chew the cud at all.

Pigs were raised and eaten widely elsewhere in the ancient world. This one exception became one of the clearest, most visible markers separating Israelite identity from the surrounding nations, referenced again centuries later in Isaiah 65:4 and 66:17.

🐷 Passes the hoof test, fails the cud test completely

🌍 Common food elsewhere, uniquely marked as off-limits for Israel

📖 Became one of the most visible identity markers in later history

---

## 🚫 Of Their Flesh Shall Ye Not Eat, And Their Carcase Shall Ye Not Touch

This is a two-part ban, not one rule. Eating the meat was forbidden, and separately, even touching a dead one made a person unclean. The second rule is stricter than it sounds: it meant Israelites had to be careful around these animals' bodies even outside of any meal.

🚫 Two separate bans: don't eat it, don't touch its body

⚖️ Touching alone carried its own consequence

📏 The rule reached further than just what ended up on a plate

---

## 🔄 The Pattern Behind The Four

Look at the four named animals together and a symmetrical logic appears. The camel, coney, and hare all fail the same half of the test — they don't have a true split hoof, even though their jaw movement looks like cud-chewing. The swine fails the opposite half — a real cloven hoof, but no cud-chewing at all.

Between the two failure types, every possible loophole in the two-part test gets closed. No animal could sneak through by satisfying just one requirement.

🔄 Three animals fail the hoof half, one fails the cud half

🔒 Together, they close every possible loophole in the test

📖 A deliberately complete, symmetrical set of examples

# Leviticus 11:9-12

# 🐟 Water Creatures

---

## 🐟 Whatsoever Hath Fins And Scales In The Waters

The rule for anything living in water is its own two-part test: it needs both fins and scales. Most familiar fish, like the kind caught in the Sea of Galilee in the Gospels, pass this test easily.

🐟 Both fins and scales required, not just one

🎣 Ordinary fish (like those in the Gospels' fishing stories) pass easily

📖 A parallel two-trait test to the land-animal rule just given

---

## 🌊 In The Waters, In The Seas, And In The Rivers

This phrase makes sure the rule covers every kind of water an Israelite might actually fish or gather from — open sea, flowing rivers, and any other body of water in between. There's no exception carved out by habitat; the same fins-and-scales test applied everywhere.

🌊 Covers salt water and fresh water alike

🎣 No habitat-based exception anywhere in the rule

📖 One single test applied to every water source

---

## 🦐 All That Have Not Fins And Scales... An Abomination Unto You

This single rule quietly excludes a wide category familiar today: shellfish and crustaceans like shrimp, crab, lobster, clams, and oysters, along with catfish and eels, none of which have true scales. "Abomination" (Hebrew sheqets) is a stronger word than plain "unclean" — it means something actively detestable, not just ceremonially off-limits.

🦐 Excludes shellfish, crustaceans, catfish, and eels

📖 "Abomination" is stronger language than ordinary "unclean"

🔁 The same warning is repeated three times in verses 10-12

---

## 🔁 They Shall Be Even An Abomination Unto You

The chapter restates this exact ban three times in a row (verses 10, 11, and 12). Deliberate repetition like this in Hebrew writing was a way of adding emphasis, making sure this particular rule couldn't be read as a minor detail.

🔁 Stated three times back to back on purpose

📢 Repetition in Hebrew style signals real emphasis

🐟 Meant to leave no ambiguity about water creatures

# Leviticus 11:13-19

# 🦅 Unclean Birds

---

## 🦅 The Eagle, And The Ossifrage, And The Ospray

These first three named birds are large birds of prey. "Ossifrage" literally means "bone-breaker," likely describing a vulture-type bird known for dropping bones from a height to crack them open and eat the marrow inside.

🦅 Large raptors, hunters and scavengers by nature

🦴 "Ossifrage" means "bone-breaker" in the original word

📖 Some exact species behind these old names are genuinely uncertain today

---

## 🐦‍⬛ The Vulture, And The Kite... The Owl, And The Night Hawk... After His Kind

"After his kind" is the same phrase used for the animal categories in Genesis 1 — it means the whole broader family of that bird, not one single exact species. Nearly every bird named across this list eats carrion, hunts other animals, or scavenges dead flesh in some way.

🐦‍⬛ "After his kind" means the whole family, not one species

🍖 Almost every bird here eats meat, carrion, or prey

📖 The same creation-language phrase as Genesis 1

---

## 🐦‍⬛ Every Raven After His Kind

The raven gets its own single verse. Centuries later, in 1 Kings 17:4-6, God specifically sends ravens to feed the prophet Elijah bread and meat in the wilderness.

That detail matters: a bird ceremonially unclean for Israel to eat was still something God could freely use for good. Ceremonial uncleanness was never the same category as moral evil.

🐦‍⬛ Named on its own, without other birds grouped alongside it

🍞 Later used by God to feed Elijah in 1 Kings 17

⚖️ Ceremonially unclean is not the same as morally bad

---

## 🦉 The Owl, And The Night Hawk, And The Cuckow, And The Hawk After His Kind

This group leans toward night-hunting and fast-hunting birds. Several of these old English names (like "cuckow") are debated among scholars today, since the underlying Hebrew word's exact species has been lost over time.

🦉 A cluster of night hunters and fast predators

🌙 Nighttime hunting habits set this group apart

📖 A few exact identifications here remain genuinely uncertain

---

## 🐦 The Little Owl, And The Cormorant, And The Great Owl

The cormorant is a diving bird that catches fish underwater, while the two owls named here continue the nighttime-predator theme from the verse before. All three still fit the chapter's larger pattern: hunters, not grazers.

🐦 The cormorant dives underwater to catch fish

🦉 Two more owls extend the nighttime-hunter pattern

📖 Every bird named so far is a hunter of some kind

---

## 🦢 The Swan, And The Pelican, And The Gier Eagle

The "gier eagle" is likely the Egyptian vulture, another scavenger bird. A few of these English bird names (including "swan" here) are among the most debated translations in the whole list, since the original Hebrew words are rare and their exact meaning isn't fully settled even among scholars today.

🦢 "Gier eagle" likely means the Egyptian vulture, a scavenger

📖 Some names here are honestly uncertain, even to scholars

🍖 The scavenger pattern from earlier in the list continues

---

## 🐦 The Stork, The Heron After Her Kind, And The Lapwing

The Hebrew word for stork is closely related to the word for kindness or loyalty (chesed), likely because storks were known for caring closely for their young. The "lapwing" may actually refer to the hoopoe, a bird known for its unusual crown-like crest.

🐦 The Hebrew word for "stork" is related to the word for kindness

👑 "Lapwing" may mean the crested hoopoe bird

📖 The last named bird before the list closes with one more creature

---

## 🦇 And The Bat

The bat closes the list even though it's a mammal, not a bird at all. Ancient categories here grouped creatures by how they moved (flying) rather than by modern biological classification — a genuinely different, but not inaccurate, way of sorting the world.

🦇 A mammal, grouped here purely because it flies

📖 An ancient sorting system based on movement, not modern biology

🎯 The last entry on the whole unclean-bird list

# Leviticus 11:20-23

# 🦗 The Locust Exception

---

## 🐛 All Fowls That Creep, Going Upon All Four

This describes small flying, crawling creatures — what would today be called insects. Ancient Hebrew didn't have a separate scientific word for "insect," so these creatures were grouped loosely with birds, since both categories fly.

🐛 The ancient way of naming what we'd call insects today

🪰 Grouped with birds because both categories can fly

📖 "All four" reflects an ancient, not modern-scientific, way of describing legs

---

## 🦗 Which Have Legs Above Their Feet, To Leap Withal Upon The Earth

This phrase describes a jointed, spring-like hind leg built for jumping — exactly what locusts, crickets, and grasshoppers have. That single feature is what separates the exception in the next verse from every other flying, crawling creature just banned.

🦗 Describes powerful, spring-like jumping legs

📏 The one clear feature that creates an exception

🔑 This detail is the key that unlocks verse 22's allowed list

---

## 🍯 The Locust... The Bald Locust... The Beetle... The Grasshopper After His Kind

These four are the only insects Israel could eat, all sharing the jumping-leg feature just described. This detail later matters directly in the New Testament: John the Baptist's wilderness diet of "locusts and wild honey" (Matthew 3:4) was fully within this very law, not some extreme or strange exception to it.

🍯 The only insects permitted, all true jumpers

📖 John the Baptist's locust diet followed this exact rule

🎯 A specific, narrow exception, not a loophole

---

## 🦗 A Familiar Creature In A New Light

Locusts already appear earlier in the Exodus story, in chapter 10's eighth plague, where massive swarms devastated Egypt's crops as a form of judgment. Here, the very same creature shows up again in a completely different role: an approved, even ordinary, food source for Israel.

🦗 The same creature as Exodus 10's locust plague

⚖️ There, a tool of judgment; here, permitted food

📖 Context, not the creature itself, changed the meaning

---

## 🚫 But All Other Flying Creeping Things... Shall Be An Abomination Unto You

The chapter closes this section by restating the default: apart from the four named jumping insects, every other small flying, crawling creature remained forbidden. The exception was narrow on purpose.

🚫 The general ban is restated right after the exception

🎯 Only the jumping-leg insects were ever allowed

📖 A deliberately narrow carve-out, not an open category

# Leviticus 11:24-28

# 🕐 Uncleanness Until Evening

---

## 🕐 Whosoever Toucheth The Carcase Of Them Shall Be Unclean Until The Even

"The even" means sunset. In the Hebrew calendar, going back to Genesis 1's "the evening and the morning were the first day," a new day begins at nightfall, so this uncleanness lasted roughly until the start of the next calendar day.

🕐 "The even" means sunset, the start of a new Hebrew day

📖 Rooted in Genesis 1's evening-then-morning day pattern

⏳ A limited, temporary condition, not a permanent one

---

## 👕 Whosoever Beareth Ought Of The Carcase Of Them Shall Wash His Clothes

Carrying a dead unclean animal (not just brushing against it) required an extra step: washing your clothes, on top of the same until-evening waiting period. The law scaled the required response to how much contact actually happened.

👕 Carrying required washing clothes; touching alone did not

⚖️ The response scaled with the level of contact

🕐 Both situations still ended at the same evening deadline

---

## 🐾 The Carcases Of Every Beast Which Divideth The Hoof, And Is Not Clovenfooted, Nor Cheweth The Cud

This restates the same two-part test from verses 3-4, now applied specifically to touching a dead body rather than eating. Any animal failing either half of that original test carried this same temporary uncleanness when touched.

🐾 The same two-part test from the start of the chapter, reapplied

🕐 Failing either half still meant uncleanness until evening

📖 One consistent standard running through the whole chapter

---

## 🐈 Whatsoever Goeth Upon His Paws, Among All Manner Of Beasts That Go On All Four

This targets a separate category: animals like cats and dogs that walk on soft paws rather than hooves. Even without any cud-or-hoof question at all, paw-walking alone placed an animal in this unclean category.

🐈 A separate rule for paw-walking animals, not hoofed ones

🐾 Applies regardless of what the animal eats

📖 A distinct test from the cud-and-hoof rule already given

---

## 👕 He That Beareth The Carcase Of Them Shall Wash His Clothes... They Are Unclean Unto You

The chapter closes this stretch by repeating the same washing requirement for carrying a paw-walking animal's body. The pattern holds steady across every category so far: touching costs a wait, carrying costs a wash and a wait.

👕 The same carry-and-wash rule applied here too

🔁 A consistent pattern across every animal category so far

⏳ Still resolved by the same evening deadline

---

## ⚖️ A Mild Penalty, By Leviticus's Own Standards

Every consequence in this section — wait until evening, wash your clothes — resolves within a single day. That's mild compared to other failures elsewhere in Leviticus, like eating forbidden fat or blood, which chapter 7:20-21 punishes with being permanently "cut off from his people."

Simply touching or carrying an unclean carcase sat on the lighter end of the book's whole penalty scale, not its harshest.

⚖️ Resolved within one day, unlike some other failures in the book

🚫 Contrast: chapter 7:20-21's "cut off" penalty was permanent

📖 Shows Leviticus graded consequences by severity, not one-size-fits-all

# Leviticus 11:29-38

# 🦎 Creeping Things And Contamination

---

## 🐁 The Weasel, And The Mouse, And The Tortoise... The Ferret, And The Chameleon, And The Lizard, And The Snail, And The Mole

This list names eight small ground-dwelling creatures. As with several of the earlier bird names, a few of these exact species identifications are debated by modern scholars, since some of the underlying Hebrew words are rare and appear nowhere else in the Bible.

🐁 Eight small, ground-level creeping creatures

📖 A few exact species names here are genuinely uncertain

🏠 The kind of small animals that could easily wander into a home

---

## 🦎 The Tortoise, And The Chameleon, And The Lizard

Some modern scholars think the word translated "tortoise" here may actually describe a type of large lizard rather than a shelled reptile, since the exact animal isn't named this way anywhere else in the Bible. Whatever the precise species, the whole cluster names small reptiles that would have been common sights around Israelite homes and fields.

🦎 "Tortoise" here may actually mean a type of lizard

📖 Honest translation uncertainty, not settled fact

🏡 Common, everyday creatures rather than exotic ones

---

## 💧 It Must Be Put Into Water... And It Shall Be Unclean Until The Even

Wood, cloth, leather ("skin"), and sacking that touched one of these dead creatures could be washed clean again after the same evening deadline. These materials could absorb contamination temporarily, but not permanently.

💧 Wood, cloth, leather, and sacking could be washed clean

⏳ The same evening deadline applied here too

🔁 Temporary contamination, not a permanent loss of the item

---

## 🏺 Every Earthen Vessel... Ye Shall Break It

Unglazed clay pottery worked differently from cloth or wood. Because raw clay is porous, it was believed to soak in contamination permanently rather than release it through washing, so the only fix was destroying the vessel completely.

🏺 Clay pottery couldn't be washed clean like other materials

🔨 The only remedy given was breaking it entirely

📖 A real reflection of how porous, unglazed clay actually behaves

---

## 🍲 That On Which Such Water Cometh Shall Be Unclean

If food or drink touched water that had been sitting in a now-contaminated vessel, the food or drink itself became unclean too. Contamination could pass from a carcase to water to whatever the water then touched, one link at a time.

🍲 Contamination could spread through a chain of contact

💧 Water carried it from the vessel to whatever it touched next

📖 A traceable, step-by-step transfer, not a vague general risk

---

## 🔥 Oven, Or Ranges For Pots... They Shall Be Broken Down

Ovens and cooking surfaces in this period were typically made of the same kind of fired clay as pottery, so the identical "break it, don't wash it" rule applied to them for the same underlying reason.

🔥 Ovens were made of the same porous clay as pottery

🔨 The same break-it-don't-wash-it rule applied

📖 Consistent logic applied to every clay-based item

---

## 💦 A Fountain Or Pit, Wherein There Is Plenty Of Water, Shall Be Clean

A flowing spring or a large water source stayed clean even if a carcase fell into it, unlike the small standing water in a household vessel. A whole community's water supply couldn't reasonably be declared permanently unclean over one incident, and moving or plentiful water carried away contamination rather than holding it.

💦 Large or flowing water sources were treated differently

🏘️ A shared community water supply wasn't put at that level of risk

📖 Scale and movement of the water changed the ruling

---

## 🌾 If Any Part Of Their Carcase Fall Upon Any Sowing Seed... It Shall Be Clean

Dry seed touched by a dead creature stayed clean and usable. But the very next verse changes the outcome completely: once water has been added to that same seed, contact with a carcase does make it unclean.

Moisture is the deciding factor throughout this whole passage — dry materials resisted contamination in a way that wet ones didn't, a real, physical logic running underneath the ritual law.

🌾 Dry seed touched by a carcase stayed clean

💧 The exact same seed, once wet, did not

🔑 Moisture is the consistent factor deciding the outcome

---

## 🧩 One Coherent System, Not A Random List

Taken together, verses 32-38 describe a real, consistent system: absorbent materials (cloth, wood, leather) could be washed clean, porous clay could not and had to be destroyed, moving or plentiful water resisted contamination entirely, and dry goods stayed safe until moisture activated the risk.

This wasn't a scattered pile of unrelated rules. It was an early, working framework for reasoning about how contamination spreads, one clear principle applied consistently across many different materials.

🧩 Four consistent rules, not a random list of exceptions

💧 Moisture and material type both decide the outcome

📖 An early, coherent framework for reasoning about spread

# Leviticus 11:39-40

# 🐄 An Animal Found Already Dead

---

## 💀 If Any Beast, Of Which Ye May Eat, Die; He That Toucheth The Carcase Thereof Shall Be Unclean Until The Even

This covers a permitted animal, like a cow or sheep, that died on its own rather than being properly slaughtered. Even though the species itself was normally allowed as food, its body still carried the same kind of temporary uncleanness by touch as any other carcase in this chapter.

💀 Applies even to normally-permitted animals like cattle or sheep

🕐 The same until-evening rule as every other carcase here

📖 Being an allowed species didn't remove this specific risk

---

## 👕 He That Eateth Of The Carcase Of It... He Also That Beareth The Carcase Of It Shall Wash His Clothes

This verse doesn't flatly forbid eating a permitted animal that died naturally — it says doing so (or carrying it) came with washing clothes and a wait until evening. Later law tightens this considerably: Deuteronomy 14:21 goes further and bans Israelites from eating a naturally-dead animal at all, allowing it only to be given or sold to a foreigner instead.

👕 Eating or carrying it required washing, not an outright ban here

📖 Deuteronomy 14:21 later closes this gap completely

⚖️ A rule that grew stricter as the law developed further

---

## 🩸 Why This Mattered: The Blood Was Never Drained

A big part of the reason this case got its own rule likely traces back to blood. Leviticus 17:10-14 later makes clear that an animal's blood carried special weight and had to be properly drained at slaughter. An animal that simply died on its own never went through that process at all, which is probably the deeper reason even a normally-clean species still carried real risk here.

🩸 Proper slaughter always included draining the blood

📖 A naturally-dead animal skipped that process entirely

🔑 Likely the real reason behind this rule, per Leviticus 17:10-14

# Leviticus 11:41-45

# ✨ Be Ye Holy; For I Am Holy

---

## 🐍 Whatsoever Goeth Upon The Belly

This targets snakes and other legless creeping animals specifically, a category distinct from the paw-walking or many-footed creatures named earlier in the chapter. Every possible way a small creature could move along the ground gets its own explicit mention somewhere in this chapter.

🐍 Refers specifically to snakes and legless creepers

📖 A distinct category from paw-walkers or many-footed creatures

🎯 The chapter methodically covers every form of ground movement

---

## 🚫 Neither Shall Ye Make Yourselves Unclean With Them, That Ye Should Be Defiled Thereby

"Defiled" carries a stronger, more personal weight than the earlier "unclean." The verse frames this as something Israel could actively choose to avoid doing to themselves, not just an accidental risk to manage.

🚫 "Defiled" carries a stronger, more personal weight

🙋 Framed as a choice to avoid, not just an accident to manage

📖 A shift in tone right before the chapter's key theological statement

---

## ✨ Sanctify Yourselves, And Ye Shall Be Holy; For I Am Holy

This is the chapter's single most important line, and one of the most quoted verses from Leviticus anywhere in the Bible. "Sanctify" and "holy" both come from the same Hebrew root (qadosh), meaning set apart, different, distinct from everything ordinary around it.

Centuries later, the apostle Peter quotes this exact line directly in 1 Peter 1:15-16, applying it to all of Christian conduct, not diet specifically — proof that the underlying principle (God's people reflecting God's own set-apart character) outlasted the specific food rules built on top of it here.

✨ "Sanctify" and "holy" share the same Hebrew root: set apart

📖 Quoted directly by Peter in 1 Peter 1:15-16

🔑 The real point behind the whole chapter, stated plainly

---

## 🇪🇬 I Am The LORD That Bringeth You Up Out Of The Land Of Egypt, To Be Your God

The chapter grounds this entire dietary code in Israel's rescue from Egypt, not in health advice or ancient custom. "To be your God" echoes the covenant language from Exodus 6:7, tying what Israel eats directly back to who rescued them and who they now belong to.

🇪🇬 Grounded in the Exodus rescue, not health science

📖 "To be your God" echoes Exodus 6:7's covenant language

🔗 Diet is tied here to identity and rescue, not custom

---

## 🔄 The Chapter's Full Circle

This whole chapter opened by naming land beasts in verse 2 and now closes, in verse 42, back on ground-level creeping things — after working through water creatures and birds in between. Every category of living thing gets touched once, closing the loop the chapter opened with.

🔄 Opens on land beasts, closes back on ground-level creatures

📖 Every habitat category gets covered exactly once

🎯 A deliberately complete, closed structure

# Leviticus 11:46-47

# 📜 To Make A Difference

---

## 📜 This Is The Law Of The Beasts, And Of The Fowl, And Of Every Living Creature

"Law" translates the Hebrew torah, meaning instruction, not merely a legal rule in the modern sense. This closing line functions like a chapter title placed at the end, summarizing everything just covered as one complete unit of teaching.

📜 "Torah" means instruction, a broader idea than just "rule"

🏷️ Functions like a summary title placed at the chapter's end

📖 Covers land animals, birds, water creatures, and creeping things together

---

## ⚖️ To Make A Difference Between The Unclean And The Clean

This is the chapter's real purpose stated in one plain sentence at the very end. It's the exact same phrase — "put difference between... unclean and clean" — that God gave Aaron directly back in chapter 10:10, closing the loop on the assignment this whole chapter has been fulfilling all along.

⚖️ The chapter's purpose stated plainly, right at the close

🔁 Repeats chapter 10:10's phrase to Aaron almost word for word

🎯 The whole chapter was Aaron's teaching assignment carried out

---

## 🧠 A Skill For Life, Not Just A Meal Plan

Read together, verses 46-47 frame everything in this chapter as training in discernment — learning to tell apart what's permitted from what isn't, category by category, until it became second nature. That same skill of careful discernment is exactly what Aaron's priestly role, defined back in chapter 10, would keep requiring of him for the rest of his life.

🧠 The chapter trains discernment, not just diet rules

📖 The same skill Aaron's whole priestly role depended on

🔁 A fitting close to the "difference" theme running all chapter`;

export const LEVITICUS_ELEVEN_PERSONAL_SECTIONS = parseLeviticusElevenRawNotes(LEVITICUS_ELEVEN_RAW_NOTES);
