export type PsalmsOneHundredTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredTwentySevenRawNotes(rawText: string): PsalmsOneHundredTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+127:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 127 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+127:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+127:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 127 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 127,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 127:${startVerse}` : `Psalms 127:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 127 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_TWENTY_SEVEN_RAW_NOTES = `# Psalms 127:1-2
# 🏚️ Working In Vain
---
## 🏚️ Except The LORD Build The House, They Labour In Vain That Build It

"Except" is an old word that means unless.

This verse pictures builders working hard to put up a house.

Without the LORD behind the work, the effort accomplishes nothing lasting.

"Labour in vain" means work that produces no lasting result.

The point is not that work itself is bad.

It means human effort cannot succeed without God's blessing on it.

📜 Except means unless
🔨 Builders work hard on the house
🌬️ Without the LORD the work is wasted
📖 Human effort cannot succeed without God's blessing

## 🛡️ Except The LORD Keep The City, The Watchman Waketh But In Vain

A "watchman" was a guard stationed to keep danger out of a city.

He stayed alert through the night watching the walls and gates.

"Waketh" here means staying awake and alert on duty.

Even a watchman doing his job perfectly cannot protect a city God does not guard.

His alertness matters.

But it is not the real source of safety.

The same LORD who blesses the builder must also guard the guard.

🛡️ Watchman means a city guard
🌙 He stays alert through the night
😴 Waketh means staying awake on duty
📖 Even watchmen need God's protection

## ⏳ It Is Vain For You To Rise Up Early, To Sit Up Late, To Eat The Bread Of Sorrows

This is not a command against working hard.

It describes an exhausting cycle of anxious labor.

Rising early and sitting up late pictures working far beyond a normal day.

The "bread of sorrows" means food earned through worry and strain.

This kind of labor is driven by anxiety instead of confidence in God.

⏰ Rising early and sitting late describes anxious labor
🍞 Bread of sorrows means food earned through fear
😟 The drive behind this labor is anxiety
📖 Trusting God looks different from frantic striving

## 😴 For So He Giveth His Beloved Sleep

"Beloved" means someone who is dearly loved.

Sleep here does not mean God simply causes people to nap more.

It pictures rest that comes without constant frantic striving.

The anxious laborer from the earlier lines wears himself out chasing security.

God's beloved receive provision without having to force it through worry.

This contrasts anxious self reliance with calm trust in God's care.

💛 Beloved means dearly loved
😌 Sleep pictures rest without frantic striving
😟 The anxious laborer wears out chasing security
📖 God provides without forcing worry to earn it

# Psalms 127:3-5
# 🏹 Children As A Reward
---
## 🎁 Children Are An Heritage Of The LORD

"Heritage" means something inherited, a gift passed down, not earned.

Children are described here as a gift from God.

They are not simply the result of human effort.

This reframes parenting as receiving a gift, not producing an achievement.

That shift changes how a person views the privilege of raising children.

🎁 Heritage means an inherited gift
👶 Children are a gift from God
🙅 They are not just a human achievement
📖 Parenting means receiving a gift, not earning one

## 🌳 The Fruit Of The Womb Is His Reward

"Fruit of the womb" is a Hebrew way of describing children as the womb's harvest.

A tree produces fruit naturally when it is healthy and cared for.

The image compares a child's birth to that same natural, living outcome.

Calling this a "reward" adds a second layer beyond heritage.

A reward is something given in return for faithfulness.

Together the two words show children as both a gift and a blessing.

🌳 Fruit of the womb pictures a harvest
👶 It compares birth to a natural outcome
🏆 Reward means something given for faithfulness
📖 Children are both a gift and a blessing

## 🏹 As Arrows Are In The Hand Of A Mighty Man

An "arrow" here pictures a weapon a warrior depends on for defense.

A "mighty man" is a strong, skilled fighter, likely a soldier.

Arrows in his hand are ready and useful.

They give him real strength in a fight.

Without arrows, even a skilled warrior has far less power to protect others.

The image is about usefulness and defense, not violence for its own sake.

🏹 Arrows picture a warrior's weapon
💪 A mighty man is a skilled fighter
🛡️ Arrows in hand give real strength
📖 The image is about defense, not violence

## 👶 So Are Children Of The Youth

"Children of the youth" means children born early in a parent's life.

A parent who has children early still has strength and years ahead to raise them.

Those children grow up during the parent's strongest, most energetic years.

By the time the parent is old, those children are strong enough to help and defend the family.

The comparison to arrows means these children become the parent's strength later in life.

👶 Children of the youth means children born early
💪 A young parent still has strength to raise
🛡️ Grown children later protect and support the parent
📖 Like arrows, they become strength for later years

## 🎒 Happy Is The Man That Hath His Quiver Full Of Them

A "quiver" is the case a warrior used to carry his arrows.

A full quiver meant a warrior was fully equipped and ready for battle.

Applied to children, a full quiver pictures a household with many sons.

"Happy" here means truly blessed, not just a passing feeling.

Many children, in this picture, meant security and strength for the family's future.

🎒 Quiver is the case that holds arrows
✅ A full quiver means fully equipped
👨‍👩‍👧‍👦 Many children pictured a strong household
📖 Happy here means truly blessed

## 🚪 They Shall Not Be Ashamed, But They Shall Speak With The Enemies In The Gate

The "gate" was the entrance area of an ancient city.

It served as the place where elders met to settle disputes and conduct business.

A man with many grown sons had support standing beside him at the gate.

That support meant he could not be easily pushed around or falsely accused.

"Not be ashamed" describes standing confident and secure, not humiliated.

Grown children, like arrows from a full quiver, became a family's real world defense.

🚪 The gate was the city's public meeting place
⚖️ Elders settled disputes and business there
🛡️ Grown sons gave a man real support
📖 Children became a family's real world defense
`.trim();

export const PSALMS_ONE_HUNDRED_TWENTY_SEVEN_PERSONAL_SECTIONS = parsePsalmsOneHundredTwentySevenRawNotes(
  PSALMS_ONE_HUNDRED_TWENTY_SEVEN_RAW_NOTES
);
