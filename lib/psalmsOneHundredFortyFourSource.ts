export type PsalmsOneHundredFortyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFortyFourRawNotes(rawText: string): PsalmsOneHundredFortyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFortyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+144:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 144 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+144:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+144:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 144 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 144,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 144:${startVerse}` : `Psalms 144:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Psalms 144 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FORTY_FOUR_RAW_NOTES = `# Psalms 144:1-2
# 🛡️ The LORD Who Trains For Battle
---
## ⚔️ Teacheth My Hands To War

"Teacheth" is an old word meaning trains or instructs.

David did not learn this skill entirely on his own.

God personally trained his hands for the work of battle.

Even a king's fighting ability belonged to God first.

⚔️ Teacheth means trains or instructs
🙌 David did not train himself alone
🛡️ God trained his hands for war
📖 Even battle skill belongs to God

## 🎯 My Fingers To Fight

"Fingers" points to something more precise than just "hands."

Many readers picture only a sword swinging in this verse.

The word likely also pictures skill with a bow or a sling.

Fighting well took more than raw strength alone.

It took real, trained precision.

🎯 Fingers suggests something more precise than hands
🏹 May picture skill with a bow or sling
💪 Fighting needed more than raw strength
📖 Precision was trained, not accidental

## 🏯 My Fortress, My High Tower, And My Shield

David piles up several titles for God in this verse.

"Fortress" means a strong, walled place of safety.

"High tower" pictures a lookout too high for enemies to reach.

"Shield" means the covering that blocks every blow aimed at him.

Each title names a different kind of protection.

🏯 Fortress means a strong walled shelter
🗼 High tower means an unreachable lookout
🛡️ Shield blocks every blow aimed at him
📖 Each title names different protection

## 👑 Who Subdueth My People Under Me

"Subdueth" means brings under control or into order.

This line is not describing a defeated enemy nation.

It describes David's own people, now united under his rule.

God is the one who gave David that authority.

No king rules by his own strength alone.

👑 Subdueth means brings under control
🇮🇱 Refers to David's own people, not enemies
🙌 God gave David that authority
📖 No king rules by strength alone

# Psalms 144:3-4
# 🌬️ What Is Man?
---
## ❓ LORD, What Is Man, That Thou Takest Knowledge Of Him

This exact question also appears earlier, in Psalm eight.

David is amazed that God even pays attention to people.

"Takest knowledge" means God notices someone and considers them closely.

Compared to God's own power, a human life looks impossibly small.

Yet God still chooses to notice it.

❓ Same question appears in Psalm eight
👀 Takest knowledge means God notices closely
🌌 Human life looks small next to God
📖 God still chooses to notice it

## 💨 Man Is Like To Vanity

"Vanity" here does not mean pride or arrogance.

It comes from a word meaning breath or vapor.

A breath disappears the moment it is spoken into cold air.

David is saying a human life is just as brief.

💨 Vanity means breath or vapor, not pride
🌬️ A breath disappears almost instantly
⏳ Human life is just as brief
📖 David compares a whole life to a breath

## 🌓 His Days Are As A Shadow That Passeth Away

A shadow changes shape and moves throughout the day.

By evening, it stretches, fades, and disappears completely.

David compares an entire human life to that quick shadow.

Life is not only short, it is always moving toward its end.

🌓 Shadows shift and fade throughout the day
⏳ David compares life to a shadow
🌅 Life is always moving toward its end
📖 A whole life passes like an afternoon shadow

# Psalms 144:5-6
# ⚡ Come Down And Shake The Mountains
---
## 🌌 Bow Thy Heavens, O LORD, And Come Down

David pictures the sky as something that can bend or tilt.

He is asking God to step out of heaven directly into his trouble.

This is not a quiet, distant prayer.

David wants God to act visibly and immediately.

🌌 Bow thy heavens pictures the sky bending down
🙏 David asks God to step in directly
🚨 This is not a quiet, distant prayer
📖 David wants visible, immediate action

## 🏔️ Touch The Mountains, And They Shall Smoke

This echoes what happened at Mount Sinai in the book of Exodus.

When God came down there, the whole mountain smoked like a furnace.

David is asking for that same dramatic, visible power now.

A mountain smoking from a touch shows strength no human battle could match.

🏔️ Echoes God's appearance at Mount Sinai
🔥 Sinai smoked like a furnace when God came
⚡ David asks for that same visible power
📖 No human battle could match this strength

## 🌩️ Cast Forth Lightning, And Scatter Them

David asks God to fight using lightning instead of a sword.

In the Bible, lightning often pictures God's own weapon against His enemies.

"Scatter" means to break up an enemy force so it cannot fight back.

David wants God to fight this battle Himself.

🌩️ Lightning pictures God's own weapon
⚡ David asks God to fight this way
💥 Scatter means break the enemy apart
📖 David wants God to fight the battle Himself

## 🏹 Shoot Out Thine Arrows, And Destroy Them

"Arrows" continues the same picture as the lightning in this verse.

Ancient writers often described lightning bolts as arrows shot from the sky.

David is not asking for a fair fight.

He is asking for complete, overwhelming victory.

🏹 Arrows continues the lightning picture
⚡ Ancient writers pictured lightning as arrows
🙅 David is not asking for a fair fight
📖 He wants complete, overwhelming victory

# Psalms 144:7-8
# 🌊 Great Waters And Foreign Hands
---
## ✋ Send Thine Hand From Above

"Hand" here pictures God's power reaching down to act.

David is not only asking for advice or comfort.

He is asking God to physically intervene in his circumstances.

The image is of a hand reaching down from heaven to rescue.

✋ Hand pictures God's power reaching down
🙏 David asks for action, not just comfort
🆘 He wants God to intervene directly
📖 A hand reaching from heaven to rescue

## 🌊 Rid Me, And Deliver Me Out Of Great Waters

"Great waters" often pictures overwhelming danger rather than a real flood.

In the Old Testament, deep water was a common symbol for chaos.

David feels like he is drowning in his troubles.

He is asking God to pull him out completely.

🌊 Great waters pictures overwhelming danger
🌀 Deep water often symbolized chaos
😰 David feels like he is drowning
📖 He asks God to pull him out

## 🌍 The Hand Of Strange Children

"Strange" here means foreign, not odd or unusual.

"Children" is an old way of referring to the people of a nation.

David is describing danger from people outside his own country.

This threat comes from beyond Israel's own borders.

🌍 Strange means foreign, not odd
👥 Children means people of a nation
⚔️ Danger comes from outside Israel
📖 A threat from beyond his own borders

## 🤥 Their Right Hand Is A Right Hand Of Falsehood

Raising the right hand was a common way to swear an oath.

These people raise that same hand while telling lies.

Their most solemn promise cannot be trusted at all.

Even their oaths are part of the deception.

✋ Raising the right hand meant swearing an oath
🤥 These people lie while swearing it
🙅 Their promises cannot be trusted
📖 Even their oaths are deception

# Psalms 144:9-10
# 🎶 A New Song For A Delivered King
---
## 🎵 I Will Sing A New Song Unto Thee

"New song" is a phrase that shows up often in the Psalms.

It usually follows a fresh experience of God's rescue or power.

David is not just repeating an old prayer out of habit.

Something new just happened, so a new song follows it.

🎵 New song is common in the Psalms
🙌 It follows a fresh rescue from God
🔁 Not just an old habit repeated
📖 New mercy gets a new song

## 🎻 Upon A Psaltery And An Instrument Of Ten Strings

A "psaltery" was a small, harp like stringed instrument.

The "instrument of ten strings" was likely a specific type of lyre.

Worship in this era was not silent or private.

It often involved real instruments played out loud.

🎻 Psaltery means a small, harp like instrument
🎶 Ten strings names a specific lyre
🙌 Worship was often played out loud
📖 Praise was meant to be heard

## 👑 It Is He That Giveth Salvation Unto Kings

Even kings, with armies and weapons, cannot save themselves.

Real victory always comes from God, not from royal power.

This line applies the truth of the whole psalm directly to kings.

No throne is powerful enough to replace God.

👑 Even kings cannot save themselves
🏆 Real victory comes from God alone
⚔️ Not from royal power or armies
📖 No throne replaces God

## ⚔️ Who Delivereth David His Servant From The Hurtful Sword

David suddenly refers to himself in the third person here.

He calls himself God's "servant" instead of naming his own title as king.

"The hurtful sword" points to a real, specific danger to his life.

Even the king needed to be personally rescued.

😮 David speaks of himself in third person
🙏 He calls himself God's servant, not king
⚔️ The hurtful sword was a real danger
📖 Even the king needed rescue

# Psalms 144:11-12
# 🏛️ Sons Like Plants, Daughters Like Cornerstones
---
## 🔁 Rid Me, And Deliver Me From The Hand Of Strange Children

This verse repeats verses seven and eight almost word for word.

Hebrew poetry often repeats a plea to show how much it matters.

David is not forgetful or careless here.

He is underlining the seriousness of this request.

🔁 Repeats verses seven and eight almost exactly
📜 Hebrew poetry repeats ideas on purpose
🙏 David is not being careless
📖 Repetition shows how much this matters

## 🌱 That Our Sons May Be As Plants Grown Up In Their Youth

David shifts from his own danger to his hopes for the nation.

A healthy young plant is strong, growing, and full of life.

He wants the next generation to grow up the same way.

This is a prayer for the future, not just for himself.

🌱 A young plant pictures strength and growth
👦 David hopes this for the next generation
🔀 He shifts from himself to the nation
📖 A prayer for the future, not just himself

## 🏛️ That Our Daughters May Be As Corner Stones, Polished After The Similitude Of A Palace

A "corner stone" was a large, carefully cut stone at a building's edge.

It held the whole structure together and had to be shaped with care.

"Polished... like a palace" pictures something both strong and beautiful.

David compares his daughters to something valuable and carefully made.

🪨 Corner stone means a carefully cut stone
✨ Polished like a palace pictures beauty
🏛️ It held the whole structure together
📖 Daughters pictured as valuable and strong

# Psalms 144:13-15
# 🌾 A Nation At Peace
---
## 🌾 That Our Garners May Be Full, Affording All Manner Of Store

"Garners" are storehouses used for keeping harvested grain.

Full garners meant a nation would not go hungry that year.

David is praying for practical, everyday blessing here.

Peace with God includes ordinary things like a full harvest.

🏚️ Garners means storehouses for grain
🌾 Full garners meant no hunger that year
🙏 A prayer for ordinary, everyday blessing
📖 Peace with God includes daily needs

## 🐑 That Our Sheep May Bring Forth Thousands And Ten Thousands

This is a request for the flocks to multiply again and again.

In this culture, sheep represented real, measurable wealth.

The exact numbers matter less than the idea of overflow.

David is asking for abundance, not just enough.

🐑 Sheep bringing forth thousands means rapid growth
💰 Sheep represented real wealth in this culture
📈 The point is overflow, not exact numbers
📖 David asks for abundance, not just enough

## 🐂 That Our Oxen May Be Strong To Labour

Oxen pulled plows and carried heavy loads in daily farm work.

A weak or sick ox could not do that work.

Strong oxen meant fields got planted and harvests actually happened.

This is another practical, unglamorous request for a working nation.

🐂 Oxen pulled plows and heavy loads
💪 Strong oxen meant fields got planted
🌾 Weak oxen could not do the work
📖 A practical request for a working nation

## 🧱 That There Be No Breaking In, Nor Going Out

This phrase likely describes a city's walls and gates.

"Breaking in" pictures an enemy successfully forcing their way inside.

"Going out" pictures people being driven out into exile.

David is praying that neither disaster would happen to his people.

🧱 Likely describes a city's walls and gates
⚔️ Breaking in means a successful attack
🚶 Going out means being driven into exile
📖 David prays against both disasters

## 😢 That There Be No Complaining In Our Streets

"Complaining" here points to the sound of public distress or crying.

Streets full of complaint usually mean streets full of suffering.

A quiet street with nothing to complain about pictures real peace.

David wants his people to have nothing left to cry about.

😢 Complaining pictures the sound of public distress
🏘️ Loud streets often mean suffering streets
🤫 A quiet street pictures real peace
📖 Nothing left to cry about

## 📖 Happy Is That People, Whose God Is The LORD

The first half of this verse already listed sons, harvests, and safety.

Those blessings alone might seem like enough for happiness.

But the psalm's very last words shift the reason completely.

True happiness is not the blessings themselves.

It is belonging to this God.

🌾 The verse already listed sons, crops, and safety
🤔 Those blessings alone might seem like enough
🔀 The last line shifts the reason completely
📖 True happiness is belonging to God
`.trim();

export const PSALMS_ONE_HUNDRED_FORTY_FOUR_PERSONAL_SECTIONS = parsePsalmsOneHundredFortyFourRawNotes(
  PSALMS_ONE_HUNDRED_FORTY_FOUR_RAW_NOTES,
);
