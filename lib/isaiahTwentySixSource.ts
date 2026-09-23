export type IsaiahTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwentySixRawNotes(rawText: string): IsaiahTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 26:${startVerse}` : `Isaiah 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 26 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWENTY_SIX_RAW_NOTES = `# Isaiah 26:1-6
# 🏙️ A Song For The Strong City
---
## 📅 In That Day Shall This Song Be Sung

"In that day" points to a future day still ahead of Isaiah.

Chapter twenty five already used this same phrase to describe judgment turning into celebration.

Now that celebration takes shape as an actual song, sung by name.

Judah is the specific nation who will sing it.

📅 In that day points to a future moment

📜 Chapter twenty five used this phrase too

🎵 The celebration becomes an actual song

📖 Judah is the nation who sings it

## 🛡️ We Have A Strong City

This city is not strong because of thick walls or tall towers.

"Bulwarks" means the outer defensive structures built to protect a city, like reinforced ramparts.

Isaiah says salvation itself will serve as those walls and bulwarks.

God's protection replaces the need for literal fortifications.

Every proud, fortified city in chapters twenty four and twenty five fell anyway.

This city survives because its defense is God, not stone.

🛡️ Bulwarks means outer defensive walls

💪 Salvation itself replaces stone walls

🏚️ Earlier proud cities fell despite fortresses

📖 This city stands on God, not stone

## 🚪 The Righteous Nation Which Keepeth The Truth

Open ye the gates pictures the city gates swinging wide open.

Gates in the ancient world controlled exactly who could enter a walled city safely.

"Keepeth the truth" means staying loyal and faithful, not just avoiding lies.

Only the righteous nation gets to enter through these gates.

This is the opposite of the doomed cities in the previous two chapters.

🚪 Gates controlled who entered safely

🔓 These gates swing wide open

🤝 Keepeth the truth means staying loyal

📖 The righteous nation alone enters here

## 😌 Thou Wilt Keep Him In Perfect Peace

The Hebrew behind perfect peace repeats the word peace twice in a row.

Repeating a word like that was a normal way to say completely or fully.

This is not the absence of trouble.

It is a settled peace in the middle of trouble.

"Stayed" means fixed firmly in place, like a heavy object braced so it cannot shift.

A mind stayed on God does not get knocked around by circumstances.

😌 Peace repeats twice for emphasis

🕊️ This peace holds inside real trouble

⚓ Stayed means fixed firmly in place

📖 A steady mind does not shift

## 🪨 Trust Ye In The LORD JEHOVAH

Trust here is not a one time decision.

It is an ongoing habit for ever.

"JEHOVAH" was one way the King James Bible spelled the Hebrew name for God, YHWH.

Many translations render everlasting strength as Rock eternal.

A rock beneath your feet does not shift when everything else does.

🪨 Trust here means an ongoing habit

📜 JEHOVAH spells the Hebrew name YHWH

⛰️ Many translations say Rock eternal

📖 A rock does not shift under pressure

## ⬇️ The Lofty City, He Layeth It Low

Isaiah already tore down an unnamed proud city back in chapters twenty four and twenty five.

Here he repeats he layeth it low twice in the same verse.

That repetition pushes the picture down further each time.

The city ends at the ground, then all the way to the dust.

Pride in this book never ends up standing.

⬇️ Isaiah already tore down proud cities

🔁 He layeth it low repeats twice

🕳️ Each repeat pushes the picture lower

📖 Pride in Isaiah never stays standing

## 🦶 The Foot Shall Tread It Down

The very people this proud city once looked down on now walk across its ruins.

The poor and the needy had no power to bring down a fortified city on their own.

Their feet only get to tread on it after God already brought it low.

God undoes pride, and the powerless end up standing on top of it.

🦶 The powerless now walk over its ruins

🙅 They could never topple it themselves

⬇️ God brought it low before they arrived

📖 The powerless end up on top

# Isaiah 26:7-11
# ⚖️ The Way Of The Just
---
## ⚖️ The Way Of The Just Is Uprightness

"Uprightness" means living straight and honest, without hidden crookedness.

Isaiah is not describing a rulebook here.

He is describing a direction.

The just do not have to earn favor by being flashy or impressive.

Their path is simply straight, like an upright post that stands without leaning.

⚖️ Uprightness means straight and honest living

🧭 Isaiah describes a direction, not a rulebook

🙅 The just do not need to impress anyone

📖 Their path stays straight like an upright post

## 🎚️ Thou Dost Weigh The Path Of The Just

Ancient trade used balance scales to weigh out grain, silver, or spices.

"Weigh the path" pictures God examining a life that same careful way.

Nothing about a right way of living slips past that kind of weighing.

God is not guessing at what is fair.

He is measuring it exactly.

⚖️ Ancient scales weighed grain and silver

🔍 God examines a life the same way

🚫 Nothing slips past that kind of weighing

📖 God measures fairness, He does not guess

## ⏳ In The Way Of Thy Judgments Have We Waited

"Judgments" here means God's decisions and His acts of justice.

Chapter twenty five already used this same waiting.

It quoted the people saying, we have waited for him.

Waiting for judgments is different from dreading them.

The desire of our soul is to thy name means the people wanted God Himself.

They wanted more than relief from their trouble.

⏳ Judgments means God's acts of justice

🔁 Chapter twenty five used this same waiting

😊 Waiting differs from dreading a judgment

📖 The people wanted God, not just relief

## 🌙 With My Soul Have I Desired Thee In The Night

Night was the time old prayers described as hardest to bear.

Desire here is not casual interest.

It is deep longing.

"My spirit within me will I seek thee early" repeats that same longing at dawn.

Morning and night both get spent wanting God.

🌙 Night was often the hardest time to pray

❤️ Desire here means deep longing, not interest

🌅 The same longing repeats again at dawn

📖 Morning and night both belong to wanting God

## 🌍 The Inhabitants Of The World Will Learn Righteousness

This line explains why God's judgments reach the whole earth, not just Israel.

Judgment here works like a hard but effective teacher.

People who never listened to warnings sometimes finally understand once consequences arrive.

Isaiah is not describing revenge.

He is describing a lesson the whole world needed.

🌍 God's judgments reach the whole earth

🎓 Judgment works like a hard teacher

👂 Consequences teach what warnings could not

📖 This is a lesson, not simple revenge

## 🙈 Let Favour Be Shewed To The Wicked

"Shewed" is the old spelling of showed.

"Favour" here means mercy or kindness, given without anything earned in return.

Even that kind of mercy does not change a wicked heart on its own.

The same person can go on dealing unjustly in a land built on uprightness.

They will not behold the majesty of the LORD.

That stays true no matter how good things around them look.

🙈 Shewed is the old spelling of showed

🎁 Favour means mercy given, not earned

💔 Mercy alone does not change a hard heart

➡️ Good surroundings cannot force someone to see God

## ✋ When Thy Hand Is Lifted Up, They Will Not See

A lifted hand pictures a clear, visible warning or display of power.

Some people can watch God act and still refuse to notice.

Verse eleven says they shall see eventually, just later than it should have taken.

By then the only thing left to feel is shame.

✋ A lifted hand pictures a clear warning

🙈 Some people refuse to notice it

⏰ They eventually see, but too late

📖 By then shame is all that is left

## 🔥 The Fire Of Thine Enemies Shall Devour Them

"Thine enemies" here means the enemies who oppose God Himself, not just Israel's enemies.

Fire in the Bible often pictures a judgment that cannot be argued with or escaped.

This closes the section on a warning, not a threat made lightly.

God's patience has a real end point.

🔥 Thine enemies means enemies of God

⚠️ Fire pictures judgment with no escape

🛑 This warning is not made lightly

📖 God's patience has a real end point

# Isaiah 26:12-15
# 🕊️ Peace, Other Lords, And The Dead
---
## 🕊️ Thou Wilt Ordain Peace For Us

"Ordain" means to set something in place on purpose, not leave it to chance.

This peace is not an accident of good timing.

God planned to establish it Himself.

The tone shifts here from warning the wicked to comforting God's own people.

🕊️ Ordain means set in place on purpose

🎯 This peace was planned, not accidental

🤲 God Himself establishes it

📖 The tone shifts from warning to comfort

## 🙌 Thou Also Hast Wrought All Our Works In Us

"Wrought" is an old word for worked or accomplished.

The people could easily take credit for their own obedience or effort.

Instead they say plainly that God produced even their good works in them.

Nothing here gets left to human achievement alone.

🙌 Wrought means worked or accomplished

🏆 They could have claimed credit themselves

🙏 Instead they credit God for their works

📖 Nothing here is claimed as human achievement

## 👑 Other Lords Beside Thee Have Had Dominion Over Us

"Other lords" points to the foreign powers and false gods that ruled over Israel across its history.

Assyria and Babylon both controlled Israel at different points.

Each of those nations worshiped its own gods.

"Dominion" means real ruling power, not just influence.

This verse admits plainly that Israel had served masters other than the true God.

👑 Other lords means foreign powers and false gods

🏛️ Assyria and Babylon both ruled Israel

⚔️ Dominion means real ruling power

📖 Israel admits serving masters besides God

## 🗣️ By Thee Only Will We Make Mention Of Thy Name

"Make mention of thy name" means to speak of God publicly, in prayer and in worship.

After admitting they served other lords, the people now commit to naming only one.

This is a renewed vow of exclusive loyalty.

Confession comes before recommitment in this verse.

🗣️ Make mention means speaking God's name publicly

🔁 This follows right after admitting past failure

🤝 It is a vow of exclusive loyalty

📖 Confession comes before recommitment

## 💀 They Are Dead, They Shall Not Live

This verse answers back to the other lords named in verse thirteen.

Those false gods and foreign powers are described as dead and gone for good.

"Made all their memory to perish" means even the record of them fades away completely.

Their names do not get remembered the way Israel's story keeps getting told.

Total defeat here includes being forgotten, not only being defeated.

💀 This answers the other lords in verse thirteen

⚰️ Those false powers are gone for good

🌫️ Their memory perishes along with them

📖 Total defeat includes being forgotten

## 🌱 Thou Hast Increased The Nation

Isaiah repeats thou hast increased the nation twice in a row.

That kind of repetition was a normal way in Hebrew poetry to add weight to a statement.

"Thou art glorified" means God receives the honor for that growth, not the nation itself.

"Removed it far unto all the ends of the earth" pictures Israel's reach stretching outward.

Growth here is credited to God from the very first word.

🌱 Increased the nation repeats twice

📜 Hebrew poetry repeats to add weight

👑 Glorified means God gets the honor

📖 Growth here is credited to God

# Isaiah 26:16-21
# 🤰 Travail And The LORD's Coming
---
## 🙏 In Trouble Have They Visited Thee

"Chastening" means the painful discipline God allowed His people to go through.

People in this verse do not run from God during hard times.

They run toward Him instead.

"Poured out a prayer" pictures prayer overflowing, like water tipped fully out of a vessel.

Trouble became the reason they turned to God, not the reason they left Him.

🙏 Chastening means painful, corrective discipline

🏃 They ran toward God in trouble

💧 A poured out prayer pictures overflow

📖 Trouble drew them closer, not away

## 🤰 Crieth Out In Her Pangs

"Draweth near the time of her delivery" describes labor getting close.

"Pangs" means the sharp pains of childbirth.

Isaiah borrows one of the most physical, unavoidable pains a person can imagine.

The nation's suffering gets compared to something every ancient reader instantly understood.

"So have we been in thy sight, O LORD" admits this happened with God watching.

🤰 Draweth near pictures labor getting close

😖 Pangs means the sharp pain of childbirth

🪞 The nation's suffering gets compared to labor

📖 God was watching the whole time

## 💨 We Have As It Were Brought Forth Wind

All that labor and pain in verse seventeen should end with a baby.

Instead it ends with nothing.

Wind cannot be held or kept.

"We have not wrought any deliverance in the earth" makes the failure plain.

Only God could actually deliver them, not their own struggle.

💨 Labor should end with a baby, not wind

🙅 Wind cannot be held or kept

📢 The failure gets stated in plain words

📖 Only God could deliver them, not effort

## ☠️ Thy Dead Men Shall Live

This directly answers verse fourteen, where the other lords stayed dead for good.

God's people get the opposite promise here, real life after death.

"Together with my dead body shall they arise" pictures a full, physical rising, not just a memory living on.

New Testament writers later point back to promises like this one when they teach about resurrection.

The contrast with verse fourteen could not be sharper.

☠️ This answers the dead lords in verse fourteen

🌱 God's people get the opposite promise

🧍 Arise pictures a real, physical rising

📖 The contrast with verse fourteen is sharp

## 🌿 Thy Dew Is As The Dew Of Herbs

Dew was one of the few reliable sources of moisture in Israel's dry climate.

It appeared quietly overnight and refreshed plants that looked completely dried out by morning.

Isaiah compares God's life giving power to that same quiet refreshment.

"The earth shall cast out the dead" pictures the ground itself finally releasing what it once swallowed.

Death does not get the last word in this verse.

🌿 Dew was Israel's quiet overnight moisture

🌅 It refreshed plants that looked dried out

🌍 The earth releases what it once swallowed

📖 Death does not get the last word

## 🚪 Enter Thou Into Thy Chambers, And Shut Thy Doors

God tells His people to step inside and close the door before judgment falls.

"Chambers" means private inner rooms, not just any room in the house.

This is protection, not punishment, much like families sheltering safely during a storm.

"A little moment" makes clear this hiding will not last forever.

"Indignation" means God's righteous anger, now aimed at the nations, not at His own people.

🚪 Step inside and shut the door pictures shelter

🏠 Chambers means a private inner room

🛡️ This is protection, not punishment

📖 The hiding is brief, not forever

## ⚡ The LORD Cometh Out Of His Place To Punish

God is pictured leaving His dwelling place to act directly in the world.

This is not a distant ruler issuing a decree from far away.

"To punish the inhabitants of the earth for their iniquity" names exactly why He comes.

Real wrongdoing is the reason, not random anger.

The whole chapter has been building toward this moment.

⚡ God leaves His place to act directly

🚫 This is not a distant, hands off ruler

⚖️ Real wrongdoing is named as the reason

📖 The whole chapter builds to this moment

## 🩸 The Earth Also Shall Disclose Her Blood

"Disclose" means to uncover or reveal something once hidden.

Innocent blood spilled in secret gets treated here as something the ground remembers.

This echoes all the way back to Cain and Abel.

There, Abel's blood cried out from the ground itself.

"Shall no more cover her slain" means hidden injustice will not stay hidden forever.

The chapter that opened with a song about a strong city closes with a promise about justice.

🩸 Disclose means to uncover what was hidden

📢 Blood spilled in secret is remembered

👴 This echoes Cain and Abel's story

📖 Even hidden injustice will not stay hidden
`.trim();

export const ISAIAH_TWENTY_SIX_PERSONAL_SECTIONS = parseIsaiahTwentySixRawNotes(ISAIAH_TWENTY_SIX_RAW_NOTES);
