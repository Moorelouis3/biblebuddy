export type IsaiahFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiveRawNotes(rawText: string): IsaiahFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 5:${startVerse}` : `Isaiah 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 5 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIVE_RAW_NOTES = `# Isaiah 5:1-7
# 🍇 The Song Of The Vineyard
---
## 🎤 Now Will I Sing To My Wellbeloved

Wellbeloved here does not mean an ordinary friend.

Isaiah sings this song on behalf of the LORD, his true wellbeloved.

Ancient love songs and vineyard songs were common at harvest celebrations.

Isaiah borrows that familiar tune to sing about something far more serious.

🎤 Wellbeloved refers to the LORD himself
🎶 Isaiah borrows a familiar love song style
🍇 The subject is a vineyard, not romance
📖 A happy tune sets up a hard message
---
## ⛰️ My Wellbeloved Hath A Vineyard In A Very Fruitful Hill

A fruitful hill meant rich soil with good drainage for growing grapes.

Farmers of this time chose hillsides on purpose for the best vineyards.

This vineyard began with every advantage a grower could want.

Nothing about its location explains any failure that follows.

⛰️ A fruitful hill meant ideal soil
🍇 Hillsides were chosen on purpose for vines
✅ This vineyard started with every advantage
📖 Its location cannot explain what happens next
---
## 🧱 He Fenced It, And Gathered Out The Stones Thereof

A fence kept out animals that would trample or eat the young vines.

Clearing stones by hand made room for roots to grow properly.

Both jobs took real time and hard physical labor.

This picture describes careful, patient preparation, not a quick or lazy effort.

🧱 A fence protected the young vines
🪨 Clearing stones made room to grow
💪 Both jobs took hard labor
📖 Every detail shows careful preparation
---
## 🍷 Planted It With The Choicest Vine, And Built A Tower

Choicest vine means the very best variety of grape available.

A tower let a watchman guard the vineyard from thieves and animals.

Building a winepress in advance meant expecting a harvest worth pressing.

Every choice here points toward one goal, a rich and reliable crop.

🍇 Choicest vine meant the best variety
🗼 A tower let a watchman guard it
🍷 A winepress was built ahead of time
📖 Every choice aimed at a rich harvest
---
## 😞 It Brought Forth Wild Grapes

Wild grapes were small, sour, and useless for making good wine.

Nothing about the vineyard's care explains this kind of failure.

The best soil, the best vine, and the best care still failed here.

The failure came from something other than the vineyard's conditions.

😞 Wild grapes were sour and useless
❓ Nothing about the care explains this
🍇 Every advantage still ended in failure
📖 The problem lies somewhere else entirely
---
## ⚖️ Judge, I Pray You, Betwixt Me And My Vineyard

The song suddenly shifts into a courtroom scene.

Betwixt means between, an older word for the same idea.

The singer asks the listeners to act as judges over this case.

The people of Jerusalem and Judah are being pulled into the story themselves.

⚖️ The song shifts into a courtroom
🗣️ Betwixt is an older word for between
👥 The listeners are asked to judge
📖 Jerusalem and Judah become part of the case
---
## ❓ What Could Have Been Done More To My Vineyard

This question expects one honest answer, nothing.

The vineyard received the best soil, the best vine, and careful labor.

No excuse remains once every possible cause is ruled out.

The question puts the blame back where it actually belongs.

❓ The question expects the answer nothing
🍇 Every possible advantage was already given
🚫 No outside excuse remains
📖 The blame lands on the vineyard itself
---
## 🧱 I Will Take Away The Hedge Thereof

A hedge or wall kept wild animals from destroying the vines.

Removing that protection on purpose exposed the vineyard to ruin.

This was not neglect, it was a deliberate decision by the owner.

The same owner who built the protection now chooses to take it away.

🧱 A hedge kept animals from destroying vines
🚪 Removing it exposed the vineyard on purpose
✋ This was a deliberate choice, not neglect
📖 The protector becomes the one removing it
---
## 🌵 It Shall Not Be Pruned, Nor Digged, But There Shall Come Up Briers And Thorns

Pruning and digging were the normal, ongoing work of keeping a vineyard alive.

Without that work, useless plants like briers and thorns take over instantly.

This pictures total abandonment, not a temporary setback.

A once carefully tended vineyard is left to return to the wild.

✂️ Pruning and digging kept the vineyard alive
🌵 Briers and thorns picture abandonment
⏳ This is not temporary, it is total
📖 Care is fully withdrawn
---
## ☁️ I Will Also Command The Clouds That They Rain No Rain Upon It

This line moves past the vineyard's fence and soil entirely.

God claims direct command even over the clouds and the rain itself.

No human neglect could ever cause a drought this total.

The judgment reaches beyond anything the vineyard's caretakers could control.

☁️ God commands the clouds directly
🌧️ Even the rain obeys him
🚫 No human neglect explains a drought like this
📖 The judgment reaches beyond human control
---
## 🏡 The Vineyard Of The LORD Of Hosts Is The House Of Israel

The song finally reveals what the vineyard was always about.

Israel and the men of Judah are the vineyard in this story.

Every detail about soil, fence, and care now points back at them.

The listeners who were asked to judge have just judged themselves.

🏡 The vineyard represents the house of Israel
🔁 Every earlier detail now points at them
👥 The listeners judged themselves without knowing it
📖 The song was never really about grapes
---
## 😢 He Looked For Judgment, But Behold Oppression, For Righteousness, But Behold A Cry

In the original Hebrew, the words for judgment and oppression sound nearly alike.

The words for righteousness and a cry of pain sound nearly alike too.

Isaiah uses that closeness on purpose to show how near good was to disaster.

What God expected and what he found were painfully close in sound, but opposite in meaning.

🔤 The Hebrew words sound almost the same
⚖️ Judgment and oppression are nearly identical in sound
😢 Righteousness and a cry are nearly identical too
📖 Good and disaster stood painfully close together
---
# Isaiah 5:8-10
# 🏠 Joining House To House
---
## 😔 Woe Unto Them

Woe is not simply an expression of sadness.

It was a formal word prophets used to announce coming judgment.

Hearing woe warned the original audience that punishment was on its way.

This chapter repeats that word again and again over what follows.

😔 Woe announces coming judgment
📢 Prophets used it as a formal warning
⚠️ The original audience knew what it meant
📖 This word repeats often in this chapter
---
## 🏘️ That Join House To House, That Lay Field To Field

Israel's land laws were designed to keep property spread among many families.

Land could not normally be bought up permanently and combined without limit.

Joining house to house describes the wealthy breaking that design through greed.

Small landowners were being pushed out as larger estates swallowed their property.

🏘️ Land laws kept property spread among families
💰 Wealthy buyers ignored that design
🏠 Small landowners were pushed out
📖 Greed broke the system on purpose
---
## 🏝️ That They May Be Placed Alone In The Midst Of The Earth

This describes the goal behind all that land buying.

The wealthy wanted to own entire regions with no other owners left.

Every neighbor and every small farmer would eventually be crowded out.

Total ownership was the real aim, not simply extra income.

🏝️ The goal was owning entire regions alone
👥 Neighbors would be crowded out completely
💰 Extra income was not the real aim
📖 Total control was the true goal
---
## 👂 In Mine Ears Said The LORD Of Hosts

This phrase signals a personal message Isaiah heard directly.

It marks the words that follow as coming straight from God, not Isaiah's own opinion.

Prophets often used this kind of phrase to prove their authority to speak.

What follows is certain because of where it came from.

👂 Isaiah heard this message directly
🗣️ It marks God's own words, not Isaiah's opinion
✅ This phrase proved a prophet's authority
📖 The certainty comes from the source
---
## 🍷 Ten Acres Of Vineyard Shall Yield One Bath

Acre here translates a Hebrew word for the land a pair of oxen could plow in one day.

A bath was a liquid measure used for wine, close to the size of a large jar.

Ten full acres of vineyard should have filled many jars of wine.

Instead the harvest barely filled one, a picture of total failure.

🐂 Acre meant a day's plowing, not modern acres
🍷 A bath measured wine like a large jar
📉 Ten acres should have filled many jars
📖 Only one jar came from all that land
---
## 🌾 The Seed Of An Homer Shall Yield An Ephah

A homer was the largest dry measure used for grain in this culture.

An ephah was only a tenth of a full homer.

Planting a homer of seed should have produced many homers back at harvest.

Instead the harvest shrank down to a tenth of what was planted.

🌾 Homer was the largest dry measure
📏 Ephah was only a tenth of a homer
📉 The harvest shrank to a tenth
📖 Abundance turned into scarcity
---
# Isaiah 5:11-17
# 🍷 Strong Drink And Empty Feasts
---
## 🌅 Woe Unto Them That Rise Up Early In The Morning, That They May Follow Strong Drink

Rising early was normally praised as a sign of hard work and discipline.

Here that same early rising is spent chasing alcohol instead of labor.

The verse flips a normally positive habit into something wasted.

Good energy is being poured into the wrong pursuit entirely.

🌅 Early rising was usually praised
🍺 Here it is spent chasing drink
🔄 A good habit gets flipped into waste
📖 Energy is aimed at the wrong goal
---
## 🔥 That Continue Until Night, Till Wine Inflame Them

This describes drinking that starts at dawn and does not stop until dark.

Inflame pictures wine heating up the body and clouding the mind.

The whole day disappears into this one pursuit.

Nothing productive or godly fits into a day spent this way.

🌇 Drinking lasts from dawn until dark
🔥 Inflame pictures wine clouding the mind
📅 The whole day disappears into it
📖 Nothing godly fits into a day like this
---
## 🎵 The Harp, And The Viol, The Tabret, And Pipe, And Wine, Are In Their Feasts

The harp and viol were stringed instruments plucked or strummed by hand.

The tabret was a small hand drum, similar to a tambourine.

The pipe was a simple wind instrument used for music at gatherings.

Together they describe a full, festive party with music and drink everywhere.

🎵 Harp and viol were stringed instruments
🥁 Tabret was a hand drum like a tambourine
🎶 Pipe was a simple wind instrument
📖 Together they paint a constant party
---
## 👁️ But They Regard Not The Work Of The LORD

Regard not means they paid no attention at all.

The work of the LORD points to what God was doing in Judah's own history.

Assyria's rising power was already threatening the region during Isaiah's lifetime.

The people partied through a danger they refused to even notice.

👁️ Regard not means total inattention
🏛️ The work of the LORD is God's activity
⚔️ A real danger was already rising nearby
📖 They partied through a threat they ignored
---
## ⛓️ Therefore My People Are Gone Into Captivity, Because They Have No Knowledge

This verse describes a future captivity as though it had already happened.

Prophets sometimes spoke this way to show how certain a coming event was.

No knowledge does not mean lacking facts, it means refusing to know God.

That refusal is named as the direct cause of the coming exile.

⏳ A future event is described as already done
✅ This showed how certain the judgment was
🚫 No knowledge means refusing to know God
📖 That refusal caused the coming exile
---
## 💀 Hell Hath Enlarged Herself, And Opened Her Mouth Without Measure

Hell here translates Sheol, the Hebrew word for the realm of the dead.

This is not the same idea as eternal punishment taught later in scripture.

Sheol is pictured here as a mouth that keeps opening wider and wider.

Its hunger has no limit, matching the scale of the coming judgment.

💀 Hell here translates Sheol, realm of the dead
📏 Not the same idea as later teaching
👄 Sheol is pictured as an endless mouth
📖 Its hunger matches the size of the judgment
---
## 👑 Their Glory, And Their Multitude, And Their Pomp Shall Descend Into It

Glory, multitude, and pomp describe wealth, crowds, and celebration all together.

Everything the people were proud of gets swallowed by the same grave.

Nothing about their status or numbers offers any protection.

The very things they celebrated march down into judgment with them.

👑 Glory, multitude, and pomp mean wealth and status
⬇️ All of it gets swallowed by the grave
🛡️ Status offers no protection here
📖 Their celebration becomes their downfall
---
## ⚖️ The Mean Man Shall Be Brought Down, And The Mighty Man Shall Be Humbled

Mean man here means an ordinary or common person, not someone cruel.

Mighty man describes someone powerful, wealthy, or prominent in the city.

Both extremes, the lowest and the highest, are humbled by this same judgment.

No social class escapes what this verse describes.

👤 Mean man means ordinary, not cruel
👑 Mighty man means powerful or wealthy
⚖️ Both extremes are humbled together
📖 No social class escapes this judgment
---
## 📈 But The LORD Of Hosts Shall Be Exalted In Judgment

While everyone else is brought low, God alone is lifted up.

Exalted in judgment means his greatness is shown through executing true justice.

Holy describes God as set apart, above the corruption just described.

Sanctified here means shown to be holy through this very act of judgment.

📈 God alone is lifted up here
⚖️ His greatness shows through fair judgment
✨ Holy means set apart from corruption
📖 Judgment itself proves his holiness
---
## 🐑 Then Shall The Lambs Feed After Their Manner

This pictures wealthy estates turning into simple grazing land.

Sheep now wander freely where homes and vineyards once stood.

After their manner means the sheep graze naturally, with no one managing the land anymore.

Nature quietly reclaims what people once carefully built and owned.

🐑 Wealthy estates become grazing land
🏚️ Homes and vineyards are gone
🌱 Sheep graze with no one managing the land
📖 Nature reclaims what people built
---
## 🌍 And The Waste Places Of The Fat Ones Shall Strangers Eat

Fat ones describes the wealthy, well fed people judged earlier in this chapter.

Waste places means their land has become ruins instead of productive estates.

Strangers here means foreigners, people from outside Israel entirely.

Land once guarded jealously by the wealthy ends up feeding outsiders instead.

🍖 Fat ones means the wealthy, well fed people
🏚️ Waste places means ruined land
🌍 Strangers means foreign outsiders
📖 Guarded land ends up feeding outsiders
---
# Isaiah 5:18-21
# ⛓️ Cords Of Vanity
---
## 🪢 Woe Unto Them That Draw Iniquity With Cords Of Vanity

Vanity here means emptiness or falsehood, not pride.

Cords are ropes, something a person pulls along on purpose.

This pictures sin as something willingly dragged behind a person, not an accident.

The image shows sin as a choice repeated often enough to leave a mark.

🪢 Vanity means emptiness or falsehood
🚶 Cords picture something pulled on purpose
🔁 Sin here is a repeated choice
📖 It is dragged along, not stumbled into
---
## 🐂 And Sin As It Were With A Cart Rope

A cart rope was thick and strong, used to pull heavy loads by animals.

This verse escalates from a light cord to a massive cart rope.

The more sin is indulged, the heavier and harder to escape it becomes.

What starts small can grow into something a person can no longer easily drop.

🐂 A cart rope pulled heavy loads
📈 The image escalates from cord to rope
⛓️ Sin grows heavier the more it is indulged
📖 Small sin can grow too heavy to drop
---
## 😏 That Say, Let Him Make Speed, And Hasten His Work

This is a taunt, not a genuine request.

The speakers are mocking God to prove himself by acting immediately.

They doubt judgment will ever actually arrive.

Their sarcasm reveals a deep unbelief hiding behind clever words.

😏 This is a taunt, not a request
⏱️ They dare God to act immediately
🚫 They doubt judgment will ever come
📖 Sarcasm hides real unbelief
---
## ✨ Let The Counsel Of The Holy One Of Israel Draw Nigh And Come

The Holy One of Israel is one of Isaiah's favorite titles for God.

It appears often through the rest of this book.

Holy means set apart, distinct from anything sinful or ordinary.

Even this title gets used mockingly here by people who do not believe.

✨ Holy One of Israel is God's title
🙏 Holy means set apart from sin
😏 Here it gets used in mockery
📖 It repeats often through the rest of Isaiah
---
## 🔄 Woe Unto Them That Call Evil Good, And Good Evil

This describes a complete reversal of basic moral categories.

It is not simply making a mistake about right and wrong.

It means relabeling wrong as right on purpose to excuse it.

That kind of reversal removes any shared standard for telling the two apart.

🔄 This is a deliberate reversal, not a mistake
🏷️ Wrong gets relabeled as right on purpose
❓ It removes any shared standard
📖 Confusion becomes a chosen strategy
---
## 🌓 That Put Darkness For Light, And Light For Darkness, Bitter For Sweet

This verse repeats the same idea three separate ways on purpose.

Darkness for light, light for darkness, and bitter for sweet all describe total inversion.

Repeating the pattern this many times shows just how thorough the confusion has become.

Nothing about right and wrong is safe from being flipped.

🌓 The same idea repeats three ways
🔁 Repetition shows how thorough the confusion is
🍯 Even taste, bitter and sweet, gets flipped
📖 Nothing is safe from being reversed
---
## 👁️ Woe Unto Them That Are Wise In Their Own Eyes

Wise in their own eyes means trusting personal judgment over God's instruction.

This is not real wisdom, only confidence in one's own opinion.

This trait sits behind every other woe listed earlier in this chapter.

Trusting themselves this much is where the earlier sins actually began.

👁️ Wise in their own eyes means self trust
❌ This is not real wisdom
🔗 It sits behind every earlier woe
📖 Trusting themselves is where it all began
---
# Isaiah 5:22-25
# 🔥 Corrupt Judges And Coming Fire
---
## 🍷 Woe Unto Them That Are Mighty To Drink Wine, And Men Of Strength To Mingle Strong Drink

Mingle means mixing wine with spices to make it stronger.

This verse mocks people who treat drinking ability as a kind of strength.

Real strength should have been used for justice or courage, not drinking contests.

Their skill is wasted on something that helps no one.

🍷 Mingle means mixing wine with spices
😏 Drinking ability gets treated like real strength
⚖️ Real strength belonged to justice, not this
📖 Their skill helps no one
---
## 💰 Which Justify The Wicked For Reward

Justify here means officially declaring someone innocent in court.

This describes judges accepting bribes to clear a guilty person.

Reward means payment, a bribe disguised as a gift or favor.

Corrupt courts protected the wealthy instead of protecting the truth.

⚖️ Justify means declaring someone innocent
💰 Judges accepted bribes to clear the guilty
🎁 Reward here means a disguised bribe
📖 Courts protected wealth instead of truth
---
## 😢 And Take Away The Righteousness Of The Righteous From Him

This describes an innocent person losing a case they should have won.

Righteousness here means a rightful legal claim, not just personal goodness.

Bribery flipped the outcome away from the person who deserved to win.

Justice itself became something that could be bought and sold.

😢 An innocent person loses a fair case
⚖️ Righteousness here means a rightful legal claim
💰 Bribery flipped the outcome
📖 Justice became something bought and sold
---
## 🔥 As The Fire Devoureth The Stubble

Stubble is the dry, leftover plant stalks left standing after a harvest.

Stubble burns almost instantly once fire touches it.

This pictures how fast the coming judgment will consume everything in its path.

Nothing about this judgment will be slow or gentle.

🌾 Stubble is dry leftover plant stalks
🔥 Stubble burns almost instantly
⚡ The judgment will be just as fast
📖 Nothing about it will be gentle
---
## 🥀 Their Root Shall Be As Rottenness, And Their Blossom Shall Go Up As Dust

Root pictures the hidden foundation of a plant, unseen but essential.

Blossom pictures the visible, attractive part everyone can see.

This verse says both the hidden foundation and the visible display will be destroyed.

Nothing about them survives, from the root all the way up to the flower.

🥀 Root pictures the hidden foundation
🌸 Blossom pictures the visible display
💥 Both are destroyed completely
📖 Nothing survives from root to flower
---
## 📜 Because They Have Cast Away The Law Of The LORD, And Despised The Word Of The Holy One

This verse finally names the real reason behind every woe in this chapter.

Cast away means they rejected God's instruction on purpose, not by accident.

Despised means they treated God's word with open contempt.

Every earlier sin traces back to this one root cause.

📜 This names the real reason for the woes
🚫 Cast away means rejecting instruction on purpose
😠 Despised means open contempt
📖 Every sin traces back to this cause
---
## 🌍 Therefore Is The Anger Of The LORD Kindled Against His People, And The Hills Did Tremble

Kindled pictures anger being lit like a fire, starting small and then spreading.

The trembling hills describe the physical force of God's response.

Some scholars connect this to a real earthquake remembered from around Isaiah's time.

Whether literal or pictured, the image shows judgment shaking the natural world itself.

🔥 Kindled pictures anger lit like a fire
🏔️ Trembling hills show physical force
🌍 Some connect this to a real earthquake
📖 Judgment shakes even the natural world
---
## ✋ For All This His Anger Is Not Turned Away, But His Hand Is Stretched Out Still

This exact refrain repeats several more times later in the book of Isaiah.

Stretched out still means the judgment already described is not finished yet.

More warnings and more chapters of consequence are still coming.

The repeated line ties this chapter to a much longer pattern across the book.

🔁 This refrain repeats later in Isaiah
✋ Stretched out still means more is coming
📅 The judgment described here is not finished
📖 One line ties this to the whole book
---
# Isaiah 5:26-30
# 🦁 The Nations Summoned
---
## 🚩 And He Will Lift Up An Ensign To The Nations From Far

An ensign was a raised banner or flag used to gather troops for battle.

Armies and travelers watched for this signal from a distance.

Lifting an ensign to the nations means summoning foreign armies from far away.

God himself is pictured as the one raising this signal.

🚩 An ensign was a raised battle flag
👀 Armies watched for this signal from far
🌍 It summons foreign nations
📖 God himself raises the signal
---
## 📯 And Will Hiss Unto Them From The End Of The Earth

Hiss here does not mean mockery, it describes a whistling signal.

Shepherds used a similar sound to call bees or gather a flock.

God summons distant nations as easily as a shepherd calls his animals.

The end of the earth shows how far this call reaches.

📯 Hiss means a whistling signal, not mockery
🐑 Shepherds used a similar call
🌍 God summons nations just as easily
📖 The call reaches the ends of the earth
---
## 🏃 Behold, They Shall Come With Speed Swiftly

This describes an army responding immediately, with no delay at all.

Swiftly repeats the idea of speed a second time for emphasis.

There is no time for Judah to prepare a defense.

The judgment announced earlier is now shown arriving in real time.

🏃 The army responds with no delay
⚡ Swiftly repeats speed for emphasis
🛡️ There is no time to prepare
📖 The judgment now arrives in real time
---
## 💪 None Shall Be Weary Nor Stumble Among Them, None Shall Slumber Nor Sleep

This pictures an army with no need to rest at all.

Weary and stumble describe exhaustion, both are ruled out completely.

Slumber and sleep describe even the smallest pause, also ruled out.

The relentless pace makes this force feel almost impossible to escape.

💪 No exhaustion slows this army
😴 No pause or rest happens either
⏳ The pace never breaks
📖 The force feels impossible to escape
---
## 👘 Neither Shall The Girdle Of Their Loins Be Loosed, Nor The Latchet Of Their Shoes Be Broken

A girdle was a belt used to tuck up long robes for battle readiness.

A loose girdle would slow a soldier down or trip him in a fight.

The latchet was the strap holding a sandal onto the foot.

Every soldier stays fully equipped, with nothing loose or broken along the way.

👘 A girdle tucked up robes for battle
🏃 A loose girdle would slow a soldier
👡 The latchet held the sandal in place
📖 Every soldier stays fully equipped
---
## 🏹 Whose Arrows Are Sharp, And All Their Bows Bent

Sharp arrows and drawn bows describe weapons ready to fire immediately.

Nothing about this army is still preparing.

The attack is not a future threat, it is already in motion.

Every detail points toward a battle that is about to begin.

🏹 Weapons are ready to fire immediately
✅ Nothing is still being prepared
⚔️ The attack is already in motion
📖 A battle is about to begin
---
## 🐎 Their Horses Hoofs Shall Be Counted Like Flint, And Their Wheels Like A Whirlwind

Flint is an extremely hard stone that does not chip or wear down easily.

Comparing hoofs to flint pictures an army that never slows or falters.

Wheels like a whirlwind pictures chariots moving with the force of a storm.

Together these images describe an army that feels impossible to stop.

🪨 Flint is an extremely hard stone
🐎 Hoofs like flint never falter
🌪️ Wheels like a whirlwind move like a storm
📖 The advance feels impossible to stop
---
## 🦁 Their Roaring Shall Be Like A Lion, And Shall Roar, And Lay Hold Of The Prey

Lions were the most feared predator known in this region.

Roaring pictures confidence and total control before the attack even begins.

Lay hold of the prey pictures the army seizing Judah with no resistance.

The comparison leaves no doubt about how this encounter will end.

🦁 Lions were the most feared predator known
😤 Roaring pictures total confidence
🎯 Lay hold pictures seizing with no resistance
📖 The outcome is left in no doubt
---
## 🌊 They Shall Roar Against Them Like The Roaring Of The Sea

The sea often pictures chaos and overwhelming force throughout the Bible.

This escalates the earlier lion image into something even larger.

A single predator is now compared to an entire ocean.

No single defender could ever stand against a force this size.

🌊 The sea pictures overwhelming chaos
📈 This escalates beyond the earlier lion image
🌍 A predator becomes an entire ocean
📖 No defender could stand against this
---
## 🌑 And If One Look Unto The Land, Behold Darkness And Sorrow, And The Light Is Darkened

This is the final image of the entire chapter.

Darkness and sorrow describe both physical destruction and deep grief together.

This darkness echoes back to the earlier warning about calling darkness light.

What was once a moral confusion becomes a literal, visible darkness over the land.

🌑 This closes out the whole chapter
😢 Darkness and sorrow mean destruction and grief
🔁 It echoes the earlier warning on darkness
📖 Moral confusion becomes literal darkness
`.trim();

export const ISAIAH_FIVE_PERSONAL_SECTIONS = parseIsaiahFiveRawNotes(ISAIAH_FIVE_RAW_NOTES);
