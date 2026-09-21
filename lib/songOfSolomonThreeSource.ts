export type SongOfSolomonThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSongOfSolomonThreeRawNotes(rawText: string): SongOfSolomonThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SongOfSolomonThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SongOfSolomon\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Song of Solomon 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SongOfSolomon\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+SongOfSolomon\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Song of Solomon 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Song of Solomon 3:${startVerse}` : `Song of Solomon 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Song of Solomon 3 sections, received " + sections.length);
  }

  return sections;
}

const SONG_OF_SOLOMON_THREE_RAW_NOTES = `# SongOfSolomon 3:1-2
# 😢 Seeking Him By Night
---
## 🌙 By Night On My Bed I Sought Him

By night means after the city had gone to sleep.

Many scholars believe this whole scene is a dream.

The empty streets and the sudden watchmen read like a dream in this kind of ancient poetry.

Longing for him fills even her sleep.

🌙 By night means after dark
💭 Many scholars read this as a dream
🚶 The scene feels like a dream
📖 Longing fills even her sleep

## 🔁 I Sought Him, But I Found Him Not

This exact phrase appears twice in these two verses alone.

Repeating it doubles the sense of her disappointment.

Seeking without finding drives the whole opening scene.

The repetition itself teaches the ache better than one line could.

🔁 The phrase repeats twice in two verses
😞 Repetition doubles the disappointment
🔍 Seeking without finding drives the scene
📖 The ache is taught through repetition

## 🌃 I Will Rise Now, And Go About The City

Rising to search alone at night was not an ordinary choice.

City streets after dark were not considered safe for anyone.

A woman walking them alone was especially unusual.

Her decision shows how badly she wants to find him.

🌃 Night streets were not considered safe
🚺 A woman walking alone was unusual
💪 Her decision shows real desperation
📖 Love here breaks the normal rules

## 🏛️ In The Streets, And In The Broad Ways

Streets here means the narrow lanes running between houses.

Broad ways means the wider open squares near a gate or market.

Ancient cities were built with both kinds of paths.

She searches every part of the city, leaving nothing unchecked.

🛣️ Streets means narrow lanes
🏛️ Broad ways means open public squares
🏙️ Ancient cities had both kinds of paths
📖 She searches every part of the city

# SongOfSolomon 3:3-4
# 🕵️ Found By The Watchmen
---
## 🛡️ The Watchmen That Go About The City Found Me

Watchmen patrolled the city walls and streets through the night.

Their job was guarding against thieves, fire, and danger while the city slept.

Meeting them in the dark confirms how late this search has gone.

Their sudden appearance adds real tension to the scene.

🛡️ Watchmen guarded the city at night
🔥 They watched for thieves and danger
🌌 Meeting them confirms the late hour
📖 Their appearance adds tension to the search

## ❓ Saw Ye Him Whom My Soul Loveth

She does not know these men, yet asks them her most personal question.

Whom my soul loveth is repeated a third time in this chapter.

Asking strangers shows how far her search has carried her.

Desperation has made her willing to risk an awkward question.

❓ She asks strangers a personal question
🔁 The phrase repeats a third time
🚶 Her search has carried her far
📖 Desperation risks an awkward question

## 🤲 I Held Him, And Would Not Let Him Go

Finding him ends the search but not her fear of losing him again.

Holding on tightly pictures refusing to risk another separation.

The word held suggests a strong, deliberate grip.

Relief turns immediately into determination.

🤲 Holding pictures a strong grip
😨 She fears losing him again
✋ Relief turns into determination
📖 She refuses another separation

## 🏠 Into My Mother's House, And Into The Chamber Of Her That Conceived Me

Bringing a man to her mother's house connects to marriage customs in this culture.

A mother's home is named here, not a father's.

The same detail appears again later in the book.

Chamber of her that conceived me restates the same idea for emphasis.

🏠 Mother's house connects to marriage customs
👩 Her mother's home is named, not her father's
🔁 The same detail returns later in the book
📖 Hebrew poetry restates ideas for emphasis

# SongOfSolomon 3:5
# 🦌 The Charge Repeated
---
## 👭 I Charge You, O Ye Daughters Of Jerusalem

This exact charge already appeared once, back in chapter two.

The daughters of Jerusalem are a group of young women who listen in on the poem.

Repeating the same warning marks it as one of the book's central ideas.

The poem returns to this line at key turning points.

🔁 This charge already appeared in chapter 2
👭 Daughters of Jerusalem are a listening chorus
⭐ Repetition marks it as a central idea
📖 The poem returns to it at key moments

## 🦌 By The Roes, And By The Hinds Of The Field

Roes and hinds name swift wild deer, one male and one female.

Normal oaths in this culture swore by God's own name.

These animal names sound close to two Hebrew names for God.

The book of Song of Solomon never names God outright, even once.

🦌 Roes and hinds are wild deer
🗣️ Normal oaths swore by God's name
🔤 These words echo names for God
📖 The book never names God directly

## ⏰ Stir Not Up, Nor Awake My Love, Till He Please

This is the same warning repeated from chapter two, almost word for word.

Love is again pictured as something asleep that can wake too soon.

This warning comes right after a whole scene about painful searching.

Even desperate longing does not excuse forcing love before it is ready.

😴 Love is pictured as asleep again
⏰ It should not be woken too soon
🔍 It follows a scene about painful searching
📖 Longing does not excuse forcing love

# SongOfSolomon 3:6-8
# 💨 The Procession Approaches
---
## ❓ Who Is This That Cometh Out Of The Wilderness

The voice asking this question is not named in the text.

Many readers take it as the daughters of Jerusalem or a watching crowd.

The question shifts the scene from private longing to public spectacle.

A royal procession is now approaching in full view of the city.

❓ The speaker asking is not named
👭 Likely the daughters of Jerusalem
🔀 The scene shifts to a public event
📖 A royal procession is now approaching

## 💨 Like Pillars Of Smoke, Perfumed With Myrrh And Frankincense

Myrrh and frankincense are aromatic resins harvested from certain trees.

Both were extremely valuable and traded across long desert routes.

Burning them sent rising smoke that could be seen from far away.

The procession announces itself with wealth before anyone even sees a face.

🌳 Myrrh and frankincense come from tree resin
💰 Both were highly valuable trade goods
💨 Burning them created rising smoke
📖 Wealth announces the procession first

## 🌿 With All Powders Of The Merchant

Powders here means ground spices sold by traveling merchants.

These merchants carried goods along international trade routes.

Owning imported spices like this marked real wealth and status.

The procession is covered in scent that most people could never afford.

🌿 Powders means ground trade spices
🐫 Merchants carried goods on trade routes
💎 Imported spices marked real wealth
📖 The procession wears scent few could afford

## 🛏️ Behold His Bed, Which Is Solomon's

Bed here does not mean a piece of bedroom furniture.

The Hebrew word likely names a portable couch or covered carrying litter.

Kings were often carried through crowds on platforms exactly like this one.

Behold directs the crowd's eyes toward Solomon arriving in style.

🛏️ Bed likely means a portable couch
👑 Kings were carried on platforms like it
👀 Behold directs the crowd's attention
📖 Solomon arrives in full royal style

## ⚔️ Threescore Valiant Men Are About It, Of The Valiant Of Israel

Threescore is an old way of saying sixty.

Valiant men means trained, proven warriors, not ordinary guards.

Sixty of Israel's best surrounding one couch shows the scale of protection.

The escort itself becomes part of the display of Solomon's greatness.

🔢 Threescore means sixty
⚔️ Valiant men means proven warriors
🛡️ Sixty guards show royal protection
📖 The escort displays Solomon's greatness

## 🗡️ They All Hold Swords, Because Of Fear In The Night

Fear in the night names a real danger, not just poetic language.

Traveling after dark left any group exposed to bandits or ambush.

Every guard carrying a sword on his own thigh shows constant readiness.

The procession's beauty does not erase the real risk surrounding it.

🌌 Fear in the night was a real danger
🗡️ Night travel risked bandits or ambush
⚔️ Every guard stayed constantly ready
📖 Beauty did not erase the real risk

# SongOfSolomon 3:9-10
# 🛖 Solomon's Chariot
---
## 🛖 King Solomon Made Himself A Chariot

Chariot here most likely continues describing the same carrying couch from verse seven.

This is not a two wheeled war chariot pulled by horses.

It functioned more like a covered throne moving through the crowd.

The word choice fits a king on display, not a king heading to battle.

🛖 Chariot likely means the same carried couch
🚫 Not a two wheeled war chariot
👑 It functioned as a carried throne
📖 The scene shows display, not battle

## 🌲 Of The Wood Of Lebanon

Lebanon was famous across the ancient world for its cedar trees.

Cedar of Lebanon was prized for its strength, size, and pleasant scent.

The same wood was used to build Solomon's temple in Jerusalem.

Choosing it here links this procession to his greatest building project.

🌲 Lebanon was famous for cedar trees
💪 Cedar was prized for strength and scent
🏛️ The same wood built Solomon's temple
📖 The procession echoes his greatest project

## 🥇 The Pillars Thereof Of Silver, The Bottom Thereof Of Gold

This verse lists the couch's materials piece by piece.

Silver pillars held up the frame, and a gold base sat underneath.

A purple covering finished the top.

Purple dye came from crushed sea snails and cost more than gold by weight.

🥈 Silver formed the pillars
🥇 Gold formed the base
🟣 Purple dye cost more than gold
📖 Every material was extremely costly

## 💜 The Midst Thereof Being Paved With Love, For The Daughters Of Jerusalem

Paved with love is one of the harder phrases in this whole song.

The Hebrew here is genuinely difficult, and scholars read it several ways.

Some think the daughters of Jerusalem decorated the interior themselves, out of love.

The text does not tell us for certain which reading is correct.

🤔 This phrase is genuinely difficult to read
📚 Scholars read it several different ways
👭 Daughters of Jerusalem may have decorated it
📖 The text does not settle which is correct

# SongOfSolomon 3:11
# 👑 The Wedding Day
---
## 📢 Go Forth, O Ye Daughters Of Zion, And Behold King Solomon

Daughters of Zion names the same young women called daughters of Jerusalem earlier.

Zion was another name for Jerusalem, especially its temple hill.

Go forth is a public invitation, calling everyone to come out and look.

This is not a private moment, it is meant to be witnessed by the whole city.

🏙️ Zion is another name for Jerusalem
👭 Same group named daughters of Jerusalem before
📢 Go forth is a public invitation
📖 This moment is meant to be witnessed

## 👑 With The Crown Wherewith His Mother Crowned Him

A reader might expect a father to place the crown on a new king.

In ancient Israel, the queen mother held a genuinely honored, official role.

Bathsheba, Solomon's own mother, appears elsewhere honored at his throne.

Naming his mother here fits that same pattern of honor.

👑 Readers might expect a father to crown him
👸 The queen mother held an honored role
🤴 Bathsheba is honored at Solomon's throne
📖 This crowning fits that same pattern

## 💍 In The Day Of His Espousals, And In The Day Of The Gladness Of His Heart

Espousals is an old word for a wedding day.

Gladness of his heart names the joy of that same day, restated for emphasis.

The whole procession in this chapter builds toward this one moment.

The chapter that began with anxious searching ends in public celebration.

💍 Espousals is an old word for wedding
😊 Gladness of his heart repeats the joy
🎉 The chapter builds toward this moment
📖 Anxious searching ends in celebration
`.trim();

export const SONG_OF_SOLOMON_THREE_PERSONAL_SECTIONS = parseSongOfSolomonThreeRawNotes(SONG_OF_SOLOMON_THREE_RAW_NOTES);
