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

  if (sections.length !== 12) {
    throw new Error("Expected 12 Leviticus 11 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_ELEVEN_RAW_NOTES = `# Leviticus 11:1-3
# 🐄 The Land Animal Test
---
## 🗣️ The LORD Spake Unto Moses And To Aaron

Most laws before this point came to Moses alone.

Moses then had to pass them on to Aaron himself.

This chapter speaks to both of them together from the very first verse.

Chapter ten had just given Aaron a personal charge to teach Israel the difference between clean and unclean.

This chapter is that teaching, put into words for the first time.

🗣️ Addressed to Moses and Aaron together

📜 Earlier laws came through Moses alone

📖 Chapter ten gave Aaron this exact charge

➡️ This chapter fulfills that charge directly

## 🇮🇱 Speak Unto The Children Of Israel

This command is addressed to the children of Israel specifically.

Not to Egypt, not to Canaan, not to any other nation.

Food had just become one more way God set His people apart.

What Israel ate and did not eat marked them as different every single day.

🇮🇱 Addressed to Israel, not other nations

🍽️ Food became a daily marker of identity

📖 God set His people apart by diet

➡️ Being different was part of belonging to Him

## 🐾 Parteth The Hoof, And Is Clovenfooted

"Parteth the hoof" means the foot is split into two separate toes.

"Clovenfooted" describes that same split shape from a different angle.

A cow, sheep, goat, or deer all show this split foot clearly.

A horse or donkey does not.

Its hoof stays one solid piece instead.

🐾 A hoof split into two toes

🐄 Cows, sheep, goats, and deer qualify

🐴 Horses and donkeys have one hoof

📖 The first of two required tests

## 🌾 Cheweth The Cud

"Cheweth the cud" means the animal is a ruminant.

A ruminant swallows food once, then brings it back up later to chew it again.

Cows and sheep do this for hours every single day.

Both traits had to be true together, not just one alone.

The next section shows exactly why that distinction mattered.

🌾 Means chewing already swallowed food

🐄 Cows and sheep do this constantly

⚖️ Both traits were required at once

➡️ One trait alone was never enough

# Leviticus 11:4-8
# 🐫 Four Animals That Fail The Test
---
## 🐫 The Camel, Because He Cheweth The Cud

The camel chews the cud, just like a cow or sheep.

But its foot is not truly split into two toes.

A camel's foot is a soft padded cushion instead.

One test passed was never enough on its own.

The camel fails the second half of the test.

🐫 Camel chews the cud like cattle

🦶 Its foot is a soft pad

⚖️ Passing one test alone is not enough

➡️ The camel fails the second test

## 🐹 The Coney, Because He Cheweth The Cud

A coney is not a rabbit, even though it looks like one.

Many scholars believe this word points to the hyrax, a small furry animal that lives among rocks.

A hyrax works its jaw constantly, which looks like chewing the cud.

It does not actually have the ruminant stomach that true cud chewing requires.

The law describes what the animal appears to do, not just its biology.

🐹 Coney likely means the hyrax

🪨 Hyraxes live among rocks

😮 Its jaw motion looks like chewing cud

➡️ It fails the true biological test

## 🐇 The Hare, Because He Cheweth The Cud

A hare is a wild rabbit, larger and faster than the tame kind.

Like the coney, it constantly moves its jaw in a way that looks like chewing the cud.

It does not have a true ruminant stomach either.

Two very different animals fail this law for the exact same reason.

🐇 Hare means a wild rabbit

😬 Its jaw motion mimics chewing cud

🚫 It has no true ruminant stomach

➡️ The same reason disqualifies the coney too

## 🐷 The Swine, Though He Divide The Hoof

The swine is a pig.

Its foot genuinely is split into two toes, so it passes the first test.

But a pig does not chew the cud at all.

It fails the second test instead of the first.

The camel, coney, and hare all fail for the opposite reason the pig does.

🐷 Swine means a pig

🐾 Its hoof genuinely is split

🚫 It does not chew the cud

➡️ It fails the opposite test the others do

## 🚫 Their Carcase Shall Ye Not Touch

The ban goes further than just eating pork.

A carcase means the dead body of the animal.

Israel could not eat swine and could not touch a dead one either.

This rule made the pig the most visible unclean animal in the whole law.

🚫 The rule bans touching, not just eating

💀 Carcase means a dead body

🐷 The pig became the clearest example

📖 Uncleanness could spread just by contact

## 🐷 Yet He Cheweth Not The Cud

No animal on this list became more famous than the pig.

Centuries later, a ruler over Judea tried to force Jews to eat pork as proof of loyalty to him.

Many refused and were killed rather than break this one command.

A single verse in Leviticus became a line some were willing to die for.

🐷 The pig became the most famous case

👑 A later ruler forced this test

⚰️ Some died rather than eat it

📖 One law shaped centuries of identity

# Leviticus 11:9-12
# 🐟 Fins And Scales
---
## 🐟 Whatsoever Hath Fins And Scales

Fins and scales describe ordinary fish, the kind found in most rivers and seas.

A fish needs both features together to be considered clean.

Catfish and eels have fins but no true scales, so they fail this test.

Shellfish like shrimp and crab have neither, so they fail even more clearly.

🐟 Fins and scales mark an ordinary fish

🐡 Catfish and eels lack true scales

🦐 Shellfish have neither feature at all

➡️ Both features were required together

## 🌊 In The Waters, In The Seas, And In The Rivers

This phrase covers every kind of water Israel might fish from.

Seas meant the large bodies like the Mediterranean.

Rivers meant smaller moving water like the Jordan.

The rule was not limited to one type of water source.

🌊 Seas means large bodies of water

🏞️ Rivers means smaller moving water

🗺️ The rule covers every water source

📖 No water body was left out

## 🤢 An Abomination Unto You

"Abomination" is a strong word for something treated as deeply disgusting.

It is not a mild dislike.

The Bible uses this exact word for the most serious violations, things like idolatry.

Using it here shows how seriously this food law was meant to be taken.

🤢 Abomination means deeply disgusting

🔥 The Bible reserves this word for serious sins

🙅 It is not a mild dislike

📖 This shows how seriously the law was meant

## 🔁 Ye Shall Have Their Carcases In Abomination

The same warning repeats twice in these four verses.

Verse ten calls unclean water creatures an abomination.

Verse eleven adds that even touching their dead bodies counts.

Repetition here is not filler.

It is emphasis.

🔁 The warning repeats within four verses

👋 Touching a carcase counts too

📢 Repetition here means emphasis

📖 Some warnings mattered enough to repeat

# Leviticus 11:13-19
# 🦅 The Forbidden Birds
---
## 🦅 The Eagle, And The Ossifrage, And The Ospray

These three birds are all large hunters of prey.

An ossifrage is a type of vulture known for dropping bones to crack them open.

An osprey is a fish hawk that dives into water to catch its meal.

Birds that hunt and eat living or freshly killed flesh open this list first.

🦅 Eagle, ossifrage, and osprey are hunters

🦴 Ossifrage means a bone dropping vulture

🐟 Osprey means a fish hunting hawk

📖 Flesh eating birds open the list

## 🦴 The Vulture, And The Kite After His Kind

A vulture and a kite are scavengers, not hunters.

They eat animals that are already dead instead of killing their own food.

"After his kind" means every bird in that same family, not just one species.

This exact phrase echoes the words used for each animal at creation in Genesis.

🦴 Vultures and kites eat already dead animals

🔁 After his kind means the whole family

🌍 Every related species was included

📖 The phrase echoes Genesis creation language

## 🐦‍⬛ Every Raven After His Kind

Ravens get their own line, separate from every other bird.

They were considered unclean under this law.

Yet later, in the days of Elijah, God used ravens to carry bread and meat to him by a brook.

God was never bound by the categories He gave to Israel's diet.

🐦‍⬛ Ravens stand alone in the list

🚫 Ravens were unclean under this law

🍞 God later used a raven to feed Elijah

➡️ God is not limited by His own rules

## 🌙 The Owl, And The Night Hawk, And The Cuckow, And The Hawk

These birds share one thing in common.

Most of them hunt at night or in the shadows.

Some old English names like "cuckow" no longer match how we spell that word today.

Scholars are not always certain which exact modern bird each old name points to.

🌙 These birds mostly hunt at night

🦉 Owl and night hawk fit that pattern

📝 Cuckow is an old spelling of cuckoo

📖 Exact species are not always certain

## 🦉 The Little Owl, And The Cormorant, And The Great Owl

This section keeps naming birds tied to darkness or to water.

A cormorant is a diving bird that hunts fish underwater.

Owls appear twice in this chapter, in two different sizes.

The law was thorough, not naming just one example and moving on.

🦉 Owls appear in two different sizes

🌊 Cormorant means a fish diving bird

📋 The list stays thorough throughout

📖 No related species was skipped

## 🦇 The Stork, The Heron After Her Kind, And The Lapwing, And The Bat

A bat is not actually a bird.

This law groups it here anyway because it flies, not because of its biology.

The ancient category was "things that fly," not a modern animal chart.

The stork's Hebrew name is related to the word for kindness, since storks were known for caring for their young.

Even a bird named for kindness lands on this unclean list.

🦇 Bats are grouped here for flying, not biology

📖 The category was flight, not modern zoology

🕊️ Stork's name relates to kindness in Hebrew

➡️ Uncleanness here was never about morality

# Leviticus 11:20-23
# 🦗 Flying Things That Creep
---
## 🐛 All Fowls That Creep, Going Upon All Four

This phrase describes flying insects, not birds.

In this culture, anything that flew got grouped loosely with fowls.

Most flying insects Israel would meet fall under this general ban.

A specific exception follows right after this general rule.

🐛 Fowls here means flying insects

🗂️ Flying things were grouped together loosely

🚫 Most flying insects fall under this ban

➡️ One exception follows immediately

## 🦵 Which Have Legs Above Their Feet, To Leap Withal

This describes jointed back legs built for jumping.

A grasshopper's long back legs bend upward above its regular feet.

That extra joint lets it leap instead of only crawling.

This one physical feature marks the exception to the rule just given.

🦵 Jointed legs built for jumping

🦗 A grasshopper's legs fit this shape

⬆️ The joint sits above the regular feet

➡️ This feature marks the exception

## 🦗 The Locust After His Kind, And The Bald Locust

Locusts were a real food source in this part of the world.

They were cheap, plentiful, and easy to gather during a swarm.

John the Baptist later ate locusts and wild honey in the wilderness.

What sounds strange today was ordinary food back then.

🦗 Locusts were a real food source

💰 They were cheap and plentiful

📖 John the Baptist later ate them

➡️ Ordinary food, not a strange exception

## 🔒 But All Other Flying Creeping Things, Which Have Four Feet, Shall Be An Abomination

This verse closes the loop on flying insects.

Anything without the jumping legs from verse twenty one falls back under the ban.

The exception was narrow, built around one specific feature.

Everything else in this category stayed off the table.

🔒 This verse closes the exception's loop

🦵 Only the jumping leg feature qualified

📏 The exception stayed narrow on purpose

➡️ Everything else remained forbidden

# Leviticus 11:24-28
# 🐾 Touching The Carcase
---
## 🌆 Unclean Until The Even

"Unclean until the even" sets a clear end time.

The even means evening, when a new day began in this calendar.

This uncleanness was not permanent and it was not sin.

It was a temporary state that passed with time.

🌆 The even means evening

⏳ Uncleanness here had a clear end time

🚫 It was not the same as sin

➡️ Time itself restored a person's status

## 👋 Whosoever Beareth Ought Of The Carcase Of Them Shall Wash His Clothes

Touching a carcase and carrying one were not treated the same way.

Simply touching only required waiting until evening.

Carrying or moving the body added an extra step, washing the clothes.

More direct contact meant a bigger response was required.

👋 Touching alone just meant waiting

🎒 Carrying required washing clothes too

⚖️ Closer contact meant a bigger response

📖 The law matched the response to the contact

## 🔁 Divideth The Hoof, And Is Not Clovenfooted, Nor Cheweth The Cud

This restates the exact test from the start of the chapter.

These animals fail one or both parts of that same test.

The chapter now applies that test to the question of touching, not just eating.

One test, used for two different purposes.

🔁 Restates the test from verse three

🐾 These animals fail that same test

✋ Now applied to touching, not eating

📖 One test served two purposes

## 🐾 Whatsoever Goeth Upon His Paws

This describes animals like dogs, cats, and lions.

Paw footed animals are usually predators that catch and eat other animals.

Contact with blood and prey made these animals unclean under this law.

This connects back to a pattern already seen with birds of prey.

🐾 Paws describe dogs, cats, and lions

🩸 These animals often handle blood and prey

🔁 Same pattern seen earlier with birds

📖 Contact with death carried real weight

# Leviticus 11:29-31
# 🦎 Creatures That Swarm The Ground
---
## 🐭 The Weasel, And The Mouse, And The Tortoise After His Kind

This list covers small creatures that move low along the ground.

The Hebrew word behind this section means something closer to swarming or scurrying.

A weasel, a mouse, and a tortoise all fit that same low, quick movement.

None of them were ever considered food in Israel.

🐭 This section covers low ground movers

🔤 The Hebrew word suggests scurrying or swarming

🐢 Weasel, mouse, and tortoise all fit

➡️ None were ever considered food

## 🦎 The Ferret, And The Chameleon, And The Lizard, And The Snail, And The Mole

This list keeps naming small creeping animals.

Some of these English names may not match the exact modern species.

Translators across the centuries have not always agreed on every one.

The larger point stays clear even where one exact name is uncertain.

🦎 The list continues with more creatures

❓ Some names may not match exactly

📚 Translators have long disagreed on details

📖 The larger rule stays clear regardless

## 🌆 When They Be Dead, Shall Be Unclean Until The Even

This closes the list with the same rule used throughout the chapter.

Touching one of these creatures after it dies brings the evening long uncleanness.

The chapter keeps using one consistent standard across every category of animal.

Fish, birds, insects, and now these ground creatures all share the same basic rule.

🔁 The same rule closes this list

🌆 Touching a dead one brings evening uncleanness

📏 One consistent standard runs through the chapter

📖 Every category shares this same basic rule

# Leviticus 11:32-38
# 🏺 When Uncleanness Spreads
---
## 🧺 Any Vessel Of Wood, Or Raiment, Or Skin, Or Sack

This verse lists everyday household items, not just animals.

Raiment means clothing.

A dead creature falling onto any of these items passed uncleanness onto the item itself.

The rule stopped being about food and started covering ordinary daily life.

🧺 Raiment means clothing

🏺 Wood, cloth, skin, and sacks all count

📦 Uncleanness could spread to ordinary items

➡️ This moved beyond food into daily life

## 🏺 Every Earthen Vessel, Whereinto Any Of Them Falleth

A washable item could be cleaned and used again.

An earthen vessel means a clay pot.

Clay is porous, so it soaks in whatever touches it and cannot be fully washed clean.

A contaminated clay pot had to be broken instead of washed.

🏺 Earthen vessel means a clay pot

💧 Clay soaks in what touches it

🚫 Washing could not fully clean it

➡️ It had to be broken instead

## 🍞 That On Which Such Water Cometh Shall Be Unclean

Food itself could pick up uncleanness too, not just containers.

If water from a contaminated source touched food, the food became unclean.

Dry food sitting untouched stayed safe.

Moisture was the trigger that let uncleanness travel from one thing to another.

🍞 Food could become unclean too

💧 Water carried the uncleanness along

🌵 Dry food alone stayed safe

➡️ Moisture was the trigger every time

## ⛲ A Fountain Or Pit, Wherein There Is Plenty Of Water, Shall Be Clean

A small bowl could become fully contaminated.

A large flowing spring or a deep well could not, in practice.

This exception kept a whole village's water supply from being ruled unusable over one dead creature.

The law stayed workable for real daily life.

💧 Small containers could be fully contaminated

⛲ Large water sources were the exception

🏘️ This protected a village's whole water supply

📖 The law stayed workable in real life

## 🌾 If Any Water Be Put Upon The Seed

Dry seed sitting in storage stayed clean even if a carcase touched it.

The moment that seed got wet, the same rule from before applied.

Moisture again decides whether uncleanness can spread.

This detail mattered to farmers planning their next planting season.

🌾 Dry seed in storage stayed clean

💧 Wet seed followed the moisture rule

🔁 The same trigger applies again here

➡️ This mattered to real farming decisions

# Leviticus 11:39-40
# 💀 A Clean Animal That Dies On Its Own
---
## 🐄 If Any Beast, Of Which Ye May Eat, Die

This is not a new animal added to the unclean list.

It is a normally clean animal, like a cow or sheep.

This one died on its own instead of being properly killed.

Being a clean species was never the only requirement.

How the animal died mattered just as much as what kind it was.

🐄 A normally clean animal is meant here

💀 It died on its own, not by slaughter

❓ Species alone was never enough

📖 How it died mattered too

## 👕 He That Eateth Of The Carcase Of It Shall Wash His Clothes

The same pattern from earlier in the chapter repeats here.

Touching brought uncleanness until evening.

Eating or carrying the carcase added the extra step of washing clothes.

Even a normally clean animal could not skip these rules once it died the wrong way.

🔁 The same pattern repeats here

👋 Touching alone meant waiting until evening

👕 Eating or carrying required washing clothes

➡️ Even clean animals were not exempt

# Leviticus 11:41-43
# 🐛 Every Creeping Thing
---
## 🐍 Whatsoever Goeth Upon The Belly

This describes an animal with no legs at all.

A snake is the clearest example.

Moving flat against the ground put it in this final banned category.

This verse closes every remaining gap the earlier lists had not already covered.

🐍 Belly means no legs at all

🐛 A snake fits this description

🚫 This closed the final gap

📖 Nothing crawling was left uncovered

## 🦵 Whatsoever Goeth Upon All Four, Or Whatsoever Hath More Feet

This verse adds two more categories to the legless creatures already named.

Four legged crawling insects fall in one group.

Creatures with many legs, like centipedes, fall in the other.

Between all three verses, no number of legs was left out.

🦵 Four legged crawlers form one group

🐛 Many legged creatures form another

🔢 No leg count was left uncovered

📖 The law was complete on purpose

## 📚 Neither Shall Ye Make Yourselves Unclean With Them, That Ye Should Be Defiled Thereby

The warning stacks three words together on purpose, abominable, unclean, and defiled.

Each word adds more weight than the one before it.

The command also shifts from an action to an identity.

It stops saying "do not eat" and starts saying "do not become unclean yourselves."

📚 Three words stack for extra weight

⬆️ Each word adds more weight

🔄 The focus shifts from action to identity

➡️ Eating habits shaped who they became

# Leviticus 11:44-45
# ✨ Be Ye Holy, For I Am Holy
---
## 📜 I Am The LORD Your God

This whole chapter has felt like a long list of rules.

This line reminds the reader why any of it mattered.

These were not arbitrary restrictions floating on their own.

They came from a relationship, the LORD speaking as Israel's own God.

📜 A long list now gets its reason

🤝 The rules came from a relationship

🚫 Not arbitrary restrictions on their own

📖 God speaks as Israel's own God

## ✨ Ye Shall Therefore Sanctify Yourselves, And Ye Shall Be Holy

"Sanctify" means to set something apart for a special purpose.

"Holy" describes that same set apart status.

This is the first time the Bible states "be holy, for I am holy" this directly.

A New Testament letter later quotes this exact line word for word.

✨ Sanctify means set apart on purpose

🔑 Holy describes that same set apart status

🥇 The first time this exact phrase appears

📖 A later New Testament letter quotes it

## 🇪🇬 For I Am The LORD That Bringeth You Up Out Of The Land Of Egypt

God ties this food law back to the exodus itself.

He is not demanding obedience from a stranger.

He is asking it from people He had already rescued.

Obedience here was a response to rescue, not a way of earning it.

🇪🇬 God ties this law to the exodus

🤲 He already rescued them first

🙏 Obedience follows rescue, not the reverse

📖 This was never about earning anything

# Leviticus 11:46-47
# ⚖️ The Law That Divides
---
## 📜 This Is The Law Of The Beasts, And Of The Fowl

This verse gathers the whole chapter into one single sentence.

Land animals, water creatures, birds, and creeping things all fall under one law.

A chapter that felt like separate lists was actually one connected teaching the whole time.

Every category pointed back to the same underlying purpose.

📜 One sentence gathers the whole chapter

🗂️ Four categories fall under one law

🧵 Separate lists were one connected teaching

📖 Every category shared one purpose

## 🎯 To Make A Difference Between The Unclean And The Clean

This final line states the entire point of the chapter out loud.

Chapter ten had already charged Aaron with teaching this exact skill to Israel.

Telling clean from unclean was never really about food alone.

It trained Israel to notice differences, and that habit was meant to reach every part of life.

🎯 This states the chapter's whole point

📖 Chapter ten already gave Aaron this charge

🍽️ Food was never really the whole lesson

➡️ Discernment was meant to reach everything
`.trim();

export const LEVITICUS_ELEVEN_PERSONAL_SECTIONS = parseLeviticusElevenRawNotes(LEVITICUS_ELEVEN_RAW_NOTES);
