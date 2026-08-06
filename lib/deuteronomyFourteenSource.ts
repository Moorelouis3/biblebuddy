export type DeuteronomyFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyFourteenRawNotes(rawText: string): DeuteronomyFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 14:${startVerse}` : `Deuteronomy 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Deuteronomy 14 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_FOURTEEN_RAW_NOTES = `# Deuteronomy 14:1-3
# 👪 A People Set Apart
---
## 👶 Ye Are The Children Of The LORD Your God

"Children" here does not mean small kids.

It means a real family bond with God.

Israel is being told exactly who they belong to.

That identity comes before any rule in this chapter.

Every food law that follows grows out of that one fact.

👶 Children means a family bond, not age

❤️ The bond comes before any command

📜 Every rule here grows from this identity

📖 Belonging comes first, obedience follows after

---
## ✂️ Ye Shall Not Cut Yourselves

Cutting the skin was a real mourning practice in the ancient Near East.

Grieving people would cut their arms or chest until they bled.

The pain was meant to match the depth of the loss.

God bans this practice for Israel completely.

Grief still had a place here, but not through self harm.

✂️ Cutting the skin was a mourning custom

🩸 Grief was shown through real bleeding

🚫 God bans this practice for Israel

📖 Grief has limits God still sets

---
## 💇 Nor Make Any Baldness Between Your Eyes

Shaving a bald patch on the forehead was another mourning ritual.

Priests in Egypt and Canaan sometimes marked grief this way.

Israel is told not to copy that custom either.

Two different body rituals get named here, not just one.

Both come from cultures that worshiped other gods.

💇 Baldness meant a shaved mourning mark

🌍 Neighboring nations practiced this custom

🚫 Israel is told to skip this too

📖 Two customs banned, not just one

---
## ✨ For Thou Art An Holy People Unto The LORD Thy God

"Holy" means set apart for a special purpose, not simply good behavior.

A holy object in the temple was not used for anything ordinary.

Israel is called holy the same way.

It was set apart from every nation around it.

That status was given, not earned through good deeds.

✨ Holy means set apart, not just good

🏺 Like an object kept for one purpose

🌍 Israel is set apart from other nations

📖 That status is given, not earned

---
## 💎 A Peculiar People Unto Himself

"Peculiar" in this old English sense does not mean odd or strange.

It comes from a word meaning personal treasure or private property.

God is calling Israel his own treasured possession.

That word choice reframes the whole list of rules that follows.

These are not random restrictions.

They come from being chosen and valued.

💎 Peculiar means treasured possession, not odd

🎁 God calls Israel his own property

📜 The rules flow from being valued

📖 Being chosen explains the whole chapter

---
## 🌍 Above All The Nations That Are Upon The Earth

This line adds scope to the choice already stated.

God did not choose Israel because they outnumbered other nations.

Deuteronomy says elsewhere they were the smallest of the peoples.

Being chosen above all nations was about relationship, not size.

🌍 Every other nation is included here

🔢 Israel was not the largest nation

🤝 The choice was about relationship

📖 Smallness never disqualified God's choice

---
## 🚫 Thou Shalt Not Eat Any Abominable Thing

"Abominable" describes something God finds deeply offensive, not just distasteful.

This single line opens the whole food code that fills the rest of the chapter.

Every animal named after this verse gets sorted by that one word.

The reader is meant to expect a list.

That list starts immediately.

🚫 Abominable means deeply offensive to God

📋 This line opens the food code

🐐 Every animal gets sorted by this word

📖 One word introduces the whole list

# Deuteronomy 14:4-8
# 🐐 The Test For Land Animals
---
## 🐂 These Are The Beasts Which Ye Shall Eat

The list opens with the three most familiar farm animals in Israel.

Ox, sheep, and goat were the animals most families already raised.

Naming these first told the reader the list would include what they already knew.

The unfamiliar wild animals come right after.

🐂 Ox, sheep, and goat open the list

🏡 These were common farm animals already

📋 Familiar animals come before wild ones

📖 The list starts with what is known

---
## 🦌 The Hart, And The Roebuck, And The Fallow Deer

These three names describe different kinds of wild deer.

"Hart" is an old word for a mature male deer.

"Roebuck" is a smaller deer common across the ancient Near East.

"Fallow deer" has a light colored coat.

It lives in open woodland.

None of these animals needed a farm.

They were hunted freely in the wild.

🦌 Hart means a mature male deer

🏹 Roebuck is a smaller wild deer

🌳 Fallow deer had a light colored coat

📖 All three were hunted, not farmed

---
## 🐐 The Wild Goat, And The Pygarg, And The Wild Ox, And The Chamois

This second half of the wild animal list covers four more species.

"Pygarg" is an old name for a kind of wild antelope with a pale rump.

"Chamois" describes a mountain dwelling goat antelope, sure footed on steep rock.

The point of naming so many species is not the list itself.

Every one of them still had to pass the same test in the next verse.

🐐 Wild goat and wild ox named here

🦓 Pygarg means a pale rumped antelope

⛰️ Chamois lived on steep mountain terrain

📖 All four still faced the same test

---
## 🐾 Parteth The Hoof, And Cleaveth The Cleft Into Two Claws

This describes a hoof split all the way through into two separate parts.

A pig's hoof looks split on top.

It is not fully divided underneath.

The test looks at the whole hoof, not just its surface shape.

This is the first half of a two part rule.

🐾 Parteth the hoof means a fully split hoof

🐷 A pig's hoof only looks split

🔍 The test checks the whole hoof

📖 This is half of a two part rule

---
## 🌾 Cheweth The Cud

Chewing the cud means bringing food back up to chew it again.

The food comes from an earlier stomach, not the mouth.

Cattle, sheep, and goats all digest food this way.

This is the second half of the rule from verse six.

An animal had to pass both tests, not just one.

🌾 Cud chewing means digesting food twice

🐄 Cattle and sheep both do this

✅ This is the second required test

📖 Both tests had to be passed together

---
## 🐫 The Camel, And The Hare, And The Coney

These three animals chew the cud.

They fail the other half of the test.

A camel's foot is padded, not split into two hooves.

A hare and a coney do not have hooves at all.

Chewing the cud alone was never enough on its own.

🐫 Camels chew the cud, feet are padded

🐇 Hares and coneys lack hooves entirely

❌ One passed test still was not enough

📖 Both conditions were always required together

---
## 🐷 The Swine... Nor Touch Their Dead Carcase

The swine fails the test from the opposite direction of the camel.

A pig's hoof is split, but it does not chew the cud.

Either failure alone made the whole animal unclean.

The ban goes further than not eating it.

Israel could not even touch a dead pig's body.

That second rule connects to wider purity laws about the dead.

🐷 Swine has a split hoof, no cud

🔄 Failing either half makes it unclean

🙅 Touching the dead carcase was banned too

📖 This ties to wider purity laws

# Deuteronomy 14:9-10
# 🐟 Fins And Scales
---
## 🐟 All That Have Fins And Scales Shall Ye Eat

Water creatures get a much simpler test than land animals.

Fins let a fish swim with real control.

Scales cover and protect its whole body.

Most familiar freshwater and saltwater fish carry both features.

This test needed only a glance, not a detailed check.

🐟 Fins and scales are the only test

🏊 Fins give a fish real control

🛡️ Scales protect a fish's whole body

📖 A quick glance settled the question

---
## 🚫 Whatsoever Hath Not Fins And Scales

This rule quietly excluded eels, catfish, and shellfish from Israel's diet.

Many of these creatures were common food in Egypt.

Israel had just come out of that land.

None of them needed to be named individually here.

The simple test already covered every case without a long list.

🚫 Eels and shellfish fail this test

🇪🇬 Egypt commonly ate these creatures

📋 No long list was needed here

📖 One simple test covered every case

# Deuteronomy 14:11-18
# 🦅 Birds Not To Be Eaten
---
## 🕊️ Of All Clean Birds Ye Shall Eat

Birds get no simple two part test like land animals or fish.

Instead, the law names the birds that could not be eaten.

Every bird left off that list was assumed clean by default.

This method suited birds better since no easy physical marker existed.

🕊️ Birds get a named list, not a test

📋 Unnamed birds counted as clean by default

🔍 No simple physical marker existed for birds

📖 The method fit what birds actually are

---
## 🦅 The Eagle, And The Ossifrage, And The Ospray

These first three birds are all large birds of prey.

An "ossifrage" is a bone breaking vulture.

It drops bones from the air to crack them open.

An "ospray" hunts live fish by diving straight into open water.

Birds that hunted and killed for food headed the unclean list.

🦅 Eagle and ossifrage open this list

🦴 Ossifrage means a bone breaking vulture

🐟 Ospray hunted fish by diving

📖 Predatory birds headed the unclean list

---
## 🐦‍⬛ The Glede, And The Kite, And The Vulture, And Every Raven After His Kind

A "glede" and a "kite" are both smaller birds of prey that circle and scavenge.

Vultures and ravens both feed on the flesh of dead animals.

"After his kind" is a phrase repeated through this whole list.

It means every close relative of a named bird was included too.

🦅 Glede and kite are scavenging birds

🍖 Vultures and ravens eat dead flesh

👪 After his kind covers close relatives

📖 One name could cover a whole family

---
## 🦉 The Owl, And The Night Hawk, And The Cuckow, And The Hawk

This group of birds hunts mostly at night or in fast pursuit.

Owls and night hawks were active after dark, feeding on small animals.

The hawk hunted other birds directly out of the sky.

Every bird here still fit the same pattern already seen twice.

🦉 Owls and night hawks hunted after dark

🌙 Night hunting marked this whole group

🦅 Hawks preyed on other birds directly

📖 The same predator pattern repeats again

---
## 🦢 The Little Owl, The Great Owl, The Swan, The Pelican, The Gier Eagle, And The Cormorant

This stretch of the list shifts toward larger water birds.

A pelican and a cormorant both dive for fish.

They often eat carrion washed ashore too.

A "gier eagle" is likely a scavenging vulture found along rivers.

Birds that fed on the dead joined the list as well.

🦢 This stretch names larger water birds

🐟 Pelicans and cormorants dove for fish

💀 Some of these birds ate carrion

📖 Feeding on the dead marked them unclean

---
## 🦇 The Stork, The Heron, The Lapwing, And The Bat

The list closes with the stork, heron, lapwing, and finally the bat.

A bat is not actually a bird at all.

Ancient Hebrew grouped animals by how they moved, not by modern biology.

Anything that flew got sorted into this same list.

Wings were the marker here, not feathers.

🦩 Stork, heron, and lapwing close the list

🦇 The bat is not really a bird

✈️ Ancient grouping was based on flight

📖 Wings mattered more than feathers here

# Deuteronomy 14:19-21
# 🩸 Carrion, Creeping Things, And A Kid In Milk
---
## 🐛 Every Creeping Thing That Flieth Is Unclean Unto You

This line covers flying insects that swarm, not birds with feathers.

Locusts, gnats, and flying beetles all fit this category.

Leviticus later allows a small exception for certain locusts.

Here in Deuteronomy the rule is stated simply, without that exception.

🐛 Flying insects are covered by this rule

🦗 Locusts and gnats both fit here

📜 Leviticus later allows a small exception

📖 Deuteronomy states the simple version

---
## 🍖 Ye Shall Not Eat Of Anything That Dieth Of Itself

An animal that died on its own, instead of being slaughtered, still had blood inside it.

Israel's diet required blood to be drained out at the time of killing.

An animal found already dead could not meet that requirement.

This rule protects a much bigger principle about blood found elsewhere in the law.

🍖 Dieth of itself means found already dead

🩸 Proper slaughter required draining the blood

🚫 A dead find could not meet that

📖 This protects the wider blood law

---
## 🤝 Give It Unto The Stranger... Or Sell It Unto An Alien

The meat was not simply wasted or thrown away.

A "stranger" living among Israel was not bound by this same purity code.

An "alien" traveling through could buy the meat instead.

Israel's holiness rule applied to Israel specifically, not to every visitor.

🤝 The meat was given away, not wasted

🧭 A stranger was not bound by this rule

💰 An alien traveler could buy it

📖 Holiness applied to Israel specifically

---
## 🐐 Thou Shalt Not Seethe A Kid In His Mother's Milk

"Seethe" is an old word for boiling something in liquid.

This law bans cooking a young goat in its own mother's milk.

Many scholars believe this practice showed up in the worship of nearby nations.

The milk that fed that animal's life was not meant to cook its death.

🐐 Seethe means to boil in liquid

🍼 The milk fed the same animal's life

🚫 Life giving milk was not for death

📖 This law separated nourishment from killing

# Deuteronomy 14:22-27
# 💰 Tithing At The Place He Shall Choose
---
## 🔟 Thou Shalt Truly Tithe All The Increase Of Thy Seed

A tithe means giving back exactly one tenth of what came in.

"Truly tithe" repeats the same root word twice in the original Hebrew.

That repeated word was for emphasis.

This was not a gift measured loosely by feeling generous.

The tenth was measured by the actual harvest, year after year.

🔟 Tithe means exactly one tenth given back

📢 Truly tithe repeats the word for emphasis

📆 This happened every single year

📖 Generosity here was measured, not guessed

---
## 🏛️ The Place Which He Shall Choose To Place His Name There

Israel could not simply bring this tithe to any local shrine.

God required it brought to one specific place he would choose.

That place later became Jerusalem, once the temple was built there.

Centering worship in one location kept the nation united.

Local altars scattered across the land could not replace that unity.

🏛️ One chosen place received the tithe

🇮🇱 That place later became Jerusalem

🚫 Local shrines were not an option

📖 One place kept worship unified

---
## 🍽️ Eat Before The LORD Thy God... The Tithe Of Thy Corn, Of Thy Wine, And Of Thine Oil

The tithe was not simply handed over and forgotten.

The family that brought it also ate a meal from it there.

Corn, wine, and oil were the three staple products of Israel's agriculture.

Firstlings from the herd and flock were included in that same meal.

🍽️ The family shared a meal from it

🌾 Corn, wine, and oil were staples

🐑 Firstlings of the herd joined the meal

📖 Giving here included genuine celebration

---
## 🙏 That Thou Mayest Learn To Fear The LORD Thy God Always

This meal had a purpose beyond the food itself.

"Fear" here means deep reverence, not being afraid of harm.

Doing this every single year built the habit into daily life.

A yearly trip to worship still shaped a family the rest of the year.

🙏 Fear here means deep reverence

📆 The yearly habit built lasting reverence

🏠 It shaped the family beyond that one trip

📖 A repeated act can shape a whole life

---
## 🛣️ If The Way Be Too Long For Thee

Some families lived a long journey away from the chosen place.

Carrying grain, wine, and oil that whole distance was not always realistic.

God allowed for that real world difficulty inside the law itself.

This rule shows the law was not designed to punish distance.

🛣️ Some families lived far from the place

🎒 Carrying goods that far was not realistic

🤲 God allowed for this real difficulty

📖 The law made room for distance

---
## 💵 Turn It Into Money, And Bind Up The Money In Thine Hand

Instead of hauling goods, a distant family could sell the tithe for money.

"Bind up" describes tying the coins securely for the journey ahead.

That same money then traveled with the family to the chosen place.

The value of the tithe stayed intact even though its form changed.

💵 The tithe could be sold for money

🪢 Bind up means tying coins securely

🚶 The money traveled to the same place

📖 Value stayed the same, only form changed

---
## 🎉 Bestow That Money For Whatsoever Thy Soul Lusteth After

Once at the chosen place, the family used that money for a fresh meal.

"Lusteth after" here just means a strong personal desire, not something sinful.

Oxen, sheep, wine, and strong drink are all named as valid choices.

This meal was meant to be joyful, not simply obligatory.

🎉 The money bought a celebration meal

❤️ Lusteth after means strong personal desire

🍷 Wine and strong drink were both allowed

📖 Worship here included real joy

---
## 👪 Thou, And Thine Household

This celebration was never meant for one person alone.

The whole household traveled and ate together at the chosen place.

A shared meal like this bonded the family around one shared act of worship.

Nobody in the household was left out of the joy.

👪 The whole household shared this meal

🤝 Worship here was a family act

🎊 Nobody was left out of the joy

📖 Shared meals built a shared faith

---
## 🕎 The Levite That Is Within Thy Gates, Thou Shalt Not Forsake Him

The Levites received no land inheritance like the other tribes.

Their whole livelihood depended on gifts like this tithe.

"Forsake" means to abandon or neglect someone who depends on you.

This command protects the one tribe with no land to fall back on.

🕎 Levites received no land of their own

🍽️ Their livelihood depended on gifts like this

🚫 Forsake means abandoning someone in need

📖 This command protected the landless tribe

# Deuteronomy 14:28-29
# 🏘️ The Third Year Tithe
---
## 📆 At The End Of Three Years

This introduces a second, separate tithe on top of the yearly one.

Every third year, that tithe stayed local instead of traveling to the chosen place.

"The same year" means it was gathered and used within that single year.

The rhythm of giving changed on a set schedule Israel could count on.

📆 A second tithe appears every third year

🏠 This tithe stayed local, not far off

🔁 The schedule repeated on a fixed rhythm

📖 Giving followed a rhythm families could plan for

---
## 🏚️ Lay It Up Within Thy Gates

"Thy gates" refers to a person's own town, not the distant chosen place.

The harvest was stored locally so it could be used close to home.

This kept the third year tithe separate in purpose from the yearly one.

One tithe traveled to worship, and the other stayed to meet local need.

🏚️ Gates here means a person's own town

📦 The harvest was stored close to home

🔀 This tithe served a different purpose

📖 One tithe traveled, the other stayed

---
## 🤲 The Levite, And The Stranger, And The Fatherless, And The Widow

Four groups are named together here.

All four shared one thing in common.

None of them owned land that could produce a harvest.

The Levite depended entirely on gifts like this one.

The stranger, the fatherless, and the widow had no family estate either.

This local tithe became a direct safety net for exactly these four groups.

🤲 Four named groups shared no land

🕎 The Levite had no tribal inheritance

👤 Strangers, orphans, and widows lacked family land

📖 This tithe became a real safety net

---
## 🙌 Shall Come, And Shall Eat And Be Satisfied

The goal was not a small handout but genuine relief.

"Be satisfied" means these families left with a full and settled stomach.

That word choice sets a real standard the community had to actually meet.

The chapter opened with Israel's identity as God's own people.

It closes by asking Israel to care for those with the least.

🙌 Be satisfied means truly full, not a taste

📏 The word sets a real standard

❤️ Care for the poor closes this chapter

📖 God's chosen people were asked to give
`.trim();

export const DEUTERONOMY_FOURTEEN_PERSONAL_SECTIONS = parseDeuteronomyFourteenRawNotes(DEUTERONOMY_FOURTEEN_RAW_NOTES);
