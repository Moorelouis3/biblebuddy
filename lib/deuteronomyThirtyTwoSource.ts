export type DeuteronomyThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyThirtyTwoRawNotes(rawText: string): DeuteronomyThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 32:${startVerse}` : `Deuteronomy 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Deuteronomy 32 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_THIRTY_TWO_RAW_NOTES = `# Deuteronomy 32:1-3
# 🎤 Give Ear O Ye Heavens
---
## 🎤 Give Ear O Ye Heavens

Moses opens his final song by calling the sky itself to listen.

This is not poetic decoration.

Heaven and earth were already named as permanent witnesses back in chapter thirty one.

Now Moses actually addresses them out loud, as if court is now in session.

The whole created order is asked to hear what comes next.

🎤 Moses speaks straight to the heavens
📜 Heaven and earth were named witnesses already
⚖️ This song is the testimony itself
📖 Creation itself is called to listen
---
## 🌍 Hear O Earth The Words Of My Mouth

Earth gets the same command heaven just received.

Together heaven and earth form an old Hebrew pattern called a merism.

Naming the two opposite ends of something means the whole of it is meant.

Heaven and earth together means everywhere, the entire universe as one witness.

This song was never written for Israel's ears alone.

🌍 Earth receives the same command
🔝 Heaven and earth form a pair
🌐 Together they mean the whole universe
📖 This song was written for everyone
---
## 🌧️ My Doctrine Shall Drop As The Rain

Doctrine here simply means teaching, not church dogma.

Moses compares his teaching to four gentle, life giving pictures of water.

Rain and dew both fall quietly, soaking into the ground unseen.

The small rain on tender herb and showers on grass describe that same soft soaking.

None of these pictures involve a flood or a storm.

Good teaching is meant to sink in slowly, not overwhelm all at once.

🌧️ Doctrine means teaching not dogma
💧 Rain and dew both soak in quietly
🌱 Herb and grass repeat the same picture
📖 Good teaching sinks in slowly
---
## 📢 I Will Publish The Name Of The LORD

Publish in the King James Bible means to proclaim loudly, not print a document.

Moses is not writing a private journal entry here.

He intends this song to be spoken and heard by the whole camp.

The name of the LORD points to God's whole character, not just a label.

📢 Publish means proclaim loudly
🚫 Not a private journal entry
👥 Meant to be heard by everyone
📖 The name means God's whole character
---
## 🏆 Ascribe Ye Greatness Unto Our God

Ascribe means to credit something to its rightful source.

Moses commands Israel to correctly credit God with the greatness they have already seen.

This line states the whole point of the song before the song even begins.

Every verse that follows either proves or ignores this one command.

🏆 Ascribe means giving proper credit
🙌 Israel must credit God rightly
🎯 This is the song's whole point
📖 Every verse either proves or ignores it

# Deuteronomy 32:4-6
# 🪨 He Is The Rock
---
## 🪨 He Is The Rock

Rock becomes God's title for the rest of this entire song.

A rock pictures something solid, unmoving, and safe to build on.

Ancient armies often retreated to a literal rock formation for safety in battle.

Calling God the Rock says he never shifts and never fails to hold weight.

🪨 Rock becomes God's title all song
🏔️ It pictures solid unmoving safety
🛡️ Armies once fled to real rocks
📖 God never shifts and never fails
---
## ✅ A God Of Truth And Without Iniquity

Iniquity is an old word for moral wrong or guilt.

This line rules out any hidden unfairness in how God deals with people.

Truth and iniquity are placed as direct opposites here.

God is described as fully reliable before Israel's failure is even mentioned.

⚖️ Iniquity means moral wrong or guilt
🚫 No hidden unfairness in God
✅ Truth and iniquity stand as opposites
📖 God is reliable before Israel fails
---
## 🙋 They Have Corrupted Themselves

Moses does not blame God for what happens next.

This corruption was Israel's own doing.

The blame rests entirely on the people, not on the Rock just described.

This contrast sets up the rest of the song.

🙋 Israel corrupted itself by choice
🚫 God is not to blame
⚖️ Blame rests on the people alone
📖 This contrast drives the whole song
---
## 👪 Their Spot Is Not The Spot Of His Children

Spot here pictures a birthmark or family resemblance, not dirt.

God's true children are expected to carry a family likeness in how they live.

Israel's behavior no longer matches the family they claim to belong to.

A mismatched spot exposes a mismatched relationship.

👪 Spot means a family resemblance
🎨 Not about dirt or stains
❌ Israel's behavior no longer matches
📖 A wrong spot exposes a wrong relationship
---
## 🌀 A Perverse And Crooked Generation

Perverse means twisted away from what is right.

Crooked pictures something bent that no longer sits straight or true.

Both words describe a people who have drifted from their original shape.

The Rock stayed straight while the nation bent.

🌀 Perverse means twisted from right
📐 Crooked means bent not straight
🚶 The nation drifted from its shape
📖 The Rock stayed straight while Israel bent
---
## 💸 Do Ye Thus Requite The LORD

Requite means to pay back or repay in kind.

Moses asks what Israel is actually repaying God for all his care.

This is not really a question.

It works as an accusation instead.

💸 Requite means pay back or repay
❓ Moses asks what they are repaying
🎯 It works like an accusation
📖 Their sin is the payment offered
---
## 👨‍👦 Is Not He Thy Father That Hath Bought Thee

Father here pictures God as the one who gave Israel life as a nation.

Bought pictures a purchase, like the price paid to free a slave.

Israel already knows this story from the exodus.

Calling God both father and buyer stacks two debts of love into one line.

👨‍👦 Father pictures God giving Israel life
💰 Bought pictures a slave being freed
🚶 This points back to the exodus
📖 Two debts of love in one line
---
## 🏗️ Hath He Not Made Thee And Established Thee

Made points to Israel coming into existence as a nation.

Established points to how God kept that nation standing afterward.

Existing once was not the end of the story.

The whole verse stacks up proof before any accusation begins.

🏗️ Made means Israel's existence itself
🏛️ Established means God kept it standing
🔁 Existence alone was not enough
📖 Proof is stacked up before any charge

# Deuteronomy 32:7-9
# 📜 Remember The Days Of Old
---
## 📜 Remember The Days Of Old

Moses points Israel back to their own history before pointing forward.

Remembering here means more than recalling facts.

It means letting the past actually shape present behavior.

A nation that forgets its story easily repeats its worst mistakes.

📜 Moses points back to history first
🧠 Remembering means more than recall
🌱 Past should shape present behavior
📖 A forgotten story tends to repeat
---
## 🗣️ Ask Thy Father And He Will Shew Thee

Shew is an older spelling of show, not a different word.

Israel had no written Bible for ordinary families to read at home.

Fathers and elders carried the story out loud, generation to generation.

Ask reminds Israel that this knowledge was always available at home.

📖 Shew is an old spelling of show
🗣️ Fathers passed the story out loud
👴 Elders carried the story too
➡️ The knowledge was always close by
---
## 👑 The Most High Divided To The Nations Their Inheritance

Most High is a title emphasizing God's rule over every nation, not only Israel.

Long before Israel existed, God was already assigning territory to the nations.

This line pulls the camera back to a global, not just national, scale.

Israel's story sits inside a much bigger act of divine planning.

👑 Most High rules every nation
🗺️ God assigned territory long before Israel
🌍 The scale here is global
📖 Israel's story sits inside a bigger plan
---
## 👥 He Separated The Sons Of Adam

Sons of Adam here simply means the whole human race.

Genesis eleven already recorded humanity scattering into nations at Babel.

This verse looks back at that same event from a different angle.

The nations were not an accident, God set their boundaries on purpose.

👥 Sons of Adam means all humanity
🗼 Genesis eleven recorded that scattering
🔁 Same event seen from another angle
📖 National boundaries were set on purpose
---
## 🔢 According To The Number Of The Children Of Israel

Ancient Jewish tradition connects this number to the seventy nations listed in Genesis ten.

That same list also names seventy descendants of Jacob entering Egypt back in Genesis forty six.

The nations of the earth and the family of Israel are pictured as matching sets.

Even the map of the world was drawn with Israel already in mind.

🔢 Ancient tradition ties this to seventy nations
📜 Genesis ten lists those seventy nations
👪 Genesis forty six lists seventy of Jacob's family
📖 The world's map included Israel already
---
## 🎁 The LORD's Portion Is His People

Portion here pictures a share set aside on purpose, not leftovers.

Every nation belongs to God, but Israel is described as his own special share.

Jacob's descendants are named directly, tying this back to one family's story.

Being chosen was never something Israel earned.

🎁 Portion means a share set aside
👑 Israel is God's own special share
👪 Jacob's descendants are named directly
📖 Being chosen was decided from the start
---
## 🎲 Jacob Is The Lot Of His Inheritance

Lot here is a word for an inherited share, like drawn property.

Jacob stands for the whole nation descended from him.

God did not just claim the nations in general, he claimed one family by name.

This sets up the entire rest of the song, a father describing his own child.

🎲 Lot means an inherited share
👪 Jacob stands for the whole nation
✍️ God claimed one family by name
📖 A father now describes his own child

# Deuteronomy 32:10-14
# 🦅 He Found Him In A Desert Land
---
## 🏜️ In A Desert Land And In The Waste Howling Wilderness

Moses pictures Israel's exact starting point, not a comfortable garden.

Waste howling wilderness describes empty land where wild animals cried out at night.

God found Israel in the worst possible place, not the best.

The rest of this section only makes sense against that harsh backdrop.

🏜️ Israel's starting point was harsh
🐺 Wild animals cried out at night
📍 Not a comfortable garden at all
📖 Everything after depends on this backdrop
---
## 👁️ He Kept Him As The Apple Of His Eye

Apple of the eye is an old idiom for the pupil, the most protected part of the body.

People instinctively flinch to guard their own eyes from harm.

Comparing Israel to that spot pictures the highest possible level of protection.

Nothing about this care was accidental or distant.

👁️ Apple of the eye means the pupil
🛡️ People instinctively guard their eyes
🔒 This pictures the highest protection
📖 God's care here was never distant
---
## 🦅 As An Eagle Stirreth Up Her Nest

Stirreth is an old verb ending simply meaning stirs.

Eagles were believed to push their young out of the nest to force them to fly.

The mother eagle stays close the entire time, ready to catch a falling chick.

God is pictured pushing Israel toward growth while staying near enough to catch them.

🦅 Stirreth is an old form of stirs
🪺 Eagles push young out to force flight
👀 The mother stays close the whole time
📖 God pushes growth while staying near
---
## 🪶 Spreadeth Abroad Her Wings And Beareth Them

When a chick does fall, the mother eagle can catch it on her own wings mid air.

Spreadeth and beareth are simply old forms of spreads and carries.

This picture moves from pushing Israel to actually carrying them when needed.

Growth and rescue both come from the exact same parent.

🦅 Mother eagle catches falling chicks
📖 Spreadeth and beareth mean spreads and carries
🤲 The picture shifts to carrying them
➡️ The same parent both pushes and rescues
---
## ☝️ The LORD Alone Did Lead Him

Alone is the key word in this short verse.

No other nation's god gets any credit for Israel's guidance through the wilderness.

This directly answers the earlier accusation of chasing strange gods.

Israel's whole survival traces back to one single source.

☝️ Alone is the key word here
🚫 No other god shares the credit
⚖️ It answers the strange god accusation
📖 Survival traces to one single source
---
## 🏔️ He Made Him Ride On The High Places Of The Earth

High places here pictures controlling the best land, not idol shrines.

Riding the high places is an image of triumphant, easy possession of good territory.

This is the same land promised all the way back to Abraham.

Provision here looks like victory, not scraping by.

🏔️ High places means the best land
🐎 Riding pictures easy triumphant possession
📜 Same land promised to Abraham
📖 Provision looked like victory not survival
---
## 🐝 Suck Honey Out Of The Rock And Oil Out Of The Flinty Rock

Wild bees often built hives in the cracks of rocky hillsides in this region.

Olive trees grew in the thin, rocky soil common across the same hills.

Even the hardest ground in Canaan still produced honey and oil in abundance.

The land itself carried gifts hidden inside hard, unlikely places.

🐝 Wild bees nested in rocky cracks
🫒 Olive trees grew in thin rocky soil
🍯 Honey and oil came from hard ground
📖 Gifts were hidden in unlikely places
---
## 🐄 Butter Of Kine And Milk Of Sheep

Kine is an old plural word for cattle.

This verse lists the everyday wealth of a settled farming and herding life.

Cattle and sheep together cover both dairy staples of the ancient diet.

The list reads like abundance stacked line after line.

🐄 Kine is an old word for cattle
🥛 Cattle and sheep cover dairy staples
📋 The list stacks up abundance
📖 Everyday wealth fills this verse
---
## 🐏 Rams Of The Breed Of Bashan

Bashan was a fertile region east of the Jordan famous for its strong livestock.

Rams from Bashan were considered some of the best, healthiest animals available.

Naming this specific region adds real, checkable detail to the promise.

This is not vague poetry, it names an actual known place.

📍 Bashan was a fertile eastern region
🐏 Bashan rams were prized livestock
✅ The detail is specific not vague
📖 A real place backs the promise
---
## 🍇 The Pure Blood Of The Grape

This poetic phrase simply describes rich, fresh wine.

Blood of the grape pictures the deep red color pressed straight from the fruit.

Grain, oil, milk, meat, and wine together complete a full picture of a good table.

The chapter's warning about forgetting God only makes sense against this much provision.

🍇 Blood of the grape means wine
🔴 It pictures deep red freshly pressed juice
🍽️ Together these list a full good table
📖 So much provision makes forgetting God worse

# Deuteronomy 32:15-18
# 🍔 Jeshurun Waxed Fat
---
## 🍔 Jeshurun Waxed Fat And Kicked

Jeshurun is an affectionate nickname for Israel, meaning something like the upright one.

Waxed fat means grew comfortable and well fed, not literally overweight.

Kicked pictures a well fed animal turning and striking the hand that feeds it.

The nickname makes the betrayal that follows land even harder.

💛 Jeshurun is a nickname meaning upright
🍔 Waxed fat means grew comfortable
🦵 Kicked pictures striking the feeding hand
📖 The loving nickname makes betrayal sharper
---
## 🔁 Thou Art Covered With Fatness

This line repeats the same idea three separate ways in one breath.

Fat, thick, and covered with fatness all describe the exact same overfed condition.

Piling up near identical words is a common Hebrew way to add emphasis.

The repetition itself argues that comfort was total, not partial.

🔁 Three phrases repeat one idea
🍖 Fat thick and covered mean the same
📢 Repetition was how Hebrew added emphasis
📖 Comfort here was total not partial
---
## 🚪 He Forsook God Which Made Him

Forsook means abandoned or walked away from completely.

Made ties directly back to Israel's very existence as a people.

The nation did not just drift, it actively walked away from its own maker.

Comfort, not hardship, is what finally broke the relationship.

🚪 Forsook means abandoned completely
🏗️ Made ties back to Israel's existence
🚶 This was an active walking away
📖 Comfort broke the relationship not hardship
---
## 🪶 Lightly Esteemed The Rock Of His Salvation

Lightly esteemed means treated as unimportant or cheap.

The very title Rock, used with such weight earlier, gets casually brushed aside here.

Salvation reminds the reader exactly what this Rock had already done for them.

Familiarity had quietly turned into contempt.

🪶 Lightly esteemed means treated as cheap
🪨 The same weighty Rock title returns
🛟 Salvation recalls what God already did
📖 Familiarity had turned into contempt
---
## 😠 They Provoked Him To Jealousy With Strange Gods

God's jealousy in scripture is not petty insecurity.

It is the reasonable response of a spouse to real unfaithfulness.

Strange gods here means any god foreign to Israel's actual covenant relationship.

The marriage image from earlier chapters sits quietly behind this whole line.

😠 God's jealousy is not petty insecurity
💍 It matches a spouse's fair response
🚫 Strange gods means gods outside the covenant
📖 A marriage image sits behind this line
---
## 🚫 With Abominations Provoked They Him To Anger

Abomination is scripture's strongest word for something deeply offensive to God.

The word gets repeated across the law whenever a practice crosses a clear line.

Pairing jealousy in the first half with anger in the second raises the stakes.

This was never a minor lapse in judgment.

🚫 Abomination is the strongest offense word
📜 The word repeats often across the law
📈 Anger raises the stakes past jealousy
📖 This was never a minor lapse
---
## 👹 They Sacrificed Unto Devils Not To God

Devils here translates a Hebrew word for lesser demonic spirits, not a fully developed satan figure.

Israel believed they were still worshiping something real and powerful.

Moses corrects that assumption directly, these were empty, harmful spirits, not gods at all.

Sincerity in worship never made the object of worship real.

👹 Devils means lesser demonic spirits
🙏 Israel thought they worshiped something real
🚫 Moses corrects that false assumption
📖 Sincerity never made an idol real
---
## 🆕 To New Gods That Came Newly Up

Newly up pictures gods with no history, no track record of ever helping anyone.

Israel's own God had already proven himself across centuries of real events.

Trading a proven father for an untested stranger made no logical sense at all.

Novelty was the only thing these new gods actually offered.

🆕 Newly up means gods with no history
📜 Israel's God had centuries of proof
🔄 Trading proven care for a stranger
📖 Novelty was all these gods offered
---
## 👴 Whom Your Fathers Feared Not

Fathers here means the patriarchs and earlier generations of Israel.

Even in their worst moments, earlier generations never turned to these specific gods.

This makes the current generation's choice a genuinely new low.

Every generation before had at least drawn this one line.

👴 Fathers means earlier generations of Israel
🚫 They never worshiped these specific gods
📉 This marks a genuinely new low
📖 Even ancestors had drawn this line
---
## 👶 Of The Rock That Begat Thee Thou Art Unmindful

Begat is an old word for fathered or gave birth to.

Calling God Rock and father together in one line piles up two protective images at once.

Unmindful means forgetful, not through simple memory loss but through neglect.

Israel did not lose the memory, they refused to keep it.

👶 Begat means fathered or gave birth to
🪨 Rock and father combine two images
🧠 Unmindful means forgetful through neglect
📖 Israel refused to keep the memory
---
## 🏺 Hast Forgotten God That Formed Thee

Formed pictures careful, hands on shaping, like a potter working clay.

This is the third parent image used for God in just two verses, maker, father, and now potter.

Forgetting a potter erases the reason the clay has any shape at all.

The chapter keeps stacking images so no reader can miss the point.

🏺 Formed pictures careful hands on shaping
👨‍👧 Third parent image in two verses
🧱 Forgetting the potter erases the clay's shape
📖 Images stack so the point cannot be missed

# Deuteronomy 32:19-21
# 😠 The LORD Saw It And Abhorred Them
---
## 😠 The LORD Saw It And Abhorred Them

Abhorred means to feel strong disgust or hatred toward something.

This is a strong word, not gentle disappointment.

God's reaction matches the seriousness of what Israel had just done.

Nothing here was hidden from him or discovered late.

😠 Abhorred means strong disgust
🚫 Not gentle disappointment at all
⚖️ The reaction matches the offense
📖 Nothing was hidden from God
---
## 👦 Of His Sons And Of His Daughters

Sons and daughters names both halves of Israel, not just its leaders.

The whole family provoked this reaction, not one guilty generation of men.

Naming daughters specifically keeps the picture from being read as only about warriors or kings.

Every member of the covenant family shares in this failure.

👦 Sons and daughters means the whole family
🚫 Not just leaders or warriors
👧 Daughters are specifically included
📖 Every member shares this failure
---
## 🙈 I Will Hide My Face From Them

A hidden face in scripture pictures withdrawn favor and protection, not literal invisibility.

God is not vanishing or ceasing to exist.

He is describing the painful experience of losing access to his help and guidance.

This becomes the exact fear Israel lives out later in exile.

🙈 Hidden face means withdrawn favor
🚫 Not about literal invisibility
😔 It pictures losing help and guidance
📖 This becomes Israel's exile experience
---
## 🙄 A Very Froward Generation

Froward is an old word for stubborn and willfully disobedient.

It describes someone who knows the right path and deliberately turns from it anyway.

This is stronger than simply being led astray by accident.

The word choice removes any excuse of ignorance.

🙄 Froward means stubborn on purpose
🚫 Not simple accidental wandering
👣 They knew the path and turned anyway
📖 The word removes any excuse
---
## 🤝 Children In Whom Is No Faith

Faith here means trustworthiness or reliability, not only belief.

These children cannot be counted on to keep their word or their covenant.

The whole family metaphor from earlier verses turns painful here.

A parent's worst fear is children who cannot be trusted.

🤝 Faith means trustworthy not just belief
🚫 They cannot be counted on
👪 The family metaphor turns painful
📖 Untrustworthy children are a parent's fear
---
## 🌫️ They Have Provoked Me To Anger With Their Vanities

Vanities is a common Old Testament word for idols, things that are empty and worthless.

An idol has no real power, no matter how much devotion it receives.

Trading a living Rock for something empty is called out plainly here.

The word choice itself is an insult to every idol Israel chased.

🌫️ Vanities means empty worthless idols
🚫 Idols have no real power
🔄 A living Rock traded for nothing
📖 The word itself insults every idol
---
## 🔄 I Will Move Them To Jealousy With Those Which Are Not A People

God announces a coming reversal using Israel's own words back at them.

Israel provoked God with what is not God, so God will provoke Israel the same way.

This points forward to Gentile nations later grafted into God's family, as Paul explains in Romans.

The punishment is designed to mirror the exact shape of the original offense.

🔄 God mirrors Israel's own words back
🌍 Points forward to Gentile inclusion later
📜 Romans later explains this exact verse
📖 The punishment mirrors the offense's shape
---
## 🔁 I Will Provoke Them To Anger With A Foolish Nation

Foolish nation repeats the insult pattern one more time, aimed back at Israel's own choice.

This whole verse works like a courtroom sentence matched exactly to the crime.

Every phrase in this verse has a matching partner earlier in the same verse.

Consequences here are not random, they are precisely measured.

🔁 Foolish nation repeats the insult pattern
⚖️ The verse reads like a matched sentence
🔗 Every phrase pairs with an earlier one
📖 Consequences here are precisely measured

# Deuteronomy 32:22-25
# 🔥 A Fire Is Kindled In Mine Anger
---
## 🔥 A Fire Is Kindled In Mine Anger

Fire pictures judgment that spreads and consumes on its own once it starts.

This is not a sudden flash that burns out quickly.

Kindled means deliberately started, not accidental.

God names his own anger as the source, without pretending otherwise.

🔥 Fire pictures spreading judgment
⏳ Not a quick flash that fades
🕯️ Kindled means deliberately started
📖 God names his own anger honestly
---
## ⬇️ Shall Burn Unto The Lowest Hell

Lowest hell here translates a word for the grave, not the later doctrine of eternal punishment.

The image pictures judgment reaching the absolute bottom, leaving nothing untouched.

Height and depth both appear in this verse to cover every possible direction.

Nowhere is described as safely out of reach.

⬇️ Lowest hell means the deepest grave
🔥 Judgment reaches the absolute bottom
↕️ Height and depth cover every direction
📖 Nowhere is safely out of reach
---
## ⛰️ Set On Fire The Foundations Of The Mountains

Mountains were the most permanent, unshakable landmarks people knew in this world.

Even their foundations, the part nobody could see or reach, catch fire here.

If mountain foundations are not safe, nothing built by nature is safe either.

The picture stretches judgment past anything human hands could survive.

⛰️ Mountains were the most permanent landmarks
🔥 Even their hidden foundations catch fire
🚫 Nothing built by nature is safe
📖 Judgment stretches past human survival
---
## 💥 I Will Heap Mischiefs Upon Them

Mischiefs here means real disasters, not small pranks or minor trouble.

Heap pictures piling one disaster directly on top of another without pause.

The word choice sounds almost gentle to modern ears but was not gentle at all.

Old English words can quietly soften verses that were never meant to sound soft.

💥 Mischiefs means real disasters
📚 Heap means piling one on another
🚫 The old word is not gentle
📖 Old spelling can hide a harsh meaning
---
## 🏹 I Will Spend Mine Arrows Upon Them

Spend here means to use up completely, not casually toss.

An archer pictured here empties an entire quiver rather than firing a single warning shot.

This is total judgment, not a light correction.

The imagery keeps escalating verse by verse without letting up.

🏹 Spend means using up completely
🎯 Pictures emptying a whole quiver
🚫 Not a light single warning shot
📖 The escalation continues without letting up
---
## 🌾 Burnt With Hunger And Devoured With Burning Heat

Hunger and heat together picture the twin disasters of famine and drought.

Both threats were constantly real dangers for any ancient farming community.

Pairing them multiplies suffering instead of describing only one hardship.

Nature itself becomes part of the judgment here.

🌾 Hunger and heat mean famine and drought
🌍 Both were real ancient farming dangers
📈 Pairing them multiplies the suffering
📖 Nature itself becomes the judgment
---
## 🐺 The Teeth Of Beasts Upon Them

Wild animal attacks were a genuine, common danger in the ancient world.

Naming this threat directly makes the judgment concrete rather than abstract poetry.

Leviticus already listed wild beasts among the covenant curses for disobedience.

The threat is not invented here, it echoes an older warning.

🐺 Wild animal attacks were a real danger
📜 Leviticus already listed this same curse
🔗 The threat echoes an older warning
📖 Judgment stays concrete not abstract
---
## 🐍 The Poison Of Serpents Of The Dust

Serpents of the dust pictures snakes hiding low and unseen along the ground.

Danger here comes from below, not from an obvious attacking army.

This kind of threat strikes without warning, often too late to escape.

The list of dangers now covers hunger, heat, beasts, and hidden poison.

🐍 Serpents of the dust hide unseen
⬇️ Danger comes from below this time
⚡ It strikes without warning
📖 Four different dangers now stack together
---
## ⚔️ The Sword Without And Terror Within

Sword without pictures enemy armies attacking from outside the city walls.

Terror within pictures fear and panic spreading inside the walls at the very same time.

No safe direction is left, outside and inside both bring danger.

This is total war, on every front at once.

⚔️ Sword without means outside attack
😱 Terror within means inside panic
🚫 No safe direction remains
📖 Total war on every front
---
## 👶 The Young Man And The Virgin The Suckling With The Man Of Gray Hairs

This list moves through every age of life, young men, young women, infants, and the elderly.

Suckling means a nursing infant, still dependent on its mother.

Gray hairs pictures the oldest members of the community.

Judgment here shows no regard for age or innocence.

👶 Suckling means a nursing infant
👴 Gray hairs pictures the elderly
👥 Every age of life is listed
📖 Judgment shows no regard for age

# Deuteronomy 32:26-31
# ⚔️ I Would Scatter Them Into Corners
---
## 🌍 I Would Scatter Them Into Corners

God considers total dispersal, scattering Israel to every distant corner of the world.

This is a real threat, not an exaggeration for poetic effect.

Scripture elsewhere describes exile in exactly these terms.

Judgment could have gone this far, completely erasing the nation.

🌍 God considers total worldwide scattering
🚫 Not exaggeration for poetic effect
📜 Exile elsewhere uses this same language
📖 The nation could have been erased
---
## 🧠 Make The Remembrance Of Them To Cease From Among Men

Remembrance here means the nation's name and memory in history itself.

This pictures Israel disappearing so completely that no one remembers they existed.

That would erase the very family line this whole song has been tracing.

The threat reaches back to undo everything Moses has celebrated so far.

🧠 Remembrance means memory in history
🚫 Israel could vanish completely
👪 It would erase the family line
📖 This threat undoes what was celebrated
---
## ✋ Were It Not That I Feared The Wrath Of The Enemy

God gives a reason he holds this judgment back, and it is surprising.

He is not restrained by pity toward Israel in this particular line.

He is concerned about what Israel's enemies would wrongly conclude instead.

Even God's mercy here is shaped around protecting his own reputation.

✋ God explains why he holds back
❓ Not pity toward Israel this time
👀 Concerned about the enemy's conclusion
📖 God's reputation shapes his mercy here
---
## 👊 Our Hand Is High And The LORD Hath Not Done This

Enemy nations would misread Israel's defeat as their own gods winning a real fight.

Hand is high is an old idiom meaning boastful and victorious.

That false conclusion would spread further confusion about who actually rules history.

God restrains judgment partly to prevent that lie from taking hold.

👊 Hand is high means boastful victory
🙅 Enemies would credit the wrong god
🌍 A lie about history would spread
📖 God restrains judgment to stop that lie
---
## 🧠 A Nation Void Of Counsel

Void of counsel means lacking wisdom or good advice entirely.

This is not a compliment hidden inside an insult.

Israel is being described the same way the pagan nations were described elsewhere.

The child of the Rock now resembles the nations it was set apart from.

🧠 Void of counsel means lacking wisdom
🚫 Not a hidden compliment here
🔄 Israel now resembles the pagan nations
📖 The set apart child looks common
---
## 😔 O That They Were Wise

This line reads almost like a parent's exhausted sigh.

Moses is not simply reporting facts anymore, he is longing out loud.

Wisdom here specifically means understanding the consequences already listed.

The tone shifts from courtroom charge to genuine heartbreak.

😔 This reads like an exhausted sigh
🗣️ Moses longs out loud here
🧠 Wisdom means grasping the consequences
📖 The tone shifts to heartbreak
---
## 🔭 Consider Their Latter End

Latter end means the final outcome a path leads to, not just the next step.

Israel keeps failing to connect present choices to future consequences.

This same warning already appeared back in verse twenty of this song.

Wisdom, in this song, mostly just means thinking further ahead.

🔭 Latter end means the final outcome
🔗 Israel fails to connect choices to results
🔁 The warning already appeared earlier
📖 Wisdom here means thinking further ahead
---
## 🔢 How Should One Chase A Thousand And Two Put Ten Thousand To Flight

This riddle describes lopsided victories that make no normal military sense.

One or two enemy soldiers should never be able to rout entire armies alone.

The math itself is the clue that something beyond ordinary strength is happening.

Impossible battle outcomes point straight back to which Rock was really fighting.

🔢 The math described makes no sense
⚔️ One or two should not rout armies
🧩 The math itself is the clue
📖 Impossible outcomes point to which Rock fights
---
## 💰 Except Their Rock Had Sold Them

Sold pictures a deliberate transaction, not an accident or an oversight.

God is described handing Israel over to their enemies on purpose.

This is not God losing control of events.

Even the defeats in this song stay under God's own authority.

💰 Sold pictures a deliberate transaction
🤲 God hands Israel over on purpose
🚫 Not God losing control at all
📖 Even defeat stays under God's authority
---
## 🪨 For Their Rock Is Not As Our Rock

This is the first time the enemy nations get their own rock title in this song.

Moses immediately draws the sharpest possible contrast between the two.

Every false god so far has been described as empty or powerless.

Only one Rock in this entire song is ever described as real.

🪨 Enemy nations get their own rock title
⚖️ Moses draws the sharpest contrast yet
🚫 False gods are empty and powerless
📖 Only one Rock here is ever real
---
## ⚖️ Our Enemies Themselves Being Judges

Even Israel's enemies are pictured admitting the truth of this comparison.

Judges here means people qualified to weigh evidence and decide the truth.

If even the opposition agrees, the point becomes impossible to dispute.

This is the strongest kind of proof, a hostile witness confirming the case.

⚖️ Judges weigh evidence and decide truth
👥 Even enemies admit this truth
🚫 The point becomes impossible to dispute
📖 A hostile witness makes the strongest proof

# Deuteronomy 32:32-35
# 🍇 Their Vine Is Of The Vine Of Sodom
---
## 🍇 Their Vine Is Of The Vine Of Sodom

This verse switches from describing Israel to describing the enemy nations.

Sodom was already a byword for total corruption and coming judgment.

Calling the enemy's very source connected to Sodom marks them from the root.

Rotten fruit here is traced all the way back to a rotten source.

🍇 The focus shifts to enemy nations
🔥 Sodom was a byword for corruption
🌱 Their source is marked from the root
📖 Rotten fruit traces to a rotten source
---
## 🌿 Grapes Of Gall Their Clusters Are Bitter

Gall is a bitter, sometimes poisonous plant substance in the Old Testament.

A vine that should produce sweet fruit instead produces something bitter and harmful.

The image works because it inverts what a vine is normally for.

Appearance promised nourishment while the reality delivered poison.

🌿 Gall means a bitter poisonous substance
🍇 A vine meant for sweetness turns bitter
🔄 The image inverts a vine's normal purpose
📖 Appearance promised good but delivered poison
---
## 🐍 The Poison Of Dragons

Dragons here translates a word most scholars connect to jackals or venomous desert creatures, not mythical winged beasts.

The wine these nations offer is described as something venomous rather than refreshing.

Drinking their culture and their gods is pictured as literally toxic.

Nothing about the enemy's apparent strength was ever safe to imitate.

🐍 Dragons likely means jackals or venomous creatures
🍷 Their wine is pictured as venomous
☠️ Their culture is toxic not refreshing
📖 Their strength was never safe to imitate
---
## 😖 The Cruel Venom Of Asps

Asps are a type of venomous snake known in the ancient Near East.

Cruel venom pictures a poison that causes real, deliberate suffering, not a quick painless end.

This closes out the poison imagery that has run through the last two verses.

The enemy's wine matches the enemy's rock, both false and both fatal.

🐍 Asps are venomous ancient snakes
😖 Cruel venom means deliberate suffering
🔗 This closes the poison imagery
📖 Their wine matches their false rock
---
## 📦 Is Not This Laid Up In Store With Me

Laid up in store pictures something carefully saved and kept for later use.

God is not improvising judgment on the enemy in the moment.

This has already been planned and set aside in advance.

Nothing about coming judgment catches God off guard.

📦 Laid up in store means saved for later
🚫 Not improvised in the moment
📅 Judgment was already planned in advance
📖 Nothing catches God off guard
---
## 🔒 Sealed Up Among My Treasures

Sealing something in the ancient world meant locking it away securely until the right time.

Treasures pictures something valuable, kept safe rather than casually spent.

Even judgment is described as something God guards carefully rather than releases carelessly.

Timing here belongs entirely to God, not to human impatience.

🔒 Sealing meant locking away securely
💎 Treasures means kept safe not spent carelessly
⏳ Even judgment is guarded carefully
📖 Timing belongs to God alone
---
## ⚖️ To Me Belongeth Vengeance And Recompence

Belongeth is an old form of belongs.

Recompence means paying back what is fully deserved.

This line hands the entire right to punish back to God alone.

No human being, including Israel, is authorized to carry this out personally.

⚖️ Belongeth is an old form of belongs
💰 Recompence means paying back what is owed
🙅 This right belongs to God alone
📖 No human carries this out personally
---
## 🦶 Their Foot Shall Slide In Due Time

A sliding foot pictures someone losing their footing and falling suddenly.

Due time means the timing is fixed, even if it feels delayed to a watching person.

The image suggests a fall that looks accidental but is actually planned.

Judgment arrives exactly when it is meant to, not early and not late.

🦶 A sliding foot means sudden falling
⏰ Due time means a fixed timing
🎯 The fall looks accidental but is planned
📖 Judgment arrives exactly on time
---
## 🏃 The Things That Shall Come Upon Them Make Haste

Make haste means moving quickly, without delay.

After describing patient, stored up judgment, the pace here suddenly speeds up.

The waiting period is real, but it is not endless.

Patience and speed are both true about how God judges, at different times.

🏃 Make haste means moving without delay
⏳ The pace suddenly speeds up here
🚫 Waiting is real but not endless
📖 Patience and speed both describe God's timing

# Deuteronomy 32:36-38
# ⚖️ The LORD Shall Judge His People
---
## ⚖️ The LORD Shall Judge His People

Judge here can also mean vindicate or defend, not only punish.

The same word covers both a courtroom conviction and a courtroom rescue.

Context, not the word alone, decides which meaning fits a given verse.

Here the shift that follows shows this judging leans toward mercy.

⚖️ Judge can mean vindicate not just punish
📜 One word covers both meanings
🔍 Context decides which meaning fits
📖 Here judging leans toward mercy
---
## 🔄 Repent Himself For His Servants

Repent here does not mean God sinned and turned from wrongdoing.

It means God changes his course of action in response to a changed situation.

Servants shows a shift back to a gentler relationship term for Israel.

The harsh judgment described earlier is not the end of the story.

🔄 Repent means changing course not sinning
🙏 Servants is a gentler relationship word
📉 This is not the end of judgment
📖 Mercy still has the final word
---
## 📉 When He Seeth That Their Power Is Gone

This pictures Israel brought completely low, with no strength left to save themselves.

Rescue only arrives once every human option has clearly run out.

God's help was never meant to be one option among several.

The lowest point becomes the exact moment mercy shows up.

📉 Israel is pictured completely powerless
🚫 Rescue waits until options run out
🙅 God was never one option among many
📖 The lowest point is when mercy arrives
---
## ❓ Where Are Their Gods Their Rock In Whom They Trusted

God asks Israel the exact taunting question their enemies once asked about them.

This turns the earlier insult back onto the false gods Israel chased.

Rock, the title used only for the true God so far, gets thrown back sarcastically.

The word choice itself becomes part of the mockery.

❓ God asks the taunting question directly
🔄 The insult turns back on false gods
🪨 Rock gets used sarcastically here
📖 Word choice itself becomes mockery
---
## 🍖 Which Did Eat The Fat Of Their Sacrifices

This describes idols receiving costly offerings meant to please and feed them.

Ancient worshipers genuinely believed their gods consumed some portion of a sacrifice.

The verse exposes how much was spent on gods that gave nothing back.

All that cost bought exactly nothing in return.

🍖 Idols supposedly ate offered fat
🙏 Worshipers believed gods consumed sacrifices
💸 Real cost was spent on empty gods
📖 All that cost bought nothing back
---
## 🙋 Let Them Rise Up And Help You

God directly challenges the false gods to actually do something for once.

This is not a real invitation, it is a public exposure of their uselessness.

Silence is the only possible answer, since these gods were never real.

The taunt makes the same point argument alone could not land as sharply.

🙋 God challenges false gods to act
🎭 This exposes them rather than invites them
🤐 Silence is the only possible answer
📖 A taunt lands harder than argument

# Deuteronomy 32:39-43
# 👁️ See Now That I Even I Am He
---
## ☝️ See Now That I Even I Am He

The doubled I, even I, is a Hebrew way of stressing total exclusivity.

After a whole song naming false gods, God speaks in his own voice for the first time.

This is the strongest possible claim to being the only real God in the entire song.

Every empty god named earlier gets silenced by this one line.

☝️ Doubled I stresses total exclusivity
🗣️ God speaks directly for the first time
🏆 The strongest claim in the whole song
📖 Every false god is silenced here
---
## 💀 I Kill And I Make Alive

This pairs the two most extreme powers a human being could never claim.

No false god named earlier in the song can genuinely control life and death.

Kill and heal in the next line repeat the same pattern of total control.

Real power is defined here as authority over both ends of existence.

💀 Two extreme powers named together
🚫 No false god can control life and death
🔁 The next line repeats the same pattern
📖 Real power spans both ends of life
---
## 🙅 Neither Is There Any That Can Deliver Out Of My Hand

Deliver here means rescue or save someone from a stronger power.

This directly contradicts anything the false gods claimed to offer their worshipers.

No hiding place and no rival power exists outside God's reach.

The verse closes the same way it opened, with total exclusivity.

🙅 Deliver means rescue from a stronger power
🚫 This contradicts every false god's promise
🌍 No hiding place exists outside God's reach
📖 The verse closes on total exclusivity
---
## 🙋 I Lift Up My Hand To Heaven

Lifting a hand toward heaven was a common ancient gesture for swearing a solemn oath.

God is pictured taking an oath using the same posture humans used with each other.

The gesture makes an abstract promise feel like a concrete, binding act.

Even the language of oaths gets borrowed to describe God's own certainty.

🙋 Lifting a hand was an oath gesture
🤝 God is pictured taking an oath
📜 The gesture makes the promise concrete
📖 Human oath language describes God's certainty
---
## ♾️ I Live For Ever

This short line stands in sharp contrast to every idol just mocked as lifeless and silent.

An idol cannot outlast its own worshipers, let alone all of history.

God's permanence becomes the very guarantee behind every promise in this song.

A promise only means something if the one making it cannot disappear.

♾️ Contrasts with the lifeless idols mocked earlier
🚫 Idols cannot outlast their worshipers
🏛️ God's permanence backs every promise
📖 A promise needs someone who cannot vanish
---
## 🗡️ If I Whet My Glittering Sword

Whet means to sharpen a blade against a stone.

Glittering pictures a freshly sharpened edge catching the light, ready and unmistakably visible.

The image shifts God from courtroom judge into an active warrior preparing for battle.

This is judgment about to move from words into action.

🗡️ Whet means sharpening a blade
✨ Glittering pictures a freshly sharpened edge
⚔️ God shifts from judge to warrior
📖 Judgment moves from words to action
---
## 💰 I Will Render Vengeance To Mine Enemies

Render here means to pay back in full measure.

This vengeance is not petty or emotional, it is precise and deserved.

The word previously described what belonged to God alone back in verse thirty five.

That earlier promise is now shown being kept in real time.

💰 Render means paying back in full
⚖️ This vengeance is precise not petty
🔗 Matches the promise from verse thirty five
📖 An earlier promise now gets kept
---
## 🏹 Mine Arrows Drunk With Blood

This graphic image describes arrows so thoroughly used in battle that they seem soaked through.

Ancient poetry often used vivid, physical images rather than abstract description.

The picture is meant to feel uncomfortable, not softened for a modern reader.

Real judgment in scripture is rarely described gently.

🏹 Arrows described as soaked with blood
🎨 Ancient poetry favored vivid physical images
😬 The picture is meant to feel uncomfortable
📖 Scripture rarely describes judgment gently
---
## ⚔️ The Blood Of The Slain And Of The Captives

Slain refers to enemies killed in the fighting itself.

Captives refers to prisoners taken during or after the same battles.

Naming both groups shows judgment reaching everyone connected to the conflict, not only soldiers.

The scope here is deliberately complete.

⚔️ Slain means enemies killed in battle
🔗 Captives means prisoners taken afterward
👥 Both groups are named deliberately
📖 The scope of judgment is complete
---
## 🎉 Rejoice O Ye Nations With His People

This surprising invitation calls outside nations to celebrate alongside Israel.

Earlier in the song, nations only appeared as threats or false comparisons.

Here for the first time they are welcomed into shared joy instead.

The ending widens rather than narrows who gets to celebrate.

🎉 Nations are invited to celebrate too
⚔️ Earlier nations only appeared as threats
🤝 Here they join in shared joy
📖 The ending widens who can celebrate
---
## 🌍 He Will Be Merciful Unto His Land And To His People

Land and people are named together as both needing and receiving mercy.

The very ground itself was described earlier as suffering under Israel's judgment.

Restoration here reaches beyond just the people to the physical land they live on.

The whole song, after every warning, still ends on mercy.

🌍 Land and people both receive mercy
📉 The land itself suffered earlier judgment
🌱 Restoration reaches the physical land too
📖 The whole song still ends on mercy

# Deuteronomy 32:44-47
# 🗣️ Set Your Hearts Unto These Words
---
## 🗣️ Moses Came And Spake All The Words Of This Song

This verse marks the moment the poem just read finally gets spoken out loud to Israel.

Every verse before this one was the content, this line is the delivery.

The whole camp hears their own history and future in one sitting.

Writing the song mattered less than making sure it actually got heard.

🗣️ The song is now delivered aloud
📜 Every earlier verse was the content
👥 The whole camp hears it together
📖 Being heard mattered as much as being written
---
## 📛 He And Hoshea The Son Of Nun

Hoshea was Joshua's original name before Moses renamed him back in Numbers thirteen.

Using the old name here quietly connects Joshua all the way back to the spy mission.

Joshua stands beside Moses at this exact moment of transition.

The next leader is present to hear the very words he will need to enforce.

📛 Hoshea was Joshua's original name
🔗 Connects back to the Numbers spy mission
🤝 Joshua stands beside Moses here
📖 The next leader hears these same words
---
## 🏁 Moses Made An End Of Speaking All These Words

This short verse marks a clear conclusion, not just a pause.

The long farewell sermon spanning many chapters has now genuinely finished.

Every word Moses had to say to this generation has now been said.

What comes next belongs to a new leader entirely.

🏁 This marks a genuine conclusion
📚 The long farewell sermon has finished
🗣️ Every needed word has been said
📖 What follows belongs to a new leader
---
## ❤️ Set Your Hearts Unto All The Words

Set your hearts means far more than simply paying attention for a moment.

It describes taking something in deeply enough to shape ongoing decisions.

Hearing the song once was never going to be enough on its own.

Real change starts with where attention actually settles, not just what is heard.

❤️ Set your hearts means more than listening
🧠 It means letting something shape decisions
🚫 Hearing once was never enough alone
📖 Change starts with where attention settles
---
## 🧒 Which Ye Shall Command Your Children To Observe

This command specifically targets the next generation, not only the people currently listening.

Passing the law forward was never optional or left to personal preference.

Deuteronomy chapter six already commanded parents to teach these same words at home.

A covenant only survives as long as someone keeps retelling it.

🧒 This targets the next generation directly
📜 Passing it forward was never optional
🔗 Chapter six already commanded this same duty
📖 A covenant survives through retelling
---
## 🌫️ It Is Not A Vain Thing For You

Vain here means empty, pointless, or without real value.

Moses directly answers a doubt Israel might quietly be feeling about all this law.

The law was never busywork handed down to fill time.

Real purpose sits behind every command this song and this book contain.

🌫️ Vain means empty or pointless
❓ Moses answers a quiet unspoken doubt
🚫 The law was never busywork
📖 Real purpose sits behind every command
---
## ❤️ Because It Is Your Life

This flips the entire conversation from obligation into survival.

The law was never separate from daily living, it was the terms of that living itself.

Life here means more than staying alive, it means life under God's blessing.

Obedience and flourishing are pictured as the very same thing.

❤️ The law is tied to survival itself
🔗 Not separate from daily living
🌱 Life means flourishing not just existing
📖 Obedience and flourishing are the same thing
---
## ⏳ Ye Shall Prolong Your Days In The Land

Prolong means to extend or lengthen something that already exists.

This same promise has appeared repeatedly across Deuteronomy tied to obedience.

Whither ye go over Jordan points directly at the very next step in Israel's story.

The whole song ends by pointing straight at tomorrow.

⏳ Prolong means to extend or lengthen
🔁 This promise repeats across Deuteronomy
🌊 Jordan points at Israel's very next step
📖 The song ends pointing at tomorrow

# Deuteronomy 32:48-52
# 🏔️ Get Thee Up Into This Mountain
---
## 📅 The LORD Spake Unto Moses That Selfsame Day

Selfsame day means that exact same day, with no delay in between.

Moses finishes delivering the song and immediately receives new instructions.

There is no pause given for reflection or rest after such a heavy moment.

The pace of these final chapters keeps moving quickly toward the ending.

📅 Selfsame day means that exact day
🏃 No delay between the song and this
⏸️ No pause given for reflection here
📖 The final chapters keep moving quickly
---
## 🏔️ Get Thee Up Into This Mountain Abarim Unto Mount Nebo

Abarim was a mountain range east of the Jordan River.

Nebo was one specific peak within that same range.

This is the same mountain Balaam once stood on to view Israel's camp back in Numbers.

The place has already appeared once earlier in Israel's story.

🏔️ Abarim was a mountain range east of Jordan
📍 Nebo was one peak within it
🔗 Balaam stood here earlier in Numbers
📖 The place already carries history
---
## 📍 Which Is In The Land Of Moab That Is Over Against Jericho

Moab was the territory where Israel had been camped throughout Deuteronomy.

Jericho was the first walled city Israel would face after crossing the Jordan.

Naming Jericho already points toward the very next battle in Israel's future.

Moses can see the beginning of the next chapter of the story, but only from a distance.

📍 Moab is where Israel is currently camped
🏰 Jericho is the next city Israel faces
👀 Moses can see it from a distance
📖 He sees the future but stays outside it
---
## 👀 Behold The Land Of Canaan

Behold means look carefully, not just glance.

Moses is invited to truly take in the view before anything else happens.

This is the land promised all the way back to Abraham in Genesis.

A lifetime of waiting gets one long, careful look before it ends.

👀 Behold means look carefully not glance
📜 The promise traces back to Abraham
⏳ A lifetime of waiting leads to this
📖 One careful look before the ending
---
## ⛰️ Die In The Mount Whither Thou Goest Up

Moses is told plainly and directly that this mountain will be where his life ends.

There is no soft language used to cushion the announcement.

He climbs the mountain already knowing he will not climb back down.

Few deaths in scripture are announced this far in advance.

⛰️ Moses is told this mountain ends his life
🚫 No soft language cushions it
🚶 He climbs already knowing the outcome
📖 Few deaths are announced this far ahead
---
## 🤝 Be Gathered Unto Thy People

This is a gentler old phrase for joining ancestors who have already died.

It pictures death as reunion rather than a simple ending.

The same phrase already described Aaron's death back in Numbers chapter twenty.

Moses now faces the exact same fate his brother already faced.

🤝 A gentler phrase for joining ancestors
🚫 Not simply an ending
🔗 Already used for Aaron's death
📖 Moses faces his brother's same fate
---
## 👬 As Aaron Thy Brother Died In Mount Hor

Aaron died on Mount Hor years earlier, recorded back in Numbers chapter twenty.

Both brothers die on a mountain rather than reaching the promised land themselves.

Their shared consequence traces back to the exact same incident at the rock.

Even in death, these two brothers' stories run in parallel.

⛰️ Aaron died on Mount Hor earlier
👬 Neither brother reaches the promised land
🪨 Both share the same rock incident
📖 Their stories run in parallel to the end
---
## 📍 Because Ye Trespassed Against Me At The Waters Of MeribahKadesh

This location name combines two words, Meribah meaning strife and Kadesh, the surrounding region.

Numbers chapter twenty records Moses striking a rock in anger instead of speaking to it as commanded.

That single moment of disobedience is repeated here as the reason, one more time before the end.

Consequences from years earlier still reach all the way to this final chapter.

📍 The name combines strife and a region
🪨 Numbers twenty records the striking incident
🔁 The reason gets repeated once more
📖 An old consequence reaches the final chapter
---
## 🙏 Ye Sanctified Me Not In The Midst Of The Children Of Israel

Sanctified here means treated as holy, set apart, and worthy of honor.

Moses failed to publicly credit God as the one who provided the water that day.

The failure was small in action but large in what it communicated to the whole nation.

Public leaders carry a public responsibility to represent God accurately.

🙏 Sanctified means treated as holy
💧 Moses failed to credit God for the water
📢 A small failure with a public effect
📖 Leaders must represent God accurately
---
## 👀 Thou Shalt See The Land Before Thee

Sight is granted even though entry is refused.

This is not total exclusion, it is a specific and limited consequence.

Moses gets to witness the fulfillment of a promise he will not personally enjoy.

Grace and consequence sit side by side in this same closing verse.

👀 Sight is granted despite the refusal
🚫 Not total exclusion, a limited consequence
🎁 He witnesses a promise he cannot enjoy
📖 Grace and consequence sit side by side
---
## 📍 But Thou Shalt Not Go Thither Unto The Land

Thither is an old word simply meaning to that place.

The chapter, and the song before it, both end on this same bittersweet note.

Moses spends his whole life leading Israel toward a land he will only ever view.

The Song of Moses closes with the man who wrote it standing just outside the promise.

📍 Thither is an old word for there
😔 The chapter ends on a bittersweet note
🚶 Moses only ever views the land
📖 He stands just outside his own promise
`.trim();

export const DEUTERONOMY_THIRTY_TWO_PERSONAL_SECTIONS = parseDeuteronomyThirtyTwoRawNotes(DEUTERONOMY_THIRTY_TWO_RAW_NOTES);
