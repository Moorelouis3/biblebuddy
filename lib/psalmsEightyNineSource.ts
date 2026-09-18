export type PsalmsEightyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightyNineRawNotes(rawText: string): PsalmsEightyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+89:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 89 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+89:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+89:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 89 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 89,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 89:${startVerse}` : `Psalms 89:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Psalms 89 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTY_NINE_RAW_NOTES = `# Psalms 89:1-4
# 📯 A Covenant Sworn Forever
---
## 🎤 I Will Sing Of The Mercies Of The LORD

"Mercies" translates the Hebrew word chesed, God's loyal covenant love.

This is love that keeps its promises without fail.

The psalmist chooses to sing about it.

He does not merely feel it quietly.

Singing turns private trust into a public declaration.

🎤 Mercies means chesed, covenant loyalty
🤝 It is love that never fails
🎶 He chooses to sing about it
📖 Private trust becomes public declaration

## 📣 With My Mouth Will I Make Known Thy Faithfulness To All Generations

"Faithfulness" describes God keeping every word he has ever spoken.

"To all generations" means this praise is not meant to stop with the psalmist.

He wants children not yet born to hear this same truth.

A private prayer here becomes a message meant to outlast its writer.

📣 Faithfulness means God keeps his word
👶 To all generations means far beyond him
🕰️ The message is meant to outlast him
📖 One prayer reaches people not yet born

## 🏗️ Mercy Shall Be Built Up For Ever

This verse pictures mercy the way a builder pictures a tower.

Something built up rises steadily, layer added on top of layer.

God's mercy is not a single kind act.

It is a structure that keeps growing and never falls.

🏗️ Built up pictures a rising structure
📈 Mercy adds up, layer on layer
🏰 It is not one single kind act
📖 God's mercy keeps growing, never falling

## ⛰️ Thy Faithfulness Shalt Thou Establish In The Very Heavens

"Establish" means to fix something firmly in place, unable to be moved.

The heavens were the most permanent thing an ancient reader could picture.

Sun, moon, and sky never seemed to change or wear out.

Placing God's faithfulness there says nothing in creation is more lasting.

⛰️ Establish means fixed firmly in place
🌌 The heavens felt permanent to ancient readers
🔭 Nothing in the sky ever seemed to change
📖 Nothing in creation is more lasting than this

## 🤝 I Have Made A Covenant With My Chosen

A covenant in the ancient world was a binding agreement sealed by oath.

It was far stronger than a casual promise between friends.

"My chosen" refers to David, picked out from the rest of the people.

This line sets up the whole psalm, which unpacks that one covenant.

🤝 Covenant means a binding sealed agreement
⚖️ It was stronger than a casual promise
👑 Chosen refers to David specifically
📖 This covenant drives the entire psalm

## ✋ I Have Sworn Unto David My Servant

To swear meant calling on God himself as a witness to the promise.

This oath points back to the covenant God made in 2 Samuel chapter 7.

There, God promised David a lasting house, kingdom, and throne.

Psalm 89 spends its whole length wrestling with that one promise.

✋ To swear means calling God as witness
📜 It points back to 2 Samuel 7
👑 God promised David a lasting throne
📖 This whole psalm wrestles with that promise

## 🌳 Thy Seed Will I Establish For Ever

"Seed" is the Old Testament word for descendants, one's family line.

The promise is not just for David but for every king after him.

This becomes one of the most quoted verses about David's dynasty.

Later writers connect this everlasting seed to the coming Messiah.

🌳 Seed means descendants, one's family line
👑 The promise covers every king after David
📜 It is quoted often about David's line
📖 Later writers connect it to the Messiah

## 🪑 Build Up Thy Throne To All Generations. Selah

A throne stood for more than furniture, it stood for the right to rule.

"To all generations" repeats the promise that this rule never ends.

"Selah" is a musical pause, telling the reader to stop and reflect.

The psalm wants its first big promise to sink in before moving on.

🪑 Throne stands for the right to rule
🔁 To all generations repeats never ending
⏸️ Selah is a pause to reflect
📖 The promise is meant to sink in

# Psalms 89:5-8
# 🌌 None Compares To The Lord
---
## 🎼 The Heavens Shall Praise Thy Wonders, O LORD

This verse pictures the sky itself joining in worship.

"Wonders" refers to God's mighty, awe filled acts.

Even creation without a human voice is described as praising God.

The whole universe is drawn into the same song the psalmist is singing.

🎼 Heavens praising pictures all creation worshiping
✨ Wonders means God's mighty, awe filled acts
🌠 Even the sky is drawn into praise
📖 The whole universe joins the psalmist's song

## 👼 Thy Faithfulness Also In The Congregation Of The Saints

"The congregation of the saints" describes a gathered assembly of holy beings.

Many scholars believe this pictures the heavenly court around God's throne.

It is not a crowd of ordinary worshipers on earth.

Even that highest gathering exists to declare God's faithfulness.

👼 Saints here means holy beings, not people
🏛️ Many scholars see a heavenly court
🌟 It is not an earthly crowd
📖 Even heaven exists to declare his faithfulness

## ❓ Who In The Heaven Can Be Compared Unto The LORD

This is the first of two rhetorical questions in a row.

A rhetorical question expects no answer because the answer is obvious.

The implied answer here is simple, no one compares to the LORD.

Even the highest beings in heaven fall short of him.

❓ A rhetorical question expects no real reply
🚫 The obvious answer is no one at all
👼 Even heavenly beings fall short of God
📖 Nothing in heaven can rival the LORD

## 💪 Who Among The Sons Of The Mighty Can Be Likened Unto The LORD

"Sons of the mighty" is another name for powerful heavenly beings.

Ancient readers pictured a council of mighty spirits surrounding God's throne.

Even the strongest of these cannot be compared to him.

The psalm keeps stacking comparisons to make God's uniqueness impossible to miss.

💪 Sons of the mighty means powerful spirits
🏛️ Ancient readers pictured a heavenly council
🚫 Even the strongest cannot compare to God
📖 God's uniqueness is stacked line after line

## 😨 God Is Greatly To Be Feared In The Assembly Of The Saints

"Feared" here does not mean cowering in terror.

It means overwhelming reverence, the kind owed to someone truly holy.

Even the assembly closest to God responds to him this way.

If heaven itself trembles before him, no one on earth stands equal.

😨 Feared means reverence, not simple terror
👼 Even heaven's assembly responds this way
🙇 It is reverence owed to holiness
📖 No one on earth stands equal to God

## 🙇 To Be Had In Reverence Of All Them That Are About Him

"Them that are about him" describes those surrounding God's throne.

Reverence here means treating someone as set apart and worthy of honor.

This line restates the verse before it in different words.

Hebrew poetry often repeats one idea using two different pictures.

🙇 Those about him surround God's throne
🌟 Reverence means honoring someone set apart
🔁 This restates the line before it
📖 Hebrew poetry often repeats one idea twice

## 🎖️ O LORD God Of Hosts

"Hosts" refers to vast armies, whether angelic or earthly.

The title pictures God commanding forces beyond human counting.

It is used across the Old Testament as a title of raw power.

Calling on this name reminds the reader exactly who is being addressed.

🎖️ Hosts means vast armies, seen and unseen
⚔️ It pictures forces beyond human counting
📜 It is a common Old Testament title
📖 It reminds the reader who is addressed

## 🔄 Who Is A Strong LORD Like Unto Thee, Or To Thy Faithfulness Round About Thee

This verse repeats the same challenge asked twice already.

"Round about thee" pictures faithfulness surrounding God on every side.

It is not one trait among many, it wraps entirely around him.

The psalm has now asked the same unanswerable question three separate times.

🔄 The same challenge is asked a third time
🌀 Round about pictures being wrapped completely
🛡️ Faithfulness is not one trait among many
📖 The question stays deliberately unanswerable

# Psalms 89:9-13
# 🌊 Ruler Of The Raging Sea
---
## 🌊 Thou Rulest The Raging Of The Sea

In the ancient world, the sea often symbolized chaos and danger.

Sailors feared it as a force no one could fully control.

Here God is shown ruling over that very chaos with ease.

This same picture reappears later when Jesus calms a storm on the water.

🌊 The sea symbolized chaos and danger
⛵ Sailors feared a force they could not control
👑 God rules over that chaos with ease
📖 Jesus later calms the sea the same way

## 🤫 When The Waves Thereof Arise, Thou Stillest Them

"Stillest" means to calm or silence something completely.

Waves rising and falling pictured danger that could swallow a ship whole.

God does not merely survive the storm, he commands it to stop.

The verse pictures total control, not a narrow escape.

🤫 Stillest means calming something completely
🚢 Rising waves pictured danger to any ship
🛑 God commands the storm to stop
📖 This is total control, not a narrow escape

## 💥 Thou Hast Broken Rahab In Pieces, As One That Is Slain

"Rahab" here is not the woman from Jericho in the book of Joshua.

It is a poetic name for a sea monster symbolizing chaos.

Some Old Testament poems also use it as a nickname for Egypt.

Either reading pictures God defeating the most feared force imaginable.

💥 Rahab here is a chaos monster's name
🐊 Some poems use it as Egypt's name
⚔️ God is shown defeating this feared force
📖 The image pictures total, decisive victory

## 💪 Thou Hast Scattered Thine Enemies With Thy Strong Arm

"Arm" in Old Testament poetry stands for active strength and power.

To scatter enemies pictures breaking up an army so it cannot fight back.

This is not distant, background power, it is power put to direct use.

The same arm that rules the sea also defeats human enemies.

💪 Arm stands for active strength and power
💨 Scattered pictures an army broken apart
⚔️ This power is put to direct use
📖 The same arm rules sea and enemies alike

## 🌍 The Heavens Are Thine, The Earth Also Is Thine

This verse claims ownership over the two largest categories a reader could name.

Together heaven and earth stand for the whole of creation.

Nothing exists that falls outside these two categories.

The claim is total, not partial ownership over a portion of the world.

🌍 Heaven and earth stand for everything
🧮 Nothing exists outside these two categories
👑 This is total ownership, not partial
📖 God claims the whole of creation

## 🌐 As For The World And The Fulness Thereof, Thou Hast Founded Them

"The fulness thereof" means everything the world contains inside it.

"Founded" pictures laying a foundation, the way a builder starts a house.

Ownership here rests on the fact that God built it from the start.

He owns creation because he is the one who made it.

🌐 Fulness thereof means everything inside it
🏗️ Founded pictures laying a foundation
🔨 Ownership rests on having built it
📖 God owns creation because he made it

## 🧭 The North And The South Thou Hast Created Them

Naming two opposite directions was a common way of meaning everything between them.

This kind of pairing is called a merism in Hebrew poetry.

Saying north and south really means the entire compass, every direction.

Creation in every direction traces back to the same maker.

🧭 North and south names opposite directions
🔗 This pairing is called a merism
🌐 It really means every direction at once
📖 Every direction traces back to the same maker

## ⛰️ Tabor And Hermon Shall Rejoice In Thy Name

Tabor and Hermon were two well known mountains in ancient Israel.

Mount Tabor rose in the north, and Mount Hermon stood even further north.

Naming both pictures the whole land joining in praise.

Even fixed, silent mountains are pictured celebrating God's name.

⛰️ Tabor and Hermon were well known mountains
🗺️ Naming both pictures the whole land
🎉 Even silent mountains are pictured rejoicing
📖 Creation itself is drawn into celebration

# Psalms 89:14-18
# ☀️ Walking In The Light Of His Face
---
## ⚖️ Justice And Judgment Are The Habitation Of Thy Throne

"Habitation" means the place where something lives or rests permanently.

The throne here pictures God's rule, and its resting place is justice.

This means fairness is not occasional for God, it is foundational.

Everything God rules is built on a foundation that cannot be unfair.

⚖️ Habitation means where something rests permanently
🪑 The throne pictures God's rule
🏛️ Fairness is foundational, not occasional
📖 God's rule cannot rest on unfairness

## ❤️ Mercy And Truth Shall Go Before Thy Face

This verse pictures mercy and truth as attendants walking ahead of a king.

They arrive before God does, announcing what kind of ruler is coming.

Mercy and truth together describe both his kindness and his honesty.

Wherever God goes, both of these qualities are already there first.

❤️ Mercy and truth are pictured as attendants
👑 They announce the kind of ruler coming
🤝 They describe both kindness and honesty
📖 Both qualities arrive before God does

## 🎺 Blessed Is The People That Know The Joyful Sound

"The joyful sound" likely refers to a trumpet blast used at festivals.

That blast called people together to celebrate before the LORD.

Knowing the sound means recognizing the call and responding to it with joy.

Blessing here belongs to people who show up for God's celebration.

🎺 Joyful sound likely means a festival trumpet
📯 It called people to celebrate together
🎉 Knowing it means responding with joy
📖 Blessing belongs to those who show up

## 🚶 They Shall Walk, O LORD, In The Light Of Thy Countenance

"Countenance" is an old word for someone's face or expression.

Walking in the light of a face pictures living under someone's warm attention.

A bright face signals favor, while a hidden face signals rejection.

This verse pictures a whole people living inside God's continual favor.

🚶 Countenance is an old word for face
😊 Light of the face pictures warm favor
🌑 A hidden face would signal rejection
📖 This people lives inside continual favor

## 🎉 In Thy Name Shall They Rejoice All The Day

"Thy name" stands for God's whole character and reputation.

Rejoicing in a name means celebrating who someone actually is.

"All the day" means this joy is not occasional, it is constant.

Their happiness is tied to God's character, not to changing circumstances.

🎉 Name stands for God's whole character
🎊 Rejoicing in it means celebrating who he is
🕐 All the day means constant, not occasional
📖 Their joy depends on God, not circumstance

## 📈 In Thy Righteousness Shall They Be Exalted

"Exalted" means lifted up to a place of honor.

Righteousness here means God's own moral perfection and rightness.

The people are not lifted by their own effort or record.

They rise because God's own righteousness is credited to their standing.

📈 Exalted means lifted to a place of honor
⚖️ Righteousness means God's own moral perfection
🙅 Their own effort does not lift them
📖 God's righteousness lifts their standing instead

## 💪 Thou Art The Glory Of Their Strength

"Glory" here means the source of something's brightness or worth.

The people's strength is not something they generated on their own.

Whatever strength they have traces back to God as its true source.

Take God away, and the strength this verse describes disappears with him.

💪 Glory means the true source of worth
🔋 Their strength is not self generated
🔗 It traces back to God as the source
📖 Remove God and the strength disappears

## 🐂 In Thy Favour Our Horn Shall Be Exalted

A horn on an animal like a bull was a symbol of strength and dignity.

To exalt someone's horn meant raising up their honor and power publicly.

"Favour" means God's kindness shown toward someone he delights in.

Their strength is a gift of favor, not a trophy they earned.

🐂 A horn symbolized an animal's strength
👑 Exalting a horn means raising honor publicly
🎁 Favour means kindness freely given
📖 Their strength is a gift, not a trophy

## 🛡️ For The LORD Is Our Defence

"Defence" pictures a shield or wall protecting something vulnerable.

The people do not rely on armies or fortresses as their real protection.

Every other defense could fail, but this one is described as sure.

Safety here is rooted in a person, not in weapons or walls.

🛡️ Defence pictures a shield or wall
🏰 Armies and walls are not the real safety
✅ This defense is described as sure
📖 Safety is rooted in a person, not weapons

## 👑 The Holy One Of Israel Is Our King

"The Holy One of Israel" is a title used often in the prophets.

"Holy" means set apart, entirely different from anything common or ordinary.

Calling him king means submitting to his rule, not just admiring him.

Israel's king is not a human dynasty but God himself.

👑 Holy One of Israel is a prophetic title
✨ Holy means set apart, entirely different
🙇 Calling him king means submitting to him
📖 Israel's true king is God himself

# Psalms 89:19-21
# 👑 David Found And Anointed
---
## 🗣️ Then Thou Spakest In Vision To Thy Holy One

God's speech begins here and continues for many verses that follow.

"In vision" describes a message delivered through prophetic revelation, not a dream alone.

This likely points back to the prophet Nathan in 2 Samuel chapter 7.

The rest of the psalm is quoting what God said through that moment.

🗣️ God's own speech begins in this verse
👁️ Vision means a message through revelation
📜 It likely points to Nathan's message
📖 The psalm now quotes God directly

## 🌱 One Chosen Out Of The People

David was not born into a royal family expecting the throne.

He was the youngest son, tending sheep when he was chosen.

"Out of the people" stresses that he rose from ordinary beginnings.

God's choice, not David's status, is what put him on the throne.

🌱 David had ordinary, unroyal beginnings
🐑 He was tending sheep when chosen
📊 Out of the people stresses no status
📖 God's choice put him on the throne

## 🫒 I Have Found David My Servant

"Found" here is the language of deliberate choice, not accidental discovery.

God is not stumbling onto David as if by surprise.

The same word is used elsewhere for carefully searching something out.

This is a declaration of selection, not luck or coincidence.

🫒 Found means deliberate choice, not accident
🔍 It pictures careful searching, not stumbling
🎯 This is selection, not luck
📖 God chose David on purpose

## 🛢️ With My Holy Oil Have I Anointed Him

Anointing meant pouring oil over someone's head to set them apart for office.

This custom marked prophets, priests, and kings across the Old Testament.

Samuel anointed David privately long before he ever wore the crown.

The oil symbolized God's own choice resting visibly on that one person.

🛢️ Anointing meant oil poured to set apart
👑 It marked prophets, priests, and kings
📜 Samuel anointed David long before his crown
📖 The oil showed God's choice resting on him

## ✋ With Whom My Hand Shall Be Established

"Hand" in Hebrew poetry often pictures God's active power at work.

To be established by that hand means being firmly supported and confirmed.

This is not distant approval, it is hands on support.

David's rule stands because God's own power is holding it up.

✋ Hand pictures God's active power
🏗️ Established means firmly supported and confirmed
🤲 This is hands on support, not distance
📖 God's power holds David's rule up

## 💪 Mine Arm Also Shall Strengthen Him

"Arm" again pictures raw strength, paired here with the hand from before.

Hand and arm together describe complete, active support for David.

This is not a one time boost but continual strengthening.

Whatever David faces, this verse promises ongoing power behind him.

💪 Arm pictures raw, active strength
🤝 Hand and arm together mean complete support
🔁 This strengthening is continual, not one time
📖 Ongoing power stands behind David

# Psalms 89:22-25
# 🛡️ Foes Beaten Down Before Him
---
## 🚫 The Enemy Shall Not Exact Upon Him

"Exact" is an old word meaning to demand payment or tribute by force.

The picture is of an enemy trying to squeeze David for what he has.

This promise says no enemy will succeed in extorting him.

David's security here comes from God's protection, not his own defenses.

🚫 Exact means demanding tribute by force
💰 It pictures an enemy trying to squeeze him
🛡️ No enemy will succeed at this
📖 His security comes from God, not himself

## 😈 Nor The Son Of Wickedness Afflict Him

"Son of wickedness" is a Hebrew idiom describing someone defined by evil.

Calling someone a "son of" something meant they fully embodied that trait.

This is not one bad person but a category of enemy.

The promise covers every kind of wicked opponent, not just a single threat.

😈 An idiom describing evil people
🏷️ Son of names someone's defining trait
📂 This covers a category, not one enemy
📖 The promise covers every wicked opponent

## ⚔️ And I Will Beat Down His Foes Before His Face

"Before his face" means David will see this victory happen himself.

This is not a distant rumor of triumph reaching him later.

God promises visible, witnessed defeat of David's enemies.

The king gets to watch the promise proven true in real time.

⚔️ Before his face means witnessed personally
👀 Not a rumor reaching him later
✅ God promises visible, witnessed defeat
📖 David watches the promise proven true

## 🦠 And Plague Them That Hate Him

"Plague" here means striking someone with trouble or affliction.

This extends the promise beyond battle to those who simply hate David.

Hatred alone, even without open attack, draws this response.

The promise reaches every level of hostility aimed at the king.

🦠 Plague means striking with trouble
💔 This covers hatred, not only open battle
🎯 Hostility alone is enough to draw this
📖 The promise reaches every level of hostility

## 🤝 But My Faithfulness And My Mercy Shall Be With Him

This pairs the same two words used earlier about God's own character.

Faithfulness and mercy are no longer abstract, they now attach to David personally.

What was true about God in general becomes true for David specifically.

The king's security rests entirely on borrowed, not earned, character.

🤝 Faithfulness and mercy reappear here
👤 They now attach to David personally
🔗 God's character becomes David's security
📖 His security is borrowed, not earned

## 📯 And In My Name Shall His Horn Be Exalted

The horn image returns, now applied directly to David himself.

Earlier the horn belonged to the whole people together.

Here that same strength and honor rests on one man, the king.

David's personal exaltation is meant to represent the whole nation's.

📯 Horn again means strength and honor
🇮🇱 Earlier this belonged to the whole people
👑 Now it rests on David alone
📖 His honor represents the whole nation's

## 🌊 I Will Set His Hand Also In The Sea

Naming the sea points toward the western edge of the promised land.

This is the start of another merism describing total territory.

David's authority is pictured reaching all the way to the coast.

The promise is about geography as much as personal favor.

🌊 Sea points to the western border
🗺️ This begins another merism about territory
🧭 His authority reaches to the coast
📖 The promise covers geography, not just favor

## 🏞️ And His Right Hand In The Rivers

"The rivers" most likely points to the Euphrates in the east.

Paired with the sea, this completes a west to east merism.

Together the two images picture the full extent of the promised land.

David's rule is promised over the whole territory, border to border.

🏞️ Rivers likely means the Euphrates in the east
🧭 Paired with sea, it completes west to east
🗺️ Together they picture the whole territory
📖 His rule is promised border to border

# Psalms 89:26-29
# 👶 Made God's Firstborn Son
---
## 🙏 He Shall Cry Unto Me, Thou Art My Father

David is pictured speaking back to God in this verse.

Calling God "my father" claims an unusually close, personal relationship.

This does not mean David is divine, but that he is uniquely adopted.

The Davidic king stands in a father and son relationship with God.

🙏 David speaks back to God here
👨 Father claims a close personal bond
🚫 It does not mean David is divine
📖 The king is uniquely adopted as a son

## 🪨 My God, And The Rock Of My Salvation

"Rock" is a common Old Testament image for something completely stable.

Standing on rock, unlike sand, meant standing on ground that could not shift.

"Salvation" here means rescue, deliverance from danger or defeat.

David's confidence rests on a foundation that cannot be moved.

🪨 Rock pictures completely stable ground
🏖️ Unlike sand, rock cannot shift
🆘 Salvation means rescue from danger
📖 David's confidence rests on unmoved ground

## 👶 Also I Will Make Him My Firstborn

"Firstborn" was a legal rank, not simply a birth order.

In the ancient world, the firstborn received the largest inheritance and highest honor.

David was not literally God's first son, since David is not divine.

He is given the rank of firstborn as an act of honor.

👶 Firstborn was a legal rank, not birth order
🎁 Firstborn meant the largest inheritance and honor
🚫 David is not literally God's first son
📖 He receives firstborn rank as an honor

## 🌍 Higher Than The Kings Of The Earth

This line sets David above every other ruler in the ancient world.

"Kings of the earth" describes every human monarch, however powerful.

The promise is not modest, it claims the highest possible rank.

Later readers connect this rank to the coming Messiah's ultimate kingship.

🌍 Kings of the earth means every ruler
📈 The claim is the highest possible rank
👑 This is not a modest promise
📖 Later readers link this to the Messiah

## 💗 My Mercy Will I Keep For Him For Evermore

"Keep" pictures guarding something carefully so it is never lost.

Mercy is not simply given once, it is actively preserved over time.

"Evermore" removes any expiration date from this promise.

The security offered here has no built in end point.

💗 Keep pictures guarding something carefully
⏳ Mercy is actively preserved, not one time
🔓 Evermore removes any expiration date
📖 This promise has no built in end

## 🔒 And My Covenant Shall Stand Fast With Him

"Stand fast" pictures something anchored so firmly it cannot be knocked over.

A covenant standing fast means its terms will not later be renegotiated.

This restates the promise using firmer, more physical language.

The psalm keeps repeating permanence because that permanence is about to be tested.

🔒 Stand fast pictures something firmly anchored
📜 Its terms will not be renegotiated
🔁 This restates the promise more firmly
📖 Permanence is stressed before it is tested

## 🌱 His Seed Also Will I Make To Endure For Ever

This is now the third time the psalm promises David's line will not end.

Repetition in Hebrew poetry signals how important a promise truly is.

The dynasty, not just one king, is what is guaranteed here.

Every future king in David's family is included in this one promise.

🌱 Seed again means David's descendants
🔁 This is the third such promise
👑 The whole dynasty, not one king, is meant
📖 Every future descendant is included here

## 🌤️ And His Throne As The Days Of Heaven

"The days of heaven" pictures something lasting as long as the sky itself exists.

Ancient readers saw the sky as fixed and unchanging.

Comparing a throne to it claims a similarly unending future.

This image sets up a painful contrast with what happens later in the psalm.

🌤️ Days of heaven pictures the sky's permanence
🔭 Ancient readers saw the sky as unchanging
🪑 The throne is compared to that permanence
📖 This sets up a painful later contrast

# Psalms 89:30-34
# 🪵 Discipline Without Abandonment
---
## 📜 If His Children Forsake My Law, And Walk Not In My Judgments

The psalm now shifts from pure promise to a conditional warning.

"Forsake" means abandoning something a person once had a duty to keep.

"Judgments" here refers to specific rulings and standards God had given.

This verse opens the door to the possibility of David's descendants failing.

📜 The psalm shifts to a warning
🚪 Forsake means abandoning a kept duty
⚖️ Judgments means specific rulings God gave
📖 It admits David's line could fail

## 📏 If They Break My Statutes, And Keep Not My Commandments

This verse repeats the same warning using two more legal words.

Hebrew poetry often uses four near synonyms to describe one full obligation.

Law, judgments, statutes, and commandments together describe the whole covenant relationship.

The stacked wording shows how completely they could fail, not just partly.

📏 This repeats the warning with new words
🔤 Hebrew poetry often stacks near synonyms
📚 Together these four words mean the whole law
📖 The stacking shows total, not partial, failure

## 🪵 Then Will I Visit Their Transgression With The Rod

"Visit" here means God stepping in to respond directly to wrongdoing.

A rod pictures a tool for correction, like a shepherd guiding a sheep.

This is discipline meant to correct, not a weapon meant to destroy.

The image points toward training, closer to parenting than to warfare.

🪵 Visit means stepping in to respond
🐑 A rod pictures a shepherd's correcting tool
🎯 This is discipline, not destruction
📖 The image is closer to parenting than war

## 🩹 And Their Iniquity With Stripes

"Stripes" refers to the marks left by physical punishment.

This continues the same picture of firm, painful correction.

It is serious punishment, but it still falls short of rejection.

Even hard discipline in this psalm is not the same as being cast off.

🩹 Stripes means marks from real punishment
😖 It continues the picture of firm correction
⚠️ It is serious but still not rejection
📖 Discipline is not the same as rejection

## 🚫 Nevertheless My Lovingkindness Will I Not Utterly Take From Him

"Nevertheless" marks a hard turn back toward the original promise.

"Lovingkindness" is another translation of the same word chesed from verse 1.

"Utterly" means completely, leaving no partial version of this mercy behind.

Even under discipline, the underlying relationship itself is never severed.

🚫 Nevertheless marks a turn back to promise
❤️ Lovingkindness is chesed again, from verse 1
💯 Utterly means completely, with no partial version
📖 Discipline never severs the relationship itself

## 🛡️ Nor Suffer My Faithfulness To Fail

"Suffer" here is an old word meaning to allow or permit.

God is promising he will not permit his own faithfulness to break down.

Faithfulness failing would mean God going back on his own character.

The promise is really about God's own consistency, not David's performance.

🛡️ Suffer means to allow or permit
🚫 God will not permit faithfulness to break
🧬 Failing would mean God contradicting himself
📖 The promise rests on God's own consistency

## 🖋️ My Covenant Will I Not Break

This restates the promise from earlier in the plainest possible words.

"Break" pictures snapping something that was once whole and intact.

Discipline is allowed in this psalm, but breaking the covenant is not.

The line draws a firm boundary between correction and abandonment.

🖋️ Break pictures snapping something whole
⚖️ Discipline is allowed, breaking is not
🚧 A firm boundary is drawn here
📖 Correction and abandonment are kept separate

## 🗣️ Nor Alter The Thing That Is Gone Out Of My Lips

"Alter" means to change something after it has already been fixed.

Once words leave someone's lips, in this picture, they cannot be taken back.

This reflects a strong ancient view of a spoken oath's binding power.

God's own past words become the guarantee holding this whole promise together.

🗣️ Alter means changing something already fixed
📤 Once spoken, words cannot be taken back
📜 This reflects an oath's binding power
📖 God's own words guarantee the promise

# Psalms 89:35-37
# 🌞 Sworn By God's Own Holiness
---
## ☝️ Once Have I Sworn By My Holiness

Swearing "by" something meant calling on it as the highest possible guarantee.

There is nothing higher than God's own holiness to swear by.

"Once" stresses that this oath was not casually repeated over and over.

One sworn statement, backed by the highest possible authority, is enough.

☝️ Swearing by something calls it as guarantee
⛰️ Nothing is higher than God's holiness
🔂 Once stresses this was not casual repetition
📖 One oath from the highest authority is enough

## 🤥 That I Will Not Lie Unto David

This is the specific content of the oath God just swore.

Lying would mean the covenant promises turning out to be false.

The verse states plainly what is actually at stake in this whole psalm.

Everything that follows tests whether this exact line stays true.

🤥 Lying would mean the promises are false
📌 This states plainly what is at stake
⚖️ The oath's content is named directly
📖 Everything later tests this exact line

## 🌱 His Seed Shall Endure For Ever

This is now the fourth repetition of the everlasting seed promise.

Such heavy repetition signals how central this promise is to the whole psalm.

The word "endure" adds the idea of surviving hardship, not just existing.

The line insists David's descendants will outlast whatever difficulty comes.

🌱 This is the fourth such promise
🔁 Heavy repetition signals central importance
💪 Endure adds surviving hardship, not just existing
📖 David's line is promised to outlast trouble

## ☀️ And His Throne As The Sun Before Me

The sun was the most reliable, visible object in the ancient sky.

It rose every day without fail, as far as any observer could tell.

Comparing the throne to the sun claims that same daily reliability.

"Before me" adds that God himself is watching this promise stay true.

☀️ The sun was the sky's most reliable object
🌅 It rose daily without fail
🪑 The throne claims that same reliability
📖 God himself watches the promise stay true

## 🌙 It Shall Be Established For Ever As The Moon

The moon joins the sun as a second fixed witness in the sky.

Unlike the sun, the moon visibly changes shape night after night.

Even so, its cycle was completely predictable and never actually stopped.

Predictable change, not stillness, becomes another picture of lasting reliability.

🌙 The moon is a second sky witness
🔄 It visibly changes shape each night
📅 Its cycle was always predictable
📖 Predictable change still pictures reliability

## ⏸️ And As A Faithful Witness In Heaven. Selah

"Witness" pictures the sky itself testifying that this promise is real.

Anyone who looks up sees a silent guarantee written into creation.

"Selah" again asks the reader to pause before the tone changes.

This is the last calm moment before the psalm turns to lament.

⏸️ Witness pictures the sky testifying
👀 Anyone looking up sees this guarantee
🔀 Selah signals a coming change in tone
📖 This is the last calm moment

# Psalms 89:38-45
# 💔 Cast Off And Abhorred
---
## 🔄 But Thou Hast Cast Off And Abhorred

The single word "but" turns the entire psalm in a new direction.

Everything promised as unbreakable now sounds broken in real experience.

"Cast off" and "abhorred" are two of the strongest rejection words available.

This sudden shift is the whole reason Psalm 89 is remembered as painful.

🔄 But turns the whole psalm around
💥 The unbreakable promise now sounds broken
😔 Cast off and abhorred are strong rejection words
📖 This shift is why the psalm feels painful

## 😠 Thou Hast Been Wroth With Thine Anointed

"Wroth" is an old word for intense, burning anger.

"Thine anointed" refers to the king, the same office promised permanence earlier.

The very person God swore to protect now feels the weight of his anger.

The contrast with verses 20 and following could hardly be sharper.

😠 Wroth means intense, burning anger
👑 Anointed refers to the promised king
⚡ That same king now feels God's anger
📖 The contrast with earlier promises is sharp

## 📜 Thou Hast Made Void The Covenant Of Thy Servant

"Made void" means treating something as if it never had force at all.

This directly contradicts the earlier promise that the covenant would never break.

The psalmist is not softening the contradiction, he is naming it plainly.

Honest prayer in scripture is allowed to name what feels like broken promises.

📜 Made void means treated as having no force
🔨 This directly contradicts the earlier promise
🗣️ The psalmist names the contradiction plainly
📖 Honest prayer can name a broken feeling promise

## 👑 Thou Hast Profaned His Crown By Casting It To The Ground

"Profaned" means treating something sacred as common or worthless.

A crown thrown to the ground pictures total, public humiliation.

This likely reflects an actual defeat suffered by one of David's descendants.

The image is deliberately shocking, matching how shocking the loss actually felt.

👑 Profaned means treating something sacred as worthless
🕳️ A fallen crown pictures public humiliation
⚔️ This likely reflects a real historic defeat
📖 The shocking image matches the shocking loss

## 🧱 Thou Hast Broken Down All His Hedges

"Hedges" pictures protective boundaries, like a wall around a vineyard.

Removing them left the kingdom exposed with no defense left standing.

This is the opposite of the strong defense promised in verse 18.

Every wall that once felt secure has now been torn down.

🧱 Hedges picture protective boundaries
🍇 Removing them left the kingdom exposed
🔄 This reverses the defense promised earlier
📖 Every once secure wall is torn down

## 🏚️ Thou Hast Brought His Strong Holds To Ruin

"Strong holds" refers to fortified places built for defense in war.

Bringing them to ruin means these defenses no longer function at all.

A kingdom that once trusted its fortresses now has nothing to trust.

The picture continues the theme of total, not partial, collapse.

🏚️ Strong holds means fortified defensive places
💥 Ruin means these defenses no longer function
🏰 The kingdom now has nothing to trust
📖 The collapse described here is total

## 🚶 All That Pass By The Way Spoil Him

This pictures an ordinary traveler robbed by anyone who happens to walk past.

"Spoil" means to plunder or take by force.

The image shows a kingdom with no protection left, an easy target.

Anyone at all, not just a powerful enemy, can now take advantage.

🚶 The picture is an ordinary robbed traveler
💰 Spoil means to plunder by force
🎯 The kingdom is shown as an easy target
📖 Even weak enemies can now take advantage

## 😳 He Is A Reproach To His Neighbours

"Reproach" means public shame, mockery said openly by others.

"Neighbours" refers to the surrounding nations who once feared or respected Israel.

Those nations now openly mock what they used to admire.

Shame from outsiders adds another layer of pain to an already hard defeat.

😳 Reproach means public shame and mockery
🗺️ Neighbours means the surrounding nations
👀 They now mock what they once feared
📖 Outside shame adds to an already hard defeat

## 🙌 Thou Hast Set Up The Right Hand Of His Adversaries

The right hand raised in victory was a common posture in ancient art.

Setting up an enemy's right hand pictures handing them the victory pose.

This is the opposite of verse 13, where God's own right hand was exalted.

The very posture once claimed for God now belongs to the enemy.

🙌 A raised right hand pictured victory
🔄 This hands the victory pose to enemies
⚖️ It reverses the image from verse 13
📖 God's posture now belongs to the enemy

## 😄 Thou Hast Made All His Enemies To Rejoice

This adds an emotional layer on top of the physical defeat already described.

It is one thing to lose, it is another for enemies to celebrate it.

Rejoicing enemies make the shame of the loss even harder to bear.

The psalm keeps stacking every kind of pain onto this one collapse.

😄 Enemy rejoicing adds an emotional layer
🎭 Losing and being mocked are not the same
💔 Celebrating enemies deepen the shame
📖 The psalm stacks every kind of pain here

## 🗡️ Thou Hast Also Turned The Edge Of His Sword

"Turned the edge" pictures a blade bent so it can no longer cut.

A soldier's sword was his most basic tool for survival in battle.

Even that most basic tool is described as failing him now.

This image pictures total helplessness, not simply a difficult fight.

🗡️ Turned the edge pictures a bent, dull blade
⚔️ A sword was a soldier's basic tool
🚫 Even that basic tool now fails him
📖 The image shows total helplessness

## 🧍 And Hast Not Made Him To Stand In The Battle

To "stand" in battle meant holding one's ground against an attack.

Not being made to stand pictures collapse rather than a hard struggle.

This is not a story of a close fight narrowly lost.

The psalm describes complete defeat, with no ground held at all.

🧍 To stand meant holding ground in battle
📉 Not standing pictures collapse, not a struggle
❌ This is not a close, narrow loss
📖 The defeat described here is complete

## 🌑 Thou Hast Made His Glory To Cease

"Glory" here means the honor and splendor once surrounding the king.

"To cease" means it stopped entirely, not merely faded a little.

This directly reverses the honor promised back in verse 17.

What God once gave, this verse says God himself has removed.

🌑 Glory means the king's honor and splendor
🛑 To cease means stopped entirely, not faded
🔄 This reverses the promise from verse 17
📖 What God gave, God is said to remove

## 🪑 And Cast His Throne Down To The Ground

This directly contradicts the earlier promise that the throne would last forever.

The psalmist is not avoiding that contradiction, he states it in plain words.

Naming the pain honestly is part of how this psalm prays.

Faith here does not require pretending nothing has gone wrong.

🪑 This contradicts the everlasting throne promise
🗣️ The psalmist states the contradiction plainly
🙏 Naming pain honestly is part of prayer
📖 Faith here does not pretend nothing is wrong

## ⏳ The Days Of His Youth Hast Thou Shortened

This pictures a reign or a life cut off before its expected length.

"Youth" points to what should have been the vigorous, early years of rule.

Instead those years were cut painfully short of what was expected.

The loss described touches not just power but time itself.

⏳ A reign cut short before its length
💪 Youth points to expected vigorous early years
✂️ Those years were cut painfully short
📖 The loss touches time, not just power

## 😳 Thou Hast Covered Him With Shame. Selah

"Covered" pictures shame wrapped completely around a person, unavoidable.

This is the opposite of being covered in glory or honor.

"Selah" again asks the reader to pause and feel the full weight.

The psalm has now spent many verses describing total, public reversal.

😳 Covered pictures shame wrapped completely around him
🔄 It is the opposite of glory or honor
⏸️ Selah asks the reader to feel this weight
📖 Total, public reversal has now been fully named

# Psalms 89:46-48
# ⏳ How Long Will You Hide
---
## ❓ How Long, LORD, Wilt Thou Hide Thyself For Ever

"How long" is the classic opening of a lament prayer in the Psalms.

The psalmist is not being patient here, he is asking God to act now.

"Hide thyself" recalls the same complaint made in Psalm 88.

Both psalms wrestle honestly with feeling God has gone silent.

❓ How long opens a classic lament prayer
⏰ The psalmist asks God to act now
🙈 Hide thyself echoes Psalm 88's complaint
📖 Both psalms wrestle with God's silence

## 🔥 Shall Thy Wrath Burn Like Fire

Fire was a common Old Testament picture for consuming, active anger.

Unlike a passing frustration, fire spreads and destroys what it touches.

The psalmist fears this anger is not cooling down on its own.

He is asking God directly whether this will ever stop.

🔥 Fire pictures consuming, active anger
💨 Fire spreads rather than simply passing
😟 He fears the anger will not cool
📖 He asks God directly if it will stop

## ⏱️ Remember How Short My Time Is

The psalm shifts here from the king's story to human life in general.

"My time" refers to the short span of an ordinary human lifetime.

This verse voices a common, honest struggle every person eventually faces.

Even without royal promises, everyone shares this same limited amount of time.

⏱️ The focus shifts to human life generally
👤 My time means an ordinary lifetime
🌍 This struggle is common to every person
📖 Everyone shares this same limited time

## 💨 Wherefore Hast Thou Made All Men In Vain

"In vain" means empty, without lasting purpose or result.

This is a strong, honest question about the point of a short life.

Other parts of scripture, like Ecclesiastes, wrestle with the same hard question.

The Bible does not shy away from voicing this kind of doubt.

💨 In vain means empty of lasting purpose
❓ It is a strong, honest question
📚 Ecclesiastes wrestles with this same question
📖 Scripture allows this kind of honest doubt

## ⚰️ What Man Is He That Liveth, And Shall Not See Death

This is a rhetorical question with an obvious, universal answer.

No human being, however powerful, escapes death in the end.

The question strips away every royal promise back down to shared mortality.

Even David's line, however secure, cannot outrun this basic human limit.

⚰️ The answer is that no one escapes death
👑 Even kings share this same limit
🌍 The question strips promises to shared mortality
📖 David's line cannot outrun this limit

## ✋ Shall He Deliver His Soul From The Hand Of The Grave. Selah

"The hand of the grave" pictures death as something that grips and holds.

"Deliver" here means to rescue or pull free from that grip.

The expected answer is no, no one frees themselves from death alone.

"Selah" pauses the psalm right at its most hopeless sounding point.

✋ Grave's hand pictures death gripping tightly
🆓 Deliver means rescue from that grip
🚫 No one frees themselves from death alone
📖 Selah pauses at the most hopeless point

# Psalms 89:49-52
# 🙏 Remember Your Servants
---
## ❓ Lord, Where Are Thy Former Lovingkindnesses

The psalmist directly asks God where the earlier promises have gone.

"Former" points back to the covenant language from the start of the psalm.

This is not quiet doubt, it is a direct, pointed question to God.

Scripture allows this kind of blunt honesty inside real prayer.

❓ He asks directly where the promises went
🔙 Former points back to the covenant's opening
🗣️ This is a direct, pointed question
📖 Scripture allows this kind of blunt honesty

## 📜 Which Thou Swarest Unto David In Thy Truth

This verse ties the complaint directly back to the specific oath in verse 35.

"In thy truth" stresses that the oath was made in complete sincerity.

The psalmist is not inventing a new demand out of nowhere.

He is holding God to words God himself already spoke.

📜 This ties back to verse 35's oath
✅ In thy truth stresses complete sincerity
🚫 This is not a new, invented demand
📖 He holds God to his own words

## 💔 Remember, Lord, The Reproach Of Thy Servants

"Remember" here is a request for God to act, not merely recall a fact.

"Reproach" again means public shame and mockery from outside observers.

"Thy servants" widens the request beyond the king to the whole people.

The whole nation shares in this humiliation, not the king alone.

💔 Remember means a request to act
😳 Reproach means public shame and mockery
🇮🇱 Servants widens this beyond the king alone
📖 The whole nation shares this humiliation

## 🫀 How I Do Bear In My Bosom The Reproach Of All The Mighty People

"Bosom" pictures something carried close to the chest, deeply personal.

The psalmist experiences this national shame as his own private weight.

"The mighty people" likely refers to powerful surrounding nations mocking Israel.

Public disgrace has become something he privately carries every single day.

🫀 Bosom pictures something carried close and personal
👤 He feels national shame as his own
🗺️ Mighty people likely means powerful surrounding nations
📖 He carries this disgrace every day

## 😤 Wherewith Thine Enemies Have Reproached, O LORD

This verse repeats the theme of mockery one final time.

Naming God directly here turns the complaint into a personal address.

The enemies are not just mocking Israel, they are effectively mocking God's promise.

Their taunts are aimed at the credibility of God's own word.

😤 Mockery is repeated one final time
🗣️ Naming God makes this a personal address
🎯 Enemies are really mocking God's promise
📖 Their taunts target God's own credibility

## 👣 Wherewith They Have Reproached The Footsteps Of Thine Anointed

"Footsteps" pictures every single step and movement the king makes.

Nothing about the anointed king's daily life escapes this mockery.

This is total, ongoing scorn, not one isolated public insult.

The psalm's final complaint reaches into the smallest details of daily life.

👣 Footsteps means every step and movement
🔬 Nothing about his life escapes mockery
🔁 This is ongoing scorn, not one insult
📖 The complaint reaches into daily details

## 🙌 Blessed Be The LORD For Evermore

This line does not resolve anything the psalm just raised.

Many scholars note this functions as a closing formula, not an answer.

The Psalms are grouped into five books, and this one closes Book Three.

Praise is spoken here even while the hard questions remain fully open.

🙌 This does not resolve the psalm's complaint
📚 It functions as a closing formula
📗 Book Three of the Psalms ends here
📖 Praise is spoken while questions stay open

## 🔚 Amen, And Amen

"Amen" means so be it, a word affirming something as true.

Saying it twice was a traditional way of sealing something firmly.

This double amen marks the formal end of an entire section of Psalms.

Even in a psalm full of pain, the book still ends in agreement with God.

🔚 Amen means so be it, affirmed
✌️ Saying it twice seals something firmly
📚 It marks the end of a whole section
📖 The book still ends in agreement with God
`.trim();

export const PSALMS_EIGHTY_NINE_PERSONAL_SECTIONS = parsePsalmsEightyNineRawNotes(PSALMS_EIGHTY_NINE_RAW_NOTES);
