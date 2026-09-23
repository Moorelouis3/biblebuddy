export type IsaiahThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirtyOneRawNotes(rawText: string): IsaiahThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 31:${startVerse}` : `Isaiah 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 31 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTY_ONE_RAW_NOTES = `# Isaiah 31:1-3
# 🐎 Trusting Egypt Over The Holy One
---
## ⚠️ Woe To Them That Go Down To Egypt For Help

"Woe" is a prophetic warning cry, not just a sad sigh.

Isaiah already used this same word to open the previous chapter.

This time the warning lands even sharper, aimed straight at Judah's leaders.

"Go down" fits Egypt's lower elevation on the map.

It also pictures a step backward toward danger, not forward toward safety.

⚠️ Woe warns of coming disaster
🔁 Isaiah repeats this same warning cry
🌍 Go down fits Egypt's lower ground
➡️ The direction pictures a spiritual step back

## 🐴 Stay On Horses, And Trust In Chariots, Because They Are Many

Judah looked at Egypt's raw numbers and felt safe.

Chariots were the ancient world's version of heavy armor and speed combined.

Egypt was famous for large, well built chariot forces.

None of that hardware came from a covenant with God.

Confidence built on equipment alone always has a ceiling.

🐴 Judah counted on Egypt's raw numbers
⚔️ Chariots meant ancient heavy armor and speed
🏛️ Egypt was known for large chariot forces
➡️ Equipment without God has a ceiling

## 🙈 They Look Not Unto The Holy One Of Israel, Neither Seek The LORD

The real failure here is not the alliance itself.

It is what Judah skipped before making it.

"The Holy One of Israel" is one of Isaiah's favorite names for God.

Nobody stopped to ask him first.

A decision can look wise and still leave God out entirely.

🙈 The real failure is what they skipped
👑 Holy One of Israel is God's title
❓ Nobody asked him about this plan
📖 A plan can look wise without God

## 😏 Yet He Also Is Wise, And Will Bring Evil

Judah trusted Egypt's counselors for wisdom.

Isaiah answers with a sharp irony here.

God is wise too, and his wisdom brings the opposite outcome they wanted.

The very trait they sought in Egypt already belongs to the one they ignored.

🧠 Judah trusted Egypt's wise counselors
😏 Isaiah answers with sharp irony
✅ God is wise, not only Egypt
📖 The wisdom they sought was already his

## 🔒 Will Not Call Back His Words

A word spoken once here cannot be canceled later.

That is different from a threat made in anger and forgotten.

God's warnings function like a promise, fixed and certain.

Nothing Judah does now will talk God out of this.

🗣️ God's word cannot be taken back
🚫 This is not an angry threat
🔒 His warnings are fixed and certain
📖 Nothing can talk God out of it

## 🎯 Against The House Of The Evildoers, And Against The Help Of Them That Work Iniquity

This judgment has two separate targets, not just one.

"The house of the evildoers" points to Judah's own leaders.

"The help of them that work iniquity" points to Egypt, the ally they hired.

Both the sinner and the source they leaned on face the same verdict.

🎯 Two separate targets face this judgment
🏠 House of evildoers means Judah's leaders
🇪🇬 Help of them means Egypt itself
➡️ The ally falls right alongside Judah

## 👤 Now The Egyptians Are Men, And Not God

This line states the obvious, but Judah had stopped acting like it was obvious.

Egypt had real soldiers, real chariots, and real generals.

None of that made Egypt divine or unstoppable.

Human strength always has a limit that God does not have.

👤 Egypt is human, not divine
⚔️ Real soldiers still have real limits
🚫 None of it makes Egypt unstoppable
📖 Only God has no limit at all

## 🍖 Their Horses Flesh, And Not Spirit

"Flesh" here means physical and breakable, the opposite of lasting power.

"Spirit" points to God's own unlimited, living strength.

A horse gets tired, gets hurt, and eventually dies.

Trusting flesh over spirit means trusting something built to fail.

🍖 Flesh means physical and breakable
🌬️ Spirit means God's own lasting strength
🐴 Horses tire, get hurt, and die
📖 Flesh was never built to last forever

## 🤝 He That Helpeth Shall Fall, And He That Is Holpen Shall Fall Down

"Holpen" is an old word meaning helped.

This verse names both sides of the alliance directly.

Egypt is the helper, and Judah is the one being helped.

When one side is not standing on God, both go down together.

🤝 Holpen is an old word for helped
🇪🇬 Egypt plays the helper in this verse
🇮🇱 Judah plays the one being helped
📖 Without God, both sides fall together

# Isaiah 31:4-5
# 🦁 The LORD Like A Lion And Like Birds
---
## 🦁 Like As The Lion And The Young Lion Roaring On His Prey

Isaiah switches from warning to a picture of raw courage.

A lion standing over its kill does not scare easily.

Shepherds could shout and wave sticks, but the lion holds its ground.

God pictures himself with that same fearless posture here.

🦁 A lion guards its kill fearlessly
📣 Shepherds shout, but the lion stays
💪 God pictures himself with that same courage
📖 Nothing forces God off his ground

## 👥 When A Multitude Of Shepherds Is Called Forth Against Him

A whole crowd of shepherds gathering together sounds like real force.

Against one lion protecting its prey, that crowd still fails.

This pictures the many nations who oppose Zion in Isaiah's day.

Numbers alone were never the deciding factor here.

👥 A crowd of shepherds still gathers
🦁 One lion still holds its ground
🌍 This pictures nations opposing Zion
➡️ Numbers were never the real factor

## 👑 So Shall The LORD Of Hosts Come Down To Fight For Mount Zion

"The LORD of hosts" names God as commander over heaven's armies.

"Mount Zion" is the hill where Jerusalem's temple stood.

God himself steps into the fight, not a borrowed ally.

The very help Judah tried to buy from Egypt was already available for free.

👑 LORD of hosts means commander of heaven
⛰️ Mount Zion is Jerusalem's temple hill
🛡️ God fights this battle himself
📖 The help Judah paid for was free

## 🕊️ As Birds Flying, So Will The LORD Of Hosts Defend Jerusalem

The lion picture in verse four shows raw power.

This picture shows something gentler right after it.

Birds hovering protectively over a nest picture careful, watchful care.

God's strength and God's tenderness both defend the same city.

🦁 The lion picture shows raw power
🕊️ This picture shows gentle protection
🪺 Birds hover watchfully over a nest
📖 Power and tenderness defend one city

## 🩸 Passing Over He Will Preserve It

"Passing over" recalls the exact word from Israel's exodus out of Egypt.

Back then, death passed over homes marked by the blood of a lamb.

Here judgment passes over Jerusalem in the same protective way.

The city that once left Egypt now watches Egypt's promised help fail.

🩸 Passing over recalls the exodus story
🏠 Death once passed over marked homes
🏙️ Judgment now passes over Jerusalem
📖 Egypt's old story protects Zion again

# Isaiah 31:6-7
# 🔄 Turn Back And Cast Away Idols
---
## 🔄 Turn Ye Unto Him From Whom The Children Of Israel Have Deeply Revolted

After two chapters of warning, Isaiah finally says what to actually do.

"Revolted" means open, active rebellion, not a quiet drifting away.

"Deeply" makes clear this was not a small, casual mistake.

Turning back is still possible even after rebellion this serious.

🔄 Isaiah finally names the needed action
⚔️ Revolted means active, open rebellion
📉 Deeply shows this was serious rebellion
📖 Turning back is still possible now

## 🗑️ Cast Away His Idols Of Silver, And His Idols Of Gold

Real repentance in this verse gets a real, physical action attached to it.

Silver and gold made these idols expensive, not just religiously wrong.

Throwing them away meant a real financial loss on purpose.

Turning back to God cost these worshipers something real.

🗑️ Repentance gets a real physical action
💰 Silver and gold made idols expensive
💸 Throwing them away cost real money
📖 True turning back always costs something

## 🔨 Which Your Own Hands Have Made Unto You For A Sin

These idols were not ancient relics found somewhere else.

The very worshipers bowing to them had built them with their own hands.

Isaiah points that out directly, on purpose.

A homemade god still has no real power over its maker.

🔨 Their own hands built these idols
🙇 Yet they bowed down to them
👉 Isaiah points this out on purpose
📖 A homemade god has no real power

# Isaiah 31:8-9
# ⚔️ The Assyrian Falls, Not By A Human Sword
---
## 🏛️ Then Shall The Assyrian Fall With The Sword, Not Of A Mighty Man

Assyria was the real military threat facing Judah when Isaiah wrote this.

Isaiah promises Assyria will fall, but not the way anyone expects.

No famous general and no ordinary soldier lands this blow.

This defeat traces back to the LORD of hosts named back in verse four.

🏛️ Assyria was the real threat here
⚔️ No human sword lands this blow
🚫 Not a famous general or common soldier
📖 This traces back to God himself

## 😨 His Young Men Shall Be Discomfited

"Discomfited" is an old word for thrown into panic and confusion.

This was not an orderly retreat.

Assyria's own strongest soldiers break down first.

Real fear spreads through an army faster than any weapon.

😨 Discomfited means thrown into panic
🏃 This is not an orderly retreat
💪 Assyria's strongest soldiers break down first
➡️ Fear spreads faster than any weapon

## 🏰 He Shall Pass Over To His Strong Hold For Fear

The king of Assyria runs for his own fortified city here.

Fear, not strategy, drives this retreat.

History records this king's own violent end back in his homeland later.

The empire that terrified nations now runs scared itself.

🏰 The king flees to his own fortress
😱 Fear drives this retreat, not strategy
📜 History records his violent end later
📖 The terrifying empire now runs scared

## 🚩 His Princes Shall Be Afraid Of The Ensign

An "ensign" is a raised banner or signal pole used to rally troops.

Normally that banner means backup is coming.

Here even the sight of it triggers panic instead of courage.

Fear had completely reversed what that symbol used to mean.

🚩 Ensign means a raised signal banner
📯 Normally it signals reinforcements arriving
😰 Now it only triggers more panic
➡️ Fear flipped what the symbol meant

## 🔥 Whose Fire Is In Zion, And His Furnace In Jerusalem

The chapter ends by naming exactly where God's power is based.

"Fire" and "furnace" both describe an intense, purifying heat.

That heat sits inside Jerusalem itself, not somewhere distant.

The same city Egypt could never protect was never unprotected at all.

🔥 Fire and furnace both mean intense heat
🏙️ That heat is based in Jerusalem
🛡️ God's power was never distant
📖 Zion was never truly unprotected
`.trim();

export const ISAIAH_THIRTY_ONE_PERSONAL_SECTIONS = parseIsaiahThirtyOneRawNotes(ISAIAH_THIRTY_ONE_RAW_NOTES);
