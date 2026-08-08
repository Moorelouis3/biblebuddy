export type JudgesEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesEightRawNotes(rawText: string): JudgesEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 8:${startVerse}` : `Judges 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Judges 8 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_EIGHT_RAW_NOTES = `# Judges 8:1-3
# 😤 Ephraim's Complaint
---
## 😤 Why Hast Thou Served Us Thus

Ephraim felt deliberately left out of the fight.

Gideon had summoned Manasseh, Asher, Zebulun, and Naphtali first, not Ephraim.

Ephraim was only added later, to cut off Midian's retreat at the river fords.

Being brought in last felt like a public insult to their pride.

😤 Ephraim felt left out of the fight

🛡️ Four other tribes were summoned first

🌊 Ephraim joined only at the retreat

📖 Being brought in last stung their pride

## 🗣️ Did Chide With Him Sharply

Chide means to argue or scold someone in anger.

Ephraim was not just complaining quietly to Gideon.

They confronted him with sharp, forceful words, closer to an accusation than a question.

This kind of anger between tribes could have started a civil war.

🗣️ Chide means to scold in anger

⚔️ Their words were sharp and forceful

💥 This anger could have split the tribes

➡️ Gideon's next words had to defuse it

## 🍇 The Gleaning Of The Grapes Of Ephraim

A vintage is the main grape harvest, gathered on purpose from the vine.

A gleaning is only the leftover grapes picked up afterward, almost by accident.

Gideon claims Ephraim's leftovers, capturing Oreb and Zeeb, outweighed his own family's whole harvest.

Praise defused an argument that a defense of himself never could have.

🍇 Vintage means the main grape harvest

🍂 Gleaning means only the leftovers

👑 Ephraim's leftovers outweighed Abiezer's harvest

📖 Praise did what a defense could not

## 🕊️ Their Anger Was Abated Toward Him

Abated means the anger cooled down and lost its force.

Gideon's humble answer is what changed their mood, not a defense of himself.

Credit for capturing the two princes had already gone to God, not to Gideon.

A humble answer settled a fight that could have turned violent.

🕊️ Abated means the anger cooled

🙇 Gideon answered with humility, not pride

🤝 A soft answer defused a real threat

➡️ Humility can end a fight pride would lose

# Judges 8:4-9
# 🥖 Bread Refused At Succoth And Penuel
---
## 🥵 Faint, Yet Pursuing

Faint means physically exhausted, almost too weak to continue.

These are the same three hundred men chosen back in chapter seven by how they drank water.

They had already fought all night and chased the enemy for miles.

Exhaustion did not stop them from continuing the pursuit.

🥵 Faint means physically exhausted

👥 The same three hundred from chapter seven

🏃 They kept chasing despite exhaustion

📖 Weakness did not end their mission

## 🍞 Loaves Of Bread Unto The People That Follow Me

Israelite tribes owed each other real help during a shared war.

Gideon is not begging for charity here.

He is asking for support that any tribe owed another under their one true king, the LORD.

Refusing this request would break something deeper than simple manners.

🍞 Gideon asks for basic support

🤝 Tribes owed each other help in war

👑 Israel shared one true king, the LORD

📖 This request carried real weight

## 👑 Zebah And Zalmunna, Kings Of Midian

Zebah and Zalmunna are named here for the first time in this chapter.

They are the surviving kings of Midian, after Oreb and Zeeb were already killed in chapter seven.

Naming them marks a shift from chasing a whole army to hunting two specific men.

Everything left in this chapter now centers on catching these two kings.

👑 Zebah and Zalmunna are Midian's kings

☠️ Oreb and Zeeb were already dead

🎯 The chase now targets two men

➡️ Their capture will end the chapter's action

## 🤔 Are The Hands Of Zebah And Zalmunna Now In Thine Hand

This is not simple stinginess from Succoth's leaders.

Midian still had about fifteen thousand fighting men left at this point.

If Gideon lost, Succoth would face brutal revenge for helping him.

Fear of the wrong side ruled their choice, not lack of bread.

🤔 Succoth doubts Gideon will actually win

⚔️ Midian still had thousands of soldiers

😨 Helping Gideon risked Midianite revenge

📖 Fear of the wrong side ruled their choice

## 🌵 Tear Your Flesh With The Thorns Of The Wilderness

Thorns and briers here describe a harsh, public physical punishment.

Gideon answers Succoth's doubt with total confidence in the LORD, not in himself.

He says when, not if, the LORD hands him victory.

Faith and fury appear together in this same sentence.

🌵 Thorns describes a harsh physical punishment

💪 Gideon says when, not if, he wins

😡 Their doubt earns a fierce warning

➡️ Faith and anger appear together here

## 🗼 I Will Break Down This Tower

This tower was Penuel's own fortified refuge, the place the town trusted to keep it safe.

Penuel gives Gideon the exact same refusal Succoth just gave.

Gideon promises to tear down the very thing they trusted instead of him.

He speaks like his final victory is already certain.

🗼 Their tower was a fortified refuge

🔁 Penuel repeats Succoth's exact refusal

💥 Gideon threatens to destroy their safety

📖 He speaks like victory is already certain

# Judges 8:10-12
# ⚔️ The Kings Are Captured
---
## 💀 An Hundred And Twenty Thousand Men That Drew Sword

An hundred and twenty thousand means one hundred twenty thousand soldiers had already died.

This verse counts the dead from the whole Midianite invasion, not just this chapter.

Only fifteen thousand fighting men remained out of that entire eastern coalition.

Gideon's original army of three hundred had already broken an army that size.

💀 An hundred and twenty thousand means 120,000

📉 Only fifteen thousand men were left

👥 Gideon led just three hundred men

📖 God's power made the odds pointless

## 🎯 For The Host Was Secure

Secure here does not mean safe.

It means the remaining Midianites felt safe and let their guard down.

They likely assumed the worst fighting was already behind them.

Gideon's tired three hundred men still managed a surprise attack.

🎯 Secure means careless, not truly safe

😴 Midian let its guard down

🌙 Gideon used the element of surprise

➡️ Confidence can turn into a fatal mistake

## 💥 Discomfited All The Host

Discomfited means thrown into total confusion and panic, not just defeated.

The same word describes what happened to the whole Midianite camp back in chapter seven.

Both kings are captured alive here, not killed in the chase.

Their fate now rests completely in Gideon's hands.

💥 Discomfited means thrown into panic

🔁 The same word appears back in chapter seven

🔒 Both kings are captured alive

📖 Their fate now rests with Gideon

# Judges 8:13-17
# 🌵 Gideon Keeps His Word
---
## 🌅 Returned From Battle Before The Sun Was Up

Gideon returned from the chase before dawn broke.

This detail shows just how relentless the whole pursuit had been.

There was no time to rest before dealing with Succoth and Penuel.

One more task was still waiting for him.

🌅 He returned before the sun rose

🏃 The whole chase was relentless

⏳ No time was spent resting

➡️ Unfinished business was still waiting

## 🔢 Threescore And Seventeen Men

Threescore is an old word for the number twenty.

Threescore and seventeen means three groups of twenty plus seventeen more, seventy seven in total.

That is how many leaders Succoth actually had, named one by one.

Gideon now knows exactly who to hold responsible.

🔢 Threescore and seventeen means seventy seven

🧮 Threescore is an old word for twenty

👥 Every leader of Succoth is named

📖 Gideon can hold exact people responsible

## 😏 Behold Zebah And Zalmunna, With Whom Ye Did Upbraid Me

Upbraid means to mock or scold someone sharply.

Gideon repeats their own mocking question back to them, word for word.

He is not just punishing them, he is proving them wrong to their faces.

The two captured kings standing in front of them are the whole answer.

😏 Upbraid means to mock sharply

🔁 Gideon repeats their own words back

🎯 He proves them wrong in person

➡️ Their doubt is answered by the evidence

## 🌵 With Them He Taught The Men Of Succoth

Taught here does not mean he instructed them in a lesson.

It is an old, ironic way of saying he punished them.

Gideon carries out the exact threat he made back in verse seven.

Gideon's word, once given, did not bend.

📖 Taught here is an old word for punished

🌵 He used thorns and briers, as promised

✅ He kept his exact word from verse seven

➡️ Gideon's threats were never empty

## 🗼 He Beat Down The Tower Of Penuel, And Slew The Men Of The City

Penuel received a harsher penalty than Succoth did.

Succoth's men were punished, but Penuel's men were killed.

The difference likely reflects Penuel's own tower, a symbol of trusting something other than God.

The same insult did not draw the same judgment.

🗼 Penuel's punishment was far harsher

☠️ Its men were killed, not just punished

🏰 Their tower symbolized false security

📖 The same insult drew different judgments

# Judges 8:18-21
# 🗡️ Zebah And Zalmunna Are Slain
---
## ❓ What Manner Of Men Were They Whom Ye Slew At Tabor

This question reveals a backstory the chapter never mentioned before.

Zebah and Zalmunna had already killed people at Tabor, and the victims turn out to be Gideon's own brothers.

Their answer, that the victims looked like the children of a king, means the victims were remembered as unusually noble.

The whole chase suddenly becomes personal, not only national.

❓ A hidden backstory surfaces here

💔 The kings had killed Gideon's brothers

👑 The victims looked strikingly noble

➡️ This chase was personal, not only national

## ⚖️ They Were My Brethren, Even The Sons Of My Mother

Brethren of my mother means full brothers, not distant cousins.

In this culture, a close relative was expected to avenge a murdered family member.

Gideon even says he would have spared the kings if his brothers had survived.

This is justice, not political ambition.

⚖️ Brethren of my mother means full brothers

🩸 Close kin were expected to avenge murder

🕊️ Gideon would have spared them otherwise

📖 This is justice, not political ambition

## 😨 The Youth Drew Not His Sword: For He Feared

Fear froze Gideon's own son in this moment.

Jether is likely still a boy, not yet a grown warrior.

Gideon offered him a rare honor, striking down two captured kings himself.

Even brave families raise frightened children.

😨 Jether froze out of real fear

👦 He was still just a youth

🏆 Gideon offered him a rare honor

➡️ Even brave families raise frightened children

## 🗡️ As The Man Is, So Is His Strength

This is not really a comment about physical strength alone.

The two kings are asking Gideon to kill them himself instead of his son.

Dying by a proven warrior's hand carried more honor than dying by a frightened boy's.

Even facing death, they are still managing how they will be remembered.

🗡️ The kings prefer dying by Gideon's hand

👑 Honor mattered to them even in death

🙅 They reject dying by a boy's hand

📖 Gideon finishes what his son could not

## 🌙 Took Away The Ornaments That Were On Their Camels' Necks

Ornaments here likely means crescent shaped moon charms, common jewelry among desert peoples.

These decorations marked the camels as belonging to kings, not ordinary riders.

Gideon keeps them as proof of victory and as valuable plunder.

This same word for ornaments returns again later in the chapter.

🌙 Ornaments likely meant crescent moon charms

🐫 They marked the camels as royal

🏆 Gideon kept them as proof of victory

➡️ The same word returns later in the chapter

# Judges 8:22-23
# 👑 Gideon Refuses The Crown
---
## 👑 Rule Thou Over Us, Both Thou, And Thy Son, And Thy Son's Son Also

Israel is not offering Gideon a temporary title here.

They are asking him to start a permanent, hereditary kingship, passed down through his family.

Israel had never had a human king at all up to this point.

This moment sits generations before Israel's later demand for a king in 1 Samuel.

👑 Israel offers a hereditary kingship

🏛️ Israel had never had a human king

📖 This scene comes generations before 1 Samuel

➡️ Gideon's answer will shape Israel's future

## 🙅 I Will Not Rule Over You

Gideon turns down the crown completely for himself.

A victorious general refusing ultimate power was rare in the ancient world.

His refusal protected Israel from placing its trust in one family's bloodline.

His refusal was not the whole story.

🙅 Gideon refuses the throne

🏆 Rejecting power was rare for a victor

🛡️ Israel avoids trusting one bloodline

➡️ His refusal was not the whole story

## 🚫 Neither Shall My Son Rule Over You

Gideon extends his refusal to his own children, not just himself.

He is closing the door on a dynasty before it can even start.

That makes what happens two verses later, when he builds something just for himself, especially surprising.

His son Abimelech will try to seize this exact kind of power anyway.

🚫 The refusal covers his children too

🚪 No dynasty is allowed to start

😲 His next actions still surprise the reader

📖 Abimelech will try to seize power anyway

## 🛐 The LORD Shall Rule Over You

Israel was meant to live under the LORD's direct rule, not a human king's.

Gideon states Israel's true government plainly here.

Judges like Gideon were meant to deliver Israel in a crisis, not reign permanently.

This same idea gets challenged again in 1 Samuel 8.

🛐 The LORD alone was meant to rule

⏳ Judges served for a season, not forever

📖 This idea returns in 1 Samuel 8

➡️ True loyalty belonged to God, not a king

# Judges 8:24-27
# 🪞 The Golden Ephod
---
## 🕌 For They Had Golden Earrings, Because They Were Ishmaelites

Ishmaelites and Midianites were closely related desert peoples, often named together in scripture.

Ishmael was Abraham's son through Hagar, and Midian was Abraham's son through his later wife Keturah.

Desert traders like these commonly wore heavy gold jewelry as visible, portable wealth.

Gideon now requests that wealth for himself.

🕌 Ishmaelites and Midianites were related peoples

👨‍👩‍👦 Both trace back to Abraham's sons

💰 Gold jewelry was portable, visible wealth

➡️ Gideon requests that wealth for himself

## 🧺 They Spread A Garment, And Did Cast Therein Every Man The Earrings Of His Prey

The people agree without any hesitation at all.

A spread garment created a simple, visible collection point for the gold.

Every soldier throws in his own share of the plunder.

This willingness contrasts sharply with Succoth and Penuel's earlier refusal to even share bread.

🧺 A spread garment collected the gold

✅ The people gave without hesitation

⚖️ This contrasts with Succoth's earlier refusal

📖 Generosity here follows real victory

## ⚖️ A Thousand And Seven Hundred Shekels Of Gold

A shekel was a small unit of weight, not a coin, close to two fifths of an ounce.

Seventeen hundred shekels adds up to about forty three pounds of pure gold.

That is an enormous personal fortune for one man to receive as a gift.

This gold becomes the raw material for what Gideon builds next.

⚖️ A shekel was a small weight unit

💰 The total was about forty three pounds

🤑 That is an enormous personal fortune

➡️ This gold becomes building material next

## 👘 Purple Raiment That Was On The Kings Of Midian

Raiment is an old word for clothing.

Purple dye was extremely expensive in the ancient world, reserved almost only for royalty.

Wearing it marked Zebah and Zalmunna as true kings, not just tribal chiefs.

Even in death, their clothing told the story of who they had been.

👘 Raiment is an old word for clothing

💜 Purple dye marked true royalty

👑 It confirmed the kings' high status

📖 Even their clothes told their story

## 👔 Gideon Made An Ephod Thereof

An ephod was normally a priestly garment worn only by Israel's high priest.

Gideon builds his own version out of solid gold, in a city that was not the tabernacle.

The man who just refused a crown ends up creating an object of worship anyway.

Good intentions at the start of a story do not guarantee a good ending.

👔 An ephod was normally a priest's garment

🏆 Gideon built his own golden version

😲 The crown refuser still builds an idol

➡️ Good beginnings do not guarantee good endings

## 😈 All Israel Went Thither A Whoring After It

Went a whoring after is an old idiom for chasing false gods instead of the LORD.

Chapter two already used this exact phrase for Israel's worship of Baalim.

The very object Gideon built to mark a real victory becomes something Israel worships instead of God.

A gift meant for God turned into a false god.

😈 Whoring after means chasing false gods

🔁 Chapter two already used this phrase

🙇 Israel worshiped the object, not God

📖 A gift for God became a false god

## 🕳️ Became A Snare Unto Gideon, And To His House

A snare is a trap, usually built to catch animals by surprise.

This trap will not only harm Gideon, it will strike his entire family.

Chapter nine tells the story of Abimelech, Gideon's own son, and the disaster still coming.

One choice cast a shadow far longer than one chapter.

🕳️ A snare is a hidden trap

👪 This trap will strike his whole family

➡️ Chapter nine reveals Abimelech's disaster

📖 One choice cast a long shadow

# Judges 8:28-32
# 🏠 Gideon's Household And Death
---
## 🕊️ The Country Was In Quietness Forty Years

Forty years is two full generations of peace in this culture.

This is the formula the book of Judges repeats after nearly every major deliverer.

This is also the longest stretch of peace named anywhere in the whole book.

Peace like this never lasted permanently in this repeating cycle.

🕊️ Forty years marks two generations of peace

🔁 Judges repeats this peace formula often

🏆 This is the book's longest peace

➡️ The peace never lasted forever

## 🏠 Jerubbaal The Son Of Joash Went And Dwelt In His Own House

Jerubbaal is the name Gideon earned back in chapter six, after tearing down his father's altar to Baal.

Despite his fame and the crown he was offered, he returns to ordinary private life.

He does not set up a royal court or a throne.

His public power ends where his own front door begins.

🏠 Jerubbaal returns to ordinary life

🏛️ He builds no throne or royal court

🚪 His fame ends at his own door

📖 Power did not change how he lived

## 👨‍👦‍👦 Threescore And Ten Sons Of His Body Begotten

Threescore and ten means seventy, seventy actual sons born to Gideon.

That number alone signals just how many wives he had taken.

A household this large would have been costly and hard to keep peaceful.

Chapter nine shows exactly how dangerous seventy brothers and one ambitious half brother can become.

👨‍👦‍👦 Threescore and ten means seventy sons

👰 Seventy sons implies many wives

💰 A household this size was costly

➡️ Chapter nine shows the real danger

## 👰 For He Had Many Wives

Multiple wives marked wealth and power for men in this culture, especially kings.

Gideon refused the title of king, but he still lived like one in his own household.

Deuteronomy had already warned Israel's future kings specifically against multiplying wives.

His private choices echoed the very throne he had declined.

👰 Many wives marked wealth and power

👑 Gideon lived like the king he refused

📜 Deuteronomy warned kings against this exact pattern

📖 His private choices echoed the throne he declined

## 🏙️ His Concubine That Was In Shechem

A concubine held a real but lower status than a full wife in this culture.

Shechem was a major city with a long history stretching back to Abraham and Jacob.

This detail plants the exact location where chapter nine's violence will later explode.

Every name and place mentioned here matters very soon.

🏙️ Concubine meant lower status than a wife

🗺️ Shechem carried deep patriarchal history

💣 This plants chapter nine's coming violence

➡️ Every detail here matters very soon

## 👶 Whose Name He Called Abimelech

Abimelech means my father is king in Hebrew.

Gideon had just finished saying, twice, that neither he nor his sons would rule.

Naming his own son this way reads like a quiet contradiction of his own words.

That contradiction becomes the whole plot of the very next chapter.

👶 Abimelech means my father is king

🙅 Gideon had just refused that title

🤔 The name contradicts his own words

📖 That contradiction becomes chapter nine's plot

## ⚰️ Buried In The Sepulchre Of Joash His Father, In Ophrah

Gideon is buried in his family's tomb, in his own hometown of Ophrah.

Ophrah is the very city where he tore down Baal's altar and later built the golden ephod.

His story ends exactly where it started, in the same small town.

Peace in his own lifetime did not guarantee peace for what came after him.

⚰️ Gideon is buried in his family's tomb

🏘️ Ophrah is where his whole story began

🔁 His life ends where it started

➡️ His death does not end the story

# Judges 8:33-35
# 🔙 Israel Turns Back To Baal
---
## ⛩️ Made Baalberith Their God

Baalberith means lord of the covenant in Hebrew.

Israel takes the very word for their true covenant and gives it to a false god instead.

Chapter nine later reveals this god had his own temple, right in Shechem.

This relapse happened the instant Gideon's protection was gone, not gradually over years.

⛩️ Baalberith means lord of the covenant

🔄 A covenant word is stolen for an idol

🏛️ This god had a temple in Shechem

📖 The fall came instantly, not slowly

## 🙈 Remembered Not The LORD Their God

Israel stopped remembering what the LORD had already done for them.

This same forgetting already appeared back in chapter two, as the pattern behind the whole book of Judges.

The LORD had delivered them from enemies on every side, not only from Midian.

Forgetting what God has done often comes before leaving Him.

🙈 This matches chapter two's warning pattern

🚫 Israel stopped remembering past rescues

🛡️ God had delivered them on every side

➡️ Forgetting comes before leaving God fully

## 💔 Neither Shewed They Kindness To The House Of Jerubbaal

Shewed is an old spelling of showed.

Israel forgot Gideon's own family, not only the LORD who had used him.

This sets up the tragedy of chapter nine directly, where Gideon's sons pay the price for that ingratitude.

A nation that forgets its rescuer also stops protecting the family left behind.

💔 Shewed is an old spelling of showed

👪 Israel forgot Gideon's own family too

⚠️ Chapter nine grows straight out of this

📖 Forgotten kindness leaves families unprotected

## 🎁 According To All The Goodness Which He Had Shewed Unto Israel

This final phrase looks back across the whole chapter and the one before it.

Gideon delivered Israel from Midian, refused a crown, and still tried to live an ordinary life afterward.

None of that goodness earned his family any lasting protection or gratitude.

The book of Judges never promises that doing right guarantees a safe ending.

🎁 This phrase sums up Gideon's whole legacy

🏆 He delivered, refused power, and lived simply

🚫 None of it earned his family safety

➡️ Doing right does not guarantee safety
`.trim();

export const JUDGES_EIGHT_PERSONAL_SECTIONS = parseJudgesEightRawNotes(JUDGES_EIGHT_RAW_NOTES);
