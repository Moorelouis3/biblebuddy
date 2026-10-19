export type RevelationEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationEighteenRawNotes(rawText: string): RevelationEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 18:${startVerse}` : `Revelation 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Revelation 18 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_EIGHTEEN_RAW_NOTES = `# Revelation 18:1-3
# 🏙️ Babylon The Great Is Fallen
---
## 👼 Another Angel Come Down From Heaven, Having Great Power

This angel is not one of the seven already named earlier in Revelation.

"Great power" means his message carries real authority from God.

The earth being lightened with his glory pictures light bright enough to notice from anywhere.

This angel speaks with total certainty about Babylon's fall.

👼 A new angel, not named before
⚡ Great power means real authority
✨ His glory lightens the whole earth
📖 He speaks with total certainty

---
## 🔁 Babylon The Great Is Fallen, Is Fallen

Saying "is fallen" twice is not a mistake or a stutter.

Scripture repeats a phrase like this to announce something as already settled.

Babylon here does not mean only the ancient city destroyed long before John's own time.

Many scholars believe it pictures any powerful system built on pride and wealth instead of God.

🔁 Repeating fallen means it is certain
🏛️ Babylon pictures more than one city
💰 It stands for pride and wealth
📖 Her end is already settled

---
## 🏚️ The Habitation Of Devils, And The Hold Of Every Foul Spirit

"Habitation" means a dwelling place, somewhere something actually lives.

Babylon is pictured here as an abandoned house taken over by evil spirits.

"Hold" works the same way a ship stores its cargo.

Only this cargo is unclean spiritual power, not goods.

🏚️ Habitation means a dwelling place
👻 Evil spirits now fill the city
🚢 Hold pictures a storage space
📖 Wealth is gone, haunting remains

---
## 🦅 A Cage Of Every Unclean And Hateful Bird

Unclean birds in scripture often picture scavengers.

Scavengers feed on what has already died or rotted.

This image finishes the picture from the line before it.

Babylon is no longer a city full of life.

🦅 Unclean birds often mean scavengers
💀 They feed on what has died
🏙️ Babylon is no longer alive
➡️ Only decay remains inside her

---
## 🍷 Drunk Of The Wine Of The Wrath Of Her Fornication

"Fornication" here does not describe one woman's private choices.

Prophets often use it as a picture for a nation chasing wealth instead of loyalty to God.

Wine that makes someone drunk clouds their judgment and makes bad choices feel normal.

Every nation touched by Babylon's influence has been affected the same way.

💔 Fornication pictures broken loyalty
🍷 Wine clouds a nation's judgment
🌍 Every nation shares this effect
📖 Influence spreads past one choice

---
## 💰 The Merchants Of The Earth Are Waxed Rich Through The Abundance Of Her Delicacies

"Waxed rich" is an old way of saying grew wealthy.

"Delicacies" means luxury goods, the kind of comfort most people could never afford.

Nations drank her wine.

Kings partnered with her power.

Merchants profited from her wealth.

Three different groups, one shared profit.

💰 Waxed rich means grew wealthy
🛍️ Delicacies means costly luxury goods
🤝 Three separate groups all profited
📖 Nobody near her stayed untouched

# Revelation 18:4-8
# 🚪 Come Out Of Her, My People
---
## 📣 Come Out Of Her, My People

This voice speaks directly to God's own people, not to Babylon.

The warning assumes some of God's people are still living inside this corrupt system.

Leaving is not pictured as running from fear alone.

It is pictured as God rescuing His own people before judgment falls.

📣 The warning is for God's people
🏙️ Some still live inside Babylon
🚪 Leaving means being rescued
📖 God calls His own people out

---
## 🤝 That Ye Be Not Partakers Of Her Sins

"Partakers" means sharing in something together.

Staying close to Babylon's sins risks sharing in her punishment too.

This is not only about physical distance.

It is about refusing to join in what this system actually does.

🤝 Partakers means sharing together
⚠️ Sin and punishment travel together
🚫 Distance alone is not the point
➡️ Refusing to join in matters most

---
## 🏗️ Her Sins Have Reached Unto Heaven

This phrase pictures sin piling up so high it finally reaches God's own throne.

Babylon's wrongdoing was never hidden or overlooked the whole time.

God had been watching the entire buildup, not just the final moment.

🏗️ Sin piled up over time
👁️ God saw it the whole time
🙈 Nothing stayed hidden from heaven
📖 Judgment follows what God already saw

---
## ⚖️ Reward Her Even As She Rewarded You, Double Unto Her Double

This is not revenge for its own sake.

It describes a punishment that matches exactly what was done.

"Double unto her double" means the cup she filled for others gets filled back to her.

Justice here settles the exact account.

⚖️ The punishment matches the crime
🍷 Her own cup returns to her
🔁 Measure for measure, not more
📖 Justice settles the exact account

---
## 👑 I Sit A Queen, And Am No Widow

Babylon pictures herself as untouchable, powerful enough that loss could never reach her.

"No widow" means she believes she will never lose the protection she depends on.

That confidence is about to be proven completely wrong.

👑 She believes she cannot be touched
🚫 No widow means no coming loss
😳 Her confidence is about to break
📖 Pride often comes before the fall

---
## 💎 So Much Torment And Sorrow Give Her

The punishment is measured against how much she "lived deliciously."

"Lived deliciously" means she enjoyed comfort and luxury without any limit.

The more she indulged herself, the heavier this judgment lands now.

💎 Lived deliciously means endless comfort
⚖️ Punishment matches her self indulgence
📈 More indulgence meant more judgment
📖 Nothing about this is random

---
## ☠️ Her Plagues Come In One Day, Death, And Mourning, And Famine

These three disasters strike together instead of spreading out slowly.

Death, mourning, and famine arriving all at once leaves no space to prepare.

A system that looked unshakable collapses faster than anyone inside it expected.

☠️ Death strikes without warning
😭 Mourning follows immediately after
🍞 Famine arrives at the same time
📖 Collapse comes faster than expected

---
## 🔥 She Shall Be Utterly Burned With Fire

Burning with fire pictures total destruction, not damage that could be repaired.

Ancient readers understood this as the most complete judgment available.

Nothing about Babylon survives, not her wealth, her power, or her influence.

🔥 Fire pictures total destruction
🏚️ Nothing survives this judgment
💰 Her wealth disappears with her
📖 Complete judgment leaves nothing behind

---
## 💪 Strong Is The Lord God Who Judgeth Her

Babylon looked unstoppable for a very long time.

This verse names the real reason her fall is certain, God's own strength.

No empire, however wealthy or powerful, outlasts the one who judges it.

💪 God's strength decides the outcome
🏛️ No empire outlasts His judgment
🚫 Her fall is not an accident
📖 Real power belongs to God alone

# Revelation 18:9-10
# 😨 Kings Bewail Her Burning
---
## 😭 The Kings Of The Earth Shall Bewail Her, And Lament For Her

These are the same kings described earlier in Revelation as partners in Babylon's wealth.

"Bewail" and "lament" both mean weeping out loud over a real loss.

Their grief is really about losing a partnership, not about her suffering.

😭 These kings partnered with Babylon
😢 Bewail and lament mean loud weeping
💰 Their grief is about lost benefit
📖 Self interest, not real sorrow

---
## 🏃 Standing Afar Off For The Fear Of Her Torment

These kings do not come close enough to help or even watch clearly.

Fear keeps them at a careful distance from Babylon's judgment.

Loyalty built on profit disappears the moment the profit turns to danger.

🏃 They keep a careful distance
😨 Fear drives that distance
💸 Their loyalty was built on profit
➡️ Profit based loyalty cannot survive danger

---
## 😢 Alas, Alas, That Great City Babylon, That Mighty City

Repeating "alas" twice is a traditional way of expressing real grief out loud.

Calling Babylon both "great" and "mighty" admits exactly how impressive this system once looked.

Even the people mourning her cannot deny how powerful she really was.

😢 Alas repeated shows real grief
🏙️ Great and mighty admit her power
👑 Even mourners respect what she was
📖 Impressive power still falls

---
## ⏰ For In One Hour Is Thy Judgment Come

"One hour" does not mean a literal sixty minutes.

It pictures how suddenly Babylon's fall happens compared to how long she stood.

A system built up over generations collapses faster than anyone watching can process.

⏰ One hour means sudden collapse
🏛️ She stood for generations
💥 The fall happens far faster
📖 Sudden endings follow slow pride

# Revelation 18:11-14
# 📦 The Merchandise Of Babylon
---
## 📉 The Merchants Shall Weep And Mourn Over Her, For No Man Buyeth Their Merchandise

These merchants are not grieving Babylon's suffering either.

They are grieving the loss of their own income now that their best customer is gone.

Babylon's fall exposes exactly who depended on her the most.

📉 No buyers means no more income
💰 Their grief is about lost profit
🏙️ Babylon was their best customer
📖 Her fall exposes who depended on her

---
## 💎 Gold, And Silver, And Precious Stones, And Of Pearls, And Fine Linen, And Purple, And Silk, And Scarlet

This list names the most expensive luxury goods available in the ancient world.

Purple and scarlet dye alone cost more than most people earned in a lifetime.

Babylon's wealth was not ordinary prosperity.

It was excess built entirely on display.

💎 These were the costliest goods available
💜 Purple and scarlet were extremely expensive
👑 This wealth was built for display
📖 Excess, not ordinary prosperity

---
## 🌳 All Thyine Wood, And All Manner Vessels Of Ivory, And Of Brass, And Iron, And Marble

"Thyine wood" was a rare, sweet smelling wood prized for fine furniture.

Ivory, brass, iron, and marble name materials used for the costliest furnishings money could buy.

This is not a list of necessities.

It is a list of what luxury looked like to the first readers.

🌳 Thyine wood was rare and costly
🐘 Ivory meant the finest furniture
🏛️ Marble and brass meant luxury building
📖 None of this was necessary

---
## 🌸 Cinnamon, And Odours, And Ointments, And Frankincense, And Wine, And Oil, And Fine Flour, And Wheat

This part of the list shifts from decoration to food and fragrance.

"Odours" and "ointments" mean expensive perfumes and scented oils used by the wealthy.

Frankincense was valuable enough to be given as a gift fit for a king.

Even basic food like wheat and oil appears here on a massive scale.

🌸 Odours and ointments mean costly perfumes
✨ Frankincense was a gift fit for kings
🌾 Even basic food appears at huge scale
📖 Luxury touched everything, even daily bread

---
## ⛓️ Beasts, And Sheep, And Horses, And Chariots, And Slaves, And Souls Of Men

This list ends on the most disturbing item of all, people.

"Slaves" names human beings bought and sold like the goods listed before them.

"Souls of men" repeats the same horror in different words.

Babylon's wealth was built in part on human lives treated as merchandise.

⛓️ Slaves means human beings sold
😢 Souls of men repeats the horror
💔 People were treated as merchandise
📖 This is the list's darkest item

---
## 😍 The Fruits That Thy Soul Lusted After Are Departed From Thee

"Lusted after" means craved intensely, more than simple wanting.

Everything Babylon chased after with that intensity is now completely gone.

Craving something intensely never actually guarantees keeping it.

😍 Lusted after means craved intensely
🍎 Those fruits are now gone
🚫 Craving never guaranteed keeping it
📖 Desire does not outlast judgment

---
## 💎 All Things Which Were Dainty And Goodly Are Departed, Thou Shalt Find Them No More At All

"Dainty" means delicate and highly prized, not common or ordinary.

"No more at all" removes any hope that this loss is temporary.

Every comfort Babylon built her identity around is gone permanently.

💎 Dainty means delicate and prized
⏳ No more at all means permanent
🏙️ Her identity was built on comfort
📖 Permanent loss, not just a season

# Revelation 18:15-17
# 💰 Riches Come To Nought
---
## 💰 The Merchants Which Were Made Rich By Her Shall Stand Afar Off

These same merchants who grew wealthy off Babylon now keep their distance out of fear.

Their wealth came directly from her, yet that connection offers them no protection now.

Being made rich by a corrupt system never guarantees safety when it falls.

💰 Their wealth came directly from her
😨 Fear keeps them at a distance
🚫 Her fall offers them no protection
📖 Profit never guarantees safety

---
## 😢 Alas, Alas, That Great City, That Was Clothed In Fine Linen, And Purple, And Scarlet

This is the second "alas, alas" spoken in this chapter.

The kings said it first.

Now the merchants say the exact same thing.

Fine linen, purple, and scarlet were already named as the costliest fabrics.

Everyone mourning Babylon mourns the same lost wealth.

😢 Alas alas repeats from the kings
💜 These were the costliest fabrics
🔁 The same loss, a different mourner
📖 Everyone here mourns the same wealth

---
## 💎 Decked With Gold, And Precious Stones, And Pearls

"Decked" means dressed up or elaborately decorated.

This same phrase already described the woman riding the beast back in Revelation seventeen.

The city and that woman share the exact same appearance on purpose.

They picture the same corrupt system from two different angles.

💎 Decked means elaborately decorated
👩 This matches the woman in chapter seventeen
🏙️ City and woman share one appearance
📖 Two pictures, one single system

---
## 💥 In One Hour So Great Riches Is Come To Nought

This phrase already appeared once before in this chapter.

It described the kings' shock at Babylon's judgment.

Now the merchants use the exact same words.

Wealth this large was never expected to disappear this fast.

💥 Come to nought means reduced to nothing
⏰ One hour repeats from verse ten
😳 This size of loss stuns everyone
📖 Nobody who depended on her is spared

---
## ⚓ Every Shipmaster, And All The Company In Ships, And Sailors, Stood Afar Off

This verse brings in a new group entirely, people whose livelihood depended on shipping her goods.

"Shipmaster" means the captain in charge of a trading vessel.

Kings, merchants, and now sailors all end up standing the exact same way, watching from a distance.

⚓ Shipmasters captained trading vessels
🌊 Sailors depended on her shipping trade
👥 Three different groups share one posture
📖 No level of involvement was safe

# Revelation 18:18-20
# ⚓ Sailors Mourn, Heaven Rejoices
---
## ❓ What City Is Like Unto This Great City

This question is not really asking for an answer.

It is an expression of shock at how total this destruction looks.

Watching smoke rise from a city once considered unmatched leaves these sailors speechless.

❓ The question is not literal
💨 Smoke marks total destruction
😲 Shock, not real curiosity
📖 Unmatched power still can fall

---
## 🏺 They Cast Dust On Their Heads

Throwing dust or ashes on the head was a known mourning custom in the ancient Near East.

It signaled grief serious enough to visibly lower and humble yourself in public.

These sailors are performing real, public mourning, not a quiet reaction.

🏺 Dust on the head was a mourning custom
😔 It signaled visible public grief
🌍 This custom came from the ancient Near East
📖 Their mourning was public, not quiet

---
## 🚢 Made Rich All That Had Ships In The Sea By Reason Of Her Costliness

This verse states plainly what every sailor and shipmaster already knew.

Babylon's extravagant spending, called "her costliness," is exactly what built their fortunes.

Removing Babylon does not only punish her.

It collapses an entire shipping economy built around her excess.

🚢 Her costliness built their fortunes
💰 Shipping wealth depended entirely on her
📉 Her fall collapses that whole economy
📖 One city's fall can end many livelihoods

---
## 🏚️ For In One Hour Is She Made Desolate

"Desolate" means completely emptied out, left with nothing and no one.

This is the third time this chapter repeats the phrase "in one hour."

Three different groups have now used this same timeframe to describe one sudden collapse.

🏚️ Desolate means completely emptied out
⏰ In one hour repeats a third time
👥 Three groups share this same description
📖 One sudden collapse, told three times

---
## 🙌 Rejoice Over Her, Thou Heaven, And Ye Holy Apostles And Prophets

The tone shifts sharply here, from earthly grief to a command aimed at heaven.

"Holy apostles and prophets" names the very people Babylon's system persecuted and killed.

Their reward for faithfulness was suffering, yet here they are invited to rejoice.

🔄 The tone shifts from grief to joy
⚰️ Apostles and prophets were persecuted by her
🙌 They are invited to rejoice now
📖 Suffering faithfulness is finally honored

---
## ⚖️ God Hath Avenged You On Her

"Avenged" means justice has finally been carried out on someone's behalf.

This is not humans taking revenge for their own grievances.

God Himself settles the account for every believer Babylon's system ever harmed.

⚖️ Avenged means justice carried out
🙏 God settles this, not humans
💔 This answers real, past suffering
📖 God remembers every harm done

# Revelation 18:21-24
# 🪨 The Millstone And The Silence
---
## 🪨 A Mighty Angel Took Up A Stone Like A Great Millstone, And Cast It Into The Sea

A "millstone" was a heavy, flat stone used to grind grain into flour.

Throwing something this heavy into the sea pictures a fall with no way back up.

This single dramatic action acts out everything the chapter has already said in words.

🪨 A millstone was a heavy grinding stone
🌊 Thrown into the sea, never returning
🎭 The action acts out the message
📖 Words become a visible picture here

---
## 💥 With Violence Shall That Great City Babylon Be Thrown Down, And Shall Be Found No More At All

"With violence" means this fall is sudden and forceful, not a slow fade.

"Found no more at all" removes any chance that Babylon quietly returns later.

This is the final, complete answer to everything described earlier in this chapter.

💥 With violence means sudden and forceful
🚫 Found no more means no return
🏁 This is the chapter's final answer
📖 Complete endings leave nothing behind

---
## 🎶 The Voice Of Harpers, And Musicians, And Of Pipers, And Trumpeters, Shall Be Heard No More At All

These four instruments together once marked ordinary daily celebration and music filling the city.

Silencing every single one of them pictures a complete end to daily life itself.

A place once full of sound becomes a place with no sound left.

🎶 These instruments marked everyday celebration
🤐 All four are silenced completely
🏙️ Daily life itself has ended
📖 Full sound becomes total silence

---
## 🔨 No Craftsman, Of Whatsoever Craft He Be, Shall Be Found Any More In Thee

A "craftsman" means a skilled worker, someone who builds or makes things by trade.

Naming every kind of craft without exception means no profession survives in this city.

An economy built on buying and selling has nothing left to build or sell.

🔨 Craftsman means a skilled tradesperson
🚫 Every kind of craft disappears
🏭 Nothing is left to build or sell
📖 A trading economy loses all its trades

---
## 🕯️ The Light Of A Candle Shall Shine No More At All In Thee

A lit candle pictures ordinary evening life inside a home.

Removing even this small comfort shows how total this judgment really is.

Nothing survives, not even the smallest sign of daily life.

🕯️ A candle pictures ordinary daily life
🚫 Even this small comfort disappears
🏚️ Judgment reaches every small detail
📖 Total judgment misses nothing

---
## 💍 The Voice Of The Bridegroom And Of The Bride Shall Be Heard No More At All In Thee

A wedding celebration pictures hope, joy, and the start of new life in a family.

Silencing this voice means even future generations and new beginnings end here too.

This is not only the end of what Babylon had.

It is the end of what Babylon could have become.

💍 A wedding pictures hope and new life
🚫 Future generations end here too
🏙️ Even new beginnings are silenced
📖 This ends what she could become

---
## 💼 Thy Merchants Were The Great Men Of The Earth

This verse finally explains why Babylon's fall shook the whole world economy so deeply.

Her merchants were not small, ordinary traders.

They ranked among the most powerful and influential people alive at the time.

💼 Her merchants were not small traders
🌍 They held real worldwide influence
👑 They ranked among the powerful
📖 Her fall shook the whole world

---
## 🔮 By Thy Sorceries Were All Nations Deceived

"Sorceries" here points to more than literal magic spells.

It pictures the deceptive influence Babylon used to pull whole nations away from God.

Wealth and spectacle can deceive a whole world just as effectively as any spell could.

🔮 Sorceries means deceptive influence
🌍 Entire nations were pulled away from God
💰 Wealth and spectacle can deceive deeply
📖 Deception does not require literal magic

---
## 🩸 In Her Was Found The Blood Of Prophets, And Of Saints, And Of All That Were Slain

This closing verse names the real reason behind Babylon's judgment, not only greed.

"Prophets" and "saints" means both God's messengers and ordinary believers.

The chapter opened with wealth and ends with blood, the true cost hidden underneath the luxury.

🩸 Blood names the real reason for judgment
📜 Prophets and saints means messengers and believers
💎 Wealth hid a violent truth underneath
📖 Luxury never erases the cost of blood
`.trim();

export const REVELATION_EIGHTEEN_PERSONAL_SECTIONS = parseRevelationEighteenRawNotes(REVELATION_EIGHTEEN_RAW_NOTES);
