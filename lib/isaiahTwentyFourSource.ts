export type IsaiahTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwentyFourRawNotes(rawText: string): IsaiahTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 24:${startVerse}` : `Isaiah 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Isaiah 24 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWENTY_FOUR_RAW_NOTES = `# Isaiah 24:1-3
# 🌍 Judgment On The Whole Earth
---
## 🌍 The LORD Maketh The Earth Empty, And Maketh It Waste

Hebrew poetry often says the same idea twice in different words.

"Empty" and "waste" are doing exactly that here.

Together they describe a land stripped of everything that once filled it.

Chapter twenty three announced judgment on one city, Tyre.

This chapter announces judgment on the whole earth.

🌍 Empty and waste repeat one idea
📜 Hebrew poetry often doubles a thought
🏙️ Chapter twenty three judged one city
📖 This chapter judges the whole earth

---
## 🔄 Turneth It Upside Down, And Scattereth Abroad The Inhabitants

This phrase pictures the earth flipped completely over.

Nothing stays in its normal place anymore.

People who once lived settled lives get scattered in every direction.

Judgment here does not just damage things.

It undoes the whole order of normal life.

🔄 Upside down means total reversal
🏘️ Nothing stays in its normal place
🚶 People are scattered in every direction
📖 Judgment undoes the whole order of life

---
## 👥 As With The People, So With The Priest

Rank does not protect anyone in this list.

People and priest.

Servant and master.

Buyer and seller.

Verse two even adds the lender and the borrower.

"Usury" means charging interest on a loan.

This judgment skips over every kind of rank.

👥 The verse lists opposite social pairs
💰 Usury means charging interest on a loan
⚖️ Rank usually decides who suffers first
📖 This judgment treats every rank the same

---
## 📜 The LORD Hath Spoken This Word

Not decoration, this is a claim of authority.

Isaiah is not offering a guess about the future.

He is repeating a word the LORD already spoke to him.

That is why the rest of the chapter describes the coming ruin with such certainty.

📜 Not decoration, this is authority
🗣️ Isaiah repeats what God said
🚫 Not a guess about the future
📖 Certainty comes from God's own word

# Isaiah 24:4-6
# 💔 The Earth Mourns And Fades
---
## 😢 The Earth Mourneth And Fadeth Away

The prophet gives the earth human emotions here.

"Mourneth" means grieving, the way a person grieves a death.

"Fadeth away" pictures color and life slowly draining from something.

"Languisheth" means growing weak and faint.

It pictures someone almost too tired to go on.

Even the proudest people on earth cannot escape this weakness.

😢 Mourneth means grieving like a death
🎨 Fadeth away means life draining out
😮‍💨 Languisheth means growing weak and faint
📖 Even the proudest cannot escape this

---
## 🚫 The Earth Also Is Defiled Under The Inhabitants Thereof

"Defiled" means made unclean or corrupted by wrongdoing.

The land itself is not the guilty party here.

The people living on it are the ones who corrupted it.

Sin does not stay contained inside the person who commits it.

It spreads out and stains the whole land around them.

🚫 Defiled means made unclean by wrongdoing
👥 People are the guilty ones, not the land
🌍 Sin spreads beyond the person who sins
📖 A corrupted people corrupts their land

---
## 📜 Broken The Everlasting Covenant

This likely points back to the covenant God made after the flood.

In Genesis nine, God promised never to flood the whole earth again.

He also gave commands there about how life on earth should be honored.

"Everlasting" means that covenant was meant to hold for all generations, not just one.

Breaking a promise meant to last forever is a serious kind of rebellion.

📜 This recalls the covenant after the flood
🌈 Genesis nine records that first promise
♾️ Everlasting means meant to last forever
📖 Breaking it was serious rebellion

---
## 🔥 Therefore Hath The Curse Devoured The Earth

"Curse" means a spoken judgment that brings real consequences.

"Devoured" pictures the curse eating up the land like fire eats wood.

Few people are left standing once this judgment finishes its work.

A broken covenant in verse five leads directly to a curse in verse six.

Actions and consequences move together through this whole passage.

🔥 Curse means a spoken judgment with real weight
🍽️ Devoured pictures the curse consuming the land
📉 Few people are left when it finishes
📖 A broken promise brings a real curse

# Isaiah 24:7-9
# 🍷 All Joy Ceases
---
## 🍇 The New Wine Mourneth, The Vine Languisheth

New wine was a yearly symbol of harvest and celebration.

Here the wine itself is pictured mourning instead of being enjoyed.

The vine that grows the grapes grows weak and lifeless too.

Even the ordinary picture of harvest joy has gone dark.

🍇 New wine usually meant celebration
😢 Here it mourns instead of pleasing anyone
🍂 The vine itself grows weak and lifeless
📖 Ordinary harvest joy has gone dark

---
## 🥁 The Mirth Of Tabrets Ceaseth

A "tabret" is a small hand drum used at festivals and celebrations.

Pairing it with the harp pictures a whole band falling silent.

"Mirth" means cheerful, lighthearted joy, the kind heard at a party.

A city that once celebrated loudly now makes no music at all.

🥁 Tabret means a small hand drum
🎻 Harp and tabret together picture a full band
😃 Mirth means cheerful, lighthearted joy
📖 A once loud city now makes no music

---
## 🍷 Strong Drink Shall Be Bitter To Them That Drink It

Strong drink was made to taste good and lift a person's mood.

Here it turns bitter in the mouths of the very people drinking it.

Judgment has reached deep enough to spoil even simple pleasure.

Nothing about ordinary daily life escapes what is happening to this land.

🍷 Strong drink was meant to taste good
😖 Instead it turns bitter to drink
💔 Judgment spoils even simple pleasure
📖 Nothing ordinary escapes this judgment

# Isaiah 24:10-13
# 🏚️ The City Of Confusion
---
## 🏚️ The City Of Confusion Is Broken Down

Isaiah does not name this city directly here.

It stands in for any great city that trusted its own strength.

"Confusion" describes chaos, a place with no order left inside it.

Every house shut up means no one is left to open the door.

🏚️ No single city is named here
🏙️ It represents any city trusting its own strength
🌀 Confusion means chaos with no order
📖 Shut houses mean no one is left

---
## 🌑 All Joy Is Darkened, The Mirth Of The Land Is Gone

"Darkened" pictures joy the way a light gets covered or snuffed out.

The wine crowd from the streets has nothing left to celebrate with.

This echoes the same mirth already lost back in verse eight.

The whole land, not just one house, has lost its happiness.

🌑 Darkened pictures joy being snuffed out
🍷 The wine crowd has nothing left
🔁 This echoes the loss from verse eight
📖 The whole land has lost its happiness

---
## 🚪 The Gate Is Smitten With Destruction

A city's gate was its main entrance and its main defense.

Merchants and elders gathered there for daily business.

Soldiers gathered there too, to help guard it.

"Smitten" means struck down hard, the way a heavy blow lands.

Losing the gate meant losing both the city's safety and its center of life.

🚪 The gate was a city's entrance and defense
👥 Merchants and elders gathered there daily
💥 Smitten means struck down hard
📖 Losing the gate meant losing the city's center

---
## 🍇 As The Gleaning Grapes When The Vintage Is Done

"Gleaning" means gathering the few leftover crops after the main harvest ends.

Poor workers were allowed to gather whatever the main pickers missed.

"Vintage" refers to the grape harvest itself, the main gathering season.

This pictures the earth's population reduced to a few scattered survivors.

Only scraps remain where a full harvest once stood.

🍇 Gleaning means gathering leftover crops
👐 Poor workers gathered what pickers missed
🍂 Vintage means the grape harvest season
📖 Only scraps remain where a full harvest stood

# Isaiah 24:14-16
# 🎶 A Song From Far, A Groan Up Close
---
## 🎤 They Shall Sing For The Majesty Of The LORD

Even in the middle of this judgment, a group of people is singing.

"Majesty" here means God's greatness and authority as king over everything.

This song comes from survivors who still choose to praise God.

Judgment and worship can exist in the very same chapter.

🎤 A group is singing during judgment
👑 Majesty means God's greatness as king
🙌 Survivors still choose to praise God
📖 Judgment and worship can share one chapter

---
## 🔥 Glorify Ye The LORD In The Fires

"The fires" likely points to the east, where the sun rises each morning.

Ancient writers sometimes described the east using the image of light and fire.

"The isles of the sea" means distant coastlands, far beyond Israel's own borders.

Even people far from Israel are being called to honor Israel's God.

🔥 The fires likely means the east
🌅 The east was pictured as light and fire
🏝️ Isles of the sea means distant coastlands
📖 Distant nations are called to honor God

---
## 😢 My Leanness, My Leanness, Woe Unto Me

"Leanness" pictures a body wasted away from grief and hardship.

Isaiah interrupts a song of praise with this personal cry.

Repeating the word twice shows how raw that grief really is.

Even a prophet who trusts God can feel real personal sorrow.

😢 Leanness means a body wasted by grief
🗣️ Isaiah interrupts the song with this cry
🔁 Repeating the word shows raw sorrow
📖 A prophet can trust God and still grieve

---
## 🗡️ The Treacherous Dealers Have Dealt Treacherously

"Treacherous" means disloyal, willing to betray trust for personal gain.

The phrase repeats the same word twice on purpose.

Repetition here works like an exclamation point in modern writing.

This is not one betrayal.

It is a pattern repeated again and again.

Isaiah's grief in this verse is aimed straight at broken trust.

🗡️ Treacherous means willing to betray trust
🔁 Repeating the word works like emphasis
📉 This is a pattern, not one event
📖 Broken trust is the source of Isaiah's grief

# Isaiah 24:17-20
# 🕳️ Fear, The Pit, And The Snare
---
## 🪤 Fear, And The Pit, And The Snare

These three words sound almost alike in the original Hebrew.

That wordplay makes the warning easy to remember and hard to escape.

"Fear" is the danger a person senses first.

"The pit" and "the snare" are the traps waiting once they run.

One danger leads straight into the next.

🪤 The three words sound alike in Hebrew
👂 Fear is the danger sensed first
🕳️ The pit and the snare wait next
📖 One danger leads straight into the next

---
## 🏃 He Who Fleeth From The Noise Of The Fear Shall Fall Into The Pit

Running from one danger does not guarantee safety.

The very act of fleeing the fear leads straight into the pit.

Climbing out of the pit only leads into the snare instead.

This verse describes judgment with absolutely no way around it.

🏃 Fleeing the fear leads to the pit
🕳️ Climbing from the pit leads to the snare
🚫 There is no way around this judgment
📖 Every escape leads to the next trap

---
## 🌊 The Windows From On High Are Open

This phrase already appeared once before, in the story of Noah's flood.

Genesis seven uses this same image when the flood waters poured down.

Isaiah reaches back to that memory on purpose here.

The judgment coming on the earth now echoes the flood from Genesis.

🌊 This phrase echoes Noah's flood story
⚡ Genesis seven uses the same image
🔁 Isaiah reaches back to that memory
📖 This judgment echoes the flood itself

---
## 🌍 The Earth Is Clean Dissolved

"Clean" here is an old word meaning completely, not related to cleanliness at all.

"Dissolved" pictures something solid breaking apart until nothing holds together.

The earth is described here as if it were coming completely undone.

This is total, not partial, collapse.

🌍 Clean here means completely
💥 Dissolved means breaking apart entirely
🌐 The earth is pictured coming undone
📖 This is total collapse, not partial

---
## 🍷 The Earth Shall Reel To And Fro Like A Drunkard

"Reel to and fro" pictures someone stumbling badly.

A drunk person cannot control their own steps.

The earth itself is pictured losing all stability the same way.

"It shall fall, and not rise again" makes clear this collapse is final.

🍷 Reel to and fro means stumbling
🚶 A drunk person cannot stay balanced
🌍 The earth loses all stability the same way
📖 This collapse is described as final

# Isaiah 24:21-23
# 👑 The LORD Reigns In Zion
---
## ⚡ The Host Of The High Ones That Are On High

This phrase points to spiritual powers, not just human rulers.

Many scholars believe it refers to fallen angelic beings behind earthly kingdoms.

The next phrase, "the kings of the earth," names the human rulers separately.

God's judgment reaches both the unseen powers and the visible governments at once.

⚡ This likely names spiritual, not human, powers
👑 Kings of the earth are named separately
🌐 Both unseen and visible power are judged
📖 God's judgment reaches every level of rule

---
## ⏳ After Many Days Shall They Be Visited

"Visited" in the Bible often means more than a friendly check in.

It can mean God stepping in to deal with something directly.

That can bring good news or bring judgment, depending on the moment.

Here it points to a delayed but certain reckoning.

The wait does not mean the matter is forgotten.

⏳ Visited can mean God dealing with something directly
⚖️ Here it points to coming judgment
🕰️ A delay does not mean it is forgotten
📖 The reckoning is certain, just not immediate

---
## 🌙 The Moon Shall Be Confounded, And The Sun Ashamed

Many ancient nations worshiped the sun and the moon as gods.

Here both are pictured as embarrassed servants instead of powerful deities.

"Confounded" means humiliated, unable to explain themselves.

Even the brightest objects in the sky answer to the true King.

🌙 Many nations worshiped the sun and moon
😳 Confounded means humiliated and unable to explain
🙇 Both act like servants here, not gods
📖 Even the sky answers to the true King

---
## 👑 The LORD Of Hosts Shall Reign In Mount Zion

This is the answer the whole chapter has been building toward.

Every collapse, every curse, every broken covenant leads here.

"Mount Zion" is Jerusalem's temple mountain, the place God chose to dwell among His people.

Judgment was never the final word of this chapter.

A King reigning in peace is.

👑 This is the chapter's final answer
⛰️ Mount Zion is Jerusalem's temple mountain
🔚 Judgment was never the final word
📖 A reigning King is the last word
`.trim();

export const ISAIAH_TWENTY_FOUR_PERSONAL_SECTIONS = parseIsaiahTwentyFourRawNotes(ISAIAH_TWENTY_FOUR_RAW_NOTES);
